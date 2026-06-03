// Phase 3.9 v7 — persistence reload simulation (2026-06-03).
//
// 자율 iteration: page reload 시점 cluster training features 가 localStorage
// 부터 복원되어 cosine sim 매칭이 즉시 동작하는지 검증.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  encodeHandToFeatureVector,
  type HandLandmark,
} from '@/lib/snn-runtime/hand-spike-encoder';

const POSES = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'] as const;
type Pose = typeof POSES[number];

function loadFixture(pose: Pose): HandLandmark[][] {
  const path = resolve(__dirname, 'fixtures', `hand-mediapipe-${pose}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks;
}

const mocks = vi.hoisted(() => {
  const mockClient = {
    expandCluster: vi.fn(async (p: { activeInputs: number[] }) => ({
      newClusterId: 0, totalClusters: 1, neuronsAdded: 96, synapsesAdded: 1200, activeInputs: p.activeInputs,
    })),
    triggerBackground: vi.fn(async () => null),
    reinforceBackground: vi.fn(async () => null),
    clusterPoolUsage: vi.fn(async () => ({ inputDim: 95, totalClaimedFeatures: 0, perCluster: [], overlapMatrix: [] })),
    on: vi.fn(() => () => undefined),
  };
  return {
    mockClient,
    mockSave: vi.fn(async () => 1),
    mockIncrementCount: vi.fn(),
    onBackendEvent: vi.fn(() => () => undefined),
    emitBackendEvent: vi.fn(),
  };
});

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
afterEach(() => {});

describe('Phase 3.9 v7 — persistence reload simulation', () => {
  it('★ Cluster training features 가 localStorage 에 저장되고 새 LiveSnn 에서 복원', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // 1. Train 4 clusters in first LiveSnn instance.
    const live1 = new LiveSnn();
    (live1 as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const live1Any = live1 as unknown as { _handClusterFeatures: Map<number, number[]> };

    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      live1Any._handClusterFeatures.set(i, feat.slice());
    }
    // Manually trigger save (production path: runAutoLearnLoop 의 saveHandClusterFeats).
    // We need to import saveHandClusterFeats helper, but it's not exported.
    // Workaround: simulate by writing directly to localStorage via the same key.
    const key = 'handface.live-snn.hand-cluster-feats.v1';
    const arr: Array<[number, number[]]> = [];
    for (const [id, feat] of live1Any._handClusterFeatures.entries()) arr.push([id, feat]);
    window.localStorage.setItem(key, JSON.stringify(arr));
    live1.dispose();

    // 2. Verify localStorage has the data.
    const raw = window.localStorage.getItem(key);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!) as Array<[number, number[]]>;
    expect(parsed).toHaveLength(4);
    console.log(`  localStorage saved ${parsed.length} cluster features`);

    // 3. Create new LiveSnn (simulating page reload).
    const live2 = new LiveSnn();
    const live2Any = live2 as unknown as { _handClusterFeatures: Map<number, number[]> };

    // 4. Verify new instance loaded the features.
    expect(live2Any._handClusterFeatures.size).toBe(4);
    console.log(`  new LiveSnn loaded ${live2Any._handClusterFeatures.size} cluster features ✓`);

    // 5. Verify features match.
    for (let i = 0; i < POSES.length; i += 1) {
      const original = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      const loaded = live2Any._handClusterFeatures.get(i);
      expect(loaded).toBeDefined();
      expect(loaded).toHaveLength(95);
      for (let j = 0; j < 95; j += 1) {
        expect(loaded![j]).toBeCloseTo(original[j], 5);
      }
    }
    console.log(`  all 4 cluster features match original ✓`);

    live2.dispose();
  });

  it('★ Cosine sim 매칭 — 복원 후 같은 자세 input 에 대해 winner 정확', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // Setup: pre-populate localStorage as if user had previously trained.
    const arr: Array<[number, number[]]> = [];
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][0]);
      arr.push([i, feat]);
    }
    window.localStorage.setItem('handface.live-snn.hand-cluster-feats.v1', JSON.stringify(arr));

    // Create LiveSnn (will auto-load from localStorage).
    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as {
      _handClusterFeatures: Map<number, number[]>;
      _handCosineWinner: Map<number, { clusterId: number; sim: number }>;
      _maybeRecordHandCosineWinner: (token: number, p: number[]) => void;
    };

    expect(liveAny._handClusterFeatures.size).toBe(4);

    // Inference: each pose's sample 1 → cosine winner correct.
    let correct = 0, total = 0;
    for (let i = 0; i < POSES.length; i += 1) {
      const feat = encodeHandToFeatureVector(fixtures[POSES[i]][1]);
      liveAny._maybeRecordHandCosineWinner(1000 + i, feat);
      const winner = liveAny._handCosineWinner.get(1000 + i);
      if (winner && winner.clusterId === i) correct += 1;
      total += 1;
      liveAny._handCosineWinner.clear();
    }
    console.log(`  reload + inference accuracy: ${correct}/${total} = ${total > 0 ? ((correct/total) * 100).toFixed(0) : 0}%`);
    expect(correct).toBeGreaterThanOrEqual(total - 1); // synthetic limit: 3-4 correct

    live.dispose();
  });

  it('★ resetTrigger 가 cluster features 도 wipe', () => {
    const fixtures: Record<Pose, HandLandmark[][]> = {} as Record<Pose, HandLandmark[][]>;
    for (const pose of POSES) fixtures[pose] = loadFixture(pose);

    // Setup with pre-loaded data.
    const arr: Array<[number, number[]]> = [];
    for (let i = 0; i < POSES.length; i += 1) {
      arr.push([i, encodeHandToFeatureVector(fixtures[POSES[i]][0])]);
    }
    window.localStorage.setItem('handface.live-snn.hand-cluster-feats.v1', JSON.stringify(arr));

    const live = new LiveSnn();
    (live as unknown as { substrateKind: string }).substrateKind = 'orientation-hand';
    const liveAny = live as unknown as { _handClusterFeatures: Map<number, number[]> };
    expect(liveAny._handClusterFeatures.size).toBe(4);

    // Reset.
    live.resetTrigger();

    // Verify cluster features cleared.
    expect(liveAny._handClusterFeatures.size).toBe(0);
    const raw = window.localStorage.getItem('handface.live-snn.hand-cluster-feats.v1');
    expect(raw).toBeNull();
    console.log(`  resetTrigger cleared cluster features ✓`);

    live.dispose();
  });
});
