import type { DescriptionTemplates, QuizQuestion } from "./archetype";

export const REBIRTH_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "wish",
    text: "환생한다면 어떤 삶을 살고 싶나요?",
    options: [
      { label: "강한 힘으로 세상을 바꾸는 삶", tag: "power" },
      { label: "끝없이 지식을 탐구하는 삶", tag: "wisdom" },
      { label: "얽매이지 않고 자유롭게 떠도는 삶", tag: "cunning" },
      { label: "사람들을 돕고 함께하는 삶", tag: "charm" },
    ],
  },
  {
    id: "ability",
    text: "다음 생에서 가장 갖고 싶은 능력은?",
    options: [
      { label: "압도적인 완력", tag: "power" },
      { label: "금단의 마법", tag: "wisdom" },
      { label: "누구에게도 들키지 않는 은신술", tag: "cunning" },
      { label: "사람의 마음을 얻는 매력", tag: "charm" },
    ],
  },
  {
    id: "day",
    text: "환생 후의 이상적인 하루는?",
    options: [
      { label: "몸을 단련하는 하루", tag: "power" },
      { label: "새로운 걸 배우는 하루", tag: "wisdom" },
      { label: "낯선 곳을 탐험하는 하루", tag: "cunning" },
      { label: "좋아하는 사람들과 보내는 하루", tag: "charm" },
    ],
  },
  {
    id: "respect",
    text: "다음 생에서 존경받고 싶은 모습은?",
    options: [
      { label: "압도적인 무력을 가진 자", tag: "power" },
      { label: "깊은 통찰을 가진 자", tag: "wisdom" },
      { label: "누구보다 자유로운 자", tag: "cunning" },
      { label: "많은 이의 신뢰를 받는 자", tag: "charm" },
    ],
  },
  {
    id: "regret",
    text: "다음 생에서 후회하고 싶지 않은 것은?",
    options: [
      { label: "도전하지 않는 것", tag: "power" },
      { label: "배우지 않는 것", tag: "wisdom" },
      { label: "무언가에 얽매이는 것", tag: "cunning" },
      { label: "마음을 나누지 못하는 것", tag: "charm" },
    ],
  },
  {
    id: "word",
    text: "다음 생의 나를 표현하는 한 단어는?",
    options: [
      { label: "패기", tag: "power" },
      { label: "통찰", tag: "wisdom" },
      { label: "자유", tag: "cunning" },
      { label: "온기", tag: "charm" },
    ],
  },
  {
    id: "moment",
    text: "다음 생에서 가장 원하는 순간은?",
    options: [
      { label: "모두가 인정하는 승리의 순간", tag: "power" },
      { label: "오랜 의문이 풀리는 순간", tag: "wisdom" },
      { label: "아무도 모르게 목표를 이루는 순간", tag: "cunning" },
      { label: "누군가와 마음이 통하는 순간", tag: "charm" },
    ],
  },
  {
    id: "avoid",
    text: "다음 생에서 가장 피하고 싶은 상황은?",
    options: [
      { label: "무력하게 밀리는 상황", tag: "power" },
      { label: "얕은 지식으로 판단하는 상황", tag: "wisdom" },
      { label: "누군가에게 얽매이는 상황", tag: "cunning" },
      { label: "혼자 소외되는 상황", tag: "charm" },
    ],
  },
] as const;

// 12개 = 직업 태그(1순위) x 종족 태그(2순위) 조합. "환생 후 다음 생에서는" 미래형 문장.
export const REBIRTH_TEMPLATES: DescriptionTemplates = {
  power: {
    wisdom:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 압도적인 힘과 냉철한 판단력을 함께 갖춰, 전장에서도 늘 한 수 앞을 내다보게 될 거예요.",
    cunning:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 강한 힘과 재빠른 감각을 동시에 갖춰, 누구도 예측하지 못할 전사로 자라날 거예요.",
    charm:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 강인함과 따뜻한 카리스마를 함께 갖춰, 많은 이들이 자연스레 곁에 모이게 될 거예요.",
  },
  wisdom: {
    power:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 깊은 지식과 단단한 체력을 함께 갖춰, 서재에서도 전장에서도 밀리지 않을 거예요.",
    cunning:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 영리한 지혜와 은밀한 감각을 동시에 갖춰, 아무도 모르게 금단의 지식을 쌓아갈 거예요.",
    charm:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 깊은 통찰과 따뜻한 마음을 함께 갖춰, 지식을 나누는 것만으로도 신뢰를 얻게 될 거예요.",
  },
  cunning: {
    power:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 날카로운 감각과 강인한 체력을 함께 갖춰, 은밀하면서도 두려움 없이 움직이게 될 거예요.",
    wisdom:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 영리함과 지혜를 함께 갖춰, 늘 계획적으로 움직이며 실수 없는 삶을 살게 될 거예요.",
    charm:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 은밀함과 사람을 끄는 매력을 동시에 갖춰, 누구에게나 자연스레 다가가게 될 거예요.",
  },
  charm: {
    power:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 따뜻한 마음과 단단한 체력을 함께 갖춰, 몸으로 부딪히며 사람들을 지키게 될 거예요.",
    wisdom:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 따뜻함과 지혜를 함께 갖춰, 사람들의 마음을 헤아리는 현명한 존재가 될 거예요.",
    cunning:
      "환생 후 다음 생에서 당신은 {race} 혈통의 {class}로 태어날 운명이에요. 친화력과 재빠른 감각을 함께 갖춰, 누구와도 쉽게 가까워지는 존재가 될 거예요.",
  },
};
