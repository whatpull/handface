import * as THREE from 'three';
import { HandControl } from '../src/index.ts';

// ─────────────────────────────────────────
// DOM refs
// ─────────────────────────────────────────
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
  const now = new Date();
  el.textContent = `[${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초] ${text}`;
  logEl.appendChild(el);
  while (logEl.children.length > 9) logEl.removeChild(logEl.children[1]);
  logEl.scrollTop = logEl.scrollHeight;
}

// ─────────────────────────────────────────
// Renderer
// ─────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000810);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ─────────────────────────────────────────
// Scene & Camera
// ─────────────────────────────────────────
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.z = 7;
let targetCamZ = 7;
let camZ       = 7;

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
/** Fibonacci lattice: n점을 구 표면에 균등 분포 */
function fibSphere(n, r) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const phi   = Math.acos(1 - 2 * (i + 0.5) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    pts.push(new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi),
    ).multiplyScalar(r));
  }
  return pts;
}

/** 각 노드에서 K개의 최근접 이웃까지 엣지 생성 */
function buildEdges(pts, K) {
  const verts = [];
  const seen  = new Set();
  const n     = pts.length;
  for (let i = 0; i < n; i++) {
    const sorted = pts
      .map((p, j) => ({ j, d: i !== j ? pts[i].distanceTo(p) : Infinity }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K);
    for (const { j } of sorted) {
      const key = Math.min(i, j) * n + Math.max(i, j);
      if (!seen.has(key)) {
        seen.add(key);
        verts.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
  }
  return new Float32Array(verts);
}

// ─────────────────────────────────────────
// JARVIS Network Sphere
// ─────────────────────────────────────────
const network = new THREE.Group();
scene.add(network);

// 외부 구 (메인 네트워크)
const outerPts  = fibSphere(200, 1.8);
const outerEdge = buildEdges(outerPts, 5);

const outerNodeGeo = new THREE.BufferGeometry().setFromPoints(outerPts);
const outerNodeMat = new THREE.PointsMaterial({
  color: 0xFFDD66, size: 0.052,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
});
network.add(new THREE.Points(outerNodeGeo, outerNodeMat));

const outerEdgeGeo = new THREE.BufferGeometry();
outerEdgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(outerEdge, 3));
const outerEdgeMat = new THREE.LineBasicMaterial({
  color: 0xFF8800, opacity: 0.30,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
});
network.add(new THREE.LineSegments(outerEdgeGeo, outerEdgeMat));

// 내부 구 (밀도 강조)
const innerPts  = fibSphere(90, 1.15);
const innerEdge = buildEdges(innerPts, 4);

const innerNodeGeo = new THREE.BufferGeometry().setFromPoints(innerPts);
const innerNodeMat = new THREE.PointsMaterial({
  color: 0xFFAA44, size: 0.04,
  blending: THREE.AdditiveBlending, transparent: true, opacity: 0.65, depthWrite: false,
});
network.add(new THREE.Points(innerNodeGeo, innerNodeMat));

const innerEdgeGeo = new THREE.BufferGeometry();
innerEdgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(innerEdge, 3));
const innerEdgeMat = new THREE.LineBasicMaterial({
  color: 0xFF9900, opacity: 0.22,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
});
network.add(new THREE.LineSegments(innerEdgeGeo, innerEdgeMat));

// ─────────────────────────────────────────
// Core Glow (중심 발광)
// ─────────────────────────────────────────
const mkSphere = (r, col, op) => {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(r, 32, 32),
    new THREE.MeshBasicMaterial({
      color: col, blending: THREE.AdditiveBlending, transparent: true, opacity: op, depthWrite: false,
    }),
  );
  scene.add(m);
  return m;
};
const coreHalo   = mkSphere(0.55, 0xFF7700, 0.10);
const coreMid    = mkSphere(0.25, 0xFF9900, 0.45);
const coreCenter = mkSphere(0.11, 0xFFFFFF, 0.95);

