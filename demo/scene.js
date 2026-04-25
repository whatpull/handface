import { HandControl } from '../src/index.ts';
import {
  NeuronFaceBackend,
  loadNeuronFaceSettings,
  saveNeuronFaceSettings,
} from './neuronface-backend.js';

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
}
setupSettingsUI();

// ─── DOM refs ───
const cursorEl = document.getElementById('cursor');

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
  handedness:   'right',
  cursorSource: 'hand',
  cursorAnchor: 'index',
});

let sCurX = 0, sCurY = 0, curInited = false;
const CUR_SMOOTH = 0.25;

control.on('move', (e) => {
  const lm = control.handLandmarks;
  if (lm && lm[8]) {
    const rawX = (1 - lm[8].x) * window.innerWidth;
    const rawY = lm[8].y * window.innerHeight;
    if (!curInited) { sCurX = rawX; sCurY = rawY; curInited = true; }
    else { sCurX += (rawX - sCurX) * CUR_SMOOTH; sCurY += (rawY - sCurY) * CUR_SMOOTH; }
    cursorEl.style.left = `${sCurX}px`;
    cursorEl.style.top  = `${sCurY}px`;
  } else {
    cursorEl.style.left = `${e.screenX}px`;
    cursorEl.style.top  = `${e.screenY}px`;
  }
});

// 마우스 폴백 (HandControl 시작 전 커서 표시)
window.addEventListener('mousemove', (e) => {
  cursorEl.style.left = `${e.clientX}px`;
  cursorEl.style.top  = `${e.clientY}px`;
});

control.on('mousedown', () => { cursorEl.classList.add('clicking'); });
control.on('mouseup',   () => { cursorEl.classList.remove('clicking'); });

// ── Gesture dispatch: HandControl emits each 4-gesture name once per cooldown.
//    forwarded to NeuronFaceBackend for /handface_and_observe.
const GESTURES = ['pointing', 'openpalm', 'thumbsup', 'victory'];
for (const g of GESTURES) {
  control.on(g, () => {
    backend.sendGesture(g, 1.0);
  });
}

// ─────────────────────────────────────────
// Auto-start at module evaluation. fire-and-forget so the camera permission
// prompt appears asynchronously without blocking module load.
// ─────────────────────────────────────────
async function autoStart() {
  try {
    await control.start();
    control.createPanel();

    const initResult = await backend.initialize();
    if (!initResult.ok) {
      console.error(`[neuronface] init failed: ${initResult.reason}`);
    }

    const camPreview = document.getElementById('cam-preview');
    const camToggle  = document.getElementById('cam-toggle');
    if (control.mediaStream && camPreview) {
      camPreview.srcObject = control.mediaStream;
    }
    if (camToggle && camPreview) {
      camToggle.textContent = '📷 HIDE';
      camToggle.addEventListener('click', () => {
        const on = camPreview.style.display !== 'block';
        camPreview.style.display = on ? 'block' : 'none';
        camToggle.textContent = on ? '📷 HIDE' : '📷 CAM';
      });
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
