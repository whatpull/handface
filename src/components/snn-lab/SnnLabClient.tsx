'use client';
// SnnLabClient — LocalSNN end-to-end 데모 + ART 동적 cluster expansion.
//
// 백엔드 round-trip 없이 브라우저 안에서:
//  - 회로 빌드 (4 base cluster: ─│╲╱)
//  - 4×4 grid 자극 → STDP 학습 → cluster 발화율 표시
//  - 사용자 정의 패턴으로 새 cluster 슬롯 동적 추가 (ART vigilance)
//  - localStorage 영속화

import { useEffect, useMemo, useRef, useState } from 'react';

import type { InjectEvent } from '@/lib/snn-runtime';

import { useLocalSnn } from './useLocalSnn';

// 기본 4 cluster — n13_orientation 빌더의 default 와 정합.
const BASE_PATTERNS: number[][] = [
  [4, 5, 6, 7], // ─ horizontal
  [1, 5, 9, 13], // │ vertical
  [0, 5, 10, 15], // ╲ diag-back
  [3, 6, 9, 12], // ╱ diag-fore
];
const BASE_LABELS: string[] = ['─', '│', '╲', '╱'];

const RUN_MS = 50;
const STIM_DURATION_MS = 30;
const STIM_WEIGHT = 28;
const TRAIN_FRAMES_PER_BUTTON = 6;
const MAX_USER_CLUSTERS = 4; // 안전 한도 — 메모리 / UI 가독성.

function formatTimestamp(ms: number | null): string {
  if (ms === null) return '저장 전';
  const d = new Date(ms);
  return `${d.toLocaleTimeString()}`;
}

interface ClusterEntry {
  id: number;
  label: string;
  pattern: number[];
}

// HF Spaces 기본 URL — 사용자 측 secret 등록되어 있으면 /persist/* 동작.
const DEFAULT_HF_SPACES_URL = 'https://whatpull-neuronface.hf.space';

