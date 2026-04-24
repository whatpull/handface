/**
 * Exp5 measurement layer (temporary debug instrumentation).
 *
 * Activated only when the page URL carries `?mode=exp5` or `?measure=1`.
 * Otherwise this module is inert — no UI, no hooks attached, no impact on
 * the regular demo.
 *
 * What it does:
 *   - Sets up a floating "Measurement" panel with state machine controls
 *     (Start, Reset, Download CSV) and current target / countdown readout.
 *   - Runs a 4-gesture protocol: openpalm -> pointing -> thumbsup -> victory,
 *     each for 30 s of observation separated by 5 s rest and 3 s countdown.
 *   - Accumulates one row per MediaPipe frame (detected or not) plus paired
 *     neuronface responses. Emits CSV on demand.
 *
 * Ownership:
 *   - No globals except `window.__exp5` (for console debugging).
 *   - Attaches to HandControl via onFrameProbe option (Exp5-only TS hook).
 *   - Wires to scene.js via exported functions:
 *       exp5Active(), createExp5() -> api, exp5RecordDispatch, exp5RecordResponse
 */

const MODE_FLAGS = ['mode=exp5', 'measure=1'];

// ─────────────────────────────────────────
// Activation check
// ─────────────────────────────────────────
export function exp5Active() {
  const qs = (typeof window !== 'undefined' && window.location && window.location.search) || '';
  const sp = new URLSearchParams(qs);
  if (sp.get('mode') === 'exp5') return true;
  if (sp.get('measure') === '1') return true;
  // Support bare query forms as well
  return MODE_FLAGS.some((f) => qs.includes(f));
}

// ─────────────────────────────────────────
// UUID v4 (crypto-safe when available, rng fallback)
// ─────────────────────────────────────────
function uuidv4() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16),
          hex.slice(16, 20), hex.slice(20, 32)].join('-');
}

// ─────────────────────────────────────────
// State machine configuration
// ─────────────────────────────────────────
const COUNTDOWN_MS = 3000;
const TARGET_MS    = 30000;
const REST_MS      = 5000;
const SEQUENCE = ['openpalm', 'pointing', 'thumbsup', 'victory'];

// Linear list of phases, each with {name, label, target, duration, next}
// name ∈ {idle, countdown, target, rest, done}
function buildPhases() {
  const phases = [];
  for (let i = 0; i < SEQUENCE.length; i++) {
    const g = SEQUENCE[i];
    phases.push({ name: 'countdown', target: g, duration: COUNTDOWN_MS,
                  label: `Get ready: ${g.toUpperCase()}` });
    phases.push({ name: 'target',    target: g, duration: TARGET_MS,
                  label: g.toUpperCase() });
    if (i < SEQUENCE.length - 1) {
      phases.push({ name: 'rest', target: 'idle', duration: REST_MS,
                    label: 'REST — hand down' });
    }
  }
  phases.push({ name: 'done', target: 'idle', duration: 0, label: 'DONE — download CSV' });
  return phases;
}

// ─────────────────────────────────────────
// CSV row schema (kept in sync with README / commit message)
// ─────────────────────────────────────────
const CSV_COLUMNS = [
  'session_id',
  'started_at',
  'gesture_target',
  'timestamp_iso',
  'frame_idx',
  'detected_gesture',
  'detected_mapped',
  'gesture_confidence',
  'hand_x',
  'hand_y',
  'cooldown_passed',
  'v1_active',
  'max_peak_v',
  'neuronface_latency_ms',
  'cleanup_ok',
  'camera_resolution',
  'user_agent',
  'min_detection_confidence',
  'min_tracking_confidence',
];

