'use client';

import { useState } from 'react';
import { getClient } from '@/lib/backend/client';

interface PredictionPanelProps {
  open: boolean;
  onClose: () => void;
}

const GESTURES = [
  { id: 'pointing', label: 'Pointing',  out: 'out_0' },
  { id: 'openpalm', label: 'Open palm', out: 'out_1' },
  { id: 'thumbsup', label: 'Thumbs up', out: 'out_2' },
  { id: 'victory',  label: 'Victory',   out: 'out_3' },
];

const OUT_LABELS: Record<string, string> = {
  out_0: 'Pointing',
  out_1: 'Open palm',
  out_2: 'Thumbs up',
  out_3: 'Victory',
};

interface PredictionResult {
  gesture: string;
  expectedOut: string;
  winner: string | null;
  winnerRate: number;
  outRates: Record<string, number>;
  correct: boolean;
  confidence: number;
}

export default function PredictionPanel({ open, onClose }: PredictionPanelProps) {
  const [selected, setSelected] = useState('pointing');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string>('');

  if (!open) return null;

  const onPredict = async () => {
    setBusy(true);
    setError('');
    const r = await getClient().predict(selected);
    setBusy(false);
    if (!r.ok) {
      setError(r.reason);
      setResult(null);
      return;
    }
    setResult(r.data);
  };

  const maxRate = result
    ? Math.max(1, ...Object.values(result.outRates))
    : 1;

  return (
    <div
      className="absolute right-0 top-0 z-30 h-full w-[360px] max-w-[90vw] overflow-y-auto border-l border-white/10 bg-[#0f1117]/95 p-4 shadow-2xl"
      role="dialog"
      aria-label="Prediction panel"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-violet-300">✨ PREDICT</span>
        <button
          type="button"
          aria-label="Close prediction"
          onClick={onClose}
          className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="mb-3">
        <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/50">
          Input gesture
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {GESTURES.map((g) => (
            <label
              key={g.id}
              className={
                `flex items-center gap-2 rounded border px-2.5 py-1.5 text-[11px] cursor-pointer transition-colors ` +
                (selected === g.id
                  ? 'border-violet-400/60 bg-violet-500/15 text-violet-200'
                  : 'border-white/10 bg-white/5 text-white/80 hover:border-violet-400/40')
              }
            >
              <input
                type="radio"
                name="predict-gesture"
                value={g.id}
                checked={selected === g.id}
                onChange={() => setSelected(g.id)}
                disabled={busy}
                className="h-3 w-3 accent-violet-400"
              />
              {g.label}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onPredict}
        disabled={busy}
        className="mb-3 w-full rounded bg-violet-500/20 px-3 py-1.5 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 disabled:opacity-50"
      >
        {busy ? 'Predicting…' : '✨ Predict'}
      </button>

      {error && (
        <div className="mb-3 rounded border border-rose-400/30 bg-rose-500/10 px-2.5 py-1.5 text-[11px] text-rose-200">
          ✗ {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div
            className={
              `rounded border px-3 py-2 ` +
              (result.correct
                ? 'border-emerald-400/40 bg-emerald-500/10'
                : 'border-rose-400/40 bg-rose-500/10')
            }
          >
            <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/60">
              <span>Prediction</span>
              <span>{result.correct ? '✓ correct' : '✗ wrong'}</span>
            </div>
            <div className="font-mono text-sm text-white">
              {result.winner
                ? `${OUT_LABELS[result.winner] || result.winner} (${result.winnerRate.toFixed(1)} Hz)`
                : '— no winner —'}
            </div>
            <div className="mt-1 text-[11px] text-white/50">
              expected: {OUT_LABELS[result.expectedOut] || result.expectedOut} · confidence:{' '}
              {(result.confidence * 100).toFixed(0)}%
            </div>
          </div>

          <div>
            <div className="mb-1.5 text-[10px] uppercase tracking-wider text-white/50">
              OUT rates
            </div>
            <div className="space-y-1.5">
              {Object.entries(result.outRates)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => {
                  const isWinner = k === result.winner;
                  const isExpected = k === result.expectedOut;
                  const pct = (v / maxRate) * 100;
                  return (
                    <div key={k} className="font-mono text-[11px]">
                      <div className="mb-0.5 flex justify-between">
                        <span className={isWinner ? 'text-violet-200' : 'text-white/60'}>
                          {OUT_LABELS[k] || k}
                          {isExpected && <span className="ml-1 text-emerald-300">★</span>}
                        </span>
                        <span className="text-white/70">{v.toFixed(1)} Hz</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded bg-white/5">
                        <div
                          className={isWinner ? 'h-full bg-violet-400' : 'h-full bg-white/30'}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="text-[10px] text-white/40">
            ★ = 정답 / 보라색 = 모델 예측 winner. Train 을 더 많이 돌릴수록 정확도 ↑.
          </div>
        </div>
      )}
    </div>
  );
}
