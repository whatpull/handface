'use client';

// NodeInfer — winner cluster + margin + cluster mean + winner timeline + WTA tie 사실.
// HIGH #3 정합 보존: deriveWinner 영역 단일 source — PipelineEventContext 영역 위임.
// UX 4th HIGH 정정: neuron-firing 직접 구독 영역 — context consumer 일부.

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  onBackendEvent,
  type TrainingPhaseDetail,
} from '@/lib/backend/events';
import { useEngineMode } from '@/lib/snn/engine-mode';
import {
  loadExemplars,
  subscribeExemplars,
  type OutExemplars,
} from '@/lib/snn/out-exemplars';
import {
  subscribeLocalSnnInitState,
  getLastLocalSnnInitState,
  type SubstrateKind,
  type LocalSnnInitState,
} from '@/lib/snn/root-local-snn';
import { isUntrustworthy } from '@/lib/snn/untrustworthy';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import { SATURATION_HZ, WINNER_MARGIN, resolveClusterLabel } from './shared';

export default function NodeInfer() {
  const [phase, setPhase] = useState<TrainingPhaseDetail | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  // input-mode hoist: PipelineEventContext 에서 단일 구독 — 직접 구독 제거.
  // PR-K (사용자 catch 2026-05-09 catch 2): cluster label 영역 사용자 명명
  // 우선 + fallback '패턴 N' (resolveClusterLabel 정합). substrate-aware
  // exemplar subscribe — NodeOut RenameButton 영역 명명 영역 NodeInfer 즉시 sync.
  const { inputMode, winner, lastFiringTimestamp, consecutiveWinnerCount, isAutoLearning, winnerForcedExact } = usePipelineEvents();
  const substrate: SubstrateKind = inputMode === 'camera' ? 'gesture' : 'orientation';
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars(substrate));
  useEffect(() => {
    setExemplars(loadExemplars(substrate));
    return subscribeExemplars(substrate, setExemplars);
  }, [substrate]);

  // PipelineEventContext 영역 derived winner + inputMode — 4 노드 영역 공유 영역 정합.
  // (destructure 영역 위 — substrate 파생 전 선언 정합.)

  // Fix #19 (사용자 catch 2026-05-10): zero-init — 학습된 cluster 영역만 표시.
  // 직전 base 4 영역 무학습 시점 영역 stale '패턴 1..4' 영역 표시.
  //
  // 사용자 catch 2026-05-11 (cluster-source-unify): winner.cluster floor — OUT
  // 노드 영역 winner fallback 정합 path. PipelineEventContext 영역 winner 영역 fire
  // 영역 영역 cluster row 영역 표시 (winner.cluster + 1 floor) — exemplars 영역
  // incrementCount 영역 미fire 영역 영역 (학습 0회 정합) 영역 영역 winner derive
  // 영역 fire 영역 영역 영역 cluster bar 영역 표시.
  const winnerCluster = winner.cluster;
  const clusterLabels = useMemo(() => {
    let n = 0;
    for (const k of Object.keys(exemplars)) {
      const m = /^out_(\d+)_\d+$/.exec(k);
      if (m) {
        const ci = Number(m[1]) + 1;
        if (ci > n) n = ci;
      }
    }
    if (winnerCluster !== null && winnerCluster + 1 > n) n = winnerCluster + 1;
    return Array.from({ length: n }, (_, i) => resolveClusterLabel(exemplars, i, inputMode));
  }, [exemplars, inputMode, winnerCluster]);

  // PR-K (Phase 5, 사용자 catch 2026-05-09 catch 3): fresh state init —
  // trial=0 + initState='fresh' 영역 winner card hide. NodeLearn LiveLearnPanel
  // 영역 동일 source.
  const [initState, setInitState] = useState<LocalSnnInitState | null>(null);
  useEffect(() => {
    setInitState(getLastLocalSnnInitState(substrate));
    return subscribeLocalSnnInitState((state) => {
      if (state.kind === substrate) setInitState(state);
    });
  }, [substrate]);

  // PR3 (사용자 catch 2026-05-09): Live 모드 badge — batch infer 영역 구분.
  // Live tick 영역 PipelineEventContext 영역 자동 반영 (live-snn.ts emitTick
  // 영역 neuron-firing 동봉 — 별도 subscribe 불필요).
  const [engineMode] = useEngineMode();
  const isLiveMode = engineMode === 'live';

  // Online/offline detection — MediaPipe-only badge 표시 catch path.
  // SSR 영역 typeof navigator undefined → default true (online assume).
  const [online, setOnline] = useState<boolean>(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );

  useEffect(() => onBackendEvent<TrainingPhaseDetail>('training-phase', setPhase), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const setOn = () => setOnline(true);
    const setOff = () => setOnline(false);
    window.addEventListener('online', setOn);
    window.addEventListener('offline', setOff);
    return () => {
      window.removeEventListener('online', setOn);
      window.removeEventListener('offline', setOff);
    };
  }, []);

  // 사용자 catch 2026-05-11 (cluster-source-unify): winner 영역 hoist 영역 위 —
  // 본 위치 영역 saturated 영역만 catch 정합.
  const saturated = winner.clusterRates.every((v) => v >= SATURATION_HZ);

  // history 영역 winner cluster 변경 시점 영역 누적 (last 10).
  // winnerKey ↑ — 변경 시 fade-in animation 재생 (사용자 catch 2026-05-07).
  const lastClusterRef = useRef<number | null>(null);
  const [winnerKey, setWinnerKey] = useState<number>(0);
  useEffect(() => {
    if (winner.cluster === null) return;
    if (winner.cluster === lastClusterRef.current) return;
    lastClusterRef.current = winner.cluster;
    setWinnerKey((k) => k + 1);
    setHistory((h) => [...h.slice(-9), winner.cluster!]);
  }, [winner.cluster]);

  // INFERENCE tick spinner — Live tick (50ms × 3 = 150ms simulated) 또는
  // backend infer event 영역 도달 시점 1.2s subtle pulse.
  // 사용자 catch 2026-05-07: 추론 활성 사실 시각 catch.
  // 정정 2026-05-09 [3]: 직전 '350ms tick' 주석 영역 stale — 실제 50ms × 3.
  const [tickActive, setTickActive] = useState<boolean>(false);
  useEffect(() => {
    if (lastFiringTimestamp === null) { setTickActive(false); return; }
    setTickActive(true);
    const t = setTimeout(() => setTickActive(false), 1200);
    return () => clearTimeout(t);
  }, [lastFiringTimestamp]);

  const pname = phase?.phase ?? 'untrained';
  // Live 모드 영역 STDP 가 항상 가동 → batch phase gate 영역 우회 (사용자
  // catch 2026-05-09: Live 영역 winner 표시 영역 phase 와 무관).
  const trained = isLiveMode || pname === 'trained' || pname === 'inference';
  const max = Math.max(...winner.clusterRates, 1);
  // PR-K (사용자 catch 2026-05-09 catch 2): generic '패턴 N' label + 사용자
  // 명명 우선 (resolveClusterLabel 영역 clusterLabels 영역 derive 정합).
  // Fix #19 (2026-05-10): clusterLabels.length 영역 zero 일부 winner 영역 stale
  // 표시 회피 — winner.cluster >= length 영역 null fallback (학습 안 된 cluster).
  const winnerLabel = winner.cluster !== null && winner.cluster < clusterLabels.length
    ? (clusterLabels[winner.cluster] ?? `패턴 ${winner.cluster + 1}`)
    : null;
  const confPct = (winner.confidence * 100).toFixed(0);
  // PR-K (Phase 5, 사용자 catch 2026-05-09 catch 3): fresh state winner hide —
  // trial=0 + initState='fresh' 영역 winner card 영역 amber pill 영역 강화 +
  // winner cluster name 영역 dim + history hide. n13 INPUT→V1_L4_E weight
  // 11.0 base activation 영역 학술 정합 단 misleading 회피.
  //
  // HIGH #5 (사용자 catch 2026-05-11): isUntrustworthy 영역 단일 helper hoist —
  // NodeLearn LiveLearnPanel 정합 path (untrustworthy.ts). 직전 두 노드 영역
  // 다른 gate (LEARN: tick.trial===0 / INFER: phase 영역 추가 gate) 영역 모순
  // path 영역 단일 source. isLiveMode 영역 INFER 영역 별도 outer gate (Live 모드
  // 영역만 fresh state 영역 catch 영역 정합).
  // 사용자 catch 2026-05-11 (cluster-source-unify): winnerCluster 영역 untrustworthy
  // gate 영역 추가 — NodeOut winner fallback 영역 정합. winner.cluster !== null 영역
  // → fresh banner 영역 hide → winner card 영역 표시 (OUT 영역 동일 표시 정합).
  const isFreshUntrained = isLiveMode && isUntrustworthy({
    initPhase: initState?.phase,
    phaseName: phase === null ? null : pname,
    clusterLabelCount: clusterLabels.length,
    winnerCluster: winner.cluster,
  });

  return (
    <NodeShell
      title="INFER"
      subtitle={
        isLiveMode ? (
          <>
            {/* UX Polish PR1 Fix 4 (HIGH [H4]): a11y dot — emoji 영역 swap. */}
            <span aria-hidden="true" className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />
            LIVE — 실시간 winner
          </>
        ) : '추론 상세'
      }
      subtitleAria={isLiveMode ? 'LIVE — 실시간 winner' : '추론 상세'}
      tone="infer"
    >

      {!online && (
        <div className="snn-pipeline-warn">
          ⚠ MediaPipe only — offline (SNN 영역 0, 학습 진행 0)
        </div>
      )}
      {/* 사용자 catch 2026-05-11 (perf F2-c — cluster cap hint): cluster N
          영역 >= 12 영역 학습 점진 둔화 사실 — sparse WTA 영역 mitigation 후
          단 OUT layer 영역 mutual inhibition 영역 N 영역 linear 영역 영역 영역
          neuron simulation step time 영역 N 영역 linear. vigilance threshold
          영역 높이세요 영역 신규 cluster spawn 빈도 감소 — 사용자 hint. */}
      {clusterLabels.length >= 12 && (
        <div className="snn-pipeline-note" role="status" aria-live="polite">
          ⓘ 학습된 패턴 {clusterLabels.length}개 — 학습이 점진 영역 느려질 수 사실 (vigilance threshold 영역 높이거나 패턴 통합 권장)
        </div>
      )}
      {/* 사용자 catch 2026-05-10 (block-infer-during-learn): runAutoLearnLoop
          영역 30회 R-STDP 진행 중 영역 visible 안내 — 추론 결과 unreliable
          (학습 미완 weight 영역 winner 영역 noise) 영역 사용자 catch. NodeOut
          "처리 중" 영역 동일 패턴. snn-pipeline-note class 영역 amber pill
          (CSS 정합) — 추론 disable 영역 visible cue. */}
      {isAutoLearning && (
        <div className="snn-pipeline-note" role="status" aria-live="polite">
          학습 중 — 추론 대기 (신규 패턴 30회 학습 진행 중)
        </div>
      )}
      {!trained && (
        <div className="snn-pipeline-note">
          추론 영역 — TRAINED 후만 작동 사실 (현재: {pname})
        </div>
      )}
      {isLiveMode && (
        <div className="snn-pipeline-note">
          LIVE 모드 — INPUT 1회 학습 + 추론 → winner 즉시 갱신
        </div>
      )}
      {trained && isFreshUntrained && (
        <div className="snn-pipeline-current snn-pipeline-current--fresh">
          {/* MEDIUM #8 (사용자 catch 2026-05-11): fresh wording 통일 — LEARN 정합. */}
          <div className="snn-pipeline-current-label">
            FRESH CIRCUIT — 학습 0회 / 입력 대기
          </div>
          <div className="snn-pipeline-current-hint">
            tap 추론 → 자동 30회 학습 후 winner 표시
          </div>
        </div>
      )}
      {trained && !isFreshUntrained && (
        <div className={`snn-pipeline-current ${winnerLabel ? 'is-active' : ''}`}>
          <div className="snn-pipeline-current-label">
            현재 winner
            {trained && tickActive && (
              <span className="snn-pipeline-tick-spinner snn-pipeline-tick-spinner--inline" aria-label="추론 중" />
            )}
          </div>
          <div
            key={`winner-${winnerKey}`}
            className="snn-pipeline-current-value snn-pipeline-winner-fade"
          >
            {/* MEDIUM #10 (사용자 catch 2026-05-11): metric 통일 — LEARN 정합 path
                (정확도 confidence + 안정도 margin 영역 명시 label). 직전 conf only
                영역 LEARN margin 영역 다른 metric 영역 mismatch.
                사용자 catch 2026-05-12 (exact-match-badge-hide-rates):
                forcedExact 영역 winner card 영역 "EXACT MATCH (deterministic)"
                badge 영역 replace — 정확도/안정도 100% 영역 ART resonance lock
                영역 명시 (Carpenter-Grossberg 1987). 직전 "정확도 100% · 안정도
                100%" 영역 사용자 mental model 영역 modicum information — exact
                match 영역 deterministic 영역 명시 영역 정합. */}
            {winnerLabel
              ? (winnerForcedExact
                  ? (
                    <div className="snn-pipeline-winner-stack">
                      <span className="snn-pipeline-winner-label">{winnerLabel}</span>
                      <span
                        className="snn-pipeline-exact-badge"
                        role="status"
                        aria-label="exact match deterministic"
                        title="정확 일치 — deterministic"
                      >
                        EXACT
                      </span>
                    </div>
                  )
                  : `${winnerLabel} · 정확도 ${confPct}% · 안정도 ${(winner.margin * 100).toFixed(0)}%`)
              : '—'}
          </div>
          {/* PR-H 사용자 catch 2026-05-09 (catch 1 enhancement): consecutive
              winner streak indicator — Diehl & Cook 2015 winner stability
              정합. >= 3 영역 'stable' (green pill), < 3 영역 'learning' (amber).
              winner !== null 일부 표시 — null 영역 hint 영역 정합. */}
          {winnerLabel && consecutiveWinnerCount > 0 && (
            <WinnerStreakPill
              label={winnerLabel}
              count={consecutiveWinnerCount}
            />
          )}
          {!winnerLabel && winner.clusterRates.every((v) => v <= 0) && (
            <div className="snn-pipeline-current-hint">입력 신호 대기 — cluster_rates 활성 미정</div>
          )}
          {!winnerLabel && winner.clusterRates.some((v) => v > 0) && (
            <div className="snn-pipeline-current-hint">WTA tie — margin {(winner.margin * 100).toFixed(0)}% &lt; 10%</div>
          )}
        </div>
      )}
      {/* PR-K (Phase 5): fresh state 영역 winner row + margin + cluster bars
          영역 hide — winner emerge misleading 회피 (사용자 catch 3).
          Fix #19 (2026-05-10): zero-init — clusterLabels.length === 0 영역
          학습 0 영역 cluster bar / winner row 영역 hide ('—' fallback). */}
      {!isFreshUntrained && clusterLabels.length === 0 && (
        <div className="snn-pipeline-current snn-pipeline-current--fresh">
          <div className="snn-pipeline-current-label">아직 학습된 패턴 0</div>
          <div className="snn-pipeline-current-hint">
            패턴 입력 → 자동 학습 → cluster 1, 2, ..., N 순차 형성
          </div>
        </div>
      )}
      {!isFreshUntrained && clusterLabels.length > 0 && (
        <>
          <div className="snn-pipeline-row">
            <span className="snn-pipeline-row-label">winner</span>
            <span className="snn-pipeline-row-value">
              {winner.cluster !== null && winner.cluster < clusterLabels.length
                ? (clusterLabels[winner.cluster] ?? `패턴 ${winner.cluster + 1}`)
                : (winner.clusterRates.some((v) => v > 0) ? 'WTA tie' : '—')}
            </span>
          </div>
          {/* 사용자 catch 2026-05-09 [3]: margin meter — Diehl & Cook 2015 winner
              stability indicator. (max - second) / max ≥ WINNER_MARGIN (default 0.10)
              영역 winner 인정 영역 dotted line 영역 시각 catch.
              사용자 catch 2026-05-12 (exact-match-badge-hide-rates): forcedExact 영역
              MarginMeter 영역 hide — share/margin 영역 1.0 hard-set 영역 "안정도 100%"
              영역 사용자 mental model 영역 정보 부재. EXACT MATCH badge 영역 winner
              card 영역 단일 source. */}
          {!winnerForcedExact && (
            <MarginMeter margin={winner.margin} threshold={WINNER_MARGIN} hasWinner={winner.cluster !== null && winner.cluster < clusterLabels.length} />
          )}
          <div className="snn-pipeline-rate-grid">
            {/* Fix #19 (2026-05-10): 학습된 cluster 영역만 cluster bar 영역 표시.
                clusterLabels.length 영역 dynamic — base 4 floor 폐기.
                사용자 catch 2026-05-12 (exact-match-badge-hide-rates): forcedExact +
                isWinner 영역 RateBar 영역 Hz 표시 영역 hide ("EXACT" pill 영역 replace) —
                fire rate=0Hz 영역 산출 사실 단 winner deterministic 영역 사용자 mental
                model 영역 misleading catch 영역. non-winner cluster 영역 그대로 Hz 표시
                (background context catch). */}
            {clusterLabels.map((label, i) => (
              <RateBar key={i} label={label} rate={winner.clusterRates[i] ?? 0} max={max}
                isWinner={winner.cluster === i} isSaturated={(winner.clusterRates[i] ?? 0) >= SATURATION_HZ}
                hideRate={winnerForcedExact && winner.cluster === i} />
            ))}
          </div>
          <div className="snn-pipeline-row">
            <span className="snn-pipeline-row-label">recent</span>
            {/* 사용자 catch 2026-05-11 (infer-recent-overflow-fix): cluster 영역
                4 영역 초과 영역 직전 spark() chars[ci] 영역 undefined → '?'
                fallback 영역 "??????" 영역 표시. 1-indexed cluster 번호 영역
                separator-joined — cluster N (N >= 4) 영역 정합 표시. */}
            <span className="snn-pipeline-row-value snn-pipeline-mono">
              {history.length === 0 ? '—' : history.map((ci) => ci + 1).join('·')}
            </span>
          </div>
        </>
      )}
      {saturated && (
        <div className="snn-pipeline-warn">⚠ saturation — 모든 OUT ≥ {SATURATION_HZ}Hz</div>
      )}
    </NodeShell>
  );
}

