import * as THREE from 'three';
import { HandControl } from '../src/index.ts';

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
camera.position.set(0, 0.3, 7.0);
camera.lookAt(0, 0, 0);
let targetCamZ = 7.0;
let camZ       = 7.0;

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
// 신경망 구조 - 동심 구체 (Concentric Spherical Shells)
// 입력층(코어) → 은닉층 → 출력층(외각) 으로 신호가 방사형으로 전파됨
// ─────────────────────────────────────────
const LAYER_SIZES = [7, 16, 24, 16, 8];               // 71 nodes
const LAYER_RADII = [0.32, 0.88, 1.42, 1.95, 2.42];   // 각 층 반경
const K_FORWARD   = 3;
const K_BACKWARD  = 2;

/** Fibonacci sphere — n개의 점을 구체 표면에 균일하게 분포 */
function fibonacciSphere(n, radius, jitter = 0.07) {
  if (n === 1) return [new THREE.Vector3(0, 0, 0)];
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));  // golden angle
  for (let i = 0; i < n; i++) {
    const y     = 1 - (i / (n - 1)) * 2;
    const r     = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    points.push(new THREE.Vector3(
      Math.cos(theta) * r * radius + (Math.random() - 0.5) * jitter,
      y * radius                   + (Math.random() - 0.5) * jitter,
      Math.sin(theta) * r * radius + (Math.random() - 0.5) * jitter,
    ));
  }
  return points;
}

const layerData = LAYER_SIZES.map((count, li) =>
  fibonacciSphere(count, LAYER_RADII[li]).map(pos => ({
    pos,
    activation:       0,
    targetActivation: 0,
    layerIdx:         li,
  })),
);

const allNodes = layerData.flat();

// ─── K-최근접 시냅스 엣지 (forward + backward, 중복 제거) ───
const edges    = [];
const edgeSet  = new Set();
const nodeIdx  = new Map();
allNodes.forEach((n, i) => nodeIdx.set(n, i));

function tryAddEdge(src, dst) {
  const key = nodeIdx.get(src) * 10000 + nodeIdx.get(dst);
  if (edgeSet.has(key)) return;
  edgeSet.add(key);
  edges.push({
    src, dst,
    weight:       0.15 + Math.random() * 0.85,
    targetWeight: 0.15 + Math.random() * 0.85,
  });
}

