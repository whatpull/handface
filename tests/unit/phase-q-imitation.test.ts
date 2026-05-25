// Phase Q — Imitation Learning 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  observeAction, createRepertoire, rememberAction, mapToOwnMotor,
  chooseImitationMode, shouldImitate, updateModelHistory,
  transmissionFidelity,
  type ModelHistory, type ImitationMode,
} from '@/lib/snn-runtime/imitation';

describe('Phase Q — Observation', () => {
  it('observe action — outcome 영역 clamped', () => {
    const obs = observeAction('teacher', 'grasp', [1, 2, 3], 1.5, 100);
    expect(obs.observedOutcome).toBe(1.0);
    expect(observeAction('t', 'a', [], -0.5, 0).observedOutcome).toBe(0);
  });
});

describe('Phase Q — Retention (Repertoire)', () => {
  it('remember + capacity 영역 영역 best 영역', () => {
    let rep = createRepertoire(2);
    rep = rememberAction(rep, observeAction('t', 'a', [], 0.3, 1));
    rep = rememberAction(rep, observeAction('t', 'b', [], 0.9, 2));
    rep = rememberAction(rep, observeAction('t', 'c', [], 0.5, 3));
    expect(rep.observations.length).toBe(2);
    // Best 2: 0.9 (b), 0.5 (c)
    expect(rep.observations.map(o => o.actionName).sort()).toEqual(['b', 'c']);
  });
});

describe('Phase Q — Motor Mapping (Mirror neuron)', () => {
  it('observed pattern → most similar own action', () => {
    const own = new Map<string, number[]>();
    own.set('reach', [1, 0, 0]);
    own.set('grasp', [0, 1, 0]);
    own.set('release', [0, 0, 1]);
    const obs = observeAction('t', 'demo', [0.9, 0.1, 0.1], 1, 0);
    const result = mapToOwnMotor(obs, own);
    expect(result?.matchedAction).toBe('reach');
    expect(result?.similarity).toBeGreaterThan(0.9);
  });

  it('empty repertoire → null', () => {
    const obs = observeAction('t', 'x', [1, 1, 1], 1, 0);
    expect(mapToOwnMotor(obs, new Map())).toBeNull();
  });
});

describe('Phase Q — Imitation Mode (Whiten 2017)', () => {
  it('영역 capability → motor mimicry', () => {
    const obs = observeAction('t', 'x', [1], 1, 0);
    expect(chooseImitationMode(obs, 0.9)).toBe<ImitationMode>('motor_mimicry');
  });

  it('영역 capability → goal emulation', () => {
    const obs = observeAction('t', 'x', [1], 1, 0);
    expect(chooseImitationMode(obs, 0.3)).toBe<ImitationMode>('goal_emulation');
  });
});

describe('Phase Q — Selective Imitation (Bandura 1977)', () => {
  it('proven model + successful action → imitate', () => {
    const history: ModelHistory = { modelAgent: 't', successRate: 0.85, observationCount: 10 };
    const obs = observeAction('t', 'x', [1], 0.9, 0);
    expect(shouldImitate(obs, history).imitate).toBe(true);
  });

  it('low success model → no imitate', () => {
    const history: ModelHistory = { modelAgent: 't', successRate: 0.3, observationCount: 10 };
    const obs = observeAction('t', 'x', [1], 0.9, 0);
    expect(shouldImitate(obs, history).imitate).toBe(false);
  });

  it('insufficient history → exploratory imitate', () => {
    const history: ModelHistory = { modelAgent: 't', successRate: 0, observationCount: 1 };
    const obs = observeAction('t', 'x', [1], 0.5, 0);
    expect(shouldImitate(obs, history).imitate).toBe(true);
  });
});

describe('Phase Q — Model History Update', () => {
  it('running average — outcomes 영역 누적', () => {
    let h: ModelHistory = { modelAgent: 't', successRate: 0, observationCount: 0 };
    h = updateModelHistory(h, 1.0);
    expect(h.successRate).toBe(1.0);
    h = updateModelHistory(h, 0.0);
    expect(h.successRate).toBe(0.5);
    h = updateModelHistory(h, 1.0);
    expect(h.successRate).toBeCloseTo(2 / 3, 5);
  });
});

describe('Phase Q — Cultural Transmission (Tomasello 1999 ratchet)', () => {
  it('영역 generations high fidelity → ratchet active', () => {
    const gens = [
      { successRate: 0.8, mode: 'motor_mimicry' as ImitationMode },
      { successRate: 0.85, mode: 'motor_mimicry' as ImitationMode },
      { successRate: 0.9, mode: 'motor_mimicry' as ImitationMode },
    ];
    const result = transmissionFidelity(gens);
    expect(result.ratchetActive).toBe(true);
    expect(result.avgFidelity).toBeGreaterThan(0.8);
  });

  it('영역 generation low → 영역 ratchet', () => {
    const gens = [
      { successRate: 0.8, mode: 'motor_mimicry' as ImitationMode },
      { successRate: 0.3, mode: 'goal_emulation' as ImitationMode },
      { successRate: 0.8, mode: 'motor_mimicry' as ImitationMode },
    ];
    expect(transmissionFidelity(gens).ratchetActive).toBe(false);
  });

  it('insufficient generations → 영역 ratchet', () => {
    const gens = [{ successRate: 0.9, mode: 'motor_mimicry' as ImitationMode }];
    expect(transmissionFidelity(gens).ratchetActive).toBe(false);
  });
});

describe('Phase Q — 통합 시나리오: observe + imitate + transmit', () => {
  it('teacher → student 영역 영역 imitation + selective + retention', () => {
    let rep = createRepertoire(10);
    let teacherHistory: ModelHistory = { modelAgent: 'teacher', successRate: 0, observationCount: 0 };

    // 5 observations + history update.
    for (let i = 0; i < 5; i += 1) {
      const obs = observeAction('teacher', `skill_${i}`, [1, 2, 3], 0.8 + 0.04 * i, i);
      teacherHistory = updateModelHistory(teacherHistory, obs.observedOutcome);
      const decision = shouldImitate(obs, teacherHistory);
      if (decision.imitate) rep = rememberAction(rep, obs);
    }
    expect(rep.observations.length).toBeGreaterThan(0);
    expect(teacherHistory.successRate).toBeGreaterThan(0.8);
  });
});
