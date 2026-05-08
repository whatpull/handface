// SNN worker core — Worker / Node 환경 어디서나 동작하는 RPC 핸들러.
//
// 목적: Worker transport 와 분리해 단위 테스트 가능. 실제 Worker entry
// (snn-worker.ts) 는 본 클래스를 인스턴스화하고 self.onmessage / postMessage
// 만 연결한다.

import { buildN13OrientationPreset } from './builders/n13-orientation';
import { SpikeMonitor } from './monitor';
import { NeuralNetwork } from './network';
import type {
  BuildPayload,
  BuildResult,
  FiringRatesPayload,
  FiringRatesResult,
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

export class SNNWorkerCore {
  private net: NeuralNetwork | null = null;
  private monitor: SpikeMonitor | null = null;

  handle(req: WorkerRequest): WorkerResponse {
    try {
      switch (req.type) {
        case 'build':
          return { id: req.id, ok: true, result: this.handleBuild(req.payload) };
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
        case 'reset':
          this.net = null;
          this.monitor = null;
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

  private handleBuild(payload: BuildPayload): BuildResult {
    if (payload.preset !== 'n13_orientation') {
      throw new Error(`알 수 없는 preset: ${payload.preset}`);
    }
    const result = buildN13OrientationPreset({
      vThreshold: payload.vThreshold,
      clusterActiveInputs: payload.clusterActiveInputs,
      seed: payload.seed,
    });
    this.net = result.net;
    this.monitor = new SpikeMonitor();
    this.monitor.attachAll(this.net.neurons);
    return {
      neuronsAdded: result.neuronsAdded,
      synapsesAdded: result.synapsesAdded,
      outClusters: result.outClusters,
      outTotal: result.outTotal,
      inputDim: result.inputDim,
      preset: result.preset,
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

  // 테스트용 — 직접 net 접근.
  getNetForTest(): NeuralNetwork | null {
    return this.net;
  }
}
