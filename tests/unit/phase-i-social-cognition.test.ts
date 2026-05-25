// Phase I — Social Cognition 단위 테스트 (완벽한 인공지능 4 단계 마지막).
// 완벽한 인공지능(뇌) 완성 검증.

import { describe, it, expect } from 'vitest';
import {
  receiveMessage, inferBeliefState, predictOtherAgentAction,
  checkCooperativeSuccess, detectJointAttention,
  updateReputation, titForTatDecide, createColony,
  type AgentMessage, type AgentBeliefState, type SharedGoal, type ReputationScore,
} from '@/lib/snn-runtime/social-cognition';

describe('Phase I — Agent Communication', () => {
  it('broadcast message → 모든 receiver perceive', () => {
    const msg: AgentMessage = {
      fromAgent: 'agent1', toAgent: 'broadcast',
      contentNeurons: [1, 2], timestamp: 0, signalStrength: 0.8,
    };
    expect(receiveMessage(msg, 'agent2').perceived).toBe(true);
    expect(receiveMessage(msg, 'agent3').effectiveStrength).toBeCloseTo(0.7, 5);
  });

  it('directed message → 영역 receiver 영역 perceive', () => {
    const msg: AgentMessage = {
      fromAgent: 'agent1', toAgent: 'agent2',
      contentNeurons: [1], timestamp: 0, signalStrength: 0.8,
    };
    expect(receiveMessage(msg, 'agent2').perceived).toBe(true);
    expect(receiveMessage(msg, 'agent3').perceived).toBe(false);
  });

  it('weak signal (below noise floor) → not perceived', () => {
    const msg: AgentMessage = {
      fromAgent: 'a1', toAgent: 'broadcast',
      contentNeurons: [1], timestamp: 0, signalStrength: 0.05,
    };
    const r = receiveMessage(msg, 'a2', 0.1);
    expect(r.perceived).toBe(false);
  });
});

describe('Phase I — Theory of Mind (mirror neuron)', () => {
  it('observed neurons + own context overlap → high confidence', () => {
    const belief = inferBeliefState('other', [1, 2, 3], [1, 2, 3, 5], 100);
    expect(belief.confidence).toBeCloseTo(1.0, 5); // 100% overlap
  });

  it('no overlap → low confidence', () => {
    const belief = inferBeliefState('other', [1, 2, 3], [10, 20, 30], 100);
    expect(belief.confidence).toBe(0);
  });

  it('partial overlap → moderate confidence', () => {
    const belief = inferBeliefState('other', [1, 2, 3, 4], [1, 2, 100], 100);
    expect(belief.confidence).toBeCloseTo(0.5, 5); // 2/4 overlap
  });

  it('predict other agent action — actionPredictor 통합', () => {
    const belief: AgentBeliefState = {
      agentId: 'other', inferredFocusNeurons: [5, 10],
      confidence: 0.8, lastObservation: 100,
    };
    const result = predictOtherAgentAction(belief, (focus) => {
      return focus.includes(5) ? 'grasp' : null;
    });
    expect(result.predicted).toBe('grasp');
    expect(result.confidence).toBe(0.8);
  });
});

describe('Phase I — Cooperative Task (Tomasello 2009)', () => {
  it('shared goal — 영역 agent 영역 active neurons overlap ≥ threshold → success', () => {
    const goal: SharedGoal = {
      taskId: 'lift_object',
      targetNeurons: [1, 2, 3, 4, 5],
      rewardThreshold: 4,
    };
    const result = checkCooperativeSuccess(goal, [
      { agentId: 'a1', activeNeurons: [1, 2] },
      { agentId: 'a2', activeNeurons: [3, 4] },
    ]);
    expect(result.success).toBe(true); // 4 overlap >= 4 threshold
    expect(result.contributingAgents).toEqual(['a1', 'a2']);
  });

  it('insufficient contribution → fail', () => {
    const goal: SharedGoal = {
      taskId: 'lift', targetNeurons: [1, 2, 3, 4, 5], rewardThreshold: 4,
    };
    const result = checkCooperativeSuccess(goal, [
      { agentId: 'a1', activeNeurons: [1] },
    ]);
    expect(result.success).toBe(false);
  });

  it('동일 neuron 영역 영역 agent → 영역 contribution counted', () => {
    const goal: SharedGoal = { taskId: 't', targetNeurons: [1], rewardThreshold: 2 };
    const result = checkCooperativeSuccess(goal, [
      { agentId: 'a1', activeNeurons: [1] },
      { agentId: 'a2', activeNeurons: [1] },
    ]);
    expect(result.totalOverlap).toBe(2); // both contributed
    expect(result.contributingAgents).toEqual(['a1', 'a2']);
  });
});

