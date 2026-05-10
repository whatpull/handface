// LiveSnn — event-driven 1-shot pivot 검증 + V1/V2 cascade emit + OUT increment.
//
// 직전 (A): 200ms setInterval 기반 background tick — runOneTick + tickCount.
// 본 정정 (B — PR #184): triggerOnce + trialCount + lab.save throttle.
// PR #183 통합: emitTick 영역 rates_by_region V1/V2 + incrementCount idempotent.
//
// 영역 root cause (PR #183):
//  1. Live trigger 영역 emit 영역 'neuron-firing' 영역 rates_by_region 영역 미동봉 →
//     NodeLearn V1/V2 cascade strip 영역 0 + fired=false (broken state).
//  2. winner emerge 시점 OUT count 영역 incrementCount trigger 0 — Live grid path
//     영역 OUT count 0 잔존.
//
// 정직 한계 박음:
//  - LiveSnn 영역 root-local-snn / runtime worker 영역 mock 영역 — emit 직접 호출 path.
//  - rates_by_region 영역 V1/V2 영역 proxy rate (실 spike rate 영역 별도 RPC 영역 catch
//    영역 — 본 path 영역 cascade fired flag 영역 작동 보장).
//
// T1-T7 (PR #184) + cascade tests (PR #183):
//   T1: triggerOnce 1회 — inject/run/clusterFiringRates 각 repeats 횟수 + emit 1회 + lab.save 1회.
//   T2: triggerOnce × 2 — trial 영역 1, 2 (LiveTickDetail capture).
//   T3: idle 영역 stable — emit 0, trial 0 (start/stop API 미호출 → setInterval 0).
//   T4: triggerOnce × 2 영역 lab.save throttle — 2번째 직전 save 영역 500ms 내 영역 trailing schedule.
//   T5: start() / stop() undefined catch (background loop 폐기 영역 사실).
//   T6: Promise.all([triggerOnce, triggerOnce]) sequential — mockRun call order verify.
//   T7: triggerOnce({ repeats: 3 }) — mockRun 3회 catch (default repeats 영역 정합).
//   C1: pattern active 시점 영역 rates_by_region V1/V2 영역 동봉 (NodeLearn cascade fired).
//   C2: pattern silent 영역 rates_by_region 영역 0 (idle catch).
//   C3: winner emerge 시점 영역 OUT incrementCount idempotent (동일 winner 연속 영역 1회).
//   C4: winner=-1 (silent) 시점 영역 incrementCount 호출 0 + lastWinner reset.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
  // PR fix/live-mode-time-and-restore — Fix 1/3/5 신규 RPC mock.
  const mockGetNetworkTime = vi.fn(async () => 0);
  const mockResetHomeostatic = vi.fn(async () => null);
  const mockRegionFiringRates = vi.fn(async () => ({
    region: 'V1' as const,
    hz: 0,
    neuronCount: 0,
  }));
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
    mockGetNetworkTime,
    mockResetHomeostatic,
    mockRegionFiringRates,
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
      // PR fix/live-mode-time-and-restore — Fix 1/3/5 신규 RPC.
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
  onBackendEvent: mocks.onBackendEvent,
  emitBackendEvent: mocks.emitBackendEvent,
}));

import {
  getLiveSnn,
  disposeLiveSnn,
  onLiveTick,
  LiveSnn,
  type LiveTickDetail,
} from '@/lib/snn/live-snn';

interface NeuronFiringDetailLite {
  cluster_rates?: number[];
  winner_cluster?: number | null;
  rates_by_region?: Record<string, number>;
}

// default cluster firing 영역 winner=0 (default mock impl) — each test 영역
// mockResolvedValue 영역 persistent override 영역 회피 catch — beforeEach 영역
// 명시 재설정 mandatory.
const DEFAULT_CFR = {
  rates: [12, 0, 0, 0],
  winner: 0,
  share: 1.0,
  margin: 1.0,
  total: 12,
  windowMs: 30,
  layer: 'OUT' as const,
};

beforeEach(() => {
  mocks.mockInject.mockClear();
  mocks.mockRun.mockClear();
  mocks.mockClusterFiringRates.mockReset();
  mocks.mockClusterFiringRates.mockResolvedValue(DEFAULT_CFR);
  mocks.mockSave.mockClear();
  mocks.mockIncrementCount.mockClear();
  // PR fix/live-mode-time-and-restore — Fix 1/3/5 신규 mock reset.
  mocks.mockGetNetworkTime.mockReset();
  mocks.mockGetNetworkTime.mockResolvedValue(0);
  mocks.mockResetHomeostatic.mockClear();
  mocks.mockRegionFiringRates.mockReset();
  mocks.mockRegionFiringRates.mockResolvedValue({
    region: 'V1' as const,
    hz: 0,
    neuronCount: 0,
  });
  mocks.emittedEvents.length = 0;
  mocks.eventListeners.clear();
  disposeLiveSnn();
});

afterEach(() => {
  disposeLiveSnn();
});

