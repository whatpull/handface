import { HandControl } from '../src/index.ts';
import {
  NeuronFaceBackend,
  HANDFACE_GESTURE_TO_INPUT,
  loadNeuronFaceSettings,
  saveNeuronFaceSettings,
} from './neuronface-backend.js';
import { initSnnViz } from './snn-viz/index.js';
import { initAsciiCamera } from './snn-viz/ascii-camera.js';
import { mountHand } from './snn-viz/hand.js';
import { onGestureToggle } from './snn-viz/gesture.js';
import { highlightInputs } from './snn-viz/circuit.js';
import { state } from './snn-viz/state.js';
import { renderCascadeWeightHistory, exportCascadeWeightHistoryCsv } from './snn-viz/node-interaction.js';
import {
  renderAnchorVerification,
  runAnchorVerification,
  exportAnchorVerificationCsv,
  runD85Verification,
  renderD85Verification,
  exportD85VerificationCsv,
} from './snn-viz/anchor-verification.js';
import {
  renderCascadeFire,
  runCascadeFire,
  exportCascadeFireCsv,
} from './snn-viz/cascade-fire-panel.js';
import {
  initCanvas,
  initCanvasNeuron,
  buildGrownNeuronNode,
  updateCanvasFire,
  updateCanvasFireNeuron,
  destroyCanvas,
  setEditorMode,
  setCanvasZoom,
  getCanvasZoom,
  fitCanvasToNodes,
} from './snn-viz/canvas/index.js';
import './snn-viz/canvas/style.css';

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
      // Session 36: settings panel close → sidebar ⚙ button active 영역.
      document.getElementById('nf-sidebar-settings')?.classList.remove('active');
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
    if (ok) {
      // Session 36: Save 통과 후 자동 reload (사용자 catch 정합).
      statusEl.textContent = 'saved — reloading...';
      saveBtn.disabled = true;
      testBtn.disabled = true;
      setTimeout(() => window.location.reload(), 600);
    } else {
      statusEl.textContent = 'save failed';
    }
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

  // T5.1-2b α: STDP Mode toggle (Pair / Triplet). default Pair = D9 정합 / anchor 보존.
  const stdpModePairBtn    = document.getElementById('nf-stdp-mode-pair');
  const stdpModeTripletBtn = document.getElementById('nf-stdp-mode-triplet');
  function applyStdpMode(mode) {
    backend.setStdpMode(mode);
    state.stdpMode = mode;  // T5.1-2b γ: popover trace section 영역 mode 분기
    if (stdpModePairBtn)    stdpModePairBtn.classList.toggle('active',    mode === 'pair');
    if (stdpModeTripletBtn) stdpModeTripletBtn.classList.toggle('active', mode === 'triplet');
    console.info(`[neuronface] STDP Mode = ${mode} -> sendGesture body.stdp_mode=${mode}`);
  }
  if (stdpModePairBtn)    stdpModePairBtn.addEventListener('click',    () => applyStdpMode('pair'));
  if (stdpModeTripletBtn) stdpModeTripletBtn.addEventListener('click', () => applyStdpMode('triplet'));
  applyStdpMode('pair');  // initial = pair (D9 default, anchor 정합)

  // Phase 6.3: multi-neuron induce preset buttons.
  const induceMultiV1V2Btn = document.getElementById('nf-induce-multi-v1v2');
  const induceMultiChainBtn = document.getElementById('nf-induce-multi-chain');
  const induceCascade8InputsBtn = document.getElementById('nf-induce-cascade-8inputs');

  function dispatchInduceMulti(neuronNames) {
    window.dispatchEvent(new CustomEvent('induce-fire-multi-request', {
      detail: { neuronNames },
    }));
  }

  if (induceMultiV1V2Btn) {
    induceMultiV1V2Btn.addEventListener('click', () => {
      dispatchInduceMulti(['v1_L4_E_8', 'v2_L4_E_5']);
    });
  }
  if (induceMultiChainBtn) {
    induceMultiChainBtn.addEventListener('click', () => {
      dispatchInduceMulti(['v1_L4_E_8', 'v2_L4_E_5', 'out_1']);
    });
  }
  // Phase 8: D80 anchor cascade induce (8 INPUT 동시 → 7 region cascade fire).
  if (induceCascade8InputsBtn) {
    induceCascade8InputsBtn.addEventListener('click', () => {
      dispatchInduceMulti([
        'in_pinch', 'in_fist', 'in_palm', 'in_point',
        'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory',
      ]);
    });
  }

  // Phase 8: cascade weight history modal.
  const cascadeOpenBtn = document.getElementById('nf-cascade-history-open');
  const cascadeModal   = document.getElementById('nf-cascade-modal');
  const cascadeClose   = document.getElementById('nf-cascade-modal-close');
  const cascadeExport  = document.getElementById('nf-cascade-modal-export');
  const cascadeBody    = document.getElementById('nf-cascade-modal-body');

  function showCascadeModal() {
    if (!cascadeModal || !cascadeBody) return;
    cascadeBody.innerHTML = renderCascadeWeightHistory();
    cascadeModal.classList.remove('nf-cascade-modal--hidden');
  }
  function hideCascadeModal() {
    if (cascadeModal) cascadeModal.classList.add('nf-cascade-modal--hidden');
  }

  if (cascadeOpenBtn) cascadeOpenBtn.addEventListener('click', showCascadeModal);
  if (cascadeClose)   cascadeClose.addEventListener('click', hideCascadeModal);
  if (cascadeExport) {
    cascadeExport.addEventListener('click', () => {
      const ok = exportCascadeWeightHistoryCsv();
      if (!ok) console.warn('[cascade-history] no data to export');
    });
  }
  if (cascadeModal) {
    cascadeModal.addEventListener('click', (e) => {
      if (e.target === cascadeModal) hideCascadeModal();
    });
  }
  // Live refresh — fire 시점 modal 열려있으면 chart 갱신.
  window.addEventListener('snn-viz:fire-update', () => {
    if (cascadeModal && !cascadeModal.classList.contains('nf-cascade-modal--hidden') && cascadeBody) {
      cascadeBody.innerHTML = renderCascadeWeightHistory();
    }
  });

  // Phase 8 anchor verification modal.
  const anchorRunBtn  = document.getElementById('nf-anchor-verify-run');
  const anchorOpenBtn = document.getElementById('nf-anchor-verify-open');
  const anchorModal   = document.getElementById('nf-anchor-modal');
  const anchorClose   = document.getElementById('nf-anchor-modal-close');
  const anchorExport  = document.getElementById('nf-anchor-modal-export');
  const anchorBody    = document.getElementById('nf-anchor-modal-body');
  let anchorResult = null;

  async function runAnchorVerify() {
    if (!anchorBody || !anchorModal) return;
    anchorBody.innerHTML = '<div class="nf-anchor-loading">Running verification (10 induce, ~5-10s)...</div>';
    anchorModal.classList.remove('nf-anchor-modal--hidden');
    try {
      anchorResult = await runAnchorVerification(backend);
      anchorBody.innerHTML = renderAnchorVerification(anchorResult);
    } catch (err) {
      anchorBody.innerHTML = `<div class="nf-anchor-empty">Verification error: ${err.message}</div>`;
    }
  }

  function showAnchorModal() {
    if (!anchorBody || !anchorModal) return;
    anchorBody.innerHTML = anchorResult
      ? renderAnchorVerification(anchorResult)
      : '<div class="nf-anchor-empty">No verification yet — click Run Verification.</div>';
    anchorModal.classList.remove('nf-anchor-modal--hidden');
  }

  function hideAnchorModal() {
    if (anchorModal) anchorModal.classList.add('nf-anchor-modal--hidden');
  }

  if (anchorRunBtn)  anchorRunBtn.addEventListener('click', runAnchorVerify);
  if (anchorOpenBtn) anchorOpenBtn.addEventListener('click', showAnchorModal);
  if (anchorClose)   anchorClose.addEventListener('click', hideAnchorModal);
  if (anchorExport) {
    anchorExport.addEventListener('click', () => {
      if (!anchorResult) {
        console.warn('[anchor-verify] no result to export');
        return;
      }
      exportAnchorVerificationCsv(anchorResult);
    });
  }
  if (anchorModal) {
    anchorModal.addEventListener('click', (e) => {
      if (e.target === anchorModal) hideAnchorModal();
    });
  }

  // Session 35: D85 anchor verification modal (D80 패턴 정합).
  const d85RunBtn  = document.getElementById('nf-d85-run');
  const d85OpenBtn = document.getElementById('nf-d85-open');
  const d85Modal   = document.getElementById('nf-d85-modal');
  const d85Close   = document.getElementById('nf-d85-modal-close');
  const d85Export  = document.getElementById('nf-d85-modal-export');
  const d85Body    = document.getElementById('nf-d85-modal-body');
  let d85Result = null;

  async function runD85Verify() {
    if (!d85Body || !d85Modal) return;
    d85Body.innerHTML = '<div class="nf-anchor-loading">Running D85 verification (10 induce, ~5-10s)...</div>';
    d85Modal.classList.remove('nf-anchor-modal--hidden');
    try {
      d85Result = await runD85Verification(backend);
      d85Body.innerHTML = renderD85Verification(d85Result);
    } catch (err) {
      d85Body.innerHTML = `<div class="nf-anchor-empty">D85 verification error: ${err.message}</div>`;
    }
  }

  function showD85Modal() {
    if (!d85Body || !d85Modal) return;
    d85Body.innerHTML = d85Result
      ? renderD85Verification(d85Result)
      : '<div class="nf-anchor-empty">No D85 verification yet — click Run D85 Verification.</div>';
    d85Modal.classList.remove('nf-anchor-modal--hidden');
  }

  function hideD85Modal() {
    if (d85Modal) d85Modal.classList.add('nf-anchor-modal--hidden');
  }

  if (d85RunBtn)  d85RunBtn.addEventListener('click', runD85Verify);
  if (d85OpenBtn) d85OpenBtn.addEventListener('click', showD85Modal);
  if (d85Close)   d85Close.addEventListener('click', hideD85Modal);
  if (d85Export) {
    d85Export.addEventListener('click', () => {
      if (!d85Result) {
        console.warn('[d85-verify] no result to export');
        return;
      }
      exportD85VerificationCsv(d85Result);
    });
  }
  if (d85Modal) {
    d85Modal.addEventListener('click', (e) => {
      if (e.target === d85Modal) hideD85Modal();
    });
  }

  // Session 33: cascade fire panel modal.
  const cfRunBtn   = document.getElementById('nf-cascade-fire-run');
  const cfOpenBtn  = document.getElementById('nf-cascade-fire-open');
  const cfModal    = document.getElementById('nf-cascade-fire-modal');
  const cfClose    = document.getElementById('nf-cascade-fire-modal-close');
  const cfExport   = document.getElementById('nf-cascade-fire-modal-export');
  const cfBody     = document.getElementById('nf-cascade-fire-modal-body');
  let cfResult = null;

  async function runCfMap() {
    if (!cfBody || !cfModal) return;
    cfBody.innerHTML = '<div class="nf-cf-loading">Running cascade fire (1 induce, ~1-2s)...</div>';
    cfModal.classList.remove('nf-cascade-fire-modal--hidden');
    try {
      cfResult = await runCascadeFire(backend);
      cfBody.innerHTML = renderCascadeFire(cfResult);
    } catch (err) {
      cfBody.innerHTML = `<div class="nf-cf-empty">Run error: ${err.message}</div>`;
    }
  }

  function showCfMap() {
    if (!cfBody || !cfModal) return;
    cfBody.innerHTML = cfResult
      ? renderCascadeFire(cfResult)
      : '<div class="nf-cf-empty">No result yet — click Run Cascade Fire.</div>';
    cfModal.classList.remove('nf-cascade-fire-modal--hidden');
  }

  function hideCfMap() {
    if (cfModal) cfModal.classList.add('nf-cascade-fire-modal--hidden');
  }

  if (cfRunBtn)  cfRunBtn.addEventListener('click', runCfMap);
  if (cfOpenBtn) cfOpenBtn.addEventListener('click', showCfMap);
  if (cfClose)   cfClose.addEventListener('click', hideCfMap);
  if (cfExport) {
    cfExport.addEventListener('click', () => {
      if (!cfResult) {
        console.warn('[cascade-fire] no result to export');
        return;
      }
      exportCascadeFireCsv(cfResult);
    });
  }
  if (cfModal) {
    cfModal.addEventListener('click', (e) => {
      if (e.target === cfModal) hideCfMap();
    });
  }
}
setupSettingsUI();

