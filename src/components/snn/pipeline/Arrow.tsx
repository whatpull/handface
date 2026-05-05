'use client';

// Arrow — bezier curve connector (사용자 catch [UI/UX 40%]: "bezier curve + glow + tone gradient").
//
// 직전 straight line + arrowhead 영역 폐기 — 영역 reference 이미지 (Figma node editor) 영역 정합:
//  - SVG cubic bezier (M cx1 cy1 C cx2 cy2 ...) — flow 부드럽게.
//  - linearGradient stroke — 양 끝 노드 tone (e.g. violet → amber, amber → cyan, cyan → pink, pink → blue).
//  - active 영역 dot 영역 path 영역 따라 흐름 (CSS animation: offsetDistance 0% → 100%).
//  - 영역 영역 영역 (≤900px) 영역 column flow 영역 90deg rotate 영역 영역 영역 영역.
//
// 정직 한계 박음:
//  - SVG width 영역 14-28px 영역 좁음 → bezier control point 영역 영역 큰 곡률 catch 영역 영역 — slight curve 영역 영역.
//  - tone prop 영역 4 segment 영역 정합: 'violet-amber' / 'amber-cyan' / 'cyan-pink' / 'pink-blue'.
//  - prefers-reduced-motion 영역 dot animation 영역 0.01ms 영역 정지 (.snn-pipeline-conn-dot 정합).

interface ArrowProps {
  active?: boolean;
  /** 4 segment 영역 tone gradient — index 0..3 영역 정합. */
  segment?: 0 | 1 | 2 | 3;
}

const TONE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['#a78bfa', '#fbbf24'], // 0: input violet → learn amber
  ['#fbbf24', '#5eead4'], // 1: learn amber → infer cyan
  ['#5eead4', '#f472b6'], // 2: infer cyan → out pink
  ['#f472b6', '#60a5fa'], // 3: out pink → llm blue
];

export default function Arrow({ active = false, segment = 0 }: ArrowProps) {
  const [c0, c1] = TONE_PAIRS[segment];
  const gradId = `snn-conn-grad-${segment}`;
  return (
    <div className={`snn-pipeline-arrow ${active ? 'is-active' : ''}`} aria-hidden>
      <svg viewBox="0 0 36 60" width="36" height="60" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c0} stopOpacity={active ? 0.95 : 0.5} />
            <stop offset="100%" stopColor={c1} stopOpacity={active ? 0.95 : 0.5} />
          </linearGradient>
          <filter id={`${gradId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* cubic bezier — slight S curve 영역 영역 ref 이미지 영역 정합. */}
        <path
          d="M 2 30 C 14 30, 22 30, 34 30"
          stroke={`url(#${gradId})`}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          filter={active ? `url(#${gradId}-glow)` : undefined}
        />
        {active && (
          <circle
            className="snn-pipeline-conn-dot"
            r="2.2"
            fill={c1}
          >
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M 2 30 C 14 30, 22 30, 34 30" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </div>
  );
}
