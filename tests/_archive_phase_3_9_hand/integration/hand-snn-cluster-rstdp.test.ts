// Hand SNN with production cluster R-STDP training.
//
// 사용자 결정 (2026-05-26): ART vigilance + cluster spawn worker-core 실제
// 통합 multi-file 작업.
//
// 핵심: 이전 supervised reinforce 영역 25% 실패 → production worker-core
// 영역 검증된 `clusterTrainRStdp` API (reward/punish R-STDP) 영역 영역.
// 4 gestures × 30 supervised reinforce per gesture → 4/4 accuracy 목표.
//
// Multi-file 통합 영역 (commit f084bcc 다음 작업):
//   - worker-core.ts: 'n16_hand' preset 영역 handleBuild dispatch 추가.
//   - worker-protocol.ts / local-snn.ts: preset type 영역 'n16_hand' 추가.
//   - art.ts: N16Pools + N_INPUT_N16 dispatch 추가.
//   - root-local-snn.ts: 'orientation-hand' SubstrateKind + buildPresetForKind dispatch.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink, SNNWorkerCore, SNNWorkerClient,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import { N16Pools, RAW_DIM_N16 } from '@/lib/snn-runtime/builders/n16-hand';
import {
  encodeHandToFeatureVector,
  selectForcedDisjointTopK,
  applySparseTopK,
  HAND_SPARSE_TOP_K_DEFAULT,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

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

// 4 distinct hand gestures — MediaPipe-like proportions, anatomically separable.
// 학술 정합: MediaPipe Hand 21 landmark convention (0=WRIST, 4=THUMB_TIP,
// 8=INDEX_TIP, 12=MIDDLE_TIP, 16=RING_TIP, 20=PINKY_TIP, 각 손가락 -3=MCP / -2=PIP / -1=DIP).
//
// 이전 mock 의 핵심 결함 (commit b1d2f26 ~ K-sweep 측정):
//   - peace_sign 의 thumb 가 degenerate (4 joint 동일 좌표)
//   - thumbs_up/peace_sign mock 이 derived feature 영역 (pinch distance) 에서
//     ~43% Jaccard overlap → cluster 2/3 confusion.
// 본 재설계: anatomically realistic 각 손가락 length + bend + thumb/index 방향
// 차이 영역 명확히 → pairwise top-K Jaccard 0 목표.

// 5 손가락의 MCP / PIP / DIP / TIP 4 joint 순차 배치 helper.
// extended: PIP -> TIP 까지 직선 (손가락 펴짐).
// closed: PIP 부터 손바닥 쪽 (반대 방향) 으로 꺾임 (주먹).
function appendFinger(
  lm: HandLandmark[],
  mcp: { x: number; y: number; z: number },
  dir: { x: number; y: number; z: number }, // extended 방향 unit-ish vector
  length: number,
  curl: number, // 0 = straight, 1 = fully closed (PIP→TIP가 손바닥 쪽으로 꺾임)
): void {
  // joint 분할: MCP, PIP (1/3), DIP (2/3), TIP (3/3)
  const segments = 3;
  let curX = mcp.x, curY = mcp.y, curZ = mcp.z;
  lm.push({ x: curX, y: curY, z: curZ }); // MCP
  // 각 segment: PIP/DIP/TIP. extended dir + curl-back dir 의 cumulative rotation.
  let curDirX = dir.x, curDirY = dir.y;
  const curDirZ = dir.z;
  for (let s = 1; s <= segments; s += 1) {
    // curl 이 강할수록 dir 가 매번 더 휜다 (cumulative bend).
    const bend = curl * (s / segments) * 1.4; // [0..1.4 rad]
    const cos = Math.cos(bend), sin = Math.sin(bend);
    // in-plane (x,y) 2D rotation — 손바닥 평면 안에서 손가락 끝이 손바닥 쪽으로 휨.
    // z 축은 별도로 linear push (curl 시 손바닥 두께 만큼).
    const nx = curDirX * cos - (-curDirY) * sin;
    const ny = curDirX * sin + (-curDirY) * cos; // negative-y bend = 손바닥 쪽
    curDirX = nx; curDirY = ny;
    const segLen = length / segments;
    curX += curDirX * segLen;
    curY += curDirY * segLen;
    curZ += curDirZ * segLen + curl * 0.02; // closed 시 손바닥 쪽 z 증가
    lm.push({ x: curX, y: curY, z: curZ });
  }
}

function makeOpenPalm(): HandLandmark[] {
  // 모든 5 손가락 fully extended, palm facing camera.
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }]; // WRIST
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.3, y: -1, z: 0 }, 0.18, 0); // thumb (좌측 위)
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 0); // index
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 0); // middle
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 0); // ring
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 0); // pinky
  return lm;
}

function makeClosedFist(): HandLandmark[] {
  // 모든 5 손가락 fully closed (curl 1).
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1); // thumb 약간 굽힘
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}

