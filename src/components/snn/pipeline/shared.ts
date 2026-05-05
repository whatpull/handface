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

// SSR-safe init — Next.js 영역 typeof window guard 영역 server render 영역 desktop default
// (collapsed=false). 사용자 mobile 영역 client mount 영역 즉시 collapsed=true 영역 정합.
// 정직 한계 박음: hydration 영역 1 frame 영역 desktop default 영역 표시 사실 — 모바일 영역
// 첫 paint 영역 expanded 영역 보여 시 즉시 collapsed 영역 영역 (flicker 영역 1 frame 한정).
export function initialCollapsedForMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}
