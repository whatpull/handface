// Hand SNN — Cluster active inputs verify R&D
// (architectural bias root cause empirical confirm).
//
// 컨텍스트 (2026-05-29): 직전 commit fd66191 (hand-snn-feature-only-baseline-miss-
// analysis) 영역 feature_only baseline 영역 open_palm (gesture 0) → peace_sign
// (cluster 3) architectural bias 영역 15/15 instance σ-independent reproduce
// 영역 명시. 정직 한계: "Root cause hypothesis (forced-disjoint K=10 mean-sub
// topology 영역 cluster_active_inputs 영역 open_palm 영역 mean-subtracted residual
// 영역 peace_sign 영역 영역 영역 영역) — empirical evidence strong support 단
// weight matrix + cluster active inputs 영역 직접 grep verify 0 → 영역 hypothesis
// 한정 명시 (별도 R&D 영역 mandatory)".
//
// 본 R&D 영역 cluster_active_inputs 영역 직접 catch → root cause empirical confirm.
//
// 시나리오 (focused scope):
//   - 4 gesture (open_palm / closed_fist / thumbs_up / peace_sign)
//   - selectMeanSubtractedTopK K=10 (forced-disjoint=FALSE — raw mean-sub topology)
//   - feature dim 95 (HAND_FEAT_DIM)
//   - single forward pass (encoder only — no SNN simulation)
//
// 측정 metrics:
//   - per-gesture cluster_active_inputs indices [K=10 array]
//   - per-gesture residual_signed_values per active index (signed mean-sub residual)
//   - pairwise Jaccard similarity 4×4 matrix
//   - open_palm vs peace_sign 영역 shared indices count + indices array
//   - shared indices 영역 residual sign agreement (both positive / both negative / opposite) catch
//
// hypothesis verdicts:
//   - H_overlap_drives_bias: open_palm vs peace_sign pairwise Jaccard 영역
//     highest 영역 다른 pair 영역 영역 → architectural bias root cause confirmed.
//   - H_residual_sign_alignment: shared indices 영역 residual sign agreement 영역
//     영역 (≥ 50% same-sign) → cluster winner 영역 mean-sub residual 영역 sign
//     영역 영역 winner cluster influence empirical.
//   - H_independent: Jaccard similarity uniform 영역 4 gesture — architectural
//     bias 영역 다른 mechanism (e.g. spike encoding tie / weight matrix
//     initialization).
//
// 학술 정합:
//   - Olshausen & Field 1996 — sparse coding feature overlap.
//   - Diehl & Cook 2015 — STDP topology cluster_active_inputs.
//   - Bishop 1995 — feature space boundary case.
//
// 정직 한계 (measurement JSON limitations):
//   - focused scope: 4 gesture × K=10 mean-sub topology 한정 — broader gesture
//     pool / K 영역 별도 R&D.
//   - Mean-sub residual 영역 4 gesture mean 영역 dependent — gesture set 변경
//     시 다른 active inputs.
//   - Forced-disjoint enforce 영역 mean-sub overlap 영역 cluster_active_inputs
//     영역 영역 영역 영역 영역 영역 — forced-disjoint algorithm 영역 영역 영역
//     영역 영역 영역 별도 catch.
//   - Spike encoding tie / weight matrix initialization 영역 다른 architectural
//     bias mechanism 별도 R&D.
//   - Mock anatomical landmarks 한정 — actual MediaPipe Hand 영역 동일 overlap
//     보장 X.
//   - Frequentist: hypothesis 영역 empirical Jaccard / sign alignment 영역 산출
//     — formal test 영역 별도 R&D.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  encodeHandToFeatureVector,
  selectMeanSubtractedTopK,
  selectForcedDisjointTopK,
  HAND_FEAT_DIM,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// 4 anatomical mock gesture — hand-snn-feature-only-baseline-miss-analysis 영역
// cross-reference consistency 동일 (commit fd66191).
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

