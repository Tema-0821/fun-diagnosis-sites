export type LoveType = "direct" | "pushpull" | "tsundere" | "devoted" | "free" | "cautious";

export interface QuizOption {
  label: string;
  type: LoveType;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "confess",
    text: "마음에 드는 사람이 생기면 나는?",
    options: [
      { label: "바로 마음을 표현한다", type: "direct" },
      { label: "관심 있는 척 안 하며 은근히 다가간다", type: "pushpull" },
      { label: "괜히 무심한 척, 퉁명스럽게 대한다", type: "tsundere" },
      { label: "천천히 곁을 지키며 신뢰부터 쌓는다", type: "devoted" },
    ],
  },
  {
    id: "date",
    text: "이상적인 데이트는?",
    options: [
      { label: "계획 없이 즉흥적으로 떠나는 여행", type: "free" },
      { label: "밀고 당기는 재미가 있는 만남", type: "pushpull" },
      { label: "편안하게 오래 이야기 나누는 시간", type: "devoted" },
      { label: "천천히 서로를 알아가는 조용한 시간", type: "cautious" },
    ],
  },
  {
    id: "conflict",
    text: "연인과 다투면 나는?",
    options: [
      { label: "바로 대화로 풀어야 직성이 풀린다", type: "direct" },
      { label: "먼저 다가가기 민망해서 시간을 끈다", type: "tsundere" },
      { label: "상대가 진정할 때까지 묵묵히 기다린다", type: "devoted" },
      { label: "혼자만의 시간을 가지며 정리한다", type: "free" },
    ],
  },
  {
    id: "express",
    text: "좋아하는 마음을 표현하는 방식은?",
    options: [
      { label: "말로 확실하게 전한다", type: "direct" },
      { label: "장난치듯 놀리면서 표현한다", type: "tsundere" },
      { label: "작은 행동과 배려로 보여준다", type: "devoted" },
      { label: "적당한 거리를 두며 신중하게 접근한다", type: "cautious" },
    ],
  },
  {
    id: "jealous",
    text: "연인이 다른 사람과 친하게 지내면?",
    options: [
      { label: "솔직하게 서운하다고 말한다", type: "direct" },
      { label: "괜히 삐진 티를 내며 은근히 신경 쓴다", type: "tsundere" },
      { label: "믿고 넘어가되 마음 한켠은 신경 쓰인다", type: "devoted" },
      { label: "크게 개의치 않고 각자의 시간을 존중한다", type: "free" },
    ],
  },
  {
    id: "future",
    text: "연애에서 가장 중요하게 생각하는 것은?",
    options: [
      { label: "솔직하고 분명한 소통", type: "direct" },
      { label: "설렘이 유지되는 긴장감", type: "pushpull" },
      { label: "변하지 않는 신뢰와 안정감", type: "devoted" },
      { label: "서로의 속도를 존중하는 여유", type: "cautious" },
    ],
  },
] as const;
