// Phase B — Self-Supervised Representation Learning building blocks.
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 4 단계.
// Phase D (weighted ensemble) + Phase C (meta-plasticity) + Phase E (EWC) 다음.
//
// 목표: hand-crafted derived features (compute32/50/72DimFeature 영역 row sum,
//   quadrants 등) 영역 제거 → STDP unsupervised feature layer 영역 자기 학습.
//   패턴 ② (derived feature collision, 6×6 substrate 영역 cluster 충돌) 영역
//   근본 해결.
//
// 본 모듈 영역 building blocks:
//   1. STDP weight rule (Bi & Poo 1998) — pre-post spike timing 기반 plasticity.
//   2. Hoyer sparsity (Hoyer 2004) — feature representation sparsity 측정.
//   3. WTA competitive selection (Diehl & Cook 2015) — top-k winner.
//   4. Homeostatic threshold update (Turrigiano 2008) — activity 자동 조절.
//
// 학술 정합:
//   - Bi & Poo 1998 J Neurosci — STDP biological discovery.
//   - Hoyer 2004 JMLR "Non-negative matrix factorization with sparseness
//     constraints" — Hoyer sparsity metric.
//   - Diehl & Cook 2015 Front Comput Neurosci "Unsupervised learning of digit
//     recognition using spike-timing-dependent plasticity" (MNIST 95%).
//   - Olshausen & Field 1996 Nature — sparse coding emerges from natural
//     image statistics via unsupervised learning.
//   - Turrigiano 2008 — homeostatic intrinsic plasticity.

// ── 1. STDP Weight Rule ──

export interface StdpConfig {
  aPlus: number;    // LTP amplitude (pre before post)
  aMinus: number;   // LTD amplitude (post before pre)
  tauPlus: number;  // LTP time constant (ms)
  tauMinus: number; // LTD time constant (ms)
  wMax: number;     // weight upper bound
  wMin: number;     // weight lower bound
}

export const DEFAULT_STDP_CONFIG: StdpConfig = {
  aPlus: 0.1, aMinus: 0.12, tauPlus: 20, tauMinus: 20, wMax: 1.0, wMin: 0.0,
};

// STDP delta — pre-post spike time difference 영역 weight 변화.
//   deltaT = t_post - t_pre (ms).
//   deltaT > 0 (pre before post): LTP, Δw = +A_+ × exp(-deltaT/τ_+).
//   deltaT < 0 (post before pre): LTD, Δw = -A_- × exp(deltaT/τ_-).
//   deltaT === 0: 영역 영역 0 (causality ambiguity).
export function stdpWeightDelta(
  deltaT: number,
  config: StdpConfig = DEFAULT_STDP_CONFIG,
): number {
  if (deltaT === 0) return 0;
  if (deltaT > 0) {
    return config.aPlus * Math.exp(-deltaT / config.tauPlus);
  } else {
    return -config.aMinus * Math.exp(deltaT / config.tauMinus);
  }
}

// Apply STDP delta with weight bounds.
export function applyStdpUpdate(
  currentWeight: number,
  deltaT: number,
  config: StdpConfig = DEFAULT_STDP_CONFIG,
): number {
  const delta = stdpWeightDelta(deltaT, config);
  const next = currentWeight + delta;
  return Math.max(config.wMin, Math.min(config.wMax, next));
}

// ── 2. Hoyer Sparsity ──

// Hoyer 2004 sparsity metric: 0 (uniform) → 1 (single non-zero).
//   sparsity = (sqrt(n) - L1/L2) / (sqrt(n) - 1)
// 학술 정합: feature representation 의 sparseness 평가 표준 metric.
export function hoyerSparsity(values: ReadonlyArray<number>): number {
  const n = values.length;
  if (n === 0 || n === 1) return 0;
  let l1 = 0, l2sq = 0;
  for (const v of values) {
    const abs = Math.abs(v);
    l1 += abs;
    l2sq += abs * abs;
  }
  if (l2sq === 0) return 0; // all zero → undefined, return 0
  const l2 = Math.sqrt(l2sq);
  const sqrtN = Math.sqrt(n);
  return (sqrtN - l1 / l2) / (sqrtN - 1);
}

