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
import { emitBackendEvent, onBackendEvent, type GridTrainingDetail, type GridInferDetail, type NeuronFiringDetail, type InputModeDetail, type ClusterSpawnedDetail } from '@/lib/backend/events';
import { showToast } from '@/components/ui/Toast';
import { useEngineMode } from '@/lib/snn/engine-mode';
import { getLiveSnn, onLiveTick } from '@/lib/snn/live-snn';
import { purgeAllLearningData } from '@/lib/snn/root-local-snn';
import { clearExemplars, loadExemplars } from '@/lib/snn/out-exemplars';
import { resolveClusterLabel } from './shared';
import { usePipelineEvents } from './PipelineEventContext';
// PR-K (사용자 catch 2026-05-09 catch 1): ART vigilance threshold — 추론
// 영역 winner margin < threshold 시점 영역 자동 expansion + 30 trial chunked
// reinforce. Carpenter & Grossberg 1987 ART vigilance 영역 정합.
// Fix #19 (사용자 catch 2026-05-10): 0.15 → 0.7 — 사용자 명시 zero-init +
// "동일 패턴 자동 강화" + "신규 패턴 자동 형성" 정합 path 영역 strict
// vigilance 영역 첫 입력 영역 항상 novel → cluster 1 spawn. 직전 0.15 영역
// 너무 관대 영역 base 4 substrate 영역 random winner 영역 familiar 판정 →
// 신규 cluster spawn 영역 안 영역 root cause. backend default 0.7 정합.
//
// 사용자 catch 2026-05-11 (jaccard-tolerance-band — 같은 패턴이 2/3번으로
// 신규 인식): PR #232 Jaccard symmetric fix 후 threshold 0.7 영역 너무 strict —
// 4-cell vertical [1,5,9,13] 학습 후 1 cell jitter [1,5,9,12] 영역 Jaccard
// = 3/(4+4-3) = 3/5 = 0.6 → < 0.7 → mismatch → spawn cluster 2 (false spawn).
// 사용자 mental model 위배 (동일 패턴 영역 미세 noise = 같은 cluster).
// fix: 0.7 → 0.5 — Fuzzy ART ρ ≈ 0.5 intermediate 학술 정합 (Carpenter &
// Grossberg 1991 — moderate selectivity, noise tolerance balance).
//   - 1-noise: Jaccard 0.6 ≥ 0.5 → pass + reinforce ✓ (same pattern 강화)
//   - 2-noise: Jaccard 2/6 = 0.33 < 0.5 → mismatch + spawn ✓ (true novel)
//   - subset (I⊂T, 4/8): Jaccard 0.5 → boundary pass (PR #232 borderline
//     — 단방향 종속 영역 미세 차이 → 사용자 mental model 영역 동일 pattern
//     계열 영역 정합). disjoint (0/N): 0.0 < 0.5 → spawn ✓.
const ART_VIGILANCE_THRESHOLD = 0.5;

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

// PR #196 polish (UX LOW-1/2): Status 영역 hint 영역 secondary line + warning
// kind 영역 amber visual cue 영역 추가. 직전 message 영역 long copy (timeout 영역
// '회로 build 또는 worker bundle 점검' 영역 모바일 320px 영역 줄바꿈) + 'low
// confidence' 영역 단순 text 영역 visual 0 catch.
//   - hint: secondary <small> line (long detail, screen reader 영역 보존, mobile
//           wrap-friendly).
//   - 'warning' kind: amber pill 영역 visual escalation (low-conf 영역 정합).
type Status =
  | { kind: 'idle' }
  | { kind: 'building' }
  | { kind: 'training'; cluster: number }
  | { kind: 'inferring' }
  | { kind: 'ok'; message: string; hint?: string }
  | { kind: 'warning'; message: string; hint?: string }
  | { kind: 'error'; message: string };

const TRAIN_FRAMES = 30;
// 사용자 catch 2026-05-10 (Request C): TRAIN_CHUNK 영역 trainPreset (4 button)
// 영역 폐기 영역 caller 0 — constant 폐기.

function emptyGrid(): number[] {
  return new Array<number>(16).fill(0);
}

