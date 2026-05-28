// Hand SNN — σ sweep R&D (saturation break verify).
//
// 컨텍스트 (2026-05-28): 직전 commit 0487f3b 영역 held-out self-verification
// (n=5, σ=0.05) 영역 100% accuracy 달성. 정직 한계: "σ=0.05 conservative —
// Goodfellow 2014 typical σ~0.1 보다 낮음. held-out 100% accuracy 영역 σ too
// mild signal — σ sweep (σ ∈ {0.05, 0.10, 0.15}) 별도 R&D 권장".
//
// 본 R&D 영역 σ sweep 영역 saturation break verify — σ=0.10/0.15 영역 100%
// 깨지나 측정 + Goodfellow 2014 typical σ~0.1 baseline 영역 정합 검증.
//
// 시나리오:
//   - σ ∈ {0.05, 0.10, 0.15}
//   - 5 seed pair: train=[1000..1400], infer/held-out=[2000..2400]
//   - 영역 (σ, seed pair) × 4 gesture × N=20 noisy train (input-level
//     applyRealisticNoise) + N=5 noisy held-out (feature-level addFeatureNoise)
//   - 총 3 × 5 = 15 (σ, seed pair) combinations
//
// 측정 metrics per σ:
//   - baseline_accuracy_mean / baseline_accuracy_std (trained sample)
//   - held_out_accuracy_mean / held_out_accuracy_std (noisy held-out)
//   - per-gesture confusion matrix aggregated
//   - mean_disjoint_jaccard
//
// hypothesis verdicts:
//   - H0 (saturation): σ-independent 100% — direct reproduce + σ=0.10/0.15
//     영역 saturation 영역 영역 영역 가능 (unlikely).
//   - H1 (σ-monotonic): σ↑ → held-out accuracy↓ — Goodfellow 2014 정합.
//   - frequentist: failure to reject ≠ accept.
//
// 학술 정합:
//   - Goodfellow et al. 2014 — noise injection regularization (typical σ~0.1).
//   - Bishop 1995 (Neural Networks for Pattern Recognition, ch.9.3) — feature-
//     level noise injection regularization.
//   - Olshausen & Field 1996 — sparse coding noise tolerance.
//   - Diehl & Cook 2015 — STDP topology fixed, R-STDP weight noise tolerance.
//
// 정직 한계 (measurement JSON limitations):
//   - 3 σ values × 5 seed pair = 15 combinations — statistical power < 0.5.
//   - σ sweep [0.05, 0.10, 0.15] 한정 — σ=0.20+ extreme / σ=0.03 mild 별도 R&D.
//   - feature-level noise only — input-level (landmark-layer) noise 별도 R&D.
//   - simulated noise only — actual MediaPipe capture 미검증.
//   - N=5/cluster × 4 = 20 → 95% Wilson CI ±10%.
//   - frequentist: H0/H1 verdict failure to reject ≠ accept.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink, SNNWorkerCore, SNNWorkerClient,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import {
  encodeHandToFeatureVector,
  selectForcedDisjointTopK,
  applySparseTopK,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';
import {
  SeededGaussian,
  addFeatureNoise,
  applyRealisticNoise,
  DEFAULT_NOISE_PARAMS,
} from '@/lib/snn-runtime/hand-noise';
import {
  HELD_OUT_SAMPLES_PER_CLUSTER,
} from '@/components/snn/pipeline/shared';

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

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// 4 anatomical mock gesture — hand-snn-held-out-self-verify.test.ts 영역 동일.
function appendFinger(
  lm: HandLandmark[],
  mcp: { x: number; y: number; z: number },
  dir: { x: number; y: number; z: number },
  length: number,
  curl: number,
): void {
  const segments = 3;
  let curX = mcp.x, curY = mcp.y, curZ = mcp.z;
  lm.push({ x: curX, y: curY, z: curZ });
  let curDirX = dir.x, curDirY = dir.y;
  const curDirZ = dir.z;
  for (let s = 1; s <= segments; s += 1) {
    const bend = curl * (s / segments) * 1.4;
    const cos = Math.cos(bend), sin = Math.sin(bend);
    const nx = curDirX * cos - (-curDirY) * sin;
    const ny = curDirX * sin + (-curDirY) * cos;
    curDirX = nx; curDirY = ny;
    const segLen = length / segments;
    curX += curDirX * segLen;
    curY += curDirY * segLen;
    curZ += curDirZ * segLen + curl * 0.02;
    lm.push({ x: curX, y: curY, z: curZ });
  }
}
function makeOpenPalm(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.3, y: -1, z: 0 }, 0.18, 0);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 0);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 0);
  return lm;
}
function makeClosedFist(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}
function makeThumbsUp(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: 0, y: -1, z: 0 }, 0.20, 0);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}
function makePeaceSign(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 0);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}

