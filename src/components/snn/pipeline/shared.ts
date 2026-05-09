// shared constants/types — pipeline 노드 분리 단일 source.
// PipelineCanvas 에서 추출한 5-node 컴포넌트 공통 상수.
// WINNER_MARGIN 은 winner-derivation 의 default 를 그대로 위임 (HIGH #3 정합).

import { WINNER_MARGIN_DEFAULT } from '@/lib/snn/winner-derivation';

export const CLUSTER_TARGET = 30;

// path Y (2026-05-07) — orientation 4종 정합 (자세 라벨 폐기).
// 사용자 catch 2026-05-09: GRID / CAMERA mode 별 cluster 의미가 다름.
// 직전 hardcoded 'orientation' 라벨 → mode-aware 함수로 정정.
// 사용자 catch 2026-05-09 (2 신규 catch): INPUT/INFER/OUT 영역 cluster N 앞 glyph
// 영역 본격 제거 — visual minimalism 정합. 직전 ─│╲╱ prefix + space 영역 제거,
// 텍스트 only label 영역 유지.
export const CLUSTER_LABELS_GRID = ['horizontal', 'vertical', 'diag-back', 'diag-fore'] as const;

// CAMERA mode (제스처) — feature-encoder.ts 의 cluster slot 정합.
//   0 = Pointing, 1 = Open Palm, 2 = Closed Fist, 3 = Victory.
export const CLUSTER_LABELS_CAMERA = ['Pointing', 'Open Palm', 'Closed Fist', 'Victory'] as const;

export type InputModeKind = 'grid' | 'camera';

/**
 * mode 별 cluster label.
 *  - 'grid'   → orientation (─ │ ╲ ╱)
 *  - 'camera' → gesture (Pointing / Open Palm / Closed Fist / Victory)
 *
 * cluster id 0..3 외 (예: ART expansion 으로 생성된 5+) → `cluster N` fallback.
 */
export function getClusterLabel(cluster: number, mode: InputModeKind = 'grid'): string {
  const table = mode === 'camera' ? CLUSTER_LABELS_CAMERA : CLUSTER_LABELS_GRID;
  if (cluster >= 0 && cluster < table.length) return table[cluster];
  return `cluster ${cluster}`;
}

/**
 * mode 별 4-cluster label 배열 — 기존 CLUSTER_LABELS 호환 path.
 * NodeLearn / NodeInfer / NodeOut 가 inputMode 받아 사용.
 */
export function getClusterLabels(mode: InputModeKind = 'grid'): readonly string[] {
  return mode === 'camera' ? CLUSTER_LABELS_CAMERA : CLUSTER_LABELS_GRID;
}

/**
 * @deprecated 호환용 — mode-aware getClusterLabel(idx, mode) 사용 권장.
 * 기존 path Y orientation default 유지. 새 코드는 mode 인자 명시.
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
