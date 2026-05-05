'use client';

// SNN 표상 영역 직접 검증 — paper draft 영역 selectivity 0/4 정직 정합.
//
// 5 검증 (a-e), backend 변경 0:
//  a) reproduction      — 동일 16-feat pattern 영역 N회 재시도 → cluster 일관 정합 사실
//  b) generalization    — 동일 cluster 의도 영역 변종 N개 → 미학습 변종 영역 cluster 일관
//  c) noise robustness  — base pattern 영역 가우시안 노이즈 (σ=0.1, 0.2, 0.3) → margin 변화
//  d) partial cue       — base pattern 영역 일부 mask (5/10/15 dim 0) → cluster 정합
//  e) MediaPipe-free    — 사용자 직접 16-slider 입력 → cluster predict (raw STDP path 검증)
//
// 모든 호출 영역 inject_feature16 (stdp=false) 영역 직접 — 학습 영향 0 (검증 only).
//
// 정직 한계 박음 (paper draft 정합):
//  - 본 panel 영역 학습 weight 영역 cluster 일관 영역 정합 사실 증명 영역 만 검증.
//  - 학습 자체 영역 (autoCapture / batch supervised) 별도 — 본 panel 영역 영역 trigger 0.
//  - reproduction (a) 영역 동일 pattern 재투입 영역 backend deterministic 영역 가정.
//    실제 backend 영역 stochastic spike (Poisson 등) 영역 동봉 영역 일관 비율 < 1.0 정합 — 그것
//    영역 raw 영역 표시 (정합 사실 catch).
//  - generalization (b) 영역 변종 영역 사용자 직접 입력 — train/test split 자동 0.
//    단순 sigma=0.05 jitter 영역 frontend 영역 자체 생성 영역 → backend untouched 영역 검증.
//  - noise (c) σ 영역 0.1/0.2/0.3 영역 추측 (paper draft 영역 영역 정합). 사용자 영역 자유 변경 0.
//  - partial cue (d) mask 5/10/15 영역 16-dim 영역 정합 — 0 영역 채움 (silent feature 영역).
//  - 모든 검증 영역 trial=5 default — 사용자 영역 변경 가능. trial 영역 영역 시간 영역 길어짐.
//  - CSV export 영역 frontend 영역 blob — 사용자 영역 다운로드 영역 정합 0 (clipboard / file API).
//    본 turn 영역 navigator.clipboard.writeText 영역 활용 — 보안 정합 시점 영역 manual paste.

import { useCallback, useMemo, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import {
  CLUSTER_COUNT,
  WINNER_MARGIN_DEFAULT,
  deriveWinner,
  type WinnerResult,
} from '@/lib/snn/winner-derivation';

interface ValidationPanelProps {
  open: boolean;
  onClose: () => void;
}

type TabId = 'a' | 'b' | 'c' | 'd' | 'e';

interface TabDef {
  id: TabId;
  label: string;
  desc: string;
}

const TABS: TabDef[] = [
  { id: 'a', label: 'a) Reproduction', desc: '동일 16-feat pattern 영역 N회 재시도 → cluster 일관' },
  { id: 'b', label: 'b) Generalization', desc: 'base 영역 σ=0.05 jitter 변종 N개 → cluster 일관' },
  { id: 'c', label: 'c) Noise', desc: '가우시안 노이즈 σ=0.1/0.2/0.3 → margin 변화' },
  { id: 'd', label: 'd) Partial cue', desc: '5/10/15 dim mask=0 → cluster 정합' },
  { id: 'e', label: 'e) MediaPipe-free', desc: '사용자 직접 16-slider 입력 → cluster predict' },
];

interface TrialResult {
  trialIdx: number;
  variant: string;          // e.g. "σ=0.1" / "mask=10" / "trial=3"
  pattern: number[];
  winner: WinnerResult;
}

interface RunReport {
  tab: TabId;
  basePattern: number[];
  trials: TrialResult[];
  // Tab-specific aggregate.
  consistency?: number;     // 같은 cluster 비율 0..1 (a/b)
  marginByVariant?: Record<string, { mean: number; std: number; n: number }>; // c/d
}

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

// Box-Muller — 가우시안 노이즈.
function gaussian(stddev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1 || 1e-9)) * Math.cos(2 * Math.PI * u2);
  return z * stddev;
}

function addNoise(pattern: number[], sigma: number): number[] {
  return pattern.map((v) => clamp01(v + gaussian(sigma)));
}

