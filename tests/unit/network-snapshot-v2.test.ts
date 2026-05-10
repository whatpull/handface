// NetworkSnapshot — v2 schema NMDA + homeostatic 영역 round-trip 보존 검증.
//
// 사용자 catch 2026-05-09 (broken state — 두 번째 trigger 0Hz):
//   QA agent 진단 (CRITICAL): NetworkSnapshot.neurons 영역 직렬화 5 필드 only —
//   nmdaEnabled / homeostaticEnabled / thresholdOffset 등 7 필드 drop.
//   restore 후 default `nmdaEnabled=false / homeostaticEnabled=false` →
//   INPUT weight 11 영역 V1 EPSP 영역 V_th 미달 → fire 0.
//
// 본 fix:
//   1. NetworkSnapshot schema 1 → 2 bump.
//   2. neurons 영역 7 필드 추가 직렬화.
//   3. restore 영역 v1 backward compat (default 영역 적용 — current behavior 정합).
//
// 검증 catch:
//   T1: snapshot.schema === 2.
//   T2: NMDA + homeostatic 7 필드 round-trip — n13 substrate.
//   T3: v1 schema (legacy) restore — default 영역 적용 + 에러 0.
//   T4: thresholdOffset 누적 영역 round-trip 보존 — neuron.thresholdOffset = 5.0
//       → snapshot → restore → 5.0 catch.
//   T5: schema 99 영역 unknown — 명시 에러.

import { describe, expect, it } from 'vitest';

import {
  NeuralNetwork,
  Neuron,
  type NetworkSnapshot,
} from '@/lib/snn-runtime';
import { buildN13OrientationPreset } from '@/lib/snn-runtime/builders/n13-orientation';

describe('NetworkSnapshot v2 — NMDA + homeostatic + thresholdOffset round-trip (Fix 2)', () => {
  it('T1: snapshot.schema === 2', () => {
    const { net } = buildN13OrientationPreset({ seed: 57, clusterActiveInputs: [
      [4, 5, 6, 7],
      [1, 5, 9, 13],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ] });
    const snap = net.snapshot();
    expect(snap.schema).toBe(2);
  });

  it('T2: NMDA + homeostatic 7 필드 round-trip — n13 영역 모든 excitatory neuron 보존', () => {
    const { net } = buildN13OrientationPreset({ seed: 57, clusterActiveInputs: [
      [4, 5, 6, 7],
      [1, 5, 9, 13],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ] });
    const snap = net.snapshot();

    // n13 영역 모든 excitatory neuron 영역 NMDA enable 영역 검증.
    const nmdaCount = snap.neurons.filter(
      (n) => 'nmdaEnabled' in n && n.nmdaEnabled,
    ).length;
    expect(nmdaCount).toBeGreaterThan(400);

    const homeoCount = snap.neurons.filter(
      (n) => 'homeostaticEnabled' in n && n.homeostaticEnabled,
    ).length;
    expect(homeoCount).toBeGreaterThan(400);

    // restore — 7 필드 영역 round-trip 영역 정확 catch.
    const restored = NeuralNetwork.restore(snap);
    expect(restored.size()).toBe(net.size());

    // 신규 7 필드 영역 모두 일치 catch (sample 50개).
    for (let i = 0; i < Math.min(50, net.neurons.length); i += 1) {
      const o = net.neurons[i];
      const r = restored.neurons[i];
      expect(r.nmdaEnabled).toBe(o.nmdaEnabled);
      expect(r.nmdaThreshold).toBeCloseTo(o.nmdaThreshold, 6);
      expect(r.nmdaGain).toBeCloseTo(o.nmdaGain, 6);
      expect(r.homeostaticEnabled).toBe(o.homeostaticEnabled);
      expect(r.homeostaticIncrement).toBeCloseTo(o.homeostaticIncrement, 6);
      expect(r.homeostaticDecay).toBeCloseTo(o.homeostaticDecay, 6);
      expect(r.thresholdOffset).toBeCloseTo(o.thresholdOffset, 6);
    }
  });

  it('T3: v1 schema (legacy) restore — n13 default reapply + 에러 0 (backward compat, Fix A)', () => {
    // legacy v1 snapshot 영역 simulate — neurons 영역 5 필드 only, schema=1.
    // 사용자 catch 2026-05-09 (Fix A): v1 hydrate → n13 default reapply
    // (NMDA on / 정합 layer homeostatic on). 단, 본 test 영역 generic name
    // (A / B) 이므로 INPUT/inhibitory 패턴 0 → excitatory 정합 (NMDA on +
    //  homeostatic on). 명세 catch 영역 network-snapshot-v1-hydrate.test.ts.
    const v1: NetworkSnapshot = {
      schema: 1,
      dtMs: 0.1,
      t: 0,
      neurons: [
        {
          name: 'A',
          region: 'V1',
          population: 'E',
          vRest: -65,
          vThreshold: -55,
          vReset: -70,
          tauM: 20,
          refractory: 2,
        },
        {
          name: 'B',
          region: 'V2',
          population: 'E',
          vRest: -65,
          vThreshold: -55,
          vReset: -70,
          tauM: 20,
          refractory: 2,
        },
      ],
      synapses: [{ preIdx: 0, postIdx: 1, weight: 0.5, delay: 1, pspDurationMs: 30 }],
    };

    // restore 영역 에러 0 catch — backward compat.
    const restored = NeuralNetwork.restore(v1);
    expect(restored.size()).toBe(2);

    // v1 backward compat (Fix A) — n13 default reapply: NMDA on (모든 neuron),
    // homeostatic on (excitatory + OUT — generic name 'A' 영역 INPUT/inhibitory
    // 패턴 0 이므로 excitatory 정합 적용).
    expect(restored.neurons[0].nmdaEnabled).toBe(true);
    expect(restored.neurons[0].nmdaThreshold).toBeCloseTo(-65.0, 6);
    expect(restored.neurons[0].nmdaGain).toBeCloseTo(10.0, 6);
    expect(restored.neurons[0].homeostaticEnabled).toBe(true);
    expect(restored.neurons[0].homeostaticIncrement).toBeCloseTo(2.0, 6);
    expect(restored.neurons[0].homeostaticDecay).toBeCloseTo(0.995, 6);
    // thresholdOffset 영역 v1 영역 누적 정보 없음 → default 0.
    expect(restored.neurons[0].thresholdOffset).toBe(0);
  });

  it('T4: thresholdOffset 누적 영역 round-trip 보존', () => {
    const net = new NeuralNetwork({ defaultDtMs: 0.1 });
    const n = new Neuron({ name: 'X' });
    n.homeostaticEnabled = true;
    n.thresholdOffset = 5.0;
    n.nmdaEnabled = true;
    n.nmdaGain = 7.5;
    net.addNeuron(n);

    const snap = net.snapshot();
    expect(snap.schema).toBe(2);
    const restored = NeuralNetwork.restore(snap);
    expect(restored.neurons[0].thresholdOffset).toBe(5.0);
    expect(restored.neurons[0].nmdaEnabled).toBe(true);
    expect(restored.neurons[0].nmdaGain).toBe(7.5);
    expect(restored.neurons[0].homeostaticEnabled).toBe(true);
  });

  it('T5: schema 99 영역 unknown — 명시 에러', () => {
    const bad = {
      schema: 99,
      dtMs: 0.1,
      t: 0,
      neurons: [],
      synapses: [],
    } as unknown as NetworkSnapshot;
    expect(() => NeuralNetwork.restore(bad)).toThrow(/snapshot schema/);
  });
});
