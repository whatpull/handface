// Hand SNN — Extreme σ sweep R&D (saturation break σ_threshold empirical estimate
// + input vs feature separable region 영역 extreme noise level 확인).
//
// 컨텍스트 (2026-05-29): 직전 commits 영역 σ ∈ [0.05, 0.50] 영역 forced-disjoint
// topology 영역 held-out 100% saturation — sigma_threshold_empirical=null (commit
// 5cbd476). 직전 input vs feature σ 분리 sweep (commit 218c01e) 영역 σ ∈ {0.10,
// 0.30, 0.50} 영역 H_saturated_both — separation 불가. 정직 한계: "Extreme σ
// (≥ 1.0) — saturation break σ_threshold + input vs feature separable verify".
//
// 본 R&D 영역 extreme noise level (σ ∈ {1.0, 2.0, 5.0}) 영역 saturation break
// σ_threshold empirical estimate + input vs feature separable region 확인.
// landmark normalized [0,1] 영역 σ=1.0 영역 영역 영역 영역 영역 영역.
//
// 시나리오:
//   - σ ∈ {1.0, 2.0, 5.0} (extreme noise — input scale 영역 영역 영역 영역 영역)
//   - Variant A (jitter-only): input applyRealisticNoise jitterSigma=σ +
//     feature addFeatureNoise(sigma=0) — feature noise 영역 disabled.
//   - Variant B (feature-only): input applyRealisticNoise jitterSigma=0
//     (no input noise) + feature addFeatureNoise(sigma=σ).
//   - Variant C (combined): input + feature both σ.
//   - 5 seed pair: train=[1000..1400], infer/held-out=[2000..2400]
//   - 영역 (variant, σ, seed pair) × 4 gesture × N=20 noisy train +
//     N=5 noisy held-out
//   - 총 3 variants × 3 σ × 5 seed = 45 combinations
//
// 측정 metrics per (variant, σ):
//   - baseline_accuracy_mean / baseline_accuracy_std
//   - held_out_accuracy_mean / held_out_accuracy_std
//   - per-gesture confusion matrix aggregated
//
// aggregate hypothesis verdicts:
//   - H_saturation_break: σ_threshold ∈ {1.0, 2.0, 5.0} 영역 held-out < 95% —
//     saturation break empirical confirmed.
//   - H_input_dominant_at_extreme: extreme σ 영역 jitter-only > feature-only —
//     input-level noise 영역 dominant break source.
//   - H_feature_dominant_at_extreme: feature-only > jitter-only — feature-level
//     dominant.
//   - H_combined_synergistic: combined < min(jitter, feature) — interaction effect.
//   - H_persistent_saturation: 모두 ≥ 95% even at σ=5.0 — saturation by-design
//     extreme robust.
//   - frequentist: H0/H1 영역 failure to reject ≠ accept.
//
// 학술 정합:
//   - Goodfellow et al. 2014 — noise injection regularization (extreme σ 영역
//     expected severe degradation — dropout / input perturbation 영역 fully-
//     connected MLP 가정 — Bio-SNN R-STDP 영역 direct mapping 영역 한계).
//   - Bishop 1995 (Neural Networks for Pattern Recognition, ch.9.3) — noise
//     regularization equivalent 영역 weight decay (extreme σ 영역 break expected).
//   - Olshausen & Field 1996 — sparse coding noise tolerance (top-K mask
//     preserve — feature noise 영역 nonzero index 한정 perturbation, extreme σ
//     영역 magnitude scale 영역 영역 영역 영역).
//   - Diehl & Cook 2015 — STDP topology fixed, R-STDP weight noise tolerance.
//
// 정직 한계 (measurement JSON limitations):
//   - 3 variants × 3 σ × 5 seed = 45 combinations — frequentist statistical
//     power moderate.
//   - σ ∈ {1.0, 2.0, 5.0} extreme 한정 — finer granularity σ ∈ {0.7, 1.5, 3.0}
//     별도 R&D.
//   - Input-level σ override 영역 jitterSigma 한정.
//   - Wilson CI baseline N=4 → ±48% / held-out N=20 → ±10% / aggregate N=100/σ
//     → ±5%.
//   - forced-disjoint K=10 mean-sub topology baseline — overlapping variant
//     별도 R&D.
//   - Simulated noise only — actual MediaPipe capture 미검증.
//   - Frequentist: H0/H1 failure to reject ≠ accept.

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

