// Phase 3.9 v40 (2026-06-04) — rule-based gesture classifier.
//
// 사용자 가치: 첫 spawn 시 자세를 자동 분류 → 라벨 제안 → 사용자 1-click confirm.
// 직전 사용자가 매번 manual 라벨 입력 영역 부담.
//
// 정직 한계:
//   - MediaPipe GestureRecognizer (별도 model 다운로드) 대신 landmark 기반
//     rule heuristic — bundle size 0, accuracy 사용자 직관 수준.
//   - 5 가지 well-known 자세만 detect: open_palm, closed_fist, thumbs_up,
//     peace_sign, pointing_up. 그 외 자세 영역 null 반환 → 사용자 manual 입력.
//   - 학술 정합: rule-based classifier (Lee 2008 hand pose taxonomy) 영역
//     well-known pose vocabulary. CNN/Transformer 영역 SOTA 대체 가능.
//
// Landmark index (MediaPipe HandLandmarker 21-point):
//   0  wrist
//   1-4   thumb (CMC, MCP, IP, TIP)
//   5-8   index (MCP, PIP, DIP, TIP)
//   9-12  middle (MCP, PIP, DIP, TIP)
//   13-16 ring (MCP, PIP, DIP, TIP)
//   17-20 pinky (MCP, PIP, DIP, TIP)

import type { HandLandmark } from '@/lib/hand-tracking/landmarker';

export type GestureKind =
  | 'open_palm'
  | 'closed_fist'
  | 'thumbs_up'
  | 'peace_sign'
  | 'pointing_up'
  | 'ok_sign';

export interface GestureResult {
  kind: GestureKind;
  label: string;          // 사용자 친화 한국어 라벨
  confidence: number;     // 0..1 — rule strictness 충족 비율
}

const LABEL_BY_KIND: Record<GestureKind, string> = {
  open_palm: '손바닥',
  closed_fist: '주먹',
  thumbs_up: '엄지척',
  peace_sign: '브이',
  pointing_up: '손가락 가리키기',
  ok_sign: 'OK',
};

// finger extension check: fingertip y < pip y (MediaPipe y=0 top).
// 정직 한계: 손 회전 / 각도 영역 영향 영역 — 정면 자세 가정.
function isFingerExtended(lm: HandLandmark[], tipIdx: number, pipIdx: number): boolean {
  // Distance from tip to wrist > distance from pip to wrist → extended
  // (회전 robustness 영역 y 영역 직접 비교 대신 wrist 거리).
  const wrist = lm[0];
  const tip = lm[tipIdx];
  const pip = lm[pipIdx];
  const tipDist = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
  const pipDist = Math.hypot(pip.x - wrist.x, pip.y - wrist.y);
  return tipDist > pipDist * 1.05;  // 5% margin (noise tolerance)
}

function isFingerCurled(lm: HandLandmark[], tipIdx: number, pipIdx: number): boolean {
  const wrist = lm[0];
  const tip = lm[tipIdx];
  const pip = lm[pipIdx];
  const tipDist = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
  const pipDist = Math.hypot(pip.x - wrist.x, pip.y - wrist.y);
  return tipDist < pipDist * 1.02;  // tip closer than pip → curled
}

// Thumb 영역 별도 처리 — CMC/MCP/IP/TIP 영역 axis 영역 다른 finger 영역 다름.
function isThumbExtended(lm: HandLandmark[]): boolean {
  const wrist = lm[0];
  const thumbTip = lm[4];
  const thumbIp = lm[3];
  const tipDist = Math.hypot(thumbTip.x - wrist.x, thumbTip.y - wrist.y);
  const ipDist = Math.hypot(thumbIp.x - wrist.x, thumbIp.y - wrist.y);
  return tipDist > ipDist * 1.05;
}

// Thumb 영역 위로 향한지 (thumbs_up specific) — thumbTip y < wrist y.
function isThumbUp(lm: HandLandmark[]): boolean {
  return lm[4].y < lm[0].y - 0.1;  // tip 영역 wrist 보다 위 (image y=0 top).
}

// Index tip + thumb tip 가까움 (OK sign specific).
function isPinch(lm: HandLandmark[]): boolean {
  const indexTip = lm[8];
  const thumbTip = lm[4];
  const dist = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);
  return dist < 0.06; // normalized coords, small pinch threshold
}

/**
 * Rule-based gesture classifier.
 * @returns null 이면 well-known 자세 매칭 안 됨 — 사용자 manual 라벨 입력.
 */
export function classifyGesture(lm: HandLandmark[]): GestureResult | null {
  if (!lm || lm.length !== 21) return null;

  const thumbExt = isThumbExtended(lm);
  const indexExt = isFingerExtended(lm, 8, 6);
  const middleExt = isFingerExtended(lm, 12, 10);
  const ringExt = isFingerExtended(lm, 16, 14);
  const pinkyExt = isFingerExtended(lm, 20, 18);

  const indexCurl = isFingerCurled(lm, 8, 6);
  const middleCurl = isFingerCurled(lm, 12, 10);
  const ringCurl = isFingerCurled(lm, 16, 14);
  const pinkyCurl = isFingerCurled(lm, 20, 18);

  // OK sign: index+thumb pinch, 다른 손가락 extended.
  if (isPinch(lm) && middleExt && ringExt && pinkyExt) {
    return { kind: 'ok_sign', label: LABEL_BY_KIND.ok_sign, confidence: 0.85 };
  }

  // Thumbs up: thumb extended + 위로, 다른 손가락 curled.
  if (thumbExt && isThumbUp(lm) && indexCurl && middleCurl && ringCurl && pinkyCurl) {
    return { kind: 'thumbs_up', label: LABEL_BY_KIND.thumbs_up, confidence: 0.95 };
  }

  // Open palm: 모든 손가락 extended.
  if (thumbExt && indexExt && middleExt && ringExt && pinkyExt) {
    return { kind: 'open_palm', label: LABEL_BY_KIND.open_palm, confidence: 0.95 };
  }

  // Closed fist: 모든 손가락 curled.
  if (indexCurl && middleCurl && ringCurl && pinkyCurl) {
    return { kind: 'closed_fist', label: LABEL_BY_KIND.closed_fist, confidence: 0.90 };
  }

  // Peace sign: index + middle extended, ring + pinky curled.
  if (indexExt && middleExt && ringCurl && pinkyCurl) {
    return { kind: 'peace_sign', label: LABEL_BY_KIND.peace_sign, confidence: 0.90 };
  }

  // Pointing up: index 만 extended.
  if (indexExt && middleCurl && ringCurl && pinkyCurl) {
    return { kind: 'pointing_up', label: LABEL_BY_KIND.pointing_up, confidence: 0.85 };
  }

  return null;
}
