'use client';

// Arrow — bezier connector v8 (2026-05-05 사용자 명시 부활):
// "node로 연결해줘 아까 지웠지만 node 연결 구성으로 가져가고 싶어. 발화하면 active 되었던 그 구성"
//
// drawflow 정합 부활:
//  - SVG bezier path: M 0 30 → C 12 30, 24 30, 36 30 (단순 horizontal — wave artifact 0).
//  - stroke white / gray idle (alpha 0.3) → active 시 alpha 0.9 + drop-shadow blur 4-6px.
//  - active dot animateMotion 1.5s ease-in-out 1회 (drawflow fired class 정합).
//  - active 시 1500ms 동안 is-active class 유지 (PipelineCanvas trigger timestamp 정합).
//
// 직전 v7 (단순 horizontal line + chevron) 폐기 — 사용자 명시 "발화 active 부활".

interface ArrowProps {
  active?: boolean;
  /** legacy prop — 4 segment segment별 trigger 정합 (PipelineCanvas). */
  segment?: 0 | 1 | 2 | 3;
}

export default function Arrow({ active = false }: ArrowProps) {
  return (
    <div className={`snn-pipeline-arrow ${active ? 'is-active' : 'is-idle'}`} aria-hidden>
      <svg viewBox="0 0 36 60" width="36" height="60" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* path — bezier horizontal (M 0 30 → C 12 30, 24 30, 36 30). */}
          <path id="snn-conn-bezier-path" d="M 0 30 C 12 30, 24 30, 36 30" />
        </defs>
        {/* main connector stroke — idle gray / active white + glow. */}
        <path
          className="snn-pipeline-conn-path"
          d="M 0 30 C 12 30, 24 30, 36 30"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* chevron arrow head — 단순 horizontal triangle (path end 영역). */}
        <path
          className="snn-pipeline-conn-head"
          d="M 30 26 L 36 30 L 30 34"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* active dot — animateMotion 1.5s 1회 (active 변화 시점 영역 발화). */}
        {active && (
          <circle r="3" className="snn-pipeline-conn-dot" fill="currentColor">
            <animateMotion dur="1.5s" repeatCount="1" calcMode="spline" keySplines="0.4 0 0.2 1">
              <mpath href="#snn-conn-bezier-path" />
            </animateMotion>
          </circle>
        )}
      </svg>
    </div>
  );
}
