// CameraInput — manual-trigger paradigm (사용자 catch 2026-05-10).
//
// 직전 paradigm (PR-K, 2026-05-09): hand-feature event 영역 stable-pose
// (5 frame + conf >= 0.6 + GESTURE_LABEL_TO_CLUSTER mappable) 영역 자동
// triggerWithVigilance 호출 — auto-learn + ART expansion.
//
// 신규 paradigm (manual-trigger, 2026-05-10): hand-feature event 영역
// setPattern (worker buffer mirror) only — 학습 / 추론 trigger 0. 추론
// button click 영역만 lastFeatureRef 영역 마지막 sharpened feature 영역
// triggerWithVigilance 호출. 사용자 명시 mental model 정합.
//
// C1: hand-feature N frame → setPattern N회, triggerWithVigilance 0회.
// C2: 추론 button click → triggerWithVigilance 1회 (lastFeature 영역 호출).
// C3: hasHand=false → setPattern zero reset → button click 영역 warning
//     (lastFeature null) → triggerWithVigilance 0회.
// C4: cameraConnected=false → button disabled.
// C5: conf 무관 — gestureScore 0.5/0.8 영역 무관 setPattern 동일 / button
//     click 영역 동일 trigger.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';

// ── live-snn mock ──
const mockSetPattern = vi.fn();
const mockTriggerOnce = vi.fn(async () => ({ saveFailed: false }));
const mockReinforce = vi.fn(async () => ({ saveFailed: false }));
let mockTrialTokenSeq = 0;
const mockTriggerAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));
const mockReinforceAsync = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));
const mockTriggerWithVigilance = vi.fn(() => ({ trialToken: ++mockTrialTokenSeq }));

vi.mock('@/lib/snn/live-snn', () => ({
  getLiveSnn: vi.fn(() => ({
    setPattern: mockSetPattern,
    triggerOnce: mockTriggerOnce,
    reinforce: mockReinforce,
    triggerAsync: mockTriggerAsync,
    reinforceAsync: mockReinforceAsync,
    triggerWithVigilance: mockTriggerWithVigilance,
  })),
  onLiveTick: vi.fn(() => () => undefined),
}));

// ── engine-mode mock — 'live' 영역 default. ──
const mockUseEngineMode = vi.fn<() => [string, ReturnType<typeof vi.fn>]>(() => ['live', vi.fn()]);
vi.mock('@/lib/snn/engine-mode', () => ({
  useEngineMode: () => mockUseEngineMode(),
}));

// ── feature-encoder mock — sharpenForGesture identity. ──
vi.mock('@/lib/mediapipe/feature-encoder', () => ({
  GESTURE_CLUSTER_ACTIVE_INPUTS: [[0], [1], [2], [3]],
  sharpenForGesture: (f: number[]) => f.slice(),
}));

// ── backend events mock — onBackendEvent 영역 listener capture. ──
type Listener = (detail: unknown) => void;
const listeners: Map<string, Listener[]> = new Map();
vi.mock('@/lib/backend/events', () => ({
  emitBackendEvent: vi.fn(),
  onBackendEvent: vi.fn((evt: string, l: Listener) => {
    const arr = listeners.get(evt) ?? [];
    arr.push(l);
    listeners.set(evt, arr);
    return () => {
      const cur = listeners.get(evt) ?? [];
      const i = cur.indexOf(l);
      if (i >= 0) cur.splice(i, 1);
    };
  }),
}));

// ── backend client mock ──
vi.mock('@/lib/backend/client', () => ({
  getClient: vi.fn(() => ({
    presetOrientation: vi.fn(async () => ({ ok: true, data: {} })),
    clusterTrainRStdp: vi.fn(async () => ({ ok: true, data: { correct: 0, trained: 0 } })),
    injectPattern: vi.fn(async () => ({ ok: true, data: { winner_cluster: null } })),
  })),
}));

// ── PipelineEventContext mock — usePipelineEvents 영역 isAutoLearning false. ──
vi.mock('@/components/snn/pipeline/PipelineEventContext', () => ({
  usePipelineEvents: () => ({ isAutoLearning: false }),
}));

