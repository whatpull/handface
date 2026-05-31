// LiveSnn — cluster commit (Catch 1) + trialCount hydrate (Catch 2).
//
// 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix):
//   Catch 1: "갑작스럽게 패턴4 학습이 완료되었는데 사라짐 (다른 패턴 추론시 사라졌음)".
//     root cause — runAutoLearnLoop 영역 30회 reinforce 진행 중 _autoLearnInFlight
//     gate 영역 incrementCount skip → 학습 완료 시점 영역 신규 cluster 영역
//     영구 incrementCount fire 0 → exemplars 영역 신규 cluster 영역 store 0
//     → 다음 winner 변경 시점 영역 cluster row source (exemplars + winner.cluster
//     floor) 영역 derive 0 → cluster row 사라짐.
//     fix — runAutoLearnLoop finally 영역 신규 cluster 영역 explicit incrementCount
//     fire (학습 완료 commit semantic).
//
//   Catch 2: "새로고침시 학습 상황이 초기화 되는데, 이는 유지되었으면 좋겠습니다".
//     root cause — trialCount 영역 in-memory only (singleton field) → page
//     reload 영역 fresh init 영역 0 reset.
//     fix — trialCount 영역 substrate 별 localStorage persist + reload hydrate.
//
// Test cases:
//   C1: runAutoLearnLoop success 영역 신규 cluster 영역 incrementCount 1회 fire
//       (substrate kind + featSnap 동봉).
//   C2: runAutoLearnLoop success 영역 lastWinnerCluster 영역 신규 cluster 영역 set
//       (다음 emitTick 영역 동일 winner 영역 idempotent skip 정합).
//   C3: trialCount 영역 emitTick 시점 영역 localStorage persist (substrate key 정합).
//   C4: LiveSnn 영역 fresh constructor 영역 localStorage trialCount 영역 hydrate.
//   C5: setSubstrate 영역 swap 영역 신규 substrate 영역 trialCount 영역 별도 hydrate.
//   C6: resetTrigger 영역 localStorage trialCount 영역 wipe.

import { describe, expect, it, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => {
  type AnyPayload = Record<string, unknown>;
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
    reinforceBackground: mockReinforceBackground,
    expandCluster: mockExpandCluster,
    on: vi.fn(() => () => undefined),
  };
  const mockSave = vi.fn(async () => 1);
  const onBackendEvent = vi.fn(() => () => undefined);
  const emitBackendEvent = vi.fn();
  const mockIncrementCount = vi.fn();
  return {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: mocks.mockClient as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lab: { save: mocks.mockSave } as any,
    status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind: 'orientation-6x6' as const,
  })),
}));

vi.mock('@/lib/snn/out-exemplars', () => ({
  incrementCount: mocks.mockIncrementCount,
  loadExemplars: vi.fn().mockReturnValue({}),
}));

vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: mocks.emitBackendEvent,
  onBackendEvent: mocks.onBackendEvent,
}));

import { LiveSnn } from '@/lib/snn/live-snn';

const TRIAL_COUNT_KEY = 'handface.live-snn.trial-count.v1';

beforeEach(() => {
  mocks.mockReinforceBackground.mockClear();
  mocks.mockExpandCluster.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockClient.on.mockClear();
  mocks.mockIncrementCount.mockClear();
  // localStorage 영역 fresh — 각 test 영역 격리.
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
  }
});

