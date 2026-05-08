// n13 substrate builder 단위 테스트.
//
// 검증 포인트:
//  - 토폴로지 결정론 (같은 seed → 같은 neuron / synapse 수).
//  - 뉴런 region/population 분포가 신경해부학 정합 (V1, V2, OUT, INPUT).
//  - cluster_active_inputs 검증: default vs override 차이 노출.
//  - NMDA + homeostatic 활성화 (excitatory layer + OUT, V1_L4_I 제외).
//  - WTA: OUT cluster 간 negative weight, 같은 cluster 안은 positive.

import { describe, expect, it } from 'vitest';

import {
  N13Names,
  N13Pools,
  buildN13OrientationPreset,
} from '@/lib/snn-runtime';

describe('snn-builder-n13 — 토폴로지', () => {
  it('default 빌드는 결정론 (같은 seed → 같은 결과)', () => {
    const r1 = buildN13OrientationPreset({ seed: 57 });
    const r2 = buildN13OrientationPreset({ seed: 57 });
    expect(r1.neuronsAdded).toBe(r2.neuronsAdded);
    expect(r1.synapsesAdded).toBe(r2.synapsesAdded);
  });

  it('seed 다르면 synapse 수도 다르다 (random sparse)', () => {
    const r1 = buildN13OrientationPreset({ seed: 57 });
    const r2 = buildN13OrientationPreset({ seed: 999 });
    expect(r1.synapsesAdded).not.toBe(r2.synapsesAdded);
  });

  it('뉴런 수 = 16 + 128 + 256 + 128 + 128 + 96 + 64 + 32 = 848', () => {
    const r = buildN13OrientationPreset();
    expect(r.neuronsAdded).toBe(
      16 + N13Pools.V1_L4E + N13Pools.V1_L4I + N13Pools.V1_L23E + N13Pools.V2_L4E +
        N13Pools.V2_L23E + N13Pools.V2_L5E + N13Pools.OUT_TOTAL,
    );
    expect(r.outClusters).toBe(4);
    expect(r.outTotal).toBe(32);
    expect(r.inputDim).toBe(16);
    expect(r.preset).toBe('n13_orientation');
  });

  it('region 분포가 신경해부학 정합', () => {
    const { net } = buildN13OrientationPreset();
    const counts = new Map<string, number>();
    for (const n of net.neurons) {
      const k = n.region ?? 'NULL';
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    expect(counts.get('INPUT')).toBe(16);
    expect(counts.get('V1')).toBe(N13Pools.V1_L4E + N13Pools.V1_L4I + N13Pools.V1_L23E);
    expect(counts.get('V2')).toBe(N13Pools.V2_L4E + N13Pools.V2_L23E + N13Pools.V2_L5E);
    expect(counts.get('OUT')).toBe(32);
  });

  it('OUT cluster population label 정합 (cluster_0 .. cluster_3)', () => {
    const { net } = buildN13OrientationPreset();
    for (let ci = 0; ci < 4; ci += 1) {
      for (let ni = 0; ni < N13Pools.OUT_PER_CLUSTER; ni += 1) {
        const n = net.get(N13Names.out(ci, ni));
        expect(n).not.toBeNull();
        expect(n!.population).toBe(`cluster_${ci}`);
      }
    }
  });
});

describe('snn-builder-n13 — cluster_active_inputs', () => {
  it('default vs 명시 mapping 은 어떤 input 이 V1 sub 에 dense 연결되는지가 다르다', () => {
    const def = buildN13OrientationPreset({ seed: 57 });
    const gesture = buildN13OrientationPreset({
      seed: 57,
      clusterActiveInputs: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ],
    });

    // default cluster 0 active = [4,5,6,7] → in_feat_4 → v1_L4_E_0..31 weight ~11.
    // gesture cluster 0 active = [0,1,2,3] → in_feat_0 → v1_L4_E_0..31 weight ~11.
    // cluster 0 sub = v1_L4_E_0..31. 본 sub 만 대상.
    const countCluster0Dense = (net: typeof def.net, inputName: string) => {
      let n = 0;
      for (const s of net.synapses) {
        if (s.pre.name !== inputName) continue;
        const m = /^v1_L4_E_(\d+)$/.exec(s.post.name);
        if (!m) continue;
        const idx = Number(m[1]);
        if (idx >= 32) continue; // cluster 0 만.
        if (s.weight >= 9.0) n += 1;
      }
      return n;
    };

    expect(countCluster0Dense(def.net, 'in_feat_4')).toBeGreaterThan(20); // active in default
    expect(countCluster0Dense(def.net, 'in_feat_0')).toBeLessThan(5); // inactive in default
    expect(countCluster0Dense(gesture.net, 'in_feat_0')).toBeGreaterThan(20); // active in gesture
  });

  it('길이 != 4 시 명시적 오류', () => {
    expect(() =>
      buildN13OrientationPreset({ clusterActiveInputs: [[0], [1], [2]] }),
    ).toThrow(/clusterActiveInputs/);
  });
});

