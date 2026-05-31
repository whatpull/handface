// Phase 2A.1 small sub-pool cluster 에 대한 ROUNDS 가산 측정 (2026-05-31).
//
// 직전 측정 발견 (commit 8da3cbe production):
//   5×5 N=4: c3 sub-pool=3 features, 60% accuracy (총 90%)
//   6×6 N=4: c3 sub-pool=5 features, 100% accuracy
// → small sub-pool 의 weight saturation 부족이 root cause 가설.
//
// 본 측정 가설:
//   small sub-pool (<=3 features) cluster 의 ROUNDS 를 추가 증가시키면
//   weight saturation 도달하여 accuracy 회복 가능.
//
// Variants (모든 시나리오: c0-c2 large pool, c3 small pool=3):
//   v0: c3 = 90 trials (production baseline, commit 8da3cbe)
//   v1: c3 = 120 trials (+30)
//   v2: c3 = 150 trials (+60)
//   v3: c3 = 180 trials (+90)
//   v4: c3 = 240 trials (+150)
//
// 위험 평가:
//   P218 reverted (2026-05-25): 1st spawn 50 trials 시 saturation. 단 c3 만
//   증가시키므로 prior cluster 영향 없음. 단일 cluster 영역 saturation 가능
//   성 측정 필요.
//
// 본 file 'analysis' pattern → nightly cron 분류.

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

const RAW_PATTERNS = [
  [0, 1, 2, 3, 4],         // c0 row 0
  [0, 5, 10, 15, 20],      // c1 col 0
  [0, 6, 12, 18, 24],      // c2 diag-back
  [4, 8, 12, 16, 20],      // c3 diag-fore (sub-pool=3 features)
];

async function runWithLastClusterRounds(
  lastClusterRounds: number,
  netId: string,
  seed: number,
): Promise<{
  lastClusterRounds: number;
  perClusterAccuracy: number[];
  totalAccuracy: number;
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
    netId, client, sink, seed, clusterActiveInputs: disjoint, preset: 'n14_extended',
  });
  await lab.init();

  // c0: 30 trials (1st spawn, P218 sweet spot)
  // c1, c2: 90 trials (commit 8da3cbe production)
  // c3: variable (실험 대상)
  for (let ci = 0; ci < N; ci += 1) {
    let rounds: number;
    if (ci === 0) rounds = 30;
    else if (ci === N - 1) rounds = lastClusterRounds;
    else rounds = 90;
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
    total += SAMPLES; correct += matrix[i][i];
  }
  return { lastClusterRounds, perClusterAccuracy, totalAccuracy: total > 0 ? correct / total : 0 };
}

describe('Phase 2A.1 small sub-pool boost — c3 rounds sweep (2026-05-31)', () => {
  it('★ c3 ROUNDS = 90/120/150/180/240 → saturation 도달 sweet spot 탐색', async () => {
    const v0 = await runWithLastClusterRounds(90, 'boost-v0', 42);
    const v1 = await runWithLastClusterRounds(120, 'boost-v1', 42);
    const v2 = await runWithLastClusterRounds(150, 'boost-v2', 42);
    const v3 = await runWithLastClusterRounds(180, 'boost-v3', 42);
    const v4 = await runWithLastClusterRounds(240, 'boost-v4', 42);

    const variants = [
      { name: 'v0_baseline_90', ...v0 },
      { name: 'v1_120', ...v1 },
      { name: 'v2_150', ...v2 },
      { name: 'v3_180', ...v3 },
      { name: 'v4_240', ...v4 },
    ];

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-small-pool-boost.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-small-pool-cluster-rounds-boost',
      hypothesis: 'small sub-pool (3 features) cluster 의 ROUNDS 추가 시 weight saturation 도달',
      variants,
      analysis: {
        bestC3: variants.reduce((a, b) => b.perClusterAccuracy[3] > a.perClusterAccuracy[3] ? b : a),
        bestTotal: variants.reduce((a, b) => b.totalAccuracy > a.totalAccuracy ? b : a),
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== c3 small sub-pool ROUNDS sweep ====');
    for (const v of variants) {
      console.log(`  ${v.name}: per-cluster=[${v.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}] total=${(v.totalAccuracy * 100).toFixed(0)}% (c3 rounds=${v.lastClusterRounds})`);
    }
    console.log('');

    expect(v0.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
