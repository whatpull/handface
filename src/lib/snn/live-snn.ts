'use client';
// LiveSnn — event-driven 1-shot SNN (사용자 catch 2026-05-09 영역 본격 pivot).
//
// 직전 (2026-05-09 A): 200ms setInterval 기반 background tick loop.
//   사용자 catch 영역 issue: "지속적인 학습 노드 틱, 추론과 학습을 진행할
//   방법이 정확히 구현되어 있지 않습니다." + "tic STDP active 가 너무 깜빡거려
//   보기 불편함, tic count는 무한대로 증가할 수 있어 좋지 않아보임."
//
// 본 정정 (2026-05-09 B): event-driven 1-shot trial.
//   - background loop 본격 폐기 (start/stop/timer 영역 0).
//   - INPUT 노드 영역 명시 trigger (GRID cell 클릭 / preset / CAMERA stable
//     자세 신규 catch) → 1회 inject + run(stdp on) × repeats + cluster firing
//     측정 + lab.save(throttle) → emitTick.
//   - tickCount 영역 trialCount 영역 swap — 사용자 명시 학습 시도 횟수 (의미
//     catch). 무한 background 누적 영역 회피.
//
// architecture:
//   patternRef (현재 16-dim 입력) ← UI 가 setPattern()
//   triggerOnce(opts):
//     1. tickInFlight wait
//     2. inject(pattern)
//     3. run(observeMs, stdp=true, gain=opts.stdpGain ?? 1.0) × opts.repeats ?? 3
//        — Risk 4 mitigation: 1 click 영역 hidden burst (학습 효과 보강)
//     4. clusterFiringRates → winner / share / margin
//     5. trialCount++ → emitTick → saveDebounced(lab, force)
//   reinforce(targetCluster, gain=2.0):
//     thin alias 영역 triggerOnce({ stdpGain: gain, repeats: 3, force: true })
//
// no-new-UI 정합: root /handface/ 5-node 가 본 controller 직접 사용.
// LocalSNN 인스턴스 영역 root-local-snn singleton 영역 공유.

import {
  emitBackendEvent,
  onBackendEvent,
  type NeuronFiringDetail,
  type InputModeDetail,
} from '@/lib/backend/events';

import type {
  ClusterFiringRatesResult,
  ReinforceCompletePayload,
  TriggerCompletePayload,
  TriggerErrorPayload,
} from '@/lib/snn-runtime';
import { getRootLocalSnnFor, type SubstrateKind, type RootLocalSnn } from './root-local-snn';
import { incrementCount } from './out-exemplars';

export interface LiveTickDetail {
  rates: number[];
  winner: number; // -1 = silent
  share: number;
  margin: number;
  patternActive: boolean; // 현재 pattern 영역 active dim 1개 이상 인지.
  /**
   * trigger 횟수 (사용자 영역 학습 시도) — INPUT 노드 영역 명시 1-shot 만
   * 누적. background loop 영역 폐기 영역 idle 시점 영역 0 유지.
   */
  trial: number;
  tickAtMs: number; // performance.now()
  // PR #192 polish (UX-3 + QA FINDING-1/2 token-aware reset): push event 영역
  // 도달 시점 영역 caller (GridInput / CameraInput) 영역 reinforcingCluster
  // 영역 정확 reset 영역 mandatory hint. trialToken 영역 fire-and-forget RPC
  // 영역 monotonic seq 영역 catch + source 영역 'trigger' / 'infer' / 'reinforce'
  // 영역 caller 영역 status copy 영역 정합 catch.
  trialToken?: number;
  source?: 'trigger' | 'reinforce';
  // reinforce 영역 targetCluster — caller 영역 in-flight gate 영역 cluster-specific
  // reset 영역 정합 (직전 setTimeout 100ms 영역 race 회피).
  targetCluster?: number;
}

export interface LiveSnnOptions {
  // 한 trigger 영역 simulation 영역 ms.
  // PR fix/live-mode-time-and-restore — Fix 4: 30 → 50ms (n13 batch path 영역
  // default 정합 + winner margin 안정 + V1/V2 cascade 영역 충분 propagation).
  observeMs?: number;
  // 한 trigger 영역 자극 weight 강도. default 25.
  intensity?: number;
  stimulusDurationMs?: number;
}

export interface TriggerOnceOptions {
  /** STDP gain (default 1.0 — reinforce 시 2.0 권장). */
  stdpGain?: number;
  /** 1 click 영역 inject+run 반복 횟수 (default 3 — Risk 4 mitigation). */
  repeats?: number;
  /** lab.save throttle bypass — reinforce path 영역 즉시 영속. */
  force?: boolean;
  /**
   * PR fix/live-mode-time-and-restore — Fix 3: 매 trigger 영역 진입 시점
   * 모든 neuron 영역 thresholdOffset 영역 0 영역 reset. default true (학술
   * 정합 — Diehl & Cook 2015 §3.2 batch frame reset). false 시 누적 — 단
   * repeats 3 × 8 OUT × increment 2.0 = 48 → V_th saturation 영역 fire 0
   * 영역 catch 영역 회피 catch 영역 default true 권장.
   */
  resetThreshold?: boolean;
}

