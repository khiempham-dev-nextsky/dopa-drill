import { neon } from '@neondatabase/serverless';

const MAX_STATE_BYTES = 900_000;
const DEVICE_ID = /^[A-Za-z0-9_-]{8,128}$/;

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

function stateBytes(state) {
  return new TextEncoder().encode(JSON.stringify(state)).byteLength;
}

export async function GET(request) {
  const deviceId = new URL(request.url).searchParams.get('deviceId');
  if (!validDeviceId(deviceId)) return response({ error: 'deviceId không hợp lệ' }, 400);
  const sql = database();
  if (!sql) return response({ error: 'Neon chưa được cấu hình', offline: true }, 503);

  try {
    const rows = await sql`
      SELECT state, client_updated_at
      FROM dopa_sync
      WHERE device_id = ${deviceId}
      LIMIT 1
    `;
    if (!rows.length) return response({ state: null, clientUpdatedAt: 0 });
    return response({ state: rows[0].state, clientUpdatedAt: Number(rows[0].client_updated_at) || 0 });
  } catch {
    return response({ error: 'Không thể đọc dữ liệu đồng bộ' }, 503);
  }
}

export async function POST(request) {
  const sql = database();
  if (!sql) return response({ error: 'Neon chưa được cấu hình', offline: true }, 503);

  let body;
  try { body = await request.json(); } catch { return response({ error: 'JSON không hợp lệ' }, 400); }
  const { deviceId, state, clientUpdatedAt } = body || {};
  const updatedAt = Number(clientUpdatedAt);
  if (!validDeviceId(deviceId) || !state || state.version !== 1 || !Number.isSafeInteger(updatedAt) || updatedAt < 0) {
    return response({ error: 'Payload đồng bộ không hợp lệ' }, 400);
  }
  if (stateBytes(state) > MAX_STATE_BYTES) return response({ error: 'Dữ liệu đồng bộ quá lớn' }, 413);

  try {
    const serialized = JSON.stringify(state);
    const rows = await sql`
      INSERT INTO dopa_sync (device_id, state, client_updated_at)
      VALUES (${deviceId}, ${serialized}::jsonb, ${updatedAt})
      ON CONFLICT (device_id) DO UPDATE
      SET state = EXCLUDED.state,
          client_updated_at = EXCLUDED.client_updated_at,
          updated_at = NOW()
      WHERE dopa_sync.client_updated_at <= EXCLUDED.client_updated_at
      RETURNING state, client_updated_at
    `;
    if (rows.length) return response({ ok: true, state: rows[0].state, clientUpdatedAt: Number(rows[0].client_updated_at) || 0 });

    const current = await sql`
      SELECT state, client_updated_at
      FROM dopa_sync
      WHERE device_id = ${deviceId}
      LIMIT 1
    `;
    return response({ ok: false, state: current[0]?.state || null, clientUpdatedAt: Number(current[0]?.client_updated_at) || 0 }, 409);
  } catch {
    return response({ error: 'Không thể ghi dữ liệu đồng bộ' }, 503);
  }
}
