import { djb2Hash, mulberry32, pick } from "./seed";
import { ADVICE_POOL, CAUTION_POOL, getGradeBand, OPENING_POOL, STRENGTH_POOL } from "./pools";

export interface CompatibilityResult {
  nameA: string; // 정렬된 순서 (가나다순 앞쪽)
  nameB: string; // 정렬된 순서 (가나다순 뒤쪽)
  score: number; // 0~100
  gradeTitle: string;
  opening: string;
  strength: string;
  caution: string;
  advice: string;
}

function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, "");
}

function fillTemplate(template: string, nameA: string, nameB: string): string {
  return template.replace(/\{a\}/g, nameA).replace(/\{b\}/g, nameB);
}

// 이름 두 개를 어떤 순서로 입력해도(철수·영희 / 영희·철수) 항상 같은 결과가 나오도록,
// 가나다순으로 정렬한 뒤 그 순서를 결과 표시에도 그대로 쓴다.
export function generateCompatibility(rawNameA: string, rawNameB: string): CompatibilityResult | null {
  const a = cleanName(rawNameA);
  const b = cleanName(rawNameB);
  if (!a || !b) return null;

  const [nameA, nameB] = [a, b].sort((x, y) => x.localeCompare(y, "ko"));
  const seedInput = `${nameA}|${nameB}`;
  const seed = djb2Hash(seedInput);
  const rng = mulberry32(seed);

  // 0~50 난수 두 개를 더해 중간값이 자주 나오도록(극단값은 상대적으로 드물게) 분포를 만든다.
  const score = Math.round(rng() * 50 + rng() * 50);
  const gradeTitle = pick(getGradeBand(score).titles, rng);

  const opening = fillTemplate(pick(OPENING_POOL, rng), nameA, nameB);
  const strength = fillTemplate(pick(STRENGTH_POOL, rng), nameA, nameB);
  const caution = fillTemplate(pick(CAUTION_POOL, rng), nameA, nameB);
  const advice = fillTemplate(pick(ADVICE_POOL, rng), nameA, nameB);

  return { nameA, nameB, score, gradeTitle, opening, strength, caution, advice };
}
