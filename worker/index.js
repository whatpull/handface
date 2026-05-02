// Cloudflare Worker (Phase 2 D1 scaffold).
// handface localStorage 영역 D1 영역 mirror — training snapshot 영역 저장 / 영역 영역.
// CORS 영역 GitHub Pages origin 영역만 영역 (vars.ALLOWED_ORIGIN).

const JSON_HEADERS = { 'content-type': 'application/json' };

function corsHeaders(env) {
  return {
    'access-control-allow-origin': env.ALLOWED_ORIGIN || '*',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
  };
}

function json(body, status, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(env) },
  });
}

async function handleGet(env, networkId) {
  const row = await env.DB.prepare(
    'SELECT weights, updated_at, meta FROM training_snapshots WHERE network_id = ?'
  ).bind(networkId).first();
  if (!row) return json({ network_id: networkId, weights: [], updated_at: null, meta: null }, 200, env);
  return json({
    network_id: networkId,
    weights: JSON.parse(row.weights),
    updated_at: row.updated_at,
    meta: row.meta ? JSON.parse(row.meta) : null,
  }, 200, env);
}

async function handlePost(request, env, networkId) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json' }, 400, env);
  }
  const weights = body.weights;
  if (!Array.isArray(weights)) {
    return json({ error: 'weights must be array' }, 400, env);
  }
  const updatedAt = Math.floor(Date.now() / 1000);
  const meta = body.meta ? JSON.stringify(body.meta) : null;
  await env.DB.prepare(
    `INSERT INTO training_snapshots (network_id, weights, updated_at, meta)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(network_id) DO UPDATE SET
       weights = excluded.weights,
       updated_at = excluded.updated_at,
       meta = excluded.meta`
  ).bind(networkId, JSON.stringify(weights), updatedAt, meta).run();
  return json({ network_id: networkId, updated_at: updatedAt, count: weights.length }, 200, env);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }
    const url = new URL(request.url);
    // Path: /networks/{id}/training/snapshot
    const m = url.pathname.match(/^\/networks\/([^/]+)\/training\/snapshot\/?$/);
    if (!m) return json({ error: 'not found' }, 404, env);
    const networkId = decodeURIComponent(m[1]);

    if (request.method === 'GET')  return handleGet(env, networkId);
    if (request.method === 'POST') return handlePost(request, env, networkId);
    return json({ error: 'method not allowed' }, 405, env);
  },
};
