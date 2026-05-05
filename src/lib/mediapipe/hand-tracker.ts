// MediaPipe HandLandmarker 래퍼 — 카메라 스트림에서 21 landmarks 실시간 추출.
// 사용: const tracker = new HandTracker(); await tracker.start(videoEl, onFrame);
//
// NOTE: @mediapipe/tasks-vision 은 vision_bundle.mjs 안에 동적 require 가 있어
// Turbopack/webpack 가 정적 분석 실패 ("Module not found: Can't resolve <dynamic>").
// 우회: new Function() 으로 동적 import 를 번들러 분석 밖에서 실행 → CDN ESM 직접 로드.

import type { HandLandmarks } from './landmark';

const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const VISION_WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const VISION_ESM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs';

export interface HandFrame {
  landmarks: HandLandmarks | null;  // null = 손 미감지
  timestamp: number;
}

// 번들러가 분석하지 못하도록 Function 으로 dynamic import 우회.
// 결과: 번들에 MediaPipe 코드 0, 런타임 CDN 에서 첫 호출 시 1회 fetch.
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
  private rafId: number | null = null;
  private running = false;
  private lastVideoTime = -1;

  async init(): Promise<void> {
    if (this.landmarker) return;
    const { FilesetResolver, HandLandmarker } = await loadVision();
    const fileset = await FilesetResolver.forVisionTasks(VISION_WASM);
    this.landmarker = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
      runningMode: 'VIDEO',
      numHands: 1,
    });
  }

  // video element 가 ready 상태에서 detect loop 시작.
  // 매 frame onFrame(landmarks | null) 호출.
  async start(video: HTMLVideoElement, onFrame: (f: HandFrame) => void): Promise<void> {
    await this.init();
    if (!this.landmarker) throw new Error('HandLandmarker init failed');
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      if (!video.videoWidth || video.readyState < 2) {
        this.rafId = requestAnimationFrame(loop);
        return;
      }
      // MediaPipe 가 같은 timestamp 면 skip 함 → 변동 보장.
      if (video.currentTime !== this.lastVideoTime) {
        this.lastVideoTime = video.currentTime;
        const ts = performance.now();
        const result = this.landmarker!.detectForVideo(video, ts);
        const lms = result.landmarks?.[0] || null;
        onFrame({ landmarks: lms, timestamp: ts });
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
  }
}

// 카메라 권한 요청 + MediaStream 반환.
export async function requestCameraStream(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480, facingMode: 'user' },
    audio: false,
  });
}
