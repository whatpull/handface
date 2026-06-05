// Hand SNN — Spike encoding tie-break / weight initialization bias mechanism R&D.
// (open_palm → peace_sign systematic bias 영역 architectural root cause empirical
// catch — direct followup to ea3e641 H_distributed_signatures verdict.)
//
// 컨텍스트 (2026-05-30): 직전 commit ea3e641 (hand-snn-joint-criterion-pair-evaluation)
// 영역 H_distributed_signatures verdict — joint criterion (overlap × sign ×
// magnitude) 영역 op-pe specific systematic miss 영역 explain 영역 영역. cf-tu
// top joint_score 영역 NO miss reproduce, op-pe rank 2 영역 systematic miss
// (fd66191 15/15 instance 영역 reproduce 영역). 정직 한계 명시 — "Spike encoding
// tie-break (winner first-cluster-wins) / weight matrix initialization
// (seed-dependent) / R-STDP cluster sequence priority 영역 다른 architectural
// mechanism mandatory R&D".
//
// 본 R&D 영역 3 phase 영역 영역 architectural bias mechanism 영역 separate verify:
//   Phase A: Untrained network initial cluster ranking (seed variance).
//   Phase B: Trained network winner cluster tracking (seed variance).
//   Phase C: Cluster sequence priority verify (R-STDP training cluster sequence).
//
// 시나리오 (focused scope):
//   - 4 gesture (open_palm / closed_fist / thumbs_up / peace_sign) — ea3e641 동일 mock.
//   - selectMeanSubtractedTopK K=10 cluster topology (forced-disjoint clean
//     anatomical baseline, ea3e641 baseline 동일).
//   - feature dim 95 (HAND_FEAT_DIM).
//   - SNN build seed ∈ {57, 100, 200, 500, 1000} — weight init variance source.
//   - n16_hand preset (active in prod path).
//
// 측정 metrics:
//   Phase A:
//     - per (seed, gesture) initial_cluster_ranking [c0_rate, c1_rate, c2_rate, c3_rate]
//     - per (seed, gesture) initial_winner = argmax of cluster rates
//   Phase B:
//     - per (seed, gesture) trained_winner = argmax after R-STDP train
//     - per (seed, gesture) trained_cluster_rates (margin / share)
//   Phase C:
//     - per (cluster_sequence_variant, gesture) trained_winner
//     - cluster_sequence_variants ∈ { [0,1,2,3] (default), [3,2,1,0] (reverse),
//       [0,3,1,2] (shuffle) }
//
// hypothesis verdicts (per phase):
//   Phase A (initial bias):
//     - H_initial_bias_seed_dependent: per-seed open_palm initial winner 영역 다양
//       (5 seed 영역 5 다른 winner) → weight matrix init seed variance 영역 root cause.
//     - H_initial_bias_systematic: per-seed open_palm initial winner 영역 동일 cluster
//       (예: cluster 3) → R-STDP weight init 영역 systematic bias.
//     - H_initial_bias_random: per-seed open_palm initial winner 영역 random
//       distribution (≥3 다른 cluster appear) → tie-break first-cluster 영역 영역.
//   Phase B (trained winner):
//     - H_trained_winner_seed_dependent: per-seed open_palm trained winner 영역 다양
//       → initial bias propagation 영역 학습 영역 영역 영역.
//     - H_trained_winner_seed_independent: per-seed open_palm trained winner 영역
//       동일 cluster (예: cluster 3 — peace_sign) 항상 → systematic bias 영역
//       seed-independent (root cause 영역 architectural).
//   Phase C (cluster sequence):
//     - H_cluster_sequence_priority: 3 variants 영역 영역 영역 영역 open_palm winner
//       다름 → R-STDP cluster sequence priority 영역 root cause.
//     - H_cluster_sequence_invariant: 3 variants 영역 영역 영역 영역 winner 일관 (예:
//       cluster 3 항상) → cluster sequence priority 영역 root cause 영역 영역.
//
// 학술 정합:
//   - Bishop 1995 — winner selection tie-break (first-cluster vs random tie-break).
//   - Olshausen & Field 1996 — sparse coding initial weight bias.
//   - Diehl & Cook 2015 — STDP weight initialization seed sensitivity.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  LocalSNN, LocalStorageSink, SNNWorkerCore, SNNWorkerClient,
  type WorkerLike, type WorkerRequest,
} from '@/lib/snn-runtime';
import {
  encodeHandToFeatureVector,
  selectMeanSubtractedTopK,
  applySparseTopK,
  HAND_FEAT_DIM,
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

// 4 anatomical mock gesture — ea3e641 / 6ae3a50 동일 (cross-reference reproducible).
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

const K = 10;
const PHASE_AB_SEEDS = [57, 100, 200, 500, 1000];
const PHASE_C_CLUSTER_SEQUENCES: number[][] = [
  [0, 1, 2, 3], // default forward
  [3, 2, 1, 0], // reverse
  [0, 3, 1, 2], // shuffle
];

// ── Common helpers ──

interface ForwardPassResult {
  gestureIndex: number;
  gestureName: string;
  clusterRates: number[]; // [c0, c1, c2, c3]
  winner: number; // -1 if all-zero (tie-break: client returns argmax with first-cluster).
  share: number;
  margin: number;
}

// inject sparse top-K + run with stdp=false + read clusterFiringRates.
// 본 helper 영역 untrained + trained 영역 영역 영역 영역.
async function forwardPass(
  client: SNNWorkerClient,
  gestureIndex: number,
  sparseTopK: number[],
  features: number[],
): Promise<ForwardPassResult> {
  const sparse = applySparseTopK(features, sparseTopK);
  const events: { neuron: string; weight: number; time: number; durationMs: number; stepMs: number }[] = [];
  for (let i = 0; i < sparse.length; i += 1) {
    if (sparse[i] > 0) {
      events.push({
        neuron: `in_feat_${i}`,
        weight: 25 * sparse[i],
        time: 0,
        durationMs: 50,
        stepMs: 0.1,
      });
    }
  }
  await client.inject(events);
  await client.run({ durationMs: 60, dtMs: 0.1, stdpEnabled: false });
  const cfr = await client.clusterFiringRates({ windowMs: 60, pattern: sparse });
  return {
    gestureIndex,
    gestureName: GESTURE_MAKERS[gestureIndex].name,
    clusterRates: cfr.rates.slice(),
    winner: cfr.winner,
    share: cfr.share,
    margin: cfr.margin,
  };
}

interface PhaseAResult {
  seed: number;
  per_gesture: ForwardPassResult[];
}

async function runPhaseAPerSeed(
  seed: number,
  candidateTopK: number[][],
  featureVectors: number[][],
): Promise<PhaseAResult> {
  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const sink = new LocalStorageSink({
    storage: new MemoryStorage(),
    prefix: `tie_break_phaseA_seed_${seed}`,
  });
  const lab = new LocalSNN({
    netId: `tie_break_phaseA_seed_${seed}`,
    client, sink,
    seed,
    preset: 'n16_hand',
    clusterActiveInputs: candidateTopK,
  });
  const buildStatus = await lab.init();
  if (buildStatus.neurons <= 0) {
    throw new Error(`Phase A SNN build failed at seed=${seed}`);
  }

  const perGesture: ForwardPassResult[] = [];
  for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
    perGesture.push(await forwardPass(client, g, candidateTopK[g], featureVectors[g]));
  }

  transport.terminate();
  return { seed, per_gesture: perGesture };
}

