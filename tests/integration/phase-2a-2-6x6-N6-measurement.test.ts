// Phase 2A.2 6×6 substrate N=6 scaling 측정 (2026-06-01).
//
// 직전 measurement evidence:
//   - 6×6 N=4/5: 모두 100% (commit b8458e5)
//   - 5×5 N=8: 70% (다중 under-allocated cluster)
//   - 6×6 N=7/8: 시간 부족으로 미측정 (직전 cycle)
//
// 본 측정: 6×6 production 적용 (commit 4174898) 후 사용자가 5번째 / 6번째
// 패턴 추가 시 accuracy 유지 여부 확인.
//
// 시나리오:
//   c0: row 0       [0..5]
//   c1: col 0       [0,6,12,18,24,30]
//   c2: diag-back   [0,7,14,21,28,35]
//   c3: diag-fore   [5,10,15,20,25,30]
//   c4: row 5       [30..35]   (Bottom row — known issue 후보)
//   c5: col 5       [5,11,17,23,29,35]
//
// production fix (commit 8da3cbe):
//   1st spawn: 30 trials
//   2nd+ spawn: 90 trials
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

const RAW_PATTERNS_6 = [
  [0, 1, 2, 3, 4, 5],                  // c0 row 0
  [0, 6, 12, 18, 24, 30],              // c1 col 0
  [0, 7, 14, 21, 28, 35],              // c2 diag-back
  [5, 10, 15, 20, 25, 30],             // c3 diag-fore
  [30, 31, 32, 33, 34, 35],            // c4 row 5 (Bottom row — known issue 후보)
  [5, 11, 17, 23, 29, 35],             // c5 col 5
];

async function trainAndMeasure6x6N6(seed: number) {
  const fullActive = RAW_PATTERNS_6.map(rawToFullActive);
  const disjoint = applyForceDisjoint(fullActive);
  const N = RAW_PATTERNS_6.length;

  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix: '6x6-n6' });
  const lab = new LocalSNN({
    netId: '6x6-n6', client, sink, seed, clusterActiveInputs: disjoint, preset: 'n15_extended_6x6',
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

  // CFM-1 noise self-verify.
  const SAMPLES = 5; const SIGMA = 0.05; const baseSeed = 3000;
  const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
  const reg = buildClusterRegistryFromN13(disjoint, 'n15_extended_6x6');

  for (let ci = 0; ci < N; ci += 1) {
    const raw36 = new Array<number>(36).fill(0);
    for (const idx of RAW_PATTERNS_6[ci]) raw36[idx] = 1;
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

  const usage = await client.clusterPoolUsage();
  let total = 0, correct = 0;
  const perClusterAccuracy: number[] = [];
  for (let i = 0; i < N; i += 1) {
    perClusterAccuracy.push(matrix[i][i] / SAMPLES);
    total += SAMPLES; correct += matrix[i][i];
  }
  let jaccardMax = 0;
  for (let i = 0; i < usage.overlapMatrix.length; i += 1) {
    for (let j = 0; j < usage.overlapMatrix[i].length; j += 1) {
      if (i !== j && usage.overlapMatrix[i][j] > jaccardMax) jaccardMax = usage.overlapMatrix[i][j];
    }
  }
  return {
    perClusterSize: usage.perCluster.map((c) => c.subPoolSize),
    perClusterActive: usage.perCluster.map((c) => c.activeInputs),
    perClusterAccuracy,
    totalAccuracy: total > 0 ? correct / total : 0,
    matrix,
    jaccardMax,
  };
}

describe('Phase 2A.2 6×6 substrate N=6 measurement (2026-06-01)', () => {
  it('★ 6×6 N=6 (row 0 + col 0 + diag-back + diag-fore + Bottom row + col 5)', async () => {
    const result = await trainAndMeasure6x6N6(42);

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-2-6x6-N6.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-2-6x6-substrate-N6-with-bottom-row',
      substrate: 'n15_extended_6x6 (72-dim)',
      productionFix: '1st spawn 30 trials, 2nd+ spawn 90 trials (commit 8da3cbe)',
      productionDeploy: 'commit 4174898 (2026-06-01)',
      patterns: RAW_PATTERNS_6,
      result,
      bottomRowVerify: {
        c4_pattern: 'row 5 (Bottom row known issue candidate)',
        c4_accuracy: result.perClusterAccuracy[4],
        verdict: result.perClusterAccuracy[4] === 1.0
          ? '✓ Bottom row 100% accuracy — known issue (P213 mock N=8) 영역 N=6 production 시나리오 영역 영향 없음'
          : `⚠ Bottom row ${(result.perClusterAccuracy[4] * 100).toFixed(0)}% — known issue 영향 catch`,
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 2A.2 6×6 N=6 production scaling ====');
    console.log(`  per-cluster size: [${result.perClusterSize.join(',')}]`);
    console.log(`  per-cluster accuracy: [${result.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}]`);
    console.log(`  total: ${(result.totalAccuracy * 100).toFixed(0)}%`);
    console.log(`  Jaccard max off-diag: ${result.jaccardMax.toFixed(3)}`);
    console.log(`  Bottom row (c4) accuracy: ${(result.perClusterAccuracy[4] * 100).toFixed(0)}%`);
    console.log('');

    expect(result.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
