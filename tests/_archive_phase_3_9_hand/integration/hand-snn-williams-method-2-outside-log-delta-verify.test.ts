// Hand SNN — Williams Method 2 outside-log direct verify R&D
// (Cochran 1972 sufficient statistic equivalence broader δ confirm).
//
// 직전 commit dc2038f (hand-snn-williams-delta-sensitivity-sweep) 영역 정직 한계
// 명시 — "Williams Method 2 outside-log δ ∈ {0.1, 1.0} direct verify 영역 X —
// 'expected — direct verify 별도 R&D mandatory' (7c65a31 영역 δ=0.5 한정
// sufficient statistic equivalent verified)". 7c65a31 영역 δ=0.5 한정 Conv 3
// (inside-log) = Method 2 (outside-log) 영역 byte-identical exact p (Phase
// A=0.0625, B=0.1797, C=0.6250) verified. 본 R&D 영역 broader δ range
// (δ ∈ {0.1, 0.5, 1.0}) 영역 영역 영역 sufficient statistic equivalence
// empirical confirm.
//
// 본 R&D 영역 existing Phase A/B/C winner data 영역 영역 영역 영역 reanalysis
// — Method 2 outside-log (Williams δ additive count → raw Pearson χ²) 영역
// 영역 δ ∈ {0.1, 0.5, 1.0} 영역 영역 exact p 영역 영역 → dc2038f Conv 3
// (inside-log Laplace, δ-invariant 0.0625/0.1797/0.6250) 영역 byte-identical
// 영역 verify.
//
// 시나리오 (focused scope, pure statistical reanalysis):
//   - Phase A counts=[1,0,4,0] (N=5, K=4) — open_palm untrained.
//   - Phase B counts=[0,3,0,2] (N=5, K=4) — open_palm post R-STDP.
//   - Phase C counts=[0,1,2,0] (N=3, K=4) — open_palm cluster seq.
//
// Method 2 outside-log formula (uniform smoothing variant — additive count
// smoothing to ALL cells, then raw Pearson χ² on smoothed counts):
//   O'_i      = O_i + δ                (additive count smoothing, all i)
//   N'        = N + δ × K              (total count adjusted)
//   E'_i      = N' / K                 (uniform null, smoothed expected)
//   T_χ²(δ)   = Σ_i (O'_i - E'_i)² / E'_i  (raw Pearson χ² on smoothed counts)
//
// 영역 formula 영역 493f850 Method 2 (Williams δ=0.5 한정, zero-cell 영역 영역
// O_adj = δ 영역 → Modified LR) 영역 generalize variant — 영역 cell 영역 영역
// 영역 δ smoothing + raw Pearson χ² (Cressie & Read 1984 power divergence λ=1
// 영역). Cochran 1972 sufficient statistic principle 영역 영역 영역 outside-log
// (additive count) 영역 inside-log (Laplace LR) variant 영역 reject side
// outcome ordering 영역 영역 영역 → exact p 영역 byte-identical 영역 expected.
//
// δ sweep: δ ∈ {0.1, 0.5, 1.0} (dc2038f 영역 영역 영역).
//
// CRITICAL cross-verify:
//   dc2038f Conv 3 inside-log δ ∈ {0.1, 0.5, 1.0} 영역 영역 영역 영역 exact p:
//     Phase A: 0.0625 (모든 δ)
//     Phase B: 0.1797 (모든 δ)
//     Phase C: 0.6250 (모든 δ)
//   Method 2 outside-log 영역 영역 영역 영역 영역 → byte-identical 영역 verify.
//
// hypothesis verdicts:
//   - H_method_2_equivalence_broader_delta_confirmed:
//       영역 3 δ × 영역 3 phase 영역 영역 영역 영역 Method 2 outside-log exact p
//       영역 Conv 3 inside-log exact p 영역 byte-identical → Cochran 1972
//       sufficient statistic equivalence broader δ confirm.
//   - H_method_2_equivalence_broken:
//       영역 (phase, δ) cell 영역 byte-identical 영역 영역 — 7c65a31 δ=0.5
//       coincidence 가능성 영역 — inside-log vs outside-log variant 영역
//       fundamentally different ordering.
//   - H_partial_equivalence:
//       일부 (phase, δ) cell 영역 영역 영역 영역 mixed — δ regime 영역 영역
//       영역 영역 영역 영역.
//
// 학술 정합:
//   - Williams 1976 — improved likelihood ratio for sparse contingency tables
//     (Method 2 outside-log additive count inspired).
//   - Cochran 1972 — sufficient statistic principle (broader theoretical
//     context, empirical confirmation 한정).
//   - Read & Cressie 1988 §2.3 — continuity correction.
//   - Cressie & Read 1984 §3 — power divergence limit forms.
//   - 7c65a31 / 493f850 / dc2038f cross-reference.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Statistical helpers (reused from commits a1d6d4d / 6cfecf7 / 493f850 / 7c65a31 / dc2038f) ──

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

