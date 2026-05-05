'use client';

import { useEffect, useRef, useState } from 'react';
import 'drawflow/dist/drawflow.min.css';
import { weightColor } from '@/lib/snn/data';
import { getPosition, setPosition } from '@/lib/snn/positions';
import { layoutSnapshot, preventOverlap } from '@/lib/snn/layout';
import {
  applyCameraConnected, attachManualPan, buildNodeClass, buildRegionLayout,
  fitToView, inferRegion, renderNodeHtml,
} from '@/lib/snn/drawflow-helpers';
import { onBackendEvent, type NeuronFiringDetail, type HandFeatureDetail } from '@/lib/backend/events';
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
      // 1) 커뮤니티 baseline 자동 적용 (D1 aggregate weight) — 1회.
      const { applyCommunityBaselineOnce } = await import('@/lib/snn/community-baseline');
      await applyCommunityBaselineOnce().catch(() => null);
      // 2) 사용자 본인 snapshot 복원 — community 위에 덮어씀 (본인 학습 우선).
      const { restoreSnapshotOnce } = await import('@/lib/snn/auto-snapshot');
      await restoreSnapshotOnce().catch(() => null);
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
      // 부드러운 베지에 곡선 — 시냅스 라인이 닷 angle 에 맞게 자연스럽게 진입.
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
      // 사용자 드래그 결과 (positions.ts) 가 우선이지만, 다른 사용자 드래그
      // 또는 새 노드 추가로 겹침이 생길 수 있어 push-down 보정.
      const merged = layout.nodes.map((n) => {
        const saved = getPosition(n.id);
        return {
          id: n.id,
          x: saved?.x ?? n.x,
          y: saved?.y ?? n.y,
          isOut: n.population === 'output' || n.region === 'OUT' || n.id.startsWith('out_'),
        };
      });
      preventOverlap(merged);
      const posMap = new Map(merged.map((m) => [m.id, m]));

      // 노드 추가.
      for (const n of layout.nodes) {
        const p = posMap.get(n.id)!;
        const x = p.x;
        const y = p.y;
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

      // 드래그 끝 → 겹침 보정 후 좌표 저장. 이동된 노드 + 동 컬럼 모든 노드를
      // 모아 preventOverlap 재실행, 변경된 노드 모두 좌표 저장 + DOM 위치 갱신.
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
          const isOut = nm.startsWith('out_') || data.region === 'OUT' || data.population === 'output';
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
      // backend 응답 schema 변종 대응 — rates 가 비어있으면 active_neurons_by_region 의
      // neuron 이름들을 rate=1 로 합성 (fire 정합). inject_feature16 같이 active_neurons_by_region
      // 만 내려주는 endpoint 시각화 wiring 정합.
      let rates = d.rates || {};
      if (Object.keys(rates).length === 0 && d.active_neurons_by_region) {
        const synth: Record<string, number> = {};
        for (const list of Object.values(d.active_neurons_by_region)) {
          for (const name of list as string[]) synth[name] = 1;
        }
        rates = synth;
      }
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

  // Hand feature 이벤트 → src_camera/src_gesture 가상 노드 + 출력 시냅스 활성화.
  // 손 감지되는 동안 fired class 유지 (제거는 손 미감지 시).
  useEffect(() => {
    if (view !== 'neuron') return;
    const SOURCES = ['src_camera', 'src_gesture'];
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      // 1) 노드 카드 fired 토글
      for (const id of SOURCES) {
        const el = nodeRefMap.current[id];
        if (!el) continue;
        el.classList.toggle('snn-canvas-neuron--fired', d.hasHand);
      }
      // 2) src_camera / src_gesture 발 시냅스 fired 토글
      for (const key in connRefMap.current) {
        const sep = key.indexOf('->');
        if (sep < 0) continue;
        const pre = key.slice(0, sep);
        if (pre === 'src_camera' || pre === 'src_gesture') {
          connRefMap.current[key].classList.toggle('fired', d.hasHand);
        }
      }
    });
    return () => {
      off();
      // cleanup: fired class 제거.
      for (const id of SOURCES) {
        const el = nodeRefMap.current[id];
        el?.classList.remove('snn-canvas-neuron--fired');
      }
      for (const key in connRefMap.current) {
        const [pre] = key.split('->');
        if (pre === 'src_camera' || pre === 'src_gesture') {
          connRefMap.current[key].classList.remove('fired');
        }
      }
    };
  }, [view]);

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

