// 사용자 catch 2026-05-12 ("alert → dialog"): Dialog component basic regression.
//
// 검증:
//   T1: info kind — single OK button + onClose called.
//   T2: confirm kind — Confirm/Cancel + onConfirm vs onCancel callback.
//   T3: ESC key — onCancel + dialog dismiss.
//   T4: backdrop click — onCancel + dialog dismiss.
//   T5: role=dialog + aria-modal + aria-labelledby + aria-describedby.
//   T6: Tab focus trap — last → first (wrap).
//   T7: input kind — submit value through onSubmit.

import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { DialogProvider, showDialog } from '@/components/ui/Dialog';

afterEach(() => {
  cleanup();
});

describe('Dialog — accessible modal (alert/confirm swap)', () => {
  it('T1: info kind renders single confirm button + onClose called', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    const onClose = vi.fn();
    act(() => {
      showDialog({ kind: 'info', title: '알림', message: '저장됨', onClose });
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('알림')).toBeInTheDocument();
    expect(screen.getByText('저장됨')).toBeInTheDocument();
    // info 영역 confirm 버튼 1개만 (cancel 버튼 0).
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(1);
    act(() => {
      fireEvent.click(buttons[0]);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    // dialog dismissed.
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('T2a: confirm kind — Confirm click invokes onConfirm', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    act(() => {
      showDialog({
        kind: 'confirm',
        title: '삭제',
        message: '계속?',
        confirmLabel: '삭제',
        cancelLabel: '취소',
        onConfirm,
        onCancel,
      });
    });
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '삭제' }));
    });
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('T2b: confirm kind — Cancel click invokes onCancel', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    act(() => {
      showDialog({
        kind: 'confirm',
        title: '삭제',
        confirmLabel: '삭제',
        cancelLabel: '취소',
        onConfirm,
        onCancel,
      });
    });
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '취소' }));
    });
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('T3: ESC key dismisses dialog + invokes onCancel', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    const onCancel = vi.fn();
    act(() => {
      showDialog({
        kind: 'confirm',
        title: '확인',
        onConfirm: () => undefined,
        onCancel,
      });
    });
    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('T4: backdrop mousedown invokes onCancel', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    const onCancel = vi.fn();
    act(() => {
      showDialog({
        kind: 'confirm',
        title: '확인',
        onConfirm: () => undefined,
        onCancel,
      });
    });
    // backdrop element 영역 fixed inset-0 영역 dialog parent.
    const backdrop = screen.getByRole('dialog').parentElement!;
    act(() => {
      fireEvent.mouseDown(backdrop, { target: backdrop });
    });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('T5: a11y attributes — role=dialog + aria-modal + labelledby + describedby', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    act(() => {
      showDialog({
        kind: 'info',
        title: '제목',
        message: '본문',
      });
    });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    const describedBy = dialog.getAttribute('aria-describedby');
    expect(labelledBy).toBeTruthy();
    expect(describedBy).toBeTruthy();
    // label / describe target 영역 실제 DOM 영역 존재.
    expect(document.getElementById(labelledBy!)!.textContent).toBe('제목');
    expect(document.getElementById(describedBy!)!.textContent).toBe('본문');
  });

  it('T6: Tab from last focusable wraps to first (focus trap)', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    act(() => {
      showDialog({
        kind: 'confirm',
        title: '확인',
        onConfirm: () => undefined,
        onCancel: () => undefined,
      });
    });
    const dialog = screen.getByRole('dialog');
    const buttons = dialog.querySelectorAll('button');
    const first = buttons[0] as HTMLElement;
    const last = buttons[buttons.length - 1] as HTMLElement;
    // focus last → Tab → expects first to receive focus.
    act(() => { last.focus(); });
    act(() => {
      fireEvent.keyDown(window, { key: 'Tab' });
    });
    expect(document.activeElement).toBe(first);
  });

  it('T7: input kind — Submit invokes onSubmit with current value', () => {
    render(<DialogProvider>{null}</DialogProvider>);
    const onSubmit = vi.fn();
    act(() => {
      showDialog({
        kind: 'input',
        title: '이름 입력',
        defaultValue: 'foo',
        confirmLabel: '저장',
        cancelLabel: '취소',
        onSubmit,
      });
    });
    const input = screen.getByDisplayValue('foo') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'bar' } });
    });
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '저장' }));
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('bar');
  });
});
