'use client';

interface MobileBottomBarProps {
  onTrain: () => void;
  onEval: () => void;
  onSave: () => void;
  onReset: () => void;
  onMore: () => void;
}

const slot = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 ' +
  'text-[10px] text-white/70 hover:bg-white/5 active:bg-white/10';

export default function MobileBottomBar({
  onTrain, onEval, onSave, onReset, onMore,
}: MobileBottomBarProps) {
  return (
    <nav
      role="toolbar"
      aria-label="Mobile editor toolbar"
      className="flex w-full border-t border-white/5 bg-[#0d0d10]/95 md:hidden"
    >
      <button type="button" className={slot} onClick={onTrain} aria-label="Train">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3" /></svg>
        Train
      </button>
      <button type="button" className={slot} onClick={onEval} aria-label="Eval">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
        Eval
      </button>
      <button type="button" className={slot} onClick={onSave} aria-label="Save">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <path d="M17 21v-7H7v7" /><path d="M7 3v4a1 1 0 0 0 1 1h7" />
        </svg>
        Save
      </button>
      <button type="button" className={slot} onClick={onReset} aria-label="Reset">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
        Reset
      </button>
      <button type="button" className={slot} onClick={onMore} aria-label="More">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <circle cx="12" cy="6" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="18" r="1.5" />
        </svg>
        More
      </button>
    </nav>
  );
}