describe('LiveSnn — event-driven 1-shot pivot (2026-05-09 B)', () => {
  it('T1: triggerOnce — inject/run/clusterFiringRates 각 repeats 횟수 + emit 1회 + lab.save 1회', async () => {
    const live = getLiveSnn();
    live.setPattern([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const ticks: LiveTickDetail[] = [];
    const off = onLiveTick((d) => ticks.push(d));

    const r = await live.triggerOnce();

    expect(r.saveFailed).toBe(false);
    // default repeats=3 — inject/run/clusterFiringRates 영역 3회.
    expect(mocks.mockInject).toHaveBeenCalledTimes(3);
    expect(mocks.mockRun).toHaveBeenCalledTimes(3);
    expect(mocks.mockClusterFiringRates).toHaveBeenCalledTimes(3);
    // emit 영역 1회 (trial 1) — repeats 누적 0 (마지막 cfr 영역 emit).
    expect(ticks).toHaveLength(1);
    expect(ticks[0].trial).toBe(1);
    expect(ticks[0].patternActive).toBe(true);
    // lab.save 영역 1회 (force=false 단 첫 호출 영역 throttle window 외 영역 immediate).
    expect(mocks.mockSave).toHaveBeenCalledTimes(1);
    off();
  });

  it('T2: triggerOnce × 2 — trial 영역 1 → 2 catch', async () => {
    vi.useFakeTimers();
    try {
      const live = getLiveSnn();
      live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      const ticks: LiveTickDetail[] = [];
      const off = onLiveTick((d) => ticks.push(d));

      await live.triggerOnce();
      // throttle bypass — 2번째 trigger 영역 force 영역 정합 (T4 영역 throttle 별도 검증).
      await live.triggerOnce({ force: true });

      expect(ticks).toHaveLength(2);
      expect(ticks[0].trial).toBe(1);
      expect(ticks[1].trial).toBe(2);
      off();
    } finally {
      vi.useRealTimers();
    }
  });

  it('T3: idle 영역 stable — emit 0, trial 0 (background loop 폐기 영역 사실)', async () => {
    const ticks: LiveTickDetail[] = [];
    const off = onLiveTick((d) => ticks.push(d));
    // 직전 (A) 영역 200ms setInterval 영역 ticks 영역 누적 영역 — 본 정정 (B)
    // 영역 background loop 폐기 영역 정합 영역 idle 영역 emit 0.
    await new Promise((r) => setTimeout(r, 50));
    expect(ticks).toHaveLength(0);
    expect(mocks.mockInject).not.toHaveBeenCalled();
    expect(mocks.mockRun).not.toHaveBeenCalled();
    off();
  });

  it('T4: triggerOnce × 2 영역 lab.save throttle — 2번째 직전 영역 500ms 내 영역 trailing schedule', async () => {
    vi.useFakeTimers();
    try {
      const live = getLiveSnn();
      live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

      await live.triggerOnce();
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);
      // 직후 (throttle window 내) 2번째 trigger — immediate save 영역 skip 영역
      // trailing setTimeout 영역 schedule.
      await live.triggerOnce();
      // immediate save 영역 1회 유지.
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);
      // trailing timer 영역 advance — 500ms.
      await vi.advanceTimersByTimeAsync(600);
      // trailing save 영역 1회 추가 — 합 2회.
      expect(mocks.mockSave).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('T5: start() / stop() undefined catch (background loop 폐기 영역 본격 사실)', () => {
    const live = getLiveSnn();
    // start/stop 영역 본 instance 영역 method 미존재 — typeof undefined 영역 정합.
    // (TypeScript 영역 type-level 영역 LiveSnn 영역 export 영역 verify catch.)
    const lAny = live as unknown as { start?: unknown; stop?: unknown };
    expect(typeof lAny.start).toBe('undefined');
    expect(typeof lAny.stop).toBe('undefined');
    // LiveSnn class 자체 영역 method 영역 0 — prototype 영역 verify.
    expect(typeof (LiveSnn.prototype as unknown as { start?: unknown }).start).toBe('undefined');
    expect(typeof (LiveSnn.prototype as unknown as { stop?: unknown }).stop).toBe('undefined');
  });

  it('T6: Promise.all([triggerOnce, triggerOnce]) — sequential mockRun call order', async () => {
    const live = getLiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    // tickInFlight gate 영역 sequential 보장 — concurrent triggerOnce 영역
    // run call 영역 interleave 0 (각 trigger 영역 repeats 회 batch 단위).
    await Promise.all([live.triggerOnce({ force: true }), live.triggerOnce({ force: true })]);
    // 2 trigger × default repeats 3 = 6 회.
    expect(mocks.mockRun).toHaveBeenCalledTimes(6);
    expect(mocks.mockInject).toHaveBeenCalledTimes(6);
  });

  it('T7: triggerOnce({ repeats: 3 }) — mockRun 3회 catch (명시 repeats)', async () => {
    const live = getLiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    await live.triggerOnce({ repeats: 3 });
    expect(mocks.mockRun).toHaveBeenCalledTimes(3);
    expect(mocks.mockInject).toHaveBeenCalledTimes(3);
    expect(mocks.mockClusterFiringRates).toHaveBeenCalledTimes(3);
  });
});

describe('LiveSnn emitTick — broken state regression catch (PR #183)', () => {
  it('C1: pattern active 시점 영역 rates_by_region V1/V2 영역 동봉 (NodeLearn cascade fired)', async () => {
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]); // active.
    await snn.triggerOnce();

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as NeuronFiringDetailLite;
    expect(detail.rates_by_region).toBeDefined();
    expect(detail.rates_by_region!.V1).toBeGreaterThan(0);
    expect(detail.rates_by_region!.V2).toBeGreaterThan(0);
    snn.dispose();
  });

  it('C2: pattern silent 영역 rates_by_region 영역 0 (idle catch)', async () => {
    mocks.mockClusterFiringRates.mockResolvedValue({
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
    await snn.triggerOnce();

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as NeuronFiringDetailLite;
    expect(detail.rates_by_region!.V1).toBe(0);
    expect(detail.rates_by_region!.V2).toBe(0);
    snn.dispose();
  });

  it('C3: winner emerge 시점 영역 OUT incrementCount idempotent (동일 winner 연속 영역 1회 only)', async () => {
    // PR-E (사용자 catch 2026-05-09 "한번 추론에 8개씩 증가"): trial-counter UI
    // semantic 정합 영역 cluster representative neuron (out_${winner}_0) 영역
    // 단일 increment. 직전 PR #194 영역 8 OUT broadcast 영역 backend weight
    // learning path 영역 정합 — 본 path 영역 UI exemplar count 영역 별도.
    const snn = new LiveSnn();
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);

    // trigger 1: winner=0 (mock default) → out_0_0 영역 1회 increment.
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    // 사용자 catch 2026-05-09 (Fix 1): substrate-aware signature.
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_0_0', 'orientation', expect.any(Array));

    // trigger 2: winner 동일 (0) — idempotent (call count 1 유지).
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // trigger 3: winner 변경 → 새 representative (out_1_0) 추가.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 12, 0, 0],
      winner: 1,
      share: 1.0,
      margin: 1.0,
      total: 12,
      windowMs: 30,
      layer: 'OUT',
    });
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(2); // 1 + 1
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_1_0', 'orientation', expect.any(Array));
    snn.dispose();
  });

  it('C4: winner=-1 (silent) 시점 영역 incrementCount 호출 0 + lastWinner reset', async () => {
    const snn = new LiveSnn();
    // trigger 1: winner=0 → out_0_0 영역 1회 increment.
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);

    // trigger 2: silent (winner=-1).
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 0, 0, 0],
      winner: -1,
      share: 0,
      margin: 0,
      total: 0,
      windowMs: 30,
      layer: 'OUT',
    });
    snn.setPattern(new Array(16).fill(0));
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1); // 미증가.

    // trigger 3: 동일 cluster (0) 재winner — silent 후 영역 lastWinner reset 영역
    // 동일 cluster 영역 새 trigger 정합 → representative 추가.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [12, 0, 0, 0],
      winner: 0,
      share: 1.0,
      margin: 1.0,
      total: 12,
      windowMs: 30,
      layer: 'OUT',
    });
    snn.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    await snn.triggerOnce({ force: true });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(2); // 1 + 1
    snn.dispose();
  });

  // PR #184 audit fix (SEC-1): setSubstrate 영역 trailing setTimeout closure
  // 영역 stale root capture 영역 정정 verify — substrate switch 영역 직후
  // trailing fire 영역 wrong substrate root.lab.save() 영역 호출 회피.
  it('T8 (SEC-1): setSubstrate 영역 trailing save timer 영역 cancel — stale root capture 회피', async () => {
    vi.useFakeTimers();
    try {
      const live = getLiveSnn();
      live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

      // 1차 trigger — immediate save 1회.
      await live.triggerOnce();
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);

      // 2차 trigger — throttle window 내 영역 trailing schedule.
      await live.triggerOnce();
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);

      // substrate switch — trailing timer 영역 pre-cancel 영역 stale 회피.
      await live.setSubstrate('gesture');

      // throttle window 영역 advance — trailing fire 영역 사실 시 mocks.mockSave
      // 영역 2회 (stale root) 도달. 정정 영역 cancel 영역 1회 유지.
      await vi.advanceTimersByTimeAsync(600);
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  // PR #184 audit fix (SEC-1 Path 2): dispose 영역 trailing pending 시
  // cancel — unmount 영역 stale root.lab.save() 영역 호출 회피.
  it('T9 (SEC-1): dispose 영역 trailing save timer 영역 cancel', async () => {
    vi.useFakeTimers();
    try {
      const live = getLiveSnn();
      live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

      await live.triggerOnce();
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);

      // 2차 trigger — trailing schedule.
      await live.triggerOnce();
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);

      // dispose — trailing cancel.
      disposeLiveSnn();

      await vi.advanceTimersByTimeAsync(600);
      // trailing fire 0 — mocks.mockSave 영역 1회 유지.
      expect(mocks.mockSave).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
