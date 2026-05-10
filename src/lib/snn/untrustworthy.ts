// untrustworthy — LEARN/INFER 영역 단일 helper hoist (HIGH #5, 사용자 catch 2026-05-11).
//
// 배경:
//   직전 NodeLearn LiveLearnPanel (`isUntrustworthy = initState?.phase === 'fresh' && tick.trial === 0`) +
//   NodeInfer (`isFreshUntrained = isLiveMode && initState?.phase === 'fresh' && (phase === null ||
//   pname === 'untrained') && clusterLabels.length === 0`) 영역 다른 gate — 두 노드 영역 학습 전
//   회로 영역 catch 영역 모순 path 영역 사용자 mental model 영역 mismatch.
//
// 정정: 단일 helper 영역 두 노드 영역 동일 호출 — 학습 전 회로 영역 catch 영역 단일 source.
// "untrustworthy" === fresh init phase + 학습된 cluster 영역 0 영역 정합 — 두 path 영역 동일.
//
// 정직 한계:
//   - tick.trial 영역 LEARN 영역 별도 ref — clusterLabels.length 영역 exemplar 영역 derive 영역
//     incrementCount 영역 winner 변경 시점 영역 fire — 첫 cluster spawn 영역 length>=1 → fresh
//     hint 영역 자동 hide. clusterLabels.length 영역 두 노드 영역 동일 source.
//   - phase 영역 batch path 영역만 의미 — Live 영역 항상 STDP on 영역 phase === null 영역 정합.
//     fresh 시점 영역 LEARN 영역 tick === null (첫 trial 도달 직전) 영역 동일 mental model.

export interface UntrustworthyInputs {
  /** LocalSnn init state — null 영역 미초기화 (Live 모드 외 영역). */
  initPhase: 'fresh' | 'hydrated' | null | undefined;
  /** Backend training-phase event — Live 영역 null 영역 정합. */
  phaseName: string | null | undefined;
  /** 학습된 cluster label 수 — exemplars 영역 derive (incrementCount source). */
  clusterLabelCount: number;
  /**
   * 사용자 catch 2026-05-11 (cluster-source-unify): winner cluster id —
   * deriveWinner 영역 fire catch (null 영역 입력 신호 0). winner 영역 fire
   * 사실 영역 회로 영역 cluster 영역 형성 정합 — fresh hint 영역 hide.
   *
   * 배경: NodeOut 영역 winner.cluster !== null 영역 winnerLabel fallback
   * '패턴 N' 영역 표시 (RenameButton 영역). 단 LEARN/INFER 영역 untrustworthy
   * gate 영역 clusterLabelCount === 0 영역 fresh banner 영역 stale 표시 →
   * 사용자 mental model mismatch (OUT 영역 winner 표시 / LEARN/INFER 영역 표시 안 됨).
   *
   * 정합 path: winner.cluster !== null 영역 → fire 사실 → untrustworthy false
   * 영역 정합 (cluster id 영역 catch 영역 derive 영역 정합 — 영역 영역 stale).
   */
  winnerCluster?: number | null;
}

/**
 * "회로 영역 학습 전 영역 catch — 추론 결과 unreliable" 단일 helper.
 *
 * 정합 path:
 *   - initPhase === 'fresh' (LocalSnn build 직후 — DB hydrate 0)
 *   - clusterLabelCount === 0 (incrementCount 영역 fire 0 — 첫 winner 변경 0)
 *   - winnerCluster === null (deriveWinner 영역 fire 0 — 입력 신호 0)
 *   - (phase === null || phase === 'untrained') — backend training-phase 영역 미진입.
 *
 * Live 모드 영역 phase === null 정합 (batch phase 영역 미사용) → 본 helper 영역
 * 두 path (Live / batch) 영역 모두 일관 catch.
 *
 * 사용자 catch 2026-05-11 (cluster-source-unify): winnerCluster gate 추가 —
 * NodeOut winner fallback path 영역 정합 (단일 source). exemplars 영역 incrementCount
 * 영역 fire 0 영역 영역 winner 영역 fire 영역 영역 fresh banner 영역 hide.
 */
export function isUntrustworthy(inputs: UntrustworthyInputs): boolean {
  const { initPhase, phaseName, clusterLabelCount, winnerCluster } = inputs;
  if (initPhase !== 'fresh') return false;
  if (clusterLabelCount > 0) return false;
  // 사용자 catch 2026-05-11 (cluster-source-unify): winner 영역 fire 영역 영역
  // fresh banner 영역 hide — NodeOut winner fallback 영역 cluster row 영역 동일 표시 정합.
  if (winnerCluster !== null && winnerCluster !== undefined) return false;
  // batch phase 영역 trained/inference 영역 catch — 학습 진행 후 fresh stale 회피.
  if (phaseName !== null && phaseName !== undefined && phaseName !== 'untrained') return false;
  return true;
}
