// Hand SNN — Williams 1976 §3 formal symmetric convention R&D
// (L'Hopital alternative form 영역 음수 statistic artifact 해결).
//
// 직전 commit 493f850 (hand-snn-continuity-correction-zero-cell) 영역 정직 한계
// 명시 — "L'Hopital limit form (lim_{λ→-1} T(λ) = 2 Σ E log(E/O)) +
// zero-skip convention 영역 generalized T(λ) baseline 영역 영역 영역
// inconsistent. observed statistic 영역 음수 (Phase A=-2.35 / B=-3.36 /
// C=-1.90) 영역 영역 영역 'reject side rule stat ≥ observed' 영역 음수
// observed 영역 거의 모든 outcome 영역 reject side classify → p inflate
// (0.88-0.99) artifact. Williams 1976 §3 formal form (symmetric E log E
// inclusion 또는 modified convention) 별도 R&D mandatory."
//
// 본 R&D 영역 3 alternative L'Hopital convention 영역 영역 영역 영역 음수
// statistic artifact 영역 해결 검증.
//
// 시나리오 (focused scope, pure statistical reanalysis):
//   - Phase A counts=[1,0,4,0] (N=5, K=4) — open_palm untrained.
//   - Phase B counts=[0,3,0,2] (N=5, K=4) — open_palm post R-STDP.
//   - Phase C counts=[0,1,2,0] (N=3, K=4) — open_palm cluster seq.
//
// 3 Alternative L'Hopital conventions:
//   Convention 1 — Zero-skip (493f850 baseline):
//     L'Hopital lim_{λ→-1} T(λ) = 2 Σ_{O>0} E log(E/O), zero-count cluster term
//     영역 영역 영역 영역 skip. 직전 R&D 영역 음수 artifact ∃ (Phase A=-2.35 /
//     B=-3.36 / C=-1.90) → reject side rule inflate.
//   Convention 2 — Zero-include with strict 0×log(0)=0 (Cressie & Read 1984 §3):
//     T(-1) = 2 Σ_{all i} E_i log(E_i/O_i), O_i=0 → E_i log(E_i/0) = +∞.
//     observed=+∞ ≥ outcome=+∞ holds → 6cfecf7 raw +∞ rule 영역 영역 → exact p =
//     P[outcome 영역 ≥1 zero]. Cressie & Read 1984 §3 정합 (raw form preserved).
//   Convention 3 — Symmetric reformulation (Williams 1976 §3 inspired Laplace
//     smoothing):
//     T(-1)_sym = 2 Σ_{all i} (E_i + 0.5) × log((E_i + 0.5) / (O_i + 0.5))
//     — additive smoothing inside log (Laplace smoothing 영역 inside-log
//     variant). both E and O smoothed by δ=0.5.
//     → observed always finite, positive (E_i + 0.5 > O_i + 0.5 영역 영역 영역
//     영역 영역 영역 영역 — counts variance 영역 영역 영역 영역 영역). 영역
//     reject side rule 영역 정확 적용 → artifact 해결 후보.
//
// 측정 metrics (per phase per convention):
//   - convention_name
//   - convention_citation
//   - observed_statistic (finite check)
//   - exact_p_value
//   - sum_of_pmf (≈ 1.0 verify)
//   - statistic_sign (positive / negative / +∞)
//
// hypothesis verdicts:
//   - H_symmetric_convention_resolves: Conv 3 (symmetric Laplace) 영역 finite
//     positive observed statistic → reject side rule 정확 적용 → artifact 해결.
//   - H_all_conventions_artifact: 영역 영역 convention 영역 영역 영역 영역 다른
//     artifact (zero-skip 음수 / strict +∞ / symmetric ?) → fundamental
//     indeterminacy.
//   - H_partial_resolution: 일부 convention 영역 영역 영역 — mixed.
//
// 학술 정합:
//   - Williams 1976 — improved likelihood ratio for sparse contingency tables
//     (§3 영역 inspired only — 정확 form 영역 직접 verify 영역 영역).
//   - Cressie & Read 1984 §3 — power divergence limit forms (Convention 2 정합).
//   - Read & Cressie 1988 §2.3 — continuity correction for power divergence.
//   - Laplace 1812 — additive smoothing principle (Convention 3 영역 기본 원리).
//   - 6cfecf7 (power divergence λ sweep) / 493f850 (continuity correction)
//     cross-reference.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Statistical helpers (reused from commit 493f850 / 6cfecf7 framework) ──

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

// ── Convention 1: Zero-skip (493f850 baseline) ──
//
// L'Hopital lim_{λ→-1} T(λ) = 2 Σ_{O>0} E log(E/O), zero-count cluster term
// skip. Williams 1976 + Cressie & Read 1984 §3 convention (0×log(0)=0 for G²).
// 영역 R&D 영역 음수 artifact ∃: E=1.25 < O=4 → log(E/O) < 0 → 음수 contribution
// dominate.
function lhopitalZeroSkip(counts: number[], E: number): number {
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    if (o > 0) {
      s += E * Math.log(E / o);
    }
    // O = 0 → skip (Williams 1976 / Cressie & Read 1984 §3 convention).
  }
  return 2 * s;
}

// ── Convention 2: Zero-include strict 0×log(0)=0 (Cressie & Read 1984 §3) ──
//
// T(-1) = 2 Σ_{all i} E_i log(E_i/O_i), O_i=0 → E_i log(E_i/0) = +∞.
// observed=+∞ ≥ outcome=+∞ holds → 6cfecf7 raw +∞ rule.
// 영역 convention 영역 G² (λ→0) 영역 0×log(0)=0 convention 영역 inverse —
// T(-1) 영역 sum 영역 E log(E/O) 형태 영역 O=0 영역 무조건 +∞ (lim_{x→0+}
// E log(E/x) = +∞ 영역 영역).
function lhopitalStrictInfinity(counts: number[], E: number): number {
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    if (o === 0) {
      return Number.POSITIVE_INFINITY;
    }
  }
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    s += E * Math.log(E / o);
  }
  return 2 * s;
}

