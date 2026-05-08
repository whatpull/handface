// Web Worker RPC 프로토콜 — main thread ↔ SNN worker.
//
// 본 파일은 메시지 형태 만 정의. transport (Worker / MessageChannel / mock)
// 와 핸들러 (worker-core) 는 별도 파일로 분리해 단위 테스트 가능하게 한다.

import type { InjectEvent, NetworkSnapshot } from './network';

// ── 요청 ──
// build : NeuralNetwork 를 빌드 (n13 orientation default 또는 custom).
// inject : pending 자극 큐잉.
// run    : durationMs 만큼 시뮬레이션.
// snapshot : NetworkSnapshot 직렬화.
// extractWeights : synapse 위치 인덱스 기반 가중치 배열.
// applyWeights   : 위 가중치를 net 에 다시 적용.
// firingRates    : 지정 뉴런 이름 들의 windowMs 내 firing rate (Hz).
// reset          : net + monitor 초기화.

export type WorkerRequest =
  | { id: number; type: 'build'; payload: BuildPayload }
  | { id: number; type: 'inject'; payload: { events: InjectEvent[] } }
  | { id: number; type: 'run'; payload: RunPayload }
  | { id: number; type: 'snapshot' }
  | { id: number; type: 'extractWeights' }
  | { id: number; type: 'applyWeights'; payload: { weights: number[] } }
  | { id: number; type: 'firingRates'; payload: FiringRatesPayload }
  | { id: number; type: 'reset' };

export interface BuildPayload {
  preset: 'n13_orientation';
  vThreshold?: number;
  clusterActiveInputs?: number[][];
  seed?: number;
}

export interface RunPayload {
  durationMs: number;
  dtMs?: number;
  stdpEnabled?: boolean;
  stdpGain?: number;
}

export interface FiringRatesPayload {
  // 뉴런 이름 또는 prefix(true 이면 이름이 prefix 로 시작하는 모든 뉴런).
  names?: string[];
  prefixes?: string[];
  windowMs: number;
}

// ── 응답 ──
export type WorkerResponse =
  | { id: number; ok: true; result: unknown }
  | { id: number; ok: false; error: string };

// 각 요청 별 result 타입 (호출 측에서 cast 사용).
export interface BuildResult {
  neuronsAdded: number;
  synapsesAdded: number;
  outClusters: number;
  outTotal: number;
  inputDim: number;
  preset: string;
}

export interface RunResult {
  t: number;
  durationMs: number;
}

export interface SnapshotResult {
  snapshot: NetworkSnapshot;
}

export interface FiringRatesResult {
  // 뉴런 이름 → 발화율(Hz). 입력 순서를 보존.
  rates: Array<{ name: string; hz: number }>;
}
