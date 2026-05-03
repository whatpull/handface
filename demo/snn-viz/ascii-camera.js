/**
 * ASCII camera (vanilla JS) — cam-preview <video> 를 60×32 ASCII cell 로 변환,
 * cyan→coral region gradient overlay 위에 multiply blend.
 *
 * 의존성 0 (aalib/rxjs 제거됨). 직접 RAF loop + drawImage + getImageData.
 *
 * 동작:
 *   1. videoEl → 내부 hidden sample canvas (60×32, willReadFrequently)
 *   2. drawImage(video, 0, 0, 60, 32) — video frame downscale
 *   3. getImageData → Uint8ClampedArray, pixel 별 brightness (NTSC 가중)
 *   4. brightness → charset index (' ' / '·' / ':' / '•')
 *   5. 출력 canvas 에 fillText 로 cell 별 grid 그리기
 *
 * <video> 자체는 살려둠 (mediapipe HandControl 자체 hidden video 사용, cam-preview 와 무관).
 */

// Session 38: 해상도 살짝 ↑ + ramp 6단계 (이전 4단계 → 더 부드러운 gradient).
// 인버트/감마 X — 원래 brightness 직접 매핑 유지 (사용자 피드백 반영, 자연스러운 형태).
const COLS = 70;
const ROWS = 38;
// bright → dense char 순 (원래 방식). 6단계 부드러운 gradient.
const CHARSET = [' ', '.', '·', ':', '+', '#'];

let rafId = null;
let asciiCanvas = null;
let overlayDiv = null;
let sampleCanvas = null;
let sampleCtx = null;
let outCtx = null;
let videoRef = null;
let mountObserver = null;

export function initAsciiCamera({ videoEl, mountEl }) {
  if (!videoEl || !mountEl) {
    console.warn('[ascii-camera] videoEl or mountEl missing');
    return;
  }
  // Idempotent: 이전 인스턴스 정리
  disposeAsciiCamera();

  videoRef = videoEl;

  // 출력 canvas (visible)
  asciiCanvas = document.createElement('canvas');
  asciiCanvas.className = 'snn-ascii-canvas';
  mountEl.appendChild(asciiCanvas);
  outCtx = asciiCanvas.getContext('2d');

  // gradient overlay (cyan → coral, multiply blend)
  overlayDiv = document.createElement('div');
  overlayDiv.className = 'snn-ascii-overlay';
  mountEl.appendChild(overlayDiv);

  // 내부 sample canvas (60×32, willReadFrequently)
  sampleCanvas = document.createElement('canvas');
  sampleCanvas.width = COLS;
  sampleCanvas.height = ROWS;
  sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });

  // 출력 canvas 크기 sync (mount 영역 변경 대응)
  resizeOutputCanvas();
  if (typeof ResizeObserver !== 'undefined') {
    mountObserver = new ResizeObserver(() => resizeOutputCanvas());
    mountObserver.observe(mountEl);
  }

  // RAF loop
  startLoop();
}

function resizeOutputCanvas() {
  if (!asciiCanvas) return;
  const rect = asciiCanvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  if (asciiCanvas.width !== w || asciiCanvas.height !== h) {
    asciiCanvas.width = w;
    asciiCanvas.height = h;
  }
}

function startLoop() {
  const tick = () => {
    drawFrame();
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function drawFrame() {
  if (!videoRef || !sampleCtx || !outCtx || !asciiCanvas) return;
  // Video ready 체크
  if (videoRef.readyState < 2) return;
  if (!videoRef.videoWidth || !videoRef.videoHeight) return;

  // 1. video → sample canvas (60×32 downscale, cover semantics)
  // panel aspect-ratio 와 video aspect-ratio mismatch 시 source 를 panel 비율로 crop —
  // letterbox 회피 (object-fit: cover 와 동일 효과를 drawImage 9-arg form 으로 달성).
  const vw = videoRef.videoWidth;
  const vh = videoRef.videoHeight;
  const targetAR = asciiCanvas.width / asciiCanvas.height;  // panel ratio (1/1 등)
  const vAR = vw / vh;
  let sx, sy, sw, sh;
  if (vAR > targetAR) {
    // video 가 더 넓음 → 좌우 crop
    sh = vh; sw = vh * targetAR; sx = (vw - sw) / 2; sy = 0;
  } else if (vAR < targetAR) {
    // video 가 더 좁음 → 상하 crop
    sw = vw; sh = vw / targetAR; sx = 0; sy = (vh - sh) / 2;
  } else {
    sx = 0; sy = 0; sw = vw; sh = vh;
  }
  // 좌우 mirror (사용자 시점) — scaleX(-1) effect via translate + scale
  sampleCtx.save();
  sampleCtx.translate(COLS, 0);
  sampleCtx.scale(-1, 1);
  sampleCtx.drawImage(videoRef, sx, sy, sw, sh, 0, 0, COLS, ROWS);
  sampleCtx.restore();

  // 2. read pixel data
  let imageData;
  try {
    imageData = sampleCtx.getImageData(0, 0, COLS, ROWS);
  } catch (e) {
    return;
  }
  const data = imageData.data;

  // 3. clear output
  const w = asciiCanvas.width;
  const h = asciiCanvas.height;
  outCtx.clearRect(0, 0, w, h);

  const cellW = w / COLS;
  const cellH = h / ROWS;
  const fontSize = Math.max(6, Math.round(cellH));
  outCtx.font = `${fontSize}px "Roboto Mono", ui-monospace, monospace`;
  outCtx.fillStyle = '#ffffff';
  outCtx.textBaseline = 'top';
  outCtx.textAlign = 'center';

  // brightness → ramp idx (원래 방식 — 밝을수록 dense char).
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = (r * COLS + c) * 4;
      const brightness = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
      let idx = Math.floor((brightness / 256) * CHARSET.length);
      if (idx < 0) idx = 0;
      else if (idx >= CHARSET.length) idx = CHARSET.length - 1;
      const ch = CHARSET[idx];
      if (ch === ' ') continue;
      outCtx.fillText(ch, c * cellW + cellW / 2, r * cellH);
    }
  }
}

export function disposeAsciiCamera() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (mountObserver) {
    try { mountObserver.disconnect(); } catch (e) { /* ignore */ }
    mountObserver = null;
  }
  if (asciiCanvas && asciiCanvas.parentNode) {
    asciiCanvas.parentNode.removeChild(asciiCanvas);
  }
  if (overlayDiv && overlayDiv.parentNode) {
    overlayDiv.parentNode.removeChild(overlayDiv);
  }
  asciiCanvas = null;
  overlayDiv = null;
  sampleCanvas = null;
  sampleCtx = null;
  outCtx = null;
  videoRef = null;
}
