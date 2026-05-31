// Phase 2A.1 fix scaling test (2026-05-31).
//
// commit 8da3cbe 영역 N=4 영역 90% accuracy 영역 확정 영역. 본 측정 영역
// 영역 fix 영역 N=5, 6, 8 영역 영역 영역 영역 영역 confirm — 영역 영역 영역
// 사용자 영역 패턴 추가 영역 영역 영역 영역 영역 catch.
//
// schedule (commit 8da3cbe 영역 production code):
//   1st spawn: 30 trials
//   2nd+ spawn: 90 trials
//
// 4×4 N=8 영역 영역 영역 직전 production 영역 catastrophic forgetting
// (HONEST_LIMITATIONS.md §1.2). 본 측정 영역 5×5 substrate + 영역 fix 영역
// 영역 영역 영역 N=5, 6, 8 영역 영역 영역 영역 영역 영역 영역.
//
// 본 file 'measurement' pattern → nightly 분류.

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
    queueMicrotask(() => { const ev = { data: res } as MessageEvent; for (const l of this.listeners) l(ev); });
  }
  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void { this.listeners.push(l); }
  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l); if (i >= 0) this.listeners.splice(i, 1);
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

// 8 distinct raw patterns for 5×5 grid (5 cells each).
//   c0: row 0       [0, 1, 2, 3, 4]
//   c1: col 0       [0, 5, 10, 15, 20]
//   c2: diag-back   [0, 6, 12, 18, 24]
//   c3: diag-fore   [4, 8, 12, 16, 20]
//   c4: row 4       [20, 21, 22, 23, 24]
//   c5: col 4       [4, 9, 14, 19, 24]
//   c6: row 2       [10, 11, 12, 13, 14]  (center row)
//   c7: col 2       [2, 7, 12, 17, 22]    (center col)
const RAW_PATTERNS_8: number[][] = [
  [0, 1, 2, 3, 4],
  [0, 5, 10, 15, 20],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
  [20, 21, 22, 23, 24],
  [4, 9, 14, 19, 24],
  [10, 11, 12, 13, 14],
  [2, 7, 12, 17, 22],
];

async function runScalingTest(
  N: number,
  netId: string,
  seed: number,
): Promise<{
  N: number;
  perClusterSize: number[];
  perClusterAccuracy: number[];
  totalAccuracy: number;
  totalReinforces: number;
  fallbackTriggered: number;
}> {
  const rawPatterns = RAW_PATTERNS_8.slice(0, N);
  const fullActive = rawPatterns.map(rawToFullActive);
  const disjoint = applyForceDisjoint(fullActive);

  // production fix (commit 8da3cbe): 1st spawn 30 trials, 2nd+ 90 trials.
  let totalReinforces = 0;
  let fallbackTriggered = 0;
  for (let ci = 0; ci < N; ci += 1) {
    if (disjoint[ci].length === 0 || disjoint[ci].every((i) => fullActive[ci].includes(i) === false)) {
      // 모든 features claimed → fallback case (production worker forceDisjoint fallback).
      fallbackTriggered += 1;
    }
    // 1st spawn (ci===0): 30 trials, 2nd+: 90 trials.
    const rounds = ci === 0 ? 30 : 90;
    totalReinforces += rounds;
  }

  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix: netId });
  const lab = new LocalSNN({
    netId, client, sink, seed, clusterActiveInputs: disjoint, preset: 'n14_extended',
  });
  await lab.init();

  for (let ci = 0; ci < N; ci += 1) {
    const rounds = ci === 0 ? 30 : 90;
    for (let r = 0; r < rounds; r += 1) {
      await client.inject(
        disjoint[ci].map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
      );
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    }
  }
  await lab.save();

  const SAMPLES = 5;
  const SIGMA = 0.05;
  const baseSeed = 3000;
  const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
  const reg = buildClusterRegistryFromN13(disjoint, 'n14_extended');

  for (let ci = 0; ci < N; ci += 1) {
    const raw25 = new Array<number>(25).fill(0);
    for (const idx of rawPatterns[ci]) raw25[idx] = 1;
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
    total += SAMPLES; correct += matrix[i][i];
  }
  const usage = await client.clusterPoolUsage();
  return {
    N,
    perClusterSize: usage.perCluster.map((c) => c.subPoolSize),
    perClusterAccuracy,
    totalAccuracy: total > 0 ? correct / total : 0,
    totalReinforces,
    fallbackTriggered,
  };
}

describe('Phase 2A.1 fix scaling (N=4,5,6,8) — 2026-05-31', () => {
  it('★ commit 8da3cbe fix 영역 N 영역 효과 영역', async () => {
    const r4 = await runScalingTest(4, 'scale-n4', 42);
    const r5 = await runScalingTest(5, 'scale-n5', 42);
    const r6 = await runScalingTest(6, 'scale-n6', 42);
    const r8 = await runScalingTest(8, 'scale-n8', 42);

    const results = [r4, r5, r6, r8];

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-scaling.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-scaling-N-with-fix',
      results,
      analysis: {
        guideThreshold: 0.9,
        reachedGuide: results.filter((r) => r.totalAccuracy >= 0.9).map((r) => r.N),
        belowGuide: results.filter((r) => r.totalAccuracy < 0.9).map((r) => r.N),
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 2A.1 fix scaling ====');
    for (const r of results) {
      const tot = (r.totalAccuracy * 100).toFixed(0);
      const sizes = r.perClusterSize.join(',');
      console.log(`  N=${r.N}: total=${tot}% sizes=[${sizes}] reinforces=${r.totalReinforces} fallback=${r.fallbackTriggered}`);
    }
    console.log('');

    expect(r4.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
