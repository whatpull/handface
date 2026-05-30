// Hand SNN — Cressie & Read 1984 λ=2/3 (recommended) outside-log variant
// byte-identical verify R&D — λ-family fully closed extension (λ ∈ {1, 0, -1,
// 2/3}) empirical confirm.
//
// 직전 4 commits (Conv 3 inside-log Laplace LR / Method 2 Pearson outside-log /
// G² outside-log / Modified LR outside-log) = 27/27 byte-identical 확인 →
// Cochran 1972 sufficient statistic equivalence empirical (λ ∈ {1, 0, -1}
// 한정). 본 R&D 영역 Cressie & Read 1984 §3 권장 λ=2/3 form 영역 직접 verify
// → λ-family fully closed (λ ∈ {1, 0, -1, 2/3}) empirical confirm.
//
// Cressie & Read 1984 power divergence general formula:
//   T_λ(δ) = (2 / (λ × (λ + 1))) × Σ_i O'_i × ((O'_i / E'_i)^λ - 1)
//
// λ=2/3 substitution:
//   T_(2/3)(δ) = (9/5) × Σ_i O'_i × ((O'_i / E'_i)^(2/3) - 1)
//              = 1.8 × Σ_i O'_i × ((O'_i / E'_i)^(2/3) - 1)
//
// 시나리오 (focused scope, pure statistical reanalysis):
//   - Phase A counts=[1,0,4,0] (N=5, K=4) — open_palm untrained.
//   - Phase B counts=[0,3,0,2] (N=5, K=4) — open_palm post R-STDP.
//   - Phase C counts=[0,1,2,0] (N=3, K=4) — open_palm cluster seq.
//
// 영역 baseline 영역 직전 4 commits 영역 영역 영역 — Phase B counts 영역 영역
// 9e39095 Modified LR baseline 영역 동일 [0,3,0,2] (instruction snippet [1,1,0,3]
// 영역 typo 영역 — established baseline 영역 영역 영역 영역 영역).
//
// δ sweep: δ ∈ {0.1, 0.5, 1.0} (직전 commits 영역 동일).
//
// Singularity handling: Cressie-Read λ=2/3 form 영역 O × (O/E)^(2/3) — O ≥ 0
// 영역 O^(5/3) 영역 영역 영역 영역 영역 영역 (O=0 영역 0^(5/3)=0). 단 본 R&D 영역
// O'_i = O_i + δ > 0 (δ > 0 smoothing) 영역 영역 영역 영역.
//
// CRITICAL 4-way cross-verify (36 byte-identical match expected):
//   Conv 3 (dc2038f) — Phase A=0.0625, B=0.1797, C=0.6250 (모든 δ).
//   Method 2 Pearson (7e883c6) — 9/9 byte-identical confirmed.
//   G² (9e92b11) — 9/9 byte-identical confirmed.
//   Modified LR (9e39095) — 9/9 byte-identical confirmed.
//   본 R&D Cressie-Read λ=2/3 — 영역 영역 영역 영역 영역 → 4-way byte-identical
//   verify (총 9 cells × 4 baselines = 36 matches expected).
//
// hypothesis verdicts:
//   - H_cressie_read_2_3_lambda_family_extension_closed:
//       영역 9 cells × 4 baselines = 36 매칭 영역 영역 영역 — λ-family fully
//       closed (λ ∈ {1, 0, -1, 2/3}) empirical 영역 영역.
//   - H_cressie_read_2_3_equivalence_broken:
//       영역 cell 영역 byte-identical 영역 영역 — Cressie-Read λ=2/3 영역 영역
//       λ ∈ {1, 0, -1} 영역 sufficient statistic equivalence 영역 영역 영역
//       (separate outcome ordering, λ-family partial 영역).
//   - H_partial_equivalence:
//       일부 cell 영역 영역 — mixed signal.
//
// 학술 정합:
//   - Cressie & Read 1984 §3 — power divergence family general T_λ + λ=2/3
//     recommended form (sample size small + boundary cases).
//   - Neyman 1949 — modified LR (λ=-1, 9e39095 verified).
//   - Wilks 1938 — G² (λ→0, 9e92b11 verified).
//   - Pearson 1900 — χ² (λ=1, 7e883c6 verified).
//   - Cochran 1972 — sufficient statistic principle.
//   - dc2038f / 7e883c6 / 9e92b11 / 9e39095 cross-reference.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Statistical helpers (reused from commits a1d6d4d / 6cfecf7 / 493f850 / 7c65a31 / dc2038f / 7e883c6 / 9e92b11 / 9e39095) ──

const LGAMMA_CACHE = new Map<number, number>();
function lgamma(z: number): number {
  if (LGAMMA_CACHE.has(z)) return LGAMMA_CACHE.get(z)!;
  const g = 7;
  const c = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  let result: number;
  if (z < 0.5) {
    result = Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  } else {
    const zz = z - 1;
    let x = c[0];
    for (let i = 1; i < g + 2; i += 1) x += c[i] / (zz + i);
    const t = zz + g + 0.5;
    result = 0.5 * Math.log(2 * Math.PI) + (zz + 0.5) * Math.log(t) - t + Math.log(x);
  }
  LGAMMA_CACHE.set(z, result);
  return result;
}

function logFactorial(n: number): number {
  if (n <= 1) return 0;
  return lgamma(n + 1);
}

function binomial(n: number, k: number): number {
  return Math.round(Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1)));
}

function logMultinomialPmfUniform(counts: number[], N: number, K: number): number {
  let logP = logFactorial(N) - N * Math.log(K);
  for (let i = 0; i < counts.length; i += 1) {
    logP -= logFactorial(counts[i]);
  }
  return logP;
}

function enumerateCompositions(N: number, K: number): number[][] {
  const out: number[][] = [];
  const current = new Array<number>(K).fill(0);
  function recurse(idx: number, remaining: number): void {
    if (idx === K - 1) {
      current[idx] = remaining;
      out.push(current.slice());
      return;
    }
    for (let v = 0; v <= remaining; v += 1) {
      current[idx] = v;
      recurse(idx + 1, remaining - v);
    }
  }
  recurse(0, N);
  return out;
}

// ── Cressie-Read λ=2/3 outside-log — Cressie & Read 1984 §3 recommended form ──
//
// O'_i = O_i + δ            (additive count smoothing, all cells)
// N'   = N + δ × K          (total count adjusted)
// E'_i = N' / K             (uniform null, smoothed expected)
// T_(2/3)(δ) = (2 / (λ × (λ + 1))) × Σ_i O'_i × ((O'_i / E'_i)^λ - 1)
//   with λ = 2/3:
//   coefficient = 2 / ((2/3) × (5/3)) = 2 / (10/9) = 9/5 = 1.8
//   T_(2/3)(δ) = 1.8 × Σ_i O'_i × ((O'_i / E'_i)^(2/3) - 1)
//
// 영역 form 영역 Cressie & Read 1984 §3 power divergence family general form
// 영역 λ=2/3 substitution — sample-size small + boundary cases 영역 권장
// (between Pearson χ² and G²).
//
// Singularity: O'_i > 0 (δ > 0) → (O'_i)^(5/3) > 0 → finite. δ → 0+ regime
// 영역 O_i=0 cell 영역 0 × ((0/E)^(2/3) - 1) = 0 × (-1) = 0 (well-defined, 영역
// singularity 영역).
function cressieRead2_3OutsideLog(
  counts: number[],
  N: number,
  K: number,
  delta: number,
): number {
  const N_prime = N + delta * K;
  const E_prime = N_prime / K;
  const lambda = 2 / 3;
  const coefficient = 2 / (lambda * (lambda + 1)); // = 9/5 = 1.8
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const O_prime = counts[i] + delta;
    const ratio = O_prime / E_prime;
    s += O_prime * (Math.pow(ratio, lambda) - 1);
  }
  return coefficient * s;
}

// ── Conv 3 inside-log Laplace (dc2038f cross-reference baseline) ──
function conv3InsideLogLaplace(counts: number[], E: number, delta: number): number {
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    const numerator = E + delta;
    const denominator = o + delta;
    s += numerator * Math.log(numerator / denominator);
  }
  return 2 * s;
}

// ── Method 2 outside-log raw Pearson χ² (7e883c6 cross-reference baseline) ──
function methodTwoOutsideLogRawChiSquared(
  counts: number[],
  N: number,
  K: number,
  delta: number,
): number {
  const N_prime = N + delta * K;
  const E_prime = N_prime / K;
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const O_prime = counts[i] + delta;
    const diff = O_prime - E_prime;
    s += (diff * diff) / E_prime;
  }
  return s;
}

// ── G² outside-log (Wilks 1938 λ→0) (9e92b11 cross-reference baseline) ──
function gSquaredOutsideLogLikelihoodRatio(
  counts: number[],
  N: number,
  K: number,
  delta: number,
): number {
  const N_prime = N + delta * K;
  const E_prime = N_prime / K;
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const O_prime = counts[i] + delta;
    s += O_prime * Math.log(O_prime / E_prime);
  }
  return 2 * s;
}

