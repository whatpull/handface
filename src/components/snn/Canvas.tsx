'use client';

import { useEffect, useRef, useState } from 'react';
import 'drawflow/dist/drawflow.min.css';
import { weightColor } from '@/lib/snn/data';
import { getPosition, setPosition } from '@/lib/snn/positions';
import { layoutSnapshot, type LayoutNode } from '@/lib/snn/layout';
import { onBackendEvent, type NeuronFiringDetail } from '@/lib/backend/events';
import { getClient } from '@/lib/backend/client';

interface CanvasProps {
  editMode: boolean;
  cameraConnected: boolean;
  view: 'region' | 'neuron';
}

type LoadState = 'loading' | 'ready' | 'error';

export default function Canvas({ editMode, cameraConnected, view }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<unknown>(null);
  const connRefMap = useRef<Record<string, Element>>({});
  const nodeRefMap = useRef<Record<string, HTMLElement>>({});
  const drawflowIdToName = useRef<Record<number, string>>({});
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string>('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let editor: import('drawflow').default | null = null;

    (async () => {
      // 백엔드에서 실제 회로 로드 — frontend 고정 노드 폐기.
      const client = getClient();
      const r = await client.getFullSnapshot();
      if (cancelled) return;
      if (!r.ok) {
        setLoadError(r.reason);
        setLoadState('error');
        return;
      }
      const layout = view === 'region'
        ? buildRegionLayout(r.data.neurons || [])
        : layoutSnapshot(r.data.neurons || [], r.data.synapses || []);

      const Drawflow = (await import('drawflow')).default;
      if (cancelled) return;

      const ed = new Drawflow(container);
      ed.reroute = false;
      ed.reroute_fix_curvature = false;
      ed.curvature = 0;
      ed.zoom_min = 0.2;
      ed.zoom_max = 4;
      ed.zoom_value = 0.05;
      ed.draggable_inputs = false;
      ed.force_first_input = false;
      ed.line_path = 2;
      ed.start();
      ed.editor_mode = editMode ? 'edit' : 'view';
      editor = ed;
      editorRef.current = ed;

      const nameToDfId: Record<string, number> = {};
      const regionCounts = (layout as { regionCounts?: Record<string, number> }).regionCounts;

      // 노드 추가.
      for (const n of layout.nodes) {
        const saved = getPosition(n.id);
        const x = saved?.x ?? n.x;
        const y = saved?.y ?? n.y;
        const id = ed.addNode(
          n.id, 1, 1, x, y,
          buildNodeClass(n),
          { neuron: n.id, region: n.region, population: n.population },
          renderNodeHtml(n),
          false,
        );
        nameToDfId[n.id] = id;
        drawflowIdToName.current[id] = n.id;
        const el = container.querySelector(`#node-${id}`) as HTMLElement | null;
        if (el) {
          nodeRefMap.current[n.id] = el;
          // Region 뷰: 카드 active count 를 전체 neuron 수 (idle baseline) 가 아닌 0 으로 시작.
          // 단 footer 는 region 의 총 neuron 수를 보조 표시.
          if (n.population === 'region' && regionCounts) {
            const body = el.querySelector('.snn-canvas-neuron-body');
            if (body) {
              const total = regionCounts[n.region] || 0;
              body.insertAdjacentHTML('beforeend', `
                <div class="snn-canvas-neuron-row">
                  <span class="snn-canvas-neuron-row-label">total</span>
                  <span class="snn-canvas-neuron-row-value">${total}</span>
                </div>
              `);
            }
          }
        }
      }

      // 시냅스 추가 — 보이는 노드 사이만.
      for (const syn of layout.synapses) {
        const fromId = nameToDfId[syn.pre];
        const toId = nameToDfId[syn.post];
        if (!fromId || !toId) continue;
        ed.addConnection(fromId, toId, 'output_1', 'input_1');
        const sel = `.connection.node_in_node-${toId}.node_out_node-${fromId}`;
        const conn = container.querySelector(sel);
        if (conn) {
          (conn as HTMLElement).dataset.weightColor = weightColor(syn.weight);
          connRefMap.current[`${syn.pre}->${syn.post}`] = conn;
        }
      }

      // 드래그 끝 → 좌표 저장.
      ed.on('nodeMoved', (dfId: number) => {
        const name = drawflowIdToName.current[dfId];
        if (!name || !editor) return;
        const node = editor.getNodeFromId(dfId);
        if (node && typeof node.pos_x === 'number') setPosition(name, node.pos_x, node.pos_y);
      });

      applyStepPaths(container);
      patchUpdateConnection(ed, container);
      attachManualPan(container, ed);
      requestAnimationFrame(() => requestAnimationFrame(() => fitToView(ed, container)));
      applyCameraConnected(connRefMap.current, cameraConnected);
      setLoadState('ready');
    })();

    return () => {
      cancelled = true;
      if (editor) {
        editor.clear();
        container.innerHTML = '';
      }
      connRefMap.current = {};
      nodeRefMap.current = {};
      drawflowIdToName.current = {};
    };
  }, [view]);  // eslint-disable-line react-hooks/exhaustive-deps

  // editMode 토글.
  useEffect(() => {
    const ed = editorRef.current as import('drawflow').default | null;
    if (!ed) return;
    ed.editor_mode = editMode ? 'edit' : 'view';
    containerRef.current?.classList.toggle('snn-canvas-edit', editMode);
  }, [editMode]);

  // 카메라 연결 상태 토글.
  useEffect(() => {
    applyCameraConnected(connRefMap.current, cameraConnected);
  }, [cameraConnected]);

  // 발화 시각화 — fired class + synapse pulse.
  // Region 뷰에서는 active_neurons_by_region 으로 region 카드를 빛나게 함.
  useEffect(() => {
    const FIRE_DURATION_MS = 1500;
    const fireTimers: Record<string, ReturnType<typeof setTimeout>> = {};
    // Region 뷰: 각 region 의 "마지막 0이 아닌 active count" 누적 표시 — trial 사이 빠르게 사라지는 펄스 가시화.
    const lastNonZero: Record<string, number> = {};
    let regionDebugCount = 0;
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      // Region 뷰: 세 데이터 소스 통합 → V1/V2 누락 케이스 모두 cover.
      //  1) rates: neuron name prefix 로 직접 집계 (가장 신뢰)
      //  2) active_neurons_by_region: 백엔드가 명시한 region 키별 active list
      //  3) rates_by_region: region 평균 Hz (0 초과면 fire)
      if (view === 'region') {
        const rates = d.rates || {};
        const byActive = d.active_neurons_by_region || {};
        const byRegionRate = d.rates_by_region || {};
        const counts: Record<string, number> = { INPUT: 0, V1: 0, V2: 0, OUT: 0 };
        // 1) prefix 집계
        for (const [name, rate] of Object.entries(rates)) {
          if (rate <= 0) continue;
          const region = inferRegion(name);
          if (region in counts) counts[region] += 1;
        }
        // 2) active list 합산 (max 사용 — 두 소스 중 큰 값)
        for (const region of Object.keys(counts)) {
          const fromActive = (byActive[region] || []).length;
          if (fromActive > counts[region]) counts[region] = fromActive;
        }
        // 진단: 응답 구조 + 집계 결과 출력 (V1/V2 발화 디버깅).
        // 콘솔에서 window.__snnDebug = false 로 끄거나, 호출 너무 많으면 5번까지만.
        regionDebugCount += 1;
        const dbg = typeof window !== 'undefined'
          ? (window as { __snnDebug?: boolean }).__snnDebug
          : undefined;
        if (dbg !== false && regionDebugCount <= 5) {
          console.log('[snn region]', regionDebugCount, {
            counts,
            activeKeys: Object.keys(byActive),
            activeLens: Object.fromEntries(Object.entries(byActive).map(([k, v]) => [k, v.length])),
            byRegionRate,
            rateSample: Object.entries(rates)
              .filter(([, r]) => (r as number) > 0)
              .slice(0, 8),
          });
        }
        for (const region of Object.keys(counts)) {
          const card = nodeRefMap.current[`region_${region}`];
          if (!card) continue;
          const count = counts[region];
          const avgRate = byRegionRate[region] || 0;
          // count > 0 이면 갱신 + lastNonZero 기록. count = 0 이면 직전 lastNonZero 유지 (빠른 펄스 가시화).
          if (count > 0) lastNonZero[region] = count;
          const display = count > 0 ? count : (lastNonZero[region] || 0);
          const countEl = card.querySelector('.snn-canvas-region-count');
          if (countEl) countEl.textContent = String(display);
          if (count > 0 || avgRate > 0) {
            card.classList.add('snn-canvas-neuron--fired');
            if (fireTimers[region]) clearTimeout(fireTimers[region]);
            fireTimers[region] = setTimeout(() => {
              card.classList.remove('snn-canvas-neuron--fired');
              delete fireTimers[region];
            }, FIRE_DURATION_MS);
          }
        }
        return;
      }

      // Neuron 뷰: 각 neuron rate 별 처리.
      const rates = d.rates || {};
      const firedSet = new Set<string>();
      for (const id of Object.keys(rates)) {
        const rate = rates[id] || 0;
        if (rate > 0) firedSet.add(id);
        if (id.startsWith('out_')) {
          const card = nodeRefMap.current[id];
          if (card) {
            const rows = card.querySelectorAll('.snn-canvas-neuron-row-value');
            if (rows[0]) rows[0].textContent = rate > 0 ? 'ACTIVE' : 'idle';
            if (rows[1]) rows[1].textContent = rate > 0 ? rate.toFixed(1) : '0';
            card.classList.toggle('snn-canvas-out--active', rate > 0);
          }
        }
        if (rate > 0) {
          const el = nodeRefMap.current[id];
          if (!el) continue;
          el.classList.add('snn-canvas-neuron--fired');
          if (fireTimers[id]) clearTimeout(fireTimers[id]);
          fireTimers[id] = setTimeout(() => {
            el.classList.remove('snn-canvas-neuron--fired');
            delete fireTimers[id];
          }, FIRE_DURATION_MS);
        }
      }
      // 시냅스 pulse — fired pre 만 처리 (전체 connection 순회 대신).
      // connRefMap 키는 "pre->post" — fired 인 pre 마다 prefix 매칭으로 일부만 hit.
      if (firedSet.size > 0) {
        const connKeys = Object.keys(connRefMap.current);
        for (const key of connKeys) {
          const sep = key.indexOf('->');
          if (sep < 0) continue;
          const pre = key.slice(0, sep);
          if (!firedSet.has(pre)) continue;
          const conn = connRefMap.current[key];
          conn.classList.add('fired');
          const tk = `__conn_${key}`;
          if (fireTimers[tk]) clearTimeout(fireTimers[tk]);
          fireTimers[tk] = setTimeout(() => {
            conn.classList.remove('fired');
            delete fireTimers[tk];
          }, FIRE_DURATION_MS);
        }
      }
    });
    return () => {
      off();
      for (const k of Object.keys(fireTimers)) clearTimeout(fireTimers[k]);
    };
  }, [view]);

  return (
    <>
      <div ref={containerRef} id="nf-snn-canvas" className="absolute inset-0 cursor-grab" />
      {loadState !== 'ready' && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded border border-white/10 bg-[#0f1117]/95 px-3 py-1.5 font-mono text-[11px] text-white/70 shadow-lg">
            {loadState === 'loading' ? 'Loading circuit…' : `✗ ${loadError}`}
          </span>
        </div>
      )}
    </>
  );
}

