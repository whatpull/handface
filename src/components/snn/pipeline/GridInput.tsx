'use client';

// GridInput — 4×4 픽셀 grid orientation 입력 (path Y, 2026-05-07).
// camera/MediaPipe 자세 분류 폐기 path — 16 픽셀 click toggle + 4 preset (─ │ ╱ ╲)
// + R-STDP 학습 (cluster_train_rstdp) + inject_feature16 추론.
//
// 학습 cluster 매핑 (사용자 명시):
//   0 = horizontal (─)  row 1
//   1 = vertical   (│)  col 1
//   2 = diag-back  (╲)  top-left → bottom-right
//   3 = diag-fore  (╱)  top-right → bottom-left

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { emitBackendEvent, type GridTrainingDetail, type GridInferDetail, type NeuronFiringDetail } from '@/lib/backend/events';

export const ORIENTATION_LABELS = ['─ horizontal', '│ vertical', '╲ diag-back', '╱ diag-fore'] as const;
export const ORIENTATION_GLYPHS = ['─', '│', '╲', '╱'] as const;

// 16-dim preset pattern — row-major 4×4 grid.
export const ORIENTATION_PRESETS: ReadonlyArray<readonly number[]> = [
  // ─ horizontal: row 1 (index 4..7)
  [0, 0, 0, 0,  1, 1, 1, 1,  0, 0, 0, 0,  0, 0, 0, 0],
  // │ vertical: col 1 (index 1, 5, 9, 13)
  [0, 1, 0, 0,  0, 1, 0, 0,  0, 1, 0, 0,  0, 1, 0, 0],
  // ╲ diag-back: top-left → bottom-right (0, 5, 10, 15)
  [1, 0, 0, 0,  0, 1, 0, 0,  0, 0, 1, 0,  0, 0, 0, 1],
  // ╱ diag-fore: top-right → bottom-left (3, 6, 9, 12)
  [0, 0, 0, 1,  0, 0, 1, 0,  0, 1, 0, 0,  1, 0, 0, 0],
] as const;

type Status =
  | { kind: 'idle' }
  | { kind: 'building' }
  | { kind: 'training'; cluster: number }
  | { kind: 'inferring' }
  | { kind: 'ok'; message: string }
  | { kind: 'error'; message: string };

interface InferResult {
  cluster: number | null;
  rates: number[];
  margin: number;
}

const TRAIN_FRAMES = 30;
const TRAIN_CHUNK = 5;  // 5 frame × 6 chunk = 30 frame — 진행 중 progress 갱신.

function emptyGrid(): number[] {
  return new Array<number>(16).fill(0);
}

