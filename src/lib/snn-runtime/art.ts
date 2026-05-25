// ART (Adaptive Resonance Theory) vigilance + dynamic cluster expansion.
//
// 학술 출처:
//   Carpenter & Grossberg (1987) — pattern recognition by self-organizing
//     neural network.
//   Grossberg (2013) — Adaptive Resonance Theory: how a brain learns to
//     consciously attend, learn, and recognize a changing world.
//
// 핵심 아이디어:
//   - Bottom-up: 입력 → cluster 활성도 (V1_L23 / V2_L5 firing rate 기반).
//   - Match score: winner cluster 의 share 또는 margin.
//   - Vigilance test: match < ρ 면 reset → 새 cluster 슬롯 할당.
//
// 본 모듈의 역할 한계:
//   - "기존 회로 측정 + 확장 primitive" 만 제공. 실제 train loop / reward
//     스케줄링은 호출자 (NodeLearn / Web Worker 등) 가 결정.
//   - n13_orientation 빌더와 결합 가능. 다른 빌더에도 generic 적용 (cluster
//     슬롯 정보를 ClusterRegistry 로 추상화).

import { N13Pools } from './builders/n13-orientation';
import { N14Pools, N_INPUT_N14 } from './builders/n14-extended';
import { type SpikeMonitor } from './monitor';
import { NeuralNetwork } from './network';
import { Neuron } from './neuron';
import { SeededRandom } from './prng';

// 한 cluster slot 의 layer 별 뉴런 이름. n13 빌더의 슬롯 구조와 정합.
export interface ClusterSlot {
  id: number;
  v1L4E: string[];
  v1L23E: string[];
  v2L4E: string[];
  v2L23E: string[];
  v2L5E: string[];
  out: string[];
  activeInputs: number[]; // 본 cluster 가 받는 active input feature index.
}

// cluster 슬롯 레지스트리. n13 빌드 결과로 초기화 후 expand 시 업데이트.
export interface ClusterRegistry {
  slots: ClusterSlot[];
  // pool 크기 (per-cluster). 확장 시 같은 크기로 추가.
  v1L4PerSub: number;
  v1L23PerSub: number;
  v2L4PerSub: number;
  v2L23PerSub: number;
  v2L5PerSub: number;
  outPerCluster: number;
  inputDim: number; // 32 (n13 32-dim disjoint feature).
}

