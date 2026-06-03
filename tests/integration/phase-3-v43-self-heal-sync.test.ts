// Phase 3.9 v43 (2026-06-04) — self-heal sync mechanism.
//
// 다층 defense (v42 setSubstrate idempotent 추가):
//   - reinforce 실패 ("targetCluster N 범위 밖") catch → 자동 sync force trigger
//   - 다음 trigger 영역 정상 reinforce 가능
//   - production 영역 silent stuck state 차단

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  let reinforceShouldFail = false;
  return {
    reset: () => { workerClusters = []; reinforceShouldFail = false; },
    setReinforceShouldFail: (v: boolean) => { reinforceShouldFail = v; },
    getWorkerClusters: () => workerClusters,
    setWorkerClusters: (c: Array<{ activeInputs: number[] }>) => { workerClusters = c; },
    mockClient: {
      expandCluster: vi.fn(async (p: { activeInputs: number[] }) => {
        const id = workerClusters.length;
        workerClusters.push({ activeInputs: p.activeInputs });
        return { newClusterId: id, totalClusters: workerClusters.length, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs };
      }),
      triggerBackground: vi.fn(async () => null),
      reinforceBackground: vi.fn(async (p: { targetCluster: number }) => {
        if (reinforceShouldFail || workerClusters.length === 0 || workerClusters[p.targetCluster] === undefined) {
          throw new Error(`targetCluster ${p.targetCluster} 범위 밖 (slots ${workerClusters.length})`);
        }
        return null;
      }),
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

describe('v43 self-heal sync — reinforce 실패 영역 자동 re-sync', () => {
  it('★ reinforce "targetCluster 범위 밖" 영역 sync re-trigger', async () => {
    // Pre-existing 학습 데이터 (v26+ data).
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
    // 영역 sync state true 영역 set (production stuck state 시뮬).
    liveAny._handSyncedWithWorker = true;
    expect(mocks.getWorkerClusters()).toHaveLength(0); // worker fresh (desync)

    // reinforce 호출 → 실패 → self-heal 영역 sync trigger.
    live.reinforceAsync(0, 0.3);
    await new Promise((r) => setTimeout(r, 100));

    // v43 fix 영역: reinforce 실패 영역 _handSyncedWithWorker 영역 false 영역 reset +
    // sync re-trigger → worker 영역 cluster 영역 재구성.
    expect(mocks.mockClient.expandCluster).toHaveBeenCalledTimes(1);
    expect(mocks.getWorkerClusters()).toHaveLength(1);
    // sync 완료 후 _handSyncedWithWorker = true.
    expect(liveAny._handSyncedWithWorker).toBe(true);

    console.log('  ✓ v43 self-heal: reinforce 실패 → sync re-trigger → worker 1/1 재구성');

    live.dispose();
  });

  it('reinforce 영역 다른 error → self-heal 영역 trigger 안 함', async () => {
    // 영역 worker 영역 cluster 영역 있음.
    mocks.setWorkerClusters([{ activeInputs: [1, 2, 3, 4, 5] }]);

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };
    liveAny.substrateKind = 'orientation-hand';
    liveAny._handSyncedWithWorker = true;

    // reinforce 영역 worker 영역 다른 영역 throw (영역 "범위 밖" 영역 없음).
    mocks.mockClient.reinforceBackground.mockImplementationOnce(async () => {
      throw new Error('worker 영역 영역 영역 영역 영역 실패');
    });

    live.reinforceAsync(0, 0.3);
    await new Promise((r) => setTimeout(r, 50));

    // self-heal 영역 trigger 안 함 — sync state 영역 영향 안 줌.
    expect(mocks.mockClient.expandCluster).not.toHaveBeenCalled();
    expect(liveAny._handSyncedWithWorker).toBe(true);

    live.dispose();
  });

  it('grid substrate 영역 reinforce 실패 → self-heal 영역 trigger 안 함', async () => {
    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };
    liveAny.substrateKind = 'orientation-6x6';
    liveAny._handSyncedWithWorker = true;

    // grid 영역 reinforce 영역 "범위 밖" 발생 (다른 path).
    mocks.mockClient.reinforceBackground.mockImplementationOnce(async () => {
      throw new Error('targetCluster 5 범위 밖 (slots 4)');
    });

    live.reinforceAsync(5, 0.3);
    await new Promise((r) => setTimeout(r, 50));

    // hand path 영역 self-heal 영역 grid 영역 영향 안 줌.
    expect(mocks.mockClient.expandCluster).not.toHaveBeenCalled();

    live.dispose();
  });

  it('★ production 시나리오 통합: v42 fail + v43 self-heal → 정상 복원', async () => {
    // Production 15:18: 사용자 1 자세 학습.
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0).map((_, i) => i % 7 === 0 ? 0.8 : 0.1)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [0, 7, 14, 21, 28]],
    ]));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };

    // 시뮬: substrateKind 이미 hand, sync state stuck true (예: previous session
    // sync 성공 후 worker reset 영역 desync 영역 catch 영역 — race).
    liveAny.substrateKind = 'orientation-hand';
    liveAny._handSyncedWithWorker = true;
    expect(mocks.getWorkerClusters()).toHaveLength(0);

    // 1st trigger → cosine MATCH (sync 영역 정합 catch 안 됨) → reinforce 실패.
    live.reinforceAsync(0, 0.3);
    await new Promise((r) => setTimeout(r, 100));

    // v43 self-heal: sync re-trigger → cluster 0 재구성.
    expect(mocks.getWorkerClusters()).toHaveLength(1);

    // 2nd trigger → 정상 동작 (worker 영역 cluster 있음).
    live.reinforceAsync(0, 0.3);
    await new Promise((r) => setTimeout(r, 50));

    // reinforce 영역 2번째 호출 영역 success 영역 호출 안 throw.
    expect(mocks.mockClient.reinforceBackground).toHaveBeenCalledTimes(2);

    console.log('  ✓ production 15:18 시나리오: v42 (setSubstrate) + v43 (self-heal) 다층 defense');

    live.dispose();
  });
});
