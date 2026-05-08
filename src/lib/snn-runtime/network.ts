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

export interface NetworkSnapshot {
  schema: 1;
  dtMs: number;
  t: number;
  neurons: Array<{
    name: string;
    region: string | null;
    population: string | null;
    vRest: number;
    vThreshold: number;
    vReset: number;
    tauM: number;
    refractory: number;
  }>;
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
  snapshot(): NetworkSnapshot {
    const idxOf = new Map<Neuron, number>();
    for (let i = 0; i < this.neurons.length; i += 1) idxOf.set(this.neurons[i], i);
    return {
      schema: 1,
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
    if (snap.schema !== 1) throw new Error(`알 수 없는 snapshot schema: ${snap.schema}`);
    const net = new NeuralNetwork({ defaultDtMs: snap.dtMs });
    for (const n of snap.neurons) {
      net.addNeuron(
        new Neuron({
          name: n.name,
          region: n.region,
          population: n.population,
          vRest: n.vRest,
          vThreshold: n.vThreshold,
          vReset: n.vReset,
          tauM: n.tauM,
          refractory: n.refractory,
        }),
      );
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
