'use client';

import { useState } from 'react';
import { createActions } from '@/lib/snn/actions';

interface ToolbarProps {
  view: 'region' | 'neuron';
  onViewChange: (v: 'region' | 'neuron') => void;
  onStatusChange?: (msg: string) => void;
}

const groupCls = 'flex items-center gap-1';
const sepCls   = 'mx-2 h-5 w-px bg-white/10';
const btnCls   = 'inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs ' +
  'text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent';
const activeCls = 'bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/40';

export default function Toolbar({ view, onViewChange, onStatusChange }: ToolbarProps) {
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
        <button
          type="button"
          className={`${btnCls} ${view === 'region' ? activeCls : ''}`}
          onClick={() => onViewChange('region')}
          disabled={!!busy}
        >
          <Icon kind="region" /> Region
        </button>
        <button
          type="button"
          className={`${btnCls} ${view === 'neuron' ? activeCls : ''}`}
          onClick={() => onViewChange('neuron')}
          disabled={!!busy}
        >
          <Icon kind="neuron" /> Neuron
        </button>
      </div>
      <div className={sepCls} aria-hidden />
      <div className={groupCls}>
        <button type="button" className={btnCls} onClick={actions.reset} disabled={busy === 'Reset'}>
          <Icon kind="reset" /> Reset
        </button>
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: string }) {
  const c = 'h-3.5 w-3.5';
  switch (kind) {
    case 'region':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      );
    case 'neuron':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="16" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />
        </svg>
      );
    case 'reset':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
      );
    default:
      return null;
  }
}