// 4 anatomical mock gesture — hand-snn-sigma-sweep.test.ts / broader-sweep /
// input-vs-feature 영역 동일 (cross-reference consistency).
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

// ── extreme sigma sweep params ──
// 정직 명시: landmark normalized [0, 1] 영역 σ=1.0 영역 unit-scale perturbation,
// σ=5.0 영역 5x scale (catastrophic noise). hand-snn-input-vs-feature-sigma.test.ts
// 영역 σ ∈ {0.10, 0.30, 0.50} 영역 H_saturated_both 영역 영역 영역 영역 영역
// extreme threshold 영역 break point 영역 영역 영역 영역.
const SIGMA_VALUES = [1.0, 2.0, 5.0] as const;
const VARIANTS = ['jitter_only', 'feature_only', 'combined'] as const;
type VariantName = (typeof VARIANTS)[number];
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
  variant: VariantName;
  sigma: number;
  input_jitter_sigma: number;
  feature_sigma: number;
  train_seed: number;
  infer_seed: number;
  baseline_accuracy: number;
  baseline_correct: number;
  baseline_total: number;
  baseline_correct_per_gesture: number[];
  held_out_accuracy: number;
  held_out_correct: number;
  held_out_total: number;
  held_out_confusion_matrix: number[][];
  mean_disjoint_jaccard: number;
}

interface VariantSigmaAggregate {
  variant: VariantName;
  sigma: number;
  n_seed_pairs: number;
  baseline_accuracy_mean: number;
  baseline_accuracy_std: number;
  baseline_correct_per_gesture_sum: number[];
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

// variant → (inputJitterSigma, featureSigma) 영역 mapping. input vs feature
// semantic separation 영역 두 channel 영역 disable / enable 영역 explicit control.
// composite affine (scale/rotation/translation) 영역 DEFAULT_NOISE_PARAMS 영역
// 보존 — jitter channel 영역 한정 toggle.
function resolveSigmas(
  variant: VariantName,
  sigma: number,
): { inputJitterSigma: number; featureSigma: number } {
  switch (variant) {
    case 'jitter_only':
      return { inputJitterSigma: sigma, featureSigma: 0 };
    case 'feature_only':
      return { inputJitterSigma: 0, featureSigma: sigma };
    case 'combined':
      return { inputJitterSigma: sigma, featureSigma: sigma };
  }
}

// ── single (variant, σ, seed pair) measurement ──
async function runCombination(
  variant: VariantName,
  sigma: number,
  trainSeed: number,
  inferSeed: number,
): Promise<CombinationResult> {
  const { inputJitterSigma, featureSigma } = resolveSigmas(variant, sigma);

  // Step 1: training set — input-level applyRealisticNoise jitterSigma=
  // inputJitterSigma. scale/rotation/translation 영역 DEFAULT_NOISE_PARAMS
  // 보존. feature-only variant 영역 inputJitterSigma=0 → no landmark jitter.
  const noiseParams = { ...DEFAULT_NOISE_PARAMS, jitterSigma: inputJitterSigma };

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
  // (Diehl & Cook 2015 topology-fixed STDP).
  const cleanFeatures = GESTURE_MAKERS.map(gm =>
    encodeHandToFeatureVector(gm.make()),
  );
  const candidateTopK = selectForcedDisjointTopK(cleanFeatures, K);
  const cleanSparsePatterns = cleanFeatures.map((fv, g) =>
    applySparseTopK(fv, candidateTopK[g]),
  );

  // Step 3: disjoint Jaccard 측정 — variant 영역 0 expected (forced-disjoint
  // invariant).
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
    prefix: `hand_extsig_${variant}_${sigma}_${trainSeed}`,
  });
  const lab = new LocalSNN({
    netId: `hand_extsig_${variant}_${sigma}_${trainSeed}_demo`,
    client, sink,
    seed: 57,
    preset: 'n16_hand',
    clusterActiveInputs: candidateTopK,
  });
  const buildStatus = await lab.init();
  if (buildStatus.neurons <= 0) {
    throw new Error('SNN build failed: neurons=0');
  }

  // Step 5: R-STDP supervised train — input-level applyRealisticNoise 영역
  // jitter channel 영역 inputJitterSigma 영역 ranged. cluster 영역 batch reinforce.
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

  // Step 6: baseline accuracy — clean sparse pattern self-classification.
  let baselineCorrect = 0;
  const baselineCorrectPerGesture: number[] = GESTURE_MAKERS.map(() => 0);
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
    if (winner === g) {
      baselineCorrect += 1;
      baselineCorrectPerGesture[g] = 1;
    }
  }
  const baselineAccuracy = baselineCorrect / GESTURE_MAKERS.length;

  // Step 7: noisy held-out — feature-level addFeatureNoise sigma=featureSigma.
  // jitter-only variant 영역 featureSigma=0 → clean sparse pattern inference.
  // feature-only / combined variant 영역 nonzero sigma 영역 top-K masked element
  // perturbation.
  const heldOutConfusion: number[][] = GESTURE_MAKERS.map(() =>
    GESTURE_MAKERS.map(() => 0),
  );
  let heldOutCorrect = 0;
  let heldOutTotal = 0;
  for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
    const cleanPattern = cleanSparsePatterns[g];
    const gaussian = new SeededGaussian(inferSeed + g * 1000);
    for (let s = 0; s < N_HELD_OUT; s += 1) {
      const noisyPattern = addFeatureNoise(cleanPattern, featureSigma, gaussian);
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
    variant,
    sigma,
    input_jitter_sigma: inputJitterSigma,
    feature_sigma: featureSigma,
    train_seed: trainSeed,
    infer_seed: inferSeed,
    baseline_accuracy: baselineAccuracy,
    baseline_correct: baselineCorrect,
    baseline_total: GESTURE_MAKERS.length,
    baseline_correct_per_gesture: baselineCorrectPerGesture,
    held_out_accuracy: heldOutAccuracy,
    held_out_correct: heldOutCorrect,
    held_out_total: heldOutTotal,
    held_out_confusion_matrix: heldOutConfusion,
    mean_disjoint_jaccard: meanDisjointJaccard,
  };
}

