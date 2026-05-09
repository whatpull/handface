// engine-mode 단위 테스트 — localStorage persist + global event broadcast.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getEngineMode, setEngineMode } from '@/lib/snn/engine-mode';

describe('engine-mode', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('default 영역 backend (localStorage 미설정 시)', () => {
    expect(getEngineMode()).toBe('backend');
  });

  it('setEngineMode 영역 localStorage 영역 persist', () => {
    setEngineMode('local');
    expect(getEngineMode()).toBe('local');
    expect(window.localStorage.getItem('handface.engine-mode')).toBe('local');
  });

  it('잘못된 localStorage 값 영역 backend default', () => {
    window.localStorage.setItem('handface.engine-mode', 'garbage');
    expect(getEngineMode()).toBe('backend');
  });

  it("'live' 모드 영역 valid", () => {
    setEngineMode('live');
    expect(getEngineMode()).toBe('live');
  });

  it('setEngineMode 영역 CustomEvent emit', () => {
    const handler = vi.fn();
    window.addEventListener('handface.engine-mode-changed', handler);
    setEngineMode('local');
    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toBe('local');
    window.removeEventListener('handface.engine-mode-changed', handler);
  });
});
