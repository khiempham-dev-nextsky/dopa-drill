// Pure scoring and "dopa" curves (kept separate from the director for testing).

export const BASIC_SCORE = 100;
export const EXTRA_BASE = 10;

// Points for the k-th (0-based) extra problem grow gently: 10, 15, 20, ...
// A very fast player (20-25 extra problems in 90 s) ends in the 1000s.
export const EXTRA_STEP = 5;
export const extraPoints = (k) => EXTRA_BASE + EXTRA_STEP * k;
export const extraTotal = (n) => EXTRA_BASE * n + EXTRA_STEP * (n * (n - 1)) / 2;

// Dopa is tracked as log10 and grows one answer cell at a time. The base
// curves below are what a player with no combo gets; combos multiply each
// step (see comboMult), so a steady combo lands back near the old targets.
// Without combo the basic set ends near 10^2.3 (about 200); a full combo
// doubles every step after 20 cells and ends near 10.000.
export const BASIC_DOPA_L = 2.3;
export function basicDopaL(frac) {
  const f = Math.min(1, Math.max(0, frac));
  return BASIC_DOPA_L * f ** 1.15;
}
// Extra problems follow a saturating curve on top of the basic set.
const EXTRA_SPAN = 3.0; const EXTRA_TAU = 10;
export const extraDopaL = (n) => BASIC_DOPA_L + EXTRA_SPAN * (1 - Math.exp(-n / EXTRA_TAU));
export const extraProblemGain = (k) => extraDopaL(k + 1) - extraDopaL(k);
// Hard ceiling: about 1,2 tỷ, whatever the combo.
export const DOPA_MAX_L = 9.08;

// ---------------------------------------------------------------- combo
// One combo per correct answer cell, carried across problems. It does not
// change the score; it only makes dopa grow faster: the multiplier rises
// evenly from x1.0 and tops out at x2.0 at 20 combo.
export const COMBO_DOPA = { max: 2, full: 20 };
export const comboMult = (combo) => 1 + (COMBO_DOPA.max - 1) * Math.min(1, Math.max(0, combo) / COMBO_DOPA.full);
export const comboMaxed = (combo) => combo >= COMBO_DOPA.full;

// Add one answer cell's worth of dopa. `base` is the no-combo step (log10).
export function addDopa(L, base, combo) {
  return Math.min(DOPA_MAX_L, L + Math.max(0.003, base) * comboMult(combo));
}

// Time allowed to enter the next answer cell before the combo breaks
// (provisional). Harder skills (higher grade) get longer; the first cell of
// a problem adds time to read it.
export const COMBO_TIME = { base: 3000, perGrade: 600, read: 2500 };
export function comboWindowMs(grade = 3, first = false) {
  const g = Math.min(6, Math.max(1, grade || 3));
  return COMBO_TIME.base + COMBO_TIME.perGrade * (g - 1) + (first ? COMBO_TIME.read : 0);
}
// Milestones worth a bigger show: 10, 20, 30, 50, 75, 100, then every 50.
export const comboMilestone = (c) => [10, 20, 30, 50, 75].includes(c) || (c >= 100 && c % 50 === 0);

const UNITS = [[68, '×10^68'], [64, '×10^64'], [60, '×10^60'], [56, '×10^56'], [52, '×10^52'], [48, '×10^48'], [44, '×10^44'], [40, '×10^40'], [36, '×10^36'], [32, '×10^32'], [28, '×10^28'], [24, '×10^24'], [20, '×10^20'], [16, '×10^16'], [12, 'nghìn tỷ'], [8, 'trăm triệu']];
// Values from 10.000 through 10.000.000 stay in Vietnamese numeric notation.
const MILESTONES = [[3, 'nghìn'], [2, 'trăm']];

export function fmtDopa(L) {
  if (!Number.isFinite(L) || L >= 72) return '∞';
  if (L < 8) return Math.round(10 ** L).toLocaleString('vi-VN');
  const u = UNITS.find(([e]) => L >= e - 1e-9);
  const m = 10 ** (L - u[0]);
  return (m < 10 ? m.toFixed(1).replace('.', ',') : String(Math.floor(m))) + ` ${u[1]}`;
}

export function unitOf(L) {
  if (L >= 72) return '∞';
  // Each milestone from 10.000 through 10.000.000 is shown as a number.
  if (L >= 4 && L < 8) return ['10.000', '100.000', '1.000.000', '10.000.000'][Math.floor(L + 1e-9) - 4];
  const u = UNITS.find(([e]) => L >= e - 1e-9) || MILESTONES.find(([e]) => L >= e - 1e-9);
  return u ? u[1] : '';
}

const LABELS = {
  '∞': '∞',
  trăm: '100',
  nghìn: '1.000',
  '10.000': '10.000',
  '100.000': '100.000',
  '1.000.000': '1.000.000',
  '10.000.000': '10.000.000',
  'trăm triệu': '100.000.000',
  'nghìn tỷ': '1.000.000.000.000',
};
export const unitLabel = (u) => LABELS[u] || `1 ${u}`;
