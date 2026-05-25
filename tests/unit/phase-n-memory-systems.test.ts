// Phase N — Memory Systems 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  createEpisodicMemory, recordEpisode, recallEpisodes,
  createSemanticNetwork, addConcept, addRelation, spreadingActivation,
  createProcedure, practiceProcedure,
  createAssociativeMemory, storePattern, recallPattern,
  shouldConsolidate,
  type EpisodicTrace,
} from '@/lib/snn-runtime/memory-systems';

describe('Phase N — Episodic Memory (Tulving 1985)', () => {
  it('record + recall by when/where/what', () => {
    let mem = createEpisodicMemory(10);
    const trace: EpisodicTrace = {
      id: 'e1', when: 100, where: 'home', what: 'pet the cat',
      associatedNeurons: [1, 2], emotionalValence: 0.7,
    };
    mem = recordEpisode(mem, trace);
    expect(recallEpisodes(mem, { where: 'home' })).toHaveLength(1);
    expect(recallEpisodes(mem, { whenRange: [50, 150] })).toHaveLength(1);
    expect(recallEpisodes(mem, { whatContains: 'cat' })).toHaveLength(1);
    expect(recallEpisodes(mem, { where: 'park' })).toHaveLength(0);
  });

  it('capacity 초과 시 영역 영역 영역 영역', () => {
    let mem = createEpisodicMemory(2);
    for (let i = 0; i < 5; i += 1) {
      mem = recordEpisode(mem, {
        id: `e${i}`, when: i, where: 'x', what: `event ${i}`,
        associatedNeurons: [], emotionalValence: i === 2 ? 0.9 : 0.1,
      });
    }
    expect(mem.traces.length).toBe(2);
    // High emotional trace 영역 유지 (event 2 영역 valence 0.9).
    expect(mem.traces.find(t => t.id === 'e2')).toBeDefined();
  });
});

describe('Phase N — Semantic Memory (Collins & Loftus 1975)', () => {
  it('add concept + relation + spreading activation', () => {
    let net = createSemanticNetwork();
    net = addConcept(net, 'dog', 'Dog');
    net = addConcept(net, 'mammal', 'Mammal');
    net = addConcept(net, 'animal', 'Animal');
    net = addRelation(net, 'dog', 'is_a', 'mammal');
    net = addRelation(net, 'mammal', 'is_a', 'animal');

    const activations = spreadingActivation(net, 'dog', 2);
    expect(activations.get('dog')).toBe(1.0);
    expect(activations.get('mammal')).toBeCloseTo(0.5, 5);
    expect(activations.get('animal')).toBeCloseTo(0.25, 5);
  });

  it('영역 영역 concept → 영역 activation', () => {
    const net = createSemanticNetwork();
    const acts = spreadingActivation(net, 'missing', 2);
    expect(acts.size).toBe(1); // only the start itself
  });

  it('relation 영역 영역 fromId → 영역 영역', () => {
    let net = createSemanticNetwork();
    net = addConcept(net, 'a', 'A');
    net = addRelation(net, 'unknown', 'rel', 'a'); // unknown 영역 → 영역 변화
    expect(net.concepts.get('a')?.relations.size).toBe(0);
  });
});

describe('Phase N — Procedural Memory (Newell & Rosenbloom 1981)', () => {
  it('반복 학습 → proficiency 영역 (power law)', () => {
    let proc = createProcedure('grasp', ['reach', 'close fingers', 'lift']);
    expect(proc.proficiency).toBe(0);

    for (let i = 0; i < 10; i += 1) proc = practiceProcedure(proc);
    expect(proc.repetitions).toBe(10);
    expect(proc.proficiency).toBeGreaterThan(0.5);
    expect(proc.proficiency).toBeLessThanOrEqual(1);

    for (let i = 0; i < 90; i += 1) proc = practiceProcedure(proc);
    expect(proc.proficiency).toBeGreaterThan(0.99);
  });
});

describe('Phase N — Associative Memory (Hopfield 1982)', () => {
  it('store + recall partial cue → 영역 완성', () => {
    let mem = createAssociativeMemory(4);
    mem = storePattern(mem, [1, -1, 1, -1]);
    mem = storePattern(mem, [-1, 1, -1, 1]);

    // Cue (영역 영역 다른 첫 pattern) → 영역 영역 영역.
    expect(recallPattern(mem, [1, -1, 1, 1])).toEqual([1, -1, 1, -1]);
    expect(recallPattern(mem, [-1, 1, -1, -1])).toEqual([-1, 1, -1, 1]);
  });

  it('size mismatch → 영역 storage', () => {
    const mem = createAssociativeMemory(4);
    const result = storePattern(mem, [1, -1]); // wrong size
    expect(result.patterns).toHaveLength(0);
  });

  it('empty memory → null recall', () => {
    const mem = createAssociativeMemory(4);
    expect(recallPattern(mem, [1, 1, 1, 1])).toBeNull();
  });
});

describe('Phase N — Memory Consolidation (McGaugh 2000)', () => {
  it('high emotional → consolidate', () => {
    const trace: EpisodicTrace = {
      id: 'e1', when: 0, where: '', what: '',
      associatedNeurons: [], emotionalValence: 0.9,
    };
    expect(shouldConsolidate(trace, 1)).toBe(true);
  });

  it('high repetition → consolidate', () => {
    const trace: EpisodicTrace = {
      id: 'e1', when: 0, where: '', what: '',
      associatedNeurons: [], emotionalValence: 0.1,
    };
    expect(shouldConsolidate(trace, 5)).toBe(true);
  });

  it('low both → no consolidate', () => {
    const trace: EpisodicTrace = {
      id: 'e1', when: 0, where: '', what: '',
      associatedNeurons: [], emotionalValence: 0.1,
    };
    expect(shouldConsolidate(trace, 1)).toBe(false);
  });
});

describe('Phase N — 통합 시나리오: episodic → procedural via consolidation', () => {
  it('영역 반복된 경험 → procedural skill 영역 영역', () => {
    let episodic = createEpisodicMemory(100);
    let proc = createProcedure('learned_skill', ['s1', 's2']);

    // 영역 영역 episode 반복 + consolidation 발동 → procedure 영역.
    for (let i = 0; i < 10; i += 1) {
      const trace: EpisodicTrace = {
        id: `practice_${i}`, when: i, where: 'lab', what: 'practice skill',
        associatedNeurons: [], emotionalValence: 0.3,
      };
      episodic = recordEpisode(episodic, trace);
      if (shouldConsolidate(trace, i + 1)) {
        proc = practiceProcedure(proc);
      }
    }

    expect(episodic.traces.length).toBeGreaterThan(0);
    expect(proc.repetitions).toBeGreaterThan(0); // skill 영역
    expect(proc.proficiency).toBeGreaterThan(0);
  });
});
