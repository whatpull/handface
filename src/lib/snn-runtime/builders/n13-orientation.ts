// n13 orientation substrate — neuronface modules/network.py rev15 정합 TS 포팅.
//
// Fix #20 (2026-05-10): zero-init dynamic cluster — 직전 fixed N_CLUSTER=4 영역
// 사용자 mental model "1 입력 = 1 cluster" 위배 (vigilance miss 영역 cluster
// 영역 spawn 영역 직전 영역 base 4 cluster 영역 잔여 firing 영역 stale '패턴
// 1..4' 영역 표시). 영역 zero-init 영역 — clusterActive 영역 length 영역 dynamic
// 영역 cluster slot 영역 빌드. zero-init 영역 INPUT 16 영역만 base 영역 — 모든
// cluster 영역 expandCluster 영역 c{N}_ prefix 영역 spawn (사용자 명시 "기존
// 로직 신경쓰지말고" — backward compat 폐기 권한).
//
// 가변 cluster slot 아키텍처 (clusterActive=[] 영역 zero-init, clusterActive 영역
// 길이 N 영역 N cluster):
//   INPUT (16) → V1_L4_E (32×N) → V1_L23_E (32×N) → V2_L4_E (32×N) →
//   V2_L23_E (24×N) → V2_L5_E (16×N) → OUT (8×N).
//   N==0 영역 INPUT 16 영역만 base — V1_L4_I lateral 폐기 (no v1L4e target).
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
  // [N_CLUSTER][active_input_idx] — 미지정 시 zero-init (cluster 0개, INPUT 16
  // 영역만). Fix #20 (2026-05-10): 직전 default 4 cluster 영역 폐기 — 사용자
  // mental model "vigilance miss → cluster spawn 1, 2, 3, ..." 영역 정합.
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
  inputDim: 32;
  // dynamic — clusterActiveInputs.length (0 if zero-init).
  outClusters: number;
  outTotal: number;
  homeostaticNeurons: number;
  preset: 'n13_orientation';
}

// 32-dim disjoint feature — raw 16 + 16 derived (row/col/quadrant/diagonal).
// 수평/수직 패턴 혼동 root fix: row 합계 feature → cluster 0 전담,
// col 합계 feature → cluster 1 전담 → WTA 분리 보장.
//   [0..15]  : raw cell (row-major, 4×4)
//   [16..19] : row sums (row0..3) / 4    — 수평선 강조
//   [20..23] : col sums (col0..3) / 4    — 수직선 강조
//   [24..27] : quadrant averages (TL/TR/BL/BR)
//   [28]     : main diagonal (0,5,10,15) / 4
//   [29]     : anti diagonal (3,6,9,12)  / 4
//   [30]     : middle horizontal rows (row1+row2) / 8
//   [31]     : middle vertical cols (col1+col2) / 8
export const N_INPUT = 32 as const;

export function compute32DimFeature(raw16: number[]): number[] {
  const f = raw16.slice(); // [0..15]
  // row sums [16..19]
  for (let r = 0; r < 4; r += 1) {
    let s = 0;
    for (let c = 0; c < 4; c += 1) s += (raw16[r * 4 + c] > 0.5 ? 1 : 0);
    f.push(s / 4);
  }
  // col sums [20..23]
  for (let c = 0; c < 4; c += 1) {
    let s = 0;
    for (let r = 0; r < 4; r += 1) s += (raw16[r * 4 + c] > 0.5 ? 1 : 0);
    f.push(s / 4);
  }
  // quadrant averages [24..27]: TL/TR/BL/BR (each 2×2)
  const quads = [
    [0, 1, 4, 5],   // TL
    [2, 3, 6, 7],   // TR
    [8, 9, 12, 13], // BL
    [10, 11, 14, 15], // BR
  ];
  for (const idxs of quads) {
    let s = 0;
    for (const i of idxs) s += (raw16[i] > 0.5 ? 1 : 0);
    f.push(s / 4);
  }
  // main diagonal [28]: 0,5,10,15
  f.push(((raw16[0] > 0.5 ? 1 : 0) + (raw16[5] > 0.5 ? 1 : 0) + (raw16[10] > 0.5 ? 1 : 0) + (raw16[15] > 0.5 ? 1 : 0)) / 4);
  // anti diagonal [29]: 3,6,9,12
  f.push(((raw16[3] > 0.5 ? 1 : 0) + (raw16[6] > 0.5 ? 1 : 0) + (raw16[9] > 0.5 ? 1 : 0) + (raw16[12] > 0.5 ? 1 : 0)) / 4);
  // middle horizontal rows [30]: row1(4..7)+row2(8..11) / 8
  {
    let s = 0;
    for (let i = 4; i < 12; i += 1) s += (raw16[i] > 0.5 ? 1 : 0);
    f.push(s / 8);
  }
  // middle vertical cols [31]: col1(1,5,9,13)+col2(2,6,10,14) / 8
  {
    const midColIdx = [1, 5, 9, 13, 2, 6, 10, 14];
    let s = 0;
    for (const i of midColIdx) s += (raw16[i] > 0.5 ? 1 : 0);
    f.push(s / 8);
  }
  return f; // length === 32
}

