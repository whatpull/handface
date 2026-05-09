'use client';
// Root /handface/ 5-node 파이프라인 의 Local 모드 LocalSNN singleton.
//
// 사용자 명시 (2026-05-09 no-new-UI 규칙): /snn-lab 폐기 → root 통합.
// EngineMode='local' 시 backend client 대신 본 instance 사용.
//
// 단일 instance 공유 — GridInput / NodeInfer / NodeLearn / CameraInput 등
// 가 모두 같은 가중치 풀에 접근. SSR 안전 (window 가드).

import {
  LocalSNN,
  LocalStorageSink,
  MainThreadTransport,
  SNNWorkerClient,
  type LocalSNNStatus,
} from '@/lib/snn-runtime';

const NET_ID = 'root-pipeline';
const SEED = 57;

let _client: SNNWorkerClient | null = null;
let _lab: LocalSNN | null = null;
let _initPromise: Promise<LocalSNNStatus> | null = null;

export interface RootLocalSnn {
  client: SNNWorkerClient;
  lab: LocalSNN;
  status: LocalSNNStatus;
}

// Lazy 초기화 — 첫 호출 시 LocalSNN 빌드 (client + sink + lab.init).
// 같은 instance 영역 multiple call 시 재사용. SSR 시점 호출 안 됨 (window
// 가드 — Next.js client component 영역만 사용).
export async function getRootLocalSnn(): Promise<RootLocalSnn> {
  if (typeof window === 'undefined') {
    throw new Error('getRootLocalSnn: client-only');
  }
  if (_lab && _client && !_initPromise) {
    // 이미 초기화됨 + 진행중 init 없음 — 즉시 반환.
    return { client: _client, lab: _lab, status: _lab.status() };
  }
  if (_initPromise) {
    const s = await _initPromise;
    return { client: _client!, lab: _lab!, status: s };
  }
  // 신규 초기화.
  const transport = new MainThreadTransport();
  const client = new SNNWorkerClient(transport);
  const sink = new LocalStorageSink();
  const lab = new LocalSNN({ netId: NET_ID, client, sink, seed: SEED });
  _client = client;
  _lab = lab;
  _initPromise = lab.init();
  try {
    const s = await _initPromise;
    _initPromise = null;
    return { client, lab, status: s };
  } catch (e) {
    _initPromise = null;
    _client = null;
    _lab = null;
    throw e;
  }
}

// 테스트 / 사용자 측 reset 위한 helper.
export function disposeRootLocalSnn(): void {
  if (_client) _client.dispose();
  _client = null;
  _lab = null;
  _initPromise = null;
}
