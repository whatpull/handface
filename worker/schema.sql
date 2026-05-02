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