// P218 (2026-05-21) — substrate-aware registry. preset 영역 N13Pools / N14Pools
// 영역 dispatch + inputDim 영역 32 / 50 영역 자동 정합. art.ts:expandCluster
// 영역 영역 registry.v*PerSub / inputDim 영역 사용 영역 자연 정합 영역.
export function buildClusterRegistryFromN13(
  activeInputsDefault: number[][],
  preset: 'n13_orientation' | 'n14_extended' = 'n13_orientation',
): ClusterRegistry {
  const pools = preset === 'n14_extended' ? N14Pools : N13Pools;
  const inputDim = preset === 'n14_extended' ? N_INPUT_N14 : 32;
  // Fix #20 (2026-05-10): zero-init dynamic — N_CLUSTER 영역 activeInputsDefault.length
  // 영역 derive (직전 N13Pools.N_CLUSTER=4 fixed 영역 폐기). zero-init (length=0) 영역
  // 슬롯 0 영역 시작 — expandCluster 영역 c{N}_ prefix 영역 신규 cluster spawn.
  const slots: ClusterSlot[] = [];
  const nCluster = activeInputsDefault.length;
  for (let ci = 0; ci < nCluster; ci += 1) {
    const v1L4E: string[] = [];
    for (let i = pools.V1_L4_PER_SUB * ci; i < pools.V1_L4_PER_SUB * (ci + 1); i += 1) {
      v1L4E.push(`v1_L4_E_${i}`);
    }
    const v1L23E: string[] = [];
    for (let i = pools.V1_L23_PER_SUB * ci; i < pools.V1_L23_PER_SUB * (ci + 1); i += 1) {
      v1L23E.push(`v1_L23_E_${i}`);
    }
    const v2L4E: string[] = [];
    for (let i = pools.V2_L4_PER_SUB * ci; i < pools.V2_L4_PER_SUB * (ci + 1); i += 1) {
      v2L4E.push(`v2_L4_E_${i}`);
    }
    const v2L23E: string[] = [];
    for (let i = pools.V2_L23_PER_SUB * ci; i < pools.V2_L23_PER_SUB * (ci + 1); i += 1) {
      v2L23E.push(`v2_L23_E_${i}`);
    }
    const v2L5E: string[] = [];
    for (let i = pools.V2_L5_PER_SUB * ci; i < pools.V2_L5_PER_SUB * (ci + 1); i += 1) {
      v2L5E.push(`v2_L5_E_${i}`);
    }
    const out: string[] = [];
    for (let i = 0; i < pools.OUT_PER_CLUSTER; i += 1) out.push(`out_${ci}_${i}`);
    slots.push({
      id: ci,
      v1L4E,
      v1L23E,
      v2L4E,
      v2L23E,
      v2L5E,
      out,
      activeInputs: activeInputsDefault[ci],
    });
  }
  return {
    slots,
    v1L4PerSub: pools.V1_L4_PER_SUB,
    v1L23PerSub: pools.V1_L23_PER_SUB,
    v2L4PerSub: pools.V2_L4_PER_SUB,
    v2L23PerSub: pools.V2_L23_PER_SUB,
    v2L5PerSub: pools.V2_L5_PER_SUB,
    outPerCluster: pools.OUT_PER_CLUSTER,
    inputDim,
  };
}

