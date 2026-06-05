// Hand SNN — Joint criterion (overlap × sign × magnitude) 4×4 pair evaluation R&D
// (op-pe specific bias mechanism empirical verify).
//
// 컨텍스트 (2026-05-30): 직전 commit 6ae3a50 (hand-snn-cluster-active-inputs-verify)
// 영역 H_partial verdict 영역 명시 — op-pe pair Jaccard=0.429 영역 highest 영역 영역
// (cf-pe Jaccard=0.818 dominant) → overlap alone 영역 op-pe specific bias 영역 explain
// 영역 영역. H_residual_sign_alignment TRUE 단 n=6 binomial p=0.03125 marginal.
// 정직 한계: "Joint hypothesis (overlap × sign alignment × magnitude) op-pe specific
// bias mechanism — 4×4 pair joint criterion evaluation 별도 R&D mandatory".
//
// 본 R&D 영역 6 pair (op-cf / op-tu / op-pe / cf-tu / cf-pe / tu-pe) 영역 joint
// criterion (overlap × same_sign_ratio × average_residual_magnitude) 영역 산출 → op-pe
// specific signature empirical verify.
//
// 시나리오 (focused scope):
//   - 4 gesture (open_palm / closed_fist / thumbs_up / peace_sign) — 6ae3a50 동일 mock.
//   - selectMeanSubtractedTopK K=10 (6ae3a50 baseline 동일).
//   - feature dim 95 (HAND_FEAT_DIM).
//   - single forward pass (encoder only — no SNN simulation).
//
// 측정 metrics (per pair):
//   - overlap: Jaccard similarity (6ae3a50 정합 reproduce).
//   - shared_indices: shared cluster_active_inputs indices array.
//   - same_sign_ratio: residual sign agreement ratio.
//   - average_residual_magnitude: shared indices 영역 |residual| 평균
//     (gesture pair 영역 평균 — (|r_i| + |r_j|) / 2 영역 shared idx 영역 mean).
//   - min_residual_magnitude: 영역 shared index 영역 min |residual| (영역 pair-wise mean).
//   - max_residual_magnitude: 영역 shared index 영역 max |residual| (영역 pair-wise mean).
//   - magnitude_variance: residual magnitude 영역 variance (uniform vs heterogeneous).
//   - joint_score: composite metric = overlap × same_sign_ratio × average_residual_magnitude.
//   - joint_score_normalized: joint_score / max(joint_score across pairs).
//
// hypothesis verdicts:
//   - H_op_pe_unique_signature: op-pe joint_score 영역 dominant (≥ 2× next highest)
//     → joint mechanism (overlap × sign × magnitude) 영역 op-pe specific bias 영역
//     explain 영역.
//   - H_distributed_signatures: joint_score 영역 spread 영역 (max/next < 2× 영역 영역)
//     → joint criterion 영역 op-pe specific 영역 영역 영역 — spike encoding tie-break
//     / weight init 영역 다른 mechanism mandatory.
//   - H_cf_pe_dominant_joint: cf-pe joint_score 영역 highest (overlap-dominated joint
//     criterion 영역 cf-pe 영역 영역 영역 단 systematic miss 영역 영역 — mechanism
//     gap 영역 영역 영역 영역).
//
// 학술 정합:
//   - Bishop 1995 — multi-dimensional feature space + joint criterion (overlap +
//     magnitude + sign 영역 joint decision boundary).
//   - Olshausen & Field 1996 — sparse coding magnitude weighted overlap.
//   - Diehl & Cook 2015 — STDP cluster_active_inputs winner topology.
//
// 정직 한계 (measurement JSON limitations):
//   - focused scope: 4 gesture × K=10 mean-sub topology 한정.
//   - joint_score composite formula 영역 ad-hoc — formal weighted criterion
//     (e.g. PCA principal component) 별도 R&D.
//   - Mean-sub residual 영역 gesture set dependent.
//   - Spike encoding tie / weight init 다른 mechanism 별도 R&D.
//   - Mock anatomical 한정 — actual MediaPipe 동일 signature 보장 X.
//   - Joint criterion 영역 n=6 (6 pair) — statistical power limited, broader gesture
//     pool 별도 R&D.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  encodeHandToFeatureVector,
  selectMeanSubtractedTopK,
  HAND_FEAT_DIM,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// Mock anatomical gesture — 6ae3a50 cross-reference 동일 (appendFinger × 5 finger).
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

const K = 10;

