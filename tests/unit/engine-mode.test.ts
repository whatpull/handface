// engine-mode 단위 테스트 — localStorage persist + global event broadcast.
//
// Live 5차 (사용자 catch 2026-05-09): 'local' batch mode 폐기 — 'backend' /
// 'live' 2-mode 영역 narrow. default 영역 'live' (SNN 본질 정합).

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getEngineMode, setEngineMode } from '@/lib/snn/engine-mode';

describe('engine-mode', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('default 영역 live (localStorage 미설정 시 — Live 5차 정합)', () => {
    expect(getEngineMode()).toBe('live');
  });

  it('setEngineMode 영역 localStorage 영역 persist (backend)', () => {
    setEngineMode('backend');
    expect(getEngineMode()).toBe('backend');
    expect(window.localStorage.getItem('handface.engine-mode')).toBe('backend');
  });

  it('setEngineMode 영역 localStorage 영역 persist (live)', () => {
    setEngineMode('live');
    expect(getEngineMode()).toBe('live');
    expect(window.localStorage.getItem('handface.engine-mode')).toBe('live');
  });

  it('잘못된 localStorage 값 영역 live default', () => {
    window.localStorage.setItem('handface.engine-mode', 'garbage');
    expect(getEngineMode()).toBe('live');
  });

  it("'local' storage 값 영역 'backend' fallback (backward-compat)", () => {
    // 직전 Live 4차 이전 영역 'local' batch mode 영역 storage 영역 set 영역
    // 사용자 영역 'local' 영역 polluted catch — 학술 검증 path 정합 영역
    // 'backend' 영역 fallback (사용자 catch 2026-05-09).
    window.localStorage.setItem('handface.engine-mode', 'local');
    expect(getEngineMode()).toBe('backend');
  });

  it('setEngineMode 영역 CustomEvent emit', () => {
    const handler = vi.fn();
    window.addEventListener('handface.engine-mode-changed', handler);
    setEngineMode('backend');
    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toBe('backend');
    window.removeEventListener('handface.engine-mode-changed', handler);
  });
});
