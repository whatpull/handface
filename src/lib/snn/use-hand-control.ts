// 카메라 기반 학습 훅 — CameraQuickControls 에서 사용.
//
// 본질 redesign (사용자 명시): online self-organizing STDP loop 폐기.
// 대신 명시적 batch supervised 학습 + inference 모드 분리 (state machine).
//
// State machine:
//   1. UNTRAINED   — 학습 0, batch loop 비활성. 카메라/hand 감지만.
//   2. LEARNING    — MediaPipe label N=5 stable + conf >= 0.85 →
//                    cluster 별 batch supervised trigger. cluster 별 학습 카운트
//                    누적 (target N=30 frame). 4 cluster 모두 채울 때까지 진행.
//   3. PARTIAL     — 1-3 cluster 학습됨 (>=30 frame). 미학습 cluster 영역 reject.
//   4. TRAINED     — 4 cluster 모두 학습 완료. 'training-complete' 이벤트 emit.
//   5. INFERENCE   — MediaPipe 보조만, cluster mean readout = winner.
//                    매 350ms inject (stdp=false), 학습 진행 0 (영구 보존).
//
// 직전 autoCapture 영역 (online self-reinforce + R-STDP + astrocyte) 폐기.
// 학습은 LEARNING phase 의 batch supervised 영역으로만 진행.
//
// 정직 한계 박음:
//  - N=5 stable + 0.85 conf = 추측. 너무 엄격 / 느슨 가능 — 사용자 화면 검증 mandatory.
//  - TRAINED 정확도 보장 0. SNN 4-way 영역 학술 nontrivial. batch supervised 가
//    self-organizing 보다 본질 정합 가능성 ↑ (teacher signal 명시).
//  - `handfaceTrainSupervised` 영역 backend 신규 endpoint 정합 mandatory —
//    현재 구현은 wrapper (trainHandGesture) 영역. backend agent 정합 commit 별도.

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { onBackendEvent, emitBackendEvent, type HandFeatureDetail, type TrainingPhaseDetail } from '@/lib/backend/events';

export const HAND_GESTURES = [
  { id: 'pointing', label: 'Pointing',  short: 'P', cluster: 0 },
  { id: 'openpalm', label: 'Open palm', short: 'O', cluster: 1 },
  { id: 'fist',     label: 'Fist',      short: 'F', cluster: 2 },
  { id: 'victory',  label: 'Victory',   short: 'V', cluster: 3 },
];

// MediaPipe GestureRecognizer 라벨 → OUT cluster id (N3 본격 회로 정합).
export const GESTURE_LABEL_TO_CLUSTER: Record<string, number> = {
  Pointing_Up: 0,
  Open_Palm:   1,
  Closed_Fist: 2,
  Victory:     3,
};

export const CLUSTER_TO_LABEL: Record<number, string> = {
  0: 'Pointing',
  1: 'Open palm',
  2: 'Fist',
  3: 'Victory',
};

// supervised teacher 정합 임계 — 0.85 (사용자 명시 redesign).
// 직전 0.8 → 0.85 상향: batch supervised 진입 영역 더 엄격 catch.
export const GESTURE_CONFIDENCE_MIN = 0.85;
// N consecutive same-name frame 합의 — 5 (사용자 명시 redesign).
// 직전 3 → 5 상향: noisy teacher 회피 본격 catch.
export const GESTURE_STABLE_FRAMES = 5;
// cluster 당 supervised inject 영역 target frame 수 — 30 (사용자 명시 redesign).
export const CLUSTER_TARGET_FRAMES = 30;

export type TrainingPhase = 'untrained' | 'learning' | 'partial' | 'trained' | 'inference';

export interface ClusterFrames {
  0: number;
  1: number;
  2: number;
  3: number;
}

export interface LivePredictResult {
  winner: string | null;
  rates: Record<string, number>;
  confidence: number;
}

const CLUSTER_FRAMES_KEY = 'handface.cluster.frames.v1';
const TRAINING_PHASE_KEY = 'handface.training.phase.v1';

const TICK_MS = 350;        // batch supervised + inference loop 주기
const TRAIN_INTERVAL_MS = 80;
const TRAIN_FRAMES = 30;

// localStorage 영구 보존 — 페이지 reload 영역 학습 진행 영역 보존 catch.
function loadClusterFrames(): ClusterFrames {
  if (typeof window === 'undefined') return { 0: 0, 1: 0, 2: 0, 3: 0 };
  try {
    const raw = localStorage.getItem(CLUSTER_FRAMES_KEY);
    if (!raw) return { 0: 0, 1: 0, 2: 0, 3: 0 };
    const obj = JSON.parse(raw);
    return {
      0: Number(obj?.[0]) || 0,
      1: Number(obj?.[1]) || 0,
      2: Number(obj?.[2]) || 0,
      3: Number(obj?.[3]) || 0,
    };
  } catch { return { 0: 0, 1: 0, 2: 0, 3: 0 }; }
}

function saveClusterFrames(frames: ClusterFrames) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(CLUSTER_FRAMES_KEY, JSON.stringify(frames)); } catch { /* noop */ }
}

