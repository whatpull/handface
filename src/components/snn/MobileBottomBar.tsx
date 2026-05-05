'use client';

import { useState } from 'react';

// 'neuron' (drawflow 472 sampling) 영역 폐기됨 — 데이터 정합 0.
type ViewMode = 'pipeline' | 'region';
interface MobileBottomBarProps {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  onSave: () => void;
  onReset: () => void;
}

const slot = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 ' +
  'text-[10px] text-white/70 hover:bg-white/5 active:bg-white/10';

export default function MobileBottomBar(p: MobileBottomBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        role="toolbar"
        aria-label="Mobile editor toolbar"
        className="flex w-full border-t border-white/5 bg-[#0d0d10]/95 md:hidden"
      >
        <button type="button" className={slot} onClick={p.onSave} aria-label="Save">
          <Icon kind="save" />
          Save
        </button>
        <button type="button" className={slot} onClick={p.onReset} aria-label="Reset">
          <Icon kind="reset" />
          Reset
        </button>
        <button type="button" className={slot} onClick={() => setMoreOpen(true)} aria-label="View">
          <Icon kind="view" />
          View
        </button>
      </nav>

      {moreOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/40 md:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div
            role="dialog"
            aria-label="View mode"
            className="w-full rounded-t-lg border-t border-white/10 bg-[#0f1117] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-violet-300">VIEW</span>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="Close"
                className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <SheetBtn label="Pipeline" active={p.view === 'pipeline'} onClick={() => { p.onViewChange('pipeline'); setMoreOpen(false); }} />
              <SheetBtn label="Region" active={p.view === 'region'} onClick={() => { p.onViewChange('region'); setMoreOpen(false); }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SheetBtn({ label, onClick, active = false }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded border px-3 py-2 text-xs ' +
        (active
          ? 'border-violet-400/60 bg-violet-500/15 text-violet-200'
          : 'border-white/10 bg-white/5 text-white/80 hover:border-violet-400/40 hover:bg-violet-500/10')
      }
    >
      {label}
    </button>
  );
}

function Icon({ kind }: { kind: string }) {
  const c = 'h-4 w-4';
  switch (kind) {
    case 'save':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <path d="M17 21v-7H7v7" /><path d="M7 3v4a1 1 0 0 0 1 1h7" />
        </svg>
      );
    case 'reset':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
      );
    case 'view':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    default:
      return null;
  }
}
