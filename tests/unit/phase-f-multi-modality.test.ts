// Phase F — Multi-Modality Integration 단위 테스트 (완벽한 인공지능 1 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 1 단계 검증.

import { describe, it, expect } from 'vitest';
import {
  rateEncode, encodeTemporalSeries, encodeSpectrogram, encodeTextSequence,
  updateBinding, batchUpdateBindings,
  selectAttendedModality, softModalityAttention,
  coherenceScore, crossModalRetrieve,
  DEFAULT_TEMPORAL_CONFIG,
  type CrossModalAssociation,
} from '@/lib/snn-runtime/multi-modality';

describe('Phase F — Rate Encoding (Adrian 1926)', () => {
  it('value 0 → 0 Hz', () => {
    expect(rateEncode(0)).toBe(0);
  });

  it('value 1 → maxRateHz', () => {
    expect(rateEncode(1)).toBe(DEFAULT_TEMPORAL_CONFIG.maxRateHz);
  });

  it('value clamped [0,1]', () => {
    expect(rateEncode(-0.5)).toBe(0);
    expect(rateEncode(1.5)).toBe(DEFAULT_TEMPORAL_CONFIG.maxRateHz);
  });
});

describe('Phase F — Temporal Spike Encoding', () => {
  it('threshold 위 value → spike 생성', () => {
    const spikes = encodeTemporalSeries([0.1, 0.5, 0.8, 0.2, 0.9], 10);
    // value > 0.3 (default threshold) at indices 1, 2, 4
    // refractory 5ms → all > 5ms apart so all spike
    expect(spikes).toContain(10); // index 1 × 10ms
    expect(spikes).toContain(20); // index 2 × 10ms
    expect(spikes).toContain(40); // index 4 × 10ms
  });

  it('refractory period 영역 영역 spike 영역', () => {
    // refractoryMs 영역 크게 영역 영역 첫 spike 후 영역 영역 무시.
    const spikes = encodeTemporalSeries([0.5, 0.5, 0.5], 10, { ...DEFAULT_TEMPORAL_CONFIG, refractoryMs: 100 });
    expect(spikes).toHaveLength(1); // 첫 spike 만
  });

  it('empty series → empty spikes', () => {
    expect(encodeTemporalSeries([], 10)).toEqual([]);
  });

  it('threshold 아래 value → no spike', () => {
    const spikes = encodeTemporalSeries([0.1, 0.2, 0.05], 10);
    expect(spikes).toEqual([]);
  });
});

describe('Phase F — Spectrogram Encoding', () => {
  it('multi-frequency spectrogram → Map<freq, spikes>', () => {
    // 2 freq bands × 3 time bins
    const spec = [
      [0.8, 0.1, 0.9], // freq 0 — spikes at 0, 20
      [0.2, 0.6, 0.1], // freq 1 — spike at 10
    ];
    const result = encodeSpectrogram(spec, 10);
    expect(result.size).toBe(2);
    expect(result.get(0)).toEqual([0, 20]);
    expect(result.get(1)).toEqual([10]);
  });
});

describe('Phase F — Text Sequence Encoding', () => {
  it('token sequence → one-hot spike per token', () => {
    const result = encodeTextSequence([3, 5, 3, 7], 10, 50);
    expect(result.size).toBe(3);
    expect(result.get(3)).toEqual([0, 100]); // token 3 at index 0 and 2
    expect(result.get(5)).toEqual([50]);
    expect(result.get(7)).toEqual([150]);
  });

  it('out-of-vocab tokens 영역', () => {
    const result = encodeTextSequence([3, -1, 100, 5], 10, 50);
    expect(result.size).toBe(2); // only 3 and 5 valid
  });
});

describe('Phase F — Cross-Modal Binding (Hebbian)', () => {
  it('첫 co-activation → new binding with learningRate weight', () => {
    const binding = updateBinding(null, 'image', 'audio', 5, 12, true, 0.1);
    expect(binding.weight).toBe(0.1);
    expect(binding.coActivationCount).toBe(1);
  });

  it('반복 co-activation → weight 누적 (bounded at 1)', () => {
    let binding: CrossModalAssociation | null = null;
    for (let i = 0; i < 20; i += 1) {
      binding = updateBinding(binding, 'image', 'audio', 5, 12, true, 0.1);
    }
    expect(binding!.weight).toBe(1); // bounded
    expect(binding!.coActivationCount).toBe(20);
  });

  it('not both active → no weight update', () => {
    const initial = updateBinding(null, 'image', 'audio', 5, 12, true, 0.1);
    const after = updateBinding(initial, 'image', 'audio', 5, 12, false, 0.1);
    expect(after.weight).toBe(0.1); // unchanged
    expect(after.coActivationCount).toBe(1);
  });

  it('batchUpdateBindings — 모든 pair 영역 학습', () => {
    const bindings = batchUpdateBindings(
      'image', 'audio',
      [1, 2], [10, 20, 30],
      new Map(),
      0.1,
    );
    expect(bindings.size).toBe(6); // 2 × 3 pairs
    expect(bindings.get('image:1↔audio:10')?.weight).toBe(0.1);
  });
});

