// Trophies (id036): many small achievements, like the ones in mobile games.
// Each series is one measure with rising steps; every step is a trophy.
// Days and streaks get dense steps; volume series get wide ones so long
// sessions are not pushed too hard (docs/SPEC.md 14.7). Nothing is
// random, conditions are always shown (except a few secrets), and a trophy,
// once earned, is kept.
import { SKILLS, LANES } from './skills.js';
import { isUnlocked, isMastered, starsOf } from './session.js';

export const CATS = ['Duy trì', 'Chăm chỉ', 'Kỹ năng', 'Tiến bộ', 'Thử thách', 'Combo', 'Chính xác', 'Dopa', 'Ôn tập', 'Theo khối', 'Bộ sưu tập', 'Bí mật'];

const fmt = (n) => n.toLocaleString('vi-VN');
const DOPA_LABEL = { 2: '100', 3: '1.000', 4: '10.000', 5: '100.000', 6: '1 triệu', 7: '10 triệu', 8: '100 triệu', 9: '1 tỷ' };
const RANKS = ['bronze', 'silver', 'gold', 'rainbow'];
export const RANK_NAME = { bronze: 'đồng', silver: 'bạc', gold: 'vàng', rainbow: 'cầu vồng', secret: 'bí mật' };

// Rank by position in its series: first ~30% bronze, then silver, gold, and the last step rainbow.
function rankAt(i, n) {
  if (n === 1) return 'gold';
  if (i === n - 1) return 'rainbow';
  return RANKS[Math.min(2, Math.floor((i / (n - 1)) * 3.3))];
}

