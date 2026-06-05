// Hand SNN — Exact multinomial test (Read & Cressie 1988) 영역 statistical reanalysis R&D.
// (Existing tie-break (commit 15f9381) + multinomial chi-squared (commit 9e139ec)
//  Phase A/B/C winner data 영역 pure statistical reanalysis — no SNN run, no
//  MediaPipe Hand encoder call. Cochran 1954 E≥5 rule violation 영역 직접 해결 —
//  exact p-value enumeration 영역 chi-squared approximation 한계 해소.)
//
// 컨텍스트 (2026-05-30): 직전 commit 9e139ec (hand-snn-multinomial-bootstrap-ci-
// analysis) 영역 정직 한계 명시 — "Multinomial chi-squared 영역 large-sample
// approximation (df=3, k=4 영역 N=5 / N=3 영역 영역 영역 small — Cochran 1954
// E≥5 per cell rule 영역 violated, E=N/K=1.25 < 5) — exact multinomial test
// (permutation / Fisher-type) 영역 별도 R&D". 본 R&D 영역 directly followup —
// Read & Cressie 1988 power divergence statistic family 영역 exact enumeration
// 영역 unreliable chi-squared p 영역 영역 영역 exact distribution.
//
// 시나리오 (focused scope, pure statistical enumeration):
//   - Phase A initial winners: [2, 0, 2, 2, 2] (N=5, K=4) — open_palm untrained.
//   - Phase B trained winners: [1, 3, 1, 1, 3] (N=5, K=4) — open_palm post R-STDP.
//   - Phase C sequence winners: [1, 2, 2] (N=3, K=4) — open_palm cluster sequence.
//
// Exact computation — enumerate all multinomial outcomes (compositions of N
// into K bins):
//   - N=5, K=4 → C(N+K-1, K-1) = C(8, 3) = 56 distributions (Phase A, B).
//   - N=3, K=4 → C(N+K-1, K-1) = C(6, 3) = 20 distributions (Phase C).
//   - Each outcome (o_0, o_1, ..., o_{K-1}) with Σo_i = N:
//     - multinomial PMF under uniform null: P = (N! / Π o_i!) · (1/K)^N
//     - chi-squared statistic: X² = Σ((o_i - E)² / E), E = N/K
//     - G² (likelihood ratio): G² = 2 · Σ o_i · log(o_i / E) (0·log0 = 0)
//     - Cressie-Read λ=2/3: T(λ) = (2 / (λ·(λ+1))) · Σ o_i · ((o_i/E)^λ - 1)
//   - exact p = Σ P[outcome] over outcomes with statistic ≥ observed.
//
// 측정 metrics (per Phase):
//   - observed_chi_squared / observed_g_squared / observed_power_divergence_2_3
//   - exact_p_chi_squared / exact_p_g_squared / exact_p_power_divergence_2_3
//   - multinomial_pmf_observed (observed outcome's PMF under uniform null)
//   - total_enumerated_outcomes (verification of C(N+K-1, K-1))
//   - sum_of_probabilities (verification ≈ 1.0)
//
// hypothesis verdicts (per Phase):
//   - H_exact_significant: 모든 statistic 영역 exact p < 0.05 (3/3 consistent).
//   - H_exact_marginal: 영역 statistic 영역 p < 0.05 단 영역 영역 영역 영역 (mixed).
//   - H_exact_not_significant: 모든 statistic 영역 exact p ≥ 0.05 (uniform null
//     failure to reject).
//
// 학술 정합:
//   - Pearson 1900 — chi-squared statistic.
//   - Fisher 1922 — exact test method.
//   - Wilks 1938 — likelihood ratio statistic (G²).
//   - Cochran 1954 — E≥5 rule (본 R&D 영역 violation 해결).
//   - Read & Cressie 1988 — power divergence statistic family (Cressie-Read).

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Statistical helpers ──

// Counts observed per cluster (length K) from raw winners array (-1 ignored).
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

// chi-squared statistic — Σ((O - E)^2 / E), E = N/K uniform null.
function chiSquared(counts: number[], E: number): number {
  if (E <= 0) return 0;
  let chi = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const diff = counts[i] - E;
    chi += (diff * diff) / E;
  }
  return chi;
}

