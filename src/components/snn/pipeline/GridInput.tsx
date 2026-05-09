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
import { emitBackendEvent, onBackendEvent, type GridTrainingDetail, type GridInferDetail, type NeuronFiringDetail, type InputModeDetail } from '@/lib/backend/events';
import { useEngineMode } from '@/lib/snn/engine-mode';
import { getLiveSnn } from '@/lib/snn/live-snn';

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
  // PR audit fix (Fix 4 — LOW): Live reinforce in-flight 영역 visual gate —
  // 동일 cluster 영역 즉시 multi-click 영역 race 회피 + spinner-like feedback.
  const [reinforcingCluster, setReinforcingCluster] = useState<number | null>(null);

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

  // ── Live 모드 wiring (사용자 catch 2026-05-09 A: SNN 본질 정합 pivot) ──
  // engineMode='live' 시점 LiveSnn 영역 시작. grid 변경 영역 즉시 setPattern
  // → 200ms tick loop 영역 inject + run + cluster firing 측정.
  // engineMode 변경 (live → backend/local) 시 stop.
  //
  // PR #171 audit fix (Fix 1 — QA HIGH): grid pixel toggle 매 시점 cleanup +
  // re-start 영역 thrash 회피 영역 effect 영역 split.
  //   - Effect A (deps: [engineMode]): mount/unmount + start/stop 영역 1 회.
  //   - Effect B (deps: [engineMode, grid]): pattern sync 영역 setPattern 만.
  // PR #171 audit fix (Fix 2 — QA HIGH): substrate kind 영역 LiveSnn 자체
  // input-mode listener 영역 derive — 명시 setSubstrate 호출 영역 제거 영역
  // GridInput / CameraInput 동시 mount race 영역 회피.
  useEffect(() => {
    if (engineMode !== 'live') return;
    // NodeInput input-mode emit 영역 LiveSnn 미초기화 시점 영역 missed catch —
    // GridInput Live mount 시 idempotent re-emit 영역 substrate sync 보장.
    emitBackendEvent<InputModeDetail>('input-mode', { mode: 'grid' });
    const live = getLiveSnn();
    live.start();
    return () => {
      try {
        live.stop();
      } catch {
        // ignore
      }
    };
  }, [engineMode]);

  useEffect(() => {
    if (engineMode !== 'live') return;
    try {
      getLiveSnn().setPattern(grid);
    } catch {
      // ignore — SSR / 미초기화.
    }
  }, [engineMode, grid]);

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

    // ── Backend mode (engineMode='backend' — 학술 검증된 batch path) ──
    // Live 5차 (사용자 catch 2026-05-09): 'local' batch path 폐기 — Live 모드
    // 영역 일상 사용 / Backend 영역 학술 검증 path 영역 단일 batch 분기.
    // 본 trainPreset 함수 영역 isLiveMode 시점 영역 호출 0 — Live 모드 button
    // 영역 'reinforceLive' 영역 swap (cell click 시점 즉시 Live runtime 강화),
    // Backend 모드 시점에만 본 함수 영역 호출.
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
  }, []);

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

    // ── Backend mode (engineMode='backend' — 학술 검증된 path) ────
    // Live 5차 (사용자 catch 2026-05-09): 'local' batch path 폐기.
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

  // Live 모드 전용 — R-STDP positive reward 즉시 (사용자 명시 라벨 신호).
  // PR #171 audit fix (Fix 2): setSubstrate 호출 영역 제거 — input-mode event
  // 영역 LiveSnn 자체 substrate kind 영역 derive 영역 race 회피.
  // PR audit fix (Fix 1 — MEDIUM): saveFailed flag 영역 read 영역 user-visible
  // warning 표시 — 직전 silent fail catch.
  // PR audit fix (Fix 3 — MEDIUM): 'reinforced' 영역 한국어 swap.
  // PR audit fix (Fix 4 — LOW): reinforcingCluster 영역 in-flight gate.
  const reinforceLive = useCallback(async (clusterIdx: 0 | 1 | 2 | 3) => {
    setStatus({ kind: 'training', cluster: clusterIdx });
    setReinforcingCluster(clusterIdx);
    try {
      const live = getLiveSnn();
      live.setPattern(grid);
      const result = await live.reinforce(clusterIdx, 2.0);
      if (result.saveFailed) {
        setStatus({
          kind: 'ok',
          message: `${ORIENTATION_GLYPHS[clusterIdx]} 강화 +1 (저장 실패 — 새로고침 전 다시 강화 권장)`,
        });
      } else {
        setStatus({
          kind: 'ok',
          message: `${ORIENTATION_GLYPHS[clusterIdx]} 강화 +1`,
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `강화 실패: ${msg}` });
    } finally {
      setReinforcingCluster(null);
    }
  }, [grid]);

  const isLiveMode = engineMode === 'live';

  return (
    <div className="snn-grid-input">
      {!isLiveMode && (
        <>
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
            title="4 cluster 균등하게 학습 — 정확도 향상"
          >
            전체 학습 (round-robin)
          </button>
        </>
      )}
      {isLiveMode && (
        <div className="snn-grid-build-btn pointer-events-none text-center opacity-70">
          🔴 LIVE — 패턴 클릭 시 즉시 학습 + 추론
        </div>
      )}

      <div className="snn-grid-pixels" aria-label="4x4 orientation grid">
        {grid.map((v, i) => (
          <button
            key={i}
            type="button"
            className={`snn-grid-pixel ${v > 0.5 ? 'is-on' : ''}`}
            onClick={() => togglePixel(i)}
            disabled={isBusy && !isLiveMode}
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
              disabled={isBusy && !isLiveMode}
              title={label}
            >
              <span className="snn-grid-preset-glyph">{ORIENTATION_GLYPHS[i]}</span>
              <span className="snn-grid-preset-label">cluster {i}</span>
            </button>
            <button
              type="button"
              className="snn-grid-train-btn"
              onClick={
                isLiveMode
                  ? () => reinforceLive(i as 0 | 1 | 2 | 3)
                  : () => trainPreset(i as 0 | 1 | 2 | 3)
              }
              disabled={
                (isBusy && !isLiveMode) ||
                (isLiveMode && reinforcingCluster !== null)
              }
              aria-busy={isLiveMode && reinforcingCluster === i ? true : false}
              title={
                isLiveMode
                  ? reinforcingCluster === i
                    ? `${label} 강화 진행 중…`
                    : reinforcingCluster !== null
                      ? '다른 cluster 강화 진행 중 — 잠시 대기'
                      : `${label} 강화 (R-STDP 보상)`
                  : `${label} 학습 (R-STDP, batch)`
              }
            >
              {isLiveMode
                ? reinforcingCluster === i
                  ? '강화 중…'
                  : '강화'
                : '학습'}
            </button>
          </div>
        ))}
      </div>

      {/* PR #171 audit fix (Fix 3 — UX HIGH): Live 영역 추론 button hide —
          winner 영역 NodeInfer 영역 자동 표시 (PR #170 wiring 정합). Reset
          button 영역 visible 유지 영역 사용자 명시 catch (가중치 reset 영역
          명시 신호). */}
      <div className="snn-grid-actions">
        {!isLiveMode && (
          <button
            type="button"
            className="snn-grid-infer-btn"
            onClick={runInfer}
            disabled={isBusy}
          >
            추론
          </button>
        )}
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