// ── Convention 3: Symmetric Laplace smoothing (Williams 1976 §3 inspired) ──
//
// T(-1)_sym = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ))
// δ=0.5 (Laplace additive smoothing inside log).
// both E and O smoothed by δ=0.5 (영역 R&D 영역 inside-log variant).
//
// **Williams 1976 영역 정확 §3 form 영역 영역 영역 영역 — '§3 inspired' Laplace
// smoothing 영역 본 R&D 영역 interpretation choice 영역**:
//   - Williams 1976 §3 영역 G² (λ=0) 영역 modified form 영역 영역 영역 — λ=-1
//     Modified LR 영역 별도 published reference 영역 영역.
//   - 영역 inside-log additive smoothing 영역 493f850 Method 2 (Williams δ=0.5)
//     영역 inspired — 단 493f850 Method 2 영역 outside-log (O_adjusted = δ for
//     O=0 only, N_adjusted = N + δ × #zero) 영역 영역, 영역 Convention 3 영역
//     inside-log (모든 i 영역 (E+δ) / (O+δ)) variant.
//   - Laplace 1812 additive smoothing principle 영역 정합 — both numerator and
//     denominator smoothed by same δ.
function lhopitalSymmetricLaplace(counts: number[], E: number, delta: number): number {
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    const numerator = E + delta;
    const denominator = o + delta;
    s += numerator * Math.log(numerator / denominator);
  }
  return 2 * s;
}

// ── Convention configuration ──

interface ConventionConfig {
  convention: string;
  citation: string;
  description: string;
  compute: (counts: number[], N: number, K: number) => number;
}

const CONVENTIONS: ConventionConfig[] = [
  {
    convention: 'zero_skip_493f850',
    citation: 'Williams 1976 / Cressie & Read 1984 §3 (G² convention 영역 inverse)',
    description:
      "L'Hopital lim_{λ→-1} T(λ) = 2 Σ_{O>0} E log(E/O), zero-count cluster term 영역 skip. " +
      '0×log(0)=0 convention (G² λ→0 영역 영역). 직전 commit 493f850 baseline — 음수 artifact ∃ ' +
      '(Phase A=-2.35 / B=-3.36 / C=-1.90) — E < O cluster 영역 음수 log dominate. ' +
      'reject side rule (stat ≥ observed) 영역 음수 observed → outcome 영역 거의 모두 reject classify → ' +
      'p inflate (0.88-0.99) artifact.',
    compute: (counts: number[], N: number, K: number): number => {
      const E = N / K;
      return lhopitalZeroSkip(counts, E);
    },
  },
  {
    convention: 'zero_include_strict_infinity',
    citation: 'Cressie & Read 1984 §3 (raw form preserved)',
    description:
      'T(-1) = 2 Σ_{all i} E_i log(E_i/O_i), O_i=0 → E_i log(E_i/0) = +∞. observed=+∞ ≥ outcome=+∞ ' +
      'holds → 6cfecf7 raw +∞ rule 영역 영역 → exact p = P[outcome 영역 ≥1 zero]. Cressie & Read 1984 §3 ' +
      '정합 (raw form preserved). 영역 convention 영역 G² 영역 0×log(0)=0 convention 영역 inverse — ' +
      'T(-1) sum 영역 E log(E/O) 형태 영역 O=0 영역 무조건 +∞ (lim_{x→0+} E log(E/x) = +∞).',
    compute: (counts: number[], N: number, K: number): number => {
      const E = N / K;
      return lhopitalStrictInfinity(counts, E);
    },
  },
  {
    convention: 'symmetric_laplace_delta_0.5',
    citation: 'Williams 1976 §3 inspired + Laplace 1812 additive smoothing',
    description:
      'T(-1)_sym = 2 Σ_{all i} (E_i + 0.5) × log((E_i + 0.5) / (O_i + 0.5)). both E and O smoothed ' +
      'by δ=0.5 (inside-log variant). 영역 inside-log additive smoothing 영역 493f850 Method 2 영역 ' +
      'inspired 단 inside-log variant — Williams 1976 §3 정확 form 영역 영역 영역 영역. observed ' +
      'always finite, sign 영역 outcome distribution 영역 영역 영역 — counts variance 영역 영역 영역 ' +
      '영역 영역 영역 영역 (uniform 영역 영역 T_sym ≈ 0, deviation 영역 클 영역 T_sym 영역 +). ' +
      'reject side rule 영역 정확 적용 후보 → artifact 해결 검증.',
    compute: (counts: number[], N: number, K: number): number => {
      const E = N / K;
      return lhopitalSymmetricLaplace(counts, E, 0.5);
    },
  },
];

// ── Per-(phase, convention) exact p computation ──

interface PerConventionResult {
  convention: string;
  citation: string;
  description: string;
  observed_statistic: number;
  observed_statistic_is_finite: boolean;
  observed_statistic_sign: 'positive' | 'negative' | 'zero' | 'positive_infinity';
  exact_p_value: number;
  outcomes_with_finite_statistic: number;
  outcomes_with_positive_infinity_statistic: number;
  outcomes_total: number;
  sum_of_pmf_finite_only: number;
  sum_of_pmf_total: number;
}

interface PhaseConventionResult {
  phase_label: string;
  counts_by_cluster: number[];
  N: number;
  K: number;
  expected_per_cell: number;
  zero_cluster_count: number;
  cochran_violation: boolean;
  total_enumerated_outcomes: number;
  expected_outcomes_combinatorial: number;
  sum_of_probabilities: number;
  prior_zero_skip_baseline_p: number;
  per_convention_results: PerConventionResult[];
  evidence: string;
}