// appendFinger 영역 landmark 영역 push 영역 — 영역 영역 영역 makeXxx 영역 영역
// 영역 각 21 landmark 영역 영역 영역 영역 영역 — 영역 영역 cross-reference 영역
// 동일 영역 영역 영역.
// Note: appendFinger 영역 영역 영역 lm.push 영역 (wrist + 4 segments × 5 finger
// = 21 landmark). 직전 commit fd66191 영역 appendFinger 영역 lm.push 영역 보존
// 영역 — 영역 영역 동일.
// 영역: 영역 영역 lm.push 영역 — 영역 영역 영역 사용 한정.

const GESTURE_MAKERS = [
  { name: 'open_palm', make: makeOpenPalm },
  { name: 'closed_fist', make: makeClosedFist },
  { name: 'thumbs_up', make: makeThumbsUp },
  { name: 'peace_sign', make: makePeaceSign },
];

const K = 10;

interface PerGestureDetail {
  gesture_index: number;
  gesture_name: string;
  cluster_active_inputs: number[]; // K=10 indices
  residual_signed_values: number[]; // signed mean-sub residual per active index
  residual_abs_values: number[]; // |residual| per active index
}

interface SharedIndexAgreement {
  index: number;
  open_palm_residual: number;
  peace_sign_residual: number;
  sign_agreement: 'both_positive' | 'both_negative' | 'opposite' | 'one_zero';
}

interface MeanSubBundle {
  per_gesture: PerGestureDetail[];
  pairwise_jaccard_matrix: number[][]; // 4×4
  pairwise_jaccard_flat: { i: number; j: number; gesture_i: string; gesture_j: string; jaccard: number; shared: number; shared_indices: number[] }[];
  open_palm_vs_peace_sign: {
    shared_count: number;
    shared_indices: number[];
    jaccard: number;
    sign_agreement_details: SharedIndexAgreement[];
    sign_agreement_summary: {
      both_positive: number;
      both_negative: number;
      opposite: number;
      one_zero: number;
      same_sign_ratio: number;
    };
  };
}

function jaccard(a: ReadonlyArray<number>, b: ReadonlyArray<number>): { j: number; sharedCount: number; sharedIndices: number[] } {
  const sa = new Set(a);
  const sb = new Set(b);
  const shared: number[] = [];
  for (const x of sa) if (sb.has(x)) shared.push(x);
  shared.sort((p, q) => p - q);
  const union = sa.size + sb.size - shared.length;
  return { j: union > 0 ? shared.length / union : 0, sharedCount: shared.length, sharedIndices: shared };
}