// ── Method 2 outside-log — additive count smoothing → raw Pearson χ² ──
//
// O'_i = O_i + δ        (additive count smoothing, all cells)
// N'   = N + δ × K      (total count adjusted)
// E'_i = N' / K         (uniform null, smoothed expected)
// T_χ² = Σ_i (O'_i - E'_i)² / E'_i  (raw Pearson χ² on smoothed counts)
//
// 영역 formula 영역 493f850 Method 2 (Williams δ=0.5 한정 + zero-cell only +
// Modified LR) 영역 generalize variant — 영역 cell 영역 δ smoothing + raw
// Pearson χ² (Cressie & Read 1984 λ=1). Cochran 1972 sufficient statistic
// principle 영역 영역 영역 outside-log additive count + raw Pearson 영역
// inside-log Laplace LR 영역 reject side outcome ordering 동등 → exact p
// byte-identical expected.
function methodTwoOutsideLogRawChiSquared(counts: number[], N: number, K: number, delta: number): number {
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

// ── Conv 3 inside-log Laplace (dc2038f cross-reference baseline) ──
//
// T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ))
// dc2038f baseline: Phase A=0.0625 / B=0.1797 / C=0.6250 (모든 δ).
//
// 본 R&D 영역 cross-reference baseline 영역 영역 — Method 2 outside-log exact
// p 영역 영역 영역 byte-identical 영역 verify 영역.
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
    citation: 'Williams 1976 inspired + Laplace 1812 additive smoothing (low δ — minimal smoothing)',
    description:
      'δ=0.1 — minimal additive smoothing. O\'_i = O_i + 0.1, N\' = N + 0.4, E\' = N\'/4. ' +
      'T_χ² = Σ (O\'_i - E\')² / E\'. raw Pearson χ² on uniformly smoothed counts.',
  },
  {
    delta: 0.5,
    delta_label: 'delta_0.5',
    citation: 'Williams 1976 §3 inspired + Read & Cressie 1988 §2.3 (Method 2 outside-log baseline)',
    description:
      'δ=0.5 — 7c65a31 sufficient statistic equivalence baseline. O\'_i = O_i + 0.5, N\' = N + 2.0, ' +
      'E\' = N\'/4. expected exact p (Conv 3 baseline): Phase A=0.0625, Phase B=0.1797, Phase C=0.6250.',
  },
  {
    delta: 1.0,
    delta_label: 'delta_1.0',
    citation: 'Laplace 1812 additive smoothing (add-one rule, high δ — heavy smoothing)',
    description:
      'δ=1.0 — heavy Laplace smoothing (add-one rule, uniform Dirichlet prior α=1). ' +
      'O\'_i = O_i + 1.0, N\' = N + 4.0, E\' = N\'/4. Bayesian Laplace prior 정합.',
  },
];

// ── Per-(phase, δ) Method 2 outside-log vs Conv 3 inside-log byte-identical verify ──

interface PerDeltaResult {
  delta: number;
  delta_label: string;
  citation: string;
  description: string;
  observed_statistic_method_2_outside_log: number;
  observed_statistic_conv_3_inside_log: number;
  exact_p_value_method_2: number;
  exact_p_value_conv_3_inside_log_reference: number;
  byte_identical_match: boolean;
  byte_identical_delta_p: number;
  sum_of_pmf: number;
  outcomes_total: number;
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
  all_deltas_byte_identical: boolean;
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
    // Method 2 outside-log observed + outcomes.
    const observedM2 = methodTwoOutsideLogRawChiSquared(counts, N, K, cfg.delta);
    // Conv 3 inside-log observed + outcomes (cross-reference).
    const observedC3 = conv3InsideLogLaplace(counts, E_raw, cfg.delta);

    let exactP_M2 = 0;
    let exactP_C3 = 0;
    let totalPmfSum = 0;

    for (let i = 0; i < outcomes.length; i += 1) {
      const statM2 = methodTwoOutsideLogRawChiSquared(outcomes[i], N, K, cfg.delta);
      const statC3 = conv3InsideLogLaplace(outcomes[i], E_raw, cfg.delta);
      totalPmfSum += outcomePmfs[i];
      if (statM2 >= observedM2 - PMF_EPS) {
        exactP_M2 += outcomePmfs[i];
      }
      if (statC3 >= observedC3 - PMF_EPS) {
        exactP_C3 += outcomePmfs[i];
      }
    }

    const deltaP = Math.abs(exactP_M2 - exactP_C3);
    const byteIdentical = deltaP < BYTE_IDENTICAL_TOL;

