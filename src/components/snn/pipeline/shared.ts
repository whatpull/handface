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

// 모바일 breakpoint — 본 값 영역 globals.css 영역 .snn-pipeline-flow @media (max-width: 900px)
// 영역 정합 영역 한 곳 영역 영역. 변경 시 둘 영역 동기 mandatory.
export const MOBILE_BREAKPOINT = 900;

// 모든 device 영역 default expanded — 5 node 영역 collapsed=false 영역 일관 영역.
// 직전 모바일 default collapsed=true 폐기 사실 — 사용자 catch (2026-05-05): 펼친 카드
// 영역 시각 직접 영역 영역 영역 정합 정직.
// 본 helper 영역 호환 영역 보존 사실 — 항상 false 반환.
export function initialCollapsedForMobile(): boolean {
  return false;
}