// T5.1-2c-2: popover induce fire button → window event → backend.induceFire 호출.
window.addEventListener('induce-fire-request', (ev) => {
  const neuronName = ev.detail?.neuronName;
  if (!neuronName) return;
  backend.induceFire(neuronName);
});

// Phase 6.3: settings panel multi-neuron induce → backend.induceFireMulti 호출.
window.addEventListener('induce-fire-multi-request', (ev) => {
  const neuronNames = ev.detail?.neuronNames;
  if (!Array.isArray(neuronNames) || neuronNames.length === 0) return;
  backend.induceFireMulti(neuronNames);
});

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
    // Session 36 정정: 단일 gesture detection → 단일 INPUT 영역만 active (사용자 본 의도 정합).
    backend.sendGesture(g, 1.0);
  });
}

// T5.2 2단계 (D29 multi-INPUT): button-driven multi-select listener.
// gesture.js 의 toggleGesture (button click) → onGestureToggle 호출 →
// 1) INPUT 영역 dot .selected (persistent) 갱신
// 2) backend.sendGestures (multi-INPUT body.inputs) dispatch
// mediapipe single-path (위의 control.on) 와 공존 (d-3 결정).
// Session 36: 학습 결과 (synapse weight) save / load — backend snapshot + localStorage.
// Session 37 Phase 2: Cloudflare D1 mirror (handface-training.whatpull.workers.dev) 영역 영역 영역.
const TRAINING_STORAGE_KEY = 'handface.training.snapshot.v1';
const D1_WORKER_ENDPOINT  = 'https://handface-training.whatpull.workers.dev';
const D1_NETWORK_ID       = 'handface-default';

async function mirrorToD1(synapses, anchor) {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/networks/${D1_NETWORK_ID}/training/snapshot`, {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ weights: synapses, meta: { anchor, savedAt: Date.now() } }),
    });
    if (!r.ok) {
      console.warn('[d1] mirror failed:', r.status);
      return false;
    }
    const data = await r.json();
    console.info(`[d1] mirrored ${data.count} synapses (updated_at ${data.updated_at})`);
    return true;
  } catch (err) {
    console.warn('[d1] mirror error:', err.message);
    return false;
  }
}

async function saveTopologyToD1(neurons, synapses, meta) {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/networks/${D1_NETWORK_ID}/topology`, {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ neurons, synapses, meta: meta || { savedAt: Date.now() } }),
    });
    if (!r.ok) {
      console.warn('[d1 topology] save failed:', r.status);
      return false;
    }
    const data = await r.json();
    console.info(`[d1 topology] saved ${data.neuron_count} neurons / ${data.synapse_count} synapses`);
    return true;
  } catch (err) {
    console.warn('[d1 topology] save error:', err.message);
    return false;
  }
}

async function loadTopologyFromD1() {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/networks/${D1_NETWORK_ID}/topology`);
    if (!r.ok) return null;
    const data = await r.json();
    if (!Array.isArray(data.neurons) || data.neurons.length === 0) return null;
    return { neurons: data.neurons, synapses: data.synapses, savedAt: data.updated_at };
  } catch (err) {
    console.warn('[d1 topology] load error:', err.message);
    return null;
  }
}

// Phase 7 학습 데이터셋 D1 sync.
const D1_DATASET_ID = 'main';

async function saveDatasetToD1(samples) {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/networks/${D1_NETWORK_ID}/datasets/${D1_DATASET_ID}`, {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ samples, meta: { savedAt: Date.now() } }),
    });
    if (!r.ok) return false;
    const data = await r.json();
    console.info(`[d1 dataset] saved ${data.sample_count} samples`);
    return true;
  } catch (err) {
    console.warn('[d1 dataset] save error:', err.message);
    return false;
  }
}

async function loadDatasetFromD1() {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/networks/${D1_NETWORK_ID}/datasets/${D1_DATASET_ID}`);
    if (!r.ok) return null;
    const data = await r.json();
    if (!Array.isArray(data.samples) || data.samples.length === 0) return null;
    return { samples: data.samples, savedAt: data.updated_at };
  } catch (err) {
    return null;
  }
}

async function loadFromD1() {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/networks/${D1_NETWORK_ID}/training/snapshot`);
    if (!r.ok) return null;
    const data = await r.json();
    if (!Array.isArray(data.weights) || data.weights.length === 0) return null;
    return { synapses: data.weights, savedAt: data.updated_at, meta: data.meta };
  } catch (err) {
    console.warn('[d1] load error:', err.message);
    return null;
  }
}

async function saveTrainingState() {
  const result = await backend.getTrainingSnapshot();
  if (!result.ok || !result.response?.synapses) {
    console.warn('[neuronface] save snapshot failed:', result.reason);
    return false;
  }
  try {
    const payload = {
      saved_at: Date.now(),
      synapse_count: result.response.synapse_count,
      synapses: result.response.synapses,
    };
    localStorage.setItem(TRAINING_STORAGE_KEY, JSON.stringify(payload));
    console.info(`[neuronface] training snapshot saved (${payload.synapse_count} synapses)`);
    // Phase 2: D1 mirror (best-effort, non-blocking on UI).
    mirrorToD1(payload.synapses, 'D100').catch(() => {});
    return true;
  } catch (err) {
    console.error('[neuronface] localStorage save failed:', err);
    return false;
  }
}

async function loadTrainingState() {
  try {
    let synapses = null;
    let savedAt  = null;
    let source   = 'localStorage';
    const raw = localStorage.getItem(TRAINING_STORAGE_KEY);
    if (raw) {
      const payload = JSON.parse(raw);
      if (Array.isArray(payload.synapses) && payload.synapses.length > 0) {
        synapses = payload.synapses;
        savedAt  = payload.saved_at;
      }
    }
    if (!synapses) {
      // Phase 2: localStorage empty → D1 fallback.
      const d1 = await loadFromD1();
      if (d1) {
        synapses = d1.synapses;
        savedAt  = d1.savedAt * 1000;  // sec → ms
        source   = 'D1';
      }
    }
    if (!synapses) return false;
    const result = await backend.loadTrainingSnapshot(synapses);
    if (!result.ok) {
      console.warn('[neuronface] training load failed:', result.reason);
      return false;
    }
    const dateStr = savedAt ? new Date(savedAt).toLocaleString() : '?';
    console.info(`[neuronface] training restored from ${source}: ${result.response.updated} synapses (saved ${dateStr})`);
    return true;
  } catch (err) {
    console.error('[neuronface] training load error:', err);
    return false;
  }
}

function clearTrainingState() {
  try {
    localStorage.removeItem(TRAINING_STORAGE_KEY);
    console.info('[neuronface] training snapshot cleared');
    return true;
  } catch (err) {
    return false;
  }
}

