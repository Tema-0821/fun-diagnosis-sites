import { djb2Hash, mulberry32, pick } from "./seed";
import {
  ABILITY_POOL,
  DESCRIPTION_POOL,
  getGradeBand,
  REBIRTH_POOL,
  ROLE_POOL,
} from "./pools";

export interface PastLifeResult {
  name: string;
  role: string;
  legendScore: number;
  gradeTitle: string;
  description: string;
  abilities: readonly [string, string, string];
  rebirth: string;
}

function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, "");
}

function fillTemplate(template: string, name: string): string {
  return template.replaceAll("{name}", name);
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

export function generatePastLife(rawName: string): PastLifeResult | null {
  const name = cleanName(rawName);
  if (!name) return null;

  const seed = djb2Hash(name);
  const rng = mulberry32(seed);

  const legendScore = Math.round(rng() * 50 + rng() * 50);
  const gradeTitle = pick(getGradeBand(legendScore).titles, rng);
  const role = pick(ROLE_POOL, rng);
  const description = fillTemplate(pick(DESCRIPTION_POOL, rng), name);
  const abilities = pickUnique(ABILITY_POOL, 3, rng) as [string, string, string];
  const rebirth = fillTemplate(pick(REBIRTH_POOL, rng), name);

  return { name, role, legendScore, gradeTitle, description, abilities, rebirth };
}
