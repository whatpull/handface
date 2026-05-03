// Cloudflare Worker (Phase 2 D1 scaffold).
// handface localStorage 영역 D1 영역 mirror — training snapshot 영역 저장 / 영역 영역.
// CORS — production (GitHub Pages) + localhost dev (5173/8080/3000) whitelist.
// Session 39 fix: 정적 ALLOWED_ORIGIN 만 허용하면 dev 환경 (localhost:5173) CORS error.
// 요청 Origin 을 whitelist 와 비교하여 매칭되는 origin 을 그대로 echo.

const JSON_HEADERS = { 'content-type': 'application/json' };

function pickAllowedOrigin(env, request) {
  const origin = request.headers.get('Origin') || '';
  // env.ALLOWED_ORIGIN 은 production 기본 (https://whatpull.github.io).
  const prod = env.ALLOWED_ORIGIN || 'https://whatpull.github.io';
  // dev whitelist — localhost 개발 서버 + 사용자 정의.
  const devAllowed = [
    'http://localhost:5173',  // vite default
    'http://localhost:8080',  // 일반 dev
    'http://localhost:3000',  // CRA / next
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000',
  ];
  if (origin === prod) return prod;
  if (devAllowed.includes(origin)) return origin;
  // env.DEV_ORIGINS (옵션, 콤마 구분) 도 허용.
  if (env.DEV_ORIGINS) {
    const list = env.DEV_ORIGINS.split(',').map(s => s.trim());
    if (list.includes(origin)) return origin;
  }
  return prod;  // unknown origin → production 응답 (브라우저가 차단).
}

function corsHeaders(env, request) {
  return {
    'access-control-allow-origin': pickAllowedOrigin(env, request),
    'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    'vary': 'Origin',
  };
}

function json(body, status, env, request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(env, request) },
  });
}

async function handleGet(request, env, networkId) {
  const row = await env.DB.prepare(
    'SELECT weights, updated_at, meta FROM training_snapshots WHERE network_id = ?'
  ).bind(networkId).first();
  if (!row) return json({ network_id: networkId, weights: [], updated_at: null, meta: null }, 200, env, request);
  return json({
    network_id: networkId,
    weights: JSON.parse(row.weights),
    updated_at: row.updated_at,
    meta: row.meta ? JSON.parse(row.meta) : null,
  }, 200, env, request);
}

async function handlePost(request, env, networkId) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json' }, 400, env, request);
  }
  const weights = body.weights;
  if (!Array.isArray(weights)) {
    return json({ error: 'weights must be array' }, 400, env, request);
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
  return json({ network_id: networkId, updated_at: updatedAt, count: weights.length }, 200, env, request);
}

// Phase 7 topology endpoints (Session 37).
async function handleTopologyGet(request, env, networkId) {
  const row = await env.DB.prepare(
    'SELECT neurons, synapses, updated_at, meta FROM topologies WHERE network_id = ?'
  ).bind(networkId).first();
  if (!row) {
    return json({ network_id: networkId, neurons: [], synapses: [], updated_at: null, meta: null }, 200, env, request);
  }
  return json({
    network_id: networkId,
    neurons: JSON.parse(row.neurons),
    synapses: JSON.parse(row.synapses),
    updated_at: row.updated_at,
    meta: row.meta ? JSON.parse(row.meta) : null,
  }, 200, env, request);
}

// Phase 7 datasets endpoints (Session 37).
async function handleDatasetGet(request, env, networkId, datasetId) {
  const row = await env.DB.prepare(
    'SELECT samples, updated_at, meta FROM datasets WHERE network_id = ? AND dataset_id = ?'
  ).bind(networkId, datasetId).first();
  if (!row) {
    return json({ network_id: networkId, dataset_id: datasetId, samples: [], updated_at: null, meta: null }, 200, env, request);
  }
  return json({
    network_id: networkId,
    dataset_id: datasetId,
    samples: JSON.parse(row.samples),
    updated_at: row.updated_at,
    meta: row.meta ? JSON.parse(row.meta) : null,
  }, 200, env, request);
}

