import { djb2Hash, mulberry32, pick } from "./seed";
import { COMMENT_POOL, getRateBand } from "./pools";

export interface CrushRateResult {
  me: string;
  crush: string;
  score: number;
  title: string;
  comment: string;
}

function cleanName(name: string): string {
  return name.trim().replace(/\s+/g, "");
}

function fillTemplate(template: string, me: string, crush: string): string {
  return template.replaceAll("{me}", me).replaceAll("{crush}", crush);
}

export function generateCrushRate(rawMe: string, rawCrush: string): CrushRateResult | null {
  const me = cleanName(rawMe);
  const crush = cleanName(rawCrush);
  if (!me || !crush) return null;

  // 방향성이 있는 관계(내가 상대를 짝사랑)라 이름을 정렬하지 않고 그대로 시드로 쓴다.
  const seed = djb2Hash(`${me}>${crush}`);
  const rng = mulberry32(seed);

  const score = Math.round(rng() * 50 + rng() * 50);
  const title = pick(getRateBand(score).titles, rng);
  const comment = fillTemplate(pick(COMMENT_POOL, rng), me, crush);

  return { me, crush, score, title, comment };
}
