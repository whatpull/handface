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
  const el  = document.createElement('div');
  el.className = 'log-item' + (cls ? ` ${cls}` : '');
  const d  = new Date();
  el.textContent = `[${d.getHours()}시 ${d.getMinutes()}분 ${d.getSeconds()}초] ${text}`;
  logEl.appendChild(el);
  while (logEl.children.length > 9) logEl.removeChild(logEl.children[1]);
}

// ─────────────────────────────────────────
// Renderer
// ─────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x020508);
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
// 구 표면에 무작위 점 생성 (균등 분포)
// ─────────────────────────────────────────
function randomSphere(r) {
  const u = Math.random(), v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi   = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  );
}

// ─────────────────────────────────────────
// 두 점 사이 대원(Great Circle) 호 생성
// lerp → normalize → scale : 구 표면을 따라 휘는 곡선
// ─────────────────────────────────────────
function arcVerts(a, b, r, segs) {
  const pts = [];
  for (let s = 0; s <= segs; s++) {
    pts.push(
      new THREE.Vector3()
        .lerpVectors(a, b, s / segs)
        .normalize()
        .multiplyScalar(r),
    );
  }
  return pts;
}

// ─────────────────────────────────────────
// K-최근접 이웃 엣지 → 대원 호 전체 버퍼 생성
// ─────────────────────────────────────────
function buildArcBuffer(pts, K, r, segs) {
  const seen    = new Set();
  const bright  = []; // 밝은 엣지 (무작위 30%)
  const dim     = []; // 어두운 엣지
  const n       = pts.length;

  for (let i = 0; i < n; i++) {
    const sorted = pts
      .map((p, j) => ({ j, d: i !== j ? pts[i].distanceTo(p) : Infinity }))
      .sort((a, b) => a.d - b.d)
      .slice(0, K);

    for (const { j } of sorted) {
      const key = Math.min(i, j) * n + Math.max(i, j);
      if (seen.has(key)) continue;
      seen.add(key);

      const arc  = arcVerts(pts[i], pts[j], r, segs);
      const buf  = Math.random() < 0.32 ? bright : dim;
      for (let s = 0; s < arc.length - 1; s++) {
        const a = arc[s], b = arc[s + 1];
        buf.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
  }
  return {
    bright: new Float32Array(bright),
    dim:    new Float32Array(dim),
  };
}

// ─────────────────────────────────────────
// 네트워크 구 생성
// ─────────────────────────────────────────
const SPHERE_R  = 1.85;
const NODE_N    = 220;
const ARC_SEGS  = 18;   // 호 분할 수 (클수록 부드러운 곡선)
const K_NEAREST = 5;

const nodes = Array.from({ length: NODE_N }, () => randomSphere(SPHERE_R));
const { bright: brightVerts, dim: dimVerts } = buildArcBuffer(nodes, K_NEAREST, SPHERE_R, ARC_SEGS);

const network = new THREE.Group();
scene.add(network);

// 어두운 기본 엣지
const dimGeo = new THREE.BufferGeometry();
dimGeo.setAttribute('position', new THREE.Float32BufferAttribute(dimVerts, 3));
network.add(new THREE.LineSegments(dimGeo, new THREE.LineBasicMaterial({
  color: 0xCC5500, opacity: 0.22,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
})));

// 밝은 강조 엣지 (자연스러운 밝기 변화)
const brightGeo = new THREE.BufferGeometry();
brightGeo.setAttribute('position', new THREE.Float32BufferAttribute(brightVerts, 3));
network.add(new THREE.LineSegments(brightGeo, new THREE.LineBasicMaterial({
  color: 0xFF8800, opacity: 0.55,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
})));

// 노드 (일반)
const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
network.add(new THREE.Points(nodeGeo, new THREE.PointsMaterial({
  color: 0xFFAA33, size: 0.048,
  blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
})));

// 노드 (밝은 강조 — 무작위 20%)
const accentNodes = nodes.filter(() => Math.random() < 0.22);
if (accentNodes.length > 0) {
  const accentGeo = new THREE.BufferGeometry().setFromPoints(accentNodes);
  network.add(new THREE.Points(accentGeo, new THREE.PointsMaterial({
    color: 0xFFDD88, size: 0.09,
    blending: THREE.AdditiveBlending, transparent: true, opacity: 0.85, depthWrite: false,
  })));
}

// ─────────────────────────────────────────
// 중심 코어 발광
// ─────────────────────────────────────────
const mkCore = (r, col, op) => {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(r, 32, 32),
    new THREE.MeshBasicMaterial({
      color: col, blending: THREE.AdditiveBlending, transparent: true, opacity: op, depthWrite: false,
    }),
  );
  scene.add(m);
  return m;
};
const coreHalo   = mkCore(0.6,  0xDD4400, 0.08);
const coreMid    = mkCore(0.28, 0xFF7700, 0.40);
const corePoint  = mkCore(0.12, 0xFFFFFF, 0.90);

// ─────────────────────────────────────────
// 오비탈 링
// ─────────────────────────────────────────
const mkRing = (r, tube, op, rx, rz) => {
  const m = new THREE.Mesh(
    new THREE.TorusGeometry(r, tube, 8, 240),
    new THREE.MeshBasicMaterial({
      color: 0xFF8800, blending: THREE.AdditiveBlending, transparent: true, opacity: op, depthWrite: false,
    }),
  );
  m.rotation.x = rx;
  m.rotation.z = rz;
  scene.add(m);
  return m;
};

const ring1 = mkRing(2.6,  0.006, 0.65, Math.PI / 2, 0);
const ring2 = mkRing(2.3,  0.005, 0.45, 0.38,        0.22);
const ring3 = mkRing(2.05, 0.004, 0.35, -0.30,       1.08);
const ring4 = mkRing(3.1,  0.004, 0.22, 1.12,        0.48);

// ─────────────────────────────────────────
// 외부 파티클
// ─────────────────────────────────────────
const PART_N = 700;
const pPos   = new Float32Array(PART_N * 3);
for (let i = 0; i < PART_N; i++) {
  const r     = 2.2 + Math.random() * 2.8;
  const u     = Math.random(), v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi   = Math.acos(2 * v - 1);
  pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
  pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  pPos[i * 3 + 2] = r * Math.cos(phi);
}
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({
  color: 0xFF7700, size: 0.018,
  blending: THREE.AdditiveBlending, transparent: true, opacity: 0.55, depthWrite: false,
}));
scene.add(pMesh);

