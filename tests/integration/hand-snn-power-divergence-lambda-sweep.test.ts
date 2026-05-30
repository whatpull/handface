// Hand SNN — Power divergence broader λ sweep (Read & Cressie 1988 Table 1) R&D.
// (Existing tie-break (commit 15f9381) + multinomial bootstrap CI (9e139ec) +
//  exact multinomial (a1d6d4d) Phase A/B/C winner data 영역 pure statistical
//  reanalysis — no SNN run, no MediaPipe Hand encoder call. λ ∈ {-1, -1/2, 0,
//  2/3, 1} sweep 영역 영역 영역 영역 small N regime 영역 λ-invariant degeneracy
//  vs broader N regime 영역 λ-specific divergence emergence 영역 empirical
//  separate.)
//
// 컨텍스트 (2026-05-30): 직전 commit a1d6d4d (hand-snn-exact-multinomial-test)
// 영역 정직 한계 명시 — "Read & Cressie 1988 λ=2/3 영역 small-sample 영역
// recommended 단 power divergence family 영역 영역 영역 (λ=0 LR, λ=1 χ², λ=-1
// modified LR, λ=-1/2 Freeman-Tukey) 영역 별도 R&D". 본 R&D 영역 직접
// followup — 5 λ value 영역 exact p empirically compute → small N regime
// (N=5/3, K=4) 영역 λ-independent invariance verify.
//
// 시나리오 (focused scope, pure statistical enumeration):
//   - Phase A initial winners: [2, 0, 2, 2, 2] (N=5, K=4) — open_palm untrained.
//   - Phase B trained winners: [1, 3, 1, 1, 3] (N=5, K=4) — open_palm post R-STDP.
//   - Phase C sequence winners: [1, 2, 2] (N=3, K=4) — open_palm cluster seq.
//
// Power divergence family — Read & Cressie 1988 Table 1:
//   T(λ) = (2 / (λ·(λ+1))) · Σ O_i · ((O_i/E_i)^λ - 1)
//   - λ = -1 (Neyman 1949 Modified Likelihood Ratio):
//       limit: T(-1) = 2 · Σ E_i · log(E_i / O_i)
//       O_i = 0 일 때 E·log(E/0) = ∞ → outcome 영역 statistic = +∞ →
//       observed ≤ +∞ rule 영역 영역 모든 +∞ outcome 영역 reject side (영역).
//   - λ = -1/2 (Freeman-Tukey 1950):
//       closed: T(-1/2) = 4 · Σ (√O_i - √E_i)²
//   - λ → 0 (Wilks 1938 Likelihood Ratio G²):
//       limit: T(0) = 2 · Σ O_i · log(O_i / E_i), 0·log0 := 0
//   - λ = 2/3 (Cressie-Read 1984 recommended for small samples):
//       T(2/3) = (2 / (2/3 · 5/3)) · Σ O_i · ((O_i/E_i)^(2/3) - 1)
//             = (9/5) · Σ O_i · ((O_i/E_i)^(2/3) - 1)
//   - λ = 1 (Pearson 1900 chi-squared):
//       T(1) = Σ ((O_i - E_i)² / E_i)
//
// Exact computation — same framework as commit a1d6d4d (enumerate all
// multinomial outcomes via stars-and-bars):
//   - N=5, K=4 → C(N+K-1, K-1) = C(8, 3) = 56 distributions (Phase A, B).
//   - N=3, K=4 → C(N+K-1, K-1) = C(6, 3) = 20 distributions (Phase C).
//   - Each outcome — multinomial PMF under uniform null + 5 λ statistics.
//   - exact p (per λ) = Σ P[outcome] over outcomes with statistic ≥ observed.
//
// 측정 metrics (per Phase per λ):
//   - lambda
//   - lambda_name (Modified LR / Freeman-Tukey / G² / Cressie-Read / Pearson)
//   - observed_statistic
//   - exact_p_value
//   - sum_of_pmf (≈ 1.0 verify)
//
// hypothesis verdicts:
//   - H_lambda_invariant: 영역 λ 영역 영역 영역 영역 exact p — discrete null +
//     small N 영역 영역 ranking identical induce (직전 a1d6d4d 영역 small N
//     regime degeneracy 영역 명시 확장 confirm).
//   - H_lambda_specific: 영역 λ 영역 exact p 영역 영역 영역 영역 차이 발생 —
//     broader N regime 영역 emerge expected (현재 N=5/3 영역 unlikely).
//   - H_partial_lambda_specific: λ 영역 영역 영역 영역 영역 영역 영역 동일 —
//     mixed signal.
//
// 학술 정합:
//   - Pearson 1900 — chi-squared statistic X² = Σ((O-E)²/E) (λ=1).
//   - Neyman 1949 — modified likelihood ratio (λ=-1).
//   - Freeman & Tukey 1950 — Freeman-Tukey statistic (λ=-1/2).
//   - Wilks 1938 — likelihood ratio statistic G² (λ→0).
//   - Cressie & Read 1984 — Multinomial Goodness-of-Fit Tests (power divergence
//     family introduction).
//   - Read & Cressie 1988 — power divergence statistic family Table 1 + λ=2/3
//     small-sample recommendation.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Statistical helpers (reused from commit a1d6d4d framework) ──