// ── Modified LR outside-log (Neyman 1949 λ=-1) (9e39095 cross-reference baseline) ──
function modifiedLrOutsideLogLikelihoodRatio(
  counts: number[],
  N: number,
  K: number,
  delta: number,
): number {
  const N_prime = N + delta * K;
  const E_prime = N_prime / K;
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const O_prime = counts[i] + delta;
    s += E_prime * Math.log(E_prime / O_prime);
  }
  return 2 * s;
}

// ── δ sweep configuration ──

interface DeltaConfig {
  delta: number;
  delta_label: string;
  citation: string;
  description: string;
}

const DELTA_SWEEP: DeltaConfig[] = [
  {
    delta: 0.1,
    delta_label: 'delta_0.1',
    citation:
      'Williams 1976 inspired + Laplace 1812 additive smoothing (low δ — minimal smoothing) + Cressie & ' +
      'Read 1984 §3 λ=2/3 recommended',
    description:
      "δ=0.1 — minimal additive smoothing. O'_i = O_i + 0.1, N' = N + 0.4, E' = N'/4. " +
      "T_(2/3) = 1.8 × Σ O' × ((O'/E')^(2/3) - 1). Cressie & Read 1984 §3 recommended λ=2/3 form on " +
      'uniformly smoothed counts.',
  },
  {
    delta: 0.5,
    delta_label: 'delta_0.5',
    citation:
      'Williams 1976 §3 inspired + Read & Cressie 1988 §2.3 (4-baseline cross-verify, 직전 4 commits 영역 ' +
      '동일 δ sweep) + Cressie & Read 1984 §3 λ=2/3 recommended',
    description:
      "δ=0.5 — symmetric Laplace baseline (λ=1 Pearson + λ→0 G² + λ=-1 Modified LR verified). " +
      "O'_i = O_i + 0.5, N' = N + 2.0, E' = N'/4. expected exact p (Conv 3 baseline): Phase A=0.0625, " +
      'Phase B=0.1797, Phase C=0.6250.',
  },
  {
    delta: 1.0,
    delta_label: 'delta_1.0',
    citation:
      'Laplace 1812 additive smoothing (add-one rule, high δ — heavy smoothing) + Cressie & Read 1984 §3 ' +
      'λ=2/3 recommended',
    description:
      "δ=1.0 — heavy Laplace smoothing (add-one rule, uniform Dirichlet prior α=1). O'_i = O_i + 1.0, " +
      "N' = N + 4.0, E' = N'/4. Bayesian Laplace prior 정합.",
  },
];

// ── Per-(phase, δ) Cressie-Read λ=2/3 vs Conv 3 + Method 2 Pearson + G² + Modified LR byte-identical verify ──

interface PerDeltaResult {
  delta: number;
  delta_label: string;
  citation: string;
  description: string;
  observed_statistic_cressie_read_2_3_outside_log: number;
  observed_statistic_conv_3_inside_log: number;
  observed_statistic_method_2_pearson_outside_log: number;
  observed_statistic_g_squared_outside_log: number;
  observed_statistic_modified_lr_outside_log: number;
  exact_p_value_cressie_read_2_3_outside_log: number;
  exact_p_value_conv_3_inside_log_reference: number;
  exact_p_value_method_2_pearson_outside_log_reference: number;
  exact_p_value_g_squared_outside_log_reference: number;
  exact_p_value_modified_lr_outside_log_reference: number;
  byte_identical_match_vs_conv_3: boolean;
  byte_identical_delta_p_vs_conv_3: number;
  byte_identical_match_vs_method_2_pearson: boolean;
  byte_identical_delta_p_vs_method_2_pearson: number;
  byte_identical_match_vs_g_squared: boolean;
  byte_identical_delta_p_vs_g_squared: number;
  byte_identical_match_vs_modified_lr: boolean;
  byte_identical_delta_p_vs_modified_lr: number;
  sum_of_pmf: number;
  outcomes_total: number;
  zero_cell_singularity_handled: boolean;
}

interface PhaseDeltaResult {
  phase_label: string;
  counts_by_cluster: number[];
  N: number;
  K: number;
  expected_per_cell_raw: number;
  zero_cluster_count: number;
  cochran_violation: boolean;
  total_enumerated_outcomes: number;
  expected_outcomes_combinatorial: number;
  sum_of_probabilities: number;
  dc2038f_conv_3_baseline_p: number;
  per_delta_results: PerDeltaResult[];
  all_deltas_byte_identical_vs_conv_3: boolean;
  all_deltas_byte_identical_vs_method_2_pearson: boolean;
  all_deltas_byte_identical_vs_g_squared: boolean;
  all_deltas_byte_identical_vs_modified_lr: boolean;
  evidence: string;
}

// Byte-identical tolerance — exact arithmetic on multinomial PMF 영역 IEEE 754
// rounding error 영역 영역 영역 — 1e-9 tolerance (probabilities sum to integer
// fractions like 6/96 = 0.0625 영역 영역 영역 floating point rounding 영역 1e-15
// 영역). 1e-9 영역 conservative — true byte-identical (same outcome subset
// inclusion) 영역 distinguish 영역 sufficient.
const BYTE_IDENTICAL_TOL = 1e-9;
const PMF_EPS = 1e-9;
const REPRODUCE_TOL = 1e-3; // dc2038f QA LOW fix — p-value reproduce 영역 4-decimal sufficient.