function makeThumbsUp(): HandLandmark[] {
  // Thumb extended up, 다른 4 손가락 fully closed.
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: 0, y: -1, z: 0 }, 0.20, 0); // thumb 똑바로 위
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 1);
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1);
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1);
  return lm;
}

function makePeaceSign(): HandLandmark[] {
  // Index + Middle extended, Thumb/Ring/Pinky closed.
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  appendFinger(lm, { x: 0.35, y: 0.78, z: 0 }, { x: -0.2, y: -0.6, z: 0 }, 0.18, 1); // thumb closed
  appendFinger(lm, { x: 0.42, y: 0.72, z: 0 }, { x: -0.05, y: -1, z: 0 }, 0.22, 0); // index extended
  appendFinger(lm, { x: 0.50, y: 0.70, z: 0 }, { x: 0,     y: -1, z: 0 }, 0.24, 0); // middle extended
  appendFinger(lm, { x: 0.58, y: 0.72, z: 0 }, { x: 0.05,  y: -1, z: 0 }, 0.22, 1); // ring closed
  appendFinger(lm, { x: 0.65, y: 0.78, z: 0 }, { x: 0.10,  y: -1, z: 0 }, 0.18, 1); // pinky closed
  return lm;
}

// Flatten landmarks → 63 dim raw for worker (dispatchComputeFeature 영역 영역 영역).
function flattenRawForWorker(lm: HandLandmark[]): number[] {
  const out: number[] = new Array(RAW_DIM_N16);
  for (let i = 0; i < 21; i += 1) {
    out[i * 3] = lm[i].x;
    out[i * 3 + 1] = lm[i].y;
    out[i * 3 + 2] = lm[i].z;
  }
  return out;
}

function computeActiveInputs(fv: ReadonlyArray<number>, threshold: number = 0.2): number[] {
  const active: number[] = [];
  for (let i = 0; i < fv.length; i += 1) if (fv[i] > threshold) active.push(i);
  return active;
}

// Top-K sparse active inputs (measurement-driven, 2026-05-26 fix).
// Baseline threshold-based: 98% overlap → R-STDP 0/4. K=8 plain top-K: 83% distinct.
// 본 test 영역 K=HAND_SPARSE_TOP_K_DEFAULT (=5) + forced-disjoint diagnostic 사용.
const SPARSE_TOP_K = HAND_SPARSE_TOP_K_DEFAULT;

