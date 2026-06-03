// Phase 3.9 v11 — real photo validation.
// 자율 iteration: 진짜 인체 사진 (MediaPipe woman_hands.jpg) landmarks 로
// v11 LiveSnn cosine path 가 정상 동작하는지 검증.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  encodeHandToFeatureVector,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

function loadRealFixture(name: string): HandLandmark[][] {
  const path = resolve(__dirname, 'fixtures', `${name}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks;
}

function translateLandmarks(lm: HandLandmark[], dx: number, dy: number): HandLandmark[] {
  return lm.map((p) => ({ x: p.x + dx, y: p.y + dy, z: p.z }));
}

function scaleLandmarks(lm: HandLandmark[], factor: number): HandLandmark[] {
  const cx = lm[0].x, cy = lm[0].y;
  return lm.map((p) => ({
    x: cx + (p.x - cx) * factor,
    y: cy + (p.y - cy) * factor,
    z: p.z * factor,
  }));
}

function rotateLandmarks(lm: HandLandmark[], angleRad: number): HandLandmark[] {
  const cx = lm[0].x, cy = lm[0].y;
  const cosA = Math.cos(angleRad), sinA = Math.sin(angleRad);
  return lm.map((p) => ({
    x: cx + (p.x - cx) * cosA - (p.y - cy) * sinA,
    y: cy + (p.x - cx) * sinA + (p.y - cy) * cosA,
    z: p.z,
  }));
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

// v11 normalization (duplicated from LiveSnn._normalizePatternV11).
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

describe('Phase 3.9 v11 — real photo MediaPipe validation', () => {
  it('★ 진짜 사진 MediaPipe landmarks: v11 normalization 정상 동작', () => {
    const real = loadRealFixture('hand-real-mediapipe-sample')[0];
    expect(real).toHaveLength(21);

    const realFeat = encodeHandToFeatureVector(real);
    expect(realFeat).toHaveLength(95);

    const normalized = normalizePatternV11(realFeat);

    console.log('');
    console.log('=== 진짜 인체 사진 (MediaPipe woman_hands.jpg) 검증 ===');
    console.log('');
    console.log(`  wrist coords (raw):       (${real[0].x.toFixed(4)}, ${real[0].y.toFixed(4)}, ${real[0].z.toFixed(4)})`);
    console.log(`  middle MCP coords (raw):  (${real[9].x.toFixed(4)}, ${real[9].y.toFixed(4)}, ${real[9].z.toFixed(4)})`);
    console.log(`  v11 norm wrist [0,1,2]:   (${normalized[0].toFixed(4)}, ${normalized[1].toFixed(4)}, ${normalized[2].toFixed(4)})`);
    console.log(`  v11 norm middle MCP [27,28,29]: (${normalized[27].toFixed(4)}, ${normalized[28].toFixed(4)}, ${normalized[29].toFixed(4)})`);
    console.log('');

    // wrist should be (0,0,0) after normalization.
    expect(normalized[0]).toBeCloseTo(0, 5);
    expect(normalized[1]).toBeCloseTo(0, 5);
    expect(normalized[2]).toBeCloseTo(0, 5);

    // Middle MCP distance from origin should be ~1 (palm-size normalized).
    const mcpDist = Math.sqrt(normalized[27]**2 + normalized[28]**2 + normalized[29]**2);
    console.log(`  v11 norm middle MCP distance from wrist: ${mcpDist.toFixed(4)} (expected ~1.0)`);
    expect(mcpDist).toBeCloseTo(1, 3);
  });

  it('★ Translation invariance on real photo: cosine identical after translation', () => {
    const real = loadRealFixture('hand-real-mediapipe-sample')[0];
    const baseFeat = encodeHandToFeatureVector(real);
    const baseNorm = normalizePatternV11(baseFeat);

    console.log('');
    console.log('=== Real photo translation invariance test ===');
    console.log('');
    console.log('  translation   v9 cos (raw)   v11 cos (normalized)');

    for (const delta of [0.05, 0.10, 0.20, 0.30]) {
      const translated = translateLandmarks(real, delta, delta);
      const tFeat = encodeHandToFeatureVector(translated);
      const tNorm = normalizePatternV11(tFeat);

      const v9Sim = cosineSimilarity(baseFeat, tFeat);
      const v11Sim = cosineSimilarity(baseNorm, tNorm);
      console.log(`  ${('+' + delta.toFixed(2)).padEnd(13)} ${v9Sim.toFixed(6)}      ${v11Sim.toFixed(6)}`);
      // v11 should be perfectly translation invariant on real data.
      expect(v11Sim).toBeGreaterThan(0.999);
    }
    console.log('');
  });

  it('★ Scale invariance on real photo', () => {
    const real = loadRealFixture('hand-real-mediapipe-sample')[0];
    const baseFeat = encodeHandToFeatureVector(real);
    const baseNorm = normalizePatternV11(baseFeat);

    console.log('=== Real photo scale invariance test ===');
    console.log('');
    console.log('  scale         v9 cos          v11 cos');
    for (const factor of [0.5, 0.7, 1.3, 1.5, 2.0]) {
      const scaled = scaleLandmarks(real, factor);
      const sFeat = encodeHandToFeatureVector(scaled);
      const sNorm = normalizePatternV11(sFeat);

      const v9Sim = cosineSimilarity(baseFeat, sFeat);
      const v11Sim = cosineSimilarity(baseNorm, sNorm);
      console.log(`  ${('x' + factor).padEnd(13)} ${v9Sim.toFixed(6)}      ${v11Sim.toFixed(6)}`);
    }
    console.log('');
  });

  it('★ Rotation similarity on real photo (rotation 가 hand semantics 와 일치)', () => {
    const real = loadRealFixture('hand-real-mediapipe-sample')[0];
    const baseFeat = encodeHandToFeatureVector(real);
    const baseNorm = normalizePatternV11(baseFeat);

    console.log('=== Real photo rotation similarity test ===');
    console.log('');
    console.log('  rotation (deg)    v9 cos      v11 cos');
    for (const deg of [5, 10, 20, 45, 90]) {
      const rotated = rotateLandmarks(real, deg * Math.PI / 180);
      const rFeat = encodeHandToFeatureVector(rotated);
      const rNorm = normalizePatternV11(rFeat);

      const v9Sim = cosineSimilarity(baseFeat, rFeat);
      const v11Sim = cosineSimilarity(baseNorm, rNorm);
      console.log(`  ${(deg + '°').padEnd(17)} ${v9Sim.toFixed(4)}    ${v11Sim.toFixed(4)}`);
    }
    console.log('');
    console.log('  (rotation 은 다른 자세 — cosine 가 낮아져야 정상)');
    console.log('');
  });
});
