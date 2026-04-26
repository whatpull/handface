/**
 * NeuronFace backend client.
 *
 * Flow per gesture:
 *   1. initialize()       — POST /networks → store network_id
 *                          → POST /networks/{id}/presets/basic
 *                          → emit 'connection-status' { ok, networkId, neuronsAdded, synapsesAdded }
 *   2. sendGesture(name, intensity)
 *                        — POST /networks/{id}/handface_train (D14, D26 partial_reset)
 *                        body.stdp = this._stdpEnabled (T5.2 1단계, D9 surface)
 *                          → emit 'neuron-firing' { gesture, intensity, response }
 *   3. testConnection()   — GET /health (public, no auth)
 *
 * Auth: Authorization: Bearer <apiKey>
 *       (neuronface also accepts X-API-Key header; Bearer chosen for simplicity.)
 *
 * Error handling: non-throwing. Failures emit events (connection-status with
 * ok=false, or neuron-firing with error) so UI can react without wrapping
 * every call in try/catch.
 */

const DEFAULT_ENDPOINT = 'https://whatpull-neuronface.hf.space';
const STORAGE_KEY      = 'handface-neuronface-v1';

// T5.2 2단계 (D29 multi-INPUT): handface gesture alias → 회로 INPUT name mapping.
// server-side HANDFACE_INPUT_MAP 의 단방향 부분집합 (회로 INPUT 부재한 thumbsup/victory 제외).
// M14 정합: thumbsup → in_thumbsup / victory → in_victory 가 server mapping 박혀있으나
// 회로 wiring (network.py:284) 에 부재 → 활성 2 GESTURE 만 박음 (β-1 결정).
export const HANDFACE_GESTURE_TO_INPUT = {
  pointing: 'in_point',
  openpalm: 'in_palm',
  // thumbsup, victory: 회로 INPUT 부재 — disabled UI (gesture.js)
};

export class NeuronFaceBackend {
  constructor({ apiKey = '', endpoint = DEFAULT_ENDPOINT } = {}) {
    this._apiKey       = apiKey;
    this._endpoint     = (endpoint || DEFAULT_ENDPOINT).replace(/\/$/, '');
    this._listeners    = [];
    this._networkId    = null;
    this._connected    = false;
    this._initializing = false;
    // T5.2 1단계 (D14/D9 surface): /handface_train + stdp:bool body field.
    // default false → anchor-equivalent path. UI toggle 가 setStdpEnabled() 통해 갱신.
    this._stdpEnabled  = false;
  }

  setStdpEnabled(enabled) {
    this._stdpEnabled = Boolean(enabled);
  }

  get stdpEnabled() {
    return this._stdpEnabled;
  }

  // ─── event bus ───
  onEvent(fn) {
    this._listeners.push(fn);
    return () => {
      const idx = this._listeners.indexOf(fn);
      if (idx >= 0) this._listeners.splice(idx, 1);
    };
  }

  emit(event) {
    for (const fn of this._listeners) {
      try {
        fn(event);
      } catch (err) {
        console.error('NeuronFaceBackend listener error:', err);
      }
    }
  }

  // ─── internal fetch helper ───
  async _fetch(path, { method = 'GET', body = null } = {}) {
    const url     = `${this._endpoint}${path}`;
    const headers = { 'Content-Type': 'application/json' };
    if (this._apiKey) {
      headers['Authorization'] = `Bearer ${this._apiKey}`;
    }
    const init = { method, headers };
    if (body !== null) init.body = JSON.stringify(body);

    let response;
    try {
      response = await fetch(url, init);
    } catch (err) {
      throw new Error(`network error: ${err.message}`);
    }

    let data = null;
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      try { data = await response.json(); } catch { data = null; }
    }

