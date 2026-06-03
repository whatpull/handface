// scripts/mediapipe-emoji-capture.mjs
//
// Hand emoji 를 canvas 에 렌더링하고 MediaPipe 가 detect/discriminate 하는지 시험.
// emoji 는 visual design 시점에서 각 자세가 매우 다르게 디자인 되어있어,
// stick figure 보다 discriminative landmarks 를 생성할 가능성 있음.

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

const POSE_EMOJIS = {
  open_palm: '🖐️',
  closed_fist: '✊',
  thumbs_up: '👍',
  peace_sign: '✌️',
};

const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;background:#f5e8d8;font-family:'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif">
  <canvas id="cv" width="600" height="600" style="background:#f5e8d8;display:block"></canvas>
  <pre id="log" style="padding:8px;font-size:11px"></pre>
  <script type="module">
    const log = (msg) => {
      const el = document.getElementById('log');
      el.textContent += msg + '\\n';
      console.log(msg);
    };

    const POSE_EMOJIS = ${JSON.stringify(POSE_EMOJIS)};
    const targetPose = '${pose}';
    const samplesN = ${samples};

    function drawEmojiHand(ctx, emoji, jitterX = 0, jitterY = 0, rotation = 0) {
      const W = ctx.canvas.width, H = ctx.canvas.height;
      ctx.fillStyle = '#f5e8d8';
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(W/2 + jitterX, H/2 + jitterY);
      ctx.rotate(rotation);
      ctx.font = '400px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000';
      ctx.fillText(emoji, 0, 0);
      ctx.restore();
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
        minHandDetectionConfidence: 0.05,
        minHandPresenceConfidence: 0.05,
        minTrackingConfidence: 0.05,
      });
      log('HandLandmarker created');

      const canvas = document.getElementById('cv');
      const ctx = canvas.getContext('2d');
      const emoji = POSE_EMOJIS[targetPose];
      if (!emoji) throw new Error('unknown pose: ' + targetPose);
      log('target emoji: ' + emoji);

      const results = [];
      for (let i = 0; i < samplesN; i += 1) {
        const jitterX = (Math.random() - 0.5) * 20;
        const jitterY = (Math.random() - 0.5) * 20;
        const rotation = (Math.random() - 0.5) * 0.1;
        drawEmojiHand(ctx, emoji, jitterX, jitterY, rotation);
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
      window.__MEDIAPIPE_ERROR__ = e.message;
      window.__MEDIAPIPE_DONE__ = true;
      log('ERROR: ' + e.message);
    });
  </script>
</body></html>
`;

async function main() {
  console.log(`[emoji-capture] pose=${pose} samples=${samples}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', (msg) => console.log('[browser]', msg.text()));
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__MEDIAPIPE_DONE__ === true, null, { timeout: 60000 });
  const error = await page.evaluate(() => window.__MEDIAPIPE_ERROR__ ?? null);
  if (error) {
    await browser.close();
    console.error('[emoji-capture] error:', error);
    process.exit(1);
  }
  const results = await page.evaluate(() => window.__MEDIAPIPE_RESULTS__ ?? []);
  await browser.close();

  const valid = results.filter((r) => r !== null);
  console.log(`[emoji-capture] valid: ${valid.length}/${results.length}`);

  if (outPath && valid.length > 0) {
    const fixture = { pose, samples: valid.length, landmarks: valid };
    writeFileSync(outPath, JSON.stringify(fixture, null, 2));
    console.log(`[emoji-capture] saved to ${outPath}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