describe('LiveSnn — cluster commit + trialCount hydrate (cluster-evict-hydrate-fix 2026-05-11)', () => {
  it('C1: runAutoLearnLoop success 영역 신규 cluster 영역 incrementCount 1회 fire', async () => {
    const live = new LiveSnn();
    // patternRef 영역 set — featSnap 영역 동봉 정합.
    // P218 (substrate upgrade): 5×5 raw-dim (25) → row 1 (indices 5..9) active.
    const pattern = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    live.setPattern(pattern);

    // private runAutoLearnLoop 영역 reflective access — caller path 영역 ART
    // vigilance miss 영역 dispatch path 영역 등가 시뮬레이션.
    const liveAny = live as unknown as {
      runAutoLearnLoop: (token: number, activeInputs: number[]) => Promise<void>;
      _trialTokenSeq: number;
    };
    await liveAny.runAutoLearnLoop(1, [4, 5, 6, 7]);

    // 30회 reinforce 진행 중 영역 _autoLearnInFlight gate 영역 incrementCount skip —
    // 단 finally 영역 신규 cluster 영역 explicit fire (학습 완료 commit).
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    const [outKey, substrate, featSnap] = mocks.mockIncrementCount.mock.calls[0];
    expect(outKey).toBe('out_4_0'); // newClusterId=4 (mockExpandCluster 정합).
    expect(substrate).toBe('orientation-6x6');
    expect(featSnap).toEqual(pattern);
    live.dispose();
  });

  it('C2: runAutoLearnLoop success 영역 lastWinnerCluster 영역 신규 cluster 영역 set', async () => {
    const live = new LiveSnn();
    // P218 (substrate upgrade): 5×5 raw-dim (25) → row 1 (indices 5..9) active.
    live.setPattern([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const liveAny = live as unknown as {
      runAutoLearnLoop: (token: number, activeInputs: number[]) => Promise<void>;
      lastWinnerCluster: number;
    };
    expect(liveAny.lastWinnerCluster).toBe(-1); // initial sentinel.
    await liveAny.runAutoLearnLoop(1, [4, 5, 6, 7]);
    // 학습 완료 commit 영역 lastWinnerCluster 영역 신규 cluster (4) 영역 set —
    // 사용자 catch 2026-05-12 (increment-per-trigger): 직전 idempotent gate 폐기
    // 후 영역 lastWinnerCluster 영역 tracking 영역 보존 (race-gate auto-learn
    // finally commit 영역 부수 — 학습 완료 직후 cluster id catch).
    expect(liveAny.lastWinnerCluster).toBe(4);
    live.dispose();
  });

  it('C3: trialCount 영역 emitTick 시점 영역 localStorage persist (substrate key 정합)', () => {
    const live = new LiveSnn();
    const liveAny = live as unknown as {
      trialCount: number;
      emitTick: (cfr: unknown, v1Hz?: number, v2Hz?: number) => void;
    };
    liveAny.trialCount = 7;
    const cfr = {
      rates: [1, 0, 0, 0],
      winner: 0,
      share: 1,
      margin: 1,
      inputMatch: 0.9,
      layer: 'OUT' as const,
    };
    liveAny.emitTick(cfr, 0, 0);
    // localStorage 영역 substrate key (orientation-6x6) 영역 persist 정합.
    const stored = window.localStorage.getItem(`${TRIAL_COUNT_KEY}.orientation-6x6`);
    expect(stored).toBe('7');
    live.dispose();
  });

  it('C4: LiveSnn fresh constructor 영역 localStorage trialCount 영역 hydrate', () => {
    // pre-seed — 페이지 reload 영역 시뮬레이션 (직전 세션 영역 trialCount=42 영역 persist).
    window.localStorage.setItem(`${TRIAL_COUNT_KEY}.orientation-6x6`, '42');
    const live = new LiveSnn();
    const liveAny = live as unknown as { trialCount: number };
    expect(liveAny.trialCount).toBe(42);
    live.dispose();
  });

  it('C5: setSubstrate swap 영역 신규 substrate 영역 trialCount 영역 별도 hydrate', async () => {
    // pre-seed — orientation-6x6=10, gesture=20 영역 별도 store.
    window.localStorage.setItem(`${TRIAL_COUNT_KEY}.orientation-6x6`, '10');
    window.localStorage.setItem(`${TRIAL_COUNT_KEY}.gesture`, '20');
    const live = new LiveSnn();
    const liveAny = live as unknown as { trialCount: number };
    expect(liveAny.trialCount).toBe(10); // default substrate=orientation-6x6.
    await live.setSubstrate('gesture');
    expect(liveAny.trialCount).toBe(20); // swap 영역 별도 hydrate.
    await live.setSubstrate('orientation-6x6');
    expect(liveAny.trialCount).toBe(10); // swap-back 영역 별도 hydrate.
    live.dispose();
  });

  it('C6: resetTrigger 영역 localStorage trialCount 영역 wipe', () => {
    window.localStorage.setItem(`${TRIAL_COUNT_KEY}.orientation-6x6`, '99');
    const live = new LiveSnn();
    const liveAny = live as unknown as { trialCount: number };
    expect(liveAny.trialCount).toBe(99);
    live.resetTrigger();
    expect(liveAny.trialCount).toBe(0);
    expect(window.localStorage.getItem(`${TRIAL_COUNT_KEY}.orientation-6x6`)).toBeNull();
    live.dispose();
  });
});
