// HandFace 로고 — PatternKey 디자인 (2026-05-17)
// 보라색 배경 + 원 + 8방향 햇살 — PatternKey 파비콘과 동일 실루엣.
// hover 시 ±15deg wave 애니메이션 유지 (PR-H 전통 계승).

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
        {/* 보라색 배경 */}
        <rect width="32" height="32" rx="7" fill="#7c3aed" />
        {/* 중앙 원 */}
        <circle cx="16" cy="16" r="4.5" fill="none" stroke="white" strokeWidth="1.8" />
        {/* 4방향 선 */}
        <line x1="16" y1="4"  x2="16" y2="8"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="16" y1="24" x2="16" y2="28" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="4"  y1="16" x2="8"  y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="16" x2="28" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        {/* 대각선 */}
        <line x1="7.5"  y1="7.5"  x2="10.3" y2="10.3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="21.7" y1="21.7" x2="24.5" y2="24.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7.5"  y1="24.5" x2="10.3" y2="21.7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="21.7" y1="10.3" x2="24.5" y2="7.5"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default HandFaceLogo;
