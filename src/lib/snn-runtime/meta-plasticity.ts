// Phase C — Meta-Plasticity (substrate hyperparameter self-tuning).
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 2 단계.
// Phase D (weighted ensemble vote) 다음 단계: substrate 영역 vigilance /
// cascade weight 등 영역 measured accuracy 영역 기반 자기 조정.
//
// 학술 정합:
//   - BCM rule (Bienenstock, Cooper, Munro 1982) — sliding threshold
//     meta-plasticity: 활성도 누적 → threshold 자기 조정으로 stability.
//   - Bayesian optimization meta-learning (Snoek et al. 2012) — 측정 결과
//     영역 hyperparameter posterior 영역 업데이트.
//   - Population-Based Training (Jaderberg et al. 2017) — 학습 중
//     hyperparameter 동적 조정.
//
// 본 모듈 영역 role:
//   - "measured metrics → hyperparameter adjustment" pure functions 영역 제공.
//   - 호출자 (research module) 영역 다음 training round 영역 영역 영역.
//   - 단위 테스트 영역 algorithmic correctness 영역 검증 (tests/unit/
//     phase-c-meta-plasticity.test.ts).

export interface SubstrateMetrics {
  recall: number;        // clean inference 정확도 (0..1)
  noise: number;         // noise probe 정확도 (0..1)
  partial: number;       // partial cue probe 정확도 (0..1)
  wtaMargin: number;     // average WTA margin (0..1, confidence)
  unlearnedCount: number; // patternToCluster 영역 -1 count (학습 실패)
  collisionCount: number; // patternToCluster 영역 같은 cluster 영역 매핑된 패턴 쌍 수
}

export interface SubstrateHyperparams {
  vigilance: number;        // ART vigilance (0..1)
  v1L4Weight: number;       // INPUT → V1_L4 base weight
  v2L5OutWeight: number;    // V2_L5 → OUT base weight
}

export interface TuningResult {
  next: SubstrateHyperparams;
  reasons: string[];         // 어떤 rule 영역 발동했는지 (debug + 학술 트레이스)
  changed: boolean;
}

// Tuning constants — 학술 정합 + production safety.
export const META_PLASTICITY_BOUNDS = {
  // Vigilance ART 표준 범위 [0.05, 0.95]. 0.15 영역 production default,
  // 0.30 영역 6×6 시도 결과 (악화 확인됨 — adaptive 영역 cap 검증).
  vigilanceMin: 0.05,
  vigilanceMax: 0.95,
  // V1_L4 weight bounds — 4×4/5×5 baseline 11.0, 6×6 hand-tuned 14.0.
  // 17.0 cap (P218 영역 14.0 시도 revert sweep 정합).
  v1L4WeightMin: 8.0,
  v1L4WeightMax: 17.0,
  // V2_L5→OUT weight bounds — 16.0 sweet spot (20.0 시도 -50%p noise 폭락).
  v2L5OutWeightMin: 12.0,
  v2L5OutWeightMax: 18.0,
} as const;

// Default tuning step sizes (BCM-style adaptive — too large 영역 oscillation).
const VIGILANCE_STEP = 0.05;
const V1L4_WEIGHT_STEP = 1.0;
const V2L5_OUT_WEIGHT_STEP = 0.5;

// Rule 1: cluster collision detected → vigilance ↑ (strict mismatch).
// 학술 정합: Carpenter & Grossberg 1987 — vigilance ρ ↑ 영역 distinct cluster
//   formation. measured collision count 영역 자동 응답.
export function tuneVigilance(
  current: SubstrateHyperparams,
  metrics: SubstrateMetrics,
): { vigilance: number; reason: string | null } {
  if (metrics.collisionCount > 0 && metrics.recall < 0.9) {
    const next = Math.min(
      current.vigilance + VIGILANCE_STEP,
      META_PLASTICITY_BOUNDS.vigilanceMax,
    );
    if (next > current.vigilance) {
      return {
        vigilance: next,
        reason: `collision=${metrics.collisionCount} + recall=${metrics.recall.toFixed(2)} → vigilance ${current.vigilance.toFixed(2)} → ${next.toFixed(2)} (cluster distinct spawn 강제)`,
      };
    }
  }
  // 과한 vigilance 영역 cluster 영역 oversplit catch — recall 영역 영역 영역
  // 영역 over-fragmentation 영역. recall 영역 < 0.5 + collision = 0 → vigilance ↓.
  if (metrics.collisionCount === 0 && metrics.recall < 0.5 && metrics.unlearnedCount === 0) {
    const next = Math.max(
      current.vigilance - VIGILANCE_STEP,
      META_PLASTICITY_BOUNDS.vigilanceMin,
    );
    if (next < current.vigilance) {
      return {
        vigilance: next,
        reason: `over-fragmentation recall=${metrics.recall.toFixed(2)} → vigilance ${current.vigilance.toFixed(2)} → ${next.toFixed(2)} (relaxed)`,
      };
    }
  }
  return { vigilance: current.vigilance, reason: null };
}

