// node-interaction.js
// Hover tooltip + click detail popover for SNN nodes.
// State source: window-scoped state passed via setup function.

import { state } from './state.js';
import { HANDFACE_GESTURE_TO_INPUT } from '../neuronface-backend.js';
import { setPopoverActiveSynapses } from './synapse-lines.js';

const INPUT_TO_HANDFACE_GESTURE = Object.fromEntries(
  Object.entries(HANDFACE_GESTURE_TO_INPUT).map(([k, v]) => [v, k])
);

let tooltipEl = null;
let popoverEl = null;
// D45 / D48: live refresh 영역. tooltip / popover 열림 시 dot 보존, fire 시 동일 dot 으로 재렌더.
let currentTooltipDot = null;
let currentPopoverDot = null;
// D44/D47: rate + state 영역 통합 timestamp fade (transient).
// flashNeurons 600ms + region pulse 800ms 영역 정합.
const ACTIVE_FADE_MS = 1000;
// D49: tooltip / popover 표시 시점 영역 timer 기반 자동 refresh (fade 자연 휘발).
const REFRESH_TICK_MS = 200;
let refreshTimerId = null;

function ensureTooltip() {
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'snn-node-tooltip';
  tooltipEl.style.display = 'none';
  document.body.appendChild(tooltipEl);
  return tooltipEl;
}

function ensurePopover() {
  if (popoverEl) return popoverEl;
  popoverEl = document.createElement('div');
  popoverEl.className = 'snn-node-popover';
  popoverEl.style.display = 'none';
  document.body.appendChild(popoverEl);
  return popoverEl;
}

function getNodeMeta(name) {
  // state.neurons = snapshot from connection-status event (snn-viz/index.js).
  const found = (state.neurons || []).find((n) => n.name === name);
  return found || null;
}

// D47: rate 도 timestamp fade 적용 (직전 D44 = state 만 fade, rate stale 영역 결함 발견).
function getNodeRate(name) {
  const r = state.lastFireResponse || {};
  const rates = r.rates || {};
  const v = rates[name];
  if (typeof v !== 'number') return null;
  const ts = state.lastFire?.timestamp;
  if (typeof ts !== 'number') return null;
  if (performance.now() - ts >= ACTIVE_FADE_MS) return null;
  return v;
}

// D44 (T5.1-1 fix): rate 기반 일관성 + timestamp 1000ms fade (transient).
function isNodeActive(name) {
  const rate = getNodeRate(name);
  return rate !== null && rate > 0;
}

