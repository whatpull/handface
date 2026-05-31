// Phase 2A.1 신규 cluster 영역 30+60=90 round 영역 production-equivalent (2026-05-31).
//
// 직전 interleaved-vs-sequential 측정 발견: 영역 변경 영역 영역 영역 60 extra
// reinforce 영역 마지막 cluster 영역 95% accuracy.
//
// Production fix design 검증:
//   schedule = [30, 90, 90, 90]
//   - 1st spawn (only cluster): 30 round (P218 sweet spot 유지)
//   - 2nd~ spawn (신규 cluster): 90 round (30 + 60 extra)
//   - prior cluster 영역 추가 학습 영역 없음 (mid over-train 회피)
//
// 비교 variant:
//   v1: [30, 30, 30, 30] (직전 production = baseline)
//   v2: [30, 90, 90, 90] (영역 design)
//   v3: [30, 60, 60, 60] (절충안)
//   v4: [60, 90, 90, 90] (영역 영역 — 1st 영역 saturation 영역 catch)
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

const RAW_PATTERNS = [
  [0, 1, 2, 3, 4],
  [0, 5, 10, 15, 20],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

async function runProductionEquivalent(
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
  const lab = new LocalSNN({ netId, client, sink, seed, clusterActiveInputs: disjoint, preset: 'n14_extended' });
  await lab.init();

  // production runAutoLearnLoop 정합: 각 spawn 시점 영역 신규 cluster 만 reinforce.
  let totalReinforces = 0;
  for (let ci = 0; ci < N; ci += 1) {
    for (let r = 0; r < roundsPerSpawn[ci]; r += 1) {
      await client.inject(
        disjoint[ci].map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
      );
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
      totalReinforces += 1;
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
  return { perClusterAccuracy, totalAccuracy: total > 0 ? correct / total : 0, totalReinforces };
}

describe('Phase 2A.1 신규 cluster 영역 30+60 design (2026-05-31)', () => {
  it('★ 4 variants — 영역 production fix design 후보 영역', async () => {
    const v1 = await runProductionEquivalent([30, 30, 30, 30], 'sim-v1', 42);
    const v2 = await runProductionEquivalent([30, 90, 90, 90], 'sim-v2', 42);
    const v3 = await runProductionEquivalent([30, 60, 60, 60], 'sim-v3', 42);
    const v4 = await runProductionEquivalent([60, 90, 90, 90], 'sim-v4', 42);

    const variants = [
      { name: 'v1_baseline', schedule: [30, 30, 30, 30], ...v1 },
      { name: 'v2_first_30_rest_90', schedule: [30, 90, 90, 90], ...v2 },
      { name: 'v3_first_30_rest_60', schedule: [30, 60, 60, 60], ...v3 },
      { name: 'v4_all_60_90', schedule: [60, 90, 90, 90], ...v4 },
    ];

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-extra-rounds-new-cluster.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-extra-rounds-new-cluster-design',
      variants,
      analysis: {
        bestTotal: variants.reduce((a, b) => b.totalAccuracy > a.totalAccuracy ? b : a),
        bestLast: variants.reduce((a, b) => b.perClusterAccuracy[3] > a.perClusterAccuracy[3] ? b : a),
        firstReachedGuide: variants.find((v) => v.totalAccuracy >= 0.9),
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Production fix design candidates ====');
    for (const v of variants) {
      const last = v.perClusterAccuracy[v.perClusterAccuracy.length - 1];
      console.log(`  ${v.name}: [${v.schedule.join(',')}] total=${(v.totalAccuracy * 100).toFixed(0)}% last=${(last * 100).toFixed(0)}% (${v.totalReinforces})`);
    }
    console.log('');

    expect(v1.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
