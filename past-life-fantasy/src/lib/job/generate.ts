import { JOB_INFO, type JobInfo } from "./pools";
import { QUESTIONS, type JobTag } from "./quiz";

const TAG_ORDER: readonly JobTag[] = ["warrior", "mage", "ranger", "rogue", "paladin", "bard"];

export interface JobResult {
  tag: JobTag;
  info: JobInfo;
}

export function generateJob(answers: Record<string, JobTag>): JobResult | null {
  const hasAllAnswers = QUESTIONS.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const counts: Record<JobTag, number> = {
    warrior: 0,
    mage: 0,
    ranger: 0,
    rogue: 0,
    paladin: 0,
    bard: 0,
  };
  for (const q of QUESTIONS) {
    counts[answers[q.id]] += 1;
  }

  const topTag = [...TAG_ORDER].sort((a, b) => counts[b] - counts[a])[0];
  return { tag: topTag, info: JOB_INFO[topTag] };
}

const TAG_CODE: Record<JobTag, string> = {
  warrior: "0",
  mage: "1",
  ranger: "2",
  rogue: "3",
  paladin: "4",
  bard: "5",
};
const CODE_TAG: Record<string, JobTag> = {
  "0": "warrior",
  "1": "mage",
  "2": "ranger",
  "3": "rogue",
  "4": "paladin",
  "5": "bard",
};

export function encodeAnswers(answers: Record<string, JobTag>): string {
  return QUESTIONS.map((q) => (answers[q.id] ? TAG_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(code: string): Record<string, JobTag> | null {
  if (code.length !== QUESTIONS.length) return null;
  const answers: Record<string, JobTag> = {};
  for (let i = 0; i < QUESTIONS.length; i++) {
    const tag = CODE_TAG[code[i]];
    if (!tag) return null;
    answers[QUESTIONS[i].id] = tag;
  }
  return answers;
}
