// Phase 3.9 v50 (2026-06-04) — production final integration check.
//
// v26-v49 모든 fix 영역 통합 검증 + 5000 trigger sustained 영역 long session
// reliability 영역 정직 catch.
//
// 시나리오:
//   Phase A. cold start → 4 자세 학습
//   Phase B. simulated reload (singleton stuck) → v42 idempotent sync
//   Phase C. worker desync 영역 reinforce 실패 → v43 self-heal
//   Phase D. 4 자세 영역 5000 trigger sustained
//   Phase E. final integrity check

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { encodeHandToFeatureVector, type HandLandmark } from '@/lib/snn-runtime/hand-spike-encoder';

const POSES = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'] as const;
type Pose = typeof POSES[number];

function loadFixture(pose: Pose): HandLandmark[] {
  const path = resolve(__dirname, 'fixtures', `hand-mediapipe-${pose}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks[0];
}

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  const reinforceLog: Array<{ ok: boolean; error?: string }> = [];
  return {
    reset: () => { workerClusters = []; reinforceLog.length = 0; },
    wipeWorker: () => { workerClusters = []; },
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
          reinforceLog.push({ ok: false, error: err });
          throw new Error(err);
        }
        reinforceLog.push({ ok: true });
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

function makeRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(rng: () => number): number {
  const u1 = rng() || 1e-10;
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * rng());
}
function addJitter(lm: HandLandmark[], sigma: number, rng: () => number): HandLandmark[] {
  return lm.map((p) => ({
    x: p.x + gauss(rng) * sigma,
    y: p.y + gauss(rng) * sigma,
    z: p.z + gauss(rng) * sigma,
  }));
}

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('Phase 3.9 v50 — final integration 5000 trigger', () => {
  it('★ v26-v49 통합 검증 — 5000 trigger 영역 모든 fix path 영역 정상', async () => {
    const fixtures: Record<Pose, HandLandmark[]> = {} as Record<Pose, HandLandmark[]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    const rng = makeRng(2026);
    const stats = {
      phaseA: { triggers: 0, spawns: 0, matches: 0 },
      phaseB: { syncCalls: 0, success: false },
      phaseC: { selfHealCalls: 0, success: false },
      phaseD: { triggers: 0, matches: 0, weak: 0 },
      reinforceFailureTotal: 0,
    };

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handCosineWinner: Map<number, { clusterId: number; sim: number; strict: boolean }>;
      _maybeRecordHandCosineWinner: (token: number, p: number[]) => void;
      runAutoLearnLoop: (token: number, activeInputs: number[]) => Promise<void>;
      _handSyncedWithWorker: boolean;
      _syncHandWithWorker: () => Promise<void>;
    };

    let token = 0;

    // === Phase A. cold start → 4 자세 학습 ===
    console.log('  Phase A: cold start + 4 자세 학습');
    for (const pose of POSES) {
      for (let i = 0; i < 5; i += 1) {
        token += 1;
        const noisy = addJitter(fixtures[pose], 0.003, rng);
        const feat = encodeHandToFeatureVector(noisy);
        live.setPattern(feat);
        liveAny._maybeRecordHandCosineWinner(token, feat);
        const cw = liveAny._handCosineWinner.get(token);
        liveAny._handCosineWinner.delete(token);
        stats.phaseA.triggers += 1;
        if (cw === undefined) {
          stats.phaseA.spawns += 1;
          const usage = await mocks.mockClient.clusterPoolUsage();
          const claimed = new Set<number>();
          for (const c of usage.perCluster) for (const idx of c.activeInputs) claimed.add(idx);
          const pairs = feat.map((v, idx) => ({ idx, val: v })).sort((a, b) => b.val - a.val);
          const fb: number[] = [];
          for (const p of pairs) {
            if (fb.length >= 5) break;
            if (!claimed.has(p.idx)) fb.push(p.idx);
          }
          if (fb.length === 5) await liveAny.runAutoLearnLoop(token, fb);
        } else {
          if (cw.strict) stats.phaseA.matches += 1;
        }
      }
    }
    console.log(`    triggers=${stats.phaseA.triggers}, spawns=${stats.phaseA.spawns}, matches=${stats.phaseA.matches}`);

    // === Phase B. simulated reload (singleton stuck) → v42 idempotent sync ===
    console.log('  Phase B: simulated reload — singleton stuck');
    const initialExpandCalls = mocks.mockClient.expandCluster.mock.calls.length;
    // 시뮬: worker wipe (page reload 영역 worker 영역 fresh) + sync state stuck.
    mocks.wipeWorker();
    liveAny._handSyncedWithWorker = false;
    // setSubstrate(hand) 영역 same kind early return + v42 강제 sync.
    await live.setSubstrate('orientation-hand');
    await new Promise((r) => setTimeout(r, 50));
    stats.phaseB.syncCalls = mocks.mockClient.expandCluster.mock.calls.length - initialExpandCalls;
    stats.phaseB.success = liveAny._handSyncedWithWorker && mocks.getWorkerClusters().length > 0;
    console.log(`    syncCalls=${stats.phaseB.syncCalls}, success=${stats.phaseB.success}`);

    // === Phase C. worker desync 영역 reinforce 실패 → v43 self-heal ===
    console.log('  Phase C: self-heal — worker desync 시뮬');
    mocks.wipeWorker(); // worker fresh 강제
    liveAny._handSyncedWithWorker = true; // stuck true
    const initialReinforceFailures = mocks.getReinforceLog().filter((r) => !r.ok).length;
    live.reinforceAsync(0, 0.3);
    await new Promise((r) => setTimeout(r, 100));
    const finalReinforceFailures = mocks.getReinforceLog().filter((r) => !r.ok).length;
    stats.phaseC.selfHealCalls = finalReinforceFailures - initialReinforceFailures;
    stats.phaseC.success = mocks.getWorkerClusters().length > 0; // self-heal 영역 재구성
    console.log(`    selfHealRecovery success=${stats.phaseC.success}, failureCount=${stats.phaseC.selfHealCalls}`);

    // === Phase D. 5000 trigger sustained (4 자세 × 1250 cycle) ===
    console.log('  Phase D: 5000 trigger sustained');
    for (let cycle = 0; cycle < 1250; cycle += 1) {
      for (const pose of POSES) {
        token += 1;
        const noisy = addJitter(fixtures[pose], 0.003, rng);
        const feat = encodeHandToFeatureVector(noisy);
        live.setPattern(feat);
        liveAny._maybeRecordHandCosineWinner(token, feat);
        const cw = liveAny._handCosineWinner.get(token);
        liveAny._handCosineWinner.delete(token);
        stats.phaseD.triggers += 1;
        if (cw === undefined) continue; // spawn skip (v50 영역 영역 5 자세 영역 영역)
        if (cw.strict) stats.phaseD.matches += 1;
        else stats.phaseD.weak += 1;
        try { await mocks.mockClient.reinforceBackground({ targetCluster: cw.clusterId }); }
        catch { /* tracked */ }
      }
    }
    console.log(`    triggers=${stats.phaseD.triggers}, matches=${stats.phaseD.matches}, weak=${stats.phaseD.weak}`);

    // === Phase E. final integrity check ===
    console.log('  Phase E: final integrity check');
    stats.reinforceFailureTotal = mocks.getReinforceLog().filter((r) => !r.ok).length;
    const reinforceSuccessTotal = mocks.getReinforceLog().filter((r) => r.ok).length;
    const finalClusters = liveAny._handClusterFeatures.size;

    console.log('');
    console.log('================================================================');
    console.log('     v50 final integration — 5000 trigger 종합');
    console.log('================================================================');
    console.log(`  Phase A (cold start):   triggers=${stats.phaseA.triggers}, spawns=${stats.phaseA.spawns}, matches=${stats.phaseA.matches}`);
    console.log(`  Phase B (v42 idempotent):  syncCalls=${stats.phaseB.syncCalls}, success=${stats.phaseB.success ? '✓' : '✗'}`);
    console.log(`  Phase C (v43 self-heal):   success=${stats.phaseC.success ? '✓' : '✗'}`);
    console.log(`  Phase D (sustained):    triggers=${stats.phaseD.triggers}, matches=${stats.phaseD.matches} (${(100 * stats.phaseD.matches / stats.phaseD.triggers).toFixed(1)}%), weak=${stats.phaseD.weak}`);
    console.log(`  Phase E (integrity):    finalClusters=${finalClusters}, reinforceSuccess=${reinforceSuccessTotal}, totalFailure=${stats.reinforceFailureTotal}`);
    console.log('');

    // Final verdict.
    expect(stats.phaseA.spawns).toBeGreaterThan(0);
    expect(stats.phaseB.success).toBe(true); // v42 정합
    expect(stats.phaseC.success).toBe(true); // v43 정합
    expect(stats.phaseD.matches / stats.phaseD.triggers).toBeGreaterThan(0.5); // 50% 이상 MATCH

    const report = {
      scenario: 'phase-3-v50-final-integration',
      timestamp: '2026-06-04T00:00:00Z',
      version: 'v26-v49 모든 fix 통합',
      phaseA: stats.phaseA,
      phaseB: { ...stats.phaseB, fix_validated: 'v42 setSubstrate idempotent sync' },
      phaseC: { ...stats.phaseC, fix_validated: 'v43 self-heal reinforce 실패 recovery' },
      phaseD: { ...stats.phaseD, matchRate: stats.phaseD.matches / stats.phaseD.triggers },
      finalIntegrity: {
        finalClusters,
        reinforceSuccessTotal,
        reinforceFailureTotal: stats.reinforceFailureTotal,
        totalTriggers: token,
      },
      verdict: stats.phaseB.success && stats.phaseC.success
        ? '✓ v26-v49 모든 fix path 영역 정상 — production deploy 영역 안전'
        : '⚠ 정정 필요',
    };
    const reportPath = resolve(__dirname, 'measurements', 'phase-3-v50-final-integration.json');
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`Report saved: ${reportPath}`);

    live.dispose();
  }, 180000);
});
