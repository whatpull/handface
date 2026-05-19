'use client';

// NodeOut — winner cluster (orientation/gesture) + RenameButton + cluster count.
// HIGH #3 정합 보존: deriveWinner 영역 단일 source — PipelineEventContext 영역 위임.
// UX 4th HIGH 정정: neuron-firing 직접 구독 영역 — context consumer 일부.
//
// 사용자 catch 2026-05-09 [1]:
//   - conf/margin row 영역 제거 (NodeInfer 중복 — winner row + margin meter 영역 정합).
//   - Export JSON button 영역 제거 (학술 record schema 영역 약 — follow-up 영역 강화).
//   - cluster count 영역 8-OUT 합산 (out_{ci}_0 ~ out_{ci}_7) — cluster broadcast
//     supervisor 정합 (QA MEDIUM-3, N3 cluster_train_supervised path).
//
// 2026-05-13: ValidationPanel 추가 — Reproduction / Noise / Confusion Matrix /
//   Partial Cue 4종 검증. 클라이언트 오케스트레이션, 순차 inject(stdp=false).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { onBackendEvent, type GridInferDetail } from '@/lib/backend/events';
import {
  loadExemplars,
  subscribeExemplars,
  setExemplarLabel,
  removeClusterExemplar,
  restoreExemplars,
  type OutExemplars,
  type OutExemplar,
} from '@/lib/snn/out-exemplars';
import { getClient } from '@/lib/backend/client';
import { getLiveSnn } from '@/lib/snn/live-snn';
import { getEngineMode } from '@/lib/snn/engine-mode';
import type { SubstrateKind } from '@/lib/snn/root-local-snn';
import NodeShell from './NodeShell';
import { usePipelineEvents } from './PipelineEventContext';
import { getClusterLabel, OUT_PER_CLUSTER, resolveClusterLabel } from './shared';

/**
 * cluster ci 영역 count 합산:
 *   - 우선: out_{ci}_0 ~ out_{ci}_7 sum (N3 cluster broadcast supervisor 정합).
 *   - fallback: out_{ci} (legacy single-OUT exemplar) — 8-OUT slot 영역 0 영역 시점.
 *
 * resolveClusterLabel 영역 shared.ts 영역 hoist (PR-K 2026-05-09 catch 2 정합) —
 * NodeLearn / NodeInfer 영역 동일 source 영역 사용자 RenameButton 영역 명시
 * 명명 시점 영역 모든 노드 영역 sync.
 */
function sumClusterCount(exemplars: OutExemplars, ci: number): number {
  let sum = 0;
  for (let n = 0; n < OUT_PER_CLUSTER; n += 1) {
    sum += exemplars[`out_${ci}_${n}`]?.count ?? 0;
  }
  if (sum === 0) {
    // legacy fallback — single out_{ci} key (old snapshot 영역).
    sum = exemplars[`out_${ci}`]?.count ?? 0;
  }
  return sum;
}

// ─── Validation types ───────────────────────────────────────────────────────

interface ValidationResult {
  repro: { correct: number; total: number };
  noise: { correct: number; total: number };
  partial: { correct: number; total: number };
  /** matrix[actual][predicted] = count */
  matrix: number[][];
  labels: string[];
}

/**
 * exemplars → (clusterIndex, label, lastFeature) 목록 추출.
 * 각 cluster 는 out_{ci}_0 의 lastFeature 영역 사용 (학습 시 snapshot 보존 경로).
 */
