/**
 * NeuronFace backend client (stub).
 * Full implementation in Stage 3d.
 *
 * Target flow against https://whatpull-neuronface.hf.space:
 *   POST /networks                         → network creation
 *   POST /networks/{id}/presets/basic      → 50-neuron circuit build
 *   POST /networks/{id}/handface_and_observe  → gesture stimulus + observe
 *
 * The class intentionally has no side-effects yet. All async methods warn
 * and return early so scene.js can instantiate and wire event handlers
 * without runtime crashes during the 3b → 3e transition.
 */

export class NeuronFaceBackend {
  constructor(apiKey = '', endpoint = 'https://whatpull-neuronface.hf.space') {
    this._apiKey    = apiKey;
    this._endpoint  = endpoint;
    this._listeners = [];
    this._networkId = null;   // set after initialize() in 3d
  }

  // ─── event bus (drop-in for iris-backend.js pattern) ───
  onEvent(fn) {
    this._listeners.push(fn);
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

  // ─── stub methods — real implementations in 3d ───
  async initialize() {
    // TODO(3d): POST /networks, then POST /networks/{id}/presets/basic
    console.warn('NeuronFaceBackend.initialize() — stub, implemented in 3d');
  }

  async sendGesture(name, intensity = 1.0) {
    // TODO(3d): POST /networks/{_networkId}/handface_and_observe with
    //   { type: 'gesture', name, intensity,
    //     stimulus_duration_ms: 15, observe_ms: 50 }
    // then emit({ type: 'neuron-firing', ...response })
    console.warn('NeuronFaceBackend.sendGesture() — stub, implemented in 3d');
  }

  async testConnection() {
    // TODO(3d): GET /health
    console.warn('NeuronFaceBackend.testConnection() — stub, implemented in 3d');
    return { ok: false, reason: 'stub' };
  }
}
