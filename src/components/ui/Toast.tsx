'use client';

// 전역 toast UX — 사용자 silent fail 회피 catch path.
// fetch 실패 / API key 부재 / MediaPipe init 실패 / camera permission deny /
// localStorage quota 등 영역 명시 사용자 피드백.
//
// 사용 영역:
//  1. 최상위 Editor 영역 <ToastProvider> wrap.
//  2. 어느 컴포넌트 영역 영역 `showToast({ kind, message })` 호출 (전역 함수).
//
// 동시 다발 toast 영역 stack — auto fade (default 4s).

import {
  createContext, useCallback, useEffect, useState, type ReactNode,
} from 'react';

export type ToastKind = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
  // ms — 0 영역 manual dismiss 영역만 폐기.
  duration?: number;
}

interface ToastContextValue {
  push: (kind: ToastKind, message: string, duration?: number) => void;
  dismiss: (id: number) => void;
}

// Context 영역 useToast hook 폐기 사실 보존 — Provider 영역 globalPush register 영역 단일
// path 영역, showToast() helper 영역 외부 호출자 사용. dismiss 영역 ToastView 영역 직접
// onDismiss 영역 호출.
const ToastContext = createContext<ToastContextValue | null>(null);

// 전역 push handle — Provider mount 영역 register.
// 컴포넌트 영역 외 (예: 비-React module) 영역 호출 catch path.
let globalPush: ((kind: ToastKind, message: string, duration?: number) => void) | null = null;

export function showToast(arg: { kind: ToastKind; message: string; duration?: number }) {
  if (globalPush) globalPush(arg.kind, arg.message, arg.duration);
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

  const push = useCallback((kind: ToastKind, message: string, duration = 4000) => {
    const id = nextId; nextId += 1;
    setItems((prev) => [...prev, { id, kind, message, duration }]);
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

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div
        aria-label="Notifications"
        aria-live="polite"
        className="snn-toast-region pointer-events-none fixed bottom-4 right-4 z-[1000] flex w-[min(360px,calc(100vw-32px))] flex-col gap-2"
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
  return (
    <div
      role={item.kind === 'error' || item.kind === 'warning' ? 'alert' : 'status'}
      className={`snn-toast pointer-events-auto flex items-start gap-2 rounded border px-3 py-2 font-mono text-[11px] shadow-lg backdrop-blur ${palette.classes}`}
    >
      <span aria-hidden="true" className="mt-[1px] shrink-0">{palette.icon}</span>
      <span className="flex-1 break-words">{item.message}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="shrink-0 rounded px-1 text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
      >
        <span aria-hidden>✕</span>
      </button>
    </div>
  );
}

const TOAST_PALETTE: Record<ToastKind, { classes: string; icon: string }> = {
  info:    { classes: 'border-white/15 bg-[#0f1117]/95 text-white/85',                icon: 'i' },
  success: { classes: 'border-emerald-400/40 bg-[#0c1f15]/95 text-emerald-200',        icon: '✓' },
  warning: { classes: 'border-amber-400/40 bg-[#1f1808]/95 text-amber-200',            icon: '!' },
  error:   { classes: 'border-rose-400/50 bg-[#1f0c0c]/95 text-rose-200',              icon: '✗' },
};

