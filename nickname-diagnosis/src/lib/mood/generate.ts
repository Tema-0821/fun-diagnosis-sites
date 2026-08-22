import { djb2Hash, mulberry32, pick } from "./seed";
import { MOOD_POOL, type MoodInfo } from "./pools";

export interface MoodResult {
  name: string;
  date: string;
  mood: MoodInfo;
}

function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, "");
}

export function todayKST(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + (9 * 60 + now.getTimezoneOffset()) * 60000);
  return kst.toISOString().slice(0, 10);
}

export function generateMood(rawName: string, date: string): MoodResult | null {
  const name = cleanName(rawName);
  if (!name) return null;

  const seed = djb2Hash(`${name}|${date}`);
  const rng = mulberry32(seed);
  const mood = pick(MOOD_POOL, rng);

  return { name, date, mood };
}