    if (!response.ok) {
      const detail = (data && data.detail) || `HTTP ${response.status}`;
      throw new Error(detail);
    }
    return data;
  }

  // ─── public API ───

  /**
   * POST /networks → POST /networks/{id}/presets/basic → GET /networks/{id}.
   * Idempotent: no-op if already connected. Concurrency-safe via _initializing.
   * Always emits 'connection-status' on completion. On success, the event
   * includes the full `neurons` and `synapses` arrays from the snapshot so
   * scene.js can rebuild its 3D topology.
   */
  async initialize() {
    if (this._connected) {
      return { ok: true, network_id: this._networkId };
    }
    if (this._initializing) {
      while (this._initializing) {
        await new Promise(r => setTimeout(r, 50));
      }
      if (this._connected) {
        return { ok: true, network_id: this._networkId };
      }
    }
    this._initializing = true;
    try {
      const net = await this._fetch('/networks', { method: 'POST', body: {} });
      this._networkId = net.id;
      const preset = await this._fetch(
        `/networks/${this._networkId}/presets/basic`,
        { method: 'POST', body: {} },
      );
      // Fetch the full snapshot so the viewer can lay out nodes + edges.
      const snapshot = await this._fetch(`/networks/${this._networkId}`);
      this._connected = true;
      this.emit({
        type:          'connection-status',
        ok:            true,
        networkId:     this._networkId,
        neuronsAdded:  preset.neurons_added,
        synapsesAdded: preset.synapses_added,
        neurons:       snapshot.neurons ?? [],
        synapses:      snapshot.synapses ?? [],
      });
      return {
        ok:         true,
        network_id: this._networkId,
        neurons:    preset.neurons_added,
        synapses:   preset.synapses_added,
      };
    } catch (err) {
      this._connected = false;
      this.emit({ type: 'connection-status', ok: false, reason: err.message });
      return { ok: false, reason: err.message };
    } finally {
      this._initializing = false;
    }
  }

  /**
   * POST /handface_train (T5.2 1단계, D14/D26). Auto-initializes if needed.
   * body.stdp = this._stdpEnabled (default false = anchor-equivalent).
   * inputs omit (1단계 single-INPUT D14 path; multi-INPUT 은 2단계 D29 영역).
   * Emits 'neuron-firing' with full response (success) or with error.
   */
  async sendGesture(name, intensity = 1.0) {
    if (!this._connected || !this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    // T5.2 1단계 (D14/D9): endpoint = /handface_train (D26 partial_reset 적용 path).
    // body.stdp = this._stdpEnabled. inputs omit (1단계 single-INPUT D14 path 유지).
    // anchor identity 정합 = stdp:false 시 D35 통과 검증됨 (v1_active=5, max_peak=-68.996).
    const body = {
      type:                 'gesture',
      name:                 name,
      intensity:            Math.max(0, Math.min(1, intensity)),
      stimulus_duration_ms: 15.0,
      observe_ms:           50.0,
      detail:               'summary',
      stdp:                 this._stdpEnabled,
    };
    console.log(
      `[neuronface] calling /handface_train with stdp=${this._stdpEnabled} ` +
      `(name=${name}, intensity=${intensity})`,
    );
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/handface_train`,
        { method: 'POST', body },
      );
      this.emit({
        type:      'neuron-firing',
        gesture:   name,
        intensity,
        response:  resp,
      });
      return { ok: true, response: resp };
    } catch (err) {
      // Emit anyway so UI can surface transient errors (e.g. cold start)
      this.emit({
        type:      'neuron-firing',
        gesture:   name,
        intensity,
        response:  null,
        error:     err.message,
      });
      return { ok: false, reason: err.message };
    }
  }

  /**
   * T5.2 2단계 (D29 multi-INPUT): button-driven multi-select dispatch.
   * gesture name list 를 받아 backend HANDFACE_INPUT_MAP 으로 INPUT 매핑됨 (server-side).
   * body.inputs = list[str] → handler 분기 (D29 spec). intensity/duration/observe 는
   * single-path (sendGesture) 와 동일.
   * mediapipe single-path (sendGesture) 와 공존 — 별도 endpoint 호출 path.
   */
  async sendGestures(names, intensity = 1.0) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    if (!Array.isArray(names) || names.length === 0) {
      console.warn('[neuronface] sendGestures: empty names array, skipped');
      return null;
    }
    const clampedIntensity = Math.max(0, Math.min(1, intensity));
    // body.name = first element (back-compat, 단 server-side 는 inputs 분기로 무시)
    // body.inputs = D29 multi-INPUT (server HANDFACE_INPUT_MAP 으로 INPUT 매핑)
    // 단 server validator 의 INPUT_NEURON_NAMES 는 raw INPUT name (in_palm 등) 기대 →
    // 여기서 names 는 gesture alias (pointing/openpalm) 라 server-side mapping 통과 안 함.
    // → handface 측에서 mapping 후 raw INPUT name list 로 박음.
    const mappedInputs = names.map(n => HANDFACE_GESTURE_TO_INPUT[n]).filter(Boolean);
    if (mappedInputs.length === 0) {
      console.warn(`[neuronface] sendGestures: no valid INPUT mapping for ${JSON.stringify(names)}`);
      return null;
    }
    const body = {
      type:                 'gesture',
      name:                 names[0],
      inputs:               mappedInputs,
      intensity:            clampedIntensity,
      stimulus_duration_ms: 15.0,
      observe_ms:           50.0,
      detail:               'summary',
      stdp:                 this._stdpEnabled,
    };
    console.log(
      `[neuronface] calling /handface_train (multi) with stdp=${this._stdpEnabled} ` +
      `(gestures=[${names.join(',')}] -> inputs=[${mappedInputs.join(',')}], intensity=${clampedIntensity})`,
    );
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/handface_train`,
        { method: 'POST', body },
      );
      this.emit({
        type:      'neuron-firing',
        gesture:   names.join('+'),
        intensity: clampedIntensity,
        response:  resp,
      });
      return { ok: true, response: resp };
    } catch (err) {
      this.emit({
        type:      'neuron-firing',
        gesture:   names.join('+'),
        intensity: clampedIntensity,
        response:  null,
        error:     err.message,
      });
      return { ok: false, reason: err.message };
    }
  }

  /** GET /health — public, no auth required. Used by Settings Test button. */
  async testConnection() {
    try {
      const data = await this._fetch('/health');
      return { ok: true, status: data.status, version: data.version };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  get networkId() { return this._networkId; }
  get connected() { return this._connected; }
  get endpoint()  { return this._endpoint; }
}

// ─────────────────────────────────────────
// localStorage helpers (single JSON entry under STORAGE_KEY)
// ─────────────────────────────────────────
export function loadNeuronFaceSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { apiKey: '', endpoint: DEFAULT_ENDPOINT };
    const parsed = JSON.parse(raw);
    return {
      apiKey:   typeof parsed.apiKey === 'string' ? parsed.apiKey : '',
      endpoint: (typeof parsed.endpoint === 'string' && parsed.endpoint)
        ? parsed.endpoint
        : DEFAULT_ENDPOINT,
    };
  } catch {
    return { apiKey: '', endpoint: DEFAULT_ENDPOINT };
  }
}

export function saveNeuronFaceSettings({ apiKey, endpoint }) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        apiKey:   apiKey || '',
        endpoint: endpoint || DEFAULT_ENDPOINT,
      }),
    );
    return true;
  } catch {
    return false;
  }
}

export { DEFAULT_ENDPOINT, STORAGE_KEY };
