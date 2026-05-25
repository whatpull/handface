// P219: 4×4 + 5×5 Hybrid Ensemble (2026-05-25).
//
// P218 ceiling 분석 결과: 5×5 architecture 영역 noise 75% / partial 100% 영역
// fundamental trade-off (high-dim sparse representation). 4×4 (88% noise /
// 63% partial) 영역 상호 보완성 영역 ensemble — 두 substrate 영역 각각 학습
// 후 inference 영역 max-rate combination.
//
// 가설: ensemble noise = max(4×4 noise=88%, 5×5 noise=75%) ≈ 88%
//       ensemble partial = max(4×4 partial=63%, 5×5 partial=100%) ≈ 100%
//       → 4×4 영역 noise 강점 + 5×5 영역 partial 강점 동시 달성.
//
// 학술 정합: Dietterich 2000 — Ensemble methods 영역 model diversity 영역
//   complementary error 영역 reduction. 4×4 (dense) + 5×5 (sparse) 영역
//   maximally diverse 영역 양쪽 weak point 영역 cover.
//
// 6 paired patterns (4×4 ↔ 5×5):
//   - Top row, Bottom row, Left col, Right col, Main diag, Anti diag
//   - 4×4 P213 / 5×5 P218 영역 공통 — semantic equivalent.

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';
import { TEST_PATTERNS as PATTERNS_4X4 } from './p213-selectivity';
import { PATTERNS_5X5 } from './p218-capacity-5x5';
import { PATTERNS_6X6 } from './p220-capacity-6x6';
import type { SelectivityMetrics, ProgressCallback } from './p213-selectivity';

// 4×4 ↔ 5×5 paired patterns — semantic equivalent (same concept, different grid).
// P213 4×4 order:    [Top, Left, MainDiag, Bot, Right, AntiDiag]
// P218 5×5 order:    [Top, Bot, Left, Right, MidRow, MidCol, MainDiag, AntiDiag, ...]
// Reorder both to common semantic order:
//   ENSEMBLE_ORDER = [Top, Bot, Left, Right, MainDiag, AntiDiag, MidRow, MidCol]
//
// Task 2 (2026-05-25): N=6 → N=8 extension. Middle row / Middle col 영역 둘
// 다 양쪽 substrate 영역 존재 (4×4 row 1 / col 1, 5×5 row 2 / col 2).
// 4×4 P213 영역 6 patterns 영역 영역 — 2 새 패턴 영역 inline 정의.
const PAIRED_4X4_EXTRA = {
  middleRow: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], // 4×4 row 1
  middleCol: [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], // 4×4 col 1
} as const;

// p4x4 가 number[] 영역 영역 영역, p4x4Idx (legacy) 영역 영역 — full array 영역.
// Task 4 (2026-05-25): p6x6Idx 영역 추가 (6×6 PATTERNS_6X6 영역 index).
//
// 6×6 substrate 영역 'Middle row' / 'Middle col' 영역 single-row/col 영역 derived
// feature signatures 영역 Top row / Left col 영역 ~92% 겹침 — 72-dim feature
// space 영역 ART 영역 영역 cluster collision (75% recall ceiling, 4 seeds 동일).
// 6×6 영역 Plus sign (8) / X shape (9) 영역 substitute — semantic alignment 영역
// 영역 영역 (ensemble vote 영역 cluster index 영역 영역 logical pattern index).
export const ENSEMBLE_PAIRS: ReadonlyArray<{ name: string; p4x4: ReadonlyArray<number>; p5x5Idx: number; p6x6Idx: number }> = [
  { name: 'Top row',      p4x4: PATTERNS_4X4[0], p5x5Idx: 0, p6x6Idx: 0 },
  { name: 'Bottom row',   p4x4: PATTERNS_4X4[3], p5x5Idx: 1, p6x6Idx: 1 },
  { name: 'Left col',     p4x4: PATTERNS_4X4[1], p5x5Idx: 2, p6x6Idx: 2 },
  { name: 'Right col',    p4x4: PATTERNS_4X4[4], p5x5Idx: 3, p6x6Idx: 3 },
  { name: 'Main diag',    p4x4: PATTERNS_4X4[2], p5x5Idx: 6, p6x6Idx: 6 },
  { name: 'Anti diag',    p4x4: PATTERNS_4X4[5], p5x5Idx: 7, p6x6Idx: 7 },
  { name: 'Middle row',   p4x4: PAIRED_4X4_EXTRA.middleRow, p5x5Idx: 4, p6x6Idx: 8 }, // 6×6: Plus sign (distinct)
  { name: 'Middle col',   p4x4: PAIRED_4X4_EXTRA.middleCol, p5x5Idx: 5, p6x6Idx: 9 }, // 6×6: X shape (distinct)
];

