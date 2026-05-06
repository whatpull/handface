// 4×4 orientation grid preset 의 16-dim 매핑 검증 (path Y, 2026-05-07).
// horizontal / vertical / diag-back / diag-fore 각 preset 이 사용자 명시 spec
// 정합 여부만 schema 단위 검증 — backend R-STDP 학습 결과는 별도 path.

import { describe, it, expect } from 'vitest';
import {
  ORIENTATION_PRESETS,
  ORIENTATION_LABELS,
  ORIENTATION_GLYPHS,
} from '@/components/snn/pipeline/GridInput';

describe('orientation grid presets', () => {
  it('always exposes 4 presets with 16-dim length', () => {
    expect(ORIENTATION_PRESETS).toHaveLength(4);
    expect(ORIENTATION_LABELS).toHaveLength(4);
    expect(ORIENTATION_GLYPHS).toHaveLength(4);
    for (const pat of ORIENTATION_PRESETS) {
      expect(pat).toHaveLength(16);
      for (const v of pat) expect(v === 0 || v === 1).toBe(true);
    }
  });

  it('cluster 0 horizontal — row 1 (index 4..7)', () => {
    expect(Array.from(ORIENTATION_PRESETS[0])).toEqual(
      [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    );
  });

  it('cluster 1 vertical — col 1 (index 1, 5, 9, 13)', () => {
    expect(Array.from(ORIENTATION_PRESETS[1])).toEqual(
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    );
  });

  it('cluster 2 diag-back — top-left → bottom-right (0, 5, 10, 15)', () => {
    expect(Array.from(ORIENTATION_PRESETS[2])).toEqual(
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    );
  });

  it('cluster 3 diag-fore — top-right → bottom-left (3, 6, 9, 12)', () => {
    expect(Array.from(ORIENTATION_PRESETS[3])).toEqual(
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    );
  });

  it('every preset activates exactly 4 pixels', () => {
    for (const pat of ORIENTATION_PRESETS) {
      const sum = pat.reduce((a, b) => a + b, 0);
      expect(sum).toBe(4);
    }
  });
});
