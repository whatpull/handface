'use client';

// 직전 ViewMode (pipeline / region) sheet 영역 폐기됨 — 사용자 명시 영역 단일 통합 view.
// (neuron drawflow 영역 직전 영역 폐기 — 데이터 정합 0.)

interface MobileBottomBarProps {
  onSave: () => void;
  onReset: () => void;
}

const slot = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 ' +
  'text-[10px] text-white/70 hover:bg-white/5 active:bg-white/10 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-inset';

export default function MobileBottomBar(p: MobileBottomBarProps) {
  return (
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
    default:
      return null;
  }
}
