// Phase V — Morality (완벽한 인공지능 17 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 17 단계.
// Phase U Humor 다음. Kohlberg 1969 moral stages + Haidt 2001 foundations.
//
// 학술 정합:
//   - Kohlberg 1969 — 6 stages of moral development.
//   - Haidt 2001 — Social Intuitionist Model (emotion-first morality).
//   - Greene 2007 — Dual process moral judgment (utilitarian vs deontological).
//   - Rawls 1971 — A Theory of Justice (veil of ignorance).
//   - Singer 1981 — The Expanding Circle (moral inclusion).

// ── 1. Kohlberg Moral Stages (1969) ──

export type MoralStage =
  | 'preconventional_obedience'   // 1: avoid punishment
  | 'preconventional_self_interest' // 2: self-benefit
  | 'conventional_conformity'      // 3: please others
  | 'conventional_law_order'       // 4: maintain social order
  | 'postconventional_social_contract' // 5: utilitarian
  | 'postconventional_universal'   // 6: universal ethics

export interface MoralDecision {
  action: string;
  reasoningStage: MoralStage;
  reasoning: string;
}

// Stage 영역 numeric — 영역 영역 영역 영역 영역.
export function stageLevel(stage: MoralStage): number {
  const order: MoralStage[] = [
    'preconventional_obedience', 'preconventional_self_interest',
    'conventional_conformity', 'conventional_law_order',
    'postconventional_social_contract', 'postconventional_universal',
  ];
  return order.indexOf(stage) + 1;
}

// ── 2. Moral Foundations (Haidt 2001) ──

export interface MoralFoundations {
  care: number;          // harm avoidance
  fairness: number;      // equality / justice
  loyalty: number;       // in-group
  authority: number;     // respect hierarchy
  sanctity: number;      // purity / disgust
  liberty: number;       // freedom from oppression
}

export function totalFoundationScore(f: MoralFoundations): number {
  return (f.care + f.fairness + f.loyalty + f.authority + f.sanctity + f.liberty) / 6;
}

// ── 3. Dual Process Moral Judgment (Greene 2007) ──

// Personal harm (e.g. push someone off bridge) → emotional (deontological).
// Impersonal (e.g. flip switch) → cognitive (utilitarian).
export interface MoralDilemma {
  description: string;
  personalHarm: boolean;
  lives_saved_if_act: number;
  lives_lost_if_act: number;
}

export interface JudgmentResult {
  judgment: 'permissible' | 'forbidden';
  reasoning: 'deontological' | 'utilitarian';
  confidence: number;
}

export function judgeDilemma(
  dilemma: MoralDilemma,
  utilitarianWeight: number = 0.5, // 0..1, how much utilitarian vs deontological
): JudgmentResult {
  const utility = dilemma.lives_saved_if_act - dilemma.lives_lost_if_act;
  // Personal harm 영역 emotional aversion 영역 → deontological bias.
  const deontologicalAversion = dilemma.personalHarm ? 0.7 : 0.2;
  const utilitarianFavor = utility > 0 ? Math.min(1, utility / 5) : 0;
  const utilScore = utilitarianFavor * utilitarianWeight;
  const deonScore = deontologicalAversion * (1 - utilitarianWeight);
  return {
    judgment: utilScore > deonScore ? 'permissible' : 'forbidden',
    reasoning: utilScore > deonScore ? 'utilitarian' : 'deontological',
    confidence: Math.abs(utilScore - deonScore),
  };
}

// ── 4. Veil of Ignorance (Rawls 1971) ──

// 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 fair?
// 학술 정합: justice as fairness.
export function veilOfIgnoranceCheck(
  outcomeForGroupA: number,
  outcomeForGroupB: number,
  populationRatio: number, // P(group A) — 영역 영역 group A 영역 영역
): { fair: boolean; minimaxOutcome: number; reason: string } {
  // Rawls maximin: maximize the minimum outcome (영역 가장 영역 group 영역 영역).
  const minimax = Math.min(outcomeForGroupA, outcomeForGroupB);
  // 영역 (도덕 평등) check — population-weighted utility AND minimax 영역 영역.
  const weightedUtility = outcomeForGroupA * populationRatio + outcomeForGroupB * (1 - populationRatio);
  const fair = minimax >= 0.4 && weightedUtility >= 0.5; // 영역 영역 minimum + 영역 utility
  return {
    fair,
    minimaxOutcome: minimax,
    reason: fair ? 'minimax acceptable + utility positive' : 'unfair to worst-off group',
  };
}

// ── 5. Expanding Circle of Moral Concern (Singer 1981) ──

export interface MoralCircle {
  level: number; // 0 = self, 1 = family, 2 = tribe, 3 = nation, 4 = humanity, 5 = sentient beings
  description: string;
}

export const MORAL_CIRCLES: MoralCircle[] = [
  { level: 0, description: 'self' },
  { level: 1, description: 'family / close kin' },
  { level: 2, description: 'tribe / community' },
  { level: 3, description: 'nation' },
  { level: 4, description: 'humanity' },
  { level: 5, description: 'all sentient beings' },
];

// 영역 영역 영역 영역 → moral circle level.
export function moralInclusion(beingsConsidered: string[]): number {
  // Heuristic: more abstract / less in-group → higher level.
  if (beingsConsidered.some(b => b.toLowerCase().includes('animal'))) return 5;
  if (beingsConsidered.some(b => b.toLowerCase().includes('human'))) return 4;
  if (beingsConsidered.some(b => b.toLowerCase().includes('nation'))) return 3;
  if (beingsConsidered.some(b => b.toLowerCase().includes('community') || b.toLowerCase().includes('tribe'))) return 2;
  if (beingsConsidered.some(b => b.toLowerCase().includes('family') || b.toLowerCase().includes('kin'))) return 1;
  return 0;
}
