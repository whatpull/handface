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
import { getRootLocalSnnFor } from '@/lib/snn/root-local-snn';

// 사용자 catch 2026-05-09 (3 신규 catch): label glyph prefix 본격 제거 — 텍스트
// only 영역 일관 정합. 직전 '─ horizontal' / '│ vertical' / '╲ diag-back' /
// '╱ diag-fore' → 'horizontal' / 'vertical' / 'diag-back' / 'diag-fore'.
// status message / round-robin summary 영역 ORIENTATION_LABELS 영역 swap.
// ORIENTATION_GLYPHS 영역 src 사용 0 단 unit test 영역 length 검증 catch — 제거
// 0 영역 export 유지.
export const ORIENTATION_LABELS = ['horizontal', 'vertical', 'diag-back', 'diag-fore'] as const;
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

  // PR-A architecture pivot (사용자 catch 2026-05-09 A1): pixel/preset click
  // 영역 즉시 STDP/추론 trigger 영역 본격 폐기 — 직전 path 영역 4×4 그리드
  // 작성 도중 매 click 영역 학습 trigger 영역 patternFalt + latency 노출.
  // 정정 path: setPattern only — 사용자 영역 4×4 영역 자유 그림 영역 latency 0.
  // 명시 "추론" button (runInferLive) + cluster row "현재 패턴 보강" button
  // (reinforceLive — supervised R-STDP) 영역 명시 학습 / 추론 trigger.
  const togglePixel = useCallback((i: number) => {
    setGrid((g) => {
      const next = g.slice();
      next[i] = next[i] > 0.5 ? 0 : 1;
      if (engineMode === 'live') {
        try {
          // setPattern only — pixel toggle 영역 학습 trigger 0.
          // Live tick refresh 영역 effect [engineMode, grid] 영역 setPattern sync
          // 단 trigger 영역 명시 button 영역 한정.
          getLiveSnn().setPattern(next);
        } catch {
          // SSR / 미초기화 — 무시.
        }
      }
      return next;
    });
  }, [engineMode]);

  const applyPreset = useCallback((idx: number) => {
    const next = ORIENTATION_PRESETS[idx].slice();
    setGrid(next);
    if (engineMode === 'live') {
      try {
        // setPattern only — preset apply 영역 학습 trigger 0.
        // 사용자 catch 2026-05-09 A1 영역 정합 — 명시 추론 button 영역 trigger.
        getLiveSnn().setPattern(next);
      } catch {
        // SSR / 미초기화 — 무시.
      }
    }
  }, [engineMode]);

  const reset = useCallback(() => {
    setGrid(emptyGrid());
    setStatus({ kind: 'idle' });
  }, []);

  // PR-A architecture pivot (사용자 catch 2026-05-09 — Step 4 saturation escape):
  // Live 모드 영역 학습 가중치 영역 fresh build default 영역 restore. 직전
  // horizontal lock-in 영역 IndexedDB 영속 영역 새로고침 영역 escape 0 영역
  // mandatory escape path. Backend 모드 영역 본 path 영역 호출 0 (backend net
  // 영역 별도 lifecycle).
  const resetLearningLive = useCallback(async () => {
    if (engineMode !== 'live') return;
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        '학습 가중치 영역 fresh build default 영역 restore 하시겠습니까?\n\n현재 학습 영역 모두 폐기 — 사용자 catch 영역 saturation escape 영역 mandatory.',
      );
      if (!confirmed) return;
    }
    setStatus({ kind: 'building' });
    try {
      const root = await getRootLocalSnnFor('orientation');
      await root.client.resetClusterWeights();
      // saveDebounced 영역 우회 — 직접 lab.save 영역 fresh weight 영속.
      await root.lab.save();
      setStatus({ kind: 'ok', message: '학습 가중치 영역 reset 완료 — 4 cluster 영역 fresh' });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `학습 reset 실패: ${msg}` });
    }
  }, [engineMode]);

  // circuit-changed event — backend network 이 새로 만들어진 시점 (HF Spaces
  // 컨테이너 재시작 / 명시적 회로 빌드 등). substrate 재빌드 gate 다시 열어
  // 다음 학습 호출이 자동으로 orientation substrate 빌드하도록.
  useEffect(() => onBackendEvent('circuit-changed', () => {
    substrateBuiltRef.current = false;
    setStatus({ kind: 'idle' });
  }), []);

  // ── Live 모드 wiring (사용자 catch 2026-05-09 B: event-driven 1-shot pivot) ──
  // 직전 (A): 200ms setInterval 기반 background tick loop (live.start/stop).
  // 본 정정 (B): background loop 본격 폐기 — togglePixel / applyPreset 영역
  // 명시 trigger (1-shot). 본 effect 영역 substrate sync 영역만 담당.
  //
  // PR #171 audit fix (Fix 2 — QA HIGH): substrate kind 영역 LiveSnn 자체
  // input-mode listener 영역 derive — 명시 setSubstrate 호출 영역 제거.
  useEffect(() => {
    if (engineMode !== 'live') return;
    // NodeInput input-mode emit 영역 LiveSnn 미초기화 시점 영역 missed catch —
    // GridInput Live mount 시 idempotent re-emit 영역 substrate sync 보장.
    emitBackendEvent<InputModeDetail>('input-mode', { mode: 'grid' });
  }, [engineMode]);

  // grid state 변경 영역 setPattern sync — togglePixel/applyPreset 영역 명시
  // setPattern 호출 외 영역 race 회피 (state batch 갱신 후 effect 영역 sync 보장).
  useEffect(() => {
    if (engineMode !== 'live') return;
    try {
      getLiveSnn().setPattern(grid);
    } catch {
      // ignore — SSR / 미초기화.
    }
  }, [engineMode, grid]);

  // 사용자 catch 2026-05-09 [1]: '회로 빌드 (orientation)' button 영역 제거 영역
  // buildSubstrate callback 영역 본격 제거 — trainPreset / runInfer 영역 자동 빌드
  // (substrateBuiltRef gate) 영역 정합. 'building' status kind 영역 보존 — 자동 빌드
  // 진행 중 status 영역 정합 (statusLine '회로 빌드 중…').

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
      message: `${ORIENTATION_LABELS[clusterIdx]} ${accPct}% (${totalCorrect}/${totalTrained})`,
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
      message: `round-robin 완료 — ${ORIENTATION_LABELS[0]} ${accs[0]}% / ${ORIENTATION_LABELS[1]} ${accs[1]}% / ${ORIENTATION_LABELS[2]} ${accs[2]}% / ${ORIENTATION_LABELS[3]} ${accs[3]}%`,
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
      case 'training': return `${ORIENTATION_LABELS[status.cluster]} 학습 중 (${TRAIN_FRAMES} frame)…`;
      case 'inferring': return '추론 중…';
      case 'ok': return status.message;
      case 'error': return status.message;
    }
  }, [status]);

  // PR-A architecture pivot (사용자 catch 2026-05-09 A1): Live 모드 영역
  // 명시 추론 trigger — pixel/preset click 영역 STDP off (togglePixel/applyPreset
  // 영역 setPattern only) 영역 정합. 본 button 영역 click 영역 inferOnce
  // (stdpGain=0) 영역 호출 — STDP 0 (학습 0) + cluster firing rates 측정 only.
  const runInferLive = useCallback(async () => {
    setStatus({ kind: 'inferring' });
    try {
      const live = getLiveSnn();
      live.setPattern(grid);
      // inferOnce — triggerOnce({ stdpGain: 0 }) 영역 thin wrapper (semantic
      // clarity). 학술 정합: STDP off — Hebbian 0, cluster firing rates only.
      const result = await live.inferOnce();
      if (result.saveFailed) {
        setStatus({ kind: 'ok', message: '추론 완료 (저장 skip — 가중치 변경 0)' });
      } else {
        setStatus({ kind: 'ok', message: '추론 완료' });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `추론 실패: ${msg}` });
    }
  }, [grid]);

  // Live 모드 전용 — R-STDP positive reward 즉시 (사용자 명시 라벨 신호).
  // PR #171 audit fix (Fix 2): setSubstrate 호출 영역 제거 — input-mode event
  // 영역 LiveSnn 자체 substrate kind 영역 derive 영역 race 회피.
  // PR audit fix (Fix 1 — MEDIUM): saveFailed flag 영역 read 영역 user-visible
  // warning 표시 — 직전 silent fail catch.
  // PR audit fix (Fix 3 — MEDIUM): 'reinforced' 영역 한국어 swap.
  // PR audit fix (Fix 4 — LOW): reinforcingCluster 영역 in-flight gate.
  // PR-A architecture pivot (사용자 catch 2026-05-09 A2 — PRIMARY): reinforce
  // 영역 R-STDP supervised path 영역 정합 — direct backend (clusterTrainRStdp)
  // 1-pattern batch 영역 호출 (worker-core.ts:343-416 R-STDP 본격 구현 정합).
  // 직전 reinforce 영역 void targetCluster + STDP unsupervised self-reinforcing
  // loop 영역 horizontal 우연 winner 영역 lock-in 사실 영역 root cause 정정.
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
          message: `${ORIENTATION_LABELS[clusterIdx]} 패턴 보강 +1 (저장 실패 — 새로고침 전 다시 보강 권장)`,
        });
      } else {
        setStatus({
          kind: 'ok',
          message: `${ORIENTATION_LABELS[clusterIdx]} 패턴 보강 +1`,
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `보강 실패: ${msg}` });
    } finally {
      setReinforcingCluster(null);
    }
  }, [grid]);

  const isLiveMode = engineMode === 'live';

  return (
    <div className="snn-grid-input">
      {!isLiveMode && (
        <>
          {/* 사용자 catch 2026-05-09 [1]: '회로 빌드 (orientation)' button 제거 —
              trainPreset / runInfer 영역 자동 빌드 (substrateBuiltRef gate).
              명시 빌드 button 영역 noise. round-robin 영역 보존 — single cluster
              dominance mitigation 학술 정합 (Diehl & Cook 2015 / homeostatic scaling). */}
          {/* PR #187 polish — UX MEDIUM-3 (audit 2026-05-10): semantic-correct
              class rename. 직전 .snn-grid-build-btn 영역 회로 빌드 button 영역 폐기 후
              round-robin reuse — semantic mismatch. .snn-grid-train-all-btn 영역
              정합 (전체 학습 round-robin path). LIVE 안내 span 영역 별도 static
              variant 영역 분리 (HIGH-1 동시 정정). */}
          <button
            type="button"
            className="snn-grid-train-all-btn"
            onClick={trainAllRoundRobin}
            disabled={isBusy}
            title="4 cluster 균등하게 학습 — 정확도 향상"
          >
            전체 학습 (round-robin)
          </button>
        </>
      )}
      {isLiveMode && (
        <div className="snn-grid-train-all-btn snn-grid-train-all-btn--static pointer-events-none text-center">
          {/* UX Polish PR1 Fix 4 (HIGH [H4], 2026-05-09): 🔴 emoji 영역 screen
              reader 노이즈 (\"빨간 큰 동그라미\") catch — semantic Tailwind dot
              영역 swap + aria-hidden. 시각 사용자 동일 정합. */}
          <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />
          {/* UX-7 (PR #191 polish, 2026-05-10): 영문 hint copy + 어색 한국어
              catch — 자연 한국어 + 사용자 액션 명확화. */}
          LIVE — 패턴을 그리고 추론 버튼을 누르세요. 학습 버튼 = 사용자 지정 정답 학습.
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
              {/* 사용자 catch 2026-05-09 (2 신규 catch): cluster N 앞 glyph 본격 제거. */}
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
              aria-busy={isLiveMode && reinforcingCluster === i}
              /* UX-6 (PR #191 polish, 2026-05-10): aria-label 0 catch —
                 screen reader 영역 cluster-specific intent 명시 (live: 보강
                 supervised R-STDP / batch: 학습). */
              aria-label={
                isLiveMode
                  ? `${label} 현재 패턴 보강 — supervised R-STDP`
                  : `${label} 학습 — R-STDP batch`
              }
              title={
                isLiveMode
                  ? reinforcingCluster === i
                    ? `${label} 패턴 보강 진행 중…`
                    : reinforcingCluster !== null
                      ? '다른 cluster 패턴 보강 진행 중 — 잠시 대기'
                      : `${label} 현재 패턴 보강 (R-STDP gain ↑ — winner cluster boosting)`
                  : `${label} 학습 (R-STDP, batch)`
              }
            >
              {/* 사용자 catch 2026-05-09 (QA HIGH-1): '강화' 영역 R-STDP cluster-
                  specific gradient 0 영역 정직 라벨 swap — '현재 패턴 보강' (winner
                  cluster boosting only, Florian 2007 / Izhikevich 2007 R-STDP 정합
                  영역 정직 한계 — README 명시). */}
              {isLiveMode
                ? reinforcingCluster === i
                  ? '보강 중…'
                  : '현재 패턴 보강'
                : '학습'}
            </button>
          </div>
        ))}
      </div>

      {/* PR-A architecture pivot (사용자 catch 2026-05-09 A1): Live 영역
          추론 button 영역 visible — pixel/preset click 영역 STDP off (setPattern
          only) 영역 정합 영역 명시 추론 trigger button 영역 mandatory. 직전
          PR #171 fix 영역 'auto-infer on click' 영역 폐기 — 사용자 명시 path. */}
      <div className="snn-grid-actions">
        {/* UX-6/UX-9 (PR #191 polish, 2026-05-10): aria-label 0 catch +
            primary tone visual 강조 — 추론 = 본격 INFERENCE phase trigger
            (cyan border-glow CSS modifier 정합). */}
        <button
          type="button"
          className="snn-grid-infer-btn snn-grid-infer-btn--primary"
          onClick={isLiveMode ? runInferLive : runInfer}
          disabled={isBusy}
          aria-label={isLiveMode ? '추론 — STDP off, 가중치 변경 0' : '추론'}
          title={
            isLiveMode
              ? '4×4 패턴 영역 추론 (STDP off — 가중치 변경 0)'
              : '4×4 패턴 영역 추론'
          }
        >
          추론
        </button>
        {/* UX-7 (PR #191 polish, 2026-05-10): 자연 한국어 hint copy 정정 —
            "가중치 영역 영향 0" 영역 어색 → "학습은 유지" 영역 사용자 의도 명확. */}
        <button
          type="button"
          className="snn-grid-reset-btn"
          onClick={reset}
          disabled={isBusy}
          title="현재 패턴만 지우기 (학습은 유지)"
        >
          패턴 지우기
        </button>
        {isLiveMode && (
          /* UX-6/UX-8 (PR #191 polish, 2026-05-10): aria-label 0 catch +
             danger modifier 영역 visual separation — 학습 reset 영역 destructive
             action 영역 red border-glow + hover red bg 영역 시각 경고. */
          <button
            type="button"
            className="snn-grid-reset-btn snn-grid-reset-btn--danger"
            onClick={resetLearningLive}
            disabled={isBusy}
            aria-label="학습 가중치 reset — fresh build restore"
            title="학습 가중치 영역 fresh build default 영역 restore — saturation escape mandatory"
          >
            학습 reset
          </button>
        )}
      </div>

      <div className={`snn-grid-status snn-grid-status--${status.kind}`}>
        <span>{statusLine}</span>
      </div>
    </div>
  );
}
