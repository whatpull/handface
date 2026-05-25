// Hand Landmark → SNN Spike Encoder.
//
// SNN Perfect Brain Roadmap Phase 1.2 (사용자 비전 — SNN 중심 + 미래 LLM 연동).
// MediaPipe Hand 의 21 landmarks × 3 coord (x, y, z) = 63 dim 입력 →
// SNN substrate 에 주입할 spike pattern 변환.
//
// 학술 정합:
//   - Adrian 1926 — rate coding biological origin.
//   - Thorpe 1990 — temporal coding (first-spike timing).
//   - Diehl & Cook 2015 — STDP MNIST 영역 영역 영역 영역 input encoding.
//
// MediaPipe Hand landmark order (21 points):
//   0: WRIST
//   1-4: THUMB (CMC, MCP, IP, TIP)
//   5-8: INDEX (MCP, PIP, DIP, TIP)
//   9-12: MIDDLE (MCP, PIP, DIP, TIP)
//   13-16: RING (MCP, PIP, DIP, TIP)
//   17-20: PINKY (MCP, PIP, DIP, TIP)

export interface HandLandmark {
  x: number; // normalized [0, 1]
  y: number;
  z: number; // depth (signed)
}

export const N_HAND_LANDMARKS = 21;
export const HAND_RAW_DIM = N_HAND_LANDMARKS * 3; // 63

// Finger tip indices (in MediaPipe Hand convention).
export const FINGER_TIPS = {
  thumb: 4,
  index: 8,
  middle: 12,
  ring: 16,
  pinky: 20,
} as const;

export const FINGER_MCPS = {
  thumb: 2,
  index: 5,
  middle: 9,
  ring: 13,
  pinky: 17,
} as const;

// ── 1. Flatten 21 landmarks to 63-dim raw vector ──

export function flattenLandmarks(landmarks: ReadonlyArray<HandLandmark>): number[] {
  if (landmarks.length !== N_HAND_LANDMARKS) {
    throw new Error(`flattenLandmarks: expected ${N_HAND_LANDMARKS} landmarks, got ${landmarks.length}`);
  }
  const out = new Array<number>(HAND_RAW_DIM);
  for (let i = 0; i < N_HAND_LANDMARKS; i += 1) {
    out[i * 3 + 0] = landmarks[i].x;
    out[i * 3 + 1] = landmarks[i].y;
    out[i * 3 + 2] = landmarks[i].z;
  }
  return out;
}

// ── 2. Derived hand features (geometric) ──

export interface HandDerivedFeatures {
  fingerExtensions: number[];    // 5 fingers — 각 손가락 영역 영역 영역 (tip-to-MCP distance / palm size)
  fingerBendAngles: number[];    // 5 fingers — 각 손가락 영역 영역 영역
  palmCenterX: number;
  palmCenterY: number;
  palmSize: number;              // wrist-to-middle-MCP distance
  handOrientationAngle: number;  // 손바닥 영역 (radians)
}

