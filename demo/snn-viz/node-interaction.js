// node-interaction.js
// Hover tooltip + click detail popover for SNN nodes.
// State source: window-scoped state passed via setup function.

import { state } from './state.js';
import { HANDFACE_GESTURE_TO_INPUT } from '../neuronface-backend.js';

const INPUT_TO_HANDFACE_GESTURE = Object.fromEntries(
  Object.entries(HANDFACE_GESTURE_TO_INPUT).map(([k, v]) => [v, k])
);

let tooltipEl = null;
let popoverEl = null;
// D45: live refresh 영역. popover 열림 시 dot 보존, fire 시 동일 dot 으로 재렌더.
let currentPopoverDot = null;
// D44/D47: rate + state 영역 통합 timestamp fade (transient).
// flashNeurons 600ms + region pulse 800ms 영역 정합.
const ACTIVE_FADE_MS = 1000;

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
  positionFloating(tip, dot.getBoundingClientRect());
}

function hideTooltip() {
  if (tooltipEl) tooltipEl.style.display = 'none';
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

  pop.innerHTML = `
    <div class="snn-node-popover__header">
      <span class="snn-node-popover__name">${name}</span>
      <button class="snn-node-popover__close" aria-label="close">×</button>
    </div>
    <div class="snn-node-popover__row"><span>region</span><span>${region}</span></div>
    <div class="snn-node-popover__row"><span>population</span><span>${population}</span></div>
    <div class="snn-node-popover__row"><span>rate</span><span>${rateStr}</span></div>
    <div class="snn-node-popover__row"><span>state</span><span class="${activeClass}">${activeStr}</span></div>
    ${gestureRow}
  `;
  pop.style.display = 'block';
  currentPopoverDot = dot;
  positionFloating(pop, dot.getBoundingClientRect());

  const closeBtn = pop.querySelector('.snn-node-popover__close');
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      hidePopover();
    };
  }
}

function hidePopover() {
  if (popoverEl) popoverEl.style.display = 'none';
  currentPopoverDot = null;
}

// D45: fire 발생 시 popover 열려있으면 동일 dot 으로 재렌더 (rate / state 갱신).
function refreshOpenPopover() {
  if (currentPopoverDot && popoverEl && popoverEl.style.display === 'block') {
    showPopover(currentPopoverDot);
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

  // D45: snn-viz/index.js 의 neuron-firing 핸들러가 lastFireResponse 갱신 직후 dispatch.
  window.addEventListener('snn-viz:fire-update', refreshOpenPopover);
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