function maskPattern(pattern: number[], maskCount: number): number[] {
  const out = pattern.slice();
  const idx = Array.from({ length: 16 }, (_, i) => i);
  // Fisher-Yates partial shuffle.
  for (let i = 0; i < Math.min(maskCount, 16); i += 1) {
    const j = i + Math.floor(Math.random() * (16 - i));
    [idx[i], idx[j]] = [idx[j], idx[i]];
    out[idx[i]] = 0;
  }
  return out;
}

function csvFromReport(report: RunReport): string {
  const lines: string[] = [];
  lines.push('# tab,base_pattern');
  lines.push(`${report.tab},${report.basePattern.map((v) => v.toFixed(3)).join(';')}`);
  lines.push('');
  lines.push('# trial_idx,variant,winner,margin,confidence,clusterRates,pattern');
  for (const t of report.trials) {
    const rates = t.winner.clusterRates.map((v) => v.toFixed(2)).join(';');
    const pat = t.pattern.map((v) => v.toFixed(3)).join(';');
    lines.push(
      [
        t.trialIdx,
        t.variant,
        t.winner.cluster ?? 'null',
        t.winner.margin.toFixed(3),
        t.winner.confidence.toFixed(3),
        rates,
        pat,
      ].join(','),
    );
  }
  if (report.consistency != null) {
    lines.push('');
    lines.push(`# consistency,${report.consistency.toFixed(3)}`);
  }
  if (report.marginByVariant) {
    lines.push('');
    lines.push('# variant,margin_mean,margin_std,n');
    for (const [k, v] of Object.entries(report.marginByVariant)) {
      lines.push(`${k},${v.mean.toFixed(3)},${v.std.toFixed(3)},${v.n}`);
    }
  }
  return lines.join('\n');
}

// 16-dim 영역 사용자 입력 — slider grid (4×4).
function PatternEditor({ value, onChange }: {
  value: number[];
  onChange: (next: number[]) => void;
}) {
  const labels = [
    'curl0', 'curl1', 'curl2', 'curl3', 'curl4',
    'ang0', 'ang1', 'ang2', 'ang3', 'ang4',
    'pinch', 'spread', 'palm', 'orx', 'ory', 'roll',
  ];
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {value.map((v, i) => (
        <label key={labels[i]} className="block">
          <span className="block text-[10px] uppercase tracking-wider text-white/50">
            {labels[i]} <span className="text-white/40">{v.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={v}
            onChange={(e) => {
              const next = value.slice();
              next[i] = Number(e.target.value);
              onChange(next);
            }}
            className="w-full"
          />
        </label>
      ))}
    </div>
  );
}

function WinnerBadge({ w }: { w: WinnerResult }) {
  const cluster = w.cluster;
  const color = cluster == null
    ? 'bg-white/5 text-white/50 ring-white/10'
    : 'bg-violet-500/20 text-violet-200 ring-violet-400/40';
  return (
    <span className={`rounded px-1.5 py-0.5 text-[11px] font-mono ring-1 ${color}`}>
      {cluster == null ? 'null' : `c${cluster}`}
      <span className="ml-1 text-white/50">m={w.margin.toFixed(2)}</span>
    </span>
  );
}

