// Unlockable show (id041): backgrounds, correct marks, particles, music,
// Dopakichi's costume and colour, the crowd and the finale. Each item is the
// reward of one trophy (never random), so what is unlocked follows from the
// trophies earned; only the player's choice per category is saved.
import { TROPHY } from './trophies.js';

export const CATS = [
  { key: 'bg', name: 'Nền' },
  { key: 'mark', name: 'Dấu đúng' },
  { key: 'particle', name: 'Giấy màu' },
  { key: 'music', name: 'Âm nhạc' },
  { key: 'costume', name: 'Trang phục' },
  { key: 'color', name: 'Màu Dopakichi' },
  { key: 'crowd', name: 'Khán giả' },
  { key: 'finale', name: 'Màn kết' },
];

// base: available from the start. trophy: the trophy whose reward it is.
export const ITEMS = [];
export const ITEM = {};
export function addItems(list) {
  for (const it of list) {
    ITEMS.push(it); ITEM[it.id] = it;
    if (it.trophy && TROPHY[it.trophy]) TROPHY[it.trophy].reward = it.id;
  }
}
addItems([
  { id: 'bg:classic', cat: 'bg', name: 'Tia sáng', base: true },
  { id: 'mark:hanamaru', cat: 'mark', name: 'Hoa điểm tốt', base: true },
  { id: 'particle:classic', cat: 'particle', name: 'Giấy màu', base: true },
  { id: 'music:classic', cat: 'music', name: 'Nhạc marimba', base: true },
  { id: 'costume:none', cat: 'costume', name: 'Không', base: true },
  { id: 'color:pink', cat: 'color', name: 'Hồng', base: true },
  { id: 'crowd:classic', cat: 'crowd', name: 'Nhiều màu', base: true },
  { id: 'finale:classic', cat: 'finale', name: 'Dopakichi khổng lồ', base: true },
]);
// id041: one sample per category, to prove the pipeline end to end.
// Rewards follow effort and coming back (plays, days, streaks, stars earned by
// practice), not the placement check, which can master many skills at once.
addItems([
  { id: 'costume:cap', cat: 'costume', name: 'Mũ', trophy: 'days-1' },
  { id: 'particle:note', cat: 'particle', name: 'Nốt nhạc', trophy: 'days-3' },
  { id: 'mark:stamp', cat: 'mark', name: 'Con dấu đúng', trophy: 'plays-3' },
  { id: 'bg:night', cat: 'bg', name: 'Bầu trời đêm', trophy: 'streak-3' },
  { id: 'color:blue', cat: 'color', name: 'Xanh dương', trophy: 'plays-5' },
  { id: 'finale:fireworks', cat: 'finale', name: 'Hội pháo hoa', trophy: 'extras-5' },
  { id: 'music:chip', cat: 'music', name: '8-bit', trophy: 'plays-10' },
  { id: 'crowd:costume', cat: 'crowd', name: 'Khán giả mặc đẹp', trophy: 'firstTry-50' },
]);
// id042: backgrounds, correct marks and particles.
addItems([
  { id: 'bg:sea', cat: 'bg', name: 'Biển và bong bóng', trophy: 'problems-100' },
  { id: 'bg:festival', cat: 'bg', name: 'Lễ hội', trophy: 'days-15' },
  { id: 'bg:paper', cat: 'bg', name: 'Đồ thủ công giấy', trophy: 'problems-200' },
  { id: 'bg:space', cat: 'bg', name: 'Vũ trụ', trophy: 'extras-10' },
  { id: 'mark:medal', cat: 'mark', name: 'Huy chương', trophy: 'streak-7' },
  { id: 'mark:crown', cat: 'mark', name: 'Vương miện', trophy: 'perfects-3' },
  { id: 'mark:ring', cat: 'mark', name: 'Vòng pháo hoa', trophy: 'combo-30' },
  { id: 'particle:petal', cat: 'particle', name: 'Cánh hoa', trophy: 'stickers-7' },
  { id: 'particle:digit', cat: 'particle', name: 'Chữ số', trophy: 'cells-1000' },
  { id: 'particle:bubble', cat: 'particle', name: 'Bong bóng', trophy: 'review-10' },
  { id: 'particle:candy', cat: 'particle', name: 'Kẹo', trophy: 'extraBest-10' },
]);
// id043: songs (8-bit is the id041 sample).
addItems([
  { id: 'music:matsuri', cat: 'music', name: 'Nhạc lễ hội', trophy: 'streak-5' },
  { id: 'music:brass', cat: 'music', name: 'Ban nhạc kèn đồng', trophy: 'days-5' },
  { id: 'music:electro', cat: 'music', name: 'Nhạc điện tử', trophy: 'extras-3' },
]);
// id044: costumes, colours, crowd and finales (id045 moved three rewards to the new series).
addItems([
  { id: 'costume:hachimaki', cat: 'costume', name: 'Khăn đội đầu', trophy: 'problems-50' },
  { id: 'costume:cape', cat: 'costume', name: 'Áo choàng', trophy: 'combo-20' },
  { id: 'costume:glasses', cat: 'costume', name: 'Kính tròn', trophy: 'firstTry-100' },
  { id: 'costume:ribbon', cat: 'costume', name: 'Nơ', trophy: 'stickers-14' },
  { id: 'costume:crown', cat: 'costume', name: 'Vương miện', trophy: 'streak-14' },
  { id: 'costume:wizard', cat: 'costume', name: 'Mũ phù thủy', trophy: 'star5-1' },
  { id: 'costume:headphones', cat: 'costume', name: 'Tai nghe', trophy: 'capsules-1' },
  { id: 'color:mint', cat: 'color', name: 'Xanh lá', trophy: 'days-7' },
  { id: 'color:snow', cat: 'color', name: 'Trắng tuyết', trophy: 'questDays-7' },
  { id: 'color:yellow', cat: 'color', name: 'Vàng', trophy: 'problems-300' },
  { id: 'color:violet', cat: 'color', name: 'Tím', trophy: 'extraSolved-100' },
  { id: 'color:gold', cat: 'color', name: 'Vàng kim', trophy: 'streak-30' },
  { id: 'color:rainbow', cat: 'color', name: 'Cầu vồng', trophy: 'days-100' },
  { id: 'crowd:rainbow', cat: 'crowd', name: 'Khán giả cầu vồng', trophy: 'days-30' },
  { id: 'crowd:twins', cat: 'crowd', name: 'Khán giả đồng phục', trophy: 'starsTotal-100' },
  { id: 'finale:parade', cat: 'finale', name: 'Diễu hành', trophy: 'streak-10' },
  { id: 'finale:rocket', cat: 'finale', name: 'Tên lửa', trophy: 'extras-20' },
]);

export const isUnlocked = (it, got = {}) => !!(it && (it.base || (it.trophy && got[it.trophy])));
export const unlockedIn = (cat, got) => ITEMS.filter((it) => it.cat === cat && isUnlocked(it, got));
export const defaultEquip = () => Object.fromEntries(CATS.map((c) => [c.key, 'auto']));

// The look for one play: fixed choices stay; "auto" picks among the unlocked
// ones so every play can look and sound a little different.
export function pickLook(equip = {}, got = {}, rng = Math.random) {
  const look = {};
  for (const { key } of CATS) {
    const want = equip[key];
    const own = unlockedIn(key, got);
    if (want && want !== 'auto' && own.some((it) => it.id === want)) look[key] = want;
    else look[key] = own[Math.floor(rng() * own.length)].id;
  }
  return look;
}
// The part after "cat:" (what the show modules switch on).
export const variant = (id) => (id ? id.split(':')[1] : 'classic');
