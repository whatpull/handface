// Phase 3.9 v32 (2026-06-03) — hand-learning-export module unit tests.
//
// 사용자 가치: 학습 데이터 백업/복원. JSON round-trip 정합 + 손상 데이터
// 거절 + best-effort 부분 import 검증.

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  buildHandLearningExport,
  importHandLearningFromJSON,
} from '@/lib/snn/hand-learning-export';

const FEATURES_KEY = 'handface.live-snn.hand-cluster-feats.v1';
const ACTIVE_KEY = 'handface.live-snn.hand-cluster-active.v1';
const EXEMPLARS_KEY = 'handface.out.exemplars.v1.orientation-hand';

beforeEach(() => {
  if (typeof window !== 'undefined') window.localStorage.clear();
});
afterEach(() => {});

describe('v32 hand-learning-export — build', () => {
  it('empty localStorage → valid empty export', () => {
    const ex = buildHandLearningExport();
    expect(ex.schemaVersion).toBe(1);
    expect(ex.substrate).toBe('orientation-hand');
    expect(ex.clusterFeatures).toEqual([]);
    expect(ex.clusterActiveInputs).toEqual([]);
    expect(ex.exemplars).toEqual({});
  });

  it('populated localStorage → exact serialization', () => {
    const feats: Array<[number, number[]]> = [
      [0, new Array(95).fill(0.5)],
      [1, new Array(95).fill(0.3)],
    ];
    const actives: Array<[number, number[]]> = [
      [0, [10, 20, 30, 40, 50]],
      [1, [60, 70, 80, 90, 91]],
    ];
    const exemplars = {
      out_0_0: { label: 'thumbs_up', count: 5 },
      out_1_0: { label: 'peace', count: 3 },
    };
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(feats));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(actives));
    window.localStorage.setItem(EXEMPLARS_KEY, JSON.stringify(exemplars));

    const ex = buildHandLearningExport();
    expect(ex.clusterFeatures).toEqual(feats);
    expect(ex.clusterActiveInputs).toEqual(actives);
    expect(ex.exemplars).toEqual(exemplars);
  });
});

describe('v32 hand-learning-export — import', () => {
  it('★ round-trip: export → import → 동일 데이터', () => {
    const feats: Array<[number, number[]]> = [
      [0, Array.from({ length: 95 }, (_, i) => Math.sin(i))],
      [1, Array.from({ length: 95 }, (_, i) => Math.cos(i))],
    ];
    const actives: Array<[number, number[]]> = [
      [0, [5, 15, 25, 35, 45]],
      [1, [55, 65, 75, 85, 92]],
    ];
    const exemplars = {
      out_0_0: { label: '엄지척', count: 10 },
      out_1_0: { label: '평화', count: 7 },
    };
    window.localStorage.setItem(FEATURES_KEY, JSON.stringify(feats));
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(actives));
    window.localStorage.setItem(EXEMPLARS_KEY, JSON.stringify(exemplars));

    // Export.
    const exported = buildHandLearningExport();
    const json = JSON.stringify(exported);

    // Wipe.
    window.localStorage.clear();

    // Import.
    const result = importHandLearningFromJSON(json);
    expect(result.ok).toBe(true);
    expect(result.imported.features).toBe(2);
    expect(result.imported.activeInputs).toBe(2);
    expect(result.imported.exemplars).toBe(2);

    // Verify localStorage 재구성.
    expect(JSON.parse(window.localStorage.getItem(FEATURES_KEY)!)).toEqual(feats);
    expect(JSON.parse(window.localStorage.getItem(ACTIVE_KEY)!)).toEqual(actives);
    expect(JSON.parse(window.localStorage.getItem(EXEMPLARS_KEY)!)).toEqual(exemplars);
  });

  it('잘못된 JSON → ok=false', () => {
    const result = importHandLearningFromJSON('not valid json');
    expect(result.ok).toBe(false);
    expect(result.message).toContain('parse 실패');
  });

  it('null/empty JSON → ok=false', () => {
    expect(importHandLearningFromJSON('null').ok).toBe(false);
    expect(importHandLearningFromJSON('[]').ok).toBe(false);
  });

  it('미래 schemaVersion → 거절', () => {
    const future = JSON.stringify({
      schemaVersion: 99,
      substrate: 'orientation-hand',
      clusterFeatures: [],
    });
    const result = importHandLearningFromJSON(future);
    expect(result.ok).toBe(false);
    expect(result.message).toContain('미지원 schemaVersion');
  });

  it('손상된 entries 일부 → best-effort + warning', () => {
    const partial = JSON.stringify({
      schemaVersion: 1,
      substrate: 'orientation-hand',
      clusterFeatures: [
        [0, new Array(95).fill(0.5)],      // valid
        [1, new Array(63).fill(0.5)],      // wrong dim
        ['bad', new Array(95).fill(0.5)],  // wrong type
        [2, new Array(95).fill(0.5)],      // valid
      ],
      clusterActiveInputs: [
        [0, [1, 2, 3, 4, 5]],              // valid
        [1, [100, 200]],                   // out of range
      ],
      exemplars: { out_0_0: { label: 'ok' } },
    });
    const result = importHandLearningFromJSON(partial);
    expect(result.ok).toBe(true);
    expect(result.imported.features).toBe(2);     // 0, 2 valid
    expect(result.imported.activeInputs).toBe(1); // 0 valid
    expect(result.imported.exemplars).toBe(1);
    expect(result.warnings.length).toBeGreaterThanOrEqual(2);
  });

  it('schemaVersion 없음 → best-effort warning', () => {
    const noVersion = JSON.stringify({
      substrate: 'orientation-hand',
      clusterFeatures: [[0, new Array(95).fill(0.1)]],
    });
    const result = importHandLearningFromJSON(noVersion);
    expect(result.ok).toBe(true);
    expect(result.warnings.some((w) => w.includes('schemaVersion'))).toBe(true);
  });

  it('★ v49: 19 cluster 초과 → 첫 19 영역 사용 + warning', () => {
    const features: Array<[number, number[]]> = [];
    for (let i = 0; i < 25; i += 1) {
      features.push([i, new Array(95).fill(i / 25)]);
    }
    const json = JSON.stringify({
      schemaVersion: 1,
      substrate: 'orientation-hand',
      clusterFeatures: features,
    });
    const result = importHandLearningFromJSON(json);
    expect(result.ok).toBe(true);
    expect(result.imported.features).toBe(19);
    expect(result.warnings.some((w) => w.includes('19 초과'))).toBe(true);
  });

  it('clusterFeatures 비어있음 → ok=false (의미 없음)', () => {
    const empty = JSON.stringify({
      schemaVersion: 1,
      substrate: 'orientation-hand',
      clusterFeatures: [],
    });
    const result = importHandLearningFromJSON(empty);
    expect(result.ok).toBe(false);
    expect(result.message).toContain('유효한 학습 데이터 없음');
  });
});
