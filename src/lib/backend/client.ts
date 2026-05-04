// neuronface FastAPI 클라이언트. 라우트는 c:/workspace-lib/neuronface/app.py 와 정합.
// 결과 중 발화 정보(rates / active_neurons_by_region / synapses)가 있으면
// 'neuron-firing' 이벤트로 emit → Canvas 가 시각화.

import { loadBackendSettings, normalizeEndpoint } from './settings';
import { emitBackendEvent, type NeuronFiringDetail } from './events';

const NETWORK_KEY = 'handface.network.id';

interface FetchOpts {
  method?: 'GET' | 'POST' | 'DELETE';
  body?: unknown;
}

interface OkResult<T> { ok: true; data: T; }
interface ErrResult { ok: false; reason: string; status?: number; }
export type Result<T> = OkResult<T> | ErrResult;

export interface BackendNeuron {
  name: string;
  region?: string | null;
  population?: string | null;
}
export interface BackendSynapse {
  pre: string;
  post: string;
  weight: number;
  delay?: number;
}
export interface NetworkSnapshot {
  id: string;
  t: number;
  dt: number;
  neurons?: BackendNeuron[];
  synapses?: BackendSynapse[];
}

interface FireResponse {
  ok: boolean;
  rates?: Record<string, number>;
  rates_by_region?: Record<string, number>;
  out_rates?: Record<string, number>;
  active_neurons_by_region?: Record<string, string[]>;
  synapses?: Array<{ pre: string; post: string; weight: number }>;
}

const GESTURE_TO_OUT: Record<string, string> = {
  pointing: 'out_0',
  openpalm: 'out_1',
  thumbsup: 'out_2',
  victory:  'out_3',
};

// gesture → input neuron name 매핑 (백엔드 HANDFACE_INPUT_MAP 정합).
// induce_fire 직접 호출 시 사용 — handface_train 의 weight 상한 (25) 우회.
const GESTURE_TO_INPUT: Record<string, string> = {
  pointing: 'in_point',
  openpalm: 'in_palm',
  thumbsup: 'in_thumbsup',
  victory:  'in_victory',
};

export class NeuronFaceClient {
  endpoint: string;
  apiKey: string;
  networkId: string | null;
  private presetEnsured = false;

  constructor() {
    const s = loadBackendSettings();
    this.endpoint = s.endpoint;
    this.apiKey = s.apiKey;
    this.networkId =
      typeof window !== 'undefined' ? localStorage.getItem(NETWORK_KEY) : null;
  }

  setSettings(endpoint: string, apiKey: string) {
    const newEndpoint = normalizeEndpoint(endpoint);
    const endpointChanged = this.endpoint !== newEndpoint;
    const apiKeyChanged = this.apiKey !== apiKey;
    this.endpoint = newEndpoint;
    this.apiKey = apiKey;
    // endpoint 또는 API key 가 바뀌면 캐시된 networkId 폐기
    // → 다음 ensureNetwork 호출 시 새 endpoint 에서 신규 발급.
    if (endpointChanged || apiKeyChanged) {
      this.networkId = null;
      this.presetEnsured = false;
      if (typeof window !== 'undefined') localStorage.removeItem(NETWORK_KEY);
    }
  }

  private async request<T = unknown>(path: string, opts: FetchOpts = {}): Promise<Result<T>> {
    const url = `${this.endpoint}${path}`;
    const headers: Record<string, string> = {};
    if (this.apiKey) headers['x-api-key'] = this.apiKey;
    if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
    try {
      const r = await fetch(url, {
        method: opts.method || 'GET',
        headers,
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      });
      if (!r.ok) {
        const txt = await r.text().catch(() => '');
        return { ok: false, reason: `HTTP ${r.status} ${txt.slice(0, 200)}`, status: r.status };
      }
      const data = (await r.json()) as T;
      return { ok: true, data };
    } catch (e) {
      return { ok: false, reason: (e as Error).message || 'fetch failed' };
    }
  }

  async health(): Promise<Result<{ status: string }>> {
    return this.request('/health');
  }

