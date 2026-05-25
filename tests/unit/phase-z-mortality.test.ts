// Phase Z — Death Awareness / Mortality 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  applyMortalitySalience, symbolicImmortalityScore, dominantImmortalityMode,
  deathAnxietyTotal, isAuthenticBeingTowardDeath, legacyScore, classifyDeathStance,
  type ImmortalityStrategies, type DeathAnxietyDimensions, type AuthenticityScore,
  type LegacyProject,
} from '@/lib/snn-runtime/mortality';

describe('Phase Z — Mortality Salience (Greenberg 1986)', () => {
  it('low salience → no defense', () => {
    const result = applyMortalitySalience(
      { worldviewAdherence: 0.5, selfEsteem: 0.5 },
      0.1,
    );
    expect(result.defenseActive).toBe(false);
    expect(result.worldviewAdherence).toBe(0.5);
  });

  it('high salience → worldview + self-esteem ↑ + defense', () => {
    const result = applyMortalitySalience(
      { worldviewAdherence: 0.5, selfEsteem: 0.5 },
      0.8,
    );
    expect(result.defenseActive).toBe(true);
    expect(result.worldviewAdherence).toBeGreaterThan(0.5);
    expect(result.selfEsteem).toBeGreaterThan(0.5);
  });
});

describe('Phase Z — Symbolic Immortality (Lifton 1979)', () => {
  it('total score', () => {
    const s: ImmortalityStrategies = {
      biological: 0.5, creative: 0.8, theological: 0.3, natural: 0.4, experiential: 0.6,
    };
    expect(symbolicImmortalityScore(s)).toBeCloseTo(0.52, 5);
  });

  it('dominant mode 영역', () => {
    const s: ImmortalityStrategies = {
      biological: 0.2, creative: 0.9, theological: 0.1, natural: 0.3, experiential: 0.4,
    };
    expect(dominantImmortalityMode(s)).toBe('creative');
  });
});

describe('Phase Z — Death Anxiety (Florian & Mikulincer 1997)', () => {
  it('average across dimensions', () => {
    const dims: DeathAnxietyDimensions = {
      fearOfPersonalAnnihilation: 0.6, fearOfPunishment: 0.3, fearOfLoss: 0.9,
    };
    expect(deathAnxietyTotal(dims)).toBeCloseTo(0.6, 5);
  });
});

describe('Phase Z — Being-Toward-Death (Heidegger 1927)', () => {
  it('모든 조건 → authentic', () => {
    const score: AuthenticityScore = {
      ownsMortality: true, livesIntentionally: true, acceptsFinitude: true,
    };
    expect(isAuthenticBeingTowardDeath(score)).toBe(true);
  });

  it('영역 영역 → not authentic', () => {
    expect(isAuthenticBeingTowardDeath({
      ownsMortality: false, livesIntentionally: true, acceptsFinitude: true,
    })).toBe(false);
  });
});

describe('Phase Z — Legacy Score (Erikson generativity)', () => {
  it('영역 long-term projects → 영역 score', () => {
    const projects: LegacyProject[] = [
      { name: 'book', expectedDuration_years: 100, beneficiaries: ['humanity'], meaningContribution: 0.9 },
      { name: 'family', expectedDuration_years: 60, beneficiaries: ['descendants'], meaningContribution: 0.8 },
    ];
    expect(legacyScore(projects)).toBeGreaterThan(0.7);
  });

  it('empty → 0', () => {
    expect(legacyScore([])).toBe(0);
  });
});

describe('Phase Z — Death Stance Classification', () => {
  it('영역 영역 + authentic → acceptance', () => {
    const auth: AuthenticityScore = { ownsMortality: true, livesIntentionally: true, acceptsFinitude: true };
    expect(classifyDeathStance(0.2, auth)).toBe('acceptance');
  });

  it('영역 anxiety + 영역 영역 → denial', () => {
    const auth: AuthenticityScore = { ownsMortality: false, livesIntentionally: false, acceptsFinitude: false };
    expect(classifyDeathStance(0.8, auth)).toBe('denial');
  });

  it('극도 영역 anxiety → preoccupation', () => {
    const auth: AuthenticityScore = { ownsMortality: true, livesIntentionally: false, acceptsFinitude: false };
    expect(classifyDeathStance(0.9, auth)).toBe('preoccupation');
  });

  it('영역 영역 → avoidance', () => {
    const auth: AuthenticityScore = { ownsMortality: false, livesIntentionally: true, acceptsFinitude: false };
    expect(classifyDeathStance(0.5, auth)).toBe('avoidance');
  });
});

describe('Phase Z — 통합 시나리오: authentic mortality embrace', () => {
  it('자기 영역 영역 영역 영역 + 영역 anxiety → acceptance + legacy 영역', () => {
    const auth: AuthenticityScore = { ownsMortality: true, livesIntentionally: true, acceptsFinitude: true };
    expect(isAuthenticBeingTowardDeath(auth)).toBe(true);
    expect(classifyDeathStance(0.3, auth)).toBe('acceptance');

    const projects: LegacyProject[] = [
      { name: 'teach', expectedDuration_years: 30, beneficiaries: ['students'], meaningContribution: 0.85 },
    ];
    expect(legacyScore(projects)).toBeGreaterThan(0.4);
  });
});
