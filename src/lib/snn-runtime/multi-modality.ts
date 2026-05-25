// Phase F — Multi-Modality Integration (완벽한 인공지능 1 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) — 영원 진화 완성 후.
// Phase D~A (영원 진화) 다음.
//
// 목표: 단일 modality (hand image 4×4/5×5/6×6) → multi-modality (image +
//   audio + text) 통합. 인간 뇌 영역 cross-modal binding 정합.
//
// 본 모듈 building blocks (pure functions):
//   1. Temporal spike encoding — 시간 series (spectrogram, text sequence) →
//      spike train.
//   2. Cross-modal binding — 동시 활성 modality pair 영역 Hebbian association.
//   3. Modality attention — multiple modality 활성도 → winner 선출.
//   4. Multi-modal coherence — bound representation 영역 일관성 측정.
//
// 학술 정합:
//   - Treisman 1996 — Feature Integration Theory.
//   - Bullmore & Sporns 2009 — Brain network modularity.
//   - Tavanaei et al. 2019 — Deep learning in spiking NN (multi-modal).
//   - Tang et al. 2017 — Multimodal binding in SNN (Hebbian co-activation).

// ── 1. Temporal Spike Encoding ──

export interface TemporalEncodingConfig {
  threshold: number;       // activation threshold [0,1]
  refractoryMs: number;    // refractory period (ms)
  maxRateHz: number;       // 최대 firing rate (Hz)
}

export const DEFAULT_TEMPORAL_CONFIG: TemporalEncodingConfig = {
  threshold: 0.3,
  refractoryMs: 5,
  maxRateHz: 200,
};

// Rate coding — value 영역 firing rate 영역. value 0 → 0Hz, value 1 → maxRateHz.
// 학술 정합: Adrian 1926 — rate coding biological origin.
export function rateEncode(value: number, config: TemporalEncodingConfig = DEFAULT_TEMPORAL_CONFIG): number {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * config.maxRateHz;
}

// Temporal encoding — time series of values → spike times.
// 각 time bin (예: 10ms) 에서 value > threshold 면 spike 발생.
// Refractory period 영역 영역 spike 영역 영역.
// 반환: spike times in ms (relative to start).
export function encodeTemporalSeries(
  series: ReadonlyArray<number>,
  timeBinMs: number = 10,
  config: TemporalEncodingConfig = DEFAULT_TEMPORAL_CONFIG,
): number[] {
  const spikes: number[] = [];
  let lastSpike = -Infinity;
  for (let i = 0; i < series.length; i += 1) {
    const t = i * timeBinMs;
    if (series[i] > config.threshold && (t - lastSpike) >= config.refractoryMs) {
      spikes.push(t);
      lastSpike = t;
    }
  }
  return spikes;
}

// Audio spectrogram (frequency × time matrix) → 각 frequency band 영역 spike train.
// 반환: Map<frequencyBand, spikeTimes>.
export function encodeSpectrogram(
  spectrogram: ReadonlyArray<ReadonlyArray<number>>, // [freqBand][timeBin]
  timeBinMs: number = 10,
  config: TemporalEncodingConfig = DEFAULT_TEMPORAL_CONFIG,
): Map<number, number[]> {
  const result = new Map<number, number[]>();
  for (let f = 0; f < spectrogram.length; f += 1) {
    result.set(f, encodeTemporalSeries(spectrogram[f], timeBinMs, config));
  }
  return result;
}

// Text token sequence → spike train (one-hot per token).
// 각 token 활성 시 해당 token index neuron 영역 spike.
export function encodeTextSequence(
  tokenIndices: ReadonlyArray<number>,
  vocabSize: number,
  timePerTokenMs: number = 50,
): Map<number, number[]> {
  const result = new Map<number, number[]>();
  for (let i = 0; i < tokenIndices.length; i += 1) {
    const idx = tokenIndices[i];
    if (idx < 0 || idx >= vocabSize) continue;
    if (!result.has(idx)) result.set(idx, []);
    result.get(idx)!.push(i * timePerTokenMs);
  }
  return result;
}

// ── 2. Cross-Modal Binding (Hebbian co-activation) ──

export interface CrossModalAssociation {
  modalityA: string; // 예: 'image'
  modalityB: string; // 예: 'audio'
  neuronA: number;   // 활성 neuron index in A
  neuronB: number;   // 활성 neuron index in B
  weight: number;    // bound strength (0..1)
  coActivationCount: number;
}

// Hebbian co-activation — 두 modality 영역 동시 active neuron 영역 weight 증가.
// 학술 정합: "Cells that fire together, wire together" (Hebb 1949).
//   Δw = learningRate × pre × post
// 반환: 새 또는 업데이트된 association.
export function updateBinding(
  existing: CrossModalAssociation | null,
  modalityA: string, modalityB: string,
  neuronA: number, neuronB: number,
  bothActive: boolean,
  learningRate: number = 0.1,
): CrossModalAssociation {
  if (!existing) {
    return {
      modalityA, modalityB, neuronA, neuronB,
      weight: bothActive ? learningRate : 0,
      coActivationCount: bothActive ? 1 : 0,
    };
  }
  if (!bothActive) return existing; // co-activation 영역 영역 update
  return {
    ...existing,
    weight: Math.min(1, existing.weight + learningRate),
    coActivationCount: existing.coActivationCount + 1,
  };
}

