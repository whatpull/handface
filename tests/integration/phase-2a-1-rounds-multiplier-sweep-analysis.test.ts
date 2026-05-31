// Phase 2A.1 ROUNDS multiplier sweep (2026-05-31).
//
// 직전 fix verification (commit 14a03fe) 결과: ROUNDS = 6 * totalClusters
// (4th spawn = 120 trials) 영역 마지막 cluster 0% → 20% 만 회복. Production
// reality (sequential per-spawn training) 영역 interleaved 영역 영역 영역
// 영역 영역 — 더 큰 multiplier 필요 가능성.
//
// 본 측정: 다양한 multiplier 영역 sweep:
//   variant 1: roundsPerSpawn = [30, 30, 30, 30]            (직전 production, 영역)
//   variant 2: roundsPerSpawn = [30, 60, 90, 120]           (commit 14a03fe fix)
//   variant 3: roundsPerSpawn = [30, 60, 120, 180]          (점진 확대)
//   variant 4: roundsPerSpawn = [30, 90, 150, 240]          (영역 영역)
//   variant 5: roundsPerSpawn = [30, 120, 240, 360]         (영역 영역 영역)
//
// 본 영역 measurement file 영역 'analysis' pattern 영역 nightly 분류.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink,
  N14Pools,
  SNNWorkerClient, SNNWorkerCore,
  buildClusterRegistryFromN13,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import { compute50DimFeature } from '@/lib/snn-runtime/builders/n14-extended';
import { SeededGaussian, addFeatureNoise } from '@/lib/snn-runtime/hand-noise';
import { wtaWinner } from '@/lib/snn-runtime/self-supervised';

class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string): string | null { return this.store.get(k) ?? null; }
  setItem(k: string, v: string): void { this.store.set(k, v); }
  removeItem(k: string): void { this.store.delete(k); }
}
class InProcessTransport implements WorkerLike {
  private listeners: Array<(e: MessageEvent) => void> = [];
  constructor(private core: SNNWorkerCore) {}
  postMessage(req: unknown): void {
    const res = this.core.handle(req as WorkerRequest);
    queueMicrotask(() => {
      const ev = { data: res } as MessageEvent;
      for (const l of this.listeners) l(ev);
    });
  }
  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void { this.listeners.push(l); }
  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l);
    if (i >= 0) this.listeners.splice(i, 1);
  }
  terminate(): void { this.listeners = []; }
}

function rawToFullActive(raw: number[]): number[] {
  const raw25 = new Array<number>(25).fill(0);
  for (const i of raw) raw25[i] = 1;
  const full50 = compute50DimFeature(raw25);
  const active: number[] = [];
  for (let i = 0; i < full50.length; i += 1) if (full50[i] > 0.5) active.push(i);
  return active;
}

function applyForceDisjoint(patterns: number[][]): number[][] {
  const claimed = new Set<number>();
  const result: number[][] = [];
  for (const pattern of patterns) {
    const filtered = pattern.filter((i) => !claimed.has(i));
    const final = filtered.length > 0 ? filtered : pattern.slice();
    for (const i of final) claimed.add(i);
    result.push(final);
  }
  return result;
}