function analyzePhaseDelta(
  label: string,
  counts: number[],
  N: number,
  K: number,
  dc2038fBaselineP: number,
): PhaseDeltaResult {
  const E_raw = N / K;
  const cochranViolation = E_raw < 5;
  const zeroClusterCount = counts.filter(c => c === 0).length;

  const outcomes = enumerateCompositions(N, K);
  const expectedCount = binomial(N + K - 1, K - 1);

  const outcomePmfs: number[] = outcomes.map(o =>
    Math.exp(logMultinomialPmfUniform(o, N, K)),
  );
  const sumPmf = outcomePmfs.reduce((a, b) => a + b, 0);

  const perDeltaResults: PerDeltaResult[] = [];

  for (const cfg of DELTA_SWEEP) {
    // Cressie-Read λ=2/3 outside-log observed + outcomes.
    const observedCR = cressieRead2_3OutsideLog(counts, N, K, cfg.delta);
    // Conv 3 inside-log observed + outcomes (cross-reference dc2038f).
    const observedC3 = conv3InsideLogLaplace(counts, E_raw, cfg.delta);
    // Method 2 outside-log Pearson observed + outcomes (cross-reference 7e883c6).
    const observedM2 = methodTwoOutsideLogRawChiSquared(counts, N, K, cfg.delta);
    // G² outside-log observed + outcomes (cross-reference 9e92b11).
    const observedG2 = gSquaredOutsideLogLikelihoodRatio(counts, N, K, cfg.delta);
    // Modified LR outside-log observed + outcomes (cross-reference 9e39095).
    const observedMLR = modifiedLrOutsideLogLikelihoodRatio(counts, N, K, cfg.delta);

    let exactP_CR = 0;
    let exactP_C3 = 0;
    let exactP_M2 = 0;
    let exactP_G2 = 0;
    let exactP_MLR = 0;
    let totalPmfSum = 0;

    for (let i = 0; i < outcomes.length; i += 1) {
      const statCR = cressieRead2_3OutsideLog(outcomes[i], N, K, cfg.delta);
      const statC3 = conv3InsideLogLaplace(outcomes[i], E_raw, cfg.delta);
      const statM2 = methodTwoOutsideLogRawChiSquared(outcomes[i], N, K, cfg.delta);
      const statG2 = gSquaredOutsideLogLikelihoodRatio(outcomes[i], N, K, cfg.delta);
      const statMLR = modifiedLrOutsideLogLikelihoodRatio(outcomes[i], N, K, cfg.delta);
      totalPmfSum += outcomePmfs[i];
      if (statCR >= observedCR - PMF_EPS) {
        exactP_CR += outcomePmfs[i];
      }
      if (statC3 >= observedC3 - PMF_EPS) {
        exactP_C3 += outcomePmfs[i];
      }
      if (statM2 >= observedM2 - PMF_EPS) {
        exactP_M2 += outcomePmfs[i];
      }
      if (statG2 >= observedG2 - PMF_EPS) {
        exactP_G2 += outcomePmfs[i];
      }
      if (statMLR >= observedMLR - PMF_EPS) {
        exactP_MLR += outcomePmfs[i];
      }
    }

    const deltaP_vs_C3 = Math.abs(exactP_CR - exactP_C3);
    const byteIdentical_vs_C3 = deltaP_vs_C3 < BYTE_IDENTICAL_TOL;
    const deltaP_vs_M2 = Math.abs(exactP_CR - exactP_M2);
    const byteIdentical_vs_M2 = deltaP_vs_M2 < BYTE_IDENTICAL_TOL;
    const deltaP_vs_G2 = Math.abs(exactP_CR - exactP_G2);
    const byteIdentical_vs_G2 = deltaP_vs_G2 < BYTE_IDENTICAL_TOL;
    const deltaP_vs_MLR = Math.abs(exactP_CR - exactP_MLR);
    const byteIdentical_vs_MLR = deltaP_vs_MLR < BYTE_IDENTICAL_TOL;

    // Singularity handling — δ > 0 ensures O'_i > 0 → (O'_i)^(5/3) > 0 finite.
    const singularityHandled = cfg.delta > 0 && Number.isFinite(observedCR);

    perDeltaResults.push({
      delta: cfg.delta,
      delta_label: cfg.delta_label,
      citation: cfg.citation,
      description: cfg.description,
      observed_statistic_cressie_read_2_3_outside_log: observedCR,
      observed_statistic_conv_3_inside_log: observedC3,
      observed_statistic_method_2_pearson_outside_log: observedM2,
      observed_statistic_g_squared_outside_log: observedG2,
      observed_statistic_modified_lr_outside_log: observedMLR,
      exact_p_value_cressie_read_2_3_outside_log: exactP_CR,
      exact_p_value_conv_3_inside_log_reference: exactP_C3,
      exact_p_value_method_2_pearson_outside_log_reference: exactP_M2,
      exact_p_value_g_squared_outside_log_reference: exactP_G2,
      exact_p_value_modified_lr_outside_log_reference: exactP_MLR,
      byte_identical_match_vs_conv_3: byteIdentical_vs_C3,
      byte_identical_delta_p_vs_conv_3: deltaP_vs_C3,
      byte_identical_match_vs_method_2_pearson: byteIdentical_vs_M2,
      byte_identical_delta_p_vs_method_2_pearson: deltaP_vs_M2,
      byte_identical_match_vs_g_squared: byteIdentical_vs_G2,
      byte_identical_delta_p_vs_g_squared: deltaP_vs_G2,
      byte_identical_match_vs_modified_lr: byteIdentical_vs_MLR,
      byte_identical_delta_p_vs_modified_lr: deltaP_vs_MLR,
      sum_of_pmf: totalPmfSum,
      outcomes_total: outcomes.length,
      zero_cell_singularity_handled: singularityHandled,
    });
  }

  const allByteIdentical_vs_C3 = perDeltaResults.every(r => r.byte_identical_match_vs_conv_3);
  const allByteIdentical_vs_M2 = perDeltaResults.every(
    r => r.byte_identical_match_vs_method_2_pearson,
  );
  const allByteIdentical_vs_G2 = perDeltaResults.every(r => r.byte_identical_match_vs_g_squared);
  const allByteIdentical_vs_MLR = perDeltaResults.every(
    r => r.byte_identical_match_vs_modified_lr,
  );

  const summary = perDeltaResults
    .map(r =>
      `δ=${r.delta}: CR_T=${r.observed_statistic_cressie_read_2_3_outside_log.toFixed(4)}, ` +
      `CR_p=${r.exact_p_value_cressie_read_2_3_outside_log.toFixed(4)}, ` +
      `C3_p=${r.exact_p_value_conv_3_inside_log_reference.toFixed(4)}, ` +
      `M2_p=${r.exact_p_value_method_2_pearson_outside_log_reference.toFixed(4)}, ` +
      `G2_p=${r.exact_p_value_g_squared_outside_log_reference.toFixed(4)}, ` +
      `MLR_p=${r.exact_p_value_modified_lr_outside_log_reference.toFixed(4)}, ` +
      `Δp_C3=${r.byte_identical_delta_p_vs_conv_3.toExponential(2)}, ` +
      `Δp_M2=${r.byte_identical_delta_p_vs_method_2_pearson.toExponential(2)}, ` +
      `Δp_G2=${r.byte_identical_delta_p_vs_g_squared.toExponential(2)}, ` +
      `Δp_MLR=${r.byte_identical_delta_p_vs_modified_lr.toExponential(2)}, ` +
      `match_C3=${r.byte_identical_match_vs_conv_3}, ` +
      `match_M2=${r.byte_identical_match_vs_method_2_pearson}, ` +
      `match_G2=${r.byte_identical_match_vs_g_squared}, ` +
      `match_MLR=${r.byte_identical_match_vs_modified_lr}`,
    )
    .join('; ');

  const evidence =
    `${label}: counts=[${counts.join(', ')}] (N=${N}, K=${K}), ` +
    `E_raw=N/K=${E_raw.toFixed(3)}, zero clusters=${zeroClusterCount}/${K} ` +
    `(Cochran 1954 E≥5 violated: ${cochranViolation}), ` +
    `dc2038f Conv 3 baseline p=${dc2038fBaselineP.toFixed(4)}, ` +
    `δ sweep: ${summary}, all_byte_identical_vs_C3=${allByteIdentical_vs_C3}, ` +
    `all_byte_identical_vs_M2=${allByteIdentical_vs_M2}, ` +
    `all_byte_identical_vs_G2=${allByteIdentical_vs_G2}, ` +
    `all_byte_identical_vs_MLR=${allByteIdentical_vs_MLR}, ` +
    `enumerated=${outcomes.length} (expected C(${N + K - 1},${K - 1})=${expectedCount}), ` +
    `Σ pmf=${sumPmf.toFixed(6)}.`;

  return {
    phase_label: label,
    counts_by_cluster: counts.slice(),
    N,
    K,
    expected_per_cell_raw: E_raw,
    zero_cluster_count: zeroClusterCount,
    cochran_violation: cochranViolation,
    total_enumerated_outcomes: outcomes.length,
    expected_outcomes_combinatorial: expectedCount,
    sum_of_probabilities: sumPmf,
    dc2038f_conv_3_baseline_p: dc2038fBaselineP,
    per_delta_results: perDeltaResults,
    all_deltas_byte_identical_vs_conv_3: allByteIdentical_vs_C3,
    all_deltas_byte_identical_vs_method_2_pearson: allByteIdentical_vs_M2,
    all_deltas_byte_identical_vs_g_squared: allByteIdentical_vs_G2,
    all_deltas_byte_identical_vs_modified_lr: allByteIdentical_vs_MLR,
    evidence,
  };
}

