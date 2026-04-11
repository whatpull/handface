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
  const d = new Date();
  el.textContent = `[${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}] ${text}`;
  logEl.appendChild(el);
  while (logEl.children.length > 9) logEl.removeChild(logEl.children[1]);
}

// ─────────────────────────────────────────
// Renderer
// ─────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x020408);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ─────────────────────────────────────────
// Scene & Camera
// ─────────────────────────────────────────
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.z = 6.5;
let targetCamZ = 6.5;
let camZ       = 6.5;

// ─────────────────────────────────────────
// 수학 헬퍼
// ─────────────────────────────────────────

/** Box-Muller 정규분포 난수 */
function gaussRand() {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * 중심이 조금 더 밀집된 3D 가우시안 포인트 클라우드
 * → 표면이 아니라 볼륨 안에 자유롭게 분포
 */
function cloudPoint(sigma, maxR) {
  let p;
  do {
    p = new THREE.Vector3(gaussRand() * sigma, gaussRand() * sigma, gaussRand() * sigma);
  } while (p.length() > maxR);
  return p;
}

// ─────────────────────────────────────────
// 노드 생성 (볼륨 분포)
// ─────────────────────────────────────────
const NODE_N = 300;
const SIGMA  = 0.85;  // 분포 표준편차
const MAX_R  = 2.2;   // 최대 반경 (부드럽게 잘림)

const nodes = Array.from({ length: NODE_N }, () => cloudPoint(SIGMA, MAX_R));

// ─────────────────────────────────────────
// K-최근접 이웃 직선 엣지 (구 표면 아님 → 직선)
// 내부(중심 가까운) 엣지 → 밝은 레이어
// 외부 엣지 → 어두운 레이어
// ─────────────────────────────────────────
function buildEdges(pts, K) {
  const seen   = new Set();
  const bright = [];
  const dim    = [];
  const n      = pts.length;

  for (let i = 0; i < n; i++) {
    const sorted = pts
      .map((p, j) => ({ j, d: i !== j ? pts[i].distanceTo(p) : Infinity }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K);

    for (const { j } of sorted) {
      const key = Math.min(i, j) * n + Math.max(i, j);
      if (seen.has(key)) continue;
      seen.add(key);

      const a    = pts[i], b = pts[j];
      const avgR = (a.length() + b.length()) / 2;
      // 중심부 엣지 + 무작위 25% → 밝은 레이어
      const buf  = avgR < 0.65 || Math.random() < 0.25 ? bright : dim;
      buf.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  return { bright: new Float32Array(bright), dim: new Float32Array(dim) };
}

const { bright: brightV, dim: dimV } = buildEdges(nodes, 5);

// ─────────────────────────────────────────
// 네트워크 메쉬
// ─────────────────────────────────────────
const network = new THREE.Group();
scene.add(network);

// 어두운 기본 엣지
const dimGeo = new THREE.BufferGeometry();
dimGeo.setAttribute('position', new THREE.Float32BufferAttribute(dimV, 3));
network.add(new THREE.LineSegments(dimGeo, new THREE.LineBasicMaterial({
  color: 0xBB4400, opacity: 0.20,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
})));

// 밝은 강조 엣지
const brightGeo = new THREE.BufferGeometry();
brightGeo.setAttribute('position', new THREE.Float32BufferAttribute(brightV, 3));
const brightMat = new THREE.LineBasicMaterial({
  color: 0xFF8800, opacity: 0.58,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
});
network.add(new THREE.LineSegments(brightGeo, brightMat));

// 일반 노드
const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
network.add(new THREE.Points(nodeGeo, new THREE.PointsMaterial({
  color: 0xFFAA44, size: 0.045,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
})));

// 강조 노드 (중심부 + 무작위 18%)
const accentPts = nodes.filter(p => p.length() < 0.5 || Math.random() < 0.18);
const accentGeo = new THREE.BufferGeometry().setFromPoints(accentPts);
network.add(new THREE.Points(accentGeo, new THREE.PointsMaterial({
  color: 0xFFDD88, size: 0.085,
  blending: THREE.AdditiveBlending, transparent: true, opacity: 0.9, depthWrite: false,
})));

// ─────────────────────────────────────────
// 중심 코어 글로우 (은은하게)
// ─────────────────────────────────────────
const mkGlow = (r, col, op) => {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(r, 32, 32),
    new THREE.MeshBasicMaterial({
      color: col, blending: THREE.AdditiveBlending, transparent: true, opacity: op, depthWrite: false,
    }),
  );
  scene.add(m);
  return m;
};
const glowOuter  = mkGlow(0.50, 0xCC4400, 0.07);
const glowMid    = mkGlow(0.22, 0xFF7700, 0.38);
const glowCenter = mkGlow(0.10, 0xFFFFFF, 0.88);

// ─────────────────────────────────────────
// 배경 별 (스타필드)
// ─────────────────────────────────────────
const STAR_N  = 2200;
const starPos = new Float32Array(STAR_N * 3);
for (let i = 0; i < STAR_N; i++) {
  const r     = 7 + Math.random() * 20;
  const u     = Math.random(), v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi   = Math.acos(2 * v - 1);
  starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
  starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  starPos[i * 3 + 2] = r * Math.cos(phi);
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
  color: 0xFFCC99, size: 0.018,
  blending: THREE.AdditiveBlending, transparent: true, opacity: 0.45, depthWrite: false,
})));

