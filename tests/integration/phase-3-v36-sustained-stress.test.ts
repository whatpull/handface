// Phase 3.9 v36 (2026-06-03) — sustained stress simulation.
//
// 직전 v22/v23/v28 영역 5-50 trigger 검증 — production sustained 1000+ trigger
// 영역 신뢰성 미검증. 본 test:
//   - 4 자세 × 250 cycle = 1000 trigger
//   - cluster centroid drift 측정 (EMA α=0.1 누적 영향)
//   - log throttle 효과 검증 (v34)
//   - localStorage growth 측정
//   - final cosine sim 분포 (converge / stable)
//   - reinforce 실패 0 보장 (v27 fallback + v26 sync 영구 검증)

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import {
  encodeHandToFeatureVector,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

const POSES = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'] as const;
type Pose = typeof POSES[number];

function loadFixture(pose: Pose): HandLandmark[] {
  const path = resolve(__dirname, 'fixtures', `hand-mediapipe-${pose}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks[0];
}
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

const mocks = vi.hoisted(() => {
  let workerClusters: Array<{ activeInputs: number[] }> = [];
  const reinforceLog: Array<{ ok: boolean; targetCluster: number }> = [];
  return {
    reset: () => { workerClusters = []; reinforceLog.length = 0; },
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
        if (workerClusters[p.targetCluster]) {
          reinforceLog.push({ ok: true, targetCluster: p.targetCluster });
          return null;
        }
        reinforceLog.push({ ok: false, targetCluster: p.targetCluster });
        throw new Error(`targetCluster ${p.targetCluster} 범위 밖 (slots ${workerClusters.length})`);
      },
      ),
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

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('Phase 3.9 v36 — sustained stress (1000 triggers, 4 poses)', () => {
  it('★ 1000 trigger / 4 자세 cycle → drift / memory / reinforce 검증', async () => {
    const fixtures: Record<Pose, HandLandmark[]> = {} as Record<Pose, HandLandmark[]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handCosineWinner: Map<number, { clusterId: number; sim: number; strict: boolean }>;
      _maybeRecordHandCosineWinner: (token: number, p: number[]) => void;
      runAutoLearnLoop: (token: number, activeInputs: number[]) => Promise<void>;
    };

    let token = 0;
    const rng = makeRng(2026);
    const TOTAL_CYCLES = 250; // 4 자세 × 250 = 1000 trigger
    const stats = {
      totalTriggers: 0,
      totalSpawns: 0,
      totalMatches: 0,
      totalWeakMatches: 0,
      perPoseMatchCount: { open_palm: 0, closed_fist: 0, thumbs_up: 0, peace_sign: 0 } as Record<Pose, number>,
      simFirstHalf: [] as number[],
      simSecondHalf: [] as number[],
      logCount: 0,
    };

    // log spy — v34 throttle 효과 측정.
    const logSpy = vi.spyOn(console, 'log').mockImplementation((arg: unknown) => {
      if (typeof arg === 'string' && arg.startsWith('[hand-')) stats.logCount += 1;
    });

    for (let cycle = 0; cycle < TOTAL_CYCLES; cycle += 1) {
      for (const pose of POSES) {
        token += 1;
        const noisy = addJitter(fixtures[pose], 0.003, rng);
        const feat = encodeHandToFeatureVector(noisy);
        live.setPattern(feat);
        liveAny._maybeRecordHandCosineWinner(token, feat);
        const cw = liveAny._handCosineWinner.get(token);
        liveAny._handCosineWinner.delete(token);
        stats.totalTriggers += 1;
        if (cw === undefined) {
          stats.totalSpawns += 1;
          // simulate spawn: disjoint activeInputs.
          const usage = await mocks.mockClient.clusterPoolUsage();
          const claimed = new Set<number>();
          for (const c of usage.perCluster) for (const idx of c.activeInputs) claimed.add(idx);
          const pairs: Array<{ idx: number; val: number }> = [];
          for (let i = 0; i < feat.length; i += 1) pairs.push({ idx: i, val: feat[i] });
          pairs.sort((a, b) => b.val - a.val);
          const fb: number[] = [];
          for (const p of pairs) {
            if (fb.length >= 5) break;
            if (!claimed.has(p.idx)) fb.push(p.idx);
          }
          if (fb.length === 5) await liveAny.runAutoLearnLoop(token, fb);
        } else {
          if (cw.strict) { stats.totalMatches += 1; stats.perPoseMatchCount[pose] += 1; }
          else stats.totalWeakMatches += 1;
          if (cycle < TOTAL_CYCLES / 2) stats.simFirstHalf.push(cw.sim);
          else stats.simSecondHalf.push(cw.sim);
          // simulate reinforce.
          try {
            await mocks.mockClient.reinforceBackground({ targetCluster: cw.clusterId });
          } catch { /* tracked in log */ }
        }
      }
    }
    logSpy.mockRestore();

    const mean = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    const meanFirst = mean(stats.simFirstHalf);
    const meanSecond = mean(stats.simSecondHalf);
    const drift = meanSecond - meanFirst;

    const reinforceFailure = mocks.getReinforceLog().filter((r) => !r.ok).length;
    const reinforceSuccess = mocks.getReinforceLog().filter((r) => r.ok).length;

    // localStorage growth measure.
    const featBytes = window.localStorage.getItem(FEATURES_KEY)?.length ?? 0;

    console.log('');
    console.log('================================================================');
    console.log('     v36 sustained stress — 1000 trigger / 4 자세 cycle');
    console.log('================================================================');
    console.log(`  triggers:            ${stats.totalTriggers}`);
    console.log(`  spawns:              ${stats.totalSpawns} (theoretical 4 = 1 per 자세)`);
    console.log(`  matches (strict):    ${stats.totalMatches} (${(100 * stats.totalMatches / stats.totalTriggers).toFixed(1)}%)`);
    console.log(`  weak matches:        ${stats.totalWeakMatches}`);
    console.log(`  final clusters:      ${liveAny._handClusterFeatures.size}`);
    console.log('');
    console.log(`  per-pose match:`);
    for (const pose of POSES) {
      console.log(`    ${pose.padEnd(15)} ${stats.perPoseMatchCount[pose]} (${(100 * stats.perPoseMatchCount[pose] / TOTAL_CYCLES).toFixed(1)}%)`);
    }
    console.log('');
    console.log(`  cosine sim drift:`);
    console.log(`    first half mean:   ${meanFirst.toFixed(4)}`);
    console.log(`    second half mean:  ${meanSecond.toFixed(4)}`);
    console.log(`    drift:             ${drift >= 0 ? '+' : ''}${drift.toFixed(4)} (EMA converge ${drift >= 0 ? '↑' : '↓'})`);
    console.log('');
    console.log(`  reinforce 결과:`);
    console.log(`    success:           ${reinforceSuccess}`);
    console.log(`    failure:           ${reinforceFailure} ← v27 fallback 효과 검증`);
    console.log('');
    console.log(`  log throttle (v34):`);
    console.log(`    [hand-*] log 출력:  ${stats.logCount} line`);
    console.log(`    직전 (매 trigger × 2): ~${stats.totalTriggers * 2} line`);
    console.log(`    감소 ratio:         ${((stats.totalTriggers * 2) / Math.max(1, stats.logCount)).toFixed(1)}×`);
    console.log('');
    console.log(`  localStorage:`);
    console.log(`    features bytes:    ${featBytes} (${(featBytes / 1024).toFixed(1)} KB)`);
    console.log(`    per-cluster:       ${(featBytes / Math.max(1, liveAny._handClusterFeatures.size)).toFixed(0)} bytes`);
    console.log('');

    // 핵심 verdict.
    expect(reinforceFailure).toBe(0); // v27 fallback path 영원히 정합
    expect(liveAny._handClusterFeatures.size).toBeLessThanOrEqual(8); // 4 자세 + noise spawn 한계
    expect(stats.totalMatches / stats.totalTriggers).toBeGreaterThan(0.5); // 50% 이상 MATCH
    // drift 양수 = EMA 가 사용자 자세 distribution 으로 수렴 (정상).
    expect(drift).toBeGreaterThan(-0.05); // -0.05 이하 = receptive field 손실

    // log throttle 효과 검증.
    expect(stats.logCount).toBeLessThan(stats.totalTriggers); // 매 trigger 보다 적음

    const report = {
      scenario: 'phase-3-v36-sustained-stress',
      timestamp: '2026-06-03T23:50:00Z',
      version: 'v34 log throttle + v27 fallback + v26 sync',
      configuration: {
        cycles: TOTAL_CYCLES,
        posesPerCycle: POSES.length,
        totalTriggers: stats.totalTriggers,
        jitterSigma: 0.003,
      },
      triggers: {
        total: stats.totalTriggers,
        spawns: stats.totalSpawns,
        matches: stats.totalMatches,
        weakMatches: stats.totalWeakMatches,
        finalClusters: liveAny._handClusterFeatures.size,
      },
      per_pose_match: stats.perPoseMatchCount,
      drift: {
        firstHalfMean: meanFirst,
        secondHalfMean: meanSecond,
        delta: drift,
      },
      reinforce: {
        success: reinforceSuccess,
        failure: reinforceFailure,
      },
      log_throttle: {
        actualLines: stats.logCount,
        legacyLines: stats.totalTriggers * 2,
        ratio: Math.round((stats.totalTriggers * 2) / Math.max(1, stats.logCount) * 10) / 10,
      },
      localStorage: {
        featureBytes: featBytes,
        kb: Math.round(featBytes / 1024 * 10) / 10,
      },
      verdict: reinforceFailure === 0 && drift > -0.05 ? '✓ 1000 trigger sustained 정상' : '⚠ 정정 필요',
    };
    const reportPath = resolve(__dirname, 'measurements', 'phase-3-v36-sustained-stress.json');
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`Report saved: ${reportPath}`);

    live.dispose();
  }, 120000);
});
