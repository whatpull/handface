'use client';

import { useState } from 'react';
import { createActions } from '@/lib/snn/actions';

// 직전 ViewMode (pipeline / region) 영역 폐기됨 — 사용자 명시 영역 단일 통합 view.
// (neuron drawflow 472 sampling 영역 직전 영역 폐기 — 데이터 정합 0.)

interface ToolbarProps {
  onStatusChange?: (msg: string) => void;
}

const groupCls = 'flex items-center gap-1';
const btnCls   = 'inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs ' +
  'text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60';

export default function Toolbar({ onStatusChange }: ToolbarProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const actions = createActions({
    busy,
    setBusy,
    status: (m) => onStatusChange?.(m),
  });

  return (
    <div
      role="toolbar"
      className="hidden md:flex flex-wrap items-center gap-1 border-b border-white/5 bg-[#0d0d10]/95 px-3 py-2"
    >
      <div className={groupCls}>
        <button type="button" className={btnCls} onClick={actions.reset} disabled={busy === 'Reset'}>
          <Icon kind="reset" /> Reset
        </button>
        <button
          type="button"
          className={btnCls}
          onClick={() => window.dispatchEvent(new CustomEvent('handface.start-inference'))}
          title="학습 완료 후 추론 시작 (TRAINED → INFERENCE 명시 진입)"
        >
          <Icon kind="play" /> Start Inference
        </button>
        <button
          type="button"
          className={btnCls}
          onClick={() => window.dispatchEvent(new CustomEvent('handface.pipeline.reset-layout'))}
          title="Reset node layout to default"
        >
          <Icon kind="layout" /> Reset layout
        </button>
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: string }) {
  const c = 'h-3.5 w-3.5';
  switch (kind) {
    case 'reset':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
      );
    case 'layout':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'play':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <polygon points="6 4 20 12 6 20 6 4" />
        </svg>
      );
    default:
      return null;
  }
}
