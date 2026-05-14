// 카메라 기반 학습 훅 — PipelineCanvas (LEARN/INFER 노드) 가 직접 호출.
// (CameraQuickControls 컴포넌트는 영구 폐기 — Pipeline view 통합)
//
// 지도 학습 redesign (P210 2026-05-14):
//   P209 코사인 유사도 기반 novelty 판단 폐기 → MediaPipe gesture label 기반 지도 학습.
//   gestureName + gScore ≥ 0.85 안정 → 기존 gesture: clusterTrainSupervised 강화.
//                                       신규 gesture (≤5개): autoTrainOrSpawn 으로 spawn.
//   localStorage 'handface.gesture.labelMap.v1' 에 gesture→clusterIdx 영구 보존.
//
// State machine (단순화):
//   1. UNTRAINED   — 학습 0, 카메라/hand 감지만.
//   2. LEARNING    — ≥1 cluster spawned / reinforced. 계속 학습 가능.
//   3. INFERENCE   — 추론 모드 (매 350ms inject stdp=false). 학습도 동시 진행.
//
// PARTIAL / TRAINED 미사용 (backward compat 보존 — events.ts type 유지).
//
// 정직 한계:
//  - gesture label 미감지 (None/Unknown) 시 학습 skip — gesture confidence 0.85 미만도 skip.
//  - INFERENCE tick winner 영역 deriveWinner 의존 — cluster mean readout 정합.

import { useCallback, useEffect, useRef, useState } from 'react';

import { getClient } from '@/lib/backend/client';
import { onBackendEvent, emitBackendEvent, type HandFeatureDetail, type TrainingPhaseDetail } from '@/lib/backend/events';
// HIGH #3 정정: cluster winner 산출 단일 source.
import { deriveWinner } from '@/lib/snn/winner-derivation';
// 사용자 명시 2026-05-06: INFERENCE tick winner 변경 → OUT count ↑ path.
import { incrementCount } from '@/lib/snn/out-exemplars';

// NodeLearn / NodeInfer 에서 teacher 표시 용으로 사용 — 매핑 체크 로직 재사용.
// P210: gesture label → clusterIdx 매핑은 gestureLabelToClusterRef (런타임 + localStorage) 에서 관리.
//        NodeLearn 이 import 하는 symbol 이므로 빈 맵으로 유지 (backward compat).
export const GESTURE_LABEL_TO_CLUSTER: Record<string, number> = {};

// path Y (2026-05-07) — orientation 4종으로 통일 (─ │ ╲ ╱).
// INFERENCE phase 에서 winner cluster 라벨 표시용 — 사용자 네이밍 fallback.
export const CLUSTER_TO_LABEL: Record<number, string> = {};

// 제스처 안정 임계 — P210: confidence ≥0.85 (지도 학습 — 라벨 신뢰도 높여야 오염 방지).
export const GESTURE_CONFIDENCE_MIN = 0.85;
export const GESTURE_STABLE_FRAMES = 5;
// cluster 당 target frame 수 — clusterTrainSupervised 호출 주기 (10 frame마다).
export const CLUSTER_TARGET_FRAMES = 30;

// autoTrainOrSpawn / clusterTrainSupervised 호출 주기 (stable frame 누적 단위).
const AUTO_TRAIN_EVERY_FRAMES = 10;
// 동일 gesture에 대한 학습 중복 호출 방지 debounce (ms).
const AUTO_TRAIN_DEBOUNCE_MS = 500;
// 최대 gesture → cluster 매핑 수 (신규 gesture spawn 상한).
const MAX_GESTURE_CLUSTERS = 5;

// P210: gesture label → clusterIdx localStorage 키.
const GESTURE_LABEL_MAP_KEY = 'handface.gesture.labelMap.v1';

function loadGestureLabelMap(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(GESTURE_LABEL_MAP_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      return parsed as Record<string, number>;
    }
  } catch { /* noop */ }
  return {};
}

function saveGestureLabelMap(map: Record<string, number>) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(GESTURE_LABEL_MAP_KEY, JSON.stringify(map)); } catch { /* noop */ }
}

