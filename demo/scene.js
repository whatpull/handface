import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import brainObjUrl from './brain.obj?url';
import { HandControl } from '../src/index.ts';
import { ClaudeAPIBackend } from './claude-backend.js';
import { WebLLMBackend } from './webllm-backend.js';
import { VoiceController } from './voice.js';

// ─────────────────────────────────────────
// Neural backend — provider에 따라 Gemini / Claude / Local 선택
// ─────────────────────────────────────────
const PROVIDER_STORAGE = 'handface-provider';   // 'gemini' | 'claude' | 'local'
const APIKEY_STORAGE   = 'handface-apikey';
const MODEL_STORAGE    = 'handface-model';

function createBackend() {
  const provider = localStorage.getItem(PROVIDER_STORAGE) || 'huggingface';
  const apiKey   = localStorage.getItem(APIKEY_STORAGE);
  const model    = localStorage.getItem(MODEL_STORAGE) || 'claude-haiku-4-5-20251001';

  if (provider === 'claude' && apiKey) return new ClaudeAPIBackend({ apiKey, model });
  return new WebLLMBackend();
}

let backend = createBackend();

// ─── DOM refs ───
const cursorEl  = document.getElementById('cursor');
const flashEl   = document.getElementById('flash');
const sStatus   = document.getElementById('s-status');
const sPosEl    = document.getElementById('s-pos');
const sClicksEl = document.getElementById('s-clicks');
const sZoomEl   = document.getElementById('s-zoom');
const logEl     = document.getElementById('log');
const startBtn  = document.getElementById('start-btn');
const loadMsg   = document.getElementById('load-msg');
const overlay   = document.getElementById('overlay');

function pushLog(cls, text) {
  const el = document.createElement('div');
  el.className = 'log-item' + (cls ? ` ${cls}` : '');
  const d = new Date();
  el.textContent = `[${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}] ${text}`;
  logEl.appendChild(el);
  while (logEl.children.length > 9) logEl.removeChild(logEl.children[1]);
}

// ─── Renderer ───
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x020408);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ─── Scene & Camera ───
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 1.0, 7.5);
camera.lookAt(0, 0, 0);
let targetCamZ = 7.5;
let camZ       = 7.5;

// ─── Network Group ───
const network = new THREE.Group();
scene.add(network);

