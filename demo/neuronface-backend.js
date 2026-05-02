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
// server-side HANDFACE_INPUT_MAP 와 정합 (4 GESTURE 모두 mapping).
// D37 시점: thumbsup/victory = 회로 INPUT 부재 (M14, β-1 disabled UI).
// D40 (δ-2 / M14 해소): network.py:284 에 in_thumbsup/in_victory 추가 → 4 GESTURE 모두 활성.
export const HANDFACE_GESTURE_TO_INPUT = {
  pointing: 'in_point',
  openpalm: 'in_palm',
  thumbsup: 'in_thumbsup',
  victory: 'in_victory',
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
    // T5.1-2b: stdp_mode field. 'pair' (D9 default, anchor 정합) | 'triplet' (Pfister-Gerstner 2006).
    this._stdpMode     = 'pair';
    // Session 37 Phase 7: 벡터화 backend 토글 (default false = NN, true = vectorized).
    this._useVectorized = false;
  }

  setUseVectorized(enabled) {
    this._useVectorized = Boolean(enabled);
  }

  get useVectorized() { return this._useVectorized; }

  setStdpEnabled(enabled) {
    this._stdpEnabled = Boolean(enabled);
  }

  get stdpEnabled() {
    return this._stdpEnabled;
  }

  setStdpMode(mode) {
    if (mode !== 'pair' && mode !== 'triplet') {
      console.warn(`[neuronface] invalid stdp_mode: ${mode}, ignoring`);
      return;
    }
    this._stdpMode = mode;
  }

  get stdpMode() {
    return this._stdpMode;
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
      stdp_mode:            this._stdpMode,
    };
    console.log(
      `[neuronface] calling /handface_train with stdp=${this._stdpEnabled} mode=${this._stdpMode} ` +
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
   * T5.1-2c: 임의 neuron 직접 자극 + STDP + observe.
   * handface_train 영역 정합 패턴 다만 INPUT 매핑 영역 본 직접 inject.
   * @param {string} neuronName - target neuron name (e.g. 'v1_L4_E_8')
   * @returns {Promise<{ok: boolean, response?: any, reason?: string}>}
   */
  async induceFire(neuronName) {
    if (!this._connected || !this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const body = {
      neuron_name:          neuronName,
      weight:               25.0,
      stimulus_duration_ms: 15.0,
      observe_ms:           50.0,
      stdp:                 this._stdpEnabled,
      stdp_mode:            this._stdpMode,
    };
    console.log(
      `[neuronface] calling /induce_fire with stdp=${this._stdpEnabled} mode=${this._stdpMode} ` +
      `(neuron=${neuronName})`,
    );
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/induce_fire`,
        { method: 'POST', body },
      );
      this.emit({
        type:      'neuron-firing',
        gesture:   `induce:${neuronName}`,
        intensity: 1.0,
        response:  resp,
      });
      return { ok: true, response: resp };
    } catch (err) {
      this.emit({
        type:      'neuron-firing',
        gesture:   `induce:${neuronName}`,
        intensity: 1.0,
        response:  null,
        error:     err.message,
      });
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Phase 6.3: 다 noeurons 동시 직접 자극 (V1 + V2 동시 fire = LTP 발동, BCM 검증).
   * backend Phase 6.2 정합 (POST /induce_fire body.neuron_names list).
   * @param {string[]} neuronNames - target neurons (e.g., ['v1_L4_E_8', 'v2_L4_E_5'])
   * @returns {Promise<{ok: boolean, response?: any, reason?: string}>}
   */
  async induceFireMulti(neuronNames) {
    if (!Array.isArray(neuronNames) || neuronNames.length === 0) {
      return { ok: false, reason: 'neuronNames must be non-empty array' };
    }
    if (!this._connected || !this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const body = {
      neuron_names:         neuronNames,
      weight:               25.0,
      stimulus_duration_ms: 15.0,
      observe_ms:           50.0,
      stdp:                 this._stdpEnabled,
      stdp_mode:            this._stdpMode,
    };
    console.log(
      `[neuronface] calling /induce_fire (multi) with stdp=${this._stdpEnabled} mode=${this._stdpMode} ` +
      `(neurons=[${neuronNames.join(',')}])`,
    );
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/induce_fire`,
        { method: 'POST', body },
      );
      this.emit({
        type:      'neuron-firing',
        gesture:   `induce-multi:${neuronNames.join(',')}`,
        intensity: 1.0,
        response:  resp,
      });
      return { ok: true, response: resp };
    } catch (err) {
      this.emit({
        type:      'neuron-firing',
        gesture:   `induce-multi:${neuronNames.join(',')}`,
        intensity: 1.0,
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
      stdp_mode:            this._stdpMode,
    };
    console.log(
      `[neuronface] calling /handface_train (multi) with stdp=${this._stdpEnabled} mode=${this._stdpMode} ` +
      `(gestures=[${names.join(',')}] -> inputs=[${mappedInputs.join(',')}], intensity=${clampedIntensity})`,
    );
    const endpoint = this._useVectorized ? 'handface_train_vectorized' : 'handface_train';
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/${endpoint}`,
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

  /**
   * Session 37 Phase 4 본격: POST /handface_train_supervised — supervised RL.
   * gesture INPUT + target OUT 동시 자극 + STDP 영역 INPUT→V1→V2→OUT_n path 강화.
   * @param {string} gestureName  - 'pointing' | 'openpalm' | 'thumbsup' | 'victory'
   * @param {string} targetOut    - 'out_0' | 'out_1' | 'out_2' | 'out_3'
   * @param {object} [opts]       - { multiInput: bool, intensity, supervisorWeight, supervisorDelayMs }
   */
  async trainSupervised(gestureName, targetOut, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const intensity = opts.intensity ?? 1.0;
    const body = {
      type:                 'gesture',
      name:                 gestureName,
      target_out:           targetOut,
      intensity,
      stimulus_duration_ms: 15.0,
      observe_ms:           50.0,
      stdp:                 true,
      stdp_mode:            this._stdpMode,
    };
    if (opts.multiInput) {
      // multi-INPUT 8 (TRAIN CASCADE 정합 패턴) — supervised RL 학습 안정 영역.
      body.inputs = ['in_pinch', 'in_fist', 'in_palm', 'in_point',
                     'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory'];
    }
    if (opts.supervisorWeight !== undefined) body.supervisor_weight = opts.supervisorWeight;
    if (opts.supervisorDelayMs !== undefined) body.supervisor_delay_ms = opts.supervisorDelayMs;
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/handface_train_supervised`,
        { method: 'POST', body },
      );
      this.emit({
        type:      'neuron-firing',
        gesture:   `supervised:${gestureName}->${targetOut}`,
        intensity,
        response:  resp,
      });
      return { ok: true, response: resp };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 37 Phase 2 multi-modal: POST /networks/{id}/inject_pattern.
   * 영역 modality 8-dim pattern 영역 INPUT 영역.
   * @param {number[]} pattern - 8 floats [0,1].
   * @param {object} [opts]    - { modality, targetOut, intensity, stdp, supervisorWeight, supervisorDelayMs }
   */
  async injectPattern(pattern, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const body = {
      pattern,
      modality:             opts.modality   ?? 'custom',
      intensity:            opts.intensity  ?? 1.0,
      stimulus_duration_ms: 15.0,
      observe_ms:           50.0,
      stdp:                 opts.stdp        ?? false,
      stdp_mode:            this._stdpMode,
    };
    if (opts.targetOut)         body.target_out          = opts.targetOut;
    if (opts.supervisorWeight !== undefined) body.supervisor_weight = opts.supervisorWeight;
    if (opts.supervisorDelayMs !== undefined) body.supervisor_delay_ms = opts.supervisorDelayMs;
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/${this._useVectorized ? 'inject_pattern_vectorized' : 'inject_pattern'}`,
        { method: 'POST', body },
      );
      this.emit({
        type:      'neuron-firing',
        gesture:   `pattern:${body.modality}`,
        intensity: body.intensity,
        response:  resp,
      });
      return { ok: true, response: resp };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 37 Phase 4 cascade decode 검증: POST /networks/{id}/decode_pathway 토글.
   * @param {boolean} enabled - true=직접 INPUT→OUT pathway 활성, false=비활성 (cascade only).
   * @param {object} [opts]   - { weight }
   */
  async setDecodePathway(enabled, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const body = { enabled, weight: opts.weight ?? 30.0 };
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/decode_pathway`,
        { method: 'POST', body },
      );
      return { ok: true, response: resp };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 37 Phase 7 topology: 현재 회로 신경세포 + 시냅스 export.
   * neurons는 기본 preset 외 grown 뉴런만 (region/population/v_threshold 포함).
   * synapses는 모든 시냅스 (pre/post/weight/delay).
   */
  async exportTopology() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}`);
      const neurons = (data.neurons || []).map(n => ({
        name: n.name,
        region: n.region,
        population: n.population,
        v_threshold: n.v_threshold,
        v_rest: n.v_rest,
        v_reset: n.v_reset,
        tau_m: n.tau_m,
        refractory: n.refractory,
      }));
      const synapses = (data.synapses || []).map(s => ({
        pre: s.pre,
        post: s.post,
        weight: s.weight,
        delay: s.delay,
      }));
      return { ok: true, neurons, synapses };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 37 Phase 7 topology: neurons + synapses를 백엔드에 import.
   * 기본 preset을 빌드한 뒤, preset에 없는 neuron만 add_neuron 호출, 모든 synapse를 add_synapse로 추가.
   * 단순화: preset rebuild 후 delta만 추가.
   */
  async importTopology(neurons, synapses) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    // 1. preset rebuild.
    await this._fetch(`/networks/${this._networkId}/presets/basic`, {
      method: 'POST', body: { overwrite: true },
    });
    // 2. preset 후 현재 neurons 가져옴.
    const baseSnap = await this._fetch(`/networks/${this._networkId}`);
    const existing = new Set((baseSnap.neurons || []).map(n => n.name));
    // 3. preset에 없는 neuron만 추가.
    let addedNeurons = 0;
    for (const n of neurons) {
      if (existing.has(n.name)) continue;
      try {
        await this._fetch(`/networks/${this._networkId}/neurons`, {
          method: 'POST', body: {
            name: n.name,
            region: n.region,
            population: n.population,
            v_threshold: n.v_threshold ?? -55.0,
            v_rest: n.v_rest ?? -70.0,
            v_reset: n.v_reset ?? -75.0,
            tau_m: n.tau_m ?? 15.0,
            refractory: n.refractory ?? 2.0,
          },
        });
        addedNeurons += 1;
      } catch (err) {
        console.warn(`[topology import] add_neuron ${n.name} 실패:`, err.message);
      }
    }
    // 4. 새 neuron으로 향한 시냅스만 추가 (preset 시냅스는 보존).
    const presetSynapses = new Set((baseSnap.synapses || []).map(s => `${s.pre}->${s.post}`));
    let addedSynapses = 0;
    for (const s of synapses) {
      const key = `${s.pre}->${s.post}`;
      if (presetSynapses.has(key)) continue;
      try {
        await this._fetch(`/networks/${this._networkId}/synapses`, {
          method: 'POST', body: {
            source: s.pre, target: s.post,
            weight: s.weight, delay: s.delay ?? 1.0,
          },
        });
        addedSynapses += 1;
      } catch (err) {
        console.warn(`[topology import] add_synapse ${s.pre}->${s.post} 실패:`, err.message);
      }
    }
    return { ok: true, addedNeurons, addedSynapses };
  }

  /**
   * Session 37 Phase 7: POST /networks/{id}/grow_region — 동적 영역 영역.
   * @param {string} region     - 'V1' | 'V2'
   * @param {string} population - 'L4_E' | 'L23_E' | 'L5_E'
   * @param {number} count      - 1-20
   * @param {object} [opts]     - { connectDensity, weight }
   */
  async growRegion(region, population, count, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const body = {
      region,
      population,
      count,
      connect_density: opts.connectDensity ?? 0.3,
      weight:          opts.weight         ?? 8.0,
    };
    try {
      const resp = await this._fetch(
        `/networks/${this._networkId}/grow_region`,
        { method: 'POST', body },
      );
      return { ok: true, response: resp };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 37 Phase 5: POST /networks/{id}/neuromodulator — 신경조절 영역 set.
   * @param {object} mods - { dopamine?, acetylcholine?, serotonin? }
   */
  async setNeuromodulator(mods) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    try {
      const data = await this._fetch(`/networks/${this._networkId}/neuromodulator`, {
        method: 'POST',
        body: mods,
      });
      return { ok: true, response: data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 37 Phase 5: GET /networks/{id}/neuromodulator — 영역 read.
   */
  async getNeuromodulator() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/neuromodulator`);
      return { ok: true, response: data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 36: GET /networks/{id}/training/snapshot — 모든 synapse weight snapshot 반환.
   * 사용자 학습 결과 영역 localStorage 보존 사용.
   */
  async getTrainingSnapshot() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/training/snapshot`);
      return { ok: true, response: data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 36: POST /networks/{id}/training/load — bulk weight 갱신.
   * synapses = [{pre, post, weight}] array.
   */
  async loadTrainingSnapshot(synapses) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!Array.isArray(synapses) || synapses.length === 0) {
      return { ok: false, reason: 'empty synapses' };
    }
    try {
      const data = await this._fetch(`/networks/${this._networkId}/training/load`, {
        method: 'POST',
        body: { synapses },
      });
      return { ok: true, response: data };
    } catch (err) {
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
