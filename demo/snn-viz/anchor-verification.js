/**
 * Anchor verification — D80 frozen anchor 영역 expected vs actual 비교 panel.
 *
 * Backend 변경 0. backend.induceFireMulti() endpoint 영역 사용.
 * cascade fire (7 region) + cascade weight delta (5 stage) + saturation 영역 검증.
 */

import { state } from './state.js';

// D80 anchor (HANDOFF.md line 41-81 정합).
export const D80_ANCHOR = {
  id: 'D80',
  name: 'Phase 8 W_MAX fix baseline',
  induce: {
    targets: [
      'in_pinch', 'in_fist', 'in_palm', 'in_point',
      'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory',
    ],
    weight: 25.0,
    stimulus_duration_ms: 15.0,
    observe_ms: 50.0,
  },
  stdp: { enabled: true, mode: 'pair' },
  induceCount: 10,
  expected: {
    cascade_fire: {
      INPUT:    { fires: 8,  total: 8 },
      v1_L4_E:  { fires: 10, total: 10 },
      v1_L23_E: { fires: 4,  total: 6 },
      v2_L4_E:  { fires: 6,  total: 10 },
      v2_L23_E: { fires: 4,  total: 6 },
      v2_L5_E:  { fires: 2,  total: 4 },
      OUT:      { fires: 4,  total: 4 },
    },
    cascade_weight_delta: {
      stage_0: { min: 0,    max: 60,  label: 'v1_L4_E → v1_L23_E' },
      stage_1: { min: 5,    max: 30,  label: 'v1_L23_E → v2_L4_E' },
      stage_2: { min: 20,   max: 50,  label: 'v2_L4_E → v2_L23_E' },
      stage_3: { min: 20,   max: 100, label: 'v2_L23_E → v2_L5_E' },
      stage_4: { min: 30,   max: 60,  label: 'v2_L5_E → out_' },
    },
    saturation: {
      W_MAX: 320,
      max_weight_threshold: 280,
    },
  },
};

const REGION_NODES = {
  INPUT:    ['in_pinch', 'in_fist', 'in_palm', 'in_point', 'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory'],
  v1_L4_E:  Array.from({ length: 10 }, (_, i) => `v1_L4_E_${i}`),
  v1_L23_E: Array.from({ length: 6 },  (_, i) => `v1_L23_E_${i}`),
  v2_L4_E:  Array.from({ length: 10 }, (_, i) => `v2_L4_E_${i}`),
  v2_L23_E: Array.from({ length: 6 },  (_, i) => `v2_L23_E_${i}`),
  v2_L5_E:  Array.from({ length: 4 },  (_, i) => `v2_L5_E_${i}`),
  OUT:      Array.from({ length: 4 },  (_, i) => `out_${i}`),
};

