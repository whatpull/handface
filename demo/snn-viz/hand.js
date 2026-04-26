/**
 * Hand layer — 21 landmark dot + skeleton lines (MediaPipe HandLandmarker 표준 connections).
 * Source: control.handLandmarks getter, RAF 갱신 (state.handLandmarks 가 60fps 갱신).
 */
import { state } from './state.js';

// MediaPipe HandLandmarker 표준 21-keypoint connections
const HAND_CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],            // thumb
  [0,5],[5,6],[6,7],[7,8],            // index
  [5,9],[9,10],[10,11],[11,12],       // middle
  [9,13],[13,14],[14,15],[15,16],     // ring
  [13,17],[17,18],[18,19],[19,20],    // pinky
  [0,17],                              // palm edge
];

let canvas = null;
let ctx = null;
let rafId = null;
let resizeListener = null;

export function mountHand(layerBody) {
  canvas = document.createElement('canvas');
  canvas.className = 'snn-hand-canvas';
  layerBody.appendChild(canvas);

  resizeCanvas();
  resizeListener = () => resizeCanvas();
  window.addEventListener('resize', resizeListener);

  startRAF();
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
}

function startRAF() {
  const tick = () => {
    drawHand();
    rafId = requestAnimationFrame(tick);
  };
  tick();
}

// 손별 색 (감지 순서)
const HAND_COLORS = [
  { line: 'rgba(120, 180, 255, 0.65)', dot: '#FBBF24' },
  { line: 'rgba(196, 181, 253, 0.65)', dot: '#F472B6' },
];

function drawHand() {
  if (!ctx || !canvas) return;
  if (canvas.width === 0 || canvas.height === 0) {
    resizeCanvas();
    if (canvas.width === 0 || canvas.height === 0) return;
  }
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  ctx.clearRect(0, 0, w, h);

  // 양손 우선, 단일 hand fallback
  const allHands = state.handLandmarksAll;
  const hands = (Array.isArray(allHands) && allHands.length > 0)
    ? allHands
    : (state.handLandmarks ? [state.handLandmarks] : []);

  if (hands.length === 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('no hand detected', w / 2, h / 2);
    return;
  }

  // Mirror x (사용자 시점)
  const mx = (lm) => (1 - lm.x) * w;
  const my = (lm) => lm.y * h;

  for (let i = 0; i < hands.length; i++) {
    const landmarks = hands[i];
    if (!landmarks || landmarks.length < 21) continue;
    const color = HAND_COLORS[i % HAND_COLORS.length];

    // skeleton lines
    ctx.strokeStyle = color.line;
    ctx.lineWidth = 1.5;
    for (const [a, b] of HAND_CONNECTIONS) {
      if (!landmarks[a] || !landmarks[b]) continue;
      ctx.beginPath();
      ctx.moveTo(mx(landmarks[a]), my(landmarks[a]));
      ctx.lineTo(mx(landmarks[b]), my(landmarks[b]));
      ctx.stroke();
    }

    // dots
    ctx.fillStyle = color.dot;
    for (let j = 0; j < 21; j++) {
      const lm = landmarks[j];
      if (!lm) continue;
      ctx.beginPath();
      ctx.arc(mx(lm), my(lm), 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