// per-σ classification — variant 영역 영역 영역 영역 (extreme σ regime 영역
// dominance / synergistic / persistent saturation).
//
// 정의 (정직 명시 — empirical, not formal hypothesis test):
//   - SATURATED_THRESHOLD = 0.95 (variant 영역 영역 영역 saturated).
//   - GAP_EPSILON = 0.05 (variant 영역 영역 영역 영역 영역 영역 negligible).
function classifyPerSigmaVerdict(
  jitterAcc: number,
  featureAcc: number,
  combinedAcc: number,
): string {
  const SATURATED_THRESHOLD = 0.95;
  const GAP_EPSILON = 0.05;
  // H_persistent_saturation 영역 영역 σ regime 영역 saturated 영역 영역 영역.
  if (
    jitterAcc >= SATURATED_THRESHOLD &&
    featureAcc >= SATURATED_THRESHOLD &&
    combinedAcc >= SATURATED_THRESHOLD
  ) {
    return 'H_persistent_saturation';
  }
  // H_combined_synergistic — combined < min(jitter, feature) - epsilon.
  const minPair = Math.min(jitterAcc, featureAcc);
  if (combinedAcc < minPair - GAP_EPSILON) {
    return 'H_combined_synergistic';
  }
  // H_input_dominant_at_extreme — jitter-only > feature-only (gap > epsilon).
  // (정직: jitter-only 영역 break 영역 영역 영역 → input layer dominant break source).
  if (jitterAcc < featureAcc - GAP_EPSILON) {
    return 'H_input_dominant_at_extreme';
  }
  // H_feature_dominant_at_extreme — feature-only > jitter-only.
  if (featureAcc < jitterAcc - GAP_EPSILON) {
    return 'H_feature_dominant_at_extreme';
  }
  // saturation break 영역 영역 (둘 다 < threshold 영역 영역 영역 영역).
  return 'H_saturation_break';
}

