import test from 'node:test';
import assert from 'node:assert/strict';
import { PLAYER_NAME_MAX, normalizePlayerName, validPlayerName, validScore } from '../app/js/leaderboard.js';

test('leaderboard names are trimmed, normalized, and capped safely', () => {
  assert.equal(normalizePlayerName('  Minh\n\n  Anh  '), 'Minh Anh');
  assert.equal(normalizePlayerName('A\u0000B\u001fC'), 'ABC');
  assert.equal(Array.from(normalizePlayerName('x'.repeat(PLAYER_NAME_MAX + 8))).length, PLAYER_NAME_MAX);
  assert.equal(validPlayerName('Dopa'), true);
  assert.equal(validPlayerName('   '), false);
});

test('leaderboard accepts bounded integer scores only', () => {
  assert.equal(validScore(100), true);
  assert.equal(validScore(1_000_000), true);
  assert.equal(validScore(-1), false);
  assert.equal(validScore(100.5), false);
  assert.equal(validScore(1_000_001), false);
});
