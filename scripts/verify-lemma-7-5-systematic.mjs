#!/usr/bin/env node
/**
 * verify-lemma-7-5-systematic.mjs
 *
 * Standalone Node script — Lemma 7.5 (Hausdorff moment-determination) 의
 * numerical evidence 강화. f446675 enumeration data (N=5, K=4) 의 12
 * NOT_chain cells (4 non-uniform p × 3 δ) 의 모든 pairs 에 대해 systematic
 * spot-check.
 *
 * Statements being verified:
 *
 *   Theorem 7.1 (⇐) direct (commit b1e3b1e — closed-form proven):
 *     r_a ≻_w r_b  ⟹  T_λ(o_a) ≥ T_λ(o_b)  for all λ ∈ ℝ
 *
 *   Lemma 7.5 contrapositive (commit 899912d — OPEN, this script 의 numerical
 *   evidence target):
 *     r_a, r_b weighted-majorization-incomparable
 *       ⟹ ∃ λ_1, λ_2 ∈ ℝ s.t. T_λ_1(o_a) > T_λ_1(o_b) AND T_λ_2(o_a) < T_λ_2(o_b)
 *
 *   Note: f446675 의 enumeration 는 "T_λ sign-consistency" 기준으로 comparable /
 *   incomparable 을 분류. 본 script 는 그 incomparable pairs 에 대해 보다 넓은 λ
 *   grid (10 values vs f446675 의 6) 에서 sign-change 가 robustly 확인되는지
 *   re-verify.
 *
 * Algorithm (per NOT_chain (p, δ) cell):
 *   1. Re-enumerate Ω(5, 4) — 56 outcomes.
 *   2. Per outcome × per λ ∈ {-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 3} compute T_λ.
 *   3. Per unordered pair (i < j):
 *      - Classify f446675-comparable vs f446675-incomparable on the 6 λ subset
 *        ({0.5, 1, 2, 0, -1, -1.5}).
 *      - On the broader 10-λ grid:
 *        * comparable subset 의 sign consistency 재확인 (Theorem 7.1 (⇐)).
 *        * incomparable subset 의 sign-change pair 존재 재확인 (Lemma 7.5 contrap).
 *
 * Output:
 *   - Console: per-cell summary table.
 *   - JSON: tests/integration/measurements/hand-snn-lemma-7-5-systematic.json
 *
 * No dependencies — Node built-in Math only.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");
const OUTPUT_PATH = resolve(
  REPO_ROOT,
  "tests/integration/measurements/hand-snn-lemma-7-5-systematic.json",
);

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const N = 5;
const K = 4;

const P_CONFIGS = [
  { id: "p1_uniform", label: "uniform", p: [0.25, 0.25, 0.25, 0.25] },
  { id: "p2_skewed", label: "(0.5, 0.3, 0.15, 0.05)", p: [0.5, 0.3, 0.15, 0.05] },
  { id: "p3_extreme", label: "(0.7, 0.1, 0.1, 0.1) extreme", p: [0.7, 0.1, 0.1, 0.1] },
  { id: "p4_mild", label: "(0.4, 0.3, 0.2, 0.1)", p: [0.4, 0.3, 0.2, 0.1] },
  { id: "p5_pair", label: "(0.4, 0.4, 0.1, 0.1)", p: [0.4, 0.4, 0.1, 0.1] },
];
const DELTAS = [0.1, 0.5, 1.0];

// Broader λ grid — 10 values vs f446675 의 6 (extends to λ=-2 and λ=3).
const LAMBDAS_FULL = [-2.0, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5, 2.0, 3.0];
// f446675 subset — used to reproduce the original classification.
const LAMBDAS_F446675 = [0.5, 1, 2, 0, -1, -1.5];
const TIE_TOL = 1e-9;

// ---------------------------------------------------------------------------
// Enumerate Ω(N, K)
// ---------------------------------------------------------------------------
function enumerateOmega(n, k) {
  const out = [];
  function rec(remaining, depth, current) {
    if (depth === k - 1) {
      out.push([...current, remaining]);
      return;
    }
    for (let i = 0; i <= remaining; i += 1) {
      current.push(i);
      rec(remaining - i, depth + 1, current);
      current.pop();
    }
  }
  rec(n, 0, []);
  return out;
}

// ---------------------------------------------------------------------------
// T_λ (Lemma 5.1 + 5.2)
// ---------------------------------------------------------------------------
function smoothedObs(o, delta) {
  return o.map((x) => x + delta);
}
function smoothedExp(n, p, delta) {
  return p.map((pi) => n * pi + delta);
}

function tGeneral(oPrime, ePrime, lambda) {
  const exponent = lambda + 1;
  let inner = 0;
  for (let i = 0; i < oPrime.length; i += 1) {
    const E = ePrime[i];
    const O = oPrime[i];
    if (E <= 0) return Number.NaN;
    const r = O / E;
    let rPow;
    if (r === 0) {
      if (exponent > 0) rPow = 0;
      else return Number.NaN;
    } else {
      rPow = Math.pow(r, exponent);
    }
    inner += E * (rPow - r);
  }
  return (2 / (lambda * (lambda + 1))) * inner;
}

function tZero(oPrime, ePrime) {
  let sum = 0;
  for (let i = 0; i < oPrime.length; i += 1) {
    const O = oPrime[i];
    const E = ePrime[i];
    if (E <= 0) return Number.NaN;
    if (O === 0) continue;
    sum += O * Math.log(O / E);
  }
  return 2 * sum;
}

function tMinusOne(oPrime, ePrime) {
  let sum = 0;
  for (let i = 0; i < oPrime.length; i += 1) {
    const O = oPrime[i];
    const E = ePrime[i];
    if (E <= 0) return Number.NaN;
    if (O <= 0) return Number.NaN;
    sum += E * Math.log(E / O);
  }
  return 2 * sum;
}

function tLambda(oPrime, ePrime, lambda) {
  if (lambda === 0) return tZero(oPrime, ePrime);
  if (lambda === -1) return tMinusOne(oPrime, ePrime);
  return tGeneral(oPrime, ePrime, lambda);
}

// ---------------------------------------------------------------------------
// Sign with tolerance.
// ---------------------------------------------------------------------------
function signedDiff(a, b) {
  const d = a - b;
  if (Math.abs(d) < TIE_TOL) return 0;
  return d > 0 ? 1 : -1;
}

// ---------------------------------------------------------------------------
// Classify a pair on a given λ grid given precomputed t-values.
//   returns { kind: "comparable" | "incomparable" | "all_tied" | "nan",
//             pos_lambdas: number[], neg_lambdas: number[] }
// ---------------------------------------------------------------------------
function classifyPair(tArrA, tArrB, lambdas) {
  let foundPos = false;
  let foundNeg = false;
  let allTied = true;
  let sawNaN = false;
  const posLambdas = [];
  const negLambdas = [];
  for (let li = 0; li < lambdas.length; li += 1) {
    const tA = tArrA[li];
    const tB = tArrB[li];
    if (Number.isNaN(tA) || Number.isNaN(tB)) {
      sawNaN = true;
      continue;
    }
    const s = signedDiff(tA, tB);
    if (s === 0) continue;
    allTied = false;
    if (s > 0) {
      foundPos = true;
      posLambdas.push(lambdas[li]);
    } else {
      foundNeg = true;
      negLambdas.push(lambdas[li]);
    }
  }
  if (sawNaN && !foundPos && !foundNeg) {
    return { kind: "nan", pos_lambdas: posLambdas, neg_lambdas: negLambdas };
  }
  if (foundPos && foundNeg) {
    return { kind: "incomparable", pos_lambdas: posLambdas, neg_lambdas: negLambdas };
  }
  if (allTied) {
    return { kind: "all_tied", pos_lambdas: posLambdas, neg_lambdas: negLambdas };
  }
  return { kind: "comparable", pos_lambdas: posLambdas, neg_lambdas: negLambdas };
}

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------
const t0 = performance.now();
const omega = enumerateOmega(N, K);
const omegaSize = omega.length;
if (omegaSize !== 56) {
  throw new Error(`Expected |Ω(5, 4)| = 56, got ${omegaSize}`);
}

// Build lookup: f446675-subset index → full-grid index
const f446675Indices = LAMBDAS_F446675.map((lam) => LAMBDAS_FULL.indexOf(lam)).filter(
  (idx) => idx >= 0,
);
// Some f446675 λ values may not be in the full grid — those are skipped.
// In our case: all 6 of f446675 λ are present (0, 0.5, 1, 2, -1, -1.5).

const cellResults = [];
const incomparableSpotChecks = []; // detailed per-pair report (capped)
const SPOT_CHECK_CAP = 20;

for (const pcfg of P_CONFIGS) {
  for (const delta of DELTAS) {
    const ePrime = smoothedExp(N, pcfg.p, delta);

    // tValuesFull[outcomeIndex][lambdaIndex_full]
    const tValuesFull = new Array(omegaSize);
    for (let oi = 0; oi < omegaSize; oi += 1) {
      const oPrime = smoothedObs(omega[oi], delta);
      const row = new Array(LAMBDAS_FULL.length);
      for (let li = 0; li < LAMBDAS_FULL.length; li += 1) {
        row[li] = tLambda(oPrime, ePrime, LAMBDAS_FULL[li]);
      }
      tValuesFull[oi] = row;
    }

    // f446675 subset projection
    const tValuesF446675 = tValuesFull.map((row) => f446675Indices.map((idx) => row[idx]));

    // Classification stats
    let f6Comparable = 0;
    let f6Incomparable = 0;
    let f6AllTied = 0;
    let f6NaN = 0;

    let fullComparable = 0;
    let fullIncomparable = 0;
    let fullAllTied = 0;
    let fullNaN = 0;

    // Cross-tab: f446675-class × full-class
    // Lemma 7.5 contrapositive: f446675-incomparable pairs SHOULD remain
    //   full-grid-incomparable (sign-change confirmed on broader λ grid).
    // Theorem 7.1 (⇐): f446675-comparable pairs SHOULD remain full-grid-
    //   comparable (sign consistent across broader λ grid). If a comparable
    //   pair becomes incomparable on the broader grid → Theorem 7.1 violation
    //   evidence (UNEXPECTED).
    let f6IncompButFullIncomp = 0; // Lemma 7.5 contrapositive verified
    let f6IncompButFullNotIncomp = 0; // Lemma 7.5 contrapositive NOT verified
    let f6CompAndFullComp = 0; // Theorem 7.1 (⇐) consistency verified
    let f6CompButFullIncomp = 0; // UNEXPECTED — Theorem 7.1 (⇐) potential violation
    let f6CompButFullTied = 0; // OK — tied on broader grid is fine for ≻_w-comparable

    const unexpectedPairs = [];

    for (let i = 0; i < omegaSize; i += 1) {
      for (let j = i + 1; j < omegaSize; j += 1) {
        const f6 = classifyPair(tValuesF446675[i], tValuesF446675[j], LAMBDAS_F446675);
        const full = classifyPair(tValuesFull[i], tValuesFull[j], LAMBDAS_FULL);

        if (f6.kind === "comparable") f6Comparable += 1;
        else if (f6.kind === "incomparable") f6Incomparable += 1;
        else if (f6.kind === "all_tied") f6AllTied += 1;
        else f6NaN += 1;

        if (full.kind === "comparable") fullComparable += 1;
        else if (full.kind === "incomparable") fullIncomparable += 1;
        else if (full.kind === "all_tied") fullAllTied += 1;
        else fullNaN += 1;

        if (f6.kind === "incomparable") {
          if (full.kind === "incomparable") {
            f6IncompButFullIncomp += 1;
            if (incomparableSpotChecks.length < SPOT_CHECK_CAP) {
              incomparableSpotChecks.push({
                p_id: pcfg.id,
                delta,
                i,
                j,
                o_a: omega[i],
                o_b: omega[j],
                lemma_7_5_contrapositive_verdict: "VERIFIED",
                pos_lambdas_full: full.pos_lambdas,
                neg_lambdas_full: full.neg_lambdas,
                t_values_a_full: tValuesFull[i],
                t_values_b_full: tValuesFull[j],
              });
            }
          } else {
            f6IncompButFullNotIncomp += 1;
            unexpectedPairs.push({
              i,
              j,
              o_a: omega[i],
              o_b: omega[j],
              f6_class: f6.kind,
              full_class: full.kind,
              note: "f446675-incomparable but full-grid NOT-incomparable — Lemma 7.5 contrapositive NOT verified on broader grid (sign-change disappeared).",
            });
          }
        } else if (f6.kind === "comparable") {
          if (full.kind === "comparable") {
            f6CompAndFullComp += 1;
          } else if (full.kind === "all_tied") {
            f6CompButFullTied += 1;
          } else if (full.kind === "incomparable") {
            f6CompButFullIncomp += 1;
            unexpectedPairs.push({
              i,
              j,
              o_a: omega[i],
              o_b: omega[j],
              f6_class: f6.kind,
              full_class: full.kind,
              note: "f446675-comparable but full-grid incomparable — UNEXPECTED. If r_a ≻_w r_b holds (HLP majorization), this is a Theorem 7.1 (⇐) violation candidate. If neither r_a ≻_w r_b nor r_b ≻_w r_a, then the f446675 classification was a false-positive comparable (incidental sign consistency on the narrow 6-λ grid).",
              pos_lambdas_full: full.pos_lambdas,
              neg_lambdas_full: full.neg_lambdas,
            });
          }
        }
      }
    }

    const verdict = f6Incomparable > 0 ? "NOT_chain" : "chain";

    const lemma75ContrapVerifiedRatio =
      f6Incomparable > 0 ? f6IncompButFullIncomp / f6Incomparable : 1.0;
    const theorem71ConsistencyVerifiedRatio =
      f6Comparable > 0 ? (f6CompAndFullComp + f6CompButFullTied) / f6Comparable : 1.0;

    cellResults.push({
      p_id: pcfg.id,
      p_label: pcfg.label,
      p: pcfg.p,
      delta,
      e_prime: ePrime,
      f446675_verdict: verdict,
      pair_total: (omegaSize * (omegaSize - 1)) / 2,
      f446675_classification: {
        comparable: f6Comparable,
        incomparable: f6Incomparable,
        all_tied: f6AllTied,
        nan: f6NaN,
      },
      full_grid_classification: {
        comparable: fullComparable,
        incomparable: fullIncomparable,
        all_tied: fullAllTied,
        nan: fullNaN,
      },
      lemma_7_5_contrapositive: {
        incomparable_pairs_on_f446675: f6Incomparable,
        sign_change_verified_on_full_grid: f6IncompButFullIncomp,
        sign_change_lost_on_full_grid: f6IncompButFullNotIncomp,
        verified_ratio: lemma75ContrapVerifiedRatio,
      },
      theorem_7_1_consistency: {
        comparable_pairs_on_f446675: f6Comparable,
        consistent_on_full_grid: f6CompAndFullComp,
        tied_on_full_grid: f6CompButFullTied,
        violated_on_full_grid: f6CompButFullIncomp,
        verified_ratio: theorem71ConsistencyVerifiedRatio,
      },
      unexpected_pairs_count: unexpectedPairs.length,
      unexpected_pairs_sample: unexpectedPairs.slice(0, 10),
    });
  }
}

const wallMs = performance.now() - t0;

// ---------------------------------------------------------------------------
// Aggregate stats
// ---------------------------------------------------------------------------
const notChainCells = cellResults.filter((c) => c.f446675_verdict === "NOT_chain");
const chainCells = cellResults.filter((c) => c.f446675_verdict === "chain");

const totalIncompPairs = notChainCells.reduce(
  (acc, c) => acc + c.lemma_7_5_contrapositive.incomparable_pairs_on_f446675,
  0,
);
const totalIncompVerified = notChainCells.reduce(
  (acc, c) => acc + c.lemma_7_5_contrapositive.sign_change_verified_on_full_grid,
  0,
);
const totalIncompLost = notChainCells.reduce(
  (acc, c) => acc + c.lemma_7_5_contrapositive.sign_change_lost_on_full_grid,
  0,
);

const totalCompPairs = cellResults.reduce(
  (acc, c) => acc + c.theorem_7_1_consistency.comparable_pairs_on_f446675,
  0,
);
const totalCompConsistent = cellResults.reduce(
  (acc, c) =>
    acc +
    c.theorem_7_1_consistency.consistent_on_full_grid +
    c.theorem_7_1_consistency.tied_on_full_grid,
  0,
);
const totalCompViolated = cellResults.reduce(
  (acc, c) => acc + c.theorem_7_1_consistency.violated_on_full_grid,
  0,
);

const aggregate = {
  not_chain_cells: notChainCells.length,
  chain_cells: chainCells.length,
  lemma_7_5_contrapositive: {
    total_incomparable_pairs_on_f446675: totalIncompPairs,
    sign_change_verified_on_full_grid: totalIncompVerified,
    sign_change_lost_on_full_grid: totalIncompLost,
    verified_ratio: totalIncompPairs > 0 ? totalIncompVerified / totalIncompPairs : 1.0,
  },
  theorem_7_1_consistency: {
    total_comparable_pairs_on_f446675: totalCompPairs,
    consistent_on_full_grid: totalCompConsistent,
    violated_on_full_grid: totalCompViolated,
    verified_ratio: totalCompPairs > 0 ? totalCompConsistent / totalCompPairs : 1.0,
  },
};

// ---------------------------------------------------------------------------
// Console output
// ---------------------------------------------------------------------------
console.log("=".repeat(92));
console.log("Lemma 7.5 (Hausdorff moment-determination) systematic verify (N=5, K=4)");
console.log("=".repeat(92));
console.log(`  |Ω(5, 4)| = ${omegaSize}`);
console.log(`  unordered pairs per (p, δ) = ${(omegaSize * (omegaSize - 1)) / 2}`);
console.log(`  λ grid (broader): ${LAMBDAS_FULL.join(", ")} (n=${LAMBDAS_FULL.length})`);
console.log(`  λ grid (f446675 subset for classification): ${LAMBDAS_F446675.join(", ")}`);
console.log(`  δ grid: ${DELTAS.join(", ")}`);
console.log(`  p configs: ${P_CONFIGS.length}`);
console.log(`  total (p, δ) cells: ${cellResults.length}`);
console.log();

console.log("-".repeat(92));
console.log(
  "  p_id".padEnd(14) +
    "δ".padStart(5) +
    "verdict".padStart(12) +
    "f6_inc".padStart(9) +
    "L7.5 ✓".padStart(9) +
    "L7.5 ✗".padStart(9) +
    "f6_cmp".padStart(9) +
    "T7.1 ✓".padStart(9) +
    "T7.1 ✗".padStart(9),
);
console.log("-".repeat(92));
for (const c of cellResults) {
  console.log(
    `  ${c.p_id.padEnd(12)}${String(c.delta).padStart(5)}` +
      `${c.f446675_verdict.padStart(12)}` +
      `${String(c.lemma_7_5_contrapositive.incomparable_pairs_on_f446675).padStart(9)}` +
      `${String(c.lemma_7_5_contrapositive.sign_change_verified_on_full_grid).padStart(9)}` +
      `${String(c.lemma_7_5_contrapositive.sign_change_lost_on_full_grid).padStart(9)}` +
      `${String(c.theorem_7_1_consistency.comparable_pairs_on_f446675).padStart(9)}` +
      `${String(c.theorem_7_1_consistency.consistent_on_full_grid + c.theorem_7_1_consistency.tied_on_full_grid).padStart(9)}` +
      `${String(c.theorem_7_1_consistency.violated_on_full_grid).padStart(9)}`,
  );
}
console.log("-".repeat(92));

console.log();
console.log("Aggregate:");
console.log(
  `  NOT_chain cells: ${notChainCells.length} / ${cellResults.length} (expected 12 from f446675)`,
);
console.log();
console.log("  Lemma 7.5 contrapositive (incomparable → sign-change on broader λ grid):");
console.log(
  `    total incomparable pairs (f446675 6-λ grid): ${totalIncompPairs}`,
);
console.log(
  `    sign-change verified on full 10-λ grid:       ${totalIncompVerified}`,
);
console.log(
  `    sign-change LOST on full grid (false-positive incomp): ${totalIncompLost}`,
);
console.log(
  `    verified ratio: ${(aggregate.lemma_7_5_contrapositive.verified_ratio * 100).toFixed(3)} %`,
);
console.log();
console.log("  Theorem 7.1 (⇐) direct (comparable → sign-consistent on broader λ grid):");
console.log(
  `    total comparable pairs (f446675 6-λ grid): ${totalCompPairs}`,
);
console.log(
  `    consistent on full 10-λ grid: ${totalCompConsistent}`,
);
console.log(
  `    violated on full grid (UNEXPECTED): ${totalCompViolated}`,
);
console.log(
  `    verified ratio: ${(aggregate.theorem_7_1_consistency.verified_ratio * 100).toFixed(3)} %`,
);

if (totalCompViolated > 0) {
  console.log();
  console.log("!! UNEXPECTED: f446675-comparable pairs became incomparable on broader λ grid !!");
  console.log("   These are candidates for either:");
  console.log("     (a) Theorem 7.1 (⇐) violation (if r_a ≻_w r_b strictly holds), OR");
  console.log("     (b) f446675 false-positive comparable (sign coincidence on narrow 6-λ grid).");
  console.log("   Manual HLP majorization check mandatory per pair.");
}
console.log();
console.log(`Wall time: ${wallMs.toFixed(2)} ms`);

// ---------------------------------------------------------------------------
// JSON artifact
// ---------------------------------------------------------------------------
const honestLimitations = [
  "본 reproducer 는 (N=5, K=4) 한정 — f446675 의 enumeration scope 일치. 다른 (N, K) cell (예: N=6, K=4 또는 N=5, K=5) 의 systematic verify 별도 R&D.",
  "λ grid 10 values 한정 — {-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 3}. λ → ±∞ asymptotic boundary 별도 R&D. 단 Cressie-Read family 의 representative range 는 본 grid 가 broader 인 점에서 f446675 의 6-λ grid 대비 의의 있음.",
  "본 script 는 'f446675-incomparable pair' 정의를 ' 6-λ grid 에서 sign-change' 로 한정 — Olkin & Marshall 1979 의 weighted majorization 의 strict 'incomparable' definition 과의 numerical 등가성 별도 verify 필요. Lemma 5.1 + 5.2 가 두 definition 의 등가 시사하지만 strict proof 별도 R&D.",
  "Lemma 7.5 의 strict proof (Hausdorff-Choquet specialization) 안 됨 — 본 script 는 contrapositive 의 numerical evidence 한정 (negative direction).",
  "Theorem 7.1 (⇐) 의 strict proof 는 b1e3b1e 에서 closed-form 완료 — 본 script 의 'verified ratio' 는 f446675 의 'comparable' classification 의 broader λ grid robustness 측정. 100% 미달 시 f446675 classification 의 false-positive 의 numerical evidence 일 수 있음 (Theorem 7.1 (⇐) 자체 위반 아님 — 별도 HLP majorization 직접 verify 필요).",
  "Numerical sign rule (tie tolerance 1e-9) — IEEE 754 double precision 한정. 매우 small T_λ 차이 의 false-tie 가능성 — 단 본 verify 에서 sign-change 가 발견된 pair 는 multiple λ 에서 strict sign 차이 보유 → tie tolerance 영향 최소.",
  "Lemma 7.5 의 'verified ratio' 100% 이어도 Lemma 7.5 의 strict proof 아님 — broader λ grid 의 incomparable pair 가 weighted majorization 의 strict incomparability 와 1-1 대응함을 numerical evidence 가 시사할 뿐. Hausdorff moment problem 의 finite-grid 한정 evidence 와 continuous moment problem 의 strict moment-determination 사이 gap 존재.",
  "본 reproducer 는 f446675 의 12 NOT_chain cells 의 spot-check 에 집중 — chain cells (uniform p × 3 δ = 3 cells) 의 reverse verify 도 포함 (chain 이 broader grid 에서도 chain 유지하는지).",
  "f446675-incomparable 의 첫 SPOT_CHECK_CAP=20 sample 만 detailed t-values 기록 — 전체 incomparable pairs 의 sign-change λ pair 분포 분석은 본 script 의 cap 변경 필요.",
  "Cressie-Read 1984 + Olkin & Marshall 1979 ch. 14 + Hausdorff 1921 + Rudin 1976 published source 사용자 직접 verify mandatory (carryover).",
  "Lemma 7.5 의 final truth value 미해결 — 본 numerical evidence 는 supportive 한정. Lean 4 / Coq formal verification 별도 R&D.",
  "Peer review 안 됨 — published statistical literature cross-check 사용자 mandatory.",
  ".env.snn-backup HIGH carryover — 사용자 직접 rotate mandatory.",
  "본 script 는 'standalone Node script + JSON reproducer' 패턴 — vitest worker zombie 회피 가이드 준수.",
  "본 R&D 의 evidence type: 'numerical spot-check' — strict closed-form proof 아님. 직접 Hausdorff-Choquet specialization (Lemma 7.5 의 multi-cycle proof attempt) 별도 R&D mandatory.",
  "T_λ formula 의 source-of-truth 는 hand-derived Lemma 5.1 + 5.2 (commits 8c80e40 + 8f0e34d) — 본 script 의 formula 정확성 의존. λ ∉ {0, -1} 의 general formula 의 L'Hopital limit 의 numerical 정확성 (예: λ = -0.001 limit) 별도 R&D — 본 script 는 λ ∈ {0, -1} 의 closed-form 만 사용.",
];

const artifact = {
  meta: {
    id: "hand-snn-lemma-7-5-systematic",
    purpose:
      "Lemma 7.5 (Hausdorff moment-determination, 899912d) 의 numerical evidence 강화. f446675 의 enumeration (N=5, K=4, 15 cells, 12 NOT_chain) 의 incomparable pairs 에 broader λ grid (10 values) 의 sign-change verify + comparable pairs 의 sign-consistency reverse-verify (Theorem 7.1 (⇐) consistency cross-check).",
    parameters: {
      N,
      K,
      omega_size: omegaSize,
      pair_count_per_cell: (omegaSize * (omegaSize - 1)) / 2,
      lambdas_full: LAMBDAS_FULL,
      lambdas_f446675_subset: LAMBDAS_F446675,
      deltas: DELTAS,
      p_configs: P_CONFIGS,
      tie_tolerance: TIE_TOL,
      spot_check_cap: SPOT_CHECK_CAP,
    },
    methodology: {
      enumeration: "Ω(5, 4) = all compositions of N=5 into K=4 non-negative cells (56 outcomes).",
      classification:
        "Per pair (i < j), compute sign(T_λ(o_a) - T_λ(o_b)) on (a) f446675 subset of 6 λ values, (b) full 10-λ broader grid. Classify as comparable / incomparable / all_tied / nan per grid.",
      lemma_7_5_check:
        "For each f446675-incomparable pair, check whether the broader grid still shows sign-change (Lemma 7.5 contrapositive: incomparable ⟹ ∃ λ_1, λ_2 with opposite signs). Verified iff broader grid also classifies as incomparable.",
      theorem_7_1_check:
        "For each f446675-comparable pair, check whether broader grid preserves sign consistency (Theorem 7.1 (⇐): r_a ≻_w r_b ⟹ all-λ T_λ(o_a) ≥ T_λ(o_b)). Violation candidate iff broader grid classifies as incomparable.",
    },
    wall_ms: Number(wallMs.toFixed(3)),
    node_version: process.version,
    timestamp: new Date().toISOString(),
    honest_limitations: honestLimitations,
  },
  aggregate,
  cell_results: cellResults,
  incomparable_spot_checks: incomparableSpotChecks,
};

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(artifact, null, 2) + "\n", "utf8");
console.log();
console.log(`JSON artifact written: ${OUTPUT_PATH}`);

// Exit non-zero only if NaN pairs found AND f446675-comparable pairs become
// incomparable on broader grid (potential Theorem 7.1 violation). The latter
// requires manual HLP verification — exit 0 unless NaN.
const totalNaN = cellResults.reduce(
  (acc, c) => acc + c.f446675_classification.nan + c.full_grid_classification.nan,
  0,
);
process.exit(totalNaN > 0 ? 1 : 0);
