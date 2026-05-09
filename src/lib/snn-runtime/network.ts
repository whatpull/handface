// NeuralNetwork — REST 세션과 동등한 평탄 뉴런 풀.
// modules/network.py 의 NeuralNetwork 와 같은 책임 (add_neuron / connect /
// inject / run / snapshot) 을 갖되, 브라우저 친화적 API 로 다듬는다.

import { Neuron, Synapse, type SpikeListener } from './neuron';

export interface NetworkOptions {
  defaultDtMs?: number;
}

export interface InjectEvent {
  // 자극 받을 뉴런 이름.
  neuron: string;
  // psp 단위 weight (mV peak 의미).
  weight: number;
  // 자극 시작 시점 (ms, network.t 기준).
  time: number;
  // 0 = 단일 impulse, > 0 = sustained (ms).
  durationMs?: number;
  // sustained 의 sub-step 간격. 미지정 시 dt 사용.
  stepMs?: number;
}

export interface SnapshotSynapse {
  preIdx: number;
  postIdx: number;
  weight: number;
  delay: number;
  pspDurationMs: number;
}

// schema v1 — base 5 fields per neuron. v2 adds NMDA + homeostatic + thresholdOffset.
// 사용자 catch 2026-05-09 (broken state — 두 번째 trigger 0Hz):
// snapshot 영역 NMDA / homeostatic flag drop → restore 후 default off → INPUT
// EPSP 영역 V_th 미달 → fire 0. v2 영역 7 신규 필드 영역 round-trip 보존,
// v1 snapshot 영역 backward compat (default 영역 적용 — 기존 IndexedDB cache 보존).
export interface NetworkSnapshotNeuronV2 {
  name: string;
  region: string | null;
  population: string | null;
  vRest: number;
  vThreshold: number;
  vReset: number;
  tauM: number;
  refractory: number;
  // v2 신규 필드 — restore 시 7 필드 모두 복원.
  nmdaEnabled: boolean;
  nmdaThreshold: number;
  nmdaGain: number;
  homeostaticEnabled: boolean;
  homeostaticIncrement: number;
  homeostaticDecay: number;
  thresholdOffset: number;
}

export type NetworkSnapshotNeuronV1 = Omit<
  NetworkSnapshotNeuronV2,
  | 'nmdaEnabled'
  | 'nmdaThreshold'
  | 'nmdaGain'
  | 'homeostaticEnabled'
  | 'homeostaticIncrement'
  | 'homeostaticDecay'
  | 'thresholdOffset'
>;

export interface NetworkSnapshot {
  // schema 영역 1 (legacy backward compat) | 2 (current — NMDA + homeostatic).
  schema: 1 | 2;
  dtMs: number;
  t: number;
  // v2 영역 NetworkSnapshotNeuronV2[] / v1 영역 NetworkSnapshotNeuronV1[].
  // restore 영역 schema 영역 분기 영역 default 영역 적용.
  neurons: Array<NetworkSnapshotNeuronV2 | NetworkSnapshotNeuronV1>;
  synapses: SnapshotSynapse[];
}

export class NeuralNetwork {
  readonly neurons: Neuron[] = [];
  readonly synapses: Synapse[] = [];
  // name → index. add 시 검증, 외부 lookup 에 사용.
  private byName = new Map<string, number>();
  // 현재 시뮬레이션 시간 (ms). run() 가 진전.
  t = 0.0;
  defaultDt: number;

  constructor(opts: NetworkOptions = {}) {
    this.defaultDt = opts.defaultDtMs ?? 0.1;
  }

  size(): number {
    return this.neurons.length;
  }

  has(name: string): boolean {
    return this.byName.has(name);
  }

  get(name: string): Neuron | null {
    const i = this.byName.get(name);
    return i === undefined ? null : this.neurons[i];
  }

  addNeuron(neuron: Neuron): number {
    if (this.byName.has(neuron.name)) {
      throw new Error(`Neuron name 중복: ${neuron.name}`);
    }
    const idx = this.neurons.length;
    this.neurons.push(neuron);
    this.byName.set(neuron.name, idx);
    return idx;
  }

  connect(
    preName: string,
    postName: string,
    weight: number = 0.5,
    delay?: number,
    pspDurationMs?: number,
  ): Synapse {
    const pre = this.get(preName);
    const post = this.get(postName);
    if (!pre) throw new Error(`pre 뉴런 없음: ${preName}`);
    if (!post) throw new Error(`post 뉴런 없음: ${postName}`);
    const syn = pre.connectTo(post, weight, delay, pspDurationMs);
    this.synapses.push(syn);
    return syn;
  }

