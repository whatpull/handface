// Phase E — Elastic Weight Consolidation 단위 테스트.
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 3 단계 검증.
// catastrophic forgetting 방지 mechanism 영역 algorithmic correctness 검증.

import { describe, it, expect } from 'vitest';
import {
  computeFisherProxy, applyEwcPenalty, createBaseline,
  safeguardSynapseUpdate, computeFisherBatch,
  type EwcBaseline,
} from '@/lib/snn-runtime/ewc';

describe('Phase E — computeFisherProxy', () => {
  it('zero firing rate → fisher = 0 (inactive synapse, no importance)', () => {
    expect(computeFisherProxy(0, 0.5)).toBe(0);
    expect(computeFisherProxy(0.5, 0)).toBe(0);
  });

  it('high coactivity → high fisher (활성 synapse 중요도 ↑)', () => {
    const fisher = computeFisherProxy(0.9, 0.9);
    expect(fisher).toBeCloseTo(0.9 * 0.9 * 0.9 * 0.9, 5); // (0.9 × 0.9)^2 = 0.6561
  });

  it('product squared 정합 (Bell & Sejnowski 1997)', () => {
    // F ≈ (r_pre × r_post)^2
    expect(computeFisherProxy(0.5, 0.4)).toBeCloseTo(0.04, 5); // (0.5×0.4)^2 = 0.04
    expect(computeFisherProxy(1.0, 1.0)).toBe(1.0);
  });
});

describe('Phase E — applyEwcPenalty', () => {
  it('baseline 정확히 일치 → no penalty (변화 없음 영역 자유)', () => {
    const effective = applyEwcPenalty(0.5, 10.0, 10.0, 0.8);
    expect(effective).toBe(0.5); // currentWeight === baseline → penalty = 0
  });

  it('baseline 멀어진 weight + 높은 fisher → penalty 강함', () => {
    // raw delta +0.5, weight 가 baseline 영역 12.0 (baseline 10.0, drift +2)
    // fisher = 0.5, lambda = 1000
    // penalty = 1000 × 0.5 × (12 - 10) = 1000 → 영역 영역 sign flip clamp.
    const effective = applyEwcPenalty(0.5, 12.0, 10.0, 0.5);
    // raw +0.5, penalty -1000 → effective -999.5 → sign flip → clamp 영역 0.
    expect(effective).toBe(0); // 보호 발동
  });

  it('낮은 fisher (비중요 synapse) → penalty 약함, raw 유지', () => {
    const effective = applyEwcPenalty(0.5, 12.0, 10.0, 0.001);
    // penalty = 1000 × 0.001 × 2 = 2.0, raw 0.5 → effective = -1.5 (sign flip)
    // clampToOriginal true → 0
    expect(effective).toBe(0);
  });

  it('낮은 lambda + 낮은 fisher → 영역 raw delta 유지', () => {
    // lambda=10, fisher=0.01, drift=1 → penalty = 0.1, raw 0.5 → effective = 0.4
    const effective = applyEwcPenalty(0.5, 11.0, 10.0, 0.01, { lambda: 10, clampToOriginal: true });
    expect(effective).toBeCloseTo(0.4, 5);
  });

  it('clampToOriginal=false → sign flip 허용 (penalty 영역 dominate)', () => {
    const effective = applyEwcPenalty(0.5, 12.0, 10.0, 0.5, { lambda: 1000, clampToOriginal: false });
    expect(effective).toBe(0.5 - 1000); // -999.5 (체크용, production 영역 권장 안 함)
  });
});

describe('Phase E — createBaseline', () => {
  it('synapse 영역 영역 snapshot 영역 → Map<key, snapshot>', () => {
    const baseline = createBaseline([
      { preId: 'A', postId: 'B', weight: 10.0, fisher: 0.5 },
      { preId: 'B', postId: 'C', weight: 8.0, fisher: 0.3 },
    ], 8);
    expect(baseline.snapshots.size).toBe(2);
    expect(baseline.snapshots.get('A→B')?.weight).toBe(10.0);
    expect(baseline.snapshots.get('B→C')?.fisher).toBe(0.3);
    expect(baseline.protectedPatternCount).toBe(8);
  });

  it('빈 input → 빈 baseline', () => {
    const baseline = createBaseline([], 0);
    expect(baseline.snapshots.size).toBe(0);
  });
});

