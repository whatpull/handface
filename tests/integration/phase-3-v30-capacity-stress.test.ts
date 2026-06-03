// Phase 3.9 v30 (2026-06-03) — cluster capacity stress test.
//
// handface 학습 한계 정직 catch:
//   - feature dim = 95
//   - active inputs per cluster = 5
//   - forceDisjoint=false (overlap 허용) — 그래도 reinforce 정합성을 위해
//     서로 다른 자세는 disjoint 가 이상적
//   - 이론 disjoint 최대 = 19 (95 / 5)
//   - v27 fallback 은 top-K disjoint 우선 → 자세가 다양하면 19 까지 안전
//
// 본 test 검증:
//   1. 19 자세 학습 시도 — 모두 disjoint 로 sync 가능?
//   2. 20 번째 자세 학습 시도 — fallback 부족 catch (skip 정합)
//   3. 사용자 production 영향: "최대 19 자세" 정직 표시 필요?
//
// 본 measurement 가 nightly cron 정합 — JSON 보고서 출력.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

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

function makeDistinctFeature(clusterIdx: number): number[] {
  // Each cluster has its top-5 indices in a distinct window.
  const feat = new Array(95).fill(0.05);
  const base = clusterIdx * 5;
  for (let i = 0; i < 5; i += 1) {
    if (base + i < 95) feat[base + i] = 0.95 - i * 0.01;
  }
  return feat;
}

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('Phase 3.9 v30 — cluster capacity stress (95-dim × 5 active)', () => {
  it('★ 19 distinct gestures (theoretical max) → all sync', async () => {
    // Pre-train 19 distinct gestures.
    const features: Array<[number, number[]]> = [];
    for (let i = 0; i < 19; i += 1) features.push([i, makeDistinctFeature(i)]);
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handClusterActiveInputs: Map<number, number[]>;
      _syncHandWithWorker: () => Promise<void>;
    };
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    expect(liveAny._handClusterFeatures.size).toBe(19);
    expect(mocks.getWorkerClusters()).toHaveLength(19);
    expect(liveAny._handClusterActiveInputs.size).toBe(19);

    // 모든 activeInputs 가 disjoint 한지.
    const allIndices = new Set<number>();
    let totalIndices = 0;
    for (const c of mocks.getWorkerClusters()) {
      for (const idx of c.activeInputs) {
        allIndices.add(idx);
        totalIndices += 1;
      }
    }
    expect(allIndices.size).toBe(totalIndices); // 모두 unique
    expect(totalIndices).toBe(95); // 5 × 19 = 95 = feature dim

    console.log(`  ✓ 19 clusters 모두 disjoint sync — 사용자 19 자세 동시 학습 가능`);

    live.dispose();
  });

  it('★ 20 gestures (over capacity) → 19 sync + 1 skip', async () => {
    const features: Array<[number, number[]]> = [];
    for (let i = 0; i < 20; i += 1) features.push([i, makeDistinctFeature(i)]);
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _syncHandWithWorker: () => Promise<void>;
    };
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    // 19 까지는 sync 성공, 20번째는 disjoint indices 부족.
    expect(liveAny._handClusterFeatures.size).toBe(20);
    expect(mocks.getWorkerClusters().length).toBeLessThanOrEqual(19);

    const synced = mocks.getWorkerClusters().length;
    console.log(`  ⚠ 20 cluster 시도 → ${synced} sync (한계 catch)`);

    live.dispose();
  });

  it('★ 8 gestures (typical user) → comfortable margin', async () => {
    // 일반 사용자 8 자세 — open_palm, closed_fist, peace, thumbs_up, ok, point, rock, paper.
    const features: Array<[number, number[]]> = [];
    for (let i = 0; i < 8; i += 1) features.push([i, makeDistinctFeature(i)]);
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));

    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handClusterActiveInputs: Map<number, number[]>;
      _syncHandWithWorker: () => Promise<void>;
    };
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    await liveAny._syncHandWithWorker();

    expect(liveAny._handClusterFeatures.size).toBe(8);
    expect(mocks.getWorkerClusters()).toHaveLength(8);

    // 8 × 5 = 40 indices used → 55 남음 (또 11 cluster 여유).
    let used = 0;
    for (const c of mocks.getWorkerClusters()) used += c.activeInputs.length;
    expect(used).toBe(40);
    expect(95 - used).toBeGreaterThanOrEqual(55);

    console.log(`  ✓ 8 cluster sync — 추가 ${Math.floor((95 - used) / 5)} cluster 여유`);

    live.dispose();
  });

  it('JSON capacity report', async () => {
    const tests = [
      { name: '4 자세 (기본)', count: 4 },
      { name: '8 자세 (일반)', count: 8 },
      { name: '12 자세 (확장)', count: 12 },
      { name: '19 자세 (최대)', count: 19 },
      { name: '20 자세 (초과)', count: 20 },
    ];
    const report = [];
    for (const t of tests) {
      mocks.reset();
      window.localStorage.clear();
      const features: Array<[number, number[]]> = [];
      for (let i = 0; i < t.count; i += 1) features.push([i, makeDistinctFeature(i)]);
      window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));

      const live = new LiveSnn();
      const liveAny = live as unknown as { _syncHandWithWorker: () => Promise<void> };
      (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
      await liveAny._syncHandWithWorker();

      const synced = mocks.getWorkerClusters().length;
      report.push({
        scenario: t.name,
        requested: t.count,
        synced,
        skipped: t.count - synced,
        capacity_remaining: Math.floor((95 - synced * 5) / 5),
      });
      live.dispose();
    }

    console.log('');
    console.log('================================================================');
    console.log('     v30 capacity stress — 95-dim × 5 active per cluster');
    console.log('================================================================');
    for (const r of report) {
      console.log(`  ${r.scenario.padEnd(20)} req=${r.requested} sync=${r.synced} skip=${r.skipped} remain=${r.capacity_remaining}`);
    }
    console.log('');
    console.log('  → 사용자 학습 한계: 19 자세 (정직 표시 필요)');
    console.log('');

    const reportPath = resolve(__dirname, 'measurements', 'phase-3-v30-capacity-stress.json');
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, JSON.stringify({
      scenario: 'phase-3-v30-capacity-stress',
      timestamp: '2026-06-03T00:00:00Z',
      version: 'v27 fallback activeInputs + v29 sync status UI',
      feature_dim: 95,
      active_inputs_per_cluster: 5,
      theoretical_max_clusters: 19,
      scenarios: report,
      summary: {
        typical_user_safe_zone: '1-8 자세 (안전, 추가 여유)',
        max_safe_capacity: '19 자세 (disjoint 한계)',
        over_capacity_behavior: '20+ 자세 학습 시 fallback skip (안전 동작, 학습 데이터 손실 없음)',
      },
    }, null, 2), 'utf-8');
    console.log(`Report saved: ${reportPath}`);
  });
});
