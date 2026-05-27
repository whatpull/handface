// shared constants/types — pipeline 노드 분리 단일 source.
// PipelineCanvas 에서 추출한 5-node 컴포넌트 공통 상수.
// WINNER_MARGIN 은 winner-derivation 의 default 를 그대로 위임 (HIGH #3 정합).

import { WINNER_MARGIN_DEFAULT } from '@/lib/snn/winner-derivation';
import type { OutExemplars } from '@/lib/snn/out-exemplars';

export const CLUSTER_TARGET = 30;

// PR-K (사용자 catch 2026-05-09 catch 2): generic '패턴 N' label —
// 직전 orientation hardcode (horizontal / vertical / diag-back / diag-fore) +
// gesture hardcode (Pointing / Open Palm / Closed Fist / Victory) 영역 본격
// 폐기. 사용자 catch: "learn, infer, out 노드의 경우 horizontal 대신 사용자
// 네이밍(임시 패턴1, 패턴2)". ART unsupervised expansion path 영역 정합 —
// cluster 영역 사용자 자유 명명 (RenameButton via NodeOut) + fallback '패턴 N'.
//
// 학술 정합: Carpenter & Grossberg 1987 ART vigilance — cluster identity 영역
// 사용자 명시 supervised 신호 0 영역 자율 형성 영역 정합. 본 generic label
// 영역 fallback 시점 catch — 사용자 영역 OUT 노드 영역 RenameButton 영역 명시
// 명명 시점 영역 OUT exemplar label 영역 우선.
export const CLUSTER_LABELS_GRID = ['패턴 1', '패턴 2', '패턴 3', '패턴 4'] as const;
export const CLUSTER_LABELS_CAMERA = ['패턴 1', '패턴 2', '패턴 3', '패턴 4'] as const;

export type InputModeKind = 'grid' | 'camera';

// 8 OUT per cluster — N3 cluster broadcast supervisor 정합 (out_{ci}_0..7).
// NodeOut 영역 sumClusterCount / resolveClusterLabel 영역 정합 catch.
export const OUT_PER_CLUSTER = 8;

/**
 * mode 별 cluster label — generic '패턴 N' fallback (PR-K 2026-05-09 catch 2).
 *
 * 학술 정합: ART unsupervised expansion 영역 cluster identity 영역 사용자
 * supervised 신호 0 영역 자율 형성 영역 — hardcode orientation/gesture 라벨
 * 영역 strict supervised path 영역 misleading. generic '패턴 N' 영역 정직.
 *
 * MEDIUM #9 (사용자 catch 2026-05-11): cluster id mapping spec —
 *   - UI 표시 영역 1-based ('패턴 1', '패턴 2', ...) — 사용자 mental model 정합.
 *   - code (cluster_id, exemplar key 'out_${ci}_*', winner.cluster) 영역 0-based.
 *   - 본 helper 영역 0-based cluster id 영역 input → 1-based label string 영역 output
 *     (`패턴 ${cluster + 1}`).
 */
export function getClusterLabel(cluster: number, _mode: InputModeKind = 'grid'): string {
  void _mode; // mode 영역 호환 path 영역 보존 (caller 영역 호환 catch).
  // PR #203 polish (LOW QA 2026-05-10): negative cluster 영역 defensive — 직전
  // '패턴 -1' / '패턴 0' 영역 misleading (cluster id 영역 1-based 사용자 표시).
  // negative 영역 'no winner' 영역 의미 — '—' fallback 정합 (caller 영역
  // winnerLabel ?? null 영역 정합 path 영역 호환 보존).
  if (cluster < 0) return '—';
  return `패턴 ${cluster + 1}`;
}

/**
 * mode 별 N-cluster label 배열 — 기존 4-cluster 호환 path. 직전 CLUSTER_LABELS
 * 호환 보존 단 caller 영역 length 영역 dynamic catch 권장 (PR-K Phase 4 정합).
 */
export function getClusterLabels(_mode: InputModeKind = 'grid'): readonly string[] {
  void _mode;
  return CLUSTER_LABELS_GRID;
}

/**
 * cluster ci 영역 label resolve — 8-OUT (out_{ci}_0..7) 영역 첫 비-null label
 * 우선, fallback out_{ci} (legacy single-OUT exemplar), fallback generic '패턴 N'.
 *
 * NodeOut / NodeLearn / NodeInfer 영역 단일 source — 사용자 RenameButton 영역
 * 명시 명명 시점 영역 모든 노드 영역 동일 label 영역 표시 (PR-K catch 2 정합).
 *
 * 정직 한계: 본 helper 영역 outPerCluster 영역 OUT_PER_CLUSTER (8) 영역 정합 —
 * ART expansion path 영역 outPerCluster 영역 동일 사실 (registry 정합).
 */
