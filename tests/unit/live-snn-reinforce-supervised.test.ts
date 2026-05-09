// LiveSnn — reinforce supervised path 검증 (PR-A architecture pivot 2026-05-09 A2).
//
// 사용자 catch (PRIMARY HIGH 70%): 직전 reinforce 영역 void targetCluster +
// triggerOnce({ stdpGain: gain }) thin alias → STDP unsupervised self-reinforcing
// loop → 첫 trigger 영역 horizontal 우연 winner 영역 lock-in 영역 root cause.
//
// 정정 (본 PR): clusterTrainRStdp RPC 영역 1-pattern batch 영역 wire —
// targetCluster 영역 backend 영역 명시 supervised 신호 (worker-core.ts:343-416
// 본격 R-STDP supervised 구현 정합).
//
// R1: reinforce(targetCluster=1, gain=2.0) → clusterTrainRStdp 호출 +
//     targetCluster=1 + rewardGain=2.0 + punishGain=0.5 (gain × 0.25) wire 검증.
// R2: triggerOnce/inject/run 영역 호출 0 — 직전 thin alias path 영역 폐기 검증.
// R3: lab.save 영역 force 영역 즉시 영속 (saveDebounced throttle bypass).
// R4: cluster firing rates + region rates 영역 catch + emitTick.

import { describe, expect, it, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => {
  const mockInject = vi.fn(async () => undefined);
  const mockRun = vi.fn(async () => ({ ok: true, t: 0 }));
  const mockClusterFiringRates = vi.fn(async () => ({
    rates: [0, 12, 0, 0],
    winner: 1,
    share: 1.0,
    margin: 1.0,
    total: 12,
    windowMs: 50,
    layer: 'OUT' as const,
  }));
  const mockClusterTrainRStdp = vi.fn(async (_payload: unknown) => {
    void _payload;
    return {
      trained: 1,
      correct: 1,
      accuracy: 1.0,
      targetCluster: 1,
      clusterRatesHistory: [[0, 12, 0, 0]],
      winnerHistory: [1],
    };
  });
  const mockSave = vi.fn(async () => 1);
  const mockResetHomeostatic = vi.fn(async () => null);
  const mockGetNetworkTime = vi.fn(async () => 0);
  const mockRegionFiringRates = vi.fn(async () => ({
    region: 'V1' as const,
    hz: 8,
    neuronCount: 64,
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
    mockClusterTrainRStdp,
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
      clusterTrainRStdp: mocks.mockClusterTrainRStdp,
      resetHomeostatic: mocks.mockResetHomeostatic,
      getNetworkTime: mocks.mockGetNetworkTime,
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

interface NeuronFiringDetailLite {
  cluster_rates?: number[];
  winner_cluster?: number | null;
  rates_by_region?: Record<string, number>;
}

beforeEach(() => {
  mocks.mockInject.mockClear();
  mocks.mockRun.mockClear();
  mocks.mockClusterFiringRates.mockClear();
  mocks.mockClusterTrainRStdp.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockResetHomeostatic.mockClear();
  mocks.mockRegionFiringRates.mockClear();
  mocks.mockIncrementCount.mockClear();
  mocks.emittedEvents.length = 0;
});

describe('LiveSnn — reinforce supervised path (PR-A 2026-05-09 A2)', () => {
  it('R1: reinforce(1, 2.0) → clusterTrainRStdp 호출 + targetCluster + rewardGain + punishGain wire', async () => {
    const live = new LiveSnn();
    // vertical pattern (사용자 catch — cluster 1 supervised target).
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    const result = await live.reinforce(1, 2.0);
    expect(result.saveFailed).toBe(false);
    expect(mocks.mockClusterTrainRStdp).toHaveBeenCalledTimes(1);
    const payload = mocks.mockClusterTrainRStdp.mock.calls[0][0] as {
      patterns: number[][];
      targetCluster: number;
      rewardGain: number;
      punishGain: number;
    };
    expect(payload.targetCluster).toBe(1);
    expect(payload.rewardGain).toBe(2.0);
    // QA CAUSE D fix (2026-05-10): punishGain=0 — wrong-winner LTD escape 0
    // 영역 정직 한계 catch (saturation 회피 정합 path).
    expect(payload.punishGain).toBe(0);
    expect(payload.patterns).toHaveLength(1);
    expect(payload.patterns[0][1]).toBe(1); // vertical pattern dim 1.
    live.dispose();
  });

  it('R2: 직전 thin alias path 영역 폐기 — inject/run 영역 호출 0', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    await live.reinforce(1, 2.0);
    // 직전 reinforce 영역 triggerOnce({ stdpGain: gain }) → repeats 3 × inject/run.
    // 정정 path 영역 clusterTrainRStdp 영역 단일 호출 — inject/run 영역 worker
    // 내부 영역 처리 (main-thread 영역 0 호출).
    expect(mocks.mockInject).not.toHaveBeenCalled();
    expect(mocks.mockRun).not.toHaveBeenCalled();
    live.dispose();
  });

  it('R3: reinforce 영역 lab.save 영역 force 영역 즉시 영속 (throttle bypass)', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    // 직전 호출 영역 throttle window 영역 catch 회피 catch — fresh instance 영역
    // _lastSaveAtMs 영역 -∞ 영역 시작 영역 첫 호출 immediate save.
    await live.reinforce(1, 2.0);
    expect(mocks.mockSave).toHaveBeenCalledTimes(1);
    // 두 번째 reinforce 영역 throttle window 내 영역 catch — force=true 영역 immediate save.
    await live.reinforce(1, 2.0);
    expect(mocks.mockSave).toHaveBeenCalledTimes(2);
    live.dispose();
  });

  it('R4: reinforce 영역 cluster firing + region rates + emitTick (NodeLearn / NodeInfer 영역 sync)', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    await live.reinforce(1, 2.0);
    // clusterFiringRates 영역 supervised batch 직후 영역 1회 호출.
    expect(mocks.mockClusterFiringRates).toHaveBeenCalledTimes(1);
    // V1/V2 region rates 영역 2회 호출 (Promise.all).
    expect(mocks.mockRegionFiringRates).toHaveBeenCalledTimes(2);
    // emitBackendEvent('neuron-firing') 영역 호출 — winner_cluster=1 wire.
    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as NeuronFiringDetailLite;
    expect(detail.winner_cluster).toBe(1);
    expect(detail.cluster_rates).toEqual([0, 12, 0, 0]);
    expect(detail.rates_by_region!.V1).toBe(8);
    live.dispose();
  });

  it('R5: resetHomeostatic 영역 reinforce 진입 시점 호출 — V_th saturation 회피 (Diehl & Cook 2015 §3.2)', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    await live.reinforce(1, 2.0);
    expect(mocks.mockResetHomeostatic).toHaveBeenCalledTimes(1);
    live.dispose();
  });
});
