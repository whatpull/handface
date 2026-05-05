// MediaPipe dual-tracker — HandLandmarker (입력 신호) + GestureRecognizer (정답 신호).
//
// 사용자 명시 design (세션 37 N3):
//   - HandLandmarker 의 21 landmarks → 16-dim feature → SNN 입력
//   - GestureRecognizer 의 gesture label → supervised STDP 의 target_out (teacher)
// 둘 다 동시 실행. GPU 부하 ↑ 단 의도 정합 mandatory.
//
// Built-in gestures (GestureRecognizer): None / Closed_Fist / Open_Palm /
//   Pointing_Up / Thumb_Down / Thumb_Up / Victory / ILoveYou
//
// NOTE: @mediapipe/tasks-vision 은 vision_bundle.mjs 안에 동적 require 가 있어
// Turbopack/webpack 가 정적 분석 실패. 우회: new Function() 동적 import.

import type { HandLandmarks } from './landmark';

const HAND_MODEL_URL    = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const GESTURE_MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task';
const VISION_WASM       = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const VISION_ESM_URL    = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';

export interface HandFrame {
  landmarks: HandLandmarks | null;       // null = 손 미감지
  gestureName: string | null;            // 예: 'Pointing_Up' / 'None' / null
  gestureScore: number;                  // 0..1 confidence
  timestamp: number;
}

type VisionModule = typeof import('@mediapipe/tasks-vision');
let visionPromise: Promise<VisionModule> | null = null;
function loadVision(): Promise<VisionModule> {
  if (visionPromise) return visionPromise;
  const dynImport = new Function('url', 'return import(url)') as (u: string) => Promise<VisionModule>;
  visionPromise = dynImport(VISION_ESM_URL);
  return visionPromise;
}

export class HandTracker {
  private landmarker: import('@mediapipe/tasks-vision').HandLandmarker | null = null;
  private recognizer: import('@mediapipe/tasks-vision').GestureRecognizer | null = null;
  private rafId: number | null = null;
  private running = false;
  private lastVideoTime = -1;

  async init(): Promise<void> {
    if (this.landmarker && this.recognizer) return;
    const { FilesetResolver, HandLandmarker, GestureRecognizer } = await loadVision();
    const fileset = await FilesetResolver.forVisionTasks(VISION_WASM);
    if (!this.landmarker) {
      this.landmarker = await HandLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: HAND_MODEL_URL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        numHands: 1,
      });
    }
    if (!this.recognizer) {
      this.recognizer = await GestureRecognizer.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: GESTURE_MODEL_URL, delegate: 'GPU' },
        runningMode: 'VIDEO',
        numHands: 1,
      });
    }
  }

  async start(video: HTMLVideoElement, onFrame: (f: HandFrame) => void): Promise<void> {
    await this.init();
    if (!this.landmarker || !this.recognizer) throw new Error('tracker init failed');
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      if (!video.videoWidth || video.readyState < 2) {
        this.rafId = requestAnimationFrame(loop);
        return;
      }
      if (video.currentTime !== this.lastVideoTime) {
        this.lastVideoTime = video.currentTime;
        const ts = performance.now();
        const lmRes = this.landmarker!.detectForVideo(video, ts);
        const grRes = this.recognizer!.recognizeForVideo(video, ts);
        const lms = lmRes.landmarks?.[0] || null;
        const g = grRes.gestures?.[0]?.[0];
        onFrame({
          landmarks: lms,
          gestureName: g?.categoryName ?? null,
          gestureScore: g?.score ?? 0,
          timestamp: ts,
        });
      }
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  dispose(): void {
    this.stop();
    if (this.landmarker) {
      try { this.landmarker.close(); } catch { /* noop */ }
      this.landmarker = null;
    }
    if (this.recognizer) {
      try { this.recognizer.close(); } catch { /* noop */ }
      this.recognizer = null;
    }
  }
}

export async function requestCameraStream(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480, facingMode: 'user' },
    audio: false,
  });
}