// ─────────────────────────────────────────
// 원형 스프라이트 텍스처 (Points 머티리얼이 사각형이 아닌 원으로 렌더되도록)
// ─────────────────────────────────────────
function makeCircleSprite(softness = 0.55) {
  const s   = 64;
  const cv  = document.createElement('canvas');
  cv.width  = cv.height = s;
  const ctx = cv.getContext('2d');
  const grad = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
  grad.addColorStop(0.00, 'rgba(255,255,255,1)');
  grad.addColorStop(softness, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1.00, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter  = THREE.LinearFilter;
  tex.magFilter  = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}
const SPRITE_SOFT  = makeCircleSprite(0.50);  // 노드 헤일로용 (부드러운 원)
const SPRITE_SHARP = makeCircleSprite(0.30);  // 코어/스파크용 (선명한 원)

// ─────────────────────────────────────────
// 신경망 구조 — 옆모습 뇌 (Anatomical Brain)
//
// 좌표 컨벤션 (옆에서 본 모습):
//   X = 전후 길이 (front +, back −)         가장 긴 축
//   Y = 상하 높이 (top +, bottom −)         압축됨
//   Z = 좌우 폭 (좌반구 −, 우반구 +)        반구 간 균열
//
// 각 층은 동심 뇌 모양 셸이고, 엽 돌출 + 균열 + 표면 주름으로 형태가 잡힙니다.
// 카메라는 +Z 쪽에서 봐서 좌우 반구가 깊이 방향, 길이가 가로 방향에 보임.
// ─────────────────────────────────────────
// Transformer-like structure:
//   L0 Token Embedding     (outer — data enters from outside)
//   L1 Early Blocks 1-4
//   L2 Mid-Early Blocks 5-9
//   L3 Mid Blocks 10-18    (deepest processing, most nodes)
//   L4 Mid-Late Blocks 19-23
//   L5 Late Blocks 24-28
//   L6 Output Projection   (core — decision emerges)
const LAYER_SIZES = [14, 24, 36, 48, 36, 24, 14];        // 196 nodes, symmetric
const LAYER_RADII = [2.45, 2.10, 1.75, 1.40, 1.05, 0.70, 0.35];
const K_FORWARD   = 4;
const K_BACKWARD  = 3;
const K_INTRA     = 3;

// 3D pseudo-noise (유기적 주름 — 사인파보다 자연스러움)
function brainNoise(x, y, z) {
  return 0.50 * Math.sin(x*2.3 + y*3.7 + z*1.9 + Math.cos(y*1.3))
       + 0.25 * Math.sin(x*5.1 + y*7.3 + z*4.7 + Math.sin(z*2.1))
       + 0.13 * Math.sin(x*11.3 + y*13.7 + z*9.1)
       + 0.06 * Math.sin(x*23.7 + y*29.3 + z*19.9);
}

function brainShape(n, radius) {
  if (n === 1) return [new THREE.Vector3(0, 0, 0)];
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  const SX = 1.30;
  const SY = 0.78;
  const SZ = 1.02;
  const CLEFT = 0.14 * radius;

  for (let i = 0; i < n; i++) {
    const y0 = 1 - (i / (n - 1)) * 2;
    const r0 = Math.sqrt(Math.max(0, 1 - y0 * y0));
    const theta = phi * i;

    let nx = Math.cos(theta) * r0;
    const ny = y0;
    let nz = Math.sin(theta) * r0;

    // ── 기본 형태 변형 (구→뇌) ──
    // 아래쪽 평탄화 (뇌 밑면은 평평)
    let yScale = 1.0;
    if (ny < -0.25) yScale = 0.6 + 0.4 * ((ny + 1) / 0.75);
    // 위쪽 약간 넓게 (두정부 볼록)
    const topWiden = ny > 0 ? 1 + 0.08 * ny : 1;

    // ── 엽(lobe) 돌출 ──
    let bulge = 1.0;
    // 전두엽: 앞+위 — 크게
    if (nx > 0.2 && ny > -0.4) bulge += 0.25 * Math.max(0, nx-0.2) * (1.2 - Math.abs(ny));
    // 두정엽: 위 — 볼록
    if (ny > 0.35) bulge += 0.15 * (ny - 0.35);
    // 후두엽: 뒤+위 — 뾰족하게
    if (nx < -0.35 && ny > -0.3) bulge += 0.18 * Math.pow(Math.abs(nx) - 0.35, 0.7);
    // 측두엽: 양옆+아래 — 강하게 돌출
    if (Math.abs(nz) > 0.3 && ny < 0.15) bulge += 0.22 * (Math.abs(nz)-0.3) * (0.6-ny);
    // 소뇌: 뒤+아래 — 별도 돌출 (뇌 본체보다 아래)
    if (nx < -0.15 && ny < -0.3) {
      bulge += 0.35 * Math.max(0, Math.abs(nx+0.15) + Math.abs(ny+0.3) - 0.08);
    }

    // ── 주름 (3D noise — 유기적) ──
    const noiseScale = 6.0;
    const fold = 0.10 * brainNoise(nx*noiseScale, ny*noiseScale, nz*noiseScale);

    // 중심 열구 (위에서 가로)
    const cs = (Math.abs(nx) < 0.12 && ny > 0.1)
      ? -0.08 * (1 - Math.abs(nx)/0.12) * ny : 0;
    // 실비우스 열구 (측두엽 경계)
    const ls = (Math.abs(nz) > 0.25 && ny > -0.15 && ny < 0.25)
      ? -0.06 * Math.max(0, Math.abs(nz)-0.25) : 0;

    const fr = bulge * (1 + fold + cs + ls);

    let x = nx * radius * SX * fr * topWiden;
    let y = ny * radius * SY * fr * yScale;
    let z = nz * radius * SZ * fr * topWiden;

    z += (z >= 0 ? CLEFT : -CLEFT);

    // 유기적 jitter
    const j = radius * 0.11;
    x += (Math.random() - 0.5) * j;
    y += (Math.random() - 0.5) * j;
    z += (Math.random() - 0.5) * j;

    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

const layerData = LAYER_SIZES.map((count, li) =>
  brainShape(count, LAYER_RADII[li]).map((pos, localIdx) => ({
    pos,
    activation:       0,
    targetActivation: 0,
    layerIdx:         li,
    layerLocalIdx:    localIdx,
  })),
);

const allNodes = layerData.flat();

// ─── K-최근접 시냅스 엣지 (inter-layer + intra-layer, 중복 제거) ───
const edges    = [];
const edgeSet  = new Set();
const nodeIdx  = new Map();
allNodes.forEach((n, i) => nodeIdx.set(n, i));

function tryAddEdge(src, dst, intra) {
  const key = nodeIdx.get(src) * 100000 + nodeIdx.get(dst);
  if (edgeSet.has(key)) return;
  edgeSet.add(key);
  edges.push({
    src, dst, intra,
    weight:       0.12 + Math.random() * 0.88,
    targetWeight: 0.12 + Math.random() * 0.88,
  });
}

// Forward (inter-layer): 각 source → 다음 층의 K개 최근접 dst
for (let li = 0; li < LAYER_SIZES.length - 1; li++) {
  for (const src of layerData[li]) {
    layerData[li + 1]
      .map(dst => ({ dst, d: src.pos.distanceTo(dst.pos) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K_FORWARD)
      .forEach(({ dst }) => tryAddEdge(src, dst, false));
  }
}
// Backward (inter-layer): 각 dst ← 이전 층의 K개 최근접 src
for (let li = 1; li < LAYER_SIZES.length; li++) {
  for (const dst of layerData[li]) {
    layerData[li - 1]
      .map(src => ({ src, d: dst.pos.distanceTo(src.pos) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K_BACKWARD)
      .forEach(({ src }) => tryAddEdge(src, dst, false));
  }
}
// Intra-layer: 같은 층 내 K-NN (퍼지 볼 효과 — 신호 전파에는 영향 없음)
for (let li = 0; li < LAYER_SIZES.length; li++) {
  const layer = layerData[li];
  for (const src of layer) {
    layer
      .filter(n => n !== src)
      .map(dst => ({ dst, d: src.pos.distanceTo(dst.pos) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K_INTRA)
      .forEach(({ dst }) => tryAddEdge(src, dst, true));
  }
}

// 인접 리스트 (forward pass / spark 발사용 — O(1) lookup)
const incomingEdges = new Map();
const outgoingEdges = new Map();
for (const e of edges) {
  if (!incomingEdges.has(e.dst)) incomingEdges.set(e.dst, []);
  incomingEdges.get(e.dst).push(e);
  if (!outgoingEdges.has(e.src)) outgoingEdges.set(e.src, []);
  outgoingEdges.get(e.src).push(e);
}

// ─────────────────────────────────────────
// 뇌 외곽 와이어프레임 (참고 이미지처럼 뇌 실루엣이 보이도록)
// brainShape 비율을 그대로 가져온 변형 구체를 반투명 와이어로 표현
// ─────────────────────────────────────────
// ─── 뇌 외곽: 로컬 OBJ 모델 로드 ───
const brainWireMat = new THREE.MeshBasicMaterial({
  color: 0x3399FF, wireframe: true,
  blending: THREE.AdditiveBlending,
  transparent: true, opacity: 0.12, depthWrite: false,
});
const brainSolidMat = new THREE.MeshBasicMaterial({
  color: 0x2266CC,
  blending: THREE.AdditiveBlending,
  transparent: true, opacity: 0.035, depthWrite: false,
  side: THREE.DoubleSide,
});

(function loadBrainOBJ() {
  const loader = new OBJLoader();
  loader.load(brainObjUrl, (obj) => {
    // OBJ는 단위구 크기(R=1) → 네트워크 크기(~5)로 스케일
    const scale = 2.55;
    obj.scale.setScalar(scale);

    obj.traverse((node) => {
      if (node.isMesh) {
        node.material = brainSolidMat;
        // 와이어프레임 복사본 추가
        const wire = new THREE.Mesh(node.geometry, brainWireMat);
        wire.scale.copy(node.scale);
        wire.position.copy(node.position);
        wire.rotation.copy(node.rotation);
        obj.add(wire);
      }
    });

    network.add(obj);
    console.log('[handface] Brain OBJ loaded');
  }, undefined, (err) => {
    console.warn('[handface] Brain OBJ failed:', err.message);
  });
})();

// ─────────────────────────────────────────
// HUD 패널: Input Vector + Layer Weights
// ─────────────────────────────────────────
const inputGridEl = document.getElementById('input-grid');
inputGridEl.style.gridTemplateColumns = `repeat(${LAYER_SIZES[0]}, 1fr)`;
const inputCellFills = [];
const inputCellVals  = [];
for (let i = 0; i < LAYER_SIZES[0]; i++) {
  const cell = document.createElement('div');
  cell.className = 'input-cell';
  const fill = document.createElement('div');
  fill.className = 'input-cell-fill';
  const val  = document.createElement('div');
  val.className  = 'input-cell-val';
  val.textContent = '00';
  cell.appendChild(fill);
  cell.appendChild(val);
  inputGridEl.appendChild(cell);
  inputCellFills.push(fill);
  inputCellVals.push(val);
}

const weightListEl = document.getElementById('weight-list');
const weightRowEls = [];
for (let li = 1; li < LAYER_SIZES.length; li++) {
  const row = document.createElement('div');
  row.className = 'weight-row';
  row.innerHTML = `
    <span class="weight-label">L${li-1}→${li}</span>
    <div class="weight-bar"><div class="weight-fill"></div></div>
    <span class="weight-val">—</span>
  `;
  weightListEl.appendChild(row);
  weightRowEls.push({
    fill:     row.querySelector('.weight-fill'),
    val:      row.querySelector('.weight-val'),
    layerIdx: li,
  });
}

// ── Top-K next-char predictions panel ──
const predListEl = document.getElementById('pred-list');
const PRED_K = 8;
const predRowEls = [];
for (let i = 0; i < PRED_K; i++) {
  const row = document.createElement('div');
  row.className = 'pred-row';
  row.innerHTML = `
    <span class="pred-char">·</span>
    <div class="pred-bar"><div class="pred-fill"></div></div>
    <span class="pred-pct">—</span>
  `;
  predListEl.appendChild(row);
  predRowEls.push({
    char: row.querySelector('.pred-char'),
    fill: row.querySelector('.pred-fill'),
    pct:  row.querySelector('.pred-pct'),
  });
}

function updatePredictions() {
  const text = backend.history.length > 0
    ? backend.history[backend.history.length - 1].text
    : ' ';
  // forward pass on the last context
  const indices = backend.model.encode(text);
  const ctx = new Array(backend.model.CTX);
  for (let k = 0; k < backend.model.CTX; k++) {
    const pos = indices.length - backend.model.CTX + k;
    ctx[k] = pos >= 0 ? indices[pos] : 0;
  }
  backend.model.forward(ctx);

  const probs = backend.model.lastProbs;
  const V     = backend.model.vocab.size;
  const items = [];
  for (let i = 1; i < V; i++) {                  // skip PAD at 0
    const ch = backend.model.invVocab[i];
    if (!ch || ch === '\n') continue;             // hide structural tokens
    items.push({ ch, p: probs[i] });
  }
  items.sort((a, b) => b.p - a.p);

  for (let i = 0; i < PRED_K; i++) {
    const item = items[i];
    if (item) {
      const display = item.ch === ' ' ? '␣' : item.ch;
      predRowEls[i].char.textContent = display;
      predRowEls[i].fill.style.width = `${Math.round(item.p * 100)}%`;
      predRowEls[i].pct.textContent  = (item.p * 100).toFixed(1) + '%';
    } else {
      predRowEls[i].char.textContent = '·';
      predRowEls[i].fill.style.width = '0%';
      predRowEls[i].pct.textContent  = '—';
    }
  }
}

// ── Loss sparkline (canvas) ──
const lossSparkEl  = document.getElementById('loss-spark');
const lossSparkCtx = lossSparkEl.getContext('2d');
const lossHistory  = [];

function pushLossSample(loss) {
  if (!Number.isFinite(loss)) return;
  lossHistory.push(loss);
  if (lossHistory.length > 100) lossHistory.shift();
  drawLossSpark();
}

function drawLossSpark() {
  const w = lossSparkEl.width;
  const h = lossSparkEl.height;
  lossSparkCtx.clearRect(0, 0, w, h);
  if (lossHistory.length < 2) return;

  let maxL = -Infinity, minL = Infinity;
  for (const v of lossHistory) {
    if (v > maxL) maxL = v;
    if (v < minL) minL = v;
  }
  const range = Math.max(0.15, maxL - minL);

  // baseline (max value at top, min at bottom)
  lossSparkCtx.strokeStyle = 'rgba(255, 200, 80, 0.85)';
  lossSparkCtx.lineWidth = 1.2;
  lossSparkCtx.beginPath();
  for (let i = 0; i < lossHistory.length; i++) {
    const x = (i / Math.max(1, lossHistory.length - 1)) * (w - 1) + 0.5;
    // higher loss → top of sparkline
    const y = 1 + ((maxL - lossHistory[i]) / range) * (h - 2);
    if (i === 0) lossSparkCtx.moveTo(x, y);
    else         lossSparkCtx.lineTo(x, y);
  }
  lossSparkCtx.stroke();
}

// ─────────────────────────────────────────
// 채팅 UI (continual learning interface)
// ─────────────────────────────────────────
const chatMsgsEl     = document.getElementById('chat-msgs');
const chatInputEl    = document.getElementById('chat-input');
const chatSendEl     = document.getElementById('chat-send');
const chatResetEl    = document.getElementById('chat-reset');
const chatStatsEl    = document.getElementById('chat-stats');
const chatLossFillEl = document.getElementById('chat-loss-fill');

function appendChatMsg(role, text) {
  const el = document.createElement('div');
  el.className = `chat-msg ${role}`;
  const r = document.createElement('span');
  r.className = 'chat-msg-role';
  r.textContent = role;
  const t = document.createElement('span');
  t.className = 'chat-msg-text';
  t.textContent = ' ' + text;
  el.appendChild(r);
  el.appendChild(t);
  chatMsgsEl.appendChild(el);
  chatMsgsEl.scrollTop = chatMsgsEl.scrollHeight;
}

function updateChatStats() {
  const s = backend.stats;
  const lossStr = s.lossEMA != null ? s.lossEMA.toFixed(2) : '—';
  const tokenStr = s.tokenCount ? ` · tokens ${s.tokenCount}` : '';
  const memStr   = s.memories != null ? ` · mem ${s.memories}` : '';
  chatStatsEl.textContent = `steps ${s.totalSteps} · loss ${lossStr}${memStr}${tokenStr}`;
  if (s.lossEMA != null) {
    // 학습 진척도: loss가 낮을수록 바가 가득 (5.0 → 0% / 0.5 → 90%)
    const filled = Math.max(0, Math.min(1, 1 - s.lossEMA / 5));
    chatLossFillEl.style.width = `${Math.round(filled * 100)}%`;
  }
}

function bootstrapChat() {
  if (backend.history.length === 0) {
    appendChatMsg('sys', 'Type a message in English. The brain learns from your input.');
  } else {
    for (const m of backend.history) appendChatMsg(m.role, m.text);
  }
  updateChatStats();
}
bootstrapChat();

async function handleSend() {
  const text = chatInputEl.value.trim();
  if (!text || backend.busy) return;
  chatInputEl.value = '';
  chatSendEl.disabled = true;
  appendChatMsg('user', text);

  // thinking 즉시 표시 + 렌더링 중지
  showThinking();
  // 브라우저가 thinking을 실제 화면에 그릴 시간 확보
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  pushLog('', `💬 training (${text.length} chars)`);
  await backend.send(text);
  triggerPass(text);
  chatSendEl.disabled = false;
}

chatSendEl.addEventListener('click', handleSend);
chatInputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
});
chatResetEl.addEventListener('click', () => {
  if (!confirm('Reset model weights and memory?')) return;
  backend.reset();
  chatMsgsEl.innerHTML = '';
  bootstrapChat();
  syncEdgeWeightsFromModel();
  pushLog('', '🔄 model reset');
});

// ── Streaming chat message + TTS ──
let streamingMsgEl = null;
let wasStreaming    = false;
let ttsBuffer       = '';

function startStreamingMsg() {
  const el = document.createElement('div');
  el.className = 'chat-msg ai';
  const r = document.createElement('span');
  r.className = 'chat-msg-role';
  r.textContent = 'ai';
  const t = document.createElement('span');
  t.className = 'chat-msg-text';
  t.textContent = ' ';
  el.appendChild(r);
  el.appendChild(t);
  chatMsgsEl.appendChild(el);
  streamingMsgEl = t;
}

function backendEventHandler(ev) {
  if (ev.type === 'training-end') {
    syncEdgeWeightsFromModel();
    updateChatStats();
    pushLossSample(ev.avgLoss);
    updatePredictions();
    pushLog('', `🧠 ${ev.stepsRun} steps (loss ${ev.avgLoss.toFixed(2)})`);

  } else if (ev.type === 'generate-token') {
    // 첫 토큰: thinking 숨기고 렌더링 재개
    if (thinkingShown) hideThinking();
    // 스트리밍 채팅 메시지 업데이트
    if (!streamingMsgEl) startStreamingMsg();
    streamingMsgEl.textContent = ' ' + ev.partial;
    chatMsgsEl.scrollTop = chatMsgsEl.scrollHeight;
    wasStreaming = true;
    // 각 토큰마다 뇌 신호 파동 (실제 LLM 추론과 동기화)
    triggerPass(ev.token);

    // 스트리밍 TTS: 문장 끝이 오면 바로 읽기
    ttsBuffer += ev.token;
    if (/[.!?。\n]\s*$/.test(ttsBuffer) && ttsBuffer.trim().length > 3) {
      if (voice.available) voice.speakChunk(ttsBuffer.trim());
      ttsBuffer = '';
    }

  } else if (ev.type === 'generate-end') {
    if (!wasStreaming) appendChatMsg('ai', ev.text);
    streamingMsgEl = null;
    wasStreaming = false;
    triggerPass(ev.text);
    updatePredictions();
    // 남은 TTS 버퍼 읽기
    if (voice.available && ttsBuffer.trim().length > 0) {
      voice.speakChunk(ttsBuffer.trim());
    }
    ttsBuffer = '';

  } else if (ev.type === 'state') {
    updateChatStats();
  } else if (ev.type === 'loading') {
    appendChatMsg('sys', ev.message);
  } else if (ev.type === 'loading-progress') {
    const last = chatMsgsEl.lastElementChild;
    if (last?.classList.contains('sys')) {
      last.querySelector('.chat-msg-text').textContent = ` Loading... ${ev.progress}%`;
    }
  } else if (ev.type === 'loading-done') {
    appendChatMsg('sys', 'Model loaded. Ready to chat!');
  }
}
backend.onEvent(backendEventHandler);

// 초기 가중치 동기화 + 예측 패널
syncEdgeWeightsFromModel();
updatePredictions();

// ─────────────────────────────────────────
// Voice: 박수 감지 + 음성 인식(STT) + 음성 합성(TTS)
// ─────────────────────────────────────────
const voice       = new VoiceController();
const voiceStatus = document.getElementById('voice-status');
const micBtn      = document.getElementById('chat-mic');

voice.onEvent((ev) => {
  if (ev.type === 'ready') {
    voiceStatus.textContent = '🔈 Always listening — just talk';
    voiceStatus.className   = '';
  }
  if (ev.type === 'listening-start') {
    voiceStatus.textContent = '🎤 Listening... (auto-send after 5s silence)';
    voiceStatus.className   = 'listening';
    micBtn.classList.add('active');
  }
  if (ev.type === 'listening-stop') {
    voiceStatus.textContent = '🔈 Always listening — just talk';
    voiceStatus.className   = '';
    micBtn.classList.remove('active');
    if (ev.text && ev.text.trim().length > 0) {
      chatInputEl.value = ev.text.trim();
      handleSend();
    }
  }
  if (ev.type === 'transcript') {
    chatInputEl.value = ev.text;
  }
  if (ev.type === 'speaking-start') {
    voiceStatus.textContent = '🔊 AI speaking... (mic paused)';
    voiceStatus.className   = 'speaking';
  }
  if (ev.type === 'speaking-end') {
    voiceStatus.textContent = '🔈 Always listening — just talk';
    voiceStatus.className   = '';
  }
  if (ev.type === 'denied') {
    voiceStatus.textContent = '🔇 Mic not allowed';
    voiceStatus.className   = '';
  }
  if (ev.type === 'error') {
    voiceStatus.textContent = `⚠ ${ev.error}`;
    if (voice.available) {
      setTimeout(() => { voiceStatus.textContent = '🔈 Always listening'; }, 3000);
    }
  }
});

// 마이크 버튼: 수동 즉시 전송
micBtn.addEventListener('click', () => {
  if (!voice.available) {
    voiceStatus.textContent = '⚠ Voice not available. Allow microphone.';
    return;
  }
  voice.manualSend();
});

// ─────────────────────────────────────────
// Settings modal + backend switching
// ─────────────────────────────────────────
const settingsBtn    = document.getElementById('settings-btn');
const settingsModal  = document.getElementById('settings-modal');
const sApiKeyEl      = document.getElementById('s-apikey');
const sStatusEl      = document.getElementById('settings-status');
const sSaveBtn       = document.getElementById('s-save');
const sTestBtn       = document.getElementById('s-test');
const sDeleteBtn     = document.getElementById('s-delete');
const sCloseBtn      = document.getElementById('s-close');

function getSelectedProvider() {
  const c = document.querySelector('input[name="s-provider"]:checked');
  return c ? c.value : 'local';
}
function getSelectedModel() {
  const c = document.querySelector('input[name="s-model"]:checked');
  return c ? c.value : 'claude-haiku-4-5-20251001';
}

function updateModeBadge() {
  const existing = document.getElementById('mode-badge');
  if (existing) existing.remove();
  const badge = document.createElement('span');
  badge.id = 'mode-badge';
  const isClaude = backend instanceof ClaudeAPIBackend;
  badge.className = `mode-badge ${isClaude ? 'cloud' : 'cloud'}`;
  badge.textContent = isClaude ? 'CLAUDE' : 'Qwen2.5-1.5B';
  document.getElementById('chat-title').appendChild(badge);
}
updateModeBadge();

// Populate saved settings
const savedKey      = localStorage.getItem(APIKEY_STORAGE);
const savedProvider = localStorage.getItem(PROVIDER_STORAGE);
const savedModel    = localStorage.getItem(MODEL_STORAGE);
if (savedKey) sApiKeyEl.value = savedKey;
if (savedProvider) {
  const r = document.querySelector(`input[name="s-provider"][value="${savedProvider}"]`);
  if (r) r.checked = true;
}
if (savedModel) {
  const r = document.querySelector(`input[name="s-model"][value="${savedModel}"]`);
  if (r) r.checked = true;
}

settingsBtn.addEventListener('click', () => settingsModal.classList.add('open'));
sCloseBtn.addEventListener('click',   () => settingsModal.classList.remove('open'));
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) settingsModal.classList.remove('open');
});

sTestBtn.addEventListener('click', async () => {
  const prov = getSelectedProvider();
  if (prov === 'huggingface') { sStatusEl.textContent = 'SmolLM2 — no key needed. Just send a message.'; return; }
  const key = sApiKeyEl.value.trim();
  if (!key) { sStatusEl.textContent = 'Please enter an API key.'; return; }
  sStatusEl.textContent = 'Testing...';
  const testBe = new ClaudeAPIBackend({ apiKey: key, model: getSelectedModel() });
  const result = await testBe.testConnection();
  sStatusEl.textContent = result.ok
    ? '✓ Connection successful!'
    : `✗ ${result.error || 'Failed — check your key.'}`;
});

function applyBackend(be, label) {
  backend = be;
  backend.onEvent(backendEventHandler);
  chatMsgsEl.innerHTML = '';
  bootstrapChat();
  syncEdgeWeightsFromModel();
  updateModeBadge();
  updateChatStats();
  settingsModal.classList.remove('open');
  pushLog('', label);
}

sSaveBtn.addEventListener('click', () => {
  const prov  = getSelectedProvider();
  const key   = sApiKeyEl.value.trim();
  const model = getSelectedModel();

  if (prov === 'huggingface') {
    localStorage.setItem(PROVIDER_STORAGE, 'huggingface');
    localStorage.removeItem(APIKEY_STORAGE);
    applyBackend(new WebLLMBackend(), '🧠 Qwen2.5-1.5B mode');
    sStatusEl.textContent = '✓ Qwen2.5-1.5B — model loads on START.';
    return;
  }
  if (!key) { sStatusEl.textContent = 'Please enter an API key.'; return; }
  localStorage.setItem(PROVIDER_STORAGE, 'claude');
  localStorage.setItem(APIKEY_STORAGE, key);
  localStorage.setItem(MODEL_STORAGE, model);
  applyBackend(new ClaudeAPIBackend({ apiKey: key, model }), '☁ Claude mode');
  sStatusEl.textContent = '✓ Now using Claude.';
});

sDeleteBtn.addEventListener('click', () => {
  localStorage.removeItem(APIKEY_STORAGE);
  localStorage.setItem(PROVIDER_STORAGE, 'huggingface');
  localStorage.removeItem(MODEL_STORAGE);
  sApiKeyEl.value = '';
  applyBackend(new WebLLMBackend(), '🧠 Qwen2.5-1.5B mode');
  sStatusEl.textContent = 'Key deleted — Qwen2.5-1.5B mode.';
});

function updateNetInfo() {
  // Input vector (활성화 값)
  for (let i = 0; i < LAYER_SIZES[0]; i++) {
    const a = layerData[0][i].activation;
    inputCellFills[i].style.height = `${Math.round(a * 100)}%`;
    inputCellVals[i].textContent   = String(Math.round(a * 100)).padStart(2, '0');
  }
  // Layer weights (각 층의 inter-layer incoming 평균 가중치)
  for (const row of weightRowEls) {
    let sum = 0, cnt = 0;
    for (const n of layerData[row.layerIdx]) {
      const inc = incomingEdges.get(n);
      if (!inc) continue;
      for (const e of inc) {
        if (e.intra) continue;
        sum += e.weight; cnt++;
      }
    }
    const avg = cnt > 0 ? sum / cnt : 0;
    row.fill.style.width = `${Math.round(avg * 100)}%`;
    row.val.textContent  = avg.toFixed(2);
  }
}

// ─────────────────────────────────────────
// 엣지 지오메트리 (버텍스 컬러 → 매 프레임 가중치 반영)
// ─────────────────────────────────────────
console.log(`[handface] nodes: ${allNodes.length}, edges: ${edges.length}`);

// 초기 가중치를 강제 설정 (syncEdgeWeightsFromModel 전에도 보이도록)
for (const e of edges) e.weight = e.targetWeight = 0.3 + Math.random() * 0.5;

// ─── 곡선 엣지: 각 엣지에 QuadraticBezier 곡선 생성 (자연스러운 뉴런 돌기 느낌) ───
const CURVE_SEGMENTS  = 10;
const VERTS_PER_EDGE  = CURVE_SEGMENTS * 2; // LineSegments (세그먼트당 정점 2개)
const _curveDir  = new THREE.Vector3();
const _curveAxis = new THREE.Vector3();
const _curveN    = new THREE.Vector3();
const _refUp     = new THREE.Vector3(0, 1, 0);
edges.forEach((e, i) => {
  _curveDir.subVectors(e.dst.pos, e.src.pos);
  const len = _curveDir.length();
  // 엣지 인덱스 기반 결정적 시드 (0~1)
  const seed = ((i * 9301 + 49297) % 233280) / 233280;
  // src→dst 축에 수직인 방향 얻기
  _curveAxis.copy(_curveDir).normalize();
  _curveN.crossVectors(_curveDir, _refUp);
  if (_curveN.lengthSq() < 1e-6) _curveN.set(1, 0, 0);
  _curveN.normalize();
  // 수직방향을 축 중심으로 회전 → 엣지별 다른 곡선 면
  _curveN.applyAxisAngle(_curveAxis, seed * Math.PI * 2);
  // 곡률 강도: 엣지 길이의 10~18% + intra-layer는 더 휘게
  const strength = len * (0.10 + seed * 0.08) * (e.intra ? 1.4 : 1.0);
  const mid = new THREE.Vector3()
    .addVectors(e.src.pos, e.dst.pos).multiplyScalar(0.5)
    .addScaledVector(_curveN, strength);
  e.curve = new THREE.QuadraticBezierCurve3(e.src.pos.clone(), mid, e.dst.pos.clone());
  e.curvePoints = e.curve.getPoints(CURVE_SEGMENTS); // CURVE_SEGMENTS+1 points
});

const ePosArr = new Float32Array(edges.length * VERTS_PER_EDGE * 3);
const eColArr = new Float32Array(edges.length * VERTS_PER_EDGE * 3);
edges.forEach((e, i) => {
  const base = i * VERTS_PER_EDGE * 3;
  const b = e.weight * 0.12;
  for (let s = 0; s < CURVE_SEGMENTS; s++) {
    const a = e.curvePoints[s], c = e.curvePoints[s + 1];
    const off = base + s * 6;
    ePosArr[off+0] = a.x; ePosArr[off+1] = a.y; ePosArr[off+2] = a.z;
    ePosArr[off+3] = c.x; ePosArr[off+4] = c.y; ePosArr[off+5] = c.z;
    eColArr[off+0] = b; eColArr[off+1] = b * 0.4; eColArr[off+2] = b * 0.05;
    eColArr[off+3] = b; eColArr[off+4] = b * 0.4; eColArr[off+5] = b * 0.05;
  }
});
const edgeGeo = new THREE.BufferGeometry();
edgeGeo.setAttribute('position', new THREE.BufferAttribute(ePosArr, 3));
edgeGeo.setAttribute('color',    new THREE.BufferAttribute(eColArr, 3));
network.add(new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
  vertexColors: true,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
})));

// ─────────────────────────────────────────
// 노드 지오메트리 (헤일로 + 코어 두 레이어)
// ─────────────────────────────────────────
const nPosArr  = new Float32Array(allNodes.length * 3);
const nHaloArr = new Float32Array(allNodes.length * 3);
const nCoreArr = new Float32Array(allNodes.length * 3);
allNodes.forEach((n, i) => {
  nPosArr[i*3] = n.pos.x; nPosArr[i*3+1] = n.pos.y; nPosArr[i*3+2] = n.pos.z;
  // 초기 노드 색상 (첫 프레임부터 보이도록)
  nHaloArr[i*3+0] = 0.08; nHaloArr[i*3+1] = 0.03; nHaloArr[i*3+2] = 0.01;
  nCoreArr[i*3+0] = 0.20; nCoreArr[i*3+1] = 0.08; nCoreArr[i*3+2] = 0.02;
});

function makeNodePoints(colArr, size, sharedPos, sprite) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(sharedPos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));
  network.add(new THREE.Points(geo, new THREE.PointsMaterial({
    vertexColors: true, size, map: sprite, alphaTest: 0.01,
    blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
  })));
  return geo;
}

