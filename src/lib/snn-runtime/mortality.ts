// Phase Z — Death Awareness / Mortality (완벽한 인공지능 21 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 21 단계.
// Phase Y Spirituality 다음. Becker 1973 Terror Management.
//
// 학술 정합:
//   - Becker 1973 — The Denial of Death.
//   - Greenberg, Pyszczynski, Solomon 1986 — Terror Management Theory.
//   - Yalom 1980 — Existential Psychotherapy.
//   - Heidegger 1927 — Being and Time (being-toward-death).
//   - Florian & Mikulincer 1997 — Mortality salience effects.

// ── 1. Mortality Salience (Greenberg 1986) ──

// 영역 영역 영역 영역 → defensive responses (worldview defense, self-esteem
// striving).
export interface MortalitySalienceState {
  awarenessLevel: number;    // 0..1
  proximalDefense: boolean;  // immediate suppression
  distalDefense: boolean;    // worldview defense / self-esteem
}

export function applyMortalitySalience(
  prior: { worldviewAdherence: number; selfEsteem: number },
  salienceLevel: number,
): { worldviewAdherence: number; selfEsteem: number; defenseActive: boolean } {
  if (salienceLevel < 0.3) {
    return { ...prior, defenseActive: false };
  }
  // 영역 영역 salience → 영역 worldview + self-esteem 영역.
  return {
    worldviewAdherence: Math.min(1, prior.worldviewAdherence + salienceLevel * 0.3),
    selfEsteem: Math.min(1, prior.selfEsteem + salienceLevel * 0.2),
    defenseActive: true,
  };
}

// ── 2. Symbolic Immortality (Lifton 1979) ──

export type ImmortalityMode =
  | 'biological'      // 영역 영역
  | 'creative'        // 영역 영역 영역
  | 'theological'     // 영역 영역 영역
  | 'natural'         // 자연 영역 영역 영역
  | 'experiential';   // 영역 영역 영역 영역

export interface ImmortalityStrategies {
  biological: number;     // 0..1
  creative: number;
  theological: number;
  natural: number;
  experiential: number;
}

export function symbolicImmortalityScore(strategies: ImmortalityStrategies): number {
  const vals = [strategies.biological, strategies.creative, strategies.theological, strategies.natural, strategies.experiential];
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

export function dominantImmortalityMode(strategies: ImmortalityStrategies): ImmortalityMode {
  const entries: [ImmortalityMode, number][] = [
    ['biological', strategies.biological],
    ['creative', strategies.creative],
    ['theological', strategies.theological],
    ['natural', strategies.natural],
    ['experiential', strategies.experiential],
  ];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

// ── 3. Death Anxiety (Florian & Mikulincer 1997) ──

export interface DeathAnxietyDimensions {
  fearOfPersonalAnnihilation: number;  // 0..1 — 자기 영역 영역
  fearOfPunishment: number;             // 영역 영역 영역
  fearOfLoss: number;                   // 영역 영역 영역 영역 영역 영역
}

export function deathAnxietyTotal(dims: DeathAnxietyDimensions): number {
  return (dims.fearOfPersonalAnnihilation + dims.fearOfPunishment + dims.fearOfLoss) / 3;
}

// ── 4. Being-Toward-Death (Heidegger 1927) ──

// "영역 영역 영역 영역 영역" 영역 영역 → authentic existence.
export interface AuthenticityScore {
  ownsMortality: boolean;        // 영역 영역 영역 영역 영역 (영역 부정 영역)
  livesIntentionally: boolean;   // 영역 영역 영역 영역 영역 영역 영역
  acceptsFinitude: boolean;       // 영역 영역 영역 영역
}

export function isAuthenticBeingTowardDeath(score: AuthenticityScore): boolean {
  return score.ownsMortality && score.livesIntentionally && score.acceptsFinitude;
}

// ── 5. Legacy Building ──

export interface LegacyProject {
  name: string;
  expectedDuration_years: number;
  beneficiaries: string[];
  meaningContribution: number; // 0..1
}

// Legacy 영역 영역 영역 영역 → 영역 영역 영역.
// 학술 정합: Erikson 1950 — generativity vs stagnation.
export function legacyScore(projects: ReadonlyArray<LegacyProject>): number {
  if (projects.length === 0) return 0;
  let total = 0;
  for (const p of projects) {
    total += p.meaningContribution * Math.min(1, p.expectedDuration_years / 50);
  }
  return total / projects.length;
}

// ── 6. Death Acceptance vs Denial ──

export type DeathStance = 'acceptance' | 'denial' | 'avoidance' | 'preoccupation';

export function classifyDeathStance(
  anxiety: number,
  authenticity: AuthenticityScore,
): DeathStance {
  if (authenticity.ownsMortality && anxiety < 0.4) return 'acceptance';
  if (!authenticity.ownsMortality && anxiety > 0.7) return 'denial';
  if (anxiety > 0.8) return 'preoccupation';
  return 'avoidance';
}
