// IndexedDBSink — SnapshotSink 구현 영역 IndexedDB 영역 backing.
//
// 사용자 catch 2026-05-09 (CRITICAL — quota 잔존):
//   PR #178 영역 LocalStorageSink 영역 5중 multi-layer defense (idempotent
//   saveTopology + maxDeltaHistory 4 + trySetItem retry) 영역 부족 catch.
//   topology JSON 자체 영역 ~3MB × 2 substrate (orientation + gesture) ≈
//   6MB+ → localStorage quota (5-10MB) 초과 → reinforce 영역 strict fail.
//   trySetItem retry 영역 deltas 영역 wipe 영역 topology 자체 영역 quota
//   영역 차지 → root cause 미해결.
//
//   IndexedDB 영역 quota 영역 typical 50MB+ (또는 5%+ disk) — n13 substrate
//   2개 (~6MB) + 학습 deltas 영역 여유. SnapshotSink 영역 interface 영역
//   동일 — drop-in replacement.
//
// 한계:
//   - SSR 시점 영역 indexedDB 영역 미존재 → openDb 영역 reject. 호출자 영역
//     try/catch 또는 client-only 영역 가드 정합 사실.
//   - 동시성 영역 idb transaction 영역 atomic — multi-tab 영역 last-write
//     wins (LocalStorageSink 영역 동일).

import type { NetworkSnapshot } from '../network';
import type {
  SnapshotSink,
  WeightDelta,
  WeightSnapshot,
} from '../persistence';

const DB_NAME = 'handface-snn';
const DB_VERSION = 1;
const STORE_TOPOLOGY = 'topology';
const STORE_LATEST = 'latest';
const STORE_DELTAS = 'deltas';
const STORE_LIST = 'list';

const DEFAULT_PREFIX = 'handface';

export interface IndexedDBSinkOptions {
  prefix?: string;
  // 테스트 / Node 환경 영역 fake-indexeddb 영역 inject path. 미지정 시
  // globalThis.indexedDB 영역 사용.
  factory?: IDBFactory;
}

// IDB store 영역 IDBObjectStore 영역 단일 store 단일 transaction 영역 wrapper.
// idb v3 영역 직접 raw API 영역 사용 — 의존성 영역 0.

export class IndexedDBSink implements SnapshotSink {
  private prefix: string;
  private factory: IDBFactory;
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor(opts: IndexedDBSinkOptions = {}) {
    this.prefix = opts.prefix ?? DEFAULT_PREFIX;
    const factory = opts.factory ?? (typeof indexedDB !== 'undefined' ? indexedDB : null);
    if (!factory) {
      throw new Error('IndexedDB 사용 불가 — Worker 또는 SSR 환경에서는 다른 sink 를 쓰세요');
    }
    this.factory = factory;
  }

