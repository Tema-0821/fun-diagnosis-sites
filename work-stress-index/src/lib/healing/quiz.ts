export type HealingTag = "nature" | "hobby" | "rest" | "social" | "active" | "solo";

export interface QuizOption {
  label: string;
  tag: HealingTag;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "weekend",
    text: "스트레스가 싹 풀리는 완벽한 주말은?",
    options: [
      { label: "숲이나 바다처럼 자연 속을 걷는 하루", tag: "nature" },
      { label: "좋아하는 취미에 푹 빠지는 하루", tag: "hobby" },
      { label: "아무것도 안 하고 늘어지게 쉬는 하루", tag: "rest" },
      { label: "친구들과 신나게 어울리는 하루", tag: "social" },
    ],
  },
  {
    id: "after_work",
    text: "퇴근하고 집에 오면 가장 먼저 하고 싶은 건?",
    options: [
      { label: "창문 열고 바람 쐬며 멍때리기", tag: "nature" },
      { label: "운동복으로 갈아입고 땀 흘리기", tag: "active" },
      { label: "이불 속에 들어가 눕기", tag: "rest" },
      { label: "혼자 좋아하는 걸 하며 조용히 시간 보내기", tag: "solo" },
    ],
  },
  {
    id: "tired_moment",
    text: "정말 지쳤을 때 나에게 필요한 건?",
    options: [
      { label: "탁 트인 곳에서 걷는 시간", tag: "nature" },
      { label: "뭔가에 몰두해서 잡생각을 잊는 것", tag: "hobby" },
      { label: "아무 생각 없이 푹 자는 것", tag: "rest" },
      { label: "누군가와 수다 떨며 털어놓는 것", tag: "social" },
    ],
  },
  {
    id: "energy_source",
    text: "나에게 에너지를 채워주는 활동은?",
    options: [
      { label: "땀 흘리며 몸을 움직이는 것", tag: "active" },
      { label: "좋아하는 취미에 시간을 쏟는 것", tag: "hobby" },
      { label: "혼자만의 조용한 시간", tag: "solo" },
      { label: "사람들과 함께 웃고 떠드는 것", tag: "social" },
    ],
  },
  {
    id: "vacation",
    text: "휴가를 간다면 가장 끌리는 곳은?",
    options: [
      { label: "초록이 우거진 숲이나 한적한 바다", tag: "nature" },
      { label: "액티비티 넘치는 여행지", tag: "active" },
      { label: "아무도 모르는 조용한 숙소", tag: "solo" },
      { label: "사람 많고 활기찬 축제 현장", tag: "social" },
    ],
  },
  {
    id: "ideal_healing",
    text: "생각만 해도 편안해지는 힐링 방법은?",
    options: [
      { label: "자연광 아래서 산책하기", tag: "nature" },
      { label: "좋아하는 취미에 시간 가는 줄 모르고 빠지기", tag: "hobby" },
      { label: "하루 종일 늘어지게 쉬기", tag: "rest" },
      { label: "혼자 카페에서 책 읽거나 생각 정리하기", tag: "solo" },
    ],
  },
] as const;
