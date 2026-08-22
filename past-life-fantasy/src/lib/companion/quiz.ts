export type CompanionTag = "power" | "wisdom" | "cunning" | "charm";

export interface QuizOption {
  label: string;
  tag: CompanionTag;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "adventure",
    text: "모험을 떠날 때 곁에 있었으면 하는 존재는?",
    options: [
      { label: "위험할 때 앞장서 싸워주는 존재", tag: "power" },
      { label: "길을 안내하고 조언해주는 존재", tag: "wisdom" },
      { label: "몰래 정찰하고 정보를 물어다 주는 존재", tag: "cunning" },
      { label: "지쳤을 때 곁에서 위로해주는 존재", tag: "charm" },
    ],
  },
  {
    id: "personality",
    text: "함께할 동료의 성격은 어땠으면 좋겠나요?",
    options: [
      { label: "용맹하고 씩씩한 성격", tag: "power" },
      { label: "차분하고 신비로운 성격", tag: "wisdom" },
      { label: "장난기 많고 재빠른 성격", tag: "cunning" },
      { label: "다정하고 사랑스러운 성격", tag: "charm" },
    ],
  },
  {
    id: "size",
    text: "어떤 크기의 동료가 끌리나요?",
    options: [
      { label: "크고 든든한 존재", tag: "power" },
      { label: "우아하고 신비로운 존재", tag: "wisdom" },
      { label: "작고 재빠른 존재", tag: "cunning" },
      { label: "작고 귀여운 존재", tag: "charm" },
    ],
  },
  {
    id: "moment",
    text: "가장 의지하고 싶은 순간은?",
    options: [
      { label: "적과 맞서야 할 때", tag: "power" },
      { label: "어려운 결정을 내려야 할 때", tag: "wisdom" },
      { label: "몰래 빠져나가야 할 때", tag: "cunning" },
      { label: "마음이 지쳤을 때", tag: "charm" },
    ],
  },
  {
    id: "element",
    text: "가장 끌리는 기운은?",
    options: [
      { label: "타오르는 불꽃의 기운", tag: "power" },
      { label: "고요한 밤하늘의 기운", tag: "wisdom" },
      { label: "스치는 그림자의 기운", tag: "cunning" },
      { label: "따뜻한 빛의 기운", tag: "charm" },
    ],
  },
  {
    id: "bond",
    text: "동료와의 관계에서 가장 중요한 것은?",
    options: [
      { label: "함께 싸워 이기는 성취감", tag: "power" },
      { label: "서로를 이해하는 깊은 교감", tag: "wisdom" },
      { label: "눈빛만으로 통하는 합", tag: "cunning" },
      { label: "언제나 곁에 있어주는 믿음", tag: "charm" },
    ],
  },
] as const;