// Session 36: Train Cascade button handler — STDP on + 20 induce 영역 학습 발동.
const TRAIN_ALL_8_INPUTS = [
  'in_pinch', 'in_fist', 'in_palm', 'in_point',
  'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory',
];
window.addEventListener('DOMContentLoaded', () => {
  const trainBtn = document.getElementById('nf-train-cascade');
  if (!trainBtn) return;
  trainBtn.addEventListener('click', async () => {
    if (trainBtn.disabled) return;
    trainBtn.disabled = true;
    const orig = trainBtn.textContent;
    backend.setStdpEnabled(true);
    backend.setStdpMode('pair');
    for (let i = 1; i <= 20; i += 1) {
      trainBtn.textContent = `Training... (${i}/20)`;
      try {
        await backend.induceFireMulti(TRAIN_ALL_8_INPUTS);
      } catch (err) {
        console.error('[train] induce failed:', err);
        break;
      }
    }
    trainBtn.textContent = 'Trained ✓ (재학습 click)';
    // Session 36: 학습 통과 후 자동 save (localStorage + backend snapshot).
    await saveTrainingState();
    setTimeout(() => { trainBtn.textContent = orig; trainBtn.disabled = false; }, 2000);
  });

  // Phase 7 회로 사양 JSON export/import.
  const circuitExportBtn = document.getElementById('nf-circuit-export');
  const circuitImportBtn = document.getElementById('nf-circuit-import');
  const circuitImportFile = document.getElementById('nf-circuit-import-file');
  const circuitExportStatus = document.getElementById('nf-circuit-export-status');

  if (circuitExportBtn) {
    circuitExportBtn.addEventListener('click', async () => {
      circuitExportBtn.disabled = true;
      const orig = circuitExportBtn.textContent;
      circuitExportBtn.textContent = 'Exporting...';
      const r = await backend.exportCircuit();
      if (!r.ok) {
        circuitExportBtn.textContent = `Failed: ${r.reason || ''}`;
        setTimeout(() => { circuitExportBtn.textContent = orig; circuitExportBtn.disabled = false; }, 2000);
        return;
      }
      const json = JSON.stringify(r.spec, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `handface-circuit-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      circuitExportBtn.textContent = `Downloaded ✓ (${r.spec.neurons.length}n / ${r.spec.synapses.length}s)`;
      if (circuitExportStatus) {
        circuitExportStatus.textContent = `Exported: ${r.spec.neurons.length} neurons, ${r.spec.synapses.length} synapses, neuromod=${r.spec.neuromodulator ? 'yes' : 'no'}`;
      }
      setTimeout(() => { circuitExportBtn.textContent = orig; circuitExportBtn.disabled = false; }, 2500);
    });
  }
  if (circuitImportBtn && circuitImportFile) {
    circuitImportBtn.addEventListener('click', () => circuitImportFile.click());
    circuitImportFile.addEventListener('change', async () => {
      const file = circuitImportFile.files?.[0];
      if (!file) return;
      circuitImportBtn.disabled = true;
      const orig = circuitImportBtn.textContent;
      circuitImportBtn.textContent = `Loading ${file.name}...`;
      try {
        const text = await file.text();
        const spec = JSON.parse(text);
        circuitImportBtn.textContent = 'Importing to backend...';
        const r = await backend.importCircuit(spec);
        if (r.ok) {
          circuitImportBtn.textContent = `Imported ✓ (+${r.addedNeurons} neurons / +${r.addedSynapses} synapses)`;
          // Canvas 재로드.
          const snap = await backend.getTrainingSnapshot();
          if (snap.ok && snap.response?.synapses) {
            if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
            else lastFireResponse = { synapses: snap.response.synapses };
            state.synapses = snap.response.synapses;
            if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
          }
          if (circuitExportStatus) {
            circuitExportStatus.textContent = `Imported from ${file.name}: +${r.addedNeurons}n / +${r.addedSynapses}s`;
          }
        } else {
          circuitImportBtn.textContent = `Import failed: ${r.reason || ''}`;
        }
      } catch (err) {
        circuitImportBtn.textContent = `Parse error: ${err.message}`;
      }
      circuitImportFile.value = '';
      setTimeout(() => { circuitImportBtn.textContent = orig; circuitImportBtn.disabled = false; }, 3000);
    });
  }

  // Session 36: Save / Load / Clear training button handler.
  const saveBtn  = document.getElementById('nf-training-save');
  const loadBtn  = document.getElementById('nf-training-load');
  const clearBtn = document.getElementById('nf-training-clear');

  saveBtn?.addEventListener('click', async () => {
    saveBtn.disabled = true;
    const orig = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    const ok = await saveTrainingState();
    saveBtn.textContent = ok ? 'Saved ✓' : 'Save failed';
    setTimeout(() => { saveBtn.textContent = orig; saveBtn.disabled = false; }, 1500);
  });

  loadBtn?.addEventListener('click', async () => {
    loadBtn.disabled = true;
    const orig = loadBtn.textContent;
    loadBtn.textContent = 'Loading...';
    const ok = await loadTrainingState();
    loadBtn.textContent = ok ? 'Loaded ✓' : 'No snapshot';
    setTimeout(() => { loadBtn.textContent = orig; loadBtn.disabled = false; }, 1500);
  });

  clearBtn?.addEventListener('click', () => {
    clearTrainingState();
    const orig = clearBtn.textContent;
    clearBtn.textContent = 'Cleared ✓';
    clearBtn.disabled = true;
    setTimeout(() => { clearBtn.textContent = orig; clearBtn.disabled = false; }, 1500);
  });

  // Session 37 Phase 4 본격: supervised RL handler.
  const supervisedStatus = document.getElementById('nf-supervised-status');
  const supervisedBtns = Array.from(document.querySelectorAll('.nf-supervised-btn'));
  const supervisedBatchBtn = document.getElementById('nf-supervised-batch');

  const decodeHeadline = document.getElementById('nf-decode-headline');
  let decodeHeadlinePrev = '';
  function updateDecodePanel(outRates) {
    if (!outRates) return;
    const cells = Array.from(document.querySelectorAll('.nf-decode-cell'));
    let maxRate = -1;
    let winner = null;
    for (const cell of cells) {
      const out = cell.dataset.out;
      const rate = outRates[out] ?? 0;
      cell.querySelector('.nf-decode-rate').textContent = `${rate.toFixed(1)} Hz`;
      cell.classList.remove('winner');
      if (rate > maxRate) { maxRate = rate; winner = cell; }
    }
    if (winner && maxRate > 0) winner.classList.add('winner');
    // Decode headline (Session 37): 큰 글씨로 winner 라벨 + 변경 시 pulse 애니메이션.
    if (decodeHeadline) {
      if (winner && maxRate > 0) {
        const label = winner.querySelector('.nf-decode-label')?.textContent || winner.dataset.out;
        const display = `${label} (${maxRate.toFixed(0)} Hz)`;
        if (display !== decodeHeadlinePrev) {
          decodeHeadline.textContent = display;
          decodeHeadline.classList.remove('active');
          // Reflow 강제 (애니메이션 재실행).
          void decodeHeadline.offsetWidth;
          decodeHeadline.classList.add('active');
          decodeHeadlinePrev = display;
        }
      } else {
        decodeHeadline.textContent = '—';
        decodeHeadline.classList.remove('active');
        decodeHeadlinePrev = '';
      }
    }
  }

  async function runSingleSupervised(gesture, target, trials = 5) {
    backend.setStdpMode('pair');
    let last = null;
    for (let i = 1; i <= trials; i += 1) {
      const r = await backend.trainSupervised(gesture, target, { multiInput: true });
      if (!r.ok) {
        console.error('[supervised]', r.reason);
        return { ok: false, reason: r.reason };
      }
      last = r.response;
      if (supervisedStatus) {
        supervisedStatus.textContent = `${gesture} → ${target} (${i}/${trials})`;
      }
    }
    if (last?.out_rates) updateDecodePanel(last.out_rates);
    return { ok: true, last };
  }

  supervisedBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (btn.disabled) return;
      const gesture = btn.dataset.gesture;
      const target  = btn.dataset.target;
      btn.disabled = true;
      const orig = btn.textContent;
      btn.textContent = `Training ${gesture}...`;
      const r = await runSingleSupervised(gesture, target, 5);
      btn.textContent = r.ok ? `${orig} ✓` : `${orig} ✗`;
      await saveTrainingState();
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
    });
  });

  if (supervisedBatchBtn) {
    supervisedBatchBtn.addEventListener('click', async () => {
      if (supervisedBatchBtn.disabled) return;
      supervisedBatchBtn.disabled = true;
      const orig = supervisedBatchBtn.textContent;
      const pairs = [
        ['pointing', 'out_0'],
        ['openpalm', 'out_1'],
        ['thumbsup', 'out_2'],
        ['victory',  'out_3'],
      ];
      backend.setStdpMode('pair');
      for (let round = 1; round <= 5; round += 1) {
        for (const [gesture, target] of pairs) {
          supervisedBatchBtn.textContent = `Batch ${round}/5: ${gesture}→${target}`;
          const r = await backend.trainSupervised(gesture, target, { multiInput: true });
          if (!r.ok) {
            console.error('[supervised batch]', r.reason);
            supervisedBatchBtn.textContent = `Batch failed: ${r.reason}`;
            supervisedBatchBtn.disabled = false;
            return;
          }
          if (r.response?.out_rates) updateDecodePanel(r.response.out_rates);
        }
      }
      supervisedBatchBtn.textContent = 'Batch done ✓';
      await saveTrainingState();
      setTimeout(() => {
        supervisedBatchBtn.textContent = orig;
        supervisedBatchBtn.disabled = false;
      }, 2000);
    });
  }

  // Session 37 Phase 5: Neuromodulator slider handlers.
  const nmDopamine = document.getElementById('nf-nm-dopamine');
  const nmAch      = document.getElementById('nf-nm-ach');
  const nmSero     = document.getElementById('nf-nm-serotonin');
  const nmDopamineVal = document.getElementById('nf-nm-dopamine-val');
  const nmAchVal      = document.getElementById('nf-nm-ach-val');
  const nmSeroVal     = document.getElementById('nf-nm-serotonin-val');
  const nmReset       = document.getElementById('nf-nm-reset');

  let nmDebounce = null;
  function flushNeuromodulator() {
    if (nmDebounce) clearTimeout(nmDebounce);
    nmDebounce = setTimeout(async () => {
      const mods = {
        dopamine:      parseFloat(nmDopamine.value),
        acetylcholine: parseFloat(nmAch.value),
        serotonin:     parseFloat(nmSero.value),
      };
      const r = await backend.setNeuromodulator(mods);
      if (!r.ok) console.warn('[neuromod] set failed:', r.reason);
    }, 150);
  }

  function bindSlider(el, valEl) {
    if (!el || !valEl) return;
    el.addEventListener('input', () => {
      valEl.textContent = parseFloat(el.value).toFixed(1);
      flushNeuromodulator();
    });
  }
  bindSlider(nmDopamine, nmDopamineVal);
  bindSlider(nmAch,      nmAchVal);
  bindSlider(nmSero,     nmSeroVal);

  if (nmReset) {
    nmReset.addEventListener('click', () => {
      nmDopamine.value = 0; nmDopamineVal.textContent = '0.0';
      nmAch.value = 0;      nmAchVal.textContent      = '0.0';
      nmSero.value = 0;     nmSeroVal.textContent     = '0.0';
      flushNeuromodulator();
    });
  }

  // Session 37 Phase 7: Vectorized backend toggle.
  const vecToggle = document.getElementById('nf-vectorized-toggle');
  const vecState  = document.getElementById('nf-vectorized-state');
  if (vecToggle) {
    vecToggle.addEventListener('change', () => {
      const on = vecToggle.checked;
      backend.setUseVectorized(on);
      if (vecState) {
        vecState.textContent = on ? 'ON (vectorized, ~2x for large nets)' : 'OFF (NeuralNetwork)';
      }
    });
  }

  // Phase 4 decode accuracy 자동 측정 패널.
  const decodeEvalBtn    = document.getElementById('nf-decode-eval');
  const decodeEvalResult = document.getElementById('nf-decode-eval-result');
  if (decodeEvalBtn) {
    decodeEvalBtn.addEventListener('click', async () => {
      decodeEvalBtn.disabled = true;
      const orig = decodeEvalBtn.textContent;
      const G2T = [['pointing','out_0'],['openpalm','out_1'],['thumbsup','out_2'],['victory','out_3']];
      const SINGLE = { pointing:'in_point', openpalm:'in_palm', thumbsup:'in_thumbsup', victory:'in_victory' };
      const N_TRIALS = 5;
      let correct = 0;
      const total = G2T.length * N_TRIALS;
      const perGesture = {};
      for (const [g, target] of G2T) {
        perGesture[g] = { correct: 0, total: N_TRIALS };
        for (let t = 0; t < N_TRIALS; t += 1) {
          decodeEvalBtn.textContent = `Eval ${g} ${t+1}/${N_TRIALS}`;
          const pat = ['in_pinch','in_fist','in_palm','in_point','in_gaze','in_blink','in_thumbsup','in_victory']
            .map(n => n === SINGLE[g] ? 1.0 : 0.0);
          const r = await backend.injectPattern(pat, { modality: 'gesture' });
          if (!r.ok) continue;
          const out = r.response?.out_rates || {};
          const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
          if (winner === target) {
            correct += 1;
            perGesture[g].correct += 1;
          }
        }
      }
      const pct = (correct / total * 100).toFixed(1);
      decodeEvalBtn.textContent = `Done: ${correct}/${total} = ${pct}%`;
      if (decodeEvalResult) {
        const detail = Object.entries(perGesture)
          .map(([g, s]) => `${g}: ${s.correct}/${s.total}`)
          .join(', ');
        decodeEvalResult.textContent = `정확도: ${correct}/${total} = ${pct}% | ${detail}`;
      }
      setTimeout(() => { decodeEvalBtn.textContent = orig; decodeEvalBtn.disabled = false; }, 3000);
    });
  }

  // Phase 4: Direct decode pathway toggle.
  const decodePathwayToggle = document.getElementById('nf-decode-pathway-toggle');
  const decodePathwayState  = document.getElementById('nf-decode-pathway-state');
  if (decodePathwayToggle) {
    decodePathwayToggle.addEventListener('change', async () => {
      const on = decodePathwayToggle.checked;
      const r = await backend.setDecodePathway(on);
      if (r.ok) {
        if (decodePathwayState) {
          decodePathwayState.textContent = on ? 'ON (단축 decode)' : 'OFF (cascade only)';
        }
      } else {
        decodePathwayToggle.checked = !on;
        console.warn('[decode_pathway] failed:', r.reason);
      }
    });
  }

  // 회로 통계 패널.
  const statsRefreshBtn = document.getElementById('nf-stats-refresh');
  const statsOutput     = document.getElementById('nf-stats-output');
  const statsHistogram  = document.getElementById('nf-stats-histogram');
  const statsHistory    = document.getElementById('nf-stats-history');
  const statsClearHistBtn = document.getElementById('nf-stats-clear-history');

  // Training history (localStorage 영구).
  const STATS_HISTORY_KEY = 'handface.stats.history.v1';
  function loadStatsHistory() {
    try {
      const raw = localStorage.getItem(STATS_HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (_) { return []; }
  }
  function saveStatsHistory(arr) {
    try {
      localStorage.setItem(STATS_HISTORY_KEY, JSON.stringify(arr.slice(-50)));
    } catch (_) {}
  }
  function pushStatsHistory(entry) {
    const arr = loadStatsHistory();
    arr.push({ ts: Date.now(), ...entry });
    saveStatsHistory(arr);
    return arr;
  }

  function renderStatsHistory(arr) {
    if (!statsHistory) return;
    if (!arr || arr.length < 2) { statsHistory.innerHTML = '<text x="100" y="32" font-size="9" font-family="monospace" fill="#94a3b8" text-anchor="middle">history (entries: ' + (arr ? arr.length : 0) + ')</text>'; return; }
    const w = 200, h = 60, padTop = 6, padBot = 14, padX = 4;
    const drawH = h - padTop - padBot;
    const drawW = w - padX * 2;
    const totalPos = arr.map(e => e.total_pos);
    const max = Math.max(...totalPos, 1);
    const points = arr.map((e, i) => {
      const x = padX + (i / (arr.length - 1)) * drawW;
      const y = padTop + drawH - (e.total_pos / max) * drawH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const sat = arr.map(e => e.sat_ratio);
    const satMax = Math.max(...sat, 0.01);
    const satPoints = arr.map((e, i) => {
      const x = padX + (i / (arr.length - 1)) * drawW;
      const y = padTop + drawH - (e.sat_ratio / satMax) * drawH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const parts = [];
    parts.push(`<polyline points="${points.join(' ')}" fill="none" stroke="#a78bfa" stroke-width="1.4"/>`);
    parts.push(`<polyline points="${satPoints.join(' ')}" fill="none" stroke="#f5b842" stroke-width="1.2" stroke-dasharray="3,2"/>`);
    // 가장 최근 점 강조.
    const last = arr[arr.length - 1];
    const lx = padX + drawW;
    const ly = padTop + drawH - (last.total_pos / max) * drawH;
    parts.push(`<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="2.5" fill="#a78bfa"/>`);
    parts.push(`<text x="${padX}" y="${h - 3}" font-size="6" font-family="monospace" fill="#a78bfa">total_pos (purple)</text>`);
    parts.push(`<text x="${w - padX}" y="${h - 3}" font-size="6" font-family="monospace" fill="#f5b842" text-anchor="end">saturation (yellow dash)</text>`);
    parts.push(`<text x="${padX}" y="${padTop + 5}" font-size="6" font-family="monospace" fill="#94a3b8">${arr.length} entries</text>`);
    statsHistory.innerHTML = parts.join('');
  }

  if (statsClearHistBtn) {
    statsClearHistBtn.addEventListener('click', () => {
      saveStatsHistory([]);
      renderStatsHistory([]);
    });
  }
  // 초기 history 렌더.
  renderStatsHistory(loadStatsHistory());

  function renderWeightHistogram(weights) {
    if (!statsHistogram) return;
    if (!weights || weights.length === 0) {
      statsHistogram.innerHTML = '';
      return;
    }
    // Bin: -100..-1 (inh), 0..40 (weak), 40..80 (mid-low), 80..120 (mid), 120..200 (high), 200..320 (saturated).
    const bins = [
      { range: [-Infinity, 0],   color: '#e76f6f', label: 'inh' },
      { range: [0, 20],          color: '#4dd0e1', label: '0-20' },
      { range: [20, 40],         color: '#4dd0e1', label: '20-40' },
      { range: [40, 60],         color: '#5eead4', label: '40-60' },
      { range: [60, 80],         color: '#f5b842', label: '60-80' },
      { range: [80, 120],        color: '#f5b842', label: '80-120' },
      { range: [120, 200],       color: '#a78bfa', label: '120-200' },
      { range: [200, Infinity],  color: '#b794f4', label: '200+' },
    ];
    const counts = bins.map(b => weights.filter(w => w >= b.range[0] && w < b.range[1]).length);
    const max = Math.max(...counts, 1);
    const w = 200, h = 80, padTop = 4, padBot = 14, padX = 4;
    const barW = (w - padX * 2) / bins.length;
    const drawH = h - padTop - padBot;
    const parts = [];
    bins.forEach((b, i) => {
      const barH = (counts[i] / max) * drawH;
      const x = padX + i * barW;
      const y = padTop + (drawH - barH);
      parts.push(`<rect x="${x + 1}" y="${y}" width="${barW - 2}" height="${barH}" fill="${b.color}" opacity="0.85"/>`);
      // label.
      parts.push(`<text x="${x + barW / 2}" y="${h - 3}" font-size="6" font-family="monospace" fill="#94a3b8" text-anchor="middle">${b.label}</text>`);
      // count above bar.
      if (counts[i] > 0) {
        parts.push(`<text x="${x + barW / 2}" y="${y - 1}" font-size="6" font-family="monospace" fill="#cbd5e1" text-anchor="middle">${counts[i]}</text>`);
      }
    });
    statsHistogram.innerHTML = parts.join('');
  }
  if (statsRefreshBtn) {
    statsRefreshBtn.addEventListener('click', async () => {
      statsRefreshBtn.disabled = true;
      const orig = statsRefreshBtn.textContent;
      statsRefreshBtn.textContent = 'Loading...';
      const snap = await backend.getTrainingSnapshot();
      const exp  = await backend.exportTopology();
      let nm = null;
      try {
        const r = await backend.getNeuromodulator();
        if (r.ok) nm = r.response;
      } catch (_) {}
      statsRefreshBtn.textContent = orig;
      statsRefreshBtn.disabled = false;
      if (!snap.ok || !exp.ok) {
        if (statsOutput) statsOutput.textContent = '백엔드 통신 실패.';
        return;
      }
      const synapses = snap.response.synapses || [];
      const weights = synapses.map(s => s.weight);
      renderWeightHistogram(weights);
      // History 기록 (변수명 충돌 회피: posAll, satCount).
      const posAll = weights.filter(w => w > 0);
      const totalPos = posAll.reduce((x, y) => x + y, 0);
      const satCount = posAll.filter(w => w >= 250).length;
      const satRatio = posAll.length > 0 ? satCount / posAll.length : 0;
      const arr = pushStatsHistory({
        syn_count: synapses.length,
        total_pos: totalPos,
        sat_ratio: satRatio,
        neuron_count: exp.neurons.length,
      });
      renderStatsHistory(arr);
      const pos = weights.filter(w => w > 0);
      const neg = weights.filter(w => w < 0);
      const sum = a => a.reduce((x, y) => x + y, 0);
      const meanOf = a => a.length ? sum(a) / a.length : 0;
      const lines = [];
      lines.push(`# 뉴런 / 시냅스`);
      lines.push(`  neurons:  ${exp.neurons.length}`);
      lines.push(`  synapses: ${synapses.length}`);
      // population 분포.
      const popCount = {};
      for (const n of exp.neurons) {
        const k = `${n.region || '?'}/${n.population || '?'}`;
        popCount[k] = (popCount[k] || 0) + 1;
      }
      lines.push(`  populations: ${Object.entries(popCount).map(([k, v]) => `${k}=${v}`).join(', ')}`);
      lines.push(``);
      lines.push(`# Weight 분포`);
      lines.push(`  excitatory (>0): ${pos.length}, mean=${meanOf(pos).toFixed(2)}, max=${Math.max(...pos, 0).toFixed(2)}, sum=${sum(pos).toFixed(1)}`);
      if (neg.length > 0) {
        lines.push(`  inhibitory (<0): ${neg.length}, mean=${meanOf(neg).toFixed(2)}, min=${Math.min(...neg).toFixed(2)}, sum=${sum(neg).toFixed(1)}`);
      } else {
        lines.push(`  inhibitory (<0): 0`);
      }
      // weight saturation: STDP_W_MAX=320 근처 비율.
      const saturated = pos.filter(w => w >= 250).length;
      lines.push(`  saturated (>=250): ${saturated}/${pos.length} = ${(saturated/pos.length*100).toFixed(1)}%`);
      lines.push(``);
      lines.push(`# 신경조절 (Phase 5)`);
      if (nm) {
        lines.push(`  dopamine:      ${nm.dopamine}    (STDP gain ${nm.stdp_gain})`);
        lines.push(`  acetylcholine: ${nm.acetylcholine}`);
        lines.push(`  serotonin:     ${nm.serotonin}`);
      } else {
        lines.push(`  (조회 실패)`);
      }
      if (statsOutput) statsOutput.textContent = lines.join('\n');
    });
  }

  // Phase 7 통합 데모 시나리오: 성장 + 학습 + 디코드 + 벤치마크.
  const demoLargeTrainBtn = document.getElementById('nf-demo-large-train');
  const demoStatus        = document.getElementById('nf-demo-status');
  if (demoLargeTrainBtn) {
    demoLargeTrainBtn.addEventListener('click', async () => {
      if (demoLargeTrainBtn.disabled) return;
      demoLargeTrainBtn.disabled = true;
      const orig = demoLargeTrainBtn.textContent;
      const t0 = performance.now();
      try {
        // 1) Grow.
        demoLargeTrainBtn.textContent = '1/4 회로 성장...';
        for (const region of ['V1', 'V2']) {
          for (const pop of ['L4_E', 'L23_E']) {
            const r = await backend.growRegion(region, pop, 100, { connectDensity: 0.2 });
            if (!r.ok) throw new Error(`grow ${region}/${pop} 실패: ${r.reason}`);
          }
        }
        const totalNeurons = (await backend.getTrainingSnapshot()).response?.synapses?.length || 0;
        // 2) Supervised RL 5 round (벡터화 ON).
        demoLargeTrainBtn.textContent = '2/4 학습 (벡터화)...';
        backend.setUseVectorized(true);
        const G2T = [['pointing','out_0'],['openpalm','out_1'],['thumbsup','out_2'],['victory','out_3']];
        const trainStart = performance.now();
        for (let round = 0; round < 5; round += 1) {
          for (const [g, target] of G2T) {
            const r = await backend.trainSupervised(g, target, { multiInput: true });
            if (!r.ok) throw new Error(`train ${g}→${target} 실패`);
          }
        }
        const trainMs = performance.now() - trainStart;
        // 3) Decode 검증 (단일 INPUT, no STDP).
        demoLargeTrainBtn.textContent = '3/4 디코드 검증...';
        let correct = 0;
        const SINGLE = { pointing:'in_point', openpalm:'in_palm', thumbsup:'in_thumbsup', victory:'in_victory' };
        for (const [g, target] of G2T) {
          const r = await backend.injectPattern(
            ['in_pinch','in_fist','in_palm','in_point','in_gaze','in_blink','in_thumbsup','in_victory']
              .map(n => n === SINGLE[g] ? 1.0 : 0.0),
            { modality: 'gesture' },
          );
          const out = r.response?.out_rates || {};
          const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
          if (winner === target) correct += 1;
        }
        // 4) NN vs Vec 시간 비교 (1 trial 각).
        demoLargeTrainBtn.textContent = '4/4 벤치마크...';
        backend.setUseVectorized(false);
        const nnT0 = performance.now();
        await backend.sendGestures(['pointing']);
        const nnMs = performance.now() - nnT0;
        backend.setUseVectorized(true);
        const vecT0 = performance.now();
        await backend.sendGestures(['pointing']);
        const vecMs = performance.now() - vecT0;
        const totalMs = performance.now() - t0;
        if (demoStatus) {
          demoStatus.textContent = `✓ 완료 (${(totalMs/1000).toFixed(1)}s) | 학습: ${(trainMs/1000).toFixed(1)}s × 20 trial | decode ${correct}/4 | NN ${nnMs.toFixed(0)}ms vs Vec ${vecMs.toFixed(0)}ms (${(nnMs/vecMs).toFixed(2)}x)`;
        }
        demoLargeTrainBtn.textContent = `Done ✓ (${correct}/4 decode, ${(nnMs/vecMs).toFixed(1)}x speedup)`;
      } catch (err) {
        demoLargeTrainBtn.textContent = `실패: ${err.message}`;
      }
      setTimeout(() => { demoLargeTrainBtn.textContent = orig; demoLargeTrainBtn.disabled = false; }, 5000);
    });
  }

  // Phase 7: Grow network handler.
  const growRegion     = document.getElementById('nf-grow-region');
  const growPopulation = document.getElementById('nf-grow-population');
  const growCount      = document.getElementById('nf-grow-count');
  const growBtn        = document.getElementById('nf-grow-btn');
  const growStatus     = document.getElementById('nf-grow-status');

  // Phase 7 topology save/load (D1).
  const topoSaveBtn = document.getElementById('nf-topology-save');
  const topoLoadBtn = document.getElementById('nf-topology-load');
  if (topoSaveBtn) {
    topoSaveBtn.addEventListener('click', async () => {
      topoSaveBtn.disabled = true;
      const orig = topoSaveBtn.textContent;
      topoSaveBtn.textContent = 'Exporting...';
      const exp = await backend.exportTopology();
      if (!exp.ok) {
        topoSaveBtn.textContent = `Failed: ${exp.reason || ''}`;
        setTimeout(() => { topoSaveBtn.textContent = orig; topoSaveBtn.disabled = false; }, 2000);
        return;
      }
      topoSaveBtn.textContent = 'Saving to D1...';
      const ok = await saveTopologyToD1(exp.neurons, exp.synapses, { totalNeurons: exp.neurons.length });
      topoSaveBtn.textContent = ok ? `Saved ✓ (${exp.neurons.length} neurons / ${exp.synapses.length} synapses)` : 'D1 save failed';
      setTimeout(() => { topoSaveBtn.textContent = orig; topoSaveBtn.disabled = false; }, 2500);
    });
  }
  if (topoLoadBtn) {
    topoLoadBtn.addEventListener('click', async () => {
      topoLoadBtn.disabled = true;
      const orig = topoLoadBtn.textContent;
      topoLoadBtn.textContent = 'Loading from D1...';
      const data = await loadTopologyFromD1();
      if (!data) {
        topoLoadBtn.textContent = 'No D1 snapshot';
        setTimeout(() => { topoLoadBtn.textContent = orig; topoLoadBtn.disabled = false; }, 2000);
        return;
      }
      topoLoadBtn.textContent = `Importing (${data.neurons.length} neurons)...`;
      const r = await backend.importTopology(data.neurons, data.synapses);
      if (r.ok) {
        topoLoadBtn.textContent = `Loaded ✓ (+${r.addedNeurons} neurons / +${r.addedSynapses} synapses)`;
        // Canvas 재로드.
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
          else lastFireResponse = { synapses: snap.response.synapses };
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
      } else {
        topoLoadBtn.textContent = `Import failed: ${r.reason || ''}`;
      }
      setTimeout(() => { topoLoadBtn.textContent = orig; topoLoadBtn.disabled = false; }, 3000);
    });
  }

  if (growBtn) {
    growBtn.addEventListener('click', async () => {
      if (growBtn.disabled) return;
      growBtn.disabled = true;
      const orig = growBtn.textContent;
      growBtn.textContent = 'Growing...';
      const r = await backend.growRegion(
        growRegion.value,
        growPopulation.value,
        parseInt(growCount.value, 10),
      );
      if (r.ok) {
        const j = r.response;
        // Phase 7 canvas refresh: fetch updated synapses + remount canvas (existing nodes).
        // 신규 추가 영역 NEURON_NODES 영역 영역 영역 영역 영역 안 영역, 영역 영역 영역 영역 영역.
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          if (lastFireResponse) {
            lastFireResponse.synapses = snap.response.synapses;
          } else {
            lastFireResponse = { synapses: snap.response.synapses };
          }
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') {
            mountCanvasForMode();
          }
        }
        if (growStatus) {
          growStatus.textContent = `+${j.added_neurons.length} neurons / +${j.added_synapses_count} synapses (total ${j.total_neurons}/${j.total_synapses}). Canvas refreshed.`;
        }
        growBtn.textContent = `Grew +${j.added_neurons.length} ✓`;
      } else {
        growBtn.textContent = `Failed: ${r.reason || ''}`;
      }
      setTimeout(() => { growBtn.textContent = orig; growBtn.disabled = false; }, 2500);
    });
  }

  // Phase 2 audio modality: 마이크 → FFT 32 bin → 8 bin 평균 → injectPattern.
  const audioCapture = document.getElementById('nf-audio-capture');
  const audioStream  = document.getElementById('nf-audio-stream');
  const audioStatus  = document.getElementById('nf-audio-status');

  // 마이크 1회 capture + inject (1초 평균).
  async function captureAndInjectAudio(extAnalyser, extBins) {
    let analyser = extAnalyser;
    let bins = extBins;
    let cleanup = null;
    if (!analyser) {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        return { ok: false, reason: `마이크 거부: ${err.message}` };
      }
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source   = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      bins = new Uint8Array(analyser.frequencyBinCount);
      cleanup = () => {
        stream.getTracks().forEach(t => t.stop());
        audioCtx.close();
      };
    }
    const accumulator = new Float32Array(32);
    const samples = 30;
    for (let i = 0; i < samples; i += 1) {
      analyser.getByteFrequencyData(bins);
      for (let j = 0; j < 32; j += 1) accumulator[j] += bins[j];
      await new Promise(r => setTimeout(r, 33));
    }
    if (cleanup) cleanup();
    const pattern = new Array(8).fill(0);
    for (let b = 0; b < 8; b += 1) {
      let sum = 0;
      for (let k = 0; k < 4; k += 1) sum += accumulator[b * 4 + k] / samples;
      pattern[b] = sum / 4 / 255;
    }
    const max = Math.max(...pattern);
    if (max > 0) for (let i = 0; i < 8; i += 1) pattern[i] /= max;
    const r = await backend.injectPattern(pattern, { modality: 'audio' });
    return { ok: r.ok, response: r.response, pattern };
  }

  if (audioCapture) {
    audioCapture.addEventListener('click', async () => {
      audioCapture.disabled = true;
      const orig = audioCapture.textContent;
      audioCapture.textContent = 'Capturing 1s...';
      const r = await captureAndInjectAudio();
      if (r.ok) {
        const out = r.response?.out_rates || {};
        const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
        if (audioStatus) {
          audioStatus.textContent = `pattern=[${r.pattern.map(p => p.toFixed(2)).join(',')}] → winner=${winner || '없음'}`;
        }
        audioCapture.textContent = 'Captured ✓';
      } else {
        audioCapture.textContent = `Failed: ${r.reason || ''}`;
      }
      setTimeout(() => { audioCapture.textContent = orig; audioCapture.disabled = false; }, 2000);
    });
  }

  // Streaming mode — 1초 주기 capture + inject (지속 실행).
  let audioStreamCtx = null;
  if (audioStream) {
    audioStream.addEventListener('click', async () => {
      if (audioStreamCtx) {
        // Stop.
        audioStreamCtx.running = false;
        audioStreamCtx.cleanup();
        audioStreamCtx = null;
        audioStream.textContent = 'Streaming start';
        if (audioStatus) audioStatus.textContent = 'Streaming stopped.';
        return;
      }
      // Start: 마이크 한 번만 열고 reuse.
      audioStream.disabled = true;
      audioStream.textContent = '마이크 권한...';
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        audioStream.textContent = 'Streaming start';
        if (audioStatus) audioStatus.textContent = `마이크 거부: ${err.message}`;
        audioStream.disabled = false;
        return;
      }
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source   = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      const bins = new Uint8Array(analyser.frequencyBinCount);
      audioStreamCtx = {
        running: true,
        cleanup: () => {
          stream.getTracks().forEach(t => t.stop());
          audioCtx.close();
        },
      };
      audioStream.textContent = 'Streaming stop';
      audioStream.disabled = false;
      let tick = 0;
      while (audioStreamCtx && audioStreamCtx.running) {
        tick += 1;
        const r = await captureAndInjectAudio(analyser, bins);
        if (audioStatus && r.ok) {
          const out = r.response?.out_rates || {};
          const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
          audioStatus.textContent = `[stream tick ${tick}] winner=${winner || '없음'}`;
        }
      }
    });
  }

  // Phase 2 image modality: 4×4 grid → 8-bin brightness → injectPattern.
  const imageGridEl  = document.getElementById('nf-image-grid');
  const imageInject  = document.getElementById('nf-image-inject');
  const imageClear   = document.getElementById('nf-image-clear');
  const imageStream  = document.getElementById('nf-image-stream');
  const imageStatus  = document.getElementById('nf-image-status');

  function patternFromImageCells() {
    const pattern = new Array(8).fill(0);
    for (let b = 0; b < 8; b += 1) {
      pattern[b] = (imageCells[b * 2] + imageCells[b * 2 + 1]) / 2.0;
    }
    return pattern;
  }
  const imageCells   = new Array(16).fill(0);
  if (imageGridEl) {
    for (let i = 0; i < 16; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'nf-image-cell';
      cell.dataset.idx = String(i);
      cell.addEventListener('click', () => {
        const idx = parseInt(cell.dataset.idx, 10);
        imageCells[idx] = imageCells[idx] ? 0 : 1;
        cell.classList.toggle('on', imageCells[idx] === 1);
      });
      imageGridEl.appendChild(cell);
    }
  }
  if (imageClear) {
    imageClear.addEventListener('click', () => {
      for (let i = 0; i < 16; i += 1) {
        imageCells[i] = 0;
        const cell = imageGridEl.children[i];
        if (cell) cell.classList.remove('on');
      }
      if (imageStatus) imageStatus.textContent = 'Cleared.';
    });
  }
  if (imageInject) {
    imageInject.addEventListener('click', async () => {
      const pattern = patternFromImageCells();
      const total = imageCells.reduce((a, b) => a + b, 0);
      if (total === 0) {
        if (imageStatus) imageStatus.textContent = '셀을 클릭하여 패턴 만들기.';
        return;
      }
      imageInject.disabled = true;
      const orig = imageInject.textContent;
      imageInject.textContent = 'Injecting...';
      const r = await backend.injectPattern(pattern, { modality: 'image' });
      if (r.ok) {
        const out = r.response?.out_rates || {};
        const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
        if (imageStatus) {
          imageStatus.textContent = `pattern=[${pattern.map(p => p.toFixed(2)).join(',')}] → winner=${winner || '없음'}`;
        }
        imageInject.textContent = 'Injected ✓';
      } else {
        imageInject.textContent = `Failed: ${r.reason || ''}`;
      }
      setTimeout(() => { imageInject.textContent = orig; imageInject.disabled = false; }, 2000);
    });
  }

  // Streaming mode: 1초 주기로 현재 grid 패턴 inject (사용자 실시간 toggle 지원).
  let imageStreamCtx = null;
  if (imageStream) {
    imageStream.addEventListener('click', async () => {
      if (imageStreamCtx) {
        imageStreamCtx.running = false;
        imageStreamCtx = null;
        imageStream.textContent = 'Streaming start';
        if (imageStatus) imageStatus.textContent = 'Streaming stopped.';
        return;
      }
      imageStreamCtx = { running: true };
      imageStream.textContent = 'Streaming stop';
      let tick = 0;
      while (imageStreamCtx && imageStreamCtx.running) {
        tick += 1;
        const total = imageCells.reduce((a, b) => a + b, 0);
        if (total > 0) {
          const pattern = patternFromImageCells();
          const r = await backend.injectPattern(pattern, { modality: 'image' });
          if (imageStatus && r.ok) {
            const out = r.response?.out_rates || {};
            const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
            imageStatus.textContent = `[stream tick ${tick}] cells=${total}/16 → winner=${winner || '없음'}`;
          }
        } else {
          if (imageStatus) imageStatus.textContent = `[stream tick ${tick}] grid 비어있음 — 셀 클릭`;
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    });
  }

  // PATTERN 라이브러리: 사전 정의 8-dim 패턴 1-click inject.
  const PRESET_PATTERNS = {
    uniform:  [1, 1, 1, 1, 1, 1, 1, 1],
    left:     [1, 1, 1, 1, 0, 0, 0, 0],
    right:    [0, 0, 0, 0, 1, 1, 1, 1],
    center:   [0, 0, 1, 1, 1, 1, 0, 0],
    check:    [1, 0, 1, 0, 1, 0, 1, 0],
    invcheck: [0, 1, 0, 1, 0, 1, 0, 1],
    ramp:     [0, 0.14, 0.29, 0.43, 0.57, 0.71, 0.86, 1],
    random:   null, // 클릭 시 매번 새로 생성.
  };
  const presetButtons = Array.from(document.querySelectorAll('.nf-preset-grid button[data-pattern]'));
  const presetStatus  = document.getElementById('nf-preset-status');
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const key = btn.dataset.pattern;
      const pattern = key === 'random'
        ? Array.from({ length: 8 }, () => Math.random())
        : PRESET_PATTERNS[key].slice();
      btn.disabled = true;
      const orig = btn.textContent;
      btn.textContent = '...';
      const r = await backend.injectPattern(pattern, { modality: 'custom' });
      if (r.ok) {
        const out = r.response?.out_rates || {};
        const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
        if (presetStatus) {
          presetStatus.textContent = `${key}: pattern=[${pattern.map(p => p.toFixed(2)).join(',')}] → winner=${winner || '없음'}`;
        }
        btn.textContent = '✓';
      } else {
        btn.textContent = '✗';
      }
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1200);
    });
  });

  // Phase 2 motion modality: DeviceMotionEvent → 8-bin → injectPattern.
  const motionStream = document.getElementById('nf-motion-stream');
  const motionStatus = document.getElementById('nf-motion-status');
  let motionStreamCtx = null;
  if (motionStream) {
    motionStream.addEventListener('click', async () => {
      if (motionStreamCtx) {
        motionStreamCtx.running = false;
        window.removeEventListener('devicemotion', motionStreamCtx.handler);
        motionStreamCtx = null;
        motionStream.textContent = 'Motion streaming start';
        if (motionStatus) motionStatus.textContent = 'Streaming stopped.';
        return;
      }
      // iOS 13+ 권한.
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
          const res = await DeviceMotionEvent.requestPermission();
          if (res !== 'granted') {
            if (motionStatus) motionStatus.textContent = `권한 거부: ${res}`;
            return;
          }
        } catch (err) {
          if (motionStatus) motionStatus.textContent = `권한 오류: ${err.message}`;
          return;
        }
      }
      const accumulator = new Float64Array(8);
      let samples = 0;
      const handler = (e) => {
        const a = e.acceleration || e.accelerationIncludingGravity || { x: 0, y: 0, z: 0 };
        const x = a.x || 0, y = a.y || 0, z = a.z || 0;
        const mag = Math.sqrt(x * x + y * y + z * z);
        accumulator[0] += Math.abs(x);
        accumulator[1] += Math.abs(y);
        accumulator[2] += Math.abs(z);
        accumulator[3] += x > 0 ? x : 0;
        accumulator[4] += x < 0 ? -x : 0;
        accumulator[5] += y > 0 ? y : 0;
        accumulator[6] += y < 0 ? -y : 0;
        accumulator[7] += mag;
        samples += 1;
      };
      window.addEventListener('devicemotion', handler);
      motionStreamCtx = { running: true, handler };
      motionStream.textContent = 'Motion streaming stop';
      let tick = 0;
      while (motionStreamCtx && motionStreamCtx.running) {
        await new Promise(r => setTimeout(r, 1000));
        tick += 1;
        if (samples === 0) {
          if (motionStatus) motionStatus.textContent = `[stream tick ${tick}] motion 이벤트 없음 — 데스크톱? 모바일 권장`;
          continue;
        }
        const pattern = new Array(8);
        for (let i = 0; i < 8; i += 1) pattern[i] = accumulator[i] / samples;
        const max = Math.max(...pattern);
        if (max > 0) for (let i = 0; i < 8; i += 1) pattern[i] /= max;
        // reset accumulator.
        accumulator.fill(0);
        samples = 0;
        const r = await backend.injectPattern(pattern, { modality: 'custom' });
        if (motionStatus && r.ok) {
          const out = r.response?.out_rates || {};
          const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
          motionStatus.textContent = `[stream tick ${tick}] winner=${winner || '없음'} pattern=[${pattern.map(p => p.toFixed(2)).join(',')}]`;
        }
      }
    });
  }

  // Phase 2 mouse modality: drag pad → angle 8-bin histogram.
  const mousePad     = document.getElementById('nf-mouse-pad');
  const mouseInject  = document.getElementById('nf-mouse-inject');
  const mouseClear   = document.getElementById('nf-mouse-clear');
  const mouseStatus  = document.getElementById('nf-mouse-status');
  const mouseBins    = new Array(8).fill(0);
  if (mousePad) {
    let dragging = false;
    let lastX = null, lastY = null;
    function onDown(e) {
      const r = mousePad.getBoundingClientRect();
      const x = (e.touches?.[0]?.clientX ?? e.clientX) - r.left;
      const y = (e.touches?.[0]?.clientY ?? e.clientY) - r.top;
      dragging = true;
      lastX = x; lastY = y;
      mousePad.classList.add('dragging');
      e.preventDefault?.();
    }
    function onMove(e) {
      if (!dragging) return;
      const r = mousePad.getBoundingClientRect();
      const x = (e.touches?.[0]?.clientX ?? e.clientX) - r.left;
      const y = (e.touches?.[0]?.clientY ?? e.clientY) - r.top;
      if (lastX !== null && lastY !== null) {
        const dx = x - lastX, dy = y - lastY;
        if (dx * dx + dy * dy >= 4) { // 최소 2px 이동
          let angle = Math.atan2(-dy, dx); // y 반전 (UI 좌표계)
          if (angle < 0) angle += Math.PI * 2;
          const bi = Math.min(7, Math.floor(angle / (Math.PI / 4)));
          mouseBins[bi] += 1;
          if (mouseStatus) {
            mouseStatus.textContent = `bins=[${mouseBins.join(',')}]`;
          }
          lastX = x; lastY = y;
        }
      }
      e.preventDefault?.();
    }
    function onUp() {
      dragging = false;
      lastX = null; lastY = null;
      mousePad.classList.remove('dragging');
    }
    mousePad.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    mousePad.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  }
  if (mouseClear) {
    mouseClear.addEventListener('click', () => {
      for (let i = 0; i < 8; i += 1) mouseBins[i] = 0;
      if (mouseStatus) mouseStatus.textContent = 'Reset.';
    });
  }
  function patternFromMouseBins() {
    const m = Math.max(...mouseBins);
    return mouseBins.map(b => m > 0 ? b / m : 0);
  }
  if (mouseInject) {
    mouseInject.addEventListener('click', async () => {
      const total = mouseBins.reduce((a, b) => a + b, 0);
      if (total === 0) {
        if (mouseStatus) mouseStatus.textContent = '먼저 패드를 드래그.';
        return;
      }
      const pattern = patternFromMouseBins();
      mouseInject.disabled = true;
      const orig = mouseInject.textContent;
      mouseInject.textContent = 'Injecting...';
      const r = await backend.injectPattern(pattern, { modality: 'custom' });
      if (r.ok) {
        const out = r.response?.out_rates || {};
        const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
        if (mouseStatus) {
          mouseStatus.textContent = `pattern=[${pattern.map(p => p.toFixed(2)).join(',')}] → winner=${winner || '없음'}`;
        }
        mouseInject.textContent = 'Injected ✓';
      } else {
        mouseInject.textContent = `Failed: ${r.reason || ''}`;
      }
      setTimeout(() => { mouseInject.textContent = orig; mouseInject.disabled = false; }, 2000);
    });
  }

  // MOUSE streaming 모드: 1초 주기 누적 bins inject + 자동 reset (다음 tick은 새 누적).
  const mouseStream = document.getElementById('nf-mouse-stream');
  let mouseStreamCtx = null;
  if (mouseStream) {
    mouseStream.addEventListener('click', async () => {
      if (mouseStreamCtx) {
        mouseStreamCtx.running = false;
        mouseStreamCtx = null;
        mouseStream.textContent = 'Streaming start';
        if (mouseStatus) mouseStatus.textContent = 'Streaming stopped.';
        return;
      }
      mouseStreamCtx = { running: true };
      mouseStream.textContent = 'Streaming stop';
      let tick = 0;
      while (mouseStreamCtx && mouseStreamCtx.running) {
        tick += 1;
        const total = mouseBins.reduce((a, b) => a + b, 0);
        if (total > 0) {
          const pattern = patternFromMouseBins();
          // bins reset (다음 1초에 새로 누적).
          for (let i = 0; i < 8; i += 1) mouseBins[i] = 0;
          const r = await backend.injectPattern(pattern, { modality: 'custom' });
          if (mouseStatus && r.ok) {
            const out = r.response?.out_rates || {};
            const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
            mouseStatus.textContent = `[stream tick ${tick}] motion=${total} → winner=${winner || '없음'}`;
          }
        } else {
          if (mouseStatus) mouseStatus.textContent = `[stream tick ${tick}] motion 없음 — 패드 드래그`;
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    });
  }

  // Phase 2 text modality: ASCII → 8-bin histogram → injectPattern.
  const textInput  = document.getElementById('nf-text-input');
  const textInject = document.getElementById('nf-text-inject');
  const textStream = document.getElementById('nf-text-stream');
  const textStatus = document.getElementById('nf-text-status');

  function patternFromText(txt) {
    const bins = new Array(8).fill(0);
    let count = 0;
    for (const ch of txt) {
      const code = ch.charCodeAt(0);
      if (code < 32 || code > 127) continue;
      const bi = Math.min(7, Math.floor((code - 32) / 12));
      bins[bi] += 1;
      count += 1;
    }
    if (count === 0) return null;
    const m = Math.max(...bins);
    return bins.map(b => m > 0 ? b / m : 0);
  }
  if (textInject && textInput) {
    textInject.addEventListener('click', async () => {
      const txt = textInput.value || '';
      if (!txt) {
        if (textStatus) textStatus.textContent = '입력 필요.';
        return;
      }
      const pattern = patternFromText(txt);
      if (!pattern) {
        if (textStatus) textStatus.textContent = 'ASCII 가시 문자 없음.';
        return;
      }
      textInject.disabled = true;
      const orig = textInject.textContent;
      textInject.textContent = 'Injecting...';
      const r = await backend.injectPattern(pattern, { modality: 'text' });
      if (r.ok) {
        const out = r.response?.out_rates || {};
        const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
        if (textStatus) {
          textStatus.textContent = `pattern=[${pattern.map(p => p.toFixed(2)).join(',')}] → winner=${winner || '없음'}`;
        }
        textInject.textContent = 'Injected ✓';
      } else {
        textInject.textContent = `Failed: ${r.reason || ''}`;
      }
      setTimeout(() => { textInject.textContent = orig; textInject.disabled = false; }, 2000);
    });
  }

  // Streaming mode: 입력 텍스트의 각 character를 200ms 간격으로 inject 반복.
  let textStreamCtx = null;
  if (textStream) {
    textStream.addEventListener('click', async () => {
      if (textStreamCtx) {
        textStreamCtx.running = false;
        textStreamCtx = null;
        textStream.textContent = 'Streaming start';
        if (textStatus) textStatus.textContent = 'Streaming stopped.';
        return;
      }
      const txt = textInput.value || '';
      if (!txt) {
        if (textStatus) textStatus.textContent = '입력 필요.';
        return;
      }
      textStreamCtx = { running: true };
      textStream.textContent = 'Streaming stop';
      let tick = 0;
      while (textStreamCtx && textStreamCtx.running) {
        const ch = txt[tick % txt.length];
        const pattern = patternFromText(ch);
        tick += 1;
        if (!pattern) { await new Promise(r => setTimeout(r, 200)); continue; }
        const r = await backend.injectPattern(pattern, { modality: 'text' });
        if (textStatus && r.ok) {
          const out = r.response?.out_rates || {};
          const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
          textStatus.textContent = `[stream tick ${tick}] '${ch}' → winner=${winner || '없음'}`;
        }
        await new Promise(r => setTimeout(r, 200));
      }
    });
  }

  // 최종 GUI: Multi-modal input panel.
  const mmModality = document.getElementById('nf-mm-modality');
  const mmTarget   = document.getElementById('nf-mm-target');
  const mmInject   = document.getElementById('nf-mm-inject');
  const mmTrain    = document.getElementById('nf-mm-train');
  const mmCells    = Array.from(document.querySelectorAll('.nf-mm-cell input[type="range"]'));

  function readPattern() {
    const p = new Array(8).fill(0);
    for (const input of mmCells) {
      const cell = input.closest('.nf-mm-cell');
      const idx = parseInt(cell.dataset.idx, 10);
      p[idx] = parseFloat(input.value);
    }
    return p;
  }

  if (mmInject) {
    mmInject.addEventListener('click', async () => {
      if (mmInject.disabled) return;
      mmInject.disabled = true;
      const orig = mmInject.textContent;
      mmInject.textContent = 'Injecting...';
      const pattern = readPattern();
      const r = await backend.injectPattern(pattern, {
        modality: mmModality.value,
        targetOut: mmTarget.value || undefined,
        stdp: !!mmTarget.value,
      });
      mmInject.textContent = r.ok ? 'Injected ✓' : 'Failed';
      setTimeout(() => { mmInject.textContent = orig; mmInject.disabled = false; }, 1200);
    });
  }

  // Phase 7 dataset 패널.
  const mmAddSample      = document.getElementById('nf-mm-add-sample');
  const mmClearDataset   = document.getElementById('nf-mm-clear-dataset');
  const mmSaveDs         = document.getElementById('nf-mm-save-ds');
  const mmLoadDs         = document.getElementById('nf-mm-load-ds');
  const mmTrainBatch     = document.getElementById('nf-mm-train-batch');
  const mmStatus         = document.getElementById('nf-mm-status');
  const dataset          = [];
  function updateMmStatus(extra) {
    if (mmStatus) {
      mmStatus.textContent = `Dataset: ${dataset.length} samples${extra ? ' | ' + extra : ''}`;
    }
  }
  if (mmAddSample) {
    mmAddSample.addEventListener('click', () => {
      const target = mmTarget.value;
      if (!target) {
        updateMmStatus('target 필요');
        return;
      }
      dataset.push({
        pattern: readPattern(),
        target_out: target,
        modality: mmModality.value,
      });
      updateMmStatus(`+ ${target}`);
    });
  }
  if (mmClearDataset) {
    mmClearDataset.addEventListener('click', () => {
      dataset.length = 0;
      updateMmStatus('cleared');
    });
  }
  if (mmSaveDs) {
    mmSaveDs.addEventListener('click', async () => {
      if (dataset.length === 0) { updateMmStatus('비어있음'); return; }
      mmSaveDs.disabled = true;
      const ok = await saveDatasetToD1(dataset);
      mmSaveDs.disabled = false;
      updateMmStatus(ok ? `Saved ${dataset.length} → D1` : 'D1 저장 실패');
    });
  }
  if (mmLoadDs) {
    mmLoadDs.addEventListener('click', async () => {
      mmLoadDs.disabled = true;
      const data = await loadDatasetFromD1();
      mmLoadDs.disabled = false;
      if (!data) { updateMmStatus('D1 비어있음'); return; }
      dataset.length = 0;
      for (const s of data.samples) dataset.push(s);
      updateMmStatus(`Loaded ${dataset.length} ← D1`);
    });
  }
  if (mmTrainBatch) {
    mmTrainBatch.addEventListener('click', async () => {
      if (dataset.length === 0) { updateMmStatus('Dataset 비어있음 - 먼저 추가'); return; }
      mmTrainBatch.disabled = true;
      const orig = mmTrainBatch.textContent;
      const N_ROUNDS = 5;
      for (let round = 1; round <= N_ROUNDS; round += 1) {
        for (let i = 0; i < dataset.length; i += 1) {
          mmTrainBatch.textContent = `Round ${round}/${N_ROUNDS} sample ${i+1}/${dataset.length}`;
          const s = dataset[i];
          const r = await backend.injectPattern(s.pattern, {
            modality: s.modality || 'custom',
            targetOut: s.target_out,
            stdp: true,
          });
          if (!r.ok) {
            mmTrainBatch.textContent = `Failed: ${r.reason || ''}`;
            mmTrainBatch.disabled = false;
            return;
          }
        }
      }
      mmTrainBatch.textContent = `Batch done ✓ (${N_ROUNDS} round × ${dataset.length})`;
      await saveTrainingState();
      setTimeout(() => { mmTrainBatch.textContent = orig; mmTrainBatch.disabled = false; }, 2500);
    });
  }
  updateMmStatus();

  if (mmTrain) {
    mmTrain.addEventListener('click', async () => {
      if (mmTrain.disabled) return;
      const target = mmTarget.value;
      if (!target) {
        const orig = mmTrain.textContent;
        mmTrain.textContent = 'Need target';
        setTimeout(() => { mmTrain.textContent = orig; }, 1500);
        return;
      }
      mmTrain.disabled = true;
      const orig = mmTrain.textContent;
      const pattern = readPattern();
      for (let i = 1; i <= 10; i += 1) {
        mmTrain.textContent = `Training (${i}/10)`;
        const r = await backend.injectPattern(pattern, {
          modality: mmModality.value,
          targetOut: target,
          stdp: true,
        });
        if (!r.ok) {
          mmTrain.textContent = 'Failed';
          mmTrain.disabled = false;
          return;
        }
      }
      await saveTrainingState();
      mmTrain.textContent = 'Trained ✓';
      setTimeout(() => { mmTrain.textContent = orig; mmTrain.disabled = false; }, 2000);
    });
  }

  // Decode panel 영역 listen — 모든 backend train/induce response 영역 OUT rate 영역 갱신.
  backend.onEvent((evt) => {
    const r = evt?.response;
    if (!r) return;
    // out_rates field (handface_train_supervised) 영역 우선, 영역 rates field 영역 폴백.
    if (r.out_rates) {
      updateDecodePanel(r.out_rates);
      return;
    }
    if (r.rates) {
      const out = {};
      for (const k of ['out_0','out_1','out_2','out_3']) {
        out[k] = r.rates[k] ?? 0;
      }
      updateDecodePanel(out);
    }
  });
});

