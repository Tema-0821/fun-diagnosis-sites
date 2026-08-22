export interface MoodInfo {
  emoji: string;
  name: string;
  comment: string;
}

export const MOOD_POOL: readonly MoodInfo[] = [
  { emoji: "😎", name: "여유만만 모드", comment: "오늘은 뭘 해도 자신감이 붙는 날이에요." },
  { emoji: "🥱", name: "나른한 모드", comment: "무리하지 말고 페이스 조절하며 보내세요." },
  { emoji: "🤩", name: "텐션 최고 모드", comment: "평소보다 에너지가 넘치는 하루예요." },
  { emoji: "🥰", name: "말랑말랑 모드", comment: "사소한 것에도 기분이 좋아지는 날이에요." },
  { emoji: "🧐", name: "집중력 폭발 모드", comment: "미뤄둔 일을 처리하기 딱 좋은 하루예요." },
  { emoji: "😤", name: "승부욕 뿜뿜 모드", comment: "오늘은 뭐든 이기고 싶은 기분이 드는 날이에요." },
  { emoji: "🥲", name: "센치한 모드", comment: "괜히 옛 생각이 나는 날, 감성 충전 해보세요." },
  { emoji: "😆", name: "장난기 폭발 모드", comment: "농담 한마디에도 크게 웃게 되는 날이에요." },
  { emoji: "🤔", name: "고민 많은 모드", comment: "결정을 서두르지 말고 천천히 생각해보세요." },
  { emoji: "😌", name: "평온한 모드", comment: "특별한 일 없이도 마음이 편안한 하루예요." },
  { emoji: "🔥", name: "열정 폭발 모드", comment: "새로운 도전을 시작하기 좋은 기운이에요." },
  { emoji: "🥹", name: "감동 잘 받는 모드", comment: "작은 친절에도 마음이 뭉클해질 수 있어요." },
  { emoji: "😴", name: "충전 필요 모드", comment: "오늘만큼은 푹 쉬는 걸 우선순위로 두세요." },
  { emoji: "🤗", name: "다정 모드", comment: "주변 사람을 챙기고 싶어지는 따뜻한 날이에요." },
  { emoji: "🙃", name: "예측불가 모드", comment: "평소와 다른 선택을 해도 재미있을 하루예요." },
];
