// Hand noise simulation 단위 테스트.
//
// 검증 영역:
//   - jitter 결정성 (seed 동일 → 결과 동일)
//   - scale 영역 wrist invariance
//   - rotation 영역 wrist invariance + radius 보존
//   - translation 영역 모든 landmark 영역 동일 shift
//   - composite realistic noise 영역 결정성

import { describe, it, expect } from 'vitest';
import {
  SeededGaussian,
  addLandmarkJitter,
  addFeatureNoise,
  applyHandScale,
  applyHandRotation,
  applyHandTranslation,
  applyRealisticNoise,
  DEFAULT_NOISE_PARAMS,
} from '@/lib/snn-runtime/hand-noise';
import type { HandLandmark } from '@/lib/snn-runtime/hand-spike-encoder';

function makeMockLandmarks(): HandLandmark[] {
  // 21 landmarks — wrist + 5 fingers × 4 joints.
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let f = 0; f < 5; f += 1) {
    for (let j = 0; j < 4; j += 1) {
      lm.push({
        x: 0.4 + f * 0.05 + j * 0.01,
        y: 0.7 - j * 0.05,
        z: 0.01 * j,
      });
    }
  }
  return lm;
}

describe('SeededGaussian — determinism', () => {
  it('seed 동일 → 동일 시퀀스', () => {
    const g1 = new SeededGaussian(42);
    const g2 = new SeededGaussian(42);
    for (let i = 0; i < 20; i += 1) {
      expect(g1.next()).toBe(g2.next());
    }
  });
  it('seed 다름 → 다른 시퀀스', () => {
    const g1 = new SeededGaussian(1);
    const g2 = new SeededGaussian(2);
    const seq1 = Array.from({ length: 20 }, () => g1.next());
    const seq2 = Array.from({ length: 20 }, () => g2.next());
    // 최소 하나 이상 다름 (deterministic distinct seeds).
    let anyDiff = false;
    for (let i = 0; i < seq1.length; i += 1) {
      if (seq1[i] !== seq2[i]) { anyDiff = true; break; }
    }
    expect(anyDiff).toBe(true);
  });
  it('대량 sample 영역 mean ~0, std ~1 (Box-Muller 정합)', () => {
    const g = new SeededGaussian(7);
    const N = 5000;
    let sum = 0;
    let sumSq = 0;
    for (let i = 0; i < N; i += 1) {
      const v = g.next();
      sum += v;
      sumSq += v * v;
    }
    const mean = sum / N;
    const variance = sumSq / N - mean * mean;
    const std = Math.sqrt(variance);
    // tolerance — Box-Muller 영역 large-N 영역 ±0.1 영역.
    expect(Math.abs(mean)).toBeLessThan(0.1);
    expect(Math.abs(std - 1)).toBeLessThan(0.1);
  });
});

describe('addLandmarkJitter', () => {
  it('seed 동일 → 동일 결과 (결정성)', () => {
    const lm = makeMockLandmarks();
    const g1 = new SeededGaussian(123);
    const g2 = new SeededGaussian(123);
    const j1 = addLandmarkJitter(lm, 0.01, g1);
    const j2 = addLandmarkJitter(lm, 0.01, g2);
    expect(j1).toHaveLength(lm.length);
    for (let i = 0; i < lm.length; i += 1) {
      expect(j1[i].x).toBe(j2[i].x);
      expect(j1[i].y).toBe(j2[i].y);
      expect(j1[i].z).toBe(j2[i].z);
    }
  });
  it('sigma=0 → 원본 그대로', () => {
    const lm = makeMockLandmarks();
    const g = new SeededGaussian(1);
    const j = addLandmarkJitter(lm, 0, g);
    for (let i = 0; i < lm.length; i += 1) {
      expect(j[i].x).toBe(lm[i].x);
      expect(j[i].y).toBe(lm[i].y);
      expect(j[i].z).toBe(lm[i].z);
    }
  });
  it('sigma<0 → 영역 throw', () => {
    const lm = makeMockLandmarks();
    const g = new SeededGaussian(1);
    expect(() => addLandmarkJitter(lm, -0.01, g)).toThrow();
  });
  it('input 영역 mutate 0 (pure function)', () => {
    const lm = makeMockLandmarks();
    const original = JSON.parse(JSON.stringify(lm));
    const g = new SeededGaussian(1);
    addLandmarkJitter(lm, 0.01, g);
    expect(lm).toEqual(original);
  });
});

