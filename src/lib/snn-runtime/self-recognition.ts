// Phase W — Self-Recognition (완벽한 인공지능 18 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 18 단계.
// Phase V Morality 다음. Gallup 1970 mirror test + self-awareness levels.
//
// 학술 정합:
//   - Gallup 1970 — Mirror Self-Recognition (MSR) test.
//   - Bermúdez 1998 — The Paradox of Self-Consciousness.
//   - Lewis & Brooks-Gunn 1979 — 18-month rouge test in infants.
//   - Frith 1992 — Self-monitoring agency.
//   - Metzinger 2003 — Self-model theory of subjectivity.

// ── 1. Self vs Other Distinction ──

export interface AgentIdentifier {
  id: string;
  ownMotorPattern: number[]; // self motor signature
  ownVoicePattern: number[]; // self voice signature
}

// 영역 영역 영역 영역 자기 (own) 영역 → self vs other 영역.
// 학술 정합: 영역 영역 영역 영역 영역 영역 영역 → recognized as "me".
export function isSelf(
  observedMotor: ReadonlyArray<number>,
  selfIdentifier: AgentIdentifier,
  threshold: number = 0.8,
): boolean {
  if (observedMotor.length === 0 || selfIdentifier.ownMotorPattern.length === 0) return false;
  const len = Math.min(observedMotor.length, selfIdentifier.ownMotorPattern.length);
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < len; i += 1) {
    dot += observedMotor[i] * selfIdentifier.ownMotorPattern[i];
    normA += observedMotor[i] * observedMotor[i];
    normB += selfIdentifier.ownMotorPattern[i] * selfIdentifier.ownMotorPattern[i];
  }
  if (normA === 0 || normB === 0) return false;
  const similarity = dot / (Math.sqrt(normA) * Math.sqrt(normB));
  return similarity >= threshold;
}

// ── 2. Mirror Test (Gallup 1970) ──

export interface MirrorTestResult {
  passed: boolean;
  selfRecognitionConfidence: number; // 0..1
  evidence: string;
}

// 거울 영역 영역 영역 영역 영역 영역 영역 + 영역 mark 영역 만져 → MSR pass.
export function mirrorTest(
  reflectionMatches: boolean,       // 거울 영역 영역 영역 영역 영역 영역 영역
  markTouchedOnSelf: boolean,       // 영역 영역 영역 영역 보이는 mark 영역 자기 몸 영역 영역
  reflectionConfidence: number,     // 0..1
): MirrorTestResult {
  if (reflectionMatches && markTouchedOnSelf) {
    return {
      passed: true,
      selfRecognitionConfidence: reflectionConfidence,
      evidence: 'reflection match + mark localization on self body',
    };
  }
  if (reflectionMatches && !markTouchedOnSelf) {
    return {
      passed: false,
      selfRecognitionConfidence: reflectionConfidence * 0.5,
      evidence: 'reflection match but no self-directed action',
    };
  }
  return { passed: false, selfRecognitionConfidence: 0, evidence: 'no self recognition' };
}

// ── 3. Self-Awareness Levels (Lewis 1990) ──

export type SelfAwarenessLevel =
  | 'no_self_awareness'        // newborn
  | 'differentiation'           // 영역 영역 자기 영역 영역 영역 영역
  | 'situation'                 // 자기 영역 영역 영역 영역 영역
  | 'identification'            // 영역 영역 영역 자기
  | 'permanence'                // 영역 자기 영역 영역
  | 'self_consciousness';       // 영역 영역 영역

const LEVEL_ORDER: SelfAwarenessLevel[] = [
  'no_self_awareness', 'differentiation', 'situation', 'identification', 'permanence', 'self_consciousness',
];

export function selfAwarenessLevel(level: SelfAwarenessLevel): number {
  return LEVEL_ORDER.indexOf(level);
}

// ── 4. Agency Attribution (Frith 1992) ──

// 영역 행동 영역 자기 (sense of agency) 영역 영역 → "내가 했다".
// 학술 정합: comparator model — predicted vs actual sensory consequence.
export function attributeAgency(
  predictedOutcome: ReadonlyArray<number>,
  actualOutcome: ReadonlyArray<number>,
  threshold: number = 0.3,
): { isSelfCaused: boolean; predictionError: number } {
  if (predictedOutcome.length !== actualOutcome.length || predictedOutcome.length === 0) {
    return { isSelfCaused: false, predictionError: 1 };
  }
  let sumSq = 0;
  for (let i = 0; i < predictedOutcome.length; i += 1) {
    sumSq += (predictedOutcome[i] - actualOutcome[i]) ** 2;
  }
  const error = Math.sqrt(sumSq / predictedOutcome.length);
  return {
    isSelfCaused: error <= threshold,
    predictionError: error,
  };
}

// ── 5. Self-Model (Metzinger 2003) ──

export interface SelfModel {
  bodyMap: Map<string, number[]>; // body part → location
  goals: string[];
  beliefs: Map<string, boolean>;
  emotionalState: { valence: number; arousal: number };
}

export function createSelfModel(): SelfModel {
  return {
    bodyMap: new Map(),
    goals: [],
    beliefs: new Map(),
    emotionalState: { valence: 0, arousal: 0 },
  };
}

export function updateBodyPart(model: SelfModel, part: string, location: ReadonlyArray<number>): SelfModel {
  const newBodyMap = new Map(model.bodyMap);
  newBodyMap.set(part, [...location]);
  return { ...model, bodyMap: newBodyMap };
}

export function addBelief(model: SelfModel, belief: string, truthValue: boolean): SelfModel {
  const newBeliefs = new Map(model.beliefs);
  newBeliefs.set(belief, truthValue);
  return { ...model, beliefs: newBeliefs };
}

// Self-model coherence score — body parts 영역 + beliefs 영역 영역 영역 영역.
export function selfModelCoherence(model: SelfModel): number {
  const bodyScore = Math.min(1, model.bodyMap.size / 10); // 10 body parts target
  const beliefScore = Math.min(1, model.beliefs.size / 20); // 20 beliefs target
  return (bodyScore + beliefScore) / 2;
}
