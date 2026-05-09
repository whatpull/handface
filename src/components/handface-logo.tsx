// HandFace 로고 — favicon (src/app/icon.svg) 영역 동일 silhouette inline reuse.
// 사용자 명시 (2026-05-09): "파비콘과 로고에 손모양만 정확하게 들어가면 좋겠습니다.(귀여운 아가손)"
//   favicon 영역 SVG raw path 영역 그대로 inline — 같은 source 영역 단일 visual.
//   inline SVG 영역 정합: <img src="/icon.svg" /> 영역 basePath 영역 catch 영역 회피
//   (Next.js basePath '/handface' 영역 prod / dev 분기 영역 catch 0 — inline 영역 무관).
//
// 디자인 (broken catch 정정 — 2026-05-10):
//   - viewBox 32×32, GitHub favicon 영역 정합 원형 배경 (`<circle r="16">`).
//   - HF brand yellow (#FFD21E) + brown (#3a2a1a) right palm-forward baby hand silhouette.
//   - **본격 단순 composition** — 4 finger rect (rx round tip) + thumb circle + palm oval
//     영역 fill overlap 영역 단일 silhouette 정합 (path 영역 zigzag self-intersect 영역
//     회피). 직전 PR #190 polish 영역 path 영역 self-intersect 영역 raster 영역 깨짐
//     정합 — 본격 재구성.
//   - **anatomy 정확** — index (h=6.4) < middle (h=8.4 tallest) > ring (h=7.4) >
//     pinky (h=5.8 shortest) 영역 right hand palm-forward 정합.
//   - **thumb** — palm 영역 본격 overlap (cx=7.4 r=2.8 + palm 영역 x=7.6 시작) 영역
//     disconnect 0, 단일 silhouette mass.
//   - **face features 0** — 손모양만.
//   - **chubby baby hand** — finger rect rx=1.3 (round tip) + palm 영역 wide oval.
//
// 16×16 / 24×24 / 32×32 readability: 4 finger 영역 width 1.3px @16 + finger 사이 영역
//   gap 0.5px @16 (rect 영역 0.7px gap @ 32 → 0.35px @16) — sub-pixel 영역 anti-alias
//   영역 finger 분리 영역 visible. raster preview 영역 16/24/32/64/128 영역 5 finger
//   silhouette 본격 인지 ground.

import type { CSSProperties } from 'react';

export type HandFaceLogoProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
};

export function HandFaceLogo({
  size = 24,
  className,
  style,
  ariaLabel = 'HandFace 로고',
}: HandFaceLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      <circle cx="16" cy="16" r="16" fill="#FFD21E" />
      {/* 4 fingers — index / middle (tallest) / ring / pinky (shortest), round tips */}
      <rect x="9.4" y="11.4" width="2.6" height="6.4" rx="1.3" fill="#3a2a1a" />
      <rect x="13" y="9.4" width="2.6" height="8.4" rx="1.3" fill="#3a2a1a" />
      <rect x="16.6" y="10.6" width="2.6" height="7.4" rx="1.3" fill="#3a2a1a" />
      <rect x="20.2" y="12" width="2.6" height="5.8" rx="1.3" fill="#3a2a1a" />
      {/* thumb — palm 좌측 chubby round bulb, palm 영역 본격 overlap */}
      <circle cx="7.4" cy="18" r="2.8" fill="#3a2a1a" />
      {/* palm — wide round chubby baby palm, finger 영역 base + thumb 영역 융합 */}
      <path
        fill="#3a2a1a"
        d="M 7.6 16.4 Q 7.6 14.8 9.6 14.8 L 22.6 14.8 Q 24.6 14.8 24.6 16.8 L 24.6 19 Q 24.6 26.2 16.2 26.2 Q 7.6 26.2 7.6 19 Z"
      />
    </svg>
  );
}

export default HandFaceLogo;
