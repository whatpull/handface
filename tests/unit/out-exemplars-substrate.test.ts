// out-exemplars — substrate prefix split 검증 (Fix 1).
//
// 사용자 catch 2026-05-09 [1]: "그리드에서 추론한 결과가 카메라 INPUT을 바꿔도
// 유지되는 현상". root cause — 단일 KEY 영역 GRID/CAMERA cluster count 영역
// carry-over. 본 정정: KEY_PREFIX + substrate suffix 영역 별도 store 분리.
//
// 본 test 영역 jsdom localStorage 영역 별도 store + migration path 검증.
//
// S1: orientation incrementCount → orientation store 만 영향, gesture 0.
// S2: gesture incrementCount → gesture store 만 영향, orientation 0.
// S3: setExemplarLabel — substrate isolation.
// S4: subscribeExemplars — substrate-specific event delivery.
// S5: clearExemplars — substrate isolation (다른 substrate 영역 보존).
// S6: legacy KEY migration — orientation 영역 default hydrate, gesture fresh.
// S7: migration 영역 1회 idempotent (재호출 영역 noop).

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  clearExemplars,
  incrementCount,
  loadExemplars,
  setExemplarLabel,
  subscribeExemplars,
} from '@/lib/snn/out-exemplars';

const LEGACY_KEY = 'handface.out.exemplars.v1';
const MIGRATION_KEY = 'handface.migration.out-exemplars-substrate-split.v1';
const ORIENTATION_KEY = 'handface.out.exemplars.v1.orientation';
const GESTURE_KEY = 'handface.out.exemplars.v1.gesture';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('out-exemplars — substrate isolation (Fix 1)', () => {
  it('S1: orientation incrementCount → orientation store 만 영향', () => {
    incrementCount('out_0_0', 'orientation', [1, 0, 0]);
    const o = loadExemplars('orientation');
    const g = loadExemplars('gesture');
    expect(o['out_0_0']?.count).toBe(1);
    expect(g['out_0_0']).toBeUndefined();
  });

  it('S2: gesture incrementCount → gesture store 만 영향', () => {
    incrementCount('out_1_0', 'gesture', [0, 1]);
    const o = loadExemplars('orientation');
    const g = loadExemplars('gesture');
    expect(g['out_1_0']?.count).toBe(1);
    expect(o['out_1_0']).toBeUndefined();
  });

  it('S3: setExemplarLabel — substrate isolation', () => {
    setExemplarLabel('out_2_0', 'orientation', 'horizontal');
    setExemplarLabel('out_2_0', 'gesture', 'open palm');
    const o = loadExemplars('orientation');
    const g = loadExemplars('gesture');
    expect(o['out_2_0']?.label).toBe('horizontal');
    expect(g['out_2_0']?.label).toBe('open palm');
  });

  it('S4: subscribeExemplars — substrate-specific event delivery', () => {
    const orientationEvents: number[] = [];
    const gestureEvents: number[] = [];
    const offO = subscribeExemplars('orientation', (m) => {
      orientationEvents.push(Object.keys(m).length);
    });
    const offG = subscribeExemplars('gesture', (m) => {
      gestureEvents.push(Object.keys(m).length);
    });
    incrementCount('out_0_0', 'orientation');
    expect(orientationEvents).toHaveLength(1);
    expect(gestureEvents).toHaveLength(0);
    incrementCount('out_1_0', 'gesture');
    expect(orientationEvents).toHaveLength(1);
    expect(gestureEvents).toHaveLength(1);
    offO();
    offG();
  });

  it('S5: clearExemplars — substrate isolation (다른 substrate 영역 보존)', () => {
    incrementCount('out_0_0', 'orientation');
    incrementCount('out_1_0', 'gesture');
    clearExemplars('orientation');
    const o = loadExemplars('orientation');
    const g = loadExemplars('gesture');
    expect(Object.keys(o)).toHaveLength(0);
    expect(g['out_1_0']?.count).toBe(1);
  });

  it('S6: legacy KEY migration — orientation 영역 default hydrate', () => {
    // 직전 단일 KEY (substrate 미분리) 영역 사용자 학습 영역 보존 simulate.
    const legacyData = {
      out_0_0: { count: 5, lastFeature: [1, 0], lastAt: 1000, label: 'horizontal' },
      out_1_0: { count: 3, lastFeature: [0, 1], lastAt: 1100, label: null },
    };
    localStorage.setItem(LEGACY_KEY, JSON.stringify(legacyData));
    expect(localStorage.getItem(MIGRATION_KEY)).toBeNull();
    // loadExemplars 영역 첫 호출 영역 migration 영역 trigger.
    const o = loadExemplars('orientation');
    expect(o['out_0_0']?.count).toBe(5);
    expect(o['out_0_0']?.label).toBe('horizontal');
    expect(o['out_1_0']?.count).toBe(3);
    // legacy KEY 영역 폐기.
    expect(localStorage.getItem(LEGACY_KEY)).toBeNull();
    // gesture 영역 fresh empty.
    const g = loadExemplars('gesture');
    expect(Object.keys(g)).toHaveLength(0);
    // migration mark 영역 set.
    expect(localStorage.getItem(MIGRATION_KEY)).toBe('done');
  });

  it('S7: migration 영역 1회 idempotent (재호출 영역 noop)', () => {
    const legacyData = { out_0_0: { count: 5, lastFeature: [], lastAt: 0, label: null } };
    localStorage.setItem(LEGACY_KEY, JSON.stringify(legacyData));
    loadExemplars('orientation');
    expect(localStorage.getItem(MIGRATION_KEY)).toBe('done');

    // 사용자 영역 새 학습 영역 incrementCount → orientation count=6.
    incrementCount('out_0_0', 'orientation');
    expect(loadExemplars('orientation')['out_0_0']?.count).toBe(6);

    // 직전 legacy KEY 영역 재 set (제 3 자 직접 set 영역 simulate) 시점 영역
    // migration 영역 재실행 0 (mark 영역 이미 done) — orientation store 영역
    // 새 학습 영역 보존.
    localStorage.setItem(LEGACY_KEY, JSON.stringify({ out_0_0: { count: 999, lastFeature: [], lastAt: 0, label: null } }));
    const o = loadExemplars('orientation');
    expect(o['out_0_0']?.count).toBe(6); // 새 학습 영역 보존, legacy 999 영역 무시.
    // legacy KEY 영역 그대로 (migration 영역 noop).
    expect(localStorage.getItem(LEGACY_KEY)).not.toBeNull();
  });

  it('S8: orientation/gesture 영역 별도 store key 영역 catch', () => {
    incrementCount('out_0_0', 'orientation');
    incrementCount('out_0_0', 'gesture');
    expect(localStorage.getItem(ORIENTATION_KEY)).not.toBeNull();
    expect(localStorage.getItem(GESTURE_KEY)).not.toBeNull();
    // 직전 단일 KEY 영역 polluted 0 (migration 영역 mark 영역 set 후 영역 noop).
    expect(localStorage.getItem(LEGACY_KEY)).toBeNull();
  });
});
