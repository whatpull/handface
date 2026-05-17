// HandFace 로고 — PatternKey 4-grid 디자인 (2026-05-18)
// 보라색 배경 + 4개 정사각형 그리드 — 대각선 밝게, 나머지 흐리게.

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
      <g className="hf-logo-svg">
        <rect width="32" height="32" rx="7" fill="#7c3aed"/>
        <rect x="5"  y="5"  width="10" height="10" rx="2.5" fill="white" fillOpacity="0.9"/>
        <rect x="17" y="5"  width="10" height="10" rx="2.5" fill="white" fillOpacity="0.4"/>
        <rect x="5"  y="17" width="10" height="10" rx="2.5" fill="white" fillOpacity="0.4"/>
        <rect x="17" y="17" width="10" height="10" rx="2.5" fill="white" fillOpacity="0.9"/>
      </g>
    </svg>
  );
}

export default HandFaceLogo;
