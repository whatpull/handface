// D1Sink 단위 테스트 — mock fetch 로 endpoint 정합 + 에러 처리 검증.
//
// 실 Cloudflare Worker 없이 SnapshotSink interface 가 D1Sink 구현에서
// 정확히 동작하는지 확인. mock fetch 가 path / method / headers / body 를
// 캡처해 expectation 으로 비교.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { D1Sink, type WeightDelta, type WeightSnapshot } from '@/lib/snn-runtime';
import type { NetworkSnapshot } from '@/lib/snn-runtime';

interface CapturedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

function makeMockFetch(response: { status: number; body?: unknown }): {
  fetchImpl: typeof fetch;
  captured: CapturedRequest[];
} {
  const captured: CapturedRequest[] = [];
  const fetchImpl: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const headers: Record<string, string> = {};
    if (init?.headers) {
      const h = init.headers as Record<string, string>;
      for (const k of Object.keys(h)) headers[k.toLowerCase()] = h[k];
    }
    captured.push({
      url,
      method: init?.method ?? 'GET',
      headers,
      body: typeof init?.body === 'string' ? init.body : null,
    });
    if (response.status >= 200 && response.status < 300) {
      const body = response.body !== undefined ? JSON.stringify(response.body) : '';
      return new Response(body || null, {
        status: response.status,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(null, { status: response.status });
  }) as typeof fetch;
  return { fetchImpl, captured };
}

const SAMPLE_TOPO: NetworkSnapshot = {
  schema: 1,
  dtMs: 0.1,
  t: 0,
  neurons: [
    { name: 'A', region: 'INPUT', population: 'input', vRest: -70, vThreshold: -55, vReset: -75, tauM: 15, refractory: 2 },
  ],
  synapses: [],
};

const SAMPLE_WEIGHTS: WeightSnapshot = {
  schema: 1,
  netId: 'u1',
  rev: 3,
  t: 100,
  savedAt: 1234567890,
  weights: [1, 2, 3],
};

const SAMPLE_DELTA: WeightDelta = {
  schema: 1,
  netId: 'u1',
  baseRev: 2,
  rev: 3,
  savedAt: 1234567890,
  indices: [0, 2],
  values: [1, 3],
};

describe('D1Sink — basic CRUD', () => {
  let mock = makeMockFetch({ status: 204 });

  beforeEach(() => {
    mock = makeMockFetch({ status: 204 });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('saveTopology PUT 정합', async () => {
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: mock.fetchImpl });
    await sink.saveTopology('u1', SAMPLE_TOPO);
    expect(mock.captured).toHaveLength(1);
    const r = mock.captured[0];
    expect(r.method).toBe('PUT');
    expect(r.url).toBe('https://w.example.dev/api/v1/networks/u1/topology');
    expect(r.headers['content-type']).toBe('application/json');
    expect(JSON.parse(r.body!)).toEqual(SAMPLE_TOPO);
  });

  it('saveWeights PUT — netId path encoding', async () => {
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: mock.fetchImpl });
    const w = { ...SAMPLE_WEIGHTS, netId: 'user/with slash' };
    await sink.saveWeights(w);
    expect(mock.captured[0].url).toBe(
      'https://w.example.dev/api/v1/networks/user%2Fwith%20slash/weights',
    );
  });

  it('appendDelta POST 정합', async () => {
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: mock.fetchImpl });
    await sink.appendDelta(SAMPLE_DELTA);
    const r = mock.captured[0];
    expect(r.method).toBe('POST');
    expect(r.url).toBe('https://w.example.dev/api/v1/networks/u1/deltas');
  });

  it('compact POST { keepLastN }', async () => {
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: mock.fetchImpl });
    await sink.compact('u1', 5);
    const r = mock.captured[0];
    expect(r.method).toBe('POST');
    expect(r.url).toBe('https://w.example.dev/api/v1/networks/u1/compact');
    expect(JSON.parse(r.body!)).toEqual({ keepLastN: 5 });
  });

  it('remove DELETE', async () => {
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: mock.fetchImpl });
    await sink.remove('u1');
    expect(mock.captured[0].method).toBe('DELETE');
    expect(mock.captured[0].url).toBe('https://w.example.dev/api/v1/networks/u1');
  });
});

describe('D1Sink — load with body', () => {
  it('loadTopology GET 응답 JSON 파싱', async () => {
    const m = makeMockFetch({ status: 200, body: SAMPLE_TOPO });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    const topo = await sink.loadTopology('u1');
    expect(topo).toEqual(SAMPLE_TOPO);
    expect(m.captured[0].method).toBe('GET');
    expect(m.captured[0].url).toBe('https://w.example.dev/api/v1/networks/u1/topology');
  });

  it('loadWeights /weights/latest path 정합', async () => {
    const m = makeMockFetch({ status: 200, body: SAMPLE_WEIGHTS });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    const w = await sink.loadWeights('u1');
    expect(w).toEqual(SAMPLE_WEIGHTS);
    expect(m.captured[0].url).toBe('https://w.example.dev/api/v1/networks/u1/weights/latest');
  });

  it('loadDeltas 배열 반환', async () => {
    const m = makeMockFetch({ status: 200, body: [SAMPLE_DELTA, SAMPLE_DELTA] });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    const list = await sink.loadDeltas('u1');
    expect(list).toHaveLength(2);
    expect(list[0]).toEqual(SAMPLE_DELTA);
  });

  it('list GET → string[]', async () => {
    const m = makeMockFetch({ status: 200, body: ['u1', 'u2'] });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    const ids = await sink.list();
    expect(ids).toEqual(['u1', 'u2']);
    expect(m.captured[0].url).toBe('https://w.example.dev/api/v1/networks');
  });
});

describe('D1Sink — 404 처리', () => {
  it('loadTopology 404 → null', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    const topo = await sink.loadTopology('missing');
    expect(topo).toBeNull();
  });

  it('loadWeights 404 → null', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    const w = await sink.loadWeights('missing');
    expect(w).toBeNull();
  });

  it('loadDeltas 404 → 빈 배열', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    const list = await sink.loadDeltas('missing');
    expect(list).toEqual([]);
  });

  it('remove 404 → no throw', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    await expect(sink.remove('missing')).resolves.toBeUndefined();
  });
});

describe('D1Sink — auth + 옵션', () => {
  it('token 주입 시 Authorization Bearer header 추가', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new D1Sink({
      baseUrl: 'https://w.example.dev',
      token: 'secret-123',
      fetchImpl: m.fetchImpl,
    });
    await sink.saveTopology('u1', SAMPLE_TOPO);
    expect(m.captured[0].headers.authorization).toBe('Bearer secret-123');
  });

  it('token 미주입 시 Authorization 없음', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    await sink.saveTopology('u1', SAMPLE_TOPO);
    expect(m.captured[0].headers.authorization).toBeUndefined();
  });

  it('baseUrl trailing slash 자동 정리', async () => {
    const m = makeMockFetch({ status: 200, body: SAMPLE_TOPO });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev/', fetchImpl: m.fetchImpl });
    await sink.loadTopology('u1');
    expect(m.captured[0].url).toBe('https://w.example.dev/api/v1/networks/u1/topology');
  });

  it('500 응답 시 명시적 throw', async () => {
    const m = makeMockFetch({ status: 500 });
    const sink = new D1Sink({ baseUrl: 'https://w.example.dev', fetchImpl: m.fetchImpl });
    await expect(sink.saveTopology('u1', SAMPLE_TOPO)).rejects.toThrow(/D1Sink/);
  });
});
