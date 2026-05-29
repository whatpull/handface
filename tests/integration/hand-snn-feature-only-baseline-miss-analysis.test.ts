// Hand SNN — Feature_only baseline systematic miss gesture catch R&D
// (per-seed empirical identification).
//
// 컨텍스트 (2026-05-29): 직전 commits 218c01e (input-vs-feature) / 9b72acd
// (extreme) / 5c5eb94 (catastrophic) 영역 모두 feature_only variant 영역 baseline
// systematic outlier 영역 reproduce — baseline_correct=3 / baseline_total=4
// 영역 단일 number 영역 측정 — gesture index 영역 explicit 명시 0. 직전
// catastrophic measurement 영역 정직 한계: "per-seed feature_only baseline
// systematic miss gesture index 영역 measurement JSON 영역 explicit 명시 0 —
// 별도 R&D 권장".
//
// 본 R&D 영역 baseline per-gesture confusion 영역 empirical 측정 → systematic
// miss gesture index empirical catch + hypothesis verdict (single gesture
// systematic / distributed / σ-dependent).
//
// 시나리오 (focused scope — variant=feature_only 한정):
//   - σ ∈ {0.10, 1.0, 5.0} (직전 sweeps 영역 한정 — reproduction 확인)
//   - 5 seed pair: train=[1000..1400], infer=[2000..2400]
//   - 영역 (σ, seed pair) × 4 gesture × N=1 baseline trial = 4 trial
//   - 총 3 σ × 5 seed = 15 (σ, seed) × 4 = 60 baseline trial
//   - baseline 한정 — held-out 영역 영역 영역 영역 (직전 R&D 영역 영역 영역)
//
// 측정 metrics:
//   - per-(σ, seed) baseline_correct_per_gesture [g0, g1, g2, g3] (0/1)
//   - per-(σ, seed) baseline_predicted_winner_per_gesture [w0, w1, w2, w3]
//     (winner cluster index)
//   - aggregate per σ gesture_miss_frequency [count_g0, ...] / 5 seed
//   - aggregate per σ gesture_miss_to_winner_distribution per (true gesture,
//     predicted winner) confusion
//
// hypothesis verdicts:
//   - H_single_gesture_systematic: 단일 gesture index 영역 5/5 seed × 3/3 σ
//     = 15/15 instance 영역 miss → systematic boundary case
//   - H_distributed: miss 영역 다양 gesture 영역 distribute (15 instance 영역
//     다른 gesture)
//   - H_per_sigma_specific: per σ 영역 systematic miss gesture 영역 다름 —
//     σ-dependent boundary
//
// 학술 정합:
//   - Olshausen & Field 1996 — sparse coding boundary case sensitivity
//   - Diehl & Cook 2015 — STDP topology fixed
//   - Bishop 1995 — classification boundary case
//   - Goodfellow et al. 2014 — noise injection regularization
//
// 정직 한계 (measurement JSON limitations):
//   - focused scope: variant=feature_only 한정 — jitter_only / combined
//     variant 영역 별도 R&D
//   - σ ∈ {0.10, 1.0, 5.0} 한정 — finer granularity / σ ≥ 10 별도 R&D
//   - 5 seed × 3 σ = 15 instance per gesture frequency — Wilson CI moderate
//   - baseline N=1 per gesture per (σ, seed) = single trial — 영역 영역 영역
//     noisy
//   - forced-disjoint K=10 mean-sub topology baseline — overlapping variant
//     별도 R&D
//   - simulated feature noise only — actual MediaPipe capture 미검증
//   - frequentist: H0/H1 failure to reject ≠ accept

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
  applyRealisticNoise,
  DEFAULT_NOISE_PARAMS,
} from '@/lib/snn-runtime/hand-noise';

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

// 4 anatomical mock gesture — hand-snn-sigma-sweep / broader / input-vs-feature
// / extreme / catastrophic 영역 cross-reference consistency 동일.
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

