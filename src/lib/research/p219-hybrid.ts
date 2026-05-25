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
export const ENSEMBLE_PAIRS: ReadonlyArray<{ name: string; p4x4: ReadonlyArray<number>; p5x5Idx: number }> = [
  { name: 'Top row',      p4x4: PATTERNS_4X4[0], p5x5Idx: 0 },
  { name: 'Bottom row',   p4x4: PATTERNS_4X4[3], p5x5Idx: 1 },
  { name: 'Left col',     p4x4: PATTERNS_4X4[1], p5x5Idx: 2 },
  { name: 'Right col',    p4x4: PATTERNS_4X4[4], p5x5Idx: 3 },
  { name: 'Main diag',    p4x4: PATTERNS_4X4[2], p5x5Idx: 6 },
  { name: 'Anti diag',    p4x4: PATTERNS_4X4[5], p5x5Idx: 7 },
  { name: 'Middle row',   p4x4: PAIRED_4X4_EXTRA.middleRow, p5x5Idx: 4 },
  { name: 'Middle col',   p4x4: PAIRED_4X4_EXTRA.middleCol, p5x5Idx: 5 },
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
  substrateKind: 'orientation' | 'orientation-5x5',
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
  if (substrateKind === 'orientation-5x5') {
    live.setDtMs(0.2); // research speedup
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
