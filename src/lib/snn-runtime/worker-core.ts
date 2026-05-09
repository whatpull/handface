// SNN worker core — Worker / Node 환경 어디서나 동작하는 RPC 핸들러.
//
// 목적: Worker transport 와 분리해 단위 테스트 가능. 실제 Worker entry
// (snn-worker.ts) 는 본 클래스를 인스턴스화하고 self.onmessage / postMessage
// 만 연결한다.

import {
  buildClusterRegistryFromN13,
  expandCluster,
  inferClusterRegistry,
  type ClusterRegistry,
} from './art';
import { buildN13OrientationPreset } from './builders/n13-orientation';
import { SpikeMonitor } from './monitor';
import { NeuralNetwork } from './network';
import type {
  BuildPayload,
  BuildResult,
  ClusterFiringRatesPayload,
  ClusterFiringRatesResult,
  ClusterTrainRStdpPayload,
  ClusterTrainRStdpResult,
  ExpandClusterPayload,
  ExpandClusterResult,
  FiringRatesPayload,
  FiringRatesResult,
  RestoreSnapshotPayload,
  RestoreSnapshotResult,
  RunPayload,
  RunResult,
  SnapshotResult,
  WorkerRequest,
  WorkerResponse,
} from './worker-protocol';

// 가중치 추출/적용 — persistence 모듈과 같은 시맨틱이지만 자급자족 인라인.
function extractWeightsLocal(net: NeuralNetwork): number[] {
  return net.synapses.map((s) => s.weight);
}

function applyWeightsLocal(net: NeuralNetwork, weights: number[]): void {
  if (weights.length !== net.synapses.length) {
    throw new Error(
      `weight 수 불일치: net=${net.synapses.length}, payload=${weights.length}`,
    );
  }
  for (let i = 0; i < weights.length; i += 1) net.synapses[i].weight = weights[i];
}