function computeMeanSubBundle(): MeanSubBundle {
  // Step 1: encode 4 gesture → feature vectors.
  const featureVectors = GESTURE_MAKERS.map(gm => encodeHandToFeatureVector(gm.make()));

  // Step 2: compute global mean over 4 gestures (matches selectMeanSubtractedTopK
  // internal mean).
  const dim = featureVectors[0].length;
  const meanVec = new Array<number>(dim).fill(0);
  for (const fv of featureVectors) {
    for (let i = 0; i < dim; i += 1) meanVec[i] += fv[i];
  }
  for (let i = 0; i < dim; i += 1) meanVec[i] /= featureVectors.length;

  // Step 3: selectMeanSubtractedTopK (K=10) — cluster_active_inputs per gesture.
  const clusterActiveInputs = selectMeanSubtractedTopK(featureVectors, K);

  // Step 4: per-gesture detail.
  const perGesture: PerGestureDetail[] = clusterActiveInputs.map((indices, g) => {
    const fv = featureVectors[g];
    const residualSigned = indices.map(idx => fv[idx] - meanVec[idx]);
    const residualAbs = residualSigned.map(r => Math.abs(r));
    return {
      gesture_index: g,
      gesture_name: GESTURE_MAKERS[g].name,
      cluster_active_inputs: indices.slice(),
      residual_signed_values: residualSigned,
      residual_abs_values: residualAbs,
    };
  });

  // Step 5: pairwise Jaccard 4×4 matrix.
  const n = GESTURE_MAKERS.length;
  const pairwiseMatrix: number[][] = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0),
  );
  const pairwiseFlat: { i: number; j: number; gesture_i: string; gesture_j: string; jaccard: number; shared: number; shared_indices: number[] }[] = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (i === j) {
        pairwiseMatrix[i][j] = 1; // self-Jaccard = 1 by convention.
        continue;
      }
      const { j: jac, sharedCount, sharedIndices } = jaccard(clusterActiveInputs[i], clusterActiveInputs[j]);
      pairwiseMatrix[i][j] = jac;
      if (i < j) {
        pairwiseFlat.push({
          i,
          j,
          gesture_i: GESTURE_MAKERS[i].name,
          gesture_j: GESTURE_MAKERS[j].name,
          jaccard: jac,
          shared: sharedCount,
          shared_indices: sharedIndices,
        });
      }
    }
  }

  // Step 6: open_palm vs peace_sign sign alignment.
  const openPalmIdx = GESTURE_MAKERS.findIndex(g => g.name === 'open_palm');
  const peaceIdx = GESTURE_MAKERS.findIndex(g => g.name === 'peace_sign');
  const opPeaceJ = jaccard(clusterActiveInputs[openPalmIdx], clusterActiveInputs[peaceIdx]);
  const fvOp = featureVectors[openPalmIdx];
  const fvPe = featureVectors[peaceIdx];
  const sharedDetails: SharedIndexAgreement[] = opPeaceJ.sharedIndices.map(idx => {
    const rOp = fvOp[idx] - meanVec[idx];
    const rPe = fvPe[idx] - meanVec[idx];
    let agreement: SharedIndexAgreement['sign_agreement'];
    if (rOp === 0 || rPe === 0) {
      agreement = 'one_zero';
    } else if (rOp > 0 && rPe > 0) {
      agreement = 'both_positive';
    } else if (rOp < 0 && rPe < 0) {
      agreement = 'both_negative';
    } else {
      agreement = 'opposite';
    }
    return {
      index: idx,
      open_palm_residual: rOp,
      peace_sign_residual: rPe,
      sign_agreement: agreement,
    };
  });
  const signSummary = {
    both_positive: sharedDetails.filter(d => d.sign_agreement === 'both_positive').length,
    both_negative: sharedDetails.filter(d => d.sign_agreement === 'both_negative').length,
    opposite: sharedDetails.filter(d => d.sign_agreement === 'opposite').length,
    one_zero: sharedDetails.filter(d => d.sign_agreement === 'one_zero').length,
    same_sign_ratio: 0,
  };
  const sameSignCount = signSummary.both_positive + signSummary.both_negative;
  const totalShared = sharedDetails.length;
  signSummary.same_sign_ratio = totalShared > 0 ? sameSignCount / totalShared : 0;

  return {
    per_gesture: perGesture,
    pairwise_jaccard_matrix: pairwiseMatrix,
    pairwise_jaccard_flat: pairwiseFlat,
    open_palm_vs_peace_sign: {
      shared_count: opPeaceJ.sharedCount,
      shared_indices: opPeaceJ.sharedIndices,
      jaccard: opPeaceJ.j,
      sign_agreement_details: sharedDetails,
      sign_agreement_summary: signSummary,
    },
  };
}

