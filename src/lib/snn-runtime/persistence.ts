// SNN runtime 영속화 — 가중치 snapshot + delta 인코딩.
//
// 설계 기조:
//  - 토폴로지(neuron 추가 / synapse 추가)는 통째 snapshot 으로 보존.
//  - 가중치는 동일 토폴로지 위에서 진화하므로 delta 인코딩 가능 (sparse 변경 인덱스).
//  - 저장소는 SnapshotSink 인터페이스로 추상화 — 본 단계에서 LocalStorageSink 만
//    제공하고, Phase C2 (Cloudflare D1) 에서 D1Sink 를 같은 인터페이스로 추가.
//
// 명시 한계:
//  - 본 단계는 single-tab 가정 (localStorage). 멀티 탭 충돌 / 동기 잠금은 미고려.
//  - 압축 안 함 (n13 substrate 쯤이면 JSON 수 KB 수준 — 필요 시 추가).
//  - schema=1 만 지원. 변경 시 마이그레이션 함수 추가 + 본 상수 bump.

import { type NetworkSnapshot, NeuralNetwork } from './network';

export const PERSIST_SCHEMA_VERSION = 1 as const;

export interface WeightSnapshot {
  schema: typeof PERSIST_SCHEMA_VERSION;
  netId: string;
  rev: number; // 단조증가 — 매 save 마다 +1.
  t: number; // 시뮬레이션 시간 (ms).
  savedAt: number; // 벽시계 (ms epoch).
  weights: number[]; // 길이 = synapses.length, synapse position index 정합.
}

// Sparse delta — 직전 rev 대비 바뀐 가중치만 보관.
export interface WeightDelta {
  schema: typeof PERSIST_SCHEMA_VERSION;
  netId: string;
  baseRev: number; // 이 delta 가 적용되어야 할 시작 rev.
  rev: number; // 적용 후 rev.
  savedAt: number;
  indices: number[]; // 변경된 synapse index.
  values: number[]; // 새 가중치. indices.length === values.length.
}

export interface PersistedRecord {
  topology: NetworkSnapshot;
  latest: WeightSnapshot;
  // 직전 rev → 새 rev 로 가는 delta 들. 압축 시점 제거됨.
  deltas: WeightDelta[];
}

export interface SnapshotSink {
  saveTopology(netId: string, snap: NetworkSnapshot): Promise<void>;
  loadTopology(netId: string): Promise<NetworkSnapshot | null>;
  saveWeights(snap: WeightSnapshot): Promise<void>;
  loadWeights(netId: string): Promise<WeightSnapshot | null>;
  appendDelta(delta: WeightDelta): Promise<void>;
  loadDeltas(netId: string): Promise<WeightDelta[]>;
  // 직전 N rev 만 보존. 그 이전 delta 는 제거 + latest snapshot 재기록.
  compact(netId: string, keepLastN: number): Promise<void>;
  list(): Promise<string[]>;
  remove(netId: string): Promise<void>;
}

// ── 가중치 직렬화 ──
export function extractWeights(net: NeuralNetwork): number[] {
  return net.synapses.map((s) => s.weight);
}

export function applyWeights(net: NeuralNetwork, weights: number[]): void {
  if (weights.length !== net.synapses.length) {
    throw new Error(
      `weight 수 불일치: net=${net.synapses.length}, snapshot=${weights.length}`,
    );
  }
  for (let i = 0; i < weights.length; i += 1) net.synapses[i].weight = weights[i];
}

export function buildWeightSnapshot(
  netId: string,
  net: NeuralNetwork,
  rev: number,
): WeightSnapshot {
  return {
    schema: PERSIST_SCHEMA_VERSION,
    netId,
    rev,
    t: net.t,
    savedAt: Date.now(),
    weights: extractWeights(net),
  };
}

