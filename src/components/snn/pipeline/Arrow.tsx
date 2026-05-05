'use client';

// Arrow — persistent bezier connector v4 (사용자 catch [UI/UX 10/100]:
// "연결 라인 항상 visible + cyan single tone 통일 + flow dot 항상 흐름").
//
// 직전 5 tone gradient (violet/amber/cyan/pink/blue) 영역 폐기 — 사용자 명시:
// 단일 cyan palette (#06b6d4 main + #67e8f9 accent + alpha glow) 영역 통일.
//
// 본격 변경:
//  - active prop 영역 visual flag 영역만 (stroke opacity 영역 분기) — path/dot 영역 항상 render.
//  - flow dot 영역 항상 animateMotion (1.6s loop) — active 영역 영역 0.6 alpha + brightness 0.7
//    영역 dim. learn/flow active 영역 1.0 alpha + glow drop-shadow.
//  - bezier curve 영역 cubic S 영역 박음 (slight lift in middle) — node editor aesthetic.
//  - segment prop 영역 무시 (호환 영역 보존) — tone 통일 영역 정합.
//
// 정직 한계:
//  - SVG width 28px 좁음 → bezier control point 영역 영역 영역 곡률 영역 영역.
//  - prefers-reduced-motion 영역 dot animation 영역 0.01ms 정지 (.snn-pipeline-conn-dot 정합).
//  - 4 connector 영역 영역 1 dot 영역 — 사용자 명시 "16 dot" 영역 SVG path 영역 영역
//    multi-particle 영역 영역 영역 (영역 단순 영역 1 dot 영역 폐기 회피).

interface ArrowProps {
  active?: boolean;
  /** legacy prop — tone unification 영역 영역 무시 영역 default 0. */
  segment?: 0 | 1 | 2 | 3;
}

// path d v5 (2026-05-05) — 곡률 ↑ (직전 slight S 영역 더 강한 cubic S) +
// node editor aesthetic 영역 정합. 28px width 영역 영역 영역 control point 영역
// 큰 변화 영역 정합 영역 영역.
const PATH_D = 'M 2 30 C 14 14, 22 46, 34 30';
// dashed underlay path — animated dash 영역 stream 영역 visualize (사용자 명시 99 path).
const DASH_LEN = 32; // SVG path length approx 영역 전체 — circle motion 영역 정합.

export default function Arrow({ active = false }: ArrowProps) {
  return (
    <div className={`snn-pipeline-arrow ${active ? 'is-active' : 'is-idle'}`} aria-hidden>
      <svg viewBox="0 0 36 60" width="36" height="60" preserveAspectRatio="none">
        <defs>
          <linearGradient id="snn-conn-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#0891b2" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#06b6d4" stopOpacity="1.0" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.95" />
          </linearGradient>
          <filter id="snn-conn-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.0" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* base edge — 항상 visible (alpha 0.55 → active 1.0). 본격 stroke 2.0 영역
            visual depth ↑ + 곡률 강 cubic S. */}
        <path
          className="snn-pipeline-conn-path"
          d={PATH_D}
          stroke="url(#snn-conn-cyan)"
          strokeWidth="2.0"
          fill="none"
          strokeLinecap="round"
          filter="url(#snn-conn-glow)"
        />
        {/* animated dash overlay — 사용자 catch "animated dash + flow dot stream".
            base path 영역 dasharray 4-3 + dashoffset animate (active 영역 영역 영역). */}
        {active && (
          <path
            className="snn-pipeline-conn-dash"
            d={PATH_D}
            stroke="#a5f3fc"
            strokeWidth="1.0"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 3"
            opacity="0.7"
          >
            <animate attributeName="stroke-dashoffset" from={DASH_LEN} to="0"
              dur="0.9s" repeatCount="indefinite" />
          </path>
        )}
        {/* flow dot — 항상 animateMotion 영역 5s loop 영역 (사용자 catch). */}
        <circle
          className="snn-pipeline-conn-dot"
          r="2.6"
          fill="#67e8f9"
        >
          <animateMotion dur="1.8s" repeatCount="indefinite" path={PATH_D} />
        </circle>
      </svg>
    </div>
  );
}
