// Phase P — Planning 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  isGoalSatisfied, canApply, applyAction, planForward,
  decomposeHTN, findRelevantActions, executePlan,
  type Action, type PlanState, type Goal, type HTNTask,
} from '@/lib/snn-runtime/planning';

const pickup: Action = {
  name: 'pickup', preconditions: ['hand_empty', 'block_on_table'],
  addEffects: ['holding_block'], removeEffects: ['hand_empty', 'block_on_table'],
  cost: 1,
};
const putdown: Action = {
  name: 'putdown', preconditions: ['holding_block'],
  addEffects: ['hand_empty', 'block_on_table'], removeEffects: ['holding_block'],
  cost: 1,
};
const stack: Action = {
  name: 'stack', preconditions: ['holding_block', 'other_block_clear'],
  addEffects: ['blocks_stacked', 'hand_empty'],
  removeEffects: ['holding_block', 'other_block_clear'],
  cost: 1,
};

describe('Phase P — Goal Satisfaction', () => {
  it('영역 facts 영역 → goal satisfied', () => {
    const state: PlanState = { facts: new Set(['a', 'b', 'c']) };
    expect(isGoalSatisfied(state, { desiredFacts: ['a', 'b'], forbiddenFacts: [] })).toBe(true);
  });

  it('forbidden fact 영역 → not satisfied', () => {
    const state: PlanState = { facts: new Set(['a', 'b']) };
    expect(isGoalSatisfied(state, { desiredFacts: ['a'], forbiddenFacts: ['b'] })).toBe(false);
  });

  it('missing desired fact → not satisfied', () => {
    const state: PlanState = { facts: new Set(['a']) };
    expect(isGoalSatisfied(state, { desiredFacts: ['a', 'b'], forbiddenFacts: [] })).toBe(false);
  });
});

describe('Phase P — Action (STRIPS, Fikes & Nilsson 1971)', () => {
  it('preconditions 영역 → can apply', () => {
    const state: PlanState = { facts: new Set(['hand_empty', 'block_on_table']) };
    expect(canApply(state, pickup)).toBe(true);
  });

  it('preconditions 영역 영역 → cannot apply', () => {
    const state: PlanState = { facts: new Set(['hand_empty']) };
    expect(canApply(state, pickup)).toBe(false);
  });

  it('action 영역 effects 영역 영역', () => {
    const state: PlanState = { facts: new Set(['hand_empty', 'block_on_table']) };
    const next = applyAction(state, pickup);
    expect(next.facts.has('holding_block')).toBe(true);
    expect(next.facts.has('hand_empty')).toBe(false);
    expect(next.facts.has('block_on_table')).toBe(false);
  });
});

describe('Phase P — Forward Search Planning (BFS optimal)', () => {
  it('단순 시나리오 — pickup + stack → goal', () => {
    const initial: PlanState = {
      facts: new Set(['hand_empty', 'block_on_table', 'other_block_clear']),
    };
    const goal: Goal = { desiredFacts: ['blocks_stacked'], forbiddenFacts: [] };
    const plan = planForward(initial, goal, [pickup, putdown, stack]);
    expect(plan).not.toBeNull();
    expect(plan!.goalReached).toBe(true);
    expect(plan!.actions.map(a => a.name)).toEqual(['pickup', 'stack']);
  });

  it('이미 만족 → empty plan', () => {
    const initial: PlanState = { facts: new Set(['blocks_stacked']) };
    const goal: Goal = { desiredFacts: ['blocks_stacked'], forbiddenFacts: [] };
    const plan = planForward(initial, goal, []);
    expect(plan?.actions).toHaveLength(0);
    expect(plan?.goalReached).toBe(true);
  });

  it('도달 불가 → null', () => {
    const initial: PlanState = { facts: new Set([]) };
    const goal: Goal = { desiredFacts: ['unreachable'], forbiddenFacts: [] };
    const plan = planForward(initial, goal, [], 5);
    expect(plan).toBeNull();
  });
});

describe('Phase P — HTN Planning (Sacerdoti 1975)', () => {
  it('composite task → primitive actions 영역', () => {
    const registry = new Map<string, HTNTask>();
    registry.set('build_tower', {
      name: 'build_tower', isPrimitive: false, subTasks: ['grab_block', 'place_block'],
    });
    registry.set('grab_block', { name: 'grab_block', isPrimitive: true, primitiveAction: pickup });
    registry.set('place_block', { name: 'place_block', isPrimitive: true, primitiveAction: stack });

    const actions = decomposeHTN('build_tower', registry);
    expect(actions).not.toBeNull();
    expect(actions!.map(a => a.name)).toEqual(['pickup', 'stack']);
  });

  it('영역 task → null', () => {
    expect(decomposeHTN('missing', new Map())).toBeNull();
  });

  it('영역 영역 sub-task → null', () => {
    const registry = new Map<string, HTNTask>();
    registry.set('composite', { name: 'composite', isPrimitive: false, subTasks: ['nonexistent'] });
    expect(decomposeHTN('composite', registry)).toBeNull();
  });
});

describe('Phase P — Means-Ends Analysis (Newell & Simon 1972)', () => {
  it('영역 영역 → 영역 영역 action 영역', () => {
    const state: PlanState = { facts: new Set(['hand_empty', 'block_on_table']) };
    const goal: Goal = { desiredFacts: ['holding_block'], forbiddenFacts: [] };
    const relevant = findRelevantActions(state, goal, [pickup, putdown, stack]);
    expect(relevant.length).toBe(1);
    expect(relevant[0].name).toBe('pickup');
  });

  it('영역 영역 → 영역 영역 action 영역', () => {
    const state: PlanState = { facts: new Set(['blocks_stacked']) };
    const goal: Goal = { desiredFacts: ['blocks_stacked'], forbiddenFacts: [] };
    const relevant = findRelevantActions(state, goal, [pickup, putdown, stack]);
    expect(relevant).toHaveLength(0);
  });
});

describe('Phase P — Plan Execution Monitoring', () => {
  it('정상 실행 → 모든 step 영역', () => {
    const initial: PlanState = { facts: new Set(['hand_empty', 'block_on_table']) };
    const results = executePlan(initial, { actions: [pickup], totalCost: 1, goalReached: true });
    expect(results).toHaveLength(1);
    expect(results[0].succeeded).toBe(true);
  });

  it('precondition 영역 실패 시 영역', () => {
    const initial: PlanState = { facts: new Set(['hand_empty']) }; // block_on_table 영역
    const results = executePlan(initial, { actions: [pickup], totalCost: 1, goalReached: false });
    expect(results[0].succeeded).toBe(false);
  });
});

describe('Phase P — 통합 시나리오: planning + memory + reasoning', () => {
  it('block stacking — initial → plan → execute', () => {
    const initial: PlanState = {
      facts: new Set(['hand_empty', 'block_on_table', 'other_block_clear']),
    };
    const goal: Goal = { desiredFacts: ['blocks_stacked'], forbiddenFacts: [] };
    const plan = planForward(initial, goal, [pickup, putdown, stack]);
    expect(plan?.goalReached).toBe(true);

    const execution = executePlan(initial, plan!);
    expect(execution.every(r => r.succeeded)).toBe(true);
    expect(execution[execution.length - 1].resultingState.facts.has('blocks_stacked')).toBe(true);
  });
});
