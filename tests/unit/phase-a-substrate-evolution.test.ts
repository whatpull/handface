// Phase A — Substrate-Level Self-Evolution 단위 테스트 (영원 진화 마무리).
//
// SNN Eternal Evolution Roadmap (사용자 mandate 2026-05-25) 5 단계 마지막.
// open-ended evolution 시스템 영역 algorithm correctness 검증.

import { describe, it, expect } from 'vitest';
import {
  computeInputStats, detectNovelty, proposeSpawn,
  shouldPrune, shouldMerge,
  noveltyScore, curiosityScore,
  type SubstrateProfile,
} from '@/lib/snn-runtime/substrate-evolution';

describe('Phase A — computeInputStats', () => {
  it('uniform low-activity input → meanActivity 영역 영역', () => {
    const inputs = [
      [0, 0, 0, 1],
      [0, 1, 0, 0],
    ];
    const s = computeInputStats(inputs);
    expect(s.inputDim).toBe(4);
    expect(s.meanActivity).toBe(2 / 8); // 2 active out of 8 total bits
    expect(s.activeBitCount).toBe(1); // average per input
  });

  it('empty input → all zeros', () => {
    const s = computeInputStats([]);
    expect(s.inputDim).toBe(0);
    expect(s.meanActivity).toBe(0);
  });

  it('spatial entropy — uniformly distributed activations 영역 높음', () => {
    const inputs = [
      [1, 1, 1, 1], // 모든 position 1
      [0, 0, 0, 0],
    ];
    const s = computeInputStats(inputs);
    // 모든 position 영역 균등 분포 → high entropy.
    expect(s.spatialEntropy).toBeGreaterThan(0);
  });
});

describe('Phase A — detectNovelty', () => {
  const existing4x4: SubstrateProfile = {
    kind: '4x4',
    inputDim: 16,
    trainedStats: { meanActivity: 0.25, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.5 },
  };
  const existing5x5: SubstrateProfile = {
    kind: '5x5',
    inputDim: 25,
    trainedStats: { meanActivity: 0.2, activeBitCount: 5, inputDim: 25, spatialEntropy: 0.5 },
  };

  it('첫 substrate (existing 영역) → 항상 novel', () => {
    const r = detectNovelty(
      { meanActivity: 0.25, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.5 },
      [],
    );
    expect(r.isNovel).toBe(true);
    expect(r.reason).toContain('no existing');
  });

  it('새 dim (49 — 7×7) → novel (dim 영역 영역 substrate 영역)', () => {
    const r = detectNovelty(
      { meanActivity: 0.14, activeBitCount: 7, inputDim: 49, spatialEntropy: 0.5 },
      [existing4x4, existing5x5],
    );
    expect(r.isNovel).toBe(true);
    expect(r.reason).toContain('dim=49');
  });

  it('기존 dim + 비슷한 distribution → not novel', () => {
    const r = detectNovelty(
      { meanActivity: 0.26, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.51 },
      [existing4x4, existing5x5],
    );
    expect(r.isNovel).toBe(false);
    expect(r.reason).toContain('similar to');
  });

  it('기존 dim + 영역 영역 distribution shift → novel', () => {
    const r = detectNovelty(
      { meanActivity: 0.8, activeBitCount: 13, inputDim: 16, spatialEntropy: 0.95 },
      [existing4x4],
      0.3,
    );
    expect(r.isNovel).toBe(true);
    expect(r.reason).toContain('distribution shift');
  });
});

describe('Phase A — proposeSpawn', () => {
  it('inputDim=16 (4×4) → 영역 spec 영역', () => {
    const stats = { meanActivity: 0.25, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.5 };
    const spec = proposeSpawn(stats, 8);
    expect(spec.inputDim).toBe(32); // raw + derived
    expect(spec.estimatedClusters).toBe(8);
    expect(spec.v1L4PoolSize).toBeCloseTo(32 * 0.8, 0); // 영역 26
    expect(spec.v2L5PoolSize).toBeCloseTo(32 * 0.45, 0); // 영역 14
  });

  it('inputDim=49 (7×7) → 영역 substrate spec 영역', () => {
    const stats = { meanActivity: 0.14, activeBitCount: 7, inputDim: 49, spatialEntropy: 0.5 };
    const spec = proposeSpawn(stats, 10);
    expect(spec.inputDim).toBe(98); // 49 * 2
    expect(spec.estimatedClusters).toBe(10);
    expect(spec.v1L4PoolSize).toBeCloseTo(98 * 0.8, 0); // 영역 78
  });

  it('expectedPatterns < 4 → cluster 영역 4 최소 유지', () => {
    const stats = { meanActivity: 0.25, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.5 };
    const spec = proposeSpawn(stats, 2);
    expect(spec.estimatedClusters).toBe(4);
  });
});

describe('Phase A — shouldPrune', () => {
  const now = 1_700_000_000_000;

  it('영역 substrate + 사용 안 됨 + 비활성 → prune', () => {
    const r = shouldPrune({
      kind: '6x6_unused', voteWeight: 0.05, recallCount: 10, totalRecallCount: 1000,
      lastUsedTimestamp: now - 7200 * 1000, // 2 hours ago
    }, now);
    expect(r.shouldPrune).toBe(true);
    expect(r.reasons.length).toBeGreaterThanOrEqual(3);
  });

  it('영역 substrate (높은 voteWeight) → keep', () => {
    const r = shouldPrune({
      kind: '4x4', voteWeight: 0.9, recallCount: 500, totalRecallCount: 1000,
      lastUsedTimestamp: now - 60 * 1000,
    }, now);
    expect(r.shouldPrune).toBe(false);
  });

  it('1 조건만 trigger (영역 weight, 영역 사용 영역) → keep (2+ 조건 필요)', () => {
    const r = shouldPrune({
      kind: '5x5', voteWeight: 0.05, recallCount: 800, totalRecallCount: 1000,
      lastUsedTimestamp: now - 60 * 1000,
    }, now);
    expect(r.shouldPrune).toBe(false); // voteWeight 영역 trigger but 사용 빈도 영역 OK
  });
});

