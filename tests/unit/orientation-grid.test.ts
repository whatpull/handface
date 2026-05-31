// 5×5 orientation grid preset 의 25-dim 매핑 검증 (Phase 2A.1, 2026-05-31).
// horizontal / vertical / diag-back / diag-fore 각 preset 이 사용자 명시 spec
// 정합 여부만 schema 단위 검증 — backend R-STDP 학습 결과는 별도 path.
//
// 직전 4×4 (16-dim, path Y 2026-05-07) → 5×5 (25-dim) 동기화 (substrate
// orientation-5x5 정합). 5×5 index map:
//    0  1  2  3  4
//    5  6  7  8  9
//   10 11 12 13 14
//   15 16 17 18 19
//   20 21 22 23 24

import { describe, it, expect } from 'vitest';
import {
  ORIENTATION_PRESETS,
  ORIENTATION_LABELS,
  ORIENTATION_GLYPHS,
} from '@/components/snn/pipeline/GridInput';

describe('orientation grid presets', () => {
  it('always exposes 4 presets with 25-dim length', () => {
    expect(ORIENTATION_PRESETS).toHaveLength(4);
    expect(ORIENTATION_LABELS).toHaveLength(4);
    expect(ORIENTATION_GLYPHS).toHaveLength(4);
    for (const pat of ORIENTATION_PRESETS) {
      expect(pat).toHaveLength(25);
      for (const v of pat) expect(v === 0 || v === 1).toBe(true);
    }
  });

  it('cluster 0 horizontal — row 1 (index 5..9)', () => {
    expect(Array.from(ORIENTATION_PRESETS[0])).toEqual(
      [0, 0, 0, 0, 0,  1, 1, 1, 1, 1,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0],
    );
  });

  it('cluster 1 vertical — col 1 (index 1, 6, 11, 16, 21)', () => {
    expect(Array.from(ORIENTATION_PRESETS[1])).toEqual(
      [0, 1, 0, 0, 0,  0, 1, 0, 0, 0,  0, 1, 0, 0, 0,  0, 1, 0, 0, 0,  0, 1, 0, 0, 0],
    );
  });

  it('cluster 2 diag-back — top-left → bottom-right (0, 6, 12, 18, 24)', () => {
    expect(Array.from(ORIENTATION_PRESETS[2])).toEqual(
      [1, 0, 0, 0, 0,  0, 1, 0, 0, 0,  0, 0, 1, 0, 0,  0, 0, 0, 1, 0,  0, 0, 0, 0, 1],
    );
  });

  it('cluster 3 diag-fore — top-right → bottom-left (4, 8, 12, 16, 20)', () => {
    expect(Array.from(ORIENTATION_PRESETS[3])).toEqual(
      [0, 0, 0, 0, 1,  0, 0, 0, 1, 0,  0, 0, 1, 0, 0,  0, 1, 0, 0, 0,  1, 0, 0, 0, 0],
    );
  });

  it('every preset activates exactly 5 pixels', () => {
    for (const pat of ORIENTATION_PRESETS) {
      const sum = pat.reduce((a, b) => a + b, 0);
      expect(sum).toBe(5);
    }
  });
});