interface PairJointMetrics {
  i: number;
  j: number;
  gesture_i: string;
  gesture_j: string;
  pair_label: string;
  overlap: number;
  shared_count: number;
  shared_indices: number[];
  same_sign_ratio: number;
  average_residual_magnitude: number;
  min_residual_magnitude: number;
  max_residual_magnitude: number;
  magnitude_variance: number;
  joint_score: number;
  joint_score_normalized: number;
}

function jaccardOf(a: ReadonlyArray<number>, b: ReadonlyArray<number>): {
  j: number;
  sharedCount: number;
  sharedIndices: number[];
} {
  const sa = new Set(a);
  const sb = new Set(b);
  const shared: number[] = [];
  for (const x of sa) if (sb.has(x)) shared.push(x);
  shared.sort((p, q) => p - q);
  const union = sa.size + sb.size - shared.length;
  return { j: union > 0 ? shared.length / union : 0, sharedCount: shared.length, sharedIndices: shared };
}

function computePairJointMetrics(
  i: number,
  j: number,
  clusterActiveInputs: number[][],
  featureVectors: number[][],
  meanVec: number[],
): Omit<PairJointMetrics, 'joint_score_normalized'> {
  const { j: jac, sharedCount, sharedIndices } = jaccardOf(
    clusterActiveInputs[i],
    clusterActiveInputs[j],
  );
  const fvI = featureVectors[i];
  const fvJ = featureVectors[j];

  let sameSign = 0;
  const pairMagnitudes: number[] = [];
  for (const idx of sharedIndices) {
    const rI = fvI[idx] - meanVec[idx];
    const rJ = fvJ[idx] - meanVec[idx];
    if ((rI > 0 && rJ > 0) || (rI < 0 && rJ < 0)) sameSign += 1;
    pairMagnitudes.push((Math.abs(rI) + Math.abs(rJ)) / 2);
  }
  const sameSignRatio = sharedCount > 0 ? sameSign / sharedCount : 0;

  const avgMag = pairMagnitudes.length > 0
    ? pairMagnitudes.reduce((acc, v) => acc + v, 0) / pairMagnitudes.length
    : 0;
  const minMag = pairMagnitudes.length > 0 ? Math.min(...pairMagnitudes) : 0;
  const maxMag = pairMagnitudes.length > 0 ? Math.max(...pairMagnitudes) : 0;
  let varMag = 0;
  if (pairMagnitudes.length > 1) {
    const mean = avgMag;
    let acc = 0;
    for (const m of pairMagnitudes) acc += (m - mean) * (m - mean);
    varMag = acc / pairMagnitudes.length;
  }

  // joint_score = overlap × same_sign_ratio × average_residual_magnitude
  const jointScore = jac * sameSignRatio * avgMag;

  return {
    i,
    j,
    gesture_i: GESTURE_MAKERS[i].name,
    gesture_j: GESTURE_MAKERS[j].name,
    pair_label: `${GESTURE_MAKERS[i].name}__${GESTURE_MAKERS[j].name}`,
    overlap: jac,
    shared_count: sharedCount,
    shared_indices: sharedIndices,
    same_sign_ratio: sameSignRatio,
    average_residual_magnitude: avgMag,
    min_residual_magnitude: minMag,
    max_residual_magnitude: maxMag,
    magnitude_variance: varMag,
    joint_score: jointScore,
  };
}

interface JointEvaluationBundle {
  per_pair: PairJointMetrics[];
  ranked_by_joint_score: PairJointMetrics[];
  op_pe_metrics: PairJointMetrics | null;
  cf_pe_metrics: PairJointMetrics | null;
  max_joint_score: number;
  next_highest_joint_score: number;
  op_pe_vs_next_ratio: number;
  cf_pe_vs_next_ratio: number;
}

function classifyVerdict(bundle: JointEvaluationBundle): {
  verdict: 'H_op_pe_unique_signature' | 'H_cf_pe_dominant_joint' | 'H_distributed_signatures';
  evidence: string;
} {
  const ranked = bundle.ranked_by_joint_score;
  if (ranked.length < 2) {
    return {
      verdict: 'H_distributed_signatures',
      evidence: 'ranked list size < 2 — cannot compare highest vs next.',
    };
  }
  const top = ranked[0];
  const next = ranked[1];
  const ratio = next.joint_score > 0 ? top.joint_score / next.joint_score : Infinity;
  const isOpPeTop = top.pair_label === 'open_palm__peace_sign';
  const isCfPeTop = top.pair_label === 'closed_fist__peace_sign';

  let verdict: 'H_op_pe_unique_signature' | 'H_cf_pe_dominant_joint' | 'H_distributed_signatures';
  if (isOpPeTop && ratio >= 2) {
    verdict = 'H_op_pe_unique_signature';
  } else if (isCfPeTop && ratio >= 2) {
    verdict = 'H_cf_pe_dominant_joint';
  } else {
    verdict = 'H_distributed_signatures';
  }

  const evidence =
    `top_pair=${top.pair_label} (joint_score=${top.joint_score.toFixed(6)}), ` +
    `next_pair=${next.pair_label} (joint_score=${next.joint_score.toFixed(6)}), ` +
    `ratio=${ratio.toFixed(3)} (≥ 2× → unique signature).`;
  return { verdict, evidence };
}

