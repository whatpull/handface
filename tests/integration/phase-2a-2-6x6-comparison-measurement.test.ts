// Phase 2A.2 6×6 substrate (n15_extended) 비교 측정 (2026-05-31).
//
// 직전 measurement 영역 발견:
//   5×5 substrate N=5 시 c3 = 40% (small sub-pool 3 features 영역 취약)
//
// 본 측정: 6×6 substrate (n15_extended_6x6, 72-dim feature) 가 c3 의 sub-pool
// 확장으로 robustness 개선하는지 비교.
//
// 4 패턴 시나리오 (6×6 grid 으로 변환):
//   c0: row 0 (6 cells)
//   c1: col 0 (6 cells)
//   c2: diag-back (6 cells)
//   c3: diag-fore (6 cells)
//   c4: row 5 (6 cells, optional 5번째)
//
// 본 file 'measurement' pattern → nightly cron 분류.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink,
  SNNWorkerClient, SNNWorkerCore,
  buildClusterRegistryFromN13,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import { compute72DimFeature, N15Pools } from '@/lib/snn-runtime/builders/n15-extended-6x6';
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

// 6×6 grid index map:
//    0  1  2  3  4  5
//    6  7  8  9 10 11
//   12 13 14 15 16 17
//   18 19 20 21 22 23
//   24 25 26 27 28 29
//   30 31 32 33 34 35
const RAW_PATTERNS_6X6 = [
  [0, 1, 2, 3, 4, 5],                  // c0 row 0
  [0, 6, 12, 18, 24, 30],              // c1 col 0
  [0, 7, 14, 21, 28, 35],              // c2 diag-back
  [5, 10, 15, 20, 25, 30],             // c3 diag-fore
  [30, 31, 32, 33, 34, 35],            // c4 row 5
];

function rawToFullActive(raw: number[]): number[] {
  const raw36 = new Array<number>(36).fill(0);
  for (const i of raw) raw36[i] = 1;
  const full72 = compute72DimFeature(raw36);
  const active: number[] = [];
  for (let i = 0; i < full72.length; i += 1) if (full72[i] > 0.5) active.push(i);
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

async function trainAndMeasure6x6(
  N: number,
  netId: string,
  seed: number,
): Promise<{
  N: number;
  perClusterSize: number[];
  perClusterAccuracy: number[];
  totalAccuracy: number;
  jaccardMax: number;
}> {
  const rawPatterns = RAW_PATTERNS_6X6.slice(0, N);
  const fullActive = rawPatterns.map(rawToFullActive);
  const disjoint = applyForceDisjoint(fullActive);

  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix: netId });
  const lab = new LocalSNN({
    netId, client, sink, seed, clusterActiveInputs: disjoint, preset: 'n15_extended_6x6',
  });
  await lab.init();

  // production fix (commit 8da3cbe): 1st = 30 trials, 2nd+ = 90 trials.
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

  const SAMPLES = 5; const SIGMA = 0.05; const baseSeed = 3000;
  const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
  const reg = buildClusterRegistryFromN13(disjoint, 'n15_extended_6x6');

  for (let ci = 0; ci < N; ci += 1) {
    const raw36 = new Array<number>(36).fill(0);
    for (const idx of rawPatterns[ci]) raw36[idx] = 1;
    const fullFeat72 = compute72DimFeature(raw36);
    const gaussian = new SeededGaussian(baseSeed + ci * 1000);
    for (let s = 0; s < SAMPLES; s += 1) {
      const noisy = addFeatureNoise(fullFeat72, SIGMA, gaussian);
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
        rates.push(sum / N15Pools.OUT_PER_CLUSTER);
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
  let jaccardMax = 0;
  for (let i = 0; i < usage.overlapMatrix.length; i += 1) {
    for (let j = 0; j < usage.overlapMatrix[i].length; j += 1) {
      if (i !== j && usage.overlapMatrix[i][j] > jaccardMax) jaccardMax = usage.overlapMatrix[i][j];
    }
  }
  return {
    N,
    perClusterSize: usage.perCluster.map((c) => c.subPoolSize),
    perClusterAccuracy,
    totalAccuracy: total > 0 ? correct / total : 0,
    jaccardMax,
  };
}

describe('Phase 2A.2 6×6 substrate (72-dim) 비교 측정 (2026-05-31)', () => {
  it('★ 6×6 substrate N=4 / N=5 — 5×5 대비 c3 sub-pool 크기 + accuracy', async () => {
    const r4 = await trainAndMeasure6x6(4, '6x6-n4', 42);
    const r5 = await trainAndMeasure6x6(5, '6x6-n5', 42);

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-2-6x6-comparison.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-2-6x6-substrate-comparison',
      substrate: 'n15_extended_6x6 (72-dim)',
      productionFix: '1st spawn 30 trials, 2nd+ spawn 90 trials (commit 8da3cbe)',
      N4: r4,
      N5: r5,
      comparison5x5: {
        N4_5x5: { perClusterAccuracy: [1, 1, 1, 0.6], totalAccuracy: 0.9, c3_size: 3 },
        N5_5x5: { perClusterAccuracy: [1, 1, 1, 0.4, 1], totalAccuracy: 0.88, c3_size: 3 },
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== 6×6 substrate (72-dim) vs 5×5 (50-dim) ====');
    console.log(`6×6 N=4: per-cluster=[${r4.perClusterAccuracy.map((v) => (v * 100).toFixed(0) + '%').join(', ')}] sizes=[${r4.perClusterSize.join(',')}] total=${(r4.totalAccuracy * 100).toFixed(0)}% jaccard=${r4.jaccardMax.toFixed(3)}`);
    console.log(`6×6 N=5: per-cluster=[${r5.perClusterAccuracy.map((v) => (v * 100).toFixed(0) + '%').join(', ')}] sizes=[${r5.perClusterSize.join(',')}] total=${(r5.totalAccuracy * 100).toFixed(0)}% jaccard=${r5.jaccardMax.toFixed(3)}`);
    console.log(`5×5 N=4 (직전): [100,100,100,60] total=90% c3-size=3`);
    console.log(`5×5 N=5 (직전): [100,100,100,40,100] total=88% c3-size=3`);
    console.log('');

    expect(r4.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
