'use client';

// MobileBottomBar — 카메라 입력 제거 (2026-05-14).
// Save / Reset / Settings / Engine 토글만 유지.
//
// UX Polish PR1 Fix 1 (CRITICAL [C1], 2026-05-09): 모바일 engine 토글.

import { EngineSegmented } from './Toolbar';
import { useEngineMode } from '@/lib/snn/engine-mode';

interface MobileBottomBarProps {
  onSave: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
}

// WCAG 2.5.5 (Target Size) — `min-h-[44px]` 보장.
const slot = 'flex flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 min-h-[44px] ' +
  'text-[10px] text-white/70 hover:bg-white/5 active:bg-white/10 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-inset';

export default function MobileBottomBar(p: MobileBottomBarProps) {
  const [engine, setEngine] = useEngineMode();
  return (
    <nav
      role="toolbar"
      aria-label="Mobile editor toolbar"
      className="flex w-full items-center gap-1 border-t border-white/5 bg-[#0d0d10]/95 px-2 md:hidden"
    >
      <button type="button" className={slot} onClick={p.onSave} aria-label="저장">
        <Icon kind="save" />
        저장
      </button>
      <button type="button" className={slot} onClick={p.onReset} aria-label="전체 리셋">
        <Icon kind="reset" />
        전체 리셋
      </button>
      <button type="button" className={slot} onClick={p.onOpenSettings} aria-label="설정">
        <Icon kind="settings" />
        설정
      </button>
      <div className="flex flex-[1.4] items-center justify-center px-1 py-2 min-h-[44px]">
        <EngineSegmented value={engine} onChange={setEngine} />
      </div>
    </nav>
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
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return null;
  }
}
