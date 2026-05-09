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
  migrateLocalStorageToIndexedDB,
  type LocalSNNStatus,
} from '@/lib/snn-runtime';
import { GESTURE_CLUSTER_ACTIVE_INPUTS } from '@/lib/mediapipe/feature-encoder';
import { showToast } from '@/components/ui/Toast';

export type SubstrateKind = 'orientation' | 'gesture';

const SEED = 57;

// orientation default — n13 builder default 와 동일 (4×4 row/col/diag).
const ORIENTATION_CLUSTER_ACTIVE_INPUTS: number[][] = [
  [4, 5, 6, 7],     // ─ horizontal — row 1
  [1, 5, 9, 13],    // │ vertical — col 1
  [0, 5, 10, 15],   // ╲ diag-back
  [3, 6, 9, 12],    // ╱ diag-fore
];

function netIdFor(kind: SubstrateKind): string {
  return `root-pipeline-${kind}`;
}

function clusterActiveInputsFor(kind: SubstrateKind): number[][] {
  return kind === 'gesture'
    ? GESTURE_CLUSTER_ACTIVE_INPUTS
    : ORIENTATION_CLUSTER_ACTIVE_INPUTS;
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
  const transport = new MainThreadTransport();
  const client = new SNNWorkerClient(transport);
  const sink = new IndexedDBSink();
  const lab = new LocalSNN({
    netId: netIdFor(kind),
    client,
    sink,
    seed: SEED,
    clusterActiveInputs: clusterActiveInputsFor(kind),
    // PR #189 polish UX-1 (HIGH, 2026-05-10): stale cache reject 영역 silent
    // catch 회피 — 사용자 영역 직전 학습 가중치 폐기 영역 명시 catch path.
    //   schema-mismatch: schema:1 (legacy v1) topology 영역 reject (Fix B path).
    //   weight-length-mismatch: synapse 수 불일치 영역 fresh build (drift 정정).
    onStaleCacheReset: (reason) => {
      const label = kind === 'gesture' ? '제스처' : '방향';
      const why = reason === 'schema-mismatch'
        ? '회로 schema 정정'
        : '가중치 길이 불일치';
      showToast({
        kind: 'warning',
        message: `${label} 회로: ${why} 영역 학습 가중치 reset — 재학습 필요`,
        duration: 6000,
      });
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
    return;
  }
  const entry = _cache.get(kind);
  if (entry) {
    if (entry.client) entry.client.dispose();
    _cache.delete(kind);
  }
}
