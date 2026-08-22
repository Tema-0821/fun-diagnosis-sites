import { IDEAL_TYPE_INFO, type IdealTypeInfo } from "./pools";
import { QUESTIONS, type IdealType } from "./quiz";

const TYPE_ORDER: readonly IdealType[] = [
  "leader",
  "artist",
  "supporter",
  "tsundere",
  "healer",
  "wildcard",
];

export interface IdealTypeResult {
  type: IdealType;
  info: IdealTypeInfo;
}

export function generateIdealType(answers: Record<string, IdealType>): IdealTypeResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const counts: Record<IdealType, number> = {
    leader: 0,
    artist: 0,
    supporter: 0,
    tsundere: 0,
    healer: 0,
    wildcard: 0,
  };
  for (const q of QUESTIONS) {
    counts[answers[q.id]] += 1;
  }

  const topType = [...TYPE_ORDER].sort((a, b) => counts[b] - counts[a])[0];
  return { type: topType, info: IDEAL_TYPE_INFO[topType] };
}

const TYPE_CODE: Record<IdealType, string> = {
  leader: "0",
  artist: "1",
  supporter: "2",
  tsundere: "3",
  healer: "4",
  wildcard: "5",
};
const CODE_TYPE: Record<string, IdealType> = {
  "0": "leader",
  "1": "artist",
  "2": "supporter",
  "3": "tsundere",
  "4": "healer",
  "5": "wildcard",
};

export function encodeAnswers(answers: Record<string, IdealType>): string {
  return QUESTIONS.map((q) => (answers[q.id] ? TYPE_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(code: string): Record<string, IdealType> | null {
  if (code.length !== QUESTIONS.length) return null;
  const answers: Record<string, IdealType> = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const type = CODE_TYPE[code[i]];
    if (!type) return null;
    answers[QUESTIONS[i].id] = type;
  }
  return answers;
}
