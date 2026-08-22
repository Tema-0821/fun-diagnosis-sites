export interface StressBand {
  min: number;
  title: string;
  description: string;
  advice: string;
}

export const STRESS_BANDS: readonly StressBand[] = [
  {
    min: 81,
    title: "🚨 당장 휴식이 필요한 상태",
    description: "지금 몸과 마음이 보내는 경고 신호를 무시하고 있는 건 아닌지 걱정될 정도예요.",
    advice: "혼자 버티지 말고, 짧은 휴가나 상담을 진지하게 고려해보세요.",
  },
  {
    min: 61,
    title: "🔥 번아웃 직전 상태",
    description: "겉으로는 버티고 있지만, 속에서는 이미 경고음이 울리고 있는 단계예요.",
    advice: "이번 주말만큼은 업무 알림을 꺼두고 온전히 쉬어보는 걸 추천해요.",
  },
  {
    min: 41,
    title: "⚠️ 위험 신호가 켜진 상태",
    description: "평소보다 스트레스가 쌓여있는 편이라, 작은 일에도 예민해지기 쉬운 시기예요.",
    advice: "퇴근 후에는 업무 생각을 의식적으로 끊어내는 루틴을 만들어보세요.",
  },
  {
    min: 21,
    title: "🙂 적당히 균형 잡힌 상태",
    description: "스트레스가 아예 없진 않지만, 대체로 잘 관리하고 있는 편이에요.",
    advice: "지금의 페이스를 유지하되, 가끔은 스스로에게 작은 보상을 주세요.",
  },
  {
    min: 0,
    title: "😌 무념무상 프리한 상태",
    description: "직장 스트레스에서 꽤 자유로운, 부러움을 살 만한 상태예요.",
    advice: "이 평온함의 비결을 동료들에게도 나눠주면 좋겠어요.",
  },
];

export function getStressBand(scorePercent: number): StressBand {
  return STRESS_BANDS.find((band) => scorePercent >= band.min) ?? STRESS_BANDS[STRESS_BANDS.length - 1];
}
