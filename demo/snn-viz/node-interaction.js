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

  // Phase 6.5: weight history chart + CSV export (incoming synapses 영역 시간 축 영역).
  const historySection = renderWeightHistorySection(name, incomingSyns);

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
    ${historySection}
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
  // Phase 6.5: CSV export button (weight history section).
  const exportBtn = pop.querySelector('.nf-weight-history-export-btn');
  if (exportBtn) {
    exportBtn.onclick = (e) => {
      e.stopPropagation();
      exportWeightHistoryCsv(name, incomingSyns);
    };
  }
  // T5.1-2b ext: popover 영역 본 노드 incoming + outgoing line persistent highlight.
  setPopoverActiveSynapses(name);
}

// Phase 6.5: weight history chart (SVG) + CSV export button.
const HISTORY_CHART_W = 300;
const HISTORY_CHART_H = 150;
const HISTORY_PAD_L = 32;
const HISTORY_PAD_R = 8;
const HISTORY_PAD_T = 8;
const HISTORY_PAD_B = 22;
const HISTORY_W_MAX = 16;  // STDP_W_MAX (modules/neuron.py:62)

// condition 영역 색 (사용자 설계 정합).
const HISTORY_COLOR = {
  off:       '#888888',
  pair:      '#5b9bd5',
  triplet:   '#b794f4',
};

