// LiveSnn — forcedExact bypass of auto-learn race-gate (사용자 catch 2026-05-12).
//
// 사용자 catch (auto-learn-progress + forced-exact 모순):
//   스크린샷: INFER winner=패턴 4 [EXACT] STABLE 표시 영역 단 OUT count
//   패턴 4=0. 학습 #127 진행 중 (_autoLearnInFlight.size > 0) 영역
//   forced-exact deterministic match 영역 emitTick incrementCount 영역
//   race-gate (PR #224) 영역 skip catch → 사용자 mental model "deterministic
//   template match 영역 즉시 +1" 영역 mismatch.
//
// Fix logic:
//   forcedExact=true 영역 race-gate bypass — 매 forced trigger 영역 +1.
//   single-source double-increment 회피 영역 _forcedExactIncrementedClusters
//   Set 영역 mark (in-flight cluster id) — runAutoLearnLoop finally commit
//   영역 member check + skip + clear.
//
// 학술 정합: Carpenter-Grossberg 1987 ART F2 resonance — exact template match
//   영역 deterministic winner (stochastic fire rate 영역 영역 영역) → trial
//   counter 영역 즉시 fire 영역 자연 정합.
//
// Tests:
//   F1: forced winner + isAutoLearning (_autoLearnInFlight.size > 0) →
//       incrementCount fire (+1).
//   F2: non-forced winner + isAutoLearning → skip (PR #224 race-gate 보존).
//   F3: forced winner + 학습 완료 후 (in-flight empty) → 매 trigger +1
//       (PR #242 per-trigger 정합).
//   F4: forced winner 영역 in-flight cluster id 영역 emitTick increment +
//       runAutoLearnLoop finally commit 영역 동일 cluster id 영역 skip
//       (no double-increment).

import { beforeEach, describe, expect, it, vi } from 'vitest';

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
    kind: 'orientation-5x5' as const,
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

type LiveSnnInternals = {
  _autoLearnInFlight: Set<number>;
  _forcedExactIncrementedClusters: Set<number>;
  lastWinnerCluster: number;
  emitTick: (
    cfr: {
      rates: number[];
      winner: number;
      share: number;
      margin: number;
      inputMatch: number;
      layer: 'OUT' | 'V1_L23' | 'V2_L5';
      forcedExact?: boolean;
    },
    v1Hz?: number,
    v2Hz?: number,
  ) => void;
  runAutoLearnLoop: (token: number, activeInputs: number[]) => Promise<void>;
};

beforeEach(() => {
  mocks.mockReinforceBackground.mockClear();
  mocks.mockExpandCluster.mockClear();
  mocks.mockSave.mockClear();
  mocks.mockClient.on.mockClear();
  mocks.mockIncrementCount.mockClear();
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
  }
});