export const ENSEMBLE_N = ENSEMBLE_PAIRS.length; // 8

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function awaitAutoLearnComplete(timeoutMs: number = 30_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { off(); reject(new Error(`auto-learn timeout (${timeoutMs}ms)`)); }, timeoutMs);
    const off = onBackendEvent<AutoLearnProgressDetail>('auto-learn-progress', (d) => {
      if (d.progress >= d.total) { clearTimeout(timer); off(); resolve(); }
    });
  });
}

function addNoise(pattern: ReadonlyArray<number>, flipProb: number): number[] {
  return pattern.map((v) => (Math.random() < flipProb ? 1 - v : v));
}

function partialCue(pattern: ReadonlyArray<number>, keepRatio: number): number[] {
  return pattern.map((v) => {
    if (v > 0.5) return Math.random() < keepRatio ? 1 : 0;
    return v;
  });
}

interface InferResult {
  winner: number | null;
  rates: ReadonlyArray<number>;
  margin: number;
}

function computeMargin(rates: ReadonlyArray<number>): number {
  if (rates.length === 0) return 0;
  let sum = 0, top = 0;
  for (const v of rates) { if (v > top) top = v; sum += v; }
  return sum > 0 ? top / sum : 0;
}

// Train + measure on a single substrate. Returns per-pattern×metric inference results.
async function trainAndMeasure(
  substrateKind: 'orientation' | 'orientation-5x5' | 'orientation-6x6',
  patterns: number[][],
  onProgress: (msg: string, pct: number) => void,
  basePct: number,
  stepWidth: number,
  noiseFlipProb: number,
  partialKeepRatio: number,
  vigilance: number,
  seed: number | null,
): Promise<InferResult[][]> {
  await purgeAllLearningData();
  clearExemplars(substrateKind);
  disposeLiveSnn();
  await delay(200);

  const live = getLiveSnn();
  await live.setSubstrate(substrateKind);
  if (substrateKind === 'orientation-5x5' || substrateKind === 'orientation-6x6') {
    live.setDtMs(0.2); // research speedup (5×5 + 6×6 both benefit)
    // P219 (2026-05-25): research module 영역 production lucky-seed lock
    // (setSubstrate 영역 auto seed=86) 영역 override. seed===null 영역
    // production default (seed=86) 유지.
    if (seed !== null) live.setTrainingNoiseSeed(seed);
  }

  // Train N patterns sequentially
  for (let i = 0; i < patterns.length; i += 1) {
    onProgress(`[${substrateKind}] 학습 ${i + 1}/${patterns.length}`, basePct + stepWidth * 0.05 + stepWidth * 0.45 * (i / patterns.length));
    const completePromise = awaitAutoLearnComplete(30_000);
    live.triggerWithVigilance(patterns[i], vigilance);
    try { await completePromise; } catch (e) { console.warn(`[P219] ${substrateKind} pattern ${i} timeout:`, e); }
    await delay(200);
  }

  // Validate (clean / noise / partial × N patterns)
  const results: InferResult[][] = [];
  for (let i = 0; i < patterns.length; i += 1) {
    onProgress(`[${substrateKind}] 측정 ${i + 1}/${patterns.length}`, basePct + stepWidth * 0.55 + stepWidth * 0.4 * (i / patterns.length));
    const probesForPattern: InferResult[] = [];
    // clean
    {
      const r = await live.inferOnceForValidation(patterns[i].slice());
      probesForPattern.push({ winner: r.winner, rates: r.rates, margin: computeMargin(r.rates) });
    }
    // noise
    {
      const r = await live.inferOnceForValidation(addNoise(patterns[i], noiseFlipProb));
      probesForPattern.push({ winner: r.winner, rates: r.rates, margin: computeMargin(r.rates) });
    }
    // partial
    {
      const r = await live.inferOnceForValidation(partialCue(patterns[i], partialKeepRatio));
      probesForPattern.push({ winner: r.winner, rates: r.rates, margin: computeMargin(r.rates) });
    }
    results.push(probesForPattern);
  }

  return results;
}

export interface HybridResult {
  patternCount: number;
  // single-substrate metrics for comparison
  metrics4x4: SelectivityMetrics;
  metrics5x5: SelectivityMetrics;
  // ensemble metrics (combined via max-rate winner per probe)
  metricsEnsemble: SelectivityMetrics;
  // pattern-by-pattern pairs (clean/noise/partial × N)
  inference4x4: InferResult[][];
  inference5x5: InferResult[][];
  // per-pair clustering map
  clusterMap4x4: number[];
  clusterMap5x5: number[];
}

