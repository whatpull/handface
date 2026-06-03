// scripts/mediapipe-realistic-hand-capture.mjs
//
// 사용자 요청 (2026-06-03): "사용자가 아무것도 안할 수 있도록".
//
// 직전 mediapipe-headless-capture.mjs 는 stick figure 가 너무 단순 → 4 poses
// 모두 동일 MediaPipe landmarks. 본 스크립트는 anatomically realistic SVG-based
// hand rendering 으로 진짜 discriminative landmarks 생성 시도.
//
// 동작: realistic hand SVG → canvas → MediaPipe → real landmarks → JSON fixture.

import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(name);
  if (idx < 0) return defaultValue;
  return args[idx + 1];
}
const pose = getArg('--pose', 'open_palm');
const outPath = getArg('--out', null);
const samples = Number(getArg('--samples', '5'));
const debug = args.includes('--debug');

// Anatomically realistic hand SVG with proportional finger lengths + joint articulation.
// 각 자세별 finger curl (radians per joint).
const POSE_SPECS = {
  open_palm: {
    fingers: {
      thumb:  { mcpDeg: 35, pipDeg: 5,  dipDeg: 5  },
      index:  { mcpDeg: -8, pipDeg: 5,  dipDeg: 5  },
      middle: { mcpDeg: 0,  pipDeg: 5,  dipDeg: 5  },
      ring:   { mcpDeg: 8,  pipDeg: 5,  dipDeg: 5  },
      pinky:  { mcpDeg: 16, pipDeg: 5,  dipDeg: 5  },
    },
  },
  closed_fist: {
    fingers: {
      thumb:  { mcpDeg: 25, pipDeg: 70, dipDeg: 70 },
      index:  { mcpDeg: -5, pipDeg: 100, dipDeg: 90 },
      middle: { mcpDeg: 0,  pipDeg: 100, dipDeg: 90 },
      ring:   { mcpDeg: 5,  pipDeg: 100, dipDeg: 90 },
      pinky:  { mcpDeg: 10, pipDeg: 100, dipDeg: 90 },
    },
  },
  thumbs_up: {
    fingers: {
      thumb:  { mcpDeg: 0,   pipDeg: 0,   dipDeg: 0   },  // 펴짐
      index:  { mcpDeg: -5,  pipDeg: 100, dipDeg: 90  },  // 굽힘
      middle: { mcpDeg: 0,   pipDeg: 100, dipDeg: 90  },
      ring:   { mcpDeg: 5,   pipDeg: 100, dipDeg: 90  },
      pinky:  { mcpDeg: 10,  pipDeg: 100, dipDeg: 90  },
    },
  },
  peace_sign: {
    fingers: {
      thumb:  { mcpDeg: 25,  pipDeg: 70, dipDeg: 70 },   // 굽힘
      index:  { mcpDeg: -8,  pipDeg: 5,  dipDeg: 5  },   // 펴짐
      middle: { mcpDeg: 0,   pipDeg: 5,  dipDeg: 5  },   // 펴짐
      ring:   { mcpDeg: 8,   pipDeg: 100, dipDeg: 90 },  // 굽힘
      pinky:  { mcpDeg: 16,  pipDeg: 100, dipDeg: 90 },  // 굽힘
    },
  },
};

// Finger anatomy 비율 (proximal phalanx, middle phalanx, distal phalanx 길이).
// 성인 평균 — index/middle/ring/pinky 영역 4cm/2.5cm/1.5cm 비율, thumb 영역 약간 다름.
const FINGER_ANATOMY = {
  thumb:  { mcpToTip: 70, prox: 35, mid: 0,  dist: 35 },  // 2 joints only (CMC, MCP, IP, TIP)
  index:  { mcpToTip: 95, prox: 45, mid: 28, dist: 22 },
  middle: { mcpToTip: 105, prox: 50, mid: 32, dist: 23 },
  ring:   { mcpToTip: 95, prox: 45, mid: 30, dist: 20 },
  pinky:  { mcpToTip: 75, prox: 35, mid: 23, dist: 17 },
};

