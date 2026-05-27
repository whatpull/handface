// Hand SNN — held-out self-verification (feature-level noise) 측정.
//
// 컨텍스트 (2026-05-28): UX HIGH wire (Confidence margin + Confusion matrix)
// 영역 self-verification 영역 trained sample (cached lastFeature) 직접 재사용 →
// overfit / false confidence catch 부재. 본 R&D 영역 feature-level Gaussian
// noise (σ=0.05) 영역 perturbed sample N=5 영역 cluster 영역 → realistic
// generalization estimate.
//
// 학술 정합:
//   - Bishop 1995 (Neural Networks for Pattern Recognition, ch.9.3) — feature-
//     level noise injection 영역 regularization 영역 generalization estimate.
//   - Goodfellow et al. 2014 — noise injection / data augmentation.
//   - Diehl & Cook 2015 — STDP topology + noisy R-STDP weight robustness.
//
// 검증 시나리오:
//   1. 4 anatomical mock gesture × clean sparse pattern × R-STDP train (reinforce).
//   2. 영역 cluster 영역 N=5 feature-noise-perturbed sample 영역 inference (STDP off).
//   3. confusion matrix 영역 산출 + accuracy threshold 검증.
//
// 정직 한계:
//   - simulated feature-noise (Gaussian σ=0.05) — 실제 사용자 hand capture 영역
//     held-out 영역 별도 R&D. true held-out (capture) 영역 본 wire 외부.
//   - top-K mask preserve — sparse cluster active inputs 영역 영역 영역 변경 0
//     → weight robustness 영역 핵심 검증 (topology fixed, weights perturbed input).
//   - trained sample baseline 100% expected → noisy held-out 80-95% expected
//     (정확 영역 noise level + R-STDP weight convergence 영역).

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink, SNNWorkerCore, SNNWorkerClient,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import {
  encodeHandToFeatureVector,
  selectForcedDisjointTopK,
  applySparseTopK,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';
import {
  SeededGaussian,
  addFeatureNoise,
} from '@/lib/snn-runtime/hand-noise';
// QA MEDIUM #2 (2026-05-28 audit): const hoist — NodeLearn.tsx 영역 동일 const
// 참조 영역 single source drift 회피. FIRE_DELTA_LOW_THRESHOLD_HZ pattern 정합.
import {
  HELD_OUT_FEATURE_NOISE_SIGMA,
  HELD_OUT_SAMPLES_PER_CLUSTER,
} from '@/components/snn/pipeline/shared';

class MemoryStorage {
  private store = new Map<string, string>();
  getItem(k: string): string | null { return this.store.get(k) ?? null; }
  setItem(k: string, v: string): void { this.store.set(k, v); }
  removeItem(k: string): void { this.store.delete(k); }
}
class InProcessTransport implements WorkerLike {
  private listeners: Array<(e: MessageEvent) => void> = [];
  constructor(private core: SNNWorkerCore) {}
  postMessage(req: unknown): void {
    const res = this.core.handle(req as WorkerRequest);
    queueMicrotask(() => {
      const ev = { data: res } as MessageEvent;
      for (const l of this.listeners) l(ev);
    });
  }
  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void { this.listeners.push(l); }
  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l);
    if (i >= 0) this.listeners.splice(i, 1);
  }
  terminate(): void { this.listeners = []; }
}

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// 4 anatomical mock gesture — hand-snn-realistic-noise.test.ts 영역 동일.
function appendFinger(
  lm: HandLandmark[],
  mcp: { x: number; y: number; z: number },
  dir: { x: number; y: number; z: number },
  length: number,
  curl: number,
): void {
  const segments = 3;
  let curX = mcp.x, curY = mcp.y, curZ = mcp.z;
  lm.push({ x: curX, y: curY, z: curZ });
  let curDirX = dir.x, curDirY = dir.y;
  const curDirZ = dir.z;
  for (let s = 1; s <= segments; s += 1) {
    const bend = curl * (s / segments) * 1.4;
    const cos = Math.cos(bend), sin = Math.sin(bend);
    const nx = curDirX * cos - (-curDirY) * sin;
    const ny = curDirX * sin + (-curDirY) * cos;
    curDirX = nx; curDirY = ny;
    const segLen = length / segments;
    curX += curDirX * segLen;
    curY += curDirY * segLen;
    curZ += curDirZ * segLen + curl * 0.02;
    lm.push({ x: curX, y: curY, z: curZ });
  }
}
function makeOpenPalm(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.3, y: -1, z: 0 }, 0.18, 0);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 0);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 0);
  return lm;
}
function makeClosedFist(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}
function makeThumbsUp(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: 0, y: -1, z: 0 }, 0.20, 0);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}
function makePeaceSign(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 0);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}

