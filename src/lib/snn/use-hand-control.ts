// GRID 전용 훅 — PipelineCanvas (LEARN/INFER 노드) 가 직접 호출.
// 카메라 입력 제거 (2026-05-14). GRID 학습/추론 phase 관리 전용.
//
// State machine (단순화):
//   untrained → learning → partial/trained → inference

import { useCallback, useEffect, useRef, useState } from 'react';

import { onBackendEvent, emitBackendEvent, type TrainingPhaseDetail } from '@/lib/backend/events';

// NodeLearn / NodeInfer 에서 teacher 표시 용으로 사용 — 빈 맵 유지 (backward compat).
export const GESTURE_LABEL_TO_CLUSTER: Record<string, number> = {};

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

export function useHandControl() {
  const [trainStatus, setTrainStatus] = useState<string>('');

  // patternCount — grid 학습에서 broadcast 받는 값.
  const [patternCount, setPatternCount] = useState<number>(() => loadPatternCount());
  const [phase, setPhase] = useState<TrainingPhase>(() => loadPhase());
  const [lastAutoAction, setLastAutoAction] = useState<string>(() => loadLastAction());

  const phaseRef = useRef<TrainingPhase>(phase);
  const patternCountRef = useRef<number>(patternCount);

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

  // INFERENCE phase 전환.
  const enterInference = useCallback(() => {
    savePhase('inference');
    phaseRef.current = 'inference';
    setPhase('inference');
  }, []);

  // 외부 반환 — trainStatus + lastAutoAction (NodeLearn 표시용).
  return { trainStatus, lastAutoAction, patternCount, phase, enterInference };
}
