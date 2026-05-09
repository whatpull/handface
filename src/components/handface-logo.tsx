// HandFace 로고 — favicon (src/app/icon.svg) 영역 동일 silhouette inline reuse.
// 사용자 명시 (2026-05-09): "Header HandFace 문구 왼쪽에 로고 적용 파비콘과 동일".
//   favicon 영역 SVG raw path 영역 그대로 inline — 같은 source 영역 단일 visual.
//   inline SVG 영역 정합: <img src="/icon.svg" /> 영역 basePath 영역 catch 영역 회피
//   (Next.js basePath '/handface' 영역 prod / dev 분기 영역 catch 0 — inline 영역 무관).
//
// 디자인:
//   - viewBox 32×32, 본격 원형 배경 (`<circle r="16">`) — GitHub favicon 영역 정합.
//   - HF brand yellow (#FFD21E) + brown (#3a2a1a) right palm-forward silhouette.
//   - 손바닥 face features (눈 dot 2 + smile arc) 영역 cute 영역 정합 — 16×16 readable.
//   - thumb 영역 viewer 좌측 영역 catch — palm-forward 정면 hand 정합 (오른손).
//
// 16×16 / 24×24 / 32×32 readability: silhouette 영역 단일 mass — 작은 size 영역 hand
//   shape 영역 인지 가능 (face features 영역 24×24 이상 영역 인지 영역 trade-off 명시).

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
        <path d="M 11 14 Q 11 11.6 13 11.6 Q 15 11.6 15 14 L 15 8.5 Q 15 6.5 16.6 6.5 Q 18.2 6.5 18.2 8.5 L 18.2 14 L 18.2 9 Q 18.2 7.2 19.7 7.2 Q 21.2 7.2 21.2 9 L 21.2 14.4 L 21.2 10.6 Q 21.2 9 22.5 9 Q 23.8 9 23.8 10.6 L 23.8 17 Q 23.8 22.6 19.6 24.6 Q 17.4 25.6 15 25.4 Q 11.4 25 9.6 22 L 7.4 17.8 Q 6.6 16.2 7.8 15.4 Q 9 14.6 9.9 16 L 11 17.6 Z" />
        {/* finger V notch — yellow cut-out 영역 손가락 사이 경계 강조 (UX-3-finger 정정) */}
        <path d="M 15 10 L 15.5 13.6 L 14.5 13.6 Z" fill="#FFD21E" />
        <path d="M 18.2 10 L 18.7 13.6 L 17.7 13.6 Z" fill="#FFD21E" />
        <path d="M 21.2 11.4 L 21.7 14 L 20.7 14 Z" fill="#FFD21E" />
        {/* face features — 16×16 readable 영역 size up (UX-3-cute 정정) */}
        <circle cx="14.6" cy="19.4" r="1.1" fill="#FFD21E" />
        <circle cx="18.4" cy="19.4" r="1.1" fill="#FFD21E" />
        <path
          d="M 14.8 22 Q 16.5 23.1 18.2 22"
          stroke="#FFD21E"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default HandFaceLogo;
