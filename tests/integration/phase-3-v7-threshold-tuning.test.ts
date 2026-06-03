// Phase 3.9 v7 — cosine similarity threshold tuning under jitter (2026-06-03).
//
// 사용자 위임 "사용자 확인은 없을 예정이고 본인이 직접 확인 및 테스트 진행".
//
// 본 test 는 captured MediaPipe landmarks 에 점진 jitter 를 추가하여:
//   1. 같은 자세의 jitter 가 cosine sim 을 얼마나 떨어뜨리나
//   2. 다른 자세 간 cosine sim 은 얼마나 멀어지나
//   3. 두 분포 사이의 separator (optimal threshold) 가 무엇인가
// 측정.

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

// Mulberry32 PRNG.
function makeRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rng: () => number): number {
  const u1 = rng() || 1e-10;
  const u2 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function jitterLandmarks(lm: HandLandmark[], sigma: number, rng: () => number): HandLandmark[] {
  return lm.map((p) => ({
    x: p.x + gaussian(rng) * sigma,
    y: p.y + gaussian(rng) * sigma,
    z: p.z + gaussian(rng) * sigma,
  }));
}

describe('Phase 3.9 v7 — threshold tuning under jitter', () => {
  it('★ Same-pose cosine sim distribution under varying jitter σ', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('');
    console.log('=== Same-pose cosine sim distribution under jitter ===');
    console.log('');
    console.log('  pose          σ=0.005   σ=0.01    σ=0.02    σ=0.05');
    for (const pose of POSES) {
      const baseFeat = encodeHandToFeatureVector(fixtures[pose][0]);
      const stats: number[] = [];
      for (const sigma of [0.005, 0.01, 0.02, 0.05]) {
        const sims: number[] = [];
        const rng = makeRng(42);
        for (let s = 0; s < 50; s += 1) {
          const noisy = jitterLandmarks(fixtures[pose][0], sigma, rng);
          const noisyFeat = encodeHandToFeatureVector(noisy);
          sims.push(cosineSimilarity(baseFeat, noisyFeat));
        }
        const mean = sims.reduce((a, b) => a + b, 0) / sims.length;
        const min = Math.min(...sims);
        stats.push(mean, min);
      }
      console.log(`  ${pose.padEnd(14)}  mean=${stats[0].toFixed(4)}  mean=${stats[2].toFixed(4)}  mean=${stats[4].toFixed(4)}  mean=${stats[6].toFixed(4)}`);
      console.log(`  ${' '.repeat(14)}  min=${stats[1].toFixed(4)}   min=${stats[3].toFixed(4)}   min=${stats[5].toFixed(4)}   min=${stats[7].toFixed(4)}`);
    }
    console.log('');
  });

  it('★ Cross-pose cosine sim distribution (different gestures)', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('=== Cross-pose cosine sim (baseline, no jitter) ===');
    console.log('');
    const feats = POSES.map((p) => encodeHandToFeatureVector(fixtures[p][0]));
    for (let i = 0; i < POSES.length; i += 1) {
      for (let j = i + 1; j < POSES.length; j += 1) {
        const sim = cosineSimilarity(feats[i], feats[j]);
        console.log(`  ${POSES[i].padEnd(14)} vs ${POSES[j].padEnd(14)}: cos=${sim.toFixed(4)}`);
      }
    }
    console.log('');
  });

  it('★ Optimal threshold search', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // Same-pose distribution (with σ=0.02 jitter — realistic webcam variance).
    const samePoseSims: number[] = [];
    for (const pose of POSES) {
      const base = encodeHandToFeatureVector(fixtures[pose][0]);
      const rng = makeRng(42);
      for (let s = 0; s < 50; s += 1) {
        const noisy = jitterLandmarks(fixtures[pose][0], 0.02, rng);
        samePoseSims.push(cosineSimilarity(base, encodeHandToFeatureVector(noisy)));
      }
    }
    samePoseSims.sort((a, b) => a - b);
    const sameMin = samePoseSims[0];
    const sameP05 = samePoseSims[Math.floor(samePoseSims.length * 0.05)];

    // Cross-pose distribution.
    const crossPoseSims: number[] = [];
    const feats = POSES.map((p) => encodeHandToFeatureVector(fixtures[p][0]));
    for (let i = 0; i < POSES.length; i += 1) {
      for (let j = i + 1; j < POSES.length; j += 1) {
        crossPoseSims.push(cosineSimilarity(feats[i], feats[j]));
      }
    }
    crossPoseSims.sort((a, b) => b - a);
    const crossMax = crossPoseSims[0];

    console.log('=== Threshold separation analysis (σ=0.02 jitter) ===');
    console.log('');
    console.log(`  same-pose cosine sim:  min=${sameMin.toFixed(4)}, p5=${sameP05.toFixed(4)}`);
    console.log(`  cross-pose cosine sim: max=${crossMax.toFixed(4)}`);
    const optimalThreshold = (sameP05 + crossMax) / 2;
    console.log(`  optimal threshold (p5 same vs max cross midpoint): ${optimalThreshold.toFixed(4)}`);
    console.log('');
    if (sameP05 > crossMax) {
      console.log(`  ✓ separation exists: same-pose p5 (${sameP05.toFixed(4)}) > cross-pose max (${crossMax.toFixed(4)})`);
      console.log(`  → threshold ${optimalThreshold.toFixed(4)} 가 안전 separator.`);
    } else {
      console.log(`  ✗ overlap: same-pose p5 (${sameP05.toFixed(4)}) <= cross-pose max (${crossMax.toFixed(4)})`);
      console.log(`  → threshold 미세 조정 필요 — false-positive vs false-negative trade-off.`);
    }
    console.log('');

    // Test current threshold 0.97.
    const currentThreshold = 0.97;
    const sameAtThreshold = samePoseSims.filter((s) => s >= currentThreshold).length;
    const crossAtThreshold = crossPoseSims.filter((s) => s >= currentThreshold).length;
    console.log(`  current threshold 0.97 analysis:`);
    console.log(`    same-pose matches (true positive): ${sameAtThreshold}/${samePoseSims.length} = ${(sameAtThreshold/samePoseSims.length*100).toFixed(0)}%`);
    console.log(`    cross-pose matches (false positive): ${crossAtThreshold}/${crossPoseSims.length} = ${(crossAtThreshold/crossPoseSims.length*100).toFixed(0)}%`);
    console.log('');

    expect(true).toBe(true);
  });
});
