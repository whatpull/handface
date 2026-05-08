// LIF Neuron + Synapse — TS 포팅. modules/neuron.py 와 일대일 대응.
//
// 핵심 차이 (Python → TS):
//  - dataclass → 일반 class. 필드 기본값은 생성자에서 지정.
//  - List[Tuple[float, float]] pending_inputs → 평탄 number[] 페어. GC 부담 절감.
//  - float('-inf') → Number.NEGATIVE_INFINITY.
//
// 의도적 비포팅 (Phase C1 범위 제한):
//  - Triplet STDP (r1/r2/o1/o2) — pair 만 활성, rev15 anchor 정합.
//  - NMDA dendritic plateau — opt-in feature, 기본 off 그대로 유지하므로 생략.
//  - homeostatic threshold — Phase E1 도입이지만 rev15 path Y' 에서 비활성. 향후 추가.

import {
  ELIGIBILITY_TAU_MS,
  REFRACTORY_DEFAULT_MS,
  STDP_A_MINUS,
  STDP_A_PLUS,
  STDP_TAU_MINUS_MS,
  STDP_TAU_PLUS_MS,
  STDP_W_MAX,
  STDP_W_MIN,
  SYNAPSE_DELAY_MS,
  SYNAPSE_PSP_DURATION_MS,
  TAU_M_DEFAULT_MS,
  V_RESET_DEFAULT,
  V_REST_DEFAULT,
  V_THRESHOLD_DEFAULT,
} from './constants';

export type SpikeListener = (neuron: Neuron, t: number) => void;

function decayed(value: number, dtMs: number, tauMs: number): number {
  return value * Math.exp(-dtMs / tauMs);
}

function clipWeight(w: number): number {
  if (w < STDP_W_MIN) return STDP_W_MIN;
  if (w > STDP_W_MAX) return STDP_W_MAX;
  return w;
}

export class Synapse {
  pre: Neuron;
  post: Neuron;
  weight: number;
  delay: number;
  pspDurationMs: number;
  // R-STDP: pre-post pairing 누적 trace. reward 시점 dynamic update 용.
  eligibilityTrace = 0.0;
  lastEligibilityUpdateMs = 0.0;
  // STDP frozen gate (Python Phase 124/126) — true 면 plasticity 적용 안 함.
  frozen = false;
  // STDP gain multiplier (Python Phase 159/161) — synapse 별 가중치 변경 비율.
  stdpGainMultiplier = 1.0;

  constructor(
    pre: Neuron,
    post: Neuron,
    weight: number = 0.5,
    delay: number = SYNAPSE_DELAY_MS,
    pspDurationMs: number = SYNAPSE_PSP_DURATION_MS,
  ) {
    this.pre = pre;
    this.post = post;
    this.weight = weight;
    this.delay = delay;
    this.pspDurationMs = pspDurationMs;
  }

  // pre spike → post 에 weight 크기 current 를 psp_duration 동안 sustained 로 흘림.
  // 이산화: n = max(1, floor(psp / dt)) 개 impulse 를 dt 간격으로 inject.
  transmit(spikeTime: number, dt: number): void {
    const n = Math.max(1, Math.floor(this.pspDurationMs / dt));
    const base = spikeTime + this.delay;
    for (let i = 0; i < n; i += 1) {
      this.post.receiveSpike(this.weight, base + i * dt);
    }
  }
}

export class Neuron {
  name: string;
  vRest: number;
  vThreshold: number;
  vReset: number;
  tauM: number;
  refractory: number;
  region: string | null;
  population: string | null;

  // 동적 상태
  v: number;
  lastSpikeTime: number = Number.NEGATIVE_INFINITY;

  // STDP 누적 trace
  preTrace = 0.0;
  postTrace = 0.0;
  lastSpikeTimeForTrace: number | null = null;

  // 연결 구조
  outgoing: Synapse[] = [];
  incoming: Synapse[] = [];
  // pending_inputs 를 평탄 배열로 보관 ([w0, t0, w1, t1, ...]) — alloc 절감.
  private pendingWeights: number[] = [];
  private pendingArrivals: number[] = [];

  private listeners: SpikeListener[] = [];

  constructor(opts: {
    name?: string;
    vRest?: number;
    vThreshold?: number;
    vReset?: number;
    tauM?: number;
    refractory?: number;
    region?: string | null;
    population?: string | null;
  } = {}) {
    this.name = opts.name ?? 'neuron';
    this.vRest = opts.vRest ?? V_REST_DEFAULT;
    this.vThreshold = opts.vThreshold ?? V_THRESHOLD_DEFAULT;
    this.vReset = opts.vReset ?? V_RESET_DEFAULT;
    this.tauM = opts.tauM ?? TAU_M_DEFAULT_MS;
    this.refractory = opts.refractory ?? REFRACTORY_DEFAULT_MS;
    this.region = opts.region ?? null;
    this.population = opts.population ?? null;
    this.v = this.vRest;
  }

  receiveSpike(weight: number, arrivalTime: number): void {
    this.pendingWeights.push(weight);
    this.pendingArrivals.push(arrivalTime);
  }

