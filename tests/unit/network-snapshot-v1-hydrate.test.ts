// NetworkSnapshot v1 hydrate — backward compat 영역 n13 default reapply 검증.
//
// 사용자 catch 2026-05-09 (urgent — 학습 후 추론 안됨):
//   PR #186 영역 schema v1 → v2 bump 영역 round-trip 보존 단 — v1 backward compat
//   else 분기 0 → Neuron constructor default 영역 nmdaEnabled=false /
//   homeostaticEnabled=false 영역 적용 → INPUT EPSP 영역 V_th 미달 → fire 0 →
//   "no winner — WTA 대기". 본 test 는 Fix A (network.ts:228 v1 else 분기 영역
//   n13 default reapply) 영역 검증.
//
// 검증 catch:
//   T1: v1 snapshot (excitatory, region=V1 population=E) → restore → nmdaEnabled=true.
//   T2: v1 snapshot (INPUT, name=in_feat_*) → restore → nmdaEnabled=true (n13 정합)
//       + homeostaticEnabled=false (INPUT 제외).
//   T3: v1 snapshot (inhibitory, name=v1_L4_I_*) → restore → nmdaEnabled=true
//       (n13 정합) + homeostaticEnabled=false (inhibitory 제외).
//   T4: v1 snapshot (excitatory, name=v1_L4_E_*) → restore → homeostaticEnabled=true
//       + homeostaticIncrement=2.0 + homeostaticDecay=0.995.
//   T5: v1 snapshot (OUT, name=out_*) → restore → homeostaticEnabled=true.

import { describe, expect, it } from 'vitest';

import { NeuralNetwork, type NetworkSnapshot } from '@/lib/snn-runtime';

function makeV1Neuron(name: string, region: string | null, population: string | null) {
  return {
    name,
    region,
    population,
    vRest: -65,
    vThreshold: -55,
    vReset: -70,
    tauM: 20,
    refractory: 2,
  };
}

function makeV1Snapshot(
  neurons: ReturnType<typeof makeV1Neuron>[],
): NetworkSnapshot {
  return {
    schema: 1,
    dtMs: 0.1,
    t: 0,
    neurons,
    synapses: [],
  };
}

describe('NetworkSnapshot v1 hydrate — Fix A (n13 default reapply)', () => {
  it('T1: v1 excitatory (V1 E) → restore → nmdaEnabled=true (n13 builder 정합)', () => {
    const snap = makeV1Snapshot([makeV1Neuron('v1_L23_E_5', 'V1', 'L23_E')]);
    const restored = NeuralNetwork.restore(snap);
    expect(restored.size()).toBe(1);
    const n = restored.neurons[0];
    expect(n.nmdaEnabled).toBe(true);
    expect(n.nmdaThreshold).toBeCloseTo(-65.0, 6);
    expect(n.nmdaGain).toBeCloseTo(10.0, 6);
  });

  it('T2: v1 INPUT (in_feat_*) → restore → NMDA on (n13 정합) + homeostatic OFF (INPUT 제외)', () => {
    const snap = makeV1Snapshot([makeV1Neuron('in_feat_3', 'INPUT', null)]);
    const restored = NeuralNetwork.restore(snap);
    const n = restored.neurons[0];
    // n13 builder L268-273 — ALL neurons NMDA on (INPUT 포함).
    expect(n.nmdaEnabled).toBe(true);
    // n13 builder L275-290 — INPUT 영역 homeostatic 영역 적용 0.
    expect(n.homeostaticEnabled).toBe(false);
  });

  it('T3: v1 inhibitory (v1_L4_I_*) → restore → NMDA on + homeostatic OFF (inhibitory 제외)', () => {
    const snap = makeV1Snapshot([makeV1Neuron('v1_L4_I_2', 'V1', 'L4_I')]);
    const restored = NeuralNetwork.restore(snap);
    const n = restored.neurons[0];
    expect(n.nmdaEnabled).toBe(true);
    // homeostatic 영역 V1_L4_I 제외 (n13 builder L275 주석 정합).
    expect(n.homeostaticEnabled).toBe(false);
  });

  it('T4: v1 excitatory (v1_L4_E_*) → restore → homeostatic ON + 정합 param', () => {
    const snap = makeV1Snapshot([makeV1Neuron('v1_L4_E_7', 'V1', 'L4_E')]);
    const restored = NeuralNetwork.restore(snap);
    const n = restored.neurons[0];
    expect(n.homeostaticEnabled).toBe(true);
    expect(n.homeostaticIncrement).toBeCloseTo(2.0, 6);
    expect(n.homeostaticDecay).toBeCloseTo(0.995, 6);
  });

  it('T5: v1 OUT (out_0_3) → restore → homeostatic ON (n13 정합)', () => {
    const snap = makeV1Snapshot([makeV1Neuron('out_0_3', 'OUT', null)]);
    const restored = NeuralNetwork.restore(snap);
    const n = restored.neurons[0];
    expect(n.nmdaEnabled).toBe(true);
    expect(n.homeostaticEnabled).toBe(true);
    expect(n.homeostaticIncrement).toBeCloseTo(2.0, 6);
  });

  it('T6: v1 thresholdOffset 영역 default 0 (v1 영역 누적 정보 없음)', () => {
    const snap = makeV1Snapshot([makeV1Neuron('v1_L23_E_0', 'V1', 'L23_E')]);
    const restored = NeuralNetwork.restore(snap);
    expect(restored.neurons[0].thresholdOffset).toBe(0);
  });
});
