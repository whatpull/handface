// NeuralNetwork — REST 세션과 동등한 평탄 뉴런 풀.
// modules/network.py 의 NeuralNetwork 와 같은 책임 (add_neuron / connect /
// inject / run / snapshot) 을 갖되, 브라우저 친화적 API 로 다듬는다.

import { Neuron, Synapse, type SpikeListener, type StdpMode } from './neuron';

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

  // ── SoA (Struct of Arrays) 버퍼 — LIF integrate fast-path ──
  // addNeuron / restore 시 grow, run() inner loop 에서 직접 인덱스 접근.
  // 각 배열의 길이는 neurons.length 와 동일하게 유지된다.
  //
  // Float32Array: v, vRest, vReset, tauM, refractory, lastSpikeTime,
  //               nmdaThreshold, nmdaGain, inputBuf (per-step current)
  // Uint8Array:   nmdaEnabled (0|1), inRefractory flag (per-step)
  private _soaN = 0; // 현재 SoA 버퍼에 유효한 뉴런 수
  private _vBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _vRestBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _vResetBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _tauMBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _refracBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _lastSpikeBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _nmdaEnabledBuf: Uint8Array<ArrayBuffer> = new Uint8Array(0) as Uint8Array<ArrayBuffer>;
  private _nmdaThreshBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _nmdaGainBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>;
  private _inputBuf: Float32Array<ArrayBuffer> = new Float32Array(0) as Float32Array<ArrayBuffer>; // drainCurrent 결과 임시 보관

  constructor(opts: NetworkOptions = {}) {
    this.defaultDt = opts.defaultDtMs ?? 0.1;
  }

  /**
   * SoA 버퍼를 뉴런 배열과 동기화한다.
   * addNeuron 직후 또는 restore 완료 후 호출된다.
   * 기존 데이터는 copy되므로 incremental grow 도 안전하다.
   */
  private _growSoA(newSize: number): void {
    if (newSize <= this._soaN) return;
    const growF32 = (old: Float32Array<ArrayBuffer>): Float32Array<ArrayBuffer> => {
      const next = new Float32Array(newSize) as Float32Array<ArrayBuffer>;
      next.set(old);
      return next;
    };
    const growU8 = (old: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => {
      const next = new Uint8Array(newSize) as Uint8Array<ArrayBuffer>;
      next.set(old);
      return next;
    };
    this._vBuf = growF32(this._vBuf);
    this._vRestBuf = growF32(this._vRestBuf);
    this._vResetBuf = growF32(this._vResetBuf);
    this._tauMBuf = growF32(this._tauMBuf);
    this._refracBuf = growF32(this._refracBuf);
    this._lastSpikeBuf = growF32(this._lastSpikeBuf);
    this._nmdaEnabledBuf = growU8(this._nmdaEnabledBuf);
    this._nmdaThreshBuf = growF32(this._nmdaThreshBuf);
    this._nmdaGainBuf = growF32(this._nmdaGainBuf);
    this._inputBuf = growF32(this._inputBuf);
    this._soaN = newSize;
  }

  /** 뉴런 하나를 SoA 버퍼의 인덱스 idx 슬롯에 기록한다. */
  private _writeSoASlot(idx: number, n: Neuron): void {
    this._vBuf[idx] = n.v;
    this._vRestBuf[idx] = n.vRest;
    this._vResetBuf[idx] = n.vReset;
    this._tauMBuf[idx] = n.tauM;
    this._refracBuf[idx] = n.refractory;
    // lastSpikeTime: NEGATIVE_INFINITY → -1e38 (Float32 범위 내 sentinel)
    this._lastSpikeBuf[idx] = isFinite(n.lastSpikeTime) ? n.lastSpikeTime : -1e38;
    this._nmdaEnabledBuf[idx] = n.nmdaEnabled ? 1 : 0;
    this._nmdaThreshBuf[idx] = n.nmdaThreshold;
    this._nmdaGainBuf[idx] = n.nmdaGain;
  }

  /**
   * SoA 버퍼의 v / lastSpikeTime 을 Neuron 객체로부터 일괄 동기화한다.
   * run() 시작 시점에 호출되어 직전 fire() 에서 변경된 값들을 반영한다.
   */
  private _syncSoAFromNeurons(): void {
    const neurons = this.neurons;
    const N = neurons.length;
    const vBuf = this._vBuf;
    const lsBuf = this._lastSpikeBuf;
    for (let i = 0; i < N; i += 1) {
      const n = neurons[i];
      vBuf[i] = n.v;
      lsBuf[i] = isFinite(n.lastSpikeTime) ? n.lastSpikeTime : -1e38;
    }
  }

  /**
   * SoA 버퍼의 v 를 Neuron 객체로 역동기화한다.
   * SoA integrate pass 완료 후 fire() 가 최신 v 를 읽을 수 있게 한다.
   */
  private _syncVToNeurons(): void {
    const neurons = this.neurons;
    const N = neurons.length;
    const vBuf = this._vBuf;
    for (let i = 0; i < N; i += 1) {
      neurons[i].v = vBuf[i];
    }
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
    // SoA 버퍼 확장 + 슬롯 초기화
    this._growSoA(idx + 1);
    this._writeSoASlot(idx, neuron);
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
  //
  // SoA fast-path (P211): integrate 단계를 Float32Array 기반 연속 메모리로 실행.
  // 3-pass per step:
  //   Pass 1 — drainCurrent(t): OOP 객체에서 pending inputs 드레인 → inputBuf[i]
  //   Pass 2 — SoA LIF dv: Float32Array 인덱스 연산으로 vBuf[i] 업데이트 (hot loop)
  //   Pass 3 — fire(): OOP 유지 (STDP / homeostatic / propagate 복잡도)
  //   Pass 4 — syncV: fire() 가 변경한 v / lastSpikeTime 을 SoA 버퍼에 역동기화
  //
  // stdpMode: 'pair' (default, Bi & Poo 1998) | 'triplet' (Pfister & Gerstner 2006).
  // trace2 버퍼는 Neuron 객체에 유지됨 — SoA는 LIF integrate 전용.
  run(durationMs: number, opts: { dtMs?: number; stdpEnabled?: boolean; stdpGain?: number; stdpMode?: StdpMode } = {}): void {
    const dt = opts.dtMs ?? this.defaultDt;
    const stdp = opts.stdpEnabled ?? false;
    const gain = opts.stdpGain ?? 1.0;
    const mode: StdpMode = opts.stdpMode ?? 'pair';
    const steps = Math.max(0, Math.floor(durationMs / dt));
    if (steps === 0) return;

    const neurons = this.neurons;
    const N = neurons.length;

    // SoA 버퍼가 neurons 배열과 크기가 다를 경우 재동기화 (expandCluster 후 첫 run).
    if (this._soaN < N) {
      const prevSoAN = this._soaN;
      this._growSoA(N);
      // addNeuron 에서 못 채운 슬롯 초기화 (방어 코드 — 정상 경로에서는 0 iter)
      for (let i = prevSoAN; i < N; i += 1) this._writeSoASlot(i, neurons[i]);
    }

    // run() 시작 전 SoA v + lastSpikeTime 동기화 (직전 run 이후 외부 변경 반영).
    this._syncSoAFromNeurons();

    // 로컬 alias — JIT 최적화 친화적 (V8 deopt 회피)
    const vBuf = this._vBuf;
    const vRestBuf = this._vRestBuf;
    const vResetBuf = this._vResetBuf;
    const tauMBuf = this._tauMBuf;
    const refracBuf = this._refracBuf;
    const lastSpikeBuf = this._lastSpikeBuf;
    const inputBuf = this._inputBuf;

    for (let i = 0; i < steps; i += 1) {
      const t = this.t + i * dt;

      // Pass 1: pending inputs 드레인 → inputBuf (OOP — 시냅스 그래프 의존)
      for (let ni = 0; ni < N; ni += 1) {
        inputBuf[ni] = neurons[ni].drainCurrent(t);
      }

      // Pass 2: SoA LIF integrate — 연속 메모리 인덱스 연산 (hot loop)
      for (let ni = 0; ni < N; ni += 1) {
        if (t - lastSpikeBuf[ni] < refracBuf[ni]) {
          // refractory — v 를 vReset 으로 클램프
          vBuf[ni] = vResetBuf[ni];
        } else {
          const v = vBuf[ni];
          const dv = ((-(v - vRestBuf[ni]) + inputBuf[ni]) / tauMBuf[ni]) * dt;
          vBuf[ni] = v + dv;
        }
      }

      // Pass 3: SoA v → Neuron.v 역동기화 후 fire() (OOP — STDP/homeostatic/propagate)
      this._syncVToNeurons();
      for (let ni = 0; ni < N; ni += 1) {
        if (neurons[ni].fire(t, dt, stdp, gain, mode)) {
          // fire() 가 v, lastSpikeTime 을 변경했으므로 SoA 버퍼 즉시 갱신
          vBuf[ni] = neurons[ni].v;
          lastSpikeBuf[ni] = neurons[ni].lastSpikeTime;
        }
      }
    }

    // SoA 최종 v 를 Neuron 객체에 반영 (run 종료 후 외부가 n.v 로 읽는 경우 대비).
    // fire() pass 에서 이미 syncV 했으므로 lastStep 의 v 만 추가 반영.
    this._syncVToNeurons();

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
