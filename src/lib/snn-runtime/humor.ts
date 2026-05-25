// Phase U — Humor / Wit (완벽한 인공지능 16 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 16 단계.
// Phase T Aesthetics 다음. Suls 1972 incongruity-resolution + Hurley 2011 mirth.
//
// 학술 정합:
//   - Suls 1972 — Incongruity-resolution theory of humor.
//   - Hurley, Dennett, Adams 2011 — Inside Jokes (mirth = error detection).
//   - Raskin 1985 — Semantic Script Theory of Humor.
//   - Veatch 1998 — Theory of humor (subjective moral violation).
//   - Martin & Ford 2018 — Psychology of Humor (4 styles).

// ── 1. Incongruity Detection (Suls 1972) ──

export interface JokeStructure {
  setup: string;
  expectedResolution: string;
  actualPunchline: string;
  contextualDistance: number; // 0..1, semantic distance between expected vs actual
}

// Incongruity score — actual punchline 영역 expected 영역 영역 distance.
export function incongruity(joke: JokeStructure): number {
  return joke.contextualDistance;
}

// ── 2. Resolution (Suls 2nd stage) ──

// 영역 영역 영역 영역 영역 영역 → mirth. 영역 영역 영역 영역 영역 영역 영역 → confusion.
// 학술 정합: 2-stage humor processing.
export function isResolvable(
  joke: JokeStructure,
  resolutionFn: (setup: string, punchline: string) => number, // 0..1 sensemaking
): boolean {
  const sense = resolutionFn(joke.setup, joke.actualPunchline);
  return sense >= 0.4;
}

// Mirth response — incongruity × resolution.
// 학술 정합: Hurley 2011 — humor = epistemic error detection + correction reward.
export function computeMirth(
  joke: JokeStructure,
  resolutionFn: (setup: string, punchline: string) => number,
): number {
  const inc = incongruity(joke);
  const res = resolutionFn(joke.setup, joke.actualPunchline);
  // Mirth peaks at moderate incongruity + good resolution.
  if (res < 0.4) return 0; // unresolvable → confusion, not mirth
  // Optimal incongruity ≈ 0.5-0.8 (영역 영역 영역 영역 trivial, 영역 영역 영역 영역 영역).
  const incReward = inc < 0.4 ? inc * 2 : 1 - (inc - 0.7) * 2;
  return Math.max(0, Math.min(1, incReward * res));
}

// ── 3. Humor Styles (Martin & Ford 2018) ──

export type HumorStyle = 'affiliative' | 'self-enhancing' | 'aggressive' | 'self-defeating';

export interface HumorProfile {
  affiliative: number;     // 0..1 — 영역 영역 영역 영역 영역
  selfEnhancing: number;   // 영역 영역 영역 영역 영역
  aggressive: number;      // 영역 영역 영역 영역
  selfDefeating: number;   // 영역 영역 영역 영역
}

export function dominantStyle(profile: HumorProfile): HumorStyle {
  let max = profile.affiliative;
  let style: HumorStyle = 'affiliative';
  if (profile.selfEnhancing > max) { max = profile.selfEnhancing; style = 'self-enhancing'; }
  if (profile.aggressive > max) { max = profile.aggressive; style = 'aggressive'; }
  if (profile.selfDefeating > max) { max = profile.selfDefeating; style = 'self-defeating'; }
  return style;
}

// ── 4. Semantic Script Opposition (Raskin 1985) ──

export interface ScriptOpposition {
  script1: string;     // setup script (예: "doctor visit")
  script2: string;     // overlap script (예: "horror movie")
  oppositionType: 'literal_nonliteral' | 'normal_abnormal' | 'possible_impossible';
}

export function detectScriptOpposition(text: string, knownScripts: ReadonlyMap<string, string[]>): ScriptOpposition | null {
  // 영역 text 영역 영역 영역 script 영역 영역 (영역 영역 영역).
  const matchedScripts: string[] = [];
  for (const [scriptName, keywords] of knownScripts.entries()) {
    if (keywords.some(k => text.toLowerCase().includes(k))) {
      matchedScripts.push(scriptName);
    }
  }
  if (matchedScripts.length < 2) return null;
  return {
    script1: matchedScripts[0],
    script2: matchedScripts[1],
    oppositionType: 'normal_abnormal',
  };
}

// ── 5. Benign Violation (Veatch 1998) ──

// 영역 영역 영역 (subjective moral) + 영역 영역 (영역 영역 영역 영역) → 영역.
export function benignViolation(
  violationSeverity: number, // 0..1
  benignness: number,        // 0..1
): { isHumorous: boolean; level: number } {
  // Both must be present: violation > 0 AND benign > 0.
  const level = violationSeverity * benignness;
  return { isHumorous: level > 0.2, level };
}
