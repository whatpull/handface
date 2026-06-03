// MediaPipe HandLandmarker wrapper (Phase 3.1, 2026-06-03).
//
// 영역 (정직 한계):
//   - webcam 영역 사용자 permission 영역 (mobile / desktop). deny 시 graceful
//     fallback — error 영역 caller 영역 throw.
//   - HandLandmarker model 영역 첫 호출 시 약 5-10MB 다운로드 (CDN 영역 fetch).
//     영역 호출 영역 cache.
//   - SSR (Next.js server) 영역 영역 — 영역 dynamic import 영역 client side
//     영역 영역 사용 mandatory.
//   - jsdom (vitest test env) 영역 webcam / WASM 영역 안 됨 — test 영역
//     mock 처리 (별도 path).
//
// 학술 정합:
//   - MediaPipe Hands (Google Research 2020) — 21 landmark × 3 coords (x, y, z)
//     영역 webcam frame 영역 hand pose detection.
//   - HandLandmarker model: `hand_landmarker.task` (float16 quantized, ~3MB).
//
// 사용 path:
//   const lm = await createHandLandmarker();
//   const result = await lm.detect(videoElement);
//   if (result.landmarks.length > 0) {
//     const landmarks21 = result.landmarks[0]; // first hand
//     // → hand-spike-encoder 영역 75-dim feature 영역 변환
//   }
//
// Phase 3.2 영역 NodeInput Camera Mode tab + camera input UI 영역 hookup 영역.

import type { HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';

// MediaPipe CDN — Google 공식 host. version 영역 stable channel.
const MEDIAPIPE_WASM_BASE_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm';

const HAND_LANDMARKER_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

// HandLandmark = 21 keypoints (Google Research 명세):
//   0: wrist
//   1-4: thumb (CMC, MCP, IP, TIP)
//   5-8: index (MCP, PIP, DIP, TIP)
//   9-12: middle (MCP, PIP, DIP, TIP)
//   13-16: ring (MCP, PIP, DIP, TIP)
//   17-20: pinky (MCP, PIP, DIP, TIP)
export interface HandLandmark {
  x: number; // normalized [0, 1] — image width
  y: number; // normalized [0, 1] — image height
  z: number; // depth (negative = closer to camera)
}

export interface HandDetectionResult {
  landmarks: HandLandmark[][];   // per-hand 21 landmarks (영역 1-2 hands 가능)
  handedness: Array<'Left' | 'Right'>;
  timestamp: number;
}

let _cachedLandmarker: HandLandmarker | null = null;
let _initPromise: Promise<HandLandmarker> | null = null;

/**
 * HandLandmarker 영역 영역 instantiate (lazy + cached).
 *
 * 직전 호출 영역 동일 instance 영역 return. SSR 영역 미사용 — caller 영역
 * client-side mount 영역 영역 영역 호출.
 *
 * @throws 모델 다운로드 실패 / WASM init 실패 / browser 영역 영역 영역 환경.
 */
export async function createHandLandmarker(): Promise<HandLandmarker> {
  if (_cachedLandmarker) return _cachedLandmarker;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    if (typeof window === 'undefined') {
      throw new Error('createHandLandmarker: browser 영역 영역 호출 mandatory (SSR 영역 미지원).');
    }

    // Dynamic import — Next.js bundle 영역 client-side chunk 분리.
    const { FilesetResolver, HandLandmarker: HandLandmarkerCtor } = await import(
      '@mediapipe/tasks-vision'
    );

    const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_BASE_URL);
    const landmarker = await HandLandmarkerCtor.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: HAND_LANDMARKER_MODEL_URL,
        delegate: 'GPU', // GPU 영역 영역 영역 CPU fallback (MediaPipe 자동 처리)
      },
      runningMode: 'VIDEO',
      numHands: 1, // Phase 3 영역 첫 영역 1 hand only — 영역 hand multi-tracking 영역 별도 cycle
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    _cachedLandmarker = landmarker;
    return landmarker;
  })();

  return _initPromise;
}

/**
 * webcam frame 영역 hand landmarks 영역 추출.
 *
 * @param video HTMLVideoElement (webcam stream attached)
 * @param landmarker createHandLandmarker() 영역 영역 instance
 * @param timestampMs frame timestamp (영역 영역 영역 영역 monotonic increment)
 * @returns null if no hand detected, else { landmarks, handedness }
 */
export function detectLandmarks(
  video: HTMLVideoElement,
  landmarker: HandLandmarker,
  timestampMs: number,
): HandDetectionResult | null {
  if (video.readyState < 2) return null; // video 영역 영역 영역 영역 — skip

  const result: HandLandmarkerResult = landmarker.detectForVideo(video, timestampMs);

  if (!result.landmarks || result.landmarks.length === 0) return null;

  return {
    landmarks: result.landmarks.map((handLandmarks) =>
      handLandmarks.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z })),
    ),
    handedness: result.handedness.map((h) => {
      const cat = h[0]?.categoryName;
      return cat === 'Left' || cat === 'Right' ? cat : 'Right';
    }),
    timestamp: timestampMs,
  };
}

/**
 * webcam stream 영역 video element 영역 attach.
 *
 * 사용자 permission 영역 영역 — deny 시 throw.
 *
 * @throws Permission deny / 영역 device 영역
 */
export async function attachWebcamToVideo(video: HTMLVideoElement): Promise<MediaStream> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
    throw new Error('attachWebcamToVideo: 이 browser 영역 webcam 영역 영역 영역 영역 영역.');
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
      facingMode: 'user',
    },
    audio: false,
  });

  video.srcObject = stream;
  await video.play();
  return stream;
}

/**
 * 영역 cached HandLandmarker 영역 dispose.
 *
 * 영역 substrate 영역 switch 영역 영역 cleanup path 영역 영역 영역.
 */
export function disposeHandLandmarker(): void {
  if (_cachedLandmarker) {
    _cachedLandmarker.close();
    _cachedLandmarker = null;
  }
  _initPromise = null;
}

/**
 * 영역 stream 영역 사용 영역 영역 — webcam stream 영역 video element 영역 영역.
 */
export function stopWebcamStream(stream: MediaStream | null): void {
  if (!stream) return;
  for (const track of stream.getTracks()) {
    track.stop();
  }
}
