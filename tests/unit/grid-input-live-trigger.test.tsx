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
// G3: preset apply button (Live) 영역 본격 폐기 — render 0 (PR-L 사용자 catch 2026-05-10 자율 학습).
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
    const pixels = screen.getAllByRole('button', { name: /^픽셀 \d+/ });
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
    const pixels = screen.getAllByRole('button', { name: /^픽셀 \d+/ });
    fireEvent.click(pixels[0]);
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockSetPattern).not.toHaveBeenCalled();
    expect(mockInferAsync).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
  });

  it('G3: preset apply button (Live) 영역 본격 폐기 — render 0 (PR-L 사용자 catch 2026-05-10 자율 학습)', async () => {
    // PR-L (사용자 catch 2026-05-10): "INPUT node의 패턴 선택은 없어져도
    // 괜찮을것 같아요(자율 학습)". Live 모드 영역 preset apply button × 4 영역
    // 본격 폐기 — 사용자 영역 4×4 grid 영역 직접 그림 영역 자율 학습 path 영역
    // 정합. 추론 button 영역 ART unsupervised auto-learn 영역 단일 trigger.
    render(<GridInput />);
    // preset apply button (직전 aria-label /preset apply — 패턴 set only/) 영역 0.
    const presetBtns = screen.queryAllByRole('button', { name: /preset apply/ });
    expect(presetBtns).toHaveLength(0);
    // 사용자 catch 2026-05-09 catch 1: cluster 별 학습 button × 4 영역도 0 (PR-K 폐기 보존).
    const trainBtns = screen.queryAllByRole('button', { name: /학습 \d/ });
    expect(trainBtns).toHaveLength(0);
    // setPattern 영역 grid state effect 영역 1회 sync (mount 시점) — preset trigger 0.
    expect(mockReinforce).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
  });

  it('G4: pixel click × 3 → triggerOnce 호출 0 (사용자 catch A1 root fix)', async () => {
    render(<GridInput />);
    const pixels = screen.getAllByRole('button', { name: /^픽셀 \d+/ });
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
    // isGridEmpty() early-return 방지 — 픽셀 1개 이상 on 상태여야 triggerWithVigilance
    // 까지 도달. pixel 0 클릭 → grid[0] = 1 (non-empty).
    const pixels = screen.getAllByRole('button', { name: /^픽셀 \d+/ });
    fireEvent.click(pixels[0]);
    const inferBtn = screen.getByRole('button', { name: /추론 — STDP off/ });
    fireEvent.click(inferBtn);
    await Promise.resolve();
    // 사용자 catch 2026-05-12 (exact-equality-vigilance):
    //   "완벽하게 일치하는 패턴 인식 - 조금이라도 다르면 다른 패턴으로 인식".
    // worker-core computeExactInputMatch 영역 binary {0.0, 1.0} 산출 정합 영역
    // threshold 1.0 strict (Carpenter-Grossberg ART ρ=1.0). 폐기: PR #233 (0.5
    // Fuzzy ART) + PR #235 (Tversky size_penalty).
    expect(mockTriggerWithVigilance).toHaveBeenCalledTimes(1);
    expect(mockTriggerWithVigilance).toHaveBeenCalledWith(expect.any(Array), 1.0);
    // 직전 inferAsync 영역 caller 폐기 — main path 영역 triggerWithVigilance 영역 단일.
    expect(mockInferAsync).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
    expect(mockSetPattern).toHaveBeenCalled();
  });
});
