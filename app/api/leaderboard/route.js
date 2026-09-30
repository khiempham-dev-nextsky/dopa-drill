import { neon } from '@neondatabase/serverless';
import { normalizePlayerName, validPlayerName, validScore } from '../../js/leaderboard.js';

const DEVICE_ID = /^[A-Za-z0-9_-]{8,128}$/;
const MAX_LIMIT = 50;

function response(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function database() {
  return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}

function validDeviceId(value) {
  return typeof value === 'string' && DEVICE_ID.test(value);
}

function entry(row, playerId = null) {
  return {
    rank: Number(row.rank),
    name: row.display_name,
    score: Number(row.best_score),
    ...(playerId && row.player_id === playerId ? { me: true } : {}),
  };
}

export async function GET(request) {
  const url = new URL(request.url);
  const requestedId = url.searchParams.get('deviceId');
  if (requestedId && !validDeviceId(requestedId)) return response({ error: 'deviceId không hợp lệ' }, 400);
  const rawLimit = Number(url.searchParams.get('limit') || MAX_LIMIT);
  const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(MAX_LIMIT, Math.floor(rawLimit))) : MAX_LIMIT;
  const sql = database();
  if (!sql) return response({ error: 'Neon chưa được cấu hình', offline: true }, 503);

  try {
    const rows = await sql`
      SELECT ROW_NUMBER() OVER (ORDER BY best_score DESC, updated_at ASC, player_id ASC) AS rank,
             player_id, display_name, best_score
      FROM dopa_leaderboard
      ORDER BY best_score DESC, updated_at ASC, player_id ASC
      LIMIT ${limit}
    `;
    let me = null;
    if (requestedId) {
      const mine = await sql`
        SELECT best_score, updated_at,
               (SELECT COUNT(*)::int + 1 FROM dopa_leaderboard AS higher WHERE higher.best_score > lb.best_score) AS rank,
               display_name
        FROM dopa_leaderboard AS lb
        WHERE player_id = ${requestedId}
        LIMIT 1
      `;
      if (mine.length) me = entry({ ...mine[0], rank: Number(mine[0].rank) });
    }
    return response({ entries: rows.map((row) => entry(row, requestedId)), me });
  } catch {
    return response({ error: 'Không thể đọc bảng xếp hạng' }, 503);
  }
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return response({ error: 'JSON không hợp lệ' }, 400); }
  const { deviceId, name, score } = body || {};
  const displayName = normalizePlayerName(name);
  const numericScore = Number(score);
  if (!validDeviceId(deviceId) || !validPlayerName(displayName) || !validScore(numericScore)) {
    return response({ error: 'Thông tin xếp hạng không hợp lệ' }, 400);
  }

  const sql = database();
  if (!sql) return response({ error: 'Neon chưa được cấu hình', offline: true }, 503);
  try {
    const rows = await sql`
      INSERT INTO dopa_leaderboard (player_id, display_name, best_score)
      VALUES (${deviceId}, ${displayName}, ${numericScore})
      ON CONFLICT (player_id) DO UPDATE SET
        display_name = EXCLUDED.display_name,
        best_score = GREATEST(dopa_leaderboard.best_score, EXCLUDED.best_score),
        updated_at = CASE
          WHEN EXCLUDED.best_score > dopa_leaderboard.best_score THEN NOW()
          ELSE dopa_leaderboard.updated_at
        END
      RETURNING player_id, display_name, best_score
    `;
    const saved = rows[0];
    const rankRows = await sql`
      SELECT COUNT(*)::int + 1 AS rank
      FROM dopa_leaderboard
      WHERE best_score > ${saved.best_score}
    `;
    return response({ ok: true, entry: { name: saved.display_name, score: Number(saved.best_score) }, rank: Number(rankRows[0]?.rank || 1) });
  } catch {
    return response({ error: 'Không thể ghi điểm lên bảng xếp hạng' }, 503);
  }
}
