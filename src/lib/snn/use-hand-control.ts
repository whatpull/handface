// 카메라 기반 훅 — PipelineCanvas (LEARN/INFER 노드) 가 직접 호출.
// (CameraQuickControls 컴포넌트는 영구 폐기 — Pipeline view 통합)
//
// 카메라 모드: 손 피드 표시 + 추론(injectPattern stdp=false)만 가능.
// 패턴 학습은 GRID 모드 전용. 카메라 SNN 학습 기능 전체 제거 (2026-05-14).
//
// State machine (단순화):
//   INFERENCE: 카메라 연결 + hand 감지 시 매 350ms inject stdp=false → deriveWinner.

import { useCallback, useEffect, useRef, useState } from 'react';

import { getClient } from '@/lib/backend/client';
import { onBackendEvent, emitBackendEvent, type HandFeatureDetail, type TrainingPhaseDetail } from '@/lib/backend/events';
// HIGH #3 정정: cluster winner 산출 단일 source.
import { deriveWinner } from '@/lib/snn/winner-derivation';
// 사용자 명시 2026-05-06: INFERENCE tick winner 변경 → OUT count ↑ path.
import { incrementCount } from '@/lib/snn/out-exemplars';

// NodeLearn / NodeInfer 에서 teacher 표시 용으로 사용 — 빈 맵 유지 (backward compat).
export const GESTURE_LABEL_TO_CLUSTER: Record<string, number> = {};

// path Y (2026-05-07) — orientation 4종으로 통일 (─ │ ╲ ╱).
// INFERENCE phase 에서 winner cluster 라벨 표시용 — 사용자 네이밍 fallback.
export const CLUSTER_TO_LABEL: Record<number, string> = {};

// gesture confidence 상수 — NodeLearn 에서 import 함 (teacher 표시용으로만 사용).
export const GESTURE_CONFIDENCE_MIN = 0.85;
export const GESTURE_STABLE_FRAMES = 5;
// cluster 당 target frame 수 — backward compat.
export const CLUSTER_TARGET_FRAMES = 30;

export type TrainingPhase = 'untrained' | 'learning' | 'partial' | 'trained' | 'inference';

// P209: backward compat — ClusterFrames 는 {0,1,2,3} 형태 유지.
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

const TRAINING_PHASE_KEY = 'handface.training.phase.v2'; // v2 — P209 schema 변경
const PATTERN_COUNT_KEY  = 'handface.pattern.count.v1';
const LAST_ACTION_KEY    = 'handface.last.action.v1';

const TICK_MS = 350;

function loadPhase(): TrainingPhase {
  if (typeof window === 'undefined') return 'untrained';
  try {
    const raw = localStorage.getItem(TRAINING_PHASE_KEY);
    if (raw === 'untrained' || raw === 'learning' || raw === 'inference') return raw;
  } catch { /* noop */ }
  return 'untrained';
}

function savePhase(phase: TrainingPhase) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(TRAINING_PHASE_KEY, phase); } catch { /* noop */ }
}

function loadPatternCount(): number {
  if (typeof window === 'undefined') return 0;
  try { return Math.max(0, parseInt(localStorage.getItem(PATTERN_COUNT_KEY) ?? '0', 10) || 0); } catch { return 0; }
}

function savePatternCount(n: number) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(PATTERN_COUNT_KEY, String(n)); } catch { /* noop */ }
}

function loadLastAction(): string {
  if (typeof window === 'undefined') return '';
  try { return localStorage.getItem(LAST_ACTION_KEY) ?? ''; } catch { return ''; }
}

function saveLastAction(s: string) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(LAST_ACTION_KEY, s); } catch { /* noop */ }
}

