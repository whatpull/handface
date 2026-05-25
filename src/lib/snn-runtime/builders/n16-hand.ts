// n16 hand substrate — 75-dim hand feature input (MediaPipe Hand landmarks).
//
// SNN Perfect Brain Roadmap Phase 1.1 (사용자 비전 — SNN 중심).
// hand-spike-encoder.ts 영역 75 dim feature 영역 입력 영역 영역 substrate.
// n13 (32 dim) / n14 (50 dim) / n15 (72 dim) 영역 패턴 영역 75 dim 영역 영역.
//
// Pool sizing (n15 영역 영역 비례, sub-linear scaling):
//   V1_L4: 56 (n15 영역 영역), V1_L23: 56, V2_L4: 56, V2_L23: 44, V2_L5: 32
//   OUT_PER_CLUSTER: 8 (consistent).
//
// 학술 정합: continuous (graded) input → spike rate coding, hand-specific
// derived features (finger extensions, palm orientation) 영역 substrate 영역
// 자연 통합.

import { NeuralNetwork } from '../network';
import { Neuron } from '../neuron';
import { SeededRandom } from '../prng';

export interface N16PresetOptions {
  vThreshold?: number;
  clusterActiveInputs?: number[][];
  seed?: number;
  net?: NeuralNetwork;
}

export interface N16PresetResult {
  net: NeuralNetwork;
  neuronsAdded: number;
  synapsesAdded: number;
  vThreshold: number;
  inputDim: 75;
  outClusters: number;
  outTotal: number;
  homeostaticNeurons: number;
  preset: 'n16_hand';
}

export const N_INPUT_N16 = 75 as const;
export const RAW_DIM_N16 = 63 as const; // 21 landmarks × 3 coords

// Per-cluster pool size (n15 영역 영역 영역 영역, hand 영역 영역 derived feature
// 영역 영역 영역 영역 영역 영역 영역 sub-linear scaling).
const OUT_PER_CLUSTER = 8 as const;
const V1_L4_PER_SUB = 56;
const V1_L4I_PER_SUB = 112;
const V1_L23_PER_SUB = 56;
const V2_L4_PER_SUB = 56;
const V2_L23_PER_SUB = 44;
const V2_L5_PER_SUB = 32;

