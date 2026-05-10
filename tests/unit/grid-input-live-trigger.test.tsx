// GridInput — Live mode 영역 명시 trigger 검증 (PR-K architectural pivot 2026-05-09).
//
// 사용자 catch 2026-05-09 catch 1: 학습 button × 4 본격 폐기 + 추론 button
// 영역 ART unsupervised auto-learn (triggerWithVigilance) 영역 단일 path swap.
//
// 직전 (PR-J): cluster 별 학습 button × 4 — Live mode 영역 reinforceAsync(ci, 0.8) 호출.
// 본 정정 (PR-K): cluster 학습 button × 4 + reinforceAsync caller 폐기 →
//   - 추론 button 영역 click → triggerWithVigilance(grid, 0.15) — ART vigilance.
//   - cluster row 영역 preset apply only (setPattern, 학습 0).
//
// G1: pixel toggle 영역 Live mode → setPattern only — triggerOnce 호출 0.
// G2: pixel toggle Backend mode → live API 0 호출 (engineMode='backend').
// G3: preset apply button (Live) → setPattern only — reinforce 호출 0 (PR-K 폐기 path).
// G4: pixel click × 3 → triggerOnce 호출 0 (사용자 catch A1 root fix).
// G5: 추론 button click 영역 Live mode → triggerWithVigilance 1회 (PR-K ART path).

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';

// ── live-snn mock ──
const mockSetPattern = vi.fn();
const mockTriggerOnce = vi.fn(async () => ({ saveFailed: false }));
const mockReinforce = vi.fn(async () => ({ saveFailed: false }));
const mockInferOnce = vi.fn(async () => ({ saveFailed: false }));
// PR-B (Web Worker background offload, 2026-05-10): fire-and-forget API mock.
let mockTrialTokenSeq = 0;
const mockTriggerAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));
const mockInferAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));
const mockReinforceAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));
// PR-K (사용자 catch 2026-05-09 catch 1): triggerWithVigilance — ART
// unsupervised auto-learn 영역 단일 trigger path. sync return `{ trialToken }`.
const mockTriggerWithVigilance = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));

vi.mock('@/lib/snn/live-snn', () => ({
  getLiveSnn: vi.fn(() => ({
    setPattern: mockSetPattern,
    triggerOnce: mockTriggerOnce,
    reinforce: mockReinforce,
    inferOnce: mockInferOnce,
    triggerAsync: mockTriggerAsync,
    inferAsync: mockInferAsync,
    reinforceAsync: mockReinforceAsync,
    triggerWithVigilance: mockTriggerWithVigilance,
  })),
  onLiveTick: vi.fn(() => () => undefined),
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

describe('GridInput — PR-K architectural pivot (사용자 catch 2026-05-09 catch 1)', () => {
  beforeEach(() => {
    mockSetPattern.mockClear();
    mockTriggerOnce.mockClear();
    mockReinforce.mockClear();
    mockInferOnce.mockClear();
    mockTriggerAsync.mockClear();
    mockInferAsync.mockClear();
    mockReinforceAsync.mockClear();
    mockTriggerWithVigilance.mockClear();
    mockTrialTokenSeq = 0;
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
    expect(mockSetPattern).toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockReinforce).not.toHaveBeenCalled();
    expect(mockTriggerAsync).not.toHaveBeenCalled();
    expect(mockInferAsync).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
  });

  it('G2: pixel toggle Backend mode → live API 0 호출', async () => {
    mockUseEngineMode.mockReturnValue(['backend', vi.fn()]);
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    fireEvent.click(pixels[0]);
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockSetPattern).not.toHaveBeenCalled();
    expect(mockInferAsync).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
  });

  it('G3: preset apply button (Live) → setPattern only — reinforce 호출 0 (PR-K 폐기 path)', async () => {
    // PR-K (사용자 catch 2026-05-09 catch 1): cluster 별 학습 button × 4 본격
    // 폐기 — Live 모드 영역 preset row 영역 [preset apply] only (setPattern,
    // 학습 0). 학습 trigger 영역 추론 button (triggerWithVigilance) 영역 단일.
    render(<GridInput />);
    const presetBtns = screen.getAllByRole('button', { name: /preset apply — 패턴 set only$/ });
    expect(presetBtns).toHaveLength(4);
    fireEvent.click(presetBtns[0]); // horizontal preset apply.
    await Promise.resolve();
    expect(mockSetPattern).toHaveBeenCalled();
    // PR-K: reinforce / reinforceAsync caller 0 — preset apply 영역 학습 trigger 0.
    expect(mockReinforce).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
  });

  it('G4: pixel click × 3 → triggerOnce 호출 0 (사용자 catch A1 root fix)', async () => {
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^pixel \d+/ });
    fireEvent.click(pixels[0]);
    fireEvent.click(pixels[1]);
    fireEvent.click(pixels[2]);
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockTriggerAsync).not.toHaveBeenCalled();
    expect(mockInferAsync).not.toHaveBeenCalled();
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
    expect(mockSetPattern.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it('G5: 추론 button click 영역 Live mode → triggerWithVigilance 1회 (PR-K ART path)', async () => {
    // PR-K (사용자 catch 2026-05-09 catch 1): 추론 button 영역 click → ART
    // unsupervised auto-learn 영역 단일 path. inferAsync (STDP off) → vigilance
    // 영역 비교 → novel 시점 영역 30 trial chunked reinforce 영역 자동 trigger
    // (worker push event 영역 별도 emit).
    render(<GridInput />);
    const inferBtn = screen.getByRole('button', { name: /추론 — STDP off/ });
    fireEvent.click(inferBtn);
    await Promise.resolve();
    // PR-K: triggerWithVigilance 영역 단일 trigger (default vigilance 0.15).
    expect(mockTriggerWithVigilance).toHaveBeenCalledTimes(1);
    expect(mockTriggerWithVigilance).toHaveBeenCalledWith(expect.any(Array), 0.15);
    // 직전 inferAsync 영역 caller 폐기 — main path 영역 triggerWithVigilance 영역 단일.
    expect(mockInferAsync).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
    expect(mockSetPattern).toHaveBeenCalled();
  });
});
