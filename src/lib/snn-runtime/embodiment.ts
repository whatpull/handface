// Phase H — Embodiment (완벽한 인공지능 3 단계).
//
// SNN Perfect Brain Roadmap (사용자 mandate 2026-05-25) 3 단계.
// Phase F (Multi-Modality) + G (Consciousness) 다음. sensorimotor closed loop
// + predictive coding. MediaPipe Hand → motor command → updated sensor → 학습.
//
// 본 모듈 building blocks (pure functions):
//   1. Motor command generation — cluster activation → motor pose vector.
//   2. Sensorimotor feedback — motor execution → expected sensor delta.
//   3. Predictive coding — predicted vs actual sensor → error signal → 학습 driver.
//   4. Body schema — proprioception 영역 영역 self representation.
//   5. Active inference — Friston 2010 free energy minimization.
//
// 학술 정합:
//   - Lungarella & Sporns 2006 — Mapping information flow in sensorimotor.
//   - Rao & Ballard 1999 — Predictive coding (hierarchical generative model).
//   - Pfeifer & Bongard 2007 — Embodied intelligence.
//   - Friston 2010 — Free energy principle (active inference).
//   - Wolpert & Ghahramani 2000 — Computational principles of motor control.

// ── 1. Motor Command Generation ──

export interface MotorCommand {
  effector: string;        // 예: 'hand_thumb', 'hand_index'
  targetPosition: number[]; // [x, y, z] target
  velocity: number;         // movement speed
  duration: number;         // execution time (ms)
}

// Cluster activation → motor pose. 영역 winner cluster id 영역 영역 pre-defined
// motor mapping (학습 가능, 단순 lookup 영역).
// 학술 정합: Wolpert & Ghahramani 2000 — internal model 영역 motor commands.
export function clusterToMotorCommand(
  clusterId: number,
  mapping: ReadonlyMap<number, MotorCommand>,
): MotorCommand | null {
  return mapping.get(clusterId) ?? null;
}

// Multiple cluster → blended motor (population coding 정합).
// 학술 정합: Georgopoulos 1986 — motor cortex population vector coding.
export function blendedMotorCommand(
  clusterActivities: ReadonlyArray<{ clusterId: number; activity: number }>,
  mapping: ReadonlyMap<number, MotorCommand>,
): MotorCommand | null {
  if (clusterActivities.length === 0) return null;
  let totalActivity = 0;
  const blended: { x: number; y: number; z: number; velocity: number; duration: number } = {
    x: 0, y: 0, z: 0, velocity: 0, duration: 0,
  };
  let effector = '';
  for (const ca of clusterActivities) {
    const cmd = mapping.get(ca.clusterId);
    if (!cmd) continue;
    if (!effector) effector = cmd.effector;
    const w = ca.activity;
    blended.x += (cmd.targetPosition[0] ?? 0) * w;
    blended.y += (cmd.targetPosition[1] ?? 0) * w;
    blended.z += (cmd.targetPosition[2] ?? 0) * w;
    blended.velocity += cmd.velocity * w;
    blended.duration += cmd.duration * w;
    totalActivity += w;
  }
  if (totalActivity === 0) return null;
  return {
    effector,
    targetPosition: [blended.x / totalActivity, blended.y / totalActivity, blended.z / totalActivity],
    velocity: blended.velocity / totalActivity,
    duration: blended.duration / totalActivity,
  };
}

// ── 2. Sensorimotor Feedback ──

export interface SensorState {
  positions: number[][];   // 각 landmark [x, y, z]
  timestamp: number;
}

// Motor command 실행 → 예상 sensor delta (forward model).
// 학술 정합: Wolpert et al. 1995 — forward model 영역 predict sensor.
// 단순 model: command target position 영역 hand reaches target 영역 가정.
export function predictSensorDelta(
  command: MotorCommand,
  currentSensor: SensorState,
): number[][] {
  // 단순 가정: command effector 영역 target position 영역 영역 영역 영역.
  // realistic 영역 Jacobian / inverse kinematics 필요.
  return currentSensor.positions.map((pos) => {
    // 영역 landmark 영역 영역 target 영역 영역 영역 (proportional move).
    return [
      pos[0] + (command.targetPosition[0] - pos[0]) * 0.5,
      pos[1] + (command.targetPosition[1] - pos[1]) * 0.5,
      pos[2] + (command.targetPosition[2] - pos[2]) * 0.5,
    ];
  });
}

