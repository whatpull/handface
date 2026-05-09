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
  GetNetworkTimeResult,
  RegionFiringRatesPayload,
  RegionFiringRatesResult,
  ReinforceBackgroundPayload,
  ResetClusterWeightsResult,
  RestoreSnapshotPayload,
  RestoreSnapshotResult,
  RunPayload,
  RunResult,
  SnapshotResult,
  TriggerBackgroundPayload,
  WorkerPushEvent,
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

// PR #192 polish (SEC-2): handle() type whitelist — defense-in-depth.
// 직전 silent default catch (exhaustive switch 영역 _exhaustive: never) 영역
// 정합 catch 영역 진입 영역 explicit set 영역 reject — hostile / typo'd type
// 영역 catch 영역 silent 처리 0.
const ALLOWED_REQUEST_TYPES: ReadonlySet<string> = new Set([
  'build',
  'restoreSnapshot',
  'inject',
  'run',
  'snapshot',
  'extractWeights',
  'applyWeights',
  'firingRates',
  'regionFiringRates',
  'expandCluster',
  'clusterFiringRates',
  'clusterTrainRStdp',
  'getNetworkTime',
  'resetHomeostatic',
  'resetClusterWeights',
  'reset',
  'triggerBackground',
  'reinforceBackground',
]);

// PR #192 polish (SEC-1): triggerBackground / reinforceBackground 영역 진입
// payload validation guard. main thread 영역 LiveSnn 영역 보장 catch 단
// 외부 worker 영역 hostile message 영역 catch 영역 defense-in-depth.
// 정직 한계: pattern 영역 16-dim ∈ [0,1] 영역 binary catch (sharpenForGesture
// 영역 정합) — 본 path 영역 length only 영역 catch (값 영역 worker-core 영역
// inject events 영역 v <= 0.5 filter 영역 정합).
function validateTriggerBackgroundPayload(p: TriggerBackgroundPayload): void {
  if (!Array.isArray(p.pattern) || p.pattern.length !== 16) {
    throw new Error('invalid pattern (expected length 16 array)');
  }
  if (typeof p.repeats !== 'number' || p.repeats < 1 || p.repeats > 10) {
    throw new Error('invalid repeats (expected 1..10)');
  }
  if (typeof p.observeMs !== 'number' || p.observeMs < 1 || p.observeMs > 1000) {
    throw new Error('invalid observeMs (expected 1..1000)');
  }
  if (typeof p.intensity !== 'number' || p.intensity < 0 || p.intensity > 1000) {
    throw new Error('invalid intensity (expected 0..1000)');
  }
  if (typeof p.stimulusDurationMs !== 'number' || p.stimulusDurationMs < 0 || p.stimulusDurationMs > 1000) {
    throw new Error('invalid stimulusDurationMs (expected 0..1000)');
  }
}

function validateReinforceBackgroundPayload(p: ReinforceBackgroundPayload): void {
  if (!Array.isArray(p.pattern) || p.pattern.length !== 16) {
    throw new Error('invalid pattern (expected length 16 array)');
  }
  if (typeof p.targetCluster !== 'number' || p.targetCluster < 0 || p.targetCluster > 31) {
    throw new Error('invalid targetCluster (expected 0..31)');
  }
  if (typeof p.observeMs !== 'number' || p.observeMs < 1 || p.observeMs > 1000) {
    throw new Error('invalid observeMs (expected 1..1000)');
  }
  if (typeof p.intensity !== 'number' || p.intensity < 0 || p.intensity > 1000) {
    throw new Error('invalid intensity (expected 0..1000)');
  }
  if (typeof p.stimulusDurationMs !== 'number' || p.stimulusDurationMs < 0 || p.stimulusDurationMs > 1000) {
    throw new Error('invalid stimulusDurationMs (expected 0..1000)');
  }
}

