// P213: Selectivity vs Pattern Count 측정 모듈.
//
// 6개 표준 테스트 패턴 영역 N=3,4,5,6 단계 영역 학습 → 각 단계 영역 selectivity
// 지표 자동 측정 (재현율 / 노이즈 내성 / 부분단서 / WTA margin / Sparsity /
// Confusion matrix).
//
// 학술 정합 (P213 — 2026-05-19):
//   - 학습 : LiveSnn.triggerWithVigilance (ART vigilance auto-learn,
//     novel pattern 영역 expandCluster + 30-trial reinforce).
//   - 측정 : LiveSnn.inferOnceForValidation (STDP off, pure inference,
//     side-effect 0 — exemplar count / lab.save 영역 모두 skip).
//   - reset: purgeAllLearningData (IndexedDB + localStorage wipe) +
//     disposeLiveSnn (singleton 영역 재생성 영역 fresh substrate).
//
// 정직 한계:
//   - cluster id 영역 ART vigilance 영역 동적 spawn — 학습 순서 i 영역
//     반드시 clusterId=i 영역 정합 0. 학습 직후 inferOnceForValidation
//     영역 winner 영역 catch 영역 pattern→cluster mapping 영역 build.
//   - 학습 완료 영역 auto-learn-progress event 영역 progress===total 영역
//     watch (timeout fallback 영역 안전 catch).

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';

// 6개 표준 테스트 패턴 (4×4 grid, 16-dim binary).
//   1. Top row             2. Left column         3. Main diagonal
//   4. Bottom row          5. Right column        6. Anti-diagonal
export const TEST_PATTERNS: ReadonlyArray<ReadonlyArray<number>> = [
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
];

export const PATTERN_NAMES: ReadonlyArray<string> = [
  'Top row',
  'Left column',
  'Main diagonal',
  'Bottom row',
  'Right column',
  'Anti-diagonal',
];

export interface SelectivityMetrics {
  patternCount: number;
  reproduction: number;          // 재현율 0..1
  noise: number;                 // 노이즈 내성 0..1
  partialCue: number;            // 부분단서 0..1
  avgWtaMargin: number;          // 평균 WTA margin (winner share / sum)
  avgSparsity: number;           // 평균 OUT cluster sparsity (1 - 1/(N*CV^2+1))
  confusionMatrix: number[][];   // N×N. rows = ground-truth pattern, cols = winner cluster (mapping 적용).
  patternToCluster: number[];    // i 영역 학습 후 inferOnceForValidation winner (null 영역 -1).
}

export type ProgressCallback = (msg: string, pct: number) => void;

// ── 내부 유틸 ───────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function computeSparsity(rates: ReadonlyArray<number>): number {
  // Treves-Rolls sparsity:  s = (Σr)^2 / (N · Σr^2),  selectivity = 1 - s.
  // 모든 rate 균등 → s=1, selectivity=0. 단일 cluster fire → s=1/N, selectivity=(N-1)/N.
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
  // winner share — top1 / Σ. silent → 0.
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
  // bit-flip noise — binary pattern 영역 정합 (additive noise 영역 정합 0,
  // setPattern 영역 [0,1] clamp 영역 lossy).
  return pattern.map((v) => (Math.random() < flipProb ? 1 - v : v));
}

function partialCue(pattern: ReadonlyArray<number>, keepRatio: number): number[] {
  // active bit (v>0.5) 영역 randomly drop. inactive bit 영역 보존 (0 그대로).
  return pattern.map((v) => {
    if (v > 0.5) return Math.random() < keepRatio ? 1 : 0;
    return v;
  });
}

// auto-learn-progress event 영역 progress===total 영역 도달 시점 영역 resolve.
// timeoutMs 초과 영역 안전 reject (race-free dispose 정합).
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

// ── 메인 실험 ───────────────────────────────────────────────

