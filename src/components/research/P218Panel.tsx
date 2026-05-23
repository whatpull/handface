'use client';

// P218 Research Panel — 5×5 input expansion capacity test (2026-05-20).
//
// n13 (4×4) N=8 ceiling 영역 break 영역 영역 n14_extended (5×5) substrate
// 영역 영역 12 패턴 capacity 측정 + Bio-SNN architecture rework evidence.

import { Fragment, useState, useEffect } from 'react';
import {
  runP218Experiment,
  runP218VigilanceSweep,
  runP218PartialSweep,
  runP218Averaged,
  runP218NoiseSweep,
  PATTERN_NAMES_5X5,
  PATTERNS_5X5,
  type VigilanceSweepResult,
  type PartialSweepResult,
  type AveragedMetricsSummary,
  type NoiseSweepResult,
} from '@/lib/research/p218-capacity-5x5';
import type { SelectivityMetrics } from '@/lib/research/p213-selectivity';

interface Progress {
  msg: string;
  pct: number;
}

export default function P218Panel() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<Progress>({ msg: '', pct: 0 });
  const [results, setResults] = useState<SelectivityMetrics[]>([]);
  const [vigResults, setVigResults] = useState<VigilanceSweepResult[]>([]);
  const [partialResults, setPartialResults] = useState<PartialSweepResult[]>([]);
  const [avgResult, setAvgResult] = useState<AveragedMetricsSummary | null>(null);
  const [noiseResults, setNoiseResults] = useState<NoiseSweepResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  // P218 hyperparameter UI (2026-05-21): vigilance / noise / partial cue 조정.
  const [vigilance, setVigilance] = useState(0.15);
  const [noiseFlipProb, setNoiseFlipProb] = useState(0.20);
  const [partialKeepRatio, setPartialKeepRatio] = useState(0.75);

  useEffect(() => {
    if (!running) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [running]);

  const clearOutputs = () => {
    setResults([]);
    setVigResults([]);
    setPartialResults([]);
    setAvgResult(null);
    setNoiseResults([]);
  };

  const run = async () => {
    setRunning(true);
    setError(null);
    clearOutputs();
    try {
      const r = await runP218Experiment(
        (msg, pct) => setProgress({ msg, pct }),
        { vigilance, noiseFlipProb, partialKeepRatio },
      );
      setResults(r);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('[P218] experiment failed:', e);
      setError(msg);
    } finally {
      setRunning(false);
    }
  };

  const runVigSweep = async () => {
    setRunning(true);
    setError(null);
    clearOutputs();
    try {
      const r = await runP218VigilanceSweep(
        (msg, pct) => setProgress({ msg, pct }),
        [0.10, 0.15, 0.20, 0.25],
        8,
        { noiseFlipProb, partialKeepRatio },
      );
      setVigResults(r);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('[P218 vig-sweep] failed:', e);
      setError(msg);
    } finally {
      setRunning(false);
    }
  };

  const runPartialSweep = async () => {
    setRunning(true);
    setError(null);
    clearOutputs();
    try {
      const r = await runP218PartialSweep(
        (msg, pct) => setProgress({ msg, pct }),
        [0.40, 0.50, 0.60, 0.75, 0.85],
        8,
        { vigilance, noiseFlipProb },
      );
      setPartialResults(r);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('[P218 partial-sweep] failed:', e);
      setError(msg);
    } finally {
      setRunning(false);
    }
  };

  const runAvg = async () => {
    setRunning(true);
    setError(null);
    clearOutputs();
    try {
      const r = await runP218Averaged(
        (msg, pct) => setProgress({ msg, pct }),
        5,
        8,
        { vigilance, noiseFlipProb, partialKeepRatio },
      );
      setAvgResult(r);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('[P218 avg] failed:', e);
      setError(msg);
    } finally {
      setRunning(false);
    }
  };

  const runNoiseSweep = async () => {
    setRunning(true);
    setError(null);
    clearOutputs();
    try {
      const r = await runP218NoiseSweep(
        (msg, pct) => setProgress({ msg, pct }),
        [0.05, 0.10, 0.13, 0.20, 0.30],
        8,
        { vigilance, partialKeepRatio },
      );
      setNoiseResults(r);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('[P218 noise-sweep] failed:', e);
      setError(msg);
    } finally {
      setRunning(false);
    }
  };

  const activePayload = (): { data: unknown; prefix: string } => {
    if (noiseResults.length > 0) return { data: noiseResults, prefix: 'p218-noise-sweep' };
    if (avgResult) return { data: avgResult, prefix: 'p218-averaged' };
    if (partialResults.length > 0) return { data: partialResults, prefix: 'p218-partial-sweep' };
    if (vigResults.length > 0) return { data: vigResults, prefix: 'p218-vigilance-sweep' };
    return { data: results, prefix: 'p218-capacity-5x5' };
  };

  const downloadJson = () => {
    const { data, prefix } = activePayload();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prefix}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = useState(false);
  const copyJson = async () => {
    try {
      const { data } = activePayload();
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('clipboard fail:', e);
    }
  };

  return (
    <div className="rounded-lg border border-[#2a2a38] bg-[#18181f] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">P218 — 5×5 capacity</h2>
          <p className="mt-1 text-xs text-[#8888aa]">
            12개 5×5 패턴을 N=3,6,8,10,12 단계로 학습. n14_extended (50 dim) 기반.
            N=8 stable cap 확인됨 — partial cue 100% (vs 4×4 N=8 의 63%). Hyperparameter 조정 + vigilance sweep 가능.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="rounded bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600 disabled:opacity-50"
          >
            {running ? '측정 중...' : '실험 시작'}
          </button>
          <button
            type="button"
            onClick={runVigSweep}
            disabled={running}
            className="rounded border border-violet-600 bg-violet-950/40 px-4 py-2 text-sm font-semibold text-violet-300 hover:bg-violet-900/50 disabled:opacity-50"
            title="N=8 (stable cap) 에서 vigilance=0.10/0.15/0.20/0.25 4단계 자동 비교"
          >
            Vigilance sweep
          </button>
          <button
            type="button"
            onClick={runPartialSweep}
            disabled={running}
            className="rounded border border-emerald-600 bg-emerald-950/40 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-900/50 disabled:opacity-50"
            title="N=8 (stable cap) 에서 partialKeepRatio=0.40/0.50/0.60/0.75/0.85 5단계 자동 비교"
          >
            Partial sweep
          </button>
          <button
            type="button"
            onClick={runAvg}
            disabled={running}
            className="rounded border border-amber-600 bg-amber-950/40 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-900/50 disabled:opacity-50"
            title="N=8 (현재 hyperparameter) 5회 반복 측정 → mean ± std 평균. ~2분 소요."
          >
            Noise avg ×5
          </button>
          <button
            type="button"
            onClick={runNoiseSweep}
            disabled={running}
            className="rounded border border-rose-600 bg-rose-950/40 px-4 py-2 text-sm font-semibold text-rose-300 hover:bg-rose-900/50 disabled:opacity-50"
            title="N=8 에서 noiseFlipProb=5/10/13/20/30% 5단계 자동 측정. 0.13 = 3.25 bits ≈ 4×4 의 0.20 (3.2 bits) 공정 비교."
          >
            Noise sweep
          </button>
        </div>
      </div>

      <HyperParameterPanel
        vigilance={vigilance}
        setVigilance={setVigilance}
        noiseFlipProb={noiseFlipProb}
        setNoiseFlipProb={setNoiseFlipProb}
        partialKeepRatio={partialKeepRatio}
        setPartialKeepRatio={setPartialKeepRatio}
        disabled={running}
      />

      {running && (
        <div className="mb-4">
          <div className="mb-1 text-xs text-[#8888aa]">{progress.msg}</div>
          <div className="h-1 rounded bg-[#2a2a38]">
            <div
              className="h-1 rounded bg-violet-500 transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress.pct))}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
          실험 실패: {error}
        </div>
      )}

      <PatternLegend />

      {results.length > 0 && (
        <div className="mt-6 space-y-6">
          <MetricsTable results={results} />
          <ConfusionMatrices results={results} />
          <ExportButtons copied={copied} copyJson={copyJson} downloadJson={downloadJson} count={results.length} label="step" />
        </div>
      )}

      {vigResults.length > 0 && (
        <div className="mt-6 space-y-4">
          <VigilanceSweepTable results={vigResults} />
          <ExportButtons copied={copied} copyJson={copyJson} downloadJson={downloadJson} count={vigResults.length} label="vigilance" />
        </div>
      )}

      {partialResults.length > 0 && (
        <div className="mt-6 space-y-4">
          <PartialSweepTable results={partialResults} />
          <ExportButtons copied={copied} copyJson={copyJson} downloadJson={downloadJson} count={partialResults.length} label="partial-cue" />
        </div>
      )}

      {avgResult && (
        <div className="mt-6 space-y-4">
          <AveragedTable summary={avgResult} />
          <ExportButtons copied={copied} copyJson={copyJson} downloadJson={downloadJson} count={avgResult.runs} label="avg run" />
        </div>
      )}

      {noiseResults.length > 0 && (
        <div className="mt-6 space-y-4">
          <NoiseSweepTable results={noiseResults} />
          <ExportButtons copied={copied} copyJson={copyJson} downloadJson={downloadJson} count={noiseResults.length} label="noise level" />
        </div>
      )}
    </div>
  );
}

