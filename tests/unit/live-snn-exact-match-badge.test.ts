// 사용자 catch 2026-05-12 (exact-match-badge-hide-rates):
//   "패턴 4가 추론되는데 실제 수치가 맞는건가요? 0Hz 표시는 정확한 것인지?"
//   스크린샷: forced winner cluster fire=0Hz / 영역 cluster fire=82Hz →
//   사용자 mental model "winner=cluster 4 단 fire 0Hz" 영역 모순.
//
// Root cause:
//   PR #237 exact-match winner force 영역 deterministic cluster lock (Carpenter-
//   Grossberg 1987 ART resonance) — fire rate 영역 stochasticity 영역 영역 영역
//   vigilance metric 영역 별도. winner cluster fire 영역 0Hz 영역 산출 사실
//   (subthreshold neuron + 영역 cluster weight dominance) 단 사용자 영역
//   "fire rate 영역 winner source" 영역 mental model.
//
// Fix:
//   worker-core ClusterFiringRatesResult.forcedExact (boolean) 영역 emit →
//   live-snn 영역 NeuronFiringDetail.winner_forced_exact propagate → NodeInfer
//   / NodeLearn 영역 "EXACT MATCH (deterministic)" badge 표시 + winner row
//   fire rate Hz 영역 hide ("EXACT" pill replace) — 사용자 mental model 영역
//   ART resonance 영역 명시.
//
// 본 test 영역:
//   T1: forcedExact=true emit → winner_forced_exact=true propagate.
//   T2: forcedExact=false / undefined → winner_forced_exact=false (legacy 호환).
//   T3: winner=-1 (silent) → winner_forced_exact=false (stale badge 차단).
//   T4: forcedExact=true 단 mismatch=true (vigilance miss) → winner_forced_exact=
//       false (mismatch 영역 winner invalidate 정합 — forced badge 영역 hide).

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const mockInject = vi.fn(async () => undefined);
  const mockRun = vi.fn(async () => ({ ok: true, t: 0 }));
  // forcedExact 영역 optional — explicit `boolean | undefined` 영역 cast 영역
  // mockResolvedValue 영역 다른 shape (forcedExact 미동봉 legacy backend 호환)
  // 영역 catch path.
  const mockClusterFiringRates = vi.fn(async (): Promise<{
    rates: number[];
    winner: number;
    share: number;
    margin: number;
    total: number;
    windowMs: number;
    layer: 'OUT';
    forcedExact?: boolean;
  }> => ({
    rates: [12, 0, 0, 0],
    winner: 0,
    share: 1.0,
    margin: 1.0,
    total: 12,
    windowMs: 30,
    layer: 'OUT' as const,
    forcedExact: false,
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

import { LiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';

interface FiringDetailLite {
  cluster_rates?: number[];
  winner_cluster?: number | null;
  winner_margin?: number;
  winner_forced_exact?: boolean;
}

const ACTIVE_PATTERN = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];

beforeEach(() => {
  mocks.mockInject.mockClear();
  mocks.mockRun.mockClear();
  mocks.mockClusterFiringRates.mockReset();
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
  mocks.emittedEvents.length = 0;
  mocks.eventListeners.clear();
  disposeLiveSnn();
});

afterEach(() => {
  disposeLiveSnn();
});

describe('LiveSnn — exact-match badge propagation (사용자 catch 2026-05-12)', () => {
  it('T1: cfr.forcedExact=true → emit winner_forced_exact=true (사용자 mental model — EXACT MATCH badge enable)', async () => {
    // worker-core 영역 set-equal cluster 영역 winner deterministic lock —
    // forcedExact=true 영역 emit (Carpenter-Grossberg ART resonance 정합).
    mocks.mockClusterFiringRates.mockResolvedValue({
      // winner cluster (idx=2) 영역 fire rate=0Hz — exact lock 정합 catch 영역
      // realistic value (스크린샷 영역 fire 0Hz / 영역 cluster fire 82Hz 정합).
      rates: [82, 0, 0, 0],
      winner: 2, // forced winner — fire rate argmax 영역 영역 영역 deterministic.
      share: 1.0, // PR #240 — forced 영역 hard-set.
      margin: 1.0, // PR #240 — forced 영역 hard-set.
      total: 82,
      windowMs: 30,
      layer: 'OUT' as const,
      forcedExact: true,
    });

    const snn = new LiveSnn();
    snn.setPattern(ACTIVE_PATTERN);
    await snn.triggerOnce();

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as FiringDetailLite;
    expect(detail.winner_cluster).toBe(2);
    expect(detail.winner_forced_exact).toBe(true);
    snn.dispose();
  });

  it('T2: cfr.forcedExact=false → emit winner_forced_exact=false (non-exact fallback — fire rate argmax path)', async () => {
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [50, 30, 0, 0],
      winner: 0, // fire rate argmax (forced 영역 영역).
      share: 50 / 80,
      margin: 0.4,
      total: 80,
      windowMs: 30,
      layer: 'OUT' as const,
      forcedExact: false,
    });

    const snn = new LiveSnn();
    snn.setPattern(ACTIVE_PATTERN);
    await snn.triggerOnce();

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as FiringDetailLite;
    expect(detail.winner_cluster).toBe(0);
    expect(detail.winner_forced_exact).toBe(false);
    snn.dispose();
  });

  it('T2b: cfr.forcedExact=undefined (legacy backward compat) → emit winner_forced_exact=false', async () => {
    // 미동봉 (legacy backend / non-exact path) 영역 undefined → false 정합.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [12, 0, 0, 0],
      winner: 0,
      share: 1.0,
      margin: 1.0,
      total: 12,
      windowMs: 30,
      layer: 'OUT' as const,
      // forcedExact 미동봉 — backward compat.
    });

    const snn = new LiveSnn();
    snn.setPattern(ACTIVE_PATTERN);
    await snn.triggerOnce();

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as FiringDetailLite;
    expect(detail.winner_forced_exact).toBe(false);
    snn.dispose();
  });

  it('T3: winner=-1 (silent) + forcedExact=false → winner_forced_exact=false (stale badge 차단)', async () => {
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 0, 0, 0],
      winner: -1,
      share: 0,
      margin: 0,
      total: 0,
      windowMs: 30,
      layer: 'OUT' as const,
      forcedExact: false,
    });

    const snn = new LiveSnn();
    snn.setPattern(new Array(25).fill(0)); // silent.
    await snn.triggerOnce();

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as FiringDetailLite;
    expect(detail.winner_cluster).toBeNull();
    expect(detail.winner_forced_exact).toBe(false);
    snn.dispose();
  });

  it('T4: winner=-1 (silent) 단 forcedExact=true (edge case) → winner_forced_exact=false (winner null 영역 badge invariant)', async () => {
    // 정상 worker-core 영역 winner=-1 + forcedExact=true 영역 모순 path 0 단
    // emit 영역 winner_cluster=null 영역 forced 영역 자연 false (caller 영역
    // null winner + forced badge 영역 invariant 차단). 본 test 영역 emit 영역
    // gate (winner < 0 → forced=false) 영역 직접 catch.
    mocks.mockClusterFiringRates.mockResolvedValue({
      rates: [0, 0, 0, 0],
      winner: -1, // silent — emit 영역 winner_cluster=null catch.
      share: 0,
      margin: 0,
      total: 0,
      windowMs: 30,
      layer: 'OUT' as const,
      forcedExact: true, // 모순 input — emit 영역 false 영역 normalize.
    });

    const snn = new LiveSnn();
    snn.setPattern(new Array(25).fill(0));
    await snn.triggerOnce();

    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as FiringDetailLite;
    expect(detail.winner_cluster).toBeNull();
    // winner null 영역 forced badge 영역 항상 false — UI 영역 stale "EXACT MATCH"
    // 영역 차단 정합.
    expect(detail.winner_forced_exact).toBe(false);
    snn.dispose();
  });
});
