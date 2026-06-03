// scripts/mediapipe-headless-capture.mjs
//
// Playwright + Chromium 으로 실제 MediaPipe HandLandmarker 를 실행하여
// 임의의 synthetic 손 이미지로부터 진짜 landmark 21개를 추출.
//
// 사용자 질문 (2026-06-03): "사용자 테스트는 진행하지 않고 임의의 MediaPipe
// 발생을 시킬 수는 없는건가요?" 에 대한 답.
//
// 동작:
//   1. headless Chromium 띄움
//   2. 메모리 내 HTML 페이지 로드 (MediaPipe CDN 로드 + canvas 그림 그리기)
//   3. canvas 에 synthetic 손 자세 stick figure 렌더링
//   4. 실제 HandLandmarker.detect(canvas) 호출
//   5. 진짜 21개 landmark 좌표 추출
//   6. JSON 으로 출력 (stdout 또는 파일)
//
// 사용 예:
//   node scripts/mediapipe-headless-capture.mjs --pose open_palm --out fixture.json
//
// 한계:
//   - synthetic stick figure 는 진짜 사람 손 사진과 다름 → MediaPipe 의 detection
//     가능성 / 정확도가 낮을 수 있음. 진짜 손 사진이 더 안정적.
//   - Playwright + Chromium ~300MB 디스크 사용. CI 의 nightly 만 권장.

import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

// ── CLI args ───────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(name);
  if (idx < 0) return defaultValue;
  return args[idx + 1];
}
const pose = getArg('--pose', 'open_palm');
const outPath = getArg('--out', null);
const samples = Number(getArg('--samples', '1'));