const CASCADE_PREFIXES = [
  ['v1_L4_E',  'v1_L23_E'],
  ['v1_L23_E', 'v2_L4_E'],
  ['v2_L4_E',  'v2_L23_E'],
  ['v2_L23_E', 'v2_L5_E'],
  ['v2_L5_E',  'out_'],
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function isCascadeSyn(pre, post) {
  return CASCADE_PREFIXES.some(([p, q]) => pre.startsWith(p) && post.startsWith(q));
}

function cascadeStageIndex(pre, post) {
  return CASCADE_PREFIXES.findIndex(([p, q]) => pre.startsWith(p) && post.startsWith(q));
}

/**
 * Run D80 anchor verification.
 *
 * Steps:
 *   1. Reset state.weightHistory + state.induceCount (clean baseline).
 *   2. Induce 8 INPUT × 10 times via backend.induceFireMulti().
 *   3. Capture cascade fire + cascade weight (induce #1 + #10).
 *   4. Compare against D80_ANCHOR.expected → PASS / FAIL per row.
 *   5. Return result object.
 */
export async function runAnchorVerification(backend) {
  // Reset baseline (avoid contamination from prior induces).
  state.weightHistory = {};
  state.induceCount = 0;

  const targets = D80_ANCHOR.induce.targets;
  const induceCount = D80_ANCHOR.induceCount;

  // Set STDP=ON+Pair (D80 spec).
  backend.setStdpEnabled(D80_ANCHOR.stdp.enabled);
  backend.setStdpMode(D80_ANCHOR.stdp.mode);

  let firstResp = null;
  let lastResp = null;
  const errors = [];

  for (let i = 1; i <= induceCount; i += 1) {
    const result = await backend.induceFireMulti(targets);
    if (!result.ok) {
      errors.push(`induce #${i} failed: ${result.reason}`);
      break;
    }
    if (i === 1) firstResp = result.response;
    if (i === induceCount) lastResp = result.response;
  }

  if (!lastResp) {
    return {
      anchor:     D80_ANCHOR,
      timestamp:  Date.now(),
      ok:         false,
      errors,
      regions:    [],
      stages:     [],
      saturation: null,
    };
  }

  // Cascade fire (induce #last → most recent rates).
  const lastRates = lastResp.rates || {};
  const regions = Object.entries(REGION_NODES).map(([region, nodes]) => {
    const expected = D80_ANCHOR.expected.cascade_fire[region];
    const fires = nodes.filter((n) => (lastRates[n] || 0) > 0).length;
    const verdict = fires >= expected.fires ? 'PASS' : 'FAIL';
    return {
      region,
      total: nodes.length,
      expectedFires: expected.fires,
      actualFires: fires,
      verdict,
    };
  });

  // Cascade weight delta (induce #1 → #10, avg per stage).
  const firstSyns = (firstResp?.synapses || []).filter((s) => isCascadeSyn(s.pre, s.post));
  const lastSyns = (lastResp.synapses || []).filter((s) => isCascadeSyn(s.pre, s.post));

  const stagesAgg = D80_ANCHOR.expected.cascade_weight_delta;
  const stages = Object.entries(stagesAgg).map(([key, expected]) => {
    const idx = parseInt(key.replace('stage_', ''), 10);
    const firstStageSyns = firstSyns.filter((s) => cascadeStageIndex(s.pre, s.post) === idx);
    const lastStageSyns = lastSyns.filter((s) => cascadeStageIndex(s.pre, s.post) === idx);
    const avgFirst = firstStageSyns.length
      ? firstStageSyns.reduce((sum, s) => sum + s.weight, 0) / firstStageSyns.length
      : 0;
    const avgLast = lastStageSyns.length
      ? lastStageSyns.reduce((sum, s) => sum + s.weight, 0) / lastStageSyns.length
      : 0;
    const delta = avgLast - avgFirst;
    const verdict = delta >= expected.min && delta <= expected.max ? 'PASS' : 'FAIL';
    return {
      stage: key,
      label: expected.label,
      expectedMin: expected.min,
      expectedMax: expected.max,
      avgFirst: Math.round(avgFirst * 100) / 100,
      avgLast: Math.round(avgLast * 100) / 100,
      delta: Math.round(delta * 100) / 100,
      verdict,
    };
  });

  // Saturation (max weight across all cascade syns).
  const saturationThreshold = D80_ANCHOR.expected.saturation.max_weight_threshold;
  const wMax = D80_ANCHOR.expected.saturation.W_MAX;
  const maxWeight = lastSyns.length
    ? Math.max(...lastSyns.map((s) => s.weight))
    : 0;
  const saturation = {
    W_MAX: wMax,
    threshold: saturationThreshold,
    maxWeight: Math.round(maxWeight * 100) / 100,
    verdict: maxWeight < saturationThreshold ? 'PASS' : 'FAIL',
  };

  return {
    anchor:     D80_ANCHOR,
    timestamp:  Date.now(),
    ok:         true,
    errors,
    regions,
    stages,
    saturation,
  };
}

function verdictClass(v) {
  if (v === 'PASS') return 'nf-anchor-pass';
  if (v === 'FAIL') return 'nf-anchor-fail';
  return 'nf-anchor-na';
}

export function renderAnchorVerification(result) {
  if (!result || !result.ok) {
    const errs = (result?.errors || []).join('<br>');
    return `<div class="nf-anchor-empty">Verification failed.<br>${escapeHtml(errs)}</div>`;
  }

  const regionRows = result.regions.map((r) => `
    <tr>
      <td>${escapeHtml(r.region)}</td>
      <td>${r.expectedFires}/${r.total}</td>
      <td>${r.actualFires}/${r.total}</td>
      <td class="${verdictClass(r.verdict)}">${r.verdict}</td>
    </tr>
  `).join('');

  const stageRows = result.stages.map((s) => `
    <tr>
      <td>${escapeHtml(s.label)}</td>
      <td>${s.expectedMin} ~ ${s.expectedMax}</td>
      <td>${s.avgFirst} → ${s.avgLast} (Δ${s.delta >= 0 ? '+' : ''}${s.delta})</td>
      <td class="${verdictClass(s.verdict)}">${s.verdict}</td>
    </tr>
  `).join('');

  const sat = result.saturation;
  const summaryPass =
    result.regions.every((r) => r.verdict === 'PASS') &&
    result.stages.every((s) => s.verdict === 'PASS') &&
    sat.verdict === 'PASS';
  const summaryClass = summaryPass ? 'nf-anchor-pass' : 'nf-anchor-fail';
  const summaryText = summaryPass ? 'PASS — D80 anchor verified' : 'FAIL — D80 anchor mismatch';

  const tsStr = new Date(result.timestamp).toISOString();

  return `
    <div class="nf-anchor-summary ${summaryClass}">${summaryText}</div>
    <div class="nf-anchor-meta">timestamp: ${tsStr} | induceCount: ${result.anchor.induceCount} | STDP: ${result.anchor.stdp.mode}</div>

    <h3 class="nf-anchor-section-title">Cascade Fire (induce #${result.anchor.induceCount})</h3>
    <table class="nf-anchor-table">
      <thead><tr><th>region</th><th>expected</th><th>actual</th><th>verdict</th></tr></thead>
      <tbody>${regionRows}</tbody>
    </table>

    <h3 class="nf-anchor-section-title">Cascade Weight Delta (induce #1 → #${result.anchor.induceCount})</h3>
    <table class="nf-anchor-table">
      <thead><tr><th>stage</th><th>expected Δ</th><th>actual</th><th>verdict</th></tr></thead>
      <tbody>${stageRows}</tbody>
    </table>

    <h3 class="nf-anchor-section-title">Saturation (max weight &lt; ${sat.threshold})</h3>
    <table class="nf-anchor-table">
      <thead><tr><th>W_MAX</th><th>threshold</th><th>max weight</th><th>verdict</th></tr></thead>
      <tbody>
        <tr>
          <td>${sat.W_MAX}</td>
          <td>${sat.threshold}</td>
          <td>${sat.maxWeight}</td>
          <td class="${verdictClass(sat.verdict)}">${sat.verdict}</td>
        </tr>
      </tbody>
    </table>
  `;
}

export function exportAnchorVerificationCsv(result) {
  if (!result || !result.ok) return false;

  const ts = new Date(result.timestamp).toISOString();
  const rows = [];
  rows.push('section,anchor_id,timestamp,key,expected,actual,verdict');

  for (const r of result.regions) {
    rows.push([
      'region',
      result.anchor.id,
      ts,
      r.region,
      `${r.expectedFires}/${r.total}`,
      `${r.actualFires}/${r.total}`,
      r.verdict,
    ].join(','));
  }

  for (const s of result.stages) {
    rows.push([
      'stage',
      result.anchor.id,
      ts,
      s.stage,
      `${s.expectedMin}~${s.expectedMax}`,
      `delta=${s.delta} (${s.avgFirst}->${s.avgLast})`,
      s.verdict,
    ].join(','));
  }

  const sat = result.saturation;
  rows.push([
    'saturation',
    result.anchor.id,
    ts,
    'max_weight',
    `<${sat.threshold}`,
    String(sat.maxWeight),
    sat.verdict,
  ].join(','));

  const csv = rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `anchor_verification_${result.anchor.id}_${result.timestamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}
