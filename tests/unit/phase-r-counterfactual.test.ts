// Phase R — Counterfactual Reasoning 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  createCausalGraph, addCausalEdge,
  correlationStrength, intervene, interventionalEffect,
  counterfactualEffect, isActualCause, counterfactualRegret,
} from '@/lib/snn-runtime/counterfactual';

describe('Phase R — Causal Graph', () => {
  it('addCausalEdge — nodes + edges 영역', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'rain', effect: 'wet_grass', strength: 0.9 });
    expect(g.nodes.has('rain')).toBe(true);
    expect(g.nodes.has('wet_grass')).toBe(true);
    expect(g.edges).toHaveLength(1);
  });
});

describe('Phase R — Associational (Level 1)', () => {
  it('direct edge → strength 반환', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'a', effect: 'b', strength: 0.7 });
    expect(correlationStrength(g, 'a', 'b')).toBe(0.7);
  });

  it('transitive path → multiplicative', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'a', effect: 'b', strength: 0.8 });
    g = addCausalEdge(g, { cause: 'b', effect: 'c', strength: 0.5 });
    expect(correlationStrength(g, 'a', 'c')).toBeCloseTo(0.4, 5); // 0.8 × 0.5
  });

  it('no path → 0', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'a', effect: 'b', strength: 0.8 });
    expect(correlationStrength(g, 'b', 'a')).toBe(0); // direction matters
  });
});

describe('Phase R — Interventional (Level 2, do-calculus)', () => {
  it('intervene → cuts incoming edges', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'x', effect: 'y', strength: 0.8 });
    g = addCausalEdge(g, { cause: 'z', effect: 'x', strength: 0.5 }); // z → x
    const mutilated = intervene(g, 'x');
    // Edges INTO x removed (z→x), edges OUT of x kept (x→y).
    expect(mutilated.edges).toHaveLength(1);
    expect(mutilated.edges[0].effect).toBe('y');
  });

  it('do(x) → effect prob', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'rain', effect: 'wet', strength: 0.9 });
    expect(interventionalEffect(g, 'rain', 'wet')).toBe(0.9);
  });
});

describe('Phase R — Counterfactual (Level 3)', () => {
  it('counterfactual — would have been', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'studied', effect: 'passed', strength: 0.9 });
    const result = counterfactualEffect(g, {
      actualState: new Map([['studied', false], ['passed', false]]),
      counterfactualCause: 'studied',
      counterfactualValue: true,
      targetEffect: 'passed',
    });
    expect(result.wouldHaveBeen).toBeCloseTo(0.9, 5);
    expect(result.actuallyWas).toBe(false);
    expect(result.counterfactualDelta).toBeCloseTo(0.9, 5);
  });
});

describe('Phase R — Actual Causation (Halpern & Pearl 2005)', () => {
  it('removing cause → effect prob drops significantly → actual cause', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'flame', effect: 'fire', strength: 0.95 });
    const result = isActualCause(g, 'flame', 'fire', true);
    expect(result.isCause).toBe(true);
  });

  it('effect 영역 영역 → not cause', () => {
    const g = createCausalGraph();
    const result = isActualCause(g, 'x', 'y', false);
    expect(result.isCause).toBe(false);
  });

  it('weak edge → not actual cause', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'x', effect: 'y', strength: 0.1 });
    const result = isActualCause(g, 'x', 'y', true);
    expect(result.isCause).toBe(false); // 0.1 < 0.2 threshold
  });
});

describe('Phase R — Counterfactual Regret (Roese 1997)', () => {
  it('영역 결과 영역 best 영역 ↓ → regret', () => {
    expect(counterfactualRegret(0.3, 0.9)).toBeCloseTo(0.6, 5);
  });

  it('actual = best → 영역 regret', () => {
    expect(counterfactualRegret(0.8, 0.8)).toBe(0);
  });

  it('actual > best → 영역 영역 (0 floor)', () => {
    expect(counterfactualRegret(0.9, 0.7)).toBe(0);
  });
});

describe('Phase R — 통합 시나리오: rain + sprinkler → wet grass', () => {
  it('영역 cause 영역 영역 영역 → actual causation', () => {
    let g = createCausalGraph();
    g = addCausalEdge(g, { cause: 'rain', effect: 'wet_grass', strength: 0.9 });
    g = addCausalEdge(g, { cause: 'sprinkler', effect: 'wet_grass', strength: 0.7 });

    // 영역 영역 rain occurred AND wet_grass occurred → rain 영역 actual cause?
    const rainCause = isActualCause(g, 'rain', 'wet_grass', true);
    expect(rainCause.isCause).toBe(true);

    // Counterfactual: if rain hadn't happened, would wet_grass still occur?
    const cf = counterfactualEffect(g, {
      actualState: new Map([['rain', true], ['wet_grass', true]]),
      counterfactualCause: 'rain',
      counterfactualValue: false,
      targetEffect: 'wet_grass',
    });
    // counterfactual = 1 - rain→wet (0.9) = 0.1, actual = 1 → delta -0.9
    expect(cf.wouldHaveBeen).toBeCloseTo(0.1, 5);
  });
});