// A series: { key, cat, title, metric, steps, name(v), desc(v) } or explicit items.
const SERIES_DEFS = [
  { key: 'streak', cat: 'Duy trì', title: 'Chơi liên tiếp', metric: 'bestStreak', steps: [3, 5, 7, 10, 14, 21, 30, 50, 75, 100, 150, 200, 365], name: (v) => `${v} ngày liên tiếp`, desc: (v) => `Chơi liên tiếp ${v} ngày` },
  { key: 'days', cat: 'Duy trì', title: 'Ngày đã chơi', metric: 'days', steps: [1, 3, 5, 7, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300, 365, 500, 730, 1000], name: (v) => `Đã chơi ${fmt(v)} ngày`, desc: (v) => `Tổng cộng chơi ${fmt(v)} ngày` },
  { key: 'stickers', cat: 'Duy trì', title: 'Nhãn đăng nhập', metric: 'stickers', steps: [1, 7, 14, 30, 50, 100, 200, 365], name: (v) => `${v} nhãn`, desc: (v) => `Sưu tầm ${v} nhãn thưởng đăng nhập` },
  { key: 'crowns', cat: 'Duy trì', title: 'Nhãn vương miện', metric: 'crowns', steps: [1, 3, 5, 10, 20, 52], name: (v) => `${v} vương miện`, desc: (v) => `Sưu tầm ${v} nhãn vương miện ngày thứ 7` },
  { key: 'problems', cat: 'Chăm chỉ', title: 'Câu đã giải', metric: 'problems', steps: [10, 30, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 20000, 30000, 50000, 100000], name: (v) => `${fmt(v)} câu`, desc: (v) => `Giải tổng cộng ${fmt(v)} câu` },
  { key: 'cells', cat: 'Chăm chỉ', title: 'Chữ số đã nhập', metric: 'cells', steps: [100, 500, 1000, 3000, 5000, 10000, 30000, 50000, 100000, 300000], name: (v) => `${fmt(v)} chữ số`, desc: (v) => `Nhập đúng tổng cộng ${fmt(v)} chữ số` },
  { key: 'plays', cat: 'Chăm chỉ', title: 'Số lần chơi', metric: 'plays', steps: [1, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000], name: (v) => `${fmt(v)} lần`, desc: (v) => `Hoàn thành bài luyện ${fmt(v)} lần` },
  { key: 'minutes', cat: 'Chăm chỉ', title: 'Thời gian chơi', metric: 'minutes', steps: [10, 30, 60, 120, 300, 600, 1200, 3000], name: (v) => (v >= 60 ? `Tổng ${v / 60} giờ` : `Tổng ${v} phút`), desc: (v) => `Tổng thời gian chơi: ${v >= 60 ? `${v / 60} giờ` : `${v} phút`}` },
  { key: 'unlocked', cat: 'Kỹ năng', title: 'Mở khóa kỹ năng', metric: 'unlocked', steps: [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58], name: (v) => `Mở khóa ${v} kỹ năng`, desc: (v) => `Mở khóa ${v} kỹ năng` },
  { key: 'mastered', cat: 'Kỹ năng', title: 'Thạo kỹ năng', metric: 'mastered', steps: [1, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58], name: (v) => `Thạo ${v} kỹ năng`, desc: (v) => `Thạo ${v} kỹ năng` },
  { key: 'gradeDone', cat: 'Kỹ năng', title: 'Thạo toàn bộ khối', items: [1, 2, 3, 4, 5, 6].map((g) => ({ id: `gradeDone-${g}`, metric: `gradeDone${g}`, need: 1, name: `Thạo toàn bộ lớp ${g}`, desc: `Thạo toàn bộ kỹ năng lớp ${g}` })) },
  { key: 'laneDone', cat: 'Kỹ năng', title: 'Thạo toàn bộ nhóm', items: LANES.map((l, i) => ({ id: `laneDone-${i}`, metric: `laneDone${i}`, need: 1, name: `${l} — Thạo`, desc: `Thạo toàn bộ kỹ năng nhóm ${l}` })) },
  { key: 'extras', cat: 'Thử thách', title: 'Vào màn thử thách', metric: 'extras', steps: [1, 3, 5, 10, 20, 30, 50, 100, 200, 300], name: (v) => `Thử thách ${v} lần`, desc: (v) => `Vào màn thử thách ${v} lần` },
  { key: 'extraBest', cat: 'Thử thách', title: 'Kỷ lục một màn thử thách', metric: 'extraBest', steps: [3, 5, 7, 10, 12, 15, 18, 20, 23, 25, 30], name: (v) => `${v} câu trong 1 lần`, desc: (v) => `Giải ${v} câu trong 1 màn thử thách` },
  { key: 'extraSolved', cat: 'Thử thách', title: 'Câu đã giải ở thử thách', metric: 'extraSolved', steps: [10, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000], name: (v) => `Thử thách ${fmt(v)} câu`, desc: (v) => `Giải tổng cộng ${fmt(v)} câu ở thử thách` },
  { key: 'combo', cat: 'Combo', title: 'Combo', metric: 'maxCombo', steps: [5, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300], name: (v) => `Combo ${v}`, desc: (v) => `Đạt combo ${v}` },
  { key: 'perfects', cat: 'Chính xác', title: 'Hoàn thành không lỗi', metric: 'perfects', steps: [1, 3, 5, 10, 20, 30, 50, 100, 200, 300], name: (v) => `Không lỗi ${v} lần`, desc: (v) => `Hoàn thành ${v} lần với tỷ lệ đúng lần đầu 100%` },
  { key: 'firstTry', cat: 'Chính xác', title: 'Đúng ngay lần đầu', metric: 'firstTry', steps: [10, 50, 100, 300, 500, 1000, 3000, 5000, 10000, 30000], name: (v) => `Đúng lần đầu ${fmt(v)} câu`, desc: (v) => `Có ${fmt(v)} câu đúng ngay lần đầu` },
  { key: 'dopa', cat: 'Dopa', title: 'Dopa', metric: 'bestDopaL', steps: [2, 3, 4, 5, 6, 7, 8, 9], name: (v) => `${DOPA_LABEL[v]} Dopa`, desc: (v) => `Vượt ${DOPA_LABEL[v]} Dopa trong 1 lần chơi` },
  { key: 'review', cat: 'Ôn tập', title: 'Ôn tập', metric: 'reviewSolved', steps: [1, 5, 10, 30, 50, 100, 200, 300], name: (v) => `Ôn tập ${v} câu`, desc: (v) => `Làm lại ${v} câu đã sai` },
  ...[1, 2, 3, 4, 5, 6].map((g) => ({ key: `grade${g}`, cat: 'Theo khối', title: `Chơi lớp ${g}`, metric: `gradePlays${g}`, steps: [1, 10, 30], name: (v) => `Lớp ${g}: ${v} lần`, desc: (v) => `Chơi lớp ${g} ${v} lần` })),
  { key: 'secret', cat: 'Bí mật', title: 'Bí mật', items: [
    { id: 'secret-perfect14', metric: 'flag:perfect14', need: 1, name: '14 câu hoàn hảo', desc: 'Giải 14 câu với 0 lần suýt đúng', secret: true },
    { id: 'secret-extraClean', metric: 'flag:extraClean', need: 1, name: 'Thử thách không lỗi', desc: 'Giải ít nhất 5 câu ở thử thách với 0 lần suýt đúng', secret: true },
    { id: 'secret-sunday', metric: 'flag:sunday', need: 1, name: 'Toán chủ nhật', desc: 'Chơi vào chủ nhật', secret: true },
    { id: 'secret-newyear', metric: 'flag:newyear', need: 1, name: 'Bài luyện đầu năm', desc: 'Chơi vào ngày 1 tháng 1', secret: true },
    { id: 'secret-comeback', metric: 'flag:comeback', need: 1, name: 'Chào mừng trở lại!', desc: 'Chơi lại sau ít nhất 1 tuần nghỉ', secret: true },
    { id: 'secret-allmodes', metric: 'allModes', need: 1, name: 'Đủ mọi cách chơi', desc: 'Chơi đủ Trình độ của mình, Theo khối, Luyện tập và Ôn tập', secret: true },
  ] },
];

