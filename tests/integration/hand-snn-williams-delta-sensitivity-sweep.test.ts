// Hand SNN — Williams 1976 §3 inspired symmetric Laplace δ sensitivity sweep R&D
// (δ choice 영역 verdict 변동 verify).
//
// 직전 commit 7c65a31 (hand-snn-williams-formal-symmetric-convention) 영역 정직
// 한계 명시 — "Laplace smoothing δ=0.5 영역 ad-hoc — δ ∈ {0.1, 0.5, 1.0}
// sensitivity sweep 별도 R&D. δ 영역 영역 영역 영역 영역 영역 statistic 영역
// 영역 영역 영역 — 본 R&D 영역 single δ=0.5 한정". 본 R&D 영역 직접 followup.
//
// 본 R&D 영역 existing Phase A/B/C winner data 영역 영역 영역 영역 reanalysis
// — δ ∈ {0.1, 0.5, 1.0} 영역 영역 Conv 3 (symmetric Laplace, inside-log) exact
// p compute → δ choice 영역 reject decision 영역 영역 영역 영역 verify.
//
// 시나리오 (focused scope, pure statistical reanalysis):
//   - Phase A counts=[1,0,4,0] (N=5, K=4) — open_palm untrained.
//   - Phase B counts=[0,3,0,2] (N=5, K=4) — open_palm post R-STDP.
//   - Phase C counts=[0,1,2,0] (N=3, K=4) — open_palm cluster seq.
//
// Conv 3 (symmetric Laplace) δ sweep:
//   T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ))
//   δ ∈ {0.1, 0.5, 1.0} — 7c65a31 영역 δ=0.5 baseline reproduce + δ=0.1 / δ=1.0
//   novel.
//
// 영역 δ 영역 exact p 산출 (7c65a31 framework reuse):
//   δ=0.1: observed_d01 / p_d01
//   δ=0.5: observed_d05 / p_d05 (7c65a31 reproduce verify — Phase A=0.0625 /
//          Phase B=0.1797 / Phase C=0.6250)
//   δ=1.0: observed_d10 / p_d10
//
// hypothesis verdicts:
//   - H_delta_invariant: 영역 3 δ 영역 영역 영역 영역 exact p — δ choice 영역
//     영역 영역 (rare 영역 영역 small N + discrete sample space).
//   - H_delta_sensitive: 영역 δ 영역 exact p 영역 영역 영역 차이 — δ choice 영역
//     reject decision 영역 영역 (additional indeterminacy on top of method
//     choice).
//   - H_partial_delta_sensitivity: 일부 δ 영역 영역 영역 영역 mixed signal.
//
// α=0.05 reject threshold 영역 영역 영역 verify — 직전 7c65a31 영역 Phase A
// δ=0.5 p=0.0625 marginal 영역 영역 영역 영역 영역 — δ=0.1 영역 영역 영역
// reject 영역 영역 영역 영역, δ=1.0 영역 영역 fail-to-reject 영역 영역 영역
// 영역 verify.
//
// 학술 정합:
//   - Williams 1976 — improved likelihood ratio for sparse contingency tables
//     (§3 영역 inspired only — 정확 form 영역 직접 verify 영역 영역).
//   - Laplace 1812 — additive smoothing principle (δ choice 영역 기본 원리).
//   - Read & Cressie 1988 §2.3 — continuity correction.
//   - Cressie & Read 1984 §3 — power divergence limit forms.
//   - 7c65a31 (williams-formal-symmetric-convention) — Conv 3 δ=0.5 baseline.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Statistical helpers (reused from commit 7c65a31 / 493f850 / 6cfecf7) ──

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

