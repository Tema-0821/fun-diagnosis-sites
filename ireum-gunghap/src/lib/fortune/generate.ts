import { djb2Hash, mulberry32, pick } from "./seed";
import { FORTUNE_POOL, LUCKY_COLOR_POOL, LUCKY_ITEM_POOL, getLuckyNumber } from "./pools";

export interface FortuneResult {
  name: string;
  date: string; // YYYY-MM-DD
  score: number;
  message: string;
  luckyColor: string;
  luckyItem: string;
  luckyNumber: number;
}

function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, "");
}

export function todayKST(): string {
  // 한국 시간 기준 오늘 날짜(YYYY-MM-DD)를 구한다. 매일 자정에 결과가 자연스럽게 바뀐다.
  const now = new Date();
  const kst = new Date(now.getTime() + (9 * 60 + now.getTimezoneOffset()) * 60000);
  return kst.toISOString().slice(0, 10);
}

export function generateFortune(rawName: string, date: string): FortuneResult | null {
  const name = cleanName(rawName);
  if (!name) return null;

  const seed = djb2Hash(`${name}|${date}`);
  const rng = mulberry32(seed);

  const score = Math.round(rng() * 40 + rng() * 40 + rng() * 20);
  const message = pick(FORTUNE_POOL, rng);
  const luckyColor = pick(LUCKY_COLOR_POOL, rng);
  const luckyItem = pick(LUCKY_ITEM_POOL, rng);
  const luckyNumber = getLuckyNumber(rng);

  return { name, date, score, message, luckyColor, luckyItem, luckyNumber };
}
