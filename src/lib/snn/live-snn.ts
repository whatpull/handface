'use client';
// LiveSnn — 항상 동작 SNN (사용자 catch 2026-05-09 A: Live 모드 본격 pivot).

import {
  emitBackendEvent,
  onBackendEvent,
  type NeuronFiringDetail,
  type InputModeDetail,
} from '@/lib/backend/events';
//
// 본질: 사용자가 패턴을 보여주는 즉시 STDP 적용 + cluster firing 측정 +
// winner emerge. 별도 Train/Infer 분리 X — SNN 본질 (Diehl & Cook 2015 +
// Hebbian "neurons that fire together wire together") 정합.
//
// architecture:
//   patternRef (현재 16-dim 입력) ← UI 가 setPattern()
//   tick loop (default 200ms 간격):
//     1. inject(pattern)
//     2. run(observeMs, stdp=true) — Hebbian self-reinforcement
//     3. clusterFiringRates → winner / share / margin
//     4. emit('live-tick' event) — listener (NodeLearn / NodeInfer) 갱신
//   reinforce(targetCluster) — 사용자 명시 R-STDP signal:
//     run(observeMs, stdp=true, gain=2.0) — positive reward to current pattern
//
// no-new-UI 정합: root /handface/ 5-node 가 본 controller 직접 사용.
// LocalSNN 인스턴스 영역 root-local-snn singleton 영역 공유.

import type { ClusterFiringRatesResult } from '@/lib/snn-runtime';
import { getRootLocalSnnFor, type SubstrateKind } from './root-local-snn';

export interface LiveTickDetail {
  rates: number[];
  winner: number; // -1 = silent
  share: number;
  margin: number;
  patternActive: boolean; // 현재 pattern 영역 active dim 1개 이상 인지.
  rev: number;
  tickAtMs: number; // performance.now()
}

export interface LiveSnnOptions {
  // tick 간격 (ms). default 200ms — UI 부드러움 + STDP 누적 균형.
  intervalMs?: number;
  // 한 tick 영역 simulation 영역 ms. default 30ms.
  observeMs?: number;
  // 한 tick 영역 자극 weight 강도. default 25.
  intensity?: number;
  stimulusDurationMs?: number;
}

const DEFAULT_OPTIONS: Required<LiveSnnOptions> = {
  intervalMs: 200,
  observeMs: 30,
  intensity: 25,
  stimulusDurationMs: 20,
};

const TICK_EVENT = 'handface.live-snn.tick';

export class LiveSnn {
  private opts: Required<LiveSnnOptions>;
  private patternRef: number[] = new Array(16).fill(0);
  private timer: ReturnType<typeof setInterval> | null = null;
  private running = false;
  private tickInFlight = false;
  private tickCount = 0;
  // PR4 (사용자 catch 2026-05-09): substrate kind 별 segregated path —
  // GRID input (orientation) / CAMERA input (gesture) 가 별도 회로 정합.
  private substrateKind: SubstrateKind = 'orientation';
  // PR #171 audit fix (Fix 2 — QA HIGH): input-mode event 영역 derive 영역
  // GridInput / CameraInput 동시 mount last-write-wins race 회피.
  private _unsubscribeInputMode: (() => void) | null = null;

  constructor(opts: LiveSnnOptions = {}) {
    this.opts = { ...DEFAULT_OPTIONS, ...opts };
    // input-mode event listener — NodeInput tab change 영역 emit 영역 정합.
    //   mode='camera' → substrate='gesture'
    //   mode='grid'   → substrate='orientation'
    this._unsubscribeInputMode = onBackendEvent<InputModeDetail>('input-mode', (d) => {
      const next: SubstrateKind = d.mode === 'camera' ? 'gesture' : 'orientation';
      void this.setSubstrate(next);
    });
  }

  dispose(): void {
    this.stop();
    if (this._unsubscribeInputMode) {
      this._unsubscribeInputMode();
      this._unsubscribeInputMode = null;
    }
  }

  // 학술 정합: substrate 변경 시점 영역 기존 회로 영역 보존 + 새 회로 영역
  // lazy init. running tick 진행 중 시 stop / await tickInFlight / 재시작.
  // 같은 kind 영역 멱등 — early return.
  async setSubstrate(kind: SubstrateKind): Promise<void> {
    if (this.substrateKind === kind) return;
    const wasRunning = this.running;
    if (wasRunning) this.stop();
    while (this.tickInFlight) {
      await new Promise((r) => setTimeout(r, 5));
    }
    this.substrateKind = kind;
    if (wasRunning) this.start();
  }

  getSubstrate(): SubstrateKind {
    return this.substrateKind;
  }

  setPattern(pattern: number[]): void {
    // 16-dim 보장 — 부족하면 pad, 초과는 cut.
    const next = new Array<number>(16).fill(0);
    for (let i = 0; i < Math.min(pattern.length, 16); i += 1) {
      next[i] = Math.max(0, Math.min(1, pattern[i] || 0));
    }
    this.patternRef = next;
  }

  getPattern(): number[] {
    return this.patternRef.slice();
  }

  isRunning(): boolean {
    return this.running;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.timer = setInterval(() => {
      void this.tick();
    }, this.opts.intervalMs);
  }

