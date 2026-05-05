// shared constants/types — pipeline 노드 분리 영역 단일 source.
// PipelineCanvas.tsx 영역 추출 — 5 node component 영역 공유 영역 정합.
//
// 정직 한계 박음:
//  - 본 파일 영역 분리 사실 only — 동작 영역 변경 0.
//  - WINNER_MARGIN 영역 winner-derivation.ts 영역 단일 source 영역 위임 (HIGH #3 정합).

import { WINNER_MARGIN_DEFAULT } from '@/lib/snn/winner-derivation';

export const CLUSTER_TARGET = 30;
export const CLUSTER_LABELS = ['Pointing', 'Open palm', 'Fist', 'Victory'] as const;
export const SATURATION_HZ = 400;
export const WINNER_MARGIN = WINNER_MARGIN_DEFAULT;
export const HISTORY_MAX = 32;
