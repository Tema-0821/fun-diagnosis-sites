import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 리더십 스타일",
  description: "질문 6개로 알아보는 나의 리더십 스타일 유형 진단.",
};

export default function LeadershipLayout({ children }: LayoutProps<"/leadership">) {
  return children;
}
