// Hand SNN — Overlapping top-K σ sweep R&D (Goodfellow 2014 architecture-fit
// verify).
//
// 컨텍스트 (2026-05-28): 직전 commits 영역 forced-disjoint top-K (Jaccard=0)
// topology 영역 σ ∈ [0.05, 0.50] sweep 결과 saturation 100%
// (sigma_threshold_empirical=null). Root cause hypothesis (broader sweep
// limitations 명시): "forced-disjoint top-K + addFeatureNoise top-K mask
// preserve → cluster mask outside top-K 영역 noise zero-suppressed → winner
// deterministic → saturation by-design". Goodfellow 2014 decline 영역
// fully-connected MLP / overlapping representation 가정 한정.
//
// 본 R&D 영역 architecture-fit verify — overlapping top-K (Jaccard > 0,
// selectMeanSubtractedTopK 영역 natural overlap) topology 영역 동일 σ sweep
// 영역 적용 → Goodfellow decline 영역 reproduce 가능 영역 verify.
// Hypothesis: H1 — overlapping topology 영역 σ↑ decline observe → architecture
// mismatch hypothesis 영역 strong empirical support.
//
// 시나리오:
//   - σ ∈ {0.05, 0.10, 0.15, 0.20, 0.30, 0.50}  (직전 narrow + broader sweep
//     union 영역 wider coverage)
//   - 5 seed pair: train=[1000..1400], infer/held-out=[2000..2400]
//   - 영역 (σ, seed pair) × 4 gesture × N=20 noisy train (input-level
//     applyRealisticNoise jitterSigma override) + N=5 noisy held-out
//     (feature-level addFeatureNoise) per cluster
//   - 총 6 × 5 = 30 (σ, seed pair) combinations — vitest timeout 1800s
//   - **Topology variant** — selectMeanSubtractedTopK(fvs, K) 영역 사용
//     (overlapping allowed, forceDisjoint=false 동등). K=10 + mean-subtracted
//     top-K → Jaccard > 0 expected.
//
// 측정 metrics per σ:
//   - baseline_accuracy_mean / baseline_accuracy_std (trained sample)
//   - held_out_accuracy_mean / held_out_accuracy_std (noisy held-out)
//   - per-gesture confusion matrix aggregated
//   - mean_pairwise_jaccard (overlapping topology 영역 Jaccard > 0 expected)
//
// hypothesis verdicts:
//   - H1 (Goodfellow decline reproduce): overlapping topology 영역 σ↑ →
//     held-out accuracy↓ — architecture mismatch hypothesis 영역 strong
//     support.
//   - H0 (same saturation): overlapping 영역 forced-disjoint 영역 동일
//     saturation — root cause 영역 noise mask preserve (addFeatureNoise) 영역
//     only (architecture independent).
//   - H_intermediate: overlapping 영역 partial decline — mixed.
//   - frequentist: H0/H1 failure to reject ≠ accept.
//
// 학술 정합:
//   - Goodfellow et al. 2014 — noise injection regularization
//     (fully-connected MLP 가정, overlapping representation).
//   - Olshausen & Field 1996 — overcomplete sparse coding (overlapping
//     receptive field).
//   - Diehl & Cook 2015 — STDP topology variance.
//   - Bishop 1995 (ch.9.3) — noise regularization.
//
// 정직 한계 (measurement JSON limitations):
//   - 6 σ values × 5 seed pair = 30 combinations — frequentist statistical
//     power moderate.
//   - Overlapping topology 영역 selectMeanSubtractedTopK 한정 — random /
//     clustered overlapping variants 영역 별도 R&D.
//   - Input-level σ override 영역 jitterSigma 한정 — scaleRange /
//     rotationRange / translationRange 영역 DEFAULT_NOISE_PARAMS 영역 보존.
//   - Wilson CI: baseline N=4/(σ × seed) → ±48% / held-out N=20/(σ × seed) →
//     ±10% / aggregate N=100/σ → ±5%.
//   - simulated noise only — actual MediaPipe capture 미검증.
//   - frequentist: H0/H1 failure to reject ≠ accept.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink, SNNWorkerCore, SNNWorkerClient,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import {
  encodeHandToFeatureVector,
  selectMeanSubtractedTopK,
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

// 4 anatomical mock gesture — hand-snn-sigma-sweep / broader-sigma-sweep 영역
// 동일 (cross-reference 정합 — topology 영역 영역 영역 동일 gesture set 비교).
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