// ─────────────────────────────────────────
// Factory
// ─────────────────────────────────────────
export function createExp5({ video = null } = {}) {
  const sessionId = uuidv4();
  const startedAt = new Date().toISOString();
  const buffer = [];
  let frameIdx = 0;

  // session meta captured on first frame
  let cameraResolution = '';
  const userAgent = (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  // These mirror GestureDetector.init() constants. Keep in sync if changed.
  const minDetectionConfidence = 0.35;
  const minTrackingConfidence  = 0.35;

  let currentTarget = 'idle';
  let phases = buildPhases();
  let phaseIdx = -1;
  let phaseStart = 0;
  let sessionActive = false;
  let tickTimer = null;

  // pending neuronface requests — keyed by monotonic dispatch id
  let nextDispatchId = 0;
  const pending = new Map();  // dispatchId -> {frameIdxAtDispatch, gesture, tPerf}

  // pairing diagnostics
  let pairedCount = 0;
  let missedCount = 0;  // response arrived but id unknown / target row not found

  // UI refs
  let rootEl, labelEl, countdownEl, progressEl, startBtn, resetBtn, downloadBtn, statusEl;

  function phase() {
    if (phaseIdx < 0 || phaseIdx >= phases.length) return null;
    return phases[phaseIdx];
  }

  function enterPhase(idx) {
    phaseIdx = idx;
    phaseStart = performance.now();
    const p = phase();
    if (!p) return;
    currentTarget = p.target;
    if (labelEl) labelEl.textContent = p.label;
    if (statusEl) statusEl.textContent = `phase: ${p.name}`;
  }

  function loopTick() {
    if (!sessionActive) return;
    const p = phase();
    if (!p) return;
    if (p.name === 'done') {
      stopSession(true);
      return;
    }
    const elapsed = performance.now() - phaseStart;
    const remaining = Math.max(0, p.duration - elapsed);
    if (countdownEl) {
      const s = (remaining / 1000).toFixed(1);
      countdownEl.textContent = `${s}s`;
    }
    if (progressEl) {
      const pct = p.duration > 0 ? Math.min(100, (elapsed / p.duration) * 100) : 100;
      progressEl.style.width = `${pct}%`;
    }
    if (elapsed >= p.duration) {
      enterPhase(phaseIdx + 1);
    }
    tickTimer = requestAnimationFrame(loopTick);
  }

  function startSession() {
    if (sessionActive) return;
    sessionActive = true;
    phases = buildPhases();
    buffer.length = 0;
    frameIdx = 0;
    if (startBtn)    startBtn.disabled    = true;
    if (downloadBtn) downloadBtn.disabled = true;
    enterPhase(0);
    tickTimer = requestAnimationFrame(loopTick);
  }

  function stopSession(finishedNormally = false) {
    sessionActive = false;
    if (tickTimer !== null) cancelAnimationFrame(tickTimer);
    tickTimer = null;
    currentTarget = 'idle';
    if (labelEl)     labelEl.textContent = finishedNormally ? 'DONE' : 'RESET';
    if (countdownEl) countdownEl.textContent = '—';
    if (progressEl)  progressEl.style.width = '0%';
    if (startBtn)    startBtn.disabled    = false;
    if (downloadBtn) downloadBtn.disabled = buffer.length === 0;
    if (statusEl)    statusEl.textContent = `rows: ${buffer.length}`;
  }

  function resetSession() {
    stopSession(false);
    buffer.length = 0;
    frameIdx = 0;
    pending.clear();
    pairedCount = 0;
    missedCount = 0;
    if (downloadBtn) downloadBtn.disabled = true;
    if (statusEl)    statusEl.textContent = 'ready';
  }

  // ── Camera resolution: lazy discovery. Works whether a video element
  //    was supplied at construction or found later in the DOM after MediaPipe
  //    + getUserMedia finish resolving. Cheap to re-check each frame until found.
  function _maybeCaptureCameraRes() {
    if (cameraResolution !== '') return;
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      cameraResolution = `${video.videoWidth}x${video.videoHeight}`;
      return;
    }
    if (typeof document === 'undefined') return;
    const vs = document.querySelectorAll('video');
    for (const v of vs) {
      if (v.videoWidth > 0 && v.videoHeight > 0) {
        cameraResolution = `${v.videoWidth}x${v.videoHeight}`;
        return;
      }
    }
  }

  // ── Frame probe handler (attached via HandControl.onFrameProbe) ──
  function onFrameProbe(frame) {
    _maybeCaptureCameraRes();
    const row = {
      session_id:              sessionId,
      started_at:              startedAt,
      gesture_target:          currentTarget,
      timestamp_iso:           new Date().toISOString(),
      frame_idx:               frameIdx++,
      detected_gesture:        frame.detectedGesture,
      detected_mapped:         frame.mappedGesture,
      gesture_confidence:      frame.gestureConfidence,
      hand_x:                  frame.handX,
      hand_y:                  frame.handY,
      cooldown_passed:         frame.cooldownPassed,
      v1_active:               null,
      max_peak_v:              null,
      neuronface_latency_ms:   null,
      cleanup_ok:              null,
      camera_resolution:       cameraResolution,
      user_agent:              userAgent,
      min_detection_confidence: minDetectionConfidence,
      min_tracking_confidence:  minTrackingConfidence,
    };
    buffer.push(row);
    if (statusEl && sessionActive && buffer.length % 30 === 0) {
      statusEl.textContent = `rows: ${buffer.length}`;
    }
  }

  // ── Dispatch / response pairing ──
  // When scene.js forwards a gesture to the neuronface backend, call
  // recordDispatch(gesture). It returns a dispatchId which scene.js must pass
  // back into recordResponse(dispatchId, response|null, error|null). The two
  // calls can be many frames apart; we pair by id, not by frame ordering.
  function recordDispatch(gesture) {
    const id = ++nextDispatchId;
    // HandControl fires gesture events INSIDE processStateMachine, which runs
    // BEFORE tick()'s finally block emits onFrameProbe. So the probe row that
    // records cooldown_passed=true for this dispatch has NOT been pushed yet:
    // it will get frame_idx === (current frameIdx value). Capture that.
    pending.set(id, {
      frameIdxAtDispatch: frameIdx,        // the NEXT row about to be pushed
      gesture,
      tPerf: performance.now(),
    });
    return id;
  }

  function recordResponse(id, response, error, latencyMs) {
    const info = pending.get(id);
    pending.delete(id);
    if (!info) {
      missedCount++;
      return;
    }
    // Find the row with frame_idx === info.frameIdxAtDispatch.
    // Linear scan from the end is fine (pending is short-lived).
    let targetRow = null;
    for (let i = buffer.length - 1; i >= 0; i--) {
      if (buffer[i].frame_idx === info.frameIdxAtDispatch) {
        targetRow = buffer[i];
        break;
      }
    }
    if (!targetRow) {
      missedCount++;
      return;
    }
    if (response && response.membrane_response_by_region) {
      const v1 = response.membrane_response_by_region.V1 || {};
      targetRow.v1_active  = v1.active_count ?? null;
      targetRow.max_peak_v = v1.max_peak_v ?? null;
    }
    targetRow.neuronface_latency_ms = latencyMs ?? null;
    // NeuronFaceBackend does not propagate cleanup_ok; leave null unless caller set it.
    if (response && typeof response._cleanup_ok === 'boolean') {
      targetRow.cleanup_ok = response._cleanup_ok;
    }
    pairedCount++;
  }

  // ── CSV export ──
  function buildCsv() {
    const escape = (v) => {
      if (v === null || v === undefined) return '';
      if (typeof v === 'boolean') return v ? 'true' : 'false';
      if (typeof v === 'number') {
        if (!Number.isFinite(v)) return '';
        return String(v);
      }
      const s = String(v);
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const header = CSV_COLUMNS.join(',');
    const lines = [header];
    for (const row of buffer) {
      lines.push(CSV_COLUMNS.map((c) => escape(row[c])).join(','));
    }
    return lines.join('\n') + '\n';
  }

  function downloadCsv() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_` +
                  `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const name = `exp5_session_${sessionId}_${stamp}.csv`;
    const blob = new Blob([buildCsv()], { type: 'text/csv;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
    if (statusEl) statusEl.textContent = `downloaded: ${name} (rows ${buffer.length})`;
  }

  // ── UI injection ──
  function ensureUI() {
    rootEl = document.getElementById('exp5-panel');
    if (rootEl) return;  // already injected
    rootEl = document.createElement('div');
    rootEl.id = 'exp5-panel';
    rootEl.innerHTML = `
      <div class="exp5-title">EXP5 · measurement</div>
      <div class="exp5-target" id="exp5-label">IDLE</div>
      <div class="exp5-countdown" id="exp5-countdown">—</div>
      <div class="exp5-progress"><div id="exp5-progress-bar"></div></div>
      <div class="exp5-actions">
        <button id="exp5-start" type="button">Start Session</button>
        <button id="exp5-reset" type="button">Reset</button>
        <button id="exp5-download" type="button" disabled>Download CSV</button>
      </div>
      <div class="exp5-status" id="exp5-status">ready</div>
    `;
    document.body.appendChild(rootEl);

    labelEl      = document.getElementById('exp5-label');
    countdownEl  = document.getElementById('exp5-countdown');
    progressEl   = document.getElementById('exp5-progress-bar');
    startBtn     = document.getElementById('exp5-start');
    resetBtn     = document.getElementById('exp5-reset');
    downloadBtn  = document.getElementById('exp5-download');
    statusEl     = document.getElementById('exp5-status');

    startBtn.addEventListener('click',    startSession);
    resetBtn.addEventListener('click',    resetSession);
    downloadBtn.addEventListener('click', downloadCsv);
  }

  ensureUI();

  const api = {
    onFrameProbe,
    recordDispatch,
    recordResponse,
    buildCsv,
    downloadCsv,
    get buffer() { return buffer; },
    get sessionId() { return sessionId; },
    get currentTarget() { return currentTarget; },
    get rowCount() { return buffer.length; },
    get pendingCount() { return pending.size; },
    get pairedCount() { return pairedCount; },
    get missedCount() { return missedCount; },
    get cameraResolution() { return cameraResolution; },
  };

  // console convenience
  if (typeof window !== 'undefined') {
    window.__exp5 = api;
    window.__exp5Log = buffer;   // alias requested in spec
  }

  return api;
}

export { CSV_COLUMNS };
