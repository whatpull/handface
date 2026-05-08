// n13 orientation substrate — neuronface modules/network.py rev15 정합 TS 포팅.
//
// 4 cluster slot 아키텍처 (─│╲╱ orientation 기본, cluster_active_inputs 명시
// 시 제스처 등 다른 task 정합):
//   INPUT (16) → V1_L4_E (128, 4 sub × 32) → V1_L23_E (128) → V2_L4_E (128) →
//   V2_L23_E (96) → V2_L5_E (64) → OUT (32, 4 cluster × 8).
//
// rev15 핵심:
//   - cluster-local cascade dense + cross-cluster broadcast strict 격리
//     (density 0.02-0.03, weight 1.0-1.5).
//   - V1_L4 lateral inhibition + V1_L4_E 자기 lateral.
//   - OUT cluster 내 mutual excitation + cluster 간 mutual inhibition (WTA).
//   - 모든 excitatory layer + OUT 에 NMDA (threshold -65, gain 10) +
//     homeostatic threshold (increment 2.0, decay 0.995, Diehl & Cook).
//
// Python 정합 한계:
//   - random.Random(57) 의 비트 단위 시퀀스 정합 X (mulberry32 사용).
//     초기 가중치는 다르지만 STDP 로 수렴하므로 학습 결과는 정성적으로 일치.
//   - 토폴로지 (뉴런/시냅스 수) 는 결정론.

import { NeuralNetwork } from '../network';
import { Neuron } from '../neuron';
import { SeededRandom } from '../prng';

export interface N13PresetOptions {
  vThreshold?: number;
  // [N_CLUSTER][active_input_idx] — 미지정 시 4×4 grid orientation default.
  clusterActiveInputs?: number[][];
  seed?: number;
  // 빌드 결과 detach 가능한 net 인스턴스 — 미지정 시 새 NeuralNetwork 생성.
  net?: NeuralNetwork;
}

export interface N13PresetResult {
  net: NeuralNetwork;
  neuronsAdded: number;
  synapsesAdded: number;
  vThreshold: number;
  inputDim: 16;
  outClusters: 4;
  outTotal: 32;
  homeostaticNeurons: number;
  preset: 'n13_orientation';
}

const DEFAULT_CLUSTER_ACTIVE_INPUTS: number[][] = [
  [4, 5, 6, 7], //   ─ horizontal: row 1
  [1, 5, 9, 13], //  │ vertical: col 1
  [0, 5, 10, 15], // ╲ diag-back
  [3, 6, 9, 12], //  ╱ diag-fore
];

const N_CLUSTER = 4 as const;
const OUT_PER_CLUSTER = 8 as const;
const OUT_TOTAL = 32 as const;

const V1_L4E = 128;
const V1_L4I = 256;
const V1_L23E = 128;
const V2_L4E = 128;
const V2_L23E = 96;
const V2_L5E = 64;