describe('snn-builder-n13 — 신경 파라미터', () => {
  it('모든 뉴런에 NMDA 활성 (threshold -65, gain 10)', () => {
    const { net } = buildN13OrientationPreset();
    for (const n of net.neurons) {
      expect(n.nmdaEnabled).toBe(true);
      expect(n.nmdaThreshold).toBe(-65.0);
      expect(n.nmdaGain).toBe(10.0);
    }
  });

  it('homeostatic 은 excitatory + OUT 만, V1_L4_I 는 비활성', () => {
    const r = buildN13OrientationPreset();
    expect(r.homeostaticNeurons).toBe(
      N13Pools.V1_L4E + N13Pools.V1_L23E + N13Pools.V2_L4E + N13Pools.V2_L23E +
        N13Pools.V2_L5E + N13Pools.OUT_TOTAL,
    );
    const inhibSample = r.net.get('v1_L4_I_0')!;
    expect(inhibSample.homeostaticEnabled).toBe(false);
    const outSample = r.net.get('out_0_0')!;
    expect(outSample.homeostaticEnabled).toBe(true);
    expect(outSample.homeostaticIncrement).toBe(2.0);
    expect(outSample.homeostaticDecay).toBe(0.995);
  });
});

describe('snn-builder-n13 — WTA / 격리', () => {
  it('OUT cluster 간 mutual inhibition (negative weight)', () => {
    const { net } = buildN13OrientationPreset();
    let crossCount = 0;
    let crossNegMin = 0;
    for (const s of net.synapses) {
      const p = s.pre.population;
      const q = s.post.population;
      if (
        s.pre.region === 'OUT' &&
        s.post.region === 'OUT' &&
        p &&
        q &&
        p !== q
      ) {
        crossCount += 1;
        crossNegMin = Math.min(crossNegMin, s.weight);
      }
    }
    // 4 cluster × 8 neuron 이 다른 cluster 의 모든 24 neuron 으로 inhibit.
    // = 32 × 24 = 768.
    expect(crossCount).toBe(32 * 24);
    expect(crossNegMin).toBe(-4.0);
  });

  it('OUT cluster 내부 mutual excitation (positive weight)', () => {
    const { net } = buildN13OrientationPreset();
    let intraCount = 0;
    let intraPosMin = Infinity;
    for (const s of net.synapses) {
      if (
        s.pre.region === 'OUT' &&
        s.post.region === 'OUT' &&
        s.pre.population === s.post.population
      ) {
        intraCount += 1;
        intraPosMin = Math.min(intraPosMin, s.weight);
      }
    }
    // cluster 내 8 × 7 = 56 (자기 제외) × 4 cluster = 224.
    expect(intraCount).toBe(4 * 8 * 7);
    expect(intraPosMin).toBe(2.0);
  });
});
