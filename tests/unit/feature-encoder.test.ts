// encodeLandmarks 의 16-dim 출력을 Pointing_Up / Open_Palm / Closed_Fist
// / Victory mock landmarks 로 검증.
//
// 정직한 한계:
//  - mock landmarks 는 MediaPipe 의 실제 출력과 완전히 일치하지 않을 수 있다 —
//    카메라 환경에 따른 차이 가능. 이 테스트는 schema 불변성 (길이 / 범위 /
//    cluster 별 dim 우세) 만 검증한다.
//
// cluster-discriminative encoding 구조:
//   dim 0-3   cluster 0 (Pointing_Up)  : indexCurl, indexAng, 1-meanOtherCurl, thumbIn
//   dim 4-7   cluster 1 (Open_Palm)    : meanCurl, spread, palmOpen, anti-pinch
//   dim 8-11  cluster 2 (Closed_Fist)  : 1-meanCurl, 1-spread, 1-palmOpen, pinch
//   dim 12-15 cluster 3 (Victory)      : indexCurl, middleCurl, 1-meanRingPinky, V-product

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

describe('encodeLandmarks — cluster-discriminative invariants', () => {
  it('Open_Palm activates cluster-1 slots (dim 4..7) more than Closed_Fist', () => {
    const open = encodeLandmarks(openPalm());
    const fist = encodeLandmarks(closedFist());
    // dim 4 = meanCurl: 펴짐일수록 큰 값.
    expect(open[4]).toBeGreaterThan(fist[4]);
    // 4..7 합: open 이 fist 보다 우세.
    let openSum = 0;
    let fistSum = 0;
    for (let i = 4; i <= 7; i += 1) {
      openSum += open[i];
      fistSum += fist[i];
    }
    expect(openSum).toBeGreaterThan(fistSum);
  });

  it('Closed_Fist activates cluster-2 slots (dim 8..11) more than Open_Palm', () => {
    const open = encodeLandmarks(openPalm());
    const fist = encodeLandmarks(closedFist());
    // dim 8 = 1 - meanCurl: 굽힘일수록 큰 값.
    expect(fist[8]).toBeGreaterThan(open[8]);
    let openSum = 0;
    let fistSum = 0;
    for (let i = 8; i <= 11; i += 1) {
      openSum += open[i];
      fistSum += fist[i];
    }
    expect(fistSum).toBeGreaterThan(openSum);
  });

  it('Pointing_Up activates cluster-0 slots (dim 0..3) — index strong, others weak', () => {
    const out = encodeLandmarks(pointingUp());
    // dim 0 = indexCurl (펴짐 → 큰), dim 2 = 1-meanOtherCurl (다른 손가락 굽힘 → 큰).
    // 둘 다 크면 cluster 0 활성 신호.
    expect(out[0]).toBeGreaterThan(0.3);
    expect(out[2]).toBeGreaterThan(0.3);
  });

  it('Victory activates cluster-3 slots — index AND middle curl high', () => {
    const v = encodeLandmarks(victory());
    const f = encodeLandmarks(closedFist());
    // dim 12 = indexCurl, dim 13 = middleCurl. Victory 는 둘 다 펴짐 → 큰 값.
    expect(v[12]).toBeGreaterThan(f[12]);
    expect(v[13]).toBeGreaterThan(f[13]);
    // V-product (dim 15) 도 fist 보다 우세.
    expect(v[15]).toBeGreaterThan(f[15]);
  });

  it('all four gestures produce distinct feature vectors', () => {
    const vecs = [
      encodeLandmarks(pointingUp()),
      encodeLandmarks(openPalm()),
      encodeLandmarks(closedFist()),
      encodeLandmarks(victory()),
    ];
    // 4 자세 모두 서로 distinct — pairwise L2 distance 가 0보다 커야 한다.
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