// ─────────────────────────────────────────
// Orbital Rings
// ─────────────────────────────────────────
const mkRing = (r, tube, op, rx, rz) => {
  const m = new THREE.Mesh(
    new THREE.TorusGeometry(r, tube, 8, 220),
    new THREE.MeshBasicMaterial({
      color: 0xFF9900, blending: THREE.AdditiveBlending, transparent: true, opacity: op, depthWrite: false,
    }),
  );
  m.rotation.x = rx;
  m.rotation.z = rz;
  scene.add(m);
  return m;
};

const ring1 = mkRing(2.55, 0.007, 0.75, Math.PI / 2, 0);
const ring2 = mkRing(2.25, 0.006, 0.55, 0.35,        0.25);
const ring3 = mkRing(2.05, 0.005, 0.42, -0.28,       1.05);
const ring4 = mkRing(3.15, 0.005, 0.28, 1.15,        0.45);

// ─────────────────────────────────────────
// Outer Particles (주변 파티클)
// ─────────────────────────────────────────
const PART_N   = 750;
const partPos  = new Float32Array(PART_N * 3);
for (let i = 0; i < PART_N; i++) {
  const r     = 2.3 + Math.random() * 2.5;
  const phi   = Math.random() * Math.PI * 2;
  const theta = Math.random() * Math.PI;
  partPos[i * 3]     = r * Math.sin(theta) * Math.cos(phi);
  partPos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
  partPos[i * 3 + 2] = r * Math.cos(theta);
}
const partGeo = new THREE.BufferGeometry();
partGeo.setAttribute('position', new THREE.Float32BufferAttribute(partPos, 3));
const partMesh = new THREE.Points(partGeo, new THREE.PointsMaterial({
  color: 0xFF8800, size: 0.02,
  blending: THREE.AdditiveBlending, transparent: true, opacity: 0.6, depthWrite: false,
}));
scene.add(partMesh);

