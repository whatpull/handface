'use client';

// NodeShell — 5 node component 영역 공통 frame.
// 사용자 catch (2026-05-05): 컨텐츠 접기 폐기 — 항상 expanded.
// drag handle bar 영역 폐기 사실 (PipelineCanvas).

interface NodeShellProps {
  title: string;
  subtitle: string;
  tone: string;
  children: React.ReactNode;
}

export default function NodeShell({ title, subtitle, tone, children }: NodeShellProps) {
  const bodyId = `snn-pipeline-body-${tone}`;
  return (
    <section
      className={`snn-pipeline-node snn-pipeline-node--${tone}`}
      aria-label={`${title} — ${subtitle}`}
    >
      <header className="snn-pipeline-node-header">
        <span className="snn-pipeline-node-title">{title}</span>
        <span className="snn-pipeline-node-sub">{subtitle}</span>
      </header>
      <div id={bodyId} className="snn-pipeline-node-body">{children}</div>
    </section>
  );
}
