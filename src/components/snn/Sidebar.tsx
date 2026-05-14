'use client';

// Sidebar — Settings 버튼. 카메라 입력 제거 (2026-05-14).
//
// UX Polish PR2 Fix 1 (HIGH [H3], 2026-05-09): 모바일 좌측 48px 항상 visible 정정.
//   `hidden md:flex` — 모바일 카메라/Settings 버튼은 MobileBottomBar 가 흡수.

interface SidebarProps {
  onOpenSettings: () => void;
}

export default function Sidebar({ onOpenSettings }: SidebarProps) {
  const btn =
    `flex h-9 w-9 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/10 hover:text-white ` +
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60`;
  return (
    <aside className="hidden md:flex w-12 shrink-0 flex-col items-center gap-2 border-r border-white/5 bg-[#0d0d10]/95 py-3">
      <button
        type="button"
        title="Settings"
        aria-label="Settings"
        className={btn}
        onClick={onOpenSettings}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </aside>
  );
}
