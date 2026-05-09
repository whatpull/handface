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
// PR-B (Web Worker background offload, 2026-05-10): fire-and-forget API mock.
// triggerAsync / inferAsync / reinforceAsync 영역 sync return `{ trialToken }` —
// callsite 영역 await 0. 본 mock 영역 동일 sync return semantics.
let mockTrialTokenSeq = 0;
const mockTriggerAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));
const mockInferAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));
const mockReinforceAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));

vi.mock('@/lib/snn/live-snn', () => ({
  getLiveSnn: vi.fn(() => ({
    setPattern: mockSetPattern,
    triggerOnce: mockTriggerOnce,
    reinforce: mockReinforce,
    inferOnce: mockInferOnce,
    triggerAsync: mockTriggerAsync,
    inferAsync: mockInferAsync,
    reinforceAsync: mockReinforceAsync,
  })),
  // PR #192 polish (UX-3 token-aware reset): onLiveTick 영역 LiveTickDetail
  // listener export. test 영역 noop unsubscribe — push event emit 0 영역 본
  // test 영역 listener wire path 영역 무관 (button click 영역 callback 호출
  // 검증 only).
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

describe('GridInput — PR-A architecture pivot (사용자 catch 2026-05-09 A1)', () => {
  beforeEach(() => {
    mockSetPattern.mockClear();
    mockTriggerOnce.mockClear();
    mockReinforce.mockClear();
    mockInferOnce.mockClear();
    mockTriggerAsync.mockClear();
    mockInferAsync.mockClear();
    mockReinforceAsync.mockClear();
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
    // 사용자 catch A1: pixel click 영역 학습 trigger 영역 본격 폐기 — setPattern only.
    expect(mockSetPattern).toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockReinforce).not.toHaveBeenCalled();
    // PR-B: async API 영역 호출 0 — pixel click 영역 명시 trigger 0 정합 보존.
    expect(mockTriggerAsync).not.toHaveBeenCalled();
    expect(mockInferAsync).not.toHaveBeenCalled();
    expect(mockReinforceAsync).not.toHaveBeenCalled();
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
  });

  it('G3: applyPreset 영역 Live mode → setPattern only (triggerOnce 호출 0)', async () => {
    render(<GridInput />);
    const presetBtns = screen.getAllByRole('button', { name: /cluster 0/i });
    fireEvent.click(presetBtns[0]);
    expect(mockSetPattern).toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    expect(mockInferOnce).not.toHaveBeenCalled();
    expect(mockInferAsync).not.toHaveBeenCalled();
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
    // setPattern 영역 매 click 영역 호출 — Live runtime 영역 다음 추론 영역 stale 방지.
    expect(mockSetPattern.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it('G5: 추론 button click 영역 Live mode → inferAsync 1회 (PR-B fire-and-forget)', async () => {
    render(<GridInput />);
    // PR #191 polish (UX-6, 2026-05-10): 추론 button 영역 aria-label 'STDP off,
    // 가중치 변경 0' 영역 명시 — accessible name override.
    const inferBtn = screen.getByRole('button', { name: /추론 — STDP off/ });
    fireEvent.click(inferBtn);
    // PR-B (Web Worker background offload): inferAsync 영역 sync return —
    // microtask wait 영역 미필요 단 React state batch 영역 정합 catch 영역 await.
    await Promise.resolve();
    // PR-B: inferOnce 영역 await 영역 별도 path 영역 inferAsync 영역 swap.
    expect(mockInferAsync).toHaveBeenCalledTimes(1);
    expect(mockInferOnce).not.toHaveBeenCalled();
    // setPattern 영역 추론 직전 영역 1회 — runInferLive 영역 명시 setPattern.
    expect(mockSetPattern).toHaveBeenCalled();
  });

  it('G6: 현재 패턴 보강 button click → reinforceAsync(targetCluster, 0.8) 1회 (PR-B fire-and-forget)', async () => {
    render(<GridInput />);
    // PR #191 polish (UX-6, 2026-05-10): cluster N 보강 button 영역 aria-label
    // 'cluster N 현재 패턴 보강 — supervised R-STDP' 영역 명시 정합 query.
    const reinforceBtns = screen.getAllByRole('button', {
      name: /현재 패턴 보강 — supervised R-STDP$/,
    });
    expect(reinforceBtns).toHaveLength(4);
    fireEvent.click(reinforceBtns[1]); // cluster 1 (vertical).
    await Promise.resolve();
    // PR-B: reinforce 영역 await path 영역 reinforceAsync 영역 swap.
    // QA CAUSE D fix (2026-05-10): 2.0 → 0.8 — saturation overshoot 회피.
    expect(mockReinforceAsync).toHaveBeenCalledTimes(1);
    expect(mockReinforceAsync).toHaveBeenCalledWith(1, 0.8);
    expect(mockReinforce).not.toHaveBeenCalled();
  });
});
