// HandFace 로고 — favicon (src/app/icon.svg) 영역 동일 silhouette inline reuse.
// 사용자 명시 (2026-05-09): "파비콘과 로고에 손모양만 정확하게 들어가면 좋겠습니다.(귀여운 아가손)"
//   favicon 영역 SVG raw path 영역 그대로 inline — 같은 source 영역 단일 visual.
//   inline SVG 영역 정합: <img src="/icon.svg" /> 영역 basePath 영역 catch 영역 회피
//   (Next.js basePath '/handface' 영역 prod / dev 분기 영역 catch 0 — inline 영역 무관).
//
// 디자인 (UX-2 + UX-5 정정 — PR #190 polish):
//   - viewBox 32×32, 본격 원형 배경 (`<circle r="16">`) — GitHub favicon 영역 정합.
//   - HF brand yellow (#FFD21E) + brown (#3a2a1a) right palm-forward baby hand silhouette.
//   - **손모양만** — face features 본격 제거.
//   - **귀여운 아가손 (baby hand)** — chubby finger + wide round palm + round finger tip.
//   - **thumb (UX-2 정정)** — palm 좌측 영역 명확 round bulb (`<circle cx=6.6 cy=18.2 r=2.4>`)
//     영역 분리 protrusion — palm 영역 fused 0, 16×16 영역 thumb 인지 명확.
//   - **V notch (UX-5 정정)** — height 1.4 → 3 영역 deepen (y 12 → 15.6 까지 영역 cut-out)
//     영역 16×16 영역 finger 사이 영역 readable.
//
// 16×16 / 24×24 / 32×32 readability: thumb round bulb (1.2px @16) + 4 finger 영역 V notch
//   3 (1.5px deep @16) 영역 명확 visible — total 5 finger silhouette 영역 sub-pixel safe.

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
      {/* thumb — palm 좌측 round bulb protrusion (UX-2 분리) */}
      <circle cx="6.6" cy="18.2" r="2.4" fill="#3a2a1a" />
      {/* palm + 4 finger silhouette */}
      <path
        fill="#3a2a1a"
        d="M 9 17 Q 9 14.6 10.8 14.6 Q 12.6 14.6 12.6 17 L 12.6 11 Q 12.6 9 14.4 9 Q 16.2 9 16.2 11 L 16.2 14.4 L 16.2 10.6 Q 16.2 8.6 18 8.6 Q 19.8 8.6 19.8 10.6 L 19.8 14.6 L 19.8 12.4 Q 19.8 10.6 21.4 10.6 Q 23 10.6 23 12.4 L 23 18 Q 23 22.4 20.2 24.6 Q 17.6 26.6 14.4 26.4 Q 10.6 26 9 23 Q 8 21 8 18.6 Z"
      />
      {/* finger V notch — height 3 영역 deepen (UX-5 정정) */}
      <path fill="#FFD21E" d="M 12.6 12.6 Q 13 14.6 13.4 15.6 Q 13.8 14.6 14.2 12.6 Z" />
      <path fill="#FFD21E" d="M 16.2 12 Q 16.6 14 17 15 Q 17.4 14 17.8 12 Z" />
      <path fill="#FFD21E" d="M 19.8 12.6 Q 20.2 14.6 20.6 15.6 Q 21 14.6 21.4 12.6 Z" />
    </svg>
  );
}

export default HandFaceLogo;