async function handleDatasetPost(request, env, networkId, datasetId) {
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'invalid json' }, 400, env, request); }
  const { samples } = body;
  if (!Array.isArray(samples)) {
    return json({ error: 'samples must be array' }, 400, env, request);
  }
  const updatedAt = Math.floor(Date.now() / 1000);
  const meta = body.meta ? JSON.stringify(body.meta) : null;
  await env.DB.prepare(
    `INSERT INTO datasets (network_id, dataset_id, samples, updated_at, meta)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(network_id, dataset_id) DO UPDATE SET
       samples = excluded.samples,
       updated_at = excluded.updated_at,
       meta = excluded.meta`
  ).bind(networkId, datasetId, JSON.stringify(samples), updatedAt, meta).run();
  return json({
    network_id: networkId,
    dataset_id: datasetId,
    updated_at: updatedAt,
    sample_count: samples.length,
  }, 200, env, request);
}

async function handleTopologyPost(request, env, networkId) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid json' }, 400, env, request);
  }
  const { neurons, synapses } = body;
  if (!Array.isArray(neurons) || !Array.isArray(synapses)) {
    return json({ error: 'neurons and synapses must be arrays' }, 400, env, request);
  }
  const updatedAt = Math.floor(Date.now() / 1000);
  const meta = body.meta ? JSON.stringify(body.meta) : null;
  await env.DB.prepare(
    `INSERT INTO topologies (network_id, neurons, synapses, updated_at, meta)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(network_id) DO UPDATE SET
       neurons = excluded.neurons,
       synapses = excluded.synapses,
       updated_at = excluded.updated_at,
       meta = excluded.meta`
  ).bind(networkId, JSON.stringify(neurons), JSON.stringify(synapses), updatedAt, meta).run();
  return json({
    network_id: networkId,
    updated_at: updatedAt,
    neuron_count: neurons.length,
    synapse_count: synapses.length,
  }, 200, env, request);
}

// Session 42+ Tier3-G: Circuit Marketplace handlers.
function genCircuitId() {
  // 'cir_' + 16 random hex chars.
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return 'cir_' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleCircuitsPublish(request, env) {
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'invalid json' }, 400, env, request); }
  const { owner, name, neurons, synapses } = body;
  if (!owner || typeof owner !== 'string' || owner.length > 200) {
    return json({ error: 'owner required (≤200 chars)' }, 400, env, request);
  }
  if (!name || typeof name !== 'string' || name.length > 100) {
    return json({ error: 'name required (≤100 chars)' }, 400, env, request);
  }
  if (!Array.isArray(neurons) || !Array.isArray(synapses)) {
    return json({ error: 'neurons + synapses must be arrays' }, 400, env, request);
  }
  if (neurons.length > 5000 || synapses.length > 50000) {
    return json({ error: 'circuit too large (max 5000 neurons / 50000 synapses)' }, 400, env, request);
  }
  const circuitId = genCircuitId();
  const description = (body.description && typeof body.description === 'string')
    ? body.description.slice(0, 500) : null;
  const meta = body.meta ? JSON.stringify(body.meta).slice(0, 4000) : null;
  const isPublic = body.public === false ? 0 : 1;
  const createdAt = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    `INSERT INTO shared_circuits
      (circuit_id, owner, name, description, neurons, synapses, meta, public, created_at, download_count)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`
  ).bind(
    circuitId, owner, name, description,
    JSON.stringify(neurons), JSON.stringify(synapses), meta,
    isPublic, createdAt
  ).run();
  return json({
    circuit_id: circuitId, owner, name, public: !!isPublic, created_at: createdAt,
    neuron_count: neurons.length, synapse_count: synapses.length,
  }, 200, env, request);
}

async function handleCircuitsList(request, env) {
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  const ownerFilter = url.searchParams.get('owner');
  let stmt, binds;
  if (ownerFilter) {
    // 본인 회로는 public 무관 list (private 도 노출).
    stmt = `SELECT circuit_id, owner, name, description, public, created_at, download_count
            FROM shared_circuits WHERE owner = ?
            ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    binds = [ownerFilter, limit, offset];
  } else {
    stmt = `SELECT circuit_id, owner, name, description, public, created_at, download_count
            FROM shared_circuits WHERE public = 1
            ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    binds = [limit, offset];
  }
  const rs = await env.DB.prepare(stmt).bind(...binds).all();
  return json({ circuits: rs.results || [], limit, offset }, 200, env, request);
}

