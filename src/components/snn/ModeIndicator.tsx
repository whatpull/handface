'use client';

// ModeIndicator — 본질 redesign (사용자 명시): 5-phase state machine 표시.
//
// State machine (use-hand-control 영역 정합):
//   1. UNTRAINED  — 학습 0, batch loop 비활성. gray badge.
//   2. LEARNING   — N=5 stable + conf >= 0.85 영역 batch supervised 진행 중. amber.
//   3. PARTIAL    — 1-3 cluster 학습됨 (>=30 frame). orange.
//   4. TRAINED    — 4 cluster 모두 학습 완료. green badge "✓ TRAINED — inference active".
//   5. INFERENCE  — MediaPipe 보조만, cluster mean readout = winner. blue.
//
// 학습 진행률 표시 — cluster 4 영역 progress bar (예: "Pointing: 18/30 frames").
//
// 거짓 표시 회피 원칙 (사용자 명시):
//  - phase 영역 backend 응답 사실 1:1 (clusterFrames count 직접).
//  - winner 는 out_rates max 가 두 번째보다 >=10% margin 일 때만 표시. tie 면 "WTA tie" 명시.
//  - saturation 사실 (모든 OUT >= 400Hz) 은 별도 경고 표시.
//
// 직전 R-STDP / astrocyte 영역 badge 영역 폐기 — autoCapture 폐기 영역 정합.

import { useEffect, useMemo, useRef, useState } from 'react';
import { onBackendEvent, type NeuronFiringDetail, type HandFeatureDetail, type TrainingPhaseDetail } from '@/lib/backend/events';

