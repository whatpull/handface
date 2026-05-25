// n16-hand substrate builder 단위 테스트.

import { describe, it, expect } from 'vitest';
import { buildN16HandPreset, N16Pools, N_INPUT_N16 } from '@/lib/snn-runtime/builders/n16-hand';

describe('n16-hand — basic build', () => {
  it('영역 cluster + 4 cluster build → expected structure', () => {
    const activeInputs = [
      [0, 1, 2, 63, 64, 65, 66, 67],   // raw thumb + finger extensions
      [3, 4, 5, 68, 69, 70, 71, 72],   // index + bend angles
      [6, 7, 8, 73],                    // middle + palm orient
      [9, 10, 11, 74],                  // ring + palm size
    ];
    const result = buildN16HandPreset({ clusterActiveInputs: activeInputs, seed: 57 });
    expect(result.preset).toBe('n16_hand');
    expect(result.inputDim).toBe(75);
    expect(result.outClusters).toBe(4);
    expect(result.outTotal).toBe(4 * N16Pools.OUT_PER_CLUSTER);
    expect(result.neuronsAdded).toBeGreaterThan(0);
    expect(result.synapsesAdded).toBeGreaterThan(0);
    expect(result.vThreshold).toBe(-55.0);
    expect(result.homeostaticNeurons).toBeGreaterThan(0);
  });

  it('input neurons = N_INPUT_N16 (75)', () => {
    const result = buildN16HandPreset({ clusterActiveInputs: [[0, 1, 2]], seed: 57 });
    const net = result.net;
    // Check that all input neurons exist.
    for (let i = 0; i < N_INPUT_N16; i += 1) {
      expect(net.get(`in_feat_${i}`)).not.toBeNull();
    }
  });

  it('OUT clusters 영역 cross-cluster WTA 영역 inhibitory wired', () => {
    const result = buildN16HandPreset({
      clusterActiveInputs: [[0], [1], [2]], seed: 57,
    });
    // Check at least one inhibitory connection between different clusters.
    let hasInhibitoryCross = false;
    for (const s of result.net.synapses) {
      const pre = s.pre.name;
      const post = s.post.name;
      if (pre.startsWith('out_') && post.startsWith('out_') && s.weight < 0) {
        const preCluster = pre.split('_')[1];
        const postCluster = post.split('_')[1];
        if (preCluster !== postCluster) hasInhibitoryCross = true;
      }
    }
    expect(hasInhibitoryCross).toBe(true);
  });

  it('determinism — same seed → same neuron count + synapse count', () => {
    const r1 = buildN16HandPreset({
      clusterActiveInputs: [[0, 1], [2, 3]], seed: 100,
    });
    const r2 = buildN16HandPreset({
      clusterActiveInputs: [[0, 1], [2, 3]], seed: 100,
    });
    expect(r1.neuronsAdded).toBe(r2.neuronsAdded);
    expect(r1.synapsesAdded).toBe(r2.synapsesAdded);
  });

  it('default options work', () => {
    const result = buildN16HandPreset({ clusterActiveInputs: [[0]] });
    expect(result.preset).toBe('n16_hand');
    expect(result.inputDim).toBe(75);
  });

  it('empty cluster list → input neurons only', () => {
    const result = buildN16HandPreset({ clusterActiveInputs: [] });
    expect(result.outClusters).toBe(0);
    expect(result.outTotal).toBe(0);
    // Input neurons should still be created.
    for (let i = 0; i < N_INPUT_N16; i += 1) {
      expect(result.net.get(`in_feat_${i}`)).not.toBeNull();
    }
  });
});

describe('n16-hand — pool sizing', () => {
  it('pools 영역 정합 (sub-linear scaling from n15)', () => {
    expect(N16Pools.OUT_PER_CLUSTER).toBe(8);
    expect(N16Pools.V1_L4_PER_SUB).toBe(56);
    expect(N16Pools.V1_L23_PER_SUB).toBe(56);
    expect(N16Pools.V2_L4_PER_SUB).toBe(56);
    expect(N16Pools.V2_L23_PER_SUB).toBe(44);
    expect(N16Pools.V2_L5_PER_SUB).toBe(32);
  });
});
