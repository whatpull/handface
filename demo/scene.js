import * as THREE from 'three';
import { HandControl } from '../src/index.ts';

// ─────────────────────────────────────────
// Renderer
// ─────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x07070f);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ─────────────────────────────────────────
// Scene & Camera
// ─────────────────────────────────────────
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07070f, 0.016);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.z = 6;

// ─────────────────────────────────────────
// Crystal (IcosahedronGeometry)
// ─────────────────────────────────────────
const crystalGeo = new THREE.IcosahedronGeometry(1.5, 1);

const crystalMat = new THREE.MeshPhongMaterial({
  color: 0x5533dd,
  emissive: 0x180848,
  specular: 0xffffff,
  shininess: 160,
  transparent: true,
  opacity: 0.72,
});
const crystal = new THREE.Mesh(crystalGeo, crystalMat);
scene.add(crystal);

// 와이어프레임 오버레이
const wireMat = new THREE.MeshBasicMaterial({
  color: 0x9d8dff,
  wireframe: true,
  transparent: true,
  opacity: 0.32,
});
crystal.add(new THREE.Mesh(crystalGeo, wireMat));

// 내부 발광 구체
const innerMat = new THREE.MeshBasicMaterial({
  color: 0x6644ee,
  transparent: true,
  opacity: 0.28,
});
const innerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 16), innerMat);
crystal.add(innerSphere);

// ─────────────────────────────────────────
// Orbital Rings
// ─────────────────────────────────────────
function makeRing(r, tube, color, opacity, rotX, rotY, rotZ) {
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(r, tube, 6, 120),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
  );
  mesh.rotation.set(rotX, rotY, rotZ);
  scene.add(mesh);
  return mesh;
}

const ring1 = makeRing(2.4, 0.012, 0x7c6af7, 0.70,  Math.PI / 3,  0,            0);
const ring2 = makeRing(3.1, 0.008, 0x4ecdc4, 0.50, -Math.PI / 5,  0,            Math.PI / 6);
const ring3 = makeRing(3.8, 0.005, 0xff6b9d, 0.35,  Math.PI / 7,  Math.PI / 4, -Math.PI / 3);

// ─────────────────────────────────────────
// Orbiting Particles
// ─────────────────────────────────────────
const P = 280;
const pPos   = new Float32Array(P * 3);
const pCol   = new Float32Array(P * 3);
const pR     = new Float32Array(P);
const pTheta = new Float32Array(P);
const pPhi   = new Float32Array(P);
const pSpeed = new Float32Array(P);

const palette = [
  new THREE.Color(0x7c6af7),
  new THREE.Color(0x4ecdc4),
  new THREE.Color(0xff6b9d),
  new THREE.Color(0xffd166),
];

for (let i = 0; i < P; i++) {
  pR[i]     = 2.3 + Math.random() * 2.6;
  pTheta[i] = Math.random() * Math.PI * 2;
  pPhi[i]   = Math.acos(2 * Math.random() - 1);
  pSpeed[i] = (Math.random() - 0.5) * 0.009;

  const c = palette[i % palette.length];
  pCol[i*3]   = c.r;
  pCol[i*3+1] = c.g;
  pCol[i*3+2] = c.b;
}

const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({
  size: 0.065, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true,
}));
scene.add(pMesh);

// ─────────────────────────────────────────
// Star Field
// ─────────────────────────────────────────
const S = 1800;
const sPos = new Float32Array(S * 3);
for (let i = 0; i < S; i++) {
  sPos[i*3]   = (Math.random() - 0.5) * 300;
  sPos[i*3+1] = (Math.random() - 0.5) * 300;
  sPos[i*3+2] = (Math.random() - 0.5) * 300;
}
const sGeo = new THREE.BufferGeometry();
sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({
  color: 0xffffff, size: 0.14, transparent: true, opacity: 0.45, sizeAttenuation: true,
}));
scene.add(stars);

// ─────────────────────────────────────────
// Lighting
// ─────────────────────────────────────────
scene.add(new THREE.AmbientLight(0x1a1a3e, 2.5));

const light1 = new THREE.PointLight(0x7c6af7, 5, 14);
light1.position.set(4, 3, 4);
scene.add(light1);

const light2 = new THREE.PointLight(0x4ecdc4, 3, 14);
light2.position.set(-4, -2, -3);
scene.add(light2);

const light3 = new THREE.PointLight(0xff6b9d, 2, 12);
light3.position.set(0, 5, -4);
scene.add(light3);

