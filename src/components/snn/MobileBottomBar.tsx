'use client';

// MobileBottomBar — Settings 슬롯만 유지 (저장/리셋 제거 2026-05-15).

interface MobileBottomBarProps {
  onOpenSettings: () => void;
}

// WCAG 2.5.5 (Target Size) — `min-h-[44px]` 보장.
const slot = 'flex flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 min-h-[44px] ' +
  'text-[10px] text-white/70 hover:bg-white/5 active:bg-white/10 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-inset';

export default function MobileBottomBar(p: MobileBottomBarProps) {
  return (
    <nav
      role="toolbar"
      aria-label="Mobile editor toolbar"
      className="flex w-full items-center gap-1 border-t border-white/5 bg-[#0d0d10]/95 px-2 md:hidden"
    >
      <button type="button" className={slot} onClick={p.onOpenSettings} aria-label="설정">
        <Icon kind="settings" />
        설정
      </button>
    </nav>
  );
}

function Icon({ kind }: { kind: string }) {
  const c = 'h-4 w-4';
  switch (kind) {
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
