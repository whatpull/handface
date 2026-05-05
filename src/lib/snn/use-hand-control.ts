// 카메라 기반 학습 훅 — PipelineCanvas (LEARN/INFER 노드) 가 직접 호출.
// (CameraQuickControls 컴포넌트는 영구 폐기 — Pipeline view 통합)
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
// N4 정합 (backend ddb220e): cluster broadcast supervisor.
//  - single target_out 방식 영역 cluster mutual excitation +2.0 영역 8 OUT broadcast
//    미달 → cluster fire = 1/8 catch (직전 wrapper 폐기 영역 사실).
//  - `clusterTrainSupervised` (cluster prefix `out_{cluster}_` 영역 8 OUT broadcast)
//    영역 cluster 전체 학습 → cluster 8/8 fire 사실 (backend sanity test).
//  - autoCapture loop 영역 frame-by-frame injectPattern 영역 폐기, N=30 frame 영역
//    cluster 별 buffer 누적 → 30 도달 시점 1회 batch `clusterTrainSupervised` 호출.
//  - 4 cluster 모두 학습 완료 → 자동 `clusterLock(0..3, lock=true)` → frozen 사실.
//
// 정직 한계 박음:
//  - N=5 stable + 0.85 conf = 추측. 너무 엄격 / 느슨 가능 — 사용자 화면 검증 mandatory.
//  - TRAINED 정확도 보장 0. SNN 4-way 영역 학술 nontrivial. cluster broadcast
//    supervised 영역 single target 보다 본질 정합 가능성 ↑ (teacher signal 영역 8 OUT 영역).
//  - clusterLock 영역 backend STDP gate 영역만 정합 — R-STDP pulse / astrocyte V_th
//    adjust 영역 frozen 영역 무시 가능 (backend agent 한계 박음).

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { onBackendEvent, emitBackendEvent, type HandFeatureDetail, type TrainingPhaseDetail } from '@/lib/backend/events';
// HIGH #3 정정: cluster winner 산출 단일 source.
import { deriveWinner } from '@/lib/snn/winner-derivation';

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

export type TrainingPhase = 'untrained' | 'learning' | 'partial' | 'trained' | 'inference' | 'evolving';

