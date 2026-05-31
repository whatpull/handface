// Phase 2A.1 spawn order experiment (2026-05-31).
//
// Hypothesis (직전 v3 측정 영역 root cause 분석):
//   c3 영역 0% miss 영역 mutual interference 영역 아니라 disjoint-after-prior-claim
//   영역 c3 영역 sub-pool 영역 영역 영역 3 features 영역 underrepresentation.
//
// 본 experiment 영역 spawn order 영역 swap 영역 영역 c3 → c2 영역 위치 영역
// 영역 영역 영역 영역 영역 영역 영역 c3 영역 영역 catch:
//   Order A (production): c0 → c1 → c2(diag-back) → c3(diag-fore)
//   Order B (swap):       c0 → c1 → c3(diag-fore) → c2(diag-back)
//
// Order A 영역 c3 0% miss + Order B 영역 c2 0% miss 영역 영역 → order effect 영역
// 영역 (under-allocation 영역 last-spawn 영역 inherent issue).
// Order A/B 영역 모두 c3 (또는 c2) 영역 영역 0% miss 영역 영역 영역 → fundamental
// substrate issue (Phase 2A.1 영역 영역 영역 영역).
//
// 본 file 영역 nightly 분류 (R&D `spawn-order` pattern 영역 'sweep' 영역
// 0 — 매칭 안 됨, 단 'analysis' 영역 추가 필요 영역. 정합 확인 영역 vitest
// exclude 영역).

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

// 4 raw patterns (production-observed). Index in array = spawn order.
const PATTERNS_PRODUCTION_ORDER = [
  [0, 1, 2, 3, 4],       // 0: row 0 horizontal
  [0, 5, 10, 15, 20],    // 1: col 0 vertical
  [0, 6, 12, 18, 24],    // 2: diag-back (╲)
  [4, 8, 12, 16, 20],    // 3: diag-fore (╱)
];

async function runOrderExperiment(
  rawOrder: number[][],
  netId: string,
  seed: number,
): Promise<{
  perClusterSize: number[];
  perClusterActive: number[][];
  accuracy: number;
  perClusterAccuracy: number[];
  matrix: number[][];
}> {
  const fullActive = rawOrder.map(rawToFullActive);
  const disjoint = applyForceDisjoint(fullActive);

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

  // 30 reinforce 영역 production parity.
  const REINFORCE_ROUNDS = 30;
  for (let round = 0; round < REINFORCE_ROUNDS; round += 1) {
    for (const inputs of disjoint) {
      await client.inject(
        inputs.map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
      );
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    }
  }
  await lab.save();

  // CFM-1 measurement — noisy self-verify.
  const N = rawOrder.length;
  const SAMPLES = 5;
  const SIGMA = 0.05;
  const baseSeed = 3000;
  const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
  const reg = buildClusterRegistryFromN13(disjoint, 'n14_extended');

  for (let ci = 0; ci < N; ci += 1) {
    const raw25 = new Array<number>(25).fill(0);
    for (const idx of rawOrder[ci]) raw25[idx] = 1;
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
    perClusterActive: usage.perCluster.map((c) => c.activeInputs),
    accuracy: total > 0 ? correct / total : 0,
    perClusterAccuracy,
    matrix,
  };
}

describe('Phase 2A.1 spawn order experiment (2026-05-31)', () => {
  it('★ Order A (production) vs Order B (c2/c3 swap) 영역 영역 under-allocation 영역', async () => {
    // Order A: c0, c1, c2(diag-back), c3(diag-fore) ← production order
    const orderA = PATTERNS_PRODUCTION_ORDER;
    // Order B: c0, c1, c3(diag-fore), c2(diag-back) ← swap diag-back ↔ diag-fore
    const orderB = [
      PATTERNS_PRODUCTION_ORDER[0],
      PATTERNS_PRODUCTION_ORDER[1],
      PATTERNS_PRODUCTION_ORDER[3], // diag-fore now spawns 3rd
      PATTERNS_PRODUCTION_ORDER[2], // diag-back now spawns 4th
    ];

    const resultA = await runOrderExperiment(orderA, 'order-a', 42);
    const resultB = await runOrderExperiment(orderB, 'order-b', 42);

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-spawn-order.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-spawn-order-experiment',
      orderA: {
        description: 'production order (c0=hor, c1=ver, c2=diag-back, c3=diag-fore)',
        rawPatterns: orderA,
        perClusterSize: resultA.perClusterSize,
        perClusterActive: resultA.perClusterActive,
        perClusterAccuracy: resultA.perClusterAccuracy,
        totalAccuracy: resultA.accuracy,
        matrix: resultA.matrix,
      },
      orderB: {
        description: 'swap order (c0=hor, c1=ver, c2=diag-fore, c3=diag-back)',
        rawPatterns: orderB,
        perClusterSize: resultB.perClusterSize,
        perClusterActive: resultB.perClusterActive,
        perClusterAccuracy: resultB.perClusterAccuracy,
        totalAccuracy: resultB.accuracy,
        matrix: resultB.matrix,
      },
      analysis: {
        orderASmallestCluster: { idx: resultA.perClusterSize.indexOf(Math.min(...resultA.perClusterSize)), size: Math.min(...resultA.perClusterSize) },
        orderBSmallestCluster: { idx: resultB.perClusterSize.indexOf(Math.min(...resultB.perClusterSize)), size: Math.min(...resultB.perClusterSize) },
        orderAWorstAccuracy: { idx: resultA.perClusterAccuracy.indexOf(Math.min(...resultA.perClusterAccuracy)), accuracy: Math.min(...resultA.perClusterAccuracy) },
        orderBWorstAccuracy: { idx: resultB.perClusterAccuracy.indexOf(Math.min(...resultB.perClusterAccuracy)), accuracy: Math.min(...resultB.perClusterAccuracy) },
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Order A (production) ====');
    console.log(`  per-cluster size: [${resultA.perClusterSize.join(', ')}]`);
    console.log(`  per-cluster accuracy: [${resultA.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}]`);
    console.log(`  total: ${(resultA.accuracy * 100).toFixed(0)}%`);
    console.log('==== Order B (swap c2↔c3) ====');
    console.log(`  per-cluster size: [${resultB.perClusterSize.join(', ')}]`);
    console.log(`  per-cluster accuracy: [${resultB.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}]`);
    console.log(`  total: ${(resultB.accuracy * 100).toFixed(0)}%`);
    console.log('');

    expect(resultA.accuracy).toBeGreaterThanOrEqual(0);
    expect(resultB.accuracy).toBeGreaterThanOrEqual(0);
  }, 180_000);
});
