'use client';

// ModeIndicator — 회로의 학습 / 추론 / idle 모드를 backend 응답 사실 1:1 로 표시.
//
// 거짓 표시 회피 원칙 (사용자 명시):
//  - 모드는 "STDP weight 변화 detected" / "out fire only" / "no fire" 사실로만 분기
//  - winner 는 out_rates max 가 두 번째보다 >=10% margin 일 때만 표시. tie 면 "WTA tie" 명시
//  - saturation 사실 (모든 OUT >= 400Hz) 은 별도 경고 표시 → selectivity 0 사실 노출
//  - 학습 모드인데 Δw 0 → "no Δw detected" 명시

import { useEffect, useRef, useState } from 'react';
import { onBackendEvent, type NeuronFiringDetail, type HandFeatureDetail } from '@/lib/backend/events';

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
const TEACHER_CONF_MIN = 0.6;

export default function ModeIndicator() {
  const [status, setStatus] = useState<ModeStatus | null>(null);
  const [teacher, setTeacher] = useState<TeacherStatus | null>(null);
  // pre->post 별 직전 weight 보관. Δw 계산 = current - prev.
  const prevWeights = useRef<Map<string, number>>(new Map());
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // MediaPipe gesture (teacher signal) subscribe.
  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      setTeacher({
        gestureName: d.gestureName ?? null,
        gestureScore: d.gestureScore ?? 0,
        hasHand: d.hasHand,
      });
    });
    return off;
  }, []);

  useEffect(() => {
    const off = onBackendEvent<NeuronFiringDetail>('neuron-firing', (d) => {
      const syn = d.synapses || [];
      const outRates = d.out_rates || {};

      // Δw 계산 (이전 cache 와 비교) — 실제 backend 사실.
      let ltpSum = 0;
      let ltdSum = 0;
      let changedSyn = 0;
      for (const s of syn) {
        const key = `${s.pre}->${s.post}`;
        const prev = prevWeights.current.get(key);
        if (prev !== undefined) {
          const dw = s.weight - prev;
          if (Math.abs(dw) >= DW_EPSILON) {
            changedSyn += 1;
            if (dw > 0) ltpSum += dw;
            else ltdSum += dw;
          }
        }
        prevWeights.current.set(key, s.weight);
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

  if (!status) return null;

  const modeBg =
    status.mode === 'learning' ? 'bg-green-500/15 ring-green-400/40 text-green-200'
    : status.mode === 'inference' ? 'bg-blue-500/15 ring-blue-400/40 text-blue-200'
    : 'bg-white/5 ring-white/15 text-white/50';
  const modeDot =
    status.mode === 'learning' ? 'bg-green-400' :
    status.mode === 'inference' ? 'bg-blue-400' :
    'bg-white/30';
  const modeLabel =
    status.mode === 'learning' ? 'LEARNING'
    : status.mode === 'inference' ? 'INFERENCE'
    : 'IDLE';

  // Teacher badge 사실 — MediaPipe GestureRecognizer 라벨 + confidence 1:1.
  const supervised = !!teacher && teacher.hasHand
    && teacher.gestureName !== null && teacher.gestureName !== 'None'
    && teacher.gestureScore >= TEACHER_CONF_MIN;
  const teacherBg = supervised
    ? 'bg-amber-500/15 ring-amber-400/40 text-amber-200'
    : 'bg-white/5 ring-white/15 text-white/40';
  const teacherLabel = supervised
    ? `teacher: ${teacher!.gestureName}`
    : (teacher?.hasHand
        ? `teacher: ${teacher.gestureName ?? 'none'} (${(teacher.gestureScore * 100).toFixed(0)}%, < ${(TEACHER_CONF_MIN * 100).toFixed(0)}% — unsupervised)`
        : 'teacher: no hand');

  return (
    <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-1.5 font-mono text-[11px]">
      {/* Teacher badge — MediaPipe gesture 사실 1:1 */}
      {teacher && (
        <div className={`pointer-events-auto rounded ring-1 px-2.5 py-1.5 ${teacherBg} min-w-[180px]`}>
          <div className="font-semibold tracking-wider">{teacherLabel}</div>
          {supervised && (
            <div className="mt-0.5 text-[10px] tabular-nums opacity-80">
              conf {(teacher!.gestureScore * 100).toFixed(0)}% — supervised STDP
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
    </div>
  );
}
