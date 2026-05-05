'use client';

import { useEffect, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { onBackendEvent, type HandFeatureDetail } from '@/lib/backend/events';
import { featuresToInputs } from '@/lib/mediapipe/input-mapper';

interface HandPanelProps {
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

const TRAIN_FRAMES = 30;     // 1 gesture 당 학습 frame 수
const TRAIN_INTERVAL_MS = 80;  // 캡처 간격 (~12.5 fps)
const PREDICT_INTERVAL_MS = 600; // live predict 호출 주기

export default function HandPanel({ open, cameraConnected, onClose }: HandPanelProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const [hasHand, setHasHand] = useState(false);
  const [trainStatus, setTrainStatus] = useState<string>('');
  const [livePredict, setLivePredict] = useState(false);
  const [predictResult, setPredictResult] = useState<{ winner: string | null; conf: number; rates: Record<string, number> } | null>(null);

  // 최신 feature 보관 (이벤트 리스너 → ref).
  const featRef = useRef<number[] | null>(null);
  const hasHandRef = useRef(false);

  useEffect(() => {
    const off = onBackendEvent<HandFeatureDetail>('hand-feature', (d) => {
      featRef.current = d.feature;
      hasHandRef.current = d.hasHand;
      setHasHand(d.hasHand);
    });
    return off;
  }, []);

  // Train as X — TRAIN_FRAMES 만큼 frame 캡처 → 각 frame 의 8-dim INPUT 으로 supervised 학습.
  const trainAs = async (gestureId: string, targetOut: string, label: string) => {
    if (busy || !cameraConnected) return;
    setBusy(gestureId);
    setTrainStatus(`${label} 학습 시작 — 손 자세를 유지하세요`);

    // TRAIN_FRAMES 만큼 캡처.
    const patterns: number[][] = [];
    for (let i = 0; i < TRAIN_FRAMES; i += 1) {
      // hand 감지 안 되면 skip (재시도).
      let waited = 0;
      while (!hasHandRef.current || !featRef.current) {
        if (waited > 3000) break;
        await new Promise((r) => setTimeout(r, 50));
        waited += 50;
      }
      if (!hasHandRef.current || !featRef.current) {
        setTrainStatus(`✗ ${label}: 손 미감지 (${i}/${TRAIN_FRAMES} 수집됨)`);
        break;
      }
      patterns.push(featuresToInputs(featRef.current));
      setTrainStatus(`${label} 캡처 ${i + 1}/${TRAIN_FRAMES}…`);
      await new Promise((r) => setTimeout(r, TRAIN_INTERVAL_MS));
    }
    if (patterns.length === 0) {
      setBusy(null);
      return;
    }
    setTrainStatus(`${label} 학습 진행 ${patterns.length} 패턴…`);
    const r = await getClient().trainHandGesture(patterns, targetOut, (done, total) => {
      setTrainStatus(`${label} 학습 ${done}/${total}…`);
    });
    setTrainStatus(r.ok ? `✓ ${label} 학습 완료 (${r.data.trained} 패턴)` : `✗ ${label}: ${r.reason}`);
    setBusy(null);
  };

  // Live predict — PREDICT_INTERVAL_MS 주기로 inject_pattern (stdp=false) → winner 갱신.
  useEffect(() => {
    if (!livePredict || !cameraConnected) return;
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
          setPredictResult({ winner, conf: total > 0 ? max / total : 0, rates });
        }
      } else {
        setPredictResult(null);
      }
      if (!cancelled) setTimeout(tick, PREDICT_INTERVAL_MS);
    };
    tick();
    return () => { cancelled = true; };
  }, [livePredict, cameraConnected]);

  if (!open) return null;
  const noHandHint = !cameraConnected
    ? '카메라를 켜주세요 (사이드바 📷)'
    : !hasHand ? '손을 카메라에 보여주세요' : '';

  return (
    <div
      className="absolute right-0 top-0 z-30 h-full w-[360px] max-w-[90vw] overflow-y-auto border-l border-white/10 bg-[#0f1117]/95 p-4 shadow-2xl"
      role="dialog"
      aria-label="Hand training panel"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-violet-300">✋ HAND</span>
        <button
          type="button"
          aria-label="Close hand panel"
          onClick={onClose}
          className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white"
        >✕</button>
      </div>

      <div className="mb-3 flex items-center gap-2 rounded border border-white/10 bg-black/20 px-2.5 py-1.5 font-mono text-[11px]">
        <span className={`h-2 w-2 rounded-full ${hasHand ? 'bg-emerald-400' : 'bg-white/20'}`} />
        <span className="text-white/70">
          {!cameraConnected ? 'camera off' : hasHand ? 'hand detected' : 'no hand'}
        </span>
      </div>

      <div className="mb-3">
        <div className="mb-2 text-[10px] uppercase tracking-wider text-white/50">Train as</div>
        <div className="grid grid-cols-2 gap-1.5">
          {GESTURES.map((g) => (
            <button
              key={g.id}
              type="button"
              disabled={!cameraConnected || !hasHand || !!busy}
              onClick={() => trainAs(g.id, g.out, g.label)}
              className="rounded border border-white/10 bg-white/5 px-2.5 py-2 text-left text-[11px] text-white/80 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200 disabled:opacity-40"
            >
              {busy === g.id ? '⏳ ' : '🎯 '}{g.label}
            </button>
          ))}
        </div>
        {noHandHint && <div className="mt-2 text-[10px] text-white/40">{noHandHint}</div>}
        {trainStatus && (
          <div className="mt-2 rounded bg-black/30 px-2 py-1 font-mono text-[10px] text-white/70">
            {trainStatus}
          </div>
        )}
      </div>

      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between">
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
        {livePredict && predictResult && predictResult.winner && (
          <div className="rounded border border-violet-400/30 bg-violet-500/10 px-3 py-2 font-mono text-xs">
            <div className="text-violet-200">
              {OUT_LABELS[predictResult.winner] || predictResult.winner}
            </div>
            <div className="mb-2 text-[10px] text-white/50">
              confidence: {(predictResult.conf * 100).toFixed(0)}%
            </div>
            {/* 4 OUT rates 분포 — winner 외 활성도도 함께 표시. */}
            <OutRatesBars rates={predictResult.rates} winner={predictResult.winner} />
          </div>
        )}
        {livePredict && (!predictResult || !predictResult.winner) && (
          <div className="rounded bg-black/20 px-3 py-2 font-mono text-[11px] text-white/50">
            손을 보여주세요
          </div>
        )}
      </div>

      <div className="text-[10px] text-white/40">
        💡 Train as X → 카메라 앞에 해당 자세 유지 → 30 frame 자동 학습.<br />
        Live predict → 매 0.6s 마다 SNN 추론 → winner 표시.
      </div>
    </div>
  );
}

// 4 OUT rates 막대 — width 동적 갱신을 ref 로 imperatively 설정 (inline style 회피).
function OutRatesBars({ rates, winner }: { rates: Record<string, number>; winner: string | null }) {
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
        return (
          <div key={k} className="text-[10px]">
            <div className="flex justify-between">
              <span className={isWinner ? 'text-violet-200' : 'text-white/50'}>
                {OUT_LABELS[k]}
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