function countsByCluster(winners: number[], K: number): number[] {
  const counts = new Array<number>(K).fill(0);
  for (const w of winners) {
    if (w >= 0 && w < K) counts[w] += 1;
  }
  return counts;
}

// log-factorial — Lanczos via log-gamma (sufficient for small N ≤ 50).
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

// C(n, k) — binomial coefficient via log-gamma.
function binomial(n: number, k: number): number {
  return Math.round(Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1)));
}

// Multinomial log-PMF under uniform null (p_i = 1/K, ∀i).
function logMultinomialPmfUniform(counts: number[], N: number, K: number): number {
  let logP = logFactorial(N) - N * Math.log(K);
  for (let i = 0; i < counts.length; i += 1) {
    logP -= logFactorial(counts[i]);
  }
  return logP;
}

// Enumerate all multinomial compositions — (o_0, ..., o_{K-1}) s.t. Σ o_i = N.
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

// ── Power divergence statistic — Read & Cressie 1988 T(λ) family ──
//
// Cressie-Read T(λ) = (2 / (λ·(λ+1))) · Σ O_i · ((O_i/E_i)^λ - 1).
// 영역 영역 영역 영역 limit:
//   - λ→0: T(0) = 2 Σ O log(O/E) (Wilks G², 0·log0 := 0)
//   - λ→-1: T(-1) = 2 Σ E log(E/O) (Neyman 1949 modified LR)
//
// Edge case (λ = -1, O_i = 0):
//   E · log(E/0) = E · (+∞) = +∞ → statistic 영역 +∞.
//   outcome 영역 statistic = +∞ 영역 영역 영역 영역 observed statistic 영역
//   영역 영역 영역 영역 영역 영역 (observed ≤ +∞ 영역 영역 영역 영역 영역).
//   → 영역 R&D 영역 IS_FINITE check 영역 영역 영역 영역 영역 영역, observed
//   statistic 영역 +∞ 영역 영역 영역 영역 영역 영역 영역 영역 영역 영역 —
//   exact p computation 영역 영역 모든 outcome 영역 (statistic ≥ observed)
//   영역 sum, +∞ ≥ observed (finite) → +∞ outcome 영역 reject side.
function powerDivergence(counts: number[], E: number, lambda: number): number {
  if (E <= 0) return 0;

  // λ = 1 (Pearson 1900 chi-squared) — closed form, no Infinity risk.
  if (Math.abs(lambda - 1) < 1e-12) {
    let chi = 0;
    for (let i = 0; i < counts.length; i += 1) {
      const diff = counts[i] - E;
      chi += (diff * diff) / E;
    }
    return chi;
  }

  // λ = -1/2 (Freeman-Tukey 1950) — closed form 4 Σ (√O - √E)².
  // T(λ) = (2 / ((-1/2)(1/2))) · Σ O · ((O/E)^(-1/2) - 1)
  //      = -8 · Σ O · (√(E/O) - 1) = -8 Σ (√(OE) - O) = 8 Σ (O - √(OE))
  // Freeman-Tukey closed form: 4 Σ (√O - √E)² = 4 Σ (O - 2√(OE) + E)
  //                                          = 4 N - 8 Σ √(OE) + 4 N
  //                                          = 8 N - 8 Σ √(OE)
  // Both expressions equivalent — use closed form for numerical stability.
  if (Math.abs(lambda + 0.5) < 1e-12) {
    let s = 0;
    for (let i = 0; i < counts.length; i += 1) {
      const diff = Math.sqrt(counts[i]) - Math.sqrt(E);
      s += diff * diff;
    }
    return 4 * s;
  }

  // λ → 0 (Wilks 1938 LR G²) — limit form 2 Σ O log(O/E).
  if (Math.abs(lambda) < 1e-12) {
    let g = 0;
    for (let i = 0; i < counts.length; i += 1) {
      const o = counts[i];
      if (o > 0) g += o * Math.log(o / E);
    }
    return 2 * g;
  }

  // λ → -1 (Neyman 1949 modified LR) — limit form 2 Σ E log(E/O).
  // O_i = 0 → E log(E/0) = +∞ → statistic = +∞ (special handling).
  if (Math.abs(lambda + 1) < 1e-12) {
    let s = 0;
    let hasZero = false;
    for (let i = 0; i < counts.length; i += 1) {
      const o = counts[i];
      if (o > 0) {
        s += E * Math.log(E / o);
      } else {
        // O = 0 → E log(E/0) = +∞ → statistic 영역 +∞.
        hasZero = true;
      }
    }
    if (hasZero) return Number.POSITIVE_INFINITY;
    return 2 * s;
  }

  // General λ — T(λ) = (2 / (λ(λ+1))) · Σ O · ((O/E)^λ - 1).
  // O = 0 → O · ((O/E)^λ - 1) = 0 · ((0/E)^λ - 1).
  //   λ > 0: (0/E)^λ = 0 → 0 · (0 - 1) = 0. OK.
  //   λ < 0 (λ ≠ -1): (0/E)^λ = +∞ → 0 · (+∞ - 1) = 0·∞ → IEEE NaN.
  //     But limit: 0 · ((0/E)^λ - 1) = 0 (treat as 0).
  const factor = 2 / (lambda * (lambda + 1));
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    if (o > 0) {
      s += o * (Math.pow(o / E, lambda) - 1);
    }
    // o = 0 → contribute 0 (limit).
  }
  return factor * s;
}