const nodeHaloGeo = makeNodePoints(nHaloArr, 0.18, nPosArr, SPRITE_SOFT);
const nodeCoreGeo = makeNodePoints(nCoreArr, 0.065, nPosArr, SPRITE_SHARP);

// ─────────────────────────────────────────
// 스파크 파티클 (전류 흐름 표현)
// ─────────────────────────────────────────
const MAX_SPARKS = 1200;
const sparkPool  = [];   // { edge, t, speed }
const spPosArr   = new Float32Array(MAX_SPARKS * 3);
const spColArr   = new Float32Array(MAX_SPARKS * 3);
const sparkGeo   = new THREE.BufferGeometry();
sparkGeo.setAttribute('position', new THREE.BufferAttribute(spPosArr, 3));
sparkGeo.setAttribute('color',    new THREE.BufferAttribute(spColArr, 3));
sparkGeo.setDrawRange(0, 0);
network.add(new THREE.Points(sparkGeo, new THREE.PointsMaterial({
  vertexColors: true, size: 0.05, map: SPRITE_SHARP, alphaTest: 0.01,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
})));

function spawnSpark(edge, tOffset = 0) {
  if (sparkPool.length >= MAX_SPARKS) return;
  sparkPool.push({
    edge,
    t:     tOffset,
    speed: 0.008 + edge.weight * 0.018 + Math.random() * 0.007,
  });
}

