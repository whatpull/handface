#!/usr/bin/env node
/**
 * verify-counter-example-numerics.mjs
 *
 * Standalone Node script — reproduces every numerical cell from
 * docs/COUNTER_EXAMPLE_DELTA_ROBUSTNESS.md (§5 main table + §5.1 G^2/Modified
 * LR tables + §4.2 Step 4 λ=-1.5 spot check) using IEEE-754 double precision.
 *
 * Counter-example pair (N=6, K=3):
 *     v_a = (3, 3, 0)
 *     v_b = (4, 1, 1)
 *
 * Cressie-Read sufficient statistic under uniform null (Lemma 1, 1c5d717):
 *     λ ∉ {0, -1}:   ψ_λ(v) = Σ v_i^(λ+1)
 *     λ = 0   (G^2 L'Hopital):           ψ_0(v)  = Σ v_i · ln(v_i)  (0·ln 0 := 0)
 *     λ = -1  (Modified LR L'Hopital):   ψ_{-1}(v) = -Σ ln(v_i)     (δ > 0 mandatory)
 *
 * Usage:
 *     node scripts/verify-counter-example-numerics.mjs
 *
 * Output:
 *     - console: formatted tables + match summary
 *     - JSON:   tests/integration/measurements/hand-snn-counter-example-numerics-reproducer.json
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
  "tests/integration/measurements/hand-snn-counter-example-numerics-reproducer.json",
);

// ---------------------------------------------------------------------------
// Counter-example pair
// ---------------------------------------------------------------------------
const V_A = [3, 3, 0];
const V_B = [4, 1, 1];

// ---------------------------------------------------------------------------
// ψ_λ implementations
// ---------------------------------------------------------------------------
function smoothedVector(v, delta) {
  return v.map((x) => x + delta);
}

/** ψ_λ for general λ ∉ {0, -1}. */
function psiGeneral(vSmoothed, lambda) {
  const exponent = lambda + 1;
  let sum = 0;
  for (const x of vSmoothed) {
    // x ≥ 0 by construction; x === 0 contributes 0 when exponent > 0, and is
    // singular when exponent ≤ 0 — caller responsibility (δ > 0 mandate).
    if (x === 0) {
      if (exponent > 0) continue;
      return Number.NaN;
    }
    sum += Math.pow(x, exponent);
  }
  return sum;
}

/** ψ_0 (G^2 L'Hopital limit): Σ v ln v, with 0·ln 0 := 0. */
function psiZero(vSmoothed) {
  let sum = 0;
  for (const x of vSmoothed) {
    if (x === 0) continue; // convention
    sum += x * Math.log(x);
  }
  return sum;
}

/** ψ_{-1} (Modified LR L'Hopital limit): -Σ ln v. δ > 0 mandatory. */
function psiMinusOne(vSmoothed) {
  let sum = 0;
  for (const x of vSmoothed) {
    if (x <= 0) return Number.NaN;
    sum += Math.log(x);
  }
  return -sum;
}

function psi(vSmoothed, lambda) {
  if (lambda === 0) return psiZero(vSmoothed);
  if (lambda === -1) return psiMinusOne(vSmoothed);
  return psiGeneral(vSmoothed, lambda);
}

// ---------------------------------------------------------------------------
// Expected values from docs/COUNTER_EXAMPLE_DELTA_ROBUSTNESS.md (commit 94dbf07)
// ---------------------------------------------------------------------------
const EXPECTED_MAIN = [
  // δ,   ψ_0.5(a), ψ_0.5(b), ψ_1(a), ψ_1(b), ψ_2(a),  ψ_2(b)
  { delta: 0.0, p05a: 10.392, p05b: 10.000, p1a: 18.000, p1b: 18.000, p2a: 54.000, p2b: 66.000 },
  { delta: 0.1, p05a: 10.948, p05b: 10.609, p1a: 19.230, p1b: 19.230, p2a: 59.583, p2b: 71.583 },
  { delta: 0.5, p05a: 13.449, p05b: 13.220, p1a: 24.750, p1b: 24.750, p2a: 85.875, p2b: 97.875 },
  { delta: 1.0, p05a: 17.000, p05b: 16.837, p1a: 33.000, p1b: 33.000, p2a: 129.000, p2b: 141.000 },
  { delta: 2.0, p05a: 25.189, p05b: 25.089, p1a: 54.000, p1b: 54.000, p2a: 258.000, p2b: 270.000 },
  { delta: 5.0, p05a: 56.434, p05b: 56.393, p1a: 153.000, p1b: 153.000, p2a: 1149.000, p2b: 1161.000 },
];