export interface RunOptions {
  /** N 값 list — default [3,4,5,6]. */
  patternCounts?: number[];
  /** 학습 vigilance threshold — default 0.15 (live-snn default 정합). */
  vigilance?: number;
  /** 노이즈 bit-flip 확률 — default 0.2 (=20% bit flip). */
  noiseFlipProb?: number;
  /** 부분단서 keep 비율 — default 0.75. */
  partialKeepRatio?: number;
  /** 단일 trigger 후 settle wait — default 200ms. */
  settleMs?: number;
  /** auto-learn timeout — default 30000ms. */
  trainTimeoutMs?: number;
}

const DEFAULT_OPTS: Required<RunOptions> = {
  patternCounts: [3, 4, 5, 6],
  vigilance: 0.15,
  noiseFlipProb: 0.2,
  partialKeepRatio: 0.75,
  settleMs: 200,
  trainTimeoutMs: 30_000,
};

export async function runP213Experiment(
  onProgress?: ProgressCallback,
  options: RunOptions = {},
): Promise<SelectivityMetrics[]> {
  const opts: Required<RunOptions> = { ...DEFAULT_OPTS, ...options };
  const results: SelectivityMetrics[] = [];
  const steps = opts.patternCounts.length;

  for (let stepIdx = 0; stepIdx < steps; stepIdx += 1) {
    const N = opts.patternCounts[stepIdx];
    const basePct = (stepIdx / steps) * 100;
    const stepWidth = (1 / steps) * 100;

    onProgress?.(`[N=${N}] 학습 데이터 reset 중...`, basePct);

    // 1. Full reset — IndexedDB + localStorage + live singleton.
    await purgeAllLearningData();
    clearExemplars('orientation');
    disposeLiveSnn();
    await delay(opts.settleMs);

    // 2. fresh substrate 영역 LiveSnn singleton 영역 재생성.
    const live = getLiveSnn();

    // 3. N개 패턴 순차 학습 — 각 패턴 영역 vigilance auto-learn (30 trial).
    const patternToCluster: number[] = new Array(N).fill(-1);
    for (let i = 0; i < N; i += 1) {
      onProgress?.(
        `[N=${N}] 패턴 ${i + 1}/${N} (${PATTERN_NAMES[i]}) 학습 중...`,
        basePct + stepWidth * (0.05 + (0.55 * (i / N))),
      );
      const pat = TEST_PATTERNS[i].slice();
      const completePromise = awaitAutoLearnComplete(opts.trainTimeoutMs);
      live.triggerWithVigilance(pat, opts.vigilance);
      try {
        await completePromise;
      } catch (e) {
        console.warn(`[P213] N=${N} pattern ${i} auto-learn await failed:`, e);
      }
      await delay(opts.settleMs);

      // 학습 직후 winner cluster 영역 catch — pattern→cluster mapping.
      const probe = await live.inferOnceForValidation(pat);
      patternToCluster[i] = probe.winner ?? -1;
    }

    // 4. Validation — 6 patterns × N=3..6 학습 → N 개 패턴 validation.
    onProgress?.(`[N=${N}] validation 측정 중...`, basePct + stepWidth * 0.7);

    let repCorrect = 0;
    let noiseCorrect = 0;
    let partialCorrect = 0;
    let totalMargin = 0;
    let totalSparsity = 0;
    let sampleCount = 0;
    const matrix: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));

    // cluster id → pattern index (mapping reverse). multi-pattern 동일 cluster
    // 영역 race 영역 catch (잘못된 vigilance 영역 cluster 합쳐짐 표시).
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
      // 재현 — 원본 패턴.
      {
        const r = await live.inferOnceForValidation(TEST_PATTERNS[i].slice());
        const mapped = mapWinner(r.winner);
        if (mapped === i) repCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      // 노이즈 — bit-flip.
      {
        const r = await live.inferOnceForValidation(addNoise(TEST_PATTERNS[i], opts.noiseFlipProb));
        const mapped = mapWinner(r.winner);
        if (mapped === i) noiseCorrect += 1;
        if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
        totalMargin += computeMargin(r.rates);
        totalSparsity += computeSparsity(r.rates);
        sampleCount += 1;
      }
      // 부분 단서 — active bit drop.
      {
        const r = await live.inferOnceForValidation(partialCue(TEST_PATTERNS[i], opts.partialKeepRatio));
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
