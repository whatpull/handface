// P214b: 확장 N — 9개 패턴 영역 N=3..9 sweep.
//
// P213 영역 6개 표준 패턴 + 3개 신규 (T/L/U-shape) = 9개 영역 학습. N 영역
// 3~9 순회 측정 → capacity 한계 영역 정량 (saturation point 검출).
//
// 학술 정합 (P214b — 2026-05-19):
//   - 학습/측정/reset 영역 P213 영역 동일.
//   - patternCounts 영역 [3,4,5,6,7,8,9] 영역 7-step sweep.

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';
import { TEST_PATTERNS, PATTERN_NAMES, type SelectivityMetrics, type ProgressCallback } from './p213-selectivity';

// 9개 확장 패턴 (P213 6개 + 신규 3개).
export const EXTENDED_PATTERNS: ReadonlyArray<ReadonlyArray<number>> = [
  ...TEST_PATTERNS,
  // 7. T-shape (top bar + vertical center)
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  // 8. L-shape (left column + bottom row)
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  // 9. U-shape (left col + right col + bottom row)
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
];

export const EXTENDED_NAMES: ReadonlyArray<string> = [
  ...PATTERN_NAMES,
  'T-shape',
  'L-shape',
  'U-shape',
];

// ── 내부 유틸 ──────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function computeSparsity(rates: ReadonlyArray<number>): number {
  let sum = 0;
  let sumSq = 0;
  for (const v of rates) {
    sum += v;
    sumSq += v * v;
  }
  if (sum <= 0 || sumSq <= 0 || rates.length === 0) return 0;
  const s = (sum * sum) / (rates.length * sumSq);
  return Math.max(0, Math.min(1, 1 - s));
}

function computeMargin(rates: ReadonlyArray<number>): number {
  if (rates.length === 0) return 0;
  let sum = 0;
  let top = 0;
  for (const v of rates) {
    if (v > top) top = v;
    sum += v;
  }
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

// ── 메인 실험 ──────────────────────────────────────────────

export interface ExtendedRunOptions {
  patternCounts?: number[];
  vigilance?: number;
  noiseFlipProb?: number;
  partialKeepRatio?: number;
  settleMs?: number;
  trainTimeoutMs?: number;
}

const DEFAULT_OPTS: Required<ExtendedRunOptions> = {
  patternCounts: [3, 4, 5, 6, 7, 8, 9],
  vigilance: 0.15,
  noiseFlipProb: 0.2,
  partialKeepRatio: 0.75,
  settleMs: 200,
  trainTimeoutMs: 30_000,
};

export async function runP214b(
  onProgress?: ProgressCallback,
  options: ExtendedRunOptions = {},
): Promise<SelectivityMetrics[]> {
  const opts: Required<ExtendedRunOptions> = { ...DEFAULT_OPTS, ...options };
  const results: SelectivityMetrics[] = [];
  const steps = opts.patternCounts.length;

  for (let stepIdx = 0; stepIdx < steps; stepIdx += 1) {
    const N = opts.patternCounts[stepIdx];
    if (N > EXTENDED_PATTERNS.length) {
      console.warn(`[P214b] N=${N} > available patterns ${EXTENDED_PATTERNS.length}, skip`);
      continue;
    }
    const basePct = (stepIdx / steps) * 100;
    const stepWidth = (1 / steps) * 100;

    onProgress?.(`[N=${N}] 학습 데이터 reset 중...`, basePct);
    await purgeAllLearningData();
    clearExemplars('orientation');
    disposeLiveSnn();
    await delay(opts.settleMs);

    const live = getLiveSnn();

    const patternToCluster: number[] = new Array(N).fill(-1);
    for (let i = 0; i < N; i += 1) {
      onProgress?.(
        `[N=${N}] 패턴 ${i + 1}/${N} (${EXTENDED_NAMES[i]}) 학습 중...`,
        basePct + stepWidth * (0.05 + (0.55 * (i / N))),
      );
      const pat = EXTENDED_PATTERNS[i].slice();
      const completePromise = awaitAutoLearnComplete(opts.trainTimeoutMs);
      live.triggerWithVigilance(pat, opts.vigilance);
      try {
        await completePromise;
      } catch (e) {
        console.warn(`[P214b] N=${N} pattern ${i} auto-learn await failed:`, e);
      }
      await delay(opts.settleMs);
      const probe = await live.inferOnceForValidation(pat);
      patternToCluster[i] = probe.winner ?? -1;
    }

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
      if (cid >= 0 && !clusterToPattern.has(cid)) {
        clusterToPattern.set(cid, i);
      }
    }
    const mapWinner = (winner: number | null): number => {
      if (winner === null || winner < 0) return -1;
      return clusterToPattern.get(winner) ?? -1;
    };

    for (let i = 0; i < N; i += 1) {
      {
        const r = await live.inferOnceForValidation(EXTENDED_PATTERNS[i].slice());
        const mapped = mapWinner(r.winner);
        if (mapped === i) repCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      {
        const r = await live.inferOnceForValidation(addNoise(EXTENDED_PATTERNS[i], opts.noiseFlipProb));
        const mapped = mapWinner(r.winner);
        if (mapped === i) noiseCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      {
        const r = await live.inferOnceForValidation(partialCue(EXTENDED_PATTERNS[i], opts.partialKeepRatio));
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
