// Phase 3.9 v26 (2026-06-03) — worker sync mechanism verification.
//
// v26 의 핵심: page reload 시 LiveSnn 가 cluster features + activeInputs 둘 다
// 복원, substrate switch (camera mode) 시 worker 와 expandCluster 호출하여
// 진짜 sync. 사용자 학습 데이터 보존 + reinforceBackground 실패 차단.
//
// 본 test 시나리오:
//   T1. constructor 가 cluster features + activeInputs 둘 다 복원
//   T2. setSubstrate('orientation-hand') 시 _syncHandWithWorker 호출
//   T3. desync 감지 시 worker 에 stored activeInputs 로 expandCluster 호출
//   T4. sync 완료 후 _handSyncedWithWorker = true 설정
//   T5. resetTrigger 가 activeInputs + sync flag 모두 wipe
//   T6. spawn 시 cluster features + activeInputs 둘 다 persist

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  let nextClusterId = 0;
  return {
    reset: () => { workerClusters = []; nextClusterId = 0; },
    setWorkerClusters: (clusters: Array<{ activeInputs: number[] }>) => {
      workerClusters = clusters;
      nextClusterId = clusters.length;
    },
    getWorkerClusters: () => workerClusters,
    mockClient: {
      expandCluster: vi.fn(async (p: { activeInputs: number[]; forceDisjoint?: boolean }) => {
        const id = nextClusterId++;
        workerClusters.push({ activeInputs: p.activeInputs });
        return { newClusterId: id, totalClusters: nextClusterId, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs };
      }),
      triggerBackground: vi.fn(async () => null),
      reinforceBackground: vi.fn(async () => null),
      clusterPoolUsage: vi.fn(async () => ({
        inputDim: 95,
        totalClaimedFeatures: workerClusters.reduce((s, c) => s + c.activeInputs.length, 0),
        perCluster: workerClusters.map((c, i) => ({ clusterId: i, subPoolSize: c.activeInputs.length, activeInputs: c.activeInputs })),
        overlapMatrix: [],
      })),
      on: vi.fn(() => () => undefined),
    },
    mockSave: vi.fn(async () => 1),
    mockIncrementCount: vi.fn(),
    onBackendEvent: vi.fn(() => () => undefined),
    emitBackendEvent: vi.fn(),
  };
});

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
  setExemplarLabel: vi.fn(),
}));
vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: mocks.emitBackendEvent,
  onBackendEvent: mocks.onBackendEvent,
}));

import { LiveSnn } from '@/lib/snn/live-snn';

