// buildStatePayload — phase / cluster / winner / margin schema 정합 영역 검증.
//
// 정직 한계 박음:
//  - winnerLabel 영역 OUT exemplar (localStorage) 우선, fallback CLUSTER_TO_LABEL 영역.
//  - timestamp 영역 영역 시점 영역 영역 영역 — Date.now() 영역 ±1000ms 정합 영역.

import { describe, it, expect, beforeEach } from 'vitest';
import {
  buildStatePayload,
  type StatePayloadInputs,
  type Phase,
} from '@/lib/snn/state-payload';

const baseInputs: StatePayloadInputs = {
  phase: 'inference',
  winnerCluster: 1,
  confidence: 0.7,
  margin: 0.3,
  clusterRates: [10, 50, 5, 5],
  clusterCounts: [30, 30, 30, 30],
  history: [],
  gestureName: 'Open_Palm',
  gestureScore: 0.9,
};

beforeEach(() => {
  if (typeof localStorage !== 'undefined') localStorage.clear();
});

describe('buildStatePayload — schema invariants', () => {
  it('produces all top-level fields', () => {
    const p = buildStatePayload(baseInputs);
    expect(p).toMatchObject({
      phase: 'inference',
      winner: 'cluster_1',
      confidence: 0.7,
      margin: 0.3,
      gestureName: 'Open_Palm',
      gestureScore: 0.9,
    });
    expect(p.winnerLabel).toBe('Open palm');  // CLUSTER_TO_LABEL[1]
    expect(p.timestamp).toBeGreaterThan(0);
    expect(p.timestamp).toBeLessThanOrEqual(Date.now() + 100);
  });

  it('null winnerCluster → winner / winnerLabel both null', () => {
    const p = buildStatePayload({ ...baseInputs, winnerCluster: null });
    expect(p.winner).toBeNull();
    expect(p.winnerLabel).toBeNull();
  });

  it('clamps confidence to [0, 1]', () => {
    expect(buildStatePayload({ ...baseInputs, confidence: 1.5 }).confidence).toBe(1);
    expect(buildStatePayload({ ...baseInputs, confidence: -0.2 }).confidence).toBe(0);
    expect(buildStatePayload({ ...baseInputs, confidence: NaN }).confidence).toBe(0);
  });

  it('clamps margin to [0, 1]', () => {
    expect(buildStatePayload({ ...baseInputs, margin: 10 }).margin).toBe(1);
    expect(buildStatePayload({ ...baseInputs, margin: -1 }).margin).toBe(0);
    expect(buildStatePayload({ ...baseInputs, margin: Infinity }).margin).toBe(0);
  });

  it('clamps gestureScore to [0, 1]', () => {
    expect(buildStatePayload({ ...baseInputs, gestureScore: 1.5 }).gestureScore).toBe(1);
    expect(buildStatePayload({ ...baseInputs, gestureScore: -1 }).gestureScore).toBe(0);
  });

  it('truncates history to last 32 entries', () => {
    const longHistory = Array.from({ length: 100 }, (_, i) => ({
      winner: `cluster_${i % 4}`,
      label: null,
      confidence: 0.5,
      ts: i,
    }));
    const p = buildStatePayload({ ...baseInputs, history: longHistory });
    expect(p.history).toHaveLength(32);
    // 영역 32 영역 영역 (영역 영역 영역) 정합.
    expect(p.history[0]?.ts).toBe(68);   // 100 - 32
    expect(p.history[31]?.ts).toBe(99);
  });

  it('slices clusterRates / clusterCounts to length 4', () => {
    const p = buildStatePayload({
      ...baseInputs,
      clusterRates: [1, 2, 3, 4, 5, 6],
      clusterCounts: [10, 20, 30, 40, 50],
    });
    expect(p.clusterRates).toEqual([1, 2, 3, 4]);
    expect(p.clusterCounts).toEqual([10, 20, 30, 40]);
  });

  it('all phase variants accepted', () => {
    const phases: Phase[] = ['untrained', 'learning', 'partial', 'trained', 'inference'];
    for (const ph of phases) {
      const p = buildStatePayload({ ...baseInputs, phase: ph });
      expect(p.phase).toBe(ph);
    }
  });
});

describe('buildStatePayload — winnerLabel resolution', () => {
  it('uses OUT exemplar label when present (out_{ci}_0 priority)', () => {
    localStorage.setItem('handface.out.exemplars.v1', JSON.stringify({
      out_1_0: { count: 5, lastFeature: [], lastAt: 0, label: 'Wave Hello' },
    }));
    const p = buildStatePayload({ ...baseInputs, winnerCluster: 1 });
    expect(p.winnerLabel).toBe('Wave Hello');
  });

  it('falls back to out_{ci} when out_{ci}_0 absent', () => {
    localStorage.setItem('handface.out.exemplars.v1', JSON.stringify({
      out_2: { count: 1, lastFeature: [], lastAt: 0, label: 'Stop' },
    }));
    const p = buildStatePayload({ ...baseInputs, winnerCluster: 2 });
    expect(p.winnerLabel).toBe('Stop');
  });

  it('falls back to CLUSTER_TO_LABEL when no exemplar matches', () => {
    const p = buildStatePayload({ ...baseInputs, winnerCluster: 3 });
    expect(p.winnerLabel).toBe('Victory');
  });

  it('null label in exemplar still falls back', () => {
    localStorage.setItem('handface.out.exemplars.v1', JSON.stringify({
      out_0_0: { count: 1, lastFeature: [], lastAt: 0, label: null },
    }));
    const p = buildStatePayload({ ...baseInputs, winnerCluster: 0 });
    expect(p.winnerLabel).toBe('Pointing');
  });
});
