'use client';
// Phase 1 immediate diagnostic instrumentation (2026-05-31).
//
// Background — handface.whatpull.com production observation (2026-05-30):
//   - 같은 패턴 재학습 + 비슷한 패턴 인식 못함 + 인식률 저하 (가장 우려)
//   - Console: "cluster 1 spawn — disjoint sub-pool 고갈 fallback
//     (claimed 18 features)"
//   - H2 (sub-pool exhaustion) STRONG evidence — CPM-1 영역 confirmation 핵심.
//
// Implementation scope (Phase 1):
//   - CFM-1 (Confusion Forgetting Metric): per-pattern self-verify accuracy
//     breakdown — 기존 aggregate "10/15 (87%)" 영역 per-cluster row 분해.
//     confusion-matrix-ready event 영역 hook (NodeLearn.tsx self-verify 영역
//     이미 N×N matrix 산출 영역 정합).
//   - CPM-1 (Cluster Pool Metric): cluster pool usage snapshot —
//     inputDim / per-cluster sub-pool size / K×K Jaccard overlap matrix.
//     worker `clusterPoolUsage` RPC (worker-core.ts 영역 신규 handler) 영역
//     consume.
//
// Phase 1 deploy strategy — console.log instrumentation first (가장 빠른 first
// iteration): UI panel 추가 0, 사용자 영역 dev tools console 영역 직접 확인.
// 별도 UI panel 영역 Phase 2 (second iteration) defer — 본 모듈 영역 export
// 영역 reuse 영역 정합 path (logCfm1FromConfusionMatrix / logCpm1Snapshot).
//
// 비파괴 보증: 모든 hook 영역 fire-and-forget — production accuracy 영역 영향 0.

import type { ClusterPoolUsageResult } from '@/lib/snn-runtime';
import type { ConfusionMatrixReadyDetail } from '@/lib/backend/events';
import { getRootLocalSnnFor, type SubstrateKind } from './root-local-snn';

// ── CFM-1: per-pattern self-verify accuracy breakdown ──────────────────────

export interface CFM1Snapshot {
  // epoch 영역 confusion-matrix-ready 영역 측정 시점 영역 monotonic seq —
  // 본 모듈 영역 module-scope counter 영역 catch.
  epoch: number;
  perPatternAccuracy: Record<number, {
    correct: number;
    total: number;
    accuracy: number; // 0.0 ~ 1.0
  }>;
  totalAccuracy: number;
  measuredAt: number;
}

let _cfm1EpochCounter = 0;

/**
 * Confusion-matrix-ready event 영역 받은 N×N matrix 영역 CFM-1 snapshot 영역
 * 변환. matrix[expected][predicted] 영역 row sum → totalSamples, diagonal
 * (matrix[i][i]) 영역 correct prediction count.
 */
export function buildCfm1FromConfusionMatrix(
  detail: ConfusionMatrixReadyDetail,
): CFM1Snapshot {
  const { matrix, samplesPerCluster, measuredAt } = detail;
  const N = matrix.length;
  const perPatternAccuracy: CFM1Snapshot['perPatternAccuracy'] = {};
  let correctSum = 0;
  let totalSum = 0;
  for (let i = 0; i < N; i += 1) {
    const correct = matrix[i]?.[i] ?? 0;
    const total = samplesPerCluster;
    const accuracy = total > 0 ? correct / total : 0;
    perPatternAccuracy[i] = { correct, total, accuracy };
    correctSum += correct;
    totalSum += total;
  }
  return {
    epoch: ++_cfm1EpochCounter,
    perPatternAccuracy,
    totalAccuracy: totalSum > 0 ? correctSum / totalSum : 0,
    measuredAt,
  };
}

/**
 * CFM-1 snapshot 영역 console group 영역 표시 — production diagnostic.
 * 사용자 dev tools console 영역 직접 확인 — UI panel 추가 0.
 *
 * 표시 example:
 *   [CFM-1] epoch=3 total=10/15 (66.7%) — per-pattern breakdown:
 *     패턴 1: 5/5 (100.0%)
 *     패턴 2: 3/5 (60.0%)
 *     패턴 3: 2/5 (40.0%)
 */
