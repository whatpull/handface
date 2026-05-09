// HandFace 로고 — favicon (src/app/icon.svg) 영역 동일 silhouette inline reuse.
// 사용자 명시 (2026-05-09): "파비콘과 로고에 손모양만 정확하게 들어가면 좋겠습니다.(귀여운 아가손)"
//   favicon 영역 SVG raw path 영역 그대로 inline — 같은 source 영역 단일 visual.
//   inline SVG 영역 정합: <img src="/icon.svg" /> 영역 basePath 영역 catch 영역 회피
//   (Next.js basePath '/handface' 영역 prod / dev 분기 영역 catch 0 — inline 영역 무관).
//
// 디자인 (자연 palm shape 재구성 — 2026-05-10):
//   - viewBox 32×32, GitHub favicon 영역 정합 원형 배경 (`<circle r="16">`).
//   - HF brand yellow (#FFD21E) + brown (#3a2a1a) right palm-forward baby hand silhouette.
//   - **palm-forward open hand** — 4 finger 영역 위 spread (round tip) + thumb 영역 좌측
//     명확 protrude (rotated chubby stub) + palm 영역 wide round bottom (ellipse).
//     사용자 catch (PR #193 robotic 영역 fist + finger stub 영역 손모양 X) 정합 — 본격
//     palm-forward open hand 영역 자연 silhouette 영역 raster preview 영역 ground 정합.
//   - **anatomy 정확** — middle (h=13 longest) > ring (h=12) > index (h=11) > pinky (h=10
//     shortest) 영역 right hand palm-forward 정합. y-offset 영역 finger tip 영역 다른 height.
//   - **thumb** — palm 좌측 영역 chubby horizontal-ish stub (rotate -20deg, w=6.8 h=4)
//     + palm ellipse 영역 본격 overlap → 단일 silhouette mass.
//   - **palm** — wide round ellipse (rx=9 ry=6.4) 영역 chubby baby palm bottom + finger
//     영역 base 영역 자연 융합.
//   - **face features 0** — 손모양만.
//   - **chubby baby hand** — finger rect rx=1.2 (round tip) + thumb rx=2 (round bulb)
//     + palm ellipse (wide round).
//
// 16×16 / 24×24 / 32×32 readability: 4 finger 영역 width 1.2px @16 + finger 사이 영역
//   gap 0.4px @16 (rect 영역 0.8px gap @ 32 → 0.4px @16) — sub-pixel 영역 anti-alias
//   영역 finger 분리 영역 visible. raster preview 영역 16/24/32/64/128 영역 5 finger
//   silhouette + thumb stub + palm round 영역 본격 인지 ground.

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
      <g fill="#3a2a1a">
        {/* palm — wide round ellipse, chubby baby palm bottom */}
        <ellipse cx="16.4" cy="20.6" rx="9" ry="6.4" />
        {/* thumb — palm 좌측 chubby horizontal stub, rotate -20deg */}
        <rect x="5.6" y="13" width="6.8" height="4" rx="2" transform="rotate(-20 9 15)" />
        {/* 4 fingers — index / middle (tallest) / ring / pinky (shortest), round tips */}
        <rect x="10.4" y="8.4" width="2.4" height="11" rx="1.2" />
        <rect x="13.6" y="6.4" width="2.4" height="13" rx="1.2" />
        <rect x="16.8" y="7.4" width="2.4" height="12" rx="1.2" />
        <rect x="20" y="9.4" width="2.4" height="10" rx="1.2" />
      </g>
    </svg>
  );
}

export default HandFaceLogo;