const EXPECTED_G2 = [
  // λ = 0
  { delta: 0.0, p0a: 6.592, p0b: 5.545, delta0: 1.046 },
  { delta: 0.5, p0a: 8.423, p0b: 7.985, delta0: 0.439 },
  { delta: 1.0, p0a: 11.090, p0b: 10.820, delta0: 0.270 },
];

const EXPECTED_MLR = [
  // λ = -1
  { delta: 0.1, pm1a: 0.040, pm1b: -1.602, deltaM1: 1.642 },
  { delta: 0.5, pm1a: -1.812, pm1b: -2.315, deltaM1: 0.503 },
  { delta: 1.0, pm1a: -2.773, pm1b: -2.996, deltaM1: 0.223 },
];

const EXPECTED_STEP4 = {
  delta: 0.5,
  lambda: -1.5,
  psiA: 2.4833, // 2/√3.5 + 1/√0.5
  psiB: 2.1044, // 1/√4.5 + 2/√1.5
};

// ---------------------------------------------------------------------------
// Comparison utilities
// ---------------------------------------------------------------------------
/** Doc tables print at 3 decimal places — match within ±5e-4 tolerance. */
const TOL = 5e-4;

function matches(computed, expected, tol = TOL) {
  return Math.abs(computed - expected) <= tol;
}

function fmt(x, digits = 3) {
  if (Number.isNaN(x)) return "NaN";
  // Avoid "-0.000" cosmetic noise.
  const rounded = Number(x.toFixed(digits));
  return rounded.toFixed(digits);
}

// ---------------------------------------------------------------------------
// Computation
// ---------------------------------------------------------------------------
const t0 = performance.now();

const mainResults = [];
const mainMismatches = [];
for (const row of EXPECTED_MAIN) {
  const { delta } = row;
  const va = smoothedVector(V_A, delta);
  const vb = smoothedVector(V_B, delta);
  const p05a = psi(va, 0.5);
  const p05b = psi(vb, 0.5);
  const p1a = psi(va, 1);
  const p1b = psi(vb, 1);
  const p2a = psi(va, 2);
  const p2b = psi(vb, 2);

  const cells = [
    { name: "psi_0.5(v_a)", computed: p05a, expected: row.p05a },
    { name: "psi_0.5(v_b)", computed: p05b, expected: row.p05b },
    { name: "psi_1(v_a)", computed: p1a, expected: row.p1a },
    { name: "psi_1(v_b)", computed: p1b, expected: row.p1b },
    { name: "psi_2(v_a)", computed: p2a, expected: row.p2a },
    { name: "psi_2(v_b)", computed: p2b, expected: row.p2b },
  ];
  for (const c of cells) {
    if (!matches(c.computed, c.expected)) {
      mainMismatches.push({ delta, ...c, diff: c.computed - c.expected });
    }
  }

  mainResults.push({
    delta,
    v_a_smoothed: va,
    v_b_smoothed: vb,
    psi_0_5: { v_a: p05a, v_b: p05b, delta: p05a - p05b },
    psi_1: { v_a: p1a, v_b: p1b, delta: p1a - p1b },
    psi_2: { v_a: p2a, v_b: p2b, delta: p2a - p2b },
  });
}

const g2Results = [];
const g2Mismatches = [];
for (const row of EXPECTED_G2) {
  const { delta } = row;
  const va = smoothedVector(V_A, delta);
  const vb = smoothedVector(V_B, delta);
  const p0a = psi(va, 0);
  const p0b = psi(vb, 0);
  const diff = p0a - p0b;

  const cells = [
    { name: "psi_0(v_a)", computed: p0a, expected: row.p0a },
    { name: "psi_0(v_b)", computed: p0b, expected: row.p0b },
    { name: "Delta_0", computed: diff, expected: row.delta0 },
  ];
  for (const c of cells) {
    if (!matches(c.computed, c.expected)) {
      g2Mismatches.push({ delta, ...c, diff: c.computed - c.expected });
    }
  }
  g2Results.push({ delta, psi_0: { v_a: p0a, v_b: p0b, delta: diff } });
}