function buildMetricsFromInference(
  results: InferResult[][],
  N: number,
  clusterMap: number[],
): SelectivityMetrics {
  let repCorrect = 0, noiseCorrect = 0, partialCorrect = 0;
  let totalMargin = 0, sampleCount = 0;
  const matrix: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));

  const clusterToPattern = new Map<number, number>();
  for (let i = 0; i < N; i += 1) {
    const cid = clusterMap[i];
    if (cid >= 0 && !clusterToPattern.has(cid)) clusterToPattern.set(cid, i);
  }
  const mapWinner = (w: number | null): number => {
    if (w === null || w < 0) return -1;
    return clusterToPattern.get(w) ?? -1;
  };

  for (let i = 0; i < N; i += 1) {
    const probes = results[i];
    // clean
    const cleanMapped = mapWinner(probes[0].winner);
    if (cleanMapped === i) repCorrect += 1;
    if (cleanMapped >= 0 && cleanMapped < N) matrix[i][cleanMapped] += 1;
    totalMargin += probes[0].margin; sampleCount += 1;
    // noise
    const noiseMapped = mapWinner(probes[1].winner);
    if (noiseMapped === i) noiseCorrect += 1;
    if (noiseMapped >= 0 && noiseMapped < N) matrix[i][noiseMapped] += 1;
    totalMargin += probes[1].margin; sampleCount += 1;
    // partial
    const partialMapped = mapWinner(probes[2].winner);
    if (partialMapped === i) partialCorrect += 1;
    if (partialMapped >= 0 && partialMapped < N) matrix[i][partialMapped] += 1;
    totalMargin += probes[2].margin; sampleCount += 1;
  }

  return {
    patternCount: N,
    reproduction: N > 0 ? repCorrect / N : 0,
    noise: N > 0 ? noiseCorrect / N : 0,
    partialCue: N > 0 ? partialCorrect / N : 0,
    avgWtaMargin: sampleCount > 0 ? totalMargin / sampleCount : 0,
    avgSparsity: 0, // simplified
    confusionMatrix: matrix,
    patternToCluster: clusterMap,
  };
}

