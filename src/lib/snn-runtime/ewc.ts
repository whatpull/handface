// Phase E — Elastic Weight Consolidation (EWC).
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 3 단계.
// Phase D (weighted ensemble vote) + Phase C (meta-plasticity self-tuning) 다음.
//
// 문제: 새 패턴 학습 시 STDP weight update 영역 기존 학습된 cluster 영역
//   weight 영역 영역 → catastrophic forgetting (McCloskey & Cohen 1989).
//   N=8 영역 잘 학습한 후 N=12 추가 학습 시 영역 첫 8 영역 recall 하락.
//
// 해법: EWC (Kirkpatrick et al. 2017 PNAS) — 중요 weight 영역 Fisher
//   Information 영역 측정 → 새 학습 시 weight 변화 영역 penalty 추가.
//
// EWC loss formula:
//   L_total(θ) = L_new(θ) + Σ_i (λ/2) × F_i × (θ_i - θ*_i)^2
//
// 여기서:
//   θ: current weights
//   θ*: baseline (이전 패턴 학습 완료 시점) weights
//   F_i: weight i 영역 Fisher Information (importance proxy)
//   λ: protection strength (typical 1000~5000)
//
// STDP 정합:
//   STDP weight delta (Δw) → EWC penalty 영역 영역 후 effective Δw:
//     Δw_eff = Δw - λ × F × (w - w_baseline)
//   즉 baseline 영역 영역 멀어진 update 영역 점진 약화.
//
// 본 모듈 영역 role:
//   - Fisher Information estimator (activity-based proxy — full Hessian 영역
//     biological SNN 영역 영역 영역 — Bell & Sejnowski 1997 정합).
//   - EWC penalty application (pure function).
//   - Baseline snapshot / restore.
//
// 학술 정합:
//   - Kirkpatrick et al. 2017 PNAS "Overcoming catastrophic forgetting in
//     neural networks" — DNN 영역 EWC original.
//   - Zenke, Poole & Ganguli 2017 ICML "Continual Learning Through Synaptic
//     Intelligence" — SI variant, online Fisher.
//   - Soures & Kudithipudi 2019 — Spiking-NN EWC variant 영역 spike timing 영역
//     Fisher proxy.

export interface SynapseSnapshot {
  preId: string;
  postId: string;
  weight: number;
  fisher: number; // synaptic importance (0..1, normalized)
}

export interface EwcBaseline {
  // baseline 시점 (이전 패턴 학습 완료) 영역 synapse weight + Fisher.
  // Map<synapseKey, SynapseSnapshot> 영역 fast lookup.
  snapshots: Map<string, SynapseSnapshot>;
  // 본 baseline 이 보호하는 패턴 수 (메타데이터).
  protectedPatternCount: number;
}

// Fisher Information proxy — activity-based (biological SNN 정합).
// Full Hessian 영역 SNN 영역 영역 영역 — Bell & Sejnowski 1997 영역 영역
// pre × post firing rate product 영역 importance proxy 영역.
//   F_synapse ≈ <r_pre × r_post>^2  (시간 평균)
// 본 함수 영역 단일 시점 instantaneous 영역 — caller (worker-core 영역
// observe-window 평균) 영역 시간 통합 mandatory.
export function computeFisherProxy(prefiringRate: number, postFiringRate: number): number {
  const product = prefiringRate * postFiringRate;
  return product * product; // F ≈ (r_pre × r_post)^2
}

// EWC penalty application — STDP weight update 영역 영역 baseline 보호 영역.
// 학술 정합: Kirkpatrick 2017 — penalty term derivative.
//   penalty_grad = λ × F × (w - w_baseline)
//   effective_update = raw_update - penalty_grad
//
// 본 함수 영역 pure — Δw_eff 영역 반환.
export interface EwcConfig {
  lambda: number; // protection strength (typical 1000~5000)
  // STDP delta clamp — penalty 영역 영역 영역 inverted sign update 영역 영역.
  clampToOriginal: boolean;
}

export const DEFAULT_EWC_CONFIG: EwcConfig = {
  lambda: 1000, // Kirkpatrick et al. 2017 default
  clampToOriginal: true,
};

export function applyEwcPenalty(
  rawDelta: number,
  currentWeight: number,
  baselineWeight: number,
  fisher: number,
  config: EwcConfig = DEFAULT_EWC_CONFIG,
): number {
  const penalty = config.lambda * fisher * (currentWeight - baselineWeight);
  const effectiveDelta = rawDelta - penalty;
  // Sign flip 방지: rawDelta 영역 동일 방향 영역 cap.
  if (config.clampToOriginal && Math.sign(effectiveDelta) !== Math.sign(rawDelta) && rawDelta !== 0) {
    return 0; // penalty 영역 raw 영역 override 영역 — 보호 발동, 변화 없음.
  }
  return effectiveDelta;
}

// Baseline snapshot 생성 — 현재 weight + Fisher 영역 저장.
// 호출 시점: 새 패턴 batch 학습 완료 직후.
export function createBaseline(
  synapses: ReadonlyArray<{ preId: string; postId: string; weight: number; fisher: number }>,
  protectedPatternCount: number,
): EwcBaseline {
  const snapshots = new Map<string, SynapseSnapshot>();
  for (const syn of synapses) {
    const key = `${syn.preId}→${syn.postId}`;
    snapshots.set(key, { ...syn });
  }
  return { snapshots, protectedPatternCount };
}

// Combined: synapse update 시 baseline lookup + EWC penalty 적용.
// 호출자: worker-core 영역 STDP loop 영역 본 함수 영역 raw Δw 영역 영역.
export function safeguardSynapseUpdate(
  preId: string,
  postId: string,
  currentWeight: number,
  rawDelta: number,
  fisher: number,
  baseline: EwcBaseline | null,
  config: EwcConfig = DEFAULT_EWC_CONFIG,
): number {
  if (baseline === null) return rawDelta; // baseline 없으면 EWC bypass (첫 학습).
  const key = `${preId}→${postId}`;
  const snap = baseline.snapshots.get(key);
  if (!snap) return rawDelta; // 새 synapse → baseline 영역 없음, free update.
  return applyEwcPenalty(rawDelta, currentWeight, snap.weight, fisher, config);
}

// Compute Fisher from activity history — observe window 영역 spike rate 평균
// 영역 proxy 영역. 호출자 (worker-core) 영역 observed firing rates 영역 영역
// 본 함수 영역 batch 영역 Fisher 영역 산출.
export function computeFisherBatch(
  synapses: ReadonlyArray<{ preId: string; postId: string; preRate: number; postRate: number }>,
): Map<string, number> {
  const fisherMap = new Map<string, number>();
  for (const syn of synapses) {
    const key = `${syn.preId}→${syn.postId}`;
    fisherMap.set(key, computeFisherProxy(syn.preRate, syn.postRate));
  }
  // Normalize to [0, 1] (relative importance).
  let max = 0;
  for (const v of fisherMap.values()) if (v > max) max = v;
  if (max > 0) {
    for (const [k, v] of fisherMap.entries()) fisherMap.set(k, v / max);
  }
  return fisherMap;
}