function NoiseSweepTable({ results }: { results: NoiseSweepResult[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">
        Noise Level Sweep @ N=8 (stable cap)
      </h3>
      <p className="mb-3 text-xs text-[#8888aa]">
        <strong className="text-rose-300">Fair comparison hypothesis:</strong> 4×4 의 noise=20% (3.2 bits) ↔
        5×5 의 noise=<strong className="text-rose-300">13%</strong> (3.25 bits) 동등 절대 perturbation.
        4×4 P215 N=8 noise=88% — 5×5 @ 0.13 이 비슷하면 fundamental weakness 없음 증명.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a38] text-xs text-[#8888aa]">
              <th className="py-2 text-left">Noise flip %</th>
              <th className="py-2 text-left">절대 bits</th>
              <th className="py-2">재현율</th>
              <th className="py-2">노이즈</th>
              <th className="py-2">부분단서</th>
              <th className="py-2">WTA margin</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const isFairPoint = Math.abs(r.noiseFlipProb - 0.13) < 0.01;
              return (
                <tr key={r.noiseFlipProb} className={`border-b border-[#2a2a38]/50 ${isFairPoint ? 'bg-rose-950/20' : ''}`}>
                  <td className="py-2 font-mono font-semibold text-rose-300">
                    {(r.noiseFlipProb * 100).toFixed(0)}%
                    {isFairPoint && <span className="ml-2 text-[10px] text-rose-400">← fair vs 4×4 20%</span>}
                  </td>
                  <td className="py-2 font-mono text-[#aaa]">{r.absoluteBitFlips.toFixed(2)}</td>
                  <td className="py-2 text-center"><MetricCell value={r.metrics.reproduction} /></td>
                  <td className="py-2 text-center"><MetricCell value={r.metrics.noise} /></td>
                  <td className="py-2 text-center"><MetricCell value={r.metrics.partialCue} /></td>
                  <td className="py-2 text-center font-mono text-violet-300">
                    {(r.metrics.avgWtaMargin * 100).toFixed(0)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExportButtons({ copied, copyJson, downloadJson, count, label }: {
  copied: boolean;
  copyJson: () => void;
  downloadJson: () => void;
  count: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        type="button"
        onClick={copyJson}
        className="rounded border border-violet-700 bg-violet-950/30 px-3 py-1.5 text-xs text-violet-300 hover:bg-violet-900/40"
      >
        {copied ? '복사됨 ✓' : 'JSON 복사'}
      </button>
      <button
        type="button"
        onClick={downloadJson}
        className="text-xs text-violet-400 hover:text-violet-300"
      >
        ↓ JSON 다운로드
      </button>
      <span className="text-xs text-[#666688]">{count} {label} measured</span>
    </div>
  );
}

function HyperParameterPanel({
  vigilance, setVigilance,
  noiseFlipProb, setNoiseFlipProb,
  partialKeepRatio, setPartialKeepRatio,
  disabled,
}: {
  vigilance: number;
  setVigilance: (v: number) => void;
  noiseFlipProb: number;
  setNoiseFlipProb: (v: number) => void;
  partialKeepRatio: number;
  setPartialKeepRatio: (v: number) => void;
  disabled: boolean;
}) {
  return (
    <details className="mb-4 rounded border border-[#2a2a38] bg-[#101015] p-3 text-xs">
      <summary className="cursor-pointer text-[#ccc]">Hyperparameter 조정</summary>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SliderField
          label="Vigilance"
          value={vigilance}
          min={0.05} max={0.40} step={0.01}
          onChange={setVigilance}
          disabled={disabled}
          hint="default 0.15. 높을수록 strict match (cluster spawn 적음)"
        />
        <SliderField
          label="Noise flip prob"
          value={noiseFlipProb}
          min={0.05} max={0.50} step={0.01}
          onChange={setNoiseFlipProb}
          disabled={disabled}
          hint="default 0.20. 5×5 의 0.13 = 3.25 bits ≈ 4×4 의 0.20 (3.2 bits) 공정 비교"
        />
        <SliderField
          label="Partial keep ratio"
          value={partialKeepRatio}
          min={0.30} max={1.00} step={0.01}
          onChange={setPartialKeepRatio}
          disabled={disabled}
          hint="default 0.75 (75% bits 유지). 낮을수록 어려운 partial cue"
        />
      </div>
    </details>
  );
}

function SliderField({ label, value, min, max, step, onChange, disabled, hint }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  disabled: boolean;
  hint: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[#aaa]">{label}</span>
        <span className="font-mono text-violet-300">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="accent-violet-500"
      />
      <span className="text-[10px] text-[#666]">{hint}</span>
    </label>
  );
}

function AveragedTable({ summary }: { summary: AveragedMetricsSummary }) {
  const fmt = (m: number, s: number) => `${(m * 100).toFixed(1)}% ± ${(s * 100).toFixed(1)}%`;
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">
        Averaged Metrics @ N={summary.patternCount} ({summary.runs} runs)
      </h3>
      <p className="mb-3 text-xs text-[#8888aa]">
        5회 반복 측정 → mean ± std. Math.random() 기반 noise/partial probe 의 variance 진단용.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a38] text-xs text-[#8888aa]">
              <th className="py-2 text-left">지표</th>
              <th className="py-2 text-left">Mean ± Std</th>
              <th className="py-2 text-left">5 runs (개별)</th>
            </tr>
          </thead>
          <tbody>
            <AvgRow label="재현율" mean={summary.mean.reproduction} std={summary.std.reproduction} values={summary.all.map((m) => m.reproduction)} fmt={fmt} />
            <AvgRow label="노이즈" mean={summary.mean.noise} std={summary.std.noise} values={summary.all.map((m) => m.noise)} fmt={fmt} />
            <AvgRow label="부분단서" mean={summary.mean.partialCue} std={summary.std.partialCue} values={summary.all.map((m) => m.partialCue)} fmt={fmt} />
            <AvgRow label="WTA margin" mean={summary.mean.avgWtaMargin} std={summary.std.avgWtaMargin} values={summary.all.map((m) => m.avgWtaMargin)} fmt={fmt} />
            <AvgRow label="Sparsity" mean={summary.mean.avgSparsity} std={summary.std.avgSparsity} values={summary.all.map((m) => m.avgSparsity)} fmt={fmt} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AvgRow({ label, mean, std, values, fmt }: {
  label: string;
  mean: number;
  std: number;
  values: number[];
  fmt: (m: number, s: number) => string;
}) {
  const color = mean >= 0.8 ? 'text-green-400'
    : mean >= 0.5 ? 'text-yellow-400'
    : 'text-red-400';
  return (
    <tr className="border-b border-[#2a2a38]/50">
      <td className="py-2 text-[#aaa]">{label}</td>
      <td className={`py-2 font-mono ${color}`}>{fmt(mean, std)}</td>
      <td className="py-2 font-mono text-[10px] text-[#888]">
        [{values.map((v) => (v * 100).toFixed(0) + '%').join(', ')}]
      </td>
    </tr>
  );
}

function PartialSweepTable({ results }: { results: PartialSweepResult[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">
        Partial Keep Ratio Sweep @ N=8 (stable cap)
      </h3>
      <p className="mb-3 text-xs text-[#8888aa]">
        partialKeepRatio 5단계 비교 — 5×5 substrate 의 partial cue 강도 한계 측정.
        Reference: 4×4 P215 @ 0.75 = 63%. 더 어려운 cue (0.50, 0.40 keep) 에서 5×5 가 어디서 무너지는지.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a38] text-xs text-[#8888aa]">
              <th className="py-2 text-left">Partial keep</th>
              <th className="py-2">재현율</th>
              <th className="py-2">노이즈</th>
              <th className="py-2">부분단서</th>
              <th className="py-2">WTA margin</th>
              <th className="py-2">Cluster map</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.partialKeepRatio} className="border-b border-[#2a2a38]/50">
                <td className="py-2 font-mono font-semibold text-emerald-300">{r.partialKeepRatio.toFixed(2)}</td>
                <td className="py-2 text-center"><MetricCell value={r.metrics.reproduction} /></td>
                <td className="py-2 text-center"><MetricCell value={r.metrics.noise} /></td>
                <td className="py-2 text-center"><MetricCell value={r.metrics.partialCue} /></td>
                <td className="py-2 text-center font-mono text-violet-300">
                  {(r.metrics.avgWtaMargin * 100).toFixed(0)}%
                </td>
                <td className="py-2 text-center font-mono text-[10px] text-[#888]">
                  [{r.metrics.patternToCluster.join(',')}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VigilanceSweepTable({ results }: { results: VigilanceSweepResult[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">
        Vigilance Sweep @ N=8 (stable cap)
      </h3>
      <p className="mb-3 text-xs text-[#8888aa]">
        vigilance 값 4단계 비교 — N=8 에서 optimal partial cue / noise tolerance balance 찾기.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a38] text-xs text-[#8888aa]">
              <th className="py-2 text-left">Vigilance</th>
              <th className="py-2">재현율</th>
              <th className="py-2">노이즈</th>
              <th className="py-2">부분단서</th>
              <th className="py-2">WTA margin</th>
              <th className="py-2">Cluster map</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.vigilance} className="border-b border-[#2a2a38]/50">
                <td className="py-2 font-mono font-semibold text-violet-300">{r.vigilance.toFixed(2)}</td>
                <td className="py-2 text-center"><MetricCell value={r.metrics.reproduction} /></td>
                <td className="py-2 text-center"><MetricCell value={r.metrics.noise} /></td>
                <td className="py-2 text-center"><MetricCell value={r.metrics.partialCue} /></td>
                <td className="py-2 text-center font-mono text-violet-300">
                  {(r.metrics.avgWtaMargin * 100).toFixed(0)}%
                </td>
                <td className="py-2 text-center font-mono text-[10px] text-[#888]">
                  [{r.metrics.patternToCluster.join(',')}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PatternLegend() {
  return (
    <details className="rounded border border-[#2a2a38] bg-[#101015] p-3 text-xs text-[#aaa]">
      <summary className="cursor-pointer text-[#ccc]">12개 5×5 표준 패턴</summary>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {PATTERNS_5X5.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <PatternThumb pattern={p} />
            <span className="text-[10px] text-[#888]">{i + 1}. {PATTERN_NAMES_5X5[i]}</span>
          </div>
        ))}
      </div>
    </details>
  );
}

function PatternThumb({ pattern }: { pattern: ReadonlyArray<number> }) {
  return (
    <div className="grid grid-cols-5 gap-px rounded bg-[#222] p-px" style={{ width: 60, height: 60 }}>
      {pattern.map((v, i) => (
        <div key={i} className="rounded-sm" style={{ backgroundColor: v > 0.5 ? '#a78bfa' : '#0a0a0f' }} />
      ))}
    </div>
  );
}

function MetricsTable({ results }: { results: SelectivityMetrics[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">지표 비교 (n14_extended 5×5)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a38] text-xs text-[#8888aa]">
              <th className="py-2 text-left">패턴 수</th>
              <th className="py-2">재현율</th>
              <th className="py-2">노이즈 (20% flip)</th>
              <th className="py-2">부분단서 (75% keep)</th>
              <th className="py-2">WTA margin</th>
              <th className="py-2">Sparsity</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.patternCount} className="border-b border-[#2a2a38]/50">
                <td className="py-2 font-semibold text-white">{r.patternCount}개</td>
                <td className="py-2 text-center"><MetricCell value={r.reproduction} /></td>
                <td className="py-2 text-center"><MetricCell value={r.noise} /></td>
                <td className="py-2 text-center"><MetricCell value={r.partialCue} /></td>
                <td className="py-2 text-center font-mono text-violet-300">
                  {(r.avgWtaMargin * 100).toFixed(0)}%
                </td>
                <td className="py-2 text-center font-mono text-blue-300">
                  {(r.avgSparsity * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCell({ value }: { value: number }) {
  const color = value >= 0.8 ? 'text-green-400'
    : value >= 0.5 ? 'text-yellow-400'
    : 'text-red-400';
  return <span className={`font-mono ${color}`}>{(value * 100).toFixed(0)}%</span>;
}

function ConfusionMatrices({ results }: { results: SelectivityMetrics[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">Confusion Matrices</h3>
      <p className="mb-3 text-xs text-[#8888aa]">
        rows = ground-truth 패턴, cols = winner cluster. 대각선 강한 색 = 높은 selectivity.
      </p>
      <div className="flex flex-wrap gap-6">
        {results.map((r) => (
          <ConfusionMatrixView key={r.patternCount} metrics={r} />
        ))}
      </div>
    </div>
  );
}

function ConfusionMatrixView({ metrics }: { metrics: SelectivityMetrics }) {
  const N = metrics.patternCount;
  const max = Math.max(1, ...metrics.confusionMatrix.flat());
  return (
    <div className="rounded border border-[#2a2a38] bg-[#101015] p-3">
      <div className="mb-2 text-xs font-semibold text-white">N = {N}</div>
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `auto repeat(${N}, 22px)` }}
      >
        <div />
        {Array.from({ length: N }, (_, j) => (
          <div key={`h-${j}`} className="text-center text-[10px] text-[#888]">{j + 1}</div>
        ))}
        {Array.from({ length: N }, (_, i) => (
          <Fragment key={`row-${i}`}>
            <div className="pr-1 text-right text-[10px] text-[#888]">{i + 1}</div>
            {Array.from({ length: N }, (_, j) => {
              const v = metrics.confusionMatrix[i][j];
              const intensity = v / max;
              return (
                <div
                  key={`c-${i}-${j}`}
                  className="flex h-6 w-6 items-center justify-center rounded-sm text-[10px] font-mono text-white"
                  style={{
                    backgroundColor: v === 0
                      ? '#0a0a0f'
                      : `rgba(167, 139, 250, ${0.2 + 0.8 * intensity})`,
                  }}
                  title={`truth=${i + 1}, winner=${j + 1}, count=${v}`}
                >
                  {v > 0 ? v : ''}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-[#666]">
        cluster mapping: [{metrics.patternToCluster.join(', ')}]
      </div>
    </div>
  );
}
