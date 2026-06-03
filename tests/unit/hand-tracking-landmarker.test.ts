// HandLandmarker wrapper unit test (Phase 3.1, 2026-06-03).
//
// 정직 한계 (jsdom):
//   - jsdom 영역 webcam (getUserMedia) / WASM 영역 미지원 → mock 처리.
//   - HandLandmarker 영역 actual model loading 영역 browser-only — mock instance
//     영역 영역 영역 동작 영역 unit test.
//   - 본 test 영역 mock layer 영역 wrapper 영역 type / 호출 path 영역 검증 영역.
//   - browser-side actual integration test 영역 Phase 3.2 (NodeInput UI) 영역
//     manual production verify.

import { afterEach, describe, expect, it, vi } from 'vitest';
import type { HandLandmarker } from '@mediapipe/tasks-vision';

// Mock @mediapipe/tasks-vision 영역 jsdom env 영역 actual WASM init 영역 회피.
const mockDetectForVideo = vi.fn();
const mockClose = vi.fn();
const mockHandLandmarker: HandLandmarker = {
  detectForVideo: mockDetectForVideo,
  close: mockClose,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

vi.mock('@mediapipe/tasks-vision', () => ({
  FilesetResolver: {
    forVisionTasks: vi.fn(async () => ({})),
  },
  HandLandmarker: {
    createFromOptions: vi.fn(async () => mockHandLandmarker),
  },
}));

import {
  createHandLandmarker,
  detectLandmarks,
  disposeHandLandmarker,
  type HandLandmark,
} from '@/lib/hand-tracking/landmarker';

afterEach(() => {
  mockDetectForVideo.mockClear();
  mockClose.mockClear();
  disposeHandLandmarker(); // cached instance 영역 reset
});

describe('hand-tracking landmarker', () => {
  it('L1: createHandLandmarker 영역 lazy + cached instance 영역 return', async () => {
    const lm1 = await createHandLandmarker();
    const lm2 = await createHandLandmarker();
    expect(lm1).toBe(lm2); // 동일 instance (cached)
  });

  it('L2: detectLandmarks — video readyState < 2 영역 null return (영역 영역 안 됨)', () => {
    const video = { readyState: 1 } as HTMLVideoElement;
    const result = detectLandmarks(video, mockHandLandmarker, 0);
    expect(result).toBeNull();
    expect(mockDetectForVideo).not.toHaveBeenCalled();
  });

  it('L3: detectLandmarks — landmarks 없음 영역 null return', () => {
    const video = { readyState: 4 } as HTMLVideoElement;
    mockDetectForVideo.mockReturnValueOnce({ landmarks: [], handedness: [] });
    const result = detectLandmarks(video, mockHandLandmarker, 100);
    expect(result).toBeNull();
  });

  it('L4: detectLandmarks — 1 hand 21 landmarks normalize 영역 return', () => {
    const video = { readyState: 4 } as HTMLVideoElement;
    const mock21Landmarks: HandLandmark[] = Array.from({ length: 21 }, (_, i) => ({
      x: i / 21,
      y: i / 21,
      z: -i / 100,
    }));
    mockDetectForVideo.mockReturnValueOnce({
      landmarks: [mock21Landmarks],
      handedness: [[{ categoryName: 'Right' }]],
    });
    const result = detectLandmarks(video, mockHandLandmarker, 200);
    expect(result).not.toBeNull();
    expect(result!.landmarks).toHaveLength(1);
    expect(result!.landmarks[0]).toHaveLength(21);
    expect(result!.handedness).toEqual(['Right']);
    expect(result!.timestamp).toBe(200);
  });

  it('L5: detectLandmarks — handedness 영역 영역 영역 시 영역 Right 영역 fallback', () => {
    const video = { readyState: 4 } as HTMLVideoElement;
    const mock21Landmarks: HandLandmark[] = Array.from({ length: 21 }, () => ({
      x: 0.5, y: 0.5, z: 0,
    }));
    mockDetectForVideo.mockReturnValueOnce({
      landmarks: [mock21Landmarks],
      handedness: [[]],
    });
    const result = detectLandmarks(video, mockHandLandmarker, 300);
    expect(result!.handedness).toEqual(['Right']); // fallback
  });

  it('L6: disposeHandLandmarker 영역 cached instance 영역 close + null', async () => {
    const lm1 = await createHandLandmarker();
    expect(lm1).toBeDefined();
    disposeHandLandmarker();
    expect(mockClose).toHaveBeenCalledTimes(1);
    // 영역 createHandLandmarker 호출 영역 영역 instance return
    const lm2 = await createHandLandmarker();
    expect(lm2).toBeDefined();
  });
});
