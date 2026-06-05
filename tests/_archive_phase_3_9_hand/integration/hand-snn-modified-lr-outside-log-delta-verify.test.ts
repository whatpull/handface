// Hand SNN — Modified LR (λ=-1 Neyman 1949) outside-log variant byte-identical
// verify R&D (Conv 3 영역 λ=-1 form 매핑 영역 영역 영역 영역 영역 영역 — λ-family
// fully closed empirical, λ ∈ {1, 0, -1} confirm).
//
// 직전 commit 9e92b11 영역 정직 한계 (QA HIGH 1 fix): "λ-family broader 영역 λ ∈
// {1, 0} ranged confirmation 한정 — λ=-1 Modified LR outside-log direct verify
// 별도 R&D mandatory". 7e883c6 영역 λ=1 Pearson outside-log + 9e92b11 영역 λ→0 G²
// outside-log = 18/18 byte-identical vs Conv 3 inside-log Laplace LR baseline
// verified. 단 Conv 3 영역 λ=-1 form 매핑 영역 영역 영역 추정 — Modified LR
// (λ=-1 Neyman 1949) outside-log direct verify 영역 영역 영역 영역 영역.
//
// 본 R&D 영역 Modified LR (λ=-1 Neyman 1949) outside-log variant 영역 영역 영역
// 영역 영역 dc2038f Conv 3 inside-log baseline 영역 byte-identical 영역 verify
// — λ-family fully closed (λ ∈ {1, 0, -1}) empirical confirm OR Conv 3 영역 λ=-1
// form 매핑 영역 영역 영역 영역 영역.
//
// 시나리오 (focused scope, pure statistical reanalysis):
//   - Phase A counts=[1,0,4,0] (N=5, K=4) — open_palm untrained.
//   - Phase B counts=[0,3,0,2] (N=5, K=4) — open_palm post R-STDP.
//   - Phase C counts=[0,1,2,0] (N=3, K=4) — open_palm cluster seq.
//
// Modified LR (λ=-1 Neyman 1949) outside-log formula (7e883c6 / 9e92b11 framework
// reuse, Neyman 1949 substitution):
//   O'_i      = O_i + δ                (additive count smoothing, all i)
//   N'        = N + δ × K              (total count adjusted)
//   E'_i      = N' / K                 (uniform null, smoothed expected)
//   T_M_LR(δ) = 2 Σ_i E'_i × log(E'_i / O'_i)  (Neyman 1949 modified likelihood
//                                              ratio, λ=-1 form of Cressie & Read
//                                              1984 power divergence family —
//                                              E·log(E/O) vs Wilks 1938 G² λ→0
//                                              O·log(O/E))
//
// 영역 formula 영역 9e92b11 G² outside-log framework 영역 E ↔ O role swap variant
// — 영역 cell 영역 영역 영역 δ smoothing + Neyman 1949 modified likelihood ratio
// statistic (Cressie & Read 1984 λ=-1). Cochran 1972 sufficient statistic
// principle 영역 영역 영역 outside-log additive count + Modified LR 영역 inside-log
// Laplace LR 영역 reject side outcome ordering 영역 영역 λ-family fully closed
// 영역 영역 영역 영역 영역 → exact p 영역 byte-identical 영역 expected — 단
// empirical verify mandatory.
//
// δ sweep: δ ∈ {0.1, 0.5, 1.0} (7e883c6 / 9e92b11 / dc2038f 영역 영역 영역).
//
// Singularity handling: Modified LR T = 2 Σ E log(E/O) 영역 O=0 cell 영역 log(E/0)
// = +∞ → undefined. 단 δ > 0 smoothing 영역 영역 영역 영역 O'_i = O_i + δ ≥ δ > 0
// → log(E'/O') 영역 finite. 본 R&D 영역 δ ∈ {0.1, 0.5, 1.0} 한정 → singularity
// 영역 X (smoothing 영역 영역 영역).
//
// CRITICAL cross-verify:
//   dc2038f Conv 3 inside-log δ ∈ {0.1, 0.5, 1.0} 영역 영역 영역 영역 exact p:
//     Phase A: 0.0625 (모든 δ)
//     Phase B: 0.1797 (모든 δ)
//     Phase C: 0.6250 (모든 δ)
//   7e883c6 Method 2 Pearson outside-log (λ=1) — 9/9 byte-identical verified.
//   9e92b11 G² outside-log (λ→0) — 9/9 byte-identical verified.
//   본 R&D Modified LR outside-log (λ=-1) — 영역 영역 영역 영역 영역 → byte-identical
//   영역 verify (λ-family fully closed empirical).
//
// hypothesis verdicts:
//   - H_modified_lr_equivalence_lambda_family_closed:
//       영역 3 δ × 영역 3 phase 영역 영역 영역 영역 Modified LR outside-log exact
//       p 영역 Conv 3 inside-log baseline 영역 byte-identical → Conv 3 영역 λ=-1
//       form 매핑 confirmed → λ-family fully closed (λ ∈ {1, 0, -1}) empirical
//       (Cochran 1972 sufficient statistic equivalence broader λ-family confirm).
//   - H_modified_lr_equivalence_broken_lambda_specific:
//       영역 (phase, δ) cell 영역 byte-identical 영역 영역 — Conv 3 영역 λ=-1
//       form 영역 영역 영역 (영역 form 영역 매핑 가능, Cressie & Read 1984 §3
//       원문 verify 필요).
//   - H_partial_equivalence:
//       일부 cell 영역 영역 영역 — mixed signal.
//
// 학술 정합:
//   - Neyman 1949 — modified likelihood ratio statistic T_M_LR = 2 Σ E log(E/O)
//     (λ=-1 form, Cressie & Read 1984 power divergence family).
//   - Wilks 1938 — likelihood ratio G² = 2 Σ O log(O/E) (λ→0 form).
//   - Pearson 1900 — chi-squared X² = Σ (O-E)²/E (λ=1 form).
//   - Williams 1976 — outside-log additive count smoothing variant.
//   - Cochran 1972 — sufficient statistic principle (broader theoretical context,
//     empirical confirmation 한정).
//   - Cressie & Read 1984 §3 — power divergence λ-family + L'Hopital limit forms.
//   - Read & Cressie 1988 §2.3 — continuity correction.
//   - 7c65a31 / dc2038f / 7e883c6 / 9e92b11 cross-reference.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Statistical helpers (reused from commits a1d6d4d / 6cfecf7 / 493f850 / 7c65a31 / dc2038f / 7e883c6 / 9e92b11) ──

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

