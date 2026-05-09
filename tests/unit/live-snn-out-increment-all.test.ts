// QA FINDING-2 fix (2026-05-10): emitTick 영역 8 OUT 영역 모두 increment 검증.
//
// 사용자 catch 2026-05-09 ("현제 추론 결과 엉망"):
// 직전 emitTick 영역 sole `out_${winner}_0` 영역 incrementCount → cluster 영역 8
// OUT (out_${ci}_0 ~ out_${ci}_7) 중 7 OUT 영원 idle → NodeOut 영역 sumClusterCount
// 비례 mismatch → "엉망 추론" visual root.
//
// 정정: cluster 영역 8 OUT 영역 모두 increment — node-out-cluster-count 영역
// sumClusterCount helper (8 OUT 합산) 영역 정합 + cluster broadcast supervisor 정합.
//
// O1: triggerOnce 영역 winner=0 → out_0_0 ~ out_0_7 영역 8회 increment.
// O2: 동일 winner 연속 — idempotent (call count 8 유지, lastWinner gate).
// O3: winner 변경 — 새 cluster 영역 8 OUT 영역 추가 (총 16).
// O4: silent (winner=-1) — increment 호출 0.
// O5: feature snapshot 영역 모든 increment 호출 영역 동일 array (lastFeature 정합).

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

describe('LiveSnn — 8 OUT broadcast incrementCount (QA FINDING-2 2026-05-10)', () => {
  it('O1: winner=0 → out_0_0 ~ out_0_7 영역 8회 increment (cluster broadcast supervisor 정합)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8);
    for (let ni = 0; ni < 8; ni += 1) {
      expect(mocks.mockIncrementCount).toHaveBeenCalledWith(`out_0_${ni}`, expect.any(Array));
    }
    snn.dispose();
  });

  it('O2: 동일 winner 연속 — lastWinner gate 영역 idempotent (call count 8 유지)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8);
    snn.dispose();
  });

  it('O3: winner 변경 — 새 cluster 영역 8 OUT 추가 (총 16)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8);

    // winner 변경 → cluster 1 영역 8 OUT 추가.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 12, 0, 0],
      winner: 1,
      share: 1.0,
      margin: 1.0,
      layer: 'OUT',
    });
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(16);
    for (let ni = 0; ni < 8; ni += 1) {
      expect(mocks.mockIncrementCount).toHaveBeenCalledWith(`out_1_${ni}`, expect.any(Array));
    }
    snn.dispose();
  });

  it('O4: silent (winner=-1) — incrementCount 호출 0 + lastWinner reset', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8);

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
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8); // 미증가.
    snn.dispose();
  });

  it('O5: feature snapshot 영역 모든 8회 increment 영역 동일 array (lastFeature 정합)', async () => {
    const snn = new LiveSnn();
    const pattern = [1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    snn.setPattern(pattern);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(8);
    // 모든 호출 영역 동일 16-dim feature snapshot 영역 catch.
    for (const call of mocks.mockIncrementCount.mock.calls) {
      const [, feature] = call;
      expect(feature).toEqual(pattern);
    }
    snn.dispose();
  });
});
