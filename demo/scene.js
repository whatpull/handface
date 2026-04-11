import * as THREE from 'three';
import { HandControl } from '../src/index.ts';
import { CharNLMBackend } from './backend.js';

// ─────────────────────────────────────────
// Neural backend (small char-level LM that learns continuously from chat)
// Replace this constructor later with a CloudLLMBackend / WebLLMBackend
// while leaving everything below unchanged.
// ─────────────────────────────────────────
const backend = new CharNLMBackend();

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
camera.position.set(0, 0, 8.0);
camera.lookAt(0, 0, 0);
let targetCamZ = 8.0;
let camZ       = 8.0;

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
// 신경망 구조 — 해부학적 뉴런 (Dendrite + Soma + DNA Axon + Terminals)
//
//   Layer 0  dendrite tips      ← 입력 (아래쪽, 펼쳐짐)
//   Layer 1  dendrite branches  ← 가지 (아래에서 soma로 수렴)
//   Layer 2  soma (cell body)   ← 소마 — 가장 조밀, 디지털 코어가 핵 역할
//   Layer 3  axon double helix  ← 이중 나선 (DNA 모티프)
//   Layer 4  axon terminals     ← 출력 (위쪽, 펼쳐짐)
//
// K-NN 엣지 생성기는 Euclidean 거리만 보므로 레이아웃이 바뀌어도 그대로 동작.
// ─────────────────────────────────────────
const LAYER_SIZES = [12, 42, 80, 56, 22];   // 212 nodes
const K_FORWARD   = 5;
const K_BACKWARD  = 3;
const K_INTRA     = 4;

const DENDRITE_BRANCHES = 6;     // 입력 가지 개수
const TERMINAL_BRANCHES = 5;     // 출력 터미널 다발 개수

// ─── 해부학적 영역별 좌표 생성기 ───────────────

/** Layer 0: 덴드라이트 끝점 — 아래쪽 부채꼴로 펼침 */
function dendriticTips(n) {
  const points = [];
  for (let i = 0; i < n; i++) {
    const branch = i % DENDRITE_BRANCHES;
    const angle  = (branch / DENDRITE_BRANCHES) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
    const r      = 1.45 + Math.random() * 0.55;
    const j      = 0.10;
    points.push(new THREE.Vector3(
      r * Math.cos(angle) + (Math.random() - 0.5) * j,
      -2.30 + (Math.random() - 0.5) * 0.30,
      r * Math.sin(angle) + (Math.random() - 0.5) * j,
    ));
  }
  return points;
}

/** Layer 1: 덴드라이트 가지 — 끝점에서 soma로 수렴하는 트리 */
function dendriticBranches(n) {
  const points = [];
  for (let i = 0; i < n; i++) {
    const branch = i % DENDRITE_BRANCHES;
    const angle  = (branch / DENDRITE_BRANCHES) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const t      = 0.15 + Math.random() * 0.85;   // 0=soma 근처, 1=tip 근처
    const r      = 0.40 + t * 1.20;
    const y      = -0.95 - t * 1.15;
    const j      = 0.13;
    points.push(new THREE.Vector3(
      r * Math.cos(angle) + (Math.random() - 0.5) * j,
      y                   + (Math.random() - 0.5) * j,
      r * Math.sin(angle) + (Math.random() - 0.5) * j,
    ));
  }
  return points;
}

/** Layer 2: 소마 (cell body) — 약간 압축된 구체 */
function somaShell(n) {
  const points = [];
  const radius = 0.78;
  const yCenter = -0.20;
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y0 = 1 - (i / (n - 1)) * 2;
    const r0 = Math.sqrt(Math.max(0, 1 - y0 * y0));
    const theta = phi * i;
    const j = 0.08;
    points.push(new THREE.Vector3(
      Math.cos(theta) * r0 * radius        + (Math.random() - 0.5) * j,
      y0 * radius * 0.85 + yCenter         + (Math.random() - 0.5) * j,
      Math.sin(theta) * r0 * radius        + (Math.random() - 0.5) * j,
    ));
  }
  return points;
}

