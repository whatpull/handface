'use client';

// 전역 toast UX — 사용자 silent fail 회피 catch path.
// fetch 실패 / API key 부재 / MediaPipe init 실패 / camera permission deny /
// localStorage quota 등 영역 명시 사용자 피드백.
//
// 사용 영역:
//  1. 최상위 Editor 영역 <ToastProvider> wrap.
//  2. 어느 컴포넌트 일부 `showToast({ kind, message })` 호출 (전역 함수).
//
// 동시 다발 toast 영역 stack — auto fade (default 4s).

import {
  createContext, useCallback, useEffect, useState, type ReactNode,
} from 'react';

export type ToastKind = 'info' | 'success' | 'warning' | 'error';

// F4 UX polish (2, 2026-05-11): action button — toast 영역 후속 path 영역
// affordance. cluster-spawned toast 영역 → OUT RenameButton scroll/focus,
// 사용자 영역 즉시 명명 path 영역 진입 (직전 toast 영역 visual only).
export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
  // ms — 0 영역 manual dismiss 영역만 폐기.
  duration?: number;
  action?: ToastAction;
}

interface ToastContextValue {
  push: (kind: ToastKind, message: string, duration?: number, action?: ToastAction) => void;
  dismiss: (id: number) => void;
}

// Context 영역 useToast hook 폐기 사실 보존 — Provider 영역 globalPush register 영역 단일
// path 영역, showToast() helper 영역 외부 호출자 사용. dismiss 영역 ToastView 영역 직접
// onDismiss 영역 호출.
const ToastContext = createContext<ToastContextValue | null>(null);

// 전역 push handle — Provider mount 영역 register.
// 컴포넌트 영역 외 (예: 비-React module) 영역 호출 catch path.
let globalPush: ((kind: ToastKind, message: string, duration?: number, action?: ToastAction) => void) | null = null;

export function showToast(arg: { kind: ToastKind; message: string; duration?: number; action?: ToastAction }) {
  if (globalPush) globalPush(arg.kind, arg.message, arg.duration, arg.action);
  else if (typeof console !== 'undefined') {
    // Provider 미mount path — fallback console.
    if (arg.kind === 'error') console.error(`[toast] ${arg.message}`);
    else if (arg.kind === 'warning') console.warn(`[toast] ${arg.message}`);
    else console.log(`[toast] ${arg.message}`);
  }
}

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const push = useCallback((kind: ToastKind, message: string, duration = 4000, action?: ToastAction) => {
    const id = nextId; nextId += 1;
    setItems((prev) => [...prev, { id, kind, message, duration, action }]);
    if (duration > 0) {
      setTimeout(() => {
        setItems((prev) => prev.filter((it) => it.id !== id));
      }, duration);
    }
  }, []);

  // 전역 handle register — module-level showToast() 영역 정합.
  useEffect(() => {
    globalPush = push;
    return () => { if (globalPush === push) globalPush = null; };
  }, [push]);

  // UX Polish PR2 Fix 7 (LOW [L1], 2026-05-09): Esc 키 영역 가장 최근 toast dismiss.
  //   직전 toast 영역 visual only — 키보드 사용자 dismiss path 0 (auto 5s 정합 단
  //   명시 dismiss 0). ToastView 영역 ✕ 버튼 영역 보조 — 키보드 우선 사용자 정합.
  //   focus catch 영역 input/textarea 입력 영역 영역 정합 — 입력 element focus 시점 skip.
  // Polish PR3 Fix 1 (Security LOW, 2026-05-09): IME composition (한국어 입력 중)
  //   영역 Esc 영역 catch 0 — 입력 escape 시점 의도 차이 dismiss 회피.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (e.isComposing) return; // IME composition 영역 skip
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      setItems((prev) => prev.length === 0 ? prev : prev.slice(0, -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div
        aria-label="Notifications"
        aria-live="polite"
        className="snn-toast-region pointer-events-none fixed bottom-4 right-4 z-[var(--z-toast)] flex w-[min(360px,calc(100vw-32px))] flex-col gap-2"
      >
        {items.map((it) => (
          <ToastView key={it.id} item={it} onDismiss={() => dismiss(it.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const palette = TOAST_PALETTE[item.kind];
  // PR #196 polish (UX LOW-3, 2026-05-10): warning/error 영역 aria-live="assertive"
  //   영역 명시 escalate — 직전 region wrapper 영역 'polite' 영역만 catch 사실 영역
  //   warning bundle fail 영역 즉시 catch 0 (screen reader 영역 polite 영역 next
  //   pause point 영역 대기). per-item assertive override 영역 region polite 영역
  //   beat (a11y spec ARIA 1.2 영역 nearest aria-live ancestor 영역 overrideable).
  //   role="alert" 영역 implicit assertive 영역 보존 단 일부 reader 영역 explicit
  //   attr 영역 catch 정합 catch path. info / success 영역 polite 보존.
  //   jsx-a11y/aria-props-valid-values rule 영역 literal attr 영역 강제 — wrapper
  //   영역 분기 (assertive vs polite) 영역 split 정합.
  const className = `snn-toast pointer-events-auto flex items-start gap-2 rounded border px-3 py-2 font-mono text-[11px] shadow-lg backdrop-blur ${palette.classes}`;
  // F4 UX polish (2, 2026-05-11): action button — toast click 영역 후속 path
  // (예: OUT RenameButton scroll/focus) 영역 affordance. focus-visible ring +
  // min touch height 28px (toast 영역 dense 영역 44px 영역 oversize, 28px 영역
  // pointer:fine 영역 정합 — pointer:coarse 영역 hover 영역 별도 catch).
  const handleAction = item.action
    ? () => {
        try { item.action!.onClick(); } finally { onDismiss(); }
      }
    : undefined;
  const inner = (
    <>
      <span aria-hidden="true" className="mt-[1px] shrink-0">{palette.icon}</span>
      <span className="flex-1 break-words">{item.message}</span>
      {handleAction && (
        <button
          type="button"
          onClick={handleAction}
          className="shrink-0 rounded border border-white/20 bg-white/5 px-2 py-[2px] text-[11px] text-white/90 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
        >
          {item.action!.label}
        </button>
      )}
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="shrink-0 rounded px-1 text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
      >
        <span aria-hidden>✕</span>
      </button>
    </>
  );
  if (item.kind === 'warning' || item.kind === 'error') {
    return (
      <div role="alert" aria-live="assertive" aria-atomic="true" className={className}>
        {inner}
      </div>
    );
  }
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className={className}>
      {inner}
    </div>
  );
}

const TOAST_PALETTE: Record<ToastKind, { classes: string; icon: string }> = {
  info:    { classes: 'border-white/15 bg-[#0f1117]/95 text-white/85',                icon: 'i' },
  success: { classes: 'border-emerald-400/40 bg-[#0c1f15]/95 text-emerald-200',        icon: '✓' },
  warning: { classes: 'border-amber-400/40 bg-[#1f1808]/95 text-amber-200',            icon: '!' },
  error:   { classes: 'border-rose-400/50 bg-[#1f0c0c]/95 text-rose-200',              icon: '✗' },
};