// Spike sparsity — simple ratio of inactive neurons.
//   sparsity = 1 - (active_count / total)
export function spikeSparsity(spikes: ReadonlyArray<boolean>): number {
  if (spikes.length === 0) return 0;
  let active = 0;
  for (const s of spikes) if (s) active += 1;
  return 1 - active / spikes.length;
}

// ── 3. WTA Competitive Selection ──

// Top-k winner-take-all selection — Diehl & Cook 2015 정합.
// firing rates 영역 영역 top k neurons (indices) 영역 반환.
export function wtaTopK(rates: ReadonlyArray<number>, k: number): number[] {
  if (rates.length === 0 || k <= 0) return [];
  const indexed = rates.map((r, i) => ({ rate: r, idx: i }));
  indexed.sort((a, b) => b.rate - a.rate);
  return indexed.slice(0, Math.min(k, rates.length)).filter(x => x.rate > 0).map(x => x.idx);
}

// Strict WTA (k=1) — single winner.
export function wtaWinner(rates: ReadonlyArray<number>): number {
  if (rates.length === 0) return -1;
  let max = -Infinity;
  let winner = -1;
  for (let i = 0; i < rates.length; i += 1) {
    if (rates[i] > max) { max = rates[i]; winner = i; }
  }
  return max > 0 ? winner : -1;
}

// ── 4. Homeostatic Threshold Update ──

export interface HomeostaticConfig {
  targetRate: number;      // 목표 firing rate (Hz)
  learningRate: number;    // threshold adjustment rate (small)
  thresholdMin: number;
  thresholdMax: number;
}

export const DEFAULT_HOMEOSTATIC_CONFIG: HomeostaticConfig = {
  targetRate: 0.1, // 10% activity (sparse representation)
  learningRate: 0.01,
  thresholdMin: -75,
  thresholdMax: -45,
};

// Turrigiano 2008 — neuron 활성도 영역 목표 영역 영역 → threshold 영역 영역 영역.
// recent rate > target → threshold ↑ (firing 영역 영역 영역).
// recent rate < target → threshold ↓ (firing 영역 영역 영역).
export function homeostaticThresholdUpdate(
  currentThreshold: number,
  recentActivityRate: number,
  config: HomeostaticConfig = DEFAULT_HOMEOSTATIC_CONFIG,
): number {
  const delta = (recentActivityRate - config.targetRate) * config.learningRate;
  // Note: 영역 firing 영역 영역 영역 → threshold 영역 영역 (영역 fire 영역 영역).
  //   recent > target → delta > 0 → threshold ↑ (less firing)
  //   recent < target → delta < 0 → threshold ↓ (more firing)
  // 영역 voltage threshold 영역 -55 영역 영역 영역 영역 → 영역 영역 영역 fire.
  // 영역 영역 영역 영역 threshold 영역 영역 (영역 firing 영역) 영역 voltage 영역
  // 영역 영역 영역 → 영역 영역 영역 영역.
  const next = currentThreshold + delta * 10; // scale to voltage range
  return Math.max(config.thresholdMin, Math.min(config.thresholdMax, next));
}

// ── 5. Unsupervised Feature Quality Metric ──

// Feature distinctiveness — feature representation 영역 패턴 영역 영역 영역
// distinct 영역 영역. 패턴 ② (derived feature collision) 영역 진단 metric.
//
// 두 패턴 영역 feature vector 영역 cosine similarity:
//   sim = (a · b) / (|a| × |b|)
// 0 (orthogonal) → 1 (identical).
export function cosineSimilarity(a: ReadonlyArray<number>, b: ReadonlyArray<number>): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Pairwise distinctiveness — N 패턴 영역 모든 pair 영역 (1 - cosine) 평균.
// 1.0 = 영역 패턴 orthogonal (perfect distinct).
// 0.0 = 영역 영역 동일.
// 패턴 ② 영역 자동 검증 metric — 학습된 feature 가 collision 영역 영역지 측정.
export function pairwiseDistinctiveness(patterns: ReadonlyArray<ReadonlyArray<number>>): number {
  const N = patterns.length;
  if (N <= 1) return 1;
  let sumDist = 0;
  let pairs = 0;
  for (let i = 0; i < N; i += 1) {
    for (let j = i + 1; j < N; j += 1) {
      sumDist += 1 - cosineSimilarity(patterns[i], patterns[j]);
      pairs += 1;
    }
  }
  return pairs > 0 ? sumDist / pairs : 1;
}