const mlrResults = [];
const mlrMismatches = [];
for (const row of EXPECTED_MLR) {
  const { delta } = row;
  const va = smoothedVector(V_A, delta);
  const vb = smoothedVector(V_B, delta);
  const pm1a = psi(va, -1);
  const pm1b = psi(vb, -1);
  const diff = pm1a - pm1b;

  const cells = [
    { name: "psi_{-1}(v_a)", computed: pm1a, expected: row.pm1a },
    { name: "psi_{-1}(v_b)", computed: pm1b, expected: row.pm1b },
    { name: "Delta_{-1}", computed: diff, expected: row.deltaM1 },
  ];
  for (const c of cells) {
    if (!matches(c.computed, c.expected)) {
      mlrMismatches.push({ delta, ...c, diff: c.computed - c.expected });
    }
  }
  mlrResults.push({ delta, psi_minus_1: { v_a: pm1a, v_b: pm1b, delta: diff } });
}

// Step 4 spot check (λ = -1.5, δ = 0.5)
const step4Va = smoothedVector(V_A, EXPECTED_STEP4.delta);
const step4Vb = smoothedVector(V_B, EXPECTED_STEP4.delta);
const step4PsiA = psi(step4Va, EXPECTED_STEP4.lambda);
const step4PsiB = psi(step4Vb, EXPECTED_STEP4.lambda);
const step4Mismatches = [];
if (!matches(step4PsiA, EXPECTED_STEP4.psiA, 5e-4)) {
  step4Mismatches.push({
    name: "psi_{-1.5}(v_a)",
    computed: step4PsiA,
    expected: EXPECTED_STEP4.psiA,
    diff: step4PsiA - EXPECTED_STEP4.psiA,
  });
}
if (!matches(step4PsiB, EXPECTED_STEP4.psiB, 5e-4)) {
  step4Mismatches.push({
    name: "psi_{-1.5}(v_b)",
    computed: step4PsiB,
    expected: EXPECTED_STEP4.psiB,
    diff: step4PsiB - EXPECTED_STEP4.psiB,
  });
}

const wallMs = performance.now() - t0;

// ---------------------------------------------------------------------------
// Console output
// ---------------------------------------------------------------------------
console.log("=".repeat(78));
console.log("Counter-example δ-robustness — numerical reproducer");
console.log("v_a = (3, 3, 0)   v_b = (4, 1, 1)   (N=6, K=3)");
console.log("=".repeat(78));

console.log("\n§5 Main table (ψ_0.5, ψ_1, ψ_2):");
console.log(
  "  δ     | ψ_0.5(a) ψ_0.5(b) Δ_0.5  | ψ_1(a)   ψ_1(b)   Δ_1    | ψ_2(a)   ψ_2(b)   Δ_2",
);
console.log("  " + "-".repeat(76));
for (const r of mainResults) {
  console.log(
    `  ${r.delta.toFixed(1).padStart(4)}  | ` +
      `${fmt(r.psi_0_5.v_a).padStart(8)} ${fmt(r.psi_0_5.v_b).padStart(8)} ${fmt(r.psi_0_5.delta).padStart(6)} | ` +
      `${fmt(r.psi_1.v_a).padStart(8)} ${fmt(r.psi_1.v_b).padStart(8)} ${fmt(r.psi_1.delta).padStart(6)} | ` +
      `${fmt(r.psi_2.v_a).padStart(8)} ${fmt(r.psi_2.v_b).padStart(8)} ${fmt(r.psi_2.delta).padStart(6)}`,
  );
}

console.log("\n§5.1 G² (λ=0) table:");
console.log("  δ    | ψ_0(v_a)  ψ_0(v_b)  Δ_0");
console.log("  " + "-".repeat(34));
for (const r of g2Results) {
  console.log(
    `  ${r.delta.toFixed(1).padStart(4)} | ${fmt(r.psi_0.v_a).padStart(8)} ${fmt(r.psi_0.v_b).padStart(8)} ${fmt(r.psi_0.delta).padStart(6)}`,
  );
}

console.log("\n§5.1 Modified LR (λ=-1) table:");
console.log("  δ    | ψ_{-1}(v_a)  ψ_{-1}(v_b)  Δ_{-1}");
console.log("  " + "-".repeat(42));
for (const r of mlrResults) {
  console.log(
    `  ${r.delta.toFixed(1).padStart(4)} | ${fmt(r.psi_minus_1.v_a).padStart(10)}   ${fmt(r.psi_minus_1.v_b).padStart(10)}   ${fmt(r.psi_minus_1.delta).padStart(6)}`,
  );
}

console.log("\n§4.2 Step 4 spot check (λ = -1.5, δ = 0.5):");
console.log(
  `  ψ_{-1.5}(v_a) = 2/√3.5 + 1/√0.5 = ${fmt(step4PsiA, 4)}   (expected ${EXPECTED_STEP4.psiA.toFixed(4)})`,
);
console.log(
  `  ψ_{-1.5}(v_b) = 1/√4.5 + 2/√1.5 = ${fmt(step4PsiB, 4)}   (expected ${EXPECTED_STEP4.psiB.toFixed(4)})`,
);

