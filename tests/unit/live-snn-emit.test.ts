// live-snn emitTick 영역 단위 검증 — fix/live-mode-substrate-init root cause regression catch.
//
// 영역 root cause:
//  1. Live tick 영역 emit 영역 'neuron-firing' 영역 rates_by_region 영역 미동봉 →
//     NodeLearn V1/V2 cascade strip 영역 0 + fired=false (broken state).
//  2. winner emerge 시점 OUT count 영역 incrementCount trigger 0 — Live grid path
//     영역 OUT count 0 잔존.
//
// 정직 한계 박음:
//  - LiveSnn 영역 root-local-snn / runtime worker 영역 mock 영역 — emit 직접 호출 path.
//  - rates_by_region 영역 V1/V2 영역 proxy rate (실 spike rate 영역 별도 RPC 영역 catch
//    영역 — 본 path 영역 cascade fired flag 영역 작동 보장).

import { describe, it, expect, vi, beforeEach } from 'vitest';

// vi.mock factory 영역 hoist 정합 — 내부 영역 top-level state 영역 catch 0
// (vi.fn() / Map 영역 factory scope 안 영역 declare). 외부 access 영역 vi.mocked
// 영역 사실. 단 본 test 영역 단순 mock 영역 catch 영역 module hoist 정합 catch
// 영역 — `vi.hoisted` 영역 wrap.
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
  const eventListeners = new Map<string, Array<(d: unknown) => void>>();
  const onBackendEvent = vi.fn((name: string, handler: (d: unknown) => void) => {
    const arr = eventListeners.get(name) ?? [];
    arr.push(handler);
    eventListeners.set(name, arr);
    return () => {
      const next = (eventListeners.get(name) ?? []).filter((h) => h !== handler);
      eventListeners.set(name, next);
    };
  });
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
    eventListeners,
    onBackendEvent,
    emittedEvents,
    emitBackendEvent,
  };
});

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    client: {
      inject: mocks.mockInject,
      run: mocks.mockRun,
      clusterFiringRates: mocks.mockClusterFiringRates,
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
  onBackendEvent: mocks.onBackendEvent,
  emitBackendEvent: mocks.emitBackendEvent,
}));

import { LiveSnn } from '@/lib/snn/live-snn';

// LiveSnn private tick 호출 — 본 test 영역 timer wait 회피 catch 영역
// reflection (cast to unknown then any-shaped record). 직접 호출 정합.
async function runOneTick(snn: LiveSnn): Promise<void> {
  const recordTick = snn as unknown as { tick: () => Promise<void> };
  await recordTick.tick();
}

interface NeuronFiringDetailLite {
  cluster_rates?: number[];
  winner_cluster?: number | null;
  rates_by_region?: Record<string, number>;
}

beforeEach(() => {
  mocks.mockInject.mockClear();
  mocks.mockRun.mockClear();
  mocks.mockClusterFiringRates.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockIncrementCount.mockClear();
  mocks.emittedEvents.length = 0;
  mocks.eventListeners.clear();
});

describe('LiveSnn emitTick — broken state regression catch', () => {
  it('pattern active 시점 영역 rates_by_region V1/V2 영역 동봉 (NodeLearn cascade fired)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0,  1, 1, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0]); // active.
    await runOneTick(snn);

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as NeuronFiringDetailLite;
    expect(detail.rates_by_region).toBeDefined();
    expect(detail.rates_by_region!.V1).toBeGreaterThan(0);
    expect(detail.rates_by_region!.V2).toBeGreaterThan(0);
    snn.dispose();
  });

  it('pattern silent 영역 rates_by_region 영역 0 (idle catch)', async () => {
    mocks.mockClusterFiringRates.mockResolvedValueOnce({
      rates: [0, 0, 0, 0],
      winner: -1,
      share: 0,
      margin: 0,
      total: 0,
      windowMs: 30,
      layer: 'OUT',
    });
    const snn = new LiveSnn();
    snn.setPattern(new Array(16).fill(0)); // silent.
    await runOneTick(snn);

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as NeuronFiringDetailLite;
    expect(detail.rates_by_region!.V1).toBe(0);
    expect(detail.rates_by_region!.V2).toBe(0);
    snn.dispose();
  });

  it('winner emerge 시점 영역 OUT incrementCount idempotent (동일 winner 연속 영역 1회)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0,  1, 1, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0]);

    // tick 1: winner=0 (mock default).
    await runOneTick(snn);
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_0_0', expect.any(Array));

    // tick 2: winner 동일 (0) — idempotent (call count 1 유지).
    await runOneTick(snn);
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // tick 3: winner 변경 → 새 increment.
    mocks.mockClusterFiringRates.mockResolvedValueOnce({
      rates: [0, 12, 0, 0],
      winner: 1,
      share: 1.0,
      margin: 1.0,
      total: 12,
      windowMs: 30,
      layer: 'OUT',
    });
    await runOneTick(snn);
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(2);
    expect(mocks.mockIncrementCount).toHaveBeenLastCalledWith('out_1_0', expect.any(Array));
    snn.dispose();
  });

  it('winner=-1 (silent) 시점 영역 incrementCount 호출 0 + lastWinner reset', async () => {
    const snn = new LiveSnn();
    // tick 1: winner=0 → increment.
    snn.setPattern([1, 0, 0, 0,  1, 1, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0]);
    await runOneTick(snn);
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // tick 2: silent (winner=-1).
    mocks.mockClusterFiringRates.mockResolvedValueOnce({
      rates: [0, 0, 0, 0], winner: -1, share: 0, margin: 0,
      total: 0, windowMs: 30, layer: 'OUT',
    });
    snn.setPattern(new Array(16).fill(0));
    await runOneTick(snn);
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1); // 미증가.

    // tick 3: 동일 cluster (0) 재winner — silent 후 영역 lastWinner reset 영역
    // 동일 cluster 영역 새 trigger 정합.
    mocks.mockClusterFiringRates.mockResolvedValueOnce({
      rates: [12, 0, 0, 0], winner: 0, share: 1.0, margin: 1.0,
      total: 12, windowMs: 30, layer: 'OUT',
    });
    snn.setPattern([1, 0, 0, 0,  1, 1, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0]);
    await runOneTick(snn);
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(2);
    snn.dispose();
  });
});
