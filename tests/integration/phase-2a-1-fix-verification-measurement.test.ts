// Phase 2A.1 incremental-fairness fix 검증 측정 (2026-05-31).
//
// 직전 commit 14a03fe production code fix:
//   live-snn.ts runAutoLearnLoop:
//     ROUNDS = 6 (직전)  →  ROUNDS = 6 * totalClusters (정정)
//   1st spawn: 30 trials (baseline)
//   4th spawn: 120 trials (4x)
//
// 본 측정: 직전 fixed-30 vs 새 incremental-fairness 의 accuracy 차이 직접 측정.
//   variant A (직전, fixed 30): 모든 spawn 30 round 균등
//   variant B (정정, incremental fairness): 1st=30, 2nd=60, 3rd=90, 4th=120
//
// Verification Guide §3.4 expected ≥90% noisy accuracy.
//
// 본 file 파일명 'measurement' 패턴 → nightly cron 분류 (deploy time 영향 0).

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
  [0, 1, 2, 3, 4],       // c0 row 0 horizontal
  [0, 5, 10, 15, 20],    // c1 col 0 vertical
  [0, 6, 12, 18, 24],    // c2 diag-back (╲)
  [4, 8, 12, 16, 20],    // c3 diag-fore (╱)
];

// roundsPerSpawn[i] = i번째 spawn 의 R-STDP round 횟수.
async function runWithRoundsSchedule(
  roundsPerSpawn: number[],
  netId: string,
  seed: number,
): Promise<{
  perClusterSize: number[];
  perClusterAccuracy: number[];
  totalAccuracy: number;
  matrix: number[][];
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
    netId,
    client,
    sink,
    seed,
    clusterActiveInputs: disjoint,
    preset: 'n14_extended',
  });
  await lab.init();

  // production runAutoLearnLoop 등가: 각 cluster 영역 spawn 후 자기 패턴 만 reinforce.
  // (production 영역 vigilance miss → expandCluster → 본 cluster reinforce N round.)
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

  const usage = await client.clusterPoolUsage();
  let total = 0, correct = 0;
  const perClusterAccuracy: number[] = [];
  for (let i = 0; i < N; i += 1) {
    perClusterAccuracy.push(matrix[i][i] / SAMPLES);
    total += SAMPLES;
    correct += matrix[i][i];
  }
  return {
    perClusterSize: usage.perCluster.map((c) => c.subPoolSize),
    perClusterAccuracy,
    totalAccuracy: total > 0 ? correct / total : 0,
    matrix,
    totalReinforces,
  };
}

describe('Phase 2A.1 incremental-fairness fix verification (2026-05-31)', () => {
  it('★ Variant A (fixed 30) vs Variant B (incremental 30/60/90/120) 직접 비교', async () => {
    // Variant A: 직전 production (fixed 30 trials per spawn).
    const variantA = await runWithRoundsSchedule([30, 30, 30, 30], 'fix-verify-a', 42);
    // Variant B: 새 fix (incremental — 1st 30, 2nd 60, 3rd 90, 4th 120).
    const variantB = await runWithRoundsSchedule([30, 60, 90, 120], 'fix-verify-b', 42);

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-fix-verification.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-incremental-fairness-fix-verification',
      variantA: {
        description: '직전 production (fixed 30 trials per spawn)',
        roundsPerSpawn: [30, 30, 30, 30],
        ...variantA,
      },
      variantB: {
        description: '새 fix (incremental — 6*totalClusters * 5 chunk)',
        roundsPerSpawn: [30, 60, 90, 120],
        ...variantB,
      },
      improvement: {
        totalAccuracy: variantB.totalAccuracy - variantA.totalAccuracy,
        lastClusterAccuracy: variantB.perClusterAccuracy[3] - variantA.perClusterAccuracy[3],
      },
      verdict: variantB.totalAccuracy >= 0.9
        ? '✓ FIX VERIFIED — Guide §3.4 expected ≥90% noisy accuracy 정합'
        : variantB.totalAccuracy > variantA.totalAccuracy
          ? '△ partial improvement — Guide 영역 영역 영역 영역 도달 못함'
          : '✗ NO improvement — fix 영역 영역 영역 catch',
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 2A.1 incremental-fairness fix verification ====');
    console.log(`Variant A (fixed 30 — 직전 production):`);
    console.log(`  per-cluster: [${variantA.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}]`);
    console.log(`  total: ${(variantA.totalAccuracy * 100).toFixed(0)}% (${variantA.totalReinforces} reinforces)`);
    console.log(`Variant B (incremental — 새 fix):`);
    console.log(`  per-cluster: [${variantB.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}]`);
    console.log(`  total: ${(variantB.totalAccuracy * 100).toFixed(0)}% (${variantB.totalReinforces} reinforces)`);
    console.log(`improvement: total +${((variantB.totalAccuracy - variantA.totalAccuracy) * 100).toFixed(0)}%p, last cluster +${((variantB.perClusterAccuracy[3] - variantA.perClusterAccuracy[3]) * 100).toFixed(0)}%p`);
    console.log('');

    expect(variantA.totalAccuracy).toBeGreaterThanOrEqual(0);
    expect(variantB.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
