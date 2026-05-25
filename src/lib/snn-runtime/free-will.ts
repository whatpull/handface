// Phase X — Free Will / Agency (완벽한 인공지능 19 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 19 단계.
// Phase W Self-Recognition 다음. Libet 1985 + Wegner 2002 conscious will.
//
// 학술 정합:
//   - Libet 1985 — Readiness potential precedes conscious will.
//   - Wegner 2002 — The Illusion of Conscious Will.
//   - Dennett 2003 — Freedom Evolves (compatibilist).
//   - Schurger et al. 2012 — Reinterpretation of Libet (stochastic accumulator).
//   - List 2014 — Free Will (3 conditions: alt possibilities, causation, intent).

// ── 1. Readiness Potential (Libet 1985) ──

// 영역 결정 전 영역 (RP) 영역 일정 영역 영역 영역 영역 영역 영역 영역.
// 학술 정합: 영역 영역 conscious decision 전 ~500ms 영역 누적.
export interface ReadinessAccumulator {
  level: number;          // current level
  threshold: number;      // decision threshold
  driftRate: number;      // per-step accumulation
}

export function accumulateReadiness(
  acc: ReadinessAccumulator,
  noise: number = 0.1,
): { next: ReadinessAccumulator; decisionTriggered: boolean } {
  const nextLevel = acc.level + acc.driftRate + (Math.random() - 0.5) * noise;
  const triggered = nextLevel >= acc.threshold;
  return {
    next: { ...acc, level: triggered ? 0 : Math.max(0, nextLevel) },
    decisionTriggered: triggered,
  };
}

// Deterministic variant (for testing).
export function accumulateReadinessDeterministic(
  acc: ReadinessAccumulator,
): { next: ReadinessAccumulator; decisionTriggered: boolean } {
  const nextLevel = acc.level + acc.driftRate;
  const triggered = nextLevel >= acc.threshold;
  return {
    next: { ...acc, level: triggered ? 0 : nextLevel },
    decisionTriggered: triggered,
  };
}

// ── 2. Compatibilist Free Will (Dennett 2003) ──

// 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 → "free".
// 학술 정합: 3-condition view.
export interface DecisionContext {
  alternativesAvailable: number;     // how many alternative actions possible
  decisionCausedByAgent: boolean;    // agent 영역 cause (vs externally compelled)
  matchesIntention: boolean;         // 영역 intent 영역 영역
}

export function isCompatibilistFreeAction(ctx: DecisionContext): boolean {
  return (
    ctx.alternativesAvailable >= 2 &&
    ctx.decisionCausedByAgent &&
    ctx.matchesIntention
  );
}

// ── 3. Sense of Authorship (Wegner 2002) ──

// Conscious will = priority (intent before action) + consistency (intent
// matches action) + exclusivity (no other plausible cause).
export interface AuthorshipCues {
  intentionPrecedesAction: boolean; // priority
  intentionMatchesAction: boolean;  // consistency
  noExternalCause: boolean;          // exclusivity
}

export function senseOfAuthorship(cues: AuthorshipCues): number {
  let score = 0;
  if (cues.intentionPrecedesAction) score += 0.4;
  if (cues.intentionMatchesAction) score += 0.4;
  if (cues.noExternalCause) score += 0.2;
  return score;
}

// ── 4. Veto Capacity (Libet 'free won't') ──

// 영역 readiness 영역 영역 → 영역 영역 영역 영역 영역 (conscious veto).
// 학술 정합: Libet 영역 — "free won't" 영역 영역 free will.
export function canVeto(
  readinessLevel: number,
  threshold: number,
  vetoSignal: number, // 0..1 — strength of "no" signal
): boolean {
  const margin = readinessLevel - threshold;
  // Veto 영역 영역 영역 영역 strong veto signal 영역.
  return vetoSignal > margin;
}

// ── 5. Stochastic Accumulator (Schurger et al. 2012) ──

// Libet 영역 영역 reinterpretation — RP 영역 영역 영역 decision 영역 영역 영역,
// 영역 영역 noise 누적 영역 threshold 영역 영역 영역 영역.
export function stochasticAccumulator(
  trials: number,
  driftRate: number = 0.01,
  threshold: number = 1.0,
  noiseSeed: number = 42,
): { decisionTimes: number[]; meanLatency: number } {
  // Simple LCG for deterministic noise.
  let seed = noiseSeed;
  const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return (seed / 0x7fffffff) - 0.5; };
  const decisionTimes: number[] = [];
  for (let t = 0; t < trials; t += 1) {
    let level = 0;
    let step = 0;
    while (level < threshold && step < 10000) {
      level += driftRate + rng() * 0.05;
      if (level < 0) level = 0;
      step += 1;
    }
    decisionTimes.push(step);
  }
  const mean = decisionTimes.reduce((a, b) => a + b, 0) / decisionTimes.length;
  return { decisionTimes, meanLatency: mean };
}