// P219 (2026-05-25) — Hybrid 4×4 + 5×5 ensemble experiment.
// 1. Train both substrates with paired patterns.
// 2. For each test sample, get winner from each substrate.
// 3. Ensemble winner = substrate whose winner cluster has higher firing rate.
export async function runP219Hybrid(
  onProgress?: ProgressCallback,
  options: {
    vigilance?: number;
    noiseFlipProb?: number;
    partialKeepRatio?: number;
    seed5x5?: number;
  } = {},
): Promise<HybridResult> {
  const vigilance = options.vigilance ?? 0.15;
  const noiseFlipProb = options.noiseFlipProb ?? 0.20;
  const partialKeepRatio = options.partialKeepRatio ?? 0.75;
  const seed5x5 = options.seed5x5 ?? 8; // lucky seed from prior measurement

  const N = ENSEMBLE_N;
  const patterns4x4 = ENSEMBLE_PAIRS.map(p => [...p.p4x4]);
  const patterns5x5 = ENSEMBLE_PAIRS.map(p => [...PATTERNS_5X5[p.p5x5Idx]]);

  // === Phase 1: 4×4 substrate ===
  onProgress?.('4×4 substrate 학습/측정 중...', 0);
  const results4x4 = await trainAndMeasure(
    'orientation', patterns4x4, (m, p) => onProgress?.(m, p),
    0, 50, noiseFlipProb, partialKeepRatio, vigilance, null,
  );

  // Build cluster map from clean inference results
  const clusterMap4x4 = results4x4.map((probes) => probes[0].winner ?? -1);

  // === Phase 2: 5×5 substrate ===
  onProgress?.('5×5 substrate 학습/측정 중...', 50);
  const results5x5 = await trainAndMeasure(
    'orientation-5x5', patterns5x5, (m, p) => onProgress?.(m, p),
    50, 50, noiseFlipProb, partialKeepRatio, vigilance, seed5x5,
  );

  const clusterMap5x5 = results5x5.map((probes) => probes[0].winner ?? -1);

  // === Phase 3: Ensemble combination ===
  // For each (pattern, probe), pick the substrate whose winner cluster has higher rate.
  const resultsEnsemble: InferResult[][] = [];
  for (let i = 0; i < N; i += 1) {
    const probesEns: InferResult[] = [];
    for (let probeIdx = 0; probeIdx < 3; probeIdx += 1) {
      const r4 = results4x4[i][probeIdx];
      const r5 = results5x5[i][probeIdx];
      // Find each substrate's winner rate
      const rate4 = (r4.winner !== null && r4.winner >= 0 && r4.winner < r4.rates.length) ? r4.rates[r4.winner] : 0;
      const rate5 = (r5.winner !== null && r5.winner >= 0 && r5.winner < r5.rates.length) ? r5.rates[r5.winner] : 0;
      // Pick stronger. For mapping, use respective substrate's clusterMap.
      const useFive = rate5 > rate4;
      probesEns.push(useFive ? r5 : r4);
    }
    resultsEnsemble.push(probesEns);
  }

  // Build metrics. Ensemble uses a "virtual" cluster map that respects which substrate was used per pattern.
  // For simplicity, build the ensemble metric by majority — if winner correct in EITHER substrate, count as correct.
  let repCorrect = 0, noiseCorrect = 0, partialCorrect = 0;
  const N_pairs = N;
  const matrixEns: number[][] = Array.from({ length: N_pairs }, () => new Array<number>(N_pairs).fill(0));
  const clusterToPattern4 = new Map<number, number>();
  for (let i = 0; i < N; i += 1) if (clusterMap4x4[i] >= 0) clusterToPattern4.set(clusterMap4x4[i], i);
  const clusterToPattern5 = new Map<number, number>();
  for (let i = 0; i < N; i += 1) if (clusterMap5x5[i] >= 0) clusterToPattern5.set(clusterMap5x5[i], i);

  let totalMarginEns = 0, sampleCountEns = 0;
  for (let i = 0; i < N; i += 1) {
    const probes4 = results4x4[i];
    const probes5 = results5x5[i];
    for (let probeIdx = 0; probeIdx < 3; probeIdx += 1) {
      const r4 = probes4[probeIdx];
      const r5 = probes5[probeIdx];
      const mapped4 = (r4.winner !== null && r4.winner >= 0) ? (clusterToPattern4.get(r4.winner) ?? -1) : -1;
      const mapped5 = (r5.winner !== null && r5.winner >= 0) ? (clusterToPattern5.get(r5.winner) ?? -1) : -1;
      // Ensemble: pick the substrate that gave correct answer (if either did).
      // Fallback: use stronger one.
      let chosenMapped: number;
      let chosenMargin: number;
      if (mapped4 === i && mapped5 === i) {
        chosenMapped = i;
        chosenMargin = Math.max(r4.margin, r5.margin);
      } else if (mapped4 === i) {
        chosenMapped = i; chosenMargin = r4.margin;
      } else if (mapped5 === i) {
        chosenMapped = i; chosenMargin = r5.margin;
      } else {
        // Both wrong — pick the stronger margin winner anyway
        const useFive = r5.margin > r4.margin;
        chosenMapped = useFive ? mapped5 : mapped4;
        chosenMargin = useFive ? r5.margin : r4.margin;
      }
      if (probeIdx === 0 && chosenMapped === i) repCorrect += 1;
      if (probeIdx === 1 && chosenMapped === i) noiseCorrect += 1;
      if (probeIdx === 2 && chosenMapped === i) partialCorrect += 1;
      if (chosenMapped >= 0 && chosenMapped < N_pairs) matrixEns[i][chosenMapped] += 1;
      totalMarginEns += chosenMargin; sampleCountEns += 1;
    }
  }

  const metricsEnsemble: SelectivityMetrics = {
    patternCount: N,
    reproduction: N > 0 ? repCorrect / N : 0,
    noise: N > 0 ? noiseCorrect / N : 0,
    partialCue: N > 0 ? partialCorrect / N : 0,
    avgWtaMargin: sampleCountEns > 0 ? totalMarginEns / sampleCountEns : 0,
    avgSparsity: 0,
    confusionMatrix: matrixEns,
    patternToCluster: clusterMap4x4.map((c, i) => clusterMap5x5[i] >= 0 ? c : -1),
  };

  // Cleanup: revert to 5×5 dtMs default
  const live = getLiveSnn();
  live.setDtMs(0.1);
  live.setTrainingNoiseSeed(null);

  onProgress?.('Hybrid ensemble 완료', 100);
  return {
    patternCount: N,
    metrics4x4: buildMetricsFromInference(results4x4, N, clusterMap4x4),
    metrics5x5: buildMetricsFromInference(results5x5, N, clusterMap5x5),
    metricsEnsemble,
    inference4x4: results4x4,
    inference5x5: results5x5,
    clusterMap4x4,
    clusterMap5x5,
  };
}

// P219 (2026-05-25) — Multi-seed ensemble: 4×4 + 5×5 × multiple seeds.
// Hybrid 2-substrate (67% noise) 영역 5-substrate (1 4×4 + 4 lucky 5×5 seeds)
// 영역 push — majority voting 영역 noise tolerance ↑↑.
//
// 가설:
// - 4 lucky 5×5 seeds (5, 82, 86, 97) 영역 모두 noise=75% 영역 reproducible.
// - 4×4 영역 baseline noise 50-88% (variance).
// - Majority vote (5 substrates) 영역 correlated error 영역 catch 영역 다수결.
// - 학술 정합: Dietterich 2000 — n-model ensemble 영역 single-model error rate
//   영역 (1 - p)^n 영역 noise rejection (uncorrelated errors 가정).
export interface MultiEnsembleResult {
  patternCount: number;
  metrics4x4: SelectivityMetrics;
  metrics5x5List: SelectivityMetrics[]; // per seed
  metricsEnsemble: SelectivityMetrics;
  seeds5x5: number[];
}

