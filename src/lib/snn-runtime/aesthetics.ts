// Phase T — Aesthetics (완벽한 인공지능 15 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 15 단계.
// Phase S Cultural 다음. Berlyne 1970 collative variables + Kant 1790
// aesthetic judgment.
//
// 학술 정합:
//   - Berlyne 1970 — Collative variables (novelty/complexity/uncertainty).
//   - Kant 1790 — Critique of Judgment (disinterested pleasure).
//   - Reber et al. 2004 — Processing fluency theory of aesthetic pleasure.
//   - Leder et al. 2004 — Aesthetic episode model.
//   - Chatterjee & Vartanian 2014 — Neuroaesthetics.

// ── 1. Wundt-Berlyne Curve (inverted U) ──

// 영역 arousal level 영역 hedonic value 영역 영역 — 영역 too low (boring), 영역 영역
// too high (overwhelm), 영역 영역 optimal.
// 학술 정합: Berlyne 1970 — collative motivation.
export function hedonicValue(arousal: number): number {
  // Inverted U: peak at arousal ≈ 0.5.
  const peak = 0.5;
  const width = 0.3;
  const distance = arousal - peak;
  return Math.max(0, 1 - (distance * distance) / (width * width));
}

// ── 2. Processing Fluency (Reber et al. 2004) ──

// 영역 영역 영역 영역 (high fluency) + 영역 영역 (some novelty) → aesthetic
// pleasure.
export interface FluencyMetrics {
  perceptualFluency: number; // 0..1 — 영역 영역 영역 (symmetry / contrast 영역)
  conceptualFluency: number; // 0..1 — meaning 영역 영역 영역
  novelty: number;           // 0..1
}

export function aestheticPleasure(metrics: FluencyMetrics): number {
  // Pleasure = fluency × moderate novelty (sweet spot).
  const avgFluency = (metrics.perceptualFluency + metrics.conceptualFluency) / 2;
  const noveltyBoost = hedonicValue(metrics.novelty); // inverted U on novelty.
  return avgFluency * noveltyBoost;
}

// ── 3. Symmetry Detection (perceptual fluency proxy) ──

// 영역 영역 영역 영역 (axis 영역 영역) 영역 → symmetry score.
export function symmetryScore(pattern: ReadonlyArray<number>, axisLength: number): number {
  if (pattern.length === 0 || axisLength <= 1) return 0;
  // Vertical symmetry: pattern[i] vs pattern[axisLength - 1 - i] (within rows).
  const rows = Math.floor(pattern.length / axisLength);
  let matches = 0;
  let total = 0;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < Math.floor(axisLength / 2); c += 1) {
      const left = pattern[r * axisLength + c];
      const right = pattern[r * axisLength + (axisLength - 1 - c)];
      if (left === right) matches += 1;
      total += 1;
    }
  }
  return total > 0 ? matches / total : 0;
}

// ── 4. Complexity (Kolmogorov-style proxy) ──

// Entropy 영역 영역 영역 (Shannon).
export function complexityEntropy(pattern: ReadonlyArray<number>): number {
  if (pattern.length === 0) return 0;
  const counts = new Map<number, number>();
  for (const v of pattern) counts.set(v, (counts.get(v) ?? 0) + 1);
  let entropy = 0;
  for (const c of counts.values()) {
    const p = c / pattern.length;
    if (p > 0) entropy -= p * Math.log2(p);
  }
  const maxEntropy = Math.log2(counts.size || 1);
  return maxEntropy > 0 ? entropy / maxEntropy : 0;
}

// ── 5. Aesthetic Episode Model (Leder et al. 2004) ──

export interface AestheticEpisode {
  stimulus: string;
  perceptualAnalysis: { complexity: number; symmetry: number };
  cognitiveMastering: { novelty: number; familiarity: number };
  emotionalEvaluation: number; // -1..1
  finalJudgment: number;       // 0..1 — aesthetic value
}

// 5-stage aesthetic processing.
export function aestheticEpisode(
  stimulus: string,
  pattern: ReadonlyArray<number>,
  axisLength: number,
  novelty: number,
): AestheticEpisode {
  const complexity = complexityEntropy(pattern);
  const symmetry = symmetryScore(pattern, axisLength);
  // Perceptual fluency ≈ symmetry; conceptual ≈ 1 - complexity (영역 영역 영역 영역 영역).
  const fluency: FluencyMetrics = {
    perceptualFluency: symmetry,
    conceptualFluency: 1 - complexity * 0.5,
    novelty,
  };
  const pleasure = aestheticPleasure(fluency);
  // Emotional evaluation — mapped from pleasure (-1..1).
  const emotion = pleasure * 2 - 1;
  return {
    stimulus,
    perceptualAnalysis: { complexity, symmetry },
    cognitiveMastering: { novelty, familiarity: 1 - novelty },
    emotionalEvaluation: emotion,
    finalJudgment: pleasure,
  };
}

// ── 6. Disinterested Pleasure (Kant 1790) ──

// 영역 utility (food / safety) 영역 영역 영역 영역 영역 영역 영역 → pure
// aesthetic.
// 학술 정합: 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역.
export function isDisinterested(
  perceivedUtility: number, // 0..1, self-serving value
  perceivedBeauty: number,  // 0..1
): boolean {
  // Disinterested when beauty > utility (영역 영역 영역 영역 영역 영역 영역 영역).
  return perceivedBeauty > 0.5 && perceivedUtility < 0.3;
}