describe('applyHandScale', () => {
  it('wrist 좌표 영역 invariant', () => {
    const lm = makeMockLandmarks();
    const scaled = applyHandScale(lm, 1.5);
    expect(scaled[0].x).toBe(lm[0].x);
    expect(scaled[0].y).toBe(lm[0].y);
    expect(scaled[0].z).toBe(lm[0].z);
  });
  it('factor=1 → identity', () => {
    const lm = makeMockLandmarks();
    const scaled = applyHandScale(lm, 1);
    for (let i = 0; i < lm.length; i += 1) {
      expect(scaled[i].x).toBeCloseTo(lm[i].x, 10);
      expect(scaled[i].y).toBeCloseTo(lm[i].y, 10);
      expect(scaled[i].z).toBeCloseTo(lm[i].z, 10);
    }
  });
  it('factor=2 → wrist 기준 거리 영역 2배', () => {
    const lm = makeMockLandmarks();
    const wrist = lm[0];
    const scaled = applyHandScale(lm, 2);
    for (let i = 1; i < lm.length; i += 1) {
      const origDist = Math.hypot(lm[i].x - wrist.x, lm[i].y - wrist.y, lm[i].z - wrist.z);
      const scDist = Math.hypot(scaled[i].x - wrist.x, scaled[i].y - wrist.y, scaled[i].z - wrist.z);
      expect(scDist).toBeCloseTo(origDist * 2, 10);
    }
  });
  it('input mutate 0', () => {
    const lm = makeMockLandmarks();
    const original = JSON.parse(JSON.stringify(lm));
    applyHandScale(lm, 1.5);
    expect(lm).toEqual(original);
  });
});

describe('applyHandRotation', () => {
  it('wrist 좌표 영역 invariant', () => {
    const lm = makeMockLandmarks();
    const rotated = applyHandRotation(lm, Math.PI / 6);
    expect(rotated[0].x).toBeCloseTo(lm[0].x, 10);
    expect(rotated[0].y).toBeCloseTo(lm[0].y, 10);
    expect(rotated[0].z).toBeCloseTo(lm[0].z, 10);
  });
  it('radians=0 → identity (in-plane)', () => {
    const lm = makeMockLandmarks();
    const rotated = applyHandRotation(lm, 0);
    for (let i = 0; i < lm.length; i += 1) {
      expect(rotated[i].x).toBeCloseTo(lm[i].x, 10);
      expect(rotated[i].y).toBeCloseTo(lm[i].y, 10);
      expect(rotated[i].z).toBe(lm[i].z);
    }
  });
  it('radians=2π → 원본과 동일 (in-plane)', () => {
    const lm = makeMockLandmarks();
    const rotated = applyHandRotation(lm, 2 * Math.PI);
    for (let i = 0; i < lm.length; i += 1) {
      expect(rotated[i].x).toBeCloseTo(lm[i].x, 8);
      expect(rotated[i].y).toBeCloseTo(lm[i].y, 8);
      expect(rotated[i].z).toBe(lm[i].z);
    }
  });
  it('wrist 기준 radius 영역 보존', () => {
    const lm = makeMockLandmarks();
    const wrist = lm[0];
    const rotated = applyHandRotation(lm, 0.5);
    for (let i = 1; i < lm.length; i += 1) {
      const origR = Math.hypot(lm[i].x - wrist.x, lm[i].y - wrist.y);
      const rotR = Math.hypot(rotated[i].x - wrist.x, rotated[i].y - wrist.y);
      expect(rotR).toBeCloseTo(origR, 10);
    }
  });
  it('z 영역 invariant (in-plane rotation)', () => {
    const lm = makeMockLandmarks();
    const rotated = applyHandRotation(lm, 1.0);
    for (let i = 0; i < lm.length; i += 1) {
      expect(rotated[i].z).toBe(lm[i].z);
    }
  });
  it('input mutate 0', () => {
    const lm = makeMockLandmarks();
    const original = JSON.parse(JSON.stringify(lm));
    applyHandRotation(lm, 0.3);
    expect(lm).toEqual(original);
  });
});

describe('applyHandTranslation', () => {
  it('모든 landmark 영역 동일 shift', () => {
    const lm = makeMockLandmarks();
    const dx = 0.03, dy = -0.02;
    const t = applyHandTranslation(lm, dx, dy);
    for (let i = 0; i < lm.length; i += 1) {
      expect(t[i].x).toBeCloseTo(lm[i].x + dx, 10);
      expect(t[i].y).toBeCloseTo(lm[i].y + dy, 10);
      expect(t[i].z).toBe(lm[i].z);
    }
  });
  it('dx=0, dy=0 → identity', () => {
    const lm = makeMockLandmarks();
    const t = applyHandTranslation(lm, 0, 0);
    for (let i = 0; i < lm.length; i += 1) {
      expect(t[i].x).toBe(lm[i].x);
      expect(t[i].y).toBe(lm[i].y);
      expect(t[i].z).toBe(lm[i].z);
    }
  });
  it('input mutate 0', () => {
    const lm = makeMockLandmarks();
    const original = JSON.parse(JSON.stringify(lm));
    applyHandTranslation(lm, 0.1, -0.1);
    expect(lm).toEqual(original);
  });
});