export function logCfm1Snapshot(snapshot: CFM1Snapshot): void {
  const totalPct = (snapshot.totalAccuracy * 100).toFixed(1);
  const perPatternEntries = Object.entries(snapshot.perPatternAccuracy);
  const summary = perPatternEntries
    .map(([ci, m]) => {
      const pct = (m.accuracy * 100).toFixed(1);
      return `  패턴 ${Number(ci) + 1}: ${m.correct}/${m.total} (${pct}%)`;
    })
    .join('\n');
  // grouped log — collapsible. 사용자 영역 expand 영역 per-pattern row 확인.
  // production safe — silent gain 0 (console output only).
  console.groupCollapsed(
    `[CFM-1] epoch=${snapshot.epoch} total=${(snapshot.totalAccuracy * 100).toFixed(0)}% — per-pattern breakdown`,
  );
  console.log(`total accuracy: ${totalPct}%`);
  console.log(`per-pattern breakdown:\n${summary}`);
  console.log(`measured at: ${new Date(snapshot.measuredAt).toISOString()}`);
  console.groupEnd();
}

/**
 * Convenience — confusion-matrix-ready detail 영역 직접 받고 console.log fire.
 * NodeLearn.tsx 영역 emitBackendEvent 직후 영역 호출 권장.
 */
export function logCfm1FromConfusionMatrix(detail: ConfusionMatrixReadyDetail): void {
  try {
    const snapshot = buildCfm1FromConfusionMatrix(detail);
    logCfm1Snapshot(snapshot);
  } catch (e) {
    console.warn('[CFM-1] logCfm1FromConfusionMatrix failed:', e);
  }
}

// ── CPM-1: cluster pool usage snapshot ────────────────────────────────────

export interface CPM1Snapshot {
  inputDim: number; // V1 input feature dim (n13: 32, n14: 50, n16: 75 etc).
  totalClaimedFeatures: number; // union of all cluster activeInputs.
  perCluster: Array<{
    clusterId: number;
    subPoolSize: number;
    subPoolPct: number; // subPoolSize / inputDim
    isFallback: boolean; // production observation 영역 이 cluster 영역
                        // disjoint exhaustion fallback 영역 spawn 영역.
                        // 본 module 영역 spawn 시점 영역 caller (live-snn)
                        // 영역 마크 영역 별도 path — clusterPoolUsage RPC
                        // 자체 영역 fallback flag 영역 산출 0 (post-hoc
                        // snapshot — fallback 영역 spawn 시점 영역 만 know).
  }>;
  overlapMatrix: number[][]; // K×K Jaccard. diagonal=1.0.
  measuredAt: number;
}

// 사용자 production observation 영역 fallback cluster 영역 track —
// live-snn.expandClusterAsync 영역 fallbackUsed=true 영역 본 set 영역 add.
const _fallbackClusterIds = new Set<number>();

export function markClusterAsFallback(clusterId: number): void {
  _fallbackClusterIds.add(clusterId);
}

export function clearFallbackMarks(): void {
  _fallbackClusterIds.clear();
}

/**
 * Worker `clusterPoolUsage` RPC 영역 call + CPM1Snapshot 영역 build.
 *
 * 정직 한계: substrate 영역 active substrate (caller responsibility) —
 * orientation / orientation-5x5 / orientation-6x6 / orientation-hand 영역
 * 영역 영역 별도 substrate 영역 본 호출 영역 별도 snapshot.
 */
export async function captureCpm1Snapshot(kind: SubstrateKind): Promise<CPM1Snapshot> {
  const root = await getRootLocalSnnFor(kind);
  const usage: ClusterPoolUsageResult = await root.client.clusterPoolUsage();
  return buildCpm1FromUsage(usage);
}

