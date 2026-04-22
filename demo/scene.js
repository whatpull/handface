import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import brainObjUrl from './brain.obj?url';
import { HandControl } from '../src/index.ts';
import { NeuronFaceBackend } from './neuronface-backend.js';

// ─────────────────────────────────────────
// Neural backend — NeuronFace (stub in 3c; real HTTP in 3d)
// ─────────────────────────────────────────
function createBackend() {
  // TODO(3d): read API key from handface-neuronface-v1 localStorage
  return new NeuronFaceBackend();
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
// IRIS 실제 구조 기반 기본값 (28레이어)
// 처음부터 올바른 구조로 시작
let LAYER_SIZES = [
  6, 8, 12, 16, 20, 24, 28,  // 레이어 0~6  (embedding/초반)
  32, 36, 40, 44, 48, 48,    // 레이어 7~12 (semantic)
  48, 48, 48, 48,            // 레이어 13~16 (reasoning 중심)
  44, 40, 36, 32, 28,        // 레이어 17~21 (후반)
  24, 20, 16, 12, 8, 6,      // 레이어 22~27 (generation/출력)
];  // 총 28레이어
let LAYER_RADII = makeLayerRadii(LAYER_SIZES.length);
const K_FORWARD   = 4;
const K_BACKWARD  = 3;
const K_INTRA     = 3;

// pending timer 추적 (재빌드 시 취소용)
let passTimers = [];

// 재빌드용 Three.js 객체 참조
let edgeMesh     = null;
let nodeHaloMesh = null;
let nodeCoreMesh = null;

// LAYER_RADII 자동 생성 함수
function makeLayerRadii(n) {
  return Array.from(
    { length: n },
    (_, i) => 2.45 - (2.45 - 0.35) * (i / Math.max(n - 1, 1))
  );
}

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

let layerData = [];
let allNodes  = [];

function buildLayerData() {
  layerData = LAYER_SIZES.map((count, li) =>
    brainShape(count, LAYER_RADII[li]).map((pos, localIdx) => ({
      pos,
      activation:       0,
      targetActivation: 0,
      layerIdx:         li,
      layerLocalIdx:    localIdx,
    }))
  );
  allNodes = layerData.flat();
}

// 초기 빌드
buildLayerData();

// ─── K-최근접 시냅스 엣지 (inter-layer + intra-layer, 중복 제거) ───
let edges         = [];
let edgeSet       = new Set();
let nodeIdx       = new Map();
let incomingEdges = new Map();
let outgoingEdges = new Map();

function buildEdgeData() {
  edges         = [];
  edgeSet       = new Set();
  nodeIdx       = new Map();
  incomingEdges = new Map();
  outgoingEdges = new Map();

  allNodes.forEach((n, i) => nodeIdx.set(n, i));

  function tryAddEdge(src, dst, intra) {
    const key = nodeIdx.get(src) * allNodes.length + nodeIdx.get(dst);
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    const dx = dst.pos.x - src.pos.x;
    const dy = dst.pos.y - src.pos.y;
    const dz = dst.pos.z - src.pos.z;
    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
    const w = intra
      ? 0.3 + Math.random() * 0.4
      : 0.5 + Math.random() * 0.5;
    const e = { src, dst, weight: w, targetWeight: w, intra, dist,
                flow: 0, curve: null, curvePoints: null };
    edges.push(e);
    if (!outgoingEdges.has(src)) outgoingEdges.set(src, []);
    if (!incomingEdges.has(dst)) incomingEdges.set(dst, []);
    outgoingEdges.get(src).push(e);
    incomingEdges.get(dst).push(e);
  }

  // Forward edges
  for (let li = 0; li < LAYER_SIZES.length - 1; li++) {
    const srcLayer = layerData[li];
    const dstLayer = layerData[li + 1];
    for (const src of srcLayer) {
      const sorted = [...dstLayer].sort((a, b) => {
        const da = Math.hypot(
          a.pos.x-src.pos.x, a.pos.y-src.pos.y, a.pos.z-src.pos.z);
        const db = Math.hypot(
          b.pos.x-src.pos.x, b.pos.y-src.pos.y, b.pos.z-src.pos.z);
        return da - db;
      });
      for (let k = 0; k < Math.min(K_FORWARD, sorted.length); k++)
        tryAddEdge(src, sorted[k], false);
    }
  }

  // Backward edges
  for (let li = 1; li < LAYER_SIZES.length; li++) {
    const dstLayer = layerData[li];
    const srcLayer = layerData[li - 1];
    for (const dst of dstLayer) {
      const sorted = [...srcLayer].sort((a, b) => {
        const da = Math.hypot(
          a.pos.x-dst.pos.x, a.pos.y-dst.pos.y, a.pos.z-dst.pos.z);
        const db = Math.hypot(
          b.pos.x-dst.pos.x, b.pos.y-dst.pos.y, b.pos.z-dst.pos.z);
        return da - db;
      });
      for (let k = 0; k < Math.min(K_BACKWARD, sorted.length); k++)
        tryAddEdge(sorted[k], dst, false);
    }
  }

  // Intra-layer edges
  for (let li = 0; li < LAYER_SIZES.length; li++) {
    const layer = layerData[li];
    for (const src of layer) {
      const sorted = [...layer]
        .filter(n => n !== src)
        .sort((a, b) => {
          const da = Math.hypot(
            a.pos.x-src.pos.x, a.pos.y-src.pos.y, a.pos.z-src.pos.z);
          const db = Math.hypot(
            b.pos.x-src.pos.x, b.pos.y-src.pos.y, b.pos.z-src.pos.z);
          return da - db;
        });
      for (let k = 0; k < Math.min(K_INTRA, sorted.length); k++)
        tryAddEdge(src, sorted[k], true);
    }
  }
}

// 초기 빌드
buildEdgeData();

// ─────────────────────────────────────────
// 뇌 외곽 와이어프레임 (참고 이미지처럼 뇌 실루엣이 보이도록)
// brainShape 비율을 그대로 가져온 변형 구체를 반투명 와이어로 표현
// ─────────────────────────────────────────
// ─── 뇌 외곽: 로컬 OBJ 모델 로드 ───
// 뇌 표면: Fresnel 림 쉐이더 — 외곽은 밝고 중앙은 투명한 홀로그래픽 글로우
// 튜닝: rimPower 낮추면 글로우가 전체로 퍼짐, 높이면 얇은 외곽선에 가까워짐
const brainRimMat = new THREE.ShaderMaterial({
  uniforms: {
    rimColor:     { value: new THREE.Color(0x66BBFF) },
    rimIntensity: { value: 1.0 },
    rimPower:     { value: 2.8 },
    coreColor:    { value: new THREE.Color(0x1A4488) },
    coreAlpha:    { value: 0.02 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      vNormal  = normalize(normalMatrix * normal);
      vViewDir = normalize(-mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform vec3  rimColor;
    uniform float rimIntensity;
    uniform float rimPower;
    uniform vec3  coreColor;
    uniform float coreAlpha;
    void main() {
      // abs() → DoubleSide 에서 앞/뒤 모두 자연스럽게 글로우
      float f   = 1.0 - abs(dot(vViewDir, vNormal));
      float rim = pow(f, rimPower) * rimIntensity;
      vec3  col = rimColor * rim + coreColor * coreAlpha;
      gl_FragColor = vec4(col, rim + coreAlpha);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
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
        // 버텍스 노말 재계산 → 스무드 쉐이딩 (Fresnel 효과에 필수)
        node.geometry.computeVertexNormals();
        node.material = brainRimMat;
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
// 구 HUD 요소 (IRIS-전용 패널로 교체됨) — init 블록 null-guard 유지
const inputGridEl = document.getElementById('input-grid');
const inputCellFills = [];
const inputCellVals  = [];
if (inputGridEl) {
  inputGridEl.style.gridTemplateColumns = `repeat(${LAYER_SIZES[0]}, 1fr)`;
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
}

const weightListEl = document.getElementById('weight-list');
const weightRowEls = [];
if (weightListEl) {
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
}

// ── Top-K next-char predictions panel (IRIS-전용 패널로 교체됨) ──
const predListEl = document.getElementById('pred-list');
const PRED_K = 8;
const predRowEls = [];
if (predListEl) {
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
}

// updatePredictions / loss sparkline were IRIS-specific HUD panels.
// Removed in 3c; neuron-firing visualization will replace them in 3e.

// ─────────────────────────────────────────
// Backend event router (NeuronFace; real shapes wired in 3d/3e)
// ─────────────────────────────────────────
function backendEventHandler(event) {
  // TODO(3d): handle connection-status events from NeuronFaceBackend
  // TODO(3e): handle neuron-firing events and route into 3D viewer
  switch (event?.type) {
    case 'neuron-firing':
      // TODO(3e): drive node activations + edge spark from firing rates
      break;
    case 'connection-status':
      // TODO(3d): reflect online/offline in HUD
      break;
    default:
      // IRIS events (generate-token/generate-end/training-*) were removed in 3c.
      // Unknown types silently ignored during stub phase.
      break;
  }
}
backend.onEvent(backendEventHandler);

// Initial edge weight sync + net info panel were IRIS-driven. Removed in 3c.
// 3e will reintroduce an initial sync once /presets/basic returns the synapse
// list from the neuronface API.

// ─────────────────────────────────────────
// 엣지 지오메트리 (버텍스 컬러 → 매 프레임 가중치 반영)
// ─────────────────────────────────────────
// 곡선 엣지 세그먼트 상수 (animate 루프에서도 참조되므로 모듈 스코프 유지)
const CURVE_SEGMENTS = 10;
const VERTS_PER_EDGE = CURVE_SEGMENTS * 2;

function buildNetworkGeometry() {
  console.log(`[handface] nodes: ${allNodes.length}, edges: ${edges.length}`);
  const _curveDir  = new THREE.Vector3();
  const _curveAxis = new THREE.Vector3();
  const _curveN    = new THREE.Vector3();
  const _refUp     = new THREE.Vector3(0, 1, 0);

  edges.forEach((e, i) => {
    _curveDir.subVectors(e.dst.pos, e.src.pos);
    const len  = _curveDir.length();
    const seed = ((i * 9301 + 49297) % 233280) / 233280;
    _curveAxis.copy(_curveDir).normalize();
    _curveN.crossVectors(_curveDir, _refUp);
    if (_curveN.lengthSq() < 1e-6) _curveN.set(1, 0, 0);
    _curveN.normalize();
    _curveN.applyAxisAngle(_curveAxis, seed * Math.PI * 2);
    const strength = len * (0.10 + seed * 0.08)
      * (e.intra ? 1.4 : 1.0);
    const mid = new THREE.Vector3()
      .addVectors(e.src.pos, e.dst.pos).multiplyScalar(0.5)
      .addScaledVector(_curveN, strength);
    e.curve       = new THREE.QuadraticBezierCurve3(
      e.src.pos.clone(), mid, e.dst.pos.clone());
    e.curvePoints = e.curve.getPoints(CURVE_SEGMENTS);
  });

  const ePosArr = new Float32Array(
    edges.length * VERTS_PER_EDGE * 3);
  const eColArr = new Float32Array(
    edges.length * VERTS_PER_EDGE * 3);

  edges.forEach((e, i) => {
    const base = i * VERTS_PER_EDGE * 3;
    const b = e.weight * 0.12;
    for (let s = 0; s < CURVE_SEGMENTS; s++) {
      const a   = e.curvePoints[s];
      const c   = e.curvePoints[s + 1];
      const off = base + s * 6;
      ePosArr[off+0] = a.x; ePosArr[off+1] = a.y; ePosArr[off+2] = a.z;
      ePosArr[off+3] = c.x; ePosArr[off+4] = c.y; ePosArr[off+5] = c.z;
      eColArr[off+0] = b;   eColArr[off+1] = b*0.4; eColArr[off+2] = b*0.05;
      eColArr[off+3] = b;   eColArr[off+4] = b*0.4; eColArr[off+5] = b*0.05;
    }
  });

  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute('position',
    new THREE.BufferAttribute(ePosArr, 3));
  edgeGeo.setAttribute('color',
    new THREE.BufferAttribute(eColArr, 3));

  // 기존 edgeMesh 제거
  if (edgeMesh) {
    network.remove(edgeMesh);
    edgeMesh.geometry.dispose();
    edgeMesh.material.dispose();
    edgeMesh = null;
  }

  edgeMesh = new THREE.LineSegments(edgeGeo,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      blending:     THREE.AdditiveBlending,
      transparent:  true,
      depthWrite:   false,
    })
  );
  network.add(edgeMesh);

  // ── 노드 지오메트리 ──────────────────────────
  const nPosArr  = new Float32Array(allNodes.length * 3);
  const nHaloArr = new Float32Array(allNodes.length * 3);
  const nCoreArr = new Float32Array(allNodes.length * 3);

  allNodes.forEach((n, i) => {
    nPosArr[i*3]   = n.pos.x;
    nPosArr[i*3+1] = n.pos.y;
    nPosArr[i*3+2] = n.pos.z;
    nHaloArr[i*3+0] = 0.08; nHaloArr[i*3+1] = 0.03; nHaloArr[i*3+2] = 0.01;
    nCoreArr[i*3+0] = 0.20; nCoreArr[i*3+1] = 0.08; nCoreArr[i*3+2] = 0.02;
  });

  // 기존 nodeHaloMesh / nodeCoreMesh 제거
  if (nodeHaloMesh) {
    network.remove(nodeHaloMesh);
    nodeHaloMesh.geometry.dispose();
    nodeHaloMesh.material.dispose();
    nodeHaloMesh = null;
  }
  if (nodeCoreMesh) {
    network.remove(nodeCoreMesh);
    nodeCoreMesh.geometry.dispose();
    nodeCoreMesh.material.dispose();
    nodeCoreMesh = null;
  }

  function makeNodePoints(colArr, size, sharedPos, sprite) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position',
      new THREE.BufferAttribute(sharedPos, 3));
    geo.setAttribute('color',
      new THREE.BufferAttribute(colArr, 3));
    const mesh = new THREE.Points(geo,
      new THREE.PointsMaterial({
        vertexColors: true,
        size,
        map:          sprite,
        alphaTest:    0.01,
        blending:     THREE.AdditiveBlending,
        transparent:  true,
        depthWrite:   false,
      })
    );
    network.add(mesh);
    return { geo, mesh };
  }

  const halo = makeNodePoints(nHaloArr, 0.18, nPosArr, SPRITE_SOFT);
  const core = makeNodePoints(nCoreArr, 0.065, nPosArr, SPRITE_SHARP);

  nodeHaloMesh = halo.mesh;
  nodeCoreMesh = core.mesh;

  // animate 루프에서 참조하는 지오메트리 반환
  return {
    nodeHaloGeo: halo.geo,
    nodeCoreGeo: core.geo,
    edgeGeo,
    nHaloArr,
    nCoreArr,
    ePosArr,
    eColArr,
  };
}

// ── 초기 빌드 + 반환값 전역 보존 ─────────────
let geoRefs = buildNetworkGeometry();

// 초기 네트워크 투명하게 시작
// (모델 정보 수신 후 페이드 인)
if (edgeMesh)     edgeMesh.material.opacity     = 0;
if (nodeHaloMesh) nodeHaloMesh.material.opacity = 0;
if (nodeCoreMesh) nodeCoreMesh.material.opacity = 0;

async function rebuildNetwork(newLayerSizes, layerDetails = [], skipFadeOut = false) {
  if (!newLayerSizes || newLayerSizes.length === 0) return;

  console.log(
    '[IRIS viz] 네트워크 리빌드:',
    newLayerSizes.length, '레이어,',
    newLayerSizes.reduce((a, b) => a+b, 0), '노드'
  );

  // ── 1. pending timers 취소 ─────────────────
  passTimers.forEach(id => clearTimeout(id));
  passTimers = [];

  // ── 2. sparkPool 초기화 ────────────────────
  if (typeof sparkPool !== 'undefined') sparkPool.length = 0;

  // ── 3. 페이드 아웃 (skipFadeOut 이면 스킵) ──
  if (!skipFadeOut) {
    await new Promise(resolve => {
      let opacity = 1.0;
      const id = setInterval(() => {
        opacity -= 0.08;
        if (edgeMesh)     edgeMesh.material.opacity     = Math.max(0, opacity);
        if (nodeHaloMesh) nodeHaloMesh.material.opacity = Math.max(0, opacity);
        if (nodeCoreMesh) nodeCoreMesh.material.opacity = Math.max(0, opacity);
        if (opacity <= 0) { clearInterval(id); resolve(); }
      }, 16);
    });
  }

  // ── 4. LAYER_SIZES / LAYER_RADII 업데이트 ──
  LAYER_SIZES.length = 0;
  newLayerSizes.forEach(s => LAYER_SIZES.push(s));
  LAYER_RADII.length = 0;
  makeLayerRadii(LAYER_SIZES.length).forEach(r => LAYER_RADII.push(r));

  // ── 5. 데이터 재빌드 ──────────────────────
  buildLayerData();
  buildEdgeData();
  geoRefs = buildNetworkGeometry();

  // ── 6. 페이드 인 ───────────────────────────
  await new Promise(resolve => {
    let opacity = 0;
    const id = setInterval(() => {
      opacity += 0.04;
      if (edgeMesh)     edgeMesh.material.opacity     = Math.min(1, opacity);
      if (nodeHaloMesh) nodeHaloMesh.material.opacity = Math.min(1, opacity);
      if (nodeCoreMesh) nodeCoreMesh.material.opacity = Math.min(1, opacity);
      if (opacity >= 1) { clearInterval(id); resolve(); }
    }, 16);
  });

  console.log('[IRIS viz] 네트워크 리빌드 완료 ✅');
}

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
  vertexColors: true, size: 0.11, map: SPRITE_SHARP, alphaTest: 0.01,
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

// ── Shockwave: 입력 활성도 급증 시 코어→뇌 표면으로 퍼지는 파동 ──
// 멀리서도 잘 보이는 거대 이벤트 효과
const shockwaveMat = new THREE.MeshBasicMaterial({
  color: 0xFFCC88, blending: THREE.AdditiveBlending,
  transparent: true, opacity: 0, depthWrite: false, side: THREE.BackSide,
});
const shockwave = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), shockwaveMat);
shockwave.scale.setScalar(0.3);
shockwave.visible = false;
coreGroup.add(shockwave);
// 활성 파동 상태 (life: 1→0 으로 감쇠, 0이면 비가시)
let shockwaveLife = 0;
let prevInputAct  = 0;

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
 * TODO(3e): rewrite to accept neuronface firing rates.
 *
 * Previous IRIS implementation forwarded the dummy model and mapped
 * per-layer activations + scheduled cross-layer sparks with delays.
 * After 3e this will consume `response.top_active_neurons` / `rates_by_region`
 * from /handface_and_observe and drive node.targetActivation directly.
 * Kept as a no-op stub during 3c so call sites can be wired without errors.
 */
function triggerPass(_seedText = null) {
  // TODO(3e): map firing rates (from NeuronFaceBackend 'neuron-firing' event)
  // onto layerData[*].targetActivation, scheduling inter-layer sparks.
}

/**
 * TODO(3e): accept neuronface membrane_response_by_region instead of
 * iris attention matrices (7 arrays of 0..1 values). Target shape is
 * roughly { INPUT: {...}, V1: {...}, V2: {...}, OUT: {...} } mapping
 * onto 4 pseudo-layers in the refreshed layout.
 */
function triggerPassWithAttention(_membraneResponse) {
  // TODO(3e): translate membrane_response_by_region into per-layer
  // node activations + spark propagation.
}

/**
 * TODO(3e): accept neuronface synapse list `[{pre, post, weight, delay}]`
 * instead of iris W1..W4 matrices. Map each edge e = (src neuron, dst neuron)
 * directly to the corresponding synapse.weight via a (preName, postName) key.
 * Kept as a stub during 3c; no-op is safe because edges retain their
 * default targetWeight from buildNetworkGeometry().
 */
function syncEdgeWeightsFromModel(/* synapses */) {
  // TODO(3e): populate e.targetWeight from neuronface synapse list.
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
  coreBright.material.opacity = 0.55 + 0.30 * inputAct + 0.06 * Math.sin(t * 2.5)
                              + 0.60 * shockwaveLife; // 파동 트리거 시 일시적 번쩍
  coreHalo.material.opacity   = 0.08 + 0.18 * inputAct + 0.03 * Math.sin(t * 1.5)
                              + 0.25 * shockwaveLife;

  // ── Shockwave 업데이트 — 입력 활성도 급증 감지 → 파동 생성 ──
  const dInputAct = inputAct - prevInputAct;
  prevInputAct = inputAct;
  if (dInputAct > 0.05) shockwaveLife = 1.0; // 활성 도약 시 트리거
  if (shockwaveLife > 0) {
    shockwave.visible = true;
    // 수명: 1 → 0, 약 0.67초 (60fps 기준)
    const age = 1 - shockwaveLife; // 0 → 1
    // 크기: 코어(0.3) → 뇌 표면 근처(5.5), easeOutCubic
    const eased = 1 - Math.pow(1 - age, 3);
    shockwave.scale.setScalar(0.3 + eased * 5.5);
    // 불투명도: 시작 0.45 → 끝 0, 살짝 지연 페이드
    shockwaveMat.opacity = shockwaveLife * shockwaveLife * 0.45;
    shockwaveLife -= 0.025;
    if (shockwaveLife <= 0) { shockwaveLife = 0; shockwave.visible = false; }
  }

  // ── 엣지/노드/스파크 업데이트 (드래그 중에도 흐름 유지) ──

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
      geoRefs.eColArr[off]   = r;
      geoRefs.eColArr[off+1] = g;
      geoRefs.eColArr[off+2] = bl;
    }
  }
  geoRefs.edgeGeo.attributes.color.needsUpdate = true;

  // ── 노드 색상 업데이트 ──
  for (let i = 0; i < allNodes.length; i++) {
    const a = allNodes[i].activation;
    // 헤일로: 부드러운 앰버 글로우
    geoRefs.nHaloArr[i*3+0] = 0.08 + a * 0.52;
    geoRefs.nHaloArr[i*3+1] = 0.03 + a * 0.20;
    geoRefs.nHaloArr[i*3+2] = 0.01 + a * 0.03;
    // 코어: 활성화 시 밝은 화이트-옐로우
    geoRefs.nCoreArr[i*3+0] = 0.20 + a * 0.80;
    geoRefs.nCoreArr[i*3+1] = 0.08 + a * 0.68;
    geoRefs.nCoreArr[i*3+2] = 0.02 + a * 0.18;
  }
  geoRefs.nodeHaloGeo.attributes.color.needsUpdate = true;
  geoRefs.nodeCoreGeo.attributes.color.needsUpdate = true;

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
  // (updateNetInfo was IRIS-specific and removed in 3c; 3e will
  //  reintroduce a neuron-firing status panel if needed.)

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

    // Phase 2: NeuronFace backend (stubbed in 3c; real POST /networks + preset in 3d)
    loadMsg.textContent = 'Initializing neural circuit...';
    await backend.initialize();

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

    // TODO(3d): periodic health/firing stats poll (removed IRIS version)
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
