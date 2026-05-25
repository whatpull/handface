// Phase Q — Imitation Learning (완벽한 인공지능 12 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 12 단계.
// Phase P Planning 다음. Bandura 1977 social learning + Rizzolatti mirror neuron.
//
// 학술 정합:
//   - Bandura 1977 — Social Learning Theory (4 processes: attention/retention/
//     reproduction/motivation).
//   - Rizzolatti & Craighero 2004 — Mirror neuron system.
//   - Meltzoff 1988 — Infant imitation (neonatal facial).
//   - Whiten 2017 — Cultural transmission.
//   - Heyes 2018 — Cognitive Gadgets (imitation as learned).

// ── 1. Observation (attention process — Bandura 1977 step 1) ──

export interface ObservedAction {
  modelAgent: string;
  actionName: string;
  motorPattern: number[];   // observed neuron activations (cluster ids or rates)
  observedOutcome: number;  // 0..1 success
  timestamp: number;
}

export function observeAction(
  modelAgent: string, actionName: string,
  motorPattern: ReadonlyArray<number>, outcome: number,
  timestamp: number = Date.now(),
): ObservedAction {
  return {
    modelAgent, actionName,
    motorPattern: [...motorPattern],
    observedOutcome: Math.max(0, Math.min(1, outcome)),
    timestamp,
  };
}

// ── 2. Retention (memory of observed action — Bandura step 2) ──

export interface ImitationRepertoire {
  observations: ObservedAction[];
  capacity: number;
}

export function createRepertoire(capacity: number = 100): ImitationRepertoire {
  return { observations: [], capacity };
}

export function rememberAction(repertoire: ImitationRepertoire, action: ObservedAction): ImitationRepertoire {
  const newObs = [...repertoire.observations, action];
  if (newObs.length > repertoire.capacity) {
    // 영역 successful observation 영역 priority retention.
    newObs.sort((a, b) => b.observedOutcome - a.observedOutcome);
    return { ...repertoire, observations: newObs.slice(0, repertoire.capacity) };
  }
  return { ...repertoire, observations: newObs };
}

// ── 3. Reproduction (motor mapping — Bandura step 3, Mirror neuron 정합) ──

// 영역 self 영역 motor repertoire 영역 영역 영역 영역 영역 mapping.
// 학술 정합: Rizzolatti mirror neuron — observation ↔ own motor representation.
export function mapToOwnMotor(
  observed: ObservedAction,
  ownRepertoire: ReadonlyMap<string, number[]>, // own action name → motor pattern
): { matchedAction: string; similarity: number } | null {
  if (ownRepertoire.size === 0) return null;
  let best: string | null = null;
  let bestSim = -1;
  for (const [name, pattern] of ownRepertoire.entries()) {
    const sim = cosineSimilarity(observed.motorPattern, pattern);
    if (sim > bestSim) { bestSim = sim; best = name; }
  }
  return best ? { matchedAction: best, similarity: bestSim } : null;
}

function cosineSimilarity(a: ReadonlyArray<number>, b: ReadonlyArray<number>): number {
  if (a.length === 0 || b.length === 0) return 0;
  const len = Math.min(a.length, b.length);
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < len; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ── 4. Goal Emulation vs Motor Mimicry (Whiten 2017) ──

// Goal emulation — outcome 영역 영역 영역 영역 (영역 영역 영역 영역 영역).
// Motor mimicry — 정확 motor pattern 영역 영역.
// 학술 정합: cultural transmission 영역 영역 dual mechanisms.
export type ImitationMode = 'goal_emulation' | 'motor_mimicry';

export function chooseImitationMode(
  observed: ObservedAction,
  ownCapability: number, // 0..1, 영역 motor mimicry 가능성
): ImitationMode {
  // 영역 capability + 정확 mimicry valued.
  // 영역 capability OR 영역 goal-oriented context → emulation.
  return ownCapability > 0.7 ? 'motor_mimicry' : 'goal_emulation';
}

// ── 5. Selective Imitation (motivation — Bandura step 4) ──

// 영역 successful model 영역 영역 영역 imitate.
// 학술 정합: Bandura 1977 — vicarious reinforcement.
export interface ModelHistory {
  modelAgent: string;
  successRate: number;     // 0..1
  observationCount: number;
}

export function shouldImitate(
  observation: ObservedAction,
  modelHistory: ModelHistory,
  minSuccessRate: number = 0.6,
): { imitate: boolean; reason: string } {
  if (modelHistory.observationCount < 3) {
    return { imitate: true, reason: 'insufficient history — explore' };
  }
  if (modelHistory.successRate >= minSuccessRate && observation.observedOutcome > 0.5) {
    return { imitate: true, reason: `proven model (${(modelHistory.successRate * 100).toFixed(0)}%) + successful action` };
  }
  return { imitate: false, reason: `model success rate ${(modelHistory.successRate * 100).toFixed(0)}% < ${(minSuccessRate * 100).toFixed(0)}%` };
}

// Model history update.
export function updateModelHistory(
  history: ModelHistory,
  newOutcome: number,
): ModelHistory {
  const newCount = history.observationCount + 1;
  const newSum = history.successRate * history.observationCount + newOutcome;
  return {
    ...history,
    observationCount: newCount,
    successRate: newSum / newCount,
  };
}

// ── 6. Cultural Transmission Fidelity ──

// 영역 imitation 영역 cumulative cultural ratchet effect.
// 학술 정합: Tomasello 1999 — ratchet effect (each gen builds on prev).
export function transmissionFidelity(
  generations: ReadonlyArray<{ successRate: number; mode: ImitationMode }>,
): { avgFidelity: number; ratchetActive: boolean } {
  if (generations.length === 0) return { avgFidelity: 0, ratchetActive: false };
  const avgSuccess = generations.reduce((s, g) => s + g.successRate, 0) / generations.length;
  // Ratchet — generations 영역 영역 영역 영역 가지면 영역 cultural transmission stable.
  const allHighFidelity = generations.every(g => g.successRate >= 0.7);
  return { avgFidelity: avgSuccess, ratchetActive: allHighFidelity && generations.length >= 3 };
}
