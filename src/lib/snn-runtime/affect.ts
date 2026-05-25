// Phase K — Emotion / Affect (완벽한 인공지능 6 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 6 단계.
// Phase F (Multi-Modality) + G (Consciousness) + H (Embodiment) + I (Social) +
// J (Meta-Cognition) 다음. 감정 시스템 영역 cognition 영역 통합.
//
// 학술 정합:
//   - Russell 1980 — circumplex model of affect (valence × arousal axis).
//   - Damasio 1994 — somatic marker hypothesis (bodily response → decision).
//   - LeDoux 1996 — emotional brain (amygdala fast vs cortex slow path).
//   - Picard 1997 — Affective Computing.
//   - Plutchik 1980 — 8 basic emotions wheel.

// ── 1. Valence-Arousal Axis (Russell 1980) ──

export interface AffectiveState {
  valence: number;  // -1 (negative) .. +1 (positive)
  arousal: number;  // 0 (calm) .. 1 (excited)
  timestamp: number;
}

// 자극 영역 영역 valence + arousal 평가.
// Simplified — reward signal + activity intensity 영역 영역.
export function appraiseAffect(
  reward: number,      // [-1, 1] — negative = aversive, positive = rewarding
  activityLevel: number, // [0, 1] — neural firing intensity
  timestamp: number = Date.now(),
): AffectiveState {
  return {
    valence: Math.max(-1, Math.min(1, reward)),
    arousal: Math.max(0, Math.min(1, activityLevel)),
    timestamp,
  };
}

// Circumplex model 8 basic emotions (Russell 1980 + Plutchik 1980).
//   - Joy:    valence +, arousal moderate
//   - Excited: valence +, arousal high
//   - Calm:   valence +, arousal low
//   - Sadness: valence -, arousal low
//   - Anger:  valence -, arousal high
//   - Fear:   valence -, arousal high
//   - Bored:  valence -, arousal low
//   - Neutral: zero
export function classifyEmotion(state: AffectiveState): string {
  const v = state.valence;
  const a = state.arousal;
  if (Math.abs(v) < 0.2 && a < 0.2) return 'neutral';
  if (v > 0.3 && a > 0.7) return 'excited';
  if (v > 0.3 && a < 0.3) return 'calm';
  if (v > 0.3) return 'joy';
  if (v < -0.3 && a > 0.7) return 'fear'; // 단순 — anger 영역 valence 영역 영역 같음
  if (v < -0.3 && a < 0.3) return 'sadness';
  if (v < -0.3) return 'distress';
  return 'neutral';
}

// ── 2. Somatic Markers (Damasio 1994) ──

export interface SomaticMarker {
  context: string;        // 어떤 상황 (예: 'risky_action', 'cooperative_partner')
  affectiveResponse: AffectiveState;
  strength: number;       // 0..1 — learned association strength
}

// 학습된 somatic marker 영역 영역 decision bias 영역.
// 학술 정합: Damasio 1994 — bodily 'gut feeling' 영역 영역 decision making 영역.
export function biasDecision(
  options: ReadonlyArray<{ action: string; expectedUtility: number }>,
  markers: ReadonlyArray<SomaticMarker>,
  contextOf: (action: string) => string,
): { action: string; biasedUtility: number; affectBonus: number }[] {
  return options.map((opt) => {
    const context = contextOf(opt.action);
    const relevant = markers.filter((m) => m.context === context);
    let affectBonus = 0;
    for (const m of relevant) {
      // Positive valence → bonus, negative → penalty. weighted by strength.
      affectBonus += m.affectiveResponse.valence * m.strength;
    }
    return {
      action: opt.action,
      biasedUtility: opt.expectedUtility + affectBonus,
      affectBonus,
    };
  }).sort((a, b) => b.biasedUtility - a.biasedUtility);
}

// ── 3. Affective Regulation (homeostatic) ──

// 영역 emotional state 영역 baseline 영역 영역 — 학술 정합: Larsen 2000
// emotion regulation, Gross 1998 process model.
export interface MoodBaseline {
  baselineValence: number;
  baselineArousal: number;
  adaptationRate: number; // 0..1, how fast mood drifts
}

export const DEFAULT_MOOD: MoodBaseline = {
  baselineValence: 0,
  baselineArousal: 0.3,
  adaptationRate: 0.05,
};

// 현재 affective state → baseline mood update (slow adaptation).
// 학술 정합: Hedonic adaptation (Diener et al. 2006).
export function adaptMood(
  currentMood: MoodBaseline,
  recentAffect: AffectiveState,
): MoodBaseline {
  return {
    ...currentMood,
    baselineValence: currentMood.baselineValence +
      (recentAffect.valence - currentMood.baselineValence) * currentMood.adaptationRate,
    baselineArousal: currentMood.baselineArousal +
      (recentAffect.arousal - currentMood.baselineArousal) * currentMood.adaptationRate,
  };
}

// Emotional regulation strategy — strong negative emotion 영역 cognitive
// reappraisal (Gross 1998).
export function regulateAffect(
  current: AffectiveState,
  threshold: number = -0.7,
  regulationStrength: number = 0.3,
): AffectiveState {
  if (current.valence < threshold) {
    // Reappraisal — valence 영역 영역 영역 영역 영역.
    return {
      ...current,
      valence: current.valence + regulationStrength,
    };
  }
  return current;
}

// ── 4. Affective Decision Modulation ──

// 영역 emotional state → action selection 영역 영역.
// 학술 정합: Lerner & Keltner 2000 — emotion → judgment / decision.
//   high arousal → risk-taking ↑.
//   negative valence → caution ↑.
export function modulateRiskTolerance(
  baseRiskTolerance: number,
  affect: AffectiveState,
): number {
  // arousal 영역 → risk-taking ↑ (excited 영역 영역 영역).
  // negative valence → risk-taking ↓ (영역 영역 영역).
  const arousalBoost = affect.arousal * 0.3;
  const valencePenalty = affect.valence < 0 ? affect.valence * 0.3 : 0;
  return Math.max(0, Math.min(1, baseRiskTolerance + arousalBoost + valencePenalty));
}