// ── Synthetic stick-figure renderer (canvas draw script) ───────────────
// 5개 손가락 stick figure 를 canvas 에 그림. pose 별 손가락 굽힘 다름.
// 좌표: canvas 640×480, palm center 영역 (320, 360), 손가락 위쪽 방향.
const STICK_FIGURES = {
  open_palm: { thumbCurl: 0, indexCurl: 0, middleCurl: 0, ringCurl: 0, pinkyCurl: 0 },
  closed_fist: { thumbCurl: 1, indexCurl: 1, middleCurl: 1, ringCurl: 1, pinkyCurl: 1 },
  thumbs_up: { thumbCurl: 0, indexCurl: 1, middleCurl: 1, ringCurl: 1, pinkyCurl: 1 },
  peace_sign: { thumbCurl: 1, indexCurl: 0, middleCurl: 0, ringCurl: 1, pinkyCurl: 1 },
};

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>MediaPipe Headless Capture</title>
</head>
<body style="margin:0;background:#000;color:#fff;font-family:monospace">
  <canvas id="cv" width="640" height="480" style="background:#bda; display:block"></canvas>
  <pre id="log" style="padding:8px;font-size:12px"></pre>
  <script type="module">
    const log = (msg) => {
      const el = document.getElementById('log');
      el.textContent += msg + '\\n';
      console.log(msg);
    };

    function drawHand(ctx, pose) {
      const W = ctx.canvas.width, H = ctx.canvas.height;
      // Skin-tone background patch (palm 부근).
      ctx.fillStyle = '#bda88a';
      ctx.fillRect(0, 0, W, H);

      // Palm 위치 (640×480 의 중앙 아래).
      const palmX = W / 2;
      const palmY = H * 0.75;
      const palmR = 60;

      // Palm draw (원형).
      ctx.fillStyle = '#deb992';
      ctx.beginPath();
      ctx.arc(palmX, palmY, palmR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8a6240';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5 finger sticks.
      ctx.lineCap = 'round';
      ctx.lineWidth = 18;
      const fingers = [
        { name: 'thumb', baseAngle: -Math.PI * 0.7, len: 75, curl: pose.thumbCurl, offsetX: -palmR * 0.7 },
        { name: 'index', baseAngle: -Math.PI / 2 - 0.18, len: 100, curl: pose.indexCurl, offsetX: -25 },
        { name: 'middle', baseAngle: -Math.PI / 2, len: 110, curl: pose.middleCurl, offsetX: 0 },
        { name: 'ring', baseAngle: -Math.PI / 2 + 0.18, len: 100, curl: pose.ringCurl, offsetX: 25 },
        { name: 'pinky', baseAngle: -Math.PI / 2 + 0.32, len: 80, curl: pose.pinkyCurl, offsetX: 50 },
      ];

      for (const f of fingers) {
        const startX = palmX + f.offsetX;
        const startY = palmY - palmR * 0.5;
        // Curl 0 = 펴짐, 1 = 굽힘. Curl 0 시 finger 가 완전 extend (위쪽).
        // Curl 1 시 finger 가 palm 옆에 붙음 (짧고 굽음).
        const effLen = f.len * (1 - f.curl * 0.7);
        const effAngle = f.baseAngle + f.curl * 0.5; // curl 이 angle 도 조금 바꿈
        const endX = startX + Math.cos(effAngle) * effLen;
        const endY = startY + Math.sin(effAngle) * effLen;
        // 손가락 모양 (skin tone gradient).
        const grad = ctx.createLinearGradient(startX, startY, endX, endY);
        grad.addColorStop(0, '#deb992');
        grad.addColorStop(1, '#c39972');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        // Tip (round).
        ctx.fillStyle = '#c39972';
        ctx.beginPath();
        ctx.arc(endX, endY, 11, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add a simple wrist below palm.
      ctx.fillStyle = '#a88064';
      ctx.fillRect(palmX - 40, palmY + palmR, 80, 50);

      log('hand drawn pose=' + JSON.stringify(pose));
    }

    async function run() {
      log('loading MediaPipe vision...');
      const { FilesetResolver, HandLandmarker } = await import(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/+esm'
      );
      log('vision module loaded');

      const fileset = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
      );
      log('WASM fileset loaded');

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

      const results = [];
      const POSES = ${JSON.stringify(STICK_FIGURES)};
      const targetPose = '${pose}';
      const samples = ${samples};
      log('target pose=' + targetPose + ' samples=' + samples);
      const poseSpec = POSES[targetPose];
      if (!poseSpec) throw new Error('unknown pose: ' + targetPose);

      for (let i = 0; i < samples; i += 1) {
        drawHand(ctx, poseSpec);
        // MediaPipe detect 호출.
        const result = landmarker.detect(canvas);
        log('detect ' + i + ': landmarks count = ' + result.landmarks.length);
        if (result.landmarks.length > 0) {
          results.push(result.landmarks[0].map((lm) => ({ x: lm.x, y: lm.y, z: lm.z })));
        } else {
          results.push(null);
        }
      }

      // Result 를 window 에 노출 (Playwright 가 evaluate 로 읽음).
      window.__MEDIAPIPE_RESULTS__ = results;
      window.__MEDIAPIPE_DONE__ = true;
      log('all done');
    }

    run().catch((e) => {
      window.__MEDIAPIPE_ERROR__ = e.message + '\\n' + e.stack;
      window.__MEDIAPIPE_DONE__ = true;
      log('ERROR: ' + e.message);
    });
  </script>
</body>
</html>
`;

// ── Playwright orchestration ───────────────────────────────────────────
async function main() {
  console.log(`[mediapipe-capture] pose=${pose} samples=${samples}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[browser]', msg.text());
    else console.log('[browser]', msg.text());
  });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  // Wait for our marker.
  await page.waitForFunction(() => window.__MEDIAPIPE_DONE__ === true, null, {
    timeout: 60000,
  });
  const error = await page.evaluate(() => window.__MEDIAPIPE_ERROR__ ?? null);
  if (error) {
    await browser.close();
    console.error('[mediapipe-capture] error:', error);
    process.exit(1);
  }
  const results = await page.evaluate(() => window.__MEDIAPIPE_RESULTS__ ?? []);
  await browser.close();

  const validResults = results.filter((r) => r !== null);
  console.log(`[mediapipe-capture] valid detections: ${validResults.length}/${results.length}`);

  if (validResults.length === 0) {
    console.warn(
      '[mediapipe-capture] WARNING: 0 detections — synthetic stick figure 가 MediaPipe 가 인식하기에 부적합. 진짜 손 사진 사용 또는 더 사실적인 렌더링 필요.',
    );
  } else {
    console.log('[mediapipe-capture] first detection (21 landmarks):');
    console.log(JSON.stringify(validResults[0].slice(0, 5), null, 2), '... (16 more)');
  }

  const fixture = {
    pose,
    samples: validResults.length,
    capturedAt: '(timestamp set externally)',
    landmarks: validResults,
  };

  if (outPath) {
    writeFileSync(outPath, JSON.stringify(fixture, null, 2));
    console.log(`[mediapipe-capture] saved to ${outPath}`);
  } else {
    console.log('[mediapipe-capture] (no --out specified — fixture not persisted)');
  }
}

main().catch((e) => {
  console.error('[mediapipe-capture] fatal:', e);
  process.exit(1);
});