// Backend audit fix #4 (UX-designer 권고): vigilance slider + novelty mode toggle.
// Carpenter-Grossberg 1987 ART vigilance ρ — 0.05~0.95 범위 (보수적 0.95 / 관대
// 0.05). default 0.7 영역 backend `app.py:3163` (vigilance_threshold default
// Field 정합) 영역 sync. 본 값 영역 POST /networks/{id}/cluster/vigilance body
// 영역 vigilance_threshold field 영역 직접 전송.
const VIGILANCE_MIN = 0.05;
const VIGILANCE_MAX = 0.95;
const VIGILANCE_DEFAULT = 0.7;
const VIGILANCE_STEP = 0.05;
// localStorage persist key — 사용자 직전 조정 값 영역 새로고침 후에도 유지.
const VIGILANCE_STORAGE_KEY = 'handface.vigilance.threshold';
const NOVELTY_MODE_STORAGE_KEY = 'handface.vigilance.novelty-mode';

function readStoredVigilance(): number {
  if (typeof window === 'undefined') return VIGILANCE_DEFAULT;
  try {
    const v = window.localStorage.getItem(VIGILANCE_STORAGE_KEY);
    if (!v) return VIGILANCE_DEFAULT;
    const parsed = Number(v);
    if (!Number.isFinite(parsed)) return VIGILANCE_DEFAULT;
    return Math.max(VIGILANCE_MIN, Math.min(VIGILANCE_MAX, parsed));
  } catch {
    return VIGILANCE_DEFAULT;
  }
}

function readStoredNoveltyMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(NOVELTY_MODE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function GridInput() {
  const [grid, setGrid] = useState<number[]>(() => emptyGrid());
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  // orientation 회로가 빌드되었는지 — 첫 학습 호출 시 자동 빌드 1회.
  const substrateBuiltRef = useRef<boolean>(false);
  const [engineMode] = useEngineMode();
  // 사용자 catch 2026-05-10 (block-infer-during-learn): auto-learn 진행 중
  // 영역 추론 block — runAutoLearnLoop 영역 30회 R-STDP 진행 중 영역 추론
  // 결과 unreliable 영역 사용자 catch. PipelineEventContext 영역 single-source
  // (auto-learn-progress event 영역 derived).
  const { isAutoLearning } = usePipelineEvents();

  // Backend audit fix #4 (UX-designer 권고 Part A+B): vigilance slider + novelty
  // 모드 토글. backend mode (engineMode='backend') 영역만 노출 — Live mode
  // 영역 별도 ART_VIGILANCE_THRESHOLD (0.15) 영역 LiveSnn worker 영역 정합.
  // collapse default — '고급 옵션' 영역 펼침 시 노출 (UX noise 회피).
  const [vigilance, setVigilance] = useState<number>(() => readStoredVigilance());
  const [noveltyMode, setNoveltyMode] = useState<boolean>(() => readStoredNoveltyMode());
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(VIGILANCE_STORAGE_KEY, String(vigilance));
    } catch {
      // ignore storage quota / private mode.
    }
  }, [vigilance]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(NOVELTY_MODE_STORAGE_KEY, noveltyMode ? '1' : '0');
    } catch {
      // ignore.
    }
  }, [noveltyMode]);

  // cluster-spawned event listener — toast (UX-designer Part C 권고).
  // 'cluster N' label 영역 OUT exemplar 영역 사용자 명명 영역 우선 (resolveClusterLabel),
  // fallback '패턴 N+1' (shared.ts getClusterLabel 정합).
  // 사용자 즉시 명명 affordance — toast 영역 일부 사용자 영역 OUT 노드 영역
  // RenameButton 영역 명시 명명 path 영역 진입 (강제 modal 회피 — UX 권고).
  useEffect(() => {
    return onBackendEvent<ClusterSpawnedDetail>('cluster-spawned', (d) => {
      const exemplars = loadExemplars('orientation');
      const label = resolveClusterLabel(exemplars, d.clusterIdx, 'grid');
      // shared.ts getClusterLabel 정합 — '패턴 {idx+1}' 한국어.
      // F4 UX polish (2, 2026-05-11): action 영역 OUT RenameButton scroll/focus
      // path 영역 후속 명명 affordance — 사용자 영역 즉시 명명 path 영역 진입.
      // querySelector 영역 data-out-rename-btn={outKey} 영역 anchor (out_{ci}_0 영역
      // winnerKey 영역 정합 — NodeOut 영역 winner cluster 영역 RenameButton 영역
      // 첫 slot 영역 render).
      const outKey = `out_${d.clusterIdx}_0`;
      showToast({
        kind: 'success',
        message: `${label} 자동 형성됨 (top share ${(d.topShare * 100).toFixed(0)}%)`,
        duration: 5000,
        action: {
          label: '이름 짓기',
          onClick: () => {
            if (typeof document === 'undefined') return;
            const btn = document.querySelector<HTMLButtonElement>(
              `[data-out-rename-btn="${outKey}"]`,
            );
            if (btn) {
              btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
              // focus 영역 click 영역 정합 — RenameButton 영역 click handler 영역
              // 'editing' state 영역 input render → focus 영역 별도 effect 영역
              // requestAnimationFrame 영역 trigger.
              btn.click();
            }
          },
        },
      });
    });
  }, []);
  // PR-K (사용자 catch 2026-05-09 catch 1): reinforcingCluster state 영역 본격
  // 폐기 — cluster 별 학습 button 영역 폐기 영역 in-flight gate 영역 caller 0.
  // Live 모드 영역 추론 button (runInferAuto) 영역 단일 trigger — pendingInferTokenRef
  // 영역 별도 in-flight gate.

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

  // 사용자 catch 2026-05-10 (Request C): applyPreset callback 영역 폐기 —
  // backend mode "학습 0~3" 4 button 영역 본격 폐기 영역 caller 0. ORIENTATION_PRESETS
  // 영역 trainAllRoundRobin (round-robin) 영역 직접 참조 영역 보존.

  const reset = useCallback(() => {
    setGrid(emptyGrid());
    setStatus({ kind: 'idle' });
  }, []);

  // PR-A architecture pivot (사용자 catch 2026-05-09 — Step 4 saturation escape):
  // Live 모드 영역 학습 가중치 영역 fresh build default 영역 restore. 직전
  // horizontal lock-in 영역 IndexedDB 영속 영역 새로고침 영역 escape 0 영역
  // mandatory escape path. Backend 모드 영역 본 path 영역 호출 0 (backend net
  // 영역 별도 lifecycle).
  // 사용자 catch 2026-05-09 [2] (Fix 5): substrate-aware reset — 직전 'orientation'
  // hard-code 영역 GRID 영역 정합 단 GridInput 영역 GRID 전용 영역 정합 보존.
  // CameraInput 영역 별도 mirror reset 영역 'gesture' 영역 정합. clearExemplars
  // 영역 UI count 영역 동시 0 (사용자 catch — backend reset 후 UI 영역 stale count
  // 영역 carry-over 회피).
  // PR-J (사용자 catch 2026-05-09 [2]): 양 substrate 영역 완벽 isolated reset.
  // sequence:
  //   1. resetClusterWeights — worker 영역 fresh build (net.t=0, weights 0,
  //      thresholds 0, monitor clear).
  //   2. live.resetTrigger() — trial/lastWinnerCluster/patternRef 영역 0.
  //   3. clearExemplars(substrate) — UI count 영역 substrate-aware clear.
  //   4. lab.save() — fresh weights 영역 영속 (다음 reload 영역 stale lock-in 0).
  // substrate isolation — 'orientation' 영역만 reset (PR-G 영역 정합) — 'gesture'
  // 영역 별도 LocalSNN + 별도 IndexedDB store 영역 보존.
  // 사용자 catch 2026-05-10 (Request C): "학습 데이터 전체 삭제 (DB)" + "default
  // 학습 데이터 폐기" — 직전 path 영역 worker resetClusterWeights + lab.save
  // 영역 영속 (IndexedDB) 영역 stale snapshot 영역 잔여 catch (사용자 catch:
  // "학습되지 않았는데 자동으로 패턴1, 패턴2, 패턴3, 패턴4가 추론"). 정정 path:
  //   1. purgeAllLearningData — IndexedDB 양 substrate wipe + cache dispose +
  //      localStorage handface.* (출력 라벨 / vigilance / migration 외) wipe.
  //   2. UI count 영역 substrate 양쪽 clear (사용자 명시 "전체 삭제").
  //   3. fresh substrate rebuild trigger (다음 mount 영역 zero-init).
  //   4. live state-clear + reload prompt (worker 영역 영속 cache 영역 mount-time
  //      영역 fresh — 페이지 reload 영역 가장 안전 path).
  const resetLearningLive = useCallback(async () => {
    if (engineMode !== 'live') return;
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        '학습 데이터 전체 삭제\n\n양 substrate (GRID + CAMERA) 영역 모든 학습 가중치 + 학습 횟수 + 추론 결과 + 영속 DB (IndexedDB) 영역 완전 wipe 됩니다.\n\n계속하시겠습니까?',
      );
      if (!confirmed) return;
    }
    setStatus({ kind: 'building' });
    try {
      // Step 1: LiveSnn state-clear — trial/lastWinner/patternRef 0.
      try {
        getLiveSnn().resetTrigger();
      } catch {
        // SSR / 미초기화 — 무시.
      }
      // Step 2: 영속 (IndexedDB) + cache + localStorage 영역 wipe.
      await purgeAllLearningData();
      // Step 3: UI count 영역 양 substrate 영역 clear (사용자 명시 전체 삭제).
      clearExemplars('orientation');
      clearExemplars('gesture');
      setStatus({
        kind: 'ok',
        message: '학습 데이터 전체 삭제 완료 — 페이지 새로고침 권장',
      });
      // Step 4: 다음 mount 영역 fresh build — page reload 영역 가장 안전 path.
      // 사용자 명시 confirm 후 1500ms delay 영역 reload (status message visibility).
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          try {
            window.location.reload();
          } catch {
            // ignore
          }
        }, 1500);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `학습 데이터 삭제 실패: ${msg}` });
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

  // 사용자 catch 2026-05-10 (Request C): trainPreset (4 cluster 별 30-frame
  // R-STDP supervised batch) 영역 callback 영역 본격 폐기 — 본 path 영역
  // "학습 0~3" 4 button 영역 단일 caller 영역 button 폐기 영역 정합. ART
  // unsupervised auto-learn 영역 noveltyMode toggle (vigilance endpoint) 영역
  // 동일 paradigm 영역 backend mode 영역 path 영역 단일화. trainAllRoundRobin
  // (round-robin 4 cluster 균등 학습) 영역 별도 의미 영역 보존.
  // TRAIN_FRAMES / TRAIN_CHUNK 상수 영역 trainAllRoundRobin 영역 직접 미사용 단
  // ORIENTATION_LABELS 영역 status copy 영역 보존 — 향후 supervised path 부활
  // 가능 영역 stub 영역 catch.

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
  // Backend audit fix #4 (UX-designer Part B): noveltyMode on 영역 vigilance
  // endpoint (POST /networks/{id}/cluster/vigilance) 영역 사용 — 응답 영역
  // is_novel===true && action==='spawned' 시점 영역 toast 자동 trigger
  // (clusterVigilance method 영역 emit 영역 정합).
  const runInfer = useCallback(async () => {
    // 사용자 catch 2026-05-10 (block-infer-during-learn): auto-learn 진행 중
    // 영역 추론 차단 — 30회 R-STDP weight mutation 영역 미완료 영역 winner
    // unreliable. status 영역 visible hint + grid-infer started emit 0
    // (PipelineEventContext 영역 winner reset 영역 회피 — 직전 winner 보존).
    if (isAutoLearning) {
      setStatus({
        kind: 'warning',
        message: '학습 중 — 추론 대기',
        hint: '신규 패턴 30회 학습 진행 중 — 완료 후 추론 사실',
      });
      return;
    }
    setStatus({ kind: 'inferring' });
    emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'started' });

    if (noveltyMode) {
      // Fix #19 (사용자 catch 2026-05-10): auto train-or-spawn 영역 단일 path —
      // vigilance miss → spawn + N회 R-STDP, vigilance pass → 동일 cluster
      // N회 R-STDP. 사용자 명시 "추론시 자동 학습" + "동일 패턴 자동 강화" 정합.
      const r = await getClient().clusterAutoTrainOrSpawn(grid, {
        vigilanceThreshold: vigilance,
        trainIterations: 30,
      });
      if (r.ok) {
        const cluster = r.data.cluster_idx;
        const winnerCluster = Number.isInteger(cluster) && cluster >= 0
          ? cluster
          : null;
        const action = r.data.action;
        const actionLabel = action === 'spawned'
          ? `신규 cluster ${cluster + 1} 형성`
          : `cluster ${cluster + 1} 강화`;
        setStatus({
          kind: 'ok',
          message: `${actionLabel} (${r.data.train_iterations}회 학습)`,
        });
        emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'finished', winnerCluster });
      } else {
        setStatus({ kind: 'error', message: `추론 실패: ${r.reason}` });
        emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: r.reason });
      }
      return;
    }

    // ── Backend mode (engineMode='backend' — 학술 검증된 path) ────
    // Live 5차 (사용자 catch 2026-05-09): 'local' batch path 폐기.
    const r = await getClient().injectPattern(grid, { stdp: false });
    if (r.ok) {
      const cluster = r.data.winner_cluster ?? null;
      // Audit Fix #8 (2026-05-10): backend dynamic cluster cap (max_clusters=64)
      // 영역 정합 — 0..3 cap 폐기, non-negative integer 영역 그대로 forward.
      const winnerCluster = cluster !== null && Number.isInteger(cluster) && cluster >= 0
        ? cluster
        : null;
      setStatus({ kind: 'ok', message: '추론 완료' });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'finished', winnerCluster });
    } else {
      setStatus({ kind: 'error', message: `추론 실패: ${r.reason}` });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: r.reason });
    }
  }, [grid, noveltyMode, vigilance, isAutoLearning]);

  // 사용자 catch 2026-05-10 (block-infer-during-learn): isAutoLearning 영역
  // isBusy 영역 합산 — 추론 button + 패턴 지우기 + 학습 reset 영역 동시 disable
  // (학습 진행 중 영역 grid mutation 영역 race 회피).
  const isBusy = status.kind === 'building' || status.kind === 'training' || status.kind === 'inferring' || isAutoLearning;

  // PR #196 polish (UX LOW-1): hint 영역 secondary <small> line 영역 render —
  // ok/warning kind 영역 long detail 영역 wrap-friendly catch (모바일 320px
  // viewport 영역 줄바꿈 정합).
  const statusLine = useMemo(() => {
    switch (status.kind) {
      case 'idle': return '대기 중';
      case 'building': return '회로 빌드 중…';
      case 'training': return `${ORIENTATION_LABELS[status.cluster]} 학습 중 (${TRAIN_FRAMES} frame)…`;
      case 'inferring': return '추론 중…';
      case 'ok':
      case 'warning':
        return status.hint
          ? (
            <>
              <span className="snn-grid-status-msg">{status.message}</span>
              <small className="snn-grid-status-hint">{status.hint}</small>
            </>
          )
          : status.message;
      case 'error': return status.message;
    }
  }, [status]);

  // PR #192 polish (UX-2 + UX-3): in-flight token tracking — push event 영역
  // trialToken match 영역 status 영역 '추론 완료' 영역 swap. setTimeout 2000ms
  // 영역 safety-net (worker hang 영역 catch). pendingInferTokenRef 영역 mutable
  // ref 영역 callback closure 영역 stale 회피.
  const pendingInferTokenRef = useRef<number | null>(null);

  // PR-K (사용자 catch 2026-05-09 catch 1): ART unsupervised auto-learn —
  // "추론 버튼이 곧 학습 적용(자동) = 처음 만나는 패턴일 경우 30회 자동 학습
  // 후, 패턴 기억". 직전 inferAsync (STDP off) path 영역 wrap — winner margin
  // 영역 vigilance threshold 영역 비교 영역:
  //   - margin >= threshold (0.15): 단순 winner 표시 (familiar pattern).
  //   - margin <  threshold (0.15): novel pattern → triggerWithVigilance 영역
  //     auto-learn (ART expansion + 30 trial chunked reinforce).
  //
  // 학술 정합: Carpenter & Grossberg 1987 ART vigilance — match score < ρ →
  // reset → 새 cluster 슬롯 할당 + 30 trial supervised reinforce 영역 weight
  // 수렴. 본 path 영역 사용자 supervised label 영역 0 영역 unsupervised
  // 자율 cluster 형성 — fallback '패턴 N' label (RenameButton 영역 사용자
  // 명명 path 영역 별도).
  //
  // 정직 한계: 본격 ART expansion (worker.expandCluster RPC) 영역 production
  // wire — registry length ↑ 후 신규 cluster 영역 30 trial reinforce. 30 trial
  // 영역 5-trial chunk × 6 round 영역 progress emit (NodeLearn 영역 auto-learn
  // visibility). 사용자 supervised 명시 신호 0 영역 cluster identity 영역 자율
  // 형성 — RenameButton 영역 사용자 명명 path 영역 mandatory (의미 부여).
  const runInferAuto = useCallback(async () => {
    // 사용자 catch 2026-05-10 (block-infer-during-learn): Live mode 영역
    // auto-learn 30회 진행 중 영역 추론 차단 — winner unreliable 영역 사용자
    // catch. status 영역 visible hint + LiveSnn.triggerWithVigilance 호출 0.
    if (isAutoLearning) {
      setStatus({
        kind: 'warning',
        message: '학습 중 — 추론 대기',
        hint: '신규 패턴 30회 학습 진행 중 — 완료 후 추론 사실',
      });
      return;
    }
    setStatus({ kind: 'inferring' });
    // QA round 4 fix #13 (2026-05-10): Live mode 영역 'grid-infer' started
    // emit 영역 mandatory — PipelineEventContext 영역 reset trigger 영역
    // 직전 winner stale carry-over 회피 (backend mode runInfer 영역 정합).
    emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'started' });
    try {
      const live = getLiveSnn();
      live.setPattern(grid);
      // triggerWithVigilance 영역 fire-and-forget — 즉시 return + 결과 영역
      // worker push event 영역 별도 emit. 본 method 영역 vigilance 영역 비교
      // 영역 winner margin < threshold 시점 영역 ART expansion + 30 trial
      // chunked reinforce 영역 auto-trigger.
      const { trialToken } = live.triggerWithVigilance(grid, ART_VIGILANCE_THRESHOLD);
      pendingInferTokenRef.current = trialToken;
      setStatus({ kind: 'inferring' });
      // QA FINDING-2 fix (2026-05-10): safety-net 8000ms — worker simulation
      // throttled CPU 영역 ≥2s 가능 + auto-learn 영역 30 trial × ~150ms ≈ 4.5s
      // 영역 timeout 회피 mandatory (8s 영역 보수적 catch).
      setTimeout(() => {
        if (pendingInferTokenRef.current === trialToken) {
          pendingInferTokenRef.current = null;
          setStatus((s) => s.kind === 'inferring'
            ? { kind: 'ok', message: '추론 완료 *', hint: '(처리 지연 — 잠시 후 재시도)' }
            : s);
        }
      }, 8000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus({ kind: 'error', message: `추론 실패: ${msg}` });
      emitBackendEvent<GridInferDetail>('grid-infer', { kind: 'error', message: msg });
    }
  }, [grid, isAutoLearning]);

  // PR-K (사용자 catch 2026-05-09 catch 1): reinforceLive callback 영역 본격
  // 폐기 — cluster 별 supervised reinforce button 영역 모두 제거 + 추론 button
  // (runInferAuto) 영역 ART unsupervised auto-learn 영역 단일 trigger.
  // 직전 R-STDP supervised path 영역 backend mode 영역 trainPreset 영역 보존
  // (학술 검증 — 명시 supervised label 영역 신호).

  // PR #192 polish (UX-3 + QA FINDING-1/2): LiveTickDetail listener 영역 push
  // event 영역 trialToken match 영역 정확 reset (status copy + reinforcingCluster).
  // 직전 setTimeout 100ms 영역 race 영역 회피 — worker 영역 actual completion
  // 시점 영역 sync.
  useEffect(() => {
    if (engineMode !== 'live') return;
    return onLiveTick((d) => {
      if (d.source === 'trigger' && d.trialToken !== undefined) {
        if (pendingInferTokenRef.current === d.trialToken) {
          pendingInferTokenRef.current = null;
          // 사용자 catch 2026-05-11 (vigilance-mismatch-no-winner-broadcast):
          //   mismatch 영역 vigilanceMismatch=true → status 영역 '신규 패턴 형성 중'
          //   hint — 사용자 영역 "다른 패턴 영역 cluster 1 영역 학습" 영역 misread
          //   회피. runAutoLearnLoop 영역 별도 dispatch (30 trial spawn + reinforce) →
          //   reinforce push 영역 final '자동 학습 완료' status swap path 정합.
          //   winner=-1 (mismatch path 영역 emitTick 영역 invalidate) — lowConf 영역
          //   동시 true 단 vigilanceMismatch 영역 우선 (사용자 mental model 정합).
          if (d.vigilanceMismatch) {
            setStatus({
              kind: 'warning',
              message: '신규 패턴 — 자동 학습 시작',
              hint: 'vigilance miss — 신규 cluster spawn + 30회 R-STDP',
            });
          } else {
            // QA FINDING-5 fix (2026-05-10): margin < 10% 영역 '낮은 confidence'
            // 영역 status copy 영역 hint — Diehl & Cook 2015 winner margin 10%
            // threshold 정합 (NodeInfer MarginMeter 영역 정합). winner -1 영역
            // silent 영역 별도 catch.
            // PR #196 polish (UX LOW-2): low-conf 영역 단순 text → 'warning' kind
            // 영역 amber pill 영역 visual cue 정합 (snn-grid-status--warning CSS
            // 영역 amber border + ⚠ glyph). hint 영역 short detail 영역 분리 —
            // main message 영역 단축 catch.
            const lowConf = d.winner < 0 || d.margin < 0.10;
            if (lowConf) {
              setStatus({
                kind: 'warning',
                message: '추론 완료',
                hint: '신뢰도 낮음 — 자세 안정화 권장',
              });
            } else {
              setStatus({ kind: 'ok', message: '추론 완료' });
            }
          }
        }
      } else if (d.source === 'reinforce' && d.trialToken !== undefined) {
        // PR-K (사용자 catch 2026-05-09 catch 1): auto-learn 30 trial chunked
        // reinforce 영역 progress emit — pendingInferTokenRef 영역 동일 token
        // 영역 catch + final status 영역 'auto-learn 완료' 영역 swap. 직전
        // pendingReinforceTokenRef 영역 폐기 (cluster 별 학습 button 영역 폐기).
        if (pendingInferTokenRef.current === d.trialToken) {
          // 본 reinforce push 영역 last chunk 시점 영역 token reset (caller
          // 영역 worker 영역 final reinforce 영역 emit 시점 영역 catch).
          pendingInferTokenRef.current = null;
          const tc = d.targetCluster;
          const label = tc !== undefined && tc >= 0
            ? `패턴 ${tc + 1}`
            : '패턴';
          setStatus({
            kind: 'ok',
            message: `${label} 자동 학습 완료 (30 trial)`,
            hint: 'ART vigilance 영역 신규 cluster 영역 자동 형성',
          });
        }
      }
    });
  }, [engineMode]);

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
          {/* PR (manual-trigger-paradigm, 사용자 catch 2026-05-10): copy 정합
              유지 — "추론 버튼을 누르세요" 영역 사용자 명시 paradigm (click
              영역만 학습 + 추론 trigger) 영역 정합. 처음 보는 패턴 영역 30회
              학습 + 새 cluster 추가 영역 vigilance miss path 영역 정합 — 본
              조건 영역 추론 button click 영역만 trigger. */}
          LIVE — 4×4 그리드를 그린 후 추론 버튼을 누르세요. 처음 보는 패턴은 30회 학습 + 새 cluster 추가.
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

      {/* 사용자 catch 2026-05-10 (Request C): backend mode 영역 "학습 0~3" 4
          preset 버튼 영역 본격 폐기 — "추론시 자동 학습" 영역 vigilance 영역
          art.ts 영역 production wire 완료 영역 noveltyMode toggle 영역 vigilance
          endpoint 영역 동일 paradigm 영역 정합. backend mode 영역 trainPreset /
          applyPreset 영역 callback 영역 보존 — 외부 trigger (legacy supervised
          path 영역 학술 검증 영역 별도 호출 가능) catch. 본 UI 영역 noise — 명시
          폐기. '전체 학습 (round-robin)' 영역 보존 (사용자 명시 — 동일 paradigm
          단 round-robin 영역 4 cluster 균등 학습 path 영역 별도 의미). */}
      {/* PR-L (사용자 catch 2026-05-10): Live 모드 영역 preset apply button × 4
          본격 폐기 — "INPUT node의 패턴 선택은 없어져도 괜찮을것 같아요(자율
          학습)". 사용자 영역 4×4 grid 영역 직접 그림 영역 자율 학습 path 영역
          정합. preset apply button 영역 noise — 추론 button (runInferAuto) 영역
          ART unsupervised auto-learn 영역 단일 trigger. ORIENTATION_PRESETS /
          applyPreset 영역 backend mode 영역 trainPreset/trainAllRoundRobin
          영역 보존 (학술 supervised path 영역 별도). */}

      {/* Backend audit fix #4 (UX-designer Part A+B): vigilance slider + novelty
          mode toggle. backend mode 영역만 노출 (Live 영역 LiveSnn worker 영역
          별도 ART_VIGILANCE_THRESHOLD=0.15). collapse default — '고급 옵션'
          영역 펼침 시 노출 (UX noise 회피, WCAG touch target ≥ 44px). */}
      {!isLiveMode && (
        <div className="snn-grid-vigilance-panel">
          <button
            type="button"
            className="snn-grid-train-all-btn snn-grid-vigilance-toggle"
            onClick={() => setAdvancedOpen((v) => !v)}
            aria-expanded={advancedOpen ? 'true' : 'false'}
            aria-controls="snn-grid-vigilance-body"
            title="ART vigilance threshold + novelty 모드"
          >
            {advancedOpen ? '▾ 고급 옵션 (ART vigilance)' : '▸ 고급 옵션 (ART vigilance)'}
          </button>
          {advancedOpen && (
            <div id="snn-grid-vigilance-body" className="snn-grid-vigilance-body">
              <label className="snn-grid-vigilance-mode-row">
                <input
                  type="checkbox"
                  className="snn-grid-vigilance-mode-checkbox"
                  checked={noveltyMode}
                  onChange={(e) => setNoveltyMode(e.target.checked)}
                  aria-label="novelty 판정 모드 — vigilance endpoint 사용"
                />
                <span>
                  novelty 모드 — 추론 시 자동 spawn 판정
                  <small className="snn-grid-vigilance-mode-hint">
                    (POST /networks/&#123;id&#125;/cluster/vigilance)
                  </small>
                  {/* Audit Fix #10 (2026-05-10, UX-designer Catch B):
                      noveltyMode=on 영역 toast 미발생 confusion 회피 영역
                      정직 disclosure — 신규 패턴 영역 한정 trigger. */}
                  {noveltyMode && (
                    <small className="snn-grid-vigilance-mode-hint">
                      신규 패턴 감지 시 자동 ★ + toast — 기존 학습된 패턴은 표시 안 됨
                    </small>
                  )}
                </span>
              </label>
              <div className="snn-grid-vigilance-slider-wrap">
                <label
                  htmlFor="snn-grid-vigilance-slider"
                  className="snn-grid-vigilance-slider-label"
                >
                  <span>vigilance threshold ρ</span>
                  <span className="snn-pipeline-mono">{vigilance.toFixed(2)}</span>
                </label>
                <div className="snn-grid-vigilance-slider-row">
                  <input
                    id="snn-grid-vigilance-slider"
                    type="range"
                    className="snn-grid-vigilance-slider-input"
                    min={VIGILANCE_MIN}
                    max={VIGILANCE_MAX}
                    step={VIGILANCE_STEP}
                    value={vigilance}
                    onChange={(e) => setVigilance(Number(e.target.value))}
                    aria-label={`vigilance threshold ${vigilance.toFixed(2)}`}
                    disabled={isBusy}
                  />
                  <input
                    type="number"
                    className="snn-grid-vigilance-number-input snn-pipeline-mono"
                    min={VIGILANCE_MIN}
                    max={VIGILANCE_MAX}
                    step={VIGILANCE_STEP}
                    value={vigilance.toFixed(2)}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (Number.isFinite(v)) {
                        setVigilance(Math.max(VIGILANCE_MIN, Math.min(VIGILANCE_MAX, v)));
                      }
                    }}
                    aria-label="vigilance numeric input"
                  />
                </div>
                {/* Audit Fix #9 (2026-05-10, UX-designer Catch A): 극단 ρ
                    영역 reactive hint — ρ ≥ 0.9 폭증 위험 (amber), ρ ≤ 0.1
                    신규 형성 거의 0 (gray), 0.1 < ρ < 0.9 일반 설명. aria-live
                    polite 영역 slider 영역 변화 announce. inline style 영역
                    회피 영역 className modifier (--danger / --muted) 영역 swap. */}
                <small
                  className={
                    vigilance >= 0.9
                      ? 'snn-grid-vigilance-foot-hint snn-grid-vigilance-foot-hint--danger'
                      : vigilance <= 0.1
                        ? 'snn-grid-vigilance-foot-hint snn-grid-vigilance-foot-hint--muted'
                        : 'snn-grid-vigilance-foot-hint'
                  }
                  aria-live="polite"
                >
                  {vigilance >= 0.9
                    ? '거의 모든 입력을 신규 cluster 로 분류 — 폭증 위험'
                    : vigilance <= 0.1
                      ? '신규 cluster 형성 거의 0 — 기존 cluster 만 매치'
                      : '높을수록 새 패턴으로 더 자주 분류 — Carpenter-Grossberg 1987 ART ρ'}
                </small>
              </div>
            </div>
          )}
        </div>
      )}

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
          onClick={isLiveMode ? runInferAuto : runInfer}
          disabled={isBusy}
          aria-label={
            isAutoLearning
              ? '추론 — 학습 진행 중 영역 대기'
              : isLiveMode ? '추론 — STDP off, 가중치 변경 0' : '추론'
          }
          title={
            isAutoLearning
              ? '학습 중 — 추론 대기 (신규 패턴 30회 학습 후 enable)'
              : isLiveMode
                ? '4×4 패턴 영역 추론 (STDP off — 가중치 변경 0)'
                : '4×4 패턴 영역 추론'
          }
        >
          {isAutoLearning ? '학습 중…' : '추론'}
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

      {/* PR #192 polish (UX-1): aria-live polite + role=status — 백그라운드
          push event 영역 status swap 영역 screen reader 영역 정합 (직전 silent
          DOM mutation 영역 a11y 영역 catch 0). */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`snn-grid-status snn-grid-status--${status.kind}`}
      >
        <span>{statusLine}</span>
      </div>
    </div>
  );
}
