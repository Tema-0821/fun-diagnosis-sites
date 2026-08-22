import { djb2Hash, mulberry32, pick } from "./seed";
import { ADVICE_POOL, CAUTION_POOL, getGradeBand, OPENING_POOL, STRENGTH_POOL } from "./pools";
import type { MbtiType } from "./types";

export interface CompatibilityResult {
  typeA: MbtiType; // 정렬된 순서
  typeB: MbtiType;
  score: number;
  gradeTitle: string;
  opening: string;
  strength: string;
  caution: string;
  advice: string;
}

function fillTemplate(template: string, a: string, b: string): string {
  return template.replace(/\{a\}/g, a).replace(/\{b\}/g, b);
}

// 두 유형을 어떤 순서로 골라도 항상 같은 결과가 나오도록 알파벳순으로 정렬해서 쓴다.
export function generateCompatibility(rawA: MbtiType, rawB: MbtiType): CompatibilityResult {
  const [typeA, typeB] = [rawA, rawB].sort();
  const seed = djb2Hash(`${typeA}|${typeB}`);
  const rng = mulberry32(seed);

  const score = Math.round(rng() * 50 + rng() * 50);
  const gradeTitle = pick(getGradeBand(score).titles, rng);

  const opening = fillTemplate(pick(OPENING_POOL, rng), typeA, typeB);
  const strength = fillTemplate(pick(STRENGTH_POOL, rng), typeA, typeB);
  const caution = fillTemplate(pick(CAUTION_POOL, rng), typeA, typeB);
  const advice = fillTemplate(pick(ADVICE_POOL, rng), typeA, typeB);

  return { typeA, typeB, score, gradeTitle, opening, strength, caution, advice };
}