// ── 3. Predictive Coding (Rao & Ballard 1999) ──

// Predicted vs actual sensor → error signal (per landmark).
// 학술 정합: hierarchical generative model 영역 error propagation.
export function computeSensorError(
  predicted: ReadonlyArray<ReadonlyArray<number>>,
  actual: ReadonlyArray<ReadonlyArray<number>>,
): number[][] {
  if (predicted.length !== actual.length) return [];
  return predicted.map((p, i) => {
    if (!actual[i]) return p.map(() => 0);
    return p.map((v, j) => (actual[i][j] ?? v) - v);
  });
}

// Error magnitude (RMS) — 학습 signal 강도.
export function errorMagnitude(errors: ReadonlyArray<ReadonlyArray<number>>): number {
  if (errors.length === 0) return 0;
  let sumSq = 0;
  let count = 0;
  for (const e of errors) {
    for (const v of e) {
      sumSq += v * v;
      count += 1;
    }
  }
  return count > 0 ? Math.sqrt(sumSq / count) : 0;
}

// ── 4. Body Schema (proprioception) ──

export interface BodySchema {
  joints: Map<string, number[]>; // joint name → [angle1, angle2, ...]
  endEffectors: Map<string, number[]>; // landmark name → [x, y, z]
  lastUpdate: number;
}

// Sensor state → body schema 업데이트.
// 학술 정합: Maravita & Iriki 2004 — body schema 영역 sensorimotor experience
//   영역 영역.
export function updateBodySchema(
  schema: BodySchema,
  sensor: SensorState,
  landmarkNames: ReadonlyArray<string>,
): BodySchema {
  const newEndEffectors = new Map(schema.endEffectors);
  for (let i = 0; i < sensor.positions.length && i < landmarkNames.length; i += 1) {
    newEndEffectors.set(landmarkNames[i], [...sensor.positions[i]]);
  }
  return {
    ...schema,
    endEffectors: newEndEffectors,
    lastUpdate: sensor.timestamp,
  };
}

// ── 5. Active Inference (Friston 2010 free energy) ──

// Free energy = surprise + KL divergence. 영역 simplified:
//   F = prediction_error^2 + epistemic_value
// 영역 epistemic_value 영역 영역 영역 영역 미래 영역 영역 영역 영역 영역 영역
// 정보 영역 (exploration 보상).
export function freeEnergyProxy(
  predictionError: number,
  epistemicValue: number = 0,
): number {
  // Active inference 영역 free energy 영역 영역 영역 → 영역 영역 모드 영역
  //   prediction error 영역 영역 + 미래 영역 영역 영역 영역 영역.
  return predictionError * predictionError + epistemicValue;
}

// 영역 candidate action 영역 expected free energy 영역 → 영역 영역 action 선택.
// 학술 정합: Friston et al. 2017 — expected free energy minimization.
export function selectActionByMinimumFreeEnergy(
  candidates: ReadonlyArray<{ action: string; expectedFreeEnergy: number }>,
): string | null {
  if (candidates.length === 0) return null;
  let min = Infinity;
  let best: string | null = null;
  for (const c of candidates) {
    if (c.expectedFreeEnergy < min) { min = c.expectedFreeEnergy; best = c.action; }
  }
  return best;
}

// ── 6. Sensorimotor Loop Status ──

export interface SensorimotorLoopState {
  lastCommand: MotorCommand | null;
  lastPredictedSensor: number[][] | null;
  lastActualSensor: SensorState | null;
  lastError: number;
  loopCount: number;
}

export function stepSensorimotorLoop(
  state: SensorimotorLoopState,
  command: MotorCommand,
  actualSensor: SensorState,
): SensorimotorLoopState {
  const predicted = state.lastActualSensor
    ? predictSensorDelta(command, state.lastActualSensor)
    : actualSensor.positions;
  const errors = computeSensorError(predicted, actualSensor.positions);
  const errorMag = errorMagnitude(errors);
  return {
    lastCommand: command,
    lastPredictedSensor: predicted,
    lastActualSensor: actualSensor,
    lastError: errorMag,
    loopCount: state.loopCount + 1,
  };
}
