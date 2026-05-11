'use client';

// Global Dialog UX — native alert() / confirm() / prompt() blocking calls 영역
// accessible modal swap. ToastProvider 영역 정합 path:
//
//   1. Editor 최상위 <DialogProvider> wrap (ToastProvider 영역 sibling).
//   2. 어느 컴포넌트 일부 `showDialog({ ... })` 호출 (전역 함수).
//
// 단일 dialog at a time — 이전 dialog 영역 dismiss 후 다음 dialog open.
// queue stack 영역 native blocking call 영역 imitate (alert sequential 정합).
//
// 사용자 catch 2026-05-12 ("alert → dialog"): 사용자 명시 — native blocking
// 영역 모바일 browser 영역 oversized / 영역 design-token 영역 영역 정합 영역.
// Dialog 영역 design-token (snn-toast 영역 정합 mono / dark surface) +
// keyboard (Tab focus trap + Escape close) + WCAG (role=dialog +
// aria-labelledby + aria-describedby + aria-modal).
//
// kind:
//   'info'    — single OK button (alert swap).
//   'confirm' — Confirm + Cancel (confirm() swap).
//   'input'   — text field + Submit + Cancel (prompt() swap — 현재 미사용).

import {
  createContext, useCallback, useEffect, useRef, useState, type ReactNode,
} from 'react';

export type DialogKind = 'info' | 'confirm' | 'input';

interface BaseDialogRequest {
  title: string;
  message?: string;
  // i18n — default 'OK' / 'Confirm' / 'Cancel'.
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface InfoDialogRequest extends BaseDialogRequest {
  kind: 'info';
  onClose?: () => void;
}

export interface ConfirmDialogRequest extends BaseDialogRequest {
  kind: 'confirm';
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface InputDialogRequest extends BaseDialogRequest {
  kind: 'input';
  placeholder?: string;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
}

export type DialogRequest = InfoDialogRequest | ConfirmDialogRequest | InputDialogRequest;

interface DialogItem extends Omit<DialogRequest, 'kind'> {
  id: number;
  kind: DialogKind;
  // promise resolution 영역 confirm path — boolean. input path — string|null.
  resolve?: (value: boolean | string | null) => void;
  // narrowed callbacks
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

const DialogContext = createContext<{ push: (req: DialogRequest) => void } | null>(null);

// 전역 push handle — Provider mount 영역 register.
let globalPush: ((req: DialogRequest) => void) | null = null;

// showDialog — fire-and-forget. callback path (onConfirm / onCancel / onSubmit /
// onClose) 영역 결과 catch. Provider 미mount path — fallback console + immediate
// onCancel/onClose path (silent UX 회피).
export function showDialog(req: DialogRequest) {
  if (globalPush) {
    globalPush(req);
    return;
  }
  // Provider 미mount — fallback path (SSR / 테스트 setup).
  if (typeof console !== 'undefined') {
    console.warn(`[dialog] Provider not mounted — fallback: ${req.title}`);
  }
  if (req.kind === 'info') req.onClose?.();
  else if (req.kind === 'confirm') req.onCancel?.();
  else if (req.kind === 'input') req.onCancel?.();
}

let nextId = 1;

export function DialogProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<DialogItem[]>([]);