// ---------------------------------------------------------------------------
// Match summary
// ---------------------------------------------------------------------------
const mainCells = EXPECTED_MAIN.length * 6;
const g2Cells = EXPECTED_G2.length * 3;
const mlrCells = EXPECTED_MLR.length * 3;
const step4Cells = 2;
const totalCells = mainCells + g2Cells + mlrCells + step4Cells;
const matchedCells =
  totalCells -
  mainMismatches.length -
  g2Mismatches.length -
  mlrMismatches.length -
  step4Mismatches.length;

console.log("\n" + "=".repeat(78));
console.log(`Match summary: ${matchedCells}/${totalCells} cells within ±${TOL}`);
console.log("=".repeat(78));

if (mainMismatches.length) {
  console.log("\n§5 main mismatches:");
  for (const m of mainMismatches) {
    console.log(
      `  δ=${m.delta}  ${m.name}: computed=${m.computed.toFixed(6)}  expected=${m.expected}  diff=${m.diff.toExponential(3)}`,
    );
  }
}
if (g2Mismatches.length) {
  console.log("\n§5.1 G² mismatches:");
  for (const m of g2Mismatches) {
    console.log(
      `  δ=${m.delta}  ${m.name}: computed=${m.computed.toFixed(6)}  expected=${m.expected}  diff=${m.diff.toExponential(3)}`,
    );
  }
}
if (mlrMismatches.length) {
  console.log("\n§5.1 Modified LR mismatches:");
  for (const m of mlrMismatches) {
    console.log(
      `  δ=${m.delta}  ${m.name}: computed=${m.computed.toFixed(6)}  expected=${m.expected}  diff=${m.diff.toExponential(3)}`,
    );
  }
}
if (step4Mismatches.length) {
  console.log("\n§4.2 Step 4 mismatches:");
  for (const m of step4Mismatches) {
    console.log(
      `  ${m.name}: computed=${m.computed.toFixed(6)}  expected=${m.expected}  diff=${m.diff.toExponential(3)}`,
    );
  }
}

console.log(`\nWall time: ${wallMs.toFixed(2)} ms`);

// ---------------------------------------------------------------------------
// JSON artifact
// ---------------------------------------------------------------------------
const artifact = {
  meta: {
    id: "hand-snn-counter-example-numerics-reproducer",
    purpose:
      "Reproducer for docs/COUNTER_EXAMPLE_DELTA_ROBUSTNESS.md numerical tables (§5 + §5.1 + §4.2 Step 4).",
    counter_example: { v_a: V_A, v_b: V_B, N: 6, K: 3 },
    psi_definitions: {
      general:
        "λ ∉ {0, -1}: psi_lambda(v) = sum v_i^(lambda+1)  (uniform null sufficient statistic, Lemma 1)",
      lambda_0: "L'Hopital G^2: psi_0(v) = sum v_i * ln(v_i)  (0*ln 0 := 0)",
      lambda_minus_1: "L'Hopital Modified LR: psi_{-1}(v) = -sum ln(v_i)  (δ > 0 mandatory)",
    },
    tolerance: TOL,
    wall_ms: Number(wallMs.toFixed(3)),
    node_version: process.version,
    timestamp: new Date().toISOString(),
  },
  section_5_main: mainResults,
  section_5_1_g2: g2Results,
  section_5_1_mlr: mlrResults,
  section_4_2_step4: {
    delta: EXPECTED_STEP4.delta,
    lambda: EXPECTED_STEP4.lambda,
    v_a_smoothed: step4Va,
    v_b_smoothed: step4Vb,
    psi_v_a: step4PsiA,
    psi_v_b: step4PsiB,
    expected_psi_v_a: EXPECTED_STEP4.psiA,
    expected_psi_v_b: EXPECTED_STEP4.psiB,
  },
  cross_check: {
    total_cells: totalCells,
    matched_cells: matchedCells,
    mismatches: {
      main: mainMismatches,
      g2: g2Mismatches,
      mlr: mlrMismatches,
      step4: step4Mismatches,
    },
  },
};

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(artifact, null, 2) + "\n", "utf8");
console.log(`\nJSON artifact written: ${OUTPUT_PATH}`);

const allMatched =
  mainMismatches.length === 0 &&
  g2Mismatches.length === 0 &&
  mlrMismatches.length === 0 &&
  step4Mismatches.length === 0;
process.exit(allMatched ? 0 : 1);