// G² (likelihood ratio, Wilks 1938) — 2 · Σ O · log(O/E), 0·log0 = 0.
function gSquared(counts: number[], E: number): number {
  if (E <= 0) return 0;
  let g = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    if (o > 0) {
      g += o * Math.log(o / E);
    }
  }
  return 2 * g;
}

// Cressie-Read power divergence (Read & Cressie 1988) — λ ∈ ℝ.
// T(λ) = (2 / (λ·(λ+1))) · Σ O · ((O/E)^λ - 1).
// 영역 영역 영역 영역 limit: λ→0 영역 G² (Wilks), λ→-1 영역 modified LR, λ=1 영역
// χ² (Neyman). λ=2/3 영역 small-sample recommended (Read & Cressie 1988 §5).
function powerDivergence(counts: number[], E: number, lambda: number): number {
  if (E <= 0) return 0;
  if (Math.abs(lambda) < 1e-12) {
    // Limit λ→0: G² (Wilks).
    return gSquared(counts, E);
  }
  if (Math.abs(lambda + 1) < 1e-12) {
    // Limit λ→-1: 2 Σ E · log(E/O) (modified LR).
    let s = 0;
    for (let i = 0; i < counts.length; i += 1) {
      const o = counts[i];
      if (o > 0) s += E * Math.log(E / o);
    }
    return 2 * s;
  }
  const factor = 2 / (lambda * (lambda + 1));
  let s = 0;
  for (let i = 0; i < counts.length; i += 1) {
    const o = counts[i];
    if (o > 0) {
      s += o * (Math.pow(o / E, lambda) - 1);
    } else {
      // o=0 → o·((o/E)^λ - 1) = 0 (treat 0·anything = 0).
      s += 0;
    }
  }
  return factor * s;
}

// Multinomial log-PMF under uniform null (p_i = 1/K, ∀i):
//   log P = log(N!) - Σ log(o_i!) + N · log(1/K) = log(N!) - Σ log(o_i!) - N·log(K).
function logMultinomialPmfUniform(counts: number[], N: number, K: number): number {
  let logP = logFactorial(N) - N * Math.log(K);
  for (let i = 0; i < counts.length; i += 1) {
    logP -= logFactorial(counts[i]);
  }
  return logP;
}

// Enumerate all multinomial compositions — (o_0, ..., o_{K-1}) s.t. Σ o_i = N.
// Recursive: generate all (k_0, ...) where 0 ≤ k_i ≤ N and remainder distributed.
// Total = C(N+K-1, K-1) — stars-and-bars.
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

// ── Exact multinomial test per phase ──

interface ExactPhaseResult {
  phase_label: string;
  winners: number[];
  N: number;
  K: number;
  counts_by_cluster: number[];
  expected_per_cell: number;
  cochran_violation: boolean; // E < 5 → Cochran 1954 rule violated.
  observed_chi_squared: number;
  observed_g_squared: number;
  observed_power_divergence_2_3: number;
  multinomial_pmf_observed: number;
  total_enumerated_outcomes: number;
  expected_outcomes_combinatorial: number; // C(N+K-1, K-1) verify.
  sum_of_probabilities: number;
  exact_p_chi_squared: number;
  exact_p_g_squared: number;
  exact_p_power_divergence_2_3: number;
  // Comparison to commit 9e139ec chi-squared approximation p-value.
  approx_p_chi_squared_wilson_hilferty: number;
  approx_vs_exact_chi_squared_delta: number;
  hypothesis_verdict:
    | 'H_exact_significant'
    | 'H_exact_marginal'
    | 'H_exact_not_significant';
  evidence: string;
}

// C(n, k) — binomial coefficient via log-gamma (avoid overflow).
function binomial(n: number, k: number): number {
  return Math.round(Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1)));
}

// Wilson-Hilferty chi-squared survival (df=3) — commit 9e139ec parity comparison.
function normalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}
function chiSquaredSurvivalWH(chi: number, df: number): number {
  if (chi <= 0 || df <= 0) return 1;
  const ratio = chi / df;
  const cubeRoot = Math.cbrt(ratio);
  const a = 2 / (9 * df);
  const z = (cubeRoot - (1 - a)) / Math.sqrt(a);
  return 1 - normalCdf(z);
}