  const push = useCallback((req: DialogRequest) => {
    const id = nextId; nextId += 1;
    setItems((prev) => [...prev, { ...req, id }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  useEffect(() => {
    globalPush = push;
    return () => { if (globalPush === push) globalPush = null; };
  }, [push]);

  // 단일 dialog at a time — top of stack 영역 render.
  const current = items.length > 0 ? items[items.length - 1] : null;

  return (
    <DialogContext.Provider value={{ push }}>
      {children}
      {current && (
        <DialogView
          key={current.id}
          item={current}
          onDismiss={() => dismiss(current.id)}
        />
      )}
    </DialogContext.Provider>
  );
}

function DialogView({ item, onDismiss }: { item: DialogItem; onDismiss: () => void }) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);
  const [inputValue, setInputValue] = useState<string>(item.defaultValue ?? '');
  // restore focus on close — open 직전 focused element catch.
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const handleConfirm = useCallback(() => {
    if (item.kind === 'info') item.onClose?.();
    else if (item.kind === 'confirm') item.onConfirm?.();
    else if (item.kind === 'input') item.onSubmit?.(inputValue);
    onDismiss();
  }, [item, inputValue, onDismiss]);

  const handleCancel = useCallback(() => {
    if (item.kind === 'info') item.onClose?.();
    else if (item.kind === 'confirm') item.onCancel?.();
    else if (item.kind === 'input') item.onCancel?.();
    onDismiss();
  }, [item, onDismiss]);

  // Mount: focus 영역 cancel button (확정 동작 회피 — confirm 영역 명시 키 path).
  // input kind 영역 input element focus + select default value.
  // info kind 영역 OK button 영역 single — confirm focus.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    }
    const raf = window.requestAnimationFrame(() => {
      if (item.kind === 'input' && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      } else if (item.kind === 'info' && confirmBtnRef.current) {
        confirmBtnRef.current.focus();
      } else if (cancelBtnRef.current) {
        cancelBtnRef.current.focus();
      }
    });
    return () => {
      window.cancelAnimationFrame(raf);
      // restore focus on unmount — accessibility (WCAG 2.4.3 Focus Order).
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === 'function' && document.contains(prev)) {
        try { prev.focus(); } catch { /* ignore */ }
      }
    };
  }, [item.kind]);

  // Keyboard: Escape close + Tab focus trap.
  // IME composition (한국어 입력 중) 영역 Escape skip — Toast 영역 정합.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (e.isComposing) return;
        e.preventDefault();
        handleCancel();
        return;
      }
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleCancel]);

  const titleId = `snn-dialog-title-${item.id}`;
  const descId = item.message ? `snn-dialog-desc-${item.id}` : undefined;

  const confirmLabel = item.confirmLabel ?? (item.kind === 'info' ? '확인' : item.kind === 'input' ? '저장' : '확인');
  const cancelLabel = item.cancelLabel ?? '취소';

  // prefers-reduced-motion 정합 — fade-in transition 영역 motion-safe 영역만.
  // tailwind 영역 'motion-safe:' prefix — utility path.
  return (
    <div
      className="snn-dialog-backdrop fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 p-4 motion-safe:animate-[snn-dialog-fade_120ms_ease-out]"
      onMouseDown={(e) => {
        // backdrop click — cancel. dialog 내부 click 영역 stop.
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="snn-dialog w-[min(420px,calc(100vw-32px))] rounded border border-white/15 bg-[#0f1117]/98 p-4 font-mono text-[12px] text-white/90 shadow-2xl backdrop-blur"
      >
        <h2 id={titleId} className="mb-2 text-[13px] font-semibold text-white">
          {item.title}
        </h2>
        {item.message && (
          <p id={descId} className="mb-3 whitespace-pre-wrap text-white/75">
            {item.message}
          </p>
        )}
        {item.kind === 'input' && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            placeholder={item.placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault();
                handleConfirm();
              }
            }}
            className="mb-3 w-full rounded border border-white/15 bg-black/40 px-2 py-1 text-white outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
          />
        )}
        <div className="flex justify-end gap-2">
          {item.kind !== 'info' && (
            <button
              ref={cancelBtnRef}
              type="button"
              onClick={handleCancel}
              className="rounded border border-white/15 bg-white/5 px-3 py-1 text-white/85 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
            >
              {cancelLabel}
            </button>
          )}
          <button
            ref={confirmBtnRef}
            type="button"
            onClick={handleConfirm}
            className="rounded border border-violet-300/40 bg-violet-500/30 px-3 py-1 text-white hover:bg-violet-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