// Batch binding update — 두 modality 영역 active neuron 영역 영역 co-activation 학습.
export function batchUpdateBindings(
  modalityA: string, modalityB: string,
  activeA: ReadonlyArray<number>, // active neuron indices in A
  activeB: ReadonlyArray<number>,
  existingBindings: Map<string, CrossModalAssociation>,
  learningRate: number = 0.1,
): Map<string, CrossModalAssociation> {
  const result = new Map(existingBindings);
  for (const a of activeA) {
    for (const b of activeB) {
      const key = `${modalityA}:${a}↔${modalityB}:${b}`;
      const existing = result.get(key) ?? null;
      const updated = updateBinding(existing, modalityA, modalityB, a, b, true, learningRate);
      result.set(key, updated);
    }
  }
  return result;
}

// ── 3. Modality Attention ──

// Multiple modality 활성도 → winner modality 선출 (winner-take-all).
// 학술 정합: Posner & Petersen 1990 — attention network.
//   modality 영역 영역 평균 firing rate 영역 영역 영역 winner.
export interface ModalityActivity {
  name: string;
  averageFiringRate: number; // Hz
}

export function selectAttendedModality(
  modalities: ReadonlyArray<ModalityActivity>,
): { winner: string; salience: number } {
  if (modalities.length === 0) return { winner: '', salience: 0 };
  let max = -1;
  let winner = '';
  for (const m of modalities) {
    if (m.averageFiringRate > max) { max = m.averageFiringRate; winner = m.name; }
  }
  const totalActivity = modalities.reduce((s, m) => s + m.averageFiringRate, 0);
  const salience = totalActivity > 0 ? max / totalActivity : 0;
  return { winner, salience };
}

// Soft attention (Bahdanau et al. 2014 정합) — modality 별 weight 영역 분포.
//   softmax(firing_rates) → normalized weights.
export function softModalityAttention(
  modalities: ReadonlyArray<ModalityActivity>,
): Map<string, number> {
  const result = new Map<string, number>();
  if (modalities.length === 0) return result;
  const rates = modalities.map(m => m.averageFiringRate);
  const maxRate = Math.max(...rates);
  // Softmax with temperature 1 — exp normalization.
  let sumExp = 0;
  const exps = rates.map(r => Math.exp(r - maxRate)); // numerical stability
  for (const e of exps) sumExp += e;
  for (let i = 0; i < modalities.length; i += 1) {
    result.set(modalities[i].name, sumExp > 0 ? exps[i] / sumExp : 1 / modalities.length);
  }
  return result;
}

// ── 4. Multi-Modal Coherence ──

// Bound representation 영역 일관성 측정.
// 두 modality 영역 active neuron pair 영역 binding weight 영역 강함 → high
// coherence (consistent bound percept).
// 학술 정합: Treisman 1996 Feature Integration — binding 강도가 percept stability 영역.
export function coherenceScore(
  activeA: ReadonlyArray<number>,
  activeB: ReadonlyArray<number>,
  bindings: ReadonlyMap<string, CrossModalAssociation>,
  modalityA: string, modalityB: string,
): number {
  if (activeA.length === 0 || activeB.length === 0) return 0;
  let totalWeight = 0;
  let pairs = 0;
  for (const a of activeA) {
    for (const b of activeB) {
      const key = `${modalityA}:${a}↔${modalityB}:${b}`;
      const binding = bindings.get(key);
      if (binding) {
        totalWeight += binding.weight;
        pairs += 1;
      }
    }
  }
  return pairs > 0 ? totalWeight / pairs : 0;
}

// Cross-modal retrieval — modality A 활성 → modality B 영역 영역 예측 active.
// Binding weight 영역 영역 top-k strongly bound B neurons 영역 반환.
export function crossModalRetrieve(
  activeA: ReadonlyArray<number>,
  bindings: ReadonlyMap<string, CrossModalAssociation>,
  modalityA: string, modalityB: string,
  k: number = 5,
): { neuron: number; score: number }[] {
  const scores = new Map<number, number>();
  for (const a of activeA) {
    for (const [key, binding] of bindings.entries()) {
      if (binding.modalityA === modalityA && binding.modalityB === modalityB && binding.neuronA === a) {
        scores.set(binding.neuronB, (scores.get(binding.neuronB) ?? 0) + binding.weight);
      }
      void key;
    }
  }
  const sorted = Array.from(scores.entries())
    .map(([neuron, score]) => ({ neuron, score }))
    .sort((a, b) => b.score - a.score);
  return sorted.slice(0, k);
}
