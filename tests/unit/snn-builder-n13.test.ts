// n13 substrate builder 단위 테스트.
//
// Fix #20 (2026-05-10): zero-init dynamic — default clusterActiveInputs=[]
// (zero base cluster). 4-cluster legacy 영역 explicit LEGACY_FOUR_CLUSTER_INPUTS
// 영역 pass 영역 catch (사용자 명시 "기존 로직 신경쓰지말고" — backward compat 폐기).
//
// 검증 포인트:
//  - 토폴로지 결정론 (같은 seed → 같은 neuron / synapse 수).
//  - 뉴런 region/population 분포가 신경해부학 정합 (V1, V2, OUT, INPUT).
//  - cluster_active_inputs 검증: zero-init / 4-cluster override 차이 노출.
//  - NMDA + homeostatic 활성화 (excitatory layer + OUT, V1_L4_I 제외).
//  - WTA: OUT cluster 간 negative weight, 같은 cluster 안은 positive.

import { describe, expect, it } from 'vitest';

import {
  N13Names,
  N13Pools,
  buildN13OrientationPreset,
} from '@/lib/snn-runtime';
import { LEGACY_FOUR_CLUSTER_INPUTS } from '@/lib/snn-runtime/builders/n13-orientation';

describe('snn-builder-n13 — 토폴로지', () => {
  it('default 빌드는 결정론 (같은 seed → 같은 결과)', () => {
    const r1 = buildN13OrientationPreset({ seed: 57 });
    const r2 = buildN13OrientationPreset({ seed: 57 });
    expect(r1.neuronsAdded).toBe(r2.neuronsAdded);
    expect(r1.synapsesAdded).toBe(r2.synapsesAdded);
  });

  it('Fix #20: default (zero-init) 영역 INPUT 32 영역만 — base cluster pool 0', () => {
    const r = buildN13OrientationPreset({ seed: 57 });
    expect(r.neuronsAdded).toBe(32);
    expect(r.outClusters).toBe(0);
    expect(r.outTotal).toBe(0);
    expect(r.inputDim).toBe(32);
    expect(r.preset).toBe('n13_orientation');
    // synapses 영역 0 — base cluster pool 0 → cascade 영역 0 iteration.
    expect(r.synapsesAdded).toBe(0);
  });

  it('seed 다르면 synapse 수도 다르다 (random sparse, 4-cluster explicit)', () => {
    const r1 = buildN13OrientationPreset({ seed: 57, clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
    const r2 = buildN13OrientationPreset({ seed: 999, clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
    expect(r1.synapsesAdded).not.toBe(r2.synapsesAdded);
  });

  it('LEGACY 4-cluster 빌드 — 뉴런 수 = 32 + 128 + 256 + 128 + 128 + 96 + 64 + 32 = 864', () => {
    const r = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
    const v1L4 = N13Pools.V1_L4_PER_SUB * 4;
    const v1L4I = N13Pools.V1_L4I_PER_SUB * 4;
    const v1L23 = N13Pools.V1_L23_PER_SUB * 4;
    const v2L4 = N13Pools.V2_L4_PER_SUB * 4;
    const v2L23 = N13Pools.V2_L23_PER_SUB * 4;
    const v2L5 = N13Pools.V2_L5_PER_SUB * 4;
    const outTotal = N13Pools.OUT_PER_CLUSTER * 4;
    expect(r.neuronsAdded).toBe(32 + v1L4 + v1L4I + v1L23 + v2L4 + v2L23 + v2L5 + outTotal);
    expect(r.outClusters).toBe(4);
    expect(r.outTotal).toBe(32);
    expect(r.inputDim).toBe(32);
    expect(r.preset).toBe('n13_orientation');
  });

  it('LEGACY 4-cluster — region 분포가 신경해부학 정합', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
    const counts = new Map<string, number>();
    for (const n of net.neurons) {
      const k = n.region ?? 'NULL';
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    expect(counts.get('INPUT')).toBe(32);
    expect(counts.get('V1')).toBe(
      (N13Pools.V1_L4_PER_SUB + N13Pools.V1_L4I_PER_SUB + N13Pools.V1_L23_PER_SUB) * 4,
    );
    expect(counts.get('V2')).toBe(
      (N13Pools.V2_L4_PER_SUB + N13Pools.V2_L23_PER_SUB + N13Pools.V2_L5_PER_SUB) * 4,
    );
    expect(counts.get('OUT')).toBe(32);
  });

  it('LEGACY 4-cluster — OUT cluster population label 정합 (cluster_0 .. cluster_3)', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
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
  it('LEGACY vs 명시 mapping 은 어떤 input 이 V1 sub 에 dense 연결되는지가 다르다', () => {
    const def = buildN13OrientationPreset({ seed: 57, clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
    const gesture = buildN13OrientationPreset({
      seed: 57,
      clusterActiveInputs: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ],
    });

    // LEGACY cluster 0 active = [4,5,6,7] → in_feat_4 → v1_L4_E_0..31 weight ~11.
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

    // LEGACY cluster 0 active = [16,17,18,19] (row sum features) → in_feat_16 dense.
    // in_feat_4 (raw cell 4) not in LEGACY cluster 0 active set → sparse.
    expect(countCluster0Dense(def.net, 'in_feat_16')).toBeGreaterThan(20); // active in LEGACY
    expect(countCluster0Dense(def.net, 'in_feat_4')).toBeLessThan(5); // inactive in LEGACY
    expect(countCluster0Dense(gesture.net, 'in_feat_0')).toBeGreaterThan(20); // active in gesture
  });

  it('Fix #20: clusterActiveInputs=[] 영역 zero-init 자연 정합 (throw 0)', () => {
    expect(() => buildN13OrientationPreset({ clusterActiveInputs: [] })).not.toThrow();
    const r = buildN13OrientationPreset({ clusterActiveInputs: [] });
    expect(r.outClusters).toBe(0);
  });
});

describe('snn-builder-n13 — 신경 파라미터', () => {
  it('LEGACY 4-cluster — 모든 뉴런에 NMDA 활성 (threshold -65, gain 10)', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
    for (const n of net.neurons) {
      expect(n.nmdaEnabled).toBe(true);
      expect(n.nmdaThreshold).toBe(-65.0);
      expect(n.nmdaGain).toBe(10.0);
    }
  });

  it('LEGACY 4-cluster — homeostatic 은 excitatory + OUT 만, V1_L4_I 는 비활성', () => {
    const r = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
    const expectedHomeo =
      (N13Pools.V1_L4_PER_SUB + N13Pools.V1_L23_PER_SUB + N13Pools.V2_L4_PER_SUB +
        N13Pools.V2_L23_PER_SUB + N13Pools.V2_L5_PER_SUB + N13Pools.OUT_PER_CLUSTER) * 4;
    expect(r.homeostaticNeurons).toBe(expectedHomeo);
    const inhibSample = r.net.get('v1_L4_I_0')!;
    expect(inhibSample.homeostaticEnabled).toBe(false);
    const outSample = r.net.get('out_0_0')!;
    expect(outSample.homeostaticEnabled).toBe(true);
    expect(outSample.homeostaticIncrement).toBe(2.0);
    expect(outSample.homeostaticDecay).toBe(0.995);
  });
});

describe('snn-builder-n13 — WTA / 격리', () => {
  it('LEGACY 4-cluster — OUT cluster 간 mutual inhibition (negative weight)', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
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
    // PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner 정정,
    // 2026-05-10): WTA inhibition -4.0 → -8.0 영역 강화 (Diehl & Cook 2015
    // strong inhibitory pool 정합).
    // P215d (2026-05-19): -8.0 → -10.0 영역 추가 강화 — P215b 노이즈
    // augmentation 영역 cluster receptive field 영역 확장 영역 cluster 간
    // overlap risk 영역 lateral inhibition 영역 ratio 영역 보강.
    expect(crossNegMin).toBe(-10.0);
  });

  it('LEGACY 4-cluster — OUT cluster 내부 mutual excitation (positive weight)', () => {
    const { net } = buildN13OrientationPreset({ clusterActiveInputs: LEGACY_FOUR_CLUSTER_INPUTS });
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