function classifySign(v: number): 'positive' | 'negative' | 'zero' | 'positive_infinity' {
  if (!Number.isFinite(v)) return 'positive_infinity';
  if (Math.abs(v) < 1e-12) return 'zero';
  return v > 0 ? 'positive' : 'negative';
}

function analyzePhaseConvention(
  label: string,
  counts: number[],
  N: number,
  K: number,
  priorZeroSkipP: number,
): PhaseConventionResult {
  const E = N / K;
  const cochranViolation = E < 5;
  const zeroClusterCount = counts.filter(c => c === 0).length;

  const outcomes = enumerateCompositions(N, K);
  const expectedCount = binomial(N + K - 1, K - 1);

  const outcomePmfs: number[] = outcomes.map(o =>
    Math.exp(logMultinomialPmfUniform(o, N, K)),
  );
  const sumPmf = outcomePmfs.reduce((a, b) => a + b, 0);

  const EPS = 1e-9;
  const perConventionResults: PerConventionResult[] = [];

  for (const cfg of CONVENTIONS) {
    const observedStat = cfg.compute(counts, N, K);
    const observedIsFinite = Number.isFinite(observedStat);
    const observedSign = classifySign(observedStat);

    let exactP = 0;
    let finiteOutcomeCount = 0;
    let infinityOutcomeCount = 0;
    let finitePmfSum = 0;
    let totalPmfSum = 0;

    for (let i = 0; i < outcomes.length; i += 1) {
      const stat = cfg.compute(outcomes[i], N, K);
      const statIsFinite = Number.isFinite(stat);
      totalPmfSum += outcomePmfs[i];
      if (statIsFinite) {
        finiteOutcomeCount += 1;
        finitePmfSum += outcomePmfs[i];
      } else {
        infinityOutcomeCount += 1;
      }

      let include = false;
      if (!observedIsFinite) {
        // observed = +∞. outcome 영역 +∞ → +∞ ≥ +∞ holds (reject side).
        include = !statIsFinite;
      } else if (!statIsFinite) {
        // outcome = +∞ > finite observed → reject side.
        include = true;
      } else {
        include = stat >= observedStat - EPS;
      }
      if (include) exactP += outcomePmfs[i];
    }

    perConventionResults.push({
      convention: cfg.convention,
      citation: cfg.citation,
      description: cfg.description,
      observed_statistic: observedIsFinite
        ? observedStat
        : Number.POSITIVE_INFINITY,
      observed_statistic_is_finite: observedIsFinite,
      observed_statistic_sign: observedSign,
      exact_p_value: exactP,
      outcomes_with_finite_statistic: finiteOutcomeCount,
      outcomes_with_positive_infinity_statistic: infinityOutcomeCount,
      outcomes_total: outcomes.length,
      sum_of_pmf_finite_only: finitePmfSum,
      sum_of_pmf_total: totalPmfSum,
    });
  }

  const pSummary = perConventionResults
    .map(r => {
      const statStr = r.observed_statistic_is_finite
        ? r.observed_statistic.toFixed(3)
        : '+∞';
      return `${r.convention}: T=${statStr} (${r.observed_statistic_sign}) → p=${r.exact_p_value.toFixed(4)}`;
    })
    .join('; ');

  const evidence =
    `${label}: counts=[${counts.join(', ')}] (N=${N}, K=${K}), ` +
    `E=N/K=${E.toFixed(3)}, zero clusters=${zeroClusterCount}/${K} ` +
    `(Cochran 1954 E≥5 violated: ${cochranViolation}), ` +
    `prior 493f850 zero-skip p=${priorZeroSkipP.toFixed(4)}, ` +
    `conventions: ${pSummary}, enumerated=${outcomes.length} ` +
    `(expected C(${N + K - 1},${K - 1})=${expectedCount}), Σ pmf=${sumPmf.toFixed(6)}.`;

  return {
    phase_label: label,
    counts_by_cluster: counts.slice(),
    N,
    K,
    expected_per_cell: E,
    zero_cluster_count: zeroClusterCount,
    cochran_violation: cochranViolation,
    total_enumerated_outcomes: outcomes.length,
    expected_outcomes_combinatorial: expectedCount,
    sum_of_probabilities: sumPmf,
    prior_zero_skip_baseline_p: priorZeroSkipP,
    per_convention_results: perConventionResults,
    evidence,
  };
}

