// D1Sink — Cloudflare D1 + Worker 백엔드 SnapshotSink 구현.
//
// 사용자 vision (D1 가중치 관리): 모든 사용자가 동일 가중치 풀을 공유 →
// FedAvg 또는 단순 last-write-wins 영속화. 무료 plan 가정 (5GB / 100K writes
// / 5M reads per day).
//
// HTTP REST endpoints 가정 (cloudflare-worker/src/index.ts 가 구현):
//   GET    /api/v1/networks/:netId/topology       → NetworkSnapshot
//   PUT    /api/v1/networks/:netId/topology       (body = NetworkSnapshot)
//   GET    /api/v1/networks/:netId/weights/latest → WeightSnapshot
//   PUT    /api/v1/networks/:netId/weights        (body = WeightSnapshot)
//   GET    /api/v1/networks/:netId/deltas         → WeightDelta[]
//   POST   /api/v1/networks/:netId/deltas         (body = WeightDelta)
//   POST   /api/v1/networks/:netId/compact        (body = { keepLastN })
//   GET    /api/v1/networks                       → string[] (netId list)
//   DELETE /api/v1/networks/:netId
//
// 모든 응답은 JSON. 인증은 옵션 (Authorization: Bearer <token>) — Worker 가
// access control 적용.

import type { NetworkSnapshot } from '../network';
import type { SnapshotSink, WeightDelta, WeightSnapshot } from '../persistence';

export interface D1SinkOptions {
  // Worker base URL — 끝에 슬래시 없이. 예: 'https://snn-worker.example.workers.dev'
  baseUrl: string;
  // 선택 — Authorization Bearer token.
  token?: string;
  // fetch 함수 — 미지정 시 globalThis.fetch. 테스트에서 mock 주입 가능.
  fetchImpl?: typeof fetch;
  // request timeout (ms). 기본 10s — 무료 plan latency 보호.
  timeoutMs?: number;
}

export class D1Sink implements SnapshotSink {
  private readonly baseUrl: string;
  private readonly token: string | undefined;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(opts: D1SinkOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/$/, '');
    this.token = opts.token;
    this.fetchImpl = opts.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.timeoutMs = opts.timeoutMs ?? 10_000;
  }

  private async req<T>(
    method: 'GET' | 'PUT' | 'POST' | 'DELETE',
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    if (this.token) headers.authorization = `Bearer ${this.token}`;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), this.timeoutMs);
    try {
      const res = await this.fetchImpl(url, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: ctl.signal,
      });
      if (!res.ok) {
        // 404 는 caller 에서 null 처리. 그 외는 명시 throw.
        if (res.status === 404) {
          throw new D1NotFound(`404: ${method} ${path}`);
        }
        const text = await res.text().catch(() => '');
        throw new Error(`D1Sink ${method} ${path} failed: ${res.status} ${text}`);
      }
      // 204 No Content 는 빈 객체로.
      if (res.status === 204) return null as T;
      return (await res.json()) as T;
    } finally {
      clearTimeout(timer);
    }
  }

  async saveTopology(netId: string, snap: NetworkSnapshot): Promise<void> {
    await this.req<void>('PUT', `/api/v1/networks/${encodeURIComponent(netId)}/topology`, snap);
  }

  async loadTopology(netId: string): Promise<NetworkSnapshot | null> {
    try {
      return await this.req<NetworkSnapshot>(
        'GET',
        `/api/v1/networks/${encodeURIComponent(netId)}/topology`,
      );
    } catch (e) {
      if (e instanceof D1NotFound) return null;
      throw e;
    }
  }

  async saveWeights(snap: WeightSnapshot): Promise<void> {
    await this.req<void>(
      'PUT',
      `/api/v1/networks/${encodeURIComponent(snap.netId)}/weights`,
      snap,
    );
  }

  async loadWeights(netId: string): Promise<WeightSnapshot | null> {
    try {
      return await this.req<WeightSnapshot>(
        'GET',
        `/api/v1/networks/${encodeURIComponent(netId)}/weights/latest`,
      );
    } catch (e) {
      if (e instanceof D1NotFound) return null;
      throw e;
    }
  }

  async appendDelta(delta: WeightDelta): Promise<void> {
    await this.req<void>(
      'POST',
      `/api/v1/networks/${encodeURIComponent(delta.netId)}/deltas`,
      delta,
    );
  }

  async loadDeltas(netId: string): Promise<WeightDelta[]> {
    try {
      return await this.req<WeightDelta[]>(
        'GET',
        `/api/v1/networks/${encodeURIComponent(netId)}/deltas`,
      );
    } catch (e) {
      if (e instanceof D1NotFound) return [];
      throw e;
    }
  }

  async compact(netId: string, keepLastN: number): Promise<void> {
    await this.req<void>(
      'POST',
      `/api/v1/networks/${encodeURIComponent(netId)}/compact`,
      { keepLastN },
    );
  }

  async list(): Promise<string[]> {
    try {
      return await this.req<string[]>('GET', '/api/v1/networks');
    } catch (e) {
      if (e instanceof D1NotFound) return [];
      throw e;
    }
  }

  async remove(netId: string): Promise<void> {
    try {
      await this.req<void>('DELETE', `/api/v1/networks/${encodeURIComponent(netId)}`);
    } catch (e) {
      if (e instanceof D1NotFound) return;
      throw e;
    }
  }
}

export class D1NotFound extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'D1NotFound';
  }
}
