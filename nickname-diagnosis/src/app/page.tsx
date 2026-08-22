import { Suspense } from "react";
import { NicknameApp } from "./NicknameApp";

const FAQ = [
  {
    q: "별명은 어떤 원리로 만들어지나요?",
    a: "입력한 이름의 글자를 숫자로 변환해 고유한 시드값을 만들고, 그 시드로 형용사 18종·명사 18종 조합 중 하나를 결정론적으로 골라 별명을 완성해요. 실제 AI가 아니라 규칙 기반 알고리즘이라 서버 통신 없이 브라우저에서 즉시 계산됩니다.",
  },
  {
    q: "같은 이름을 넣으면 항상 같은 결과가 나오나요?",
    a: "네. 이름이 같으면 시드값도 항상 같기 때문에, 언제 다시 입력하든 동일한 별명·설명·특징 태그가 나옵니다. 그래서 결과 링크를 친구에게 공유해도 똑같은 화면을 볼 수 있어요.",
  },
  {
    q: "이름 두 글자와 세 글자를 넣으면 결과가 달라지나요?",
    a: "네, 글자 하나만 달라져도 시드값이 완전히 달라지기 때문에 전혀 다른 별명이 나올 수 있어요. 성을 포함해서 넣는지, 애칭으로 넣는지에 따라서도 결과가 바뀌니 여러 버전으로 시도해보는 것도 재미있어요.",
  },
  {
    q: "이 별명에 성격 심리학적 근거가 있나요?",
    a: "아니요. 재미로 즐기는 콘텐츠이며 실제 성격 분석이나 심리 검사와는 무관합니다. 가볍게 웃고 넘기는 용도로 만들어졌어요.",
  },
];

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <NicknameApp />
      </Suspense>

      <section className="mx-auto w-full max-w-md px-6 pb-4">
        <h2 className="font-heading text-neon-cyan text-lg">이런 원리로 만들어져요</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          별명 진단기는 입력한 이름을 해시값으로 바꾼 뒤, 그 값을 시드로 삼아 형용사·명사·설명·특징
          태그 풀에서 하나씩 결정론적으로 골라 별명을 완성해요. 같은 이름이면 언제 입력해도 항상
          같은 결과가 나오고, 이름이 다르면 조합이 완전히 달라지기 때문에 324가지(형용사 18 ×
          명사 18) 조합 중 하나가 여러분만의 별명이 됩니다. 서버로 이름이 전송되지 않고 전부
          브라우저 안에서만 계산돼요.
        </p>
      </section>

      <section className="mx-auto w-full max-w-md px-6 pb-12">
        <h2 className="font-heading text-neon-cyan text-lg">자주 묻는 질문</h2>
        <div className="mt-3 flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-lg border border-cyan-500/20 bg-white/5 p-4 text-sm text-zinc-300"
            >
              <summary className="cursor-pointer font-medium text-zinc-100">{item.q}</summary>
              <p className="mt-2 leading-relaxed text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
