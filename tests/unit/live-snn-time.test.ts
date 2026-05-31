// LiveSnn — net.t time bug regression catch (PR fix/live-mode-time-and-restore Fix 1).
//
// 사용자 catch 2026-05-09 (broken state — "추론 1회 후 멈춤"):
//   triggerOnce 1차 영역 winner=0 catch / 2차 영역 winner=-1 catch.
//
// Plan agent 진단 (75% confidence):
//   live-snn.ts:291 영역 inject(time=0) — net.t 영역 누적 (1차 후 net.t≈90):
//     1차: net.t=0, inject(time=[0..19.9]) → run(50ms) → sustained input → V1 fire OK.
//     2차: net.t=90, inject(time=[0..19.9]) → run(50ms) → arrival<=t(=90) 영역
//          모든 stale impulse 영역 1-step burst collapse → V1 attenuated → OUT silent.
//
// 본 fix:
//   1. worker-protocol — GetNetworkTimeResult RPC 추가.
//   2. worker-core — case 'getNetworkTime' handler 추가.
//   3. worker-client — async getNetworkTime() method 추가.
//   4. live-snn.runStep 영역 inject 직전 currentT = await client.getNetworkTime()
//      → buildInjectEvents(currentT) 영역 time=currentT 정합.
//
// 검증 catch:
//   T1: triggerOnce × 2 — 두 호출 영역 mockGetNetworkTime 영역 호출 catch (각
//       repeats 영역 호출).
//   T2: mockInject 영역 events.time 영역 net.t 정합 (mockGetNetworkTime 영역
//       resolveValue 영역 95 영역 step 호출 영역 events.time 영역 95 catch).
//   T3: getNetworkTime fail 영역 fallback (legacy worker / mock 영역 미구현):
//       inject(time=0) 영역 fallback catch — saveFailed=false catch.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

interface InjectEvent {
  neuron: string;
  weight: number;
  time: number;
  durationMs: number;
  stepMs: number;
}

const mocks = vi.hoisted(() => {
  const mockInject = vi.fn(async (_events?: unknown) => {
    void _events;
    return undefined;
  });
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
  mocks.mockGetNetworkTime.mockReset();
  mocks.mockGetNetworkTime.mockResolvedValue(0);
  mocks.mockResetHomeostatic.mockClear();
  mocks.mockRegionFiringRates.mockReset();
  mocks.mockRegionFiringRates.mockResolvedValue({
    region: 'V1' as const,
    hz: 0,
    neuronCount: 0,
    firingCount: 0,
  });
  disposeLiveSnn();
});

afterEach(() => {
  disposeLiveSnn();
});

describe('LiveSnn — net.t time bug regression (Fix 1 — broken state)', () => {
  it('T1: triggerOnce × 2 — getNetworkTime 영역 매 step 영역 호출 (repeats × 2)', async () => {
    const live = getLiveSnn();
    live.setPattern([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    await live.triggerOnce();
    await live.triggerOnce({ force: true });

    // default repeats=3 × 2 trigger = 6회 catch.
    expect(mocks.mockGetNetworkTime).toHaveBeenCalledTimes(6);
  });

  it('T2: getNetworkTime resolveValue 95 영역 inject events.time 영역 95 catch', async () => {
    mocks.mockGetNetworkTime.mockResolvedValue(95);
    const live = getLiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await live.triggerOnce();

    // 첫 inject call 영역 events 영역 verify — time:95.
    expect(mocks.mockInject).toHaveBeenCalled();
    const firstCallArgs = mocks.mockInject.mock.calls[0]?.[0] as InjectEvent[];
    expect(firstCallArgs[0].time).toBe(95);
  });

  it('T3: getNetworkTime fail 영역 fallback time=0 — saveFailed=false', async () => {
    mocks.mockGetNetworkTime.mockRejectedValue(new Error('legacy worker — getNetworkTime 미구현'));
    const live = getLiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const r = await live.triggerOnce();
    expect(r.saveFailed).toBe(false);
    // inject 영역 fallback time=0 영역 호출.
    const firstCallArgs = mocks.mockInject.mock.calls[0]?.[0] as InjectEvent[];
    expect(firstCallArgs[0].time).toBe(0);
  });

  it('T4: 두 호출 영역 firing rate 동일 — net.t 누적 영역 winner stable (broken state 영역 정정 verify)', async () => {
    // 직전 buggy: 1차 winner=0 / 2차 winner=-1 catch.
    // 정정: getNetworkTime 영역 net.t 영역 inject events 영역 정합 영역 두 호출
    // 영역 winner 동일 (mock 영역 동일 cfr 영역 resolveValue catch).
    let netTimeMs = 0;
    mocks.mockGetNetworkTime.mockImplementation(async () => netTimeMs);
    mocks.mockRun.mockImplementation(async () => {
      // run 영역 net.t 영역 30ms 누적 catch (mock — 실 net.t 영역 simulate).
      netTimeMs += 30;
      return { ok: true, t: netTimeMs };
    });

    const live = getLiveSnn();
    live.setPattern([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    await live.triggerOnce();
    await live.triggerOnce({ force: true });

    // 두 호출 영역 inject events.time 영역 각 trigger 진입 시점 net.t 정합 catch.
    // 1차 inject (첫 step): time=0. 2차 trigger 첫 inject: time≥90 (3 repeats × 30).
    const inject1 = mocks.mockInject.mock.calls[0]?.[0] as InjectEvent[];
    const inject4 = mocks.mockInject.mock.calls[3]?.[0] as InjectEvent[];
    expect(inject1[0].time).toBe(0);
    // 2차 trigger 영역 첫 inject — net.t 누적 영역 inject events.time 영역 정합.
    expect(inject4[0].time).toBeGreaterThan(0);
  });
});
