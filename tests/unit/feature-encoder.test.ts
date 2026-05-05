// encodeLandmarks 영역 16-dim 영역 정합 영역 — Pointing_Up / Open_Palm / Closed_Fist
// / Victory mock landmarks 영역 검증.
//
// 정직 한계 박음:
//  - mock landmarks 영역 MediaPipe 영역 실제 출력 영역 정합 영역 — 영역 카메라 영역
//    영역 차이 가능. test 영역 영역 schema 정합 영역 (length / range / 정합 dim 영역
//    정성 영역) 영역 cover.

import { describe, it, expect } from 'vitest';
import {
  encodeLandmarks,
  FEATURE_DIM,
  FEATURE_LABELS,
} from '@/lib/mediapipe/feature-encoder';
import { LM, type HandLandmarks } from '@/lib/mediapipe/landmark';

// 21-landmark 영역 zero-init helper.
function zeros(): HandLandmarks {
  return Array.from({ length: 21 }, () => ({ x: 0, y: 0, z: 0 }));
}

// Pointing_Up: index 펴짐, 나머지 굽힘.
function pointingUp(): HandLandmarks {
  const lms = zeros();
  lms[LM.WRIST]       = { x: 0.5, y: 0.9, z: 0 };
  lms[LM.MIDDLE_MCP]  = { x: 0.5, y: 0.6, z: 0 };  // palm size = 0.3
  lms[LM.INDEX_MCP]   = { x: 0.45, y: 0.6, z: 0 };
  lms[LM.INDEX_PIP]   = { x: 0.45, y: 0.45, z: 0 };
  lms[LM.INDEX_TIP]   = { x: 0.45, y: 0.2, z: 0 };  // 펴짐, 멀리
  lms[LM.MIDDLE_PIP]  = { x: 0.5, y: 0.55, z: 0 };
  lms[LM.MIDDLE_TIP]  = { x: 0.5, y: 0.65, z: 0 };  // 굽힘
  lms[LM.RING_MCP]    = { x: 0.55, y: 0.6, z: 0 };
  lms[LM.RING_PIP]    = { x: 0.55, y: 0.55, z: 0 };
  lms[LM.RING_TIP]    = { x: 0.55, y: 0.65, z: 0 };  // 굽힘
  lms[LM.PINKY_MCP]   = { x: 0.6, y: 0.6, z: 0 };
  lms[LM.PINKY_PIP]   = { x: 0.6, y: 0.55, z: 0 };
  lms[LM.PINKY_TIP]   = { x: 0.6, y: 0.65, z: 0 };  // 굽힘
  lms[LM.THUMB_MCP]   = { x: 0.4, y: 0.7, z: 0 };
  lms[LM.THUMB_IP]    = { x: 0.4, y: 0.65, z: 0 };
  lms[LM.THUMB_TIP]   = { x: 0.4, y: 0.6, z: 0 };
  return lms;
}

// Open_Palm: 5 손가락 모두 펴짐.
function openPalm(): HandLandmarks {
  const lms = zeros();
  lms[LM.WRIST]       = { x: 0.5, y: 0.9, z: 0 };
  lms[LM.MIDDLE_MCP]  = { x: 0.5, y: 0.6, z: 0 };
  lms[LM.INDEX_MCP]   = { x: 0.45, y: 0.6, z: 0 };
  lms[LM.INDEX_PIP]   = { x: 0.44, y: 0.45, z: 0 };
  lms[LM.INDEX_TIP]   = { x: 0.43, y: 0.2, z: 0 };
  lms[LM.MIDDLE_PIP]  = { x: 0.5, y: 0.45, z: 0 };
  lms[LM.MIDDLE_TIP]  = { x: 0.5, y: 0.18, z: 0 };
  lms[LM.RING_MCP]    = { x: 0.55, y: 0.6, z: 0 };
  lms[LM.RING_PIP]    = { x: 0.56, y: 0.45, z: 0 };
  lms[LM.RING_TIP]    = { x: 0.57, y: 0.2, z: 0 };
  lms[LM.PINKY_MCP]   = { x: 0.6, y: 0.6, z: 0 };
  lms[LM.PINKY_PIP]   = { x: 0.61, y: 0.5, z: 0 };
  lms[LM.PINKY_TIP]   = { x: 0.62, y: 0.3, z: 0 };
  lms[LM.THUMB_MCP]   = { x: 0.4, y: 0.7, z: 0 };
  lms[LM.THUMB_IP]    = { x: 0.35, y: 0.65, z: 0 };
  lms[LM.THUMB_TIP]   = { x: 0.3, y: 0.6, z: 0 };
  return lms;
}

