// MediaPipe Hand Landmark 21 정의 + 타입.
// https://developers.google.com/mediapipe/solutions/vision/hand_landmarker

export interface Landmark {
  x: number;  // 0~1 normalized (image width)
  y: number;  // 0~1 normalized (image height)
  z: number;  // depth, ~ -1~1 (relative)
}

export type HandLandmarks = Landmark[];  // length 21

// MediaPipe 표준 인덱스.
export const LM = {
  WRIST: 0,
  THUMB_CMC: 1, THUMB_MCP: 2, THUMB_IP: 3, THUMB_TIP: 4,
  INDEX_MCP: 5, INDEX_PIP: 6, INDEX_DIP: 7, INDEX_TIP: 8,
  MIDDLE_MCP: 9, MIDDLE_PIP: 10, MIDDLE_DIP: 11, MIDDLE_TIP: 12,
  RING_MCP: 13, RING_PIP: 14, RING_DIP: 15, RING_TIP: 16,
  PINKY_MCP: 17, PINKY_PIP: 18, PINKY_DIP: 19, PINKY_TIP: 20,
} as const;

// 손바닥 크기 (정규화 기준) — 손목 ↔ middle MCP.
export function palmSize(lm: HandLandmarks): number {
  return distance(lm[LM.WRIST], lm[LM.MIDDLE_MCP]);
}

export function distance(a: Landmark, b: Landmark): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// 두 vector 사이 cos(angle).
// (PIP→MCP) 와 (PIP→TIP) 의 cos → -1 (펴짐) ~ +1 (완전 굽힘).
export function angleCos(p1: Landmark, p2: Landmark, p3: Landmark): number {
  const v1 = { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z };
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y, z: p3.z - p2.z };
  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  const m1 = Math.hypot(v1.x, v1.y, v1.z);
  const m2 = Math.hypot(v2.x, v2.y, v2.z);
  if (m1 === 0 || m2 === 0) return 0;
  return Math.max(-1, Math.min(1, dot / (m1 * m2)));
}

// 0~1 clamp.
export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}
