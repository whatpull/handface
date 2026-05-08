// ART vigilance + dynamic cluster expansion 단위 테스트.

import { describe, expect, it } from 'vitest';

import {
  DEFAULT_ART_CONFIG,
  N13Pools,
  SpikeMonitor,
  buildClusterRegistryFromN13,
  buildN13OrientationPreset,
  computeMatchScore,
  evaluateVigilance,
  expandCluster,
} from '@/lib/snn-runtime';

const DEFAULT_INPUTS = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

describe('snn-art — ClusterRegistry 빌드', () => {
  it('n13 default 으로 4 cluster 슬롯 생성', () => {
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    expect(reg.slots).toHaveLength(N13Pools.N_CLUSTER);
    expect(reg.slots[0].v1L4E).toHaveLength(N13Pools.V1_L4_PER_SUB);
    expect(reg.slots[0].out).toHaveLength(N13Pools.OUT_PER_CLUSTER);
    expect(reg.slots[0].activeInputs).toEqual([4, 5, 6, 7]);
  });

  it('cluster slot 의 뉴런 이름이 n13 빌더와 정합', () => {
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    expect(reg.slots[0].v1L4E[0]).toBe('v1_L4_E_0');
    expect(reg.slots[1].v1L4E[0]).toBe(`v1_L4_E_${N13Pools.V1_L4_PER_SUB}`);
    expect(reg.slots[2].out[0]).toBe('out_2_0');
  });
});

describe('snn-art — Match score', () => {
  it('모든 cluster silent → winner=-1, share=0, margin=0', () => {
    const { net } = buildN13OrientationPreset();
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);

    const score = computeMatchScore(monitor, reg, 100);
    expect(score.winner).toBe(-1);
    expect(score.share).toBe(0);
    expect(score.margin).toBe(0);
  });

  it('한 cluster 만 fire 시 winner / share=1 / margin=1', () => {
    const { net } = buildN13OrientationPreset();
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);

    // cluster 2 OUT 뉴런만 fire 인양 monitor 에 직접 spike 기록 — listener 우회.
    // 본 테스트는 score 계산 로직만 검증.
    const c2OutNames = reg.slots[2].out;
    for (const n of c2OutNames) {
      const neuron = net.get(n)!;
      // SpikeMonitor.attach 가 부착한 listener 가 fire 시 record.
      // 직접 firing 시간 1ms 마다 simulate.
      for (let t = 0; t < 50; t += 1) {
        // private record — 외부 호출 불가. 대신 listener 재사용.
        neuron['listeners'][0](neuron, t);
      }
    }
    const score = computeMatchScore(monitor, reg, 50);
    expect(score.winner).toBe(2);
    expect(score.share).toBeCloseTo(1.0, 3);
    expect(score.margin).toBeCloseTo(1.0, 3);
  });
});

describe('snn-art — Vigilance', () => {
  it('share >= vigilance → mismatch=false', () => {
    const { net } = buildN13OrientationPreset();
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    const c1OutNames = reg.slots[1].out;
    for (const n of c1OutNames) {
      const neuron = net.get(n)!;
      for (let t = 0; t < 50; t += 1) {
        neuron['listeners'][0](neuron, t);
      }
    }
    const result = evaluateVigilance(monitor, reg, 50, {
      ...DEFAULT_ART_CONFIG,
      vigilance: 0.5,
    });
    expect(result.mismatch).toBe(false);
    expect(result.winner).toBe(1);
  });

  it('두 cluster 가 같이 fire → share=0.5 → vigilance=0.6 시 mismatch', () => {
    const { net } = buildN13OrientationPreset();
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    for (const ci of [0, 2]) {
      for (const n of reg.slots[ci].out) {
        const neuron = net.get(n)!;
        for (let t = 0; t < 50; t += 1) neuron['listeners'][0](neuron, t);
      }
    }
    const result = evaluateVigilance(monitor, reg, 50, {
      ...DEFAULT_ART_CONFIG,
      vigilance: 0.6,
    });
    expect(result.share).toBeCloseTo(0.5, 2);
    expect(result.mismatch).toBe(true);
  });
});

describe('snn-art — Cluster expansion', () => {
  it('새 cluster 추가 시 net 에 뉴런 + 시냅스 증가, registry 슬롯 +1', () => {
    const { net } = buildN13OrientationPreset();
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    const beforeN = net.size();
    const beforeS = net.synapses.length;
    const beforeSlots = reg.slots.length;

    const result = expandCluster(net, reg, {
      activeInputs: [2, 6, 11, 14],
      seed: 100,
    });

    const expectedNeurons =
      reg.v1L4PerSub +
      reg.v1L23PerSub +
      reg.v2L4PerSub +
      reg.v2L23PerSub +
      reg.v2L5PerSub +
      reg.outPerCluster;
    expect(result.neuronsAdded).toBe(expectedNeurons);
    expect(net.size()).toBe(beforeN + expectedNeurons);
    expect(net.synapses.length).toBeGreaterThan(beforeS);
    expect(reg.slots).toHaveLength(beforeSlots + 1);
    expect(result.newSlot.id).toBe(beforeSlots);
    expect(result.newSlot.activeInputs).toEqual([2, 6, 11, 14]);
  });

  it('새 cluster OUT 은 기존 cluster OUT 들과 mutual inhibit', () => {
    const { net } = buildN13OrientationPreset();
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    expandCluster(net, reg, { activeInputs: [0, 4, 8, 12], seed: 1 });

    const newOut = reg.slots[4].out;
    const existingOut = reg.slots[0].out;
    let crossNeg = 0;
    for (const s of net.synapses) {
      if (
        newOut.includes(s.pre.name) &&
        existingOut.includes(s.post.name) &&
        s.weight < 0
      ) {
        crossNeg += 1;
      }
    }
    // 8 (new) × 8 (existing) = 64.
    expect(crossNeg).toBe(64);
  });

  it('새 cluster 뉴런은 NMDA + homeostatic 활성', () => {
    const { net } = buildN13OrientationPreset();
    const reg = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    const result = expandCluster(net, reg, { activeInputs: [0, 4, 8, 12], seed: 1 });

    const sample = net.get(result.newSlot.v1L4E[0])!;
    expect(sample.nmdaEnabled).toBe(true);
    expect(sample.homeostaticEnabled).toBe(true);
    expect(sample.homeostaticIncrement).toBe(2.0);
  });

  it('seed 동일 시 expansion 결정론', () => {
    const a = buildN13OrientationPreset();
    const b = buildN13OrientationPreset();
    const regA = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    const regB = buildClusterRegistryFromN13(DEFAULT_INPUTS);
    const rA = expandCluster(a.net, regA, { activeInputs: [0, 4, 8, 12], seed: 42 });
    const rB = expandCluster(b.net, regB, { activeInputs: [0, 4, 8, 12], seed: 42 });
    expect(rA.synapsesAdded).toBe(rB.synapsesAdded);
  });
});