describe('Hand SNN — Joint criterion (overlap × sign × magnitude) 4×4 pair evaluation R&D', () => {
  it(
    '★ 4 gesture × 6 pair joint criterion evaluation → op-pe specific signature empirical verify',
    { timeout: 60000 },
    () => {
      const startedAtMs = Date.now();

      // Step 1: encode 4 gesture → feature vectors.
      const featureVectors = GESTURE_MAKERS.map(gm => encodeHandToFeatureVector(gm.make()));

      // Step 2: global mean over 4 gestures (matches selectMeanSubtractedTopK).
      const dim = featureVectors[0].length;
      const meanVec = new Array<number>(dim).fill(0);
      for (const fv of featureVectors) {
        for (let i = 0; i < dim; i += 1) meanVec[i] += fv[i];
      }
      for (let i = 0; i < dim; i += 1) meanVec[i] /= featureVectors.length;

      // Step 3: selectMeanSubtractedTopK K=10 — 6ae3a50 baseline 동일.
      const clusterActiveInputs = selectMeanSubtractedTopK(featureVectors, K);

      // Step 4: per-pair joint metrics (6 pair = C(4,2)).
      const rawPairs: Omit<PairJointMetrics, 'joint_score_normalized'>[] = [];
      const n = GESTURE_MAKERS.length;
      for (let i = 0; i < n; i += 1) {
        for (let j = i + 1; j < n; j += 1) {
          rawPairs.push(computePairJointMetrics(i, j, clusterActiveInputs, featureVectors, meanVec));
        }
      }

      // Step 5: joint_score_normalized = joint_score / max(joint_score).
      const maxJointScore = rawPairs.length > 0
        ? Math.max(...rawPairs.map(p => p.joint_score))
        : 0;
      const perPair: PairJointMetrics[] = rawPairs.map(p => ({
        ...p,
        joint_score_normalized: maxJointScore > 0 ? p.joint_score / maxJointScore : 0,
      }));

      // Step 6: rank by joint_score descending.
      const rankedByJointScore = [...perPair].sort((a, b) => b.joint_score - a.joint_score);

      const opPeMetrics = perPair.find(p => p.pair_label === 'open_palm__peace_sign') ?? null;
      const cfPeMetrics = perPair.find(p => p.pair_label === 'closed_fist__peace_sign') ?? null;
      const nextHighest = rankedByJointScore.length >= 2 ? rankedByJointScore[1].joint_score : 0;
      const opPeVsNextRatio = opPeMetrics && nextHighest > 0
        ? opPeMetrics.joint_score / nextHighest
        : 0;
      const cfPeVsNextRatio = cfPeMetrics && nextHighest > 0
        ? cfPeMetrics.joint_score / nextHighest
        : 0;

      const bundle: JointEvaluationBundle = {
        per_pair: perPair,
        ranked_by_joint_score: rankedByJointScore,
        op_pe_metrics: opPeMetrics,
        cf_pe_metrics: cfPeMetrics,
        max_joint_score: maxJointScore,
        next_highest_joint_score: nextHighest,
        op_pe_vs_next_ratio: opPeVsNextRatio,
        cf_pe_vs_next_ratio: cfPeVsNextRatio,
      };

      const verdict = classifyVerdict(bundle);
      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-joint-criterion-pair-evaluation',
        elapsed_ms: elapsedMs,
        focused_scope: {
          gesture_count: GESTURE_MAKERS.length,
          gesture_names: GESTURE_MAKERS.map(g => g.name),
          topk: K,
          pair_count: perPair.length,
          topology: 'mean_subtracted_topk_raw (forced_disjoint=FALSE)',
          feature_dim: HAND_FEAT_DIM,
          measurement_target:
            'joint criterion (overlap × same_sign_ratio × average_residual_magnitude) 6 pair 영역 산출 → op-pe specific signature empirical verify. 직전 6ae3a50 H_partial verdict (op-pe Jaccard=0.429 highest 영역 영역, cf-pe Jaccard=0.818 dominant) 영역 mechanism gap 영역 영역 영역 영역 영역 — joint criterion 영역 op-pe specific 영역 영역 영역 영역 confirm.',
        },
        joint_evaluation: bundle,
        hypothesis_verdict: verdict.verdict,
        verdict_evidence: verdict.evidence,
        hypothesis_details: {
          definitions: {
            H_op_pe_unique_signature:
              'op-pe joint_score 영역 영역 영역 영역 (top pair) + ratio(top/next) ≥ 2 → joint mechanism (overlap × sign × magnitude) 영역 op-pe specific bias 영역 explain. 6ae3a50 architectural bias root cause 영역 joint criterion 영역 confirm.',
            H_cf_pe_dominant_joint:
              'cf-pe joint_score 영역 영역 영역 영역 + ratio ≥ 2 → overlap-dominated joint criterion 영역 cf-pe 영역 영역 영역. 단 systematic miss 영역 영역 — op-pe 영역 영역 영역 joint score 영역 다른 mechanism (spike encoding tie / weight init) 영역 영역 (mechanism gap mandatory R&D).',
            H_distributed_signatures:
              'joint_score 영역 spread 영역 (top/next < 2×) → joint criterion 영역 op-pe specific 영역 영역 영역 — spike encoding tie-break / weight matrix init 영역 다른 architectural mechanism 별도 R&D mandatory.',
          },
          composite_formula:
            'joint_score = overlap × same_sign_ratio × average_residual_magnitude. overlap = Jaccard(cluster_active_inputs_i, cluster_active_inputs_j). same_sign_ratio = (#shared idx where sign(r_i)=sign(r_j)) / shared_count. average_residual_magnitude = mean over shared idx of (|r_i| + |r_j|) / 2.',
          threshold_rationale:
            'ratio ≥ 2× threshold 영역 "dominant signature" 영역 conservative — 6 pair (n=6) statistical power 한정 영역 영역 영역 분리 영역. Bishop 1995 Bayesian decision boundary 영역 영역 영역 영역 영역 영역 영역 magnitude weighted overlap × sign 영역 joint criterion.',
          frequentist_note:
            'verdict 영역 single-shot empirical joint_score 영역 산출 — formal hypothesis test (permutation / bootstrap) 별도 R&D. mock anatomical hand 영역 N=1 per gesture — actual MediaPipe Hand 영역 동일 signature 보장 X.',
        },
        academic_alignment: [
          'Bishop 1995 — multi-dimensional feature space + joint criterion (overlap + magnitude + sign 영역 joint Bayes decision boundary).',
          'Olshausen & Field 1996 — sparse coding magnitude weighted overlap (mean-sub residual 영역 distinctive feature 영역 magnitude scale 영역).',
          'Diehl & Cook 2015 — STDP cluster_active_inputs winner topology (topology-fixed STDP 영역 cluster_active_inputs 영역 영역 영역 영역).',
        ],
        limitations: [
          'focused scope: 4 gesture × K=10 mean-sub topology 한정 — broader gesture pool / K ∈ {5, 15, 20} 영역 별도 R&D.',
          'joint_score composite formula 영역 ad-hoc product (overlap × same_sign × avg_magnitude) — formal weighted criterion (e.g. PCA principal component / mutual information) 별도 R&D.',
          'Mean-sub residual 영역 gesture set dependent — 4 gesture mean 영역 영역 영역 영역 active inputs 영역.',
          'Spike encoding tie (winner first-cluster-wins tie-break) / weight matrix initialization (seed-dependent) 영역 다른 architectural bias mechanism 별도 R&D — 6ae3a50 영역 H_partial 영역 mechanism gap 영역 영역 영역.',
          'Mock anatomical landmarks 한정 — actual MediaPipe Hand 영역 z-depth coordinate scale 다를 가능 → 동일 joint signature 보장 X.',
          'Joint criterion 영역 n=6 (6 pair) — statistical power limited, broader gesture pool (e.g. 10 gesture × C(10,2)=45 pair) 영역 별도 R&D.',
          'joint_score_normalized 영역 max-normalized 영역 — bottom pair 영역 absolute magnitude 영역 영역 영역 영역 영역 영역 (영역 영역 영역 영역).',
          'Frequentist: hypothesis verdict 영역 single empirical ratio 영역 산출 — formal test (permutation / bootstrap) 별도 R&D.',
        ],
        cross_reference: {
          prior_cluster_active_inputs_verify: {
            test_path: 'tests/integration/hand-snn-cluster-active-inputs-verify.test.ts',
            commit: '6ae3a50',
            measurement_path: 'tests/integration/measurements/hand-snn-cluster-active-inputs-verify.json',
            note: 'op-pe Jaccard=0.429 영역 highest 영역 영역 (cf-pe Jaccard=0.818 dominant) → H_partial verdict. H_residual_sign_alignment TRUE (op-pe same_sign_ratio=1.000) 단 n=6 binomial p=0.03125 marginal. 정직 한계: "Joint hypothesis (overlap × sign alignment × magnitude) op-pe specific bias mechanism — 4×4 pair joint criterion evaluation 별도 R&D mandatory" 명시 — 본 R&D 영역 ack.',
          },
          prior_feature_only_baseline_miss: {
            test_path: 'tests/integration/hand-snn-feature-only-baseline-miss-analysis.test.ts',
            commit: 'fd66191',
            note: 'feature_only baseline 영역 open_palm → peace_sign architectural bias 15/15 instance σ-independent reproduce. 본 R&D 영역 joint criterion 영역 op-pe specific signature 영역 explain 영역 영역 가능 verify.',
          },
        },
      };
      saveMeasurement('hand-snn-joint-criterion-pair-evaluation', measurement);

      // 검증 assertion (R&D measurement — verdict 영역 영역 영역 reject 없음):
      expect(perPair).toHaveLength(6); // C(4,2) = 6 pair
      for (const p of perPair) {
        expect(p.overlap).toBeGreaterThanOrEqual(0);
        expect(p.overlap).toBeLessThanOrEqual(1);
        expect(p.same_sign_ratio).toBeGreaterThanOrEqual(0);
        expect(p.same_sign_ratio).toBeLessThanOrEqual(1);
        expect(p.joint_score).toBeGreaterThanOrEqual(0);
        expect(p.joint_score_normalized).toBeGreaterThanOrEqual(0);
        expect(p.joint_score_normalized).toBeLessThanOrEqual(1);
      }
      expect(opPeMetrics).not.toBeNull();
      expect(cfPeMetrics).not.toBeNull();
      expect([
        'H_op_pe_unique_signature',
        'H_cf_pe_dominant_joint',
        'H_distributed_signatures',
      ]).toContain(verdict.verdict);

      console.log('');
      console.log('[joint-eval] === per-pair joint metrics ===');
      for (const p of perPair) {
        console.log(
          `[joint-eval] ${p.pair_label.padEnd(26)} ` +
          `overlap=${p.overlap.toFixed(3)} ` +
          `same_sign=${p.same_sign_ratio.toFixed(3)} ` +
          `avg_mag=${p.average_residual_magnitude.toFixed(4)} ` +
          `joint=${p.joint_score.toFixed(6)} ` +
          `norm=${p.joint_score_normalized.toFixed(3)}`,
        );
      }
      console.log('');
      console.log('[joint-eval] === ranked by joint_score (descending) ===');
      for (let r = 0; r < rankedByJointScore.length; r += 1) {
        const p = rankedByJointScore[r];
        console.log(
          `[joint-eval] rank${r + 1}: ${p.pair_label.padEnd(26)} joint=${p.joint_score.toFixed(6)}`,
        );
      }
      console.log('');
      if (opPeMetrics) {
        console.log(
          `[joint-eval] op-pe: joint=${opPeMetrics.joint_score.toFixed(6)} ` +
          `(rank ${rankedByJointScore.findIndex(p => p.pair_label === 'open_palm__peace_sign') + 1}/6) ` +
          `vs_next_ratio=${opPeVsNextRatio.toFixed(3)}`,
        );
      }
      if (cfPeMetrics) {
        console.log(
          `[joint-eval] cf-pe: joint=${cfPeMetrics.joint_score.toFixed(6)} ` +
          `(rank ${rankedByJointScore.findIndex(p => p.pair_label === 'closed_fist__peace_sign') + 1}/6) ` +
          `vs_next_ratio=${cfPeVsNextRatio.toFixed(3)}`,
        );
      }
      console.log('');
      console.log(`[joint-eval] verdict=${verdict.verdict}`);
      console.log(`[joint-eval] evidence: ${verdict.evidence}`);
      console.log(`[joint-eval] elapsed_ms=${elapsedMs}`);
      console.log('[joint-eval] frequentist: empirical joint_score ratio only — formal test 별도 R&D.');
    },
  );
});
