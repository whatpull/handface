'use client';

// ModeIndicator — 회로의 학습 / 추론 / idle 모드를 backend 응답 사실 1:1 로 표시.
//
// 거짓 표시 회피 원칙 (사용자 명시):
//  - 모드는 "STDP weight 변화 detected" / "out fire only" / "no fire" 사실로만 분기
//  - winner 는 out_rates max 가 두 번째보다 >=10% margin 일 때만 표시. tie 면 "WTA tie" 명시
//  - saturation 사실 (모든 OUT >= 400Hz) 은 별도 경고 표시 → selectivity 0 사실 노출
//  - 학습 모드인데 Δw 0 → "no Δw detected" 명시

import { useEffect, useMemo, useRef, useState } from 'react';
import { onBackendEvent, type NeuronFiringDetail, type HandFeatureDetail, type RStdpPulseDetail, type AstrocyteHomeostasisDetail } from '@/lib/backend/events';

interface ModeStatus {
  mode: 'learning' | 'inference' | 'idle';
  ltpSum: number;
  ltdSum: number;
  changedSyn: number;
  winner: string | null;
  winnerRate: number;
  winnerMargin: number;
  outAllSaturated: boolean;
  ts: number;
}

interface TeacherStatus {
  gestureName: string | null;
  gestureScore: number;
  hasHand: boolean;
  // 같은 gesture name 연속 frame 카운트 (mappable + conf 충족 시만 누적).
  stableCount: number;
}

// saturation 임계 — 모든 OUT 이 이 이상 firing rate 이면 selectivity 0 catch.
const SATURATION_HZ = 400;
// 의미 있는 winner margin (max - second) / max — 이 이하면 tie 로 간주.
const WINNER_MARGIN = 0.10;
// 의미 있는 Δw — 이 이하 변경은 noise 로 간주 (시냅스 weight 영역에서 최소 catch 단위).
const DW_EPSILON = 0.1;
// 응답 없는 idle 시간 — 이 이상 안 들어오면 idle 표시로 fade.
const IDLE_FADE_MS = 1500;

// supervised teacher 정합 임계 — use-hand-control 정합 (0.6).
// 0.6 → 0.8 상향 (N3 한계 돌파 1: noisy teacher 회피, use-hand-control 정합).
const TEACHER_CONF_MIN = 0.8;
// N consecutive same-gesture frame 합의 — use-hand-control GESTURE_STABLE_FRAMES 정합.
const TEACHER_STABLE_FRAMES = 3;
// MediaPipe GestureRecognizer 라벨 화이트리스트 (mappable 만 stability 카운트).
// use-hand-control GESTURE_LABEL_TO_CLUSTER 정합.
const MAPPABLE_GESTURES = new Set(['Pointing_Up', 'Open_Palm', 'Closed_Fist', 'Victory']);

interface RStdpCounter {
  pulses: number;
  totalAmplified: number;
  lastDeltaSum: number;
  lastSynapses: number;
  lastReward: number;
  lastTs: number;
}

// Phase 26: per-neuron V_th astrocyte homeostasis pulse counter.
// silence escape mechanism 본격 활성화 영역 표시 — 사실 1:1.
interface AstrocyteCounter {
  pulses: number;
  totalSilence: number;       // 누적 silence neuron 수 (V_th 하향)
  totalHyperactive: number;   // 누적 hyperactive neuron 수 (V_th 상향)
  lastSilence: number;
  lastHyperactive: number;
  lastAdjusted: number;
  lastTs: number;
}