  // 외부 자극 큐잉. run() 이 시간 진전 시 receiveSpike 호출.
  inject(events: InjectEvent[]): void {
    for (const e of events) {
      const neuron = this.get(e.neuron);
      if (!neuron) continue; // 이름 매핑 실패 시 silent skip (HANDFACE_INPUT_MAP 호환).
      const duration = e.durationMs ?? 0;
      if (duration <= 0) {
        neuron.receiveSpike(e.weight, e.time);
        continue;
      }
      const stepMs = e.stepMs ?? this.defaultDt;
      const n = Math.max(1, Math.floor(duration / stepMs));
      for (let i = 0; i < n; i += 1) {
        neuron.receiveSpike(e.weight, e.time + i * stepMs);
      }
    }
  }

  // 시뮬레이션 진전. stdpEnabled=true 시 모든 fire 에 STDP 적용.
  run(durationMs: number, opts: { dtMs?: number; stdpEnabled?: boolean; stdpGain?: number } = {}): void {
    const dt = opts.dtMs ?? this.defaultDt;
    const stdp = opts.stdpEnabled ?? false;
    const gain = opts.stdpGain ?? 1.0;
    const steps = Math.max(0, Math.floor(durationMs / dt));
    for (let i = 0; i < steps; i += 1) {
      const t = this.t + i * dt;
      // integrate → fire 분리 호출 (Python step() 와 동등).
      for (const n of this.neurons) n.integrate(t, dt);
      for (const n of this.neurons) n.fire(t, dt, stdp, gain);
    }
    this.t += steps * dt;
  }

  // 모든 뉴런에 동일 listener 부착 — SpikeMonitor 와 같은 관찰자 패턴.
  addGlobalSpikeListener(l: SpikeListener): () => void {
    for (const n of this.neurons) n.addSpikeListener(l);
    return () => {
      for (const n of this.neurons) n.removeSpikeListener(l);
    };
  }

  // ── snapshot / restore (D1 직렬화 대상) ──
  // schema v2 (PR fix/live-mode-time-and-restore): NMDA + homeostatic flag +
  // thresholdOffset 영역 round-trip 영역 보존. v1 snapshot 영역 restore 영역
  // backward compat — default 영역 적용 (current behavior 영역 동일).
  snapshot(): NetworkSnapshot {
    const idxOf = new Map<Neuron, number>();
    for (let i = 0; i < this.neurons.length; i += 1) idxOf.set(this.neurons[i], i);
    return {
      schema: 2,
      dtMs: this.defaultDt,
      t: this.t,
      neurons: this.neurons.map((n) => ({
        name: n.name,
        region: n.region,
        population: n.population,
        vRest: n.vRest,
        vThreshold: n.vThreshold,
        vReset: n.vReset,
        tauM: n.tauM,
        refractory: n.refractory,
        // v2 신규 7 필드.
        nmdaEnabled: n.nmdaEnabled,
        nmdaThreshold: n.nmdaThreshold,
        nmdaGain: n.nmdaGain,
        homeostaticEnabled: n.homeostaticEnabled,
        homeostaticIncrement: n.homeostaticIncrement,
        homeostaticDecay: n.homeostaticDecay,
        thresholdOffset: n.thresholdOffset,
      })),
      synapses: this.synapses.map((s) => ({
        preIdx: idxOf.get(s.pre) ?? -1,
        postIdx: idxOf.get(s.post) ?? -1,
        weight: s.weight,
        delay: s.delay,
        pspDurationMs: s.pspDurationMs,
      })),
    };
  }

  static restore(snap: NetworkSnapshot): NeuralNetwork {
    if (snap.schema !== 1 && snap.schema !== 2) {
      throw new Error(`알 수 없는 snapshot schema: ${snap.schema}`);
    }
    const net = new NeuralNetwork({ defaultDtMs: snap.dtMs });
    const isV2 = snap.schema === 2;
    for (const n of snap.neurons) {
      const neuron = new Neuron({
        name: n.name,
        region: n.region,
        population: n.population,
        vRest: n.vRest,
        vThreshold: n.vThreshold,
        vReset: n.vReset,
        tauM: n.tauM,
        refractory: n.refractory,
      });
      // v2 영역 7 신규 필드 영역 복원. v1 영역 default (current behavior 정합).
      if (isV2) {
        const nv2 = n as NetworkSnapshotNeuronV2;
        neuron.nmdaEnabled = nv2.nmdaEnabled;
        neuron.nmdaThreshold = nv2.nmdaThreshold;
        neuron.nmdaGain = nv2.nmdaGain;
        neuron.homeostaticEnabled = nv2.homeostaticEnabled;
        neuron.homeostaticIncrement = nv2.homeostaticIncrement;
        neuron.homeostaticDecay = nv2.homeostaticDecay;
        neuron.thresholdOffset = nv2.thresholdOffset;
      }
      net.addNeuron(neuron);
    }
    for (const s of snap.synapses) {
      const pre = net.neurons[s.preIdx];
      const post = net.neurons[s.postIdx];
      if (!pre || !post) continue;
      const syn = pre.connectTo(post, s.weight, s.delay, s.pspDurationMs);
      net.synapses.push(syn);
    }
    net.t = snap.t;
    return net;
  }
}
