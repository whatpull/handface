'use client';

// 직전 ViewMode (pipeline / region) sheet 영역 폐기됨 — 사용자 명시 영역 단일 통합 view.
// (neuron drawflow 영역 직전 영역 폐기 — 데이터 정합 0.)
//
// UX Polish PR1 Fix 1 (CRITICAL [C1], 2026-05-09): 모바일 engine 토글 추가.
//   직전 Toolbar `hidden md:flex` → 모바일 사용자 Live ↔ Backend swap path 0.
//   default 'live' 모바일 사용자 silent stuck 정정. EngineSegmented 컴포넌트
//   Toolbar 에서 export 하여 동일 UX 재사용.
//
// UX Polish PR2 Fix 1 (HIGH [H3], 2026-05-09): Sidebar `hidden md:flex` swap 정합.
//   카메라 toggle + Settings open 두 버튼 흡수 — 모바일 사용자 카메라 활성화
//   path 회복 (Onboarding toast 안내문 정합 보존).

import { EngineSegmented } from './Toolbar';
import { useEngineMode } from '@/lib/snn/engine-mode';

interface MobileBottomBarProps {
  onSave: () => void;
  onReset: () => void;
  cameraConnected: boolean;
  onToggleCamera: () => void;
  onOpenSettings: () => void;
}

const slot = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 ' +
  'text-[10px] text-white/70 hover:bg-white/5 active:bg-white/10 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-inset';
const slotActive = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 ' +
  'text-[10px] text-violet-200 bg-violet-500/15 active:bg-violet-500/25 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-inset';

export default function MobileBottomBar(p: MobileBottomBarProps) {
  const [engine, setEngine] = useEngineMode();
  return (
    <nav
      role="toolbar"
      aria-label="Mobile editor toolbar"
      className="flex w-full items-center gap-1 border-t border-white/5 bg-[#0d0d10]/95 px-2 md:hidden"
    >
      <button
        type="button"
        className={p.cameraConnected ? slotActive : slot}
        onClick={p.onToggleCamera}
        aria-label={p.cameraConnected ? '카메라 비활성화' : '카메라 활성화'}
        aria-pressed={p.cameraConnected ? 'true' : 'false'}
      >
        <Icon kind="camera" />
        카메라
      </button>
      <button type="button" className={slot} onClick={p.onSave} aria-label="저장">
        <Icon kind="save" />
        저장
      </button>
      <button type="button" className={slot} onClick={p.onReset} aria-label="초기화">
        <Icon kind="reset" />
        초기화
      </button>
      <button type="button" className={slot} onClick={p.onOpenSettings} aria-label="설정">
        <Icon kind="settings" />
        설정
      </button>
      <div className="flex flex-1 items-center justify-center py-2">
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
    case 'camera':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
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
