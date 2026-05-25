// Phase S — Cultural Cognition / Pedagogy 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  isPedagogicalContext, encodeKnowledge,
  advanceGenerationDeterministic,
  conformistChoice, payoffBiasedChoice, evaluateViolation,
  type OstensiveCue, type KnowledgeUnit, type CulturalLineage, type CulturalVariant, type SocialNorm,
} from '@/lib/snn-runtime/cultural-cognition';

describe('Phase S — Ostensive Cues (Csibra & Gergely 2009)', () => {
  it('강한 영역 cue → pedagogical context', () => {
    const cues: OstensiveCue[] = [
      { type: 'eye_contact', intensity: 0.5 },
      { type: 'name_call', intensity: 0.3 },
    ];
    expect(isPedagogicalContext(cues)).toBe(true);
  });

  it('약한 영역 → 영역 pedagogical', () => {
    const cues: OstensiveCue[] = [{ type: 'pointing', intensity: 0.3 }];
    expect(isPedagogicalContext(cues)).toBe(false);
  });

  it('영역 cue → 영역 pedagogical', () => {
    expect(isPedagogicalContext([])).toBe(false);
  });
});

describe('Phase S — Generic Knowledge Encoding', () => {
  it('pedagogical context → specific → general upgrade', () => {
    const unit: KnowledgeUnit = {
      id: 'k1', content: 'this is a hammer', generalityLevel: 'specific', evidenceStrength: 1.0,
    };
    expect(encodeKnowledge(unit, true).generalityLevel).toBe('general');
    expect(encodeKnowledge(unit, false).generalityLevel).toBe('specific');
  });

  it('general → universal upgrade', () => {
    const unit: KnowledgeUnit = {
      id: 'k2', content: 'this works', generalityLevel: 'general', evidenceStrength: 1.0,
    };
    expect(encodeKnowledge(unit, true).generalityLevel).toBe('universal');
  });

  it('universal 영역 그대로', () => {
    const unit: KnowledgeUnit = {
      id: 'k3', content: 'always true', generalityLevel: 'universal', evidenceStrength: 1.0,
    };
    expect(encodeKnowledge(unit, true).generalityLevel).toBe('universal');
  });
});

describe('Phase S — Cumulative Culture (Boyd & Richerson 1985)', () => {
  it('advance generation — retain + add new', () => {
    let lineage: CulturalLineage = {
      generation: 0, artifacts: ['fire', 'wheel'], cumulativeImprovement: 0,
    };
    lineage = advanceGenerationDeterministic(lineage, ['agriculture'], true);
    expect(lineage.generation).toBe(1);
    expect(lineage.artifacts).toContain('fire');
    expect(lineage.artifacts).toContain('agriculture');
    expect(lineage.cumulativeImprovement).toBeGreaterThan(0);
  });

  it('영역 generation 영역 영역 → improvement 영역', () => {
    let lineage: CulturalLineage = {
      generation: 0, artifacts: [], cumulativeImprovement: 0,
    };
    for (let i = 0; i < 5; i += 1) {
      lineage = advanceGenerationDeterministic(lineage, [`tool_${i}`], true);
    }
    expect(lineage.artifacts.length).toBe(5);
    expect(lineage.cumulativeImprovement).toBeGreaterThan(0.2);
  });
});

describe('Phase S — Cultural Transmission Strategies', () => {
  const variants: CulturalVariant[] = [
    { id: 'v1', prevalence: 0.6, payoff: 0.3 },
    { id: 'v2', prevalence: 0.3, payoff: 0.8 },
    { id: 'v3', prevalence: 0.1, payoff: 0.5 },
  ];

  it('conformist → 영역 영역 variant', () => {
    expect(conformistChoice(variants)?.id).toBe('v1');
  });

  it('payoff-biased → 영역 영역 영역 variant', () => {
    expect(payoffBiasedChoice(variants)?.id).toBe('v2');
  });

  it('empty → null', () => {
    expect(conformistChoice([])).toBeNull();
    expect(payoffBiasedChoice([])).toBeNull();
  });
});

describe('Phase S — Norm Enforcement (Fehr & Gächter 2002)', () => {
  it('영역 enforcement + severity → punish cost', () => {
    const norm: SocialNorm = { id: 'no_steal', rule: 'do not steal', enforcementLevel: 0.8 };
    expect(evaluateViolation(norm, 0.5).punishCost).toBeCloseTo(0.4, 5);
  });

  it('영역 enforcement → 영역 cost', () => {
    const norm: SocialNorm = { id: 'minor', rule: 'minor norm', enforcementLevel: 0.1 };
    expect(evaluateViolation(norm, 1.0).punishCost).toBeCloseTo(0.1, 5);
  });
});

describe('Phase S — 통합 시나리오: pedagogy → cumulative culture → norm', () => {
  it('teacher → student → 영역 generation 영역 cultural learning', () => {
    const cues: OstensiveCue[] = [
      { type: 'eye_contact', intensity: 0.8 },
      { type: 'name_call', intensity: 0.5 },
    ];
    expect(isPedagogicalContext(cues)).toBe(true);

    const knowledge: KnowledgeUnit = {
      id: 'how_to_fish', content: 'use net at dawn',
      generalityLevel: 'specific', evidenceStrength: 1.0,
    };
    const encoded = encodeKnowledge(knowledge, true);
    expect(encoded.generalityLevel).toBe('general');

    // Cumulative culture across 3 generations.
    let lineage: CulturalLineage = { generation: 0, artifacts: [encoded.content], cumulativeImprovement: 0 };
    lineage = advanceGenerationDeterministic(lineage, ['improved_net']);
    lineage = advanceGenerationDeterministic(lineage, ['boat']);
    expect(lineage.generation).toBe(2);
    expect(lineage.artifacts.length).toBe(3);
  });
});
