// Phase 3.9 v33 (2026-06-03) — deleteHandCluster method unit test.
//
// 사용자 가치: 19 자세 도달 시 일부 자세만 삭제 가능 (전체 초기화 회피).
// deleteHandCluster 가 LiveSnn 상태 + localStorage 모두 정합 + sync flag reset.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    client: { on: vi.fn(() => () => undefined) },
    lab: { save: vi.fn(async () => 1) },
    status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind: 'orientation-hand' as const,
  })),
  purgeAllLearningData: vi.fn(async () => {}),
}));
vi.mock('@/lib/snn/out-exemplars', () => ({
  incrementCount: vi.fn(),
  loadExemplars: vi.fn().mockReturnValue({}),
  setExemplarLabel: vi.fn(),
}));
vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: vi.fn(),
  onBackendEvent: vi.fn(() => () => undefined),
}));

import { LiveSnn } from '@/lib/snn/live-snn';

const FEATURES_KEY = 'handface.live-snn.hand-cluster-feats.v1';
const ACTIVE_KEY = 'handface.live-snn.hand-cluster-active.v1';

beforeEach(() => {
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('v33 deleteHandCluster — per-cluster 삭제', () => {
  it('★ 정상 삭제: cluster 1 제거 → 0, 2 보존', () => {
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0.1)],
      [1, new Array(95).fill(0.2)],
      [2, new Array(95).fill(0.3)],
    ]));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify([
      [0, [10, 11, 12, 13, 14]],
      [1, [20, 21, 22, 23, 24]],
      [2, [30, 31, 32, 33, 34]],
    ]));

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handClusterActiveInputs: Map<number, number[]>;
      _handSyncedWithWorker: boolean;
    };

    // Force sync state to verify reset.
    liveAny._handSyncedWithWorker = true;
    expect(liveAny._handClusterFeatures.size).toBe(3);

    const result = live.deleteHandCluster(1);
    expect(result.deleted).toBe(true);
    expect(result.remaining).toBe(2);

    // Memory state: 0, 2 보존, 1 제거.
    expect(liveAny._handClusterFeatures.has(0)).toBe(true);
    expect(liveAny._handClusterFeatures.has(1)).toBe(false);
    expect(liveAny._handClusterFeatures.has(2)).toBe(true);
    expect(liveAny._handClusterActiveInputs.has(1)).toBe(false);

    // sync flag reset → 다음 substrate switch 시 worker 정합.
    expect(liveAny._handSyncedWithWorker).toBe(false);

    // localStorage persist.
    const savedFeats = JSON.parse(window.localStorage.getItem(FEATURES_KEY)!) as Array<[number, number[]]>;
    const savedActive = JSON.parse(window.localStorage.getItem(ACTIVE_KEY)!) as Array<[number, number[]]>;
    expect(savedFeats.map((e) => e[0])).toEqual([0, 2]);
    expect(savedActive.map((e) => e[0])).toEqual([0, 2]);

    live.dispose();
  });

  it('존재하지 않는 cluster 삭제 → deleted=false, sync flag 영향 0', () => {
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0.5)],
    ]));

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handSyncedWithWorker: boolean;
    };

    liveAny._handSyncedWithWorker = true;

    const result = live.deleteHandCluster(99);
    expect(result.deleted).toBe(false);
    expect(result.remaining).toBe(1);
    // sync flag 변경 없음 — 실제 변경 없으니 worker resync 불필요.
    expect(liveAny._handSyncedWithWorker).toBe(true);

    live.dispose();
  });

  it('grid substrate 영향 없음 — early return', () => {
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify([
      [0, new Array(95).fill(0.5)],
    ]));
    const live = new LiveSnn();
    // grid substrate 로 설정.
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-6x6';

    const result = live.deleteHandCluster(0);
    expect(result.deleted).toBe(false);
    // hand cluster features 는 그대로 — grid path 에서는 영향 안 줌.
    const liveAny = live as unknown as { _handClusterFeatures: Map<number, number[]> };
    expect(liveAny._handClusterFeatures.size).toBe(1);

    live.dispose();
  });

  it('★ 통합: 19 자세 → cluster 5 삭제 → 18 → 새 자세 학습 가능', () => {
    // 19 자세 학습된 상태 (v30 capacity 한계).
    const features: Array<[number, number[]]> = [];
    const actives: Array<[number, number[]]> = [];
    for (let i = 0; i < 19; i += 1) {
      const feat = new Array(95).fill(0);
      feat[i * 5] = 0.9;
      features.push([i, feat]);
      actives.push([i, [i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4]]);
    }
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(actives));

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as { _handClusterFeatures: Map<number, number[]> };
    expect(liveAny._handClusterFeatures.size).toBe(19);

    // 사용자가 cluster 5 (덜 쓰는 자세) 삭제.
    const result = live.deleteHandCluster(5);
    expect(result.deleted).toBe(true);
    expect(result.remaining).toBe(18);

    // 다음 학습 가능 — cap 19 미만.
    expect(liveAny._handClusterFeatures.size).toBe(18);
    expect(liveAny._handClusterFeatures.has(5)).toBe(false);

    live.dispose();
  });
});
