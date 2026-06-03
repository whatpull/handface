// Phase 3.6 Hand SNN production accuracy 측정 (2026-06-03).
//
// 직전 (HONEST_LIMITATIONS.md):
//   Hand SNN (MediaPipe Hand) — 1-shot 25% accuracy, multi-shot oscillating,
//   ART/EWC 미통합. UI 통합 부재 (NodeInput GRID 전용).
//
// 본 측정: Phase 3.1~3.5 UI 통합 완료 후 Phase 2A fix chain 적용된 n16_hand
// substrate production accuracy.
//
// Mock 재설계 (hand-snn-cluster-rstdp.test.ts 의 anatomically realistic appendFinger):
//   - 4 손가락 (MCP/PIP/DIP/TIP) cumulative bend rotation
//   - curl ∈ {0=straight, 1=fully closed} per finger
//   - open_palm: 5 fingers all curl=0
//   - closed_fist: 5 fingers all curl=1
//   - thumbs_up: thumb curl=0, others curl=1
//   - peace_sign: thumb/ring/pinky curl=1, index/middle curl=0
//
// Phase 2A fix chain (Hand SNN 자동 적용):
//   - commit 8da3cbe: 1st 30 trials, 2nd+ 90 trials
//   - commit 4deb9bc: rawActiveInputs 별도 store
//   - commit b90c103: subset 인식 (T ⊆ I)
//   - commit 6e3b574: auto-purge (substrate switch)
//
// Inference: honest — noise 추가된 sample 의 모든 features > 0.3 을 injection.
// 직전 hand-snn-cluster-rstdp.test.ts (4/4 = 100%) 는 oracle inference 를 사용 —
// applySparseTopK(fv, topKIndices[g]) 가 g-indexed → ground truth leak.
// 본 measurement 는 honest inference (cluster 모름 → 모든 features 주입).
//
// 본 file 'measurement' pattern → nightly cron 분류.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink,
  SNNWorkerClient, SNNWorkerCore,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import {
  encodeHandToFeatureVector,
  selectForcedDisjointTopK,
  HAND_FEAT_DIM,
  HAND_SPARSE_TOP_K_DEFAULT,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';
import { SeededGaussian, addFeatureNoise } from '@/lib/snn-runtime/hand-noise';

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
    queueMicrotask(() => { const ev = { data: res } as MessageEvent; for (const l of this.listeners) l(ev); });
  }
  addEventListener(_t: 'message', l: (e: MessageEvent) => void): void { this.listeners.push(l); }
  removeEventListener(_t: 'message', l: (e: MessageEvent) => void): void {
    const i = this.listeners.indexOf(l); if (i >= 0) this.listeners.splice(i, 1);
  }
  terminate(): void { this.listeners = []; }
}

// Anatomically realistic appendFinger (hand-snn-cluster-rstdp.test.ts 와 동일).
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
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0, y: -1, z: 0 }, 0.24, 0);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05, y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10, y: -1, z: 0 }, 0.18, 0);
  return lm;
}
function makeClosedFist(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0, y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10, y: -1, z: 0 }, 0.18, 1);
  return lm;
}
function makeThumbsUp(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: 0, y: -1, z: 0 }, 0.20, 0);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0, y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10, y: -1, z: 0 }, 0.18, 1);
  return lm;
}
function makePeaceSign(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1);
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 0);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0, y: -1, z: 0 }, 0.24, 0);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10, y: -1, z: 0 }, 0.18, 1);
  return lm;
}

const GESTURES = [
  { name: 'open_palm', make: makeOpenPalm },
  { name: 'closed_fist', make: makeClosedFist },
  { name: 'thumbs_up', make: makeThumbsUp },
  { name: 'peace_sign', make: makePeaceSign },
];

// Phase 3.7 fixture loader — 사용자 webcam 으로 record 한 JSON fixture 를 load.
// 형식: { gestures: [{name, frames: [HandLandmark[]]}] }, 각 frame 은 21 landmarks.
// HANDFACE_HAND_FIXTURE env var 로 path 지정. 미존재 시 synthetic mock 사용.
function loadFixtureOrSynthetic(): { name: string; landmarks: HandLandmark[] }[] {
  const fixturePath = process.env.HANDFACE_HAND_FIXTURE;
  if (fixturePath && existsSync(fixturePath)) {
    const raw = JSON.parse(readFileSync(fixturePath, 'utf-8')) as {
      gestures: { name: string; frames: HandLandmark[][] }[];
    };
    // 각 gesture 의 N frames 를 평균 landmark 로 축약 (representative pose).
    return raw.gestures.map((g) => {
      const avg: HandLandmark[] = Array.from({ length: 21 }, () => ({ x: 0, y: 0, z: 0 }));
      for (const frame of g.frames) {
        for (let i = 0; i < 21; i += 1) {
          avg[i].x += frame[i].x; avg[i].y += frame[i].y; avg[i].z += frame[i].z;
        }
      }
      const n = g.frames.length || 1;
      for (let i = 0; i < 21; i += 1) { avg[i].x /= n; avg[i].y /= n; avg[i].z /= n; }
      return { name: g.name, landmarks: avg };
    });
  }
  return GESTURES.map((g) => ({ name: g.name, landmarks: g.make() }));
}

