// Hand landmark noise simulation — MediaPipe Hand 영역 realistic variance / camera
// noise / scale shift / rotation / translation 영역 시뮬레이트 영역 R-STDP robustness
// 검증용 helper.
//
// 정직 한계 명시:
//   - 본 helper 영역 simulated noise (Gaussian jitter / affine transform 한정).
//   - 실제 사용자 hand capture 영역 통한 robustness 검증 영역 별도 R&D 필요.
//   - jitter sigma 0.005~0.015 영역 MediaPipe Hand 영역 typical landmark variance
//     영역 ±2-5px @ 640×480 영역 normalized coord (Zhang et al. 2020 정합).
//
// 학술 정합:
//   - Zhang et al. 2020 — MediaPipe Hands real-time tracking. typical landmark
//     variance ~±2-5px @ 640×480 영역 normalized 영역 ~0.005~0.015 sigma.
//   - Goodfellow 2014 — noise injection as regularization. Bio-SNN 영역 R-STDP
//     영역 noise robustness 검증 영역 정합.
//   - Olshausen & Field 1996 — sparse coding. forced-disjoint top-K mechanism
//     영역 noise 영역 영역 active-input drift 영역 검증.

import { SeededRandom } from './prng';
import type { HandLandmark } from './hand-spike-encoder';

// ── 1. Gaussian noise (Box-Muller transform, seeded) ──

// SeededRandom 영역 [0,1) uniform 영역 영역 Box-Muller 영역 영역 standard normal
// N(0,1) 영역 변환. 두 uniform → 두 normal 영역 변환 영역 영역 sequential 영역
// pair 영역 cache 영역 영역.
export class SeededGaussian {
  private rng: SeededRandom;
  private cached: number | null = null;
  constructor(seed: number) {
    this.rng = new SeededRandom(seed);
  }
  // standard normal N(0, 1).
  next(): number {
    if (this.cached !== null) {
      const v = this.cached;
      this.cached = null;
      return v;
    }
    // Box-Muller — 두 uniform (0, 1] (0 회피 영역 +epsilon).
    let u1 = this.rng.random();
    const u2 = this.rng.random();
    if (u1 < 1e-12) u1 = 1e-12;
    const r = Math.sqrt(-2 * Math.log(u1));
    const theta = 2 * Math.PI * u2;
    const z0 = r * Math.cos(theta);
    const z1 = r * Math.sin(theta);
    this.cached = z1;
    return z0;
  }
  // N(mean, sigma^2).
  nextScaled(mean: number, sigma: number): number {
    return mean + sigma * this.next();
  }
  // uniform [a, b].
  uniform(a: number, b: number): number {
    return this.rng.uniform(a, b);
  }
}

// ── 1.5. Feature-level Gaussian noise (held-out self-verify) ──

// addFeatureNoise — 16-dim (또는 N-dim) feature vector 영역 element-wise Gaussian
// noise (N(0, sigma^2)) 추가. sparse top-K mask preserve — feature[i] === 0 영역
// element 영역 zero 유지 (top-K 외 indices 영역 활성 0 보존).
//
// 학술 정합:
//   - Bishop 1995 (Neural Networks for Pattern Recognition, ch.9.3) — feature-level
//     noise injection 영역 regularization 영역 generalization estimate 영역 정합
//     (training data augmentation 영역 weight decay 영역 equivalence).
//   - Goodfellow et al. 2014 — noise injection as data augmentation (dropout /
//     feature noise 영역 정합 family).
//   - sparse coding (Olshausen & Field 1996) — top-K mask 영역 preserve 영역 영역
//     dense fill 회피 (sparse representation 영역 정합 — 영역 R&D 영역 cluster
//     active inputs 영역 영역 영역 변경 0 영역 weight robustness 영역 검증).
//
// pure function — input 영역 mutate 0, new array 영역 return.
// 결정성 보장 — SeededGaussian 영역 stream 영역 사용. 동일 seed + 동일 input 영역
// 동일 output. sigma=0 영역 input 영역 그대로 copy 영역 return (identity case).
export function addFeatureNoise(
  feature: ReadonlyArray<number>,
  sigma: number,
  gaussian: SeededGaussian,
): number[] {
  if (sigma < 0) throw new Error('addFeatureNoise: sigma must be >= 0');
  const out = new Array<number>(feature.length);
  for (let i = 0; i < feature.length; i += 1) {
    const v = feature[i];
    // top-K mask preserve — zero 영역 zero 유지 (sparse representation 정합).
    if (v === 0) {
      out[i] = 0;
      continue;
    }
    if (sigma === 0) {
      out[i] = v;
      continue;
    }
    out[i] = v + gaussian.nextScaled(0, sigma);
  }
  return out;
}

// ── 2. Per-landmark Gaussian jitter ──

// 각 landmark x/y/z 영역 N(0, sigma^2) 추가 noise. sigma 0.005~0.015 영역
// MediaPipe Hand typical variance 정합 (Zhang et al. 2020).
//
// pure function — input 영역 mutate 0, new array 영역 return.
export function addLandmarkJitter(
  landmarks: ReadonlyArray<HandLandmark>,
  sigma: number,
  gaussian: SeededGaussian,
): HandLandmark[] {
  if (sigma < 0) throw new Error('addLandmarkJitter: sigma must be >= 0');
  return landmarks.map(lm => ({
    x: lm.x + gaussian.nextScaled(0, sigma),
    y: lm.y + gaussian.nextScaled(0, sigma),
    z: lm.z + gaussian.nextScaled(0, sigma),
  }));
}