import CameraInput from '@/components/snn/pipeline/CameraInput';

function emitHandFeature(detail: {
  hasHand: boolean;
  gestureName?: string | null;
  gestureScore?: number;
  feature?: number[];
}) {
  const ls = listeners.get('hand-feature') ?? [];
  for (const l of ls) {
    l({
      feature: detail.feature ?? new Array(16).fill(0).map((_, i) => (i === 0 ? 1 : 0)),
      raw: new Array(16).fill(0),
      hasHand: detail.hasHand,
      gestureName: detail.gestureName ?? null,
      gestureScore: detail.gestureScore ?? 0,
    });
  }
}

describe('CameraInput — manual-trigger paradigm (Live mode)', () => {
  beforeEach(() => {
    mockSetPattern.mockClear();
    mockTriggerOnce.mockClear();
    mockReinforce.mockClear();
    mockTriggerAsync.mockClear();
    mockReinforceAsync.mockClear();
    mockTriggerWithVigilance.mockClear();
    mockTrialTokenSeq = 0;
    listeners.clear();
    mockUseEngineMode.mockReturnValue(['live', vi.fn()]);
  });

  afterEach(() => {
    cleanup();
    listeners.clear();
  });

  it('C1: hand-feature N frame → setPattern N회 + triggerWithVigilance 0회 (no auto trigger)', () => {
    render(<CameraInput cameraConnected={true} />);
    // 10 frame Pointing_Up — 직전 paradigm 영역 5 frame 영역 자동 trigger 영역
    // 신규 paradigm 영역 setPattern only.
    for (let i = 0; i < 10; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.8 });
    }
    expect(mockSetPattern).toHaveBeenCalledTimes(10);
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
    expect(mockTriggerAsync).not.toHaveBeenCalled();
    expect(mockTriggerOnce).not.toHaveBeenCalled();
  });

  it('C2: 추론 button click → triggerWithVigilance 1회 (lastFeature snapshot)', () => {
    render(<CameraInput cameraConnected={true} />);
    // hand-feature 1 frame — lastFeatureRef populate.
    emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.8 });
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
    // 추론 button click — manual trigger.
    const btn = screen.getByRole('button', { name: /추론/ });
    fireEvent.click(btn);
    expect(mockTriggerWithVigilance).toHaveBeenCalledTimes(1);
    expect(mockTriggerWithVigilance).toHaveBeenCalledWith(expect.any(Array), 0.15);
  });

  it('C3: hasHand=false → setPattern zero reset → button click 영역 warning (no trigger)', () => {
    render(<CameraInput cameraConnected={true} />);
    // hand 사라짐 — lastFeatureRef null reset.
    emitHandFeature({ hasHand: false });
    // setPattern 영역 zero array 영역 호출.
    expect(mockSetPattern).toHaveBeenCalledTimes(1);
    expect(mockSetPattern).toHaveBeenLastCalledWith(new Array(16).fill(0));
    // 추론 button click → lastFeature null → warning + trigger 0.
    const btn = screen.getByRole('button', { name: /추론/ });
    fireEvent.click(btn);
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
  });

  it('C4: cameraConnected=false → 추론 button disabled', () => {
    render(<CameraInput cameraConnected={false} />);
    const btn = screen.getByRole('button', { name: /추론/ }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    fireEvent.click(btn);
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
  });

  it('C5: conf 무관 — setPattern 매 frame + button click 영역 동일 trigger', () => {
    render(<CameraInput cameraConnected={true} />);
    // gestureScore 0.5 (직전 threshold 미만) — setPattern 영역 conf gating 무관.
    for (let i = 0; i < 5; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.5 });
    }
    expect(mockSetPattern).toHaveBeenCalledTimes(5);
    expect(mockTriggerWithVigilance).not.toHaveBeenCalled();
    // button click — conf 무관 trigger.
    const btn = screen.getByRole('button', { name: /추론/ });
    fireEvent.click(btn);
    expect(mockTriggerWithVigilance).toHaveBeenCalledTimes(1);
  });
});