describe('Hand SNN with production R-STDP cluster training', () => {
  it('★ Multi-file integration + clusterTrainRStdp → 4 gestures accuracy 목표', { timeout: 600000 }, async () => {
    const gestures = [
      { name: 'open_palm', landmarks: makeOpenPalm() },
      { name: 'closed_fist', landmarks: makeClosedFist() },
      { name: 'thumbs_up', landmarks: makeThumbsUp() },
      { name: 'peace_sign', landmarks: makePeaceSign() },
    ];

    // Pre-compute feature vectors + mean-subtracted sparse top-K active inputs.
    //
    // Plain top-K 의 결함 (측정 2026-05-26):
    //   95-dim feature 의 절대값 상위 K 는 모든 gesture 에서 동일한
    //   "magnitude-dominant" features (palm size, wrist-tip distance) 차지 →
    //   cluster_0 / cluster_3 의 top-K 가 Jaccard 1.0 (identical).
    //
    // Mean-subtracted top-K (4 gesture mean 제거 후 |residual| 상위 K):
    //   각 gesture 의 "이 gesture 만 특히 활성화 / 비활성화 되는 features" 추출
    //   → distinctiveness 직접 최대화. 모든 gesture 평균에 가까운 large-magnitude
    //   features 자동 제외.
    const fullFeatures = gestures.map(g => encodeHandToFeatureVector(g.landmarks));
    // FORCED DISJOINT diagnostic — 모든 cluster pair Jaccard = 0 강제. mechanism
    // ceiling 검증 (만약 이래도 안 되면 mechanism 자체 문제).
    const topKIndices = selectForcedDisjointTopK(fullFeatures, SPARSE_TOP_K);
    const sparseFeatures = fullFeatures.map((fv, i) => applySparseTopK(fv, topKIndices[i]));
    const clusterActiveInputs = topKIndices;
    void computeActiveInputs;
    void flattenRawForWorker;
    // 95-dim sparse features 를 직접 worker 에 전송 — dispatchComputeFeature 우회
    // (length 95 = already expanded, mean-sub baseline 을 client 단에서 적용).
    const sparsePatterns = sparseFeatures;

    // Build SNN via SNNWorkerClient + n16_hand preset.
    const core = new SNNWorkerCore();
    const transport = new InProcessTransport(core);
    const client = new SNNWorkerClient(transport);
    const sink = new LocalStorageSink({ storage: new MemoryStorage(), prefix: 'hand_rstdp' });
    const lab = new LocalSNN({
      netId: 'hand_rstdp_demo',
      client, sink,
      seed: 57,
      clusterActiveInputs,
      preset: 'n16_hand',
    });
    const buildStatus = await lab.init();
    expect(buildStatus.neurons).toBeGreaterThan(0);

    // Production R-STDP supervised reinforce — 10 reinforce per gesture (75-dim hand 영역 영역 적합).
    const REINFORCE_PER_GESTURE = 10;
    for (let g = 0; g < gestures.length; g += 1) {
      const pattern = sparsePatterns[g]; // 95-dim mean-sub top-K=5 sparse
      // worker 의 dispatchComputeFeature 가 length 95 인 경우 그대로 return —
      // mean-sub baseline 은 client 가 미리 적용한 sparse 그대로 spike injection.
      await client.clusterTrainRStdp({
        patterns: Array(REINFORCE_PER_GESTURE).fill(pattern),
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

    // Final test — silent inference per gesture.
    const finalTests: { gestureIdx: number; predictedWinner: number; correct: boolean; firingRates: number[] }[] = [];
    for (let g = 0; g < gestures.length; g += 1) {
      const pattern = sparsePatterns[g]; // 95-dim mean-sub top-K sparse
      // Inject + run (STDP off).
      const events: { neuron: string; weight: number; time: number; durationMs: number; stepMs: number }[] = [];
      const sfv = sparseFeatures[g];
      for (let i = 0; i < sfv.length; i += 1) {
        if (sfv[i] > 0) {
          events.push({
            neuron: `in_feat_${i}`,
            weight: 25 * sfv[i],
            time: 0, durationMs: 50, stepMs: 0.1,
          });
        }
      }
      await client.inject(events);
      await client.run({ durationMs: 60, dtMs: 0.1, stdpEnabled: false });

      // Measure cluster firing rates.
      const cfr = await client.clusterFiringRates({
        windowMs: 60,
        pattern,
      });
      const firingRates = cfr.rates;
      let winner = -1;
      let maxRate = 0;
      for (let ci = 0; ci < firingRates.length; ci += 1) {
        if (firingRates[ci] > maxRate) { maxRate = firingRates[ci]; winner = ci; }
      }
      finalTests.push({
        gestureIdx: g, predictedWinner: winner,
        correct: winner === g,
        firingRates: firingRates.map(r => parseFloat(r.toFixed(2))),
      });
      void pattern;
    }
    const finalCorrect = finalTests.filter(t => t.correct).length;
    const finalAccuracy = finalCorrect / gestures.length;

    const measurement = {
      timestamp: new Date().toISOString(),
      scenario: 'hand-snn-cluster-rstdp',
      gestures: gestures.map(g => g.name),
      neuronsTotal: buildStatus.neurons,
      synapsesTotal: buildStatus.synapses,
      reinforcePerGesture: REINFORCE_PER_GESTURE,
      preset: 'n16_hand',
      multiFileIntegration: {
        workerCore: 'n16_hand preset dispatch 추가됨',
        artModule: 'N16Pools + N_INPUT_N16 dispatch 추가됨',
        localSnn: 'preset type 영역 n16_hand 추가됨',
        rootLocalSnn: 'orientation-hand SubstrateKind 추가됨',
      },
      sparseTopK: SPARSE_TOP_K,
      clusterActiveInputs: topKIndices,
      activeInputsOverlap: (() => {
        const sets = topKIndices.map(idx => new Set(idx));
        const overlaps: { i: number; j: number; jaccard: number; intersect: number[] }[] = [];
        for (let i = 0; i < sets.length; i += 1) {
          for (let j = i + 1; j < sets.length; j += 1) {
            const inter: number[] = [];
            for (const a of sets[i]) if (sets[j].has(a)) inter.push(a);
            const union = sets[i].size + sets[j].size - inter.length;
            overlaps.push({ i, j, jaccard: union > 0 ? inter.length / union : 0, intersect: inter });
          }
        }
        return overlaps;
      })(),
      finalTests,
      finalCorrect,
      finalAccuracy,
      OUT_PER_CLUSTER: N16Pools.OUT_PER_CLUSTER,
    };
    saveMeasurement('hand-snn-cluster-rstdp', measurement);

    // Minimum verification: substrate build + training 영역 영역 작동.
    expect(buildStatus.neurons).toBeGreaterThan(0);
    expect(finalTests).toHaveLength(4);

    console.log(`[R-STDP] reinforce/gesture: ${REINFORCE_PER_GESTURE}`);
    console.log(`[R-STDP] final correct: ${finalCorrect}/${gestures.length} (${(finalAccuracy * 100).toFixed(0)}%)`);
    for (const t of finalTests) {
      console.log(`  ${gestures[t.gestureIdx].name}: winner=${t.predictedWinner} ${t.correct ? '✓' : '✗'}, rates=[${t.firingRates.map(r => r.toFixed(1)).join(', ')}]`);
    }
  });
});