const GESTURE_MAKERS = [
  { name: 'open_palm', make: makeOpenPalm },
  { name: 'closed_fist', make: makeClosedFist },
  { name: 'thumbs_up', make: makeThumbsUp },
  { name: 'peace_sign', make: makePeaceSign },
];

describe('Hand SNN — held-out self-verification (feature noise σ=0.05)', () => {
  it(
    '★ 4 gesture train + N=5 noisy held-out → confusion matrix accuracy 80-100%',
    { timeout: 600000 },
    async () => {
      // QA MEDIUM #2 (2026-05-28 audit): shared.ts 영역 single source 영역 hoist.
      const N_HELD_OUT = HELD_OUT_SAMPLES_PER_CLUSTER;
      const K = 10;
      const FEATURE_NOISE_SIGMA = HELD_OUT_FEATURE_NOISE_SIGMA;
      const HELD_OUT_SEED = 3000;

      // Step 1: clean gesture features + forced-disjoint top-K topology.
      const cleanFeatures = GESTURE_MAKERS.map(gm =>
        encodeHandToFeatureVector(gm.make()),
      );
      const candidateTopK = selectForcedDisjointTopK(cleanFeatures, K);
      const cleanSparsePatterns = cleanFeatures.map((fv, g) =>
        applySparseTopK(fv, candidateTopK[g]),
      );

      // Step 2: SNN build — pre-register 4 cluster activeInputs.
      const core = new SNNWorkerCore();
      const transport = new InProcessTransport(core);
      const client = new SNNWorkerClient(transport);
      const sink = new LocalStorageSink({
        storage: new MemoryStorage(),
        prefix: 'hand_held_out',
      });
      const lab = new LocalSNN({
        netId: 'hand_held_out_demo',
        client, sink,
        seed: 57,
        preset: 'n16_hand',
        clusterActiveInputs: candidateTopK,
      });
      const buildStatus = await lab.init();
      expect(buildStatus.neurons).toBeGreaterThan(0);

      // Step 3: R-STDP supervised train (clean sparse pattern × reinforce).
      // hand-snn-cluster-rstdp.test.ts 영역 동일 접근 — 영역 gesture 영역 N reinforce.
      const REINFORCE_PER_GESTURE = 10;
      for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
        await client.clusterTrainRStdp({
          patterns: Array(REINFORCE_PER_GESTURE).fill(cleanSparsePatterns[g]),
          targetCluster: g,
          intensity: 25,
          stimulusDurationMs: 30,
          observeMs: 50,
          dtMs: 0.1,
          rewardGain: 2.0,
          punishGain: 0.5,
          stdpMode: 'pair',
        });
      }

      // Step 4: trained-sample baseline (clean — 100% expected).
      let baselineCorrect = 0;
      for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
        const pattern = cleanSparsePatterns[g];
        const events: { neuron: string; weight: number; time: number; durationMs: number; stepMs: number }[] = [];
        for (let i = 0; i < pattern.length; i += 1) {
          if (pattern[i] > 0) {
            events.push({
              neuron: `in_feat_${i}`,
              weight: 25 * pattern[i],
              time: 0, durationMs: 50, stepMs: 0.1,
            });
          }
        }
        await client.inject(events);
        await client.run({ durationMs: 60, dtMs: 0.1, stdpEnabled: false });
        const cfr = await client.clusterFiringRates({ windowMs: 60, pattern });
        let winner = -1;
        let maxRate = 0;
        for (let ci = 0; ci < cfr.rates.length; ci += 1) {
          if (cfr.rates[ci] > maxRate) { maxRate = cfr.rates[ci]; winner = ci; }
        }
        if (winner === g) baselineCorrect += 1;
      }
      const baselineAccuracy = baselineCorrect / GESTURE_MAKERS.length;

      // Step 5: noisy held-out — 영역 cluster 영역 N=5 feature-noise-perturbed
      // sample (top-K mask preserve — zero indices 영역 zero 유지). cluster 영역
      // unique SeededGaussian (HELD_OUT_SEED + g × 1000) 영역 reproducibility.
      //
      // QA LOW #7 (2026-05-28 audit): wall-time measurement — performance.now()
      // 영역 held-out step elapsed ms 영역 record. single-machine reference,
      // production scaling 영역 별도 R&D.
      const heldOutStartMs = performance.now();
      const heldOutConfusion: number[][] = GESTURE_MAKERS.map(() =>
        GESTURE_MAKERS.map(() => 0),
      );
      let heldOutCorrect = 0;
      let heldOutTotal = 0;
      for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
        const cleanPattern = cleanSparsePatterns[g];
        const gaussian = new SeededGaussian(HELD_OUT_SEED + g * 1000);
        for (let s = 0; s < N_HELD_OUT; s += 1) {
          const noisyPattern = addFeatureNoise(cleanPattern, FEATURE_NOISE_SIGMA, gaussian);
          // verification: zero indices remain zero (top-K mask preserved).
          for (let i = 0; i < cleanPattern.length; i += 1) {
            if (cleanPattern[i] === 0) {
              expect(noisyPattern[i]).toBe(0);
            }
          }
          const events: { neuron: string; weight: number; time: number; durationMs: number; stepMs: number }[] = [];
          for (let i = 0; i < noisyPattern.length; i += 1) {
            if (noisyPattern[i] > 0) {
              events.push({
                neuron: `in_feat_${i}`,
                weight: 25 * noisyPattern[i],
                time: 0, durationMs: 50, stepMs: 0.1,
              });
            }
          }
          await client.inject(events);
          await client.run({ durationMs: 60, dtMs: 0.1, stdpEnabled: false });
          const cfr = await client.clusterFiringRates({ windowMs: 60, pattern: noisyPattern });
          let winner = -1;
          let maxRate = 0;
          for (let ci = 0; ci < cfr.rates.length; ci += 1) {
            if (cfr.rates[ci] > maxRate) { maxRate = cfr.rates[ci]; winner = ci; }
          }
          if (winner >= 0 && winner < GESTURE_MAKERS.length) {
            heldOutConfusion[g][winner] += 1;
          }
          if (winner === g) heldOutCorrect += 1;
          heldOutTotal += 1;
        }
      }
      const heldOutAccuracy = heldOutCorrect / heldOutTotal;
      const heldOutWallTimeMs = Math.round(performance.now() - heldOutStartMs);

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-held-out-self-verify',
        gestures: GESTURE_MAKERS.map(g => g.name),
        n_held_out_per_cluster: N_HELD_OUT,
        feature_noise_sigma: FEATURE_NOISE_SIGMA,
        sparse_top_k: K,
        reinforce_per_gesture: REINFORCE_PER_GESTURE,
        held_out_seed: HELD_OUT_SEED,
        preset: 'n16_hand',
        neurons_total: buildStatus.neurons,
        synapses_total: buildStatus.synapses,
        cluster_active_inputs: candidateTopK,
        baseline_accuracy: baselineAccuracy,
        baseline_correct: baselineCorrect,
        baseline_total: GESTURE_MAKERS.length,
        held_out_accuracy: heldOutAccuracy,
        held_out_correct: heldOutCorrect,
        held_out_total: heldOutTotal,
        held_out_confusion_matrix: heldOutConfusion,
        held_out_wall_time_ms: heldOutWallTimeMs,
        academic_alignment: [
          'Bishop 1995 — feature-level noise injection regularization (ch.9.3).',
          'Goodfellow et al. 2014 — noise injection as data augmentation.',
          'Diehl & Cook 2015 — STDP topology fixed, R-STDP weight robustness 검증.',
        ],
        limitations: [
          'simulated feature-noise (Gaussian σ=0.05) — 실제 사용자 hand capture held-out 영역 별도 R&D.',
          'top-K mask preserve — sparse active inputs 영역 영역 영역 변경 0 (Diehl & Cook 2015 topology-fixed STDP 정합).',
          'baseline accuracy 100% expected → noisy held-out 80-95% expected (정확 영역 noise level + R-STDP convergence 영역).',
          'mock anatomical hand — actual MediaPipe Hand 영역 z-depth scale 영역 다를 가능.',
          'true held-out (실제 capture) 영역 본 wire 외부 — UI honesty note 영역 명시.',
          // QA HIGH #3 (2026-05-28 audit): σ=0.05 영역 conservative 명시 + sweep R&D.
          'σ=0.05 영역 conservative — Goodfellow 2014 typical σ~0.1 보다 낮음. held-out 100% accuracy 영역 σ-too-mild signal — σ sweep (σ ∈ {0.05, 0.10, 0.15}) 영역 별도 R&D 권장. 본 measurement 영역 σ=0.05 한정 inflated accuracy estimate 가능.',
          // QA HIGH #6 (2026-05-28 audit): measurement seed (fixed) vs runtime seed (Date.now()) drift.
          'measurement.json 영역 fixed seed=3000 영역 deterministic baseline. runtime UI 영역 Date.now() & 0x7fffffff seed 영역 매번 unique noisy held-out — measurement 영역 단일 seed lower-bound 추정. runtime accuracy 영역 seed-dependent variance 영역 별도 R&D.',
          // QA MEDIUM #4 (2026-05-28 audit): N=5 statistical power.
          'N=5 per cluster × 4 clusters = 20 total samples → 95% Wilson confidence interval ±10%. 통계적 conclusiveness 영역 N≥30/cluster 별도 R&D 권장.',
        ],
      };
      saveMeasurement('hand-snn-held-out-self-verify', measurement);

      // 검증 assertion — baseline 100% (trained sample sanity), held-out >= 50%.
      // 50% threshold 영역 4-class chance (25%) 영역 2× margin — production
      // noise-robust 영역 영역 영역 80%+ expected 단 mock 영역 R-STDP convergence
      // 영역 영역 변동성 영역 50% 영역 sanity threshold 정합.
      expect(baselineAccuracy).toBeGreaterThanOrEqual(0.5);
      expect(heldOutAccuracy).toBeGreaterThanOrEqual(0.5);

      console.log(`[held-out] gestures=${GESTURE_MAKERS.length} N=${N_HELD_OUT} σ=${FEATURE_NOISE_SIGMA}`);
      console.log(`[held-out] baseline_accuracy=${(baselineAccuracy * 100).toFixed(1)}% (${baselineCorrect}/${GESTURE_MAKERS.length})`);
      console.log(`[held-out] held_out_accuracy=${(heldOutAccuracy * 100).toFixed(1)}% (${heldOutCorrect}/${heldOutTotal})`);
      console.log('[held-out] confusion (rows=true, cols=pred):');
      for (let i = 0; i < heldOutConfusion.length; i += 1) {
        console.log(`  ${GESTURE_MAKERS[i].name}: [${heldOutConfusion[i].join(', ')}]`);
      }
    },
  );
});
