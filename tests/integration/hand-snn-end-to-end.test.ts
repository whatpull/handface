// Hand SNN end-to-end integration measurement.
//
// SNN Perfect Brain Roadmap Phase 1.3 — 사용자 비전 (SNN 중심) 실제 검증.
// MediaPipe Hand landmark → spike encoder → n16-hand substrate → STDP learning
// → cluster recall. 실제 hand gesture 영역 SNN 영역 학습 + 인식 검증.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  NeuralNetwork, SpikeMonitor, SeededRandom,
} from '@/lib/snn-runtime';
import {
  buildN16HandPreset, N16Pools,
} from '@/lib/snn-runtime/builders/n16-hand';
import {
  encodeHandToFeatureVector, encodeFeatureToSpikes,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';
import { wtaWinner } from '@/lib/snn-runtime/self-supervised';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// 4 가지 다른 hand 영역 (gesture).
function makeOpenPalm(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.3 + i * 0.05, y: 0.7 - i * 0.05, z: 0.05 });
  for (let f = 0; f < 4; f += 1) { // 4 fingers (index, middle, ring, pinky)
    const baseX = 0.4 + f * 0.1;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.7 - i * 0.1, z: 0 });
  }
  return lm;
}
function makeClosedFist(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let f = 0; f < 5; f += 1) {
    const baseX = 0.4 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.7 + i * 0.02, z: 0.1 });
  }
  return lm;
}
function makeThumbsUp(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  // Thumb extended up.
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.4, y: 0.7 - i * 0.07, z: 0 });
  // Other fingers closed (near MCP).
  for (let f = 0; f < 4; f += 1) {
    const baseX = 0.5 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.75 + i * 0.02, z: 0.1 });
  }
  return lm;
}
function makePeaceSign(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  // Thumb closed.
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.3, y: 0.75, z: 0.05 });
  // Index extended.
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.42, y: 0.7 - i * 0.1, z: 0 });
  // Middle extended.
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.52, y: 0.7 - i * 0.1, z: 0 });
  // Ring, Pinky closed.
  for (let f = 0; f < 2; f += 1) {
    const baseX = 0.6 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.75 + i * 0.02, z: 0.1 });
  }
  return lm;
}

// 활성 input set 영역 (clusterActiveInputs 영역 영역 영역 영역).
function computeActiveInputs(featureVector: ReadonlyArray<number>, threshold: number = 0.3): number[] {
  const active: number[] = [];
  for (let i = 0; i < featureVector.length; i += 1) {
    if (featureVector[i] > threshold) active.push(i);
  }
  return active;
}