describe('Phase 3.6 Hand SNN production measurement (2026-06-03)', () => {
  it('★ anatomical mock + production clusterTrainRStdp + honest inference', async () => {
    // Synthetic mock OR real fixture (HANDFACE_HAND_FIXTURE env var).
    const loaded = loadFixtureOrSynthetic();
    const features = loaded.map((g) => encodeHandToFeatureVector(g.landmarks));
    expect(features[0]).toHaveLength(HAND_FEAT_DIM);
    const dataSource = process.env.HANDFACE_HAND_FIXTURE ?? 'synthetic anatomical mock';

    // Sparse forced-disjoint top-K=5 (encoder.ts documented solution).
    const topKIndices = selectForcedDisjointTopK(features, HAND_SPARSE_TOP_K_DEFAULT);

    const core = new SNNWorkerCore();
    const transport = new InProcessTransport(core);
    const client = new SNNWorkerClient(transport);
    const storage = new MemoryStorage();
    const sink = new LocalStorageSink({ storage, prefix: 'phase-3-6-hand' });
    const lab = new LocalSNN({
      netId: 'phase-3-6-hand', client, sink, seed: 42,
      clusterActiveInputs: topKIndices, preset: 'n16_hand',
    });
    await lab.init();

    // Phase 2A fix chain (8da3cbe): 1st 30 trials, 2nd+ 90 trials.
    // Production R-STDP API (clusterTrainRStdp) — sparse pattern with only
    // claimed indices nonzero (during training, ground truth target known).
    let totalReinforces = 0;
    for (let ci = 0; ci < loaded.length; ci += 1) {
      const rounds = ci === 0 ? 30 : 90;
      const sparsePattern = new Array(HAND_FEAT_DIM).fill(0);
      for (const idx of topKIndices[ci]) sparsePattern[idx] = features[ci][idx];
      await client.clusterTrainRStdp({
        patterns: Array(rounds).fill(sparsePattern),
        targetCluster: ci,
        intensity: 25,
        stimulusDurationMs: 30,
        observeMs: 50,
        dtMs: 0.1,
        rewardGain: 2.0,
        punishGain: 0.5,
        stdpMode: 'pair',
      });
      totalReinforces += rounds;
    }
    await lab.save();

    // Honest inference — at test time, cluster identity unknown, inject ALL
    // features above threshold; clusterFiringRates with pattern arg normalizes
    // by overlap with each cluster's claimed inputs (QA HIGH PRIMARY FINDING-1).
    const SAMPLES = 5; const SIGMA = 0.05; const baseSeed = 3000;
    const N = loaded.length;
    const matrix: number[][] = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));

    for (let ci = 0; ci < N; ci += 1) {
      const fullFeat = features[ci];
      const gaussian = new SeededGaussian(baseSeed + ci * 1000);
      for (let s = 0; s < SAMPLES; s += 1) {
        const noisy = addFeatureNoise(fullFeat, SIGMA, gaussian);
        // Honest inference: inject ALL features > 0.3 (encoder default threshold).
        const events: { neuron: string; weight: number; time: number; durationMs: number; stepMs: number }[] = [];
        for (let k = 0; k < noisy.length; k += 1) {
          if (noisy[k] > 0.3) {
            events.push({
              neuron: `in_feat_${k}`,
              weight: Math.min(1, noisy[k]) * 25,
              time: 0, durationMs: 50, stepMs: 0.1,
            });
          }
        }
        await client.inject(events);
        await client.run({ durationMs: 60, dtMs: 0.1, stdpEnabled: false });
        // clusterFiringRates with pattern → normalize by overlap (QA fix).
        const cfr = await client.clusterFiringRates({
          windowMs: 60,
          pattern: Array.from(noisy),
        });
        let winner = -1, maxRate = 0;
        for (let cj = 0; cj < cfr.rates.length; cj += 1) {
          if (cfr.rates[cj] > maxRate) { maxRate = cfr.rates[cj]; winner = cj; }
        }
        if (winner >= 0 && winner < N) matrix[ci][winner] += 1;
      }
    }

    const usage = await client.clusterPoolUsage();
    let total = 0, correct = 0;
    const perClusterAccuracy: number[] = [];
    for (let i = 0; i < N; i += 1) {
      perClusterAccuracy.push(matrix[i][i] / SAMPLES);
      total += SAMPLES; correct += matrix[i][i];
    }
    let jaccardMax = 0;
    for (let i = 0; i < usage.overlapMatrix.length; i += 1) {
      for (let j = 0; j < usage.overlapMatrix[i].length; j += 1) {
        if (i !== j && usage.overlapMatrix[i][j] > jaccardMax) jaccardMax = usage.overlapMatrix[i][j];
      }
    }
    const result = {
      perClusterSize: usage.perCluster.map((c) => c.subPoolSize),
      perClusterAccuracy,
      totalAccuracy: total > 0 ? correct / total : 0,
      jaccardMax,
      totalReinforces,
      claimedTotal: usage.totalClaimedFeatures,
      claimedPct: usage.inputDim > 0 ? usage.totalClaimedFeatures / usage.inputDim : 0,
      confusionMatrix: matrix,
      topKActiveIndices: topKIndices,
    };

    const path = resolve(__dirname, 'measurements', 'hand-snn-phase-3-production-measurement.json');
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenario: 'phase-3-hand-snn-production-measurement',
      substrate: 'n16_hand (95-dim)',
      gestures: loaded.map((g) => g.name),
      dataSource,
      mockDesign: 'anatomically realistic appendFinger (curl + cumulative bend rotation)',
      encoding: `sparse forced-disjoint top-K=${HAND_SPARSE_TOP_K_DEFAULT}`,
      trainingApi: 'clusterTrainRStdp (production R-STDP)',
      inferenceMode: 'honest — inject all features > 0.3, clusterFiringRates pattern-normalized',
      productionFix: [
        'commit 8da3cbe: 1st 30 trials, 2nd+ 90 trials',
        'commit 4deb9bc: rawActiveInputs 보존',
        'commit b90c103: subset 인식 (T ⊆ I)',
        'commit 6e3b574: auto-purge (substrate switch)',
      ],
      result,
      comparison: {
        directHand1Shot: '25% (직전 HONEST_LIMITATIONS.md, ART/EWC 미통합)',
        phase3WithFixChain: (result.totalAccuracy * 100).toFixed(0) + '%',
        priorOracleClusterRStdp:
          '100% (hand-snn-cluster-rstdp.json, 2026-05-27) — oracle inference (applySparseTopK by ground truth cluster)',
      },
      verdict:
        result.totalAccuracy >= 0.9
          ? `✓ Hand SNN Phase 2A fix chain + sparse top-K + anatomical mock ${(result.totalAccuracy * 100).toFixed(0)}% — Guide §3.4 ≥90% 도달`
          : result.totalAccuracy >= 0.5
            ? `△ partial improvement (${(result.totalAccuracy * 100).toFixed(0)}%) — noise robustness 추가 fix 필요`
            : `✗ Hand SNN production accuracy 미도달 (${(result.totalAccuracy * 100).toFixed(0)}%)`,
    }, null, 2), 'utf-8');

    console.log('');
    console.log('==== Phase 3.6 Hand SNN production measurement (honest inference) ====');
    console.log(`  mock: anatomically realistic (appendFinger curl)`);
    console.log(`  training: clusterTrainRStdp (production R-STDP)`);
    console.log(`  inference: honest (all features > 0.3, pattern-normalized cluster rates)`);
    console.log(`  per-cluster size: [${result.perClusterSize.join(',')}]`);
    console.log(`  per-cluster accuracy: [${result.perClusterAccuracy.map((a) => (a * 100).toFixed(0) + '%').join(', ')}]`);
    console.log(`  total: ${(result.totalAccuracy * 100).toFixed(0)}%`);
    console.log(`  Jaccard max off-diag: ${result.jaccardMax.toFixed(3)}`);
    console.log(`  confusion matrix:`);
    for (let i = 0; i < N; i += 1) console.log(`    ${loaded[i].name.padEnd(14)} → [${matrix[i].join(', ')}]`);
    console.log(`  total reinforces: ${result.totalReinforces}`);
    console.log('');

    expect(result.totalAccuracy).toBeGreaterThanOrEqual(0);
  }, 1500_000);
});
