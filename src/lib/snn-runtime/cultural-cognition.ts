// Phase S — Cultural Cognition / Pedagogy (완벽한 인공지능 14 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 14 단계.
// Phase R Counterfactual 다음. Csibra & Gergely 2009 natural pedagogy +
// cumulative cultural evolution (Henrich 2015).
//
// 학술 정합:
//   - Csibra & Gergely 2009 — Natural Pedagogy (ostensive cues).
//   - Tomasello 1999 — Cultural ratchet effect.
//   - Henrich 2015 — The Secret of Our Success (cumulative culture).
//   - Boyd & Richerson 1985 — Culture and the Evolutionary Process.
//   - Sperber 1996 — Explaining Culture (epidemiology of representations).

// ── 1. Ostensive Communication (Csibra & Gergely 2009) ──

export interface OstensiveCue {
  type: 'eye_contact' | 'name_call' | 'turn_taking' | 'pointing';
  intensity: number; // 0..1
}

// Receiver 영역 ostensive cue 영역 영역 → "이건 너에게 영역 정보야" 영역 영역.
// 학술 정합: ostensive cues trigger pedagogical stance.
export function isPedagogicalContext(cues: ReadonlyArray<OstensiveCue>): boolean {
  if (cues.length === 0) return false;
  let totalIntensity = 0;
  for (const c of cues) totalIntensity += c.intensity;
  return totalIntensity >= 0.7;
}

// ── 2. Knowledge Transmission ──

export interface KnowledgeUnit {
  id: string;
  content: string;
  generalityLevel: 'specific' | 'general' | 'universal';
  evidenceStrength: number; // 0..1
}

// Pedagogical context 영역 generic encoding (universal interpretation).
// 학술 정합: ostensive cues → generic knowledge encoding (Csibra 2010).
export function encodeKnowledge(
  unit: KnowledgeUnit,
  pedagogical: boolean,
): KnowledgeUnit {
  if (!pedagogical) return unit;
  // Pedagogical context 영역 specific → general 영역 upgrade.
  let newLevel: KnowledgeUnit['generalityLevel'];
  if (unit.generalityLevel === 'specific') newLevel = 'general';
  else if (unit.generalityLevel === 'general') newLevel = 'universal';
  else newLevel = 'universal';
  return { ...unit, generalityLevel: newLevel };
}

// ── 3. Cumulative Culture (Boyd & Richerson 1985) ──

export interface CulturalLineage {
  generation: number;
  artifacts: string[];        // tools / knowledge artifacts at this generation
  cumulativeImprovement: number; // 0..1
}

// 영역 generation 영역 영역 artifact 보존 + 영역 영역 영역 영역 → cumulative
// improvement. 학술 정합: ratchet effect.
export function advanceGeneration(
  current: CulturalLineage,
  newArtifacts: ReadonlyArray<string>,
  retentionFidelity: number = 0.9,
): CulturalLineage {
  // Retain previous (with fidelity loss).
  const retained = current.artifacts.filter(() => Math.random() < retentionFidelity);
  // Add new innovations.
  return {
    generation: current.generation + 1,
    artifacts: [...retained, ...newArtifacts],
    cumulativeImprovement: Math.min(1, current.cumulativeImprovement + newArtifacts.length * 0.05),
  };
}

// Deterministic variant (테스트 영역) — retainAll: 영역 영역.
export function advanceGenerationDeterministic(
  current: CulturalLineage,
  newArtifacts: ReadonlyArray<string>,
  retainAll: boolean = true,
): CulturalLineage {
  const retained = retainAll ? current.artifacts : [];
  return {
    generation: current.generation + 1,
    artifacts: [...retained, ...newArtifacts],
    cumulativeImprovement: Math.min(1, current.cumulativeImprovement + newArtifacts.length * 0.05),
  };
}

// ── 4. Conformist vs Payoff-Biased Learning (Boyd & Richerson) ──

export interface CulturalVariant {
  id: string;
  prevalence: number;     // 0..1, 영역 영역 영역 영역
  payoff: number;         // 0..1, 영역 영역 영역 영역 보상
}

// Conformist bias — 가장 영역 variant 영역.
// 학술 정합: Boyd & Richerson — frequency-dependent transmission.
export function conformistChoice(variants: ReadonlyArray<CulturalVariant>): CulturalVariant | null {
  if (variants.length === 0) return null;
  let max = -1;
  let best: CulturalVariant | null = null;
  for (const v of variants) {
    if (v.prevalence > max) { max = v.prevalence; best = v; }
  }
  return best;
}

// Payoff-biased — 영역 영역 영역 variant 영역.
export function payoffBiasedChoice(variants: ReadonlyArray<CulturalVariant>): CulturalVariant | null {
  if (variants.length === 0) return null;
  let max = -1;
  let best: CulturalVariant | null = null;
  for (const v of variants) {
    if (v.payoff > max) { max = v.payoff; best = v; }
  }
  return best;
}

// ── 5. Cultural Norm Enforcement ──

export interface SocialNorm {
  id: string;
  rule: string;
  enforcementLevel: number; // 0..1 — 영역 영역 영역 영역
}

// Norm violation → punishment cost.
// 학술 정합: Fehr & Gächter 2002 — altruistic punishment maintains cooperation.
export function evaluateViolation(
  norm: SocialNorm,
  violationSeverity: number,
): { punishCost: number; norm: string } {
  return {
    punishCost: norm.enforcementLevel * violationSeverity,
    norm: norm.id,
  };
}