// Other features add their own series (id045). Keep this list append-only.
export const SERIES = [];
export const TROPHIES = [];
export const TROPHY = {};
export function addSeries(def) {
  const items = def.items
    ? def.items.map((it, i, a) => ({ rank: it.secret ? 'secret' : rankAt(i, a.length), ...it }))
    : def.steps.map((v, i, a) => ({ id: `${def.key}-${v}`, metric: def.metric, need: v, name: def.name(v), desc: def.desc(v), rank: rankAt(i, a.length) }));
  const series = { key: def.key, cat: def.cat, title: def.title, items: items.map((it) => ({ ...it, series: def.key, cat: def.cat, reward: it.reward || null })) };
  SERIES.push(series);
  for (const it of series.items) { TROPHIES.push(it); TROPHY[it.id] = it; }
  return series;
}
SERIES_DEFS.forEach(addSeries);

// id045: the features added after id036 (stars, quests, hammer, rust,
// time capsule, "you improved", collection).
[
  { key: 'questDays', cat: 'Duy trì', title: 'Hoàn thành nhiệm vụ', metric: 'questDays', steps: [1, 3, 7, 14, 30, 50, 100, 200, 365], name: (v) => `Hoàn thành ${v} ngày`, desc: (v) => `Hoàn thành toàn bộ nhiệm vụ hôm nay trong ${v} ngày` },
  { key: 'questRun', cat: 'Duy trì', title: 'Chuỗi nhiệm vụ', metric: 'questRun', steps: [2, 3, 5, 7, 14, 30], name: (v) => `Nhiệm vụ ${v} ngày liên tiếp`, desc: (v) => `Hoàn thành toàn bộ nhiệm vụ ${v} ngày liên tiếp` },
  { key: 'hammer', cat: 'Duy trì', title: 'Búa bỏ qua', metric: 'hammerUsed', steps: [1, 3, 10], name: (v) => (v === 1 ? 'Búa đầu tiên' : `Bỏ qua ${v} lần`), desc: (v) => `Dùng búa bỏ qua ${v} lần` },
  { key: 'starsTotal', cat: 'Kỹ năng', title: 'Số sao', metric: 'starsTotal', steps: [5, 10, 25, 50, 75, 100, 150, 200, 250, 290], name: (v) => `Sưu tầm ${v} sao`, desc: (v) => `Sưu tầm tổng cộng ${v} sao kỹ năng` },
  { key: 'star5', cat: 'Kỹ năng', title: 'Kỹ năng ☆5', metric: 'star5', steps: [1, 3, 5, 10, 20, 30, 58], name: (v) => `☆5 ${v} kỹ năng`, desc: (v) => `Đạt ☆5 ở ${v} kỹ năng` },
  { key: 'gradeStar3', cat: 'Kỹ năng', title: 'Toàn bộ lớp ☆3', items: [1, 2, 3, 4, 5, 6].map((g) => ({ id: `gradeStar3-${g}`, metric: `gradeStar3${g}`, need: 1, name: `Toàn bộ lớp ${g} đạt ☆3`, desc: `Đưa toàn bộ kỹ năng lớp ${g} lên ít nhất ☆3` })) },
  { key: 'polished', cat: 'Tiến bộ', title: 'Đánh bóng kỹ năng', metric: 'polished', steps: [1, 3, 5, 10, 30, 50], name: (v) => `Lấp lánh ${v} lần`, desc: (v) => `Đánh bóng kỹ năng bị nguội ${v} lần` },
  { key: 'capsules', cat: 'Tiến bộ', title: 'Hộp thời gian', metric: 'capsules', steps: [1, 3, 5, 10, 30], name: (v) => `Mở ${v} hộp`, desc: (v) => `Mở ${v} hộp thời gian` },
  { key: 'capsuleFaster', cat: 'Tiến bộ', title: 'Nhanh hơn ngày xưa', metric: 'capsuleFaster', steps: [1, 5, 10], name: (v) => `Nhanh hơn ngày xưa ${v} lần`, desc: (v) => `Giải nhanh hơn ngày xưa ${v} lần trong hộp thời gian` },
  { key: 'grew', cat: 'Tiến bộ', title: 'Tiến bộ!', metric: 'grew', steps: [1, 5, 10, 30, 50, 100], name: (v) => `Tiến bộ ${v} lần`, desc: (v) => `Xuất hiện thông báo “Tiến bộ!” ${v} lần` },
  { key: 'items', cat: 'Bộ sưu tập', title: 'Bộ sưu tập', metric: 'itemsOwned', steps: [10, 20, 30, 40, 47], name: (v) => `Bộ sưu tập ${v} món`, desc: (v) => `Sưu tầm ${v} món trong bộ sưu tập` },
  { key: 'catComplete', cat: 'Bộ sưu tập', title: 'Đủ bộ', metric: 'catComplete', steps: [1, 3, 5, 8], name: (v) => `${v} loại hoàn tất`, desc: (v) => `Sưu tầm đủ ${v} loại trong bộ sưu tập` },
].forEach(addSeries);

