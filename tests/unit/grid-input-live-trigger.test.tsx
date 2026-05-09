// GridInput — Live mode 영역 1-shot trigger 검증 (사용자 catch 2026-05-09 B).
//
// G1: pixel toggle 영역 Live mode → live.setPattern + triggerOnce 1회.
// G2: pixel toggle Backend mode → live API 0 호출 (engineMode='backend').
// G3: applyPreset 영역 Live mode → live.setPattern + triggerOnce 1회.
// G4: 다 클릭 × 3 — triggerOnce 3회 (사용자 명시 1-shot 정합).

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';

// ── live-snn mock ──
const mockSetPattern = vi.fn();
const mockTriggerOnce = vi.fn(async () => ({ saveFailed: false }));
const mockReinforce = vi.fn(async () => ({ saveFailed: false }));

vi.mock('@/lib/snn/live-snn', () => ({
  getLiveSnn: vi.fn(() => ({
    setPattern: mockSetPattern,
    triggerOnce: mockTriggerOnce,
    reinforce: mockReinforce,
  })),
}));

// ── engine-mode mock — engineMode 영역 'live' 또는 'backend' toggle. ──
const mockUseEngineMode = vi.fn<() => [string, ReturnType<typeof vi.fn>]>(() => ['live', vi.fn()]);
vi.mock('@/lib/snn/engine-mode', () => ({
  useEngineMode: () => mockUseEngineMode(),
}));

// ── backend events mock — emit/onBackendEvent 영역 stub. ──
vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: vi.fn(),
  onBackendEvent: vi.fn(() => () => undefined),
}));

// ── backend client mock — Backend mode 영역 호출 path 영역 stub. ──
vi.mock('@/lib/backend/client', () => ({
  getClient: vi.fn(() => ({
    presetOrientation: vi.fn(async () => ({ ok: true, data: {} })),
    clusterTrainRStdp: vi.fn(async () => ({ ok: true, data: { correct: 0, trained: 0 } })),
    injectPattern: vi.fn(async () => ({ ok: true, data: { winner_cluster: null } })),
  })),
}));

import GridInput from '@/components/snn/pipeline/GridInput';

describe('GridInput — event-driven 1-shot trigger (Live mode)', () => {
  beforeEach(() => {
    mockSetPattern.mockClear();
    mockTriggerOnce.mockClear();
    mockReinforce.mockClear();
    mockUseEngineMode.mockReturnValue(['live', vi.fn()]);
  });

  afterEach(() => {
    cleanup();
  });

  it('G1: pixel toggle 영역 Live mode → setPattern + triggerOnce 1회', async () => {
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    expect(pixels).toHaveLength(16);
    fireEvent.click(pixels[0]);
    // setPattern 영역 즉시 호출 + useEffect [grid] sync 영역 1회 영역 — 합 2회 catch 정합.
    expect(mockSetPattern).toHaveBeenCalled();
    expect(mockTriggerOnce).toHaveBeenCalledTimes(1);
  });

  it('G2: pixel toggle Backend mode → live API 0 호출', async () => {
    mockUseEngineMode.mockReturnValue(['backend', vi.fn()]);
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    fireEvent.click(pixels[0]);
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    // setPattern 영역 useEffect [engineMode, grid] 영역 backend mode 영역 early
    // return 영역 0 호출.
    expect(mockSetPattern).not.toHaveBeenCalled();
  });

  it('G3: applyPreset 영역 Live mode → setPattern + triggerOnce 1회', async () => {
    render(<GridInput />);
    // preset button 영역 'cluster 0' label catch (title='horizontal').
    const presetBtns = screen.getAllByRole('button', { name: /cluster 0/i });
    // 첫 번째 영역 preset apply button (snn-grid-preset-btn).
    fireEvent.click(presetBtns[0]);
    expect(mockSetPattern).toHaveBeenCalled();
    expect(mockTriggerOnce).toHaveBeenCalledTimes(1);
  });

  it('G4: pixel click × 3 → triggerOnce 3회 (1-shot 누적)', async () => {
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    fireEvent.click(pixels[0]);
    fireEvent.click(pixels[1]);
    fireEvent.click(pixels[2]);
    expect(mockTriggerOnce).toHaveBeenCalledTimes(3);
  });
});