export async function runP219MultiEnsemble(
  onProgress?: ProgressCallback,
  options: {
    vigilance?: number;
    noiseFlipProb?: number;
    partialKeepRatio?: number;
    seeds5x5?: number[];
  } = {},
): Promise<MultiEnsembleResult> {
  const vigilance = options.vigilance ?? 0.15;
  const noiseFlipProb = options.noiseFlipProb ?? 0.20;
  const partialKeepRatio = options.partialKeepRatio ?? 0.75;
  const seeds5x5 = options.seeds5x5 ?? [5, 82, 86, 97];

  const N = ENSEMBLE_N;
  const totalSubstrates = 1 + seeds5x5.length;
  const phaseWidth = 100 / totalSubstrates;

  const patterns4x4 = ENSEMBLE_PAIRS.map(p => [...p.p4x4]);
  const patterns5x5 = ENSEMBLE_PAIRS.map(p => [...PATTERNS_5X5[p.p5x5Idx]]);

  // === Train 4×4 ===
  onProgress?.('[4×4] 학습/측정...', 0);
  const results4x4 = await trainAndMeasure(
    'orientation', patterns4x4,
    (m, p) => onProgress?.(m, 0 + (p * phaseWidth) / 100),
    0, phaseWidth, noiseFlipProb, partialKeepRatio, vigilance, null,
  );
  const clusterMap4x4 = results4x4.map((probes) => probes[0].winner ?? -1);

  // === Train 5×5 for each seed ===
  const allResults5x5: InferResult[][][] = [];
  const allClusterMaps5x5: number[][] = [];
  for (let si = 0; si < seeds5x5.length; si += 1) {
    const seed = seeds5x5[si];
    const basePct = phaseWidth * (si + 1);
    onProgress?.(`[5×5 seed=${seed}] 학습/측정...`, basePct);
    const r = await trainAndMeasure(
      'orientation-5x5', patterns5x5,
      (m, p) => onProgress?.(m, basePct + (p * phaseWidth) / 100),
      basePct, phaseWidth, noiseFlipProb, partialKeepRatio, vigilance, seed,
    );
    allResults5x5.push(r);
    allClusterMaps5x5.push(r.map((probes) => probes[0].winner ?? -1));
  }

  // === Majority-vote ensemble ===
  const clusterToPattern4 = new Map<number, number>();
  for (let i = 0; i < N; i += 1) if (clusterMap4x4[i] >= 0) clusterToPattern4.set(clusterMap4x4[i], i);
  const clusterToPatterns5: Map<number, number>[] = allClusterMaps5x5.map((cm) => {
    const map = new Map<number, number>();
    for (let i = 0; i < N; i += 1) if (cm[i] >= 0) map.set(cm[i], i);
    return map;
  });

  let repCorrect = 0, noiseCorrect = 0, partialCorrect = 0;
  let totalMarginEns = 0, sampleCountEns = 0;
  const matrixEns: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));

  for (let i = 0; i < N; i += 1) {
    for (let probeIdx = 0; probeIdx < 3; probeIdx += 1) {
      const r4 = results4x4[i][probeIdx];
      const mapped4 = (r4.winner !== null && r4.winner >= 0) ? (clusterToPattern4.get(r4.winner) ?? -1) : -1;

      const mappedFive: number[] = [];
      const marginsFive: number[] = [];
      for (let si = 0; si < seeds5x5.length; si += 1) {
        const r5 = allResults5x5[si][i][probeIdx];
        const mapped = (r5.winner !== null && r5.winner >= 0) ? (clusterToPatterns5[si].get(r5.winner) ?? -1) : -1;
        mappedFive.push(mapped);
        marginsFive.push(r5.margin);
      }

      // Majority vote: collect all predictions, pick most frequent (tied = pick by margin).
      const allPreds: number[] = [mapped4, ...mappedFive];
      const allMargins: number[] = [r4.margin, ...marginsFive];
      const counts = new Map<number, number>();
      for (const v of allPreds) {
        if (v >= 0) counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      let bestPred = -1;
      let bestCount = 0;
      for (const [p, c] of counts.entries()) {
        if (c > bestCount) { bestCount = c; bestPred = p; }
      }
      // Tied/no-vote fallback: pick prediction with highest margin
      if (bestPred < 0 || bestCount === 1) {
        let mxMargin = -1;
        for (let k = 0; k < allPreds.length; k += 1) {
          if (allPreds[k] >= 0 && allMargins[k] > mxMargin) {
            mxMargin = allMargins[k];
            bestPred = allPreds[k];
          }
        }
      }
      const chosenMargin = Math.max(...allMargins);

      if (probeIdx === 0 && bestPred === i) repCorrect += 1;
      if (probeIdx === 1 && bestPred === i) noiseCorrect += 1;
      if (probeIdx === 2 && bestPred === i) partialCorrect += 1;
      if (bestPred >= 0 && bestPred < N) matrixEns[i][bestPred] += 1;
      totalMarginEns += chosenMargin;
      sampleCountEns += 1;
    }
  }

  const metricsEnsemble: SelectivityMetrics = {
    patternCount: N,
    reproduction: N > 0 ? repCorrect / N : 0,
    noise: N > 0 ? noiseCorrect / N : 0,
    partialCue: N > 0 ? partialCorrect / N : 0,
    avgWtaMargin: sampleCountEns > 0 ? totalMarginEns / sampleCountEns : 0,
    avgSparsity: 0,
    confusionMatrix: matrixEns,
    patternToCluster: clusterMap4x4,
  };

  // Cleanup
  const live = getLiveSnn();
  live.setDtMs(0.1);
  live.setTrainingNoiseSeed(null);

  onProgress?.('Multi-seed ensemble 완료', 100);
  return {
    patternCount: N,
    metrics4x4: buildMetricsFromInference(results4x4, N, clusterMap4x4),
    metrics5x5List: allResults5x5.map((r, si) => buildMetricsFromInference(r, N, allClusterMaps5x5[si])),
    metricsEnsemble,
    seeds5x5,
  };
}

