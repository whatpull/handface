// Phase J — Meta-Cognition (자기 인식, 완벽한 인공지능 5 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 5 단계 — Phase F~I 다음.
// Phase G consciousness 영역 자연 확장: "내가 알고 있는 것에 대해 아는 것"
// (Flavell 1979). 자신의 mental state / belief / confidence 영역 자기 인식 +
// 평가 + 조정.
//
// 본 모듈 building blocks (pure functions):
//   1. Confidence Calibration — reported confidence vs actual accuracy 일치도.
//   2. Metacognitive Accuracy — 자기 prediction 영역 옳/그름 예측.
//   3. Epistemic Humility — "내가 모른다" 인식 (uncertainty quantification).
//   4. Self-Progress Assessment — 학습 진행도 자기 평가.
//   5. Self-Correction — 자기 error 영역 detect + 조정 trigger.
//
// 학술 정합:
//   - Flavell 1979 — Metacognition 영역 introspection 영역 영역 정의.
//   - Nelson & Narens 1990 — Metacognition framework (monitoring + control).
//   - Fleming & Lau 2014 — Computational metacognition (meta-d', Type 2
//     signal detection theory).
//   - Hoffmann et al. 2022 — Epistemic uncertainty in deep learning.

// ── 1. Confidence Calibration (Fleming & Lau 2014) ──

export interface CalibrationEntry {
  confidence: number;  // reported [0,1]
  correct: boolean;    // 영역 결과 (actual)
}

// Brier score — calibration 측정 영역 표준 metric.
//   BS = mean((confidence - actual_indicator)^2)
//   0 = perfect, 1 = worst.
// 학술 정합: Brier 1950 — verification of forecasts.
export function brierScore(entries: ReadonlyArray<CalibrationEntry>): number {
  if (entries.length === 0) return 0;
  let sum = 0;
  for (const e of entries) {
    const actual = e.correct ? 1 : 0;
    sum += (e.confidence - actual) ** 2;
  }
  return sum / entries.length;
}

// Expected Calibration Error (ECE) — confidence bin 영역 영역 calibration.
//   각 bin 영역: |avg_confidence_in_bin - accuracy_in_bin|.
//   학술 정합: Naeini et al. 2015.
export function expectedCalibrationError(
  entries: ReadonlyArray<CalibrationEntry>,
  numBins: number = 10,
): number {
  if (entries.length === 0) return 0;
  const bins: { sumConf: number; correctCount: number; total: number }[] = [];
  for (let i = 0; i < numBins; i += 1) bins.push({ sumConf: 0, correctCount: 0, total: 0 });
  for (const e of entries) {
    const idx = Math.min(numBins - 1, Math.floor(e.confidence * numBins));
    bins[idx].sumConf += e.confidence;
    if (e.correct) bins[idx].correctCount += 1;
    bins[idx].total += 1;
  }
  let weighted = 0;
  for (const bin of bins) {
    if (bin.total === 0) continue;
    const avgConf = bin.sumConf / bin.total;
    const accuracy = bin.correctCount / bin.total;
    weighted += (bin.total / entries.length) * Math.abs(avgConf - accuracy);
  }
  return weighted;
}

// ── 2. Metacognitive Accuracy (Nelson & Narens 1990) ──

// Type 2 d' (Fleming & Lau 2014 simplified): 자신의 correct/incorrect 영역
// confidence 영역 영역 discriminate 영역.
//   higher meta-d' → better metacognition.
// Simple proxy: high-confidence correct ratio vs low-confidence incorrect ratio.
export function metacognitiveDiscrimination(
  entries: ReadonlyArray<CalibrationEntry>,
  threshold: number = 0.5,
): number {
  if (entries.length === 0) return 0;
  let highConfCorrect = 0, highConfTotal = 0;
  let lowConfIncorrect = 0, lowConfTotal = 0;
  for (const e of entries) {
    if (e.confidence >= threshold) {
      highConfTotal += 1;
      if (e.correct) highConfCorrect += 1;
    } else {
      lowConfTotal += 1;
      if (!e.correct) lowConfIncorrect += 1;
    }
  }
  const highConfAccuracy = highConfTotal > 0 ? highConfCorrect / highConfTotal : 0;
  const lowConfAccuracy = lowConfTotal > 0 ? lowConfIncorrect / lowConfTotal : 0;
  // Perfect metacognition: high conf → all correct, low conf → all incorrect.
  return (highConfAccuracy + lowConfAccuracy) / 2; // [0..1], 1 = perfect.
}

// ── 3. Epistemic Humility (Uncertainty Quantification) ──

// "내가 모른다" 인식 — 답 영역 영역 영역 영역 confidence 영역 영역 영역 영역.
// 학술 정합: Hoffmann et al. 2022 — distinguishing aleatoric vs epistemic
//   uncertainty.
export interface UncertaintyMetrics {
  entropy: number;      // shannon entropy of probability distribution
  maxProb: number;      // 최대 확률
  isAmbiguous: boolean; // entropy > threshold → uncertain
}