// Session 36 정정: 단일 gesture click → 단일 INPUT 영역만 active 영역 정합.
// 직전 induceFireMulti(8 INPUT) 영역 영역 (사용자 본 의도 mismatch).
// V1/V2/OUT cascade fire 영역 영역 = 8 INPUTS (Cascade) button (settings panel) 영역 D80 anchor pattern 영역.
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
    // Session 36: camera permission lazy init — 사용자 보안/법규 정합 (Camera 노드 click 영역만 request).
    // control.start() 영역 0 (autoStart 시점 영역 camera permission 영역 영역 0).

    // SNN viz mount (control.start 영역 0 영역 hand landmark 영역 영역 영역 영역, 사용자 영역 영역 영역).
    initSnnViz({ control, backend });

    const initResult = await backend.initialize();
    if (!initResult.ok) {
      console.error(`[neuronface] init failed: ${initResult.reason}`);
    }

    // camera 영역 영역 = 사용자 명시 (Camera 노드 click 영역 enableCamera 호출).
    // 본 영역 영역 0 → cam-preview srcObject 영역 0 → ASCII / hand skeleton placeholder visible.

    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') {
        control.recalibrate();
      }
    });
  } catch (err) {
    console.error('[handface] autoStart failed:', err);
  }
}

// ─── Session 33 drawflow PoC + Session 34 neuron mode: canvas handler ───
const canvasToggleBtn     = document.getElementById('nf-canvas-toggle');
const canvasModeRegionBtn = document.getElementById('nf-canvas-mode-region');
const canvasModeNeuronBtn = document.getElementById('nf-canvas-mode-neuron');
const canvasContainer     = document.getElementById('nf-snn-canvas');