describe('Phase I — Joint Attention (Tomasello 1995)', () => {
  it('영역 agent 동일 target → joint attention 감지', () => {
    const result = detectJointAttention([
      { agentId: 'a1', focusNeurons: [10, 20] },
      { agentId: 'a2', focusNeurons: [10, 30] },
    ], 0.5);
    expect(result.hasJointAttention).toBe(true);
    expect(result.sharedFocus).toContain(10); // 둘 다 attend
  });

  it('영역 agent → joint attention 영역', () => {
    const result = detectJointAttention([{ agentId: 'a1', focusNeurons: [1, 2] }]);
    expect(result.hasJointAttention).toBe(false);
  });

  it('overlap 영역 영역 → joint attention 영역', () => {
    const result = detectJointAttention([
      { agentId: 'a1', focusNeurons: [1, 2] },
      { agentId: 'a2', focusNeurons: [3, 4] },
    ]);
    expect(result.hasJointAttention).toBe(false);
  });
});

describe('Phase I — Reputation + Tit-for-Tat (Axelrod 1984)', () => {
  const initial: ReputationScore = {
    agentId: 'partner', totalInteractions: 0,
    cooperativeCount: 0, defectionCount: 0, trustScore: 0,
  };

  it('updateReputation — cooperative action → trust ↑', () => {
    const r = updateReputation(initial, true);
    expect(r.trustScore).toBe(1.0);
    expect(r.cooperativeCount).toBe(1);
  });

  it('updateReputation — defection → trust 영역', () => {
    let r = updateReputation(initial, true);
    r = updateReputation(r, false);
    expect(r.trustScore).toBe(0.5); // 1 coop, 1 defect
    expect(r.defectionCount).toBe(1);
  });

  it('titForTatDecide — 첫 만남 → cooperate', () => {
    expect(titForTatDecide(null)).toBe('cooperate');
  });

  it('titForTatDecide — high trust partner → cooperate', () => {
    const trusted: ReputationScore = {
      agentId: 'p', totalInteractions: 10, cooperativeCount: 9,
      defectionCount: 1, trustScore: 0.9,
    };
    expect(titForTatDecide(trusted)).toBe('cooperate');
  });

  it('titForTatDecide — low trust → defect', () => {
    const untrusted: ReputationScore = {
      agentId: 'p', totalInteractions: 10, cooperativeCount: 2,
      defectionCount: 8, trustScore: 0.2,
    };
    expect(titForTatDecide(untrusted)).toBe('defect');
  });
});

describe('Phase I — Multi-Agent Colony', () => {
  it('createColony — 모든 agent 영역 reputation 초기 영역', () => {
    const colony = createColony(['a1', 'a2', 'a3']);
    expect(colony.agents).toEqual(['a1', 'a2', 'a3']);
    expect(colony.reputations.size).toBe(3);
    expect(colony.reputations.get('a1')?.trustScore).toBe(0);
  });

  it('empty colony', () => {
    const colony = createColony([]);
    expect(colony.agents).toHaveLength(0);
  });
});

describe('Phase I — 완벽한 인공지능 통합 시나리오: agent colony 상호작용', () => {
  it('joint attention → shared goal → cooperative success → reputation 영역', () => {
    // 2 agent (a1, a2) 영역 동일 target neurons 영역 attend.
    const attention = detectJointAttention([
      { agentId: 'a1', focusNeurons: [1, 2, 3] },
      { agentId: 'a2', focusNeurons: [1, 2, 3] },
    ]);
    expect(attention.hasJointAttention).toBe(true);
    expect(attention.sharedFocus).toEqual([1, 2, 3]);

    // 영역 attended target 영역 영역 cooperative task 수행.
    const goal: SharedGoal = {
      taskId: 'shared', targetNeurons: attention.sharedFocus, rewardThreshold: 3,
    };
    const success = checkCooperativeSuccess(goal, [
      { agentId: 'a1', activeNeurons: [1, 2] },
      { agentId: 'a2', activeNeurons: [3] },
    ]);
    expect(success.success).toBe(true);

    // Reputation 영역 — 영역 agent cooperative.
    let rep_a1: ReputationScore = {
      agentId: 'a1', totalInteractions: 0, cooperativeCount: 0,
      defectionCount: 0, trustScore: 0,
    };
    rep_a1 = updateReputation(rep_a1, true);
    expect(rep_a1.trustScore).toBe(1.0);
  });

  it('Theory of Mind + cooperative prediction — 영역 agent 행동 영역 영역', () => {
    // a1 observe a2 영역 행동 → ToM inference.
    const ownContext = [10, 20, 30]; // a1 영역 영역 영역 영역
    const observed = [10, 20]; // a2 영역 active (a1 영역 영역 영역 overlap)
    const belief = inferBeliefState('a2', observed, ownContext, 100);
    expect(belief.confidence).toBe(1.0); // high mirror match

    // a1 predict a2 action.
    const prediction = predictOtherAgentAction(belief, (focus) => {
      return focus.includes(10) ? 'reach_object' : 'idle';
    });
    expect(prediction.predicted).toBe('reach_object');
  });
});
