import { LEADERSHIP_INFO, type LeadershipInfo } from "./pools";
import { QUESTIONS, type LeadershipTag } from "./quiz";

const TAG_ORDER: readonly LeadershipTag[] = [
  "charismatic",
  "communicator",
  "coach",
  "servant",
  "visionary",
  "perfectionist",
];

export interface LeadershipResult {
  tag: LeadershipTag;
  info: LeadershipInfo;
}

export function generateLeadership(
  answers: Record<string, LeadershipTag>,
): LeadershipResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const counts: Record<LeadershipTag, number> = {
    charismatic: 0,
    communicator: 0,
    coach: 0,
    servant: 0,
    visionary: 0,
    perfectionist: 0,
  };
  for (const q of QUESTIONS) {
    counts[answers[q.id]] += 1;
  }

  const topTag = [...TAG_ORDER].sort((a, b) => counts[b] - counts[a])[0];
  return { tag: topTag, info: LEADERSHIP_INFO[topTag] };
}

const TAG_CODE: Record<LeadershipTag, string> = {
  charismatic: "0",
  communicator: "1",
  coach: "2",
  servant: "3",
  visionary: "4",
  perfectionist: "5",
};
const CODE_TAG: Record<string, LeadershipTag> = {
  "0": "charismatic",
  "1": "communicator",
  "2": "coach",
  "3": "servant",
  "4": "visionary",
  "5": "perfectionist",
};

export function encodeAnswers(answers: Record<string, LeadershipTag>): string {
  return QUESTIONS.map((q) => (answers[q.id] ? TAG_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(code: string): Record<string, LeadershipTag> | null {
  if (code.length !== QUESTIONS.length) return null;
  const answers: Record<string, LeadershipTag> = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const tag = CODE_TAG[code[i]];
    if (!tag) return null;
    answers[QUESTIONS[i].id] = tag;
  }
  return answers;
}
