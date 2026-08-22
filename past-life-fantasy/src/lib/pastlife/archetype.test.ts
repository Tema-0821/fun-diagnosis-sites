import { describe, expect, it } from "vitest";
import { buildArchetype, decodeAnswers, encodeAnswers, type Tag } from "./archetype";
import { PAST_QUESTIONS, PAST_RARE, PAST_TEMPLATES } from "./pastQuiz";
import { REBIRTH_QUESTIONS, REBIRTH_RARE, REBIRTH_TEMPLATES } from "./rebirthQuiz";
import { mulberry32 } from "./seed";

function answersOf(questions: typeof PAST_QUESTIONS, ...tags: Tag[]): Record<string, Tag> {
  const answers: Record<string, Tag> = {};
  questions.forEach((q, i) => (answers[q.id] = tags[i]));
  return answers;
}

describe("buildArchetype (past)", () => {
  it("모든 질문에 답하지 않으면 null을 반환한다", () => {
    expect(buildArchetype(PAST_QUESTIONS, {}, PAST_TEMPLATES, PAST_RARE)).toBeNull();
  });

  it("같은 답변이면 항상 같은 결과가 나온다", () => {
    const answers = answersOf(
      PAST_QUESTIONS,
      "power",
      "power",
      "power",
      "wisdom",
      "wisdom",
      "cunning",
    );
    const a = buildArchetype(PAST_QUESTIONS, answers, PAST_TEMPLATES, PAST_RARE);
    const b = buildArchetype(PAST_QUESTIONS, answers, PAST_TEMPLATES, PAST_RARE);
    expect(a).toEqual(b);
  });

  it("모든 답이 같은 태그면 희귀 결과(마왕)가 나온다", () => {
    const answers = answersOf(PAST_QUESTIONS, "power", "power", "power", "power", "power", "power");
    const result = buildArchetype(PAST_QUESTIONS, answers, PAST_TEMPLATES, PAST_RARE);
    expect(result?.isRare).toBe(true);
    if (result?.isRare) expect(result.name).toBe("마왕");
  });

  it("주 태그와 부 태그에 따라 직업과 종족이 결정된다", () => {
    const answers = answersOf(
      PAST_QUESTIONS,
      "wisdom",
      "wisdom",
      "wisdom",
      "cunning",
      "cunning",
      "power",
    );
    const result = buildArchetype(PAST_QUESTIONS, answers, PAST_TEMPLATES, PAST_RARE);
    expect(result?.isRare).toBe(false);
    if (!result?.isRare && result) {
      expect(["마법사", "흑마법사", "현자", "예언자"]).toContain(result.classInfo.name);
      expect(["고블린", "하플링", "다크엘프", "수인"]).toContain(result.race.name);
    }
  });

  it("서로 다른 답변 패턴으로 다양한 조합이 나온다(50가지 이상)", () => {
    const names = new Set<string>();
    const tags: Tag[] = ["power", "wisdom", "cunning", "charm"];
    const rng = mulberry32(42);
    for (let seed = 0; seed < 500; seed++) {
      const answers: Record<string, Tag> = {};
      PAST_QUESTIONS.forEach((q) => {
        answers[q.id] = tags[Math.floor(rng() * 4)];
      });
      const result = buildArchetype(PAST_QUESTIONS, answers, PAST_TEMPLATES, PAST_RARE);
      if (result && !result.isRare) names.add(result.name);
    }
    expect(names.size).toBeGreaterThanOrEqual(50);
  });
});

describe("buildArchetype (rebirth)", () => {
  it("환생 결과 설명은 미래형 문장을 사용한다", () => {
    const answers = answersOf(
      REBIRTH_QUESTIONS,
      "charm",
      "charm",
      "charm",
      "power",
      "power",
      "wisdom",
    );
    const result = buildArchetype(REBIRTH_QUESTIONS, answers, REBIRTH_TEMPLATES, REBIRTH_RARE);
    expect(result?.isRare).toBe(false);
    if (!result?.isRare && result) {
      expect(result.description).toContain("환생 후 다음 생에서");
      expect(result.description).not.toContain("이번 생에서는");
    }
  });

  it("모든 답이 같은 태그면 희귀 결과(빛의 용사)가 나온다", () => {
    const answers = answersOf(
      REBIRTH_QUESTIONS,
      "charm",
      "charm",
      "charm",
      "charm",
      "charm",
      "charm",
    );
    const result = buildArchetype(REBIRTH_QUESTIONS, answers, REBIRTH_TEMPLATES, REBIRTH_RARE);
    expect(result?.isRare).toBe(true);
    if (result?.isRare) expect(result.name).toBe("빛의 용사");
  });
});

describe("encodeAnswers / decodeAnswers", () => {
  it("인코딩 후 디코딩하면 원래 답변으로 돌아온다", () => {
    const answers = answersOf(
      PAST_QUESTIONS,
      "power",
      "wisdom",
      "cunning",
      "charm",
      "power",
      "wisdom",
    );
    const encoded = encodeAnswers(PAST_QUESTIONS, answers);
    const decoded = decodeAnswers(PAST_QUESTIONS, encoded);
    expect(decoded).toEqual(answers);
  });

  it("길이가 다른 코드는 null을 반환한다", () => {
    expect(decodeAnswers(PAST_QUESTIONS, "123")).toBeNull();
  });

  it("잘못된 코드가 있으면 null을 반환한다", () => {
    expect(decodeAnswers(PAST_QUESTIONS, "x".repeat(PAST_QUESTIONS.length))).toBeNull();
  });
});
