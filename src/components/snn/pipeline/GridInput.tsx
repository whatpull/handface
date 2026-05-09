'use client';

// GridInput — 4×4 픽셀 grid orientation 입력 (path Y, 2026-05-07).
// 16 픽셀 click toggle + 4 preset (─ │ ╱ ╲) + R-STDP 학습 + 추론 trigger.
// 추론 결과 (winner / cluster_rates) 는 INFER 노드에서 표시 (사용자 catch
// 2026-05-07 — INPUT 노드와 INFER 노드 중복 표시 폐기). 본 컴포넌트는 입력
// 과 trigger 만 담당.
//
// 학습 cluster 매핑:
//   0 = horizontal (─)  row 1
//   1 = vertical   (│)  col 1
//   2 = diag-back  (╲)  top-left → bottom-right
//   3 = diag-fore  (╱)  top-right → bottom-left

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getClient } from '@/lib/backend/client';
import { emitBackendEvent, onBackendEvent, type GridTrainingDetail, type GridInferDetail, type NeuronFiringDetail } from '@/lib/backend/events';
import { useEngineMode } from '@/lib/snn/engine-mode';
import { getRootLocalSnn } from '@/lib/snn/root-local-snn';

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

const TRAIN_FRAMES = 30;
const TRAIN_CHUNK = 5;  // 5 frame × 6 chunk = 30 frame — 진행 중 progress 갱신.

function emptyGrid(): number[] {
  return new Array<number>(16).fill(0);
}

