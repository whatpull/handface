// ART vigilance + dynamic cluster expansion 단위 테스트.
//
// Fix #20 (2026-05-10): zero-init dynamic — buildN13OrientationPreset() default
// 영역 INPUT 16 영역만. 본 테스트 영역 LEGACY 4-cluster 영역 explicit pass.

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

const LEGACY_FOUR = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

describe('snn-art — ClusterRegistry 빌드', () => {
  it('LEGACY 4-cluster 영역 4 cluster 슬롯 생성', () => {
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
    expect(reg.slots).toHaveLength(4);
    expect(reg.slots[0].v1L4E).toHaveLength(N13Pools.V1_L4_PER_SUB);
    expect(reg.slots[0].out).toHaveLength(N13Pools.OUT_PER_CLUSTER);
    expect(reg.slots[0].activeInputs).toEqual([4, 5, 6, 7]);
  });

  it('Fix #20: zero-init 영역 0 cluster 슬롯', () => {
    const reg = buildClusterRegistryFromN13([]);
    expect(reg.slots).toHaveLength(0);
    // per-sub size 영역 expandCluster 영역 정합 catch (fixed constants).
    expect(reg.v1L4PerSub).toBe(N13Pools.V1_L4_PER_SUB);
    expect(reg.outPerCluster).toBe(N13Pools.OUT_PER_CLUSTER);
  });

  it('cluster slot 의 뉴런 이름이 n13 빌더와 정합', () => {
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
    expect(reg.slots[0].v1L4E[0]).toBe('v1_L4_E_0');
    expect(reg.slots[1].v1L4E[0]).toBe(`v1_L4_E_${N13Pools.V1_L4_PER_SUB}`);
    expect(reg.slots[2].out[0]).toBe('out_2_0');
  });
});

describe('snn-art — Match score', () => {
  it('모든 cluster silent → winner=-1, share=0, margin=0', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);

    const score = computeMatchScore(monitor, reg, 100);
    expect(score.winner).toBe(-1);
    expect(score.share).toBe(0);
    expect(score.margin).toBe(0);
  });

  it('한 cluster 만 fire 시 winner / share=1 / margin=1', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);

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
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
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
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const monitor = new SpikeMonitor();
    monitor.attachAll(net.neurons);
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
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
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
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

  it('Fix #20: zero-init 영역 첫 expandCluster 영역 cluster 0 slot 영역 spawn', () => {
    const { net } = buildN13OrientationPreset(); // zero-init.
    const reg = buildClusterRegistryFromN13([]);
    expect(reg.slots).toHaveLength(0);
    const result = expandCluster(net, reg, { activeInputs: [0, 1, 2, 3], seed: 7 });
    expect(reg.slots).toHaveLength(1);
    expect(result.newSlot.id).toBe(0);
    expect(result.newSlot.activeInputs).toEqual([0, 1, 2, 3]);
    // V2_L5 → OUT cluster-local cascade 영역 weight > 0 (정상 spawn).
    const v2L5ToOut = net.synapses.filter((s) =>
      s.pre.name.startsWith('c0_v2_L5_E_') && s.post.name.startsWith('out_0_'),
    );
    expect(v2L5ToOut.length).toBeGreaterThan(0);
  });

  it('새 cluster OUT 은 기존 cluster OUT 들과 mutual inhibit', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
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
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
    const result = expandCluster(net, reg, { activeInputs: [0, 4, 8, 12], seed: 1 });

    const sample = net.get(result.newSlot.v1L4E[0])!;
    expect(sample.nmdaEnabled).toBe(true);
    expect(sample.homeostaticEnabled).toBe(true);
    expect(sample.homeostaticIncrement).toBe(2.0);
  });

  it('seed 동일 시 expansion 결정론', () => {
    const a = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const b = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const regA = buildClusterRegistryFromN13(LEGACY_FOUR);
    const regB = buildClusterRegistryFromN13(LEGACY_FOUR);
    const rA = expandCluster(a.net, regA, { activeInputs: [0, 4, 8, 12], seed: 42 });
    const rB = expandCluster(b.net, regB, { activeInputs: [0, 4, 8, 12], seed: 42 });
    expect(rA.synapsesAdded).toBe(rB.synapsesAdded);
  });
});

