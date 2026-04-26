import { HandControl } from '../src/index.ts';
import {
  NeuronFaceBackend,
  HANDFACE_GESTURE_TO_INPUT,
  loadNeuronFaceSettings,
  saveNeuronFaceSettings,
} from './neuronface-backend.js';
import { initSnnViz } from './snn-viz/index.js';
import { initAsciiCamera } from './snn-viz/ascii-camera.js';
import { onGestureToggle } from './snn-viz/gesture.js';
import { highlightInputs } from './snn-viz/circuit.js';

// ─────────────────────────────────────────
// Neural backend — NeuronFace (real HTTP)
// ─────────────────────────────────────────
function createBackend() {
  const { apiKey, endpoint } = loadNeuronFaceSettings();
  return new NeuronFaceBackend({ apiKey, endpoint });
}
let backend = createBackend();

// ─── Settings UI: floating FAB toggle + panel inputs ───
function setupSettingsUI() {
  const fabBtn        = document.getElementById('nf-settings-fab');
  const settingsPanel = document.getElementById('neuronface-settings');
  const closeBtn      = document.getElementById('nf-settings-close');
  const endpointInput = document.getElementById('nf-endpoint');
  const apiKeyInput   = document.getElementById('nf-apikey');
  const saveBtn       = document.getElementById('nf-save');
  const testBtn       = document.getElementById('nf-test');
  const statusEl      = document.getElementById('nf-status');
  if (!fabBtn || !settingsPanel || !endpointInput || !saveBtn || !testBtn) return;

  // FAB toggle
  fabBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('open');
  });
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      settingsPanel.classList.remove('open');
    });
  }

  const current = loadNeuronFaceSettings();
  endpointInput.value = current.endpoint;
  apiKeyInput.value   = current.apiKey;

  saveBtn.addEventListener('click', () => {
    const ok = saveNeuronFaceSettings({
      endpoint: endpointInput.value.trim(),
      apiKey:   apiKeyInput.value.trim(),
    });
    statusEl.textContent = ok ? 'saved (reload page to apply)' : 'save failed';
  });

  testBtn.addEventListener('click', async () => {
    statusEl.textContent = 'testing...';
    const probe = new NeuronFaceBackend({
      endpoint: endpointInput.value.trim(),
      apiKey:   apiKeyInput.value.trim(),
    });
    const result = await probe.testConnection();
    statusEl.textContent = result.ok
      ? `OK — ${result.status} (${result.version})`
      : `FAIL — ${result.reason}`;
  });

  // T5.2 1단계: STDP toggle (D14/D9 surface). default OFF = anchor-equivalent.
  const stdpOffBtn = document.getElementById('nf-stdp-off');
  const stdpOnBtn  = document.getElementById('nf-stdp-on');
  function applyStdp(enabled) {
    backend.setStdpEnabled(enabled);
    if (stdpOffBtn) stdpOffBtn.classList.toggle('active', !enabled);
    if (stdpOnBtn)  stdpOnBtn.classList.toggle('active',  enabled);
    console.info(`[neuronface] STDP ${enabled ? 'ON' : 'OFF'} -> sendGesture body.stdp=${enabled}`);
  }
  if (stdpOffBtn) stdpOffBtn.addEventListener('click', () => applyStdp(false));
  if (stdpOnBtn)  stdpOnBtn.addEventListener('click',  () => applyStdp(true));
  applyStdp(false);  // initial = OFF (anchor-equivalent)
}
setupSettingsUI();

// ─────────────────────────────────────────
// Backend event router (NeuronFace)
// ─────────────────────────────────────────
function backendEventHandler(event) {
  switch (event?.type) {
    case 'connection-status':
      if (event.ok) {
        console.info(
          `[neuronface] connected. network=${event.networkId}, ` +
          `neurons=${event.neuronsAdded}, synapses=${event.synapsesAdded}`,
        );
      } else {
        console.warn(`[neuronface] connection failed: ${event.reason}`);
      }
      break;
    case 'neuron-firing':
      if (event.response) {
        const r = event.response;
        const v1 = r.membrane_response_by_region?.V1;
        const active = v1?.active_count ?? 0;
        const maxPeak = v1?.max_peak_v;
        console.debug(
          `[neuronface] ${event.gesture} → V1 active=${active} ` +
          `max_peak=${maxPeak ?? '—'}`,
        );
      } else if (event.error) {
        console.warn(`[neuronface] ${event.gesture} failed: ${event.error}`);
      }
      break;
    default:
      break;
  }
}
backend.onEvent(backendEventHandler);

// ─────────────────────────────────────────
// HandControl (gesture input)
// ─────────────────────────────────────────
const control = new HandControl({
  handedness:   'any',
  cursorSource: 'hand',
  cursorAnchor: 'index',
});

// ── Gesture dispatch: HandControl emits each 4-gesture name once per cooldown.
//    forwarded to NeuronFaceBackend for /handface_and_observe.
//    snn-viz also subscribes (for icon highlight) — see initSnnViz.
const GESTURES = ['pointing', 'openpalm', 'thumbsup', 'victory'];
for (const g of GESTURES) {
  control.on(g, () => {
    backend.sendGesture(g, 1.0);
  });
}

// T5.2 2단계 (D29 multi-INPUT): button-driven multi-select listener.
// gesture.js 의 toggleGesture (button click) → onGestureToggle 호출 →
// 1) INPUT 영역 dot .selected (persistent) 갱신
// 2) backend.sendGestures (multi-INPUT body.inputs) dispatch
// mediapipe single-path (위의 control.on) 와 공존 (d-3 결정).
onGestureToggle((selectedGestures) => {
  const mappedInputs = selectedGestures
    .map(g => HANDFACE_GESTURE_TO_INPUT[g])
    .filter(Boolean);
  highlightInputs(mappedInputs);
  if (selectedGestures.length > 0) {
    backend.sendGestures(selectedGestures, 1.0);
  } else {
    console.log('[neuronface] all gestures deselected (no dispatch)');
  }
});

console.info('[snn-viz] Phase A done: mapping removed');

// ─────────────────────────────────────────
// Auto-start at module evaluation. fire-and-forget so the camera permission
// prompt appears asynchronously without blocking module load.
// ─────────────────────────────────────────
async function autoStart() {
  try {
    await control.start();

    // SNN viz mount (after control.start so handLandmarks are flowing)
    initSnnViz({ control, backend });

    const initResult = await backend.initialize();
    if (!initResult.ok) {
      console.error(`[neuronface] init failed: ${initResult.reason}`);
    }

    const camPreview = document.getElementById('cam-preview');
    if (control.mediaStream && camPreview) {
      camPreview.srcObject = control.mediaStream;
      // 명시적 play() — autoplay defer 방지 (off-screen / display 변형 시 일부 브라우저가 defer)
      try {
        await camPreview.play();
      } catch (e) {
        console.warn('[handface] cam-preview play() rejected:', e?.message ?? e);
      }
      // ASCII pipeline mount (video frame stream → 60×32 ASCII cell + cyan→coral overlay)
      const asciiMountEl = camPreview.parentElement;
      if (asciiMountEl) {
        initAsciiCamera({ videoEl: camPreview, mountEl: asciiMountEl });
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') {
        control.recalibrate();
      }
    });
  } catch (err) {
    console.error('[handface] autoStart failed:', err);
  }
}

autoStart();
