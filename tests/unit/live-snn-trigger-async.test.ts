// PR-B (Web Worker background offload, 2026-05-10): live-snn 영역 fire-and-forget API.
//
// 사용자 catch 2026-05-09 [2]: "백그라운드 동작" 정정 path — triggerAsync /
// inferAsync / reinforceAsync 영역 즉시 return + push event 영역 emitTick 영역
// 단위 검증.
//
// A1: triggerAsync 영역 즉시 return `{ trialToken }` (await 0 — sync return).
// A2: triggerBackground RPC 영역 호출 + push event 영역 emitTick (LiveTickDetail).
// A3: inferAsync — triggerAsync({ stdpGain: 0 }) thin wrapper (RPC 영역 stdpGain=0).
// A4: reinforceAsync 영역 reinforceBackground RPC 영역 호출 + emitTick.
// A5: trialToken 영역 monotonic (multi-call 영역 sequential increment).
// A6: dispose 영역 push handler unsubscribe — 후속 push 영역 emitTick 0.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const pushHandlers: Map<string, Array<(payload: unknown) => void>> = new Map();
  const mockTriggerBackground = vi.fn(async (_p: unknown) => {
    void _p;
    return null;
  });
  const mockReinforceBackground = vi.fn(async (_p: unknown) => {
    void _p;
    return null;
  });
  const mockOn = vi.fn((event: string, handler: (p: unknown) => void) => {
    const arr = pushHandlers.get(event) ?? [];
    arr.push(handler);
    pushHandlers.set(event, arr);
    return () => {
      const cur = pushHandlers.get(event) ?? [];
      const i = cur.indexOf(handler);
      if (i >= 0) cur.splice(i, 1);
    };
  });
  const mockSave = vi.fn(async () => 1);
  const mockIncrementCount = vi.fn();
  const emittedEvents: Array<{ name: string; detail: unknown }> = [];
  const emitBackendEvent = vi.fn((name: string, detail: unknown) => {
    emittedEvents.push({ name, detail });
  });
  const onBackendEvent = vi.fn(() => () => undefined);
  return {
    pushHandlers,
    mockTriggerBackground,
    mockReinforceBackground,
    mockOn,
    mockSave,
    mockIncrementCount,
    emittedEvents,
    emitBackendEvent,
    onBackendEvent,
  };
});

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    client: {
      triggerBackground: mocks.mockTriggerBackground,
      reinforceBackground: mocks.mockReinforceBackground,
      on: mocks.mockOn,
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
}

beforeEach(() => {
  mocks.mockTriggerBackground.mockClear();
  mocks.mockReinforceBackground.mockClear();
  mocks.mockOn.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockIncrementCount.mockClear();
  mocks.emittedEvents.length = 0;
  mocks.pushHandlers.clear();
});

afterEach(() => {
  // noop — 각 test 영역 dispose 명시.
});

const SAMPLE_TRIGGER_PAYLOAD = {
  trialToken: 1,
  cfr: {
    rates: [0, 12, 0, 0],
    winner: 1,
    share: 1.0,
    margin: 1.0,
    layer: 'OUT' as const,
  },
  v1Hz: 8,
  v2Hz: 6,
  netTime: 150,
};

describe('LiveSnn — fire-and-forget API (PR-B 2026-05-10)', () => {
  it('A1: triggerAsync 영역 즉시 return `{ trialToken }` (sync return)', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const t0 = performance.now();
    const r = live.triggerAsync();
    const dt = performance.now() - t0;
    expect(r.trialToken).toBe(1);
    // sync return — < 5ms 정합 (우연 GC pause 영역 catch 영역 < 50ms 영역 보수적).
    expect(dt).toBeLessThan(50);
    live.dispose();
  });

  it('A2: triggerBackground RPC 영역 호출 + push event 영역 emitTick', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    live.triggerAsync();
    // microtask 영역 root fetch + on register + RPC 영역 dispatch 영역 wait.
    await new Promise((r) => setTimeout(r, 10));
    expect(mocks.mockTriggerBackground).toHaveBeenCalledTimes(1);
    expect(mocks.mockOn).toHaveBeenCalled();
    // push event 영역 emit (worker 영역 simulate).
    const handlers = mocks.pushHandlers.get('triggerComplete') ?? [];
    expect(handlers.length).toBeGreaterThanOrEqual(1);
    handlers[0](SAMPLE_TRIGGER_PAYLOAD);
    // emitTick 영역 neuron-firing event emit + lab.save fire-and-forget.
    const firing = mocks.emittedEvents.find((e) => e.name === 'neuron-firing');
    expect(firing).toBeDefined();
    const detail = firing!.detail as NeuronFiringDetailLite;
    expect(detail.winner_cluster).toBe(1);
    expect(detail.cluster_rates).toEqual([0, 12, 0, 0]);
    live.dispose();
  });

  it('A3: inferAsync — triggerAsync({ stdpGain: 0 }) thin wrapper — RPC 영역 stdpGain=0 wire', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    live.inferAsync();
    await new Promise((r) => setTimeout(r, 10));
    expect(mocks.mockTriggerBackground).toHaveBeenCalledTimes(1);
    const payload = mocks.mockTriggerBackground.mock.calls[0][0] as { stdpGain: number };
    expect(payload.stdpGain).toBe(0);
    live.dispose();
  });

  it('A4: reinforceAsync 영역 reinforceBackground RPC 호출 + targetCluster + rewardGain + punishGain wire', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    const r = live.reinforceAsync(1, 2.0);
    expect(r.trialToken).toBe(1);
    await new Promise((r) => setTimeout(r, 10));
    expect(mocks.mockReinforceBackground).toHaveBeenCalledTimes(1);
    const payload = mocks.mockReinforceBackground.mock.calls[0][0] as {
      targetCluster: number;
      rewardGain: number;
      punishGain: number;
      pattern: number[];
    };
    expect(payload.targetCluster).toBe(1);
    expect(payload.rewardGain).toBe(2.0);
    // QA CAUSE D fix (2026-05-10): punishGain=0 — wrong-winner LTD escape 0
    // 영역 정직 한계 catch (saturation 회피 정합 path).
    expect(payload.punishGain).toBe(0);
    expect(payload.pattern[1]).toBe(1);
    live.dispose();
  });

  it('A5: trialToken 영역 monotonic (multi-call 영역 sequential increment)', () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const t1 = live.triggerAsync();
    const t2 = live.inferAsync();
    const t3 = live.reinforceAsync(0, 2.0);
    expect(t1.trialToken).toBe(1);
    expect(t2.trialToken).toBe(2);
    expect(t3.trialToken).toBe(3);
    live.dispose();
  });

  it('A6: dispose 영역 push handler unsubscribe — 후속 push event 영역 emitTick 0', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    live.triggerAsync();
    await new Promise((r) => setTimeout(r, 10));
    const handlersBefore = mocks.pushHandlers.get('triggerComplete') ?? [];
    expect(handlersBefore.length).toBe(1);
    live.dispose();
    const handlersAfter = mocks.pushHandlers.get('triggerComplete') ?? [];
    expect(handlersAfter.length).toBe(0);
  });
});