function RateBar({ label, rate, max, isWinner, isSaturated, hideRate = false }:
  { label: string; rate: number; max: number; isWinner: boolean; isSaturated: boolean; hideRate?: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fillRef.current) {
      // 사용자 catch 2026-05-12 (exact-match-badge-hide-rates): hideRate 영역 winner
      // 영역 forced exact match — fill 영역 100% (deterministic lock 시각 catch).
      // 직전 fill=rate/max 영역 winner fire=0Hz 영역 산출 사실 → empty bar 영역
      // winner row 시각 inconsistent. 1.0 lock 영역 EXACT 영역 정합.
      const pct = hideRate ? 100 : (max > 0 ? (rate / max) * 100 : 0);
      fillRef.current.style.setProperty('--w', `${pct}%`);
    }
  }, [rate, max, hideRate]);
  return (
    <div className={`snn-pipeline-rate-row ${isWinner ? 'is-winner' : ''} ${isSaturated ? 'is-saturated' : ''}`}>
      <span className="snn-pipeline-rate-label">{label}</span>
      <div className="snn-pipeline-rate-bar">
        <div
          ref={fillRef}
          className={`snn-mode-progress-fill ${isSaturated ? 'snn-pipeline-fill-saturated' : 'snn-pipeline-fill-cyan'}`}
        />
      </div>
      {/* HIGH #2 (사용자 catch 2026-05-11): Hz suffix — NodeLearn LiveRateRow
          정합 (단위 통일). 직전 number-only 영역 LEARN 영역 'Hz' suffix 영역 mismatch.
          사용자 catch 2026-05-12 (exact-match-badge-hide-rates): hideRate 영역 fire rate
          Hz 영역 hide → "EXACT" pill 영역 replace (winner card 영역 EXACT MATCH badge
          영역 inline visual cue). non-winner / non-exact 영역 그대로 Hz 표시. */}
      {hideRate ? (
        <span className="snn-pipeline-exact-badge" aria-label="exact match — winner deterministic">
          EXACT
        </span>
      ) : (
        <span className="snn-pipeline-rate-value">{rate.toFixed(0)}Hz</span>
      )}
    </div>
  );
}