function pointColor(entry) {
  if (!entry.stdpEnabled) return HISTORY_COLOR.off;
  return entry.stdpMode === 'triplet' ? HISTORY_COLOR.triplet : HISTORY_COLOR.pair;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderWeightHistorySection(nodeName, incomingSyns) {
  // 본 노드 영역 incoming syn 영역 history series 영역 수집.
  const series = incomingSyns
    .map(s => {
      const key = `${s.pre}__${s.post}`;
      const entries = state.weightHistory[key] || [];
      return { pre: s.pre, post: s.post, key, entries };
    })
    .filter(ser => ser.entries.length > 0);

  if (series.length === 0) {
    return `
      <div class="nf-weight-history-section">
        <div class="nf-weight-history-header">
          <span class="nf-weight-history-label">weight history</span>
          <button class="nf-weight-history-export-btn" type="button" disabled title="no data">CSV</button>
        </div>
        <div class="nf-weight-history-empty">no induce yet</div>
      </div>
    `;
  }

  // x축 영역 = induce_count (1 ~ state.induceCount). y축 영역 = 0 ~ STDP_W_MAX (16).
  const xMax = Math.max(1, state.induceCount);
  const xToPx = (x) => HISTORY_PAD_L + (HISTORY_CHART_W - HISTORY_PAD_L - HISTORY_PAD_R) * (xMax === 1 ? 0.5 : (x - 1) / (xMax - 1));
  const yToPx = (w) => HISTORY_PAD_T + (HISTORY_CHART_H - HISTORY_PAD_T - HISTORY_PAD_B) * (1 - Math.max(0, Math.min(HISTORY_W_MAX, w)) / HISTORY_W_MAX);

  // grid lines (y: 0, 4, 8, 12, 16).
  const yTicks = [0, 4, 8, 12, 16];
  const gridLines = yTicks.map(w => `
    <line x1="${HISTORY_PAD_L}" y1="${yToPx(w)}" x2="${HISTORY_CHART_W - HISTORY_PAD_R}" y2="${yToPx(w)}"
          stroke="rgba(255,255,255,0.08)" stroke-width="1" />
    <text x="${HISTORY_PAD_L - 4}" y="${yToPx(w) + 3}" text-anchor="end"
          fill="#707070" font-size="9" font-family="monospace">${w}</text>
  `).join('');

  // x축 label (1, xMax).
  const xLabels = `
    <text x="${xToPx(1)}" y="${HISTORY_CHART_H - 6}" text-anchor="middle"
          fill="#707070" font-size="9" font-family="monospace">1</text>
    <text x="${xToPx(xMax)}" y="${HISTORY_CHART_H - 6}" text-anchor="middle"
          fill="#707070" font-size="9" font-family="monospace">${xMax}</text>
    <text x="${(HISTORY_PAD_L + HISTORY_CHART_W - HISTORY_PAD_R) / 2}" y="${HISTORY_CHART_H - 6}"
          text-anchor="middle" fill="#a0a0a0" font-size="9" font-family="monospace">induce #</text>
  `;

  // 각 series 영역 polyline + 각 point 영역 condition 색 circle.
  const seriesSvg = series.map(ser => {
    const points = ser.entries.map(e => `${xToPx(e.induceCount)},${yToPx(e.weight)}`).join(' ');
    const polyline = `<polyline points="${points}" fill="none" stroke="rgba(150,170,200,0.35)" stroke-width="1" />`;
    const circles = ser.entries.map(e => {
      return `<circle cx="${xToPx(e.induceCount)}" cy="${yToPx(e.weight)}" r="2.2"
                       fill="${pointColor(e)}" stroke="rgba(0,0,0,0.4)" stroke-width="0.5">
                <title>${escapeHtml(ser.pre)} → ${escapeHtml(ser.post)}: w=${e.weight.toFixed(3)} @ #${e.induceCount}</title>
              </circle>`;
    }).join('');
    return polyline + circles;
  }).join('');

  // 범례 (condition 색 영역).
  const legend = `
    <div class="nf-weight-history-legend">
      <span><span class="nf-wh-dot" style="background:${HISTORY_COLOR.off}"></span>OFF</span>
      <span><span class="nf-wh-dot" style="background:${HISTORY_COLOR.pair}"></span>Pair</span>
      <span><span class="nf-wh-dot" style="background:${HISTORY_COLOR.triplet}"></span>Triplet</span>
    </div>
  `;

  const totalPoints = series.reduce((sum, ser) => sum + ser.entries.length, 0);

  return `
    <div class="nf-weight-history-section">
      <div class="nf-weight-history-header">
        <span class="nf-weight-history-label">weight history (${series.length} syn × ${totalPoints} pts)</span>
        <button class="nf-weight-history-export-btn" type="button" title="export CSV">CSV</button>
      </div>
      <svg class="nf-weight-history-chart" viewBox="0 0 ${HISTORY_CHART_W} ${HISTORY_CHART_H}"
           xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        ${gridLines}
        ${xLabels}
        ${seriesSvg}
      </svg>
      ${legend}
    </div>
  `;
}

// Phase 8: cascade weight history multi-line chart + CSV export.
const CASCADE_PREFIXES = [
  ['v1_L4_E',  'v1_L23_E'],
  ['v1_L23_E', 'v2_L4_E'],
  ['v2_L4_E',  'v2_L23_E'],
  ['v2_L23_E', 'v2_L5_E'],
  ['v2_L5_E',  'out_'],
];

const CASCADE_STAGE_COLORS = [
  '#5b9bd5',  // V1 L4_E → V1 L23_E
  '#b794f4',  // V1 L23_E → V2 L4_E
  '#f4a261',  // V2 L4_E → V2 L23_E
  '#2a9d8f',  // V2 L23_E → V2 L5_E
  '#e76f6f',  // V2 L5_E → OUT
];

const CASCADE_CHART_W = 560;
const CASCADE_CHART_H = 280;
const CASCADE_PAD_L = 48;
const CASCADE_PAD_R = 12;
const CASCADE_PAD_T = 12;
const CASCADE_PAD_B = 32;

function isCascadeSyn(pre, post) {
  return CASCADE_PREFIXES.some(([p, q]) => pre.startsWith(p) && post.startsWith(q));
}

function cascadeStageIndex(pre, post) {
  return CASCADE_PREFIXES.findIndex(([p, q]) => pre.startsWith(p) && post.startsWith(q));
}

export function renderCascadeWeightHistory() {
  // 모든 cascade syn 영역 history series 수집.
  const series = [];
  for (const [key, entries] of Object.entries(state.weightHistory)) {
    if (!entries.length) continue;
    const [pre, post] = key.split('__');
    if (!isCascadeSyn(pre, post)) continue;
    series.push({ pre, post, key, entries, stageIdx: cascadeStageIndex(pre, post) });
  }

  if (series.length === 0) {
    return `<div class="nf-cascade-empty">no induce yet — induce 진행 후 cascade weight chart 표시.</div>`;
  }

  // Auto y axis = max weight × round to next 20.
  let maxW = 0;
  for (const ser of series) {
    for (const e of ser.entries) {
      if (e.weight > maxW) maxW = e.weight;
    }
  }
  const yMax = Math.max(20, Math.ceil(maxW / 20) * 20);
  const xMax = Math.max(1, state.induceCount);

  const xToPx = (x) => CASCADE_PAD_L + (CASCADE_CHART_W - CASCADE_PAD_L - CASCADE_PAD_R) * (xMax === 1 ? 0.5 : (x - 1) / (xMax - 1));
  const yToPx = (w) => CASCADE_PAD_T + (CASCADE_CHART_H - CASCADE_PAD_T - CASCADE_PAD_B) * (1 - Math.max(0, Math.min(yMax, w)) / yMax);

  // Y grid (5 ticks).
  const yTicks = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax].map(v => Math.round(v * 10) / 10);
  const gridSvg = yTicks.map(w => `
    <line x1="${CASCADE_PAD_L}" y1="${yToPx(w)}" x2="${CASCADE_CHART_W - CASCADE_PAD_R}" y2="${yToPx(w)}"
          stroke="rgba(255,255,255,0.08)" stroke-width="1" />
    <text x="${CASCADE_PAD_L - 6}" y="${yToPx(w) + 3}" text-anchor="end"
          fill="#707070" font-size="9" font-family="monospace">${w}</text>
  `).join('');

  // X axis labels.
  const xLabels = `
    <text x="${xToPx(1)}" y="${CASCADE_CHART_H - 12}" text-anchor="middle"
          fill="#707070" font-size="9" font-family="monospace">1</text>
    <text x="${xToPx(xMax)}" y="${CASCADE_CHART_H - 12}" text-anchor="middle"
          fill="#707070" font-size="9" font-family="monospace">${xMax}</text>
    <text x="${(CASCADE_PAD_L + CASCADE_CHART_W - CASCADE_PAD_R) / 2}" y="${CASCADE_CHART_H - 4}"
          text-anchor="middle" fill="#a0a0a0" font-size="10" font-family="monospace">induce #</text>
  `;

  // Series — group by stage, color per stage.
  // 각 stage 영역 다 syn 가능 (한 stage 영역 색 = 다 polyline).
  const seriesSvg = series.map(ser => {
    const color = CASCADE_STAGE_COLORS[ser.stageIdx] || '#888';
    const points = ser.entries.map(e => `${xToPx(e.induceCount)},${yToPx(e.weight)}`).join(' ');
    const polyline = `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.85" />`;
    const circles = ser.entries.map(e => `
      <circle cx="${xToPx(e.induceCount)}" cy="${yToPx(e.weight)}" r="2.2"
              fill="${color}" stroke="rgba(0,0,0,0.4)" stroke-width="0.5">
        <title>${escapeHtml(ser.pre)} → ${escapeHtml(ser.post)}: w=${e.weight.toFixed(3)} @ #${e.induceCount} (${e.stdpEnabled ? e.stdpMode : 'OFF'})</title>
      </circle>
    `).join('');
    return polyline + circles;
  }).join('');

  // Stage legend (5 colors).
  const stageLabels = [
    'V1 L4_E → V1 L23_E',
    'V1 L23_E → V2 L4_E',
    'V2 L4_E → V2 L23_E',
    'V2 L23_E → V2 L5_E',
    'V2 L5_E → OUT',
  ];
  const legend = `
    <div class="nf-cascade-legend">
      ${stageLabels.map((label, i) => `
        <span class="nf-cascade-legend-item">
          <span class="nf-cascade-legend-swatch" style="background:${CASCADE_STAGE_COLORS[i]}"></span>
          ${label}
        </span>
      `).join('')}
    </div>
  `;

  const totalPoints = series.reduce((sum, ser) => sum + ser.entries.length, 0);
  const summary = `<div class="nf-cascade-summary">cascade syn = ${series.length}, total points = ${totalPoints}, induceCount = ${state.induceCount}, yMax = ${yMax}</div>`;

  return `
    ${summary}
    <svg class="nf-cascade-chart" viewBox="0 0 ${CASCADE_CHART_W} ${CASCADE_CHART_H}"
         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      ${gridSvg}
      ${xLabels}
      ${seriesSvg}
    </svg>
    ${legend}
  `;
}

