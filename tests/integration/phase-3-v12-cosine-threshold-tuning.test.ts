// Phase 3.9 v12 — cosine threshold sweep under v11 normalization.
// 자율 iteration: v11 perfect translation/scale invariance 덕에 same-pose 가
// 항상 cos=1.0 → threshold 를 더 엄격하게 (0.97 → 0.99) 올려서 false-positive
// 감소 가능 여부 측정.

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

function loadRealFixture(): HandLandmark[] {
  const path = resolve(__dirname, 'fixtures', 'hand-real-mediapipe-sample.json');
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks[0];
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

function normalizePatternV11(pattern: number[]): number[] {
  if (pattern.length !== 95) return pattern;
  const wristX = pattern[0], wristY = pattern[1], wristZ = pattern[2];
  const mcpX = pattern[27], mcpY = pattern[28], mcpZ = pattern[29];
  const palmSize = Math.sqrt(
    (wristX - mcpX) ** 2 + (wristY - mcpY) ** 2 + (wristZ - mcpZ) ** 2,
  ) || 0.1;
  const out = new Array<number>(95);
  for (let i = 0; i < 21; i += 1) {
    out[i * 3 + 0] = (pattern[i * 3 + 0] - wristX) / palmSize;
    out[i * 3 + 1] = (pattern[i * 3 + 1] - wristY) / palmSize;
    out[i * 3 + 2] = (pattern[i * 3 + 2] - wristZ) / palmSize;
  }
  for (let i = 63; i < 95; i += 1) out[i] = pattern[i];
  return out;
}

function gaussian(seed: number): () => number {
  let s = seed | 0;
  const rng = (): number => {
    s = (s + 0x6D2B79F5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return () => {
    const u1 = rng() || 1e-10;
    const u2 = rng();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };
}

function jitterLandmarks(lm: HandLandmark[], sigma: number, g: () => number): HandLandmark[] {
  return lm.map((p) => ({
    x: p.x + g() * sigma,
    y: p.y + g() * sigma,
    z: p.z + g() * sigma,
  }));
}

describe('Phase 3.9 v12 — cosine threshold sweep under v11 normalization', () => {
  it('★ Same-pose distribution under realistic webcam jitter (σ=0.005, 0.01, 0.02)', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('');
    console.log('=== Same-pose cosine distribution under jitter (v11 normalized) ===');
    console.log('');
    console.log('  pose          σ=0.005     σ=0.010     σ=0.020');
    console.log('                min  mean  min  mean  min  mean');

    for (const pose of POSES) {
      const baseLm = fixtures[pose][0];
      const baseNorm = normalizePatternV11(encodeHandToFeatureVector(baseLm));
      const stats: number[] = [];
      for (const sigma of [0.005, 0.01, 0.02]) {
        const g = gaussian(42);
        const sims: number[] = [];
        for (let s = 0; s < 100; s += 1) {
          const noisy = jitterLandmarks(baseLm, sigma, g);
          const nNorm = normalizePatternV11(encodeHandToFeatureVector(noisy));
          sims.push(cosineSimilarity(baseNorm, nNorm));
        }
        const mn = Math.min(...sims);
        const mean = sims.reduce((a, b) => a + b, 0) / sims.length;
        stats.push(mn, mean);
      }
      console.log(`  ${pose.padEnd(14)} ${stats.map(s => s.toFixed(4)).join(' ')}`);
    }
    console.log('');
  });

  it('★ Cross-pose distribution (v11 normalized) — baseline for threshold tuning', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    console.log('=== Cross-pose cosine (v11 normalized) ===');
    console.log('');
    const feats = POSES.map((p) => normalizePatternV11(encodeHandToFeatureVector(fixtures[p][0])));
    for (let i = 0; i < POSES.length; i += 1) {
      for (let j = i + 1; j < POSES.length; j += 1) {
        const sim = cosineSimilarity(feats[i], feats[j]);
        console.log(`  ${POSES[i].padEnd(14)} vs ${POSES[j].padEnd(14)}: ${sim.toFixed(4)}`);
      }
    }
    console.log('');
  });

  it('★ Threshold sweep: TP rate vs FP rate at different thresholds', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // Same-pose samples with σ=0.02 jitter (realistic webcam).
    const samePoseSims: number[] = [];
    for (const pose of POSES) {
      const base = normalizePatternV11(encodeHandToFeatureVector(fixtures[pose][0]));
      const g = gaussian(123);
      for (let s = 0; s < 100; s += 1) {
        const noisy = jitterLandmarks(fixtures[pose][0], 0.02, g);
        const nNorm = normalizePatternV11(encodeHandToFeatureVector(noisy));
        samePoseSims.push(cosineSimilarity(base, nNorm));
      }
    }

    // Cross-pose samples.
    const crossPoseSims: number[] = [];
    const feats = POSES.map((p) => normalizePatternV11(encodeHandToFeatureVector(fixtures[p][0])));
    for (let i = 0; i < POSES.length; i += 1) {
      for (let j = i + 1; j < POSES.length; j += 1) {
        crossPoseSims.push(cosineSimilarity(feats[i], feats[j]));
      }
    }

    console.log('=== Threshold sweep ===');
    console.log('');
    console.log('  threshold    TP rate (same-pose match)    FP rate (cross-pose match)');
    for (const threshold of [0.90, 0.93, 0.95, 0.97, 0.98, 0.99, 0.995]) {
      const tp = samePoseSims.filter((s) => s >= threshold).length / samePoseSims.length;
      const fp = crossPoseSims.filter((s) => s >= threshold).length / crossPoseSims.length;
      const marker = tp > 0.95 && fp < 0.20 ? ' ← good balance' : '';
      console.log(`  ${threshold.toFixed(3)}         ${(tp*100).toFixed(0).padStart(3)}%                        ${(fp*100).toFixed(0).padStart(3)}%${marker}`);
    }
    console.log('');
    console.log('  current production threshold: 0.97');
    console.log('');

    // Find optimal threshold (highest TP-FP gap).
    let bestThreshold = 0.97;
    let bestGap = -1;
    for (let t = 0.85; t <= 0.999; t += 0.005) {
      const tp = samePoseSims.filter((s) => s >= t).length / samePoseSims.length;
      const fp = crossPoseSims.filter((s) => s >= t).length / crossPoseSims.length;
      const gap = tp - fp;
      if (gap > bestGap) { bestGap = gap; bestThreshold = t; }
    }
    console.log(`  optimal threshold (max TP-FP gap): ${bestThreshold.toFixed(3)} (gap=${bestGap.toFixed(3)})`);
    console.log('');

    expect(true).toBe(true);
  });
});
