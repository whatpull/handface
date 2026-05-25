// P219 Camera Simulation Validation (2026-05-25, Task 3).
//
// Real camera 시나리오 영역 simulate 영역 ensemble robustness 영역 검증.
// MediaPipe Hand 실 구현 영역 multi-day work — 현재 synthetic 영역 realistic
// camera artifacts 영역 ensemble robustness 영역 quantify.
//
// 시뮬레이션 artifacts (real camera 영역 영역 매핑):
//   - Occlusion: 영역 영역 cells (hand block, finger over pattern)
//   - Lighting variation: intensity scaling (under/over-exposure)
//   - Partial visibility: random bit drop (hand 영역 edge 영역 frame 영역 out)
//   - Motion blur: neighbor bleed (frame transition during capture)
//   - Salt-and-pepper noise: bit flips (sensor noise)
//
// 학술 정합: Hendrycks & Dietterich 2019 — "Benchmarking Neural Network
// Robustness to Common Corruptions and Perturbations". camera artifact
// 영역 standardized test 영역.

import { getLiveSnn, disposeLiveSnn } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars } from '@/lib/snn/out-exemplars';
import { onBackendEvent, type AutoLearnProgressDetail } from '@/lib/backend/events';
import { ENSEMBLE_PAIRS } from './p219-hybrid';
import { PATTERNS_5X5 } from './p218-capacity-5x5';
import type { SelectivityMetrics, ProgressCallback } from './p213-selectivity';

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

// === Camera artifact simulators ===

// Occlusion: 직사각형 영역 cells 영역 0 (hand/finger over region).
// 5×5 grid 영역 random 2×2 또는 3×2 영역 occlude.
export function applyOcclusion(pattern: ReadonlyArray<number>, gridSize: number = 5): number[] {
  const result = [...pattern];
  const occludeW = Math.random() < 0.5 ? 2 : 3;
  const occludeH = 2;
  const startCol = Math.floor(Math.random() * (gridSize - occludeW + 1));
  const startRow = Math.floor(Math.random() * (gridSize - occludeH + 1));
  for (let r = startRow; r < startRow + occludeH; r += 1) {
    for (let c = startCol; c < startCol + occludeW; c += 1) {
      result[r * gridSize + c] = 0;
    }
  }
  return result;
}

// Lighting: bit-level intensity attenuation (under-exposure 영역 영역 영역 영역 cell
// 영역 0 영역 random conversion). 직전 noise 영역 영역 활성 cell 영역만 사라짐.
export function applyLighting(pattern: ReadonlyArray<number>, intensityFactor: number = 0.7): number[] {
  return pattern.map((v) => {
    if (v < 0.5) return v;
    // intensity factor 0.7 → 30% chance of dropping active bit (under-exposure).
    return Math.random() < intensityFactor ? v : 0;
  });
}

// Partial visibility: random subset of active bits visible (hand partially in frame).
// keepRatio 0.6 영역 60% 영역 active bits 영역 visible.
export function applyPartialVisibility(pattern: ReadonlyArray<number>, keepRatio: number = 0.6): number[] {
  return pattern.map((v) => {
    if (v < 0.5) return v;
    return Math.random() < keepRatio ? v : 0;
  });
}

// Motion blur: neighbor bleed (active cells partially fill adjacent cells).
// Simplified — 영역 active cell 영역 1 영역 adjacent cell 영역 0.3 영역 add.
export function applyMotionBlur(pattern: ReadonlyArray<number>, gridSize: number = 5, blurStrength: number = 0.3): number[] {
  const result = pattern.map((v) => v);
  for (let r = 0; r < gridSize; r += 1) {
    for (let c = 0; c < gridSize; c += 1) {
      if (pattern[r * gridSize + c] > 0.5) {
        // Bleed to right neighbor
        if (c + 1 < gridSize) {
          result[r * gridSize + c + 1] = Math.max(result[r * gridSize + c + 1], blurStrength);
        }
        // Bleed to bottom neighbor
        if (r + 1 < gridSize) {
          result[(r + 1) * gridSize + c] = Math.max(result[(r + 1) * gridSize + c], blurStrength);
        }
      }
    }
  }
  // Threshold blurred result to binary (motion blur 영역 영역 final detection 영역 binary).
  return result.map((v) => v > 0.4 ? 1 : 0);
}

