// Phase 3.9 v11 — cluster scaling stress test.
// 자율 iteration: v11 cosine sim 이 8+ gesture 에서 scaling 동작 확인.

import { describe, expect, it, beforeEach, vi } from 'vitest';
import {
  encodeHandToFeatureVector,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

// 8 synthetic distinct gestures.
function genHandPose(seed: number): HandLandmark[] {
  // Deterministic PRNG.
  let s = seed | 0;
  const rand = (): number => {
    s = (s + 0x6D2B79F5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const lm: HandLandmark[] = [{ x: 0.5, y: 0.9, z: 0 }];
  // 5 fingers × 4 joints = 20 landmarks.
  for (let f = 0; f < 5; f += 1) {
    const baseAngle = -Math.PI / 2 + (f - 2) * 0.2;
    const curl = rand() * 0.8; // 0..0.8 finger curl per pose
    const length = 0.15 + f * 0.02;
    let curX = 0.5 + (f - 2) * 0.04;
    let curY = 0.75;
    let curAngle = baseAngle;
    for (let j = 0; j < 4; j += 1) {
      curAngle += curl * 0.3;
      curX += Math.cos(curAngle) * (length / 4);
      curY += Math.sin(curAngle) * (length / 4);
      lm.push({ x: curX, y: curY, z: rand() * 0.05 });
    }
  }
  return lm;
}

const mocks = vi.hoisted(() => ({
  mockClient: {
    expandCluster: vi.fn(async (p: { activeInputs: number[] }) => ({ newClusterId: 0, totalClusters: 1, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs })),
    triggerBackground: vi.fn(async () => null),
    reinforceBackground: vi.fn(async () => null),
    clusterPoolUsage: vi.fn(async () => ({ inputDim: 95, totalClaimedFeatures: 0, perCluster: [], overlapMatrix: [] })),
    on: vi.fn(() => () => undefined),
  },
  mockSave: vi.fn(async () => 1),
  mockIncrementCount: vi.fn(),
  onBackendEvent: vi.fn(() => () => undefined),
  emitBackendEvent: vi.fn(),
}));

vi.mock('@/lib/snn/root-local-snn', () => ({
  getRootLocalSnnFor: vi.fn(async () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: mocks.mockClient as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lab: { save: mocks.mockSave } as any,
    status: { netId: 'test', rev: 0, neurons: 0, synapses: 0, lastSavedAt: null },
    kind: 'orientation-hand' as const,
  })),
  purgeAllLearningData: vi.fn(async () => {}),
}));
vi.mock('@/lib/snn/out-exemplars', () => ({
  incrementCount: mocks.mockIncrementCount,
  loadExemplars: vi.fn().mockReturnValue({}),
}));
vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: mocks.emitBackendEvent,
  onBackendEvent: mocks.onBackendEvent,
}));

import { LiveSnn } from '@/lib/snn/live-snn';

beforeEach(() => {
  if (typeof window !== 'undefined') window.localStorage.clear();
  vi.clearAllMocks();
});

describe('Phase 3.9 v11 — cluster scaling stress test', () => {
  it('★ 8 distinct synthetic gestures — cosine matching scaling', () => {
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handCosineWinner: Map<number, { clusterId: number; sim: number }>;
      _maybeRecordHandCosineWinner: (token: number, p: number[]) => void;
    };

    const NUM_GESTURES = 8;
    const gestures: HandLandmark[][] = [];
    for (let i = 0; i < NUM_GESTURES; i += 1) {
      gestures.push(genHandPose(1000 + i * 137));
    }

    // Train: store first feature for each gesture.
    for (let i = 0; i < NUM_GESTURES; i += 1) {
      const feat = encodeHandToFeatureVector(gestures[i]);
      liveAny._handClusterFeatures.set(i, feat.slice());
    }

    console.log('');
    console.log(`=== ${NUM_GESTURES} gesture scaling test ===`);
    console.log('');

    // Inference: each gesture self-match.
    let correct = 0, total = 0;
    for (let i = 0; i < NUM_GESTURES; i += 1) {
      const feat = encodeHandToFeatureVector(gestures[i]);
      liveAny._maybeRecordHandCosineWinner(2000 + i, feat);
      const winner = liveAny._handCosineWinner.get(2000 + i);
      const matched = winner !== undefined && winner.clusterId === i;
      if (matched) correct += 1;
      total += 1;
      const cosStr = winner ? `cos=${winner.sim.toFixed(4)}` : 'no match';
      console.log(`  gesture ${i}: winner=${winner?.clusterId ?? 'none'} ${cosStr} ${matched ? '✓' : '✗ exp '+i}`);
      liveAny._handCosineWinner.clear();
    }

    console.log('');
    console.log(`  inference accuracy: ${correct}/${total} = ${(correct/total*100).toFixed(0)}%`);
    console.log('');

    // Memory check: 8 cluster features at 95-dim × 8 bytes = ~6KB. Trivial.
    expect(liveAny._handClusterFeatures.size).toBe(NUM_GESTURES);
    expect(correct).toBeGreaterThanOrEqual(total - 2); // tolerate 2 mismatches in synthetic
    live.dispose();
  });

  it('★ Performance: cosine sim with N clusters - throughput measure', () => {
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handCosineWinner: Map<number, { clusterId: number; sim: number }>;
      _maybeRecordHandCosineWinner: (token: number, p: number[]) => void;
    };

    const NUM_CLUSTERS = 16;
    for (let i = 0; i < NUM_CLUSTERS; i += 1) {
      const feat = encodeHandToFeatureVector(genHandPose(5000 + i));
      liveAny._handClusterFeatures.set(i, feat);
    }

    const testFeat = encodeHandToFeatureVector(genHandPose(9999));

    // Warmup.
    for (let i = 0; i < 100; i += 1) {
      liveAny._maybeRecordHandCosineWinner(100 + i, testFeat);
      liveAny._handCosineWinner.clear();
    }

    // Benchmark.
    const ITERS = 10000;
    const start = performance.now();
    for (let i = 0; i < ITERS; i += 1) {
      liveAny._maybeRecordHandCosineWinner(10000 + i, testFeat);
      liveAny._handCosineWinner.clear();
    }
    const elapsed = performance.now() - start;
    const perCall = elapsed / ITERS;

    console.log('');
    console.log(`=== Performance — ${NUM_CLUSTERS} clusters, ${ITERS} cosine sim calls ===`);
    console.log(`  total: ${elapsed.toFixed(1)}ms, per-call: ${perCall.toFixed(3)}ms`);
    console.log(`  estimated 30fps headroom: ${(1000/30/perCall).toFixed(0)}x`);
    console.log('');

    expect(perCall).toBeLessThan(1); // < 1ms per call
    live.dispose();
  });
});
