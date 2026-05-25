// Phase B — Self-Supervised Representation Learning 단위 테스트.
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 4 단계 검증.
// hand-crafted feature 제거 → STDP 자기 학습 영역 building blocks 영역
// algorithmic correctness 검증.

import { describe, it, expect } from 'vitest';
import {
  stdpWeightDelta, applyStdpUpdate,
  hoyerSparsity, spikeSparsity,
  wtaTopK, wtaWinner,
  homeostaticThresholdUpdate,
  cosineSimilarity, pairwiseDistinctiveness,
  DEFAULT_STDP_CONFIG, DEFAULT_HOMEOSTATIC_CONFIG,
} from '@/lib/snn-runtime/self-supervised';

describe('Phase B — STDP Weight Rule (Bi & Poo 1998)', () => {
  it('pre-before-post (deltaT > 0) → LTP (positive Δw)', () => {
    const delta = stdpWeightDelta(10); // pre 10ms before post
    expect(delta).toBeGreaterThan(0);
    expect(delta).toBeCloseTo(0.1 * Math.exp(-10 / 20), 5); // ≈ 0.0607
  });

  it('post-before-pre (deltaT < 0) → LTD (negative Δw)', () => {
    const delta = stdpWeightDelta(-10);
    expect(delta).toBeLessThan(0);
    expect(delta).toBeCloseTo(-0.12 * Math.exp(-10 / 20), 5);
  });

  it('deltaT === 0 → no update (causality ambiguity)', () => {
    expect(stdpWeightDelta(0)).toBe(0);
  });

  it('exponential decay — 큰 |deltaT| → 영역 영역 영역 작음', () => {
    const dShort = stdpWeightDelta(5);
    const dLong = stdpWeightDelta(50);
    expect(Math.abs(dShort)).toBeGreaterThan(Math.abs(dLong));
  });

  it('applyStdpUpdate — bounds enforcement', () => {
    // Strong LTP near wMax (1.0) → clamp.
    expect(applyStdpUpdate(0.99, 5, DEFAULT_STDP_CONFIG)).toBeCloseTo(1.0, 5);
    // Strong LTD near wMin (0.0) → clamp.
    expect(applyStdpUpdate(0.01, -5, DEFAULT_STDP_CONFIG)).toBe(0); // exact clamp to wMin
  });
});

describe('Phase B — Hoyer Sparsity (Hoyer 2004)', () => {
  it('uniform vector → sparsity ≈ 0', () => {
    const s = hoyerSparsity([0.5, 0.5, 0.5, 0.5]);
    expect(s).toBeCloseTo(0, 5);
  });

  it('single-active (one-hot) → sparsity ≈ 1 (영역 sparse)', () => {
    const s = hoyerSparsity([1, 0, 0, 0]);
    expect(s).toBeCloseTo(1, 5);
  });

  it('all-zero → 0 (edge case)', () => {
    expect(hoyerSparsity([0, 0, 0, 0])).toBe(0);
  });

  it('empty / single-element → 0', () => {
    expect(hoyerSparsity([])).toBe(0);
    expect(hoyerSparsity([5])).toBe(0);
  });

  it('intermediate sparsity 정합', () => {
    // 2-active in 4-dim — 약 0.41 (Hoyer formula)
    const s = hoyerSparsity([1, 1, 0, 0]);
    // n=4, L1=2, L2=sqrt(2), L1/L2=sqrt(2)
    // sparsity = (sqrt(4) - sqrt(2)) / (sqrt(4) - 1) = (2 - 1.414) / 1 = 0.586 / 1 = 0.293
    // 실제로는 (2 - sqrt(2)) / (2 - 1) ≈ 0.586
    expect(s).toBeCloseTo((2 - Math.sqrt(2)) / 1, 5);
  });
});

describe('Phase B — Spike Sparsity', () => {
  it('all silent → sparsity = 1', () => {
    expect(spikeSparsity([false, false, false])).toBe(1);
  });

  it('all firing → sparsity = 0', () => {
    expect(spikeSparsity([true, true, true])).toBe(0);
  });

  it('half firing → sparsity = 0.5', () => {
    expect(spikeSparsity([true, false, true, false])).toBe(0.5);
  });

  it('empty → 0 (edge case)', () => {
    expect(spikeSparsity([])).toBe(0);
  });
});

describe('Phase B — WTA Competitive Selection (Diehl & Cook 2015)', () => {
  it('wtaWinner — argmax index', () => {
    expect(wtaWinner([0.2, 0.8, 0.5, 0.1])).toBe(1);
    expect(wtaWinner([0.5, 0.5, 0.5])).toBe(0); // tie → first
    expect(wtaWinner([])).toBe(-1);
    expect(wtaWinner([0, 0, 0])).toBe(-1); // all-silent → -1
  });

  it('wtaTopK k=3 → top 3 indices', () => {
    const winners = wtaTopK([0.1, 0.8, 0.3, 0.9, 0.2, 0.5], 3);
    expect(winners).toEqual([3, 1, 5]); // sorted desc: 0.9, 0.8, 0.5
  });

  it('wtaTopK 영역 영역 0 인 firing rate 영역 제외', () => {
    const winners = wtaTopK([0, 0.5, 0, 0.3], 3);
    expect(winners).toEqual([1, 3]); // only 2 active
  });

  it('wtaTopK k > rates.length → all sorted', () => {
    const winners = wtaTopK([0.2, 0.5], 10);
    expect(winners).toEqual([1, 0]);
  });
});