  integrate(t: number, dt: number): void {
    if (t - this.lastSpikeTime < this.refractory) {
      this.v = this.vReset;
      return;
    }
    let current = 0.0;
    const remainW: number[] = [];
    const remainT: number[] = [];
    for (let i = 0; i < this.pendingArrivals.length; i += 1) {
      const arrival = this.pendingArrivals[i];
      const w = this.pendingWeights[i];
      if (arrival <= t) {
        current += w;
      } else {
        remainW.push(w);
        remainT.push(arrival);
      }
    }
    this.pendingWeights = remainW;
    this.pendingArrivals = remainT;
    const dv = ((-(this.v - this.vRest) + current) / this.tauM) * dt;
    this.v += dv;
  }

  fire(t: number, dt: number, stdpEnabled: boolean = false, stdpGain: number = 1.0): boolean {
    if (this.v < this.vThreshold) return false;
    this.lastSpikeTime = t;
    this.v = this.vReset;
    this.propagate(t, dt);
    for (const l of this.listeners) l(this, t);
    if (stdpEnabled) {
      this.updateTraces(t);
      this.applyPairStdp(t, stdpGain);
    }
    return true;
  }

  step(t: number, dt: number, stdpEnabled: boolean = false, stdpGain: number = 1.0): void {
    this.integrate(t, dt);
    this.fire(t, dt, stdpEnabled, stdpGain);
  }

  propagate(spikeTime: number, dt: number): void {
    for (const syn of this.outgoing) syn.transmit(spikeTime, dt);
  }

  addSpikeListener(l: SpikeListener): void {
    this.listeners.push(l);
  }

  removeSpikeListener(l: SpikeListener): void {
    const idx = this.listeners.indexOf(l);
    if (idx >= 0) this.listeners.splice(idx, 1);
  }

  connectTo(
    target: Neuron,
    weight: number = 0.5,
    delay: number = SYNAPSE_DELAY_MS,
    pspDurationMs: number = SYNAPSE_PSP_DURATION_MS,
  ): Synapse {
    const syn = new Synapse(this, target, weight, delay, pspDurationMs);
    this.outgoing.push(syn);
    target.incoming.push(syn);
    return syn;
  }

  // ── STDP ──
  private updateTraces(t: number): void {
    const last = this.lastSpikeTimeForTrace;
    if (last === null) {
      this.preTrace = 1.0;
      this.postTrace = 1.0;
    } else {
      const lag = t - last;
      this.preTrace = decayed(this.preTrace, lag, STDP_TAU_PLUS_MS) + 1.0;
      this.postTrace = decayed(this.postTrace, lag, STDP_TAU_MINUS_MS) + 1.0;
    }
    this.lastSpikeTimeForTrace = t;
  }

  private applyPairStdp(t: number, gain: number): void {
    // LTP — incoming excitatory 시냅스 의 pre.preTrace × (W_MAX - w).
    for (const syn of this.incoming) {
      if (syn.weight <= 0.0) continue;
      if (syn.frozen) continue;
      const synGain = gain * syn.stdpGainMultiplier;
      const pre = syn.pre;
      if (pre.lastSpikeTimeForTrace === null) continue;
      const lag = t - pre.lastSpikeTimeForTrace;
      if (lag < 0.0) continue;
      const xPre = decayed(pre.preTrace, lag, STDP_TAU_PLUS_MS);
      const ltp = STDP_A_PLUS * synGain * xPre * (STDP_W_MAX - syn.weight);
      syn.weight = clipWeight(syn.weight + ltp);

      const eligLag = t - syn.lastEligibilityUpdateMs;
      if (eligLag > 0) {
        syn.eligibilityTrace = decayed(syn.eligibilityTrace, eligLag, ELIGIBILITY_TAU_MS);
      }
      syn.eligibilityTrace += ltp;
      syn.lastEligibilityUpdateMs = t;
    }
    // LTD — outgoing excitatory 시냅스 의 post.postTrace × (w - W_MIN).
    for (const syn of this.outgoing) {
      if (syn.weight <= 0.0) continue;
      if (syn.frozen) continue;
      const synGain = gain * syn.stdpGainMultiplier;
      const post = syn.post;
      if (post.lastSpikeTimeForTrace === null) continue;
      const lag = t - post.lastSpikeTimeForTrace;
      if (lag < 0.0) continue;
      const yPost = decayed(post.postTrace, lag, STDP_TAU_MINUS_MS);
      const ltd = STDP_A_MINUS * synGain * yPost * (syn.weight - STDP_W_MIN);
      syn.weight = clipWeight(syn.weight - ltd);

      const eligLag = t - syn.lastEligibilityUpdateMs;
      if (eligLag > 0) {
        syn.eligibilityTrace = decayed(syn.eligibilityTrace, eligLag, ELIGIBILITY_TAU_MS);
      }
      syn.eligibilityTrace -= ltd;
      syn.lastEligibilityUpdateMs = t;
    }
  }
}