/** Layer 3: 축삭 이중 나선 (DNA double helix) — 두 가닥이 꼬임 */
function axonHelix(n) {
  const points = [];
  const yMin   = 0.55;
  const yMax   = 2.05;
  const radius = 0.34;
  const turns  = 2.4;
  const halfN  = Math.floor(n / 2);
  for (let i = 0; i < n; i++) {
    const strand = i < halfN ? 0 : 1;
    const localI = strand === 0 ? i : i - halfN;
    const localN = strand === 0 ? halfN : (n - halfN);
    const t      = localN > 1 ? localI / (localN - 1) : 0;
    const y      = yMin + t * (yMax - yMin);
    const theta  = t * turns * Math.PI * 2 + (strand === 1 ? Math.PI : 0);
    const j      = 0.04;
    points.push(new THREE.Vector3(
      radius * Math.cos(theta) + (Math.random() - 0.5) * j,
      y                        + (Math.random() - 0.5) * j,
      radius * Math.sin(theta) + (Math.random() - 0.5) * j,
    ));
  }
  return points;
}

/** Layer 4: 축삭 말단 부케 — 위쪽으로 펼침 */
function axonTerminals(n) {
  const points = [];
  for (let i = 0; i < n; i++) {
    const branch = i % TERMINAL_BRANCHES;
    const angle  = (branch / TERMINAL_BRANCHES) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
    const t      = 0.30 + Math.random() * 0.70;
    const r      = 0.45 + t * 0.70;
    const y      = 2.10 + t * 0.55;
    const j      = 0.11;
    points.push(new THREE.Vector3(
      r * Math.cos(angle) + (Math.random() - 0.5) * j,
      y                   + (Math.random() - 0.5) * j,
      r * Math.sin(angle) + (Math.random() - 0.5) * j,
    ));
  }
  return points;
}

/** 디스패처 — 층 인덱스에 맞는 해부 영역 좌표 반환 */
function neuronLayout(layerIdx, count) {
  switch (layerIdx) {
    case 0:  return dendriticTips(count);
    case 1:  return dendriticBranches(count);
    case 2:  return somaShell(count);
    case 3:  return axonHelix(count);
    case 4:  return axonTerminals(count);
    default: return somaShell(count);
  }
}

