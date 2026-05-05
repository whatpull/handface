'use client';

import { useEffect } from 'react';
import { HandTracker, requestCameraStream, type HandFrame } from '@/lib/mediapipe/hand-tracker';
import type { HandLandmarks } from '@/lib/mediapipe/landmark';
import {
  encodeLandmarks, FeatureSmoother, FEATURE_DIM, FEATURE_LABELS,
} from '@/lib/mediapipe/feature-encoder';
import { emitBackendEvent } from '@/lib/backend/events';

interface HandTrackerHostProps {
  active: boolean;
  onFrame?: (f: HandFrame) => void;
  onError?: (msg: string) => void;
}

const CONNECTIONS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

// 비시각 컴포넌트 — src_camera 노드 안에 mount 된 #snn-cam-video / #snn-cam-skel 을
// DOM 으로 직접 찾아서 카메라 stream 부착 + MediaPipe HandTracker 시작.
export default function HandTrackerHost({ active, onFrame, onError }: HandTrackerHostProps) {
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let stream: MediaStream | null = null;
    let tracker: HandTracker | null = null;
    // DOM 이 mount 될 때까지 대기 (Canvas remount + drawflow node 생성 시점 다름).
    const waitForMount = (selector: string, ms = 5000) =>
      new Promise<HTMLElement | null>((resolve) => {
        const start = performance.now();
        const tick = () => {
          if (cancelled) return resolve(null);
          const el = document.querySelector(selector) as HTMLElement | null;
          if (el) return resolve(el);
          if (performance.now() - start > ms) return resolve(null);
          requestAnimationFrame(tick);
        };
        tick();
      });

    (async () => {
      const video = (await waitForMount('#snn-cam-video')) as HTMLVideoElement | null;
      const skel = (await waitForMount('#snn-cam-skel')) as HTMLCanvasElement | null;
      // Gesture 노드 mount 폴링 (className — drawflow 가 ID 일부 strip 가능성 회피).
      const featBars = (await waitForMount('.snn-feat-bars')) as HTMLElement | null;
      const empty = document.getElementById('snn-cam-empty');
      if (cancelled || !video || !skel) return;

      // 16-dim 막대 그래프 element 캐시 + 라벨 tooltip 부여.
      let barFills: HTMLElement[] = featBars
        ? Array.from(featBars.querySelectorAll<HTMLElement>('.snn-feat-bar'))
        : [];
      barFills.forEach((bar, i) => {
        bar.title = FEATURE_LABELS[i] || `feat ${i}`;
      });
      const smoother = new FeatureSmoother();

      try {
        stream = await requestCameraStream();
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        video.srcObject = stream;
        await video.play();
        if (empty) empty.style.display = 'none';

        tracker = new HandTracker();
        await tracker.start(video, (frame) => {
          if (cancelled) return;
          drawSkeleton(skel, frame.landmarks);
          // Gesture 노드 lazy lookup — mount 가 늦게 되거나 view 전환으로 stale 한 경우.
          if (barFills.length === 0) {
            const fb = document.querySelector<HTMLElement>('.snn-feat-bars');
            if (fb) {
              barFills = Array.from(fb.querySelectorAll<HTMLElement>('.snn-feat-bar'));
              barFills.forEach((bar, i) => { bar.title = FEATURE_LABELS[i] || `feat ${i}`; });
            }
          }
          if (frame.landmarks) {
            const raw = encodeLandmarks(frame.landmarks);
            const smoothed = smoother.push(raw);
            updateFeatureBars(barFills, smoothed);
            emitBackendEvent('hand-feature', {
              feature: smoothed, raw, hasHand: true,
              gestureName: frame.gestureName,
              gestureScore: frame.gestureScore,
            });
          } else {
            smoother.reset();
            // 손 미감지 — 막대 0 으로 초기화.
            for (const bar of barFills) {
              const fill = bar.querySelector<HTMLElement>('.snn-feat-bar-fill');
              if (fill) fill.style.height = '0%';
            }
            emitBackendEvent('hand-feature', {
              feature: new Array(FEATURE_DIM).fill(0),
              raw: new Array(FEATURE_DIM).fill(0),
              hasHand: false,
              gestureName: null,
              gestureScore: 0,
            });
          }
          onFrame?.(frame);
        });
      } catch (e) {
        const msg = (e as Error).message || 'camera error';
        onError?.(msg);
      }
    })();

    return () => {
      cancelled = true;
      tracker?.dispose();
      stream?.getTracks().forEach((t) => t.stop());
      // mount 측 정리 — placeholder 복원 + 막대 0 으로 reset.
      const empty = document.getElementById('snn-cam-empty');
      if (empty) empty.style.display = '';
      const v = document.getElementById('snn-cam-video') as HTMLVideoElement | null;
      if (v) v.srcObject = null;
      const s = document.getElementById('snn-cam-skel') as HTMLCanvasElement | null;
      if (s) {
        const ctx = s.getContext('2d');
        ctx?.clearRect(0, 0, s.width, s.height);
      }
      // gesture 막대 모두 0% 로.
      document.querySelectorAll<HTMLElement>('.snn-feat-bar-fill')
        .forEach((el) => { el.style.height = '0%'; });
    };
  }, [active, onFrame, onError]);

  return null;
}

function updateFeatureBars(bars: HTMLElement[], feat: number[]) {
  for (let i = 0; i < bars.length && i < feat.length; i += 1) {
    const fill = bars[i].querySelector<HTMLElement>('.snn-feat-bar-fill');
    if (fill) {
      const pct = Math.max(0, Math.min(1, feat[i])) * 100;
      fill.style.height = `${pct}%`;
    }
  }
}

function drawSkeleton(canvas: HTMLCanvasElement, lms: HandLandmarks | null) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!lms) return;
  const W = canvas.width, H = canvas.height;
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.85)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (const [a, b] of CONNECTIONS) {
    const la = lms[a], lb = lms[b];
    if (!la || !lb) continue;
    ctx.moveTo(la.x * W, la.y * H);
    ctx.lineTo(lb.x * W, lb.y * H);
  }
  ctx.stroke();
  ctx.fillStyle = '#c4b5fd';
  for (const lm of lms) {
    if (!lm) continue;
    ctx.beginPath();
    ctx.arc(lm.x * W, lm.y * H, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