describe('LiveSnn — forcedExact bypass of race-gate (forced-exact-bypass-race-gate 2026-05-12)', () => {
  it('F1: forced winner + isAutoLearning → incrementCount fire (+1)', () => {
    const live = new LiveSnn();
    // P218 (substrate upgrade): 5×5 raw-dim → row 1 (indices 5..9) active.
    const pattern = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    live.setPattern(pattern);
    const liveAny = live as unknown as LiveSnnInternals;
    // simulate runAutoLearnLoop in flight — cluster 4 영역 register.
    liveAny._autoLearnInFlight.add(4);
    expect(liveAny._autoLearnInFlight.size).toBeGreaterThan(0);

    // emitTick with forced-exact winner=4.
    liveAny.emitTick({
      rates: [0, 0, 0, 0, 12],
      winner: 4,
      share: 1,
      margin: 1,
      inputMatch: 1,
      layer: 'OUT',
      forcedExact: true,
    });
    // forced-exact 영역 race-gate bypass → +1.
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_4_0', 'orientation-5x5', pattern);
    // mark set (finally commit double-increment guard).
    expect(liveAny._forcedExactIncrementedClusters.has(4)).toBe(true);
    live.dispose();
  });

  it('F2: non-forced winner + isAutoLearning → skip (PR #224 race-gate 보존)', () => {
    const live = new LiveSnn();
    live.setPattern([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    const liveAny = live as unknown as LiveSnnInternals;
    liveAny._autoLearnInFlight.add(4);

    liveAny.emitTick({
      rates: [0, 0, 0, 0, 12],
      winner: 4,
      share: 0.8,
      margin: 0.5,
      inputMatch: 0.6,
      layer: 'OUT',
      forcedExact: false,
    });
    // non-forced 영역 race-gate skip.
    expect(mocks.mockIncrementCount).not.toHaveBeenCalled();
    // mark 0 (in-flight 영역 forced bypass 영역만 mark).
    expect(liveAny._forcedExactIncrementedClusters.has(4)).toBe(false);
    live.dispose();
  });

  it('F3: forced winner + 학습 완료 후 (in-flight empty) → 매 trigger +1', () => {
    const live = new LiveSnn();
    live.setPattern([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    const liveAny = live as unknown as LiveSnnInternals;
    expect(liveAny._autoLearnInFlight.size).toBe(0); // 학습 완료 후 상태.

    for (let i = 0; i < 3; i += 1) {
      liveAny.emitTick({
        rates: [0, 0, 0, 0, 12],
        winner: 4,
        share: 1,
        margin: 1,
        inputMatch: 1,
        layer: 'OUT',
        forcedExact: true,
      });
    }
    // PR #242 per-trigger 정합 — 매 valid winner trigger 영역 +1.
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(3);
    // in-flight empty 영역 mark add 영역 (forced bypass mark 영역 in-flight 영역만 set).
    expect(liveAny._forcedExactIncrementedClusters.size).toBe(0);
    live.dispose();
  });

  it('F4: forced winner emitTick increment + runAutoLearnLoop finally commit → no double', async () => {
    const live = new LiveSnn();
    const pattern = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    live.setPattern(pattern);
    const liveAny = live as unknown as LiveSnnInternals;

    // Phase 1: 학습 시작 → cluster 4 register (manual simulation 영역 직접 add —
    // 실제 path 영역 runAutoLearnLoop.expandClusterAsync 영역 add). 단 본 test 영역
    // emitTick bypass + finally commit guard 영역 single-source 검증 영역 필요 영역
    // 영역 — runAutoLearnLoop 영역 자연 실행 path 영역 emitTick 영역 외부 영역 fire
    // 영역 정합 영역 영역 — 직접 manual hybrid scenario:
    //   1) _autoLearnInFlight.add(4) — 학습 시작 sim.
    //   2) forced-exact emitTick → incrementCount +1 + mark set.
    //   3) runAutoLearnLoop.finally 영역 mark check + skip increment + clear mark.
    liveAny._autoLearnInFlight.add(4);
    liveAny.emitTick({
      rates: [0, 0, 0, 0, 12],
      winner: 4,
      share: 1,
      margin: 1,
      inputMatch: 1,
      layer: 'OUT',
      forcedExact: true,
    });
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    expect(liveAny._forcedExactIncrementedClusters.has(4)).toBe(true);

    // Phase 2: runAutoLearnLoop 실행 — finally commit 영역 mark check.
    // mock 영역 newClusterId=4 정합 (mockExpandCluster).
    await liveAny.runAutoLearnLoop(1, [4, 5, 6, 7]);
    // finally commit 영역 mark hit 영역 skip → still 1 (no double).
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    // mark consumed (clear).
    expect(liveAny._forcedExactIncrementedClusters.has(4)).toBe(false);
    // _autoLearnInFlight 영역 cleanup (race-gate normal).
    expect(liveAny._autoLearnInFlight.has(4)).toBe(false);
    // lastWinnerCluster 영역 신규 cluster 영역 set (idempotent gate 정합).
    expect(liveAny.lastWinnerCluster).toBe(4);
    live.dispose();
  });

  it('F5: runAutoLearnLoop 영역 forced bypass mark 영역 시 finally 영역 commit fire', async () => {
    // forced bypass 영역 fire 영역 영역 영역 (mark 0) 영역 finally commit 영역
    // 자연 fire — 기존 PR #224 race-gate finally commit semantic 보존.
    const live = new LiveSnn();
    live.setPattern([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    const liveAny = live as unknown as LiveSnnInternals;
    await liveAny.runAutoLearnLoop(1, [4, 5, 6, 7]);
    // PR #224 semantic 보존 — finally commit 영역 신규 cluster 영역 +1.
    expect(mocks.mockIncrementCount).toHaveBeenCalledTimes(1);
    expect(mocks.mockIncrementCount).toHaveBeenCalledWith('out_4_0', 'orientation-5x5', expect.any(Array));
    live.dispose();
  });
});
