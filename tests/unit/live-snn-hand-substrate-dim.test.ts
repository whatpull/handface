// Phase 3.9 v14 regression test (2026-06-03):
// rawDimForKind 의 'orientation-hand' 누락 catch.
//
// 사용자 production catch: setPattern 이 95-dim 을 16-dim 으로 truncate 하여
// _handClusterFeatures.set 호출 안 됨 → cosine sim path 전체 동작 안 함.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockClient: {
    expandCluster: vi.fn(async (p: { activeInputs: number[] }) => ({
      newClusterId: 0, totalClusters: 1, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs,
    })),
    triggerBackground: vi.fn(async () => null),
    reinforceBackground: vi.fn(async () => null),
    clusterPoolUsage: vi.fn(async () => ({ inputDim: 95, totalClaimedFeatures: 0, perCluster: [], overlapMatrix: [] })),
    on: vi.fn(() => () => undefined),
  },
  mockSave: vi.fn(async () => 1),
  mockIncrementCount: vi.fn(),
  onBackendEvent: vi.fn(() => () => undefined),
  emitBackendEvent: vi.fn(),
}));

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: mocks.mockClient as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lab: { save: mocks.mockSave } as any,
    status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind: 'orientation-hand' as const,
  })),
  purgeAllLearningData: vi.fn(async () => {}),
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

beforeEach(() => {
  if (typeof window !== 'undefined') window.localStorage.clear();
  vi.clearAllMocks();
});
afterEach(() => {});

describe('Phase 3.9 v14 — rawDimForKind hand substrate regression', () => {
  it('★ setPattern with hand substrate: 95-dim pattern preserved (not truncated)', () => {
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';

    // 95-dim pattern with negative values (z coords, ext deltas).
    const pattern = new Array<number>(95);
    for (let i = 0; i < 95; i += 1) pattern[i] = (i - 47) * 0.01;  // -0.47 to +0.48

    live.setPattern(pattern);

    // patternRef should be 95-dim (not truncated to 16).
    const liveAny = live as unknown as { patternRef: number[] };
    expect(liveAny.patternRef).toHaveLength(95);

    // Negative values should be preserved (no clamping).
    expect(liveAny.patternRef[0]).toBeCloseTo(-0.47, 5);
    expect(liveAny.patternRef[47]).toBeCloseTo(0, 5);
    expect(liveAny.patternRef[94]).toBeCloseTo(0.47, 5);

    live.dispose();
  });

  it('★ setPattern with orientation-6x6 substrate: 36-dim raw + [0,1] clamp', () => {
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-6x6';

    const pattern = new Array<number>(36).fill(0);
    pattern[0] = -0.5;  // should clamp to 0
    pattern[5] = 1.5;   // should clamp to 1
    pattern[10] = 0.7;  // valid

    live.setPattern(pattern);

    const liveAny = live as unknown as { patternRef: number[] };
    expect(liveAny.patternRef).toHaveLength(36);
    expect(liveAny.patternRef[0]).toBe(0);  // clamped from -0.5
    expect(liveAny.patternRef[5]).toBe(1);  // clamped from 1.5
    expect(liveAny.patternRef[10]).toBe(0.7);  // unchanged

    live.dispose();
  });

  it('★ runAutoLearnLoop on hand substrate: _handClusterFeatures populated after spawn', async () => {
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';

    // Set 95-dim pattern via setPattern.
    const pattern = new Array<number>(95);
    for (let i = 0; i < 95; i += 1) pattern[i] = Math.sin(i * 0.1) * 0.5;
    live.setPattern(pattern);

    // Verify patternRef has 95 elements (critical for v14 fix).
    const liveAny = live as unknown as {
      patternRef: number[];
      runAutoLearnLoop: (token: number, ai: number[]) => Promise<void>;
      _handClusterFeatures: Map<number, number[]>;
    };
    expect(liveAny.patternRef).toHaveLength(95);

    // Call runAutoLearnLoop (spawn flow).
    await liveAny.runAutoLearnLoop(1, [0, 1, 2, 3, 4]);

    // _handClusterFeatures should now contain the spawned cluster's training feature.
    expect(liveAny._handClusterFeatures.size).toBe(1);
    expect(liveAny._handClusterFeatures.get(0)).toHaveLength(95);

    // Saved feature should match the pattern.
    const saved = liveAny._handClusterFeatures.get(0)!;
    for (let i = 0; i < 95; i += 1) {
      expect(saved[i]).toBeCloseTo(pattern[i], 5);
    }

    live.dispose();
  });

  it('★ Production scenario: 2 consecutive triggers same pose → cosine sim path activated', () => {
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';

    const liveAny = live as unknown as {
      patternRef: number[];
      _handClusterFeatures: Map<number, number[]>;
      _handCosineWinner: Map<number, { clusterId: number; sim: number }>;
      _maybeRecordHandCosineWinner: (token: number, p: number[]) => void;
    };

    // Step 1: First trigger pattern + manual spawn simulation (mock the worker side).
    const pose1 = new Array<number>(95);
    for (let i = 0; i < 95; i += 1) pose1[i] = Math.sin(i * 0.1);
    live.setPattern(pose1);
    expect(liveAny.patternRef).toHaveLength(95);

    // Simulate cluster 0 spawn (runAutoLearnLoop would normally do this).
    liveAny._handClusterFeatures.set(0, liveAny.patternRef.slice());

    // Step 2: Second trigger same pose.
    live.setPattern(pose1);
    expect(liveAny.patternRef).toHaveLength(95);

    // Now _maybeRecordHandCosineWinner should find cluster 0 as winner.
    liveAny._maybeRecordHandCosineWinner(2, liveAny.patternRef);

    // After v14 fix, cosine winner should be detected (size > 0 + cosine high).
    const winner = liveAny._handCosineWinner.get(2);
    expect(winner).toBeDefined();
    expect(winner?.clusterId).toBe(0);
    expect(winner?.sim).toBeGreaterThan(0.99); // same pose → cosine ≈ 1.0

    live.dispose();
  });
});
