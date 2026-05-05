'use client';

// Arrow — 5 node 사이 cyan flow 화살표.
// active=true 영역 pulse circle 추가 — winner 정합 시 흐름 발광.

export default function Arrow({ active = false }: { active?: boolean }) {
  return (
    <div className={`snn-pipeline-arrow ${active ? 'is-active' : ''}`} aria-hidden>
      <svg viewBox="0 0 32 16" width="32" height="16">
        <line x1="0" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="1.4" />
        <polyline points="22,3 28,8 22,13" stroke="currentColor" strokeWidth="1.4" fill="none" />
        {active && (
          <circle className="snn-pipeline-arrow-pulse" cx="0" cy="8" r="2" fill="currentColor" />
        )}
      </svg>
    </div>
  );
}