export function buildN13OrientationPreset(opts: N13PresetOptions = {}): N13PresetResult {
  const vThreshold = opts.vThreshold ?? -55.0;
  const seed = opts.seed ?? 57;
  const net = opts.net ?? new NeuralNetwork();
  const beforeSyn = net.synapses.length;

  if (opts.clusterActiveInputs && opts.clusterActiveInputs.length !== N_CLUSTER) {
    throw new Error(
      `clusterActiveInputs 길이 ${opts.clusterActiveInputs.length} != N_CLUSTER ${N_CLUSTER}`,
    );
  }
  const clusterActive = opts.clusterActiveInputs ?? DEFAULT_CLUSTER_ACTIVE_INPUTS;

  const rng = new SeededRandom(seed);

  // ── 뉴런 등록 ──
  const inputs: string[] = [];
  for (let i = 0; i < 16; i += 1) inputs.push(`in_feat_${i}`);
  const v1L4e: string[] = [];
  for (let i = 0; i < V1_L4E; i += 1) v1L4e.push(`v1_L4_E_${i}`);
  const v1L4i: string[] = [];
  for (let i = 0; i < V1_L4I; i += 1) v1L4i.push(`v1_L4_I_${i}`);
  const v1L23e: string[] = [];
  for (let i = 0; i < V1_L23E; i += 1) v1L23e.push(`v1_L23_E_${i}`);
  const v2L4e: string[] = [];
  for (let i = 0; i < V2_L4E; i += 1) v2L4e.push(`v2_L4_E_${i}`);
  const v2L23e: string[] = [];
  for (let i = 0; i < V2_L23E; i += 1) v2L23e.push(`v2_L23_E_${i}`);
  const v2L5e: string[] = [];
  for (let i = 0; i < V2_L5E; i += 1) v2L5e.push(`v2_L5_E_${i}`);

  const outClusters: string[][] = [];
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const cluster: string[] = [];
    for (let ni = 0; ni < OUT_PER_CLUSTER; ni += 1) cluster.push(`out_${ci}_${ni}`);
    outClusters.push(cluster);
  }
  const outNeurons: string[] = outClusters.flat();

  const addPop = (names: string[], region: string, population: string) => {
    for (const n of names) {
      net.addNeuron(new Neuron({ name: n, region, population }));
    }
  };

  addPop(inputs, 'INPUT', 'input');
  addPop(v1L4e, 'V1', 'L4_E');
  addPop(v1L4i, 'V1', 'L4_I');
  addPop(v1L23e, 'V1', 'L23_E');
  addPop(v2L4e, 'V2', 'L4_E');
  addPop(v2L23e, 'V2', 'L23_E');
  addPop(v2L5e, 'V2', 'L5_E');
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    addPop(outClusters[ci], 'OUT', `cluster_${ci}`);
  }

  // ── 헬퍼 ──
  const proj = (
    srcs: string[],
    tgts: string[],
    density: number,
    weight: number,
    delay: number = 1.0,
    jitter: number = 0.0,
  ) => {
    for (const s of srcs) {
      for (const t of tgts) {
        if (s === t) continue;
        if (rng.random() < density) {
          const w = jitter ? weight + rng.uniform(-jitter, jitter) : weight;
          net.connect(s, t, w, delay);
        }
      }
    }
  };

  // ── INPUT → V1_L4_E (cluster sub-pool 정확 매핑, rev14) ──
  const V1_L4_PER_SUB = V1_L4E / N_CLUSTER; // 32
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const localV1 = v1L4e.slice(V1_L4_PER_SUB * ci, V1_L4_PER_SUB * (ci + 1));
    const activeIdx = clusterActive[ci];
    const inactiveIdx: number[] = [];
    for (let i = 0; i < 16; i += 1) {
      if (!activeIdx.includes(i)) inactiveIdx.push(i);
    }
    for (const ai of activeIdx) {
      for (const t of localV1) {
        const w = 11.0 + rng.uniform(-1.0, 1.0);
        net.connect(inputs[ai], t, w, 1.0);
      }
    }
    for (const ii of inactiveIdx) {
      for (const t of localV1) {
        if (rng.random() < 0.05) {
          const w = 2.0 + rng.uniform(-0.3, 0.3);
          net.connect(inputs[ii], t, w, 1.0);
        }
      }
    }
  }

  // V1_L4 lateral inhibition.
  proj(v1L4i, v1L4e, 0.20, -6.0);
  proj(v1L4e, v1L4i, 0.15, 5.0);
  proj(v1L4e, v1L4e, 0.08, -3.0);

  // ── cluster-local cascade ──
  const V1_L23_PER_SUB = V1_L23E / N_CLUSTER; // 32
  const V2_L4_PER_SUB = V2_L4E / N_CLUSTER; // 32
  const V2_L23_PER_SUB = V2_L23E / N_CLUSTER; // 24
  const V2_L5_PER_SUB = V2_L5E / N_CLUSTER; // 16

  const cascadeLocal = (
    srcs: string[],
    srcPerSub: number,
    tgts: string[],
    tgtPerSub: number,
    localDensity: number,
    localWeight: number,
    crossDensity: number,
    crossWeight: number,
  ) => {
    for (let ci = 0; ci < N_CLUSTER; ci += 1) {
      const localSrc = srcs.slice(srcPerSub * ci, srcPerSub * (ci + 1));
      const localTgt = tgts.slice(tgtPerSub * ci, tgtPerSub * (ci + 1));
      const localSrcSet = new Set(localSrc);
      const crossSrc = srcs.filter((n) => !localSrcSet.has(n));
      for (const s of localSrc) {
        for (const t of localTgt) {
          if (rng.random() < localDensity) {
            const w = localWeight + rng.uniform(-1.0, 1.0);
            net.connect(s, t, w, 1.0);
          }
        }
      }
      for (const s of crossSrc) {
        for (const t of localTgt) {
          if (rng.random() < crossDensity) {
            const w = crossWeight + rng.uniform(-0.5, 0.5);
            net.connect(s, t, w, 1.0);
          }
        }
      }
    }
  };

  // rev15: cross-cluster strict 격리 (0.02-0.03, weight 1.0-1.5).
  cascadeLocal(v1L4e, V1_L4_PER_SUB, v1L23e, V1_L23_PER_SUB, 0.75, 9.0, 0.03, 1.5);
  proj(v1L23e, v1L23e, 0.05, -2.0);

  cascadeLocal(v1L23e, V1_L23_PER_SUB, v2L4e, V2_L4_PER_SUB, 0.65, 8.0, 0.03, 1.5);
  proj(v2L4e, v2L4e, 0.05, -2.0);

  cascadeLocal(v2L4e, V2_L4_PER_SUB, v2L23e, V2_L23_PER_SUB, 0.65, 8.0, 0.03, 1.5);
  proj(v2L23e, v2L23e, 0.05, -2.0);

  cascadeLocal(v2L23e, V2_L23_PER_SUB, v2L5e, V2_L5_PER_SUB, 0.7, 9.0, 0.02, 1.0);
  proj(v2L5e, v2L5e, 0.08, -2.0);

  // ── V2_L5 → OUT cluster-local hard-wire ──
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const v2L5Sub = v2L5e.slice(V2_L5_PER_SUB * ci, V2_L5_PER_SUB * (ci + 1));
    const v2L5SubSet = new Set(v2L5Sub);
    const outSub = outClusters[ci];
    for (const s of v2L5Sub) {
      for (const t of outSub) {
        if (rng.random() < 0.7) {
          const w = 12.0 + rng.uniform(-1.0, 1.0);
          net.connect(s, t, w, 1.0);
        }
      }
    }
    const v2L5Other = v2L5e.filter((n) => !v2L5SubSet.has(n));
    for (const s of v2L5Other) {
      for (const t of outSub) {
        if (rng.random() < 0.05) {
          const w = 3.0 + rng.uniform(-0.3, 0.3);
          net.connect(s, t, w, 1.0);
        }
      }
    }
  }

  // OUT cluster 내부 mutual excitation.
  for (const cluster of outClusters) {
    for (const s of cluster) {
      for (const t of cluster) {
        if (s !== t) net.connect(s, t, 2.0, 0.5);
      }
    }
  }
  // OUT cluster 간 mutual inhibition (WTA).
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    for (let cj = 0; cj < N_CLUSTER; cj += 1) {
      if (ci === cj) continue;
      for (const s of outClusters[ci]) {
        for (const t of outClusters[cj]) {
          net.connect(s, t, -4.0, 0.5);
        }
      }
    }
  }

  // ── 뉴런 파라미터 적용 ──
  for (const n of net.neurons) {
    n.vThreshold = vThreshold;
    n.nmdaEnabled = true;
    n.nmdaThreshold = -65.0;
    n.nmdaGain = 10.0;
  }

  // Phase E1 homeostatic — 모든 excitatory layer + OUT (V1_L4_I 제외).
  const homeostaticNames = [
    ...v1L4e,
    ...v1L23e,
    ...v2L4e,
    ...v2L23e,
    ...v2L5e,
    ...outNeurons,
  ];
  for (const name of homeostaticNames) {
    const n = net.get(name);
    if (!n) continue;
    n.homeostaticEnabled = true;
    n.homeostaticIncrement = 2.0;
    n.homeostaticDecay = 0.995;
  }

  return {
    net,
    neuronsAdded: net.size(),
    synapsesAdded: net.synapses.length - beforeSyn,
    vThreshold,
    inputDim: 16,
    outClusters: N_CLUSTER,
    outTotal: OUT_TOTAL,
    homeostaticNeurons: homeostaticNames.length,
    preset: 'n13_orientation',
  };
}

