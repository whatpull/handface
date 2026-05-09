// CameraInput — Live mode 영역 stable-gated 1-shot trigger (사용자 catch 2026-05-09 B).
//
// C1: stable cluster 영역 trigger 1회 (5 frame stable + conf >= 0.6 + mappable).
// C2: 같은 cluster stable × N → trigger 영역 1회만 (idempotent gate).
// C3: 다른 cluster stable → 새 trigger.
// C4: hasHand=false → reset → 같은 cluster 새 stable 영역 새 trigger.
// C5: conf < threshold → trigger 0 호출.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';

// ── live-snn mock ──
const mockSetPattern = vi.fn();
const mockTriggerOnce = vi.fn(async () => ({ saveFailed: false }));
const mockReinforce = vi.fn(async () => ({ saveFailed: false }));

vi.mock('@/lib/snn/live-snn', () => ({
  getLiveSnn: vi.fn(() => ({
    setPattern: mockSetPattern,
    triggerOnce: mockTriggerOnce,
    reinforce: mockReinforce,
  })),
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

describe('CameraInput — event-driven stable-gated trigger (Live mode)', () => {
  beforeEach(() => {
    mockSetPattern.mockClear();
    mockTriggerOnce.mockClear();
    mockReinforce.mockClear();
    listeners.clear();
    mockUseEngineMode.mockReturnValue(['live', vi.fn()]);
  });

  afterEach(() => {
    cleanup();
    listeners.clear();
  });

  it('C1: stable cluster — 5 frame + conf 0.8 + Pointing_Up → triggerOnce 1회', async () => {
    render(<CameraInput cameraConnected={true} />);
    // 5 frame Pointing_Up (cluster 0) — conf 0.8 (>= 0.6 threshold).
    for (let i = 0; i < 5; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.8 });
    }
    // setPattern 영역 매 frame 호출. triggerOnce 영역 5 frame stable 영역 1회만.
    expect(mockSetPattern).toHaveBeenCalledTimes(5);
    expect(mockTriggerOnce).toHaveBeenCalledTimes(1);
  });

  it('C2: 같은 cluster stable × 10 → triggerOnce 1회 (idempotent gate)', async () => {
    render(<CameraInput cameraConnected={true} />);
    for (let i = 0; i < 10; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.8 });
    }
    expect(mockTriggerOnce).toHaveBeenCalledTimes(1);
  });

  it('C3: 다른 cluster stable → 새 triggerOnce (Pointing_Up → Open_Palm)', async () => {
    render(<CameraInput cameraConnected={true} />);
    for (let i = 0; i < 5; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.8 });
    }
    expect(mockTriggerOnce).toHaveBeenCalledTimes(1);
    // 새 cluster 영역 5 frame stable.
    for (let i = 0; i < 5; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Open_Palm', gestureScore: 0.8 });
    }
    expect(mockTriggerOnce).toHaveBeenCalledTimes(2);
  });

  it('C4: hasHand=false → reset → 같은 cluster 새 stable 영역 새 trigger', async () => {
    render(<CameraInput cameraConnected={true} />);
    for (let i = 0; i < 5; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.8 });
    }
    expect(mockTriggerOnce).toHaveBeenCalledTimes(1);
    // hand 사라짐 — reset.
    emitHandFeature({ hasHand: false });
    // 같은 cluster 영역 다시 5 frame stable — gate reset 영역 새 trigger.
    for (let i = 0; i < 5; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.8 });
    }
    expect(mockTriggerOnce).toHaveBeenCalledTimes(2);
  });

  it('C5: conf < threshold (0.5) → trigger 0 호출', async () => {
    render(<CameraInput cameraConnected={true} />);
    for (let i = 0; i < 10; i += 1) {
      emitHandFeature({ hasHand: true, gestureName: 'Pointing_Up', gestureScore: 0.5 });
    }
    expect(mockTriggerOnce).not.toHaveBeenCalled();
    // setPattern 영역 매 frame 호출 (gate 영역 무관).
    expect(mockSetPattern).toHaveBeenCalledTimes(10);
  });
});
