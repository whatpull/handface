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
// O2: 동일 winner 연속 — idempotent (call count 1 유지, lastWinner gate).
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
    kind: 'orientation' as const,
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
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_0_0', expect.any(Array));
    snn.dispose();
  });

  it('O2: 동일 winner 연속 — lastWinner gate 영역 idempotent (call count 1 유지)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
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
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_1_0', expect.any(Array));
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
    snn.setPattern(new Array(16).fill(0));
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1); // 미증가.
    snn.dispose();
  });

  it('O5: feature snapshot 영역 increment 호출 영역 동일 array (lastFeature 정합)', async () => {
    const snn = new LiveSnn();
    const pattern = [1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    snn.setPattern(pattern);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    const [, feature] = mocks.mockIncrementCount.mock.calls[0];
    expect(feature).toEqual(pattern);
    snn.dispose();
  });
});