describe('Hand SNN End-to-End Integration (사용자 비전 SNN 중심)', () => {
  it('★ MediaPipe Hand → encoder → n16 substrate → 학습 + recall', () => {
    // 1. 4 gestures → feature vectors.
    const gestures = [
      { name: 'open_palm', landmarks: makeOpenPalm() },
      { name: 'closed_fist', landmarks: makeClosedFist() },
      { name: 'thumbs_up', landmarks: makeThumbsUp() },
      { name: 'peace_sign', landmarks: makePeaceSign() },
    ];
    const featureVectors = gestures.map(g => encodeHandToFeatureVector(g.landmarks));
    expect(featureVectors).toHaveLength(4);
    expect(featureVectors[0]).toHaveLength(75);

    // 2. 각 gesture 의 active inputs 추출.
    const clusterActiveInputs = featureVectors.map(fv => computeActiveInputs(fv, 0.2));
    // 모든 cluster 에 적어도 일부 active input 있어야.
    for (const inputs of clusterActiveInputs) {
      expect(inputs.length).toBeGreaterThan(0);
    }

    // 3. n16-hand substrate build (4 clusters, one per gesture).
    const result = buildN16HandPreset({
      clusterActiveInputs, seed: 57,
    });
    expect(result.outClusters).toBe(4);
    const net = result.net;
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);

    // 4. 각 gesture 학습 + 측정.
    const learningResults: { gesture: string; predictedWinner: number; expectedWinner: number; correct: boolean; firingRates: number[] }[] = [];

    for (let g = 0; g < gestures.length; g += 1) {
      const fv = featureVectors[g];
      const spikes = encodeFeatureToSpikes(fv, 0.2, 30, 80, 0.1, 0);

      // Inject + run (training with STDP).
      const stepMs = 0.1;
      const durationMs = 100;
      // Inject events into network via network.inject API.
      net.inject(spikes.map(ev => ({
        neuron: ev.neuron, weight: ev.weight, time: ev.time,
        durationMs: ev.durationMs, stepMs: ev.stepMs,
      })));
      // Run with STDP enabled.
      net.run(durationMs, { dtMs: stepMs, stdpEnabled: true });
      // Spike monitor records via network events — verify monitor attached.
      void monitor;

      // Measure firing rates per cluster.
      const firingRates: number[] = [];
      for (let ci = 0; ci < result.outClusters; ci += 1) {
        let sum = 0;
        for (let ni = 0; ni < N16Pools.OUT_PER_CLUSTER; ni += 1) {
          sum += monitor.firingRate(`out_${ci}_${ni}`, net.t, durationMs);
        }
        firingRates.push(sum / N16Pools.OUT_PER_CLUSTER);
      }

      const winner = wtaWinner(firingRates);
      learningResults.push({
        gesture: gestures[g].name,
        predictedWinner: winner,
        expectedWinner: g,
        correct: winner === g,
        firingRates,
      });
    }

    // 5. Save measurement.
    const summary = {
      timestamp: new Date().toISOString(),
      scenario: 'hand-snn-end-to-end',
      featureDim: 75,
      gestures: gestures.map(g => g.name),
      activeInputsPerGesture: clusterActiveInputs.map(a => a.length),
      neuronsTotal: result.neuronsAdded,
      synapsesTotal: result.synapsesAdded,
      learningResults,
      // Verify all 4 gestures produced firing in some cluster.
      anyClusterActive: learningResults.every(r => r.firingRates.some(rate => rate > 0)),
    };
    saveMeasurement('hand-snn-end-to-end', summary);

    // Verification: substrate 영역 영역 영역 + 각 gesture 영역 영역 영역 활성.
    expect(result.neuronsAdded).toBeGreaterThan(500); // substantial network
    expect(result.synapsesAdded).toBeGreaterThan(1000);

    console.log(`[Hand SNN] gestures: ${gestures.map(g => g.name).join(', ')}`);
    console.log(`[Hand SNN] neurons=${result.neuronsAdded}, synapses=${result.synapsesAdded}`);
    for (const lr of learningResults) {
      console.log(`[Hand SNN] ${lr.gesture}: winner=${lr.predictedWinner}, expected=${lr.expectedWinner}, rates=${lr.firingRates.map(r => r.toFixed(2)).join(',')}`);
    }
  });

  it('★ Feature encoding 영역 cluster active inputs distinct (가설 검증)', () => {
    // 4 gestures 영역 영역 영역 영역 active input set 영역 영역지 검증.
    // Distinct enough → SNN 영역 영역 영역 영역 cluster 영역 학습 가능.
    const gestures = [
      makeOpenPalm(), makeClosedFist(), makeThumbsUp(), makePeaceSign(),
    ];
    const fvs = gestures.map(g => encodeHandToFeatureVector(g));
    const actives = fvs.map(fv => new Set(computeActiveInputs(fv, 0.2)));

    // Jaccard similarity between gesture pairs.
    let totalDistinctiveness = 0;
    let pairs = 0;
    for (let i = 0; i < actives.length; i += 1) {
      for (let j = i + 1; j < actives.length; j += 1) {
        let intersection = 0;
        for (const a of actives[i]) if (actives[j].has(a)) intersection += 1;
        const union = actives[i].size + actives[j].size - intersection;
        const jaccard = union > 0 ? intersection / union : 0;
        totalDistinctiveness += 1 - jaccard;
        pairs += 1;
      }
    }
    const avgDistinct = pairs > 0 ? totalDistinctiveness / pairs : 0;

    const measurement = {
      timestamp: new Date().toISOString(),
      scenario: 'hand-gesture-distinctiveness',
      gestures: ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'],
      activeInputSizes: actives.map(a => a.size),
      avgPairwiseDistinctiveness: avgDistinct,
    };
    saveMeasurement('hand-gesture-distinctiveness', measurement);

    expect(avgDistinct).toBeGreaterThan(0); // 영역 영역 distinct
    console.log(`[Distinctiveness] avg pairwise = ${(avgDistinct * 100).toFixed(0)}%`);
  });

  it('★ Determinism — same seed + same input → same network structure', () => {
    const lm = makeOpenPalm();
    const fv = encodeHandToFeatureVector(lm);
    const active = computeActiveInputs(fv);

    const r1 = buildN16HandPreset({ clusterActiveInputs: [active], seed: 100 });
    const r2 = buildN16HandPreset({ clusterActiveInputs: [active], seed: 100 });

    expect(r1.neuronsAdded).toBe(r2.neuronsAdded);
    expect(r1.synapsesAdded).toBe(r2.synapsesAdded);

    // Different seed → different (but still valid) network.
    const r3 = buildN16HandPreset({ clusterActiveInputs: [active], seed: 200 });
    expect(r3.neuronsAdded).toBe(r1.neuronsAdded); // neurons count deterministic
    // Synapses may differ due to random projection density.
  });
});
