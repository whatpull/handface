// Phase C — Meta-Plasticity 단위 테스트.
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 2 단계 검증.
// algorithm correctness 영역 검증: measured metrics → hyperparameter
// adjustment 영역 정확 적용 + bound enforcement + BCM 정합.

import { describe, it, expect } from 'vitest';
import {
  tuneVigilance, tuneCascadeWeight, tuneOutputWeight,
  tuneHyperparameters, analyzeClusterMap,
  META_PLASTICITY_BOUNDS,
  type SubstrateHyperparams, type SubstrateMetrics,
} from '@/lib/snn-runtime/meta-plasticity';

function defaultParams(): SubstrateHyperparams {
  return { vigilance: 0.15, v1L4Weight: 11.0, v2L5OutWeight: 16.0 };
}

function makeMetrics(overrides: Partial<SubstrateMetrics> = {}): SubstrateMetrics {
  return {
    recall: 1.0,
    noise: 0.88,
    partial: 1.0,
    wtaMargin: 0.85,
    unlearnedCount: 0,
    collisionCount: 0,
    ...overrides,
  };
}

describe('Phase C — analyzeClusterMap', () => {
  it('정상 cluster map → collision=0, unlearned=0', () => {
    const r = analyzeClusterMap([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(r.collisionCount).toBe(0);
    expect(r.unlearnedCount).toBe(0);
  });

  it('-1 패턴 1개 → unlearned=1', () => {
    const r = analyzeClusterMap([0, -1, 2, 3]);
    expect(r.unlearnedCount).toBe(1);
    expect(r.collisionCount).toBe(0);
  });

  it('6×6 measurement (b85eece) — [2,-1,2,3,4,5,6,0] → collision=1, unlearned=1', () => {
    // slot 0+2 → cluster 2 (1 collision), slot 1 → -1 (unlearned)
    const r = analyzeClusterMap([2, -1, 2, 3, 4, 5, 6, 0]);
    expect(r.unlearnedCount).toBe(1);
    expect(r.collisionCount).toBe(1);
  });

  it('3 패턴 같은 cluster 매핑 → collision=2', () => {
    const r = analyzeClusterMap([0, 0, 0, 1]);
    expect(r.collisionCount).toBe(2);
  });
});

describe('Phase C — tuneVigilance', () => {
  it('정상 metrics → no change (rule 안 발동)', () => {
    const r = tuneVigilance(defaultParams(), makeMetrics());
    expect(r.vigilance).toBe(0.15);
    expect(r.reason).toBeNull();
  });

  it('collision 발생 + recall < 0.9 → vigilance ↑', () => {
    const r = tuneVigilance(defaultParams(), makeMetrics({ collisionCount: 1, recall: 0.75 }));
    expect(r.vigilance).toBeCloseTo(0.20, 5);
    expect(r.reason).toContain('vigilance');
  });

  it('vigilance max 도달 시 cap', () => {
    const params: SubstrateHyperparams = { ...defaultParams(), vigilance: META_PLASTICITY_BOUNDS.vigilanceMax };
    const r = tuneVigilance(params, makeMetrics({ collisionCount: 5, recall: 0.5 }));
    expect(r.vigilance).toBe(META_PLASTICITY_BOUNDS.vigilanceMax);
    expect(r.reason).toBeNull();
  });

  it('recall 매우 낮음 + collision 0 + unlearned 0 → vigilance ↓ (over-fragmentation)', () => {
    const r = tuneVigilance(defaultParams(), makeMetrics({ recall: 0.3 }));
    expect(r.vigilance).toBeCloseTo(0.10, 5);
    expect(r.reason).toContain('over-fragmentation');
  });
});

describe('Phase C — tuneCascadeWeight', () => {
  it('정상 metrics → no change', () => {
    const r = tuneCascadeWeight(defaultParams(), makeMetrics());
    expect(r.v1L4Weight).toBe(11.0);
    expect(r.reason).toBeNull();
  });

  it('Bottom row 학습 실패 (unlearned > 0) → V1_L4 weight ↑', () => {
    const r = tuneCascadeWeight(defaultParams(), makeMetrics({ unlearnedCount: 1, recall: 0.75 }));
    expect(r.v1L4Weight).toBeCloseTo(12.0, 5);
    expect(r.reason).toContain('cascade entry 강화');
  });

  it('V1_L4 weight max 도달 시 cap', () => {
    const params: SubstrateHyperparams = { ...defaultParams(), v1L4Weight: META_PLASTICITY_BOUNDS.v1L4WeightMax };
    const r = tuneCascadeWeight(params, makeMetrics({ unlearnedCount: 3 }));
    expect(r.v1L4Weight).toBe(META_PLASTICITY_BOUNDS.v1L4WeightMax);
    expect(r.reason).toBeNull();
  });
});

describe('Phase C — tuneOutputWeight', () => {
  it('정상 metrics → no change', () => {
    const r = tuneOutputWeight(defaultParams(), makeMetrics());
    expect(r.v2L5OutWeight).toBe(16.0);
    expect(r.reason).toBeNull();
  });

  it('over-confident + low noise → V2_L5→OUT ↓ (cross-fire 감소)', () => {
    // 027288f 시나리오 정합: WTA 0.93 + noise 0.38 → weight ↓
    const params: SubstrateHyperparams = { ...defaultParams(), v2L5OutWeight: 20.0 };
    const r = tuneOutputWeight(params, makeMetrics({ wtaMargin: 0.93, noise: 0.38 }));
    expect(r.v2L5OutWeight).toBeCloseTo(19.5, 5);
    expect(r.reason).toContain('over-confident');
  });

  it('under-driven + low noise + high recall → V2_L5→OUT ↑', () => {
    const r = tuneOutputWeight(defaultParams(), makeMetrics({ wtaMargin: 0.4, noise: 0.4, recall: 0.95 }));
    expect(r.v2L5OutWeight).toBeCloseTo(16.5, 5);
    expect(r.reason).toContain('under-driven');
  });

  it('V2_L5→OUT bounds 준수', () => {
    const minP: SubstrateHyperparams = { ...defaultParams(), v2L5OutWeight: META_PLASTICITY_BOUNDS.v2L5OutWeightMin };
    const rMin = tuneOutputWeight(minP, makeMetrics({ wtaMargin: 0.93, noise: 0.38 }));
    expect(rMin.v2L5OutWeight).toBe(META_PLASTICITY_BOUNDS.v2L5OutWeightMin);

    const maxP: SubstrateHyperparams = { ...defaultParams(), v2L5OutWeight: META_PLASTICITY_BOUNDS.v2L5OutWeightMax };
    const rMax = tuneOutputWeight(maxP, makeMetrics({ wtaMargin: 0.4, noise: 0.4, recall: 0.95 }));
    expect(rMax.v2L5OutWeight).toBe(META_PLASTICITY_BOUNDS.v2L5OutWeightMax);
  });
});

describe('Phase C — tuneHyperparameters (top-level)', () => {
  it('정상 metrics → no change', () => {
    const r = tuneHyperparameters(defaultParams(), makeMetrics());
    expect(r.changed).toBe(false);
    expect(r.reasons).toHaveLength(0);
  });

  it('6×6 실제 시나리오 (b85eece) — collision + unlearned → vigilance + cascade weight 영역 동시 조정', () => {
    // 6×6 측정 metrics: recall=0.75, noise=0.38, partial=0.38, WTA=0.64,
    //   patternToCluster=[2,-1,2,3,4,5,6,0] → collision=1, unlearned=1
    const metrics = makeMetrics({
      recall: 0.75, noise: 0.38, partial: 0.38, wtaMargin: 0.64,
      unlearnedCount: 1, collisionCount: 1,
    });
    const r = tuneHyperparameters(defaultParams(), metrics);
    expect(r.changed).toBe(true);
    expect(r.next.vigilance).toBeGreaterThan(0.15);
    expect(r.next.v1L4Weight).toBeGreaterThan(11.0);
    expect(r.reasons.length).toBeGreaterThanOrEqual(2);
  });

  it('027288f 시나리오 (V2_L5→OUT 20 + over-confident + noise -50%p)', () => {
    // 측정: WTA 0.93 + noise 0.38 → output weight 영역 자동 감소 영역 영역
    // (사람이 revert 영역 영역 영역 영역 자기 조정 영역 정합)
    const params: SubstrateHyperparams = { ...defaultParams(), v2L5OutWeight: 20.0 };
    const r = tuneHyperparameters(params, makeMetrics({ wtaMargin: 0.93, noise: 0.38 }));
    expect(r.next.v2L5OutWeight).toBeCloseTo(19.5, 5);
    expect(r.changed).toBe(true);
  });

  it('수렴 시나리오 — 반복 호출 시 stable point 도달', () => {
    let params = defaultParams();
    const initialMetrics = makeMetrics({
      recall: 0.75, unlearnedCount: 1, collisionCount: 1, noise: 0.38, wtaMargin: 0.64,
    });
    // 10 iteration 영역 vigilance / v1L4 weight 영역 max bound 영역 수렴
    for (let i = 0; i < 10; i += 1) {
      const r = tuneHyperparameters(params, initialMetrics);
      params = r.next;
    }
    // vigilance: 0.15 → 0.65 (10 iterations × 0.05 step)
    expect(params.vigilance).toBeCloseTo(0.65, 5);
    // v1L4: 11.0 → 17.0 max bound (6 iterations 영역 cap 도달 → 그 이후 stable)
    expect(params.v1L4Weight).toBe(META_PLASTICITY_BOUNDS.v1L4WeightMax);
  });

  it('AdaBoost + meta-plasticity 통합 — 약한 substrate 영역 영역 자기 개선', () => {
    // 시나리오: 6×6 substrate 영역 초기 약함 (Bottom row -1)
    // 5 iteration meta-plasticity 영역 영역 weight 영역 영역 → 학습 성공
    let params = defaultParams();
    const reasons: string[] = [];

    // iter 1-3: collision + unlearned → vigilance + cascade 영역 영역
    for (let i = 0; i < 3; i += 1) {
      const metrics = makeMetrics({
        recall: 0.75, unlearnedCount: 1, collisionCount: 1, noise: 0.38, wtaMargin: 0.5,
      });
      const r = tuneHyperparameters(params, metrics);
      params = r.next;
      reasons.push(...r.reasons);
    }
    expect(params.vigilance).toBeCloseTo(0.30, 5); // 3 iterations × 0.05
    expect(params.v1L4Weight).toBeCloseTo(14.0, 5); // 3 iterations × 1.0
    expect(reasons.length).toBeGreaterThanOrEqual(6); // 3 × 2 rules
  });
});
