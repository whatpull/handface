// 21 hand landmarks → 16-dim cluster-discriminative feature vector.
// 사용자 catch 2026-05-07: 직전 generic encoding (curl/angle/orient) 영역 4 자세 영역
// dim 0-4 영역 모두 활성 → cluster overlap → cluster 0 monopoly winner catch.
//
// redesign — 4 cluster 영역 16-dim 영역 영역 4 dim subset 영역 정합 (INPUT cluster-local
// mapping IN[4c..4c+3] → V1_L4_E_cX 영역 정합):
//
//   cluster 0 (Pointing_Up)  IN[0-3]:  index 강조 — index curl/angle 영역 1, 다른 finger 영역 0
//   cluster 1 (Open_Palm)    IN[4-7]:  모든 finger 펴짐 — mean curl, spread, palm_open, anti-pinch
//   cluster 2 (Closed_Fist)  IN[8-11]: 모든 finger 굽힘 — 1-mean curl, 1-spread, 1-palm_open, pinch
//   cluster 3 (Victory)      IN[12-15]: V signature — index+middle 펴짐, ring+pinky 굽힘
//
// 모든 dim ∈ [0, 1] normalized. 손바닥 크기 정규화 + 회전 invariant 보존.

import { LM, distance, palmSize, angleCos, clamp01, type HandLandmarks } from './landmark';

export const FEATURE_DIM = 16;

export const FEATURE_LABELS: string[] = [
  // cluster 0 (Pointing_Up) — IN[0-3]
  'p0_index_curl', 'p0_index_ang', 'p0_others_low', 'p0_thumb_in',
  // cluster 1 (Open_Palm) — IN[4-7]
  'p1_mean_curl', 'p1_spread', 'p1_palm_open', 'p1_anti_pinch',
  // cluster 2 (Closed_Fist) — IN[8-11]
  'p2_anti_curl', 'p2_anti_spread', 'p2_anti_palm', 'p2_pinch',
  // cluster 3 (Victory) — IN[12-15]
  'p3_v_index', 'p3_v_middle', 'p3_others_curled', 'p3_v_signature',
];

const FINGER_JOINTS: Array<[number, number, number]> = [
  [LM.THUMB_MCP, LM.THUMB_IP, LM.THUMB_TIP],
  [LM.INDEX_MCP, LM.INDEX_PIP, LM.INDEX_TIP],
  [LM.MIDDLE_MCP, LM.MIDDLE_PIP, LM.MIDDLE_TIP],
  [LM.RING_MCP, LM.RING_PIP, LM.RING_TIP],
  [LM.PINKY_MCP, LM.PINKY_PIP, LM.PINKY_TIP],
];

const FINGER_TIPS_MCPS: Array<[number, number]> = [
  [LM.THUMB_TIP, LM.THUMB_MCP],
  [LM.INDEX_TIP, LM.INDEX_MCP],
  [LM.MIDDLE_TIP, LM.MIDDLE_MCP],
  [LM.RING_TIP, LM.RING_MCP],
  [LM.PINKY_TIP, LM.PINKY_MCP],
];

const FINGER_TIPS = [
  LM.THUMB_TIP, LM.INDEX_TIP, LM.MIDDLE_TIP, LM.RING_TIP, LM.PINKY_TIP,
];

