// MediaPipe HandLandmarker wrapper (Phase 3.1, 2026-06-03).
//
// 정직 한계:
//   - webcam 은 사용자 permission 필수 (mobile / desktop). deny 시 caller 로
//     error throw — graceful fallback 은 caller 책임.
//   - HandLandmarker model 은 첫 호출 시 약 5-10MB 다운로드 (CDN fetch),
//     이후 호출은 module-level cache 사용.
//   - SSR (Next.js server) 에서는 동작 불가 — caller 가 dynamic import +
//     client-side mount 시점에 호출 mandatory.
//   - jsdom (vitest test env) 에서는 webcam / WASM 미지원 — 테스트는 별도
//     mock path 로 처리.
//
// 학술 정합:
//   - MediaPipe Hands (Google Research 2020) — 21 landmark × 3 coords (x, y, z)
//     를 webcam frame 으로부터 hand pose 로 추출.
//   - HandLandmarker model: `hand_landmarker.task` (float16 quantized, ~3MB).
//
// 사용 path:
//   const lm = await createHandLandmarker();
//   const result = await lm.detect(videoElement);
//   if (result.landmarks.length > 0) {
//     const landmarks21 = result.landmarks[0]; // first hand
//     // → hand-spike-encoder 로 95-dim feature 변환
//   }
//
// Phase 3.2 에서 NodeInput Camera Mode tab + camera input UI 가 hookup.

import type { HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';

// MediaPipe CDN — Google 공식 host. stable channel.
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
  landmarks: HandLandmark[][];   // per-hand 21 landmarks (1-2 hands 가능)
  handedness: Array<'Left' | 'Right'>;
  timestamp: number;
}

let _cachedLandmarker: HandLandmarker | null = null;
let _initPromise: Promise<HandLandmarker> | null = null;

/**
 * HandLandmarker instance 를 lazy + cached 로 생성.
 *
 * 두 번째 이후 호출은 동일 instance 반환. SSR 에서는 호출 불가 —
 * caller 가 client-side mount 시점에 호출 mandatory.
 *
 * @throws 모델 다운로드 실패 / WASM init 실패 / browser API 미지원 환경.
 */
export async function createHandLandmarker(): Promise<HandLandmarker> {
  if (_cachedLandmarker) return _cachedLandmarker;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    if (typeof window === 'undefined') {
      throw new Error('createHandLandmarker: browser 환경에서만 호출 mandatory (SSR 미지원).');
    }

    // Dynamic import — Next.js bundle 의 client-side chunk 로 분리.
    const { FilesetResolver, HandLandmarker: HandLandmarkerCtor } = await import(
      '@mediapipe/tasks-vision'
    );

    const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_BASE_URL);
    const landmarker = await HandLandmarkerCtor.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: HAND_LANDMARKER_MODEL_URL,
        delegate: 'GPU', // GPU 우선, 미지원 시 CPU fallback (MediaPipe 자동 처리)
      },
      runningMode: 'VIDEO',
      numHands: 1, // Phase 3 첫 cycle 은 1 hand only — multi-hand tracking 은 별도 cycle
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
 * webcam frame 에서 hand landmarks 를 추출.
 *
 * @param video HTMLVideoElement (webcam stream attached)
 * @param landmarker createHandLandmarker() 로 생성된 instance
 * @param timestampMs frame timestamp (monotonic increment 권장)
 * @returns null if no hand detected, else { landmarks, handedness }
 */
export function detectLandmarks(
  video: HTMLVideoElement,
  landmarker: HandLandmarker,
  timestampMs: number,
): HandDetectionResult | null {
  if (video.readyState < 2) return null; // video metadata 미준비 — skip

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
 * webcam stream 을 video element 에 attach.
 *
 * 사용자 permission 필수 — deny 시 throw.
 *
 * @throws Permission deny / 사용 가능한 device 없음
 */
export async function attachWebcamToVideo(video: HTMLVideoElement): Promise<MediaStream> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
    throw new Error('attachWebcamToVideo: 이 browser 는 webcam API 를 지원하지 않습니다.');
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
 * cached HandLandmarker 를 dispose.
 *
 * substrate switch 또는 unmount 시 cleanup path 로 호출.
 */
export function disposeHandLandmarker(): void {
  if (_cachedLandmarker) {
    _cachedLandmarker.close();
    _cachedLandmarker = null;
  }
  _initPromise = null;
}

/**
 * webcam stream 의 track 들을 stop — video element 에서 release.
 */
export function stopWebcamStream(stream: MediaStream | null): void {
  if (!stream) return;
  for (const track of stream.getTracks()) {
    track.stop();
  }
}