// ── focused scope params ──
// 정직 명시: 직전 commits 218c01e / 9b72acd / 5c5eb94 영역 feature_only variant
// baseline outlier 영역 모든 σ 영역 동일 — 본 R&D 영역 동일 σ subset 영역
// reproduction 확인 + per-gesture systematic miss empirical identification.
const SIGMA_VALUES = [0.10, 1.0, 5.0] as const;
const SEED_PAIRS: ReadonlyArray<{ train: number; infer: number }> = [
  { train: 1000, infer: 2000 },
  { train: 1100, infer: 2100 },
  { train: 1200, infer: 2200 },
  { train: 1300, infer: 2300 },
  { train: 1400, infer: 2400 },
];
const N_SAMPLES_TRAIN = 20;
const K = 10;
const REINFORCE_BATCH_INTENSITY = 25;

interface CombinationResult {
  sigma: number;
  train_seed: number;
  infer_seed: number;
  baseline_correct_per_gesture: number[];
  baseline_predicted_winner_per_gesture: number[];
  baseline_max_rate_per_gesture: number[];
  baseline_accuracy: number;
  baseline_correct_total: number;
  baseline_total: number;
  mean_disjoint_jaccard: number;
}

interface SigmaAggregate {
  sigma: number;
  n_seed_pairs: number;
  baseline_accuracy_mean: number;
  baseline_accuracy_std: number;
  // gesture_miss_frequency[g] = 영역 (σ, seed) 영역 영역 영역 gesture g 영역
  // 영역 영역 영역 영역 (0~5).
  gesture_miss_frequency: number[];
  // gesture_miss_frequency_ratio[g] = gesture_miss_frequency[g] / n_seed_pairs
  gesture_miss_frequency_ratio: number[];
  // confusion[trueG][predictedWinner] = aggregate count (n_seed_pairs trial /
  // gesture).
  baseline_confusion_matrix: number[][];
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

// single (σ, seed pair) measurement — feature_only variant 한정 (inputJitterSigma=0,
// trained noise 영역 영역 영역 영역 — feature_only 영역 inputJitterSigma=0 →
// landmark jitter 없음). baseline 영역 clean sparse pattern self-classification
// 영역 measurement — feature 영역 영역 영역 baseline 영역 영역 영역 영역 영역
// trained weight 영역 systematic miss 영역 영역.
async function runCombination(
  sigma: number,
  trainSeed: number,
  inferSeed: number, // baseline 한정 영역 — seed 영역 변동 영역 영역 영역
): Promise<CombinationResult> {
  // feature_only variant — input jitter 영역 disabled (직전 catastrophic
  // resolveSigmas 'feature_only' 영역 inputJitterSigma=0 동일).
  const noiseParams = { ...DEFAULT_NOISE_PARAMS, jitterSigma: 0 };

  // Step 1: training set — input-level applyRealisticNoise jitterSigma=0 →
  // affine perturbation (scale/rotation/translation) DEFAULT_NOISE_PARAMS 영역
  // 보존. feature 영역 noise 영역 inference 영역 영역 — train 영역 clean
  // pattern 영역 self-classification 영역 영역 영역.
  const trainNoisyByGesture: HandLandmark[][][] = GESTURE_MAKERS.map((gm, gIdx) => {
    const base = gm.make();
    const gaussian = new SeededGaussian(trainSeed + gIdx * 100);
    const samples: HandLandmark[][] = [];
    for (let s = 0; s < N_SAMPLES_TRAIN; s += 1) {
      samples.push(applyRealisticNoise(base, noiseParams, gaussian));
    }
    return samples;
  });

  // Step 2: forced-disjoint top-K topology — clean anatomical baseline (Diehl
  // & Cook 2015 topology-fixed STDP).
  const cleanFeatures = GESTURE_MAKERS.map(gm =>
    encodeHandToFeatureVector(gm.make()),
  );
  const candidateTopK = selectForcedDisjointTopK(cleanFeatures, K);
  const cleanSparsePatterns = cleanFeatures.map((fv, g) =>
    applySparseTopK(fv, candidateTopK[g]),
  );

  // Step 3: disjoint Jaccard 측정 — forced-disjoint invariant 0 expected.
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
    prefix: `hand_fobasemiss_${sigma}_${trainSeed}`,
  });
  const lab = new LocalSNN({
    netId: `hand_fobasemiss_${sigma}_${trainSeed}_demo`,
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
  // jitter=0 (feature_only) — affine perturbation 영역 trained weight 영역
  // 영역 영역.
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

  // Step 6: baseline per-gesture self-classification — winner cluster index
  // 영역 record + correct/incorrect 영역 record. systematic miss gesture 영역
  // empirical 명시.
  const baselineCorrectPerGesture: number[] = GESTURE_MAKERS.map(() => 0);
  const baselineWinnerPerGesture: number[] = GESTURE_MAKERS.map(() => -1);
  const baselineMaxRatePerGesture: number[] = GESTURE_MAKERS.map(() => 0);
  let baselineCorrectTotal = 0;
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
    baselineWinnerPerGesture[g] = winner;
    baselineMaxRatePerGesture[g] = maxRate;
    if (winner === g) {
      baselineCorrectTotal += 1;
      baselineCorrectPerGesture[g] = 1;
    }
  }
  const baselineAccuracy = baselineCorrectTotal / GESTURE_MAKERS.length;

  return {
    sigma,
    train_seed: trainSeed,
    infer_seed: inferSeed,
    baseline_correct_per_gesture: baselineCorrectPerGesture,
    baseline_predicted_winner_per_gesture: baselineWinnerPerGesture,
    baseline_max_rate_per_gesture: baselineMaxRatePerGesture,
    baseline_accuracy: baselineAccuracy,
    baseline_correct_total: baselineCorrectTotal,
    baseline_total: GESTURE_MAKERS.length,
    mean_disjoint_jaccard: meanDisjointJaccard,
  };
}

