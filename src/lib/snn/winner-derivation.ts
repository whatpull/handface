// HIGH #3 정정: cluster winner / margin / confidence 영역 단일 source.
//
// 직전 산출 4 곳 중복 (PipelineCanvas.tsx:288-314 / 391-411 / 557-578 +
// use-hand-control.ts:289-321) 영역 통합 — 일부 영역 차이 부분 catch 가능 catch.
//
// Backend B+3 combo (a8e8165, HF live) 정합:
//  - inject_feature16 응답 영역 `cluster_rates` (length 4) / `winner_cluster` /
//    `winner_margin` 영역 동봉 영역 — 일부 시점 영역 그것 영역 우선 활용 사실.
//  - frontend 자체 산출 영역 round-trip 일부 — backend cluster mean 영역 보내면
//    그것 영역 그대로 영역.
//  - 미동봉 (legacy backend / 일부 시점) 영역 out_rates 기반 fallback 산출 — backward
//    compat mandatory.
//
// 본 모듈 영역 책임:
//  - out_rates (예: { "out_0_0": 50, "out_1_3": 12, ... }) → cluster mean rate 4-tuple.
//  - top1 / top2 영역 margin = (max - second) / max (보호: max <= 0 → 0).
//  - confidence = max / total_sum (보호: total <= 0 → 0).
//  - winner cluster — margin >= WINNER_MARGIN_DEFAULT (0.10) 영역 정합 시점만 결정.
//    그 외 (rate 0 / margin 미달) → null (WTA tie 영역 catch).
//  - clusterCounts — cluster 별 OUT neuron 수 (정합 사실 증명용).
//
// 정직 한계 명시:
//  - WINNER_MARGIN_DEFAULT 0.10 영역 추측. 너무 엄격 / 느슨 영역 사용자 화면 검증
//    영역 mandatory.
//  - out_{cluster} (suffix 없는 형식) 영역 backend 일부 emit 영역 cluster 별
//    1 OUT 영역 가정. 직전 4 곳 영역 동일 regex `^out_(\d+)(?:_\d+)?$` 영역 정합 사실.
//  - backend cluster_rates 영역 우선 영역 = round-trip 영역 1 영역만. backend 영역 length
//    !=4 영역 / 모두 0 시점 영역 fallback 자체 산출.

export const WINNER_MARGIN_DEFAULT = 0.10;
export const CLUSTER_COUNT = 4;

export interface WinnerResult {
  /** Winner cluster id (0..3) — margin / rate 미달 시 null. */
  cluster: number | null;
  /** cluster mean rate 4-tuple — index = cluster id. */
  clusterRates: number[];
  /** cluster 별 OUT neuron 수 (rate 합산 분모 증명용). */
  clusterCounts: number[];
  /** confidence = max / total (0..1). total 0 영역 0. */
  confidence: number;
  /** margin = (max - second) / max (0..1). max 0 영역 0. */
  margin: number;
  /** max cluster rate (winner 영역 정합 0 일부 그대로). */
  max: number;
  /** total cluster mean sum. */
  total: number;
  /** backend cluster_rates 직접 활용 영역 true, frontend fallback 산출 영역 false. */
  source: 'backend' | 'fallback';
}

/**
 * Backend 영역 우선 산출 옵션 — inject_feature16 응답 (B+3 combo 이후) 영역 cluster_rates /
 * winner_cluster / winner_margin 영역 동봉 영역 그것 영역 그대로 활용.
 */
export interface DeriveWinnerOptions {
  /** Winner 결정 margin 임계 (기본 WINNER_MARGIN_DEFAULT = 0.10). */
  marginThreshold?: number;
  /** Backend 영역 직접 emit 영역 cluster mean rate 4-tuple. length 4 일부 사용. */
  clusterRates?: number[] | null;
  /** Backend 영역 결정 영역 winner cluster id (0..3) — margin 미달 영역 null. */
  winnerCluster?: number | null;
  /** Backend 영역 산출 영역 (max - second) / max margin. 0..1. */
  winnerMargin?: number | null;
}

/**
 * out_rates → cluster winner 영역 단일 산출.
 *
 * @param rates - backend 영역 emit 영역 out_rates (key: "out_{cluster}_{idx}" 또는 "out_{cluster}")
 * @param opts - margin threshold 영역, backend cluster_rates / winner 직접 활용 옵션.
 *
 * Backward compat: 두 번째 인자 영역 number 일부 marginThreshold 영역 직접 영역 (legacy
 * 호출 영역 정합 사실).
 */
