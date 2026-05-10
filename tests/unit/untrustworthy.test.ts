// HIGH #5 regression — isUntrustworthy 단일 helper hoist (사용자 catch 2026-05-11).
//
// LEARN/INFER 영역 동일 호출 path — 두 노드 영역 모순 gate 영역 단일 source 정합.

import { describe, it, expect } from 'vitest';
import { isUntrustworthy } from '@/lib/snn/untrustworthy';

describe('isUntrustworthy — 단일 helper hoist (HIGH #5)', () => {
  it('initPhase=fresh + clusterLabelCount=0 + phase=null → true (학습 전 회로)', () => {
    expect(isUntrustworthy({
      initPhase: 'fresh',
      phaseName: null,
      clusterLabelCount: 0,
    })).toBe(true);
  });

  it('initPhase=hydrated → false (DB 영역 학습 영역 hydrate)', () => {
    expect(isUntrustworthy({
      initPhase: 'hydrated',
      phaseName: null,
      clusterLabelCount: 0,
    })).toBe(false);
  });

  it('clusterLabelCount > 0 → false (학습 사실 — exemplar 1+)', () => {
    expect(isUntrustworthy({
      initPhase: 'fresh',
      phaseName: null,
      clusterLabelCount: 1,
    })).toBe(false);
  });

  it('phase=trained → false (batch 학습 진행 후 fresh stale 회피)', () => {
    expect(isUntrustworthy({
      initPhase: 'fresh',
      phaseName: 'trained',
      clusterLabelCount: 0,
    })).toBe(false);
  });

  it('phase=untrained 영역 fresh 정합 path 영역 보존 → true', () => {
    expect(isUntrustworthy({
      initPhase: 'fresh',
      phaseName: 'untrained',
      clusterLabelCount: 0,
    })).toBe(true);
  });

  it('initPhase=null/undefined → false (initState 영역 미초기화 — Live 외)', () => {
    expect(isUntrustworthy({
      initPhase: null,
      phaseName: null,
      clusterLabelCount: 0,
    })).toBe(false);
    expect(isUntrustworthy({
      initPhase: undefined,
      phaseName: null,
      clusterLabelCount: 0,
    })).toBe(false);
  });

  it('LEARN/INFER 영역 동일 호출 — 정합 path 단일 source', () => {
    // LEARN 영역 phaseName=null (Live 영역 batch phase 미사용).
    const learnInputs = { initPhase: 'fresh' as const, phaseName: null, clusterLabelCount: 0 };
    // INFER 영역 phaseName='untrained' (training-phase event 미수신 영역 동등 catch).
    const inferInputs = { initPhase: 'fresh' as const, phaseName: 'untrained', clusterLabelCount: 0 };
    expect(isUntrustworthy(learnInputs)).toBe(isUntrustworthy(inferInputs));
    expect(isUntrustworthy(learnInputs)).toBe(true);
  });
});