// 두 snapshot 사이의 sparse delta 계산. eps 미만 변화는 무시 (잡음 절감).
export function diffWeightSnapshots(
  prev: WeightSnapshot,
  curr: WeightSnapshot,
  eps: number = 1e-9,
): WeightDelta {
  if (prev.netId !== curr.netId) {
    throw new Error(`netId 불일치: ${prev.netId} vs ${curr.netId}`);
  }
  if (prev.weights.length !== curr.weights.length) {
    throw new Error('weight 길이 불일치 — 토폴로지 변경 의심');
  }
  const indices: number[] = [];
  const values: number[] = [];
  for (let i = 0; i < curr.weights.length; i += 1) {
    if (Math.abs(curr.weights[i] - prev.weights[i]) >= eps) {
      indices.push(i);
      values.push(curr.weights[i]);
    }
  }
  return {
    schema: PERSIST_SCHEMA_VERSION,
    netId: curr.netId,
    baseRev: prev.rev,
    rev: curr.rev,
    savedAt: curr.savedAt,
    indices,
    values,
  };
}

export function applyWeightDelta(snap: WeightSnapshot, delta: WeightDelta): WeightSnapshot {
  if (snap.netId !== delta.netId) {
    throw new Error(`netId 불일치: ${snap.netId} vs ${delta.netId}`);
  }
  if (snap.rev !== delta.baseRev) {
    throw new Error(`rev 불일치: snapshot=${snap.rev}, delta.base=${delta.baseRev}`);
  }
  const weights = snap.weights.slice();
  for (let i = 0; i < delta.indices.length; i += 1) {
    weights[delta.indices[i]] = delta.values[i];
  }
  return {
    ...snap,
    rev: delta.rev,
    savedAt: delta.savedAt,
    weights,
  };
}

// ── LocalStorageSink ──
//
// key layout:
//   snn:<prefix>:<netId>:topology   → NetworkSnapshot JSON
//   snn:<prefix>:<netId>:latest     → WeightSnapshot JSON
//   snn:<prefix>:<netId>:deltas     → WeightDelta[] JSON
//   snn:<prefix>:list               → string[] (netId 목록 캐시)
//
// 사용자 catch 2026-05-09 (CRITICAL — quota exceeded):
//   n13 substrate 토폴로지 (~28k synapses) JSON 영역 ~3MB. 두 substrate
//   (orientation + gesture) 영역 동시 영속 + delta 32건 누적 → 13MB+
//   browser localStorage quota (5-10MB) 초과 → reinforce 영역 strict fail.
//   fix path:
//     1. writeJSON 영역 quota-resilient — QuotaExceededError 영역 catch +
//        retry path (delta wipe, 다른 netId 영역 stale wipe).
//     2. saveTopology 영역 idempotent — 이미 같은 byte 영역 stored 시 skip.
//     3. delta history default 영역 32 → 4 (local-snn.ts 영역 정합).

const DEFAULT_PREFIX = 'handface';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getStorage(): StorageLike | null {
  if (typeof globalThis === 'undefined') return null;
  const g = globalThis as { localStorage?: StorageLike };
  return g.localStorage ?? null;
}

// 브라우저 / 환경별 QuotaExceededError code 영역 catch — DOMException code 22
// (legacy) 또는 1014 (Firefox) 또는 name === 'QuotaExceededError'.
export function isQuotaError(e: unknown): boolean {
  if (!e || typeof e !== 'object') return false;
  const err = e as { name?: string; code?: number; message?: string };
  if (err.name === 'QuotaExceededError') return true;
  if (err.name === 'NS_ERROR_DOM_QUOTA_REACHED') return true; // Firefox legacy
  if (err.code === 22 || err.code === 1014) return true;
  if (typeof err.message === 'string' && /quota/i.test(err.message)) return true;
  return false;
}

export class LocalStorageSink implements SnapshotSink {
  private prefix: string;
  private storage: StorageLike;

  constructor(opts: { prefix?: string; storage?: StorageLike } = {}) {
    this.prefix = opts.prefix ?? DEFAULT_PREFIX;
    const storage = opts.storage ?? getStorage();
    if (!storage) {
      throw new Error('localStorage 사용 불가 — Worker 환경에서는 다른 sink 를 쓰세요');
    }
    this.storage = storage;
  }