function buildPatternList(
  exemplars: OutExemplars,
  clusterCount: number,
): Array<{ ci: number; label: string; feature: number[] }> {
  const list: Array<{ ci: number; label: string; feature: number[] }> = [];
  for (let ci = 0; ci < clusterCount; ci += 1) {
    // out_{ci}_0 우선 — 첫 OUT 뉴런에 feature snapshot 저장됨.
    let feat: number[] | null = null;
    for (let n = 0; n < OUT_PER_CLUSTER; n += 1) {
      const ex = exemplars[`out_${ci}_${n}`];
      if (ex && ex.lastFeature && ex.lastFeature.length > 0) {
        feat = ex.lastFeature;
        break;
      }
    }
    if (!feat) continue; // feature 없으면 검증 불가 — skip.
    list.push({ ci, label: resolveClusterLabel(exemplars, ci, 'grid'), feature: feat });
  }
  return list;
}

/** inject → winner_cluster 도출. cluster_rates 있으면 argmax, 없으면 out_rates argmax. */
function deriveWinnerFromResponse(data: {
  winner_cluster?: number | null;
  cluster_rates?: number[];
  out_rates?: Record<string, number>;
}): number | null {
  if (data.winner_cluster !== null && data.winner_cluster !== undefined && data.winner_cluster >= 0) {
    return data.winner_cluster;
  }
  if (data.cluster_rates && data.cluster_rates.length > 0) {
    let best = -1; let bestV = -1;
    data.cluster_rates.forEach((v, i) => { if (v > bestV) { bestV = v; best = i; } });
    return best >= 0 ? best : null;
  }
  if (data.out_rates) {
    // out_{ci}_{n} → ci 별 합산 → argmax.
    const sums: Record<number, number> = {};
    for (const [k, v] of Object.entries(data.out_rates)) {
      const m = /^out_(\d+)/.exec(k);
      if (m) { const ci = Number(m[1]); sums[ci] = (sums[ci] ?? 0) + v; }
    }
    let best = -1; let bestV = -1;
    for (const [ci, v] of Object.entries(sums)) {
      if (v > bestV) { bestV = v; best = Number(ci); }
    }
    return best >= 0 ? best : null;
  }
  return null;
}

/**
 * 단일 패턴 inject 후 winner cluster 반환.
 * - Live 모드: 로컬 SNN worker (inferOnceForValidation) — HTTP backend 무관.
 * - Backend 모드: HTTP inject_feature16 endpoint (기존 경로).
 * 양쪽 모두 { ok, winner } 형태로 정규화.
 */
async function injectOnePattern(
  pattern: number[],
  engineMode: 'live' | 'backend',
): Promise<{ ok: boolean; winner: number | null }> {
  if (engineMode === 'live') {
    try {
      const { winner } = await getLiveSnn().inferOnceForValidation(pattern);
      return { ok: true, winner };
    } catch {
      return { ok: false, winner: null };
    }
  }
  // backend mode — HTTP inject_feature16.
  const r = await getClient().injectPattern(pattern, { stdp: false, observeMs: 80, intensity: 3.0 });
  if (!r.ok) return { ok: false, winner: null };
  return { ok: true, winner: deriveWinnerFromResponse(r.data) };
}

/** 0~1 사이 float 배열에 노이즈 주입 후 clamp. */
function addNoise(feature: number[], amount = 0.2): number[] {
  return feature.map((v) => {
    const n = (Math.random() * 2 - 1) * amount;
    return Math.max(0, Math.min(1, v + n));
  });
}

/** 25% 셀을 0으로 마스킹한 부분 패턴 생성 (75% 유지). */
function partialCue(feature: number[], keepRatio = 0.75): number[] {
  return feature.map((v) => (Math.random() < keepRatio ? v : 0));
}

/** 패턴 수에 따른 단계별 성능 힌트 메시지. 3개 이하 → null (표시 불필요). */
// P215e (2026-05-19): MAX_CLUSTERS 8 → 16 확장 정합. cap 메시지 16 으로 동기화.
function patternQualityHint(count: number): string | null {
  if (count <= 3) return null;
  if (count <= 5) return '패턴이 많을수록 부분 단서 정확도가 낮아질 수 있습니다.';
  if (count <= 7) return '6-7패턴: 재현율/노이즈는 유지되나 부분 단서 저하 예상.';
  if (count <= 12) return `${count}패턴: 다수 패턴 — 부분단서/노이즈 저하 가능 (vigilance 영역 조정 권장).`;
  if (count < 16) return `${count}패턴 — 곧 최대 16개 도달. 패턴 통합 권장.`;
  return '최대 16개 도달 — 학습 비활성. 패턴 삭제 후 재학습하세요.';
}