// 토폴로지로부터 cluster 슬롯 추론 — restoreSnapshot 이후 사용.
// 본 함수는 net 의 neuron 이름을 스캔해 base/expanded cluster 를 모두 발견.
//   base: v1_L4_E_{i} (i = 0 .. N13Pools.V1_L4E-1) → 4 cluster
//   expanded: c{N}_v1_L4_E_{i} (N = 4, 5, ...) → user cluster
// activeInputs 는 토폴로지에서 직접 알 수 없으므로 빈 배열로 둠 (UI metadata).
// P218 (2026-05-21): preset 영역 hint 영역 영역 영역 substrate-aware (default n13).
export function inferClusterRegistry(
  neuronNames: Iterable<string>,
  preset: 'n13_orientation' | 'n14_extended' = 'n13_orientation',
): ClusterRegistry {
  const pools = preset === 'n14_extended' ? N14Pools : N13Pools;
  const inputDim = preset === 'n14_extended' ? N_INPUT_N14 : 32;
  const v1L4PerSub = pools.V1_L4_PER_SUB;
  const v1L23PerSub = pools.V1_L23_PER_SUB;
  const v2L4PerSub = pools.V2_L4_PER_SUB;
  const v2L23PerSub = pools.V2_L23_PER_SUB;
  const v2L5PerSub = pools.V2_L5_PER_SUB;
  const outPerCluster = pools.OUT_PER_CLUSTER;

  // discovery: cluster id 별 layer 별 이름을 모은다.
  const buckets = new Map<number, ClusterSlot>();
  const ensure = (id: number): ClusterSlot => {
    let s = buckets.get(id);
    if (!s) {
      s = { id, v1L4E: [], v1L23E: [], v2L4E: [], v2L23E: [], v2L5E: [], out: [], activeInputs: [] };
      buckets.set(id, s);
    }
    return s;
  };

  // base 슬롯 — N13Pools 의 per-sub 만큼 4 cluster 로 분할.
  // expanded 슬롯 — c{N}_ prefix 로 식별.
  for (const name of neuronNames) {
    // expanded patterns first.
    const me = /^c(\d+)_(v1_L4_E|v1_L23_E|v2_L4_E|v2_L23_E|v2_L5_E)_/.exec(name);
    if (me) {
      const id = Number(me[1]);
      const layer = me[2];
      const s = ensure(id);
      if (layer === 'v1_L4_E') s.v1L4E.push(name);
      else if (layer === 'v1_L23_E') s.v1L23E.push(name);
      else if (layer === 'v2_L4_E') s.v2L4E.push(name);
      else if (layer === 'v2_L23_E') s.v2L23E.push(name);
      else if (layer === 'v2_L5_E') s.v2L5E.push(name);
      continue;
    }
    // base patterns.
    const v1L4 = /^v1_L4_E_(\d+)$/.exec(name);
    if (v1L4) {
      const idx = Number(v1L4[1]);
      const id = Math.floor(idx / v1L4PerSub);
      ensure(id).v1L4E.push(name);
      continue;
    }
    const v1L23 = /^v1_L23_E_(\d+)$/.exec(name);
    if (v1L23) {
      const idx = Number(v1L23[1]);
      const id = Math.floor(idx / v1L23PerSub);
      ensure(id).v1L23E.push(name);
      continue;
    }
    const v2L4 = /^v2_L4_E_(\d+)$/.exec(name);
    if (v2L4) {
      const idx = Number(v2L4[1]);
      const id = Math.floor(idx / v2L4PerSub);
      ensure(id).v2L4E.push(name);
      continue;
    }
    const v2L23 = /^v2_L23_E_(\d+)$/.exec(name);
    if (v2L23) {
      const idx = Number(v2L23[1]);
      const id = Math.floor(idx / v2L23PerSub);
      ensure(id).v2L23E.push(name);
      continue;
    }
    const v2L5 = /^v2_L5_E_(\d+)$/.exec(name);
    if (v2L5) {
      const idx = Number(v2L5[1]);
      const id = Math.floor(idx / v2L5PerSub);
      ensure(id).v2L5E.push(name);
      continue;
    }
    const out = /^out_(\d+)_(\d+)$/.exec(name);
    if (out) {
      const id = Number(out[1]);
      ensure(id).out.push(name);
      continue;
    }
  }

  // 정렬해서 결정론 보장 — id 오름차순 + 각 layer 안에서 이름 사전순.
  const slots = Array.from(buckets.values()).sort((a, b) => a.id - b.id);
  for (const s of slots) {
    s.v1L4E.sort();
    s.v1L23E.sort();
    s.v2L4E.sort();
    s.v2L23E.sort();
    s.v2L5E.sort();
    s.out.sort();
  }

  return {
    slots,
    v1L4PerSub,
    v1L23PerSub,
    v2L4PerSub,
    v2L23PerSub,
    v2L5PerSub,
    outPerCluster,
    inputDim,
  };
}

// ── Vigilance ──
// observe window 내 V1_L23 (또는 OUT) firing rate per cluster 기반 match score.

export interface MatchScore {
  rates: number[]; // 길이 = cluster 수.
  winner: number; // argmax. -1 이면 모두 0 (silent).
  share: number; // rates[winner] / sum(rates). silent → 0.
  margin: number; // (max - second) / max. silent → 0.
  // Fix #22 (사용자 catch 2026-05-10): Carpenter-Grossberg 1987 ART vigilance ρ
  // canonical 정합 — |I ∩ T| / |I| (input pattern ∩ winner template / input).
  // computeMatchScore 영역 pattern 영역 catch 영역 0 (legacy compat) — production
  // 영역 worker-core 영역 ClusterFiringRatesResult.inputMatch 영역 직접 산출.
  inputMatch?: number;
}

export interface VigilanceResult extends MatchScore {
  // share 가 vigilance 임계 미만이면 mismatch (novel 의심).
  mismatch: boolean;
}

export interface ARTConfig {
  // 0..1. 높을수록 strict (novel 판정 자주). 0.5 부터 시작 권장.
  vigilance: number;
  // observation window (ms) — firing rate 측정 구간.
  windowMs: number;
  // 어느 layer 의 firing rate 로 match 를 측정할지. 기본 OUT (winner-take-all 결과).
  scoreLayer: 'OUT' | 'V1_L23' | 'V2_L5';
}

