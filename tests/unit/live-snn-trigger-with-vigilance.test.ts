// LiveSnn — triggerWithVigilance + ART unsupervised auto-learn (PR-K 2026-05-09 catch 1).
//
// 사용자 catch (catch 1): "추론 버튼이 곧 학습 적용(자동) = 처음 만나는 패턴일
// 경우 30회 자동 학습 후, 패턴 기억". 본 test 영역 ART vigilance path 영역
// 검증:
//   V1: triggerWithVigilance 호출 → triggerBackground RPC (stdpGain=0) 1회.
//   V2: vigilance miss (winner -1 또는 margin < threshold) 시점 영역
//       expandCluster RPC 1회 + reinforceBackground RPC × 30 (5 chunk × 6 round).
//   V3: vigilance pass (margin >= threshold) 시점 영역 expand/reinforce 0 호출.
//   V4: empty pattern (activeInputs 0) 영역 auto-learn skip.
//   V5: trialToken 영역 final chunk 영역 originalToken reuse — caller 영역 token match.

import { describe, expect, it, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => {
  // explicit args type 영역 catch — mock.calls[0][0] 영역 type 추론 path 영역 정합.
  type AnyPayload = Record<string, unknown>;
  const mockTriggerBackground = vi.fn<(p: AnyPayload) => Promise<null>>(async () => null);
  const mockReinforceBackground = vi.fn<(p: AnyPayload) => Promise<null>>(async () => null);
  const mockExpandCluster = vi.fn(async (_payload: { activeInputs: number[] }) => {
    void _payload;
    return {
      newClusterId: 4,
      totalClusters: 5,
      neuronsAdded: 96,
      synapsesAdded: 1200,
      activeInputs: [4, 5, 6, 7],
    };
  });
  const mockClient = {
    triggerBackground: mockTriggerBackground,
    reinforceBackground: mockReinforceBackground,
    expandCluster: mockExpandCluster,
    on: vi.fn(() => () => undefined),
  };
  const mockSave = vi.fn(async () => 1);
  const onBackendEvent = vi.fn(() => () => undefined);
  const emitBackendEvent = vi.fn();
  const mockIncrementCount = vi.fn();
  return {
    mockTriggerBackground,
    mockReinforceBackground,
    mockExpandCluster,
    mockClient,
    mockSave,
    onBackendEvent,
    emitBackendEvent,
    mockIncrementCount,
  };
});

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    client: mocks.mockClient,
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
  mocks.mockTriggerBackground.mockClear();
  mocks.mockReinforceBackground.mockClear();
  mocks.mockExpandCluster.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockClient.on.mockClear();
});

