// 21 hand landmarks → 16-dim feature vector (모든 dim 0~1 normalized).
// 손바닥 크기로 정규화 → 카메라 거리 무관, 회전 invariant.
//
// 16 dims:
//   0~4   finger_curl_*    (thumb/index/middle/ring/pinky) — TIP↔MCP 직선 거리 / palm size
//   5~9   finger_angle_*   PIP 관절 cos(angle) — MCP↔PIP↔TIP 의 굽힘 각도
//   10    pinch_dist       thumb_tip ↔ index_tip
//   11    tIs_spread       thumb_mcp ↔ index_mcp 거리 (벌림)
//   12    palm_open        5 손가락 끝 평균 ↔ 손바닥 중심
//   13    palm_orient_x    손목→middle_mcp 벡터 x 성분
//   14    palm_orient_y    손목→middle_mcp 벡터 y 성분
//   15    wrist_roll       thumb_mcp ↔ pinky_mcp 의 y 차이 (손등 vs 손바닥)

import { LM, distance, palmSize, angleCos, clamp01, type HandLandmarks } from './landmark';

export const FEATURE_DIM = 16;

export const FEATURE_LABELS: string[] = [
  'thumb_curl', 'index_curl', 'middle_curl', 'ring_curl', 'pinky_curl',
  'thumb_ang',  'index_ang',  'middle_ang',  'ring_ang',  'pinky_ang',
  'pinch',      'spread',
  'palm_open',  'orient_x',   'orient_y',    'wrist_roll',
];

// 손가락별 (MCP, PIP, TIP) 인덱스 — 각도 계산용.
const FINGER_JOINTS: Array<[number, number, number]> = [
  [LM.THUMB_MCP, LM.THUMB_IP, LM.THUMB_TIP],
  [LM.INDEX_MCP, LM.INDEX_PIP, LM.INDEX_TIP],
  [LM.MIDDLE_MCP, LM.MIDDLE_PIP, LM.MIDDLE_TIP],
  [LM.RING_MCP, LM.RING_PIP, LM.RING_TIP],
  [LM.PINKY_MCP, LM.PINKY_PIP, LM.PINKY_TIP],
];

// 손가락별 (TIP, MCP) — 직선 curl 계산용.
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

  const out: number[] = [];

  // 0~4: finger_curl — TIP↔MCP 거리 / palm_size, 1.0=핀, 0=완전 굽힘.
  // 보통 펴진 손가락은 ratio 1.5~2.0, 주먹은 0.3~0.5. 1.5 로 나눠 0~1 범위.
  for (const [tip, mcp] of FINGER_TIPS_MCPS) {
    const ratio = distance(lms[tip], lms[mcp]) / ps;
    out.push(clamp01(ratio / 1.5));
  }

  // 5~9: finger_angle — PIP cos(angle). cos=−1 (펴짐, 180°) → 1, cos=+1 (굽힘, 0°) → 0.
  // (1 - cos) / 2 로 0~1 정규화 (펴진 상태 = 1, 굽힌 상태 = 0).
  for (const [mcp, pip, tip] of FINGER_JOINTS) {
    const c = angleCos(lms[mcp], lms[pip], lms[tip]);
    out.push(clamp01((1 - c) / 2));
  }

  // 10: pinch_dist — thumb_tip ↔ index_tip / palm_size. 0=닿음, 1=벌림 (>=1.0 ratio).
  out.push(clamp01(distance(lms[LM.THUMB_TIP], lms[LM.INDEX_TIP]) / ps));

  // 11: thumb-index spread — mcp 사이 (손가락 사이 벌림 정도, 약 0.3~0.6 ratio).
  out.push(clamp01(distance(lms[LM.THUMB_MCP], lms[LM.INDEX_MCP]) / ps / 0.6));

  // 12: palm_open — 5 손가락 끝 평균 ↔ 손목 거리 / palm size.
  let sumDist = 0;
  for (const tip of FINGER_TIPS) sumDist += distance(lms[tip], lms[LM.WRIST]);
  out.push(clamp01(sumDist / 5 / ps / 2.0));

  // 13~14: palm_orient_x/y — 손목→middle_mcp 벡터의 x,y 성분 (정규화).
  // 0.5 가 중앙 (손이 정면), 0~1 범위.
  const dx = lms[LM.MIDDLE_MCP].x - lms[LM.WRIST].x;
  const dy = lms[LM.MIDDLE_MCP].y - lms[LM.WRIST].y;
  const dmag = Math.hypot(dx, dy) || 1;
  out.push(clamp01((dx / dmag + 1) / 2));
  out.push(clamp01((dy / dmag + 1) / 2));

  // 15: wrist_roll — thumb_mcp.y ↔ pinky_mcp.y 차이 (손등 vs 손바닥).
  // |thumb.y - pinky.y| / palm_size, 0=같은 높이 (손바닥/등 평면), 1=손가락 측면.
  out.push(clamp01(Math.abs(lms[LM.THUMB_MCP].y - lms[LM.PINKY_MCP].y) / ps));

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
