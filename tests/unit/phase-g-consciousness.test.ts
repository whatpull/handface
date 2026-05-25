// Phase G — Consciousness Architecture 단위 테스트.
// SNN Perfect Brain Roadmap 2 단계 검증 (Global Workspace Theory 정합).

import { describe, it, expect } from 'vitest';
import {
  admitToWorkspace, competitiveSelect,
  pushToWorkingMemory, decayWorkingMemory, recallFromMemory,
  applyTopDownAttention, integratedInformationProxy, isConsciouslyAccessed,
  WORKING_MEMORY_CAPACITY, CONSCIOUS_ACCESS_THRESHOLD,
  type WorkspaceEntry, type GlobalWorkspaceState,
} from '@/lib/snn-runtime/consciousness';

const makeEntry = (source: string, content: number, salience: number, timestamp = 0): WorkspaceEntry => ({
  source, content, salience, timestamp,
});

describe('Phase G — Global Workspace (Baars 1988)', () => {
  it('empty workspace → 첫 candidate 영역 broadcast 점유', () => {
    const initial: GlobalWorkspaceState = { currentBroadcast: null, history: [] };
    const next = admitToWorkspace(initial, makeEntry('image', 5, 0.7));
    expect(next.currentBroadcast?.source).toBe('image');
    expect(next.history).toHaveLength(0);
  });

  it('영역 strong candidate → 이전 broadcast 영역 history 영역, 새 candidate 영역 점유', () => {
    const initial: GlobalWorkspaceState = {
      currentBroadcast: makeEntry('image', 5, 0.5),
      history: [],
    };
    const next = admitToWorkspace(initial, makeEntry('audio', 10, 0.9));
    expect(next.currentBroadcast?.source).toBe('audio');
    expect(next.history).toHaveLength(1);
    expect(next.history[0].source).toBe('image');
  });

  it('약한 candidate → 무시 (broadcast 그대로)', () => {
    const initial: GlobalWorkspaceState = {
      currentBroadcast: makeEntry('image', 5, 0.8),
      history: [],
    };
    const next = admitToWorkspace(initial, makeEntry('audio', 10, 0.3));
    expect(next.currentBroadcast?.source).toBe('image');
    expect(next.history).toHaveLength(0);
  });
});

describe('Phase G — Competitive Selection', () => {
  it('highest salience 영역 winner', () => {
    const winner = competitiveSelect([
      { source: 'image', content: 1, salience: 0.3 },
      { source: 'audio', content: 2, salience: 0.8 },
      { source: 'text', content: 3, salience: 0.5 },
    ]);
    expect(winner?.source).toBe('audio');
  });

  it('empty candidates → null', () => {
    expect(competitiveSelect([])).toBeNull();
  });

  it('tied → 첫 candidate', () => {
    const winner = competitiveSelect([
      { source: 'image', content: 1, salience: 0.5 },
      { source: 'audio', content: 2, salience: 0.5 },
    ]);
    expect(winner?.source).toBe('image');
  });
});

describe('Phase G — Working Memory (Cowan 2001 magical number ~4)', () => {
  it('push 영역 capacity 영역 영역 → sliding window', () => {
    let buffer: WorkspaceEntry[] = [];
    for (let i = 0; i < 6; i += 1) {
      buffer = pushToWorkingMemory(buffer, makeEntry('s', i, 0.5, i * 100));
    }
    expect(buffer.length).toBe(WORKING_MEMORY_CAPACITY);
    // 마지막 4 개만 유지 — content [2, 3, 4, 5]
    expect(buffer.map(e => e.content)).toEqual([2, 3, 4, 5]);
  });

  it('decay — 영역 entry 영역 영역', () => {
    const buffer = [
      makeEntry('s', 0, 0.5, 0),
      makeEntry('s', 1, 0.5, 1000),
      makeEntry('s', 2, 0.5, 6000),
    ];
    const after = decayWorkingMemory(buffer, 7000, 5000); // decayMs = 5초
    // (7000 - 0) = 7000 > 5000 → drop
    // (7000 - 1000) = 6000 > 5000 → drop
    // (7000 - 6000) = 1000 < 5000 → keep
    expect(after).toHaveLength(1);
    expect(after[0].content).toBe(2);
  });

  it('recall — source 영역 가장 최근 entry', () => {
    const buffer = [
      makeEntry('image', 1, 0.5, 0),
      makeEntry('audio', 10, 0.7, 100),
      makeEntry('image', 2, 0.8, 200),
    ];
    const result = recallFromMemory(buffer, 'image');
    expect(result?.content).toBe(2); // 가장 최근
  });

  it('recall — source 영역 → null', () => {
    expect(recallFromMemory([], 'image')).toBeNull();
  });
});