export class SNNWorkerCore {
  private net: NeuralNetwork | null = null;
  private monitor: SpikeMonitor | null = null;
  private registry: ClusterRegistry | null = null;
  private buildClusterActiveInputs: number[][] = DEFAULT_CLUSTER_ACTIVE_INPUTS;
  // PR-B (Web Worker background offload, 2026-05-10): push event emitter.
  // worker entry (snn-worker.ts) 영역 self.postMessage 영역 wire,
  // main-thread-transport 영역 listeners.dispatch 영역 wire.
  // null 시점 영역 push event emit 영역 silent skip — RPC 영역 trigger/reinforce
  // background 영역 sync ack 영역 정합 (push 영역 0 발화 단 동작 무관).
  private pushEmitter: ((event: WorkerPushEvent) => void) | null = null;

  /**
   * PR-B (Web Worker background offload, 2026-05-10): worker 영역 push event
   * emitter 영역 wire. 외부 영역 push channel 영역 inject — sync ack RPC 영역
   * 별도 path 영역 결과 영역 main thread 영역 emit.
   *
   * worker entry: `core.setPushEmitter((event) => self.postMessage(event))`.
   * main-thread-transport: `core.setPushEmitter((event) => listeners.dispatch(event))`.
   */
  setPushEmitter(emitter: (event: WorkerPushEvent) => void): void {
    this.pushEmitter = emitter;
  }

