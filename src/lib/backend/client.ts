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

  // feature16 preset 적용 — INPUT 16개 (in_feat_0..15) + V1/V2 + OUT 4 회로 구축.
  // 16-dim hand feature 를 그대로 입력으로 받는 정공법. 8 카테고리 INPUT 압축 손실 회피.
  private async ensureCorticalPreset(): Promise<Result<unknown>> {
    if (this.presetEnsured || !this.networkId) return { ok: true, data: null };
    const snap = await this.request<NetworkSnapshot>(`/networks/${this.networkId}`);
    if (snap.ok) {
      const neurons = snap.data.neurons || [];
      const hasFeat16 = neurons.some((n) => n.name?.startsWith('in_feat_'));
      if (hasFeat16) {
        this.presetEnsured = true;
        return { ok: true, data: null };
      }
      // 구 cortical 회로 (in_pinch 등) 인 경우 → overwrite 로 feature16 으로 교체.
      if (neurons.length > 0) {
        const r = await this.request(`/networks/${this.networkId}/presets/feature16`, {
          method: 'POST',
          body: { overwrite: true, v_threshold: -55.0, v1_l4e_count: 50 },
        });
        if (r.ok || r.status === 409) {
          this.presetEnsured = true;
          return { ok: true, data: null };
        }
        return r;
      }
    }
    const r = await this.request(`/networks/${this.networkId}/presets/feature16`, {
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
  // silent=true: 자동 restore 시 circuit-changed 미발화 (auto-snapshot self-wipe 회피).
  async loadSnapshot(
    synapses: Array<{ pre: string; post: string; weight: number }>,
    opts: { silent?: boolean } = {},
  ): Promise<Result<unknown>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    const r = await this.request(`/networks/${net.data}/training/load`, {
      method: 'POST',
      body: { synapses },
    });
    if (r.ok && !opts.silent) emitBackendEvent('circuit-changed', {});
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

  // 16-dim hand feature 직접 inject — feature16 preset 정합.
  // pattern: 16-vector (curls 5 + angles 5 + pinch + spread + palm_open + orient_x/y + wrist_roll).
  // target_out 지정 시 supervised STDP 학습.
  async injectPattern(
    pattern: number[],
    opts: {
      stdp?: boolean;
      targetOut?: string;
      intensity?: number;
      observeMs?: number;
      stimulusDurationMs?: number;
    } = {},
  ): Promise<Result<FireResponse>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    // 16-dim padding/clamping — 부족하면 0 으로 채움, 초과는 잘라냄.
    const p16 = new Array<number>(16).fill(0);
    for (let i = 0; i < Math.min(pattern.length, 16); i += 1) {
      const v = pattern[i];
      p16[i] = Math.max(0, Math.min(1, Number.isFinite(v) ? v : 0));
    }
    // 파라미터 — saturation 회피 (세션 37 N1 정정).
    // 직전: intensity=3.75 (base_weight=80) + observe_ms=80 → 모든 OUT 500Hz tie.
    // 정정: intensity=1.0 (base_weight=25) + observe_ms=30 → cascade 자극 약화.
    // 본질 catch (WTA 부재 / V2→OUT weight 과도) 는 backend 영역 — N2 별도.
    const r = await this.request<FireResponse>(`/networks/${net.data}/inject_feature16`, {
      method: 'POST',
      body: {
        pattern: p16,
        intensity: opts.intensity ?? 1.0,
        stimulus_duration_ms: opts.stimulusDurationMs ?? 15,
        observe_ms: opts.observeMs ?? 30,
        stdp: opts.stdp ?? false,
        stdp_mode: 'pair',
        target_out: opts.targetOut,
        supervisor_weight: 60,
        supervisor_delay_ms: 30,
      },
    });
    if (r.ok) emitBackendEvent<NeuronFiringDetail>('neuron-firing', r.data as NeuronFiringDetail);
    return r;
  }

  // Homeostatic synaptic scaling — 자주 fire 한 뉴런 weight 약화, 미발화는 강화.
  // Turrigiano (1998) 정합. autoCapture 에서 N tick 마다 호출 → winner monopoly 회피.
  async homeostatic(targetHz = 5.0): Promise<Result<{ ok: boolean; adjusted: number }>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    return this.request(`/networks/${net.data}/homeostatic`, {
      method: 'POST',
      body: { target_hz: targetHz, window_ms: 200, min_spikes: 1 },
    });
  }

  // 커뮤니티 — 학습 weight 기여 + 집계 baseline 가져오기.
  async contributeWeights(
    contributorId?: string | null,
  ): Promise<Result<{ ok: boolean; inserted: number }>> {
    const snap = await this.getSnapshot();
    if (!snap.ok) return snap;
    return this.request(`/community/weights/contribute`, {
      method: 'POST',
      body: {
        synapses: snap.data.synapses ?? [],
        contributor_id: contributorId ?? null,
        network_preset: 'feature16',
      },
    });
  }

  async fetchCommunityWeights(
    minContributors = 1,
  ): Promise<Result<{
    ok: boolean;
    synapses: Array<{ pre: string; post: string; weight: number; contributors: number; samples: number }>;
    count: number;
  }>> {
    return this.request(
      `/community/weights/aggregate?network_preset=feature16&min_contributors=${minContributors}`,
    );
  }

  async contributeExemplar(
    outKey: string,
    feature: number[],
    label: string | null,
    contributorId?: string | null,
  ): Promise<Result<{ ok: boolean }>> {
    return this.request(`/community/exemplars/contribute`, {
      method: 'POST',
      body: {
        out_key: outKey,
        feature: feature.slice(0, 64),
        label,
        contributor_id: contributorId ?? null,
      },
    });
  }

  // N4 batch supervised — cluster 전체 broadcast supervisor (backend ddb220e 정합).
  // backend endpoint: POST /networks/{id}/cluster_train_supervised
  // body: {patterns: N×16, target_cluster: 0..15, supervisor_weight, supervisor_delay_ms,
  //        intensity, observe_ms, stimulus_duration_ms, stdp_mode, delta_threshold}
  // 응답: {ok, trained, cluster, target_outs, weight_changes, weight_changes_count, ...}
  //
  // single target_out 방식 영역 cluster fire = 1/8 미달.
  // 본 endpoint 영역 cluster prefix `out_{cluster}_` 영역 8 OUT 모두 supervisor
  // pulse → cluster 8/8 fire 사실 (backend sanity test 통과 영역).
  //
  // 정직 한계 박음: TRAINED 정확도 영역 보장 0 — SNN 4-way 영역 학술 nontrivial.
  async clusterTrainSupervised(
    patterns: number[][],
    targetCluster: number,
    opts: {
      supervisorWeight?: number;
      supervisorDelayMs?: number;
      intensity?: number;
      observeMs?: number;
      stimulusDurationMs?: number;
      stdpMode?: 'pair' | 'triplet';
      deltaThreshold?: number;
    } = {},
  ): Promise<Result<{
    ok: boolean;
    trained: number;
    cluster: number;
    target_outs: string[];
    supervisor_weight: number;
    supervisor_delay_ms: number;
    stdp_mode: string;
    weight_changes_count: number;
    weight_changes: Array<{ pre: string; post: string; weight: number; delta: number }>;
    synapses_total: number;
    reason?: string;
    prefix?: string;
  }>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    // 16-dim padding/clamping per-pattern.
    const p16Patterns = patterns.map((pattern) => {
      const p16 = new Array<number>(16).fill(0);
      for (let i = 0; i < Math.min(pattern.length, 16); i += 1) {
        const v = pattern[i];
        p16[i] = Math.max(0, Math.min(1, Number.isFinite(v) ? v : 0));
      }
      return p16;
    });
    const r = await this.request<{
      ok: boolean;
      trained: number;
      cluster: number;
      target_outs: string[];
      supervisor_weight: number;
      supervisor_delay_ms: number;
      stdp_mode: string;
      weight_changes_count: number;
      weight_changes: Array<{ pre: string; post: string; weight: number; delta: number }>;
      synapses_total: number;
      reason?: string;
      prefix?: string;
    }>(`/networks/${net.data}/cluster_train_supervised`, {
      method: 'POST',
      body: {
        patterns: p16Patterns,
        target_cluster: targetCluster,
        supervisor_weight: opts.supervisorWeight ?? 30.0,
        supervisor_delay_ms: opts.supervisorDelayMs ?? 30.0,
        intensity: opts.intensity ?? 1.0,
        observe_ms: opts.observeMs ?? 80.0,
        stimulus_duration_ms: opts.stimulusDurationMs ?? 20.0,
        stdp_mode: opts.stdpMode ?? 'pair',
        delta_threshold: opts.deltaThreshold ?? 0.01,
      },
    });
    if (r.ok) emitBackendEvent('training-changed', { trained: r.data.trained });
    return r;
  }

  // N4 cluster lock — incoming 시냅스 STDP 영구 off (backend ddb220e 정합).
  // backend endpoint: POST /networks/{id}/cluster_lock
  // body: {cluster_id: 0..15, lock: bool}
  // batch 학습 완료 cluster 영역 catastrophic forgetting 회피 catch — 추가 학습 0.
  //
  // 정직 한계 박음: backend 영역 R-STDP / homeostatic 영역 frozen flag check 영역
  // 미검증 사실 (backend agent 영역 보고 영역 한계 박음). neuron.py STDP gate 영역만
  // 정합 — R-STDP pulse / astrocyte V_th adjust 영역 frozen 영역 무시 가능.
  async clusterLock(
    clusterId: number,
    opts: { lock?: boolean } = {},
  ): Promise<Result<{
    ok?: boolean;
    cluster_id: number;
    prefix: string;
    frozen?: number;
    reason?: string;
  }>> {
    const net = await this.ensureNetwork();
    if (!net.ok) return net;
    return this.request(`/networks/${net.data}/cluster_lock`, {
      method: 'POST',
      body: {
        cluster_id: clusterId,
        lock: opts.lock ?? true,
      },
    });
  }

}

let _client: NeuronFaceClient | null = null;
export function getClient(): NeuronFaceClient {
  if (!_client) _client = new NeuronFaceClient();
  return _client;
}