const RAW_PATTERNS = [
  [0, 1, 2, 3, 4],
  [0, 5, 10, 15, 20],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

async function runWithSchedule(
  roundsPerSpawn: number[],
  netId: string,
  seed: number,
): Promise<{
  perClusterAccuracy: number[];
  totalAccuracy: number;
  totalReinforces: number;
}> {
  const fullActive = RAW_PATTERNS.map(rawToFullActive);
  const disjoint = applyForceDisjoint(fullActive);
  const N = RAW_PATTERNS.length;

  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix: netId });
  const lab = new LocalSNN({
    netId, client, sink, seed,
    clusterActiveInputs: disjoint, preset: 'n14_extended',
  });
  await lab.init();

  // Sequential per-spawn — production runAutoLearnLoop 와 정합 (각 spawn 후 자기 cluster reinforce).
  let totalReinforces = 0;
  for (let ci = 0; ci < N; ci += 1) {
    const rounds = roundsPerSpawn[ci];
    for (let r = 0; r < rounds; r += 1) {
      await client.inject(
        disjoint[ci].map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
      );
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
      totalReinforces += 1;
    }
  }
  await lab.save();

  // CFM-1 noise self-verify.
  const SAMPLES = 5;
  const SIGMA = 0.05;
  const baseSeed = 3000;
  const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
  const reg = buildClusterRegistryFromN13(disjoint, 'n14_extended');

  for (let ci = 0; ci < N; ci += 1) {
    const raw25 = new Array<number>(25).fill(0);
    for (const idx of RAW_PATTERNS[ci]) raw25[idx] = 1;
    const fullFeat50 = compute50DimFeature(raw25);
    const gaussian = new SeededGaussian(baseSeed + ci * 1000);
    for (let s = 0; s < SAMPLES; s += 1) {
      const noisy = addFeatureNoise(fullFeat50, SIGMA, gaussian);
      const activeIdx: number[] = [];
      for (let k = 0; k < noisy.length; k += 1) if (noisy[k] > 0.5) activeIdx.push(k);
      await client.inject(
        activeIdx.map((i) => ({ neuron: `in_feat_${i}`, weight: 25, time: 0, durationMs: 50, stepMs: 0.1 })),
      );
      await client.run({ durationMs: 80, dtMs: 0.1, stdpEnabled: false });
      const rates: number[] = [];
      for (const slot of reg.slots) {
        const result = await client.firingRates({ names: slot.out, windowMs: 80 });
        let sum = 0;
        for (const r of result.rates) sum += r.hz;
        rates.push(sum / N14Pools.OUT_PER_CLUSTER);
      }
      const predicted = wtaWinner(rates);
      if (predicted >= 0 && predicted < N) matrix[ci][predicted] += 1;
    }
  }

  let total = 0, correct = 0;
  const perClusterAccuracy: number[] = [];
  for (let i = 0; i < N; i += 1) {
    perClusterAccuracy.push(matrix[i][i] / SAMPLES);
    total += SAMPLES;
    correct += matrix[i][i];
  }
  return {
    perClusterAccuracy,
    totalAccuracy: total > 0 ? correct / total : 0,
    totalReinforces,
  };
}

describe('Phase 2A.1 ROUNDS multiplier sweep (2026-05-31)', () => {
  it('★ 5 variants — schedule 영역 마지막 cluster accuracy 회복 영역 영역', async () => {
    const v1 = await runWithSchedule([30, 30, 30, 30], 'sweep-v1', 42);
    const v2 = await runWithSchedule([30, 60, 90, 120], 'sweep-v2', 42);
    const v3 = await runWithSchedule([30, 60, 120, 180], 'sweep-v3', 42);
    const v4 = await runWithSchedule([30, 90, 150, 240], 'sweep-v4', 42);
    const v5 = await runWithSchedule([30, 120, 240, 360], 'sweep-v5', 42);

    const variants = [
      { name: 'v1_fixed_30', schedule: [30, 30, 30, 30], ...v1 },
      { name: 'v2_6x_linear', schedule: [30, 60, 90, 120], ...v2 },
      { name: 'v3_progressive', schedule: [30, 60, 120, 180], ...v3 },
      { name: 'v4_3x_progressive', schedule: [30, 90, 150, 240], ...v4 },
      { name: 'v5_4x_progressive', schedule: [30, 120, 240, 360], ...v5 },
    ];

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-rounds-sweep.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-rounds-multiplier-sweep',
      variants,
      analysis: {
        bestTotal: variants.reduce((a, b) => b.totalAccuracy > a.totalAccuracy ? b : a),
        firstReachedGuide: variants.find((v) => v.totalAccuracy >= 0.9),
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 2A.1 ROUNDS multiplier sweep ====');
    for (const v of variants) {
      const last = v.perClusterAccuracy[v.perClusterAccuracy.length - 1];
      console.log(`  ${v.name}: schedule=[${v.schedule.join(',')}] total=${(v.totalAccuracy * 100).toFixed(0)}% last=${(last * 100).toFixed(0)}% (reinforces=${v.totalReinforces})`);
    }
    console.log('');

    expect(v1.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 1200_000);
});
