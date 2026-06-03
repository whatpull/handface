'use client';

// PipelineEventContext — 단일 neuron-firing listener 영역 4 중복 catch 제거 (UX 4th HIGH).
//
// 배경:
//  fc5ae62 영역 5 노드 영역 각각 onBackendEvent('neuron-firing') 구독 영역 6 listener 영역
//  중첩 (PipelineCanvas + NodeLearn x2 + NodeInfer + NodeOut + LLM-legacy). 영역 deriveWinner /
//  cluster mean 산출 영역 4회 일부 — 동일 frame 영역 중복 비용. 본 Provider 영역 상위
//  영역 단일 listener 일부, 모든 derived state 영역 context value 영역 hoist.
//  (LLM 노드 영역 폐기 2026-05-09 [2] — 4-node 정합.)
//
// 정직 한계 명시:
//  - Provider 영역 mount 영역 시점 영역 listener 1회 등록 / unmount 영역 1회 해제.
//  - context value 영역 React reference 영역 — 매 frame 영역 새 객체 대부분 자손
//    consumer 영역 re-render 사실. 변경 일부 frame 영역 (memoize 회피 — N=4 child 영역
//    일부 비용 영역 측정 0 영역 단순 보존).
//  - Δw (NodeLearn) 영역 prev weight cache 영역 ref 기반 영역 — 본 provider 영역 raw detail
//    영역 expose, 자손 영역 자체 useEffect 영역 detail 변경 영역 처리.
//  - winnerCluster 영역 deriveWinner 영역 단일 source — PipelineCanvas 직전 코드 영역 정합.
//
// API:
//   const { winnerCluster, clusterRates, ... lastDetail } = usePipelineEvents();
//   detail === null 일부 backend 영역 첫 frame 영역 미수신.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  onBackendEvent,
  type NeuronFiringDetail,
  type AutoLearnProgressDetail,
  type GridInferDetail,
  type InputModeDetail,
  type HandCosineSimDetail,
  type HandSyncStatusDetail,
} from '@/lib/backend/events';
import { deriveWinner, type WinnerResult } from '@/lib/snn/winner-derivation';
import { WINNER_MARGIN } from './shared';

