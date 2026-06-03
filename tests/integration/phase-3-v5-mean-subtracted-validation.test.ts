// Phase 3.9 v5 incremental mean-subtracted top-K 검증 (2026-06-03).
//
// 사용자 catch: "사용자가 아무것도 안할 수 있도록".
//
// 본 test는 실제 MediaPipe 가 추출한 landmarks (captured via Playwright,
// tests/integration/fixtures/hand-mediapipe-*.json) 를 input으로 사용하여
// v5 알고리즘이 실제로 discriminative cluster templates를 생성하는지 검증.
//
// 직전 분석 (scripts/analyze-real-mediapipe-landmarks.mjs):
//   stick figure 4 poses 모두 plain top-K=5 = [84,85,86,87,88] 동일
//   pairwise Jaccard = 1.000 (= no discrimination)
//
// v5 가설:
//   incremental mean-subtraction 이 magnitude-dominant features를 자동 배제
//   하고 각 자세의 distinctive features를 추출 → 다른 cluster templates.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  encodeHandToFeatureVector,
  HAND_FEAT_DIM,
  HAND_SPARSE_TOP_K_DEFAULT,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

const POSES = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'] as const;
type Pose = typeof POSES[number];

function loadFixture(pose: Pose): HandLandmark[][] {
  const path = resolve(__dirname, 'fixtures', `hand-mediapipe-${pose}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks;
}

// v5 algorithm: incremental mean-subtracted unclaimed top-K.
// 첫 cluster: plain top-K (mean === null)
// 추가 cluster: |feat - mean| top-K from features NOT in claimed set.
function v5Spawn(
  feat: number[],
  claimed: Set<number>,
  mean: number[] | null,
  K: number,
): number[] {
  const useMean = mean !== null;
  const pairs: Array<{ idx: number; score: number }> = [];
  for (let i = 0; i < feat.length; i += 1) {
    const score = useMean ? Math.abs(feat[i] - mean![i]) : feat[i];
    pairs.push({ idx: i, score });
  }
  pairs.sort((a, b) => b.score - a.score);
  const result: number[] = [];
  for (const p of pairs) {
    if (result.length >= K) break;
    if (!claimed.has(p.idx)) result.push(p.idx);
  }
  return result.sort((a, b) => a - b);
}

// Welford incremental mean update.
function updateMean(currentMean: number[] | null, count: number, feat: number[]): number[] {
  if (currentMean === null) return feat.slice();
  const next = currentMean.slice();
  const newCount = count + 1;
  for (let i = 0; i < next.length; i += 1) {
    next[i] += (feat[i] - next[i]) / newCount;
  }
  return next;
}

describe('Phase 3.9 v5 mean-subtracted top-K — real MediaPipe captured landmarks', () => {
  it('★ v5 incremental algorithm — 4 poses → distinct cluster templates?', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // 각 자세의 첫 번째 landmark sample → feature vector.
    const features = POSES.map((pose) => {
      const lm = fixtures[pose][0];
      return encodeHandToFeatureVector(lm);
    });
    expect(features[0]).toHaveLength(HAND_FEAT_DIM);

    // v5 시뮬레이션 — 순차적으로 4 poses 학습.
    let mean: number[] | null = null;
    let count = 0;
    const claimed = new Set<number>();
    const clusters: number[][] = [];

    console.log('');
    console.log('=== v5 incremental mean-subtracted top-K simulation ===');
    console.log('');
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = features[i];
      const cluster = v5Spawn(feat, claimed, mean, HAND_SPARSE_TOP_K_DEFAULT);
      clusters.push(cluster);
      for (const idx of cluster) claimed.add(idx);
      mean = updateMean(mean, count, feat);
      count += 1;
      const useMean = i > 0;
      console.log(`  cluster ${i} (${POSES[i]}):`);
      console.log(`    method: ${useMean ? 'mean-subtracted |feat-mean|' : 'plain magnitude (first cluster)'}`);
      console.log(`    activeInputs: [${cluster.join(',')}]`);
    }

    // Verify clusters have distinct features (each unique, no overlap thanks to claimed).
    const allFeatures: number[] = [];
    for (const c of clusters) allFeatures.push(...c);
    const uniqueCount = new Set(allFeatures).size;
    console.log('');
    console.log(`  total claimed features: ${allFeatures.length}`);
    console.log(`  unique features: ${uniqueCount}`);
    console.log(`  disjoint: ${uniqueCount === allFeatures.length ? '✓' : '✗'}`);
    console.log('');

    expect(uniqueCount).toBe(allFeatures.length); // All disjoint by design.

    // Verify v5 cluster 1+ chose different feature sets than v2 (which only used claimed-filter).
    // For mean-subtracted, cluster 1's score basis = |feat₁ - mean(feat₀)| → 다른 indices 선택 가능.
    console.log('  comparison: each cluster picks different "score top" features:');
    for (let i = 0; i < clusters.length; i += 1) {
      console.log(`    ${POSES[i]}: top-K=5 indices = [${clusters[i].join(',')}]`);
    }
    console.log('');
  });

  it('★ Inference: 같은 자세 다시 → 어느 cluster 와 Jaccard 가장 큰가?', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // 4 cluster trained (sample 0 of each pose).
    let mean: number[] | null = null;
    let count = 0;
    const claimed = new Set<number>();
    const clusters: number[][] = [];
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      const cluster = v5Spawn(feat, claimed, mean, HAND_SPARSE_TOP_K_DEFAULT);
      clusters.push(cluster);
      for (const idx of cluster) claimed.add(idx);
      mean = updateMean(mean, count, feat);
      count += 1;
    }

    // Inference: 각 자세의 sample 1+ (additional captures) 로 어느 cluster 와 best match.
    console.log('');
    console.log('=== Inference simulation — same gesture, additional samples ===');
    console.log('');
    for (let i = 0; i < POSES.length; i += 1) {
      const pose = POSES[i];
      for (let s = 1; s < fixtures[pose].length; s += 1) {
        // Worker activeIdx = top-K=5 of input (plain, post-v3 dispatchComputeFeature sparsify).
        const feat = encodeHandToFeatureVector(fixtures[pose][s]);
        const inputTopK = feat
          .map((v, idx) => ({ idx, val: v }))
          .sort((a, b) => b.val - a.val)
          .slice(0, HAND_SPARSE_TOP_K_DEFAULT)
          .map((p) => p.idx)
          .sort((a, b) => a - b);
        // Compute Jaccard vs each cluster template.
        const jaccards: Array<{ cluster: number; jac: number }> = [];
        for (let c = 0; c < clusters.length; c += 1) {
          const ts = new Set(clusters[c]);
          let inter = 0;
          for (const idx of inputTopK) if (ts.has(idx)) inter += 1;
          const union = inputTopK.length + clusters[c].length - inter;
          const jac = union > 0 ? inter / union : 0;
          jaccards.push({ cluster: c, jac });
        }
        jaccards.sort((a, b) => b.jac - a.jac);
        const winner = jaccards[0];
        const correctMatch = winner.cluster === i;
        console.log(`  ${pose} sample ${s}: input top-K=[${inputTopK.join(',')}]`);
        console.log(`    best match: cluster ${winner.cluster} (Jaccard=${winner.jac.toFixed(3)}) ${correctMatch ? '✓' : '✗ (expected '+i+')'}`);
      }
    }
    console.log('');
  });
});
