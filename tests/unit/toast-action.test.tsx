// F4 UX polish (2, 2026-05-11): Toast action button regression.
//
// 검증:
//   T1: showToast({ action }) — toast 영역 action button 영역 render (label).
//   T2: action click → onClick callback 1회 + toast dismiss (queue 영역 제거).
//   T3: action 미지정 영역 button render 0 (직전 dismiss '✕' button 영역 보존).

import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider, showToast } from '@/components/ui/Toast';

afterEach(() => {
  cleanup();
});

describe('Toast — action button (F4 UX polish 2)', () => {
  it('T1: renders action button with given label', () => {
    render(<ToastProvider>{null}</ToastProvider>);
    act(() => {
      showToast({
        kind: 'success',
        message: '신규 cluster 형성',
        action: { label: '이름 짓기', onClick: () => undefined },
      });
    });
    expect(screen.getByRole('button', { name: '이름 짓기' })).toBeInTheDocument();
  });

  it('T2: action click invokes callback once + dismisses toast', () => {
    render(<ToastProvider>{null}</ToastProvider>);
    const onClick = vi.fn();
    act(() => {
      showToast({
        kind: 'success',
        message: 'cluster spawned',
        duration: 0, // manual dismiss only — auto fade 영역 race 회피.
        action: { label: '이름 짓기', onClick },
      });
    });
    const btn = screen.getByRole('button', { name: '이름 짓기' });
    act(() => {
      fireEvent.click(btn);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    // toast 영역 dismissed — action button 영역 DOM 영역 제거.
    expect(screen.queryByRole('button', { name: '이름 짓기' })).toBeNull();
  });

  it('T3: no action button when action prop omitted', () => {
    render(<ToastProvider>{null}</ToastProvider>);
    act(() => {
      showToast({ kind: 'info', message: 'plain toast' });
    });
    // dismiss '✕' button 영역 보존 — Dismiss notification aria-label 영역 catch.
    expect(screen.getByLabelText('Dismiss notification')).toBeInTheDocument();
    // action label 영역 0 (button count 영역 dismiss 1개만).
    const allButtons = screen.getAllByRole('button');
    expect(allButtons.length).toBe(1);
  });
});
