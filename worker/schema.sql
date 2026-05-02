-- D1 schema (Phase 2): training snapshot 영구 저장.
-- network_id 단위 weight JSON 저장 (단일 row replace).
CREATE TABLE IF NOT EXISTS training_snapshots (
  network_id  TEXT PRIMARY KEY,
  weights     TEXT NOT NULL,       -- JSON [{pre,post,weight},...]
  updated_at  INTEGER NOT NULL,    -- unix epoch sec
  meta        TEXT                 -- optional JSON (anchor, session, ...)
);

CREATE INDEX IF NOT EXISTS idx_training_snapshots_updated
  ON training_snapshots (updated_at);

-- Phase 7 topology 영구 저장 (Session 37): grown neurons + synapses 통째.
CREATE TABLE IF NOT EXISTS topologies (
  network_id  TEXT PRIMARY KEY,
  neurons     TEXT NOT NULL,       -- JSON [{name, region, population, v_threshold, ...},...]
  synapses    TEXT NOT NULL,       -- JSON [{pre, post, weight, delay},...]
  updated_at  INTEGER NOT NULL,
  meta        TEXT
);

CREATE INDEX IF NOT EXISTS idx_topologies_updated
  ON topologies (updated_at);

-- Phase 7 학습 데이터셋 (Session 37): multi-modal sample 영구 저장.
-- samples = JSON [{pattern: [0..1]*8, target_out: 'out_X', modality, label?},...]
CREATE TABLE IF NOT EXISTS datasets (
  network_id  TEXT NOT NULL,
  dataset_id  TEXT NOT NULL,
  samples     TEXT NOT NULL,
  updated_at  INTEGER NOT NULL,
  meta        TEXT,
  PRIMARY KEY (network_id, dataset_id)
);

CREATE INDEX IF NOT EXISTS idx_datasets_updated
  ON datasets (updated_at);
