// Phase 2A.1 incremental cluster 추가 catastrophic interference 측정 (2026-05-31).
//
// 직전 scaling 측정 발견:
//   N=4: c3 = 60% (총 90%)
//   N=5: c3 = 40% (총 88%, 새 c4 추가됨)
// → 5번째 spawn 의 R-STDP 학습이 4번째 (c3) 의 weights 를 약화시킴.
//
// 본 측정 시나리오:
//   variant A: N=4 학습 후 inference accuracy 측정
//   variant B: N=4 학습 → N=5 (5번째 cluster c4 추가) → inference accuracy 측정
//   → A 와 B 의 c0-c3 accuracy 차이로 catastrophic interference 정량화.
//
// 학술 정합 (Kirkpatrick 2017 EWC):
//   Sequential incremental learning 에서 prior task weights 가 새 task 학습 시
//   degrade. EWC 는 Fisher information matrix 로 중요 weights 를 anchor.
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

const RAW_PATTERNS_5 = [
  [0, 1, 2, 3, 4],         // c0 row 0
  [0, 5, 10, 15, 20],      // c1 col 0
  [0, 6, 12, 18, 24],      // c2 diag-back
  [4, 8, 12, 16, 20],      // c3 diag-fore
  [20, 21, 22, 23, 24],    // c4 row 4 (5번째 패턴)
];

async function trainAndMeasure(
  N: number,
  netId: string,
  seed: number,
): Promise<{
  N: number;
  perClusterAccuracy: number[];
  totalAccuracy: number;
}> {
  const rawPatterns = RAW_PATTERNS_5.slice(0, N);
  const fullActive = rawPatterns.map(rawToFullActive);
  const disjoint = applyForceDisjoint(fullActive);

  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const storage = new MemoryStorage();
  const sink = new LocalStorageSink({ storage, prefix: netId });
  const lab = new LocalSNN({
    netId, client, sink, seed, clusterActiveInputs: disjoint, preset: 'n14_extended',
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
  return { N, perClusterAccuracy, totalAccuracy: total > 0 ? correct / total : 0 };
}

describe('Phase 2A.1 incremental cluster 추가 interference 분석 (2026-05-31)', () => {
  it('★ N=4 baseline → N=5 추가 시 c0-c3 accuracy 변화', async () => {
    // Variant A: 4 패턴까지만 학습 후 측정.
    const a = await trainAndMeasure(4, 'incr-a-n4', 42);
    // Variant B: 5 패턴 모두 학습 후 측정 (c4 추가가 c0-c3 에 미치는 영향).
    const b = await trainAndMeasure(5, 'incr-b-n5', 42);

    // c0-c3 accuracy 변화 — c4 추가가 catastrophic interference 유발 정량화.
    const interferenceDelta = a.perClusterAccuracy.map((accA, i) => {
      const accB = b.perClusterAccuracy[i];
      return { cluster: i, beforeAddC4: accA, afterAddC4: accB, delta: accB - accA };
    });

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-incremental-add.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-incremental-cluster-add-interference',
      variantA_N4: a,
      variantB_N5: b,
      interferenceDelta,
      verdict: interferenceDelta.some((d) => d.delta < -0.2)
        ? 'catastrophic interference 확정 — 5번째 cluster 추가가 직전 cluster 의 weights 약화'
        : 'interference 영향 미미 — fix 효과 안정적',
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 2A.1 incremental add interference ====');
    console.log(`N=4: per-cluster=[${a.perClusterAccuracy.map((v) => (v * 100).toFixed(0) + '%').join(', ')}] total=${(a.totalAccuracy * 100).toFixed(0)}%`);
    console.log(`N=5: per-cluster=[${b.perClusterAccuracy.map((v) => (v * 100).toFixed(0) + '%').join(', ')}] total=${(b.totalAccuracy * 100).toFixed(0)}%`);
    console.log('interference delta (after add c4):');
    for (const d of interferenceDelta) {
      const arrow = d.delta < 0 ? '↓' : d.delta > 0 ? '↑' : '=';
      console.log(`  c${d.cluster}: ${(d.beforeAddC4 * 100).toFixed(0)}% → ${(d.afterAddC4 * 100).toFixed(0)}% ${arrow} (${(d.delta * 100).toFixed(0)}%p)`);
    }
    console.log('');

    expect(a.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
