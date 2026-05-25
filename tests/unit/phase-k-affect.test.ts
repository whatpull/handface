// Phase K — Emotion / Affect 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  appraiseAffect, classifyEmotion, biasDecision,
  adaptMood, regulateAffect, modulateRiskTolerance,
  DEFAULT_MOOD,
  type SomaticMarker, type AffectiveState,
} from '@/lib/snn-runtime/affect';

describe('Phase K — Valence-Arousal Appraisal (Russell 1980)', () => {
  it('positive reward + high activity → positive valence + high arousal', () => {
    const a = appraiseAffect(0.8, 0.9, 100);
    expect(a.valence).toBe(0.8);
    expect(a.arousal).toBe(0.9);
  });

  it('valence + arousal clamping [-1,1] / [0,1]', () => {
    const a = appraiseAffect(2.0, 1.5);
    expect(a.valence).toBe(1.0);
    expect(a.arousal).toBe(1.0);
    const b = appraiseAffect(-2.0, -0.5);
    expect(b.valence).toBe(-1.0);
    expect(b.arousal).toBe(0);
  });
});

describe('Phase K — Emotion Classification', () => {
  it('high valence + high arousal → excited', () => {
    expect(classifyEmotion({ valence: 0.8, arousal: 0.9, timestamp: 0 })).toBe('excited');
  });

  it('high valence + low arousal → calm', () => {
    expect(classifyEmotion({ valence: 0.7, arousal: 0.1, timestamp: 0 })).toBe('calm');
  });

  it('low valence + high arousal → fear', () => {
    expect(classifyEmotion({ valence: -0.7, arousal: 0.9, timestamp: 0 })).toBe('fear');
  });

  it('low valence + low arousal → sadness', () => {
    expect(classifyEmotion({ valence: -0.7, arousal: 0.1, timestamp: 0 })).toBe('sadness');
  });

  it('zero state → neutral', () => {
    expect(classifyEmotion({ valence: 0, arousal: 0, timestamp: 0 })).toBe('neutral');
  });

  it('moderate negative → distress', () => {
    expect(classifyEmotion({ valence: -0.5, arousal: 0.5, timestamp: 0 })).toBe('distress');
  });
});

describe('Phase K — Somatic Markers (Damasio 1994)', () => {
  it('positive marker → biased toward action with that context', () => {
    const markers: SomaticMarker[] = [
      { context: 'safe', affectiveResponse: { valence: 0.8, arousal: 0.3, timestamp: 0 }, strength: 1.0 },
      { context: 'risky', affectiveResponse: { valence: -0.6, arousal: 0.8, timestamp: 0 }, strength: 1.0 },
    ];
    const ranked = biasDecision(
      [{ action: 'A', expectedUtility: 0.5 }, { action: 'B', expectedUtility: 0.5 }],
      markers,
      (action) => (action === 'A' ? 'safe' : 'risky'),
    );
    expect(ranked[0].action).toBe('A'); // safe + positive marker → bonus
    expect(ranked[0].affectBonus).toBeCloseTo(0.8, 5);
    expect(ranked[1].affectBonus).toBeCloseTo(-0.6, 5);
  });

  it('no markers → utility 영역 그대로', () => {
    const ranked = biasDecision(
      [{ action: 'X', expectedUtility: 0.7 }],
      [],
      () => 'unknown',
    );
    expect(ranked[0].biasedUtility).toBe(0.7);
    expect(ranked[0].affectBonus).toBe(0);
  });
});

describe('Phase K — Mood Adaptation (Hedonic adaptation, Diener 2006)', () => {
  it('positive affect → baseline valence ↑', () => {
    const initial = DEFAULT_MOOD;
    const positive: AffectiveState = { valence: 0.8, arousal: 0.5, timestamp: 0 };
    const updated = adaptMood(initial, positive);
    expect(updated.baselineValence).toBeGreaterThan(initial.baselineValence);
  });

  it('negative affect → baseline ↓', () => {
    const initial = DEFAULT_MOOD;
    const negative: AffectiveState = { valence: -0.5, arousal: 0.5, timestamp: 0 };
    const updated = adaptMood(initial, negative);
    expect(updated.baselineValence).toBeLessThan(initial.baselineValence);
  });

  it('반복 학습 → baseline 영역 convergence', () => {
    let mood = DEFAULT_MOOD;
    const consistent: AffectiveState = { valence: 0.5, arousal: 0.5, timestamp: 0 };
    for (let i = 0; i < 50; i += 1) mood = adaptMood(mood, consistent);
    expect(mood.baselineValence).toBeCloseTo(0.5, 1);
  });
});

describe('Phase K — Affective Regulation (Gross 1998)', () => {
  it('strong negative → reappraisal → valence ↑', () => {
    const dire: AffectiveState = { valence: -0.9, arousal: 0.5, timestamp: 0 };
    const regulated = regulateAffect(dire);
    expect(regulated.valence).toBeGreaterThan(dire.valence);
  });

  it('positive valence → no regulation', () => {
    const happy: AffectiveState = { valence: 0.5, arousal: 0.3, timestamp: 0 };
    const result = regulateAffect(happy);
    expect(result.valence).toBe(0.5);
  });
});

describe('Phase K — Risk Tolerance Modulation (Lerner & Keltner 2000)', () => {
  it('high arousal → risk tolerance ↑', () => {
    const base = 0.5;
    const excited: AffectiveState = { valence: 0.5, arousal: 1.0, timestamp: 0 };
    const modulated = modulateRiskTolerance(base, excited);
    expect(modulated).toBeGreaterThan(base);
  });

  it('negative valence → risk tolerance ↓', () => {
    const base = 0.5;
    const sad: AffectiveState = { valence: -0.8, arousal: 0.2, timestamp: 0 };
    const modulated = modulateRiskTolerance(base, sad);
    expect(modulated).toBeLessThan(base);
  });

  it('clamping [0,1]', () => {
    expect(modulateRiskTolerance(0.95, { valence: 0.9, arousal: 1.0, timestamp: 0 })).toBeLessThanOrEqual(1);
    expect(modulateRiskTolerance(0.1, { valence: -1.0, arousal: 0.1, timestamp: 0 })).toBeGreaterThanOrEqual(0);
  });
});

describe('Phase K — 통합 시나리오: Affective Decision', () => {
  it('Damasio somatic marker hypothesis 정합 — 영역 경험 → bodily marker → decision bias', () => {
    // 영역 경험: action 'gambling' → 영역 결과 (loss, negative valence).
    let markers: SomaticMarker[] = [];
    for (let i = 0; i < 5; i += 1) {
      markers.push({
        context: 'gambling',
        affectiveResponse: { valence: -0.7, arousal: 0.8, timestamp: i },
        strength: 0.2 * (i + 1),
      });
    }
    // 새 decision: gambling vs safe.
    const ranked = biasDecision(
      [{ action: 'gamble', expectedUtility: 0.6 }, { action: 'save', expectedUtility: 0.5 }],
      markers,
      (a) => (a === 'gamble' ? 'gambling' : 'safe'),
    );
    expect(ranked[0].action).toBe('save'); // marker 영역 gamble 영역 영역 → save wins
  });
});
