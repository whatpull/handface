'use client';

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { onBackendEvent, type HandFeatureDetail } from '@/lib/backend/events';
import { featuresToInputs } from '@/lib/mediapipe/input-mapper';
import { loadTrainCounts, subscribeTrainCounts, incrementTrainCount, type TrainCounts } from '@/lib/snn/train-counts';

interface PredictPanelProps {
  open: boolean;
  cameraConnected: boolean;
  onClose: () => void;
}

const GESTURES = [
  { id: 'pointing', label: 'Pointing',  out: 'out_0' },
  { id: 'openpalm', label: 'Open palm', out: 'out_1' },
  { id: 'thumbsup', label: 'Thumbs up', out: 'out_2' },
  { id: 'victory',  label: 'Victory',   out: 'out_3' },
];

const OUT_LABELS: Record<string, string> = {
  out_0: 'Pointing', out_1: 'Open palm', out_2: 'Thumbs up', out_3: 'Victory',
};

const TRAIN_FRAMES = 30;
const TRAIN_INTERVAL_MS = 80;
const PREDICT_INTERVAL_MS = 600;

interface PredictResult {
  winner: string | null;
  rates: Record<string, number>;
  confidence: number;
  expectedOut?: string;   // synthetic 모드에서만 set
}

export default function PredictPanel({ open, cameraConnected, onClose }: PredictPanelProps) {
  const [mode, setMode] = useState<'synthetic' | 'camera'>('synthetic');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<PredictResult | null>(null);

  // synthetic 모드 — 4 gesture 라디오 선택.
  const [selected, setSelected] = useState('pointing');

  // camera 모드 — hand 상태 + train + live.
  const [hasHand, setHasHand] = useState(false);
  const [trainStatus, setTrainStatus] = useState<string>('');
  const [livePredict, setLivePredict] = useState(false);
  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);
  const [trainCounts, setTrainCounts] = useState<TrainCounts>(() => loadTrainCounts());
  useEffect(() => subscribeTrainCounts(setTrainCounts), []);

  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      featRef.current = d.feature;
      hasHandRef.current = d.hasHand;
      setHasHand(d.hasHand);
    });
    return off;
  }, []);

  // synthetic predict — 단일 inject (induce_fire 흐름은 client.predict).
  const onSyntheticPredict = async () => {
    if (busy) return;
    setBusy('synthetic');
    setError('');
    const r = await getClient().predict(selected);
    setBusy(null);
    if (!r.ok) {
      setError(r.reason);
      setResult(null);
      return;
    }
    setResult({
      winner: r.data.winner,
      rates: r.data.outRates,
      confidence: r.data.confidence,
      expectedOut: r.data.expectedOut,
    });
  };

  // camera train — N frame 캡처 → supervised STDP.
  const trainAs = async (gestureId: string, targetOut: string, label: string) => {
    if (busy || !cameraConnected) return;
    setBusy(gestureId);
    setTrainStatus(`${label} 학습 시작 — 손 자세 유지`);
    const patterns: number[][] = [];
    for (let i = 0; i < TRAIN_FRAMES; i += 1) {
      let waited = 0;
      while (!hasHandRef.current || !featRef.current) {
        if (waited > 3000) break;
        await new Promise((r) => setTimeout(r, 50));
        waited += 50;
      }
      if (!hasHandRef.current || !featRef.current) {
        setTrainStatus(`✗ ${label}: 손 미감지 (${i}/${TRAIN_FRAMES})`);
        break;
      }
      patterns.push(featuresToInputs(featRef.current));
      setTrainStatus(`${label} 캡처 ${i + 1}/${TRAIN_FRAMES}…`);
      await new Promise((r) => setTimeout(r, TRAIN_INTERVAL_MS));
    }
    if (patterns.length === 0) { setBusy(null); return; }
    setTrainStatus(`${label} 학습 진행 ${patterns.length} 패턴…`);
    const r = await getClient().trainHandGesture(patterns, targetOut, (done, total) => {
      setTrainStatus(`${label} 학습 ${done}/${total}…`);
    });
    if (r.ok) {
      incrementTrainCount(gestureId);
      setTrainStatus(`✓ ${label} 학습 완료 (${r.data.trained} 패턴)`);
    } else {
      setTrainStatus(`✗ ${label}: ${r.reason}`);
    }
    setBusy(null);
  };

  // camera live predict — 600ms 주기 inject_pattern.
  useEffect(() => {
    if (mode !== 'camera' || !livePredict || !cameraConnected) return;
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      if (hasHandRef.current && featRef.current) {
        const pattern = featuresToInputs(featRef.current);
        const r = await getClient().injectPattern(pattern, { stdp: false });
        if (cancelled) return;
        if (r.ok) {
          const rates = (r.data.out_rates || {}) as Record<string, number>;
          let winner: string | null = null;
          let max = 0;
          let total = 0;
          for (const [k, v] of Object.entries(rates)) {
            total += v;
            if (v > max) { max = v; winner = k; }
          }
          setResult({ winner, rates, confidence: total > 0 ? max / total : 0 });
        }
      } else {
        setResult(null);
      }
      if (!cancelled) setTimeout(tick, PREDICT_INTERVAL_MS);
    };
    tick();
    return () => { cancelled = true; };
  }, [mode, livePredict, cameraConnected]);

  // 모드 전환 시 result/state 초기화.
  useEffect(() => {
    setResult(null);
    setError('');
    setTrainStatus('');
    setLivePredict(false);
  }, [mode]);

  if (!open) return null;

  const cameraHint = !cameraConnected
    ? '카메라를 켜주세요 (사이드바 📷)'
    : !hasHand ? '손을 카메라에 보여주세요' : '';

  return (
    <div
      className="absolute right-0 top-0 z-30 h-full w-[360px] max-w-[90vw] overflow-y-auto border-l border-white/10 bg-[#0f1117]/95 p-4 shadow-2xl"
      role="dialog"
      aria-label="Predict panel"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-violet-300">✨ PREDICT</span>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
        >✕</button>
      </div>

      {/* 모드 토글 */}
      <div className="mb-3 grid grid-cols-2 gap-1 rounded border border-white/10 bg-black/20 p-0.5">
        <button
          type="button"
          onClick={() => setMode('synthetic')}
          className={
            'rounded px-2 py-1.5 text-[11px] transition-colors ' +
            (mode === 'synthetic' ? 'bg-violet-500/25 text-violet-200' : 'text-white/60 hover:bg-white/5')
          }
        >🎲 Synthetic</button>
        <button
          type="button"
          onClick={() => setMode('camera')}
          className={
            'rounded px-2 py-1.5 text-[11px] transition-colors ' +
            (mode === 'camera' ? 'bg-violet-500/25 text-violet-200' : 'text-white/60 hover:bg-white/5')
          }
        >✋ Camera</button>
      </div>

      {/* === Synthetic 모드 === */}
      {mode === 'synthetic' && (
        <>
          <div className="mb-3">
            <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/50">
              Input gesture
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {GESTURES.map((g) => (
                <label
                  key={g.id}
                  className={
                    'flex items-center gap-2 rounded border px-2.5 py-1.5 text-[11px] cursor-pointer transition-colors ' +
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
                    disabled={!!busy}
                    className="h-3 w-3 accent-violet-400"
                  />
                  {g.label}
                </label>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onSyntheticPredict}
            disabled={!!busy}
            className="mb-3 w-full rounded bg-violet-500/20 px-3 py-1.5 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/30 disabled:opacity-50"
          >
            {busy === 'synthetic' ? 'Predicting…' : '✨ Predict'}
          </button>
          {error && (
            <div className="mb-3 rounded border border-rose-400/30 bg-rose-500/10 px-2.5 py-1.5 text-[11px] text-rose-200">
              ✗ {error}
            </div>
          )}
        </>
      )}

      {/* === Camera 모드 === */}
      {mode === 'camera' && (
        <>
          <div className="mb-3 flex items-center gap-2 rounded border border-white/10 bg-black/20 px-2.5 py-1.5 font-mono text-[11px]">
            <span className={`h-2 w-2 rounded-full ${hasHand ? 'bg-emerald-400' : 'bg-white/20'}`} />
            <span className="text-white/70">
              {!cameraConnected ? 'camera off' : hasHand ? 'hand detected' : 'no hand'}
            </span>
          </div>
          <div className="mb-3">
            <div className="mb-2 text-[10px] uppercase tracking-wider text-white/50">Train as</div>
            <div className="grid grid-cols-2 gap-1.5">
              {GESTURES.map((g) => {
                const n = trainCounts[g.id] || 0;
                return (
                  <button
                    key={g.id}
                    type="button"
                    disabled={!cameraConnected || !hasHand || !!busy}
                    onClick={() => trainAs(g.id, g.out, g.label)}
                    className={
                      'flex items-center justify-between gap-2 rounded border px-2.5 py-2 text-[11px] transition-colors disabled:opacity-40 ' +
                      (n > 0
                        ? 'border-emerald-400/30 bg-emerald-500/5 text-emerald-100 hover:border-emerald-400/60 hover:bg-emerald-500/15'
                        : 'border-white/10 bg-white/5 text-white/80 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200')
                    }
                  >
                    <span>{busy === g.id ? '⏳ ' : '🎯 '}{g.label}</span>
                    {n > 0 && <span className="font-mono text-[10px] text-emerald-300">✓×{n}</span>}
                  </button>
                );
              })}
            </div>
            {cameraHint && <div className="mt-2 text-[10px] text-white/40">{cameraHint}</div>}
            {trainStatus && (
              <div className="mt-2 rounded bg-black/30 px-2 py-1 font-mono text-[10px] text-white/70">
                {trainStatus}
              </div>
            )}
          </div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/50">Live predict</span>
            <button
              type="button"
              disabled={!cameraConnected}
              onClick={() => setLivePredict((v) => !v)}
              className={
                'rounded px-2 py-0.5 text-[11px] ring-1 transition-colors disabled:opacity-40 ' +
                (livePredict
                  ? 'bg-emerald-500/20 text-emerald-200 ring-emerald-400/40'
                  : 'bg-white/5 text-white/70 ring-white/10 hover:bg-white/10')
              }
            >
              {livePredict ? '● ON' : 'OFF'}
            </button>
          </div>
        </>
      )}

      {/* === 공통 결과 카드 === */}
      {result && result.winner && (
        <div
          className={
            'rounded border px-3 py-2 ' +
            (mode === 'synthetic' && result.expectedOut
              ? (result.winner === result.expectedOut
                  ? 'border-emerald-400/40 bg-emerald-500/10'
                  : 'border-rose-400/40 bg-rose-500/10')
              : 'border-violet-400/30 bg-violet-500/10')
          }
        >
          <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/60">
            <span>Prediction</span>
            {mode === 'synthetic' && result.expectedOut && (
              <span>{result.winner === result.expectedOut ? '✓ correct' : '✗ wrong'}</span>
            )}
          </div>
          <div className="font-mono text-sm text-white">
            {OUT_LABELS[result.winner] || result.winner}
          </div>
          <div className="mb-2 text-[11px] text-white/50">
            {mode === 'synthetic' && result.expectedOut
              ? `expected: ${OUT_LABELS[result.expectedOut] || result.expectedOut} · `
              : ''}
            confidence: {(result.confidence * 100).toFixed(0)}%
          </div>
          <OutRatesBars rates={result.rates} winner={result.winner} expectedOut={result.expectedOut} />
        </div>
      )}

      {mode === 'camera' && livePredict && (!result || !result.winner) && (
        <div className="rounded bg-black/20 px-3 py-2 font-mono text-[11px] text-white/50">
          손을 보여주세요
        </div>
      )}

      <div className="mt-3 text-[10px] text-white/40">
        {mode === 'synthetic'
          ? '🎲 Gesture 선택 → Predict → SNN winner + 정답 비교 (단일 호출).'
          : '✋ Train as X → 30 frame 자동 학습. Live predict → 매 0.6s SNN 추론.'}
      </div>
    </div>
  );
}

// 4 OUT rates 막대 — width 동적 갱신을 ref 로 imperatively 설정 (inline style 회피).
function OutRatesBars({
  rates, winner, expectedOut,
}: { rates: Record<string, number>; winner: string | null; expectedOut?: string }) {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const max = Math.max(1, ...Object.values(rates));
  useEffect(() => {
    for (const k of ['out_0', 'out_1', 'out_2', 'out_3']) {
      const el = refs.current[k];
      if (el) el.style.width = `${((rates[k] || 0) / max) * 100}%`;
    }
  }, [rates, max]);
  return (
    <div className="space-y-1">
      {(['out_0', 'out_1', 'out_2', 'out_3'] as const).map((k) => {
        const v = rates[k] || 0;
        const isWinner = k === winner;
        const isExpected = k === expectedOut;
        return (
          <div key={k} className="text-[10px]">
            <div className="flex justify-between">
              <span className={isWinner ? 'text-violet-200' : 'text-white/50'}>
                {OUT_LABELS[k]}{isExpected && <span className="ml-1 text-emerald-300">★</span>}
              </span>
              <span className="text-white/60">{v.toFixed(1)} Hz</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded bg-white/5">
              <div
                ref={(el) => { refs.current[k] = el; }}
                className={isWinner ? 'h-full bg-violet-400' : 'h-full bg-white/25'}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
