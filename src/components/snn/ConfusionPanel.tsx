'use client';

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { onBackendEvent, type HandFeatureDetail } from '@/lib/backend/events';
import { featuresToInputs } from '@/lib/mediapipe/input-mapper';
import { HAND_GESTURES } from '@/lib/snn/use-hand-control';

interface Props {
  open: boolean;
  cameraConnected: boolean;
  onClose: () => void;
}

const SAMPLES_PER = 5;
const SAMPLE_INTERVAL_MS = 200;
const COUNTDOWN_MS = 2500;

const OUT_LABELS = ['Pointing', 'Open palm', 'Thumbs up', 'Victory'];
const OUT_KEYS = ['out_0', 'out_1', 'out_2', 'out_3'] as const;

interface Phase {
  kind: 'idle' | 'countdown' | 'capture' | 'done';
  gestureIdx?: number;     // 0..3
  countdown?: number;       // 3..1
  captured?: number;        // 0..SAMPLES_PER
}

// matrix[true][pred] = count.
type Matrix = number[][];

export default function ConfusionPanel({ open, cameraConnected, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: 'idle' });
  const [matrix, setMatrix] = useState<Matrix>(() => emptyMatrix());
  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      featRef.current = d.feature;
      hasHandRef.current = d.hasHand;
    });
    return off;
  }, []);

  // 패널 닫힐 때 진행 중 작업 취소.
  useEffect(() => {
    if (!open) cancelRef.current = true;
  }, [open]);

  if (!open) return null;

  const total = matrix.flat().reduce((s, v) => s + v, 0);
  const correctCount = matrix.reduce((s, row, i) => s + row[i], 0);
  const accuracy = total > 0 ? correctCount / total : 0;

  const start = async () => {
    cancelRef.current = false;
    setMatrix(emptyMatrix());
    for (let g = 0; g < HAND_GESTURES.length; g += 1) {
      if (cancelRef.current) break;
      // 카운트다운.
      const startT = performance.now();
      while (performance.now() - startT < COUNTDOWN_MS) {
        if (cancelRef.current) return;
        const remain = Math.ceil((COUNTDOWN_MS - (performance.now() - startT)) / 1000);
        setPhase({ kind: 'countdown', gestureIdx: g, countdown: remain });
        await new Promise((r) => setTimeout(r, 100));
      }
      // SAMPLES_PER frame 캡처.
      for (let s = 0; s < SAMPLES_PER; s += 1) {
        if (cancelRef.current) return;
        // hasHand 확인.
        let waited = 0;
        while (!hasHandRef.current || !featRef.current) {
          if (cancelRef.current) return;
          if (waited > 2000) break;
          await new Promise((r) => setTimeout(r, 50));
          waited += 50;
        }
        if (!hasHandRef.current || !featRef.current) {
          setPhase({ kind: 'capture', gestureIdx: g, captured: s });
          await new Promise((r) => setTimeout(r, SAMPLE_INTERVAL_MS));
          continue;
        }
        setPhase({ kind: 'capture', gestureIdx: g, captured: s + 1 });
        const pattern = featuresToInputs(featRef.current);
        const r = await getClient().injectPattern(pattern, { stdp: false });
        if (r.ok) {
          const rates = r.data.out_rates || {};
          let pred = 0; let max = 0;
          OUT_KEYS.forEach((k, idx) => {
            const v = (rates as Record<string, number>)[k] || 0;
            if (v > max) { max = v; pred = idx; }
          });
          setMatrix((m) => {
            const nm = m.map((row) => row.slice());
            nm[g][pred] = (nm[g][pred] || 0) + 1;
            return nm;
          });
        }
        await new Promise((r) => setTimeout(r, SAMPLE_INTERVAL_MS));
      }
    }
    setPhase({ kind: 'done' });
  };

  const cancel = () => { cancelRef.current = true; setPhase({ kind: 'idle' }); };

  const inProgress = phase.kind === 'countdown' || phase.kind === 'capture';
  const currentGestureLabel = phase.gestureIdx !== undefined ? HAND_GESTURES[phase.gestureIdx].label : '';

  return (
    <div
      className="absolute right-0 top-0 z-30 h-full w-[420px] max-w-[90vw] overflow-y-auto border-l border-white/10 bg-[#0f1117]/95 p-4 shadow-2xl"
      role="dialog"
      aria-label="Confusion matrix panel"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-violet-300">📊 CONFUSION MATRIX</span>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
        >✕</button>
      </div>

      {!cameraConnected && (
        <div className="mb-3 rounded border border-amber-400/30 bg-amber-500/10 px-2.5 py-1.5 text-[11px] text-amber-200">
          카메라가 꺼져있습니다 (사이드바 📷)
        </div>
      )}

      <div className="mb-3">
        <div className="mb-2 text-[10px] uppercase tracking-wider text-white/50">
          Test plan — 4 gestures × {SAMPLES_PER} samples
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {HAND_GESTURES.map((g, i) => (
            <div
              key={g.id}
              className={
                'rounded border px-2.5 py-1.5 text-[11px] ' +
                (inProgress && phase.gestureIdx === i
                  ? 'border-violet-400/60 bg-violet-500/15 text-violet-200'
                  : 'border-white/10 bg-white/5 text-white/70')
              }
            >
              {i + 1}. {g.label}
            </div>
          ))}
        </div>
      </div>

      {/* 진행 상태 */}
      {phase.kind === 'countdown' && (
        <div className="mb-3 rounded border border-violet-400/40 bg-violet-500/10 px-3 py-2 text-center font-mono">
          <div className="text-[10px] uppercase tracking-wider text-violet-200">
            {currentGestureLabel} 자세 준비
          </div>
          <div className="text-2xl font-bold text-white">{phase.countdown}</div>
        </div>
      )}
      {phase.kind === 'capture' && (
        <div className="mb-3 rounded border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-center font-mono">
          <div className="text-[10px] uppercase tracking-wider text-emerald-200">
            {currentGestureLabel} 캡처 중
          </div>
          <div className="text-sm text-white">{phase.captured}/{SAMPLES_PER}</div>
        </div>
      )}

      <div className="mb-3 flex gap-2">
        {!inProgress && (
          <button
            type="button"
            disabled={!cameraConnected}
            onClick={start}
            className="flex-1 rounded bg-violet-500/20 px-3 py-1.5 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 disabled:opacity-40"
          >
            {phase.kind === 'done' ? '🔄 Re-run' : '▶ Start test'}
          </button>
        )}
        {inProgress && (
          <button
            type="button"
            onClick={cancel}
            className="flex-1 rounded bg-rose-500/20 px-3 py-1.5 text-xs text-rose-200 ring-1 ring-rose-400/40 hover:bg-rose-500/30"
          >
            ⏹ Cancel
          </button>
        )}
      </div>

      {/* Matrix */}
      {total > 0 && (
        <>
          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-white/50">Confusion matrix</span>
              <span className="font-mono text-[11px] text-emerald-300">
                {correctCount}/{total} = {(accuracy * 100).toFixed(0)}%
              </span>
            </div>
            <table className="w-full font-mono text-[10px]">
              <thead>
                <tr>
                  <th className="p-1 text-left text-white/40">true ↓ / pred →</th>
                  {OUT_LABELS.map((l) => (
                    <th key={l} className="p-1 text-center text-white/60">{l.slice(0, 4)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, i) => {
                  const rowSum = row.reduce((s, v) => s + v, 0);
                  return (
                    <tr key={i}>
                      <td className="p-1 text-white/70">{OUT_LABELS[i]}</td>
                      {row.map((v, j) => {
                        const isDiag = i === j;
                        const intensity = rowSum > 0 ? v / rowSum : 0;
                        return (
                          <td
                            key={j}
                            className={
                              'p-1 text-center ' +
                              (isDiag
                                ? (intensity >= 0.6 ? 'bg-emerald-500/30 text-emerald-100' : intensity > 0 ? 'bg-emerald-500/15 text-emerald-200' : 'bg-emerald-500/5 text-white/40')
                                : (intensity > 0 ? 'bg-rose-500/15 text-rose-200' : 'text-white/30'))
                            }
                          >
                            {v}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* per-class accuracy */}
          <div className="space-y-1 font-mono text-[10px]">
            <div className="mb-1 text-[10px] uppercase tracking-wider text-white/50">Per-class accuracy</div>
            {matrix.map((row, i) => {
              const rowSum = row.reduce((s, v) => s + v, 0);
              const acc = rowSum > 0 ? row[i] / rowSum : 0;
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-20 text-white/60">{OUT_LABELS[i]}</span>
                  <span className="w-12 text-white/80">{row[i]}/{rowSum}</span>
                  <span className={acc >= 0.8 ? 'text-emerald-300' : acc >= 0.5 ? 'text-amber-300' : 'text-rose-300'}>
                    {(acc * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-3 text-[10px] text-white/40">
        💡 Start 클릭 → 각 gesture 마다 2.5초 카운트다운 후 5 sample 캡처 (200ms 간격).
        대각선 = 정답, 비대각선 = 혼동.
      </div>
    </div>
  );
}

function emptyMatrix(): Matrix {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
}
