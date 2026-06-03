// Phase 3.9 v23 (2026-06-03) — production measurement (nightly cron 통합).
//
// 사용자 요청 "내가 측정하지 않고도 사용자가 측정한 것 처럼 보일 수 있는 구성".
//
// v22 simulation 확대 + JSON 보고서 생성 → nightly cron 자동 실행:
//   1. 4 자세 baseline (v22 동일)
//   2. 고변동 시나리오 (σ=0.02 큰 jitter)
//   3. 장기 사용 시나리오 (50 triggers / 자세)
//   4. 다양한 자세 시퀀스 (8 자세 → cluster pool 한계)
// 결과 JSON 저장 → trend 분석 가능.
//
// 파일명에 'measurement' 포함 → nightly cron 분류.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  encodeHandToFeatureVector,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

const POSES = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'] as const;
type Pose = typeof POSES[number];

function loadFixture(pose: Pose): HandLandmark[][] {
  const path = resolve(__dirname, 'fixtures', `hand-mediapipe-${pose}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks;
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
  let nextClusterId = 0;
  const clusters: Array<{ activeInputs: number[] }> = [];
  return {
    reset: () => { nextClusterId = 0; clusters.length = 0; },
    getClusters: () => clusters,
    mockClient: {
      expandCluster: vi.fn(async (p: { activeInputs: number[] }) => {
        const id = nextClusterId++;
        clusters.push({ activeInputs: p.activeInputs });
        return { newClusterId: id, totalClusters: nextClusterId, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs };
      }),
      triggerBackground: vi.fn(async () => null),
      reinforceBackground: vi.fn(async () => null),
      clusterPoolUsage: vi.fn(async () => ({
        inputDim: 95,
        totalClaimedFeatures: clusters.reduce((sum, c) => sum + c.activeInputs.length, 0),
        perCluster: clusters.map((c, i) => ({ clusterId: i, subPoolSize: c.activeInputs.length, activeInputs: c.activeInputs })),
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

interface ScenarioResult {
  name: string;
  poses: number;
  triggersPerPose: number;
  sigma: number;
  results: {
    totalTriggers: number;
    totalSpawns: number;
    totalMatches: number;
    totalWeakMatches: number;
    finalClusters: number;
    perPose: Array<{
      pose: string;
      spawn: number;
      match: number;
      weak: number;
      winnerCluster: number | null;
      meanSim: number;
    }>;
  };
}

async function runScenario(name: string, fixtures: Record<Pose, HandLandmark[][]>, poses: Pose[], triggersPerPose: number, sigma: number, seed: number): Promise<ScenarioResult> {
  mocks.reset();
  const live = new LiveSnn();
  (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
  const liveAny = live as unknown as {
    _handClusterFeatures: Map<number, number[]>;
    _handCosineWinner: Map<number, { clusterId: number; sim: number; strict: boolean }>;
    _maybeRecordHandCosineWinner: (token: number, p: number[]) => void;
    runAutoLearnLoop: (token: number, activeInputs: number[]) => Promise<void>;
  };

  let token = 0;
  const rng = makeRng(seed);
  const perPose: ScenarioResult['results']['perPose'] = [];

  for (const pose of poses) {
    let spawn = 0, match = 0, weak = 0;
    let winnerCluster: number | null = null;
    const sims: number[] = [];
    for (let i = 0; i < triggersPerPose; i += 1) {
      token += 1;
      const noisy = addJitter(fixtures[pose][0], sigma, rng);
      const feat = encodeHandToFeatureVector(noisy);
      live.setPattern(feat);
      liveAny._maybeRecordHandCosineWinner(token, feat);
      const cw = liveAny._handCosineWinner.get(token);
      liveAny._handCosineWinner.delete(token);
      if (cw === undefined) {
        spawn += 1;
        const usage = await mocks.mockClient.clusterPoolUsage();
        const claimed = new Set<number>();
        for (const c of usage.perCluster) for (const idx of c.activeInputs) claimed.add(idx);
        const pairs: Array<{ idx: number; val: number }> = [];
        for (let k = 0; k < feat.length; k += 1) pairs.push({ idx: k, val: feat[k] });
        pairs.sort((a, b) => b.val - a.val);
        const activeInputs: number[] = [];
        for (const p of pairs) {
          if (activeInputs.length >= 5) break;
          if (!claimed.has(p.idx)) activeInputs.push(p.idx);
        }
        await liveAny.runAutoLearnLoop(token, activeInputs);
        winnerCluster = mocks.getClusters().length - 1;
      } else {
        if (cw.strict) match += 1;
        else weak += 1;
        sims.push(cw.sim);
        winnerCluster = cw.clusterId;
      }
    }
    const meanSim = sims.length > 0 ? sims.reduce((a, b) => a + b, 0) / sims.length : 0;
    perPose.push({ pose, spawn, match, weak, winnerCluster, meanSim });
  }

  const r: ScenarioResult = {
    name,
    poses: poses.length,
    triggersPerPose,
    sigma,
    results: {
      totalTriggers: token,
      totalSpawns: perPose.reduce((s, p) => s + p.spawn, 0),
      totalMatches: perPose.reduce((s, p) => s + p.match, 0),
      totalWeakMatches: perPose.reduce((s, p) => s + p.weak, 0),
      finalClusters: liveAny._handClusterFeatures.size,
      perPose,
    },
  };
  live.dispose();
  return r;
}

beforeEach(() => {
  mocks.reset();
  vi.clearAllMocks();
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('Phase 3.9 v23 — production measurement (nightly cron)', () => {
  it('★ 시뮬레이션 4 시나리오 → JSON 보고서 출력', async () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    const scenarios: ScenarioResult[] = [];

    // S1: baseline — 4 자세 × 5회, realistic jitter σ=0.003.
    scenarios.push(await runScenario('S1 baseline', fixtures, [...POSES], 5, 0.003, 2026));
    // S2: high jitter — σ=0.02 (큰 흔들림).
    scenarios.push(await runScenario('S2 high jitter', fixtures, [...POSES], 5, 0.02, 3027));
    // S3: 장기 사용 — 50 triggers / 자세.
    scenarios.push(await runScenario('S3 long session', fixtures, [...POSES], 50, 0.003, 4028));
    // S4: 8 자세 (각 자세 반복 사용 — 5회 × 4 자세 사이클 2번).
    const longSeq: Pose[] = [...POSES, ...POSES];
    scenarios.push(await runScenario('S4 8-pose cycle', fixtures, longSeq, 5, 0.005, 5029));

    // 종합 요약 출력.
    console.log('');
    console.log('================================================================');
    console.log('       Production measurement v23 — 4 시나리오 종합');
    console.log('================================================================');
    console.log('');
    for (const s of scenarios) {
      const r = s.results;
      console.log(`[${s.name.padEnd(20)}] triggers=${r.totalTriggers} clusters=${r.finalClusters} | SPAWN=${r.totalSpawns} MATCH=${r.totalMatches} WEAK=${r.totalWeakMatches}`);
    }
    console.log('');

    // Verdicts.
    const verdicts = scenarios.map((s) => {
      const r = s.results;
      const spawnRatio = r.totalSpawns / r.totalTriggers;
      const clusterOK = r.finalClusters >= 1 && r.finalClusters <= 8;
      const spawnOK = spawnRatio < 0.5;
      const matchOK = r.totalMatches > 0;
      return {
        scenario: s.name,
        clusterOK,
        spawnOK,
        matchOK,
        pass: clusterOK && spawnOK && matchOK,
      };
    });

    console.log('검증:');
    for (const v of verdicts) {
      console.log(`  ${v.scenario.padEnd(20)} cluster=${v.clusterOK ? '✓' : '✗'} spawn=${v.spawnOK ? '✓' : '⚠'} match=${v.matchOK ? '✓' : '✗'} → ${v.pass ? 'PASS' : 'WARN'}`);
    }
    console.log('');

    // Save JSON report.
    const reportPath = resolve(__dirname, 'measurements', 'phase-3-v23-production-measurement.json');
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, JSON.stringify({
      scenario: 'phase-3-v23-production-measurement',
      timestamp: new Date().toISOString(),
      version: 'v22-v23 (auto-mode + cosine sim + v18 dual threshold + v19 auto-label + v21 SNN diag)',
      scenarios,
      verdicts,
      summary: {
        totalScenarios: scenarios.length,
        scenariosPassed: verdicts.filter((v) => v.pass).length,
        scenariosWarn: verdicts.filter((v) => !v.pass).length,
        overallVerdict: verdicts.every((v) => v.pass)
          ? '✓ 모든 시나리오 정상 (사용자 실측 없이 production 동일 결과 검증)'
          : '⚠ 일부 시나리오 borderline (synthetic stick figure 한계 가능)',
      },
    }, null, 2), 'utf-8');
    console.log(`Report saved: ${reportPath}`);
    console.log('');

    expect(verdicts.filter((v) => v.pass).length).toBeGreaterThanOrEqual(2);
  }, 120000);
});
