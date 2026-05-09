'use client';

import { useState } from 'react';
import { createActions } from '@/lib/snn/actions';
import { useEngineMode, type EngineMode } from '@/lib/snn/engine-mode';

// 직전 ViewMode (pipeline / region) 영역 폐기됨 — 사용자 명시 영역 단일 통합 view.
// (neuron drawflow 472 sampling 영역 직전 영역 폐기 — 데이터 정합 0.)
//
// 사용자 catch 2026-05-09 (no-new-UI 규칙): 새 페이지/라우트 금지 — root
// /handface/ 의 업그레이드만. 본 Toolbar 에 Engine 토글 (backend / local)
// 추가해 학습/추론 실행 엔진 swap. 1차 PR 영역 토글 + persist 만 — 노드들
// 영역 mode listen 영역 후속 PR.

interface ToolbarProps {
  onStatusChange?: (msg: string) => void;
}

const groupCls = 'flex items-center gap-1';
const btnCls   = 'inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs ' +
  'text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60';

export default function Toolbar({ onStatusChange }: ToolbarProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const [engine, setEngine] = useEngineMode();
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
          onClick={() => window.dispatchEvent(new CustomEvent('handface.pipeline.reset-layout'))}
          title="Reset node layout to default"
        >
          <Icon kind="layout" /> Reset layout
        </button>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-white/40">엔진</span>
        <EngineSegmented value={engine} onChange={setEngine} />
      </div>
    </div>
  );
}

const segBaseCls = 'px-2 py-1 text-[11px] rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60';
const segOnCls = 'bg-violet-500/30 text-white border border-violet-400/40';
const segOffCls = 'text-white/55 hover:text-white hover:bg-white/10 border border-transparent';

function EngineSegmented({ value, onChange }: { value: EngineMode; onChange: (m: EngineMode) => void }) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded border border-white/10 bg-black/30 p-0.5">
      <button
        type="button"
        className={`${segBaseCls} ${value === 'backend' ? segOnCls : segOffCls}`}
        onClick={() => onChange('backend')}
        title="HF Spaces 백엔드 사용 (rev15 검증된 path)"
      >
        Backend
      </button>
      <button
        type="button"
        className={`${segBaseCls} ${value === 'local' ? segOnCls : segOffCls}`}
        onClick={() => onChange('local')}
        title="브라우저 내 TS SNN runtime (Phase C1~C5c)"
      >
        Local
      </button>
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
