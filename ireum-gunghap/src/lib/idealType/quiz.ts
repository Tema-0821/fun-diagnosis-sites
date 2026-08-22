export type IdealType = "leader" | "artist" | "supporter" | "tsundere" | "healer" | "wildcard";

export interface QuizOption {
  label: string;
  type: IdealType;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "attracted",
    text: "나에게 가장 매력적으로 느껴지는 모습은?",
    options: [
      { label: "무리를 이끄는 든든한 리더십", type: "leader" },
      { label: "자기만의 세계가 뚜렷한 감성", type: "artist" },
      { label: "묵묵히 곁을 챙겨주는 배려", type: "supporter" },
      { label: "겉과 속이 다른 반전 매력", type: "tsundere" },
    ],
  },
  {
    id: "date",
    text: "함께 있을 때 가장 편안한 상대는?",
    options: [
      { label: "무슨 일이든 든든하게 해결해주는 사람", type: "leader" },
      { label: "말하지 않아도 마음을 알아주는 사람", type: "healer" },
      { label: "챙겨주는 걸 좋아하는 다정한 사람", type: "supporter" },
      { label: "예측 안 되는 재미를 주는 사람", type: "wildcard" },
    ],
  },
  {
    id: "conflict",
    text: "갈등이 생겼을 때 끌리는 대처 방식은?",
    options: [
      { label: "정면으로 부딪혀 확실히 풀어주는 사람", type: "leader" },
      { label: "차분히 내 이야기를 들어주는 사람", type: "healer" },
      { label: "츤데레처럼 티는 안 내지만 먼저 다가오는 사람", type: "tsundere" },
      { label: "예상 못한 방식으로 화해를 시도하는 사람", type: "wildcard" },
    ],
  },
  {
    id: "charm",
    text: "이상형의 첫인상은 어떤 느낌이길 바라나요?",
    options: [
      { label: "카리스마 있고 자신감 넘치는 인상", type: "leader" },
      { label: "독특하고 감각적인 분위기", type: "artist" },
      { label: "편안하고 따뜻한 인상", type: "supporter" },
      { label: "종잡을 수 없는 신비로운 인상", type: "wildcard" },
    ],
  },
  {
    id: "value",
    text: "연인에게 가장 바라는 것은?",
    options: [
      { label: "확실한 방향성과 든든함", type: "leader" },
      { label: "함께 성장하는 감성적 교감", type: "artist" },
      { label: "지친 나를 다독여주는 위로", type: "healer" },
      { label: "예상치 못한 설렘과 재미", type: "wildcard" },
    ],
  },
  {
    id: "weekend",
    text: "이상형과 함께 보내고 싶은 주말은?",
    options: [
      { label: "새로운 활동을 계획하고 이끌어주는 주말", type: "leader" },
      { label: "전시회나 공연 같은 감성적인 데이트", type: "artist" },
      { label: "집에서 편안하게 서로를 챙기는 시간", type: "supporter" },
      { label: "즉흥적으로 어디든 떠나는 주말", type: "wildcard" },
    ],
  },
] as const;