  stop(): void {
    if (!this.running) return;
    this.running = false;
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async tick(): Promise<void> {
    if (this.tickInFlight) return; // 직전 tick 미완료 — skip.
    this.tickInFlight = true;
    try {
      const root = await getRootLocalSnnFor(this.substrateKind);
      const events = this.buildInjectEvents();
      if (events.length > 0) await root.client.inject(events);
      await root.client.run({
        durationMs: this.opts.observeMs,
        dtMs: 0.1,
        stdpEnabled: true,
        stdpGain: 1.0,
      });
      const cfr: ClusterFiringRatesResult = await root.client.clusterFiringRates({
        windowMs: this.opts.observeMs,
        layer: 'OUT',
      });
      this.tickCount += 1;
      this.emitTick(cfr);
    } catch (e) {
      console.warn('[LiveSnn] tick failed:', e);
    } finally {
      this.tickInFlight = false;
    }
  }

  // 사용자 명시 R-STDP reward — "이 패턴은 cluster X 가 맞다".
  // 즉시 1 회 inject + run with positive gain (직전 tick 이 완료될 때까지 대기).
  // 반환: { saveFailed } — lab.save 영역 실패 시 호출자 영역 user-visible warning
  // 표시 가능 (in-memory weight 영역 update 영역 OK 단 영속 영역 실패 사실).
  async reinforce(targetCluster: number, gain: number = 2.0): Promise<{ saveFailed: boolean }> {
    while (this.tickInFlight) await new Promise((r) => setTimeout(r, 5));
    this.tickInFlight = true;
    let saveFailed = false;
    try {
      const root = await getRootLocalSnnFor(this.substrateKind);
      const events = this.buildInjectEvents();
      if (events.length > 0) await root.client.inject(events);
      await root.client.run({
        durationMs: this.opts.observeMs,
        dtMs: 0.1,
        stdpEnabled: true,
        stdpGain: gain,
      });
      // 학습 가중치 즉시 영속화 — 매번 reinforce 시점 lab.save.
      // PR audit fix (Fix 1 — MEDIUM): 직전 silent catch (`.catch(() => {})`) 영역
      // user-visible warning 영역 swap. console.warn 영역 진단 신호 + 호출자
      // 영역 saveFailed flag 영역 status message 영역 차별화 가능.
      try {
        await root.lab.save();
      } catch (e) {
        saveFailed = true;
        console.warn('[LiveSnn] reinforce save failed (in-memory weight 영역 update OK):', e);
      }
      const cfr = await root.client.clusterFiringRates({
        windowMs: this.opts.observeMs,
        layer: 'OUT',
      });
      this.emitTick(cfr);
      // 호출자 디버깅 위해 winner 반환 등은 emitTick 으로 위임.
      void targetCluster;
    } finally {
      this.tickInFlight = false;
    }
    return { saveFailed };
  }

  private buildInjectEvents(): Array<{
    neuron: string;
    weight: number;
    time: number;
    durationMs: number;
    stepMs: number;
  }> {
    const out: Array<{ neuron: string; weight: number; time: number; durationMs: number; stepMs: number }> = [];
    for (let i = 0; i < 16; i += 1) {
      const v = this.patternRef[i];
      if (v <= 0.5) continue;
      out.push({
        neuron: `in_feat_${i}`,
        weight: this.opts.intensity * v,
        time: 0,
        durationMs: this.opts.stimulusDurationMs,
        stepMs: 0.1,
      });
    }
    return out;
  }

  private emitTick(cfr: ClusterFiringRatesResult): void {
    if (typeof window === 'undefined') return;
    const detail: LiveTickDetail = {
      rates: cfr.rates,
      winner: cfr.winner,
      share: cfr.share,
      margin: cfr.margin,
      patternActive: this.patternRef.some((v) => v > 0.5),
      rev: this.tickCount,
      tickAtMs: typeof performance !== 'undefined' ? performance.now() : Date.now(),
    };
    window.dispatchEvent(new CustomEvent<LiveTickDetail>(TICK_EVENT, { detail }));
    // PR3 (사용자 catch 2026-05-09): NodeInfer / PipelineEventContext 영역
    // neuron-firing 영역 listen — Live tick 시 동일 event 도 emit 영역 winner /
    // cluster_rates 영역 자동 반영. (cluster_rates / winner_cluster /
    // winner_margin 영역 backend B+3 combo 정합 필드 동봉.)
    emitBackendEvent<NeuronFiringDetail>('neuron-firing', {
      cluster_rates: cfr.rates,
      winner_cluster: cfr.winner >= 0 ? cfr.winner : null,
      winner_margin: cfr.margin,
    });
  }
}

// ── singleton + helpers ──
let _instance: LiveSnn | null = null;

export function getLiveSnn(): LiveSnn {
  if (typeof window === 'undefined') {
    throw new Error('LiveSnn: client-only');
  }
  if (!_instance) _instance = new LiveSnn();
  return _instance;
}

export function disposeLiveSnn(): void {
  if (_instance) _instance.dispose();
  _instance = null;
}

export function onLiveTick(handler: (detail: LiveTickDetail) => void): () => void {
  if (typeof window === 'undefined') return () => undefined;
  const listener = (e: Event) => handler((e as CustomEvent<LiveTickDetail>).detail);
  window.addEventListener(TICK_EVENT, listener);
  return () => window.removeEventListener(TICK_EVENT, listener);
}