describe('Phase B — Homeostatic Threshold (Turrigiano 2008)', () => {
  it('activity > target → threshold ↑ (덜 fire)', () => {
    const next = homeostaticThresholdUpdate(-55, 0.5, DEFAULT_HOMEOSTATIC_CONFIG);
    expect(next).toBeGreaterThan(-55);
  });

  it('activity < target → threshold ↓ (더 fire)', () => {
    const next = homeostaticThresholdUpdate(-55, 0.01, DEFAULT_HOMEOSTATIC_CONFIG);
    expect(next).toBeLessThan(-55);
  });

  it('activity === target → no change', () => {
    const next = homeostaticThresholdUpdate(-55, DEFAULT_HOMEOSTATIC_CONFIG.targetRate, DEFAULT_HOMEOSTATIC_CONFIG);
    expect(next).toBe(-55);
  });

  it('bounds enforcement', () => {
    // 매우 높은 activity → threshold cap 영역 thresholdMax.
    // formula: delta = (activity - 0.1) × 0.01 × 10 → 영역 activity 영역 영역 클램프.
    const high = homeostaticThresholdUpdate(-55, 1000, DEFAULT_HOMEOSTATIC_CONFIG);
    expect(high).toBe(DEFAULT_HOMEOSTATIC_CONFIG.thresholdMax);

    // 매우 낮은 activity → threshold floor.
    const low = homeostaticThresholdUpdate(-55, -1000, DEFAULT_HOMEOSTATIC_CONFIG);
    expect(low).toBe(DEFAULT_HOMEOSTATIC_CONFIG.thresholdMin);
  });
});

describe('Phase B — Feature Distinctiveness (패턴 ② 진단 metric)', () => {
  it('cosineSimilarity — orthogonal → 0', () => {
    expect(cosineSimilarity([1, 0, 0], [0, 1, 0])).toBe(0);
  });

  it('cosineSimilarity — identical → 1', () => {
    expect(cosineSimilarity([0.5, 0.7, 0.2], [0.5, 0.7, 0.2])).toBeCloseTo(1, 5);
  });

  it('cosineSimilarity — empty / mismatched length → 0', () => {
    expect(cosineSimilarity([], [])).toBe(0);
    expect(cosineSimilarity([1, 2], [1, 2, 3])).toBe(0);
  });

  it('pairwiseDistinctiveness — orthogonal 패턴 영역 = 1', () => {
    const d = pairwiseDistinctiveness([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
    ]);
    expect(d).toBe(1); // all pairs orthogonal → distance 1.0
  });

  it('pairwiseDistinctiveness — identical 패턴 영역 = 0', () => {
    const d = pairwiseDistinctiveness([
      [0.5, 0.5],
      [0.5, 0.5],
    ]);
    expect(d).toBeCloseTo(0, 5);
  });

  it('hand-crafted feature collision 시나리오 — 패턴 ② 정합', () => {
    // 4×4 Top row vs 5×5 Top row 영역 derived features ~92% 겹침 시나리오.
    const topRow4x4 = [1, 1, 1, 1, 0, 0, 0, 0, 1, 0.5]; // raw + derived
    const topRow5x5 = [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0.5]; // 비슷한 signature
    // 길이 영역 영역 영역 다르므로 영역 cosine 계산 영역 0 (edge case).
    expect(cosineSimilarity(topRow4x4, topRow5x5)).toBe(0); // length mismatch

    // 같은 dim 영역 영역 high overlap 영역 시뮬레이션.
    const a = [1, 1, 1, 1, 0, 0, 0, 0]; // Top row
    const b = [0, 0, 0, 0, 1, 1, 1, 1]; // Bottom row
    expect(cosineSimilarity(a, b)).toBe(0); // 완전 orthogonal (raw 영역 영역 영역).

    const c = [1, 1, 1, 0, 0, 0, 0, 0]; // 3-active overlapping with a
    const sim = cosineSimilarity(a, c);
    expect(sim).toBeGreaterThan(0.8); // high overlap → high similarity (cluster collision risk).
  });
});

describe('Phase B — 통합 시나리오: STDP-based feature emergence', () => {
  it('반복 학습 시 weight 영역 수렴 (LTP 영역 영역 영역 → 영역 활성 패턴 영역 강화)', () => {
    let weight = 0.5;
    // 10 회 pre-before-post (5ms gap) → weight 누적 LTP
    for (let i = 0; i < 10; i += 1) {
      weight = applyStdpUpdate(weight, 5);
    }
    expect(weight).toBeCloseTo(1.0, 5); // bounded at wMax
  });

  it('LTD dominance 시나리오 — 영역 활성 synapse 영역 weight 감소', () => {
    let weight = 0.5;
    // 10 회 post-before-pre (-5ms) → LTD
    for (let i = 0; i < 10; i += 1) {
      weight = applyStdpUpdate(weight, -5);
    }
    expect(weight).toBe(0); // bounded at wMin
  });

  it('homeostatic 영역 STDP 통합 — runaway prevention', () => {
    // STDP 영역 영역 LTP 만 영역 영역 weight saturate → homeostatic 영역 threshold ↑
    // 영역 firing rate 영역 → STDP LTP 영역 (영역 fire 영역 영역 영역 영역).
    let threshold = -55;
    const activityHistory: number[] = [0.5, 0.6, 0.7, 0.8]; // 영역 영역 영역 활성
    for (const activity of activityHistory) {
      threshold = homeostaticThresholdUpdate(threshold, activity);
    }
    expect(threshold).toBeGreaterThan(-55); // self-regulation
  });
});