export interface PipelineEventState {
  /**
   * input mode — 'grid' (orientation-6x6 substrate) 또는 'camera' (orientation-hand
   * substrate). NodeInput 의 tab change 가 input-mode event 로 emit, 본 context
   * 가 subscribe 하여 자손에게 broadcast (Phase 3.3, 2026-06-03).
   */
  inputMode: 'grid' | 'camera';
  /**
   * Phase 3.9 v20 (2026-06-03): hand cosine sim 최신 값 — UI 가 실시간 표시.
   * null 면 hand SNN trigger 전 또는 비-camera substrate.
   */
  handCosineSim: HandCosineSimDetail | null;
  /**
   * Phase 3.9 v29 (2026-06-03): hand sync status — substrate switch 시 worker
   * 와 sync 진행 상황. UI status pill 가 "sync 중" / "정상 N cluster" / "실패"
   * 표시. null 면 아직 hand substrate 진입 전.
   */
  handSyncStatus: HandSyncStatusDetail | null;
  /** Last neuron-firing payload (raw) — null 영역 미수신. */
  lastDetail: NeuronFiringDetail | null;
  /** 영역 frame 영역 timestamp (Date.now). null 영역 미수신. */
  lastFiringTimestamp: number | null;
  /** deriveWinner 결과 — backend cluster_rates / winner 영역 우선 활용. */
  winner: WinnerResult;
  /** alias — winner.cluster (4 consumer 일부 사용 영역 추출). */
  winnerCluster: number | null;
  /** alias — winner.clusterRates. */
  clusterRates: number[];
  /** alias — winner.margin. */
  margin: number;
  /**
   * 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): forced winner 사실 —
   * worker-core findExactMatchCluster 영역 set-equal cluster 영역 winner deterministic
   * 영역 lock 영역 사실 (Carpenter-Grossberg 1987 ART resonance). NodeInfer /
   * NodeLearn LiveLearnPanel 영역 winner card "EXACT MATCH (deterministic)" badge
   * 표시 + fire rate row 영역 사실 catch (fire rate=0Hz 영역 산출 사실 단 winner
   * deterministic — 사용자 mental model 영역 명시 catch).
   *
   * backend (legacy / non-exact path) 영역 미동봉 → false 정합.
   */
  winnerForcedExact: boolean;
  /** active_neurons_by_region — NodeLearn 영역 V1/V2 cascade strip 영역 사용. */
  activeByRegion: Record<string, string[]>;
  /**
   * PR-H 사용자 catch 2026-05-09 (catch 1 enhancement): consecutive winner
   * streak — 동일 winner cluster 연속 출현 frame count.
   * - winner === null 영역 0 reset.
   * - winner cluster 변경 영역 1 reset (신규 winner 첫 frame).
   * - 동일 winner 연속 frame 영역 ++.
   * - Diehl & Cook 2015 winner stability indicator 정합 — frame-by-frame
   *   stability 영역 catch 1 (horizontal pattern 영역 다른 winner) 영역
   *   추가 mitigation. >= 3 영역 'stable' (green pill), < 3 영역 'learning' (amber pill).
   */
  consecutiveWinnerCount: number;
  /**
   * PR #203 polish (UX HIGH 2026-05-10): auto-learn progress per-cluster Map —
   * runAutoLearnLoop 영역 chunk 단위 emit 영역 누적. NodeLearn 영역 신규 ART
   * expansion cluster 영역 amber bar 영역 진행 visibility 정합. cluster id 영역
   * key (4+ ART expansion cluster 영역 dynamic), value 영역 frame 누적 (0..30).
   * 정직 한계: 본 Map 영역 in-memory only — page reload 영역 reset (server-state
   * 영역 reinforce push event 영역 NodeLearn 영역 base 4 cluster 영역 별도 정합).
   */
  autoLearnProgress: Map<number, number>;
  /**
   * 사용자 catch 2026-05-10 (block-infer-during-learn): auto-learn 진행 중
   * cluster id Set — runAutoLearnLoop 영역 5-trial × 6 round = 30회 R-STDP
   * 진행 중 영역 추론 block mandatory (학습 결과 unreliable). Live mode 영역
   * camera 30fps 자동 trigger / GridInput "추론" 버튼 모두 본 flag 영역 gate.
   *
   * source: 'auto-learn-progress' event 영역 progress < total 영역 add,
   * progress >= total 영역 remove. training-cleared / input-mode swap 영역
   * full clear (substrate switch 영역 stale state 회피).
   *
   * isAutoLearning === true 영역 size > 0 (any cluster 진행 중) — caller 영역
   * boolean 단일 read 정합.
   */
  learningClusters: Set<number>;
  /** alias — learningClusters.size > 0. caller 영역 단일 boolean 우선. */
  isAutoLearning: boolean;
}

// HIGH #3 (사용자 catch 2026-05-11): EMPTY_WINNER zero-init — 직전 [0,0,0,0]
// base 4 영역 Fix #19 영역 dynamic clusterLabels.length 영역 mismatch (학습 0
// 영역 cluster bar 영역 4 row 영역 stale 표시 catch). clusterRates / clusterCounts
// 영역 빈 배열 영역 정합 — caller 영역 length === 0 영역 empty placeholder.
const EMPTY_WINNER: WinnerResult = {
  cluster: null,
  clusterRates: [],
  clusterCounts: [],
  confidence: 0,
  margin: 0,
  max: 0,
  total: 0,
  source: 'fallback',
};

const PipelineEventContext = createContext<PipelineEventState>({
  inputMode: 'grid',
  handCosineSim: null,
  handSyncStatus: null,
  lastDetail: null,
  lastFiringTimestamp: null,
  winner: EMPTY_WINNER,
  winnerCluster: null,
  clusterRates: [],
  margin: 0,
  winnerForcedExact: false,
  activeByRegion: {},
  consecutiveWinnerCount: 0,
  autoLearnProgress: new Map(),
  learningClusters: new Set(),
  isAutoLearning: false,
});

