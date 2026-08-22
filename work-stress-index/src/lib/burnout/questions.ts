export interface BurnoutOption {
  label: string;
  score: number; // 0~3
}

export interface BurnoutQuestion {
  id: string;
  text: string;
  options: readonly BurnoutOption[];
}

const SCALE: readonly BurnoutOption[] = [
  { label: "전혀 아니다", score: 0 },
  { label: "가끔 그렇다", score: 1 },
  { label: "자주 그렇다", score: 2 },
  { label: "매우 그렇다", score: 3 },
];

export const QUESTIONS: readonly BurnoutQuestion[] = [
  { id: "energy", text: "아침에 눈을 떠도 몸이 전혀 회복된 느낌이 안 든다.", options: SCALE },
  { id: "cynical", text: "예전엔 열심히 하던 일에 이제는 시큰둥해졌다.", options: SCALE },
  { id: "efficacy", text: "내가 하는 일이 별 의미가 없다는 생각이 자주 든다.", options: SCALE },
  { id: "focus", text: "일할 때 예전만큼 집중이 잘 안 된다.", options: SCALE },
  { id: "irritable", text: "사소한 일에도 쉽게 짜증이 난다.", options: SCALE },
  { id: "isolate", text: "동료나 친구와 이야기하는 것조차 피곤하게 느껴진다.", options: SCALE },
  { id: "detach", text: "출근길에 '오늘 하루도 그냥 버텨야지'라는 생각이 든다.", options: SCALE },
] as const;

export const MAX_SCORE = QUESTIONS.length * 3;