  private kTopology(netId: string): string {
    return `snn:${this.prefix}:${netId}:topology`;
  }
  private kLatest(netId: string): string {
    return `snn:${this.prefix}:${netId}:latest`;
  }
  private kDeltas(netId: string): string {
    return `snn:${this.prefix}:${netId}:deltas`;
  }
  private kList(): string {
    return `snn:${this.prefix}:list`;
  }

  private keyHead(): string {
    return `snn:${this.prefix}:`;
  }

  private readJSON<T>(key: string): T | null {
    const raw = this.storage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  // key format: 'snn:<prefix>:<netId>:<kind>' 영역 netId 추출. list key 등 미정합 시 null.
  private extractNetId(key: string): string | null {
    const head = this.keyHead();
    if (!key.startsWith(head)) return null;
    const rest = key.slice(head.length); // '<netId>:<kind>'
    const colon = rest.lastIndexOf(':');
    if (colon < 0) return null;
    return rest.slice(0, colon);
  }

  // quota-resilient setItem — QuotaExceededError 영역 fallback path.
  //   1. 자체 netId 영역 delta wipe (가장 큰 ballast).
  //   2. 모든 등록 netId 영역 delta wipe (cross-substrate spillover).
  //   3. 그래도 fail 시 throw (호출자 영역 user-visible warning surface).
  private trySetItem(key: string, raw: string): void {
    try {
      this.storage.setItem(key, raw);
      return;
    } catch (e) {
      if (!isQuotaError(e)) throw e;
      // 1차: 자체 netId 영역 delta wipe.
      const ownNetId = this.extractNetId(key);
      if (ownNetId !== null) {
        try { this.storage.removeItem(this.kDeltas(ownNetId)); } catch { /* noop */ }
      }
      try {
        this.storage.setItem(key, raw);
        return;
      } catch (e2) {
        if (!isQuotaError(e2)) throw e2;
      }
      // 2차: 모든 등록 netId 영역 delta wipe.
      const list = this.readJSON<string[]>(this.kList()) ?? [];
      for (const id of list) {
        try { this.storage.removeItem(this.kDeltas(id)); } catch { /* noop */ }
      }
      this.storage.setItem(key, raw); // 3차 — 그래도 fail 시 throw.
    }
  }

  private writeJSON(key: string, value: unknown): void {
    this.trySetItem(key, JSON.stringify(value));
  }

  private touchList(netId: string): void {
    const list = this.readJSON<string[]>(this.kList()) ?? [];
    if (!list.includes(netId)) {
      list.push(netId);
      this.writeJSON(this.kList(), list);
    }
  }

  async saveTopology(netId: string, snap: NetworkSnapshot): Promise<void> {
    // Idempotent: 이미 같은 byte 영역 stored 시 skip — 토폴로지 영역 결정론
    // (seed + preset 정합) 영역 redundant write 영역 catch.
    const raw = JSON.stringify(snap);
    const existing = this.storage.getItem(this.kTopology(netId));
    if (existing === raw) {
      this.touchList(netId);
      return;
    }
    this.trySetItem(this.kTopology(netId), raw);
    this.touchList(netId);
  }

  async loadTopology(netId: string): Promise<NetworkSnapshot | null> {
    return this.readJSON<NetworkSnapshot>(this.kTopology(netId));
  }

  async saveWeights(snap: WeightSnapshot): Promise<void> {
    this.writeJSON(this.kLatest(snap.netId), snap);
    this.touchList(snap.netId);
  }

  async loadWeights(netId: string): Promise<WeightSnapshot | null> {
    return this.readJSON<WeightSnapshot>(this.kLatest(netId));
  }

  async appendDelta(delta: WeightDelta): Promise<void> {
    const list = this.readJSON<WeightDelta[]>(this.kDeltas(delta.netId)) ?? [];
    list.push(delta);
    this.writeJSON(this.kDeltas(delta.netId), list);
  }

  async loadDeltas(netId: string): Promise<WeightDelta[]> {
    return this.readJSON<WeightDelta[]>(this.kDeltas(netId)) ?? [];
  }

  async compact(netId: string, keepLastN: number): Promise<void> {
    if (keepLastN <= 0) {
      // 0 영역 명시 wipe path — persistTopology 영역 직전 위상 deltas 폐기 정합.
      this.storage.removeItem(this.kDeltas(netId));
      return;
    }
    const deltas = await this.loadDeltas(netId);
    if (deltas.length <= keepLastN) return;
    const trimmed = deltas.slice(deltas.length - keepLastN);
    this.writeJSON(this.kDeltas(netId), trimmed);
  }

  async list(): Promise<string[]> {
    return this.readJSON<string[]>(this.kList()) ?? [];
  }

  async remove(netId: string): Promise<void> {
    this.storage.removeItem(this.kTopology(netId));
    this.storage.removeItem(this.kLatest(netId));
    this.storage.removeItem(this.kDeltas(netId));
    const list = (this.readJSON<string[]>(this.kList()) ?? []).filter((x) => x !== netId);
    this.writeJSON(this.kList(), list);
  }
}

// ── 고수준 헬퍼: 현재 net 영속화 + 직전 가중치 대비 delta 누적 ──
export interface PersistController {
  // 토폴로지 + 초기 가중치 저장 (rev=0).
  init(): Promise<void>;
  // 현재 가중치 snapshot 저장 + 직전 대비 delta 누적. 새 rev 반환.
  save(): Promise<number>;
  // 전체 (topology + latest weights + deltas) 로드 후 net 에 적용. 실패 시 false.
  hydrate(): Promise<boolean>;
  // 현재 rev.
  rev(): number;
}

export function createPersistController(opts: {
  netId: string;
  net: NeuralNetwork;
  sink: SnapshotSink;
  // delta 누적 보존 한도 — 초과 시 compact.
  maxDeltaHistory?: number;
  // 변화 미세 임계값.
  deltaEps?: number;
}): PersistController {
  const { netId, net, sink } = opts;
  // 사용자 catch 2026-05-09: localStorage quota 정정 정합 — 32 → 4.
  const maxHistory = opts.maxDeltaHistory ?? 4;
  const eps = opts.deltaEps ?? 1e-9;
  let rev = 0;
  let prev: WeightSnapshot | null = null;

  return {
    async init() {
      await sink.saveTopology(netId, net.snapshot());
      const initial = buildWeightSnapshot(netId, net, 0);
      await sink.saveWeights(initial);
      rev = 0;
      prev = initial;
    },
    async save() {
      const next = buildWeightSnapshot(netId, net, rev + 1);
      if (prev) {
        const delta = diffWeightSnapshots(prev, next, eps);
        if (delta.indices.length > 0) {
          await sink.appendDelta(delta);
          await sink.compact(netId, maxHistory);
        }
      }
      await sink.saveWeights(next);
      rev = next.rev;
      prev = next;
      return rev;
    },
    async hydrate() {
      const topology = await sink.loadTopology(netId);
      if (!topology) return false;
      const latest = await sink.loadWeights(netId);
      // 토폴로지 적용.
      const restored = NeuralNetwork.restore(topology);
      // 기존 net 객체로 가중치만 옮기려면 동일 토폴로지 보장 필요.
      // 본 헬퍼는 restore 한 net 의 가중치를 복사. 호출자는 restored 를 쓰게 됨.
      // (간단성 우선 — 개별 mutate 는 별도 API 로 추가 가능)
      if (restored.synapses.length !== net.synapses.length) {
        // 토폴로지 mismatch — 호출자가 별도 처리 필요.
        return false;
      }
      if (latest) {
        applyWeights(net, latest.weights);
        rev = latest.rev;
        prev = latest;
      } else {
        rev = 0;
        prev = buildWeightSnapshot(netId, net, 0);
      }
      return true;
    },
    rev() {
      return rev;
    },
  };
}