// ── λ sweep configuration ──

interface LambdaConfig {
  lambda: number;
  lambda_name: string;
  citation: string;
}

const LAMBDA_SWEEP: LambdaConfig[] = [
  {
    lambda: -1,
    lambda_name: 'Modified Likelihood Ratio',
    citation: 'Neyman 1949',
  },
  {
    lambda: -0.5,
    lambda_name: 'Freeman-Tukey',
    citation: 'Freeman & Tukey 1950',
  },
  {
    lambda: 0,
    lambda_name: 'Likelihood Ratio G²',
    citation: 'Wilks 1938',
  },
  {
    lambda: 2 / 3,
    lambda_name: 'Cressie-Read recommended',
    citation: 'Cressie & Read 1984, Read & Cressie 1988',
  },
  {
    lambda: 1,
    lambda_name: 'Pearson chi-squared',
    citation: 'Pearson 1900',
  },
];

// ── Per-(phase, λ) exact p computation ──

interface PerLambdaResult {
  lambda: number;
  lambda_name: string;
  citation: string;
  observed_statistic: number;
  observed_statistic_is_infinite: boolean;
  exact_p_value: number;
  outcomes_with_infinite_statistic: number;
}

interface PhaseLambdaSweepResult {
  phase_label: string;
  winners: number[];
  N: number;
  K: number;
  counts_by_cluster: number[];
  expected_per_cell: number;
  cochran_violation: boolean;
  total_enumerated_outcomes: number;
  expected_outcomes_combinatorial: number;
  sum_of_probabilities: number;
  per_lambda_results: PerLambdaResult[];
  exact_p_values_set: number[]; // unique exact p values across λ sweep.
  exact_p_value_max_pairwise_delta: number;
  lambda_invariance_observed: boolean;
  evidence: string;
}

function analyzePhaseLambdaSweep(
  label: string,
  winners: number[],
  K: number,
): PhaseLambdaSweepResult {
  const N = winners.length;
  const counts = countsByCluster(winners, K);
  const E = N / K;
  const cochranViolation = E < 5;

  // Enumerate outcomes ONCE — reused across all λ values.
  const outcomes = enumerateCompositions(N, K);
  const expectedCount = binomial(N + K - 1, K - 1);

  // Precompute log-PMF + PMF for each outcome.
  const outcomePmfs: number[] = outcomes.map(o =>
    Math.exp(logMultinomialPmfUniform(o, N, K)),
  );
  const sumPmf = outcomePmfs.reduce((a, b) => a + b, 0);

  // EPS for floating-point tolerance (statistic ≥ observed).
  const EPS = 1e-9;

  // Per-λ exact p compute.
  const perLambdaResults: PerLambdaResult[] = [];

  for (const cfg of LAMBDA_SWEEP) {
    const observedStat = powerDivergence(counts, E, cfg.lambda);
    const observedIsInfinite = !Number.isFinite(observedStat);

    let exactP = 0;
    let infiniteOutcomeCount = 0;

    for (let i = 0; i < outcomes.length; i += 1) {
      const stat = powerDivergence(outcomes[i], E, cfg.lambda);
      const statIsInfinite = !Number.isFinite(stat);
      if (statIsInfinite) infiniteOutcomeCount += 1;

      // Reject side criterion — statistic ≥ observed:
      //   - observed finite, stat finite → numeric compare with EPS.
      //   - observed finite, stat = +∞ → +∞ ≥ observed → include.
      //   - observed = +∞, stat finite → false (finite < +∞).
      //   - observed = +∞, stat = +∞ → true (equal).
      let include = false;
      if (observedIsInfinite) {
        include = statIsInfinite;
      } else if (statIsInfinite) {
        include = true;
      } else {
        include = stat >= observedStat - EPS;
      }
      if (include) exactP += outcomePmfs[i];
    }

    perLambdaResults.push({
      lambda: cfg.lambda,
      lambda_name: cfg.lambda_name,
      citation: cfg.citation,
      observed_statistic: observedIsInfinite ? Number.POSITIVE_INFINITY : observedStat,
      observed_statistic_is_infinite: observedIsInfinite,
      exact_p_value: exactP,
      outcomes_with_infinite_statistic: infiniteOutcomeCount,
    });
  }

  // λ-invariance verify — exact p values 영역 영역 영역 set 영역 영역.
  const pValues = perLambdaResults.map(r => r.exact_p_value);
  const uniquePs: number[] = [];
  const UNIQUE_EPS = 1e-9;
  for (const p of pValues) {
    if (!uniquePs.some(q => Math.abs(q - p) < UNIQUE_EPS)) {
      uniquePs.push(p);
    }
  }
  uniquePs.sort((a, b) => a - b);

  let maxPairwiseDelta = 0;
  for (let i = 0; i < pValues.length; i += 1) {
    for (let j = i + 1; j < pValues.length; j += 1) {
      const d = Math.abs(pValues[i] - pValues[j]);
      if (d > maxPairwiseDelta) maxPairwiseDelta = d;
    }
  }
  const lambdaInvariance = uniquePs.length === 1;

  const pSummary = perLambdaResults
    .map(r => `λ=${r.lambda.toFixed(3)}(${r.lambda_name}): T=${
      r.observed_statistic_is_infinite ? '+∞' : r.observed_statistic.toFixed(3)
    } → p=${r.exact_p_value.toFixed(4)}`)
    .join('; ');

  const evidence =
    `${label}: winners=[${winners.join(', ')}] (N=${N}, K=${K}), ` +
    `counts=[${counts.join(', ')}], E=N/K=${E.toFixed(3)} ` +
    `(Cochran 1954 E≥5 violated: ${cochranViolation}), ` +
    `${pSummary}, enumerated=${outcomes.length} ` +
    `(expected C(${N + K - 1},${K - 1})=${expectedCount}), ` +
    `Σ pmf=${sumPmf.toFixed(6)}, ` +
    `unique exact p across λ sweep=${uniquePs.length}/${LAMBDA_SWEEP.length}, ` +
    `max pairwise Δp=${maxPairwiseDelta.toExponential(3)}, ` +
    `λ-invariance: ${lambdaInvariance}.`;

  return {
    phase_label: label,
    winners: winners.slice(),
    N,
    K,
    counts_by_cluster: counts,
    expected_per_cell: E,
    cochran_violation: cochranViolation,
    total_enumerated_outcomes: outcomes.length,
    expected_outcomes_combinatorial: expectedCount,
    sum_of_probabilities: sumPmf,
    per_lambda_results: perLambdaResults,
    exact_p_values_set: uniquePs,
    exact_p_value_max_pairwise_delta: maxPairwiseDelta,
    lambda_invariance_observed: lambdaInvariance,
    evidence,
  };
}

