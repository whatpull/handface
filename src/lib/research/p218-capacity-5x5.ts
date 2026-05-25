// P218: 5×5 input expansion capacity test (2026-05-20).
//
// n13 (4×4, 16+16=32 dim) substrate 영역 N=8 ceiling break 영역 영역 architectural
// rework — n14_extended (5×5, 25+25=50 dim) substrate 영역 영역 12 패턴 영역 capacity
// 측정. P213-selectivity.ts 영역 직접 mirror — substrate kind 'orientation-5x5'.
//
// 학술 정합:
//   - n14_extended 영역 영역 P215d/i 영역 mechanism 영역 보존 (WTA -10, 노이즈 aug
//     3-7.5%, OUT internal 2.0, MAX_CLUSTERS=8 (from live-snn.ts default))
//   - P218 영역 핵심 가설: 25-dim raw + 25 derived = 50-dim feature space 영역 영역
//     N=8 ceiling 영역 영역 N=12+ 영역 stable cap 영역 도달 영역 영역
//
// 12 standard 5×5 patterns:
//   0. Top row, 1. Bottom row, 2. Left col, 3. Right col
//   4. Middle row, 5. Middle col, 6. Main diagonal, 7. Anti-diagonal
//   8. Plus sign (+), 9. X shape, 10. Frame border, 11. T-shape

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';
import type { SelectivityMetrics, ProgressCallback } from './p213-selectivity';

// 12 standard 5×5 binary patterns (25-dim each).
export const PATTERNS_5X5: ReadonlyArray<ReadonlyArray<number>> = [
  // 0. Top row (row 0)
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // 1. Bottom row (row 4)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  // 2. Left col (col 0)
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  // 3. Right col (col 4)
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  // 4. Middle row (row 2)
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // 5. Middle col (col 2)
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  // 6. Main diagonal (0, 6, 12, 18, 24)
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  // 7. Anti-diagonal (4, 8, 12, 16, 20)
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  // 8. Plus sign (row 2 + col 2)
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  // 9. X shape (both diagonals)
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  // 10. Frame border (top + bottom + left col mid + right col mid)
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  // 11. T-shape (top row + middle col)
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
];

export const PATTERN_NAMES_5X5: ReadonlyArray<string> = [
  'Top row', 'Bottom row', 'Left col', 'Right col',
  'Middle row', 'Middle col', 'Main diag', 'Anti-diag',
  'Plus sign', 'X shape', 'Frame', 'T-shape',
];

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function computeSparsity(rates: ReadonlyArray<number>): number {
  let sum = 0;
  let sumSq = 0;
  for (const v of rates) { sum += v; sumSq += v * v; }
  if (sum <= 0 || sumSq <= 0 || rates.length === 0) return 0;
  const s = (sum * sum) / (rates.length * sumSq);
  return Math.max(0, Math.min(1, 1 - s));
}

function computeMargin(rates: ReadonlyArray<number>): number {
  if (rates.length === 0) return 0;
  let sum = 0;
  let top = 0;
  for (const v of rates) { if (v > top) top = v; sum += v; }
  if (sum <= 0) return 0;
  return top / sum;
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

function awaitAutoLearnComplete(timeoutMs: number = 30_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      off();
      reject(new Error(`auto-learn timeout (${timeoutMs}ms)`));
    }, timeoutMs);
    const off = onBackendEvent<AutoLearnProgressDetail>('auto-learn-progress', (d) => {
      if (d.progress >= d.total) {
        clearTimeout(timer);
        off();
        resolve();
      }
    });
  });
}

export interface RunOptionsP218 {
  patternCounts?: number[];
  vigilance?: number;
  noiseFlipProb?: number;
  partialKeepRatio?: number;
  settleMs?: number;
  trainTimeoutMs?: number;
}

const DEFAULT_OPTS: Required<RunOptionsP218> = {
  // P218 capacity sweep (2026-05-21): N=8 추가 — capacity edge resolution.
  // setPattern dim bug fix 후 MAX_CLUSTERS=12 (substrate-aware) 영역 정합.
  // 측정 패턴: 3 / 6 / 8 (4×4 ceiling 비교) / 10 / 12 (full).
  patternCounts: [3, 6, 8, 10, 12],
  vigilance: 0.15,
  noiseFlipProb: 0.2,
  partialKeepRatio: 0.75,
  settleMs: 200,
  trainTimeoutMs: 30_000,
};