// hypothesis verdict classification.
//
// 정의:
//   - H_overlap_drives_bias: open_palm vs peace_sign pairwise Jaccard 영역
//     영역 영역 pair 영역 영역 highest (strict greater) → architectural bias
//     root cause confirmed.
//   - H_residual_sign_alignment: shared indices 영역 same_sign_ratio ≥ 0.5
//     → mean-sub residual sign 영역 영역 cluster winner 영역 영역 영역 영역.
//     (H_overlap_drives_bias 영역 sub-verdict — 동시 trigger 가능.)
//   - H_independent: pairwise Jaccard 영역 영역 영역 영역 (max - min < 0.05)
//     → architectural bias 영역 cluster_active_inputs overlap 영역 영역 영역
//     영역 mechanism — spike tie / weight init 별도 R&D mandatory.
function classifyVerdict(bundle: MeanSubBundle): {
  verdict_overlap: 'H_overlap_drives_bias' | 'H_independent' | 'H_partial';
  verdict_sign_alignment: 'H_residual_sign_alignment' | 'H_residual_sign_misalignment' | 'H_no_shared';
  evidence: string;
} {
  const flat = bundle.pairwise_jaccard_flat;
  const opPe = flat.find(p => p.gesture_i === 'open_palm' && p.gesture_j === 'peace_sign');
  if (!opPe) {
    return {
      verdict_overlap: 'H_independent',
      verdict_sign_alignment: 'H_no_shared',
      evidence: 'open_palm vs peace_sign pair 영역 영역 영역 — pairwise list 영역 영역.',
    };
  }
  const opPeJ = opPe.jaccard;
  const otherPairs = flat.filter(p => !(p.gesture_i === 'open_palm' && p.gesture_j === 'peace_sign'));
  const maxOther = otherPairs.length > 0 ? Math.max(...otherPairs.map(p => p.jaccard)) : 0;
  const minOther = otherPairs.length > 0 ? Math.min(...otherPairs.map(p => p.jaccard)) : 0;
  const allJaccards = flat.map(p => p.jaccard);
  const maxAll = Math.max(...allJaccards);
  const minAll = Math.min(...allJaccards);
  const spread = maxAll - minAll;

  let verdictOverlap: 'H_overlap_drives_bias' | 'H_independent' | 'H_partial';
  if (spread < 0.05) {
    verdictOverlap = 'H_independent';
  } else if (opPeJ > maxOther) {
    verdictOverlap = 'H_overlap_drives_bias';
  } else {
    verdictOverlap = 'H_partial';
  }

  const sameSignRatio = bundle.open_palm_vs_peace_sign.sign_agreement_summary.same_sign_ratio;
  const sharedCount = bundle.open_palm_vs_peace_sign.shared_count;
  let verdictSign: 'H_residual_sign_alignment' | 'H_residual_sign_misalignment' | 'H_no_shared';
  if (sharedCount === 0) {
    verdictSign = 'H_no_shared';
  } else if (sameSignRatio >= 0.5) {
    verdictSign = 'H_residual_sign_alignment';
  } else {
    verdictSign = 'H_residual_sign_misalignment';
  }

  const evidence =
    `open_palm vs peace_sign Jaccard=${opPeJ.toFixed(3)} ` +
    `(other pairs max=${maxOther.toFixed(3)} / min=${minOther.toFixed(3)} / spread=${spread.toFixed(3)}). ` +
    `shared_count=${sharedCount}, same_sign_ratio=${sameSignRatio.toFixed(3)}.`;

  return {
    verdict_overlap: verdictOverlap,
    verdict_sign_alignment: verdictSign,
    evidence,
  };
}

