// HFDatasetSink 단위 테스트 — mock fetch 로 endpoint 정합 + 에러 처리 검증.

import { afterEach, describe, expect, it, vi } from 'vitest';

import { HFDatasetSink } from '@/lib/snn-runtime';
import type { NetworkSnapshot, WeightDelta, WeightSnapshot } from '@/lib/snn-runtime';

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

describe('HFDatasetSink — basic CRUD', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('saveTopology PUT /persist/topology/:netId', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await sink.saveTopology('u1', SAMPLE_TOPO);
    expect(m.captured).toHaveLength(1);
    const r = m.captured[0];
    expect(r.method).toBe('PUT');
    expect(r.url).toBe('https://hf.example/persist/topology/u1');
    expect(r.headers['content-type']).toBe('application/json');
    expect(JSON.parse(r.body!)).toEqual(SAMPLE_TOPO);
  });

  it('saveWeights PUT — netId encoding', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await sink.saveWeights({ ...SAMPLE_WEIGHTS, netId: 'user/with slash' });
    expect(m.captured[0].url).toBe('https://hf.example/persist/weights/user%2Fwith%20slash');
  });

  it('appendDelta POST /persist/deltas/:netId', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await sink.appendDelta(SAMPLE_DELTA);
    const r = m.captured[0];
    expect(r.method).toBe('POST');
    expect(r.url).toBe('https://hf.example/persist/deltas/u1');
  });

  it('compact POST { keep_last_n } — backend snake_case', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await sink.compact('u1', 5);
    const r = m.captured[0];
    expect(r.url).toBe('https://hf.example/persist/compact/u1');
    expect(JSON.parse(r.body!)).toEqual({ keep_last_n: 5 });
  });

  it('remove DELETE /persist/:netId', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await sink.remove('u1');
    expect(m.captured[0].method).toBe('DELETE');
    expect(m.captured[0].url).toBe('https://hf.example/persist/u1');
  });
});

describe('HFDatasetSink — load with body', () => {
  it('loadTopology JSON 파싱', async () => {
    const m = makeMockFetch({ status: 200, body: SAMPLE_TOPO });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    const topo = await sink.loadTopology('u1');
    expect(topo).toEqual(SAMPLE_TOPO);
  });

  it('loadWeights /weights/:netId/latest', async () => {
    const m = makeMockFetch({ status: 200, body: SAMPLE_WEIGHTS });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    const w = await sink.loadWeights('u1');
    expect(w).toEqual(SAMPLE_WEIGHTS);
    expect(m.captured[0].url).toBe('https://hf.example/persist/weights/u1/latest');
  });

  it('loadDeltas 배열 반환', async () => {
    const m = makeMockFetch({ status: 200, body: [SAMPLE_DELTA, SAMPLE_DELTA] });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    const list = await sink.loadDeltas('u1');
    expect(list).toHaveLength(2);
  });

  it('list GET /persist/list', async () => {
    const m = makeMockFetch({ status: 200, body: ['u1', 'u2'] });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    const ids = await sink.list();
    expect(ids).toEqual(['u1', 'u2']);
    expect(m.captured[0].url).toBe('https://hf.example/persist/list');
  });
});

describe('HFDatasetSink — 404 처리', () => {
  it('loadTopology 404 → null', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    expect(await sink.loadTopology('missing')).toBeNull();
  });

  it('loadWeights 404 → null', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    expect(await sink.loadWeights('missing')).toBeNull();
  });

  it('loadDeltas 404 → 빈 배열', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    expect(await sink.loadDeltas('missing')).toEqual([]);
  });

  it('remove 404 → no throw', async () => {
    const m = makeMockFetch({ status: 404 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await expect(sink.remove('missing')).resolves.toBeUndefined();
  });
});

describe('HFDatasetSink — auth + 옵션', () => {
  it('apiKey 주입 시 X-API-Key 헤더', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new HFDatasetSink({
      spacesUrl: 'https://hf.example',
      apiKey: 'secret',
      fetchImpl: m.fetchImpl,
    });
    await sink.saveTopology('u1', SAMPLE_TOPO);
    expect(m.captured[0].headers['x-api-key']).toBe('secret');
  });

  it('apiKey 미주입 시 헤더 없음', async () => {
    const m = makeMockFetch({ status: 204 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await sink.saveTopology('u1', SAMPLE_TOPO);
    expect(m.captured[0].headers['x-api-key']).toBeUndefined();
  });

  it('spacesUrl trailing slash 자동 정리', async () => {
    const m = makeMockFetch({ status: 200, body: SAMPLE_TOPO });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example/', fetchImpl: m.fetchImpl });
    await sink.loadTopology('u1');
    expect(m.captured[0].url).toBe('https://hf.example/persist/topology/u1');
  });

  it('500 응답 시 throw', async () => {
    const m = makeMockFetch({ status: 500 });
    const sink = new HFDatasetSink({ spacesUrl: 'https://hf.example', fetchImpl: m.fetchImpl });
    await expect(sink.saveTopology('u1', SAMPLE_TOPO)).rejects.toThrow(/HFDatasetSink/);
  });
});
