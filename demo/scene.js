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

function mountCanvasForMode() {
  if (canvasMode === 'region') {
    initCanvas('nf-snn-canvas');
  } else {
    // Session 36: synapses fallback chain (lastFireResponse → state.synapses → []).
    // backend connection-status event (snn-viz/index.js:77-78) 영역 state.synapses 갱신 통과 영역 영역.
    const synapses = lastFireResponse?.synapses
      || (Array.isArray(state.synapses) ? state.synapses : [])
      || [];
    initCanvasNeuron('nf-snn-canvas', synapses);
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
        <svg class="snn-canvas-source-empty-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        <div>Camera disabled</div>
        <div class="snn-canvas-source-empty-hint">Enable from left sidebar</div>
      </div>
    `;
  }
  if (gestureMountEl) {
    gestureMountEl.innerHTML = `
      <div class="snn-canvas-source-empty">
        <svg class="snn-canvas-source-empty-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
        </svg>
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
