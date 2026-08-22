import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이름궁합 - 이름으로 보는 궁합",
  description: "이름 두 개만 입력하면 재미있는 궁합 진단 결과를 바로 확인할 수 있어요. 회원가입 없이 무료.",
};

export default function NameLayout({ children }: LayoutProps<"/name">) {
  return (
    <div className="bg-love-pattern flex flex-1 flex-col bg-gradient-to-b from-rose-100 via-pink-50 to-violet-100">
      {children}
    </div>
  );
}