function analyzePhaseExact(
  label: string,
  winners: number[],
  K: number,
  lambdaCR: number,
): ExactPhaseResult {
  const N = winners.length;
  const counts = countsByCluster(winners, K);
  const E = N / K;
  const cochranViolation = E < 5;

  // Observed statistics.
  const observedChi = chiSquared(counts, E);
  const observedG = gSquared(counts, E);
  const observedPD = powerDivergence(counts, E, lambdaCR);
  const observedLogPmf = logMultinomialPmfUniform(counts, N, K);
  const observedPmf = Math.exp(observedLogPmf);

  // Enumerate all outcomes.
  const outcomes = enumerateCompositions(N, K);
  const expectedCount = binomial(N + K - 1, K - 1);

  // For each outcome, compute statistic + PMF.
  let sumPmf = 0;
  let exactPChi = 0;
  let exactPG = 0;
  let exactPPD = 0;

  // Use small epsilon for floating-point tolerance — statistic >= observed.
  const EPS = 1e-9;

  for (const outcome of outcomes) {
    const logPmf = logMultinomialPmfUniform(outcome, N, K);
    const pmf = Math.exp(logPmf);
    sumPmf += pmf;
    const oChi = chiSquared(outcome, E);
    const oG = gSquared(outcome, E);
    const oPD = powerDivergence(outcome, E, lambdaCR);
    if (oChi >= observedChi - EPS) exactPChi += pmf;
    if (oG >= observedG - EPS) exactPG += pmf;
    if (oPD >= observedPD - EPS) exactPPD += pmf;
  }

  // Commit 9e139ec parity — Wilson-Hilferty approximation p-value (chi-squared).
  const approxPChi = chiSquaredSurvivalWH(observedChi, K - 1);
  const approxVsExactDelta = exactPChi - approxPChi;

  // hypothesis verdict — multi-statistic consistency.
  const sigCount =
    (exactPChi < 0.05 ? 1 : 0) +
    (exactPG < 0.05 ? 1 : 0) +
    (exactPPD < 0.05 ? 1 : 0);
  let verdict: 'H_exact_significant' | 'H_exact_marginal' | 'H_exact_not_significant';
  if (sigCount === 3) verdict = 'H_exact_significant';
  else if (sigCount === 0) verdict = 'H_exact_not_significant';
  else verdict = 'H_exact_marginal';

  const evidence =
    `${label}: winners=[${winners.join(', ')}] (N=${N}, K=${K}), ` +
    `counts=[${counts.join(', ')}], E=N/K=${E.toFixed(3)} ` +
    `(Cochran 1954 E≥5 violated: ${cochranViolation}), ` +
    `observed χ²=${observedChi.toFixed(3)} → exact p=${exactPChi.toFixed(4)} ` +
    `(W&H approx p=${approxPChi.toFixed(4)}, Δ=${approxVsExactDelta.toFixed(4)}), ` +
    `observed G²=${observedG.toFixed(3)} → exact p=${exactPG.toFixed(4)}, ` +
    `observed Cressie-Read λ=2/3=${observedPD.toFixed(3)} → exact p=${exactPPD.toFixed(4)}, ` +
    `enumerated=${outcomes.length} (expected C(${N + K - 1},${K - 1})=${expectedCount}), ` +
    `Σ pmf=${sumPmf.toFixed(6)}.`;

  return {
    phase_label: label,
    winners: winners.slice(),
    N,
    K,
    counts_by_cluster: counts,
    expected_per_cell: E,
    cochran_violation: cochranViolation,
    observed_chi_squared: observedChi,
    observed_g_squared: observedG,
    observed_power_divergence_2_3: observedPD,
    multinomial_pmf_observed: observedPmf,
    total_enumerated_outcomes: outcomes.length,
    expected_outcomes_combinatorial: expectedCount,
    sum_of_probabilities: sumPmf,
    exact_p_chi_squared: exactPChi,
    exact_p_g_squared: exactPG,
    exact_p_power_divergence_2_3: exactPPD,
    approx_p_chi_squared_wilson_hilferty: approxPChi,
    approx_vs_exact_chi_squared_delta: approxVsExactDelta,
    hypothesis_verdict: verdict,
    evidence,
  };
}