// ─────────────────────────────────────────
// Click Ripple Effect
// ─────────────────────────────────────────
function spawnRipple() {
  const mat = new THREE.MeshBasicMaterial({ color: 0x9d8dff, transparent: true, opacity: 0.75, wireframe: true });
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.018, 8, 64), mat);
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  scene.add(mesh);

  let s = 0.3;
  let op = 0.75;
  function expand() {
    s  += 0.18;
    op -= 0.045;
    mesh.scale.setScalar(s);
    mat.opacity = Math.max(0, op);
    if (op > 0) requestAnimationFrame(expand);
    else scene.remove(mesh);
  }
  expand();
}

// ─────────────────────────────────────────
// State
// ─────────────────────────────────────────
let targetRotX = 0, targetRotY = 0;
let smoothRotX = 0, smoothRotY = 0;
let targetCamZ  = 6, camZ = 6;   // 스크롤 위치에 따라 자동 업데이트
let pulseScale  = 1, targetPulse = 1;
let clickCount  = 0;
let time        = 0;

// UI refs
const cursorEl  = document.getElementById('cursor');
const flashEl   = document.getElementById('flash');
const sStatus   = document.getElementById('s-status');
const sPosEl    = document.getElementById('s-pos');
const sClicksEl  = document.getElementById('s-clicks');
const sScrollEl  = document.getElementById('s-scroll');
const logEl     = document.getElementById('log');

function pushLog(type, text) {
  const el = document.createElement('div');
  el.className = 'log-item' + (type ? ` ev-${type}` : '');
  const t = new Date().toLocaleTimeString('ko-KR', { hour12: false });
  el.textContent = `[${t}] ${text}`;
  logEl.appendChild(el);
  while (logEl.children.length > 9) logEl.children[1].remove();
}

// ─────────────────────────────────────────
// Click Handler
// ─────────────────────────────────────────
function handleClick(x, y) {
  clickCount++;
  sClicksEl.textContent = clickCount;
  pushLog('click', `클릭  ${Math.round(x * 100)}% · ${Math.round(y * 100)}%`);

  // Scale pulse
  targetPulse = 1.38;
  setTimeout(() => { targetPulse = 1; }, 220);

  // Color burst
  crystalMat.emissive.setHex(0x6644ff);
  crystalMat.color.setHex(0xbbccff);
  innerMat.opacity = 0.65;
  setTimeout(() => {
    crystalMat.emissive.setHex(0x180848);
    crystalMat.color.setHex(0x5533dd);
    innerMat.opacity = 0.28;
  }, 280);

  // Screen flash
  flashEl.classList.add('on');
  setTimeout(() => flashEl.classList.remove('on'), 60);

  // Cursor animation
  cursorEl.classList.add('clicking');
  setTimeout(() => cursorEl.classList.remove('clicking'), 200);

  // Ripple rings (3개)
  spawnRipple();
  setTimeout(spawnRipple, 80);
  setTimeout(spawnRipple, 180);

  // Particle scatter
  for (let i = 0; i < P; i++) {
    pR[i]     = 2.3 + Math.random() * 4.8;
    pPhi[i]   = Math.random() * Math.PI;
    pTheta[i] = Math.random() * Math.PI * 2;
  }
}

// ─────────────────────────────────────────
// Hand Control
// ─────────────────────────────────────────
const control = new HandControl({
  handedness:   'right',
  cursorSource: 'gaze',  // 홍채(시선)로 커서 이동 / 손은 클릭+스크롤 전용
});

control.on('move', (e) => {
  cursorEl.style.left = `${e.screenX}px`;
  cursorEl.style.top  = `${e.screenY}px`;
  sPosEl.textContent  = `${e.screenX} · ${e.screenY}`;

  // 크리스탈이 손 위치를 향해 회전
  targetRotY = (e.x - 0.5) * Math.PI * 1.6;
  targetRotX = (e.y - 0.5) * Math.PI * 0.8;

  // 주 조명이 손을 따라 이동
  light1.position.x =  (e.x - 0.5) * 11;
  light1.position.y = -(e.y - 0.5) * 11;
});

control.on('click', (e) => handleClick(e.x, e.y));

control.on('scroll', (e) => {
  // 실제 페이지 스크롤 — 카메라 줌은 window scroll 이벤트로 분리
  window.scrollBy({ top: e.deltaY * 9, behavior: 'auto' });
  pushLog('scroll', e.deltaY > 0 ? '✊ 스크롤 다운' : '🖐 스크롤 업');
});

