// Hand Landmark → SNN Spike Encoder.
//
// SNN Perfect Brain Roadmap Phase 1.2 (사용자 비전 — SNN 중심 + 미래 LLM 연동).
// MediaPipe Hand 의 21 landmarks × 3 coord (x, y, z) = 63 dim 입력 →
// SNN substrate 에 주입할 spike pattern 변환.
//
// 학술 정합:
//   - Adrian 1926 — rate coding biological origin.
//   - Thorpe 1990 — temporal coding (first-spike timing).
//   - Diehl & Cook 2015 — STDP MNIST 학습 시 input rate encoding.
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

// Phase 3.9 v11 (2026-06-03): wrist-relative + palm-size normalized 변형.
// captured fixture test (phase-3-v11-encoder-normalization-iter):
//   cross-pose discrimination (1-cos sum): v9 0.287 → v11 0.969 (3.4x 향상)
//   translation invariance: PERFECT
// 단 R-STDP encodeFeatureToSpikes path 가 0.3 threshold 가정 → 도입 시 회귀.
// 본 함수는 LiveSnn cosine sim path 전용 — encoder 의 spike-encoding 영향 없음.
export function flattenLandmarksNormalized(landmarks: ReadonlyArray<HandLandmark>): number[] {
  if (landmarks.length !== N_HAND_LANDMARKS) {
    throw new Error(`flattenLandmarksNormalized: expected ${N_HAND_LANDMARKS} landmarks`);
  }
  const wrist = landmarks[0];
  const middleMcp = landmarks[FINGER_MCPS.middle];
  const palmSize = Math.sqrt(
    (wrist.x - middleMcp.x) ** 2 +
    (wrist.y - middleMcp.y) ** 2 +
    (wrist.z - middleMcp.z) ** 2,
  ) || 0.1;
  const out = new Array<number>(HAND_RAW_DIM);
  for (let i = 0; i < N_HAND_LANDMARKS; i += 1) {
    out[i * 3 + 0] = (landmarks[i].x - wrist.x) / palmSize;
    out[i * 3 + 1] = (landmarks[i].y - wrist.y) / palmSize;
    out[i * 3 + 2] = (landmarks[i].z - wrist.z) / palmSize;
  }
  return out;
}

