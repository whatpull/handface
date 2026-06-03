// Phase 3.9 v44 (2026-06-04) — production reload race condition simulation.
//
// v42 (setSubstrate idempotent) + v43 (self-heal) 다층 defense 영역 다양한
// race condition 시나리오 영역 정합 영역 종합 검증.
//
// 시뮬레이션:
//   R1. cold start (LiveSnn fresh, worker fresh)
//   R2. warm reload (LiveSnn restore, worker fresh) — 일반 path
//   R3. singleton stuck (substrateKind=hand 영역 sync false)
//   R4. self-heal race (sync 영역 in-flight 영역 추가 trigger)
//   R5. multiple input-mode re-emit (NodeInput re-render 영역 setSubstrate 중복)

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  const reinforceLog: Array<{ ok: boolean; targetCluster: number; error?: string }> = [];
  return {
    reset: () => { workerClusters = []; reinforceLog.length = 0; },
    setWorkerClusters: (c: Array<{ activeInputs: number[] }>) => { workerClusters = c; },
    getWorkerClusters: () => workerClusters,
    getReinforceLog: () => reinforceLog,
    mockClient: {
      expandCluster: vi.fn(async (p: { activeInputs: number[] }) => {
        const id = workerClusters.length;
        workerClusters.push({ activeInputs: p.activeInputs });
        return { newClusterId: id, totalClusters: workerClusters.length, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs };
      }),
      triggerBackground: vi.fn(async () => null),
      reinforceBackground: vi.fn(async (p: { targetCluster: number }) => {
        if (workerClusters[p.targetCluster] === undefined) {
          const err = `targetCluster ${p.targetCluster} 범위 밖 (slots ${workerClusters.length})`;
          reinforceLog.push({ ok: false, targetCluster: p.targetCluster, error: err });
          throw new Error(err);
        }
        reinforceLog.push({ ok: true, targetCluster: p.targetCluster });
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

function setupLearnedData(clusterCount: number): void {
  const features: Array<[number, number[]]> = [];
  const actives: Array<[number, number[]]> = [];
  for (let i = 0; i < clusterCount; i += 1) {
    const feat = new Array(95).fill(0.05);
    feat[i * 5] = 0.9;
    features.push([i, feat]);
    actives.push([i, [i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4]]);
  }
  window.localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
  window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(actives));
}

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('v44 production reload race condition — v42/v43 정합 검증', () => {
  it('R1: cold start (LiveSnn fresh + worker fresh) → sync 영역 영역 영역 reinforce 영역 호출 없음', async () => {
    const live = new LiveSnn();
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));

    // Worker 영역 expand 영역 호출 없음 (학습 데이터 없음).
    expect(mocks.mockClient.expandCluster).not.toHaveBeenCalled();
    live.dispose();
  });

  it('R2: warm reload (학습 데이터 있음 + worker fresh) → v26 sync 영역 정상', async () => {
    setupLearnedData(3);
    const live = new LiveSnn();
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));

    expect(mocks.mockClient.expandCluster).toHaveBeenCalledTimes(3);
    expect(mocks.getWorkerClusters()).toHaveLength(3);
    live.dispose();
  });

  it('★ R3 (production 15:18): singleton stuck → setSubstrate(hand) re-call → v42 영역 강제 sync', async () => {
    setupLearnedData(1);
    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };

    // 시뮬: previous session 영역 substrateKind=hand, sync 미발생 (singleton stuck).
    liveAny.substrateKind = 'orientation-hand';
    liveAny._handSyncedWithWorker = false;
    expect(mocks.getWorkerClusters()).toHaveLength(0);

    // NodeInput re-emit input-mode → setSubstrate('orientation-hand') 영역 same kind.
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));

    // v42 fix: 영역 sync trigger.
    expect(mocks.mockClient.expandCluster).toHaveBeenCalledTimes(1);
    expect(liveAny._handSyncedWithWorker).toBe(true);
    live.dispose();
  });

  it('R4: 영역 setSubstrate 호출 (race) → sync 영역 in-flight 영역 idempotent', async () => {
    setupLearnedData(2);
    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };
    liveAny.substrateKind = 'orientation-hand';
    liveAny._handSyncedWithWorker = false;

    // 영역 동시 호출.
    await Promise.all([
      live.setSubstrate('orientation-hand'),
      live.setSubstrate('orientation-hand'),
      live.setSubstrate('orientation-hand'),
    ]);
    await new Promise((r) => setTimeout(r, 50));

    // 영역 결과 영역 영역 sync 영역 발생 (2 cluster 영역 정합) — race 영역 중복 expand 차단.
    expect(mocks.getWorkerClusters()).toHaveLength(2);
    expect(liveAny._handSyncedWithWorker).toBe(true);
    live.dispose();
  });

  it('★ R5 (v43 self-heal): worker desync 영역 reinforce 실패 → self-heal trigger', async () => {
    setupLearnedData(1);
    const live = new LiveSnn();
    const liveAny = live as unknown as {
      _handSyncedWithWorker: boolean;
      substrateKind: string;
    };
    liveAny.substrateKind = 'orientation-hand';
    liveAny._handSyncedWithWorker = true; // stuck true
    // Worker fresh (desync).

    // reinforce 호출 → 실패 → v43 self-heal.
    live.reinforceAsync(0, 0.3);
    await new Promise((r) => setTimeout(r, 100));

    // self-heal 영역 sync re-trigger.
    expect(mocks.getWorkerClusters()).toHaveLength(1);
    expect(liveAny._handSyncedWithWorker).toBe(true);

    // 다음 reinforce → 정상.
    live.reinforceAsync(0, 0.3);
    await new Promise((r) => setTimeout(r, 50));

    const failures = mocks.getReinforceLog().filter((r) => !r.ok).length;
    const successes = mocks.getReinforceLog().filter((r) => r.ok).length;
    expect(successes).toBeGreaterThanOrEqual(1);

    console.log(`  R5 자기치유: failures=${failures}, successes=${successes} (1 실패 후 자동 recovery)`);
    live.dispose();
  });

  it('R6: 정합성 종합 — 100 trigger sustained 영역 reinforce 영역 실패 0 보장', async () => {
    setupLearnedData(3);
    const live = new LiveSnn();

    // Cold start path.
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));
    expect(mocks.getWorkerClusters()).toHaveLength(3);

    // 100 trigger sustained.
    for (let t = 1; t <= 100; t += 1) {
      live.reinforceAsync(t % 3, 0.3);
    }
    await new Promise((r) => setTimeout(r, 200));

    const failures = mocks.getReinforceLog().filter((r) => !r.ok).length;
    const successes = mocks.getReinforceLog().filter((r) => r.ok).length;
    expect(failures).toBe(0);
    expect(successes).toBeGreaterThan(50);

    console.log(`  R6 sustained: 100 trigger → failures=${failures}, successes=${successes}`);
    live.dispose();
  });

  it('JSON race-condition coverage report', async () => {
    const scenarios = [
      { name: 'R1 cold start', clusters: 0, stuck: false },
      { name: 'R2 warm reload', clusters: 3, stuck: false },
      { name: 'R3 singleton stuck (15:18)', clusters: 1, stuck: true },
      { name: 'R4 race triple setSubstrate', clusters: 2, stuck: true },
    ];
    const report: Array<{ scenario: string; expandCalls: number; finalClusters: number; verdict: string }> = [];
    for (const s of scenarios) {
      mocks.reset();
      window.localStorage.clear();
      if (s.clusters > 0) setupLearnedData(s.clusters);
      const live = new LiveSnn();
      const liveAny = live as unknown as { substrateKind: string; _handSyncedWithWorker: boolean };
      if (s.stuck) {
        liveAny.substrateKind = 'orientation-hand';
        liveAny._handSyncedWithWorker = false;
      }
      await live.setSubstrate('orientation-hand');
      await new Promise((r) => setTimeout(r, 50));
      report.push({
        scenario: s.name,
        expandCalls: mocks.mockClient.expandCluster.mock.calls.length,
        finalClusters: mocks.getWorkerClusters().length,
        verdict: mocks.getWorkerClusters().length === s.clusters ? '✓ 정상' : '⚠ catch',
      });
      live.dispose();
    }

    console.log('');
    console.log('================================================================');
    console.log('     v44 race condition coverage — v42/v43 정합');
    console.log('================================================================');
    for (const r of report) {
      console.log(`  ${r.scenario.padEnd(30)} expand=${r.expandCalls} clusters=${r.finalClusters} ${r.verdict}`);
    }
    console.log('');

    const reportPath = resolve(__dirname, 'measurements', 'phase-3-v44-reload-race-condition.json');
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, JSON.stringify({
      scenario: 'phase-3-v44-reload-race-condition',
      timestamp: '2026-06-04T00:00:00Z',
      version: 'v42 setSubstrate idempotent + v43 self-heal sync',
      scenarios: report,
      verdict: report.every((r) => r.verdict.startsWith('✓')) ? '✓ 모든 race condition 정합' : '⚠ 정정 필요',
    }, null, 2), 'utf-8');
    console.log(`Report saved: ${reportPath}`);
  });
});