export function PipelineEventProvider({ children }: { children: ReactNode }) {
  // Phase 3.3 (2026-06-03): input-mode event 영역 inputMode state subscribe.
  // 직전 'grid' hardcode — NodeInput GRID/CAMERA tab 변경 시 NodeLearn 등 자손이
  // 현재 substrate 를 알 수 없어 stale orientation 표시 → "학습 #N · no winner"
  // 같은 부정확한 hand SNN context UI catch.
  const [inputMode, setInputMode] = useState<'grid' | 'camera'>('grid');
  const [handCosineSim, setHandCosineSim] = useState<HandCosineSimDetail | null>(null);
  const [handSyncStatus, setHandSyncStatus] = useState<HandSyncStatusDetail | null>(null);
  const [detail, setDetail] = useState<NeuronFiringDetail | null>(null);
  const [ts, setTs] = useState<number | null>(null);
  // PR #203 polish (UX HIGH 2026-05-10): auto-learn progress Map state —
  // runAutoLearnLoop 영역 chunk 단위 emit 영역 누적. clusterId 영역 key (ART
  // expansion 영역 4+ dynamic), value 영역 frame 누적. NodeLearn 영역
  // effectiveClusterFrames 영역 base 4 fallback 영역 신규 cluster 영역 정합 read.
  const [autoLearnProgress, setAutoLearnProgress] = useState<Map<number, number>>(
    () => new Map(),
  );
  // 사용자 catch 2026-05-10 (block-infer-during-learn): in-progress cluster id Set —
  // auto-learn-progress event 영역 progress < total 영역 add, progress >= total
  // 영역 remove. NodeInfer / GridInput / CameraInput 영역 추론 block gate 정합.
  const [learningClusters, setLearningClusters] = useState<Set<number>>(() => new Set());
  // listener 영역 1회 등록 — provider mount 한정.
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      setDetail(d);
      setTs(Date.now());
    });
    // training-cleared (Reset) 시점에도 명시 초기화.
    const offCleared = onBackendEvent('training-cleared', () => {
      setDetail(null);
      setTs(null);
      setAutoLearnProgress(new Map());
      setLearningClusters(new Set());
    });
    // PR #203 polish (UX HIGH 2026-05-10): auto-learn-progress event listener —
    // runAutoLearnLoop 영역 chunk 단위 emit 영역 Map 영역 update.
    const offAutoLearn = onBackendEvent<AutoLearnProgressDetail>('auto-learn-progress', (d) => {
      setAutoLearnProgress((prev) => {
        const next = new Map(prev);
        next.set(d.clusterId, d.progress);
        return next;
      });
      // 사용자 catch 2026-05-10 (block-infer-during-learn): 진행 중 cluster
      // 영역 add (progress < total) / 완료 영역 remove (progress >= total).
      // first chunk (progress=1) 시점 영역 add → NodeInfer / GridInput 추론
      // 영역 즉시 disable. last chunk (progress=30) 시점 영역 remove → 추론 enable.
      setLearningClusters((prev) => {
        const next = new Set(prev);
        if (d.progress >= d.total) {
          next.delete(d.clusterId);
        } else {
          next.add(d.clusterId);
        }
        return next;
      });
    });
    // 사용자 catch 2026-05-10 (OUT 결과값 초기화): inject/infer trigger 시점 영역
    // 직전 winner row 영역 stale 표시 catch 회피. grid-infer started kind 영역
    // GridInput 영역 runInfer / runInferAuto / clusterVigilance 호출 직전 emit
    // 영역 정합 — backend 응답 도달 전 영역 null reset → 새 응답 영역 fresh
    // cluster_rates 영역 즉시 갱신. 학술 정합: substrate 영역 추론 1 cycle 영역
    // 별도 sample — 직전 winner 영역 carry-over 영역 false display 회피.
    // (finished kind 영역 reset 0 — 새 neuron-firing event 영역 detail 영역 순서
    // race 회피. error kind 영역 detail 영역 그대로 — 직전 응답 영역 보존 vs
    // null reset 영역 양자 — null reset 영역 정직 catch 영역 정합.)
    const offGridInfer = onBackendEvent<GridInferDetail>('grid-infer', (d) => {
      if (d.kind === 'started' || d.kind === 'error') {
        setDetail(null);
        setTs(null);
      }
    });
    // Phase 3.3 (2026-06-03): input-mode event 구독 — NodeInput tab change 시
    // emit. 자손 (NodeLearn, NodeOut 등) 이 현재 substrate 를 catch 하여
    // hand SNN context UI 정합.
    const offInputMode = onBackendEvent<InputModeDetail>('input-mode', (d) => {
      setInputMode(d.mode === 'camera' ? 'camera' : 'grid');
    });
    // Phase 3.9 v20 (2026-06-03): hand cosine sim listener.
    const offHandCosine = onBackendEvent<HandCosineSimDetail>('hand-cosine-sim', (d) => {
      setHandCosineSim(d);
    });
    // Phase 3.9 v29 (2026-06-03): hand sync status listener — CameraInput pill.
    const offHandSync = onBackendEvent<HandSyncStatusDetail>('hand-sync-status', (d) => {
      setHandSyncStatus(d);
    });
    return () => {
      off();
      offCleared();
      offAutoLearn();
      offGridInfer();
      offInputMode();
      offHandCosine();
      offHandSync();
      mountedRef.current = false;
    };
  }, []);

  // winner 영역 detail 영역 도출 — useMemo 영역 frame 단위 영역 1회 산출.
  const winner = useMemo<WinnerResult>(() => {
    if (!detail) return EMPTY_WINNER;
    return deriveWinner(detail.out_rates || {}, {
      marginThreshold: WINNER_MARGIN,
      clusterRates: detail.cluster_rates,
      winnerCluster: detail.winner_cluster,
      winnerMargin: detail.winner_margin,
    });
  }, [detail]);

  // PR-H catch 1 enhancement (2026-05-10): consecutive winner streak.
  // ts 변경 = neuron-firing frame 도달 — frame 단위 winner 변경 catch.
  // useMemo + ref pattern — 동일 winner 연속 ++, 변경 시 1 reset, null 시 0.
  // ts 의존 — frame 단위 1회 갱신 보장 (winner 객체 reference 변경 0 영역 누적 방지).
  const winnerStreakRef = useRef<{ cluster: number | null; count: number }>({
    cluster: null,
    count: 0,
  });
  const consecutiveWinnerCount = useMemo(() => {
    const cur = winner.cluster;
    if (cur === null) {
      winnerStreakRef.current = { cluster: null, count: 0 };
      return 0;
    }
    if (cur !== winnerStreakRef.current.cluster) {
      winnerStreakRef.current = { cluster: cur, count: 1 };
      return 1;
    }
    winnerStreakRef.current.count += 1;
    return winnerStreakRef.current.count;
  // ts 영역 frame 단위 trigger source — winner 객체 referential equality 영역 무관.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ts, winner.cluster]);

  const value = useMemo<PipelineEventState>(() => ({
    inputMode,
    lastDetail: detail,
    lastFiringTimestamp: ts,
    winner,
    winnerCluster: winner.cluster,
    clusterRates: winner.clusterRates,
    margin: winner.margin,
    // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): detail.winner_forced_exact
    // 영역 expose — NodeInfer / NodeLearn LiveLearnPanel 영역 winner card badge 영역
    // gate. winner.cluster === null 영역 false 정합 (mismatch / no-winner — stale badge
    // 회피). detail null 영역 false 정합 (첫 frame 미수신).
    winnerForcedExact:
      winner.cluster !== null && detail?.winner_forced_exact === true,
    activeByRegion: detail?.active_neurons_by_region || {},
    consecutiveWinnerCount,
    autoLearnProgress,
    learningClusters,
    isAutoLearning: learningClusters.size > 0,
    handCosineSim,
    handSyncStatus,
  }), [detail, ts, winner, consecutiveWinnerCount, autoLearnProgress, learningClusters, inputMode, handCosineSim, handSyncStatus]);

  return (
    <PipelineEventContext.Provider value={value}>
      {children}
    </PipelineEventContext.Provider>
  );
}

export function usePipelineEvents(): PipelineEventState {
  return useContext(PipelineEventContext);
}