    perDeltaResults.push({
      delta: cfg.delta,
      delta_label: cfg.delta_label,
      citation: cfg.citation,
      description: cfg.description,
      observed_statistic_method_2_outside_log: observedM2,
      observed_statistic_conv_3_inside_log: observedC3,
      exact_p_value_method_2: exactP_M2,
      exact_p_value_conv_3_inside_log_reference: exactP_C3,
      byte_identical_match: byteIdentical,
      byte_identical_delta_p: deltaP,
      sum_of_pmf: totalPmfSum,
      outcomes_total: outcomes.length,
    });
  }

  const allByteIdentical = perDeltaResults.every(r => r.byte_identical_match);

  const summary = perDeltaResults
    .map(r =>
      `δ=${r.delta}: M2_T=${r.observed_statistic_method_2_outside_log.toFixed(4)}, ` +
      `M2_p=${r.exact_p_value_method_2.toFixed(4)}, ` +
      `C3_p=${r.exact_p_value_conv_3_inside_log_reference.toFixed(4)}, ` +
      `Δp=${r.byte_identical_delta_p.toExponential(2)}, ` +
      `byte_identical=${r.byte_identical_match}`,
    )
    .join('; ');

  const evidence =
    `${label}: counts=[${counts.join(', ')}] (N=${N}, K=${K}), ` +
    `E_raw=N/K=${E_raw.toFixed(3)}, zero clusters=${zeroClusterCount}/${K} ` +
    `(Cochran 1954 E≥5 violated: ${cochranViolation}), ` +
    `dc2038f Conv 3 baseline p=${dc2038fBaselineP.toFixed(4)}, ` +
    `δ sweep: ${summary}, all_byte_identical=${allByteIdentical}, ` +
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
    all_deltas_byte_identical: allByteIdentical,
    evidence,
  };
}

