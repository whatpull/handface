'use client';
// Root /handface/ 5-node 파이프라인 의 Live 모드 substrate LocalSNN singleton.
//
// 사용자 명시 (2026-05-09 no-new-UI 규칙): /snn-lab 폐기 → root 통합.
// Live 5차 (2026-05-09 — case B moderate): EngineMode='local' batch path
// 폐기 — 본 모듈 영역 last consumer 영역 LiveSnn (live-snn.ts) 영역 단일.
// LiveSnn tick / reinforce 영역 substrate 회로 영역 lazy init / 가중치
// 영속 영역 단일 책임.
//
// PR4 (사용자 catch 2026-05-09 — Live 4차): substrate kind 별 segregated
// instance map. 'orientation' / 'gesture' 각각 별도 LocalSNN + storage key
// 영역 segregate (netId 영역 'root-pipeline-orientation' /
// 'root-pipeline-gesture'). 두 substrate 가중치 동시 영속 — GRID input
// (orientation) 과 CAMERA input (gesture) 가 별도 회로 영역 사용 사실 정합.
//
// SSR 안전 (window 가드).

import {
  IndexedDBSink,
  LocalSNN,
  MainThreadTransport,
  SNNWorkerClient,
  createSnnWebWorker,
  migrateLocalStorageToIndexedDB,
  type LocalSNNStatus,
  type WorkerLike,
} from '@/lib/snn-runtime';
import { showToast } from '@/components/ui/Toast';
import { clearExemplars } from './out-exemplars';

// P218 (2026-05-20) — 'orientation-5x5' 영역 추가. 5×5 substrate (n14_extended)
// 영역 영역 영역 separate cache / netId / persistence — orientation (4×4) 영역
// 별도 instance 영역 영역 (research panel P218 영역 영역).
export type SubstrateKind = 'orientation' | 'gesture' | 'orientation-5x5';

// substrate kind 영역 영역 영역 build preset dispatch.
export function buildPresetForKind(kind: SubstrateKind): 'n13_orientation' | 'n14_extended' {
  return kind === 'orientation-5x5' ? 'n14_extended' : 'n13_orientation';
}

// 사용자 catch 2026-05-09 [2] (Fix 4 — MEDIUM): DB hydrate visibility event —
// LocalSNN.init 영역 fresh build vs hydrate 영역 catch 영역 emit. NodeLearn
// 영역 footer status row 영역 표시 (substrate isolation 보존 — kind 동봉).
export type LocalSnnInitState =
  | { kind: SubstrateKind; phase: 'fresh' }
  | { kind: SubstrateKind; phase: 'hydrated'; savedAt: number; rev: number };

const LOCAL_SNN_INIT_STATE_EVENT = 'handface.local-snn.init-state';

export function emitLocalSnnInitState(state: LocalSnnInitState): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<LocalSnnInitState>(LOCAL_SNN_INIT_STATE_EVENT, { detail: state }));
}

export function subscribeLocalSnnInitState(
  cb: (state: LocalSnnInitState) => void,
): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<LocalSnnInitState>).detail);
  window.addEventListener(LOCAL_SNN_INIT_STATE_EVENT, handler);
  return () => window.removeEventListener(LOCAL_SNN_INIT_STATE_EVENT, handler);
}

// substrate 영역 마지막 init 영역 cache — NodeLearn 영역 mount 시점 영역 sync.
// init 영역 promise complete 시점 영역 1회 emit + cache 영역 update — listener
// 영역 mount 영역 감사 (event miss 영역 cache fallback).
const _lastInitState = new Map<SubstrateKind, LocalSnnInitState>();

export function getLastLocalSnnInitState(kind: SubstrateKind): LocalSnnInitState | null {
  return _lastInitState.get(kind) ?? null;
}

const SEED = 57;

// Fix #20 (2026-05-10): zero-init dynamic — orientation substrate 영역 base
// cluster 영역 폐기. 사용자 mental model "1 입력 = vigilance miss → cluster
// spawn 1, 2, 3, ..." 영역 정합 — 첫 trigger 영역 vigilance miss 영역 자동
// expandCluster 영역 cluster 영역 spawn (live-snn.runAutoLearnLoop 정합).
// 사용자 명시 "기존 로직 신경쓰지말고" — backward compat 폐기 권한.
const ORIENTATION_CLUSTER_ACTIVE_INPUTS: number[][] = [];