const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Williams 1976 §3 formal symmetric convention R&D (음수 statistic artifact 해결)', () => {
  it.skipIf(skipHeavy)(
    "★ 3 alternative L'Hopital conventions (zero-skip / strict +∞ / symmetric Laplace) 영역 Phase A/B/C reanalysis",
    { timeout: 60000 },
    async () => {
      const startedAtMs = Date.now();

      const PHASE_A_COUNTS = [1, 0, 4, 0];
      const PHASE_B_COUNTS = [0, 3, 0, 2];
      const PHASE_C_COUNTS = [0, 1, 2, 0];
      const N_AB = 5;
      const N_C = 3;
      const K = 4;

      // 493f850 zero-skip baseline (Convention 1 reference).
      // T = 2 Σ_{O>0} E log(E/O):
      //   Phase A counts=[1,0,4,0]: T = 2 × (1.25×log(1.25/1) + 1.25×log(1.25/4))
      //     = 2 × (1.25 × 0.22314 + 1.25 × (-1.16315))
      //     = 2 × (0.27893 + (-1.45394)) = 2 × (-1.17501) = -2.35002 (음수 artifact).
      //   Phase B counts=[0,3,0,2]: T = 2 × (1.25×log(1.25/3) + 1.25×log(1.25/2))
      //     = 2 × (1.25 × (-0.87547) + 1.25 × (-0.47000))
      //     = 2 × (-1.09433 + (-0.58750)) = 2 × (-1.68184) = -3.36367.
      //   Phase C counts=[0,1,2,0] (N=3, E=0.75):
      //     T = 2 × (0.75×log(0.75/1) + 0.75×log(0.75/2))
      //     = 2 × (0.75 × (-0.28768) + 0.75 × (-0.98083))
      //     = 2 × (-0.21576 + (-0.73562)) = 2 × (-0.95138) = -1.90276.
      const PRIOR_493F850_ZERO_SKIP_P_A = 0.8789; // Phase A
      const PRIOR_493F850_ZERO_SKIP_P_B = 0.9961; // QA LOW fix (audit catch): prior 0.9883 영역 stale (493f850 measurement.json line 183 actual = 0.9960937500000011 → 4dp = 0.9961). Phase B (negative observed → outcome 영역 거의 모두 reject side).
      const PRIOR_493F850_ZERO_SKIP_P_C = 0.9375; // Phase C

      const phaseA = analyzePhaseConvention(
        'Phase A (untrained)',
        PHASE_A_COUNTS,
        N_AB,
        K,
        PRIOR_493F850_ZERO_SKIP_P_A,
      );
      const phaseB = analyzePhaseConvention(
        'Phase B (trained)',
        PHASE_B_COUNTS,
        N_AB,
        K,
        PRIOR_493F850_ZERO_SKIP_P_B,
      );
      const phaseC = analyzePhaseConvention(
        'Phase C (sequence)',
        PHASE_C_COUNTS,
        N_C,
        K,
        PRIOR_493F850_ZERO_SKIP_P_C,
      );

      console.log('');
      console.log('[williams-formal-symmetric] === Phase A (untrained) ===');
      console.log(`[williams-formal-symmetric] ${phaseA.evidence}`);
      console.log('');
      console.log('[williams-formal-symmetric] === Phase B (trained) ===');
      console.log(`[williams-formal-symmetric] ${phaseB.evidence}`);
      console.log('');
      console.log('[williams-formal-symmetric] === Phase C (sequence) ===');
      console.log(`[williams-formal-symmetric] ${phaseC.evidence}`);

      // ── Hypothesis verdict logic ──
      // H_symmetric_convention_resolves: Conv 3 (index 2) 영역 모든 phase 영역
      //   finite positive observed → artifact 해결.
      // H_all_conventions_artifact: 모든 conventions 영역 영역 영역 영역 다른
      //   artifact (zero-skip 음수 / strict +∞ / symmetric ?).
      // H_partial_resolution: 일부 convention 영역 영역 — mixed.
      const phases = [phaseA, phaseB, phaseC];
      const conv3FinitePositiveCount = phases.filter(p => {
        const r = p.per_convention_results[2];
        return r.observed_statistic_is_finite && r.observed_statistic_sign === 'positive';
      }).length;

      // artifact check: zero-skip (Conv 1) 영역 음수 → reject inflate ∃.
      // strict +∞ (Conv 2) 영역 +∞ → "raw" p (≥1 zero outcome 영역 영역 outcome).
      // symmetric (Conv 3) 영역 영역 영역 sign 영역 영역.
      const conv1NegativeCount = phases.filter(p => {
        const r = p.per_convention_results[0];
        return r.observed_statistic_is_finite && r.observed_statistic_sign === 'negative';
      }).length;
      const conv2InfinityCount = phases.filter(p => {
        const r = p.per_convention_results[1];
        return !r.observed_statistic_is_finite;
      }).length;

      let overallVerdict:
        | 'H_symmetric_convention_resolves'
        | 'H_all_conventions_artifact'
        | 'H_partial_resolution';
      let overallEvidence: string;

      if (conv3FinitePositiveCount === phases.length) {
        overallVerdict = 'H_symmetric_convention_resolves';
        overallEvidence =
          'Convention 3 (symmetric Laplace δ=0.5) 영역 모든 3 phase (A/B/C) 영역 영역 영역 finite positive ' +
          'observed statistic 산출 → reject side rule (stat ≥ observed) 영역 정확 적용 → 493f850 zero-skip ' +
          '음수 artifact 해결. inside-log additive smoothing (E+δ) / (O+δ) 영역 numerator 영역 영역 영역 영역 ' +
          '영역 영역 영역 (영역 E_i+0.5 > 0, O_i+0.5 > 0, log finite) — counts variance 영역 영역 영역 영역 ' +
          '영역 (uniform 영역 영역 T_sym ≈ 0, deviation 영역 영역 T_sym > 0). 단 Williams 1976 §3 정확 form ' +
          '영역 영역 영역 영역 영역 영역 (영역 R&D 영역 interpretation choice).';
      } else if (
        conv1NegativeCount === phases.length &&
        conv2InfinityCount === phases.length &&
        conv3FinitePositiveCount === 0
      ) {
        overallVerdict = 'H_all_conventions_artifact';
        overallEvidence =
          '모든 3 conventions 영역 영역 영역 영역 다른 artifact: Conv 1 (zero-skip) 모든 phase 음수 → reject ' +
          'inflate, Conv 2 (strict +∞) 모든 phase +∞ → raw rule, Conv 3 (symmetric Laplace) 영역 finite ' +
          'positive 영역 영역 영역 (sign 영역 영역). fundamental indeterminacy — L\'Hopital limit form λ=-1 ' +
          '영역 zero-cell 영역 정확 convention 영역 published reference 영역 영역 영역.';
      } else {
        overallVerdict = 'H_partial_resolution';
        overallEvidence =
          `partial resolution — Conv 3 finite positive: ${conv3FinitePositiveCount}/${phases.length} phases, ` +
          `Conv 1 negative: ${conv1NegativeCount}/${phases.length}, Conv 2 +∞: ${conv2InfinityCount}/${phases.length}. ` +
          'mixed signal — 영역 convention 영역 영역 영역 영역 영역 영역 영역 영역 — broader R&D (δ sweep + ' +
          'Williams 1976 §3 정확 form verify) 별도 mandatory.';
      }

      console.log('');
      console.log('[williams-formal-symmetric] === Overall ===');
      console.log(`[williams-formal-symmetric] overall_verdict=${overallVerdict}`);
      console.log(`[williams-formal-symmetric] ${overallEvidence}`);

      // Comparison table — 493f850 baseline vs 3 conventions.
      console.log('');
      console.log('[williams-formal-symmetric] === Comparison table (493f850 baseline vs 3 conventions) ===');
      console.log(
        '[williams-formal-symmetric] Convention                    | Phase A (T → p)              | Phase B (T → p)              | Phase C (T → p)',
      );
      console.log(
        '[williams-formal-symmetric] ------------------------------+------------------------------+------------------------------+------------------------------',
      );
      console.log(
        '[williams-formal-symmetric] 493f850 zero-skip (prior)     | ' +
        `T=-2.350 → p=${PRIOR_493F850_ZERO_SKIP_P_A.toFixed(4).padStart(6)}        | ` +
        `T=-3.364 → p=${PRIOR_493F850_ZERO_SKIP_P_B.toFixed(4).padStart(6)}        | ` +
        `T=-1.903 → p=${PRIOR_493F850_ZERO_SKIP_P_C.toFixed(4).padStart(6)}`,
      );
      for (let i = 0; i < CONVENTIONS.length; i += 1) {
        const cfg = CONVENTIONS[i];
        const ra = phaseA.per_convention_results[i];
        const rb = phaseB.per_convention_results[i];
        const rc = phaseC.per_convention_results[i];
        const fmt = (r: PerConventionResult): string => {
          const tStr = r.observed_statistic_is_finite
            ? r.observed_statistic.toFixed(3)
            : '+∞';
          return `T=${tStr.padStart(6)} → p=${r.exact_p_value.toFixed(4).padStart(6)}`;
        };
        console.log(
          `[williams-formal-symmetric] ${cfg.convention.padEnd(28)}  | ` +
          `${fmt(ra).padEnd(28)} | ${fmt(rb).padEnd(28)} | ${fmt(rc).padEnd(28)}`,
        );
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-williams-formal-symmetric-convention',
        elapsed_ms: elapsedMs,
        focused_scope: {
          analysis_type:
            'Existing Phase A/B/C open_palm winner data 영역 pure statistical reanalysis 영역 영역 영역 ' +
            "λ=-1 L'Hopital limit form 영역 3 alternative conventions 영역 영역 영역 음수 statistic artifact " +
            '영역 해결 검증. NO SNN run, NO MediaPipe Hand encoder call. 직전 commit 493f850 영역 정직 한계 ' +
            "\"L'Hopital limit form + zero-skip convention 영역 generalized T(λ) baseline 영역 영역 영역 " +
            'inconsistent. observed statistic 영역 음수 → reject side rule inflate artifact. Williams 1976 §3 ' +
            'formal form 별도 R&D mandatory" 영역 followup.',
          input_data: {
            phase_a_counts: PHASE_A_COUNTS,
            phase_b_counts: PHASE_B_COUNTS,
            phase_c_counts: PHASE_C_COUNTS,
            N_phase_a: N_AB,
            N_phase_b: N_AB,
            N_phase_c: N_C,
            K_clusters: K,
            prior_493f850_zero_skip_p_A: PRIOR_493F850_ZERO_SKIP_P_A,
            prior_493f850_zero_skip_p_B: PRIOR_493F850_ZERO_SKIP_P_B,
            prior_493f850_zero_skip_p_C: PRIOR_493F850_ZERO_SKIP_P_C,
            phase_a_source: 'open_palm untrained — counts=[1,0,4,0] (cluster 2 dominant)',
            phase_b_source: 'open_palm post-RSTDP — counts=[0,3,0,2] (cluster 1 + 3 active)',
            phase_c_source:
              'open_palm cluster sequence — counts=[0,1,2,0] (cluster 1 + 2 active, N=3)',
            zero_cluster_phase_a: '[1,0,4,0] → 2 zero clusters (idx 1, 3)',
            zero_cluster_phase_b: '[0,3,0,2] → 2 zero clusters (idx 0, 2)',
            zero_cluster_phase_c: '[0,1,2,0] → 2 zero clusters (idx 0, 3)',
            prior_493f850_observed_statistic: {
              phase_a: -2.35002,
              phase_b: -3.36367,
              phase_c: -1.90276,
              note:
                '직전 493f850 zero-skip convention 영역 observed statistic — 모두 음수 → reject side rule ' +
                '(stat ≥ observed) 영역 음수 observed 영역 거의 모든 outcome 영역 reject side classify → ' +
                'p inflate (0.88-0.99) artifact.',
            },
          },
          conventions: CONVENTIONS.map(cfg => ({
            convention: cfg.convention,
            citation: cfg.citation,
            description: cfg.description,
          })),
          exact_enumeration_method: {
            method:
              'Stars-and-bars enumeration of multinomial compositions (o_0, ..., o_{K-1}) s.t. Σ o_i = N. ' +
              'Total outcomes = C(N+K-1, K-1) — N=5/K=4 → 56, N=3/K=4 → 20.',
            framework_reuse:
              'Same exact enumeration framework as commit a1d6d4d (hand-snn-exact-multinomial-test) + ' +
              'commit 6cfecf7 (hand-snn-power-divergence-lambda-sweep) + commit 493f850 ' +
              '(hand-snn-continuity-correction-zero-cell). Multinomial PMF + outcome enumeration reused ' +
              "without modification — convention computation 영역 영역 확장.",
            exact_p_value_definition:
              'exact p(convention) = Σ P[outcome] over all outcomes with T_convention[outcome] ≥ ' +
              'T_convention[observed]. observed = +∞ (Conv 2) → outcome 영역 +∞ → reject side. ' +
              'observed finite → standard reject side rule.',
          },
          convention_rationale:
            "Convention 1 (zero-skip) — Williams 1976 + Cressie & Read 1984 §3 G² convention (0 log 0 = 0) " +
            '영역 영역 — T(-1) sum 영역 O=0 영역 skip. 493f850 baseline — 음수 artifact ∃. ' +
            'Convention 2 (strict +∞) — Cressie & Read 1984 §3 raw form preserved — T(-1) sum 영역 O=0 → ' +
            'E log(E/0) = +∞ (lim_{x→0+} E log(E/x) = +∞). observed=+∞ → 6cfecf7 raw rule 영역 영역. ' +
            'Convention 3 (symmetric Laplace δ=0.5) — Williams 1976 §3 inspired + Laplace 1812 — both E and ' +
            'O smoothed by δ=0.5 inside log. 영역 inside-log additive smoothing 영역 493f850 Method 2 ' +
            '(Williams δ=0.5, outside-log) 영역 inspired variant. observed always finite — sign 영역 outcome ' +
            'distribution 영역 영역.',
        },
        phase_a_analysis: phaseA,
        phase_b_analysis: phaseB,
        phase_c_analysis: phaseC,
        overall_verdict: {
          verdict: overallVerdict,
          evidence: overallEvidence,
          per_convention_summary: CONVENTIONS.map((cfg, i) => ({
            convention: cfg.convention,
            phase_a_observed: phaseA.per_convention_results[i].observed_statistic,
            phase_a_sign: phaseA.per_convention_results[i].observed_statistic_sign,
            phase_a_p: phaseA.per_convention_results[i].exact_p_value,
            phase_b_observed: phaseB.per_convention_results[i].observed_statistic,
            phase_b_sign: phaseB.per_convention_results[i].observed_statistic_sign,
            phase_b_p: phaseB.per_convention_results[i].exact_p_value,
            phase_c_observed: phaseC.per_convention_results[i].observed_statistic,
            phase_c_sign: phaseC.per_convention_results[i].observed_statistic_sign,
            phase_c_p: phaseC.per_convention_results[i].exact_p_value,
          })),
          comparison_to_493f850_baseline: {
            phase_a: {
              prior_zero_skip_p: PRIOR_493F850_ZERO_SKIP_P_A,
              prior_observed_statistic: -2.35002,
              prior_artifact_note: 'reject side rule inflate (음수 observed → outcomes 영역 거의 모두 stat ≥ observed)',
              conventions: phaseA.per_convention_results.map(r => ({
                convention: r.convention,
                observed: r.observed_statistic,
                sign: r.observed_statistic_sign,
                p: r.exact_p_value,
                delta_from_prior_p: r.exact_p_value - PRIOR_493F850_ZERO_SKIP_P_A,
              })),
            },
            phase_b: {
              prior_zero_skip_p: PRIOR_493F850_ZERO_SKIP_P_B,
              prior_observed_statistic: -3.36367,
              prior_artifact_note: 'reject side rule inflate',
              conventions: phaseB.per_convention_results.map(r => ({
                convention: r.convention,
                observed: r.observed_statistic,
                sign: r.observed_statistic_sign,
                p: r.exact_p_value,
                delta_from_prior_p: r.exact_p_value - PRIOR_493F850_ZERO_SKIP_P_B,
              })),
            },
            phase_c: {
              prior_zero_skip_p: PRIOR_493F850_ZERO_SKIP_P_C,
              prior_observed_statistic: -1.90276,
              prior_artifact_note: 'reject side rule inflate',
              conventions: phaseC.per_convention_results.map(r => ({
                convention: r.convention,
                observed: r.observed_statistic,
                sign: r.observed_statistic_sign,
                p: r.exact_p_value,
                delta_from_prior_p: r.exact_p_value - PRIOR_493F850_ZERO_SKIP_P_C,
              })),
            },
          },
        },
        hypothesis_details: {
          definitions: {
            H_symmetric_convention_resolves:
              '**Partial resolution clarification (QA HIGH catch fix)**: ' +
              'Convention 3 (symmetric Laplace δ=0.5) 영역 모든 3 phase 영역 영역 영역 finite positive ' +
              'observed statistic 산출 → reject side rule (stat ≥ observed) 영역 정확 적용 → 493f850 ' +
              'zero-skip 음수 artifact 해결 (Conv 3 한정 partial resolution). Conv 1 (zero-skip) 영역 ' +
              '여전히 음수 artifact ∃, Conv 2 (strict +∞) 영역 여전히 +∞ artifact ∃. ' +
              '**Sufficient statistic equivalence (CRITICAL QA HIGH)**: Conv 3 (inside-log Laplace, ' +
              '(E+δ)/(O+δ) smoothing) 영역 493f850 Method 2 (Williams δ=0.5 outside-log additive count ' +
              'O→O+δ before raw χ²) 영역 ALL 3 phase 영역 byte-identical exact p (Phase A=0.0625, B=0.1797, ' +
              'C=0.6250) — **coincidence NOT, fundamental equivalence**: inside-log vs outside-log variant ' +
              '영역 uniform null + reject side rule 영역 영역 영역 outcome ordering 영역 영역 영역 → ' +
              'sufficient statistic equivalent → 본 R&D 영역 493f850 Method 2 영역 영역 영역 ' +
              '**informationally novel finding 0** (Williams δ convention 영역 inside-log/outside-log ' +
              'variant 영역 equivalent confirmation). ' +
              'Verdict 영역 strict 영역 "H_symmetric_convention_resolves_for_conv3_only" 영역 영역 영역.',
            H_all_conventions_artifact:
              '모든 3 conventions 영역 영역 영역 영역 다른 artifact: Conv 1 (zero-skip) 모든 phase 음수 → ' +
              'reject inflate, Conv 2 (strict +∞) 모든 phase +∞ → raw rule, Conv 3 (symmetric Laplace) 영역 ' +
              'finite positive 영역 영역 영역 (sign 영역 영역). fundamental indeterminacy.',
            H_partial_resolution:
              '일부 convention 영역 영역 영역 — mixed signal. 영역 convention 영역 영역 영역 영역 영역 영역 ' +
              '영역 영역 영역 — broader R&D (δ sweep + Williams 1976 §3 정확 form verify) 별도 mandatory.',
          },
          threshold_rationale:
            'symmetric_convention_resolves criterion — Convention 3 (symmetric Laplace δ=0.5) 영역 모든 3 ' +
            'phase 영역 영역 영역 (observed finite AND sign=positive) holds → artifact 해결. ' +
            'observed positive → reject side rule (stat ≥ observed) 영역 정확 적용 (음수 observed 영역 ' +
            '거의 모든 outcome reject side classify 영역 artifact 영역).',
          comparison_to_493f850_zero_skip:
            '493f850 zero-skip convention (Conv 1) 영역 baseline — observed statistic 영역 음수 (Phase A=-2.35 ' +
            '/ B=-3.36 / C=-1.90) 영역 영역 영역 reject side rule 영역 음수 observed → outcome 영역 거의 모두 ' +
            'reject side classify (stat ≥ 음수) → p inflate (0.88-0.99). 본 R&D 영역 3 alternative conventions ' +
            '영역 영역 영역 artifact 영역 해결 candidate verify.',
          naming_correction_note:
            '**QA HIGH catch fix**: "Williams 1976 §3 formal symmetric convention" naming 영역 misleading — ' +
            '본 R&D 영역 Williams 1976 §3 영역 정확 form 영역 직접 verify 영역 영역 ("§3 inspired" only). ' +
            '"formal" 영역 published canonical form 영역 영역 영역 영역 영역 영역 — Convention 3 영역 본 R&D ' +
            'novel Laplace smoothing interpretation choice (Williams 1976 영역 영역 영역 §3 영역 G² ' +
            'contingency table modified form 영역 — λ=-1 Modified LR symmetric form 영역 별도 published reference 영역). ' +
            'scenario rename candidate: "williams-inspired-symmetric-laplace-convention" 영역 영역 영역 적정 — ' +
            '본 R&D 영역 historical naming 보존 단 limitations + 본 note 영역 명시 강화.',
          marginal_significance_clarification_note:
            '**QA MEDIUM catch fix**: Conv 3 Phase A p=0.0625 영역 α=0.05 영역 비교 — 0.0625 > 0.05 → ' +
            '**fail to reject H0 at α=0.05** (statistically NOT significant). "marginal" 영역 영역 영역 ' +
            'proximity 영역 영역 영역 영역 — frequentist 영역 영역 "marginal proximity 영역 단 statistically ' +
            'not significant" (fail-to-reject) 영역 명시. α=0.10 영역 영역 영역 reject 영역 단 본 R&D 영역 ' +
            'α=0.05 standard convention 한정.',
        },
        academic_alignment: [
          'Williams 1976 — improved likelihood ratio for sparse contingency tables (§3 영역 inspired only, ' +
          '정확 form 영역 직접 verify 영역 영역 — 본 R&D 영역 interpretation choice).',
          'Cressie & Read 1984 — Multinomial Goodness-of-Fit Tests (power divergence family + ' +
          "L'Hopital limit forms §3, raw form preserved 영역 Convention 2 정합).",
          'Read & Cressie 1988 — power divergence family Table 1 + §2.3 continuity correction.',
          'Laplace 1812 — additive smoothing principle (Convention 3 영역 기본 원리, both E and O smoothed ' +
          'by same δ).',
          'Yates 1934 — continuity correction for chi-squared 2×2 contingency table (493f850 Method 1 ' +
          'reference).',
          'Wilks 1938 — likelihood ratio statistic G² (0 log 0 = 0 convention reference).',
          'Cochran 1954 — E≥5 rule (본 R&D 영역 violation 영역 — N=5/K=4 영역 E=1.25, N=3/K=4 영역 E=0.75).',
          '6cfecf7 — power divergence λ sweep R&D (Convention 2 raw +∞ rule 영역 reference).',
          '493f850 — continuity correction R&D (Convention 1 zero-skip baseline + 음수 artifact catch).',
        ],
        limitations: [
          'Existing Phase A/B/C data reanalysis 한정 — NO SNN run, NO MediaPipe Hand encoder call.',
          "Williams 1976 §3 영역 정확 originals form 영역 영역 영역 영역 검증 0 — '§3 inspired' Laplace " +
          'smoothing 영역 본 R&D 영역 interpretation choice 영역 (Williams 1976 영역 영역 영역 §3 영역 G² ' +
          '영역 contingency table 영역 modified form 영역 — λ=-1 Modified LR 영역 별도 published reference ' +
          '영역 영역).',
          "Laplace smoothing δ=0.5 영역 ad-hoc — δ ∈ {0.1, 0.5, 1.0} sensitivity sweep 별도 R&D. δ 영역 " +
          '영역 영역 영역 영역 영역 statistic 영역 영역 영역 영역 — 본 R&D 영역 single δ=0.5 한정.',
          'Convention 2 (strict 0×log(0)=0 → +∞) 영역 6cfecf7 raw rule 영역 reproduce — Cressie & Read 1984 ' +
          '§3 convention 영역 정합 verify 단 +∞ observed 영역 statistical inference 영역 영역 영역 영역 ' +
          '(reject side classification 영역 trivial — 영역 outcome 영역 ≥1 zero → reject side).',
          'Convention 3 (symmetric Laplace) 영역 Williams 1976 영역 영역 영역 직접 reference 영역 영역 영역 — ' +
          'Williams δ correction (493f850 Method 2, outside-log) 영역 inside-log variant 영역 inspired. ' +
          'broader symmetric forms (예: arithmetic mean smoothing, geometric mean smoothing, ' +
          'Bayes-Laplace prior + 다른 δ) 별도 R&D.',
          'Exact enumeration N≤5 한정 (N=5/K=4 → 56, N=3/K=4 → 20). N≥10 영역 enumeration intractable — ' +
          'Monte Carlo exact (Mehta & Patel 1983 network algorithm) mandatory.',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 zero-cell pattern 보장 X.',
          'Frequentist: failure to reject ≠ accept H0 — exact p ≥ 0.05 영역 architectural bias 영역 ' +
          '"absence of evidence" 영역 영역 (evidence of absence 영역 영역 영역).',
          'Uniform null (p_i = 1/K) 한정 — non-uniform prior 영역 별도 R&D.',
          "Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative 영역 별도 R&D.",
          "본 R&D 영역 λ=-1 L'Hopital convention 3 가지 한정 — Anscombe 1956 arcsine transformation, " +
          "Pirie & Hamdan 1972 modified χ², Cochran 1952 categorical pooling 영역 별도 R&D.",
          'Convention 3 observed positive 영역 outcome distribution 영역 보장 X — 일부 outcome (예: deviation ' +
          '큰 outcome) 영역 영역 T_sym 영역 영역 영역 영역 영역 reject p 영역 영역 영역 영역 (sign 자체 영역 ' +
          'artifact 영역 영역 단 reject side rule 영역 정확 적용 보장 X — Bahadur 1971 efficiency ratio ' +
          '영역 별도 R&D).',
        ],
        cross_reference: {
          prior_continuity_correction: {
            test_path: 'tests/integration/hand-snn-continuity-correction-zero-cell.test.ts',
            commit: '493f850',
            measurement_path: 'tests/integration/measurements/hand-snn-continuity-correction-zero-cell.json',
            note:
              "정직 한계 명시 — \"L'Hopital limit form + zero-skip convention 영역 generalized T(λ) baseline " +
              '영역 영역 영역 inconsistent. observed statistic 영역 음수 → reject side rule inflate artifact. ' +
              'Williams 1976 §3 formal form 별도 R&D mandatory". 본 R&D 영역 직접 followup — 3 alternative ' +
              'L\'Hopital conventions 영역 영역 영역 artifact 해결 verify.',
          },
          prior_power_divergence_lambda_sweep: {
            test_path: 'tests/integration/hand-snn-power-divergence-lambda-sweep.test.ts',
            commit: '6cfecf7',
            measurement_path: 'tests/integration/measurements/hand-snn-power-divergence-lambda-sweep.json',
            note: 'Convention 2 (strict +∞) raw rule 영역 reference.',
          },
          prior_exact_multinomial_test: {
            test_path: 'tests/integration/hand-snn-exact-multinomial-test.test.ts',
            commit: 'a1d6d4d',
            measurement_path: 'tests/integration/measurements/hand-snn-exact-multinomial-test.json',
          },
        },
      };
      saveMeasurement('hand-snn-williams-formal-symmetric-convention', measurement);

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
      // PMF sum ≈ 1.0
      expect(phaseA.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseA.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseB.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseB.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseC.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseC.sum_of_probabilities).toBeLessThan(1.001);
      // 3 conventions per phase.
      expect(phaseA.per_convention_results.length).toBe(CONVENTIONS.length);
      expect(phaseB.per_convention_results.length).toBe(CONVENTIONS.length);
      expect(phaseC.per_convention_results.length).toBe(CONVENTIONS.length);
      // exact p ∈ (0, 1] per (phase, convention).
      for (const r of phaseA.per_convention_results) {
        expect(r.exact_p_value).toBeGreaterThan(0);
        expect(r.exact_p_value).toBeLessThanOrEqual(1);
      }
      for (const r of phaseB.per_convention_results) {
        expect(r.exact_p_value).toBeGreaterThan(0);
        expect(r.exact_p_value).toBeLessThanOrEqual(1);
      }
      for (const r of phaseC.per_convention_results) {
        expect(r.exact_p_value).toBeGreaterThan(0);
        expect(r.exact_p_value).toBeLessThanOrEqual(1);
      }
      // Convention 1 (zero-skip): 음수 observed 영역 영역 영역 (493f850 baseline reproduce).
      expect(phaseA.per_convention_results[0].observed_statistic_sign).toBe('negative');
      expect(phaseB.per_convention_results[0].observed_statistic_sign).toBe('negative');
      expect(phaseC.per_convention_results[0].observed_statistic_sign).toBe('negative');
      // Convention 2 (strict +∞): observed = +∞ 영역 영역 영역.
      expect(phaseA.per_convention_results[1].observed_statistic_is_finite).toBe(false);
      expect(phaseB.per_convention_results[1].observed_statistic_is_finite).toBe(false);
      expect(phaseC.per_convention_results[1].observed_statistic_is_finite).toBe(false);
      // Convention 3 (symmetric Laplace): observed finite.
      expect(phaseA.per_convention_results[2].observed_statistic_is_finite).toBe(true);
      expect(phaseB.per_convention_results[2].observed_statistic_is_finite).toBe(true);
      expect(phaseC.per_convention_results[2].observed_statistic_is_finite).toBe(true);
      // zero clusters > 0 per phase (raw λ=-1 singularity precondition).
      expect(phaseA.zero_cluster_count).toBeGreaterThan(0);
      expect(phaseB.zero_cluster_count).toBeGreaterThan(0);
      expect(phaseC.zero_cluster_count).toBeGreaterThan(0);
      // Cochran violation
      expect(phaseA.cochran_violation).toBe(true);
      expect(phaseB.cochran_violation).toBe(true);
      expect(phaseC.cochran_violation).toBe(true);
      // overall verdict ∈ allowed set.
      expect([
        'H_symmetric_convention_resolves',
        'H_all_conventions_artifact',
        'H_partial_resolution',
      ]).toContain(overallVerdict);

      console.log('');
      console.log('[williams-formal-symmetric] === Summary ===');
      console.log(`[williams-formal-symmetric] overall_verdict=${overallVerdict}`);
      console.log(`[williams-formal-symmetric] elapsed_ms=${elapsedMs}`);
    },
  );
});
