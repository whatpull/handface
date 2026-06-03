// scripts/mediapipe-url-image-capture.mjs
//
// Public domain 이미지 URL 을 입력으로 MediaPipe 실행.
// Wikimedia Commons / MediaPipe demo / Pexels CC0 등.

import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(name);
  if (idx < 0) return defaultValue;
  return args[idx + 1];
}
const imageUrl = getArg('--url', null);
const label = getArg('--label', 'unknown');
const outPath = getArg('--out', null);

if (!imageUrl) {
  console.error('usage: --url <image-url> --label <pose-name> [--out fixture.json]');
  process.exit(1);
}

const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0">
  <img id="hand" crossorigin="anonymous" style="max-width:600px;display:block" />
  <pre id="log" style="padding:8px;font-size:11px"></pre>
  <script type="module">
    const log = (msg) => { document.getElementById('log').textContent += msg + '\\n'; console.log(msg); };
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
      const img = document.getElementById('hand');
      img.src = '${imageUrl}';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('image load failed: ${imageUrl}'));
        if (img.complete) resolve();
      });
      log('image loaded, size=' + img.naturalWidth + 'x' + img.naturalHeight);
      const result = landmarker.detect(img);
      log('detection: landmarks=' + result.landmarks.length);
      window.__RESULT__ = result.landmarks.length > 0
        ? result.landmarks[0].map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
        : null;
      window.__DONE__ = true;
    }
    run().catch((e) => {
      window.__ERROR__ = e.message;
      window.__DONE__ = true;
      log('ERROR: ' + e.message);
    });
  </script>
</body></html>
`;

async function main() {
  console.log(`[url-capture] url=${imageUrl} label=${label}`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newContext().then(c => c.newPage());
  page.on('console', (msg) => console.log('[browser]', msg.text()));
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  try {
    await page.waitForFunction(() => window.__DONE__ === true, null, { timeout: 30000 });
  } catch {
    await browser.close();
    console.error('[url-capture] timeout');
    process.exit(1);
  }
  const error = await page.evaluate(() => window.__ERROR__ ?? null);
  const result = await page.evaluate(() => window.__RESULT__);
  await browser.close();
  if (error) {
    console.error('[url-capture] error:', error);
    process.exit(1);
  }
  if (!result) {
    console.log('[url-capture] no hand detected in image');
    process.exit(0);
  }
  console.log(`[url-capture] detected 21 landmarks ✓`);
  if (outPath) {
    writeFileSync(outPath, JSON.stringify({ pose: label, samples: 1, source: imageUrl, landmarks: [result] }, null, 2));
    console.log(`[url-capture] saved to ${outPath}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
