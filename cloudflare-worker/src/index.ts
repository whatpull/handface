// SNN D1 Worker — Cloudflare D1 가중치 영속화 + 다중 사용자 공유 백엔드.
//
// 사용자 vision: 모든 사용자가 같은 가중치 풀 학습/추론. 무료 plan 가정 —
// D1 (5GB / 100K writes / 5M reads per day), Workers (100K req/day).
//
// REST API (D1Sink 와 정합):
//   GET    /api/v1/networks/:netId/topology       → NetworkSnapshot
//   PUT    /api/v1/networks/:netId/topology       (body = NetworkSnapshot)
//   GET    /api/v1/networks/:netId/weights/latest → WeightSnapshot
//   PUT    /api/v1/networks/:netId/weights        (body = WeightSnapshot)
//   GET    /api/v1/networks/:netId/deltas         → WeightDelta[]
//   POST   /api/v1/networks/:netId/deltas         (body = WeightDelta)
//   POST   /api/v1/networks/:netId/compact        (body = { keepLastN })
//   GET    /api/v1/networks                       → string[]
//   DELETE /api/v1/networks/:netId
//
// Auth: 환경변수 SNN_AUTH_TOKEN 설정 시 모든 요청에 Authorization: Bearer
//       <token> 필요. 미설정 시 open access (개발용).

interface Env {
  DB: D1Database;
  SNN_AUTH_TOKEN?: string;
}

// D1Database 최소 인터페이스 — Cloudflare 타입 (런타임 제공).
interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<D1Result>;
}

interface D1Result {
  success: boolean;
  meta?: unknown;
}

interface RouteMatch {
  netId?: string;
  resource: 'topology' | 'weights' | 'deltas' | 'compact' | 'list' | 'network';
  weightSubpath?: 'latest';
}

const JSON_HEADERS = { 'content-type': 'application/json' };
const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type',
  'access-control-max-age': '86400',
};

function jsonResponse(body: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...CORS_HEADERS },
  });
}

function emptyResponse(status: number = 204): Response {
  return new Response(null, { status, headers: CORS_HEADERS });
}

function notFound(): Response {
  return jsonResponse({ error: 'not found' }, 404);
}

function badRequest(msg: string): Response {
  return jsonResponse({ error: msg }, 400);
}

function unauthorized(): Response {
  return jsonResponse({ error: 'unauthorized' }, 401);
}

function checkAuth(req: Request, env: Env): boolean {
  if (!env.SNN_AUTH_TOKEN) return true; // open mode
  const auth = req.headers.get('authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(auth);
  return match !== null && match[1] === env.SNN_AUTH_TOKEN;
}

function parseRoute(pathname: string): RouteMatch | null {
  // /api/v1/networks                          → list
  // /api/v1/networks/:netId                   → network (DELETE)
  // /api/v1/networks/:netId/topology          → topology
  // /api/v1/networks/:netId/weights/latest    → weights latest
  // /api/v1/networks/:netId/weights           → weights save
  // /api/v1/networks/:netId/deltas            → deltas
  // /api/v1/networks/:netId/compact           → compact
  const re = /^\/api\/v1\/networks(?:\/([^/]+))?(?:\/(topology|weights|deltas|compact))?(?:\/(latest))?\/?$/;
  const m = re.exec(pathname);
  if (!m) return null;
  const netId = m[1] ? decodeURIComponent(m[1]) : undefined;
  const sub = m[2] as RouteMatch['resource'] | 'compact' | undefined;
  const tail = m[3];
  if (!netId) return { resource: 'list' };
  if (!sub) return { netId, resource: 'network' };
  if (sub === 'weights' && tail === 'latest') {
    return { netId, resource: 'weights', weightSubpath: 'latest' };
  }
  return { netId, resource: sub };
}

// ── handlers ──

async function handleSaveTopology(env: Env, netId: string, body: unknown): Promise<Response> {
  if (!body || typeof body !== 'object') return badRequest('topology body required');
  await env.DB.prepare(
    `INSERT INTO topology (net_id, snapshot, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(net_id) DO UPDATE SET snapshot = excluded.snapshot, updated_at = excluded.updated_at`,
  )
    .bind(netId, JSON.stringify(body), Date.now())
    .run();
  return emptyResponse();
}

async function handleLoadTopology(env: Env, netId: string): Promise<Response> {
  const row = await env.DB.prepare('SELECT snapshot FROM topology WHERE net_id = ?')
    .bind(netId)
    .first<{ snapshot: string }>();
  if (!row) return notFound();
  return new Response(row.snapshot, { status: 200, headers: { ...JSON_HEADERS, ...CORS_HEADERS } });
}

async function handleSaveWeights(env: Env, netId: string, body: unknown): Promise<Response> {
  if (!body || typeof body !== 'object') return badRequest('weights body required');
  const w = body as { rev: number; t: number; savedAt: number };
  await env.DB.prepare(
    `INSERT INTO weights (net_id, rev, t, saved_at, payload)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(net_id, rev) DO UPDATE SET t = excluded.t, saved_at = excluded.saved_at, payload = excluded.payload`,
  )
    .bind(netId, w.rev, w.t, w.savedAt, JSON.stringify(body))
    .run();
  return emptyResponse();
}

async function handleLoadLatestWeights(env: Env, netId: string): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT payload FROM weights WHERE net_id = ? ORDER BY rev DESC LIMIT 1`,
  )
    .bind(netId)
    .first<{ payload: string }>();
  if (!row) return notFound();
  return new Response(row.payload, { status: 200, headers: { ...JSON_HEADERS, ...CORS_HEADERS } });
}

async function handleAppendDelta(env: Env, netId: string, body: unknown): Promise<Response> {
  if (!body || typeof body !== 'object') return badRequest('delta body required');
  const d = body as { baseRev: number; rev: number; savedAt: number };
  await env.DB.prepare(
    `INSERT INTO deltas (net_id, base_rev, rev, saved_at, payload) VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(netId, d.baseRev, d.rev, d.savedAt, JSON.stringify(body))
    .run();
  return emptyResponse();
}