  private openDb(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;
    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const req = this.factory.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_TOPOLOGY)) db.createObjectStore(STORE_TOPOLOGY);
        if (!db.objectStoreNames.contains(STORE_LATEST)) db.createObjectStore(STORE_LATEST);
        if (!db.objectStoreNames.contains(STORE_DELTAS)) db.createObjectStore(STORE_DELTAS);
        if (!db.objectStoreNames.contains(STORE_LIST)) db.createObjectStore(STORE_LIST);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('IndexedDB upgrade blocked — 다른 탭 영역 close 정합'));
    });
    return this.dbPromise;
  }

  private kTopology(netId: string): string { return `${this.prefix}:${netId}`; }
  private kLatest(netId: string): string { return `${this.prefix}:${netId}`; }
  private kDeltas(netId: string): string { return `${this.prefix}:${netId}`; }
  private kList(): string { return this.prefix; }

  private async getValue<T>(store: string, key: string): Promise<T | undefined> {
    const db = await this.openDb();
    return new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const s = tx.objectStore(store);
      const req = s.get(key);
      req.onsuccess = () => resolve(req.result as T | undefined);
      req.onerror = () => reject(req.error);
    });
  }

  private async putValue(store: string, key: string, value: unknown): Promise<void> {
    const db = await this.openDb();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const s = tx.objectStore(store);
      const req = s.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  private async deleteValue(store: string, key: string): Promise<void> {
    const db = await this.openDb();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const s = tx.objectStore(store);
      const req = s.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async saveTopology(netId: string, snap: NetworkSnapshot): Promise<void> {
    await this.putValue(STORE_TOPOLOGY, this.kTopology(netId), snap);
    await this.touchList(netId);
  }

  async loadTopology(netId: string): Promise<NetworkSnapshot | null> {
    const v = await this.getValue<NetworkSnapshot>(STORE_TOPOLOGY, this.kTopology(netId));
    return v ?? null;
  }

  async saveWeights(snap: WeightSnapshot): Promise<void> {
    await this.putValue(STORE_LATEST, this.kLatest(snap.netId), snap);
    await this.touchList(snap.netId);
  }

  async loadWeights(netId: string): Promise<WeightSnapshot | null> {
    const v = await this.getValue<WeightSnapshot>(STORE_LATEST, this.kLatest(netId));
    return v ?? null;
  }

  async appendDelta(delta: WeightDelta): Promise<void> {
    const list = await this.getValue<WeightDelta[]>(STORE_DELTAS, this.kDeltas(delta.netId));
    const next = list ?? [];
    next.push(delta);
    await this.putValue(STORE_DELTAS, this.kDeltas(delta.netId), next);
  }

  async loadDeltas(netId: string): Promise<WeightDelta[]> {
    const v = await this.getValue<WeightDelta[]>(STORE_DELTAS, this.kDeltas(netId));
    return v ?? [];
  }

  async compact(netId: string, keepLastN: number): Promise<void> {
    if (keepLastN <= 0) {
      await this.deleteValue(STORE_DELTAS, this.kDeltas(netId));
      return;
    }
    const list = await this.loadDeltas(netId);
    if (list.length <= keepLastN) return;
    const trimmed = list.slice(list.length - keepLastN);
    await this.putValue(STORE_DELTAS, this.kDeltas(netId), trimmed);
  }

  async list(): Promise<string[]> {
    const v = await this.getValue<string[]>(STORE_LIST, this.kList());
    return v ?? [];
  }

  async remove(netId: string): Promise<void> {
    await this.deleteValue(STORE_TOPOLOGY, this.kTopology(netId));
    await this.deleteValue(STORE_LATEST, this.kLatest(netId));
    await this.deleteValue(STORE_DELTAS, this.kDeltas(netId));
    const list = (await this.list()).filter((id) => id !== netId);
    await this.putValue(STORE_LIST, this.kList(), list);
  }

  private async touchList(netId: string): Promise<void> {
    const list = await this.list();
    if (!list.includes(netId)) {
      list.push(netId);
      await this.putValue(STORE_LIST, this.kList(), list);
    }
  }

  // 진단 / 테스트 — open 한 db 영역 close. 영역 재사용 영역 dbPromise 영역 reset.
  async close(): Promise<void> {
    if (!this.dbPromise) return;
    const db = await this.dbPromise;
    db.close();
    this.dbPromise = null;
  }
}

// 사용자 catch 2026-05-09 (LocalStorageSink → IndexedDBSink swap):
// 직전 LocalStorageSink 영역 stored 영역 'snn:handface:*' key 영역 잔존 영역
// 사용자 quota 영역 잔여 부담 — 1회 cleanup. idempotent flag 영역 mark.
//
// 사용자 본격 학습 가중치 영역 보존 path 영역 본격 영영 안 됨 (직전 user
// catch 영역 quota error 영역 본격 학습 영영 안 됨) — silent cleanup 정합.
const MIGRATION_KEY = 'handface.migration.indexeddb';

export function migrateLocalStorageToIndexedDB(): void {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(MIGRATION_KEY) === '1') return;
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith('snn:handface:')) keys.push(k);
    }
    for (const k of keys) {
      window.localStorage.removeItem(k);
    }
    window.localStorage.setItem(MIGRATION_KEY, '1');
  } catch {
    // localStorage 차단 — 무시 (다음 mount 영역 retry).
  }
}