function loadPhase(): TrainingPhase {
  if (typeof window === 'undefined') return 'untrained';
  try {
    const raw = localStorage.getItem(TRAINING_PHASE_KEY);
    if (raw === 'untrained' || raw === 'learning' || raw === 'partial'
      || raw === 'trained' || raw === 'inference') return raw;
  } catch { /* noop */ }
  return 'untrained';
}

function savePhase(phase: TrainingPhase) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(TRAINING_PHASE_KEY, phase); } catch { /* noop */ }
}

export function clearTrainingProgress() {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(CLUSTER_FRAMES_KEY); } catch { /* noop */ }
  try { localStorage.removeItem(TRAINING_PHASE_KEY); } catch { /* noop */ }
}

// phase 결정 영역 (cluster frames 기준 1:1).
//   trained cluster count = 4 → 'trained' (또는 'inference' 진입 후 보존)
//   1..3 → 'partial'
//   stableCount 진행 중 (>=1) → 'learning'
//   else → 'untrained'
function derivePhase(frames: ClusterFrames, current: TrainingPhase, learningActive: boolean): TrainingPhase {
  const trainedCount = [0, 1, 2, 3].filter((i) => frames[i as 0|1|2|3] >= CLUSTER_TARGET_FRAMES).length;
  if (trainedCount === 4) {
    // 4 cluster 영역 모두 학습 완료 → 'trained' (1회 emit 후 'inference' 영역 진입은 외부 호출자).
    return current === 'inference' ? 'inference' : 'trained';
  }
  if (trainedCount >= 1) return 'partial';
  if (learningActive) return 'learning';
  return 'untrained';
}