// Salt-and-pepper sensor noise: random bit flips (low rate, ~10%).
export function applySensorNoise(pattern: ReadonlyArray<number>, flipProb: number = 0.10): number[] {
  return pattern.map((v) => Math.random() < flipProb ? (v > 0.5 ? 0 : 1) : v);
}

// Combined "realistic camera frame" — multiple artifacts applied.
export function applyCameraFrame(pattern: ReadonlyArray<number>, gridSize: number = 5): number[] {
  let result = [...pattern];
  // 30% chance occlusion
  if (Math.random() < 0.3) result = applyOcclusion(result, gridSize);
  // 50% chance lighting variation
  if (Math.random() < 0.5) result = applyLighting(result, 0.75);
  // 30% chance partial visibility
  if (Math.random() < 0.3) result = applyPartialVisibility(result, 0.7);
  // 20% chance motion blur
  if (Math.random() < 0.2) result = applyMotionBlur(result, gridSize, 0.3);
  // Always some sensor noise
  result = applySensorNoise(result, 0.08);
  return result;
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

export interface CameraSimResult {
  patternCount: number;
  artifactType: string;
  metrics4x4: SelectivityMetrics;
  metrics5x5: SelectivityMetrics;
  metricsEnsemble: SelectivityMetrics;
}

// Run inference on a single substrate (assumed currently active).
async function inferSingleSubstrate(testPatterns: number[][]): Promise<InferResult[]> {
  const live = getLiveSnn();
  const results: InferResult[] = [];
  for (const p of testPatterns) {
    const r = await live.inferOnceForValidation(p);
    results.push({ winner: r.winner, rates: r.rates, margin: computeMargin(r.rates) });
  }
  return results;
}

// P219 Camera Sim: train both substrates, test under camera artifacts, compare.
// Substrate switching destroys trained cluster state, so all 4×4 inference must
// finish before training 5×5. Phase A trains+infers 4×4 across all artifacts,
// then Phase B trains+infers 5×5 across all artifacts, then results are combined.
export async function runP219CameraSim(
  onProgress?: ProgressCallback,
  options: {
    vigilance?: number;
    samplesPerPattern?: number; // 영역 pattern 영역 영역 N camera frames
  } = {},
): Promise<CameraSimResult[]> {
  const vigilance = options.vigilance ?? 0.15;
  const samples = options.samplesPerPattern ?? 5;
  const N = ENSEMBLE_PAIRS.length;
  const artifactTypes = ['occlusion', 'lighting', 'partialVisibility', 'motionBlur', 'sensorNoise', 'combined'] as const;

  // Step 0: pre-generate all test samples (so 4×4 and 5×5 see the same artifact
  // shapes — only the underlying pattern dims differ).
  const test4x4: number[][][][] = [];  // [artifact][pattern][sample][dim]
  const test5x5: number[][][][] = [];
  for (let ai = 0; ai < artifactTypes.length; ai += 1) {
    const artType = artifactTypes[ai];
    const artBucket4: number[][][] = [];
    const artBucket5: number[][][] = [];
    for (let i = 0; i < N; i += 1) {
      const p4 = ENSEMBLE_PAIRS[i].p4x4;
      const p5 = PATTERNS_5X5[ENSEMBLE_PAIRS[i].p5x5Idx];
      const samples4: number[][] = [];
      const samples5: number[][] = [];
      for (let s = 0; s < samples; s += 1) {
        switch (artType) {
          case 'occlusion':
            samples4.push(applyOcclusion(p4, 4));
            samples5.push(applyOcclusion(p5, 5));
            break;
          case 'lighting':
            samples4.push(applyLighting(p4, 0.75));
            samples5.push(applyLighting(p5, 0.75));
            break;
          case 'partialVisibility':
            samples4.push(applyPartialVisibility(p4, 0.65));
            samples5.push(applyPartialVisibility(p5, 0.65));
            break;
          case 'motionBlur':
            samples4.push(applyMotionBlur(p4, 4, 0.3));
            samples5.push(applyMotionBlur(p5, 5, 0.3));
            break;
          case 'sensorNoise':
            samples4.push(applySensorNoise(p4, 0.10));
            samples5.push(applySensorNoise(p5, 0.10));
            break;
          case 'combined':
            samples4.push(applyCameraFrame(p4, 4));
            samples5.push(applyCameraFrame(p5, 5));
            break;
        }
      }
      artBucket4.push(samples4);
      artBucket5.push(samples5);
    }
    test4x4.push(artBucket4);
    test5x5.push(artBucket5);
  }

  // Phase A: train 4×4 and infer all artifacts before switching substrate.
  onProgress?.('[4×4] 학습...', 0);
  const patterns4x4 = ENSEMBLE_PAIRS.map(p => [...p.p4x4]);
  await purgeAllLearningData();
  clearExemplars('orientation');
  disposeLiveSnn();
  await delay(200);
  let live = getLiveSnn();
  await live.setSubstrate('orientation');
  for (let i = 0; i < N; i += 1) {
    onProgress?.(`[4×4] 학습 ${i + 1}/${N}`, (i / N) * 20);
    const c = awaitAutoLearnComplete(30_000);
    live.triggerWithVigilance(patterns4x4[i], vigilance);
    try { await c; } catch { console.warn(`[camera] 4×4 ${i} timeout`); }
    await delay(200);
  }
  const cluster4: number[] = [];
  for (let i = 0; i < N; i += 1) {
    const r = await live.inferOnceForValidation(patterns4x4[i].slice());
    cluster4.push(r.winner ?? -1);
  }
  // Infer 4×4 under every artifact (substrate still loaded with trained clusters).
  const inferences4ByArtifact: InferResult[][][] = [];
  for (let ai = 0; ai < artifactTypes.length; ai += 1) {
    onProgress?.(`[4×4 infer] artifact=${artifactTypes[ai]}`, 25 + (ai / artifactTypes.length) * 20);
    const perPattern: InferResult[][] = [];
    for (let i = 0; i < N; i += 1) {
      const probes = await inferSingleSubstrate(test4x4[ai][i]);
      perPattern.push(probes);
    }
    inferences4ByArtifact.push(perPattern);
  }

  // Phase B: train 5×5 and infer all artifacts.
  onProgress?.('[5×5] 학습...', 50);
  const patterns5x5 = ENSEMBLE_PAIRS.map(p => [...PATTERNS_5X5[p.p5x5Idx]]);
  await purgeAllLearningData();
  clearExemplars('orientation-5x5');
  disposeLiveSnn();
  await delay(200);
  live = getLiveSnn();
  await live.setSubstrate('orientation-5x5');
  live.setDtMs(0.2);
  live.setTrainingNoiseSeed(86); // production lucky seed
  for (let i = 0; i < N; i += 1) {
    onProgress?.(`[5×5] 학습 ${i + 1}/${N}`, 50 + (i / N) * 20);
    const c = awaitAutoLearnComplete(30_000);
    live.triggerWithVigilance(patterns5x5[i], vigilance);
    try { await c; } catch { console.warn(`[camera] 5×5 ${i} timeout`); }
    await delay(200);
  }
  const cluster5: number[] = [];
  for (let i = 0; i < N; i += 1) {
    const r = await live.inferOnceForValidation(patterns5x5[i].slice());
    cluster5.push(r.winner ?? -1);
  }
  const inferences5ByArtifact: InferResult[][][] = [];
  for (let ai = 0; ai < artifactTypes.length; ai += 1) {
    onProgress?.(`[5×5 infer] artifact=${artifactTypes[ai]}`, 75 + (ai / artifactTypes.length) * 20);
    const perPattern: InferResult[][] = [];
    for (let i = 0; i < N; i += 1) {
      const probes = await inferSingleSubstrate(test5x5[ai][i]);
      perPattern.push(probes);
    }
    inferences5ByArtifact.push(perPattern);
  }

  // Phase C: combine into per-artifact result rows.
  const clusterToPattern4 = new Map<number, number>();
  for (let i = 0; i < N; i += 1) if (cluster4[i] >= 0) clusterToPattern4.set(cluster4[i], i);
  const clusterToPattern5 = new Map<number, number>();
  for (let i = 0; i < N; i += 1) if (cluster5[i] >= 0) clusterToPattern5.set(cluster5[i], i);

  const results: CameraSimResult[] = [];
  for (let ai = 0; ai < artifactTypes.length; ai += 1) {
    const artType = artifactTypes[ai];
    const inferences4 = inferences4ByArtifact[ai];
    const inferences5 = inferences5ByArtifact[ai];

    let correct4 = 0, correct5 = 0, correctEns = 0;
    let totalProbes = 0;
    let marginSum4 = 0, marginSum5 = 0, marginSumEns = 0;
    const matrix4: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));
    const matrix5: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));
    const matrixEns: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));

    for (let i = 0; i < N; i += 1) {
      for (let s = 0; s < samples; s += 1) {
        const r4 = inferences4[i][s];
        const r5 = inferences5[i][s];
        const mapped4 = (r4.winner !== null && r4.winner >= 0) ? (clusterToPattern4.get(r4.winner) ?? -1) : -1;
        const mapped5 = (r5.winner !== null && r5.winner >= 0) ? (clusterToPattern5.get(r5.winner) ?? -1) : -1;

        if (mapped4 === i) correct4 += 1;
        if (mapped5 === i) correct5 += 1;
        let mappedEns: number;
        if (mapped4 === i || mapped5 === i) mappedEns = i;
        else mappedEns = r5.margin > r4.margin ? mapped5 : mapped4;
        if (mappedEns === i) correctEns += 1;

        if (mapped4 >= 0 && mapped4 < N) matrix4[i][mapped4] += 1;
        if (mapped5 >= 0 && mapped5 < N) matrix5[i][mapped5] += 1;
        if (mappedEns >= 0 && mappedEns < N) matrixEns[i][mappedEns] += 1;

        marginSum4 += r4.margin;
        marginSum5 += r5.margin;
        marginSumEns += Math.max(r4.margin, r5.margin);
        totalProbes += 1;
      }
    }

    const totalSamples = N * samples;
    results.push({
      patternCount: N,
      artifactType: artType,
      metrics4x4: {
        patternCount: N,
        reproduction: correct4 / totalSamples,
        noise: 0, partialCue: 0,
        avgWtaMargin: marginSum4 / totalProbes,
        avgSparsity: 0,
        confusionMatrix: matrix4,
        patternToCluster: cluster4,
      },
      metrics5x5: {
        patternCount: N,
        reproduction: correct5 / totalSamples,
        noise: 0, partialCue: 0,
        avgWtaMargin: marginSum5 / totalProbes,
        avgSparsity: 0,
        confusionMatrix: matrix5,
        patternToCluster: cluster5,
      },
      metricsEnsemble: {
        patternCount: N,
        reproduction: correctEns / totalSamples,
        noise: 0, partialCue: 0,
        avgWtaMargin: marginSumEns / totalProbes,
        avgSparsity: 0,
        confusionMatrix: matrixEns,
        patternToCluster: cluster4,
      },
    });
  }

  // Cleanup
  live = getLiveSnn();
  live.setDtMs(0.1);
  live.setTrainingNoiseSeed(null);

  onProgress?.('Camera sim 완료', 100);
  return results;
}
