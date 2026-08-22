import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "판타지 직업 적성 테스트",
  description: "질문 6개로 알아보는 판타지 세계관 속 나에게 맞는 직업.",
};

export default function JobLayout({ children }: LayoutProps<"/job">) {
  return children;
}
