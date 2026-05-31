// LiveSnn — inferOnce 검증 (PR-A architecture pivot 2026-05-09 A1).
//
// 사용자 catch A1: pixel/preset click 영역 즉시 학습/추론 trigger 영역 폐기 →
// 명시 "추론" button 영역 click 영역 inferOnce (stdpGain=0) trigger.
//
// 학술 정합: STDP off — Hebbian 0, 가중치 변경 0 (read-only). cluster firing
// rates 측정 only.
//
// I1: inferOnce → triggerOnce({ stdpGain: 0 }) thin wrapper — run payload 영역
//     stdpGain=0 wire 검증.
// I2: inferOnce → clusterFiringRates 영역 호출 + emitTick (NodeInfer 영역 sync).
// I3: inferOnce 영역 default repeats=3 영역 정합 (triggerOnce default).

import { describe, expect, it, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => {
  const mockInject = vi.fn(async () => undefined);
  const mockRun = vi.fn(async (_payload: unknown) => {
    void _payload;
    return { ok: true, t: 0 };
  });
  const mockClusterFiringRates = vi.fn(async () => ({
    rates: [0, 12, 0, 0],
    winner: 1,
    share: 1.0,
    margin: 1.0,
    total: 12,
    windowMs: 50,
    layer: 'OUT' as const,
  }));
  const mockSave = vi.fn(async () => 1);
  const mockResetHomeostatic = vi.fn(async () => null);
  const mockGetNetworkTime = vi.fn(async () => 0);
  const mockRegionFiringRates = vi.fn(async () => ({
    region: 'V1' as const,
    hz: 0,
    neuronCount: 0,
    firingCount: 0,
  }));
  const mockIncrementCount = vi.fn();
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
    mockResetHomeostatic,
    mockGetNetworkTime,
    mockRegionFiringRates,
    mockIncrementCount,
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
      resetHomeostatic: mocks.mockResetHomeostatic,
      getNetworkTime: mocks.mockGetNetworkTime,
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

interface NeuronFiringDetailLite {
  cluster_rates?: number[];
  winner_cluster?: number | null;
}

beforeEach(() => {
  mocks.mockInject.mockClear();
  mocks.mockRun.mockClear();
  mocks.mockClusterFiringRates.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockResetHomeostatic.mockClear();
  mocks.mockRegionFiringRates.mockClear();
  mocks.mockIncrementCount.mockClear();
  mocks.emittedEvents.length = 0;
});

describe('LiveSnn — inferOnce (PR-A 2026-05-09 A1)', () => {
  it('I1: inferOnce → run 영역 stdpGain=0 wire (학습 0, 가중치 변경 0)', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    await live.inferOnce();
    expect(mocks.mockRun).toHaveBeenCalled();
    // 모든 run 호출 영역 stdpGain=0 정합 — read-only inference.
    for (const call of mocks.mockRun.mock.calls) {
      const payload = call[0] as { stdpGain?: number; stdpEnabled?: boolean };
      expect(payload.stdpGain).toBe(0);
    }
    live.dispose();
  });

  it('I2: inferOnce → clusterFiringRates 호출 + emitTick (NodeInfer 영역 sync)', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    await live.inferOnce();
    // default repeats=3 — clusterFiringRates 영역 3회 호출.
    expect(mocks.mockClusterFiringRates).toHaveBeenCalledTimes(3);
    // emitBackendEvent('neuron-firing') 영역 호출 — winner_cluster=1.
    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as NeuronFiringDetailLite;
    expect(detail.winner_cluster).toBe(1);
    expect(detail.cluster_rates).toEqual([0, 12, 0, 0]);
    live.dispose();
  });

  it('I3: inferOnce 영역 default repeats=3 정합 (triggerOnce thin wrapper)', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await live.inferOnce();
    expect(mocks.mockInject).toHaveBeenCalledTimes(3);
    expect(mocks.mockRun).toHaveBeenCalledTimes(3);
    live.dispose();
  });
});
