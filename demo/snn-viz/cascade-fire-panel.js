/**
 * Cascade Fire Panel — D80 anchor cascade fire 7 region map.
 *
 * Anchor verification framework 정합 (PRINCIPLES Section 14).
 * 4 구성 요소: const + run + render + CSV export.
 *
 * Backend 변경 0. backend.induceFireMulti() endpoint (M68 정정 통과) 영역 사용.
 * response.active_neurons_by_region 직접 사용 + fallback (rates 영역 산출).
 */

// 4-A. Anchor const (D80 cascade fire spec).
export const CASCADE_FIRE_REGIONS = {
  id: 'D80_cascade_fire',
  name: 'D80 Cascade Fire (8 INPUT induce)',
  induce: {
    targets: [
      'in_pinch', 'in_fist', 'in_palm', 'in_point',
      'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory',
    ],
    weight: 25.0,
    stimulus_duration_ms: 15.0,
    observe_ms: 50.0,
  },
  stdp: { enabled: false, mode: 'pair' },
  regions: {
    INPUT:    { fires: 8,  total: 8,  color: '#f5b842', x: 0,   label: 'INPUT' },
    v1_L4_E:  { fires: 10, total: 10, color: '#4dd0e1', x: 1.0, label: 'V1 L4_E' },
    v1_L23_E: { fires: 4,  total: 6,  color: '#4dd0e1', x: 1.5, label: 'V1 L23_E' },
    v2_L4_E:  { fires: 6,  total: 10, color: '#b794f4', x: 2.5, label: 'V2 L4_E' },
    v2_L23_E: { fires: 4,  total: 6,  color: '#b794f4', x: 3.0, label: 'V2 L23_E' },
    v2_L5_E:  { fires: 2,  total: 4,  color: '#b794f4', x: 3.5, label: 'V2 L5_E' },
    OUT:      { fires: 4,  total: 4,  color: '#5eead4', x: 4.5, label: 'OUT' },
  },
};

const REGION_NODES = {
  INPUT:    ['in_pinch', 'in_fist', 'in_palm', 'in_point', 'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory'],
  v1_L4_E:  Array.from({ length: 10 }, (_, i) => `v1_L4_E_${i}`),
  v1_L23_E: Array.from({ length: 6  }, (_, i) => `v1_L23_E_${i}`),
  v2_L4_E:  Array.from({ length: 10 }, (_, i) => `v2_L4_E_${i}`),
  v2_L23_E: Array.from({ length: 6  }, (_, i) => `v2_L23_E_${i}`),
  v2_L5_E:  Array.from({ length: 4  }, (_, i) => `v2_L5_E_${i}`),
  OUT:      ['out_0', 'out_1', 'out_2', 'out_3'],
};

