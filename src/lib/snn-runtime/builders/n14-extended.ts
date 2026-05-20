// n14 extended substrate — 5×5 input (25-dim raw + 25 derived = 50 dim feature).
//
// n13-orientation 영역 4×4 (16+16=32 dim) capacity ceiling N=8 영역 break 영역 영역
// architecture rework (P218, 2026-05-20). pool size 영역 input dim 영역 정합 영역
// 비례 영역 — V1_L4 32→40, V2_L23 24→32, V2_L5 16→24. OUT cluster_internal +
// WTA -10 영역 보존 (P215d 영역 학술 정합).
//
// Feature engineering (50-dim disjoint, compute50DimFeature 정합):
//   [0..24]  : raw cell (row-major, 5×5)
//   [25..29] : row sums (row0..4) / 5    — 수평 강조
//   [30..34] : col sums (col0..4) / 5    — 수직 강조
//   [35..38] : 4 corner 2×2 quadrants (TL/TR/BL/BR)
//   [39]     : main diagonal (0,6,12,18,24) / 5
//   [40]     : anti diagonal (4,8,12,16,20) / 5
//   [41]     : center 3×3 mean (rows 1-3, cols 1-3)
//   [42]     : plus-sign mask (row 2 + col 2) / 9
//   [43]     : X mask (both diagonals) / 9
//   [44]     : frame border (top+bottom+left+right edges) / 16
//   [45]     : top half (rows 0-1) / 10
//   [46]     : bottom half (rows 3-4) / 10
//   [47]     : left half (cols 0-1) / 10
//   [48]     : right half (cols 3-4) / 10
//   [49]     : center cell (12) — pivot indicator
//
// MAX_CLUSTERS 영역 16 권장 (n13 영역 8 영역 영역 영역 — 25-dim feature space 영역
// 영역 영역 N=12-15 영역 stable capacity 영역 expect). caller 영역 적절 영역 cap 영역.

import { NeuralNetwork } from '../network';
import { Neuron } from '../neuron';
import { SeededRandom } from '../prng';

export interface N14PresetOptions {
  vThreshold?: number;
  clusterActiveInputs?: number[][];
  seed?: number;
  net?: NeuralNetwork;
}

export interface N14PresetResult {
  net: NeuralNetwork;
  neuronsAdded: number;
  synapsesAdded: number;
  vThreshold: number;
  inputDim: 50;
  outClusters: number;
  outTotal: number;
  homeostaticNeurons: number;
  preset: 'n14_extended';
}

export const N_INPUT_N14 = 50 as const;
export const RAW_DIM_N14 = 25 as const;