// 백엔드 neuron name 에서 region 추론 (rates_by_region 미제공 케이스 대비).
function inferRegion(name: string): string {
  if (name.startsWith('in_')) return 'INPUT';
  if (name.startsWith('out_')) return 'OUT';
  if (name.startsWith('v1_')) return 'V1';
  if (name.startsWith('v2_')) return 'V2';
  return 'OTHER';
}

function buildNodeClass(n: LayoutNode): string {
  const popClass = n.population.toLowerCase().replace(/\W+/g, '_');
  const lock = n.isSystem ? ' snn-canvas-neuron--locked' : '';
  return `snn-canvas-neuron snn-canvas-neuron--${popClass} snn-canvas-node-${n.id}${lock}`;
}

// Region 뷰: 4 개 영역 카드만 렌더 (cascade 흐름 표시).
function buildRegionLayout(neurons: Array<{ region?: string | null }>) {
  const REGIONS = [
    { id: 'INPUT', label: 'INPUT', x: 200, y: 240 },
    { id: 'V1',    label: 'V1',    x: 600, y: 240 },
    { id: 'V2',    label: 'V2',    x: 1000, y: 240 },
    { id: 'OUT',   label: 'OUT',   x: 1400, y: 240 },
  ];
  const counts: Record<string, number> = {};
  for (const n of neurons) {
    const r = n.region || 'OTHER';
    counts[r] = (counts[r] || 0) + 1;
  }
  const nodes: LayoutNode[] = REGIONS.map((r) => ({
    id: `region_${r.id}`,
    label: r.label,
    region: r.id,
    population: 'region',
    x: r.x,
    y: r.y,
    isSystem: true,
  }));
  // region count 를 노드 data 에 실어 전달 — render 시 사용.
  const regionCounts: Record<string, number> = {};
  for (const r of REGIONS) regionCounts[r.id] = counts[r.id] || 0;
  return {
    nodes,
    synapses: [
      { pre: 'region_INPUT', post: 'region_V1', weight: 50 },
      { pre: 'region_V1', post: 'region_V2', weight: 50 },
      { pre: 'region_V2', post: 'region_OUT', weight: 50 },
    ],
    visibleNames: new Set(REGIONS.map((r) => `region_${r.id}`)),
    regionCounts,
  };
}