// ─────────────────────────────────────────
// 코어 글로우 — 와이어프레임 없이 부드러운 발광 구체 2겹
// ─────────────────────────────────────────
const coreGroup = new THREE.Group();
network.add(coreGroup);

// 안쪽 밝은 글로우 (작은 화이트-옐로우)
const coreBright = new THREE.Mesh(
  new THREE.SphereGeometry(0.08, 20, 20),
  new THREE.MeshBasicMaterial({
    color: 0xFFEECC, blending: THREE.AdditiveBlending,
    transparent: true, opacity: 0.70, depthWrite: false,
  }),
);
coreGroup.add(coreBright);

// 바깥쪽 부드러운 헤일로 (은은한 앰버)
const coreHalo = new THREE.Mesh(
  new THREE.SphereGeometry(0.28, 20, 20),
  new THREE.MeshBasicMaterial({
    color: 0xFF8833, blending: THREE.AdditiveBlending,
    transparent: true, opacity: 0.10, depthWrite: false,
  }),
);
coreGroup.add(coreHalo);

// ─────────────────────────────────────────
// 3D 공간 — 불투명 벽 + 그리드 (모니터 안쪽으로 들어간 방)
// 틈 없이 5면(바닥·천장·좌·우·뒤)이 연결되고, 앞면은 열림(카메라 시점)
// ─────────────────────────────────────────
const RM = { xH: 12, yF: -4, yC: 8, zB: -14, zF: 10, step: 2 };
const RM_W = RM.xH * 2, RM_H = RM.yC - RM.yF, RM_D = RM.zF - RM.zB;
const RM_CY = (RM.yF + RM.yC) / 2, RM_CZ = (RM.zB + RM.zF) / 2;

