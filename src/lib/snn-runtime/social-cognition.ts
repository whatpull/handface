// Phase I — Social Cognition (완벽한 인공지능 4 단계 — 마지막).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 4 단계.
// Phase F (Multi-Modality) + G (Consciousness) + H (Embodiment) 다음.
// multi-agent SNN colony — cooperative + Theory of Mind. 완벽한 인공지능(뇌)
// 완성.
//
// 본 모듈 building blocks (pure functions):
//   1. Agent communication — spike message 영역 agent 간 전송.
//   2. Theory of Mind — 다른 agent 영역 internal state 영역 inference
//      (mirror neuron 정합).
//   3. Cooperative task — 여러 agent 영역 영역 영역 task 영역 영역.
//   4. Joint attention — 영역 agent 가 동일 target 영역 영역.
//   5. Reputation — repeated interaction 영역 trust score.
//
// 학술 정합:
//   - Premack & Woodruff 1978 — Theory of Mind.
//   - Rizzolatti & Craighero 2004 — Mirror neuron system.
//   - Vinyals et al. 2019 — AlphaStar multi-agent RL.
//   - Tomasello 2009 — Cultural cognition + joint attention.
//   - Axelrod 1984 — Evolution of cooperation (reputation).

// ── 1. Agent Communication ──

export interface AgentMessage {
  fromAgent: string;
  toAgent: string;          // 'broadcast' = 영역 영역
  contentNeurons: number[]; // active neuron indices (sparse message)
  timestamp: number;
  signalStrength: number;   // 0..1 (intensity)
}

// Message 영역 receiver agent 영역 perceive — 영역 강도 영역 received signal.
// 학술 정합: Skinner 1957 verbal behavior — signal strength → response prob.
export function receiveMessage(
  msg: AgentMessage,
  receiverAgent: string,
  noiseFloor: number = 0.1,
): { perceived: boolean; effectiveStrength: number } {
  if (msg.toAgent !== 'broadcast' && msg.toAgent !== receiverAgent) {
    return { perceived: false, effectiveStrength: 0 };
  }
  const effective = Math.max(0, msg.signalStrength - noiseFloor);
  return { perceived: effective > 0, effectiveStrength: effective };
}

// ── 2. Theory of Mind (mirror neuron) ──

export interface AgentBeliefState {
  agentId: string;
  inferredFocusNeurons: number[]; // 그 agent 가 attend 영역 영역 추정 neurons
  confidence: number;             // 추정 영역 confidence (0..1)
  lastObservation: number;        // last update timestamp
}

// 다른 agent 영역 observed behavior (예: motor output, message) 영역 internal
// focus 영역 inference. 학술 정합: mirror neuron — 영역 영역 행동 영역 자신
// 영역 representation 영역 mirror.
export function inferBeliefState(
  observedAgent: string,
  observedActiveNeurons: ReadonlyArray<number>,
  ownContext: ReadonlyArray<number>,
  timestamp: number,
): AgentBeliefState {
  // Simple inference: observed neurons 영역 영역 inferred focus.
  // Confidence: own context 영역 overlap 영역 영역 → high confidence (mirror match).
  const ownSet = new Set(ownContext);
  let overlap = 0;
  for (const n of observedActiveNeurons) {
    if (ownSet.has(n)) overlap += 1;
  }
  const confidence = observedActiveNeurons.length > 0
    ? overlap / observedActiveNeurons.length
    : 0;
  return {
    agentId: observedAgent,
    inferredFocusNeurons: [...observedActiveNeurons],
    confidence,
    lastObservation: timestamp,
  };
}

// 다른 agent 영역 expected action 영역 own model 영역 영역 predict.
// 학술 정합: simulation theory — 자신 영역 motor system 영역 사용 영역 others 영역 행동 예측.
export function predictOtherAgentAction(
  belief: AgentBeliefState,
  actionPredictor: (focusNeurons: ReadonlyArray<number>) => string | null,
): { predicted: string | null; confidence: number } {
  const predicted = actionPredictor(belief.inferredFocusNeurons);
  return { predicted, confidence: belief.confidence };
}

// ── 3. Cooperative Task ──

export interface SharedGoal {
  taskId: string;
  targetNeurons: number[];   // 모든 agent 가 같이 활성 영역 영역 target
  rewardThreshold: number;   // 영역 reward 영역 받기 영역 최소 overlap
}