export default function GridInput() {
  const [grid, setGrid] = useState<number[]>(() => emptyGrid());
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [infer, setInfer] = useState<InferResult | null>(null);
  // orientation 회로가 빌드되었는지 — 첫 학습 호출 시 자동 빌드 1회.
  const substrateBuiltRef = useRef<boolean>(false);

  const togglePixel = useCallback((i: number) => {
    setGrid((g) => {
      const next = g.slice();
      next[i] = next[i] > 0.5 ? 0 : 1;
      return next;
    });
  }, []);

  const applyPreset = useCallback((idx: number) => {
    setGrid(ORIENTATION_PRESETS[idx].slice());
    setInfer(null);
  }, []);

  const reset = useCallback(() => {
    setGrid(emptyGrid());
    setInfer(null);
    setStatus({ kind: 'idle' });
  }, []);

  const buildSubstrate = useCallback(async () => {
    setStatus({ kind: 'building' });
    const r = await getClient().presetOrientation({ overwrite: true });
    if (r.ok) {
      substrateBuiltRef.current = true;
      setStatus({ kind: 'ok', message: 'orientation 회로 빌드 완료' });
    } else {
      setStatus({ kind: 'error', message: `회로 빌드 실패: ${r.reason}` });
    }
  }, []);

  const trainPreset = useCallback(async (clusterIdx: 0 | 1 | 2 | 3) => {
    const pattern = ORIENTATION_PRESETS[clusterIdx];
    setStatus({ kind: 'training', cluster: clusterIdx });
    emitBackendEvent<GridTrainingDetail>('grid-training', {
      kind: 'started', cluster: clusterIdx,
      framesDone: 0, framesTotal: TRAIN_FRAMES,
    });
    const client = getClient();
    // orientation 회로 빌드 — 첫 학습 호출 시 자동 1회.
    if (!substrateBuiltRef.current) {
      const built = await client.presetOrientation({ overwrite: true });
      if (!built.ok) {
        setStatus({ kind: 'error', message: `회로 빌드 실패: ${built.reason}` });
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'error', cluster: clusterIdx, message: built.reason,
        });
        return;
      }
      substrateBuiltRef.current = true;
    }
    // 사용자 catch 2026-05-07: 30 frame batch 1회 호출 → 진행 중 progress 0.
    // chunk 단위 (5 × 6 회) 호출 — chunk 끝마다 progress broadcast → NodeLearn
    // 의 cluster bar 가 5 frame 단위로 갱신.
    let totalCorrect = 0;
    let totalTrained = 0;
    for (let chunk = 0; chunk < TRAIN_FRAMES; chunk += TRAIN_CHUNK) {
      const size = Math.min(TRAIN_CHUNK, TRAIN_FRAMES - chunk);
      const patterns = Array.from({ length: size }, () => pattern.slice());
      const r = await client.clusterTrainRStdp(patterns, clusterIdx);
      if (!r.ok) {
        setStatus({ kind: 'error', message: `학습 실패: ${r.reason}` });
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'error', cluster: clusterIdx, message: r.reason,
        });
        return;
      }
      totalCorrect += r.data.correct;
      totalTrained += r.data.trained;
      const framesDone = chunk + size;
      emitBackendEvent<GridTrainingDetail>('grid-training', {
        kind: 'progress', cluster: clusterIdx,
        framesDone, framesTotal: TRAIN_FRAMES,
      });
      // V1/V2 갱신 — 학습 chunk 의 firing data 를 cluster_rates / winner
      // strip 후 emit. NodeLearn 의 region useEffect 가 active count 갱신.
      if (r.data.rates_by_region || r.data.active_neurons_by_region) {
        emitBackendEvent<NeuronFiringDetail>('neuron-firing', {
          rates_by_region: r.data.rates_by_region,
          active_neurons_by_region: r.data.active_neurons_by_region,
          // cluster_rates / winner_cluster 는 의도적으로 omit — INFER 노드 영향 방지.
        });
      }
    }
    const accuracy = totalTrained > 0 ? totalCorrect / totalTrained : 0;
    const accPct = (accuracy * 100).toFixed(0);
    setStatus({
      kind: 'ok',
      message: `${ORIENTATION_GLYPHS[clusterIdx]} ${accPct}% (${totalCorrect}/${totalTrained})`,
    });
    emitBackendEvent<GridTrainingDetail>('grid-training', {
      kind: 'finished',
      cluster: clusterIdx,
      accuracy,
      correct: totalCorrect,
      trained: totalTrained,
      framesDone: TRAIN_FRAMES,
      framesTotal: TRAIN_FRAMES,
    });
  }, []);

  const runInfer = useCallback(async () => {
    setStatus({ kind: 'inferring' });
    setInfer(null);
    emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'started' });
    const r = await getClient().injectPattern(grid, { stdp: false });
    if (r.ok) {
      const rates = r.data.cluster_rates ?? [];
      const cluster = r.data.winner_cluster ?? null;
      const margin = r.data.winner_margin ?? 0;
      setInfer({ cluster, rates, margin });
      const winnerCluster = cluster !== null && cluster >= 0 && cluster <= 3
        ? (cluster as 0 | 1 | 2 | 3)
        : null;
      if (cluster !== null) {
        setStatus({
          kind: 'ok',
          message: `winner: ${ORIENTATION_GLYPHS[cluster]} (margin ${(margin * 100).toFixed(0)}%)`,
        });
      } else {
        setStatus({ kind: 'ok', message: '추론 완료 — winner 없음 (WTA tie)' });
      }
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'finished', winnerCluster });
    } else {
      setStatus({ kind: 'error', message: `추론 실패: ${r.reason}` });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: r.reason });
    }
  }, [grid]);

  const isBusy = status.kind === 'building' || status.kind === 'training' || status.kind === 'inferring';

  const statusLine = useMemo(() => {
    switch (status.kind) {
      case 'idle': return '대기 중';
      case 'building': return '회로 빌드 중…';
      case 'training': return `${ORIENTATION_GLYPHS[status.cluster]} 학습 중 (${TRAIN_FRAMES} frame)…`;
      case 'inferring': return '추론 중…';
      case 'ok': return status.message;
      case 'error': return status.message;
    }
  }, [status]);

  return (
    <div className="snn-grid-input">
      <button
        type="button"
        className="snn-grid-build-btn"
        onClick={buildSubstrate}
        disabled={isBusy}
      >
        회로 빌드 (orientation)
      </button>

      <div className="snn-grid-pixels" aria-label="4x4 orientation grid">
        {grid.map((v, i) => (
          <button
            key={i}
            type="button"
            className={`snn-grid-pixel ${v > 0.5 ? 'is-on' : ''}`}
            onClick={() => togglePixel(i)}
            disabled={isBusy}
            aria-label={`pixel ${i} — ${v > 0.5 ? 'on' : 'off'}`}
          />
        ))}
      </div>

      <div className="snn-grid-presets">
        {ORIENTATION_LABELS.map((label, i) => (
          <div key={i} className="snn-grid-preset-row">
            <button
              type="button"
              className="snn-grid-preset-btn"
              onClick={() => applyPreset(i)}
              disabled={isBusy}
              title={label}
            >
              <span className="snn-grid-preset-glyph">{ORIENTATION_GLYPHS[i]}</span>
              <span className="snn-grid-preset-label">cluster {i}</span>
            </button>
            <button
              type="button"
              className="snn-grid-train-btn"
              onClick={() => trainPreset(i as 0 | 1 | 2 | 3)}
              disabled={isBusy}
              title={`R-STDP 학습 — ${label}`}
            >
              학습
            </button>
          </div>
        ))}
      </div>

      <div className="snn-grid-actions">
        <button
          type="button"
          className="snn-grid-infer-btn"
          onClick={runInfer}
          disabled={isBusy}
        >
          추론
        </button>
        <button
          type="button"
          className="snn-grid-reset-btn"
          onClick={reset}
          disabled={isBusy}
        >
          Reset
        </button>
      </div>

      <div className={`snn-grid-status snn-grid-status--${status.kind}`}>
        {isBusy && <span className="snn-pipeline-tick-spinner" aria-hidden />}
        <span>{statusLine}</span>
      </div>

      {infer && (
        <div className="snn-grid-rates" aria-label="cluster rates">
          {infer.rates.map((rate, i) => (
            <GridRateBar
              key={i}
              glyph={ORIENTATION_GLYPHS[i]}
              rate={rate}
              max={Math.max(...infer.rates, 1)}
              isWinner={infer.cluster === i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GridRateBar({ glyph, rate, max, isWinner }:
  { glyph: string; rate: number; max: number; isWinner: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      const pct = max > 0 ? Math.min(100, (rate / max) * 100) : 0;
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [rate, max]);
  return (
    <div className={`snn-grid-rate-row ${isWinner ? 'is-winner' : ''}`}>
      <span className="snn-grid-rate-label">{glyph}</span>
      <div className="snn-grid-rate-bar">
        <div ref={fillRef} className="snn-mode-progress-fill snn-pipeline-fill-cyan" />
      </div>
      <span className="snn-grid-rate-value">{rate.toFixed(0)}</span>
    </div>
  );
}
