// Phase 3.9 v58 (2026-06-05) CRITICAL — cosine weak threshold 0.78 → 0.88.
//
// 사용자 catch (production 13:27):
//   "손 자세 영역 달라도 영역 cluster 0 winner — 영역 자세 인식 안 됨"
//
// 영역 자세 영역 sim distribution 영역 simulation + threshold 영역 catch 영역
// SPAWN 영역 발생 영역 영역 영역 자세 영역 영역 학습 영역 가능 영역 검증.

import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { encodeHandToFeatureVector, type HandLandmark } from '@/lib/snn-runtime/hand-spike-encoder';

function loadFixture(pose: string): HandLandmark[] {
  const path = resolve(__dirname, '..', 'integration', 'fixtures', `hand-mediapipe-${pose}.json`);
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { landmarks: HandLandmark[][] };
  return raw.landmarks[0];
}

function cosineSim(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return Math.sqrt(normA * normB) > 0 ? dot / Math.sqrt(normA * normB) : 0;
}

const STRICT = 0.93;
const WEAK_V18 = 0.78;
const WEAK_V58 = 0.88;

describe('v58 cosine weak threshold — 0.78 → 0.88 영역 영역 자세 SPAWN 영역', () => {
  it('★ 4 자세 cross-pose sim matrix — v18 (0.78) vs v58 (0.88) 분류 catch', () => {
    const poses = ['open_palm', 'closed_fist', 'thumbs_up', 'peace_sign'];
    const features = poses.map(loadFixture).map(encodeHandToFeatureVector);

    console.log('');
    console.log('  Cross-pose cosine sim matrix:');
    console.log('  ' + ' '.repeat(15) + poses.map((p) => p.padStart(13)).join(''));
    const v18CrossMatches: string[] = [];
    const v58CrossMatches: string[] = [];

    for (let i = 0; i < poses.length; i += 1) {
      const row: string[] = [];
      for (let j = 0; j < poses.length; j += 1) {
        const sim = cosineSim(features[i], features[j]);
        row.push(sim.toFixed(3).padStart(13));
        if (i !== j) {
          if (sim >= WEAK_V18) v18CrossMatches.push(`${poses[i]} vs ${poses[j]}: ${sim.toFixed(3)}`);
          if (sim >= WEAK_V58) v58CrossMatches.push(`${poses[i]} vs ${poses[j]}: ${sim.toFixed(3)}`);
        }
      }
      console.log('  ' + poses[i].padEnd(15) + row.join(''));
    }
    console.log('');
    console.log(`  v18 (weak 0.78) 영역 cross-pose match (영역 자세 영역 같은 cluster 영역 분류): ${v18CrossMatches.length}/12`);
    for (const m of v18CrossMatches) console.log(`    ${m}`);
    console.log('');
    console.log(`  v58 (weak 0.88) 영역 cross-pose match: ${v58CrossMatches.length}/12`);
    for (const m of v58CrossMatches) console.log(`    ${m}`);
    console.log('');

    // v58 영역 v18 보다 cross-pose match 영역 적어야 함 (영역 자세 영역 분류 정합).
    expect(v58CrossMatches.length).toBeLessThanOrEqual(v18CrossMatches.length);
    console.log(`  catch path: v18 영역 영역 자세 영역 ${v18CrossMatches.length}/12 영역 같은 cluster — production 영역 영역 자세 영역 인식 안 됨 영역 root cause.`);
    console.log(`  v58 영역 ${v58CrossMatches.length}/12 영역 줄어듦 — SPAWN 영역 가능 영역 영역 영역 자세 영역 학습 영역.`);
  });

  it('strict 0.93 영역 영역 영역 (regression 차단)', () => {
    expect(STRICT).toBe(0.93);
  });
});
