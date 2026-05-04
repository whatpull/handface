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
import { state, loadPositions } from './snn-viz/state.js';
// Session 39: 저장된 노드 위치 (사용자 드래그 결과) 즉시 로드 — 모듈 import 시점.
loadPositions();

// ────────────────────────────────────────────────────────
// Session 39: 통합 dialog helpers — alert/confirm/prompt 대체 + node input.
// 다크 테마 정합 + 모바일 친화 큰 widget. Promise 기반.
// ────────────────────────────────────────────────────────
function getDialogEls() {
  return {
    root: document.getElementById('nf-dialog'),
    title: document.getElementById('nf-dialog-title'),
    body: document.getElementById('nf-dialog-body'),
    actions: document.getElementById('nf-dialog-actions'),
    closeBtn: document.getElementById('nf-dialog-close'),
  };
}
function closeDialog() {
  const els = getDialogEls();
  if (els.root) els.root.classList.remove('open');
}
function openDialog({ title, bodyHTML, buttons }) {
  const els = getDialogEls();
  if (!els.root) return Promise.resolve(null);
  els.title.textContent = title || '';
  els.body.innerHTML = bodyHTML || '';
  els.actions.innerHTML = '';
  return new Promise((resolve) => {
    let resolved = false;
    const finalize = (v) => {
      if (resolved) return;
      resolved = true;
      closeDialog();
      resolve(v);
    };
    (buttons || []).forEach(b => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = b.label;
      btn.className = `nf-dialog-btn nf-dialog-btn--${b.kind || 'primary'}`;
      btn.addEventListener('click', async () => {
        const result = b.onClick ? await b.onClick(els) : b.value;
        if (result !== undefined) finalize(result);
        else if (b.value !== undefined) finalize(b.value);
        else finalize(null);
      });
      els.actions.appendChild(btn);
    });
    els.closeBtn.onclick = () => finalize(null);
    els.root.querySelector('.nf-dialog-backdrop').onclick = () => finalize(null);
    els.root.classList.add('open');
    // Auto-focus first input.
    setTimeout(() => {
      const firstInput = els.body.querySelector('input, textarea');
      if (firstInput) firstInput.focus();
    }, 50);
  });
}
function dialogAlert(message, title = '알림') {
  return openDialog({
    title,
    bodyHTML: `<p>${message}</p>`,
    buttons: [{ label: '확인', kind: 'primary', value: true }],
  });
}
function dialogConfirm(message, title = '확인') {
  return openDialog({
    title,
    bodyHTML: `<p>${message}</p>`,
    buttons: [
      { label: '취소', kind: 'cancel', value: false },
      { label: '확인', kind: 'primary', value: true },
    ],
  });
}
function dialogPrompt(message, defaultValue = '', title = '입력', placeholder = '') {
  const inputId = 'nf-dialog-prompt-input';
  return openDialog({
    title,
    bodyHTML: `<p>${message}</p><input id="${inputId}" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${(defaultValue || '').replace(/"/g, '&quot;')}" placeholder="${placeholder}" />`,
    buttons: [
      { label: '취소', kind: 'cancel', value: null },
      { label: '확인', kind: 'primary', onClick: () => {
        const el = document.getElementById(inputId);
        return el ? el.value : null;
      }},
    ],
  });
}
// Expose to window for global use (action callbacks 등에서 활용).
window.dialogAlert = dialogAlert;
window.dialogConfirm = dialogConfirm;
window.dialogPrompt = dialogPrompt;
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
  buildUserInputNode,
  buildUserOutputNode,
  updateCanvasFire,
  updateCanvasFireNeuron,
  destroyCanvas,
  setEditorMode,
  setCanvasZoom,
  getCanvasZoom,
  fitCanvasToNodes,
  flashWeightDelta,
  autoLayoutByRegion,
} from './snn-viz/canvas/index.js';
import './snn-viz/canvas/style.css';

// ─────────────────────────────────────────
// Neural backend — NeuronFace (real HTTP)
// ─────────────────────────────────────────
function createBackend() {
  const { apiKey, endpoint } = loadNeuronFaceSettings();
  const b = new NeuronFaceBackend({ apiKey, endpoint });
  // Session 40+: 모든 user_in inject 시점에 source nodeId 기록 — action callback 이
  // {text} 치환 / console message 출력 시 "마지막 inject 가 text-kind 였는지" 판정에 사용.
  const _wrapInject = (fnName) => {
    if (typeof b[fnName] !== 'function') return;
    const orig = b[fnName].bind(b);
    b[fnName] = (name, ...rest) => {
      if (typeof name === 'string') window.__lastInjectNodeId = name;
      return orig(name, ...rest);
    };
  };
  _wrapInject('injectUserInputPattern');
  _wrapInject('injectUserInput');
  // Session 38 PR-K: canvas inline widget delegated handler 가 참조.
  window.__neuronfaceBackend = b;
  return b;
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

// Session 42+ Tier3-G: Circuit Marketplace — D1 shared_circuits CRUD.
// 사용자가 회로(neurons + synapses)를 owner 식별자로 publish, 다른 사용자가 list/fetch 로 import.
async function publishCircuitToD1({ owner, name, description, neurons, synapses, meta, isPublic = true }) {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/circuits`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ owner, name, description, neurons, synapses, meta, public: isPublic }),
    });
    const data = await r.json();
    if (!r.ok) return { ok: false, reason: data.error || `${r.status}` };
    return { ok: true, ...data };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}

async function listSharedCircuits({ owner = null, limit = 50, offset = 0 } = {}) {
  try {
    const params = new URLSearchParams();
    if (owner) params.set('owner', owner);
    params.set('limit', String(limit));
    params.set('offset', String(offset));
    const r = await fetch(`${D1_WORKER_ENDPOINT}/circuits?${params}`);
    const data = await r.json();
    if (!r.ok) return { ok: false, reason: data.error || `${r.status}` };
    return { ok: true, ...data };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}

async function fetchSharedCircuit(circuitId) {
  try {
    const r = await fetch(`${D1_WORKER_ENDPOINT}/circuits/${encodeURIComponent(circuitId)}`);
    const data = await r.json();
    if (!r.ok) return { ok: false, reason: data.error || `${r.status}` };
    return { ok: true, ...data };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}

async function deleteSharedCircuit(circuitId, owner) {
  try {
    const r = await fetch(
      `${D1_WORKER_ENDPOINT}/circuits/${encodeURIComponent(circuitId)}?owner=${encodeURIComponent(owner)}`,
      { method: 'DELETE' }
    );
    const data = await r.json();
    if (!r.ok) return { ok: false, reason: data.error || `${r.status}` };
    return { ok: true, ...data };
  } catch (err) {
    return { ok: false, reason: err.message };
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
    // 대시보드 자동 갱신.
    if (window.__nfRefreshDashboard) window.__nfRefreshDashboard().catch(() => {});
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
// Phase 208: 모바일 URL bar dynamic visibility 대응.
// 100vh 가 URL bar 보이는 상태에서 화면보다 길어 잘리는 흔한 모바일 버그.
// 1차 해결: CSS 100dvh (modern browser 자동).
// 2차 fallback: window.visualViewport API → --app-vh custom property 갱신.
// fitCanvasToNodes 도 visualViewport.height 우선 사용.
(function setupViewportHeightSync() {
  const updateVh = () => {
    let h = window.innerHeight;
    // visualViewport 있으면 (모바일 URL bar 변동 정확) 사용.
    if (window.visualViewport && window.visualViewport.height) {
      h = window.visualViewport.height;
    }
    document.documentElement.style.setProperty('--app-vh', `${h * 0.01}px`);
    // 캔버스 fit 재계산 트리거 (URL bar 변동 시 노드 중앙 재정렬).
    window.dispatchEvent(new CustomEvent('snn-canvas:viewport-changed', {
      detail: { height: h },
    }));
  };
  updateVh();
  window.addEventListener('resize', updateVh, { passive: true });
  window.addEventListener('orientationchange', updateVh);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateVh, { passive: true });
    window.visualViewport.addEventListener('scroll', updateVh, { passive: true });
  }
})();

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
  const decodeSparkline = document.getElementById('nf-decode-sparkline');
  let decodeHeadlinePrev = '';
  // Region 활성도 mini bar 갱신 (대시보드).
  function updateRegionBars(ratesByRegion) {
    if (!ratesByRegion) return;
    const regions = ['INPUT', 'V1', 'V2', 'OUT'];
    const max = Math.max(...regions.map(r => ratesByRegion[r] ?? 0), 1);
    for (const r of regions) {
      const v = ratesByRegion[r] ?? 0;
      const fill = document.getElementById(`nf-region-bar-${r}`);
      const val = document.getElementById(`nf-region-val-${r}`);
      if (fill) fill.style.width = `${(v / max * 100).toFixed(0)}%`;
      if (val) val.textContent = `${v.toFixed(1)} Hz`;
    }
  }

  // OUT 발화율 history buffer (max 30 entries).
  const OUT_RATE_HISTORY_MAX = 30;
  const outRateHistory = { out_0: [], out_1: [], out_2: [], out_3: [] };
  const OUT_COLORS = { out_0: '#5eead4', out_1: '#f5b842', out_2: '#a78bfa', out_3: '#fb7185' };

  function pushOutRateHistory(outRates) {
    for (const k of ['out_0','out_1','out_2','out_3']) {
      const v = outRates[k] ?? 0;
      outRateHistory[k].push(v);
      if (outRateHistory[k].length > OUT_RATE_HISTORY_MAX) outRateHistory[k].shift();
    }
  }

  function renderOutRateSparkline() {
    if (!decodeSparkline) return;
    const N = outRateHistory.out_0.length;
    if (N < 2) {
      decodeSparkline.innerHTML = '<text x="100" y="32" font-size="9" font-family="monospace" fill="#94a3b8" text-anchor="middle">history (entries: ' + N + ')</text>';
      return;
    }
    const w = 200, h = 60, padTop = 6, padBot = 12, padX = 4;
    const drawW = w - padX * 2;
    const drawH = h - padTop - padBot;
    const allMax = Math.max(
      ...outRateHistory.out_0, ...outRateHistory.out_1,
      ...outRateHistory.out_2, ...outRateHistory.out_3, 1,
    );
    const parts = [];
    for (const k of ['out_0','out_1','out_2','out_3']) {
      const arr = outRateHistory[k];
      const points = arr.map((v, i) => {
        const x = padX + (i / (N - 1)) * drawW;
        const y = padTop + drawH - (v / allMax) * drawH;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      parts.push(`<polyline points="${points.join(' ')}" fill="none" stroke="${OUT_COLORS[k]}" stroke-width="1.2"/>`);
      // 라벨.
      const last = arr[arr.length - 1];
      const ly = padTop + drawH - (last / allMax) * drawH;
      parts.push(`<text x="${w - padX}" y="${ly + 2.5}" font-size="6" font-family="monospace" fill="${OUT_COLORS[k]}" text-anchor="end">${k.slice(-1)}</text>`);
    }
    parts.push(`<text x="${padX}" y="${h - 3}" font-size="6" font-family="monospace" fill="#94a3b8">${N} entries (max ${allMax.toFixed(0)} Hz)</text>`);
    decodeSparkline.innerHTML = parts.join('');
  }
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
    // OUT 발화율 history 누적 + sparkline.
    pushOutRateHistory(outRates);
    renderOutRateSparkline();
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

  // 신경조절 인디케이터 dots.
  const nmIndicator = document.getElementById('nf-neuromod-indicator');
  function updateNeuromodIndicator(d, a, s) {
    if (!nmIndicator) return;
    const dots = nmIndicator.querySelectorAll('.nf-nm-dot');
    dots.forEach(dot => {
      const k = dot.dataset.nm;
      const v = k === 'dopamine' ? d : k === 'ach' ? a : s;
      dot.classList.toggle('active', Math.abs(v) >= 0.1);
    });
    const state = nmIndicator.querySelector('.nf-nm-state');
    if (state) {
      const labels = [];
      if (d >= 0.1) labels.push(`D${d.toFixed(1)}`);
      if (a >= 0.1) labels.push(`A${a.toFixed(1)}`);
      if (s >= 0.1) labels.push(`S${s.toFixed(1)}`);
      state.textContent = labels.length ? labels.join(' · ') : '중립 (anchor)';
    }
  }

  let nmDebounce = null;
  function flushNeuromodulator() {
    if (nmDebounce) clearTimeout(nmDebounce);
    nmDebounce = setTimeout(async () => {
      const mods = {
        dopamine:      parseFloat(nmDopamine.value),
        acetylcholine: parseFloat(nmAch.value),
        serotonin:     parseFloat(nmSero.value),
      };
      updateNeuromodIndicator(mods.dopamine, mods.acetylcholine, mods.serotonin);
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

  // Day cycle 시뮬레이션: 30초 sine wave로 dopamine/ACh/serotonin 변화 + 자동 inject.
  const nmCycle = document.getElementById('nf-nm-cycle');
  let nmCycleCtx = null;
  if (nmCycle) {
    nmCycle.addEventListener('click', async () => {
      if (nmCycleCtx) {
        nmCycleCtx.running = false;
        nmCycleCtx = null;
        nmCycle.textContent = 'Day cycle 시뮬레이션';
        return;
      }
      nmCycleCtx = { running: true };
      nmCycle.textContent = 'Day cycle stop';
      const PERIOD_MS = 30000;
      const STEP_MS = 500;
      const start = performance.now();
      let tick = 0;
      while (nmCycleCtx && nmCycleCtx.running) {
        const t = (performance.now() - start) / PERIOD_MS;
        // 0 ≤ t — 1 cycle = 1.
        const phase = (t % 1) * 2 * Math.PI;
        // 낮 (sin > 0): ACh + dopamine 양 / 밤 (sin < 0): serotonin.
        const day  = Math.max(0, Math.sin(phase));
        const night = Math.max(0, -Math.sin(phase));
        const dopamine = day * 1.0;        // [0, 1]
        const ach      = day * 0.6;        // [0, 0.6]
        const serotonin = night * 1.0;     // [0, 1]
        // 슬라이더 + 카드 동기.
        if (nmDopamine) { nmDopamine.value = dopamine.toFixed(2); nmDopamineVal.textContent = dopamine.toFixed(1); }
        if (nmAch)      { nmAch.value      = ach.toFixed(2);      nmAchVal.textContent      = ach.toFixed(1); }
        if (nmSero)     { nmSero.value     = serotonin.toFixed(2); nmSeroVal.textContent    = serotonin.toFixed(1); }
        updateNeuromodIndicator(dopamine, ach, serotonin);
        // backend 적용.
        await backend.setNeuromodulator({ dopamine, acetylcholine: ach, serotonin });
        // 매 4 step마다 1번 inject (uniform pattern) — region bars / decode 영역 갱신 시각화.
        tick += 1;
        if (tick % 2 === 0) {
          await backend.injectPattern([1,1,1,1,1,1,1,1], { modality: 'custom' });
        }
        await new Promise(r => setTimeout(r, STEP_MS));
      }
      // 정지 시점 reset.
      if (nmDopamine) { nmDopamine.value = 0; nmDopamineVal.textContent = '0.0'; }
      if (nmAch)      { nmAch.value = 0;      nmAchVal.textContent = '0.0'; }
      if (nmSero)     { nmSero.value = 0;     nmSeroVal.textContent = '0.0'; }
      updateNeuromodIndicator(0, 0, 0);
      await backend.setNeuromodulator({ dopamine: 0, acetylcholine: 0, serotonin: 0 });
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
      // KPI 자동 갱신.
      if (window.__nfSetKpiAccuracy) window.__nfSetKpiAccuracy(correct, total);
      if (window.__nfRefreshDashboard) window.__nfRefreshDashboard().catch(() => {});
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

  // 대시보드 KPI 카드.
  const dashboardRefreshBtn = document.getElementById('nf-dashboard-refresh');
  const kpiNeurons  = document.getElementById('nf-kpi-neurons');
  const kpiSynapses = document.getElementById('nf-kpi-synapses');
  const kpiAccuracy = document.getElementById('nf-kpi-accuracy');
  const kpiTotalW   = document.getElementById('nf-kpi-totalw');
  const kpiSat      = document.getElementById('nf-kpi-sat');
  const kpiUpdated  = document.getElementById('nf-kpi-updated');
  let lastDecodeAccuracy = null; // {correct, total, ts}

  function setKpiAccuracy(correct, total) {
    lastDecodeAccuracy = { correct, total, ts: Date.now() };
    if (kpiAccuracy) {
      const pct = total > 0 ? (correct / total * 100).toFixed(0) : '—';
      kpiAccuracy.textContent = `${correct}/${total} (${pct}%)`;
    }
    try {
      localStorage.setItem('handface.last_accuracy.v1', JSON.stringify(lastDecodeAccuracy));
    } catch (_) {}
  }

  // 페이지 로드 시 localStorage 복원.
  try {
    const raw = localStorage.getItem('handface.last_accuracy.v1');
    if (raw) {
      const cached = JSON.parse(raw);
      if (cached && typeof cached.correct === 'number') {
        lastDecodeAccuracy = cached;
        if (kpiAccuracy) {
          const pct = cached.total > 0 ? (cached.correct / cached.total * 100).toFixed(0) : '—';
          kpiAccuracy.textContent = `${cached.correct}/${cached.total} (${pct}%)`;
        }
      }
    }
  } catch (_) {}

  // Session 41+: OUT 활성 saturation index — 다중 OUT 동시 fire 비율.
  // Pure STDP (Option A) 정책: cascade 학습 후 정답 OUT 만 fire 가 이상적.
  // active_outs / total_outs 가 0.5 초과 시 경고 (정답 분리 안 됨).
  // Session 42+ Phase Boost (P9): KPI 카드 클릭 시 auto-prune 권장 dialog.
  const SAT_ACTIVE_HZ = 5;       // > 5Hz = 활성으로 간주 (noise floor 위).
  const SAT_WARN_RATIO = 0.5;    // 50% 이상 → 노란 경고
  const SAT_CRIT_RATIO = 0.7;    // 70% 이상 → 빨간 위험
  // KPI 카드 클릭 → prune 권장.
  if (kpiSat) {
    kpiSat.style.cursor = 'pointer';
    kpiSat.title = (kpiSat.title || '') + ' · 클릭 = auto-prune 제안';
    kpiSat.addEventListener('click', async () => {
      // 현재 saturation 비율 측정.
      const txt = kpiSat.textContent || '';
      const m = txt.match(/(\d+)\s*\/\s*(\d+)/);
      const ratio = m ? parseInt(m[1], 10) / Math.max(1, parseInt(m[2], 10)) : 0;
      if (ratio < SAT_WARN_RATIO) {
        await dialogAlert(
          `현재 OUT 활성도는 정상 범위 (${(ratio*100).toFixed(0)}% < ${(SAT_WARN_RATIO*100).toFixed(0)}%). prune 불필요.`,
          'Saturation 정상'
        );
        return;
      }
      // 자동 권장 threshold: critical 일수록 더 강한 정리 (1.0 → 5.0).
      const threshold = ratio >= SAT_CRIT_RATIO ? 5.0 : 2.0;
      const ok = await dialogConfirm(
        `OUT 활성도 ${(ratio*100).toFixed(0)}% (${ratio >= SAT_CRIT_RATIO ? 'CRIT' : 'WARN'}) — cascade saturation 의심.\n\n|w| < ${threshold} 인 약한 시냅스 정리를 권장합니다. 시스템 baseline 보존, user_in/user_out 관여 시냅스만 정리. 진행?`,
        '🩺 Auto-prune 권장'
      );
      if (!ok) return;
      const r = await backend.homeostasisPrune(threshold, true);
      if (r.ok) {
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
          else lastFireResponse = { synapses: snap.response.synapses };
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
        await dialogAlert(
          `✓ 정리 완료 — ${r.synapses_removed} 시냅스 제거 (${r.synapses_before} → ${r.synapses_after}). KPI 새 fire 시 갱신됩니다.`,
          'Auto-prune'
        );
      } else {
        await dialogAlert(`실패: ${r.reason || ''}`, 'Auto-prune');
      }
    });
  }
  function updateSaturationKpi(outRates) {
    if (!kpiSat) return;
    if (!outRates || typeof outRates !== 'object') {
      kpiSat.textContent = '—';
      kpiSat.classList.remove('warn', 'crit');
      return;
    }
    const entries = Object.entries(outRates);
    if (entries.length === 0) {
      kpiSat.textContent = '—';
      kpiSat.classList.remove('warn', 'crit');
      return;
    }
    const active = entries.filter(([, r]) => (r ?? 0) >= SAT_ACTIVE_HZ);
    const total = entries.length;
    const ratio = active.length / total;
    kpiSat.textContent = `${active.length}/${total}`;
    kpiSat.classList.remove('warn', 'crit');
    if (ratio >= SAT_CRIT_RATIO) kpiSat.classList.add('crit');
    else if (ratio >= SAT_WARN_RATIO) kpiSat.classList.add('warn');
    const winners = active.map(([n, r]) => `${n}=${(r ?? 0).toFixed(0)}Hz`);
    kpiSat.title = `OUT 활성 ${active.length}/${total} (${(ratio * 100).toFixed(0)}%)`
      + (winners.length > 0 ? ` — ${winners.join(', ')}` : '')
      + ` · 임계: warn ≥ ${(SAT_WARN_RATIO * 100).toFixed(0)}%, crit ≥ ${(SAT_CRIT_RATIO * 100).toFixed(0)}%`;
  }

  async function refreshDashboard() {
    const snap = await backend.getTrainingSnapshot();
    const exp  = await backend.exportTopology();
    if (!snap.ok || !exp.ok) return;
    const synapses = snap.response.synapses || [];
    const weights = synapses.map(s => s.weight);
    const pos = weights.filter(w => w > 0);
    if (kpiNeurons)  kpiNeurons.textContent = exp.neurons.length;
    if (kpiSynapses) kpiSynapses.textContent = synapses.length;
    if (kpiTotalW)   kpiTotalW.textContent = pos.reduce((a, b) => a + b, 0).toFixed(0);
    // Saturation 카드는 fire-update 이벤트 통해 실시간 갱신 (refresh 시 lastFireResponse 사용).
    if (lastFireResponse?.out_rates) updateSaturationKpi(lastFireResponse.out_rates);
    if (kpiUpdated)  kpiUpdated.textContent = new Date().toLocaleTimeString();
  }
  if (dashboardRefreshBtn) dashboardRefreshBtn.addEventListener('click', refreshDashboard);

  // 매 fire 마다 saturation KPI 자동 갱신 (induce / inject / train 등 모든 응답).
  window.addEventListener('snn-viz:fire-update', (ev) => {
    const r = ev.detail?.response || lastFireResponse || {};
    if (r.out_rates) {
      updateSaturationKpi(r.out_rates);
      // Tier2-E: winner OUT 발견 시 RL feedback prompt 띄움.
      showRlFeedbackForResponse(r);
    }
    // Tier1-C: 학습 round 간 weight-delta heatmap. 응답 .synapses 와 prev 비교.
    if (Array.isArray(r.synapses) && r.synapses.length > 0) {
      const prev = window.__prevSynapseWeights || {};
      const next = {};
      const deltas = {};
      for (const s of r.synapses) {
        const k = `${s.pre}->${s.post}`;
        next[k] = s.weight;
        const d = s.weight - (prev[k] ?? s.weight);
        if (Math.abs(d) >= 0.5) deltas[k] = d;
      }
      window.__prevSynapseWeights = next;
      // 학습 모드 응답에만 highlight (induce/inject 단발에서는 stdp 없으면 d=0).
      if (Object.keys(deltas).length > 0 && canvasShown && canvasMode === 'neuron') {
        flashWeightDelta(deltas, { durationMs: 1500 });
      }
    }
  });

  // Session 41+: Homeostatic weight pruning (CORE 탭 버튼).
  const pruneBtn = document.getElementById('nf-prune-btn');
  const pruneThresholdInput = document.getElementById('nf-prune-threshold');
  const pruneStatus = document.getElementById('nf-prune-status');
  if (pruneBtn) {
    pruneBtn.addEventListener('click', async () => {
      const threshold = parseFloat(pruneThresholdInput?.value || '1.0');
      if (!Number.isFinite(threshold) || threshold < 0) {
        if (pruneStatus) pruneStatus.textContent = '⚠ threshold 가 유효하지 않습니다 (0 이상 숫자).';
        return;
      }
      const ok = await dialogConfirm(
        `|w| < ${threshold} 인 시냅스를 제거합니다. 시스템 baseline 은 보존됩니다. 진행?`,
        'Homeostatic Pruning'
      );
      if (!ok) return;
      pruneBtn.disabled = true;
      const orig = pruneBtn.textContent;
      pruneBtn.textContent = '정리 중...';
      const r = await backend.homeostasisPrune(threshold, true);
      pruneBtn.textContent = orig;
      pruneBtn.disabled = false;
      if (r.ok) {
        if (pruneStatus) {
          pruneStatus.textContent =
            `✓ 제거 ${r.synapses_removed} 시냅스 (${r.synapses_before} → ${r.synapses_after}). threshold=${threshold}.`;
        }
        // 캔버스 + KPI 갱신.
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
          else lastFireResponse = { synapses: snap.response.synapses };
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
        refreshDashboard();
      } else {
        if (pruneStatus) pruneStatus.textContent = `실패: ${r.reason || ''}`;
      }
    });
  }

  // 회로 완전 초기화 — preset basic + overwrite + history clear.
  const circuitResetBtn = document.getElementById('nf-circuit-reset');
  if (circuitResetBtn) {
    circuitResetBtn.addEventListener('click', async () => {
      if (!await dialogConfirm('회로 초기화: 모든 grown 뉴런 + 학습된 weight 제거. 진행하시겠어요?', '회로 초기화')) return;
      circuitResetBtn.disabled = true;
      const orig = circuitResetBtn.textContent;
      circuitResetBtn.textContent = 'Resetting...';
      const r = await backend.resetCircuit();
      if (!r.ok) {
        circuitResetBtn.textContent = `Failed: ${r.reason || ''}`;
        setTimeout(() => { circuitResetBtn.textContent = orig; circuitResetBtn.disabled = false; }, 2000);
        return;
      }
      // 학습 history + accuracy + stats history 모두 초기화.
      try {
        clearTrainingState();
        localStorage.removeItem('handface.last_accuracy.v1');
        localStorage.removeItem('handface.stats.history.v1');
      } catch (_) {}
      // OUT history buffer reset.
      for (const k of ['out_0','out_1','out_2','out_3']) {
        if (outRateHistory[k]) outRateHistory[k].length = 0;
      }
      if (decodeSparkline) decodeSparkline.innerHTML = '';
      if (decodeHeadline) { decodeHeadline.textContent = '—'; decodeHeadline.classList.remove('active'); }
      if (kpiAccuracy) kpiAccuracy.textContent = '—';
      // Stats history 그래프 초기화.
      if (statsHistory) statsHistory.innerHTML = '';
      // 대시보드 + canvas 갱신.
      await refreshDashboard();
      const snap = await backend.getTrainingSnapshot();
      if (snap.ok && snap.response?.synapses) {
        if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
        else lastFireResponse = { synapses: snap.response.synapses };
        state.synapses = snap.response.synapses;
        if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
      }
      circuitResetBtn.textContent = `Reset ✓ (${r.response?.synapses_added} syn)`;
      setTimeout(() => { circuitResetBtn.textContent = orig; circuitResetBtn.disabled = false; }, 2000);
    });
  }
  // 외부 export — auto-train / accuracy 측정 후 호출 가능.
  window.__nfRefreshDashboard = refreshDashboard;
  window.__nfSetKpiAccuracy   = setKpiAccuracy;
  // 초기 1회 (지연 — backend ready 후).
  setTimeout(() => { refreshDashboard().catch(() => {}); }, 1500);

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

  // Synapse weight 직접 편집.
  const synEditBtn   = document.getElementById('nf-syn-edit-btn');
  const synEditPre   = document.getElementById('nf-syn-pre');
  const synEditPost  = document.getElementById('nf-syn-post');
  const synEditW     = document.getElementById('nf-syn-weight');
  const synEditStatus = document.getElementById('nf-syn-edit-status');
  if (synEditBtn) {
    synEditBtn.addEventListener('click', async () => {
      const pre  = (synEditPre?.value || '').trim();
      const post = (synEditPost?.value || '').trim();
      const w    = parseFloat(synEditW?.value);
      if (!pre || !post || isNaN(w)) {
        if (synEditStatus) synEditStatus.textContent = 'pre / post / weight 모두 필요.';
        return;
      }
      synEditBtn.disabled = true;
      const orig = synEditBtn.textContent;
      synEditBtn.textContent = 'Updating...';
      // 기존 시냅스 weight 업데이트는 backend.loadTrainingSnapshot ([{pre, post, weight}]) 사용.
      const r = await backend.loadTrainingSnapshot([{ pre, post, weight: w }]);
      if (r.ok) {
        synEditBtn.textContent = `✓ updated (${r.response?.updated || 1})`;
        if (synEditStatus) synEditStatus.textContent = `${pre}→${post} weight=${w} 적용됨.`;
        // 대시보드 + 통계 갱신.
        if (window.__nfRefreshDashboard) window.__nfRefreshDashboard().catch(() => {});
      } else {
        synEditBtn.textContent = `Failed: ${r.reason || ''}`;
      }
      setTimeout(() => { synEditBtn.textContent = orig; synEditBtn.disabled = false; }, 2000);
    });
  }

  // History CSV 다운로드.
  const statsExportCsvBtn = document.getElementById('nf-stats-export-csv');
  if (statsExportCsvBtn) {
    statsExportCsvBtn.addEventListener('click', () => {
      const arr = loadStatsHistory();
      if (arr.length === 0) {
        statsExportCsvBtn.textContent = 'History 비어있음';
        setTimeout(() => { statsExportCsvBtn.textContent = 'History CSV 다운로드'; }, 1500);
        return;
      }
      const header = 'timestamp_iso,neuron_count,syn_count,total_pos_weight,sat_ratio';
      const rows = arr.map(e => [
        new Date(e.ts).toISOString(),
        e.neuron_count ?? '',
        e.syn_count ?? '',
        (e.total_pos ?? 0).toFixed(2),
        (e.sat_ratio ?? 0).toFixed(4),
      ].join(','));
      const csv = [header, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `handface-stats-history-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      const orig = statsExportCsvBtn.textContent;
      statsExportCsvBtn.textContent = `Downloaded ✓ (${arr.length} rows)`;
      setTimeout(() => { statsExportCsvBtn.textContent = orig; }, 2000);
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
      // Modality 사용 빈도.
      const modCounts = loadModalityCount();
      if (Object.keys(modCounts).length > 0) {
        lines.push(``);
        lines.push(`# Modality 사용 (이 브라우저 누적)`);
        const total = Object.values(modCounts).reduce((a, b) => a + b, 0);
        const sorted = Object.entries(modCounts).sort((a, b) => b[1] - a[1]);
        for (const [m, n] of sorted) {
          lines.push(`  ${m.padEnd(10)} ${n.toString().padStart(4)} (${(n/total*100).toFixed(0)}%)`);
        }
      }
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

  // ────────────────────────────────────────────────────────
  // Session 38 PR-I: Node Library + USER INPUT panel
  // ────────────────────────────────────────────────────────
  const uiDensity     = document.getElementById('nf-ui-density');
  const uiDensityVal  = document.getElementById('nf-ui-density-val');
  const uiWeight      = document.getElementById('nf-ui-weight');
  const uiWeightVal   = document.getElementById('nf-ui-weight-val');
  const uiList        = document.getElementById('nf-ui-list');
  const uiStatus      = document.getElementById('nf-ui-status');
  const nodeLibBtns   = document.querySelectorAll('.nf-node-lib-btn');

  // 다음 노드 라벨 자동 결정 (kind별 카운터).
  function nextLabelForKind(kind) {
    const existing = state.userInputs || [];
    const sameKind = existing.filter(ui => ui.kind === kind);
    const titles = {
      audio: 'Audio', text: 'Text', image: 'Image', motion: 'Motion',
      keyboard: 'Keyboard', mouse: 'Mouse', geo: 'Geo', eeg: 'EEG', custom: 'Custom',
    };
    return `${titles[kind] || kind} ${sameKind.length + 1}`;
  }

  const uiInjectTarget   = document.getElementById('nf-ui-inject-target');
  const uiInjectWeight   = document.getElementById('nf-ui-inject-weight');
  const uiInjectWeightVal= document.getElementById('nf-ui-inject-weight-val');
  const uiInjectBtn      = document.getElementById('nf-ui-inject');
  const uiInjectTrainBtn = document.getElementById('nf-ui-inject-train');
  const uiTrainTarget    = document.getElementById('nf-ui-train-target');
  const uiInjectStatus   = document.getElementById('nf-ui-inject-status');

  const uiConfirmModal  = document.getElementById('nf-ui-confirm');
  const uiConfirmMsg    = document.getElementById('nf-ui-confirm-msg');
  const uiConfirmCancel = document.getElementById('nf-ui-confirm-cancel');
  const uiConfirmOk     = document.getElementById('nf-ui-confirm-ok');
  let uiPendingDelete = null; // {name, label}

  if (uiDensity && uiDensityVal) {
    uiDensity.addEventListener('input', () => {
      uiDensityVal.textContent = parseFloat(uiDensity.value).toFixed(2);
    });
  }
  if (uiWeight && uiWeightVal) {
    uiWeight.addEventListener('input', () => {
      uiWeightVal.textContent = uiWeight.value;
    });
  }
  if (uiInjectWeight && uiInjectWeightVal) {
    uiInjectWeight.addEventListener('input', () => {
      uiInjectWeightVal.textContent = uiInjectWeight.value;
    });
  }

  async function refreshUserInputList() {
    if (!uiList) return;
    const r = await backend.listUserInputs();
    if (!r.ok) {
      // Session 38 PR-D fix: 백엔드가 user_inputs endpoint 미지원 (Not Found) →
      // 사용자 로컬 backend가 옛 버전. Node Library 비활성화 + 명확한 안내.
      const reason = r.reason || '';
      const endpointMissing = /not\s*found/i.test(reason) || reason.includes('404');
      if (endpointMissing) {
        const ep = (loadNeuronFaceSettings && loadNeuronFaceSettings().endpoint) || '?';
        uiList.innerHTML = `<div class="nf-user-input-empty" style="color:#fbbf24;line-height:1.5;">
          ⚠ 백엔드가 Session 38 USER INPUT 기능을 지원하지 않습니다.<br>
          현재 endpoint: <code>${ep}</code><br>
          → neuronface 백엔드 업데이트 필요 또는 endpoint를<br>
          <code>https://whatpull-neuronface.hf.space</code> 로 변경
        </div>`;
        // Node Library 버튼 비활성화 (사용자 클릭 시 실패 방지).
        nodeLibBtns.forEach(b => { b.disabled = true; b.title = '백엔드 미지원'; });
      } else {
        uiList.innerHTML = `<div class="nf-user-input-empty">로드 실패: ${reason}</div>`;
      }
      if (uiInjectTarget) uiInjectTarget.innerHTML = '<option value="">(USER INPUT 노드 선택)</option>';
      state.userInputs = [];
      return;
    }
    // 백엔드 호환 확인됨 — 비활성화됐던 라이브러리 버튼 복원.
    nodeLibBtns.forEach(b => {
      const k = b.getAttribute('data-kind');
      if (['audio','text','custom'].includes(k)) {
        b.disabled = false;
        b.title = '';
      }
    });
    const inputs = r.userInputs || [];
    state.userInputs = inputs;
    if (inputs.length === 0) {
      uiList.innerHTML = '<div class="nf-user-input-empty">추가된 사용자 INPUT 없음 — 위 라이브러리에서 노드 타입 클릭</div>';
    } else {
      const kindIcon = {
        audio: '🎤', text: '📝', image: '🖼️', motion: '📱',
        keyboard: '⌨️', mouse: '🖱️', geo: '📍', eeg: '🧠', custom: '⚙️',
      };
      uiList.innerHTML = inputs.map(ui => `
        <div class="nf-user-input-row" data-name="${ui.name}">
          <span class="nf-ui-label" title="${ui.label} (${ui.kind || 'custom'})">${kindIcon[ui.kind] || '⚙️'} ${ui.label}</span>
          <span class="nf-ui-fanout">→V1 ${ui.fanout}</span>
          <button type="button" class="nf-ui-del" data-del="${ui.name}" data-label="${ui.label}" title="삭제">×</button>
        </div>
      `).join('');
      uiList.querySelectorAll('.nf-ui-del').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          const name  = ev.currentTarget.getAttribute('data-del');
          const label = ev.currentTarget.getAttribute('data-label');
          uiPendingDelete = { name, label };
          if (uiConfirmMsg) uiConfirmMsg.textContent = `'${label}' (${name}) 노드를 삭제할까요? 연결된 시냅스도 함께 제거됩니다 (시스템 노드는 영향 없음).`;
          if (uiConfirmModal) uiConfirmModal.classList.add('open');
        });
      });
    }
    // Inject target dropdown 갱신.
    if (uiInjectTarget) {
      uiInjectTarget.innerHTML = '<option value="">(USER INPUT 노드 선택)</option>'
        + inputs.map(ui => `<option value="${ui.name}">${ui.label} (${ui.name})</option>`).join('');
    }
    // Session 39 fix: Quick Learn 'From INPUT' dropdown 도 동기 (이전: refreshUserOutputList
    // 안에만 있어서 user_input 변동 시 갱신 안됨).
    const qlFromEl = document.getElementById('nf-ql-from');
    if (qlFromEl) {
      qlFromEl.innerHTML = '<option value="">(USER INPUT 선택)</option>'
        + inputs.map(ui => `<option value="${ui.name}">${ui.label} (${ui.name})</option>`).join('');
    }
  }

  // Node Library catalog 클릭 → kind에 맞는 노드 추가.
  nodeLibBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (btn.disabled) return;
      const kind = btn.getAttribute('data-kind') || 'custom';
      const label = nextLabelForKind(kind);
      btn.disabled = true;
      const r = await backend.addUserInput(label, {
        kind,
        fanoutDensity: parseFloat(uiDensity?.value || '0.5'),
        fanoutWeight:  parseFloat(uiWeight?.value  || '16'),
      });
      btn.disabled = false;
      if (r.ok) {
        if (uiStatus) uiStatus.textContent = `+ ${r.label} [${r.kind}] (${r.name}) — V1 fanout ${r.synapses_added}.`;
        await refreshUserInputList();
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          // Session 38 fix: lastFireResponse 도 갱신해야 mountCanvasForMode 가
          // 새 synapses (user_in fanout 포함) 를 사용함.
          if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
          else lastFireResponse = { synapses: snap.response.synapses };
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
      } else {
        if (uiStatus) uiStatus.textContent = `실패: ${r.reason || ''}`;
      }
    });
  });

  if (uiConfirmCancel) {
    uiConfirmCancel.addEventListener('click', () => {
      uiPendingDelete = null;
      if (uiConfirmModal) uiConfirmModal.classList.remove('open');
    });
  }
  if (uiConfirmOk) {
    uiConfirmOk.addEventListener('click', async () => {
      if (!uiPendingDelete) {
        uiConfirmModal?.classList.remove('open');
        return;
      }
      const { name, label } = uiPendingDelete;
      uiConfirmOk.disabled = true;
      const r = await backend.deleteUserInput(name);
      uiConfirmOk.disabled = false;
      uiConfirmModal?.classList.remove('open');
      uiPendingDelete = null;
      if (r.ok) {
        if (uiStatus) uiStatus.textContent = `- ${label} 삭제 완료 (시냅스 ${r.synapses_removed} 제거).`;
        await refreshUserInputList();
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
          else lastFireResponse = { synapses: snap.response.synapses };
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
      } else {
        if (uiStatus) uiStatus.textContent = `삭제 실패: ${r.reason || ''}`;
      }
    });
  }

  if (uiInjectBtn) {
    uiInjectBtn.addEventListener('click', async () => {
      const target = uiInjectTarget?.value;
      if (!target) {
        if (uiInjectStatus) uiInjectStatus.textContent = 'USER INPUT 노드를 선택하세요.';
        return;
      }
      const w = parseFloat(uiInjectWeight?.value || '50');
      uiInjectBtn.disabled = true;
      const orig = uiInjectBtn.textContent;
      uiInjectBtn.textContent = 'Injecting...';
      const r = await backend.injectUserInput(target, { weight: w, durationMs: 5.0 });
      if (r.ok) {
        const rr = r.rates_by_region || {};
        const out = r.out_rates || {};
        const winner = Object.entries(out).sort((a, b) => b[1] - a[1])[0];
        const winnerStr = winner ? `${winner[0]}=${winner[1]}Hz` : '—';
        if (uiInjectStatus) uiInjectStatus.textContent = `Inject ${target} (w=${w}) → V1 ${rr.V1 || 0}Hz / V2 ${rr.V2 || 0}Hz / OUT ${rr.OUT || 0}Hz. winner: ${winnerStr}`;
      } else {
        if (uiInjectStatus) uiInjectStatus.textContent = `실패: ${r.reason || ''}`;
      }
      setTimeout(() => { uiInjectBtn.textContent = orig; uiInjectBtn.disabled = false; }, 2500);
    });
  }

  if (uiInjectTrainBtn) {
    uiInjectTrainBtn.addEventListener('click', async () => {
      const target = uiInjectTarget?.value;
      const trainTarget = uiTrainTarget?.value;
      if (!target) {
        if (uiInjectStatus) uiInjectStatus.textContent = 'USER INPUT 노드를 선택하세요.';
        return;
      }
      if (!trainTarget) {
        if (uiInjectStatus) uiInjectStatus.textContent = 'Train target OUT 을 선택하세요.';
        return;
      }
      const w = parseFloat(uiInjectWeight?.value || '50');
      uiInjectTrainBtn.disabled = true;
      const orig = uiInjectTrainBtn.textContent;
      uiInjectTrainBtn.textContent = 'Training...';
      let okCount = 0;
      for (let i = 0; i < 10; i++) {
        const r = await backend.injectUserInput(target, {
          weight: w, durationMs: 5.0, stdp: true, targetOut: trainTarget,
        });
        if (r.ok) okCount++;
      }
      if (uiInjectStatus) uiInjectStatus.textContent = `Trained ${okCount}/10 rounds — ${target} → ${trainTarget}. OUT DECODE 패널 참조.`;
      setTimeout(() => { uiInjectTrainBtn.textContent = orig; uiInjectTrainBtn.disabled = false; }, 2500);
    });
  }

  // ────────────────────────────────────────────────────────
  // Session 38 PR-F: USER INPUT localStorage persistence
  // ────────────────────────────────────────────────────────
  // user_inputs 는 backend in-memory에만 저장 → 새 session 시작 시 backend 비어있음.
  // localStorage 에 {label, fanout_density, fanout_weight} 배열 저장 → 자동 복원.
  const USER_INPUTS_LS_KEY = 'handface.user_inputs.v1';

  function saveUserInputsLocal() {
    try {
      const raw = state.userInputs.map(ui => ({
        label: ui.label,
        kind:  ui.kind || 'custom',
        routed_to: ui.routed_to || null,
      }));
      localStorage.setItem(USER_INPUTS_LS_KEY, JSON.stringify(raw));
    } catch (e) {
      console.warn('[user_inputs] save failed:', e);
    }
  }

  async function restoreUserInputsLocal() {
    try {
      const raw = localStorage.getItem(USER_INPUTS_LS_KEY);
      if (!raw) return false;
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr) || arr.length === 0) return false;
      const r = await backend.listUserInputs();
      // 백엔드 미지원 (404) → restore 시도 자체가 의미 없음 (실패 메시지 방지).
      if (!r.ok) return false;
      if (r.userInputs.length > 0) return false;
      for (const item of arr) {
        if (!item.label) continue;
        const ar = await backend.addUserInput(item.label, { kind: item.kind || 'custom' });
        if (!ar.ok && (/not\s*found/i.test(ar.reason || '') || (ar.reason || '').includes('404'))) {
          return false;
        }
        // Session 39: 라우팅 복원 (best-effort).
        if (ar.ok && item.routed_to) {
          await backend.setUserInputRoute(ar.name, item.routed_to);
        }
      }
      return true;
    } catch (e) {
      console.warn('[user_inputs] restore failed:', e);
      return false;
    }
  }

  // 초기 로드: localStorage restore → backend 동기 → 패널 + canvas 갱신.
  (async () => {
    // 먼저 listUserInputs 으로 백엔드 호환 확인 — 미지원이면 restore 건너뜀 (조용히).
    const probe = await backend.listUserInputs();
    if (!probe.ok) {
      // 미지원 메시지는 refreshUserInputList 가 처리.
      await refreshUserInputList();
      return;
    }
    const restored = await restoreUserInputsLocal();
    await refreshUserInputList();
    if (restored && uiStatus) {
      uiStatus.textContent = `${state.userInputs.length}개 사용자 INPUT 노드 복원됨 (localStorage).`;
    }
    // Session 38 fix: restore 후 canvas 의 lastFireResponse 도 최신 synapses 로 동기.
    if (restored) {
      const snap = await backend.getTrainingSnapshot();
      if (snap.ok && snap.response?.synapses) {
        if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
        else lastFireResponse = { synapses: snap.response.synapses };
        state.synapses = snap.response.synapses;
        if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
      }
    }
  })();

  // add/delete 핸들러 직후 LS 동기. nodeLibBtns 클릭 + uiConfirmOk 클릭 후 자동 호출.
  nodeLibBtns.forEach(btn => btn.addEventListener('click', () => setTimeout(saveUserInputsLocal, 300)));
  if (uiConfirmOk) {
    uiConfirmOk.addEventListener('click', () => setTimeout(saveUserInputsLocal, 300));
  }

  // Session 39 USER OUTPUT + 연결 weight 영구 보존 — 의존 변수 (outLibBtns, qlTrainBtn 등) 가
  // 아래에서 선언되므로 해당 블록 다음 (refreshUserOutputList() 초기 호출 직후) 으로 이동.

  // ────────────────────────────────────────────────────────
  // Session 39 PR-N/O/P: USER OUTPUT (action selector) — Library + list + wizard
  // ────────────────────────────────────────────────────────
  const outLibBtns = document.querySelectorAll('.nf-out-lib-btn');
  const uoList     = document.getElementById('nf-uo-list');
  const qlFromSel  = document.getElementById('nf-ql-from');
  const qlToSel    = document.getElementById('nf-ql-to');
  const qlRoundsSel = document.getElementById('nf-ql-rounds');
  const qlTrainBtn = document.getElementById('nf-ql-train');
  const qlTestBtn  = document.getElementById('nf-ql-test');
  const qlStatus   = document.getElementById('nf-ql-status');

  function nextLabelForOutKind(kind) {
    const existing = state.userOutputs || [];
    const sameKind = existing.filter(uo => uo.kind === kind);
    const titles = {
      notification: 'Notify', speak: 'Speak', webhook: 'Webhook',
      console: 'Console', custom: 'Custom',
    };
    return `${titles[kind] || kind} ${sameKind.length + 1}`;
  }

  // 기본 action_config — notification/speak/webhook 은 dialog 로 사용자 입력.
  // {text} 토큰: 발화 시 마지막 inject 한 user_in 텍스트로 동적 치환.
  function defaultActionConfig(kind, label) {
    if (kind === 'notification') return 'pending';  // dialog 로 title/body.
    if (kind === 'speak')        return 'pending';  // dialog 로 text.
    if (kind === 'webhook')      return 'pending';  // dialog 로 URL.
    if (kind === 'console') return { tag: label };
    return {};
  }

  // backend fetch 없이 state.userOutputs 만으로 list DOM 재 render. 편집 시 backend
  // /config endpoint 미지원 환경에서 frontend 변경 보존용.
  async function refreshUserOutputListFromState() {
    // 가짜 응답 객체 만들어 기존 refresh 로직 우회 — 단순 setTimeout 으로 list redraw.
    // 가장 간단: 기존 refreshUserOutputList 동작 모방하되 backend.listUserOutputs 호출 skip.
    // → 그냥 동일 코드 inline 호출. 우선 list innerHTML 만 재 render.
    if (!uoList) return;
    const outs = state.userOutputs || [];
    const kindIcon = { notification: '🔔', speak: '🔊', webhook: '🌐', console: '📟', custom: '⚙️' };
    if (outs.length === 0) {
      uoList.innerHTML = '';
    } else {
      uoList.innerHTML = outs.map(uo => `
        <div class="nf-user-input-row" data-name="${uo.name}">
          <span class="nf-ui-label" title="${uo.label} (${uo.kind})">${kindIcon[uo.kind] || '⚙️'} ${uo.label}</span>
          <span class="nf-ui-fanout">V2→ ${uo.fanin}</span>
          <button type="button" class="nf-ui-edit" data-uo-edit="${uo.name}" title="설정 편집">✏</button>
          <button type="button" class="nf-ui-del"  data-uo-del="${uo.name}" data-label="${uo.label}" title="삭제">×</button>
        </div>
      `).join('');
      // edit/delete 핸들러 재 wiring — 기존 refreshUserOutputList 와 동일.
      uoList.querySelectorAll('[data-uo-edit]').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
          const name = ev.currentTarget.getAttribute('data-uo-edit');
          const uo2 = (state.userOutputs || []).find(u => u.name === name);
          if (!uo2) return;
          const newCfg = await openActionConfigDialog(uo2.kind, uo2.label, uo2.action_config);
          if (!newCfg) return;
          uo2.action_config = newCfg;
          saveUserOutputsLocal();
          const r2 = await backend.updateUserOutputConfig(name, newCfg);
          if (r2.ok) await refreshUserOutputList();
          else await refreshUserOutputListFromState();
        });
      });
      uoList.querySelectorAll('[data-uo-del]').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
          const name = ev.currentTarget.getAttribute('data-uo-del');
          const label = ev.currentTarget.getAttribute('data-label');
          if (!await dialogConfirm(`'${label}' (${name}) USER OUTPUT 노드를 삭제할까요?`, 'USER OUTPUT 삭제')) return;
          const dr = await backend.deleteUserOutput(name);
          if (dr.ok) {
            await refreshUserOutputList();
            const snap = await backend.getTrainingSnapshot();
            if (snap.ok && snap.response?.synapses) {
              if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
              else lastFireResponse = { synapses: snap.response.synapses };
              state.synapses = snap.response.synapses;
              if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
            }
          }
        });
      });
    }
  }

  async function refreshUserOutputList() {
    if (!uoList) return;
    const r = await backend.listUserOutputs();
    if (!r.ok) {
      uoList.innerHTML = '';
      state.userOutputs = [];
      if (qlToSel) qlToSel.innerHTML = '<option value="">(USER OUTPUT 선택)</option>';
      // 백엔드 미지원 → OUT library disabled.
      const reason = r.reason || '';
      if (/not\s*found/i.test(reason) || reason.includes('404')) {
        outLibBtns.forEach(b => { b.disabled = true; b.title = '백엔드 Session 39 미지원'; });
      }
      return;
    }
    outLibBtns.forEach(b => { b.disabled = false; b.title = ''; });
    const outs = r.userOutputs || [];
    state.userOutputs = outs;
    const kindIcon = { notification: '🔔', speak: '🔊', webhook: '🌐', console: '📟', custom: '⚙️' };
    if (outs.length === 0) {
      uoList.innerHTML = '';
    } else {
      uoList.innerHTML = outs.map(uo => `
        <div class="nf-user-input-row" data-name="${uo.name}">
          <span class="nf-ui-label" title="${uo.label} (${uo.kind})">${kindIcon[uo.kind] || '⚙️'} ${uo.label}</span>
          <span class="nf-ui-fanout">V2→ ${uo.fanin}</span>
          <button type="button" class="nf-ui-edit" data-uo-edit="${uo.name}" title="설정 편집">✏</button>
          <button type="button" class="nf-ui-del"  data-uo-del="${uo.name}" data-label="${uo.label}" title="삭제">×</button>
        </div>
      `).join('');
      // 편집 버튼 — action_config 수정 dialog. Optimistic update — 프런트 즉시 반영.
      uoList.querySelectorAll('[data-uo-edit]').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
          const name = ev.currentTarget.getAttribute('data-uo-edit');
          const uo = (state.userOutputs || []).find(u => u.name === name);
          if (!uo) return;
          const newCfg = await openActionConfigDialog(uo.kind, uo.label, uo.action_config);
          if (!newCfg) return;
          // 1) 프런트 state 즉시 갱신 — action callback 이 새 cfg 사용 (backend 와 무관).
          uo.action_config = newCfg;
          // 2) localStorage 즉시 저장 — 페이지 reload 후에도 유지.
          saveUserOutputsLocal();
          // 3) backend 동기 (best-effort).
          const r = await backend.updateUserOutputConfig(name, newCfg);
          if (r.ok) {
            await refreshUserOutputList();
          } else {
            // backend 미지원 (cached) — 콘솔 noise 없이 frontend-only 적용.
            await refreshUserOutputListFromState();
          }
        });
      });
      uoList.querySelectorAll('[data-uo-del]').forEach(btn => {
        btn.addEventListener('click', async (ev) => {
          const name = ev.currentTarget.getAttribute('data-uo-del');
          const label = ev.currentTarget.getAttribute('data-label');
          if (!await dialogConfirm(`'${label}' (${name}) USER OUTPUT 노드를 삭제할까요?<br/>연결된 시냅스도 함께 제거됩니다.`, 'USER OUTPUT 삭제')) return;
          const dr = await backend.deleteUserOutput(name);
          if (dr.ok) {
            await refreshUserOutputList();
            const snap = await backend.getTrainingSnapshot();
            if (snap.ok && snap.response?.synapses) {
              if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
              else lastFireResponse = { synapses: snap.response.synapses };
              state.synapses = snap.response.synapses;
              if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
            }
          }
        });
      });
    }
    // Quick Learn target dropdown 갱신.
    if (qlToSel) {
      qlToSel.innerHTML = '<option value="">(USER OUTPUT 선택)</option>'
        + outs.map(uo => `<option value="${uo.name}">${uo.label} (${uo.name})</option>`).join('');
    }
    // From dropdown 도 동일 리프레시 (USER INPUT 변동 동기).
    if (qlFromSel) {
      const ins = state.userInputs || [];
      qlFromSel.innerHTML = '<option value="">(USER INPUT 선택)</option>'
        + ins.map(ui => `<option value="${ui.name}">${ui.label} (${ui.name})</option>`).join('');
    }
  }

  // OUT Library 클릭 → 새 OUT 노드 추가.
  outLibBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (btn.disabled) return;
      const kind = btn.getAttribute('data-out-kind');
      const label = nextLabelForOutKind(kind);
      let cfg = defaultActionConfig(kind, label);
      // dialog 로 action_config 설정 — notification/speak/webhook.
      if (cfg === 'pending') {
        cfg = await openActionConfigDialog(kind, label);
        if (!cfg) {
          if (uiStatus) uiStatus.textContent = '취소됨 — 노드 추가하지 않음.';
          return;
        }
      } else if (cfg === null) {
        if (uiStatus) uiStatus.textContent = '취소됨 — 노드 추가하지 않음.';
        return;
      }
      btn.disabled = true;
      const r = await backend.addUserOutput(label, { kind, actionConfig: cfg });
      btn.disabled = false;
      if (r.ok) {
        if (uiStatus) uiStatus.textContent = `+ ${r.label} [${r.kind}] (${r.name}) — V2 fanin ${r.synapses_added}.`;
        await refreshUserOutputList();
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
          else lastFireResponse = { synapses: snap.response.synapses };
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
      } else {
        if (uiStatus) uiStatus.textContent = `실패: ${r.reason || ''}`;
      }
    });
  });

  // Quick Learn — 사용자 INPUT → 사용자 OUTPUT STDP 매핑 학습.
  if (qlTrainBtn) {
    qlTrainBtn.addEventListener('click', async () => {
      const fromName = qlFromSel?.value;
      const toName = qlToSel?.value;
      const rounds = parseInt(qlRoundsSel?.value || '10', 10);
      if (!fromName || !toName) {
        if (qlStatus) qlStatus.textContent = 'From INPUT + To OUTPUT 모두 선택하세요.';
        return;
      }
      qlTrainBtn.disabled = true;
      let okCount = 0;
      for (let i = 0; i < rounds; i++) {
        // pattern uniform high (학습 시 안정적 firing).
        const r = await backend.injectUserInputPattern(fromName, [0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9], {
          intensity: 2.0, stdp: true, targetOut: toName,
        });
        if (r.ok) okCount++;
      }
      qlTrainBtn.disabled = false;
      // Session 39 revised: auto-route 제거 — STDP 학습 가중치만으로 winner 결정.
      // 학습 후 path strength 조회로 결과 정량 확인.
      let pathInfo = '';
      try {
        const ps = await backend.getUserInputPathStrength(fromName);
        if (ps?.ok && ps.path_strengths) {
          const target = ps.path_strengths[toName] || 0;
          const others = Object.entries(ps.path_strengths)
            .filter(([k]) => k !== toName).map(([_, v]) => v);
          const othersAvg = others.length ? others.reduce((a,b)=>a+b,0) / others.length : 0;
          pathInfo = ` | 경로강도 ${toName}=${target.toFixed(0)} (others avg ${othersAvg.toFixed(0)})`;
        }
      } catch (_) { /* ignore */ }
      if (qlStatus) {
        qlStatus.textContent = `학습 ${okCount}/${rounds} ✓ ${fromName} → ${toName}${pathInfo}`;
      }
      // Synapse refresh.
      const snap = await backend.getTrainingSnapshot();
      if (snap.ok && snap.response?.synapses) {
        if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
        else lastFireResponse = { synapses: snap.response.synapses };
        state.synapses = snap.response.synapses;
        if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
      }
    });
  }

  if (qlTestBtn) {
    qlTestBtn.addEventListener('click', async () => {
      const fromName = qlFromSel?.value;
      const toName = qlToSel?.value;
      if (!fromName || !toName) {
        if (qlStatus) qlStatus.textContent = 'From INPUT + To OUTPUT 선택 필요.';
        return;
      }
      // Inject only (no STDP, no supervisor) → cascade 자체로 OUT 발화하는지 검증.
      const r = await backend.injectUserInputPattern(fromName, [0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9], {
        intensity: 2.0, stdp: false,
      });
      if (!r.ok) {
        if (qlStatus) qlStatus.textContent = `Test 실패: ${r.reason || ''}`;
        return;
      }
      const rates = r.rates || {};
      const targetRate = rates[toName] || 0;
      // 시스템 OUT + 다른 user OUT 중 winner.
      const outRates = {};
      Object.keys(rates).forEach(k => {
        if (k.startsWith('out_') || k.startsWith('user_out_')) outRates[k] = rates[k];
      });
      const winner = Object.entries(outRates).sort((a,b) => b[1] - a[1])[0];
      const ok = winner && winner[0] === toName;
      // path strength 비교 — 학습 진척 정량.
      let pathInfo = '';
      try {
        const ps = await backend.getUserInputPathStrength(fromName);
        if (ps?.ok && ps.path_strengths) {
          const targetPS = ps.path_strengths[toName] || 0;
          const others = Object.entries(ps.path_strengths)
            .filter(([k]) => k !== toName).map(([_, v]) => v);
          const othersAvg = others.length ? others.reduce((a,b)=>a+b,0) / others.length : 0;
          pathInfo = ` | 경로강도 target=${targetPS.toFixed(0)} vs others avg=${othersAvg.toFixed(0)}`;
        }
      } catch (_) {}
      if (qlStatus) {
        qlStatus.textContent = `Test: winner=${winner ? winner[0]+'='+winner[1].toFixed(0)+'Hz' : '없음'} ${ok ? '✓ 학습됨' : '✗ 미학습'}${pathInfo}`;
      }
    });
  }

  // ────────────────────────────────────────────────────────
  // Session 39 PR-O: action callbacks — user_out 발화 detection + execute.
  // ────────────────────────────────────────────────────────
  // edge-trigger: 직전 rate 0 → 현재 rate > 임계 → callback 1회.
  const ACTION_FIRE_THRESHOLD = 10; // Hz
  const ACTION_COOLDOWN_MS = 1000;
  const _lastActionAt = {};

  // {text} 토큰 치환 — 가장 최근 inject 된 USER INPUT 의 텍스트 사용.
  // 단, source 가 'text' kind 인 경우에만 의미 있는 text 가 존재 — audio/custom 등 비-text
  // 입력이 트리거 한 경우 stale text (이전 text 노드 잔여) 노출 금지.
  function lastInjectedText() {
    const id = window.__lastInjectNodeId;
    if (!id) return '';
    const ui = (state.userInputs || []).find(u => u.name === id);
    if (!ui || ui.kind !== 'text') return '';
    return (window.__lastInjectedTextByNode || {})[id] || '';
  }
  function substitute(template) {
    if (!template) return template;
    return String(template).replace(/\{text\}/gi, lastInjectedText());
  }
  function executeAction(uo) {
    const now = Date.now();
    if (_lastActionAt[uo.name] && now - _lastActionAt[uo.name] < ACTION_COOLDOWN_MS) return;
    _lastActionAt[uo.name] = now;
    const cfg = uo.action_config || {};
    try {
      if (uo.kind === 'notification') {
        const title = substitute(cfg.title || uo.label);
        const body  = substitute(cfg.body || `${uo.label} fired`);
        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification(title, { body });
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(p => {
              if (p === 'granted') new Notification(title, { body });
            });
          }
        }
      } else if (uo.kind === 'speak') {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(substitute(cfg.text || uo.label));
          if (cfg.voice) u.lang = cfg.voice;
          window.speechSynthesis.speak(u);
        }
      } else if (uo.kind === 'webhook') {
        if (cfg.url) {
          const bodyObj = cfg.body || { event: uo.label, name: uo.name, t: now };
          // body 안 string 값들에도 {text} 치환 적용.
          const substitutedBody = JSON.parse(JSON.stringify(bodyObj), null);
          const walk = (o) => {
            if (typeof o === 'string') return substitute(o);
            if (Array.isArray(o)) return o.map(walk);
            if (o && typeof o === 'object') {
              const r = {}; for (const k in o) r[k] = walk(o[k]); return r;
            }
            return o;
          };
          fetch(cfg.url, {
            method: cfg.method || 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...walk(substitutedBody), text: lastInjectedText() }),
          }).catch(e => console.warn('[action webhook] failed:', e));
        }
      } else if (uo.kind === 'console') {
        const txt = lastInjectedText();  // text-kind source 일 때만 non-empty.
        const tag = cfg.tag || uo.label;
        if (txt && cfg.text) {
          // text source + 사용자 message 정의됨 → {text} 치환된 메시지 출력.
          console.log(`[${tag}]`, cfg.text.replace(/\{text\}/g, txt));
        } else if (txt) {
          // text source, message 미정의 → 텍스트만 포함된 객체.
          console.log(`[${tag}]`, { name: uo.name, text: txt, time: new Date(now).toISOString() });
        } else {
          // 비-text source (audio/custom 등) → text 필드 제외.
          console.log(`[${tag}]`, { name: uo.name, time: new Date(now).toISOString() });
        }
      }
    } catch (e) {
      console.warn('[action] execute failed:', e);
    }
  }

  // Session 39 revised: cascade saturation 시 다중 OUT fire 가능 — 그러나 action callback 은
  // winner (가장 높은 rate user_out) 만 trigger. STDP 학습이 trained path 강화하면
  // winner = trained out_X. perception/action level WTA — bio-plausible (cortical decision).
  function detectAndExecuteUserOutActions(rates) {
    if (!rates) return;
    const outs = state.userOutputs || [];
    // 가장 높은 rate user_out 찾기.
    let winner = null;
    let winnerRate = ACTION_FIRE_THRESHOLD;  // threshold 이상만 winner 대상.
    for (const uo of outs) {
      const cur = rates[uo.name] || 0;
      if (cur > winnerRate) {
        winner = uo;
        winnerRate = cur;
      }
    }
    // edge-trigger: prev winner != cur winner (또는 같은 winner 가 다시 발화 — cooldown 으로 차단).
    for (const uo of outs) {
      const cur = rates[uo.name] || 0;
      const prev = state.prevUserOutRates[uo.name] || 0;
      if (uo === winner && prev <= ACTION_FIRE_THRESHOLD && cur > ACTION_FIRE_THRESHOLD) {
        executeAction(uo);
      }
      state.prevUserOutRates[uo.name] = cur;
    }
  }

  // Session 39 PR-O: backend 'neuron-firing' 이벤트 발생 시 (USER INPUT inject /
  // train 등) →
  //   1) 캔버스 fire 시각화 갱신 (시냅스 라인 violet + active 노드 dot).
  //   2) user OUT edge-trigger detect → action callback 실행.
  backend.onEvent((ev) => {
    if (ev.type !== 'neuron-firing') return;
    const r = ev.response || {};
    // [1] canvas fire 시각화 트리거 (induce_fire / handfaceTrain 과 동일 흐름).
    if (r.rates || r.active_neurons_by_region) {
      window.dispatchEvent(new CustomEvent('snn-viz:fire-update', { detail: { response: r } }));
    }
    // [2] user OUT action callback edge-trigger.
    if (r.rates) detectAndExecuteUserOutActions(r.rates);
  });

  // 초기 OUT 목록 로드.
  refreshUserOutputList();

  // ────────────────────────────────────────────────────────
  // Session 39: USER OUTPUT + 연결 weight localStorage persistence
  // (outLibBtns / qlTrainBtn / refreshUserOutputList 선언 후로 이동 — TDZ 방지.)
  // ────────────────────────────────────────────────────────
  const USER_OUTPUTS_LS_KEY  = 'handface.user_outputs.v1';
  const USER_SYNAPSES_LS_KEY = 'handface.user_synapses.v1';

  function saveUserOutputsLocal() {
    try {
      const raw = (state.userOutputs || []).map(uo => ({
        label: uo.label,
        kind: uo.kind || 'notification',
        action_config: uo.action_config || {},
      }));
      localStorage.setItem(USER_OUTPUTS_LS_KEY, JSON.stringify(raw));
    } catch (e) {
      console.warn('[user_outputs] save failed:', e);
    }
  }

  // 모듈-레벨 wireUserInputNodeHandlers 의 edit-out 핸들러에서 사용 (canvas 카드 ✏️ 클릭).
  window.__nfSaveUserOutputsLocal = saveUserOutputsLocal;
  window.__nfRefreshUserOutputListFromState = refreshUserOutputListFromState;

  async function saveUserSynapsesLocal() {
    try {
      const snap = await backend.getTrainingSnapshot();
      if (!snap.ok || !snap.response?.synapses) return;
      const userSyn = snap.response.synapses.filter(s => {
        const a = s.pre, b = s.post;
        return (a.startsWith('user_in_') || a.startsWith('user_out_')
             || b.startsWith('user_in_') || b.startsWith('user_out_'));
      });
      const labelMap = {};
      (state.userInputs  || []).forEach(ui => labelMap[ui.name] = { kind: 'in', label: ui.label });
      (state.userOutputs || []).forEach(uo => labelMap[uo.name] = { kind: 'out', label: uo.label });
      const raw = userSyn.map(s => ({
        pre: s.pre, post: s.post, weight: s.weight,
        pre_label: labelMap[s.pre]?.label || null,
        post_label: labelMap[s.post]?.label || null,
      }));
      localStorage.setItem(USER_SYNAPSES_LS_KEY, JSON.stringify(raw));
    } catch (e) {
      console.warn('[user_synapses] save failed:', e);
    }
  }

  async function restoreUserOutputsLocal() {
    try {
      const raw = localStorage.getItem(USER_OUTPUTS_LS_KEY);
      if (!raw) return false;
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr) || arr.length === 0) return false;
      const r = await backend.listUserOutputs();
      if (!r.ok) return false;
      if (r.userOutputs.length > 0) return false;
      for (const item of arr) {
        if (!item.label) continue;
        const ar = await backend.addUserOutput(item.label, {
          kind: item.kind || 'notification',
          actionConfig: item.action_config || {},
        });
        if (!ar.ok && (/not\s*found/i.test(ar.reason || '') || (ar.reason || '').includes('404'))) {
          return false;
        }
      }
      return true;
    } catch (e) {
      console.warn('[user_outputs] restore failed:', e);
      return false;
    }
  }

  async function restoreUserSynapsesLocal() {
    try {
      const raw = localStorage.getItem(USER_SYNAPSES_LS_KEY);
      if (!raw) return false;
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr) || arr.length === 0) return false;
      const validNames = new Set();
      (state.userInputs  || []).forEach(ui => validNames.add(ui.name));
      (state.userOutputs || []).forEach(uo => validNames.add(uo.name));
      const filtered = arr.filter(s => {
        const aUser = s.pre.startsWith('user_in_') || s.pre.startsWith('user_out_');
        const bUser = s.post.startsWith('user_in_') || s.post.startsWith('user_out_');
        if (aUser && !validNames.has(s.pre)) return false;
        if (bUser && !validNames.has(s.post)) return false;
        return aUser || bUser;
      });
      if (filtered.length === 0) return false;
      const lr = await backend.loadTrainingSnapshot(filtered);
      return lr.ok;
    } catch (e) {
      console.warn('[user_synapses] restore failed:', e);
      return false;
    }
  }

  // OUT Library 클릭 + delete + Quick Learn 학습 후 자동 LS 저장.
  outLibBtns.forEach(btn => btn.addEventListener('click', () => {
    setTimeout(() => { saveUserOutputsLocal(); saveUserSynapsesLocal(); }, 400);
  }));
  if (qlTrainBtn) {
    qlTrainBtn.addEventListener('click', () => setTimeout(saveUserSynapsesLocal, 600));
  }
  nodeLibBtns.forEach(btn => btn.addEventListener('click', () => setTimeout(saveUserSynapsesLocal, 400)));
  if (uiConfirmOk) {
    uiConfirmOk.addEventListener('click', () => setTimeout(() => { saveUserOutputsLocal(); saveUserSynapsesLocal(); }, 400));
  }

  // 초기 로드: USER OUTPUT + 학습 weight 복원.
  (async () => {
    const probe = await backend.listUserOutputs();
    if (!probe.ok) return;
    const restored = await restoreUserOutputsLocal();
    if (restored) await refreshUserOutputList();
    const synRestored = await restoreUserSynapsesLocal();
    if (qlStatus && (restored || synRestored)) {
      qlStatus.textContent = `복원됨 — outputs ${state.userOutputs.length}, ${synRestored ? '학습 weight 적용됨' : '학습 weight 없음'}.`;
    }
    const snap = await backend.getTrainingSnapshot();
    if (snap.ok && snap.response?.synapses) {
      if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
      else lastFireResponse = { synapses: snap.response.synapses };
      state.synapses = snap.response.synapses;
      if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
    }
  })();

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

  // PATTERN 라이브러리 자동 학습 + 평가.
  const presetAutoTrainBtn = document.getElementById('nf-preset-auto-train');
  if (presetAutoTrainBtn) {
    presetAutoTrainBtn.addEventListener('click', async () => {
      presetAutoTrainBtn.disabled = true;
      const orig = presetAutoTrainBtn.textContent;
      const PAIRS = [
        { name: 'left',    pattern: PRESET_PATTERNS.left,    target: 'out_0' },
        { name: 'right',   pattern: PRESET_PATTERNS.right,   target: 'out_1' },
        { name: 'center',  pattern: PRESET_PATTERNS.center,  target: 'out_2' },
        { name: 'uniform', pattern: PRESET_PATTERNS.uniform, target: 'out_3' },
      ];
      const N_ROUNDS = 5;
      // 1) Train.
      for (let round = 1; round <= N_ROUNDS; round += 1) {
        for (const p of PAIRS) {
          presetAutoTrainBtn.textContent = `Train ${round}/${N_ROUNDS}: ${p.name}→${p.target}`;
          const r = await backend.injectPattern(p.pattern, {
            modality: 'custom',
            targetOut: p.target,
            stdp: true,
          });
          if (!r.ok) {
            presetAutoTrainBtn.textContent = `Train failed: ${r.reason || ''}`;
            setTimeout(() => { presetAutoTrainBtn.textContent = orig; presetAutoTrainBtn.disabled = false; }, 3000);
            return;
          }
        }
      }
      // 2) Eval.
      let correct = 0;
      const detail = [];
      for (const p of PAIRS) {
        presetAutoTrainBtn.textContent = `Eval ${p.name}`;
        const r = await backend.injectPattern(p.pattern, { modality: 'custom' });
        const out = r.response?.out_rates || {};
        const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
        const ok = winner === p.target;
        if (ok) correct += 1;
        detail.push(`${p.name}=${winner}${ok ? '✓' : '✗'}`);
      }
      const pct = (correct / PAIRS.length * 100).toFixed(0);
      presetAutoTrainBtn.textContent = `Done: ${correct}/${PAIRS.length} = ${pct}%`;
      if (presetStatus) {
        presetStatus.textContent = `Auto-train 결과: ${correct}/${PAIRS.length} = ${pct}% | ${detail.join(', ')}`;
      }
      // KPI 자동 갱신.
      if (window.__nfSetKpiAccuracy) window.__nfSetKpiAccuracy(correct, PAIRS.length);
      if (window.__nfRefreshDashboard) window.__nfRefreshDashboard().catch(() => {});
      await saveTrainingState();
      setTimeout(() => { presetAutoTrainBtn.textContent = orig; presetAutoTrainBtn.disabled = false; }, 3500);
    });
  }

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

  // Phase 2 geolocation modality: 위/경도/정확도/heading/속도/고도 → 8-bin.
  const geoInject = document.getElementById('nf-geo-inject');
  const geoStatus = document.getElementById('nf-geo-status');
  if (geoInject) {
    geoInject.addEventListener('click', () => {
      if (!navigator.geolocation) {
        if (geoStatus) geoStatus.textContent = 'geolocation 미지원 브라우저.';
        return;
      }
      geoInject.disabled = true;
      const orig = geoInject.textContent;
      geoInject.textContent = '위치 요청...';
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const c = pos.coords;
        // 정규화 (각 차원 적당한 범위로 [0, 1] 매핑).
        const lat   = ((c.latitude  + 90) / 180);
        const lon   = ((c.longitude + 180) / 360);
        const acc   = Math.min(1, (c.accuracy || 1000) / 1000);
        const alt   = c.altitude != null ? Math.min(1, Math.max(0, (c.altitude + 500) / 9000)) : 0.5;
        const altA  = c.altitudeAccuracy != null ? Math.min(1, c.altitudeAccuracy / 100) : 0;
        const head  = c.heading != null && !isNaN(c.heading) ? c.heading / 360 : 0;
        const speed = c.speed != null && !isNaN(c.speed) ? Math.min(1, c.speed / 30) : 0;
        const ts    = (pos.timestamp % 86400000) / 86400000; // 시간 of day [0, 1].
        const pattern = [lat, lon, acc, alt, altA, head, speed, ts];
        geoInject.textContent = 'Injecting...';
        const r = await backend.injectPattern(pattern, { modality: 'custom' });
        if (r.ok) {
          const out = r.response?.out_rates || {};
          const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
          if (geoStatus) geoStatus.textContent = `pattern=[${pattern.map(p=>p.toFixed(2)).join(',')}] → winner=${winner||'없음'}`;
          geoInject.textContent = 'Injected ✓';
        } else {
          geoInject.textContent = `Failed: ${r.reason||''}`;
        }
        setTimeout(() => { geoInject.textContent = orig; geoInject.disabled = false; }, 2500);
      }, (err) => {
        if (geoStatus) geoStatus.textContent = `위치 거부: ${err.message}`;
        geoInject.textContent = orig;
        geoInject.disabled = false;
      }, { enableHighAccuracy: true, timeout: 10000 });
    });
  }

  // Phase 2 keyboard modality: 직전 1초 keystroke timestamp 분포 → 8-bin.
  const kbdInput  = document.getElementById('nf-kbd-input');
  const kbdStream = document.getElementById('nf-kbd-stream');
  const kbdStatus = document.getElementById('nf-kbd-status');
  const kbdTimestamps = [];
  if (kbdInput) {
    kbdInput.addEventListener('keydown', () => {
      kbdTimestamps.push(performance.now());
      // 1초 보다 오래된 것 제거.
      const cutoff = performance.now() - 1000;
      while (kbdTimestamps.length > 0 && kbdTimestamps[0] < cutoff) {
        kbdTimestamps.shift();
      }
    });
  }
  let kbdStreamCtx = null;
  if (kbdStream) {
    kbdStream.addEventListener('click', async () => {
      if (kbdStreamCtx) {
        kbdStreamCtx.running = false;
        kbdStreamCtx = null;
        kbdStream.textContent = 'Streaming start';
        if (kbdStatus) kbdStatus.textContent = 'Streaming stopped.';
        return;
      }
      kbdStreamCtx = { running: true };
      kbdStream.textContent = 'Streaming stop';
      let tick = 0;
      while (kbdStreamCtx && kbdStreamCtx.running) {
        await new Promise(r => setTimeout(r, 1000));
        tick += 1;
        const now = performance.now();
        const cutoff = now - 1000;
        // 직전 1초 timestamps 8 bins (125ms씩).
        const bins = new Array(8).fill(0);
        for (const ts of kbdTimestamps) {
          if (ts < cutoff) continue;
          const bi = Math.min(7, Math.floor((ts - cutoff) / 125));
          bins[bi] += 1;
        }
        const total = bins.reduce((a, b) => a + b, 0);
        if (total === 0) {
          if (kbdStatus) kbdStatus.textContent = `[stream tick ${tick}] 키 입력 없음 — 타이핑하세요`;
          continue;
        }
        const m = Math.max(...bins);
        const pattern = bins.map(b => m > 0 ? b / m : 0);
        const r = await backend.injectPattern(pattern, { modality: 'custom' });
        if (kbdStatus && r.ok) {
          const out = r.response?.out_rates || {};
          const winner = Object.entries(out).reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];
          kbdStatus.textContent = `[stream tick ${tick}] keystrokes=${total} → winner=${winner || '없음'}`;
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

  // Settings 카테고리 탭 (Session 37 reorganization).
  const TAB_KEY = 'handface.settings.active_cat.v1';
  const settingsRoot = document.getElementById('neuronface-settings');
  const tabBtns = Array.from(document.querySelectorAll('.nf-tab-btn'));
  function setActiveTab(cat) {
    if (!settingsRoot) return;
    settingsRoot.dataset.activeCat = cat;
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
    try { localStorage.setItem(TAB_KEY, cat); } catch (_) {}
  }
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.cat));
  });
  // 초기 탭 (localStorage 또는 'nodes' 기본). NODES = Node Library + Scene tree (node-editor 기본 화면).
  // 'input' (구) → 'nodes' / 'all' (제거됨) → 'nodes' 로 마이그레이션.
  let initialTab = 'nodes';
  try {
    const saved = localStorage.getItem(TAB_KEY);
    let migrated = saved;
    if (saved === 'input' || saved === 'all') migrated = 'nodes';
    if (migrated && ['nodes','core','learn','tools'].includes(migrated)) initialTab = migrated;
  } catch (_) {}
  setActiveTab(initialTab);

  // Per-modality 사용 카운터 (localStorage).
  const MODALITY_COUNT_KEY = 'handface.modality_count.v1';
  function loadModalityCount() {
    try { return JSON.parse(localStorage.getItem(MODALITY_COUNT_KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function saveModalityCount(obj) {
    try { localStorage.setItem(MODALITY_COUNT_KEY, JSON.stringify(obj)); } catch (_) {}
  }
  // Decode panel + Region bars listen — 모든 backend train/induce response 자동 갱신.
  backend.onEvent((evt) => {
    const r = evt?.response;
    if (!r) return;
    // Modality 카운트.
    if (r.modality) {
      const counts = loadModalityCount();
      counts[r.modality] = (counts[r.modality] || 0) + 1;
      saveModalityCount(counts);
    }
    // Region 활성도 갱신.
    if (r.rates_by_region) {
      updateRegionBars(r.rates_by_region);
    }
    // out_rates field (handface_train_supervised) 우선, 폴백 rates.
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
    // Session 42+ Phase 15-23: HIPPO/PFC/AMG/BG/CRB/THAL 노드는 buildGrownNeuronNode 가 자체 처리.
    if (name.startsWith('ca3_') || name.startsWith('ca1_') || name.startsWith('dg_')
        || name.startsWith('place_') || name.startsWith('grid_')
        || name.startsWith('ec_ii_') || name.startsWith('ec_iii_') || name.startsWith('ec_v_')
        || name.startsWith('pfc_l23_') || name.startsWith('pfc_l5_')
        || name.startsWith('amg_')
        || name.startsWith('str_d1_') || name.startsWith('str_d2_') || name.startsWith('tail_str_')
        || name.startsWith('grc_') || name.startsWith('pc_') || name.startsWith('dcn_')
        || name.startsWith('io_')
        || name.startsWith('th_') || name.startsWith('trn_')
        || name.startsWith('ast_')
        || name.startsWith('amn_') || name.startsWith('rc_')
        || name.startsWith('lc_') || name.startsWith('bf_') || name.startsWith('raphe_')
        || name.startsWith('v4_l4_') || name.startsWith('v4_l5_') || name.startsWith('v4_color_')
        || name.startsWith('it_l4_') || name.startsWith('it_l5_')
        || name.startsWith('v3_') || name.startsWith('mt_') || name.startsWith('ppc_')
        || name.startsWith('ipl_') || name.startsWith('f5_') || name.startsWith('tpj_') || name.startsWith('fef_')
        || name.startsWith('wern_') || name.startsWith('broca_')
        || name.startsWith('a1_') || name.startsWith('a2_') || name.startsWith('s1_') || name.startsWith('m1_')
        || name.startsWith('cun_') || name.startsWith('lin_')
        || name.startsWith('lgn_') || name.startsWith('pul_') || name.startsWith('stn_')
        || name.startsWith('hb_') || name.startsWith('sc_') || name.startsWith('ofc_')
        || name.startsWith('snc_') || name.startsWith('atn_') || name.startsWith('mb_')
        || name.startsWith('caud_') || name.startsWith('put_') || name.startsWith('gpe_') || name.startsWith('gpi_')
        || name.startsWith('cbverm_') || name.startsWith('cbhemi_') || name.startsWith('cbfloc_')
        || name.startsWith('rsc_')
        || name.startsWith('presma_') || name.startsWith('sma_') || name.startsWith('pmd_') || name.startsWith('pmv_')
        || name.startsWith('subic_') || name.startsWith('phc_') || name.startsWith('prc_')
        || name.startsWith('ai_') || name.startsWith('pi_')
        || name.startsWith('ot_') || name.startsWith('bnst_')
        || name.startsWith('dlpfc_') || name.startsWith('vmpfc_')
        || name.startsWith('dacc_') || name.startsWith('vacc_')
        || name.startsWith('bla_') || name.startsWith('cen_') || name.startsWith('amgmed_')
        || name.startsWith('dg_') || name.startsWith('ca2_')
        || name.startsWith('v1_L23a_') || name.startsWith('v1_L23b_') || name.startsWith('a1c_')
        || name.startsWith('v2_L23a_') || name.startsWith('v2_L23b_')
        || name.startsWith('teo_') || name.startsWith('te_anterior_')
        || name.startsWith('s1f_') || name.startsWith('mso_') || name.startsWith('lso_')
        || name.startsWith('v4rgb_') || name.startsWith('scs_') || name.startsWith('sci_') || name.startsWith('scd_')
        || name.startsWith('vta_') || name.startsWith('nacc_')
        || name.startsWith('ins_') || name.startsWith('acc_')
        || name.startsWith('ob_') || name.startsWith('pir_')
        || name.startsWith('pag_') || name.startsWith('pons_')
        || name.startsWith('mpfc_') || name.startsWith('pcc_') || name.startsWith('ag_')
        || name.startsWith('hyp_') || name.startsWith('vlpo_') || name.startsWith('rf_')
        || name.startsWith('ai_') || name.startsWith('dacc_')) {
      const node = buildGrownNeuronNode({ name }, 0);
      if (node) result.push(node);
      continue;
    }
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

// Session 39: Canvas loading overlay show/hide.
function setCanvasLoading(visible) {
  const el = document.getElementById('nf-canvas-loading');
  if (!el) return;
  if (visible) el.classList.remove('nf-canvas-loading--hidden');
  else el.classList.add('nf-canvas-loading--hidden');
}

// Session 39 fix: fit-complete 이벤트로 정확한 hide timing — 자동 축소/center 완료 직후.
// fallback timeout 도 유지 (이벤트 미발생 시 1.5s 후 강제 hide).
let _canvasLoadingFallbackTimer = null;
function scheduleCanvasLoadingHide() {
  if (_canvasLoadingFallbackTimer) clearTimeout(_canvasLoadingFallbackTimer);
  _canvasLoadingFallbackTimer = setTimeout(() => {
    setCanvasLoading(false);
    _canvasLoadingFallbackTimer = null;
  }, 1500);
}
window.addEventListener('snn-canvas:fit-complete', () => {
  if (_canvasLoadingFallbackTimer) {
    clearTimeout(_canvasLoadingFallbackTimer);
    _canvasLoadingFallbackTimer = null;
  }
  setCanvasLoading(false);
});

function mountCanvasForMode() {
  setCanvasLoading(true);
  scheduleCanvasLoadingHide();
  if (canvasMode === 'region') {
    initCanvas('nf-snn-canvas');
  } else {
    // Session 36: synapses fallback chain (lastFireResponse → state.synapses → []).
    const synapses = lastFireResponse?.synapses
      || (Array.isArray(state.synapses) ? state.synapses : [])
      || [];
    // Phase 7: synapse 리스트에서 grown 뉴런 추출 + 시각화.
    const dynamicNeurons = buildDynamicNeuronsFromSynapses(synapses);
    // Session 38/39: 사용자 추가 INPUT/OUTPUT 노드를 canvas에 추가.
    const userInputs = state.userInputs || [];
    const userInputNodes = userInputs.map((ui, idx) => buildUserInputNode(ui, idx));
    const userOutputs = state.userOutputs || [];
    const userOutputNodes = userOutputs.map((uo, idx) => buildUserOutputNode(uo, idx));
    initCanvasNeuron('nf-snn-canvas', synapses, [...dynamicNeurons, ...userInputNodes, ...userOutputNodes]);
    // Session 38 PR-K: 사용자 노드 inline widget event wiring.
    setTimeout(wireUserInputNodeHandlers, 50);
    // Session 39 revised: routed_to 제거 — dim 시각화 비활성. 학습 진척은 path_strength 로 표시.
  }
  applyFireToCanvas();
}

// Session 39: 활성 라우팅 기준으로 비라우팅 OUT 노드에 dim 클래스 적용.
function applyRoutedDimming() {
  const routedTargets = new Set(
    (state.userInputs || []).map(ui => ui.routed_to).filter(Boolean)
  );
  // routed_to 사용자 없으면 dim 제거.
  const dimAll = routedTargets.size === 0;
  // 모든 OUT 노드 (system + user) 순회.
  document.querySelectorAll('.snn-canvas-neuron[class*="snn-canvas-node-out_"], .snn-canvas-neuron[class*="snn-canvas-node-user_out_"]').forEach(el => {
    const m = el.className.match(/snn-canvas-node-(out_\d+|user_out_\d+)/);
    if (!m) return;
    const name = m[1];
    if (dimAll) {
      el.classList.remove('snn-canvas-neuron--routed-dim');
    } else if (routedTargets.has(name)) {
      el.classList.remove('snn-canvas-neuron--routed-dim');
    } else {
      el.classList.add('snn-canvas-neuron--routed-dim');
    }
  });
}

// Session 38 PR-K: 사용자 노드 inline widget 핸들러 — modality별 capture/encode + inject_pattern.
async function captureMicTo8Bin(durationSec = 1) {
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    return { ok: false, reason: `마이크 거부: ${err.message}` };
  }
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source   = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  const bins = new Uint8Array(analyser.frequencyBinCount);
  const samples = Math.max(1, Math.round(durationSec * 30));
  const accumulator = new Float32Array(32);
  for (let i = 0; i < samples; i += 1) {
    analyser.getByteFrequencyData(bins);
    for (let j = 0; j < 32; j += 1) accumulator[j] += bins[j];
    await new Promise(r => setTimeout(r, 33));
  }
  stream.getTracks().forEach(t => t.stop());
  audioCtx.close();
  const pattern = new Array(8).fill(0);
  for (let b = 0; b < 8; b += 1) {
    let sum = 0;
    for (let k = 0; k < 4; k += 1) sum += accumulator[b * 4 + k] / samples;
    pattern[b] = sum / 4 / 255;
  }
  const max = Math.max(...pattern);
  if (max > 0) for (let i = 0; i < 8; i += 1) pattern[i] /= max;
  return { ok: true, pattern };
}

function textTo8Bin(str) {
  const counts = new Array(8).fill(0);
  if (!str) return counts;
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    counts[code & 7] += 1;
  }
  const max = Math.max(...counts);
  return max > 0 ? counts.map(c => c / max) : counts;
}

function paintUserInputBins(nodeId, pattern) {
  const container = document.getElementById(`snn-user-bins-${nodeId}`);
  if (!container) return;
  const bins = container.querySelectorAll('.snn-canvas-user-bin');
  bins.forEach((el, i) => {
    el.style.height = `${Math.round((pattern[i] || 0) * 100)}%`;
  });
}

// Session 39: 미니멀 상태 표시 — 짧은 메시지 + 발화/실패 시 시각 효과 + 자동 복귀.
const _statusRevertTimers = {};
function setUserInputStatus(nodeId, msg, kind = '') {
  const el = document.getElementById(`snn-user-status-${nodeId}`);
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('fired', 'failed');
  if (kind) el.classList.add(kind);
  // pulse animation 재시작 (DOM reflow 유발).
  if (kind === 'fired') {
    void el.offsetWidth;
  }
  // 자동 복귀: fired/failed → 2.5s 후 '대기' 무상태.
  if (_statusRevertTimers[nodeId]) clearTimeout(_statusRevertTimers[nodeId]);
  if (kind === 'fired' || kind === 'failed') {
    _statusRevertTimers[nodeId] = setTimeout(() => {
      el.textContent = '대기';
      el.classList.remove('fired', 'failed');
      delete _statusRevertTimers[nodeId];
    }, 2500);
  }
}

let _userNodeHandlersBound = false;
function wireUserInputNodeHandlers() {
  // Document-level handlers — 단일 등록 (canvas remount 영향 X).
  if (_userNodeHandlersBound) return;

  // Session 38 PR-K (강화): drawflow 가 노드 mousedown 을 drag 시작으로 가로채는
  // 문제 해결을 capture phase 로 강화.
  const interactiveSelector = '.snn-canvas-user-input, .snn-canvas-user-btn, .snn-canvas-user-card input, .snn-canvas-user-card button';
  const stopForWidget = (ev) => {
    const t = ev.target;
    if (t && t.closest && t.closest(interactiveSelector.split(',').join(',').trim())) {
      ev.stopPropagation();
      if (typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
    }
  };
  document.addEventListener('mousedown',  stopForWidget, true);
  document.addEventListener('pointerdown', stopForWidget, true);
  document.addEventListener('touchstart', stopForWidget, { capture: true, passive: true });
  document.addEventListener('click', (ev) => {
    const t = ev.target;
    if (t && t.closest && t.closest('.snn-canvas-user-card input')) {
      ev.stopPropagation();
    }
  }, true);
  // Document-level click delegation — canvas remount 영향 없음.
  // 이전 버전 buggy: const root 선언 제거됐는데 root.addEventListener 사용 →
  // ReferenceError 로 전체 함수 throw → 모든 handler 미등록 (Text encode/inject 무반응 root cause).
  document.addEventListener('click', async (ev) => {
    const btn = ev.target.closest && ev.target.closest('.snn-canvas-user-btn');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const nodeId = btn.getAttribute('data-node');
    if (!nodeId) return;
    const backend = window.__neuronfaceBackend;
    if (!backend) {
      setUserInputStatus(nodeId, '⚠ backend', 'failed');
      console.warn('[user-node] backend not initialized');
      return;
    }
    console.debug('[user-node] click', { action, nodeId });
    btn.disabled = true;
    try {
      if (action === 'capture' && btn.getAttribute('data-kind') === 'audio') {
        setUserInputStatus(nodeId, '🎤 capturing…');
        const cap = await captureMicTo8Bin(1);
        if (!cap.ok) {
          setUserInputStatus(nodeId, '⚠ mic 거부', 'failed');
          return;
        }
        paintUserInputBins(nodeId, cap.pattern);
        const r = await backend.injectUserInputPattern(nodeId, cap.pattern, { intensity: 1.0 });
        if (r.ok) {
          setUserInputStatus(nodeId, '⚡ injected', 'fired');
        } else {
          console.warn('[user-node audio] inject failed:', r);
          setUserInputStatus(nodeId, '⚠ 실패', 'failed');
        }
      } else if (action === 'edit-node' || action === 'edit-text') {
        // Session 39: 모든 modality 통일 — kind 별 dialog (text/audio/custom 등).
        const kindAttr = btn.getAttribute('data-kind') || 'custom';
        btn.disabled = false;
        await openUserInputDialog({ nodeId, label: nodeId, kind: kindAttr });
        return;
      } else if (action === 'edit-out') {
        // Session 39+: USER OUT 노드 카드 클릭 → action_config 편집 dialog.
        // user_in 의 ✏️ 편집과 동일한 UX — 노드 자체에서 결과값 셋팅 가능.
        btn.disabled = false;
        const uo = (state.userOutputs || []).find(u => u.name === nodeId);
        if (!uo) return;
        const newCfg = await openActionConfigDialog(uo.kind, uo.label, uo.action_config);
        if (!newCfg) return;
        // Optimistic update — frontend state 즉시 반영 (action callback 이 새 cfg 사용).
        uo.action_config = newCfg;
        if (typeof window.__nfSaveUserOutputsLocal === 'function') window.__nfSaveUserOutputsLocal();
        const backend2 = window.__neuronfaceBackend;
        if (backend2) {
          // backend best-effort — 실패해도 frontend 동작에 영향 없음.
          await backend2.updateUserOutputConfig(nodeId, newCfg).catch(() => null);
        }
        // 우측 패널 list 갱신 (cfgPreview 텍스트).
        if (typeof window.__nfRefreshUserOutputListFromState === 'function') {
          window.__nfRefreshUserOutputListFromState();
        }
        // 캔버스 카드 cfgPreview 도 갱신 — neuron 모드에서 remount.
        if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        return;
      } else if (action === 'encode-text') {
        const input = document.getElementById(`snn-user-input-${nodeId}`);
        const text = (input?.value || '').trim();
        if (!text) {
          setUserInputStatus(nodeId, '⚠ 텍스트 필요', 'failed');
          return;
        }
        const pattern = textTo8Bin(text);
        paintUserInputBins(nodeId, pattern);
        setUserInputStatus(nodeId, '📝 encoding…');
        const r = await backend.injectUserInputPattern(nodeId, pattern, { intensity: 1.0 });
        if (r.ok) {
          setUserInputStatus(nodeId, '⚡ injected', 'fired');
        } else {
          console.warn('[user-node encode-text] inject failed:', r);
          setUserInputStatus(nodeId, '⚠ 실패', 'failed');
        }
      } else if (action === 'inject-direct') {
        setUserInputStatus(nodeId, 'injecting…');
        const r = await backend.injectUserInput(nodeId, { weight: 50, durationMs: 5 });
        if (r.ok) {
          setUserInputStatus(nodeId, '⚡ injected', 'fired');
        } else {
          console.warn('[user-node inject-direct] failed:', r);
          setUserInputStatus(nodeId, '⚠ 실패', 'failed');
        }
      }
    } catch (err) {
      console.error('[user-node] handler error:', err);
      setUserInputStatus(nodeId, '⚠ 에러', 'failed');
    } finally {
      btn.disabled = false;
    }
  });

  _userNodeHandlersBound = true;
  console.debug('[user-node] document-level click handler bound');
}

// Session 39: 노드 모달리티별 입력 dialog 열기. 모바일 친화 widget + Inject 버튼.
async function openUserInputDialog({ nodeId, label, kind }) {
  const backend = window.__neuronfaceBackend;
  if (!backend) return;
  // 정확한 라벨 — state.userInputs 에서 lookup.
  const ui = (state.userInputs || []).find(u => u.name === nodeId);
  if (ui?.label) label = ui.label;
  if (ui?.kind) kind = ui.kind;
  const kindIcon = { audio: '🎤', text: '📝', custom: '⚙️', image: '🖼️', motion: '📱', keyboard: '⌨️', mouse: '🖱️', geo: '📍', eeg: '🧠' };
  const icon = kindIcon[kind] || '⚙️';
  const binsHTML = `<div class="nf-dialog-node-bins" id="nf-dlg-bins">${Array.from({length:8}).map((_,i)=>`<span class="nf-dialog-node-bin" data-bin="${i}"></span>`).join('')}</div>`;
  const statusHTML = `<div class="nf-dialog-node-status" id="nf-dlg-status">대기</div>`;
  // Session 39 revised: dialog 안에서 Quick Learn 직접 수행 — To OUTPUT 선택 + Train/Test.
  const targetOptions = [
    ...(state.userOutputs || []).map(uo => ({ name: uo.name, label: `${uo.label} (사용자 액션)` })),
    { name: 'out_0', label: 'out_0 — Pointing (시스템)' },
    { name: 'out_1', label: 'out_1 — Open palm (시스템)' },
    { name: 'out_2', label: 'out_2 — Thumbs up (시스템)' },
    { name: 'out_3', label: 'out_3 — Victory (시스템)' },
  ];
  const targetOptionsHTML = targetOptions.map(o =>
    `<option value="${o.name}">${o.label}</option>`
  ).join('');
  const learnHTML = `
    <hr style="margin:14px 0 8px;border:none;border-top:1px solid rgba(167,139,250,0.18);">
    <p style="margin:6px 0;font-size:11px;color:#94a3b8;">정답 OUTPUT (학습 target) — STDP 로 이 OUT 으로 발화하도록 강화</p>
    <select id="nf-dlg-learn-target" class="nf-multimodal-select" style="width:100%;padding:8px 10px;font-size:13px;">
      <option value="">(선택 — 정답 OUT 지정 시 Train 가능)</option>
      ${targetOptionsHTML}
    </select>
    <div style="display:flex;gap:6px;margin-top:8px;align-items:center;">
      <span style="font-size:11px;color:#94a3b8;">Rounds</span>
      <select id="nf-dlg-learn-rounds" class="nf-multimodal-select" style="flex:1;padding:6px 8px;font-size:12px;">
        <option value="10">10×</option>
        <option value="20">20×</option>
        <option value="30" selected>30× (권장)</option>
        <option value="50">50×</option>
        <option value="100">100×</option>
      </select>
    </div>
    <div id="nf-dlg-learn-status" style="margin-top:8px;font-size:11px;color:rgba(255,255,255,0.5);min-height:14px;"></div>
  `;
  let bodyHTML, primaryLabel, action;
  if (kind === 'text') {
    bodyHTML = `<p>텍스트 입력 → Train (정답 OUT 학습) 또는 Inject (학습 결과 검증).</p>`
      + `<input id="nf-dlg-text" type="text" placeholder="입력할 텍스트" maxlength="64" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />`
      + binsHTML + statusHTML + learnHTML;
    primaryLabel = '📝 Encode + inject';
    action = 'text';
  } else if (kind === 'audio') {
    bodyHTML = `<p>마이크 1초 capture 후 Train (학습) 또는 Inject (검증).</p>`
      + binsHTML + statusHTML + learnHTML;
    primaryLabel = '🎤 Capture + inject';
    action = 'audio';
  } else if (kind === 'eeg') {
    // 8-band EEG — mood preset 선택 + WebSocket stream (옵션). bins = δ-γ 시각화.
    const moodOptions = Object.keys(EEG_MOOD_PRESETS).map(m => `<option value="${m}">${m}</option>`).join('');
    bodyHTML = `<p>EEG 8-band (δ θ α β₁ β₂ γ₁ γ₂ γ₃). Mock mood preset 선택 또는 실제 stream (WebSocket: Muse / OpenBCI).</p>
      <div style="display:flex;gap:6px;margin-top:6px;align-items:center;">
        <span style="font-size:11px;color:#94a3b8;flex:0 0 50px;">Mood</span>
        <select id="nf-dlg-eeg-mood" class="nf-multimodal-select" style="flex:1;padding:6px 8px;font-size:12px;">${moodOptions}</select>
        <button id="nf-dlg-eeg-mock" type="button" style="padding:5px 10px;font-size:11px;background:rgba(167,139,250,0.18);color:#e9e2ff;border:1px solid rgba(167,139,250,0.45);border-radius:3px;cursor:pointer;">🎲 Mock</button>
      </div>
      <div style="display:flex;gap:6px;margin-top:6px;align-items:center;">
        <span style="font-size:11px;color:#94a3b8;flex:0 0 50px;">Stream</span>
        <input id="nf-dlg-eeg-ws" type="text" placeholder="ws://localhost:7777 (Muse) 또는 8765 (OpenBCI)" style="flex:1;padding:6px 8px;font-size:11px;" autocomplete="off" />
        <button id="nf-dlg-eeg-conn" type="button" style="padding:5px 10px;font-size:11px;background:rgba(16,185,129,0.12);color:#a7f3d0;border:1px solid rgba(167,243,208,0.30);border-radius:3px;cursor:pointer;">🔌</button>
      </div>
      <div id="nf-dlg-eeg-info" style="margin-top:6px;font-size:10px;color:#94a3b8;min-height:14px;">Mock 또는 stream 선택. Inject 시 현재 패턴이 user_in 노드로 전송.</div>`
      + binsHTML + statusHTML + learnHTML;
    primaryLabel = '🧠 EEG inject';
    action = 'eeg';
  } else {
    bodyHTML = `<p>${kind} modality — Train (학습) 또는 Inject (직접 자극).</p>`
      + statusHTML + learnHTML;
    primaryLabel = '▶ Inject (50w)';
    action = 'direct';
  }
  // EEG-specific helper: 현재 dialog 의 active 패턴 결정 (mock or live stream).
  let _currentEegPattern = null;
  function currentEegPatternFromDialog() {
    if (_eegWs && _eegLastFrame) return _eegLastFrame;  // live stream priority.
    if (_currentEegPattern) return _currentEegPattern;
    // 처음 접근 — mood 기반 mock.
    const mood = document.getElementById('nf-dlg-eeg-mood')?.value || 'awake';
    _currentEegPattern = generateMockEeg(mood);
    paintDialogBins(_currentEegPattern);
    return _currentEegPattern;
  }

  const dialogPromise = openDialog({
    title: `${icon} ${label} (${kind})`,
    bodyHTML,
    buttons: [
      { label: '닫기', kind: 'cancel', value: false },
      // Train — supervised STDP N rounds with target OUT.
      { label: '🎓 Train', kind: 'cancel', onClick: async () => {
        const learnTarget = document.getElementById('nf-dlg-learn-target')?.value;
        const learnRounds = parseInt(document.getElementById('nf-dlg-learn-rounds')?.value || '30', 10);
        const learnStatus = document.getElementById('nf-dlg-learn-status');
        if (!learnTarget) {
          if (learnStatus) learnStatus.textContent = '⚠ 정답 OUT 선택 필요';
          return undefined;
        }
        // pattern 결정 — modality 별.
        let pattern;
        if (action === 'text') {
          const t = (document.getElementById('nf-dlg-text')?.value || '').trim();
          if (!t) {
            if (learnStatus) learnStatus.textContent = '⚠ 텍스트 입력 필요';
            return undefined;
          }
          pattern = textTo8Bin(t);
        } else if (action === 'audio') {
          if (learnStatus) learnStatus.textContent = '🎤 mic capture (학습 패턴)…';
          const cap = await captureMicTo8Bin(1);
          if (!cap.ok) { if (learnStatus) learnStatus.textContent = `⚠ ${cap.reason}`; return undefined; }
          pattern = cap.pattern;
          paintDialogBins(pattern);
        } else if (action === 'eeg') {
          pattern = currentEegPatternFromDialog();
          paintDialogBins(pattern);
        } else {
          pattern = [0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9];
        }
        if (learnStatus) learnStatus.textContent = `🎓 학습 0/${learnRounds}…`;
        let okCount = 0;
        for (let i = 0; i < learnRounds; i++) {
          const r = await backend.injectUserInputPattern(nodeId, pattern, {
            intensity: 1.5, stdp: true, targetOut: learnTarget,
          });
          if (r.ok) okCount++;
          if (learnStatus && (i + 1) % 5 === 0) learnStatus.textContent = `🎓 학습 ${i+1}/${learnRounds}…`;
        }
        // path strength 측정.
        let pathInfo = '';
        try {
          const ps = await backend.getUserInputPathStrength(nodeId);
          if (ps?.ok && ps.path_strengths) {
            const targetPS = ps.path_strengths[learnTarget] || 0;
            const others = Object.entries(ps.path_strengths).filter(([k]) => k !== learnTarget).map(([_,v]) => v);
            const avg = others.length ? others.reduce((a,b)=>a+b,0)/others.length : 0;
            pathInfo = ` | 경로강도 target=${targetPS.toFixed(0)} vs others avg=${avg.toFixed(0)}`;
          }
        } catch (_) {}
        if (learnStatus) learnStatus.textContent = `✓ 학습 ${okCount}/${learnRounds}${pathInfo}`;
        // dialog 유지 (학습 후 추가 학습/Test/Inject 가능).
        return undefined;
      }},
      // Test — STDP off, supervisor 없이 inject. 학습 결과 winner 검증.
      { label: '🧪 Test', kind: 'cancel', onClick: async () => {
        const learnTarget = document.getElementById('nf-dlg-learn-target')?.value;
        const learnStatus = document.getElementById('nf-dlg-learn-status');
        let pattern;
        if (action === 'text') {
          const t = (document.getElementById('nf-dlg-text')?.value || '').trim();
          if (!t) { if (learnStatus) learnStatus.textContent = '⚠ 텍스트 필요'; return undefined; }
          pattern = textTo8Bin(t);
        } else if (action === 'audio') {
          if (learnStatus) learnStatus.textContent = '🎤 mic capture (test)…';
          const cap = await captureMicTo8Bin(1);
          if (!cap.ok) { if (learnStatus) learnStatus.textContent = `⚠ ${cap.reason}`; return undefined; }
          pattern = cap.pattern;
          paintDialogBins(pattern);
        } else {
          pattern = [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9];
        }
        const r = await backend.injectUserInputPattern(nodeId, pattern, { intensity: 1.0, stdp: false });
        if (!r.ok) { if (learnStatus) learnStatus.textContent = `⚠ ${r.reason}`; return undefined; }
        const rates = r.rates || {};
        const outR = {};
        for (const k in rates) if (k.startsWith('out_') || k.startsWith('user_out_')) outR[k] = rates[k];
        const sorted = Object.entries(outR).sort((a,b) => b[1] - a[1]);
        const winner = sorted[0];
        const winStr = winner ? `${winner[0]}=${winner[1].toFixed(0)}Hz` : '없음';
        const ok = learnTarget && winner && winner[0] === learnTarget;
        if (learnStatus) learnStatus.textContent = `🧪 Test winner=${winStr} ${ok ? '✓ 학습됨' : (learnTarget ? '✗ 더 학습 필요' : '')}`;
        return undefined;  // dialog 유지.
      }},
      { label: primaryLabel, kind: 'primary', onClick: async () => {
        const status = document.getElementById('nf-dlg-status');
        try {
          if (action === 'text') {
            const inp = document.getElementById('nf-dlg-text');
            const text = (inp?.value || '').trim();
            if (!text) { if (status) status.textContent = '텍스트 입력 필요'; return undefined; }
            const pattern = textTo8Bin(text);
            paintDialogBins(pattern);
            if (status) status.textContent = '📝 encoding…';
            // Session 39 fix: text 저장은 inject 호출 BEFORE 실행해야 함. inject 응답
            // 직후 backend.emit('neuron-firing') 이 동기 실행되며 그 안에서 user_out
            // action callback 이 substitute({text}) 호출 → lastInjectedText() 가 NEW
            // 값을 보려면 미리 저장돼야 함.
            window.__lastInjectedTextByNode = window.__lastInjectedTextByNode || {};
            // 가장 최근 entry 가 마지막에 오도록 — 기존 키 삭제 후 재삽입.
            delete window.__lastInjectedTextByNode[nodeId];
            window.__lastInjectedTextByNode[nodeId] = text;
            const r = await backend.injectUserInputPattern(nodeId, pattern, { intensity: 1.0 });
            if (r.ok) {
              setUserInputStatus(nodeId, '⚡ injected', 'fired');
              return true;
            } else {
              if (status) status.textContent = `실패: ${r.reason || ''}`;
              return undefined;
            }
          } else if (action === 'audio') {
            if (status) status.textContent = '🎤 capturing 1s...';
            const cap = await captureMicTo8Bin(1);
            if (!cap.ok) { if (status) status.textContent = cap.reason; return undefined; }
            paintDialogBins(cap.pattern);
            const r = await backend.injectUserInputPattern(nodeId, cap.pattern, { intensity: 1.0 });
            if (r.ok) {
              setUserInputStatus(nodeId, '⚡ injected', 'fired');
              return true;
            } else {
              if (status) status.textContent = `실패: ${r.reason || ''}`;
              return undefined;
            }
          } else if (action === 'eeg') {
            const pattern = currentEegPatternFromDialog();
            paintDialogBins(pattern);
            if (status) status.textContent = '🧠 injecting 8-band EEG...';
            const r = await backend.injectUserInputPattern(nodeId, pattern, { intensity: 1.0 });
            if (r.ok) {
              setUserInputStatus(nodeId, '⚡ injected', 'fired');
              return true;
            } else {
              if (status) status.textContent = `실패: ${r.reason || ''}`;
              return undefined;
            }
          } else {
            if (status) status.textContent = 'injecting...';
            const r = await backend.injectUserInput(nodeId, { weight: 50, durationMs: 5 });
            if (r.ok) {
              setUserInputStatus(nodeId, '⚡ injected', 'fired');
              return true;
            } else {
              if (status) status.textContent = `실패: ${r.reason || ''}`;
              return undefined;
            }
          }
        } catch (err) {
          if (status) status.textContent = `에러: ${err.message || err}`;
          return undefined;
        }
      }},
    ],
  });

  // EEG dialog — Mock + Stream 버튼 wiring (DOM 이 innerHTML 으로 set 된 직후).
  if (action === 'eeg') {
    const mockBtn = document.getElementById('nf-dlg-eeg-mock');
    const connBtn = document.getElementById('nf-dlg-eeg-conn');
    const wsInput = document.getElementById('nf-dlg-eeg-ws');
    const info = document.getElementById('nf-dlg-eeg-info');
    if (mockBtn) {
      mockBtn.addEventListener('click', () => {
        const mood = document.getElementById('nf-dlg-eeg-mood')?.value || 'awake';
        _currentEegPattern = generateMockEeg(mood);
        paintDialogBins(_currentEegPattern);
        if (info) info.textContent = `🎲 mock '${mood}' — δ${(_currentEegPattern[0]*100).toFixed(0)} α${(_currentEegPattern[2]*100).toFixed(0)} β${(_currentEegPattern[3]*100).toFixed(0)} γ${(_currentEegPattern[5]*100).toFixed(0)}`;
      });
      mockBtn.click();  // 초기 mock 1회 자동.
    }
    if (connBtn && wsInput) {
      connBtn.addEventListener('click', async () => {
        if (_eegWs) {
          disconnectEegStream();
          if (info) info.textContent = '🔌 연결 해제됨.';
          connBtn.textContent = '🔌';
          return;
        }
        const url = (wsInput.value || '').trim();
        if (!url) { if (info) info.textContent = '⚠ WebSocket URL 입력 필요.'; return; }
        if (info) info.textContent = `🔌 ${url} 연결 시도...`;
        try {
          await connectEegStream(url);
          if (info) info.textContent = '✓ stream 연결됨 — live frame 수신 대기.';
          connBtn.textContent = '✕';
        } catch (e) {
          if (info) info.textContent = `❌ ${e.message}`;
        }
      });
    }
  }

  await dialogPromise;
}

function paintDialogBins(pattern) {
  const container = document.getElementById('nf-dlg-bins');
  if (!container) return;
  container.querySelectorAll('.nf-dialog-node-bin').forEach((el, i) => {
    el.style.height = `${Math.round((pattern[i] || 0) * 100)}%`;
  });
}

// Session 42+ Tier3-I: EEG modality — 8 frequency bands (BCI 표준 powers).
// 실제 hardware (Muse / OpenBCI) 통합 전까지 mock 생성기로 동작 검증.
// Bands: delta (0.5-4Hz), theta (4-8), alpha (8-13), beta1 (13-20), beta2 (20-30),
//        gamma1 (30-50), gamma2 (50-80), gamma3 (80-100).
const EEG_BANDS = [
  { name: 'δ delta', lo: 0.5, hi: 4 },
  { name: 'θ theta', lo: 4,   hi: 8 },
  { name: 'α alpha', lo: 8,   hi: 13 },
  { name: 'β₁ beta', lo: 13,  hi: 20 },
  { name: 'β₂ beta', lo: 20,  hi: 30 },
  { name: 'γ₁ gam',  lo: 30,  hi: 50 },
  { name: 'γ₂ gam',  lo: 50,  hi: 80 },
  { name: 'γ₃ gam',  lo: 80,  hi: 100 },
];
// 사용자 mood preset → band power 분포 (정규화 0-1).
// awake: 알파 (휴식) + 베타 (집중) 두 봉.
// focused: 베타+감마 dominant (집중·문제풀이).
// relaxed: 알파 dominant + 약한 세타.
// sleepy: 델타+세타 dominant (졸림).
const EEG_MOOD_PRESETS = {
  awake:   [0.20, 0.30, 0.85, 0.65, 0.55, 0.30, 0.15, 0.10],
  focused: [0.10, 0.15, 0.30, 0.80, 0.90, 0.75, 0.55, 0.30],
  relaxed: [0.30, 0.55, 0.95, 0.40, 0.20, 0.10, 0.05, 0.05],
  sleepy:  [0.95, 0.80, 0.40, 0.15, 0.10, 0.05, 0.05, 0.05],
};
function generateMockEeg(mood = 'awake', noise = 0.10) {
  const base = EEG_MOOD_PRESETS[mood] || EEG_MOOD_PRESETS.awake;
  return base.map(v => Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 2 * noise)));
}
// 실제 EEG WebSocket bridge 가 connect 되면 활성화 — 현재는 placeholder.
// Muse: muse-js / Mind Monitor → WebSocket on ws://localhost:7777
// OpenBCI: bci-bridge → WebSocket on ws://localhost:8765
// 메시지 포맷: { bands: [δ, θ, α, β₁, β₂, γ₁, γ₂, γ₃] } 8-dim normalized.
let _eegWs = null;
let _eegLastFrame = null;
function connectEegStream(url) {
  return new Promise((resolve, reject) => {
    try {
      _eegWs = new WebSocket(url);
      const timer = setTimeout(() => {
        try { _eegWs?.close(); } catch (_) {}
        reject(new Error('연결 timeout (3초)'));
      }, 3000);
      _eegWs.onopen = () => { clearTimeout(timer); resolve(true); };
      _eegWs.onerror = (e) => { clearTimeout(timer); reject(new Error('WebSocket 오류')); };
      _eegWs.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          if (Array.isArray(data.bands) && data.bands.length === 8) _eegLastFrame = data.bands;
        } catch (_) {}
      };
      _eegWs.onclose = () => { _eegWs = null; };
    } catch (err) { reject(err); }
  });
}
function disconnectEegStream() {
  try { _eegWs?.close(); } catch (_) {}
  _eegWs = null;
  _eegLastFrame = null;
}

// Session 39: OUT 노드 추가 + 편집 시 action_config dialog (title/body/text/url 입력).
// {text} 토큰: 발화 시 마지막 inject 된 user_in 텍스트로 치환.
// existing 가 있으면 기존 값으로 prefill (편집 mode), 없으면 default (추가 mode).
function escAttr(s) { return String(s ?? '').replace(/"/g, '&quot;'); }
async function openActionConfigDialog(kind, label, existing) {
  const isEdit = !!existing;
  const primaryLabel = isEdit ? '저장' : '추가';
  if (kind === 'notification') {
    const t = existing?.title ?? label;
    const b = existing?.body ?? `입력: {text}`;
    return await openDialog({
      title: `🔔 ${label} — 알림 설정`,
      bodyHTML: `
        <p>알림 제목과 본문. 본문에 <code>{text}</code> 입력 시 발화할 때 마지막 USER INPUT 텍스트로 치환됩니다.</p>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">제목</p>
        <input id="nf-dlg-cfg-title" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${escAttr(t)}" placeholder="알림 제목" />
        <p style="margin-top:10px;font-size:11px;color:#94a3b8;">본문 ({text} 토큰)</p>
        <input id="nf-dlg-cfg-body" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${escAttr(b)}" placeholder="알림 본문" />
      `,
      buttons: [
        { label: '취소', kind: 'cancel', value: null },
        { label: primaryLabel, kind: 'primary', onClick: () => {
          const title = (document.getElementById('nf-dlg-cfg-title')?.value || label).trim();
          const body  = (document.getElementById('nf-dlg-cfg-body')?.value || '').trim();
          return { title: title || label, body: body || `${label} fired` };
        }},
      ],
    });
  }
  if (kind === 'speak') {
    const t = existing?.text ?? `입력: {text}`;
    const v = existing?.voice ?? 'ko-KR';
    return await openDialog({
      title: `🔊 ${label} — TTS 설정`,
      bodyHTML: `
        <p>발화 시 음성 합성으로 읽어줄 텍스트. <code>{text}</code> 토큰 지원.</p>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">텍스트</p>
        <input id="nf-dlg-cfg-text" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${escAttr(t)}" placeholder="읽어줄 문장" />
      `,
      buttons: [
        { label: '취소', kind: 'cancel', value: null },
        { label: primaryLabel, kind: 'primary', onClick: () => {
          const text = (document.getElementById('nf-dlg-cfg-text')?.value || '').trim();
          return { text: text || label, voice: v };
        }},
      ],
    });
  }
  if (kind === 'webhook') {
    const u = existing?.url ?? 'https://example.com/hook';
    return await openDialog({
      title: `🌐 ${label} — Webhook 설정`,
      bodyHTML: `
        <p>발화 시 POST 호출할 URL.</p>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">URL</p>
        <input id="nf-dlg-cfg-url" type="url" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${escAttr(u)}" placeholder="https://..." />
      `,
      buttons: [
        { label: '취소', kind: 'cancel', value: null },
        { label: primaryLabel, kind: 'primary', onClick: () => {
          const url = (document.getElementById('nf-dlg-cfg-url')?.value || '').trim();
          if (!url) return null;
          return { url, method: 'POST', body: existing?.body || { event: label } };
        }},
      ],
    });
  }
  if (kind === 'console') {
    const tag = existing?.tag ?? label;
    const text = existing?.text ?? '입력: {text}';
    return await openDialog({
      title: `📟 ${label} — Console 설정`,
      bodyHTML: `
        <p>발화 시 <code>console.log</code> 출력 — 태그(prefix)와 메시지. <code>{text}</code> 토큰 지원 (마지막 USER INPUT 텍스트 치환).</p>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">태그 (prefix)</p>
        <input id="nf-dlg-cfg-tag" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${escAttr(tag)}" placeholder="ACTION ..." />
        <p style="margin-top:10px;font-size:11px;color:#94a3b8;">메시지 ({text} 토큰)</p>
        <input id="nf-dlg-cfg-text" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${escAttr(text)}" placeholder="입력: {text}" />
      `,
      buttons: [
        { label: '취소', kind: 'cancel', value: null },
        { label: primaryLabel, kind: 'primary', onClick: () => {
          const t = (document.getElementById('nf-dlg-cfg-tag')?.value || '').trim();
          const m = (document.getElementById('nf-dlg-cfg-text')?.value || '').trim();
          return { tag: t || label, text: m || '' };
        }},
      ],
    });
  }
  return existing || {};
}

// Session 42+ Tier2-E: RL feedback prompt — 마지막 fire 결과 winner 에 ✅/❌ 입력.
// reward=+1 → dopamine pulse 2x STDP gain (winner path 강화).
// reward=-1 + 정답 OUT 선택 → 정답 path supervisor pulse + LTD 풍 학습 (re-routing).
let _rlLastWinner = null;
let _rlAutoHideTimer = null;
let _rlFeedbackBound = false;
const RL_WINNER_HZ = 5;
function showRlFeedbackForResponse(r) {
  const panel = document.getElementById('nf-rl-feedback');
  const winnerEl = document.getElementById('nf-rl-feedback-winner');
  if (!panel || !winnerEl) return;
  // user/system OUT 모두 후보. 가장 높은 rate, 최소 RL_WINNER_HZ 이상.
  const out = r.out_rates || {};
  let winner = null, maxRate = 0;
  for (const [k, v] of Object.entries(out)) {
    if (v >= RL_WINNER_HZ && v > maxRate) { maxRate = v; winner = k; }
  }
  if (!winner) {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    _rlLastWinner = null;
    return;
  }
  // user_out 라벨 매핑.
  const uo = (state.userOutputs || []).find(u => u.name === winner);
  const label = uo ? uo.label : winner;
  _rlLastWinner = winner;
  winnerEl.textContent = `${label} (${maxRate.toFixed(0)} Hz)`;
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  if (_rlAutoHideTimer) clearTimeout(_rlAutoHideTimer);
  _rlAutoHideTimer = setTimeout(() => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }, 8000);
  bindRlFeedbackHandlers();
}
function bindRlFeedbackHandlers() {
  if (_rlFeedbackBound) return;
  _rlFeedbackBound = true;
  const correctBtn = document.getElementById('nf-rl-correct');
  const wrongBtn = document.getElementById('nf-rl-wrong');
  const closeBtn = document.getElementById('nf-rl-close');
  const panel = document.getElementById('nf-rl-feedback');
  if (correctBtn) correctBtn.addEventListener('click', async () => {
    if (!_rlLastWinner) return;
    const backend = window.__neuronfaceBackend;
    if (!backend) return;
    correctBtn.disabled = true;
    const r = await backend.sendRlFeedback(+1.0, _rlLastWinner);
    correctBtn.disabled = false;
    panel?.classList.remove('open');
    if (r.ok) {
      // STDP pulse 결과 synapses 동기.
      const snap = await backend.getTrainingSnapshot();
      if (snap.ok && snap.response?.synapses) {
        if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
        else lastFireResponse = { synapses: snap.response.synapses };
        state.synapses = snap.response.synapses;
        if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
      }
    }
  });
  if (wrongBtn) wrongBtn.addEventListener('click', async () => {
    if (!_rlLastWinner) return;
    const backend = window.__neuronfaceBackend;
    if (!backend) return;
    // 정답 OUT 입력 받음.
    const candidates = [
      ...(state.userOutputs || []).map(uo => ({ name: uo.name, label: uo.label })),
      { name: 'out_0', label: 'Pointing' },
      { name: 'out_1', label: 'Open palm' },
      { name: 'out_2', label: 'Thumbs up' },
      { name: 'out_3', label: 'Victory' },
    ].filter(c => c.name !== _rlLastWinner);
    const opts = candidates.map(c => `<option value="${c.name}">${c.label} (${c.name})</option>`).join('');
    const target = await openDialog({
      title: '❌ 틀림 — 정답 OUT 선택',
      bodyHTML: `<p>winner <code>${_rlLastWinner}</code> 가 틀렸습니다. 정답 OUT 을 선택하면 dopamine 음수 pulse + 정답 path supervisor 로 재학습합니다.</p>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">정답 OUT</p>
        <select id="nf-rl-target-sel" class="nf-multimodal-select" style="width:100%;padding:8px 10px;font-size:13px;">
          <option value="">(선택)</option>${opts}
        </select>`,
      buttons: [
        { label: '취소', kind: 'cancel', value: null },
        { label: '재학습', kind: 'primary', onClick: () => document.getElementById('nf-rl-target-sel')?.value || null },
      ],
    });
    if (!target) return;
    panel?.classList.remove('open');
    const r = await backend.sendRlFeedback(-1.0, target);
    if (r.ok) {
      const snap = await backend.getTrainingSnapshot();
      if (snap.ok && snap.response?.synapses) {
        if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
        else lastFireResponse = { synapses: snap.response.synapses };
        state.synapses = snap.response.synapses;
        if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
      }
    }
  });
  if (closeBtn) closeBtn.addEventListener('click', () => {
    panel?.classList.remove('open');
    if (_rlAutoHideTimer) clearTimeout(_rlAutoHideTimer);
  });
}

// Session 42+ Tier2-F: Sequence learning dialog.
// 사용자가 순서 있는 INPUT 시퀀스 (e.g., A→B→C) + 정답 OUT 지정 → triplet STDP 로 학습.
// Markram 1997 / Pfister-Gerstner 2006. 음성 명령 / 제스처 sequence 등 시간 패턴 학습.
async function openSequenceLearnDialog() {
  const backend = window.__neuronfaceBackend;
  if (!backend) return;
  const inputs = (state.userInputs || []);
  if (inputs.length < 2) {
    await dialogAlert('Sequence learning 은 USER INPUT 노드 2개 이상 필요. 라이브러리에서 더 추가해 주세요.', '🎵 Sequence');
    return;
  }
  const targets = [
    ...(state.userOutputs || []).map(uo => ({ name: uo.name, label: `${uo.label} (사용자 액션)` })),
    { name: 'out_0', label: 'out_0 — Pointing (시스템)' },
    { name: 'out_1', label: 'out_1 — Open palm (시스템)' },
    { name: 'out_2', label: 'out_2 — Thumbs up (시스템)' },
    { name: 'out_3', label: 'out_3 — Victory (시스템)' },
  ];
  const inputOptions = inputs.map(ui => {
    const kindIcon = { audio: '🎤', text: '📝', custom: '⚙️', image: '🖼️', motion: '📱', keyboard: '⌨️', mouse: '🖱️', geo: '📍', eeg: '🧠' };
    const ic = kindIcon[ui.kind] || '⚙️';
    return `<option value="${ui.name}">${ic} ${ui.label} (${ui.name})</option>`;
  }).join('');
  const targetOptions = targets.map(t => `<option value="${t.name}">${t.label}</option>`).join('');

  await openDialog({
    title: '🎵 Sequence Learning (시간 순서 학습)',
    bodyHTML: `
      <p>순서 있는 INPUT 시퀀스 (e.g., A→B→C) 를 정답 OUT 으로 매핑. <strong>Triplet STDP</strong> 가 시간 코인시던스를 잡아 sequence-specific path 형성. Markram 1997 / Pfister-Gerstner 2006.</p>
      <p style="margin-top:10px;font-size:11px;color:#94a3b8;">Step 1 (INPUT)</p>
      <select id="nf-seq-1" class="nf-multimodal-select" style="width:100%;padding:8px 10px;font-size:13px;">
        <option value="">(선택)</option>${inputOptions}
      </select>
      <p style="margin-top:8px;font-size:11px;color:#94a3b8;">Step 2 (INPUT)</p>
      <select id="nf-seq-2" class="nf-multimodal-select" style="width:100%;padding:8px 10px;font-size:13px;">
        <option value="">(선택)</option>${inputOptions}
      </select>
      <p style="margin-top:8px;font-size:11px;color:#94a3b8;">Step 3 (INPUT, 선택사항)</p>
      <select id="nf-seq-3" class="nf-multimodal-select" style="width:100%;padding:8px 10px;font-size:13px;">
        <option value="">(없음)</option>${inputOptions}
      </select>
      <p style="margin-top:10px;font-size:11px;color:#94a3b8;">정답 OUT (sequence target)</p>
      <select id="nf-seq-target" class="nf-multimodal-select" style="width:100%;padding:8px 10px;font-size:13px;">
        <option value="">(선택)</option>${targetOptions}
      </select>
      <div style="display:flex;gap:8px;margin-top:8px;align-items:center;">
        <span style="font-size:11px;color:#94a3b8;flex:0 0 60px;">Delay</span>
        <select id="nf-seq-delay" class="nf-multimodal-select" style="flex:1;padding:6px 8px;font-size:12px;">
          <option value="20">20ms (빠름)</option>
          <option value="30" selected>30ms (권장)</option>
          <option value="50">50ms</option>
          <option value="100">100ms (느림)</option>
        </select>
        <span style="font-size:11px;color:#94a3b8;flex:0 0 50px;">Rounds</span>
        <select id="nf-seq-rounds" class="nf-multimodal-select" style="flex:1;padding:6px 8px;font-size:12px;">
          <option value="10" selected>10×</option>
          <option value="20">20×</option>
          <option value="30">30×</option>
          <option value="50">50×</option>
        </select>
      </div>
      <div id="nf-seq-status" style="margin-top:10px;font-size:11px;color:#94a3b8;min-height:18px;">Step 1, 2 (선택 Step 3) + 정답 OUT 선택 후 Train.</div>
    `,
    buttons: [
      { label: '닫기', kind: 'cancel', value: null },
      { label: '🧪 Test', kind: 'secondary', onClick: async () => {
        const items = collectSeqItems();
        if (items.length < 2) { setSeqStatus('⚠ 2개 이상 step 필요.'); return undefined; }
        setSeqStatus(`🧪 sequence 테스트 (stdp off) — ${items.length} steps...`);
        // Test = 1 round, no STDP — single sequence inject 후 winner 측정.
        // train_sequence with rounds=1 is fine, but stdp=triplet 켜진다. simpler: 단일 inject_multi 가 sequence 와 다름.
        // 그냥 train_sequence rounds=1 로 STDP 1번만 발생 (학습 미미).
        const r = await backend.trainSequence(
          items.map(it => ({ name: it.name, weight: 50.0 })),
          document.getElementById('nf-seq-target')?.value,
          { delayMs: parseFloat(document.getElementById('nf-seq-delay')?.value || '30'), rounds: 1 }
        );
        if (!r.ok) { setSeqStatus(`실패: ${r.reason || ''}`); return undefined; }
        const out = r.out_rates || {};
        const winner = Object.entries(out).sort((a, b) => b[1] - a[1])[0];
        setSeqStatus(`✓ winner: ${winner ? `${winner[0]} = ${winner[1].toFixed(0)}Hz` : '없음'}`);
        return undefined;
      }},
      { label: '🎓 Train', kind: 'primary', onClick: async () => {
        const items = collectSeqItems();
        if (items.length < 2) { setSeqStatus('⚠ 2개 이상 step 필요.'); return undefined; }
        const target = document.getElementById('nf-seq-target')?.value;
        if (!target) { setSeqStatus('⚠ 정답 OUT 을 선택해 주세요.'); return undefined; }
        const delayMs = parseFloat(document.getElementById('nf-seq-delay')?.value || '30');
        const rounds = parseInt(document.getElementById('nf-seq-rounds')?.value || '10', 10);
        setSeqStatus(`🎓 학습 ${rounds} rounds × ${items.length} steps (delay ${delayMs}ms)...`);
        const r = await backend.trainSequence(
          items.map(it => ({ name: it.name, weight: 50.0 })),
          target,
          { delayMs, rounds }
        );
        if (!r.ok) { setSeqStatus(`실패: ${r.reason || ''}`); return undefined; }
        // 캔버스 동기.
        if (Array.isArray(r.synapses)) {
          if (lastFireResponse) lastFireResponse.synapses = r.synapses;
          else lastFireResponse = { synapses: r.synapses };
          state.synapses = r.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
        setSeqStatus(`✓ sequence 학습 완료 ${rounds} rounds → ${target}. Test 로 검증해 보세요.`);
        return undefined;
      }},
    ],
  });

  function collectSeqItems() {
    const ids = ['nf-seq-1', 'nf-seq-2', 'nf-seq-3'];
    return ids.map(id => document.getElementById(id)?.value).filter(v => v).map(name => ({ name }));
  }
  function setSeqStatus(msg) {
    const el = document.getElementById('nf-seq-status');
    if (el) el.textContent = msg;
  }
}

// Session 42+ Tier3-G: Circuit Marketplace dialog — D1 shared_circuits 공유.
// Publish (current circuit) / Browse public / My circuits / Import (from circuit_id).
async function openMarketplaceDialog() {
  const backend = window.__neuronfaceBackend;
  if (!backend) return;
  const userEmail = (window.__currentUserEmail) || 'anonymous@local';
  let activeTab = 'browse'; // 'browse' | 'mine' | 'publish' | 'import'

  function tabHeader() {
    const mk = (id, label) =>
      `<button data-tab="${id}" class="nf-mk-tab ${activeTab===id?'active':''}" type="button"
         style="flex:1;padding:6px 8px;font-size:11px;border:none;background:${activeTab===id?'rgba(167,139,250,0.18)':'transparent'};
                color:${activeTab===id?'#e9e2ff':'#94a3b8'};border-radius:3px;cursor:pointer;">
         ${label}
       </button>`;
    return `<div style="display:flex;gap:4px;padding:4px;background:rgba(255,255,255,0.04);border-radius:3px;margin-bottom:10px;">
      ${mk('browse','🌐 Browse')}${mk('mine','👤 My')}${mk('publish','📤 Publish')}${mk('import','🔗 Import by ID')}
    </div>`;
  }
  async function renderTabBody() {
    const body = document.getElementById('nf-mk-body');
    if (!body) return;
    body.innerHTML = `<div style="color:#94a3b8;font-size:11px;">로딩...</div>`;
    if (activeTab === 'browse' || activeTab === 'mine') {
      const r = await listSharedCircuits(activeTab === 'mine' ? { owner: userEmail, limit: 50 } : { limit: 50 });
      if (!r.ok) { body.innerHTML = `<div style="color:#ef4444;font-size:11px;">목록 로드 실패: ${r.reason}</div>`; return; }
      const items = r.circuits || [];
      if (items.length === 0) {
        body.innerHTML = `<div style="color:#94a3b8;font-size:11px;padding:20px;text-align:center;">${
          activeTab==='mine' ? '본인이 publish 한 회로 없음.' : '공유 회로 없음.'}</div>`;
        return;
      }
      body.innerHTML = items.map(c => {
        const date = new Date(c.created_at * 1000).toLocaleDateString();
        const isOwner = c.owner === userEmail;
        return `<div class="nf-mk-row" data-cid="${c.circuit_id}" style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:10px;">
          <div style="flex:1;min-width:0;">
            <div style="font-weight:600;color:#e9e2ff;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(c.name)}</div>
            <div style="font-size:10px;color:#94a3b8;">${escapeHtml(c.owner)} · ${date} · DL ${c.download_count}${c.public ? '' : ' · 🔒 private'}</div>
            ${c.description ? `<div style="font-size:10px;color:#cbd5e1;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(c.description)}</div>` : ''}
          </div>
          <button class="nf-mk-import" data-cid="${c.circuit_id}" type="button"
                  style="padding:4px 10px;font-size:11px;background:rgba(167,139,250,0.18);color:#e9e2ff;border:1px solid rgba(167,139,250,0.45);border-radius:3px;cursor:pointer;">
            Import
          </button>
          ${isOwner ? `<button class="nf-mk-delete" data-cid="${c.circuit_id}" type="button"
                  style="padding:4px 10px;font-size:11px;background:rgba(239,68,68,0.12);color:#fca5a5;border:1px solid rgba(252,165,165,0.30);border-radius:3px;cursor:pointer;">삭제</button>` : ''}
        </div>`;
      }).join('');
      body.querySelectorAll('.nf-mk-import').forEach(b => b.addEventListener('click', async (ev) => {
        const cid = ev.currentTarget.getAttribute('data-cid');
        await importCircuitFromId(cid);
      }));
      body.querySelectorAll('.nf-mk-delete').forEach(b => b.addEventListener('click', async (ev) => {
        const cid = ev.currentTarget.getAttribute('data-cid');
        if (!await dialogConfirm(`'${cid}' 회로를 삭제할까요?`, '회로 삭제')) return;
        const r2 = await deleteSharedCircuit(cid, userEmail);
        if (r2.ok) renderTabBody();
        else await dialogAlert(`실패: ${r2.reason || ''}`, '삭제');
      }));
    } else if (activeTab === 'publish') {
      body.innerHTML = `
        <p style="font-size:11px;color:#94a3b8;">현재 회로(neurons + synapses 통째)를 D1 marketplace 에 publish 합니다.</p>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">이름</p>
        <input id="nf-mk-name" type="text" autocomplete="off" placeholder="My SNN circuit v1" />
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">설명 (선택)</p>
        <input id="nf-mk-desc" type="text" autocomplete="off" placeholder="실험적 회로 — Hippocampus + STDP 학습 완료" />
        <label style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:11px;color:#94a3b8;cursor:pointer;">
          <input id="nf-mk-public" type="checkbox" checked> public list 노출 (해제 시 ID 가진 사람만 import)
        </label>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">Owner 식별: <code>${escapeHtml(userEmail)}</code> (재 publish/삭제 시 동일)</p>
        <button id="nf-mk-publish" type="button"
                style="margin-top:12px;padding:8px 14px;background:rgba(16,185,129,0.18);color:#d1fae5;border:1px solid rgba(167,243,208,0.45);border-radius:3px;cursor:pointer;font-size:12px;">
          📤 Publish 회로
        </button>
        <div id="nf-mk-publish-status" style="margin-top:10px;font-size:11px;color:#94a3b8;"></div>
      `;
      document.getElementById('nf-mk-publish')?.addEventListener('click', async () => {
        const name = (document.getElementById('nf-mk-name')?.value || '').trim();
        const description = (document.getElementById('nf-mk-desc')?.value || '').trim();
        const isPublic = !!document.getElementById('nf-mk-public')?.checked;
        const status = document.getElementById('nf-mk-publish-status');
        if (!name) { if (status) status.textContent = '⚠ 이름 필요.'; return; }
        if (status) status.textContent = '📤 export → publish...';
        const exp = await backend.exportTopology();
        if (!exp.ok) { if (status) status.textContent = `회로 export 실패: ${exp.reason || ''}`; return; }
        const r = await publishCircuitToD1({
          owner: userEmail, name, description,
          neurons: exp.neurons, synapses: exp.synapses,
          meta: { neuron_count: exp.neurons.length, synapse_count: exp.synapses.length, savedAt: Date.now() },
          isPublic,
        });
        if (r.ok) {
          if (status) status.innerHTML = `✓ 공유 완료 — <code style="color:#a7f3d0;">${r.circuit_id}</code> (이 ID 를 다른 사용자에게 전달).`;
        } else {
          if (status) status.textContent = `실패: ${r.reason || ''}`;
        }
      });
    } else if (activeTab === 'import') {
      body.innerHTML = `
        <p style="font-size:11px;color:#94a3b8;">circuit ID 로 직접 import (private 회로도 가능).</p>
        <p style="margin-top:8px;font-size:11px;color:#94a3b8;">Circuit ID</p>
        <input id="nf-mk-id" type="text" autocomplete="off" placeholder="cir_abc123..." />
        <button id="nf-mk-fetch" type="button"
                style="margin-top:10px;padding:6px 12px;background:rgba(167,139,250,0.18);color:#e9e2ff;border:1px solid rgba(167,139,250,0.45);border-radius:3px;cursor:pointer;font-size:12px;">
          🔗 Fetch + Import
        </button>
      `;
      document.getElementById('nf-mk-fetch')?.addEventListener('click', async () => {
        const id = (document.getElementById('nf-mk-id')?.value || '').trim();
        if (!id) return;
        await importCircuitFromId(id);
      });
    }
  }
  async function importCircuitFromId(cid) {
    const ok = await dialogConfirm(
      `'${cid}' 회로를 import 하면 현재 회로가 덮어써집니다 (학습 weight 손실 가능). 진행?`,
      '🔗 Import 회로'
    );
    if (!ok) return;
    const r = await fetchSharedCircuit(cid);
    if (!r.ok) { await dialogAlert(`실패: ${r.reason || ''}`, 'Import'); return; }
    // backend.importTopology 같은 게 없으므로 reset → addNeuron loop → connect 직접 사용 못 함.
    // 간단히: backend 쪽 endpoint 가 있는지 확인 (importTopology), 없으면 안내.
    if (typeof backend.importTopology === 'function') {
      const ir = await backend.importTopology(r.neurons, r.synapses);
      if (ir.ok) {
        await dialogAlert(`✓ ${r.name} import 완료 — ${r.neurons.length} 뉴런 / ${r.synapses.length} 시냅스.`, 'Import');
      } else {
        await dialogAlert(`Backend import 실패: ${ir.reason}`, 'Import');
      }
    } else {
      // fallback: existing JSON import 메커니즘에 위임 — circuit JSON Blob 으로 변환 → 기존 import handler.
      try {
        const blob = new Blob([JSON.stringify({ neurons: r.neurons, synapses: r.synapses, meta: r.meta })], { type: 'application/json' });
        const file = new File([blob], `${cid}.json`, { type: 'application/json' });
        const fileInput = document.getElementById('nf-circuit-import-file');
        if (fileInput) {
          const dt = new DataTransfer();
          dt.items.add(file);
          fileInput.files = dt.files;
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));
          await dialogAlert(`'${r.name}' import 시도됨 (기존 JSON import 핸들러 사용).`, 'Import');
        } else {
          await dialogAlert('백엔드 import 미지원 + JSON import 핸들러 없음. r.json 을 콘솔에 출력합니다.', 'Import');
          console.log('[marketplace import] circuit:', r);
        }
      } catch (e) {
        await dialogAlert(`Import 처리 실패: ${e.message}`, 'Import');
      }
    }
  }

  await openDialog({
    title: '🛒 Circuit Marketplace',
    bodyHTML: `
      ${tabHeader()}
      <div id="nf-mk-body" style="max-height:340px;overflow-y:auto;border:1px solid rgba(255,255,255,0.06);border-radius:3px;padding:6px;">
        <div style="color:#94a3b8;font-size:11px;">로딩...</div>
      </div>
    `,
    buttons: [
      { label: '닫기', kind: 'cancel', value: null },
    ],
  });
  // 탭 클릭 위임.
  document.querySelectorAll('.nf-mk-tab').forEach(t => {
    t.addEventListener('click', () => {
      activeTab = t.getAttribute('data-tab');
      // 헤더 색 갱신.
      document.querySelectorAll('.nf-mk-tab').forEach(x => {
        const sel = x.getAttribute('data-tab') === activeTab;
        x.style.background = sel ? 'rgba(167,139,250,0.18)' : 'transparent';
        x.style.color = sel ? '#e9e2ff' : '#94a3b8';
      });
      renderTabBody();
    });
  });
  renderTabBody();
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
}

// Session 42+ Tier2-D + Phase 20: Brain Builder 통합 dialog (Hippocampus + PFC + Amygdala).
async function buildHippocampusFromToolbar() {
  const backend = window.__neuronfaceBackend;
  if (!backend) return;
  // 캔버스에 존재하는 region 점검 (synapses 기반).
  const synapses = state.synapses || [];
  const names = new Set();
  for (const s of synapses) { names.add(s.pre); names.add(s.post); }
  const hippoExists = [...names].some(n => n.startsWith('ca3_') || n.startsWith('ca1_'));
  const pfcExists   = [...names].some(n => n.startsWith('pfc_'));
  const amgExists   = [...names].some(n => n.startsWith('amg_'));
  const bgExists    = [...names].some(n => n.startsWith('str_d1_') || n.startsWith('str_d2_'));
  const crbExists   = [...names].some(n => n.startsWith('grc_') || n.startsWith('pc_') || n.startsWith('dcn_'));
  const ioExists    = [...names].some(n => n.startsWith('io_'));
  const spinalExists = [...names].some(n => n.startsWith('amn_') || n.startsWith('rc_'));
  const lcExists    = [...names].some(n => n.startsWith('lc_'));
  const bfExists    = [...names].some(n => n.startsWith('bf_'));
  const rapheExists = [...names].some(n => n.startsWith('raphe_'));
  const vsExists    = [...names].some(n => n.startsWith('v4_') || n.startsWith('it_'));
  const dsExists    = [...names].some(n => n.startsWith('v3_') || n.startsWith('mt_') || n.startsWith('ppc_'));
  const audExists   = [...names].some(n => n.startsWith('a1_') || n.startsWith('a2_'));
  const rewardExists= [...names].some(n => n.startsWith('vta_') || n.startsWith('nacc_'));
  const insExists   = [...names].some(n => n.startsWith('ins_'));
  const accExists   = [...names].some(n => n.startsWith('acc_'));
  const olfExists   = [...names].some(n => n.startsWith('ob_') || n.startsWith('pir_'));
  const stemExists  = [...names].some(n => n.startsWith('pag_') || n.startsWith('pons_'));
  const dmnExists   = [...names].some(n => n.startsWith('mpfc_') || n.startsWith('pcc_') || n.startsWith('ag_'));
  const hypExists   = [...names].some(n => n.startsWith('hyp_'));
  const snExists    = [...names].some(n => n.startsWith('ai_') || n.startsWith('dacc_'));
  const mnsExists   = [...names].some(n => n.startsWith('f5_') || n.startsWith('ipl_'));
  const tpjExists   = [...names].some(n => n.startsWith('tpj_'));
  const tailExists  = [...names].some(n => n.startsWith('tail_str_'));
  const fefExists   = [...names].some(n => n.startsWith('fef_'));
  const v4ColorExists = [...names].some(n => n.startsWith('v4_color_'));
  const s1Exists    = [...names].some(n => n.startsWith('s1_'));
  const m1Exists    = [...names].some(n => n.startsWith('m1_'));
  const cunExists   = [...names].some(n => n.startsWith('cun_'));
  const linExists   = [...names].some(n => n.startsWith('lin_'));
  const lgnExists   = [...names].some(n => n.startsWith('lgn_'));
  const pulExists   = [...names].some(n => n.startsWith('pul_'));
  const stnExists   = [...names].some(n => n.startsWith('stn_'));
  const hbExists    = [...names].some(n => n.startsWith('hb_'));
  const scExists    = [...names].some(n => n.startsWith('sc_'));
  const ofcExists   = [...names].some(n => n.startsWith('ofc_'));
  const sncExists   = [...names].some(n => n.startsWith('snc_'));
  const atnExists   = [...names].some(n => n.startsWith('atn_'));
  const mbExists    = [...names].some(n => n.startsWith('mb_'));
  const caudExists  = [...names].some(n => n.startsWith('caud_'));
  const putExists   = [...names].some(n => n.startsWith('put_'));
  const gpExists    = [...names].some(n => n.startsWith('gpe_') || n.startsWith('gpi_'));
  const cbLobExists = [...names].some(n => n.startsWith('cbverm_') || n.startsWith('cbhemi_') || n.startsWith('cbfloc_'));
  const rscExists   = [...names].some(n => n.startsWith('rsc_'));
  const smaExists   = [...names].some(n => n.startsWith('sma_') || n.startsWith('presma_'));
  const pmExists    = [...names].some(n => n.startsWith('pmd_') || n.startsWith('pmv_'));
  const subicExists = [...names].some(n => n.startsWith('subic_'));
  const phcExists   = [...names].some(n => n.startsWith('phc_'));
  const prcExists   = [...names].some(n => n.startsWith('prc_'));
  const aiPiExists  = [...names].some(n => n.startsWith('ai_') || n.startsWith('pi_'));
  const otExists    = [...names].some(n => n.startsWith('ot_'));
  const bnstExists  = [...names].some(n => n.startsWith('bnst_'));
  const pfcSplitExists = [...names].some(n => n.startsWith('dlpfc_') || n.startsWith('vmpfc_'));
  const accSplitExists = [...names].some(n => n.startsWith('dacc_') || n.startsWith('vacc_'));
  const amgSplitExists = [...names].some(n => n.startsWith('bla_') || n.startsWith('cen_') || n.startsWith('amgmed_'));
  const hippoExtExists = [...names].some(n => n.startsWith('dg_') || n.startsWith('ca2_'));
  const v1L23SplitExists = [...names].some(n => n.startsWith('v1_L23a_') || n.startsWith('v1_L23b_'));
  const a1TonoExists = [...names].some(n => n.startsWith('a1c_'));
  const v2L23SplitExists = [...names].some(n => n.startsWith('v2_L23a_') || n.startsWith('v2_L23b_'));
  const itSubdivExists = [...names].some(n => n.startsWith('teo_') || n.startsWith('te_anterior_'));
  const s1SomatoExists = [...names].some(n => n.startsWith('s1f_'));
  const audLocExists = [...names].some(n => n.startsWith('mso_') || n.startsWith('lso_'));
  const v4RgbExists = [...names].some(n => n.startsWith('v4rgb_'));
  const scLayeredExists = [...names].some(n => n.startsWith('scs_') || n.startsWith('sci_') || n.startsWith('scd_'));
  const langExists  = [...names].some(n => n.startsWith('broca_') || n.startsWith('wern_'));
  const vlpoExists  = [...names].some(n => n.startsWith('vlpo_'));
  const rfExists    = [...names].some(n => n.startsWith('rf_'));
  const thalExists  = [...names].some(n => n.startsWith('th_') || n.startsWith('trn_'));

  async function syncCanvas(statusFn, msg) {
    const snap = await backend.getTrainingSnapshot();
    if (snap.ok && snap.response?.synapses) {
      if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
      else lastFireResponse = { synapses: snap.response.synapses };
      state.synapses = snap.response.synapses;
      if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
    }
    if (statusFn && msg) statusFn(msg);
  }

  await openDialog({
    title: '🧠 Brain Builder',
    bodyHTML: `
      <p>피질 위에 추가 region 을 합성합니다 — 학술적으로 검증된 회로.</p>
      <p style="margin-top:10px;font-size:11px;color:#94a3b8;">현재 구축 상태</p>
      <ul style="margin:4px 0 10px;padding-left:18px;font-size:12px;color:#cbd5e1;line-height:1.6;">
        <li>Hippocampus (CA3 recurrent + CA1) — ${hippoExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>PFC (working memory, L23 → L5 recurrent) — ${pfcExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Amygdala (emotional valence) — ${amgExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Basal Ganglia (D1 Go / D2 NoGo) — ${bgExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Cerebellum (GRC + PC + DCN, motor learning) — ${crbExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Thalamus (TH relay + TRN gate, cortico-thalamo loop) — ${thalExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Spinal motor pool (AMN + Renshaw, final common pathway) — ${spinalExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Locus Coeruleus (NE source, arousal/gain) — ${lcExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Basal Forebrain (ACh source, attention) — ${bfExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Raphe Nuclei (5-HT source, mood/inhibition) — ${rapheExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Ventral Stream (V4 + IT, object recognition) — ${vsExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Dorsal Stream (V3 + MT + PPC, where/how pathway) — ${dsExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Auditory Cortex (A1 + A2, sound processing) — ${audExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Reward Circuit (VTA + NAcc, DA source) — ${rewardExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Insula (interoception, salience network) — ${insExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>ACC (conflict monitoring, error detection) — ${accExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Olfactory (OB + Piriform → AMG/HIPPO) — ${olfExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Brainstem (PAG + Pons, autonomic/relay) — ${stemExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>DMN (mPFC + PCC + AG, rest state) — ${dmnExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Hypothalamus (HPA + autonomic) — ${hypExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Salience Network (AI + dACC, DMN↔CEN switch) — ${snExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Mirror Neuron System (F5 + IPL, action understanding) — ${mnsExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>TPJ (theory of mind, mentalizing) — ${tpjExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Striatum tail (habit/automatic pathway) — ${tailExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>FEF (Frontal Eye Field, saccade/attention) — ${fefExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>V4 color sub-region (chromatic processing) — ${v4ColorExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>S1 (Somatosensory Cortex, tactile) — ${s1Exists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>M1 (Primary Motor Cortex) — ${m1Exists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Language (Broca + Wernicke) — ${langExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Sleep/Wake (VLPO flip-flop) — ${vlpoExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Reticular Formation (RAS, arousal) — ${rfExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Cingulate-Hippocampal binding (context binding, ACC↔CA1) — <span style="color:#94a3b8;">connectivity-only (ACC + HIPPO 필요)</span></li>
        <li>Cuneus + Lingual Gyrus (extra-striate, dorsal/ventral split) — ${(cunExists && linExists) ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Pulvinar (thalamic visual attention relay) — ${pulExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>STN (Subthalamic Nucleus, BG hyperdirect NoGo) — ${stnExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>LGN (Lateral Geniculate, retinal relay → V1) — ${lgnExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Habenula (Hb, anti-reward / negative RPE) — ${hbExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Superior Colliculus (SC, orienting reflex / saccade) — ${scExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>OFC (Orbitofrontal Cortex, economic value coding) — ${ofcExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>SNc (Substantia Nigra compacta, nigrostriatal DA) — ${sncExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>ATN (Anterior Thalamic Nucleus, Papez relay) — ${atnExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Mammillary Bodies (Papez circuit junction) — ${mbExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Caudate + Putamen split (cognitive vs motor STR loops) — ${(caudExists && putExists) ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>GPe + GPi (BG output, direct/indirect) — ${gpExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Cerebellar lobules (vermis/hemisphere/flocculus) — ${cbLobExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>RSC (Retrosplenial Cortex, spatial scene + DMN) — ${rscExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>SMA + pre-SMA (internal action sequencing) — ${smaExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Premotor Cortex (PMd dorsal + PMv ventral) — ${pmExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Subiculum (HIPPO output → MB/ATN/NAcc) — ${subicExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>PHC (Parahippocampal, scene context) — ${phcExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>PRC (Perirhinal, object familiarity) — ${prcExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Insula split (AI salience + PI somatic) — ${aiPiExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Olfactory Tubercle (OT, olfactory-reward interface) — ${otExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>BNST (sustained anxiety, extended amygdala) — ${bnstExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>dlPFC + vmPFC split (cognitive vs valuation) — ${pfcSplitExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>dACC + vACC split (cognitive control vs affective) — ${accSplitExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>AMG split (BLA learning + CEN autonomic + Med social) — ${amgSplitExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Hippocampus DG + CA2 (pattern separation + social memory) — ${hippoExtExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>V1 L2/3 split (L23a feedforward + L23b recurrent) — ${v1L23SplitExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>A1 tonotopic map (frequency columns) — ${a1TonoExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>V2 L2/3 split (L23a feedforward + L23b recurrent) — ${v2L23SplitExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>IT subdivision (TEO posterior + TE anterior) — ${itSubdivExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>S1 somatotopic finger map (5 finger columns) — ${s1SomatoExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>Auditory localization (MSO ITD + LSO ILD) — ${audLocExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>V4 RGB columns (red/green/blue selectivity) — ${v4RgbExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
        <li>SC layered (superficial/intermediate/deep) — ${scLayeredExists ? '<span style="color:#10b981;">✓ 구축됨</span>' : '<span style="color:#94a3b8;">미구축</span>'}</li>
      </ul>
      <hr style="margin:10px 0;border:none;border-top:1px solid rgba(167,139,250,0.18);">
      <input id="nf-bb-search" type="search" placeholder="🔍 region 검색 (이름/sub-label, 예: 'hippo' 'BG')" autocomplete="off" style="width:100%;box-sizing:border-box;padding:8px 10px;margin:4px 0 12px;background:rgba(15,23,42,0.55);border:1px solid rgba(167,139,250,0.25);border-radius:6px;color:#e9e2ff;font-size:12px;font-family:inherit;outline:none;">
      <p class="nf-bb-section-label">🚀 Cluster presets (one-click)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-preset-visual" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          👁 Visual Hierarchy<br><span class="nf-bb-btn-sub">LGN+VS+DS+CUN+LIN+V4col+PUL+FEF+SC</span>
        </button>
        <button id="nf-bb-preset-memory" class="nf-bb-btn nf-bb-btn--green" type="button">
          🧬 Memory MTL+Papez<br><span class="nf-bb-btn-sub">Hippo+EC+DG/CA2+SUBIC+PHC+PRC+MB+ATN</span>
        </button>
        <button id="nf-bb-preset-limbic" class="nf-bb-btn nf-bb-btn--orange" type="button">
          🌀 Limbic+Salience<br><span class="nf-bb-btn-sub">ACC+INS+HYP+AMG split+BNST+AI/PI+dACC/vACC</span>
        </button>
        <button id="nf-bb-preset-motor" class="nf-bb-btn nf-bb-btn--red" type="button">
          🤲 Motor+BG<br><span class="nf-bb-btn-sub">BG+CAUD/PUT+GP+STN+M1+SMA+PM+CRB lobules</span>
        </button>
        <button id="nf-bb-smoketest" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🔬 Smoke Test<br><span class="nf-bb-btn-sub">build 메서드 회귀 점검</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🧠 Core regions (canonical)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-hippo" class="nf-bb-btn nf-bb-btn--amber" type="button">
          🟡 Hippocampus<br><span class="nf-bb-btn-sub">CA3 + CA1</span>
        </button>
        <button id="nf-bb-pfc" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🟣 PFC<br><span class="nf-bb-btn-sub">working memory</span>
        </button>
        <button id="nf-bb-amg" class="nf-bb-btn nf-bb-btn--red" type="button">
          🔴 Amygdala<br><span class="nf-bb-btn-sub">emotional gate</span>
        </button>
        <button id="nf-bb-bg" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🔵 Basal Ganglia<br><span class="nf-bb-btn-sub">D1 Go / D2 NoGo</span>
        </button>
        <button id="nf-bb-crb" class="nf-bb-btn nf-bb-btn--green" type="button">
          🟢 Cerebellum<br><span class="nf-bb-btn-sub">GRC + PC + DCN</span>
        </button>
        <button id="nf-bb-thal" class="nf-bb-btn nf-bb-btn--blue" type="button">
          🔷 Thalamus<br><span class="nf-bb-btn-sub">TH relay + TRN gate</span>
        </button>
        <button id="nf-bb-spinal" class="nf-bb-btn nf-bb-btn--yellow" type="button">
          🦾 Spinal Motor<br><span class="nf-bb-btn-sub">AMN + Renshaw</span>
        </button>
        <button id="nf-bb-stem" class="nf-bb-btn nf-bb-btn--red-act" type="button">
          🟥 Brainstem<br><span class="nf-bb-btn-sub">PAG + Pons (autonomic)</span>
        </button>
        <button id="nf-bb-hyp" class="nf-bb-btn nf-bb-btn--pink" type="button">
          🌡 Hypothalamus<br><span class="nf-bb-btn-sub">HPA + autonomic</span>
        </button>
      </div>

      <p class="nf-bb-section-label">👁 Sensory & visual streams</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-lgn" class="nf-bb-btn nf-bb-btn--yellow" type="button">
          🌟 LGN<br><span class="nf-bb-btn-sub">retina → V1 relay</span>
        </button>
        <button id="nf-bb-pulvinar" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🎯 Pulvinar<br><span class="nf-bb-btn-sub">attention relay</span>
        </button>
        <button id="nf-bb-vs" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🔵 Ventral Stream<br><span class="nf-bb-btn-sub">V4 + IT (what)</span>
        </button>
        <button id="nf-bb-ds" class="nf-bb-btn nf-bb-btn--emerald" type="button">
          🟢 Dorsal Stream<br><span class="nf-bb-btn-sub">V3 + MT + PPC (where)</span>
        </button>
        <button id="nf-bb-cunlin" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🌅 Cuneus+Lingual<br><span class="nf-bb-btn-sub">extra-striate</span>
        </button>
        <button id="nf-bb-v4color" class="nf-bb-btn nf-bb-btn--red" type="button">
          🎨 V4 Color<br><span class="nf-bb-btn-sub">chromatic</span>
        </button>
        <button id="nf-bb-fef" class="nf-bb-btn nf-bb-btn--violet" type="button">
          👀 FEF<br><span class="nf-bb-btn-sub">saccade/attention</span>
        </button>
        <button id="nf-bb-sc" class="nf-bb-btn nf-bb-btn--orange" type="button">
          👁 SC<br><span class="nf-bb-btn-sub">orienting / saccade</span>
        </button>
        <button id="nf-bb-aud" class="nf-bb-btn nf-bb-btn--amber2" type="button">
          🔉 Auditory<br><span class="nf-bb-btn-sub">A1 + A2</span>
        </button>
        <button id="nf-bb-olf" class="nf-bb-btn nf-bb-btn--green" type="button">
          🌿 Olfactory<br><span class="nf-bb-btn-sub">OB + Piriform</span>
        </button>
        <button id="nf-bb-s1" class="nf-bb-btn nf-bb-btn--fuchsia" type="button">
          ✋ S1<br><span class="nf-bb-btn-sub">somatosensory</span>
        </button>
        <button id="nf-bb-v1-l23" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🔬 V1 L2/3<br><span class="nf-bb-btn-sub">L23a FF + L23b recur</span>
        </button>
        <button id="nf-bb-a1-tono" class="nf-bb-btn nf-bb-btn--yellow" type="button">
          🎵 A1 tonotopic<br><span class="nf-bb-btn-sub">frequency columns</span>
        </button>
        <button id="nf-bb-v2-l23" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🔬 V2 L2/3<br><span class="nf-bb-btn-sub">L23a FF + L23b recur</span>
        </button>
        <button id="nf-bb-it-subdiv" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🎨 IT subdiv<br><span class="nf-bb-btn-sub">TEO + TE</span>
        </button>
        <button id="nf-bb-s1-finger" class="nf-bb-btn nf-bb-btn--fuchsia" type="button">
          🖐 S1 finger map<br><span class="nf-bb-btn-sub">5 finger columns</span>
        </button>
        <button id="nf-bb-aud-loc" class="nf-bb-btn nf-bb-btn--yellow" type="button">
          📡 Auditory loc<br><span class="nf-bb-btn-sub">MSO ITD + LSO ILD</span>
        </button>
        <button id="nf-bb-v4-rgb" class="nf-bb-btn nf-bb-btn--red" type="button">
          🌈 V4 RGB<br><span class="nf-bb-btn-sub">R/G/B columns</span>
        </button>
        <button id="nf-bb-sc-layered" class="nf-bb-btn nf-bb-btn--orange" type="button">
          🎬 SC layered<br><span class="nf-bb-btn-sub">sup/int/deep</span>
        </button>
        <button id="nf-bb-v1-lateral" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          ↔ V1 lateral<br><span class="nf-bb-btn-sub">L23 horizontal</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🧬 Memory (MTL + Papez)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-hippoext" class="nf-bb-btn nf-bb-btn--green" type="button">
          🌱 DG+CA2<br><span class="nf-bb-btn-sub">pattern sep + social</span>
        </button>
        <button id="nf-bb-subiculum" class="nf-bb-btn nf-bb-btn--green" type="button">
          🏛 Subiculum<br><span class="nf-bb-btn-sub">HIPPO output</span>
        </button>
        <button id="nf-bb-phc" class="nf-bb-btn nf-bb-btn--emerald" type="button">
          🏞 PHC<br><span class="nf-bb-btn-sub">scene context</span>
        </button>
        <button id="nf-bb-prc" class="nf-bb-btn nf-bb-btn--green" type="button">
          🎭 PRC<br><span class="nf-bb-btn-sub">object familiarity</span>
        </button>
        <button id="nf-bb-mb" class="nf-bb-btn nf-bb-btn--green" type="button">
          🧬 MB<br><span class="nf-bb-btn-sub">Mammillary bodies</span>
        </button>
        <button id="nf-bb-atn" class="nf-bb-btn nf-bb-btn--emerald" type="button">
          🔁 ATN<br><span class="nf-bb-btn-sub">Papez relay</span>
        </button>
        <button id="nf-bb-cinghippo" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🔗 ACC↔HIPPO<br><span class="nf-bb-btn-sub">context binding</span>
        </button>
      </div>

      <p class="nf-bb-section-label">💗 Reward & dopamine</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-reward" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          💗 VTA+NAcc<br><span class="nf-bb-btn-sub">mesolimbic DA</span>
        </button>
        <button id="nf-bb-snc" class="nf-bb-btn nf-bb-btn--pink" type="button">
          ⚡ SNc<br><span class="nf-bb-btn-sub">nigrostriatal DA</span>
        </button>
        <button id="nf-bb-habenula" class="nf-bb-btn nf-bb-btn--gray" type="button">
          ⛈ Habenula<br><span class="nf-bb-btn-sub">anti-reward (RPE−)</span>
        </button>
        <button id="nf-bb-ofc" class="nf-bb-btn nf-bb-btn--amber" type="button">
          💰 OFC<br><span class="nf-bb-btn-sub">economic value</span>
        </button>
        <button id="nf-bb-ot" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          🍬 OT<br><span class="nf-bb-btn-sub">olfactory→reward</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🌀 Limbic & salience</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-acc" class="nf-bb-btn nf-bb-btn--fuchsia" type="button">
          🟪 ACC<br><span class="nf-bb-btn-sub">conflict monitor</span>
        </button>
        <button id="nf-bb-accsplit" class="nf-bb-btn nf-bb-btn--emerald" type="button">
          🎚 dACC+vACC<br><span class="nf-bb-btn-sub">control/affect</span>
        </button>
        <button id="nf-bb-ins" class="nf-bb-btn nf-bb-btn--orange" type="button">
          🟠 Insula<br><span class="nf-bb-btn-sub">interoception</span>
        </button>
        <button id="nf-bb-insula" class="nf-bb-btn nf-bb-btn--purple" type="button">
          🌀 AI+PI<br><span class="nf-bb-btn-sub">insula split</span>
        </button>
        <button id="nf-bb-amgsplit" class="nf-bb-btn nf-bb-btn--orange" type="button">
          ⚡ AMG split<br><span class="nf-bb-btn-sub">BLA+CEN+Med</span>
        </button>
        <button id="nf-bb-bnst" class="nf-bb-btn nf-bb-btn--red" type="button">
          😨 BNST<br><span class="nf-bb-btn-sub">sustained anxiety</span>
        </button>
        <button id="nf-bb-sn" class="nf-bb-btn nf-bb-btn--orange" type="button">
          🚦 Salience Network<br><span class="nf-bb-btn-sub">AI+dACC switch</span>
        </button>
        <button id="nf-bb-mns" class="nf-bb-btn nf-bb-btn--green" type="button">
          🪞 Mirror Neurons<br><span class="nf-bb-btn-sub">F5 + IPL</span>
        </button>
        <button id="nf-bb-tpj" class="nf-bb-btn nf-bb-btn--pink" type="button">
          👁 TPJ<br><span class="nf-bb-btn-sub">theory of mind</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🎯 Cognitive control & DMN</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-pfcsplit" class="nf-bb-btn nf-bb-btn--amber2" type="button">
          🧭 dlPFC+vmPFC<br><span class="nf-bb-btn-sub">cognitive/valuation</span>
        </button>
        <button id="nf-bb-dmn" class="nf-bb-btn nf-bb-btn--amber2" type="button">
          🌅 DMN<br><span class="nf-bb-btn-sub">mPFC+PCC+AG</span>
        </button>
        <button id="nf-bb-rsc" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🗺 RSC<br><span class="nf-bb-btn-sub">retrosplenial DMN</span>
        </button>
        <button id="nf-bb-lang" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🗣 Language<br><span class="nf-bb-btn-sub">Broca + Wernicke</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🤲 Motor & BG circuits</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-m1" class="nf-bb-btn nf-bb-btn--red" type="button">
          💪 M1<br><span class="nf-bb-btn-sub">primary motor</span>
        </button>
        <button id="nf-bb-sma" class="nf-bb-btn nf-bb-btn--pink" type="button">
          📋 SMA+preSMA<br><span class="nf-bb-btn-sub">action sequencing</span>
        </button>
        <button id="nf-bb-premotor" class="nf-bb-btn nf-bb-btn--amber" type="button">
          🤲 Premotor<br><span class="nf-bb-btn-sub">PMd + PMv</span>
        </button>
        <button id="nf-bb-caudput" class="nf-bb-btn nf-bb-btn--yellow" type="button">
          🧠 Caud+Put<br><span class="nf-bb-btn-sub">cognitive/motor STR</span>
        </button>
        <button id="nf-bb-tail" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🚶 STR tail<br><span class="nf-bb-btn-sub">habit/automatic</span>
        </button>
        <button id="nf-bb-stn" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          🛑 STN<br><span class="nf-bb-btn-sub">hyperdirect NoGo</span>
        </button>
        <button id="nf-bb-gp" class="nf-bb-btn nf-bb-btn--gray" type="button">
          ⚙ GPe+GPi<br><span class="nf-bb-btn-sub">BG output</span>
        </button>
        <button id="nf-bb-cblob" class="nf-bb-btn nf-bb-btn--orange" type="button">
          🍊 CRB Lobules<br><span class="nf-bb-btn-sub">vermis/hemi/floc</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🟣 Neuromodulators</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-lc" class="nf-bb-btn nf-bb-btn--purple" type="button">
          🟣 Locus Coeruleus<br><span class="nf-bb-btn-sub">NE arousal</span>
        </button>
        <button id="nf-bb-bf" class="nf-bb-btn nf-bb-btn--amber2" type="button">
          🟧 Basal Forebrain<br><span class="nf-bb-btn-sub">ACh attention</span>
        </button>
        <button id="nf-bb-raphe" class="nf-bb-btn nf-bb-btn--pink" type="button">
          🩷 Raphe Nuclei<br><span class="nf-bb-btn-sub">5-HT mood</span>
        </button>
      </div>

      <p class="nf-bb-section-label">📊 Analysis & verification</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-verify-behavior" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🎯 Verify behavior<br><span class="nf-bb-btn-sub">gesture→OUT accuracy</span>
        </button>
        <button id="nf-bb-weight-stats" class="nf-bb-btn nf-bb-btn--purple" type="button">
          ⚖ Weight stats<br><span class="nf-bb-btn-sub">distribution + region pairs</span>
        </button>
        <button id="nf-bb-region-rates" class="nf-bb-btn nf-bb-btn--emerald" type="button">
          🔥 Region rates<br><span class="nf-bb-btn-sub">firing Hz by region</span>
        </button>
        <button id="nf-bb-region-summary" class="nf-bb-btn nf-bb-btn--amber" type="button">
          🗂 Region summary<br><span class="nf-bb-btn-sub">neuron counts</span>
        </button>
        <button id="nf-bb-test-dg" class="nf-bb-btn nf-bb-btn--green" type="button">
          🧩 DG sep test<br><span class="nf-bb-btn-sub">pattern separation</span>
        </button>
        <button id="nf-bb-test-ca3" class="nf-bb-btn nf-bb-btn--green" type="button">
          🔁 CA3 completion<br><span class="nf-bb-btn-sub">cue → recall</span>
        </button>
        <button id="nf-bb-test-binding" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🔗 Cross-modal<br><span class="nf-bb-btn-sub">V1+A1→INS synergy</span>
        </button>
        <button id="nf-bb-test-wta" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🏆 WTA test<br><span class="nf-bb-btn-sub">winner-take-all</span>
        </button>
        <button id="nf-bb-test-da" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          💊 DA effect<br><span class="nf-bb-btn-sub">dopamine on/off</span>
        </button>
        <button id="nf-bb-w-hist" class="nf-bb-btn nf-bb-btn--purple" type="button">
          📊 Weight hist<br><span class="nf-bb-btn-sub">10-bin distribution</span>
        </button>
        <button id="nf-bb-w-snap" class="nf-bb-btn nf-bb-btn--violet" type="button">
          📸 Snapshot Δw<br><span class="nf-bb-btn-sub">STDP learning trace</span>
        </button>
        <button id="nf-bb-conn" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🕸 Connectivity<br><span class="nf-bb-btn-sub">region pair matrix</span>
        </button>
        <button id="nf-bb-energy" class="nf-bb-btn nf-bb-btn--yellow" type="button">
          🔋 Energy cost<br><span class="nf-bb-btn-sub">metabolic estimator</span>
        </button>
        <button id="nf-bb-reset-region" class="nf-bb-btn nf-bb-btn--gray" type="button">
          ✂ Reset region<br><span class="nf-bb-btn-sub">prefix 단위 제거</span>
        </button>
        <button id="nf-bb-raster" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🌠 Raster export<br><span class="nf-bb-btn-sub">spike events JSON</span>
        </button>
        <button id="nf-bb-telemetry" class="nf-bb-btn nf-bb-btn--blue" type="button">
          📡 Telemetry<br><span class="nf-bb-btn-sub">network state</span>
        </button>
        <button id="nf-bb-methods" class="nf-bb-btn nf-bb-btn--gray" type="button">
          📚 Methods<br><span class="nf-bb-btn-sub">API auto-discover</span>
        </button>
        <button id="nf-bb-train-sel" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🎓 Train selectivity<br><span class="nf-bb-btn-sub">STDP 5 epochs</span>
        </button>
        <button id="nf-bb-baseline" class="nf-bb-btn nf-bb-btn--green" type="button">
          📐 Baseline check<br><span class="nf-bb-btn-sub">Phase 2 + Stage 1</span>
        </button>
        <button id="nf-bb-webgpu" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          🚀 WebGPU 진입?<br><span class="nf-bb-btn-sub">benchmark+recommend</span>
        </button>
        <button id="nf-bb-auto-train" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🚂 Auto-train all<br><span class="nf-bb-btn-sub">build+train+validate</span>
        </button>
        <button id="nf-bb-freeze" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🧊 Freeze region<br><span class="nf-bb-btn-sub">prefix STDP gating</span>
        </button>
        <button id="nf-bb-multimodal" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🎭 Multi-modal<br><span class="nf-bb-btn-sub">visual+audio scenario</span>
        </button>
        <button id="nf-bb-randomize" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🎲 Randomize w<br><span class="nf-bb-btn-sub">STDP reset (topology 보존)</span>
        </button>
        <button id="nf-bb-compare-snap" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🔍 Compare snap<br><span class="nf-bb-btn-sub">snapshot vs current</span>
        </button>
        <button id="nf-bb-func-conn" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🌐 Func connectivity<br><span class="nf-bb-btn-sub">co-firing pairs</span>
        </button>
        <button id="nf-bb-raster-plot" class="nf-bb-btn nf-bb-btn--violet" type="button">
          📈 Raster plot<br><span class="nf-bb-btn-sub">spike SVG visualization</span>
        </button>
        <button id="nf-bb-rate-trend" class="nf-bb-btn nf-bb-btn--emerald" type="button">
          📉 Rate trend<br><span class="nf-bb-btn-sub">multi-window 발화율</span>
        </button>
        <button id="nf-bb-top-firing" class="nf-bb-btn nf-bb-btn--red" type="button">
          🔥 Top firing<br><span class="nf-bb-btn-sub">leaderboard</span>
        </button>
        <button id="nf-bb-neuron-conn" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🔌 Neuron conn<br><span class="nf-bb-btn-sub">fanin/fanout 조회</span>
        </button>
        <button id="nf-bb-stdp-region" class="nf-bb-btn nf-bb-btn--violet" type="button">
          📐 STDP/region<br><span class="nf-bb-btn-sub">region pair Δw</span>
        </button>
        <button id="nf-bb-csv" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          📑 Spike CSV<br><span class="nf-bb-btn-sub">external plotting</span>
        </button>
        <button id="nf-bb-region-graph" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🗺 Region graph<br><span class="nf-bb-btn-sub">force-directed input</span>
        </button>
        <button id="nf-bb-reward-train" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          🏆 Reward train<br><span class="nf-bb-btn-sub">gesture→OUT supervised</span>
        </button>
        <button id="nf-bb-test-wm" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🧠 WM persistent<br><span class="nf-bb-btn-sub">PFC delay activity</span>
        </button>
        <button id="nf-bb-forgetting" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🌫 Forgetting<br><span class="nf-bb-btn-sub">passive weight decay</span>
        </button>
        <button id="nf-bb-vtrace" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🌊 V trace<br><span class="nf-bb-btn-sub">single neuron V over time</span>
        </button>
        <button id="nf-bb-psth" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          📊 PSTH<br><span class="nf-bb-btn-sub">peri-stim time histogram</span>
        </button>
        <button id="nf-bb-state-diff" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🔀 State diff<br><span class="nf-bb-btn-sub">topology snapshot diff</span>
        </button>
        <button id="nf-bb-isi" class="nf-bb-btn nf-bb-btn--emerald" type="button">
          📈 ISI stats<br><span class="nf-bb-btn-sub">CV / firing regime</span>
        </button>
        <button id="nf-bb-tune-inh" class="nf-bb-btn nf-bb-btn--orange" type="button">
          ⚖ Tune inhibition<br><span class="nf-bb-btn-sub">prefix E/I balance</span>
        </button>
        <button id="nf-bb-critical" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          🌟 Critical period<br><span class="nf-bb-btn-sub">high-plasticity window</span>
        </button>
        <button id="nf-bb-rpe" class="nf-bb-btn nf-bb-btn--pink" type="button">
          📊 RPE<br><span class="nf-bb-btn-sub">reward prediction error</span>
        </button>
        <button id="nf-bb-e2e" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🎬 E2E demo<br><span class="nf-bb-btn-sub">build+train+verify combo</span>
        </button>
        <button id="nf-bb-rf" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🎯 Receptive field<br><span class="nf-bb-btn-sub">single neuron fanin</span>
        </button>
        <button id="nf-bb-pop-vec" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          📡 Pop decoder<br><span class="nf-bb-btn-sub">gesture from ensemble</span>
        </button>
        <button id="nf-bb-stdp-prefix" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🔧 STDP × prefix<br><span class="nf-bb-btn-sub">per-region gain scaling</span>
        </button>
        <button id="nf-bb-numpy" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          ⚡ NumPy proto<br><span class="nf-bb-btn-sub">Tier 3 prototype</span>
        </button>
        <button id="nf-bb-pfc-delay" class="nf-bb-btn nf-bb-btn--violet" type="button">
          ⏳ PFC delay<br><span class="nf-bb-btn-sub">delay activity (5 groups)</span>
        </button>
        <button id="nf-bb-sparseness" class="nf-bb-btn nf-bb-btn--green" type="button">
          🧪 Sparseness<br><span class="nf-bb-btn-sub">Treves & Rolls</span>
        </button>
        <button id="nf-bb-curve" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          📈 Learning curve<br><span class="nf-bb-btn-sub">selectivity over cycles</span>
        </button>
        <button id="nf-bb-conflict" class="nf-bb-btn nf-bb-btn--red" type="button">
          ⚔ Action conflict<br><span class="nf-bb-btn-sub">2 gesture race</span>
        </button>
        <button id="nf-bb-delay-dist" class="nf-bb-btn nf-bb-btn--blue" type="button">
          ⏱ Delay dist<br><span class="nf-bb-btn-sub">synapse delay histogram</span>
        </button>
        <button id="nf-bb-place-field" class="nf-bb-btn nf-bb-btn--green" type="button">
          📍 Place field<br><span class="nf-bb-btn-sub">CA1 spatial tuning</span>
        </button>
        <button id="nf-bb-theta-gamma" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🌊 θ-γ coupling<br><span class="nf-bb-btn-sub">phase locking index</span>
        </button>
        <button id="nf-bb-rstdp" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          💎 R-STDP<br><span class="nf-bb-btn-sub">eligibility-trace reward</span>
        </button>
        <button id="nf-bb-homeo" class="nf-bb-btn nf-bb-btn--orange" type="button">
          ⚖ Homeo norm<br><span class="nf-bb-btn-sub">target Hz scaling</span>
        </button>
        <button id="nf-bb-tono-test" class="nf-bb-btn nf-bb-btn--yellow" type="button">
          🎶 Tono test<br><span class="nf-bb-btn-sub">A1 column 선택성</span>
        </button>
        <button id="nf-bb-color-test" class="nf-bb-btn nf-bb-btn--red" type="button">
          🎨 Color sel<br><span class="nf-bb-btn-sub">V4 RGB 선택성</span>
        </button>
        <button id="nf-bb-bg-act" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          ⚖ BG D1/D2<br><span class="nf-bb-btn-sub">action go/nogo</span>
        </button>
        <button id="nf-bb-episodic" class="nf-bb-btn nf-bb-btn--green" type="button">
          📚 Episodic<br><span class="nf-bb-btn-sub">HIPPO encode→recall</span>
        </button>
        <button id="nf-bb-lif-sweep" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🧬 LIF τ sweep<br><span class="nf-bb-btn-sub">tau_m vs firing rate</span>
        </button>
        <button id="nf-bb-orient" class="nf-bb-btn nf-bb-btn--violet" type="button">
          📐 V1 orient<br><span class="nf-bb-btn-sub">preferred orientation</span>
        </button>
        <button id="nf-bb-pc" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🔄 Pred coding<br><span class="nf-bb-btn-sub">V2→V1 prediction error</span>
        </button>
        <button id="nf-bb-xreg-sync" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🔗 X-region sync<br><span class="nf-bb-btn-sub">PFC ↔ HIPPO Pearson r</span>
        </button>
        <button id="nf-bb-sig" class="nf-bb-btn nf-bb-btn--amber" type="button">
          🪪 Signature<br><span class="nf-bb-btn-sub">canonical fingerprint</span>
        </button>
        <button id="nf-bb-acg" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          🔁 Autocorr<br><span class="nf-bb-btn-sub">single neuron periodicity</span>
        </button>
        <button id="nf-bb-entropy" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🎲 Entropy<br><span class="nf-bb-btn-sub">Shannon (bits)</span>
        </button>
        <button id="nf-bb-aval" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          ⚡ Avalanche<br><span class="nf-bb-btn-sub">criticality dist</span>
        </button>
        <button id="nf-bb-sta" class="nf-bb-btn nf-bb-btn--green" type="button">
          🎯 STA<br><span class="nf-bb-btn-sub">spike-triggered avg</span>
        </button>
        <button id="nf-bb-paper" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          📄 Paper export<br><span class="nf-bb-btn-sub">all-in-one bundle</span>
        </button>
        <button id="nf-bb-seed" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🎰 Seed lock<br><span class="nf-bb-btn-sub">deterministic</span>
        </button>
        <button id="nf-bb-dash" class="nf-bb-btn nf-bb-btn--ocean" type="button">
          🖥 Dashboard<br><span class="nf-bb-btn-sub">one-call status</span>
        </button>
        <button id="nf-bb-report" class="nf-bb-btn nf-bb-btn--violet" type="button">
          📝 Auto report<br><span class="nf-bb-btn-sub">markdown summary</span>
        </button>
        <button id="nf-bb-mdoc" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          📖 Methods doc<br><span class="nf-bb-btn-sub">METHODS.md auto</span>
        </button>
        <button id="nf-bb-compile" class="nf-bb-btn nf-bb-btn--green" type="button">
          ✅ Compile check<br><span class="nf-bb-btn-sub">smoke+CV+sig</span>
        </button>
        <button id="nf-bb-2snap" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🔀 2-snap diff<br><span class="nf-bb-btn-sub">snap A vs B</span>
        </button>
        <button id="nf-bb-watcher" class="nf-bb-btn nf-bb-btn--blue" type="button">
          👁 Watcher tick<br><span class="nf-bb-btn-sub">single status snapshot</span>
        </button>
        <button id="nf-bb-final" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          🏁 Final pipeline<br><span class="nf-bb-btn-sub">build+train+all tests</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🌊 Oscillations & dynamics</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-theta" class="nf-bb-btn nf-bb-btn--violet" type="button">
          🌀 Theta 8Hz<br><span class="nf-bb-btn-sub">HIPPO oscillation</span>
        </button>
        <button id="nf-bb-gamma" class="nf-bb-btn nf-bb-btn--magenta" type="button">
          ⚡ Gamma 40Hz<br><span class="nf-bb-btn-sub">PV-mediated PING binding</span>
        </button>
        <button id="nf-bb-place-remap" class="nf-bb-btn nf-bb-btn--green" type="button">
          🗺 Place remap<br><span class="nf-bb-btn-sub">CA1 context switch</span>
        </button>
        <button id="nf-bb-reset-dyn" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🔄 Reset dynamics<br><span class="nf-bb-btn-sub">spike state clear</span>
        </button>
        <button id="nf-bb-reset-all" class="nf-bb-btn nf-bb-btn--red" type="button">
          🗑 Reset all<br><span class="nf-bb-btn-sub">grown regions 제거</span>
        </button>
      </div>

      <p class="nf-bb-section-label">🛌 State & global</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-sleepwake" class="nf-bb-btn nf-bb-btn--blue" type="button">
          🛌 Sleep/Wake<br><span class="nf-bb-btn-sub">VLPO flip-flop</span>
        </button>
        <button id="nf-bb-rf" class="nf-bb-btn nf-bb-btn--gray" type="button">
          ⚡ Reticular Formation<br><span class="nf-bb-btn-sub">ARAS arousal</span>
        </button>
        <button id="nf-bb-benchmark" class="nf-bb-btn nf-bb-btn--gray" type="button">
          ⏱ Benchmark<br><span class="nf-bb-btn-sub">throughput 측정</span>
        </button>
        <button id="nf-bb-replay-sleep" class="nf-bb-btn nf-bb-btn--blue" type="button">
          💤 Sleep Replay<br><span class="nf-bb-btn-sub">HIPPO→cortex consolidation</span>
        </button>
        <button id="nf-bb-export" class="nf-bb-btn nf-bb-btn--cyan" type="button">
          📥 Export JSON<br><span class="nf-bb-btn-sub">snapshot 다운로드</span>
        </button>
        <button id="nf-bb-smoke-ext" class="nf-bb-btn nf-bb-btn--gray" type="button">
          🧪 Smoke Test+<br><span class="nf-bb-btn-sub">cross-validation</span>
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Hippocampus 기능 (이미 구축 시)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-replay" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--violet-act${hippoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${hippoExists ? '' : 'disabled'}>
          💤 Replay (sleep)
        </button>
        <button id="nf-bb-completion" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--emerald-act${hippoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${hippoExists ? '' : 'disabled'}>
          🧩 Pattern Test
        </button>
        <button id="nf-bb-dg" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--amber${hippoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${hippoExists ? '' : 'disabled'}>
          🌾 DG (pattern separation)
        </button>
        <button id="nf-bb-ec" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--amber2${hippoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${hippoExists ? '' : 'disabled'}>
          🚪 EC (gateway II/III/V)
        </button>
        <button id="nf-bb-spatial" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--emerald-act${hippoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${hippoExists ? '' : 'disabled'}>
          🗺 Place + Grid cells
        </button>
        <button id="nf-bb-spatial-inject" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--emerald" type="button">
          📍 Inject (x=0.5, y=0.5)
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">시냅스 upgrade (Phase 24)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-nmda-pfc" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--violet${pfcExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${pfcExists ? '' : 'disabled'}>
          💊 NMDA → PFC L5 (recurrent)
        </button>
        <button id="nf-bb-nmda-ca3" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--amber${hippoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${hippoExists ? '' : 'disabled'}>
          💊 NMDA → CA3 (recurrent)
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Neuromodulation pulses</p>
      <div class="nf-bb-grid-1">
        <button id="nf-bb-ne-pulse" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--purple${lcExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${lcExists ? '' : 'disabled'}>
          💥 NE pulse (LC arousal — V_th ↓ + dopamine co-release)
        </button>
        <button id="nf-bb-ach-pulse" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--amber2${bfExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${bfExists ? '' : 'disabled'}>
          🎯 ACh pulse (BF attention — cortex+HIPPO V_th ↓)
        </button>
        <button id="nf-bb-5ht-pulse" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--pink${rapheExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${rapheExists ? '' : 'disabled'}>
          💧 5-HT pulse (Raphe — inhibitory weight 강화)
        </button>
        <button id="nf-bb-vta-pulse" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--magenta${rewardExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${rewardExists ? '' : 'disabled'}>
          🎉 VTA pulse (DA release — NAcc + BG D1 활성)
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Astrocyte / glia (Phase 26 — Turrigiano 1998 homeostasis)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-ast" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--gray" type="button">
          🟦 Astrocyte 추가
        </button>
        <button id="nf-bb-homeo" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--blue" type="button">
          ⚖️ Homeostasis step
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Long-range binding (Phase 43)</p>
      <div class="nf-bb-grid-1">
        <button id="nf-bb-commissural" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--violet-act" type="button">
          🔗 Commissural fibers (cross-region binding 8 pairs)
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Cortical microcircuit (Phase 44 — L1 + L6 추가)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-layers-v1" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--cyan" type="button">
          🧱 V1 → 6-layer
        </button>
        <button id="nf-bb-layers-v2" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--violet" type="button">
          🧱 V2 → 6-layer
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Cerebro-Cerebellar Loop (Phase 48)</p>
      <div class="nf-bb-grid-1">
        <button id="nf-bb-cccloop" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--green" type="button">
          🔄 Close cerebro-cerebellar loop (DCN → TH → PFC)
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Sleep/Wake toggle (Phase 50)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-sleep-mode" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--blue${vlpoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${vlpoExists ? '' : 'disabled'}>
          😴 Sleep mode
        </button>
        <button id="nf-bb-wake-mode" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--amber2${vlpoExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${vlpoExists ? '' : 'disabled'}>
          ☀️ Wake mode
        </button>
      </div>
      <hr class="nf-bb-divider">
      <p class="nf-bb-section-label">Cerebellum motor learning (Phase 25)</p>
      <div class="nf-bb-grid-2">
        <button id="nf-bb-io" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--orange-act${crbExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${crbExists ? '' : 'disabled'}>
          🟠 IO + Climbing Fiber
        </button>
        <button id="nf-bb-ltd" class="nf-bb-btn nf-bb-btn--small nf-bb-btn--red-act${ioExists ? '' : ' nf-bb-btn--disabled'}" type="button" ${ioExists ? '' : 'disabled'}>
          🩹 LTD train (error → 약화)
        </button>
      </div>
      <div id="nf-bb-status" class="nf-bb-status">위 region 을 클릭해 추가하거나, 기존 Hippocampus 의 기능을 실행하세요.</div>
    `,
    buttons: [
      { label: '닫기', kind: 'cancel', value: null },
    ],
  });

  function setBbStatus(msg) {
    const el = document.getElementById('nf-bb-status');
    if (el) el.innerHTML = msg;
  }
  // 버튼 wiring (DOM ready 직후).
  document.getElementById('nf-bb-hippo')?.addEventListener('click', async () => {
    setBbStatus('🟡 Hippocampus 구축 중...');
    const r = await backend.buildHippocampus({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — CA3 ${r.ca3_count} / CA1 ${r.ca1_count}.`);
    await syncCanvas(setBbStatus, `✓ Hippocampus 완료 — CA3 ${r.ca3_count} + CA1 ${r.ca1_count}, ${r.synapses_added} 시냅스.`);
  });
  document.getElementById('nf-bb-pfc')?.addEventListener('click', async () => {
    setBbStatus('🟣 PFC 구축 중...');
    const r = await backend.buildPfc({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — L23 ${r.l23_count} / L5 ${r.l5_count}.`);
    await syncCanvas(setBbStatus, `✓ PFC 완료 — L23 ${r.l23_count} + L5 ${r.l5_count} (recurrent), ${r.synapses_added} 시냅스.${r.ca1_sources ? ` HIPPO CA1 ${r.ca1_sources} 도 통합됨.` : ''}`);
  });
  document.getElementById('nf-bb-amg')?.addEventListener('click', async () => {
    setBbStatus('🔴 Amygdala 구축 중...');
    const r = await backend.buildAmygdala({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — AMG ${r.amg_count}.`);
    await syncCanvas(setBbStatus, `✓ Amygdala 완료 — AMG ${r.amg_count} (recurrent), ${r.synapses_added} 시냅스.`);
  });
  document.getElementById('nf-bb-bg')?.addEventListener('click', async () => {
    setBbStatus('🔵 Basal Ganglia 구축 중...');
    const r = await backend.buildBasalGanglia({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — D1 ${r.d1_count} / D2 ${r.d2_count}.`);
    await syncCanvas(setBbStatus, `✓ Basal Ganglia 완료 — D1 ${r.d1_count} (Go) + D2 ${r.d2_count} (NoGo), ${r.synapses_added} 시냅스. dopamine 으로 D1↑ / D2↓ 학습 가능.`);
  });
  document.getElementById('nf-bb-crb')?.addEventListener('click', async () => {
    setBbStatus('🟢 Cerebellum 구축 중...');
    const r = await backend.buildCerebellum({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — GRC ${r.grc_count} / PC ${r.pc_count} / DCN ${r.dcn_count}.`);
    await syncCanvas(setBbStatus, `✓ Cerebellum 완료 — GRC ${r.grc_count} + PC ${r.pc_count} + DCN ${r.dcn_count}, ${r.synapses_added} 시냅스. V1 → GRC → PC → DCN → OUT (motor pathway).`);
  });
  document.getElementById('nf-bb-thal')?.addEventListener('click', async () => {
    setBbStatus('🔷 Thalamus 구축 중...');
    const r = await backend.buildThalamus({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — TH ${r.th_count} / TRN ${r.trn_count}.`);
    await syncCanvas(setBbStatus, `✓ Thalamus 완료 — TH ${r.th_count} (relay) + TRN ${r.trn_count} (gate), ${r.synapses_added} 시냅스. V1 → TH → V2 cortico-thalamo-cortical loop + TRN attention searchlight.`);
  });
  document.getElementById('nf-bb-spinal')?.addEventListener('click', async () => {
    setBbStatus('🦾 Spinal motor pool 구축 중...');
    const r = await backend.buildSpinalMotorPool({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — AMN ${r.amn_count} / RC ${r.rc_count}.`);
    await syncCanvas(setBbStatus, `✓ Spinal Motor 완료 — AMN ${r.amn_count} (alpha motor) + RC ${r.rc_count} (Renshaw inhibitory), ${r.synapses_added} 시냅스. cortex/CRB/BG → AMN → OUT 최종 motor pathway.`);
  });
  document.getElementById('nf-bb-lc')?.addEventListener('click', async () => {
    setBbStatus('🟣 Locus Coeruleus 구축 중...');
    const r = await backend.buildLocusCoeruleus({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — LC ${r.lc_count}.`);
    await syncCanvas(setBbStatus, `✓ LC 완료 — ${r.lc_count} 뉴런 broadcast (regions: ${r.regions_targeted.join(', ')}, ${r.broadcast_targets} target). 💥 NE pulse 로 arousal 활성.`);
  });
  document.getElementById('nf-bb-ne-pulse')?.addEventListener('click', async () => {
    setBbStatus('💥 NE pulse 진행 (V_th ↓ 1mV + dopamine co-release)...');
    const r = await backend.lcPulse({ amplitude: 1.0, vthLowerMv: 1.0, dopamineCoRelease: 0.2 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ NE pulse — amplitude ${r.amplitude}, V_th ↓ ${r.vth_lower_mv}mV, DA ${r.dopamine_co_release}, active ${r.active_neurons_during_pulse} 뉴런. arousal/gain 일시 boost.`);
  });
  document.getElementById('nf-bb-bf')?.addEventListener('click', async () => {
    setBbStatus('🟧 Basal Forebrain 구축 중...');
    const r = await backend.buildBasalForebrain({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — BF ${r.bf_count}.`);
    await syncCanvas(setBbStatus, `✓ BF 완료 — ${r.bf_count} 뉴런 broadcast (cortex + HIPPO + PFC + AMG, ${r.broadcast_targets} target). 🎯 ACh pulse 로 attention 활성.`);
  });
  document.getElementById('nf-bb-ach-pulse')?.addEventListener('click', async () => {
    setBbStatus('🎯 ACh pulse 진행 (cortex + HIPPO V_th ↓ 0.8mV)...');
    const r = await backend.bfPulse({ amplitude: 1.0, vthLowerMv: 0.8 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ ACh pulse — amplitude ${r.amplitude}, V_th ↓ ${r.vth_lower_mv}mV, active ${r.active_neurons_during_pulse} 뉴런. signal-to-noise enhancement.`);
  });
  document.getElementById('nf-bb-raphe')?.addEventListener('click', async () => {
    setBbStatus('🩷 Raphe Nuclei 구축 중...');
    const r = await backend.buildRapheNuclei({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — Raphe ${r.raphe_count}.`);
    await syncCanvas(setBbStatus, `✓ Raphe 완료 — ${r.raphe_count} 뉴런 broadcast (regions: ${r.regions_targeted.join(', ')}, ${r.broadcast_targets} target). 💧 5-HT pulse 로 mood/inhibition.`);
  });
  document.getElementById('nf-bb-5ht-pulse')?.addEventListener('click', async () => {
    setBbStatus('💧 5-HT pulse 진행 (inhibitory weight 강화)...');
    const r = await backend.raphePulse({ amplitude: 1.0 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ 5-HT pulse — amplitude ${r.amplitude}, active ${r.active_neurons_during_pulse} 뉴런. inhibitory weight × 2 (Aghajanian 1990).`);
  });
  document.getElementById('nf-bb-vs')?.addEventListener('click', async () => {
    setBbStatus('🔵 Ventral Stream 구축 중...');
    const r = await backend.buildVentralStream({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — V4 ${r.v4_count} / IT ${r.it_count}.`);
    await syncCanvas(setBbStatus, `✓ Ventral Stream 완료 — V4 ${r.v4_count} + IT ${r.it_count}, ${r.synapses_added} 시냅스. V2 → V4 → IT → OUT (object recognition pathway).`);
  });
  document.getElementById('nf-bb-ds')?.addEventListener('click', async () => {
    setBbStatus('🟢 Dorsal Stream 구축 중...');
    const r = await backend.buildDorsalStream({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — V3 ${r.v3_count} / MT ${r.mt_count} / PPC ${r.ppc_count}.`);
    await syncCanvas(setBbStatus, `✓ Dorsal Stream 완료 — V3 ${r.v3_count} + MT ${r.mt_count} + PPC ${r.ppc_count}, ${r.synapses_added} 시냅스. V2 → V3 → MT → PPC → OUT/PFC (where/how pathway, motion+spatial).`);
  });
  document.getElementById('nf-bb-aud')?.addEventListener('click', async () => {
    setBbStatus('🔉 Auditory Cortex 구축 중...');
    const r = await backend.buildAuditoryCortex({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — A1 ${r.a1_count} / A2 ${r.a2_count}.`);
    await syncCanvas(setBbStatus, `✓ Auditory Cortex 완료 — A1 ${r.a1_count} (tonotopic) + A2 ${r.a2_count}, ${r.synapses_added} 시냅스. ${r.audio_sources} audio source → A1 → A2 → OUT${r.it_targets ? '/IT (multimodal)' : ''}.`);
  });
  document.getElementById('nf-bb-reward')?.addEventListener('click', async () => {
    setBbStatus('💗 Reward Circuit 구축 중...');
    const r = await backend.buildRewardCircuit({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — VTA ${r.vta_count} / NAcc ${r.nacc_count}.`);
    await syncCanvas(setBbStatus, `✓ Reward 완료 — VTA ${r.vta_count} (DA) + NAcc ${r.nacc_count}, ${r.synapses_added} 시냅스. AMG ${r.amg_sources} + PFC ${r.pfc_sources} → NAcc → BG D1 ${r.d1_targets}. 🎉 VTA pulse 로 DA release.`);
  });
  document.getElementById('nf-bb-vta-pulse')?.addEventListener('click', async () => {
    setBbStatus('🎉 VTA pulse 진행 (DA release + NAcc 활성)...');
    const r = await backend.vtaPulse({ amplitude: 1.0 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ VTA pulse — amplitude ${r.amplitude}, NAcc active ${r.nacc_active}, BG D1 active ${r.d1_active_downstream}. reward signal propagated.`);
  });
  document.getElementById('nf-bb-ins')?.addEventListener('click', async () => {
    setBbStatus('🟠 Insula 구축 중...');
    const r = await backend.buildInsula({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — INS ${r.ins_count}.`);
    await syncCanvas(setBbStatus, `✓ Insula 완료 — INS ${r.ins_count}, ${r.synapses_added} 시냅스. AMG ${r.amg_sources} + V1 ${r.v1_sources} → INS → AMG/PFC ${r.pfc_targets} (interoception + salience).`);
  });
  document.getElementById('nf-bb-acc')?.addEventListener('click', async () => {
    setBbStatus('🟪 ACC 구축 중...');
    const r = await backend.buildAnteriorCingulate({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — ACC ${r.acc_count}.`);
    await syncCanvas(setBbStatus, `✓ ACC 완료 — ACC ${r.acc_count}, ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} + INS ${r.ins_sources} + AMG ${r.amg_sources} + BG ${r.bg_sources} → ACC → PFC/VTA ${r.vta_targets} (conflict monitor).`);
  });
  document.getElementById('nf-bb-olf')?.addEventListener('click', async () => {
    setBbStatus('🌿 Olfactory system 구축 중...');
    const r = await backend.buildOlfactorySystem({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — OB ${r.ob_count} / PIR ${r.pir_count}.`);
    await syncCanvas(setBbStatus, `✓ Olfactory 완료 — OB ${r.ob_count} (mitral) + PIR ${r.pir_count}, ${r.synapses_added} 시냅스. ${r.olfactory_sources} source → OB → PIR → AMG ${r.amg_targets} / CA3 ${r.ca3_targets} (Proust effect).`);
  });
  document.getElementById('nf-bb-stem')?.addEventListener('click', async () => {
    setBbStatus('🟥 Brainstem 구축 중...');
    const r = await backend.buildBrainstem({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — PAG ${r.pag_count} / Pons ${r.pons_count}.`);
    await syncCanvas(setBbStatus, `✓ Brainstem 완료 — PAG ${r.pag_count} + Pons ${r.pons_count}, ${r.synapses_added} 시냅스. AMG ${r.amg_sources} → PAG → LC ${r.lc_targets} / AMN ${r.amn_targets} (defensive), Cortex → Pons → GRC ${r.grc_targets} (cerebellar relay).`);
  });
  document.getElementById('nf-bb-dmn')?.addEventListener('click', async () => {
    setBbStatus('🌅 DMN 구축 중...');
    const r = await backend.buildDefaultModeNetwork({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — mPFC ${r.mpfc_count} / PCC ${r.pcc_count} / AG ${r.ag_count}.`);
    await syncCanvas(setBbStatus, `✓ DMN 완료 — mPFC ${r.mpfc_count} + PCC ${r.pcc_count} + AG ${r.ag_count}, ${r.synapses_added} 시냅스. mutual recurrent + CA1 ${r.ca1_sources} → PCC → CA3 (mind-wandering, autobiographical memory).`);
  });
  document.getElementById('nf-bb-hyp')?.addEventListener('click', async () => {
    setBbStatus('🌡 Hypothalamus 구축 중...');
    const r = await backend.buildHypothalamus({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — HYP ${r.hyp_count}.`);
    await syncCanvas(setBbStatus, `✓ HYP 완료 — ${r.hyp_count}, ${r.synapses_added} 시냅스. AMG ${r.amg_sources} → HYP → PAG ${r.pag_targets} / LC ${r.lc_targets} / Raphe ${r.raphe_targets} / AMN ${r.amn_targets} (HPA + autonomic broadcast).`);
  });
  document.getElementById('nf-bb-sn')?.addEventListener('click', async () => {
    setBbStatus('🚦 Salience Network 구축 중...');
    const r = await backend.buildSalienceNetwork({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — AI ${r.ai_count} / dACC ${r.dacc_count}.`);
    await syncCanvas(setBbStatus, `✓ SN 완료 — AI ${r.ai_count} + dACC ${r.dacc_count}, ${r.synapses_added} 시냅스. INS ${r.ins_sources} + ACC ${r.acc_sources} → SN → CEN ${r.cen_targets} (excit) + DMN ${r.dmn_targets} (inhib). salient input 시 DMN suppress + CEN activate.`);
  });
  document.getElementById('nf-bb-mns')?.addEventListener('click', async () => {
    setBbStatus('🪞 Mirror Neuron System 구축 중...');
    const r = await backend.buildMirrorNeurons({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — F5 ${r.f5_count} / IPL ${r.ipl_count}.`);
    await syncCanvas(setBbStatus, `✓ MNS 완료 — F5 ${r.f5_count} + IPL ${r.ipl_count}, ${r.synapses_added} 시냅스. PPC ${r.ppc_sources} + IT ${r.it_sources} → IPL → F5 → AMN ${r.amn_targets} + IT-back ${r.it_l4_targets} (action understanding + observation-execution matching).`);
  });
  document.getElementById('nf-bb-tpj')?.addEventListener('click', async () => {
    setBbStatus('👁 TPJ 구축 중...');
    const r = await backend.buildTpj({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — TPJ ${r.tpj_count}.`);
    await syncCanvas(setBbStatus, `✓ TPJ 완료 — ${r.tpj_count}, ${r.synapses_added} 시냅스. IPL ${r.ipl_sources} + IT ${r.it_sources} → TPJ → mPFC ${r.mpfc_targets} (mentalizing) + AG ${r.ag_targets} (DMN bidir) + ACC ${r.acc_targets} (self/other conflict).`);
  });
  document.getElementById('nf-bb-tail')?.addEventListener('click', async () => {
    setBbStatus('🚶 Striatum tail 구축 중...');
    const r = await backend.buildStriatumTail({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — TAIL ${r.tail_count}.`);
    await syncCanvas(setBbStatus, `✓ Tail 완료 — TAIL_STR ${r.tail_count}, ${r.synapses_added} 시냅스. IT ${r.it_sources} + A2 ${r.a2_sources} → TAIL → OUT ${r.out_targets} (habit pathway, parallel to BG body goal-directed).`);
  });
  document.getElementById('nf-bb-fef')?.addEventListener('click', async () => {
    setBbStatus('👀 FEF 구축 중...');
    const r = await backend.buildFrontalEyeField({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — FEF ${r.fef_count}.`);
    await syncCanvas(setBbStatus, `✓ FEF 완료 — ${r.fef_count}, ${r.synapses_added} 시냅스. PPC ${r.ppc_sources} + V2 ${r.v2_sources} → FEF → V1 ${r.v1_targets} + V2_L23 ${r.v2_l23_targets} (top-down boost) + AMN ${r.amn_targets} (saccade).`);
  });
  document.getElementById('nf-bb-v4color')?.addEventListener('click', async () => {
    setBbStatus('🎨 V4 Color 구축 중...');
    const r = await backend.buildV4Color({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — V4_COLOR ${r.color_count}.`);
    await syncCanvas(setBbStatus, `✓ V4 Color 완료 — ${r.color_count}, ${r.synapses_added} 시냅스. V1 ${r.v1_sources} → V4_COLOR → V4_L5 ${r.v4_l5_targets} + IT ${r.it_targets} (chromatic stream).`);
  });
  document.getElementById('nf-bb-s1')?.addEventListener('click', async () => {
    setBbStatus('✋ S1 Somatosensory 구축 중...');
    const r = await backend.buildSomatosensoryCortex({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — S1 ${r.s1_count}.`);
    await syncCanvas(setBbStatus, `✓ S1 완료 — ${r.s1_count}, ${r.synapses_added} 시냅스. tactile ${r.tactile_sources} → S1 → V2 ${r.v2_targets} (cross-modal) + AMN ${r.amn_targets} (reflex) + INS ${r.ins_targets} (interoception).`);
  });
  document.getElementById('nf-bb-m1')?.addEventListener('click', async () => {
    setBbStatus('💪 M1 Primary Motor 구축 중...');
    const r = await backend.buildPrimaryMotorCortex({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — M1 ${r.m1_count}.`);
    await syncCanvas(setBbStatus, `✓ M1 완료 — ${r.m1_count}, ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} + S1 ${r.s1_sources} + DCN ${r.dcn_sources} + STR_D1 ${r.str_sources} → M1 → AMN ${r.amn_targets} (corticospinal).`);
  });
  document.getElementById('nf-bb-cinghippo')?.addEventListener('click', async () => {
    setBbStatus('🔗 ACC↔HIPPO 결합 중...');
    const r = await backend.buildCingulateHippoBinding({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 결합됨 — ACC ${r.acc_count}, CA1 ${r.ca1_count}, CA3 ${r.ca3_count}.`);
    await syncCanvas(setBbStatus, `✓ ACC↔HIPPO 결합 완료 — ${r.synapses_added} 시냅스. ACC ${r.acc_count} ↔ CA1 ${r.ca1_count} + ACC→CA3 ${r.ca3_count} (context binding).`);
  });
  document.getElementById('nf-bb-cunlin')?.addEventListener('click', async () => {
    setBbStatus('🌅 Cuneus+Lingual 구축 중...');
    const r = await backend.buildCuneusLingual({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — Cuneus ${r.cuneus_count}, Lingual ${r.lingual_count}.`);
    await syncCanvas(setBbStatus, `✓ Cuneus+Lingual 완료 — Cuneus ${r.cuneus_count} (sky) + Lingual ${r.lingual_count} (peach), ${r.synapses_added} 시냅스. V1 ${r.v1_sources} → CUN → V3 ${r.v3_targets}/MT ${r.mt_targets} (dorsal) + V1 → LIN → V4 ${r.v4_targets} (ventral).`);
  });
  document.getElementById('nf-bb-pulvinar')?.addEventListener('click', async () => {
    setBbStatus('🎯 Pulvinar 구축 중...');
    const r = await backend.buildPulvinar({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — Pulvinar ${r.pul_count}.`);
    await syncCanvas(setBbStatus, `✓ Pulvinar 완료 — ${r.pul_count}, ${r.synapses_added} 시냅스. V1 ${r.v1_sources} + V2 ${r.v2_sources} + MT ${r.mt_sources} → PUL → V4 ${r.v4_targets}/IT ${r.it_targets}/PPC ${r.ppc_targets} (attention gain).`);
  });
  document.getElementById('nf-bb-stn')?.addEventListener('click', async () => {
    setBbStatus('🛑 STN 구축 중...');
    const r = await backend.buildStn({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — STN ${r.stn_count}.`);
    await syncCanvas(setBbStatus, `✓ STN 완료 — ${r.stn_count}, ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} + M1 ${r.m1_sources} → STN → STR_D2 ${r.str_d2_targets} (NoGo hyperdirect, action cancel).`);
  });
  document.getElementById('nf-bb-lgn')?.addEventListener('click', async () => {
    setBbStatus('🌟 LGN 구축 중...');
    const r = await backend.buildLgn({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — LGN ${r.lgn_count}.`);
    await syncCanvas(setBbStatus, `✓ LGN 완료 — ${r.lgn_count}, ${r.synapses_added} 시냅스. INPUT ${r.input_sources} → LGN → V1 L4 ${r.v1_targets} (retina-cortical relay).`);
  });
  document.getElementById('nf-bb-habenula')?.addEventListener('click', async () => {
    setBbStatus('⛈ Habenula 구축 중...');
    const r = await backend.buildHabenula({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — Hb ${r.hb_count}.`);
    await syncCanvas(setBbStatus, `✓ Habenula 완료 — ${r.hb_count}, ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} + AMG ${r.amg_sources} → Hb ⊣ VTA ${r.vta_targets} (anti-reward) + → Raphe ${r.raphe_targets} (aversion 5-HT).`);
  });
  document.getElementById('nf-bb-sc')?.addEventListener('click', async () => {
    setBbStatus('👁 Superior Colliculus 구축 중...');
    const r = await backend.buildSuperiorColliculus({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — SC ${r.sc_count}.`);
    await syncCanvas(setBbStatus, `✓ SC 완료 — ${r.sc_count}, ${r.synapses_added} 시냅스. V1 ${r.v1_sources} + FEF ${r.fef_sources} → SC → AMN ${r.amn_targets} (saccade) + PUL ${r.pul_targets} (attention).`);
  });
  document.getElementById('nf-bb-ofc')?.addEventListener('click', async () => {
    setBbStatus('💰 OFC 구축 중...');
    const r = await backend.buildOfc({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — OFC ${r.ofc_count}.`);
    await syncCanvas(setBbStatus, `✓ OFC 완료 — ${r.ofc_count}, ${r.synapses_added} 시냅스. AMG ${r.amg_sources} + INS ${r.ins_sources} → OFC → STR_D1 ${r.str_targets}/PFC L23 ${r.pfc_targets} (value-guided choice).`);
  });
  document.getElementById('nf-bb-snc')?.addEventListener('click', async () => {
    setBbStatus('⚡ SNc 구축 중...');
    const r = await backend.buildSnc({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — SNc ${r.snc_count}.`);
    await syncCanvas(setBbStatus, `✓ SNc 완료 — ${r.snc_count}, ${r.synapses_added} 시냅스. AMG ${r.amg_sources} + PFC ${r.pfc_sources} → SNc → STR_D1 ${r.str_d1_targets} (+) / STR_D2 ${r.str_d2_targets} (−) (nigrostriatal DA).`);
  });
  document.getElementById('nf-bb-atn')?.addEventListener('click', async () => {
    setBbStatus('🔁 ATN 구축 중...');
    const r = await backend.buildAtn({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — ATN ${r.atn_count}.`);
    await syncCanvas(setBbStatus, `✓ ATN 완료 — ${r.atn_count}, ${r.synapses_added} 시냅스. MB ${r.mb_sources} → ATN → ACC ${r.acc_targets}/PCC ${r.pcc_targets}/CA1 ${r.ca1_targets} (Papez relay).`);
  });
  document.getElementById('nf-bb-mb')?.addEventListener('click', async () => {
    setBbStatus('🧬 Mammillary Bodies 구축 중...');
    const r = await backend.buildMammillaryBodies({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — MB ${r.mb_count}.`);
    await syncCanvas(setBbStatus, `✓ MB 완료 — ${r.mb_count}, ${r.synapses_added} 시냅스. CA1 ${r.ca1_sources} → MB → ATN ${r.atn_targets} (mammillothalamic tract).`);
  });
  document.getElementById('nf-bb-caudput')?.addEventListener('click', async () => {
    setBbStatus('🧠 Caudate + Putamen 구축 중...');
    const r = await backend.buildCaudatePutamen({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — Caud ${r.caud_count}, Put ${r.put_count}.`);
    await syncCanvas(setBbStatus, `✓ Caud+Put 완료 — Caud ${r.caud_count} + Put ${r.put_count}, ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} → CAUD → GPi (cognitive loop), M1 ${r.m1_sources} + S1 ${r.s1_sources} → PUT → GPi ${r.gpi_targets} (motor loop).`);
  });
  document.getElementById('nf-bb-gp')?.addEventListener('click', async () => {
    setBbStatus('⚙ Globus Pallidus 구축 중...');
    const r = await backend.buildGlobusPallidus({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — GPe ${r.gpe_count}, GPi ${r.gpi_count}.`);
    await syncCanvas(setBbStatus, `✓ GP 완료 — GPe ${r.gpe_count} + GPi ${r.gpi_count}, ${r.synapses_added} 시냅스. STR_D1 ${r.str_d1_sources} → GPi (direct Go), STR_D2 ${r.str_d2_sources} → GPe → STN ${r.stn_targets}/GPi (indirect NoGo) → TH ${r.th_targets} (BG gating).`);
  });
  document.getElementById('nf-bb-cblob')?.addEventListener('click', async () => {
    setBbStatus('🍊 Cerebellar Lobules 구축 중...');
    const r = await backend.buildCerebellarLobules({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — VERM ${r.verm_count}, HEMI ${r.hemi_count}, FLOC ${r.floc_count}.`);
    await syncCanvas(setBbStatus, `✓ CRB Lobules 완료 — VERM ${r.verm_count} (AMG-axis) + HEMI ${r.hemi_count} (PFC/M1 cognitive) + FLOC ${r.floc_count} (PPC/FEF VOR), ${r.synapses_added} 시냅스 → DCN ${r.dcn_targets}.`);
  });
  document.getElementById('nf-bb-rsc')?.addEventListener('click', async () => {
    setBbStatus('🗺 RSC 구축 중...');
    const r = await backend.buildRsc({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — RSC ${r.rsc_count}.`);
    await syncCanvas(setBbStatus, `✓ RSC 완료 — ${r.rsc_count}, ${r.synapses_added} 시냅스. CA1 ${r.ca1_sources} + PPC ${r.ppc_sources} → RSC → PCC ${r.pcc_targets}/mPFC ${r.mpfc_targets} (spatial scene + DMN).`);
  });
  document.getElementById('nf-bb-sma')?.addEventListener('click', async () => {
    setBbStatus('📋 SMA+preSMA 구축 중...');
    const r = await backend.buildSma({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — SMA ${r.sma_count}, preSMA ${r.presma_count}.`);
    await syncCanvas(setBbStatus, `✓ SMA 완료 — preSMA ${r.presma_count} + SMA ${r.sma_count}, ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} → preSMA → SMA → M1 ${r.m1_targets} + STR_D1 ${r.str_d1_targets} (self-initiated).`);
  });
  document.getElementById('nf-bb-premotor')?.addEventListener('click', async () => {
    setBbStatus('🤲 Premotor 구축 중...');
    const r = await backend.buildPremotor({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — PMd ${r.pmd_count}, PMv ${r.pmv_count}.`);
    await syncCanvas(setBbStatus, `✓ Premotor 완료 — PMd ${r.pmd_count} (reach) + PMv ${r.pmv_count} (grasp), ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} + PPC ${r.ppc_sources} → PMd, PFC + IPL ${r.ipl_sources} → PMv → M1 ${r.m1_targets}.`);
  });
  document.getElementById('nf-bb-subiculum')?.addEventListener('click', async () => {
    setBbStatus('🏛 Subiculum 구축 중...');
    const r = await backend.buildSubiculum({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — Subiculum ${r.sub_count}.`);
    await syncCanvas(setBbStatus, `✓ Subiculum 완료 — ${r.sub_count}, ${r.synapses_added} 시냅스. CA1 ${r.ca1_sources} → SUBIC → MB ${r.mb_targets}/ATN ${r.atn_targets}/NAcc ${r.nacc_targets}/EC ${r.ec_targets}.`);
  });
  document.getElementById('nf-bb-phc')?.addEventListener('click', async () => {
    setBbStatus('🏞 PHC 구축 중...');
    const r = await backend.buildPhc({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — PHC ${r.phc_count}.`);
    await syncCanvas(setBbStatus, `✓ PHC 완료 — ${r.phc_count}, ${r.synapses_added} 시냅스. PPC ${r.ppc_sources} + V4 ${r.v4_sources} + RSC ${r.rsc_sources} → PHC → EC ${r.ec_targets} (scene gateway).`);
  });
  document.getElementById('nf-bb-prc')?.addEventListener('click', async () => {
    setBbStatus('🎭 PRC 구축 중...');
    const r = await backend.buildPrc({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — PRC ${r.prc_count}.`);
    await syncCanvas(setBbStatus, `✓ PRC 완료 — ${r.prc_count}, ${r.synapses_added} 시냅스. IT ${r.it_sources} → PRC → EC ${r.ec_targets} (object familiarity).`);
  });
  document.getElementById('nf-bb-insula')?.addEventListener('click', async () => {
    setBbStatus('🌀 Insula split 구축 중...');
    const r = await backend.buildInsulaSplit({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — AI ${r.ai_count}, PI ${r.pi_count}.`);
    await syncCanvas(setBbStatus, `✓ Insula split 완료 — AI ${r.ai_count} + PI ${r.pi_count}, ${r.synapses_added} 시냅스. S1/A1/V1 → AI → ACC ${r.acc_targets} (salience), HYP ${r.hyp_sources} + AMG ${r.amg_sources} → PI → S1 (somatic).`);
  });
  document.getElementById('nf-bb-ot')?.addEventListener('click', async () => {
    setBbStatus('🍬 OT 구축 중...');
    const r = await backend.buildOlfactoryTubercle({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — OT ${r.ot_count}.`);
    await syncCanvas(setBbStatus, `✓ OT 완료 — ${r.ot_count}, ${r.synapses_added} 시냅스. PIR ${r.pir_sources} → OT → NAcc ${r.nacc_targets}/VTA ${r.vta_targets}/STR_D1 ${r.str_targets} (odor-reward).`);
  });
  document.getElementById('nf-bb-bnst')?.addEventListener('click', async () => {
    setBbStatus('😨 BNST 구축 중...');
    const r = await backend.buildBnst({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — BNST ${r.bnst_count}.`);
    await syncCanvas(setBbStatus, `✓ BNST 완료 — ${r.bnst_count}, ${r.synapses_added} 시냅스. AMG ${r.amg_sources} → BNST → HYP ${r.hyp_targets}/PAG ${r.pag_targets} (sustained anxiety).`);
  });
  document.getElementById('nf-bb-pfcsplit')?.addEventListener('click', async () => {
    setBbStatus('🧭 dlPFC+vmPFC 구축 중...');
    const r = await backend.buildPfcSplit({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — dlPFC ${r.dlpfc_count}, vmPFC ${r.vmpfc_count}.`);
    await syncCanvas(setBbStatus, `✓ PFC split 완료 — dlPFC ${r.dlpfc_count} + vmPFC ${r.vmpfc_count}, ${r.synapses_added} 시냅스. PPC ${r.ppc_sources} → dlPFC → SMA ${r.sma_targets}/Caud ${r.caud_targets} (executive), OFC ${r.ofc_sources} + AMG ${r.amg_sources} → vmPFC → NAcc ${r.nacc_targets} (valuation).`);
  });
  document.getElementById('nf-bb-accsplit')?.addEventListener('click', async () => {
    setBbStatus('🎚 dACC+vACC 구축 중...');
    const r = await backend.buildAccSplit({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — dACC ${r.dacc_count}, vACC ${r.vacc_count}.`);
    await syncCanvas(setBbStatus, `✓ ACC split 완료 — dACC ${r.dacc_count} + vACC ${r.vacc_count}, ${r.synapses_added} 시냅스. PFC ${r.pfc_sources} → dACC → STR ${r.str_targets} (cognitive control), AMG ${r.amg_sources} + INS ${r.ins_sources} → vACC → mPFC ${r.mpfc_targets} (affective).`);
  });
  document.getElementById('nf-bb-amgsplit')?.addEventListener('click', async () => {
    setBbStatus('⚡ AMG split 구축 중...');
    const r = await backend.buildAmgSplit({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — BLA ${r.bla_count}, CEN ${r.cen_count}, Med ${r.med_count}.`);
    await syncCanvas(setBbStatus, `✓ AMG split 완료 — BLA ${r.bla_count} + CEN ${r.cen_count} + Med ${r.med_count}, ${r.synapses_added} 시냅스. V1+A1+AMG → BLA → PFC ${r.pfc_targets}/CA1 ${r.ca1_targets} (learning) → CEN → PAG ${r.pag_targets}/HYP ${r.hyp_targets} (autonomic), PIR ${r.pir_sources} → Med → BNST ${r.bnst_targets} (social).`);
  });
  document.getElementById('nf-bb-hippoext')?.addEventListener('click', async () => {
    setBbStatus('🌱 DG+CA2 구축 중...');
    const r = await backend.buildHippoDgCa2({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — DG ${r.dg_count}, CA2 ${r.ca2_count}.`);
    await syncCanvas(setBbStatus, `✓ DG+CA2 완료 — DG ${r.dg_count} + CA2 ${r.ca2_count}, ${r.synapses_added} 시냅스. EC ${r.ec_sources} → DG → CA3 ${r.ca3_targets} (mossy fibers, pattern separation), EC → CA2 → CA1 ${r.ca1_targets} (social memory).`);
  });
  document.getElementById('nf-bb-benchmark')?.addEventListener('click', async () => {
    setBbStatus('⏱ 벤치마크 측정 중...');
    const r = await backend.runBenchmark({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Bench — ${r.neurons} 뉴런 / ${r.synapses} 시냅스, ${r.elapsed_sec}s elapsed (${r.duration_ms}ms sim) → realtime ratio ${r.realtime_ratio}× (${r.steps_per_sec} steps/s, ${(r.neuron_steps_per_sec / 1e6).toFixed(2)}M neuron-steps/s).`);
  });
  // Phase 89 cluster preset handlers.
  // Phase 91 — progress UI: pre-build button disabled state + post-build summary breakdown.
  const summarizePreset = (r) => {
    const entries = Object.entries(r.results || {});
    const ok = entries.filter(([k, v]) => v && v.ok !== false);
    const fails = entries.filter(([k, v]) => v && v.ok === false);
    const okCount = ok.length;
    const totalCount = entries.length;
    const newCount = ok.filter(([k, v]) => !v.already_exists).length;
    const existingCount = ok.filter(([k, v]) => v.already_exists).length;
    let msg = `${okCount}/${totalCount} sub-region — 신규 ${newCount}, 기존 ${existingCount}, ${r.total_synapses} 시냅스 추가`;
    if (fails.length) msg += ` (실패: ${fails.map(([k]) => k).join(', ')})`;
    return msg;
  };
  const runPreset = async (btnId, label, emoji, fn) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.disabled = true;
    setBbStatus(`${emoji} ${label} 빌드 중... (region 별 sequential)`);
    const t0 = performance.now();
    const r = await fn();
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`${emoji} 실패: ${r.reason || ''}`);
    await syncCanvas(setBbStatus, `✓ ${label} — ${summarizePreset(r)} (${dt}s)`);
  };
  // Phase 92 — Region search/filter. 버튼/리스트 항목 텍스트로 필터.
  const searchInput = document.getElementById('nf-bb-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      const buttons = document.querySelectorAll('[id^="nf-bb-"][id]');
      buttons.forEach((btn) => {
        if (btn.id === 'nf-bb-search' || btn.tagName !== 'BUTTON') return;
        // Skip non-region action buttons (replay/upgrade/etc).
        const isRegionBtn = btn.classList.contains('nf-bb-btn') && !btn.classList.contains('nf-bb-btn--small');
        if (!isRegionBtn) return;
        const text = btn.textContent.toLowerCase();
        const match = !q || text.includes(q);
        btn.style.display = match ? '' : 'none';
      });
      // Hide/dim section labels with no visible buttons.
      const labels = document.querySelectorAll('.nf-bb-section-label');
      labels.forEach((label) => {
        const next = label.nextElementSibling;
        if (next && next.classList.contains('nf-bb-grid-2')) {
          const visibleCount = [...next.querySelectorAll('button.nf-bb-btn')]
            .filter((b) => b.style.display !== 'none' && !b.classList.contains('nf-bb-btn--small')).length;
          label.style.display = visibleCount > 0 ? '' : 'none';
          next.style.display = visibleCount > 0 ? '' : 'none';
        }
      });
    });
  }
  document.getElementById('nf-bb-preset-visual')?.addEventListener('click', () =>
    runPreset('nf-bb-preset-visual', 'Visual Hierarchy', '👁', () => backend.buildPresetVisualHierarchy()));
  document.getElementById('nf-bb-preset-memory')?.addEventListener('click', () =>
    runPreset('nf-bb-preset-memory', 'Memory MTL+Papez', '🧬', () => backend.buildPresetMemory()));
  document.getElementById('nf-bb-preset-limbic')?.addEventListener('click', () =>
    runPreset('nf-bb-preset-limbic', 'Limbic+Salience', '🌀', () => backend.buildPresetLimbic()));
  document.getElementById('nf-bb-preset-motor')?.addEventListener('click', () =>
    runPreset('nf-bb-preset-motor', 'Motor+BG', '🤲', () => backend.buildPresetMotor()));
  // Phase 90 smoke test.
  document.getElementById('nf-bb-smoketest')?.addEventListener('click', async () => {
    setBbStatus('🔬 Smoke test 실행 중...');
    const r = await backend.runSmokeTest();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Smoke — ${r.callable_methods}/${r.total_methods} build 메서드 callable, 현재 ${r.neurons_current} 뉴런 / ${r.synapses_current} 시냅스.`);
  });
  // Phase 191-199 (final round).
  document.getElementById('nf-bb-paper')?.addEventListener('click', async () => {
    setBbStatus('📄 Paper export 추출 중...');
    const r = await backend.paperExport();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const json = JSON.stringify(r, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `neuronface-paper-${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
    setBbStatus(`✓ Paper export — ${r.neurons?.length || 0} 뉴런 sig=${r.signature?.signature || ''} (${(json.length / 1024).toFixed(1)} KB) 다운로드.`);
  });
  document.getElementById('nf-bb-seed')?.addEventListener('click', async () => {
    const seedStr = prompt("Random seed 값 (default 42)", "42");
    const seed = parseInt(seedStr); if (!Number.isInteger(seed)) return;
    const r = await backend.seedLock(seed);
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Seed lock — seed=${r.seed}. 후속 회로 빌드 결정론.`);
  });
  document.getElementById('nf-bb-dash')?.addEventListener('click', async () => {
    setBbStatus('🖥 Dashboard 조회...');
    const r = await backend.dashboard();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const tel = r.telemetry || {};
    setBbStatus(`✓ Dash — ${tel.neurons || 0} 뉴런 / ${tel.synapses || 0} 시냅스, ${r.region_count} regions, ${r.method_count} methods, CV=${r.cross_validate_passes}.`);
  });
  document.getElementById('nf-bb-report')?.addEventListener('click', async () => {
    setBbStatus('📝 Auto report 생성 중...');
    const r = await backend.autoReport();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const blob = new Blob([r.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `neuronface-report-${Date.now()}.md`; a.click();
    URL.revokeObjectURL(url);
    setBbStatus(`✓ Auto report — ${r.char_count} chars 다운로드.`);
  });
  document.getElementById('nf-bb-mdoc')?.addEventListener('click', async () => {
    setBbStatus('📖 Methods doc 생성 중...');
    const r = await backend.methodsDoc();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const blob = new Blob([r.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `METHODS.md`; a.click();
    URL.revokeObjectURL(url);
    setBbStatus(`✓ Methods doc — ${r.total_methods} methods, ${r.char_count} chars 다운로드.`);
  });
  document.getElementById('nf-bb-compile')?.addEventListener('click', async () => {
    setBbStatus('✅ Compile check 실행...');
    const r = await backend.compileCheck();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.all_pass ? '✓' : '⚠'} Compile — ${r.neurons} 뉴런, smoke=${r.smoke?.ok}, cv=${r.cv?.passes}, sig=${r.sig?.ok}. all_pass=${r.all_pass}.`);
  });
  document.getElementById('nf-bb-2snap')?.addEventListener('click', async () => {
    setBbStatus('🔀 2-snap diff 측정 중...');
    const r = await backend.compareTwoSnapshots({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ 2-snap (Δt=${r.elapsed_ms}ms) — shared ${r.shared}, +${r.added}, -${r.removed}, changed ${r.changed} (pot ${r.potentiated} / dep ${r.depressed}).`);
  });
  document.getElementById('nf-bb-watcher')?.addEventListener('click', async () => {
    setBbStatus('👁 Watcher tick 측정 중...');
    const r = await backend.watcherTick();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Watcher — ${r.neurons} 뉴런 / ${r.synapses} 시냅스, active ${r.active}, t=${r.current_t_ms}ms, passes=${r.passes}.`);
  });
  document.getElementById('nf-bb-final')?.addEventListener('click', async () => {
    const btn = document.getElementById('nf-bb-final');
    if (btn) btn.disabled = true;
    setBbStatus('🏁 Final pipeline (build all + train + all tests)...');
    const t0 = performance.now();
    const r = await backend.runFinalPipeline({});
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    await syncCanvas(setBbStatus, `🏁 FINAL (${dt}s) — ${r.neurons} 뉴런 / ${r.synapses} 시냅스, ${r.pass_count} pass / ${r.log.length} steps.`);
  });
  // Phase 186 autocorr.
  document.getElementById('nf-bb-acg')?.addEventListener('click', async () => {
    const name = prompt("ACG 측정 뉴런 이름 (예: ca1_0)");
    if (!name) return;
    setBbStatus(`🔁 ${name} ACG 계산 중...`);
    const r = await backend.autocorrelation(name, {});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.few_spikes) return setBbStatus(`🔁 spikes ${r.spikes} 부족.`);
    setBbStatus(`✓ ACG ${r.target} — ${r.spikes} spikes, peak lag ${r.peak_lag_ms}ms (count ${r.peak_count}), period ≈ ${r.estimated_period_hz}Hz.`);
  });
  // Phase 187 entropy.
  document.getElementById('nf-bb-entropy')?.addEventListener('click', async () => {
    setBbStatus('🎲 Network entropy 계산 중...');
    const r = await backend.networkEntropy({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.no_activity) return setBbStatus('🎲 발화 없음.');
    setBbStatus(`✓ Entropy — H=${r.shannon_entropy_bits} bits / max ${r.max_entropy_bits}, normalized ${r.normalized_entropy} (${r.verdict}). active ${r.active_neurons}.`);
  });
  // Phase 188 avalanche.
  document.getElementById('nf-bb-aval')?.addEventListener('click', async () => {
    setBbStatus('⚡ Avalanche distribution 측정 중...');
    const r = await backend.avalancheDist({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const histStr = Object.entries(r.log2_size_histogram || {})
      .map(([k, v]) => `2^${k}=${v}`).join(', ');
    setBbStatus(`✓ Avalanche — ${r.n_avalanches} cascades, max ${r.max_size}, mean ${r.mean_size}. log2 hist: ${histStr || '없음'}`);
  });
  // Phase 189 STA.
  document.getElementById('nf-bb-sta')?.addEventListener('click', async () => {
    const name = prompt("STA 측정 뉴런 (target, 예: out_0, ca1_0)");
    if (!name) return;
    setBbStatus(`🎯 ${name} STA 계산 중...`);
    const r = await backend.spikeTriggeredAverage(name, {});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.no_spikes) return setBbStatus(`🎯 ${r.target}: 발화 없음.`);
    if (r.no_sources) return setBbStatus(`🎯 ${r.target}: incoming source 없음.`);
    const top3 = (r.top_sources || []).slice(0, 3).map(s => `${s.name}=${s.contrib}`).join(', ');
    setBbStatus(`✓ STA ${r.target} (${r.n_target_spikes} spikes, ${r.n_sources} sources). Top contrib: ${top3 || '없음'}`);
  });
  // Phase 181 LIF sweep.
  document.getElementById('nf-bb-lif-sweep')?.addEventListener('click', async () => {
    setBbStatus('🧬 LIF τ_m sweep 측정 중...');
    const r = await backend.lifSweep({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const trace = (r.tau_sweep || []).map(t => `τ=${t.tau_m}→${t.rate_hz}Hz`).join(', ');
    setBbStatus(`✓ LIF sweep (${r.target_prefix}, n=${r.n_neurons}): ${trace}`);
  });
  // Phase 182 V1 orientation tuning.
  document.getElementById('nf-bb-orient')?.addEventListener('click', async () => {
    setBbStatus('📐 V1 orientation tuning 측정 중...');
    const r = await backend.testOrientation({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const dist = Object.entries(r.preferred_distribution || {})
      .map(([o, c]) => `o${o}=${c}`).join(', ');
    setBbStatus(`${r.verdict === 'diverse_tuning' ? '✓' : '⚠'} V1 orient — pool ${r.v1_pool}, ${r.n_orientations} orient. Pref dist: ${dist}. imbalance ${r.imbalance}.`);
  });
  // Phase 183 predictive coding.
  document.getElementById('nf-bb-pc')?.addEventListener('click', async () => {
    setBbStatus('🔄 Predictive coding error 측정 중...');
    const r = await backend.predictiveCoding({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Pred coding — V1 BU ${r.v1_bottom_up_spikes}, V1 TD ${r.v1_top_down_spikes}, PE=${r.prediction_error}. ${r.verdict}`);
  });
  // Phase 184 cross-region sync.
  document.getElementById('nf-bb-xreg-sync')?.addEventListener('click', async () => {
    setBbStatus('🔗 Cross-region sync (PFC↔HIPPO) 측정 중...');
    const r = await backend.crossRegionSync({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'synced' ? '✓' : '⚠'} Sync (${r.prefix_a}↔${r.prefix_b}) — n_a=${r.n_a}/n_b=${r.n_b}, spikes ${r.total_spikes_a}/${r.total_spikes_b}, pearson_r=${r.pearson_r}. ${r.verdict}`);
  });
  // Phase 185 signature.
  document.getElementById('nf-bb-sig')?.addEventListener('click', async () => {
    setBbStatus('🪪 Network signature 추출 중...');
    const r = await backend.networkSignature();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Sig — ${r.signature}. regions: ${Object.keys(r.regions).length}, ${r.neurons} 뉴런 / ${r.synapses} 시냅스.`);
  });
  // Phase 176 tonotopic.
  document.getElementById('nf-bb-tono-test')?.addEventListener('click', async () => {
    setBbStatus('🎶 Tonotopic selectivity 측정 중...');
    const r = await backend.testTonotopic({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'tonotopic_preserved' ? '✓' : '⚠'} Tono — ${r.n_columns} columns, accuracy ${r.selectivity_accuracy}. ${r.verdict}`);
  });
  // Phase 177 color selectivity.
  document.getElementById('nf-bb-color-test')?.addEventListener('click', async () => {
    setBbStatus('🎨 Color selectivity 측정 중...');
    const r = await backend.testColorSelectivity({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'color_selective' ? '✓' : '⚠'} Color — accuracy ${r.selectivity_accuracy}. ${r.verdict}`);
  });
  // Phase 178 BG action.
  document.getElementById('nf-bb-bg-act')?.addEventListener('click', async () => {
    setBbStatus('⚖ BG action selection 측정 중...');
    const r = await backend.testBgAction({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ BG (${r.gesture}) — D1 ${r.d1_spikes}sp / D2 ${r.d2_spikes}sp, D1 ratio ${r.d1_ratio}. ${r.verdict}`);
  });
  // Phase 179 episodic memory.
  document.getElementById('nf-bb-episodic')?.addEventListener('click', async () => {
    const btn = document.getElementById('nf-bb-episodic');
    if (btn) btn.disabled = true;
    setBbStatus('📚 Episodic memory encode + recall 진행 중...');
    const t0 = performance.now();
    const r = await backend.testEpisodicMemory({});
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'recall_present' ? '✓' : '⚠'} Episodic (${dt}s) — CA1 pool ${r.ca1_pool}, CA3 pool ${r.ca3_pool}. avg recall: CA1=${r.avg_ca1_recall}, CA3=${r.avg_ca3_recall}. ${r.verdict}`);
  });
  // Phase 171 delay distribution.
  document.getElementById('nf-bb-delay-dist')?.addEventListener('click', async () => {
    setBbStatus('⏱ Delay distribution 집계 중...');
    const r = await backend.delayDistribution();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.synapses === 0) return setBbStatus('⏱ 시냅스 없음.');
    const histStr = (r.histogram || []).map(c => c).join('/');
    const top3 = (r.top_region_pairs || []).slice(0, 3)
      .map(p => `${p.pair}=${p.mean_delay}ms`).join(', ');
    setBbStatus(`✓ Delays — ${r.synapses} 시냅스, range [${r.min}, ${r.max}]ms (10 bins: ${histStr}). Top: ${top3}`);
  });
  // Phase 172 place field.
  document.getElementById('nf-bb-place-field')?.addEventListener('click', async () => {
    setBbStatus('📍 Place field encoding 측정 중...');
    const r = await backend.testPlaceField({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const dist = Object.entries(r.loc_distribution || {})
      .map(([loc, c]) => `${loc}=${c}`).join(', ');
    setBbStatus(`${r.balanced ? '✓' : '⚠'} Place fields — CA1 ${r.ca1_pool}, ${r.locations.length} locations. Distribution: ${dist}. balanced=${r.balanced}.`);
  });
  // Phase 173 theta-gamma.
  document.getElementById('nf-bb-theta-gamma')?.addEventListener('click', async () => {
    setBbStatus('🌊 θ-γ coupling 측정 중...');
    const r = await backend.thetaGammaCoupling({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.no_activity) return setBbStatus(`🌊 ${r.target_prefix}: 발화 없음.`);
    setBbStatus(`${r.verdict === 'coupled' ? '✓' : '⚠'} θ-γ (${r.target_prefix}) — n=${r.n_neurons}, spikes ${r.total_spikes}, mod_idx ${r.modulation_index}. ${r.verdict} (θ ${r.theta_freq_hz}Hz, γ ${r.gamma_freq_hz}Hz)`);
  });
  // Phase 174 R-STDP.
  document.getElementById('nf-bb-rstdp')?.addEventListener('click', async () => {
    setBbStatus('💎 R-STDP reward pulse (positive Δw 증폭) 적용 중...');
    const r = await backend.applyRstdpPulse({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ R-STDP — ${r.synapses_amplified} 시냅스 증폭 (×${r.reward_strength}, positive_only=${r.positive_only}), total Δw=${r.total_amplified_delta}.`);
  });
  // Phase 175 homeostatic.
  document.getElementById('nf-bb-homeo')?.addEventListener('click', async () => {
    setBbStatus('⚖ Homeostatic normalization (target 5Hz) 적용 중...');
    const r = await backend.homeostaticNormalize({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Homeo — target ${r.target_hz}Hz (window ${r.window_ms}ms), ${r.synapses_adjusted} 시냅스 scaled (clamp [0.5, 2.0]).`);
  });
  // Phase 169 V1 lateral.
  document.getElementById('nf-bb-v1-lateral')?.addEventListener('click', async () => {
    setBbStatus('↔ V1 lateral horizontal connections 추가 중...');
    const r = await backend.buildV1Lateral({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ V1 lateral — pool ${r.v1_l23_pool}, existing ${r.existing_lateral}, added ${r.added_lateral} (density ${r.density}).`);
  });
  // Phase 166 sparseness.
  document.getElementById('nf-bb-sparseness')?.addEventListener('click', async () => {
    const prefix = prompt("Sparseness 계산 prefix (빈 값 = 전체, 예: 'ca1_', 'pfc_l5_')") ?? "";
    setBbStatus(`🧪 Sparseness 계산 중 (${prefix || 'all'})...`);
    const r = await backend.sparseness({ prefix });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.no_activity) return setBbStatus(`🧪 ${r.prefix}: 발화 없음 — 자극 후 다시.`);
    setBbStatus(`✓ Sparseness (${r.prefix}, n=${r.n_neurons}) — Treves-Rolls S=${r.treves_rolls_sparseness} (max sparse ${r.max_sparse_value}), active ${r.active_count}/${r.n_neurons}=${r.active_fraction}. ${r.verdict}`);
  });
  // Phase 167 learning curve.
  document.getElementById('nf-bb-curve')?.addEventListener('click', async () => {
    const btn = document.getElementById('nf-bb-curve');
    if (btn) btn.disabled = true;
    setBbStatus('📈 Learning curve (5 cycles × 3 epochs) — 시간 소요...');
    const t0 = performance.now();
    const r = await backend.learningCurve({});
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const trace = (r.curve || []).map(p => `c${p.cycle}=${p.selectivity}`).join(' → ');
    setBbStatus(`✓ Learning curve (${dt}s) — improvement ${r.improvement}. [${trace}]`);
  });
  // Phase 168 action conflict.
  document.getElementById('nf-bb-conflict')?.addEventListener('click', async () => {
    setBbStatus('⚔ Action conflict (pinch vs fist) 측정 중...');
    const r = await backend.testActionConflict({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const counts = Object.entries(r.out_counts || {}).map(([n, c]) => `${n}=${c}`).join(',');
    setBbStatus(`${r.verdict === 'decisive' ? '✓' : '⚠'} Conflict (${r.input_a} ↔ ${r.input_b}) — winner ${r.winner} (share ${r.winner_share}). out: ${counts}. ${r.verdict}`);
  });
  // Phase 162 NumPy vectorized run.
  document.getElementById('nf-bb-numpy')?.addEventListener('click', async () => {
    setBbStatus('⚡ NumPy vectorized prototype 측정 중...');
    const r = await backend.runVectorized({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.backend === 'pure_python_fallback') {
      return setBbStatus(`⚠ NumPy 미설치 — fallback. ${r.neurons_per_step} 뉴런 / ${r.spikes} spikes (window ${r.duration_ms || ''}ms).`);
    }
    setBbStatus(`✓ NumPy proto — ${r.neurons} 뉴런 / ${r.synapses} 시냅스 (${r.duration_ms}ms): pure ${r.elapsed_pure_python_sec}s vs np stub ${r.elapsed_numpy_stub_sec}s, speedup ${r.speedup_x}×. (stub = leak only)`);
  });
  // Phase 163 V4 RGB columns.
  document.getElementById('nf-bb-v4-rgb')?.addEventListener('click', async () => {
    setBbStatus('🌈 V4 RGB columns 구축 중...');
    const r = await backend.buildV4Rgb({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — RGB ${r.rgb_count}.`);
    await syncCanvas(setBbStatus, `✓ V4 RGB — ${r.colors.join('/')} × ${r.cells_per_color} = ${r.rgb_count}, ${r.synapses_added} 시냅스. V1 ${r.v1_sources} → RGB → V4 ${r.v4_targets}/IT ${r.it_targets}.`);
  });
  // Phase 164 SC layered.
  document.getElementById('nf-bb-sc-layered')?.addEventListener('click', async () => {
    setBbStatus('🎬 SC layered 구축 중...');
    const r = await backend.buildScLayered({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — sup ${r.sup_count}, int ${r.int_count}, deep ${r.deep_count}.`);
    await syncCanvas(setBbStatus, `✓ SC layered — sup ${r.sup_count} + int ${r.int_count} + deep ${r.deep_count}, ${r.synapses_added} 시냅스. V1 ${r.v1_sources} → sup → int (← FEF ${r.fef_sources}) → deep → AMN ${r.amn_targets}.`);
  });
  // Phase 165 PFC delay measurement.
  document.getElementById('nf-bb-pfc-delay')?.addEventListener('click', async () => {
    setBbStatus('⏳ PFC delay 측정 중 (cue=in_pinch)...');
    const r = await backend.measurePfcDelay({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const summary = Object.entries(r.groups || {})
      .map(([g, s]) => `${g}(${s.size}): cue=${s.cue_spikes}/delay=${s.delay_spikes} (p=${s.persistence})`).join(' | ');
    setBbStatus(`✓ PFC delay — cue=${r.cue_input} (${r.cue_ms}ms), delay ${r.delay_ms}ms. ${summary}`);
  });
  // Phase 156 auditory localization.
  document.getElementById('nf-bb-aud-loc')?.addEventListener('click', async () => {
    setBbStatus('📡 Auditory localization 구축 중...');
    const r = await backend.buildAuditoryLocalization({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — MSO ${r.mso_count}, LSO ${r.lso_count}.`);
    await syncCanvas(setBbStatus, `✓ Aud loc — MSO ${r.mso_count} (ITD) + LSO ${r.lso_count} (ILD), ${r.synapses_added} 시냅스. ${r.ear_l}/${r.ear_r} → MSO/LSO → A1 ${r.a1_targets}.`);
  });
  // Phase 157 receptive field.
  document.getElementById('nf-bb-rf')?.addEventListener('click', async () => {
    const name = prompt("Receptive field 조회할 뉴런 이름 (예: ca1_0, v2_L4_E_0)");
    if (!name) return;
    setBbStatus(`🎯 ${name} receptive field 조회 중...`);
    const r = await backend.receptiveField(name, {});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top3 = (r.top_fanin || []).slice(0, 3).map(f => `${f.from}(${f.region}, w=${f.weight})`).join(', ');
    const reg = (r.by_region || []).slice(0, 3).map(g => `${g.region}=${g.count}(μ${g.mean_weight})`).join(', ');
    setBbStatus(`✓ RF ${r.neuron} (${r.region}) — fanin ${r.fanin_total}. Top: ${top3 || '없음'}. By region: ${reg}`);
  });
  // Phase 158 population vector decoder.
  document.getElementById('nf-bb-pop-vec')?.addEventListener('click', async () => {
    setBbStatus('📡 Population vector decoding 측정 중...');
    const r = await backend.decodePopulation({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const decoded = Object.entries(r.self_decoding || {}).map(([g, d]) => `${g}→${d}`).join(', ');
    const sims = Object.entries(r.pairwise_similarity || {}).map(([k, v]) => `${k}=${v}`).join(', ');
    setBbStatus(`${r.verdict === 'good_decoding' ? '✓' : '⚠'} Pop decode — accuracy ${r.self_accuracy} (${decoded}). Pairwise sim: ${sims}`);
  });
  // Phase 159 STDP gain prefix.
  document.getElementById('nf-bb-stdp-prefix')?.addEventListener('click', async () => {
    const prefix = prompt("STDP gain 적용할 region prefix (예: ca1_, pfc_l5_)");
    if (!prefix) return;
    const mulStr = prompt("Gain multiplier (1.0 = unchanged, 2.0 = double STDP rate)", "1.5");
    const mul = parseFloat(mulStr);
    if (!isFinite(mul) || mul <= 0) return setBbStatus(`⚠ multiplier invalid: ${mulStr}`);
    setBbStatus(`🔧 '${prefix}' STDP × ${mul} 표시 중...`);
    const r = await backend.setStdpGainPrefix(prefix, mul);
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ STDP gain — '${r.prefix}' × ${r.gain_multiplier}, ${r.synapses_marked} 시냅스 marked. (현 marking only — 결구화 future work)`);
  });
  // Phase 151 S1 somatotopic.
  document.getElementById('nf-bb-s1-finger')?.addEventListener('click', async () => {
    setBbStatus('🖐 S1 finger map 구축 중...');
    const r = await backend.buildS1Somatotopic({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — ${r.finger_count} 셀.`);
    await syncCanvas(setBbStatus, `✓ S1 finger — ${r.n_fingers} 손가락 × ${r.cells_per_finger} = ${r.finger_count}, ${r.synapses_added} 시냅스. INPUT ${r.input_sources} → S1 finger col → V2 ${r.v2_targets}.`);
  });
  // Phase 152 inhibition tuner.
  document.getElementById('nf-bb-tune-inh')?.addEventListener('click', async () => {
    const prefix = prompt("Inhibition tune 할 region prefix (예: v1_, ca1_, pfc_)");
    if (!prefix) return;
    const mulStr = prompt("Multiplier (1.0 = unchanged, 1.5 = +50%, 0.5 = halve)", "1.5");
    const mul = parseFloat(mulStr);
    if (!isFinite(mul) || mul <= 0) return setBbStatus(`⚠ multiplier invalid: ${mulStr}`);
    setBbStatus(`⚖ '${prefix}' inhibition × ${mul} 적용 중...`);
    const r = await backend.tuneInhibition(prefix, mul);
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Inhibition tune — '${r.prefix}' × ${r.multiplier}, ${r.inhibitory_synapses_tuned} 시냅스 조정.`);
  });
  // Phase 153 critical period.
  document.getElementById('nf-bb-critical')?.addEventListener('click', async () => {
    setBbStatus('🌟 Critical period (5 cycles, gain ×3, DA boost) 진행 중...');
    const r = await backend.openCriticalPeriod({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Critical period — ${r.cycles} cycles × ${(r.duration_ms / r.cycles).toFixed(0)}ms, gain ×${r.gain_multiplier}, INPUT ${r.input_neurons_stimulated} 자극, ${r.total_spikes} spikes. snapshots ${r.snapshots_recorded}.`);
  });
  // Phase 154 RPE.
  document.getElementById('nf-bb-rpe')?.addEventListener('click', async () => {
    setBbStatus('📊 RPE 계산 중...');
    const r = await backend.computeRpe({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ RPE (${r.verdict}) — NAcc baseline ${r.nacc_baseline} / actual ${r.nacc_actual} (Δ${r.rpe_nacc}), VTA baseline ${r.vta_baseline} / actual ${r.vta_actual} (Δ${r.rpe_vta}).`);
  });
  // Phase 155 E2E demo.
  document.getElementById('nf-bb-e2e')?.addEventListener('click', async () => {
    const btn = document.getElementById('nf-bb-e2e');
    if (btn) btn.disabled = true;
    setBbStatus('🎬 E2E demo (baseline+snapshot+train+final+CV+raster+ISI)...');
    const t0 = performance.now();
    const r = await backend.runE2eDemo({});
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const stepStr = r.steps.map(s => s.step).join(' → ');
    setBbStatus(`✓ E2E (${dt}s) — pipeline: ${stepStr}. selectivity ${r.baseline_selectivity}→${r.final_selectivity} (Δ${r.delta}, ${r.verdict}). passes_validation=${r.passes_validation}.`);
  });
  // Phase 146 voltage trace.
  document.getElementById('nf-bb-vtrace')?.addEventListener('click', async () => {
    const name = prompt("V 추적할 뉴런 이름 (예: ca1_0, pfc_l5_0)");
    if (!name) return;
    setBbStatus(`🌊 ${name} membrane V 50ms trace 중...`);
    const r = await backend.traceVoltage(name, {});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    // Build small inline SVG.
    const W = 500, H = 200, padL = 50, padR = 10, padT = 14, padB = 26;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const samples = r.samples || [];
    const tMax = samples.length ? samples[samples.length - 1].t : 1;
    const vMin = r.v_rest - 5, vMax = Math.max(r.v_threshold + 5, r.v_max + 5);
    const vRange = vMax - vMin;
    const points = samples.map(s => {
      const x = padL + (s.t / tMax) * plotW;
      const y = padT + plotH - ((s.v - vMin) / vRange) * plotH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    const thY = padT + plotH - ((r.v_threshold - vMin) / vRange) * plotH;
    const restY = padT + plotH - ((r.v_rest - vMin) / vRange) * plotH;
    const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:rgba(15,23,42,0.5);border-radius:6px;">
      <rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="rgba(0,0,0,0.25)" stroke="#334155"/>
      <line x1="${padL}" y1="${thY}" x2="${padL + plotW}" y2="${thY}" stroke="#fbbf24" stroke-dasharray="3,3" opacity="0.6"/>
      <text x="${padL - 4}" y="${thY + 3}" font-size="9" fill="#fbbf24" text-anchor="end">V_th</text>
      <line x1="${padL}" y1="${restY}" x2="${padL + plotW}" y2="${restY}" stroke="#475569" stroke-dasharray="2,2" opacity="0.5"/>
      <text x="${padL - 4}" y="${restY + 3}" font-size="9" fill="#94a3b8" text-anchor="end">V_rest</text>
      <polyline points="${points}" fill="none" stroke="#22d3ee" stroke-width="1.5"/>
      <text x="${padL}" y="${H - 4}" font-size="10" fill="#94a3b8">0ms</text>
      <text x="${padL + plotW}" y="${H - 4}" font-size="10" fill="#94a3b8" text-anchor="end">${tMax}ms</text>
    </svg>`;
    await openDialog({
      title: `🌊 V trace — ${r.neuron} (${r.region}) — V[${r.v_min}, ${r.v_max}] mV`,
      bodyHTML: `<div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">cyan = V(t), amber dashed = V_threshold (${r.v_threshold}), gray dashed = V_rest (${r.v_rest})</div>${svg}`,
      okLabel: '닫기',
    });
    setBbStatus(`✓ V trace — ${r.neuron}: V range [${r.v_min}, ${r.v_max}], ${samples.length} samples.`);
  });
  // Phase 147 PSTH.
  document.getElementById('nf-bb-psth')?.addEventListener('click', async () => {
    const filt = prompt("PSTH prefix filter (빈 값 = 전체, 예: 'out_', 'ca1_')") ?? "";
    setBbStatus('📊 PSTH 측정 중...');
    const r = await backend.buildPsth({ prefixFilter: filt });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const peak = Math.max(...r.rates_hz);
    const peakBin = r.rates_hz.indexOf(peak);
    const peakT = peakBin * r.bin_ms;
    setBbStatus(`✓ PSTH (${r.prefix_filter}, ${r.n_neurons_counted} 뉴런) — ${r.n_bins} bins × ${r.bin_ms}ms, ${r.total_spikes} spikes. Peak @ ${peakT}ms = ${peak.toFixed(1)}Hz`);
  });
  // Phase 148 state diff.
  document.getElementById('nf-bb-state-diff')?.addEventListener('click', async () => {
    setBbStatus('🔀 State diff 측정 중...');
    const r = await backend.stateDiff({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ State diff (Δt=${r.elapsed_ms}ms) — synapses ${r.snapshot_synapse_count} → ${r.current_synapse_count} (Δ=${r.synapse_count_delta}), preserved ${r.preserved_synapses}, +${r.added_synapses}, -${r.removed_synapses}.`);
  });
  // Phase 149 ISI.
  document.getElementById('nf-bb-isi')?.addEventListener('click', async () => {
    setBbStatus('📈 ISI statistics 집계 중...');
    const r = await backend.isiStats({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.active_neurons === 0) return setBbStatus('📈 발화 뉴런 부족 — 자극 후 다시.');
    const reg = (r.top_regular || []).slice(0, 2).map(x => `${x.name}(CV ${x.cv})`).join(', ');
    const burst = (r.top_bursty || []).slice(0, 2).map(x => `${x.name}(CV ${x.cv})`).join(', ');
    setBbStatus(`✓ ISI — active ${r.active_neurons}, global mean ${r.global_mean_isi_ms}ms / CV ${r.global_cv} (${r.global_cv < 0.5 ? 'regular' : r.global_cv > 1.5 ? 'bursty' : 'poisson-like'}). Most regular: ${reg || '—'}. Most bursty: ${burst || '—'}`);
  });
  // Phase 141 reward-driven gesture training (long-running).
  document.getElementById('nf-bb-reward-train')?.addEventListener('click', async () => {
    const btn = document.getElementById('nf-bb-reward-train');
    if (btn) btn.disabled = true;
    setBbStatus('🏆 Reward training (pinch → out_0, 10 epochs DA boost)...');
    const t0 = performance.now();
    const r = await backend.rewardTrain({});
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const trace = (r.epoch_history || []).map(e => `e${e.epoch}=${e.target_spikes}`).join(' / ');
    setBbStatus(`${r.verdict === 'reward_learning_observed' ? '✓' : '⚠'} Reward (${dt}s) — ${r.gesture}→${r.target_out}: pre target ${r.pre_target_spikes}/other ${r.pre_other_spikes} → post ${r.post_target_spikes}/${r.post_other_spikes} (gain=${r.target_gain}). [${trace}]`);
  });
  // Phase 142 V2 L2/3 split.
  document.getElementById('nf-bb-v2-l23')?.addEventListener('click', async () => {
    setBbStatus('🔬 V2 L2/3 split 구축 중...');
    const r = await backend.buildV2L23Split({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — L23a ${r.l23a_count}, L23b ${r.l23b_count}.`);
    await syncCanvas(setBbStatus, `✓ V2 L2/3 split — L23a ${r.l23a_count} (FF) + L23b ${r.l23b_count} (recur), ${r.synapses_added} 시냅스. V2 L4 ${r.v2_l4_sources} → L23a → V4 ${r.v4_targets}.`);
  });
  // Phase 143 IT subdivision.
  document.getElementById('nf-bb-it-subdiv')?.addEventListener('click', async () => {
    setBbStatus('🎨 IT subdivision 구축 중...');
    const r = await backend.buildItSubdivision({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — TEO ${r.teo_count}, TE ${r.te_count}.`);
    await syncCanvas(setBbStatus, `✓ IT subdiv — TEO ${r.teo_count} (post) + TE ${r.te_count} (ant), ${r.synapses_added} 시냅스. V4 ${r.v4_sources} → TEO → TE → PRC ${r.prc_targets}.`);
  });
  // Phase 144 working memory.
  document.getElementById('nf-bb-test-wm')?.addEventListener('click', async () => {
    setBbStatus('🧠 WM persistent activity 측정 중...');
    const r = await backend.testPersistentActivity({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'wm_present' ? '✓' : '⚠'} WM — PFC pool ${r.pfc_pool}, cue subset ${r.cue_subset}: cue ${r.cue_spikes} sp / delay ${r.delay_spikes} sp (persistence=${r.persistence_ratio}). ${r.verdict}`);
  });
  // Phase 145 forgetting.
  document.getElementById('nf-bb-forgetting')?.addEventListener('click', async () => {
    if (!confirm("forgetting decay 적용? weight 가 baseline 으로 부분 회귀합니다 (학습 일부 망각).")) return;
    setBbStatus('🌫 Forgetting decay 적용 중...');
    const r = await backend.applyForgettingDecay({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Forgetting (τ=${r.decay_tau_ms}ms, elapsed=${r.elapsed_ms}ms, factor=${r.decay_factor}) — ${r.synapses_decayed} 시냅스 decay, total drift=${r.total_drift}, mean=${r.mean_drift}.`);
  });
  // Phase 136 V1 L2/3 split.
  document.getElementById('nf-bb-v1-l23')?.addEventListener('click', async () => {
    setBbStatus('🔬 V1 L2/3 split 구축 중...');
    const r = await backend.buildV1L23Split({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — L23a ${r.l23a_count}, L23b ${r.l23b_count}.`);
    await syncCanvas(setBbStatus, `✓ V1 L2/3 split — L23a ${r.l23a_count} (FF) + L23b ${r.l23b_count} (recur), ${r.synapses_added} 시냅스. V1 L4 ${r.v1_l4_sources} → L23a → V2 ${r.v2_targets}, L23b ↺ recurrent.`);
  });
  // Phase 137 A1 tonotopic.
  document.getElementById('nf-bb-a1-tono')?.addEventListener('click', async () => {
    setBbStatus('🎵 A1 tonotopic map 구축 중...');
    const r = await backend.buildA1Tonotopic({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — ${r.tonotopic_count} 셀.`);
    await syncCanvas(setBbStatus, `✓ A1 tonotopic — ${r.n_columns} 컬럼 × ${r.cells_per_column} 셀 = ${r.tonotopic_count}, ${r.synapses_added} 시냅스. INPUT ${r.input_sources} → A1 col → A2 ${r.a2_targets}.`);
  });
  // Phase 138 spike CSV export.
  document.getElementById('nf-bb-csv')?.addEventListener('click', async () => {
    setBbStatus('📑 Spike CSV 추출 중...');
    const r = await backend.exportSpikesCsv({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    try {
      const blob = new Blob([r.csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `spikes-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setBbStatus(`✓ CSV — ${r.rows} rows (${(r.csv.length / 1024).toFixed(1)} KB)${r.truncated ? ', truncated' : ''} 다운로드.`);
    } catch (err) {
      setBbStatus(`CSV 실패: ${err.message || err}`);
    }
  });
  // Phase 139 region graph.
  document.getElementById('nf-bb-region-graph')?.addEventListener('click', async () => {
    setBbStatus('🗺 Region graph 추출 중...');
    const r = await backend.regionGraph({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    try {
      const json = JSON.stringify({
        nodes: r.nodes, edges: r.edges,
        node_count: r.node_count, edge_count: r.edge_count,
      }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `region-graph-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBbStatus(`✓ Region graph — ${r.node_count} nodes, ${r.edge_count} edges 다운로드 (force-directed JSON).`);
    } catch (err) {
      setBbStatus(`Region graph 실패: ${err.message || err}`);
    }
  });
  // Phase 131 raster plot dialog (SVG).
  document.getElementById('nf-bb-raster-plot')?.addEventListener('click', async () => {
    setBbStatus('📈 Raster plot 그리는 중...');
    const r = await backend.exportRaster({ windowMs: 200.0, maxPoints: 2000 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (!r.events || r.events.length === 0) return setBbStatus('📈 spike events 없음 — 자극 후 다시 시도.');
    // 뉴런 → row index.
    const uniqueNeurons = [...new Set(r.events.map(e => e.name))].sort();
    const W = 720, H = Math.max(220, Math.min(720, uniqueNeurons.length * 8));
    const padL = 100, padT = 14, padB = 26, padR = 14;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const tMin = r.since_t, tMax = r.current_t;
    const tRange = Math.max(1e-3, tMax - tMin);
    const rowH = plotH / Math.max(1, uniqueNeurons.length);
    const nameToY = new Map(uniqueNeurons.map((n, i) => [n, padT + i * rowH + rowH / 2]));
    // Color by region prefix.
    const colorOf = (name) => {
      if (name.startsWith('v1_')) return '#4dd0e1';
      if (name.startsWith('v2_')) return '#b794f4';
      if (name.startsWith('out_')) return '#5eead4';
      if (name.startsWith('in_')) return '#f5b842';
      if (name.startsWith('ca')) return '#22c55e';
      if (name.startsWith('pfc_')) return '#a78bfa';
      if (name.startsWith('amg_') || name.startsWith('bla_') || name.startsWith('cen_')) return '#fb923c';
      return '#94a3b8';
    };
    const dots = r.events.map(e => {
      const x = padL + ((e.t - tMin) / tRange) * plotW;
      const y = nameToY.get(e.name) || padT;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.7" fill="${colorOf(e.name)}" opacity="0.85"/>`;
    }).join('');
    // 뉴런 이름 라벨 (sample).
    const labelStep = Math.max(1, Math.ceil(uniqueNeurons.length / 30));
    const labels = uniqueNeurons.map((n, i) => {
      if (i % labelStep) return '';
      const y = nameToY.get(n);
      return `<text x="${padL - 6}" y="${y + 3}" font-size="9" fill="#94a3b8" text-anchor="end" font-family="monospace">${n.length > 14 ? n.slice(0, 13) + '…' : n}</text>`;
    }).join('');
    // 시간 축 ticks (5).
    const ticks = Array.from({ length: 6 }, (_, i) => {
      const t = tMin + (tRange * i) / 5;
      const x = padL + (plotW * i) / 5;
      return `<line x1="${x}" y1="${H - padB}" x2="${x}" y2="${H - padB + 4}" stroke="#475569"/><text x="${x}" y="${H - padB + 16}" font-size="9" fill="#94a3b8" text-anchor="middle">${t.toFixed(0)}ms</text>`;
    }).join('');
    const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:rgba(15,23,42,0.5);border-radius:6px;">
      <rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="rgba(0,0,0,0.25)" stroke="#334155"/>
      ${labels}${ticks}${dots}
    </svg>`;
    await openDialog({
      title: `📈 Spike Raster Plot — ${r.events.length} events / ${uniqueNeurons.length} 뉴런 (window ${r.window_ms}ms)`,
      bodyHTML: `<div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">color = region prefix · x = time (ms) · y = neuron index. ${r.events.length >= 2000 ? '<span style="color:#fbbf24;">(2000+ truncated)</span>' : ''}</div>${svg}`,
      okLabel: '닫기',
    });
    setBbStatus(`✓ Raster — ${r.events.length} spikes / ${uniqueNeurons.length} 뉴런 plotted.`);
  });
  // Phase 132 region rate trend.
  document.getElementById('nf-bb-rate-trend')?.addEventListener('click', async () => {
    setBbStatus('📉 Region rate trend 측정 중...');
    const r = await backend.regionRateTrend({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top5 = Object.entries(r.regions || {})
      .sort((a, b) => {
        const aMax = Math.max(...Object.values(a[1]));
        const bMax = Math.max(...Object.values(b[1]));
        return bMax - aMax;
      }).slice(0, 5);
    const summary = top5.map(([reg, ws]) => {
      const wstr = Object.entries(ws).map(([w, v]) => `${w}=${v}Hz`).join('/');
      return `${reg}{${wstr}}`;
    }).join(', ');
    setBbStatus(`✓ Trend (windows ${r.windows_ms.join('/')}) — top 5: ${summary || '없음'}`);
  });
  // Phase 133 top firing.
  document.getElementById('nf-bb-top-firing')?.addEventListener('click', async () => {
    setBbStatus('🔥 Top firing leaderboard 측정 중...');
    const r = await backend.topFiring({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top5 = (r.top || []).slice(0, 5)
      .map(n => `${n.name}(${n.region})=${n.spikes}sp/${n.rate_hz}Hz`).join(', ');
    setBbStatus(`✓ Top firing — active ${r.active_neurons}, top 5: ${top5 || '없음'}`);
  });
  // Phase 134 neuron connectivity.
  document.getElementById('nf-bb-neuron-conn')?.addEventListener('click', async () => {
    const name = prompt("조회할 뉴런 이름 (예: ca1_0, pfc_l5_0, m1_0)");
    if (!name) return;
    setBbStatus(`🔌 ${name} fanin/fanout 조회 중...`);
    const r = await backend.neuronConnectivity(name);
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ ${r.neuron} (${r.region}/${r.population}) — fanin ${r.fanin_count}${r.truncated_fanin ? '+' : ''}, fanout ${r.fanout_count}${r.truncated_fanout ? '+' : ''}.`);
  });
  // Phase 135 STDP per region.
  document.getElementById('nf-bb-stdp-region')?.addEventListener('click', async () => {
    setBbStatus('📐 Region STDP delta 집계 중...');
    const r = await backend.regionStdpDelta({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top3 = (r.region_pairs || []).slice(0, 3)
      .map(p => `${p.pair}: μΔ=${p.mean_delta} (pot ${p.potentiated}/dep ${p.depressed})`).join(' | ');
    setBbStatus(`✓ STDP/region (Δt=${r.elapsed_ms}ms) — top 3: ${top3 || '변화 없음'}`);
  });
  // Phase 127 randomize weights.
  document.getElementById('nf-bb-randomize')?.addEventListener('click', async () => {
    if (!confirm("모든 시냅스 weight 를 랜덤 재초기화 (학습 리셋, topology 유지)?")) return;
    setBbStatus('🎲 Weight randomize 중...');
    const r = await backend.randomizeWeights({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Randomize — ${r.synapses_randomized} 시냅스 재초기화 (mean ${r.mean}±${r.std}, preserve_sign=${r.preserve_sign}).`);
  });
  // Phase 128 compare snapshot.
  document.getElementById('nf-bb-compare-snap')?.addEventListener('click', async () => {
    setBbStatus('🔍 Snapshot compare 중...');
    const r = await backend.compareSnapshot({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top3 = (r.top_changes || []).slice(0, 3)
      .map(c => `${c.pre}→${c.post}: ${c.from.toFixed(1)}→${c.to.toFixed(1)} (Δ${c.delta})`).join(' | ');
    setBbStatus(`✓ Compare (Δt=${r.elapsed_ms}ms) — shared ${r.shared_synapses}, +${r.added_synapses}, -${r.removed_synapses}, changed ${r.changed_synapses} (pot ${r.potentiated} / dep ${r.depressed}). Top: ${top3 || '없음'}`);
  });
  // Phase 129 functional connectivity.
  document.getElementById('nf-bb-func-conn')?.addEventListener('click', async () => {
    setBbStatus('🌐 Functional connectivity 측정 중...');
    const r = await backend.functionalConnectivity({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top5 = (r.top_pairs || []).slice(0, 5)
      .map(p => `${p.a}↔${p.b}=${p.jaccard}`).join(', ');
    setBbStatus(`✓ FuncConn — active ${r.active_neurons}, pairs ${r.total_pairs} (window ${r.window_ms}ms / bin ${r.bin_ms}ms). Top 5: ${top5 || '없음'}`);
  });
  // Phase 123 auto-train preset.
  document.getElementById('nf-bb-auto-train')?.addEventListener('click', async () => {
    const btn = document.getElementById('nf-bb-auto-train');
    if (btn) btn.disabled = true;
    setBbStatus('🚂 Auto-train pipeline (build all + train + validate)...');
    const t0 = performance.now();
    const r = await backend.runAutoTrain({});
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const stepStr = r.steps.map(s => `${s.step}=${s.ok ? '✓' : '✗'}`).join(', ');
    await syncCanvas(setBbStatus, `✓ Auto-train (${dt}s) — ${r.final_neurons} 뉴런 / ${r.final_synapses} 시냅스, selectivity Δ=${r.selectivity_delta} (final ${r.final_selectivity}). Steps: ${stepStr}`);
  });
  // Phase 124 freeze region.
  document.getElementById('nf-bb-freeze')?.addEventListener('click', async () => {
    const prefix = prompt("Freeze 할 region prefix (예: v1_ — STDP 학습 잠금)");
    if (!prefix) return;
    setBbStatus(`🧊 '${prefix}' freeze 중...`);
    const r = await backend.freezeRegion(prefix, true);
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Freeze '${r.prefix}' — ${r.synapses_affected} 시냅스 marked. Currently frozen: ${r.currently_frozen_regions.join(', ') || '없음'}.`);
  });
  // Phase 125 multi-modal.
  document.getElementById('nf-bb-multimodal')?.addEventListener('click', async () => {
    setBbStatus('🎭 Multi-modal (visual+audio) 측정 중...');
    const r = await backend.testMultiModal({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top = Object.entries(r.activity_by_region || {})
      .map(([reg, a]) => `${reg}=${a.active_count}/${a.neurons}(${a.total_spikes}sp)`).join(', ');
    setBbStatus(`✓ Multi-modal — scenario: ${r.scenario}. Activity: ${top}`);
  });
  // Phase 120 train selectivity (longer-running — disable button during).
  document.getElementById('nf-bb-train-sel')?.addEventListener('click', async () => {
    const btn = document.getElementById('nf-bb-train-sel');
    if (btn) btn.disabled = true;
    setBbStatus('🎓 Train selectivity 5 epochs 진행 중 (STDP on, DA boost)...');
    const t0 = performance.now();
    const r = await backend.trainSelectivity({});
    const dt = ((performance.now() - t0) / 1000).toFixed(2);
    if (btn) btn.disabled = false;
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const trace = (r.epoch_history || [])
      .map(e => `e${e.epoch}=${e.selectivity}`).join(' → ');
    const wd = r.weight_delta;
    const wd_str = wd ? `Δw: pot ${wd.potentiated} / dep ${wd.depressed} / stable ${wd.stable}, max|Δ|=${wd.max_abs_delta}` : '(weight 변화 없음)';
    setBbStatus(`${r.verdict === 'learning_observed' ? '✓' : '⚠'} Train (${dt}s) — baseline=${r.baseline_selectivity} → final=${r.final_selectivity} (Δ=${r.selectivity_delta}). [${trace}] ${wd_str}. ${r.verdict}`);
    // Phase 203: live learning curve mini-SVG dialog.
    const points = [{epoch: 0, sel: r.baseline_selectivity || 0}, ...(r.epoch_history || []).map(e => ({epoch: e.epoch, sel: e.selectivity}))];
    if (points.length >= 2) {
      const W = 460, H = 220, padL = 40, padR = 12, padT = 14, padB = 30;
      const plotW = W - padL - padR, plotH = H - padT - padB;
      const eMax = Math.max(...points.map(p => p.epoch));
      const sVals = points.map(p => p.sel);
      const sMax = Math.max(1.0, ...sVals);
      const polyPoints = points.map(p => {
        const x = padL + (p.epoch / Math.max(1, eMax)) * plotW;
        const y = padT + plotH - (p.sel / sMax) * plotH;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
      const dots = points.map(p => {
        const x = padL + (p.epoch / Math.max(1, eMax)) * plotW;
        const y = padT + plotH - (p.sel / sMax) * plotH;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#22d3ee"/><text x="${x.toFixed(1)}" y="${(y - 8).toFixed(1)}" font-size="9" fill="#cbd5e1" text-anchor="middle">${p.sel}</text>`;
      }).join('');
      const ticks = [0, 0.25, 0.5, 0.75, 1.0].map(t => {
        const y = padT + plotH - (t / sMax) * plotH;
        return `<line x1="${padL}" y1="${y}" x2="${padL + plotW}" y2="${y}" stroke="#334155" stroke-dasharray="2,2" opacity="0.4"/><text x="${padL - 4}" y="${y + 3}" font-size="9" fill="#94a3b8" text-anchor="end">${t}</text>`;
      }).join('');
      const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;background:rgba(15,23,42,0.5);border-radius:6px;">
        <rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="rgba(0,0,0,0.25)" stroke="#334155"/>
        ${ticks}
        <polyline points="${polyPoints}" fill="none" stroke="#22d3ee" stroke-width="2"/>
        ${dots}
        <text x="${padL + plotW / 2}" y="${H - 8}" font-size="11" fill="#94a3b8" text-anchor="middle">epoch</text>
        <text x="14" y="${padT + plotH / 2}" font-size="11" fill="#94a3b8" text-anchor="middle" transform="rotate(-90, 14, ${padT + plotH / 2})">selectivity</text>
      </svg>`;
      await openDialog({
        title: `📈 Live learning curve — Δ=${r.selectivity_delta} (${r.verdict})`,
        bodyHTML: `<div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">cyan = selectivity over training epochs (cycle 0 = baseline before training)</div>${svg}`,
        okLabel: '닫기',
      });
    }
  });
  // Phase 121 baseline check.
  document.getElementById('nf-bb-baseline')?.addEventListener('click', async () => {
    setBbStatus('📐 Baseline regression check 중...');
    const r = await backend.baselineCheck();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const s1 = r.stage1;
    const p2 = r.phase2;
    setBbStatus(`✓ Baseline — Stage 1: canonical ${s1.current_canonical_neurons} 뉴런 / ${s1.current_canonical_synapses} 시냅스 (expected 50, match=${s1.neurons_match}). Phase 2: 별도 데모 (target ${p2.expected_total} 뉴런, V1→V2 ${p2.expected_v1_to_v2_synapses}, V2→V1 ${p2.expected_v2_to_v1_synapses}).`);
  });
  // Phase 122 WebGPU readiness.
  document.getElementById('nf-bb-webgpu')?.addEventListener('click', async () => {
    setBbStatus('🚀 WebGPU readiness 측정 중...');
    const r = await backend.webgpuReadiness();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const icon = r.recommendation === 'TIER_3_REQUIRED' ? '🔴'
              : r.recommendation === 'TIER_3_CONSIDER' ? '🟡' : '🟢';
    setBbStatus(`${icon} ${r.recommendation} — ${r.current_neurons} 뉴런 / ${r.current_synapses} 시냅스, realtime ratio ${r.realtime_ratio}×, ${(r.neuron_steps_per_sec / 1e6).toFixed(2)}M neuron-steps/s. ${r.reason}`);
  });
  // Phase 116 raster export.
  document.getElementById('nf-bb-raster')?.addEventListener('click', async () => {
    setBbStatus('🌠 Raster 추출 중...');
    const r = await backend.exportRaster({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    try {
      const json = JSON.stringify({
        window_ms: r.window_ms, since_t: r.since_t, current_t: r.current_t,
        events: r.events, count: r.count,
      }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `raster-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBbStatus(`✓ Raster — ${r.count} spike events (window ${r.window_ms}ms${r.truncated ? ', truncated' : ''}) 다운로드.`);
    } catch (err) {
      setBbStatus(`Raster 실패: ${err.message || err}`);
    }
  });
  // Phase 117 telemetry.
  document.getElementById('nf-bb-telemetry')?.addEventListener('click', async () => {
    setBbStatus('📡 Telemetry 조회 중...');
    const r = await backend.getTelemetry();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const m = r.modulators;
    setBbStatus(`✓ Telemetry — ${r.neurons} 뉴런 / ${r.synapses} 시냅스, t=${r.current_t_ms}ms, 활성 ${r.active_neurons}, DA=${m.dopamine}, ACh=${m.acetylcholine}, 5HT=${m.serotonin}, STDP=${r.stdp_enabled ? 'on' : 'off'}.`);
  });
  // Phase 118 methods.
  document.getElementById('nf-bb-methods')?.addEventListener('click', async () => {
    setBbStatus('📚 Method catalog 조회 중...');
    const r = await backend.listMethods();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const summary = Object.entries(r.by_prefix)
      .map(([p, m]) => `${p}=${m.length}`).join(', ');
    setBbStatus(`✓ Methods — total ${r.total}: ${summary}`);
  });
  // Phase 112 weight histogram.
  document.getElementById('nf-bb-w-hist')?.addEventListener('click', async () => {
    setBbStatus('📊 Weight histogram 집계 중...');
    const r = await backend.weightHistogram({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.synapses === 0) return setBbStatus('📊 시냅스 없음.');
    const histStr = (r.counts || []).map((c, i) => {
      const left = r.edges[i]?.toFixed(1);
      const right = r.edges[i + 1]?.toFixed(1);
      return `[${left},${right})=${c}`;
    }).join(' ');
    setBbStatus(`✓ Hist (${r.synapses} 시냅스, range [${r.min}, ${r.max}], bin ${r.bin_size}) — ${histStr}`);
  });
  // Phase 113 snapshot weights.
  document.getElementById('nf-bb-w-snap')?.addEventListener('click', async () => {
    setBbStatus('📸 Weight snapshot 저장 중...');
    const r = await backend.snapshotWeights();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (!r.delta_vs_oldest) return setBbStatus(`✓ Snapshot ${r.snapshot_n} 저장 (${r.current_synapses} 시냅스). 또 호출하면 delta 측정.`);
    const d = r.delta_vs_oldest;
    setBbStatus(`✓ Snap ${r.snapshot_n} — Δw vs oldest (Δt=${(d.to_t - d.from_t).toFixed(1)}ms): potentiated ${d.potentiated} / depressed ${d.depressed} / stable ${d.stable}, mean Δ=${d.mean_delta}, max |Δ|=${d.max_abs_delta}.`);
  });
  // Phase 114 connectivity matrix.
  document.getElementById('nf-bb-conn')?.addEventListener('click', async () => {
    setBbStatus('🕸 Connectivity matrix 집계 중...');
    const r = await backend.connectivityMatrix({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top5 = (r.top_pairs || []).slice(0, 5)
      .map(p => `${p.key}=${p.count}(w̄${p.mean_weight})`).join(', ');
    setBbStatus(`✓ Connectivity — ${r.regions.length} regions, ${r.total_pairs} pair types. Top 5: ${top5}`);
  });
  // Phase 115 energy.
  document.getElementById('nf-bb-energy')?.addEventListener('click', async () => {
    setBbStatus('🔋 Energy 추정 중...');
    const r = await backend.estimateEnergy({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top = Object.entries(r.top5_regions || {}).map(([reg, c]) => `${reg}=${c}`).join(', ');
    setBbStatus(`✓ Energy (${r.window_ms}ms) — ${r.total_spikes} spikes (${r.avg_firing_hz}Hz/뉴런), spike=${r.spike_cost_units} + leak=${r.leak_cost_units} = ${r.total_cost_units} units. Top regions: ${top}`);
  });
  // Phase 111 reset region.
  document.getElementById('nf-bb-reset-region')?.addEventListener('click', async () => {
    const prefix = prompt("제거할 region prefix 입력 (예: bla_, dlpfc_, snc_). canonical (in_/out_/v1_/v2_) 은 보호됩니다.");
    if (!prefix) return;
    if (!confirm(`prefix '${prefix}' 시작 뉴런을 모두 제거할까요?`)) return;
    setBbStatus(`✂ '${prefix}' 제거 중...`);
    const r = await backend.resetRegion(prefix);
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    await syncCanvas(setBbStatus, `✓ '${prefix}' — ${r.neurons_removed} 뉴런 / ${r.synapses_removed} 시냅스 제거.`);
  });
  // Phase 105 DG pattern separation.
  document.getElementById('nf-bb-test-dg')?.addEventListener('click', async () => {
    setBbStatus('🧩 DG pattern separation 측정 중...');
    const r = await backend.testDgPatternSeparation({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'good_separation' ? '✓' : '⚠'} DG sep — overlap ${r.overlap_ratio} (sparse A=${r.sparseness_a}, B=${r.sparseness_b}). active A=${r.active_a}, B=${r.active_b}, ∩=${r.intersection}, ∪=${r.union}. ${r.verdict}`);
  });
  // Phase 106 CA3 pattern completion.
  document.getElementById('nf-bb-test-ca3')?.addEventListener('click', async () => {
    setBbStatus('🔁 CA3 pattern completion 측정 중...');
    const r = await backend.testCa3PatternCompletion({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'good_completion' ? '✓' : '⚠'} CA3 completion — cue ${r.cue_size}/${r.ca3_pool} 활성, non-cue ${r.non_cue_active} 활성 (rate ${r.completion_rate}). ${r.verdict}`);
  });
  // Phase 107 cross-modal binding.
  document.getElementById('nf-bb-test-binding')?.addEventListener('click', async () => {
    setBbStatus('🔗 Cross-modal binding (V1+A1→INS) 측정 중...');
    const r = await backend.testCrossModalBinding({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'binding_present' ? '✓' : '⚠'} Binding — V1 only ${r.ins_spikes_v1_only}, A1 only ${r.ins_spikes_a1_only}, both ${r.ins_spikes_both}. synergy=${r.synergy_ratio}× (>1 = supra-linear). ${r.verdict}`);
  });
  // Phase 108 WTA.
  document.getElementById('nf-bb-test-wta')?.addEventListener('click', async () => {
    setBbStatus('🏆 WTA 측정 중...');
    const r = await backend.testWta({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'wta_active' ? '✓' : '⚠'} WTA — winner ${r.winner} (${r.winner_count}/${r.total_spikes}, share=${r.winner_share}). ${r.verdict}`);
  });
  // Phase 109 dopamine effect.
  document.getElementById('nf-bb-test-da')?.addEventListener('click', async () => {
    setBbStatus('💊 Dopamine effect 측정 중...');
    const r = await backend.testDopamineEffect({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`${r.verdict === 'da_effective' ? '✓' : '⚠'} DA — DA=0: ${r.spikes_da_zero} spikes, DA=1.0: ${r.spikes_da_one} spikes, amplification=${r.amplification}×. ${r.verdict}`);
  });
  // Phase 101 verify behavior.
  document.getElementById('nf-bb-verify-behavior')?.addEventListener('click', async () => {
    setBbStatus('🎯 Behavior verification 실행 중...');
    const r = await backend.verifyBehavior({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const winners = Object.entries(r.results).map(([g, v]) =>
      v.ok ? `${g}→${v.winner || '∅'}(${v.winner_count})` : `${g}=${v.reason}`).join(', ');
    setBbStatus(`✓ Behavior — ${r.gestures_tested}개 gesture, ${r.out_neurons} OUT, selectivity=${r.selectivity} (unique winners ${r.unique_winners}). ${winners}`);
  });
  // Phase 102 weight stats.
  document.getElementById('nf-bb-weight-stats')?.addEventListener('click', async () => {
    setBbStatus('⚖ Weight stats 집계 중...');
    const r = await backend.weightStats();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.synapses === 0) return setBbStatus('⚖ 시냅스 없음.');
    const top3 = (r.top_region_pairs || []).slice(0, 3).map(p => `${p.pair}=${p.count}`).join(', ');
    setBbStatus(`✓ Weights — ${r.synapses} 시냅스, mean ${r.stats.mean}±${r.stats.std}, range [${r.stats.min}, ${r.stats.max}], +${r.stats.positive}/-${r.stats.negative}. Top: ${top3}`);
  });
  // Phase 103 region rates.
  document.getElementById('nf-bb-region-rates')?.addEventListener('click', async () => {
    setBbStatus('🔥 Region firing rates 측정 중...');
    const r = await backend.regionRates({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top = Object.entries(r.regions || {})
      .sort((a, b) => b[1].mean_hz - a[1].mean_hz).slice(0, 5)
      .map(([reg, s]) => `${reg}=${s.mean_hz}Hz(${s.active}/${s.count})`).join(', ');
    setBbStatus(`✓ Rates — top 5 regions (${r.window_ms}ms window): ${top || '없음'}`);
  });
  // Phase 104 region summary.
  document.getElementById('nf-bb-region-summary')?.addEventListener('click', async () => {
    setBbStatus('🗂 Region summary 집계 중...');
    const r = await backend.regionSummary();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const top10 = Object.entries(r.regions).slice(0, 10)
      .map(([reg, c]) => `${reg}=${c}`).join(', ');
    setBbStatus(`✓ Regions — ${r.total_neurons} 뉴런 / ${r.total_synapses} 시냅스, ${Object.keys(r.regions).length} regions. Top 10: ${top10}`);
  });
  // Phase 97 theta.
  document.getElementById('nf-bb-theta')?.addEventListener('click', async () => {
    setBbStatus('🌀 Theta rhythm 8Hz × 10 cycles 실행 중...');
    const r = await backend.triggerTheta({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Theta — ${r.cycles_run} cycles @ ${r.frequency_hz}Hz (${r.duration_ms}ms), pacemaker=${r.pacemaker}, ${r.total_spikes} spikes.`);
  });
  // Phase 98 gamma.
  document.getElementById('nf-bb-gamma')?.addEventListener('click', async () => {
    setBbStatus('⚡ Gamma 40Hz × 20 cycles 실행 중...');
    const r = await backend.triggerGamma({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Gamma — ${r.cycles_run} cycles @ ${r.frequency_hz}Hz (${r.duration_ms}ms), inh pool ${r.inh_pool}, ${r.total_spikes} spikes (PING).`);
  });
  // Phase 96 place remap.
  document.getElementById('nf-bb-place-remap')?.addEventListener('click', async () => {
    setBbStatus('🗺 Place cell remapping (CA1 noise)...');
    const r = await backend.triggerPlaceRemap({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Remap — CA1 ${r.ca1_count}, ${r.synapses_perturbed} 시냅스 perturbed (noise_std ${r.noise_std}).`);
  });
  // Phase 99 reset.
  document.getElementById('nf-bb-reset-dyn')?.addEventListener('click', async () => {
    setBbStatus('🔄 Dynamics reset 중...');
    const r = await backend.resetNetwork({ mode: 'dynamics' });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Dynamics reset — ${r.neurons_reset} 뉴런 v_rest 복원, t=0.`);
  });
  document.getElementById('nf-bb-reset-all')?.addEventListener('click', async () => {
    if (!confirm('Grown regions 모두 제거할까요? canonical (V1/V2/INPUT/OUT/source) 만 보존됩니다.')) return;
    setBbStatus('🗑 Grown regions 제거 중...');
    const r = await backend.resetNetwork({ mode: 'all' });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    await syncCanvas(setBbStatus, `✓ Reset all — ${r.neurons_removed} 뉴런 / ${r.synapses_removed} 시냅스 제거. ${r.neurons_remaining} 뉴런 남음 (canonical).`);
  });
  // Phase 95 cross-validate.
  document.getElementById('nf-bb-smoke-ext')?.addEventListener('click', async () => {
    setBbStatus('🧪 Cross-validate 실행 중...');
    const r = await backend.runCrossValidate();
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const verdict = r.passes ? '✓ PASS' : '⚠ WARN';
    setBbStatus(`${verdict} — ${r.neurons} 뉴런 / ${r.synapses} 시냅스. orphan ${r.orphan_synapses}, isolated ${r.isolated_neurons}, unexpected no-input ${r.no_input_unexpected}, no-output ${r.no_output_unexpected}, weights +${r.weight_positive}/-${r.weight_negative}, delays 0=${r.delay_zero}/<0=${r.delay_negative}.`);
  });
  // Phase 94 sleep replay.
  document.getElementById('nf-bb-replay-sleep')?.addEventListener('click', async () => {
    setBbStatus('💤 Sleep replay 실행 중 (CA1 burst x5)...');
    const r = await backend.runSleepReplay({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Sleep replay — ${r.bursts_run} bursts (${r.duration_ms}ms), CA1 pool ${r.ca1_pool}, ${r.total_spikes} spikes 생성. memory consolidation simulated.`);
  });
  // Phase 93 snapshot export.
  document.getElementById('nf-bb-export')?.addEventListener('click', async () => {
    setBbStatus('📥 Snapshot 추출 중...');
    const r = await backend.exportSnapshot({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    try {
      const json = JSON.stringify({
        version: r.version, exported_at: r.exported_at,
        neurons: r.neurons, synapses: r.synapses,
        global_state: r.global_state, stats: r.stats,
      }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neuronface-snapshot-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBbStatus(`✓ Export — ${r.stats.neuron_count} 뉴런 / ${r.stats.synapse_count} 시냅스 (${(json.length / 1024).toFixed(1)} KB) 다운로드 완료.`);
    } catch (err) {
      setBbStatus(`Export 실패: ${err.message || err}`);
    }
  });
  document.getElementById('nf-bb-lang')?.addEventListener('click', async () => {
    setBbStatus('🗣 Language 영역 구축 중...');
    const r = await backend.buildLanguageAreas({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — Broca ${r.broca_count} / Wernicke ${r.wern_count}.`);
    await syncCanvas(setBbStatus, `✓ Language 완료 — Broca ${r.broca_count} + Wernicke ${r.wern_count}, ${r.synapses_added} 시냅스. A2 ${r.a2_sources} → WERN → BROCA (arcuate fasciculus) → AMN ${r.amn_targets} (speech) + PFC ${r.pfc_targets} (cognition).`);
  });
  document.getElementById('nf-bb-sleepwake')?.addEventListener('click', async () => {
    setBbStatus('🛌 Sleep/Wake circuit 구축 중...');
    const r = await backend.buildSleepWakeCircuit({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — VLPO ${r.vlpo_count}.`);
    await syncCanvas(setBbStatus, `✓ Sleep/Wake 완료 — VLPO ${r.vlpo_count} ↔ ${r.wake_targets} wake promoters, ${r.synapses_added} mutual inhibition 시냅스. flip-flop switch 활성.`);
  });
  document.getElementById('nf-bb-rf')?.addEventListener('click', async () => {
    setBbStatus('⚡ Reticular Formation 구축 중...');
    const r = await backend.buildReticularFormation({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — RF ${r.rf_count}.`);
    await syncCanvas(setBbStatus, `✓ RF 완료 — ${r.rf_count}, ${r.synapses_added} 시냅스. sensory ${r.sensory_sources} → RF → TH ${r.th_targets} + cortex ${r.cortex_targets} (ARAS arousal broadcast).`);
  });
  document.getElementById('nf-bb-sleep-mode')?.addEventListener('click', async () => {
    setBbStatus('😴 Sleep mode 진입...');
    const r = await backend.sleepWakeToggle('sleep', {});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Sleep mode — VLPO active ${r.vlpo_active}, wake suppressed (active ${r.wake_active}). NE/ACh ↓.`);
  });
  document.getElementById('nf-bb-wake-mode')?.addEventListener('click', async () => {
    setBbStatus('☀️ Wake mode 진입...');
    const r = await backend.sleepWakeToggle('wake', {});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ Wake mode — wake active ${r.wake_active}, VLPO suppressed (active ${r.vlpo_active}). NE/ACh ↑.`);
  });
  document.getElementById('nf-bb-nmda-pfc')?.addEventListener('click', async () => {
    setBbStatus('💊 PFC L5 recurrent → NMDA upgrade 중...');
    const r = await backend.upgradeNmda('pfc_l5_', { pspDurationMs: 50, onlyRecurrent: true });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ NMDA upgrade 완료 — PFC L5 recurrent ${r.synapses_upgraded} 시냅스 (PSP 50ms, sustained activity). working memory 강화.`);
  });
  document.getElementById('nf-bb-nmda-ca3')?.addEventListener('click', async () => {
    setBbStatus('💊 CA3 recurrent → NMDA upgrade 중...');
    const r = await backend.upgradeNmda('ca3_', { pspDurationMs: 50, onlyRecurrent: true });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    setBbStatus(`✓ NMDA upgrade 완료 — CA3 recurrent ${r.synapses_upgraded} 시냅스 (PSP 50ms). pattern completion attractor 안정성 ↑.`);
  });
  document.getElementById('nf-bb-io')?.addEventListener('click', async () => {
    setBbStatus('🟠 Inferior Olive 구축 중...');
    const r = await backend.buildInferiorOlive({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — IO ${r.io_count}.`);
    await syncCanvas(setBbStatus, `✓ IO + CF 완료 — IO ${r.io_count} → ${r.pc_targets} PC (1:1 climbing fiber). LTD 학습 가능.`);
  });
  document.getElementById('nf-bb-ast')?.addEventListener('click', async () => {
    setBbStatus('🟦 Astrocyte 구축 중...');
    const r = await backend.buildAstrocytes({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — AST ${r.ast_count}.`);
    await syncCanvas(setBbStatus, `✓ Astrocyte 완료 — ${r.ast_count} (region: ${r.regions.join(', ')}). homeostasis step 으로 V_th 자동 조정 가능.`);
  });
  document.getElementById('nf-bb-homeo')?.addEventListener('click', async () => {
    setBbStatus('⚖️ homeostasis step 진행...');
    const r = await backend.astrocyteHomeostasisStep({ targetRateHz: 10.0 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const adj = r.regions_adjusted || [];
    if (adj.length === 0) {
      setBbStatus('✓ 모든 region 안정 범위 — V_th 조정 없음.');
    } else {
      const lines = adj.map(rg => {
        const d = r.details[rg];
        return `${rg}: ${d.mean_rate_hz}Hz → ${d.action} ±${Math.abs(d.delta_mv)}mV (${d.neurons_affected} 뉴런)`;
      }).join(' · ');
      setBbStatus(`✓ ${adj.length} region 조정 — ${lines}`);
    }
  });
  document.getElementById('nf-bb-commissural')?.addEventListener('click', async () => {
    setBbStatus('🔗 Commissural fibers 구축 중 (8 pairs sparse)...');
    const r = await backend.buildCommissuralFibers({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    await syncCanvas(setBbStatus, `✓ Commissural 완료 — ${r.pairs_processed} pair 처리, ${r.synapses_added} 시냅스 (long-range, density ${r.density}). cross-region binding 활성: V2↔A2, PFC↔PCC, AMG↔PFC, CA1↔PFC, PPC↔PFC, INS↔AMG, AG↔PPC.`);
  });
  document.getElementById('nf-bb-layers-v1')?.addEventListener('click', async () => {
    setBbStatus('🧱 V1 L1 + L6 추가 중...');
    const r = await backend.buildCorticalLayers({ regionPrefix: 'v1_' });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — V1 L1 ${r.l1_count} / L6 ${r.l6_count}.`);
    await syncCanvas(setBbStatus, `✓ V1 6-layer 완료 — L1 ${r.l1_count} + L6 ${r.l6_count}, ${r.synapses_added} 시냅스 (L23↔L1, L5→L6→L4 modulation, L6→TH ${r.th_targets} corticothalamic).`);
  });
  document.getElementById('nf-bb-layers-v2')?.addEventListener('click', async () => {
    setBbStatus('🧱 V2 L1 + L6 추가 중...');
    const r = await backend.buildCorticalLayers({ regionPrefix: 'v2_' });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — V2 L1 ${r.l1_count} / L6 ${r.l6_count}.`);
    await syncCanvas(setBbStatus, `✓ V2 6-layer 완료 — L1 ${r.l1_count} + L6 ${r.l6_count}, ${r.synapses_added} 시냅스 (canonical microcircuit, L6→TH corticothalamic feedback).`);
  });
  document.getElementById('nf-bb-cccloop')?.addEventListener('click', async () => {
    setBbStatus('🔄 Cerebro-cerebellar loop closure 진행...');
    const r = await backend.buildCerebroCerebellarLoop({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — DCN→TH ${r.existing_dcn_th_synapses} 시냅스.`);
    await syncCanvas(setBbStatus, `✓ Cerebro-cerebellar loop 닫힘 — ${r.synapses_added} 시냅스. DCN ${r.dcn_sources} → TH ${r.th_targets} → PFC ${r.pfc_targets}. 내부 모델 + 예측 오류 broadcast 회로 활성.`);
  });
  document.getElementById('nf-bb-ltd')?.addEventListener('click', async () => {
    // 가장 첫 user_in 또는 V1 L4_E 첫 노드를 input 으로, IO 0번째를 error 로 demo.
    const userIns = (state.userInputs || []).map(u => u.name);
    const v1l4 = (state.synapses || []).map(s => s.pre).filter(n => n && n.startsWith('v1_L4_E'));
    const inputs = userIns.length > 0 ? userIns.slice(0, 1) : v1l4.slice(0, 1);
    if (inputs.length === 0) return setBbStatus('⚠ input 노드 없음 (user_in 또는 V1 필요).');
    setBbStatus(`🩹 LTD train (input ${inputs[0]}, error IO_0, 10 rounds)...`);
    const r = await backend.cerebellumLtdTrain(inputs, [0], { rounds: 10 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    await syncCanvas(setBbStatus, `✓ LTD 적용 — ${r.ltd_applied_total} 시냅스 약화 (target PC: ${r.target_pcs.join(', ')}). Cerebellum motor learning 진행.`);
  });
  document.getElementById('nf-bb-replay')?.addEventListener('click', async () => {
    setBbStatus('💤 sleep replay 진행 (20 rounds)...');
    const r = await backend.replayHippocampus({ rounds: 20 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    await syncCanvas(setBbStatus, `✓ replay 완료 ${r.rounds} rounds × CA3 subset ${r.ca3_subset_size}/${r.ca3_total}.`);
  });
  document.getElementById('nf-bb-completion')?.addEventListener('click', async () => {
    setBbStatus('🧩 pattern completion test...');
    const r = await backend.testPatternCompletion({ partialRatio: 0.30 });
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const color = { STRONG: '#10b981', MODERATE: '#f5b842', WEAK: '#ef4444' }[r.verdict] || '#94a3b8';
    setBbStatus(`<span style="color:${color};font-weight:600;">${r.verdict}</span> — partial ${r.partial_size}/${r.ca3_total} → active CA3 ${r.active_ca3} (gain +${(r.completion_gain*100).toFixed(0)}%) · CA1 ${r.active_ca1}`);
  });
  document.getElementById('nf-bb-dg')?.addEventListener('click', async () => {
    setBbStatus('🌾 Dentate Gyrus 구축 중...');
    const r = await backend.buildDentateGyrus({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — DG ${r.dg_count}.`);
    await syncCanvas(setBbStatus, `✓ DG 완료 — ${r.dg_count} (sparse, V_th -52mV), ${r.synapses_added} 시냅스. V2 ${r.v2_sources} + PFC ${r.pfc_sources} → DG → CA3 ${r.ca3_targets} (mossy fiber 5%, pattern separation 활성).`);
  });
  document.getElementById('nf-bb-ec')?.addEventListener('click', async () => {
    setBbStatus('🚪 Entorhinal Cortex 구축 중...');
    const r = await backend.buildEntorhinalCortex({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — EC II/III/V ${r.ec_ii_count}/${r.ec_iii_count}/${r.ec_v_count}.`);
    await syncCanvas(setBbStatus, `✓ EC 완료 — II ${r.ec_ii_count} + III ${r.ec_iii_count} + V ${r.ec_v_count}, ${r.synapses_added} 시냅스. cortex ${r.cortex_sources} → EC II→DG ${r.dg_count} (perforant) + EC III→CA1 ${r.ca1_count} (temporoammonic), CA1→EC V→cortex (gateway 양방향).`);
  });
  document.getElementById('nf-bb-spatial')?.addEventListener('click', async () => {
    setBbStatus('🗺 Place + Grid cells 구축 중...');
    const r = await backend.buildSpatialNavigation({});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    if (r.already_exists) return setBbStatus(`이미 존재 — PLACE ${r.place_count} / GRID ${r.grid_count}.`);
    await syncCanvas(setBbStatus, `✓ Spatial 완료 — PLACE ${r.place_count} + GRID ${r.grid_count}, ${r.synapses_added} 시냅스. PPC ${r.ppc_sources} → GRID → PLACE → CA3 ${r.ca3_targets}. 📍 Inject 로 위치 자극 가능.`);
  });
  document.getElementById('nf-bb-spatial-inject')?.addEventListener('click', async () => {
    const x = parseFloat(prompt('X 위치 (0-1):', '0.5')) || 0.5;
    const y = parseFloat(prompt('Y 위치 (0-1):', '0.5')) || 0.5;
    setBbStatus(`📍 Spatial inject (x=${x.toFixed(2)}, y=${y.toFixed(2)})...`);
    const r = await backend.spatialInject(x, y, {});
    if (!r.ok) return setBbStatus(`실패: ${r.reason || ''}`);
    const winners = r.place_active_top5.map(p => `${p.name}(${p.rate_hz}Hz)`).join(', ');
    setBbStatus(`✓ inject ${r.grid_injected}/${r.grid_total} grid cells active → place winners: ${winners || '없음'}`);
  });
}

// Session 41+ Tier1-B: Cross-modal binding dialog.
// 사용자가 2+ user_in 노드를 선택 + 정답 OUT 지정 → 동시 inject + STDP 학습.
// Singer (1999) feature binding by synchrony — Hebbian "fire together wire together"
// 가 동시 발화 한 modality 들을 같은 cascade path 로 묶음.
async function openCrossModalBindDialog() {
  const backend = window.__neuronfaceBackend;
  if (!backend) return;
  const inputs = (state.userInputs || []);
  if (inputs.length < 2) {
    await dialogAlert('Cross-modal binding 은 USER INPUT 노드 2개 이상 필요. 라이브러리에서 더 추가해 주세요.', '🔗 Bind');
    return;
  }
  const targets = [
    ...(state.userOutputs || []).map(uo => ({ name: uo.name, label: `${uo.label} (사용자 액션)` })),
    { name: 'out_0', label: 'out_0 — Pointing (시스템)' },
    { name: 'out_1', label: 'out_1 — Open palm (시스템)' },
    { name: 'out_2', label: 'out_2 — Thumbs up (시스템)' },
    { name: 'out_3', label: 'out_3 — Victory (시스템)' },
  ];
  const inputCheckboxes = inputs.map(ui => {
    const kindIcon = { audio: '🎤', text: '📝', custom: '⚙️', image: '🖼️', motion: '📱', keyboard: '⌨️', mouse: '🖱️', geo: '📍', eeg: '🧠' };
    const ic = kindIcon[ui.kind] || '⚙️';
    return `<label style="display:flex;align-items:center;gap:8px;padding:6px 4px;cursor:pointer;border-radius:3px;">
      <input type="checkbox" class="nf-bind-input-cb" value="${ui.name}" data-kind="${ui.kind}" checked>
      <span>${ic} ${ui.label} <code style="opacity:0.5;font-size:10px;">${ui.name}</code></span>
    </label>`;
  }).join('');
  const targetOptions = targets.map(t => `<option value="${t.name}">${t.label}</option>`).join('');

  await openDialog({
    title: '🔗 Cross-modal Binding (다중 modality 동시 fire)',
    bodyHTML: `
      <p>여러 INPUT 을 <strong>동시 inject</strong> → Hebbian 으로 같은 OUT 으로 수렴 학습. 학술 근거: Singer (1999) feature binding by synchrony.</p>
      <p style="margin-top:10px;font-size:11px;color:#94a3b8;">동시 자극할 INPUT</p>
      <div style="max-height:160px;overflow-y:auto;border:1px solid rgba(167,139,250,0.18);border-radius:3px;padding:4px 6px;">
        ${inputCheckboxes}
      </div>
      <p style="margin-top:10px;font-size:11px;color:#94a3b8;">정답 OUT (binding target)</p>
      <select id="nf-bind-target" class="nf-multimodal-select" style="width:100%;padding:8px 10px;font-size:13px;">
        <option value="">(선택 — Train 시 필수)</option>
        ${targetOptions}
      </select>
      <div style="display:flex;gap:8px;margin-top:8px;align-items:center;">
        <span style="font-size:11px;color:#94a3b8;">Rounds</span>
        <select id="nf-bind-rounds" class="nf-multimodal-select" style="flex:1;padding:6px 8px;font-size:12px;">
          <option value="10">10×</option>
          <option value="20" selected>20× (권장)</option>
          <option value="30">30×</option>
          <option value="50">50×</option>
        </select>
      </div>
      <div id="nf-bind-status" style="margin-top:10px;font-size:11px;color:#94a3b8;min-height:18px;">2+ INPUT 선택 + 정답 OUT 지정 후 Train.</div>
    `,
    buttons: [
      { label: '닫기', kind: 'cancel', value: null },
      { label: '🧪 Test', kind: 'secondary', onClick: async () => {
        const items = collectBindItems();
        if (items.length < 2) { setBindStatus('⚠ 2개 이상 INPUT 선택 필요.'); return undefined; }
        setBindStatus(`🧪 동시 inject 테스트 (stdp off) — ${items.length} INPUT...`);
        const r = await backend.injectUserInputMulti(items, { stdp: false });
        if (!r.ok) { setBindStatus(`실패: ${r.reason || ''}`); return undefined; }
        const out = r.out_rates || {};
        const winner = Object.entries(out).sort((a, b) => b[1] - a[1])[0];
        setBindStatus(`✓ winner: ${winner ? `${winner[0]} = ${winner[1].toFixed(0)}Hz` : '없음'} — Saturation 카드 확인.`);
        return undefined;
      }},
      { label: '🎓 Train', kind: 'primary', onClick: async () => {
        const items = collectBindItems();
        if (items.length < 2) { setBindStatus('⚠ 2개 이상 INPUT 선택 필요.'); return undefined; }
        const target = document.getElementById('nf-bind-target')?.value;
        if (!target) { setBindStatus('⚠ 정답 OUT 을 선택해 주세요.'); return undefined; }
        const rounds = parseInt(document.getElementById('nf-bind-rounds')?.value || '20', 10);
        let okCount = 0;
        for (let i = 1; i <= rounds; i += 1) {
          setBindStatus(`🎓 binding 학습 ${i}/${rounds} (target: ${target})...`);
          const r = await backend.injectUserInputMulti(items, { stdp: true, targetOut: target });
          if (r.ok) okCount += 1;
        }
        setBindStatus(`✓ binding 학습 완료 ${okCount}/${rounds} → ${target}. Test 로 검증해 보세요.`);
        // 최종 snapshot 동기 → 캔버스 weight 색 갱신.
        const snap = await backend.getTrainingSnapshot();
        if (snap.ok && snap.response?.synapses) {
          if (lastFireResponse) lastFireResponse.synapses = snap.response.synapses;
          else lastFireResponse = { synapses: snap.response.synapses };
          state.synapses = snap.response.synapses;
          if (canvasShown && canvasMode === 'neuron') mountCanvasForMode();
        }
        return undefined;
      }},
    ],
  });

  function collectBindItems() {
    const cbs = Array.from(document.querySelectorAll('.nf-bind-input-cb'));
    return cbs.filter(cb => cb.checked).map(cb => ({
      name: cb.value,
      // 단순 균등 패턴 (8-bin all-on). 향후 modality 별 stored encoding 으로 확장 가능.
      pattern: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
      intensity: 1.0,
    }));
  }
  function setBindStatus(msg) {
    const el = document.getElementById('nf-bind-status');
    if (el) el.textContent = msg;
  }
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
  // Session 40: toolbar 상태 동기 — autoMount 가 .click() 없이 class 만 바꾸므로 명시 sync.
  window.dispatchEvent(new CustomEvent('snn-toolbar:sync', { detail: { mode: 'normal', view: 'neuron' } }));

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
  // Session 40: 편집 toolbar (top desktop / bottom mobile + sheet) 초기화.
  setupEditorToolbar();
});

// ─────────────────────────────────────────────────────────────
// Session 40: 편집 toolbar — Top (desktop) / Bottom (mobile) + Bottom sheet.
// ─────────────────────────────────────────────────────────────
function setupEditorToolbar() {
  const $ = (id) => document.getElementById(id);
  // 기존 버튼 click 으로 위임 — 모든 백엔드/상태 동기 로직 재사용.
  const fwdClick = (existingId) => () => {
    const el = document.getElementById(existingId);
    if (el) el.click();
  };

  // ── Top toolbar (desktop) ──
  const tbModeNormal = $('nf-tb-mode-normal');
  const tbModeEdit   = $('nf-tb-mode-edit');
  const tbViewRegion = $('nf-tb-view-region');
  const tbViewNeuron = $('nf-tb-view-neuron');
  const tbTrain      = $('nf-tb-train');
  const tbEval       = $('nf-tb-eval');
  const tbRl         = $('nf-tb-rl');
  const tbDemo       = $('nf-tb-demo');
  const tbBind       = $('nf-tb-bind');
  const tbSeq        = $('nf-tb-seq');
  const tbReset      = $('nf-tb-reset');
  const tbGrow       = $('nf-tb-grow');
  const tbHippo      = $('nf-tb-hippo');
  const tbStats      = $('nf-tb-stats');
  const tbSave       = $('nf-tb-save');
  const tbLoad       = $('nf-tb-load');
  const tbExport     = $('nf-tb-export');
  const tbImport     = $('nf-tb-import');
  const tbShare      = $('nf-tb-share');
  const tbSettings   = $('nf-tb-settings');

  if (tbModeNormal) tbModeNormal.addEventListener('click', () => { fwdClick('nf-mode-normal')(); syncToolbarMode('normal'); });
  if (tbModeEdit)   tbModeEdit.addEventListener('click',   () => { fwdClick('nf-mode-edit')();   syncToolbarMode('edit');   });
  if (tbViewRegion) tbViewRegion.addEventListener('click', () => { fwdClick('nf-canvas-mode-region')(); syncToolbarView('region'); });
  if (tbViewNeuron) tbViewNeuron.addEventListener('click', () => { fwdClick('nf-canvas-mode-neuron')(); syncToolbarView('neuron'); });
  if (tbTrain)      tbTrain.addEventListener('click', fwdClick('nf-train-cascade'));
  if (tbEval)       tbEval.addEventListener('click',  fwdClick('nf-decode-eval'));
  if (tbRl)         tbRl.addEventListener('click',    fwdClick('nf-supervised-batch'));
  if (tbDemo)       tbDemo.addEventListener('click',  fwdClick('nf-demo-large-train'));
  if (tbBind)       tbBind.addEventListener('click',  () => openCrossModalBindDialog());
  if (tbSeq)        tbSeq.addEventListener('click',   () => openSequenceLearnDialog());
  if (tbReset)      tbReset.addEventListener('click', fwdClick('nf-circuit-reset'));
  if (tbGrow)       tbGrow.addEventListener('click',  fwdClick('nf-grow-btn'));
  if (tbHippo)      tbHippo.addEventListener('click', () => buildHippocampusFromToolbar());
  if (tbStats)      tbStats.addEventListener('click', fwdClick('nf-dashboard-refresh'));
  if (tbSave)       tbSave.addEventListener('click',  fwdClick('nf-training-save'));
  if (tbLoad)       tbLoad.addEventListener('click',  fwdClick('nf-training-load'));
  if (tbExport)     tbExport.addEventListener('click', fwdClick('nf-circuit-export'));
  if (tbImport)     tbImport.addEventListener('click', fwdClick('nf-circuit-import'));
  if (tbShare)      tbShare.addEventListener('click',  () => openMarketplaceDialog());
  if (tbSettings) {
    tbSettings.addEventListener('click', () => {
      const panel = document.getElementById('neuronface-settings');
      if (!panel) return;
      panel.classList.toggle('open');
    });
  }

  // 기존 mode/view 버튼 클릭 시에도 toolbar 동기 (외부 click → toolbar active).
  ['nf-mode-normal', 'nf-mode-edit'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => syncToolbarMode(id === 'nf-mode-edit' ? 'edit' : 'normal'));
  });
  ['nf-canvas-mode-region', 'nf-canvas-mode-neuron'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => syncToolbarView(id === 'nf-canvas-mode-neuron' ? 'neuron' : 'region'));
  });

  function syncToolbarMode(mode) {
    if (tbModeNormal) tbModeNormal.classList.toggle('active', mode === 'normal');
    if (tbModeEdit)   tbModeEdit.classList.toggle('active',   mode === 'edit');
    // 모바일 bottom-bar mode slot 도 sync.
    const bbMode = document.querySelector('.nf-bb-slot[data-slot="mode"]');
    const bbModeLabel = document.getElementById('nf-bb-mode-label');
    if (bbMode) bbMode.classList.toggle('active', mode === 'edit');
    if (bbModeLabel) bbModeLabel.textContent = mode === 'edit' ? 'Edit' : 'Normal';
    const bbModeIcon = bbMode?.querySelector('.nf-bb-icon');
    if (bbModeIcon) bbModeIcon.textContent = mode === 'edit' ? '✏️' : '🖐';
  }
  function syncToolbarView(view) {
    if (tbViewRegion) tbViewRegion.classList.toggle('active', view === 'region');
    if (tbViewNeuron) tbViewNeuron.classList.toggle('active', view === 'neuron');
  }

  // 외부 dispatch 로 sync (autoMountCanvas 가 .click() 없이 class 변경 시).
  window.addEventListener('snn-toolbar:sync', (ev) => {
    const d = ev.detail || {};
    if (d.mode) syncToolbarMode(d.mode);
    if (d.view) syncToolbarView(d.view);
  });

  // ── Bottom toolbar (mobile) ──
  setupBottomBar();
  setupSheet();
}

// 모바일 bottom 5-slot bar — tap + long-press.
function setupBottomBar() {
  const bar = document.getElementById('nf-bottom-bar');
  if (!bar) return;
  const slots = bar.querySelectorAll('.nf-bb-slot');
  slots.forEach(slot => attachLongPress(slot, {
    tap: () => handleBottomTap(slot.dataset.slot),
    longPress: () => handleBottomLong(slot.dataset.slot),
    threshold: 500,
  }));
}

function handleBottomTap(slot) {
  switch (slot) {
    case 'add':   return openSheet('add');
    case 'train': return document.getElementById('nf-train-cascade')?.click();
    case 'eval':  return document.getElementById('nf-decode-eval')?.click();
    case 'save':  return document.getElementById('nf-training-save')?.click();
    case 'more':  return openSheet('more');
  }
}
async function handleBottomLong(slot) {
  switch (slot) {
    case 'train': {
      // long-press = Reset (확인 dialog).
      const ok = await dialogConfirm('회로를 초기 상태로 reset 할까요? 학습된 weight 모두 손실됩니다.', '회로 초기화');
      if (ok) document.getElementById('nf-circuit-reset')?.click();
      return;
    }
    case 'eval':  return document.getElementById('nf-supervised-batch')?.click();
    case 'save':  return openSheet('persist');
    case 'add':   return openSheet('add');
    case 'more':  return openSheet('more');
  }
}

// pointer-based long-press helper (touch + mouse 통합).
// pointer capture 로 손가락 이동 시에도 pointerup 이 같은 element 에 도달.
function attachLongPress(el, { tap, longPress, threshold = 500 }) {
  let timer = null;
  let triggered = false;
  let capturedId = null;
  const start = (ev) => {
    triggered = false;
    el.classList.add('long-pressing');
    try { el.setPointerCapture(ev.pointerId); capturedId = ev.pointerId; } catch (_) {}
    timer = setTimeout(() => {
      triggered = true;
      el.classList.remove('long-pressing');
      try { navigator.vibrate?.(15); } catch (_) {}
      longPress();
    }, threshold);
  };
  const finalize = (didTap) => {
    if (timer) { clearTimeout(timer); timer = null; }
    el.classList.remove('long-pressing');
    if (capturedId !== null) {
      try { el.releasePointerCapture(capturedId); } catch (_) {}
      capturedId = null;
    }
    if (didTap && !triggered) tap();
  };
  el.addEventListener('pointerdown', start);
  el.addEventListener('pointerup', () => finalize(true));
  el.addEventListener('pointercancel', () => finalize(false));
}

// Bottom sheet — Add / More / Persist / View 진입점 컨텐츠 동적 주입.
function setupSheet() {
  const sheet = document.getElementById('nf-sheet');
  if (!sheet) return;
  sheet.querySelectorAll('[data-sheet-close]').forEach(el => {
    el.addEventListener('click', closeSheet);
  });
  // drag handle: 95% 확장/축소 토글.
  const handle = sheet.querySelector('.nf-sheet-handle');
  if (handle) {
    handle.addEventListener('click', () => sheet.classList.toggle('expanded'));
  }
}
function openSheet(kind) {
  const sheet = document.getElementById('nf-sheet');
  const title = document.getElementById('nf-sheet-title');
  const body  = document.getElementById('nf-sheet-body');
  if (!sheet || !title || !body) return;
  if (kind === 'add')      { title.textContent = '노드 추가';        body.innerHTML = renderSheetAdd(); }
  else if (kind === 'more'){ title.textContent = '더보기';          body.innerHTML = renderSheetMore(); }
  else if (kind === 'persist'){ title.textContent = 'Save · Load · Export'; body.innerHTML = renderSheetPersist(); }
  else if (kind === 'view'){ title.textContent = '보기 옵션';        body.innerHTML = renderSheetView(); }
  else                     { title.textContent = '옵션';            body.innerHTML = ''; }
  // tile / list-btn 클릭 위임.
  body.querySelectorAll('[data-tile-action]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.dataset.tileAction;
      const param  = el.dataset.tileParam;
      handleSheetAction(action, param);
    });
  });
  sheet.classList.add('open');
}
function closeSheet() {
  const sheet = document.getElementById('nf-sheet');
  if (!sheet) return;
  sheet.classList.remove('open');
  sheet.classList.remove('expanded');
}
function renderSheetAdd() {
  const inputs = [
    ['audio',    '🎤', 'Audio'],   ['text',     '📝', 'Text'],
    ['custom',   '⚙️', 'Custom'],  ['image',    '🖼️', 'Image (soon)'],
    ['motion',   '📱', 'Motion (soon)'], ['keyboard', '⌨️', 'Keyboard (soon)'],
    ['mouse',    '🖱️', 'Mouse (soon)'], ['geo',      '📍', 'Geo (soon)'],
  ];
  const outs = [
    ['notification', '🔔', 'Notification'],
    ['speak',        '🔊', 'Speak'],
    ['webhook',      '🌐', 'Webhook'],
    ['console',      '📟', 'Console'],
  ];
  const inputTiles = inputs.map(([k, ic, lbl]) => {
    const dis = ['image','motion','keyboard','mouse','geo'].includes(k);
    return `<button class="nf-sheet-tile" data-tile-action="add-input" data-tile-param="${k}" type="button" ${dis ? 'disabled' : ''}>
      <span class="nf-sheet-tile-icon">${ic}</span><span class="nf-sheet-tile-label">${lbl}</span>
    </button>`;
  }).join('');
  const outTiles = outs.map(([k, ic, lbl]) => `
    <button class="nf-sheet-tile" data-tile-action="add-output" data-tile-param="${k}" type="button">
      <span class="nf-sheet-tile-icon">${ic}</span><span class="nf-sheet-tile-label">${lbl}</span>
    </button>`).join('');
  return `
    <div class="nf-sheet-section-label">INPUT 노드</div>
    <div class="nf-sheet-grid">${inputTiles}</div>
    <div class="nf-sheet-section-label">OUTPUT 노드 (액션)</div>
    <div class="nf-sheet-grid">${outTiles}</div>
  `;
}
function renderSheetMore() {
  return `
    <div class="nf-sheet-section-label">VIEW</div>
    <button class="nf-sheet-list-btn" data-tile-action="view" data-tile-param="region" type="button">
      <span class="nf-sheet-list-btn-icon">▦</span> Region 보기 (4 nodes)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="view" data-tile-param="neuron" type="button">
      <span class="nf-sheet-list-btn-icon">⬢</span> Neuron 보기 (52 nodes)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="fit" type="button">
      <span class="nf-sheet-list-btn-icon">⊕</span> Fit canvas (re-center)
    </button>
    <div class="nf-sheet-section-label">CIRCUIT</div>
    <button class="nf-sheet-list-btn" data-tile-action="reset" type="button">
      <span class="nf-sheet-list-btn-icon">↻</span> 회로 초기화 (Reset)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="load" type="button">
      <span class="nf-sheet-list-btn-icon">📂</span> Load training (localStorage)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="export" type="button">
      <span class="nf-sheet-list-btn-icon">📥</span> Export 회로 (JSON)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="import" type="button">
      <span class="nf-sheet-list-btn-icon">📤</span> Import 회로 (JSON)
    </button>
    <div class="nf-sheet-section-label">CONFIG</div>
    <button class="nf-sheet-list-btn" data-tile-action="endpoint" type="button">
      <span class="nf-sheet-list-btn-icon">⚙</span> Endpoint / API Key
    </button>
  `;
}
function renderSheetPersist() {
  return `
    <button class="nf-sheet-list-btn" data-tile-action="save" type="button">
      <span class="nf-sheet-list-btn-icon">💾</span> Save training (localStorage)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="load" type="button">
      <span class="nf-sheet-list-btn-icon">📂</span> Load training (localStorage)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="export" type="button">
      <span class="nf-sheet-list-btn-icon">📥</span> Export 회로 (JSON)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="import" type="button">
      <span class="nf-sheet-list-btn-icon">📤</span> Import 회로 (JSON)
    </button>
  `;
}
function renderSheetView() {
  return `
    <button class="nf-sheet-list-btn" data-tile-action="view" data-tile-param="region" type="button">
      <span class="nf-sheet-list-btn-icon">▦</span> Region 보기 (4 nodes)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="view" data-tile-param="neuron" type="button">
      <span class="nf-sheet-list-btn-icon">⬢</span> Neuron 보기 (52 nodes)
    </button>
    <button class="nf-sheet-list-btn" data-tile-action="fit" type="button">
      <span class="nf-sheet-list-btn-icon">⊕</span> Fit canvas (re-center)
    </button>
  `;
}
function handleSheetAction(action, param) {
  const click = (id) => document.getElementById(id)?.click();
  switch (action) {
    case 'add-input':
      // node-library 의 해당 kind 버튼 click — 기존 add 흐름 그대로.
      document.querySelector(`.nf-node-lib-btn[data-kind="${param}"]`)?.click();
      closeSheet();
      return;
    case 'add-output':
      document.querySelector(`.nf-out-lib-btn[data-out-kind="${param}"]`)?.click();
      closeSheet();
      return;
    case 'view':
      click(param === 'neuron' ? 'nf-canvas-mode-neuron' : 'nf-canvas-mode-region');
      closeSheet();
      return;
    case 'fit':    try { fitCanvasToNodes(0.9); } catch (_) {} closeSheet(); return;
    case 'reset':  click('nf-circuit-reset'); closeSheet(); return;
    case 'save':   click('nf-training-save'); closeSheet(); return;
    case 'load':   click('nf-training-load'); closeSheet(); return;
    case 'export': click('nf-circuit-export'); closeSheet(); return;
    case 'import': click('nf-circuit-import'); closeSheet(); return;
    case 'endpoint':
      // 데스크톱 settings 패널 강제 노출 — 모바일에서도 접근 가능 (CORE 탭).
      const panel = document.getElementById('neuronface-settings');
      if (panel) {
        panel.classList.add('open');
        panel.style.display = 'block';
        panel.style.zIndex = '2000';
      }
      closeSheet();
      return;
  }
}

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

// Phase 202: Brain Builder 버튼 → canvas region 강조 (region 빌드 후 클릭하면 해당 region 깜박).
function flashCanvasRegion(prefix) {
  const canvas = document.getElementById('nf-snn-canvas');
  if (!canvas || !prefix) return;
  const matched = canvas.querySelectorAll(`.drawflow-node`);
  let count = 0;
  matched.forEach((n) => {
    const id = n.dataset?.neuron || n.id?.replace('node-', '');
    const region = n.dataset?.region || '';
    if (region.toLowerCase().startsWith(prefix.toLowerCase().replace(/_$/, ''))
        || (id && id.startsWith(prefix))) {
      n.classList.add('snn-canvas-region-highlight');
      count++;
      setTimeout(() => n.classList.remove('snn-canvas-region-highlight'), 2000);
    }
  });
  return count;
}

// Phase 201/204/205: canvas panel (filter + legend) — 사용자 요청으로 제거됨.
// 함수 호출은 안전하게 no-op (DOM 없으면 즉시 return).
function setupCanvasPanel() {
  const panel = document.getElementById('nf-canvas-panel');
  if (!panel) return;   // 패널 제거 후 항상 여기서 return.
  const canvas = document.getElementById('nf-snn-canvas');
  if (!canvas) return;
  const search = document.getElementById('nf-cp-search');
  const legend = document.getElementById('nf-cp-legend');
  const body = document.getElementById('nf-cp-body');
  const toggle = document.getElementById('nf-cp-toggle');
  // Toggle collapse.
  toggle?.addEventListener('click', () => {
    const collapsed = body.classList.toggle('collapsed');
    toggle.textContent = collapsed ? '+' : '−';
  });
  // Phase 206: auto-layout button (region+population 그룹 별 동일 간격 수직 정렬).
  const autoLayoutBtn = document.getElementById('nf-cp-autolayout');
  autoLayoutBtn?.addEventListener('click', () => {
    canvas.classList.add('snn-canvas-autolayout');
    try {
      const r = autoLayoutByRegion({ minGap: 16 });
      if (r?.ok) {
        // Status flash via legend label area.
        const oldTitle = document.querySelector('.nf-cp-title')?.textContent;
        const titleEl = document.querySelector('.nf-cp-title');
        if (titleEl) {
          titleEl.textContent = `✓ ${r.nodes_moved}개 노드 정렬 (${r.groups} 그룹)`;
          setTimeout(() => { titleEl.textContent = oldTitle || '🔍 Filter / Legend'; }, 2000);
        }
      }
    } catch (e) {
      console.warn('[autoLayout] failed:', e);
    }
    // 트랜지션 완료 후 class 제거 (drag latency 방지).
    setTimeout(() => canvas.classList.remove('snn-canvas-autolayout'), 600);
  });
  // Build legend from current canvas nodes.
  const refreshLegend = () => {
    if (!legend) return;
    const nodes = canvas.querySelectorAll('.drawflow-node[data-region]');
    if (!nodes.length) {
      legend.innerHTML = '<span style="color:#64748b;">no nodes</span>';
      return;
    }
    // Group by region.
    const regionData = new Map();
    nodes.forEach((n) => {
      const r = n.dataset.region || '?';
      if (!regionData.has(r)) regionData.set(r, { count: 0, color: null });
      regionData.get(r).count++;
      if (!regionData.get(r).color) {
        // Try to grab color from inline style or compute from class.
        const colorEl = n.querySelector('[style*="background"]');
        if (colorEl) {
          const m = colorEl.getAttribute('style')?.match(/background:\s*([^;]+)/);
          if (m) regionData.get(r).color = m[1].trim();
        }
      }
    });
    const sorted = [...regionData.entries()].sort((a, b) => b[1].count - a[1].count);
    // Phase 205: 폴더 모양 SVG swatch (region color = fill).
    const folderSvg = `<svg viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path class="nf-cp-folder-fill" d="M1.5 3.2c0-.55.45-1 1-1h3.3l1.5 1.5h6.2c.55 0 1 .45 1 1v6.6c0 .55-.45 1-1 1H2.5c-.55 0-1-.45-1-1V3.2z"/></svg>`;
    legend.innerHTML = sorted.map(([region, data]) => {
      const color = data.color || '#94a3b8';
      return `<div class="nf-cp-legend-row" data-region="${region}">
        <div class="nf-cp-legend-swatch" style="--nf-cp-region-color:${color};">${folderSvg}</div>
        <span class="nf-cp-legend-label">${region}</span>
        <span class="nf-cp-legend-count">${data.count}</span>
      </div>`;
    }).join('');
    // Click row → toggle dim (filter).
    legend.querySelectorAll('.nf-cp-legend-row').forEach((row) => {
      row.addEventListener('click', () => {
        const r = row.dataset.region;
        const dimmed = row.classList.toggle('dimmed');
        canvas.querySelectorAll(`.drawflow-node[data-region="${r}"]`)
          .forEach((n) => n.style.opacity = dimmed ? '0.15' : '');
      });
    });
  };
  // Search filter.
  search?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const nodes = canvas.querySelectorAll('.drawflow-node[data-region]');
    nodes.forEach((n) => {
      const r = (n.dataset.region || '').toLowerCase();
      const p = (n.dataset.population || '').toLowerCase();
      const match = !q || r.includes(q) || p.includes(q);
      n.style.opacity = match ? '' : '0.15';
    });
  });
  // Initial + retry (drawflow async render).
  refreshLegend();
  setTimeout(refreshLegend, 400);
  setTimeout(refreshLegend, 1200);
  // Refresh on canvas update event.
  window.addEventListener('snn-canvas:source-mounted', () => setTimeout(refreshLegend, 300));
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
  // Phase 201/204/205: canvas panel init.
  setupCanvasPanel();
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