describe('Phase F — Modality Attention', () => {
  it('winner-take-all — 최대 rate modality 선출', () => {
    const r = selectAttendedModality([
      { name: 'image', averageFiringRate: 20 },
      { name: 'audio', averageFiringRate: 50 },
      { name: 'text', averageFiringRate: 10 },
    ]);
    expect(r.winner).toBe('audio');
    expect(r.salience).toBeCloseTo(50 / 80, 5);
  });

  it('empty modalities → no winner', () => {
    const r = selectAttendedModality([]);
    expect(r.winner).toBe('');
    expect(r.salience).toBe(0);
  });

  it('softmax attention — normalized [0,1] weights', () => {
    const weights = softModalityAttention([
      { name: 'image', averageFiringRate: 1 },
      { name: 'audio', averageFiringRate: 2 },
    ]);
    let sum = 0;
    for (const w of weights.values()) sum += w;
    expect(sum).toBeCloseTo(1, 5);
    expect(weights.get('audio')! > weights.get('image')!).toBe(true);
  });
});

describe('Phase F — Multi-Modal Coherence', () => {
  it('강하게 bound된 pair active → high coherence', () => {
    const bindings = new Map<string, CrossModalAssociation>();
    bindings.set('image:1↔audio:10', {
      modalityA: 'image', modalityB: 'audio',
      neuronA: 1, neuronB: 10, weight: 0.9, coActivationCount: 9,
    });
    const score = coherenceScore([1], [10], bindings, 'image', 'audio');
    expect(score).toBeCloseTo(0.9, 5);
  });

  it('binding 없음 → coherence 0', () => {
    const score = coherenceScore([1], [10], new Map(), 'image', 'audio');
    expect(score).toBe(0);
  });

  it('multiple pairs avg', () => {
    const bindings = new Map<string, CrossModalAssociation>();
    bindings.set('image:1↔audio:10', { modalityA: 'image', modalityB: 'audio', neuronA: 1, neuronB: 10, weight: 0.8, coActivationCount: 1 });
    bindings.set('image:1↔audio:20', { modalityA: 'image', modalityB: 'audio', neuronA: 1, neuronB: 20, weight: 0.4, coActivationCount: 1 });
    const score = coherenceScore([1], [10, 20], bindings, 'image', 'audio');
    expect(score).toBeCloseTo(0.6, 5); // (0.8 + 0.4) / 2
  });
});

describe('Phase F — Cross-Modal Retrieval', () => {
  it('image active → top-k bound audio neurons 영역', () => {
    const bindings = new Map<string, CrossModalAssociation>();
    bindings.set('image:1↔audio:10', { modalityA: 'image', modalityB: 'audio', neuronA: 1, neuronB: 10, weight: 0.9, coActivationCount: 5 });
    bindings.set('image:1↔audio:20', { modalityA: 'image', modalityB: 'audio', neuronA: 1, neuronB: 20, weight: 0.5, coActivationCount: 2 });
    bindings.set('image:2↔audio:30', { modalityA: 'image', modalityB: 'audio', neuronA: 2, neuronB: 30, weight: 0.7, coActivationCount: 3 });
    const retrieved = crossModalRetrieve([1, 2], bindings, 'image', 'audio', 2);
    expect(retrieved).toHaveLength(2);
    expect(retrieved[0].neuron).toBe(10); // strongest
    expect(retrieved[1].neuron).toBe(30); // 2nd strongest
  });

  it('no bindings for given modality → empty result', () => {
    const retrieved = crossModalRetrieve([1, 2], new Map(), 'image', 'audio');
    expect(retrieved).toEqual([]);
  });
});

describe('Phase F — 통합 시나리오: hand image + voice → bound learning', () => {
  it('동시 학습 → cross-modal retrieval 가능', () => {
    let bindings = new Map<string, CrossModalAssociation>();
    // Hand image neurons [1, 5] + voice neurons [10, 20] 5 회 동시 활성
    for (let i = 0; i < 5; i += 1) {
      bindings = batchUpdateBindings('image', 'voice', [1, 5], [10, 20], bindings, 0.1);
    }
    expect(bindings.size).toBe(4);
    // image neuron 1 → voice retrieval 영역 10, 20 영역 영역 영역.
    const retrieved = crossModalRetrieve([1], bindings, 'image', 'voice', 5);
    expect(retrieved.length).toBe(2);
    expect(retrieved.every(r => r.neuron === 10 || r.neuron === 20)).toBe(true);
  });

  it('영역 modality 동시 통합 시나리오 — image + audio + text', () => {
    // 3 modality 영역 학습 후 → image 영역 audio + text 영역 영역 retrieval.
    let imageAudio = new Map<string, CrossModalAssociation>();
    let imageText = new Map<string, CrossModalAssociation>();
    for (let i = 0; i < 3; i += 1) {
      imageAudio = batchUpdateBindings('image', 'audio', [1], [10], imageAudio);
      imageText = batchUpdateBindings('image', 'text', [1], [100], imageText);
    }
    expect(imageAudio.size).toBe(1);
    expect(imageText.size).toBe(1);
    expect(imageAudio.get('image:1↔audio:10')?.weight).toBeCloseTo(0.3, 5);
    expect(imageText.get('image:1↔text:100')?.weight).toBeCloseTo(0.3, 5);
  });
});
