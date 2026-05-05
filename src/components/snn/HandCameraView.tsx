'use client';

import { useEffect, useRef, useState } from 'react';
import { HandTracker, requestCameraStream, type HandFrame } from '@/lib/mediapipe/hand-tracker';
import type { HandLandmarks } from '@/lib/mediapipe/landmark';

interface HandCameraViewProps {
  active: boolean;
  onFrame?: (frame: HandFrame) => void;
  onError?: (msg: string) => void;
}

// MediaPipe Hand connection 인덱스 — 21 landmarks 사이 line.
const CONNECTIONS: Array<[number, number]> = [
  // thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // index
  [0, 5], [5, 6], [6, 7], [7, 8],
  // middle
  [5, 9], [9, 10], [10, 11], [11, 12],
  // ring
  [9, 13], [13, 14], [14, 15], [15, 16],
  // pinky
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

export default function HandCameraView({ active, onFrame, onError }: HandCameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackerRef = useRef<HandTracker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<'idle' | 'starting' | 'live' | 'error'>('idle');

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    (async () => {
      setStatus('starting');
      try {
        const stream = await requestCameraStream();
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (!video) return;
        video.srcObject = stream;
        await video.play();

        const tracker = new HandTracker();
        trackerRef.current = tracker;
        await tracker.start(video, (frame) => {
          if (cancelled) return;
          drawSkeleton(canvas, frame.landmarks);
          onFrame?.(frame);
        });
        setStatus('live');
      } catch (e) {
        const msg = (e as Error).message || 'camera error';
        setStatus('error');
        onError?.(msg);
      }
    })();

    return () => {
      cancelled = true;
      trackerRef.current?.dispose();
      trackerRef.current = null;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      if (video) video.srcObject = null;
      setStatus('idle');
    };
  }, [active, onFrame, onError]);

  return (
    <div className="relative h-[180px] w-[240px] overflow-hidden rounded border border-white/10 bg-black">
      <video
        ref={videoRef}
        playsInline
        muted
        className="snn-camera-mirror absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="snn-camera-mirror absolute inset-0 h-full w-full"
      />
      <div className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
        {status === 'starting' && 'starting…'}
        {status === 'live' && '● live'}
        {status === 'error' && '✗ error'}
        {status === 'idle' && 'idle'}
      </div>
    </div>
  );
}

function drawSkeleton(canvas: HTMLCanvasElement | null, lms: HandLandmarks | null) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!lms) return;
  const W = canvas.width;
  const H = canvas.height;

  // connections
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.85)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (const [a, b] of CONNECTIONS) {
    const la = lms[a]; const lb = lms[b];
    if (!la || !lb) continue;
    ctx.moveTo(la.x * W, la.y * H);
    ctx.lineTo(lb.x * W, lb.y * H);
  }
  ctx.stroke();

  // landmarks
  ctx.fillStyle = '#5eead4';
  for (const lm of lms) {
    if (!lm) continue;
    ctx.beginPath();
    ctx.arc(lm.x * W, lm.y * H, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