// Numbers every trophy is measured against, from the saved state.
// snap: { stats, prog, bestStreak, stickers, crowns, ...extra metrics }
export function trophyMetrics(snap) {
  const s = snap.stats || {};
  const prog = snap.prog || { skills: {} };
  const m = {
    bestStreak: snap.bestStreak || 0, days: s.days || 0, stickers: snap.stickers || 0, crowns: snap.crowns || 0,
    problems: s.problems || 0, cells: s.cells || 0, plays: s.plays || 0, minutes: Math.floor((s.playMs || 0) / 60000),
    unlocked: SKILLS.filter((x) => isUnlocked(prog, x.id)).length, mastered: SKILLS.filter((x) => isMastered(prog, x.id)).length,
    extras: s.extras || 0, extraBest: s.extraBest || 0, extraSolved: s.extraSolved || 0, maxCombo: s.maxCombo || 0,
    perfects: s.perfects || 0, firstTry: s.firstTry || 0, bestDopaL: Math.floor((s.bestDopaL || 0) + 1e-9), reviewSolved: s.reviewSolved || 0,
  };
  const stars = Object.fromEntries(SKILLS.map((x) => [x.id, starsOf(prog, x.id)]));
  m.starsTotal = Object.values(stars).reduce((a, b) => a + b, 0);
  m.star5 = Object.values(stars).filter((n) => n >= 5).length;
  m.polished = s.polished || 0; m.capsules = s.capsules || 0; m.capsuleFaster = s.capsuleFaster || 0; m.grew = s.grew || 0;
  for (let g = 1; g <= 6; g++) {
    m[`gradeStar3${g}`] = SKILLS.filter((x) => x.grade === g).every((x) => stars[x.id] >= 3) ? 1 : 0;
    m[`gradeDone${g}`] = SKILLS.filter((x) => x.grade === g).every((x) => isMastered(prog, x.id)) ? 1 : 0;
    m[`gradePlays${g}`] = (s.grades || {})[g] || 0;
  }
  LANES.forEach((_, i) => { m[`laneDone${i}`] = SKILLS.filter((x) => x.lane === i).every((x) => isMastered(prog, x.id)) ? 1 : 0; });
  for (const [k, v] of Object.entries(s.flags || {})) if (v) m[`flag:${k}`] = 1;
  const modes = s.modes || {};
  m.allModes = ['level', 'grade', 'practice', 'review'].every((k) => modes[k]) ? 1 : 0;
  Object.assign(m, snap.extra || {});
  return m;
}
export const valueOf = (m, metric) => m[metric] || 0;

// Earn every trophy whose condition is met. Returns the new ones (in list order).
// `state` is the saved { got: { id: time } }; the first call earns what the
// existing records already reach and marks them as a batch.
export function evaluate(state, metrics, at = Date.now()) {
  state.got = state.got || {};
  const fresh = [];
  for (const t of TROPHIES) {
    if (state.got[t.id]) continue;
    if (valueOf(metrics, t.metric) >= t.need) { state.got[t.id] = at; fresh.push(t); }
  }
  if (!state.init) { state.init = true; state.batch = fresh.map((t) => t.id); return []; }
  return fresh;
}

export const earnedCount = (state) => TROPHIES.filter((t) => state.got && state.got[t.id]).length;

// Progress of one series for the list screen.
export function seriesView(series, state, metrics) {
  const got = series.items.filter((t) => state.got && state.got[t.id]);
  const next = series.items.find((t) => !(state.got && state.got[t.id]));
  const top = got[got.length - 1] || null;
  return { series, got, next, top, value: next ? valueOf(metrics, next.metric) : null };
}