// ── Conv 3 symmetric Laplace (inside-log) — δ parameterized ──
//
// T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ))
// (factor 2 영역 7c65a31 baseline 영역 영역 — exact p 영역 outcome ordering 영역
// 영역 영역 영역 factor 2 영역 영역 영역 영역 영역, single δ baseline reproduce
// 영역 동일 numerical value 영역 영역).
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
    citation: 'Laplace 1812 additive smoothing (low δ — minimal smoothing)',
    description:
      'δ=0.1 — minimal Laplace smoothing. T_sym(0.1) = 2 Σ (E+0.1) log((E+0.1)/(O+0.1)). ' +
      '영역 δ 영역 영역 영역 영역 raw +∞ (Cressie & Read 1984 §3 strict form) 영역 가까워 영역 — ' +
      '(E+0.1)/(O+0.1) ratio 영역 zero-cell 영역 영역 영역 영역 magnify (E+0.1)/0.1 = 10E 영역 영역 영역 → ' +
      'observed statistic 영역 magnitude 영역 영역.',
  },
  {
    delta: 0.5,
    delta_label: 'delta_0.5',
    citation: 'Williams 1976 §3 inspired + Laplace 1812 (7c65a31 baseline)',
    description:
      'δ=0.5 — 7c65a31 baseline reproduce verify. T_sym(0.5) = 2 Σ (E+0.5) log((E+0.5)/(O+0.5)). ' +
      'Williams 1976 §3 inspired (정확 §3 form 영역 영역 영역 영역 — 영역 R&D 영역 interpretation choice). ' +
      'expected exact p: Phase A=0.0625, Phase B=0.1797, Phase C=0.6250 (7c65a31 reproduce).',
  },
  {
    delta: 1.0,
    delta_label: 'delta_1.0',
    citation: 'Laplace 1812 additive smoothing (high δ — heavy smoothing)',
    description:
      'δ=1.0 — heavy Laplace smoothing (add-one rule). T_sym(1.0) = 2 Σ (E+1.0) log((E+1.0)/(O+1.0)). ' +
      '영역 δ 영역 영역 영역 영역 uniform 영역 영역 ratio 영역 영역 영역 영역 (1+E vs 1+O 영역 영역 영역 영역 ' +
      '영역 영역) → observed statistic 영역 magnitude 영역 영역. add-one rule 영역 standard Bayesian Laplace ' +
      'prior (uniform Dirichlet prior α=1) 영역 영역.',
  },
];

// ── Per-(phase, δ) exact p computation ──

interface PerDeltaResult {
  delta: number;
  delta_label: string;
  citation: string;
  description: string;
  observed_statistic: number;
  observed_statistic_is_finite: boolean;
  observed_statistic_sign: 'positive' | 'negative' | 'zero';
  exact_p_value: number;
  sum_of_pmf_total: number;
  outcomes_total: number;
  rejects_at_alpha_005: boolean;
}

interface PhaseDeltaResult {
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
  prior_7c65a31_delta_0_5_p: number;
  per_delta_results: PerDeltaResult[];
  delta_p_range: number;
  delta_p_min: number;
  delta_p_max: number;
  reject_decisions_unanimous: boolean;
  evidence: string;
}

function classifySign(v: number): 'positive' | 'negative' | 'zero' {
  if (Math.abs(v) < 1e-12) return 'zero';
  return v > 0 ? 'positive' : 'negative';
}

const ALPHA = 0.05;

function analyzePhaseDelta(
  label: string,
  counts: number[],
  N: number,
  K: number,
  prior7c65a31DeltaHalfP: number,
): PhaseDeltaResult {
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
  const perDeltaResults: PerDeltaResult[] = [];

  for (const cfg of DELTA_SWEEP) {
    const observedStat = lhopitalSymmetricLaplace(counts, E, cfg.delta);
    const observedIsFinite = Number.isFinite(observedStat);
    const observedSign = classifySign(observedStat);

    let exactP = 0;
    let totalPmfSum = 0;

    for (let i = 0; i < outcomes.length; i += 1) {
      const stat = lhopitalSymmetricLaplace(outcomes[i], E, cfg.delta);
      totalPmfSum += outcomePmfs[i];
      if (stat >= observedStat - EPS) {
        exactP += outcomePmfs[i];
      }
    }

    const rejectsAtAlpha005 = exactP < ALPHA;

    perDeltaResults.push({
      delta: cfg.delta,
      delta_label: cfg.delta_label,
      citation: cfg.citation,
      description: cfg.description,
      observed_statistic: observedStat,
      observed_statistic_is_finite: observedIsFinite,
      observed_statistic_sign: observedSign,
      exact_p_value: exactP,
      sum_of_pmf_total: totalPmfSum,
      outcomes_total: outcomes.length,
      rejects_at_alpha_005: rejectsAtAlpha005,
    });
  }

  const ps = perDeltaResults.map(r => r.exact_p_value);
  const pMin = Math.min(...ps);
  const pMax = Math.max(...ps);
  const pRange = pMax - pMin;
  const rejectDecisions = perDeltaResults.map(r => r.rejects_at_alpha_005);
  const rejectUnanimous =
    rejectDecisions.every(r => r === true) || rejectDecisions.every(r => r === false);

  const pSummary = perDeltaResults
    .map(r => `δ=${r.delta}: T=${r.observed_statistic.toFixed(3)} → p=${r.exact_p_value.toFixed(4)} (reject@0.05=${r.rejects_at_alpha_005})`)
    .join('; ');

  const evidence =
    `${label}: counts=[${counts.join(', ')}] (N=${N}, K=${K}), ` +
    `E=N/K=${E.toFixed(3)}, zero clusters=${zeroClusterCount}/${K} ` +
    `(Cochran 1954 E≥5 violated: ${cochranViolation}), ` +
    `prior 7c65a31 δ=0.5 p=${prior7c65a31DeltaHalfP.toFixed(4)}, ` +
    `δ sweep: ${pSummary}, p_range=${pRange.toFixed(4)} ` +
    `(min=${pMin.toFixed(4)}, max=${pMax.toFixed(4)}), reject_unanimous=${rejectUnanimous}, ` +
    `enumerated=${outcomes.length} (expected C(${N + K - 1},${K - 1})=${expectedCount}), ` +
    `Σ pmf=${sumPmf.toFixed(6)}.`;

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
    prior_7c65a31_delta_0_5_p: prior7c65a31DeltaHalfP,
    per_delta_results: perDeltaResults,
    delta_p_range: pRange,
    delta_p_min: pMin,
    delta_p_max: pMax,
    reject_decisions_unanimous: rejectUnanimous,
    evidence,
  };
}