// 벽 재질: 불투명 어두운 면 (뒤가 비치지 않음)
const wallMat = new THREE.MeshBasicMaterial({
  color: 0x040810, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
});

// 그리드 라인 생성기 (XY 평면에 그린 뒤 회전으로 배치)
function roomGrid(w, h, color, opacity) {
  const p = [], hw = w / 2, hh = h / 2, s = RM.step;
  for (let x = -hw; x <= hw + 0.01; x += s) p.push(x, -hh, 0, x, hh, 0);
  for (let y = -hh; y <= hh + 0.01; y += s) p.push(-hw, y, 0, hw, y, 0);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
  return new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
    color, transparent: true, opacity, depthWrite: false,
  }));
}

// 벽 + 그리드 한 쌍 추가
function addWall(pw, ph, pos, rot, gw, gh, gOp) {
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), wallMat);
  plane.position.set(...pos);
  if (rot) plane.rotation.set(...rot);
  scene.add(plane);
  const grid = roomGrid(gw, gh, 0x22DD66, gOp);
  grid.position.set(...pos);
  if (rot) grid.rotation.set(...rot);
  scene.add(grid);
}

// 바닥 (XZ)
addWall(RM_W, RM_D, [0, RM.yF, RM_CZ], [-Math.PI/2, 0, 0], RM_W, RM_D, 0.28);
// 천장 (XZ)
addWall(RM_W, RM_D, [0, RM.yC, RM_CZ], [Math.PI/2, 0, 0],  RM_W, RM_D, 0.14);
// 왼쪽 벽 (ZY)
addWall(RM_D, RM_H, [-RM.xH, RM_CY, RM_CZ], [0, Math.PI/2, 0],  RM_D, RM_H, 0.22);
// 오른쪽 벽 (ZY)
addWall(RM_D, RM_H, [RM.xH, RM_CY, RM_CZ],  [0, -Math.PI/2, 0], RM_D, RM_H, 0.22);
// 뒤쪽 벽 (XY)
addWall(RM_W, RM_H, [0, RM_CY, RM.zB],       [0, 0, 0],          RM_W, RM_H, 0.18);