// Closed_Fist: 5 손가락 모두 굽힘.
function closedFist(): HandLandmarks {
  const lms = zeros();
  lms[LM.WRIST]       = { x: 0.5, y: 0.9, z: 0 };
  lms[LM.MIDDLE_MCP]  = { x: 0.5, y: 0.6, z: 0 };
  lms[LM.INDEX_MCP]   = { x: 0.45, y: 0.6, z: 0 };
  lms[LM.INDEX_PIP]   = { x: 0.45, y: 0.65, z: 0 };
  lms[LM.INDEX_TIP]   = { x: 0.45, y: 0.7, z: 0 };
  lms[LM.MIDDLE_PIP]  = { x: 0.5, y: 0.65, z: 0 };
  lms[LM.MIDDLE_TIP]  = { x: 0.5, y: 0.7, z: 0 };
  lms[LM.RING_MCP]    = { x: 0.55, y: 0.6, z: 0 };
  lms[LM.RING_PIP]    = { x: 0.55, y: 0.65, z: 0 };
  lms[LM.RING_TIP]    = { x: 0.55, y: 0.7, z: 0 };
  lms[LM.PINKY_MCP]   = { x: 0.6, y: 0.6, z: 0 };
  lms[LM.PINKY_PIP]   = { x: 0.6, y: 0.65, z: 0 };
  lms[LM.PINKY_TIP]   = { x: 0.6, y: 0.7, z: 0 };
  lms[LM.THUMB_MCP]   = { x: 0.4, y: 0.7, z: 0 };
  lms[LM.THUMB_IP]    = { x: 0.42, y: 0.72, z: 0 };
  lms[LM.THUMB_TIP]   = { x: 0.45, y: 0.7, z: 0 };
  return lms;
}

// Victory: index + middle 펴짐, 나머지 굽힘.
function victory(): HandLandmarks {
  const lms = zeros();
  lms[LM.WRIST]       = { x: 0.5, y: 0.9, z: 0 };
  lms[LM.MIDDLE_MCP]  = { x: 0.5, y: 0.6, z: 0 };
  lms[LM.INDEX_MCP]   = { x: 0.45, y: 0.6, z: 0 };
  lms[LM.INDEX_PIP]   = { x: 0.43, y: 0.45, z: 0 };
  lms[LM.INDEX_TIP]   = { x: 0.41, y: 0.2, z: 0 };  // 펴짐
  lms[LM.MIDDLE_PIP]  = { x: 0.5, y: 0.45, z: 0 };
  lms[LM.MIDDLE_TIP]  = { x: 0.5, y: 0.18, z: 0 };  // 펴짐
  lms[LM.RING_MCP]    = { x: 0.55, y: 0.6, z: 0 };
  lms[LM.RING_PIP]    = { x: 0.55, y: 0.65, z: 0 };
  lms[LM.RING_TIP]    = { x: 0.55, y: 0.7, z: 0 };  // 굽힘
  lms[LM.PINKY_MCP]   = { x: 0.6, y: 0.6, z: 0 };
  lms[LM.PINKY_PIP]   = { x: 0.6, y: 0.65, z: 0 };
  lms[LM.PINKY_TIP]   = { x: 0.6, y: 0.7, z: 0 };  // 굽힘
  lms[LM.THUMB_MCP]   = { x: 0.4, y: 0.7, z: 0 };
  lms[LM.THUMB_IP]    = { x: 0.42, y: 0.72, z: 0 };
  lms[LM.THUMB_TIP]   = { x: 0.45, y: 0.7, z: 0 };
  return lms;
}