describe('Phase A — shouldMerge', () => {
  const a: SubstrateProfile = {
    kind: 'a', inputDim: 16,
    trainedStats: { meanActivity: 0.25, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.5 },
  };

  it('dim 영역 영역 → merge 영역 영역', () => {
    const b: SubstrateProfile = {
      kind: 'b', inputDim: 25,
      trainedStats: { meanActivity: 0.25, activeBitCount: 4, inputDim: 25, spatialEntropy: 0.5 },
    };
    expect(shouldMerge(a, b).shouldMerge).toBe(false);
  });

  it('매우 비슷한 substrate → merge', () => {
    const b: SubstrateProfile = {
      kind: 'b', inputDim: 16,
      trainedStats: { meanActivity: 0.26, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.51 },
    };
    const r = shouldMerge(a, b);
    expect(r.shouldMerge).toBe(true);
    expect(r.similarity).toBeGreaterThan(0.9);
  });

  it('비슷하지 영역 substrate → keep separate', () => {
    const b: SubstrateProfile = {
      kind: 'b', inputDim: 16,
      trainedStats: { meanActivity: 0.7, activeBitCount: 11, inputDim: 16, spatialEntropy: 0.9 },
    };
    expect(shouldMerge(a, b).shouldMerge).toBe(false);
  });
});

describe('Phase A — Open-ended Evolution (정체 회피)', () => {
  it('noveltyScore — empty archive → 1.0 (영역 novel)', () => {
    expect(noveltyScore([0.5, 0.5, 0.5], [])).toBe(1.0);
  });

  it('noveltyScore — identical to archived → 0', () => {
    const archive = [[0.5, 0.5, 0.5]];
    expect(noveltyScore([0.5, 0.5, 0.5], archive)).toBe(0);
  });

  it('noveltyScore — far from all archived → 영역 높음', () => {
    const archive = [
      [0.1, 0.1, 0.1],
      [0.2, 0.2, 0.2],
    ];
    const score = noveltyScore([0.9, 0.9, 0.9], archive);
    expect(score).toBeGreaterThan(0.3);
  });

  it('curiosityScore — perfect prediction → 0', () => {
    expect(curiosityScore([0.5, 0.5], [0.5, 0.5])).toBe(0);
  });

  it('curiosityScore — large error → 영역 영역 높음', () => {
    const score = curiosityScore([1, 0], [0, 1]);
    expect(score).toBeCloseTo(1, 5); // RMS = sqrt((1-0)^2 + (0-1)^2)/2 = sqrt(1) = 1
  });

  it('curiosityScore — length mismatch / empty → 0', () => {
    expect(curiosityScore([], [])).toBe(0);
    expect(curiosityScore([1], [1, 2])).toBe(0);
  });
});

describe('Phase A — 영원 진화 통합 시나리오', () => {
  it('새 입력 distribution 감지 → 새 substrate spawn 권장', () => {
    const existing: SubstrateProfile[] = [
      { kind: '4x4', inputDim: 16, trainedStats: { meanActivity: 0.25, activeBitCount: 4, inputDim: 16, spatialEntropy: 0.5 } },
      { kind: '5x5', inputDim: 25, trainedStats: { meanActivity: 0.2, activeBitCount: 5, inputDim: 25, spatialEntropy: 0.5 } },
    ];
    // 새 7×7 (49-dim) input 들어옴.
    const newInputs = [
      [...new Array(49)].map((_, i) => (i % 7 === 0 ? 1 : 0)), // 어떤 패턴
    ];
    const stats = computeInputStats(newInputs);
    const novelty = detectNovelty(stats, existing);
    expect(novelty.isNovel).toBe(true);

    const spec = proposeSpawn(stats, 10);
    expect(spec.inputDim).toBe(98); // 49 raw + 49 derived
    expect(spec.estimatedClusters).toBe(10);
  });

  it('영역 substrate 발견 → prune 권장', () => {
    const usageStats = {
      kind: '6x6_old',
      voteWeight: 0.05,           // 영역 weight
      recallCount: 5, totalRecallCount: 1000,  // 사용 거의 없음
      lastUsedTimestamp: Date.now() - 7200 * 1000, // 2 hours inactive
    };
    const r = shouldPrune(usageStats);
    expect(r.shouldPrune).toBe(true);
  });

  it('비슷한 substrate 2개 → merge 권장 (redundancy 제거)', () => {
    const a: SubstrateProfile = {
      kind: '5x5_v1', inputDim: 25,
      trainedStats: { meanActivity: 0.20, activeBitCount: 5, inputDim: 25, spatialEntropy: 0.55 },
    };
    const b: SubstrateProfile = {
      kind: '5x5_v2', inputDim: 25,
      trainedStats: { meanActivity: 0.21, activeBitCount: 5, inputDim: 25, spatialEntropy: 0.56 },
    };
    expect(shouldMerge(a, b).shouldMerge).toBe(true);
  });
});