// Probability distribution 영역 epistemic uncertainty 평가.
export function quantifyUncertainty(
  probs: ReadonlyArray<number>,
  ambiguityThreshold: number = 0.8,
): UncertaintyMetrics {
  if (probs.length === 0) return { entropy: 0, maxProb: 0, isAmbiguous: false };
  // Normalize.
  let sum = 0;
  for (const p of probs) sum += p;
  if (sum === 0) return { entropy: 0, maxProb: 0, isAmbiguous: true };
  const norm = probs.map(p => p / sum);
  // Shannon entropy.
  let entropy = 0;
  let maxProb = 0;
  for (const p of norm) {
    if (p > 0) entropy -= p * Math.log2(p);
    if (p > maxProb) maxProb = p;
  }
  const maxEntropy = Math.log2(probs.length);
  const normalizedEntropy = maxEntropy > 0 ? entropy / maxEntropy : 0;
  return {
    entropy: normalizedEntropy,
    maxProb,
    isAmbiguous: normalizedEntropy > ambiguityThreshold,
  };
}

// Decision deferral — 모르는 영역 영역 영역 답 보류 (intellectual humility).
//   maxProb < threshold OR entropy > threshold → 영역 영역 영역.
export function shouldDefer(
  uncertainty: UncertaintyMetrics,
  minConfidence: number = 0.5,
): boolean {
  return uncertainty.maxProb < minConfidence || uncertainty.isAmbiguous;
}

// ── 4. Self-Progress Assessment ──

// 학습 진행 history 영역 영역 자기 evaluation.
// Trend 영역 (improving / plateau / declining) + estimated convergence.
export interface ProgressTrend {
  direction: 'improving' | 'plateau' | 'declining';
  recentAccuracy: number;
  improvementRate: number; // slope of recent window
  hasConverged: boolean;
}

export function assessLearningProgress(
  accuracyHistory: ReadonlyArray<number>,
  windowSize: number = 5,
  plateauThreshold: number = 0.02,
): ProgressTrend {
  if (accuracyHistory.length === 0) {
    return { direction: 'plateau', recentAccuracy: 0, improvementRate: 0, hasConverged: false };
  }
  const recent = accuracyHistory.slice(-windowSize);
  const recentAccuracy = recent.reduce((a, b) => a + b, 0) / recent.length;
  // Linear regression slope (simplified).
  let slope = 0;
  if (recent.length >= 2) {
    const meanX = (recent.length - 1) / 2;
    const meanY = recentAccuracy;
    let num = 0, den = 0;
    for (let i = 0; i < recent.length; i += 1) {
      num += (i - meanX) * (recent[i] - meanY);
      den += (i - meanX) ** 2;
    }
    slope = den > 0 ? num / den : 0;
  }
  let direction: ProgressTrend['direction'];
  if (slope > plateauThreshold) direction = 'improving';
  else if (slope < -plateauThreshold) direction = 'declining';
  else direction = 'plateau';
  // Convergence: recent slope ~ 0 AND accuracy high.
  const hasConverged = direction === 'plateau' && recentAccuracy >= 0.95;
  return { direction, recentAccuracy, improvementRate: slope, hasConverged };
}

// ── 5. Self-Correction Trigger ──

// 자기 평가 결과 → corrective action 영역 영역.
//   declining trend → 학습 strategy 변경 권장.
//   plateau at low accuracy → 추가 cluster spawn / substrate 추가.
//   high uncertainty + repeat → epistemic humility → seek input.
export interface CorrectionRecommendation {
  shouldCorrect: boolean;
  action: 'continue' | 'change_strategy' | 'add_capacity' | 'seek_input';
  reason: string;
}

export function recommendCorrection(
  progress: ProgressTrend,
  uncertainty: UncertaintyMetrics,
  calibrationError: number,
): CorrectionRecommendation {
  // Declining → 학습 strategy 영역 변경.
  if (progress.direction === 'declining') {
    return {
      shouldCorrect: true, action: 'change_strategy',
      reason: `accuracy declining (rate ${progress.improvementRate.toFixed(3)}) — STDP gain / vigilance 영역 영역 영역`,
    };
  }
  // Plateau at low accuracy → capacity 부족.
  if (progress.direction === 'plateau' && progress.recentAccuracy < 0.7) {
    return {
      shouldCorrect: true, action: 'add_capacity',
      reason: `plateau at low accuracy ${(progress.recentAccuracy * 100).toFixed(0)}% — 새 cluster spawn / substrate 추가 영역`,
    };
  }
  // High ambiguity + miscalibration → epistemic humility, ask for guidance.
  if (uncertainty.isAmbiguous && calibrationError > 0.2) {
    return {
      shouldCorrect: true, action: 'seek_input',
      reason: `ambiguous entropy ${uncertainty.entropy.toFixed(2)} + ECE ${calibrationError.toFixed(2)} — 외부 input 영역`,
    };
  }
  return {
    shouldCorrect: false, action: 'continue',
    reason: 'metacognitive state OK — 영역 진행',
  };
}