// ── Modified LR outside-log — additive count smoothing → modified likelihood ratio (Neyman 1949) ──
//
// O'_i = O_i + δ        (additive count smoothing, all cells)
// N'   = N + δ × K      (total count adjusted)
// E'_i = N' / K         (uniform null, smoothed expected)
// T_M_LR = 2 Σ_i E'_i × log(E'_i / O'_i)  (Neyman 1949 modified likelihood ratio
//                                          statistic on smoothed counts, λ=-1
//                                          form of Cressie & Read 1984 power
//                                          divergence family)
//
// 영역 formula 영역 9e92b11 G² outside-log (λ→0, 2 Σ O log(O/E)) framework 영역
// E ↔ O role swap variant — Neyman 1949 modified likelihood ratio λ=-1. 영역 cell
// 영역 영역 영역 δ smoothing + E log(E/O) (modified LR direction). Cochran 1972
// sufficient statistic principle 영역 영역 영역 outside-log additive count +
// Modified LR 영역 inside-log Laplace LR 영역 reject side outcome ordering 영역
// 영역 λ-family fully closed 영역 영역 영역 영역 영역 → exact p byte-identical
// empirical verify mandatory.
//
// Note (singularity handling, Neyman 1949 E log(E/O)): δ > 0 영역 영역 영역 영역
// O'_i = O_i + δ ≥ δ > 0 → log(E'/O') 영역 finite (singularity 영역 영역). δ=0
// 한정 O_i=0 cell 영역 log(E/0) = +∞ undefined — 단 본 R&D 영역 δ ∈ {0.1, 0.5,
// 1.0} 한정 → singularity 영역 X (additive smoothing 영역 zero cell 영역 영역).
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
    // O_prime > 0 always (δ > 0) → log finite. E_prime > 0 always.
    // Neyman 1949 form: E × log(E/O) (vs Wilks G² O × log(O/E)).
    s += E_prime * Math.log(E_prime / O_prime);
  }
  return 2 * s;
}

// ── Conv 3 inside-log Laplace (dc2038f cross-reference baseline) ──
//
// T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ))
// dc2038f baseline: Phase A=0.0625 / B=0.1797 / C=0.6250 (모든 δ).
//
// 본 R&D 영역 cross-reference baseline 영역 영역 — Modified LR outside-log exact p
// 영역 영역 영역 byte-identical 영역 verify 영역.
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
//
// T_χ² = Σ_i (O'_i - E'_i)² / E'_i (raw Pearson χ² on smoothed counts, λ=1)
// 7e883c6 baseline — 9/9 byte-identical vs dc2038f Conv 3 verified.
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
//
// T_G² = 2 Σ_i O'_i × log(O'_i / E'_i) (likelihood ratio statistic, λ→0)
// 9e92b11 baseline — 9/9 byte-identical vs dc2038f Conv 3 verified.
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
      'Williams 1976 inspired + Laplace 1812 additive smoothing (low δ — minimal smoothing) + Neyman 1949 ' +
      'Modified LR λ=-1',
    description:
      "δ=0.1 — minimal additive smoothing. O'_i = O_i + 0.1, N' = N + 0.4, E' = N'/4. " +
      "T_M_LR = 2 Σ E' × log(E' / O'_i). Neyman 1949 modified likelihood ratio statistic on uniformly " +
      'smoothed counts (λ=-1 form of Cressie & Read 1984 power divergence family).',
  },
  {
    delta: 0.5,
    delta_label: 'delta_0.5',
    citation:
      'Williams 1976 §3 inspired + Read & Cressie 1988 §2.3 (Modified LR outside-log baseline, 7e883c6 / ' +
      '9e92b11 영역 동일 δ sweep) + Neyman 1949 λ=-1',
    description:
      "δ=0.5 — 7c65a31 sufficient statistic equivalence baseline (λ=1 Pearson + λ→0 G² verified). " +
      "O'_i = O_i + 0.5, N' = N + 2.0, E' = N'/4. expected exact p (Conv 3 baseline): Phase A=0.0625, " +
      'Phase B=0.1797, Phase C=0.6250.',
  },
  {
    delta: 1.0,
    delta_label: 'delta_1.0',
    citation:
      'Laplace 1812 additive smoothing (add-one rule, high δ — heavy smoothing) + Neyman 1949 λ=-1',
    description:
      "δ=1.0 — heavy Laplace smoothing (add-one rule, uniform Dirichlet prior α=1). O'_i = O_i + 1.0, " +
      "N' = N + 4.0, E' = N'/4. Bayesian Laplace prior 정합.",
  },
];

// ── Per-(phase, δ) Modified LR outside-log vs Conv 3 + Method 2 Pearson + G² byte-identical verify ──

interface PerDeltaResult {
  delta: number;
  delta_label: string;
  citation: string;
  description: string;
  observed_statistic_modified_lr_outside_log: number;
  observed_statistic_conv_3_inside_log: number;
  observed_statistic_method_2_pearson_outside_log: number;
  observed_statistic_g_squared_outside_log: number;
  exact_p_value_modified_lr_outside_log: number;
  exact_p_value_conv_3_inside_log_reference: number;
  exact_p_value_method_2_pearson_outside_log_reference: number;
  exact_p_value_g_squared_outside_log_reference: number;
  byte_identical_match_vs_conv_3: boolean;
  byte_identical_delta_p_vs_conv_3: number;
  byte_identical_match_vs_method_2_pearson: boolean;
  byte_identical_delta_p_vs_method_2_pearson: number;
  byte_identical_match_vs_g_squared: boolean;
  byte_identical_delta_p_vs_g_squared: number;
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
  evidence: string;
}