// 뉴런 이름 헬퍼 — 외부에서 cluster slot lookup 시 사용.
export const N13Names = {
  input: (i: number) => `in_feat_${i}`,
  v1L4E: (i: number) => `v1_L4_E_${i}`,
  v1L4I: (i: number) => `v1_L4_I_${i}`,
  v1L23E: (i: number) => `v1_L23_E_${i}`,
  v2L4E: (i: number) => `v2_L4_E_${i}`,
  v2L23E: (i: number) => `v2_L23_E_${i}`,
  v2L5E: (i: number) => `v2_L5_E_${i}`,
  out: (clusterId: number, neuronIdx: number) => `out_${clusterId}_${neuronIdx}`,
} as const;

export const N13Pools = {
  V1_L4E,
  V1_L4I,
  V1_L23E,
  V2_L4E,
  V2_L23E,
  V2_L5E,
  N_CLUSTER,
  OUT_PER_CLUSTER,
  OUT_TOTAL,
  V1_L4_PER_SUB: V1_L4E / N_CLUSTER,
  V1_L23_PER_SUB: V1_L23E / N_CLUSTER,
  V2_L4_PER_SUB: V2_L4E / N_CLUSTER,
  V2_L23_PER_SUB: V2_L23E / N_CLUSTER,
  V2_L5_PER_SUB: V2_L5E / N_CLUSTER,
} as const;
