// 16-dim hand feature → 8-dim INPUT activation (백엔드 INPUT_NEURON_NAMES 정합).
// 각 INPUT 노드가 특정 gesture/특성에 의미적으로 대응하도록 feature engineering.
//
// 백엔드 INPUT_NEURON_NAMES 순서:
//   [in_pinch, in_fist, in_palm, in_point, in_gaze, in_blink, in_thumbsup, in_victory]
// inject_pattern body.pattern 도 같은 순서.

import { clamp01 } from './landmark';

// 16-dim feature 인덱스 (feature-encoder.ts 와 정합).
const I = {
  THUMB_CURL: 0, INDEX_CURL: 1, MIDDLE_CURL: 2, RING_CURL: 3, PINKY_CURL: 4,
  THUMB_ANG: 5, INDEX_ANG: 6, MIDDLE_ANG: 7, RING_ANG: 8, PINKY_ANG: 9,
  PINCH: 10, SPREAD: 11,
  PALM_OPEN: 12, ORIENT_X: 13, ORIENT_Y: 14, WRIST_ROLL: 15,
} as const;

const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;

/**
 * 16-dim feature → 8-dim INPUT activation (각 0~1).
 *
 * 매핑:
 *   in_pinch    : (1 - pinch_dist) — 엄지-검지 닿을수록 1
 *   in_fist     : 1 - avg(curl 5개) — 모든 손가락 굽힘 (curl 작을수록 굽힘)
 *   in_palm     : palm_open
 *   in_point    : index_curl × index_ang × (1 - avg(other 3 fingers curl))
 *   in_gaze     : orient_y
 *   in_blink    : wrist_roll
 *   in_thumbsup : thumb_curl × thumb_ang × (1 - avg(other 4 fingers))
 *   in_victory  : (index_ang + middle_ang)/2 × (1 - avg(thumb/ring/pinky))
 */
export function featuresToInputs(f: number[]): number[] {
  if (f.length < 16) return new Array(8).fill(0);

  const curl = [f[I.THUMB_CURL], f[I.INDEX_CURL], f[I.MIDDLE_CURL], f[I.RING_CURL], f[I.PINKY_CURL]];
  const ang  = [f[I.THUMB_ANG],  f[I.INDEX_ANG],  f[I.MIDDLE_ANG],  f[I.RING_ANG],  f[I.PINKY_ANG]];

  const avgCurl = avg(curl);

  // Pointing: index 펴지고 (curl ↑, ang ↑) 나머지 굽힘 (1 - curl ↑)
  const otherCurl_idx = avg([curl[0], curl[2], curl[3], curl[4]]);  // thumb,middle,ring,pinky
  const pointing = curl[1] * ang[1] * (1 - otherCurl_idx);

  // Thumbs up: thumb 펴짐 + 나머지 굽힘
  const otherCurl_th = avg([curl[1], curl[2], curl[3], curl[4]]);
  const thumbsup = curl[0] * ang[0] * (1 - otherCurl_th);

  // Victory: index + middle 펴짐, ring + pinky + thumb 굽힘
  const v_pos = (ang[1] + ang[2]) / 2;
  const v_neg = 1 - avg([curl[0], curl[3], curl[4]]);
  const victory = v_pos * v_neg;

  return [
    clamp01(1 - f[I.PINCH]),       // in_pinch
    clamp01(1 - avgCurl),          // in_fist
    clamp01(f[I.PALM_OPEN]),       // in_palm
    clamp01(pointing),             // in_point
    clamp01(f[I.ORIENT_Y]),        // in_gaze
    clamp01(f[I.WRIST_ROLL]),      // in_blink
    clamp01(thumbsup),             // in_thumbsup
    clamp01(victory),              // in_victory
  ];
}

// INPUT 노드 라벨 (UI 표시용).
export const INPUT_LABELS = ['pinch', 'fist', 'palm', 'point', 'gaze', 'blink', 'thumbsup', 'victory'];
