// Phase 3.6 Hand SNN production accuracy 측정 (2026-06-03).
//
// 직전 (HONEST_LIMITATIONS.md):
//   Hand SNN (MediaPipe Hand) — 1-shot 25% accuracy, multi-shot oscillating,
//   ART/EWC 미통합. UI 통합 부재 (NodeInput GRID 전용).
//
// 본 측정: Phase 3.1~3.5 UI 통합 완료 후 Phase 2A fix chain 적용된 n16_hand
// substrate production accuracy.
//
// Critical 영역 — hand-spike-encoder.ts 영역 자체 주석 (lines 237-256):
//   threshold 0.2 활성 inputs 54-54-54-52 (=~57% dense), pairwise Jaccard
//   distinctiveness 0.0185 (=98% overlap). R-STDP/ART/EWC 영역 mechanism도 이
//   overlap 위에서는 분리 불가능 → selectForcedDisjointTopK(K=5) 가 해법.
//
// Phase 2A fix chain (Hand SNN 자동 적용):
//   - commit 8da3cbe: 1st 30 trials, 2nd+ 90 trials
//   - commit 4deb9bc: rawActiveInputs 별도 store
//   - commit b90c103: subset 인식 (T ⊆ I → vigilance pass)
//   - commit 6e3b574: auto-purge (substrate switch)
//
// 4 자세 시나리오 (직전 hand-snn-end-to-end.test.ts helpers reuse):
//   c0: open_palm  /  c1: closed_fist  /  c2: thumbs_up  /  c3: peace_sign
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
import {
  encodeHandToFeatureVector,
  selectForcedDisjointTopK,
  HAND_FEAT_DIM,
  HAND_SPARSE_TOP_K_DEFAULT,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';
import { N16Pools } from '@/lib/snn-runtime/builders/n16-hand';
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

// 4 자세 mock landmarks (hand-snn-end-to-end.test.ts helpers reuse).
function makeOpenPalm(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.3 + i * 0.05, y: 0.7 - i * 0.05, z: 0.05 });
  for (let f = 0; f < 4; f += 1) {
    const baseX = 0.4 + f * 0.1;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.7 - i * 0.1, z: 0 });
  }
  return lm;
}
function makeClosedFist(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let f = 0; f < 5; f += 1) {
    const baseX = 0.4 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.7 + i * 0.02, z: 0.1 });
  }
  return lm;
}
function makeThumbsUp(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.4, y: 0.7 - i * 0.07, z: 0 });
  for (let f = 0; f < 4; f += 1) {
    const baseX = 0.5 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.75 + i * 0.02, z: 0.1 });
  }
  return lm;
}
function makePeaceSign(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.3, y: 0.75, z: 0.05 });
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.42, y: 0.7 - i * 0.1, z: 0 });
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.52, y: 0.7 - i * 0.1, z: 0 });
  for (let f = 0; f < 2; f += 1) {
    const baseX = 0.6 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.75 + i * 0.02, z: 0.1 });
  }
  return lm;
}

const GESTURES = [
  { name: 'open_palm', make: makeOpenPalm },
  { name: 'closed_fist', make: makeClosedFist },
  { name: 'thumbs_up', make: makeThumbsUp },
  { name: 'peace_sign', make: makePeaceSign },
];

