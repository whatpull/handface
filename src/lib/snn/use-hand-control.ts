// 카메라 기반 학습 훅 — CameraQuickControls 에서 사용.
// hand-feature 이벤트 구독 + featRef 보유 + autoCapture (자율 STDP) + 호환용 수동 train.

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { onBackendEvent, type HandFeatureDetail } from '@/lib/backend/events';
import { incrementTrainCount } from '@/lib/snn/train-counts';
import { recordExemplar } from '@/lib/snn/out-exemplars';

export const HAND_GESTURES = [
  { id: 'pointing', label: 'Pointing',  short: 'P', cluster: 0 },
  { id: 'openpalm', label: 'Open palm', short: 'O', cluster: 1 },
  { id: 'fist',     label: 'Fist',      short: 'F', cluster: 2 },
  { id: 'victory',  label: 'Victory',   short: 'V', cluster: 3 },
];

// MediaPipe GestureRecognizer 라벨 → OUT cluster id (N3 본격 회로 정합).
// out cluster 0..3 은 backend N3 design 의 4 cluster × 8 OUT neurons 정합.
// 매핑 안 된 라벨 (Thumb_Up/Down, ILoveYou, None) 은 unsupervised STDP.
export const GESTURE_LABEL_TO_CLUSTER: Record<string, number> = {
  Pointing_Up: 0,
  Open_Palm:   1,
  Closed_Fist: 2,
  Victory:     3,
};
// supervised teacher 신호 임계 — confidence 이 이하면 unsupervised STDP only.
// 0.6 → 0.8 상향 (N3 한계 돌파 1: noisy teacher 회피 mandatory).
// MediaPipe GestureRecognizer 가 0.6 ~ 0.8 영역에서 라벨 자주 흔들림 (유사 자세 혼동).
export const GESTURE_CONFIDENCE_MIN = 0.8;
// N consecutive same gesture frames 요구 — 단발 라벨 noise 회피 (N3 정합).
export const GESTURE_STABLE_FRAMES = 3;

export interface LivePredictResult {
  winner: string | null;
  rates: Record<string, number>;
  confidence: number;
}

const TRAIN_FRAMES = 30;
const TRAIN_INTERVAL_MS = 80;
const PREDICT_INTERVAL_MS = 600;

// autoCapture 파라미터.
const AUTO_TICK_MS = 350;          // STDP-on inject 주기
const STABILITY_FRAMES = 4;        // 같은 winner N frame 연속 → 안정
const MIN_CONFIDENCE = 0.4;        // winner / total ratio
const COOLDOWN_MS = 1500;          // 같은 OUT 연속 record 최소 간격
const HOMEOSTASIS_EVERY = 30;      // N tick 마다 synaptic scaling — winner monopoly 회피

