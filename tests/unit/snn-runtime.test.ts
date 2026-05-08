// snn-runtime 단위 테스트.
//
// 목적: TS LIF + pair STDP 가 Python neuron.py 의 demo 시나리오와
// 정성적으로 일치하는지 확인 + snapshot/restore 무손실 보장.
//
// 정량 비트 정합은 향후 별도 골든 데이터로 — 본 테스트는 상위 레벨 동작 (스파이크
// 발생 / weight 변화 방향성 / refractory 준수 / firing rate) 만 검증.

import { describe, expect, it } from 'vitest';

import {
  NeuralNetwork,
  Neuron,
  SpikeMonitor,
  STDP_A_MINUS,
  STDP_A_PLUS,
  STDP_W_MAX,
} from '@/lib/snn-runtime';

describe('snn-runtime — LIF 단일 뉴런', () => {
  it('역치를 넘는 sustained 자극은 발화시킨다', () => {
    const net = new NeuralNetwork({ defaultDtMs: 0.1 });
    net.addNeuron(new Neuron({ name: 'N1' }));

    const monitor = new SpikeMonitor();
    monitor.attach(net.get('N1')!);

    // Steady state V = vRest + I = -70 + 30 = -40 → 10.4 ms 후 -55 도달.
    // duration 30 ms 면 충분히 여러 spike 발생.
    net.inject([
      { neuron: 'N1', weight: 30, time: 0, durationMs: 30, stepMs: 0.1 },
    ]);
    net.run(60, { dtMs: 0.1 });

    expect(monitor.spikes('N1').length).toBeGreaterThan(0);
    expect(monitor.firingRate('N1', net.t, 60)).toBeGreaterThan(0);
  });

  it('refractory 동안에는 v 가 reset 으로 고정된다', () => {
    const n = new Neuron({ name: 'N', refractory: 2.0 });
    // 강하게 발화시킨 후 t = lastSpike + 1ms 시점 integrate → vReset 유지.
    n.lastSpikeTime = 5.0;
    n.v = -50.0; // 인위적
    n.integrate(6.0, 0.1);
    expect(n.v).toBe(n.vReset);
  });
});

describe('snn-runtime — pair STDP', () => {
  it('pre→post 정상 발화 시 LTP 로 weight 가 증가한다', () => {
    const net = new NeuralNetwork({ defaultDtMs: 0.1 });
    net.addNeuron(new Neuron({ name: 'PRE' }));
    net.addNeuron(new Neuron({ name: 'POST' }));
    const syn = net.connect('PRE', 'POST', 8.0);
    const wBefore = syn.weight;

    // pre 를 먼저 발화시키고 post 도 곧이어 발화시켜 LTP 시점 만든다.
    // V = -70 + 30 = -40 으로 10.4 ms 만에 threshold 도달.
    net.inject([
      { neuron: 'PRE', weight: 30, time: 0, durationMs: 25, stepMs: 0.1 },
      { neuron: 'POST', weight: 30, time: 8, durationMs: 25, stepMs: 0.1 },
    ]);
    net.run(60, { dtMs: 0.1, stdpEnabled: true });

    expect(syn.weight).toBeGreaterThan(wBefore);
    expect(syn.weight).toBeLessThanOrEqual(STDP_W_MAX);
  });

  it('learning rate 가 Python 정합 값으로 노출된다', () => {
    expect(STDP_A_PLUS).toBeCloseTo(0.0005, 6);
    expect(STDP_A_MINUS).toBeCloseTo(0.001, 6);
    expect(STDP_W_MAX).toBe(40.0);
  });

  it('frozen synapse 는 STDP 적용을 받지 않는다', () => {
    const net = new NeuralNetwork({ defaultDtMs: 0.1 });
    net.addNeuron(new Neuron({ name: 'PRE' }));
    net.addNeuron(new Neuron({ name: 'POST' }));
    const syn = net.connect('PRE', 'POST', 8.0);
    syn.frozen = true;
    const wBefore = syn.weight;

    net.inject([
      { neuron: 'PRE', weight: 30, time: 0, durationMs: 25, stepMs: 0.1 },
      { neuron: 'POST', weight: 30, time: 8, durationMs: 25, stepMs: 0.1 },
    ]);
    net.run(60, { dtMs: 0.1, stdpEnabled: true });

    expect(syn.weight).toBe(wBefore);
  });
});

describe('snn-runtime — snapshot / restore', () => {
  it('snapshot → restore 는 위상 + 가중치 + 시뮬레이션 시간을 보존한다', () => {
    const net = new NeuralNetwork({ defaultDtMs: 0.1 });
    net.addNeuron(new Neuron({ name: 'A', region: 'INPUT', population: 'in_a' }));
    net.addNeuron(new Neuron({ name: 'B', region: 'V1', population: 'v1_e' }));
    net.connect('A', 'B', 7.5, 1.5, 5.0);
    net.t = 123.4;

    const snap = net.snapshot();
    const restored = NeuralNetwork.restore(snap);

    expect(restored.size()).toBe(2);
    expect(restored.has('A')).toBe(true);
    expect(restored.has('B')).toBe(true);
    expect(restored.get('B')!.region).toBe('V1');
    expect(restored.synapses).toHaveLength(1);
    expect(restored.synapses[0].weight).toBe(7.5);
    expect(restored.synapses[0].delay).toBe(1.5);
    expect(restored.t).toBe(123.4);
  });
});