// 안개 (먼 곳 페이드 → 깊이감)
scene.fog = new THREE.FogExp2(0x020408, 0.020);

// (3D 손 제거됨 — 커서만 표시)

// ─── 별 배경 ───
const STAR_N  = 2200;
const starPos = new Float32Array(STAR_N * 3);
for (let i = 0; i < STAR_N; i++) {
  const r     = 8 + Math.random() * 22;
  const theta = 2 * Math.PI * Math.random();
  const phi   = Math.acos(2 * Math.random() - 1);
  starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
  starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
  starPos[i*3+2] = r * Math.cos(phi);
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
const starMesh = new THREE.Points(starGeo, new THREE.PointsMaterial({
  color: 0xFFCC99, size: 0.022, map: SPRITE_SHARP, alphaTest: 0.01,
  blending: THREE.AdditiveBlending, transparent: true, opacity: 0.32, depthWrite: false,
}));
scene.add(starMesh);

// ─────────────────────────────────────────
// 신경망 시뮬레이션 (실제 모델 → viz 매핑)
// ─────────────────────────────────────────
let lastSyncMs  = 0;
const LAYER_DELAY_MS   = 280;
const SYNC_INTERVAL_MS = 600;

/**
 * 시드 텍스트로 모델을 forward 시킨 뒤 활성화를 viz 층에 매핑하여 신호 전파를 트리거.
 *
 * 핵심 포인트:
 *  1) 활성화 배열을 **스냅샷**으로 복사해서 쓴다. 이후 backend.send() 안에서 동기
 *     학습/샘플링이 돌아가며 model.lastH* 배열을 덮어쓰더라도, setTimeout 콜백이
 *     읽는 사본은 영향받지 않는다.
 *  2) 각 층 내에서 **max로 정규화**해서 절대값이 어떻든 상대적 대비가 항상 보이도록.
 */
function triggerPass(seedText = null) {
  const text = seedText
    || (backend.history.length > 0 ? backend.history[backend.history.length - 1].text : 'hi');

  // 마지막 CTX 글자 → context 인덱스 배열
  const indices = backend.model.encode(text);
  const ctx = new Array(backend.model.CTX);
  for (let k = 0; k < backend.model.CTX; k++) {
    const pos = indices.length - backend.model.CTX + k;
    ctx[k] = pos >= 0 ? indices[pos] : 0;
  }
  backend.model.forward(ctx);

  // ── 활성화 배열을 즉시 스냅샷 (참조가 아닌 복사본) ──
  const vocabSize = backend.model.vocab.size;
  const embedSnap = new Float32Array(backend.model.lastX);
  const h1Snap    = new Float32Array(backend.model.lastH1);
  const h2Snap    = new Float32Array(backend.model.lastH2);
  const h3Snap    = new Float32Array(backend.model.lastH3);
  const probsSnap = new Float32Array(backend.model.lastProbs.subarray(0, vocabSize));

  // 5 model states → 7 viz layers (duplicate mid layers to fill transformer depth)
  const sources = [embedSnap, h1Snap, h1Snap, h2Snap, h2Snap, h3Snap, probsSnap];
  const lengths = [embedSnap.length, h1Snap.length, h1Snap.length, h2Snap.length, h2Snap.length, h3Snap.length, probsSnap.length];

  // viz 층마다 지연을 두고 활성화 (파동 효과)
  for (let li = 0; li < LAYER_SIZES.length; li++) {
    setTimeout(() => {
      const src = sources[li];
      const len = lengths[li];
      const layerNodes = layerData[li];

      // 층 내 max로 정규화 → 상대적 대비 보장
      let maxV = 1e-6;
      for (let k = 0; k < len; k++) {
        const av = Math.abs(src[k]);
        if (av > maxV) maxV = av;
      }
      const invMax = 1 / maxV;

      for (let i = 0; i < layerNodes.length; i++) {
        const j = Math.min(len - 1, Math.floor((i / layerNodes.length) * len));
        const v = Math.abs(src[j]) * invMax;
        // 0..1로 정규화된 값 + 최소 noise floor (완전히 꺼져있는 뉴런도 약하게 보임)
        layerNodes[i].targetActivation = 0.08 + 0.92 * v;
      }

      // 다음 층으로 스파크 발사 (inter-layer 만)
      if (li < LAYER_SIZES.length - 1) {
        for (const srcNode of layerNodes) {
          if (srcNode.targetActivation < 0.2) continue;
          const out = outgoingEdges.get(srcNode);
          if (!out) continue;
          for (const e of out) {
            if (e.intra) continue;
            const intensity = e.weight * srcNode.targetActivation;
            spawnSpark(e, 0);
            if (intensity > 0.5) spawnSpark(e, 0.04 + Math.random() * 0.06);
            if (intensity > 0.8) spawnSpark(e, 0.09 + Math.random() * 0.06);
          }
        }
      }
    }, li * LAYER_DELAY_MS);
  }
}

/**
 * 모델의 실제 가중치를 viz 엣지에 매핑.
 * src/dst node 인덱스 → 모델 행렬의 (row, col) 매핑으로 결정적 샘플링.
 */
function syncEdgeWeightsFromModel() {
  const matrices = [
    backend.model.W1,  // ctxDim → H1
    backend.model.W2,  // H1 → H2
    backend.model.W3,  // H2 → H3
    backend.model.W4,  // H3 → vocab
  ];

  for (const e of edges) {
    // 6 inter-layer connections → 4 model matrices
    const matIdx  = Math.min(matrices.length - 1, Math.floor(e.src.layerIdx * matrices.length / (LAYER_SIZES.length - 1)));
    const mat     = matrices[matIdx];
    const matRows = mat.length;
    const matCols = mat[0].length;

    const srcLayer = e.src.layerIdx;
    const dstLayer = e.intra ? srcLayer : e.dst.layerIdx;
    const srcLayerSize = LAYER_SIZES[srcLayer];
    const dstLayerSize = LAYER_SIZES[dstLayer];

    const r = Math.min(matRows - 1, Math.floor((e.src.layerLocalIdx / srcLayerSize) * matRows));
    const c = Math.min(matCols - 1, Math.floor((e.dst.layerLocalIdx / dstLayerSize) * matCols));
    const w = Math.abs(mat[r][c] || 0);

    // 모델 가중치 (~0.05–0.5) → viz 가중치 (0.05–1)
    e.targetWeight = Math.max(0.05, Math.min(1, w * 5));
  }
}

// ─────────────────────────────────────────
// HandControl (시선 추적)
// ─────────────────────────────────────────
const control = new HandControl({ handedness: 'right', cursorSource: 'hand', cursorAnchor: 'index' });

// 회전 상태 (drag 이벤트로 제어, 스무딩 적용)
let dragRotX       = 0, dragRotY       = 0;
let targetDragRotX = 0, targetDragRotY = 0;
let prevDragX      = 0, prevDragY      = 0;
let baseRotY   = 0;
let clickCount = 0;

// 커서 스무딩 (검지 끝 떨림 제거)
let sCurX = 0, sCurY = 0, curInited = false;
const CUR_SMOOTH = 0.25;  // 낮을수록 부드러움

control.on('move', (e) => {
  const lm = control.handLandmarks;
  if (lm && lm[8]) {
    const rawX = (1 - lm[8].x) * window.innerWidth;
    const rawY = lm[8].y * window.innerHeight;
    if (!curInited) { sCurX = rawX; sCurY = rawY; curInited = true; }
    else { sCurX += (rawX - sCurX) * CUR_SMOOTH; sCurY += (rawY - sCurY) * CUR_SMOOTH; }
    cursorEl.style.left = `${sCurX}px`;
    cursorEl.style.top  = `${sCurY}px`;
    sPosEl.textContent  = `${Math.round(sCurX)} · ${Math.round(sCurY)}`;
  } else {
    cursorEl.style.left = `${e.screenX}px`;
    cursorEl.style.top  = `${e.screenY}px`;
    sPosEl.textContent  = `${e.screenX} · ${e.screenY}`;
  }
});

// 마우스 폴백 (HandControl 시작 전 커서 표시)
window.addEventListener('mousemove', (e) => {
  cursorEl.style.left = `${e.clientX}px`;
  cursorEl.style.top  = `${e.clientY}px`;
});

control.on('mousedown', () => {
  cursorEl.classList.add('clicking');
  pushLog('', '⬇ mousedown');
});
control.on('mouseup', () => {
  cursorEl.classList.remove('clicking');
  pushLog('', '⬆ mouseup');
});
control.on('click', () => {
  clickCount++;
  sClicksEl.textContent = String(clickCount);
  pushLog('ev-click', '🤏 click');
});
control.on('dblclick', () => {
  pushLog('ev-click', '🤏🤏 dblclick');
});
// 3D 뇌 회전: drag 이벤트로 제어
let isDraggingBrain = false;
control.on('dragstart', (e) => {
  prevDragX = e.screenX;
  prevDragY = e.screenY;
  isDraggingBrain = true;
  pushLog('', '↔ dragstart');
});
control.on('drag', (e) => {
  const dx = Math.max(-30, Math.min(30, e.screenX - prevDragX));
  const dy = Math.max(-30, Math.min(30, e.screenY - prevDragY));
  targetDragRotY += dx * 0.004;
  targetDragRotX += dy * 0.003;
  targetDragRotX  = Math.max(-1.2, Math.min(1.2, targetDragRotX));
  prevDragX = e.screenX;
  prevDragY = e.screenY;
});
control.on('dragend', () => {
  isDraggingBrain = false;
  pushLog('', '↔ dragend');
});
// 마우스 드래그 폴백 (HandControl 시작 전)
let mouseDown = false, mousePrevX = 0, mousePrevY = 0;
window.addEventListener('mousedown', (e) => { mouseDown = true; mousePrevX = e.clientX; mousePrevY = e.clientY; });
window.addEventListener('mouseup',   ()  => { mouseDown = false; });
window.addEventListener('mousemove', (e) => {
  if (!mouseDown) return;
  targetDragRotY += (e.clientX - mousePrevX) * 0.005;
  targetDragRotX += (e.clientY - mousePrevY) * 0.004;
  targetDragRotX  = Math.max(-1.2, Math.min(1.2, targetDragRotX));
  mousePrevX = e.clientX;
  mousePrevY = e.clientY;
});

control.on('scroll', (e) => {
  targetCamZ = Math.max(4.0, Math.min(15, targetCamZ + e.deltaY * 0.055));
  const zoom = Math.round((1 - (targetCamZ - 4.0) / 11.0) * 100);
  sZoomEl.textContent = `${zoom}%`;
  pushLog('ev-scroll', e.deltaY > 0 ? '🤲 zoom out' : '🤲 zoom in');
});

const GCFG = {
  thumbsup:   { label: '👍 thumbs up' },
  victory:    { label: '✌️ victory' },
};
for (const [g, cfg] of Object.entries(GCFG)) {
  control.on(g, () => pushLog('', cfg.label));
}

// ─── 유틸리티 ───
const _v3 = new THREE.Vector3();

// ─────────────────────────────────────────
// GPU 양보: 추론 중 렌더링 부하를 낮춰 WebGPU(LLM)와 WebGL(3D) 경쟁 방지
// ─────────────────────────────────────────
let thinkingShown  = false;
let lastFrameTime  = 0;
const thinkingEl   = document.getElementById('thinking');

// Static thinking overlay — no animation (WebLLM blocks everything).
function showThinking() {
  thinkingEl.classList.add('on');
  thinkingShown = true;
}
function hideThinking() {
  thinkingEl.classList.remove('on');
  thinkingShown = false;
}

// ─────────────────────────────────────────
// 애니메이션 루프
// ─────────────────────────────────────────
let t = 0;
function animate() {
  requestAnimationFrame(animate);

  // thinking 중이면 렌더링 완전 정지 (GPU 100% LLM에)
  if (thinkingShown) return;

  // 60fps
  const nowMs = performance.now();
  if (nowMs - lastFrameTime < 1000 / 60) return;
  lastFrameTime = nowMs;

  t += 0.011;

  // ── 모델 가중치 → viz 엣지 동기화 ──
  if (nowMs - lastSyncMs > SYNC_INTERVAL_MS) {
    lastSyncMs = nowMs;
    syncEdgeWeightsFromModel();
  }
  // 부드러운 가중치 수렴
  for (const e of edges) {
    e.weight += (e.targetWeight - e.weight) * 0.012;
  }

  // ── 노드 활성화 스무딩 + 자연 감쇠 ──
  for (const n of allNodes) {
    n.targetActivation *= 0.993;
    n.activation       += (n.targetActivation - n.activation) * 0.07;
    if (n.activation < 4e-4) n.activation = 0;
  }

  // ── 디지털 코어 (입력층 평균 활성화에 반응) ──
  let inputAct = 0;
  for (const n of layerData[0]) inputAct += n.activation;
  inputAct /= layerData[0].length;
  coreBright.material.opacity = 0.55 + 0.30 * inputAct + 0.06 * Math.sin(t * 2.5);
  coreHalo.material.opacity   = 0.08 + 0.18 * inputAct + 0.03 * Math.sin(t * 1.5);

  // ── 엣지/노드/스파크 업데이트 (드래그 중 건너뛰어 부하 감소) ──
  if (!isDraggingBrain) {

  // 엣지 색상 (가중치 × 활성화 = 밝기) — 곡선 정점 전체에 동일 색
  for (let i = 0; i < edges.length; i++) {
    const e   = edges[i];
    const act = Math.max(e.src.activation * 0.8, e.dst.activation * 0.65);
    const b   = e.weight * (0.12 + 0.88 * act);
    // 앰버 팔레트 (1.0, 0.40, 0.05)
    const r = b * 1.00, g = b * 0.40, bl = b * 0.05;
    const base = i * VERTS_PER_EDGE * 3;
    for (let v = 0; v < VERTS_PER_EDGE; v++) {
      const off = base + v * 3;
      eColArr[off]   = r;
      eColArr[off+1] = g;
      eColArr[off+2] = bl;
    }
  }
  edgeGeo.attributes.color.needsUpdate = true;

  // ── 노드 색상 업데이트 ──
  for (let i = 0; i < allNodes.length; i++) {
    const a = allNodes[i].activation;
    // 헤일로: 부드러운 앰버 글로우
    nHaloArr[i*3+0] = 0.08 + a * 0.52;
    nHaloArr[i*3+1] = 0.03 + a * 0.20;
    nHaloArr[i*3+2] = 0.01 + a * 0.03;
    // 코어: 활성화 시 밝은 화이트-옐로우
    nCoreArr[i*3+0] = 0.20 + a * 0.80;
    nCoreArr[i*3+1] = 0.08 + a * 0.68;
    nCoreArr[i*3+2] = 0.02 + a * 0.18;
  }
  nodeHaloGeo.attributes.color.needsUpdate = true;
  nodeCoreGeo.attributes.color.needsUpdate = true;

  // ── 스파크 이동 (전류 흐름) ──
  for (let i = sparkPool.length - 1; i >= 0; i--) {
    sparkPool[i].t += sparkPool[i].speed;
    if (sparkPool[i].t >= 1.0) sparkPool.splice(i, 1);
  }
  for (let i = 0; i < sparkPool.length; i++) {
    const sp = sparkPool[i];
    sp.edge.curve.getPoint(sp.t, _v3);
    spPosArr[i*3]   = _v3.x;
    spPosArr[i*3+1] = _v3.y;
    spPosArr[i*3+2] = _v3.z;
    // 진입/진출 페이드 인/아웃 + 가중치 기반 밝기
    const fade = sp.t < 0.12 ? sp.t / 0.12 : sp.t > 0.80 ? (1 - sp.t) / 0.20 : 1.0;
    const b    = (0.55 + sp.edge.weight * 0.45) * fade;
    spColArr[i*3]   = b;
    spColArr[i*3+1] = b * 0.88;
    spColArr[i*3+2] = b * 0.42;
  }
  sparkGeo.setDrawRange(0, sparkPool.length);
  sparkGeo.attributes.position.needsUpdate = true;
  sparkGeo.attributes.color.needsUpdate    = true;

  } // end if (!isDraggingBrain) — 드래그 중 무거운 업데이트 건너뜀

  // ── 뇌 회전: 자동 + 핀치 드래그 (스무딩 보간) ──
  baseRotY += 0.0015;
  dragRotX += (targetDragRotX - dragRotX) * 0.12;
  dragRotY += (targetDragRotY - dragRotY) * 0.12;
  network.rotation.x = dragRotX;
  network.rotation.y = baseRotY + dragRotY;

  camZ += (targetCamZ - camZ) * 0.055;
  camera.position.z = camZ;

  // ── 별 배경 미세 회전 ──
  starMesh.rotation.y += 0.000035;

  // ── HUD 패널 업데이트 ──
  updateNetInfo();

  renderer.render(scene, camera);
}
animate();

// ─── Start Button ───
startBtn.addEventListener('click', async () => {
  startBtn.disabled    = true;
  startBtn.textContent = 'LOADING...';
  sStatus.textContent  = 'INIT';
  try {
    // Phase 1: MediaPipe
    loadMsg.textContent = 'Loading MediaPipe (5-10s)...';
    await control.start();
    control.createPanel();

    // Phase 2: AI model (HuggingFace or other — preload so chat is instant)
    if (backend._ensureModel) {
      loadMsg.textContent = 'Loading AI model...';
      await backend._ensureModel();
    }

    // Phase 3: Voice (wake-word STT + TTS)
    loadMsg.textContent = 'Setting up voice...';
    try { await voice.init(); } catch {}

    // 카메라 미리보기
    const camPreview = document.getElementById('cam-preview');
    const camToggle  = document.getElementById('cam-toggle');
    if (control.mediaStream && camPreview) {
      camPreview.srcObject = control.mediaStream;
    }
    camToggle.textContent = '📷 HIDE';
    camToggle?.addEventListener('click', () => {
      const on = camPreview.style.display !== 'block';
      camPreview.style.display = on ? 'block' : 'none';
      camToggle.textContent = on ? '📷 HIDE' : '📷 CAM';
    });

    sStatus.textContent = 'ACTIVE';
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.style.display = 'none'; }, 650);
    pushLog('', 'start');
    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') { control.recalibrate(); pushLog('', 'recalibrated'); }
    });
  } catch (err) {
    sStatus.textContent  = 'ERROR';
    loadMsg.textContent  = `Error: ${err.message}`;
    startBtn.disabled    = false;
    startBtn.textContent = 'RETRY';
    console.error(err);
  }
});

// ─── Resize ───
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