// 사용자 catch 2026-05-11 (perf F2-a — Sparse WTA): cluster N 영역 증가 영역
// dense O(N²) cross-inhibition 영역 학습 둔화 source. 정정: top-k=4 영역만
// mutual inhibition wire — Jaccard(activeInputs) 영역 가까운 cluster 우선.
//
// 회귀 위험 catch:
//   - N <= k 영역 dense 보존 정합 (기존 64-edge test 영역 통과 — 4 existing).
//   - N > k 영역 top-k 만 wire — synapse 영역 (k * 8 * 8 * 2) 영역 cap.
//   - 학습 selectivity 영역 회귀 위험 catch — 멀리 떨어진 cluster 영역 input
//     영역 disjoint 영역 OUT 영역 cross-fire 영역 영역 거의 0 영역 정합 (V1
//     영역 cluster-local hard-wire — 본 path 영역 input 영역 동일 가까운 cluster
//     영역 confound 영역만 기록 cross-inhibit 영역 충분).
describe('snn-art — Sparse WTA (perf F2-a)', () => {
  it('N=8 expand 시 신규 cluster 영역 top-k=4 영역 cluster 영역만 cross-inhibit', () => {
    // 8 cluster — base 4 + expand 4 영역 만들고 9th expand.
    const inputs8 = [
      [0, 1, 2, 3], // c0
      [4, 5, 6, 7], // c1
      [8, 9, 10, 11], // c2
      [12, 13, 14, 15], // c3
    ];
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: inputs8 });
    const reg = buildClusterRegistryFromN13(inputs8);
    // 4 expand 영역 확장 (registry.slots.length 영역 8 영역).
    expandCluster(net, reg, { activeInputs: [0, 1, 4, 5], seed: 11 }); // c4 — c0/c1 가까움
    expandCluster(net, reg, { activeInputs: [2, 3, 6, 7], seed: 12 }); // c5 — c0/c1 가까움
    expandCluster(net, reg, { activeInputs: [8, 9, 12, 13], seed: 13 }); // c6 — c2/c3 가까움
    expandCluster(net, reg, { activeInputs: [10, 11, 14, 15], seed: 14 }); // c7 — c2/c3 가까움
    expect(reg.slots).toHaveLength(8);

    // 9th cluster — activeInputs [0,1,2,3] 영역 c0 영역 정확 동일 + c4/c5 영역 partial overlap.
    // top-k=4 영역 expectation: c0 (Jaccard 1.0) + c4/c5 (overlap) + c1 또는 c2 영역 tie.
    expandCluster(net, reg, { activeInputs: [0, 1, 2, 3], seed: 99 });
    expect(reg.slots).toHaveLength(9);

    const newOut = reg.slots[8].out;
    // 본 신규 cluster 영역 inhibit 영역 받은 cluster 수 영역 정확 측정.
    const inhibitedBy = new Set<string>();
    for (const s of net.synapses) {
      if (newOut.includes(s.pre.name) && s.weight < 0) {
        inhibitedBy.add(s.post.name);
      }
    }
    // 본 신규 cluster 영역 inhibit 영역 cluster id catch.
    const inhibitedClusters = new Set<number>();
    for (const post of inhibitedBy) {
      for (let ci = 0; ci < 8; ci += 1) {
        if (reg.slots[ci].out.includes(post)) inhibitedClusters.add(ci);
      }
    }
    // top-k=4 영역 cap — 8 cluster 중 4 만.
    expect(inhibitedClusters.size).toBe(4);
    // 가장 가까운 c0 영역 반드시 포함.
    expect(inhibitedClusters.has(0)).toBe(true);

    // 신규 cross-inhibit synapse count 영역 정확 검증 — sparse cap 영역 직접 측정.
    // dense path: 8 cluster × 8 (newOut) × 8 (existingOut) × 2 directions = 1024.
    // sparse path (k=4): 4 cluster × 8 × 8 × 2 = 512.
    let crossInhibitTotal = 0;
    for (const s of net.synapses) {
      if (s.weight >= 0) continue;
      const pre = s.pre.name;
      const post = s.post.name;
      // 본 신규 cluster 영역 OUT 영역 inbound + outbound cross-inhibit catch.
      const newIsPre = newOut.includes(pre);
      const newIsPost = newOut.includes(post);
      if (!newIsPre && !newIsPost) continue;
      // 본 cluster 영역 inner mutual excitation (+2.0) 영역 weight > 0 영역 이미 skip.
      // 본 path 영역 cross-cluster only — pre/post 영역 다른 cluster OUT 영역 catch.
      const otherSide = newIsPre ? post : pre;
      let otherIsExistingOut = false;
      for (let ci = 0; ci < 8; ci += 1) {
        if (reg.slots[ci].out.includes(otherSide)) { otherIsExistingOut = true; break; }
      }
      if (otherIsExistingOut) crossInhibitTotal += 1;
    }
    // 4 cluster × 64 × 2 = 512 정확.
    expect(crossInhibitTotal).toBe(512);
  });

  it('N=4 (k 이하) 영역 dense 보존 — 기존 64-edge test 회귀 0', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR });
    const reg = buildClusterRegistryFromN13(LEGACY_FOUR);
    expandCluster(net, reg, { activeInputs: [0, 4, 8, 12], seed: 1 });
    // 모든 4 existing cluster 영역 64 edge 영역 wire — dense 보존.
    for (let ci = 0; ci < 4; ci += 1) {
      const newOut = reg.slots[4].out;
      const existingOut = reg.slots[ci].out;
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
      expect(crossNeg).toBe(64);
    }
  });
});
