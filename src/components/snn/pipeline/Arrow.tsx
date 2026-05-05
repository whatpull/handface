'use client';

// Arrow — simple horizontal arrow v7 (사용자 mandatory 2026-05-05):
// "bezier curve / wave / SVG path / dash animation / glow / flow dot 모두 폐기 →
//  단순 horizontal line + chevron triangle 영역 영역. minimalist + 단조."
//
// 직전 v6 영역 violet bezier + animated dash + animateMotion flow dot + drop-shadow glow
// 영역 영역 너무 많 박힘 (사용자 catch "튀는 것 별로 안좋아함"). 본 v7 영역 영역 영역
// SVG line + triangle chevron 영역 정합 — 0 wave / 0 dash / 0 animation / 0 glow.
//
// 본격 변경:
//  - path: 단일 'M 2 7 L 20 7' (horizontal line) + 'M 16 3 L 20 7 L 16 11' (chevron).
//  - viewBox 24 14 영역 box edge mid 영역 align (CSS 영역 width 28px / height auto).
//  - stroke white 영역, stroke-width 1.5, fill none.
//  - active 영역 stroke alpha ↑ 영역 영역 영역 — 영역 영역 영역 영역 영역 영역.
//  - animateMotion / animate dash / drop-shadow filter / linearGradient 모두 영역 영역.

interface ArrowProps {
  active?: boolean;
  /** legacy prop — tone unification 영역 영역 무시 영역 default 0. */
  segment?: 0 | 1 | 2 | 3;
}

export default function Arrow({ active = false }: ArrowProps) {
  return (
    <div className={`snn-pipeline-arrow ${active ? 'is-active' : 'is-idle'}`} aria-hidden>
      <svg viewBox="0 0 24 14" width="24" height="14" preserveAspectRatio="xMidYMid meet">
        <path
          className="snn-pipeline-conn-path"
          d="M 2 7 L 20 7 M 16 3 L 20 7 L 16 11"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