export function encodeLandmarks(lms: HandLandmarks): number[] {
  const ps = palmSize(lms);
  if (ps === 0) return new Array(FEATURE_DIM).fill(0);

  // ── primitive features (재사용) ──
  // curl ratio per finger — 1=펴짐, 0=굽힘.
  const curl = FINGER_TIPS_MCPS.map(([tip, mcp]) =>
    clamp01(distance(lms[tip], lms[mcp]) / ps / 1.5),
  );
  // angle (1 - cos) / 2 per finger — 1=펴짐, 0=굽힘.
  const ang = FINGER_JOINTS.map(([mcp, pip, tip]) =>
    clamp01((1 - angleCos(lms[mcp], lms[pip], lms[tip])) / 2),
  );
  const [thumbCurl, indexCurl, middleCurl, ringCurl, pinkyCurl] = curl;
  const indexAng = ang[1];
  const meanCurl = curl.reduce((a, b) => a + b, 0) / curl.length;
  const meanOtherCurl = (thumbCurl + middleCurl + ringCurl + pinkyCurl) / 4;
  const meanRingPinky = (ringCurl + pinkyCurl) / 2;

  // pinch (thumb tip ↔ index tip) — 0=닿음, 1=벌림.
  const pinchDist = clamp01(distance(lms[LM.THUMB_TIP], lms[LM.INDEX_TIP]) / ps);
  // spread (thumb mcp ↔ index mcp) — 0~1.
  const spread = clamp01(distance(lms[LM.THUMB_MCP], lms[LM.INDEX_MCP]) / ps / 0.6);
  // palm_open — 5 finger tip 평균 ↔ wrist / 2.
  let sumWrist = 0;
  for (const tip of FINGER_TIPS) sumWrist += distance(lms[tip], lms[LM.WRIST]);
  const palmOpen = clamp01(sumWrist / 5 / ps / 2.0);
  // thumb in (Pointing 시 thumb 굽힘) — 1 = thumb curled in.
  const thumbIn = 1 - thumbCurl;

  // ── cluster-discriminative encoding ──
  const out = new Array<number>(FEATURE_DIM).fill(0);

  // cluster 0 (Pointing_Up) — IN[0-3]: index 강조, 다른 finger 약.
  out[0] = indexCurl;                                 // index 펴짐
  out[1] = indexAng;                                  // index 각도 펴짐
  out[2] = clamp01(1 - meanOtherCurl);                // others 굽힘
  out[3] = thumbIn;                                   // thumb in (검지 1 자세 정합)

  // cluster 1 (Open_Palm) — IN[4-7]: 모든 finger 펴짐.
  out[4] = meanCurl;                                  // 모든 finger 펴짐 평균
  out[5] = spread;                                    // thumb-index spread
  out[6] = palmOpen;                                  // palm 펼침
  out[7] = clamp01(pinchDist * 2);                    // anti-pinch (벌림)

  // cluster 2 (Closed_Fist) — IN[8-11]: 모든 finger 굽힘 + pinch 0.
  out[8] = clamp01(1 - meanCurl);                     // 모든 finger 굽힘
  out[9] = clamp01(1 - spread);                       // anti-spread
  out[10] = clamp01(1 - palmOpen);                    // anti palm-open
  out[11] = clamp01(1 - pinchDist);                   // pinch (thumb-index 닿음)

  // cluster 3 (Victory) — IN[12-15]: index+middle 펴짐, ring+pinky 굽힘.
  out[12] = indexCurl;                                // index 펴짐
  out[13] = middleCurl;                               // middle 펴짐
  out[14] = clamp01(1 - meanRingPinky);               // ring+pinky 굽힘
  out[15] = clamp01(indexCurl * middleCurl * (1 - meanRingPinky));  // V signature

  return out;
}

// 3-frame moving average (jitter 감소).
export class FeatureSmoother {
  private buf: number[][] = [];
  private maxLen = 3;

  push(feat: number[]): number[] {
    this.buf.push(feat);
    if (this.buf.length > this.maxLen) this.buf.shift();
    if (this.buf.length === 0) return new Array(FEATURE_DIM).fill(0);
    const avg = new Array(FEATURE_DIM).fill(0);
    for (const f of this.buf) {
      for (let i = 0; i < FEATURE_DIM; i += 1) avg[i] += f[i] || 0;
    }
    for (let i = 0; i < FEATURE_DIM; i += 1) avg[i] /= this.buf.length;
    return avg;
  }

  reset() {
    this.buf = [];
  }
}
