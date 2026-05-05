// FeatureSmoother 영역 3-frame moving average 정합 영역 검증.
//
// 정직 한계 박음:
//  - jitter 감소 효과 영역 단일 frame 입력 영역 영역 영역 영역 — 통계 영역 다중 frame
//    sequence 영역 검증 mandatory.

import { describe, it, expect } from 'vitest';
import { FeatureSmoother, FEATURE_DIM } from '@/lib/mediapipe/feature-encoder';

describe('FeatureSmoother — 3-frame moving average', () => {
  it('returns same feat after first push', () => {
    const sm = new FeatureSmoother();
    const f1 = new Array(FEATURE_DIM).fill(0.5);
    const out = sm.push(f1);
    for (let i = 0; i < FEATURE_DIM; i += 1) expect(out[i]).toBeCloseTo(0.5, 6);
  });

  it('averages 2 frames after second push', () => {
    const sm = new FeatureSmoother();
    sm.push(new Array(FEATURE_DIM).fill(0.2));
    const out = sm.push(new Array(FEATURE_DIM).fill(0.8));
    // (0.2 + 0.8) / 2 = 0.5
    for (let i = 0; i < FEATURE_DIM; i += 1) expect(out[i]).toBeCloseTo(0.5, 6);
  });

  it('averages 3 frames once buffer is full', () => {
    const sm = new FeatureSmoother();
    sm.push(new Array(FEATURE_DIM).fill(0));
    sm.push(new Array(FEATURE_DIM).fill(0.3));
    const out = sm.push(new Array(FEATURE_DIM).fill(0.6));
    // (0 + 0.3 + 0.6) / 3 = 0.3
    for (let i = 0; i < FEATURE_DIM; i += 1) expect(out[i]).toBeCloseTo(0.3, 6);
  });

  it('drops oldest after >3 frames (sliding window)', () => {
    const sm = new FeatureSmoother();
    sm.push(new Array(FEATURE_DIM).fill(0));
    sm.push(new Array(FEATURE_DIM).fill(0));
    sm.push(new Array(FEATURE_DIM).fill(0));
    // 4 영역 push — 영역 frame (0) 영역 drop, window = (0, 0, 1.0) → 평균 = 1/3
    const out = sm.push(new Array(FEATURE_DIM).fill(1.0));
    for (let i = 0; i < FEATURE_DIM; i += 1) expect(out[i]).toBeCloseTo(1 / 3, 6);
  });

  it('reset clears the buffer', () => {
    const sm = new FeatureSmoother();
    sm.push(new Array(FEATURE_DIM).fill(0.9));
    sm.push(new Array(FEATURE_DIM).fill(0.9));
    sm.reset();
    const out = sm.push(new Array(FEATURE_DIM).fill(0.1));
    for (let i = 0; i < FEATURE_DIM; i += 1) expect(out[i]).toBeCloseTo(0.1, 6);
  });

  it('handles sparse arrays (|| 0 defensive)', () => {
    const sm = new FeatureSmoother();
    const sparse = [0.5];  // length 1, 16-dim 정합 영역.
    const out = sm.push(sparse);
    expect(out).toHaveLength(FEATURE_DIM);
    expect(out[0]).toBeCloseTo(0.5, 6);
    for (let i = 1; i < FEATURE_DIM; i += 1) expect(out[i]).toBe(0);
  });

  it('preserves per-dim independence (no cross-bleed)', () => {
    const sm = new FeatureSmoother();
    const f1 = new Array(FEATURE_DIM).fill(0);
    const f2 = new Array(FEATURE_DIM).fill(0);
    f1[0] = 1.0;  // dim 0 영역 영역
    f2[5] = 1.0;  // dim 5 영역 영역
    sm.push(f1);
    const out = sm.push(f2);
    expect(out[0]).toBeCloseTo(0.5, 6);
    expect(out[5]).toBeCloseTo(0.5, 6);
    expect(out[1]).toBe(0);
    expect(out[10]).toBe(0);
  });

  it('reduces variance vs raw (jitter smoothing 정합 검증)', () => {
    const sm = new FeatureSmoother();
    // alternating 0, 1, 0, 1 (worst-case jitter) — output 영역 영역 영역 영역 0 영역 1 영역
    // smooth 영역 mandatory.
    const out1 = sm.push(new Array(FEATURE_DIM).fill(0));
    const out2 = sm.push(new Array(FEATURE_DIM).fill(1));
    const out3 = sm.push(new Array(FEATURE_DIM).fill(0));
    const out4 = sm.push(new Array(FEATURE_DIM).fill(1));
    // 영역 frame: (0,1,0) → mean ≈ 0.333
    expect(out3[0]).toBeCloseTo(1 / 3, 6);
    // 영역 frame: (1,0,1) → mean ≈ 0.667
    expect(out4[0]).toBeCloseTo(2 / 3, 6);
    // 영역 영역 영역 영역 — out1=0, out2=0.5, out3=0.333, out4=0.667
    expect(out1[0]).toBe(0);
    expect(out2[0]).toBeCloseTo(0.5, 6);
  });
});
