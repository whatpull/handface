// n15 extended substrate — 6×6 input (36-dim raw + 36 derived = 72 dim feature).
//
// P220 (2026-05-25, Task 4) — P218 영역 5×5 (50-dim) 영역 영역 영역 6×6 (72-dim)
// 영역 substrate dimensionality 영역 영역 영역 확장. 9-substrate ensemble
// (1 × 4×4 + 4 × 5×5 + 4 × 6×6) 영역 component.
//
// Feature engineering (72-dim disjoint, compute72DimFeature 정합):
//   [0..35]  : raw cell (row-major, 6×6)
//   [36..41] : row sums (row 0..5) / 6
//   [42..47] : col sums (col 0..5) / 6
//   [48..51] : 4 corner 3×3 quadrants (TL/TR/BL/BR)
//   [52]     : main diagonal (0,7,14,21,28,35) / 6
//   [53]     : anti diagonal (5,10,15,20,25,30) / 6
//   [54]     : center 2×2 (14,15,20,21) / 4
//   [55]     : plus mask (row 2 + col 2 — overlap) / 11
//   [56]     : X mask (both diagonals) / 12
//   [57]     : frame border (top/bot rows + left/right edges) / 20
//   [58..61] : 4 halves (top/bot/left/right)
//   [62..67] : 6 thirds (top/mid/bot rows of 2, left/mid/right cols of 2) — finer detail
//   [68..71] : 4 inner 4×4 quadrants (smaller TL/TR/BL/BR)

import { NeuralNetwork } from '../network';
import { Neuron } from '../neuron';
import { SeededRandom } from '../prng';

export interface N15PresetOptions {
  vThreshold?: number;
  clusterActiveInputs?: number[][];
  seed?: number;
  net?: NeuralNetwork;
}

export interface N15PresetResult {
  net: NeuralNetwork;
  neuronsAdded: number;
  synapsesAdded: number;
  vThreshold: number;
  inputDim: 72;
  outClusters: number;
  outTotal: number;
  homeostaticNeurons: number;
  preset: 'n15_extended_6x6';
}

export const N_INPUT_N15 = 72 as const;
export const RAW_DIM_N15 = 36 as const;