describe('LiveSnn — triggerWithVigilance (PR-K 2026-05-09 catch 1)', () => {
  it('V1: triggerWithVigilance → triggerBackground RPC (stdpGain=0) 1회', async () => {
    const live = new LiveSnn();
    const pattern = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]; // horizontal.
    const { trialToken } = live.triggerWithVigilance(pattern, 0.15);
    expect(trialToken).toBeGreaterThan(0);
    // fire-and-forget — microtask wait 영역 worker dispatch 완료 catch.
    await new Promise((r) => setTimeout(r, 10));
    expect(mocks.mockTriggerBackground).toHaveBeenCalledTimes(1);
    const payload = mocks.mockTriggerBackground.mock.calls[0][0] as {
      stdpGain: number;
      pattern: number[];
      trialToken: number;
    };
    expect(payload.stdpGain).toBe(0); // STDP off — measure pass.
    expect(payload.pattern).toEqual(pattern);
    expect(payload.trialToken).toBe(trialToken);
    live.dispose();
  });

  it('V2: vigilance miss (margin < threshold) → expandCluster + 30 reinforce', async () => {
    const live = new LiveSnn();
    const pattern = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    const { trialToken } = live.triggerWithVigilance(pattern, 0.15);
    await new Promise((r) => setTimeout(r, 10));
    // vigilance follow-up 영역 handleTriggerComplete 영역 dispatch — 직접
    // payload 영역 simulate. _vigilancePending 영역 catch + handleTriggerComplete
    // 영역 호출 (private — 단 push handler 영역 emit 영역 정합 path 영역 검증).
    // 직접 simulate — handleTriggerComplete 영역 reflective access.
    const cfr = {
      rates: [0.5, 0.5, 0.5, 0.5],
      winner: 0,
      share: 0.25,
      margin: 0.05, // < 0.15 → vigilance miss.
      layer: 'OUT' as const,
    };
    // private method 영역 access 영역 reflection — handleTriggerComplete 영역
    // _vigilancePending 영역 catch 영역 expandCluster + reinforce loop 영역 trigger.
    const liveAny = live as unknown as {
      handleTriggerComplete: (root: unknown, payload: unknown) => void;
    };
    const root = {
      lab: { save: mocks.mockSave },
      client: mocks.mockClient,
    };
    liveAny.handleTriggerComplete(root, {
      trialToken,
      cfr,
      v1Hz: 0,
      v2Hz: 0,
      netTime: 100,
    });
    // expandCluster + reinforceBackground × 30 영역 worker sequential serial —
    // microtask drain 영역 wait. 30 reinforceBackground × await + expandCluster
    // = 31 RPC catch (sequential).
    await new Promise((r) => setTimeout(r, 200));
    expect(mocks.mockExpandCluster).toHaveBeenCalledTimes(1);
    expect(mocks.mockExpandCluster).toHaveBeenCalledWith({ activeInputs: [4, 5, 6, 7] });
    // 30 trial = 5 chunk × 6 round.
    expect(mocks.mockReinforceBackground).toHaveBeenCalledTimes(30);
    // 첫 reinforce payload 영역 newClusterId=4 (mockExpandCluster 정합) target.
    const firstReinforce = mocks.mockReinforceBackground.mock.calls[0][0] as {
      targetCluster: number;
      rewardGain: number;
    };
    expect(firstReinforce.targetCluster).toBe(4);
    expect(firstReinforce.rewardGain).toBe(0.8);
    live.dispose();
  });

  it('V3: vigilance pass (margin >= threshold) → expand/reinforce 0 호출', async () => {
    const live = new LiveSnn();
    const pattern = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    const { trialToken } = live.triggerWithVigilance(pattern, 0.15);
    await new Promise((r) => setTimeout(r, 10));
    // vigilance pass — margin 0.5 >= 0.15.
    const cfr = {
      rates: [10, 1, 1, 1],
      winner: 0,
      share: 0.77,
      margin: 0.9,
      layer: 'OUT' as const,
    };
    const liveAny = live as unknown as {
      handleTriggerComplete: (root: unknown, payload: unknown) => void;
    };
    const root = { lab: { save: mocks.mockSave }, client: mocks.mockClient };
    liveAny.handleTriggerComplete(root, {
      trialToken,
      cfr,
      v1Hz: 0,
      v2Hz: 0,
      netTime: 100,
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(mocks.mockExpandCluster).not.toHaveBeenCalled();
    expect(mocks.mockReinforceBackground).not.toHaveBeenCalled();
    live.dispose();
  });

  it('V4: empty pattern (activeInputs 0) → auto-learn skip', async () => {
    const live = new LiveSnn();
    const emptyPattern = new Array(16).fill(0);
    const { trialToken } = live.triggerWithVigilance(emptyPattern, 0.15);
    await new Promise((r) => setTimeout(r, 10));
    // vigilance miss but 빈 pattern — auto-learn skip.
    const cfr = {
      rates: [0, 0, 0, 0],
      winner: -1,
      share: 0,
      margin: 0,
      layer: 'OUT' as const,
    };
    const liveAny = live as unknown as {
      handleTriggerComplete: (root: unknown, payload: unknown) => void;
    };
    const root = { lab: { save: mocks.mockSave }, client: mocks.mockClient };
    liveAny.handleTriggerComplete(root, {
      trialToken,
      cfr,
      v1Hz: 0,
      v2Hz: 0,
      netTime: 100,
    });
    await new Promise((r) => setTimeout(r, 50));
    expect(mocks.mockExpandCluster).not.toHaveBeenCalled();
    expect(mocks.mockReinforceBackground).not.toHaveBeenCalled();
    live.dispose();
  });

  it('V5: expandClusterAsync 영역 worker.expandCluster RPC + cluster registry length ↑', async () => {
    const live = new LiveSnn();
    const result = await live.expandClusterAsync([1, 5, 9, 13]); // vertical.
    expect(mocks.mockExpandCluster).toHaveBeenCalledTimes(1);
    expect(mocks.mockExpandCluster).toHaveBeenCalledWith({ activeInputs: [1, 5, 9, 13] });
    expect(result.newClusterId).toBe(4);
    expect(result.totalClusters).toBe(5);
    live.dispose();
  });

  // Fix #21 (사용자 catch 2026-05-10 — 학습 #1 no winner spawn 실패 root cause):
  // MainThreadTransport fallback path 영역 race regression test. push 'triggerComplete'
  // 영역 fire 영역 client.triggerBackground await resolve 영역 직전 영역 발생 영역
  // _vigilancePending.has(token) 영역 mandatory true. 직전 (pre-fix) 영역 false →
  // runAutoLearnLoop 미호출 → cluster spawn fail (사용자 catch).
  it('V6 [Fix #21]: push triggerComplete 영역 RPC await resolve 직전 fire → vigilance pending 영역 정합 catch', async () => {
    // 별도 mock 영역 race scenario simulate — triggerBackground 영역 await 영역
    // 동안 영역 push handler 영역 trigger.
    let capturedTriggerCallback:
      | ((payload: { trialToken: number; cfr: unknown; v1Hz: number; v2Hz: number; netTime: number }) => void)
      | null = null;
    const localOn = vi.fn((event: string, cb: unknown) => {
      if (event === 'triggerComplete') {
        capturedTriggerCallback = cb as typeof capturedTriggerCallback;
      }
      return () => undefined;
    });
    // race-simulating triggerBackground — push 영역 await resolve 영역 **직전**
    // 영역 fire (queueMicrotask 영역 ack 직전 push enqueue 영역 정합 simulate).
    const localTriggerBackground = vi.fn(async (payload: { trialToken: number }) => {
      // push 영역 await 영역 microtask drain 영역 직전 영역 fire — ack resolve
      // 영역 직전 callback 호출 영역 정합 (MainThreadTransport push-first race).
      if (capturedTriggerCallback) {
        capturedTriggerCallback({
          trialToken: payload.trialToken,
          cfr: { rates: [], winner: -1, share: 0, margin: 0, layer: 'OUT' },
          v1Hz: 0,
          v2Hz: 0,
          netTime: 100,
        });
      }
      return null;
    });
    const localExpandCluster = vi.fn(async () => ({
      newClusterId: 0,
      totalClusters: 1,
      neuronsAdded: 96,
      synapsesAdded: 1200,
      activeInputs: [4, 5, 6, 7],
    }));
    const localReinforceBackground = vi.fn(async () => null);
    const localClient = {
      triggerBackground: localTriggerBackground,
      reinforceBackground: localReinforceBackground,
      expandCluster: localExpandCluster,
      on: localOn,
    };

    // mockClient swap — getRootLocalSnnFor mock 영역 새 client 영역 모든 fetch
    // 영역 reuse (triggerWithVigilance + runAutoLearnLoop 영역 별도 getRootLocalSnnFor
    // 호출 path 영역 동일 client 영역 정합 catch).
    const rootMock = await import('@/lib/snn/root-local-snn');
    const getRootMock = vi.mocked(rootMock.getRootLocalSnnFor);
    getRootMock.mockResolvedValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      client: localClient as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      lab: { save: mocks.mockSave } as any,
      status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
      kind: 'orientation' as const,
    });

    try {
      const live = new LiveSnn();
      const pattern = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]; // horizontal.
      live.triggerWithVigilance(pattern, 0.15);

      // microtask drain — push handler fire + RPC await resolve + runAutoLearnLoop
      // 영역 expandCluster 호출 (chunked reinforce 영역 30회 await 영역 단 시점
      // 영역 expandCluster 영역 첫 호출 영역 catch 충분).
      await new Promise((r) => setTimeout(r, 100));

      // Fix #21 정합: push 영역 fire 시점 영역 _vigilancePending 영역 already set →
      // handleTriggerComplete 영역 vigilance miss path 영역 dispatch → expandCluster
      // 호출. pre-fix 영역 fail (expandCluster 호출 0).
      expect(localExpandCluster).toHaveBeenCalledTimes(1);
      expect(localExpandCluster).toHaveBeenCalledWith({ activeInputs: [4, 5, 6, 7] });

      live.dispose();
    } finally {
      // restore default mock (다른 test 영역 stale resolve 회피).
      getRootMock.mockReset();
      getRootMock.mockImplementation(async () => ({
        client: mocks.mockClient,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lab: { save: mocks.mockSave } as any,
        status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
        kind: 'orientation' as const,
      }));
    }
  });
});