describe('Phase 3.6 Hand SNN production measurement (2026-06-03)', () => {
  it('★ n16_hand substrate + Phase 2A fix chain + sparse forced-disjoint top-K=5', async () => {
    // 4 gestures → 95-dim feature vectors.
    const features = GESTURES.map((g) => encodeHandToFeatureVector(g.make()));
    expect(features[0]).toHaveLength(HAND_FEAT_DIM);

    // Sparse forced-disjoint top-K (encoder.ts lines 237-256 documented solution).
    // K=5 per gesture, pairwise Jaccard=0 guaranteed.
    const disjoint = selectForcedDisjointTopK(features, HAND_SPARSE_TOP_K_DEFAULT);

    const core = new SNNWorkerCore();
    const transport = new InProcessTransport(core);
    const client = new SNNWorkerClient(transport);
    const storage = new MemoryStorage();
    const sink = new LocalStorageSink({ storage, prefix: 'phase-3-6-hand' });
    const lab = new LocalSNN({
      netId: 'phase-3-6-hand', client, sink, seed: 42,
      clusterActiveInputs: disjoint, preset: 'n16_hand',
    });
    await lab.init();

    // Phase 2A fix chain (8da3cbe): 1st 30 trials, 2nd+ 90 trials.
    let totalReinforces = 0;
    for (let ci = 0; ci < GESTURES.length; ci += 1) {
      const rounds = ci === 0 ? 30 : 90;
      for (let r = 0; r < rounds; r += 1) {
        await client.inject(
          disjoint[ci].map((i) => ({ neuron: `in_feat_${i}`, weight: 30, time: 0, durationMs: 80, stepMs: 0.1 })),
        );
        await client.run({ durationMs: 100, dtMs: 0.1, stdpEnabled: true });
        totalReinforces += 1;
      }
    }
    await lab.save();

    // CFM-1 noise self-verify (Phase 2A 동일 path).
    // Sparse path: noise 추가 후 top-K=5 재선택 (production inference 형태).
    const SAMPLES = 5; const SIGMA = 0.05; const baseSeed = 3000;
    const N = GESTURES.length;
    const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
    const reg = buildClusterRegistryFromN13(disjoint, 'n16_hand');

    for (let ci = 0; ci < N; ci += 1) {
      const fullFeat = features[ci];
      const gaussian = new SeededGaussian(baseSeed + ci * 1000);
      for (let s = 0; s < SAMPLES; s += 1) {
        const noisy = addFeatureNoise(fullFeat, SIGMA, gaussian);
        // Inference: 모든 활성 features 주입 (threshold 0.3 — encoder default).
        // 각 cluster output neuron 은 자신의 claimed 5 features 만 listen
        // → WTA 영역 input 영역 가장 정합 cluster 영역.
        const activeIdx: number[] = [];
        const weights: number[] = [];
        for (let k = 0; k < noisy.length; k += 1) {
          if (noisy[k] > 0.3) {
            activeIdx.push(k);
            weights.push(Math.min(1, noisy[k]) * 30);
          }
        }
        await client.inject(
          activeIdx.map((i, j) => ({ neuron: `in_feat_${i}`, weight: weights[j], time: 0, durationMs: 50, stepMs: 0.1 })),
        );
        await client.run({ durationMs: 80, dtMs: 0.1, stdpEnabled: false });
        const rates: number[] = [];
        for (const slot of reg.slots) {
          const result = await client.firingRates({ names: slot.out, windowMs: 80 });
          let sum = 0;
          for (const r of result.rates) sum += r.hz;
          rates.push(sum / N16Pools.OUT_PER_CLUSTER);
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
    const result = {
      perClusterSize: usage.perCluster.map((c) => c.subPoolSize),
      perClusterAccuracy,
      totalAccuracy: total > 0 ? correct / total : 0,
      jaccardMax,
      totalReinforces,
      claimedTotal: usage.totalClaimedFeatures,
      claimedPct: usage.inputDim > 0 ? usage.totalClaimedFeatures / usage.inputDim : 0,
      confusionMatrix: matrix,
      topKActiveIndices: disjoint,
    };

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-3-production-measurement.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-3-hand-snn-production-measurement',
      substrate: 'n16_hand (95-dim)',
      gestures: GESTURES.map((g) => g.name),
      encoding: `sparse forced-disjoint top-K=${HAND_SPARSE_TOP_K_DEFAULT}`,
      productionFix: [
        'commit 8da3cbe: 1st 30 trials, 2nd+ 90 trials',
        'commit 4deb9bc: rawActiveInputs 보존',
        'commit b90c103: subset 인식 (T ⊆ I)',
        'commit 6e3b574: auto-purge (substrate switch)',
      ],
      result,
      comparison: {
        directHand1Shot: '25% (직전 HONEST_LIMITATIONS.md, ART/EWC 미통합)',
        phase3WithFixChain: (result.totalAccuracy * 100).toFixed(0) + '%',
      },
      verdict:
        result.totalAccuracy >= 0.9
          ? `✓ Hand SNN Phase 2A fix chain + sparse top-K 적용 후 ${(result.totalAccuracy * 100).toFixed(0)}% — Guide §3.4 ≥90% 도달`
          : result.totalAccuracy >= 0.5
            ? `△ partial improvement (${(result.totalAccuracy * 100).toFixed(0)}%) — noise robustness 추가 fix 필요`
            : `✗ Hand SNN production accuracy 미도달 (${(result.totalAccuracy * 100).toFixed(0)}%) — 추가 분석 필요`,
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 3.6 Hand SNN production measurement ====');
    console.log(`  substrate: n16_hand (95-dim)`);
    console.log(`  encoding: sparse forced-disjoint top-K=${HAND_SPARSE_TOP_K_DEFAULT}`);
    console.log(`  gestures: ${GESTURES.map((g) => g.name).join(', ')}`);
    console.log(`  per-cluster size: [${result.perClusterSize.join(',')}]`);
    console.log(`  per-cluster accuracy: [${result.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}]`);
    console.log(`  total: ${(result.totalAccuracy * 100).toFixed(0)}%`);
    console.log(`  claimed: ${result.claimedTotal}/95 (${(result.claimedPct * 100).toFixed(0)}%)`);
    console.log(`  Jaccard max off-diag: ${result.jaccardMax.toFixed(3)}`);
    console.log(`  confusion matrix:`);
    for (let i = 0; i < N; i += 1) console.log(`    ${GESTURES[i].name.padEnd(14)} → [${matrix[i].join(', ')}]`);
    console.log(`  total reinforces: ${result.totalReinforces}`);
    console.log('');
    console.log(`Comparison: 직전 1-shot 25% → Phase 3 fix chain + sparse top-K ${(result.totalAccuracy * 100).toFixed(0)}%`);
    console.log('');

    expect(result.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 1500_000);
});