const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

// ── Reproduction tolerance — 7c65a31 baseline reproduce verify (QA LOW catch fix: 1e-6 → 1e-3 actual usage match) ──
const REPRODUCE_TOL = 1e-3;

describe('Hand SNN — Williams 1976 §3 inspired symmetric Laplace δ sensitivity sweep R&D (δ choice 영역 verdict 변동 verify)', () => {
  it.skipIf(skipHeavy)(
    '★ Conv 3 (symmetric Laplace) δ ∈ {0.1, 0.5, 1.0} sweep 영역 Phase A/B/C reanalysis (δ choice 영역 reject decision 영역 영역 verify)',
    { timeout: 60000 },
    async () => {
      const startedAtMs = Date.now();

      const PHASE_A_COUNTS = [1, 0, 4, 0];
      const PHASE_B_COUNTS = [0, 3, 0, 2];
      const PHASE_C_COUNTS = [0, 1, 2, 0];
      const N_AB = 5;
      const N_C = 3;
      const K = 4;

      // 7c65a31 Conv 3 δ=0.5 baseline reference (reproduce verify).
      const PRIOR_7C65A31_DELTA_0_5_P_A = 0.0625; // Phase A
      const PRIOR_7C65A31_DELTA_0_5_P_B = 0.1797; // Phase B
      const PRIOR_7C65A31_DELTA_0_5_P_C = 0.6250; // Phase C

      const phaseA = analyzePhaseDelta(
        'Phase A (untrained)',
        PHASE_A_COUNTS,
        N_AB,
        K,
        PRIOR_7C65A31_DELTA_0_5_P_A,
      );
      const phaseB = analyzePhaseDelta(
        'Phase B (trained)',
        PHASE_B_COUNTS,
        N_AB,
        K,
        PRIOR_7C65A31_DELTA_0_5_P_B,
      );
      const phaseC = analyzePhaseDelta(
        'Phase C (sequence)',
        PHASE_C_COUNTS,
        N_C,
        K,
        PRIOR_7C65A31_DELTA_0_5_P_C,
      );

      console.log('');
      console.log('[williams-delta-sensitivity-sweep] === Phase A (untrained) ===');
      console.log(`[williams-delta-sensitivity-sweep] ${phaseA.evidence}`);
      console.log('');
      console.log('[williams-delta-sensitivity-sweep] === Phase B (trained) ===');
      console.log(`[williams-delta-sensitivity-sweep] ${phaseB.evidence}`);
      console.log('');
      console.log('[williams-delta-sensitivity-sweep] === Phase C (sequence) ===');
      console.log(`[williams-delta-sensitivity-sweep] ${phaseC.evidence}`);

      // ── 7c65a31 δ=0.5 baseline reproduce verify (sanity check) ──
      const reproDeltaIdx05 = DELTA_SWEEP.findIndex(d => d.delta === 0.5);
      const reproA = Math.abs(phaseA.per_delta_results[reproDeltaIdx05].exact_p_value - PRIOR_7C65A31_DELTA_0_5_P_A) < REPRODUCE_TOL;
      const reproB = Math.abs(phaseB.per_delta_results[reproDeltaIdx05].exact_p_value - PRIOR_7C65A31_DELTA_0_5_P_B) < REPRODUCE_TOL;
      const reproC = Math.abs(phaseC.per_delta_results[reproDeltaIdx05].exact_p_value - PRIOR_7C65A31_DELTA_0_5_P_C) < REPRODUCE_TOL;
      const reproduceVerify = reproA && reproB && reproC;

      console.log('');
      console.log('[williams-delta-sensitivity-sweep] === 7c65a31 δ=0.5 baseline reproduce verify ===');
      console.log(
        `[williams-delta-sensitivity-sweep] Phase A δ=0.5 p=${phaseA.per_delta_results[reproDeltaIdx05].exact_p_value.toFixed(4)} vs prior=${PRIOR_7C65A31_DELTA_0_5_P_A.toFixed(4)} → reproduce=${reproA}`,
      );
      console.log(
        `[williams-delta-sensitivity-sweep] Phase B δ=0.5 p=${phaseB.per_delta_results[reproDeltaIdx05].exact_p_value.toFixed(4)} vs prior=${PRIOR_7C65A31_DELTA_0_5_P_B.toFixed(4)} → reproduce=${reproB}`,
      );
      console.log(
        `[williams-delta-sensitivity-sweep] Phase C δ=0.5 p=${phaseC.per_delta_results[reproDeltaIdx05].exact_p_value.toFixed(4)} vs prior=${PRIOR_7C65A31_DELTA_0_5_P_C.toFixed(4)} → reproduce=${reproC}`,
      );
      console.log(`[williams-delta-sensitivity-sweep] overall reproduce_verify=${reproduceVerify}`);

      // ── Hypothesis verdict logic ──
      // H_delta_invariant: 영역 phase 영역 영역 영역 영역 reject_unanimous=true AND
      //   p_range < 0.05 (모든 δ 영역 reject decision 동일, p 값 영역 영역 영역 영역).
      // H_delta_sensitive: 영역 phase 영역 영역 영역 reject_unanimous=false (δ choice 영역
      //   reject decision 영역 영역).
      // H_partial_delta_sensitivity: mixed — 일부 phase 영역 영역 영역.
      const phases = [phaseA, phaseB, phaseC];
      const allUnanimous = phases.every(p => p.reject_decisions_unanimous);
      const anyNonUnanimous = phases.some(p => !p.reject_decisions_unanimous);
      const maxRange = Math.max(...phases.map(p => p.delta_p_range));

      let overallVerdict:
        | 'H_delta_invariant'
        | 'H_delta_sensitive'
        | 'H_partial_delta_sensitivity';
      let overallEvidence: string;

      if (allUnanimous && maxRange < 0.05) {
        overallVerdict = 'H_delta_invariant';
        overallEvidence =
          '영역 3 phase (A/B/C) 영역 영역 영역 영역 δ ∈ {0.1, 0.5, 1.0} sweep 영역 reject decision (α=0.05) ' +
          `동일 AND max p_range=${maxRange.toFixed(4)} < 0.05 → δ choice 영역 verdict 영역 영역 영역 영역 ` +
          '— small N (5 / 5 / 3) + discrete sample space (56 / 56 / 20 outcomes) 영역 영역 영역 영역 영역 영역 영역.';
      } else if (anyNonUnanimous) {
        const nonUnanimousPhases = phases.filter(p => !p.reject_decisions_unanimous).map(p => p.phase_label);
        overallVerdict = 'H_delta_sensitive';
        overallEvidence =
          `영역 δ choice 영역 reject decision 영역 영역 영역 ${nonUnanimousPhases.length} phase: ` +
          `${nonUnanimousPhases.join(', ')}. additional indeterminacy on top of method choice (7c65a31 Conv 1 / ` +
          `Conv 2 / Conv 3 영역 영역). max p_range=${maxRange.toFixed(4)}. δ choice 영역 ad-hoc 영역 영역 영역 ` +
          '영역 정직 한계 영역 — α=0.05 reject 영역 δ choice 영역 영역 영역 영역.';
      } else {
        overallVerdict = 'H_partial_delta_sensitivity';
        overallEvidence =
          `mixed — reject decisions unanimous per phase 영역 단 max p_range=${maxRange.toFixed(4)} ≥ 0.05 (p 값 영역 영역 영역 영역). ` +
          'reject decision 영역 동일 단 effect size 영역 δ choice 영역 영역 영역.';
      }

      console.log('');
      console.log('[williams-delta-sensitivity-sweep] === Overall ===');
      console.log(`[williams-delta-sensitivity-sweep] overall_verdict=${overallVerdict}`);
      console.log(`[williams-delta-sensitivity-sweep] ${overallEvidence}`);

      // Comparison table — 3 δ values × 3 phases.
      console.log('');
      console.log('[williams-delta-sensitivity-sweep] === Comparison table (δ ∈ {0.1, 0.5, 1.0} × Phase A/B/C) ===');
      console.log(
        '[williams-delta-sensitivity-sweep] δ      | Phase A (T → p, reject@0.05) | Phase B (T → p, reject@0.05) | Phase C (T → p, reject@0.05)',
      );
      console.log(
        '[williams-delta-sensitivity-sweep] -------+------------------------------+------------------------------+------------------------------',
      );
      for (let i = 0; i < DELTA_SWEEP.length; i += 1) {
        const cfg = DELTA_SWEEP[i];
        const ra = phaseA.per_delta_results[i];
        const rb = phaseB.per_delta_results[i];
        const rc = phaseC.per_delta_results[i];
        const fmt = (r: PerDeltaResult): string => {
          return `T=${r.observed_statistic.toFixed(3).padStart(6)} → p=${r.exact_p_value.toFixed(4).padStart(6)}, rej=${r.rejects_at_alpha_005 ? 'Y' : 'N'}`;
        };
        console.log(
          `[williams-delta-sensitivity-sweep] ${('δ=' + cfg.delta.toString()).padEnd(6)} | ` +
            `${fmt(ra).padEnd(28)} | ${fmt(rb).padEnd(28)} | ${fmt(rc).padEnd(28)}`,
        );
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-williams-delta-sensitivity-sweep',
        elapsed_ms: elapsedMs,
        focused_scope: {
          analysis_type:
            'Existing Phase A/B/C open_palm winner data 영역 pure statistical reanalysis 영역 영역 영역 ' +
            'Conv 3 (symmetric Laplace, inside-log) T_sym(δ) = 2 Σ (E+δ) log((E+δ)/(O+δ)) δ ∈ {0.1, 0.5, 1.0} ' +
            'sensitivity sweep. NO SNN run, NO MediaPipe Hand encoder call. 직전 commit 7c65a31 영역 정직 한계 ' +
            '"Laplace smoothing δ=0.5 ad-hoc — δ sensitivity sweep 별도 R&D mandatory" 영역 직접 followup.',
          input_data: {
            phase_a_counts: PHASE_A_COUNTS,
            phase_b_counts: PHASE_B_COUNTS,
            phase_c_counts: PHASE_C_COUNTS,
            N_phase_a: N_AB,
            N_phase_b: N_AB,
            N_phase_c: N_C,
            K_clusters: K,
            prior_7c65a31_delta_0_5_p_A: PRIOR_7C65A31_DELTA_0_5_P_A,
            prior_7c65a31_delta_0_5_p_B: PRIOR_7C65A31_DELTA_0_5_P_B,
            prior_7c65a31_delta_0_5_p_C: PRIOR_7C65A31_DELTA_0_5_P_C,
            phase_a_source: 'open_palm untrained — counts=[1,0,4,0] (cluster 2 dominant)',
            phase_b_source: 'open_palm post-RSTDP — counts=[0,3,0,2] (cluster 1 + 3 active)',
            phase_c_source:
              'open_palm cluster sequence — counts=[0,1,2,0] (cluster 1 + 2 active, N=3)',
            zero_cluster_phase_a: '[1,0,4,0] → 2 zero clusters (idx 1, 3)',
            zero_cluster_phase_b: '[0,3,0,2] → 2 zero clusters (idx 0, 2)',
            zero_cluster_phase_c: '[0,1,2,0] → 2 zero clusters (idx 0, 3)',
          },
          delta_sweep: DELTA_SWEEP.map(cfg => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            citation: cfg.citation,
            description: cfg.description,
          })),
          conv3_formula:
            'T_sym(δ) = 2 Σ_{all i} (E_i + δ) × log((E_i + δ) / (O_i + δ)) — Williams 1976 §3 inspired ' +
            'symmetric Laplace (inside-log), both E and O smoothed by δ. factor 2 영역 7c65a31 baseline 영역 ' +
            '영역 — exact p 영역 outcome ordering 영역 영역 (factor 2 multiplicative 영역 영역 영역 영역).',
          exact_enumeration_method: {
            method:
              'Stars-and-bars enumeration of multinomial compositions (o_0, ..., o_{K-1}) s.t. Σ o_i = N. ' +
              'Total outcomes = C(N+K-1, K-1) — N=5/K=4 → 56, N=3/K=4 → 20.',
            framework_reuse:
              'Same exact enumeration framework as commits a1d6d4d / 6cfecf7 / 493f850 / 7c65a31. ' +
              'Multinomial PMF + outcome enumeration reused without modification — δ parameterized 영역 영역 확장.',
            exact_p_value_definition:
              'exact p(δ) = Σ P[outcome] over all outcomes with T_sym(δ)[outcome] ≥ T_sym(δ)[observed] (reject side rule).',
          },
          reproduce_verify_7c65a31: {
            phase_a_delta_0_5_p_current: phaseA.per_delta_results[reproDeltaIdx05].exact_p_value,
            phase_a_delta_0_5_p_prior: PRIOR_7C65A31_DELTA_0_5_P_A,
            phase_a_reproduce: reproA,
            phase_b_delta_0_5_p_current: phaseB.per_delta_results[reproDeltaIdx05].exact_p_value,
            phase_b_delta_0_5_p_prior: PRIOR_7C65A31_DELTA_0_5_P_B,
            phase_b_reproduce: reproB,
            phase_c_delta_0_5_p_current: phaseC.per_delta_results[reproDeltaIdx05].exact_p_value,
            phase_c_delta_0_5_p_prior: PRIOR_7C65A31_DELTA_0_5_P_C,
            phase_c_reproduce: reproC,
            overall_reproduce_verify: reproduceVerify,
            reproduce_tolerance: 1e-3,
          },
        },
        phase_a_analysis: phaseA,
        phase_b_analysis: phaseB,
        phase_c_analysis: phaseC,
        overall_verdict: {
          verdict: overallVerdict,
          evidence: overallEvidence,
          per_delta_summary: DELTA_SWEEP.map((cfg, i) => ({
            delta: cfg.delta,
            delta_label: cfg.delta_label,
            phase_a_observed: phaseA.per_delta_results[i].observed_statistic,
            phase_a_sign: phaseA.per_delta_results[i].observed_statistic_sign,
            phase_a_p: phaseA.per_delta_results[i].exact_p_value,
            phase_a_rejects_at_alpha_005: phaseA.per_delta_results[i].rejects_at_alpha_005,
            phase_b_observed: phaseB.per_delta_results[i].observed_statistic,
            phase_b_sign: phaseB.per_delta_results[i].observed_statistic_sign,
            phase_b_p: phaseB.per_delta_results[i].exact_p_value,
            phase_b_rejects_at_alpha_005: phaseB.per_delta_results[i].rejects_at_alpha_005,
            phase_c_observed: phaseC.per_delta_results[i].observed_statistic,
            phase_c_sign: phaseC.per_delta_results[i].observed_statistic_sign,
            phase_c_p: phaseC.per_delta_results[i].exact_p_value,
            phase_c_rejects_at_alpha_005: phaseC.per_delta_results[i].rejects_at_alpha_005,
          })),
          alpha: ALPHA,
          alpha_rationale:
            'α=0.05 standard convention (Fisher 1925 영역 historical). reject_at_alpha_005 = (exact_p < 0.05). ' +
            'reject_unanimous = (모든 δ 영역 reject decision 동일).',
          per_phase_summary: phases.map(p => ({
            phase_label: p.phase_label,
            p_min: p.delta_p_min,
            p_max: p.delta_p_max,
            p_range: p.delta_p_range,
            reject_decisions_unanimous: p.reject_decisions_unanimous,
            reject_count_at_alpha_005: p.per_delta_results.filter(r => r.rejects_at_alpha_005).length,
          })),
        },
        hypothesis_details: {
          definitions: {
            H_delta_invariant:
              '영역 3 phase 영역 영역 영역 영역 δ ∈ {0.1, 0.5, 1.0} sweep 영역 reject decision (α=0.05) 동일 ' +
              'AND max p_range < 0.05 → δ choice 영역 verdict 영역 영역 영역 영역 — rare 영역 영역 small N + ' +
              'discrete sample space 영역 영역 영역 영역 영역 영역 영역. ' +
              '**Mechanism (QA MEDIUM catch fix)**: T(δ) 영역 δ-dependent 단 (T(0.1)=11.608 / T(0.5)=6.003 / ' +
              'T(1.0)=4.235 Phase A) outcome ordering 영역 δ ∈ {0.1, 0.5, 1.0} 영역 영역 영역 보존 → exact p ' +
              'byte-identical — **monotonic transformation property** (sufficient condition for δ-invariance). ' +
              '**Verdict scope (QA MEDIUM catch fix)**: verdict ⊂ δ ∈ {0.1, 0.5, 1.0} 한정 — extrapolation 영역 ' +
              'X. δ → 0+ (singular limit at O=0) 또는 δ → ∞ (uniform smoothing) regime 영역 영역 영역 ordering ' +
              'preservation 영역 깨질 영역 영역 — broader continuous δ range (예: δ ∈ [0.01, 5.0]) 별도 R&D mandatory.',
            H_delta_sensitive:
              '영역 δ choice 영역 reject decision 영역 영역 영역 영역 phase ∃ — additional indeterminacy on top ' +
              'of method choice. δ choice 영역 ad-hoc 영역 영역 영역 영역 정직 한계 영역 — α=0.05 reject 영역 ' +
              'δ choice 영역 영역 영역 영역.',
            H_partial_delta_sensitivity:
              'mixed signal — reject decisions unanimous per phase 단 max p_range ≥ 0.05 (p 값 영역 영역 영역 ' +
              '영역). reject decision 영역 동일 단 effect size 영역 δ choice 영역 영역 영역.',
          },
          threshold_rationale:
            'δ_invariant criterion — (1) 영역 phase 영역 모든 δ 영역 reject decision (α=0.05) 동일 AND (2) max ' +
            'p_range < 0.05 (p 값 영역 영역 영역 영역). δ_sensitive criterion — 영역 phase 영역 reject decision ' +
            '영역 영역 영역 — δ choice 영역 reject 영역 결정 영역. δ choice 영역 ad-hoc 영역 영역 영역 — 영역 ' +
            'sweep 영역 sensitivity 영역 명시.',
          comparison_to_7c65a31_baseline:
            '7c65a31 (williams-formal-symmetric-convention) 영역 δ=0.5 single baseline — Phase A p=0.0625 ' +
            '(marginal proximity 단 fail-to-reject), Phase B p=0.1797 (fail-to-reject), Phase C p=0.6250 ' +
            '(fail-to-reject). 본 R&D 영역 δ ∈ {0.1, 1.0} 추가 — δ choice 영역 verdict 영역 영역 영역 영역 verify. ' +
            'Phase A δ=0.5 p=0.0625 영역 α=0.05 영역 0.0125 marginal → δ=0.1 영역 영역 영역 reject 영역 영역 영역 ' +
            '영역, δ=1.0 영역 영역 fail-to-reject 영역 영역 영역 영역 — 영역 case 영역 영역 verify.',
        },
        academic_alignment: [
          'Laplace 1812 — additive smoothing principle (δ choice 영역 기본 원리, both E and O smoothed by ' +
          'same δ).',
          'Williams 1976 — improved likelihood ratio for sparse contingency tables (§3 영역 inspired only, ' +
          '정확 form 영역 직접 verify 영역 영역 — 본 R&D 영역 interpretation choice).',
          'Read & Cressie 1988 §2.3 — continuity correction for power divergence.',
          'Cressie & Read 1984 §3 — power divergence limit forms (Convention 2 raw form 영역 reference).',
          'Fisher 1925 — Statistical Methods for Research Workers (α=0.05 historical convention).',
          'Cochran 1954 — E≥5 rule (본 R&D 영역 violation 영역 — N=5/K=4 영역 E=1.25, N=3/K=4 영역 E=0.75).',
          '7c65a31 — Williams 1976 §3 inspired symmetric Laplace δ=0.5 baseline (본 R&D 영역 baseline reproduce verify).',
          '493f850 — continuity correction R&D (Method 2 Williams δ outside-log variant — 7c65a31 영역 ' +
          'sufficient statistic equivalent 영역 영역).',
          '6cfecf7 — power divergence λ sweep R&D (Convention 2 raw +∞ rule reference).',
          'a1d6d4d — exact multinomial test framework (enumeration reused).',
        ],
        limitations: [
          'Existing data reanalysis 한정 (NO SNN run, NO MediaPipe Hand encoder call).',
          '3 δ values 한정 — full continuous δ sweep (예: δ ∈ [0.01, 5.0] step=0.05) 별도 R&D. δ=0.1 / 0.5 / ' +
          '1.0 영역 representative 영역 단 continuous behavior 영역 영역 영역.',
          'δ=0.5 reproduces 7c65a31 baseline (sanity check) — δ=0.1 / 1.0 영역 본 R&D novel.',
          'Conv 3 inside-log Laplace 영역 한정 — 영역 convention (Conv 1 zero-skip / Conv 2 strict +∞) 영역 δ ' +
          'sweep 별도 R&D (단 Conv 1 영역 δ-parameter 없음, Conv 2 영역 +∞ → δ 영역 영역 영역 — sufficient ' +
          'statistic equivalent 영역 493f850 Method 2 영역 동일 outcome 영역 expected).',
          'Williams δ Method 2 영역 outside-log additive count variant 영역 7c65a31 영역 영역 영역 영역 영역 ' +
          '영역 sufficient statistic equivalent 영역 — 본 R&D 영역 Conv 3 inside-log 한정 결과 영역 outside-log ' +
          'Williams δ Method 2 영역 동일 outcome 영역 expected (Cochran 1972 sufficient statistic principle). ' +
          '**QA LOW catch fix**: "expected" 영역 추정 영역 — direct verify (outside-log Method 2 δ ∈ {0.1, 1.0} ' +
          '영역 reproduce) 별도 R&D mandatory (7c65a31 영역 δ=0.5 한정 verified).',
          '**Monotonic ordering preservation hypothesis** (QA MEDIUM catch fix): δ-invariance 영역 root cause 영역 ' +
          'outcome ordering 영역 δ ∈ {0.1, 0.5, 1.0} 영역 영역 영역 보존 (T(δ=0.1) > T(δ=0.5) > T(δ=1.0) 영역 영역 ' +
          '단 outcome subset 영역 영역 영역 영역). δ → 0+ (singular at O=0) 또는 δ → ∞ (uniform smoothing) regime ' +
          '영역 영역 영역 ordering preservation 영역 깨질 영역 영역 — mathematical proof 별도 R&D mandatory.',
          '**δ label inconsistency note** (QA LOW catch fix): JSON serialization 영역 δ=1.0 영역 trailing zero ' +
          'strip → measurement.json 영역 `"delta": 1` (integer) 영역 표기, evidence string 영역 `δ=1` 영역 표기. ' +
          'cosmetic — frontend display 영역 robust label (예: `delta_1.0`) 영역 영역 적정 권고 (UI wire 시점).',
          'Exact enumeration N≤5 한정 (N≥10 Monte Carlo mandatory — Mehta & Patel 1983 network algorithm).',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 zero-cell pattern 보장 X.',
          'Frequentist: failure to reject ≠ accept H0 — exact p ≥ 0.05 영역 architectural bias 영역 "absence ' +
          'of evidence" 영역 영역 (evidence of absence 영역 영역 영역).',
          'Uniform null (p_i = 1/K) 한정 — non-uniform prior 영역 별도 R&D.',
          'Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative 영역 별도 R&D.',
          'α=0.05 standard convention 한정 — α=0.10 / α=0.01 영역 영역 reject decision 영역 영역 영역 영역 영역.',
          'factor 2 영역 7c65a31 baseline 영역 동일 — request 영역 factor 2 영역 영역 단 exact p 영역 outcome ' +
          'ordering 영역 영역 (multiplicative scaling 영역 영역 영역 영역) → reproduce verify 정합.',
        ],
        cross_reference: {
          prior_williams_formal_symmetric_convention: {
            test_path: 'tests/integration/hand-snn-williams-formal-symmetric-convention.test.ts',
            commit: '7c65a31',
            measurement_path: 'tests/integration/measurements/hand-snn-williams-formal-symmetric-convention.json',
            note:
              '정직 한계 명시 — "Laplace smoothing δ=0.5 ad-hoc — δ sensitivity sweep 별도 R&D mandatory". ' +
              '본 R&D 영역 직접 followup — δ ∈ {0.1, 0.5, 1.0} sensitivity sweep 영역 δ choice 영역 verdict 영역 ' +
              '영역 영역 영역 verify.',
          },
          prior_continuity_correction: {
            test_path: 'tests/integration/hand-snn-continuity-correction-zero-cell.test.ts',
            commit: '493f850',
            measurement_path: 'tests/integration/measurements/hand-snn-continuity-correction-zero-cell.json',
            note:
              'Method 2 Williams δ outside-log additive count variant 영역 reference — 7c65a31 영역 영역 영역 ' +
              '영역 영역 영역 sufficient statistic equivalent 영역.',
          },
          prior_power_divergence_lambda_sweep: {
            test_path: 'tests/integration/hand-snn-power-divergence-lambda-sweep.test.ts',
            commit: '6cfecf7',
            measurement_path: 'tests/integration/measurements/hand-snn-power-divergence-lambda-sweep.json',
            note: 'Convention 2 (strict +∞) raw rule reference — δ 영역 영역 영역 영역 영역 영역 영역 영역.',
          },
          prior_exact_multinomial_test: {
            test_path: 'tests/integration/hand-snn-exact-multinomial-test.test.ts',
            commit: 'a1d6d4d',
            measurement_path: 'tests/integration/measurements/hand-snn-exact-multinomial-test.json',
          },
        },
      };
      saveMeasurement('hand-snn-williams-delta-sensitivity-sweep', measurement);

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
      // PMF sum ≈ 1.0 per phase per δ
      expect(phaseA.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseA.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseB.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseB.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseC.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseC.sum_of_probabilities).toBeLessThan(1.001);
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(r.sum_of_pmf_total).toBeGreaterThan(0.999);
          expect(r.sum_of_pmf_total).toBeLessThan(1.001);
        }
      }
      // 3 δ values per phase.
      expect(phaseA.per_delta_results.length).toBe(DELTA_SWEEP.length);
      expect(phaseB.per_delta_results.length).toBe(DELTA_SWEEP.length);
      expect(phaseC.per_delta_results.length).toBe(DELTA_SWEEP.length);
      // exact p ∈ (0, 1] per (phase, δ).
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(r.exact_p_value).toBeGreaterThan(0);
          expect(r.exact_p_value).toBeLessThanOrEqual(1);
        }
      }
      // observed statistic positive (symmetric Laplace 영역 positive 영역 영역 영역 영역).
      for (const p of [phaseA, phaseB, phaseC]) {
        for (const r of p.per_delta_results) {
          expect(r.observed_statistic_is_finite).toBe(true);
          expect(r.observed_statistic_sign).toBe('positive');
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
      // 7c65a31 δ=0.5 baseline reproduce verify (sanity check).
      expect(reproduceVerify).toBe(true);
      // overall verdict ∈ allowed set.
      expect([
        'H_delta_invariant',
        'H_delta_sensitive',
        'H_partial_delta_sensitivity',
      ]).toContain(overallVerdict);

      // QA LOW catch fix: REPRODUCE_TOL 영역 reproduce_verify 영역 직접 사용 (`< REPRODUCE_TOL`) — void statement 제거.

      console.log('');
      console.log('[williams-delta-sensitivity-sweep] === Summary ===');
      console.log(`[williams-delta-sensitivity-sweep] overall_verdict=${overallVerdict}`);
      console.log(`[williams-delta-sensitivity-sweep] reproduce_7c65a31_delta_0_5=${reproduceVerify}`);
      console.log(`[williams-delta-sensitivity-sweep] elapsed_ms=${elapsedMs}`);
    },
  );
});