const layerData = LAYER_SIZES.map((count, li) =>
  neuronLayout(li, count).map((pos, localIdx) => ({
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
  chatStatsEl.textContent = `vocab ${s.vocabSize} · steps ${s.totalSteps} · loss ${lossStr}`;
  if (s.lossEMA != null) {
    // 학습 진척도: loss가 낮을수록 바가 가득 (5.0 → 0% / 0.5 → 90%)
    const filled = Math.max(0, Math.min(1, 1 - s.lossEMA / 5));
    chatLossFillEl.style.width = `${Math.round(filled * 100)}%`;
  }
}

function bootstrapChat() {
  if (backend.history.length === 0) {
    appendChatMsg('sys', '메시지를 입력하면 모델이 학습합니다. 처음엔 헛소리지만 점점 비슷해집니다.');
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
  appendChatMsg('user', text);
  triggerPass(text);
  pushLog('', `💬 training (${text.length} chars)`);
  await backend.send(text);
}

chatSendEl.addEventListener('click', handleSend);
chatInputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
});
chatResetEl.addEventListener('click', () => {
  if (!confirm('모델 가중치와 어휘를 모두 초기화합니다. 진행할까요?')) return;
  backend.reset();
  chatMsgsEl.innerHTML = '';
  bootstrapChat();
  syncEdgeWeightsFromModel();
  pushLog('', '🔄 model reset');
});

backend.onEvent((ev) => {
  if (ev.type === 'training-end') {
    syncEdgeWeightsFromModel();
    updateChatStats();
    pushLog('', `🧠 ${ev.stepsRun} steps (loss ${ev.avgLoss.toFixed(2)})`);
  } else if (ev.type === 'generate-end') {
    appendChatMsg('ai', ev.text);
    triggerPass(ev.text);
  } else if (ev.type === 'state') {
    updateChatStats();
  }
});

// 초기 가중치 동기화
syncEdgeWeightsFromModel();

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
const ePosArr = new Float32Array(edges.length * 6);
const eColArr = new Float32Array(edges.length * 6);
edges.forEach((e, i) => {
  ePosArr[i*6+0] = e.src.pos.x; ePosArr[i*6+1] = e.src.pos.y; ePosArr[i*6+2] = e.src.pos.z;
  ePosArr[i*6+3] = e.dst.pos.x; ePosArr[i*6+4] = e.dst.pos.y; ePosArr[i*6+5] = e.dst.pos.z;
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
// 디지털 코어 — 소마 안의 "핵(nucleus)"으로 작동
// soma는 y ≈ -0.20 에 중심, 코어 그룹도 같은 위치로 이동
// ─────────────────────────────────────────
const coreGroup = new THREE.Group();
coreGroup.position.y = -0.20;
network.add(coreGroup);

// (1) 중간 이코사헤드론 — 솔리드 채움 + 밝은 와이어
const coreIcoGeo   = new THREE.IcosahedronGeometry(0.22, 1);
const coreIcoSolid = new THREE.Mesh(coreIcoGeo, new THREE.MeshBasicMaterial({
  color: 0xFFAA44, blending: THREE.AdditiveBlending,
  transparent: true, opacity: 0.25, depthWrite: false,
}));
const coreIcoWire  = new THREE.LineSegments(
  new THREE.EdgesGeometry(coreIcoGeo),
  new THREE.LineBasicMaterial({
    color: 0xFFCC55, blending: THREE.AdditiveBlending,
    transparent: true, opacity: 1.0, depthWrite: false,
  }),
);
const coreIcoPivot = new THREE.Group();
coreIcoPivot.add(coreIcoSolid, coreIcoWire);
coreGroup.add(coreIcoPivot);

// (3) 안쪽 솔리드 코어 — 화이트-옐로우 발광 구체
const coreBright = new THREE.Mesh(
  new THREE.SphereGeometry(0.10, 20, 20),
  new THREE.MeshBasicMaterial({
    color: 0xFFFFCC, blending: THREE.AdditiveBlending,
    transparent: true, opacity: 1.0, depthWrite: false,
  }),
);
coreGroup.add(coreBright);

// (4) 직교하는 3개 HUD 궤도 링 (입력층 안쪽)
function makeOrbitRing(radius, rx, ry, rz, color) {
  const geo  = new THREE.TorusGeometry(radius, 0.0075, 8, 96);
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    color, blending: THREE.AdditiveBlending,
    transparent: true, opacity: 0.75, depthWrite: false,
  }));
  mesh.rotation.set(rx, ry, rz);
  return mesh;
}
const ring1 = makeOrbitRing(0.29, 0,         0, 0, 0xFFBB44);
const ring2 = makeOrbitRing(0.29, Math.PI/2, 0, 0, 0xFFAA33);
const ring3 = makeOrbitRing(0.29, 0, Math.PI/2, 0, 0xFFCC55);
coreGroup.add(ring1, ring2, ring3);

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

  const sources = [embedSnap, h1Snap, h2Snap, h3Snap, probsSnap];
  const lengths = [embedSnap.length, h1Snap.length, h2Snap.length, h3Snap.length, probsSnap.length];

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
    const matIdx  = Math.min(matrices.length - 1, e.src.layerIdx);
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
const control = new HandControl({ handedness: 'right', cursorSource: 'gaze' });

// 커서 오프셋 (-0.5 ~ +0.5) — 회전 속도의 입력
let cursorOffX = 0, cursorOffY = 0;
// 누적 회전 (커서 위치 기반 속도로 적분됨)
let cursorRotX = 0, cursorRotY = 0;
let baseRotY   = 0;
let clickCount = 0;

control.on('move', (e) => {
  cursorEl.style.left = `${e.screenX}px`;
  cursorEl.style.top  = `${e.screenY}px`;
  sPosEl.textContent  = `${e.screenX} · ${e.screenY}`;
  cursorOffX = e.x - 0.5;
  cursorOffY = e.y - 0.5;
});

// 마우스 폴백 (HandControl 시작 전에도 회전 가능)
window.addEventListener('mousemove', (e) => {
  cursorOffX = (e.clientX / window.innerWidth)  - 0.5;
  cursorOffY = (e.clientY / window.innerHeight) - 0.5;
  cursorEl.style.left = `${e.clientX}px`;
  cursorEl.style.top  = `${e.clientY}px`;
});

control.on('click', () => {
  clickCount++;
  sClicksEl.textContent = String(clickCount);
  cursorEl.classList.add('clicking');
  setTimeout(() => cursorEl.classList.remove('clicking'), 80);
  pushLog('ev-click', '🤌 pinch');
});

control.on('scroll', (e) => {
  targetCamZ = Math.max(4.0, Math.min(15, targetCamZ + e.deltaY * 0.055));
  const zoom = Math.round((1 - (targetCamZ - 4.0) / 11.0) * 100);
  sZoomEl.textContent = `${zoom}%`;
  pushLog('ev-scroll', e.deltaY > 0 ? '✊ zoom out' : '🖐️ zoom in');
});

const GCFG = {
  thumbsup:   { label: '👍 thumbs up' },
  thumbsdown: { label: '👎 thumbs down' },
  victory:    { label: '✌️ victory' },
  iloveyou:   { label: '🤟 iloveyou' },
};
for (const [g, cfg] of Object.entries(GCFG)) {
  control.on(g, () => pushLog('', cfg.label));
}

// ─── 유틸리티 ───
const _v3 = new THREE.Vector3();

// ─────────────────────────────────────────
// 애니메이션 루프
// ─────────────────────────────────────────
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.011;
  const nowMs = performance.now();

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
  coreBright.material.opacity   = 0.85 + 0.15 * inputAct + 0.06 * Math.sin(t * 3);
  coreIcoSolid.material.opacity = 0.20 + 0.22 * inputAct;
  coreIcoWire.material.opacity  = 0.85 + 0.15 * inputAct;
  // 와이어프레임 자체 회전
  coreIcoPivot.rotation.y += 0.013;
  coreIcoPivot.rotation.x += 0.006;
  ring1.rotation.z += 0.005;
  ring2.rotation.z += 0.006;
  ring3.rotation.x += 0.004;

  // ── 엣지 색상 업데이트 (가중치 × 활성화 = 밝기) ──
  for (let i = 0; i < edges.length; i++) {
    const e   = edges[i];
    const act = Math.max(e.src.activation * 0.8, e.dst.activation * 0.65);
    const b   = e.weight * (0.035 + 0.965 * act);
    // 앰버 팔레트 (1.0, 0.40, 0.05)
    const r = b * 1.00, g = b * 0.40, bl = b * 0.05;
    eColArr[i*6+0] = r;  eColArr[i*6+1] = g;  eColArr[i*6+2] = bl;
    eColArr[i*6+3] = r;  eColArr[i*6+4] = g;  eColArr[i*6+5] = bl;
  }
  edgeGeo.attributes.color.needsUpdate = true;

  // ── 노드 색상 업데이트 ──
  for (let i = 0; i < allNodes.length; i++) {
    const a = allNodes[i].activation;
    // 헤일로: 부드러운 앰버 글로우
    nHaloArr[i*3+0] = 0.025 + a * 0.55;
    nHaloArr[i*3+1] = 0.010 + a * 0.22;
    nHaloArr[i*3+2] = 0.003 + a * 0.03;
    // 코어: 활성화 시 밝은 화이트-옐로우
    nCoreArr[i*3+0] = 0.10 + a * 0.90;
    nCoreArr[i*3+1] = 0.04 + a * 0.72;
    nCoreArr[i*3+2] = 0.01 + a * 0.20;
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
    _v3.lerpVectors(sp.edge.src.pos, sp.edge.dst.pos, sp.t);
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

  // ── 회전 (자동 회전 + 커서 오프셋 → 회전 속도) ──
  baseRotY += 0.0015;
  // 데드존: 커서가 화면 중앙 근처면 정지
  const DZ = 0.06;
  const dx = Math.sign(cursorOffX) * Math.max(0, Math.abs(cursorOffX) - DZ);
  const dy = Math.sign(cursorOffY) * Math.max(0, Math.abs(cursorOffY) - DZ);
  cursorRotY += dx * 0.016;
  cursorRotX += dy * 0.011;
  // X축 회전은 너무 많이 기울지 않도록 클램프
  cursorRotX = Math.max(-1.0, Math.min(1.0, cursorRotX));
  network.rotation.x = cursorRotX;
  network.rotation.y = baseRotY + cursorRotY;

  // ── 카메라 줌 ──
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
  loadMsg.textContent  = 'Loading MediaPipe (5-10s)';
  sStatus.textContent  = 'INIT';
  try {
    await control.start();
    control.createPanel();
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
