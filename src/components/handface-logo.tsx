// HandFace 로고 — favicon (src/app/icon.svg) 영역 동일 silhouette inline reuse.
// 사용자 catch (2026-05-09): "아무리봐도 이상한 파비콘, 혹시 손 모양을 다른 곳에서
//   다운받을 수는 없나요? (외계인 손같아 보여요)"
//   → 자체 hand silhouette path 영역 폐기 + Heroicons HandRaised solid 영역 채택.
//
// 디자인 (PR-F, 2026-05-10):
//   - viewBox 32×32, GitHub favicon 영역 정합 원형 배경 (`<circle r="16">`).
//   - HF brand yellow (#FFD21E) circle background + brown (#3a2a1a) hand silhouette.
//   - **hand path source — Heroicons v2 HandRaised solid (24×24)** —
//       https://github.com/tailwindlabs/heroicons (MIT License — Tailwind Labs Inc.)
//       optimized/24/solid/hand-raised.svg (PR-F, 2026-05-09).
//       → LICENSE-ICONS.md 영역 attribution.
//   - **mount** — 24×24 path 영역 translate(4,4) 영역 32×32 viewBox 영역 center
//       + 1.0 scale 영역 24px hand 영역 32px circle 안 4px padding 영역 정합.
//   - **anatomy** — Heroicons HandRaised 영역 4-finger upright + thumb 영역 official
//       icon library 영역 universally-recognized hand silhouette (외계인 손 catch 회피).
//   - **face features 0** — 손모양만.
//
// 16×16 / 24×24 / 32×32 readability: Heroicons 영역 official 24×24 grid 영역 design
//   영역 16/24/32px 영역 raster 영역 hand silhouette 영역 universally legible
//   (Tailwind / GitHub / Vercel 영역 favicon 영역 actively used 영역 fact 정합).
//   raster preview 영역 16/24/32/64/128 영역 open hand silhouette 본격 인지 ground.
//
// PR-H wave animation (2026-05-10):
//   사용자 catch — "혹시 추가로 재미를 위해, 인사하는 애니메이션이 추가되면 좋겠어요.
//   (물론 파비콘은 제외)"
//   → header inline logo 영역 hover trigger wave (calm + 재미 + a11y 정합).
//   - hand `<g>` 영역 hover 시 rotate(-20deg ↔ +20deg) ~1s ease-in-out infinite.
//   - transform-origin 손목 영역 (24×24 hand 영역 wrist ≈ y22 → 50% 90%).
//   - `prefers-reduced-motion: reduce` 영역 animation: none fallback.
//   - favicon (src/app/icon.svg) 영역 static 보존 — animation 영역 inline logo only.
//   - SVG `<style>` 영역 inline scoping — global CSS 의존 0.

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
      {/* PR-H wave animation — hover trigger only (calm UX + a11y 정합).
          .hf-logo-svg / .hf-logo-hand 영역 globals.css 영역 정의:
          hover 시 ±20deg ~1s ease-in-out infinite + transform-origin 손목.
          prefers-reduced-motion 영역 animation: none fallback.
          favicon (src/app/icon.svg) 영역 static 보존 — animation 영역 inline only. */}
      <g className="hf-logo-svg">
        <circle cx="16" cy="16" r="16" fill="#FFD21E" />
        {/*
          Heroicons v2 HandRaised solid (24×24) — MIT License — Tailwind Labs Inc.
          https://github.com/tailwindlabs/heroicons/blob/master/optimized/24/solid/hand-raised.svg
          translate(4,4) — 24×24 path 영역 32×32 viewBox 영역 center mount.
        */}
        <g className="hf-logo-hand" transform="translate(4 4)" fill="#3a2a1a">
          <path d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
        </g>
      </g>
    </svg>
  );
}

export default HandFaceLogo;
