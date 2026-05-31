// LiveSnn — thresholdOffset reset on triggerOnce (PR fix/live-mode-time-and-restore Fix 3).
//
// 사용자 catch 2026-05-09 (broken state — 두 번째 trigger 0Hz):
//   QA agent 진단 (MEDIUM secondary): triggerOnce({ repeats: 3 }) 영역 8 OUT
//   neuron 영역 multiple fire 영역 thresholdOffset += 2.0 × N → V_th saturate
//   → 두 번째 trigger 영역 fire 0.
//
// 본 fix:
//   1. worker-protocol — case 'resetHomeostatic' RPC 추가.
//   2. worker-core — 모든 neuron 영역 thresholdOffset = 0 영역 set.
//   3. worker-client — async resetHomeostatic() method 추가.
//   4. live-snn.triggerOnce — default opts.resetThreshold=true → 매 trigger 진입
//      시점 client.resetHomeostatic() 호출.
//
// 학술 정합: Diehl & Cook 2015 §3.2 supervised batch frame reset 정합.
//
// 검증 catch:
//   T1: triggerOnce default — resetHomeostatic 영역 1회 호출.
//   T2: triggerOnce({ resetThreshold: false }) — resetHomeostatic 호출 0.
//   T3: triggerOnce × 2 — 매 trigger 진입 시점 resetHomeostatic 호출 (총 2회).
//   T4: worker-core resetHomeostatic — net.neurons 모두 thresholdOffset=0 catch.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Neuron, SNNWorkerCore, type WorkerRequest } from '@/lib/snn-runtime';

const mocks = vi.hoisted(() => {
  const mockInject = vi.fn(async () => undefined);
  const mockRun = vi.fn(async () => ({ ok: true, t: 0 }));
  const mockClusterFiringRates = vi.fn(async () => ({
    rates: [12, 0, 0, 0],
    winner: 0,
    share: 1.0,
    margin: 1.0,
    total: 12,
    windowMs: 30,
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
  const emitBackendEvent = vi.fn();
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
    emitBackendEvent,
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
  onBackendEvent: mocks.onBackendEvent,
  emitBackendEvent: mocks.emitBackendEvent,
}));

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';

beforeEach(() => {
  mocks.mockInject.mockClear();
  mocks.mockRun.mockClear();
  mocks.mockClusterFiringRates.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockIncrementCount.mockClear();
  mocks.mockGetNetworkTime.mockClear();
  mocks.mockResetHomeostatic.mockClear();
  mocks.mockRegionFiringRates.mockClear();
  disposeLiveSnn();
});

afterEach(() => {
  disposeLiveSnn();
});

describe('LiveSnn — thresholdOffset reset on triggerOnce (Fix 3 — broken state)', () => {
  it('T1: triggerOnce default — resetHomeostatic 영역 1회 호출 (resetThreshold=true default)', async () => {
    const live = getLiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await live.triggerOnce();
    expect(mocks.mockResetHomeostatic).toHaveBeenCalledTimes(1);
  });

  it('T2: triggerOnce({ resetThreshold: false }) — resetHomeostatic 호출 0', async () => {
    const live = getLiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await live.triggerOnce({ resetThreshold: false });
    expect(mocks.mockResetHomeostatic).toHaveBeenCalledTimes(0);
  });

  it('T3: triggerOnce × 2 — 매 trigger 영역 resetHomeostatic 호출 (총 2회)', async () => {
    const live = getLiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await live.triggerOnce();
    await live.triggerOnce({ force: true });
    expect(mocks.mockResetHomeostatic).toHaveBeenCalledTimes(2);
  });
});

describe('SNNWorkerCore — resetHomeostatic RPC (Fix 3 — worker-core)', () => {
  it('T4: resetHomeostatic 영역 모든 neuron 영역 thresholdOffset=0 catch', () => {
    const core = new SNNWorkerCore();
    // build n13 — 모든 excitatory + OUT 영역 homeostatic enable.
    const buildReq: WorkerRequest = {
      id: 1,
      type: 'build',
      payload: {
        preset: 'n13_orientation',
        seed: 57,
        // Fix #20 (2026-05-10): zero-init dynamic — LEGACY 4-cluster explicit.
        clusterActiveInputs: [
          [4, 5, 6, 7],
          [1, 5, 9, 13],
          [0, 5, 10, 15],
          [3, 6, 9, 12],
        ],
      },
    };
    const buildRes = core.handle(buildReq);
    expect(buildRes.ok).toBe(true);

    const net = core.getNetForTest()!;
    // 인위 thresholdOffset 누적 — 모든 OUT neuron 영역 +5.
    const outNeurons = net.neurons.filter((n: Neuron) => n.name.startsWith('out_'));
    for (const n of outNeurons) {
      n.thresholdOffset = 5.0;
    }
    // 검증 catch — 누적 catch.
    expect(outNeurons[0].thresholdOffset).toBe(5.0);

    // resetHomeostatic RPC.
    const resetReq: WorkerRequest = { id: 2, type: 'resetHomeostatic' };
    const resetRes = core.handle(resetReq);
    expect(resetRes.ok).toBe(true);

    // 모든 neuron 영역 thresholdOffset=0 catch.
    for (const n of net.neurons) {
      expect(n.thresholdOffset).toBe(0);
    }
  });
});