export function compute50DimFeature(raw25: number[]): number[] {
  if (raw25.length !== 25) throw new Error(`compute50DimFeature: raw must be 25-dim (got ${raw25.length})`);
  const f = raw25.slice(); // [0..24]
  const bit = (i: number): number => (raw25[i] > 0.5 ? 1 : 0);

  // row sums [25..29]
  for (let r = 0; r < 5; r += 1) {
    let s = 0;
    for (let c = 0; c < 5; c += 1) s += bit(r * 5 + c);
    f.push(s / 5);
  }
  // col sums [30..34]
  for (let c = 0; c < 5; c += 1) {
    let s = 0;
    for (let r = 0; r < 5; r += 1) s += bit(r * 5 + c);
    f.push(s / 5);
  }
  // 4 corner 2×2 quadrants [35..38]: TL/TR/BL/BR
  const quads = [
    [0, 1, 5, 6],     // TL (row 0-1, col 0-1)
    [3, 4, 8, 9],     // TR (row 0-1, col 3-4)
    [15, 16, 20, 21], // BL (row 3-4, col 0-1)
    [18, 19, 23, 24], // BR (row 3-4, col 3-4)
  ];
  for (const idxs of quads) {
    let s = 0;
    for (const i of idxs) s += bit(i);
    f.push(s / 4);
  }
  // main diagonal [39]: 0, 6, 12, 18, 24
  f.push((bit(0) + bit(6) + bit(12) + bit(18) + bit(24)) / 5);
  // anti diagonal [40]: 4, 8, 12, 16, 20
  f.push((bit(4) + bit(8) + bit(12) + bit(16) + bit(20)) / 5);
  // center 3×3 [41]: rows 1-3, cols 1-3 (9 cells)
  {
    let s = 0;
    for (let r = 1; r <= 3; r += 1) for (let c = 1; c <= 3; c += 1) s += bit(r * 5 + c);
    f.push(s / 9);
  }
  // plus-sign mask [42]: row 2 (5 cells) + col 2 (5 cells) − center counted once = 9
  {
    const plusIdx = [10, 11, 12, 13, 14, 2, 7, 17, 22];
    let s = 0;
    for (const i of plusIdx) s += bit(i);
    f.push(s / 9);
  }
  // X mask [43]: main diag + anti-diag = 9 cells (center shared)
  {
    const xIdx = [0, 6, 12, 18, 24, 4, 8, 16, 20];
    let s = 0;
    for (const i of xIdx) s += bit(i);
    f.push(s / 9);
  }
  // frame border [44]: top row (5) + bottom row (5) + left col middle (3) + right col middle (3) = 16
  {
    const frameIdx = [0, 1, 2, 3, 4, 20, 21, 22, 23, 24, 5, 10, 15, 9, 14, 19];
    let s = 0;
    for (const i of frameIdx) s += bit(i);
    f.push(s / 16);
  }
  // top half [45]: rows 0-1 (10 cells)
  {
    let s = 0;
    for (let i = 0; i < 10; i += 1) s += bit(i);
    f.push(s / 10);
  }
  // bottom half [46]: rows 3-4 (10 cells)
  {
    let s = 0;
    for (let i = 15; i < 25; i += 1) s += bit(i);
    f.push(s / 10);
  }
  // left half [47]: cols 0-1 (10 cells)
  {
    let s = 0;
    for (let r = 0; r < 5; r += 1) { s += bit(r * 5); s += bit(r * 5 + 1); }
    f.push(s / 10);
  }
  // right half [48]: cols 3-4 (10 cells)
  {
    let s = 0;
    for (let r = 0; r < 5; r += 1) { s += bit(r * 5 + 3); s += bit(r * 5 + 4); }
    f.push(s / 10);
  }
  // center cell [49]: position (2,2) = 12
  f.push(bit(12));

  return f; // length === 50
}

// per-cluster pool size (n13 영역 영역 비례 영역 scale up — 16 → 25 dim 영역 정합).
const OUT_PER_CLUSTER = 8 as const;
const V1_L4_PER_SUB = 40;     // n13: 32 → 40 (×1.25)
const V1_L4I_PER_SUB = 80;    // n13: 64 → 80
const V1_L23_PER_SUB = 40;    // n13: 32 → 40
const V2_L4_PER_SUB = 40;     // n13: 32 → 40
const V2_L23_PER_SUB = 32;    // n13: 24 → 32
const V2_L5_PER_SUB = 24;     // n13: 16 → 24