// ─────────────────────────────────────────
// 클릭 펄스
// ─────────────────────────────────────────
const pulsePool = [];
function triggerPulse() {
  for (let k = 0; k < 3; k++) {
    const geo  = new THREE.TorusGeometry(0.06, 0.014, 8, 64);
    const mat  = new THREE.MeshBasicMaterial({
      color: k === 0 ? 0xFFFFFF : 0xFFAA33,
      blending: THREE.AdditiveBlending, transparent: true, opacity: 1.0, depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    scene.add(mesh);
    pulsePool.push({ mesh, scale: 0.15 + k * 0.1, life: 1.0 - k * 0.08, speed: 0.048 + k * 0.015 });
  }
}

// ─────────────────────────────────────────
// Hand / Gaze Control
// ─────────────────────────────────────────
const control = new HandControl({
  handedness:   'right',
  cursorSource: 'gaze',
});

let targetOffX = 0, targetOffY = 0;
let smoothOffX = 0, smoothOffY = 0;
let baseRotY   = 0;
let clickCount = 0;

control.on('move', (e) => {
  cursorEl.style.left = `${e.screenX}px`;
  cursorEl.style.top  = `${e.screenY}px`;
  sPosEl.textContent  = `${e.screenX} · ${e.screenY}`;
  targetOffY = (e.x - 0.5) * Math.PI * 2.2;
  targetOffX = (e.y - 0.5) * Math.PI * 1.0;
});

control.on('click', () => {
  clickCount++;
  sClicksEl.textContent = String(clickCount);
  triggerPulse();
  cursorEl.classList.add('clicking');
  flashEl.classList.add('on');
  setTimeout(() => { flashEl.classList.remove('on'); cursorEl.classList.remove('clicking'); }, 80);
  pushLog('ev-click', '🤌 클릭');
});

control.on('scroll', (e) => {
  targetCamZ = Math.max(3.0, Math.min(12, targetCamZ + e.deltaY * 0.055));
  const zoom = Math.round((1 - (targetCamZ - 3.0) / 9.0) * 100);
  sZoomEl.textContent = `${zoom}%`;
  pushLog('ev-scroll', e.deltaY > 0 ? '✊ 줌아웃' : '🖐️ 줌인');
});

const GCFG = {
  thumbsup:   { col: 0x44FFCC, label: '👍' },
  thumbsdown: { col: 0xFF4444, label: '👎' },
  victory:    { col: 0xFFFF44, label: '✌️' },
  iloveyou:   { col: 0xFF88CC, label: '🤟' },
};
for (const [g, cfg] of Object.entries(GCFG)) {
  control.on(g, () => {
    brightMat.color.setHex(cfg.col);
    setTimeout(() => brightMat.color.setHex(0xFF8800), 900);
    pushLog('', `${cfg.label} 감지`);
  });
}

// ─────────────────────────────────────────
// Animation Loop
// ─────────────────────────────────────────
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.011;

  // 시선 기반 회전 + 느린 자동 회전
  baseRotY   += 0.0022;
  smoothOffX += (targetOffX - smoothOffX) * 0.030;
  smoothOffY += (targetOffY - smoothOffY) * 0.030;
  network.rotation.x = smoothOffX;
  network.rotation.y = baseRotY + smoothOffY;

  // 전체 클라우드 호흡
  const breath = 1 + 0.014 * Math.sin(t * 0.8);
  network.scale.setScalar(breath);

  // 코어 맥동
  glowMid.material.opacity    = 0.32 + 0.16 * Math.sin(t * 1.5);
  glowCenter.material.opacity = 0.80 + 0.15 * Math.sin(t * 2.2);

  // 별 배경 아주 느리게 회전
  scene.children[scene.children.length - 1].rotation.y += 0.00005;

  // 카메라 줌
  camZ += (targetCamZ - camZ) * 0.055;
  camera.position.z = camZ;

  // 펄스
  for (let i = pulsePool.length - 1; i >= 0; i--) {
    const p = pulsePool[i];
    p.scale += p.speed;
    p.life  -= 0.035;
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
      if (e.key === 'r' || e.key === 'R') {
        control.recalibrate();
        pushLog('', '캘리브레이션 재설정');
      }
    });
  } catch (err) {
    sStatus.textContent  = '오류';
    loadMsg.textContent  = `오류: ${err.message}`;
    startBtn.disabled    = false;
    startBtn.textContent = '다시 시도';
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
