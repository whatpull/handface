// shared constants/types — pipeline 노드 분리 단일 source.
// PipelineCanvas 에서 추출한 5-node 컴포넌트 공통 상수.
// WINNER_MARGIN 은 winner-derivation 의 default 를 그대로 위임 (HIGH #3 정합).

import { WINNER_MARGIN_DEFAULT } from '@/lib/snn/winner-derivation';

export const CLUSTER_TARGET = 30;
export const CLUSTER_LABELS = ['Pointing', 'Open palm', 'Fist', 'Victory'] as const;
export const SATURATION_HZ = 400;
export const WINNER_MARGIN = WINNER_MARGIN_DEFAULT;
export const HISTORY_MAX = 32;

// 5 노드 default expanded — 모든 device 동일.
// 호환 보존을 위해 helper 형태로 유지 (단순 false 반환).
export function initialCollapsedForMobile(): boolean {
  return false;
}
