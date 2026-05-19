// P214c: 노이즈/마스킹 강도 sweep.
//
// 4개 표준 패턴 (P213 1~4 — Top row / Left col / Main diag / Bottom row)
// 학습 → noise flipProb 5단계 + mask keepRatio 4단계 영역 각각 측정.
// 정확도 (mapped winner === ground-truth) 영역 sweep 정합 — degradation
// curve 영역 정량.
//
// 학술 정합 (P214c — 2026-05-19):
//   - 학습 1회 (4 patterns 영역 vigilance auto-learn).
//   - 측정 영역 inferOnceForValidation × per-pattern × samplesPerLevel.
//   - reset 영역 실험 시작 1회 (sweep 영역 영역 학습 영역 재사용).

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';
import { TEST_PATTERNS, PATTERN_NAMES, type ProgressCallback } from './p213-selectivity';

export interface SweepResult {
  paramName: 'noise' | 'mask';
  paramValue: number;       // noise: flipProb (0..1) / mask: keepRatio (0..1)
  accuracy: number;         // 0..1
  samples: number;          // 총 sample 수
}

// ── 내부 유틸 ──────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
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

export interface SweepRunOptions {
  /** 학습 패턴 인덱스 — default P213 [0,1,2,3] (Top/Left/Diag/Bottom). */
  trainIndices?: number[];
  /** noise sweep — default [0.0, 0.1, 0.2, 0.3, 0.4, 0.5]. */
  noiseLevels?: number[];
  /** mask sweep — default [1.0, 0.75, 0.5, 0.25]. */
  maskLevels?: number[];
  /** 각 level 마다 per-pattern sample 수 — default 5 (randomized). */
  samplesPerLevel?: number;
  vigilance?: number;
  settleMs?: number;
  trainTimeoutMs?: number;
}

const DEFAULT_OPTS: Required<SweepRunOptions> = {
  trainIndices: [0, 1, 2, 3],
  noiseLevels: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5],
  maskLevels: [1.0, 0.75, 0.5, 0.25],
  samplesPerLevel: 5,
  vigilance: 0.15,
  settleMs: 200,
  trainTimeoutMs: 30_000,
};

export async function runP214c(
  onProgress?: ProgressCallback,
  options: SweepRunOptions = {},
): Promise<SweepResult[]> {
  const opts: Required<SweepRunOptions> = { ...DEFAULT_OPTS, ...options };
  const results: SweepResult[] = [];

  onProgress?.('[P214c] 학습 데이터 reset 중...', 0);
  await purgeAllLearningData();
  clearExemplars('orientation');
  disposeLiveSnn();
  await delay(opts.settleMs);

  const live = getLiveSnn();
  const trainPatterns = opts.trainIndices.map((idx) => TEST_PATTERNS[idx].slice());
  const trainNames = opts.trainIndices.map((idx) => PATTERN_NAMES[idx]);
  const N = trainPatterns.length;

  // 1. 4개 표준 패턴 학습.
  const patternToCluster: number[] = new Array(N).fill(-1);
  for (let i = 0; i < N; i += 1) {
    onProgress?.(
      `[P214c] 학습 ${i + 1}/${N} (${trainNames[i]})`,
      5 + (25 * (i / N)),
    );
    const completePromise = awaitAutoLearnComplete(opts.trainTimeoutMs);
    live.triggerWithVigilance(trainPatterns[i], opts.vigilance);
    try {
      await completePromise;
    } catch (e) {
      console.warn(`[P214c] pattern ${i} auto-learn await failed:`, e);
    }
    await delay(opts.settleMs);
    const probe = await live.inferOnceForValidation(trainPatterns[i]);
    patternToCluster[i] = probe.winner ?? -1;
  }

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

  // 2. noise sweep.
  const totalLevels = opts.noiseLevels.length + opts.maskLevels.length;
  let levelIdx = 0;
  for (const flipProb of opts.noiseLevels) {
    onProgress?.(
      `[P214c] noise=${(flipProb * 100).toFixed(0)}% 측정 중...`,
      30 + (65 * (levelIdx / totalLevels)),
    );
    let correct = 0;
    let total = 0;
    for (let s = 0; s < opts.samplesPerLevel; s += 1) {
      for (let i = 0; i < N; i += 1) {
        const probed = flipProb === 0 ? trainPatterns[i].slice() : addNoise(trainPatterns[i], flipProb);
        const r = await live.inferOnceForValidation(probed);
        const mapped = mapWinner(r.winner);
        if (mapped === i) correct += 1;
        total += 1;
      }
    }
    results.push({
      paramName: 'noise',
      paramValue: flipProb,
      accuracy: total > 0 ? correct / total : 0,
      samples: total,
    });
    levelIdx += 1;
  }

  // 3. mask sweep.
  for (const keepRatio of opts.maskLevels) {
    onProgress?.(
      `[P214c] mask keep=${(keepRatio * 100).toFixed(0)}% 측정 중...`,
      30 + (65 * (levelIdx / totalLevels)),
    );
    let correct = 0;
    let total = 0;
    for (let s = 0; s < opts.samplesPerLevel; s += 1) {
      for (let i = 0; i < N; i += 1) {
        const probed = keepRatio >= 1.0 ? trainPatterns[i].slice() : partialCue(trainPatterns[i], keepRatio);
        const r = await live.inferOnceForValidation(probed);
        const mapped = mapWinner(r.winner);
        if (mapped === i) correct += 1;
        total += 1;
      }
    }
    results.push({
      paramName: 'mask',
      paramValue: keepRatio,
      accuracy: total > 0 ? correct / total : 0,
      samples: total,
    });
    levelIdx += 1;
  }

  onProgress?.('[P214c] 완료', 100);
  return results;
}