export function compute72DimFeature(raw36: number[]): number[] {
  if (raw36.length !== 36) throw new Error(`compute72DimFeature: raw must be 36-dim (got ${raw36.length})`);
  const f = raw36.slice(); // [0..35]
  const bit = (i: number): number => (raw36[i] > 0.5 ? 1 : 0);

  // row sums [36..41]
  for (let r = 0; r < 6; r += 1) {
    let s = 0;
    for (let c = 0; c < 6; c += 1) s += bit(r * 6 + c);
    f.push(s / 6);
  }
  // col sums [42..47]
  for (let c = 0; c < 6; c += 1) {
    let s = 0;
    for (let r = 0; r < 6; r += 1) s += bit(r * 6 + c);
    f.push(s / 6);
  }
  // 4 corner 3×3 quadrants [48..51]
  const quads = [
    [0, 1, 2, 6, 7, 8, 12, 13, 14],         // TL (rows 0-2, cols 0-2)
    [3, 4, 5, 9, 10, 11, 15, 16, 17],       // TR (rows 0-2, cols 3-5)
    [18, 19, 20, 24, 25, 26, 30, 31, 32],   // BL (rows 3-5, cols 0-2)
    [21, 22, 23, 27, 28, 29, 33, 34, 35],   // BR (rows 3-5, cols 3-5)
  ];
  for (const idxs of quads) {
    let s = 0;
    for (const i of idxs) s += bit(i);
    f.push(s / 9);
  }
  // main diagonal [52]: 0, 7, 14, 21, 28, 35
  f.push((bit(0) + bit(7) + bit(14) + bit(21) + bit(28) + bit(35)) / 6);
  // anti diagonal [53]: 5, 10, 15, 20, 25, 30
  f.push((bit(5) + bit(10) + bit(15) + bit(20) + bit(25) + bit(30)) / 6);
  // center 2×2 [54]: 14, 15, 20, 21
  f.push((bit(14) + bit(15) + bit(20) + bit(21)) / 4);
  // plus mask [55]: row 2 (12-17) + col 2 (2,8,14,20,26,32) — center overlap 14 counted once = 11 cells
  {
    const plusIdx = [12, 13, 14, 15, 16, 17, 2, 8, 20, 26, 32];
    let s = 0;
    for (const i of plusIdx) s += bit(i);
    f.push(s / 11);
  }
  // X mask [56]: main + anti diagonals = 12 cells (no center single overlap for 6×6 even grid)
  {
    const xIdx = [0, 7, 14, 21, 28, 35, 5, 10, 15, 20, 25, 30];
    let s = 0;
    for (const i of xIdx) s += bit(i);
    f.push(s / 12);
  }
  // frame border [57]: top (0-5) + bot (30-35) + left col mids (6,12,18,24) + right col mids (11,17,23,29) = 20
  {
    const frameIdx = [0, 1, 2, 3, 4, 5, 30, 31, 32, 33, 34, 35, 6, 12, 18, 24, 11, 17, 23, 29];
    let s = 0;
    for (const i of frameIdx) s += bit(i);
    f.push(s / 20);
  }
  // top half [58]: rows 0-2 (18 cells)
  { let s = 0; for (let i = 0; i < 18; i += 1) s += bit(i); f.push(s / 18); }
  // bottom half [59]: rows 3-5 (18 cells)
  { let s = 0; for (let i = 18; i < 36; i += 1) s += bit(i); f.push(s / 18); }
  // left half [60]: cols 0-2 (18 cells)
  { let s = 0; for (let r = 0; r < 6; r += 1) for (let c = 0; c < 3; c += 1) s += bit(r * 6 + c); f.push(s / 18); }
  // right half [61]: cols 3-5 (18 cells)
  { let s = 0; for (let r = 0; r < 6; r += 1) for (let c = 3; c < 6; c += 1) s += bit(r * 6 + c); f.push(s / 18); }
  // 6 thirds [62..67]: top/mid/bot rows of 2 (12 cells each), left/mid/right cols of 2 (12 cells each)
  // top 2 rows [62]
  { let s = 0; for (let i = 0; i < 12; i += 1) s += bit(i); f.push(s / 12); }
  // mid 2 rows [63]
  { let s = 0; for (let i = 12; i < 24; i += 1) s += bit(i); f.push(s / 12); }
  // bot 2 rows [64]
  { let s = 0; for (let i = 24; i < 36; i += 1) s += bit(i); f.push(s / 12); }
  // left 2 cols [65]
  { let s = 0; for (let r = 0; r < 6; r += 1) { s += bit(r * 6); s += bit(r * 6 + 1); } f.push(s / 12); }
  // mid 2 cols [66]
  { let s = 0; for (let r = 0; r < 6; r += 1) { s += bit(r * 6 + 2); s += bit(r * 6 + 3); } f.push(s / 12); }
  // right 2 cols [67]
  { let s = 0; for (let r = 0; r < 6; r += 1) { s += bit(r * 6 + 4); s += bit(r * 6 + 5); } f.push(s / 12); }
  // 4 inner 4×4 quadrants (smaller TL/TR/BL/BR within central 4×4 region) [68..71]
  // For 6×6, inner region cells 7-10, 13-16, 19-22, 25-28 form inner 4×4
  // Sub-quadrants of this inner region:
  const innerQuads = [
    [7, 8, 13, 14],    // inner TL (2×2)
    [9, 10, 15, 16],   // inner TR
    [19, 20, 25, 26],  // inner BL
    [21, 22, 27, 28],  // inner BR
  ];
  for (const idxs of innerQuads) {
    let s = 0;
    for (const i of idxs) s += bit(i);
    f.push(s / 4);
  }

  return f; // length === 72
}