describe('Phase G — Top-down Attention (Reynolds & Heeger 2009)', () => {
  it('attended source 영역 salience boost', () => {
    const result = applyTopDownAttention(
      [
        { source: 'image', content: 1, salience: 0.5 },
        { source: 'audio', content: 2, salience: 0.5 },
      ],
      { attendedSources: ['audio'], gainBoost: 2.0 },
    );
    expect(result[0].salience).toBe(0.5); // image — unchanged
    expect(result[1].salience).toBe(1.0); // audio — boosted ×2
  });

  it('영역 attended source → 영역 변화', () => {
    const result = applyTopDownAttention(
      [{ source: 'image', content: 1, salience: 0.5 }],
      { attendedSources: ['audio'], gainBoost: 2.0 },
    );
    expect(result[0].salience).toBe(0.5);
  });
});

describe('Phase G — Integrated Information Proxy (Tononi IIT)', () => {
  it('single source → Φ = 0 (integration 영역)', () => {
    expect(integratedInformationProxy([{ source: 's', activity: 0.9 }])).toBe(0);
  });

  it('영역 source 동시 활성 → high Φ', () => {
    const phi = integratedInformationProxy([
      { source: 'image', activity: 0.8 },
      { source: 'audio', activity: 0.7 },
      { source: 'text', activity: 0.6 },
    ]);
    // 3/3 active, avg 0.7 → Φ = 1.0 × 0.7 = 0.7
    expect(phi).toBeCloseTo(0.7, 5);
  });

  it('일부만 활성 → moderate Φ', () => {
    const phi = integratedInformationProxy([
      { source: 'image', activity: 0.8 },
      { source: 'audio', activity: 0.05 }, // inactive
      { source: 'text', activity: 0.6 },
    ]);
    // 2/3 active, avg = (0.8+0.05+0.6)/3 ≈ 0.483
    expect(phi).toBeCloseTo((2 / 3) * ((0.8 + 0.05 + 0.6) / 3), 5);
  });

  it('empty → 0', () => {
    expect(integratedInformationProxy([])).toBe(0);
  });
});

describe('Phase G — Conscious Access (Dehaene 2014)', () => {
  it('salience ≥ threshold → conscious', () => {
    expect(isConsciouslyAccessed(makeEntry('s', 1, 0.7))).toBe(true);
  });

  it('salience < threshold → unconscious processing', () => {
    expect(isConsciouslyAccessed(makeEntry('s', 1, 0.3))).toBe(false);
  });

  it('custom threshold', () => {
    expect(isConsciouslyAccessed(makeEntry('s', 1, 0.6), 0.8)).toBe(false);
    expect(isConsciouslyAccessed(makeEntry('s', 1, 0.85), 0.8)).toBe(true);
  });

  it('threshold default 영역 CONSCIOUS_ACCESS_THRESHOLD (0.5)', () => {
    expect(CONSCIOUS_ACCESS_THRESHOLD).toBe(0.5);
  });
});

describe('Phase G — 통합 시나리오: 의식 통합', () => {
  it('영역 modality 입력 → competitive selection + workspace broadcast', () => {
    const candidates = [
      { source: 'image', content: 1, salience: 0.3 },
      { source: 'audio', content: 10, salience: 0.85 },
      { source: 'text', content: 100, salience: 0.4 },
    ];
    const winner = competitiveSelect(candidates);
    expect(winner?.source).toBe('audio');

    const initial: GlobalWorkspaceState = { currentBroadcast: null, history: [] };
    const after = admitToWorkspace(initial, {
      source: winner!.source, content: winner!.content, salience: winner!.salience, timestamp: 0,
    });
    expect(after.currentBroadcast?.source).toBe('audio');
    expect(isConsciouslyAccessed(after.currentBroadcast!)).toBe(true);
  });

  it('working memory — 5 시점 시퀀스 영역 영역 영역 capacity 4', () => {
    let buffer: WorkspaceEntry[] = [];
    for (let t = 0; t < 5; t += 1) {
      buffer = pushToWorkingMemory(buffer, makeEntry('s', t, 0.5, t * 100));
    }
    expect(buffer.length).toBe(4);
    expect(buffer[0].content).toBe(1); // 첫 (t=0) 영역 영역
  });

  it('attention modulation 영역 winner 영역 변경', () => {
    const candidates = [
      { source: 'image', content: 1, salience: 0.6 },
      { source: 'audio', content: 10, salience: 0.5 }, // 영역 영역 image 영역 winner
    ];
    // Top-down attention → audio 영역 영역 → audio 영역 winner 영역 영역
    const modulated = applyTopDownAttention(candidates, { attendedSources: ['audio'], gainBoost: 2.0 });
    const winner = competitiveSelect(modulated);
    expect(winner?.source).toBe('audio'); // attention 영역 winner 영역
  });
});
