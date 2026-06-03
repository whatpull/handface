'use client';

// CameraInput — Hand SNN 영역 webcam input + landmark detection 시각화
// (Phase 3.2, 2026-06-03).
//
// 정직 한계:
//   - SSR 영역 webcam / MediaPipe WASM 영역 미지원 → 'use client' mandatory.
//   - 직전 Phase 3.1 영역 landmarker library setup 완료 — 본 컴포넌트 영역
//     webcam preview + landmark visualization 영역 시각화.
//   - 학습 trigger (orientation-hand substrate 영역 영역 영역) 영역 Phase 3.4
//     영역 영역 — 본 cycle 영역 webcam + landmark 시각화 영역.
//   - 사용자 webcam permission deny 영역 graceful fallback (안내 message).
//
// 사용자 view:
//   webcam 영역 video preview + 21 landmarks (점 + 영역 영역 영역 연결)
//   ↓
//   "이 자세 학습" button (Phase 3.4 영역 활성화)

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  attachWebcamToVideo,
  createHandLandmarker,
  detectLandmarks,
  disposeHandLandmarker,
  stopWebcamStream,
  type HandLandmark,
} from '@/lib/hand-tracking/landmarker';
import { encodeHandToFeatureVector } from '@/lib/snn-runtime/hand-spike-encoder';
import { getLiveSnn } from '@/lib/snn/live-snn';

type CameraStatus =
  | { kind: 'idle' }
  | { kind: 'initializing' }
  | { kind: 'ready' }
  | { kind: 'error'; message: string };