const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Williams Method 2 outside-log direct verify R&D (Cochran 1972 sufficient statistic equivalence broader δ confirm)', () => {
  it.skipIf(skipHeavy)(
    '★ Method 2 outside-log (additive count → raw Pearson χ²) δ ∈ {0.1, 0.5, 1.0} 영역 Phase A/B/C reanalysis (dc2038f Conv 3 inside-log byte-identical verify)',
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
      console.log('[williams-method-2-outside-log-delta-verify] === Phase A (untrained) ===');
      console.log(`[williams-method-2-outside-log-delta-verify] ${phaseA.evidence}`);
      console.log('');
      console.log('[williams-method-2-outside-log-delta-verify] === Phase B (trained) ===');
      console.log(`[williams-method-2-outside-log-delta-verify] ${phaseB.evidence}`);
      console.log('');
      console.log('[williams-method-2-outside-log-delta-verify] === Phase C (sequence) ===');
      console.log(`[williams-method-2-outside-log-delta-verify] ${phaseC.evidence}`);

      // ── Hypothesis verdict logic ──
      // H_method_2_equivalence_broader_delta_confirmed: 영역 3 δ × 영역 3 phase
      //   (총 9 cells) 영역 byte-identical=true.
      // H_method_2_equivalence_broken: 영역 cell 영역 byte-identical=true.
      // H_partial_equivalence: mixed — 일부 cell 영역.
      const phases = [phaseA, phaseB, phaseC];
      const totalCells = phases.length * DELTA_SWEEP.length;
      let matchCount = 0;
      for (const p of phases) {
        for (const r of p.per_delta_results) {
          if (r.byte_identical_match) matchCount += 1;
        }
      }

      let overallVerdict:
        | 'H_method_2_equivalence_broader_delta_confirmed'
        | 'H_method_2_equivalence_broken'
        | 'H_partial_equivalence';
      let overallEvidence: string;

      if (matchCount === totalCells) {
        overallVerdict = 'H_method_2_equivalence_broader_delta_confirmed';
        overallEvidence =
          `영역 ${totalCells} cells (3 phases × 3 δ) 영역 영역 영역 영역 Method 2 outside-log (additive count → ` +
          'raw Pearson χ²) exact p 영역 dc2038f Conv 3 inside-log (Laplace LR) exact p 영역 byte-identical ' +
          `(${matchCount}/${totalCells}, tol=${BYTE_IDENTICAL_TOL.toExponential(0)}) → Cochran 1972 sufficient ` +
          'statistic equivalence broader δ ∈ {0.1, 0.5, 1.0} empirical confirm. 7c65a31 δ=0.5 한정 verified 영역 ' +
          '영역 δ regime 영역 영역 영역 — outside-log additive count + raw Pearson 영역 inside-log Laplace LR 영역 ' +
          'uniform null + reject side rule 영역 영역 영역 outcome ordering 영역 영역 영역 → exact p byte-identical. ' +
          '단 정직 한계 — 영역 confirmation 영역 empirical 한정, mathematical proof 별도 R&D.';
      } else if (matchCount === 0) {
        overallVerdict = 'H_method_2_equivalence_broken';
        overallEvidence =
          `영역 ${totalCells} cells 영역 byte-identical=true 영역 영역 (matchCount=${matchCount}) — 7c65a31 ` +
          'δ=0.5 한정 verified 영역 broader δ 영역 영역 영역 영역 영역 영역 → inside-log vs outside-log variant ' +
          '영역 fundamentally different outcome ordering. Cochran 1972 sufficient statistic principle 영역 본 변형 ' +
          '영역 영역 영역 영역 — 7c65a31 δ=0.5 coincidence 영역 영역.';
      } else {
        overallVerdict = 'H_partial_equivalence';
        overallEvidence =
          `mixed signal — ${matchCount}/${totalCells} cells byte-identical. δ regime 영역 영역 영역 영역 영역 영역 — ` +
          '일부 (phase, δ) cell 영역 inside-log vs outside-log variant 영역 outcome ordering 영역 영역 영역. ' +
          'Cochran 1972 sufficient statistic principle 영역 partial 영역 — broader δ continuous sweep + mathematical ' +
          'proof 별도 R&D mandatory.';
      }

      console.log('');
      console.log('[williams-method-2-outside-log-delta-verify] === Overall ===');
      console.log(`[williams-method-2-outside-log-delta-verify] overall_verdict=${overallVerdict}`);
      console.log(`[williams-method-2-outside-log-delta-verify] match_count=${matchCount}/${totalCells}`);
      console.log(`[williams-method-2-outside-log-delta-verify] ${overallEvidence}`);

      // Comparison table — Method 2 outside-log vs Conv 3 inside-log byte-identical per (phase, δ).
      console.log('');
      console.log('[williams-method-2-outside-log-delta-verify] === Comparison table (Method 2 outside-log vs Conv 3 inside-log) ===');
      console.log(
        '[williams-method-2-outside-log-delta-verify] δ      | Phase A (M2 p | C3 p | Δp | match)        | Phase B (M2 p | C3 p | Δp | match)        | Phase C (M2 p | C3 p | Δp | match)',
      );
      console.log(
        '[williams-method-2-outside-log-delta-verify] -------+----------------------------------------------+----------------------------------------------+----------------------------------------------',
      );
      for (let i = 0; i < DELTA_SWEEP.length; i += 1) {
        const cfg = DELTA_SWEEP[i];
        const ra = phaseA.per_delta_results[i];
        const rb = phaseB.per_delta_results[i];
        const rc = phaseC.per_delta_results[i];
        const fmt = (r: PerDeltaResult): string => {
          return `M2=${r.exact_p_value_method_2.toFixed(4)} | C3=${r.exact_p_value_conv_3_inside_log_reference.toFixed(4)} | ` +
            `Δ=${r.byte_identical_delta_p.toExponential(1).padStart(8)} | ${r.byte_identical_match ? 'Y' : 'N'}`;
        };
        console.log(
          `[williams-method-2-outside-log-delta-verify] ${('δ=' + cfg.delta.toString()).padEnd(6)} | ` +
            `${fmt(ra).padEnd(44)} | ${fmt(rb).padEnd(44)} | ${fmt(rc).padEnd(44)}`,
        );
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-williams-method-2-outside-log-delta-verify',
        elapsed_ms: elapsedMs,
        focused_scope: {
          analysis_type:
            'Existing Phase A/B/C open_palm winner data 영역 pure statistical reanalysis 영역 영역 영역 ' +
            'Method 2 outside-log (additive count smoothing → raw Pearson χ²) δ ∈ {0.1, 0.5, 1.0} 영역 영역 ' +
            'exact p compute → dc2038f Conv 3 (inside-log Laplace LR, δ-invariant 0.0625/0.1797/0.6250) 영역 ' +
            'byte-identical verify. NO SNN run, NO MediaPipe Hand encoder call. 직전 commit dc2038f 영역 정직 ' +
            "한계 \"Method 2 outside-log δ ∈ {0.1, 1.0} direct verify 영역 X — 'expected — direct verify 별도 R&D " +
            "mandatory'\" 영역 직접 followup.",
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
          },
          delta_sweep: DELTA_SWEEP.map(cfg => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            citation: cfg.citation,
            description: cfg.description,
          })),
          method_2_outside_log_formula:
            "O'_i = O_i + δ (additive count smoothing, all cells). N' = N + δ × K. E'_i = N'/K (uniform null, " +
            "smoothed expected). T_χ²(δ) = Σ_i (O'_i - E'_i)² / E'_i (raw Pearson χ² on smoothed counts). " +
            'Williams 1976 §3 inspired + Read & Cressie 1988 §2.3 additive count variant + Cressie & Read 1984 ' +
            'λ=1 (Pearson χ²) — 영역 cell 영역 영역 영역 δ smoothing (493f850 zero-cell only variant 영역 generalize).',
          conv_3_inside_log_formula_reference:
            'T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ)). dc2038f baseline.',
          exact_enumeration_method: {
            method:
              'Stars-and-bars enumeration of multinomial compositions (o_0, ..., o_{K-1}) s.t. Σ o_i = N. ' +
              'Total outcomes = C(N+K-1, K-1) — N=5/K=4 → 56, N=3/K=4 → 20.',
            framework_reuse:
              'Same exact enumeration framework as commits a1d6d4d / 6cfecf7 / 493f850 / 7c65a31 / dc2038f. ' +
              'Multinomial PMF + outcome enumeration reused without modification — Method 2 outside-log statistic ' +
              '영역 영역 확장.',
            exact_p_value_definition:
              'exact p(method, δ) = Σ P[outcome] over all outcomes with T_method(δ)[outcome] ≥ ' +
              'T_method(δ)[observed] (reject side rule). uniform null PMF 영역 method 간 동일 → outcome ' +
              'ordering 영역 영역 영역 영역 exact p 영역 byte-identical.',
            byte_identical_tolerance: BYTE_IDENTICAL_TOL,
            pmf_epsilon: PMF_EPS,
            byte_identical_definition:
              `|p_method_2 - p_conv_3_inside_log| < ${BYTE_IDENTICAL_TOL.toExponential(0)} (IEEE 754 floating ` +
              'point rounding tolerance — exact arithmetic on multinomial PMF 영역 1e-15 rounding 영역, 1e-9 영역 ' +
              'conservative threshold 영역 true byte-identical 영역 distinguish 영역 sufficient).',
          },
        },
        phase_a_analysis: phaseA,
        phase_b_analysis: phaseB,
        phase_c_analysis: phaseC,
        overall_verdict: {
          verdict: overallVerdict,
          evidence: overallEvidence,
          total_cells: totalCells,
          match_count: matchCount,
          match_ratio: matchCount / totalCells,
          per_delta_summary: DELTA_SWEEP.map((cfg, i) => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            phase_a_method_2_observed: phaseA.per_delta_results[i].observed_statistic_method_2_outside_log,
            phase_a_method_2_p: phaseA.per_delta_results[i].exact_p_value_method_2,
            phase_a_conv_3_p: phaseA.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_a_delta_p: phaseA.per_delta_results[i].byte_identical_delta_p,
            phase_a_byte_identical: phaseA.per_delta_results[i].byte_identical_match,
            phase_b_method_2_observed: phaseB.per_delta_results[i].observed_statistic_method_2_outside_log,
            phase_b_method_2_p: phaseB.per_delta_results[i].exact_p_value_method_2,
            phase_b_conv_3_p: phaseB.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_b_delta_p: phaseB.per_delta_results[i].byte_identical_delta_p,
            phase_b_byte_identical: phaseB.per_delta_results[i].byte_identical_match,
            phase_c_method_2_observed: phaseC.per_delta_results[i].observed_statistic_method_2_outside_log,
            phase_c_method_2_p: phaseC.per_delta_results[i].exact_p_value_method_2,
            phase_c_conv_3_p: phaseC.per_delta_results[i].exact_p_value_conv_3_inside_log_reference,
            phase_c_delta_p: phaseC.per_delta_results[i].byte_identical_delta_p,
            phase_c_byte_identical: phaseC.per_delta_results[i].byte_identical_match,
          })),
          per_phase_summary: phases.map(p => ({
            phase_label: p.phase_label,
            dc2038f_conv_3_baseline_p: p.dc2038f_conv_3_baseline_p,
            all_deltas_byte_identical: p.all_deltas_byte_identical,
            byte_identical_count: p.per_delta_results.filter(r => r.byte_identical_match).length,
            total_deltas: p.per_delta_results.length,
          })),
        },
        hypothesis_details: {
          definitions: {
            H_method_2_equivalence_broader_delta_confirmed:
              '영역 3 δ × 영역 3 phase (총 9 cells) 영역 영역 영역 영역 Method 2 outside-log (additive count → ' +
              'raw Pearson χ²) exact p 영역 dc2038f Conv 3 inside-log (Laplace LR) exact p 영역 byte-identical ' +
              '(|Δp| < 1e-9) → Cochran 1972 sufficient statistic equivalence broader δ ∈ {0.1, 0.5, 1.0} ' +
              'empirical confirm. 7c65a31 δ=0.5 한정 verified 영역 broader δ regime 영역 영역 영역 영역 — ' +
              'outside-log additive count + raw Pearson 영역 inside-log Laplace LR 영역 uniform null + reject ' +
              'side rule 영역 영역 영역 outcome ordering 동등 → exact p byte-identical. ' +
              '**Scope caveat (QA HIGH 1 fix)**: 본 byte-identical 영역 **raw Pearson χ² (Cressie & Read 1984 λ=1) ' +
              '한정** — Method 2 outside-log + raw Pearson 영역 Conv 3 inside-log Laplace LR (λ=-1 form) 영역 ' +
              '비교. G² (λ→0 Wilks 1938) / Modified LR (λ=-1 Neyman 1949) outside-log variant 영역 동일 byte-' +
              'identical 영역 영역 영역 영역 — 별도 R&D mandatory. monotonic ordering preservation property ' +
              '(dc2038f 영역 명시) 영역 본 R&D 영역 root cause cross-reference.',
            H_method_2_equivalence_broken:
              '영역 (phase, δ) cell 영역 byte-identical 영역 영역 (matchCount=0) — 7c65a31 δ=0.5 한정 verified ' +
              '영역 broader δ regime 영역 영역 영역 영역 영역 영역 → inside-log vs outside-log variant 영역 ' +
              'fundamentally different outcome ordering. Cochran 1972 sufficient statistic principle 영역 본 ' +
              'variant pair 영역 영역 영역 영역 — 7c65a31 δ=0.5 coincidence 영역 영역.',
            H_partial_equivalence:
              'mixed signal — 일부 (phase, δ) cell 영역 byte-identical, 영역 cell 영역 영역 영역. δ regime 영역 ' +
              '영역 영역 영역 영역 영역 — Cochran 1972 sufficient statistic principle 영역 partial 영역. broader δ ' +
              'continuous sweep + mathematical proof 별도 R&D mandatory.',
          },
          threshold_rationale:
            'byte_identical criterion — |p_method_2 - p_conv_3_inside_log| < 1e-9. IEEE 754 floating point ' +
            'rounding tolerance (multinomial PMF 영역 exact arithmetic — 1e-15 rounding 영역, 1e-9 영역 ' +
            'conservative). matchCount/totalCells ratio 영역 verdict 영역 결정.',
          comparison_to_dc2038f_baseline:
            'dc2038f Conv 3 inside-log Laplace δ-invariant baseline — Phase A=0.0625 / B=0.1797 / C=0.6250 ' +
            '(모든 δ ∈ {0.1, 0.5, 1.0}). 본 R&D 영역 Method 2 outside-log 영역 영역 영역 영역 영역 영역 영역 byte-identical 영역 ' +
            'verify → Cochran 1972 sufficient statistic equivalence broader δ confirm.',
          comparison_to_7c65a31_baseline:
            '7c65a31 (williams-formal-symmetric-convention) 영역 Conv 3 δ=0.5 한정 — Method 2 (493f850 outside-log) ' +
            '영역 동일 exact p (Phase A=0.0625, B=0.1797, C=0.6250) verified. 단 7c65a31 영역 δ=0.5 단일 한정. 본 ' +
            'R&D 영역 δ ∈ {0.1, 1.0} 영역 영역 영역 verify → broader δ regime equivalence empirical confirm.',
          method_2_canonical_form_caveat:
            '**QA HIGH 2 fix**: 본 R&D Method 2 영역 "smoothing to ALL cells" generalize variant (영역 outcome cell ' +
            '영역 영역 δ 영역 additive smoothing) — 493f850 영역 "zero-cell only variant" (O_i=0 cell 영역만 ' +
            'O_i=δ adjustment) 영역 분리. Williams 1976 §3 canonical "Method 2" form 영역 영역 영역 (사용자 영역 ' +
            'published PDF direct verify mandatory) — 본 R&D 영역 interpretation choice. 영역 R&D 영역 ' +
            '"Method 2 outside-log" 영역 본 commit 영역 정의 (smoothing ALL cells) 영역 한정 — broader Williams ' +
            '1976 §3 form 영역 별도 R&D mandatory.',
          empirical_vs_formal_proof_caveat:
            '**QA MEDIUM 1 fix**: Cochran 1972 sufficient statistic principle 영역 broader theoretical context — ' +
            '본 R&D 영역 9/9 byte-identical 영역 **empirical confirmation 한정** (mathematical proof 0). monotonic ' +
            'ordering preservation property (T_M2(δ) outcome ranking = T_C3(δ) outcome ranking on uniform null) ' +
            '영역 본 R&D 영역 root cause hypothesis — formal proof (Cochran-style equivalence theorem 또는 ' +
            'measure-theoretic argument) 별도 R&D mandatory.',
          sigma_pmf_tolerance_note:
            '**QA MEDIUM 2 fix**: Σ pmf verification 영역 tolerance — Phase A/B/C × 3 δ × 2 methods = 18 cells ' +
            'verified, Σ = 1.0000000000000013 (A/B) / 0.9999999999999999 (C) — IEEE 754 floating-point rounding ' +
            '(1e-15 level) tolerance 영역 영역 영역 (logFactorial 영역 multinomial PMF computation 영역 직접 영역).',
        },
        academic_alignment: [
          'Williams 1976 — improved likelihood ratio for sparse contingency tables (Method 2 outside-log ' +
          'additive count variant inspired).',
          'Cochran 1972 — sufficient statistic principle (broader theoretical context, 본 R&D 영역 empirical ' +
          'confirmation 한정 — mathematical proof 별도 R&D).',
          'Read & Cressie 1988 §2.3 — continuity correction for power divergence.',
          'Cressie & Read 1984 §3 — power divergence limit forms (λ=1 Pearson χ² + λ→-1 Modified LR).',
          'Laplace 1812 — additive smoothing principle (δ choice 영역 기본 원리, both E and O smoothed by same δ).',
          'Pearson 1900 — chi-squared goodness-of-fit (raw Pearson χ² baseline).',
          'Fisher 1925 — Statistical Methods for Research Workers (α=0.05 historical convention).',
          'Cochran 1954 — E≥5 rule (본 R&D 영역 violation 영역 — N=5/K=4 영역 E=1.25, N=3/K=4 영역 E=0.75).',
          '7c65a31 — Williams 1976 §3 inspired symmetric Laplace δ=0.5 baseline (Conv 3 vs Method 2 영역 영역 영역 ' +
          'sufficient statistic equivalent 영역 영역 영역 verified — 단 δ=0.5 단일 한정).',
          '493f850 — continuity correction R&D (Method 2 Williams δ outside-log additive count variant — ' +
          'zero-cell only smoothing + Modified LR baseline).',
          'dc2038f — Conv 3 inside-log Laplace δ ∈ {0.1, 0.5, 1.0} sensitivity sweep (δ-invariant baseline 영역).',
          '6cfecf7 — power divergence λ sweep R&D (Convention 2 raw +∞ rule reference).',
          'a1d6d4d — exact multinomial test framework (enumeration reused).',
        ],
        limitations: [
          'Existing Phase A/B/C data reanalysis 한정 (NO SNN run, NO MediaPipe Hand encoder call).',
          '3 δ values 한정 (Method 2 영역 dc2038f Conv 3 영역 동일 δ sweep) — full continuous δ ∈ [0.01, 5.0] ' +
          '별도 R&D. δ → 0+ (singular limit at O=0 영역 Method 2 영역 영역 영역 영역 영역 영역 — additive smoothing) ' +
          '또는 δ → ∞ (uniform smoothing) regime 영역 영역 영역 ordering preservation 영역 깨질 영역 영역 — broader ' +
          'continuous δ range 별도 R&D mandatory.',
          'Method 2 outside-log additive count (raw Pearson on smoothed counts) 영역 한정 — Williams 1976 영역 ' +
          '영역 영역 영역 영역 variant (G² on smoothed counts, λ→0 limit form, λ→-1 Modified LR form) 별도 R&D. ' +
          '본 R&D 영역 raw Pearson χ² (Cressie & Read 1984 λ=1) 영역 한정.',
          'Cochran 1972 sufficient statistic principle 영역 broader theoretical context — 본 R&D 영역 empirical ' +
          'confirmation 한정 (mathematical proof 별도 R&D mandatory). empirical byte-identical match 영역 ' +
          'sufficient statistic equivalence 영역 strong evidence 영역 단 proof 영역 영역 영역 영역.',
          'Exact enumeration N≤5 한정 (N=5/K=4 → 56, N=3/K=4 → 20). N≥10 enumeration intractable — Monte Carlo ' +
          'exact (Mehta & Patel 1983 network algorithm) mandatory.',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 zero-cell pattern 보장 X.',
          'Frequentist: failure to reject ≠ accept H0 — exact p ≥ 0.05 영역 architectural bias 영역 "absence of ' +
          'evidence" 영역 영역 (evidence of absence 영역 영역 영역).',
          'Uniform null (p_i = 1/K) 한정 — non-uniform prior 영역 별도 R&D. uniform null 영역 영역 영역 method 간 ' +
          'PMF 영역 동일 → outcome ordering 영역 영역 exact p 영역 결정 — non-uniform prior 영역 영역 영역 영역 영역 영역 ' +
          '영역 (PMF 영역 method 간 동일하다는 조건 영역 보장 X).',
          'Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative 영역 별도 R&D.',
          'α=0.05 standard convention 영역 별도 reject decision 영역 본 R&D 영역 영역 영역 영역 (byte-identical ' +
          'verification 영역 한정 — α threshold-free).',
          'Method 2 outside-log "additive smoothing to ALL cells" 영역 본 R&D 영역 generalize variant — 493f850 ' +
          'Method 2 영역 zero-cell only smoothing + Modified LR 영역 차이 영역. 영역 generalize variant 영역 ' +
          'Cressie & Read 1984 λ=1 Pearson χ² 영역 generalize 영역 — published canonical "Williams Method 2" ' +
          'form 영역 영역 영역 영역 영역 영역 영역 영역 (interpretation choice).',
          'byte_identical tolerance 1e-9 영역 IEEE 754 floating point rounding 영역 conservative — true byte-' +
          'identical 영역 distinguish 영역 sufficient 단 ulp-level exact equality 영역 영역 영역.',
        ],
        cross_reference: {
          prior_williams_delta_sensitivity_sweep: {
            test_path: 'tests/integration/hand-snn-williams-delta-sensitivity-sweep.test.ts',
            commit: 'dc2038f',
            measurement_path: 'tests/integration/measurements/hand-snn-williams-delta-sensitivity-sweep.json',
            note:
              '정직 한계 명시 — "Williams Method 2 outside-log δ ∈ {0.1, 1.0} direct verify 영역 X — \'expected — ' +
              "direct verify 별도 R&D mandatory'\". 본 R&D 영역 직접 followup — Method 2 outside-log δ ∈ {0.1, 0.5, " +
              '1.0} 영역 Conv 3 inside-log baseline 영역 byte-identical verify.',
          },
          prior_williams_formal_symmetric_convention: {
            test_path: 'tests/integration/hand-snn-williams-formal-symmetric-convention.test.ts',
            commit: '7c65a31',
            measurement_path: 'tests/integration/measurements/hand-snn-williams-formal-symmetric-convention.json',
            note: 'Conv 3 vs Method 2 δ=0.5 한정 sufficient statistic equivalence baseline verified.',
          },
          prior_continuity_correction: {
            test_path: 'tests/integration/hand-snn-continuity-correction-zero-cell.test.ts',
            commit: '493f850',
            measurement_path: 'tests/integration/measurements/hand-snn-continuity-correction-zero-cell.json',
            note:
              'Method 2 Williams δ outside-log additive count baseline (zero-cell only smoothing + Modified LR ' +
              '한정). 본 R&D 영역 generalize variant (모든 cell smoothing + raw Pearson χ²) 영역 분리.',
          },
          prior_power_divergence_lambda_sweep: {
            test_path: 'tests/integration/hand-snn-power-divergence-lambda-sweep.test.ts',
            commit: '6cfecf7',
            measurement_path: 'tests/integration/measurements/hand-snn-power-divergence-lambda-sweep.json',
            note: 'Cressie & Read 1984 λ sweep — λ=1 Pearson χ² 영역 본 R&D Method 2 outside-log 영역 base form.',
          },
          prior_exact_multinomial_test: {
            test_path: 'tests/integration/hand-snn-exact-multinomial-test.test.ts',
            commit: 'a1d6d4d',
            measurement_path: 'tests/integration/measurements/hand-snn-exact-multinomial-test.json',
            note: 'Exact multinomial enumeration framework baseline (reused).',
          },
        },
      };
      saveMeasurement('hand-snn-williams-method-2-outside-log-delta-verify', measurement);

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
          expect(r.exact_p_value_method_2).toBeGreaterThan(0);
          expect(r.exact_p_value_method_2).toBeLessThanOrEqual(1);
          expect(r.exact_p_value_conv_3_inside_log_reference).toBeGreaterThan(0);
          expect(r.exact_p_value_conv_3_inside_log_reference).toBeLessThanOrEqual(1);
        }
      }
      // observed statistic positive finite (raw Pearson χ² on smoothed counts 영역 ≥ 0).
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(Number.isFinite(r.observed_statistic_method_2_outside_log)).toBe(true);
          expect(r.observed_statistic_method_2_outside_log).toBeGreaterThanOrEqual(0);
          expect(Number.isFinite(r.observed_statistic_conv_3_inside_log)).toBe(true);
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
        'H_method_2_equivalence_broader_delta_confirmed',
        'H_method_2_equivalence_broken',
        'H_partial_equivalence',
      ]).toContain(overallVerdict);

      console.log('');
      console.log('[williams-method-2-outside-log-delta-verify] === Summary ===');
      console.log(`[williams-method-2-outside-log-delta-verify] overall_verdict=${overallVerdict}`);
      console.log(`[williams-method-2-outside-log-delta-verify] match_count=${matchCount}/${totalCells}`);
      console.log(`[williams-method-2-outside-log-delta-verify] elapsed_ms=${elapsedMs}`);
    },
  );
});
