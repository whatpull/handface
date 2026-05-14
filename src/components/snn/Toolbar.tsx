'use client';

import { useState } from 'react';
import { createActions } from '@/lib/snn/actions';

// 직전 ViewMode (pipeline / region) 영역 폐기됨 — 사용자 명시 영역 단일 통합 view.
// Engine 토글 (Backend/Live) 제거 — Live 고정 (2026-05-15).
// 전체 리셋 버튼 제거 — NodeInput의 "학습 reset" 단일화 (2026-05-15).

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

  // actions 참조 유지 (save 등 미래 확장 대비) — reset은 NodeInput 단일.
  void actions;

  return (
    <div
      role="toolbar"
      className="hidden md:flex flex-wrap items-center gap-1 border-b border-white/5 bg-[#0d0d10]/95 px-3 py-2"
    >
      <div className={groupCls}>
        <button
          type="button"
          className={btnCls}
          onClick={() => window.dispatchEvent(new CustomEvent('handface.pipeline.reset-layout'))}
          title="노드 레이아웃을 기본값으로 되돌립니다"
        >
          <Icon kind="layout" /> 레이아웃 초기화
        </button>
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: string }) {
  const c = 'h-3.5 w-3.5';
  switch (kind) {
    case 'layout':
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    default:
      return null;
  }
}