export default function SnnLabClient() {
  const [useWorker, setUseWorker] = useState(false);
  const [useHfSink, setUseHfSink] = useState(false);
  const [hfHealth, setHfHealth] = useState<{
    backend: 'hf' | 'memory';
    repo_id: string | null;
    persistent: boolean;
    auto_persist?: boolean;
  } | null>(null);
  const [hfHealthError, setHfHealthError] = useState<string | null>(null);
  const lab = useLocalSnn({
    netId: 'snn-lab-default',
    seed: 57,
    useWorker,
    sinkKind: useHfSink ? 'hf-dataset' : 'local-storage',
    hfSpacesUrl: useHfSink ? DEFAULT_HF_SPACES_URL : undefined,
  });

  // HF 토글 ON 시 backend 가 HFHubStore 인지 (HF_PERSIST_REPO 등록 여부)
  // probe. memory fallback 이면 사용자에게 명확히 알림 — 데이터 휘발 catch.
  useEffect(() => {
    if (!useHfSink) {
      setHfHealth(null);
      setHfHealthError(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${DEFAULT_HF_SPACES_URL}/persist/health`);
        if (!res.ok) {
          if (!cancelled) {
            setHfHealth(null);
            setHfHealthError(`backend health ${res.status}`);
          }
          return;
        }
        const data = (await res.json()) as {
          backend: 'hf' | 'memory';
          repo_id: string | null;
          persistent: boolean;
          auto_persist?: boolean;
        };
        if (!cancelled) {
          setHfHealth(data);
          setHfHealthError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setHfHealth(null);
          setHfHealthError(e instanceof Error ? e.message : String(e));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [useHfSink]);

  // 처음 4 base cluster 는 빌더 default. expansion 마다 user 추가.
  const [clusters, setClusters] = useState<ClusterEntry[]>(() =>
    BASE_PATTERNS.map((pattern, id) => ({ id, label: BASE_LABELS[id], pattern })),
  );
  const [activePattern, setActivePattern] = useState<Set<number>>(() => new Set(BASE_PATTERNS[0]));
  const [busy, setBusy] = useState(false);
  const [rates, setRates] = useState<number[]>([0, 0, 0, 0]);
  const [winner, setWinner] = useState<{ cluster: number; share: number; margin: number }>(
    {
      cluster: -1,
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

  // build/reset 시 cluster 목록을 base 4개로 되돌림.
  useEffect(() => {
    if (lab.status?.rev === 0 && clusters.length !== BASE_PATTERNS.length) {
      setClusters(BASE_PATTERNS.map((pattern, id) => ({ id, label: BASE_LABELS[id], pattern })));
    }
    // status.rev / clusters.length 만 deps 로 — 무한 loop 회피.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lab.status?.rev]);

  const buildInjectEvents = (activeIdx: number[]): InjectEvent[] =>
    activeIdx.map((i) => ({
      neuron: `in_feat_${i}`,
      weight: STIM_WEIGHT,
      time: 0,
      durationMs: STIM_DURATION_MS,
      stepMs: 0.1,
    }));

  const measure = async () => {
    const r = await lab.clusterFiringRates({ windowMs: RUN_MS, layer: 'OUT' });
    setRates(r.rates);
    setWinner({ cluster: r.winner, share: r.share, margin: r.margin });
    return r;
  };

  const onInfer = async () => {
    if (!lab.ready || busy) return;
    setBusy(true);
    try {
      const pattern = Array.from(activePattern).sort((a, b) => a - b);
      await lab.inject(buildInjectEvents(pattern));
      await lab.run({ durationMs: RUN_MS, dtMs: 0.1, stdpEnabled: false });
      const r = await measure();
      appendLog(
        `infer pattern=[${pattern.join(',')}] winner=${r.winner === -1 ? 'silent' : r.winner} share=${r.share.toFixed(2)} margin=${r.margin.toFixed(2)}`,
      );
    } finally {
      setBusy(false);
    }
  };

  const onTrain = async (cluster: ClusterEntry) => {
    if (!lab.ready || busy) return;
    setBusy(true);
    try {
      for (let i = 0; i < TRAIN_FRAMES_PER_BUTTON; i += 1) {
        await lab.inject(buildInjectEvents(cluster.pattern));
        await lab.run({ durationMs: RUN_MS, dtMs: 0.1, stdpEnabled: true, stdpGain: 1.0 });
      }
      const r = await measure();
      appendLog(
        `train ${cluster.label} (id=${cluster.id}) ×${TRAIN_FRAMES_PER_BUTTON} → winner=${r.winner === -1 ? 'silent' : r.winner} share=${r.share.toFixed(2)}`,
      );
    } finally {
      setBusy(false);
    }
  };

  const onExpand = async () => {
    if (!lab.ready || busy) return;
    if (clusters.length >= BASE_PATTERNS.length + MAX_USER_CLUSTERS) {
      appendLog(`expand 거부 — 최대 ${BASE_PATTERNS.length + MAX_USER_CLUSTERS} cluster 한도`);
      return;
    }
    const pattern = Array.from(activePattern).sort((a, b) => a - b);
    if (pattern.length === 0) {
      appendLog('expand 거부 — pattern 비어있음');
      return;
    }
    setBusy(true);
    try {
      const r = await lab.expandCluster({ activeInputs: pattern, seed: Date.now() });
      if (!r) {
        appendLog('expand 실패 — client 미준비');
        return;
      }
      const userIdx = clusters.length - BASE_PATTERNS.length + 1; // U1, U2, …
      setClusters((prev) => [
        ...prev,
        { id: r.newClusterId, label: `U${userIdx}`, pattern },
      ]);
      setRates(new Array(r.totalClusters).fill(0));
      appendLog(
        `expand → cluster ${r.newClusterId} (U${userIdx}) pattern=[${pattern.join(',')}] +${r.neuronsAdded} neurons +${r.synapsesAdded} synapses`,
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
      setClusters(BASE_PATTERNS.map((pattern, id) => ({ id, label: BASE_LABELS[id], pattern })));
      setRates([0, 0, 0, 0]);
      setWinner({ cluster: -1, share: 0, margin: 0 });
      appendLog('reset → rev=0, clusters=4');
    } finally {
      setBusy(false);
    }
  };

  const grid = useMemo(() => {
    const cells: number[] = Array.from({ length: 16 }, (_, i) => i);
    return cells.map((i) => ({ idx: i, on: activePattern.has(i) }));
  }, [activePattern]);

  const toggleCell = (idx: number) => {
    setActivePattern((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const setPatternFromCluster = (cluster: ClusterEntry) =>
    setActivePattern(new Set(cluster.pattern));

  return (
    <div className="min-h-screen p-6 bg-[#0a0a0c] text-white">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">SNN Lab — LocalSNN + ART 동적 성장</h1>
          <p className="text-sm text-white/70 mt-1">
            백엔드 round-trip 없이 브라우저 안에서 회로 빌드 → 자극 → STDP → 가중치 영속화 +
            <span className="ml-1 text-amber-200">ART vigilance 기반 cluster 동적 추가</span>.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 text-sm text-white/80">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useWorker}
              onChange={(e) => setUseWorker(e.target.checked)}
              disabled={busy}
              className="accent-blue-400"
            />
            <span>Web Worker 모드</span>
            <span className="text-xs text-white/50">({lab.transportKind ?? '대기'})</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useHfSink}
              onChange={(e) => setUseHfSink(e.target.checked)}
              disabled={busy}
              className="accent-emerald-400"
            />
            <span>HF Dataset 영속화</span>
            <span className="text-xs text-white/50">
              ({useHfSink ? 'hf-dataset' : 'local-storage'})
            </span>
          </label>
          {useHfSink && hfHealth && !hfHealth.persistent && (
            <div className="text-xs text-amber-300/90 bg-amber-900/30 border border-amber-700/40 rounded px-2 py-1">
              ⚠ backend MemoryStore — HF_PERSIST_REPO 미설정. UI 동작은
              정상이나 컨테이너 재시작 시 휘발. HF Spaces secrets 에서
              HF_PERSIST_REPO + HF_TOKEN 등록 후 사용 권장.
            </div>
          )}
          {useHfSink && hfHealth && hfHealth.persistent && (
            <div className="text-xs text-emerald-300/90 bg-emerald-900/20 border border-emerald-700/30 rounded px-2 py-1">
              ✓ HF Dataset 영속 ({hfHealth.repo_id})
              {hfHealth.auto_persist && (
                <span className="ml-1 text-emerald-200">· auto-sync 활성</span>
              )}
              {hfHealth.auto_persist === false && (
                <span className="ml-1 text-amber-200">
                  · auto-sync 꺼짐 (NEURONFACE_AUTO_PERSIST=false)
                </span>
              )}
            </div>
          )}
          {useHfSink && hfHealthError && (
            <div className="text-xs text-rose-300/90 bg-rose-900/30 border border-rose-700/40 rounded px-2 py-1">
              ✗ health 확인 실패: {hfHealthError}
            </div>
          )}
        </div>
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
                <dt className="text-white/50">clusters</dt>
                <dd>
                  {clusters.length}{' '}
                  <span className="text-white/40 text-xs">
                    (base {BASE_PATTERNS.length} + user {clusters.length - BASE_PATTERNS.length})
                  </span>
                </dd>
                <dt className="text-white/50">neurons</dt>
                <dd>{lab.status.neurons}</dd>
                <dt className="text-white/50">last save</dt>
                <dd>{formatTimestamp(lab.status.lastSavedAt)}</dd>
              </dl>
            )}
          </div>

          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-white/50 mb-3">
              4×4 Pattern <span className="text-white/40">(클릭으로 토글)</span>
            </div>
            <div className="grid grid-cols-4 gap-1 max-w-[10rem]">
              {grid.map((c) => (
                <button
                  key={c.idx}
                  type="button"
                  onClick={() => toggleCell(c.idx)}
                  disabled={busy}
                  className={`aspect-square rounded ${
                    c.on ? 'bg-amber-300' : 'bg-white/10 hover:bg-white/20'
                  }`}
                  title={`in_feat_${c.idx}`}
                  aria-label={`feature ${c.idx} ${c.on ? 'on' : 'off'}`}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-sm">
              {clusters.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setPatternFromCluster(c)}
                  disabled={busy}
                  className="px-2 py-1 border border-white/20 rounded hover:bg-white/10"
                >
                  {c.label} ({c.id})
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
              {clusters.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onTrain(c)}
                  disabled={!lab.ready || busy}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 rounded"
                >
                  Train {c.label}
                </button>
              ))}
              <button
                type="button"
                onClick={onExpand}
                disabled={
                  !lab.ready ||
                  busy ||
                  activePattern.size === 0 ||
                  clusters.length >= BASE_PATTERNS.length + MAX_USER_CLUSTERS
                }
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 rounded text-black font-medium"
              >
                + Cluster (ART)
              </button>
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
            <div className="text-xs text-white/40">
              + Cluster: 현재 4×4 pattern 으로 새 cluster slot 추가 (max{' '}
              {BASE_PATTERNS.length + MAX_USER_CLUSTERS}).
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-white/50 mb-3">
              Cluster firing rate (Hz, last {RUN_MS} ms · OUT layer)
            </div>
            <div className="space-y-2">
              {clusters.map((c, idx) => {
                const rate = rates[idx] ?? 0;
                const isWinner = winner.cluster === idx && winner.share > 0;
                const max = Math.max(0.1, ...rates);
                const pct = Math.min(100, (rate / max) * 100);
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="w-16 text-sm text-white/70">
                      {c.label}{' '}
                      <span className="text-white/40 text-xs">({c.id})</span>
                    </div>
                    <div className="flex-1 h-3 bg-white/10 rounded relative overflow-hidden">
                      <div
                        className={`h-3 ${
                          isWinner ? 'bg-amber-300' : 'bg-blue-400/60'
                        } transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm tabular-nums">
                      {rate.toFixed(1)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-sm text-white/60">
              winner ={' '}
              <span className="text-amber-300">
                {winner.cluster === -1
                  ? 'silent'
                  : `${clusters[winner.cluster]?.label ?? winner.cluster} (${winner.cluster})`}
              </span>
              {' · '}share = {winner.share.toFixed(2)} · margin = {winner.margin.toFixed(2)}
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Log</div>
            <div ref={logRef} className="h-48 overflow-auto font-mono text-xs leading-relaxed">
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