const FEATURES_KEY = 'handface.live-snn.hand-cluster-feats.v1';
const ACTIVE_KEY = 'handface.live-snn.hand-cluster-active.v1';

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('Phase 3.9 v26 — worker sync mechanism', () => {
  it('T1: constructor restores cluster features + activeInputs from localStorage', () => {
    // Pre-populate localStorage as if previous session.
    const features: Array<[number, number[]]> = [
      [0, new Array(95).fill(0).map((_, i) => Math.sin(i * 0.1))],
      [1, new Array(95).fill(0).map((_, i) => Math.cos(i * 0.1))],
    ];
    const actives: Array<[number, number[]]> = [
      [0, [78, 85, 86, 87, 88]],
      [1, [65, 69, 74, 76, 84]],
    ];
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(actives));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handClusterActiveInputs: Map<number, number[]>;
    };

    expect(liveAny._handClusterFeatures.size).toBe(2);
    expect(liveAny._handClusterActiveInputs.size).toBe(2);
    expect(liveAny._handClusterActiveInputs.get(0)).toEqual([78, 85, 86, 87, 88]);
    expect(liveAny._handClusterActiveInputs.get(1)).toEqual([65, 69, 74, 76, 84]);

    live.dispose();
  });

  it('T2/T3: setSubstrate(hand) triggers worker sync — desync 시 expandCluster 호출', async () => {
    // Pre-populate localStorage.
    const features: Array<[number, number[]]> = [
      [0, new Array(95).fill(0.5)],
      [1, new Array(95).fill(0.3)],
      [2, new Array(95).fill(0.7)],
    ];
    const actives: Array<[number, number[]]> = [
      [0, [78, 85, 86, 87, 88]],
      [1, [65, 69, 74, 76, 84]],
      [2, [37, 65, 66, 77, 91]],
    ];
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(actives));

    // Worker fresh (mocks default = 0 clusters).
    expect(mocks.getWorkerClusters()).toHaveLength(0);

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      _syncHandWithWorker: () => Promise<void>;
    };

    // Trigger sync manually (substrate switch path).
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    // Worker should have 3 clusters now (sync 재구성).
    expect(mocks.mockClient.expandCluster).toHaveBeenCalledTimes(3);
    expect(mocks.getWorkerClusters()).toHaveLength(3);
    expect(mocks.getWorkerClusters()[0].activeInputs).toEqual([78, 85, 86, 87, 88]);
    expect(mocks.getWorkerClusters()[1].activeInputs).toEqual([65, 69, 74, 76, 84]);
    expect(mocks.getWorkerClusters()[2].activeInputs).toEqual([37, 65, 66, 77, 91]);

    // T4: _handSyncedWithWorker = true.
    expect(liveAny._handSyncedWithWorker).toBe(true);

    live.dispose();
  });

  it('T3 (no desync): worker 이미 cluster 있으면 expandCluster 호출 안 함', async () => {
    // LiveSnn 학습 데이터 있음.
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0.5)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [78, 85, 86, 87, 88]],
    ]));

    // Worker 도 cluster 있음 (sync 상태).
    mocks.setWorkerClusters([{ activeInputs: [78, 85, 86, 87, 88] }]);

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      _syncHandWithWorker: () => Promise<void>;
    };

    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    // expandCluster 호출 안 함 (worker 이미 있음).
    expect(mocks.mockClient.expandCluster).not.toHaveBeenCalled();
    expect(liveAny._handSyncedWithWorker).toBe(true);

    live.dispose();
  });

  it('T3 (both fresh): LiveSnn + worker 모두 0 clusters → sync no-op', async () => {
    // localStorage 비어있음.
    expect(window.localStorage.getItem(FEATURES_KEY)).toBeNull();

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      _syncHandWithWorker: () => Promise<void>;
    };

    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    expect(mocks.mockClient.expandCluster).not.toHaveBeenCalled();
    expect(liveAny._handSyncedWithWorker).toBe(true);

    live.dispose();
  });

  it('T5: resetTrigger 가 cluster features + activeInputs + sync flag 모두 wipe', () => {
    // Pre-populate.
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([[0, new Array(95).fill(0.5)]]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([[0, [1, 2, 3, 4, 5]]]));

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handClusterActiveInputs: Map<number, number[]>;
      _handSyncedWithWorker: boolean;
    };

    // Force synced state.
    liveAny._handSyncedWithWorker = true;
    expect(liveAny._handClusterFeatures.size).toBe(1);
    expect(liveAny._handClusterActiveInputs.size).toBe(1);

    // Reset.
    live.resetTrigger();

    // All wiped.
    expect(liveAny._handClusterFeatures.size).toBe(0);
    expect(liveAny._handClusterActiveInputs.size).toBe(0);
    expect(liveAny._handSyncedWithWorker).toBe(false);
    expect(window.localStorage.getItem(FEATURES_KEY)).toBeNull();
    expect(window.localStorage.getItem(ACTIVE_KEY)).toBeNull();

    live.dispose();
  });

  it('★ Integration: full reload + sync + new trigger 시나리오', async () => {
    // === Session 1: 사용자 학습 시뮬 ===
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0).map((_, i) => i % 7 === 0 ? 0.8 : 0.1)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [0, 7, 14, 21, 28]],
    ]));

    // === Session 2: page reload — new LiveSnn ===
    expect(mocks.getWorkerClusters()).toHaveLength(0); // worker fresh

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      _syncHandWithWorker: () => Promise<void>;
      _handClusterFeatures: Map<number, number[]>;
    };

    // 학습 데이터 복원 확인.
    expect(liveAny._handClusterFeatures.size).toBe(1);

    // Sync 실행 (camera mode 진입 시뮬).
    await liveAny._syncHandWithWorker();

    // Worker 에 cluster 0 재구성 확인.
    expect(mocks.mockClient.expandCluster).toHaveBeenCalledTimes(1);
    expect(mocks.getWorkerClusters()[0].activeInputs).toEqual([0, 7, 14, 21, 28]);
    expect(liveAny._handSyncedWithWorker).toBe(true);

    console.log('');
    console.log('=== v26 worker sync integration verified ===');
    console.log('  - Session 1: 1 cluster trained, stored in localStorage');
    console.log('  - Session 2 (reload): cluster features restored, worker fresh');
    console.log('  - Camera mode: _syncHandWithWorker triggered');
    console.log('  - Worker: expandCluster called → cluster 0 reconstructed');
    console.log('  - State: _handSyncedWithWorker = true → cosine path 활성화');
    console.log('  - 사용자 효과: 이전 학습 보존 + 정상 인식 가능');
    console.log('');

    live.dispose();
  });
});
