// Phase Y — Spirituality / Transcendence 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  createMeaningSystem, addGlobalMeaning, assignMeaning, meaningCoherence,
  aweIntensity, smallSelfEffect, isPeakExperience,
  existentialAnxiety, transcendentScore,
  type PeakExperience, type ExistentialState,
} from '@/lib/snn-runtime/spirituality';

describe('Phase Y — Meaning-Making (Park 2010)', () => {
  it('add global meaning + assign situational', () => {
    let s = createMeaningSystem();
    s = addGlobalMeaning(s, 'life is connected');
    s = assignMeaning(s, 'helping_stranger', 'expression of connection');
    expect(s.globalMeaning).toContain('life is connected');
    expect(s.situationalMeaning.get('helping_stranger')).toBe('expression of connection');
  });

  it('coherence — situational matches global → coherent', () => {
    let s = createMeaningSystem();
    s = addGlobalMeaning(s, 'kindness');
    s = assignMeaning(s, 'event', 'kindness in action');
    const result = meaningCoherence(s, 'event', () => 0.9);
    expect(result.coherent).toBe(true);
  });

  it('coherence — meaning violation → incoherent', () => {
    let s = createMeaningSystem();
    s = addGlobalMeaning(s, 'world is just');
    s = assignMeaning(s, 'tragedy', 'random suffering');
    const result = meaningCoherence(s, 'tragedy', () => 0.2);
    expect(result.coherent).toBe(false);
  });

  it('영역 영역 또는 영역 영역 → coherent default', () => {
    const s = createMeaningSystem();
    expect(meaningCoherence(s, 'nothing', () => 0).coherent).toBe(true);
  });
});

describe('Phase Y — Awe Approach (Keltner & Haidt 2003)', () => {
  it('영역 vastness + 영역 영역 영역 → high awe', () => {
    expect(aweIntensity({ perceivedVastness: 0.9, needForAccommodation: 0.8 })).toBeCloseTo(0.72, 5);
  });

  it('영역 영역 → low awe', () => {
    expect(aweIntensity({ perceivedVastness: 0.9, needForAccommodation: 0.1 })).toBeCloseTo(0.09, 5);
  });

  it('small self effect — 영역 awe → self importance ↓ (Piff 2015)', () => {
    expect(smallSelfEffect(0.8, 1.0)).toBeCloseTo(0.52, 5); // 1 × (1 - 0.48)
  });
});

describe('Phase Y — Peak Experience (Maslow 1964)', () => {
  it('영역 intensity + transcendence + unity → peak', () => {
    const exp: PeakExperience = {
      intensity: 0.9, duration_ms: 5000,
      selfTranscendence: true, ineffability: 0.8, unityFeeling: 0.85,
    };
    expect(isPeakExperience(exp)).toBe(true);
  });

  it('low intensity → not peak', () => {
    const exp: PeakExperience = {
      intensity: 0.4, duration_ms: 5000,
      selfTranscendence: true, ineffability: 0.8, unityFeeling: 0.85,
    };
    expect(isPeakExperience(exp)).toBe(false);
  });

  it('no transcendence → not peak', () => {
    const exp: PeakExperience = {
      intensity: 0.9, duration_ms: 5000,
      selfTranscendence: false, ineffability: 0.8, unityFeeling: 0.85,
    };
    expect(isPeakExperience(exp)).toBe(false);
  });
});

describe('Phase Y — Existential Concerns (Yalom 1980)', () => {
  it('모든 themes + 영역 coping → 영역 anxiety', () => {
    const state: ExistentialState = {
      themes: new Set(['death', 'meaninglessness', 'isolation', 'freedom_responsibility']),
      copingResources: 0.2,
    };
    expect(existentialAnxiety(state)).toBeCloseTo(0.9, 5); // 1.0 - 0.1
  });

  it('영역 coping → 영역 anxiety', () => {
    const state: ExistentialState = {
      themes: new Set(['death']),
      copingResources: 0.9,
    };
    expect(existentialAnxiety(state)).toBeCloseTo(0, 5); // 0.25 - 0.45 = 0 floor
  });

  it('영역 themes → 영역 anxiety', () => {
    const state: ExistentialState = { themes: new Set(), copingResources: 1 };
    expect(existentialAnxiety(state)).toBe(0);
  });
});

describe('Phase Y — Transcendent Emotion Score (Stellar 2017)', () => {
  it('all emotions high → high score', () => {
    expect(transcendentScore({ awe: 0.8, gratitude: 0.9, elevation: 0.7, admiration: 0.85 })).toBeCloseTo(0.8125, 5);
  });

  it('all zero → 0', () => {
    expect(transcendentScore({ awe: 0, gratitude: 0, elevation: 0, admiration: 0 })).toBe(0);
  });
});

describe('Phase Y — 통합 시나리오: spiritual experience', () => {
  it('awe → small self → peak experience', () => {
    const awe = aweIntensity({ perceivedVastness: 0.95, needForAccommodation: 0.8 });
    expect(awe).toBeGreaterThan(0.7);

    const smallSelf = smallSelfEffect(awe, 1.0);
    expect(smallSelf).toBeLessThan(0.6);

    const peak: PeakExperience = {
      intensity: 0.9, duration_ms: 10000,
      selfTranscendence: true, ineffability: 0.9, unityFeeling: 0.85,
    };
    expect(isPeakExperience(peak)).toBe(true);
  });
});
