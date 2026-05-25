// Phase T — Aesthetics 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  hedonicValue, aestheticPleasure, symmetryScore, complexityEntropy,
  aestheticEpisode, isDisinterested,
  type FluencyMetrics,
} from '@/lib/snn-runtime/aesthetics';

describe('Phase T — Wundt-Berlyne Curve (inverted U)', () => {
  it('영역 영역 영역 → peak hedonic', () => {
    const peak = hedonicValue(0.5);
    expect(peak).toBeCloseTo(1.0, 5);
  });

  it('영역 영역 영역 영역 → 영역 hedonic', () => {
    expect(hedonicValue(0)).toBeLessThan(0.3);
    expect(hedonicValue(1)).toBeLessThan(0.3);
  });
});

describe('Phase T — Aesthetic Pleasure (Reber 2004 fluency)', () => {
  it('영역 fluency + 영역 영역 novelty → 영역 영역', () => {
    const m: FluencyMetrics = { perceptualFluency: 0.9, conceptualFluency: 0.9, novelty: 0.5 };
    expect(aestheticPleasure(m)).toBeCloseTo(0.9, 5);
  });

  it('영역 fluency → 영역 영역', () => {
    const m: FluencyMetrics = { perceptualFluency: 0.1, conceptualFluency: 0.1, novelty: 0.5 };
    expect(aestheticPleasure(m)).toBeLessThan(0.3);
  });

  it('영역 영역 영역 영역 → 영역 영역 (overwhelm)', () => {
    const m: FluencyMetrics = { perceptualFluency: 0.9, conceptualFluency: 0.9, novelty: 1.0 };
    expect(aestheticPleasure(m)).toBeLessThan(0.5);
  });
});

describe('Phase T — Symmetry Detection', () => {
  it('영역 영역 → high symmetry', () => {
    // 4x1 row, mirror: [1, 0, 0, 1]
    expect(symmetryScore([1, 0, 0, 1], 4)).toBe(1.0);
  });

  it('영역 영역 → no symmetry', () => {
    expect(symmetryScore([1, 0, 1, 0], 4)).toBeCloseTo(0, 5);
  });

  it('empty → 0', () => {
    expect(symmetryScore([], 4)).toBe(0);
  });
});

describe('Phase T — Complexity Entropy', () => {
  it('uniform pattern → 영역 entropy', () => {
    expect(complexityEntropy([0, 0, 0, 0])).toBeCloseTo(0, 5); // 영역 영역 (영역 영역 영역 max=0)
  });

  it('영역 영역 영역 → 영역 entropy', () => {
    expect(complexityEntropy([1, 0, 1, 0])).toBeCloseTo(1, 5);
  });

  it('empty → 0', () => {
    expect(complexityEntropy([])).toBe(0);
  });
});

describe('Phase T — Aesthetic Episode (Leder 2004 5-stage)', () => {
  it('영역 패턴 → 영역 aesthetic value', () => {
    const sym = [1, 0, 0, 1]; // perfect symmetry
    const ep = aestheticEpisode('art1', sym, 4, 0.5);
    expect(ep.perceptualAnalysis.symmetry).toBe(1.0);
    expect(ep.finalJudgment).toBeGreaterThan(0.5);
    expect(ep.emotionalEvaluation).toBeGreaterThan(0);
  });

  it('영역 영역 영역 → 영역 aesthetic', () => {
    const asym = [1, 0, 1, 0];
    const ep = aestheticEpisode('art2', asym, 4, 0.95);
    expect(ep.finalJudgment).toBeLessThan(0.5);
  });
});

describe('Phase T — Kantian Disinterested Pleasure (Kant 1790)', () => {
  it('영역 영역 + 영역 영역 → disinterested', () => {
    expect(isDisinterested(0.1, 0.8)).toBe(true);
  });

  it('영역 영역 → interested (영역 영역 영역 영역 영역 영역)', () => {
    expect(isDisinterested(0.7, 0.8)).toBe(false);
  });

  it('영역 영역 → not disinterested', () => {
    expect(isDisinterested(0.1, 0.3)).toBe(false);
  });
});

describe('Phase T — 통합 시나리오: art evaluation', () => {
  it('영역 영역 + balanced novelty → 영역 aesthetic + disinterested', () => {
    const pattern = [1, 0, 0, 1, 0, 1, 1, 0]; // 2x4
    const ep = aestheticEpisode('beauty', pattern, 4, 0.5);
    expect(ep.finalJudgment).toBeGreaterThan(0);
    // Even if not perfect symmetry, balanced metrics give moderate aesthetic.
  });
});
