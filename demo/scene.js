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
camera.position.set(0, 0.5, 7.5);
camera.lookAt(0, 0, 0);
let targetCamZ = 7.5;
let camZ       = 7.5;

// ─── Network Group ───
const network = new THREE.Group();
scene.add(network);

// ─────────────────────────────────────────
// 신경망 구조 정의
// 층: 입력(5) → 은닉1(9) → 은닉2(11) → 은닉3(9) → 출력(5)
// ─────────────────────────────────────────
const LAYER_SIZES  = [5, 9, 11, 9, 5];
const LAYER_X_STEP = 1.28;   // 층간 X 간격
const NODE_R_BASE  = 0.70;   // YZ 분포 반경

// 노드 데이터 생성
const layerData = LAYER_SIZES.map((count, li) => {
  const lx = (li - (LAYER_SIZES.length - 1) / 2) * LAYER_X_STEP;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + li * 0.44;
    const r     = NODE_R_BASE * (0.55 + (i % 3) * 0.22 + Math.random() * 0.12);
    return {
      pos: new THREE.Vector3(
        lx + (Math.random() - 0.5) * 0.09,
        r * Math.sin(angle) + (Math.random() - 0.5) * 0.07,
        r * Math.cos(angle) + (Math.random() - 0.5) * 0.07,
      ),
      activation:       0,
      targetActivation: 0,
      layerIdx:         li,
    };
  });
});

const allNodes = layerData.flat();

// 시냅스 엣지 생성 (인접 층 완전 연결)
// 총 엣지 수: 5×9 + 9×11 + 11×9 + 9×5 = 288
const edges = [];
for (let li = 0; li < LAYER_SIZES.length - 1; li++) {
  for (const src of layerData[li]) {
    for (const dst of layerData[li + 1]) {
      edges.push({
        src, dst,
        weight:       0.15 + Math.random() * 0.85,
        targetWeight: 0.15 + Math.random() * 0.85,
      });
    }
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

function makeNodePoints(colArr, size, sharedPos) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(sharedPos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));
  network.add(new THREE.Points(geo, new THREE.PointsMaterial({
    vertexColors: true, size,
    blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
  })));
  return geo;
}

const nodeHaloGeo = makeNodePoints(nHaloArr, 0.26, nPosArr);
const nodeCoreGeo = makeNodePoints(nCoreArr, 0.09, nPosArr);

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
  vertexColors: true, size: 0.065,
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
  color: 0xFFCC99, size: 0.016,
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
      // 은닉층/출력층: 이전 층 가중합 → sigmoid
      if (li > 0) {
        layerData[li].forEach(dst => {
          let sum = 0, cnt = 0;
          for (const e of edges) {
            if (e.dst === dst) { sum += e.src.activation * e.weight; cnt++; }
          }
          dst.targetActivation = sigmoid((sum / (cnt || 1)) * 4.5 - 1.8);
        });
      }
      // 다음 층으로 스파크 발사
      if (li < LAYER_SIZES.length - 1) {
        layerData[li].forEach(src => {
          if (src.targetActivation > 0.18) {
            for (const e of edges) {
              if (e.src !== src) continue;
              // 가중치에 비례한 스파크 수
              const sparks = e.weight * src.targetActivation;
              spawnSpark(e, 0);
              if (sparks > 0.5) spawnSpark(e, 0.04 + Math.random() * 0.06);
              if (sparks > 0.8) spawnSpark(e, 0.09 + Math.random() * 0.06);
            }
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

let targetOffX = 0, targetOffY = 0;
let smoothOffX = 0, smoothOffY = 0;
let baseRotY   = 0;
let clickCount = 0;

control.on('move', (e) => {
  cursorEl.style.left = `${e.screenX}px`;
  cursorEl.style.top  = `${e.screenY}px`;
  sPosEl.textContent  = `${e.screenX} · ${e.screenY}`;
  targetOffY = (e.x - 0.5) * Math.PI * 2.0;
  targetOffX = (e.y - 0.5) * Math.PI * 0.9;
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
  targetCamZ = Math.max(3.5, Math.min(14, targetCamZ + e.deltaY * 0.055));
  const zoom = Math.round((1 - (targetCamZ - 3.5) / 10.5) * 100);
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

  // ── 회전 (시선 제어 + 자동 회전) ──
  baseRotY   += 0.0018;
  smoothOffX += (targetOffX - smoothOffX) * 0.030;
  smoothOffY += (targetOffY - smoothOffY) * 0.030;
  network.rotation.x = smoothOffX;
  network.rotation.y = baseRotY + smoothOffY;

  // ── 카메라 줌 ──
  camZ += (targetCamZ - camZ) * 0.055;
  camera.position.z = camZ;

  // ── 별 배경 미세 회전 ──
  starMesh.rotation.y += 0.000035;

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