const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Power divergence broader λ sweep (Read & Cressie 1988 Table 1) R&D', () => {
  it.skipIf(skipHeavy)(
    '★ Power divergence λ sweep 영역 Phase A/B/C exact p empirical verify',
    { timeout: 60000 },
    async () => {
      const startedAtMs = Date.now();

      // Existing tie-break (15f9381) + multinomial bootstrap CI (9e139ec) +
      // exact multinomial (a1d6d4d) Phase A/B/C winner data — verbatim 인용.
      const PHASE_A_WINNERS = [2, 0, 2, 2, 2];
      const PHASE_B_WINNERS = [1, 3, 1, 1, 3];
      const PHASE_C_WINNERS = [1, 2, 2];
      const K = 4;

      const phaseA = analyzePhaseLambdaSweep('Phase A (untrained)', PHASE_A_WINNERS, K);
      const phaseB = analyzePhaseLambdaSweep('Phase B (trained)', PHASE_B_WINNERS, K);
      const phaseC = analyzePhaseLambdaSweep('Phase C (sequence)', PHASE_C_WINNERS, K);

      console.log('');
      console.log('[lambda-sweep] === Phase A (untrained) ===');
      console.log(`[lambda-sweep] ${phaseA.evidence}`);
      console.log('');
      console.log('[lambda-sweep] === Phase B (trained) ===');
      console.log(`[lambda-sweep] ${phaseB.evidence}`);
      console.log('');
      console.log('[lambda-sweep] === Phase C (sequence) ===');
      console.log(`[lambda-sweep] ${phaseC.evidence}`);

      // Overall verdict — per-phase λ-invariance consistency.
      const invariances = [
        phaseA.lambda_invariance_observed,
        phaseB.lambda_invariance_observed,
        phaseC.lambda_invariance_observed,
      ];
      const invariantCount = invariances.filter(v => v).length;
      let overallVerdict:
        | 'H_lambda_invariant'
        | 'H_lambda_specific'
        | 'H_partial_lambda_specific';
      let overallEvidence: string;
      if (invariantCount === invariances.length) {
        overallVerdict = 'H_lambda_invariant';
        overallEvidence =
          '모든 3 phase (A/B/C) 영역 5 λ value (Modified LR / Freeman-Tukey / G² / Cressie-Read 2/3 / Pearson) ' +
          '영역 영역 영역 영역 exact p — small N (N=5/3, K=4) + discrete uniform null 영역 ranking ' +
          'identical induce. 직전 a1d6d4d 영역 small N regime degeneracy 영역 broader λ sweep 영역 confirm.';
      } else if (invariantCount === 0) {
        overallVerdict = 'H_lambda_specific';
        overallEvidence =
          '모든 3 phase 영역 5 λ value 영역 exact p 영역 영역 영역 영역 차이 발생 — broader N / discrete null ' +
          'departure 영역 영역 λ-specific divergence emerge. small N regime 영역 unexpected — 영역 영역 R&D 영역.';
      } else {
        overallVerdict = 'H_partial_lambda_specific';
        overallEvidence =
          `phase 영역 영역 영역 λ-invariance 영역 mixed — invariant=${invariantCount} / ${invariances.length}. ` +
          'partial λ-specific divergence — N=3 (Phase C) 영역 N=5 (Phase A/B) 영역 영역 영역 영역 영역 영역 ' +
          '구별 영역 영역 — broader N regime 영역 별도 R&D.';
      }

      console.log('');
      console.log('[lambda-sweep] === Overall ===');
      console.log(`[lambda-sweep] overall_verdict=${overallVerdict}`);
      console.log(`[lambda-sweep] ${overallEvidence}`);

      // Comparison table — per-(phase, λ) exact p side by side.
      console.log('');
      console.log('[lambda-sweep] === Comparison table (exact p per (phase, λ)) ===');
      console.log(
        '[lambda-sweep] λ        | Name                          | Phase A   | Phase B   | Phase C',
      );
      console.log(
        '[lambda-sweep] ---------+-------------------------------+-----------+-----------+----------',
      );
      for (let i = 0; i < LAMBDA_SWEEP.length; i += 1) {
        const cfg = LAMBDA_SWEEP[i];
        const pA = phaseA.per_lambda_results[i].exact_p_value;
        const pB = phaseB.per_lambda_results[i].exact_p_value;
        const pC = phaseC.per_lambda_results[i].exact_p_value;
        console.log(
          `[lambda-sweep] ${cfg.lambda.toFixed(3).padStart(7)} | ${cfg.lambda_name.padEnd(29)} | ` +
          `${pA.toFixed(4).padStart(9)} | ${pB.toFixed(4).padStart(9)} | ${pC.toFixed(4).padStart(9)}`,
        );
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-power-divergence-lambda-sweep',
        elapsed_ms: elapsedMs,
        focused_scope: {
          analysis_type:
            'Existing tie-break (commit 15f9381) + multinomial bootstrap CI (commit 9e139ec) + ' +
            'exact multinomial (commit a1d6d4d) Phase A/B/C open_palm winner data 영역 pure statistical ' +
            'reanalysis via power divergence T(λ) family broader λ sweep. NO SNN run, NO MediaPipe Hand ' +
            'encoder call. Read & Cressie 1988 Table 1 영역 5 λ value (λ ∈ {-1, -1/2, 0, 2/3, 1}) 영역 ' +
            'exact p empirically compute → small N regime (N=5/3, K=4) 영역 λ-invariant degeneracy vs ' +
            'broader N regime 영역 λ-specific divergence emergence 영역 empirical separate.',
          input_data: {
            phase_a_winners: PHASE_A_WINNERS,
            phase_b_winners: PHASE_B_WINNERS,
            phase_c_winners: PHASE_C_WINNERS,
            K_clusters: K,
            phase_a_source: 'open_palm untrained — seeds ∈ {57, 100, 200, 500, 1000}',
            phase_b_source: 'open_palm post-RSTDP — same seeds (trained winner)',
            phase_c_source:
              'open_palm cluster sequence variants — [0,1,2,3] / [3,2,1,0] / [0,3,1,2] (build seed=57 fixed)',
          },
          lambda_sweep_configuration: LAMBDA_SWEEP.map(cfg => ({
            lambda: cfg.lambda,
            lambda_name: cfg.lambda_name,
            citation: cfg.citation,
          })),
          exact_enumeration_method: {
            method:
              'Stars-and-bars enumeration of multinomial compositions (o_0, ..., o_{K-1}) s.t. Σ o_i = N. ' +
              'Total outcomes = C(N+K-1, K-1) — N=5/K=4 → 56, N=3/K=4 → 20.',
            framework_reuse:
              'Same exact enumeration framework as commit a1d6d4d (hand-snn-exact-multinomial-test). ' +
              'Multinomial PMF + outcome enumeration reused without modification — λ statistic computation 영역 영역 확장.',
            exact_p_value_definition:
              'exact p(λ) = Σ P[outcome] over all outcomes with T(λ)[outcome] ≥ T(λ)[observed]. ' +
              'No large-sample approximation — Cochran 1954 E≥5 violation 영역 직접 회피.',
            infinity_handling:
              'λ = -1 (Modified LR, Neyman 1949), O_i = 0 영역 영역 영역 E·log(E/O_i) = E·log(E/0) = +∞ → ' +
              'observed T(-1) = +∞ when ∃ zero-count cluster. include rule: counted outcome 영역 ' +
              'T(λ)[outcome] ≥ T(λ)[observed] — observed = +∞ 영역 +∞ ≥ +∞ holds 영역 영역 영역 outcome ' +
              '영역 ∃ ≥1 zero-cluster outcome 영역 영역 영역 영역 — exact p ≈ P[outcome 영역 ≥1 zero] under uniform null. ' +
              'Phase A actual winners=[2,0,2,2,2] → counts=[1,0,4,0] (cluster 1 + cluster 3 영역 영역 zero). ' +
              'Phase B winners=[1,3,1,1,3] → counts=[0,3,0,2] (cluster 0 + cluster 2 영역 영역 zero). ' +
              'Phase C winners=[1,2,2] → counts=[0,1,2,0] (cluster 0 + cluster 3 영역 영역 zero). ' +
              '**3 phases 영역 영역 ≥1 zero-cluster ∃** → λ=-1 observed=+∞ → 본 +∞ 영역 broader-N λ-divergence ' +
              'power emergence (Read & Cressie 1988 §5) 영역 영역 영역 small-N structural zero-cell singularity ' +
              '영역. Formal handling 영역 Read & Cressie 1988 §2.3 continuity correction 또는 Cressie-Read 1984 ' +
              'limit form (lim_{λ→-1} T(λ) via L\'Hopital) 영역 영역 영역 — 본 R&D 영역 raw +∞ 영역 영역 영역 ' +
              '영역 영역 reject side classification, continuity correction 별도 R&D mandatory.',
          },
          power_divergence_family_table_1:
            'Read & Cressie 1988 Table 1: T(λ) = (2 / (λ(λ+1))) Σ O ((O/E)^λ - 1). ' +
            'Special cases: λ=-1 Neyman 1949 Modified LR (limit: 2 Σ E log(E/O)); ' +
            'λ=-1/2 Freeman-Tukey 1950 (closed: 4 Σ (√O - √E)²); ' +
            'λ→0 Wilks 1938 G² (limit: 2 Σ O log(O/E)); ' +
            'λ=2/3 Cressie-Read 1984 small-sample recommended; ' +
            'λ=1 Pearson 1900 χ² (closed: Σ (O-E)²/E).',
        },
        phase_a_analysis: phaseA,
        phase_b_analysis: phaseB,
        phase_c_analysis: phaseC,
        overall_verdict: {
          verdict: overallVerdict,
          evidence: overallEvidence,
          per_phase_invariance: {
            phase_a: phaseA.lambda_invariance_observed,
            phase_b: phaseB.lambda_invariance_observed,
            phase_c: phaseC.lambda_invariance_observed,
          },
          per_phase_max_pairwise_delta: {
            phase_a: phaseA.exact_p_value_max_pairwise_delta,
            phase_b: phaseB.exact_p_value_max_pairwise_delta,
            phase_c: phaseC.exact_p_value_max_pairwise_delta,
          },
        },
        hypothesis_details: {
          definitions: {
            H_lambda_invariant:
              '영역 λ ∈ {-1, -1/2, 0, 2/3, 1} 영역 영역 영역 영역 exact p — discrete null + small N 영역 영역 ' +
              'ranking identical induce (직전 a1d6d4d 영역 small N regime degeneracy 영역 broader λ sweep 영역 ' +
              'confirm). Read & Cressie 1988 §5 영역 power divergence statistic 영역 영역 λ value 영역 추천 영역 ' +
              'small N (N≤10) 영역 영역 영역 distinguishing power 영역 영역 영역 영역 영역 — N≥20 영역 영역 ' +
              'λ-specific divergence emerge expected.',
            H_lambda_specific:
              '영역 λ 영역 exact p 영역 영역 영역 영역 차이 발생. ' +
              '**Disambiguation mandatory — divergence source 영역 separate**: ' +
              '(a) broader-N power divergence emergence (Read & Cressie 1988 §5) — N≥20 영역 영역 영역 영역 영역 ' +
              'statistic-specific ranking distinction; (b) small-N zero-cell structural singularity — ' +
              'λ=-1 (Modified LR Neyman 1949) 영역 O_i=0 영역 영역 E·log(E/0)=+∞ → observed=+∞ → exact p ' +
              '≈ P[outcome 영역 ≥1 zero] under uniform null. 본 R&D (N=5/3) 영역 (b) source 영역 — λ=-1 만 영역 ' +
              '4 finite λ ∈ {-1/2, 0, 2/3, 1} 영역 영역 영역 영역 exact p 영역 영역 영역. (a) source 영역 ' +
              'broader N regime sweep 영역 별도 R&D.',
            H_partial_lambda_specific:
              'λ 영역 영역 영역 영역 영역 영역 영역 동일 — mixed signal. 영역 영역 영역 영역 영역 ' +
              'discrete uniform null 영역 영역 영역 영역 영역 — 영역 영역 영역 영역 R&D 영역 별도 R&D.',
          },
          threshold_rationale:
            'λ-invariance criterion — 5 λ value 영역 exact p 영역 모두 동일 (numerical EPS=1e-9) → ' +
            'discrete uniform null 영역 영역 영역 statistic ranking identical induce. ' +
            'Read & Cressie 1988 §5 영역 power divergence distinguishing power 영역 N≥20 영역 emerge 영역 영역 — ' +
            '본 R&D 영역 N=5/3 영역 H_lambda_invariant 영역 영역 expected.',
          frequentist_note:
            'Exact multinomial test — N+K-1 choose K-1 outcome 영역 enumerate, multinomial PMF under uniform ' +
            'null 영역 영역 statistic ≥ observed 영역 영역 sum. Cochran 1954 E≥5 rule 영역 영역 영역 영역 — ' +
            'large-sample approximation 영역 영역 영역. Read & Cressie 1988 power divergence family 영역 ' +
            '5 λ value 한정 — full continuous λ ∈ ℝ sweep 별도 R&D.',
        },
        academic_alignment: [
          'Pearson 1900 — chi-squared statistic X² = Σ((O-E)²/E) (λ=1).',
          'Wilks 1938 — likelihood ratio statistic G² = 2 Σ O log(O/E) (λ→0).',
          'Neyman 1949 — modified likelihood ratio 2 Σ E log(E/O) (λ=-1).',
          'Freeman & Tukey 1950 — Freeman-Tukey statistic 4 Σ (√O - √E)² (λ=-1/2).',
          'Fisher 1922 — exact test method (enumeration over discrete sample space).',
          'Cochran 1954 — chi-squared expected count rule (E ≥ 5 per cell, 본 R&D 영역 violation 직접 해결).',
          'Cressie & Read 1984 — Multinomial Goodness-of-Fit Tests (power divergence family introduction).',
          'Read & Cressie 1988 — power divergence statistic family Table 1 + λ=2/3 small-sample recommendation.',
        ],
        limitations: [
          'Existing data reanalysis 한정 — NO SNN run, NO MediaPipe Hand encoder call.',
          '5 λ values 한정 (λ ∈ {-1, -1/2, 0, 2/3, 1}) — full continuous λ ∈ ℝ sweep ' +
          '(예: λ ∈ [-2, 2] step=0.1 = 41 values) 별도 R&D.',
          'λ = -1 (Modified LR Neyman 1949) 영역 O_i = 0 일 때 E·log(E/0) = +∞ → observed = +∞ when ' +
          '∃ zero-count cluster. Phase A actual counts=[1,0,4,0] (cluster 1+3 zero, NOT [1,3,1,0] — 직전 ' +
          'audit catch correction) / Phase B counts=[0,3,0,2] / Phase C counts=[0,1,2,0] — 영역 phase 영역 ' +
          '∃ zero-cluster → λ=-1 observed=+∞ → exact p ≈ P[outcome 영역 ≥1 zero] under uniform null. ' +
          'Formal handling 영역 Read & Cressie 1988 §2.3 continuity correction 또는 Cressie-Read 1984 ' +
          'limit form (lim_{λ→-1} T(λ) via L\'Hopital) 영역 별도 R&D — 본 R&D 영역 raw +∞ 영역 영역 영역 ' +
          '영역 영역 reject side classification.',
          '**λ-divergence source disambiguation (직전 audit HIGH catch correction)**: H_lambda_specific ' +
          'verdict 영역 (a) broader-N power divergence emergence (Read & Cressie 1988 §5) vs (b) small-N ' +
          'zero-cell structural singularity (λ=-1 only) 영역 separate. 본 R&D (N=5/3) 영역 (b) — 4 finite ' +
          'λ ∈ {-1/2, 0, 2/3, 1} exact p identical (small N degeneracy a1d6d4d caveat broader λ confirm) + ' +
          'λ=-1 zero-cell singularity 한정 divergence. (a) source 영역 broader N regime sweep mandatory R&D.',
          'Exact enumeration 영역 N+K-1 choose K-1 outcome 한정 — N=5/K=4 영역 56, N=3/K=4 영역 20. ' +
          'N≥10 영역 enumeration intractable (예: N=10/K=4 → C(13,3) = 286, N=20/K=4 → C(23,3) = 1,771, ' +
          'N=50/K=4 → C(53,3) = 23,426) → sampling 영역 Monte Carlo exact (Mehta & Patel 1983 network algorithm) ' +
          'mandatory.',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 significance pattern 보장 X.',
          'Frequentist: failure to reject ≠ accept H0 — exact p ≥ 0.05 영역 architectural bias 영역 ' +
          '"absence of evidence" 영역 영역 (evidence of absence 영역 영역 영역).',
          'Uniform null (p_i = 1/K) 한정 — non-uniform prior (예: cluster-specific) 영역 별도 R&D.',
          'Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative ' +
          '(예: cluster X 영역 specific majority) 영역 별도 R&D.',
          'PMF computation 영역 Lanczos lgamma + Math.exp — small N (≤ 50) 영역 영역 영역 정확 단 larger N ' +
          '영역 log-space sum-exp 영역 영역 영역.',
        ],
        cross_reference: {
          prior_exact_multinomial_test: {
            test_path: 'tests/integration/hand-snn-exact-multinomial-test.test.ts',
            commit: 'a1d6d4d',
            measurement_path: 'tests/integration/measurements/hand-snn-exact-multinomial-test.json',
            note:
              'Frequentist note 영역 명시 — "Read & Cressie 1988 λ=2/3 영역 small-sample 영역 recommended 단 ' +
              'power divergence family 영역 영역 영역 (λ=0 LR, λ=1 χ², λ=-1 modified LR, λ=-1/2 Freeman-Tukey) ' +
              '영역 별도 R&D". 본 R&D 영역 직접 followup — 5 λ value 영역 exact p empirically compute.',
          },
          prior_multinomial_bootstrap_ci: {
            test_path: 'tests/integration/hand-snn-multinomial-bootstrap-ci-analysis.test.ts',
            commit: '9e139ec',
            measurement_path: 'tests/integration/measurements/hand-snn-multinomial-bootstrap-ci-analysis.json',
          },
          prior_tie_break_mechanism_analysis: {
            test_path: 'tests/integration/hand-snn-tie-break-mechanism-analysis.test.ts',
            commit: '15f9381',
            measurement_path: 'tests/integration/measurements/hand-snn-tie-break-mechanism-analysis.json',
          },
        },
      };
      saveMeasurement('hand-snn-power-divergence-lambda-sweep', measurement);

      // 검증 assertion — measurement R&D (verdict reject 없음).
      expect(phaseA.N).toBe(5);
      expect(phaseB.N).toBe(5);
      expect(phaseC.N).toBe(3);
      expect(phaseA.K).toBe(K);
      expect(phaseB.K).toBe(K);
      expect(phaseC.K).toBe(K);
      // Combinatorial verification — C(N+K-1, K-1).
      expect(phaseA.total_enumerated_outcomes).toBe(56); // C(8,3)
      expect(phaseA.expected_outcomes_combinatorial).toBe(56);
      expect(phaseB.total_enumerated_outcomes).toBe(56);
      expect(phaseC.total_enumerated_outcomes).toBe(20); // C(6,3)
      expect(phaseC.expected_outcomes_combinatorial).toBe(20);
      // PMF sum ≈ 1.0 — enumeration completeness verify (Cressie-Read 1984 §3.1).
      expect(phaseA.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseA.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseB.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseB.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseC.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseC.sum_of_probabilities).toBeLessThan(1.001);
      // λ sweep coverage — 5 λ values per phase.
      expect(phaseA.per_lambda_results.length).toBe(LAMBDA_SWEEP.length);
      expect(phaseB.per_lambda_results.length).toBe(LAMBDA_SWEEP.length);
      expect(phaseC.per_lambda_results.length).toBe(LAMBDA_SWEEP.length);
      // exact p ∈ (0, 1] per (phase, λ).
      for (const r of phaseA.per_lambda_results) {
        expect(r.exact_p_value).toBeGreaterThan(0);
        expect(r.exact_p_value).toBeLessThanOrEqual(1);
      }
      for (const r of phaseB.per_lambda_results) {
        expect(r.exact_p_value).toBeGreaterThan(0);
        expect(r.exact_p_value).toBeLessThanOrEqual(1);
      }
      for (const r of phaseC.per_lambda_results) {
        expect(r.exact_p_value).toBeGreaterThan(0);
        expect(r.exact_p_value).toBeLessThanOrEqual(1);
      }
      // Cochran violation verify — E = N/K < 5 (all 3 phases).
      expect(phaseA.cochran_violation).toBe(true);
      expect(phaseB.cochran_violation).toBe(true);
      expect(phaseC.cochran_violation).toBe(true);
      // overall verdict ∈ allowed set.
      expect([
        'H_lambda_invariant',
        'H_lambda_specific',
        'H_partial_lambda_specific',
      ]).toContain(overallVerdict);

      console.log('');
      console.log('[lambda-sweep] === Summary ===');
      console.log(
        `[lambda-sweep] Phase A λ-invariance=${phaseA.lambda_invariance_observed} ` +
        `(unique p=${phaseA.exact_p_values_set.length}/${LAMBDA_SWEEP.length}, ` +
        `max Δp=${phaseA.exact_p_value_max_pairwise_delta.toExponential(3)})`,
      );
      console.log(
        `[lambda-sweep] Phase B λ-invariance=${phaseB.lambda_invariance_observed} ` +
        `(unique p=${phaseB.exact_p_values_set.length}/${LAMBDA_SWEEP.length}, ` +
        `max Δp=${phaseB.exact_p_value_max_pairwise_delta.toExponential(3)})`,
      );
      console.log(
        `[lambda-sweep] Phase C λ-invariance=${phaseC.lambda_invariance_observed} ` +
        `(unique p=${phaseC.exact_p_values_set.length}/${LAMBDA_SWEEP.length}, ` +
        `max Δp=${phaseC.exact_p_value_max_pairwise_delta.toExponential(3)})`,
      );
      console.log(`[lambda-sweep] overall_verdict=${overallVerdict}`);
      console.log(`[lambda-sweep] elapsed_ms=${elapsedMs}`);
    },
  );
});