let canvasShown = false;             // canvas 표시 여부
let canvasMode  = 'region';          // 'region' | 'neuron'
let lastFireResponse = null;

function applyFireToCanvas() {
  if (!canvasShown || !lastFireResponse) return;
  if (canvasMode === 'region' && lastFireResponse.active_neurons_by_region) {
    updateCanvasFire(lastFireResponse.active_neurons_by_region);
  } else if (canvasMode === 'neuron' && lastFireResponse.rates) {
    updateCanvasFireNeuron(lastFireResponse.rates);
  }
}

// Session 37 Phase 7: synapse 리스트에서 grown 뉴런 이름 추출 → 시각화 노드로 변환.
// preset NEURON_NODES에 없는 이름이면 grown으로 간주.
const PRESET_NEURON_NAMES = new Set([
  'in_pinch','in_fist','in_palm','in_point','in_gaze','in_blink','in_thumbsup','in_victory',
  'src_camera','src_gesture',
  ...Array.from({length:10}, (_,i)=>`v1_L4_E_${i}`),
  ...Array.from({length:4},  (_,i)=>`v1_L4_I_${i}`),
  ...Array.from({length:6},  (_,i)=>`v1_L23_E_${i}`),
  ...Array.from({length:10}, (_,i)=>`v2_L4_E_${i}`),
  ...Array.from({length:6},  (_,i)=>`v2_L23_E_${i}`),
  ...Array.from({length:4},  (_,i)=>`v2_L5_E_${i}`),
  'out_0','out_1','out_2','out_3',
]);