// PR-H catch 1 enhancement (2026-05-10): WinnerStreakPill — consecutive
// winner streak count + amber/green stability pill (Diehl & Cook 2015).
// >= 3 frame 영역 'stable' (green), < 3 영역 'learning' (amber).
// horizontal pattern 영역 다른 winner 영역 추가 mitigation 영역 trial=0 path
// 영역 학습 미숙 시각 catch 영역 정합.
function WinnerStreakPill({ label, count }: { label: string; count: number }) {
  const stable = count >= 3;
  const cls = stable
    ? 'snn-pipeline-streak-pill snn-pipeline-streak-pill--stable'
    : 'snn-pipeline-streak-pill snn-pipeline-streak-pill--learning';
  const status = stable ? 'stable' : '학습 중';
  return (
    <div
      className={cls}
      role="status"
      aria-live="polite"
      aria-label={`winner stability: ${label} ${count} consecutive — ${status}`}
    >
      <span className="snn-pipeline-streak-text">
        winner: {label} × {count} consecutive
      </span>
      <span className="snn-pipeline-streak-status">{status}</span>
    </div>
  );
}

// MarginMeter — winner stability indicator (Diehl & Cook 2015 정합).
// height ≤ 16px horizontal bar + dotted threshold line.
// margin >= threshold 영역 active 색감 (winner 인정), 미만 영역 dim (WTA tie).
function MarginMeter({ margin, threshold, hasWinner }:
  { margin: number; threshold: number; hasWinner: boolean }) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const pct = Math.max(0, Math.min(100, margin * 100));
  const thrPct = Math.max(0, Math.min(100, threshold * 100));
  useEffect(() => {
    if (fillRef.current) fillRef.current.style.setProperty('--w', `${pct}%`);
    if (lineRef.current) lineRef.current.style.setProperty('--w', `${thrPct}%`);
  }, [pct, thrPct]);
  return (
    <>
      <div className="snn-pipeline-row">
        {/* MEDIUM #7 (사용자 catch 2026-05-11): aria-label 영역 winner 안정도 영역
            의미 명시 + threshold 영역 사용자 mental model 영역 직접 표시. */}
        <span className="snn-pipeline-row-label">안정도</span>
        <div
          className={`snn-pipeline-margin-meter ${hasWinner ? 'is-winner' : 'is-tie'}`}
          aria-label={`winner 안정도 ${pct.toFixed(0)}% — ${thrPct.toFixed(0)}% 미만 영역 동률 (WTA tie)`}
        >
          <div
            ref={fillRef}
            className="snn-mode-progress-fill snn-pipeline-margin-fill"
          />
          <div
            ref={lineRef}
            className="snn-pipeline-margin-threshold"
            aria-hidden
          />
        </div>
        <span className="snn-pipeline-row-value snn-pipeline-mono">
          {pct.toFixed(0)}%
        </span>
      </div>
      {/* MEDIUM #7: inline hint — 사용자 영역 WTA tie 영역 직접 catch path. */}
      {!hasWinner && (
        <div className="snn-pipeline-current-hint">
          안정도 {thrPct.toFixed(0)}% 미만 영역 동률 (WTA tie) — winner 미결정
        </div>
      )}
    </>
  );
}
