// HandFace 로고 — favicon (src/app/icon.svg) 영역 동일 silhouette inline reuse.
// 사용자 명시 (2026-05-09): "파비콘과 로고에 손모양만 정확하게 들어가면 좋겠습니다.(귀여운 아가손)"
//   favicon 영역 SVG raw path 영역 그대로 inline — 같은 source 영역 단일 visual.
//   inline SVG 영역 정합: <img src="/icon.svg" /> 영역 basePath 영역 catch 영역 회피
//   (Next.js basePath '/handface' 영역 prod / dev 분기 영역 catch 0 — inline 영역 무관).
//
// 디자인 (UX 3-catch 정정 — PR #195, 2026-05-10):
//   - viewBox 32×32, GitHub favicon 영역 정합 원형 배경 (`<circle r="16">`).
//   - HF brand yellow (#FFD21E) + brown (#3a2a1a) right palm-forward baby hand silhouette.
//   - **본격 finger length** — middle h=16 / ring h=14 / index h=13 / pinky h=12 영역
//     palm top (y=14.6) 위 영역 8-12px protrude — stub-look 영역 회피, open hand 영역
//     본격 인지. base y=18 영역 palm 안 깊이 영역 융합 (mass disconnect 0).
//   - **anatomy 정확** — index < middle (tallest) > ring > pinky 영역 right hand
//     palm-forward 정합.
//   - **thumb vertical 좌측 protrude** — rect rotate -50deg, palm 좌측 영역 명확
//     extension visible (silhouette thumb 인지 ground).
//   - **finger gap 1.0px @32** — sub-pixel 영역 16px 영역 0.5px gap 영역 anti-alias
//     영역 finger 분리 visible.
//   - **face features 0** — 손모양만.
//   - **chubby baby hand** — finger rect rx=1.3 + thumb rect rx=1.8 + palm wide oval.
//
// 16×16 / 24×24 / 32×32 readability: 4 finger 영역 1.3px @16 + 0.5px gap @16 (1.0px
//   @32) 영역 sub-pixel anti-alias 영역 finger 분리 visible. thumb 좌측 영역 본격
//   protrude. raster preview 영역 16/24/32/64/128 영역 open hand silhouette 본격
//   인지 ground.

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
      {/* 4 fingers — index / middle (tallest) / ring / pinky (shortest), round tips,
          base y=18 영역 palm 안 깊이 영역 융합, gap 1.0px @32 (0.5px @16 sub-pixel) */}
      <rect x="9.0" y="5.0" width="2.6" height="13.0" rx="1.3" fill="#3a2a1a" />
      <rect x="12.6" y="2.0" width="2.6" height="16.0" rx="1.3" fill="#3a2a1a" />
      <rect x="16.2" y="4.0" width="2.6" height="14.0" rx="1.3" fill="#3a2a1a" />
      <rect x="19.8" y="6.0" width="2.6" height="12.0" rx="1.3" fill="#3a2a1a" />
      {/* thumb — palm 좌측 vertical-ish (-50deg) 영역 본격 protrude, palm 영역 융합 */}
      <rect
        x="2.6"
        y="13.6"
        width="3.6"
        height="8.4"
        rx="1.8"
        transform="rotate(-50 4.4 17.8)"
        fill="#3a2a1a"
      />
      {/* palm — wide round chubby baby palm, finger 영역 base + thumb 영역 융합 */}
      <path
        fill="#3a2a1a"
        d="M 6.5 16.4 Q 6.5 14.6 8.5 14.6 L 23.5 14.6 Q 25.5 14.6 25.5 16.6 L 25.5 19 Q 25.5 26.4 16.0 26.4 Q 6.5 26.4 6.5 19 Z"
      />
    </svg>
  );
}

export default HandFaceLogo;