const DEFAULT_CLUSTER_ACTIVE_INPUTS: number[][] = [
  [4, 5, 6, 7],
  [1, 5, 9, 13],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

export class SNNWorkerCore {
  private net: NeuralNetwork | null = null;
  private monitor: SpikeMonitor | null = null;
  private registry: ClusterRegistry | null = null;
  private buildClusterActiveInputs: number[][] = DEFAULT_CLUSTER_ACTIVE_INPUTS;

  handle(req: WorkerRequest): WorkerResponse {
    try {
      switch (req.type) {
        case 'build':
          return { id: req.id, ok: true, result: this.handleBuild(req.payload) };
        case 'restoreSnapshot':
          return { id: req.id, ok: true, result: this.handleRestoreSnapshot(req.payload) };
        case 'inject':
          this.requireNet().inject(req.payload.events);
          return { id: req.id, ok: true, result: null };
        case 'run':
          return { id: req.id, ok: true, result: this.handleRun(req.payload) };
        case 'snapshot': {
          const snap = this.requireNet().snapshot();
          return { id: req.id, ok: true, result: { snapshot: snap } satisfies SnapshotResult };
        }
        case 'extractWeights':
          return { id: req.id, ok: true, result: extractWeightsLocal(this.requireNet()) };
        case 'applyWeights':
          applyWeightsLocal(this.requireNet(), req.payload.weights);
          return { id: req.id, ok: true, result: null };
        case 'firingRates':
          return {
            id: req.id,
            ok: true,
            result: this.handleFiringRates(req.payload),
          };
        case 'expandCluster':
          return { id: req.id, ok: true, result: this.handleExpandCluster(req.payload) };
        case 'clusterFiringRates':
          return { id: req.id, ok: true, result: this.handleClusterFiringRates(req.payload) };
        case 'clusterTrainRStdp':
          return { id: req.id, ok: true, result: this.handleClusterTrainRStdp(req.payload) };
        case 'reset':
          this.net = null;
          this.monitor = null;
          this.registry = null;
          return { id: req.id, ok: true, result: null };
      }
      const _exhaustive: never = req;
      return { id: 0, ok: false, error: `unknown request: ${JSON.stringify(_exhaustive)}` };
    } catch (e) {
      return { id: req.id, ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  // --- 내부 ---
  private requireNet(): NeuralNetwork {
    if (!this.net) throw new Error('net 미빌드 — build 요청을 먼저 보내야 합니다');
    return this.net;
  }

  private requireRegistry(): ClusterRegistry {
    if (!this.registry) throw new Error('registry 부재 — build 후에 호출하세요');
    return this.registry;
  }

  private handleBuild(payload: BuildPayload): BuildResult {
    if (payload.preset !== 'n13_orientation') {
      throw new Error(`알 수 없는 preset: ${payload.preset}`);
    }
    const activeInputs = payload.clusterActiveInputs ?? DEFAULT_CLUSTER_ACTIVE_INPUTS;
    const result = buildN13OrientationPreset({
      vThreshold: payload.vThreshold,
      clusterActiveInputs: activeInputs,
      seed: payload.seed,
    });
    this.net = result.net;
    this.monitor = new SpikeMonitor();
    this.monitor.attachAll(this.net.neurons);
    this.registry = buildClusterRegistryFromN13(activeInputs);
    this.buildClusterActiveInputs = activeInputs;
    return {
      neuronsAdded: result.neuronsAdded,
      synapsesAdded: result.synapsesAdded,
      outClusters: result.outClusters,
      outTotal: result.outTotal,
      inputDim: result.inputDim,
      preset: result.preset,
    };
  }

  private handleRestoreSnapshot(payload: RestoreSnapshotPayload): RestoreSnapshotResult {
    const restored = NeuralNetwork.restore(payload.snapshot);
    this.net = restored;
    this.monitor = new SpikeMonitor();
    this.monitor.attachAll(restored.neurons);
    // 토폴로지 기반으로 cluster 슬롯 추론.
    const registry = inferClusterRegistry(restored.neurons.map((n) => n.name));
    if (payload.clusterActiveInputs) {
      for (let i = 0; i < registry.slots.length; i += 1) {
        const ai = payload.clusterActiveInputs[i];
        if (ai) registry.slots[i].activeInputs = ai.slice();
      }
      this.buildClusterActiveInputs = payload.clusterActiveInputs.slice(0, 4);
    }
    this.registry = registry;
    return {
      neurons: restored.size(),
      synapses: restored.synapses.length,
      totalClusters: registry.slots.length,
      t: restored.t,
    };
  }

  private handleRun(payload: RunPayload): RunResult {
    const net = this.requireNet();
    net.run(payload.durationMs, {
      dtMs: payload.dtMs,
      stdpEnabled: payload.stdpEnabled,
      stdpGain: payload.stdpGain,
    });
    return { t: net.t, durationMs: payload.durationMs };
  }

  private handleFiringRates(payload: FiringRatesPayload): FiringRatesResult {
    const net = this.requireNet();
    const monitor = this.monitor;
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    const out: Array<{ name: string; hz: number }> = [];
    if (payload.names) {
      for (const name of payload.names) {
        out.push({ name, hz: monitor.firingRate(name, net.t, payload.windowMs) });
      }
    }
    if (payload.prefixes) {
      const prefixes = payload.prefixes;
      for (const n of net.neurons) {
        for (const p of prefixes) {
          if (n.name.startsWith(p)) {
            out.push({ name: n.name, hz: monitor.firingRate(n.name, net.t, payload.windowMs) });
            break;
          }
        }
      }
    }
    return { rates: out };
  }

  private handleExpandCluster(payload: ExpandClusterPayload): ExpandClusterResult {
    const net = this.requireNet();
    const registry = this.requireRegistry();
    const monitor = this.monitor;
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    if (payload.activeInputs.length === 0) {
      throw new Error('activeInputs 비어있음');
    }
    const before = net.neurons.length;
    const result = expandCluster(net, registry, {
      activeInputs: payload.activeInputs,
      seed: payload.seed,
    });
    // 새 뉴런들에도 monitor listener 부착 (없으면 firing rate 0 으로 보임).
    for (let i = before; i < net.neurons.length; i += 1) {
      monitor.attach(net.neurons[i]);
    }
    return {
      newClusterId: result.newSlot.id,
      totalClusters: registry.slots.length,
      neuronsAdded: result.neuronsAdded,
      synapsesAdded: result.synapsesAdded,
      activeInputs: result.newSlot.activeInputs,
    };
  }

  private handleClusterFiringRates(payload: ClusterFiringRatesPayload): ClusterFiringRatesResult {
    const net = this.requireNet();
    const monitor = this.monitor;
    const registry = this.requireRegistry();
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    const layer: 'OUT' | 'V1_L23' | 'V2_L5' = payload.layer ?? 'OUT';
    const rates = registry.slots.map((slot) => {
      const names =
        layer === 'OUT' ? slot.out : layer === 'V1_L23' ? slot.v1L23E : slot.v2L5E;
      let sum = 0;
      for (const name of names) sum += monitor.firingRate(name, net.t, payload.windowMs);
      return names.length > 0 ? sum / names.length : 0;
    });
    let max = 0;
    let second = 0;
    let winner = -1;
    let total = 0;
    for (let i = 0; i < rates.length; i += 1) {
      total += rates[i];
      if (rates[i] > max) {
        second = max;
        max = rates[i];
        winner = i;
      } else if (rates[i] > second) {
        second = rates[i];
      }
    }
    return {
      rates,
      winner: total > 0 ? winner : -1,
      share: total > 0 ? max / total : 0,
      margin: max > 0 ? (max - second) / max : 0,
      layer,
    };
  }

  private handleClusterTrainRStdp(payload: ClusterTrainRStdpPayload): ClusterTrainRStdpResult {
    const net = this.requireNet();
    const monitor = this.monitor;
    const registry = this.requireRegistry();
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    if (
      payload.targetCluster < 0 ||
      payload.targetCluster >= registry.slots.length
    ) {
      throw new Error(
        `targetCluster ${payload.targetCluster} 범위 밖 (slots ${registry.slots.length})`,
      );
    }
    const intensity = payload.intensity ?? 25;
    const stimulusDurationMs = payload.stimulusDurationMs ?? 30;
    const observeMs = payload.observeMs ?? 50;
    const dtMs = payload.dtMs ?? 0.1;
    const rewardGain = payload.rewardGain ?? 2.0;
    const punishGain = payload.punishGain ?? 0.5;

    const ratesHistory: number[][] = [];
    const winnerHistory: number[] = [];
    let correct = 0;

    for (const pattern of payload.patterns) {
      // 1. inject(pattern) — 활성도 > 0.5 dim 만 사용 (binary 정합).
      const events = pattern
        .map((v, i) => {
          if (v <= 0.5) return null;
          return {
            neuron: `in_feat_${i}`,
            weight: intensity * v,
            time: 0,
            durationMs: stimulusDurationMs,
            stepMs: dtMs,
          };
        })
        .filter((e): e is NonNullable<typeof e> => e !== null);
      if (events.length > 0) net.inject(events);

      // 2. measure pass — STDP off.
      net.run(observeMs, { dtMs, stdpEnabled: false });
      const measure = this.measureClusterRates(observeMs);
      ratesHistory.push(measure.rates);
      winnerHistory.push(measure.winner);
      const isCorrect = measure.winner === payload.targetCluster;
      if (isCorrect) correct += 1;

      // 3. reward pass — 같은 자극 재 inject + STDP on with modulated gain.
      // (자극 재인입 없으면 직전 spike 이후 net 영역 quiescent — STDP 효과 0.)
      if (events.length > 0) net.inject(events);
      const gain = isCorrect ? rewardGain : punishGain;
      net.run(observeMs, { dtMs, stdpEnabled: true, stdpGain: gain });
    }

    const trained = payload.patterns.length;
    return {
      trained,
      correct,
      accuracy: trained > 0 ? correct / trained : 0,
      targetCluster: payload.targetCluster,
      clusterRatesHistory: ratesHistory,
      winnerHistory,
    };
  }

  private measureClusterRates(windowMs: number): { rates: number[]; winner: number } {
    const net = this.requireNet();
    const monitor = this.monitor!;
    const registry = this.registry!;
    const rates = registry.slots.map((slot) => {
      let sum = 0;
      for (const name of slot.out) sum += monitor.firingRate(name, net.t, windowMs);
      return slot.out.length > 0 ? sum / slot.out.length : 0;
    });
    let max = 0;
    let winner = -1;
    for (let i = 0; i < rates.length; i += 1) {
      if (rates[i] > max) {
        max = rates[i];
        winner = i;
      }
    }
    return { rates, winner: max > 0 ? winner : -1 };
  }

  // 테스트용 — 직접 net 접근.
  getNetForTest(): NeuralNetwork | null {
    return this.net;
  }

  getRegistryForTest(): ClusterRegistry | null {
    return this.registry;
  }

  // build 시 명시한 activeInputs (기록용 — Lab UI 가 cluster mapping 표시).
  getBuildClusterActiveInputs(): number[][] {
    return this.buildClusterActiveInputs;
  }
}
