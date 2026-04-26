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
    const thickness = (1 + ratio * 0.5).toFixed(2);
    // clamp(|weight|*0.7, 0.15, 0.7)
    const alpha = Math.max(0.15, Math.min(0.7, ratio * 0.7)).toFixed(3);

    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', thickness);
    line.setAttribute('stroke-opacity', alpha);
    line.setAttribute('stroke-linecap', 'round');
    line.style.filter = `drop-shadow(0 0 3px ${color})`;
    line.dataset.pre = syn.pre;
    line.dataset.post = syn.post;
    line.dataset.weight = String(wt);
    line.dataset.baseAlpha = alpha;
    line.dataset.baseWidth = thickness;

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

  for (const [, line] of lineMap) {
    const pre = line.dataset.pre;
    const preNeuron = state.neurons.find(n => n.name === pre);
    if (!preNeuron || preNeuron.region !== region) continue;
    const baseAlpha = line.dataset.baseAlpha;
    const baseWidth = line.dataset.baseWidth;
    line.setAttribute('stroke-opacity', '0.95');
    line.setAttribute('stroke-width', String((parseFloat(baseWidth) * 1.6).toFixed(2)));
    line.setAttribute('filter', 'url(#snn-synapse-glow)');
    setTimeout(() => {
      line.setAttribute('stroke-opacity', baseAlpha);
      line.setAttribute('stroke-width', baseWidth);
      line.removeAttribute('filter');
    }, 600);
  }
}
