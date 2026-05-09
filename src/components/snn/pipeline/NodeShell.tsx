'use client';

// NodeShell — 5 node component 영역 공통 frame.
// 사용자 catch (2026-05-05): 컨텐츠 접기 폐기 — 항상 expanded.
// drag handle bar 영역 폐기 사실 (PipelineCanvas).
//
// UX Polish PR1 Fix 4 (HIGH [H4], 2026-05-09): subtitle 영역 ReactNode 영역
//   확장 — semantic Tailwind dot (aria-hidden) 영역 inline 정합. 동시 a11y
//   정합 영역 subtitleAria 영역 명시 string 영역 aria-label fallback.

import type { ReactNode } from 'react';

interface NodeShellProps {
  title: string;
  subtitle: ReactNode;
  tone: string;
  children: React.ReactNode;
  // a11y aria-label 영역 명시 string — subtitle 영역 ReactNode 시점 정합.
  subtitleAria?: string;
}

export default function NodeShell({ title, subtitle, tone, children, subtitleAria }: NodeShellProps) {
  const bodyId = `snn-pipeline-body-${tone}`;
  const ariaSub = subtitleAria ?? (typeof subtitle === 'string' ? subtitle : '');
  return (
    <section
      className={`snn-pipeline-node snn-pipeline-node--${tone}`}
      aria-label={ariaSub ? `${title} — ${ariaSub}` : title}
    >
      <header className="snn-pipeline-node-header">
        <span className="snn-pipeline-node-title">{title}</span>
        <span className="snn-pipeline-node-sub">{subtitle}</span>
      </header>
      <div id={bodyId} className="snn-pipeline-node-body">{children}</div>
    </section>
  );
}