export default function ModeIndicator() {
  const [status, setStatus] = useState<ModeStatus | null>(null);
  const [teacher, setTeacher] = useState<TeacherStatus | null>(null);
  const [rstdp, setRstdp] = useState<RStdpCounter | null>(null);
  const [astrocyte, setAstrocyte] = useState<AstrocyteCounter | null>(null);
  // pre->post 별 직전 weight 보관. Δw 계산 = current - prev.
  const prevWeights = useRef<Map<string, number>>(new Map());
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // teacher stability tracking — use-hand-control 과 독립 카운트 (events 추가 회피).
  // 같은 mappable gesture + conf 충족 frame 연속 시 카운트, 아니면 리셋.
  const teacherStableRef = useRef<{ name: string | null; count: number }>({ name: null, count: 0 });

  // R-STDP pulse 발생 subscribe — 카운터 + 마지막 amplified syn / delta 기록.
  // 사실 1:1 — backend 응답 ok 시만 카운트.
  useEffect(() => {
    const off = onBackendEvent<RStdpPulseDetail>('rstdp-pulse', (d) => {
      if (!d.ok) return;
      setRstdp((prev) => ({
        pulses: (prev?.pulses ?? 0) + 1,
        totalAmplified: (prev?.totalAmplified ?? 0) + (d.totalAmplifiedDelta ?? 0),
        lastDeltaSum: d.totalAmplifiedDelta ?? 0,
        lastSynapses: d.synapsesAmplified ?? 0,
        lastReward: d.rewardStrength,
        lastTs: Date.now(),
      }));
    });
    return off;
  }, []);

  // Phase 26: astrocyte per-neuron V_th homeostasis pulse subscribe.
  // silence (rate < target/4) V_th 하향 + hyperactive (rate > target×2) V_th 상향.
  // 사실 1:1 — backend 응답 ok 시만 카운트.
  useEffect(() => {
    const off = onBackendEvent<AstrocyteHomeostasisDetail>('astrocyte-homeostasis', (d) => {
      if (!d.ok) return;
      const sil = d.silenceCount ?? 0;
      const hyp = d.hyperactiveCount ?? 0;
      const adj = d.adjusted ?? (sil + hyp);
      setAstrocyte((prev) => ({
        pulses: (prev?.pulses ?? 0) + 1,
        totalSilence: (prev?.totalSilence ?? 0) + sil,
        totalHyperactive: (prev?.totalHyperactive ?? 0) + hyp,
        lastSilence: sil,
        lastHyperactive: hyp,
        lastAdjusted: adj,
        lastTs: Date.now(),
      }));
    });
    return off;
  }, []);

  // MediaPipe gesture (teacher signal) subscribe.
  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      const name = d.gestureName ?? null;
      const score = d.gestureScore ?? 0;
      const mappable = name !== null && MAPPABLE_GESTURES.has(name);
      // stability counter — mappable + conf 충족 시만 누적, 아니면 0 리셋.
      if (d.hasHand && mappable && score >= TEACHER_CONF_MIN) {
        if (name === teacherStableRef.current.name) {
          teacherStableRef.current.count += 1;
        } else {
          teacherStableRef.current = { name, count: 1 };
        }
      } else {
        teacherStableRef.current = { name: null, count: 0 };
      }
      setTeacher({
        gestureName: name,
        gestureScore: score,
        hasHand: d.hasHand,
        stableCount: teacherStableRef.current.count,
      });
    });
    return off;
  }, []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const outRates = d.out_rates || {};

      // Δw 계산 — backend delta 사실 1:1.
      // Fast-path: `synapses_changed` (commit 443e48f, default) — backend 가 |Δw|≥threshold 변경분만 송신.
      //            delta 직접 합산, frontend cache 비교 불필요.
      // Fallback: `synapses` 전체 + 자체 cache 비교 (구버전 backend 또는 `?synapses_full=true`).
      let ltpSum = 0;
      let ltdSum = 0;
      let changedSyn = 0;
      const changed = d.synapses_changed;
      const cache = prevWeights.current;
      if (changed && changed.length > 0) {
        // delta-only path — backend 사실 직접 활용.
        for (let i = 0; i < changed.length; i += 1) {
          const s = changed[i];
          const dw = s.delta;
          const adw = dw >= 0 ? dw : -dw;
          if (adw >= DW_EPSILON) {
            changedSyn += 1;
            if (dw > 0) ltpSum += dw;
            else ltdSum += dw;
          }
          // fallback path 정합 영역 cache 영역만 갱신 (전체 syn 비교 시 baseline).
          cache.set(`${s.pre}->${s.post}`, s.weight);
        }
      } else {
        // Fallback — 전체 syn cache Δw.
        const syn = d.synapses || [];
        for (let i = 0; i < syn.length; i += 1) {
          const s = syn[i];
          const key = `${s.pre}->${s.post}`;
          const prev = cache.get(key);
          if (prev !== undefined) {
            const dw = s.weight - prev;
            const adw = dw >= 0 ? dw : -dw;
            if (adw >= DW_EPSILON) {
              changedSyn += 1;
              if (dw > 0) ltpSum += dw;
              else ltdSum += dw;
            }
          }
          cache.set(key, s.weight);
        }
      }

      // winner 분리도 — out_rates max 가 두 번째보다 의미 있게 클 때만 winner.
      const outs = Object.entries(outRates).sort((a, b) => b[1] - a[1]);
      let winner: string | null = null;
      let winnerRate = 0;
      let winnerMargin = 0;
      let outAllSaturated = false;
      if (outs.length >= 2) {
        const max = outs[0][1];
        const second = outs[1][1];
        winnerMargin = max > 0 ? (max - second) / max : 0;
        if (winnerMargin >= WINNER_MARGIN) {
          winner = outs[0][0];
          winnerRate = max;
        }
        // saturation 사실 — 모든 OUT 이 SATURATION_HZ 이상.
        outAllSaturated = outs.every(([, v]) => v >= SATURATION_HZ);
      }

      // 모드 추론 — Δw detected = learning, 발화만 있고 Δw 0 = inference, 둘 다 0 = idle.
      let mode: ModeStatus['mode'] = 'idle';
      const anyFire = Object.values(outRates).some((v) => v > 0)
        || (d.active_neurons_by_region && Object.values(d.active_neurons_by_region).some((arr) => (arr as string[]).length > 0));
      if (changedSyn > 0) mode = 'learning';
      else if (anyFire) mode = 'inference';

      setStatus({
        mode, ltpSum, ltdSum, changedSyn,
        winner, winnerRate, winnerMargin, outAllSaturated,
        ts: Date.now(),
      });

      // idle fade timer — 응답이 안 들어오면 idle 로 표시 변경.
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setStatus((s) => (s ? { ...s, mode: 'idle' } : s));
      }, IDLE_FADE_MS);
    });
    return () => {
      off();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Teacher badge 사실 — MediaPipe GestureRecognizer 라벨 + confidence + N=3 합의 1:1.
  // 3단 상태:
  //   1) stable supervised — conf >= 0.8 AND mappable AND stableCount >= 3 (amber bright)
  //   2) stabilizing       — conf >= 0.8 AND mappable AND stableCount < 3   (amber dim)
  //   3) unsupervised      — 그 외 (gray)
  // useMemo — teacher 객체 변경 시만 재계산 (status frame 마다 재계산 회피).
  const { teacherBg, teacherLabel, stableSupervised, stabilizing } = useMemo(() => {
    const teacherMappable = !!teacher && teacher.gestureName !== null
      && MAPPABLE_GESTURES.has(teacher.gestureName);
    const confOk = !!teacher && teacher.hasHand && teacher.gestureScore >= TEACHER_CONF_MIN;
    const _stableSupervised = confOk && teacherMappable
      && (teacher!.stableCount >= TEACHER_STABLE_FRAMES);
    const _stabilizing = confOk && teacherMappable && !_stableSupervised;
    const _bg = _stableSupervised
      ? 'bg-amber-500/15 ring-amber-400/40 text-amber-200'
      : _stabilizing
        ? 'bg-amber-500/8 ring-amber-400/25 text-amber-200/70'
        : 'bg-white/5 ring-white/15 text-white/40';
    const _label = _stableSupervised
      ? `teacher: ${teacher!.gestureName}`
      : _stabilizing
        ? `teacher: ${teacher!.gestureName} (stabilizing ${teacher!.stableCount}/${TEACHER_STABLE_FRAMES})`
        : (teacher?.hasHand
            ? `teacher: ${teacher.gestureName ?? 'none'} (${(teacher.gestureScore * 100).toFixed(0)}%, low conf or unstable — unsupervised)`
            : 'teacher: no hand');
    return { teacherBg: _bg, teacherLabel: _label, stableSupervised: _stableSupervised, stabilizing: _stabilizing };
  }, [teacher]);

  // mode 분기도 useMemo — status 변경 시만 재계산.
  const { modeBg, modeDot, modeLabel } = useMemo(() => {
    if (!status) return { modeBg: '', modeDot: '', modeLabel: '' };
    return {
      modeBg: status.mode === 'learning' ? 'bg-green-500/15 ring-green-400/40 text-green-200'
        : status.mode === 'inference' ? 'bg-blue-500/15 ring-blue-400/40 text-blue-200'
        : 'bg-white/5 ring-white/15 text-white/50',
      modeDot: status.mode === 'learning' ? 'bg-green-400'
        : status.mode === 'inference' ? 'bg-blue-400'
        : 'bg-white/30',
      modeLabel: status.mode === 'learning' ? 'LEARNING'
        : status.mode === 'inference' ? 'INFERENCE'
        : 'IDLE',
    };
  }, [status]);

  if (!status) return null;

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-1.5 font-mono text-[11px]">
      {/* Teacher badge — MediaPipe gesture 사실 1:1 */}
      {teacher && (
        <div className={`pointer-events-auto rounded ring-1 px-2.5 py-1.5 ${teacherBg} min-w-[180px]`}>
          <div className="font-semibold tracking-wider">{teacherLabel}</div>
          {stableSupervised && (
            <div className="mt-0.5 text-[10px] tabular-nums opacity-80">
              conf {(teacher!.gestureScore * 100).toFixed(0)}% — supervised STDP
              {rstdp && rstdp.pulses > 0 && ` + R-STDP active`}
            </div>
          )}
          {stableSupervised && rstdp && rstdp.pulses > 0 && (
            <>
              <div className="mt-0.5 text-[10px] tabular-nums opacity-70">
                rstdp: {rstdp.pulses} pulses · last +{rstdp.lastDeltaSum.toFixed(2)} ({rstdp.lastSynapses} syn × {rstdp.lastReward.toFixed(1)}x)
              </div>
              {/* 정직 catch 명시 — backend apply_rstdp_pulse 영역 winner path LTP 만 증폭 (target_out 영역 0 default).
                  즉 R-STDP 호출 = winner monopoly 강화 catch. 정정 = backend endpoint 변경 mandatory (사용자 명시 영역).
                  거짓 회피 — 사용자 영역 사실 노출. */}
              <div className="mt-0.5 text-[10px] leading-tight text-amber-300/90">
                ⚠ R-STDP active — winner reinforce only (monopoly catch).
                <br />
                <span className="opacity-70">backend endpoint 영역 target cluster 영역 변경 mandatory.</span>
              </div>
            </>
          )}
          {stabilizing && (
            <div className="mt-0.5 text-[10px] tabular-nums opacity-70">
              conf {(teacher!.gestureScore * 100).toFixed(0)}% — N=3 합의 대기 (unsupervised)
            </div>
          )}
        </div>
      )}
      {/* Mode badge — 사실 1:1 표시 */}
      <div className={`pointer-events-auto rounded ring-1 px-2.5 py-1.5 ${modeBg} min-w-[180px]`}>
        <div className="flex items-center gap-1.5 font-semibold tracking-wider">
          <span className={`h-2 w-2 rounded-full ${modeDot}`} />
          {modeLabel}
        </div>
        {status.mode === 'learning' && (
          <div className="mt-1 text-[10px] tabular-nums opacity-80">
            Δw +{status.ltpSum.toFixed(2)} / {status.ltdSum.toFixed(2)} · {status.changedSyn} syn
          </div>
        )}
        {status.mode === 'inference' && (
          <div className="mt-1 text-[10px] tabular-nums opacity-80">
            {status.winner
              ? `winner: ${status.winner} (margin ${(status.winnerMargin * 100).toFixed(0)}%, ${status.winnerRate.toFixed(0)}Hz)`
              : 'WTA tie — no winner detected'}
          </div>
        )}
        {status.mode === 'idle' && (
          <div className="mt-1 text-[10px] opacity-60">no fire / no Δw</div>
        )}
      </div>

      {/* Saturation 경고 — 사실 catch */}
      {status.outAllSaturated && (
        <div className="pointer-events-auto rounded ring-1 px-2.5 py-1.5 bg-orange-500/15 ring-orange-400/40 text-orange-200 min-w-[180px]">
          <div className="font-semibold tracking-wider">⚠ SATURATION</div>
          <div className="mt-0.5 text-[10px] opacity-80">
            모든 OUT ≥ {SATURATION_HZ}Hz — selectivity 0 사실
          </div>
        </div>
      )}

      {/* Phase 26: astrocyte per-neuron V_th homeostasis — silence escape mechanism.
          사실 1:1 — backend astrocytes/homeostasis_step ok 응답 시만 카운트 누적. */}
      {astrocyte && astrocyte.pulses > 0 && (
        <div className="pointer-events-auto rounded ring-1 px-2.5 py-1.5 bg-amber-500/12 ring-amber-400/35 text-amber-200/90 min-w-[180px]">
          <div className="font-semibold tracking-wider">
            astrocyte: {astrocyte.pulses} pulses
          </div>
          <div className="mt-0.5 text-[10px] tabular-nums opacity-80">
            V_th regulation · silence escape
          </div>
          <div className="mt-0.5 text-[10px] tabular-nums opacity-75">
            last: silence {astrocyte.lastSilence} ↓ / hyperactive {astrocyte.lastHyperactive} ↑
          </div>
          <div className="mt-0.5 text-[10px] tabular-nums opacity-65">
            total: {astrocyte.totalSilence} silenced ↓ · {astrocyte.totalHyperactive} hyperactive ↑
          </div>
          {/* 정직 한계 박음 — V_th 변경만, fire 시작 영역은 추가 stimulus mandatory */}
          <div className="mt-0.5 text-[10px] leading-tight text-amber-300/70">
            V_th 변경만 — fire 시작은 stimulus mandatory.
          </div>
        </div>
      )}
    </div>
  );
}
