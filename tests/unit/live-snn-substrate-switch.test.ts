// LiveSnn — setSubstrate 영역 trial / lastWinner / patternRef 영역 reset 검증 (Fix 2).
//
// 사용자 catch 2026-05-09 [1]: GRID winner 영역 CAMERA tick 영역 carry-over —
// substrate switch 영역 trial / winner state 영역 reset 0 영역 root cause.
//
// SS1: setSubstrate(다른 kind) — trialCount 영역 0, lastWinnerCluster 영역 -1,
//      patternRef 영역 zeros.
// SS2: 같은 kind 영역 setSubstrate — early return, state 영역 보존.
// SS3: setSubstrate 후 incrementCount 영역 새 substrate 영역 store.

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
  const onBackendEvent = vi.fn(() => () => undefined);
  const emittedEvents: Array<{ name: string; detail: unknown }> = [];
  const emitBackendEvent = vi.fn((name: string, detail: unknown) => {
    emittedEvents.push({ name, detail });
  });
  return {
    mockInject,
    mockRun,
    mockClusterFiringRates,
    mockSave,
    mockIncrementCount,
    mockGetNetworkTime,
    mockResetHomeostatic,
    mockRegionFiringRates,
    onBackendEvent,
    emittedEvents,
    emitBackendEvent,
  };
});

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async (kind: string) => ({
    client: {
      inject: mocks.mockInject,
      run: mocks.mockRun,
      clusterFiringRates: mocks.mockClusterFiringRates,
      getNetworkTime: mocks.mockGetNetworkTime,
      resetHomeostatic: mocks.mockResetHomeostatic,
      regionFiringRates: mocks.mockRegionFiringRates,
    },
    lab: { save: mocks.mockSave },
    status: { netId: `test-${kind}`, rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind,
  })),
}));

vi.mock('@/lib/snn/out-exemplars', () => ({
  incrementCount: mocks.mockIncrementCount,
}));

vi.mock('@/lib/backend/events', () => ({
  onBackendEvent: mocks.onBackendEvent,
  emitBackendEvent: mocks.emitBackendEvent,
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
});

afterEach(() => {
  // noop
});

describe('LiveSnn — setSubstrate state reset (Fix 2)', () => {
  it('SS1: setSubstrate(다른 kind) — trialCount/lastWinnerCluster/patternRef reset', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    // 1회 trigger 영역 trial=1 + lastWinner=0.
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // substrate switch — trial / lastWinner / patternRef 영역 reset.
    await snn.setSubstrate('gesture');
    expect(snn.getSubstrate()).toBe('gesture');

    // 같은 cluster 0 영역 winner — substrate switch 후 영역 lastWinner=-1 reset
    // 영역 새 cluster 영역 increment trigger (idempotent gate 영역 reset).
    snn.setPattern([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(2); // 1 + 1 (reset 후 새 trigger).
    // 두 번째 호출 영역 substrate='gesture' 영역 emit.
    expect(mocks.mockIncrementCount).toHaveBeenLastCalledWith('out_0_0', 'gesture', expect.any(Array));

    snn.dispose();
  });

  it('SS2: 같은 kind 영역 setSubstrate — early return, state 영역 보존', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // 같은 kind 영역 setSubstrate — early return.
    await snn.setSubstrate('orientation');
    expect(snn.getSubstrate()).toBe('orientation');

    // pattern + lastWinner 영역 보존 — 같은 cluster 0 winner 영역 idempotent (no increment).
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1); // 보존 — increment 0.

    snn.dispose();
  });

  it('SS3: setSubstrate 후 incrementCount 영역 새 substrate 영역 store', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenLastCalledWith(
      'out_0_0',
      'orientation',
      expect.any(Array),
    );

    await snn.setSubstrate('gesture');
    snn.setPattern([0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenLastCalledWith(
      'out_0_0',
      'gesture',
      expect.any(Array),
    );

    snn.dispose();
  });
});