function positionFloating(el, anchorRect) {
  // Anchor = node bounding rect. Default = right side of node, fallback = left.
  const margin = 8;
  const elRect = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = anchorRect.right + margin;
  let top = anchorRect.top;

  if (left + elRect.width > vw - margin) {
    left = anchorRect.left - elRect.width - margin;
  }
  if (left < margin) left = margin;

  if (top + elRect.height > vh - margin) {
    top = vh - elRect.height - margin;
  }
  if (top < margin) top = margin;

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

function showTooltip(dot) {
  const name = dot.dataset.neuron;
  if (!name) return;
  const tip = ensureTooltip();
  const rate = getNodeRate(name);
  const rateStr = rate !== null ? rate.toFixed(2) : '—';
  tip.innerHTML = `
    <div class="snn-node-tooltip__name">${name}</div>
    <div class="snn-node-tooltip__rate">rate: ${rateStr}</div>
  `;
  tip.style.display = 'block';
  currentTooltipDot = dot;
  positionFloating(tip, dot.getBoundingClientRect());
  startRefreshTimer();
}

function hideTooltip() {
  if (tooltipEl) tooltipEl.style.display = 'none';
  currentTooltipDot = null;
}

// D48: fire 시 tooltip 열려있으면 동일 dot 으로 재렌더 (rate 갱신).
function refreshOpenTooltip() {
  if (currentTooltipDot && tooltipEl && tooltipEl.style.display === 'block') {
    showTooltip(currentTooltipDot);
  }
}

// D49: 표시 시점 영역 200ms interval 영역 자동 refresh — fade 자연 휘발 (timer trigger).
function startRefreshTimer() {
  if (refreshTimerId) return;
  refreshTimerId = setInterval(() => {
    refreshOpenTooltip();
    refreshOpenPopover();
    const tipOpen = currentTooltipDot && tooltipEl?.style.display === 'block';
    const popOpen = currentPopoverDot && popoverEl?.style.display === 'block';
    if (!tipOpen && !popOpen) stopRefreshTimer();
  }, REFRESH_TICK_MS);
}

function stopRefreshTimer() {
  if (refreshTimerId) {
    clearInterval(refreshTimerId);
    refreshTimerId = null;
  }
}

function showPopover(dot) {
  const name = dot.dataset.neuron;
  if (!name) return;
  const pop = ensurePopover();
  const meta = getNodeMeta(name);
  const region = meta?.region || '?';
  const population = meta?.population || '?';
  const rate = getNodeRate(name);
  const rateStr = rate !== null ? rate.toFixed(3) : '—';
  const active = isNodeActive(name);
  const activeStr = active ? 'active' : 'idle';
  const activeClass = active ? 'snn-node-popover__active--on' : 'snn-node-popover__active--off';
  // D43: INPUT region 영역 노드 = handface gesture 매핑 표시 (미매핑 노드 = future channel).
  const gestureRow = region === 'INPUT'
    ? `<div class="snn-node-popover__row"><span>gesture</span><span>${INPUT_TO_HANDFACE_GESTURE[name] || '<em class="snn-node-popover__future">future channel</em>'}</span></div>`
    : '';

  // T5.1-2b β: incoming syn weights (LTP source for post-fire learning).
  const synapses = (state.lastFireResponse && state.lastFireResponse.synapses) || [];
  const incomingSyns = synapses
    .filter(s => s.post === name)
    .sort((a, b) => b.weight - a.weight);
  const incomingHtml = incomingSyns.length > 0
    ? incomingSyns.map(s => `<div class="snn-popover-syn-row">
        <span class="snn-popover-syn-from">${s.pre}</span>
        <span class="snn-popover-syn-arrow">→</span>
        <span class="snn-popover-syn-weight" data-syn-key="${s.pre}__${s.post}">${s.weight.toFixed(3)}</span>
      </div>`).join('')
    : '<div class="snn-popover-syn-empty">no incoming</div>';
  const incomingSection = `
    <div class="snn-popover-syn-section">
      <div class="snn-popover-syn-label">incoming weights</div>
      ${incomingHtml}
    </div>
  `;

  // T5.1-2b γ: Triplet STDP traces (r1/r2/o1/o2) — stdp_mode='triplet' 영역만 표시.
  const traces = (state.lastFireResponse && state.lastFireResponse.traces) || {};
  const neuronTraces = traces[name] || { r1: 0, r2: 0, o1: 0, o2: 0 };
  const traceSection = state.stdpMode === 'triplet' ? `
    <div class="snn-popover-trace-section">
      <div class="snn-popover-trace-label">triplet traces</div>
      <div class="snn-popover-trace-row">
        <span class="snn-popover-trace-key">r1</span>
        <span class="snn-popover-trace-value" data-trace-key="${name}__r1">${neuronTraces.r1.toFixed(3)}</span>
      </div>
      <div class="snn-popover-trace-row">
        <span class="snn-popover-trace-key">r2</span>
        <span class="snn-popover-trace-value" data-trace-key="${name}__r2">${neuronTraces.r2.toFixed(3)}</span>
      </div>
      <div class="snn-popover-trace-row">
        <span class="snn-popover-trace-key">o1</span>
        <span class="snn-popover-trace-value" data-trace-key="${name}__o1">${neuronTraces.o1.toFixed(3)}</span>
      </div>
      <div class="snn-popover-trace-row">
        <span class="snn-popover-trace-key">o2</span>
        <span class="snn-popover-trace-value" data-trace-key="${name}__o2">${neuronTraces.o2.toFixed(3)}</span>
      </div>
    </div>
  ` : '';

  pop.innerHTML = `
    <div class="snn-node-popover__header">
      <span class="snn-node-popover__name">${name}</span>
      <button class="snn-node-popover__induce" aria-label="induce fire" title="induce fire">⚡</button>
      <button class="snn-node-popover__close" aria-label="close">×</button>
    </div>
    <div class="snn-node-popover__row"><span>region</span><span>${region}</span></div>
    <div class="snn-node-popover__row"><span>population</span><span>${population}</span></div>
    <div class="snn-node-popover__row"><span>rate</span><span data-value="rate">${rateStr}</span></div>
    <div class="snn-node-popover__row"><span>state</span><span data-value="state" class="${activeClass}">${activeStr}</span></div>
    ${gestureRow}
    ${incomingSection}
    ${traceSection}
  `;
  pop.style.display = 'block';
  currentPopoverDot = dot;
  positionFloating(pop, dot.getBoundingClientRect());
  startRefreshTimer();

  const closeBtn = pop.querySelector('.snn-node-popover__close');
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      hidePopover();
    };
  }
  // T5.1-2c-2: induce fire button → window event dispatch → scene.js listener → backend.induceFire.
  const induceBtn = pop.querySelector('.snn-node-popover__induce');
  if (induceBtn) {
    induceBtn.onclick = (e) => {
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent('induce-fire-request', {
        detail: { neuronName: name },
      }));
    };
  }
  // T5.1-2b ext: popover 영역 본 노드 incoming + outgoing line persistent highlight.
  setPopoverActiveSynapses(name);
}

