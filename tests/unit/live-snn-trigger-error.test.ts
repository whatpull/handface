// QA FINDING-4 fix (2026-05-10): handleTriggerBackground / handleReinforceBackground
// catch path 영역 'triggerError' push event 영역 emit + main thread listener 영역 catch 검증.
//
// 사용자 catch 2026-05-09 (스크린샷): status '추론 완료 (timeout)' — worker
// simulation throw 영역 silent console.warn 영역 push 0 → main thread 영역 timeout
// fall-through 영역 root cause 정정.
//
// E1: 'triggerError' push event 영역 ensurePushHandler 영역 listener 영역 wire.
// E2: triggerError handler 영역 emitBackendEvent('snn-error') 영역 dispatch +
//     LiveTickDetail (silent winner=-1) 영역 emit (caller 영역 token match reset 정합).
// E3: source='reinforce' + targetCluster 영역 LiveTickDetail 영역 동봉.
// E4: dispose 영역 listener unsubscribe — 후속 triggerError push 영역 emitTick 0.

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

interface LiveTickDetailLite {
  rates: number[];
  winner: number;
  trialToken?: number;
  source?: string;
  targetCluster?: number;
}

interface SnnErrorDetail {
  source: string;
  message: string;
  context?: unknown;
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

describe('LiveSnn — triggerError push event handling (QA FINDING-4 2026-05-10)', () => {
  it('E1: triggerError push event 영역 ensurePushHandler 영역 listener wire', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    live.triggerAsync();
    await new Promise((r) => setTimeout(r, 10));
    // ensurePushHandler 영역 'triggerComplete' + 'reinforceComplete' + 'triggerError'
    // 영역 모두 wire — pushHandlers 영역 'triggerError' key 영역 1+ listener 정합.
    const errorHandlers = mocks.pushHandlers.get('triggerError') ?? [];
    expect(errorHandlers.length).toBeGreaterThanOrEqual(1);
    live.dispose();
  });

  it('E2: triggerError 영역 emitBackendEvent("snn-error") + LiveTickDetail (silent winner=-1) emit', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    let lastTick: LiveTickDetailLite | null = null;
    const winListener = (e: Event) => {
      lastTick = (e as CustomEvent<LiveTickDetailLite>).detail;
    };
    window.addEventListener('handface.live-snn.tick', winListener);
    live.triggerAsync();
    await new Promise((r) => setTimeout(r, 10));
    const handlers = mocks.pushHandlers.get('triggerError') ?? [];
    expect(handlers.length).toBeGreaterThanOrEqual(1);
    handlers[0]({
      trialToken: 1,
      source: 'trigger',
      error: 'simulated worker fail',
    });
    // emitBackendEvent('snn-error') — source='rpc'.
    const errorEvent = mocks.emittedEvents.find((e) => e.name === 'snn-error');
    expect(errorEvent).toBeDefined();
    const errDetail = errorEvent!.detail as SnnErrorDetail;
    expect(errDetail.source).toBe('rpc');
    expect(errDetail.message).toBe('simulated worker fail');
    // LiveTickDetail — silent winner=-1, rates=[0,0,0,0], trialToken=1, source='trigger'.
    expect(lastTick).not.toBeNull();
    if (lastTick !== null) {
      const t: LiveTickDetailLite = lastTick;
      expect(t.winner).toBe(-1);
      expect(t.rates).toEqual([0, 0, 0, 0]);
      expect(t.trialToken).toBe(1);
      expect(t.source).toBe('trigger');
    }
    window.removeEventListener('handface.live-snn.tick', winListener);
    live.dispose();
  });

  it('E3: source="reinforce" + targetCluster 영역 LiveTickDetail 영역 동봉', async () => {
    const live = new LiveSnn();
    live.setPattern([0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
    let lastTick: LiveTickDetailLite | null = null;
    const winListener = (e: Event) => {
      lastTick = (e as CustomEvent<LiveTickDetailLite>).detail;
    };
    window.addEventListener('handface.live-snn.tick', winListener);
    live.reinforceAsync(2, 0.8);
    await new Promise((r) => setTimeout(r, 10));
    const handlers = mocks.pushHandlers.get('triggerError') ?? [];
    expect(handlers.length).toBeGreaterThanOrEqual(1);
    handlers[0]({
      trialToken: 1,
      source: 'reinforce',
      error: 'simulated reinforce fail',
      targetCluster: 2,
    });
    expect(lastTick).not.toBeNull();
    if (lastTick !== null) {
      const t: LiveTickDetailLite = lastTick;
      expect(t.source).toBe('reinforce');
      expect(t.targetCluster).toBe(2);
      expect(t.winner).toBe(-1);
    }
    window.removeEventListener('handface.live-snn.tick', winListener);
    live.dispose();
  });

  it('E4: dispose 영역 listener unsubscribe — 후속 triggerError push 영역 emitTick 0', async () => {
    const live = new LiveSnn();
    live.setPattern([1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    live.triggerAsync();
    await new Promise((r) => setTimeout(r, 10));
    const handlersBefore = mocks.pushHandlers.get('triggerError') ?? [];
    expect(handlersBefore.length).toBeGreaterThanOrEqual(1);
    live.dispose();
    const handlersAfter = mocks.pushHandlers.get('triggerError') ?? [];
    expect(handlersAfter.length).toBe(0);
  });
});
