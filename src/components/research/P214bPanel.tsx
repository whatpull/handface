'use client';

// P214b Research Panel — 확장 N (9개 패턴 / N=3..9 sweep).
//
// P213 6개 표준 + T/L/U-shape 3개 = 9개 패턴 영역 N=3..9 영역 capacity
// saturation 영역 정량.

import { Fragment, useEffect, useState } from 'react';
import { runP214b, EXTENDED_PATTERNS, EXTENDED_NAMES } from '@/lib/research/p214b-extended';
import type { SelectivityMetrics } from '@/lib/research/p213-selectivity';

interface Progress { msg: string; pct: number }

export default function P214bPanel() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<Progress>({ msg: '', pct: 0 });
  const [results, setResults] = useState<SelectivityMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!running) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [running]);

  const run = async () => {
    setRunning(true);
    setError(null);
    setResults([]);
    try {
      const r = await runP214b((msg, pct) => setProgress({ msg, pct }));
      setResults(r);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('[P214b] experiment failed:', e);
      setError(msg);
    } finally {
      setRunning(false);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `p214b-extended-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const [copied, setCopied] = useState(false);
  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(results, null, 2));
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
          <h2 className="text-lg font-bold text-white">P214b — 확장 N (N=3..9)</h2>
          <p className="mt-1 text-xs text-[#8888aa]">
            9개 패턴 (P213 6종 + T/L/U-shape) 영역 N=3..9 sweep — capacity saturation point 검출.
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="rounded bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600 disabled:opacity-50"
        >
          {running ? '측정 중...' : '실험 시작'}
        </button>
      </div>

      {running && (
        <div className="mb-4">
          <div className="mb-1 text-xs text-[#8888aa]">{progress.msg}</div>
          <div className="h-1 rounded bg-[#2a2a38]">
            <div className="h-1 rounded bg-violet-500 transition-all" style={{ width: `${Math.min(100, Math.max(0, progress.pct))}%` }} />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
          실험 실패: {error}
        </div>
      )}

      <details className="rounded border border-[#2a2a38] bg-[#101015] p-3 text-xs text-[#aaa]">
        <summary className="cursor-pointer text-[#ccc]">확장 패턴 9종 (4×4)</summary>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-9">
          {EXTENDED_PATTERNS.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <PatternThumb pattern={p} />
              <span className="text-[10px] text-[#888]">{i + 1}. {EXTENDED_NAMES[i]}</span>
            </div>
          ))}
        </div>
      </details>

      {results.length > 0 && (
        <div className="mt-6 space-y-6">
          <MetricsTable results={results} />
          <ConfusionMatrices results={results} />
          <div className="flex items-center gap-3 flex-wrap">
            <button type="button" onClick={copyJson} className="rounded border border-violet-700 bg-violet-950/30 px-3 py-1.5 text-xs text-violet-300 hover:bg-violet-900/40">
              {copied ? '복사됨 ✓' : 'JSON 복사'}
            </button>
            <button type="button" onClick={downloadJson} className="text-xs text-violet-400 hover:text-violet-300">
              ↓ JSON 다운로드
            </button>
            <span className="text-xs text-[#666688]">{results.length} step measured</span>
          </div>
        </div>
      )}
    </div>
  );
}

function PatternThumb({ pattern }: { pattern: ReadonlyArray<number> }) {
  return (
    <div className="grid grid-cols-4 gap-px rounded bg-[#222] p-px" style={{ width: 48, height: 48 }}>
      {pattern.map((v, i) => (
        <div key={i} className="rounded-sm" style={{ backgroundColor: v > 0.5 ? '#a78bfa' : '#0a0a0f' }} />
      ))}
    </div>
  );
}

function MetricsTable({ results }: { results: SelectivityMetrics[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">지표 비교</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a38] text-xs text-[#8888aa]">
              <th className="py-2 text-left">패턴 수</th>
              <th className="py-2">재현율</th>
              <th className="py-2">노이즈</th>
              <th className="py-2">부분단서</th>
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
                <td className="py-2 text-center font-mono text-violet-300">{(r.avgWtaMargin * 100).toFixed(0)}%</td>
                <td className="py-2 text-center font-mono text-blue-300">{(r.avgSparsity * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCell({ value }: { value: number }) {
  const color = value >= 0.8 ? 'text-green-400' : value >= 0.5 ? 'text-yellow-400' : 'text-red-400';
  return <span className={`font-mono ${color}`}>{(value * 100).toFixed(0)}%</span>;
}

function ConfusionMatrices({ results }: { results: SelectivityMetrics[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">Confusion Matrices</h3>
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
      <div className="grid gap-px" style={{ gridTemplateColumns: `auto repeat(${N}, 24px)` }}>
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
                    backgroundColor: v === 0 ? '#0a0a0f' : `rgba(167, 139, 250, ${0.2 + 0.8 * intensity})`,
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
      <div className="mt-2 text-[10px] text-[#666]">cluster mapping: [{metrics.patternToCluster.join(', ')}]</div>
    </div>
  );
}
