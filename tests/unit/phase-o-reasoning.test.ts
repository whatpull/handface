// Phase O — Reasoning / Logic 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  deduce, induceRule, abduceBest, detectConfirmationBias,
  constructMentalModel, addScenario, necessarilyTrue,
  type Proposition, type ImplicationRule, type Hypothesis, type Evidence,
} from '@/lib/snn-runtime/reasoning';

describe('Phase O — Deduction (Modus Ponens)', () => {
  it('A=true + (A→B) → B=true', () => {
    const props: Proposition[] = [
      { id: 'A', truthValue: true },
      { id: 'B', truthValue: null },
    ];
    const rules: ImplicationRule[] = [
      { name: 'A_implies_B', antecedents: ['A'], consequent: 'B' },
    ];
    const result = deduce(props, rules);
    const B = result.derived.find(p => p.id === 'B');
    expect(B?.truthValue).toBe(true);
    expect(result.applications).toContain('A_implies_B');
  });

  it('transitive chain: A→B, B→C, A=true → C=true', () => {
    const props: Proposition[] = [
      { id: 'A', truthValue: true },
      { id: 'B', truthValue: null },
      { id: 'C', truthValue: null },
    ];
    const rules: ImplicationRule[] = [
      { name: 'r1', antecedents: ['A'], consequent: 'B' },
      { name: 'r2', antecedents: ['B'], consequent: 'C' },
    ];
    const result = deduce(props, rules);
    expect(result.derived.find(p => p.id === 'C')?.truthValue).toBe(true);
  });

  it('premise 영역 → 영역 derive', () => {
    const props: Proposition[] = [{ id: 'A', truthValue: null }];
    const rules: ImplicationRule[] = [{ name: 'r', antecedents: ['A'], consequent: 'B' }];
    const result = deduce(props, rules);
    expect(result.derived.find(p => p.id === 'B')?.truthValue).not.toBe(true);
  });
});

describe('Phase O — Induction (Mill 1843)', () => {
  it('일관된 observation → rule induce', () => {
    const obs = [
      { context: 'red sky at night', outcome: 'good weather' },
      { context: 'red sky at night', outcome: 'good weather' },
      { context: 'red sky at night', outcome: 'good weather' },
    ];
    const rule = induceRule(obs, 0.7);
    expect(rule).not.toBeNull();
    expect(rule!.confidence).toBe(1.0);
  });

  it('일관성 영역 → null', () => {
    const obs = [
      { context: 'x', outcome: 'a' },
      { context: 'x', outcome: 'b' },
      { context: 'x', outcome: 'c' },
    ];
    expect(induceRule(obs, 0.7)).toBeNull(); // confidence 1/3 < 0.7
  });

  it('empty → null', () => {
    expect(induceRule([])).toBeNull();
  });
});

describe('Phase O — Abduction (Bayesian)', () => {
  const hypotheses: Hypothesis[] = [
    { id: 'flu', description: 'flu', priorProbability: 0.3 },
    { id: 'cold', description: 'cold', priorProbability: 0.5 },
    { id: 'allergy', description: 'allergy', priorProbability: 0.2 },
  ];

  it('영역 evidence → best hypothesis', () => {
    const evidence: Evidence = {
      description: 'sneezing',
      likelihoodGivenHypothesis: new Map([
        ['flu', 0.6], ['cold', 0.9], ['allergy', 0.8],
      ]),
    };
    const best = abduceBest(hypotheses, evidence);
    expect(best?.hypothesis.id).toBe('cold'); // 0.5 × 0.9 = 0.45 (highest)
  });

  it('영역 hypothesis → null', () => {
    const evidence: Evidence = { description: 'x', likelihoodGivenHypothesis: new Map() };
    const r = abduceBest([], evidence);
    expect(r).toBeNull();
  });

  it('zero evidence → null', () => {
    const evidence: Evidence = {
      description: 'x',
      likelihoodGivenHypothesis: new Map([['flu', 0], ['cold', 0], ['allergy', 0]]),
    };
    expect(abduceBest(hypotheses, evidence)).toBeNull();
  });
});

describe('Phase O — Confirmation Bias (Tversky & Kahneman 1974)', () => {
  it('영역 영역 영역 영역 영역 영역 영역 → bias 감지', () => {
    const obs = [
      { supportsBelief: true, soughtAfter: true },
      { supportsBelief: true, soughtAfter: true },
      { supportsBelief: false, soughtAfter: false },
      { supportsBelief: true, soughtAfter: true },
    ];
    const result = detectConfirmationBias(obs);
    expect(result.biased).toBe(true);
    expect(result.biasScore).toBe(1.0); // 모든 case 영역 bias 영역
  });

  it('영역 영역 영역 → no bias', () => {
    const obs = [
      { supportsBelief: true, soughtAfter: false },
      { supportsBelief: false, soughtAfter: true },
    ];
    const result = detectConfirmationBias(obs);
    expect(result.biased).toBe(false);
  });
});

describe('Phase O — Mental Model (Johnson-Laird 1983)', () => {
  it('모든 valid configuration 영역 conclusion → necessarilyTrue', () => {
    let model = constructMentalModel(['A or B', 'not A']);
    // 영역 valid scenario: A=false, B=true
    model = addScenario(model, new Map([['A', false], ['B', true]]));
    expect(necessarilyTrue(model, 'B')).toBe(true);
  });

  it('일부 영역 conclusion 영역 → no necessity', () => {
    let model = constructMentalModel([]);
    model = addScenario(model, new Map([['B', true]]));
    model = addScenario(model, new Map([['B', false]]));
    expect(necessarilyTrue(model, 'B')).toBe(false);
  });

  it('empty model → false', () => {
    expect(necessarilyTrue(constructMentalModel([]), 'X')).toBe(false);
  });
});

describe('Phase O — 통합 시나리오: deduce → induce → abduce', () => {
  it('medical diagnosis — observe symptoms → abduce best explanation', () => {
    const hyps: Hypothesis[] = [
      { id: 'flu', description: 'flu', priorProbability: 0.2 },
      { id: 'covid', description: 'covid', priorProbability: 0.1 },
    ];
    const evidence: Evidence = {
      description: 'fever + cough + loss of smell',
      likelihoodGivenHypothesis: new Map([
        ['flu', 0.3], ['covid', 0.95], // loss of smell 영역 covid 영역 highly likely
      ]),
    };
    const diagnosis = abduceBest(hyps, evidence);
    expect(diagnosis?.hypothesis.id).toBe('covid'); // 0.1 × 0.95 = 0.095 > 0.2 × 0.3 = 0.06
  });
});