// EVOLVING phase 영역 supervised retrain frame 수 — 5..10 권장 영역 10 사실.
// 낮은 weight (EVOLVE_SUPERVISOR_WEIGHT=15) 영역 saturated weight 영역 새 변형 catch.
// 학술 정합: Parisi et al. 2019 (lifelong learning continuous adaptation).
// 한계 박음: cluster boundary cross 영역 catastrophic forgetting 회복 0 — McCloskey & Cohen 1989.
//   별도 검증 mandatory.
export const EVOLVE_TARGET_FRAMES = 10;
export const EVOLVE_SUPERVISOR_WEIGHT = 15;

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
    // 'evolving' 영역 transient — reload 영역 buffer 손실 → 'inference' fallback.
    if (raw === 'evolving') return 'inference';
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
  // EVOLVING 영역 transient — 외부 (tick loop) 영역 명시 종료. derive 영역 보존 사실.
  if (current === 'evolving') return 'evolving';
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
  // CRITICAL #2 정정: cluster pattern buffer + lock state 영역 컴포넌트-수준 useRef
  // 영역 hoist — circuit-changed → canvasNonce++ → PipelineCanvas remount 시점
  // useEffect cleanup 영역 buffer 영역 reset catch 영역 회피.
  // 학습 진행 영역 view 전환 / circuit 변경 영역 영역 보존 사실.
  const clusterBuffersRef = useRef<Record<0|1|2|3, number[][]>>({ 0: [], 1: [], 2: [], 3: [] });
  const clusterLockedRef = useRef<Record<0|1|2|3, boolean>>({ 0: false, 1: false, 2: false, 3: false });
  const learningActiveRef = useRef<boolean>(false);
  const lastGestureNameRef = useRef<string | null>(null);
  const gestureStableCountRef = useRef<number>(0);
  // EVOLVING — pattern buffer + target cluster + frame count.
  // INFERENCE 영역 'evolve-trigger' event 영역 본격 진입 — 현 winner cluster 영역 target.
  // 학술 정합: Parisi et al. 2019; 한계: McCloskey & Cohen 1989 (catastrophic forgetting).
  //   별도 검증 mandatory.
  const evolveBufferRef = useRef<number[][]>([]);
  const evolveTargetClusterRef = useRef<number | null>(null);
  const [evolveFrames, setEvolveFrames] = useState<number>(0);
  // stale closure 회피 — liveResult ref mirror.
  const liveResultRef = useRef<LivePredictResult | null>(null);

  useEffect(() => { framesRef.current = clusterFrames; }, [clusterFrames]);
  useEffect(() => { liveResultRef.current = liveResult; }, [liveResult]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // phase emit — PipelineCanvas (LEARN/INFER 노드) 가 'training-phase' event 구독.
  // (ModeIndicator 컴포넌트는 영구 폐기 — Pipeline view 통합)
  useEffect(() => {
    const detail: TrainingPhaseDetail = {
      phase,
      clusterFrames: { ...clusterFrames },
      target: CLUSTER_TARGET_FRAMES,
      evolveFrames: phase === 'evolving' ? evolveFrames : 0,
      evolveTarget: EVOLVE_TARGET_FRAMES,
    };
    emitBackendEvent<TrainingPhaseDetail>('training-phase', detail);
    if ((phase === 'trained' || phase === 'inference') && !trainingCompleteEmittedRef.current) {
      trainingCompleteEmittedRef.current = true;
      emitBackendEvent('training-complete', detail);
    }
  }, [phase, clusterFrames, evolveFrames]);

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

  // EVOLVING trigger — Sidebar Evolve button 영역 'evolve-trigger' emit 영역 정합.
  // INFERENCE phase 영역 영역만 정합. cluster_lock(false) → tick loop 영역 EVOLVING handler.
  // 학술 정합: Parisi et al. 2019; 한계: McCloskey & Cohen 1989 (catastrophic forgetting).
  //   별도 검증 mandatory.
  useEffect(() => {
    const off = onBackendEvent('evolve-trigger', () => {
      if (phaseRef.current !== 'inference') {
        setTrainStatus('Evolve: INFERENCE phase 영역 영역만 활성 — trigger 무시.');
        return;
      }
      const winner = liveResultRef.current?.winner ?? null;
      let target: number | null = null;
      if (winner && winner.startsWith('cluster_')) {
        const ci = parseInt(winner.slice('cluster_'.length), 10);
        if (Number.isFinite(ci) && ci >= 0 && ci <= 3) target = ci;
      }
      if (target === null) {
        setTrainStatus('Evolve: winner cluster 영역 0 — 자세 영역 보이세요.');
        return;
      }
      evolveTargetClusterRef.current = target;
      evolveBufferRef.current = [];
      setEvolveFrames(0);
      // backend cluster_lock body {lock: false} (commit 70bc020 docs 정합).
      void (async () => {
        const label = CLUSTER_TO_LABEL[target] ?? `cluster ${target}`;
        setTrainStatus(`Evolve: ${label} cluster unlock + 진화 시작…`);
        for (let c = 0; c < 4; c += 1) {
          const r = await getClient().clusterLock(c, { lock: false });
          if (r.ok) clusterLockedRef.current[c as 0|1|2|3] = false;
        }
        phaseRef.current = 'evolving';
        savePhase('evolving');
        setPhase('evolving');
      })();
    });
    return off;
  }, []);

  // autoLive: 카메라 연결 동기화.
  useEffect(() => {
    if (!autoLive) return;
    setLivePredict(cameraConnected);
    if (!cameraConnected) setLiveResult(null);
  }, [autoLive, cameraConnected]);

  // 메인 batch supervised + inference loop (N4 정합).
  // autoCapture=true 시 진입. cameraConnected + hasHand 영역 매 350ms tick.
  //
  //  - phase='inference' 영역: stdp=false inject, cluster mean readout, winner 결정.
  //  - 그 외 (untrained/learning/partial): MediaPipe label 영역 N=5 stable +
  //    conf >= 0.85 영역 cluster 별 frame buffer 영역 pattern 누적.
  //    cluster buffer 영역 30 frame 도달 영역 1회 batch `clusterTrainSupervised`
  //    호출 (cluster 8 OUT broadcast supervisor → cluster 8/8 fire).
  //    4 cluster 영역 모두 30 도달 영역 `clusterLock(0..3, lock=true)` →
  //    phase = 'trained' → 'inference' 영역 자동 전환.
  //
  // 직전 frame-by-frame `injectPattern(stdp:true, targetOut)` 영역 폐기 — single
  // target supervisor 영역 cluster mutual excitation +2.0 영역 8 OUT broadcast
  // 미달 catch (cluster fire = 1/8). N4 batch broadcast 영역 정합 정정 영역.
  useEffect(() => {
    if (!autoCapture || !cameraConnected) {
      setLiveResult(null);
      return;
    }
    let cancelled = false;
    // CRITICAL #2 정정: 직전 closure-local clusterBuffers / clusterLocked / learningActive
    // / lastGestureName / gestureStableCount 영역 컴포넌트-수준 useRef (clusterBuffersRef
    // / clusterLockedRef / learningActiveRef / lastGestureNameRef / gestureStableCountRef)
    // 영역 통합 사실 — remount 영역 학습 진행 영역 보존.

    const tick = async () => {
      if (cancelled) return;
      const feat = featRef.current;
      if (!hasHandRef.current || !feat) {
        lastGestureNameRef.current = null;
        gestureStableCountRef.current = 0;
        if (phaseRef.current !== 'inference') setLiveResult(null);
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }
      const pattern = feat.slice(0, 16);
      const gName = gestureNameRef.current;
      const gScore = gestureScoreRef.current;
      const currentPhase = phaseRef.current;

      // EVOLVING phase — INFERENCE 영역 cluster_lock(false) 후 N=10 frame 영역
      // lower-weight (15) supervised retrain. 도달 영역 1회 batch
      // clusterTrainSupervised → cluster_lock(true) → INFERENCE 복귀.
      // 학술 정합: Parisi et al. 2019; 한계: McCloskey & Cohen 1989.
      if (currentPhase === 'evolving') {
        const targetC = evolveTargetClusterRef.current;
        if (targetC === null) {
          phaseRef.current = 'inference';
          savePhase('inference');
          setPhase('inference');
          if (!cancelled) setTimeout(tick, TICK_MS);
          return;
        }
        const gestureMappable = gName !== null && GESTURE_LABEL_TO_CLUSTER[gName] !== undefined;
        const okScore = gScore >= GESTURE_CONFIDENCE_MIN;
        const matchTarget = gestureMappable && GESTURE_LABEL_TO_CLUSTER[gName!] === targetC;
        if (matchTarget && okScore) {
          evolveBufferRef.current.push(pattern);
          const next = evolveBufferRef.current.length;
          setEvolveFrames(next);
          const label = CLUSTER_TO_LABEL[targetC] ?? `cluster ${targetC}`;
          setTrainStatus(`Evolve: ${label} 진화 중 ${next}/${EVOLVE_TARGET_FRAMES}…`);
          if (next >= EVOLVE_TARGET_FRAMES) {
            const batch = evolveBufferRef.current.slice();
            evolveBufferRef.current = [];
            const r = await getClient().clusterTrainSupervised(batch, targetC, {
              supervisorWeight: EVOLVE_SUPERVISOR_WEIGHT,
            });
            if (cancelled) return;
            if (r.ok && r.data.ok) {
              setTrainStatus(`✓ Evolve ${label} 완료 (Δw ${r.data.weight_changes_count} syn). cluster lock 영구화…`);
              for (let c = 0; c < 4; c += 1) {
                const lockR = await getClient().clusterLock(c, { lock: true });
                if (cancelled) return;
                if (lockR.ok) clusterLockedRef.current[c as 0|1|2|3] = true;
              }
            } else {
              const reason = r.ok ? (r.data.reason ?? 'unknown') : r.reason;
              setTrainStatus(`✗ Evolve ${label} 실패: ${reason}`);
            }
            evolveTargetClusterRef.current = null;
            setEvolveFrames(0);
            phaseRef.current = 'inference';
            savePhase('inference');
            setPhase('inference');
          }
        }
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }

      // INFERENCE phase — STDP 폐기, cluster mean readout 영역만.
      if (currentPhase === 'inference') {
        const r = await getClient().injectPattern(pattern, { stdp: false });
        if (cancelled) return;
        if (r.ok) {
          // HIGH #3 정정: deriveWinner 영역 단일 source 영역 위임.
          // 직전 max-only winner 영역 — 본 함수 영역 margin 임계 영역 정합 사실
          // (margin < WINNER_MARGIN_DEFAULT 영역 winner null = WTA tie).
          // Backend B+3 combo (a8e8165) 영역 cluster_rates / winner_cluster /
          // winner_margin 영역 동봉 영역 그것 영역 우선 활용 — frontend 자체 산출 회피.
          const w = deriveWinner((r.data.out_rates || {}) as Record<string, number>, {
            clusterRates: r.data.cluster_rates,
            winnerCluster: r.data.winner_cluster,
            winnerMargin: r.data.winner_margin,
          });
          const winner = w.cluster !== null ? `cluster_${w.cluster}` : null;
          const ratesExposed: Record<string, number> = {};
          for (let i = 0; i < 4; i += 1) ratesExposed[`cluster_${i}`] = w.clusterRates[i];
          setLiveResult({ winner, rates: ratesExposed, confidence: w.confidence });
        }
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }

      // 학습 phase (untrained / learning / partial / trained 도달 직전) —
      // teacher stability tracking.
      const gestureMappable = gName !== null && GESTURE_LABEL_TO_CLUSTER[gName] !== undefined;
      if (gestureMappable && gScore >= GESTURE_CONFIDENCE_MIN) {
        if (gName === lastGestureNameRef.current) gestureStableCountRef.current += 1;
        else { lastGestureNameRef.current = gName; gestureStableCountRef.current = 1; }
      } else {
        lastGestureNameRef.current = null;
        gestureStableCountRef.current = 0;
      }
      const cluster = gestureMappable ? GESTURE_LABEL_TO_CLUSTER[gName!] : null;
      const stable = cluster !== null
        && gScore >= GESTURE_CONFIDENCE_MIN
        && gestureStableCountRef.current >= GESTURE_STABLE_FRAMES;

      // pattern 누적 trigger 영역: stable AND 해당 cluster 영역 < 30 frame.
      let shouldCapture = false;
      if (stable && cluster !== null) {
        const cur = framesRef.current[cluster as 0|1|2|3];
        if (cur < CLUSTER_TARGET_FRAMES) shouldCapture = true;
      }

      if (shouldCapture && cluster !== null) {
        if (!learningActiveRef.current) learningActiveRef.current = true;
        const ci = cluster as 0|1|2|3;
        // cluster buffer 영역 pattern 누적 — backend 호출 0, 30 도달 시점 1회 flush.
        clusterBuffersRef.current[ci].push(pattern);
        // 진행 카운트 영역 즉시 표시 (사용자 시각 catch).
        const progressNext = { ...framesRef.current };
        progressNext[ci] = Math.min(CLUSTER_TARGET_FRAMES, clusterBuffersRef.current[ci].length);
        framesRef.current = progressNext;
        // CRITICAL #2 정정: 매 frame 영역 saveClusterFrames 즉시 호출 — remount 영역
        // 학습 진행 영역 localStorage 영역 즉시 영구화 catch.
        saveClusterFrames(progressNext);
        setClusterFrames(progressNext);
        const label = CLUSTER_TO_LABEL[cluster] ?? `cluster ${cluster}`;
        setTrainStatus(`${label}: capturing ${clusterBuffersRef.current[ci].length}/${CLUSTER_TARGET_FRAMES}…`);

        // liveResult 영역 학습 중 진행률 표시.
        const ratesExposed: Record<string, number> = {};
        for (let i = 0; i < 4; i += 1) {
          const buf = clusterBuffersRef.current[i as 0|1|2|3];
          ratesExposed[`cluster_${i}`] = buf.length / CLUSTER_TARGET_FRAMES;
        }
        setLiveResult({
          winner: `cluster_${cluster}`,
          rates: ratesExposed,
          confidence: clusterBuffersRef.current[ci].length / CLUSTER_TARGET_FRAMES,
        });

        // phase 영역 평가 (learning 진입).
        const learningPhase = derivePhase(progressNext, phaseRef.current, true);
        if (learningPhase !== phaseRef.current) {
          phaseRef.current = learningPhase;
          savePhase(learningPhase);
          setPhase(learningPhase);
        }

        // 30 frame 도달 → batch flush. cluster broadcast supervisor (8 OUT 모두).
        if (clusterBuffersRef.current[ci].length >= CLUSTER_TARGET_FRAMES) {
          setTrainStatus(`${label}: batch supervised 진행 (${CLUSTER_TARGET_FRAMES} frames)…`);
          const batch = clusterBuffersRef.current[ci].slice();
          // buffer drain — 추가 누적 회피.
          clusterBuffersRef.current[ci] = [];
          const r = await getClient().clusterTrainSupervised(batch, cluster);
          if (cancelled) return;
          if (r.ok && r.data.ok) {
            // frames[c] = 30 영구화 (학습 완료 사실).
            const next = { ...framesRef.current };
            next[ci] = CLUSTER_TARGET_FRAMES;
            framesRef.current = next;
            saveClusterFrames(next);
            setClusterFrames(next);
            setTrainStatus(`✓ ${label} 학습 완료 (Δw ${r.data.weight_changes_count} syn, ${r.data.target_outs.length} OUT broadcast)`);

            // cluster lock — 추가 학습 0 (catastrophic forgetting 회피).
            if (!clusterLockedRef.current[ci]) {
              const lockR = await getClient().clusterLock(cluster, { lock: true });
              if (cancelled) return;
              if (lockR.ok) clusterLockedRef.current[ci] = true;
            }

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
          } else {
            const reason = r.ok ? (r.data.reason ?? 'unknown') : r.reason;
            setTrainStatus(`✗ ${label} batch 실패: ${reason}`);
            // 실패 시 frames 영역 rollback (재시도 가능 catch).
            const rollback = { ...framesRef.current };
            rollback[ci] = 0;
            framesRef.current = rollback;
            saveClusterFrames(rollback);
            setClusterFrames(rollback);
          }
        }
      } else {
        // 학습 trigger 미충족 — phase 영역 평가 영역 (frames 변경 0 영역 derive).
        const newPhase = derivePhase(framesRef.current, phaseRef.current, learningActiveRef.current);
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
    trainStatus,
    livePredict,
    liveResult,
    setLivePredict,
    setTrainStatus,
    clusterFrames,
    phase,
    evolveFrames,
    evolveTarget: EVOLVE_TARGET_FRAMES,
  };
}
