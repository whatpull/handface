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
// Phase 26: per-neuron V_th astrocyte homeostasis (backend commit d289524).
// silence (rate < target/4) V_th 하향 + hyperactive (rate > target×2) V_th 상향.
// frequency 결정 근거: tick 350ms × 20 = 7s 마다 1회.
//   - 너무 빈번 (N<10): observe_window_ms=100 영역 rate 통계 미수렴 + backend 부하 ↑
//   - 너무 드뭄 (N>40): silence neuron escape 효과 지연 → autoCapture 누적 학습 영역 무용
//   - N=20 → Phase 175 weight scaling (N=30) 와 offset, 상호 간섭 회피.
// 정직 한계 박음: V_th 변경만, fire 시작은 추가 stimulus mandatory 영역 catch 가능.
const ASTROCYTE_HOMEOSTASIS_EVERY = 20;
// R-STDP: supervised inject N=10 마다 mild reward (1.5) — STDP delta 양 amplify.
// 정답 일치 (winner cluster == supervised target cluster) 시 strong reward (2.0) — 결정적 강화.
// frequency 결정 근거: tick 350ms × 10 = 3.5s 마다 pulse → backend snapshot 비교 1회 비용 감수 가능.
// 매 supervised inject 마다 호출 시 latency 누적 + delta 영역 작아 효과 미미.
const RSTDP_EVERY_SUPERVISED = 10;
const RSTDP_REWARD_MILD = 1.5;
const RSTDP_REWARD_STRONG = 2.0;

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
    // R-STDP: snapshot 1회 + supervised counter.
    // snapshot 실패 시 (네트워크 미준비 등) snapshotReady=false → R-STDP pulse 호출 skip.
    let snapshotReady = false;
    let supervisedInjectCount = 0;
    void getClient().snapshotWeights().then((r) => {
      if (!cancelled && r.ok && r.data.ok) snapshotReady = true;
    }).catch(() => null);

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
      // Phase 26: per-neuron V_th astrocyte homeostasis — silence neuron escape mechanism.
      // Phase 175 weight scaling 영역 (위) 와 별도 endpoint — V_th 직접 조절.
      // silence (rate < 2.5Hz) V_th 하향 / hyperactive (rate > 20Hz) V_th 상향.
      // 둘 다 호출 mandatory — weight scaling + V_th 조절 상호 보완 영역 정합.
      if (homeostasisCount % ASTROCYTE_HOMEOSTASIS_EVERY === 0) {
        void getClient().astrocyteHomeostasisStep({
          targetRateHz: 10,
          adjustMv: 0.5,
          observeWindowMs: 100,
          skipUserIo: true,
        }).catch(() => null);
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
      // supervised inject 누적 — N=10 마다 mild R-STDP pulse (LTP delta 1.5x 증폭).
      // target_post_prefix=`out_${cluster}_` — supervised teacher cluster 의 8 OUT 시냅스만
      // amplify. winner 와 무관하게 supervised target cluster 만 강화 → silence cluster 학습
      // 시작 영역 보장 (monopoly 회피 본격 영역, backend commit 443f69c 정합).
      if (supervised && r.ok) {
        supervisedInjectCount += 1;
        if (snapshotReady && supervisedInjectCount % RSTDP_EVERY_SUPERVISED === 0 && cluster !== null) {
          void getClient().applyRStdpPulse({
            rewardStrength: RSTDP_REWARD_MILD,
            positiveOnly: true,
            targetPostPrefix: `out_${cluster}_`,
          }).catch(() => null);
        }
      }
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
              // 정답 일치 영역 strong R-STDP pulse — supervised teacher cluster 와 winner cluster
              // 완전 일치 시 가장 결정적 강화 시점. snapshot baseline 이후 누적 LTP delta 2x amplify.
              // target_post_prefix=`out_${cluster}_` — supervised teacher cluster 의 OUT 시냅스만
              // amplify (backend commit 443f69c 정합). winner==cluster 일치 영역 mandatory.
              const winnerCluster = m ? Number(m[1]) : null;
              if (snapshotReady && supervised && winnerCluster !== null && winnerCluster === cluster) {
                void getClient().applyRStdpPulse({
                  rewardStrength: RSTDP_REWARD_STRONG,
                  positiveOnly: true,
                  targetPostPrefix: `out_${cluster}_`,
                }).catch(() => null);
              }
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
