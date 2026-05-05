// deriveWinner 영역 검증 — backend cluster_rates 우선 + frontend fallback +
// WTA tie + margin threshold.

import { describe, it, expect } from 'vitest';
import {
  deriveWinner,
  WINNER_MARGIN_DEFAULT,
  CLUSTER_COUNT,
} from '@/lib/snn/winner-derivation';

describe('deriveWinner — frontend fallback (legacy backend, no cluster_rates)', () => {
  it('returns null cluster + zero metrics on empty rates', () => {
    const r = deriveWinner({});
    expect(r.cluster).toBeNull();
    expect(r.clusterRates).toHaveLength(CLUSTER_COUNT);
    expect(r.clusterRates.every((v) => v === 0)).toBe(true);
    expect(r.max).toBe(0);
    expect(r.total).toBe(0);
    expect(r.confidence).toBe(0);
    expect(r.margin).toBe(0);
    expect(r.source).toBe('fallback');
  });

  it('parses out_{cluster}_{idx} format and means cluster 0', () => {
    const rates = {
      out_0_0: 50, out_0_1: 30,  // cluster 0 → mean 40
      out_1_0: 5,  out_1_1: 5,   // cluster 1 → mean 5
      out_2_0: 0,
      out_3_0: 0,
    };
    const r = deriveWinner(rates);
    expect(r.cluster).toBe(0);
    expect(r.clusterRates[0]).toBeCloseTo(40, 6);
    expect(r.clusterRates[1]).toBeCloseTo(5, 6);
    expect(r.max).toBeCloseTo(40, 6);
    expect(r.margin).toBeCloseTo((40 - 5) / 40, 6);  // > 0.10 → winner 결정
    expect(r.source).toBe('fallback');
  });

  it('also accepts out_{cluster} (no idx suffix)', () => {
    const rates = { out_2: 100, out_0: 10 };
    const r = deriveWinner(rates);
    expect(r.cluster).toBe(2);
    expect(r.clusterRates[2]).toBeCloseTo(100, 6);
  });

  it('tie (margin < threshold) → cluster null', () => {
    const rates = { out_0_0: 10, out_1_0: 10, out_2_0: 0, out_3_0: 0 };
    const r = deriveWinner(rates);
    expect(r.margin).toBe(0);  // (10-10)/10
    expect(r.cluster).toBeNull();
  });

  it('respects custom marginThreshold (legacy number arg)', () => {
    // margin = (10 - 9) / 10 = 0.10 — default threshold 0.10 정합 (winner ok)
    // 0.20 영역 mandatory 영역 미달 → null.
    const rates = { out_0_0: 10, out_1_0: 9 };
    const r1 = deriveWinner(rates, 0.20);
    expect(r1.cluster).toBeNull();
    const r2 = deriveWinner(rates, 0.05);
    expect(r2.cluster).toBe(0);
  });

  it('WINNER_MARGIN_DEFAULT === 0.10', () => {
    expect(WINNER_MARGIN_DEFAULT).toBe(0.10);
  });

  it('clusterCounts tracks OUT neuron count per cluster', () => {
    const rates = { out_0_0: 1, out_0_1: 1, out_0_2: 1, out_1_0: 1 };
    const r = deriveWinner(rates);
    expect(r.clusterCounts[0]).toBe(3);
    expect(r.clusterCounts[1]).toBe(1);
    expect(r.clusterCounts[2]).toBe(0);
  });

  it('ignores keys outside out_* pattern', () => {
    const rates = { foo: 999, in_pinch: 50, out_0_0: 10 };
    const r = deriveWinner(rates);
    expect(r.clusterRates[0]).toBeCloseTo(10, 6);
    expect(r.cluster).toBe(0);
  });
});

describe('deriveWinner — backend priority (cluster_rates 직접 활용)', () => {
  it('uses backend cluster_rates when length 4 + finite + nonzero', () => {
    const rates = { out_0_0: 999 };  // frontend fallback 영역 무시 영역 mandatory.
    const r = deriveWinner(rates, {
      clusterRates: [10, 50, 5, 5],
      winnerCluster: 1,
      winnerMargin: 0.8,
    });
    expect(r.source).toBe('backend');
    expect(r.cluster).toBe(1);
    expect(r.clusterRates).toEqual([10, 50, 5, 5]);
    expect(r.margin).toBeCloseTo(0.8, 6);
    expect(r.max).toBe(50);
  });

  it('backend winnerCluster=null overrides frontend margin check', () => {
    const r = deriveWinner({}, {
      clusterRates: [100, 0, 0, 0],
      winnerCluster: null,  // backend 영역 명시 null
    });
    expect(r.source).toBe('backend');
    expect(r.cluster).toBeNull();
  });

  it('backend cluster_rates (length wrong) → falls back to frontend', () => {
    const r = deriveWinner({ out_0_0: 50 }, {
      clusterRates: [10, 20, 30],  // length 3, length !== 4
    });
    expect(r.source).toBe('fallback');
    expect(r.clusterRates[0]).toBeCloseTo(50, 6);
  });

  it('backend cluster_rates (all zero) → falls back', () => {
    const r = deriveWinner({ out_0_0: 50 }, {
      clusterRates: [0, 0, 0, 0],
    });
    expect(r.source).toBe('fallback');
    expect(r.cluster).toBe(0);
  });

  it('backend cluster_rates without winnerCluster → frontend margin check', () => {
    const r = deriveWinner({}, {
      clusterRates: [10, 10, 0, 0],  // tie → margin 0 → null
    });
    expect(r.source).toBe('backend');
    expect(r.cluster).toBeNull();
    expect(r.margin).toBe(0);
  });
});
