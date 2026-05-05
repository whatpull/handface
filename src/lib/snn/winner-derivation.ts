// HIGH #3 정정: cluster winner / margin / confidence 영역 단일 source.
//
// 직전 산출 4 곳 중복 (PipelineCanvas.tsx:288-314 / 391-411 / 557-578 +
// use-hand-control.ts:289-321) 영역 통합 — 일부 영역 차이 영역 catch 가능 catch.
//
// 본 모듈 영역 책임:
//  - out_rates (예: { "out_0_0": 50, "out_1_3": 12, ... }) → cluster mean rate 4-tuple.
//  - top1 / top2 영역 margin = (max - second) / max (보호: max <= 0 → 0).
//  - confidence = max / total_sum (보호: total <= 0 → 0).
//  - winner cluster — margin >= WINNER_MARGIN_DEFAULT (0.10) 영역 정합 시점만 결정.
//    그 외 (rate 0 / margin 미달) → null (WTA tie 영역 catch).
//  - clusterCounts — cluster 별 OUT neuron 수 (정합 사실 증명용).
//
// 정직 한계 박음:
//  - WINNER_MARGIN_DEFAULT 0.10 영역 추측. 너무 엄격 / 느슨 영역 사용자 화면 검증
//    영역 mandatory.
//  - out_{cluster} (suffix 없는 형식) 영역 backend 영역 영역 emit 영역 cluster 별
//    1 OUT 영역 가정. 직전 4 곳 영역 동일 regex `^out_(\d+)(?:_\d+)?$` 영역 정합 사실.

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
  /** max cluster rate (winner 영역 정합 0 영역 영역 그대로). */
  max: number;
  /** total cluster mean sum. */
  total: number;
}

/**
 * out_rates → cluster winner 영역 단일 산출.
 *
 * @param rates - backend 영역 emit 영역 out_rates (key: "out_{cluster}_{idx}" 또는 "out_{cluster}")
 * @param marginThreshold - winner 결정 margin 임계 (기본 WINNER_MARGIN_DEFAULT = 0.10)
 */
export function deriveWinner(
  rates: Record<string, number>,
  marginThreshold: number = WINNER_MARGIN_DEFAULT,
): WinnerResult {
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
  };
}
