'use client';

// NodeLlm — endpoint + payload preview + Test send + auto stream toggle.
// HIGH #3 정합 보존: deriveWinner 영역 단일 source — PipelineEventContext 영역 위임.
// UX 4th HIGH 정정: neuron-firing 직접 구독 영역 — context consumer 일부.
// auto stream — winner 변경 시점만 POST (cfg.auto && endpoint 영역 정합).

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  onBackendEvent,
  type HandFeatureDetail,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { CLUSTER_TO_LABEL } from '@/lib/snn/use-hand-control';
import { loadExemplars } from '@/lib/snn/out-exemplars';
import {
  buildStatePayload,
  type StatePayload,
  type WinnerHistoryEntry,
} from '@/lib/snn/state-payload';
import {
  loadLlmConfig,
  saveLlmConfig,
  sendStateToLlm,
  type LlmConfig,
  type LlmSendResult,
} from '@/lib/snn/llm-client';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import { HISTORY_MAX } from './shared';

export default function NodeLlm({
  onLlmResult,
}: {
  onLlmResult?: (r: LlmSendResult) => void;
}) {
  const [cfg, setCfg] = useState<LlmConfig>(() => loadLlmConfig());
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [feat, setFeat] = useState<HandFeatureDetail | null>(null);
  const [history, setHistory] = useState<WinnerHistoryEntry[]>([]);
  const [last, setLast] = useState<LlmSendResult | null>(null);
  const [busy, setBusy] = useState(false);

  // 직전 winner 영역 추적 — 변경 시점만 auto stream POST.
  const prevWinnerRef = useRef<number | null>(null);

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);
  useEffect(() => onBackendEvent<HandFeatureDetail>('hand-feature', setFeat), []);

  // PipelineEventContext 영역 derived winner — 4 노드 영역 공유 영역 정합.
  const { winner } = usePipelineEvents();

  // history 영역 winner 변경 시점 영역 누적.
  useEffect(() => {
    if (winner.cluster === null) {
      prevWinnerRef.current = null;
      return;
    }
    if (winner.cluster === prevWinnerRef.current) return;
    prevWinnerRef.current = winner.cluster;
    const ex = loadExemplars();
    const k0 = `out_${winner.cluster}_0`;
    const k1 = `out_${winner.cluster}`;
    const label = ex[k0]?.label ?? ex[k1]?.label ?? CLUSTER_TO_LABEL[winner.cluster];
    const entry: WinnerHistoryEntry = {
      winner: `cluster_${winner.cluster}`,
      label,
      confidence: winner.confidence,
      ts: Date.now(),
    };
    setHistory((h) => [...h.slice(-(HISTORY_MAX - 1)), entry]);
  }, [winner.cluster, winner.confidence]);

  const phaseName = phase?.phase ?? 'untrained';
  const clusterCounts = useMemo(() => {
    if (!phase) return [0, 0, 0, 0];
    return [phase.clusterFrames[0], phase.clusterFrames[1], phase.clusterFrames[2], phase.clusterFrames[3]];
  }, [phase]);

  const buildPayload = (): StatePayload => buildStatePayload({
    phase: phaseName,
    winnerCluster: winner.cluster,
    confidence: winner.confidence,
    margin: winner.margin,
    clusterRates: winner.clusterRates,
    clusterCounts,
    history,
    gestureName: feat?.gestureName ?? null,
    gestureScore: feat?.gestureScore ?? 0,
  });

  const onTest = async () => {
    if (busy) return;
    setBusy(true);
    const r = await sendStateToLlm(cfg, buildPayload());
    setLast(r);
    setBusy(false);
    onLlmResult?.(r);
  };

  // Auto stream — winner 변경 시점만 POST (cfg.auto && endpoint 영역 정합).
  useEffect(() => {
    if (!cfg.auto) return;
    if (!cfg.endpoint) return;
    if (winner.cluster === null) return;
    let cancelled = false;
    (async () => {
      const r = await sendStateToLlm(cfg, buildPayload());
      if (!cancelled) {
        setLast(r);
        onLlmResult?.(r);
      }
    })();
    return () => { cancelled = true; };
    // history 영역 useEffect 영역 winner.cluster 영역 변경 시점 영역 1회 영역.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.auto, cfg.endpoint, winner.cluster]);

  const updateCfg = (patch: Partial<LlmConfig>) => {
    setCfg((p) => {
      const next = { ...p, ...patch };
      saveLlmConfig(patch);
      return next;
    });
  };

  // payload preview — 직접 build (live). dep 영역 string 영역 stringify 영역 단순화.
  const clusterCountsKey = clusterCounts.join(',');
  const previewJson = useMemo(() => {
    try {
      return JSON.stringify(buildPayload(), null, 2);
    } catch { return '{}'; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseName, winner.cluster, winner.clusterRates, winner.confidence, winner.margin,
      clusterCountsKey, history.length, feat?.gestureName, feat?.gestureScore]);

  return (
    <NodeShell title="LLM" subtitle="외부 연동" tone="llm">

      <label className="snn-pipeline-field">
        <span className="snn-pipeline-field-label">endpoint</span>
        <input
          type="url"
          className="snn-pipeline-input-field"
          value={cfg.endpoint}
          placeholder="https://api.example.com/webhook"
          onChange={(e) => updateCfg({ endpoint: e.target.value })}
        />
      </label>
      <label className="snn-pipeline-field">
        <span className="snn-pipeline-field-label">api key</span>
        <input
          type="password"
          className="snn-pipeline-input-field"
          value={cfg.apiKey}
          placeholder="Bearer token (optional)"
          onChange={(e) => updateCfg({ apiKey: e.target.value })}
        />
      </label>
      <label className="snn-pipeline-toggle">
        <input
          type="checkbox"
          checked={cfg.auto}
          onChange={(e) => updateCfg({ auto: e.target.checked })}
        />
        <span>auto stream (winner 변경 시 POST)</span>
      </label>
      <details className="snn-pipeline-details">
        <summary>payload preview</summary>
        <pre className="snn-pipeline-pre">{previewJson}</pre>
      </details>
      <button
        type="button"
        className="snn-pipeline-btn"
        onClick={onTest}
        disabled={busy || !cfg.endpoint}
      >
        {busy ? 'sending…' : 'Test send'}
      </button>
      {last && (
        <div className={`snn-pipeline-llm-result ${last.ok ? 'is-ok' : 'is-fail'}`}>
          <div className="snn-pipeline-row">
            <span className="snn-pipeline-row-label">status</span>
            <span className="snn-pipeline-row-value snn-pipeline-mono">
              {last.ok ? `${last.status}` : (last.error || `HTTP ${last.status}`)}
              {' · '}
              {last.latencyMs}ms
            </span>
          </div>
          {last.body && (
            <details className="snn-pipeline-details">
              <summary>response</summary>
              <pre className="snn-pipeline-pre">{last.body}</pre>
            </details>
          )}
        </div>
      )}
    </NodeShell>
  );
}