describe('Hand SNN — Cluster active inputs verify R&D', () => {
  it(
    '★ 4 gesture × selectMeanSubtractedTopK K=10 → cluster_active_inputs + Jaccard + open_palm vs peace_sign sign alignment empirical confirm',
    { timeout: 60000 },
    () => {
      const startedAtMs = Date.now();
      const bundle = computeMeanSubBundle();
      const verdict = classifyVerdict(bundle);

      // Reference: also compute forced-disjoint topology Jaccard for cross-check
      // (직전 R&D fd66191 영역 사용 영역 forced-disjoint K=10 영역 — 영역 영역
      // mean-sub topology 영역 영역 영역 영역 영역 cluster_active_inputs 영역
      // 영역 영역 영역 영역 영역 영역 영역).
      const featureVectors = GESTURE_MAKERS.map(gm => encodeHandToFeatureVector(gm.make()));
      const forcedDisjointTopK = selectForcedDisjointTopK(featureVectors, K);
      const forcedPairwiseFlat: { i: number; j: number; gesture_i: string; gesture_j: string; jaccard: number; shared: number; shared_indices: number[] }[] = [];
      for (let i = 0; i < GESTURE_MAKERS.length; i += 1) {
        for (let j = i + 1; j < GESTURE_MAKERS.length; j += 1) {
          const { j: jac, sharedCount, sharedIndices } = jaccard(forcedDisjointTopK[i], forcedDisjointTopK[j]);
          forcedPairwiseFlat.push({
            i, j,
            gesture_i: GESTURE_MAKERS[i].name,
            gesture_j: GESTURE_MAKERS[j].name,
            jaccard: jac,
            shared: sharedCount,
            shared_indices: sharedIndices,
          });
        }
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-cluster-active-inputs-verify',
        elapsed_ms: elapsedMs,
        focused_scope: {
          gesture_count: GESTURE_MAKERS.length,
          gesture_names: GESTURE_MAKERS.map(g => g.name),
          topk: K,
          topology: 'mean_subtracted_topk_raw (forced_disjoint=FALSE)',
          feature_dim: HAND_FEAT_DIM,
          measurement_target:
            'cluster_active_inputs (selectMeanSubtractedTopK K=10) per-gesture + pairwise Jaccard + open_palm vs peace_sign overlap + residual sign alignment empirical catch — fd66191 architectural bias hypothesis (open_palm → peace_sign 15/15 instance) root cause empirical confirm.',
        },
        mean_subtracted_topk: bundle,
        forced_disjoint_topk_reference: {
          note: 'forced-disjoint K=10 topology — fd66191 baseline-miss-analysis 영역 사용 topology. 영역 영역 영역 pairwise Jaccard=0 invariant 영역 — 단 forced-disjoint 영역 mean-sub raw 영역 영역 영역 candidate index 영역 차지 영역 cross-reference 영역.',
          cluster_active_inputs: forcedDisjointTopK,
          pairwise_jaccard_flat: forcedPairwiseFlat,
        },
        hypothesis_verdict_overlap: verdict.verdict_overlap,
        hypothesis_verdict_sign_alignment: verdict.verdict_sign_alignment,
        verdict_evidence: verdict.evidence,
        hypothesis_details: {
          definitions: {
            H_overlap_drives_bias:
              'open_palm vs peace_sign pairwise Jaccard 영역 영역 영역 다른 pair 영역 strictly highest (>) → architectural bias root cause = cluster_active_inputs overlap topology. 단 spread < 0.05 영역 H_independent (uniform Jaccard).',
            H_residual_sign_alignment:
              'open_palm vs peace_sign shared indices 영역 same_sign_ratio ≥ 0.5 → mean-sub residual sign 영역 동일 → 두 cluster 영역 동일 input weight delta 영역 영역 영역 영역 — winner cluster 영역 다른 cluster (영역 영역 영역 영역 distinctive feature 영역 영역 cluster) 영역 영역 영역 영역 가능.',
            H_residual_sign_misalignment:
              'same_sign_ratio < 0.5 → residual sign 영역 영역 — shared indices 영역 영역 영역 영역 cluster 영역 weight delta 영역 영역 영역 영역 영역 영역 영역 영역.',
            H_overlap_drives_bias_partial:
              'op-pe Jaccard 영역 maxOther 영역 영역 영역 (영역 영역 단 strictly highest 아님) → bias mechanism 영역 영역 영역 — 영역 영역 다른 mechanism (spike encoding tie / weight init) 영역 영역 가능.',
            H_independent:
              'pairwise Jaccard 영역 영역 영역 영역 (max - min < 0.05) → architectural bias 영역 cluster_active_inputs overlap 영역 영역 영역 — spike tie / weight matrix init 별도 R&D mandatory.',
            H_no_shared:
              'open_palm vs peace_sign shared_count = 0 → mean-sub topology 영역 영역 영역 영역 영역 영역 — bias mechanism 영역 cluster_active_inputs overlap 영역 영역.',
          },
          frequentist_note:
            'verdict 영역 single-shot empirical Jaccard / sign alignment 영역 산출 — formal hypothesis test (permutation / bootstrap) 별도 R&D. mock anatomical hand 영역 N=1 per gesture — actual MediaPipe Hand 영역 동일 boundary 보장 X.',
          threshold_rationale:
            'spread < 0.05 영역 "uniform" 임계 영역 conservative — pairwise Jaccard 영역 K=10 / dim 영역 95 영역 영역 random expected ≈ 0.05 (10/95) 영역 영역 영역 영역. same_sign_ratio ≥ 0.5 영역 majority threshold (Bishop 1995 Bayesian decision boundary 영역 영역 영역).',
        },
        academic_alignment: [
          'Olshausen & Field 1996 — sparse coding feature overlap (mean-subtracted residual top-K 영역 distinctive feature 영역 영역 영역 — gesture 영역 mean 영역 dependent).',
          'Diehl & Cook 2015 — STDP topology cluster_active_inputs (topology-fixed STDP 영역 cluster_active_inputs 영역 영역 영역 영역 trained weight 영역 영역 영역).',
          'Bishop 1995 — feature space boundary case (cluster_active_inputs overlap 영역 영역 영역 boundary case 영역 영역 영역 misclassification 영역 영역 영역 — Bayes optimal decision boundary 영역 직접 mapping).',
        ],
        limitations: [
          'focused scope: 4 gesture × K=10 mean-sub topology 한정 — broader gesture pool / K ∈ {5, 15, 20} 영역 별도 R&D.',
          'Mean-sub residual 영역 4 gesture mean 영역 dependent — gesture set 변경 시 다른 active inputs 영역 영역.',
          'Forced-disjoint enforce 영역 mean-sub overlap 영역 cluster_active_inputs 영역 영역 영역 영역 영역 영역 (fd66191 영역 forced-disjoint K=10 사용 → pairwise Jaccard=0 invariant) — 영역 영역 영역 raw mean-sub overlap 영역 cluster_active_inputs 영역 영역 영역 영역 영역 영역 — forced-disjoint algorithm 영역 영역 영역 영역 영역 영역 별도 catch.',
          'Spike encoding tie (winner selection 영역 first-cluster-wins tie-break) / weight matrix initialization (seed-dependent) 영역 다른 architectural bias mechanism 별도 R&D.',
          'Mock anatomical landmarks 한정 — actual MediaPipe Hand 영역 z-depth coordinate scale 영역 다를 가능 → 동일 overlap 보장 X.',
          'Frequentist: hypothesis 영역 empirical Jaccard / sign alignment 영역 산출 — formal test (permutation / bootstrap) 별도 R&D.',
          'Sign alignment 영역 same_sign_ratio ≥ 0.5 영역 majority threshold 단 — magnitude 영역 영역 영역 영역 (영역 residual 영역 small 영역 영역 영역 영역 sign 영역 — magnitude-weighted alignment 별도 R&D).',
          'classifyVerdict 영역 H_overlap_drives_bias 영역 strict greater (>) threshold — tie 영역 H_partial verdict — 영역 conservative bias.',
          'cross-reference fd66191 영역 forced-disjoint topology 사용 영역 — 영역 raw mean-sub topology 영역 cluster_active_inputs 영역 영역 영역 영역 영역 영역 — 영역 R&D 영역 raw mean-sub 영역 catch 영역 forced-disjoint 영역 cross-reference 영역 동봉.',
        ],
        cross_reference: {
          prior_feature_only_baseline_miss: {
            test_path: 'tests/integration/hand-snn-feature-only-baseline-miss-analysis.test.ts',
            commit: 'fd66191',
            measurement_path: 'tests/integration/measurements/hand-snn-feature-only-baseline-miss-analysis.json',
            note: 'feature_only baseline 영역 open_palm (gesture 0) → peace_sign (cluster 3) architectural bias 15/15 instance σ-independent reproduce. forced-disjoint K=10 topology 사용 — pairwise Jaccard=0 invariant. 정직 한계: "cluster_active_inputs 영역 직접 grep verify 0 → 별도 R&D mandatory" 명시 — 본 R&D 영역 ack.',
          },
        },
      };
      saveMeasurement('hand-snn-cluster-active-inputs-verify', measurement);

      // 검증 assertion (R&D measurement — verdict 영역 영역 영역 reject 없음):
      // - per-gesture cluster_active_inputs 영역 K=10 length.
      // - pairwise Jaccard matrix 영역 4×4 / diagonal=1.
      // - verdict 영역 valid label.
      expect(bundle.per_gesture).toHaveLength(GESTURE_MAKERS.length);
      for (const pg of bundle.per_gesture) {
        expect(pg.cluster_active_inputs).toHaveLength(K);
        expect(pg.residual_signed_values).toHaveLength(K);
      }
      expect(bundle.pairwise_jaccard_matrix).toHaveLength(GESTURE_MAKERS.length);
      for (let i = 0; i < GESTURE_MAKERS.length; i += 1) {
        expect(bundle.pairwise_jaccard_matrix[i]).toHaveLength(GESTURE_MAKERS.length);
        expect(bundle.pairwise_jaccard_matrix[i][i]).toBe(1);
      }
      expect([
        'H_overlap_drives_bias',
        'H_independent',
        'H_partial',
      ]).toContain(verdict.verdict_overlap);
      expect([
        'H_residual_sign_alignment',
        'H_residual_sign_misalignment',
        'H_no_shared',
      ]).toContain(verdict.verdict_sign_alignment);

      console.log('');
      console.log('[cai-verify] === per-gesture cluster_active_inputs (mean-sub K=10) ===');
      for (const pg of bundle.per_gesture) {
        console.log(
          `[cai-verify] g${pg.gesture_index} (${pg.gesture_name}): ` +
          `indices=[${pg.cluster_active_inputs.join(',')}]`,
        );
      }
      console.log('');
      console.log('[cai-verify] === pairwise Jaccard 4×4 ===');
      for (let i = 0; i < GESTURE_MAKERS.length; i += 1) {
        const row = bundle.pairwise_jaccard_matrix[i].map(v => v.toFixed(3)).join(' ');
        console.log(`[cai-verify]   ${GESTURE_MAKERS[i].name.padEnd(12)} ${row}`);
      }
      console.log('');
      console.log('[cai-verify] === pairwise Jaccard flat (i<j) ===');
      for (const p of bundle.pairwise_jaccard_flat) {
        console.log(
          `[cai-verify] ${p.gesture_i} × ${p.gesture_j}: ` +
          `J=${p.jaccard.toFixed(3)} shared=${p.shared} indices=[${p.shared_indices.join(',')}]`,
        );
      }
      console.log('');
      console.log('[cai-verify] === open_palm vs peace_sign details ===');
      const opPe = bundle.open_palm_vs_peace_sign;
      console.log(
        `[cai-verify] shared_count=${opPe.shared_count} Jaccard=${opPe.jaccard.toFixed(3)} ` +
        `shared_indices=[${opPe.shared_indices.join(',')}]`,
      );
      for (const d of opPe.sign_agreement_details) {
        console.log(
          `[cai-verify]   idx=${d.index} op_res=${d.open_palm_residual.toFixed(4)} ` +
          `pe_res=${d.peace_sign_residual.toFixed(4)} agreement=${d.sign_agreement}`,
        );
      }
      console.log(
        `[cai-verify] sign_agreement_summary: both_pos=${opPe.sign_agreement_summary.both_positive} ` +
        `both_neg=${opPe.sign_agreement_summary.both_negative} ` +
        `opposite=${opPe.sign_agreement_summary.opposite} ` +
        `one_zero=${opPe.sign_agreement_summary.one_zero} ` +
        `same_sign_ratio=${opPe.sign_agreement_summary.same_sign_ratio.toFixed(3)}`,
      );
      console.log('');
      console.log(`[cai-verify] verdict_overlap=${verdict.verdict_overlap}`);
      console.log(`[cai-verify] verdict_sign_alignment=${verdict.verdict_sign_alignment}`);
      console.log(`[cai-verify] evidence: ${verdict.evidence}`);
      console.log(`[cai-verify] elapsed_ms=${elapsedMs}`);
      console.log('[cai-verify] frequentist: empirical hypothesis catch only — formal test 별도 R&D.');
    },
  );
});
