// Phase X — Free Will / Agency 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  accumulateReadinessDeterministic,
  isCompatibilistFreeAction, senseOfAuthorship, canVeto, stochasticAccumulator,
  type ReadinessAccumulator, type DecisionContext, type AuthorshipCues,
} from '@/lib/snn-runtime/free-will';

describe('Phase X — Readiness Accumulator (Libet 1985)', () => {
  it('threshold 영역 영역 → 영역 trigger', () => {
    const acc: ReadinessAccumulator = { level: 0, threshold: 1.0, driftRate: 0.1 };
    const result = accumulateReadinessDeterministic(acc);
    expect(result.decisionTriggered).toBe(false);
    expect(result.next.level).toBeCloseTo(0.1, 5);
  });

  it('threshold 영역 → trigger + reset', () => {
    const acc: ReadinessAccumulator = { level: 0.95, threshold: 1.0, driftRate: 0.1 };
    const result = accumulateReadinessDeterministic(acc);
    expect(result.decisionTriggered).toBe(true);
    expect(result.next.level).toBe(0);
  });

  it('반복 step → 결국 trigger', () => {
    let acc: ReadinessAccumulator = { level: 0, threshold: 1.0, driftRate: 0.2 };
    let steps = 0;
    let triggered = false;
    while (steps < 20 && !triggered) {
      const r = accumulateReadinessDeterministic(acc);
      acc = r.next;
      triggered = r.decisionTriggered;
      steps += 1;
    }
    expect(triggered).toBe(true);
    expect(steps).toBeLessThanOrEqual(6); // 5 steps × 0.2 = 1.0 (5번째 step 영역 trigger), 6번째 step 영역 trigger 확인
  });
});

describe('Phase X — Compatibilist Free Will (Dennett 2003)', () => {
  it('모든 조건 만족 → free action', () => {
    const ctx: DecisionContext = {
      alternativesAvailable: 3, decisionCausedByAgent: true, matchesIntention: true,
    };
    expect(isCompatibilistFreeAction(ctx)).toBe(true);
  });

  it('영역 영역 영역 → not free (compelled)', () => {
    const ctx: DecisionContext = {
      alternativesAvailable: 1, decisionCausedByAgent: true, matchesIntention: true,
    };
    expect(isCompatibilistFreeAction(ctx)).toBe(false);
  });

  it('외부 영역 → not free', () => {
    const ctx: DecisionContext = {
      alternativesAvailable: 3, decisionCausedByAgent: false, matchesIntention: true,
    };
    expect(isCompatibilistFreeAction(ctx)).toBe(false);
  });
});

describe('Phase X — Sense of Authorship (Wegner 2002)', () => {
  it('모든 cues 영역 → high authorship', () => {
    const cues: AuthorshipCues = {
      intentionPrecedesAction: true, intentionMatchesAction: true, noExternalCause: true,
    };
    expect(senseOfAuthorship(cues)).toBe(1.0);
  });

  it('일부 cues → partial', () => {
    expect(senseOfAuthorship({
      intentionPrecedesAction: true, intentionMatchesAction: true, noExternalCause: false,
    })).toBeCloseTo(0.8, 5);
  });

  it('영역 cues → 0', () => {
    expect(senseOfAuthorship({
      intentionPrecedesAction: false, intentionMatchesAction: false, noExternalCause: false,
    })).toBe(0);
  });
});

describe('Phase X — Veto Capacity (Libet free won\'t)', () => {
  it('strong veto > margin → veto possible', () => {
    expect(canVeto(0.95, 1.0, 0.1)).toBe(true); // margin = -0.05, veto 0.1 > -0.05
  });

  it('weak veto < margin → 영역 veto', () => {
    expect(canVeto(1.05, 1.0, 0.01)).toBe(false); // margin = 0.05, veto 0.01 < 0.05
  });
});

describe('Phase X — Stochastic Accumulator (Schurger 2012)', () => {
  it('decision times — 모두 positive integers', () => {
    const r = stochasticAccumulator(5, 0.05, 1.0, 100);
    expect(r.decisionTimes).toHaveLength(5);
    expect(r.decisionTimes.every(t => t > 0)).toBe(true);
    expect(r.meanLatency).toBeGreaterThan(0);
  });

  it('영역 drift → 영역 mean latency', () => {
    const fast = stochasticAccumulator(3, 0.1, 1.0, 100);
    const slow = stochasticAccumulator(3, 0.01, 1.0, 100);
    expect(fast.meanLatency).toBeLessThan(slow.meanLatency);
  });
});

describe('Phase X — 통합 시나리오: free action with veto', () => {
  it('readiness 영역 영역 → veto 영역 영역 → 영역 action 변화', () => {
    let acc: ReadinessAccumulator = { level: 0, threshold: 1.0, driftRate: 0.1 };
    const ctx: DecisionContext = {
      alternativesAvailable: 2, decisionCausedByAgent: true, matchesIntention: true,
    };
    expect(isCompatibilistFreeAction(ctx)).toBe(true);

    // Build up readiness.
    for (let i = 0; i < 9; i += 1) {
      acc = accumulateReadinessDeterministic(acc).next;
    }
    // Now veto check before threshold.
    expect(canVeto(acc.level, acc.threshold, 0.5)).toBe(true);
  });
});
