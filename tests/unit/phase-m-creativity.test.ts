// Phase M — Creativity 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  blendConcepts, pickBestBlend,
  explorationNovelty, proposeTransformation,
  evaluateDivergentThinking, generateInsight, insightQuality,
  type ConceptualSpace, type InsightEvent,
} from '@/lib/snn-runtime/creativity';

describe('Phase M — Combinatorial Creativity (Boden 2004)', () => {
  it('blendConcepts — 영역 distance 영역 → 영역 novelty + 영역 appropriateness', () => {
    const closeBlend = blendConcepts('dog', 'cat', 0.2); // 영역 영역 영역
    const farBlend = blendConcepts('dog', 'mathematics', 0.9); // 영역 다른 개념
    expect(closeBlend.novelty).toBeLessThan(farBlend.novelty);
    expect(closeBlend.appropriateness).toBeGreaterThan(farBlend.appropriateness);
  });

  it('pickBestBlend — novelty × appropriateness 최대', () => {
    const blends = [
      blendConcepts('a', 'b', 0.2), // 영역 novel, 영역 appropriate
      blendConcepts('a', 'c', 0.5), // balanced
      blendConcepts('a', 'd', 0.95), // 영역 novel, 영역 영역
    ];
    // 0.5 × 0.5 = 0.25 영역 영역 (0.2 × 0.8 = 0.16, 0.95 × 0.05 = 0.0475 영역).
    const best = pickBestBlend(blends);
    expect(best?.parents).toEqual(['a', 'c']);
  });

  it('empty blends → null', () => {
    expect(pickBestBlend([])).toBeNull();
  });
});

describe('Phase M — Exploratory Creativity (Lehman & Stanley 2008)', () => {
  it('explorationNovelty — empty archive → 1.0', () => {
    const space: ConceptualSpace = { explored: [], dimensions: 3 };
    expect(explorationNovelty([0.5, 0.5, 0.5], space)).toBe(1.0);
  });

  it('가까운 explored point → 낮은 novelty', () => {
    const space: ConceptualSpace = { explored: [[0.5, 0.5, 0.5]], dimensions: 3 };
    expect(explorationNovelty([0.5, 0.5, 0.5], space)).toBeCloseTo(0, 5);
  });

  it('영역 explored point → 영역 novelty', () => {
    const space: ConceptualSpace = { explored: [[0, 0, 0]], dimensions: 3 };
    expect(explorationNovelty([1, 1, 1], space)).toBeGreaterThan(0.5);
  });
});

describe('Phase M — Transformational Creativity (Boden 2004)', () => {
  it('space 영역 영역 → transformation 권장', () => {
    const t = proposeTransformation(0.95, 3);
    expect(t).not.toBeNull();
    expect(t!.newDimensions).toBe(4); // dim 추가
  });

  it('영역 영역 → no transformation', () => {
    expect(proposeTransformation(0.5, 3)).toBeNull();
  });
});

describe('Phase M — Divergent Thinking (Guilford 1967)', () => {
  it('fluency / flexibility / originality 측정', () => {
    const ideas = ['paperclip-as-key', 'paperclip-as-needle', 'paperclip-as-art'];
    const categorizer = (idea: string) => idea.split('-as-')[1];
    const commonality = new Map<string, number>([
      ['paperclip-as-key', 0.5],
      ['paperclip-as-needle', 0.2],
      ['paperclip-as-art', 0.05], // 영역
    ]);
    const r = evaluateDivergentThinking(ideas, categorizer, commonality);
    expect(r.fluency).toBe(3);
    expect(r.flexibility).toBe(3); // 모든 idea 영역 다른 category
    expect(r.originality).toBeCloseTo(1 / 3, 5); // 1 영역 idea
  });

  it('empty ideas → all 0', () => {
    const r = evaluateDivergentThinking([], () => '', new Map());
    expect(r.fluency).toBe(0);
    expect(r.originality).toBe(0);
  });
});

describe('Phase M — Creative Insight (Köhler 1925)', () => {
  it('generateInsight — remote concepts 영역 → insight event', () => {
    const insight = generateInsight(
      'how to escape locked room',
      'paperclip', 'lock_mechanism',
      0.8, 'use paperclip as lockpick',
    );
    expect(insight.problem).toBe('how to escape locked room');
    expect(insight.solution).toBe('use paperclip as lockpick');
    expect(insight.remoteConnection.conceptualLeap).toBe(0.8);
  });

  it('insightQuality — leap × fitness', () => {
    const insight: InsightEvent = {
      problem: 'p', solution: 's',
      remoteConnection: { from: 'a', to: 'b', conceptualLeap: 0.7 },
    };
    expect(insightQuality(insight, 0.9)).toBeCloseTo(0.63, 5);
  });
});

describe('Phase M — 통합 시나리오: combinatorial + divergent + insight', () => {
  it('영역 candidate blends + best pick + insight 영역', () => {
    const blends = [
      blendConcepts('clock', 'face', 0.3),
      blendConcepts('time', 'travel', 0.7),
      blendConcepts('quantum', 'mechanics', 0.5),
    ];
    const best = pickBestBlend(blends);
    expect(best).not.toBeNull();

    // Insight 영역 — best blend 영역 영역 영역 영역.
    if (best) {
      const insight = generateInsight(
        'novel scientific theory',
        best.parents[0], best.parents[1],
        best.novelty, `${best.childConcept}_theory`,
      );
      expect(insight.remoteConnection.conceptualLeap).toBe(best.novelty);
    }
  });
});
