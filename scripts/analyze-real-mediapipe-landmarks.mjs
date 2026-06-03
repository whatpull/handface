// scripts/analyze-real-mediapipe-landmarks.mjs
//
// captured fixture JSON 들을 읽어 encoder feature vector → top-K=5 → pairwise
// Jaccard 측정. synthetic mock 의 0.667 vs 실제 MediaPipe 데이터의 distinctiveness 비교.

import { readFileSync } from 'node:fs';
import { encodeHandToFeatureVector } from '../src/lib/snn-runtime/hand-spike-encoder.js';

const POSES = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'];
const K = 5;

function topK(feat, k) {
  return feat
    .map((v, i) => ({ idx: i, val: v }))
    .sort((a, b) => b.val - a.val)
    .slice(0, k)
    .map((p) => p.idx)
    .sort((a, b) => a - b);
}

function jaccard(a, b) {
  const sa = new Set(a);
  let inter = 0;
  for (const x of b) if (sa.has(x)) inter += 1;
  const union = a.length + b.length - inter;
  return union > 0 ? inter / union : 0;
}

// Load all fixtures.
const data = {};
for (const pose of POSES) {
  const path = `tests/integration/fixtures/hand-mediapipe-${pose}.json`;
  const fixture = JSON.parse(readFileSync(path, 'utf-8'));
  data[pose] = fixture.landmarks;  // array of 21-landmark arrays
}

console.log('=== Top-K=5 indices per pose (first sample, real MediaPipe) ===\n');
const firstTopKs = {};
for (const pose of POSES) {
  const feat = encodeHandToFeatureVector(data[pose][0]);
  const tk = topK(feat, K);
  firstTopKs[pose] = tk;
  console.log(`  ${pose.padEnd(14)}: [${tk.join(',')}]`);
}

console.log('\n=== Pairwise Jaccard (real MediaPipe poses) ===\n');
for (let i = 0; i < POSES.length; i += 1) {
  for (let j = i + 1; j < POSES.length; j += 1) {
    const jac = jaccard(firstTopKs[POSES[i]], firstTopKs[POSES[j]]);
    const marker = jac < 0.3 ? '✓ distinct' : jac < 0.5 ? '△ borderline' : '✗ same-cluster risk';
    console.log(`  ${POSES[i].padEnd(14)} vs ${POSES[j].padEnd(14)}: ${jac.toFixed(3)}  ${marker}`);
  }
}

console.log('\n=== Same-pose stability (across N=3 captures) ===\n');
for (const pose of POSES) {
  const tks = data[pose].map((lm) => topK(encodeHandToFeatureVector(lm), K));
  console.log(`  ${pose}:`);
  for (let i = 0; i < tks.length; i += 1) {
    console.log(`    sample ${i}: [${tks[i].join(',')}]`);
  }
  // Pairwise within same pose.
  let sumJac = 0, count = 0;
  for (let i = 0; i < tks.length; i += 1) {
    for (let j = i + 1; j < tks.length; j += 1) {
      sumJac += jaccard(tks[i], tks[j]);
      count += 1;
    }
  }
  console.log(`    mean intra-pose Jaccard: ${count > 0 ? (sumJac / count).toFixed(3) : 'n/a'}`);
  console.log('');
}

console.log('=== Comparison: synthetic mock vs real MediaPipe ===\n');
console.log('  Synthetic mock open_palm vs closed_fist Jaccard: 0.667 (이전 측정)');
const realPalmFistJac = jaccard(firstTopKs.open_palm, firstTopKs.closed_fist);
console.log(`  Real MediaPipe   open_palm vs closed_fist Jaccard: ${realPalmFistJac.toFixed(3)}`);
console.log('');
if (realPalmFistJac < 0.3) {
  console.log(
    '  ✓ 실제 MediaPipe landmark distinctiveness 가 synthetic 보다 큼 — vigilance=0.3 으로 충분 discrimination.',
  );
} else if (realPalmFistJac < 0.5) {
  console.log(
    '  △ 실제 MediaPipe distinctiveness 가 synthetic 과 비슷 — vigilance 0.5 검토 필요.',
  );
} else {
  console.log(
    '  ✗ 실제 MediaPipe 도 synthetic 처럼 top-K=5 overlap 큼 — encoder mean-subtracted top-K 필요.',
  );
}
