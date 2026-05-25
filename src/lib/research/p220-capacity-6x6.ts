// P220: 6×6 input expansion capacity test (2026-05-25, Task 4).
//
// P218 영역 5×5 (50-dim, partial +37%p / noise -13%p) 영역 영역 영역 영역 영역
// 6×6 (72-dim) substrate 영역 ensemble member 추가. 더 큰 substrate diversity
// 영역 P219 영역 9-substrate ensemble (1×4×4 + 4×5×5 + 4×6×6) 영역 component.
//
// 12 standard 6×6 patterns (P218 영역 동일 semantic, 6×6 grid 영역 확장):
//   0. Top row, 1. Bottom row, 2. Left col, 3. Right col
//   4. Middle row, 5. Middle col, 6. Main diag, 7. Anti-diag
//   8. Plus sign (+), 9. X shape, 10. Frame border, 11. T-shape

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';
import type { SelectivityMetrics, ProgressCallback } from './p213-selectivity';

// 12 standard 6×6 binary patterns (36-dim each).
export const PATTERNS_6X6: ReadonlyArray<ReadonlyArray<number>> = [
  // 0. Top row (row 0): cells 0-5
  [1,1,1,1,1,1, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0],
  // 1. Bottom row (row 5): cells 30-35
  [0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 1,1,1,1,1,1],
  // 2. Left col (col 0): cells 0,6,12,18,24,30
  [1,0,0,0,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0, 1,0,0,0,0,0],
  // 3. Right col (col 5): cells 5,11,17,23,29,35
  [0,0,0,0,0,1, 0,0,0,0,0,1, 0,0,0,0,0,1, 0,0,0,0,0,1, 0,0,0,0,0,1, 0,0,0,0,0,1],
  // 4. Middle row (row 2): cells 12-17
  [0,0,0,0,0,0, 0,0,0,0,0,0, 1,1,1,1,1,1, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0],
  // 5. Middle col (col 2): cells 2,8,14,20,26,32
  [0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0],
  // 6. Main diagonal: 0, 7, 14, 21, 28, 35
  [1,0,0,0,0,0, 0,1,0,0,0,0, 0,0,1,0,0,0, 0,0,0,1,0,0, 0,0,0,0,1,0, 0,0,0,0,0,1],
  // 7. Anti-diagonal: 5, 10, 15, 20, 25, 30
  [0,0,0,0,0,1, 0,0,0,0,1,0, 0,0,0,1,0,0, 0,0,1,0,0,0, 0,1,0,0,0,0, 1,0,0,0,0,0],
  // 8. Plus sign (row 2 + col 2): row 2 + col 2 union
  [0,0,1,0,0,0, 0,0,1,0,0,0, 1,1,1,1,1,1, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0],
  // 9. X shape (both diagonals): main + anti
  [1,0,0,0,0,1, 0,1,0,0,1,0, 0,0,1,1,0,0, 0,0,1,1,0,0, 0,1,0,0,1,0, 1,0,0,0,0,1],
  // 10. Frame border (top + bot + left+right mid cells)
  [1,1,1,1,1,1, 1,0,0,0,0,1, 1,0,0,0,0,1, 1,0,0,0,0,1, 1,0,0,0,0,1, 1,1,1,1,1,1],
  // 11. T-shape (top row + middle col)
  [1,1,1,1,1,1, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0],
];

export const PATTERN_NAMES_6X6: ReadonlyArray<string> = [
  'Top row', 'Bottom row', 'Left col', 'Right col',
  'Middle row', 'Middle col', 'Main diag', 'Anti-diag',
  'Plus sign', 'X shape', 'Frame', 'T-shape',
];

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function computeSparsity(rates: ReadonlyArray<number>): number {
  let sum = 0, sumSq = 0;
  for (const v of rates) { sum += v; sumSq += v * v; }
  if (sum <= 0 || sumSq <= 0 || rates.length === 0) return 0;
  const s = (sum * sum) / (rates.length * sumSq);
  return Math.max(0, Math.min(1, 1 - s));
}

function computeMargin(rates: ReadonlyArray<number>): number {
  if (rates.length === 0) return 0;
  let sum = 0, top = 0;
  for (const v of rates) { if (v > top) top = v; sum += v; }
  return sum > 0 ? top / sum : 0;
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
    const timer = setTimeout(() => { off(); reject(new Error(`auto-learn timeout (${timeoutMs}ms)`)); }, timeoutMs);
    const off = onBackendEvent<AutoLearnProgressDetail>('auto-learn-progress', (d) => {
      if (d.progress >= d.total) { clearTimeout(timer); off(); resolve(); }
    });
  });
}