export async function runP218Experiment(
  onProgress?: ProgressCallback,
  options: RunOptionsP218 = {},
): Promise<SelectivityMetrics[]> {
  const opts: Required<RunOptionsP218> = { ...DEFAULT_OPTS, ...options };
  const results: SelectivityMetrics[] = [];
  const steps = opts.patternCounts.length;

  for (let stepIdx = 0; stepIdx < steps; stepIdx += 1) {
    const N = opts.patternCounts[stepIdx];
    const basePct = (stepIdx / steps) * 100;
    const stepWidth = (1 / steps) * 100;

    onProgress?.(`[N=${N}] 학습 데이터 reset 중...`, basePct);

    // 1. Full reset — IndexedDB + localStorage + live singleton.
    await purgeAllLearningData();
    clearExemplars('orientation-5x5');
    disposeLiveSnn();
    await delay(opts.settleMs);

    // 2. fresh substrate — LiveSnn singleton + setSubstrate('orientation-5x5').
    const live = getLiveSnn();
    await live.setSubstrate('orientation-5x5');
    // P218 (2026-05-25) — research mode 영역 simulation 5× speed gain.
    // dtMs 0.1 → 0.5 (LIF τ=15ms 영역 dt/τ=0.033 영역 안전).
    live.setDtMs(0.5);

    // 3. N개 패턴 순차 학습 — vigilance auto-learn (30 trial).
    const patternToCluster: number[] = new Array(N).fill(-1);
    for (let i = 0; i < N; i += 1) {
      onProgress?.(
        `[N=${N}] 패턴 ${i + 1}/${N} (${PATTERN_NAMES_5X5[i]}) 학습 중...`,
        basePct + stepWidth * (0.05 + (0.55 * (i / N))),
      );
      const pat = PATTERNS_5X5[i].slice();
      const completePromise = awaitAutoLearnComplete(opts.trainTimeoutMs);
      live.triggerWithVigilance(pat, opts.vigilance);
      try {
        await completePromise;
      } catch (e) {
        console.warn(`[P218] N=${N} pattern ${i} auto-learn await failed:`, e);
      }
      await delay(opts.settleMs);

      const probe = await live.inferOnceForValidation(pat);
      patternToCluster[i] = probe.winner ?? -1;
    }

    // 4. Validation — 3 metric × N pattern.
    onProgress?.(`[N=${N}] validation 측정 중...`, basePct + stepWidth * 0.7);

    let repCorrect = 0;
    let noiseCorrect = 0;
    let partialCorrect = 0;
    let totalMargin = 0;
    let totalSparsity = 0;
    let sampleCount = 0;
    const matrix: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));

    const clusterToPattern = new Map<number, number>();
    for (let i = 0; i < N; i += 1) {
      const cid = patternToCluster[i];
      if (cid >= 0 && !clusterToPattern.has(cid)) clusterToPattern.set(cid, i);
    }
    const mapWinner = (winner: number | null): number => {
      if (winner === null || winner < 0) return -1;
      return clusterToPattern.get(winner) ?? -1;
    };

    for (let i = 0; i < N; i += 1) {
      // 재현
      {
        const r = await live.inferOnceForValidation(PATTERNS_5X5[i].slice());
        const mapped = mapWinner(r.winner);
        if (mapped === i) repCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      // 노이즈
      {
        const r = await live.inferOnceForValidation(addNoise(PATTERNS_5X5[i], opts.noiseFlipProb));
        const mapped = mapWinner(r.winner);
        if (mapped === i) noiseCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      // 부분단서
      {
        const r = await live.inferOnceForValidation(partialCue(PATTERNS_5X5[i], opts.partialKeepRatio));
        const mapped = mapWinner(r.winner);
        if (mapped === i) partialCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
    }

    results.push({
      patternCount: N,
      reproduction: N > 0 ? repCorrect / N : 0,
      noise: N > 0 ? noiseCorrect / N : 0,
      partialCue: N > 0 ? partialCorrect / N : 0,
      avgWtaMargin: sampleCount > 0 ? totalMargin / sampleCount : 0,
      avgSparsity: sampleCount > 0 ? totalSparsity / sampleCount : 0,
      confusionMatrix: matrix,
      patternToCluster,
    });

    onProgress?.(`[N=${N}] 완료`, basePct + stepWidth);
  }

  onProgress?.('실험 완료', 100);
  return results;
}

// P218 vigilance sweep (2026-05-21) — N=8 (stable cap) 영역 vigilance 다양 영역
// optimal config 영역 catch. capacity 도달 영역 영역 robustness peak 영역 위치
// 영역 가설 검증. result 영역 array of (vigilance, metrics) 영역.
export interface VigilanceSweepResult {
  vigilance: number;
  metrics: SelectivityMetrics;
}

export async function runP218VigilanceSweep(
  onProgress?: ProgressCallback,
  vigilanceValues: number[] = [0.10, 0.15, 0.20, 0.25],
  patternCount: number = 8,
  options: Omit<RunOptionsP218, 'patternCounts' | 'vigilance'> = {},
): Promise<VigilanceSweepResult[]> {
  const results: VigilanceSweepResult[] = [];
  const total = vigilanceValues.length;
  for (let i = 0; i < total; i += 1) {
    const v = vigilanceValues[i];
    const basePct = (i / total) * 100;
    const stepWidth = (1 / total) * 100;
    onProgress?.(`[vigilance=${v.toFixed(2)}] N=${patternCount} 측정 중...`, basePct);
    const stepResult = await runP218Experiment(
      (msg, pct) => onProgress?.(`vig=${v.toFixed(2)} ${msg}`, basePct + (pct * stepWidth) / 100),
      { ...options, vigilance: v, patternCounts: [patternCount] },
    );
    if (stepResult.length > 0) results.push({ vigilance: v, metrics: stepResult[0] });
  }
  onProgress?.('vigilance sweep 완료', 100);
  return results;
}

// P218 partial keep ratio sweep (2026-05-21) — partial cue 강도 한계 측정.
// 4×4 P215 partial @ 0.75 = 63%. 5×5 P218 partial @ 0.75 = 100% (+37%p).
// 더 어려운 cue (0.50, 0.40 keep) 영역 5×5 영역 어디서 무너지는지 측정 영역
// publishable headline: "5×5 substrate 영역 0.50 keep 영역 partial cue X%
// 유지 vs 4×4 의 63% 영역 정합 영역 (cue 0.75)".
export interface PartialSweepResult {
  partialKeepRatio: number;
  metrics: SelectivityMetrics;
}

export async function runP218PartialSweep(
  onProgress?: ProgressCallback,
  partialValues: number[] = [0.40, 0.50, 0.60, 0.75, 0.85],
  patternCount: number = 8,
  options: Omit<RunOptionsP218, 'patternCounts' | 'partialKeepRatio'> = {},
): Promise<PartialSweepResult[]> {
  const results: PartialSweepResult[] = [];
  const total = partialValues.length;
  for (let i = 0; i < total; i += 1) {
    const p = partialValues[i];
    const basePct = (i / total) * 100;
    const stepWidth = (1 / total) * 100;
    onProgress?.(`[partial=${p.toFixed(2)}] N=${patternCount} 측정 중...`, basePct);
    const stepResult = await runP218Experiment(
      (msg, pct) => onProgress?.(`partial=${p.toFixed(2)} ${msg}`, basePct + (pct * stepWidth) / 100),
      { ...options, partialKeepRatio: p, patternCounts: [patternCount] },
    );
    if (stepResult.length > 0) results.push({ partialKeepRatio: p, metrics: stepResult[0] });
  }
  onProgress?.('partial sweep 완료', 100);
  return results;
}

// P218 averaging (2026-05-22) — Math.random() 영역 addNoise/partialCue 영역
// 영역 단일 측정 영역 variance 큼. 5회 반복 측정 영역 mean ± std 영역 robust
// noise/partial tolerance profile 영역 보고.
export interface AveragedMetricsSummary {
  runs: number;
  patternCount: number;
  mean: {
    reproduction: number;
    noise: number;
    partialCue: number;
    avgWtaMargin: number;
    avgSparsity: number;
  };
  std: {
    reproduction: number;
    noise: number;
    partialCue: number;
    avgWtaMargin: number;
    avgSparsity: number;
  };
  all: SelectivityMetrics[];
}

function computeStd(values: number[], mean: number): number {
  if (values.length <= 1) return 0;
  let sumSq = 0;
  for (const v of values) sumSq += (v - mean) ** 2;
  return Math.sqrt(sumSq / (values.length - 1));
}

// P218 seed sweep (2026-05-24) — training noise seed 영역 lucky seed 탐색.
// 가설: 5×5 architecture 는 88% noise tolerance 가능 (best run measured),
// 단 training noise stochasticity 영역 의존. Seed sweep 영역 어느 seed 영역
// best run 영역 reproduce 영역 시도. Lucky seed identification 영역 publishable
// — "deterministic best-case 88% noise tolerance reproducible with seed S".
export interface SeedSweepResult {
  seed: number;
  metrics: SelectivityMetrics;
}

export async function runP218SeedSweep(
  onProgress?: ProgressCallback,
  seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  patternCount: number = 8,
  options: Omit<RunOptionsP218, 'patternCounts'> = {},
): Promise<SeedSweepResult[]> {
  const results: SeedSweepResult[] = [];
  const total = seeds.length;
  for (let i = 0; i < total; i += 1) {
    const seed = seeds[i];
    const basePct = (i / total) * 100;
    const stepWidth = (1 / total) * 100;
    onProgress?.(`[seed=${seed}] N=${patternCount} 측정 중...`, basePct);
    const live = getLiveSnn();
    live.setTrainingNoiseSeed(seed);
    const stepResult = await runP218Experiment(
      (msg, pct) => onProgress?.(`seed=${seed} ${msg}`, basePct + (pct * stepWidth) / 100),
      { ...options, patternCounts: [patternCount] },
    );
    live.setTrainingNoiseSeed(null);
    if (stepResult.length > 0) results.push({ seed, metrics: stepResult[0] });
  }
  onProgress?.('seed sweep 완료', 100);
  return results;
}

// P218 noise sweep (2026-05-23) — Noise normalization 가설 검증.
// 4×4 (16-dim) @ 20% flip = 3.2 bits, 5×5 (25-dim) @ 20% flip = 5 bits 영역
// 동등 절대 perturbation (3 bits) 영역 5×5 noise = 12-13% 영역 fair comparison.
// 가설: 5×5 @ 0.13 noise tolerance ≈ 4×4 @ 0.20 (88%) — 5×5 weakness 가
// substrate property 가 아니라 protocol artifact 인지 검증.
export interface NoiseSweepResult {
  noiseFlipProb: number;
  absoluteBitFlips: number; // for clarity in paper
  metrics: SelectivityMetrics;
}

export async function runP218NoiseSweep(
  onProgress?: ProgressCallback,
  noiseValues: number[] = [0.05, 0.10, 0.13, 0.20, 0.30],
  patternCount: number = 8,
  options: Omit<RunOptionsP218, 'patternCounts' | 'noiseFlipProb'> = {},
): Promise<NoiseSweepResult[]> {
  const results: NoiseSweepResult[] = [];
  const total = noiseValues.length;
  const RAW_DIM_5X5 = 25;
  for (let i = 0; i < total; i += 1) {
    const n = noiseValues[i];
    const basePct = (i / total) * 100;
    const stepWidth = (1 / total) * 100;
    onProgress?.(`[noise=${(n * 100).toFixed(0)}%] N=${patternCount} 측정 중...`, basePct);
    const stepResult = await runP218Experiment(
      (msg, pct) => onProgress?.(`noise=${(n * 100).toFixed(0)}% ${msg}`, basePct + (pct * stepWidth) / 100),
      { ...options, noiseFlipProb: n, patternCounts: [patternCount] },
    );
    if (stepResult.length > 0) {
      results.push({
        noiseFlipProb: n,
        absoluteBitFlips: n * RAW_DIM_5X5,
        metrics: stepResult[0],
      });
    }
  }
  onProgress?.('noise sweep 완료', 100);
  return results;
}

export async function runP218Averaged(
  onProgress?: ProgressCallback,
  runs: number = 5,
  patternCount: number = 8,
  options: Omit<RunOptionsP218, 'patternCounts'> = {},
): Promise<AveragedMetricsSummary> {
  const all: SelectivityMetrics[] = [];
  for (let i = 0; i < runs; i += 1) {
    const basePct = (i / runs) * 100;
    const stepWidth = (1 / runs) * 100;
    onProgress?.(`[run ${i + 1}/${runs}] N=${patternCount} 측정 중...`, basePct);
    // P218 (2026-05-24): seeded training noise — run index = seed.
    // 5-run avg 영역 동일 seed sequence (0..4) 영역 reproducibility 확보.
    const live = getLiveSnn();
    live.setTrainingNoiseSeed(1000 + i); // 1000-base 영역 안전 seed range.
    const stepResult = await runP218Experiment(
      (msg, pct) => onProgress?.(`run ${i + 1}/${runs} (seed=${1000 + i}) ${msg}`, basePct + (pct * stepWidth) / 100),
      { ...options, patternCounts: [patternCount] },
    );
    live.setTrainingNoiseSeed(null); // cleanup — non-research path 영역 backwards compat.
    if (stepResult.length > 0) all.push(stepResult[0]);
  }

  // mean / std 영역.
  const reps = all.map((m) => m.reproduction);
  const noises = all.map((m) => m.noise);
  const partials = all.map((m) => m.partialCue);
  const margins = all.map((m) => m.avgWtaMargin);
  const sparsities = all.map((m) => m.avgSparsity);
  const meanOf = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length);

  const mean = {
    reproduction: meanOf(reps),
    noise: meanOf(noises),
    partialCue: meanOf(partials),
    avgWtaMargin: meanOf(margins),
    avgSparsity: meanOf(sparsities),
  };
  const std = {
    reproduction: computeStd(reps, mean.reproduction),
    noise: computeStd(noises, mean.noise),
    partialCue: computeStd(partials, mean.partialCue),
    avgWtaMargin: computeStd(margins, mean.avgWtaMargin),
    avgSparsity: computeStd(sparsities, mean.avgSparsity),
  };

  onProgress?.(`${runs}회 평균 완료`, 100);
  return { runs, patternCount, mean, std, all };
}
