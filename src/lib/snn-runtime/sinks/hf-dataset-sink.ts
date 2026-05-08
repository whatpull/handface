// HFDatasetSink — HF Spaces backend (neuronface) 의 /persist/* endpoint 를
// 통해 가중치를 HF Dataset 에 영속화하는 SnapshotSink 구현.
//
// 사용자 vision: "모든 사용자가 동일한 결과를 체험" + 무료. Worker / 별도
// 클라우드 서비스 없이 이미 사용 중인 HF Spaces 인프라만 확장.
//
// 흐름:
//   browser  ──HTTP──▶  HF Spaces (FastAPI)  ──huggingface_hub──▶  HF Dataset (영속)
//
// neuronface backend 는 본 sink 호출에 응답해 HF Dataset 으로 push/pull.
// 컨테이너 재시작에도 dataset 보존 → 가중치 영속.

import type { NetworkSnapshot } from '../network';
import type { SnapshotSink, WeightDelta, WeightSnapshot } from '../persistence';

export interface HFDatasetSinkOptions {
  // HF Spaces backend base URL (neuronface).
  // 예: 'https://whatpull-neuronface.hf.space'
  spacesUrl: string;
  // 선택 — neuronface 의 NEURONFACE_API_KEY (request 헤더 X-API-Key).
  apiKey?: string;
  // fetch 함수 — 미지정 시 globalThis.fetch. 테스트 시 mock 주입.
  fetchImpl?: typeof fetch;
  // request timeout (ms). HF Hub commit/download 가 ~수백ms 이므로 default 30s.
  timeoutMs?: number;
}

export class HFDatasetSink implements SnapshotSink {
  private readonly baseUrl: string;
  private readonly apiKey: string | undefined;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(opts: HFDatasetSinkOptions) {
    this.baseUrl = opts.spacesUrl.replace(/\/$/, '');
    this.apiKey = opts.apiKey;
    this.fetchImpl = opts.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.timeoutMs = opts.timeoutMs ?? 30_000;
  }

  private async req<T>(
    method: 'GET' | 'PUT' | 'POST' | 'DELETE',
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = { 'content-type': 'application/json' };
    if (this.apiKey) headers['x-api-key'] = this.apiKey;
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
        if (res.status === 404) throw new HFNotFound(`404: ${method} ${path}`);
        const text = await res.text().catch(() => '');
        throw new Error(`HFDatasetSink ${method} ${path} failed: ${res.status} ${text}`);
      }
      if (res.status === 204) return null as T;
      return (await res.json()) as T;
    } finally {
      clearTimeout(timer);
    }
  }

  async saveTopology(netId: string, snap: NetworkSnapshot): Promise<void> {
    await this.req<void>(
      'PUT',
      `/persist/topology/${encodeURIComponent(netId)}`,
      snap,
    );
  }

  async loadTopology(netId: string): Promise<NetworkSnapshot | null> {
    try {
      return await this.req<NetworkSnapshot>(
        'GET',
        `/persist/topology/${encodeURIComponent(netId)}`,
      );
    } catch (e) {
      if (e instanceof HFNotFound) return null;
      throw e;
    }
  }

  async saveWeights(snap: WeightSnapshot): Promise<void> {
    await this.req<void>(
      'PUT',
      `/persist/weights/${encodeURIComponent(snap.netId)}`,
      snap,
    );
  }

  async loadWeights(netId: string): Promise<WeightSnapshot | null> {
    try {
      return await this.req<WeightSnapshot>(
        'GET',
        `/persist/weights/${encodeURIComponent(netId)}/latest`,
      );
    } catch (e) {
      if (e instanceof HFNotFound) return null;
      throw e;
    }
  }

  async appendDelta(delta: WeightDelta): Promise<void> {
    await this.req<void>(
      'POST',
      `/persist/deltas/${encodeURIComponent(delta.netId)}`,
      delta,
    );
  }

  async loadDeltas(netId: string): Promise<WeightDelta[]> {
    try {
      return await this.req<WeightDelta[]>(
        'GET',
        `/persist/deltas/${encodeURIComponent(netId)}`,
      );
    } catch (e) {
      if (e instanceof HFNotFound) return [];
      throw e;
    }
  }

  async compact(netId: string, keepLastN: number): Promise<void> {
    await this.req<void>(
      'POST',
      `/persist/compact/${encodeURIComponent(netId)}`,
      { keep_last_n: keepLastN },
    );
  }

  async list(): Promise<string[]> {
    try {
      return await this.req<string[]>('GET', '/persist/list');
    } catch (e) {
      if (e instanceof HFNotFound) return [];
      throw e;
    }
  }

  async remove(netId: string): Promise<void> {
    try {
      await this.req<void>('DELETE', `/persist/${encodeURIComponent(netId)}`);
    } catch (e) {
      if (e instanceof HFNotFound) return;
      throw e;
    }
  }

  // backend 의 영속화 backend 진단. UI 가 silent ephemeral fallback 을 catch.
  // 응답: { backend: 'hf' | 'memory', repo_id: string | null, persistent: boolean }
  async health(): Promise<HealthStatus> {
    return this.req<HealthStatus>('GET', '/persist/health');
  }
}

export interface HealthStatus {
  backend: 'hf' | 'memory';
  repo_id: string | null;
  persistent: boolean;
}

export class HFNotFound extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'HFNotFound';
  }
}
