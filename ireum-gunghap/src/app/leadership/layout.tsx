import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 리더십 스타일",
  description: "질문 6개로 알아보는 나의 리더십 스타일 유형 테스트.",
};

export default function LeadershipLayout({ children }: LayoutProps<"/leadership">) {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-sky-50 via-white to-blue-50">
      {children}
    </div>
  );
}
