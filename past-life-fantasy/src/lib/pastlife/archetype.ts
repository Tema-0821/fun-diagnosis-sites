import { djb2Hash, mulberry32 } from "./seed";
import { CLASS_BY_TAG, RACE_BY_TAG, type ClassInfo, type RaceInfo } from "./pools";

export type Tag = "power" | "wisdom" | "cunning" | "charm";

export interface QuizOption {
  label: string;
  tag: Tag;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

const TAG_ORDER: readonly Tag[] = ["power", "wisdom", "cunning", "charm"];

// 템플릿 12개(직업 태그 x 종족 태그, 같은 태그 조합은 제외) — {race}/{class} 자리에 실제 이름이 들어간다.
export type DescriptionTemplates = Record<Tag, Partial<Record<Tag, string>>>;

export interface CombinedArchetype {
  name: string; // "엘프 마법사" 형태
  race: RaceInfo;
  classInfo: ClassInfo;
  description: string;
}

function fillTemplate(template: string, race: string, className: string): string {
  return template.replaceAll("{race}", race).replaceAll("{class}", className);
}

function scoreTags(questions: readonly QuizQuestion[], answers: Record<string, Tag>): Record<Tag, number> {
  const counts: Record<Tag, number> = { power: 0, wisdom: 0, cunning: 0, charm: 0 };
  for (const question of questions) {
    const tag = answers[question.id];
    if (tag) counts[tag] += 1;
  }
  return counts;
}

export function buildArchetype(
  questions: readonly QuizQuestion[],
  answers: Record<string, Tag>,
  templates: DescriptionTemplates,
): CombinedArchetype | null {
  const hasAllAnswers = questions.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const counts = scoreTags(questions, answers);
  const ranked = [...TAG_ORDER].sort((a, b) => counts[b] - counts[a]);
  const classTag = ranked[0];
  // 1순위와 2순위가 동점으로 같은 태그일 수는 없으니, 2순위가 없다면(전부 한 태그로 몰린 경우)
  // 정렬상 바로 다음 태그를 종족 결정에 사용한다.
  const raceTag = ranked[1];

  const seedInput = questions.map((q) => `${q.id}:${answers[q.id]}`).join("|");
  const rng = mulberry32(djb2Hash(seedInput));
  const classPool = CLASS_BY_TAG[classTag];
  const racePool = RACE_BY_TAG[raceTag];
  const classInfo = classPool[Math.floor(rng() * classPool.length)];
  const race = racePool[Math.floor(rng() * racePool.length)];

  const template = templates[classTag][raceTag] ?? "{race} 혈통의 {class}였습니다.";

  return {
    name: `${race.name} ${classInfo.name}`,
    race,
    classInfo,
    description: fillTemplate(template, race.name, classInfo.name),
  };
}

// 답변을 질문 순서대로 이어붙인 코드(예: "0123010")로 인코딩해서 URL에 담는다.
const TAG_CODE: Record<Tag, string> = { power: "0", wisdom: "1", cunning: "2", charm: "3" };
const CODE_TAG: Record<string, Tag> = { "0": "power", "1": "wisdom", "2": "cunning", "3": "charm" };

export function encodeAnswers(
  questions: readonly QuizQuestion[],
  answers: Record<string, Tag>,
): string {
  return questions.map((q) => (answers[q.id] ? TAG_CODE[answers[q.id]] : "")).join("");
}

export function decodeAnswers(
  questions: readonly QuizQuestion[],
  code: string,
): Record<string, Tag> | null {
  if (code.length !== questions.length) return null;
  const answers: Record<string, Tag> = {};
  for (let i = 0; i < questions.length; i++) {
    const tag = CODE_TAG[code[i]];
    if (!tag) return null;
    answers[questions[i].id] = tag;
  }
  return answers;
}
