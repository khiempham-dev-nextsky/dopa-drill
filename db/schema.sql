CREATE TABLE IF NOT EXISTS dopa_sync (
  device_id TEXT PRIMARY KEY,
  state JSONB NOT NULL,
  client_updated_at BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dopa_leaderboard (
  player_id TEXT PRIMARY KEY CHECK (char_length(player_id) BETWEEN 8 AND 128),
  display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 24),
  best_score INTEGER NOT NULL CHECK (best_score >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS dopa_leaderboard_score_idx
  ON dopa_leaderboard (best_score DESC, updated_at ASC, player_id ASC);