// 4-cluster orientation 기본 매핑 — test / explicit caller 영역만 사용.
// runtime 영역 zero-init (clusterActiveInputs=[]) 영역 default.
// 32-dim disjoint feature 기반 (compute32DimFeature 정합):
//   cluster 0 (─ horizontal): row sum features [16..19] — 수평 강조
//   cluster 1 (│ vertical):   col sum features [20..23] — 수직 강조
//   cluster 2 (╲ diag-back):  main diag [28] + quadrant TL/BR [24,27]
//   cluster 3 (╱ diag-fore):  anti diag [29] + quadrant TR/BL [25,26]
export const LEGACY_FOUR_CLUSTER_INPUTS: number[][] = [
  [16, 17, 18, 19], //   ─ horizontal: row sums
  [20, 21, 22, 23], //   │ vertical: col sums
  [28, 24, 27], //       ╲ diag-back: main diag + TL/BR quadrant
  [29, 25, 26], //       ╱ diag-fore: anti diag + TR/BL quadrant
];

// per-cluster pool size (expandCluster 영역 신규 cluster spawn 영역 정합).
const OUT_PER_CLUSTER = 8 as const;
const V1_L4_PER_SUB = 32;
const V1_L4I_PER_SUB = 64; // base lateral inhibitory — N=0 영역 폐기.
const V1_L23_PER_SUB = 32;
const V2_L4_PER_SUB = 32;
const V2_L23_PER_SUB = 24;
const V2_L5_PER_SUB = 16;

export function buildN13OrientationPreset(opts: N13PresetOptions = {}): N13PresetResult {
  const vThreshold = opts.vThreshold ?? -55.0;
  const seed = opts.seed ?? 57;
  const net = opts.net ?? new NeuralNetwork();
  const beforeSyn = net.synapses.length;

  // Fix #20 (2026-05-10): zero-init default — clusterActiveInputs 미지정 시 [].
  // 사용자 명시 "기존 로직 신경쓰지말고" — backward compat 폐기.
  const clusterActive = opts.clusterActiveInputs ?? [];
  const N_CLUSTER = clusterActive.length;

  // 동적 pool size — N==0 영역 모든 base cluster pool 영역 0.
  const V1_L4E = V1_L4_PER_SUB * N_CLUSTER;
  const V1_L4I = V1_L4I_PER_SUB * N_CLUSTER;
  const V1_L23E = V1_L23_PER_SUB * N_CLUSTER;
  const V2_L4E = V2_L4_PER_SUB * N_CLUSTER;
  const V2_L23E = V2_L23_PER_SUB * N_CLUSTER;
  const V2_L5E = V2_L5_PER_SUB * N_CLUSTER;
  const OUT_TOTAL = OUT_PER_CLUSTER * N_CLUSTER;

  const rng = new SeededRandom(seed);

  // ── 뉴런 등록 ──
  // 32-dim disjoint feature: raw 16 + derived 16 (compute32DimFeature 정합).
  const inputs: string[] = [];
  for (let i = 0; i < N_INPUT; i += 1) inputs.push(`in_feat_${i}`);
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
  // Fix #20 (2026-05-10): N==0 영역 본 loop 영역 자연 skip — INPUT 영역만 base.
  for (let ci = 0; ci < N_CLUSTER; ci += 1) {
    const localV1 = v1L4e.slice(V1_L4_PER_SUB * ci, V1_L4_PER_SUB * (ci + 1));
    const activeIdx = clusterActive[ci];
    const inactiveIdx: number[] = [];
    for (let i = 0; i < N_INPUT; i += 1) {
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

  // V1_L4 lateral inhibition — N==0 영역 v1L4i / v1L4e 영역 빈 array 영역
  // proj 영역 zero iteration 영역 자연 skip.
  proj(v1L4i, v1L4e, 0.20, -6.0);
  proj(v1L4e, v1L4i, 0.15, 5.0);
  proj(v1L4e, v1L4e, 0.08, -3.0);

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
  // PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner 정정,
  // 2026-05-10): 직전 weight=-4.0 영역 idx overlap (mathematical impossible)
  // + STDP 누적 영역 winner mismatch root cause 영역 mitigation. -4.0 → -8.0
  // 영역 강화 영역 학술 정합 — Diehl & Cook 2015 "strong inhibitory pool"
  // (§3.2, lateral inhibition weight 영역 typical excitatory 5-10× 범위) 영역
  // ratio 정합. follow-up PR (Option A — 32-dim disjoint feature engineering)
  // 영역 본격 root fix.
  // P215d (2026-05-19) — WTA margin 강화 -8.0 → -10.0. 노이즈 인풋 영역
  // 명확한 winner 영역 도출 영역 receptive field 분리 영역 추가 강화 — P215b
  // 노이즈 augmentation 영역 cluster receptive field 영역 확장 영역 cluster
  // 간 overlap 증가 영역 risk 영역 lateral inhibition 영역 ratio 영역 보강.
  // Diehl & Cook 2015 typical excitatory:inhibitory ratio 영역 12.0:10.0 영역
  // 약 1:0.83 영역 정합 (excit 12.0 → inhib 10.0).
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
    inputDim: 32,
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

// per-cluster pool size 영역 expandCluster (art.ts) 영역 신규 cluster 영역 spawn
// 영역 정합. Fix #20 (2026-05-10): zero-init 영역 N_CLUSTER 영역 dynamic 영역 —
// 본 N13Pools 영역 "per-cluster" 상수 영역만 노출 (총 base pool 영역 폐기 —
// caller 영역 N_CLUSTER × per-sub 영역 의미 영역 stale).
export const N13Pools = {
  OUT_PER_CLUSTER,
  V1_L4_PER_SUB,
  V1_L4I_PER_SUB,
  V1_L23_PER_SUB,
  V2_L4_PER_SUB,
  V2_L23_PER_SUB,
  V2_L5_PER_SUB,
} as const;
