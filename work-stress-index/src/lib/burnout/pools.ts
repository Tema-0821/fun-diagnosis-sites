export interface BurnoutBand {
  min: number;
  title: string;
  description: string;
  advice: string;
}

export const BURNOUT_BANDS: readonly BurnoutBand[] = [
  {
    min: 81,
    title: "🕯️ 완전히 소진된 상태",
    description: "마음의 연료가 거의 바닥난 상태예요. 지금의 무기력함은 의지 문제가 아니라 번아웃의 신호예요.",
    advice: "혼자 견디려 하지 말고, 며칠이라도 일과 완전히 거리를 두는 시간을 꼭 만들어보세요.",
  },
  {
    min: 61,
    title: "🔋 배터리가 얼마 남지 않은 상태",
    description: "겉으로는 평소처럼 지내고 있지만, 속에서는 이미 방전 경고등이 켜진 단계예요.",
    advice: "퇴근 후 한 시간만이라도 아무 생각 없이 쉬는 나만의 루틴을 만들어보세요.",
  },
  {
    min: 41,
    title: "🌗 조금씩 지쳐가는 상태",
    description: "아직 버틸 만하지만, 예전만큼의 에너지는 아니라는 걸 스스로도 느끼고 있을 거예요.",
    advice: "일과 나 사이에 작은 경계선을 하나씩 그어보는 걸 추천해요.",
  },
  {
    min: 21,
    title: "🌤️ 대체로 괜찮은 상태",
    description: "가끔 지치는 날은 있어도, 전반적으로는 스스로를 잘 돌보고 있는 편이에요.",
    advice: "지금처럼 컨디션을 관리하면서, 가끔은 스스로에게 작은 휴식을 선물해보세요.",
  },
  {
    min: 0,
    title: "🌱 에너지가 가득한 상태",
    description: "번아웃과는 거리가 먼, 꽤 충전이 잘 되어 있는 상태예요.",
    advice: "지금의 컨디션을 유지할 수 있는 나만의 방법을 잘 기억해두세요.",
  },
];

export function getBurnoutBand(scorePercent: number): BurnoutBand {
  return (
    BURNOUT_BANDS.find((band) => scorePercent >= band.min) ?? BURNOUT_BANDS[BURNOUT_BANDS.length - 1]
  );
}
