export interface StressOption {
  label: string;
  score: number; // 0~3
}

export interface StressQuestion {
  id: string;
  text: string;
  options: readonly StressOption[];
}

const SCALE: readonly StressOption[] = [
  { label: "전혀 아니다", score: 0 },
  { label: "가끔 그렇다", score: 1 },
  { label: "자주 그렇다", score: 2 },
  { label: "매우 그렇다", score: 3 },
];

export const QUESTIONS: readonly StressQuestion[] = [
  { id: "alarm", text: "알람 소리만 들어도 한숨부터 나온다.", options: SCALE },
  { id: "notification", text: "퇴근 후에도 업무 메시지 알림이 오면 심장이 철렁한다.", options: SCALE },
  { id: "monday", text: "월요일 아침이 세상에서 제일 싫다.", options: SCALE },
  { id: "coworker", text: "동료나 상사 얼굴이 떠오르면 스트레스가 확 올라온다.", options: SCALE },
  { id: "quit", text: "퇴사하고 싶다는 생각이 하루에도 여러 번 든다.", options: SCALE },
  { id: "weekend", text: "주말에도 회사 걱정에 마음이 편치 않다.", options: SCALE },
  { id: "coffee", text: "커피 없이는 출근 자체가 불가능하다.", options: SCALE },
] as const;

export const MAX_SCORE = QUESTIONS.length * 3;