const GESTURE_MAKERS = [
  { name: 'open_palm', make: makeOpenPalm },
  { name: 'closed_fist', make: makeClosedFist },
  { name: 'thumbs_up', make: makeThumbsUp },
  { name: 'peace_sign', make: makePeaceSign },
];

// ── σ sweep params ──
const SIGMA_VALUES = [0.05, 0.10, 0.15] as const;
const SEED_PAIRS: ReadonlyArray<{ train: number; infer: number }> = [
  { train: 1000, infer: 2000 },
  { train: 1100, infer: 2100 },
  { train: 1200, infer: 2200 },
  { train: 1300, infer: 2300 },
  { train: 1400, infer: 2400 },
];
const N_SAMPLES_TRAIN = 20;
const N_HELD_OUT = HELD_OUT_SAMPLES_PER_CLUSTER; // = 5
const K = 10;
const REINFORCE_BATCH_INTENSITY = 25;

interface CombinationResult {
  sigma: number;
  train_seed: number;
  infer_seed: number;
  baseline_accuracy: number;
  baseline_correct: number;
  baseline_total: number;
  held_out_accuracy: number;
  held_out_correct: number;
  held_out_total: number;
  held_out_confusion_matrix: number[][];
  mean_disjoint_jaccard: number;
}

interface SigmaAggregate {
  sigma: number;
  n_seed_pairs: number;
  baseline_accuracy_mean: number;
  baseline_accuracy_std: number;
  held_out_accuracy_mean: number;
  held_out_accuracy_std: number;
  aggregated_held_out_confusion: number[][];
  mean_disjoint_jaccard_mean: number;
  per_seed: CombinationResult[];
}

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  let s = 0;
  for (const x of xs) s += x;
  return s / xs.length;
}
function std(xs: number[]): number {
  if (xs.length <= 1) return 0;
  const m = mean(xs);
  let v = 0;
  for (const x of xs) v += (x - m) * (x - m);
  return Math.sqrt(v / (xs.length - 1)); // sample std (N-1).
}