export function buildCpm1FromUsage(usage: ClusterPoolUsageResult): CPM1Snapshot {
  const perCluster = usage.perCluster.map((c) => ({
    clusterId: c.clusterId,
    subPoolSize: c.subPoolSize,
    subPoolPct: usage.inputDim > 0 ? c.subPoolSize / usage.inputDim : 0,
    isFallback: _fallbackClusterIds.has(c.clusterId),
  }));
  return {
    inputDim: usage.inputDim,
    totalClaimedFeatures: usage.totalClaimedFeatures,
    perCluster,
    overlapMatrix: usage.overlapMatrix,
    measuredAt: Date.now(),
  };
}

/**
 * CPM-1 snapshot 영역 console group 영역 표시.
 *
 * 표시 example:
 *   [CPM-1] inputDim=32 claimed=27/32 (84%) — sub-pool usage:
 *     cluster 0: ████████░░ 8/32 (25%)
 *     cluster 1: █████░░░░░ 5/32 (16%) ⚠ fallback
 *     ...
 *   overlap (max off-diagonal): 0.42 between c1 & c3 — disjoint 깨짐 가능
 */
export function logCpm1Snapshot(snapshot: CPM1Snapshot, label?: string): void {
  const claimPct = snapshot.inputDim > 0
    ? (snapshot.totalClaimedFeatures / snapshot.inputDim * 100).toFixed(0)
    : '0';
  const header = label
    ? `[CPM-1 ${label}] inputDim=${snapshot.inputDim} claimed=${snapshot.totalClaimedFeatures}/${snapshot.inputDim} (${claimPct}%) — sub-pool usage`
    : `[CPM-1] inputDim=${snapshot.inputDim} claimed=${snapshot.totalClaimedFeatures}/${snapshot.inputDim} (${claimPct}%) — sub-pool usage`;
  console.groupCollapsed(header);
  for (const c of snapshot.perCluster) {
    const barWidth = 10;
    const filled = Math.round(c.subPoolPct * barWidth);
    const bar = '█'.repeat(filled) + '░'.repeat(barWidth - filled);
    const pct = (c.subPoolPct * 100).toFixed(0);
    const fallbackMark = c.isFallback ? ' ⚠ fallback' : '';
    console.log(`  cluster ${c.clusterId}: ${bar} ${c.subPoolSize}/${snapshot.inputDim} (${pct}%)${fallbackMark}`);
  }
  // overlap matrix summary — max off-diagonal Jaccard.
  const K = snapshot.overlapMatrix.length;
  let maxOverlap = 0;
  let maxI = -1;
  let maxJ = -1;
  for (let i = 0; i < K; i += 1) {
    for (let j = i + 1; j < K; j += 1) {
      const v = snapshot.overlapMatrix[i]?.[j] ?? 0;
      if (v > maxOverlap) {
        maxOverlap = v;
        maxI = i;
        maxJ = j;
      }
    }
  }
  if (K >= 2) {
    const overlapPct = (maxOverlap * 100).toFixed(0);
    const warn = maxOverlap > 0.2 ? ' — disjoint 깨짐 가능 (overlap > 0.2)' : '';
    console.log(`overlap (max off-diagonal): ${overlapPct}% between c${maxI} & c${maxJ}${warn}`);
    // full matrix — collapsed inner group.
    console.groupCollapsed(`K×K Jaccard overlap matrix (K=${K})`);
    for (let i = 0; i < K; i += 1) {
      const row = snapshot.overlapMatrix[i]
        .map((v) => v.toFixed(2))
        .join(' ');
      console.log(`  c${i}: ${row}`);
    }
    console.groupEnd();
  }
  console.log(`measured at: ${new Date(snapshot.measuredAt).toISOString()}`);
  console.groupEnd();
}

/**
 * Convenience — substrate kind 영역 받고 worker RPC + log fire.
 * fire-and-forget — caller 영역 await 0 정합 (production accuracy 영향 0).
 */
export function logCpm1ForKind(kind: SubstrateKind, label?: string): void {
  void (async () => {
    try {
      const snapshot = await captureCpm1Snapshot(kind);
      logCpm1Snapshot(snapshot, label);
    } catch (e) {
      console.warn('[CPM-1] logCpm1ForKind failed:', e);
    }
  })();
}