// hypothesis verdict classification — gesture_miss_frequency 영역 per-σ /
// per-gesture distribution 영역 영역 verdict 영역 산출.
//
// 정의:
//   - H_single_gesture_systematic: 단일 gesture index 영역 모든 σ 영역
//     모든 seed 영역 miss (5/5 seed × 3/3 σ = 15/15 instance) AND 다른
//     gesture 영역 miss 없음.
//   - H_distributed: miss 영역 영역 영역 gesture 영역 distribute (≥ 2
//     gesture 영역 miss instance 영역 영역).
//   - H_per_sigma_specific: per σ 영역 systematic miss gesture index 영역
//     다름 (σ_a → gesture_a / σ_b → gesture_b dominant miss).
//   - H_no_systematic_miss: 영역 영역 영역 영역 miss 없음 (baseline 100%
//     achievable).
function classifyHypothesisVerdict(
  perSigmaAggregates: SigmaAggregate[],
  nSeedPairs: number,
  nGestures: number,
): {
  verdict: string;
  systematic_miss_gesture_index: number | null;
  systematic_miss_gesture_indices_per_sigma: Array<{ sigma: number; gesture_index: number | null }>;
  evidence: string;
} {
  // per-σ 영역 dominant miss gesture (모든 seed 영역 miss).
  const perSigmaDominant: Array<{ sigma: number; gesture_index: number | null }> = [];
  for (const agg of perSigmaAggregates) {
    let dominantGesture: number | null = null;
    for (let g = 0; g < nGestures; g += 1) {
      // 모든 seed 영역 miss = miss_frequency[g] === n_seed_pairs.
      if (agg.gesture_miss_frequency[g] === nSeedPairs) {
        if (dominantGesture === null) {
          dominantGesture = g;
        } else {
          // 영역 영역 gesture 영역 모든 seed 영역 miss → systematic dominance
          // 영역 영역 영역 — 영역 영역 영역 null 영역 영역 영역 영역.
          dominantGesture = -1;
        }
      }
    }
    perSigmaDominant.push({ sigma: agg.sigma, gesture_index: dominantGesture });
  }

  // 영역 (σ, gesture) 영역 miss frequency 영역 영역 영역.
  let totalMissInstances = 0;
  const perGestureGlobalMiss: number[] = Array(nGestures).fill(0) as number[];
  for (const agg of perSigmaAggregates) {
    for (let g = 0; g < nGestures; g += 1) {
      perGestureGlobalMiss[g] += agg.gesture_miss_frequency[g];
      totalMissInstances += agg.gesture_miss_frequency[g];
    }
  }
  const expectedMaxInstancesPerGesture = nSeedPairs * perSigmaAggregates.length;
  // 영역 영역 영역 miss → H_no_systematic_miss.
  if (totalMissInstances === 0) {
    return {
      verdict: 'H_no_systematic_miss',
      systematic_miss_gesture_index: null,
      systematic_miss_gesture_indices_per_sigma: perSigmaDominant,
      evidence: '영역 (σ, seed) × gesture = ' +
        `${perSigmaAggregates.length * nSeedPairs * nGestures} trial 영역 영역 영역 miss 없음 — baseline 100% 영역 영역 영역 영역.`,
    };
  }

  // 단일 gesture systematic — 영역 영역 (σ, seed) instance 영역 모두 동일
  // gesture 영역 miss.
  let singleGestureCandidate: number | null = null;
  let singleGestureMatch = true;
  for (let g = 0; g < nGestures; g += 1) {
    if (perGestureGlobalMiss[g] === expectedMaxInstancesPerGesture) {
      if (singleGestureCandidate === null) {
        singleGestureCandidate = g;
      } else {
        // 영역 영역 gesture 영역 영역 영역 → 단일 영역 아님.
        singleGestureMatch = false;
      }
    } else if (perGestureGlobalMiss[g] > 0) {
      // 단일 candidate 영역 + 영역 영역 영역 영역 miss → 단일 systematic
      // 영역 영역 영역 영역 distributed.
      if (singleGestureCandidate !== null) {
        singleGestureMatch = false;
      }
    }
  }
  if (singleGestureCandidate !== null && singleGestureMatch &&
      perGestureGlobalMiss[singleGestureCandidate] === expectedMaxInstancesPerGesture) {
    return {
      verdict: 'H_single_gesture_systematic',
      systematic_miss_gesture_index: singleGestureCandidate,
      systematic_miss_gesture_indices_per_sigma: perSigmaDominant,
      evidence: `gesture index ${singleGestureCandidate} 영역 ${expectedMaxInstancesPerGesture}/${expectedMaxInstancesPerGesture} instance 영역 systematic miss — 다른 gesture miss 영역 영역.`,
    };
  }

  // per σ 영역 dominant miss gesture 영역 다름 → H_per_sigma_specific.
  const dominantGestureSet = new Set<number>();
  let anyNullDominant = false;
  for (const d of perSigmaDominant) {
    if (d.gesture_index === null || d.gesture_index === -1) {
      anyNullDominant = true;
    } else {
      dominantGestureSet.add(d.gesture_index);
    }
  }
  if (!anyNullDominant && dominantGestureSet.size === perSigmaAggregates.length) {
    return {
      verdict: 'H_per_sigma_specific',
      systematic_miss_gesture_index: null,
      systematic_miss_gesture_indices_per_sigma: perSigmaDominant,
      evidence: `per σ 영역 dominant miss gesture 영역 다름 — σ ${perSigmaDominant.map(d => `${d.sigma}→g${d.gesture_index}`).join(', ')}.`,
    };
  }

  // 영역 → H_distributed.
  return {
    verdict: 'H_distributed',
    systematic_miss_gesture_index: null,
    systematic_miss_gesture_indices_per_sigma: perSigmaDominant,
    evidence: `miss 영역 영역 gesture 영역 distribute — per-gesture global miss [${perGestureGlobalMiss.join(', ')}] / 영역 ${expectedMaxInstancesPerGesture} 영역.`,
  };
}