function clearGestureLabelMap() {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(GESTURE_LABEL_MAP_KEY); } catch { /* noop */ }
}

export type TrainingPhase = 'untrained' | 'learning' | 'partial' | 'trained' | 'inference';

// P209: backward compat — ClusterFrames 는 {0,1,2,3} 형태 유지.
// camera path 에서는 0-index 에 patternCount, 나머지 0 으로 emit.
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

  // P209: patternCount — spawned cluster 수 (≥1 → LEARNING phase).
  const [patternCount, setPatternCount] = useState<number>(() => loadPatternCount());
  const [phase, setPhase] = useState<TrainingPhase>(() => loadPhase());
  // P209: lastAutoAction — 'spawned' | 'reinforced' | 'spawn_failed' | '' 표시용.
  const [lastAutoAction, setLastAutoAction] = useState<string>(() => loadLastAction());

  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);
  const gestureNameRef = useRef<string | null>(null);
  const gestureScoreRef = useRef<number>(0);

  const phaseRef = useRef<TrainingPhase>(phase);
  const patternCountRef = useRef<number>(patternCount);

  // P209: stable gesture tracking.
  const lastGestureNameRef = useRef<string | null>(null);
  const gestureStableCountRef = useRef<number>(0);
  // P209: stable frame 누적 카운터 — AUTO_TRAIN_EVERY_FRAMES마다 autoTrainOrSpawn 호출.
  const stableFrameAccRef = useRef<number>(0);
  // P209: debounce — 마지막 autoTrainOrSpawn 완료 시각.
  const lastAutoTrainedAtRef = useRef<number>(0);
  // P209: 진행 중 (pending) 호출 방지.
  const autoTrainPendingRef = useRef<boolean>(false);
  // P209 fix: spawn 후 쿨다운 — 연쇄 무한 spawn 방지 (5초).
  const lastSpawnTimeRef = useRef<number>(0);
  // P209 fix: 명시적 학습 arm 플래그 — armLearning() 호출 전까지 autoTrainOrSpawn 차단.
  // localStorage 에서 LEARNING/INFERENCE 복원 시 자동 arm (재진입 흐름 보존).
  const learningArmedRef = useRef<boolean>(phase === 'learning' || phase === 'inference');

  // INFERENCE winner 추적 — 변경 시 OUT count ↑.
  const lastInferenceWinnerRef = useRef<number | null>(null);

  // P210: gesture label → clusterIdx 매핑 (지도 학습 핵심).
  const gestureLabelToClusterRef = useRef<Record<string, number>>(loadGestureLabelMap());
  // P210: 현재 안정 gesture의 최근 패턴 버퍼 — clusterTrainSupervised 배치용 (최대 8).
  const recentPatternsRef = useRef<number[][]>([]);

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
      lastGestureNameRef.current = null;
      gestureStableCountRef.current = 0;
      stableFrameAccRef.current = 0;
      lastAutoTrainedAtRef.current = 0;
      autoTrainPendingRef.current = false;
      lastSpawnTimeRef.current = 0;
      learningArmedRef.current = false;
      lastInferenceWinnerRef.current = null;
      trainingCompleteEmittedRef.current = false;
      // P210: gesture label map 초기화.
      gestureLabelToClusterRef.current = {};
      recentPatternsRef.current = [];
      clearGestureLabelMap();
      patternCountRef.current = 0;
      phaseRef.current = 'untrained';
      setPatternCount(0);
      setPhase('untrained');
      setLastAutoAction('');
      savePatternCount(0);
      savePhase('untrained');
      saveLastAction('');
      setTrainStatus('Reset 완료 — 카메라에 손을 보여주세요. 패턴이 자동으로 학습됩니다.');
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
  // INFERENCE: stdp=false inject → deriveWinner.
  // LEARNING / UNTRAINED: gesture stable → autoTrainOrSpawn.
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
        lastGestureNameRef.current = null;
        gestureStableCountRef.current = 0;
        stableFrameAccRef.current = 0;
        setLiveResult(null);
        if (phaseRef.current === 'inference') {
          lastInferenceWinnerRef.current = null;
          setTrainStatus('INFER: 카메라 hand 미감지 — 손을 카메라에 보여주세요');
        }
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }
      const pattern = feat.slice(0, 16);
      const gName = gestureNameRef.current;
      const gScore = gestureScoreRef.current;
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
        // INFERENCE 중에도 학습 계속 — autoTrainOrSpawn 호출 가능.
        void runAutoTrain(pattern, gName, gScore, cancelled);
        if (!cancelled) setTimeout(tick, TICK_MS);
        return;
      }

      // UNTRAINED / LEARNING phase — gesture stable → autoTrainOrSpawn.
      await runAutoTrain(pattern, gName, gScore, cancelled);
      if (!cancelled) setTimeout(tick, TICK_MS);
    };

    // P210 지도 학습 로직 — gesture label 기반 supervised training.
    // gesture stable ≥5 frames + confidence ≥0.85 + debounce 통과 시 호출.
    const runAutoTrain = async (
      pattern: number[],
      gName: string | null,
      gScore: number,
      isCancelled: boolean,
    ) => {
      if (isCancelled) return;
      // 명시적 학습 arm 체크 — armLearning() 호출 전에는 차단.
      if (!learningArmedRef.current) return;
      // spawn 쿨다운 — spawned 후 5초간 전체 차단 (연쇄 무한 spawn 방지).
      if (Date.now() - lastSpawnTimeRef.current < 5000) return;
      // gesture stability tracking — label + confidence ≥ GESTURE_CONFIDENCE_MIN 필수.
      const hasGesture =
        gName !== null &&
        gName !== 'None' &&
        gName !== 'Unknown' &&
        gScore >= GESTURE_CONFIDENCE_MIN;
      if (hasGesture) {
        if (gName === lastGestureNameRef.current) {
          gestureStableCountRef.current += 1;
          // 패턴 버퍼 누적 (최대 8개 유지 — FIFO).
          recentPatternsRef.current.push([...pattern]);
          if (recentPatternsRef.current.length > 8) recentPatternsRef.current.shift();
        } else {
          lastGestureNameRef.current = gName;
          gestureStableCountRef.current = 1;
          stableFrameAccRef.current = 0;
          recentPatternsRef.current = [[...pattern]];
        }
      } else {
        lastGestureNameRef.current = null;
        gestureStableCountRef.current = 0;
        stableFrameAccRef.current = 0;
        recentPatternsRef.current = [];
        return;
      }
      // 안정 조건 미충족.
      if (gestureStableCountRef.current < GESTURE_STABLE_FRAMES) return;
      stableFrameAccRef.current += 1;
      // AUTO_TRAIN_EVERY_FRAMES 마다 호출.
      if (stableFrameAccRef.current % AUTO_TRAIN_EVERY_FRAMES !== 1) return;
      // debounce.
      const now = Date.now();
      if (now - lastAutoTrainedAtRef.current < AUTO_TRAIN_DEBOUNCE_MS) return;
      // 중복 호출 방지.
      if (autoTrainPendingRef.current) return;
      autoTrainPendingRef.current = true;
      lastAutoTrainedAtRef.current = now;
      setTrainStatus(`학습 중 [${gName}]...`);

      const labelMap = gestureLabelToClusterRef.current;
      const existingCluster = labelMap[gName!];
      const patterns = recentPatternsRef.current.length > 0
        ? recentPatternsRef.current
        : [[...pattern]];

      try {
        if (existingCluster !== undefined) {
          // --- 기존 gesture: clusterTrainSupervised 로 강화 ---
          const r = await getClient().clusterTrainSupervised(patterns, existingCluster, {
            intensity: 3.0,
            observeMs: 150,
            vectorized: true,
          });
          if (isCancelled) return;
          if (!r.ok) {
            setTrainStatus(`지도 학습 실패 [${gName}]: ${r.reason || `HTTP ${r.status ?? '?'}`}`);
            return;
          }
          const actionLabel = `[${gName}] → 패턴 ${existingCluster + 1} 강화 (Δw ${r.data.weight_changes_count})`;
          setLastAutoAction(actionLabel);
          saveLastAction(actionLabel);
          setTrainStatus(`↻ ${actionLabel}`);
          emitBackendEvent('training-changed', { action: 'reinforced', clusterIdx: existingCluster, label: actionLabel });
        } else if (Object.keys(labelMap).length < MAX_GESTURE_CLUSTERS) {
          // --- 신규 gesture: autoTrainOrSpawn 으로 새 cluster spawn ---
          const avgPattern = patterns[0].map((_, i) =>
            patterns.reduce((s, p) => s + p[i], 0) / patterns.length,
          );
          const r = await getClient().autoTrainOrSpawn(avgPattern, {
            vigilanceThreshold: 0.0,   // 0.0 → 항상 novel spawn
            minWinnerRateHz: 0.0,      // 0.0 → rate 조건 무시
            trainIterations: 30,
            intensity: 3.0,
            observeMs: 150,
            maxClusters: MAX_GESTURE_CLUSTERS,
          });
          if (isCancelled) return;
          if (!r.ok) {
            setTrainStatus(`제스처 spawn 실패 [${gName}]: ${r.reason || `HTTP ${r.status ?? '?'}`}`);
            return;
          }
          const d = r.data;
          if (d.action === 'spawned') {
            lastSpawnTimeRef.current = Date.now();
            const ci = d.cluster_idx;
            // gesture → clusterIdx 매핑 저장.
            gestureLabelToClusterRef.current = { ...labelMap, [gName!]: ci };
            saveGestureLabelMap(gestureLabelToClusterRef.current);
            const newCount = Math.max(patternCountRef.current, ci + 1);
            patternCountRef.current = newCount;
            savePatternCount(newCount);
            setPatternCount(newCount);
            const actionLabel = `[${gName}] → 패턴 ${ci + 1} 신규 형성`;
            setLastAutoAction(actionLabel);
            saveLastAction(actionLabel);
            setTrainStatus(`★ ${actionLabel} (share ${(d.top_share * 100).toFixed(0)}%)`);
            if (phaseRef.current === 'untrained') {
              phaseRef.current = 'learning';
              savePhase('learning');
              setPhase('learning');
            }
          } else {
            // spawn_failed 또는 reinforced (MAX_GESTURE_CLUSTERS 도달 후 내부 매칭).
            const rawMsg = d.spawn_error ?? '';
            let msg: string;
            if (rawMsg.includes('feature16 preset') || rawMsg.includes('in_feat')) {
              msg = '초기화 필요 — 학습 reset 후 다시 시도';
            } else if (rawMsg.includes('max_clusters') || rawMsg.includes('최대')) {
              msg = `최대 패턴 수(${MAX_GESTURE_CLUSTERS}개) 도달`;
            } else {
              msg = rawMsg || `제스처 매핑 실패 [${gName}]`;
            }
            setTrainStatus(`⚠ ${msg}`);
            setLastAutoAction(`⚠ ${msg}`);
            saveLastAction(`⚠ ${msg}`);
          }
        } else {
          // MAX_GESTURE_CLUSTERS 도달 — 알 수 없는 새 gesture 무시.
          setTrainStatus(`⚠ 최대 ${MAX_GESTURE_CLUSTERS}개 제스처 매핑 도달 — [${gName}] 무시됨`);
        }
      } finally {
        autoTrainPendingRef.current = false;
      }
    };

    tick();
    return () => { cancelled = true; };
  }, [autoCapture, cameraConnected]);

  // Fix 1 (HIGH): INFERENCE phase 전환 — camera path 학습 후 명시 추론 모드 진입.
  const enterInference = useCallback(() => {
    savePhase('inference');
    phaseRef.current = 'inference';
    setPhase('inference');
  }, []);

  // P209 fix: 명시적 학습 arm — 사용자가 학습 시작 버튼을 누를 때 호출.
  // 이후 runAutoTrain 이 활성화되어 autoTrainOrSpawn 가 실행된다.
  const armLearning = useCallback(() => {
    learningArmedRef.current = true;
    setTrainStatus('학습 준비 완료 — 카메라에 손을 보여주세요');
  }, []);

  // 외부 반환 — trainStatus + lastAutoAction (NodeLearn 표시용).
  return { trainStatus, lastAutoAction, patternCount, phase, enterInference, armLearning };
}
