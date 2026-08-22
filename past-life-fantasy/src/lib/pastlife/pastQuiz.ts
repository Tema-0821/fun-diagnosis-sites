import type { DescriptionTemplates, QuizQuestion } from "./archetype";

export const PAST_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "crisis",
    text: "위기 상황에서 나라면?",
    options: [
      { label: "정면으로 돌파한다", tag: "power" },
      { label: "상황을 분석하고 대책을 세운다", tag: "wisdom" },
      { label: "은밀하게 빠져나갈 길을 찾는다", tag: "cunning" },
      { label: "동료를 먼저 챙긴다", tag: "charm" },
    ],
  },
  {
    id: "weapon",
    text: "가장 끌리는 무기는?",
    options: [
      { label: "거대한 검이나 도끼", tag: "power" },
      { label: "마법 지팡이", tag: "wisdom" },
      { label: "날렵한 단검", tag: "cunning" },
      { label: "치유의 지팡이", tag: "charm" },
    ],
  },
  {
    id: "role",
    text: "동료들 사이에서 나는?",
    options: [
      { label: "선봉에 서는 자", tag: "power" },
      { label: "전략을 짜는 자", tag: "wisdom" },
      { label: "몰래 정보를 모으는 자", tag: "cunning" },
      { label: "다들 다독여주는 자", tag: "charm" },
    ],
  },
  {
    id: "fear",
    text: "가장 두려운 것은?",
    options: [
      { label: "내가 약해지는 것", tag: "power" },
      { label: "무지한 채로 남는 것", tag: "wisdom" },
      { label: "무언가에 속박당하는 것", tag: "cunning" },
      { label: "혼자 남겨지는 것", tag: "charm" },
    ],
  },
  {
    id: "place",
    text: "가장 자주 머물렀을 것 같은 장소는?",
    options: [
      { label: "치열한 전쟁터", tag: "power" },
      { label: "고대 마법 서고", tag: "wisdom" },
      { label: "그림자 진 뒷골목", tag: "cunning" },
      { label: "사람들이 모이는 마을 광장", tag: "charm" },
    ],
  },
  {
    id: "trust",
    text: "동료를 얻는 나만의 방식은?",
    options: [
      { label: "함께 싸워서 신뢰를 얻는다", tag: "power" },
      { label: "지혜로운 조언으로 인정받는다", tag: "wisdom" },
      { label: "필요할 때 슬쩍 도와준다", tag: "cunning" },
      { label: "먼저 마음을 열고 다가간다", tag: "charm" },
    ],
  },
  {
    id: "aftermath",
    text: "전투가 끝난 뒤 나는?",
    options: [
      { label: "곧바로 다음 전투를 준비한다", tag: "power" },
      { label: "오늘의 전투를 복기하며 배운다", tag: "wisdom" },
      { label: "전리품이나 정보를 챙긴다", tag: "cunning" },
      { label: "다친 동료를 먼저 살핀다", tag: "charm" },
    ],
  },
  {
    id: "stranger",
    text: "낯선 이를 처음 만났을 때 나는?",
    options: [
      { label: "실력으로 기선을 제압한다", tag: "power" },
      { label: "말없이 관찰하며 판단을 유보한다", tag: "wisdom" },
      { label: "속내를 슬쩍 떠본다", tag: "cunning" },
      { label: "먼저 웃으며 다가간다", tag: "charm" },
    ],
  },
] as const;

// 12개 = 직업 태그(1순위) x 종족 태그(2순위) 조합, 같은 태그끼리는 제외.
export const PAST_TEMPLATES: DescriptionTemplates = {
  power: {
    wisdom:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 순수한 힘과 냉철한 판단력을 함께 지녔던, 보기 드문 존재였죠. 전장에서도 늘 한 수 앞을 내다보며 검을 휘둘렀습니다.",
    cunning:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 무력과 재빠른 감각을 동시에 갖춘 예측하기 어려운 전사였죠. 정면승부 속에서도 늘 빈틈을 놓치지 않았습니다.",
    charm:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 강인함과 따뜻한 카리스마를 함께 지녀 많은 이들이 따랐던 존재였죠. 힘으로 지키고, 마음으로 이끌었습니다.",
  },
  wisdom: {
    power:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 깊은 지식과 단단한 체력을 함께 지녀, 서재에서도 전장에서도 밀리지 않는 존재였죠.",
    cunning:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 영리한 지혜와 은밀한 감각을 동시에 지녀, 아무도 눈치채지 못하게 지식을 모으던 존재였죠.",
    charm:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 깊은 통찰과 따뜻한 마음을 함께 지녀, 지식을 나누는 것만으로도 사람들의 신뢰를 얻던 존재였죠.",
  },
  cunning: {
    power:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 날카로운 감각과 강인한 체력을 함께 지녀, 은밀하면서도 두려움 없이 움직이던 존재였죠.",
    wisdom:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 영리함과 지혜를 함께 지녀, 늘 계획적으로 움직이며 실수를 남기지 않던 존재였죠.",
    charm:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 은밀함과 사람을 끄는 매력을 동시에 지녀, 누구에게나 자연스럽게 다가가 원하는 걸 얻어내던 존재였죠.",
  },
  charm: {
    power:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 따뜻한 마음과 단단한 체력을 함께 지녀, 몸으로 부딪히며 사람들을 지키던 존재였죠.",
    wisdom:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 따뜻함과 지혜를 함께 지녀, 사람들의 마음을 헤아리면서도 현명한 조언을 아끼지 않던 존재였죠.",
    cunning:
      "당신의 전생은 {race} 혈통의 {class}였습니다. 친화력과 재빠른 감각을 함께 지녀, 누구와도 쉽게 가까워지면서도 상황 판단이 빨랐던 존재였죠.",
  },
};
