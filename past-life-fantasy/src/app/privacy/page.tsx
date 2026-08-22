import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "전생 환생 진단의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-md flex-1 px-6 py-12 text-sm leading-relaxed text-zinc-300">
      <h1 className="text-gold text-xl font-bold">개인정보처리방침</h1>
      <p className="mt-4">
        전생 환생 진단은 회원가입이나 로그인 없이 이용할 수 있으며, 입력하는 답변은 서버로 전송되지
        않고 브라우저 안에서만 계산에 사용됩니다. 별도로 저장되거나 수집되지 않습니다.
      </p>
      <p className="mt-4">
        본 사이트는 광고를 통해 운영비를 충당할 수 있으며, 이 경우 광고 제공업체가 쿠키를 사용할
        수 있습니다.
      </p>
    </div>
  );
}
