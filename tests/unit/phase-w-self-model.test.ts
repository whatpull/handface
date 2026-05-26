// Phase W — Self-Recognition 단위 테스트.

import { describe, it, expect } from 'vitest';
import {
  isSelf, mirrorTest, selfAwarenessLevel, attributeAgency,
  createSelfModel, updateBodyPart, addBelief, selfModelCoherence,
  type AgentIdentifier, type SelfAwarenessLevel,
} from '@/lib/snn-runtime/self-model';

const me: AgentIdentifier = {
  id: 'agent1',
  ownMotorPattern: [1, 0.8, 0.5, 0.2, 0],
  ownVoicePattern: [0.5, 0.5, 0.5],
};

describe('Phase W — Self vs Other Distinction', () => {
  it('영역 영역 영역 → self', () => {
    expect(isSelf([1, 0.8, 0.5, 0.2, 0], me)).toBe(true);
  });

  it('영역 영역 영역 → other', () => {
    expect(isSelf([0, 0, 0, 1, 1], me)).toBe(false);
  });

  it('empty pattern → false', () => {
    expect(isSelf([], me)).toBe(false);
  });
});

describe('Phase W — Mirror Test (Gallup 1970)', () => {
  it('reflection + mark touched → pass', () => {
    const r = mirrorTest(true, true, 0.9);
    expect(r.passed).toBe(true);
    expect(r.selfRecognitionConfidence).toBe(0.9);
  });

  it('reflection match but no mark touch → fail (partial)', () => {
    const r = mirrorTest(true, false, 0.8);
    expect(r.passed).toBe(false);
    expect(r.selfRecognitionConfidence).toBe(0.4);
  });

  it('no reflection → fail', () => {
    const r = mirrorTest(false, false, 0);
    expect(r.passed).toBe(false);
  });
});

describe('Phase W — Self-Awareness Levels (Lewis 1990)', () => {
  it('level ordering', () => {
    const levels: SelfAwarenessLevel[] = [
      'no_self_awareness', 'differentiation', 'situation',
      'identification', 'permanence', 'self_consciousness',
    ];
    for (let i = 0; i < levels.length - 1; i += 1) {
      expect(selfAwarenessLevel(levels[i])).toBeLessThan(selfAwarenessLevel(levels[i + 1]));
    }
  });
});

describe('Phase W — Agency Attribution (Frith 1992)', () => {
  it('정확한 prediction → self-caused', () => {
    const r = attributeAgency([1, 2, 3], [1, 2, 3]);
    expect(r.isSelfCaused).toBe(true);
    expect(r.predictionError).toBe(0);
  });

  it('영역 prediction error → not self', () => {
    const r = attributeAgency([0, 0, 0], [1, 1, 1]);
    expect(r.isSelfCaused).toBe(false);
    expect(r.predictionError).toBe(1);
  });

  it('length mismatch → not self', () => {
    expect(attributeAgency([1], [1, 2]).isSelfCaused).toBe(false);
  });
});

describe('Phase W — Self-Model (Metzinger 2003)', () => {
  it('createSelfModel → empty initial', () => {
    const model = createSelfModel();
    expect(model.bodyMap.size).toBe(0);
    expect(model.beliefs.size).toBe(0);
  });

  it('updateBodyPart + addBelief', () => {
    let model = createSelfModel();
    model = updateBodyPart(model, 'hand_left', [1, 2, 3]);
    model = addBelief(model, 'I_can_grasp', true);
    expect(model.bodyMap.get('hand_left')).toEqual([1, 2, 3]);
    expect(model.beliefs.get('I_can_grasp')).toBe(true);
  });

  it('selfModelCoherence — empty 영역 영역', () => {
    expect(selfModelCoherence(createSelfModel())).toBe(0);
  });

  it('영역 영역 영역 → coherence ↑', () => {
    let model = createSelfModel();
    for (let i = 0; i < 10; i += 1) {
      model = updateBodyPart(model, `part_${i}`, [i, i, i]);
      model = addBelief(model, `belief_${i}`, true);
    }
    expect(selfModelCoherence(model)).toBeGreaterThan(0.5);
  });
});

describe('Phase W — 통합 시나리오: full self-recognition development', () => {
  it('mirror test pass + self model + agency attribution', () => {
    // 영역 영역 영역 자기 영역 영역.
    const me_pattern = [0.9, 0.7, 0.3];
    expect(isSelf(me_pattern, {
      id: 'me', ownMotorPattern: [0.9, 0.7, 0.3], ownVoicePattern: [],
    })).toBe(true);

    // Mirror test pass.
    expect(mirrorTest(true, true, 0.95).passed).toBe(true);

    // Self model.
    let model = createSelfModel();
    model = updateBodyPart(model, 'face', [0, 0, 0]);
    model = addBelief(model, 'I_exist', true);
    expect(model.beliefs.get('I_exist')).toBe(true);

    // Agency.
    const agency = attributeAgency([1, 1, 1], [1, 1, 1.05]);
    expect(agency.isSelfCaused).toBe(true);
  });
});