export function useHandControl(cameraConnected: boolean, autoLive = false, autoCapture = false) {
  const [hasHand, setHasHand] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [trainStatus, setTrainStatus] = useState<string>('');
  const [livePredict, setLivePredict] = useState(false);
  const [liveResult, setLiveResult] = useState<LivePredictResult | null>(null);

  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);
  const gestureNameRef = useRef<string | null>(null);
  const gestureScoreRef = useRef<number>(0);

  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      featRef.current = d.feature;
      hasHandRef.current = d.hasHand;
      gestureNameRef.current = d.gestureName ?? null;
      gestureScoreRef.current = d.gestureScore ?? 0;
      setHasHand(d.hasHand);
    });
    return off;
  }, []);

  // autoLive: 카메라 연결과 동기화.
  useEffect(() => {
    if (!autoLive) return;
    setLivePredict(cameraConnected);
    if (!cameraConnected) setLiveResult(null);
  }, [autoLive, cameraConnected]);

  // 수동 N frame supervised — 외부 호출자용 (현재 미사용 가능).
  const train = async (gestureId: string, targetOut: string, label: string) => {
    if (busy || !cameraConnected) return;
    setBusy(gestureId);
    setTrainStatus(`${label} 학습 시작 — 손 자세 유지`);
    const patterns: number[][] = [];
    for (let i = 0; i < TRAIN_FRAMES; i += 1) {
      let waited = 0;
      while (!hasHandRef.current || !featRef.current) {
        if (waited > 3000) break;
        await new Promise((r) => setTimeout(r, 50));
        waited += 50;
      }
      if (!hasHandRef.current || !featRef.current) {
        setTrainStatus(`✗ ${label}: 손 미감지 (${i}/${TRAIN_FRAMES})`);
        break;
      }
      patterns.push(featRef.current.slice(0, 16));
      setTrainStatus(`${label} 캡처 ${i + 1}/${TRAIN_FRAMES}…`);
      await new Promise((r) => setTimeout(r, TRAIN_INTERVAL_MS));
    }
    if (patterns.length === 0) { setBusy(null); return; }
    setTrainStatus(`${label} 학습 진행 ${patterns.length} 패턴…`);
    const r = await getClient().trainHandGesture(patterns, targetOut, (done, total) => {
      setTrainStatus(`${label} 학습 ${done}/${total}…`);
    });
    if (r.ok) {
      incrementTrainCount(gestureId);
      setTrainStatus(`✓ ${label} 학습 완료 (${r.data.trained} 패턴)`);
    } else {
      setTrainStatus(`✗ ${label}: ${r.reason}`);
    }
    setBusy(null);
  };

  // 표시용 Live predict (STDP=false, 600ms) — autoCapture 모드일 땐 비활성화 (autoCapture 가 winner 도 채움).
  useEffect(() => {
    if (autoCapture) return;
    if (!livePredict || !cameraConnected) return;
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      if (hasHandRef.current && featRef.current) {
        const pattern = featRef.current.slice(0, 16);
        const r = await getClient().injectPattern(pattern, { stdp: false });
        if (cancelled) return;
        if (r.ok) {
          const rates = (r.data.out_rates || {}) as Record<string, number>;
          let winner: string | null = null;
          let max = 0;
          let total = 0;
          for (const [k, v] of Object.entries(rates)) {
            total += v;
            if (v > max) { max = v; winner = k; }
          }
          setLiveResult({ winner, rates, confidence: total > 0 ? max / total : 0 });
        }
      } else {
        setLiveResult(null);
      }
      if (!cancelled) setTimeout(tick, PREDICT_INTERVAL_MS);
    };
    tick();
    return () => { cancelled = true; };
  }, [autoCapture, livePredict, cameraConnected]);

  // autoCapture: STDP-on inject (target_out 없음) → winner 발생 → 안정 시 self-reinforce + exemplar 기록.
  // OUT 들이 자율적으로 패턴별 selectivity 형성하도록 유도. 사용자 클릭 zero.
  useEffect(() => {
    if (!autoCapture || !cameraConnected) {
      setLiveResult(null);
      return;
    }
    let cancelled = false;
    let lastWinner: string | null = null;
    let stableCount = 0;
    let homeostasisCount = 0;
    // teacher gesture stability — N consecutive same-name frame 합의 필수 (noisy teacher 회피).
    let lastGestureName: string | null = null;
    let gestureStableCount = 0;
    const lastRecordAt: Record<string, number> = {};

    const tick = async () => {
      if (cancelled) return;
      const feat = featRef.current;
      if (!hasHandRef.current || !feat) {
        lastWinner = null;
        stableCount = 0;
        lastGestureName = null;
        gestureStableCount = 0;
        setLiveResult(null);
        if (!cancelled) setTimeout(tick, AUTO_TICK_MS);
        return;
      }
      // Homeostatic synaptic scaling — N tick 마다 호출 → winner OUT weight 약화,
      // silent OUT weight 강화 (Turrigiano 1998). monopoly 회피 mandatory.
      homeostasisCount += 1;
      if (homeostasisCount % HOMEOSTASIS_EVERY === 0) {
        void getClient().homeostatic(5.0).catch(() => null);
      }
      const pattern = feat.slice(0, 16);
      // Bootstrap supervised STDP (N3): MediaPipe gesture label → cluster id →
      // target_out (cluster 의 첫 OUT, supervised teacher signal). confidence
      // 기준 미만이면 unsupervised STDP only (기존 동작).
      const gName = gestureNameRef.current;
      const gScore = gestureScoreRef.current;
      // teacher stability tracking — 같은 gesture name 연속 시만 count 누적, 다르면 리셋.
      // unsupervised STDP 는 stability 와 무관하게 항상 진행 (기존 동작 보존).
      const gestureMappable = gName !== null && GESTURE_LABEL_TO_CLUSTER[gName] !== undefined;
      if (gestureMappable && gScore >= GESTURE_CONFIDENCE_MIN) {
        if (gName === lastGestureName) gestureStableCount += 1;
        else { lastGestureName = gName; gestureStableCount = 1; }
      } else {
        // mappable 아니거나 conf 미달 → stability 리셋 (다른 라벨이 들어왔을 가능성).
        lastGestureName = null;
        gestureStableCount = 0;
      }
      const cluster = gestureMappable ? GESTURE_LABEL_TO_CLUSTER[gName!] : null;
      // supervised 진입 조건: conf >= 0.8 AND N=3 consecutive same-name frame 합의.
      const supervised = cluster !== null
        && gScore >= GESTURE_CONFIDENCE_MIN
        && gestureStableCount >= GESTURE_STABLE_FRAMES;
      const targetOut = supervised ? `out_${cluster}_0` : undefined;

      const r = await getClient().injectPattern(pattern, { stdp: true, targetOut });
      if (cancelled) return;
      if (r.ok) {
        // out_rates → cluster mean readout (population coding, N3 회로 정합).
        const rates = (r.data.out_rates || {}) as Record<string, number>;
        const clusterRates: number[] = [0, 0, 0, 0];
        const clusterCounts: number[] = [0, 0, 0, 0];
        for (const [k, v] of Object.entries(rates)) {
          // expected name: out_{cluster}_{idx}
          const m = /^out_(\d+)_(\d+)$/.exec(k);
          if (!m) continue;
          const ci = Number(m[1]);
          if (ci >= 0 && ci < 4) {
            clusterRates[ci] += v;
            clusterCounts[ci] += 1;
          }
        }
        const clusterMean = clusterRates.map((s, i) => clusterCounts[i] > 0 ? s / clusterCounts[i] : 0);
        let winner: string | null = null;
        let max = 0;
        let total = 0;
        for (let i = 0; i < 4; i += 1) {
          total += clusterMean[i];
          if (clusterMean[i] > max) { max = clusterMean[i]; winner = `cluster_${i}`; }
        }
        const conf = total > 0 ? max / total : 0;
        // exposed rates 영역도 cluster 단위로 표시 (기존 winner string 호환 위해 cluster_i 명명).
        const ratesExposed: Record<string, number> = {};
        for (let i = 0; i < 4; i += 1) ratesExposed[`cluster_${i}`] = clusterMean[i];
        setLiveResult({ winner, rates: ratesExposed, confidence: conf });

        if (winner && conf >= MIN_CONFIDENCE) {
          if (winner === lastWinner) stableCount += 1;
          else { lastWinner = winner; stableCount = 1; }

          if (stableCount >= STABILITY_FRAMES) {
            const now = Date.now();
            const last = lastRecordAt[winner] || 0;
            if (now - last >= COOLDOWN_MS) {
              lastRecordAt[winner] = now;
              // self-reinforce — winner cluster 의 첫 OUT 을 supervisor target 으로.
              // (cluster 내 mutual excitation 으로 cluster 전체 강화 정합.)
              const m = /^cluster_(\d+)$/.exec(winner);
              const reinforceTarget = m ? `out_${m[1]}_0` : winner;
              await getClient().injectPattern(pattern, { stdp: true, targetOut: reinforceTarget });
              recordExemplar(winner, feat);
              setTrainStatus(`✓ ${winner} 강화 (안정 발화 캡처)`);
              // 한 번 캡처 후 stability 리셋 — 손 잠깐 흔들고 다시 안정화될 때까지 대기.
              stableCount = 0;
            }
          }
        } else {
          stableCount = 0;
          lastWinner = null;
        }
      }
      if (!cancelled) setTimeout(tick, AUTO_TICK_MS);
    };
    tick();
    return () => { cancelled = true; };
  }, [autoCapture, cameraConnected]);

  return {
    hasHand,
    busy,
    trainStatus,
    livePredict,
    liveResult,
    train,
    setLivePredict,
    setTrainStatus,
  };
}
