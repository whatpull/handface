// Phase 2A.1 마지막 spawn 학습 강화 실험 (2026-05-31).
//
// 직전 spawn-order experiment 발견:
//   Order A (production): c3 (3 features) = 0% accuracy
//   Order B (swap):       c3 (4 features) = 0% accuracy
//   → under-allocation 자체가 root cause 아님. 마지막 spawn 자체의 학습 부족.
//
// 본 실험: 마지막 spawn 클러스터에 추가 R-STDP 라운드 부여 → 학습 강화 효과 측정.
//   Variant 1: 균등 30 round (baseline)
//   Variant 2: 마지막 클러스터만 90 round (3x)
//   Variant 3: 마지막 클러스터만 180 round (6x)
//
// 가설:
//   Variant 2/3 에서 마지막 클러스터 accuracy 가 0% → 양수로 회복 시:
//     → R-STDP under-training 이 root cause, 학습 강화로 mitigation 가능.
//   여전히 0% 시:
//     → R-STDP 학습 자체가 마지막 spawn 에 비효율 (weight equilibrium 도달 한계).
//     → Phase 2D (EWC) 또는 다른 메커니즘 필요.

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
  [0, 1, 2, 3, 4],       // c0 horizontal
  [0, 5, 10, 15, 20],    // c1 vertical
  [0, 6, 12, 18, 24],    // c2 diag-back
  [4, 8, 12, 16, 20],    // c3 diag-fore
];

async function runWithReinforceSchedule(
  baseRounds: number,
  lastClusterExtraMultiplier: number,
  netId: string,
  seed: number,
): Promise<{
  perClusterSize: number[];
  perClusterAccuracy: number[];
  totalAccuracy: number;
  matrix: number[][];
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

  // 균등 학습 (모든 클러스터 baseRounds 만큼).
  for (let round = 0; round < baseRounds; round += 1) {
    for (const inputs of disjoint) {
      await client.inject(
        inputs.map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
      );
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    }
  }

  // 마지막 클러스터만 추가 학습 (lastClusterExtraMultiplier > 1 시).
  if (lastClusterExtraMultiplier > 1) {
    const extraRounds = baseRounds * (lastClusterExtraMultiplier - 1);
    const lastInputs = disjoint[N - 1];
    for (let round = 0; round < extraRounds; round += 1) {
      await client.inject(
        lastInputs.map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
      );
      await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
    }
  }
  await lab.save();

  // CFM-1 measurement.
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
  };
}

describe('Phase 2A.1 마지막 spawn 학습 강화 실험 (2026-05-31)', () => {
  it('★ 30 / 30+90 / 30+180 round → 마지막 클러스터 accuracy 회복 여부', async () => {
    const v1 = await runWithReinforceSchedule(30, 1, 'v1-baseline', 42);
    const v2 = await runWithReinforceSchedule(30, 3, 'v2-3x-last', 42);
    const v3 = await runWithReinforceSchedule(30, 6, 'v3-6x-last', 42);

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-2a-1-last-spawn-reinforce.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-2a-1-last-spawn-reinforce',
      variants: {
        v1_baseline_30: { rounds: 30, lastExtra: 0, ...v1 },
        v2_last_extra_60: { rounds: 30, lastExtra: 60, ...v2 },
        v3_last_extra_150: { rounds: 30, lastExtra: 150, ...v3 },
      },
      hypothesis_test: {
        last_cluster_accuracy: {
          v1: v1.perClusterAccuracy[3],
          v2: v2.perClusterAccuracy[3],
          v3: v3.perClusterAccuracy[3],
        },
        verdict: v2.perClusterAccuracy[3] > v1.perClusterAccuracy[3] || v3.perClusterAccuracy[3] > v1.perClusterAccuracy[3]
          ? 'under-training 가설 부분 지지 — 추가 학습으로 마지막 클러스터 회복'
          : '추가 학습으로도 0% 유지 — R-STDP 학습 자체로는 mitigation 불가, Phase 2D (EWC) 또는 다른 메커니즘 필요',
      },
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== 마지막 spawn 학습 강화 실험 결과 ====');
    console.log(`v1 (30 round 균등):     per-cluster=[${v1.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}] total=${(v1.totalAccuracy * 100).toFixed(0)}%`);
    console.log(`v2 (마지막 +60 round): per-cluster=[${v2.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}] total=${(v2.totalAccuracy * 100).toFixed(0)}%`);
    console.log(`v3 (마지막 +150 round): per-cluster=[${v3.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}] total=${(v3.totalAccuracy * 100).toFixed(0)}%`);
    console.log('');

    expect(v1.totalAccuracy).toBeGreaterThanOrEqual(0);
    expect(v2.totalAccuracy).toBeGreaterThanOrEqual(0);
    expect(v3.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 600_000);
});