export function resolveClusterLabel(
  exemplars: OutExemplars,
  ci: number,
  inputMode: InputModeKind = 'grid',
): string {
  for (let n = 0; n < OUT_PER_CLUSTER; n += 1) {
    const lbl = exemplars[`out_${ci}_${n}`]?.label;
    if (lbl) return lbl;
  }
  const legacy = exemplars[`out_${ci}`]?.label;
  if (legacy) return legacy;
  return getClusterLabel(ci, inputMode);
}

/**
 * @deprecated 호환용 — mode-aware getClusterLabel(idx, mode) 사용 권장.
 */
export const CLUSTER_LABELS = CLUSTER_LABELS_GRID;

export const SATURATION_HZ = 400;
export const WINNER_MARGIN = WINNER_MARGIN_DEFAULT;
export const HISTORY_MAX = 32;

// UX MEDIUM #1 (2026-05-25 QA audit catch): magic number hoist —
// 직전 NodeInfer.tsx:161 영역 `fireDeltaHz < 3` 영역 inline literal 영역 magic.
// 본 const 영역 hoist + 학술 정합 catch 영역 단일 source.
//
// 학술 정합 — P215 selectivity 시리즈 측정 영역 stable WTA winner 영역
// top-1 vs top-2 firing rate gap ≥ 3Hz 영역 정합 (Roxin & Compte 2008 WTA
// selectivity + Diehl & Cook 2015 spike-rate decoding). 50ms observe window
// (scaled to Hz) 영역 sample stability 영역 정합 — gap < 3Hz 영역 amber
// pulse (winner 불안정 신호).
//
// 측정 reference: P215 selectivity 시리즈 commit 영역 measurement JSON 영역
// neuronface backend repo `measurements/P215_selectivity_*.json` 정합.
export const FIRE_DELTA_LOW_THRESHOLD_HZ = 3;

// UX HIGH #3 (2026-05-25 QA audit catch): confusion matrix N hard-cap.
// TRAINED badge `totalClusterSlots = 4` 정합 catch — base-4 hard-cap 영역
// matrix 영역 동일 cap. N > cap 영역 truncate (matrix grid overflow 회피)
// + "{remaining} more clusters not shown" hint 영역 정직 catch.
//
// 학술 정합: Carpenter & Grossberg 1987 ART vigilance — incremental cluster
// expansion 영역 N+ 영역 추론 영역 정합 단 UI 영역 base-4 reference frame
// 영역 사용자 mental model 정합 (TRAINED badge `N/4 clusters`).
export const CONFUSION_MATRIX_MAX_N = 4;

// QA MEDIUM #2 (2026-05-28 audit): held-out self-verification const hoist —
// 직전 NodeLearn.tsx:593-594 영역 function-scope const + integration test
// `hand-snn-held-out-self-verify.test.ts` 영역 별도 const declaration → 2 source
// drift catch. FIRE_DELTA_LOW_THRESHOLD_HZ pattern 정합 — 본 모듈 영역 single
// source 영역 export, NodeLearn / integration test 영역 import 영역 통일.
//
// 학술 정합:
//   - Bishop 1995 (ch.9.3) — feature-level noise injection regularization.
//   - Goodfellow et al. 2014 — noise injection as data augmentation.
//   - σ=0.05 영역 conservative (Goodfellow typical σ~0.1 보다 낮음) — measurement
//     영역 limitations 영역 명시 (held-out 100% accuracy 영역 σ-too-mild signal).
//     production R&D 영역 σ ∈ {0.05, 0.10, 0.15} sweep 권장.
//   - N=5 per cluster × 4 clusters = 20 total → 95% Wilson CI ±10% (statistical
//     conclusiveness 영역 N≥30/cluster 별도 R&D).
export const HELD_OUT_FEATURE_NOISE_SIGMA = 0.05;
export const HELD_OUT_SAMPLES_PER_CLUSTER = 5;

// 5 노드 default expanded — 모든 device 동일.
// 호환 보존을 위해 helper 형태로 유지 (단순 false 반환).
export function initialCollapsedForMobile(): boolean {
  return false;
}
