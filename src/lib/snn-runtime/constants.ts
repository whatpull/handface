// Pure TypeScript LIF + pair-STDP runtime — neuronface modules/neuron.py 포팅.
// rev15 anchor (Phase E, 2026-05-07 catch) 기준. Triplet / NMDA / eligibility-only 는
// Phase C5 (지속 성장) 단계에서 추가 예정.
//
// 파라미터 출처: modules/neuron.py — 값과 의미를 그대로 보존하여 Python 실측과
// 비교 가능하게 유지한다.

// ── LIF 생물학 기본 ──
export const V_REST_DEFAULT = -70.0; // mV
export const V_THRESHOLD_DEFAULT = -55.0; // mV
export const V_RESET_DEFAULT = -75.0; // mV
export const TAU_M_DEFAULT_MS = 15.0;
export const REFRACTORY_DEFAULT_MS = 2.0;

// ── Pair STDP (Phase 4 / rev11 정합 1:2 비율) ──
export const STDP_TAU_PLUS_MS = 20.0;
export const STDP_TAU_MINUS_MS = 20.0;
export const STDP_A_PLUS = 0.0005;
export const STDP_A_MINUS = 0.001;
export const STDP_W_MIN = 0.0;
// Phase E rev15: n13 baseline max ~14 → cap 40 (≈ 3× max base, paper 정합).
export const STDP_W_MAX = 40.0;

// ── Synapse 기본 ──
export const SYNAPSE_PSP_DURATION_MS = 5.0; // AMPA-like fast (Phase 1 D90 정합)
export const SYNAPSE_DELAY_MS = 1.0;

// ── Eligibility trace decay (R-STDP 사전 누적, Frémaux & Gerstner 2016) ──
export const ELIGIBILITY_TAU_MS = 200.0;