// Phase 3.9 v11: LiveSnn cosine sim 전용 — wrist-relative raw + derived features.
export function encodeHandForCosineSim(landmarks: ReadonlyArray<HandLandmark>): number[] {
  const flatNorm = flattenLandmarksNormalized(landmarks);
  const derived = computeHandFeatures(landmarks);
  const discriminative = computeDiscriminativeFeatures(landmarks);
  return [
    ...flatNorm,
    ...derived.fingerExtensions,
    ...derived.fingerBendAngles,
    derived.handOrientationAngle,
    Math.min(1, derived.palmSize * 5),
    ...discriminative.pinchDistances,
    ...discriminative.fingerSpreadAngles,
    ...discriminative.wristToTipDistances,
    ...discriminative.fingerExtensionDeltas,
    discriminative.openness,
  ];
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

// ── 3. Discriminative Hand Features (v2) ──
//
// Hand SNN R-STDP (commit b1d2f26) 영역 0% accuracy 영역 — 영역 75-dim feature
// 영역 4 gestures active inputs ~80% overlap. 본 v2 discriminative features
// 추가 → 95-dim 확장. 단 sparse top-K encoding 가 본질 해결책 (HAND_SPARSE_TOP_K
// 참조) — 단순 discriminative 추가만으로는 cluster separability 보장 안 됨.
//
// Additional discriminative features (5 categories):
//   - Pinch distances (5 pairs: thumb-index/middle/ring/pinky + index-middle)
//   - Finger spread angles (4 pairs: between adjacent finger tips)
//   - Wrist-to-tip distances (5 — 영역 영역 영역 영역 영역 영역)
//   - Per-finger extension delta (relative to thumb — directional info)
//   - Hand "openness" composite score

export interface DiscriminativeFeatures {
  pinchDistances: number[];        // 5 — thumb to each other finger + index-middle
  fingerSpreadAngles: number[];    // 4 — angle between adjacent tips relative to palm
  wristToTipDistances: number[];   // 5 — wrist to each finger tip
  fingerExtensionDeltas: number[]; // 5 — finger ext - thumb ext (signed)
  openness: number;                // 0..1 composite (avg tip-to-MCP)
}

export function computeDiscriminativeFeatures(landmarks: ReadonlyArray<HandLandmark>): DiscriminativeFeatures {
  if (landmarks.length !== N_HAND_LANDMARKS) {
    throw new Error(`computeDiscriminativeFeatures: expected ${N_HAND_LANDMARKS} landmarks`);
  }
  const wrist = landmarks[0];
  const thumbTip = landmarks[FINGER_TIPS.thumb];
  const indexTip = landmarks[FINGER_TIPS.index];
  const middleTip = landmarks[FINGER_TIPS.middle];
  const ringTip = landmarks[FINGER_TIPS.ring];
  const pinkyTip = landmarks[FINGER_TIPS.pinky];

  const palmSize = dist3D(wrist, landmarks[FINGER_MCPS.middle]) || 0.1;

  // Pinch distances (5).
  const pinchDistances = [
    dist3D(thumbTip, indexTip) / palmSize,
    dist3D(thumbTip, middleTip) / palmSize,
    dist3D(thumbTip, ringTip) / palmSize,
    dist3D(thumbTip, pinkyTip) / palmSize,
    dist3D(indexTip, middleTip) / palmSize,
  ].map(d => Math.max(0, Math.min(2, d)));

  // Finger spread angles (4 adjacent pairs).
  const tips = [thumbTip, indexTip, middleTip, ringTip, pinkyTip];
  const fingerSpreadAngles: number[] = [];
  for (let i = 0; i < 4; i += 1) {
    const a = tips[i];
    const b = tips[i + 1];
    const vA = { x: a.x - wrist.x, y: a.y - wrist.y, z: a.z - wrist.z };
    const vB = { x: b.x - wrist.x, y: b.y - wrist.y, z: b.z - wrist.z };
    const nA = Math.sqrt(vA.x ** 2 + vA.y ** 2 + vA.z ** 2);
    const nB = Math.sqrt(vB.x ** 2 + vB.y ** 2 + vB.z ** 2);
    const dot = (nA > 0 && nB > 0) ? (vA.x * vB.x + vA.y * vB.y + vA.z * vB.z) / (nA * nB) : 1;
    const angle = Math.acos(Math.max(-1, Math.min(1, dot))) / Math.PI;
    fingerSpreadAngles.push(angle);
  }

  // Wrist-to-tip distances (5).
  const wristToTipDistances = tips.map(t => Math.min(2, dist3D(wrist, t) / palmSize));

  // Per-finger extension delta (5).
  const features = computeHandFeatures(landmarks);
  const thumbExt = features.fingerExtensions[0];
  const fingerExtensionDeltas = features.fingerExtensions.map(e => (e - thumbExt + 1) / 2); // shift to [0, 1+]

  // Openness composite.
  const openness = features.fingerExtensions.reduce((a, b) => a + b, 0) / features.fingerExtensions.length;

  return {
    pinchDistances,
    fingerSpreadAngles,
    wristToTipDistances,
    fingerExtensionDeltas,
    openness: Math.min(1, openness / 1.5),
  };
}

// ── 4. Encode landmark + derived → SNN feature vector (v2 enhanced) ──

// Hand-specific feature vector (v2): 63 raw + 12 base + 20 discriminative = 95 dim
//   [0..62]:   raw 21 × 3 coords
//   [63..67]:  5 finger extensions
//   [68..72]:  5 finger bend angles
//   [73]:      palm orientation
//   [74]:      palm size (normalized)
//   [75..79]:  5 pinch distances (thumb-other × 4 + index-middle)
//   [80..83]:  4 finger spread angles (adjacent pairs)
//   [84..88]:  5 wrist-to-tip distances
//   [89..93]:  5 finger extension deltas (relative to thumb)
//   [94]:      openness composite
export const HAND_FEAT_DIM = 95;

export function encodeHandToFeatureVector(landmarks: ReadonlyArray<HandLandmark>): number[] {
  const flat = flattenLandmarks(landmarks);
  const derived = computeHandFeatures(landmarks);
  const discriminative = computeDiscriminativeFeatures(landmarks);
  return [
    ...flat,
    ...derived.fingerExtensions,
    ...derived.fingerBendAngles,
    derived.handOrientationAngle,
    Math.min(1, derived.palmSize * 5),
    ...discriminative.pinchDistances,
    ...discriminative.fingerSpreadAngles,
    ...discriminative.wristToTipDistances,
    ...discriminative.fingerExtensionDeltas,
    discriminative.openness,
  ];
}

// ── 3.5. Sparse top-K active input selection (input bottleneck 해결) ──
//
// 측정 (hand-gesture-distinctiveness.json, 2026-05-26):
//   threshold 0.2 활성 inputs 54-54-54-52 (=~57% dense), 4 gesture pairwise
//   Jaccard distinctiveness 0.0185 (=98% overlap). R-STDP/ART/EWC 어떤
//   mechanism도 이 overlap 위에서는 분리 불가능.
//
// P215 selectivity 시리즈가 작동한 이유: 4×4 grid binary pattern은 active
// inputs 가 자연스럽게 sparse (4-6/16) + pattern 간 disjoint.
//
// 해결 (Olshausen & Field 1996 sparse coding):
//   1) Top-K — 각 gesture의 상위 K개 feature만 active (단순, single-frame)
//   2) Mean-subtracted Top-K — gesture set 평균 제거 후 |residual| top-K
//      (단점: gesture set batch 필요 — production single-frame inference 영역
//       사용 불가, training-time batch 영역 영역만 사용 가능)
//   3) Forced disjoint Top-K — greedy 할당, 모든 pair Jaccard=0 보장
//      (진단 도구 — gesture set batch 필요, online incremental 영역 부분 적용 가능)
//
// Production worker dispatch 경로의 default K (encoder export, worker-core 가
// 동일 import 영역 사용 — 매직 numbers 단일 출처).
export const HAND_SPARSE_TOP_K_DEFAULT = 5 as const;

// Top-K active indices (단순) — feature value 상위 K개 index 반환.
export function selectTopKActive(
  featureVector: ReadonlyArray<number>,
  k: number,
): number[] {
  const pairs: { idx: number; val: number }[] = [];
  for (let i = 0; i < featureVector.length; i += 1) {
    pairs.push({ idx: i, val: featureVector[i] });
  }
  pairs.sort((a, b) => b.val - a.val);
  const topK = pairs.slice(0, k).map(p => p.idx);
  topK.sort((a, b) => a - b);
  return topK;
}

// Mean-subtracted Top-K — gesture set 의 평균 feature 를 빼고 |residual| 상위 K.
// 각 gesture 의 "이 gesture 만 특히 활성화되는 features" 만 추출 — distinctiveness 직접 최대화.
export function selectMeanSubtractedTopK(
  featureVectors: ReadonlyArray<ReadonlyArray<number>>,
  k: number,
): number[][] {
  if (featureVectors.length === 0) return [];
  const dim = featureVectors[0].length;
  const mean = new Array<number>(dim).fill(0);
  for (const fv of featureVectors) {
    for (let i = 0; i < dim; i += 1) mean[i] += fv[i];
  }
  for (let i = 0; i < dim; i += 1) mean[i] /= featureVectors.length;
  // For each gesture, select top-K by |residual|.
  return featureVectors.map(fv => {
    const pairs: { idx: number; res: number }[] = [];
    for (let i = 0; i < dim; i += 1) {
      pairs.push({ idx: i, res: Math.abs(fv[i] - mean[i]) });
    }
    pairs.sort((a, b) => b.res - a.res);
    const topK = pairs.slice(0, k).map(p => p.idx);
    topK.sort((a, b) => a - b);
    return topK;
  });
}

// Sparse top-K → feature vector (top-K indices 만 원본 값 유지, 나머지 0).
export function applySparseTopK(
  featureVector: ReadonlyArray<number>,
  topKIndices: ReadonlyArray<number>,
): number[] {
  const out = new Array<number>(featureVector.length).fill(0);
  for (const i of topKIndices) out[i] = featureVector[i];
  return out;
}

// Forced-disjoint top-K — gesture set 의 mean-subtracted |residual| 순회하며
// 각 gesture 가 K 개의 unique indices 를 가질 때까지 다른 gesture 와 겹치지 않게
// greedy 할당. 보장: 모든 pair Jaccard = 0.
//
// 사용 시 경고: 일부 gesture 의 top-K 가 informationally weak indices 로
// 채워질 수 있음 (다른 gesture 가 모든 strong residual 을 먼저 차지하면). 그러나
// cluster separability 의 ceiling 을 검증하는 진단 도구로는 매우 적합.
export function selectForcedDisjointTopK(
  featureVectors: ReadonlyArray<ReadonlyArray<number>>,
  k: number,
): number[][] {
  if (featureVectors.length === 0) return [];
  const dim = featureVectors[0].length;
  const mean = new Array<number>(dim).fill(0);
  for (const fv of featureVectors) {
    for (let i = 0; i < dim; i += 1) mean[i] += fv[i];
  }
  for (let i = 0; i < dim; i += 1) mean[i] /= featureVectors.length;

  // 각 gesture 의 |residual| 정렬된 list 보관.
  const perGesture = featureVectors.map(fv => {
    const pairs: { idx: number; res: number }[] = [];
    for (let i = 0; i < dim; i += 1) pairs.push({ idx: i, res: Math.abs(fv[i] - mean[i]) });
    pairs.sort((a, b) => b.res - a.res);
    return pairs;
  });

  // Round-robin greedy 할당. 각 gesture 가 차례로 자신의 list 에서 다음 미사용 index 선택.
  const claimed = new Set<number>();
  const result: number[][] = featureVectors.map(() => []);
  const cursors: number[] = featureVectors.map(() => 0);
  let totalNeeded = featureVectors.length * k;
  while (totalNeeded > 0) {
    let progressed = false;
    for (let g = 0; g < featureVectors.length; g += 1) {
      if (result[g].length >= k) continue;
      while (cursors[g] < perGesture[g].length) {
        const candidate = perGesture[g][cursors[g]].idx;
        cursors[g] += 1;
        if (!claimed.has(candidate)) {
          claimed.add(candidate);
          result[g].push(candidate);
          totalNeeded -= 1;
          progressed = true;
          break;
        }
      }
    }
    if (!progressed) break; // 더 이상 unique indices 없음.
  }
  // Sort each gesture's indices for determinism.
  for (const r of result) r.sort((a, b) => a - b);
  return result;
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