function hidePopover() {
  if (popoverEl) popoverEl.style.display = 'none';
  currentPopoverDot = null;
  // T5.1-2b ext: popover 닫힘 영역 line .popover-active 자동 clear.
  setPopoverActiveSynapses(null);
}

// D45 / D50: fire 발생 시 popover 열려있으면 row 영역만 surgical update (closeBtn DOM 영역 안정 영역 정합).
function refreshOpenPopover() {
  if (!currentPopoverDot || !popoverEl || popoverEl.style.display !== 'block') return;
  const name = currentPopoverDot.dataset.neuron;
  if (!name) return;
  const rate = getNodeRate(name);
  const rateStr = rate !== null ? rate.toFixed(3) : '—';
  const active = isNodeActive(name);
  const activeStr = active ? 'active' : 'idle';
  const activeClass = active ? 'snn-node-popover__active--on' : 'snn-node-popover__active--off';
  const rateEl = popoverEl.querySelector('[data-value="rate"]');
  if (rateEl) rateEl.textContent = rateStr;
  const stateEl = popoverEl.querySelector('[data-value="state"]');
  if (stateEl) {
    stateEl.textContent = activeStr;
    stateEl.className = activeClass;
  }
  // T5.1-2b β: surgical update incoming syn weights (D50 패턴 정합, closeBtn DOM 안정).
  const synapses = (state.lastFireResponse && state.lastFireResponse.synapses) || [];
  synapses.forEach(s => {
    if (s.post !== name) return;
    const synKey = `${s.pre}__${s.post}`;
    const synEl = popoverEl.querySelector(`[data-syn-key="${synKey}"]`);
    if (synEl) synEl.textContent = s.weight.toFixed(3);
  });
  // T5.1-2b γ: surgical update Triplet STDP traces (mode='triplet' 영역만).
  if (state.stdpMode === 'triplet') {
    const traces = (state.lastFireResponse && state.lastFireResponse.traces) || {};
    const neuronTraces = traces[name] || { r1: 0, r2: 0, o1: 0, o2: 0 };
    ['r1', 'r2', 'o1', 'o2'].forEach(key => {
      const traceEl = popoverEl.querySelector(`[data-trace-key="${name}__${key}"]`);
      if (traceEl) traceEl.textContent = neuronTraces[key].toFixed(3);
    });
  }
}

function isInsidePopover(target) {
  return popoverEl && popoverEl.contains(target);
}

function isNode(target) {
  return target.closest && target.closest('.snn-node');
}

let globalListenersAttached = false;

function ensureGlobalListeners() {
  if (globalListenersAttached) return;
  globalListenersAttached = true;

  document.addEventListener('click', (e) => {
    if (popoverEl && popoverEl.style.display === 'block') {
      if (!isInsidePopover(e.target) && !isNode(e.target)) {
        hidePopover();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePopover();
  });

  // D45 / D48: snn-viz/index.js 의 neuron-firing 핸들러가 lastFireResponse 갱신 직후 dispatch.
  // popover + tooltip 영역 동시 refresh.
  window.addEventListener('snn-viz:fire-update', refreshOpenPopover);
  window.addEventListener('snn-viz:fire-update', refreshOpenTooltip);
}

export function attachNodeInteraction(dot) {
  ensureGlobalListeners();

  dot.addEventListener('mouseenter', () => {
    if (state.mode === 'edit') return;
    showTooltip(dot);
  });

  dot.addEventListener('mouseleave', () => {
    hideTooltip();
  });

  dot.addEventListener('click', (e) => {
    if (state.mode === 'edit') return;
    e.stopPropagation();
    hideTooltip();
    showPopover(dot);
  });
}