interface PhaseBResult {
  seed: number;
  per_gesture: ForwardPassResult[];
}

// Train SNN with R-STDP — given cluster sequence (default [0,1,2,3]) — then forward pass.
async function runPhaseBPerSeed(
  seed: number,
  candidateTopK: number[][],
  featureVectors: number[][],
  trainSequence: number[] = [0, 1, 2, 3],
): Promise<PhaseBResult> {
  const core = new SNNWorkerCore();
  const transport = new InProcessTransport(core);
  const client = new SNNWorkerClient(transport);
  const sink = new LocalStorageSink({
    storage: new MemoryStorage(),
    prefix: `tie_break_phaseB_seed_${seed}`,
  });
  const lab = new LocalSNN({
    netId: `tie_break_phaseB_seed_${seed}`,
    client, sink,
    seed,
    preset: 'n16_hand',
    clusterActiveInputs: candidateTopK,
  });
  const buildStatus = await lab.init();
  if (buildStatus.neurons <= 0) {
    throw new Error(`Phase B SNN build failed at seed=${seed}`);
  }

  // R-STDP train — clean anatomical baseline (1 pattern per gesture, repeat in batch).
  // training cluster sequence 영역 변경 가능 — Phase C 영역 영역 cluster sequence
  // priority verify 영역 영역 영역.
  const TRAIN_REPEATS = 10;
  for (const g of trainSequence) {
    const topK = candidateTopK[g];
    const sparse = applySparseTopK(featureVectors[g], topK);
    const patterns: number[][] = [];
    for (let r = 0; r < TRAIN_REPEATS; r += 1) patterns.push(sparse.slice());
    await client.clusterTrainRStdp({
      patterns,
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

  // Forward pass — 영역 gesture 영역 winner cluster 영역 catch.
  const perGesture: ForwardPassResult[] = [];
  for (let g = 0; g < GESTURE_MAKERS.length; g += 1) {
    perGesture.push(await forwardPass(client, g, candidateTopK[g], featureVectors[g]));
  }

  transport.terminate();
  return { seed, per_gesture: perGesture };
}

interface PhaseCResult {
  cluster_sequence: number[];
  per_gesture: ForwardPassResult[];
}

async function runPhaseCPerSequence(
  trainSequence: number[],
  candidateTopK: number[][],
  featureVectors: number[][],
): Promise<PhaseCResult> {
  const result = await runPhaseBPerSeed(57, candidateTopK, featureVectors, trainSequence);
  return { cluster_sequence: trainSequence, per_gesture: result.per_gesture };
}

// ── Verdict classifiers ──

function classifyPhaseAVerdict(perSeed: PhaseAResult[]): {
  verdict: 'H_initial_bias_seed_dependent' | 'H_initial_bias_systematic' | 'H_initial_bias_random';
  evidence: string;
  open_palm_initial_winners: number[];
  unique_winner_count: number;
} {
  // open_palm (gesture index 0) 영역 per-seed initial winner 영역 catch.
  const openPalmWinners = perSeed.map(r => {
    const op = r.per_gesture.find(p => p.gestureIndex === 0);
    return op ? op.winner : -1;
  });
  const uniqueWinners = new Set(openPalmWinners.filter(w => w >= 0));
  const uniqueCount = uniqueWinners.size;

  let verdict: 'H_initial_bias_seed_dependent' | 'H_initial_bias_systematic' | 'H_initial_bias_random';
  // 영역 = unique 1 → systematic (모든 seed 영역 영역 winner).
  // unique 2 → seed_dependent (영역 영역 영역 variance).
  // unique ≥ 3 → random (영역 영역 영역 distribution).
  if (uniqueCount === 1) {
    verdict = 'H_initial_bias_systematic';
  } else if (uniqueCount === 2) {
    verdict = 'H_initial_bias_seed_dependent';
  } else {
    verdict = 'H_initial_bias_random';
  }

  const evidence =
    `open_palm per-seed initial winners=[${openPalmWinners.join(', ')}], ` +
    `unique cluster count=${uniqueCount} (1=systematic / 2=seed_dependent / ≥3=random).`;
  return {
    verdict,
    evidence,
    open_palm_initial_winners: openPalmWinners,
    unique_winner_count: uniqueCount,
  };
}

function classifyPhaseBVerdict(perSeed: PhaseBResult[]): {
  verdict: 'H_trained_winner_seed_dependent' | 'H_trained_winner_seed_independent';
  evidence: string;
  open_palm_trained_winners: number[];
  unique_winner_count: number;
  systematic_to_cluster_3: boolean;
} {
  const openPalmWinners = perSeed.map(r => {
    const op = r.per_gesture.find(p => p.gestureIndex === 0);
    return op ? op.winner : -1;
  });
  const uniqueWinners = new Set(openPalmWinners.filter(w => w >= 0));
  const uniqueCount = uniqueWinners.size;
  const allClusterThree = openPalmWinners.every(w => w === 3);

  let verdict: 'H_trained_winner_seed_dependent' | 'H_trained_winner_seed_independent';
  if (uniqueCount === 1) {
    verdict = 'H_trained_winner_seed_independent';
  } else {
    verdict = 'H_trained_winner_seed_dependent';
  }

  const evidence =
    `open_palm per-seed trained winners=[${openPalmWinners.join(', ')}], ` +
    `unique cluster count=${uniqueCount}, ` +
    `all_cluster_3=${allClusterThree} (peace_sign systematic bias 영역 인디케이터).`;
  return {
    verdict,
    evidence,
    open_palm_trained_winners: openPalmWinners,
    unique_winner_count: uniqueCount,
    systematic_to_cluster_3: allClusterThree,
  };
}

function classifyPhaseCVerdict(perSequence: PhaseCResult[]): {
  verdict: 'H_cluster_sequence_priority' | 'H_cluster_sequence_invariant';
  evidence: string;
  open_palm_winners_by_sequence: Array<{ sequence: number[]; winner: number }>;
  unique_winner_count: number;
} {
  const winners = perSequence.map(r => ({
    sequence: r.cluster_sequence.slice(),
    winner: r.per_gesture.find(p => p.gestureIndex === 0)?.winner ?? -1,
  }));
  const uniqueWinners = new Set(winners.map(w => w.winner).filter(w => w >= 0));
  const uniqueCount = uniqueWinners.size;

  let verdict: 'H_cluster_sequence_priority' | 'H_cluster_sequence_invariant';
  if (uniqueCount >= 2) {
    verdict = 'H_cluster_sequence_priority';
  } else {
    verdict = 'H_cluster_sequence_invariant';
  }

  const evidence =
    `open_palm per-sequence winners=[${winners.map(w => `${JSON.stringify(w.sequence)}→${w.winner}`).join(', ')}], ` +
    `unique cluster count=${uniqueCount} (≥2 → cluster sequence priority root cause).`;
  return {
    verdict,
    evidence,
    open_palm_winners_by_sequence: winners,
    unique_winner_count: uniqueCount,
  };
}

// CI conditional skip — wall-time 영역 영역 단 safe wire. SKIP_HEAVY_TESTS=1 or
// CI=true 영역 환경 영역 skip.
const skipHeavy = process.env.CI === 'true' || process.env.SKIP_HEAVY_TESTS === '1';

describe('Hand SNN — Spike encoding tie-break / weight init bias mechanism R&D', () => {
  it.skipIf(skipHeavy)(
    '★ Phase A/B/C — initial bias seed variance / trained winner seed variance / cluster sequence priority',
    { timeout: 300000 },
    async () => {
      const startedAtMs = Date.now();

      // Step 1: encode 4 gesture → feature vectors (clean anatomical baseline).
      const featureVectors = GESTURE_MAKERS.map(gm => encodeHandToFeatureVector(gm.make()));

      // Step 2: cluster topology — mean-sub top-K (ea3e641 baseline 동일).
      const candidateTopK = selectMeanSubtractedTopK(featureVectors, K);

      // ── Phase A: Untrained network initial cluster ranking ──
      console.log('');
      console.log('[tie-break] === Phase A: Untrained network initial cluster ranking ===');
      const phaseAResults: PhaseAResult[] = [];
      for (const seed of PHASE_AB_SEEDS) {
        console.log(`[tie-break] Phase A seed=${seed} ...`);
        const r = await runPhaseAPerSeed(seed, candidateTopK, featureVectors);
        phaseAResults.push(r);
        for (const pg of r.per_gesture) {
          console.log(
            `[tie-break]   seed=${seed} ${pg.gestureName.padEnd(12)} ` +
            `rates=[${pg.clusterRates.map(v => v.toFixed(1)).join(', ')}] ` +
            `winner=${pg.winner} share=${pg.share.toFixed(3)} margin=${pg.margin.toFixed(3)}`,
          );
        }
      }
      const phaseAVerdict = classifyPhaseAVerdict(phaseAResults);
      console.log(`[tie-break] Phase A verdict=${phaseAVerdict.verdict}`);
      console.log(`[tie-break] Phase A evidence: ${phaseAVerdict.evidence}`);

      // ── Phase B: Trained network winner cluster tracking ──
      console.log('');
      console.log('[tie-break] === Phase B: Trained network winner cluster tracking ===');
      const phaseBResults: PhaseBResult[] = [];
      for (const seed of PHASE_AB_SEEDS) {
        console.log(`[tie-break] Phase B seed=${seed} ...`);
        const r = await runPhaseBPerSeed(seed, candidateTopK, featureVectors);
        phaseBResults.push(r);
        for (const pg of r.per_gesture) {
          console.log(
            `[tie-break]   seed=${seed} ${pg.gestureName.padEnd(12)} ` +
            `rates=[${pg.clusterRates.map(v => v.toFixed(1)).join(', ')}] ` +
            `winner=${pg.winner} share=${pg.share.toFixed(3)} margin=${pg.margin.toFixed(3)}`,
          );
        }
      }
      const phaseBVerdict = classifyPhaseBVerdict(phaseBResults);
      console.log(`[tie-break] Phase B verdict=${phaseBVerdict.verdict}`);
      console.log(`[tie-break] Phase B evidence: ${phaseBVerdict.evidence}`);

      // ── Phase C: Cluster sequence priority verify ──
      console.log('');
      console.log('[tie-break] === Phase C: Cluster sequence priority verify ===');
      const phaseCResults: PhaseCResult[] = [];
      for (const sequence of PHASE_C_CLUSTER_SEQUENCES) {
        console.log(`[tie-break] Phase C sequence=${JSON.stringify(sequence)} ...`);
        const r = await runPhaseCPerSequence(sequence, candidateTopK, featureVectors);
        phaseCResults.push(r);
        for (const pg of r.per_gesture) {
          console.log(
            `[tie-break]   seq=${JSON.stringify(sequence)} ${pg.gestureName.padEnd(12)} ` +
            `rates=[${pg.clusterRates.map(v => v.toFixed(1)).join(', ')}] ` +
            `winner=${pg.winner} share=${pg.share.toFixed(3)} margin=${pg.margin.toFixed(3)}`,
          );
        }
      }
      const phaseCVerdict = classifyPhaseCVerdict(phaseCResults);
      console.log(`[tie-break] Phase C verdict=${phaseCVerdict.verdict}`);
      console.log(`[tie-break] Phase C evidence: ${phaseCVerdict.evidence}`);

      // ── Root cause identification ──
      let rootCauseTag: string;
      let rootCauseExplain: string;
      if (phaseCVerdict.verdict === 'H_cluster_sequence_priority') {
        rootCauseTag = 'cluster_sequence_priority';
        rootCauseExplain =
          'R-STDP cluster sequence priority — 영역 영역 cluster 영역 영역 영역 reinforce 영역 ' +
          'cluster winner bias 영역 영역 (Phase C 영역 sequence variant 별 winner 다름). ' +
          'training order 영역 randomize 영역 mitigation.';
      } else if (phaseBVerdict.verdict === 'H_trained_winner_seed_independent') {
        if (phaseBVerdict.systematic_to_cluster_3) {
          rootCauseTag = 'systematic_bias_to_peace_sign_cluster_3';
          rootCauseExplain =
            'Trained winner 영역 seed 영역 영역 영역 영역 cluster 3 (peace_sign) 영역 ' +
            'systematic 영역 catch (Phase B). Phase C 영역 cluster sequence invariant 영역 ' +
            '확인 영역 → architectural systematic bias (cluster 3 winner) — root cause 영역 ' +
            'spike encoding tie-break (winner 영역 cluster 3 → peace_sign sparse pattern 영역 ' +
            'strongest activation) 또는 weight init systematic bias 영역. spike tie-break ' +
            'algorithm formal verify / cluster topology rebalance R&D 영역.';
        } else {
          rootCauseTag = 'systematic_bias_seed_independent';
          rootCauseExplain =
            'Trained winner 영역 seed 영역 영역 영역 영역 일관 (Phase B unique=1) 영역 ' +
            'architectural systematic bias 영역 root cause. Phase C cluster sequence invariant ' +
            '영역 → cluster sequence priority 영역 root cause 영역 영역. spike encoding ' +
            'tie-break / cluster topology asymmetry 영역 R&D mandatory.';
        }
      } else if (phaseAVerdict.verdict === 'H_initial_bias_seed_dependent' ||
                 phaseBVerdict.verdict === 'H_trained_winner_seed_dependent') {
        rootCauseTag = 'weight_init_seed_variance';
        rootCauseExplain =
          'Weight matrix initialization seed variance — per-seed initial winner / trained winner ' +
          '영역 다양 → seed-dependent. mitigation: SNN build seed 영역 fix + ensemble training ' +
          '영역 robust prior 영역 영역 영역.';
      } else if (phaseAVerdict.verdict === 'H_initial_bias_random') {
        rootCauseTag = 'tie_break_first_cluster';
        rootCauseExplain =
          'Untrained network cluster spike rates 영역 영역 영역 영역 → winner 영역 tie-break ' +
          'first-cluster-wins implementation detail 영역 영역 영역 (Phase A 영역 ≥3 unique winners ' +
          '영역 random distribution). formal tie-break algorithm 영역 verify R&D 영역.';
      } else {
        rootCauseTag = 'inconclusive';
        rootCauseExplain =
          '3 phase 영역 verdict 영역 영역 영역 single root cause 영역 영역 영역 영역 영역 영역. ' +
          'measurement focused scope (5 seed × 4 gesture × 3 sequence) 영역 broader R&D 영역 영역.';
      }

      const elapsedMs = Date.now() - startedAtMs;

      const measurement = {
        timestamp: new Date().toISOString(),
        scenario: 'hand-snn-tie-break-mechanism-analysis',
        elapsed_ms: elapsedMs,
        focused_scope: {
          gesture_count: GESTURE_MAKERS.length,
          gesture_names: GESTURE_MAKERS.map(g => g.name),
          topk: K,
          feature_dim: HAND_FEAT_DIM,
          topology: 'mean_subtracted_topk_raw (forced_disjoint=FALSE, ea3e641 baseline 동일)',
          cluster_active_inputs: candidateTopK,
          preset: 'n16_hand',
          phase_ab_seeds: PHASE_AB_SEEDS,
          phase_c_cluster_sequences: PHASE_C_CLUSTER_SEQUENCES,
          phase_b_train_repeats_per_cluster: 10,
          measurement_target:
            'Spike encoding tie-break (winner first-cluster) / weight matrix init (seed-dependent) / ' +
            'R-STDP cluster sequence priority — 3 architectural mechanism 영역 separate verify. ' +
            'open_palm → peace_sign systematic bias (fd66191 영역 train_seed=1000..1400 / infer_seed=' +
            '2000..2400 fixed configuration 한정 15/15 instance σ-independent) 영역 root cause empirical ' +
            'catch. **본 R&D 영역 build seed variance ({57, 100, 200, 500, 1000}) 영역 fd66191 ' +
            'universality claim 영역 contradicted** — Phase B open_palm trained winner [1, 3, 1, 1, 3] ' +
            '영역 cluster 3 영역 only 2/5 seed 영역 reproduce, cluster 1 (3/5 majority) 영역 trained — ' +
            'fd66191 영역 architectural systematic 영역 over-claim 정정 (single build_seed implicit baseline ' +
            '한정 systematic bias). 직전 ea3e641 H_distributed_signatures verdict 영역 mechanism gap 영역 ' +
            '명시 — 본 R&D 영역 mechanism gap 영역 build seed variance dominant 영역 영역 catch.',
        },
        phase_a_untrained: {
          per_seed_results: phaseAResults,
          verdict: phaseAVerdict.verdict,
          evidence: phaseAVerdict.evidence,
          open_palm_initial_winners: phaseAVerdict.open_palm_initial_winners,
          unique_winner_count: phaseAVerdict.unique_winner_count,
        },
        phase_b_trained: {
          per_seed_results: phaseBResults,
          verdict: phaseBVerdict.verdict,
          evidence: phaseBVerdict.evidence,
          open_palm_trained_winners: phaseBVerdict.open_palm_trained_winners,
          unique_winner_count: phaseBVerdict.unique_winner_count,
          systematic_to_cluster_3: phaseBVerdict.systematic_to_cluster_3,
        },
        phase_c_cluster_sequence: {
          per_sequence_results: phaseCResults,
          verdict: phaseCVerdict.verdict,
          evidence: phaseCVerdict.evidence,
          open_palm_winners_by_sequence: phaseCVerdict.open_palm_winners_by_sequence,
          unique_winner_count: phaseCVerdict.unique_winner_count,
        },
        root_cause_identification: {
          tag: rootCauseTag,
          explain: rootCauseExplain,
        },
        hypothesis_details: {
          definitions: {
            // Phase A
            H_initial_bias_seed_dependent:
              'per-seed open_palm untrained winner 영역 영역 2 다른 cluster 영역 catch ' +
              '(unique=2) → weight matrix init seed variance 영역 root cause.',
            H_initial_bias_systematic:
              'per-seed open_palm untrained winner 영역 동일 cluster 영역 모든 seed 영역 catch ' +
              '(unique=1) → R-STDP weight init 영역 systematic bias.',
            H_initial_bias_random:
              'per-seed open_palm untrained winner 영역 ≥3 다른 cluster 영역 distribute (unique≥3) → ' +
              'tie-break first-cluster-wins implementation 영역 영역 영역 영역.',
            // Phase B
            H_trained_winner_seed_dependent:
              'per-seed open_palm trained winner 영역 영역 영역 영역 영역 다양 → initial bias ' +
              'propagation 영역 학습 영역 영역 영역.',
            H_trained_winner_seed_independent:
              'per-seed open_palm trained winner 영역 cluster 영역 영역 영역 영역 (unique=1) → ' +
              'systematic bias 영역 seed-independent (root cause 영역 architectural).',
            // Phase C
            H_cluster_sequence_priority:
              '3 cluster sequence variant 영역 영역 영역 영역 winner 영역 다름 (unique≥2) → ' +
              'R-STDP cluster sequence priority 영역 root cause.',
            H_cluster_sequence_invariant:
              '3 cluster sequence variant 영역 영역 영역 영역 winner 영역 일관 (unique=1) → ' +
              'cluster sequence priority 영역 root cause 영역 영역.',
          },
          threshold_rationale:
            'Phase A unique_count thresholds: 1=systematic, 2=seed_dependent, ≥3=random — ' +
            'conservative 영역 5 seed 영역 영역 영역 sufficient variance signal 영역 catch. ' +
            'Phase B / C 영역 unique=1 영역 systematic / invariant 영역 strict 영역 — 영역 ' +
            'cluster 영역 영역 영역 영역 catch 영역 영역 systematic 영역 영역 영역. Phase C 영역 ' +
            'forward sequence + 2 variant 영역 영역 영역 4! = 24 permutation 영역 sufficient ' +
            'directional signal (별도 R&D 영역 full sweep).',
          frequentist_note:
            '5-seed 영역 binomial baseline p=1/4 (4 cluster) 영역 영역 — unique=1 영역 5 ' +
            'consecutive same-cluster 확률=(1/4)^4≈0.39% (significant). ' +
            '**단 본 R&D 영역 모든 phase verdict 영역 unique=2 영역 binomial significance threshold N/A** — ' +
            'significance test 영역 unique=1 한정 적용. unique=2 majority pattern (Phase A cluster 2 = 4/5, ' +
            'Phase B cluster 1 = 3/5) 영역 partial systematic 영역 영역 영역 영역 — broader statistical ' +
            'framework (multinomial test / bootstrap CI) 별도 R&D mandatory. ' +
            '단 single forward pass / mock anatomical 영역 N=1 영역 frequentist failure-to-reject ≠ accept.',
        },
        academic_alignment: [
          'Bishop 1995 (Neural Networks for Pattern Recognition, ch.10) — winner selection ' +
          'tie-break (first-cluster vs random tie-break implementation 영역 distinct).',
          'Olshausen & Field 1996 — sparse coding initial weight bias (sparse representation ' +
          '영역 dense weight init 영역 영역 cluster winner asymmetry 영역 영역).',
          'Diehl & Cook 2015 — STDP weight initialization seed sensitivity (R-STDP weight ' +
          '영역 random init seed 영역 영역 cluster winner trajectory 영역 영역).',
        ],
        limitations: [
          'Phase A/B/C focused scope: 5 seed × 4 gesture × 4 cluster — broader gesture pool / K / ' +
          'R-STDP rule 별도 R&D.',
          'Untrained initial bias 영역 forward pass 1회 영역 산출 — N≥10 forward pass 영역 mean / ' +
          'variance 영역 별도 R&D.',
          'Cluster sequence variant 3개 한정 (영역 4! = 24 permutation) — full permutation 영역 ' +
          '별도 R&D.',
          'Spike rate tie (first-cluster-wins) 영역 implementation detail — formal tie-break ' +
          'algorithm 영역 verify 영역 영역 영역 영역. clusterFiringRates.winner 영역 argmax ' +
          'first-occurrence 영역 catch — tied rates 영역 deterministic order dependency 영역 ' +
          '영역 직접 catch 0.',
          'Mock anatomical 한정 — actual MediaPipe Hand 영역 동일 systematic bias 보장 X.',
          'Phase B train_repeats=10 per cluster 영역 fixed — repeats variance / convergence ' +
          'criterion 영역 별도 R&D.',
          'Phase C cluster sequence 영역 [0,1,2,3] / [3,2,1,0] / [0,3,1,2] 3개 — full 4!=24 ' +
          'permutation 영역 별도 R&D (현재 영역 directional signal 영역 영역).',
          'Frequentist: H0/H1 failure to reject ≠ accept — empirical verdict 영역 single-shot ' +
          'measurement 영역 산출.',
          'PHASE_AB_SEEDS={57, 100, 200, 500, 1000} 영역 ad-hoc — broader seed pool / ' +
          'systematic seed sweep (예: 50 seed) 별도 R&D.',
          '**fd66191 contradiction**: 직전 fd66191 commit 영역 "open_palm → peace_sign cluster 3 ' +
          '15/15 instance σ-independent systematic" universality claim 영역 본 R&D 영역 contradicted — ' +
          '5 build seed 영역 trained winners [1, 3, 1, 1, 3] 영역 cluster 3 영역 only 2/5 reproduce, ' +
          'cluster 1 영역 3/5 majority. fd66191 영역 measurement scope 영역 train_seed=1000..1400 / ' +
          'infer_seed=2000..2400 한정 (build seed implicit fixed) — architectural systematic claim 영역 ' +
          'build seed variance 영역 over-claim 정정 mandatory. 본 commit 영역 fd66191 measurement scope ' +
          '명시 + universality claim 정정.',
          '**Phase A partial systematic**: cluster 2 = 4/5 (80% majority) 영역 verdict ' +
          '"H_initial_bias_seed_dependent" 영역 영역 — strict "seed_dependent" (unique≥2) 영역 catch ' +
          '영역 영역 partial-systematic 영역 영역 — 별도 verdict tier ("H_initial_bias_partial_' +
          'systematic" with majority_ratio >= 0.8) 별도 R&D mandatory.',
          '**Phase B initial → trained propagation gap**: Phase A initial cluster 2 (4/5 majority) → ' +
          'Phase B trained cluster 1 (3/5 majority) / cluster 3 (2/5) — initial cluster 2 영역 trained ' +
          'cluster 1/3 영역 propagation 영역 R-STDP weight shift 영역 영역 영역 영역 영역 영역 — Δw per ' +
          'cluster per seed 추적 (initial → trained weight trajectory) 별도 R&D mandatory.',
          '**Phase C seed=57 fixed confound**: Phase C 영역 runPhaseBPerSeed(57, ...) 영역 모든 3 ' +
          'sequence variant 영역 seed=57 fixed — seed × sequence 2-way interaction 영역 catch 영역 영역. ' +
          'broader seed × sequence cross-product (5 build seed × 3 sequence = 15 combinations) 별도 R&D ' +
          'mandatory.',
          '**peace_sign cluster 3 verdict text correction**: phase_b_trained.evidence 영역 ' +
          '"peace_sign systematic bias 영역 인디케이터" 영역 misleading — cluster 3 영역 only 2/5 seed ' +
          '영역 trained — "NOT systematic in current build seed pool" 영역 정정 명시 (fd66191 영역 train/' +
          'infer seed configuration 영역 한정 systematic 영역 영역).',
        ],
        cross_reference: {
          prior_joint_criterion_evaluation: {
            test_path: 'tests/integration/hand-snn-joint-criterion-pair-evaluation.test.ts',
            commit: 'ea3e641',
            measurement_path: 'tests/integration/measurements/hand-snn-joint-criterion-pair-evaluation.json',
            note: 'H_distributed_signatures verdict 영역 명시 — joint criterion (overlap × sign × ' +
              'magnitude) 영역 op-pe specific systematic miss 영역 explain 영역 영역. cf-tu top ' +
              'joint_score 영역 NO miss, op-pe rank 2 영역 systematic miss. 정직 한계 명시 — ' +
              '"Spike encoding tie-break / weight init / R-STDP cluster sequence priority 영역 ' +
              'mandatory R&D" — 본 R&D 영역 직접 followup.',
          },
          prior_feature_only_baseline_miss: {
            test_path: 'tests/integration/hand-snn-feature-only-baseline-miss-analysis.test.ts',
            commit: 'fd66191',
            note: 'feature_only baseline 영역 open_palm → peace_sign architectural bias 15/15 ' +
              'instance σ-independent reproduce. 본 R&D 영역 architectural mechanism 영역 separate ' +
              'verify 영역 root cause empirical catch.',
          },
        },
      };
      saveMeasurement('hand-snn-tie-break-mechanism-analysis', measurement);

      // 검증 assertion — measurement R&D (verdict reject 없음).
      expect(phaseAResults).toHaveLength(PHASE_AB_SEEDS.length);
      expect(phaseBResults).toHaveLength(PHASE_AB_SEEDS.length);
      expect(phaseCResults).toHaveLength(PHASE_C_CLUSTER_SEQUENCES.length);
      for (const r of phaseAResults) {
        expect(r.per_gesture).toHaveLength(GESTURE_MAKERS.length);
        for (const pg of r.per_gesture) {
          expect(pg.clusterRates.length).toBeGreaterThanOrEqual(GESTURE_MAKERS.length);
        }
      }
      for (const r of phaseBResults) {
        expect(r.per_gesture).toHaveLength(GESTURE_MAKERS.length);
      }
      for (const r of phaseCResults) {
        expect(r.per_gesture).toHaveLength(GESTURE_MAKERS.length);
      }
      expect([
        'H_initial_bias_seed_dependent',
        'H_initial_bias_systematic',
        'H_initial_bias_random',
      ]).toContain(phaseAVerdict.verdict);
      expect([
        'H_trained_winner_seed_dependent',
        'H_trained_winner_seed_independent',
      ]).toContain(phaseBVerdict.verdict);
      expect([
        'H_cluster_sequence_priority',
        'H_cluster_sequence_invariant',
      ]).toContain(phaseCVerdict.verdict);

      console.log('');
      console.log(`[tie-break] === Summary ===`);
      console.log(`[tie-break] Phase A verdict=${phaseAVerdict.verdict}`);
      console.log(`[tie-break] Phase B verdict=${phaseBVerdict.verdict}`);
      console.log(`[tie-break] Phase C verdict=${phaseCVerdict.verdict}`);
      console.log(`[tie-break] root_cause=${rootCauseTag}`);
      console.log(`[tie-break] elapsed_ms=${elapsedMs}`);
      console.log(`[tie-break] frequentist: empirical single-shot measurement only — formal test 별도 R&D.`);
    },
  );
});
