// 6×6 orientation grid preset 의 36-dim 매핑 검증 (Phase 2A.2, 2026-06-01).
// horizontal / vertical / diag-back / diag-fore 각 preset 이 사용자 명시 spec
// 정합 여부만 schema 단위 검증 — backend R-STDP 학습 결과는 별도 path.
//
// 직전 5×5 (25-dim, Phase 2A.1) → 6×6 (36-dim) 동기화 (substrate
// orientation-6x6 정합). 6×6 index map:
//    0  1  2  3  4  5
//    6  7  8  9 10 11
//   12 13 14 15 16 17
//   18 19 20 21 22 23
//   24 25 26 27 28 29
//   30 31 32 33 34 35

import { describe, it, expect } from 'vitest';
import {
  ORIENTATION_PRESETS,
  ORIENTATION_LABELS,
  ORIENTATION_GLYPHS,
} from '@/components/snn/pipeline/GridInput';

describe('orientation grid presets', () => {
  it('always exposes 4 presets with 36-dim length', () => {
    expect(ORIENTATION_PRESETS).toHaveLength(4);
    expect(ORIENTATION_LABELS).toHaveLength(4);
    expect(ORIENTATION_GLYPHS).toHaveLength(4);
    for (const pat of ORIENTATION_PRESETS) {
      expect(pat).toHaveLength(36);
      for (const v of pat) expect(v === 0 || v === 1).toBe(true);
    }
  });

  it('cluster 0 horizontal — row 1 (index 6..11)', () => {
    expect(Array.from(ORIENTATION_PRESETS[0])).toEqual(
      [0, 0, 0, 0, 0, 0,  1, 1, 1, 1, 1, 1,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0],
    );
  });

  it('cluster 1 vertical — col 1 (index 1, 7, 13, 19, 25, 31)', () => {
    expect(Array.from(ORIENTATION_PRESETS[1])).toEqual(
      [0, 1, 0, 0, 0, 0,  0, 1, 0, 0, 0, 0,  0, 1, 0, 0, 0, 0,  0, 1, 0, 0, 0, 0,  0, 1, 0, 0, 0, 0,  0, 1, 0, 0, 0, 0],
    );
  });

  it('cluster 2 diag-back — top-left → bottom-right (0, 7, 14, 21, 28, 35)', () => {
    expect(Array.from(ORIENTATION_PRESETS[2])).toEqual(
      [1, 0, 0, 0, 0, 0,  0, 1, 0, 0, 0, 0,  0, 0, 1, 0, 0, 0,  0, 0, 0, 1, 0, 0,  0, 0, 0, 0, 1, 0,  0, 0, 0, 0, 0, 1],
    );
  });

  it('cluster 3 diag-fore — top-right → bottom-left (5, 10, 15, 20, 25, 30)', () => {
    expect(Array.from(ORIENTATION_PRESETS[3])).toEqual(
      [0, 0, 0, 0, 0, 1,  0, 0, 0, 0, 1, 0,  0, 0, 0, 1, 0, 0,  0, 0, 1, 0, 0, 0,  0, 1, 0, 0, 0, 0,  1, 0, 0, 0, 0, 0],
    );
  });

  it('every preset activates exactly 6 pixels', () => {
    for (const pat of ORIENTATION_PRESETS) {
      const sum = pat.reduce((a, b) => a + b, 0);
      expect(sum).toBe(6);
    }
  });
});
