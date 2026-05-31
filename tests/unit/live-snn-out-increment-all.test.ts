// PR-E (사용자 catch 2026-05-09 "한번 추론에 8개씩 증가"): emitTick 영역
// 단일 representative neuron 영역 increment 검증.
//
// 직전 PR #194 (QA FINDING-2): cluster broadcast supervisor 정합 영역 8 OUT
// 모두 increment — backend weight learning semantic 영역 정합 의도 영역 — UI
// exemplar count 영역 별도 path 영역 trial-counter semantic 영역 mismatch
// (1 trigger → +8 cluster count). 사용자 catch 영역 visual root 영역 정합.
//
// 정정 (PR-E): cluster representative neuron (out_${winner}_0) 영역 단일
// increment 영역 trial-counter UI semantic 정합. NodeOut 영역 sumClusterCount
// helper 영역 8 OUT 합산 영역 — 1 representative 영역 trial 횟수 정합.
//
// 정직 한계: backend STDP weight update path 영역 worker-core.ts
// handleClusterTrainRStdp 영역 8 OUT 영역 보존 — 본 정정 영역 UI count path 영역
// 단일 catch.
//
// O1: triggerOnce 영역 winner=0 → out_0_0 영역 1회 increment.
// O2: 동일 winner 3회 연속 — 매 trigger 영역 +1 (call count 3).
//     사용자 catch 2026-05-12 (increment-per-trigger): idempotent gate 폐기 —
//     사용자 mental model "매 추론 +1" 영역 정합.
// O3: winner 변경 — 새 cluster 영역 representative 영역 추가 (총 2).
// O4: silent (winner=-1) — increment 호출 0.
// O5: feature snapshot 영역 increment 호출 영역 동일 array (lastFeature 정합).

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const mockInject = vi.fn(async () => undefined);
  const mockRun = vi.fn(async () => ({ ok: true, t: 0 }));
  const mockClusterFiringRates = vi.fn(async () => ({
    rates: [12, 0, 0, 0],
    winner: 0,
    share: 1.0,
    margin: 1.0,
    layer: 'OUT' as const,
  }));
  const mockSave = vi.fn(async () => 1);
  const mockIncrementCount = vi.fn();
  const mockGetNetworkTime = vi.fn(async () => 0);
  const mockResetHomeostatic = vi.fn(async () => null);
  const mockRegionFiringRates = vi.fn(async () => ({
    region: 'V1' as const,
    hz: 0,
    neuronCount: 0,
    firingCount: 0,
  }));
  const emittedEvents: Array<{ name: string; detail: unknown }> = [];
  const emitBackendEvent = vi.fn((name: string, detail: unknown) => {
    emittedEvents.push({ name, detail });
  });
  const onBackendEvent = vi.fn(() => () => undefined);
  return {
    mockInject,
    mockRun,
    mockClusterFiringRates,
    mockSave,
    mockIncrementCount,
    mockGetNetworkTime,
    mockResetHomeostatic,
    mockRegionFiringRates,
    emittedEvents,
    emitBackendEvent,
    onBackendEvent,
  };
});

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    client: {
      inject: mocks.mockInject,
      run: mocks.mockRun,
      clusterFiringRates: mocks.mockClusterFiringRates,
      getNetworkTime: mocks.mockGetNetworkTime,
      resetHomeostatic: mocks.mockResetHomeostatic,
      regionFiringRates: mocks.mockRegionFiringRates,
    },
    lab: { save: mocks.mockSave },
    status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind: 'orientation-5x5' as const,
  })),
}));

vi.mock('@/lib/snn/out-exemplars', () => ({
  incrementCount: mocks.mockIncrementCount,
}));

vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: mocks.emitBackendEvent,
  onBackendEvent: mocks.onBackendEvent,
}));

import { LiveSnn } from '@/lib/snn/live-snn';

beforeEach(() => {
  mocks.mockInject.mockClear();
  mocks.mockRun.mockClear();
  mocks.mockClusterFiringRates.mockReset();
  mocks.mockClusterFiringRates.mockResolvedValue({
    rates: [12, 0, 0, 0],
    winner: 0,
    share: 1.0,
    margin: 1.0,
    layer: 'OUT',
  });
  mocks.mockSave.mockClear();
  mocks.mockIncrementCount.mockClear();
  mocks.mockGetNetworkTime.mockClear();
  mocks.mockResetHomeostatic.mockClear();
  mocks.mockRegionFiringRates.mockClear();
  mocks.emittedEvents.length = 0;
});