describe('addFeatureNoise — held-out feature-level Gaussian noise', () => {
  // 16-dim sparse feature — top-K mask (8 non-zero, 8 zero) 영역 정합.
  function makeMockFeature(): number[] {
    return [0.7, 0, 0.4, 0.9, 0, 0, 0.3, 0.6, 0, 0.8, 0, 0.2, 0, 0.5, 0, 0.1];
  }
  it('seed 동일 → 동일 결과 (결정성)', () => {
    const f = makeMockFeature();
    const g1 = new SeededGaussian(456);
    const g2 = new SeededGaussian(456);
    const n1 = addFeatureNoise(f, 0.05, g1);
    const n2 = addFeatureNoise(f, 0.05, g2);
    expect(n1).toHaveLength(f.length);
    for (let i = 0; i < f.length; i += 1) {
      expect(n1[i]).toBe(n2[i]);
    }
  });
  it('zero feature 영역 zero 유지 (top-K mask preserve)', () => {
    const f = makeMockFeature();
    const g = new SeededGaussian(1);
    const n = addFeatureNoise(f, 0.1, g);
    for (let i = 0; i < f.length; i += 1) {
      if (f[i] === 0) {
        expect(n[i]).toBe(0);
      }
    }
  });
  it('sigma=0 → input 그대로 (identity case)', () => {
    const f = makeMockFeature();
    const g = new SeededGaussian(1);
    const n = addFeatureNoise(f, 0, g);
    for (let i = 0; i < f.length; i += 1) {
      expect(n[i]).toBe(f[i]);
    }
  });
  it('sigma > 0 → output 영역 input 영역 다름 (noise applied to non-zero)', () => {
    const f = makeMockFeature();
    const g = new SeededGaussian(1);
    const n = addFeatureNoise(f, 0.05, g);
    let anyDiff = false;
    for (let i = 0; i < f.length; i += 1) {
      if (f[i] !== 0 && n[i] !== f[i]) { anyDiff = true; break; }
    }
    expect(anyDiff).toBe(true);
  });
  it('sigma<0 → throw', () => {
    const f = makeMockFeature();
    const g = new SeededGaussian(1);
    expect(() => addFeatureNoise(f, -0.01, g)).toThrow();
  });
  it('input 영역 mutate 0 (pure function)', () => {
    const f = makeMockFeature();
    const original = f.slice();
    const g = new SeededGaussian(1);
    addFeatureNoise(f, 0.05, g);
    expect(f).toEqual(original);
  });
  it('length 영역 input 영역 동일', () => {
    const f = makeMockFeature();
    const g = new SeededGaussian(1);
    const n = addFeatureNoise(f, 0.05, g);
    expect(n.length).toBe(f.length);
  });
  it('empty feature → empty result', () => {
    const g = new SeededGaussian(1);
    const n = addFeatureNoise([], 0.05, g);
    expect(n).toEqual([]);
  });
  it('all-zero feature → all-zero result (sigma > 0)', () => {
    const f = [0, 0, 0, 0];
    const g = new SeededGaussian(1);
    const n = addFeatureNoise(f, 0.1, g);
    expect(n).toEqual([0, 0, 0, 0]);
  });
});

describe('applyRealisticNoise — composite pipeline', () => {
  it('seed 동일 → 결과 동일 (결정성)', () => {
    const lm = makeMockLandmarks();
    const g1 = new SeededGaussian(99);
    const g2 = new SeededGaussian(99);
    const r1 = applyRealisticNoise(lm, DEFAULT_NOISE_PARAMS, g1);
    const r2 = applyRealisticNoise(lm, DEFAULT_NOISE_PARAMS, g2);
    expect(r1).toHaveLength(lm.length);
    for (let i = 0; i < lm.length; i += 1) {
      expect(r1[i].x).toBe(r2[i].x);
      expect(r1[i].y).toBe(r2[i].y);
      expect(r1[i].z).toBe(r2[i].z);
    }
  });
  it('seed 다름 → 다른 결과', () => {
    const lm = makeMockLandmarks();
    const g1 = new SeededGaussian(1);
    const g2 = new SeededGaussian(2);
    const r1 = applyRealisticNoise(lm, DEFAULT_NOISE_PARAMS, g1);
    const r2 = applyRealisticNoise(lm, DEFAULT_NOISE_PARAMS, g2);
    let anyDiff = false;
    for (let i = 0; i < lm.length; i += 1) {
      if (r1[i].x !== r2[i].x || r1[i].y !== r2[i].y) { anyDiff = true; break; }
    }
    expect(anyDiff).toBe(true);
  });
  it('zero-noise params → 원본 근사 (jitter sigma=0, scale=1, rot=0, trans=0)', () => {
    const lm = makeMockLandmarks();
    const g = new SeededGaussian(1);
    const r = applyRealisticNoise(lm, {
      jitterSigma: 0,
      scaleRange: [1, 1],
      rotationRange: [0, 0],
      translationRange: [0, 0],
    }, g);
    for (let i = 0; i < lm.length; i += 1) {
      expect(r[i].x).toBeCloseTo(lm[i].x, 10);
      expect(r[i].y).toBeCloseTo(lm[i].y, 10);
      expect(r[i].z).toBeCloseTo(lm[i].z, 10);
    }
  });
});
