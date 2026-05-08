'use client';
// SnnLabClient — LocalSNN end-to-end 데모 페이지.
//
// 백엔드 round-trip 없이 브라우저 안에서 회로 빌드 → 4×4 grid 자극 →
// STDP 학습 → cluster 별 발화율 표시 → localStorage 저장 / 복원 까지
// 한 화면에서 시연. lib (~3,400 LOC) 가 실제로 동작함을 증명하는 entry point.

import { useEffect, useMemo, useRef, useState } from 'react';

import type { InjectEvent } from '@/lib/snn-runtime';

import { useLocalSnn } from './useLocalSnn';

type ClusterId = 0 | 1 | 2 | 3;

// 4×4 orientation pattern — cluster 0..3 각각 ─│╲╱.
const ORIENTATION_PATTERNS: Record<ClusterId, number[]> = {
  0: [4, 5, 6, 7], // ─ horizontal
  1: [1, 5, 9, 13], // │ vertical
  2: [0, 5, 10, 15], // ╲ diag-back
  3: [3, 6, 9, 12], // ╱ diag-fore
};

const ORIENTATION_LABEL: Record<ClusterId, string> = {
  0: '─',
  1: '│',
  2: '╲',
  3: '╱',
};

const RUN_MS = 50;
const STIM_DURATION_MS = 30;
const STIM_WEIGHT = 28;
const TRAIN_FRAMES_PER_BUTTON = 6;

function formatTimestamp(ms: number | null): string {
  if (ms === null) return '저장 전';
  const d = new Date(ms);
  return `${d.toLocaleTimeString()}`;
}