export interface RunOptionsP220 {
  patternCounts?: number[];
  vigilance?: number;
  noiseFlipProb?: number;
  partialKeepRatio?: number;
  settleMs?: number;
  trainTimeoutMs?: number;
}

const DEFAULT_OPTS: Required<RunOptionsP220> = {
  patternCounts: [3, 6, 8, 10, 12],
  vigilance: 0.15,
  noiseFlipProb: 0.20,
  partialKeepRatio: 0.75,
  settleMs: 200,
  trainTimeoutMs: 30_000,
};

export async function runP220Experiment(
  onProgress?: ProgressCallback,
  options: RunOptionsP220 = {},
): Promise<SelectivityMetrics[]> {
  const opts: Required<RunOptionsP220> = { ...DEFAULT_OPTS, ...options };
  const results: SelectivityMetrics[] = [];
  const steps = opts.patternCounts.length;

  for (let stepIdx = 0; stepIdx < steps; stepIdx += 1) {
    const N = opts.patternCounts[stepIdx];
    const basePct = (stepIdx / steps) * 100;
    const stepWidth = (1 / steps) * 100;

    onProgress?.(`[N=${N}] 6×6 학습 데이터 reset 중...`, basePct);

    await purgeAllLearningData();
    clearExemplars('orientation-6x6');
    disposeLiveSnn();
    await delay(opts.settleMs);

    const live = getLiveSnn();
    await live.setSubstrate('orientation-6x6');
    live.setDtMs(0.2); // research speedup

    const patternToCluster: number[] = new Array(N).fill(-1);
    for (let i = 0; i < N; i += 1) {
      onProgress?.(
        `[N=${N}] 패턴 ${i + 1}/${N} (${PATTERN_NAMES_6X6[i]}) 학습 중...`,
        basePct + stepWidth * (0.05 + (0.55 * (i / N))),
      );
      const pat = PATTERNS_6X6[i].slice();
      const completePromise = awaitAutoLearnComplete(opts.trainTimeoutMs);
      live.triggerWithVigilance(pat, opts.vigilance);
      try { await completePromise; } catch (e) { console.warn(`[P220] N=${N} pattern ${i} timeout:`, e); }
      await delay(opts.settleMs);

      const probe = await live.inferOnceForValidation(pat);
      patternToCluster[i] = probe.winner ?? -1;
    }

    // Validation
    onProgress?.(`[N=${N}] validation 측정 중...`, basePct + stepWidth * 0.7);
    let repCorrect = 0, noiseCorrect = 0, partialCorrect = 0;
    let totalMargin = 0, totalSparsity = 0, sampleCount = 0;
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
      // reproduction
      {
        const r = await live.inferOnceForValidation(PATTERNS_6X6[i].slice());
        const mapped = mapWinner(r.winner);
        if (mapped === i) repCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      // noise
      {
        const r = await live.inferOnceForValidation(addNoise(PATTERNS_6X6[i], opts.noiseFlipProb));
        const mapped = mapWinner(r.winner);
        if (mapped === i) noiseCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      // partial
      {
        const r = await live.inferOnceForValidation(partialCue(PATTERNS_6X6[i], opts.partialKeepRatio));
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

  // Cleanup
  const live = getLiveSnn();
  live.setDtMs(0.1);

  onProgress?.('P220 실험 완료', 100);
  return results;
}

// Seed sweep for 6×6 substrate (lucky seed discovery).
export interface SeedSweepResult6x6 {
  seed: number;
  metrics: SelectivityMetrics;
}

export async function runP220SeedSweep(
  onProgress?: ProgressCallback,
  seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  patternCount: number = 8,
  options: Omit<RunOptionsP220, 'patternCounts'> = {},
): Promise<SeedSweepResult6x6[]> {
  const results: SeedSweepResult6x6[] = [];
  const total = seeds.length;
  for (let i = 0; i < total; i += 1) {
    const seed = seeds[i];
    const basePct = (i / total) * 100;
    const stepWidth = (1 / total) * 100;
    onProgress?.(`[seed=${seed}] 6×6 N=${patternCount} 측정 중...`, basePct);
    const live = getLiveSnn();
    live.setTrainingNoiseSeed(seed);
    const stepResult = await runP220Experiment(
      (msg, pct) => onProgress?.(`seed=${seed} ${msg}`, basePct + (pct * stepWidth) / 100),
      { ...options, patternCounts: [patternCount] },
    );
    live.setTrainingNoiseSeed(null);
    if (stepResult.length > 0) results.push({ seed, metrics: stepResult[0] });
  }
  onProgress?.('6×6 seed sweep 완료', 100);
  return results;
}