export function deriveWinner(
  rates: Record<string, number>,
  opts: DeriveWinnerOptions | number = {},
): WinnerResult {
  const o: DeriveWinnerOptions = typeof opts === 'number' ? { marginThreshold: opts } : opts;
  const marginThreshold = o.marginThreshold ?? WINNER_MARGIN_DEFAULT;

  // ── Backend 영역 우선 영역 ────────────────────────────────────────────────
  // backend cluster_rates 영역 length 4 영역 / 영역 정합 (number array) 영역 / 모두 0 영역
  // 일부 시점 영역 그것 영역 그대로 활용 — frontend 영역 자체 산출 회피.
  const backendRates = o.clusterRates;
  if (
    Array.isArray(backendRates)
    && backendRates.length === CLUSTER_COUNT
    && backendRates.every((v) => Number.isFinite(v))
    && backendRates.some((v) => v > 0)
  ) {
    const mean = backendRates.slice();
    // clusterCounts 영역 fallback 산출 동일 regex 일부 — 정합 사실 증명용.
    const cnt = new Array<number>(CLUSTER_COUNT).fill(0);
    for (const k of Object.keys(rates)) {
      const m = /^out_(\d+)(?:_\d+)?$/.exec(k);
      if (!m) continue;
      const ci = Number(m[1]);
      if (ci >= 0 && ci < CLUSTER_COUNT) cnt[ci] += 1;
    }
    const sorted = mean
      .map((rate, ci) => ({ rate, ci }))
      .sort((a, b) => b.rate - a.rate);
    const max = sorted[0]?.rate ?? 0;
    const second = sorted[1]?.rate ?? 0;
    // backend 영역 winner_margin 영역 동봉 영역 그것 영역, 미동봉 영역 frontend 영역 산출.
    const margin = typeof o.winnerMargin === 'number' && Number.isFinite(o.winnerMargin)
      ? o.winnerMargin
      : (max > 0 ? (max - second) / max : 0);
    const total = mean.reduce((a, b) => a + b, 0);
    const confidence = total > 0 ? max / total : 0;
    // backend winner_cluster 영역 동봉 영역 그것 영역 — null 영역 명시 영역 그것 영역 정합.
    // 미동봉 (undefined) 영역 frontend 영역 margin 검증 영역 결정.
    let cluster: number | null;
    if (o.winnerCluster === null) {
      cluster = null;
    } else if (typeof o.winnerCluster === 'number'
      && o.winnerCluster >= 0
      && o.winnerCluster < CLUSTER_COUNT) {
      cluster = o.winnerCluster;
    } else {
      cluster = max > 0 && margin >= marginThreshold ? sorted[0].ci : null;
    }
    return {
      cluster,
      clusterRates: mean,
      clusterCounts: cnt,
      confidence,
      margin,
      max,
      total,
      source: 'backend',
    };
  }

  // ── Fallback: frontend 자체 산출 (legacy backend 영역 backward compat) ─────
  const sum = new Array<number>(CLUSTER_COUNT).fill(0);
  const cnt = new Array<number>(CLUSTER_COUNT).fill(0);
  for (const [k, v] of Object.entries(rates)) {
    const m = /^out_(\d+)(?:_\d+)?$/.exec(k);
    if (!m) continue;
    const ci = Number(m[1]);
    if (ci >= 0 && ci < CLUSTER_COUNT) {
      sum[ci] += v;
      cnt[ci] += 1;
    }
  }
  const mean = sum.map((s, i) => (cnt[i] > 0 ? s / cnt[i] : 0));
  const sorted = mean
    .map((rate, ci) => ({ rate, ci }))
    .sort((a, b) => b.rate - a.rate);
  const max = sorted[0]?.rate ?? 0;
  const second = sorted[1]?.rate ?? 0;
  const margin = max > 0 ? (max - second) / max : 0;
  const total = mean.reduce((a, b) => a + b, 0);
  const confidence = total > 0 ? max / total : 0;
  const cluster = max > 0 && margin >= marginThreshold ? sorted[0].ci : null;
  return {
    cluster,
    clusterRates: mean,
    clusterCounts: cnt,
    confidence,
    margin,
    max,
    total,
    source: 'fallback',
  };
}
