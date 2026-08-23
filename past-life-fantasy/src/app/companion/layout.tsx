import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 반려 몬스터",
  description: "질문 6개로 알아보는 판타지 세계관 속 나의 반려 몬스터 테스트.",
};

export default function CompanionLayout({ children }: LayoutProps<"/companion">) {
  return children;
}