afterEach(() => {
  // noop — 각 test 영역 dispose.
});

describe('LiveSnn — single representative neuron incrementCount (PR-E 2026-05-09)', () => {
  it('O1: winner=0 → out_0_0 영역 1회 increment (trial-counter UI semantic)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    // 사용자 catch 2026-05-09 (Fix 1): substrate-aware signature.
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_0_0', 'orientation-5x5', expect.any(Array));
    snn.dispose();
  });

  it('O2: 동일 winner 3회 연속 — 매 trigger +1 (call count 3, increment-per-trigger 2026-05-12)', async () => {
    // 사용자 catch 2026-05-12 (increment-per-trigger): "왜 out 노드의 패턴N의
    // 카운트가 정확히 안늘어날까요? (추론에서는 적용됨)". 직전 idempotent gate
    // (cfr.winner !== lastWinnerCluster) 영역 동일 winner 연속 trigger 영역 skip
    // → 사용자 mental model "매 추론 +1" mismatch. 정정: 매 valid winner trigger
    // 영역 +1. 동일 input × 3회 → cluster 0 count = 3.
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(2);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(3);
    // 3 calls 모두 동일 outKey (out_0_0) + substrate (orientation).
    for (let i = 0; i < 3; i += 1) {
      expect(mocks.mockIncrementCount.mock.calls[i][0]).toBe('out_0_0');
      expect(mocks.mockIncrementCount.mock.calls[i][1]).toBe('orientation-5x5');
    }
    snn.dispose();
  });

  it('O2b: 동일 input × 3 + 다른 input × 1 — cluster 0 count = 3, cluster 1 count = 1', async () => {
    // 사용자 catch 2026-05-12 regression scenario: 동일 input 3회 + 다른 input 1회
    // 영역 mock 시나리오 — count semantic 정합 verification.
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    await snn.triggerOnce({ force: true });
    await snn.triggerOnce({ force: true });
    // cluster 0 영역 3회 increment.
    const cluster0Calls = mocks.mockIncrementCount.mock.calls.filter(
      (c) => c[0] === 'out_0_0',
    );
    expect(cluster0Calls).toHaveLength(3);

    // 다른 input (winner=1) 1회.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 12, 0, 0],
      winner: 1,
      share: 1.0,
      margin: 1.0,
      layer: 'OUT',
    });
    await snn.triggerOnce({ force: true });
    const cluster1Calls = mocks.mockIncrementCount.mock.calls.filter(
      (c) => c[0] === 'out_1_0',
    );
    expect(cluster1Calls).toHaveLength(1);
    // total = 4.
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(4);
    snn.dispose();
  });

  it('O3: winner 변경 — 새 cluster 영역 representative 추가 (총 2)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // winner 변경 → cluster 1 영역 representative 추가.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 12, 0, 0],
      winner: 1,
      share: 1.0,
      margin: 1.0,
      layer: 'OUT',
    });
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(2);
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_1_0', 'orientation-5x5', expect.any(Array));
    snn.dispose();
  });

  it('O4: silent (winner=-1) — incrementCount 호출 0 + lastWinner reset', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // silent — increment 0.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 0, 0, 0],
      winner: -1,
      share: 0,
      margin: 0,
      layer: 'OUT',
    });
    snn.setPattern(new Array(25).fill(0));
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1); // 미증가.
    snn.dispose();
  });

  it('O5: feature snapshot 영역 increment 호출 영역 동일 array (lastFeature 정합)', async () => {
    const snn = new LiveSnn();
    // P218 (substrate upgrade): 5×5 raw-dim (25) — pattern semantics 보존 영역
    // 4×4 source [1,0,1,0, 1,1,1,1, ...] 영역 등가 5×5 cluster row 0 (col 0,2)
    // + row 1 (col 0..4) 영역 확장.
    const pattern = [1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    snn.setPattern(pattern);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    // 사용자 catch 2026-05-09 (Fix 1): substrate-aware signature —
    // call 영역 (outKey, substrate, feature) 영역 [2] 영역 feature.
    const [, , feature] = mocks.mockIncrementCount.mock.calls[0];
    expect(feature).toEqual(pattern);
    snn.dispose();
  });
});