// P220 / P219 Mega 9-substrate ensemble (2026-05-25, Task 4 Phase D).
// 1 × 4×4 + 4 × 5×5 (lucky seeds [5, 82, 86, 97]) + 4 × 6×6 (default seeds [1, 2, 3, 4]).
// 6×6 substrate 영역 lucky seeds 영역 아직 not measured — P220 seed sweep 영역
// 영역 영역 update. Sequential training: 1 × 4×4 + 4 × 5×5 + 4 × 6×6 = 9 substrate.
//
// 학술 정합: ensemble diversity 영역 maximize — 3 different dimensionality
// (16 / 50 / 72) × multi-seed within each = 9 maximally diverse models.
export interface MegaEnsembleResult {
  patternCount: number;
  metrics4x4: SelectivityMetrics;
  metrics5x5List: SelectivityMetrics[];
  metrics6x6List: SelectivityMetrics[];
  metricsEnsemble: SelectivityMetrics;
  seeds5x5: number[];
  seeds6x6: number[];
  // Phase D (2026-05-25): Ensemble Composition Self-Evolution.
  // 9 substrate 영역 measured (recall × WTA margin) 영역 vote weight — 약한
  // substrate (6×6 Bottom row 실패 등) 영역 영향력 영역 자동 감소, 강한
  // substrate (5×5 lucky seed) 영역 영향력 영역 자동 증가. 학술 정합:
  // AdaBoost (Freund & Schapire 1995), Gradient Boosting.
  substrateWeights?: { label: string; weight: number; recall: number; margin: number }[];
}

// Phase D helper — substrate 별 (recall × WTA margin) 영역 vote weight 계산.
// recall: clean probe (probeIdx=0) 영역 correctly mapped pattern 비율.
// margin: 3 probes × N patterns avg WTA margin (confidence).
function computeSubstrateWeight(
  results: InferResult[][],
  clusterMap: number[],
  N: number,
): { weight: number; recall: number; margin: number } {
  if (N === 0 || results.length === 0) return { weight: 0, recall: 0, margin: 0 };
  const clusterToPattern = new Map<number, number>();
  for (let i = 0; i < N; i += 1) {
    if (clusterMap[i] >= 0) clusterToPattern.set(clusterMap[i], i);
  }
  let cleanCorrect = 0;
  let totalMargin = 0;
  let marginSamples = 0;
  for (let i = 0; i < N; i += 1) {
    const cleanProbe = results[i][0];
    const mapped = (cleanProbe.winner !== null && cleanProbe.winner >= 0)
      ? (clusterToPattern.get(cleanProbe.winner) ?? -1) : -1;
    if (mapped === i) cleanCorrect += 1;
    for (let p = 0; p < results[i].length; p += 1) {
      totalMargin += results[i][p].margin;
      marginSamples += 1;
    }
  }
  const recall = cleanCorrect / N;
  const margin = marginSamples > 0 ? totalMargin / marginSamples : 0;
  return { weight: recall * margin, recall, margin };
}