const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;background:#e8d8c0;color:#000;font-family:monospace">
  <canvas id="cv" width="800" height="800" style="background:#f5e8d8;display:block"></canvas>
  <pre id="log" style="padding:8px;font-size:11px;background:#fff"></pre>
  <script type="module">
    const log = (msg) => {
      const el = document.getElementById('log');
      el.textContent += msg + '\\n';
      console.log(msg);
    };

    const POSE_SPECS = ${JSON.stringify(POSE_SPECS)};
    const FINGER_ANATOMY = ${JSON.stringify(FINGER_ANATOMY)};
    const targetPose = '${pose}';
    const samplesN = ${samples};

    function degToRad(deg) { return deg * Math.PI / 180; }

    // 손가락 1개 그리기 — proximal/middle/distal phalanx + joint articulation.
    // base 좌표 (MCP), 기본 방향 (수직 위), 자세 spec (mcp/pip/dip 각도) 영역 입력.
    function drawFinger(ctx, baseX, baseY, baseAngle, anatomy, spec, color) {
      const segments = anatomy.mid > 0 ? 3 : 2; // 엄지는 2개 phalanx, 다른 손가락은 3개
      const lengths = anatomy.mid > 0
        ? [anatomy.prox, anatomy.mid, anatomy.dist]
        : [anatomy.prox, anatomy.dist];
      const angles = anatomy.mid > 0
        ? [degToRad(spec.mcpDeg), degToRad(spec.pipDeg), degToRad(spec.dipDeg)]
        : [degToRad(spec.mcpDeg), degToRad(spec.pipDeg + spec.dipDeg)];

      let curX = baseX, curY = baseY;
      let curAngle = baseAngle + angles[0]; // MCP 영역 angle 적용

      // 손가락 가로폭 (taper from base to tip).
      const baseWidth = 18;
      const tipWidth = 12;

      const joints = [{x: curX, y: curY}];

      for (let i = 0; i < segments; i += 1) {
        const len = lengths[i];
        const nextX = curX + Math.cos(curAngle) * len;
        const nextY = curY + Math.sin(curAngle) * len;
        // Phalanx 그리기 (둥근 직사각형).
        const w = baseWidth - (baseWidth - tipWidth) * (i / segments);
        ctx.save();
        ctx.translate(curX, curY);
        ctx.rotate(curAngle);
        ctx.fillStyle = color;
        ctx.strokeStyle = '#8a6240';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-w/2, 0, w, len, [w/3, w/3, w/3, w/3]);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        // Joint 그리기 (다음 segment 시작 전 원).
        ctx.fillStyle = '#c39972';
        ctx.beginPath();
        ctx.arc(nextX, nextY, w*0.55, 0, Math.PI * 2);
        ctx.fill();
        joints.push({x: nextX, y: nextY});
        curX = nextX; curY = nextY;
        if (i + 1 < angles.length) curAngle += angles[i + 1];
      }
      return joints;
    }

    function drawHand(ctx, pose) {
      const W = ctx.canvas.width, H = ctx.canvas.height;
      // 배경 (skin-tone).
      ctx.fillStyle = '#f5e8d8';
      ctx.fillRect(0, 0, W, H);

      // Palm + wrist.
      const palmCx = W / 2;
      const palmCy = H * 0.65;
      const palmW = 130;
      const palmH = 140;

      // Wrist (forearm 일부).
      ctx.fillStyle = '#deb992';
      ctx.beginPath();
      ctx.ellipse(palmCx, palmCy + palmH/2 + 70, 60, 70, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8a6240';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Palm.
      ctx.fillStyle = '#e6c3a0';
      ctx.beginPath();
      ctx.ellipse(palmCx, palmCy, palmW/2, palmH/2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Finger MCP 위치 (palm 윗변 기준).
      const mcps = {
        thumb:  { x: palmCx - palmW/2 + 5, y: palmCy + 10, baseAngle: -Math.PI * 0.85 },
        index:  { x: palmCx - palmW/4 - 5, y: palmCy - palmH/2 + 10, baseAngle: -Math.PI / 2 - 0.05 },
        middle: { x: palmCx + 5,            y: palmCy - palmH/2 + 5,  baseAngle: -Math.PI / 2 },
        ring:   { x: palmCx + palmW/4 + 5,  y: palmCy - palmH/2 + 10, baseAngle: -Math.PI / 2 + 0.05 },
        pinky:  { x: palmCx + palmW/2 - 5,  y: palmCy - palmH/4,      baseAngle: -Math.PI / 2 + 0.15 },
      };

      for (const fname of ['thumb','index','middle','ring','pinky']) {
        const mcp = mcps[fname];
        const anatomy = FINGER_ANATOMY[fname];
        const spec = pose.fingers[fname];
        const color = '#deb992';
        drawFinger(ctx, mcp.x, mcp.y, mcp.baseAngle, anatomy, spec, color);
      }

      // Add subtle shading on palm.
      const grad = ctx.createRadialGradient(palmCx, palmCy, 20, palmCx, palmCy, palmW);
      grad.addColorStop(0, 'rgba(255,255,255,0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(palmCx, palmCy, palmW/2, palmH/2, 0, 0, Math.PI * 2);
      ctx.fill();

      log('hand drawn: pose=' + targetPose);
    }

    async function run() {
      log('loading MediaPipe...');
      const { FilesetResolver, HandLandmarker } = await import(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/+esm'
      );
      const fileset = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
      );
      const landmarker = await HandLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'CPU',
        },
        runningMode: 'IMAGE',
        numHands: 1,
        minHandDetectionConfidence: 0.1,
        minHandPresenceConfidence: 0.1,
        minTrackingConfidence: 0.1,
      });
      log('HandLandmarker created');

      const canvas = document.getElementById('cv');
      const ctx = canvas.getContext('2d');
      const poseSpec = POSE_SPECS[targetPose];
      if (!poseSpec) throw new Error('unknown pose: ' + targetPose);

      const results = [];
      for (let i = 0; i < samplesN; i += 1) {
        // 각 sample마다 작은 random jitter (translation / scale) 영역 변동성 시뮬레이션.
        ctx.save();
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 20;
        const jitterScale = 1 + (Math.random() - 0.5) * 0.1;
        ctx.translate(jitterX, jitterY);
        ctx.scale(jitterScale, jitterScale);
        drawHand(ctx, poseSpec);
        ctx.restore();
        const result = landmarker.detect(canvas);
        log('sample ' + i + ': landmarks=' + result.landmarks.length);
        if (result.landmarks.length > 0) {
          results.push(result.landmarks[0].map((lm) => ({ x: lm.x, y: lm.y, z: lm.z })));
        } else {
          results.push(null);
        }
      }
      window.__MEDIAPIPE_RESULTS__ = results;
      window.__MEDIAPIPE_DONE__ = true;
      log('done — ' + results.filter(r => r !== null).length + '/' + results.length + ' valid');
    }
    run().catch((e) => {
      window.__MEDIAPIPE_ERROR__ = e.message + '\\n' + e.stack;
      window.__MEDIAPIPE_DONE__ = true;
      log('ERROR: ' + e.message);
    });
  </script>
