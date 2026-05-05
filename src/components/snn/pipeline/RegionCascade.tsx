'use client';

// RegionCascade — Pipeline view 영역 위쪽 row 영역 4 region 박스 (INPUT/V1/V2/OUT)
// + cascade 화살표.
//
// 직전 Region drawflow view 영역 영역 영역 영역 통합 — 사용자 명시 "region과
// pipeline을 합쳐주면 좋겠습니다" 정합. drawflow Canvas.tsx 영역 dead path.
//
// 본 컴포넌트 영역 책임:
//  - 4 region 박스 표시 (region label + total neuron count + active count).
//  - cascade glow — neuron-firing 영역 active 영역 region 영역 cyan 발광 (1.5s decay).
//  - 단순 SVG/div — drawflow 영역 미사용 (4 박스 영역 overkill).
//
// 정직 한계 박음:
//  - getFullSnapshot 영역 1회 fetch — neuron count breakdown. circuit-changed 영역
//    영역 mount 영역 (parent canvasNonce key 변경 영역 remount catch).
//  - active count 영역 active_neurons_by_region 영역 prefer + rates fallback —
//    Canvas.tsx 영역 logic 영역 정합 (단일 source).

import { useEffect, useRef, useState } from 'react';
import { onBackendEvent, type NeuronFiringDetail } from '@/lib/backend/events';
import { getClient } from '@/lib/backend/client';

const REGIONS = ['INPUT', 'V1', 'V2', 'OUT'] as const;
type RegionId = typeof REGIONS[number];

interface Props {
  flowActive: boolean;
}

// inferRegion — drawflow-helpers 영역 정합 (단일 source 회피 — 본 컴포넌트 영역
// region 영역 4 영역만 영역 영역 직접 영역).
function inferRegion(name: string): string {
  if (name.startsWith('in_')) return 'INPUT';
  if (name.startsWith('v1_')) return 'V1';
  if (name.startsWith('v2_')) return 'V2';
  if (name.startsWith('out_')) return 'OUT';
  return 'OTHER';
}

export default function RegionCascade({ flowActive }: Props) {
  // total neuron count per region — 1회 fetch.
  const [totals, setTotals] = useState<Record<RegionId, number>>({
    INPUT: 0, V1: 0, V2: 0, OUT: 0,
  });
  // active count per region — neuron-firing event 영역 갱신.
  const [active, setActive] = useState<Record<RegionId, number>>({
    INPUT: 0, V1: 0, V2: 0, OUT: 0,
  });
  // fired flag — 1.5s decay.
  const [fired, setFired] = useState<Record<RegionId, boolean>>({
    INPUT: false, V1: false, V2: false, OUT: false,
  });
  const fireTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // 1회 snapshot fetch — neuron 영역 region prefix 영역 count.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await getClient().getFullSnapshot();
      if (cancelled || !r.ok) return;
      const counts: Record<RegionId, number> = { INPUT: 0, V1: 0, V2: 0, OUT: 0 };
      for (const n of r.data.neurons || []) {
        const region = (n.region as RegionId) || (inferRegion(n.name || '') as RegionId);
        if (region in counts) counts[region as RegionId] += 1;
      }
      setTotals(counts);
    })();
    return () => { cancelled = true; };
  }, []);

  // active count + cascade glow.
  useEffect(() => {
    const FIRE_DURATION_MS = 1500;
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const rates = d.rates || {};
      const byActive = d.active_neurons_by_region || {};
      const byRegionRate = d.rates_by_region || {};
      const counts: Record<RegionId, number> = { INPUT: 0, V1: 0, V2: 0, OUT: 0 };
      for (const [name, rate] of Object.entries(rates)) {
        if (rate <= 0) continue;
        const region = inferRegion(name);
        if (region in counts) counts[region as RegionId] += 1;
      }
      for (const region of REGIONS) {
        const fromActive = (byActive[region] || []).length;
        if (fromActive > counts[region]) counts[region] = fromActive;
      }
      setActive(counts);

      // fired flag — region 영역 active >0 또는 avg rate >0.
      for (const region of REGIONS) {
        const avgRate = byRegionRate[region] || 0;
        if (counts[region] > 0 || avgRate > 0) {
          setFired((p) => p[region] ? p : { ...p, [region]: true });
          if (fireTimers.current[region]) clearTimeout(fireTimers.current[region]);
          fireTimers.current[region] = setTimeout(() => {
            setFired((p) => ({ ...p, [region]: false }));
            delete fireTimers.current[region];
          }, FIRE_DURATION_MS);
        }
      }
    });
    const timers = fireTimers.current;
    return () => {
      off();
      for (const k of Object.keys(timers)) clearTimeout(timers[k]);
    };
  }, []);

  return (
    <div className="snn-region-cascade" aria-label="Region cascade">
      <div className="snn-region-cascade-label">Region cascade</div>
      <div className="snn-region-cascade-flow">
        {REGIONS.map((region, i) => (
          <RegionBox
            key={region}
            region={region}
            total={totals[region]}
            active={active[region]}
            fired={fired[region]}
            isLast={i === REGIONS.length - 1}
            flowActive={flowActive}
          />
        ))}
      </div>
    </div>
  );
}

function RegionBox({
  region, total, active, fired, isLast, flowActive,
}: {
  region: RegionId;
  total: number;
  active: number;
  fired: boolean;
  isLast: boolean;
  flowActive: boolean;
}) {
  const tone = region.toLowerCase(); // input / v1 / v2 / out → CSS class.
  return (
    <>
      <div
        className={`snn-region-box snn-region-box--${tone} ${fired ? 'is-fired' : ''}`}
        aria-label={`${region} region — ${active} of ${total} active`}
      >
        <div className="snn-region-box-label">{region}</div>
        <div className="snn-region-box-counts">
          <span className="snn-region-box-active">{active}</span>
          <span className="snn-region-box-sep">/</span>
          <span className="snn-region-box-total">{total}</span>
        </div>
      </div>
      {!isLast && (
        <div
          className={`snn-region-cascade-arrow ${fired || flowActive ? 'is-active' : ''}`}
          aria-hidden
        >
          <svg viewBox="0 0 32 12" width="32" height="12">
            <line x1="0" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1.4" />
            <polyline points="22,2 28,6 22,10" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </div>
      )}
    </>
  );
}