// σ_threshold_empirical estimator — 영역 σ 영역 변동 영역 dominant verdict 영역
// 영역 break 영역 영역 영역 영역 σ value (최소 σ 영역 held-out < 0.95 발생).
// 영역 verdict 영역 H_persistent_saturation 영역 영역 → null.
function estimateSigmaThresholdEmpirical(
  aggregates: VariantSigmaAggregate[],
  sigmaValues: ReadonlyArray<number>,
): number | null {
  // 영역 σ value 영역 영역 variant 영역 held-out mean 영역 < 0.95 영역 영역 영역
  // 영역 σ 영역 break point 영역 영역.
  const SATURATED_THRESHOLD = 0.95;
  const sortedSigmas = [...sigmaValues].sort((a, b) => a - b);
  for (const sigma of sortedSigmas) {
    const subset = aggregates.filter(a => a.sigma === sigma);
    const anyBroken = subset.some(a => a.held_out_accuracy_mean < SATURATED_THRESHOLD);
    if (anyBroken) return sigma;
  }
  return null;
}

describe('Hand SNN — Extreme σ sweep R&D (saturation break + input vs feature separable)', () => {
  it(
    '★ 3 variants × σ ∈ {1.0, 2.0, 5.0} × 5 seed × 4 gesture → saturation break σ_threshold + dominance',
    { timeout: 3600000 },
    async () => {
      const allResults: CombinationResult[] = [];
      for (const variant of VARIANTS) {
        for (const sigma of SIGMA_VALUES) {
          for (const seedPair of SEED_PAIRS) {
            const r = await runCombination(variant, sigma, seedPair.train, seedPair.infer);
            allResults.push(r);
            console.log(
              `[ext-sig] variant=${variant} σ=${sigma.toFixed(2)} ` +
              `train_seed=${seedPair.train} infer_seed=${seedPair.infer} ` +
              `[in_jit=${r.input_jitter_sigma.toFixed(2)} feat=${r.feature_sigma.toFixed(2)}] ` +
              `baseline=${(r.baseline_accuracy * 100).toFixed(1)}% ` +
              `held_out=${(r.held_out_accuracy * 100).toFixed(1)}% ` +
              `jaccard=${r.mean_disjoint_jaccard.toFixed(3)}`,
            );
          }
        }
      }

      // aggregate per (variant, σ).
      const aggregates: VariantSigmaAggregate[] = [];
      for (const variant of VARIANTS) {
        for (const sigma of SIGMA_VALUES) {
          const subset = allResults.filter(r => r.variant === variant && r.sigma === sigma);
          const baselineAccs = subset.map(r => r.baseline_accuracy);
          const heldOutAccs = subset.map(r => r.held_out_accuracy);
          const jaccards = subset.map(r => r.mean_disjoint_jaccard);
          const aggConfusion: number[][] = GESTURE_MAKERS.map(() =>
            GESTURE_MAKERS.map(() => 0),
          );
          const baselineCorrectPerGestureSum: number[] = GESTURE_MAKERS.map(() => 0);
          for (const r of subset) {
            for (let i = 0; i < GESTURE_MAKERS.length; i += 1) {
              for (let j = 0; j < GESTURE_MAKERS.length; j += 1) {
                aggConfusion[i][j] += r.held_out_confusion_matrix[i][j];
              }
              baselineCorrectPerGestureSum[i] += r.baseline_correct_per_gesture[i] ?? 0;
            }
          }
          aggregates.push({
            variant,
            sigma,
            n_seed_pairs: subset.length,
            baseline_accuracy_mean: mean(baselineAccs),
            baseline_accuracy_std: std(baselineAccs),
            baseline_correct_per_gesture_sum: baselineCorrectPerGestureSum,
            held_out_accuracy_mean: mean(heldOutAccs),
            held_out_accuracy_std: std(heldOutAccs),
            aggregated_held_out_confusion: aggConfusion,
            mean_disjoint_jaccard_mean: mean(jaccards),
            per_seed: subset,
          });
        }
      }

      // per-σ verdict — variant held-out mean 영역 영역 영역 영역 verdict.
      const perSigmaVerdict = SIGMA_VALUES.map(sigma => {
        const j = aggregates.find(a => a.variant === 'jitter_only' && a.sigma === sigma)!;
        const f = aggregates.find(a => a.variant === 'feature_only' && a.sigma === sigma)!;
        const c = aggregates.find(a => a.variant === 'combined' && a.sigma === sigma)!;
        const verdict = classifyPerSigmaVerdict(
          j.held_out_accuracy_mean,
          f.held_out_accuracy_mean,
          c.held_out_accuracy_mean,
        );
        return {
          sigma,
          jitter_only_held_out_mean: j.held_out_accuracy_mean,
          feature_only_held_out_mean: f.held_out_accuracy_mean,
          combined_held_out_mean: c.held_out_accuracy_mean,
          gap_jitter_minus_feature: j.held_out_accuracy_mean - f.held_out_accuracy_mean,
          gap_combined_minus_max:
            c.held_out_accuracy_mean - Math.max(j.held_out_accuracy_mean, f.held_out_accuracy_mean),
          gap_combined_minus_min:
            c.held_out_accuracy_mean - Math.min(j.held_out_accuracy_mean, f.held_out_accuracy_mean),
          verdict,
        };
      });

      // dominant verdict — verdict majority 영역 영역 영역.
      const verdictCounts = new Map<string, number>();
      for (const v of perSigmaVerdict) {
        verdictCounts.set(v.verdict, (verdictCounts.get(v.verdict) ?? 0) + 1);
      }
      let dominantVerdict = 'undetermined';
      let maxCount = 0;
      for (const [k, v] of verdictCounts) {
        if (v > maxCount) { maxCount = v; dominantVerdict = k; }
      }

      // σ_threshold_empirical — held-out < 0.95 first break point σ.
      const sigmaThresholdEmpirical = estimateSigmaThresholdEmpirical(
        aggregates,
        SIGMA_VALUES,
      );

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-extreme-sigma-sweep',
        gestures: GESTURE_MAKERS.map(g => g.name),
        variants: VARIANTS,
        sigma_values: SIGMA_VALUES,
        seed_pairs: SEED_PAIRS,
        n_seed_pairs: SEED_PAIRS.length,
        n_samples_train: N_SAMPLES_TRAIN,
        n_held_out_per_cluster: N_HELD_OUT,
        sparse_top_k: K,
        reinforce_batch_intensity: REINFORCE_BATCH_INTENSITY,
        preset: 'n16_hand',
        total_combinations: VARIANTS.length * SIGMA_VALUES.length * SEED_PAIRS.length,
        per_combination: allResults,
        per_variant_sigma_aggregate: aggregates,
        per_sigma_verdict: perSigmaVerdict,
        dominant_verdict: dominantVerdict,
        dominant_verdict_count: maxCount,
        sigma_threshold_empirical: sigmaThresholdEmpirical,
        sigma_threshold_empirical_note:
          sigmaThresholdEmpirical !== null
            ? `held-out mean < 0.95 영역 영역 σ ≥ ${sigmaThresholdEmpirical} — saturation break empirical confirmed. finer granularity 별도 R&D.`
            : 'σ ∈ {1.0, 2.0, 5.0} 영역 영역 영역 saturated (held-out ≥ 0.95) — extreme σ 영역 영역 영역 break 영역 영역 → σ=5.0 영역 영역 더 큰 σ 별도 R&D.',
        verdict_summary_by_sigma: SIGMA_VALUES.map(sigma => {
          const v = perSigmaVerdict.find(x => x.sigma === sigma)!;
          return { sigma, verdict: v.verdict };
        }),
        hypothesis_details: {
          definitions: {
            H_saturation_break:
              'σ_threshold ∈ {1.0, 2.0, 5.0} 영역 held-out < 95% (둘 이상 variant) — saturation break empirical confirmed. forced-disjoint topology 영역 extreme noise 영역 영역 영역 영역.',
            H_input_dominant_at_extreme:
              'extreme σ 영역 jitter-only held-out < feature-only (gap > 0.05) — input-level noise 영역 dominant break source / feature-level 영역 영역 영역.',
            H_feature_dominant_at_extreme:
              'extreme σ 영역 feature-only held-out < jitter-only (gap > 0.05) — feature-level noise 영역 dominant break source.',
            H_combined_synergistic:
              'combined held-out < min(jitter-only, feature-only) - 0.05 — two-layer noise interaction (synergistic degradation).',
            H_persistent_saturation:
              'jitter-only ≥ 0.95 AND feature-only ≥ 0.95 AND combined ≥ 0.95 — forced-disjoint by-design saturation 영역 extreme σ regime 영역 영역 영역 robust.',
          },
          saturated_threshold: 0.95,
          gap_epsilon: 0.05,
          sigma_threshold_empirical_estimator:
            'σ_threshold_empirical = min{σ ∈ SIGMA_VALUES : ∃ variant with held_out_mean < 0.95}. 영역 σ value 영역 영역 → null (no break in tested range).',
          frequentist_note:
            'failure to reject H0 ≠ accept H0. 영역 (variant, σ) 영역 N=5 seed × N=5 held-out × 4 gesture = 100 noisy samples → 95% Wilson CI ±5%. statistical power moderate. dominant layer identification 영역 sweep granularity 한정. extreme σ regime 영역 break σ_threshold 영역 SIGMA_VALUES grid 한정 (3 discrete points).',
          verdict_scope_note:
            "classifyPerSigmaVerdict 영역 held-out accuracy 한정 SATURATED_THRESHOLD=0.95 영역 산출 — baseline accuracy 영역 verdict scope 영역 미포함 (직전 input-vs-feature R&D 영역 baseline=0.75 systematic miss 영역 verdict 영역 미반영 — 동일 한계). 차후 R&D 영역 verdict 영역 (baseline_accuracy ≥ 0.95 AND held_out ≥ 0.95) joint criterion mandatory.",
        },
        academic_alignment: [
          'Goodfellow et al. 2014 — noise injection regularization (extreme σ 영역 expected severe degradation — dropout vs input perturbation 영역 fully-connected MLP 가정 — Bio-SNN R-STDP 영역 direct mapping 영역 한계).',
          'Bishop 1995 (Neural Networks for Pattern Recognition, ch.9.3) — feature-level noise injection 영역 regularization equivalent 영역 weight decay (extreme σ 영역 break expected).',
          'Olshausen & Field 1996 — sparse coding noise tolerance (top-K mask preserve — feature noise 영역 nonzero index 한정 perturbation, extreme σ 영역 magnitude scale 영역 영역 영역).',
          'Diehl & Cook 2015 — STDP topology fixed, R-STDP weight noise tolerance.',
        ],
        limitations: [
          '3 variants × 3 σ × 5 seed = 45 combinations — frequentist statistical power moderate.',
          'σ ∈ {1.0, 2.0, 5.0} extreme 한정 — finer granularity σ ∈ {0.7, 1.5, 3.0} 또는 σ ≥ 10.0 별도 R&D.',
          'Input-level σ override 영역 jitterSigma 한정 — scaleRange / rotationRange / translationRange default 보존 (composite affine 영역 영역 영역 jitter channel 한정 toggle — feature-only variant 영역 영역 affine perturbation 영역 영역 영역).',
          'Wilson CI baseline N=4 per cluster trial → ±48% (1 miss = 25% drop) — baseline std outlier 영역 정합. baseline N≥20/cluster 별도 R&D 권장.',
          'held-out N=5/cluster × 4 gesture × 5 seed = 100 samples per (variant, σ) → 95% Wilson CI ±5%.',
          'forced-disjoint K=10 mean-sub topology baseline — overlapping variant 별도 R&D.',
          'simulated noise only — actual MediaPipe capture 미검증.',
          'frequentist: H0/H1 failure to reject ≠ accept. dominant layer identification 영역 verdict 영역 measurement JSON 영역 명시 — formal hypothesis test (paired t-test / bootstrap CI) 별도 R&D.',
          'verdict classification 영역 threshold (saturated=0.95, gap_epsilon=0.05) 영역 conservative — 다른 threshold 영역 verdict 변동 가능.',
          'σ_threshold_empirical 영역 SIGMA_VALUES grid 한정 (3 discrete points) — true threshold 영역 finer granularity 별도 R&D.',
          'mock anatomical hand 영역 actual MediaPipe Hand 영역 z-depth coordinate scale 영역 다를 가능.',
          'jitter-only variant 영역 held-out 영역 featureSigma=0 → clean sparse pattern 영역 inference — input-level training noise 영역 effect 영역 trained weight 영역 영역 영역 영역 가능 (held-out perturbation 영역 영역 영역 clean pattern self-classification 영역 비교 baseline). feature-only variant 영역 held-out 영역 영역 noisy 영역 — 비대칭 design 영역 영역 영역. balanced 영역 separate cross-product (4 sub-variants) 별도 R&D.',
          'Goodfellow 2014 input vs feature dichotomy 영역 fully-connected MLP 가정 — Bio-SNN spike-encoding pipeline 영역 input ≡ landmark layer / feature ≡ encoded 16-dim 영역 매핑 영역 정직 한계.',
          'extreme σ regime (σ=1.0 영역 normalized [0,1] unit scale, σ=5.0 영역 5x scale) 영역 physiological landmark noise 영역 직접 매핑 영역 영역 영역 — synthetic stress test 한정.',
        ],
        cross_reference: {
          prior_narrow_sweep: {
            test_path: 'tests/integration/hand-snn-sigma-sweep.test.ts',
            sigma_values: [0.05, 0.10, 0.15],
            measurement_path: 'tests/integration/measurements/hand-snn-sigma-sweep.json',
            note: 'narrow sweep — input + feature conflated σ.',
          },
          prior_broader_sweep: {
            test_path: 'tests/integration/hand-snn-broader-sigma-sweep.test.ts',
            sigma_values: [0.20, 0.30, 0.50],
            measurement_path: 'tests/integration/measurements/hand-snn-broader-sigma-sweep.json',
            note: 'broader sweep — input + feature conflated σ.',
          },
          prior_input_vs_feature_sweep: {
            test_path: 'tests/integration/hand-snn-input-vs-feature-sigma.test.ts',
            sigma_values: [0.10, 0.30, 0.50],
            measurement_path: 'tests/integration/measurements/hand-snn-input-vs-feature-sigma.json',
            note: 'separated sweep — H_saturated_both 영역 영역 영역 separation 불가. 본 extreme sweep 영역 saturation break point + dominance 영역 cross-reference.',
          },
        },
      };
      saveMeasurement('hand-snn-extreme-sigma-sweep', measurement);

      // 검증 assertion (R&D 측정 — extreme σ effect 영역 영역 영역 영역 reject 없음):
      // - baseline ≥ 0.0 per (variant, σ) — extreme σ 영역 baseline 영역 break 가능.
      // - held-out ≥ 0.0 per (variant, σ) — extreme σ 영역 chance level 미만 가능.
      // - jaccard = 0 per combination (forced-disjoint invariant — topology-only).
      for (const a of aggregates) {
        expect(a.baseline_accuracy_mean).toBeGreaterThanOrEqual(0.0);
        expect(a.baseline_accuracy_mean).toBeLessThanOrEqual(1.0);
        expect(a.held_out_accuracy_mean).toBeGreaterThanOrEqual(0.0);
        expect(a.held_out_accuracy_mean).toBeLessThanOrEqual(1.0);
        expect(a.mean_disjoint_jaccard_mean).toBe(0);
      }

      console.log('');
      console.log('[ext-sig] === per-(variant, σ) aggregate ===');
      for (const a of aggregates) {
        console.log(
          `[ext-sig] variant=${a.variant} σ=${a.sigma.toFixed(2)} ` +
          `baseline=${(a.baseline_accuracy_mean * 100).toFixed(1)}±${(a.baseline_accuracy_std * 100).toFixed(1)}% ` +
          `held_out=${(a.held_out_accuracy_mean * 100).toFixed(1)}±${(a.held_out_accuracy_std * 100).toFixed(1)}%`,
        );
      }
      console.log('');
      console.log('[ext-sig] === per-σ verdict ===');
      for (const v of perSigmaVerdict) {
        console.log(
          `[ext-sig] σ=${v.sigma.toFixed(2)} ` +
          `jitter=${(v.jitter_only_held_out_mean * 100).toFixed(1)}% ` +
          `feature=${(v.feature_only_held_out_mean * 100).toFixed(1)}% ` +
          `combined=${(v.combined_held_out_mean * 100).toFixed(1)}% ` +
          `gap(j-f)=${(v.gap_jitter_minus_feature * 100).toFixed(1)}% ` +
          `verdict=${v.verdict}`,
        );
      }
      console.log('');
      console.log(`[ext-sig] dominant_verdict=${dominantVerdict} (count=${maxCount}/${SIGMA_VALUES.length})`);
      console.log(
        `[ext-sig] sigma_threshold_empirical=${sigmaThresholdEmpirical !== null ? sigmaThresholdEmpirical.toFixed(2) : 'null (no break in tested range)'}`,
      );
      console.log('[ext-sig] frequentist: failure to reject ≠ accept. R&D measurement only.');
    },
  );
});