export const DEFAULT_ART_CONFIG: ARTConfig = {
  vigilance: 0.5,
  windowMs: 50,
  scoreLayer: 'OUT',
};

function pickClusterNeurons(slot: ClusterSlot, layer: ARTConfig['scoreLayer']): string[] {
  switch (layer) {
    case 'OUT':
      return slot.out;
    case 'V1_L23':
      return slot.v1L23E;
    case 'V2_L5':
      return slot.v2L5E;
  }
}

export function computeMatchScore(
  monitor: SpikeMonitor,
  registry: ClusterRegistry,
  now: number,
  config: ARTConfig = DEFAULT_ART_CONFIG,
): MatchScore {
  const rates = registry.slots.map((slot) => {
    const names = pickClusterNeurons(slot, config.scoreLayer);
    let sum = 0;
    for (const n of names) sum += monitor.firingRate(n, now, config.windowMs);
    return names.length > 0 ? sum / names.length : 0;
  });
  let max = 0;
  let second = 0;
  let winner = -1;
  let total = 0;
  for (let i = 0; i < rates.length; i += 1) {
    total += rates[i];
    if (rates[i] > max) {
      second = max;
      max = rates[i];
      winner = i;
    } else if (rates[i] > second) {
      second = rates[i];
    }
  }
  const share = total > 0 ? max / total : 0;
  const margin = max > 0 ? (max - second) / max : 0;
  return { rates, winner, share, margin };
}

export function evaluateVigilance(
  monitor: SpikeMonitor,
  registry: ClusterRegistry,
  now: number,
  config: ARTConfig = DEFAULT_ART_CONFIG,
): VigilanceResult {
  const score = computeMatchScore(monitor, registry, now, config);
  return { ...score, mismatch: score.share < config.vigilance };
}

// ── Dynamic cluster expansion ──
// 새 cluster slot 을 net + registry 에 추가. n13 빌더와 같은 위상으로 wiring.

export interface ExpandOptions {
  activeInputs: number[]; // 본 cluster 가 학습할 입력 패턴.
  seed?: number; // 결정론 PRNG seed. 미지정 시 Date.now().
  // wiring weight 는 n13 빌더 default 와 동일 — 향후 override 노출 가능.
}

export interface ExpandResult {
  newSlot: ClusterSlot;
  neuronsAdded: number;
  synapsesAdded: number;
}

// connect 헬퍼 — n13 빌더의 proj / cascade_local 과 같은 패턴.
function projAdd(
  net: NeuralNetwork,
  rng: SeededRandom,
  srcs: string[],
  tgts: string[],
  density: number,
  weight: number,
  jitter: number,
  delay: number = 1.0,
): number {
  let added = 0;
  for (const s of srcs) {
    for (const t of tgts) {
      if (s === t) continue;
      if (rng.random() < density) {
        const w = jitter ? weight + rng.uniform(-jitter, jitter) : weight;
        net.connect(s, t, w, delay);
        added += 1;
      }
    }
  }
  return added;
}

