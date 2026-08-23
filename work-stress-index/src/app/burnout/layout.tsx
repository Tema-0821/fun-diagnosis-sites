import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 번아웃 상태는?",
  description: "질문 7개로 지금 나의 번아웃 정도를 재미로 확인해봐요.",
};

export default function BurnoutLayout({ children }: LayoutProps<"/burnout">) {
  return children;
}