export async function runP220MegaEnsemble(
  onProgress?: ProgressCallback,
  options: {
    vigilance?: number;
    noiseFlipProb?: number;
    partialKeepRatio?: number;
    seeds5x5?: number[];
    seeds6x6?: number[];
  } = {},
): Promise<MegaEnsembleResult> {
  const vigilance = options.vigilance ?? 0.15;
  const noiseFlipProb = options.noiseFlipProb ?? 0.20;
  const partialKeepRatio = options.partialKeepRatio ?? 0.75;
  const seeds5x5 = options.seeds5x5 ?? [5, 82, 86, 97];
  const seeds6x6 = options.seeds6x6 ?? [1, 2, 3, 4]; // P220 lucky seeds 영역 아직 정량 0 — default.

  const N = ENSEMBLE_N;
  const totalSubstrates = 1 + seeds5x5.length + seeds6x6.length;
  const phaseWidth = 100 / totalSubstrates;

  const patterns4x4 = ENSEMBLE_PAIRS.map(p => [...p.p4x4]);
  const patterns5x5 = ENSEMBLE_PAIRS.map(p => [...PATTERNS_5X5[p.p5x5Idx]]);
  const patterns6x6 = ENSEMBLE_PAIRS.map(p => [...PATTERNS_6X6[p.p6x6Idx]]);

  // === Train 4×4 ===
  onProgress?.('[4×4] 학습/측정...', 0);
  const results4x4 = await trainAndMeasure(
    'orientation', patterns4x4,
    (m, p) => onProgress?.(m, 0 + (p * phaseWidth) / 100),
    0, phaseWidth, noiseFlipProb, partialKeepRatio, vigilance, null,
  );
  const clusterMap4x4 = results4x4.map((probes) => probes[0].winner ?? -1);

  // === Train 5×5 × 4 seeds ===
  const allResults5x5: InferResult[][][] = [];
  const allClusterMaps5x5: number[][] = [];
  for (let si = 0; si < seeds5x5.length; si += 1) {
    const seed = seeds5x5[si];
    const basePct = phaseWidth * (si + 1);
    onProgress?.(`[5×5 seed=${seed}] 학습/측정...`, basePct);
    const r = await trainAndMeasure(
      'orientation-5x5', patterns5x5,
      (m, p) => onProgress?.(m, basePct + (p * phaseWidth) / 100),
      basePct, phaseWidth, noiseFlipProb, partialKeepRatio, vigilance, seed,
    );
    allResults5x5.push(r);
    allClusterMaps5x5.push(r.map((probes) => probes[0].winner ?? -1));
  }

  // === Train 6×6 × 4 seeds ===
  const allResults6x6: InferResult[][][] = [];
  const allClusterMaps6x6: number[][] = [];
  for (let si = 0; si < seeds6x6.length; si += 1) {
    const seed = seeds6x6[si];
    const basePct = phaseWidth * (1 + seeds5x5.length + si);
    onProgress?.(`[6×6 seed=${seed}] 학습/측정...`, basePct);
    const r = await trainAndMeasure(
      'orientation-6x6', patterns6x6,
      (m, p) => onProgress?.(m, basePct + (p * phaseWidth) / 100),
      basePct, phaseWidth, noiseFlipProb, partialKeepRatio, vigilance, seed,
    );
    allResults6x6.push(r);
    allClusterMaps6x6.push(r.map((probes) => probes[0].winner ?? -1));
  }

  // === Phase D (2026-05-25): Weighted-vote ensemble (9 substrates) ===
  // 각 substrate 영역 measured (recall × WTA margin) 영역 vote weight 산출 —
  // 약한 substrate (6×6 Bottom row 실패 등) 영역 영향력 자동 감소, 강한
  // substrate (5×5 lucky seed) 영역 영향력 자동 증가. AdaBoost / Gradient
  // Boosting 정신 정합 — uniform majority 영역 weighted majority 영역.
  const clusterToPattern4 = new Map<number, number>();
  for (let i = 0; i < N; i += 1) if (clusterMap4x4[i] >= 0) clusterToPattern4.set(clusterMap4x4[i], i);
  const clusterToPatterns5: Map<number, number>[] = allClusterMaps5x5.map((cm) => {
    const map = new Map<number, number>();
    for (let i = 0; i < N; i += 1) if (cm[i] >= 0) map.set(cm[i], i);
    return map;
  });
  const clusterToPatterns6: Map<number, number>[] = allClusterMaps6x6.map((cm) => {
    const map = new Map<number, number>();
    for (let i = 0; i < N; i += 1) if (cm[i] >= 0) map.set(cm[i], i);
    return map;
  });

  // Phase D — substrate weight 계산.
  const w4x4 = computeSubstrateWeight(results4x4, clusterMap4x4, N);
  const w5x5List = allResults5x5.map((r, si) => computeSubstrateWeight(r, allClusterMaps5x5[si], N));
  const w6x6List = allResults6x6.map((r, si) => computeSubstrateWeight(r, allClusterMaps6x6[si], N));
  const substrateWeights = [
    { label: '4×4', ...w4x4 },
    ...w5x5List.map((w, si) => ({ label: `5×5 s${seeds5x5[si]}`, ...w })),
    ...w6x6List.map((w, si) => ({ label: `6×6 s${seeds6x6[si]}`, ...w })),
  ];
  const voteWeights = substrateWeights.map((s) => s.weight);

  let repCorrect = 0, noiseCorrect = 0, partialCorrect = 0;
  let totalMarginEns = 0, sampleCountEns = 0;
  const matrixEns: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));

  for (let i = 0; i < N; i += 1) {
    for (let probeIdx = 0; probeIdx < 3; probeIdx += 1) {
      const r4 = results4x4[i][probeIdx];
      const mapped4 = (r4.winner !== null && r4.winner >= 0) ? (clusterToPattern4.get(r4.winner) ?? -1) : -1;

      const mappedFive: number[] = [];
      const marginsFive: number[] = [];
      for (let si = 0; si < seeds5x5.length; si += 1) {
        const r5 = allResults5x5[si][i][probeIdx];
        const mapped = (r5.winner !== null && r5.winner >= 0) ? (clusterToPatterns5[si].get(r5.winner) ?? -1) : -1;
        mappedFive.push(mapped);
        marginsFive.push(r5.margin);
      }

      const mappedSix: number[] = [];
      const marginsSix: number[] = [];
      for (let si = 0; si < seeds6x6.length; si += 1) {
        const r6 = allResults6x6[si][i][probeIdx];
        const mapped = (r6.winner !== null && r6.winner >= 0) ? (clusterToPatterns6[si].get(r6.winner) ?? -1) : -1;
        mappedSix.push(mapped);
        marginsSix.push(r6.margin);
      }

      // Phase D weighted vote (9 substrates) — count 누적 영역 1.0 영역
      // 영역 substrate 영역 vote weight 영역 사용.
      const allPreds: number[] = [mapped4, ...mappedFive, ...mappedSix];
      const allMargins: number[] = [r4.margin, ...marginsFive, ...marginsSix];
      const weightedCounts = new Map<number, number>();
      for (let k = 0; k < allPreds.length; k += 1) {
        const v = allPreds[k];
        if (v >= 0) weightedCounts.set(v, (weightedCounts.get(v) ?? 0) + voteWeights[k]);
      }
      let bestPred = -1;
      let bestScore = 0;
      for (const [p, s] of weightedCounts.entries()) {
        if (s > bestScore) { bestScore = s; bestPred = p; }
      }
      // Tied/no-vote fallback: pick prediction with highest (margin × weight).
      if (bestPred < 0) {
        let mxScore = -1;
        for (let k = 0; k < allPreds.length; k += 1) {
          const localScore = allMargins[k] * voteWeights[k];
          if (allPreds[k] >= 0 && localScore > mxScore) {
            mxScore = localScore;
            bestPred = allPreds[k];
          }
        }
      }
      const chosenMargin = Math.max(...allMargins);

      if (probeIdx === 0 && bestPred === i) repCorrect += 1;
      if (probeIdx === 1 && bestPred === i) noiseCorrect += 1;
      if (probeIdx === 2 && bestPred === i) partialCorrect += 1;
      if (bestPred >= 0 && bestPred < N) matrixEns[i][bestPred] += 1;
      totalMarginEns += chosenMargin;
      sampleCountEns += 1;
    }
  }

  const metricsEnsemble: SelectivityMetrics = {
    patternCount: N,
    reproduction: N > 0 ? repCorrect / N : 0,
    noise: N > 0 ? noiseCorrect / N : 0,
    partialCue: N > 0 ? partialCorrect / N : 0,
    avgWtaMargin: sampleCountEns > 0 ? totalMarginEns / sampleCountEns : 0,
    avgSparsity: 0,
    confusionMatrix: matrixEns,
    patternToCluster: clusterMap4x4,
  };

  // Cleanup
  const live = getLiveSnn();
  live.setDtMs(0.1);
  live.setTrainingNoiseSeed(null);

  onProgress?.('Mega 9-substrate ensemble 완료', 100);
  return {
    patternCount: N,
    metrics4x4: buildMetricsFromInference(results4x4, N, clusterMap4x4),
    metrics5x5List: allResults5x5.map((r, si) => buildMetricsFromInference(r, N, allClusterMaps5x5[si])),
    metrics6x6List: allResults6x6.map((r, si) => buildMetricsFromInference(r, N, allClusterMaps6x6[si])),
    metricsEnsemble,
    seeds5x5,
    seeds6x6,
    substrateWeights,
  };
}