export function expandCluster(
  net: NeuralNetwork,
  registry: ClusterRegistry,
  opts: ExpandOptions,
): ExpandResult {
  const newId = registry.slots.length;
  // P218 (2026-05-21) 11th iteration — seed deterministic 영역 cluster id 영역.
  // 직전 Date.now() 영역 영역 영역 spawn 영역 영역 영역 seed 영역 영역
  // cluster 1 영역 unlucky weights 영역 가설. 영역 deterministic + cluster
  // id 영역 영역 영역 reproducibility 영역 영역.
  const seed = opts.seed ?? (newId * 1234567 + 42);
  const rng = new SeededRandom(seed);

  const beforeNeurons = net.size();
  const beforeSyn = net.synapses.length;

  // 신규 layer 뉴런 이름 — 기존 prefix 와 충돌 없게 cluster id 접미.
  const v1L4E = Array.from(
    { length: registry.v1L4PerSub },
    (_, i) => `c${newId}_v1_L4_E_${i}`,
  );
  const v1L23E = Array.from(
    { length: registry.v1L23PerSub },
    (_, i) => `c${newId}_v1_L23_E_${i}`,
  );
  const v2L4E = Array.from(
    { length: registry.v2L4PerSub },
    (_, i) => `c${newId}_v2_L4_E_${i}`,
  );
  const v2L23E = Array.from(
    { length: registry.v2L23PerSub },
    (_, i) => `c${newId}_v2_L23_E_${i}`,
  );
  const v2L5E = Array.from(
    { length: registry.v2L5PerSub },
    (_, i) => `c${newId}_v2_L5_E_${i}`,
  );
  const out = Array.from(
    { length: registry.outPerCluster },
    (_, i) => `out_${newId}_${i}`,
  );

  const addPop = (
    names: string[],
    region: string,
    population: string,
    homeostatic: boolean,
  ) => {
    for (const n of names) {
      const neuron = new Neuron({ name: n, region, population });
      neuron.nmdaEnabled = true;
      neuron.nmdaThreshold = -65.0;
      neuron.nmdaGain = 10.0;
      if (homeostatic) {
        neuron.homeostaticEnabled = true;
        neuron.homeostaticIncrement = 2.0;
        neuron.homeostaticDecay = 0.995;
      }
      // n13 빌더의 vThreshold default 와 정합.
      neuron.vThreshold = -55.0;
      net.addNeuron(neuron);
    }
  };

  addPop(v1L4E, 'V1', 'L4_E', true);
  addPop(v1L23E, 'V1', 'L23_E', true);
  addPop(v2L4E, 'V2', 'L4_E', true);
  addPop(v2L23E, 'V2', 'L23_E', true);
  addPop(v2L5E, 'V2', 'L5_E', true);
  addPop(out, 'OUT', `cluster_${newId}`, true);

  // ── INPUT → V1_L4_E (local cluster 만, 기존 in_feat_X 재사용) ──
  const inactiveIdx: number[] = [];
  for (let i = 0; i < registry.inputDim; i += 1) {
    if (!opts.activeInputs.includes(i)) inactiveIdx.push(i);
  }
  // P218 wider jitter ±2.5 시도 (2026-05-25) REVERTED — 역효과 catch:
  // mean noise 53.8 → 22.5%, partial ~95 → 74%, WTA margin ~60 → 35%.
  // 모든 지표 후퇴 — wider weight distribution 영역 cluster collective signal
  // noise ↑ + WTA margin 붕괴. 즉시 revert 영역 baseline ±1.0.
  for (const ai of opts.activeInputs) {
    for (const t of v1L4E) {
      const w = 11.0 + rng.uniform(-1.0, 1.0);
      net.connect(`in_feat_${ai}`, t, w, 1.0);
    }
  }
  // PR-J (사용자 catch 2026-05-11 — 학습된 1번 패턴 영역 다른 패턴 영역 인식):
  // 직전 inactiveIdx 5% wire (w=2.0) 영역 신규 cluster 영역 학습 안 받는
  // input feature 영역 sparse 자극 path 영역 형성 — 학습 cluster c0 영역
  // input pattern P0 영역 inactive subset 영역 cluster cN 영역 V1_L4 영역
  // sparse 자극 → V2 cascade dense → cN OUT fire 누적 → cross-fire winner
  // 강탈. 정정: inactiveIdx wire 완전 delete — 신규 cluster 영역 학습 input
  // 만 받음, cross-fire path 영역 차단. noise generalization 영역 STDP
  // plasticity (R-STDP weight 변화) 영역 자연 emerge — 학술 정합
  // Diehl & Cook 2015 (selective receptive field).
  void inactiveIdx;

  // ── 본 cluster 내 cascade dense ──
  const cascadeIntra = (
    srcs: string[],
    tgts: string[],
    density: number,
    weight: number,
    jitter: number = 1.0,
  ) => projAdd(net, rng, srcs, tgts, density, weight, jitter);

  cascadeIntra(v1L4E, v1L23E, 0.75, 9.0);
  projAdd(net, rng, v1L23E, v1L23E, 0.05, -2.0, 0.0);

  cascadeIntra(v1L23E, v2L4E, 0.65, 8.0);
  projAdd(net, rng, v2L4E, v2L4E, 0.05, -2.0, 0.0);

  cascadeIntra(v2L4E, v2L23E, 0.65, 8.0);
  projAdd(net, rng, v2L23E, v2L23E, 0.05, -2.0, 0.0);

  cascadeIntra(v2L23E, v2L5E, 0.7, 9.0);
  projAdd(net, rng, v2L5E, v2L5E, 0.08, -2.0, 0.0);

  // V2_L5 → OUT cluster-local hard-wire.
  // P218 (2026-05-21) 12th iteration — density 0.7→1.0 + weight 12→16 강화.
  // 영역 cluster (영역 cluster 1) 영역 OUT 영역 reliable 영역 fire 영역 — 영역
  // V2_L5 영역 fire 영역 영역 영역 영역 영역 영역 영역 영역 weak 영역 cluster
  // 영역 silent 영역 catch 영역 가설.
  for (const s of v2L5E) {
    for (const t of out) {
      const w = 16.0 + rng.uniform(-1.0, 1.0);
      net.connect(s, t, w, 1.0);
    }
  }

  // ── 기존 cluster 들과 OUT 간 상호 inhibition (Dense WTA — 모든 cluster) ──
  // PR-I (사용자 catch 2026-05-09 — 수평/수직 영역 다른 cluster winner 정정,
  // 2026-05-10): n13-orientation 정합 -4.0 → -8.0 영역 강화 (Diehl & Cook 2015
  // strong inhibitory pool).
  //
  // PR-J (사용자 catch 2026-05-11 — 학습된 1번 패턴 영역 다른 패턴 영역 인식):
  // PR #227 Sparse WTA top-k=4 영역 회귀 source — 신규 cluster N spawn 시점
  // 영역 학습된 cluster 1 영역 activeInputs Jaccard 영역 top-k 영역 영역
  // 영역 영역 영역 inhibition wire 0 → 신규 cluster N 영역 학습 cluster 1
  // 영역 inhibit 0 → cross-fire winner 강탈.
  // 정정: 모든 기존 cluster 영역 mutual inhibition wire (dense restore) —
  // 학습 cluster 영역 priority 영역 영역 영역 모든 cluster 영역 학습 가능
  // 후보 영역, union(top-k Jaccard, learned) = all slots 영역 정합.
  // 학술 정합: Diehl & Cook 2015 — global lateral inhibition (모든 output
  // cluster 영역 winner-take-all pool). perf cost 영역 N=20 영역 ~2560 synapse
  // — correctness > perf priority (학습 cluster 인식 차분 영역 critical).
  // P218 (2026-05-21): WTA -8 → -10 영역 정합 — n13/n14 base WTA (P215d) 영역
  // 정합 영역 base/expanded cluster 영역 동일 WTA strength 영역 보장.
  //
  // P218 WTA -8 attempt (2026-05-23) REVERTED — N=8 partial cue 손실 + noise
  // 개선 0. N=10-12 capacity edge 만 partial cue ↑. 새 가설: noise weakness
  // 가 substrate property 가 아니라 measurement protocol artifact (20% flip
  // 가 5×5 에 더 많은 absolute bits 손실). Noise sweep 으로 fair comparison
  // 검증 — 4×4 0.20 (3.2 bits) vs 5×5 0.13 (3.25 bits) 동등 시험.
  for (const existing of registry.slots) {
    for (const s of out) {
      for (const t of existing.out) {
        net.connect(s, t, -10.0, 0.5);
        net.connect(t, s, -10.0, 0.5);
      }
    }
  }
  // P218 (2026-05-21) 9th iteration — OUT internal mutual excitation +2 → +1
  // 영역 영역 — 직전 disable (0) 영역 N=3 patternToCluster=[0,-1,2] 영역 catch
  // (cluster 1 영역 영역 fire 영역 영역 영역 silent → -1). cluster cohesion
  // 영역 mandatory 영역 +0 영역 너무 약함. +1 영역 영역 영역 영역 자세 영역 —
  // 영역 OUT 영역 fire 영역 영역 1 영역 boost (영역 V2_L5 driving 영역 영역 영역
  // 합산 영역 winner clean) 단 self-sustain 영역 약 영역 (영역 영역 영역 → 정지).
  for (const s of out) {
    for (const t of out) {
      if (s !== t) net.connect(s, t, 1.0, 0.5);
    }
  }

  const newSlot: ClusterSlot = {
    id: newId,
    v1L4E,
    v1L23E,
    v2L4E,
    v2L23E,
    v2L5E,
    out,
    activeInputs: opts.activeInputs.slice(),
  };
  registry.slots.push(newSlot);

  // P218 13th iter (2026-05-21) — targeted instrumentation. Dump synapse stats
  // for cluster 0/1/2 only — comparison reveals if cluster 1 has structurally
  // different (or missing) connections vs working clusters.
  if (newId <= 2) {
    const v1L4Set = new Set(v1L4E);
    const v2L5Set = new Set(v2L5E);
    const outSet = new Set(out);
    let inputToV1L4Count = 0;
    let inputToV1L4WSum = 0;
    let inputToV1L4WMin = Infinity;
    let inputToV1L4WMax = -Infinity;
    let v2L5ToOutCount = 0;
    let v2L5ToOutWSum = 0;
    let v2L5ToOutWMin = Infinity;
    let v2L5ToOutWMax = -Infinity;
    let outFromExistingCount = 0;
    let outFromExistingWSum = 0;
    for (const s of net.synapses) {
      const preName = s.pre.name;
      const postName = s.post.name;
      if (preName.startsWith('in_feat_') && v1L4Set.has(postName)) {
        inputToV1L4Count += 1;
        inputToV1L4WSum += s.weight;
        if (s.weight < inputToV1L4WMin) inputToV1L4WMin = s.weight;
        if (s.weight > inputToV1L4WMax) inputToV1L4WMax = s.weight;
      } else if (v2L5Set.has(preName) && outSet.has(postName)) {
        v2L5ToOutCount += 1;
        v2L5ToOutWSum += s.weight;
        if (s.weight < v2L5ToOutWMin) v2L5ToOutWMin = s.weight;
        if (s.weight > v2L5ToOutWMax) v2L5ToOutWMax = s.weight;
      } else if (outSet.has(postName) && !v2L5Set.has(preName) && !outSet.has(preName)) {
        outFromExistingCount += 1;
        outFromExistingWSum += s.weight;
      }
    }
    const inMean = inputToV1L4Count > 0 ? inputToV1L4WSum / inputToV1L4Count : 0;
    const outMean = v2L5ToOutCount > 0 ? v2L5ToOutWSum / v2L5ToOutCount : 0;
    console.log(
      `[P218 syn c${newId}] IN→V1L4 n=${inputToV1L4Count} w=[${inputToV1L4WMin.toFixed(2)},${inputToV1L4WMax.toFixed(2)}] mean=${inMean.toFixed(2)} | V2L5→OUT n=${v2L5ToOutCount} w=[${v2L5ToOutWMin.toFixed(2)},${v2L5ToOutWMax.toFixed(2)}] mean=${outMean.toFixed(2)} | extWTA→OUT n=${outFromExistingCount} mean=${(outFromExistingCount > 0 ? outFromExistingWSum / outFromExistingCount : 0).toFixed(2)} | activeInputs=[${opts.activeInputs.join(',')}] seed=${seed}`
    );
  }

  return {
    newSlot,
    neuronsAdded: net.size() - beforeNeurons,
    synapsesAdded: net.synapses.length - beforeSyn,
  };
}