function buildDynamicNeuronsFromSynapses(synapses) {
  if (!Array.isArray(synapses) || synapses.length === 0) return [];
  const names = new Set();
  for (const s of synapses) {
    if (s.pre && !PRESET_NEURON_NAMES.has(s.pre)) names.add(s.pre);
    if (s.post && !PRESET_NEURON_NAMES.has(s.post)) names.add(s.post);
  }
  // population별 stack 카운터.
  const stackCounters = {};
  const result = [];
  for (const name of Array.from(names).sort()) {
    // 이름 prefix → region 추론.
    let region = null;
    if (name.startsWith('v1_')) region = 'V1';
    else if (name.startsWith('v2_')) region = 'V2';
    if (!region) continue;
    // population key (예: "v1_L4_E").
    const popKey = name.match(/^(v[12]_[^_]+_[EI])_/)?.[1];
    if (!popKey) continue;
    const sc = stackCounters[popKey] || 0;
    stackCounters[popKey] = sc + 1;
    const node = buildGrownNeuronNode({ name, region }, sc);
    if (node) result.push(node);
  }
  return result;
}

function mountCanvasForMode() {
  if (canvasMode === 'region') {
    initCanvas('nf-snn-canvas');
  } else {
    // Session 36: synapses fallback chain (lastFireResponse → state.synapses → []).
    const synapses = lastFireResponse?.synapses
      || (Array.isArray(state.synapses) ? state.synapses : [])
      || [];
    // Phase 7: synapse 리스트에서 grown 뉴런 추출 + 시각화.
    const dynamicNeurons = buildDynamicNeuronsFromSynapses(synapses);
    initCanvasNeuron('nf-snn-canvas', synapses, dynamicNeurons);
  }
  applyFireToCanvas();
}