// Multiple agent 영역 contribution → shared goal achievement.
// 학술 정합: Tomasello 2009 — joint intentionality + cooperative reward.
export function checkCooperativeSuccess(
  goal: SharedGoal,
  agentContributions: ReadonlyArray<{ agentId: string; activeNeurons: ReadonlyArray<number> }>,
): { success: boolean; totalOverlap: number; contributingAgents: string[] } {
  const targetSet = new Set(goal.targetNeurons);
  let totalOverlap = 0;
  const contributing: string[] = [];
  for (const a of agentContributions) {
    let overlap = 0;
    for (const n of a.activeNeurons) {
      if (targetSet.has(n)) overlap += 1;
    }
    if (overlap > 0) {
      contributing.push(a.agentId);
      totalOverlap += overlap;
    }
  }
  return {
    success: totalOverlap >= goal.rewardThreshold,
    totalOverlap,
    contributingAgents: contributing,
  };
}

// ── 4. Joint Attention ──

// 여러 agent 영역 동일 target 영역 attend (gaze following, deictic pointing).
// 학술 정합: Tomasello 1995 — joint attention 영역 social cognition 영역 영역 영역.
export function detectJointAttention(
  agentFoci: ReadonlyArray<{ agentId: string; focusNeurons: ReadonlyArray<number> }>,
  overlapThreshold: number = 0.5,
): { hasJointAttention: boolean; sharedFocus: number[]; participants: string[] } {
  if (agentFoci.length < 2) {
    return { hasJointAttention: false, sharedFocus: [], participants: [] };
  }
  // 영역 neuron 영역 영역 영역 agent 가 attend 영역 카운트.
  const neuronCounts = new Map<number, string[]>();
  for (const af of agentFoci) {
    for (const n of af.focusNeurons) {
      if (!neuronCounts.has(n)) neuronCounts.set(n, []);
      neuronCounts.get(n)!.push(af.agentId);
    }
  }
  // overlapThreshold × agents 만큼 영역 attend 영역 neuron 만 shared focus.
  // Joint attention 영역 영역 최소 2 agent 가 동시 attend 영역 (학술 정합 —
  // Tomasello 1995: dyadic minimum).
  const minAgents = Math.max(2, Math.ceil(agentFoci.length * overlapThreshold));
  const sharedFocus: number[] = [];
  const participantSet = new Set<string>();
  for (const [neuron, agents] of neuronCounts.entries()) {
    if (agents.length >= minAgents) {
      sharedFocus.push(neuron);
      for (const a of agents) participantSet.add(a);
    }
  }
  return {
    hasJointAttention: sharedFocus.length > 0,
    sharedFocus,
    participants: Array.from(participantSet),
  };
}

// ── 5. Reputation (Axelrod 1984 evolution of cooperation) ──

export interface ReputationScore {
  agentId: string;
  totalInteractions: number;
  cooperativeCount: number;
  defectionCount: number;
  trustScore: number; // 0..1 (cooperative ratio)
}

// Repeated interaction 후 reputation update — cooperative action → trust ↑,
// defection → trust ↓. 학술 정합: tit-for-tat (Axelrod 1984).
export function updateReputation(
  current: ReputationScore,
  cooperated: boolean,
): ReputationScore {
  const newTotal = current.totalInteractions + 1;
  const newCoop = current.cooperativeCount + (cooperated ? 1 : 0);
  const newDefect = current.defectionCount + (cooperated ? 0 : 1);
  return {
    ...current,
    totalInteractions: newTotal,
    cooperativeCount: newCoop,
    defectionCount: newDefect,
    trustScore: newTotal > 0 ? newCoop / newTotal : 0,
  };
}

// Tit-for-tat strategy — partner reputation 영역 own action 결정.
// 첫 만남: cooperate. 영역 만남: partner 영역 영역 영역 action mirror.
export function titForTatDecide(
  partnerReputation: ReputationScore | null,
  cooperationThreshold: number = 0.5,
): 'cooperate' | 'defect' {
  if (!partnerReputation || partnerReputation.totalInteractions === 0) {
    return 'cooperate'; // 영역 만남 영역 cooperate default
  }
  return partnerReputation.trustScore >= cooperationThreshold ? 'cooperate' : 'defect';
}

// ── 6. Multi-Agent Colony Coordination ──

export interface ColonyState {
  agents: string[];
  reputations: Map<string, ReputationScore>;
  sharedGoals: SharedGoal[];
  jointAttentionEvents: number;
}

export function createColony(agentIds: ReadonlyArray<string>): ColonyState {
  const reps = new Map<string, ReputationScore>();
  for (const id of agentIds) {
    reps.set(id, {
      agentId: id, totalInteractions: 0,
      cooperativeCount: 0, defectionCount: 0, trustScore: 0,
    });
  }
  return {
    agents: [...agentIds],
    reputations: reps,
    sharedGoals: [],
    jointAttentionEvents: 0,
  };
}