interface ModeStatus {
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
// 의미 있는 winner margin — 이 이하면 tie 로 간주.
const WINNER_MARGIN = 0.10;
// 의미 있는 Δw — 이 이하 변경은 noise.
const DW_EPSILON = 0.1;

// supervised teacher 영역 정합 임계 — use-hand-control 영역 정합 (0.85, N=5).
const TEACHER_CONF_MIN = 0.85;
const TEACHER_STABLE_FRAMES = 5;
// MediaPipe GestureRecognizer 영역 mappable 영역 set.
const MAPPABLE_GESTURES = new Set(['Pointing_Up', 'Open_Palm', 'Closed_Fist', 'Victory']);

// cluster id → display label.
const CLUSTER_LABELS = ['Pointing', 'Open palm', 'Fist', 'Victory'] as const;
const CLUSTER_TARGET = 30;

type Phase = TrainingPhaseDetail['phase'];

// 진행률 bar — width 영역 ref + useEffect 영역 imperative 갱신 (HandTrackerHost 정합).
// inline style={{...}} 회피 — Next.js eslint 정합.
function ClusterProgressRow({ label, count, done }: { label: string; count: number; done: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      const pct = Math.min(100, (count / CLUSTER_TARGET) * 100);
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [count]);
  return (
    <div className="flex items-center gap-1.5 text-[10px] tabular-nums">
      <span className={`w-16 ${done ? 'text-green-300' : 'opacity-80'}`}>
        {done ? '✓ ' : ''}{label}
      </span>
      <div className="flex-1 h-1.5 rounded-sm bg-white/10 overflow-hidden">
        <div
          ref={fillRef}
          className={`snn-mode-progress-fill ${done ? 'bg-green-400' : 'bg-amber-400'}`}
        />
      </div>
      <span className="w-10 text-right opacity-70">
        {count}/{CLUSTER_TARGET}
      </span>
    </div>
  );
}

export default function ModeIndicator() {
  const [status, setStatus] = useState<ModeStatus | null>(null);
  const [teacher, setTeacher] = useState<TeacherStatus | null>(null);
  const [phaseDetail, setPhaseDetail] = useState<TrainingPhaseDetail | null>(null);
  // pre->post 별 직전 weight 보관. Δw 계산 = current - prev.
  const prevWeights = useRef<Map<string, number>>(new Map());
  // teacher stability tracking — use-hand-control 영역 정합 카운트.
  const teacherStableRef = useRef<{ name: string | null; count: number }>({ name: null, count: 0 });

  // training phase event 구독 — 사실 1:1 (use-hand-control 영역 emit).
  useEffect(() => {
    const off = onBackendEvent<TrainingPhaseDetail>('training-phase', (d) => {
      setPhaseDetail(d);
    });
    return off;
  }, []);

  // MediaPipe gesture (teacher signal) 구독.
  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      const name = d.gestureName ?? null;
      const score = d.gestureScore ?? 0;
      const mappable = name !== null && MAPPABLE_GESTURES.has(name);
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

      // Δw 계산.
      let ltpSum = 0;
      let ltdSum = 0;
      let changedSyn = 0;
      const changed = d.synapses_changed;
      const cache = prevWeights.current;
      if (changed && changed.length > 0) {
        for (let i = 0; i < changed.length; i += 1) {
          const s = changed[i];
          const dw = s.delta;
          const adw = dw >= 0 ? dw : -dw;
          if (adw >= DW_EPSILON) {
            changedSyn += 1;
            if (dw > 0) ltpSum += dw;
            else ltdSum += dw;
          }
          cache.set(`${s.pre}->${s.post}`, s.weight);
        }
      } else {
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

      // winner 분리도.
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
        outAllSaturated = outs.every(([, v]) => v >= SATURATION_HZ);
      }

      setStatus({
        ltpSum, ltdSum, changedSyn,
        winner, winnerRate, winnerMargin, outAllSaturated,
        ts: Date.now(),
      });
    });
    return off;
  }, []);

  // Teacher badge 사실.
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
            ? `teacher: ${teacher.gestureName ?? 'none'} (${(teacher.gestureScore * 100).toFixed(0)}%, low conf or unstable)`
            : 'teacher: no hand');
    return { teacherBg: _bg, teacherLabel: _label, stableSupervised: _stableSupervised, stabilizing: _stabilizing };
  }, [teacher]);

  // 5-phase 영역 표시 영역 (use-hand-control 영역 사실 1:1).
  const { phaseBg, phaseDot, phaseLabel, phaseSubtitle } = useMemo(() => {
    const phase: Phase = phaseDetail?.phase ?? 'untrained';
    const trainedCount = phaseDetail
      ? [0, 1, 2, 3].filter((i) => phaseDetail.clusterFrames[i as 0|1|2|3] >= CLUSTER_TARGET).length
      : 0;
    const config: Record<Phase, { bg: string; dot: string; label: string; sub: string }> = {
      untrained: {
        bg: 'bg-white/5 ring-white/15 text-white/60',
        dot: 'bg-white/30',
        label: 'UNTRAINED',
        sub: 'awaiting teacher (N=5 stable + conf ≥ 0.85)',
      },
      learning: {
        bg: 'bg-amber-500/15 ring-amber-400/40 text-amber-200',
        dot: 'bg-amber-400 animate-pulse',
        label: 'LEARNING',
        sub: 'batch supervised — capturing frames',
      },
      partial: {
        bg: 'bg-orange-500/15 ring-orange-400/40 text-orange-200',
        dot: 'bg-orange-400',
        label: 'PARTIAL',
        sub: `${trainedCount}/4 clusters trained — others rejected`,
      },
      trained: {
        bg: 'bg-green-500/20 ring-green-400/50 text-green-100',
        dot: 'bg-green-400',
        label: '✓ TRAINED — frozen',
        sub: '4 clusters locked · weight permanent',
      },
      inference: {
        bg: 'bg-blue-500/15 ring-blue-400/40 text-blue-200',
        dot: 'bg-blue-400',
        label: 'INFERENCE',
        sub: 'STDP off · cluster mean readout',
      },
    };
    const c = config[phase];
    return { phaseBg: c.bg, phaseDot: c.dot, phaseLabel: c.label, phaseSubtitle: c.sub };
  }, [phaseDetail]);

  if (!phaseDetail && !status) return null;

  const phase: Phase = phaseDetail?.phase ?? 'untrained';
  const showProgress = phase === 'untrained' || phase === 'learning' || phase === 'partial';
  const showInferenceWinner = phase === 'inference' || phase === 'trained';

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-1.5 font-mono text-[11px]">
      {/* Teacher badge — MediaPipe gesture 사실 1:1 */}
      {teacher && (phase !== 'inference' && phase !== 'trained') && (
        <div className={`pointer-events-auto rounded ring-1 px-2.5 py-1.5 ${teacherBg} min-w-[200px]`}>
          <div className="font-semibold tracking-wider">{teacherLabel}</div>
          {stableSupervised && (
            <div className="mt-0.5 text-[10px] tabular-nums opacity-80">
              conf {(teacher!.gestureScore * 100).toFixed(0)}% — batch supervised inject
            </div>
          )}
          {stabilizing && (
            <div className="mt-0.5 text-[10px] tabular-nums opacity-70">
              conf {(teacher!.gestureScore * 100).toFixed(0)}% — N=5 합의 대기
            </div>
          )}
        </div>
      )}

      {/* Phase badge — 5-state 사실 1:1 */}
      <div className={`pointer-events-auto rounded ring-1 px-2.5 py-1.5 ${phaseBg} min-w-[200px]`}>
        <div className="flex items-center gap-1.5 font-semibold tracking-wider">
          <span className={`h-2 w-2 rounded-full ${phaseDot}`} />
          {phaseLabel}
        </div>
        <div className="mt-0.5 text-[10px] opacity-75">{phaseSubtitle}</div>

        {/* Progress bars — untrained / learning / partial 영역만 표시.
            CSS class .snn-mode-progress-fill (--w 영역 동적 width) — inline style 회피. */}
        {showProgress && phaseDetail && (
          <div className="mt-1.5 flex flex-col gap-0.5">
            {[0, 1, 2, 3].map((i) => {
              const count = phaseDetail.clusterFrames[i as 0|1|2|3];
              const done = count >= CLUSTER_TARGET;
              return (
                <ClusterProgressRow
                  key={i}
                  label={CLUSTER_LABELS[i]}
                  count={count}
                  done={done}
                />
              );
            })}
          </div>
        )}

        {/* Inference winner — trained / inference 영역만 표시 */}
        {showInferenceWinner && status && (
          <div className="mt-1 text-[10px] tabular-nums opacity-90">
            {status.winner
              ? `winner: ${status.winner} (margin ${(status.winnerMargin * 100).toFixed(0)}%, ${status.winnerRate.toFixed(0)}Hz)`
              : 'WTA tie — no winner detected'}
          </div>
        )}

        {/* learning Δw 사실 — learning / partial 영역만 표시 */}
        {(phase === 'learning' || phase === 'partial') && status && status.changedSyn > 0 && (
          <div className="mt-1 text-[10px] tabular-nums opacity-70">
            Δw +{status.ltpSum.toFixed(2)} / {status.ltdSum.toFixed(2)} · {status.changedSyn} syn
          </div>
        )}
      </div>

      {/* Saturation 경고 — 사실 catch */}
      {status?.outAllSaturated && (
        <div className="pointer-events-auto rounded ring-1 px-2.5 py-1.5 bg-orange-500/15 ring-orange-400/40 text-orange-200 min-w-[200px]">
          <div className="font-semibold tracking-wider">⚠ SATURATION</div>
          <div className="mt-0.5 text-[10px] opacity-80">
            모든 OUT ≥ {SATURATION_HZ}Hz — selectivity 0 사실
          </div>
        </div>
      )}
    </div>
  );
}