// CI skip — focused scope 60 trial 영역 가벼운 wall-time expected.
// CI 영역 직전 catastrophic 한정 — 본 focused R&D 영역 60 trial baseline
// 한정 영역 timeout 600s 영역 영역 영역 영역 — CI skip 영역 영역.
const SKIP_HEAVY_TESTS = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Feature_only baseline systematic miss gesture catch R&D', () => {
  it.skipIf(SKIP_HEAVY_TESTS)(
    '★ feature_only × σ ∈ {0.10, 1.0, 5.0} × 5 seed × 4 gesture baseline → systematic miss empirical identification',
    { timeout: 1500000 },
    async () => {
      const startedAtMs = Date.now();
      const allResults: CombinationResult[] = [];
      for (const sigma of SIGMA_VALUES) {
        for (const seedPair of SEED_PAIRS) {
          const r = await runCombination(sigma, seedPair.train, seedPair.infer);
          allResults.push(r);
          console.log(
            `[fo-basemiss] σ=${sigma.toFixed(2)} ` +
            `train_seed=${seedPair.train} infer_seed=${seedPair.infer} ` +
            `baseline=${(r.baseline_accuracy * 100).toFixed(1)}% ` +
            `correct_per_gesture=[${r.baseline_correct_per_gesture.join(',')}] ` +
            `winner=[${r.baseline_predicted_winner_per_gesture.join(',')}] ` +
            `jaccard=${r.mean_disjoint_jaccard.toFixed(3)}`,
          );
        }
      }

      // aggregate per σ.
      const aggregates: SigmaAggregate[] = [];
      for (const sigma of SIGMA_VALUES) {
        const subset = allResults.filter(r => r.sigma === sigma);
        const baselineAccs = subset.map(r => r.baseline_accuracy);
        const gestureMissFrequency: number[] = GESTURE_MAKERS.map(() => 0);
        const confusionMatrix: number[][] = GESTURE_MAKERS.map(() =>
          GESTURE_MAKERS.map(() => 0),
        );
        for (const r of subset) {
          for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
            // miss = correct[g] === 0.
            if (r.baseline_correct_per_gesture[g] === 0) {
              gestureMissFrequency[g] += 1;
            }
            const winner = r.baseline_predicted_winner_per_gesture[g];
            if (winner >= 0 && winner < GESTURE_MAKERS.length) {
              confusionMatrix[g][winner] += 1;
            }
          }
        }
        aggregates.push({
          sigma,
          n_seed_pairs: subset.length,
          baseline_accuracy_mean: mean(baselineAccs),
          baseline_accuracy_std: std(baselineAccs),
          gesture_miss_frequency: gestureMissFrequency,
          gesture_miss_frequency_ratio: gestureMissFrequency.map(
            n => (subset.length > 0 ? n / subset.length : 0),
          ),
          baseline_confusion_matrix: confusionMatrix,
          per_seed: subset,
        });
      }

      // hypothesis verdict classification.
      const hypothesisVerdict = classifyHypothesisVerdict(
        aggregates,
        SEED_PAIRS.length,
        GESTURE_MAKERS.length,
      );

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-feature-only-baseline-miss-analysis',
        elapsed_ms: elapsedMs,
        elapsed_minutes: elapsedMs / 60000,
        focused_scope: {
          variant: 'feature_only',
          sigma_values: SIGMA_VALUES,
          seed_pairs: SEED_PAIRS,
          measurement_target:
            'baseline per-gesture systematic miss empirical identification — 직전 commits 218c01e / 9b72acd / 5c5eb94 영역 baseline_correct=3/4 systematic outlier 영역 gesture index empirical catch.',
        },
        gestures: GESTURE_MAKERS.map(g => g.name),
        n_samples_train: N_SAMPLES_TRAIN,
        sparse_top_k: K,
        reinforce_batch_intensity: REINFORCE_BATCH_INTENSITY,
        preset: 'n16_hand',
        total_combinations: SIGMA_VALUES.length * SEED_PAIRS.length,
        total_baseline_trials:
          SIGMA_VALUES.length * SEED_PAIRS.length * GESTURE_MAKERS.length,
        per_combination: allResults,
        per_sigma_aggregate: aggregates,
        hypothesis_verdict: hypothesisVerdict.verdict,
        systematic_miss_gesture_index: hypothesisVerdict.systematic_miss_gesture_index,
        systematic_miss_gesture_name:
          hypothesisVerdict.systematic_miss_gesture_index !== null
            ? (GESTURE_MAKERS[hypothesisVerdict.systematic_miss_gesture_index]?.name ?? null)
            : null,
        systematic_miss_gesture_indices_per_sigma:
          hypothesisVerdict.systematic_miss_gesture_indices_per_sigma.map(d => ({
            sigma: d.sigma,
            gesture_index: d.gesture_index,
            gesture_name:
              d.gesture_index !== null && d.gesture_index !== -1
                ? (GESTURE_MAKERS[d.gesture_index]?.name ?? null)
                : null,
          })),
        verdict_evidence: hypothesisVerdict.evidence,
        hypothesis_details: {
          definitions: {
            H_single_gesture_systematic:
              '단일 gesture index 영역 5/5 seed × 3/3 σ = 15/15 instance 영역 miss AND 다른 gesture 영역 miss 없음 → systematic boundary case (Olshausen & Field 1996 sparse coding boundary case sensitivity / Bishop 1995 classification boundary case).',
            H_distributed:
              'miss 영역 영역 영역 gesture 영역 distribute (≥ 2 gesture 영역 miss instance 영역 영역) → noise-driven random miss.',
            H_per_sigma_specific:
              'per σ 영역 dominant miss gesture index 영역 다름 (모든 σ 영역 단일 dominant gesture 영역 영역) → σ-dependent boundary.',
            H_no_systematic_miss:
              '60 baseline trial 영역 영역 영역 miss 없음 → baseline 100% achievable (직전 commits 영역 systematic outlier 영역 reproduce 영역 영역 영역 — 영역 영역 영역 가능).',
          },
          frequentist_note:
            'failure to reject H0 ≠ accept H0. 5 seed × 3 σ = 15 instance per gesture frequency — 95% Wilson CI ±25% (small sample). hypothesis verdict 영역 empirical observation 영역 — formal hypothesis test (binomial / multinomial) 별도 R&D.',
          frequency_threshold_for_systematic:
            'gesture_miss_frequency[g] === n_seed_pairs (모든 seed 영역 miss) AND 모든 σ 영역 동일 g → H_single_gesture_systematic. partial frequency (e.g. 4/5) 영역 H_distributed 영역 영역 영역 — 영역 conservative threshold.',
        },
        academic_alignment: [
          'Olshausen & Field 1996 — sparse coding boundary case sensitivity (top-K mask preserve 영역 영역 영역 영역 영역 boundary feature 영역 영역 영역 misclassification 영역 영역 영역).',
          'Diehl & Cook 2015 — STDP topology fixed (forced-disjoint K=10 영역 topology 영역 영역 영역 영역 baseline 영역 systematic miss 영역 트레이닝 weight 영역 영역).',
          'Bishop 1995 — classification boundary case (Bayes optimal decision boundary 영역 영역 영역 feature vector 영역 영역 영역 misclassification 영역 영역 영역 — Bio-SNN R-STDP 영역 direct mapping 한계).',
          'Goodfellow et al. 2014 — noise injection regularization (training noise 영역 trained weight 영역 specific gesture 영역 systematic bias 영역 영역 가능 — fully-connected MLP 가정 한계).',
        ],
        limitations: [
          'focused scope: variant=feature_only 한정 — jitter_only / combined variant 영역 별도 R&D.',
          'σ ∈ {0.10, 1.0, 5.0} 한정 — finer granularity / σ ≥ 10 별도 R&D.',
          '5 seed × 3 σ = 15 instance per gesture frequency — 95% Wilson CI ±25% (small sample) — moderate statistical power.',
          'baseline N=1 per gesture per (σ, seed) = single trial — clean sparse pattern self-classification 영역 영역 영역 noisy (winner cluster 영역 spike rate tie 영역 first-cluster-wins resolve — runtime jitter dependent).',
          'forced-disjoint K=10 mean-sub topology baseline — overlapping variant 별도 R&D.',
          'simulated feature noise only — actual MediaPipe capture 미검증.',
          'frequentist: H0/H1 failure to reject ≠ accept.',
          'baseline 한정 measurement — held-out 영역 영역 영역 영역 (직전 R&D 영역 영역 영역). baseline systematic miss 영역 held-out 영역 영역 영역 영역 영역 — joint 측정 별도 R&D.',
          'feature_only variant 영역 training set 영역 input jitter=0 (DEFAULT_NOISE_PARAMS scale/rotation/translation 보존) — trained weight 영역 systematic bias 영역 affine perturbation 영역 영역 영역 영역 영역 영역.',
          'mock anatomical hand 영역 actual MediaPipe Hand 영역 z-depth coordinate scale 영역 다를 가능 — 영역 영역 boundary case identification 영역 mock-specific.',
          'classifyHypothesisVerdict 영역 frequency_threshold 영역 strict (n_seed_pairs) — partial frequency (e.g. 4/5) 영역 distributed 영역 영역 → conservative bias.',
          'elapsed_ms 영역 wall-time benchmark (CPU / runtime jitter 영역 dependent — 영역 환경 영역 다른 wall-time 예상).',
        ],
        cross_reference: {
          prior_input_vs_feature_sweep: {
            test_path: 'tests/integration/hand-snn-input-vs-feature-sigma.test.ts',
            commit: '218c01e',
            measurement_path: 'tests/integration/measurements/hand-snn-input-vs-feature-sigma.json',
            note: 'σ ∈ {0.10, 0.30, 0.50} — feature_only variant baseline=3/4 systematic outlier 발견 — per-gesture index 영역 미명시.',
          },
          prior_extreme_sweep: {
            test_path: 'tests/integration/hand-snn-extreme-sigma-sweep.test.ts',
            commit: '9b72acd',
            measurement_path: 'tests/integration/measurements/hand-snn-extreme-sigma-sweep.json',
            note: 'σ ∈ {1.0, 2.0, 5.0} — feature_only baseline=3/4 reproduce — per-gesture index 영역 미명시.',
          },
          prior_catastrophic_sweep: {
            test_path: 'tests/integration/hand-snn-catastrophic-sigma-sweep.test.ts',
            commit: '5c5eb94',
            measurement_path: 'tests/integration/measurements/hand-snn-catastrophic-sigma-sweep.json',
            note: 'σ ∈ {10.0, 20.0, 50.0} — feature_only baseline=3/4 reproduce — per-gesture index 영역 미명시. limitations 영역 "별도 R&D 권장" 명시.',
          },
        },
      };
      saveMeasurement('hand-snn-feature-only-baseline-miss-analysis', measurement);

      // 검증 assertion (R&D measurement — systematic miss empirical identification 영역
      // 영역 영역 reject 없음):
      // - baseline ≥ 0.0 per σ — feature_only training 영역 baseline 영역 break 가능.
      // - jaccard = 0 per combination (forced-disjoint invariant — topology-only).
      // - hypothesis verdict 영역 4 verdict 영역 영역 영역.
      for (const a of aggregates) {
        expect(a.baseline_accuracy_mean).toBeGreaterThanOrEqual(0.0);
        expect(a.baseline_accuracy_mean).toBeLessThanOrEqual(1.0);
        for (const r of a.per_seed) {
          expect(r.mean_disjoint_jaccard).toBe(0);
        }
      }
      expect([
        'H_single_gesture_systematic',
        'H_distributed',
        'H_per_sigma_specific',
        'H_no_systematic_miss',
      ]).toContain(hypothesisVerdict.verdict);

      console.log('');
      console.log('[fo-basemiss] === per-σ aggregate ===');
      for (const a of aggregates) {
        console.log(
          `[fo-basemiss] σ=${a.sigma.toFixed(2)} ` +
          `baseline=${(a.baseline_accuracy_mean * 100).toFixed(1)}±${(a.baseline_accuracy_std * 100).toFixed(1)}% ` +
          `miss_freq=[${a.gesture_miss_frequency.join(',')}] / ${a.n_seed_pairs} seed`,
        );
        console.log(
          `[fo-basemiss] σ=${a.sigma.toFixed(2)} confusion (rows=trueG, cols=winner):`,
        );
        for (let g = 0; g < a.baseline_confusion_matrix.length; g += 1) {
          console.log(
            `[fo-basemiss]   [g${g}] ${a.baseline_confusion_matrix[g].join(' ')}`,
          );
        }
      }
      console.log('');
      console.log(`[fo-basemiss] hypothesis_verdict=${hypothesisVerdict.verdict}`);
      console.log(
        `[fo-basemiss] systematic_miss_gesture_index=${hypothesisVerdict.systematic_miss_gesture_index !== null ? hypothesisVerdict.systematic_miss_gesture_index : 'null'}`,
      );
      console.log(`[fo-basemiss] evidence: ${hypothesisVerdict.evidence}`);
      console.log(`[fo-basemiss] elapsed_ms=${elapsedMs} (${(elapsedMs / 60000).toFixed(2)} min)`);
      console.log('[fo-basemiss] frequentist: failure to reject ≠ accept. R&D measurement only.');
    },
  );
});