describe('encodeLandmarks — schema invariants', () => {
  it('returns FEATURE_DIM (16) length array', () => {
    expect(FEATURE_DIM).toBe(16);
    expect(FEATURE_LABELS).toHaveLength(FEATURE_DIM);
    const out = encodeLandmarks(pointingUp());
    expect(out).toHaveLength(FEATURE_DIM);
  });

  it('all dims clamped to [0,1]', () => {
    for (const lms of [pointingUp(), openPalm(), closedFist(), victory()]) {
      const out = encodeLandmarks(lms);
      for (let i = 0; i < FEATURE_DIM; i += 1) {
        expect(out[i]).toBeGreaterThanOrEqual(0);
        expect(out[i]).toBeLessThanOrEqual(1);
        expect(Number.isFinite(out[i])).toBe(true);
      }
    }
  });

  it('zero palm size returns all-zero feature (defensive)', () => {
    const lms = zeros();
    const out = encodeLandmarks(lms);
    expect(out).toHaveLength(FEATURE_DIM);
    for (const v of out) expect(v).toBe(0);
  });
});

describe('encodeLandmarks — gesture-distinguishability invariants', () => {
  it('Open_Palm vs Closed_Fist differ on finger curl dims (0..4)', () => {
    const open = encodeLandmarks(openPalm());
    const fist = encodeLandmarks(closedFist());
    // 펴진 손가락 (open) 영역 curl ratio 영역 닫힌 영역 (fist) 영역 영역 영역.
    // index/middle/ring/pinky (1..4) 영역 검증 — thumb 영역 mock 영역 정합 영역.
    let openSum = 0;
    let fistSum = 0;
    for (let i = 1; i <= 4; i += 1) {
      openSum += open[i];
      fistSum += fist[i];
    }
    expect(openSum).toBeGreaterThan(fistSum);
  });

  it('Pointing_Up has high index_curl, low middle_curl', () => {
    const out = encodeLandmarks(pointingUp());
    // dim 1 = index_curl (펴짐 → 큰 값), dim 2 = middle_curl (굽힘 → 작은 값).
    expect(out[1]).toBeGreaterThan(out[2]);
  });

  it('Victory has high index_curl AND high middle_curl', () => {
    const v = encodeLandmarks(victory());
    const f = encodeLandmarks(closedFist());
    // Victory 영역 index/middle 영역 굽힘 영역 영역 펴짐 영역 — fist 영역 영역 영역 영역.
    expect(v[1]).toBeGreaterThan(f[1]);
    expect(v[2]).toBeGreaterThan(f[2]);
  });

  it('all four gestures produce distinct feature vectors', () => {
    const vecs = [
      encodeLandmarks(pointingUp()),
      encodeLandmarks(openPalm()),
      encodeLandmarks(closedFist()),
      encodeLandmarks(victory()),
    ];
    // 정합 영역 — pairwise L2 distance 영역 0 영역 영역 (영역 영역 distinct).
    for (let i = 0; i < vecs.length; i += 1) {
      for (let j = i + 1; j < vecs.length; j += 1) {
        let d2 = 0;
        for (let k = 0; k < FEATURE_DIM; k += 1) {
          d2 += (vecs[i][k] - vecs[j][k]) ** 2;
        }
        expect(d2).toBeGreaterThan(0);
      }
    }
  });
});

// FeatureSmoother 영역 별도 테스트 (tests/unit/feature-smoother.test.ts) 영역.
