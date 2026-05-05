'use client';

// Canvas — Region view (4 박스 INPUT/V1/V2/OUT cluster cascade) 전용.
//
// 정직 한계 박음 (사용자 명시):
//  - 직전 view='neuron' (drawflow 472 sampling) 영역 폐기됨 — 데이터 정합 0
//    (sampling 12개 영역 표시영역 거짓 + read-only drag 영역만 가치).
//  - Region view 영역 보존 결정 — 4 박스 단순 cluster 표시 영역 디버깅 보조
//    (region 별 active count + cascade 흐름 시각화).
//  - 본격 회로 시각화 영역 PipelineCanvas 영역 위임.

import { useEffect, useRef, useState } from 'react';
import 'drawflow/dist/drawflow.min.css';
import { getPosition, setPosition } from '@/lib/snn/positions';
import { preventOverlap } from '@/lib/snn/layout';
import {
  attachManualPan, buildNodeClass, buildRegionLayout,
  fitToView, inferRegion, renderNodeHtml,
} from '@/lib/snn/drawflow-helpers';
import { onBackendEvent, type NeuronFiringDetail } from '@/lib/backend/events';
import { getClient } from '@/lib/backend/client';

interface CanvasProps {
  editMode: boolean;
  cameraConnected: boolean;
}

type LoadState = 'loading' | 'ready' | 'error';

export default function Canvas({ editMode, cameraConnected: _cameraConnected }: CanvasProps) {
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
      // Region 카드 영역 backend snapshot 영역 region count 영역만 사용 — community
      // baseline / 본인 snapshot 복원 영역 Pipeline 영역 위임 (Region 영역 read-only).
      const client = getClient();
      const r = await client.getFullSnapshot();
      if (cancelled) return;
      if (!r.ok) {
        setLoadError(r.reason);
        setLoadState('error');
        return;
      }
      const layout = buildRegionLayout(r.data.neurons || []);

      const Drawflow = (await import('drawflow')).default;
      if (cancelled) return;

      const ed = new Drawflow(container);
      ed.reroute = false;
      ed.reroute_fix_curvature = false;
      ed.curvature = 0.5;
      ed.zoom_min = 0.2;
      ed.zoom_max = 4;
      ed.zoom_value = 0.05;
      ed.draggable_inputs = false;
      ed.force_first_input = false;
      ed.line_path = 5;
      ed.start();
      ed.editor_mode = editMode ? 'edit' : 'view';
      editor = ed;
      editorRef.current = ed;

      const nameToDfId: Record<string, number> = {};
      const regionCounts = (layout as { regionCounts?: Record<string, number> }).regionCounts;

      // 1) 저장 좌표 + layout 좌표 합성 → 2) 겹침 방지 pass → 3) 노드 추가.
      const merged = layout.nodes.map((n) => {
        const saved = getPosition(n.id);
        return {
          id: n.id,
          x: saved?.x ?? n.x,
          y: saved?.y ?? n.y,
          isOut: n.region === 'OUT',
        };
      });
      preventOverlap(merged);
      const posMap = new Map(merged.map((m) => [m.id, m]));

      for (const n of layout.nodes) {
        const p = posMap.get(n.id)!;
        const id = ed.addNode(
          n.id, 1, 1, p.x, p.y,
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

      for (const syn of layout.synapses) {
        const fromId = nameToDfId[syn.pre];
        const toId = nameToDfId[syn.post];
        if (!fromId || !toId) continue;
        ed.addConnection(fromId, toId, 'output_1', 'input_1');
        const sel = `.connection.node_in_node-${toId}.node_out_node-${fromId}`;
        const conn = container.querySelector(sel);
        if (conn) {
          connRefMap.current[`${syn.pre}->${syn.post}`] = conn;
        }
      }

      ed.on('nodeMoved', (dfId: number) => {
        const name = drawflowIdToName.current[dfId];
        if (!name || !editor) return;
        const moved = editor.getNodeFromId(dfId);
        if (!moved || typeof moved.pos_x !== 'number') return;
        const allIds = Object.keys(drawflowIdToName.current).map((s) => Number(s));
        const snapshot = allIds.map((d) => {
          const nm = drawflowIdToName.current[d];
          const nd = editor!.getNodeFromId(d);
          const data = (nd?.data ?? {}) as { region?: string; population?: string };
          const isOut = data.region === 'OUT';
          return { id: nm, x: nd?.pos_x ?? 0, y: nd?.pos_y ?? 0, isOut };
        });
        preventOverlap(snapshot);
        for (const s of snapshot) {
          setPosition(s.id, s.x, s.y);
          const dfId2 = nameToDfId[s.id];
          const nd = dfId2 ? editor!.getNodeFromId(dfId2) : null;
          if (nd && (nd.pos_x !== s.x || nd.pos_y !== s.y)) {
            nd.pos_x = s.x;
            nd.pos_y = s.y;
            const el = container.querySelector(`#node-${dfId2}`) as HTMLElement | null;
            if (el) {
              el.style.left = `${s.x}px`;
              el.style.top = `${s.y}px`;
              editor!.updateConnectionNodes?.(`node-${dfId2}`);
            }
          }
        }
      });

      attachManualPan(container, ed);
      requestAnimationFrame(() => requestAnimationFrame(() => fitToView(ed, container)));
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
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // editMode 토글.
  useEffect(() => {
    const ed = editorRef.current as import('drawflow').default | null;
    if (!ed) return;
    ed.editor_mode = editMode ? 'edit' : 'view';
    containerRef.current?.classList.toggle('snn-canvas-edit', editMode);
  }, [editMode]);

  // Region 발화 시각화 — active_neurons_by_region + rates prefix + rates_by_region 통합.
  useEffect(() => {
    const FIRE_DURATION_MS = 1500;
    const fireTimers: Record<string, ReturnType<typeof setTimeout>> = {};
    const lastNonZero: Record<string, number> = {};
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const rates = d.rates || {};
      const byActive = d.active_neurons_by_region || {};
      const byRegionRate = d.rates_by_region || {};
      const counts: Record<string, number> = { INPUT: 0, V1: 0, V2: 0, OUT: 0 };
      for (const [name, rate] of Object.entries(rates)) {
        if (rate <= 0) continue;
        const region = inferRegion(name);
        if (region in counts) counts[region] += 1;
      }
      for (const region of Object.keys(counts)) {
        const fromActive = (byActive[region] || []).length;
        if (fromActive > counts[region]) counts[region] = fromActive;
      }
      for (const region of Object.keys(counts)) {
        const card = nodeRefMap.current[`region_${region}`];
        if (!card) continue;
        const count = counts[region];
        const avgRate = byRegionRate[region] || 0;
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
    });
    return () => {
      off();
      for (const k of Object.keys(fireTimers)) clearTimeout(fireTimers[k]);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} id="nf-snn-canvas" className="absolute inset-0 cursor-grab" />
      {loadState !== 'ready' && (
        <div className="snn-canvas-loading" role="status" aria-live="polite">
          {loadState === 'loading' ? (
            <div className="snn-canvas-loading-content">
              <div className="snn-canvas-loading-spinner" aria-hidden="true" />
              <span>Loading canvas…</span>
            </div>
          ) : (
            <div className="snn-canvas-loading-content">
              <span className="snn-canvas-loading-error">✗ {loadError}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
