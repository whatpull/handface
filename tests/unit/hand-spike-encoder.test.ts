// Hand Spike Encoder 단위 테스트.
// SNN 중심 + 미래 LLM 연동 ready Phase 1.2 검증.

import { describe, it, expect } from 'vitest';
import {
  flattenLandmarks, computeHandFeatures,
  encodeHandToFeatureVector, encodeFeatureToSpikes, encodeFeatureToTemporalSpikes,
  N_HAND_LANDMARKS, HAND_RAW_DIM, HAND_FEAT_DIM, FINGER_TIPS, FINGER_MCPS,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

// 가상 hand: open palm (fingers extended) at center.
function makeOpenPalm(): HandLandmark[] {
  const landmarks: HandLandmark[] = [];
  // Wrist at (0.5, 0.9, 0).
  landmarks.push({ x: 0.5, y: 0.9, z: 0 });
  // Thumb (4 points from CMC to TIP).
  for (let i = 0; i < 4; i += 1) landmarks.push({ x: 0.3 + i * 0.05, y: 0.7 - i * 0.05, z: 0.05 });
  // Index (4).
  for (let i = 0; i < 4; i += 1) landmarks.push({ x: 0.4, y: 0.7 - i * 0.1, z: 0 });
  // Middle (4).
  for (let i = 0; i < 4; i += 1) landmarks.push({ x: 0.5, y: 0.7 - i * 0.1, z: 0 });
  // Ring (4).
  for (let i = 0; i < 4; i += 1) landmarks.push({ x: 0.6, y: 0.7 - i * 0.1, z: 0 });
  // Pinky (4).
  for (let i = 0; i < 4; i += 1) landmarks.push({ x: 0.7, y: 0.7 - i * 0.08, z: 0 });
  return landmarks;
}

// Closed fist — fingers curled.
function makeClosedFist(): HandLandmark[] {
  const landmarks: HandLandmark[] = [];
  landmarks.push({ x: 0.5, y: 0.9, z: 0 });
  for (let f = 0; f < 5; f += 1) {
    // Each finger: 4 points all near MCP (curled).
    const baseX = 0.4 + f * 0.05;
    for (let i = 0; i < 4; i += 1) {
      landmarks.push({ x: baseX, y: 0.7 + i * 0.02, z: 0.1 }); // close to MCP
    }
  }
  return landmarks;
}

describe('Hand Spike Encoder — Landmark Flattening', () => {
  it('21 landmarks → 63-dim flat array', () => {
    const lm = makeOpenPalm();
    const flat = flattenLandmarks(lm);
    expect(flat).toHaveLength(HAND_RAW_DIM);
    expect(flat[0]).toBe(lm[0].x);
    expect(flat[1]).toBe(lm[0].y);
    expect(flat[2]).toBe(lm[0].z);
  });

  it('wrong landmark count → throws', () => {
    expect(() => flattenLandmarks([{ x: 0, y: 0, z: 0 }])).toThrow();
  });

  it('constants 정합', () => {
    expect(N_HAND_LANDMARKS).toBe(21);
    expect(HAND_RAW_DIM).toBe(63);
    expect(HAND_FEAT_DIM).toBe(75);
    expect(FINGER_TIPS.thumb).toBe(4);
    expect(FINGER_TIPS.pinky).toBe(20);
    expect(FINGER_MCPS.middle).toBe(9);
  });
});

describe('Hand Spike Encoder — Derived Features', () => {
  it('open palm → 영역 finger extensions', () => {
    const lm = makeOpenPalm();
    const features = computeHandFeatures(lm);
    expect(features.fingerExtensions).toHaveLength(5);
    expect(features.fingerBendAngles).toHaveLength(5);
    // open palm — 영역 fingers extended (영역 finger extension).
    for (const ext of features.fingerExtensions) {
      expect(ext).toBeGreaterThan(0);
    }
  });

  it('closed fist → 영역 finger extensions', () => {
    const lm = makeClosedFist();
    const features = computeHandFeatures(lm);
    // closed fist → 영역 finger extension (영역 tip 영역 MCP 영역 영역).
    const avgExt = features.fingerExtensions.reduce((a, b) => a + b, 0) / 5;
    expect(avgExt).toBeLessThan(0.5);
  });

  it('palm center 영역 normalized [0, 1]', () => {
    const lm = makeOpenPalm();
    const features = computeHandFeatures(lm);
    expect(features.palmCenterX).toBeGreaterThanOrEqual(0);
    expect(features.palmCenterX).toBeLessThanOrEqual(1);
    expect(features.palmCenterY).toBeGreaterThanOrEqual(0);
    expect(features.palmCenterY).toBeLessThanOrEqual(1);
  });

  it('hand orientation normalized [0, 1]', () => {
    const lm = makeOpenPalm();
    const features = computeHandFeatures(lm);
    expect(features.handOrientationAngle).toBeGreaterThanOrEqual(0);
    expect(features.handOrientationAngle).toBeLessThanOrEqual(1);
  });
});

describe('Hand Spike Encoder — Feature Vector', () => {
  it('full feature vector 영역 75 dim', () => {
    const lm = makeOpenPalm();
    const fv = encodeHandToFeatureVector(lm);
    expect(fv).toHaveLength(HAND_FEAT_DIM);
  });

  it('open vs closed → 영역 다른 feature vectors', () => {
    const open = encodeHandToFeatureVector(makeOpenPalm());
    const closed = encodeHandToFeatureVector(makeClosedFist());
    // finger extension features 영역 영역 영역.
    let diff = 0;
    for (let i = 63; i < 68; i += 1) diff += Math.abs(open[i] - closed[i]);
    expect(diff).toBeGreaterThan(0.1);
  });
});

describe('Hand Spike Encoder — Rate Encoding (Adrian 1926)', () => {
  it('above threshold → spike events', () => {
    const fv = [0.1, 0.5, 0.2, 0.8, 0.05];
    const events = encodeFeatureToSpikes(fv, 0.3, 30, 80, 0.1, 0);
    expect(events).toHaveLength(2); // 0.5 and 0.8 above threshold
    expect(events[0].neuron).toBe('in_feat_1');
    expect(events[1].neuron).toBe('in_feat_3');
  });

  it('weight scales with intensity', () => {
    const fv = [0.5, 1.0];
    const events = encodeFeatureToSpikes(fv, 0.3, 30, 80, 0.1, 0);
    expect(events[0].weight).toBeCloseTo(15, 5); // 0.5 × 30
    expect(events[1].weight).toBeCloseTo(30, 5); // 1.0 × 30
  });

  it('below threshold → no events', () => {
    expect(encodeFeatureToSpikes([0.1, 0.2], 0.3).length).toBe(0);
  });

  it('startTime offset 영역', () => {
    const events = encodeFeatureToSpikes([0.8], 0.3, 30, 80, 0.1, 100);
    expect(events[0].time).toBe(100);
  });
});

describe('Hand Spike Encoder — Temporal Encoding (Thorpe 1990)', () => {
  it('high intensity → earliest spike', () => {
    const fv = [0.5, 1.0, 0.7];
    const events = encodeFeatureToTemporalSpikes(fv, 0.3, 30, 50, 10, 0.1);
    // 1.0 intensity → latency 0, 0.7 → 15, 0.5 → 25.
    expect(events[0].neuron).toBe('in_feat_0');
    expect(events[1].neuron).toBe('in_feat_1');
    // The 1.0 intensity has time 0.
    const intensity1event = events.find(e => e.neuron === 'in_feat_1');
    expect(intensity1event?.time).toBe(0);
    const intensity05event = events.find(e => e.neuron === 'in_feat_0');
    expect(intensity05event?.time).toBe(25); // (1-0.5) × 50
  });

  it('all below threshold → no events', () => {
    expect(encodeFeatureToTemporalSpikes([0.1, 0.2], 0.3).length).toBe(0);
  });
});

describe('Hand Spike Encoder — 통합 시나리오: gesture encoding', () => {
  it('open vs closed gesture → 영역 다른 spike pattern', () => {
    const openFv = encodeHandToFeatureVector(makeOpenPalm());
    const closedFv = encodeHandToFeatureVector(makeClosedFist());

    const openSpikes = encodeFeatureToSpikes(openFv, 0.3, 30, 80, 0.1, 0);
    const closedSpikes = encodeFeatureToSpikes(closedFv, 0.3, 30, 80, 0.1, 0);

    // Different gestures → different spike patterns.
    const openNeurons = new Set(openSpikes.map(s => s.neuron));
    const closedNeurons = new Set(closedSpikes.map(s => s.neuron));
    // 일부 overlap 영역 영역 영역 (영역 영역 영역 영역), 단 영역 다른 부분 영역 있어야.
    let overlap = 0;
    for (const n of openNeurons) if (closedNeurons.has(n)) overlap += 1;
    const total = new Set([...openNeurons, ...closedNeurons]).size;
    const jaccardSim = total > 0 ? overlap / total : 0;
    expect(jaccardSim).toBeLessThan(1.0); // 영역 영역 different
  });
});
