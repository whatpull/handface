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
  // schema 영역 1 (legacy backward compat) | 2 (NMDA + homeostatic) |
  //   3 (cluster_active_inputs persist — 사용자 catch 2026-05-12).
  // v3 영역 v2 영역 neuron 직렬화 정합 + top-level `clusterActiveInputs` 영역 추가
  // (registry 영역 cluster slot 영역 activeInputs 영역 round-trip 보존). v2 / v1
  // 영역 backward compat — 본 field 영역 미존재 시 caller (worker-core
  // handleRestoreSnapshot) 영역 빈 배열 fallback (inferClusterRegistry 정합).
  schema: 1 | 2 | 3;
  dtMs: number;
  t: number;
  // v2 / v3 영역 NetworkSnapshotNeuronV2[] / v1 영역 NetworkSnapshotNeuronV1[].
  // restore 영역 schema 영역 분기 영역 default 영역 적용.
  neurons: Array<NetworkSnapshotNeuronV2 | NetworkSnapshotNeuronV1>;
  synapses: SnapshotSynapse[];
  // v3 (사용자 catch 2026-05-12 — snapshot-activeinputs-persist):
  //   registry.slots[ci].activeInputs 영역 round-trip 보존. 직전 (v2) 영역
  //   inferClusterRegistry 영역 neuron name scan 단 activeInputs 영역 빈 배열
  //   fallback → 영역 reload 영역 모든 cluster activeInputs=[] 영역 findExactMatchCluster
  //   영역 항상 -1 영역 catch → exact match miss → vigilance miss → 신규 cluster
  //   spawn → 사용자 catch "패턴 2 winner 영역 영역 영역 신규 패턴 5 spawn + 재학습".
  //   본 field 영역 worker-core handleSnapshot 영역 registry.slots.map(slot =>
  //   slot.activeInputs.slice()) 영역 동봉, handleRestoreSnapshot 영역 hydrate.
  //   schema=1/2 영역 (legacy snapshot) 영역 미동봉 → caller 영역 빈 배열 fallback
  //   (legacy 영역 동일 catch).
  clusterActiveInputs?: number[][];
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
    if (snap.schema !== 1 && snap.schema !== 2 && snap.schema !== 3) {
      throw new Error(`알 수 없는 snapshot schema: ${snap.schema}`);
    }
    const net = new NeuralNetwork({ defaultDtMs: snap.dtMs });
    // v2 / v3 영역 동일 neuron 직렬화 (NMDA + homeostatic + thresholdOffset) —
    // v3 영역 top-level clusterActiveInputs 영역 추가 (registry 영역 worker-core
    // 영역 별도 hydrate, network restore 영역 영역 영역 0).
    const isV2 = snap.schema === 2 || snap.schema === 3;
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
      // v2 영역 7 신규 필드 영역 복원. v1 영역 backward compat — n13 builder
      // default 영역 reapply (사용자 catch 2026-05-09 — Fix A: 기존 IndexedDB
      // v1 cache 영역 hydrate 시점 영역 NMDA off / homeostatic off default
      // 영역 적용 → INPUT EPSP 영역 V_th 미달 → fire 0 → cluster_rates 모두
      // 0 → "no winner — WTA 대기"). n13-orientation.ts L268-290 영역 ground
      // truth: 모든 neuron NMDA on, 모든 excitatory + OUT (NOT INPUT, NOT
      // inhibitory) homeostatic on.
      if (isV2) {
        const nv2 = n as NetworkSnapshotNeuronV2;
        neuron.nmdaEnabled = nv2.nmdaEnabled;
        neuron.nmdaThreshold = nv2.nmdaThreshold;
        neuron.nmdaGain = nv2.nmdaGain;
        neuron.homeostaticEnabled = nv2.homeostaticEnabled;
        neuron.homeostaticIncrement = nv2.homeostaticIncrement;
        neuron.homeostaticDecay = nv2.homeostaticDecay;
        neuron.thresholdOffset = nv2.thresholdOffset;
      } else {
        // v1 backward compat — n13 default 영역 reapply.
        // (1) ALL neurons: NMDA on (threshold=-65, gain=10).
        neuron.nmdaEnabled = true;
        neuron.nmdaThreshold = -65.0;
        neuron.nmdaGain = 10.0;
        // (2) excitatory + OUT only: homeostatic on.
        //     INPUT (in_feat_*) + inhibitory (*_I_* / *_I) 는 제외.
        const id = n.name;
        const isInput = id.startsWith('in_feat_');
        const isInhibitory = id.includes('_I_') || /_I$/.test(id);
        if (!isInput && !isInhibitory) {
          neuron.homeostaticEnabled = true;
          neuron.homeostaticIncrement = 2.0;
          neuron.homeostaticDecay = 0.995;
        }
        // thresholdOffset 영역 default 0 — v1 영역 누적 정보 없음.
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
