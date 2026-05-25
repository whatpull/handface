// Phase L — Language / Symbolic Reasoning 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  groundSymbol, symbolActivation,
  bindRoleFiller, compose, getFiller,
  sampleNextToken, generateSequence,
  applyRules, linkSemantics,
  type SequenceModel, type SymbolicRule,
} from '@/lib/snn-runtime/language';

describe('Phase L — Symbol Grounding (Harnad 1990)', () => {
  it('symbol 영역 neuron pattern 영역 영역', () => {
    const sym = groundSymbol('dog', 'noun', [10, 20, 30]);
    expect(sym.id).toBe('dog');
    expect(sym.category).toBe('noun');
    expect(sym.groundedNeurons).toEqual([10, 20, 30]);
  });

  it('symbol activation — firing rate 평균', () => {
    const sym = groundSymbol('cat', 'noun', [1, 2, 3]);
    const rates = new Map([[1, 0.8], [2, 0.6], [3, 0.4]]);
    expect(symbolActivation(sym, rates)).toBeCloseTo(0.6, 5);
  });

  it('empty grounded neurons → 0', () => {
    const sym = groundSymbol('x', 'noun', []);
    expect(symbolActivation(sym, new Map())).toBe(0);
  });

  it('missing rate → 0 contribution', () => {
    const sym = groundSymbol('y', 'noun', [1, 2]);
    const rates = new Map([[1, 1.0]]); // 2 missing
    expect(symbolActivation(sym, rates)).toBe(0.5); // (1.0 + 0) / 2
  });
});

describe('Phase L — Compositional Binding (Smolensky 1990)', () => {
  it('bind role-filler → 영역 retrieve', () => {
    const dog = groundSymbol('dog', 'noun', [1]);
    const bark = groundSymbol('bark', 'verb', [2]);
    const structure = compose([
      bindRoleFiller('agent', dog),
      bindRoleFiller('action', bark),
    ]);
    expect(getFiller(structure, 'agent')?.id).toBe('dog');
    expect(getFiller(structure, 'action')?.id).toBe('bark');
    expect(getFiller(structure, 'missing')).toBeNull();
  });
});

describe('Phase L — Sequence Generation (Bengio 2003)', () => {
  const vocab = ['<start>', 'hello', 'world', '<end>'];
  const model: SequenceModel = {
    vocabulary: vocab,
    transitions: [
      [0, 1.0, 0, 0],  // <start> → hello
      [0, 0, 1.0, 0],  // hello → world
      [0, 0, 0, 1.0],  // world → <end>
      [0, 0, 0, 0],    // <end> → nothing
    ],
  };

  it('greedy sampling — highest prob token', () => {
    const next = sampleNextToken(model, 0, 0.001);
    expect(next.token).toBe('hello');
    expect(next.probability).toBe(1.0);
  });

  it('temperature softmax', () => {
    const next = sampleNextToken(model, 1, 1.0);
    expect(next.token).toBe('world');
  });

  it('invalid token idx → empty', () => {
    expect(sampleNextToken(model, 99).token).toBe('');
  });

  it('generate full sequence', () => {
    const seq = generateSequence(model, 0, 10, 3, 0.001);
    expect(seq).toEqual(['<start>', 'hello', 'world', '<end>']);
  });

  it('generate stops at maxLength', () => {
    const seq = generateSequence(model, 0, 2, -1, 0.001);
    expect(seq.length).toBeLessThanOrEqual(2);
  });
});

describe('Phase L — Symbolic Rule Application (Marcus 2001)', () => {
  it('precondition met → rule applies + derives new symbol', () => {
    const dog = groundSymbol('dog', 'noun', [1]);
    const bark = groundSymbol('bark', 'verb', [2]);
    const rule: SymbolicRule = {
      name: 'noun_verb_combination',
      precondition: (syms) => syms.some(s => s.category === 'noun') && syms.some(s => s.category === 'verb'),
      apply: (syms) => {
        const n = syms.find(s => s.category === 'noun');
        const v = syms.find(s => s.category === 'verb');
        return n && v ? groundSymbol(`${n.id}_${v.id}`, 'sentence', [...n.groundedNeurons, ...v.groundedNeurons]) : null;
      },
    };
    const applied = applyRules([rule], [dog, bark]);
    expect(applied).toHaveLength(1);
    expect(applied[0].derived?.id).toBe('dog_bark');
    expect(applied[0].derived?.category).toBe('sentence');
  });

  it('precondition NOT met → 영역 적용', () => {
    const rule: SymbolicRule = {
      name: 'has_verb',
      precondition: (syms) => syms.some(s => s.category === 'verb'),
      apply: () => null,
    };
    const noun = groundSymbol('x', 'noun', [1]);
    const applied = applyRules([rule], [noun]);
    expect(applied).toHaveLength(0);
  });
});

describe('Phase L — Cross-modal Semantic Linking', () => {
  it('symbol → image cluster + audio neurons 영역 link', () => {
    const link = linkSemantics('dog', 5, [100, 200, 300]);
    expect(link.symbolId).toBe('dog');
    expect(link.imageClusterId).toBe(5);
    expect(link.audioNeuronIds).toEqual([100, 200, 300]);
  });
});

describe('Phase L — 통합 시나리오: ground + compose + reason', () => {
  it('영역 영역 영역 영역 추론 — noun + verb → sentence + cross-modal link', () => {
    const dog = groundSymbol('dog', 'noun', [10, 20]);
    const bark = groundSymbol('bark', 'verb', [30, 40]);

    // Compose.
    const sentence = compose([
      bindRoleFiller('agent', dog),
      bindRoleFiller('action', bark),
    ]);
    expect(getFiller(sentence, 'agent')?.id).toBe('dog');

    // Apply rule.
    const rule: SymbolicRule = {
      name: 'subject_predicate',
      precondition: (syms) => syms.find(s => s.category === 'noun') !== undefined && syms.find(s => s.category === 'verb') !== undefined,
      apply: (syms) => {
        const n = syms.find(s => s.category === 'noun')!;
        const v = syms.find(s => s.category === 'verb')!;
        return groundSymbol(`(${n.id} ${v.id}s)`, 'sentence',
          [...n.groundedNeurons, ...v.groundedNeurons]);
      },
    };
    const derived = applyRules([rule], [dog, bark]);
    expect(derived[0].derived?.id).toBe('(dog barks)');

    // Cross-modal link.
    const link = linkSemantics('dog', 5, [100]);
    expect(link.imageClusterId).toBe(5);
  });
});
