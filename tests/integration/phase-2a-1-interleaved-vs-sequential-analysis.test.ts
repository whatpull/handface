// Phase 2A.1 interleaved vs sequential training pattern (2026-05-31).
//
// 직전 sweep 발견: ROUNDS 증가만으로는 sequential training 의 마지막 cluster
// under-learning fix 불가능. 깊은 가설: interleaved (round-robin) training 이
// sequential 보다 fundamentally 효과적 — prior 실험 v2 (30 round-robin + 60 extra)
// 80% accuracy 와 sequential [30,60,90,120] 20% accuracy 차이.
//
// 본 측정: 3 variants 직접 비교:
//   variant A: sequential (production 정합) — 각 cluster 30 round 고립 학습
//   variant B: round-robin (interleaved) — 30 rounds × 4 cluster round-robin
//   variant C: round-robin + extra for last — B + 60 extra for c3
//
// 학술 정합:
//   Robins 1995 sequential vs interleaved catastrophic forgetting:
//   interleaved (pseudo-rehearsal) 이 prior task 보호 + 신규 task 학습 양립.
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
  [0, 1, 2, 3, 4],
  [0, 5, 10, 15, 20],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

type Schedule = 'sequential' | 'roundRobin' | 'roundRobinPlusExtra';

async function runWithPattern(
  schedule: Schedule,
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
    netId, client, sink, seed, clusterActiveInputs: disjoint, preset: 'n14_extended',
  });
  await lab.init();

  let totalReinforces = 0;
  const reinforce = async (ci: number) => {
    await client.inject(
      disjoint[ci].map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
    );
    await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    totalReinforces += 1;
  };

  if (schedule === 'sequential') {
    // production 정합: 각 cluster 30 round 고립.
    for (let ci = 0; ci < N; ci += 1) {
      for (let r = 0; r < 30; r += 1) await reinforce(ci);
    }
  } else if (schedule === 'roundRobin') {
    // 30 round, 매 round 마다 4 cluster 차례로.
    for (let r = 0; r < 30; r += 1) {
      for (let ci = 0; ci < N; ci += 1) await reinforce(ci);
    }
  } else if (schedule === 'roundRobinPlusExtra') {
    // 30 round-robin + 60 extra for last cluster (prior 성공 실험 v2 재현).
    for (let r = 0; r < 30; r += 1) {
      for (let ci = 0; ci < N; ci += 1) await reinforce(ci);
    }
    for (let r = 0; r < 60; r += 1) await reinforce(N - 1);
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
  return { perClusterAccuracy, totalAccuracy: total > 0 ? correct / total : 0, totalReinforces };
}

describe('Phase 2A.1 interleaved vs sequential analysis', () => {
  it('★ sequential / round-robin / round-robin + extra 비교', async () => {
    const seq = await runWithPattern('sequential', 'iv-seq', 42);
    const rr = await runWithPattern('roundRobin', 'iv-rr', 42);
    const rrExtra = await runWithPattern('roundRobinPlusExtra', 'iv-rr-extra', 42);

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-interleaved-vs-sequential.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-interleaved-vs-sequential',
      variants: {
        sequential: { description: 'production: each cluster 30 round isolated', ...seq },
        roundRobin: { description: '30 round, every round: all 4 clusters round-robin', ...rr },
        roundRobinPlusExtra: { description: 'round-robin 30 + extra 60 for last cluster', ...rrExtra },
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== interleaved vs sequential ====');
    console.log(`sequential          : per-cluster=[${seq.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}] total=${(seq.totalAccuracy * 100).toFixed(0)}% (${seq.totalReinforces} reinforces)`);
    console.log(`roundRobin          : per-cluster=[${rr.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}] total=${(rr.totalAccuracy * 100).toFixed(0)}% (${rr.totalReinforces} reinforces)`);
    console.log(`roundRobinPlusExtra : per-cluster=[${rrExtra.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}] total=${(rrExtra.totalAccuracy * 100).toFixed(0)}% (${rrExtra.totalReinforces} reinforces)`);
    console.log('');

    expect(seq.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