export function buildN14ExtendedPreset(opts: N14PresetOptions = {}): N14PresetResult {
  const vThreshold = opts.vThreshold ?? -55.0;
  const seed = opts.seed ?? 57;
  const net = opts.net ?? new NeuralNetwork();
  const beforeSyn = net.synapses.length;

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

  // ── 뉴런 등록 ──
  const inputs: string[] = [];
  for (let i = 0; i < N_INPUT_N14; i += 1) inputs.push(`in_feat_${i}`);
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

  // ── INPUT → V1_L4_E (cluster sub-pool, n13 정합) ──
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const localV1 = v1L4e.slice(V1_L4_PER_SUB * ci, V1_L4_PER_SUB * (ci + 1));
    const activeIdx = clusterActive[ci];
    const inactiveIdx: number[] = [];
    for (let i = 0; i < N_INPUT_N14; i += 1) if (!activeIdx.includes(i)) inactiveIdx.push(i);
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

  // V1_L4 lateral inhibition (n13 정합).
  proj(v1L4i, v1L4e, 0.20, -6.0);
  proj(v1L4e, v1L4i, 0.15, 5.0);
  proj(v1L4e, v1L4e, 0.08, -3.0);

  const cascadeLocal = (srcs: string[], srcPerSub: number, tgts: string[], tgtPerSub: number,
                        localDensity: number, localWeight: number,
                        crossDensity: number, crossWeight: number) => {
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

  // rev15 cross-cluster strict 격리 (n13 정합).
  cascadeLocal(v1L4e, V1_L4_PER_SUB, v1L23e, V1_L23_PER_SUB, 0.75, 9.0, 0.03, 1.5);
  proj(v1L23e, v1L23e, 0.05, -2.0);
  cascadeLocal(v1L23e, V1_L23_PER_SUB, v2L4e, V2_L4_PER_SUB, 0.65, 8.0, 0.03, 1.5);
  proj(v2L4e, v2L4e, 0.05, -2.0);
  cascadeLocal(v2L4e, V2_L4_PER_SUB, v2L23e, V2_L23_PER_SUB, 0.65, 8.0, 0.03, 1.5);
  proj(v2L23e, v2L23e, 0.05, -2.0);
  cascadeLocal(v2L23e, V2_L23_PER_SUB, v2L5e, V2_L5_PER_SUB, 0.7, 9.0, 0.02, 1.0);
  proj(v2L5e, v2L5e, 0.08, -2.0);

  // V2_L5 → OUT cluster-local hard-wire (n13 정합).
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

  // OUT cluster 내부 mutual excitation (P215f revert 정합 — 2.0).
  for (const cluster of outClusters) {
    for (const s of cluster) {
      for (const t of cluster) {
        if (s !== t) net.connect(s, t, 2.0, 0.5);
      }
    }
  }
  // OUT cluster 간 mutual inhibition WTA (P215d 정합 — -10.0).
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    for (let cj = 0; cj < N_CLUSTER; cj += 1) {
      if (ci === cj) continue;
      for (const s of outClusters[ci]) {
        for (const t of outClusters[cj]) {
          net.connect(s, t, -10.0, 0.5);
        }
      }
    }
  }

  // ── 뉴런 파라미터 ──
  for (const n of net.neurons) {
    n.vThreshold = vThreshold;
    n.nmdaEnabled = true;
    n.nmdaThreshold = -65.0;
    n.nmdaGain = 10.0;
  }

  const homeostaticNames = [...v1L4e, ...v1L23e, ...v2L4e, ...v2L23e, ...v2L5e, ...outNeurons];
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
    inputDim: 50,
    outClusters: N_CLUSTER,
    outTotal: OUT_TOTAL,
    homeostaticNeurons: homeostaticNames.length,
    preset: 'n14_extended',
  };
}

export const N14Names = {
  input: (i: number) => `in_feat_${i}`,
  v1L4E: (i: number) => `v1_L4_E_${i}`,
  v1L4I: (i: number) => `v1_L4_I_${i}`,
  v1L23E: (i: number) => `v1_L23_E_${i}`,
  v2L4E: (i: number) => `v2_L4_E_${i}`,
  v2L23E: (i: number) => `v2_L23_E_${i}`,
  v2L5E: (i: number) => `v2_L5_E_${i}`,
  out: (clusterId: number, neuronIdx: number) => `out_${clusterId}_${neuronIdx}`,
} as const;

export const N14Pools = {
  OUT_PER_CLUSTER,
  V1_L4_PER_SUB,
  V1_L4I_PER_SUB,
  V1_L23_PER_SUB,
  V2_L4_PER_SUB,
  V2_L23_PER_SUB,
  V2_L5_PER_SUB,
} as const;
