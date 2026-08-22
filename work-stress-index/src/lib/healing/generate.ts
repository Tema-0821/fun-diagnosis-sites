import { HEALING_INFO, type HealingInfo } from "./pools";
import { QUESTIONS, type HealingTag } from "./quiz";

const TAG_ORDER: readonly HealingTag[] = ["nature", "hobby", "rest", "social", "active", "solo"];

export interface HealingResult {
  tag: HealingTag;
  info: HealingInfo;
}

export function generateHealing(answers: Record<string, HealingTag>): HealingResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const counts: Record<HealingTag, number> = {
    nature: 0,
    hobby: 0,
    rest: 0,
    social: 0,
    active: 0,
    solo: 0,
  };
  for (const q of QUESTIONS) {
    counts[answers[q.id]] += 1;
  }

  const topTag = [...TAG_ORDER].sort((a, b) => counts[b] - counts[a])[0];
  return { tag: topTag, info: HEALING_INFO[topTag] };
}

const TAG_CODE: Record<HealingTag, string> = {
  nature: "0",
  hobby: "1",
  rest: "2",
  social: "3",
  active: "4",
  solo: "5",
};
const CODE_TAG: Record<string, HealingTag> = {
  "0": "nature",
  "1": "hobby",
  "2": "rest",
  "3": "social",
  "4": "active",
  "5": "solo",
};

export function encodeAnswers(answers: Record<string, HealingTag>): string {
  return QUESTIONS.map((q) => (answers[q.id] ? TAG_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(code: string): Record<string, HealingTag> | null {
  if (code.length !== QUESTIONS.length) return null;
  const answers: Record<string, HealingTag> = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const tag = CODE_TAG[code[i]];
    if (!tag) return null;
    answers[QUESTIONS[i].id] = tag;
  }
  return answers;
}
