'use client';

// NodeShell — 5 node component 영역 공통 frame.
// PipelineCanvas.tsx 영역 추출 — 동작 변경 0, 분리 사실 only.

interface NodeShellProps {
  title: string;
  subtitle: string;
  tone: string;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function NodeShell({ title, subtitle, tone, collapsed, onToggle, children }: NodeShellProps) {
  const bodyId = `snn-pipeline-body-${tone}`;
  return (
    <section
      className={`snn-pipeline-node snn-pipeline-node--${tone} ${collapsed ? 'is-collapsed' : ''}`}
      aria-label={`${title} — ${subtitle}`}
    >
      <header className="snn-pipeline-node-header">
        <button
          type="button"
          className="snn-pipeline-node-toggle"
          onClick={onToggle}
          aria-expanded={collapsed ? 'false' : 'true'}
          aria-controls={bodyId}
          aria-label={`${title} ${collapsed ? 'expand' : 'collapse'}`}
        >
          <span className="snn-pipeline-node-title">{title}</span>
          <span className="snn-pipeline-node-sub">{subtitle}</span>
          <span className="snn-pipeline-node-caret" aria-hidden>{collapsed ? '▸' : '▾'}</span>
        </button>
      </header>
      {!collapsed && (
        <div id={bodyId} className="snn-pipeline-node-body">{children}</div>
      )}
    </section>
  );
}