export default function GridInput() {
  const [grid, setGrid] = useState<number[]>(() => emptyGrid());
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  // orientation 회로가 빌드되었는지 — 첫 학습 호출 시 자동 빌드 1회.
  const substrateBuiltRef = useRef<boolean>(false);
  const [engineMode] = useEngineMode();

  const togglePixel = useCallback((i: number) => {
    setGrid((g) => {
      const next = g.slice();
      next[i] = next[i] > 0.5 ? 0 : 1;
      return next;
    });
  }, []);

  const applyPreset = useCallback((idx: number) => {
    setGrid(ORIENTATION_PRESETS[idx].slice());
  }, []);

  const reset = useCallback(() => {
    setGrid(emptyGrid());
    setStatus({ kind: 'idle' });
  }, []);

  // circuit-changed event — backend network 이 새로 만들어진 시점 (HF Spaces
  // 컨테이너 재시작 / 명시적 회로 빌드 등). substrate 재빌드 gate 다시 열어
  // 다음 학습 호출이 자동으로 orientation substrate 빌드하도록.
  useEffect(() => onBackendEvent('circuit-changed', () => {
    substrateBuiltRef.current = false;
    setStatus({ kind: 'idle' });
  }), []);

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

    // ── Local mode: 브라우저 내 LocalSNN 으로 학습 (no backend round-trip)
    if (engineMode === 'local') {
      try {
        const root = await getRootLocalSnn();
        const allPatterns = Array.from({ length: TRAIN_FRAMES }, () => pattern.slice());
        const r = await root.client.clusterTrainRStdp({
          patterns: allPatterns,
          targetCluster: clusterIdx,
          intensity: 25,
          stimulusDurationMs: 30,
          observeMs: 50,
          dtMs: 0.1,
        });
        // 학습 후 자동 save (Phase C3 sink — local-storage default).
        await root.lab.save().catch(() => {});
        const accuracy = r.accuracy;
        const accPct = (accuracy * 100).toFixed(0);
        setStatus({
          kind: 'ok',
          message: `${ORIENTATION_GLYPHS[clusterIdx]} ${accPct}% (${r.correct}/${r.trained})`,
        });
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'progress', cluster: clusterIdx,
          framesDone: TRAIN_FRAMES, framesTotal: TRAIN_FRAMES,
        });
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'finished',
          cluster: clusterIdx,
          accuracy,
          correct: r.correct,
          trained: r.trained,
          framesDone: TRAIN_FRAMES,
          framesTotal: TRAIN_FRAMES,
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setStatus({ kind: 'error', message: `local 학습 실패: ${msg}` });
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'error', cluster: clusterIdx, message: msg,
        });
      }
      return;
    }

    // ── Backend mode (default, rev15 검증된 path) ──────────────────────
    const client = getClient();
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
    // chunk 단위 (5 × 6 회) — chunk 끝마다 progress + V1/V2 firing broadcast.
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
      // V1/V2 갱신 — cluster_rates / winner_cluster strip 후 emit.
      if (r.data.rates_by_region || r.data.active_neurons_by_region) {
        emitBackendEvent<NeuronFiringDetail>('neuron-firing', {
          rates_by_region: r.data.rates_by_region,
          active_neurons_by_region: r.data.active_neurons_by_region,
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
  }, [engineMode]);

  // 사용자 catch 2026-05-07: round-robin 학습 — 4 cluster 균등 학습.
  // cluster 별 sequential 30 frame 영역 마지막 cluster dominance catch.
  // probe 정합 — cluster 0/1/2/3 차례 1 frame 씩 30 round = 120 frame.
  const trainAllRoundRobin = useCallback(async () => {
    setStatus({ kind: 'training', cluster: 0 });
    const client = getClient();
    if (!substrateBuiltRef.current) {
      const built = await client.presetOrientation({ overwrite: true });
      if (!built.ok) {
        setStatus({ kind: 'error', message: `회로 빌드 실패: ${built.reason}` });
        return;
      }
      substrateBuiltRef.current = true;
    }
    // 사용자 catch 2026-05-07: 학습 시간 매우 길음 (HF Spaces 무료 CPU).
    // 빠른 path 정정:
    //  - observe_ms 150 → 50ms (3× 빠른 simulation)
    //  - chunk 10 frame (2× batch) + round 6 (절반) = 호출 24회
    //  - 총 frame 240 → 240 동일 단 호출 절반 + simulation 1/3
    //  - 모든 cluster (0/1/2/3) progress emit (cluster bar 모두 갱신)
    const ROUNDS = 6;
    const CHUNK = 10;
    const totals = [0, 0, 0, 0];
    const trained = [0, 0, 0, 0];
    for (let round = 0; round < ROUNDS; round += 1) {
      for (let cid = 0; cid < 4; cid += 1) {
        const pattern = ORIENTATION_PRESETS[cid];
        const patterns = Array.from({ length: CHUNK }, () => pattern.slice());
        const r = await client.clusterTrainRStdp(patterns, cid as 0 | 1 | 2 | 3, {
          observeMs: 50,
          stimulusDurationMs: 10,
        });
        if (!r.ok) {
          setStatus({ kind: 'error', message: `round ${round} cluster ${cid} 실패: ${r.reason}` });
          return;
        }
        totals[cid] += r.data.correct;
        trained[cid] += r.data.trained;
        // NodeLearn cluster bar 영역 framesTotal=CLUSTER_TARGET (30) 영역
        // 정합. round-robin 영역 framesDone 영역 round 비례 (max=30).
        const framesDoneNorm = Math.round(((round + 1) / ROUNDS) * 30);
        emitBackendEvent<GridTrainingDetail>('grid-training', {
          kind: 'progress', cluster: cid as 0 | 1 | 2 | 3,
          framesDone: framesDoneNorm, framesTotal: 30,
        });
        if (r.data.rates_by_region || r.data.active_neurons_by_region) {
          emitBackendEvent<NeuronFiringDetail>('neuron-firing', {
            rates_by_region: r.data.rates_by_region,
            active_neurons_by_region: r.data.active_neurons_by_region,
          });
        }
      }
    }
    const accs = totals.map((c, i) => trained[i] > 0 ? Math.round(c / trained[i] * 100) : 0);
    setStatus({
      kind: 'ok',
      message: `round-robin 완료 — ─${accs[0]}% │${accs[1]}% ╲${accs[2]}% ╱${accs[3]}%`,
    });
    const totalCorrect = totals.reduce((a, b) => a + b, 0);
    const totalTrained = trained.reduce((a, b) => a + b, 0);
    emitBackendEvent<GridTrainingDetail>('grid-training', {
      kind: 'finished', cluster: 0,
      accuracy: totalTrained > 0 ? totalCorrect / totalTrained : 0,
      correct: totalCorrect,
      trained: totalTrained,
      framesDone: 30, framesTotal: 30,
    });
  }, []);

  // 추론 trigger — 결과 표시는 INFER 노드만 (PipelineEventContext 가
  // 'neuron-firing' event 의 cluster_rates / winner_cluster 영역 listen).
  const runInfer = useCallback(async () => {
    setStatus({ kind: 'inferring' });
    emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'started' });

    // ── Local mode ────────────────────────────────────────────────
    if (engineMode === 'local') {
      try {
        const root = await getRootLocalSnn();
        // grid (16-dim binary) → InjectEvent[] (>0.5 dim 만 active).
        const events = grid
          .map((v, i) => {
            if (v <= 0.5) return null;
            return {
              neuron: `in_feat_${i}`,
              weight: 25,
              time: 0,
              durationMs: 30,
              stepMs: 0.1,
            };
          })
          .filter((e): e is NonNullable<typeof e> => e !== null);
        if (events.length > 0) await root.client.inject(events);
        await root.client.run({ durationMs: 50, dtMs: 0.1, stdpEnabled: false });
        const cfr = await root.client.clusterFiringRates({ windowMs: 50, layer: 'OUT' });
        const winnerCluster =
          cfr.winner >= 0 && cfr.winner <= 3 ? (cfr.winner as 0 | 1 | 2 | 3) : null;
        setStatus({ kind: 'ok', message: '추론 완료 (local)' });
        emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'finished', winnerCluster });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setStatus({ kind: 'error', message: `local 추론 실패: ${msg}` });
        emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: msg });
      }
      return;
    }

    // ── Backend mode (default) ────────────────────────────────────
    const r = await getClient().injectPattern(grid, { stdp: false });
    if (r.ok) {
      const cluster = r.data.winner_cluster ?? null;
      const winnerCluster = cluster !== null && cluster >= 0 && cluster <= 3
        ? (cluster as 0 | 1 | 2 | 3)
        : null;
      setStatus({ kind: 'ok', message: '추론 완료' });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'finished', winnerCluster });
    } else {
      setStatus({ kind: 'error', message: `추론 실패: ${r.reason}` });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: r.reason });
    }
  }, [grid, engineMode]);

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
      <button
        type="button"
        className="snn-grid-build-btn"
        onClick={trainAllRoundRobin}
        disabled={isBusy}
        title="4 cluster 균등 round-robin 학습 — 정확 학습 path"
      >
        전체 학습 (round-robin)
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
        <span>{statusLine}</span>
      </div>
    </div>
  );
}
