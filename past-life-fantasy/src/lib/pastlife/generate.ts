import { ELEMENTS } from "./elements";
import { QUIZ_QUESTIONS, type Element } from "./quiz";

export interface PastLifeResult {
  primaryElement: Element;
  secondaryElement: Element;
  pastLife: { role: string; description: string };
  rebirth: { title: string; description: string };
}

const ELEMENT_ORDER: readonly Element[] = ["fire", "water", "wind", "earth"];

export function scoreElements(answers: Record<string, Element>): Element[] {
  const counts: Record<Element, number> = { fire: 0, water: 0, wind: 0, earth: 0 };
  for (const question of QUIZ_QUESTIONS) {
    const element = answers[question.id];
    if (element) counts[element] += 1;
  }
  return [...ELEMENT_ORDER].sort((a, b) => counts[b] - counts[a]);
}

export function generatePastLife(answers: Record<string, Element>): PastLifeResult | null {
  const hasAllAnswers = QUIZ_QUESTIONS.every((q) => Boolean(answers[q.id]));
  if (!hasAllAnswers) return null;

  const [primaryElement, secondaryElement] = scoreElements(answers);

  return {
    primaryElement,
    secondaryElement,
    pastLife: ELEMENTS[primaryElement].pastLife,
    rebirth: ELEMENTS[secondaryElement].rebirth,
  };
}
