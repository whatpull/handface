// MediaPipe HandLandmarker 래퍼 — 카메라 스트림에서 21 landmarks 실시간 추출.
// 사용: const tracker = new HandTracker(); await tracker.start(videoEl, onFrame);

import type { HandLandmarks } from './landmark';

const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const VISION_WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';

export interface HandFrame {
  landmarks: HandLandmarks | null;  // null = 손 미감지
  timestamp: number;
}

export class HandTracker {
  private landmarker: import('@mediapipe/tasks-vision').HandLandmarker | null = null;
  private rafId: number | null = null;
  private running = false;
  private lastVideoTime = -1;

  async init(): Promise<void> {
    if (this.landmarker) return;
    const { FilesetResolver, HandLandmarker } = await import('@mediapipe/tasks-vision');
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
