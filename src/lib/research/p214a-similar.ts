// P214a: 유사 패턴 스트레스 테스트.
//
// 5개 유사 패턴 (2×2 base 사각형 + 1~2 픽셀 차이) 영역 학습 → P213 동일
// 인터페이스 (SelectivityMetrics) 영역 측정. P213 영역 ortho-pattern 영역
// 정합 — 본 모듈 영역 high-overlap pattern 영역 selectivity 한계 영역 검증.
//
// 학술 정합 (P214a — 2026-05-19):
//   - 학습/측정/reset 영역 P213 영역 동일 (LiveSnn.triggerWithVigilance +
//     inferOnceForValidation + purgeAllLearningData + disposeLiveSnn).
//   - N 영역 fixed = 5 (유사 패턴 5종 영역 한 번 측정).
//
// 정직 한계:
//   - 모든 패턴 영역 active bit 4개 (sparsity 영역 동일) — overlap 영역
//     pattern 간 hamming distance 1~2 영역 (P213 영역 base-distance 4 대비
//     매우 낮음). vigilance 영역 잘 영역 영역 cluster 합쳐짐 (mapping
//     collision) 영역 expected.

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';
import type { SelectivityMetrics, ProgressCallback } from './p213-selectivity';

// 5개 유사 패턴 (4×4 grid, 16-dim binary).
// Base: 2×2 사각형 (top-left). 변형 4종 영역 각각 1~2 픽셀 차이.
export const SIMILAR_PATTERNS: ReadonlyArray<ReadonlyArray<number>> = [
  // 1. Base: 2×2 (top-left)
  [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // 2. Base + 1 (오른쪽 1픽셀)
  [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // 3. Base + 1 (아래 1픽셀)
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  // 4. Base shift (1픽셀 오른쪽)
  [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // 5. Base shift (1픽셀 아래)
  [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
];

export const SIMILAR_NAMES: ReadonlyArray<string> = [
  '2×2 사각형',
  '2×2 + 오른쪽',
  '2×2 + 아래',
  '2×2 시프트(오른쪽)',
  '2×2 시프트(아래)',
];

// ── 내부 유틸 (P213 동일 구현 영역 local copy — cross-module dep 회피) ──

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

// ── 메인 실험 ───────────────────────────────────────────────

export interface SimilarRunOptions {
  /** 학습 vigilance threshold — default 0.15. 유사 패턴 영역 영역 0.05~0.30 sweep 권장. */
  vigilance?: number;
  noiseFlipProb?: number;
  partialKeepRatio?: number;
  settleMs?: number;
  trainTimeoutMs?: number;
}

const DEFAULT_OPTS: Required<SimilarRunOptions> = {
  vigilance: 0.15,
  noiseFlipProb: 0.2,
  partialKeepRatio: 0.75,
  settleMs: 200,
  trainTimeoutMs: 30_000,
};

export async function runP214a(
  onProgress?: ProgressCallback,
  options: SimilarRunOptions = {},
): Promise<SelectivityMetrics[]> {
  const opts: Required<SimilarRunOptions> = { ...DEFAULT_OPTS, ...options };
  const N = SIMILAR_PATTERNS.length;

  onProgress?.(`[P214a] 학습 데이터 reset 중...`, 0);
  await purgeAllLearningData();
  clearExemplars('orientation');
  disposeLiveSnn();
  await delay(opts.settleMs);

  const live = getLiveSnn();

  // 1. 5개 유사 패턴 순차 학습.
  const patternToCluster: number[] = new Array(N).fill(-1);
  for (let i = 0; i < N; i += 1) {
    onProgress?.(
      `[P214a] 패턴 ${i + 1}/${N} (${SIMILAR_NAMES[i]}) 학습 중...`,
      5 + (60 * (i / N)),
    );
    const pat = SIMILAR_PATTERNS[i].slice();
    const completePromise = awaitAutoLearnComplete(opts.trainTimeoutMs);
    live.triggerWithVigilance(pat, opts.vigilance);
    try {
      await completePromise;
    } catch (e) {
      console.warn(`[P214a] pattern ${i} auto-learn await failed:`, e);
    }
    await delay(opts.settleMs);
    const probe = await live.inferOnceForValidation(pat);
    patternToCluster[i] = probe.winner ?? -1;
  }

  // 2. Validation.
  onProgress?.(`[P214a] validation 측정 중...`, 70);
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
      const r = await live.inferOnceForValidation(SIMILAR_PATTERNS[i].slice());
      const mapped = mapWinner(r.winner);
      if (mapped === i) repCorrect += 1;
      if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
      totalMargin += computeMargin(r.rates);
      totalSparsity += computeSparsity(r.rates);
      sampleCount += 1;
    }
    {
      const r = await live.inferOnceForValidation(addNoise(SIMILAR_PATTERNS[i], opts.noiseFlipProb));
      const mapped = mapWinner(r.winner);
      if (mapped === i) noiseCorrect += 1;
      if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
      totalMargin += computeMargin(r.rates);
      totalSparsity += computeSparsity(r.rates);
      sampleCount += 1;
    }
    {
      const r = await live.inferOnceForValidation(partialCue(SIMILAR_PATTERNS[i], opts.partialKeepRatio));
      const mapped = mapWinner(r.winner);
      if (mapped === i) partialCorrect += 1;
      if (mapped >= 0 && mapped < N) matrix[i][mapped] += 1;
      totalMargin += computeMargin(r.rates);
      totalSparsity += computeSparsity(r.rates);
      sampleCount += 1;
    }
  }

  const result: SelectivityMetrics = {
    patternCount: N,
    reproduction: N > 0 ? repCorrect / N : 0,
    noise: N > 0 ? noiseCorrect / N : 0,
    partialCue: N > 0 ? partialCorrect / N : 0,
    avgWtaMargin: sampleCount > 0 ? totalMargin / sampleCount : 0,
    avgSparsity: sampleCount > 0 ? totalSparsity / sampleCount : 0,
    confusionMatrix: matrix,
    patternToCluster,
  };

  onProgress?.('[P214a] 완료', 100);
  return [result];
}
