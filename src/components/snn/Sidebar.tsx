'use client';

interface SidebarProps {
  cameraConnected: boolean;
  onToggleCamera: () => void;
  editMode: boolean;
  onToggleEdit: () => void;
  onOpenSettings: () => void;
}

export default function Sidebar({
  cameraConnected, onToggleCamera, editMode, onToggleEdit, onOpenSettings,
}: SidebarProps) {
  const btn = (active: boolean) =>
    `flex h-9 w-9 items-center justify-center rounded text-white/70 transition-colors hover:bg-white/10 hover:text-white ` +
    (active ? 'bg-violet-500/25 text-violet-200 ring-1 ring-violet-400/40' : '');
  return (
    <aside className="flex w-12 shrink-0 flex-col items-center gap-2 border-r border-white/5 bg-[#0d0d10]/95 py-3">
      <button
        type="button"
        title={cameraConnected ? 'Disable camera' : 'Enable camera'}
        aria-label="Toggle camera"
        aria-pressed={cameraConnected}
        className={btn(cameraConnected)}
        onClick={onToggleCamera}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </button>
      <button
        type="button"
        title="Toggle edit mode"
        aria-label="Toggle edit mode"
        aria-pressed={editMode}
        className={btn(editMode)}
        onClick={onToggleEdit}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </button>
      <div className="my-1 h-px w-6 bg-white/10" aria-hidden />
      <button
        type="button"
        title="Settings"
        aria-label="Settings"
        className={btn(false)}
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
