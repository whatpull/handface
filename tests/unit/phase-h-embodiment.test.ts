// Phase H — Embodiment 단위 테스트 (sensorimotor closed loop + predictive coding).

import { describe, it, expect } from 'vitest';
import {
  clusterToMotorCommand, blendedMotorCommand,
  predictSensorDelta, computeSensorError, errorMagnitude,
  updateBodySchema, freeEnergyProxy, selectActionByMinimumFreeEnergy,
  stepSensorimotorLoop,
  type MotorCommand, type SensorState, type BodySchema, type SensorimotorLoopState,
} from '@/lib/snn-runtime/embodiment';

const makeCmd = (effector: string, x: number, y: number, z: number): MotorCommand => ({
  effector, targetPosition: [x, y, z], velocity: 1.0, duration: 100,
});

describe('Phase H — Motor Command Generation', () => {
  it('cluster id → motor command lookup', () => {
    const map = new Map<number, MotorCommand>();
    map.set(0, makeCmd('hand_thumb', 1, 0, 0));
    map.set(1, makeCmd('hand_index', 0, 1, 0));
    expect(clusterToMotorCommand(0, map)?.effector).toBe('hand_thumb');
    expect(clusterToMotorCommand(99, map)).toBeNull();
  });

  it('blended motor — 영역 cluster activation 영역 weighted blend', () => {
    const map = new Map<number, MotorCommand>();
    map.set(0, makeCmd('hand', 1, 0, 0));
    map.set(1, makeCmd('hand', 0, 1, 0));
    const blended = blendedMotorCommand(
      [{ clusterId: 0, activity: 0.5 }, { clusterId: 1, activity: 0.5 }],
      map,
    );
    expect(blended).toBeTruthy();
    expect(blended!.targetPosition[0]).toBeCloseTo(0.5, 5);
    expect(blended!.targetPosition[1]).toBeCloseTo(0.5, 5);
  });

  it('empty / unknown cluster → null', () => {
    expect(blendedMotorCommand([], new Map())).toBeNull();
  });
});

describe('Phase H — Sensorimotor Feedback', () => {
  it('predictSensorDelta — proportional move toward target', () => {
    const cmd = makeCmd('hand', 10, 10, 10);
    const sensor: SensorState = {
      positions: [[0, 0, 0], [5, 5, 5]],
      timestamp: 0,
    };
    const predicted = predictSensorDelta(cmd, sensor);
    expect(predicted[0]).toEqual([5, 5, 5]); // 50% toward (10,10,10)
    expect(predicted[1]).toEqual([7.5, 7.5, 7.5]); // 50% toward
  });
});

describe('Phase H — Predictive Coding (Rao & Ballard 1999)', () => {
  it('computeSensorError — predicted vs actual delta', () => {
    const predicted = [[1, 2, 3], [4, 5, 6]];
    const actual = [[1, 2, 4], [4, 6, 6]];
    const errors = computeSensorError(predicted, actual);
    expect(errors[0]).toEqual([0, 0, 1]);
    expect(errors[1]).toEqual([0, 1, 0]);
  });

  it('errorMagnitude — RMS', () => {
    expect(errorMagnitude([[1, 0], [0, 1]])).toBeCloseTo(Math.sqrt(0.5), 5);
    expect(errorMagnitude([])).toBe(0);
  });

  it('perfect prediction → error 0', () => {
    const predicted = [[1, 2, 3]];
    const actual = [[1, 2, 3]];
    expect(errorMagnitude(computeSensorError(predicted, actual))).toBe(0);
  });
});

describe('Phase H — Body Schema (Maravita & Iriki 2004)', () => {
  it('updateBodySchema — sensor 영역 endEffector map 갱신', () => {
    const initial: BodySchema = {
      joints: new Map(), endEffectors: new Map(), lastUpdate: 0,
    };
    const sensor: SensorState = {
      positions: [[1, 2, 3], [4, 5, 6]],
      timestamp: 100,
    };
    const updated = updateBodySchema(initial, sensor, ['thumb_tip', 'index_tip']);
    expect(updated.endEffectors.get('thumb_tip')).toEqual([1, 2, 3]);
    expect(updated.endEffectors.get('index_tip')).toEqual([4, 5, 6]);
    expect(updated.lastUpdate).toBe(100);
  });
});