async function handleLoadDeltas(env: Env, netId: string): Promise<Response> {
  const rows = await env.DB.prepare(
    `SELECT payload FROM deltas WHERE net_id = ? ORDER BY rev ASC`,
  )
    .bind(netId)
    .all<{ payload: string }>();
  const list = rows.results.map((r) => JSON.parse(r.payload) as unknown);
  return jsonResponse(list);
}

async function handleCompact(env: Env, netId: string, body: unknown): Promise<Response> {
  const keepLastN = body && typeof body === 'object' && 'keepLastN' in body
    ? Number((body as { keepLastN: number }).keepLastN)
    : 32;
  // 가장 최근 keepLastN 의 rev cutoff.
  const cutoffRow = await env.DB.prepare(
    `SELECT rev FROM deltas WHERE net_id = ? ORDER BY rev DESC LIMIT 1 OFFSET ?`,
  )
    .bind(netId, keepLastN)
    .first<{ rev: number }>();
  if (cutoffRow) {
    await env.DB.prepare(`DELETE FROM deltas WHERE net_id = ? AND rev <= ?`)
      .bind(netId, cutoffRow.rev)
      .run();
  }
  return emptyResponse();
}

async function handleList(env: Env): Promise<Response> {
  const rows = await env.DB.prepare(`SELECT DISTINCT net_id FROM topology`).all<{ net_id: string }>();
  return jsonResponse(rows.results.map((r) => r.net_id));
}

async function handleDeleteNetwork(env: Env, netId: string): Promise<Response> {
  await env.DB.batch([
    env.DB.prepare(`DELETE FROM topology WHERE net_id = ?`).bind(netId),
    env.DB.prepare(`DELETE FROM weights WHERE net_id = ?`).bind(netId),
    env.DB.prepare(`DELETE FROM deltas WHERE net_id = ?`).bind(netId),
  ]);
  return emptyResponse();
}

// ── main fetch handler ──

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return emptyResponse(204);
    if (!checkAuth(request, env)) return unauthorized();

    const url = new URL(request.url);
    if (url.pathname === '/health') return jsonResponse({ status: 'healthy', service: 'snn-d1-worker' });

    const route = parseRoute(url.pathname);
    if (!route) return notFound();

    const m = request.method;
    try {
      if (route.resource === 'list' && m === 'GET') return handleList(env);
      if (route.resource === 'network' && m === 'DELETE') return handleDeleteNetwork(env, route.netId!);
      if (route.resource === 'topology') {
        if (m === 'GET') return handleLoadTopology(env, route.netId!);
        if (m === 'PUT') return handleSaveTopology(env, route.netId!, await request.json());
      }
      if (route.resource === 'weights') {
        if (m === 'GET' && route.weightSubpath === 'latest')
          return handleLoadLatestWeights(env, route.netId!);
        if (m === 'PUT') return handleSaveWeights(env, route.netId!, await request.json());
      }
      if (route.resource === 'deltas') {
        if (m === 'GET') return handleLoadDeltas(env, route.netId!);
        if (m === 'POST') return handleAppendDelta(env, route.netId!, await request.json());
      }
      if (route.resource === 'compact' && m === 'POST')
        return handleCompact(env, route.netId!, await request.json());
      return jsonResponse({ error: 'method not allowed' }, 405);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return jsonResponse({ error: msg }, 500);
    }
  },
};