// 21-keypoint 영역 finger 영역 영역 영역 line 영역 영역 영역 시각화.
const FINGER_CONNECTIONS: ReadonlyArray<readonly [number, number]> = [
  // Thumb: wrist → CMC → MCP → IP → TIP
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index: wrist → MCP → PIP → DIP → TIP
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle: MCP → PIP → DIP → TIP (wrist 영역 영역 — 영역 영역 영역 영역 영역)
  [5, 9], [9, 10], [10, 11], [11, 12],
  // Ring: MCP → PIP → DIP → TIP
  [9, 13], [13, 14], [14, 15], [15, 16],
  // Pinky: wrist → MCP → PIP → DIP → TIP
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

export default function CameraInput() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameTsRef = useRef<number>(0);

  const [status, setStatus] = useState<CameraStatus>({ kind: 'idle' });
  const [handDetected, setHandDetected] = useState<boolean>(false);
  // Phase 3.4: 학습 trigger 영역 마지막 landmarks 영역 ref 영역 보존 (button click 시 사용).
  const latestLandmarksRef = useRef<HandLandmark[] | null>(null);
  const [triggerStatus, setTriggerStatus] = useState<string | null>(null);

  // 영역 frame loop — RAF 영역 영역 frame 영역 landmark detection + canvas 시각화.
  const startDetectionLoop = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const landmarker = await createHandLandmarker();

    const loop = () => {
      if (!videoRef.current || !canvasRef.current) return;
      const v = videoRef.current;
      const c = canvasRef.current;
      const ctx = c.getContext('2d');
      if (!ctx) return;

      // canvas 영역 video 영역 영역 영역 영역 영역.
      if (c.width !== v.videoWidth || c.height !== v.videoHeight) {
        c.width = v.videoWidth || 640;
        c.height = v.videoHeight || 480;
      }

      // landmark detection.
      const ts = performance.now();
      if (ts - lastFrameTsRef.current > 30) { // 30ms throttle (~33fps max)
        lastFrameTsRef.current = ts;
        const result = detectLandmarks(v, landmarker, ts);

        // canvas 영역 영역.
        ctx.clearRect(0, 0, c.width, c.height);

        if (result && result.landmarks.length > 0) {
          setHandDetected(true);
          const hand: HandLandmark[] = result.landmarks[0];
          latestLandmarksRef.current = hand;
          drawLandmarks(ctx, hand, c.width, c.height);
        } else {
          setHandDetected(false);
          latestLandmarksRef.current = null;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const triggerLearn = useCallback((): void => {
    const landmarks = latestLandmarksRef.current;
    if (!landmarks || landmarks.length !== 21) {
      setTriggerStatus('⚠ landmarks 미감지');
      return;
    }
    try {
      // Phase 3.4: hand landmarks (21 × {x,y,z}) → encodeHandToFeatureVector
      // → 95-dim feature vector → triggerWithVigilance (n16_hand substrate 정합).
      const featureVec = encodeHandToFeatureVector(landmarks);
      const live = getLiveSnn();
      const { trialToken } = live.triggerWithVigilance(featureVec, 1.0);
      setTriggerStatus(`✓ 학습 trigger 완료 (token ${trialToken})`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setTriggerStatus(`✗ 학습 trigger 실패: ${msg}`);
    }
  }, []);

  const initialize = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setStatus({ kind: 'initializing' });
    try {
      const stream = await attachWebcamToVideo(video);
      streamRef.current = stream;
      await startDetectionLoop();
      setStatus({ kind: 'ready' });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: msg });
    }
  }, [startDetectionLoop]);

  useEffect(() => {
    // mount 시 영역 영역 영역 — 사용자 명시 click 영역 활성 (privacy 정합).
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      stopWebcamStream(streamRef.current);
      streamRef.current = null;
      disposeHandLandmarker();
    };
  }, []);

  return (
    <div className="snn-camera-input">
      <div className="snn-camera-preview">
        <video ref={videoRef} muted playsInline className="snn-camera-video" />
        <canvas ref={canvasRef} className="snn-camera-overlay" />
        {status.kind === 'idle' && (
          <div className="snn-camera-overlay-msg">
            <button
              type="button"
              className="snn-camera-start-btn"
              onClick={initialize}
            >
              카메라 시작 (webcam permission 필요)
            </button>
          </div>
        )}
        {status.kind === 'initializing' && (
          <div className="snn-camera-overlay-msg">
            <span>초기화 중... MediaPipe 모델 로딩 (약 5-10초)</span>
          </div>
        )}
        {status.kind === 'error' && (
          <div className="snn-camera-overlay-msg snn-camera-error">
            <strong>카메라 사용 불가</strong>
            <small>{status.message}</small>
          </div>
        )}
      </div>

      <div className="snn-camera-status">
        {status.kind === 'ready' && (
          <span className={handDetected ? 'snn-camera-detected' : 'snn-camera-undetected'}>
            {handDetected ? '✓ Hand 감지됨 — 21 landmarks 추적 중' : '⚠ Hand 미감지 — 화면 안에 손을 보여주세요'}
          </span>
        )}
      </div>

      <div className="snn-camera-trigger">
        <button
          type="button"
          className="snn-camera-trigger-btn"
          disabled={status.kind !== 'ready' || !handDetected}
          onClick={triggerLearn}
        >
          이 자세 학습 / 인식
        </button>
        {triggerStatus && <small className="snn-camera-trigger-msg">{triggerStatus}</small>}
      </div>
    </div>
  );
}

function drawLandmarks(
  ctx: CanvasRenderingContext2D,
  hand: HandLandmark[],
  w: number,
  h: number,
): void {
  // Connection line — 흰색 반투명.
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 2;
  for (const [a, b] of FINGER_CONNECTIONS) {
    const la = hand[a];
    const lb = hand[b];
    if (!la || !lb) continue;
    ctx.beginPath();
    ctx.moveTo(la.x * w, la.y * h);
    ctx.lineTo(lb.x * w, lb.y * h);
    ctx.stroke();
  }

  // Keypoint — 보라색 점.
  ctx.fillStyle = '#a78bfa';
  for (const lm of hand) {
    ctx.beginPath();
    ctx.arc(lm.x * w, lm.y * h, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}