function toggleCanvasView() {
  canvasShown = !canvasShown;
  const snnFlowContainer = document.querySelector('.snn-flow');

  if (canvasShown) {
    if (snnFlowContainer) snnFlowContainer.style.display = 'none';
    canvasContainer?.classList.add('snn-canvas--visible');
    mountCanvasForMode();
  } else {
    destroyCanvas();
    canvasContainer?.classList.remove('snn-canvas--visible');
    if (snnFlowContainer) snnFlowContainer.style.display = '';
  }
}

function switchCanvasMode(newMode) {
  if (newMode === canvasMode) return;
  canvasMode = newMode;
  canvasModeRegionBtn?.classList.toggle('active', newMode === 'region');
  canvasModeNeuronBtn?.classList.toggle('active', newMode === 'neuron');
  if (canvasShown) {
    mountCanvasForMode();
  }
}

if (canvasToggleBtn)     canvasToggleBtn.addEventListener('click', toggleCanvasView);
if (canvasModeRegionBtn) canvasModeRegionBtn.addEventListener('click', () => switchCanvasMode('region'));
if (canvasModeNeuronBtn) canvasModeNeuronBtn.addEventListener('click', () => switchCanvasMode('neuron'));

window.addEventListener('snn-viz:fire-update', (e) => {
  const r = e.detail?.response || window.__lastFireResponse || state.lastFireResponse || {};
  lastFireResponse = r;
  applyFireToCanvas();
});