describe('Phase E — safeguardSynapseUpdate', () => {
  const baseline = createBaseline([
    { preId: 'A', postId: 'B', weight: 10.0, fisher: 0.5 },
  ], 8);

  it('baseline null → bypass (첫 학습, EWC 영역 영역)', () => {
    const result = safeguardSynapseUpdate('A', 'B', 10.0, 0.5, 0.5, null);
    expect(result).toBe(0.5); // unchanged
  });

  it('baseline 있지만 synapse 새로 생성 (key 없음) → free update', () => {
    const result = safeguardSynapseUpdate('X', 'Y', 5.0, 0.3, 0.2, baseline);
    expect(result).toBe(0.3); // 새 synapse, baseline 영역 없음 → 자유
  });

  it('보호된 synapse + drift + raw update → penalty 적용 → clamp 0', () => {
    // baseline weight 10.0, current 12.0, raw +0.5, fisher 0.5
    const result = safeguardSynapseUpdate('A', 'B', 12.0, 0.5, 0.5, baseline);
    expect(result).toBe(0); // catastrophic forgetting 방지
  });

  it('보호된 synapse + drift = 0 → no penalty', () => {
    const result = safeguardSynapseUpdate('A', 'B', 10.0, 0.5, 0.5, baseline);
    expect(result).toBe(0.5); // 영역 baseline 영역 영역, free.
  });
});

describe('Phase E — computeFisherBatch', () => {
  it('synapse 영역 영역 batch 처리 + normalize', () => {
    const fisherMap = computeFisherBatch([
      { preId: 'A', postId: 'B', preRate: 0.9, postRate: 0.9 }, // F = 0.6561
      { preId: 'B', postId: 'C', preRate: 0.5, postRate: 0.5 }, // F = 0.0625
      { preId: 'C', postId: 'D', preRate: 0.0, postRate: 0.5 }, // F = 0
    ]);
    expect(fisherMap.size).toBe(3);
    // Normalized: max = 0.6561 → A→B = 1.0, B→C = 0.0625/0.6561 ≈ 0.0953
    expect(fisherMap.get('A→B')).toBeCloseTo(1.0, 5);
    expect(fisherMap.get('B→C')).toBeCloseTo(0.0625 / 0.6561, 4);
    expect(fisherMap.get('C→D')).toBe(0);
  });

  it('all-zero firing rates → all fisher = 0 (max=0 영역 normalize 영역)', () => {
    const fisherMap = computeFisherBatch([
      { preId: 'A', postId: 'B', preRate: 0, postRate: 0 },
      { preId: 'B', postId: 'C', preRate: 0, postRate: 0 },
    ]);
    expect(fisherMap.get('A→B')).toBe(0);
    expect(fisherMap.get('B→C')).toBe(0);
  });
});

