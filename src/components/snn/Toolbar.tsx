'use client';

import { useState } from 'react';
import { createActions } from '@/lib/snn/actions';

interface ToolbarProps {
  view: 'region' | 'neuron';
  onViewChange: (v: 'region' | 'neuron') => void;
  onStatusChange?: (msg: string) => void;
  onStatsResult?: (data: unknown) => void;
  onBrainBuilder?: () => void;
}

const groupCls = 'flex items-center gap-1';
const sepCls   = 'mx-2 h-5 w-px bg-white/10';
const btnCls   = 'inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs ' +
  'text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent';
const activeCls = 'bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/40';

export default function Toolbar({
  view, onViewChange, onStatusChange, onStatsResult, onBrainBuilder,
}: ToolbarProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const actions = createActions({
    busy,
    setBusy,
    status: (m) => onStatusChange?.(m),
    onStatsResult,
  });
  const onBrain = () => onBrainBuilder?.();

  return (
    <div
      role="toolbar"
      className="flex flex-wrap items-center gap-1 border-b border-white/5 bg-[#0d0d10]/95 px-3 py-2"
    >
      <div className={groupCls}>
        <button
          type="button"
          className={`${btnCls} ${view === 'region' ? activeCls : ''}`}
          onClick={() => onViewChange('region')}
          aria-pressed={!!(view === 'region')}
          disabled={!!busy}
        >
          <Icon kind="region" /> Region
        </button>
        <button
          type="button"
          className={`${btnCls} ${view === 'neuron' ? activeCls : ''}`}
          onClick={() => onViewChange('neuron')}
          aria-pressed={!!(view === 'neuron')}
          disabled={!!busy}
        >
          <Icon kind="neuron" /> Neuron
        </button>
      </div>
      <div className={sepCls} aria-hidden />
      <div className={groupCls}>
        <button
          type="button"
          className={btnCls + ' bg-emerald-500/15 text-emerald-200'}
          onClick={actions.train}
          disabled={busy === 'Train'}
        >
          <Icon kind="play" /> Train
        </button>
        <button type="button" className={btnCls} onClick={actions.eval} disabled={busy === 'Eval'}>
          <Icon kind="target" /> Eval
        </button>
        <button type="button" className={btnCls} onClick={actions.reset} disabled={busy === 'Reset'}>
          <Icon kind="reset" /> Reset
        </button>
        <button type="button" className={btnCls} onClick={actions.grow} disabled={busy === 'Grow'}>
          <Icon kind="grow" /> Grow
        </button>
        <button type="button" className={btnCls} onClick={onBrain}>
          <Icon kind="brain" /> Brain
        </button>
        <button type="button" className={btnCls} onClick={actions.stats} disabled={busy === 'Stats'}>
          <Icon kind="stats" /> Stats
        </button>
      </div>
      <div className={sepCls} aria-hidden />
      <div className={groupCls}>
        <button type="button" className={btnCls} onClick={actions.save} disabled={busy === 'Save'}>
          <Icon kind="save" /> Save
        </button>
        <button type="button" className={btnCls} onClick={actions.load} disabled={busy === 'Load'}>
          <Icon kind="load" /> Load
        </button>
        <button type="button" className={btnCls} onClick={actions.exportCircuit} disabled={busy === 'Export'}>
          <Icon kind="export" /> Export
        </button>
        <button type="button" className={btnCls} onClick={actions.importCircuit} disabled={busy === 'Import'}>
          <Icon kind="import" /> Import
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
    case 'play':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3" /></svg>
      );
    case 'target':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'reset':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
      );
    case 'grow':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        </svg>
      );
    case 'brain':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
          <path d="M9 2v4" /><path d="M15 2v4" /><path d="M9 18v4" /><path d="M15 18v4" />
          <path d="M2 9h4" /><path d="M2 15h4" /><path d="M18 9h4" /><path d="M18 15h4" />
        </svg>
      );
    case 'stats':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
        </svg>
      );
    case 'save':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <path d="M17 21v-7H7v7" /><path d="M7 3v4a1 1 0 0 0 1 1h7" />
        </svg>
      );
    case 'load':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case 'export':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      );
    case 'import':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      );
    default:
      return null;
  }
}