describe('Phase H — Active Inference (Friston 2010)', () => {
  it('freeEnergyProxy — error² + epistemic', () => {
    expect(freeEnergyProxy(2, 0)).toBe(4);
    expect(freeEnergyProxy(2, 1)).toBe(5);
  });

  it('action selection — minimum free energy 선택', () => {
    const action = selectActionByMinimumFreeEnergy([
      { action: 'reach', expectedFreeEnergy: 0.5 },
      { action: 'grasp', expectedFreeEnergy: 0.3 },
      { action: 'release', expectedFreeEnergy: 0.8 },
    ]);
    expect(action).toBe('grasp');
  });

  it('empty candidates → null', () => {
    expect(selectActionByMinimumFreeEnergy([])).toBeNull();
  });
});

describe('Phase H — Sensorimotor Loop', () => {
  it('1 step — initial state 영역 영역 영역 시작', () => {
    const initial: SensorimotorLoopState = {
      lastCommand: null, lastPredictedSensor: null, lastActualSensor: null,
      lastError: 0, loopCount: 0,
    };
    const cmd = makeCmd('hand', 1, 1, 1);
    const sensor: SensorState = { positions: [[0, 0, 0]], timestamp: 0 };
    const next = stepSensorimotorLoop(initial, cmd, sensor);
    expect(next.loopCount).toBe(1);
    expect(next.lastCommand).toBe(cmd);
    // 첫 step: prediction === actual (no prior state) → error 0
    expect(next.lastError).toBe(0);
  });

  it('2 steps — prediction vs actual 영역 error 산출', () => {
    const initial: SensorimotorLoopState = {
      lastCommand: null, lastPredictedSensor: null, lastActualSensor: null,
      lastError: 0, loopCount: 0,
    };
    // step 1
    const s1: SensorState = { positions: [[0, 0, 0]], timestamp: 0 };
    const cmd1 = makeCmd('hand', 10, 0, 0);
    const after1 = stepSensorimotorLoop(initial, cmd1, s1);

    // step 2 — actual sensor = (4, 0, 0), predicted = (5, 0, 0) (50% toward 10)
    const s2: SensorState = { positions: [[4, 0, 0]], timestamp: 100 };
    const after2 = stepSensorimotorLoop(after1, cmd1, s2);

    expect(after2.loopCount).toBe(2);
    // predicted (5, 0, 0) vs actual (4, 0, 0) → error magnitude > 0
    expect(after2.lastError).toBeGreaterThan(0);
  });
});

describe('Phase H — 통합 시나리오: 학습 driven by prediction error', () => {
  it('SNN cluster activation → motor → sensor → predictive error → 학습 signal', () => {
    // SNN cluster 5 영역 winner → "thumb to (1,2,3)" motor command
    const map = new Map<number, MotorCommand>();
    map.set(5, makeCmd('hand_thumb', 1, 2, 3));
    const cmd = clusterToMotorCommand(5, map);
    expect(cmd).toBeTruthy();

    // motor execution → sensor (실제 hand position)
    const sensor: SensorState = { positions: [[0.8, 1.9, 2.7]], timestamp: 0 };
    const predicted = predictSensorDelta(cmd!, { positions: [[0, 0, 0]], timestamp: 0 });
    const errors = computeSensorError(predicted, sensor.positions);
    const errorMag = errorMagnitude(errors);

    expect(errorMag).toBeGreaterThan(0); // imperfect prediction → 학습 signal
    expect(errorMag).toBeLessThan(1); // 작은 prediction error (학습 잘 영역)
  });

  it('free energy minimization → best action', () => {
    const actions = [
      { action: 'reach_object_A', expectedFreeEnergy: freeEnergyProxy(0.2) },
      { action: 'reach_object_B', expectedFreeEnergy: freeEnergyProxy(0.8) },
      { action: 'explore', expectedFreeEnergy: freeEnergyProxy(0.5, -0.3) }, // epistemic bonus
    ];
    // reach_A: 0.04, reach_B: 0.64, explore: 0.25 - 0.3 = -0.05 (winner!)
    expect(selectActionByMinimumFreeEnergy(actions)).toBe('explore');
  });
});