</body></html>
`;

async function main() {
  console.log(`[realistic-capture] pose=${pose} samples=${samples}`);
  const browser = await chromium.launch({ headless: !debug });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[browser]', msg.text());
    else if (debug) console.log('[browser]', msg.text());
  });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__MEDIAPIPE_DONE__ === true, null, { timeout: 60000 });
  const error = await page.evaluate(() => window.__MEDIAPIPE_ERROR__ ?? null);
  if (error) {
    await browser.close();
    console.error('[realistic-capture] error:', error);
    process.exit(1);
  }
  const results = await page.evaluate(() => window.__MEDIAPIPE_RESULTS__ ?? []);
  if (debug) {
    const screenshot = await page.screenshot({ fullPage: true });
    writeFileSync(`debug-${pose}.png`, screenshot);
    console.log(`[realistic-capture] debug screenshot saved to debug-${pose}.png`);
  }
  await browser.close();

  const valid = results.filter((r) => r !== null);
  console.log(`[realistic-capture] valid: ${valid.length}/${results.length}`);

  if (outPath && valid.length > 0) {
    const fixture = { pose, samples: valid.length, landmarks: valid };
    writeFileSync(outPath, JSON.stringify(fixture, null, 2));
    console.log(`[realistic-capture] saved to ${outPath}`);
  }
}

main().catch((e) => {
  console.error('[realistic-capture] fatal:', e);
  process.exit(1);
});
