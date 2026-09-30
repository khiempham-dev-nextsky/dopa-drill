export const PLAYER_NAME_MAX = 24;
export const LEADERBOARD_LIMIT = 50;

export function normalizePlayerName(value) {
  const text = String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return Array.from(text).slice(0, PLAYER_NAME_MAX).join('');
}

export function validPlayerName(value) {
  const name = normalizePlayerName(value);
  return name.length >= 1 && name.length <= PLAYER_NAME_MAX;
}

export function validScore(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= 1_000_000;
}

async function jsonResponse(res) {
  try { return await res.json(); } catch { return {}; }
}

export async function fetchLeaderboard({ limit = LEADERBOARD_LIMIT, playerId = null } = {}) {
  const params = new URLSearchParams({ limit: String(Math.max(1, Math.min(LEADERBOARD_LIMIT, Math.floor(limit)))) });
  if (playerId) params.set('deviceId', playerId);
  try {
    const res = await fetch(`/api/leaderboard?${params}`, { cache: 'no-store', headers: { Accept: 'application/json' } });
    const data = await jsonResponse(res);
    return res.ok ? { ok: true, ...data } : { ok: false, status: res.status, ...data };
  } catch {
    return { ok: false, offline: true };
  }
}

export async function submitLeaderboard({ playerId, name, score }) {
  const displayName = normalizePlayerName(name);
  if (!playerId || !validPlayerName(displayName) || !validScore(score)) return { ok: false, invalid: true };
  try {
    const res = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ deviceId: playerId, name: displayName, score }),
    });
    const data = await jsonResponse(res);
    return res.ok ? { ok: true, ...data } : { ok: false, status: res.status, ...data };
  } catch {
    return { ok: false, offline: true };
  }
}