function netIdFor(kind: SubstrateKind): string {
  return `root-pipeline-${kind}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function clusterActiveInputsFor(_kind: SubstrateKind): number[][] {
  // orientation 전용 고정 — 카메라/gesture 제거 (2026-05-14).
  return ORIENTATION_CLUSTER_ACTIVE_INPUTS;
}

export interface RootLocalSnn {
  client: SNNWorkerClient;
  lab: LocalSNN;
  status: LocalSNNStatus;
  kind: SubstrateKind;
}

interface CacheEntry {
  client: SNNWorkerClient | null;
  lab: LocalSNN | null;
  initPromise: Promise<LocalSNNStatus> | null;
}

const _cache: Map<SubstrateKind, CacheEntry> = new Map();

function ensureEntry(kind: SubstrateKind): CacheEntry {
  let e = _cache.get(kind);
  if (!e) {
    e = { client: null, lab: null, initPromise: null };
    _cache.set(kind, e);
  }
  return e;
}

// Lazy 초기화 — 첫 호출 시 LocalSNN 빌드 (client + sink + lab.init).
// substrate kind 별 별도 instance — orientation / gesture 동시 영속.
// 같은 kind 영역 multiple call 시 재사용. SSR 시점 호출 안 됨 (window
// 가드 — Next.js client component 영역만 사용).
export async function getRootLocalSnnFor(kind: SubstrateKind): Promise<RootLocalSnn> {
  if (typeof window === 'undefined') {
    throw new Error('getRootLocalSnnFor: client-only');
  }
  const entry = ensureEntry(kind);
  if (entry.lab && entry.client && !entry.initPromise) {
    return { client: entry.client, lab: entry.lab, status: entry.lab.status(), kind };
  }
  if (entry.initPromise) {
    const s = await entry.initPromise;
    return { client: entry.client!, lab: entry.lab!, status: s, kind };
  }
  // 신규 초기화.
  // 사용자 catch 2026-05-09 (CRITICAL — quota 잔존 정정):
  //   LocalStorageSink 영역 5-10MB quota 영역 n13 substrate 2개 (~6MB) +
  //   delta 영역 초과. IndexedDB 영역 50MB+ quota 영역 swap.
  //   1회 legacy localStorage cleanup — idempotent (MIGRATION_KEY mark).
  migrateLocalStorageToIndexedDB();
  // PR-B (Web Worker background offload, 2026-05-10): Web Worker swap.
  //
  // 사용자 catch 2026-05-09 [2]: "학습이나 추론시에 백그라운드에서 동작하면
  // 좋을 것 같습니다. 너무 버벅이고 유저 액션(이벤트)에 지연발생(불편함)"
  //
  // HIGH FINDING-1 정정: 직전 영역 MainThreadTransport hard-wire 영역 모든 SNN
  // RPC 영역 main thread 영역 sync block 영역 root cause. 본 정정 영역 Worker
  // global 가용성 catch 영역 createSnnWebWorker (별도 thread 영역 simulation)
  // 영역 swap. SSR / Node test / Worker 미지원 환경 (legacy browser) 영역
  // MainThreadTransport fallback 영역 호환 보존.
  //
  // 정직 한계:
  //  - Web Worker dev HMR 영역 worker bundle 영역 cache 영역 schema 변경 시점
  //    영역 reload mandatory.
  //  - snapshot 영역 main thread ↔ worker 영역 structured clone 영역 cost 영역
  //    매 save 영역 100KB+ — 단 LocalSNN.save() 영역 throttle 영역 catch.
  //  - visual flicker race — push event 영역 microtask 영역 dispatch 영역
  //    setState 영역 batch frame 영역 정합 catch (React 19 영역 useTransition
  //    영역 별도 hook 영역 mitigation 권장 — 본 PR scope-out).
  let transport: WorkerLike;
  if (typeof Worker !== 'undefined') {
    try {
      transport = createSnnWebWorker();
    } catch (e) {
      // Worker 영역 module-type bundle 영역 fail (test env / legacy bundler) →
      // MainThreadTransport fallback (호환 보존).
      // QA FINDING-2 fix (2026-05-10): silent console.warn 영역 사용자 catch 0
      // → toast + emitBackendEvent('snn-error') — gh-pages MIME mismatch 영역
      // bundle fail catch 시점 영역 main thread fallback 영역 사용자 visual
      // catch 영역 정합 (timeout 영역 root cause hint 영역 사용자 정합).
      const message = e instanceof Error ? e.message : String(e);
      console.warn('[root-local-snn] Web Worker bundle 영역 fail — MainThreadTransport fallback:', e);
      try {
        showToast({
          kind: 'warning',
          message: 'SNN Worker 번들 로드 실패 — 메인 스레드 폴백으로 동작합니다 (성능 저하 가능 — 새로고침 권장)',
          duration: 8000,
        });
      } catch { /* SSR / window 0 catch */ }
      try {
        // 동적 import 영역 cyclic dep 영역 회피.
        void import('@/lib/backend/events').then(({ emitBackendEvent }) => {
          emitBackendEvent('snn-error', {
            source: 'worker-bundle-fail',
            message,
            context: { kind, fallback: 'MainThreadTransport' },
          });
        }).catch(() => undefined);
      } catch { /* silent — telemetry best-effort */ }
      transport = new MainThreadTransport();
    }
  } else {
    transport = new MainThreadTransport();
  }
  const client = new SNNWorkerClient(transport);
  const sink = new IndexedDBSink();
  const lab = new LocalSNN({
    netId: netIdFor(kind),
    client,
    sink,
    seed: SEED,
    // P218 (2026-05-20): substrate kind 영역 영역 영역 preset dispatch — 'orientation-5x5'
    // 영역 영역 영역 n14_extended (5×5 input), 영역 영역 영역 n13_orientation (4×4 default).
    preset: buildPresetForKind(kind),
    clusterActiveInputs: clusterActiveInputsFor(kind),
    // PR #189 polish UX-1 (HIGH, 2026-05-10): stale cache reject 영역 silent
    // catch 회피 — 사용자 영역 직전 학습 가중치 폐기 영역 명시 catch path.
    //   schema-mismatch: schema:1 (legacy v1) topology 영역 reject (Fix B path).
    //   weight-length-mismatch: synapse 수 불일치 영역 fresh build (drift 정정).
    //   fix-baseline-mismatch (PR-I, 2026-05-10): 직전 학습 weight 영역 fix
    //     직전 영역 stale lock-in 영역 reset (n13 mitigation 정합).
    onStaleCacheReset: (reason) => {
      const label = '방향';
      const message = reason === 'schema-mismatch'
        ? `${label} 회로: 회로 schema 정정 위해 학습 가중치 reset — 재학습 필요`
        : reason === 'fix-baseline-mismatch'
        ? `${label} 회로: 직전 학습 가중치를 정정 적용 위해 reset — 재학습 필요`
        : `${label} 회로: 가중치 길이 불일치로 학습 가중치 reset — 재학습 필요`;
      showToast({
        kind: 'warning',
        message,
        duration: 6000,
      });
    },
    // 사용자 catch 2026-05-09 [2] (Fix 4): DB hydrate state visibility —
    // NodeLearn footer status row 영역 emit + cache (mount 영역 race 회피).
    onFreshBuild: () => {
      // Fix #20 Part D (2026-05-10): fresh build 영역 substrate 영역 stale
      // exemplar 영역 clear — base 4 cluster 영역 학습된 직전 세션 영역 영역
      // zero-init 영역 build 영역 carry-over 영역 stale '패턴 N=count' 영역 표시
      // 회피. 학술 정합: fresh substrate (cluster 0개) 영역 OUT 영역 fire count
      // 영역 0 시작 — exemplar count 영역 sync 정합 catch.
      clearExemplars(kind);
      // 사용자 catch 2026-05-11 (cluster-evict-hydrate-fix): fresh build path
      // 영역 trialCount localStorage 영역 wipe — exemplars 영역 정합 (학술
      // 영역 fresh substrate 영역 학습 횟수 0 영역 정합). LiveSnn singleton
      // 영역 substrate 일치 시점 영역 in-memory trialCount 영역 reset path 영역
      // setSubstrate 영역 hydrate (loadTrialCount → 0) 영역 정합.
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(`handface.live-snn.trial-count.v1.${kind}`);
        }
      } catch { /* noop */ }
      const state: LocalSnnInitState = { kind, phase: 'fresh' };
      _lastInitState.set(kind, state);
      emitLocalSnnInitState(state);
    },
    onHydrateLoaded: ({ savedAt, rev }) => {
      const state: LocalSnnInitState = { kind, phase: 'hydrated', savedAt, rev };
      _lastInitState.set(kind, state);
      emitLocalSnnInitState(state);
    },
  });
  entry.client = client;
  entry.lab = lab;
  entry.initPromise = lab.init();
  try {
    const s = await entry.initPromise;
    entry.initPromise = null;
    return { client, lab, status: s, kind };
  } catch (e) {
    entry.initPromise = null;
    entry.client = null;
    entry.lab = null;
    throw e;
  }
}

// Backwards-compatible alias — 직전 caller 영역 default 'orientation' 사용.
// PR4 영역 신규 caller 는 getRootLocalSnnFor(kind) 영역 사용 사실.
export async function getRootLocalSnn(): Promise<RootLocalSnn> {
  return getRootLocalSnnFor('orientation');
}

// 테스트 / 사용자 측 reset 위한 helper. kind 미지정 시 모든 substrate dispose.
export function disposeRootLocalSnn(kind?: SubstrateKind): void {
  if (kind === undefined) {
    for (const entry of _cache.values()) {
      if (entry.client) entry.client.dispose();
    }
    _cache.clear();
    _lastInitState.clear();
    return;
  }
  const entry = _cache.get(kind);
  if (entry) {
    if (entry.client) entry.client.dispose();
    _cache.delete(kind);
  }
  _lastInitState.delete(kind);
}

// 사용자 catch 2026-05-10 (Request C): 학습 데이터 전체 삭제 — IndexedDB
// 영역 모든 substrate (orientation + gesture) 영속 weight 영역 wipe + cache
// 영역 dispose + localStorage handface.* keys 영역 wipe. caller (GridInput
// 학습 reset button 영역 전 path) 영역 worker resetClusterWeights 영역 별도
// 호출 — 본 helper 영역 영속 (DB) layer 영역만 catch.
//
// 사용자 명시 "학습 데이터 전체 삭제 (DB)" + "default 학습 데이터 폐기" —
// 영속 영역 wipe + 다음 mount 영역 fresh build (zero-init).
export async function purgeAllLearningData(): Promise<void> {
  if (typeof window === 'undefined') return;
  // Step 1: cache 영역 dispose — worker / lab 영역 stale 영역 회피.
  disposeRootLocalSnn();
  // Step 2: IndexedDB 영역 모든 substrate 영역 wipe — 직접 IndexedDBSink
  // instance 영역 생성 영역 remove(netId).
  try {
    const sink = new IndexedDBSink();
    for (const kind of ['orientation', 'gesture', 'orientation-5x5'] as const) {
      try {
        await sink.remove(netIdFor(kind));
      } catch (e) {
        console.warn(`[purgeAllLearningData] IndexedDB remove ${kind} failed:`, e);
      }
    }
    await sink.close();
  } catch (e) {
    console.warn('[purgeAllLearningData] IndexedDB sink creation failed:', e);
  }
  // Step 3: localStorage handface.* 영역 wipe (out-exemplars + vigilance 등).
  // migration flag 영역 보존 (재진입 영역 재migration 영역 noise 회피).
  try {
    const PRESERVE = new Set([
      'handface.migration.indexeddb',
      'handface.migration.out-exemplars-substrate-split.v1',
    ]);
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith('handface.') && !PRESERVE.has(k)) {
        keysToRemove.push(k);
      }
    }
    for (const k of keysToRemove) {
      window.localStorage.removeItem(k);
    }
  } catch (e) {
    console.warn('[purgeAllLearningData] localStorage wipe failed:', e);
  }
  // Step 4: out-exemplars 영역 substrate 별 dispatch — UI 영역 즉시 0 row.
  try {
    for (const kind of ['orientation', 'gesture', 'orientation-5x5'] as const) {
      window.dispatchEvent(new CustomEvent(`handface:out-exemplars-changed:${kind}`, { detail: {} }));
    }
  } catch {
    // ignore
  }
}