// CI conditional skip — pure stat enumeration 영역 가벼움 영역 timeout 60s.
const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Exact multinomial test (Read & Cressie 1988) reanalysis R&D', () => {
  it.skipIf(skipHeavy)(
    '★ Exact multinomial test 영역 Phase A/B/C Cochran violation 직접 해결',
    { timeout: 60000 },
    async () => {
      const startedAtMs = Date.now();

      // Existing tie-break (commit 15f9381) + multinomial bootstrap CI (9e139ec)
      // Phase A/B/C open_palm winner data — verbatim 인용 (NO SNN run).
      const PHASE_A_WINNERS = [2, 0, 2, 2, 2]; // open_palm untrained.
      const PHASE_B_WINNERS = [1, 3, 1, 1, 3]; // open_palm post-RSTDP.
      const PHASE_C_WINNERS = [1, 2, 2];       // open_palm cluster sequence variants.
      const K = 4;
      const LAMBDA_CR = 2 / 3; // Read & Cressie 1988 §5 small-sample recommendation.

      const phaseAStat = analyzePhaseExact('Phase A (untrained)', PHASE_A_WINNERS, K, LAMBDA_CR);
      const phaseBStat = analyzePhaseExact('Phase B (trained)', PHASE_B_WINNERS, K, LAMBDA_CR);
      const phaseCStat = analyzePhaseExact('Phase C (sequence)', PHASE_C_WINNERS, K, LAMBDA_CR);

      console.log('');
      console.log('[exact-multinomial] === Phase A (untrained) ===');
      console.log(`[exact-multinomial] ${phaseAStat.evidence}`);
      console.log(`[exact-multinomial] verdict=${phaseAStat.hypothesis_verdict}`);
      console.log('');
      console.log('[exact-multinomial] === Phase B (trained) ===');
      console.log(`[exact-multinomial] ${phaseBStat.evidence}`);
      console.log(`[exact-multinomial] verdict=${phaseBStat.hypothesis_verdict}`);
      console.log('');
      console.log('[exact-multinomial] === Phase C (sequence) ===');
      console.log(`[exact-multinomial] ${phaseCStat.evidence}`);
      console.log(`[exact-multinomial] verdict=${phaseCStat.hypothesis_verdict}`);

      // Overall verdict — multi-phase consistency.
      const verdicts = [
        phaseAStat.hypothesis_verdict,
        phaseBStat.hypothesis_verdict,
        phaseCStat.hypothesis_verdict,
      ];
      const sigCount = verdicts.filter(v => v === 'H_exact_significant').length;
      const marginalCount = verdicts.filter(v => v === 'H_exact_marginal').length;
      const notSigCount = verdicts.filter(v => v === 'H_exact_not_significant').length;
      let overallVerdict: 'H_exact_significant' | 'H_exact_marginal' | 'H_exact_not_significant';
      let overallEvidence: string;
      if (sigCount === verdicts.length) {
        overallVerdict = 'H_exact_significant';
        overallEvidence =
          '모든 3 phase (A/B/C) 영역 exact p-value (χ² / G² / Cressie-Read λ=2/3) ' +
          '모두 < 0.05 — uniform null exact rejection (Cochran violation 해결 후 architectural bias confirmed).';
      } else if (notSigCount === verdicts.length) {
        overallVerdict = 'H_exact_not_significant';
        overallEvidence =
          '모든 3 phase 영역 exact p-value (3 statistic) 모두 ≥ 0.05 — uniform null exact failure to reject ' +
          '(architectural bias 영역 statistical evidence 영역 부족 in current N, Cochran violation 해결 후 정직).';
      } else {
        overallVerdict = 'H_exact_marginal';
        overallEvidence =
          `phase 영역 영역 영역 verdict 영역 mixed — H_exact_significant=${sigCount}, ` +
          `H_exact_marginal=${marginalCount}, H_exact_not_significant=${notSigCount} / ${verdicts.length}. ` +
          'partial systematic catch — broader N / phase sample 영역 별도 R&D 필요.';
      }

      console.log('');
      console.log('[exact-multinomial] === Overall ===');
      console.log(`[exact-multinomial] overall_verdict=${overallVerdict}`);
      console.log(`[exact-multinomial] ${overallEvidence}`);

      // Comparison block — commit 9e139ec W&H approximation vs exact.
      console.log('');
      console.log('[exact-multinomial] === Wilson-Hilferty approx vs exact p (commit 9e139ec parity) ===');
      console.log(
        `[exact-multinomial] Phase A χ²: approx p=${phaseAStat.approx_p_chi_squared_wilson_hilferty.toFixed(4)} ` +
        `vs exact p=${phaseAStat.exact_p_chi_squared.toFixed(4)} (Δ=${phaseAStat.approx_vs_exact_chi_squared_delta.toFixed(4)})`,
      );
      console.log(
        `[exact-multinomial] Phase B χ²: approx p=${phaseBStat.approx_p_chi_squared_wilson_hilferty.toFixed(4)} ` +
        `vs exact p=${phaseBStat.exact_p_chi_squared.toFixed(4)} (Δ=${phaseBStat.approx_vs_exact_chi_squared_delta.toFixed(4)})`,
      );
      console.log(
        `[exact-multinomial] Phase C χ²: approx p=${phaseCStat.approx_p_chi_squared_wilson_hilferty.toFixed(4)} ` +
        `vs exact p=${phaseCStat.exact_p_chi_squared.toFixed(4)} (Δ=${phaseCStat.approx_vs_exact_chi_squared_delta.toFixed(4)})`,
      );

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-exact-multinomial-test',
        elapsed_ms: elapsedMs,
        focused_scope: {
          analysis_type:
            'Existing tie-break (commit 15f9381) + multinomial bootstrap CI (commit 9e139ec) ' +
            'Phase A/B/C open_palm winner data 영역 pure statistical reanalysis via EXACT multinomial ' +
            'enumeration. NO SNN run, NO MediaPipe Hand encoder call. Cochran 1954 E≥5 rule violation ' +
            '(E=N/K=1.25 < 5) 영역 chi-squared approximation 한계 → exact p-value enumeration 영역 직접 해결. ' +
            'Read & Cressie 1988 power divergence statistic family (χ², G², λ=2/3) 영역 exact distribution.',
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
          exact_enumeration_method: {
            method:
              'Stars-and-bars enumeration of multinomial compositions (o_0, ..., o_{K-1}) s.t. Σ o_i = N. ' +
              'Total outcomes = C(N+K-1, K-1) — N=5/K=4 → 56, N=3/K=4 → 20.',
            multinomial_pmf_under_uniform_null:
              'P(o_0, ..., o_{K-1}) = (N! / Π o_i!) · (1/K)^N — uniform null p_i = 1/K.',
            exact_p_value_definition:
              'exact p = Σ P[outcome] over all outcomes with statistic ≥ observed statistic. ' +
              'No large-sample approximation — Cochran 1954 E≥5 violation 영역 직접 회피.',
          },
          statistics_tested: {
            chi_squared_pearson_1900: 'X² = Σ((O_i - E)² / E), E = N/K (Pearson 1900).',
            g_squared_wilks_1938: 'G² = 2 · Σ O_i · log(O_i / E), 0·log0 := 0 (Wilks 1938 LR).',
            cressie_read_lambda_2_3:
              'T(λ) = (2 / (λ·(λ+1))) · Σ O_i · ((O_i/E)^λ - 1), λ=2/3 ' +
              '(Read & Cressie 1988 §5 small-sample recommendation).',
          },
          power_divergence_family_note:
            'Cressie-Read T(λ) family — λ=1: Pearson χ², λ→0: Wilks G², λ=-1/2: Freeman-Tukey, ' +
            'λ=-1: modified LR, λ=2/3: Cressie-Read recommended for small samples (본 R&D 영역 ' +
            'λ=2/3 단 선택 — λ ∈ {-1, -1/2, 0, 1} 영역 broader sweep 별도 R&D).',
          cochran_1954_violation_resolution:
            'E = N/K = 5/4 = 1.25 (Phase A, B) / 3/4 = 0.75 (Phase C) → all cells < 5. ' +
            'Cochran 1954 chi-squared expected count rule violated → large-sample p-value ' +
            '(Wilson & Hilferty 1931 W&H approximation, commit 9e139ec) UNRELIABLE. ' +
            '본 R&D 영역 exact multinomial enumeration 영역 직접 해결 — no approximation, no asymptotic limit.',
        },
        phase_a_analysis: phaseAStat,
        phase_b_analysis: phaseBStat,
        phase_c_analysis: phaseCStat,
        overall_verdict: {
          verdict: overallVerdict,
          evidence: overallEvidence,
          per_phase_verdicts: {
            phase_a: phaseAStat.hypothesis_verdict,
            phase_b: phaseBStat.hypothesis_verdict,
            phase_c: phaseCStat.hypothesis_verdict,
          },
        },
        comparison_to_commit_9e139ec_approximation: {
          note:
            'Commit 9e139ec Wilson & Hilferty 1931 cubic-root normal approximation p-value vs ' +
            'exact multinomial enumeration p-value (chi-squared statistic, df=3) — Cochran 1954 ' +
            'E≥5 violation 영역 영역 영역 영역 영역 difference 영역 정량.',
          phase_a: {
            chi_squared_observed: phaseAStat.observed_chi_squared,
            approx_p_wilson_hilferty: phaseAStat.approx_p_chi_squared_wilson_hilferty,
            exact_p_enumeration: phaseAStat.exact_p_chi_squared,
            delta_exact_minus_approx: phaseAStat.approx_vs_exact_chi_squared_delta,
          },
          phase_b: {
            chi_squared_observed: phaseBStat.observed_chi_squared,
            approx_p_wilson_hilferty: phaseBStat.approx_p_chi_squared_wilson_hilferty,
            exact_p_enumeration: phaseBStat.exact_p_chi_squared,
            delta_exact_minus_approx: phaseBStat.approx_vs_exact_chi_squared_delta,
          },
          phase_c: {
            chi_squared_observed: phaseCStat.observed_chi_squared,
            approx_p_wilson_hilferty: phaseCStat.approx_p_chi_squared_wilson_hilferty,
            exact_p_enumeration: phaseCStat.exact_p_chi_squared,
            delta_exact_minus_approx: phaseCStat.approx_vs_exact_chi_squared_delta,
          },
        },
        hypothesis_details: {
          definitions: {
            H_exact_significant:
              '모든 3 statistic (χ² / G² / Cressie-Read λ=2/3) 영역 exact p-value < 0.05 — ' +
              'uniform null rejection consistent across statistic choice. ' +
              '**Caveat (small N regime)**: N+K-1 choose K-1 enumeration 영역 영역 영역 영역 영역 ' +
              'discrete sample space 영역 영역 영역 statistic family 영역 outcome ranking 영역 ' +
              'identical induce — small N 영역 (N≤10) 영역 verdict 영역 trivially 3/3 consistent — ' +
              '"robust significance" claim 영역 distinguishing power 영역 N≥20 영역 emerge. broader N ' +
              '영역 영역 statistic divergence 영역 발생 영역 영역 (Read & Cressie 1988 Table 1 ' +
              '영역).',
            H_exact_marginal:
              '영역 statistic 영역 exact p < 0.05 단 영역 영역 영역 영역 (mixed signal) — ' +
              'statistic choice 영역 영역 영역 영역 영역 — 영역 영역 R&D 영역 영역. ' +
              '**Dead branch caveat (small N regime)**: N+K-1 choose K-1 enumeration + discrete ' +
              'uniform null 영역 영역 영역 3 statistic 영역 ranking 영역 동일 induce — small N ' +
              '영역 (본 R&D: N=5/3) 영역 marginal verdict 영역 trigger 영역 영역 영역 영역 영역 ' +
              '(영역 trivially H_exact_significant 또는 H_exact_not_significant 영역 영역). broader ' +
              'N regime / non-discrete null 영역 영역 marginal verdict 영역 활용 가능.',
            H_exact_not_significant:
              '모든 3 statistic 영역 exact p ≥ 0.05 — uniform null failure to reject ' +
              '(insufficient statistical evidence even after Cochran violation resolution). ' +
              '**Note (small N regime)**: small N + discrete null 영역 영역 ' +
              '3 statistic 영역 exact p identical — 영역 verdict 영역 robust 영역 영역 영역 single ' +
              'statistic 영역 결과 영역 영역 (statistic family 영역 disagreement 영역 영역 영역).',
          },
          threshold_rationale:
            'Multi-statistic consistency criterion — Cressie-Read 1984 power divergence family ' +
            '영역 영역 영역 statistic (λ=1, λ→0, λ=2/3) 영역 simultaneous p<0.05 영역 보수적 ' +
            'significance criterion. statistic 영역 영역 영역 영역 영역 영역 영역 영역 ' +
            'robust 영역 stance.',
          frequentist_note:
            'Exact multinomial test — N+K-1 choose K-1 outcome 영역 enumerate, multinomial PMF ' +
            'under uniform null 영역 영역 statistic ≥ observed 영역 영역 sum. Cochran 1954 E≥5 ' +
            'rule 영역 영역 영역 영역 — large-sample approximation 영역 영역 영역. ' +
            'Read & Cressie 1988 power divergence family 영역 single λ=2/3 한정 — ' +
            'broader λ sweep 별도 R&D. Pearson 1900 / Wilks 1938 / Fisher 1922 정합.',
        },
        academic_alignment: [
          'Pearson 1900 — chi-squared statistic X² = Σ((O-E)²/E).',
          'Fisher 1922 — exact test method (enumeration over discrete sample space).',
          'Wilks 1938 — likelihood ratio statistic G² = 2 Σ O log(O/E).',
          'Cochran 1954 — chi-squared expected count rule (E ≥ 5 per cell, 본 R&D 영역 violation 직접 해결).',
          'Read & Cressie 1988 — power divergence statistic family (Cressie-Read T(λ)), ' +
          'λ=2/3 small-sample recommendation.',
          'Wilson & Hilferty 1931 — chi-squared cubic-root normal approximation ' +
          '(commit 9e139ec parity — 본 R&D 영역 영역 영역 영역 영역 영역).',
        ],
        limitations: [
          'Existing data reanalysis 한정 — broader seed pool / sequence permutation 별도 R&D.',
          'Read & Cressie 1988 λ=2/3 영역 small-sample 영역 recommended 단 power divergence family ' +
          '영역 영역 영역 (λ=0 LR, λ=1 χ², λ=-1 modified LR, λ=-1/2 Freeman-Tukey) 영역 별도 R&D.',
          'Exact enumeration 영역 N+K-1 choose K-1 outcomes — N=5/K=4 영역 56, N=3/K=4 영역 20. ' +
          'larger N (예: N=50/K=4 → C(53,3) = 23,426) 영역 enumeration 영역 영역 영역 영역 — ' +
          'sampling 영역 Monte Carlo exact (Mehta & Patel 1983 network algorithm 등) mandatory.',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 significance pattern 보장 X.',
          'Frequentist: failure to reject ≠ accept H0 — exact p ≥ 0.05 영역 architectural bias 영역 ' +
          '"absence of evidence" 영역 영역 (evidence of absence 영역 영역 영역).',
          'Uniform null (p_i = 1/K) 한정 — non-uniform prior (예: cluster-specific) 영역 별도 R&D.',
          'Single-tailed test (observed statistic ≥ threshold) — two-tailed / specific alternative ' +
          '(예: cluster X 영역 specific majority) 영역 별도 R&D.',
          'PMF computation 영역 Lanczos lgamma + Math.exp — small N (≤ 50) 영역 영역 영역 정확 ' +
          '단 larger N 영역 log-space sum-exp 영역 영역 영역.',
        ],
        cross_reference: {
          prior_multinomial_bootstrap_ci: {
            test_path: 'tests/integration/hand-snn-multinomial-bootstrap-ci-analysis.test.ts',
            commit: '9e139ec',
            measurement_path: 'tests/integration/measurements/hand-snn-multinomial-bootstrap-ci-analysis.json',
            note:
              'Frequentist note 영역 명시 — "Multinomial chi-squared 영역 large-sample approximation ' +
              '(df=3, k=4 영역 N=5 / N=3 영역 영역 영역 small — Cochran 1954 E≥5 per cell rule 영역 violated, ' +
              'E=N/K=1.25 < 5) — exact multinomial test (permutation / Fisher-type) 영역 별도 R&D". ' +
              '본 R&D 영역 직접 followup — Read & Cressie 1988 exact enumeration 영역 해결.',
          },
          prior_tie_break_mechanism_analysis: {
            test_path: 'tests/integration/hand-snn-tie-break-mechanism-analysis.test.ts',
            commit: '15f9381',
            measurement_path: 'tests/integration/measurements/hand-snn-tie-break-mechanism-analysis.json',
          },
        },
      };
      saveMeasurement('hand-snn-exact-multinomial-test', measurement);

      // 검증 assertion — measurement R&D (verdict reject 없음).
      expect(phaseAStat.N).toBe(5);
      expect(phaseBStat.N).toBe(5);
      expect(phaseCStat.N).toBe(3);
      expect(phaseAStat.K).toBe(K);
      expect(phaseBStat.K).toBe(K);
      expect(phaseCStat.K).toBe(K);
      // Combinatorial verification — C(N+K-1, K-1).
      expect(phaseAStat.total_enumerated_outcomes).toBe(56); // C(8,3)
      expect(phaseAStat.expected_outcomes_combinatorial).toBe(56);
      expect(phaseBStat.total_enumerated_outcomes).toBe(56);
      expect(phaseCStat.total_enumerated_outcomes).toBe(20); // C(6,3)
      expect(phaseCStat.expected_outcomes_combinatorial).toBe(20);
      // PMF sum ≈ 1.0 — enumeration completeness verify (Cressie-Read 1984 §3.1).
      expect(phaseAStat.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseAStat.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseBStat.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseBStat.sum_of_probabilities).toBeLessThan(1.001);
      expect(phaseCStat.sum_of_probabilities).toBeGreaterThan(0.999);
      expect(phaseCStat.sum_of_probabilities).toBeLessThan(1.001);
      // exact p ∈ (0, 1].
      expect(phaseAStat.exact_p_chi_squared).toBeGreaterThan(0);
      expect(phaseAStat.exact_p_chi_squared).toBeLessThanOrEqual(1);
      expect(phaseAStat.exact_p_g_squared).toBeGreaterThan(0);
      expect(phaseAStat.exact_p_g_squared).toBeLessThanOrEqual(1);
      expect(phaseAStat.exact_p_power_divergence_2_3).toBeGreaterThan(0);
      expect(phaseAStat.exact_p_power_divergence_2_3).toBeLessThanOrEqual(1);
      // Cochran violation verify — E = N/K < 5 (all 3 phases).
      expect(phaseAStat.cochran_violation).toBe(true);
      expect(phaseBStat.cochran_violation).toBe(true);
      expect(phaseCStat.cochran_violation).toBe(true);
      // verdict ∈ allowed set.
      expect([
        'H_exact_significant',
        'H_exact_marginal',
        'H_exact_not_significant',
      ]).toContain(phaseAStat.hypothesis_verdict);
      expect([
        'H_exact_significant',
        'H_exact_marginal',
        'H_exact_not_significant',
      ]).toContain(phaseBStat.hypothesis_verdict);
      expect([
        'H_exact_significant',
        'H_exact_marginal',
        'H_exact_not_significant',
      ]).toContain(phaseCStat.hypothesis_verdict);
      expect([
        'H_exact_significant',
        'H_exact_marginal',
        'H_exact_not_significant',
      ]).toContain(overallVerdict);

      console.log('');
      console.log('[exact-multinomial] === Summary ===');
      console.log(
        `[exact-multinomial] Phase A: exact p (χ²/G²/CR-2/3)=` +
        `${phaseAStat.exact_p_chi_squared.toFixed(4)}/` +
        `${phaseAStat.exact_p_g_squared.toFixed(4)}/` +
        `${phaseAStat.exact_p_power_divergence_2_3.toFixed(4)}, ` +
        `verdict=${phaseAStat.hypothesis_verdict}`,
      );
      console.log(
        `[exact-multinomial] Phase B: exact p (χ²/G²/CR-2/3)=` +
        `${phaseBStat.exact_p_chi_squared.toFixed(4)}/` +
        `${phaseBStat.exact_p_g_squared.toFixed(4)}/` +
        `${phaseBStat.exact_p_power_divergence_2_3.toFixed(4)}, ` +
        `verdict=${phaseBStat.hypothesis_verdict}`,
      );
      console.log(
        `[exact-multinomial] Phase C: exact p (χ²/G²/CR-2/3)=` +
        `${phaseCStat.exact_p_chi_squared.toFixed(4)}/` +
        `${phaseCStat.exact_p_g_squared.toFixed(4)}/` +
        `${phaseCStat.exact_p_power_divergence_2_3.toFixed(4)}, ` +
        `verdict=${phaseCStat.hypothesis_verdict}`,
      );
      console.log(`[exact-multinomial] overall_verdict=${overallVerdict}`);
      console.log(`[exact-multinomial] elapsed_ms=${elapsedMs}`);
    },
  );
});
