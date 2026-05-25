// Phase V — Morality 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  stageLevel, totalFoundationScore, judgeDilemma,
  veilOfIgnoranceCheck, moralInclusion,
  type MoralStage, type MoralFoundations, type MoralDilemma,
} from '@/lib/snn-runtime/morality';

describe('Phase V — Kohlberg Stages (1969)', () => {
  it('stage levels 1-6', () => {
    expect(stageLevel('preconventional_obedience')).toBe(1);
    expect(stageLevel('postconventional_universal')).toBe(6);
  });

  it('영역 stage 영역 영역 영역', () => {
    const stages: MoralStage[] = [
      'preconventional_obedience', 'preconventional_self_interest',
      'conventional_conformity', 'conventional_law_order',
      'postconventional_social_contract', 'postconventional_universal',
    ];
    for (let i = 0; i < stages.length - 1; i += 1) {
      expect(stageLevel(stages[i])).toBeLessThan(stageLevel(stages[i + 1]));
    }
  });
});

describe('Phase V — Moral Foundations (Haidt 2001)', () => {
  it('totalFoundationScore — average', () => {
    const f: MoralFoundations = {
      care: 0.9, fairness: 0.8, loyalty: 0.6, authority: 0.4, sanctity: 0.5, liberty: 0.7,
    };
    expect(totalFoundationScore(f)).toBeCloseTo(0.65, 5);
  });
});

describe('Phase V — Dual Process Judgment (Greene 2007)', () => {
  const trolley: MoralDilemma = {
    description: 'flip switch — 1 dies vs 5 dies', personalHarm: false,
    lives_saved_if_act: 5, lives_lost_if_act: 1,
  };
  const footbridge: MoralDilemma = {
    description: 'push person off — 1 dies vs 5 dies', personalHarm: true,
    lives_saved_if_act: 5, lives_lost_if_act: 1,
  };

  it('non-personal trolley → utilitarian permissible', () => {
    const j = judgeDilemma(trolley, 0.5);
    expect(j.judgment).toBe('permissible');
    expect(j.reasoning).toBe('utilitarian');
  });

  it('personal footbridge → deontological forbidden (lower utilitarian weight)', () => {
    // 영역 영역 영역 영역 영역 영역 영역 영역 영역 → deontological 영역.
    const j = judgeDilemma(footbridge, 0.3);
    expect(j.judgment).toBe('forbidden');
    expect(j.reasoning).toBe('deontological');
  });

  it('영역 utilitarian weight → 영역 영역 영역 permissible', () => {
    const j = judgeDilemma(footbridge, 0.95);
    expect(j.judgment).toBe('permissible');
  });
});

describe('Phase V — Veil of Ignorance (Rawls 1971)', () => {
  it('영역 group 영역 좋은 결과 → fair', () => {
    const r = veilOfIgnoranceCheck(0.7, 0.6, 0.5);
    expect(r.fair).toBe(true);
  });

  it('영역 group 영역 영역 결과 → unfair', () => {
    const r = veilOfIgnoranceCheck(0.9, 0.1, 0.5);
    expect(r.fair).toBe(false);
    expect(r.minimaxOutcome).toBe(0.1);
  });
});

describe('Phase V — Expanding Circle (Singer 1981)', () => {
  it('animals → level 5 (all sentient)', () => {
    expect(moralInclusion(['animals', 'family'])).toBe(5);
  });

  it('humanity → level 4', () => {
    expect(moralInclusion(['all humans'])).toBe(4);
  });

  it('family → level 1', () => {
    expect(moralInclusion(['family'])).toBe(1);
  });

  it('empty → level 0 (self)', () => {
    expect(moralInclusion([])).toBe(0);
  });
});

describe('Phase V — 통합 시나리오: trolley problem with stages', () => {
  it('moral progression — preconv 영역 영역 영역 영역 영역 self-interest → postconv 영역 utilitarian', () => {
    const preconvStage = stageLevel('preconventional_self_interest');
    const postconvStage = stageLevel('postconventional_social_contract');
    expect(postconvStage).toBeGreaterThan(preconvStage);

    const trolley: MoralDilemma = {
      description: 'trolley', personalHarm: false,
      lives_saved_if_act: 5, lives_lost_if_act: 1,
    };
    const j = judgeDilemma(trolley, 0.7); // utilitarian-leaning
    expect(j.judgment).toBe('permissible');
  });
});
