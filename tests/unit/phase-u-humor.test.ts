// Phase U — Humor 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  incongruity, isResolvable, computeMirth,
  dominantStyle, detectScriptOpposition, benignViolation,
  type JokeStructure, type HumorProfile,
} from '@/lib/snn-runtime/humor';

const sampleJoke: JokeStructure = {
  setup: 'Why did the chicken cross the road?',
  expectedResolution: 'to get food',
  actualPunchline: 'to get to the other side',
  contextualDistance: 0.6,
};

describe('Phase U — Incongruity (Suls 1972)', () => {
  it('incongruity = contextualDistance', () => {
    expect(incongruity(sampleJoke)).toBe(0.6);
  });
});

describe('Phase U — Resolution', () => {
  it('resolvable joke → true', () => {
    expect(isResolvable(sampleJoke, () => 0.7)).toBe(true);
  });

  it('unresolvable → false', () => {
    expect(isResolvable(sampleJoke, () => 0.2)).toBe(false);
  });
});

describe('Phase U — Mirth Computation', () => {
  it('moderate incongruity + good resolution → high mirth', () => {
    const m = computeMirth(sampleJoke, () => 0.8);
    expect(m).toBeGreaterThan(0.3);
  });

  it('unresolvable → 0 mirth', () => {
    expect(computeMirth(sampleJoke, () => 0.2)).toBe(0);
  });

  it('too low incongruity → 영역 mirth', () => {
    const trivial: JokeStructure = { ...sampleJoke, contextualDistance: 0.05 };
    expect(computeMirth(trivial, () => 0.9)).toBeLessThan(0.3);
  });
});

describe('Phase U — Humor Styles (Martin & Ford 2018)', () => {
  it('dominant style 영역', () => {
    const profile: HumorProfile = {
      affiliative: 0.3, selfEnhancing: 0.8, aggressive: 0.1, selfDefeating: 0.2,
    };
    expect(dominantStyle(profile)).toBe('self-enhancing');
  });

  it('aggressive dominant', () => {
    const profile: HumorProfile = {
      affiliative: 0.2, selfEnhancing: 0.2, aggressive: 0.9, selfDefeating: 0.1,
    };
    expect(dominantStyle(profile)).toBe('aggressive');
  });
});

describe('Phase U — Script Opposition (Raskin 1985)', () => {
  const scripts = new Map<string, string[]>([
    ['medical', ['doctor', 'hospital', 'patient']],
    ['horror', ['scream', 'dark', 'fear']],
  ]);

  it('영역 scripts 영역 → opposition 감지', () => {
    const opp = detectScriptOpposition('doctor enters dark hospital with scream', scripts);
    expect(opp).not.toBeNull();
    expect(opp!.script1).toBe('medical');
    expect(opp!.script2).toBe('horror');
  });

  it('영역 script → null', () => {
    expect(detectScriptOpposition('doctor visit', scripts)).toBeNull();
  });
});

describe('Phase U — Benign Violation (Veatch 1998)', () => {
  it('영역 + 영역 → humorous', () => {
    const r = benignViolation(0.6, 0.7);
    expect(r.isHumorous).toBe(true);
    expect(r.level).toBeCloseTo(0.42, 5);
  });

  it('영역 영역 영역 → not humorous (영역 영역)', () => {
    expect(benignViolation(0.95, 0.05).isHumorous).toBe(false);
  });

  it('영역 영역 영역 → not humorous (영역 영역)', () => {
    expect(benignViolation(0.05, 0.95).isHumorous).toBe(false);
  });
});

describe('Phase U — 통합 시나리오', () => {
  it('classic chicken joke — full pipeline', () => {
    const m = computeMirth(sampleJoke, () => 0.7);
    expect(m).toBeGreaterThan(0);
    expect(m).toBeLessThanOrEqual(1);
  });
});