// ─────────────────────────────────────────
// Pulse Rings (클릭 효과)
// ─────────────────────────────────────────
const pulsePool = [];
function triggerPulse() {
  for (let k = 0; k < 3; k++) {
    const geo = new THREE.TorusGeometry(0.08, 0.018, 8, 64);
    const mat = new THREE.MeshBasicMaterial({
      color:   k === 0 ? 0xFFFFFF : 0xFFAA33,
      blending: THREE.AdditiveBlending, transparent: true, opacity: 1.0, depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    scene.add(mesh);
    pulsePool.push({ mesh, scale: 0.2 + k * 0.12, life: 1.0 - k * 0.08, speed: 0.055 + k * 0.018 });
  }
}

// ─────────────────────────────────────────
// Hand / Gaze Control
// ─────────────────────────────────────────
const control = new HandControl({
  handedness:   'right',
  cursorSource: 'gaze',
});

let targetOffsetX = 0, targetOffsetY = 0;
let smoothOffsetX = 0, smoothOffsetY = 0;
let baseRotY      = 0;
let clickCount    = 0;

control.on('move', (e) => {
  cursorEl.style.left  = `${e.screenX}px`;
  cursorEl.style.top   = `${e.screenY}px`;
  sPosEl.textContent   = `${e.screenX} · ${e.screenY}`;
  targetOffsetY = (e.x - 0.5) * Math.PI * 2.2;
  targetOffsetX = (e.y - 0.5) * Math.PI * 1.0;
});

control.on('click', () => {
  clickCount++;
  sClicksEl.textContent = String(clickCount);
  triggerPulse();
  cursorEl.classList.add('clicking');
  flashEl.classList.add('on');
  setTimeout(() => {
    flashEl.classList.remove('on');
    cursorEl.classList.remove('clicking');
  }, 80);
  pushLog('ev-click', '🤌 스캔 실행');
});

control.on('scroll', (e) => {
  targetCamZ = Math.max(3.5, Math.min(11, targetCamZ + e.deltaY * 0.055));
  const zoom = Math.round((1 - (targetCamZ - 3.5) / 7.5) * 100);
  sZoomEl.textContent = `${zoom}%`;
  pushLog('ev-scroll', `${e.deltaY > 0 ? '✊ 줌아웃' : '🖐️ 줌인'}`);
});

// 제스처 컬러 반응
const GESTURE_CFG = {
  thumbsup:   { node: 0x44FFCC, edge: 0x00DDAA, label: '👍 시스템 활성' },
  thumbsdown: { node: 0xFF4444, edge: 0xCC2222, label: '👎 경보' },
  victory:    { node: 0xFFFF44, edge: 0xCCCC00, label: '✌️ 분석 완료' },
  iloveyou:   { node: 0xFF88CC, edge: 0xCC4488, label: '🤟 연결 확인' },
};
for (const [g, cfg] of Object.entries(GESTURE_CFG)) {
  control.on(g, () => {
    outerNodeMat.color.setHex(cfg.node);
    outerEdgeMat.color.setHex(cfg.edge);
    setTimeout(() => {
      outerNodeMat.color.setHex(0xFFDD66);
      outerEdgeMat.color.setHex(0xFF8800);
    }, 900);
    pushLog('', cfg.label);
  });
}

// ─────────────────────────────────────────
// Animation Loop
// ─────────────────────────────────────────
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.012;

  // 네트워크 회전: 자동 Y + 시선 오프셋
  baseRotY   += 0.003;
  smoothOffsetX += (targetOffsetX - smoothOffsetX) * 0.035;
  smoothOffsetY += (targetOffsetY - smoothOffsetY) * 0.035;
  network.rotation.x = smoothOffsetX;
  network.rotation.y = baseRotY + smoothOffsetY;

  // 구 호흡 (gentle pulse)
  const breath = 1 + 0.018 * Math.sin(t * 0.9);
  network.scale.setScalar(breath);

  // 코어 발광 애니메이션
  coreMid.material.opacity    = 0.38 + 0.18 * Math.sin(t * 1.6);
  coreCenter.material.opacity = 0.85 + 0.12 * Math.sin(t * 2.4);

  // 링 회전
  ring1.rotation.y += 0.004;
  ring2.rotation.y += 0.003;
  ring3.rotation.z += 0.0018;
  ring4.rotation.y -= 0.0012;

  // 파티클 서서히 회전
  partMesh.rotation.y += 0.0006;
  partMesh.rotation.x += 0.0003;

  // 카메라 줌
  camZ += (targetCamZ - camZ) * 0.055;
  camera.position.z = camZ;

  // 펄스 링 업데이트
  for (let i = pulsePool.length - 1; i >= 0; i--) {
    const p = pulsePool[i];
    p.scale += p.speed;
    p.life  -= 0.038;
    p.mesh.scale.setScalar(p.scale);
    p.mesh.material.opacity = Math.max(0, p.life);
    if (p.life <= 0) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      pulsePool.splice(i, 1);
    }
  }

  renderer.render(scene, camera);
}
animate();

// ─────────────────────────────────────────
// Start Button
// ─────────────────────────────────────────
startBtn.addEventListener('click', async () => {
  startBtn.disabled    = true;
  startBtn.textContent = 'LOADING...';
  loadMsg.textContent  = 'AI 모델 초기화 중 (5~10초)';
  sStatus.textContent  = 'INIT';

  try {
    await control.start();
    control.createPanel();
    sStatus.textContent = 'ACTIVE';
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.style.display = 'none'; }, 650);
    pushLog('', '시스템 초기화 완료');

    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') {
        control.recalibrate();
        pushLog('', '캘리브레이션 재설정');
      }
    });
  } catch (err) {
    sStatus.textContent  = 'ERROR';
    loadMsg.textContent  = `오류: ${err.message}`;
    startBtn.disabled    = false;
    startBtn.textContent = 'RETRY';
    console.error(err);
  }
});

// ─────────────────────────────────────────
// Resize
// ─────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