// 스크롤 위치 → 카메라 줌 (스크롤 내릴수록 크리스탈에 가까워짐)
window.addEventListener('scroll', () => {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const ratio = window.scrollY / maxScroll;        // 0(상단) → 1(하단)
  targetCamZ = 8 - ratio * 5.5;                    // 8(멀리) → 2.5(근접)
  sScrollEl.textContent = `${Math.round(ratio * 100)}%`;
});

// 제스처 이벤트 — 크리스탈 색상 변화 + 로그
const GESTURE_COLORS = {
  thumbsup:   { color: 0x66ff99, emissive: 0x1a4422 },
  thumbsdown: { color: 0xff6655, emissive: 0x441111 },
  victory:    { color: 0xffdd44, emissive: 0x443311 },
  iloveyou:   { color: 0xff88cc, emissive: 0x442233 },
};
const GESTURE_LABELS = {
  thumbsup: '👍 엄지 위', thumbsdown: '👎 엄지 아래',
  victory: '✌️ 브이', iloveyou: '🤟 아이 러브 유',
};

for (const [g, col] of Object.entries(GESTURE_COLORS)) {
  control.on(g, () => {
    crystalMat.color.setHex(col.color);
    crystalMat.emissive.setHex(col.emissive);
    setTimeout(() => {
      crystalMat.color.setHex(0x5533dd);
      crystalMat.emissive.setHex(0x180848);
    }, 600);
    pushLog('', GESTURE_LABELS[g]);
  });
}

// ─────────────────────────────────────────
// Animation Loop
// ─────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  // Crystal smooth rotation
  smoothRotX += (targetRotX - smoothRotX) * 0.04;
  smoothRotY += (targetRotY - smoothRotY) * 0.04;
  crystal.rotation.x = smoothRotX;
  crystal.rotation.y = smoothRotY + time * 0.14;

  // Pulse scale
  pulseScale += (targetPulse - pulseScale) * 0.11;
  crystal.scale.setScalar(pulseScale);

  // Inner glow pulse (idle breathing)
  innerMat.opacity = 0.28 + Math.sin(time * 1.4) * 0.06;

  // Camera zoom
  camZ += (targetCamZ - camZ) * 0.055;
  camera.position.z = camZ;

  // Rings rotation
  ring1.rotation.z += 0.003;
  ring2.rotation.z -= 0.002;
  ring2.rotation.x -= 0.001;
  ring3.rotation.y += 0.0015;
  ring3.rotation.z += 0.001;

  // Lights orbit
  light2.position.x = Math.sin(time * 0.38) * 5;
  light2.position.y = Math.cos(time * 0.55) * 4;
  light3.position.x = Math.cos(time * 0.29) * 5;
  light3.position.z = Math.sin(time * 0.47) * 5;

  // Particle positions
  const pos = pGeo.attributes.position;
  for (let i = 0; i < P; i++) {
    pTheta[i] += pSpeed[i];
    pos.setXYZ(
      i,
      pR[i] * Math.sin(pPhi[i]) * Math.cos(pTheta[i]),
      pR[i] * Math.sin(pPhi[i]) * Math.sin(pTheta[i]),
      pR[i] * Math.cos(pPhi[i]),
    );
  }
  pos.needsUpdate = true;
  pMesh.rotation.y += 0.0008;

  // Stars slow drift
  stars.rotation.y += 0.00008;

  renderer.render(scene, camera);
}

animate();

// ─────────────────────────────────────────
// Start Button
// ─────────────────────────────────────────
const startBtn = document.getElementById('start-btn');
const overlay  = document.getElementById('overlay');
const loadMsg  = document.getElementById('load-msg');

startBtn.addEventListener('click', async () => {
  startBtn.disabled = true;
  startBtn.textContent = '초기화 중...';
  loadMsg.textContent  = 'MediaPipe 모델 로딩 중 (3~5초)';
  sStatus.textContent  = '초기화중';

  try {
    await control.start();
    control.createPanel(); // 플로팅 설정 버튼 주입
    sStatus.textContent = '감지중';
    overlay.classList.add('fade-out');
    setTimeout(() => { overlay.style.display = 'none'; }, 650);
    pushLog('', '핸드 트래킹 시작');

    // R 키: 커서 캘리브레이션 초기화 (다음 감지 위치 → 화면 중앙)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') {
        control.recalibrate();
        pushLog('', '캘리브레이션 초기화');
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
