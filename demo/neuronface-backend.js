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
   * Session 37: 회로 완전 초기화 (preset basic + overwrite).
   * 모든 grown 뉴런 / 학습된 weight 제거 후 D130 baseline으로 복원.
   */
  async resetCircuit() {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/presets/basic`,
        { method: 'POST', body: { overwrite: true } },
      );
      return { ok: true, response: data };
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
   * Session 37 Phase 7: 전체 회로 사양 export — neurons + synapses + 신경조절 상태.
   * JSON 파일로 다운로드 / 외부 공유용. importCircuit으로 복원 가능.
   */
  async exportCircuit() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}`);
      let nm = null;
      try {
        nm = await this._fetch(`/networks/${this._networkId}/neuromodulator`);
      } catch (_) {}
      return {
        ok: true,
        spec: {
          version: 1,
          exported_at: new Date().toISOString(),
          neurons: (data.neurons || []).map(n => ({
            name: n.name, region: n.region, population: n.population,
            v_threshold: n.v_threshold, v_rest: n.v_rest, v_reset: n.v_reset,
            tau_m: n.tau_m, refractory: n.refractory,
          })),
          synapses: (data.synapses || []).map(s => ({
            pre: s.pre, post: s.post, weight: s.weight, delay: s.delay,
          })),
          neuromodulator: nm ? {
            dopamine: nm.dopamine, acetylcholine: nm.acetylcholine, serotonin: nm.serotonin,
          } : null,
        },
      };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 37 Phase 7: JSON 사양 객체로 회로 import.
   * importTopology + 신경조절 복원.
   */
  async importCircuit(spec) {
    if (!spec || !Array.isArray(spec.neurons) || !Array.isArray(spec.synapses)) {
      return { ok: false, reason: 'invalid spec' };
    }
    const r = await this.importTopology(spec.neurons, spec.synapses);
    if (!r.ok) return r;
    if (spec.neuromodulator) {
      try {
        await this.setNeuromodulator(spec.neuromodulator);
      } catch (_) {}
    }
    // weights 복원 (synapse import 후 weight overwrite).
    if (spec.synapses && spec.synapses.length > 0) {
      try {
        await this.loadTrainingSnapshot(spec.synapses);
      } catch (_) {}
    }
    return r;
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
   * Session 38: GET /networks/{id}/user_inputs — 사용자 추가 INPUT 노드 목록.
   * @returns { ok, user_inputs: [{ name, label, fanout }] }
   */
  async listUserInputs() {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    try {
      const data = await this._fetch(`/networks/${this._networkId}/user_inputs`);
      return { ok: true, userInputs: data.user_inputs || [] };
    } catch (err) {
      // Session 38: backend (HF Spaces) 재시작 등으로 network 없음 → 자동 재초기화 후 1회 retry.
      const msg = String(err.message || '');
      if (/not\s*found/i.test(msg) || msg.includes('404')) {
        const init = await this.initialize();
        if (!init.ok) return { ok: false, reason: init.reason };
        try {
          const data = await this._fetch(`/networks/${this._networkId}/user_inputs`);
          return { ok: true, userInputs: data.user_inputs || [] };
        } catch (err2) {
          return { ok: false, reason: err2.message };
        }
      }
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 38: POST /networks/{id}/user_inputs — 사용자 INPUT 노드 추가.
   * D200 cortical preset cascade에 자동 sparse wiring (V1 L4_E).
   * @param {string} label - 사람이 읽는 라벨 (max 64).
   * @param {object} opts - { kind='custom', fanoutDensity=0.5, fanoutWeight=16.0 }
   *   kind: 'custom' | 'audio' | 'text' | 'image' | 'motion' | 'keyboard' | 'mouse' | 'geo'
   * @returns { ok, name, label, kind, synapses_added, fanout_density, fanout_weight }
   */
  async addUserInput(label, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const body = {
      label,
      kind:           opts.kind          ?? 'custom',
      fanout_density: opts.fanoutDensity ?? 0.5,
      fanout_weight:  opts.fanoutWeight  ?? 16.0,
    };
    const doFetch = () => this._fetch(
      `/networks/${this._networkId}/user_inputs`,
      { method: 'POST', body },
    );
    try {
      const data = await doFetch();
      return { ok: true, ...data };
    } catch (err) {
      const msg = String(err.message || '');
      if (/not\s*found/i.test(msg) || msg.includes('404')) {
        const init = await this.initialize();
        if (!init.ok) return { ok: false, reason: init.reason };
        try {
          const data = await doFetch();
          return { ok: true, ...data };
        } catch (err2) {
          return { ok: false, reason: err2.message };
        }
      }
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 39: GET /networks/{id}/user_inputs/{name}/path_strength — 학습 진척도.
   * @returns { ok, name, path_strengths: { out_0: number, ..., user_out_X: number } }
   */
  async getUserInputPathStrength(name) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name || !name.startsWith('user_in_')) return { ok: false, reason: 'not user input' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_inputs/${encodeURIComponent(name)}/path_strength`,
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 39: GET /networks/{id}/user_inputs/{name}/route — 라우팅 조회.
   */
  async getUserInputRoute(name) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name || !name.startsWith('user_in_')) return { ok: false, reason: 'not user input' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/user_inputs/${encodeURIComponent(name)}/route`);
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 39: POST /networks/{id}/user_inputs/{name}/route — routed_to 설정.
   * routedTo=null → routing 해제 (모든 OUT 자유). 옛 backend 미지원 캐싱.
   */
  async setUserInputRoute(name, routedTo) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name || !name.startsWith('user_in_')) return { ok: false, reason: 'not user input' };
    if (this._routeEndpointMissing) return { ok: false, reason: 'endpoint not supported (cached)' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_inputs/${encodeURIComponent(name)}/route`,
        { method: 'POST', body: { routed_to: routedTo } },
      );
      return { ok: true, ...data };
    } catch (err) {
      const msg = String(err.message || '');
      if (/not\s*found/i.test(msg) || msg.includes('404')) this._routeEndpointMissing = true;
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 38 PR-H: POST /networks/{id}/user_inputs/inject_pattern — 8-dim pattern
   * 가중 sum 으로 사용자 노드 1뉴런에 inject (modality encoder 결과).
   */
  async injectUserInputPattern(name, pattern, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    if (!name || !name.startsWith('user_in_')) {
      return { ok: false, reason: 'not a user input node' };
    }
    if (!Array.isArray(pattern) || pattern.length !== 8) {
      return { ok: false, reason: 'pattern must be 8-dim array' };
    }
    const body = {
      name,
      pattern,
      intensity:    opts.intensity    ?? 1.0,
      duration_ms:  opts.durationMs   ?? 5.0,
      observe_ms:   opts.observeMs    ?? 50.0,
      stdp:         !!opts.stdp,
    };
    if (opts.targetOut)             body.target_out          = opts.targetOut;
    if (opts.supervisorWeight)      body.supervisor_weight   = opts.supervisorWeight;
    if (opts.supervisorDelayMs !== undefined)
                                     body.supervisor_delay_ms = opts.supervisorDelayMs;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_inputs/inject_pattern`,
        { method: 'POST', body },
      );
      // Session 38 fix: fire 시각화 이벤트 emit (rates + synapses 포함) →
      // applyFireToCanvas / updateCanvasFireNeuron 가 user_in 에서 V1 으로
      // 흐르는 시냅스 라인을 violet 강조 + active 노드 dot 점등.
      this.emit({
        type:      'neuron-firing',
        gesture:   `user-pattern:${name}`,
        intensity: opts.intensity ?? 1.0,
        response:  data,
      });
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 38: POST /networks/{id}/user_inputs/inject — 사용자 INPUT 단일 자극
   * (cascade 진입) + 옵션 supervised RL.
   * @param {string} name - user_in_<idx>
   * @param {object} opts - { weight=50, durationMs=5, observeMs=50, stdp=false,
   *                          targetOut, supervisorWeight=80, supervisorDelayMs=20 }
   */
  async injectUserInput(name, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    if (!name || !name.startsWith('user_in_')) {
      return { ok: false, reason: 'not a user input node' };
    }
    const body = {
      name,
      weight:        opts.weight        ?? 50.0,
      duration_ms:   opts.durationMs    ?? 5.0,
      observe_ms:    opts.observeMs     ?? 50.0,
      stdp:          !!opts.stdp,
    };
    if (opts.targetOut)             body.target_out          = opts.targetOut;
    if (opts.supervisorWeight)      body.supervisor_weight   = opts.supervisorWeight;
    if (opts.supervisorDelayMs !== undefined)
                                     body.supervisor_delay_ms = opts.supervisorDelayMs;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_inputs/inject`,
        { method: 'POST', body },
      );
      // Session 38 fix: fire 시각화 emit.
      this.emit({
        type:      'neuron-firing',
        gesture:   `user:${name}`,
        intensity: 1.0,
        response:  data,
      });
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 39: GET /networks/{id}/user_outputs — 사용자 OUT 노드 목록.
   * @returns { ok, userOutputs: [{ name, label, kind, fanin, action_config }] }
   */
  async listUserOutputs() {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    try {
      const data = await this._fetch(`/networks/${this._networkId}/user_outputs`);
      // Session 39 fix: 첫 호출 시 (한 번만) cross-WTA 정리 — 이전 버전이 생성한
      // user_out ↔ system out 양방향 inhibitory edges 제거.
      if (!this._wta_cleaned && (data.user_outputs || []).length > 0) {
        this._wta_cleaned = true;
        try {
          await this._fetch(
            `/networks/${this._networkId}/user_outputs/cleanup_wta`,
            { method: 'POST', body: {} },
          );
        } catch (_) { /* ignore */ }
      }
      return { ok: true, userOutputs: data.user_outputs || [] };
    } catch (err) {
      const msg = String(err.message || '');
      if (/not\s*found/i.test(msg) || msg.includes('404')) {
        const init = await this.initialize();
        if (!init.ok) return { ok: false, reason: init.reason };
        try {
          const data = await this._fetch(`/networks/${this._networkId}/user_outputs`);
          return { ok: true, userOutputs: data.user_outputs || [] };
        } catch (err2) {
          return { ok: false, reason: err2.message };
        }
      }
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 39: POST /networks/{id}/user_outputs — 사용자 OUT 노드 추가.
   * V2 L5_E sparse fanin + WTA lateral inhibition 자동 wiring.
   * @param {string} label
   * @param {object} opts - { kind='notification', actionConfig={}, fanInDensity=0.6, fanInWeight=30 }
   *   kind: 'notification' | 'speak' | 'webhook' | 'console' | 'custom'
   */
  async addUserOutput(label, opts = {}) {
    if (!this._networkId) {
      const init = await this.initialize();
      if (!init.ok) return { ok: false, reason: init.reason };
    }
    const body = {
      label,
      kind:           opts.kind          ?? 'notification',
      fanin_density:  opts.fanInDensity  ?? 0.6,
      fanin_weight:   opts.fanInWeight   ?? 30.0,
      action_config:  opts.actionConfig  ?? {},
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_outputs`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 39: POST /networks/{id}/user_outputs/{name}/config — action_config + label 갱신.
   * 첫 호출에서 endpoint 미지원 (404) 감지 시 _configEndpointMissing 플래그 set →
   * 이후 호출은 fetch 자체 skip (콘솔 404 noise 방지).
   */
  async updateUserOutputConfig(name, actionConfig, label) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name || !name.startsWith('user_out_')) return { ok: false, reason: 'not a user output node' };
    if (this._configEndpointMissing) {
      return { ok: false, reason: 'endpoint not supported (cached)' };
    }
    const body = { action_config: actionConfig || {} };
    if (label) body.label = label;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_outputs/${encodeURIComponent(name)}/config`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      const msg = String(err.message || '');
      if (/not\s*found/i.test(msg) || msg.includes('404')) {
        this._configEndpointMissing = true;
      }
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 42+ Tier2-F: POST /networks/{id}/sequence/train —
   * Temporal STDP — items 를 delay 간격으로 순차 inject + supervisor on target_out.
   * Markram 1997 / Pfister-Gerstner 2006 triplet STDP 활용.
   * @param {Array<{name, pattern?, weight?}>} items - 순서 있는 inject list.
   * @param {string} targetOut
   * @param {object} opts - {delayMs, rounds, observeMs, supervisorWeight}
   */
  async trainSequence(items, targetOut, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!Array.isArray(items) || items.length === 0) return { ok: false, reason: 'no items' };
    if (!targetOut) return { ok: false, reason: 'no target_out' };
    const body = {
      items: items.map(it => {
        const e = { name: it.name };
        if (it.pattern) e.pattern = it.pattern;
        if (typeof it.weight === 'number') e.weight = it.weight;
        return e;
      }),
      target_out: targetOut,
      delay_ms: opts.delayMs ?? 30.0,
      rounds: opts.rounds ?? 10,
      observe_ms: opts.observeMs ?? 50.0,
      supervisor_weight: opts.supervisorWeight ?? 60.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sequence/train`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 42+ Tier2-E: POST /networks/{id}/rl/feedback — reward prediction error 피드백.
   * reward > 0 = correct (LTP boost), reward < 0 = wrong (LTD).
   * Schultz 1997 reward-modulated STDP.
   * @param {number} reward - [-5, 5]. ±1 권장.
   * @param {string} [targetOut] - 정답 OUT (지정 시 supervisor pulse).
   */
  async sendRlFeedback(reward, targetOut, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      reward,
      observe_ms: opts.observeMs ?? 30.0,
      supervisor_weight: opts.supervisorWeight ?? 60.0,
      dopamine_amplitude: opts.dopamineAmplitude ?? 1.0,
    };
    if (targetOut) body.target_out = targetOut;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/rl/feedback`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 42+ Tier2-D: POST /networks/{id}/hippocampus/build — CA3/CA1 회로 추가.
   * O'Reilly & McClelland 1994. V2 → CA3 → CA1 → OUT pathway, CA3 sparse recurrent.
   */
  async buildHippocampus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      ca3_size: opts.ca3Size ?? 12,
      ca1_size: opts.ca1Size ?? 8,
      v2_to_ca3_density: opts.v2ToCa3Density ?? 0.30,
      ca3_recurrent_density: opts.ca3RecurrentDensity ?? 0.25,
      ca3_to_ca1_density: opts.ca3ToCa1Density ?? 0.40,
      ca1_to_out_density: opts.ca1ToOutDensity ?? 0.50,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/hippocampus/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 42+ Phase 41: POST /hippocampus/dg_build — Dentate Gyrus (pattern separation).
   * Andersen 1971 / Marr 1971 / Leutgeb 2007. V2/PFC → DG → CA3 (sparse mossy fiber).
   */
  async buildDentateGyrus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 24,
      v2_to_dg_density: opts.v2ToDgDensity ?? 0.10,
      pfc_to_dg_density: opts.pfcToDgDensity ?? 0.10,
      dg_to_ca3_density: opts.dgToCa3Density ?? 0.05,
      weight: opts.weight ?? 35.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/hippocampus/dg_build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Tier2 D-extra: POST /hippocampus/replay — sleep replay (sharp-wave ripples).
   * Buzsáki 1989 / Wilson & McNaughton 1994.
   */
  async replayHippocampus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      rounds: opts.rounds ?? 20,
      ca3_subset_ratio: opts.ca3SubsetRatio ?? 0.30,
      inject_weight: opts.injectWeight ?? 50.0,
      observe_ms: opts.observeMs ?? 30.0,
      dopamine_amplitude: opts.dopamineAmplitude ?? 0.3,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/hippocampus/replay`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 42+ Tier2 D-extra: POST /hippocampus/pattern_completion — Marr 1971.
   * 부분 inject CA3 → recurrent 회상 → completion_ratio + verdict (STRONG/MODERATE/WEAK).
   */
  async testPatternCompletion(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      partial_ratio: opts.partialRatio ?? 0.30,
      inject_weight: opts.injectWeight ?? 60.0,
      observe_ms: opts.observeMs ?? 50.0,
    };
    if (Array.isArray(opts.partialIndices)) body.partial_indices = opts.partialIndices;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/hippocampus/pattern_completion`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 42+ Phase 20: POST /pfc/build — Prefrontal Cortex (working memory).
   * Goldman-Rakic 1995 / Wang 2001. V2/HIPPO → PFC L23 → PFC L5 (recurrent) → OUT.
   */
  async buildPfc(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      l23_size: opts.l23Size ?? 8,
      l5_size: opts.l5Size ?? 10,
      v2_to_pfc_density: opts.v2ToPfcDensity ?? 0.25,
      ca1_to_pfc_density: opts.ca1ToPfcDensity ?? 0.40,
      l23_to_l5_density: opts.l23ToL5Density ?? 0.50,
      l5_recurrent_density: opts.l5RecurrentDensity ?? 0.35,
      l5_to_out_density: opts.l5ToOutDensity ?? 0.40,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/pfc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 20: POST /amygdala/build — Amygdala (valence + emotional gate).
   * LeDoux 1996. V2 → AMG (recurrent) — emotional binding 보조.
   */
  async buildAmygdala(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      v2_to_amg_density: opts.v2ToAmgDensity ?? 0.25,
      amg_recurrent_density: opts.amgRecurrentDensity ?? 0.20,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/amygdala/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 21: POST /basal_ganglia/build — Cortico-Striatal Loop.
   * Albin 1989 / Wickens 2009. D1 (Go) + D2 (NoGo) dual pathway.
   */
  async buildBasalGanglia(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      d1_size: opts.d1Size ?? 10,
      d2_size: opts.d2Size ?? 10,
      cortex_to_str_density: opts.cortexToStrDensity ?? 0.30,
      d1_to_out_density: opts.d1ToOutDensity ?? 0.60,
      d2_to_out_density: opts.d2ToOutDensity ?? 0.50,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/basal_ganglia/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 22: POST /cerebellum/build — Cerebellum (Marr 1969 / Albus 1971 / Ito 2013).
   * V1 → GRC (mossy fiber) → PC (parallel fiber, plastic) → DCN (Purkinje inhibition release) → OUT.
   */
  async buildCerebellum(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      grc_size: opts.grcSize ?? 16,
      pc_size: opts.pcSize ?? 6,
      dcn_size: opts.dcnSize ?? 4,
      v1_to_grc_density: opts.v1ToGrcDensity ?? 0.20,
      grc_to_pc_density: opts.grcToPcDensity ?? 0.45,
      pc_to_dcn_density: opts.pcToDcnDensity ?? 0.60,
      dcn_to_out_density: opts.dcnToOutDensity ?? 0.50,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cerebellum/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 191-199: paper export + seed lock + dashboard + report + methods doc + compile check + two-snap + watcher + final pipeline.
   */
  async paperExport() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/paper-export`, { method: 'POST', body: {} });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async seedLock(seed = 42) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/seed-lock`, { method: 'POST', body: { seed } });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async dashboard() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/dashboard`, { method: 'POST', body: {} });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async autoReport() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/auto-report`, { method: 'POST', body: {} });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async methodsDoc() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/methods-doc`, { method: 'POST', body: {} });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async compileCheck() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/compile-check`, { method: 'POST', body: {} });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async compareTwoSnapshots(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/compare-two-snapshots`, { method: 'POST', body: { index_a: opts.indexA ?? 0, index_b: opts.indexB ?? -1 } });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async watcherTick() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/watcher-tick`, { method: 'POST', body: {} });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async runFinalPipeline(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/final-pipeline`, { method: 'POST', body: { epochs: opts.epochs ?? 5 } });
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 186: spike autocorrelation.
   */
  async autocorrelation(target_name, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!target_name) return { ok: false, reason: 'target_name empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/autocorrelation`,
        { method: 'POST', body: { target_name, max_lag_ms: opts.maxLagMs ?? 50.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 187: network entropy.
   */
  async networkEntropy(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/entropy`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 200.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 188: avalanche distribution.
   */
  async avalancheDist(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/avalanche`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 189: STA spike-triggered average.
   */
  async spikeTriggeredAverage(target_name, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!target_name) return { ok: false, reason: 'target_name empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sta`,
        { method: 'POST', body: { target_name, lookback_ms: opts.lookbackMs ?? 30.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 181: LIF parameter sweep.
   */
  async lifSweep(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/lif-sweep`,
        { method: 'POST', body: { target_prefix: opts.targetPrefix ?? "v1_L4_E" } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 182: V1 orientation tuning.
   */
  async testOrientation(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/orientation`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 183: predictive coding.
   */
  async predictiveCoding(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/predictive-coding`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 184: cross-region phase sync.
   */
  async crossRegionSync(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cross-region-sync`,
        { method: 'POST', body: { prefix_a: opts.prefixA ?? "pfc_l5_", prefix_b: opts.prefixB ?? "ca1_" } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 185: network signature.
   */
  async networkSignature() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/signature`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 176: tonotopic selectivity test.
   */
  async testTonotopic(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/tonotopic`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 177: color selectivity test.
   */
  async testColorSelectivity(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/color-selectivity`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 178: BG action selection (D1 vs D2).
   */
  async testBgAction(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/bg-action`,
        { method: 'POST', body: { gesture: opts.gesture ?? "pinch" } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 179: episodic memory test.
   */
  async testEpisodicMemory(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/episodic`,
        { method: 'POST', body: { encode_epochs: opts.encodeEpochs ?? 3 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 171: delay distribution.
   */
  async delayDistribution() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/delay-distribution`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 172: place field encoding.
   */
  async testPlaceField(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/place-field`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 173: theta-gamma coupling.
   */
  async thetaGammaCoupling(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/theta-gamma`,
        { method: 'POST', body: { target_prefix: opts.targetPrefix ?? "ca1_" } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 174: R-STDP reward pulse.
   */
  async applyRstdpPulse(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/rstdp-pulse`,
        { method: 'POST', body: { reward_strength: opts.rewardStrength ?? 1.5 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 175: homeostatic normalization.
   */
  async homeostaticNormalize(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/homeostatic`,
        { method: 'POST', body: { target_hz: opts.targetHz ?? 5.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 166: sparseness metric.
   */
  async sparseness(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sparseness`,
        { method: 'POST', body: { prefix: opts.prefix ?? "", window_ms: opts.windowMs ?? 100.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 167: learning curve over multiple cycles.
   */
  async learningCurve(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/learning-curve`,
        { method: 'POST', body: { cycles: opts.cycles ?? 5, epochs_per_cycle: opts.epochsPerCycle ?? 3 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 168: action selection conflict test.
   */
  async testActionConflict(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      gesture_a: opts.gestureA ?? "pinch",
      gesture_b: opts.gestureB ?? "fist",
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/action-conflict`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 169: V1 lateral connections.
   */
  async buildV1Lateral(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/v1-lateral/build`,
        { method: 'POST', body: { density: opts.density ?? 0.10 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 162: NumPy vectorized run prototype.
   */
  async runVectorized(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/run-vectorized`,
        { method: 'POST', body: { duration_ms: opts.durationMs ?? 50.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 163: V4 RGB columns.
   */
  async buildV4Rgb(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/v4-rgb/build`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 164: SC layered.
   */
  async buildScLayered(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sc-layered/build`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 165: PFC delay measurement.
   */
  async measurePfcDelay(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/pfc-delay-measure`,
        { method: 'POST', body: { cue_input: opts.cueInput ?? "in_pinch" } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 156: auditory localization (MSO/LSO).
   */
  async buildAuditoryLocalization(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/auditory-localization/build`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 157: receptive field of single neuron.
   */
  async receptiveField(name, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name) return { ok: false, reason: 'name empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/receptive-field`,
        { method: 'POST', body: { name, top_n: opts.topN ?? 30 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 158: population vector decoder.
   */
  async decodePopulation(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/decode-population`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 159: STDP gain per prefix.
   */
  async setStdpGainPrefix(prefix, gainMultiplier = 1.5) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!prefix) return { ok: false, reason: 'prefix empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/stdp-gain-prefix`,
        { method: 'POST', body: { prefix, gain_multiplier: gainMultiplier } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 151: S1 somatotopic finger map.
   */
  async buildS1Somatotopic(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/s1-somatotopic/build`,
        { method: 'POST', body: { n_fingers: opts.nFingers ?? 5 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 152: lateral inhibition tuner.
   */
  async tuneInhibition(prefix, multiplier = 1.5) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!prefix) return { ok: false, reason: 'prefix empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/tune-inhibition`,
        { method: 'POST', body: { prefix, multiplier } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 153: critical period (high plasticity window).
   */
  async openCriticalPeriod(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      gain_multiplier: opts.gainMultiplier ?? 3.0,
      duration_ms: opts.durationMs ?? 500.0,
      cycles: opts.cycles ?? 5,
      cycle_inject_strength: opts.cycleInjectStrength ?? 25.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/critical-period`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 154: reward prediction error.
   */
  async computeRpe(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/rpe`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 155: E2E demo (build+train+verify+raster).
   */
  async runE2eDemo(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/e2e-demo`,
        { method: 'POST', body: { epochs: opts.epochs ?? 5 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 146: membrane voltage trace.
   */
  async traceVoltage(name, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name) return { ok: false, reason: 'name empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/voltage-trace`,
        { method: 'POST', body: { name, duration_ms: opts.durationMs ?? 50.0, sample_every_ms: opts.sampleEveryMs ?? 1.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 147: PSTH.
   */
  async buildPsth(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/psth`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 100.0, bin_ms: opts.binMs ?? 5.0, prefix_filter: opts.prefixFilter ?? "" } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 148: state diff (snapshot vs current full).
   */
  async stateDiff(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/state-diff`,
        { method: 'POST', body: { snapshot_index: opts.snapshotIndex ?? 0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 149: ISI statistics.
   */
  async isiStats(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/isi`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 1000.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 141: reward-driven gesture training.
   */
  async rewardTrain(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      gesture: opts.gesture ?? "pinch",
      target_out_index: opts.targetOutIndex ?? 0,
      epochs: opts.epochs ?? 10,
      cue_strength: opts.cueStrength ?? 30.0,
      target_strength: opts.targetStrength ?? 50.0,
      cue_duration_ms: opts.cueDurationMs ?? 15.0,
      observe_ms: opts.observeMs ?? 50.0,
      reward_da: opts.rewardDa ?? 0.8,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/reward-train`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 142: V2 L2/3 split.
   */
  async buildV2L23Split(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/v2-l23-split/build`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 143: IT subdivision (TEO + TE).
   */
  async buildItSubdivision(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/it-subdivision/build`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 144: persistent activity test (working memory).
   */
  async testPersistentActivity(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/persistent-activity`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 145: forgetting decay.
   */
  async applyForgettingDecay(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      decay_tau_ms: opts.decayTauMs ?? 5000.0,
      elapsed_ms: opts.elapsedMs ?? 1000.0,
      baseline_weight: opts.baselineWeight ?? 30.0,
      preserve_inhibitory: opts.preserveInhibitory ?? true,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/forgetting-decay`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 136: V1 L2/3 split.
   */
  async buildV1L23Split(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/v1-l23-split/build`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 137: A1 tonotopic map.
   */
  async buildA1Tonotopic(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/a1-tonotopic/build`,
        { method: 'POST', body: { n_columns: opts.nColumns ?? 8 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 138: spike CSV export.
   */
  async exportSpikesCsv(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/spike-csv`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 200.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 139: region graph.
   */
  async regionGraph(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/region-graph`,
        { method: 'POST', body: { min_count: opts.minCount ?? 5 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 132: region rate trend across multiple windows.
   */
  async regionRateTrend(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/region-rate-trend`,
        { method: 'POST', body: { windows_ms: opts.windowsMs ?? [50.0, 100.0, 200.0, 500.0] } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 133: top-firing neurons leaderboard.
   */
  async topFiring(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/top-firing`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 200.0, top_n: opts.topN ?? 20 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 134: single neuron connectivity.
   */
  async neuronConnectivity(name) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name) return { ok: false, reason: 'name empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/neuron-connectivity`,
        { method: 'POST', body: { name } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 135: per-region STDP delta breakdown.
   */
  async regionStdpDelta(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/region-stdp-delta`,
        { method: 'POST', body: { snapshot_index: opts.snapshotIndex ?? 0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 127: randomize weights (STDP reset, topology 보존).
   */
  async randomizeWeights(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      mean: opts.mean ?? 30.0,
      std: opts.std ?? 4.5,
      preserve_sign: opts.preserveSign ?? true,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/randomize-weights`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 128: compare with snapshot.
   */
  async compareSnapshot(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/compare-snapshot`,
        { method: 'POST', body: { snapshot_index: opts.snapshotIndex ?? 0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 129: functional connectivity (firing rate co-occurrence).
   */
  async functionalConnectivity(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/functional-connectivity`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 200.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 123: auto-train full pipeline.
   */
  async runAutoTrain(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/auto-train`,
        { method: 'POST', body: { epochs: opts.epochs ?? 5 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 124: freeze/unfreeze region (selective STDP gating, marking only).
   */
  async freezeRegion(prefix, frozen = true) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!prefix) return { ok: false, reason: 'prefix empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/freeze-region`,
        { method: 'POST', body: { prefix, frozen } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 125: multi-modal scenario test.
   */
  async testMultiModal(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/multi-modal`,
        { method: 'POST', body: { gesture: opts.gesture ?? "pinch" } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 120: train selectivity over time (baseline → STDP epochs → re-verify).
   */
  async trainSelectivity(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      gestures: opts.gestures ?? ["pinch", "fist", "palm", "point"],
      epochs: opts.epochs ?? 5,
      injects_per_epoch: opts.injectsPerEpoch ?? 4,
      inject_strength: opts.injectStrength ?? 30.0,
      stimulus_duration_ms: opts.stimulusDurationMs ?? 15.0,
      observe_ms: opts.observeMs ?? 50.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/train-selectivity`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 121: baseline regression check.
   */
  async baselineCheck() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/baseline-check`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 122: WebGPU readiness check (benchmark + recommendation).
   */
  async webgpuReadiness() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/webgpu-readiness`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 116: spike raster export.
   */
  async exportRaster(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/raster`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 200.0, max_points: opts.maxPoints ?? 5000 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 117: network telemetry.
   */
  async getTelemetry() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/telemetry`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 118: list methods (auto-discover).
   */
  async listMethods() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/list-methods`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 111-115: deeper analysis tools.
   */
  async resetRegion(prefix) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!prefix) return { ok: false, reason: 'prefix empty' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/reset-region`,
        { method: 'POST', body: { prefix } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async weightHistogram(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/weight-histogram`,
        { method: 'POST', body: { bins: opts.bins ?? 10 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async snapshotWeights() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/snapshot-weights`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async connectivityMatrix(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/connectivity-matrix`,
        { method: 'POST', body: { top_n: opts.topN ?? 30 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async estimateEnergy(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/energy-estimate`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 100.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 105: DG pattern separation test.
   */
  async testDgPatternSeparation(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/dg-pattern-separation`,
        { method: 'POST', body: { sample_size: opts.sampleSize ?? 3 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 106: CA3 pattern completion test.
   */
  async testCa3PatternCompletion(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/ca3-pattern-completion`,
        { method: 'POST', body: { cue_fraction: opts.cueFraction ?? 0.5 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 107: cross-modal binding test.
   */
  async testCrossModalBinding(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/cross-modal-binding`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 108: WTA test.
   */
  async testWta(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/wta`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 109: Dopamine modulation effect test.
   */
  async testDopamineEffect(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/test/dopamine-effect`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 101: behavior verification (gesture → OUT accuracy).
   */
  async verifyBehavior(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      gestures: opts.gestures ?? ["pinch", "fist", "palm", "point"],
      inject_strength: opts.injectStrength ?? 30.0,
      observe_ms: opts.observeMs ?? 50.0,
      stimulus_duration_ms: opts.stimulusDurationMs ?? 15.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/verify-behavior`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 102: weight statistics.
   */
  async weightStats() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/weight-stats`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 103: region firing rates.
   */
  async regionRates(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/region-rates`,
        { method: 'POST', body: { window_ms: opts.windowMs ?? 100.0 } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 104: region neuron count summary.
   */
  async regionSummary() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/region-summary`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 96: place cell remapping.
   */
  async triggerPlaceRemap(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      noise_std: opts.noiseStd ?? 0.3,
      ca1_only: opts.ca1Only ?? true,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/place-remap`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 97: theta rhythm.
   */
  async triggerTheta(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      cycles: opts.cycles ?? 10,
      frequency_hz: opts.frequencyHz ?? 8.0,
      burst_strength: opts.burstStrength ?? 20.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/theta`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 98: gamma binding.
   */
  async triggerGamma(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      cycles: opts.cycles ?? 20,
      frequency_hz: opts.frequencyHz ?? 40.0,
      burst_strength: opts.burstStrength ?? 15.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/gamma`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 99: network reset (mode: 'dynamics' | 'all').
   */
  async resetNetwork(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/reset`,
        { method: 'POST', body: { mode: opts.mode ?? 'dynamics' } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 95: cross-validate (extended smoke test, topology sanity check).
   */
  async runCrossValidate() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cross-validate`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 93: export network snapshot (full state for download).
   */
  async exportSnapshot(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/export`,
        { method: 'POST', body: { include_synapses: opts.includeSynapses ?? true } },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 94: sleep replay (HIPPO → cortex consolidation).
   */
  async runSleepReplay(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      burst_count: opts.burstCount ?? 5,
      burst_strength: opts.burstStrength ?? 30.0,
      inter_burst_ms: opts.interBurstMs ?? 100.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sleep-replay`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 89: cluster presets — one-click build.
   */
  async buildPresetVisualHierarchy() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/preset/visual-hierarchy`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async buildPresetMemory() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/preset/memory`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async buildPresetLimbic() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/preset/limbic`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }
  async buildPresetMotor() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/preset/motor`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 90: smoke test — auto regression.
   */
  async runSmokeTest() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/smoke-test`,
        { method: 'POST', body: {} },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 83: POST /amg-split/build — BLA + CEN + Med nuclei.
   */
  async buildAmgSplit(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      bla_size: opts.blaSize ?? 6,
      cen_size: opts.cenSize ?? 6,
      med_size: opts.medSize ?? 4,
      v1_to_bla_density: opts.v1ToBlaDensity ?? 0.20,
      a1_to_bla_density: opts.a1ToBlaDensity ?? 0.25,
      amg_to_bla_density: opts.amgToBlaDensity ?? 0.30,
      bla_to_pfc_density: opts.blaToPfcDensity ?? 0.30,
      bla_to_ca1_density: opts.blaToCa1Density ?? 0.25,
      bla_to_cen_density: opts.blaToCenDensity ?? 0.50,
      cen_to_pag_density: opts.cenToPagDensity ?? 0.40,
      cen_to_hyp_density: opts.cenToHypDensity ?? 0.40,
      pir_to_med_density: opts.pirToMedDensity ?? 0.40,
      med_to_bnst_density: opts.medToBnstDensity ?? 0.35,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/amg-split/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 84: POST /hippo-dg-ca2/build — DG (pattern separation) + CA2 (social).
   */
  async buildHippoDgCa2(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      dg_size: opts.dgSize ?? 16,
      ca2_size: opts.ca2Size ?? 6,
      ec_to_dg_density: opts.ecToDgDensity ?? 0.10,
      dg_to_ca3_density: opts.dgToCa3Density ?? 0.20,
      ec_to_ca2_density: opts.ecToCa2Density ?? 0.30,
      ca2_to_ca1_density: opts.ca2ToCa1Density ?? 0.35,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/hippo-dg-ca2/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 85: POST /benchmark — throughput measurement.
   */
  async runBenchmark(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      duration_ms: opts.durationMs ?? 50.0,
      warmup_ms: opts.warmupMs ?? 10.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/benchmark`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 79: POST /ot/build — Olfactory Tubercle.
   */
  async buildOlfactoryTubercle(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      pir_to_ot_density: opts.pirToOtDensity ?? 0.40,
      ot_to_nacc_density: opts.otToNaccDensity ?? 0.40,
      ot_to_vta_density: opts.otToVtaDensity ?? 0.30,
      ot_to_str_d1_density: opts.otToStrD1Density ?? 0.30,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/ot/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 80: POST /bnst/build — Bed Nucleus Stria Terminalis.
   */
  async buildBnst(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      amg_to_bnst_density: opts.amgToBnstDensity ?? 0.40,
      bnst_to_hyp_density: opts.bnstToHypDensity ?? 0.40,
      bnst_to_pag_density: opts.bnstToPagDensity ?? 0.40,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/bnst/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 81: POST /pfc-split/build — dlPFC + vmPFC.
   */
  async buildPfcSplit(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      dlpfc_size: opts.dlpfcSize ?? 8,
      vmpfc_size: opts.vmpfcSize ?? 8,
      ppc_to_dlpfc_density: opts.ppcToDlpfcDensity ?? 0.30,
      pfc_to_dlpfc_density: opts.pfcToDlpfcDensity ?? 0.30,
      dlpfc_to_sma_density: opts.dlpfcToSmaDensity ?? 0.30,
      dlpfc_to_caud_density: opts.dlpfcToCaudDensity ?? 0.30,
      ofc_to_vmpfc_density: opts.ofcToVmpfcDensity ?? 0.40,
      amg_to_vmpfc_density: opts.amgToVmpfcDensity ?? 0.30,
      vmpfc_to_nacc_density: opts.vmpfcToNaccDensity ?? 0.40,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/pfc-split/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 82: POST /acc-split/build — dACC + vACC.
   */
  async buildAccSplit(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      dacc_size: opts.daccSize ?? 6,
      vacc_size: opts.vaccSize ?? 6,
      pfc_to_dacc_density: opts.pfcToDaccDensity ?? 0.40,
      dacc_to_str_density: opts.daccToStrDensity ?? 0.30,
      amg_to_vacc_density: opts.amgToVaccDensity ?? 0.40,
      ins_to_vacc_density: opts.insToVaccDensity ?? 0.30,
      vacc_to_mpfc_density: opts.vaccToMpfcDensity ?? 0.30,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/acc-split/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 73: POST /sma/build — SMA + pre-SMA.
   */
  async buildSma(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      sma_size: opts.smaSize ?? 6,
      presma_size: opts.presmaSize ?? 6,
      pfc_to_presma_density: opts.pfcToPresmaDensity ?? 0.40,
      presma_to_sma_density: opts.presmaToSmaDensity ?? 0.50,
      sma_to_m1_density: opts.smaToM1Density ?? 0.40,
      sma_to_str_d1_density: opts.smaToStrD1Density ?? 0.30,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sma/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 74: POST /premotor/build — PMd + PMv.
   */
  async buildPremotor(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      pmd_size: opts.pmdSize ?? 8,
      pmv_size: opts.pmvSize ?? 8,
      pfc_to_pmd_density: opts.pfcToPmdDensity ?? 0.30,
      ppc_to_pmd_density: opts.ppcToPmdDensity ?? 0.40,
      pfc_to_pmv_density: opts.pfcToPmvDensity ?? 0.30,
      ipl_to_pmv_density: opts.iplToPmvDensity ?? 0.30,
      pm_to_m1_density: opts.pmToM1Density ?? 0.45,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/premotor/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 75: POST /subiculum/build — HIPPO output.
   */
  async buildSubiculum(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      ca1_to_sub_density: opts.ca1ToSubDensity ?? 0.50,
      sub_to_mb_density: opts.subToMbDensity ?? 0.40,
      sub_to_atn_density: opts.subToAtnDensity ?? 0.35,
      sub_to_nacc_density: opts.subToNaccDensity ?? 0.30,
      sub_to_ec_density: opts.subToEcDensity ?? 0.30,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/subiculum/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 76: POST /phc/build — Parahippocampal Cortex.
   */
  async buildPhc(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      ppc_to_phc_density: opts.ppcToPhcDensity ?? 0.30,
      v4_to_phc_density: opts.v4ToPhcDensity ?? 0.30,
      rsc_to_phc_density: opts.rscToPhcDensity ?? 0.25,
      phc_to_ec_density: opts.phcToEcDensity ?? 0.40,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/phc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 77: POST /prc/build — Perirhinal Cortex.
   */
  async buildPrc(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      it_to_prc_density: opts.itToPrcDensity ?? 0.40,
      prc_to_ec_density: opts.prcToEcDensity ?? 0.40,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/prc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 78: POST /insula-split/build — AI + PI.
   */
  async buildInsulaSplit(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      ai_size: opts.aiSize ?? 6,
      pi_size: opts.piSize ?? 6,
      s1_to_ai_density: opts.s1ToAiDensity ?? 0.30,
      a1_to_ai_density: opts.a1ToAiDensity ?? 0.30,
      v1_to_ai_density: opts.v1ToAiDensity ?? 0.20,
      ai_to_acc_density: opts.aiToAccDensity ?? 0.40,
      hyp_to_pi_density: opts.hypToPiDensity ?? 0.40,
      amg_to_pi_density: opts.amgToPiDensity ?? 0.30,
      pi_to_s1_density: opts.piToS1Density ?? 0.30,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/insula-split/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 69: POST /caudate-putamen/build — STR cognitive/motor split.
   */
  async buildCaudatePutamen(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      caud_size: opts.caudSize ?? 8,
      put_size: opts.putSize ?? 8,
      pfc_to_caud_density: opts.pfcToCaudDensity ?? 0.40,
      m1_to_put_density: opts.m1ToPutDensity ?? 0.40,
      s1_to_put_density: opts.s1ToPutDensity ?? 0.30,
      caud_to_gpi_density: opts.caudToGpiDensity ?? 0.40,
      put_to_gpi_density: opts.putToGpiDensity ?? 0.40,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/caudate-putamen/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 70: POST /globus-pallidus/build — GPe/GPi BG output.
   */
  async buildGlobusPallidus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      gpe_size: opts.gpeSize ?? 6,
      gpi_size: opts.gpiSize ?? 6,
      str_d1_to_gpi_density: opts.strD1ToGpiDensity ?? 0.50,
      str_d2_to_gpe_density: opts.strD2ToGpeDensity ?? 0.50,
      gpe_to_gpi_density: opts.gpeToGpiDensity ?? 0.40,
      gpe_to_stn_density: opts.gpeToStnDensity ?? 0.40,
      gpi_to_th_density: opts.gpiToThDensity ?? 0.50,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/globus-pallidus/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 71: POST /cerebellar-lobules/build — vermis/hemisphere/flocculus.
   */
  async buildCerebellarLobules(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      verm_size: opts.vermSize ?? 6,
      hemi_size: opts.hemiSize ?? 6,
      floc_size: opts.flocSize ?? 4,
      amg_to_verm_density: opts.amgToVermDensity ?? 0.30,
      pfc_to_hemi_density: opts.pfcToHemiDensity ?? 0.30,
      m1_to_hemi_density: opts.m1ToHemiDensity ?? 0.30,
      ppc_to_floc_density: opts.ppcToFlocDensity ?? 0.30,
      fef_to_floc_density: opts.fefToFlocDensity ?? 0.40,
      lobule_to_dcn_density: opts.lobuleToDcnDensity ?? 0.45,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cerebellar-lobules/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 72: POST /rsc/build — Retrosplenial Cortex.
   */
  async buildRsc(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      ca1_to_rsc_density: opts.ca1ToRscDensity ?? 0.30,
      ppc_to_rsc_density: opts.ppcToRscDensity ?? 0.30,
      rsc_to_pcc_density: opts.rscToPccDensity ?? 0.40,
      rsc_to_mpfc_density: opts.rscToMpfcDensity ?? 0.30,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/rsc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 66: POST /snc/build — Substantia Nigra pars Compacta (nigrostriatal DA).
   */
  async buildSnc(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      amg_to_snc_density: opts.amgToSncDensity ?? 0.30,
      pfc_to_snc_density: opts.pfcToSncDensity ?? 0.30,
      snc_to_str_d1_density: opts.sncToStrD1Density ?? 0.50,
      snc_to_str_d2_density: opts.sncToStrD2Density ?? 0.50,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/snc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 67: POST /atn/build — Anterior Thalamic Nucleus (Papez relay).
   */
  async buildAtn(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      mb_to_atn_density: opts.mbToAtnDensity ?? 0.50,
      atn_to_acc_density: opts.atnToAccDensity ?? 0.40,
      atn_to_pcc_density: opts.atnToPccDensity ?? 0.30,
      atn_to_ca1_density: opts.atnToCa1Density ?? 0.25,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/atn/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 68: POST /mb/build — Mammillary Bodies (Papez circuit).
   */
  async buildMammillaryBodies(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      ca1_to_mb_density: opts.ca1ToMbDensity ?? 0.40,
      mb_to_atn_density: opts.mbToAtnDensity ?? 0.50,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/mb/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 63: POST /habenula/build — anti-reward (negative RPE).
   */
  async buildHabenula(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      pfc_to_hb_density: opts.pfcToHbDensity ?? 0.30,
      amg_to_hb_density: opts.amgToHbDensity ?? 0.30,
      hb_to_vta_density: opts.hbToVtaDensity ?? 0.50,
      hb_to_raphe_density: opts.hbToRapheDensity ?? 0.40,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/habenula/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 64: POST /sc/build — Superior Colliculus (orienting/saccade).
   */
  async buildSuperiorColliculus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      v1_to_sc_density: opts.v1ToScDensity ?? 0.25,
      fef_to_sc_density: opts.fefToScDensity ?? 0.40,
      sc_to_amn_density: opts.scToAmnDensity ?? 0.30,
      sc_to_pul_density: opts.scToPulDensity ?? 0.30,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 65: POST /ofc/build — Orbitofrontal Cortex (economic value).
   */
  async buildOfc(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 10,
      amg_to_ofc_density: opts.amgToOfcDensity ?? 0.30,
      ins_to_ofc_density: opts.insToOfcDensity ?? 0.30,
      ofc_to_str_density: opts.ofcToStrDensity ?? 0.30,
      ofc_to_pfc_density: opts.ofcToPfcDensity ?? 0.30,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/ofc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 60: POST /pulvinar/build — thalamic visual attention relay.
   */
  async buildPulvinar(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 10,
      v1_to_pul_density: opts.v1ToPulDensity ?? 0.20,
      v2_to_pul_density: opts.v2ToPulDensity ?? 0.25,
      mt_to_pul_density: opts.mtToPulDensity ?? 0.25,
      pul_to_v4_density: opts.pulToV4Density ?? 0.25,
      pul_to_it_density: opts.pulToItDensity ?? 0.25,
      pul_to_ppc_density: opts.pulToPpcDensity ?? 0.25,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/pulvinar/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 61: POST /stn/build — Subthalamic Nucleus, BG hyperdirect.
   */
  async buildStn(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      pfc_to_stn_density: opts.pfcToStnDensity ?? 0.30,
      m1_to_stn_density: opts.m1ToStnDensity ?? 0.30,
      stn_to_str_density: opts.stnToStrDensity ?? 0.30,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/stn/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 62: POST /lgn/build — Lateral Geniculate Nucleus, retinal relay.
   */
  async buildLgn(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 10,
      input_to_lgn_density: opts.inputToLgnDensity ?? 0.50,
      lgn_to_v1_density: opts.lgnToV1Density ?? 0.50,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/lgn/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 59: POST /cuneus-lingual/build — Cuneus + Lingual Gyrus.
   * Vanni 2001 / Hadjikhani 1998. Extra-striate dorsal/ventral split.
   */
  async buildCuneusLingual(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      cuneus_size: opts.cuneusSize ?? 8,
      lingual_size: opts.lingualSize ?? 8,
      v1_to_cun_density: opts.v1ToCunDensity ?? 0.30,
      v1_to_lin_density: opts.v1ToLinDensity ?? 0.30,
      cun_to_v3_density: opts.cunToV3Density ?? 0.35,
      cun_to_mt_density: opts.cunToMtDensity ?? 0.30,
      lin_to_v4_density: opts.linToV4Density ?? 0.40,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cuneus-lingual/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Phase 58: POST /cingulate-hippo/build — ACC ↔ CA1 binding.
   * Aggleton 2014 / Bubb 2017. Connectivity-only.
   */
  async buildCingulateHippoBinding(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      acc_to_ca1_density: opts.accToCa1Density ?? 0.30,
      acc_to_ca3_density: opts.accToCa3Density ?? 0.15,
      ca1_to_acc_density: opts.ca1ToAccDensity ?? 0.30,
      weight: opts.weight ?? 24.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cingulate-hippo/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 57: POST /m1/build — Primary Motor Cortex.
   * Penfield 1937 / Evarts 1968.
   */
  async buildPrimaryMotorCortex(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 12,
      pfc_to_m1_density: opts.pfcToM1Density ?? 0.30,
      s1_to_m1_density: opts.s1ToM1Density ?? 0.30,
      dcn_to_m1_density: opts.dcnToM1Density ?? 0.30,
      str_to_m1_density: opts.strToM1Density ?? 0.25,
      m1_to_amn_density: opts.m1ToAmnDensity ?? 0.50,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/m1/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 56: POST /s1/build — Somatosensory Cortex.
   * Penfield 1937 / Mountcastle 1957.
   */
  async buildSomatosensoryCortex(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 12,
      input_to_s1_density: opts.inputToS1Density ?? 0.40,
      s1_to_v2_density: opts.s1ToV2Density ?? 0.20,
      s1_to_amn_density: opts.s1ToAmnDensity ?? 0.30,
      s1_to_ins_density: opts.s1ToInsDensity ?? 0.30,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/s1/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 55: POST /v4_color/build — V4 chromatic sub-region.
   * Zeki 1973 / Conway 2003.
   */
  async buildV4Color(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      v1_to_color_density: opts.v1ToColorDensity ?? 0.30,
      color_to_v4l5_density: opts.colorToV4l5Density ?? 0.40,
      color_to_it_density: opts.colorToItDensity ?? 0.25,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/v4_color/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 54: POST /fef/build — Frontal Eye Field (saccade + attention).
   * Bruce & Goldberg 1985 / Schall 2002 / Moore & Armstrong 2003.
   */
  async buildFrontalEyeField(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      ppc_to_fef_density: opts.ppcToFefDensity ?? 0.35,
      v2_to_fef_density: opts.v2ToFefDensity ?? 0.20,
      fef_to_v1_density: opts.fefToV1Density ?? 0.15,
      fef_to_v2_density: opts.fefToV2Density ?? 0.20,
      fef_to_amn_density: opts.fefToAmnDensity ?? 0.30,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/fef/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 53: POST /spatial/build — Place + Grid cells (Nobel 2014).
   */
  async buildSpatialNavigation(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      place_size: opts.placeSize ?? 16,
      grid_size: opts.gridSize ?? 12,
      ppc_to_grid_density: opts.ppcToGridDensity ?? 0.30,
      grid_to_place_density: opts.gridToPlaceDensity ?? 0.25,
      place_to_ca3_density: opts.placeToCa3Density ?? 0.30,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/spatial/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /** Session 42+ Phase 53: POST /spatial/inject — 2D position 자극. */
  async spatialInject(x, y, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      x, y,
      weight: opts.weight ?? 60.0,
      observe_ms: opts.observeMs ?? 50.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/spatial/inject`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 52: POST /entorhinal/build — EC II/III/V (Hippocampus gateway).
   * Witter 2017 / Hasselmo 2005.
   */
  async buildEntorhinalCortex(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      ec_ii_size: opts.ecIiSize ?? 8,
      ec_iii_size: opts.ecIiiSize ?? 8,
      ec_v_size: opts.ecVSize ?? 6,
      cortex_to_ec_density: opts.cortexToEcDensity ?? 0.20,
      ec_ii_to_dg_density: opts.ecIiToDgDensity ?? 0.30,
      ec_iii_to_ca1_density: opts.ecIiiToCa1Density ?? 0.30,
      ca1_to_ec_v_density: opts.ca1ToEcVDensity ?? 0.40,
      ec_v_to_cortex_density: opts.ecVToCortexDensity ?? 0.20,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/entorhinal/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 51: POST /reticular/build — Reticular Formation (ARAS).
   * Moruzzi & Magoun 1949.
   */
  async buildReticularFormation(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      sensory_to_rf_density: opts.sensoryToRfDensity ?? 0.20,
      rf_to_th_density: opts.rfToThDensity ?? 0.50,
      rf_to_cortex_density: opts.rfToCortexDensity ?? 0.10,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/reticular/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 50: POST /sleep_wake/build — VLPO flip-flop. Saper 2005.
   */
  async buildSleepWakeCircuit(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      vlpo_size: opts.vlpoSize ?? 6,
      vlpo_to_wake_density: opts.vlpoToWakeDensity ?? 0.50,
      wake_to_vlpo_density: opts.wakeToVlpoDensity ?? 0.40,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sleep_wake/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /** Session 42+ Phase 50: POST /sleep_wake/toggle — sleep | wake mode. */
  async sleepWakeToggle(mode = "sleep", opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      mode,
      amplitude: opts.amplitude ?? 1.0,
      observe_ms: opts.observeMs ?? 50.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sleep_wake/toggle`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 49: POST /language/build — Broca + Wernicke language pathway.
   * Hickok & Poeppel 2007 dual stream.
   */
  async buildLanguageAreas(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      broca_size: opts.brocaSize ?? 8,
      wern_size: opts.wernSize ?? 8,
      a2_to_wern_density: opts.a2ToWernDensity ?? 0.45,
      it_to_wern_density: opts.itToWernDensity ?? 0.20,
      wern_to_broca_density: opts.wernToBrocaDensity ?? 0.50,
      broca_to_amn_density: opts.brocaToAmnDensity ?? 0.40,
      broca_to_pfc_density: opts.brocaToPfcDensity ?? 0.30,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/language/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 48: POST /cerebrocerebellar/build — DCN → TH → PFC loop closure.
   * Ito 2008 / Kelly & Strick 2003.
   */
  async buildCerebroCerebellarLoop(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      dcn_to_th_density: opts.dcnToThDensity ?? 0.40,
      th_to_pfc_density: opts.thToPfcDensity ?? 0.30,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cerebrocerebellar/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 47: POST /striatum_tail/build — Striatum tail (habit pathway).
   * Hikosaka 2019 / Kim 2022.
   */
  async buildStriatumTail(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 10,
      it_to_tail_density: opts.itToTailDensity ?? 0.40,
      a2_to_tail_density: opts.a2ToTailDensity ?? 0.25,
      tail_to_out_density: opts.tailToOutDensity ?? 0.50,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/striatum_tail/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 46: POST /tpj/build — TPJ (theory of mind, mentalizing).
   * Saxe & Kanwisher 2003 / Carter & Huettel 2013.
   */
  async buildTpj(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      ipl_to_tpj_density: opts.iplToTpjDensity ?? 0.40,
      it_to_tpj_density: opts.itToTpjDensity ?? 0.30,
      tpj_to_mpfc_density: opts.tpjToMpfcDensity ?? 0.40,
      tpj_to_ag_density: opts.tpjToAgDensity ?? 0.40,
      tpj_to_acc_density: opts.tpjToAccDensity ?? 0.25,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/tpj/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 45: POST /mirror_neurons/build — F5 + IPL.
   * Rizzolatti 2004 / Fogassi 2005. Action understanding.
   */
  async buildMirrorNeurons(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      f5_size: opts.f5Size ?? 8,
      ipl_size: opts.iplSize ?? 8,
      ppc_to_ipl_density: opts.ppcToIplDensity ?? 0.40,
      it_to_ipl_density: opts.itToIplDensity ?? 0.30,
      it_to_f5_density: opts.itToF5Density ?? 0.30,
      ipl_to_f5_density: opts.iplToF5Density ?? 0.50,
      f5_to_amn_density: opts.f5ToAmnDensity ?? 0.40,
      f5_to_it_density: opts.f5ToItDensity ?? 0.20,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/mirror_neurons/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 44: POST /cortical_layers/build — L1 + L6 추가 (full 6-layer).
   * Mountcastle 1957 / Douglas & Martin 2004.
   */
  async buildCorticalLayers(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      region_prefix: opts.regionPrefix ?? 'v2_',
      l1_size: opts.l1Size ?? 4,
      l6_size: opts.l6Size ?? 8,
      l23_to_l1_density: opts.l23ToL1Density ?? 0.20,
      l1_to_l23_density: opts.l1ToL23Density ?? 0.20,
      l5_to_l6_density: opts.l5ToL6Density ?? 0.30,
      l6_to_th_density: opts.l6ToThDensity ?? 0.25,
      l6_to_l4_density: opts.l6ToL4Density ?? 0.20,
      weight: opts.weight ?? 25.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cortical_layers/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 43: POST /commissural/build — Long-range cross-region fibers.
   * Aboitiz 1992 / Sporns 2013. Default 8 binding pairs.
   */
  async buildCommissuralFibers(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      density: opts.density ?? 0.05,
      weight: opts.weight ?? 22.0,
      bidirectional: opts.bidirectional ?? true,
    };
    if (Array.isArray(opts.pairs)) body.pairs = opts.pairs;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/commissural/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 42: POST /sn/build — Salience Network (DMN ↔ CEN switching).
   * Seeley 2007 / Menon 2011.
   */
  async buildSalienceNetwork(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      ai_size: opts.aiSize ?? 6,
      dacc_size: opts.daccSize ?? 6,
      ins_to_ai_density: opts.insToAiDensity ?? 0.50,
      acc_to_dacc_density: opts.accToDaccDensity ?? 0.50,
      ai_dacc_coupling_density: opts.aiDaccCouplingDensity ?? 0.50,
      sn_to_cen_density: opts.snToCenDensity ?? 0.40,
      sn_to_dmn_density: opts.snToDmnDensity ?? 0.40,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/sn/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 40: POST /hypothalamus/build — HPA + autonomic.
   * Saper 2014 / Herman 1997.
   */
  async buildHypothalamus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      amg_to_hyp_density: opts.amgToHypDensity ?? 0.40,
      hyp_to_pag_density: opts.hypToPagDensity ?? 0.40,
      hyp_to_lc_density: opts.hypToLcDensity ?? 0.30,
      hyp_to_raphe_density: opts.hypToRapheDensity ?? 0.30,
      hyp_to_amn_density: opts.hypToAmnDensity ?? 0.20,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/hypothalamus/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 39: POST /dmn/build — Default Mode Network (rest state).
   * Raichle 2001 / Buckner 2008.
   */
  async buildDefaultModeNetwork(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      mpfc_size: opts.mpfcSize ?? 8,
      pcc_size: opts.pccSize ?? 8,
      ag_size: opts.agSize ?? 6,
      recurrent_density: opts.recurrentDensity ?? 0.30,
      hippo_to_dmn_density: opts.hippoToDmnDensity ?? 0.30,
      dmn_to_hippo_density: opts.dmnToHippoDensity ?? 0.25,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/dmn/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 38: POST /brainstem/build — PAG + Pons (autonomic + relay).
   * Bandler 1994 / Reis 2015.
   */
  async buildBrainstem(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      pag_size: opts.pagSize ?? 6,
      pons_size: opts.ponsSize ?? 8,
      amg_to_pag_density: opts.amgToPagDensity ?? 0.40,
      pag_to_lc_density: opts.pagToLcDensity ?? 0.40,
      pag_to_amn_density: opts.pagToAmnDensity ?? 0.30,
      cortex_to_pons_density: opts.cortexToPonsDensity ?? 0.20,
      pons_to_grc_density: opts.ponsToGrcDensity ?? 0.40,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/brainstem/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 37: POST /olfactory/build — Olfactory system (OB + Piriform).
   * Mori 1999 / Wilson 2011 / Gottfried 2010.
   */
  async buildOlfactorySystem(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      ob_size: opts.obSize ?? 12,
      pir_size: opts.pirSize ?? 10,
      input_to_ob_density: opts.inputToObDensity ?? 0.30,
      ob_to_pir_density: opts.obToPirDensity ?? 0.35,
      pir_to_amg_density: opts.pirToAmgDensity ?? 0.40,
      pir_to_hippo_density: opts.pirToHippoDensity ?? 0.30,
      pir_to_it_density: opts.pirToItDensity ?? 0.20,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/olfactory/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 36: POST /acc/build — Anterior Cingulate Cortex.
   * Botvinick 2001 / Carter 1998 / Holroyd 2002. Conflict monitoring + error detection.
   */
  async buildAnteriorCingulate(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      pfc_to_acc_density: opts.pfcToAccDensity ?? 0.30,
      ins_to_acc_density: opts.insToAccDensity ?? 0.35,
      amg_to_acc_density: opts.amgToAccDensity ?? 0.30,
      bg_to_acc_density: opts.bgToAccDensity ?? 0.20,
      acc_to_pfc_density: opts.accToPfcDensity ?? 0.40,
      acc_to_vta_density: opts.accToVtaDensity ?? 0.25,
      weight: opts.weight ?? 26.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/acc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 35: POST /insula/build — Insula (interoception, salience).
   * Craig 2002 / Critchley 2004 / Seeley 2007.
   */
  async buildInsula(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 8,
      amg_to_ins_density: opts.amgToInsDensity ?? 0.40,
      v1_to_ins_density: opts.v1ToInsDensity ?? 0.15,
      ins_to_amg_density: opts.insToAmgDensity ?? 0.40,
      ins_to_pfc_density: opts.insToPfcDensity ?? 0.30,
      weight: opts.weight ?? 28.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/insula/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 34: POST /reward/build — VTA + NAcc reward circuit.
   * Schultz 1997 / Ikemoto 1999.
   */
  async buildRewardCircuit(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      vta_size: opts.vtaSize ?? 6,
      nacc_size: opts.naccSize ?? 10,
      amg_to_vta_density: opts.amgToVtaDensity ?? 0.30,
      pfc_to_nacc_density: opts.pfcToNaccDensity ?? 0.25,
      amg_to_nacc_density: opts.amgToNaccDensity ?? 0.30,
      vta_to_nacc_density: opts.vtaToNaccDensity ?? 0.50,
      nacc_to_d1_density: opts.naccToD1Density ?? 0.40,
      weight: opts.weight ?? 25.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/reward/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /** Session 42+ Phase 34: POST /reward/vta_pulse — VTA fire (DA release). */
  async vtaPulse(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = { amplitude: opts.amplitude ?? 1.0, observe_ms: opts.observeMs ?? 50.0 };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/reward/vta_pulse`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 33: POST /auditory_cortex/build — A1 + A2 auditory hierarchy.
   * Merzenich 1975 / Rauschecker 2000.
   */
  async buildAuditoryCortex(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      a1_size: opts.a1Size ?? 12,
      a2_size: opts.a2Size ?? 8,
      input_to_a1_density: opts.inputToA1Density ?? 0.35,
      a1_to_a2_density: opts.a1ToA2Density ?? 0.45,
      a2_to_out_density: opts.a2ToOutDensity ?? 0.40,
      a2_to_it_density: opts.a2ToItDensity ?? 0.25,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/auditory_cortex/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 32: POST /dorsal_stream/build — V3 + MT + PPC (where/how pathway).
   * Mishkin & Ungerleider 1982 / Goodale & Milner 1992.
   */
  async buildDorsalStream(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      v3_size: opts.v3Size ?? 10,
      mt_size: opts.mtSize ?? 8,
      ppc_size: opts.ppcSize ?? 10,
      v2_to_v3_density: opts.v2ToV3Density ?? 0.20,
      v3_to_mt_density: opts.v3ToMtDensity ?? 0.30,
      mt_to_ppc_density: opts.mtToPpcDensity ?? 0.30,
      ppc_to_out_density: opts.ppcToOutDensity ?? 0.40,
      ppc_to_pfc_density: opts.ppcToPfcDensity ?? 0.30,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/dorsal_stream/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 31: POST /ventral_stream/build — V4 + IT (object recognition).
   * Felleman 1991 / Riesenhuber 1999 / DiCarlo 2012.
   */
  async buildVentralStream(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      v4_l4_size: opts.v4L4Size ?? 12,
      v4_l5_size: opts.v4L5Size ?? 8,
      it_l4_size: opts.itL4Size ?? 10,
      it_l5_size: opts.itL5Size ?? 8,
      v2_to_v4_density: opts.v2ToV4Density ?? 0.20,
      v4_internal_density: opts.v4InternalDensity ?? 0.40,
      v4_to_it_density: opts.v4ToItDensity ?? 0.20,
      it_internal_density: opts.itInternalDensity ?? 0.40,
      it_to_out_density: opts.itToOutDensity ?? 0.45,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/ventral_stream/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 30: POST /raphe/build — Raphe Nuclei (5-HT source).
   */
  async buildRapheNuclei(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      broadcast_density: opts.broadcastDensity ?? 0.10,
      weight: opts.weight ?? 18.0,
    };
    if (Array.isArray(opts.broadcastTo)) body.broadcast_to = opts.broadcastTo;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/raphe/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /** Session 42+ Phase 30: POST /raphe/pulse — 5-HT release (inhibitory boost). */
  async raphePulse(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = { amplitude: opts.amplitude ?? 1.0, observe_ms: opts.observeMs ?? 50.0 };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/raphe/pulse`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 29: POST /bf/build — Basal Forebrain (ACh source).
   */
  async buildBasalForebrain(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      broadcast_density: opts.broadcastDensity ?? 0.10,
      weight: opts.weight ?? 18.0,
    };
    if (Array.isArray(opts.broadcastTo)) body.broadcast_to = opts.broadcastTo;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/bf/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /** Session 42+ Phase 29: POST /bf/pulse — ACh release (V_th lower). */
  async bfPulse(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      amplitude: opts.amplitude ?? 1.0,
      observe_ms: opts.observeMs ?? 50.0,
      vth_lower_mv: opts.vthLowerMv ?? 0.8,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/bf/pulse`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 28: POST /lc/build — Locus Coeruleus (NE source).
   */
  async buildLocusCoeruleus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      size: opts.size ?? 6,
      broadcast_density: opts.broadcastDensity ?? 0.10,
      weight: opts.weight ?? 20.0,
    };
    if (Array.isArray(opts.broadcastTo)) body.broadcast_to = opts.broadcastTo;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/lc/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 28: POST /lc/pulse — NE pulse (V_th lower + dopamine co-release).
   * Aston-Jones & Cohen 2005 adaptive gain.
   */
  async lcPulse(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      amplitude: opts.amplitude ?? 1.0,
      observe_ms: opts.observeMs ?? 50.0,
      vth_lower_mv: opts.vthLowerMv ?? 1.0,
      dopamine_co_release: opts.dopamineCoRelease ?? 0.2,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/lc/pulse`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 27: POST /spinal/build — Spinal motor pool (Sherrington 1906).
   * AMN (final common pathway) + Renshaw (recurrent inhibition).
   */
  async buildSpinalMotorPool(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      amn_size: opts.amnSize ?? 8,
      renshaw_size: opts.renshawSize ?? 4,
      cortex_to_amn_density: opts.cortexToAmnDensity ?? 0.40,
      amn_to_rc_density: opts.amnToRcDensity ?? 0.55,
      rc_to_amn_density: opts.rcToAmnDensity ?? 0.50,
      amn_to_out_density: opts.amnToOutDensity ?? 0.70,
      weight: opts.weight ?? 35.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/spinal/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 26: POST /astrocytes/build — Astrocyte / glia (homeostatic).
   */
  async buildAstrocytes(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = { per_region: opts.perRegion ?? 3 };
    if (Array.isArray(opts.regions)) body.regions = opts.regions;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/astrocytes/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 26: POST /astrocytes/homeostasis_step — V_th 조정.
   * Turrigiano 1998 negative feedback: rate > target → V_th ↑, rate < target → V_th ↓.
   */
  async astrocyteHomeostasisStep(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      target_rate_hz: opts.targetRateHz ?? 10.0,
      adjust_mv: opts.adjustMv ?? 0.5,
      observe_window_ms: opts.observeWindowMs ?? 100.0,
      skip_user_io: opts.skipUserIo ?? true,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/astrocytes/homeostasis_step`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 25: POST /cerebellum/io_build — Inferior Olive + climbing fiber.
   */
  async buildInferiorOlive(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = { weight: opts.weight ?? 80.0 };
    if (typeof opts.ioSize === 'number') body.io_size = opts.ioSize;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cerebellum/io_build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 25: POST /cerebellum/ltd_train — CF-driven LTD on PF→PC.
   * Marr-Albus error-driven motor learning.
   */
  async cerebellumLtdTrain(inputNeurons, errorIoIndices, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      input_neurons: inputNeurons,
      error_io_indices: errorIoIndices,
      rounds: opts.rounds ?? 10,
      inject_weight: opts.injectWeight ?? 50.0,
      io_inject_weight: opts.ioInjectWeight ?? 100.0,
      observe_ms: opts.observeMs ?? 30.0,
      ltd_amount: opts.ltdAmount ?? 5.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/cerebellum/ltd_train`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 24: POST /synapses/upgrade_nmda — AMPA → NMDA PSP duration swap.
   * Wang 2001 working memory. PFC L5 recurrent 에 적용 시 sustained activity 강화.
   */
  async upgradeNmda(postPrefix, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!postPrefix) return { ok: false, reason: 'post_prefix required' };
    const body = {
      post_prefix: postPrefix,
      psp_duration_ms: opts.pspDurationMs ?? 50.0,
      only_recurrent: !!opts.onlyRecurrent,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/synapses/upgrade_nmda`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Phase 23: POST /thalamus/build — Cortico-Thalamo-Cortical Loop.
   * Sherman & Guillery 2006 / Crick 1984. V1 → TH → V2 + TRN attention gate.
   */
  async buildThalamus(opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    const body = {
      th_size: opts.thSize ?? 10,
      trn_size: opts.trnSize ?? 6,
      v1_to_th_density: opts.v1ToThDensity ?? 0.30,
      th_to_v2_density: opts.thToV2Density ?? 0.30,
      th_to_trn_density: opts.thToTrnDensity ?? 0.50,
      trn_to_th_density: opts.trnToThDensity ?? 0.40,
      weight: opts.weight ?? 30.0,
    };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/thalamus/build`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) { return { ok: false, reason: err.message }; }
  }

  /**
   * Session 42+ Tier2-D: GET /networks/{id}/hippocampus/state — CA3/CA1 활성도.
   */
  async getHippocampusState() {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(`/networks/${this._networkId}/hippocampus/state`);
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 41+ Tier1-B: POST /networks/{id}/user_inputs/inject_multi —
   * 여러 user_in 동시 자극 (cross-modal binding). items: [{name, pattern, intensity}, ...]
   * stdp + target_out 지정 시 supervisor pulse + dopamine boost 으로 binding STDP.
   */
  async injectUserInputMulti(items, opts = {}) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!Array.isArray(items) || items.length === 0) return { ok: false, reason: 'no items' };
    const body = {
      items: items.map(it => ({
        name: it.name,
        pattern: it.pattern,
        intensity: it.intensity ?? 1.0,
      })),
      duration_ms: opts.durationMs ?? 5.0,
      observe_ms: opts.observeMs ?? 50.0,
      stdp: !!opts.stdp,
    };
    if (opts.targetOut) body.target_out = opts.targetOut;
    if (typeof opts.supervisorWeight === 'number') body.supervisor_weight = opts.supervisorWeight;
    if (typeof opts.supervisorDelayMs === 'number') body.supervisor_delay_ms = opts.supervisorDelayMs;
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_inputs/inject_multi`,
        { method: 'POST', body },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 41+: POST /networks/{id}/homeostasis/prune — 약한 시냅스 제거.
   * threshold 이하 |weight| 시냅스 정리. cascade saturation 방지.
   * @param {number} threshold - 절대값 임계 (default 1.0).
   * @param {boolean} protectSystem - true 시 시스템 baseline 보존 (default true).
   */
  async homeostasisPrune(threshold = 1.0, protectSystem = true) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/homeostasis/prune`,
        { method: 'POST', body: { threshold, protect_system: protectSystem } },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 39: DELETE /networks/{id}/user_outputs/{name} — 사용자 OUT 삭제.
   * 시스템 OUT (out_0..3) 는 백엔드에서 403.
   */
  async deleteUserOutput(name) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name || !name.startsWith('user_out_')) {
      return { ok: false, reason: 'not a user output node' };
    }
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_outputs/${encodeURIComponent(name)}`,
        { method: 'DELETE' },
      );
      return { ok: true, ...data };
    } catch (err) {
      return { ok: false, reason: err.message };
    }
  }

  /**
   * Session 38: DELETE /networks/{id}/user_inputs/{name} — 사용자 INPUT 삭제.
   * 시스템 노드는 백엔드에서 403. name prefix `user_in_` 강제.
   * @param {string} name - user_in_<idx>
   */
  async deleteUserInput(name) {
    if (!this._networkId) return { ok: false, reason: 'no network' };
    if (!name || !name.startsWith('user_in_')) {
      return { ok: false, reason: 'not a user input node' };
    }
    try {
      const data = await this._fetch(
        `/networks/${this._networkId}/user_inputs/${encodeURIComponent(name)}`,
        { method: 'DELETE' },
      );
      return { ok: true, ...data };
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