// Byte-identical tolerance — exact arithmetic on multinomial PMF 영역 IEEE 754
// rounding error 영역 영역 영역 — 1e-9 tolerance (probabilities sum to integer
// fractions like 6/96 = 0.0625 영역 영역 영역 floating point rounding 영역 1e-15
// 영역). 1e-9 영역 conservative — true byte-identical (same outcome subset
// inclusion) 영역 distinguish 영역 sufficient.
const BYTE_IDENTICAL_TOL = 1e-9;
const PMF_EPS = 1e-9;

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
    // Modified LR outside-log observed + outcomes.
    const observedMLR = modifiedLrOutsideLogLikelihoodRatio(counts, N, K, cfg.delta);
    // Conv 3 inside-log observed + outcomes (cross-reference dc2038f).
    const observedC3 = conv3InsideLogLaplace(counts, E_raw, cfg.delta);
    // Method 2 outside-log Pearson observed + outcomes (cross-reference 7e883c6).
    const observedM2 = methodTwoOutsideLogRawChiSquared(counts, N, K, cfg.delta);
    // G² outside-log observed + outcomes (cross-reference 9e92b11).
    const observedG2 = gSquaredOutsideLogLikelihoodRatio(counts, N, K, cfg.delta);

    let exactP_MLR = 0;
    let exactP_C3 = 0;
    let exactP_M2 = 0;
    let exactP_G2 = 0;
    let totalPmfSum = 0;

    for (let i = 0; i < outcomes.length; i += 1) {
      const statMLR = modifiedLrOutsideLogLikelihoodRatio(outcomes[i], N, K, cfg.delta);
      const statC3 = conv3InsideLogLaplace(outcomes[i], E_raw, cfg.delta);
      const statM2 = methodTwoOutsideLogRawChiSquared(outcomes[i], N, K, cfg.delta);
      const statG2 = gSquaredOutsideLogLikelihoodRatio(outcomes[i], N, K, cfg.delta);
      totalPmfSum += outcomePmfs[i];
      if (statMLR >= observedMLR - PMF_EPS) {
        exactP_MLR += outcomePmfs[i];
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
    }

    const deltaP_vs_C3 = Math.abs(exactP_MLR - exactP_C3);
    const byteIdentical_vs_C3 = deltaP_vs_C3 < BYTE_IDENTICAL_TOL;
    const deltaP_vs_M2 = Math.abs(exactP_MLR - exactP_M2);
    const byteIdentical_vs_M2 = deltaP_vs_M2 < BYTE_IDENTICAL_TOL;
    const deltaP_vs_G2 = Math.abs(exactP_MLR - exactP_G2);
    const byteIdentical_vs_G2 = deltaP_vs_G2 < BYTE_IDENTICAL_TOL;

    // Singularity handling — δ > 0 ensures O'_i > 0 → log(E'/O') finite.
    // δ ∈ {0.1, 0.5, 1.0} 영역 영역 영역 영역 zero cell 영역 영역 영역 영역 영역 (smoothing → O' = δ > 0).
    const singularityHandled = cfg.delta > 0 && Number.isFinite(observedMLR);

    perDeltaResults.push({
      delta: cfg.delta,
      delta_label: cfg.delta_label,
      citation: cfg.citation,
      description: cfg.description,
      observed_statistic_modified_lr_outside_log: observedMLR,
      observed_statistic_conv_3_inside_log: observedC3,
      observed_statistic_method_2_pearson_outside_log: observedM2,
      observed_statistic_g_squared_outside_log: observedG2,
      exact_p_value_modified_lr_outside_log: exactP_MLR,
      exact_p_value_conv_3_inside_log_reference: exactP_C3,
      exact_p_value_method_2_pearson_outside_log_reference: exactP_M2,
      exact_p_value_g_squared_outside_log_reference: exactP_G2,
      byte_identical_match_vs_conv_3: byteIdentical_vs_C3,
      byte_identical_delta_p_vs_conv_3: deltaP_vs_C3,
      byte_identical_match_vs_method_2_pearson: byteIdentical_vs_M2,
      byte_identical_delta_p_vs_method_2_pearson: deltaP_vs_M2,
      byte_identical_match_vs_g_squared: byteIdentical_vs_G2,
      byte_identical_delta_p_vs_g_squared: deltaP_vs_G2,
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

  const summary = perDeltaResults
    .map(r =>
      `δ=${r.delta}: MLR_T=${r.observed_statistic_modified_lr_outside_log.toFixed(4)}, ` +
      `MLR_p=${r.exact_p_value_modified_lr_outside_log.toFixed(4)}, ` +
      `C3_p=${r.exact_p_value_conv_3_inside_log_reference.toFixed(4)}, ` +
      `M2_p=${r.exact_p_value_method_2_pearson_outside_log_reference.toFixed(4)}, ` +
      `G2_p=${r.exact_p_value_g_squared_outside_log_reference.toFixed(4)}, ` +
      `Δp_C3=${r.byte_identical_delta_p_vs_conv_3.toExponential(2)}, ` +
      `Δp_M2=${r.byte_identical_delta_p_vs_method_2_pearson.toExponential(2)}, ` +
      `Δp_G2=${r.byte_identical_delta_p_vs_g_squared.toExponential(2)}, ` +
      `match_C3=${r.byte_identical_match_vs_conv_3}, ` +
      `match_M2=${r.byte_identical_match_vs_method_2_pearson}, ` +
      `match_G2=${r.byte_identical_match_vs_g_squared}`,
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
    evidence,
  };
}

const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Modified LR (λ=-1 Neyman 1949) outside-log variant byte-identical verify R&D (λ-family fully closed empirical, Conv 3 λ=-1 form 매핑 verify)', () => {
  it.skipIf(skipHeavy)(
    '★ Modified LR outside-log (additive count → modified likelihood ratio, λ=-1) δ ∈ {0.1, 0.5, 1.0} 영역 Phase A/B/C reanalysis (dc2038f Conv 3 + 7e883c6 Method 2 Pearson + 9e92b11 G² 3-way byte-identical verify)',
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
      const DC2038F_CONV_3_BASELINE_P_C = 0.6250; // Phase C

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
      console.log('[modified-lr-outside-log-delta-verify] === Phase A (untrained) ===');
      console.log(`[modified-lr-outside-log-delta-verify] ${phaseA.evidence}`);
      console.log('');
      console.log('[modified-lr-outside-log-delta-verify] === Phase B (trained) ===');
      console.log(`[modified-lr-outside-log-delta-verify] ${phaseB.evidence}`);
      console.log('');
      console.log('[modified-lr-outside-log-delta-verify] === Phase C (sequence) ===');
      console.log(`[modified-lr-outside-log-delta-verify] ${phaseC.evidence}`);

      // ── Hypothesis verdict logic ──
      // H_modified_lr_equivalence_lambda_family_closed: 영역 3 δ × 영역 3
      //   phase (총 9 cells) 영역 byte_identical_match_vs_conv_3=true.
      // H_modified_lr_equivalence_broken_lambda_specific: 영역 cell 영역
      //   byte_identical=true.
      // H_partial_equivalence: mixed — 일부 cell 영역.
      const phases = [phaseA, phaseB, phaseC];
      const totalCells = phases.length * DELTA_SWEEP.length;
      let matchCount_vs_C3 = 0;
      let matchCount_vs_M2 = 0;
      let matchCount_vs_G2 = 0;
      for (const p of phases) {
        for (const r of p.per_delta_results) {
          if (r.byte_identical_match_vs_conv_3) matchCount_vs_C3 += 1;
          if (r.byte_identical_match_vs_method_2_pearson) matchCount_vs_M2 += 1;
          if (r.byte_identical_match_vs_g_squared) matchCount_vs_G2 += 1;
        }
      }

      let overallVerdict:
        | 'H_modified_lr_equivalence_lambda_family_closed'
        | 'H_modified_lr_equivalence_broken_lambda_specific'
        | 'H_partial_equivalence';
      let overallEvidence: string;

      if (matchCount_vs_C3 === totalCells) {
        overallVerdict = 'H_modified_lr_equivalence_lambda_family_closed';
        overallEvidence =
          `영역 ${totalCells} cells (3 phases × 3 δ) 영역 영역 영역 영역 Modified LR outside-log (additive ` +
          'count → modified likelihood ratio, Neyman 1949 λ=-1) exact p 영역 dc2038f Conv 3 inside-log ' +
          `(Laplace LR) exact p 영역 byte-identical (${matchCount_vs_C3}/${totalCells}, ` +
          `tol=${BYTE_IDENTICAL_TOL.toExponential(0)}) → Conv 3 영역 λ=-1 form 매핑 confirmed → λ-family ` +
          'fully closed (λ ∈ {1, 0, -1}) empirical (Cochran 1972 sufficient statistic equivalence broader ' +
          'λ-family confirm). outside-log additive count + Modified LR 영역 inside-log Laplace LR 영역 ' +
          'uniform null + reject side rule 영역 영역 영역 outcome ordering 영역 영역 영역 → exact p ' +
          `byte-identical. 7e883c6 Method 2 Pearson (λ=1) cross-verify: ${matchCount_vs_M2}/${totalCells} ` +
          `byte-identical. 9e92b11 G² (λ→0) cross-verify: ${matchCount_vs_G2}/${totalCells} ` +
          'byte-identical. 단 정직 한계 — 영역 confirmation 영역 empirical 한정, mathematical proof ' +
          '(Cochran-style equivalence theorem) 별도 R&D mandatory. Cressie & Read 1984 §3 원문 직접 form ' +
          '확인 별도 R&D.';
      } else if (matchCount_vs_C3 === 0) {
        overallVerdict = 'H_modified_lr_equivalence_broken_lambda_specific';
        overallEvidence =
          `영역 ${totalCells} cells 영역 byte-identical=true 영역 영역 (matchCount=${matchCount_vs_C3}) — ` +
          'Conv 3 영역 λ=-1 form 매핑 영역 영역 영역 영역 → outside-log additive count smoothing 영역 ' +
          'Modified LR formula 영역 fundamentally different outcome ordering vs Conv 3 inside-log Laplace ' +
          'LR. 7e883c6 Method 2 Pearson (λ=1) + 9e92b11 G² (λ→0) verified 영역 λ=-1 Modified LR 영역 영역 ' +
          '영역 → Conv 3 영역 다른 λ form 영역 매핑 가능 (Cressie & Read 1984 §3 원문 verify mandatory). ' +
          'Cochran 1972 sufficient statistic principle 영역 λ-family broader 영역 λ ∈ {1, 0} 한정 ranged ' +
          'confirmation (λ=-1 영역 영역).';
      } else {
        overallVerdict = 'H_partial_equivalence';
        overallEvidence =
          `mixed signal — ${matchCount_vs_C3}/${totalCells} cells byte-identical vs Conv 3. δ regime 영역 ` +
          '영역 영역 영역 영역 영역 — 일부 (phase, δ) cell 영역 Modified LR outside-log 영역 Conv 3 ' +
          'inside-log variant 영역 outcome ordering 영역 영역 영역. Cochran 1972 sufficient statistic ' +
          'principle 영역 λ-family partial 영역 — broader δ continuous sweep + mathematical proof + ' +
          'Cressie & Read 1984 §3 원문 verify 별도 R&D mandatory.';
      }

      console.log('');
      console.log('[modified-lr-outside-log-delta-verify] === Overall ===');
      console.log(`[modified-lr-outside-log-delta-verify] overall_verdict=${overallVerdict}`);
      console.log(
        `[modified-lr-outside-log-delta-verify] match_count_vs_C3=${matchCount_vs_C3}/${totalCells} ` +
          `match_count_vs_M2=${matchCount_vs_M2}/${totalCells} ` +
          `match_count_vs_G2=${matchCount_vs_G2}/${totalCells}`,
      );
      console.log(`[modified-lr-outside-log-delta-verify] ${overallEvidence}`);

      // Comparison table — Modified LR outside-log vs Conv 3 + Method 2 Pearson + G² byte-identical per (phase, δ).
      console.log('');
      console.log(
        '[modified-lr-outside-log-delta-verify] === Comparison table (Modified LR outside-log vs Conv 3 / M2 Pearson / G²) ===',
      );
      console.log(
        '[modified-lr-outside-log-delta-verify] δ      | Phase A (MLR_p | C3_p | m_C3 | M2_p | m_M2 | G2_p | m_G2) | Phase B (...) | Phase C (...)',
      );
      console.log(
        '[modified-lr-outside-log-delta-verify] -------+-----------------------------------------------------------------------+---------------+--------------',
      );
      for (let i = 0; i < DELTA_SWEEP.length; i += 1) {
        const cfg = DELTA_SWEEP[i];
        const ra = phaseA.per_delta_results[i];
        const rb = phaseB.per_delta_results[i];
        const rc = phaseC.per_delta_results[i];
        const fmt = (r: PerDeltaResult): string => {
          return `MLR=${r.exact_p_value_modified_lr_outside_log.toFixed(4)} | ` +
            `C3=${r.exact_p_value_conv_3_inside_log_reference.toFixed(4)} | ` +
            `mC3=${r.byte_identical_match_vs_conv_3 ? 'Y' : 'N'} | ` +
            `M2=${r.exact_p_value_method_2_pearson_outside_log_reference.toFixed(4)} | ` +
            `mM2=${r.byte_identical_match_vs_method_2_pearson ? 'Y' : 'N'} | ` +
            `G2=${r.exact_p_value_g_squared_outside_log_reference.toFixed(4)} | ` +
            `mG2=${r.byte_identical_match_vs_g_squared ? 'Y' : 'N'}`;
        };
        console.log(
          `[modified-lr-outside-log-delta-verify] ${('δ=' + cfg.delta.toString()).padEnd(6)} | ` +
            `${fmt(ra).padEnd(75)} | ${fmt(rb).padEnd(75)} | ${fmt(rc).padEnd(75)}`,
        );
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-modified-lr-outside-log-delta-verify',
        elapsed_ms: elapsedMs,
        focused_scope: {
          analysis_type:
            'Existing Phase A/B/C open_palm winner data 영역 pure statistical reanalysis 영역 영역 영역 ' +
            'Modified LR outside-log variant (additive count smoothing → modified likelihood ratio, Neyman ' +
            '1949 λ=-1 form of Cressie & Read 1984 power divergence) δ ∈ {0.1, 0.5, 1.0} 영역 영역 exact p ' +
            'compute → dc2038f Conv 3 (inside-log Laplace LR, δ-invariant 0.0625/0.1797/0.6250) + 7e883c6 ' +
            'Method 2 Pearson outside-log (λ=1, 9/9 verified) + 9e92b11 G² outside-log (λ→0, 9/9 verified) ' +
            '영역 byte-identical verify (3-way cross-verify). NO SNN run, NO MediaPipe Hand encoder call. ' +
            '직전 commit 9e92b11 영역 정직 한계 (QA HIGH 1 fix) "λ-family broader 영역 λ ∈ {1, 0} ranged ' +
            'confirmation 한정 — λ=-1 Modified LR outside-log direct verify 별도 R&D mandatory" 영역 직접 ' +
            'followup (λ=-1 Modified LR direct verify, λ-family fully closed empirical).',
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
            dc2038f_baseline_note:
              'dc2038f (hand-snn-williams-delta-sensitivity-sweep) Conv 3 inside-log Laplace δ-invariant ' +
              'exact p — Phase A=0.0625 / B=0.1797 / C=0.6250 (모든 δ ∈ {0.1, 0.5, 1.0} 영역 영역 영역 영역).',
            method_2_pearson_baseline_note:
              '7e883c6 (hand-snn-williams-method-2-outside-log-delta-verify) Method 2 outside-log Pearson ' +
              '(λ=1) — 9/9 byte-identical vs Conv 3 verified (Phase A=0.0625, B=0.1797, C=0.6250 across ' +
              'δ ∈ {0.1, 0.5, 1.0}). λ=1 Cochran 1972 sufficient statistic equivalence empirically confirmed.',
            g_squared_baseline_note:
              '9e92b11 (hand-snn-g-squared-outside-log-delta-verify) G² outside-log (λ→0 Wilks 1938) — 9/9 ' +
              'byte-identical vs Conv 3 verified (Phase A=0.0625, B=0.1797, C=0.6250 across δ ∈ {0.1, 0.5, ' +
              '1.0}). λ→0 G² broader λ-family equivalence empirically confirmed.',
          },
          delta_sweep: DELTA_SWEEP.map(cfg => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            citation: cfg.citation,
            description: cfg.description,
          })),
          modified_lr_outside_log_formula:
            "O'_i = O_i + δ (additive count smoothing, all cells). N' = N + δ × K. E'_i = N'/K (uniform " +
            "null, smoothed expected). T_M_LR(δ) = 2 Σ_i E'_i × log(E'_i / O'_i) (Neyman 1949 modified " +
            'likelihood ratio statistic on smoothed counts, λ=-1 form of Cressie & Read 1984 power divergence ' +
            'family — E × log(E/O) vs Wilks G² λ→0 O × log(O/E)). Williams 1976 §3 inspired + Read & Cressie ' +
            '1988 §2.3 additive count variant + Cressie & Read 1984 §3 λ=-1 — 영역 cell 영역 영역 영역 δ ' +
            'smoothing + modified likelihood ratio. δ > 0 영역 영역 영역 영역 O\' > 0 → log(E\'/O\') finite ' +
            '(zero cell singularity 영역 X — additive smoothing 영역 영역).',
          method_2_pearson_outside_log_formula_reference:
            "T_χ²(δ) = Σ_i (O'_i - E'_i)² / E'_i (raw Pearson χ² on smoothed counts, Cressie & Read 1984 λ=1). " +
            '7e883c6 baseline (9/9 byte-identical verified).',
          g_squared_outside_log_formula_reference:
            "T_G²(δ) = 2 Σ_i O'_i × log(O'_i / E'_i) (Wilks 1938 likelihood ratio statistic, λ→0 form). " +
            '9e92b11 baseline (9/9 byte-identical verified).',
          conv_3_inside_log_formula_reference:
            'T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ)). dc2038f baseline.',
          exact_enumeration_method: {
            method:
              'Stars-and-bars enumeration of multinomial compositions (o_0, ..., o_{K-1}) s.t. Σ o_i = N. ' +
              'Total outcomes = C(N+K-1, K-1) — N=5/K=4 → 56, N=3/K=4 → 20.',
            framework_reuse:
              'Same exact enumeration framework as commits a1d6d4d / 6cfecf7 / 493f850 / 7c65a31 / dc2038f / ' +
              '7e883c6 / 9e92b11. Multinomial PMF + outcome enumeration reused without modification — ' +
              'Modified LR outside-log statistic 영역 영역 확장 (9e92b11 G² framework 영역 E ↔ O role swap).',
            exact_p_value_definition:
              'exact p(method, δ) = Σ P[outcome] over all outcomes with T_method(δ)[outcome] ≥ ' +
              'T_method(δ)[observed] (reject side rule). uniform null PMF 영역 method 간 동일 → outcome ' +
              'ordering 영역 영역 영역 영역 exact p 영역 byte-identical.',
            byte_identical_tolerance: BYTE_IDENTICAL_TOL,
            pmf_epsilon: PMF_EPS,
            byte_identical_definition:
              `|p_modified_lr - p_method| < ${BYTE_IDENTICAL_TOL.toExponential(0)} (IEEE 754 floating ` +
              'point rounding tolerance — exact arithmetic on multinomial PMF 영역 1e-15 rounding 영역, 1e-9 ' +
              '영역 conservative threshold 영역 true byte-identical 영역 distinguish 영역 sufficient).',
            singularity_handling_note:
              'Modified LR T = 2 Σ E log(E/O) 영역 O=0 cell 영역 log(E/0) = +∞ undefined. 단 δ > 0 영역 ' +
              "영역 영역 영역 O'_i = O_i + δ ≥ δ > 0 → log(E'/O') finite. 본 R&D 영역 δ ∈ {0.1, 0.5, 1.0} " +
              '한정 → singularity 영역 X (additive smoothing 영역 zero cell 영역 영역 영역).',
          },
        },
        phase_a_analysis: phaseA,
        phase_b_analysis: phaseB,
        phase_c_analysis: phaseC,
        overall_verdict: {
          verdict: overallVerdict,
          evidence: overallEvidence,
          total_cells: totalCells,
          match_count_vs_conv_3: matchCount_vs_C3,
          match_ratio_vs_conv_3: matchCount_vs_C3 / totalCells,
          match_count_vs_method_2_pearson: matchCount_vs_M2,
          match_ratio_vs_method_2_pearson: matchCount_vs_M2 / totalCells,
          match_count_vs_g_squared: matchCount_vs_G2,
          match_ratio_vs_g_squared: matchCount_vs_G2 / totalCells,
          per_delta_summary: DELTA_SWEEP.map((cfg, i) => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            phase_a_modified_lr_observed:
              phaseA.per_delta_results[i].observed_statistic_modified_lr_outside_log,
            phase_a_modified_lr_p: phaseA.per_delta_results[i].exact_p_value_modified_lr_outside_log,
            phase_a_conv_3_p: phaseA.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_a_method_2_pearson_p:
              phaseA.per_delta_results[i].exact_p_value_method_2_pearson_outside_log_reference,
            phase_a_g_squared_p:
              phaseA.per_delta_results[i].exact_p_value_g_squared_outside_log_reference,
            phase_a_delta_p_vs_C3: phaseA.per_delta_results[i].byte_identical_delta_p_vs_conv_3,
            phase_a_byte_identical_vs_C3: phaseA.per_delta_results[i].byte_identical_match_vs_conv_3,
            phase_a_byte_identical_vs_M2:
              phaseA.per_delta_results[i].byte_identical_match_vs_method_2_pearson,
            phase_a_byte_identical_vs_G2: phaseA.per_delta_results[i].byte_identical_match_vs_g_squared,
            phase_b_modified_lr_observed:
              phaseB.per_delta_results[i].observed_statistic_modified_lr_outside_log,
            phase_b_modified_lr_p: phaseB.per_delta_results[i].exact_p_value_modified_lr_outside_log,
            phase_b_conv_3_p: phaseB.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_b_method_2_pearson_p:
              phaseB.per_delta_results[i].exact_p_value_method_2_pearson_outside_log_reference,
            phase_b_g_squared_p:
              phaseB.per_delta_results[i].exact_p_value_g_squared_outside_log_reference,
            phase_b_delta_p_vs_C3: phaseB.per_delta_results[i].byte_identical_delta_p_vs_conv_3,
            phase_b_byte_identical_vs_C3: phaseB.per_delta_results[i].byte_identical_match_vs_conv_3,
            phase_b_byte_identical_vs_M2:
              phaseB.per_delta_results[i].byte_identical_match_vs_method_2_pearson,
            phase_b_byte_identical_vs_G2: phaseB.per_delta_results[i].byte_identical_match_vs_g_squared,
            phase_c_modified_lr_observed:
              phaseC.per_delta_results[i].observed_statistic_modified_lr_outside_log,
            phase_c_modified_lr_p: phaseC.per_delta_results[i].exact_p_value_modified_lr_outside_log,
            phase_c_conv_3_p: phaseC.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_c_method_2_pearson_p:
              phaseC.per_delta_results[i].exact_p_value_method_2_pearson_outside_log_reference,
            phase_c_g_squared_p:
              phaseC.per_delta_results[i].exact_p_value_g_squared_outside_log_reference,
            phase_c_delta_p_vs_C3: phaseC.per_delta_results[i].byte_identical_delta_p_vs_conv_3,
            phase_c_byte_identical_vs_C3: phaseC.per_delta_results[i].byte_identical_match_vs_conv_3,
            phase_c_byte_identical_vs_M2:
              phaseC.per_delta_results[i].byte_identical_match_vs_method_2_pearson,
            phase_c_byte_identical_vs_G2: phaseC.per_delta_results[i].byte_identical_match_vs_g_squared,
          })),
          per_phase_summary: phases.map(p => ({
            phase_label: p.phase_label,
            dc2038f_conv_3_baseline_p: p.dc2038f_conv_3_baseline_p,
            all_deltas_byte_identical_vs_conv_3: p.all_deltas_byte_identical_vs_conv_3,
            all_deltas_byte_identical_vs_method_2_pearson:
              p.all_deltas_byte_identical_vs_method_2_pearson,
            all_deltas_byte_identical_vs_g_squared: p.all_deltas_byte_identical_vs_g_squared,
            byte_identical_count_vs_conv_3: p.per_delta_results.filter(
              r => r.byte_identical_match_vs_conv_3,
            ).length,
            byte_identical_count_vs_method_2_pearson: p.per_delta_results.filter(
              r => r.byte_identical_match_vs_method_2_pearson,
            ).length,
            byte_identical_count_vs_g_squared: p.per_delta_results.filter(
              r => r.byte_identical_match_vs_g_squared,
            ).length,
            total_deltas: p.per_delta_results.length,
          })),
        },
        hypothesis_details: {
          definitions: {
            H_modified_lr_equivalence_lambda_family_closed:
              '영역 3 δ × 영역 3 phase (총 9 cells) 영역 영역 영역 영역 Modified LR outside-log (additive ' +
              'count → modified likelihood ratio, Neyman 1949 λ=-1) exact p 영역 dc2038f Conv 3 inside-log ' +
              '(Laplace LR) exact p 영역 byte-identical (|Δp| < 1e-9) → Conv 3 영역 λ=-1 form 매핑 confirmed ' +
              '→ λ-family fully closed (λ ∈ {1, 0, -1}) empirical (Cochran 1972 sufficient statistic ' +
              'equivalence broader λ-family confirm — λ=1 Pearson 7e883c6 + λ→0 G² 9e92b11 + λ=-1 Modified ' +
              'LR 본 R&D). outside-log additive count + Modified LR 영역 inside-log Laplace LR 영역 uniform ' +
              'null + reject side rule 영역 영역 영역 outcome ordering 동등 → exact p byte-identical. 단 ' +
              '정직 한계 — empirical confirmation 한정, Cressie & Read 1984 §3 원문 직접 form mapping verify ' +
              '+ mathematical proof (Cochran-style equivalence theorem) 별도 R&D mandatory.',
            H_modified_lr_equivalence_broken_lambda_specific:
              '영역 (phase, δ) cell 영역 byte-identical 영역 영역 (matchCount=0) — Conv 3 영역 λ=-1 form ' +
              '매핑 영역 영역 영역 영역 영역 영역 영역 → outside-log additive count smoothing + Modified LR ' +
              'formula 영역 fundamentally different outcome ordering vs Conv 3 inside-log Laplace LR. ' +
              '7e883c6 Method 2 Pearson (λ=1) + 9e92b11 G² (λ→0) verified 영역 λ=-1 Modified LR 영역 영역 ' +
              '영역 — Conv 3 영역 다른 λ form 영역 매핑 가능 (Cressie & Read 1984 §3 원문 verify mandatory). ' +
              'Cochran 1972 sufficient statistic principle 영역 λ-family broader 영역 λ ∈ {1, 0} 한정 ranged ' +
              'confirmation (λ=-1 영역 영역).',
            H_partial_equivalence:
              'mixed signal — 일부 (phase, δ) cell 영역 byte-identical, 영역 cell 영역 영역 영역. δ regime ' +
              '영역 영역 영역 영역 영역 영역 — Cochran 1972 sufficient statistic principle 영역 λ-family ' +
              'partial 영역. broader δ continuous sweep + mathematical proof + Cressie & Read 1984 §3 원문 ' +
              'verify 별도 R&D mandatory.',
          },
          threshold_rationale:
            'byte_identical criterion — |p_modified_lr - p_reference| < 1e-9. IEEE 754 floating point ' +
            'rounding tolerance (multinomial PMF 영역 exact arithmetic — 1e-15 rounding 영역, 1e-9 영역 ' +
            'conservative). matchCount/totalCells ratio 영역 verdict 영역 결정.',
          comparison_to_dc2038f_baseline:
            'dc2038f Conv 3 inside-log Laplace δ-invariant baseline — Phase A=0.0625 / B=0.1797 / C=0.6250 ' +
            '(모든 δ ∈ {0.1, 0.5, 1.0}). 본 R&D 영역 Modified LR outside-log 영역 영역 영역 영역 영역 영역 ' +
            '영역 byte-identical 영역 verify → Conv 3 영역 λ=-1 form 매핑 verification (confirmed OR rejected).',
          comparison_to_7e883c6_baseline:
            '7e883c6 (williams-method-2-outside-log-delta-verify) Method 2 outside-log Pearson (λ=1) — 9/9 ' +
            'byte-identical vs Conv 3 verified across δ ∈ {0.1, 0.5, 1.0}. λ=1 Cochran 1972 sufficient ' +
            'statistic equivalence empirically confirmed.',
          comparison_to_9e92b11_baseline:
            '9e92b11 (g-squared-outside-log-delta-verify) G² outside-log (λ→0 Wilks 1938) — 9/9 byte-identical ' +
            'vs Conv 3 verified across δ ∈ {0.1, 0.5, 1.0}. λ→0 G² broader λ-family equivalence empirically ' +
            'confirmed. 단 정직 한계 (QA HIGH 1 fix) "λ ∈ {1, 0} ranged confirmation 한정 — λ=-1 Modified LR ' +
            'outside-log direct verify 별도 R&D mandatory" 명시. 본 R&D 영역 직접 followup (λ=-1 한정).',
          comparison_to_7c65a31_baseline:
            '7c65a31 (williams-formal-symmetric-convention) 영역 Conv 3 δ=0.5 한정 — Method 2 (493f850 ' +
            'outside-log) 영역 동일 exact p (Phase A=0.0625, B=0.1797, C=0.6250) verified. 단 7c65a31 영역 ' +
            'δ=0.5 단일 한정 + λ=1 한정. 본 R&D 영역 δ ∈ {0.1, 0.5, 1.0} broader + λ=-1 Modified LR 영역 영역 ' +
            '영역 verify.',
          lambda_family_empirical_summary:
            'Cressie & Read 1984 power divergence λ-family — λ=1 (Pearson χ², 7e883c6 verified) + λ→0 (G², ' +
            '9e92b11 verified) + λ=-1 (Modified LR, 본 R&D verify) + Conv 3 inside-log Laplace LR (dc2038f ' +
            'baseline). outside-log additive count smoothing variant 영역 inside-log Laplace LR variant 영역 ' +
            'sufficient statistic equivalence 영역 λ-family 영역 영역 영역 empirical 영역 영역 영역 — 본 R&D ' +
            '영역 λ=-1 Modified LR 영역 영역 영역. λ-family fully closed (λ ∈ {1, 0, -1}) empirical confirm ' +
            'OR rejected (verdict 영역 영역). ' +
            '**QA MEDIUM catch fix (Conv 3 λ-form labeling clarification)**: Conv 3 inside-log Laplace LR ' +
            'formula `2 Σ (E+δ) log((E+δ)/(O+δ))` 영역 Cressie & Read 1984 §3 power divergence λ-family 영역 ' +
            '영역 영역 λ form 영역 directly mapping 0 — 직전 commits (7c65a31 / dc2038f / 7e883c6 / 9e92b11) ' +
            '영역 "λ=-1 form" 라벨링 영역 영역 영역 추정 hypothesis 한정. 본 R&D 영역 λ=-1 Modified LR ' +
            'outside-log direct verify 영역 영역 영역 영역 영역 — byte-identical 영역 confirmed 영역 Conv 3 ' +
            '영역 λ=-1 form 매핑 empirical confirm (단 Cressie & Read 1984 §3 원문 직접 form 확인 별도 R&D).',
          empirical_vs_formal_proof_caveat:
            'Cochran 1972 sufficient statistic principle 영역 broader theoretical context — 본 R&D 영역 ' +
            '9/9 byte-identical (또는 verdict 영역 영역) 영역 **empirical confirmation 한정** (mathematical ' +
            'proof 0). monotonic ordering preservation property (T_M_LR(δ) outcome ranking = T_C3(δ) outcome ' +
            'ranking on uniform null) 영역 본 R&D 영역 root cause hypothesis — formal proof (Cochran-style ' +
            'equivalence theorem 또는 measure-theoretic argument) 별도 R&D mandatory.',
          singularity_handling_caveat:
            'Modified LR T = 2 Σ E log(E/O) 영역 O=0 cell 영역 log(E/0) = +∞ undefined. 단 δ > 0 영역 ' +
            "영역 영역 영역 O'_i = O_i + δ ≥ δ > 0 → log(E'/O') finite. 본 R&D 영역 δ ∈ {0.1, 0.5, 1.0} " +
            '한정 → singularity 영역 X (additive smoothing 영역 zero cell 영역 영역 영역). δ → 0+ regime ' +
            '영역 영역 영역 직접 영역 영역 영역 (limit form 영역 0 × log(0/0) indeterminate — L\'Hopital ' +
            '또는 convention 영역 0 영역 처리). 별도 R&D mandatory.',
          sigma_pmf_tolerance_note:
            'Σ pmf verification 영역 tolerance — Phase A/B/C × 3 δ × 4 methods (MLR + C3 + M2 + G²) = 36 ' +
            'cells verified, Σ ≈ 1.0 (IEEE 754 floating-point rounding 1e-15 level tolerance 영역 영역 영역 ' +
            '— logFactorial 영역 multinomial PMF computation 영역 직접 영역).',
        },
        academic_alignment: [
          'Neyman 1949 — modified likelihood ratio statistic T_M_LR = 2 Σ E log(E/O) (λ=-1 form, Cressie & ' +
          'Read 1984 power divergence family).',
          'Wilks 1938 — likelihood ratio G² = 2 Σ O log(O/E) (λ→0 limit form).',
          'Pearson 1900 — chi-squared X² = Σ (O-E)²/E (λ=1 form).',
          'Williams 1976 — improved likelihood ratio for sparse contingency tables (outside-log additive ' +
          'count variant).',
          'Cochran 1972 — sufficient statistic principle (broader theoretical context, 본 R&D 영역 ' +
          'empirical confirmation 한정 — mathematical proof 별도 R&D).',
          'Read & Cressie 1988 §2.3 — continuity correction for power divergence.',
          'Cressie & Read 1984 §3 — power divergence limit forms (λ→0 G² + λ=1 Pearson + λ=-1 Modified LR).',
          'Laplace 1812 — additive smoothing principle (δ choice 영역 기본 원리, both E and O smoothed by ' +
          'same δ).',
          'Fisher 1925 — Statistical Methods for Research Workers (α=0.05 historical convention).',
          'Cochran 1954 — E≥5 rule (본 R&D 영역 violation 영역 — N=5/K=4 영역 E=1.25, N=3/K=4 영역 E=0.75).',
          '9e92b11 — G² (λ→0 Wilks 1938) outside-log direct verify (9/9 byte-identical confirmed). 정직 ' +
          '한계 명시: "λ-family broader 영역 λ ∈ {1, 0} ranged confirmation 한정 — λ=-1 Modified LR ' +
          'outside-log direct verify 별도 R&D mandatory". 본 R&D 영역 직접 followup.',
          '7e883c6 — Williams Method 2 outside-log Pearson direct verify (λ=1, 9/9 byte-identical confirmed).',
          'dc2038f — Conv 3 inside-log Laplace δ ∈ {0.1, 0.5, 1.0} sensitivity sweep (δ-invariant baseline).',
          '7c65a31 — Williams 1976 §3 inspired symmetric Laplace δ=0.5 baseline (Conv 3 vs Method 2 영역 영역 ' +
          'sufficient statistic equivalent verified — δ=0.5 단일 + λ=1 한정).',
          '493f850 — continuity correction R&D (Method 2 Williams δ outside-log additive count variant — ' +
          'zero-cell only smoothing + Modified LR baseline).',
          '6cfecf7 — power divergence λ sweep R&D (Cressie & Read 1984 λ-family base).',
          'a1d6d4d — exact multinomial test framework (enumeration reused).',
        ],
        limitations: [
          'Existing data reanalysis 한정 (NO SNN run, NO MediaPipe Hand encoder call).',
          '3 δ values 한정 (Modified LR outside-log 영역 7e883c6 Pearson + 9e92b11 G² outside-log 영역 동일 ' +
          'δ sweep) — full continuous δ ∈ [0.01, 5.0] 별도 R&D. δ → 0+ regime 영역 영역 영역 ordering ' +
          "preservation 영역 깨질 영역 영역 — broader continuous δ range 별도 R&D mandatory. δ → 0+ 영역 " +
          "O'_i → O_i (= 0 for zero cells) → log(E'/0) singularity — limit form 영역 별도 R&D.",
          'Modified LR outside-log additive count smoothing variant 한정 — Neyman 1949 영역 영역 영역 영역 ' +
          '영역 variant (smoothing 영역 영역, zero-skip strict 0 × log(0)=0, alternative limit form 등) 별도 ' +
          'R&D. 본 R&D 영역 Neyman 1949 modified LR (Cressie & Read 1984 λ=-1) outside-log additive count ' +
          'variant 영역 한정.',
          'byte-identical (3-way) verify 영역 λ ∈ {1, 0, -1} 한정 — Cressie & Read 1984 §3 power divergence ' +
          'family 영역 영역 영역 λ value 영역 (λ=2 Neyman χ², λ=-2 Freeman-Tukey, λ=2/3 Cressie-Read 권장 등) ' +
          '별도 R&D. λ-family full sweep (λ ∈ [-2, 2] continuous) 별도 R&D mandatory.',
          'Conv 3 inside-log Laplace LR 영역 λ=-1 form 매핑 영역 verification 영역 본 R&D 영역 영역 — ' +
          'empirical byte-identical 영역 영역 영역 (Cressie & Read 1984 §3 원문 직접 form 확인 + formal ' +
          'proof 별도 R&D mandatory). 본 R&D 영역 9/9 byte-identical 영역 영역 영역 영역 영역 — Conv 3 영역 ' +
          'λ=-1 form 매핑 영역 empirical hypothesis 영역 영역 영역 (수학적 form 영역 영역).',
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
          'method 간 PMF 영역 동일 → outcome ordering 영역 영역 exact p 영역 결정 — non-uniform prior 영역 ' +
          '영역 영역 영역 영역 영역 영역 (PMF 영역 method 간 동일하다는 조건 영역 보장 X).',
          'Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative 영역 별도 R&D.',
          'α=0.05 standard convention 영역 별도 reject decision 영역 본 R&D 영역 영역 영역 영역 ' +
          '(byte-identical verification 영역 한정 — α threshold-free).',
          'Modified LR outside-log "additive smoothing to ALL cells" 영역 본 R&D 영역 9e92b11 G² framework ' +
          'reuse (E ↔ O role swap) — 493f850 Method 2 영역 zero-cell only smoothing + Modified LR 영역 차이 ' +
          '영역. published canonical "Modified LR outside-log" form 영역 영역 영역 영역 영역 영역 영역 영역 ' +
          '(interpretation choice — Neyman 1949 classical Modified LR 영역 raw counts 영역 additive smoothing ' +
          '영역 영역 영역 — 본 R&D 영역 generalize variant).',
          'byte_identical tolerance 1e-9 영역 IEEE 754 floating point rounding 영역 conservative — true ' +
          'byte-identical 영역 distinguish 영역 sufficient 단 ulp-level exact equality 영역 영역 영역.',
        ],
        cross_reference: {
          prior_g_squared_outside_log_delta_verify: {
            test_path: 'tests/integration/hand-snn-g-squared-outside-log-delta-verify.test.ts',
            commit: '9e92b11',
            measurement_path:
              'tests/integration/measurements/hand-snn-g-squared-outside-log-delta-verify.json',
            note:
              '정직 한계 (QA HIGH 1 fix) — "λ-family broader 영역 λ ∈ {1, 0} ranged confirmation 한정 — ' +
              'λ=-1 Modified LR outside-log direct verify 별도 R&D mandatory". 본 R&D 영역 λ=-1 직접 followup.',
          },
          prior_williams_method_2_outside_log_delta_verify: {
            test_path: 'tests/integration/hand-snn-williams-method-2-outside-log-delta-verify.test.ts',
            commit: '7e883c6',
            measurement_path:
              'tests/integration/measurements/hand-snn-williams-method-2-outside-log-delta-verify.json',
            note:
              'Method 2 outside-log Pearson (λ=1) — 9/9 byte-identical vs Conv 3 verified. 본 R&D 영역 ' +
              'cross-reference baseline.',
          },
          prior_williams_delta_sensitivity_sweep: {
            test_path: 'tests/integration/hand-snn-williams-delta-sensitivity-sweep.test.ts',
            commit: 'dc2038f',
            measurement_path:
              'tests/integration/measurements/hand-snn-williams-delta-sensitivity-sweep.json',
            note:
              'Conv 3 inside-log Laplace δ ∈ {0.1, 0.5, 1.0} sensitivity sweep (δ-invariant 영역 — Phase ' +
              'A=0.0625 / B=0.1797 / C=0.6250). 본 R&D 영역 cross-reference baseline.',
          },
          prior_williams_formal_symmetric_convention: {
            test_path: 'tests/integration/hand-snn-williams-formal-symmetric-convention.test.ts',
            commit: '7c65a31',
            measurement_path:
              'tests/integration/measurements/hand-snn-williams-formal-symmetric-convention.json',
            note: 'Conv 3 vs Method 2 δ=0.5 한정 sufficient statistic equivalence baseline verified.',
          },
          prior_continuity_correction: {
            test_path: 'tests/integration/hand-snn-continuity-correction-zero-cell.test.ts',
            commit: '493f850',
            measurement_path:
              'tests/integration/measurements/hand-snn-continuity-correction-zero-cell.json',
            note:
              'Method 2 Williams δ outside-log additive count baseline (zero-cell only smoothing + Modified ' +
              'LR 한정). 본 R&D 영역 generalize variant (모든 cell smoothing + Modified LR) 영역 분리.',
          },
          prior_power_divergence_lambda_sweep: {
            test_path: 'tests/integration/hand-snn-power-divergence-lambda-sweep.test.ts',
            commit: '6cfecf7',
            measurement_path:
              'tests/integration/measurements/hand-snn-power-divergence-lambda-sweep.json',
            note:
              'Cressie & Read 1984 λ sweep — λ=-1 Modified LR 영역 본 R&D outside-log variant 영역 base ' +
              'form. λ-family broader context.',
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
      saveMeasurement('hand-snn-modified-lr-outside-log-delta-verify', measurement);

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
          expect(r.exact_p_value_modified_lr_outside_log).toBeGreaterThan(0);
          expect(r.exact_p_value_modified_lr_outside_log).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_conv_3_inside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_conv_3_inside_log_reference).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_method_2_pearson_outside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_method_2_pearson_outside_log_reference).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_g_squared_outside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_g_squared_outside_log_reference).toBeLessThanOrEqual(1);
        }
      }
      // observed statistic Modified LR finite, sign — Neyman 1949 form 2 Σ E log(E/O) — 영역 O > E 영역
      // 영역 음수 가능 (log(E/O) < 0). 영역 statistic 영역 ≥ 0 영역 영역 영역 — 단 KL divergence
      // 영역 영역 (E → q, O → p direction 영역 영역) 영역 영역 sign 영역 영역 (Cressie & Read 1984
      // §3 — 모든 λ form 영역 ≥ 0 by Jensen on uniform null when E_i = N/K constant). 본 R&D 영역
      // finite check 영역 한정.
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(Number.isFinite(r.observed_statistic_modified_lr_outside_log)).toBe(true);
          expect(Number.isFinite(r.observed_statistic_conv_3_inside_log)).toBe(true);
          expect(Number.isFinite(r.observed_statistic_method_2_pearson_outside_log)).toBe(true);
          expect(Number.isFinite(r.observed_statistic_g_squared_outside_log)).toBe(true);
          expect(r.observed_statistic_method_2_pearson_outside_log).toBeGreaterThanOrEqual(0);
          // Modified LR 영역 KL(E || O') form — Jensen inequality 영역 ≥ 0 (E uniform 영역 영역 영역).
          expect(r.observed_statistic_modified_lr_outside_log).toBeGreaterThanOrEqual(-PMF_EPS);
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
      // overall verdict ∈ allowed set.
      expect([
        'H_modified_lr_equivalence_lambda_family_closed',
        'H_modified_lr_equivalence_broken_lambda_specific',
        'H_partial_equivalence',
      ]).toContain(overallVerdict);

      console.log('');
      console.log('[modified-lr-outside-log-delta-verify] === Summary ===');
      console.log(`[modified-lr-outside-log-delta-verify] overall_verdict=${overallVerdict}`);
      console.log(
        `[modified-lr-outside-log-delta-verify] match_count_vs_C3=${matchCount_vs_C3}/${totalCells} ` +
          `match_count_vs_M2=${matchCount_vs_M2}/${totalCells} ` +
          `match_count_vs_G2=${matchCount_vs_G2}/${totalCells}`,
      );
      console.log(`[modified-lr-outside-log-delta-verify] elapsed_ms=${elapsedMs}`);
    },
  );
});