// per-cluster pool size — 5×5 영역 영역 비례 영역 6×6 영역 scale up (50 → 72 dim).
// V1_L4 40→56, V1_L23 40→56, V2_L4 40→56, V2_L23 32→44, V2_L5 24→32.
const OUT_PER_CLUSTER = 8 as const;
const V1_L4_PER_SUB = 56;
const V1_L4I_PER_SUB = 112;
const V1_L23_PER_SUB = 56;
const V2_L4_PER_SUB = 56;
const V2_L23_PER_SUB = 44;
const V2_L5_PER_SUB = 32;

export function buildN15Extended6x6Preset(opts: N15PresetOptions = {}): N15PresetResult {
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
  for (let i = 0; i < N_INPUT_N15; i += 1) inputs.push(`in_feat_${i}`);
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
  // P220 (2026-05-25 Task 4 후속): 72-dim feature space 영역 active inputs 영역
  // sparser (Bottom row 영역 12 active out of 72 dim 영역 spread) 영역 영역 —
  // base weight 11.0 영역 cascade 영역 V2_L5 → OUT 영역 영역 영역 영역 영역.
  // base weight 14.0 영역 영역 영역 single-row/col 영역 cluster 영역 reliable
  // 영역 OUT activation 영역 영역 (Bottom row → -1 학습 실패 fix 시도).
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const localV1 = v1L4e.slice(V1_L4_PER_SUB * ci, V1_L4_PER_SUB * (ci + 1));
    const activeIdx = clusterActive[ci];
    for (const ai of activeIdx) {
      for (const t of localV1) {
        const w = 14.0 + rng.uniform(-1.0, 1.0);
        net.connect(inputs[ai], t, w, 1.0);
      }
    }
  }

  // V1_L4 lateral inhibition
  proj(v1L4i, v1L4e, 0.20, -6.0);
  proj(v1L4e, v1L4i, 0.15, 5.0);
  proj(v1L4e, v1L4e, 0.08, -3.0);

  // Cascade local (intra-cluster)
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

  // V2_L5 → OUT (cluster-local)
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const v2L5Sub = v2L5e.slice(V2_L5_PER_SUB * ci, V2_L5_PER_SUB * (ci + 1));
    for (const s of v2L5Sub) {
      for (const t of outClusters[ci]) {
        const w = 16.0 + rng.uniform(-1.0, 1.0);
        net.connect(s, t, w, 1.0);
      }
    }
  }

  // OUT cross-cluster WTA (-10)
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

  // OUT intra-cluster mutual excitation (1.0)
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    for (const s of outClusters[ci]) {
      for (const t of outClusters[ci]) {
        if (s !== t) net.connect(s, t, 1.0, 0.5);
      }
    }
  }

  // Homeostatic neurons (all V1/V2/OUT excitatory)
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
    inputDim: 72,
    outClusters: N_CLUSTER,
    outTotal: OUT_TOTAL,
    homeostaticNeurons: homeostaticNames.length,
    preset: 'n15_extended_6x6',
  };
}

export const N15Names = {
  input: (i: number) => `in_feat_${i}`,
  v1L4E: (i: number) => `v1_L4_E_${i}`,
  v1L4I: (i: number) => `v1_L4_I_${i}`,
  v1L23E: (i: number) => `v1_L23_E_${i}`,
  v2L4E: (i: number) => `v2_L4_E_${i}`,
  v2L23E: (i: number) => `v2_L23_E_${i}`,
  v2L5E: (i: number) => `v2_L5_E_${i}`,
  out: (clusterId: number, neuronIdx: number) => `out_${clusterId}_${neuronIdx}`,
} as const;

export const N15Pools = {
  OUT_PER_CLUSTER,
  V1_L4_PER_SUB,
  V1_L4I_PER_SUB,
  V1_L23_PER_SUB,
  V2_L4_PER_SUB,
  V2_L23_PER_SUB,
  V2_L5_PER_SUB,
} as const;
