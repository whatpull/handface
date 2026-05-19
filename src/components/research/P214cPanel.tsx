'use client';

// P214c Research Panel — 노이즈/마스킹 강도 sweep.
//
// 4개 표준 패턴 학습 후 noise/mask 강도 단계별 정확도 측정 + 라인 차트.

import { useEffect, useState } from 'react';
import { runP214c, type SweepResult } from '@/lib/research/p214c-sweep';

interface Progress { msg: string; pct: number }

export default function P214cPanel() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<Progress>({ msg: '', pct: 0 });
  const [results, setResults] = useState<SweepResult[]>([]);
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
      const r = await runP214c((msg, pct) => setProgress({ msg, pct }));
      setResults(r);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('[P214c] experiment failed:', e);
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
    a.download = `p214c-sweep-${Date.now()}.json`;
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

  const noiseResults = results.filter((r) => r.paramName === 'noise');
  const maskResults = results.filter((r) => r.paramName === 'mask');

  return (
    <div className="rounded-lg border border-[#2a2a38] bg-[#18181f] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">P214c — 강도 sweep</h2>
          <p className="mt-1 text-xs text-[#8888aa]">
            4개 표준 패턴 학습 후 noise (0~50% flip) / mask (100~25% keep) 강도별 정확도 곡선을 측정합니다.
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

      {results.length > 0 && (
        <div className="mt-6 space-y-6">
          {noiseResults.length > 0 && (
            <SweepChart title="Noise sweep (bit-flip 확률 vs 정확도)" results={noiseResults} xLabel="flip prob" color="#f97316" />
          )}
          {maskResults.length > 0 && (
            <SweepChart title="Mask sweep (keep 비율 vs 정확도)" results={maskResults} xLabel="keep ratio" color="#3b82f6" />
          )}
          <SweepTable results={results} />
          <div className="flex items-center gap-3 flex-wrap">
            <button type="button" onClick={copyJson} className="rounded border border-violet-700 bg-violet-950/30 px-3 py-1.5 text-xs text-violet-300 hover:bg-violet-900/40">
              {copied ? '복사됨 ✓' : 'JSON 복사'}
            </button>
            <button type="button" onClick={downloadJson} className="text-xs text-violet-400 hover:text-violet-300">
              ↓ JSON 다운로드
            </button>
            <span className="text-xs text-[#666688]">{results.length} levels measured</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface ChartProps {
  title: string;
  results: SweepResult[];
  xLabel: string;
  color: string;
}

function SweepChart({ title, results, xLabel, color }: ChartProps) {
  // SVG 라인 차트 — 좌표 normalize.
  const W = 520;
  const H = 220;
  const padX = 40;
  const padY = 30;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  if (results.length === 0) return null;

  const xs = results.map((r) => r.paramValue);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const xRange = xMax - xMin || 1;

  const xPos = (x: number) => padX + ((x - xMin) / xRange) * innerW;
  const yPos = (y: number) => padY + (1 - y) * innerH; // y=1 영역 top.

  const pathD = results
    .map((r, i) => `${i === 0 ? 'M' : 'L'} ${xPos(r.paramValue).toFixed(1)} ${yPos(r.accuracy).toFixed(1)}`)
    .join(' ');

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">{title}</h3>
      <div className="overflow-x-auto rounded border border-[#2a2a38] bg-[#101015] p-2">
        <svg width={W} height={H} className="block">
          {/* axes */}
          <line x1={padX} y1={padY} x2={padX} y2={padY + innerH} stroke="#444" strokeWidth={1} />
          <line x1={padX} y1={padY + innerH} x2={padX + innerW} y2={padY + innerH} stroke="#444" strokeWidth={1} />
          {/* y gridlines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((y) => (
            <g key={y}>
              <line x1={padX} y1={yPos(y)} x2={padX + innerW} y2={yPos(y)} stroke="#222" strokeWidth={1} strokeDasharray="2 2" />
              <text x={padX - 6} y={yPos(y) + 3} fill="#666" fontSize={10} textAnchor="end">{(y * 100).toFixed(0)}%</text>
            </g>
          ))}
          {/* x ticks */}
          {results.map((r, i) => (
            <text key={i} x={xPos(r.paramValue)} y={padY + innerH + 14} fill="#666" fontSize={10} textAnchor="middle">
              {(r.paramValue * 100).toFixed(0)}%
            </text>
          ))}
          {/* line + dots */}
          <path d={pathD} stroke={color} strokeWidth={2} fill="none" />
          {results.map((r, i) => (
            <g key={i}>
              <circle cx={xPos(r.paramValue)} cy={yPos(r.accuracy)} r={4} fill={color} />
              <text x={xPos(r.paramValue)} y={yPos(r.accuracy) - 8} fill="#fff" fontSize={9} textAnchor="middle">
                {(r.accuracy * 100).toFixed(0)}%
              </text>
            </g>
          ))}
          {/* labels */}
          <text x={padX + innerW / 2} y={H - 4} fill="#888" fontSize={10} textAnchor="middle">{xLabel}</text>
          <text x={10} y={padY - 8} fill="#888" fontSize={10}>accuracy</text>
        </svg>
      </div>
    </div>
  );
}

function SweepTable({ results }: { results: SweepResult[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-white">Sweep 결과 표</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a38] text-xs text-[#8888aa]">
              <th className="py-2 text-left">유형</th>
              <th className="py-2">파라미터</th>
              <th className="py-2">정확도</th>
              <th className="py-2">샘플</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="border-b border-[#2a2a38]/50">
                <td className="py-2 font-semibold text-white">{r.paramName}</td>
                <td className="py-2 text-center font-mono text-[#aaa]">{(r.paramValue * 100).toFixed(0)}%</td>
                <td className="py-2 text-center"><AccuracyCell value={r.accuracy} /></td>
                <td className="py-2 text-center text-xs text-[#666]">{r.samples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AccuracyCell({ value }: { value: number }) {
  const color = value >= 0.8 ? 'text-green-400' : value >= 0.5 ? 'text-yellow-400' : 'text-red-400';
  return <span className={`font-mono ${color}`}>{(value * 100).toFixed(0)}%</span>;
}