export function exportCascadeWeightHistoryCsv() {
  const rows = [];
  rows.push('stage_idx,pre,post,induce_count,weight,stdp_enabled,stdp_mode,timestamp');
  for (const [key, entries] of Object.entries(state.weightHistory)) {
    if (!entries.length) continue;
    const [pre, post] = key.split('__');
    if (!isCascadeSyn(pre, post)) continue;
    const stageIdx = cascadeStageIndex(pre, post);
    for (const e of entries) {
      rows.push([
        stageIdx,
        pre,
        post,
        e.induceCount,
        e.weight,
        e.stdpEnabled ? 'true' : 'false',
        e.stdpMode,
        e.timestamp,
      ].join(','));
    }
  }
  if (rows.length === 1) return false;
  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cascade_weight_history_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}

function exportWeightHistoryCsv(nodeName, incomingSyns) {
  const rows = [];
  rows.push('pre,post,induce_count,weight,stdp_enabled,stdp_mode,timestamp');
  for (const s of incomingSyns) {
    const key = `${s.pre}__${s.post}`;
    const entries = state.weightHistory[key] || [];
    for (const e of entries) {
      rows.push([
        s.pre,
        s.post,
        e.induceCount,
        e.weight,
        e.stdpEnabled ? 'true' : 'false',
        e.stdpMode,
        e.timestamp,
      ].join(','));
    }
  }
  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `weight_history_${nodeName}_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
  // Phase 6.5: weight history chart 영역 = 매 induce 영역 신규 point + axis 영역 재계산 영역
  // → 본 section 영역 innerHTML 영역 재구축 (CSV button click handler 영역 재바인딩 mandatory).
  const historyHost = popoverEl.querySelector('.nf-weight-history-section');
  if (historyHost) {
    const incomingSyns = synapses
      .filter(s => s.post === name)
      .sort((a, b) => b.weight - a.weight);
    historyHost.outerHTML = renderWeightHistorySection(name, incomingSyns);
    const exportBtn = popoverEl.querySelector('.nf-weight-history-export-btn');
    if (exportBtn) {
      exportBtn.onclick = (e) => {
        e.stopPropagation();
        exportWeightHistoryCsv(name, incomingSyns);
      };
    }
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
