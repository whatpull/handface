// Phase 3.9 v11 iteration (2026-06-03):
// encoder 의 raw coords [0..62] 를 wrist-relative + palm-size normalized 로
// 변환 시 translation invariance + discrimination 효과 측정.

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

function dist3D(a: HandLandmark, b: HandLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

// V11 encoding: wrist-relative + palm-size normalized raw coords.
function encodeNormalized(lm: HandLandmark[]): number[] {
  const wrist = lm[0];
  const middleMcp = lm[9]; // middle finger MCP
  const palmSize = dist3D(wrist, middleMcp) || 0.1;
  // 21 × 3 = 63 wrist-relative palm-size-normalized coords.
  const out: number[] = [];
  for (const p of lm) {
    out.push((p.x - wrist.x) / palmSize);
    out.push((p.y - wrist.y) / palmSize);
    out.push((p.z - wrist.z) / palmSize);
  }
  // Append the derived features [63..94] from standard encoder.
  const full = encodeHandToFeatureVector(lm);
  for (let i = 63; i < 95; i += 1) out.push(full[i]);
  return out;
}

function translateLandmarks(lm: HandLandmark[], dx: number, dy: number): HandLandmark[] {
  return lm.map((p) => ({ x: p.x + dx, y: p.y + dy, z: p.z }));
}

describe('Phase 3.9 v11 — encoder normalization (wrist-relative + palm-size)', () => {
  it('★ Translation invariance — v9 full vs v11 normalized', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('');
    console.log('=== Translation invariance (v9 vs v11) ===');
    console.log('');
    console.log('  Translation:        0.05     0.10     0.20');
    for (const pose of POSES) {
      const base = fixtures[pose][0];
      const v9Base = encodeHandToFeatureVector(base);
      const v11Base = encodeNormalized(base);
      const v9Sims: number[] = [];
      const v11Sims: number[] = [];
      for (const delta of [0.05, 0.10, 0.20]) {
        const t = translateLandmarks(base, delta, delta);
        v9Sims.push(cosineSimilarity(v9Base, encodeHandToFeatureVector(t)));
        v11Sims.push(cosineSimilarity(v11Base, encodeNormalized(t)));
      }
      console.log(`  ${pose.padEnd(14)}  v9=${v9Sims.map(s => s.toFixed(4)).join('  ')}`);
      console.log(`  ${' '.repeat(14)}  v11=${v11Sims.map(s => s.toFixed(4)).join('  ')}`);
    }
    console.log('');
  });

  it('★ Cross-pose discrimination — v9 vs v11', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    const v9Feats = POSES.map((p) => encodeHandToFeatureVector(fixtures[p][0]));
    const v11Feats = POSES.map((p) => encodeNormalized(fixtures[p][0]));

    console.log('=== Cross-pose discrimination ===');
    console.log('');
    console.log('  pair                              v9       v11');
    let v9TotalDiscrim = 0, v11TotalDiscrim = 0;
    for (let i = 0; i < POSES.length; i += 1) {
      for (let j = i + 1; j < POSES.length; j += 1) {
        const v9s = cosineSimilarity(v9Feats[i], v9Feats[j]);
        const v11s = cosineSimilarity(v11Feats[i], v11Feats[j]);
        // Lower cos = better discrimination.
        v9TotalDiscrim += (1 - v9s);
        v11TotalDiscrim += (1 - v11s);
        const better = v11s < v9s ? '✓ v11 better' : '× v11 worse';
        console.log(`  ${POSES[i].padEnd(14)} vs ${POSES[j].padEnd(14)}  ${v9s.toFixed(4)}   ${v11s.toFixed(4)}   ${better}`);
      }
    }
    console.log('');
    console.log(`  total discrimination (1-cos): v9=${v9TotalDiscrim.toFixed(4)}, v11=${v11TotalDiscrim.toFixed(4)}`);
    console.log(`  → ${v11TotalDiscrim > v9TotalDiscrim ? 'v11 더 discriminative' : 'v9 더 discriminative'}`);
    console.log('');
  });

  it('★ Inference under heavy translation jitter — v9 vs v11', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    const v9Clusters = POSES.map((p) => encodeHandToFeatureVector(fixtures[p][0]));
    const v11Clusters = POSES.map((p) => encodeNormalized(fixtures[p][0]));

    let v9Correct = 0, v11Correct = 0, total = 0;
    // Heavy translation: ±0.15 (large user movement).
    const SIGMA = 0.15;
    for (let i = 0; i < POSES.length; i += 1) {
      for (let s = 0; s < 50; s += 1) {
        const dx = (Math.random() - 0.5) * 2 * SIGMA;
        const dy = (Math.random() - 0.5) * 2 * SIGMA;
        const jit = translateLandmarks(fixtures[POSES[i]][0], dx, dy);
        const jV9 = encodeHandToFeatureVector(jit);
        const jV11 = encodeNormalized(jit);

        const v9Sims = v9Clusters.map((c, j) => ({ id: j, sim: cosineSimilarity(jV9, c) }));
        v9Sims.sort((a, b) => b.sim - a.sim);
        if (v9Sims[0].id === i) v9Correct += 1;

        const v11Sims = v11Clusters.map((c, j) => ({ id: j, sim: cosineSimilarity(jV11, c) }));
        v11Sims.sort((a, b) => b.sim - a.sim);
        if (v11Sims[0].id === i) v11Correct += 1;

        total += 1;
      }
    }
    console.log('');
    console.log(`=== Inference under heavy translation (σ=0.15, 200 samples) ===`);
    console.log(`  v9  (raw absolute coords):    ${v9Correct}/${total} = ${(v9Correct/total*100).toFixed(0)}%`);
    console.log(`  v11 (wrist-relative norm):    ${v11Correct}/${total} = ${(v11Correct/total*100).toFixed(0)}%`);
    if (v11Correct > v9Correct) {
      console.log(`  ✓ v11 더 robust under translation — production 도입 권장`);
    } else if (v11Correct === v9Correct) {
      console.log(`  = 동등`);
    } else {
      console.log(`  × v9 더 robust`);
    }
    console.log('');
    expect(true).toBe(true);
  });
});
