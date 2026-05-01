/**
 * SNN viz main entry — 7-layer Mixed.
 * - 좌측 Camera/Hand/Gesture col + 우측 INPUT→V1→V2→OUT row
 * - 카메라 element 이동 (cam-preview → Camera layer 안)
 * - HandControl event wiring (handLandmarks RAF + 4-gesture highlight)
 * - NeuronFaceBackend event wiring (connection-status / neuron-firing)
 * - Mode toggle (Settings 안 Normal/Edit + ⚙️ FAB indicator)
 * - 시냅스 line SVG overlay + fire animation (sequential pulse)
 */
import { state, loadPositions } from './state.js';
import { buildLayout } from './layout.js';
import { mountHand } from './hand.js';
import { mountGesture, highlightGesture } from './gesture.js';
import { renderCircuit, flashRegion, flashNeurons } from './circuit.js';
import {
  mountSynapseLines,
  renderSynapseLines,
  redrawAll as redrawSynapseLines,
  highlightSynapsesFromRegion,
  highlightSynapsesFromNeurons,
} from './synapse-lines.js';

export function initSnnViz({ control, backend }) {
  loadPositions();

  const root = document.getElementById('snn-viz-root');
  if (!root) {
    console.error('[snn-viz] #snn-viz-root not found');
    return;
  }
  const { snnFlow } = buildLayout(root);

  // Camera: cam-preview 를 Camera layer 안으로 이동 + display 복원
  const camPreview = document.getElementById('cam-preview');
  const cameraLayerBody = state.containers.camera.querySelector('.snn-layer-body');
  if (camPreview) {
    cameraLayerBody.appendChild(camPreview);
    camPreview.style.display = 'block';
  }
  state.containers.camera.classList.add('snn-layer-camera');

  console.info('[snn-viz] Phase B-1 done: 7-layer DOM built');

  // Hand
  const handBody = state.containers.hand.querySelector('.snn-layer-body');
  mountHand(handBody);

  // Gesture
  const gestureBody = state.containers.gesture.querySelector('.snn-layer-body');
  mountGesture(gestureBody);

  // Synapse SVG overlay
  if (snnFlow) mountSynapseLines(snnFlow);

  // ── HandControl wiring ──
  // handLandmarks RAF (60fps polling, 양손 포함)
  const landmarkRAF = () => {
    state.handLandmarks    = control.handLandmarks;
    state.handLandmarksAll = control.handLandmarksAll;
    requestAnimationFrame(landmarkRAF);
  };
  landmarkRAF();

  // 4-gesture highlight (scene.js 가 별도로 backend.sendGesture 호출 — 여기선 시각만)
  for (const g of ['pointing', 'openpalm', 'thumbsup', 'victory']) {
    control.on(g, () => {
      state.currentGesture = g;
      highlightGesture(g);
    });
  }

  console.info('[snn-viz] Phase B-2 done: hand + gesture wired');

  // ── NeuronFaceBackend wiring ──
  backend.onEvent((event) => {
    if (event.type === 'connection-status' && event.ok) {
      state.neurons  = event.neurons  || [];
      state.synapses = event.synapses || [];
      requestAnimationFrame(() => {
        renderCircuit(state.neurons, state.synapses);
        requestAnimationFrame(() => {
          renderSynapseLines();
          console.info('[snn-viz] Phase B-3 done: circuit + synapses rendered');
        });
      });
    } else if (event.type === 'neuron-firing') {
      state.lastFire = {
        gesture: event.gesture,
        target:  event.response?.target,
        timestamp: performance.now(),
      };
      // D41 본질 fix: backend 의 active_neurons_by_region 직접 사용.
      // top_active_neurons 한도 (5) 회피, V1/V2/OUT 의 모든 활성 neuron 식별.
      const r = event.response || {};
      state.lastFireResponse = r;
      // Phase 6.5: client-only weight history capture (induce_fire response 영역 synapses 영역 누적).
      if (Array.isArray(r.synapses) && r.synapses.length > 0) {
        state.induceCount += 1;
        const stdpEnabled = backend.stdpEnabled;
        const stdpMode = backend.stdpMode;
        const ts = Date.now();
        for (const s of r.synapses) {
          const key = `${s.pre}__${s.post}`;
          if (!state.weightHistory[key]) state.weightHistory[key] = [];
          state.weightHistory[key].push({
            induceCount: state.induceCount,
            weight:      s.weight,
            stdpEnabled,
            stdpMode,
            timestamp:   ts,
          });
        }
      }
      // D45: popover 가 열려있으면 live refresh (rate / state row 갱신).
      window.dispatchEvent(new CustomEvent('snn-viz:fire-update'));
      const activeByRegion = r.active_neurons_by_region || {};
      const inputNames = activeByRegion.INPUT || [];
      const v1Names = activeByRegion.V1 || [];
      const v2Names = activeByRegion.V2 || [];
      const outNames = activeByRegion.OUT || [];
      // INPUT
      flashRegion('INPUT');
      if (inputNames.length > 0) {
        flashNeurons('INPUT', inputNames);
        highlightSynapsesFromNeurons(inputNames);
      }
      flashArrow('arrow-input-v1', 100);
      // V1
      setTimeout(() => {
        flashRegion('V1');
        if (v1Names.length > 0) {
          flashNeurons('V1', v1Names);
          highlightSynapsesFromNeurons(v1Names);
        }
      }, 200);
      flashArrow('arrow-v1-v2', 350);
      // V2
      setTimeout(() => {
        flashRegion('V2');
        if (v2Names.length > 0) {
          flashNeurons('V2', v2Names);
          highlightSynapsesFromNeurons(v2Names);
        }
      }, 450);
      flashArrow('arrow-v2-out', 600);
      // OUT
      setTimeout(() => {
        flashRegion('OUT');
        if (outNames.length > 0) {
          flashNeurons('OUT', outNames);
        }
      }, 700);
    }
  });

  // ── Mode toggle (Settings Normal/Edit + FAB indicator) ──
  const modeNormalBtn = document.getElementById('nf-mode-normal');
  const modeEditBtn   = document.getElementById('nf-mode-edit');
  const settingsFab   = document.getElementById('nf-settings-fab');
  function setMode(next) {
    state.mode = next;
    root.classList.toggle('editing', next === 'edit');
    if (modeNormalBtn) modeNormalBtn.classList.toggle('active', next === 'normal');
    if (modeEditBtn)   modeEditBtn.classList.toggle('active',   next === 'edit');
    if (settingsFab)   settingsFab.classList.toggle('mode-edit', next === 'edit');
  }
  if (modeNormalBtn) modeNormalBtn.addEventListener('click', () => setMode('normal'));
  if (modeEditBtn)   modeEditBtn.addEventListener('click',   () => setMode('edit'));

  // Drag → 시냅스 line 재계산
  window.addEventListener('snn-viz:positions-changed', () => redrawSynapseLines());

  // Window resize
  window.addEventListener('resize', () => {
    if (state.neurons.length > 0) {
      requestAnimationFrame(() => {
        renderCircuit(state.neurons, state.synapses);
        requestAnimationFrame(() => redrawSynapseLines());
      });
    }
  });

  console.info('[snn-viz] Phase B-4 done: full init complete');
}

function flashArrow(arrowId, delay) {
  setTimeout(() => {
    const arrow = document.getElementById(arrowId);
    if (!arrow) return;
    arrow.classList.add('fired');
    setTimeout(() => arrow.classList.remove('fired'), 400);
  }, delay);
}