// region 별 region.id (active_neurons_by_region key, backend 정합).
// backend = 'INPUT' / 'V1' / 'V2' / 'OUT' (4 region) only — frontend 영역 sub-population 영역 산출.
const BACKEND_REGION = {
  INPUT:    'INPUT',
  v1_L4_E:  'V1',
  v1_L23_E: 'V1',
  v2_L4_E:  'V2',
  v2_L23_E: 'V2',
  v2_L5_E:  'V2',
  OUT:      'OUT',
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function verdictClass(v) {
  if (v === 'PASS') return 'nf-cascade-fire-pass';
  if (v === 'FAIL') return 'nf-cascade-fire-fail';
  return 'nf-cascade-fire-na';
}

// 4-B. runCascadeFire(backend) — 1 induce + result 영역.
export async function runCascadeFire(backend) {
  backend.setStdpEnabled(CASCADE_FIRE_REGIONS.stdp.enabled);
  backend.setStdpMode(CASCADE_FIRE_REGIONS.stdp.mode);

  const result = await backend.induceFireMulti(CASCADE_FIRE_REGIONS.induce.targets);
  if (!result.ok) {
    return {
      anchor: CASCADE_FIRE_REGIONS,
      timestamp: Date.now(),
      ok: false,
      reason: result.reason,
      regions: {},
      totalActive: 0,
      overallVerdict: 'FAIL',
    };
  }

  const resp = result.response || {};
  const rates = resp.rates || {};
  // backend response.active_neurons_by_region (M68 정정 endpoint) — 직접 사용.
  // fallback: rates 영역 영역 산출 (anchor verification framework 정합).
  const backendActive = resp.active_neurons_by_region || null;

  const regions = {};
  let totalActive = 0;
  let allPass = true;

  for (const [regionKey, spec] of Object.entries(CASCADE_FIRE_REGIONS.regions)) {
    const nodes = REGION_NODES[regionKey];
    let activeNodes;

    if (backendActive) {
      // backendActive = 4 region grouping (INPUT/V1/V2/OUT). frontend sub-population 영역 영역 영역 영역 영역 영역.
      const backendKey = BACKEND_REGION[regionKey];
      const backendList = backendActive[backendKey] || [];
      activeNodes = nodes.filter((n) => backendList.includes(n));
    } else {
      activeNodes = nodes.filter((n) => (rates[n] || 0) > 0);
    }

    const actualFires = activeNodes.length;
    const verdict = actualFires >= spec.fires ? 'PASS' : 'FAIL';
    if (verdict !== 'PASS') allPass = false;
    totalActive += actualFires;

    regions[regionKey] = {
      total:         spec.total,
      expectedFires: spec.fires,
      actualFires,
      nodes:         activeNodes,
      verdict,
      color:         spec.color,
      x:             spec.x,
      label:         spec.label,
    };
  }

  return {
    anchor:         CASCADE_FIRE_REGIONS,
    timestamp:      Date.now(),
    ok:             true,
    regions,
    totalActive,
    overallVerdict: allPass ? 'PASS' : 'FAIL',
  };
}

// 4-C. renderCascadeFire(result) — SVG region map + summary.
export function renderCascadeFire(result) {
  if (!result || !result.ok) {
    return `<div class="nf-cascade-fire-empty">Run failed: ${escapeHtml(result?.reason || 'unknown')}</div>`;
  }

  const W = 600;
  const H = 280;
  const PAD_L = 40;
  const PAD_R = 40;
  const PAD_T = 30;
  const PAD_B = 50;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  // x scale: 0~4.5 → PAD_L~PAD_L+innerW
  const xMax = 4.5;
  const xToPx = (x) => PAD_L + (innerW * x) / xMax;

  // 7 region group: nodes laid out vertically inside each region column.
  const regionEntries = Object.entries(result.regions);
  const groupSvg = regionEntries.map(([key, r]) => {
    const cx = xToPx(r.x);
    const total = r.total;
    const nodeRadius = 4;
    const nodeGap = 4;
    const groupHeight = total * (nodeRadius * 2 + nodeGap);
    const groupTop = PAD_T + (innerH - groupHeight) / 2;

    const nodeNames = REGION_NODES[key];
    const fired = new Set(r.nodes);
    const nodes = nodeNames.map((name, i) => {
      const cy = groupTop + i * (nodeRadius * 2 + nodeGap) + nodeRadius;
      const isFired = fired.has(name);
      const fill = isFired ? r.color : 'rgba(255,255,255,0.05)';
      const stroke = r.color;
      return `<circle cx="${cx}" cy="${cy}" r="${nodeRadius}" fill="${fill}" stroke="${stroke}" stroke-width="1" stroke-opacity="${isFired ? 0.9 : 0.4}">
        <title>${escapeHtml(name)} ${isFired ? '(fired)' : '(idle)'}</title>
      </circle>`;
    }).join('');

    const labelY = PAD_T - 12;
    const countY = H - PAD_B + 16;
    const verdictY = H - PAD_B + 32;
    const verdictColor = r.verdict === 'PASS' ? '#4dd07e' : '#e76f6f';

    return `
      <g class="nf-cascade-fire-region-group">
        <text x="${cx}" y="${labelY}" text-anchor="middle" fill="#c0c0c0" font-size="10" font-family="monospace">${escapeHtml(r.label)}</text>
        ${nodes}
        <text x="${cx}" y="${countY}" text-anchor="middle" fill="#a0a0a0" font-size="10" font-family="monospace">${r.actualFires}/${r.total}</text>
        <text x="${cx}" y="${verdictY}" text-anchor="middle" fill="${verdictColor}" font-size="9" font-weight="600" font-family="monospace">${r.verdict}</text>
      </g>
    `;
  }).join('');

  // Arrows between adjacent regions (INPUT → V1 L4_E → V1 L23_E → V2 L4_E → V2 L23_E → V2 L5_E → OUT).
  const arrowPairs = [
    ['INPUT', 'v1_L4_E'],
    ['v1_L4_E', 'v1_L23_E'],
    ['v1_L23_E', 'v2_L4_E'],
    ['v2_L4_E', 'v2_L23_E'],
    ['v2_L23_E', 'v2_L5_E'],
    ['v2_L5_E', 'OUT'],
  ];
  const arrowSvg = arrowPairs.map(([a, b]) => {
    const xa = xToPx(result.regions[a].x);
    const xb = xToPx(result.regions[b].x);
    const arrowY = H / 2;
    return `<line x1="${xa + 8}" y1="${arrowY}" x2="${xb - 8}" y2="${arrowY}" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`;
  }).join('');

  const summaryClass = result.overallVerdict === 'PASS' ? 'nf-cascade-fire-pass' : 'nf-cascade-fire-fail';
  const summaryText = result.overallVerdict === 'PASS'
    ? `PASS — D80 cascade fire verified (${result.totalActive} active nodes)`
    : `FAIL — D80 cascade fire mismatch (${result.totalActive} active nodes)`;
  const tsStr = new Date(result.timestamp).toISOString();

  return `
    <div class="nf-cascade-fire-summary ${summaryClass}">${summaryText}</div>
    <div class="nf-cascade-fire-meta">timestamp: ${tsStr} | total: ${result.totalActive} active | STDP: off (D80 anchor spec)</div>
    <svg class="nf-cascade-fire-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      ${arrowSvg}
      ${groupSvg}
    </svg>
  `;
}

// 4-D. exportCascadeFireCsv(result) — CSV download.
export function exportCascadeFireCsv(result) {
  if (!result || !result.ok) return false;

  const ts = new Date(result.timestamp).toISOString();
  const rows = [];
  rows.push('section,anchor_id,timestamp,key,expected,actual,verdict');

  for (const [key, r] of Object.entries(result.regions)) {
    rows.push([
      'region',
      result.anchor.id,
      ts,
      key,
      `${r.expectedFires}/${r.total}`,
      `${r.actualFires}/${r.total}`,
      r.verdict,
    ].join(','));
  }

  rows.push([
    'total',
    result.anchor.id,
    ts,
    'total_active',
    String(Object.values(result.regions).reduce((s, r) => s + r.expectedFires, 0)),
    String(result.totalActive),
    result.overallVerdict,
  ].join(','));

  rows.push([
    'verdict',
    result.anchor.id,
    ts,
    'overall',
    'PASS',
    result.overallVerdict,
    result.overallVerdict,
  ].join(','));

  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cascade_fire_${result.anchor.id}_${result.timestamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}
