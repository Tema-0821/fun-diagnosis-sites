import { djb2Hash, mulberry32, pick } from "./seed";
import { ADJECTIVE_POOL, DESCRIPTION_POOL, NOUN_POOL, TRAIT_POOL } from "./pools";

export interface NicknameResult {
  name: string;
  nickname: string;
  description: string;
  traits: readonly [string, string, string];
}

function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, "");
}

// 배열에서 중복 없이 n개를 시드 순서대로 골라 반환한다.
function pickUnique<T>(items: readonly T[], count: number, rng: () => number): T[] {
  const pool = [...items];
  const result: T[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const index = Math.floor(rng() * pool.length);
    result.push(pool.splice(Math.min(index, pool.length - 1), 1)[0]);
  }
  return result;
}

export function generateNickname(rawName: string): NicknameResult | null {
  const name = cleanName(rawName);
  if (!name) return null;

  const seed = djb2Hash(name);
  const rng = mulberry32(seed);

  const adjective = pick(ADJECTIVE_POOL, rng);
  const noun = pick(NOUN_POOL, rng);
  const description = pick(DESCRIPTION_POOL, rng);
  const traits = pickUnique(TRAIT_POOL, 3, rng) as [string, string, string];

  return {
    name,
    nickname: `${adjective} ${noun}`,
    description,
    traits,
  };
}