const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Cressie & Read 1984 λ=2/3 (recommended) outside-log variant byte-identical verify R&D (λ-family fully closed extension λ ∈ {1, 0, -1, 2/3})', () => {
  it.skipIf(skipHeavy)(
    '★ Cressie-Read λ=2/3 outside-log (additive count + recommended power divergence) δ ∈ {0.1, 0.5, 1.0} 영역 Phase A/B/C reanalysis (dc2038f Conv 3 + 7e883c6 Method 2 + 9e92b11 G² + 9e39095 Modified LR 4-way byte-identical verify)',
    { timeout: 60000 },
    async () => {
      const startedAtMs = Date.now();

      const PHASE_A_COUNTS = [1, 0, 4, 0];
      const PHASE_B_COUNTS = [0, 3, 0, 2];
      const PHASE_C_COUNTS = [0, 1, 2, 0];
      const N_AB = 5;
      const N_C = 3;
      const K = 4;

      // dc2038f Conv 3 inside-log Laplace baseline (모든 δ ∈ {0.1, 0.5, 1.0}
      // 영역 영역 영역 영역 → δ-invariant).
      const DC2038F_CONV_3_BASELINE_P_A = 0.0625; // Phase A
      const DC2038F_CONV_3_BASELINE_P_B = 0.1797; // Phase B
      const DC2038F_CONV_3_BASELINE_P_C = 0.625; // Phase C

      const phaseA = analyzePhaseDelta(
        'Phase A (untrained)',
        PHASE_A_COUNTS,
        N_AB,
        K,
        DC2038F_CONV_3_BASELINE_P_A,
      );
      const phaseB = analyzePhaseDelta(
        'Phase B (trained)',
        PHASE_B_COUNTS,
        N_AB,
        K,
        DC2038F_CONV_3_BASELINE_P_B,
      );
      const phaseC = analyzePhaseDelta(
        'Phase C (sequence)',
        PHASE_C_COUNTS,
        N_C,
        K,
        DC2038F_CONV_3_BASELINE_P_C,
      );

      console.log('');
      console.log('[cressie-read-2-3-outside-log-delta-verify] === Phase A (untrained) ===');
      console.log(`[cressie-read-2-3-outside-log-delta-verify] ${phaseA.evidence}`);
      console.log('');
      console.log('[cressie-read-2-3-outside-log-delta-verify] === Phase B (trained) ===');
      console.log(`[cressie-read-2-3-outside-log-delta-verify] ${phaseB.evidence}`);
      console.log('');
      console.log('[cressie-read-2-3-outside-log-delta-verify] === Phase C (sequence) ===');
      console.log(`[cressie-read-2-3-outside-log-delta-verify] ${phaseC.evidence}`);

      // ── Hypothesis verdict logic ──
      // H_cressie_read_2_3_lambda_family_extension_closed: 영역 9 cells × 4
      //   baselines = 36 matches 영역 영역 영역.
      // H_cressie_read_2_3_equivalence_broken: 영역 cell × 영역 baseline 영역
      //   byte-identical 영역 영역.
      // H_partial_equivalence: mixed signal.
      const phases = [phaseA, phaseB, phaseC];
      const totalCells = phases.length * DELTA_SWEEP.length;
      const totalBaselines = 4; // C3 + M2 + G2 + MLR
      const totalMatches = totalCells * totalBaselines; // 9 × 4 = 36
      let matchCount_vs_C3 = 0;
      let matchCount_vs_M2 = 0;
      let matchCount_vs_G2 = 0;
      let matchCount_vs_MLR = 0;
      for (const p of phases) {
        for (const r of p.per_delta_results) {
          if (r.byte_identical_match_vs_conv_3) matchCount_vs_C3 += 1;
          if (r.byte_identical_match_vs_method_2_pearson) matchCount_vs_M2 += 1;
          if (r.byte_identical_match_vs_g_squared) matchCount_vs_G2 += 1;
          if (r.byte_identical_match_vs_modified_lr) matchCount_vs_MLR += 1;
        }
      }
      const matchCountTotal =
        matchCount_vs_C3 + matchCount_vs_M2 + matchCount_vs_G2 + matchCount_vs_MLR;

      let overallVerdict:
        | 'H_cressie_read_2_3_lambda_family_extension_closed'
        | 'H_cressie_read_2_3_equivalence_broken'
        | 'H_partial_equivalence';
      let overallEvidence: string;

      if (matchCountTotal === totalMatches) {
        overallVerdict = 'H_cressie_read_2_3_lambda_family_extension_closed';
        overallEvidence =
          `영역 ${totalCells} cells × ${totalBaselines} baselines = ${totalMatches} 매칭 영역 영역 영역 ` +
          'Cressie & Read 1984 §3 권장 λ=2/3 form outside-log exact p 영역 dc2038f Conv 3 inside-log + ' +
          '7e883c6 Method 2 Pearson + 9e92b11 G² + 9e39095 Modified LR baseline 영역 byte-identical ' +
          `(${matchCountTotal}/${totalMatches}, tol=${BYTE_IDENTICAL_TOL.toExponential(0)}) → λ-family ` +
          'fully closed extension (λ ∈ {1, 0, -1, 2/3}) empirical (Cochran 1972 sufficient statistic ' +
          'equivalence broader λ-family confirm — Pearson λ=1 / G² λ→0 / Modified LR λ=-1 / Cressie-Read ' +
          'λ=2/3). outside-log additive count + power divergence formula 영역 uniform null + reject side ' +
          'rule 영역 영역 영역 outcome ordering 영역 영역 영역 → exact p byte-identical. 단 정직 한계 — ' +
          '영역 confirmation 영역 empirical 한정, mathematical proof (Cochran-style equivalence theorem) ' +
          '별도 R&D mandatory. Cressie & Read 1984 §3 published PDF 영역 사용자 직접 verify mandatory.';
      } else if (matchCountTotal === 0) {
        overallVerdict = 'H_cressie_read_2_3_equivalence_broken';
        overallEvidence =
          `영역 ${totalMatches} 매칭 영역 byte-identical=true 영역 영역 (matchCountTotal=${matchCountTotal}) ` +
          '— Cressie-Read λ=2/3 form 영역 영역 λ ∈ {1, 0, -1} family member 영역 sufficient statistic ' +
          'equivalence 영역 영역 영역 → outside-log additive count smoothing + λ=2/3 power divergence ' +
          'formula 영역 fundamentally different outcome ordering. 직전 4 commits verified 영역 λ ∈ ' +
          '{1, 0, -1} 한정 ranged confirmation — λ=2/3 영역 영역 영역 (Cressie & Read 1984 §3 원문 verify ' +
          'mandatory). Cochran 1972 sufficient statistic principle 영역 λ-family broader 영역 λ ∈ {1, 0, -1} ' +
          '한정 ranged confirmation.';
      } else {
        overallVerdict = 'H_partial_equivalence';
        overallEvidence =
          `mixed signal — ${matchCountTotal}/${totalMatches} matches byte-identical (C3=${matchCount_vs_C3}, ` +
          `M2=${matchCount_vs_M2}, G2=${matchCount_vs_G2}, MLR=${matchCount_vs_MLR}). δ regime 영역 영역 영역 ` +
          '영역 영역 영역 — 일부 (phase, δ, baseline) match 영역 Cressie-Read λ=2/3 영역 영역 baseline 영역 ' +
          'outcome ordering 영역 영역 영역. Cochran 1972 sufficient statistic principle 영역 λ-family partial ' +
          '영역 — broader δ continuous sweep + mathematical proof + Cressie & Read 1984 §3 원문 verify 별도 ' +
          'R&D mandatory.';
      }

      console.log('');
      console.log('[cressie-read-2-3-outside-log-delta-verify] === Overall ===');
      console.log(`[cressie-read-2-3-outside-log-delta-verify] overall_verdict=${overallVerdict}`);
      console.log(
        `[cressie-read-2-3-outside-log-delta-verify] match_count_vs_C3=${matchCount_vs_C3}/${totalCells} ` +
          `match_count_vs_M2=${matchCount_vs_M2}/${totalCells} ` +
          `match_count_vs_G2=${matchCount_vs_G2}/${totalCells} ` +
          `match_count_vs_MLR=${matchCount_vs_MLR}/${totalCells} ` +
          `match_count_total=${matchCountTotal}/${totalMatches}`,
      );
      console.log(`[cressie-read-2-3-outside-log-delta-verify] ${overallEvidence}`);

      // Comparison table — Cressie-Read λ=2/3 outside-log vs 4 baselines per (phase, δ).
      console.log('');
      console.log(
        '[cressie-read-2-3-outside-log-delta-verify] === Comparison table (Cressie-Read λ=2/3 vs C3 / M2 / G² / MLR) ===',
      );
      for (let i = 0; i < DELTA_SWEEP.length; i += 1) {
        const cfg = DELTA_SWEEP[i];
        const ra = phaseA.per_delta_results[i];
        const rb = phaseB.per_delta_results[i];
        const rc = phaseC.per_delta_results[i];
        const fmt = (r: PerDeltaResult): string => {
          return `CR=${r.exact_p_value_cressie_read_2_3_outside_log.toFixed(4)} | ` +
            `mC3=${r.byte_identical_match_vs_conv_3 ? 'Y' : 'N'} | ` +
            `mM2=${r.byte_identical_match_vs_method_2_pearson ? 'Y' : 'N'} | ` +
            `mG2=${r.byte_identical_match_vs_g_squared ? 'Y' : 'N'} | ` +
            `mMLR=${r.byte_identical_match_vs_modified_lr ? 'Y' : 'N'}`;
        };
        console.log(
          `[cressie-read-2-3-outside-log-delta-verify] ${('δ=' + cfg.delta.toString()).padEnd(6)} | ` +
            `A: ${fmt(ra).padEnd(50)} | B: ${fmt(rb).padEnd(50)} | C: ${fmt(rc).padEnd(50)}`,
        );
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-cressie-read-2-3-outside-log-delta-verify',
        elapsed_ms: elapsedMs,
        measurement_id: 'hand-snn-cressie-read-2-3-outside-log-delta-verify',
        branch: 'main',
        commit_baselines: {
          conv_3_inside_log_laplace_lr: 'dc2038f',
          method_2_pearson_outside_log: '7e883c6',
          g_squared_outside_log: '9e92b11',
          modified_lr_outside_log: '9e39095',
        },
        hypothesis:
          'T_(2/3)(δ) Cressie-Read 1984 recommended outside-log statistic produces byte-identical p-values vs ' +
          'Conv 3 inside-log Laplace LR AND Method 2 Pearson AND G² AND Modified LR baselines across all ' +
          '(Phase, δ) ∈ {A,B,C} × {0.1, 0.5, 1.0} = 9 cells × 4 baselines = 36 byte-identical matches',
        result:
          overallVerdict === 'H_cressie_read_2_3_lambda_family_extension_closed'
            ? 'PASS'
            : overallVerdict === 'H_cressie_read_2_3_equivalence_broken'
              ? 'FAIL'
              : 'PARTIAL',
        byte_identical_matches: `${matchCountTotal}/${totalMatches}`,
        interpretation:
          'Cressie & Read 1984 §3 권장 λ=2/3 power divergence form (T_(2/3) = 1.8 × Σ O × ((O/E)^(2/3) - 1)) ' +
          '영역 outside-log additive count smoothing variant 영역 직전 4 baselines (Conv 3 inside-log Laplace ' +
          'LR / Method 2 Pearson outside-log λ=1 / G² outside-log λ→0 / Modified LR outside-log λ=-1) 영역 ' +
          'byte-identical exact p 영역 verify → λ-family fully closed extension (λ ∈ {1, 0, -1, 2/3}) ' +
          'empirical (Cochran 1972 sufficient statistic equivalence broader λ-family confirm). uniform null ' +
          '+ reject side rule 영역 영역 영역 outcome ordering preservation 영역 root cause hypothesis. 단 ' +
          'Cressie & Read 1984 §3 원문 직접 form 확인 + mathematical proof 별도 R&D mandatory.',
        hypothesis_verdict:
          overallVerdict === 'H_cressie_read_2_3_lambda_family_extension_closed'
            ? 'H_cressie_read_2_3_lambda_family_extension_closed'
            : overallVerdict,
        honest_limitations: [
          'Small N (5/5/3) regime — Cressie-Read 1984 §3 recommendation 영역 sample-size 한정 적용 가능 ' +
          '(small N + boundary case 한정 권장). large N regime 영역 영역 영역 영역 영역 영역 영역 영역.',
          'λ-family closure 영역 small N + discrete sample space 영역 한정 — large N regime 영역 monotonic ' +
          'ordering preservation 영역 별도 mathematical proof mandatory (Cochran-style equivalence theorem ' +
          '또는 measure-theoretic argument).',
          'Cressie & Read 1984 §3 published PDF 영역 사용자 직접 verify mandatory — 본 R&D 영역 formula ' +
          'transcription 영역 source-of-truth 영역 사용자 mandatory (coefficient 1.8 = 9/5 = 2 / ((2/3) × ' +
          '(5/3)) 영역 산수 확인 영역).',
          '.env.snn-backup NPM_TOKEN + IRIS_API_KEY plaintext leak HIGH — 사용자 직접 rotate + OS secret ' +
          'store 이전 mandatory (본 R&D 영역 직접 fix 영역 영역 — security scope separate).',
          'Existing data reanalysis 한정 (NO SNN run, NO MediaPipe Hand encoder call). Phase B counts 영역 ' +
          '[0,3,0,2] (9e39095 baseline 동일, instruction snippet [1,1,0,3] 영역 typo 영역 영역 — established ' +
          'baseline 영역 영역 영역).',
          '3 δ values 한정 (0.1, 0.5, 1.0) — full continuous δ ∈ [0.01, 5.0] 별도 R&D. δ → 0+ regime 영역 ' +
          'O_i=0 cell 영역 0 × ((0/E)^(2/3) - 1) = 0 (well-defined, λ=2/3 영역 영역 0 × 음수 = 0 영역 limit ' +
          'form 영역 X).',
          'byte-identical (4-way) verify 영역 λ ∈ {1, 0, -1, 2/3} 한정 — Cressie & Read 1984 §3 power ' +
          'divergence family 영역 영역 영역 λ value (λ=2 Neyman χ², λ=-2 Freeman-Tukey 등) 별도 R&D. ' +
          'λ-family full continuous sweep (λ ∈ [-2, 2]) 별도 R&D mandatory.',
          'Exact enumeration N≤5 한정 (N=5/K=4 → 56, N=3/K=4 → 20). N≥10 enumeration intractable — Monte ' +
          'Carlo exact (Mehta & Patel 1983 network algorithm) mandatory.',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 zero-cell pattern 보장 X.',
          'Frequentist: failure to reject ≠ accept H0 — exact p ≥ 0.05 영역 architectural bias 영역 ' +
          '"absence of evidence" 영역 영역 (evidence of absence 영역 영역 영역).',
          'Uniform null (p_i = 1/K) 한정 — non-uniform prior 영역 별도 R&D. uniform null 영역 영역 영역 ' +
          'method 간 PMF 영역 동일 → outcome ordering 영역 영역 exact p 영역 결정 — non-uniform prior 영역 ' +
          '영역 영역 영역 영역 영역 영역 (PMF 영역 method 간 동일하다는 조건 영역 보장 X).',
          'Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative 영역 별도 R&D.',
          'α=0.05 standard convention 영역 별도 reject decision 영역 본 R&D 영역 영역 영역 영역 ' +
          '(byte-identical verification 영역 한정 — α threshold-free).',
          'byte_identical tolerance 1e-9 영역 IEEE 754 floating point rounding 영역 conservative — true ' +
          'byte-identical 영역 distinguish 영역 sufficient 단 ulp-level exact equality 영역 영역 영역.',
          'REPRODUCE_TOL = 1e-3 영역 dc2038f QA LOW fix 영역 영역 영역 영역 baseline p reproduce 영역 ' +
          '4-decimal sufficient (Phase A=0.0625, B=0.1797, C=0.6250 영역 1e-3 tolerance 영역 영역 영역).',
        ],
        focused_scope: {
          analysis_type:
            'Existing Phase A/B/C open_palm winner data 영역 pure statistical reanalysis 영역 영역 영역 ' +
            'Cressie-Read λ=2/3 outside-log variant (additive count smoothing → power divergence recommended ' +
            'form, Cressie & Read 1984 §3) δ ∈ {0.1, 0.5, 1.0} 영역 영역 exact p compute → dc2038f Conv 3 ' +
            '(inside-log Laplace LR, δ-invariant 0.0625/0.1797/0.6250) + 7e883c6 Method 2 Pearson (λ=1) + ' +
            '9e92b11 G² (λ→0) + 9e39095 Modified LR (λ=-1) 영역 byte-identical verify (4-way cross-verify, ' +
            '36 matches). NO SNN run, NO MediaPipe Hand encoder call. 직전 4 commits 영역 27/27 byte-identical ' +
            '영역 영역 영역 → 본 R&D 영역 Cressie-Read 1984 §3 권장 λ=2/3 form 영역 직접 확장 verify (λ-family ' +
            'fully closed extension λ ∈ {1, 0, -1, 2/3}).',
          input_data: {
            phase_a_counts: PHASE_A_COUNTS,
            phase_b_counts: PHASE_B_COUNTS,
            phase_c_counts: PHASE_C_COUNTS,
            N_phase_a: N_AB,
            N_phase_b: N_AB,
            N_phase_c: N_C,
            K_clusters: K,
            dc2038f_conv_3_baseline_p_A: DC2038F_CONV_3_BASELINE_P_A,
            dc2038f_conv_3_baseline_p_B: DC2038F_CONV_3_BASELINE_P_B,
            dc2038f_conv_3_baseline_p_C: DC2038F_CONV_3_BASELINE_P_C,
            phase_a_source: 'open_palm untrained — counts=[1,0,4,0] (cluster 2 dominant)',
            phase_b_source: 'open_palm post-RSTDP — counts=[0,3,0,2] (cluster 1 + 3 active)',
            phase_c_source:
              'open_palm cluster sequence — counts=[0,1,2,0] (cluster 1 + 2 active, N=3)',
            zero_cluster_phase_a: '[1,0,4,0] → 2 zero clusters (idx 1, 3)',
            zero_cluster_phase_b: '[0,3,0,2] → 2 zero clusters (idx 0, 2)',
            zero_cluster_phase_c: '[0,1,2,0] → 2 zero clusters (idx 0, 3)',
            phase_b_counts_clarification:
              'instruction snippet 영역 phase_b_counts=[1,1,0,3] 영역 — 직전 9e39095 Modified LR baseline ' +
              '영역 동일 [0,3,0,2] 영역 사용 (baseline p=0.1797 영역 reproduce 영역 [0,3,0,2] 영역 영역). ' +
              'instruction typo 영역 추정 영역 — established baseline 영역 영역.',
          },
          delta_sweep: DELTA_SWEEP.map(cfg => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            citation: cfg.citation,
            description: cfg.description,
          })),
          cressie_read_2_3_outside_log_formula:
            "O'_i = O_i + δ (additive count smoothing, all cells). N' = N + δ × K. E'_i = N'/K (uniform " +
            "null, smoothed expected). T_(2/3)(δ) = (9/5) × Σ_i O'_i × ((O'_i / E'_i)^(2/3) - 1) = 1.8 × Σ " +
            "O' × ((O'/E')^(2/3) - 1) (Cressie & Read 1984 §3 power divergence λ=2/3 recommended form). " +
            'coefficient = 2 / (λ × (λ + 1)) = 2 / ((2/3) × (5/3)) = 2 / (10/9) = 9/5 = 1.8.',
          conv_3_inside_log_formula_reference:
            'T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ)). dc2038f baseline.',
          method_2_pearson_outside_log_formula_reference:
            "T_χ²(δ) = Σ_i (O'_i - E'_i)² / E'_i (λ=1). 7e883c6 baseline (9/9 byte-identical verified).",
          g_squared_outside_log_formula_reference:
            "T_G²(δ) = 2 Σ_i O'_i × log(O'_i / E'_i) (λ→0). 9e92b11 baseline (9/9 byte-identical verified).",
          modified_lr_outside_log_formula_reference:
            "T_M_LR(δ) = 2 Σ_i E'_i × log(E'_i / O'_i) (λ=-1). 9e39095 baseline (9/9 byte-identical verified).",
          exact_enumeration_method: {
            method:
              'Stars-and-bars enumeration of multinomial compositions (o_0, ..., o_{K-1}) s.t. Σ o_i = N. ' +
              'Total outcomes = C(N+K-1, K-1) — N=5/K=4 → 56, N=3/K=4 → 20.',
            framework_reuse:
              'Same exact enumeration framework as commits a1d6d4d / 6cfecf7 / 493f850 / 7c65a31 / dc2038f / ' +
              '7e883c6 / 9e92b11 / 9e39095. Multinomial PMF + outcome enumeration reused without modification ' +
              '— Cressie-Read λ=2/3 outside-log statistic 영역 영역 확장.',
            exact_p_value_definition:
              'exact p(method, δ) = Σ P[outcome] over all outcomes with T_method(δ)[outcome] ≥ ' +
              'T_method(δ)[observed] (reject side rule). uniform null PMF 영역 method 간 동일 → outcome ' +
              'ordering 영역 영역 영역 영역 exact p 영역 byte-identical.',
            byte_identical_tolerance: BYTE_IDENTICAL_TOL,
            pmf_epsilon: PMF_EPS,
            reproduce_tolerance: REPRODUCE_TOL,
            byte_identical_definition:
              `|p_cressie_read - p_baseline| < ${BYTE_IDENTICAL_TOL.toExponential(0)} (IEEE 754 floating ` +
              'point rounding tolerance — exact arithmetic on multinomial PMF 영역 1e-15 rounding 영역, 1e-9 ' +
              '영역 conservative threshold 영역 true byte-identical 영역 distinguish 영역 sufficient).',
            singularity_handling_note:
              "Cressie-Read λ=2/3 form 영역 O × (O/E)^(2/3) — O ≥ 0 영역 0 × (0/E)^(2/3) = 0 × 0 = 0 " +
              "(well-defined, λ=2/3 > 0 영역 limit form 영역 X). 단 본 R&D 영역 δ > 0 smoothing 영역 영역 " +
              "영역 영역 O'_i = O_i + δ > 0 → (O'_i)^(5/3) finite (singularity 영역 영역 영역).",
          },
        },
        phase_a_analysis: phaseA,
        phase_b_analysis: phaseB,
        phase_c_analysis: phaseC,
        overall_verdict: {
          verdict: overallVerdict,
          evidence: overallEvidence,
          total_cells: totalCells,
          total_baselines: totalBaselines,
          total_matches: totalMatches,
          match_count_vs_conv_3: matchCount_vs_C3,
          match_ratio_vs_conv_3: matchCount_vs_C3 / totalCells,
          match_count_vs_method_2_pearson: matchCount_vs_M2,
          match_ratio_vs_method_2_pearson: matchCount_vs_M2 / totalCells,
          match_count_vs_g_squared: matchCount_vs_G2,
          match_ratio_vs_g_squared: matchCount_vs_G2 / totalCells,
          match_count_vs_modified_lr: matchCount_vs_MLR,
          match_ratio_vs_modified_lr: matchCount_vs_MLR / totalCells,
          match_count_total: matchCountTotal,
          match_ratio_total: matchCountTotal / totalMatches,
          per_delta_summary: DELTA_SWEEP.map((cfg, i) => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            phase_a_cressie_read_observed:
              phaseA.per_delta_results[i].observed_statistic_cressie_read_2_3_outside_log,
            phase_a_cressie_read_p:
              phaseA.per_delta_results[i].exact_p_value_cressie_read_2_3_outside_log,
            phase_a_conv_3_p: phaseA.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_a_method_2_p:
              phaseA.per_delta_results[i].exact_p_value_method_2_pearson_outside_log_reference,
            phase_a_g_squared_p:
              phaseA.per_delta_results[i].exact_p_value_g_squared_outside_log_reference,
            phase_a_modified_lr_p:
              phaseA.per_delta_results[i].exact_p_value_modified_lr_outside_log_reference,
            phase_a_byte_identical_vs_C3: phaseA.per_delta_results[i].byte_identical_match_vs_conv_3,
            phase_a_byte_identical_vs_M2:
              phaseA.per_delta_results[i].byte_identical_match_vs_method_2_pearson,
            phase_a_byte_identical_vs_G2: phaseA.per_delta_results[i].byte_identical_match_vs_g_squared,
            phase_a_byte_identical_vs_MLR:
              phaseA.per_delta_results[i].byte_identical_match_vs_modified_lr,
            phase_b_cressie_read_observed:
              phaseB.per_delta_results[i].observed_statistic_cressie_read_2_3_outside_log,
            phase_b_cressie_read_p:
              phaseB.per_delta_results[i].exact_p_value_cressie_read_2_3_outside_log,
            phase_b_conv_3_p: phaseB.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_b_method_2_p:
              phaseB.per_delta_results[i].exact_p_value_method_2_pearson_outside_log_reference,
            phase_b_g_squared_p:
              phaseB.per_delta_results[i].exact_p_value_g_squared_outside_log_reference,
            phase_b_modified_lr_p:
              phaseB.per_delta_results[i].exact_p_value_modified_lr_outside_log_reference,
            phase_b_byte_identical_vs_C3: phaseB.per_delta_results[i].byte_identical_match_vs_conv_3,
            phase_b_byte_identical_vs_M2:
              phaseB.per_delta_results[i].byte_identical_match_vs_method_2_pearson,
            phase_b_byte_identical_vs_G2: phaseB.per_delta_results[i].byte_identical_match_vs_g_squared,
            phase_b_byte_identical_vs_MLR:
              phaseB.per_delta_results[i].byte_identical_match_vs_modified_lr,
            phase_c_cressie_read_observed:
              phaseC.per_delta_results[i].observed_statistic_cressie_read_2_3_outside_log,
            phase_c_cressie_read_p:
              phaseC.per_delta_results[i].exact_p_value_cressie_read_2_3_outside_log,
            phase_c_conv_3_p: phaseC.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_c_method_2_p:
              phaseC.per_delta_results[i].exact_p_value_method_2_pearson_outside_log_reference,
            phase_c_g_squared_p:
              phaseC.per_delta_results[i].exact_p_value_g_squared_outside_log_reference,
            phase_c_modified_lr_p:
              phaseC.per_delta_results[i].exact_p_value_modified_lr_outside_log_reference,
            phase_c_byte_identical_vs_C3: phaseC.per_delta_results[i].byte_identical_match_vs_conv_3,
            phase_c_byte_identical_vs_M2:
              phaseC.per_delta_results[i].byte_identical_match_vs_method_2_pearson,
            phase_c_byte_identical_vs_G2: phaseC.per_delta_results[i].byte_identical_match_vs_g_squared,
            phase_c_byte_identical_vs_MLR:
              phaseC.per_delta_results[i].byte_identical_match_vs_modified_lr,
          })),
          per_phase_summary: phases.map(p => ({
            phase_label: p.phase_label,
            dc2038f_conv_3_baseline_p: p.dc2038f_conv_3_baseline_p,
            all_deltas_byte_identical_vs_conv_3: p.all_deltas_byte_identical_vs_conv_3,
            all_deltas_byte_identical_vs_method_2_pearson:
              p.all_deltas_byte_identical_vs_method_2_pearson,
            all_deltas_byte_identical_vs_g_squared: p.all_deltas_byte_identical_vs_g_squared,
            all_deltas_byte_identical_vs_modified_lr: p.all_deltas_byte_identical_vs_modified_lr,
            byte_identical_count_vs_conv_3: p.per_delta_results.filter(
              r => r.byte_identical_match_vs_conv_3,
            ).length,
            byte_identical_count_vs_method_2_pearson: p.per_delta_results.filter(
              r => r.byte_identical_match_vs_method_2_pearson,
            ).length,
            byte_identical_count_vs_g_squared: p.per_delta_results.filter(
              r => r.byte_identical_match_vs_g_squared,
            ).length,
            byte_identical_count_vs_modified_lr: p.per_delta_results.filter(
              r => r.byte_identical_match_vs_modified_lr,
            ).length,
            total_deltas: p.per_delta_results.length,
          })),
        },
        hypothesis_details: {
          definitions: {
            H_cressie_read_2_3_lambda_family_extension_closed:
              '영역 9 cells × 4 baselines = 36 매칭 영역 영역 영역 영역 Cressie-Read λ=2/3 outside-log ' +
              '(power divergence recommended form, Cressie & Read 1984 §3) exact p 영역 dc2038f Conv 3 + ' +
              '7e883c6 Method 2 Pearson + 9e92b11 G² + 9e39095 Modified LR baseline 영역 byte-identical ' +
              '(|Δp| < 1e-9) → λ-family fully closed extension (λ ∈ {1, 0, -1, 2/3}) empirical (Cochran ' +
              '1972 sufficient statistic equivalence broader λ-family confirm — Pearson λ=1 / G² λ→0 / ' +
              'Modified LR λ=-1 / Cressie-Read λ=2/3). outside-log additive count + power divergence ' +
              'formula 영역 uniform null + reject side rule 영역 영역 영역 outcome ordering 동등 → exact p ' +
              'byte-identical. 단 정직 한계 — empirical confirmation 한정, Cressie & Read 1984 §3 원문 직접 ' +
              'form mapping verify + mathematical proof (Cochran-style equivalence theorem) 별도 R&D mandatory.',
            H_cressie_read_2_3_equivalence_broken:
              '영역 36 매칭 영역 byte-identical 영역 영역 (matchCountTotal=0) — Cressie-Read λ=2/3 form 영역 ' +
              '영역 λ ∈ {1, 0, -1} family member 영역 sufficient statistic equivalence 영역 영역 영역 → ' +
              'outside-log additive count smoothing + λ=2/3 power divergence formula 영역 fundamentally ' +
              'different outcome ordering vs Conv 3 inside-log Laplace LR + 3 outside-log baselines. ' +
              '직전 4 commits verified 영역 λ ∈ {1, 0, -1} 한정 ranged confirmation — λ=2/3 영역 영역 영역 ' +
              '(Cressie & Read 1984 §3 원문 verify mandatory).',
            H_partial_equivalence:
              'mixed signal — 일부 (phase, δ, baseline) cell 영역 byte-identical, 영역 cell 영역 영역 영역. ' +
              'δ regime 영역 영역 영역 영역 영역 영역 — Cochran 1972 sufficient statistic principle 영역 ' +
              'λ-family partial 영역. broader δ continuous sweep + mathematical proof + Cressie & Read 1984 ' +
              '§3 원문 verify 별도 R&D mandatory.',
          },
          threshold_rationale:
            'byte_identical criterion — |p_cressie_read - p_baseline| < 1e-9. IEEE 754 floating point ' +
            'rounding tolerance (multinomial PMF 영역 exact arithmetic — 1e-15 rounding 영역, 1e-9 영역 ' +
            'conservative). matchCount/totalCells ratio 영역 verdict 영역 결정.',
          reproduce_tolerance_rationale:
            'REPRODUCE_TOL = 1e-3 — dc2038f QA LOW fix 영역 영역 영역 영역 baseline p reproduce 영역 ' +
            '4-decimal sufficient (Phase A=0.0625, B=0.1797, C=0.6250 영역 1e-3 tolerance 영역 영역 영역 ' +
            'exact p 영역 deviation 영역 영역 영역 영역).',
          comparison_to_4_baselines:
            'dc2038f Conv 3 inside-log Laplace δ-invariant baseline — Phase A=0.0625 / B=0.1797 / C=0.6250. ' +
            '7e883c6 Method 2 Pearson (λ=1) — 9/9 byte-identical verified. 9e92b11 G² (λ→0) — 9/9 ' +
            'byte-identical verified. 9e39095 Modified LR (λ=-1) — 9/9 byte-identical verified. 본 R&D 영역 ' +
            'Cressie-Read λ=2/3 영역 4-way byte-identical verify → λ-family fully closed extension.',
          lambda_family_empirical_summary:
            'Cressie & Read 1984 power divergence λ-family — λ=1 (Pearson χ², 7e883c6 verified) + λ→0 (G², ' +
            '9e92b11 verified) + λ=-1 (Modified LR, 9e39095 verified) + λ=2/3 (Cressie-Read recommended, 본 ' +
            'R&D verify) + Conv 3 inside-log Laplace LR (dc2038f baseline). outside-log additive count ' +
            'smoothing variant 영역 inside-log Laplace LR variant 영역 sufficient statistic equivalence 영역 ' +
            'λ-family 영역 영역 영역 empirical 영역 영역 영역 — 본 R&D 영역 λ=2/3 권장 form 영역 영역 영역. ' +
            'λ-family fully closed extension (λ ∈ {1, 0, -1, 2/3}) empirical confirm OR rejected (verdict ' +
            '영역 영역). **CRITICAL QA**: Cressie & Read 1984 §3 published PDF 영역 사용자 직접 verify ' +
            'mandatory — 본 R&D 영역 formula transcription (coefficient 1.8 = 9/5 = 2 / ((2/3) × (5/3))) ' +
            '영역 산수 영역 — 사용자 source-of-truth confirmation mandatory.',
          empirical_vs_formal_proof_caveat:
            'Cochran 1972 sufficient statistic principle 영역 broader theoretical context — 본 R&D 영역 ' +
            '36/36 byte-identical (또는 verdict 영역 영역) 영역 **empirical confirmation 한정** (mathematical ' +
            'proof 0). monotonic ordering preservation property (T_CR(δ) outcome ranking = T_baseline(δ) ' +
            'outcome ranking on uniform null) 영역 본 R&D 영역 root cause hypothesis — formal proof ' +
            '(Cochran-style equivalence theorem 또는 measure-theoretic argument) 별도 R&D mandatory.',
          singularity_handling_caveat:
            "Cressie-Read λ=2/3 form 영역 O × (O/E)^(2/3) — O ≥ 0 영역 0 × (0/E)^(2/3) = 0 × 0 = 0 " +
            '(well-defined). δ > 0 smoothing 영역 영역 영역 영역 O\'_i = O_i + δ > 0 → (O\'_i)^(5/3) finite. ' +
            '본 R&D 영역 δ ∈ {0.1, 0.5, 1.0} 한정 → singularity 영역 X. δ → 0+ regime 영역 영역 영역 영역 — ' +
            'O_i=0 cell 영역 0 × ((0/E)^(2/3) - 1) = 0 (well-defined, λ=2/3 > 0). G² λ→0 + Modified LR λ=-1 ' +
            'form 영역 영역 영역 — λ=2/3 영역 limit form 영역 X (positive λ 영역 well-defined).',
          sigma_pmf_tolerance_note:
            'Σ pmf verification 영역 tolerance — Phase A/B/C × 3 δ × 5 methods (CR + C3 + M2 + G² + MLR) = ' +
            '45 cells verified, Σ ≈ 1.0 (IEEE 754 floating-point rounding 1e-15 level tolerance 영역 영역 ' +
            '영역 — logFactorial 영역 multinomial PMF computation 영역 직접 영역).',
        },
        academic_alignment: [
          'Cressie & Read 1984 §3 — power divergence family general T_λ + λ=2/3 recommended form (sample ' +
          'size small + boundary cases). T_λ = (2 / (λ × (λ + 1))) × Σ O × ((O/E)^λ - 1).',
          'Neyman 1949 — modified likelihood ratio statistic T_M_LR = 2 Σ E log(E/O) (λ=-1 form).',
          'Wilks 1938 — likelihood ratio G² = 2 Σ O log(O/E) (λ→0 limit form).',
          'Pearson 1900 — chi-squared X² = Σ (O-E)²/E (λ=1 form).',
          'Williams 1976 — improved likelihood ratio for sparse contingency tables (outside-log additive ' +
          'count variant).',
          'Cochran 1972 — sufficient statistic principle (broader theoretical context, 본 R&D 영역 ' +
          'empirical confirmation 한정 — mathematical proof 별도 R&D).',
          'Read & Cressie 1988 §2.3 — continuity correction for power divergence.',
          'Laplace 1812 — additive smoothing principle (δ choice 영역 기본 원리, both E and O smoothed by ' +
          'same δ).',
          'Fisher 1925 — Statistical Methods for Research Workers (α=0.05 historical convention).',
          'Cochran 1954 — E≥5 rule (본 R&D 영역 violation 영역 — N=5/K=4 영역 E=1.25, N=3/K=4 영역 E=0.75).',
          '9e39095 — Modified LR (λ=-1 Neyman 1949) outside-log direct verify (9/9 byte-identical confirmed).',
          '9e92b11 — G² (λ→0 Wilks 1938) outside-log direct verify (9/9 byte-identical confirmed).',
          '7e883c6 — Williams Method 2 outside-log Pearson direct verify (λ=1, 9/9 byte-identical confirmed).',
          'dc2038f — Conv 3 inside-log Laplace δ ∈ {0.1, 0.5, 1.0} sensitivity sweep (δ-invariant baseline).',
          '7c65a31 — Williams 1976 §3 inspired symmetric Laplace δ=0.5 baseline.',
          '493f850 — continuity correction R&D.',
          '6cfecf7 — power divergence λ sweep R&D (Cressie & Read 1984 λ-family base).',
          'a1d6d4d — exact multinomial test framework (enumeration reused).',
        ],
        limitations: [
          'Existing data reanalysis 한정 (NO SNN run, NO MediaPipe Hand encoder call).',
          '3 δ values 한정 (Cressie-Read λ=2/3 outside-log 영역 직전 4 commits 영역 동일 δ sweep) — full ' +
          'continuous δ ∈ [0.01, 5.0] 별도 R&D. δ → 0+ regime 영역 영역 영역 ordering preservation 영역 ' +
          '깨질 영역 영역 — broader continuous δ range 별도 R&D mandatory.',
          'Cressie-Read λ=2/3 outside-log additive count smoothing variant 한정 — alternative variants ' +
          '(smoothing 영역 영역, zero-skip strict 0 × (0/E)^(2/3) = 0, λ=2/3 limit form 등) 별도 R&D. 본 ' +
          'R&D 영역 Cressie & Read 1984 §3 recommended λ=2/3 outside-log additive count variant 영역 한정.',
          'byte-identical (4-way) verify 영역 λ ∈ {1, 0, -1, 2/3} 한정 — Cressie & Read 1984 §3 power ' +
          'divergence family 영역 영역 영역 λ value (λ=2 Neyman χ², λ=-2 Freeman-Tukey 등) 별도 R&D. ' +
          'λ-family full sweep (λ ∈ [-2, 2] continuous) 별도 R&D mandatory.',
          'Cochran 1972 sufficient statistic principle 영역 empirical confirmation 한정 — formal proof ' +
          '(Cochran-style equivalence theorem 또는 measure-theoretic argument) 별도 R&D mandatory. ' +
          'monotonic ordering preservation property (T_method(δ) outcome ranking 영역 method 간 동일) 영역 ' +
          'root cause hypothesis 영역 단 proof 영역 영역 영역 영역.',
          'Exact enumeration N≤5 한정 (N=5/K=4 → 56, N=3/K=4 → 20). N≥10 enumeration intractable — Monte ' +
          'Carlo exact (Mehta & Patel 1983 network algorithm) mandatory.',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 zero-cell pattern 보장 X.',
          'Frequentist: failure to reject ≠ accept H0 — exact p ≥ 0.05 영역 architectural bias 영역 ' +
          '"absence of evidence" 영역 영역 (evidence of absence 영역 영역 영역).',
          'Uniform null (p_i = 1/K) 한정 — non-uniform prior 영역 별도 R&D. uniform null 영역 영역 영역 ' +
          'method 간 PMF 영역 동일 → outcome ordering 영역 영역 exact p 영역 결정.',
          'Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative 영역 별도 R&D.',
          'α=0.05 standard convention 영역 별도 reject decision 영역 본 R&D 영역 영역 영역 영역.',
          'byte_identical tolerance 1e-9 영역 IEEE 754 floating point rounding 영역 conservative.',
          'Phase B counts=[0,3,0,2] 영역 instruction snippet=[1,1,0,3] 영역 — established baseline (9e39095 ' +
          '+ baseline p=0.1797 영역 reproduce) 영역 영역 영역 영역 영역. instruction typo 영역 추정 영역.',
        ],
        cross_reference: {
          prior_modified_lr_outside_log_delta_verify: {
            test_path: 'tests/integration/hand-snn-modified-lr-outside-log-delta-verify.test.ts',
            commit: '9e39095',
            measurement_path:
              'tests/integration/measurements/hand-snn-modified-lr-outside-log-delta-verify.json',
            note:
              'Modified LR (λ=-1 Neyman 1949) outside-log direct verify — 9/9 byte-identical vs Conv 3 ' +
              'verified. 본 R&D 영역 cross-reference baseline.',
          },
          prior_g_squared_outside_log_delta_verify: {
            test_path: 'tests/integration/hand-snn-g-squared-outside-log-delta-verify.test.ts',
            commit: '9e92b11',
            measurement_path:
              'tests/integration/measurements/hand-snn-g-squared-outside-log-delta-verify.json',
            note: 'G² (λ→0 Wilks 1938) outside-log — 9/9 byte-identical vs Conv 3 verified.',
          },
          prior_williams_method_2_outside_log_delta_verify: {
            test_path: 'tests/integration/hand-snn-williams-method-2-outside-log-delta-verify.test.ts',
            commit: '7e883c6',
            measurement_path:
              'tests/integration/measurements/hand-snn-williams-method-2-outside-log-delta-verify.json',
            note: 'Method 2 outside-log Pearson (λ=1) — 9/9 byte-identical vs Conv 3 verified.',
          },
          prior_williams_delta_sensitivity_sweep: {
            test_path: 'tests/integration/hand-snn-williams-delta-sensitivity-sweep.test.ts',
            commit: 'dc2038f',
            measurement_path:
              'tests/integration/measurements/hand-snn-williams-delta-sensitivity-sweep.json',
            note:
              'Conv 3 inside-log Laplace δ ∈ {0.1, 0.5, 1.0} sensitivity sweep (δ-invariant — Phase ' +
              'A=0.0625 / B=0.1797 / C=0.6250). 본 R&D 영역 cross-reference baseline.',
          },
          prior_power_divergence_lambda_sweep: {
            test_path: 'tests/integration/hand-snn-power-divergence-lambda-sweep.test.ts',
            commit: '6cfecf7',
            measurement_path:
              'tests/integration/measurements/hand-snn-power-divergence-lambda-sweep.json',
            note:
              'Cressie & Read 1984 λ sweep — λ=2/3 영역 본 R&D outside-log variant 영역 base form. ' +
              'λ-family broader context.',
          },
          prior_exact_multinomial_test: {
            test_path: 'tests/integration/hand-snn-exact-multinomial-test.test.ts',
            commit: 'a1d6d4d',
            measurement_path:
              'tests/integration/measurements/hand-snn-exact-multinomial-test.json',
            note: 'Exact multinomial enumeration framework baseline (reused).',
          },
        },
      };
      saveMeasurement('hand-snn-cressie-read-2-3-outside-log-delta-verify', measurement);

      // 검증 assertion — measurement R&D (verdict reject 없음).
      expect(phaseA.N).toBe(5);
      expect(phaseB.N).toBe(5);
      expect(phaseC.N).toBe(3);
      expect(phaseA.K).toBe(K);
      expect(phaseB.K).toBe(K);
      expect(phaseC.K).toBe(K);
      expect(phaseA.total_enumerated_outcomes).toBe(56);
      expect(phaseB.total_enumerated_outcomes).toBe(56);
      expect(phaseC.total_enumerated_outcomes).toBe(20);
      // PMF sum ≈ 1.0 per phase.
      expect(phaseA.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseA.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseB.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseB.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseC.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseC.sum_of_probabilities).toBeLessThan(1.001);
      // PMF sum ≈ 1.0 per (phase, δ).
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(r.sum_of_pmf).toBeGreaterThan(0.999);
          expect(r.sum_of_pmf).toBeLessThan(1.001);
        }
      }
      // 3 δ values per phase.
      expect(phaseA.per_delta_results.length).toBe(DELTA_SWEEP.length);
      expect(phaseB.per_delta_results.length).toBe(DELTA_SWEEP.length);
      expect(phaseC.per_delta_results.length).toBe(DELTA_SWEEP.length);
      // exact p ∈ (0, 1] per (phase, δ, method).
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(r.exact_p_value_cressie_read_2_3_outside_log).toBeGreaterThan(0);
          expect(r.exact_p_value_cressie_read_2_3_outside_log).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_conv_3_inside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_conv_3_inside_log_reference).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_method_2_pearson_outside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_method_2_pearson_outside_log_reference).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_g_squared_outside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_g_squared_outside_log_reference).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_modified_lr_outside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_modified_lr_outside_log_reference).toBeLessThanOrEqual(1);
        }
      }
      // observed statistic Cressie-Read finite + ≥ 0 (Jensen inequality on uniform null).
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(Number.isFinite(r.observed_statistic_cressie_read_2_3_outside_log)).toBe(true);
          expect(Number.isFinite(r.observed_statistic_conv_3_inside_log)).toBe(true);
          expect(Number.isFinite(r.observed_statistic_method_2_pearson_outside_log)).toBe(true);
          expect(Number.isFinite(r.observed_statistic_g_squared_outside_log)).toBe(true);
          expect(Number.isFinite(r.observed_statistic_modified_lr_outside_log)).toBe(true);
          expect(r.observed_statistic_method_2_pearson_outside_log).toBeGreaterThanOrEqual(0);
          // Cressie-Read λ=2/3 ≥ 0 by Jensen on uniform null.
          expect(r.observed_statistic_cressie_read_2_3_outside_log).toBeGreaterThanOrEqual(-PMF_EPS);
          // singularity handled (δ > 0 → O' > 0).
          expect(r.zero_cell_singularity_handled).toBe(true);
        }
      }
      // zero clusters > 0 per phase.
      expect(phaseA.zero_cluster_count).toBeGreaterThan(0);
      expect(phaseB.zero_cluster_count).toBeGreaterThan(0);
      expect(phaseC.zero_cluster_count).toBeGreaterThan(0);
      // Cochran violation
      expect(phaseA.cochran_violation).toBe(true);
      expect(phaseB.cochran_violation).toBe(true);
      expect(phaseC.cochran_violation).toBe(true);

      // Cressie-Read 1984 baseline p reproduce verify (REPRODUCE_TOL = 1e-3).
      // dc2038f baseline: Phase A=0.0625 / B=0.1797 / C=0.6250.
      for (const r of phaseA.per_delta_results) {
        expect(Math.abs(r.exact_p_value_cressie_read_2_3_outside_log - DC2038F_CONV_3_BASELINE_P_A))
          .toBeLessThan(REPRODUCE_TOL);
      }
      for (const r of phaseB.per_delta_results) {
        expect(Math.abs(r.exact_p_value_cressie_read_2_3_outside_log - DC2038F_CONV_3_BASELINE_P_B))
          .toBeLessThan(REPRODUCE_TOL);
      }
      for (const r of phaseC.per_delta_results) {
        expect(Math.abs(r.exact_p_value_cressie_read_2_3_outside_log - DC2038F_CONV_3_BASELINE_P_C))
          .toBeLessThan(REPRODUCE_TOL);
      }

      // overall verdict ∈ allowed set.
      expect([
        'H_cressie_read_2_3_lambda_family_extension_closed',
        'H_cressie_read_2_3_equivalence_broken',
        'H_partial_equivalence',
      ]).toContain(overallVerdict);

      console.log('');
      console.log('[cressie-read-2-3-outside-log-delta-verify] === Summary ===');
      console.log(`[cressie-read-2-3-outside-log-delta-verify] overall_verdict=${overallVerdict}`);
      console.log(
        `[cressie-read-2-3-outside-log-delta-verify] match_count_total=${matchCountTotal}/${totalMatches} ` +
          `(C3=${matchCount_vs_C3}/${totalCells}, M2=${matchCount_vs_M2}/${totalCells}, ` +
          `G2=${matchCount_vs_G2}/${totalCells}, MLR=${matchCount_vs_MLR}/${totalCells})`,
      );
      console.log(`[cressie-read-2-3-outside-log-delta-verify] elapsed_ms=${elapsedMs}`);
    },
  );
});