// Session 36: canvas auto-mount on load (default neuron mode, ComfyUI/Weavy 정합 노드 에디터).
// backend connection-status event 통과 후 state.synapses 영역 영역 영역 영역 영역 mount → 시냅스 line 영역 표시 영역.
function autoMountCanvas() {
  canvasShown = true;
  canvasMode = 'neuron';
  canvasModeRegionBtn?.classList.toggle('active', false);
  canvasModeNeuronBtn?.classList.toggle('active', true);
  canvasContainer?.classList.add('snn-canvas--visible');
  mountCanvasForMode();
  // default = Normal (view-only, node drag 차단 + empty drag pan 영역만).
  setEditorMode('view');
  const modeNormalBtn = document.getElementById('nf-mode-normal');
  const modeEditBtn = document.getElementById('nf-mode-edit');
  modeNormalBtn?.classList.add('active');
  modeEditBtn?.classList.remove('active');

  // Session 36: 자동 학습 영역 영역 (사용자 catch 정합 — 영역 노드 활성화 영역 0).
  // 학습 영역 영역 = "Train Cascade" button (settings panel 영역 ⚙ click 영역 영역) 영역 영역 영역.
  // setTimeout(autoTrainCascade, 800);
}

let autoTrainStarted = false;
async function autoTrainCascade() {
  if (autoTrainStarted) return;
  autoTrainStarted = true;
  const trainBtn = document.getElementById('nf-train-cascade');
  const TRAIN_8 = [
    'in_pinch', 'in_fist', 'in_palm', 'in_point',
    'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory',
  ];
  console.info('[neuronface] auto-train cascade — 10 induce + STDP on pair');
  backend.setStdpEnabled(true);
  backend.setStdpMode('pair');
  for (let i = 1; i <= 10; i += 1) {
    if (trainBtn) {
      trainBtn.disabled = true;
      trainBtn.textContent = `Auto-training... (${i}/10)`;
    }
    try {
      await backend.induceFireMulti(TRAIN_8);
    } catch (err) {
      console.warn('[neuronface] auto-train induce failed:', err);
      break;
    }
  }
  if (trainBtn) {
    trainBtn.textContent = 'Trained ✓ (재학습 click)';
    trainBtn.disabled = false;
  }
  console.info('[neuronface] auto-train cascade complete');
}

let canvasAutoMounted = false;
async function autoMountWhenReady() {
  if (canvasAutoMounted) return;
  if (Array.isArray(state.synapses) && state.synapses.length > 0) {
    canvasAutoMounted = true;
    // Session 36: backend ready 통과 직후 학습 결과 자동 복원 (localStorage → backend).
    await loadTrainingState();
    autoMountCanvas();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // backend ready 영역 영역만 영역 mount (state.synapses 영역 영역 영역).
  const interval = setInterval(() => {
    autoMountWhenReady();
    if (canvasAutoMounted) clearInterval(interval);
  }, 200);
  // fallback (10초 영역 backend ready 0 영역 → empty state 영역 영역, canvas mount 0).
  setTimeout(() => {
    if (!canvasAutoMounted) {
      clearInterval(interval);
      showCanvasEmptyState();
    }
  }, 10000);
});

function showCanvasEmptyState() {
  const container = document.getElementById('nf-snn-canvas');
  if (!container || canvasAutoMounted) return;
  container.classList.add('snn-canvas--visible');
  container.innerHTML = `
    <div class="snn-canvas-empty">
      <div class="snn-canvas-empty-icon">⚙</div>
      <div class="snn-canvas-empty-title">NeuronFace 미연결</div>
      <div class="snn-canvas-empty-hint">좌측 ⚙ 영역 endpoint + API key 영역 영역 → Save / Test 통과 영역 canvas 영역.</div>
    </div>
  `;
}

// Session 36: source-mounted event handler → drawflow Camera + Gesture 노드 영역 ASCII + hand skeleton mount.
let cameraNodeMounted = false;
let handNodeMounted = false;

// Session 36: 사용자 명시 camera permission request (lazy init, 보안/법규 정합).
let cameraEnabled = false;
let cameraEnabling = false;

async function enableCamera() {
  if (cameraEnabled || cameraEnabling) return;
  cameraEnabling = true;
  try {
    await control.start();
    const camPreview = document.getElementById('cam-preview');
    if (control.mediaStream && camPreview) {
      camPreview.srcObject = control.mediaStream;
      try { await camPreview.play(); } catch (e) {
        console.warn('[handface] cam-preview play() rejected:', e?.message ?? e);
      }
      cameraEnabled = true;
      cameraNodeMounted = false;
      handNodeMounted = false;
      tryMountAsciiCamera();
      tryMountHand();
    }
  } catch (err) {
    console.error('[handface] enableCamera failed:', err);
  } finally {
    cameraEnabling = false;
  }
}

function disableCamera() {
  if (!cameraEnabled) return;
  // mediaStream tracks stop → 카메라 LED off.
  try {
    if (control.mediaStream) {
      control.mediaStream.getTracks().forEach((t) => { try { t.stop(); } catch (_) { /* noop */ } });
    }
    if (typeof control.stop === 'function') {
      try { control.stop(); } catch (_) { /* noop */ }
    }
  } catch (err) {
    console.warn('[handface] disableCamera tracks stop failed:', err);
  }
  const camPreview = document.getElementById('cam-preview');
  if (camPreview) {
    try { camPreview.pause(); } catch (_) { /* noop */ }
    camPreview.srcObject = null;
  }
  // Camera/Gesture mount container 영역 placeholder restore.
  const cameraMountEl  = document.getElementById('snn-canvas-camera-mount');
  const gestureMountEl = document.getElementById('snn-canvas-gesture-mount');
  if (cameraMountEl) {
    cameraMountEl.innerHTML = `
      <div class="snn-canvas-source-empty">
        <div>Camera disabled</div>
        <div class="snn-canvas-source-empty-hint">Enable from left sidebar</div>
      </div>
    `;
  }
  if (gestureMountEl) {
    gestureMountEl.innerHTML = `
      <div class="snn-canvas-source-empty">
        <div>Hand detection disabled</div>
        <div class="snn-canvas-source-empty-hint">Enable camera first</div>
      </div>
    `;
  }
  cameraEnabled = false;
  cameraNodeMounted = false;
  handNodeMounted = false;
}

// Session 36 정정: Camera/Gesture 노드 click handler 영역 (drawflow 'view' mode preventDefault catch).
// 사용자 영역 = sidebar 📷 button 영역 enableCamera 호출 (가장 안전 영역).

function tryMountAsciiCamera() {
  if (cameraNodeMounted) return;
  const cameraMountEl = document.getElementById('snn-canvas-camera-mount');
  const camPreview = document.getElementById('cam-preview');
  if (cameraMountEl && camPreview && camPreview.srcObject) {
    cameraMountEl.innerHTML = ''; // placeholder ("no camera") 영역.
    initAsciiCamera({ videoEl: camPreview, mountEl: cameraMountEl });
    cameraNodeMounted = true;
  }
}

function tryMountHand() {
  if (handNodeMounted) return;
  const gestureMountEl = document.getElementById('snn-canvas-gesture-mount');
  const camPreview = document.getElementById('cam-preview');
  // hand skeleton mount 영역 = camera mediaStream ready 영역만 (mediapipe hand detection 영역 영역).
  if (gestureMountEl && camPreview && camPreview.srcObject) {
    gestureMountEl.innerHTML = ''; // placeholder ("no hand detected") 영역.
    mountHand(gestureMountEl);
    handNodeMounted = true;
  }
}

window.addEventListener('snn-canvas:source-mounted', () => {
  tryMountAsciiCamera();
  tryMountHand();
  // 영역 0 영역 (cam-preview srcObject 영역 영역 영역 영역 등) → retry polling.
  if (!cameraNodeMounted || !handNodeMounted) {
    const retryInterval = setInterval(() => {
      tryMountAsciiCamera();
      tryMountHand();
      if (cameraNodeMounted && handNodeMounted) clearInterval(retryInterval);
    }, 300);
    setTimeout(() => clearInterval(retryInterval), 15000);
  }
});

// Session 36: header zoom control (− / input / + / reset).
window.addEventListener('DOMContentLoaded', () => {
  const zoomInput = document.getElementById('nf-zoom-value');
  const zoomInBtn = document.getElementById('nf-zoom-in');
  const zoomOutBtn = document.getElementById('nf-zoom-out');
  const zoomResetBtn = document.getElementById('nf-zoom-reset');

  function syncInput() {
    if (!zoomInput) return;
    const pct = Math.round(getCanvasZoom() * 100);
    zoomInput.value = String(pct);
  }

  zoomInput?.addEventListener('change', () => {
    const pct = parseFloat(zoomInput.value);
    if (Number.isFinite(pct)) {
      setCanvasZoom(pct / 100);
      syncInput();
    }
  });
  zoomInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      zoomInput.blur();
    }
  });

  zoomInBtn?.addEventListener('click', () => {
    setCanvasZoom(getCanvasZoom() + 0.1);
    syncInput();
  });
  zoomOutBtn?.addEventListener('click', () => {
    setCanvasZoom(getCanvasZoom() - 0.1);
    syncInput();
  });
  zoomResetBtn?.addEventListener('click', () => {
    // ⟳ = fit-to-view (모든 노드 bbox 영역 영역 자동 zoom + center pan).
    fitCanvasToNodes(0.9);
    syncInput();
  });

  // drawflow native wheel zoom + setCanvasZoom 영역 zoom-changed event 영역 → input 영역 갱신.
  window.addEventListener('snn-canvas:zoom-changed', syncInput);
});

// Session 36: sidebar 영역 (camera + edit + ⚙) click handler.
window.addEventListener('DOMContentLoaded', () => {
  // ⚙ → settings panel toggle.
  const sidebarSettingsBtn = document.getElementById('nf-sidebar-settings');
  const settingsPanel = document.getElementById('neuronface-settings');
  if (sidebarSettingsBtn && settingsPanel) {
    sidebarSettingsBtn.addEventListener('click', () => {
      settingsPanel.classList.toggle('open');
      sidebarSettingsBtn.classList.toggle('active', settingsPanel.classList.contains('open'));
    });
  }

  // 📷 → enableCamera / disableCamera 토글.
  const sidebarCameraBtn = document.getElementById('nf-sidebar-camera');
  if (sidebarCameraBtn) {
    sidebarCameraBtn.addEventListener('click', async () => {
      if (cameraEnabling) return;
      sidebarCameraBtn.disabled = true;
      if (cameraEnabled) {
        disableCamera();
        sidebarCameraBtn.classList.remove('active');
        sidebarCameraBtn.title = 'Enable camera';
      } else {
        await enableCamera();
        if (cameraEnabled) {
          sidebarCameraBtn.classList.add('active');
          sidebarCameraBtn.title = 'Disable camera';
        }
      }
      sidebarCameraBtn.disabled = false;
    });
  }

  // ✎ → editor mode toggle (view ↔ edit).
  const sidebarEditBtn = document.getElementById('nf-sidebar-edit');
  if (sidebarEditBtn) {
    let editMode = false;
    sidebarEditBtn.addEventListener('click', () => {
      editMode = !editMode;
      setEditorMode(editMode ? 'edit' : 'view');
      sidebarEditBtn.classList.toggle('active', editMode);
      sidebarEditBtn.title = editMode ? 'Edit mode (drag nodes)' : 'Toggle edit mode';
    });
  }
});

autoStart();