  handle(req: WorkerRequest): WorkerResponse {
    try {
      // PR #192 polish (SEC-2): type whitelist 영역 explicit reject — defense-
      // in-depth (직전 silent default 영역 _exhaustive: never 영역 정합 catch
      // 영역 hostile / typo'd type 영역 catch 영역 catch 0).
      if (!ALLOWED_REQUEST_TYPES.has((req as { type: string }).type)) {
        return { id: req.id, ok: false, error: `disallowed request type: ${(req as { type: string }).type}` };
      }
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
        case 'regionFiringRates':
          return {
            id: req.id,
            ok: true,
            result: this.handleRegionFiringRates(req.payload),
          };
        case 'expandCluster':
          return { id: req.id, ok: true, result: this.handleExpandCluster(req.payload) };
        case 'clusterFiringRates':
          return { id: req.id, ok: true, result: this.handleClusterFiringRates(req.payload) };
        case 'clusterTrainRStdp':
          return { id: req.id, ok: true, result: this.handleClusterTrainRStdp(req.payload) };
        case 'getNetworkTime': {
          const net = this.requireNet();
          const result: GetNetworkTimeResult = { t: net.t };
          return { id: req.id, ok: true, result };
        }
        case 'resetHomeostatic': {
          // PR fix/live-mode-time-and-restore — Fix 3: thresholdOffset reset.
          // 사용자 catch 영역 broken state — triggerOnce repeats 3 × 8 OUT ×
          // increment 2.0 영역 thresholdOffset += 48 영역 누적 → 두 번째 trigger
          // 영역 V_th saturation 영역 fire 0. 본 RPC 영역 모든 neuron 영역
          // thresholdOffset = 0 영역 reset (학술: Diehl & Cook 2015 §3.2 batch
          // frame reset 정합).
          const net = this.requireNet();
          for (const n of net.neurons) {
            n.thresholdOffset = 0;
          }
          return { id: req.id, ok: true, result: null };
        }
        case 'resetClusterWeights': {
          // PR-A architecture pivot (사용자 catch 2026-05-09 — Step 4):
          // 학습 가중치 영역 fresh build default 영역 restore. 직전 buildClusterActiveInputs
          // 영역 catch (build / restoreSnapshot 영역 set) 영역 n13 builder 영역
          // 새로 build → net + monitor + registry 영역 swap. 학술 정합:
          // Diehl & Cook 2015 §3.2 batch reset 영역 confluent path — saturation
          // escape mandatory.
          const result = buildN13OrientationPreset({
            clusterActiveInputs: this.buildClusterActiveInputs,
            // seed 영역 build payload 영역 catch 미보존 — buildN13OrientationPreset
            // 영역 default seed 영역 정합 (root-local-snn SEED=57 영역 별도 sync).
          });
          this.net = result.net;
          this.monitor = new SpikeMonitor();
          this.monitor.attachAll(this.net.neurons);
          this.registry = buildClusterRegistryFromN13(this.buildClusterActiveInputs);
          const out: ResetClusterWeightsResult = {
            neurons: result.neuronsAdded,
            synapses: result.synapsesAdded,
            preset: result.preset,
          };
          return { id: req.id, ok: true, result: out };
        }
        case 'reset':
          this.net = null;
          this.monitor = null;
          this.registry = null;
          return { id: req.id, ok: true, result: null };
        case 'triggerBackground':
          // PR-B (Web Worker background offload, 2026-05-10): fire-and-forget.
          // sync ack `null` 영역 main thread 영역 즉시 return → 사용자 input
          // event loop 영역 unblock. 결과 영역 push event 영역 emit.
          // 주의: 본 case 영역 sync handle path 영역 호출 영역 inline 영역 simulation
          // 영역 실행 사실 — main-thread-transport (SSR fallback) 영역 microtask
          // 영역 ack postMessage 영역 정합 영역 simulation 영역 ack 후 영역 시작
          // 영역 catch (queueMicrotask 영역 ack 먼저 dispatch). 단 worker
          // 영역 message handler 영역 sync 영역 — 본 simulation 영역 worker
          // thread 영역 block 영역 main thread 영역 unblock. 정직 한계: snn-worker
          // entry 영역 message handler 영역 try 영역 inline 영역 simulation
          // 영역 처리 영역 후 영역 push event 영역 emit (next message 영역
          // 처리 영역 wait 영역 — coalesce policy 영역 worker 영역 sequential
          // serial 영역 정합).
          this.handleTriggerBackground(req.payload);
          return { id: req.id, ok: true, result: null };
        case 'reinforceBackground':
          this.handleReinforceBackground(req.payload);
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

  private handleRegionFiringRates(payload: RegionFiringRatesPayload): RegionFiringRatesResult {
    // PR fix/live-mode-time-and-restore — Fix 5: region 단위 평균 firing rate.
    // 사용자 catch 2026-05-09 (broken state — V1 0/512, V2 0/288): Live tick
    // 영역 cluster_rates max proxy 영역 — 실 spike rate 영역 catch 영역 본 RPC
    // 영역 region 영역 모든 excitatory neuron 영역 평균 (Hz).
    const net = this.requireNet();
    const monitor = this.monitor;
    if (!monitor) throw new Error('monitor 부재 — build 후에 호출하세요');
    // region prefix 매핑 — n13 substrate 정합.
    //   'V1'      → V1_L4_E_* + V1_L23_E_*  (excitatory only — I 영역 제외)
    //   'V2'      → V2_L4_E_* + V2_L23_E_* + V2_L5_E_*
    //   'OUT'     → out_*
    //   'V1_L23'  → V1_L23_E_* (cluster firing 정합)
    //   'V2_L5'   → V2_L5_E_* (cluster firing 정합 — sub-cluster aware)
    // FINDING-1 fix 2026-05-10: substrate neuron 명 영역 lowercase prefix
    // (`v1_L4_E_*`, `v2_L5_E_*` etc — n13-orientation.ts 정합) — 기존 대문자
    // prefix 영역 case-sensitive `startsWith` mismatch → 매 호출 count=0/hz=0
    // → fallback proxy 영역 silent failure (Fix 5 무력화).
    const prefixes: Record<typeof payload.region, string[]> = {
      V1: ['v1_L4_E_', 'v1_L23_E_'],
      V2: ['v2_L4_E_', 'v2_L23_E_', 'v2_L5_E_'],
      OUT: ['out_'],
      V1_L23: ['v1_L23_E_'],
      V2_L5: ['v2_L5_E_'],
    };
    const prefList = prefixes[payload.region];
    // SEC-8 defensive guard — hostile/unknown region 영역 silent { hz: 0 }
    // 응답 (throw 영역 worker crash 회피).
    if (!prefList) {
      return { region: payload.region, hz: 0, neuronCount: 0 };
    }
    let sum = 0;
    let count = 0;
    for (const n of net.neurons) {
      let match = false;
      for (const p of prefList) {
        if (n.name.startsWith(p)) {
          match = true;
          break;
        }
      }
      if (!match) continue;
      sum += monitor.firingRate(n.name, net.t, payload.windowMs);
      count += 1;
    }
    return {
      region: payload.region,
      hz: count > 0 ? sum / count : 0,
      neuronCount: count,
    };
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
      // PR fix/live-mode-time-and-restore — Fix 1 (batch path): inject 영역
      // time 영역 net.t 정합 (직전 buggy time:0 영역 net.t 누적 영역 모든 stale
      // impulse 영역 1-step burst collapse → V1 attenuated → OUT silent).
      const tNow = net.t;
      // 1. inject(pattern) — 활성도 > 0.5 dim 만 사용 (binary 정합).
      const events = pattern
        .map((v, i) => {
          if (v <= 0.5) return null;
          return {
            neuron: `in_feat_${i}`,
            weight: intensity * v,
            time: tNow,
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
      // 영역 measure run() 후 영역 net.t 영역 갱신 catch 영역 tNow2 영역 재catch.
      const tNow2 = net.t;
      if (events.length > 0) {
        const reEvents = events.map((e) => ({ ...e, time: tNow2 }));
        net.inject(reEvents);
      }
      const gain = isCorrect ? rewardGain : punishGain;

      // QA CAUSE A fix (2026-05-10): synapse cluster mask 영역 swap-restore.
      // 직전 reward pass 영역 GLOBAL stdpGain 영역 모든 발화 neuron 영역 LTP 적용
      // → cluster 별 selective 0 → cross-cluster strengthen → margin 약화 영역
      // root cause. 학술 정합: Florian 2007 R-STDP / Izhikevich 2007 DA-STDP
      // region-specific gating — reward 영역 target cluster 영역 incoming synapse
      // 영역만 적용. swap-restore 영역 worker thread sequential FIFO 영역 정합
      // — race 0.
      const targetCi = payload.targetCluster;
      const savedMultipliers = this.applyClusterRewardMask(targetCi);
      try {
        net.run(observeMs, { dtMs, stdpEnabled: true, stdpGain: gain });
      } finally {
        this.restoreClusterRewardMask(savedMultipliers);
      }
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

  /**
   * QA CAUSE A fix (2026-05-10): R-STDP region-specific gating.
   *
   * target cluster 영역 incoming synapse 영역만 stdpGainMultiplier 영역 보존 +
   * 그 외 영역 0 영역 set. reward run 후 영역 restoreClusterRewardMask 영역
   * 1.0 (원본) 영역 restore (in-place swap-restore, worker thread sequential
   * FIFO 영역 정합 — race 0).
   *
   * cluster mask 영역 결정 — post neuron 영역 region/population 영역 catch:
   *   - OUT (region='OUT', population=`cluster_${ci}`): ci === target 영역 1.0
   *   - V1_L4_E (region='V1', population='L4_E', name=`v1_L4_E_${idx}`): ci =
   *     floor(idx / V1_L4_PER_SUB) === target 영역 1.0
   *   - V1_L23_E / V2_L4_E / V2_L23_E / V2_L5_E 동일 (each per-sub 정합).
   *   - 그 외 (V1_L4_I / INPUT) 영역 0 (excitatory only — STDP gate 영역 본 path
   *     영역 weight<=0 영역 skip 사실 단 명시 0 영역 정합).
   *
   * 학술 정합: Florian 2007 / Izhikevich 2007 R-STDP — reward 영역 target subspace
   * 영역만 LTP. 본 path 영역 cluster sub-pool 영역 catch 영역 cross-cluster LTP
   * 영역 0 → margin 강화.
   *
   * 정직 한계: expanded cluster (c{N}_v1_L4_E_*, N >= 4) 영역 미지원 — base 4
   * cluster 영역만 catch (registry.slots[targetCi] 영역 정합 catch 영역 follow-up
   * PR 영역 deferred). 본 PR 영역 base 4 cluster 영역 정합 catch.
   */
  private applyClusterRewardMask(targetCi: number): Float64Array {
    const net = this.requireNet();
    const saved = new Float64Array(net.synapses.length);
    for (let i = 0; i < net.synapses.length; i += 1) {
      const syn = net.synapses[i];
      saved[i] = syn.stdpGainMultiplier;
      const ci = this.inferPostCluster(syn.post.name, syn.post.region, syn.post.population);
      // ci === targetCi 영역 1.0 (LTP 적용) / null or 다른 cluster 영역 0 (no LTP).
      // saved value 영역 restore 영역 catch 영역 본 path 영역 1.0 hard-set 영역
      // catch (n13 builder default 영역 1.0 정합 — multiplier 영역 expandCluster
      // 영역 1.0 default 정합).
      syn.stdpGainMultiplier = ci === targetCi ? 1.0 : 0.0;
    }
    return saved;
  }

  private restoreClusterRewardMask(saved: Float64Array): void {
    const net = this.requireNet();
    for (let i = 0; i < net.synapses.length && i < saved.length; i += 1) {
      net.synapses[i].stdpGainMultiplier = saved[i];
    }
  }

  /**
   * post neuron name + region + population 영역 catch 영역 cluster id 추론.
   * - n13 builder base 4 cluster (`v1_L4_E_${idx}` etc) 영역 ci = floor(idx/per-sub).
   * - OUT (`out_${ci}_${ni}`) 영역 ci 직접 추출.
   * - expanded cluster (`c${N}_v1_L4_E_*`) 영역 N === ci.
   * - 그 외 (V1_L4_I, INPUT, in_feat_*) 영역 null (mask 영역 0 적용).
   */
  private inferPostCluster(name: string, region: string | null, population: string | null): number | null {
    if (region === 'INPUT') return null;
    if (region === 'OUT') {
      // OUT — out_${ci}_${ni} 또는 expanded out_${ci}_${ni} (cluster_${ci} 정합).
      const m = /^out_(\d+)_(\d+)$/.exec(name);
      if (m) return Number(m[1]);
      return null;
    }
    // V1/V2 — inhibitory 영역 population 영역 'L4_I' / 'L23_I' / 'L5_I' 영역 정합 — exclude.
    if (population && population.endsWith('_I')) return null;
    // expanded cluster — c{N}_*.
    const me = /^c(\d+)_/.exec(name);
    if (me) return Number(me[1]);
    // base cluster — v1_L4_E_${idx} etc — per-sub 영역 ci 추론.
    // n13 V1_L4_E=128, V1_L23_E=128, V2_L4_E=128, V2_L23_E=96, V2_L5_E=64 / 4 cluster.
    const baseMatch = /^(v1_L4_E|v1_L23_E|v2_L4_E|v2_L23_E|v2_L5_E)_(\d+)$/.exec(name);
    if (!baseMatch) return null;
    const layer = baseMatch[1];
    const idx = Number(baseMatch[2]);
    const registry = this.registry;
    if (!registry) return null;
    let perSub: number;
    switch (layer) {
      case 'v1_L4_E': perSub = registry.v1L4PerSub; break;
      case 'v1_L23_E': perSub = registry.v1L23PerSub; break;
      case 'v2_L4_E': perSub = registry.v2L4PerSub; break;
      case 'v2_L23_E': perSub = registry.v2L23PerSub; break;
      case 'v2_L5_E': perSub = registry.v2L5PerSub; break;
      default: return null;
    }
    return Math.floor(idx / perSub);
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

  // ── PR-B (Web Worker background offload, 2026-05-10): background RPC ──
  //
  // 사용자 catch 2026-05-09 [2]: "학습이나 추론시에 백그라운드에서 동작하면
  // 좋을 것 같습니다. 너무 버벅이고 유저 액션(이벤트)에 지연발생(불편함)"
  //
  // 본 method 영역 inline simulation (inject + run + clusterFiringRates +
  // regionFiringRates × 2) 영역 실행 영역 push event 영역 emit. live-snn.ts
  // triggerOnce + emitTick 영역 동일 semantics — 단 RPC round-trip 영역 5 →
  // 1 절감 + 결과 영역 비동기 push (main thread 영역 await 0).

  private handleTriggerBackground(payload: TriggerBackgroundPayload): void {
    try {
      // PR #192 polish (SEC-1): payload validation guard — defense-in-depth.
      validateTriggerBackgroundPayload(payload);
      const net = this.requireNet();
      // resetThreshold — Diehl & Cook 2015 §3.2 batch frame reset 정합.
      if (payload.resetThreshold) {
        for (const n of net.neurons) {
          n.thresholdOffset = 0;
        }
      }
      let cfr: ClusterFiringRatesResult | null = null;
      // repeats 회 inject + run — Risk 4 mitigation (PR #184 정합).
      // QA FINDING-1 fix (2026-05-10): stdpEnabled 영역 gain>0 catch — stdpGain=0
      // (inferAsync path) 영역 stdpEnabled=true hard-code 영역 applyPairStdp(t, 0)
      // 영역 호출 → trace state mutation (preTrace/postTrace/lastSpikeTimeForTrace)
      // 영역 다음 reinforce 영역 stale trace pollution. gain=0 영역 stdp gate 영역
      // off 영역 trace mutation 0. 학술 정합: Bi & Poo 1998 STDP 영역 trace mutation
      // 영역 gain 무관 사실 — gain=0 영역 weight 영역 unchanged 단 trace 영역 변경
      // → next reward pass 영역 LTP 영역 stale trace 영역 base 영역 catch 사실.
      const stdpEnabled = payload.stdpGain > 0;
      for (let i = 0; i < payload.repeats; i += 1) {
        const tNow = net.t;
        const events = this.buildInjectEventsLocal(payload, tNow);
        if (events.length > 0) net.inject(events);
        net.run(payload.observeMs, {
          dtMs: 0.1,
          stdpEnabled,
          stdpGain: payload.stdpGain,
        });
        cfr = this.handleClusterFiringRates({ windowMs: payload.observeMs, layer: 'OUT' });
      }
      // V1/V2 region rates — 마지막 repeat 후 영역 catch (PR fix Fix 5).
      const v1 = this.handleRegionFiringRates({ region: 'V1', windowMs: payload.observeMs });
      const v2 = this.handleRegionFiringRates({ region: 'V2', windowMs: payload.observeMs });
      if (this.pushEmitter && cfr) {
        this.pushEmitter({
          type: 'push',
          event: 'triggerComplete',
          payload: {
            trialToken: payload.trialToken,
            cfr,
            v1Hz: v1.hz,
            v2Hz: v2.hz,
            netTime: net.t,
          },
        });
      }
    } catch (e) {
      // 정직 한계: simulation fail 영역 push 0 — main thread 영역 push event
      // 미수신 영역 timeout 영역 catch 사실. 본 path 영역 dev mode 영역만
      // console.warn (worker globalThis 영역 console 영역 정합).
      console.warn('[SNNWorkerCore] triggerBackground failed:', e);
    }
  }

  private handleReinforceBackground(payload: ReinforceBackgroundPayload): void {
    try {
      // PR #192 polish (SEC-1): payload validation guard — defense-in-depth.
      validateReinforceBackgroundPayload(payload);
      const net = this.requireNet();
      // resetHomeostatic — supervised batch 영역 frame reset 정합.
      for (const n of net.neurons) {
        n.thresholdOffset = 0;
      }
      // clusterTrainRStdp 영역 1-pattern batch reuse — 직전 reinforce path 영역 정합.
      const trainResult = this.handleClusterTrainRStdp({
        patterns: [payload.pattern.slice()],
        targetCluster: payload.targetCluster,
        rewardGain: payload.rewardGain,
        punishGain: payload.punishGain,
        observeMs: payload.observeMs,
        stimulusDurationMs: payload.stimulusDurationMs,
        intensity: payload.intensity,
      });
      // QA CAUSE B fix (2026-05-10): push payload cfr 영역 measure pass 영역 catch.
      // 직전 reward pass 영역 STDP mutation 직후 영역 별도 clusterFiringRates 호출
      // 영역 measure pass 50ms drop + post-mutation 영역 winner mismatch → push event
      // 영역 trial winner 영역 측정 winner 영역 catch 0. 정정 영역 trainResult
      // 영역 measure pass (clusterRatesHistory[0] + winnerHistory[0]) 영역 source —
      // measure pass winner 영역 정확 reflection.
      // 학술 정합: R-STDP measure pass 영역 trial-level decision (post-reward
      // mutation 영역 next trial 영역 catch 사실 — 본 push 영역 trial 결과 영역
      // catch 영역 measure pass 영역 source 영역 정합).
      const measureRates = trainResult.clusterRatesHistory[0] ?? [0, 0, 0, 0];
      const measureWinner = trainResult.winnerHistory[0] ?? -1;
      let measureMax = 0;
      let measureSecond = 0;
      let measureTotal = 0;
      for (let i = 0; i < measureRates.length; i += 1) {
        measureTotal += measureRates[i];
        if (measureRates[i] > measureMax) {
          measureSecond = measureMax;
          measureMax = measureRates[i];
        } else if (measureRates[i] > measureSecond) {
          measureSecond = measureRates[i];
        }
      }
      const cfr: ClusterFiringRatesResult = {
        rates: measureRates,
        winner: measureWinner,
        share: measureTotal > 0 ? measureMax / measureTotal : 0,
        margin: measureMax > 0 ? (measureMax - measureSecond) / measureMax : 0,
        layer: 'OUT',
      };
      const v1 = this.handleRegionFiringRates({ region: 'V1', windowMs: payload.observeMs });
      const v2 = this.handleRegionFiringRates({ region: 'V2', windowMs: payload.observeMs });
      if (this.pushEmitter) {
        this.pushEmitter({
          type: 'push',
          event: 'reinforceComplete',
          payload: {
            trialToken: payload.trialToken,
            targetCluster: payload.targetCluster,
            cfr,
            v1Hz: v1.hz,
            v2Hz: v2.hz,
            trained: trainResult.trained,
            correct: trainResult.correct,
            accuracy: trainResult.accuracy,
          },
        });
      }
    } catch (e) {
      console.warn('[SNNWorkerCore] reinforceBackground failed:', e);
    }
  }

  // triggerBackground inject events helper — pattern 영역 16-dim 영역 in_feat_*
  // 영역 sustained injection 영역 정합 (live-snn buildInjectEvents 영역 동일).
  private buildInjectEventsLocal(
    payload: TriggerBackgroundPayload,
    currentT: number,
  ): Array<{ neuron: string; weight: number; time: number; durationMs: number; stepMs: number }> {
    const out: Array<{ neuron: string; weight: number; time: number; durationMs: number; stepMs: number }> = [];
    for (let i = 0; i < 16; i += 1) {
      const v = payload.pattern[i] ?? 0;
      if (v <= 0.5) continue;
      out.push({
        neuron: `in_feat_${i}`,
        weight: payload.intensity * v,
        time: currentT,
        durationMs: payload.stimulusDurationMs,
        stepMs: 0.1,
      });
    }
    return out;
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