// ─────────────────────────────────────────
// 클릭 펄스
// ─────────────────────────────────────────
const pulsePool = [];
function triggerPulse() {
  for (let k = 0; k < 3; k++) {
    const geo  = new THREE.TorusGeometry(0.07, 0.016, 8, 64);
    const mat  = new THREE.MeshBasicMaterial({
      color: k === 0 ? 0xFFFFFF : 0xFFAA33,
      blending: THREE.AdditiveBlending, transparent: true, opacity: 1.0, depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    scene.add(mesh);
    pulsePool.push({ mesh, scale: 0.15 + k * 0.1, life: 1.0 - k * 0.08, speed: 0.05 + k * 0.016 });
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
  targetCamZ = Math.max(3.5, Math.min(11, targetCamZ + e.deltaY * 0.055));
  const zoom = Math.round((1 - (targetCamZ - 3.5) / 7.5) * 100);
  sZoomEl.textContent = `${zoom}%`;
  pushLog('ev-scroll', e.deltaY > 0 ? '✊ 줌아웃' : '🖐️ 줌인');
});

// 제스처 컬러 반응
const GCFG = {
  thumbsup:   { col: 0x44FFCC, label: '👍' },
  thumbsdown: { col: 0xFF4444, label: '👎' },
  victory:    { col: 0xFFFF44, label: '✌️' },
  iloveyou:   { col: 0xFF88CC, label: '🤟' },
};
for (const [g, cfg] of Object.entries(GCFG)) {
  control.on(g, () => {
    brightGeo.attributes && (network.children[1].material.color.setHex(cfg.col));
    setTimeout(() => network.children[1].material.color.setHex(0xFF8800), 900);
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

  // 시선 기반 회전
  baseRotY   += 0.0025;
  smoothOffX += (targetOffX - smoothOffX) * 0.032;
  smoothOffY += (targetOffY - smoothOffY) * 0.032;
  network.rotation.x = smoothOffX;
  network.rotation.y = baseRotY + smoothOffY;

  // 구 호흡
  const b = 1 + 0.016 * Math.sin(t * 0.85);
  network.scale.setScalar(b);

  // 코어 맥박
  coreMid.material.opacity   = 0.35 + 0.18 * Math.sin(t * 1.5);
  corePoint.material.opacity = 0.82 + 0.14 * Math.sin(t * 2.3);

  // 링 회전
  ring1.rotation.y += 0.0038;
  ring2.rotation.y += 0.0028;
  ring3.rotation.z += 0.0018;
  ring4.rotation.y -= 0.0011;

  // 파티클
  pMesh.rotation.y += 0.0005;
  pMesh.rotation.x += 0.0003;

  // 카메라 줌
  camZ += (targetCamZ - camZ) * 0.055;
  camera.position.z = camZ;

  // 펄스 업데이트
  for (let i = pulsePool.length - 1; i >= 0; i--) {
    const p = pulsePool[i];
    p.scale += p.speed;
    p.life  -= 0.036;
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