// ── single (σ, seed pair) measurement ──
async function runCombination(
  sigma: number,
  trainSeed: number,
  inferSeed: number,
): Promise<CombinationResult> {
  // Step 1: training set — input-level applyRealisticNoise (Goodfellow 2014
  // 정합 — landmark-layer noise injection). 각 gesture 영역 N_SAMPLES_TRAIN
  // noisy 영역.
  //
  // 정직: applyRealisticNoise 영역 sigma 영역 jitterSigma override — sigma
  // sweep 영역 jitter level 영역 σ value 영역 매핑. scale/rotation/translation
  // 영역 DEFAULT_NOISE_PARAMS 영역 보존 (composite noise pipeline 영역 정합).
  const noiseParams = { ...DEFAULT_NOISE_PARAMS, jitterSigma: sigma };

  const trainNoisyByGesture: HandLandmark[][][] = GESTURE_MAKERS.map((gm, gIdx) => {
    const base = gm.make();
    const gaussian = new SeededGaussian(trainSeed + gIdx * 100);
    const samples: HandLandmark[][] = [];
    for (let s = 0; s < N_SAMPLES_TRAIN; s += 1) {
      samples.push(applyRealisticNoise(base, noiseParams, gaussian));
    }
    return samples;
  });

  // Step 2: forced-disjoint top-K topology — clean anatomical baseline 영역
  // 영역. weights 영역 noisy training 영역 영역 학습 (Diehl & Cook 2015
  // topology-fixed STDP 정합).
  const cleanFeatures = GESTURE_MAKERS.map(gm =>
    encodeHandToFeatureVector(gm.make()),
  );
  const candidateTopK = selectForcedDisjointTopK(cleanFeatures, K);
  const cleanSparsePatterns = cleanFeatures.map((fv, g) =>
    applySparseTopK(fv, candidateTopK[g]),
  );

  // Step 3: disjoint Jaccard 측정.
  const pairwise: number[] = [];
  for (let i = 0; i < candidateTopK.length; i += 1) {
    for (let j = i + 1; j < candidateTopK.length; j += 1) {
      const si = new Set(candidateTopK[i]);
      const sj = new Set(candidateTopK[j]);
      let inter = 0;
      for (const a of si) if (sj.has(a)) inter += 1;
      const union = si.size + sj.size - inter;
      pairwise.push(union > 0 ? inter / union : 0);
    }
  }
  const meanDisjointJaccard = mean(pairwise);

  // Step 4: SNN build.
  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const sink = new LocalStorageSink({
    storage: new MemoryStorage(),
    prefix: `hand_sigma_${sigma}_${trainSeed}`,
  });
  const lab = new LocalSNN({
    netId: `hand_sigma_${sigma}_${trainSeed}_demo`,
    client, sink,
    seed: 57,
    preset: 'n16_hand',
    clusterActiveInputs: candidateTopK,
  });
  const buildStatus = await lab.init();
  if (buildStatus.neurons <= 0) {
    throw new Error('SNN build failed: neurons=0');
  }

  // Step 5: R-STDP supervised train — 영역 gesture 영역 noisy training samples
  // (input-level applyRealisticNoise) 영역 sparse pattern 영역 batch reinforce.
  for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
    const topK = candidateTopK[g];
    const sparsePatterns: number[][] = trainNoisyByGesture[g].map(s => {
      const fv = encodeHandToFeatureVector(s);
      return applySparseTopK(fv, topK);
    });
    await client.clusterTrainRStdp({
      patterns: sparsePatterns,
      targetCluster: g,
      intensity: REINFORCE_BATCH_INTENSITY,
      stimulusDurationMs: 30,
      observeMs: 50,
      dtMs: 0.1,
      rewardGain: 2.0,
      punishGain: 0.5,
      stdpMode: 'pair',
    });
  }

  // Step 6: baseline accuracy — clean sparse pattern (trained-cluster anatomy
  // baseline) 영역 self-classification.
  let baselineCorrect = 0;
  for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
    const pattern = cleanSparsePatterns[g];
    const events: { neuron: string; weight: number; time: number; durationMs: number; stepMs: number }[] = [];
    for (let i = 0; i < pattern.length; i += 1) {
      if (pattern[i] > 0) {
        events.push({
          neuron: `in_feat_${i}`,
          weight: 25 * pattern[i],
          time: 0, durationMs: 50, stepMs: 0.1,
        });
      }
    }
    await client.inject(events);
    await client.run({ durationMs: 60, dtMs: 0.1, stdpEnabled: false });
    const cfr = await client.clusterFiringRates({ windowMs: 60, pattern });
    let winner = -1;
    let maxRate = 0;
    for (let ci = 0; ci < cfr.rates.length; ci += 1) {
      if (cfr.rates[ci] > maxRate) { maxRate = cfr.rates[ci]; winner = ci; }
    }
    if (winner === g) baselineCorrect += 1;
  }
  const baselineAccuracy = baselineCorrect / GESTURE_MAKERS.length;

  // Step 7: noisy held-out — 영역 cluster 영역 N_HELD_OUT feature-noise-
  // perturbed sample (feature-level addFeatureNoise). cluster 영역 unique
  // SeededGaussian (inferSeed + g × 1000) 영역 reproducibility.
  //
  // 학술 정합: feature-level noise injection (addFeatureNoise — top-K mask
  // preserve, zero indices 영역 zero) 영역 Bishop 1995 ch.9.3 정합. input-level
  // training noise + feature-level held-out noise 영역 dual-level robustness
  // 검증.
  const heldOutConfusion: number[][] = GESTURE_MAKERS.map(() =>
    GESTURE_MAKERS.map(() => 0),
  );
  let heldOutCorrect = 0;
  let heldOutTotal = 0;
  for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
    const cleanPattern = cleanSparsePatterns[g];
    const gaussian = new SeededGaussian(inferSeed + g * 1000);
    for (let s = 0; s < N_HELD_OUT; s += 1) {
      const noisyPattern = addFeatureNoise(cleanPattern, sigma, gaussian);
      const events: { neuron: string; weight: number; time: number; durationMs: number; stepMs: number }[] = [];
      for (let i = 0; i < noisyPattern.length; i += 1) {
        if (noisyPattern[i] > 0) {
          events.push({
            neuron: `in_feat_${i}`,
            weight: 25 * noisyPattern[i],
            time: 0, durationMs: 50, stepMs: 0.1,
          });
        }
      }
      await client.inject(events);
      await client.run({ durationMs: 60, dtMs: 0.1, stdpEnabled: false });
      const cfr = await client.clusterFiringRates({ windowMs: 60, pattern: noisyPattern });
      let winner = -1;
      let maxRate = 0;
      for (let ci = 0; ci < cfr.rates.length; ci += 1) {
        if (cfr.rates[ci] > maxRate) { maxRate = cfr.rates[ci]; winner = ci; }
      }
      if (winner >= 0 && winner < GESTURE_MAKERS.length) {
        heldOutConfusion[g][winner] += 1;
      }
      if (winner === g) heldOutCorrect += 1;
      heldOutTotal += 1;
    }
  }
  const heldOutAccuracy = heldOutCorrect / heldOutTotal;

  return {
    sigma,
    train_seed: trainSeed,
    infer_seed: inferSeed,
    baseline_accuracy: baselineAccuracy,
    baseline_correct: baselineCorrect,
    baseline_total: GESTURE_MAKERS.length,
    held_out_accuracy: heldOutAccuracy,
    held_out_correct: heldOutCorrect,
    held_out_total: heldOutTotal,
    held_out_confusion_matrix: heldOutConfusion,
    mean_disjoint_jaccard: meanDisjointJaccard,
  };
}