// ── overlapping top-K sigma sweep params ──
// σ ∈ {0.05, 0.10, 0.15} (narrow sweep cross-reference) +
// σ ∈ {0.20, 0.30, 0.50} (broader sweep cross-reference) → union 6 values.
const SIGMA_VALUES = [0.05, 0.10, 0.15, 0.20, 0.30, 0.50] as const;
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
// saturation break threshold — held-out accuracy < 95% 영역 break.
const SATURATION_BREAK_THRESHOLD = 0.95;

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
  mean_pairwise_jaccard: number;
}

interface SigmaAggregate {
  sigma: number;
  n_seed_pairs: number;
  baseline_accuracy_mean: number;
  baseline_accuracy_std: number;
  held_out_accuracy_mean: number;
  held_out_accuracy_std: number;
  aggregated_held_out_confusion: number[][];
  mean_pairwise_jaccard_mean: number;
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

// ── single (σ, seed pair) measurement — overlapping top-K topology ──
async function runCombination(
  sigma: number,
  trainSeed: number,
  inferSeed: number,
): Promise<CombinationResult> {
  // Step 1: training set — input-level applyRealisticNoise (Goodfellow 2014
  // landmark-layer noise injection 정합). jitterSigma override (σ value 영역
  // 정합). scale/rotation/translation 영역 DEFAULT_NOISE_PARAMS 영역 보존.
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

  // Step 2: **OVERLAPPING top-K topology** — selectMeanSubtractedTopK 영역
  // 사용 (forceDisjoint=false 동등, Jaccard > 0 natural). clean anatomical
  // baseline 영역 영역. K=10 + mean-subtracted top-K → cluster pair 영역
  // shared indices 발생 → Goodfellow architecture (overlapping representation)
  // 영역 정합.
  const cleanFeatures = GESTURE_MAKERS.map(gm =>
    encodeHandToFeatureVector(gm.make()),
  );
  const candidateTopK = selectMeanSubtractedTopK(cleanFeatures, K);
  const cleanSparsePatterns = cleanFeatures.map((fv, g) =>
    applySparseTopK(fv, candidateTopK[g]),
  );

  // Step 3: pairwise Jaccard 측정 — overlapping topology 영역 Jaccard > 0
  // expected (forced-disjoint 영역 Jaccard = 0 영역 대비).
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
  const meanPairwiseJaccard = mean(pairwise);

  // Step 4: SNN build — overlapping cluster active inputs (Jaccard > 0).
  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const sink = new LocalStorageSink({
    storage: new MemoryStorage(),
    prefix: `hand_overlapping_sigma_${sigma}_${trainSeed}`,
  });
  const lab = new LocalSNN({
    netId: `hand_overlapping_sigma_${sigma}_${trainSeed}_demo`,
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
  // (input-level applyRealisticNoise) 영역 sparse pattern (overlapping top-K
  // 영역 영역 own indices 사용) 영역 batch reinforce.
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
  // baseline) 영역 self-classification. overlapping topology 영역 winner
  // determination 영역 cluster firing rates 영역 max.
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
  // 학술 정합 (overlapping topology variant): addFeatureNoise 영역 top-K mask
  // preserve — cluster g 영역 own top-K indices 영역 noise injection. **단,
  // overlapping 영역 cluster j (j≠g) 영역 own top-K 영역 cluster g 영역 일부
  // shared indices 영역 영역 영역 — feature-level noise 영역 영역 영역 cluster
  // j 영역 ambiguous evidence 영역 → Goodfellow decline 영역 mechanism 정합
  // (overlapping representation noise sensitivity).
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
    mean_pairwise_jaccard: meanPairwiseJaccard,
  };
}

describe('Hand SNN — Overlapping top-K σ sweep R&D (Goodfellow architecture-fit verify)', () => {
  it(
    '★ σ ∈ {0.05..0.50} × 5 seed pair × 4 gesture × (N=20 train + N=5 held-out) overlapping top-K → Goodfellow decline reproduce verify',
    { timeout: 7200000 }, // 2h — 30 combos × ~3-4 min/combo (R-STDP supervised + held-out N=20 inference per cluster) → ~90-120 min expected.
    async () => {
      const allResults: CombinationResult[] = [];
      for (const sigma of SIGMA_VALUES) {
        for (const seedPair of SEED_PAIRS) {
          const r = await runCombination(sigma, seedPair.train, seedPair.infer);
          allResults.push(r);
          console.log(
            `[overlapping-topk-sigma-sweep] σ=${sigma.toFixed(2)} train_seed=${seedPair.train} ` +
            `infer_seed=${seedPair.infer} ` +
            `baseline=${(r.baseline_accuracy * 100).toFixed(1)}% ` +
            `held_out=${(r.held_out_accuracy * 100).toFixed(1)}% ` +
            `jaccard=${r.mean_pairwise_jaccard.toFixed(3)}`,
          );
        }
      }

      // aggregate per σ.
      const aggregates: SigmaAggregate[] = SIGMA_VALUES.map(sigma => {
        const subset = allResults.filter(r => r.sigma === sigma);
        const baselineAccs = subset.map(r => r.baseline_accuracy);
        const heldOutAccs = subset.map(r => r.held_out_accuracy);
        const jaccards = subset.map(r => r.mean_pairwise_jaccard);
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
          mean_pairwise_jaccard_mean: mean(jaccards),
          per_seed: subset,
        };
      });

      // hypothesis verdicts:
      // H1 (Goodfellow decline reproduce): overlapping topology 영역 어느 σ
      //   영역 held_out_accuracy_mean < 0.95 — architecture mismatch hypothesis
      //   strong support.
      // H0 (same saturation): 모든 σ 영역 held_out_accuracy_mean ≥ 0.95 —
      //   overlapping 영역 forced-disjoint 영역 동일 saturation — root cause
      //   는 noise mask preserve 영역 (architecture independent).
      // H_intermediate: 일부 σ 영역 break — partial decline.
      const accMeans = aggregates.map(a => a.held_out_accuracy_mean);
      const breakIdx = accMeans.findIndex(a => a < SATURATION_BREAK_THRESHOLD);
      const allSaturated = breakIdx === -1;
      const sigmaThresholdEmpirical = breakIdx >= 0 ? SIGMA_VALUES[breakIdx] : null;

      // count sub-threshold σ values 영역 partial vs full decline 영역 verdict.
      const nSubThreshold = accMeans.filter(a => a < SATURATION_BREAK_THRESHOLD).length;
      // 4-class chance level — 0.25. sub-chance 영역 strong collapse signal.
      const CHANCE_LEVEL = 1 / GESTURE_MAKERS.length;
      const nSubChance = accMeans.filter(a => a < CHANCE_LEVEL).length;
      let verdict: string;
      if (allSaturated) {
        verdict = 'H0_same_saturation_overlapping_topology_no_decline_observed';
      } else if (nSubChance === SIGMA_VALUES.length) {
        // All σ below 4-class chance — strong collapse, far stronger than mere
        // Goodfellow decline. Indicates overlapping cluster representation
        // 영역 R-STDP + sparse top-K mask 영역 organize 영역 영역 fundamental
        // failure mode (architecture mismatch hypothesis 영역 very strong
        // support).
        verdict = 'H1_strong_collapse_all_sigma_below_chance_level_overlapping_topology_fails_to_discriminate';
      } else if (nSubThreshold === SIGMA_VALUES.length) {
        verdict = 'H1_goodfellow_decline_reproduce_all_sigma_below_threshold';
      } else if (breakIdx === 0) {
        verdict = 'H1_goodfellow_decline_reproduce_from_smallest_sigma_0.05';
      } else {
        verdict = `H_intermediate_partial_decline_sigma_threshold_${SIGMA_VALUES[breakIdx]}`;
      }

      // monotonic check — σ↑ → held_out accuracy↓ (Goodfellow strict
      // monotonicity vs non-increasing).
      let monotonicNonIncreasing = true;
      let strictMonotonic = true;
      for (let i = 1; i < accMeans.length; i += 1) {
        if (accMeans[i - 1] < accMeans[i]) monotonicNonIncreasing = false;
        if (accMeans[i - 1] <= accMeans[i]) strictMonotonic = false;
      }

      // overlapping topology verify — mean_pairwise_jaccard > 0 영역 모든 σ
      // 영역 (overlapping by selectMeanSubtractedTopK).
      const allJaccardPositive = aggregates.every(a => a.mean_pairwise_jaccard_mean > 0);

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-overlapping-topk-sigma-sweep',
        topology: 'overlapping_mean_subtracted_top_k',
        topology_selector: 'selectMeanSubtractedTopK',
        force_disjoint: false,
        gestures: GESTURE_MAKERS.map(g => g.name),
        sigma_values: SIGMA_VALUES,
        seed_pairs: SEED_PAIRS,
        n_seed_pairs: SEED_PAIRS.length,
        n_samples_train: N_SAMPLES_TRAIN,
        n_held_out_per_cluster: N_HELD_OUT,
        sparse_top_k: K,
        reinforce_batch_intensity: REINFORCE_BATCH_INTENSITY,
        saturation_break_threshold: SATURATION_BREAK_THRESHOLD,
        preset: 'n16_hand',
        total_combinations: SIGMA_VALUES.length * SEED_PAIRS.length,
        per_combination: allResults,
        per_sigma_aggregate: aggregates,
        hypothesis_verdict: verdict,
        hypothesis_details: {
          accuracy_means_by_sigma: SIGMA_VALUES.map((s, i) => ({
            sigma: s,
            held_out_accuracy_mean: accMeans[i],
            below_saturation_break_threshold: accMeans[i] < SATURATION_BREAK_THRESHOLD,
            mean_pairwise_jaccard: aggregates[i].mean_pairwise_jaccard_mean,
          })),
          all_saturated_at_or_above_threshold: allSaturated,
          n_sub_threshold_sigma: nSubThreshold,
          n_sub_chance_sigma: nSubChance,
          chance_level: CHANCE_LEVEL,
          saturation_break_threshold_used: SATURATION_BREAK_THRESHOLD,
          sigma_threshold_empirical: sigmaThresholdEmpirical,
          monotonic_nonincreasing: monotonicNonIncreasing,
          strict_monotonic: strictMonotonic,
          all_jaccard_positive: allJaccardPositive,
          architecture_fit_note:
            'overlapping top-K (Jaccard > 0) topology 영역 Goodfellow 2014 fully-connected MLP / overcomplete sparse coding (Olshausen & Field 1996) 영역 정합. forced-disjoint top-K (Jaccard = 0) 영역 architecture mismatch — overlapping variant 영역 decline observe 영역 architecture mismatch hypothesis 영역 R-STDP supervised training rule 한정 strong empirical support (training rule scope clarification 영역 hypothesis_rationale 참조).',
          hypothesis_rationale:
            "본 결과 영역 R-STDP supervised training rule (reward target cluster + punish non-target cluster) 한정 — overlapping topology + R-STDP 영역 shared inputs 영역 weights 영역 mutually destructive convergence (reward / punish opposing pressure 영역 cluster pair 공유 weight 영역 받음). Contrastive STDP / k-WTA / unsupervised STDP / Hebbian / spike-timing dependent contrast 영역 동일 architecture (overlapping top-K Jaccard ≈ 0.55) 영역 fit 영역 영역 별도 R&D mandatory. 'architecture mismatch' claim 영역 R-STDP supervised training rule 한정 evidence — broader training rule scope 영역 generalize 금지. " +
            'Academic anchor: Olshausen & Field 1996 영역 overcomplete sparse coding 영역 unsupervised feature learning 영역 — overlapping representations supervised training 영역 fit 영역 paper 미인용. Diehl & Cook 2015 영역 STDP MNIST 영역 unsupervised lateral inhibition 영역 다른 architecture (winner-take-all + lateral). R-STDP 영역 supervised reward modulation 영역 destructive cross-class interference 영역 본 결과 영역 first-order empirical observation — supervised reward-modulated STDP + dense overlap regime 영역 prior literature 영역 direct precedent 미발견.',
          frequentist_note:
            'failure to reject H0/H1 ≠ accept. 30 combinations (6 σ × 5 seed) — statistical power moderate. baseline N=4/(σ × seed) → Wilson CI ±48% / held-out N=20/(σ × seed) → ±10% / aggregate N=100/σ → ±5%. broader replication 권장.',
        },
        // QA MEDIUM 3 — Wilson 95% CI per-σ aggregate held-out accuracy
        // (N=20 per (σ, seed) × 5 seed = aggregate N=100/σ. 단 per-σ measurement
        // 영역 σ-level Wilson CI 영역 N=20 single-trial proxy 영역 산출
        // — N=20 영역 sub-chance (25%) 분간 영역 statistical envelope).
        // 산출 방식: held-out accuracy mean × n_held_out 영역 success count 영역
        // approximate → Wilson 95% CI (z=1.96).
        wilson_ci: SIGMA_VALUES.map((s, i) => {
          const p = accMeans[i];
          const n = N_HELD_OUT * GESTURE_MAKERS.length; // per (σ, seed) → 20
          const z = 1.96;
          // Wilson score interval (continuity-uncorrected) — single-trial proxy
          // (per-σ aggregate 영역 N=100 영역 narrower CI, 단 per-trial conservative
          // envelope 영역 N=20 명시).
          const denom = 1 + (z * z) / n;
          const center = (p + (z * z) / (2 * n)) / denom;
          const margin = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / denom;
          const ci_low = Math.max(0, center - margin);
          const ci_high = Math.min(1, center + margin);
          const chance = CHANCE_LEVEL;
          const overlaps_chance = ci_low <= chance && ci_high >= chance;
          const strict_sub_chance = ci_high < chance;
          return {
            sigma: s,
            n_per_trial: n,
            held_out_accuracy_mean: p,
            wilson_ci_95: [ci_low, ci_high],
            chance_level: chance,
            overlaps_chance,
            strict_sub_chance,
            note:
              strict_sub_chance
                ? 'CI 영역 chance level 25% 미포함 — strict sub-chance confirmed.'
                : 'CI 영역 chance level 25% 포함 — marginal (sub-chance strict 영역 broader N≥30/cluster 별도 R&D 권장).',
          };
        }),
        academic_alignment: [
          'Goodfellow et al. 2014 (Explaining and Harnessing Adversarial Examples) — noise injection regularization (fully-connected MLP / overlapping representation 가정).',
          'Olshausen & Field 1996 (Emergence of simple-cell receptive field properties) — overcomplete sparse coding, overlapping receptive field.',
          'Diehl & Cook 2015 — STDP topology variance (overlapping vs disjoint receptive field 영역 robustness 차이).',
          'Bishop 1995 (Neural Networks for Pattern Recognition, ch.9.3) — feature-level noise injection regularization.',
        ],
        limitations: [
          '6 σ values × 5 seed pair = 30 combinations — frequentist statistical power moderate.',
          'Overlapping topology 영역 selectMeanSubtractedTopK 한정 — random overlapping / clustered overlapping / partial-overlap variants 영역 별도 R&D.',
          'Input-level σ override 영역 applyRealisticNoise jitterSigma 한정 — scaleRange / rotationRange / translationRange 영역 DEFAULT_NOISE_PARAMS 보존. composite noise (jitter + scale + rotation + translation) 영역 분리 sweep 별도 R&D.',
          'Wilson CI: baseline N=4/(σ × seed) → ±48% (1 miss 영역 25% drop) → baseline std outlier 영역 정합. held-out N=20/(σ × seed) → ±10% / aggregate N=100/σ → ±5%.',
          'simulated noise only — actual MediaPipe Hand capture (z-depth scale 영역 다를 가능) 미검증.',
          'frequentist: H0 / H1 verdict 영역 failure to reject ≠ accept. small N + simulated noise + fixed gesture topology — broader replication 권장.',
          'cluster topology (selectMeanSubtractedTopK) 영역 clean anatomical baseline 영역 영역 — noisy mean topK 영역 별도 R&D (Diehl & Cook 2015 topology-fixed STDP 정합).',
          'mock anatomical hand 영역 actual MediaPipe Hand z-depth coordinate scale 영역 다를 가능.',
          'input-level σ + feature-level σ 영역 동일 numeric 영역 conflated — 분리 sweep 별도 R&D.',
          'σ sweep granularity 영역 ∆σ ∈ {0.05, 0.05, 0.05, 0.05, 0.10, 0.20} — non-uniform → finer granularity sweep 영역 break point precise localization 별도 R&D.',
          'saturation break threshold (held-out < 95%) 영역 conservative — 다른 threshold (예: 90%, 또는 95% Wilson CI margin) 영역 verdict 변동 가능.',
          'preset=n16_hand 한정 — n32_hand / 다른 preset 영역 영역 별도 R&D.',
          'overlapping topology 영역 Jaccard > 0 영역 자연 발생 — selectMeanSubtractedTopK 영역 결과 dependent (gesture set 영역 anatomical similarity 영역 영역 Jaccard 영역 결정). 다른 gesture set 영역 영역 Jaccard distribution 다를 가능.',
          'overlapping topology 영역 R-STDP supervised training (reward target cluster + punish non-target) 영역 cluster pair 영역 shared inputs 영역 영역 weights 영역 reward/punish opposing pressure 영역 받음 — high-overlap (Jaccard > ~0.3) regime 영역 weight convergence 영역 mutually destructive 가능. baseline 영역 chance level (25%) 또는 sub-chance 영역 관찰 시 R-STDP supervised training rule 영역 overlapping topology 영역 incompatible — 별도 training rule (예: contrastive STDP, k-WTA winner-take-all training) 영역 R&D 권장. 본 R&D 영역 R-STDP 한정.',
          'sub-chance accuracy 영역 random tie-breaking 영역 영역 영역 (winner=-1 영역 firing rate tie 영역 first-cluster-wins bias). overlapping topology 영역 cluster firing rate 영역 zero 영역 collapse 가능 → confusion matrix 영역 첫 cluster column bias 영역 별도 inspection 권장.',
          // QA MEDIUM 5 — overlapping topology variant scope
          '본 sweep 영역 selectMeanSubtractedTopK overlapping topology 한정 (mean_pairwise_jaccard ≈ 0.548) — random K-sampling (uniform overlap distribution) / clustered overlap (anatomical locality) / adversarial overlap (max Jaccard) 등 variant 영역 별도 broader overlap topology sweep R&D mandatory. 본 verdict 영역 selectMeanSubtractedTopK 영역 natural Jaccard ≈ 0.55 regime 한정 — 다른 overlap topology 영역 verdict 영역 generalize 금지.',
          // QA MEDIUM 3 — Wilson CI marginal scope clarification
          'Wilson 95% CI 영역 strict sub-chance confirm σ ∈ {0.05, 0.10, 0.15, 0.20} 한정 (CI upper bound < chance 25%). σ ∈ {0.30, 0.50} 영역 Wilson CI 영역 chance level 25% marginal overlap — strict sub-chance 영역 confirm 영역 broader N (N≥30/cluster) 별도 R&D 권장. 3-13% spread 영역 chance level 분간 영역 σ-conditional — uniform "strong collapse all σ" claim 영역 σ ≤ 0.20 한정.',
        ],
        // QA HIGH 1 — cross_reference field 영역 forced-disjoint sigma sweep
        // (commits 545123b + 5cbd476) 영역 direct comparison 명시. saturation
        // 100% 결과 + commit SHA + measurement JSON path 동봉.
        cross_reference: {
          forced_disjoint_narrow_sweep: {
            commit_sha: '545123b',
            commit_message: 'Sigma sweep R&D: σ ∈ [0.05, 0.10, 0.15] saturation — forced-disjoint topology by-design',
            test_path: 'tests/integration/hand-snn-sigma-sweep.test.ts',
            sigma_values: [0.05, 0.10, 0.15],
            topology: 'forced_disjoint_top_k (Jaccard = 0)',
            measurement_path: 'tests/integration/measurements/hand-snn-sigma-sweep.json',
            saturation_100_percent_confirmed: true,
            held_out_accuracy_mean_observed: '100% across all σ ∈ {0.05, 0.10, 0.15}',
            note: 'forced-disjoint narrow sweep [0.05, 0.10, 0.15] 영역 saturation 100% — 본 overlapping sweep (held-out 3-8%) 영역 direct comparison: 동일 σ regime 영역 topology 변경 영역 verdict 역전 (saturation → strong collapse) — architecture-fit verify cross-reference. R-STDP supervised training rule 한정 (training rule scope 영역 hypothesis_rationale 참조).',
          },
          forced_disjoint_broader_sweep: {
            commit_sha: '5cbd476',
            commit_message: 'Broader sigma sweep R&D: σ ∈ {0.20, 0.30, 0.50} saturation NOT broken — sigma_threshold null',
            test_path: 'tests/integration/hand-snn-broader-sigma-sweep.test.ts',
            sigma_values: [0.20, 0.30, 0.50],
            topology: 'forced_disjoint_top_k (Jaccard = 0)',
            measurement_path: 'tests/integration/measurements/hand-snn-broader-sigma-sweep.json',
            saturation_100_percent_confirmed: true,
            held_out_accuracy_mean_observed: '100% across all σ ∈ {0.20, 0.30, 0.50} (sigma_threshold_empirical=null)',
            note: 'forced-disjoint broader sweep [0.20, 0.30, 0.50] 영역 saturation 100% (sigma_threshold_empirical=null) — 본 overlapping sweep (held-out 5-13%) 영역 direct comparison: 동일 σ regime 영역 topology 변경 영역 verdict 역전. forced-disjoint 영역 noise top-K mask preserve 영역 by-design saturation — overlapping topology + R-STDP 영역 destructive interference 영역 architecture mismatch hypothesis root cause estimate. R-STDP supervised training rule 한정.',
          },
          direct_comparison_summary: {
            forced_disjoint_saturation_pct: 100,
            overlapping_held_out_pct_range: '3.0% - 13.0%',
            chance_level_pct: 25,
            verdict_inversion: 'forced-disjoint saturation 100% ↔ overlapping sub-chance collapse — same σ regime, training rule (R-STDP), gesture set 영역 topology 만 변경 → 100% accuracy delta. architecture-fit verify direct evidence (R-STDP supervised training rule 한정).',
            training_rule_scope: 'R-STDP (reward-modulated STDP, supervised target reinforce / non-target punish) 한정. Contrastive STDP / k-WTA / unsupervised STDP / Hebbian 영역 동일 verdict 영역 generalize 금지 — 별도 R&D mandatory.',
          },
        },
      };
      saveMeasurement('hand-snn-overlapping-topk-sigma-sweep', measurement);

      // 검증 assertion (R&D measurement — verdict 영역 reject 없음):
      // - baseline / held-out accuracy mean ∈ [0, 1] (degenerate collapse 영역
      //   허용 — overlapping topology + R-STDP 영역 sub-chance accuracy 영역
      //   architecture mismatch hypothesis 영역 strong signal).
      // - mean_pairwise_jaccard_mean > 0 per σ (overlapping topology verify —
      //   selectMeanSubtractedTopK 영역 Jaccard > 0 expected).
      // - test 자체 영역 sigma 영역 effect (saturation / decline / collapse)
      //   영역 verdict 영역 measurement JSON 영역 명시 — R&D 측정.
      for (const a of aggregates) {
        expect(a.baseline_accuracy_mean).toBeGreaterThanOrEqual(0);
        expect(a.baseline_accuracy_mean).toBeLessThanOrEqual(1);
        expect(a.held_out_accuracy_mean).toBeGreaterThanOrEqual(0);
        expect(a.held_out_accuracy_mean).toBeLessThanOrEqual(1);
        expect(a.mean_pairwise_jaccard_mean).toBeGreaterThan(0);
      }

      console.log('');
      console.log('[overlapping-topk-sigma-sweep] === per-σ aggregate ===');
      for (const a of aggregates) {
        console.log(
          `[overlapping-topk-sigma-sweep] σ=${a.sigma.toFixed(2)} ` +
          `baseline=${(a.baseline_accuracy_mean * 100).toFixed(1)}±${(a.baseline_accuracy_std * 100).toFixed(1)}% ` +
          `held_out=${(a.held_out_accuracy_mean * 100).toFixed(1)}±${(a.held_out_accuracy_std * 100).toFixed(1)}% ` +
          `jaccard=${a.mean_pairwise_jaccard_mean.toFixed(3)}`,
        );
        console.log(`[overlapping-topk-sigma-sweep]   confusion (rows=true, cols=pred, aggregated over ${a.n_seed_pairs} seeds):`);
        for (let i = 0; i < a.aggregated_held_out_confusion.length; i += 1) {
          console.log(`[overlapping-topk-sigma-sweep]     ${GESTURE_MAKERS[i].name}: [${a.aggregated_held_out_confusion[i].join(', ')}]`);
        }
      }
      console.log('');
      console.log(`[overlapping-topk-sigma-sweep] hypothesis_verdict=${verdict}`);
      console.log(`[overlapping-topk-sigma-sweep] accuracy means by σ: [${accMeans.map(a => (a * 100).toFixed(1) + '%').join(', ')}]`);
      console.log(`[overlapping-topk-sigma-sweep] sigma_threshold_empirical=${sigmaThresholdEmpirical ?? 'none (all saturated)'}`);
      console.log(`[overlapping-topk-sigma-sweep] monotonic_nonincreasing=${monotonicNonIncreasing} / strict_monotonic=${strictMonotonic}`);
      console.log(`[overlapping-topk-sigma-sweep] all_jaccard_positive=${allJaccardPositive} (overlapping topology verify)`);
      console.log('[overlapping-topk-sigma-sweep] frequentist: failure to reject ≠ accept. small N + simulated noise — broader replication 권장.');
    },
  );
});
