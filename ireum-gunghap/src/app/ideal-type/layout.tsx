import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 이상형 매치",
  description: "질문 6개로 알아보는 나에게 잘 맞는 이상형 유형.",
};

export default function IdealTypeLayout({ children }: LayoutProps<"/ideal-type">) {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-violet-50 via-white to-indigo-50">
      {children}
    </div>
  );
}
