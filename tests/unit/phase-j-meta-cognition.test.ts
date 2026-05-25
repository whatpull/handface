// Phase J — Meta-Cognition 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  brierScore, expectedCalibrationError, metacognitiveDiscrimination,
  quantifyUncertainty, shouldDefer, assessLearningProgress,
  recommendCorrection,
  type CalibrationEntry, type UncertaintyMetrics,
} from '@/lib/snn-runtime/meta-cognition';

describe('Phase J — Confidence Calibration (Brier 1950)', () => {
  it('perfect calibration (conf=1 → correct, conf=0 → wrong) → Brier 0', () => {
    const entries: CalibrationEntry[] = [
      { confidence: 1.0, correct: true },
      { confidence: 0.0, correct: false },
    ];
    expect(brierScore(entries)).toBe(0);
  });

  it('worst case (conf=1 but all wrong) → Brier 1', () => {
    const entries: CalibrationEntry[] = [
      { confidence: 1.0, correct: false },
      { confidence: 1.0, correct: false },
    ];
    expect(brierScore(entries)).toBe(1);
  });

  it('moderate case (conf 0.5 mixed) → Brier 0.25', () => {
    const entries: CalibrationEntry[] = [
      { confidence: 0.5, correct: true },
      { confidence: 0.5, correct: false },
    ];
    expect(brierScore(entries)).toBe(0.25); // (0.5)^2 + (0.5)^2 = 0.5 / 2 = 0.25
  });

  it('empty → 0', () => {
    expect(brierScore([])).toBe(0);
  });
});

describe('Phase J — Expected Calibration Error (Naeini 2015)', () => {
  it('perfect calibration → ECE 0', () => {
    const entries: CalibrationEntry[] = [];
    for (let i = 0; i < 10; i += 1) {
      entries.push({ confidence: 1.0, correct: true });
      entries.push({ confidence: 0.0, correct: false });
    }
    expect(expectedCalibrationError(entries, 10)).toBeCloseTo(0, 2);
  });

  it('overconfident (conf 1.0 but 50% correct) → ECE 0.5', () => {
    const entries: CalibrationEntry[] = [];
    for (let i = 0; i < 10; i += 1) {
      entries.push({ confidence: 1.0, correct: i < 5 });
    }
    expect(expectedCalibrationError(entries, 10)).toBeCloseTo(0.5, 2);
  });

  it('empty → 0', () => {
    expect(expectedCalibrationError([])).toBe(0);
  });
});

describe('Phase J — Metacognitive Discrimination (Fleming & Lau 2014)', () => {
  it('perfect metacognition — high conf → all correct, low conf → all wrong', () => {
    const entries: CalibrationEntry[] = [
      { confidence: 0.9, correct: true },
      { confidence: 0.8, correct: true },
      { confidence: 0.2, correct: false },
      { confidence: 0.1, correct: false },
    ];
    expect(metacognitiveDiscrimination(entries, 0.5)).toBe(1.0);
  });

  it('random — high conf 영역 50% / low conf 영역 50% → 0.5', () => {
    const entries: CalibrationEntry[] = [
      { confidence: 0.9, correct: true },
      { confidence: 0.9, correct: false },
      { confidence: 0.1, correct: false },
      { confidence: 0.1, correct: true },
    ];
    expect(metacognitiveDiscrimination(entries, 0.5)).toBe(0.5);
  });

  it('empty → 0', () => {
    expect(metacognitiveDiscrimination([])).toBe(0);
  });
});

describe('Phase J — Epistemic Humility (Uncertainty Quantification)', () => {
  it('one-hot probability → low entropy + confident', () => {
    const u = quantifyUncertainty([1, 0, 0, 0]);
    expect(u.entropy).toBeCloseTo(0, 5);
    expect(u.maxProb).toBe(1);
    expect(u.isAmbiguous).toBe(false);
  });

  it('uniform probability → max entropy + ambiguous', () => {
    const u = quantifyUncertainty([0.25, 0.25, 0.25, 0.25]);
    expect(u.entropy).toBeCloseTo(1, 5); // normalized max = 1
    expect(u.maxProb).toBeCloseTo(0.25, 5);
    expect(u.isAmbiguous).toBe(true);
  });

  it('empty → all zero', () => {
    const u = quantifyUncertainty([]);
    expect(u.entropy).toBe(0);
    expect(u.maxProb).toBe(0);
  });

  it('shouldDefer — low confidence → defer', () => {
    const uncertain: UncertaintyMetrics = { entropy: 0.95, maxProb: 0.3, isAmbiguous: true };
    expect(shouldDefer(uncertain, 0.5)).toBe(true);
  });

  it('shouldDefer — high confidence → no defer', () => {
    const confident: UncertaintyMetrics = { entropy: 0.1, maxProb: 0.95, isAmbiguous: false };
    expect(shouldDefer(confident, 0.5)).toBe(false);
  });
});