function dist3D(a: HandLandmark, b: HandLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

export function computeHandFeatures(landmarks: ReadonlyArray<HandLandmark>): HandDerivedFeatures {
  if (landmarks.length !== N_HAND_LANDMARKS) {
    throw new Error(`computeHandFeatures: expected ${N_HAND_LANDMARKS} landmarks`);
  }
  const wrist = landmarks[0];
  const middleMcp = landmarks[FINGER_MCPS.middle];
  const palmSize = dist3D(wrist, middleMcp);

  // Finger extension: tip-to-MCP distance normalized by palm size.
  const fingerExtensions: number[] = [];
  const fingerBendAngles: number[] = [];
  for (const [, tipIdx] of Object.entries(FINGER_TIPS)) {
    const finger = tipIdx as 4 | 8 | 12 | 16 | 20;
    // MCP, PIP/IP, DIP, TIP for each finger.
    const mcp = landmarks[finger - 3];
    const tip = landmarks[finger];
    const ext = palmSize > 0 ? dist3D(mcp, tip) / palmSize : 0;
    fingerExtensions.push(Math.max(0, Math.min(2, ext)));
    // Bend angle: dot product of (PIP→MCP) and (PIP→TIP).
    const pip = landmarks[finger - 2];
    const v1 = { x: mcp.x - pip.x, y: mcp.y - pip.y, z: mcp.z - pip.z };
    const v2 = { x: tip.x - pip.x, y: tip.y - pip.y, z: tip.z - pip.z };
    const n1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
    const n2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
    const dot = (n1 > 0 && n2 > 0) ? (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z) / (n1 * n2) : 1;
    const angle = Math.acos(Math.max(-1, Math.min(1, dot))); // radians [0, π]
    fingerBendAngles.push(angle / Math.PI); // normalized [0, 1]
  }

  // Palm center — average of MCPs.
  let palmCx = 0, palmCy = 0;
  const mcpIndices = Object.values(FINGER_MCPS) as number[];
  for (const i of mcpIndices) { palmCx += landmarks[i].x; palmCy += landmarks[i].y; }
  palmCx /= mcpIndices.length;
  palmCy /= mcpIndices.length;

  // Hand orientation — angle of wrist → middle MCP vector.
  const handOrientationAngle = Math.atan2(middleMcp.y - wrist.y, middleMcp.x - wrist.x);

  return {
    fingerExtensions,
    fingerBendAngles,
    palmCenterX: palmCx,
    palmCenterY: palmCy,
    palmSize,
    handOrientationAngle: (handOrientationAngle + Math.PI) / (2 * Math.PI), // normalized [0, 1]
  };
}

// ── 3. Encode landmark + derived → SNN feature vector ──

// Hand-specific feature vector: 63 raw + 12 derived = 75 dim
//   [0..62]:  raw 21 × 3 coords
//   [63..67]: 5 finger extensions
//   [68..72]: 5 finger bend angles
//   [73]:     palm orientation
//   [74]:     palm size (normalized)
export const HAND_FEAT_DIM = 75;

export function encodeHandToFeatureVector(landmarks: ReadonlyArray<HandLandmark>): number[] {
  const flat = flattenLandmarks(landmarks);
  const derived = computeHandFeatures(landmarks);
  return [
    ...flat,
    ...derived.fingerExtensions,
    ...derived.fingerBendAngles,
    derived.handOrientationAngle,
    Math.min(1, derived.palmSize * 5), // normalize palm size to roughly [0,1]
  ];
}

// ── 4. Spike rate encoding ──

export interface SpikeEvent {
  neuron: string;        // 'in_feat_<i>'
  weight: number;        // injection weight
  time: number;          // ms
  durationMs: number;
  stepMs: number;
}

// Convert feature vector → spike injection events (Adrian 1926 rate coding).
// Each feature > activationThreshold → spike at injection weight.
export function encodeFeatureToSpikes(
  featureVector: ReadonlyArray<number>,
  activationThreshold: number = 0.3,
  baseWeight: number = 30,
  durationMs: number = 80,
  stepMs: number = 0.1,
  startTime: number = 0,
): SpikeEvent[] {
  const events: SpikeEvent[] = [];
  for (let i = 0; i < featureVector.length; i += 1) {
    if (featureVector[i] > activationThreshold) {
      // Spike weight scales with feature intensity (graded rate code).
      const intensity = Math.min(1, featureVector[i]);
      events.push({
        neuron: `in_feat_${i}`,
        weight: baseWeight * intensity,
        time: startTime,
        durationMs,
        stepMs,
      });
    }
  }
  return events;
}

// ── 5. Temporal encoding (first-spike timing, Thorpe 1990) ──

// Higher feature value → earlier spike (priority encoding).
export function encodeFeatureToTemporalSpikes(
  featureVector: ReadonlyArray<number>,
  activationThreshold: number = 0.3,
  baseWeight: number = 30,
  maxLatencyMs: number = 50,
  durationMs: number = 10,
  stepMs: number = 0.1,
): SpikeEvent[] {
  const events: SpikeEvent[] = [];
  for (let i = 0; i < featureVector.length; i += 1) {
    if (featureVector[i] > activationThreshold) {
      const intensity = Math.min(1, featureVector[i]);
      // High intensity → earliest spike. Latency = (1 - intensity) × maxLatency.
      const latency = (1 - intensity) * maxLatencyMs;
      events.push({
        neuron: `in_feat_${i}`,
        weight: baseWeight,
        time: latency,
        durationMs,
        stepMs,
      });
    }
  }
  return events;
}