export function buildN16HandPreset(opts: N16PresetOptions = {}): N16PresetResult {
  const vThreshold = opts.vThreshold ?? -55.0;
  const seed = opts.seed ?? 57;
  const net = opts.net ?? new NeuralNetwork();
  const beforeSyn = net.synapses.length;
  const beforeN = net.size();

  const clusterActive = opts.clusterActiveInputs ?? [];
  const N_CLUSTER = clusterActive.length;

  const V1_L4E = V1_L4_PER_SUB * N_CLUSTER;
  const V1_L4I = V1_L4I_PER_SUB * N_CLUSTER;
  const V1_L23E = V1_L23_PER_SUB * N_CLUSTER;
  const V2_L4E = V2_L4_PER_SUB * N_CLUSTER;
  const V2_L23E = V2_L23_PER_SUB * N_CLUSTER;
  const V2_L5E = V2_L5_PER_SUB * N_CLUSTER;
  const OUT_TOTAL = OUT_PER_CLUSTER * N_CLUSTER;

  const rng = new SeededRandom(seed);

  const inputs: string[] = [];
  for (let i = 0; i < N_INPUT_N16; i += 1) inputs.push(`in_feat_${i}`);
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

  const addPop = (names: string[], region: string, population: string) => {
    for (const n of names) net.addNeuron(new Neuron({ name: n, region, population }));
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
  const proj = (srcs: string[], tgts: string[], density: number, weight: number,
                delay: number = 1.0, jitter: number = 0.0) => {
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

  // INPUT → V1_L4_E (cluster sub-pool 영역 active inputs 영역 dense wire).
  // Hand feature 영역 graded input 영역 영역 (continuous, 영역 binary 영역) — 영역
  // 영역 영역 영역 영역 영역 영역 영역 영역 12.0 영역 영역 (영역 영역 영역 영역).
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const localV1 = v1L4e.slice(V1_L4_PER_SUB * ci, V1_L4_PER_SUB * (ci + 1));
    const activeIdx = clusterActive[ci];
    for (const ai of activeIdx) {
      for (const t of localV1) {
        const w = 12.0 + rng.uniform(-1.0, 1.0);
        net.connect(inputs[ai], t, w, 1.0);
      }
    }
  }

  // V1_L4 lateral inhibition.
  proj(v1L4i, v1L4e, 0.20, -6.0);
  proj(v1L4e, v1L4i, 0.15, 5.0);
  proj(v1L4e, v1L4e, 0.08, -3.0);

  // Cascade local (intra-cluster).
  const cascadeLocal = (srcs: string[], srcPerSub: number, tgts: string[], tgtPerSub: number,
                        localDensity: number, localWeight: number, jitter: number = 1.0) => {
    for (let ci = 0; ci < N_CLUSTER; ci += 1) {
      const localSrc = srcs.slice(srcPerSub * ci, srcPerSub * (ci + 1));
      const localTgt = tgts.slice(tgtPerSub * ci, tgtPerSub * (ci + 1));
      for (const s of localSrc) {
        for (const t of localTgt) {
          if (rng.random() < localDensity) {
            const w = localWeight + rng.uniform(-jitter, jitter);
            net.connect(s, t, w, 1.0);
          }
        }
      }
    }
  };

  cascadeLocal(v1L4e, V1_L4_PER_SUB, v1L23e, V1_L23_PER_SUB, 0.75, 9.0);
  cascadeLocal(v1L23e, V1_L23_PER_SUB, v2L4e, V2_L4_PER_SUB, 0.65, 8.0);
  cascadeLocal(v2L4e, V2_L4_PER_SUB, v2L23e, V2_L23_PER_SUB, 0.65, 8.0);
  cascadeLocal(v2L23e, V2_L23_PER_SUB, v2L5e, V2_L5_PER_SUB, 0.7, 9.0);

  // V2_L5 → OUT (cluster-local).
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const v2L5Sub = v2L5e.slice(V2_L5_PER_SUB * ci, V2_L5_PER_SUB * (ci + 1));
    for (const s of v2L5Sub) {
      for (const t of outClusters[ci]) {
        const w = 16.0 + rng.uniform(-1.0, 1.0);
        net.connect(s, t, w, 1.0);
      }
    }
  }

  // OUT cross-cluster WTA (-10).
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    for (let cj = ci + 1; cj < N_CLUSTER; cj += 1) {
      for (const s of outClusters[ci]) {
        for (const t of outClusters[cj]) {
          net.connect(s, t, -10.0, 0.5);
          net.connect(t, s, -10.0, 0.5);
        }
      }
    }
  }

  // OUT intra-cluster mutual excitation (+1.0).
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    for (const s of outClusters[ci]) {
      for (const t of outClusters[ci]) {
        if (s !== t) net.connect(s, t, 1.0, 0.5);
      }
    }
  }

  // Homeostatic neurons.
  const homeostaticNames: string[] = [];
  for (const name of v1L4e) homeostaticNames.push(name);
  for (const name of v1L23e) homeostaticNames.push(name);
  for (const name of v2L4e) homeostaticNames.push(name);
  for (const name of v2L23e) homeostaticNames.push(name);
  for (const name of v2L5e) homeostaticNames.push(name);
  for (const cluster of outClusters) for (const name of cluster) homeostaticNames.push(name);
  for (const name of homeostaticNames) {
    const n = net.get(name);
    if (n !== null) {
      n.homeostaticEnabled = true;
      n.homeostaticIncrement = 2.0;
      n.homeostaticDecay = 0.995;
      n.nmdaEnabled = true;
      n.nmdaThreshold = -65.0;
      n.nmdaGain = 10.0;
      n.vThreshold = vThreshold;
    }
  }

  return {
    net,
    neuronsAdded: net.size() - beforeN,
    synapsesAdded: net.synapses.length - beforeSyn,
    vThreshold,
    inputDim: 75,
    outClusters: N_CLUSTER,
    outTotal: OUT_TOTAL,
    homeostaticNeurons: homeostaticNames.length,
    preset: 'n16_hand',
  };
}

export const N16Names = {
  input: (i: number) => `in_feat_${i}`,
  v1L4E: (i: number) => `v1_L4_E_${i}`,
  v1L4I: (i: number) => `v1_L4_I_${i}`,
  v1L23E: (i: number) => `v1_L23_E_${i}`,
  v2L4E: (i: number) => `v2_L4_E_${i}`,
  v2L23E: (i: number) => `v2_L23_E_${i}`,
  v2L5E: (i: number) => `v2_L5_E_${i}`,
  out: (clusterId: number, neuronIdx: number) => `out_${clusterId}_${neuronIdx}`,
} as const;

export const N16Pools = {
  OUT_PER_CLUSTER,
  V1_L4_PER_SUB,
  V1_L4I_PER_SUB,
  V1_L23_PER_SUB,
  V2_L4_PER_SUB,
  V2_L23_PER_SUB,
  V2_L5_PER_SUB,
} as const;
