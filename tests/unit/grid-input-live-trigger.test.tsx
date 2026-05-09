// GridInput — Live mode 영역 명시 trigger 검증 (PR-A architecture pivot 2026-05-09).
//
// 직전 (PR #184): pixel/preset click → triggerOnce 1-shot (auto-on-click).
// 본 정정 (PR-A 사용자 catch A1): pixel/preset click → setPattern only.
//   학습/추론 trigger 영역 명시 button 영역 한정 (사용자 명시):
//     - "추론" button 영역 click → inferOnce (stdpGain=0, 가중치 변경 0)
//     - "현재 패턴 보강" button 영역 click → reinforce (R-STDP supervised)
//
// G1: pixel toggle 영역 Live mode → setPattern only — triggerOnce 호출 0.
// G2: pixel toggle Backend mode → live API 0 호출 (engineMode='backend').
// G3: applyPreset 영역 Live mode → setPattern only — triggerOnce 호출 0.
// G4: pixel click × 3 → triggerOnce 호출 0 (사용자 catch A1 root fix).
// G5: '추론' button click 영역 Live mode → inferOnce 1회 (명시 trigger).
// G6: '현재 패턴 보강' button click 영역 Live mode → reinforce(targetCluster) 1회.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';

// ── live-snn mock ──
const mockSetPattern = vi.fn();
const mockTriggerOnce = vi.fn(async () => ({ saveFailed: false }));
const mockReinforce = vi.fn(async () => ({ saveFailed: false }));
const mockInferOnce = vi.fn(async () => ({ saveFailed: false }));

vi.mock('@/lib/snn/live-snn', () => ({
  getLiveSnn: vi.fn(() => ({
    setPattern: mockSetPattern,
    triggerOnce: mockTriggerOnce,
    reinforce: mockReinforce,
    inferOnce: mockInferOnce,
  })),
}));

// ── root-local-snn mock — Step 4 학습 reset path 영역 stub. ──
vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    client: { resetClusterWeights: vi.fn(async () => ({ neurons: 0, synapses: 0, preset: 'n13' })) },
    lab: { save: vi.fn(async () => 1) },
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

describe('GridInput — PR-A architecture pivot (사용자 catch 2026-05-09 A1)', () => {
  beforeEach(() => {
    mockSetPattern.mockClear();
    mockTriggerOnce.mockClear();
    mockReinforce.mockClear();
    mockInferOnce.mockClear();
    mockUseEngineMode.mockReturnValue(['live', vi.fn()]);
  });

  afterEach(() => {
    cleanup();
  });

  it('G1: pixel toggle 영역 Live mode → setPattern only (triggerOnce 호출 0)', async () => {
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    expect(pixels).toHaveLength(16);
    fireEvent.click(pixels[0]);
    // 사용자 catch A1: pixel click 영역 학습 trigger 영역 본격 폐기 — setPattern only.
    expect(mockSetPattern).toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockReinforce).not.toHaveBeenCalled();
  });

  it('G2: pixel toggle Backend mode → live API 0 호출', async () => {
    mockUseEngineMode.mockReturnValue(['backend', vi.fn()]);
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    fireEvent.click(pixels[0]);
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockSetPattern).not.toHaveBeenCalled();
  });

  it('G3: applyPreset 영역 Live mode → setPattern only (triggerOnce 호출 0)', async () => {
    render(<GridInput />);
    const presetBtns = screen.getAllByRole('button', { name: /cluster 0/i });
    fireEvent.click(presetBtns[0]);
    expect(mockSetPattern).toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
  });

  it('G4: pixel click × 3 → triggerOnce 호출 0 (사용자 catch A1 root fix)', async () => {
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    fireEvent.click(pixels[0]);
    fireEvent.click(pixels[1]);
    fireEvent.click(pixels[2]);
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    // setPattern 영역 매 click 영역 호출 — Live runtime 영역 다음 추론 영역 stale 방지.
    expect(mockSetPattern.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it('G5: 추론 button click 영역 Live mode → inferOnce 1회 (명시 trigger)', async () => {
    render(<GridInput />);
    const inferBtn = screen.getByRole('button', { name: /^추론$/ });
    fireEvent.click(inferBtn);
    // 비동기 inferOnce 영역 microtask 영역 wait.
    await Promise.resolve();
    expect(mockInferOnce).toHaveBeenCalledTimes(1);
    // setPattern 영역 추론 직전 영역 1회 — runInferLive 영역 명시 setPattern.
    expect(mockSetPattern).toHaveBeenCalled();
  });

  it('G6: 현재 패턴 보강 button click → reinforce(targetCluster, 2.0) 1회', async () => {
    render(<GridInput />);
    // '현재 패턴 보강' button — cluster row 영역 Live mode 영역 라벨.
    const reinforceBtns = screen.getAllByRole('button', { name: /^현재 패턴 보강$/ });
    expect(reinforceBtns).toHaveLength(4);
    fireEvent.click(reinforceBtns[1]); // cluster 1 (vertical).
    await Promise.resolve();
    expect(mockReinforce).toHaveBeenCalledTimes(1);
    expect(mockReinforce).toHaveBeenCalledWith(1, 2.0);
  });
});
