// Phase O — Reasoning / Logic (완벽한 인공지능 10 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 10 단계.
// Phase N Memory 다음. deduction / induction / abduction — Peirce 1903.
//
// 학술 정합:
//   - Peirce 1903 — 3 modes of reasoning.
//   - Johnson-Laird 1983 — Mental Models.
//   - Tversky & Kahneman 1974 — Heuristics and biases.
//   - Tenenbaum et al. 2006 — Bayesian models of cognition.

// ── 1. Deduction (formal logic) ──

export interface Proposition {
  id: string;
  truthValue: boolean | null; // null = unknown
}

export interface ImplicationRule {
  name: string;
  antecedents: string[]; // proposition ids
  consequent: string;
}

// Modus ponens — if A→B and A true, then B true.
// 학술 정합: classical propositional logic.
export function deduce(
  propositions: ReadonlyArray<Proposition>,
  rules: ReadonlyArray<ImplicationRule>,
): { derived: Proposition[]; applications: string[] } {
  const propMap = new Map<string, boolean | null>();
  for (const p of propositions) propMap.set(p.id, p.truthValue);
  const applications: string[] = [];
  let changed = true;
  while (changed) {
    changed = false;
    for (const rule of rules) {
      const allTrue = rule.antecedents.every((a) => propMap.get(a) === true);
      if (allTrue && propMap.get(rule.consequent) !== true) {
        propMap.set(rule.consequent, true);
        applications.push(rule.name);
        changed = true;
      }
    }
  }
  return {
    derived: Array.from(propMap.entries()).map(([id, truthValue]) => ({ id, truthValue })),
    applications,
  };
}

// ── 2. Induction (statistical generalization) ──

export interface Observation {
  context: string;
  outcome: string;
}

// 영역 영역 observation 영역 영역 general rule.
// 학술 정합: Hume 1739 — induction problem, Mill 1843 — methods of induction.
export function induceRule(
  observations: ReadonlyArray<Observation>,
  minSupport: number = 0.7,
): { rule: string; confidence: number } | null {
  if (observations.length === 0) return null;
  // 영역 context → outcome 영역 빈도 영역.
  const counts = new Map<string, Map<string, number>>();
  for (const obs of observations) {
    if (!counts.has(obs.context)) counts.set(obs.context, new Map());
    const outcomeMap = counts.get(obs.context)!;
    outcomeMap.set(obs.outcome, (outcomeMap.get(obs.outcome) ?? 0) + 1);
  }
  // 영역 strongest context→outcome rule.
  let bestRule = '';
  let bestConfidence = 0;
  for (const [ctx, outcomeMap] of counts.entries()) {
    let total = 0;
    let max = 0;
    let argmax = '';
    for (const [out, c] of outcomeMap.entries()) {
      total += c;
      if (c > max) { max = c; argmax = out; }
    }
    const confidence = total > 0 ? max / total : 0;
    if (confidence > bestConfidence) {
      bestConfidence = confidence;
      bestRule = `IF context=${ctx} THEN outcome=${argmax}`;
    }
  }
  return bestConfidence >= minSupport ? { rule: bestRule, confidence: bestConfidence } : null;
}

// ── 3. Abduction (inference to best explanation) ──

export interface Hypothesis {
  id: string;
  description: string;
  priorProbability: number;
}

export interface Evidence {
  description: string;
  likelihoodGivenHypothesis: Map<string, number>; // hypothesis id → P(evidence | hyp)
}

// Bayesian abduction — posterior ∝ prior × likelihood.
// 학술 정합: Peirce 1903, Bayesian inference.
export function abduceBest(
  hypotheses: ReadonlyArray<Hypothesis>,
  evidence: Evidence,
): { hypothesis: Hypothesis; posterior: number } | null {
  if (hypotheses.length === 0) return null;
  let totalEvidence = 0;
  const posteriors: { h: Hypothesis; post: number }[] = [];
  for (const h of hypotheses) {
    const lik = evidence.likelihoodGivenHypothesis.get(h.id) ?? 0;
    const post = h.priorProbability * lik;
    posteriors.push({ h, post });
    totalEvidence += post;
  }
  // Normalize.
  if (totalEvidence === 0) return null;
  posteriors.sort((a, b) => b.post - a.post);
  return { hypothesis: posteriors[0].h, posterior: posteriors[0].post / totalEvidence };
}

// ── 4. Cognitive Bias Detection (Tversky & Kahneman 1974) ──

// Confirmation bias detector — consistent evidence 영역 영역 영역 영역 영역 영역 영역.
export function detectConfirmationBias(
  observations: ReadonlyArray<{ supportsBelief: boolean; soughtAfter: boolean }>,
): { biased: boolean; biasScore: number } {
  if (observations.length === 0) return { biased: false, biasScore: 0 };
  let supportSought = 0, refuteIgnored = 0;
  for (const o of observations) {
    if (o.supportsBelief && o.soughtAfter) supportSought += 1;
    if (!o.supportsBelief && !o.soughtAfter) refuteIgnored += 1;
  }
  const biasScore = (supportSought + refuteIgnored) / observations.length;
  return { biased: biasScore > 0.7, biasScore };
}

// ── 5. Mental Model (Johnson-Laird 1983) ──

export interface MentalModel {
  premises: string[];
  validConfigurations: Map<string, boolean>[]; // 영역 valid mental scenario
}

// Premises 영역 영역 영역 valid configurations 영역.
export function constructMentalModel(premises: ReadonlyArray<string>): MentalModel {
  return { premises: [...premises], validConfigurations: [] };
}

// Add scenario to mental model.
export function addScenario(
  model: MentalModel,
  scenario: Map<string, boolean>,
): MentalModel {
  return { ...model, validConfigurations: [...model.validConfigurations, scenario] };
}

// Check if conclusion follows from all configurations.
export function necessarilyTrue(model: MentalModel, conclusion: string): boolean {
  if (model.validConfigurations.length === 0) return false;
  return model.validConfigurations.every((cfg) => cfg.get(conclusion) === true);
}