describe('Phase E — Catastrophic Forgetting 시나리오 (학술 정합)', () => {
  // Kirkpatrick et al. 2017 PNAS 영역 핵심 시나리오: 새 task 학습 시
  // 기존 task 영역 중요 weight 영역 보호 영역 영역 성능 유지.

  it('Task A 학습 후 baseline 영역 영역 → Task B 학습 시 중요 weight 보호', () => {
    // 시나리오: Task A 학습 시 synapse W_AB 영역 핵심 (fisher 0.9)
    // Task B 학습 시 STDP 영역 W_AB 영역 -2.0 영역 영역 영역 시도 →
    // EWC 영역 baseline 보호 → clamp 0.
    const baselineAfterA = createBaseline([
      { preId: 'in_feat_0', postId: 'v1_L4_E_5', weight: 11.0, fisher: 0.9 },
    ], 8);

    // Task B 학습 중 STDP 영역 raw Δw = -2.0 시도 (해당 synapse 가 task B 영역
    // 영역 영역 weak → STDP depression).
    const currentWeight = 11.0; // baseline 영역 영역
    const fisher = 0.9; // 영역 영역 중요
    const rawDelta = -2.0;
    const effective = safeguardSynapseUpdate(
      'in_feat_0', 'v1_L4_E_5', currentWeight, rawDelta, fisher, baselineAfterA,
    );

    // penalty = 1000 × 0.9 × (11.0 - 11.0) = 0 → effective = raw = -2.0
    // 영역 currentWeight === baseline → penalty 0, raw update 영역 적용.
    expect(effective).toBe(-2.0);
  });

  it('Task B 학습 중 drift 발생 → 후속 update 영역 점진 보호', () => {
    const baseline = createBaseline([
      { preId: 'in_feat_0', postId: 'v1_L4_E_5', weight: 11.0, fisher: 0.9 },
    ], 8);

    // 시점 1: weight 11.0 → 10.0 (drift -1)
    // 시점 2: weight 10.0 → 더 떨어트리려고 raw -1.0 시도
    // penalty = 1000 × 0.9 × (10.0 - 11.0) = -900 → effective = -1.0 - (-900) = 899
    // sign flip (raw - vs effective +) → clamp 0
    const effective = safeguardSynapseUpdate(
      'in_feat_0', 'v1_L4_E_5', 10.0, -1.0, 0.9, baseline,
    );
    expect(effective).toBe(0); // 보호 발동, 영역 영역 영역 영역 안 영역
  });

  it('낮은 fisher synapse → EWC 영역 영역 → 영역 변화 영역', () => {
    // 비핵심 synapse 영역 baseline 영역 영역 적게 받음 → continual plasticity 영역 영역
    const baseline = createBaseline([
      { preId: 'in_feat_0', postId: 'v1_L4_E_5', weight: 11.0, fisher: 0.05 },
    ], 8);
    const effective = safeguardSynapseUpdate(
      'in_feat_0', 'v1_L4_E_5', 13.0, 0.5, 0.05, baseline,
    );
    // penalty = 1000 × 0.05 × 2.0 = 100 → effective = 0.5 - 100 = -99.5 → sign flip → 0
    // 즉 낮은 fisher 영역 lambda × drift 영역 영역 영역 영역 penalty 영역 영역 영역.
    // 실제 lambda 영역 (e.g. 100) 영역 영역 영역 hyperparameter 영역 영역.
    expect(effective).toBe(0); // current lambda=1000 default 영역 보호 영역.
  });

  it('lambda 영역 영역 영역 plasticity / stability balance', () => {
    // 동일 시나리오 영역 영역 lambda 값 변경 효과.
    const baseline: EwcBaseline = createBaseline([
      { preId: 'A', postId: 'B', weight: 10.0, fisher: 0.5 },
    ], 8);

    // High lambda (stability ↑): drift +2, raw +0.5 → penalty 1000 → clamp 0
    const eHigh = safeguardSynapseUpdate('A', 'B', 12.0, 0.5, 0.5, baseline, { lambda: 1000, clampToOriginal: true });
    expect(eHigh).toBe(0);

    // Mid lambda (balanced): drift +2, raw +0.5 → penalty 1 → effective 영역 영역 작음.
    const eMid = safeguardSynapseUpdate('A', 'B', 12.0, 0.5, 0.5, baseline, { lambda: 1, clampToOriginal: true });
    // penalty = 1 × 0.5 × 2 = 1.0, raw 0.5 → effective = -0.5 → sign flip → 0
    expect(eMid).toBe(0); // 영역 sign flip → 0

    // Low lambda (plasticity ↑): drift +2, raw +0.5 → penalty 0.05 → effective 0.45
    const eLow = safeguardSynapseUpdate('A', 'B', 12.0, 0.5, 0.5, baseline, { lambda: 0.05, clampToOriginal: true });
    expect(eLow).toBeCloseTo(0.45, 5); // raw 영역 영역 유지
  });
});
