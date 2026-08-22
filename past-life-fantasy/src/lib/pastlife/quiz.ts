export type Element = "fire" | "water" | "wind" | "earth";

export interface QuizOption {
  label: string;
  element: Element;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: readonly QuizOption[];
}

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: "stress",
    text: "스트레스 받을 때 나는?",
    options: [
      { label: "몸을 움직이며 에너지를 발산한다", element: "fire" },
      { label: "조용히 감정을 정리하는 시간을 갖는다", element: "water" },
      { label: "훌쩍 어디론가 떠나버린다", element: "wind" },
      { label: "익숙한 루틴으로 돌아가 안정을 찾는다", element: "earth" },
    ],
  },
  {
    id: "role",
    text: "친구들 사이에서 나는 주로?",
    options: [
      { label: "분위기를 이끄는 리더 역할", element: "fire" },
      { label: "다들 힘들 때 이야기를 들어주는 역할", element: "water" },
      { label: "새로운 놀거리를 찾아오는 역할", element: "wind" },
      { label: "약속을 잘 지키고 뒷정리를 하는 역할", element: "earth" },
    ],
  },
  {
    id: "travel",
    text: "좋아하는 여행 스타일은?",
    options: [
      { label: "액티비티 가득한 모험 여행", element: "fire" },
      { label: "감성적인 야경과 음악이 있는 여행", element: "water" },
      { label: "계획 없이 즉흥적으로 떠나는 여행", element: "wind" },
      { label: "조용한 자연 속에서 힐링하는 여행", element: "earth" },
    ],
  },
  {
    id: "conflict",
    text: "갈등이 생겼을 때 나는?",
    options: [
      { label: "정면으로 부딪혀서 바로 해결한다", element: "fire" },
      { label: "상대의 마음을 먼저 헤아려본다", element: "water" },
      { label: "일단 거리를 두고 시간을 갖는다", element: "wind" },
      { label: "원칙과 기준을 가지고 차분히 대화한다", element: "earth" },
    ],
  },
  {
    id: "color",
    text: "나를 가장 잘 나타내는 색은?",
    options: [
      { label: "강렬한 레드", element: "fire" },
      { label: "깊은 블루", element: "water" },
      { label: "산뜻한 옐로우", element: "wind" },
      { label: "차분한 그린", element: "earth" },
    ],
  },
  {
    id: "attraction",
    text: "요즘 가장 끌리는 것은?",
    options: [
      { label: "새로운 도전과 목표", element: "fire" },
      { label: "마음이 통하는 깊은 대화", element: "water" },
      { label: "자유로운 일상의 변화", element: "wind" },
      { label: "편안하고 안정적인 루틴", element: "earth" },
    ],
  },
] as const;
