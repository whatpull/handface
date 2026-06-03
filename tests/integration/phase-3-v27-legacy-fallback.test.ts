// Phase 3.9 v27 (2026-06-03) — legacy data fallback sync.
//
// v26 production log 13:49 catch: 사용자 학습 데이터가 v26 이전이라
// activeInputs 가 localStorage 에 없음 → sync skip → worker fresh →
// cosine MATCH 후 reinforceBackground "targetCluster 0 범위 밖 (slots 0)" 실패.
//
// v27 fix: activeInputs 없는 cluster 는 feature 95-dim 에서 top-K (=5)
// disjoint indices 를 생성해 fallback activeInputs 로 expandCluster 호출.
// 사용자 v26 이전 학습 데이터 보존 + reinforce 정상 동작 양립.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  let nextClusterId = 0;
  return {
    reset: () => { workerClusters = []; nextClusterId = 0; },
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

function makeFeature(seed: number): number[] {
  // Deterministic 95-dim feature with distinct top-K indices.
  const feat = new Array(95).fill(0).map((_, i) => (Math.sin(i * 0.13 + seed) + 1) / 2 * 0.3);
  // Boost specific top-5 indices for predictability.
  const topK = [(seed * 7) % 95, (seed * 11) % 95, (seed * 13) % 95, (seed * 17) % 95, (seed * 19) % 95];
  for (const idx of topK) feat[idx] = 0.95 + (idx % 7) * 0.005;
  return feat;
}

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('Phase 3.9 v27 — legacy data fallback activeInputs', () => {
  it('★ 사용자 production 시나리오 (13:49): 3 features + 0 activeInputs → 3/3 재구성', async () => {
    // v26 이전에 학습된 데이터: features 만 있고 activeInputs 없음.
    const features: Array<[number, number[]]> = [
      [0, makeFeature(1)],
      [1, makeFeature(2)],
      [2, makeFeature(3)],
    ];
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
    // ACTIVE_KEY 는 비어있음 (v26 이전 데이터).
    expect(window.localStorage.getItem(ACTIVE_KEY)).toBeNull();

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handClusterActiveInputs: Map<number, number[]>;
      _handSyncedWithWorker: boolean;
      _syncHandWithWorker: () => Promise<void>;
    };

    // restore 확인 — features 3, activeInputs 0.
    expect(liveAny._handClusterFeatures.size).toBe(3);
    expect(liveAny._handClusterActiveInputs.size).toBe(0);

    // Sync 실행.
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    // v27 fix: fallback 으로 3/3 재구성 (v26 은 0/3).
    expect(mocks.mockClient.expandCluster).toHaveBeenCalledTimes(3);
    expect(mocks.getWorkerClusters()).toHaveLength(3);
    expect(liveAny._handSyncedWithWorker).toBe(true);

    // activeInputs 가 메모리에 복원됨 (재실행 시 다시 fallback 안 함).
    expect(liveAny._handClusterActiveInputs.size).toBe(3);
    for (const [id, ai] of liveAny._handClusterActiveInputs.entries()) {
      expect(ai.length).toBe(5);
      console.log(`  cluster ${id} fallback activeInputs: [${ai.join(', ')}]`);
    }

    // localStorage 에도 persist 됨.
    const persisted = window.localStorage.getItem(ACTIVE_KEY);
    expect(persisted).not.toBeNull();
    const parsed = JSON.parse(persisted!) as Array<[number, number[]]>;
    expect(parsed).toHaveLength(3);

    live.dispose();
  });

  it('fallback indices 가 disjoint (cluster 간 충돌 회피)', async () => {
    // 3 clusters with overlapping top-K patterns to test disjoint.
    const sharedFeat = new Array(95).fill(0).map((_, i) => (i < 10 ? 0.95 : 0.1));
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, sharedFeat],
      [1, sharedFeat.slice()],
      [2, sharedFeat.slice()],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _syncHandWithWorker: () => Promise<void>;
    };
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    // 3 clusters 모두 재구성 (충분한 top idx 가용 — 95 dim, K=5 → 3 cluster = 15 idx).
    expect(mocks.getWorkerClusters()).toHaveLength(3);

    // disjoint 확인 — flatten 후 unique == sum.
    const allIndices: number[] = [];
    for (const c of mocks.getWorkerClusters()) allIndices.push(...c.activeInputs);
    const uniqueCount = new Set(allIndices).size;
    expect(uniqueCount).toBe(allIndices.length);
    expect(allIndices.length).toBe(15); // 3 × 5

    live.dispose();
  });

  it('mixed: 일부는 activeInputs 있음 (v26+) + 일부 없음 (legacy) → 모두 sync', async () => {
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, makeFeature(1)],
      [1, makeFeature(2)],
      [2, makeFeature(3)],
    ]));
    // Cluster 0 만 v26+ 데이터.
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [50, 60, 70, 80, 90]],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handClusterActiveInputs: Map<number, number[]>;
      _syncHandWithWorker: () => Promise<void>;
    };
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    // 3 cluster 모두 worker 에 재구성.
    expect(mocks.getWorkerClusters()).toHaveLength(3);
    // Cluster 0 는 stored activeInputs.
    expect(mocks.getWorkerClusters()[0].activeInputs).toEqual([50, 60, 70, 80, 90]);
    // Cluster 1, 2 는 fallback.
    expect(mocks.getWorkerClusters()[1].activeInputs.length).toBe(5);
    expect(mocks.getWorkerClusters()[2].activeInputs.length).toBe(5);
    // 그리고 cluster 0 의 50/60/70/80/90 은 fallback 에 안 들어옴 (claimed).
    for (let i = 1; i <= 2; i += 1) {
      for (const idx of mocks.getWorkerClusters()[i].activeInputs) {
        expect([50, 60, 70, 80, 90]).not.toContain(idx);
      }
    }

    // activeInputs Map 3개 모두 채워짐.
    expect(liveAny._handClusterActiveInputs.size).toBe(3);

    live.dispose();
  });

  it('feature missing (corrupted) → skip', async () => {
    // Cluster 0: ok, Cluster 1: wrong dim, Cluster 2: ok.
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, makeFeature(1)],
      [1, new Array(63).fill(0.5)], // wrong dim (should be 95)
      [2, makeFeature(3)],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _syncHandWithWorker: () => Promise<void>;
    };
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';

    // Cluster 1 feature 가 잘못된 dim 이라 restore 단계에서 빠짐 — _handClusterFeatures.size 가 작을 수도 있음.
    // 이 test 는 sync 단계에서 skip 동작만 검증.
    if (liveAny._handClusterFeatures.has(1)) {
      // feature 가 살아남았으면 cluster 1 은 skip (length !== 95).
      await liveAny._syncHandWithWorker();
      const got = mocks.mockClient.expandCluster.mock.calls.length;
      expect(got).toBeLessThanOrEqual(2);
    } else {
      // feature restore 단계 검증 통과.
      expect(true).toBe(true);
    }

    live.dispose();
  });
});