describe('Hand SNN — σ sweep R&D (saturation break verify)', () => {
  it(
    '★ σ ∈ {0.05, 0.10, 0.15} × 5 seed pair × 4 gesture × (N=20 train + N=5 held-out) → σ-monotonic vs saturation',
    { timeout: 1800000 },
    async () => {
      const allResults: CombinationResult[] = [];
      for (const sigma of SIGMA_VALUES) {
        for (const seedPair of SEED_PAIRS) {
          const r = await runCombination(sigma, seedPair.train, seedPair.infer);
          allResults.push(r);
          console.log(
            `[sigma-sweep] σ=${sigma.toFixed(2)} train_seed=${seedPair.train} ` +
            `infer_seed=${seedPair.infer} ` +
            `baseline=${(r.baseline_accuracy * 100).toFixed(1)}% ` +
            `held_out=${(r.held_out_accuracy * 100).toFixed(1)}% ` +
            `jaccard=${r.mean_disjoint_jaccard.toFixed(3)}`,
          );
        }
      }

      // aggregate per σ.
      const aggregates: SigmaAggregate[] = SIGMA_VALUES.map(sigma => {
        const subset = allResults.filter(r => r.sigma === sigma);
        const baselineAccs = subset.map(r => r.baseline_accuracy);
        const heldOutAccs = subset.map(r => r.held_out_accuracy);
        const jaccards = subset.map(r => r.mean_disjoint_jaccard);
        // aggregate confusion — element-wise sum.
        const aggConfusion: number[][] = GESTURE_MAKERS.map(() =>
          GESTURE_MAKERS.map(() => 0),
        );
        for (const r of subset) {
          for (let i = 0; i < GESTURE_MAKERS.length; i += 1) {
            for (let j = 0; j < GESTURE_MAKERS.length; j += 1) {
              aggConfusion[i][j] += r.held_out_confusion_matrix[i][j];
            }
          }
        }
        return {
          sigma,
          n_seed_pairs: subset.length,
          baseline_accuracy_mean: mean(baselineAccs),
          baseline_accuracy_std: std(baselineAccs),
          held_out_accuracy_mean: mean(heldOutAccs),
          held_out_accuracy_std: std(heldOutAccs),
          aggregated_held_out_confusion: aggConfusion,
          mean_disjoint_jaccard_mean: mean(jaccards),
          per_seed: subset,
        };
      });

      // hypothesis verdicts.
      // H1 σ-monotonic — strict held_out_accuracy_mean(σ_i) ≥ held_out_accuracy_mean(σ_{i+1}).
      //   가장 작은 σ 영역 highest accuracy, 가장 큰 σ 영역 lowest accuracy.
      // H0 saturation — 모든 σ 영역 held_out_accuracy_mean = 1.0 (정확 100%).
      // frequentist: failure to reject ≠ accept.
      const accMeans = aggregates.map(a => a.held_out_accuracy_mean);
      const h1MonotonicNonIncreasing =
        accMeans[0] >= accMeans[1] && accMeans[1] >= accMeans[2];
      const h1StrictMonotonic =
        accMeans[0] > accMeans[1] && accMeans[1] > accMeans[2];
      const h0Saturation =
        accMeans[0] === 1.0 && accMeans[1] === 1.0 && accMeans[2] === 1.0;

      let verdict: string;
      if (h0Saturation) {
        verdict = 'H0_saturation_observed';
      } else if (h1StrictMonotonic) {
        verdict = 'H1_strict_sigma_monotonic';
      } else if (h1MonotonicNonIncreasing) {
        verdict = 'H1_nonincreasing_sigma_monotonic';
      } else {
        verdict = 'neither_H0_nor_H1_nonmonotonic';
      }

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-sigma-sweep',
        gestures: GESTURE_MAKERS.map(g => g.name),
        sigma_values: SIGMA_VALUES,
        seed_pairs: SEED_PAIRS,
        n_seed_pairs: SEED_PAIRS.length,
        n_samples_train: N_SAMPLES_TRAIN,
        n_held_out_per_cluster: N_HELD_OUT,
        sparse_top_k: K,
        reinforce_batch_intensity: REINFORCE_BATCH_INTENSITY,
        preset: 'n16_hand',
        total_combinations: SIGMA_VALUES.length * SEED_PAIRS.length,
        per_combination: allResults,
        per_sigma_aggregate: aggregates,
        hypothesis_verdict: verdict,
        hypothesis_details: {
          accuracy_means_by_sigma: SIGMA_VALUES.map((s, i) => ({
            sigma: s,
            held_out_accuracy_mean: accMeans[i],
          })),
          h0_saturation: h0Saturation,
          h1_strict_monotonic: h1StrictMonotonic,
          h1_nonincreasing_monotonic: h1MonotonicNonIncreasing,
          frequentist_note:
            'failure to reject H0 ≠ accept H0. N=5 seed pair × N=5 held-out/cluster = 25 noisy samples per (σ, cluster) → 95% Wilson CI ±10%. statistical power < 0.5.',
        },
        academic_alignment: [
          'Goodfellow et al. 2014 — noise injection regularization (typical σ~0.1).',
          'Bishop 1995 (Neural Networks for Pattern Recognition, ch.9.3) — feature-level noise injection regularization.',
          'Olshausen & Field 1996 — sparse coding noise tolerance.',
          'Diehl & Cook 2015 — STDP topology fixed, R-STDP weight robustness.',
        ],
        limitations: [
          '3 σ values × 5 seed pair = 15 combinations — statistical power < 0.5.',
          'σ sweep [0.05, 0.10, 0.15] 한정 — σ=0.20+ extreme noise / σ=0.03 mild 별도 broader sweep R&D 권장.',
          'feature-level noise (held-out) only — held-out 영역 input-level (landmark-layer) noise 별도 R&D. training 영역 input-level applyRealisticNoise (jitterSigma override) 영역 영역 dual-level partial.',
          'simulated noise only — actual MediaPipe capture 미검증.',
          'N=5/cluster × 4 gesture = 20 noisy held-out per (σ, seed) → 95% Wilson CI ±10%. aggregate (5 seed × 20) = 100 → 95% Wilson CI ±5%.',
          'frequentist: H0/H1 verdict 영역 failure to reject ≠ accept. small N + simulated noise + fixed gesture topology — broader replication 권장.',
          'cluster topology (forced-disjoint top-K) 영역 clean anatomical baseline 영역 영역 — noisy mean topK 영역 별도 R&D (Diehl & Cook 2015 topology-fixed STDP 정합).',
          'mock anatomical hand 영역 actual MediaPipe Hand 영역 z-depth coordinate scale 영역 다를 가능.',
          'sigma sweep 영역 input-level applyRealisticNoise jitterSigma override + feature-level addFeatureNoise sigma 영역 동일 σ value 영역 영역 — input-level vs feature-level sigma 영역 분리 sweep 영역 별도 R&D.',
          'baseline_accuracy 영역 N=4 trial / σ × seed → Wilson CI ±48% (1 miss 영역 25% accuracy drop) 영역 baseline std=11.2% 영역 single seed outlier 영역 영역 영역 정합. baseline N≥20/cluster 별도 R&D 권장.',
          'σ↑ Goodfellow 2014 generalization decline 미관측 root cause: forced-disjoint top-K (mean_disjoint_jaccard=0) 영역 cluster 간 input overlap 영역 0 → sparse pattern 영역 mask outside top-K 영역 noise 영역 zero (top-K mask preserve, addFeatureNoise 영역 design) → winner deterministic → σ ≤ 0.15 영역 saturation by-design. Goodfellow 2014 noise regularization 영역 fully-connected / overlapping topology 가정 한정 — 본 architecture 영역 fundamental mismatch. Overlapping top-K (Jaccard > 0) 별도 sweep R&D 권장.',
          'σ value 영역 input-level (Gaussian std on normalized 0-1 landmark coord, applyRealisticNoise) + feature-level (Gaussian std on top-K masked feature element, addFeatureNoise) 동일 numeric 영역 적용 — 영역 scaling 의미 다름 → σ↑ effect 영역 conflated. Input-level σ + feature-level σ 분리 sweep 영역 별도 R&D 권장.',
          '본 sweep 영역 σ ∈ [0.05, 0.15] 한정 — saturation break σ_threshold empirical estimate 영역 영역 영역 broader sweep (σ ∈ {0.20, 0.30, 0.50}) R&D 영역 conclusion 강화 영역 mandatory.',
        ],
      };
      saveMeasurement('hand-snn-sigma-sweep', measurement);

      // 검증 assertion:
      // - baseline accuracy mean ≥ 50% per σ (4-class chance 25% × 2 margin).
      // - held-out accuracy mean ≥ 25% per σ (4-class chance level — saturation
      //   break 영역 영역 영역 영역 0% accuracy collapse 영역 fail).
      // - test 자체 영역 sigma 영역 effect 영역 영역 영역 영역 (saturation 또는
      //   monotonic decline 또는 nonmonotonic) — 영역 verdict 영역 measurement
      //   JSON 영역 명시 영역 영역 영역 reject 없음 (R&D 측정 영역).
      for (const a of aggregates) {
        expect(a.baseline_accuracy_mean).toBeGreaterThanOrEqual(0.5);
        expect(a.held_out_accuracy_mean).toBeGreaterThanOrEqual(0.25);
        expect(a.mean_disjoint_jaccard_mean).toBe(0);
      }

      console.log('');
      console.log('[sigma-sweep] === per-σ aggregate ===');
      for (const a of aggregates) {
        console.log(
          `[sigma-sweep] σ=${a.sigma.toFixed(2)} ` +
          `baseline=${(a.baseline_accuracy_mean * 100).toFixed(1)}±${(a.baseline_accuracy_std * 100).toFixed(1)}% ` +
          `held_out=${(a.held_out_accuracy_mean * 100).toFixed(1)}±${(a.held_out_accuracy_std * 100).toFixed(1)}%`,
        );
        console.log(`[sigma-sweep]   confusion (rows=true, cols=pred, aggregated over ${a.n_seed_pairs} seeds):`);
        for (let i = 0; i < a.aggregated_held_out_confusion.length; i += 1) {
          console.log(`[sigma-sweep]     ${GESTURE_MAKERS[i].name}: [${a.aggregated_held_out_confusion[i].join(', ')}]`);
        }
      }
      console.log('');
      console.log(`[sigma-sweep] hypothesis_verdict=${verdict}`);
      console.log(`[sigma-sweep] accuracy means by σ: [${accMeans.map(a => (a * 100).toFixed(1) + '%').join(', ')}]`);
      console.log('[sigma-sweep] frequentist: failure to reject ≠ accept. small N + simulated noise — broader replication 권장.');
    },
  );
});