export function useHandControl(cameraConnected: boolean, autoLive = false, autoCapture = false) {
  const [, setHasHand] = useState(false);
  const [trainStatus, setTrainStatus] = useState<string>('');
  const [, setLivePredict] = useState(false);
  const [, setLiveResult] = useState<LivePredictResult | null>(null);

  // patternCount — grid 학습에서 broadcast 받는 값. camera path 에서는 사용 안 함.
  const [patternCount, setPatternCount] = useState<number>(() => loadPatternCount());
  const [phase, setPhase] = useState<TrainingPhase>(() => loadPhase());
  const [lastAutoAction, setLastAutoAction] = useState<string>(() => loadLastAction());

  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);
  const gestureNameRef = useRef<string | null>(null);
  const gestureScoreRef = useRef<number>(0);

  const phaseRef = useRef<TrainingPhase>(phase);
  const patternCountRef = useRef<number>(patternCount);

  // INFERENCE winner 추적 — 변경 시 OUT count ↑.
  const lastInferenceWinnerRef = useRef<number | null>(null);

  const trainingCompleteEmittedRef = useRef<boolean>(false);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { patternCountRef.current = patternCount; }, [patternCount]);

  // training-phase emit — phase / patternCount 변경 시점 broadcast.
  useEffect(() => {
    const detail: TrainingPhaseDetail = {
      phase,
      // backward compat: clusterFrames[0] = patternCount.
      clusterFrames: { 0: patternCount, 1: 0, 2: 0, 3: 0 },
      target: CLUSTER_TARGET_FRAMES,
    };
    emitBackendEvent<TrainingPhaseDetail>('training-phase', detail);
    if ((phase === 'trained' || phase === 'inference') && !trainingCompleteEmittedRef.current) {
      trainingCompleteEmittedRef.current = true;
      emitBackendEvent('training-complete', detail);
    }
  }, [phase, patternCount]);

  // training-cleared — 모든 상태 초기화.
  useEffect(() => {
    const off = onBackendEvent('training-cleared', () => {
      lastInferenceWinnerRef.current = null;
      trainingCompleteEmittedRef.current = false;
      patternCountRef.current = 0;
      phaseRef.current = 'untrained';
      setPatternCount(0);
      setPhase('untrained');
      setLastAutoAction('');
      savePatternCount(0);
      savePhase('untrained');
      saveLastAction('');
      setTrainStatus('Reset 완료 — GRID 모드에서 패턴을 학습하세요.');
    });
    return off;
  }, []);

  // hand-feature listener.
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

  // 메인 loop — 350ms tick.
  // 카메라 모드: 추론(stdp=false inject)만 수행. 학습 없음.
  useEffect(() => {
    if (!autoCapture || !cameraConnected) {
      setLiveResult(null);
      return;
    }
    let cancelled = false;

    const tick = async () => {
      if (cancelled) return;
      const feat = featRef.current;
      if (!hasHandRef.current || !feat) {
        setLiveResult(null);
        if (phaseRef.current === 'inference') {
          lastInferenceWinnerRef.current = null;
          setTrainStatus('INFER: 카메라 hand 미감지 — 손을 카메라에 보여주세요');
        }
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }
      const pattern = feat.slice(0, 16);
      const currentPhase = phaseRef.current;

      // INFERENCE phase — stdp=false inject, cluster mean readout.
      if (currentPhase === 'inference') {
        const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
        if (isOffline) {
          setTrainStatus('Offline — 추론 불가 (네트워크 연결 필요)');
          if (!cancelled) setTimeout(tick, TICK_MS);
          return;
        }
        const r = await getClient().injectPattern(pattern, { stdp: false });
        if (cancelled) return;
        if (!r.ok) {
          setTrainStatus(`INFER 실패: ${r.reason || `HTTP ${r.status ?? '?'}`}`);
          if (!cancelled) setTimeout(tick, TICK_MS);
          return;
        }
        {
          const w = deriveWinner((r.data.out_rates || {}) as Record<string, number>, {
            clusterRates: r.data.cluster_rates,
            winnerCluster: r.data.winner_cluster,
            winnerMargin: r.data.winner_margin,
          });
          const winner = w.cluster !== null ? `cluster_${w.cluster}` : null;
          const ratesExposed: Record<string, number> = {};
          const nCluster = Math.max(w.clusterRates.length, patternCountRef.current);
          for (let i = 0; i < nCluster; i += 1) ratesExposed[`cluster_${i}`] = w.clusterRates[i] ?? 0;
          setLiveResult({ winner, rates: ratesExposed, confidence: w.confidence });
          if (winner) {
            const cLabel = `패턴 ${(w.cluster ?? 0) + 1}`;
            setTrainStatus(`INFER ${cLabel} (margin ${(w.margin * 100).toFixed(0)}% / ${w.clusterRates.map((r) => r.toFixed(0)).join('·')}Hz)`);
          } else if (w.max <= 0) {
            setTrainStatus('INFER: cluster_rates 모두 0 — backend fire 0');
          } else {
            setTrainStatus(`INFER: WTA tie — margin ${(w.margin * 100).toFixed(0)}% < 10%`);
          }
          if (w.cluster !== null && w.cluster !== lastInferenceWinnerRef.current) {
            lastInferenceWinnerRef.current = w.cluster;
            incrementCount(`out_${w.cluster}_0`, 'gesture', pattern);
          }
        }
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }

      // UNTRAINED / LEARNING phase — 카메라 모드에서는 학습 없음. 상태만 표시.
      setTrainStatus('카메라 모드 — GRID 모드에서 학습 후 추론 가능');
      if (!cancelled) setTimeout(tick, TICK_MS);
    };

    tick();
    return () => { cancelled = true; };
  }, [autoCapture, cameraConnected]);

  // INFERENCE phase 전환.
  const enterInference = useCallback(() => {
    savePhase('inference');
    phaseRef.current = 'inference';
    setPhase('inference');
  }, []);

  // 외부 반환 — trainStatus + lastAutoAction (NodeLearn 표시용).
  // armLearning 제거 — 카메라 학습 없음.
  return { trainStatus, lastAutoAction, patternCount, phase, enterInference };
}