export function useHandControl(cameraConnected: boolean, autoLive = false, autoCapture = false) {
  const [hasHand, setHasHand] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [trainStatus, setTrainStatus] = useState<string>('');
  const [livePredict, setLivePredict] = useState(false);
  const [liveResult, setLiveResult] = useState<LivePredictResult | null>(null);
  const [clusterFrames, setClusterFrames] = useState<ClusterFrames>(() => loadClusterFrames());
  const [phase, setPhase] = useState<TrainingPhase>(() => loadPhase());

  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);
  const gestureNameRef = useRef<string | null>(null);
  const gestureScoreRef = useRef<number>(0);
  // tick loop 영역 frames/phase ref — closure 내 stale 회피.
  const framesRef = useRef<ClusterFrames>(clusterFrames);
  const phaseRef = useRef<TrainingPhase>(phase);
  const trainingCompleteEmittedRef = useRef<boolean>(phase === 'trained' || phase === 'inference');

  useEffect(() => { framesRef.current = clusterFrames; }, [clusterFrames]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // phase emit — 외부 (ModeIndicator) 영역 phase event 구독 영역.
  useEffect(() => {
    const detail: TrainingPhaseDetail = {
      phase,
      clusterFrames: { ...clusterFrames },
      target: CLUSTER_TARGET_FRAMES,
    };
    emitBackendEvent<TrainingPhaseDetail>('training-phase', detail);
    if ((phase === 'trained' || phase === 'inference') && !trainingCompleteEmittedRef.current) {
      trainingCompleteEmittedRef.current = true;
      emitBackendEvent('training-complete', detail);
    }
  }, [phase, clusterFrames]);

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

  // autoLive: 카메라 연결 동기화.
  useEffect(() => {
    if (!autoLive) return;
    setLivePredict(cameraConnected);
    if (!cameraConnected) setLiveResult(null);
  }, [autoLive, cameraConnected]);

  // 수동 N frame supervised — 외부 호출자용 (호환 보존, 현재 미사용 가능).
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
    const r = await getClient().handfaceTrainSupervised(patterns, targetOut, (done, total) => {
      setTrainStatus(`${label} 학습 ${done}/${total}…`);
    });
    if (r.ok) {
      setTrainStatus(`✓ ${label} 학습 완료 (${r.data.trained} 패턴)`);
    } else {
      setTrainStatus(`✗ ${label}: ${r.reason}`);
    }
    setBusy(null);
  };

  // 메인 batch supervised + inference loop.
  // autoCapture=true 시 진입. cameraConnected + hasHand 영역 매 350ms tick.
  //
  //  - phase='inference' 영역: stdp=false inject, cluster mean readout, winner 결정.
  //  - 그 외 (untrained/learning/partial/trained): MediaPipe label 영역 N=5 stable +
  //    conf >= 0.85 + 해당 cluster < 30 frame 영역 supervised inject (1 frame).
  //    cluster frames[c] += 1, frames[c] >= 30 영역 cluster 학습 완료.
  //    4 cluster 영역 모두 30 도달 영역 phase = 'trained' → 'inference' 영역 자동 전환.
  //
  // 직전 R-STDP / astrocyte / homeostatic 영역 호출 영역 폐기. batch supervised
  // 영역 = 명시적 teacher signal 영역. self-organizing 영역 부산물 영역 영역 영역 회피.
  useEffect(() => {
    if (!autoCapture || !cameraConnected) {
      setLiveResult(null);
      return;
    }
    let cancelled = false;
    let lastGestureName: string | null = null;
    let gestureStableCount = 0;
    let learningActive = false;

    const tick = async () => {
      if (cancelled) return;
      const feat = featRef.current;
      if (!hasHandRef.current || !feat) {
        lastGestureName = null;
        gestureStableCount = 0;
        if (phaseRef.current !== 'inference') setLiveResult(null);
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }
      const pattern = feat.slice(0, 16);
      const gName = gestureNameRef.current;
      const gScore = gestureScoreRef.current;
      const currentPhase = phaseRef.current;

      // INFERENCE phase — STDP 폐기, cluster mean readout 영역만.
      if (currentPhase === 'inference') {
        const r = await getClient().injectPattern(pattern, { stdp: false });
        if (cancelled) return;
        if (r.ok) {
          const rates = (r.data.out_rates || {}) as Record<string, number>;
          const clusterRates: number[] = [0, 0, 0, 0];
          const clusterCounts: number[] = [0, 0, 0, 0];
          for (const [k, v] of Object.entries(rates)) {
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
          const ratesExposed: Record<string, number> = {};
          for (let i = 0; i < 4; i += 1) ratesExposed[`cluster_${i}`] = clusterMean[i];
          setLiveResult({ winner, rates: ratesExposed, confidence: conf });
        }
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }

      // 학습 phase (untrained / learning / partial / trained 도달 직전) —
      // teacher stability tracking.
      const gestureMappable = gName !== null && GESTURE_LABEL_TO_CLUSTER[gName] !== undefined;
      if (gestureMappable && gScore >= GESTURE_CONFIDENCE_MIN) {
        if (gName === lastGestureName) gestureStableCount += 1;
        else { lastGestureName = gName; gestureStableCount = 1; }
      } else {
        lastGestureName = null;
        gestureStableCount = 0;
      }
      const cluster = gestureMappable ? GESTURE_LABEL_TO_CLUSTER[gName!] : null;
      const stable = cluster !== null
        && gScore >= GESTURE_CONFIDENCE_MIN
        && gestureStableCount >= GESTURE_STABLE_FRAMES;

      // batch supervised trigger 영역: stable AND 해당 cluster 영역 < 30 frame.
      let shouldTrain = false;
      if (stable && cluster !== null) {
        const cur = framesRef.current[cluster as 0|1|2|3];
        if (cur < CLUSTER_TARGET_FRAMES) shouldTrain = true;
      }

      if (shouldTrain && cluster !== null) {
        if (!learningActive) {
          learningActive = true;
        }
        // 1 frame supervised inject — target_out=`out_{cluster}_0` (cluster 의 첫 OUT
        // teacher signal 영역). cluster 내 8 OUT 영역 mutual excitation 영역 cluster
        // 전체 강화 정합.
        const targetOut = `out_${cluster}_0`;
        const r = await getClient().injectPattern(pattern, { stdp: true, targetOut });
        if (cancelled) return;
        if (r.ok) {
          // cluster frames 영역 누적 + 영구화.
          const next = { ...framesRef.current };
          next[cluster as 0|1|2|3] = Math.min(CLUSTER_TARGET_FRAMES, next[cluster as 0|1|2|3] + 1);
          framesRef.current = next;
          saveClusterFrames(next);
          setClusterFrames(next);
          const newPhase = derivePhase(next, phaseRef.current, true);
          if (newPhase !== phaseRef.current) {
            phaseRef.current = newPhase;
            savePhase(newPhase);
            setPhase(newPhase);
          }
          // 4 cluster 영역 모두 학습 완료 영역 자동 'inference' 전환.
          if (newPhase === 'trained') {
            phaseRef.current = 'inference';
            savePhase('inference');
            setPhase('inference');
          }
          const label = CLUSTER_TO_LABEL[cluster] ?? `cluster ${cluster}`;
          setTrainStatus(`✓ ${label}: ${next[cluster as 0|1|2|3]}/${CLUSTER_TARGET_FRAMES} frames`);

          // liveResult 영역 학습 중 진행률 표시 (inference winner 와 별도 의미 영역).
          // cluster 영역 winner = 학습 중인 cluster 영역.
          const ratesExposed: Record<string, number> = {};
          for (let i = 0; i < 4; i += 1) {
            ratesExposed[`cluster_${i}`] = next[i as 0|1|2|3] / CLUSTER_TARGET_FRAMES;
          }
          setLiveResult({
            winner: `cluster_${cluster}`,
            rates: ratesExposed,
            confidence: next[cluster as 0|1|2|3] / CLUSTER_TARGET_FRAMES,
          });
        }
      } else {
        // 학습 trigger 미충족 — phase 영역 평가 영역 (frames 변경 0 영역 derive).
        const newPhase = derivePhase(framesRef.current, phaseRef.current, learningActive);
        if (newPhase !== phaseRef.current) {
          phaseRef.current = newPhase;
          savePhase(newPhase);
          setPhase(newPhase);
        }
      }

      if (!cancelled) setTimeout(tick, TICK_MS);
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
    clusterFrames,
    phase,
  };
}
