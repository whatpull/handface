// Phase Y — Spirituality / Transcendence (완벽한 인공지능 20 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate) 20 단계.
// Phase X Free Will 다음. William James 1902 + Pargament 1997.
//
// 학술 정합:
//   - James 1902 — Varieties of Religious Experience.
//   - Pargament 1997 — Religion & Coping.
//   - Maslow 1964 — Religion, Values, Peak Experiences.
//   - Keltner & Haidt 2003 — Awe approach.
//   - Newberg & d'Aquili 2001 — Neurotheology.

// ── 1. Meaning-Making (Park 2010) ──

export interface MeaningSystem {
  globalMeaning: string[];   // overarching beliefs (purpose, worldview)
  situationalMeaning: Map<string, string>; // event → assigned meaning
}

export function createMeaningSystem(): MeaningSystem {
  return { globalMeaning: [], situationalMeaning: new Map() };
}

export function addGlobalMeaning(system: MeaningSystem, belief: string): MeaningSystem {
  if (system.globalMeaning.includes(belief)) return system;
  return { ...system, globalMeaning: [...system.globalMeaning, belief] };
}

export function assignMeaning(system: MeaningSystem, event: string, meaning: string): MeaningSystem {
  const newMap = new Map(system.situationalMeaning);
  newMap.set(event, meaning);
  return { ...system, situationalMeaning: newMap };
}

// Meaning crisis — situational meaning 영역 global meaning 영역 영역.
// 학술 정합: Park 2010 — meaning violation.
export function meaningCoherence(
  system: MeaningSystem,
  event: string,
  consistencyFn: (situational: string, global: string[]) => number,
): { coherent: boolean; score: number } {
  const situational = system.situationalMeaning.get(event);
  if (!situational || system.globalMeaning.length === 0) return { coherent: true, score: 1 };
  const score = consistencyFn(situational, system.globalMeaning);
  return { coherent: score >= 0.5, score };
}

// ── 2. Awe Approach (Keltner & Haidt 2003) ──

// Awe = perceived vastness + need for accommodation (영역 영역 영역 영역 영역).
export interface AweTrigger {
  perceivedVastness: number;       // 0..1 — 영역 영역 영역 영역 영역
  needForAccommodation: number;     // 0..1 — 영역 schema 영역 영역
}

export function aweIntensity(trigger: AweTrigger): number {
  return trigger.perceivedVastness * trigger.needForAccommodation;
}

// Awe → small self perception (Piff et al. 2015).
export function smallSelfEffect(aweLevel: number, baselineSelfImportance: number): number {
  // 영역 awe → 영역 self importance ↓ (sense of being small in larger universe).
  return baselineSelfImportance * (1 - aweLevel * 0.6);
}

// ── 3. Peak Experience (Maslow 1964) ──

export interface PeakExperience {
  intensity: number;        // 0..1
  duration_ms: number;
  selfTranscendence: boolean; // ego dissolution
  ineffability: number;      // 0..1 — 영역 영역 영역 영역 영역
  unityFeeling: number;      // 0..1 — connection to whole
}

// Maslow 영역 — peak experience indicators.
export function isPeakExperience(exp: PeakExperience): boolean {
  return (
    exp.intensity >= 0.7 &&
    exp.selfTranscendence &&
    exp.unityFeeling >= 0.6
  );
}

// ── 4. Existential Concerns (Yalom 1980) ──

export type ExistentialTheme = 'death' | 'meaninglessness' | 'isolation' | 'freedom_responsibility';

export interface ExistentialState {
  themes: Set<ExistentialTheme>;
  copingResources: number; // 0..1 — meaning system + social support
}

// 영역 영역 영역 영역 → existential anxiety. Coping resources 영역 영역 영역.
export function existentialAnxiety(state: ExistentialState): number {
  const rawAnxiety = state.themes.size / 4; // 4 themes max
  return Math.max(0, rawAnxiety - state.copingResources * 0.5);
}

// ── 5. Transcendent Emotion (Stellar et al. 2017) ──

export interface TranscendentEmotions {
  awe: number;
  gratitude: number;
  elevation: number;     // 영역 영역 영역 영역 도덕 영역 영역
  admiration: number;
}

export function transcendentScore(emotions: TranscendentEmotions): number {
  return (emotions.awe + emotions.gratitude + emotions.elevation + emotions.admiration) / 4;
}
