// Phase 3.9 v10 iteration (2026-06-03):
// cosine sim 의 position-invariance 분석. encoder feature 의 raw coords [0..62]
// 가 hand 위치 변동에 sensitive 하므로 derived features [63..94] 만 사용 시
// translation jitter robustness 더 높을 가능성.

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

function translateLandmarks(lm: HandLandmark[], dx: number, dy: number): HandLandmark[] {
  return lm.map((p) => ({ x: p.x + dx, y: p.y + dy, z: p.z }));
}

function scaleLandmarks(lm: HandLandmark[], factor: number, cx: number = 0.5, cy: number = 0.5): HandLandmark[] {
  return lm.map((p) => ({
    x: cx + (p.x - cx) * factor,
    y: cy + (p.y - cy) * factor,
    z: p.z * factor,
  }));
}

function sliceFeature(full: number[], start: number, end: number): number[] {
  return full.slice(start, end);
}

describe('Phase 3.9 v10 — feature subset analysis for cosine position-invariance', () => {
  it('★ Translation invariance — full feature vs derived [63..94]', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('');
    console.log('=== Translation invariance test ===');
    console.log('');
    console.log('  Translation dx,dy ranges:  0.05  0.10  0.20');
    for (const pose of POSES) {
      const base = fixtures[pose][0];
      const baseFeat = encodeHandToFeatureVector(base);
      const baseDerived = sliceFeature(baseFeat, 63, 95);
      const fullSims: number[] = [];
      const derivedSims: number[] = [];
      for (const delta of [0.05, 0.10, 0.20]) {
        const translated = translateLandmarks(base, delta, delta);
        const tFeat = encodeHandToFeatureVector(translated);
        fullSims.push(cosineSimilarity(baseFeat, tFeat));
        derivedSims.push(cosineSimilarity(baseDerived, sliceFeature(tFeat, 63, 95)));
      }
      console.log(`  ${pose.padEnd(14)}  full=${fullSims.map(s => s.toFixed(4)).join('  ')}`);
      console.log(`  ${' '.repeat(14)}  drvd=${derivedSims.map(s => s.toFixed(4)).join('  ')}`);
    }
    console.log('');
    console.log('  → 비교: derived 가 translation 에 대해 더 robust 면 v10 채택 검토.');
    console.log('');
  });

  it('★ Scale invariance — full feature vs derived [63..94]', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('=== Scale invariance test ===');
    console.log('');
    console.log('  Scale factor: 0.9  0.8  1.1  1.2');
    for (const pose of POSES) {
      const base = fixtures[pose][0];
      const baseFeat = encodeHandToFeatureVector(base);
      const baseDerived = sliceFeature(baseFeat, 63, 95);
      const fullSims: number[] = [];
      const derivedSims: number[] = [];
      for (const factor of [0.9, 0.8, 1.1, 1.2]) {
        const scaled = scaleLandmarks(base, factor);
        const sFeat = encodeHandToFeatureVector(scaled);
        fullSims.push(cosineSimilarity(baseFeat, sFeat));
        derivedSims.push(cosineSimilarity(baseDerived, sliceFeature(sFeat, 63, 95)));
      }
      console.log(`  ${pose.padEnd(14)}  full=${fullSims.map(s => s.toFixed(4)).join('  ')}`);
      console.log(`  ${' '.repeat(14)}  drvd=${derivedSims.map(s => s.toFixed(4)).join('  ')}`);
    }
    console.log('');
  });

  it('★ Cross-pose discrimination — full feature vs derived [63..94]', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('=== Cross-pose discrimination ===');
    console.log('');
    const feats = POSES.map((p) => encodeHandToFeatureVector(fixtures[p][0]));
    const deriveds = feats.map((f) => sliceFeature(f, 63, 95));
    console.log('  pose pair                     full     derived');
    for (let i = 0; i < POSES.length; i += 1) {
      for (let j = i + 1; j < POSES.length; j += 1) {
        const fullSim = cosineSimilarity(feats[i], feats[j]);
        const derivedSim = cosineSimilarity(deriveds[i], deriveds[j]);
        const better = derivedSim < fullSim ? '✓ derived more discrim' : '× derived less discrim';
        console.log(`  ${POSES[i].padEnd(14)} vs ${POSES[j].padEnd(14)} ${fullSim.toFixed(4)}   ${derivedSim.toFixed(4)}   ${better}`);
      }
    }
    console.log('');
  });

  it('★ Position-jittered inference — full vs derived inference accuracy', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // Train: stored cluster features.
    const clustersFull: number[][] = [];
    const clustersDerived: number[][] = [];
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      clustersFull.push(feat);
      clustersDerived.push(sliceFeature(feat, 63, 95));
    }

    console.log('=== Position-jittered inference (translation 0.1, 50 samples per pose) ===');
    console.log('');

    let correctFull = 0, correctDerived = 0, total = 0;
    for (let i = 0; i < POSES.length; i += 1) {
      for (let s = 0; s < 50; s += 1) {
        // Apply random translation jitter ±0.1 (significant).
        const dx = (Math.random() - 0.5) * 0.2;
        const dy = (Math.random() - 0.5) * 0.2;
        const jittered = translateLandmarks(fixtures[POSES[i]][0], dx, dy);
        const jFeat = encodeHandToFeatureVector(jittered);
        const jDerived = sliceFeature(jFeat, 63, 95);

        // Full feature winner.
        const fullSims = clustersFull.map((c, j) => ({ id: j, sim: cosineSimilarity(jFeat, c) }));
        fullSims.sort((a, b) => b.sim - a.sim);
        if (fullSims[0].id === i) correctFull += 1;

        // Derived feature winner.
        const derivedSims = clustersDerived.map((c, j) => ({ id: j, sim: cosineSimilarity(jDerived, c) }));
        derivedSims.sort((a, b) => b.sim - a.sim);
        if (derivedSims[0].id === i) correctDerived += 1;

        total += 1;
      }
    }
    console.log(`  full feature inference accuracy:    ${correctFull}/${total} = ${(correctFull/total*100).toFixed(0)}%`);
    console.log(`  derived feature inference accuracy: ${correctDerived}/${total} = ${(correctDerived/total*100).toFixed(0)}%`);
    if (correctDerived > correctFull) {
      console.log(`  ✓ derived 더 robust — v10 채택 권장`);
    } else if (correctDerived === correctFull) {
      console.log(`  = 동일 — derived 단순화 이득`);
    } else {
      console.log(`  × full 더 robust — v9 유지`);
    }
    console.log('');
    expect(true).toBe(true);
  });
});
