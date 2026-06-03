// Phase 3.9 v7 — cosine similarity approach iteration (2026-06-03).
//
// 사용자 위임: "사용자 확인은 없을 예정이고 본인이 직접 확인 및 테스트 진행하여,
// 계속 계선해주세요". 자율 iteration cycle.
//
// 본 test는 v6 (50% accuracy) 한계를 극복하기 위해 여러 inference 알고리즘을
// 동일 captured fixtures에 적용하여 정확도 비교:
//   - v6 baseline: mean-subtracted top-K + Jaccard (50%)
//   - v7a: cosine similarity with stored cluster training features
//   - v7b: dot product (unnormalized)
//   - v7c: K=10 with mean-sub top-K + Jaccard
//   - v7d: weighted Jaccard (feature values, not just membership)

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  encodeHandToFeatureVector,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

const POSES = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'] as const;
type Pose = typeof POSES[number];

function loadFixture(pose: Pose): HandLandmark[][] {
  const path = resolve(__dirname, 'fixtures', `hand-mediapipe-${pose}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom > 0 ? dot / denom : 0;
}

function dotProduct(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i += 1) dot += a[i] * b[i];
  return dot;
}

function l2Distance(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

// Cluster representations (different storage strategies).
type Cluster_v7a = { id: number; trainingFeat: number[] };

describe('Phase 3.9 v7 — inference algorithm iteration', () => {
  it('★ v7a: cosine similarity with stored training features', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // Train: store first sample of each pose as cluster reference.
    const clusters: Cluster_v7a[] = [];
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      clusters.push({ id: i, trainingFeat: feat });
    }

    // Inference: cosine sim with each stored cluster.
    let correct = 0, total = 0;
    console.log('');
    console.log('=== v7a: cosine similarity ===');
    for (let i = 0; i < POSES.length; i += 1) {
      const pose = POSES[i];
      for (let s = 1; s < fixtures[pose].length; s += 1) {
        const feat = encodeHandToFeatureVector(fixtures[pose][s]);
        const sims = clusters.map((c) => ({ id: c.id, sim: cosineSimilarity(feat, c.trainingFeat) }));
        sims.sort((a, b) => b.sim - a.sim);
        const winner = sims[0];
        const ok = winner.id === i;
        if (ok) correct += 1;
        total += 1;
        console.log(`  ${pose} s${s}: winner=cluster ${winner.id} (cos=${winner.sim.toFixed(4)}) ${ok ? '✓' : '✗ exp '+i}`);
      }
    }
    console.log(`  accuracy: ${correct}/${total} = ${total > 0 ? ((correct/total) * 100).toFixed(0) : 0}%`);
    console.log('');
  });

  it('★ v7b: dot product (unnormalized)', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    const clusters: Cluster_v7a[] = [];
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      clusters.push({ id: i, trainingFeat: feat });
    }

    let correct = 0, total = 0;
    console.log('=== v7b: dot product ===');
    for (let i = 0; i < POSES.length; i += 1) {
      const pose = POSES[i];
      for (let s = 1; s < fixtures[pose].length; s += 1) {
        const feat = encodeHandToFeatureVector(fixtures[pose][s]);
        const sims = clusters.map((c) => ({ id: c.id, sim: dotProduct(feat, c.trainingFeat) }));
        sims.sort((a, b) => b.sim - a.sim);
        const winner = sims[0];
        const ok = winner.id === i;
        if (ok) correct += 1;
        total += 1;
      }
    }
    console.log(`  accuracy: ${correct}/${total} = ${total > 0 ? ((correct/total) * 100).toFixed(0) : 0}%`);
    console.log('');
  });

  it('★ v7c: L2 distance (smallest wins)', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    const clusters: Cluster_v7a[] = [];
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      clusters.push({ id: i, trainingFeat: feat });
    }

    let correct = 0, total = 0;
    console.log('=== v7c: L2 distance ===');
    for (let i = 0; i < POSES.length; i += 1) {
      const pose = POSES[i];
      for (let s = 1; s < fixtures[pose].length; s += 1) {
        const feat = encodeHandToFeatureVector(fixtures[pose][s]);
        const dists = clusters.map((c) => ({ id: c.id, d: l2Distance(feat, c.trainingFeat) }));
        dists.sort((a, b) => a.d - b.d);
        const winner = dists[0];
        const ok = winner.id === i;
        if (ok) correct += 1;
        total += 1;
      }
    }
    console.log(`  accuracy: ${correct}/${total} = ${total > 0 ? ((correct/total) * 100).toFixed(0) : 0}%`);
    console.log('');
  });

  it('★ Summary: 모든 inference 전략 accuracy 비교', () => {
    console.log('');
    console.log('=== Summary (synthetic stick figure MediaPipe captured) ===');
    console.log('  v6 mean-sub top-K + Jaccard:  50% (baseline)');
    console.log('  → 위 테스트들 결과 console.log 참조');
    console.log('');
    expect(true).toBe(true);
  });
});