const DEFAULT_OPTIONS: Required<LiveSnnOptions> = {
  // PR fix/live-mode-time-and-restore — Fix 4: 30 → 50ms (winner margin 안정).
  observeMs: 50,
  intensity: 25,
  stimulusDurationMs: 20,
};

const TICK_EVENT = 'handface.live-snn.tick';
const SAVE_THROTTLE_MS = 500;

export class LiveSnn {
  private opts: Required<LiveSnnOptions>;
  private patternRef: number[] = new Array(16).fill(0);
  private tickInFlight = false;
  private trialCount = 0;
  // 사용자 catch 2026-05-09 (Live 모드 broken state — fix/live-mode-substrate-init):
  // OUT count 영역 직전 use-hand-control (camera path) 영역만 trigger → Live grid
  // 영역 0 잔존 catch. winner 변경 시점 영역 idempotent incrementCount.
  private lastWinnerCluster: number = -1;
  // PR4 (사용자 catch 2026-05-09): substrate kind 별 segregated path —
  // GRID input (orientation) / CAMERA input (gesture) 가 별도 회로 정합.
  private substrateKind: SubstrateKind = 'orientation';
  // PR #171 audit fix (Fix 2 — QA HIGH): input-mode event 영역 derive 영역
  // GridInput / CameraInput 동시 mount last-write-wins race 회피.
  private _unsubscribeInputMode: (() => void) | null = null;
  // event-driven pivot (2026-05-09 B): lab.save throttle state.
  // 첫 호출 영역 immediate save 영역 보장 catch — -∞ 영역 sentinel 영역 시작
  // (Number.NEGATIVE_INFINITY 영역 sinceLast >> SAVE_THROTTLE_MS 보장).
  private _lastSaveAtMs = Number.NEGATIVE_INFINITY;
  private _saveTrailingTimer: ReturnType<typeof setTimeout> | null = null;
  // PR-B (Web Worker background offload, 2026-05-10): trial token + push handler.
  // trialToken 영역 monotonic seq — out-of-order push event 영역 latest-token-wins
  // discrimination. _unsubscribePush 영역 ensurePushHandler 영역 lazy bind 영역
  // 한 번만 등록 (multi-bind 영역 stale 회피).
  private _trialTokenSeq = 0;
  private _unsubscribePush: (() => void)[] = [];
  // 사용자 catch 2026-05-09 [2] (SEC-1 mitigation): push handler 영역 매 emit
  // 영역 fresh root fetch 영역 substrate switch stale 회피 — root 영역 reuse 0.
  private _pushBoundForKind: SubstrateKind | null = null;

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
    if (this._unsubscribeInputMode) {
      this._unsubscribeInputMode();
      this._unsubscribeInputMode = null;
    }
    // PR #184 audit fix (SEC-1 Path 2): trailing pending 시 unmount 영역
    // root.lab.save() 영역 즉시 fire — 마지막 trigger 영역 영속 보장.
    // dispose 영역 substrate 영역 정합 사실 (trailing closure 영역 capture
    // root 영역 dispose 시점 substrate 영역 정합 — setSubstrate Path 1 영역
    // pre-cancel 영역 stale 회피 보장 후 dispose 영역 도달).
    if (this._saveTrailingTimer !== null) {
      clearTimeout(this._saveTrailingTimer);
      this._saveTrailingTimer = null;
    }
    // PR-B (Web Worker background offload, 2026-05-10): push listener cleanup.
    for (const off of this._unsubscribePush) {
      try { off(); } catch { /* noop */ }
    }
    this._unsubscribePush = [];
    this._pushBoundForKind = null;
  }

  // 학술 정합: substrate 변경 시점 영역 기존 회로 영역 보존 + 새 회로 영역
  // lazy init. trigger 진행 중 시 await tickInFlight (background loop 영역
  // 폐기 영역 stop/start race 영역 0).
  // 같은 kind 영역 멱등 — early return.
  async setSubstrate(kind: SubstrateKind): Promise<void> {
    if (this.substrateKind === kind) return;
    while (this.tickInFlight) {
      await new Promise((r) => setTimeout(r, 5));
    }
    // PR #184 audit fix (SEC-1 Path 1): substrate switch 영역 trailing
    // setTimeout closure 영역 capture root 영역 stale 회피 — pre-cancel.
    // GRID → CAMERA switch 직후 500ms 내 trailing fire 영역 wrong substrate
    // root.lab.save() 영역 호출 사실 catch.
    if (this._saveTrailingTimer !== null) {
      clearTimeout(this._saveTrailingTimer);
      this._saveTrailingTimer = null;
    }
    // PR-B (Web Worker background offload, 2026-05-10): substrate switch 영역
    // push handler 영역 unsubscribe + lazy re-bind 영역 다음 triggerAsync 영역
    // 정합 (PR #186 SEC-1 substrate switch stale closure 호환 보존).
    for (const off of this._unsubscribePush) {
      try { off(); } catch { /* noop */ }
    }
    this._unsubscribePush = [];
    this._pushBoundForKind = null;
    this.substrateKind = kind;
    // 사용자 catch 2026-05-09 (Fix 2 — HIGH): substrate switch 영역 trial /
    // lastWinner / patternRef 영역 reset — 직전 GRID winner 영역 CAMERA tick
    // 영역 carry-over (UI 영역 winner badge 영역 stale orientation cluster
    // 영역 표시) 영역 root cause 정정. 학술 정합: substrate 영역 별도 회로
    // 영역 — 이전 회로 영역 trial / winner state 영역 무관.
    // trialCounts: Record 영역 swap 영역 가능 path 단 본 정정 영역 단순 reset
    // 영역 catch path (사용자 영역 substrate switch 영역 trial 누적 영역 mental
    // model 영역 0 영역 정합).
    this.trialCount = 0;
    this.lastWinnerCluster = -1;
    this.patternRef = new Array(16).fill(0);
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

  /**
   * Event-driven 1-shot trigger (2026-05-09 B 본격 pivot).
   *
   * 사용자 명시 INPUT 시점 (GRID cell click / preset apply / CAMERA stable
   * 자세) 영역 1회 inject + run(stdp on) × repeats + cluster firing 측정 +
   * lab.save (throttle) → emitTick.
   *
   * @param opts.stdpGain  STDP gain (default 1.0).
   * @param opts.repeats   inject+run 반복 횟수 (default 3 — Risk 4 mitigation).
   * @param opts.force     lab.save throttle bypass (reinforce 영역 true).
   * @returns saveFailed   lab.save 영역 실패 시 호출자 영역 user-visible warning.
   */
  async triggerOnce(opts: TriggerOnceOptions = {}): Promise<{ saveFailed: boolean }> {
    const stdpGain = opts.stdpGain ?? 1.0;
    const repeats = Math.max(1, opts.repeats ?? 3);
    const force = opts.force ?? false;
    // PR fix/live-mode-time-and-restore — Fix 3: default true (학술 정합).
    const resetThreshold = opts.resetThreshold ?? true;

    while (this.tickInFlight) await new Promise((r) => setTimeout(r, 5));
    this.tickInFlight = true;
    let saveFailed = false;
    let cfr: ClusterFiringRatesResult | null = null;
    let root: RootLocalSnn | null = null;
    // PR fix/live-mode-time-and-restore — Fix 5: V1/V2 region rate 실 측정.
    let v1Hz = 0;
    let v2Hz = 0;
    try {
      root = await getRootLocalSnnFor(this.substrateKind);
      // PR fix/live-mode-time-and-restore — Fix 3: 매 trigger 진입 시점
      // homeostatic thresholdOffset 영역 reset (V_th saturation 영역 회피).
      if (resetThreshold) {
        await root.client.resetHomeostatic();
      }
      for (let i = 0; i < repeats; i += 1) {
        cfr = await this.runStep(root, stdpGain);
      }
      this.trialCount += 1;
      // PR fix/live-mode-time-and-restore — Fix 5: 마지막 repeat 후 V1/V2
      // 실 spike rate 영역 catch (cluster_rates max proxy 영역 swap).
      if (cfr) {
        try {
          const [v1, v2] = await Promise.all([
            root.client.regionFiringRates({ region: 'V1', windowMs: this.opts.observeMs }),
            root.client.regionFiringRates({ region: 'V2', windowMs: this.opts.observeMs }),
          ]);
          v1Hz = v1.hz;
          v2Hz = v2.hz;
        } catch (e) {
          // regionFiringRates 영역 fail 영역 0 fallback (legacy worker / mock 영역
          // 정합 catch). UX-1: dev mode 영역 console.warn 1회 emit 영역 cause-effect
          // catch 정합 — production 영역 silent 보존 (process.env.NODE_ENV 영역
          // Next.js build-time inline replace).
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[LiveSnn] regionFiringRates fallback to 0Hz:', e);
          }
        }
        this.emitTick(cfr, v1Hz, v2Hz);
      }
    } catch (e) {
      console.warn('[LiveSnn] triggerOnce failed:', e);
    } finally {
      this.tickInFlight = false;
    }
    if (root) {
      saveFailed = await this.saveDebounced(root, force);
    }
    return { saveFailed };
  }

  /** internal helper — 1 inject+run+clusterFiringRates 반복 단위. */
  private async runStep(root: RootLocalSnn, stdpGain: number): Promise<ClusterFiringRatesResult> {
    // PR fix/live-mode-time-and-restore — Fix 1: net.t 절대 시각 catch 영역
    // inject events 영역 time 정합. 직전 buggy time:0 영역 net.t 누적 영역
    // 모든 stale impulse 영역 1-step burst collapse → V1 attenuated → OUT
    // silent → 두 번째 trigger 영역 winner -1 catch.
    let currentT = 0;
    try {
      currentT = await root.client.getNetworkTime();
    } catch (e) {
      // legacy worker / mock 영역 getNetworkTime 미구현 영역 fallback time=0
      // (기존 buggy behavior 유지 — 단 mock 영역 currentT 영역 0 catch 정합).
      void e;
    }
    const events = this.buildInjectEvents(currentT);
    if (events.length > 0) await root.client.inject(events);
    // QA FINDING-1 fix (2026-05-10): stdpEnabled 영역 gain>0 catch — inferOnce
    // (stdpGain=0) path 영역 stdpEnabled=true hard-code 영역 applyPairStdp(t, 0)
    // 영역 호출 → trace state mutation (preTrace/postTrace/lastSpikeTimeForTrace)
    // 영역 다음 reinforce 영역 stale trace pollution. async path (triggerBackground)
    // 영역 worker-core.ts 영역 동일 swap.
    await root.client.run({
      durationMs: this.opts.observeMs,
      dtMs: 0.1,
      stdpEnabled: stdpGain > 0,
      stdpGain,
    });
    // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): pattern 영역 동봉 영역
    // input cardinality normalize 영역 catch (Wiesel 1981 정합).
    return await root.client.clusterFiringRates({
      windowMs: this.opts.observeMs,
      layer: 'OUT',
      pattern: this.patternRef.slice(),
    });
  }

  /**
   * lab.save throttle — 직전 save 영역 SAVE_THROTTLE_MS (500ms) 내 시점
   * 영역 immediate save skip + trailing setTimeout 영역 마지막 trigger 의 결과
   * catch. force=true 시 throttle bypass (reinforce 영역 즉시 영속).
   * 반환 boolean — immediate save 실패 시 true (호출자 영역 user-visible).
   */
  private async saveDebounced(root: RootLocalSnn, force = false): Promise<boolean> {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const sinceLast = now - this._lastSaveAtMs;
    if (!force && sinceLast < SAVE_THROTTLE_MS) {
      // 직전 save 영역 throttle window 내 — trailing schedule 영역 마지막 결과 catch.
      if (this._saveTrailingTimer !== null) clearTimeout(this._saveTrailingTimer);
      const remain = SAVE_THROTTLE_MS - sinceLast;
      this._saveTrailingTimer = setTimeout(() => {
        this._saveTrailingTimer = null;
        // trailing save 영역 silent path (immediate save 영역 throttle 영역 skip
        // 사실 — 호출자 영역 saveFailed 영역 false 반환 사실).
        const trailingNow = typeof performance !== 'undefined' ? performance.now() : Date.now();
        this._lastSaveAtMs = trailingNow;
        root.lab.save().catch((e) => {
          console.warn('[LiveSnn] trailing save failed:', e);
        });
      }, remain);
      return false;
    }
    // immediate save path — throttle window 외 또는 force.
    if (this._saveTrailingTimer !== null) {
      clearTimeout(this._saveTrailingTimer);
      this._saveTrailingTimer = null;
    }
    this._lastSaveAtMs = now;
    try {
      await root.lab.save();
      return false;
    } catch (e) {
      console.warn('[LiveSnn] save failed (in-memory weight 영역 update OK):', e);
      return true;
    }
  }

  /**
   * PR-A architecture pivot (사용자 catch 2026-05-09 A2 — PRIMARY HIGH 70%):
   * 사용자 명시 R-STDP supervised reward — "이 패턴은 cluster X 가 맞다".
   *
   * 직전 (PR #189): triggerOnce({ stdpGain: gain }) 영역 thin alias —
   * targetCluster 영역 void → STDP unsupervised self-reinforcing loop →
   * 첫 trigger 영역 horizontal 우연 winner 영역 STDP saturate → lock-in
   * 영역 root cause catch.
   *
   * 정정 (본 PR): clusterTrainRStdp RPC 영역 1-pattern batch 영역 reuse
   * (worker-core.ts:343-416 본격 R-STDP supervised 구현 정합). 학술 정합:
   * Florian 2007 / Izhikevich 2007 R-STDP supervised — measure 영역 winner !=
   * targetCluster 일 시 punishGain (LTD), winner == targetCluster 일 시
   * rewardGain (LTP). cluster-specific gradient 영역 backend 영역 catch.
   *
   * 정직 한계: clusterTrainRStdp 영역 단일 pattern 영역 1-pattern batch (직전
   * triggerOnce repeats 3 영역 동질 patterns 영역 batch 정합 — observeMs ×
   * 1 frame ≈ 50ms simulation). saveDebounced (force=true) 영역 즉시 영속.
   *
   * QA FINDING-3 SECONDARY catch (PR #191 polish, 2026-05-10, MEDIUM):
   * PRIMARY supervised R-STDP wire 영역 위 영역 70% catch — 잔존 30% 영역
   * orientation overlap fundamental ambiguity 영역 정직 표시.
   *
   * - 예: n13 idx 5 영역 active set — cluster 0 (horizontal [4,5,6,7]) +
   *   cluster 1 (vertical [1,5,9,13]) 양쪽 영역 active → vertical 입력 단
   *   horizontal sub-pool fire 가능 영역 root cause (orientation feature
   *   영역 본격 disjoint 0).
   * - PRIMARY 70% catch (supervised R-STDP wire) 영역 후 영역 잔존 30% 영역
   *   feature engineering 영역 follow-up — n13 builder 영역 active set
   *   disjoint 영역 별도 PR 영역 defer 명시 (본 PR 영역 scope-out).
   * - 사용자 영역 추가 보강 영역 cluster-specific gradient 영역 backend
   *   punishGain 영역 횟수 정합 영역 catch — 정직 한계 명시.
   */
  async reinforce(targetCluster: number, gain: number = 0.8): Promise<{ saveFailed: boolean }> {
    while (this.tickInFlight) await new Promise((r) => setTimeout(r, 5));
    this.tickInFlight = true;
    let saveFailed = false;
    let root: RootLocalSnn | null = null;
    try {
      root = await getRootLocalSnnFor(this.substrateKind);
      // homeostatic thresholdOffset reset — 직전 trigger 누적 V_th saturation
      // 영역 회피 (Diehl & Cook 2015 §3.2 batch frame reset 정합).
      await root.client.resetHomeostatic();
      // R-STDP supervised — 1-pattern batch + targetCluster 영역 명시 wire.
      // rewardGain 영역 사용자 영역 명시 gain.
      // QA CAUSE D fix (2026-05-10): default 2.0 → 0.8 — saturation overshoot 회피.
      // QA CAUSE D1 fix (2026-05-10): punishGain=0 → gain*0.25 — wrong-winner LTD
      // escape 0 정직 한계 정정. Florian 2007 / Izhikevich 2007 R-STDP 영역
      // wrong-action LTD 정합 — punishGain 0 영역 wrong winner cluster 영역
      // weight 영역 unchanged → saturation lock-in escape 0 영역 root cause.
      // gain*0.25 영역 보수적 LTD (reward LTP 영역 1/4) — saturation 회피
      // 정합 path (양방향 escape mandatory).
      await root.client.clusterTrainRStdp({
        patterns: [this.patternRef.slice()],
        targetCluster,
        rewardGain: gain,
        punishGain: gain * 0.25,
        observeMs: this.opts.observeMs,
        stimulusDurationMs: this.opts.stimulusDurationMs,
        intensity: this.opts.intensity,
      });
      this.trialCount += 1;
      // cluster firing rates — supervised batch 영역 끝난 직후 영역 winner
      // 영역 catch (UI 영역 NodeLearn cluster bar / NodeInfer winner 영역 sync).
      // QA HIGH PRIMARY (FINDING-1) fix (2026-05-10): pattern 영역 동봉 영역
      // input cardinality normalize 영역 catch.
      const cfr = await root.client.clusterFiringRates({
        windowMs: this.opts.observeMs,
        layer: 'OUT',
        pattern: this.patternRef.slice(),
      });
      // V1/V2 region rates 영역 catch (NodeLearn cascade strip 영역 정합).
      let v1Hz = 0;
      let v2Hz = 0;
      try {
        const [v1, v2] = await Promise.all([
          root.client.regionFiringRates({ region: 'V1', windowMs: this.opts.observeMs }),
          root.client.regionFiringRates({ region: 'V2', windowMs: this.opts.observeMs }),
        ]);
        v1Hz = v1.hz;
        v2Hz = v2.hz;
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[LiveSnn] reinforce regionFiringRates fallback to 0Hz:', e);
        }
      }
      this.emitTick(cfr, v1Hz, v2Hz);
    } catch (e) {
      console.warn('[LiveSnn] reinforce failed:', e);
    } finally {
      this.tickInFlight = false;
    }
    if (root) {
      // force=true — supervised reward 영역 즉시 영속 (saveDebounced throttle bypass).
      saveFailed = await this.saveDebounced(root, true);
    }
    return { saveFailed };
  }

  /**
   * PR-A architecture pivot (사용자 catch 2026-05-09 A1): 명시 추론 trigger.
   * triggerOnce({ stdpGain: 0 }) 영역 thin wrapper — STDP off (학습 0) +
   * cluster firing rates 측정 only. semantic clarity 영역 별도 method 분리
   * (호출자 영역 의도 catch — '추론' button 영역 학습 trigger 0 보장).
   *
   * 학술 정합: STDP off — Hebbian 0, network 영역 가중치 변경 0 (read-only).
   * lab.save 영역 throttle 영역 조건부 — 가중치 변경 0 영역 immediate save 영역
   * skip 영역 정합 (saveDebounced 영역 force=false).
   */
  async inferOnce(): Promise<{ saveFailed: boolean }> {
    return await this.triggerOnce({ stdpGain: 0 });
  }

  // ── PR-B (Web Worker background offload, 2026-05-10): fire-and-forget API ──
  //
  // 사용자 catch 2026-05-09 [2]: "학습이나 추론시에 백그라운드에서 동작하면
  // 좋을 것 같습니다. 너무 버벅이고 유저 액션(이벤트)에 지연발생(불편함)"
  //
  // 직전 triggerOnce / inferOnce / reinforce 영역 await semantics 보존 (호환
  // mandatory) + 신규 *Async 영역 즉시 return (사용자 input event loop unblock).
  // 결과 영역 worker push event 영역 emit → ensurePushHandler 영역 emitTick
  // 영역 정합 (LiveTickDetail event + neuron-firing event + OUT incrementCount).
  //
  // tickInFlight gate 영역 본 path 영역 미사용 — worker 영역 sequential serialize
  // 영역 자연 정합 (worker thread 영역 message handler 영역 sync 영역 정합).
  // main thread 영역 head-of-line block 영역 0.

  /**
   * 즉시 return — `{ trialToken }` 반환. 결과 영역 worker push event 영역 별도
   * emitTick. 사용자 click → status 표시 영역 sync 영역 정합 catch — 결과
   * 영역 push event listener 영역 emit (tickAtMs 영역 push 도달 시점 정합).
   */
  triggerAsync(opts: TriggerOnceOptions = {}): { trialToken: number } {
    const stdpGain = opts.stdpGain ?? 1.0;
    const repeats = Math.max(1, opts.repeats ?? 3);
    const resetThreshold = opts.resetThreshold ?? true;
    const trialToken = ++this._trialTokenSeq;
    // fire-and-forget — root fetch 영역 async 단 await 0 (caller 영역 unblock).
    void (async () => {
      try {
        const root = await getRootLocalSnnFor(this.substrateKind);
        await this.ensurePushHandler(root);
        // PR-B: triggerBackground RPC 영역 sync ack `null` 영역 즉시 return —
        // worker 영역 inline simulation 영역 끝난 시점 영역 push event 영역
        // emit (ensurePushHandler 영역 emitTick + saveDebounced fire-and-forget).
        await root.client.triggerBackground({
          pattern: this.patternRef.slice(),
          intensity: this.opts.intensity,
          observeMs: this.opts.observeMs,
          stimulusDurationMs: this.opts.stimulusDurationMs,
          stdpGain,
          repeats,
          resetThreshold,
          trialToken,
        });
      } catch (e) {
        console.warn('[LiveSnn] triggerAsync dispatch failed:', e);
      }
    })();
    return { trialToken };
  }

  /**
   * 즉시 return — STDP off (학습 0). triggerAsync({ stdpGain: 0 }) thin wrapper.
   */
  inferAsync(): { trialToken: number } {
    return this.triggerAsync({ stdpGain: 0 });
  }

  /**
   * 즉시 return — R-STDP supervised reward 영역 worker 영역 inline 처리.
   * push event ('reinforceComplete') 영역 emitTick + lab.save force fire-and-forget.
   */
  reinforceAsync(targetCluster: number, gain: number = 0.8): { trialToken: number } {
    // QA CAUSE D fix (2026-05-10): rewardGain default 2.0 → 0.8 — saturation
    // overshoot 회피 (1회 reinforce 영역 W_MAX 도달 영역 saturation 영역 root cause).
    // multi-trial 수렴 정합 — 학술 정합 (Florian 2007 R-STDP 영역 gain 0.5-1.0
    // 권장 영역 trial 누적 영역 LTP 영역 점진 수렴).
    //
    // QA CAUSE D1 fix (2026-05-10): punishGain=0 → gain*0.25 — wrong-winner LTD
    // escape 0 정직 한계 정정. Florian 2007 / Izhikevich 2007 R-STDP wrong-action
    // LTD 정합 — punishGain=0 영역 wrong winner cluster 영역 weight 영역 unchanged
    // → saturation lock-in escape 0 영역 root cause. gain*0.25 영역 보수적 LTD
    // (reward LTP 영역 1/4) — 양방향 escape mandatory.
    const trialToken = ++this._trialTokenSeq;
    void (async () => {
      try {
        const root = await getRootLocalSnnFor(this.substrateKind);
        await this.ensurePushHandler(root);
        await root.client.reinforceBackground({
          pattern: this.patternRef.slice(),
          targetCluster,
          rewardGain: gain,
          punishGain: gain * 0.25,
          intensity: this.opts.intensity,
          observeMs: this.opts.observeMs,
          stimulusDurationMs: this.opts.stimulusDurationMs,
          trialToken,
        });
      } catch (e) {
        console.warn('[LiveSnn] reinforceAsync dispatch failed:', e);
      }
    })();
    return { trialToken };
  }

  /**
   * lazy bind push handler — root.client.on(...) 영역 매 emit 영역 fresh root
   * 영역 reuse 0 + setSubstrate 영역 unsubscribe + re-bind 영역 정합 (PR #186
   * SEC-1 substrate switch stale closure 호환 보존).
   *
   * 정직 한계: 한 번 bind 후 root reference 영역 capture — substrate 영역 동일
   * 영역 reuse 영역 정합. setSubstrate 영역 _pushBoundForKind=null + unsubscribe
   * 영역 catch 영역 다음 triggerAsync 영역 fresh root 영역 re-bind.
   */
  private async ensurePushHandler(root: RootLocalSnn): Promise<void> {
    if (this._pushBoundForKind === this.substrateKind) return;
    // 직전 binding 영역 stale 회피 — 별도 cleanup (setSubstrate 영역 정합).
    for (const off of this._unsubscribePush) {
      try { off(); } catch { /* noop */ }
    }
    this._unsubscribePush = [];
    this._pushBoundForKind = this.substrateKind;
    const offT = root.client.on('triggerComplete', (payload: TriggerCompletePayload) => {
      this.handleTriggerComplete(root, payload);
    });
    const offR = root.client.on('reinforceComplete', (payload: ReinforceCompletePayload) => {
      this.handleReinforceComplete(root, payload);
    });
    // QA FINDING-4 fix (2026-05-10): triggerError listener — handleTriggerBackground
    // / handleReinforceBackground catch path 영역 emit 영역 main thread 영역 정합.
    // emitBackendEvent('snn-error') 영역 toast + LiveTickDetail 영역 silent winner
    // -1 영역 emit (caller 영역 pendingInferTokenRef / pendingReinforceTokenRef
    // 영역 trialToken match 영역 reset 정합 — status copy 영역 'snn-error' toast
    // 영역 caller 영역 별도 visible).
    const offE = root.client.on('triggerError', (payload: TriggerErrorPayload) => {
      this.handleTriggerError(payload);
    });
    this._unsubscribePush.push(offT, offR, offE);
  }

  private handleTriggerError(payload: TriggerErrorPayload): void {
    // QA FINDING-4 fix (2026-05-10): worker simulation throw 영역 main thread
    // 영역 visual catch — emitBackendEvent('snn-error') + LiveTickDetail 영역
    // silent (winner=-1, rates=0) 영역 emit (caller 영역 token match 영역 reset).
    emitBackendEvent('snn-error', {
      source: 'rpc',
      message: payload.error,
      context: { event: 'triggerError', source: payload.source, trialToken: payload.trialToken },
    });
    // silent cfr 영역 emit — caller 영역 trialToken match 영역 status reset 정합.
    const silentCfr: ClusterFiringRatesResult = {
      rates: [0, 0, 0, 0],
      winner: -1,
      share: 0,
      margin: 0,
      layer: 'OUT',
    };
    this.emitTick(silentCfr, 0, 0, {
      trialToken: payload.trialToken,
      source: payload.source,
      targetCluster: payload.targetCluster,
    });
  }

  private handleTriggerComplete(root: RootLocalSnn, payload: TriggerCompletePayload): void {
    // 정직 한계: out-of-order push 영역 latest-token-wins discrimination 영역
    // 본 path 영역 미적용 — worker 영역 sequential serial 영역 자연 정합 +
    // main thread 영역 stale token 영역 dispatch 0 (push order = trial order).
    this.trialCount += 1;
    // PR #192 polish (UX-3 + QA FINDING-1/2): trialToken + source 영역 LiveTickDetail
    // 영역 동봉 → caller 영역 reinforcingCluster 영역 token match 영역 reset.
    this.emitTick(payload.cfr, payload.v1Hz, payload.v2Hz, {
      trialToken: payload.trialToken,
      source: 'trigger',
    });
    // saveDebounced fire-and-forget — 사용자 결과 표시 영역 IndexedDB write
    // 영역 wait 0. force=false (throttle 정합 — supervised path 영역 reinforce
    // 별도 force=true).
    void this.saveDebounced(root, false);
  }

  private handleReinforceComplete(root: RootLocalSnn, payload: ReinforceCompletePayload): void {
    this.trialCount += 1;
    this.emitTick(payload.cfr, payload.v1Hz, payload.v2Hz, {
      trialToken: payload.trialToken,
      source: 'reinforce',
      targetCluster: payload.targetCluster,
    });
    // force=true — supervised reward 영역 즉시 영속 (saveDebounced throttle bypass).
    void this.saveDebounced(root, true);
  }

  private buildInjectEvents(currentT: number): Array<{
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
        // PR fix/live-mode-time-and-restore — Fix 1: time 영역 net.t 정합.
        time: currentT,
        durationMs: this.opts.stimulusDurationMs,
        stepMs: 0.1,
      });
    }
    return out;
  }

  private emitTick(
    cfr: ClusterFiringRatesResult,
    v1Hz = 0,
    v2Hz = 0,
    meta?: { trialToken?: number; source?: 'trigger' | 'reinforce'; targetCluster?: number },
  ): void {
    if (typeof window === 'undefined') return;
    const patternActive = this.patternRef.some((v) => v > 0.5);
    const detail: LiveTickDetail = {
      rates: cfr.rates,
      winner: cfr.winner,
      share: cfr.share,
      margin: cfr.margin,
      patternActive,
      trial: this.trialCount,
      tickAtMs: typeof performance !== 'undefined' ? performance.now() : Date.now(),
      // PR #192 polish (UX-3 + QA FINDING-1/2): token-aware reset hint.
      trialToken: meta?.trialToken,
      source: meta?.source,
      targetCluster: meta?.targetCluster,
    };
    window.dispatchEvent(new CustomEvent<LiveTickDetail>(TICK_EVENT, { detail }));
    // PR3 (사용자 catch 2026-05-09): NodeInfer / PipelineEventContext 영역
    // neuron-firing 영역 listen — Live tick 시 동일 event 도 emit 영역 winner /
    // cluster_rates 영역 자동 반영. (cluster_rates / winner_cluster /
    // winner_margin 영역 backend B+3 combo 정합 필드 동봉.)
    //
    // 사용자 catch 2026-05-09 (Live 모드 broken state — fix/live-mode-substrate-init):
    // V1/V2 region rates 영역 미동봉 → NodeLearn cascade strip 영역 0 + fired=false.
    // 정합 정정: pattern active 시점 영역 V1/V2 영역 cascade 활성 사실 (substrate
    // 영역 INPUT → V1 → V2 → OUT 영역 정합). cluster_rates 영역 max 영역 V1/V2 영역
    // proxy rate 영역 동봉 — UI 영역 fired flag + active count 영역 작동.
    // 정직 한계: 실제 V1/V2 영역 spike rate 영역 별도 RPC 영역 필요 영역 본 path 영역
    // proxy 영역 표시. cluster firing rates 영역 OUT layer 영역 — V1/V2 영역 cascade
    // 영역 winner cluster 영역 sub-cluster 영역 활성 영역 정합 (cluster-local
    // hard-wire 영역).
    // PR fix/live-mode-time-and-restore — Fix 5: V1/V2 영역 실 spike rate
    // 영역 우선 (regionFiringRates RPC). regionFiringRates 영역 fail / 0
    // 영역 cluster_rates max proxy 영역 fallback (legacy behavior 유지).
    const maxRate = cfr.rates.reduce((m, r) => Math.max(m, r), 0);
    const proxyRate = patternActive ? Math.max(maxRate, 1) : maxRate;
    const v1Final = v1Hz > 0 ? v1Hz : proxyRate;
    const v2Final = v2Hz > 0 ? v2Hz : proxyRate;
    // PR #187 polish — QA MEDIUM-5 (audit 2026-05-10): proxy fallback 영역 사실
    // 영역 boolean 영역 emit — UI 영역 실 spike rate vs proxy 영역 catch.
    // V1/V2 둘 중 하나 영역 RPC fail (=0) 영역 proxy 영역 fallback 사실 →
    // patternActive 시점 영역 v1Hz<=0 || v2Hz<=0 영역 isProxy=true.
    const isProxy = patternActive && (v1Hz <= 0 || v2Hz <= 0);
    emitBackendEvent<NeuronFiringDetail>('neuron-firing', {
      cluster_rates: cfr.rates,
      winner_cluster: cfr.winner >= 0 ? cfr.winner : null,
      winner_margin: cfr.margin,
      rates_by_region: patternActive ? { V1: v1Final, V2: v2Final } : { V1: 0, V2: 0 },
      rates_by_region_is_proxy: isProxy,
    });
    // OUT count — winner 변경 시점 1회 increment (idempotent: 동일 cluster 연속
    // winner 영역 1회 only). 사용자 catch 2026-05-09 (broken state): Live grid
    // path 영역 OUT count 0 잔존 → 직접 incrementCount.
    //
    // PR-E (사용자 catch 2026-05-09 "한번 추론에 8개씩 증가"): UI semantic 정합
    // 영역 trial counter 영역 1회 추론 영역 cluster +1 영역 자연. 직전 PR #194
    // 영역 8 OUT broadcast loop 영역 cluster broadcast supervisor 영역 weight
    // learning path 영역 정합 영역 의도 영역 — UI exemplar count 영역 별도 path
    // 영역 trial-counter semantic 영역 mismatch (1 trigger → +8 cluster count).
    // 정정: cluster representative neuron (out_${winner}_0) 영역 단일 increment
    // 영역 trial-counter semantic 영역 정합. NodeOut 영역 sumClusterCount helper
    // 영역 8 OUT 합산 영역 — 1 representative neuron 영역 trial 횟수 영역 정합.
    //
    // 정직 한계: backend STDP weight update path 영역 cluster broadcast supervisor
    // 영역 8 OUT 영역 보존 (worker-core.ts handleClusterTrainRStdp 영역 학습 path)
    // — 본 정정 영역 UI exemplar count 영역 단일 path 영역 별도 catch.
    if (cfr.winner >= 0 && cfr.winner !== this.lastWinnerCluster) {
      this.lastWinnerCluster = cfr.winner;
      const featSnap = this.patternRef.slice();
      // 단일 representative neuron 영역 increment — trial-counter UI semantic 정합.
      // 사용자 catch 2026-05-09 (Fix 1): substrate 영역 명시 — orientation/gesture
      // 별도 store 영역 GRID/CAMERA carry-over 회피.
      incrementCount(`out_${cfr.winner}_0`, this.substrateKind, featSnap);
    } else if (cfr.winner < 0) {
      this.lastWinnerCluster = -1;
    }
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
