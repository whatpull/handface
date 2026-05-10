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
 */
export function getClusterLabel(cluster: number, _mode: InputModeKind = 'grid'): string {
  void _mode; // mode 영역 호환 path 영역 보존 (caller 영역 호환 catch).
  if (cluster >= 0) return `패턴 ${cluster + 1}`;
  return `패턴 ${cluster}`;
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

// 5 노드 default expanded — 모든 device 동일.
// 호환 보존을 위해 helper 형태로 유지 (단순 false 반환).
export function initialCollapsedForMobile(): boolean {
  return false;
}
