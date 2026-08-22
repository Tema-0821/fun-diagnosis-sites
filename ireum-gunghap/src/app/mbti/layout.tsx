import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBTI 궁합 - MBTI로 보는 궁합",
  description: "MBTI 유형 두 개만 고르면 재미있는 궁합 진단 결과를 바로 확인할 수 있어요. 회원가입 없이 무료.",
};

export default function MbtiLayout({ children }: LayoutProps<"/mbti">) {
  return <div className="flex flex-1 flex-col bg-zinc-50">{children}</div>;
}