// Rule 2: unlearned patterns detected (cluster spawn 실패 — Bottom row -1 시나리오)
//   → V1_L4 weight ↑ (cascade entry 강화).
// 학술 정합: Diehl & Cook 2015 — input layer weight 영역 cluster activation
//   영역 reliable trigger 영역 영역 핵심.
export function tuneCascadeWeight(
  current: SubstrateHyperparams,
  metrics: SubstrateMetrics,
): { v1L4Weight: number; reason: string | null } {
  if (metrics.unlearnedCount > 0) {
    const next = Math.min(
      current.v1L4Weight + V1L4_WEIGHT_STEP,
      META_PLASTICITY_BOUNDS.v1L4WeightMax,
    );
    if (next > current.v1L4Weight) {
      return {
        v1L4Weight: next,
        reason: `unlearned=${metrics.unlearnedCount} → V1_L4 weight ${current.v1L4Weight.toFixed(1)} → ${next.toFixed(1)} (cascade entry 강화)`,
      };
    }
  }
  return { v1L4Weight: current.v1L4Weight, reason: null };
}

// Rule 3: over-confident + low noise robustness → V2_L5→OUT weight ↓.
// 가설: OUT firing 영역 영역 너무 강 → cross-fire 영역 noise 패턴 영역 잘못된
//   cluster 영역 활성. 027288f (V2_L5→OUT 20.0) 영역 noise -50%p 폭락 시나리오
//   영역 자동 회피.
// 학술 정합: peer review (Markram 2015 inhibitory homeostasis) — over-driving
//   영역 selectivity 파괴 영역 lateral inhibition / weight cap 영역 보정.
export function tuneOutputWeight(
  current: SubstrateHyperparams,
  metrics: SubstrateMetrics,
): { v2L5OutWeight: number; reason: string | null } {
  // High confidence (margin > 0.9) but low noise robustness (< 0.6) → over-driving.
  if (metrics.wtaMargin > 0.9 && metrics.noise < 0.6) {
    const next = Math.max(
      current.v2L5OutWeight - V2L5_OUT_WEIGHT_STEP,
      META_PLASTICITY_BOUNDS.v2L5OutWeightMin,
    );
    if (next < current.v2L5OutWeight) {
      return {
        v2L5OutWeight: next,
        reason: `over-confident margin=${metrics.wtaMargin.toFixed(2)} + noise=${metrics.noise.toFixed(2)} → V2_L5→OUT ${current.v2L5OutWeight.toFixed(1)} → ${next.toFixed(1)} (cross-fire 감소)`,
      };
    }
  }
  // Low confidence (margin < 0.5) + low noise → V2_L5→OUT 약함, cascade 보강 시도.
  if (metrics.wtaMargin < 0.5 && metrics.noise < 0.5 && metrics.recall >= 0.9) {
    const next = Math.min(
      current.v2L5OutWeight + V2L5_OUT_WEIGHT_STEP,
      META_PLASTICITY_BOUNDS.v2L5OutWeightMax,
    );
    if (next > current.v2L5OutWeight) {
      return {
        v2L5OutWeight: next,
        reason: `under-driven margin=${metrics.wtaMargin.toFixed(2)} + noise=${metrics.noise.toFixed(2)} → V2_L5→OUT ${current.v2L5OutWeight.toFixed(1)} → ${next.toFixed(1)} (cascade exit 강화)`,
      };
    }
  }
  return { v2L5OutWeight: current.v2L5OutWeight, reason: null };
}

// Top-level: 3 tuning rules 영역 combined 영역 적용 + bounded.
export function tuneHyperparameters(
  current: SubstrateHyperparams,
  metrics: SubstrateMetrics,
): TuningResult {
  const v = tuneVigilance(current, metrics);
  const c = tuneCascadeWeight(current, metrics);
  const o = tuneOutputWeight(current, metrics);

  const reasons: string[] = [];
  if (v.reason) reasons.push(v.reason);
  if (c.reason) reasons.push(c.reason);
  if (o.reason) reasons.push(o.reason);

  const next: SubstrateHyperparams = {
    vigilance: v.vigilance,
    v1L4Weight: c.v1L4Weight,
    v2L5OutWeight: o.v2L5OutWeight,
  };
  const changed = (
    next.vigilance !== current.vigilance ||
    next.v1L4Weight !== current.v1L4Weight ||
    next.v2L5OutWeight !== current.v2L5OutWeight
  );

  return { next, reasons, changed };
}

// Helper: patternToCluster 영역 collision + unlearned count 산출.
export function analyzeClusterMap(clusterMap: ReadonlyArray<number>): { collisionCount: number; unlearnedCount: number } {
  let unlearnedCount = 0;
  const clusterToPatterns = new Map<number, number[]>();
  for (let i = 0; i < clusterMap.length; i += 1) {
    const c = clusterMap[i];
    if (c < 0) {
      unlearnedCount += 1;
      continue;
    }
    if (!clusterToPatterns.has(c)) clusterToPatterns.set(c, []);
    clusterToPatterns.get(c)!.push(i);
  }
  let collisionCount = 0;
  for (const patterns of clusterToPatterns.values()) {
    if (patterns.length > 1) collisionCount += patterns.length - 1; // 첫 패턴 제외
  }
  return { collisionCount, unlearnedCount };
}