describe('Phase J — Self-Progress Assessment', () => {
  it('improving trend — accuracy 영역', () => {
    const history = [0.3, 0.4, 0.5, 0.6, 0.7];
    const progress = assessLearningProgress(history);
    expect(progress.direction).toBe('improving');
    expect(progress.improvementRate).toBeGreaterThan(0);
  });

  it('plateau — accuracy 영역', () => {
    const history = [0.7, 0.71, 0.7, 0.71, 0.7];
    const progress = assessLearningProgress(history);
    expect(progress.direction).toBe('plateau');
  });

  it('declining', () => {
    const history = [0.8, 0.7, 0.6, 0.5, 0.4];
    const progress = assessLearningProgress(history);
    expect(progress.direction).toBe('declining');
    expect(progress.improvementRate).toBeLessThan(0);
  });

  it('convergence detection — high plateau', () => {
    const history = [0.97, 0.98, 0.97, 0.96, 0.97];
    const progress = assessLearningProgress(history);
    expect(progress.hasConverged).toBe(true);
  });

  it('empty history', () => {
    const progress = assessLearningProgress([]);
    expect(progress.recentAccuracy).toBe(0);
    expect(progress.direction).toBe('plateau');
  });
});

describe('Phase J — Self-Correction Recommendation', () => {
  it('declining → change_strategy', () => {
    const rec = recommendCorrection(
      { direction: 'declining', recentAccuracy: 0.5, improvementRate: -0.05, hasConverged: false },
      { entropy: 0.3, maxProb: 0.6, isAmbiguous: false },
      0.05,
    );
    expect(rec.action).toBe('change_strategy');
    expect(rec.shouldCorrect).toBe(true);
  });

  it('plateau at low accuracy → add_capacity', () => {
    const rec = recommendCorrection(
      { direction: 'plateau', recentAccuracy: 0.5, improvementRate: 0, hasConverged: false },
      { entropy: 0.5, maxProb: 0.5, isAmbiguous: false },
      0.1,
    );
    expect(rec.action).toBe('add_capacity');
  });

  it('high uncertainty + miscalibration → seek_input', () => {
    const rec = recommendCorrection(
      { direction: 'improving', recentAccuracy: 0.7, improvementRate: 0.05, hasConverged: false },
      { entropy: 0.9, maxProb: 0.3, isAmbiguous: true },
      0.3,
    );
    expect(rec.action).toBe('seek_input');
  });

  it('healthy state → continue', () => {
    const rec = recommendCorrection(
      { direction: 'improving', recentAccuracy: 0.9, improvementRate: 0.02, hasConverged: false },
      { entropy: 0.2, maxProb: 0.85, isAmbiguous: false },
      0.05,
    );
    expect(rec.action).toBe('continue');
    expect(rec.shouldCorrect).toBe(false);
  });
});

describe('Phase J — 통합 시나리오: 자기 인식 + 자기 개선 loop', () => {
  it('low accuracy + plateau → add_capacity 권장 → 새 substrate spawn trigger', () => {
    const history = [0.4, 0.45, 0.5, 0.5, 0.5]; // plateau at 50%
    const progress = assessLearningProgress(history);
    const uncertainty = quantifyUncertainty([0.5, 0.5]);
    const calib = brierScore([
      { confidence: 0.6, correct: true },
      { confidence: 0.6, correct: false },
    ]);

    const rec = recommendCorrection(progress, uncertainty, calib);
    expect(rec.shouldCorrect).toBe(true);
    expect(['add_capacity', 'change_strategy', 'seek_input']).toContain(rec.action);
  });

  it('overconfident + miscalibrated → meta-cognition 영역 catch', () => {
    const entries: CalibrationEntry[] = [
      { confidence: 0.95, correct: false },
      { confidence: 0.95, correct: false },
      { confidence: 0.95, correct: true },
      { confidence: 0.95, correct: false },
    ];
    const calibError = expectedCalibrationError(entries);
    expect(calibError).toBeGreaterThan(0.5); // 영역 overconfidence catch

    const meta = metacognitiveDiscrimination(entries);
    expect(meta).toBeLessThan(0.5); // 영역 metacognition (영역 conf 영역 영역 영역 wrong)
  });
});
