import { COMPANION_INFO, type CompanionInfo } from "./pools";
import { QUESTIONS, type CompanionTag } from "./quiz";

const TAG_ORDER: readonly CompanionTag[] = ["power", "wisdom", "cunning", "charm"];

export interface CompanionResult {
  tag: CompanionTag;
  info: CompanionInfo;
}

export function generateCompanion(
  answers: Record<string, CompanionTag>,
): CompanionResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const counts: Record<CompanionTag, number> = { power: 0, wisdom: 0, cunning: 0, charm: 0 };
  for (const q of QUESTIONS) {
    counts[answers[q.id]] += 1;
  }

  const topTag = [...TAG_ORDER].sort((a, b) => counts[b] - counts[a])[0];
  return { tag: topTag, info: COMPANION_INFO[topTag] };
}

const TAG_CODE: Record<CompanionTag, string> = { power: "0", wisdom: "1", cunning: "2", charm: "3" };
const CODE_TAG: Record<string, CompanionTag> = { "0": "power", "1": "wisdom", "2": "cunning", "3": "charm" };

export function encodeAnswers(answers: Record<string, CompanionTag>): string {
  return QUESTIONS.map((q) => (answers[q.id] ? TAG_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(code: string): Record<string, CompanionTag> | null {
  if (code.length !== QUESTIONS.length) return null;
  const answers: Record<string, CompanionTag> = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const tag = CODE_TAG[code[i]];
    if (!tag) return null;
    answers[QUESTIONS[i].id] = tag;
  }
  return answers;
}