// Forward: 각 source → 다음 층의 K개 최근접 dst
for (let li = 0; li < LAYER_SIZES.length - 1; li++) {
  for (const src of layerData[li]) {
    layerData[li + 1]
      .map(dst => ({ dst, d: src.pos.distanceTo(dst.pos) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K_FORWARD)
      .forEach(({ dst }) => tryAddEdge(src, dst));
  }
}
// Backward: 각 dst ← 이전 층의 K개 최근접 src (모든 노드 incoming 보장)
for (let li = 1; li < LAYER_SIZES.length; li++) {
  for (const dst of layerData[li]) {
    layerData[li - 1]
      .map(src => ({ src, d: dst.pos.distanceTo(src.pos) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K_BACKWARD)
      .forEach(({ src }) => tryAddEdge(src, dst));
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

function updateNetInfo() {
  // Input vector (활성화 값)
  for (let i = 0; i < LAYER_SIZES[0]; i++) {
    const a = layerData[0][i].activation;
    inputCellFills[i].style.height = `${Math.round(a * 100)}%`;
    inputCellVals[i].textContent   = String(Math.round(a * 100)).padStart(2, '0');
  }
  // Layer weights (각 층의 incoming 평균 가중치)
  for (const row of weightRowEls) {
    let sum = 0, cnt = 0;
    for (const n of layerData[row.layerIdx]) {
      const inc = incomingEdges.get(n);
      if (!inc) continue;
      for (const e of inc) { sum += e.weight; cnt++; }
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

const nodeHaloGeo = makeNodePoints(nHaloArr, 0.30, nPosArr, SPRITE_SOFT);
const nodeCoreGeo = makeNodePoints(nCoreArr, 0.11, nPosArr, SPRITE_SHARP);

// ─────────────────────────────────────────
// 스파크 파티클 (전류 흐름 표현)
// ─────────────────────────────────────────
const MAX_SPARKS = 500;
const sparkPool  = [];   // { edge, t, speed }
const spPosArr   = new Float32Array(MAX_SPARKS * 3);
const spColArr   = new Float32Array(MAX_SPARKS * 3);
const sparkGeo   = new THREE.BufferGeometry();
sparkGeo.setAttribute('position', new THREE.BufferAttribute(spPosArr, 3));
sparkGeo.setAttribute('color',    new THREE.BufferAttribute(spColArr, 3));
sparkGeo.setDrawRange(0, 0);
network.add(new THREE.Points(sparkGeo, new THREE.PointsMaterial({
  vertexColors: true, size: 0.075, map: SPRITE_SHARP, alphaTest: 0.01,
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
// 디지털 코어 — 다층 솔리드+와이어 + HUD 궤도 링
// 입력층(반경 0.32)을 감싸는 큰 3D 구조로 명확히 보이도록 구성
// ─────────────────────────────────────────
const coreGroup = new THREE.Group();
network.add(coreGroup);

// (1) 외곽 옥타헤드론 — 솔리드 채움 + 밝은 와이어 (듀얼 레이어)
const coreOctaGeo   = new THREE.OctahedronGeometry(0.34, 0);
const coreOctaSolid = new THREE.Mesh(coreOctaGeo, new THREE.MeshBasicMaterial({
  color: 0xFF8833, blending: THREE.AdditiveBlending,
  transparent: true, opacity: 0.18, depthWrite: false,
}));
const coreOctaWire  = new THREE.LineSegments(
  new THREE.EdgesGeometry(coreOctaGeo),
  new THREE.LineBasicMaterial({
    color: 0xFFAA44, blending: THREE.AdditiveBlending,
    transparent: true, opacity: 0.95, depthWrite: false,
  }),
);
const coreOctaPivot = new THREE.Group();
coreOctaPivot.add(coreOctaSolid, coreOctaWire);
coreGroup.add(coreOctaPivot);

// (2) 중간 이코사헤드론 — 솔리드 채움 + 밝은 와이어
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
// 신경망 시뮬레이션
// ─────────────────────────────────────────
const sigmoid = (x) => 1 / (1 + Math.exp(-x));

let lastPassMs  = -3000;
let lastLearnMs = 0;
const PASS_INTERVAL_MS  = 2600;
const LAYER_DELAY_MS    = 300;
const LEARN_INTERVAL_MS = 500;

/** 신호 전파 (순전파) */
function triggerPass() {
  // 입력층: 랜덤 활성화 패턴
  layerData[0].forEach(n => {
    n.targetActivation = Math.random() > 0.3 ? 0.5 + Math.random() * 0.5 : 0.04;
  });

  for (let li = 0; li < LAYER_SIZES.length; li++) {
    setTimeout(() => {
      // 은닉층/출력층: 이전 층 가중합 → sigmoid (인접 리스트 사용)
      if (li > 0) {
        layerData[li].forEach(dst => {
          const incoming = incomingEdges.get(dst);
          if (!incoming) return;
          let sum = 0;
          for (const e of incoming) sum += e.src.activation * e.weight;
          dst.targetActivation = sigmoid((sum / incoming.length) * 4.5 - 1.5);
        });
      }
      // 다음 층으로 스파크 발사
      if (li < LAYER_SIZES.length - 1) {
        layerData[li].forEach(src => {
          if (src.targetActivation < 0.18) return;
          const out = outgoingEdges.get(src);
          if (!out) return;
          for (const e of out) {
            const intensity = e.weight * src.targetActivation;
            spawnSpark(e, 0);
            if (intensity > 0.5) spawnSpark(e, 0.04 + Math.random() * 0.06);
            if (intensity > 0.8) spawnSpark(e, 0.09 + Math.random() * 0.06);
          }
        });
      }
    }, li * LAYER_DELAY_MS);
  }
}

/**
 * 헤브 학습 시뮬레이션
 * "함께 발화하는 뉴런은 함께 연결된다"
 * 동시 활성화 → 가중치 강화 / 비활성 → 서서히 약화
 */
function simulateLearning() {
  for (const e of edges) {
    const co = e.src.activation * e.dst.activation;  // 동시 활성화 정도
    if (co > 0.25) {
      // 강화 (LTP: 장기 강화)
      e.targetWeight = Math.min(1.0, e.targetWeight + co * 0.06);
      // 강화 시각화: 스파크 발생
      if (Math.random() < co * 0.15) spawnSpark(e, Math.random() * 0.3);
    } else if (co < 0.04 && Math.random() < 0.004) {
      // 약화 (LTD: 장기 억제)
      e.targetWeight = Math.max(0.05, e.targetWeight - 0.055);
    }
    // 부드러운 가중치 수렴
    e.weight += (e.targetWeight - e.weight) * 0.003;
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
  triggerPass();  // 즉시 신호 전파
  cursorEl.classList.add('clicking');
  flashEl.classList.add('on');
  setTimeout(() => { flashEl.classList.remove('on'); cursorEl.classList.remove('clicking'); }, 80);
  pushLog('ev-click', '🤌 신호 전파');
});

control.on('scroll', (e) => {
  targetCamZ = Math.max(3.2, Math.min(13, targetCamZ + e.deltaY * 0.055));
  const zoom = Math.round((1 - (targetCamZ - 3.2) / 9.8) * 100);
  sZoomEl.textContent = `${zoom}%`;
  pushLog('ev-scroll', e.deltaY > 0 ? '✊ 줌아웃' : '🖐️ 줌인');
});

const GCFG = {
  thumbsup:   { label: '👍 LTP 강화' },
  thumbsdown: { label: '👎 LTD 억제' },
  victory:    { label: '✌️ 학습률 증가' },
  iloveyou:   { label: '🤟 풀 패스' },
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

  // ── 자동 순전파 ──
  if (nowMs - lastPassMs > PASS_INTERVAL_MS) {
    lastPassMs = nowMs;
    triggerPass();
  }

  // ── 헤브 학습 시뮬레이션 ──
  if (nowMs - lastLearnMs > LEARN_INTERVAL_MS) {
    lastLearnMs = nowMs;
    simulateLearning();
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
  coreBright.material.opacity      = 0.85 + 0.15 * inputAct + 0.06 * Math.sin(t * 3);
  coreIcoSolid.material.opacity    = 0.20 + 0.22 * inputAct;
  coreIcoWire.material.opacity     = 0.85 + 0.15 * inputAct;
  coreOctaSolid.material.opacity   = 0.15 + 0.20 * inputAct;
  coreOctaWire.material.opacity    = 0.78 + 0.20 * inputAct;
  // 와이어프레임 자체 회전 (디지털 메커니컬 느낌)
  coreIcoPivot.rotation.y  += 0.013;
  coreIcoPivot.rotation.x  += 0.006;
  coreOctaPivot.rotation.y -= 0.009;
  coreOctaPivot.rotation.z += 0.007;
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
  startBtn.textContent = '초기화 중...';
  loadMsg.textContent  = 'MediaPipe 모델 로딩 중 (5~10초)';
  sStatus.textContent  = '초기화중';
  try {
    await control.start();
    control.createPanel();
    sStatus.textContent = '감지중';
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.style.display = 'none'; }, 650);
    pushLog('', '시작');
    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') { control.recalibrate(); pushLog('', '캘리브레이션 재설정'); }
    });
  } catch (err) {
    sStatus.textContent  = '오류';
    loadMsg.textContent  = `오류: ${err.message}`;
    startBtn.disabled    = false;
    startBtn.textContent = '다시 시도';
    console.error(err);
  }
});

// ─── Resize ───
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