// ── 3. Hand scale (wrist 영역 origin 영역 uniform scale) ──

// wrist (landmark 0) 영역 origin 영역 모든 landmark 영역 uniform scale.
// factor 0.85 ~ 1.15 영역 typical hand size variance (sub-population / camera
// distance) 정합.
//
// 보장: wrist 영역 좌표 영역 invariant — wrist - wrist = 0 → wrist * factor + wrist = wrist.
export function applyHandScale(
  landmarks: ReadonlyArray<HandLandmark>,
  factor: number,
): HandLandmark[] {
  if (landmarks.length === 0) return [];
  const wrist = landmarks[0];
  return landmarks.map(lm => ({
    x: wrist.x + (lm.x - wrist.x) * factor,
    y: wrist.y + (lm.y - wrist.y) * factor,
    z: wrist.z + (lm.z - wrist.z) * factor,
  }));
}

// ── 4. Hand rotation (wrist 영역 axis, in-plane x/y rotation) ──

// wrist 영역 axis 영역 in-plane (x, y) rotation. z 영역 invariant.
// radians [-π, π]. typical hand orientation drift 영역 ±15° (~0.26 rad).
//
// 보장: wrist 영역 좌표 영역 invariant (origin rotation 영역 fixed point).
export function applyHandRotation(
  landmarks: ReadonlyArray<HandLandmark>,
  radians: number,
): HandLandmark[] {
  if (landmarks.length === 0) return [];
  const wrist = landmarks[0];
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return landmarks.map(lm => {
    const dx = lm.x - wrist.x;
    const dy = lm.y - wrist.y;
    return {
      x: wrist.x + dx * cos - dy * sin,
      y: wrist.y + dx * sin + dy * cos,
      z: lm.z,
    };
  });
}

// ── 5. Hand translation (uniform shift) ──

// 모든 landmark 영역 동일 (dx, dy) shift. typical camera framing drift
// (±0.05 normalized coord ≈ ±32px @ 640×480).
//
// pure function.
export function applyHandTranslation(
  landmarks: ReadonlyArray<HandLandmark>,
  dx: number,
  dy: number,
): HandLandmark[] {
  return landmarks.map(lm => ({
    x: lm.x + dx,
    y: lm.y + dy,
    z: lm.z,
  }));
}

// ── 6. Composite realistic noise pipeline ──

// Production 영역 typical 영역 simulated noise pipeline:
//   1. scale (camera distance variance)
//   2. rotation (hand orientation drift)
//   3. translation (camera framing drift)
//   4. jitter (per-landmark detection variance)
//
// 순서 영역 affine 영역 영역 wrist invariance 깨짐 → jitter 영역 마지막 영역 영역.
//
// 학술 정합: Goodfellow 2014 noise injection 영역 affine transform 영역 결합 영역
// data augmentation 영역 분류 robustness 증진 (Bio-SNN R-STDP 영역 정합).
export interface RealisticNoiseParams {
  jitterSigma: number;       // 0.005 ~ 0.015 typical
  scaleRange: [number, number]; // [0.85, 1.15] typical
  rotationRange: [number, number]; // [-0.26, 0.26] rad (~±15°)
  translationRange: [number, number]; // [-0.05, 0.05] normalized
}

export const DEFAULT_NOISE_PARAMS: RealisticNoiseParams = {
  jitterSigma: 0.01,
  scaleRange: [0.85, 1.15],
  rotationRange: [-0.26, 0.26],
  translationRange: [-0.05, 0.05],
};

// 결정성 보장 (정직 명시): 내부 SeededGaussian 영역 rng 영역 jitter / uniform calls
// 영역 sequence share — scale → rotation → dx → dy → jitter (Box-Muller per-landmark)
// 영역 동일 stream 영역 consume. 결과: 동일 seed + 동일 호출 순서 영역 동일 출력
// 재현 가능. 단, 호출 sequence 영역 의존 — 본 함수 외부 영역 동일 gaussian 영역
// 다른 consume 영역 영역 결과 영역 shift. 본 R&D 영역 per-gesture 영역 별도
// SeededGaussian instance 영역 생성 (test.ts:161 — TRAIN_SEED + gIdx*100) 영역
// gesture 영역 reproducibility 영역 보장.
export function applyRealisticNoise(
  landmarks: ReadonlyArray<HandLandmark>,
  params: RealisticNoiseParams,
  gaussian: SeededGaussian,
): HandLandmark[] {
  const scaleFactor = gaussian.uniform(params.scaleRange[0], params.scaleRange[1]);
  const rotation = gaussian.uniform(params.rotationRange[0], params.rotationRange[1]);
  const dx = gaussian.uniform(params.translationRange[0], params.translationRange[1]);
  const dy = gaussian.uniform(params.translationRange[0], params.translationRange[1]);
  let result = applyHandScale(landmarks, scaleFactor);
  result = applyHandRotation(result, rotation);
  result = applyHandTranslation(result, dx, dy);
  result = addLandmarkJitter(result, params.jitterSigma, gaussian);
  return result;
}
