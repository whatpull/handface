'use client';

// Arrow — persistent horizontal bezier connector v6 (사용자 catch [UI/UX 99]:
// "wave artifact 폐기 + right edge → left edge 본격 정합 + violet brand tone").
//
// 직전 v5 영역 path 'M 2 30 C 14 14, 22 46, 34 30' 영역 강 S-curve 영역 wave artifact
// 영역 박힘 (사용자 catch). 본 v6 영역 단순 horizontal bezier — 좌·우 box edge 영역
// 동일 y 영역 박힘 (slight curve 영역 control point 동일 y) → 시각 wave 0.
//
// 본격 변경 (2026-05-05):
//  - path: 'M 0 30 C 18 30, 18 30, 36 30' — pure horizontal (control point 동일 y).
//    bezier curve 영역 영역 영역 영역 영역 단순 line 영역 정합 (no wave).
//  - viewBox 36×60 영역 영역 36×60 영역 보존 — height 영역 align-self stretch 영역
//    parent height 영역 fill 영역 vertical center y=30 영역 좌·우 박스 mid 영역 align.
//  - tone 영역 violet 영역 swap (cyan #06b6d4 → violet #a78bfa). gradient stop 영역
//    violet light/main/dark 영역 정합.
//  - flow dot 영역 항상 animateMotion (사용자 명시 — 5s loop infinite 폐기 → 1.8s
//    loop 영역 영역 영역 보존, 본 영역 visual 영역 연속 정합).

interface ArrowProps {
  active?: boolean;
  /** legacy prop — tone unification 영역 영역 무시 영역 default 0. */
  segment?: 0 | 1 | 2 | 3;
}

// path d v6 (2026-05-05) — pure horizontal bezier (control point 동일 y=30).
// 좌·우 box edge mid 영역 직선 영역 정합 — wave artifact 영역 0. control point 영역
// x 영역 영역 영역 — 단순 cubic 영역 horizontal line 영역 영역 정합 (visual 동일).
const PATH_D = 'M 0 30 C 18 30, 18 30, 36 30';
// dashed underlay path — animated dash 영역 stream 영역 visualize.
const DASH_LEN = 36;

export default function Arrow({ active = false }: ArrowProps) {
  return (
    <div className={`snn-pipeline-arrow ${active ? 'is-active' : 'is-idle'}`} aria-hidden>
      <svg viewBox="0 0 36 60" width="36" height="60" preserveAspectRatio="none">
        <defs>
          <linearGradient id="snn-conn-violet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#a78bfa" stopOpacity="1.0" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.95" />
          </linearGradient>
          <filter id="snn-conn-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.0" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* base edge — horizontal bezier (control point 동일 y=30) → wave 0. 항상
            visible (alpha 0.55 → active 1.0). stroke 2.0 영역 visual depth ↑. */}
        <path
          className="snn-pipeline-conn-path"
          d={PATH_D}
          stroke="url(#snn-conn-violet)"
          strokeWidth="2.0"
          fill="none"
          strokeLinecap="round"
          filter="url(#snn-conn-glow)"
        />
        {/* animated dash overlay — active 영역 영역 영역. */}
        {active && (
          <path
            className="snn-pipeline-conn-dash"
            d={PATH_D}
            stroke="#ddd6fe"
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
        {/* flow dot — 항상 animateMotion 영역 1.8s loop. */}
        <circle
          className="snn-pipeline-conn-dot"
          r="2.6"
          fill="#c4b5fd"
        >
          <animateMotion dur="1.8s" repeatCount="indefinite" path={PATH_D} />
        </circle>
      </svg>
    </div>
  );
}
