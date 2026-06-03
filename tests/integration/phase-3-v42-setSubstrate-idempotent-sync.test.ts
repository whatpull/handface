// Phase 3.9 v42 (2026-06-04) CRITICAL — setSubstrate hand 영역 idempotent sync.
//
// production catch 15:18:
//   [hand-init] restored 1 cluster features + 1 activeInputs
//   (hand-sync log 영역 영역 — sync 자체 미발생)
//   [hand-cosine] token=1 sim=0.999 MATCH
//   [hand-snn-diag] worker=c-1 agree=false rates=[]
//   [SNNWorkerCore] reinforceBackground failed: targetCluster 0 범위 밖 (slots 0)
//
// 근본 원인:
//   - LiveSnn singleton 영역 page reload 후 substrateKind 이미 'orientation-hand'
//   - NodeInput re-emit input-mode 'camera' → setSubstrate('orientation-hand')
//   - if (this.substrateKind === kind) return; → sync skip
//   - 사용자 학습 데이터 영역 worker fresh 영역 영원히 desync
//
// v42 fix: setSubstrate early return path 영역 hand substrate + sync state false
// 영역 강제 sync 호출.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  return {
    reset: () => { workerClusters = []; },
    getWorkerClusters: () => workerClusters,
    mockClient: {
      expandCluster: vi.fn(async (p: { activeInputs: number[] }) => {
        const id = workerClusters.length;
        workerClusters.push({ activeInputs: p.activeInputs });
        return { newClusterId: id, totalClusters: workerClusters.length, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs };
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

describe('v42 CRITICAL — setSubstrate(hand) idempotent sync', () => {
  it('★ production 15:18 reproduction: substrateKind 이미 hand + sync false → 강제 sync', async () => {
    // Production: 사용자 1 자세 학습 (features + activeInputs 둘 다 있음).
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0).map((_, i) => i % 7 === 0 ? 0.9 : 0.1)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [0, 7, 14, 21, 28]],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      _syncHandWithWorker: () => Promise<void>;
      substrateKind: string;
    };

    // Simulate previous state: substrate 이미 'orientation-hand', sync 안 됨.
    liveAny.substrateKind = 'orientation-hand';
    liveAny._handSyncedWithWorker = false;
    expect(mocks.getWorkerClusters()).toHaveLength(0); // worker fresh

    // v42 path: setSubstrate('orientation-hand') 호출 — 같은 kind early return,
    // 단 hand + sync false → 강제 sync trigger.
    await live.setSubstrate('orientation-hand');

    // Wait for async sync (void 호출 영역 microtask 마무리).
    await new Promise((r) => setTimeout(r, 50));

    // v42 fix 효과: sync 발생.
    expect(mocks.mockClient.expandCluster).toHaveBeenCalledTimes(1);
    expect(mocks.getWorkerClusters()).toHaveLength(1);
    expect(liveAny._handSyncedWithWorker).toBe(true);

    console.log(`  ✓ v42 fix: setSubstrate idempotent → 강제 sync → worker ${mocks.getWorkerClusters().length}/1 재구성`);

    live.dispose();
  });

  it('이미 sync 완료 시 → 중복 sync 차단 (idempotent)', async () => {
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0.5)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [10, 20, 30, 40, 50]],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };

    liveAny.substrateKind = 'orientation-hand';
    liveAny._handSyncedWithWorker = true; // 이미 sync 완료

    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));

    // 중복 sync 호출 안 함.
    expect(mocks.mockClient.expandCluster).not.toHaveBeenCalled();

    live.dispose();
  });

  it('grid → hand 첫 switch: 기존 v26 path 유지 (regression 차단)', async () => {
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0).map((_, i) => i === 0 ? 0.9 : 0.1)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [0, 1, 2, 3, 4]],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };

    // grid → hand 첫 switch (v26 path).
    expect(liveAny.substrateKind).not.toBe('orientation-hand');
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));

    // v26 path: sync 발생.
    expect(mocks.mockClient.expandCluster).toHaveBeenCalled();
    expect(liveAny._handSyncedWithWorker).toBe(true);

    live.dispose();
  });

  it('hand → grid → hand re-switch: 두 번째 hand 시점 영역 sync 영역 정합', async () => {
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0).map((_, i) => i === 0 ? 0.9 : 0.1)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [0, 1, 2, 3, 4]],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };

    // 1st: grid → hand.
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));
    const firstCalls = mocks.mockClient.expandCluster.mock.calls.length;
    expect(firstCalls).toBeGreaterThan(0);

    // 2nd: hand → grid.
    await live.setSubstrate('orientation-6x6');
    await new Promise((r) => setTimeout(r, 50));

    // 3rd: grid → hand 영역 두 번째 진입.
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));

    // 두 번째 hand 영역 sync 영역 sync 정합 (workerInitial=1 영역 desync 없음 → 추가 호출 안 함).
    // 단 path 영역 통과해야 함 — substrate switch 영역 _handSyncedWithWorker false 영역
    // 재set 영역 sync 다시 호출.
    expect(mocks.mockClient.clusterPoolUsage).toHaveBeenCalled();

    live.dispose();
  });
});