export default function NodeOut() {
  // 사용자 catch 2026-05-09: GRID / CAMERA mode 별 cluster label 표시.
  // input-mode hoist: PipelineEventContext 에서 단일 구독 — 직접 구독 제거.
  const { winner, isAutoLearning } = usePipelineEvents();
  // orientation substrate 고정 — 단일 운용.
  const substrate = 'orientation' as const satisfies SubstrateKind;
  const [exemplars, setExemplars] = useState<OutExemplars>(() => loadExemplars(substrate));

  useEffect(() => {
    setExemplars(loadExemplars(substrate));
    return subscribeExemplars(substrate, setExemplars);
  }, [substrate]);

  // F4 UX polish (1) — "처리 중" 시각 신호. grid-infer started → true, finished/error
  // → false. winner 영역 미해결 ("—" placeholder) 영역 dim pulse animation 영역
  // "결과 없음" vs "처리 중" 영역 시각 구분 정합. prefers-reduced-motion 영역
  // CSS 영역 static dim 영역 fallback (animation-duration 0.01ms).
  const [isInferring, setIsInferring] = useState(false);
  useEffect(() => onBackendEvent<GridInferDetail>('grid-infer', (d) => {
    if (d.kind === 'started') setIsInferring(true);
    else setIsInferring(false);
  }), []);

  // PipelineEventContext: winner + isAutoLearning — inputMode 도 위에서 hoist.
  // HIGH #6 (사용자 catch 2026-05-11): isAutoLearning 영역 LEARN/INFER 영역
  // 동일 amber row 일관성 — "학습 중 — count 갱신 대기" 영역 hint visible.

  const winnerKey = winner.cluster !== null ? `out_${winner.cluster}_0` : null;
  const winnerEx = winnerKey ? exemplars[winnerKey] : undefined;
  const winnerLabel = winner.cluster !== null
    ? (winnerEx?.label || getClusterLabel(winner.cluster, 'grid'))
    : null;

  // Fix #19 (사용자 catch 2026-05-10): UI zero-init — 학습된 cluster 영역만
  // 표시. 직전 floor=4 영역 base n13 substrate 영역 default 영역 무학습 시점
  // 영역 stale '패턴 1..4' 영역 표시 → 사용자 mental model "cluster 0개 시작"
  // 영역 mismatch.
  //
  // Request C (2026-05-10): firing fallback 영역 폐기 — exemplars 영역 영역
  // 학습된 cluster 영역만 표시. 직전 firingMax fallback 영역 base n13 substrate
  // 영역 default 영역 baseline noise (winner.clusterRates 영역 inhibition 영역
  // 잔여 firing) 영역 stale '패턴 1..4' 영역 표시 → 사용자 catch "학습되지
  // 않았는데 자동으로 패턴1, 패턴2, 패턴3, 패턴4가 추론" 영역 root cause.
  // 사용자 명시 "기존 로직 신경쓰지말고" — backward compat 폐기.
  // 사용자 catch 2026-05-11 (cluster-source-unify): winner.cluster 영역 floor —
  // exemplars 영역 incrementCount 영역 fire 0 영역 영역 winner 영역 fire 영역
  // 영역 cluster row 영역 표시 (winner cluster id + 1 floor). LEARN/INFER 영역
  // 동일 source 정합 — 3 노드 영역 동일 cluster row 표시.
  const clusterCount = useMemo(() => {
    let n = 0;
    for (const k of Object.keys(exemplars)) {
      const m = /^out_(\d+)_\d+$/.exec(k);
      if (m) {
        const ci = Number(m[1]) + 1;
        if (ci > n) n = ci;
      }
    }
    if (winner.cluster !== null && winner.cluster + 1 > n) n = winner.cluster + 1;
    return n;
  }, [exemplars, winner.cluster]);

  // ── Validation state ──────────────────────────────────────────────────────
  const [valOpen, setValOpen] = useState(false);
  const [valRunning, setValRunning] = useState(false);
  const [valProgress, setValProgress] = useState<{ done: number; total: number } | null>(null);
  const [valResult, setValResult] = useState<ValidationResult | null>(null);
  const valAbortRef = useRef(false);

  const runValidation = useCallback(async () => {
    // Fix 2 (2026-05-15): exemplar 전용 cluster 수로 패턴 목록 구성 —
    // winner.cluster floor 를 제외해 삭제된 cluster 가 iteration 에 포함되지
    // 않도록 보장. buildPatternList 는 feature 없는 ci 를 skip 하지만,
    // exemplar-pure count 가 가장 정확한 범위를 제공.
    let exClusterCount = 0;
    for (const k of Object.keys(exemplars)) {
      const m = /^out_(\d+)_\d+$/.exec(k);
      if (m) { const ci = Number(m[1]) + 1; if (ci > exClusterCount) exClusterCount = ci; }
    }
    const patterns = buildPatternList(exemplars, exClusterCount);
    if (patterns.length < 2) return;

    setValRunning(true);
    setValResult(null);
    valAbortRef.current = false;

    const n = patterns.length;
    // 총 inject 횟수: reproduction(n) + noise(n) + partial(n) = 3n.
    const totalSteps = n * 3;
    let done = 0;
    setValProgress({ done, total: totalSteps });

    const reproCorrect = new Array<boolean>(n).fill(false);
    const noiseCorrect = new Array<boolean>(n).fill(false);
    const partialCorrect = new Array<boolean>(n).fill(false);
    // matrix[actual][predicted] — 3종 inject 모두 합산 (3× 샘플).
    const matrix: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(0));

    // Live 모드 — 로컬 SNN worker inject (HTTP backend 무관).
    // Backend 모드 — HTTP inject_feature16 (기존 경로).
    const engineMode = getEngineMode();

    try {
      // 순차 실행 — 로컬 SNN / 백엔드 상태 충돌 방지.
      for (let i = 0; i < n; i += 1) {
        if (valAbortRef.current) break;
        const { ci, feature } = patterns[i];

        // Reproduction
        const r1 = await injectOnePattern(feature, engineMode);
        done += 1; setValProgress({ done, total: totalSteps });
        if (r1.ok) {
          const w = r1.winner;
          if (w === ci) reproCorrect[i] = true;
          const predIdx = patterns.findIndex((p) => p.ci === w);
          if (predIdx >= 0) matrix[i][predIdx] += 1;
        }

        if (valAbortRef.current) break;

        // Noise
        const r2 = await injectOnePattern(addNoise(feature), engineMode);
        done += 1; setValProgress({ done, total: totalSteps });
        if (r2.ok) {
          const w = r2.winner;
          if (w === ci) noiseCorrect[i] = true;
          const predIdx = patterns.findIndex((p) => p.ci === w);
          if (predIdx >= 0) matrix[i][predIdx] += 1;
        }

        if (valAbortRef.current) break;

        // Partial Cue
        const r3 = await injectOnePattern(partialCue(feature), engineMode);
        done += 1; setValProgress({ done, total: totalSteps });
        if (r3.ok) {
          const w = r3.winner;
          if (w === ci) partialCorrect[i] = true;
          const predIdx = patterns.findIndex((p) => p.ci === w);
          if (predIdx >= 0) matrix[i][predIdx] += 1;
        }
      }

      const result: ValidationResult = {
        repro:   { correct: reproCorrect.filter(Boolean).length,   total: n },
        noise:   { correct: noiseCorrect.filter(Boolean).length,   total: n },
        partial: { correct: partialCorrect.filter(Boolean).length, total: n },
        matrix,
        labels: patterns.map((p) => p.label),
      };
      setValResult(result);
    } finally {
      setValRunning(false);
      setValProgress(null);
    }
  }, [exemplars]);

  return (
    <NodeShell
      title="OUT"
      subtitle="winner 누적 (winner cluster 변경 시점 +1)"
      subtitleAria="winner cluster 누적 횟수"
      tone="out"
    >
      {/* HIGH #6 (사용자 catch 2026-05-11): isAutoLearning 영역 amber row —
          LEARN/INFER 영역 "학습 중" hint 영역 동일 amber 일관성 (count 갱신
          대기 path 영역 사용자 mental model 영역 직접 catch). */}
      {isAutoLearning && (
        <div className="snn-pipeline-note" role="status" aria-live="polite">
          학습 중 — count 갱신 대기 (신규 패턴 30회 학습 진행 중)
        </div>
      )}
      {/* F4 UX polish (4, 2026-05-11): winner transition fade-in 100ms —
          key={winnerKey} 영역 winner cluster 변경 시점 영역 element 재생성 →
          fadeIn animation 1회 재생 (직전 winner 영역 새 winner 영역 시각 전환
          영역 catch 정합). prefers-reduced-motion 영역 instant. */}
      <div
        key={winnerKey ?? 'empty'}
        className={`snn-pipeline-out-winner${winnerKey ? ' snn-pipeline-out-winner--enter' : ''}`}
      >
        {winnerLabel ? (
          <RenameButton
            outKey={winnerKey!}
            substrate={substrate}
            label={winnerLabel}
            hasLabel={!!winnerEx?.label}
          />
        ) : (
          <span
            className={`snn-pipeline-out-winner-empty${isInferring ? ' is-inferring' : ''}`}
            aria-live="polite"
          >
            {isInferring ? '처리 중…' : '—'}
          </span>
        )}
      </div>
      {/* 패턴 수에 따른 단계별 성능 안내 (4개 이상부터 표시) */}
      {patternQualityHint(clusterCount) && (
        <div className="snn-pipeline-note" role="status" aria-live="polite">
          {patternQualityHint(clusterCount)}
        </div>
      )}
      <div className="snn-pipeline-out-counts">
        {clusterCount === 0 ? (
          <div className="snn-pipeline-out-count-row snn-pipeline-out-count-row--empty">
            <span className="snn-pipeline-out-count-label">아직 학습된 패턴 0</span>
            <span className="snn-pipeline-out-count-value">—</span>
          </div>
        ) : (
          Array.from({ length: clusterCount }, (_, ci) => ci).map((ci) => {
            const count = sumClusterCount(exemplars, ci);
            const label = resolveClusterLabel(exemplars, ci, 'grid');
            return (
              <div key={ci} className="snn-pipeline-out-count-row">
                <span className="snn-pipeline-out-count-label">{label}</span>
                <span className="snn-pipeline-out-count-value">{count}</span>
                {/* P(3) 2026-05-14: 개별 삭제 버튼 */}
                <button
                  type="button"
                  className="snn-pipeline-out-count-delete"
                  aria-label={`${label} 삭제`}
                  title={`${label} 삭제`}
                  onClick={() => removeClusterExemplar(ci, substrate)}
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* ── Export / Import row ──────────────────────────────────────────── */}
      <ExportImportRow substrate={substrate} exemplars={exemplars} />

      {/* ── Validation Panel ─────────────────────────────────────────────── */}
      <ValidationPanel
        clusterCount={clusterCount}
        exemplars={exemplars}
        isAutoLearning={isAutoLearning}
        valOpen={valOpen}
        setValOpen={setValOpen}
        valRunning={valRunning}
        valProgress={valProgress}
        valResult={valResult}
        onRun={runValidation}
        valAbortRef={valAbortRef}
      />
    </NodeShell>
  );
}

// ─── ValidationPanel ─────────────────────────────────────────────────────────

interface ValidationPanelProps {
  clusterCount: number;
  exemplars: OutExemplars;
  isAutoLearning: boolean;
  valOpen: boolean;
  setValOpen: (v: boolean) => void;
  valRunning: boolean;
  valProgress: { done: number; total: number } | null;
  valResult: ValidationResult | null;
  onRun: () => void;
  valAbortRef: React.RefObject<boolean>;
}

/** 0~1 float → 10단계 width class (inline style 완전 회피). */
function barWidthClass(pct: number): string {
  const step = Math.round(pct * 10) * 10; // 0,10,20,...,100
  return `snn-val-bar-fill--w${step}`;
}

function MetricBar({ label, correct, total }: { label: string; correct: number; total: number }) {
  const pct = total > 0 ? correct / total : 0;
  const pctPct = Math.round(pct * 100);
  const pctStr = `${pctPct}%`;
  const colorClass =
    pct >= 1.0 ? 'snn-val-bar-fill--full' :
    pct >= 0.75 ? 'snn-val-bar-fill--good' :
    pct >= 0.5 ? 'snn-val-bar-fill--mid' : 'snn-val-bar-fill--low';
  return (
    <div className="snn-val-metric-row">
      <span className="snn-val-metric-label">{label}</span>
      <div className="snn-val-bar-track">
        {/* width는 discretized class로, ARIA 값은 String() 변환으로 linter 통과. */}
        {/* aria-valuenow/max 는 숫자 표현식 대입 시 linter error 발생 —
            aria-label 단독으로 접근성 충족 (WCAG 4.1.2 name/role/value). */}
        <div
          className={`snn-val-bar-fill ${colorClass} ${barWidthClass(pct)}`}
          role="progressbar"
          aria-label={`${label} ${pctStr}`}
        />
      </div>
      <span className="snn-val-metric-pct">
        {correct}/{total} {pctStr}
      </span>
    </div>
  );
}

function ValidationPanel({
  clusterCount, exemplars, isAutoLearning,
  valOpen, setValOpen, valRunning, valProgress, valResult, onRun, valAbortRef,
}: ValidationPanelProps) {
  // 유효한 feature 보유 패턴 수 계산.
  const patternCount = useMemo(() => {
    let n = 0;
    for (let ci = 0; ci < clusterCount; ci += 1) {
      for (let k = 0; k < OUT_PER_CLUSTER; k += 1) {
        const ex = exemplars[`out_${ci}_${k}`];
        if (ex && ex.lastFeature && ex.lastFeature.length > 0) { n += 1; break; }
      }
    }
    return n;
  }, [exemplars, clusterCount]);

  const canRun = patternCount >= 2 && !valRunning && !isAutoLearning;

  return (
    <div className="snn-val-section">
      {/* Header — toggle button + action button (sibling, not nested) */}
      <div className="snn-val-header">
        <button
          type="button"
          className="snn-val-toggle-btn"
          aria-expanded={valOpen}
          aria-label={valOpen ? 'VALIDATION 접기' : 'VALIDATION 펼치기'}
          onClick={() => setValOpen(!valOpen)}
        >
          <span className="snn-val-toggle">{valOpen ? '▼' : '▶'}</span>
          <span className="snn-val-title">VALIDATION</span>
        </button>
        {valRunning && <span className="snn-val-spinner" aria-label="검증 실행 중" />}
        {valRunning ? (
          // 최대 16개 패턴 × 3종(재현/노이즈/부분단서) = 최대 48 inject — 취소로 중단 가능.
          <button
            type="button"
            className="snn-val-run-btn snn-val-cancel-btn"
            onClick={() => { valAbortRef.current = true; }}
            aria-label="검증 취소"
            title="검증 취소"
          >
            ■ 취소
          </button>
        ) : (
          <button
            type="button"
            className="snn-val-run-btn"
            disabled={!canRun}
            onClick={() => { if (!valOpen) setValOpen(true); onRun(); }}
            aria-label="검증 실행"
            title={patternCount < 2 ? '패턴 2개 이상 필요' : isAutoLearning ? '학습 중 — 완료 후 실행' : '검증 실행'}
          >
            ▶ 실행
          </button>
        )}
      </div>

      {/* Body */}
      {valOpen && (
        <div className="snn-val-body">
          {patternCount < 2 && (
            <span className="snn-val-disabled">패턴 2개 이상 필요</span>
          )}
          {valProgress && (
            <span className="snn-val-progress">
              검증 중… ({valProgress.done}/{valProgress.total})
            </span>
          )}
          {valResult && !valRunning && (
            <>
              <div className="snn-val-metrics">
                <MetricBar label="재현율" correct={valResult.repro.correct} total={valResult.repro.total} />
                <MetricBar label="노이즈" correct={valResult.noise.correct} total={valResult.noise.total} />
                <MetricBar label="부분단서" correct={valResult.partial.correct} total={valResult.partial.total} />
              </div>
              <ConfusionMatrix labels={valResult.labels} matrix={valResult.matrix} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ConfusionMatrix({ labels, matrix }: { labels: string[]; matrix: number[][] }) {
  const n = labels.length;
  if (n === 0) return null;
  // 짧게 표시할 label — 최대 4자.
  const short = labels.map((l) => (l.length > 5 ? l.slice(0, 4) + '…' : l));
  return (
    <div className="snn-val-matrix">
      <div className="snn-val-matrix-title">Confusion Matrix (3× 샘플, {n}×{n})</div>
      <div className="snn-val-matrix-scroll">
      <table className="snn-val-matrix-table" aria-label="confusion matrix">
        <thead>
          <tr>
            <th scope="col" aria-label="actual vs predicted">↓실제 / 예측→</th>
            {short.map((l, j) => <th key={j}>{l}</th>)}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <th scope="row">{short[i]}</th>
              {row.map((val, j) => {
                const cls = val > 0 && i === j
                  ? 'snn-val-cell--hit'
                  : val > 0
                    ? 'snn-val-cell--miss'
                    : 'snn-val-cell--zero';
                return (
                  <td key={j} className={cls} aria-label={i === j ? `정답 ${val}` : `오답 ${val}`}>
                    {val > 0 ? val : '·'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

// ─── Export / Import helpers ─────────────────────────────────────────────────

interface ExportSchema {
  version: '1.0';
  exportedAt: string;
  substrate: string;
  patterns: Array<{
    key: string;
    label: string | null;
    count: number;
    lastFeature: number[];
    lastAt: number;
  }>;
}

function exportPatterns(substrate: string, exemplars: OutExemplars): void {
  const exportData: ExportSchema = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    substrate,
    patterns: Object.entries(exemplars).map(([key, ex]) => ({
      key,
      label: ex.label,
      count: ex.count,
      lastFeature: ex.lastFeature,
      lastAt: ex.lastAt,
    })),
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `handface-patterns-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function parseImportFile(
  raw: string,
): { ok: true; map: OutExemplars } | { ok: false; error: string } {
  try {
    const data = JSON.parse(raw) as Partial<ExportSchema>;
    if (!data || typeof data !== 'object') return { ok: false, error: 'JSON 형식 오류' };
    if (data.version !== '1.0') return { ok: false, error: `지원하지 않는 버전: ${data.version}` };
    if (!Array.isArray(data.patterns)) return { ok: false, error: 'patterns 배열 없음' };
    const map: OutExemplars = {};
    for (const p of data.patterns) {
      if (typeof p.key !== 'string') continue;
      const entry: OutExemplar = {
        count: typeof p.count === 'number' ? p.count : 0,
        lastFeature: Array.isArray(p.lastFeature) ? p.lastFeature : [],
        lastAt: typeof p.lastAt === 'number' ? p.lastAt : Date.now(),
        label: typeof p.label === 'string' ? p.label : null,
      };
      map[p.key] = entry;
    }
    return { ok: true, map };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// ─── ExportImportRow component ───────────────────────────────────────────────

function ExportImportRow({
  substrate,
  exemplars,
}: {
  substrate: import('@/lib/snn/root-local-snn').SubstrateKind;
  exemplars: OutExemplars;
}) {
  const importRef = useRef<HTMLInputElement | null>(null);
  const hasPatterns = Object.keys(exemplars).length > 0;

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = ev.target?.result;
      if (typeof raw !== 'string') return;
      const result = parseImportFile(raw);
      if (!result.ok) {
        alert(`불러오기 실패: ${result.error}`);
        return;
      }
      const incoming = Object.keys(result.map).length;
      if (incoming === 0) {
        alert('불러올 패턴이 없습니다.');
        return;
      }
      const existing = Object.keys(exemplars).length;
      if (
        existing > 0 &&
        !window.confirm(
          `기존 패턴 ${existing}개가 불러온 ${incoming}개로 교체됩니다.\n계속하시겠습니까?`,
        )
      ) {
        return;
      }
      restoreExemplars(substrate, result.map);
    };
    reader.readAsText(file);
    // reset so same file can be re-selected
    e.target.value = '';
  }, [exemplars, substrate]);

  return (
    <div className="snn-out-io-row">
      <button
        type="button"
        className="snn-out-io-btn"
        disabled={!hasPatterns}
        title={hasPatterns ? '패턴 JSON 다운로드' : '학습된 패턴 없음'}
        aria-label="패턴 내보내기"
        onClick={() => exportPatterns(substrate, exemplars)}
      >
        ⬇ 내보내기
      </button>
      <button
        type="button"
        className="snn-out-io-btn"
        title="JSON 파일에서 패턴 불러오기"
        aria-label="패턴 불러오기"
        onClick={() => importRef.current?.click()}
      >
        ⬆ 불러오기
      </button>
      <input
        ref={importRef}
        type="file"
        accept="application/json,.json"
        className="snn-out-io-file-input"
        aria-hidden="true"
        title="패턴 JSON 파일 선택"
        onChange={handleImport}
      />
    </div>
  );
}

function RenameButton({ outKey, substrate, label, hasLabel }:
  { outKey: string; substrate: SubstrateKind; label: string; hasLabel: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) {
      setDraft(hasLabel ? label : '');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing, label, hasLabel]);

  const commit = () => {
    const t = draft.trim();
    setExemplarLabel(outKey, substrate, t.length === 0 ? null : t);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="snn-pipeline-out-input"
        value={draft}
        maxLength={32}
        aria-label="winner cluster label"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); commit(); }
          else if (e.key === 'Escape') { e.preventDefault(); setEditing(false); }
        }}
        placeholder="이름..."
      />
    );
  }
  return (
    <button
      type="button"
      className={`snn-pipeline-out-winner-btn ${hasLabel ? 'is-named' : ''}`}
      onClick={() => setEditing(true)}
      aria-label={`rename ${label}`}
      title="클릭 — 이름 변경"
      // F4 UX polish (2, 2026-05-11): toast action 영역 query selector 영역
      // out-key 영역 anchor (cluster-spawned toast → '이름 짓기' click 영역
      // scrollIntoView + focus path 영역 정합).
      data-out-rename-btn={outKey}
    >
      <span>{label}</span>
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
        <path d="M2 10v-2l6-6 2 2-6 6H2z" stroke="currentColor" strokeWidth="1.2"
          fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
