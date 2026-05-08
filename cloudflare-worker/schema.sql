-- SNN D1 schema — 가중치 + 토폴로지 + delta 영속화.
-- 무료 plan 가정: 5GB, 5M reads/day, 100K writes/day.
--
-- 적용:
--   wrangler d1 execute snn-weights --file=./schema.sql
--   wrangler d1 execute snn-weights --remote --file=./schema.sql
--
-- 인덱스 정합 — net_id 별 조회가 핵심 path. delta 는 rev 정렬 자주.

-- 토폴로지 (NetworkSnapshot) — net_id 당 최신 1개 (upsert).
CREATE TABLE IF NOT EXISTS topology (
  net_id TEXT PRIMARY KEY,
  snapshot TEXT NOT NULL,        -- JSON serialized NetworkSnapshot
  updated_at INTEGER NOT NULL    -- epoch ms
);

-- 가중치 (WeightSnapshot) — net_id + rev 복합 PK.
CREATE TABLE IF NOT EXISTS weights (
  net_id TEXT NOT NULL,
  rev INTEGER NOT NULL,
  t REAL NOT NULL,               -- 시뮬레이션 시간 (ms)
  saved_at INTEGER NOT NULL,     -- 벽시계 (epoch ms)
  payload TEXT NOT NULL,         -- JSON serialized WeightSnapshot (weights 배열 포함)
  PRIMARY KEY (net_id, rev)
);

CREATE INDEX IF NOT EXISTS idx_weights_net_saved
  ON weights (net_id, saved_at DESC);

-- delta (WeightDelta) — net_id + rev 복합 PK. compact 시 rev <= cutoff 삭제.
CREATE TABLE IF NOT EXISTS deltas (
  net_id TEXT NOT NULL,
  base_rev INTEGER NOT NULL,
  rev INTEGER NOT NULL,
  saved_at INTEGER NOT NULL,
  payload TEXT NOT NULL,         -- JSON serialized WeightDelta
  PRIMARY KEY (net_id, rev)
);

CREATE INDEX IF NOT EXISTS idx_deltas_net_rev
  ON deltas (net_id, rev ASC);