export default function ValidationPanel({ open, onClose }: ValidationPanelProps) {
  const [tab, setTab] = useState<TabId>('a');
  const [basePattern, setBasePattern] = useState<number[]>(() =>
    Array.from({ length: 16 }, () => 0.5),
  );
  const [trials, setTrials] = useState<number>(5);
  const [running, setRunning] = useState(false);
  const [report, setReport] = useState<RunReport | null>(null);
  const [status, setStatus] = useState<string>('');
  const cancelRef = useRef(false);

  const inject = useCallback(async (pattern: number[]): Promise<WinnerResult> => {
    const r = await getClient().injectPattern(pattern, { stdp: false });
    if (!r.ok) {
      console.warn('[validation] inject_feature16 failed', r.reason);
      return {
        cluster: null,
        clusterRates: new Array(CLUSTER_COUNT).fill(0),
        clusterCounts: new Array(CLUSTER_COUNT).fill(0),
        confidence: 0,
        margin: 0,
        max: 0,
        total: 0,
        source: 'fallback',
      };
    }
    const out = r.data.out_rates ?? {};
    return deriveWinner(out, {
      marginThreshold: WINNER_MARGIN_DEFAULT,
      clusterRates: r.data.cluster_rates ?? null,
      winnerCluster: r.data.winner_cluster ?? null,
      winnerMargin: r.data.winner_margin ?? null,
    });
  }, []);

  const run = useCallback(async () => {
    if (running) return;
    setRunning(true);
    cancelRef.current = false;
    setReport(null);
    setStatus(`running ${tab} (trials=${trials})…`);
    const collected: TrialResult[] = [];
    try {
      if (tab === 'a' || tab === 'e') {
        // a) reproduction — 동일 pattern N회.  e) MediaPipe-free — slider pattern 1회 (or N회).
        for (let i = 0; i < trials; i += 1) {
          if (cancelRef.current) break;
          const winner = await inject(basePattern);
          collected.push({
            trialIdx: i,
            variant: tab === 'a' ? `trial=${i}` : `slider=${i}`,
            pattern: basePattern,
            winner,
          });
          setStatus(`${tab}: trial ${i + 1}/${trials}…`);
        }
      } else if (tab === 'b') {
        // generalization — σ=0.05 jitter 변종.
        for (let i = 0; i < trials; i += 1) {
          if (cancelRef.current) break;
          const variant = addNoise(basePattern, 0.05);
          const winner = await inject(variant);
          collected.push({
            trialIdx: i,
            variant: `jitter=0.05/#${i}`,
            pattern: variant,
            winner,
          });
          setStatus(`b: jitter ${i + 1}/${trials}…`);
        }
      } else if (tab === 'c') {
        // noise robustness — σ ∈ {0.1, 0.2, 0.3}, 각 σ 영역 trial 회.
        const sigmas = [0.1, 0.2, 0.3];
        let idx = 0;
        for (const sigma of sigmas) {
          for (let i = 0; i < trials; i += 1) {
            if (cancelRef.current) break;
            const variant = addNoise(basePattern, sigma);
            const winner = await inject(variant);
            collected.push({
              trialIdx: idx,
              variant: `σ=${sigma}`,
              pattern: variant,
              winner,
            });
            idx += 1;
            setStatus(`c: σ=${sigma} trial ${i + 1}/${trials}…`);
          }
          if (cancelRef.current) break;
        }
      } else if (tab === 'd') {
        // partial cue — mask ∈ {5, 10, 15}.
        const masks = [5, 10, 15];
        let idx = 0;
        for (const m of masks) {
          for (let i = 0; i < trials; i += 1) {
            if (cancelRef.current) break;
            const variant = maskPattern(basePattern, m);
            const winner = await inject(variant);
            collected.push({
              trialIdx: idx,
              variant: `mask=${m}`,
              pattern: variant,
              winner,
            });
            idx += 1;
            setStatus(`d: mask=${m} trial ${i + 1}/${trials}…`);
          }
          if (cancelRef.current) break;
        }
      }

      // Aggregate.
      const aggregate: Partial<RunReport> = {};
      if (tab === 'a' || tab === 'b' || tab === 'e') {
        const winners = collected.map((t) => t.winner.cluster).filter((c): c is number => c != null);
        if (winners.length > 0) {
          const mode = mostCommon(winners);
          aggregate.consistency = winners.filter((c) => c === mode).length / collected.length;
        } else {
          aggregate.consistency = 0;
        }
      }
      if (tab === 'c' || tab === 'd') {
        const byVariant: Record<string, number[]> = {};
        for (const t of collected) {
          (byVariant[t.variant] ??= []).push(t.winner.margin);
        }
        const out: RunReport['marginByVariant'] = {};
        for (const [k, arr] of Object.entries(byVariant)) {
          const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
          const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length;
          out[k] = { mean, std: Math.sqrt(variance), n: arr.length };
        }
        aggregate.marginByVariant = out;
      }

      const final: RunReport = {
        tab,
        basePattern: basePattern.slice(),
        trials: collected,
        ...aggregate,
      };
      setReport(final);
      console.log(`[validation] ${tab} done`, final);
      setStatus(`✓ ${tab} done — ${collected.length} trials`);
    } catch (err) {
      console.error('[validation] error', err);
      setStatus(`✗ error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setRunning(false);
    }
  }, [tab, trials, basePattern, inject, running]);

  const cancel = () => { cancelRef.current = true; };

  const exportCsv = useCallback(async () => {
    if (!report) return;
    const csv = csvFromReport(report);
    try {
      await navigator.clipboard.writeText(csv);
      setStatus(`✓ csv → clipboard (${csv.length} chars)`);
    } catch {
      // Fallback — alert blob (사용자 영역 manual paste).
      console.log('[validation] CSV (clipboard 영역 catch):', csv);
      setStatus('✗ clipboard 영역 catch — console 영역 dump');
    }
  }, [report]);

  const tabDef = useMemo(() => TABS.find((t) => t.id === tab)!, [tab]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="m-4 max-h-[92vh] w-[760px] max-w-full overflow-y-auto rounded border border-white/10 bg-[#0f1117] p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-violet-300">VALIDATION (a–e)</span>
          <button
            type="button"
            aria-label="Close validation"
            onClick={onClose}
            className="rounded px-1.5 text-white/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/60"
          >
            ✕
          </button>
        </div>

        {/* Tab bar */}
        <div className="mb-3 flex flex-wrap gap-1 border-b border-white/10 pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTab(t.id); setReport(null); }}
              className={
                'rounded px-2 py-1 text-[11px] ring-1 transition-colors '
                + (tab === t.id
                  ? 'bg-violet-500/25 text-violet-200 ring-violet-400/40'
                  : 'bg-white/5 text-white/60 ring-white/10 hover:bg-white/10')
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mb-3 text-[11px] text-white/60">{tabDef.desc}</div>

        {/* Pattern editor */}
        <div className="mb-3 rounded border border-white/10 bg-black/20 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-white/50">Base 16-feat pattern</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setBasePattern(Array.from({ length: 16 }, () => 0.5))}
                className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/70 ring-1 ring-white/10 hover:bg-white/10"
              >
                reset (0.5)
              </button>
              <button
                type="button"
                onClick={() => setBasePattern(Array.from({ length: 16 }, () => Math.random()))}
                className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/70 ring-1 ring-white/10 hover:bg-white/10"
              >
                random
              </button>
            </div>
          </div>
          <PatternEditor value={basePattern} onChange={setBasePattern} />
        </div>

        {/* Run controls */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-1 text-[11px] text-white/60">
            trials
            <input
              type="number"
              min={1}
              max={50}
              value={trials}
              onChange={(e) => setTrials(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              className="w-14 rounded border border-white/10 bg-black/30 px-1.5 py-0.5 text-xs text-white outline-none focus:border-violet-400/50"
            />
          </label>
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="rounded bg-violet-500/25 px-3 py-1 text-xs text-violet-200 ring-1 ring-violet-400/40 hover:bg-violet-500/35 disabled:opacity-50"
          >
            {running ? 'running…' : 'Run'}
          </button>
          {running && (
            <button
              type="button"
              onClick={cancel}
              className="rounded bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10"
            >
              cancel
            </button>
          )}
          <button
            type="button"
            onClick={exportCsv}
            disabled={!report}
            className="rounded bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10 disabled:opacity-50"
          >
            CSV → clipboard
          </button>
          <span className="ml-auto break-all font-mono text-[11px] text-white/50">{status}</span>
        </div>

        {/* Result */}
        {report && (
          <div className="rounded border border-white/10 bg-black/20 p-3">
            {report.consistency != null && (
              <div className="mb-2 text-[11px] text-white/70">
                consistency: <span className="font-mono text-white">{(report.consistency * 100).toFixed(1)}%</span>
                <span className="ml-2 text-white/50">(같은 cluster 비율 / null 제외)</span>
              </div>
            )}
            {report.marginByVariant && (
              <div className="mb-2 text-[11px] text-white/70">
                margin by variant:
                <ul className="mt-1 ml-3 list-disc">
                  {Object.entries(report.marginByVariant).map(([k, v]) => (
                    <li key={k} className="font-mono">
                      {k}: mean={v.mean.toFixed(3)} std={v.std.toFixed(3)} n={v.n}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-2 max-h-64 overflow-y-auto">
              <table className="w-full text-[11px]">
                <thead className="sticky top-0 bg-[#0f1117] text-white/50">
                  <tr>
                    <th className="px-1 py-0.5 text-left">#</th>
                    <th className="px-1 py-0.5 text-left">variant</th>
                    <th className="px-1 py-0.5 text-left">winner</th>
                    <th className="px-1 py-0.5 text-left">cluster_rates</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-white/80">
                  {report.trials.map((t) => (
                    <tr key={t.trialIdx} className="border-t border-white/5">
                      <td className="px-1 py-0.5">{t.trialIdx}</td>
                      <td className="px-1 py-0.5">{t.variant}</td>
                      <td className="px-1 py-0.5"><WinnerBadge w={t.winner} /></td>
                      <td className="px-1 py-0.5 text-white/60">
                        [{t.winner.clusterRates.map((v) => v.toFixed(1)).join(', ')}]
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-3 text-[10px] leading-relaxed text-white/40">
          모든 호출 영역 inject_feature16(stdp=false) — 학습 영향 0. backend cluster_rates / winner_cluster
          / winner_margin 영역 동봉 영역 그것 우선, 미동봉 영역 frontend out_rates fallback.
        </div>
      </div>
    </div>
  );
}

function mostCommon(arr: number[]): number {
  const counts = new Map<number, number>();
  for (const v of arr) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best = arr[0];
  let bestN = 0;
  for (const [k, n] of counts) {
    if (n > bestN) { best = k; bestN = n; }
  }
  return best;
}