function renderNodeHtml(n: LayoutNode & { count?: number }): string {
  if (n.population === 'region') {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-region-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
        </div>
        <div class="snn-canvas-neuron-body">
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">active</span>
            <span class="snn-canvas-neuron-row-value snn-canvas-region-count">0</span>
          </div>
        </div>
      </div>
    `;
  }
  if (n.population === 'camera' || n.population === 'gesture') {
    const placeholder = n.population === 'camera' ? 'Camera disabled' : 'Hand detection disabled';
    return `
      <div class="snn-canvas-neuron-card snn-canvas-source-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
        </div>
        <div class="snn-canvas-source-mount">
          <div class="snn-canvas-source-empty">
            <div>${placeholder}</div>
            <div class="snn-canvas-source-empty-hint">Enable from sidebar</div>
          </div>
        </div>
      </div>
    `;
  }
  if (n.population === 'output' || n.id.startsWith('out_')) {
    return `
      <div class="snn-canvas-neuron-card snn-canvas-out-card">
        <div class="snn-canvas-neuron-header">
          <span class="snn-canvas-neuron-dot"></span>
          <span class="snn-canvas-neuron-label">${n.label}</span>
        </div>
        <div class="snn-canvas-neuron-body">
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">status</span>
            <span class="snn-canvas-neuron-row-value">idle</span>
          </div>
          <div class="snn-canvas-neuron-row">
            <span class="snn-canvas-neuron-row-label">rate</span>
            <span class="snn-canvas-neuron-row-value">0</span>
          </div>
        </div>
      </div>
    `;
  }
  const lock = n.isSystem ? '<span class="snn-canvas-neuron-lock" title="시스템">🔒</span>' : '';
  return `
    <div class="snn-canvas-neuron-card">
      <div class="snn-canvas-neuron-header">
        <span class="snn-canvas-neuron-dot"></span>
        <span class="snn-canvas-neuron-label">${n.label}</span>
        ${lock}
      </div>
      <div class="snn-canvas-neuron-body">
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label">region</span>
          <span class="snn-canvas-neuron-row-value">${n.region}</span>
        </div>
        <div class="snn-canvas-neuron-row">
          <span class="snn-canvas-neuron-row-label">pop</span>
          <span class="snn-canvas-neuron-row-value">${n.population}</span>
        </div>
      </div>
    </div>
  `;
}

function applyStepPaths(container: HTMLElement) {
  const conns = container.querySelectorAll('.connection');
  conns.forEach((conn) => {
    const path = conn.querySelector('.main-path');
    if (!path) return;
    const d = path.getAttribute('d') || '';
    let m = d.match(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s+C[\s\S]*?(-?[\d.]+)[,\s]+(-?[\d.]+)\s*$/);
    if (!m) m = d.match(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s+L\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s*$/);
    if (!m) {
      const nums = d.match(/-?[\d.]+/g);
      if (nums && nums.length >= 4) m = [d, nums[0], nums[1], nums[nums.length - 2], nums[nums.length - 1]];
    }
    if (!m) return;
    const x1 = parseFloat(m[1]), y1 = parseFloat(m[2]);
    const x2 = parseFloat(m[3]), y2 = parseFloat(m[4]);
    if (![x1, y1, x2, y2].every(Number.isFinite)) return;
    const midX = (x1 + x2) / 2;
    path.setAttribute('d', `M ${x1},${y1} L ${midX},${y1} L ${midX},${y2} L ${x2},${y2}`);
  });
}

function patchUpdateConnection(ed: import('drawflow').default, container: HTMLElement) {
  const original = ed.updateConnectionNodes.bind(ed);
  ed.updateConnectionNodes = (id: string) => {
    original(id);
    applyStepPaths(container);
  };
}

function applyCameraConnected(map: Record<string, Element>, connected: boolean) {
  for (const key in map) {
    const [pre] = key.split('->');
    const isCameraRoot = pre === 'src_camera' || pre === 'src_gesture';
    if (!isCameraRoot) continue;
    map[key].classList.toggle('snn-canvas-conn--inactive', !connected);
  }
}

function attachManualPan(container: HTMLElement, ed: import('drawflow').default) {
  let panning = false;
  let startX = 0, startY = 0, startCx = 0, startCy = 0;

  const onDown = (e: PointerEvent) => {
    if (ed.editor_mode === 'edit') return;
    if ((e.target as HTMLElement)?.closest('.input, .output, button')) return;
    panning = true;
    startX = e.clientX; startY = e.clientY;
    startCx = ed.canvas_x || 0; startCy = ed.canvas_y || 0;
    container.style.cursor = 'grabbing';
    e.preventDefault();
  };
  const onMove = (e: PointerEvent) => {
    if (!panning) return;
    ed.canvas_x = startCx + (e.clientX - startX);
    ed.canvas_y = startCy + (e.clientY - startY);
    if (ed.precanvas) {
      ed.precanvas.style.transform =
        `translate(${ed.canvas_x}px, ${ed.canvas_y}px) scale(${ed.zoom})`;
    }
  };
  const onUp = () => {
    panning = false;
    container.style.cursor = 'grab';
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault(); e.stopPropagation();
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const oldZoom = ed.zoom || 1;
    const oldCx = ed.canvas_x || 0;
    const oldCy = ed.canvas_y || 0;
    const dataX = (mx - oldCx) / oldZoom;
    const dataY = (my - oldCy) / oldZoom;
    const step = ed.zoom_value || 0.05;
    const dir = e.deltaY > 0 ? -1 : 1;
    const newZoom = Math.max(ed.zoom_min || 0.2, Math.min(ed.zoom_max || 4, oldZoom + step * dir));
    if (Math.abs(newZoom - oldZoom) < 1e-6) return;
    ed.zoom = newZoom;
    ed.canvas_x = mx - dataX * newZoom;
    ed.canvas_y = my - dataY * newZoom;
    if (ed.precanvas) {
      ed.precanvas.style.transformOrigin = '0 0';
      ed.precanvas.style.transform =
        `translate(${ed.canvas_x}px, ${ed.canvas_y}px) scale(${newZoom})`;
    }
    applyStepPaths(container);
  };

  container.addEventListener('pointerdown', onDown);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerup', onUp);
  container.addEventListener('pointercancel', onUp);
  container.addEventListener('wheel', onWheel, { capture: true, passive: false });
}

function fitToView(ed: import('drawflow').default, container: HTMLElement) {
  if (!ed?.precanvas || !container) return;
  const nodes = ed.precanvas.querySelectorAll('.drawflow-node');
  if (nodes.length === 0) return;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach((node) => {
    const el = node as HTMLElement;
    const left = parseFloat(el.style.left) || 0;
    const top  = parseFloat(el.style.top) || 0;
    const w = el.offsetWidth || 160;
    const h = el.offsetHeight || 80;
    if (left < minX) minX = left;
    if (top < minY) minY = top;
    if (left + w > maxX) maxX = left + w;
    if (top + h > maxY) maxY = top + h;
  });
  const bboxW = maxX - minX, bboxH = maxY - minY;
  const rect = container.getBoundingClientRect();
  if (bboxW <= 0 || bboxH <= 0 || rect.width <= 0 || rect.height <= 0) return;
  const padding = 0.92;
  const zoomX = rect.width / bboxW, zoomY = rect.height / bboxH;
  const targetZoom = Math.max(ed.zoom_min || 0.2,
    Math.min(ed.zoom_max || 4, Math.min(zoomX, zoomY) * padding));
  const bboxCx = (minX + maxX) / 2;
  const bboxCy = (minY + maxY) / 2;
  ed.zoom = targetZoom;
  ed.canvas_x = rect.width / 2 - bboxCx * targetZoom;
  ed.canvas_y = rect.height / 2 - bboxCy * targetZoom;
  ed.precanvas.style.transformOrigin = '0 0';
  ed.precanvas.style.transform =
    `translate(${ed.canvas_x}px, ${ed.canvas_y}px) scale(${targetZoom})`;
  applyStepPaths(container);
}