  async getFullSnapshot(): Promise<Result<NetworkSnapshot>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    return this.request<NetworkSnapshot>(`/networks/${net.data}`);
  }

  // 네트워크 식별자 확보:
  //  1) localStorage 에 캐시된 ID 가 있고 백엔드에 살아있으면 재사용
  //  2) 없으면 신규 생성 + cortical preset 적용 (handface 시냅스 회로 구축)
  async ensureNetwork(): Promise<Result<string>> {
    if (this.networkId) {
      const probe = await this.request<NetworkSnapshot>(`/networks/${this.networkId}`);
      if (probe.ok) {
        await this.ensureCorticalPreset();
        return { ok: true, data: this.networkId };
      }
      // stale → 새로 생성.
      this.networkId = null;
      this.presetEnsured = false;
    }
    const created = await this.request<NetworkSnapshot>('/networks', { method: 'POST', body: {} });
    if (!created.ok) return created;
    this.networkId = created.data.id;
    if (typeof window !== 'undefined') localStorage.setItem(NETWORK_KEY, this.networkId);
    const presetOk = await this.ensureCorticalPreset();
    if (!presetOk.ok) return presetOk;
    return { ok: true, data: this.networkId };
  }

  // cortical preset 적용 — INPUT 8개 + V1/V2 다층 + OUT 4개 시냅스 회로 구축.
  // 네트워크에 이미 회로가 있으면 skip (snapshot 으로 검사 + 409 응답도 성공 취급).
  private async ensureCorticalPreset(): Promise<Result<unknown>> {
    if (this.presetEnsured || !this.networkId) return { ok: true, data: null };
    // 1. snapshot 로 in_pinch / 다수 neuron 존재 확인 (구버전 회로도 인정).
    const snap = await this.request<NetworkSnapshot>(`/networks/${this.networkId}`);
    if (snap.ok) {
      const neurons = snap.data.neurons || [];
      const hasInputs = neurons.some((n) => n.name?.startsWith('in_'));
      if (hasInputs || neurons.length > 0) {
        this.presetEnsured = true;
        return { ok: true, data: null };
      }
    }
    // 2. 비어 있으면 신규 적용 시도. 409 는 "이미 회로 있음" → 성공 취급.
    // v1_l4e_count=50 (백엔드 min): lateral recurrent (~10% density of N×N)
    // 4000 → 250 시냅스로 16x 감소, simulation 속도 약 5x 향상.
    // 시각화는 어차피 population 당 12개만 sampling 하므로 손실 없음.
    const r = await this.request(`/networks/${this.networkId}/presets/cortical`, {
      method: 'POST',
      body: { overwrite: false, v_threshold: -55.0, v1_l4e_count: 50 },
    });
    if (r.ok || (!r.ok && r.status === 409)) {
      this.presetEnsured = true;
      return { ok: true, data: null };
    }
    return r;
  }

  async initialize(): Promise<Result<{ id: string }>> {
    const r = await this.ensureNetwork();
    if (!r.ok) return r;
    return { ok: true, data: { id: r.data } };
  }

  // 단일 gesture inject (학습 없이) — induce_fire 로 V_th=-55 cascade 가능한 weight=80 사용.
  async sendGesture(gesture: string, intensity = 1.0): Promise<Result<FireResponse>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    const target = GESTURE_TO_INPUT[gesture];
    if (!target) return { ok: false, reason: `unknown gesture: ${gesture}` };
    const r = await this.request<FireResponse>(`/networks/${net.data}/induce_fire`, {
      method: 'POST',
      body: {
        neuron_name: target, weight: 80 * intensity,
        stimulus_duration_ms: 30, observe_ms: 200,
        stdp: false, stdp_mode: 'pair',
      },
    });
    if (r.ok) emitBackendEvent<NeuronFiringDetail>('neuron-firing', { ...(r.data as NeuronFiringDetail), gesture, intensity });
    return r;
  }

  async sendGestures(gestures: string[]): Promise<Result<FireResponse[]>> {
    const out: FireResponse[] = [];
    for (const g of gestures) {
      const r = await this.sendGesture(g);
      if (r.ok) out.push(r.data);
    }
    return { ok: true, data: out };
  }

  // Train — handface_train_supervised: gesture INPUT + target_out supervisor 동시 자극.
  // Hebbian co-activation 으로 gesture→OUT 매핑 학습.
  // 이전 induce_fire (target_out 없음) 는 모든 gesture 가 동일 OUT 에 수렴하는 문제.
  async trainCascade(
    gestures: string[],
    trials = 3,
    onProgress?: (done: number, total: number) => void,
  ): Promise<Result<{ trained: number; failed: number; total: number }>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    let trained = 0;
    let failed = 0;
    let done = 0;
    const total = trials * gestures.length;
    for (let t = 0; t < trials; t += 1) {
      for (const g of gestures) {
        const targetOut = GESTURE_TO_OUT[g];
        if (!targetOut) { failed += 1; done += 1; onProgress?.(done, total); continue; }
        const r = await this.request<FireResponse>(`/networks/${net.data}/handface_train_supervised`, {
          method: 'POST',
          body: {
            type: 'gesture', name: g,
            intensity: 3.75,                 // weight = 5 + 3.75*20 = 80 (V_th=-55 cascade)
            observe_ms: 80,
            stimulus_duration_ms: 15,
            target_out: targetOut,
            stdp: true,
            stdp_mode: 'pair',
            supervisor_weight: 60,           // OUT 강제 fire 보장
            supervisor_delay_ms: 30,         // cascade arrival 정합
          },
        });
        if (r.ok && r.data.ok !== false) {
          trained += 1;
          emitBackendEvent<NeuronFiringDetail>('neuron-firing', { ...(r.data as NeuronFiringDetail), gesture: g });
        } else {
          failed += 1;
        }
        done += 1;
        onProgress?.(done, total);
      }
    }
    emitBackendEvent('training-changed', { trained });
    return { ok: true, data: { trained, failed, total } };
  }

  // Eval — STDP 없이 inject → out_rates winner 와 정답 비교.
  async evalDecode(
    gestures: string[],
    trials = 2,
    onProgress?: (done: number, total: number) => void,
  ): Promise<Result<{ correct: number; total: number; accuracy: number }>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    let correct = 0;
    let total = 0;
    let done = 0;
    const totalCalls = trials * gestures.length;
    for (let t = 0; t < trials; t += 1) {
      for (const g of gestures) {
        const target = GESTURE_TO_INPUT[g];
        if (!target) { done += 1; onProgress?.(done, totalCalls); continue; }
        const r = await this.request<FireResponse>(`/networks/${net.data}/induce_fire`, {
          method: 'POST',
          body: {
            neuron_name: target, weight: 80,
            stimulus_duration_ms: 15, observe_ms: 60,
            stdp: false, stdp_mode: 'pair',
          },
        });
        done += 1;
        onProgress?.(done, totalCalls);
        if (!r.ok || r.data.ok === false) continue;
        total += 1;
        emitBackendEvent<NeuronFiringDetail>('neuron-firing', { ...(r.data as NeuronFiringDetail), gesture: g });
        const rates = r.data.rates || {};
        const winner = pickWinner(filterOut(rates));
        if (winner && winner === GESTURE_TO_OUT[g]) correct += 1;
      }
    }
    return { ok: true, data: { correct, total, accuracy: total > 0 ? correct / total : 0 } };
  }

  async reset(mode: 'dynamics' | 'all' = 'dynamics'): Promise<Result<unknown>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    const r = await this.request(`/networks/${net.data}/reset`, { method: 'POST', body: { mode } });
    if (r.ok) emitBackendEvent('circuit-changed', {});
    return r;
  }

  // 전체 회로 초기화 — 누적된 뉴런/시냅스 모두 폐기 후 base cortical preset 만 유지.
  // BrainBuilder 빌드 누적, Grow 누적 등으로 회로가 비대해진 경우 사용.
  async rebuildToBaseline(): Promise<Result<{ networkId: string }>> {
    // 1. 기존 네트워크 폐기 시도 (네트워크 없을 수도 있어 실패 무시).
    if (this.networkId) {
      await this.request(`/networks/${this.networkId}`, { method: 'DELETE' }).catch(() => null);
    }
    this.networkId = null;
    this.presetEnsured = false;
    if (typeof window !== 'undefined') localStorage.removeItem(NETWORK_KEY);
    // 2. 신규 네트워크 + cortical preset.
    const r = await this.ensureNetwork();
    if (!r.ok) return r;
    emitBackendEvent('circuit-changed', {});
    return { ok: true, data: { networkId: r.data } };
  }

  // Save 용 — 학습된 시냅스 weight 영구 저장.
  async getSnapshot(): Promise<Result<{
    ok: boolean; network_id: string; synapse_count: number;
    synapses: Array<{ pre: string; post: string; weight: number }>;
  }>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    return this.request(`/networks/${net.data}/training/snapshot`);
  }

  // Load 용 — 저장된 시냅스 weight 복원 (synapses 만, neurons 는 이미 있어야 함).
  async loadSnapshot(synapses: Array<{ pre: string; post: string; weight: number }>): Promise<Result<unknown>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    const r = await this.request(`/networks/${net.data}/training/load`, {
      method: 'POST',
      body: { synapses },
    });
    if (r.ok) emitBackendEvent('circuit-changed', {});
    return r;
  }

  // Export 용 — 회로 전체 (neurons + synapses) JSON 다운로드.
  async exportTopology(): Promise<Result<unknown>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    return this.request(`/networks/${net.data}/export`, {
      method: 'POST',
      body: { include_synapses: true },
    });
  }

  // Import 용 — Save snapshot 형식 ({synapses: [...]}) 또는 export 형식 둘 다 지원.
  async importTopology(payload: { synapses?: Array<{ pre: string; post: string; weight: number }> }): Promise<Result<unknown>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    if (!payload.synapses || payload.synapses.length === 0) {
      return { ok: false, reason: 'no synapses in import payload' };
    }
    const r = await this.request(`/networks/${net.data}/training/load`, {
      method: 'POST',
      body: { synapses: payload.synapses },
    });
    if (r.ok) emitBackendEvent('circuit-changed', {});
    return r;
  }

  // 단일 gesture 예측 — induce_fire (STDP off) → winner + OUT rates 4개.
  // gesture: 'pointing' | 'openpalm' | 'thumbsup' | 'victory'
  async predict(gesture: string): Promise<Result<{
    gesture: string;
    expectedOut: string;
    winner: string | null;
    winnerRate: number;
    outRates: Record<string, number>;
    correct: boolean;
    confidence: number;
  }>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    const target = GESTURE_TO_INPUT[gesture];
    const expectedOut = GESTURE_TO_OUT[gesture] || '';
    if (!target) return { ok: false, reason: `unknown gesture: ${gesture}` };
    const r = await this.request<FireResponse>(`/networks/${net.data}/induce_fire`, {
      method: 'POST',
      body: {
        neuron_name: target, weight: 80,
        stimulus_duration_ms: 15, observe_ms: 60,
        stdp: false, stdp_mode: 'pair',
      },
    });
    if (!r.ok || r.data.ok === false) return { ok: false, reason: r.ok ? 'backend rejected' : r.reason };
    emitBackendEvent<NeuronFiringDetail>('neuron-firing', { ...(r.data as NeuronFiringDetail), gesture });
    const rates = r.data.rates || {};
    const outRates = filterOut(rates);
    const winner = pickWinner(outRates);
    const winnerRate = winner ? (outRates[winner] || 0) : 0;
    const totalRate = Object.values(outRates).reduce((s, v) => s + v, 0);
    const confidence = totalRate > 0 ? winnerRate / totalRate : 0;
    return {
      ok: true,
      data: {
        gesture,
        expectedOut,
        winner,
        winnerRate,
        outRates,
        correct: winner === expectedOut,
        confidence,
      },
    };
  }

  async getStats(): Promise<Result<unknown>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    return this.request(`/networks/${net.data}/region-summary`, { method: 'POST', body: {} });
  }
}

function filterOut(rates: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const k in rates) if (k.startsWith('out_')) out[k] = rates[k];
  return out;
}

function pickWinner(rates: Record<string, number>): string | null {
  let winner: string | null = null;
  let max = 0;
  for (const [k, v] of Object.entries(rates)) {
    if (v > max) { max = v; winner = k; }
  }
  return winner;
}

let _client: NeuronFaceClient | null = null;
export function getClient(): NeuronFaceClient {
  if (!_client) _client = new NeuronFaceClient();
  return _client;
}