async function handleCircuitsGet(request, env, circuitId) {
  const row = await env.DB.prepare(
    `SELECT circuit_id, owner, name, description, neurons, synapses, meta, public, created_at, download_count
     FROM shared_circuits WHERE circuit_id = ?`
  ).bind(circuitId).first();
  if (!row) return json({ error: 'not found' }, 404, env, request);
  // download counter 증가 (best-effort, fail 무시).
  try {
    await env.DB.prepare(
      'UPDATE shared_circuits SET download_count = download_count + 1 WHERE circuit_id = ?'
    ).bind(circuitId).run();
  } catch (_) {}
  return json({
    circuit_id: row.circuit_id,
    owner: row.owner,
    name: row.name,
    description: row.description,
    neurons: JSON.parse(row.neurons),
    synapses: JSON.parse(row.synapses),
    meta: row.meta ? JSON.parse(row.meta) : null,
    public: !!row.public,
    created_at: row.created_at,
    download_count: row.download_count + 1,
  }, 200, env, request);
}

async function handleCircuitsDelete(request, env, circuitId) {
  const url = new URL(request.url);
  const owner = url.searchParams.get('owner');
  if (!owner) return json({ error: 'owner query required for delete' }, 400, env, request);
  const row = await env.DB.prepare(
    'SELECT owner FROM shared_circuits WHERE circuit_id = ?'
  ).bind(circuitId).first();
  if (!row) return json({ error: 'not found' }, 404, env, request);
  if (row.owner !== owner) return json({ error: 'not owner' }, 403, env, request);
  await env.DB.prepare('DELETE FROM shared_circuits WHERE circuit_id = ?').bind(circuitId).run();
  return json({ ok: true, deleted: circuitId }, 200, env, request);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env, request) });
    }
    const url = new URL(request.url);
    // training snapshot.
    const mTrain = url.pathname.match(/^\/networks\/([^/]+)\/training\/snapshot\/?$/);
    if (mTrain) {
      const networkId = decodeURIComponent(mTrain[1]);
      if (request.method === 'GET')  return handleGet(request, env, networkId);
      if (request.method === 'POST') return handlePost(request, env, networkId);
      return json({ error: 'method not allowed' }, 405, env, request);
    }
    // Phase 7 topology.
    const mTopo = url.pathname.match(/^\/networks\/([^/]+)\/topology\/?$/);
    if (mTopo) {
      const networkId = decodeURIComponent(mTopo[1]);
      if (request.method === 'GET')  return handleTopologyGet(request, env, networkId);
      if (request.method === 'POST') return handleTopologyPost(request, env, networkId);
      return json({ error: 'method not allowed' }, 405, env, request);
    }
    // Phase 7 datasets.
    const mDs = url.pathname.match(/^\/networks\/([^/]+)\/datasets\/([^/]+)\/?$/);
    if (mDs) {
      const networkId = decodeURIComponent(mDs[1]);
      const datasetId = decodeURIComponent(mDs[2]);
      if (request.method === 'GET')  return handleDatasetGet(request, env, networkId, datasetId);
      if (request.method === 'POST') return handleDatasetPost(request, env, networkId, datasetId);
      return json({ error: 'method not allowed' }, 405, env, request);
    }
    // Session 42+ Tier3-G: Circuit Marketplace.
    if (url.pathname === '/circuits' || url.pathname === '/circuits/') {
      if (request.method === 'GET')  return handleCircuitsList(request, env);
      if (request.method === 'POST') return handleCircuitsPublish(request, env);
      return json({ error: 'method not allowed' }, 405, env, request);
    }
    const mCir = url.pathname.match(/^\/circuits\/([^/]+)\/?$/);
    if (mCir) {
      const circuitId = decodeURIComponent(mCir[1]);
      if (request.method === 'GET')    return handleCircuitsGet(request, env, circuitId);
      if (request.method === 'DELETE') return handleCircuitsDelete(request, env, circuitId);
      return json({ error: 'method not allowed' }, 405, env, request);
    }
    return json({ error: 'not found' }, 404, env, request);
  },
};
