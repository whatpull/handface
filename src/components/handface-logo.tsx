// HandFace 로고 — favicon (src/app/icon.svg) 영역 동일 silhouette inline reuse.
// 사용자 명시 (2026-05-09): "파비콘과 로고에 손모양만 정확하게 들어가면 좋겠습니다.(귀여운 아가손)"
//   favicon 영역 SVG raw path 영역 그대로 inline — 같은 source 영역 단일 visual.
//   inline SVG 영역 정합: <img src="/icon.svg" /> 영역 basePath 영역 catch 영역 회피
//   (Next.js basePath '/handface' 영역 prod / dev 분기 영역 catch 0 — inline 영역 무관).
//
// 디자인 (UX-4-baby-hand 정정):
//   - viewBox 32×32, 본격 원형 배경 (`<circle r="16">`) — GitHub favicon 영역 정합.
//   - HF brand yellow (#FFD21E) + brown (#3a2a1a) right palm-forward baby hand silhouette.
//   - **손모양만** — face features (눈 dot 2 + smile arc) 영역 본격 제거.
//   - **귀여운 아가손 (baby hand)** — chubby finger + wide round palm + round finger tip.
//   - thumb 영역 viewer 좌측 영역 short + chubby — palm-forward 정면 hand 정합 (오른손).
//   - V notch 3 영역 finger 사이 silhouette 분리 강조 (yellow knock-out).
//
// 16×16 / 24×24 / 32×32 readability: baby hand silhouette 영역 단일 mass — 작은 size 영역
//   chubby finger 영역 silhouette 영역 명확 (face 영역 sub-pixel 영역 더 이상 없음).

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
      <path
        fill="#3a2a1a"
        d="M 5.6 16.4 Q 5 15 6.4 14.4 Q 7.8 13.8 8.6 15.4 L 8.8 17.4 L 9 14.4 Q 9 12.6 10.8 12.6 Q 12.6 12.6 12.6 14.4 L 12.6 11 Q 12.6 9 14.4 9 Q 16.2 9 16.2 11 L 16.2 14.6 L 16.2 10.6 Q 16.2 8.6 18 8.6 Q 19.8 8.6 19.8 10.6 L 19.8 14.8 L 19.8 12.4 Q 19.8 10.6 21.4 10.6 Q 23 10.6 23 12.4 L 23 18 Q 23 22.4 20.2 24.6 Q 17.6 26.6 14.4 26.4 Q 10.6 26 8.8 23 Q 7.6 21 7.4 18.6 Q 7.2 17.6 6.4 17.4 Q 5.8 17.2 5.6 16.4 Z"
      />
      {/* finger V notch — yellow cut-out 영역 손가락 사이 silhouette 분리 강조 */}
      <path fill="#FFD21E" d="M 12.6 13 Q 12.6 13.8 13 14.4 Q 13.4 13.8 13.4 13 Z" />
      <path fill="#FFD21E" d="M 16.2 12.4 Q 16.2 13.2 16.6 13.8 Q 17 13.2 17 12.4 Z" />
      <path fill="#FFD21E" d="M 19.8 13 Q 19.8 13.8 20.2 14.4 Q 20.6 13.8 20.6 13 Z" />
    </svg>
  );
}

export default HandFaceLogo;
