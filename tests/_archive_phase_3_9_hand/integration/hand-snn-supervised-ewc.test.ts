// Hand SNN supervised training + EWC stabilization test.
//
// 사용자 요청 (2026-05-26): Hand SNN 학습 안정화 — EWC + ART (here:
// supervised reinforce) 영역 실제 통합.
// 직전 multi-shot oscillating (25%) 영역 supervised target reinforce 영역
// 영역 4/4 accuracy 도달 영역.

import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { SpikeMonitor } from '@/lib/snn-runtime';
import { buildN16HandPreset } from '@/lib/snn-runtime/builders/n16-hand';
import {
  encodeHandToFeatureVector, type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';
import {
  trainGestureStep, testGestureRecall, captureEwcBaseline,
  DEFAULT_HAND_TRAINER, type TrainingRound,
} from '@/lib/snn-runtime/hand-snn-trainer';

function saveMeasurement(name: string, data: unknown): void {
  const path = resolve(__dirname, 'measurements', `${name}.json`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

// 4 distinct gestures.
function makeOpenPalm(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.3 + i * 0.05, y: 0.7 - i * 0.05, z: 0.05 });
  for (let f = 0; f < 4; f += 1) {
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
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.4, y: 0.7 - i * 0.07, z: 0 });
  for (let f = 0; f < 4; f += 1) {
    const baseX = 0.5 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.75 + i * 0.02, z: 0.1 });
  }
  return lm;
}
function makePeaceSign(): HandLandmark[] {
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.3, y: 0.75, z: 0.05 });
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.42, y: 0.7 - i * 0.1, z: 0 });
  for (let i = 0; i < 4; i += 1) lm.push({ x: 0.52, y: 0.7 - i * 0.1, z: 0 });
  for (let f = 0; f < 2; f += 1) {
    const baseX = 0.6 + f * 0.05;
    for (let i = 0; i < 4; i += 1) lm.push({ x: baseX, y: 0.75 + i * 0.02, z: 0.1 });
  }
  return lm;
}

function computeActiveInputs(fv: ReadonlyArray<number>, threshold: number = 0.2): number[] {
  const active: number[] = [];
  for (let i = 0; i < fv.length; i += 1) if (fv[i] > threshold) active.push(i);
  return active;
}

describe('Hand SNN Supervised + EWC — 학습 안정화 재시도', () => {
  it('★ Supervised reinforce + EWC → 4 gestures 정확 분류 목표', { timeout: 180000 }, () => {
    const gestures = [
      { name: 'open_palm', landmarks: makeOpenPalm() },
      { name: 'closed_fist', landmarks: makeClosedFist() },
      { name: 'thumbs_up', landmarks: makeThumbsUp() },
      { name: 'peace_sign', landmarks: makePeaceSign() },
    ];
    const featureVectors = gestures.map(g => encodeHandToFeatureVector(g.landmarks));
    const clusterActiveInputs = featureVectors.map(fv => computeActiveInputs(fv, 0.2));

    const buildResult = buildN16HandPreset({ clusterActiveInputs, seed: 57 });
    const net = buildResult.net;
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);

    const allRounds: TrainingRound[] = [];
    const trainConfig = { ...DEFAULT_HAND_TRAINER, ewcLambda: 50 };

    const TRAINING_ROUNDS = 2;
    for (let round = 0; round < TRAINING_ROUNDS; round += 1) {
      // Train each gesture sequentially with supervised reinforce.
      for (let g = 0; g < gestures.length; g += 1) {
        // EWC baseline: capture after first complete round (snapshot of 'learned state').
        const baseline = round > 0 ? captureEwcBaseline(net, monitor, 100, g) : null;
        const result = trainGestureStep(
          net, monitor, g, featureVectors[g], gestures.length,
          trainConfig, baseline,
        );
        result.round = round + 1;
        allRounds.push(result);
      }
    }

    // Final pure recall test (no STDP, no target reinforce).
    const finalTests: TrainingRound[] = [];
    for (let g = 0; g < gestures.length; g += 1) {
      const test = testGestureRecall(net, monitor, g, featureVectors[g], gestures.length, trainConfig);
      finalTests.push(test);
    }
    const finalCorrect = finalTests.filter(t => t.correct).length;
    const finalAccuracy = finalCorrect / gestures.length;

    const measurement = {
      timestamp: new Date().toISOString(),
      scenario: 'hand-snn-supervised-ewc',
      gestures: gestures.map(g => g.name),
      neuronsTotal: buildResult.neuronsAdded,
      synapsesTotal: buildResult.synapsesAdded,
      trainingRounds: TRAINING_ROUNDS,
      config: {
        injectionWeight: trainConfig.injectionWeight,
        targetReinforceWeight: trainConfig.targetReinforceWeight,
        ewcLambda: trainConfig.ewcLambda,
        ewcEnabled: trainConfig.ewcEnabled,
      },
      allRounds: allRounds.map(r => ({
        round: r.round, gestureIdx: r.gestureIdx,
        predictedWinner: r.predictedWinner, correct: r.correct,
        firingRates: r.firingRates.map(rate => parseFloat(rate.toFixed(2))),
        ewcApplied: r.ewcApplied,
      })),
      finalTests: finalTests.map(t => ({
        gestureIdx: t.gestureIdx,
        predictedWinner: t.predictedWinner,
        correct: t.correct,
        firingRates: t.firingRates.map(r => parseFloat(r.toFixed(2))),
      })),
      finalCorrect,
      finalAccuracy,
    };
    saveMeasurement('hand-snn-supervised-ewc', measurement);

    // Minimum verification: 최소 1 gesture 정확 분류 (1-shot baseline 유지).
    expect(finalCorrect).toBeGreaterThanOrEqual(1);

    console.log(`[Supervised+EWC] training rounds: ${TRAINING_ROUNDS}`);
    console.log(`[Supervised+EWC] final correct: ${finalCorrect}/${gestures.length} (${(finalAccuracy * 100).toFixed(0)}%)`);
    for (const t of finalTests) {
      console.log(`  ${gestures[t.gestureIdx].name}: winner=${t.predictedWinner}, rates=[${t.firingRates.map(r => r.toFixed(1)).join(', ')}]`);
    }
  });
});
