/**
 * Synapse lines — SVG overlay 로 120 시냅스 line 표시.
 * 정적 (snapshot 시 1회 렌더) + 자극 시 highlight (region 에서 나가는 line glow).
 *
 * 인코딩 [c-style 데이터 시각화]:
 *   excitatory (weight > 0): 청록 (#7DD3FC)
 *   inhibitory (weight < 0): 산호색 (#F87171)
 *   thickness: 1 ~ 3.5px (|weight| / max|weight| 비례)
 *   alpha:     0.20 ~ 0.65 (|weight| 비례)
 *   fire 시:   alpha 0.95 + glow filter, 600ms 후 복원
 *
 * SVG 는 .snn-flow 에 absolute overlay (pointer-events: none, overflow: visible).
 * 좌표 = 각 dot 의 center pixel (region body 내 normalized → flow 내 absolute 변환).
 */
import { state } from './state.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const REGION_TO_LAYER = { INPUT: 'input', V1: 'v1', V2: 'v2', OUT: 'out' };

let svgEl = null;
let flowEl = null;
let lineMap = new Map();   // synapseKey → SVGLineElement
let maxAbsW = 1;
let resizeObs = null;

export function mountSynapseLines(flow) {
  flowEl = flow;
  svgEl = document.createElementNS(SVG_NS, 'svg');
  svgEl.setAttribute('class', 'snn-synapse-svg');
  svgEl.setAttribute('xmlns', SVG_NS);

  // Defs (glow filter)
  const defs = document.createElementNS(SVG_NS, 'defs');
  const filter = document.createElementNS(SVG_NS, 'filter');
  filter.setAttribute('id', 'snn-synapse-glow');
  filter.setAttribute('x', '-50%'); filter.setAttribute('y', '-50%');
  filter.setAttribute('width', '200%'); filter.setAttribute('height', '200%');
  const blur = document.createElementNS(SVG_NS, 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '2.5'); blur.setAttribute('result', 'blur');
  filter.appendChild(blur);
  const merge = document.createElementNS(SVG_NS, 'feMerge');
  const m1 = document.createElementNS(SVG_NS, 'feMergeNode'); m1.setAttribute('in', 'blur');
  const m2 = document.createElementNS(SVG_NS, 'feMergeNode'); m2.setAttribute('in', 'SourceGraphic');
  merge.appendChild(m1); merge.appendChild(m2);
  filter.appendChild(merge);
  defs.appendChild(filter);
  svgEl.appendChild(defs);

  flowEl.appendChild(svgEl);

  // ResizeObserver: flow 크기 변경 시 line 재계산
  if (typeof ResizeObserver !== 'undefined') {
    resizeObs = new ResizeObserver(() => redrawAll());
    resizeObs.observe(flowEl);
  }
}

export function renderSynapseLines() {
  if (!svgEl || !state.synapses) return;

  // 기존 line 제거 (defs 보존 = svgEl.children[0])
  while (svgEl.children.length > 1) {
    svgEl.removeChild(svgEl.lastChild);
  }
  lineMap.clear();

  if (state.synapses.length === 0) return;

  maxAbsW = Math.max(1, ...state.synapses.map(s => Math.abs(s.weight || 0)));

  for (const syn of state.synapses) {
    const wt = syn.weight || 0;
    const ratio = Math.abs(wt) / maxAbsW;
    // excitatory cyan / inhibitory warm coral, glow via drop-shadow filter
    const color = wt >= 0 ? '#4dd0e1' : '#e07a5f';
    // Stage 1.7-β idle: 매우 가늘 (0.35~0.5) + 약 alpha (clamp 0.4) + 약 glow (1px).
    const thickness = (0.35 + ratio * 0.15).toFixed(2);  // 0.35 ~ 0.50
    const alpha = Math.max(0.10, Math.min(0.40, ratio * 0.4)).toFixed(3);

    const line = document.createElementNS(SVG_NS, 'line');
    line.classList.add('snn-synapse-line');
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', thickness);
    line.setAttribute('stroke-opacity', alpha);
    line.setAttribute('stroke-linecap', 'round');
    line.style.setProperty('--line-color', color);
    line.style.transition = 'stroke-width 300ms ease-out, stroke-opacity 300ms ease-out, filter 300ms ease-out';
    line.dataset.pre = syn.pre;
    line.dataset.post = syn.post;
    line.dataset.weight = String(wt);
    line.dataset.baseAlpha = alpha;
    line.dataset.baseWidth = thickness;
    line.dataset.color = color;

    lineMap.set(`${syn.pre}->${syn.post}`, line);
    svgEl.appendChild(line);
  }

  redrawAll();
}

export function redrawAll() {
  if (!svgEl || !flowEl) return;
  const flowRect = flowEl.getBoundingClientRect();
  if (flowRect.width === 0 || flowRect.height === 0) return;

  svgEl.setAttribute('width', flowRect.width);
  svgEl.setAttribute('height', flowRect.height);
  svgEl.setAttribute('viewBox', `0 0 ${flowRect.width} ${flowRect.height}`);

  // Cache dot centers per neuron (avoid re-querying inside loop)
  // dots live in state.dotOverlays[layerId] (panel sibling, panel stacking 우회)
  const centers = new Map();
  for (const layerId of ['input', 'v1', 'v2', 'out']) {
    const overlay = state.dotOverlays[layerId];
    if (!overlay) continue;
    const dots = overlay.querySelectorAll('.snn-node');
    dots.forEach(dot => {
      const r = dot.getBoundingClientRect();
      centers.set(dot.dataset.neuron, {
        x: r.left + r.width / 2 - flowRect.left,
        y: r.top + r.height / 2 - flowRect.top,
      });
    });
  }

  for (const [key, line] of lineMap) {
    const [pre, post] = key.split('->');
    const a = centers.get(pre);
    const b = centers.get(post);
    if (!a || !b) {
      line.setAttribute('x1', '0'); line.setAttribute('y1', '0');
      line.setAttribute('x2', '0'); line.setAttribute('y2', '0');
      continue;
    }
    line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
  }
}

export function highlightSynapsesFromRegion(region) {
  const layerId = REGION_TO_LAYER[region];
  if (!layerId) return;
  const container = state.containers[layerId];
  if (!container) return;

  // Stage 1.7-β: dot fire 동기 line active — region 의 outgoing line 들에 .active class
  // 추가 (CSS 가 stroke-width / opacity / filter 강조), 300ms 후 자연 fade (transition).
  for (const [, line] of lineMap) {
    const pre = line.dataset.pre;
    const preNeuron = state.neurons.find(n => n.name === pre);
    if (!preNeuron || preNeuron.region !== region) continue;
    line.classList.add('active');
    setTimeout(() => line.classList.remove('active'), 300);
  }
}