export default function SnnLabClient() {
  const [useWorker, setUseWorker] = useState(false);
  const lab = useLocalSnn({ netId: 'snn-lab-default', seed: 57, useWorker });
  const [activePattern, setActivePattern] = useState<number[]>(ORIENTATION_PATTERNS[0]);
  const [busy, setBusy] = useState(false);
  const [outRates, setOutRates] = useState<number[]>([0, 0, 0, 0]);
  const [winner, setWinner] = useState<{ cluster: ClusterId | null; share: number; margin: number }>(
    {
      cluster: null,
      share: 0,
      margin: 0,
    },
  );
  const [log, setLog] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const appendLog = (line: string) => {
    setLog((prev) => [...prev.slice(-49), line]);
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log.length]);

  // 자극 만들기 — 활성 grid index 들에 sustained current.
  const buildInjectEvents = (activeIdx: number[]): InjectEvent[] =>
    activeIdx.map((i) => ({
      neuron: `in_feat_${i}`,
      weight: STIM_WEIGHT,
      time: 0,
      durationMs: STIM_DURATION_MS,
      stepMs: 0.1,
    }));

  const measureOutRates = async (): Promise<{ rates: number[]; winner: ClusterId | null; share: number; margin: number }> => {
    const names: string[] = [];
    for (let ci = 0; ci < 4; ci += 1) {
      for (let ni = 0; ni < 8; ni += 1) names.push(`out_${ci}_${ni}`);
    }
    const r = await lab.firingRates({ names, windowMs: RUN_MS });
    const sums = [0, 0, 0, 0];
    const counts = [0, 0, 0, 0];
    for (const x of r.rates) {
      const m = /^out_(\d)_/.exec(x.name);
      if (!m) continue;
      const ci = Number(m[1]);
      sums[ci] += x.hz;
      counts[ci] += 1;
    }
    const rates = sums.map((s, i) => (counts[i] > 0 ? s / counts[i] : 0));
    let max = 0;
    let second = 0;
    let win: ClusterId | null = null;
    let total = 0;
    for (let i = 0; i < rates.length; i += 1) {
      total += rates[i];
      if (rates[i] > max) {
        second = max;
        max = rates[i];
        win = i as ClusterId;
      } else if (rates[i] > second) {
        second = rates[i];
      }
    }
    return {
      rates,
      winner: total > 0 ? win : null,
      share: total > 0 ? max / total : 0,
      margin: max > 0 ? (max - second) / max : 0,
    };
  };

  const onInfer = async () => {
    if (!lab.ready || busy) return;
    setBusy(true);
    try {
      await lab.inject(buildInjectEvents(activePattern));
      await lab.run({ durationMs: RUN_MS, dtMs: 0.1, stdpEnabled: false });
      const m = await measureOutRates();
      setOutRates(m.rates);
      setWinner({ cluster: m.winner, share: m.share, margin: m.margin });
      appendLog(
        `infer pattern=[${activePattern.join(',')}] winner=${m.winner ?? 'null'} share=${m.share.toFixed(2)} margin=${m.margin.toFixed(2)}`,
      );
    } finally {
      setBusy(false);
    }
  };

  const onTrain = async (cluster: ClusterId) => {
    if (!lab.ready || busy) return;
    setBusy(true);
    try {
      const pattern = ORIENTATION_PATTERNS[cluster];
      for (let i = 0; i < TRAIN_FRAMES_PER_BUTTON; i += 1) {
        await lab.inject(buildInjectEvents(pattern));
        await lab.run({ durationMs: RUN_MS, dtMs: 0.1, stdpEnabled: true, stdpGain: 1.0 });
      }
      const m = await measureOutRates();
      setOutRates(m.rates);
      setWinner({ cluster: m.winner, share: m.share, margin: m.margin });
      appendLog(
        `train cluster ${cluster} (${ORIENTATION_LABEL[cluster]}) ×${TRAIN_FRAMES_PER_BUTTON} → winner=${m.winner ?? 'null'} share=${m.share.toFixed(2)}`,
      );
    } finally {
      setBusy(false);
    }
  };

  const onSave = async () => {
    if (!lab.ready || busy) return;
    setBusy(true);
    try {
      await lab.save();
      appendLog(`save → rev=${lab.status?.rev ?? 0}`);
    } finally {
      setBusy(false);
    }
  };

  const onReset = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await lab.reset();
      setOutRates([0, 0, 0, 0]);
      setWinner({ cluster: null, share: 0, margin: 0 });
      appendLog('reset → rev=0');
    } finally {
      setBusy(false);
    }
  };

  const grid = useMemo(() => {
    const cells: number[] = Array.from({ length: 16 }, (_, i) => i);
    return cells.map((i) => ({ idx: i, on: activePattern.includes(i) }));
  }, [activePattern]);

  const setPattern = (cluster: ClusterId) => setActivePattern(ORIENTATION_PATTERNS[cluster]);

  return (
    <div className="min-h-screen p-6 bg-[#0a0a0c] text-white">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">SNN Lab — LocalSNN end-to-end</h1>
          <p className="text-sm text-white/70 mt-1">
            백엔드 round-trip 없이 브라우저 안에서 회로 빌드 → 자극 → STDP → 가중치 영속화.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={useWorker}
            onChange={(e) => setUseWorker(e.target.checked)}
            disabled={busy}
            className="accent-blue-400"
          />
          <span>Web Worker 모드</span>
          <span className="text-xs text-white/50">
            ({lab.transportKind ?? '대기'})
          </span>
        </label>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Status</div>
            {lab.error && <div className="text-red-300 text-sm">에러: {lab.error}</div>}
            {!lab.ready && !lab.error && <div className="text-white/60 text-sm">초기화 중…</div>}
            {lab.status && (
              <dl className="grid grid-cols-2 gap-y-1 text-sm">
                <dt className="text-white/50">netId</dt>
                <dd>{lab.status.netId}</dd>
                <dt className="text-white/50">rev</dt>
                <dd>{lab.status.rev}</dd>
                <dt className="text-white/50">neurons</dt>
                <dd>{lab.status.neurons}</dd>
                <dt className="text-white/50">synapses</dt>
                <dd>{lab.status.synapses}</dd>
                <dt className="text-white/50">last save</dt>
                <dd>{formatTimestamp(lab.status.lastSavedAt)}</dd>
              </dl>
            )}
          </div>

          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-white/50 mb-3">
              4×4 Pattern
            </div>
            <div className="grid grid-cols-4 gap-1 max-w-[10rem]">
              {grid.map((c) => (
                <div
                  key={c.idx}
                  className={`aspect-square rounded ${
                    c.on ? 'bg-amber-300' : 'bg-white/10'
                  }`}
                  title={`in_feat_${c.idx}`}
                />
              ))}
            </div>
            <div className="mt-3 flex gap-2 text-sm">
              {([0, 1, 2, 3] as ClusterId[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setPattern(c)}
                  className="px-2 py-1 border border-white/20 rounded hover:bg-white/10"
                >
                  {ORIENTATION_LABEL[c]} ({c})
                </button>
              ))}
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-4 bg-white/5 space-y-3">
            <div className="text-xs uppercase tracking-wider text-white/50">Actions</div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onInfer}
                disabled={!lab.ready || busy}
                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-40 rounded"
              >
                Infer
              </button>
              {([0, 1, 2, 3] as ClusterId[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onTrain(c)}
                  disabled={!lab.ready || busy}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 rounded"
                >
                  Train {ORIENTATION_LABEL[c]}
                </button>
              ))}
              <button
                type="button"
                onClick={onSave}
                disabled={!lab.ready || busy}
                className="px-3 py-1.5 bg-violet-500 hover:bg-violet-400 disabled:opacity-40 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onReset}
                disabled={busy}
                className="px-3 py-1.5 bg-rose-500 hover:bg-rose-400 disabled:opacity-40 rounded"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-white/50 mb-3">
              Cluster firing rate (Hz, last {RUN_MS} ms)
            </div>
            <div className="space-y-2">
              {([0, 1, 2, 3] as ClusterId[]).map((c) => {
                const isWinner = winner.cluster === c && winner.share > 0;
                const max = Math.max(0.1, ...outRates);
                const pct = Math.min(100, (outRates[c] / max) * 100);
                return (
                  <div key={c} className="flex items-center gap-3">
                    <div className="w-12 text-sm text-white/70">
                      {ORIENTATION_LABEL[c]} ({c})
                    </div>
                    <div className="flex-1 h-3 bg-white/10 rounded relative">
                      <div
                        className={`h-3 rounded ${
                          isWinner ? 'bg-amber-300' : 'bg-blue-400/60'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm tabular-nums">
                      {outRates[c].toFixed(1)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-sm text-white/60">
              winner ={' '}
              <span className="text-amber-300">
                {winner.cluster === null ? 'silent' : ORIENTATION_LABEL[winner.cluster]}
              </span>
              {' · '}share = {winner.share.toFixed(2)} · margin = {winner.margin.toFixed(2)}
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Log</div>
            <div
              ref={logRef}
              className="h-48 overflow-auto font-mono text-xs leading-relaxed"
            >
              {log.length === 0 ? (
                <div className="text-white/40">동작 시작 시 로그가 표시됩니다.</div>
              ) : (
                log.map((l, i) => <div key={i}>{l}</div>)
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
