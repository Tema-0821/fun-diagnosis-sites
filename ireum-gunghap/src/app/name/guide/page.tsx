import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용 가이드",
  description: "이름궁합 계산 방식과 자주 묻는 질문을 안내합니다.",
};

const GRADE_TABLE = [
  { range: "90~100점", title: "천생연분", desc: "말이 필요 없을 만큼 자연스럽게 잘 맞는 조합" },
  { range: "70~89점", title: "찰떡궁합", desc: "대화가 끊이지 않고 죽이 잘 맞는 조합" },
  { range: "50~69점", title: "티키타카 케미", desc: "은근히 합이 잘 맞는, 밀당이 재미있는 조합" },
  { range: "30~49점", title: "성장형 케미", desc: "처음엔 다르지만 노력할수록 좋아지는 조합" },
  { range: "0~29점", title: "정반대의 매력", desc: "예측불가하지만 그래서 더 끌리는 조합" },
];

const FAQ = [
  {
    q: "이름궁합 점수는 어떻게 계산되나요?",
    a: "입력한 두 이름을 가나다순으로 정렬해 하나의 문자열로 합친 뒤, 그 문자열을 해시값으로 바꿔 시드로 사용해요. 그 시드로 0~100 사이 점수와 등급, 문장을 결정론적으로 골라 조합합니다. 실제 이름의 뜻이나 사주와는 무관한 재미용 콘텐츠예요.",
  },
  {
    q: "이름 순서를 바꿔 넣으면 결과가 달라지나요?",
    a: "아니요. 어떤 이름을 먼저 넣든 두 이름을 정렬한 뒤 계산하기 때문에 순서와 상관없이 항상 같은 결과가 나옵니다.",
  },
  {
    q: "같은 이름 조합이면 시간이 지나도 같은 결과가 나오나요?",
    a: "네. 이름이 같으면 시드도 항상 같기 때문에 몇 번을 다시 입력해도, 오늘 봐도 내일 봐도 결과가 동일합니다. 그래서 결과 링크를 그대로 공유해도 상대방이 같은 화면을 보게 돼요.",
  },
  {
    q: "성을 포함해서 넣어야 하나요, 이름만 넣어야 하나요?",
    a: "정해진 규칙은 없어요. 성을 포함하면 포함한 대로, 이름만 넣으면 그 자체로 하나의 조합이 되어 결과가 달라집니다. 두 가지 버전으로 다 시도해보는 것도 재미있어요.",
  },
];

export default function NameGuidePage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-12">
      <Link href="/name" className="text-sm text-rose-400 hover:text-rose-500">
        ← 이름궁합으로 돌아가기
      </Link>
      <h1 className="font-heading-name mt-3 text-2xl font-bold text-rose-500">이용 가이드</h1>

      <section className="mt-8">
        <h2 className="font-heading-name text-lg text-rose-500">이름궁합, 어떻게 계산되나요?</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          이름궁합은 입력한 두 이름을 정렬해 하나의 문자열로 합친 뒤, 그 값을 해시로 바꿔 시드로
          삼아요. 이 시드로 0~100점 사이 궁합 점수와 등급 타이틀, 강점·주의점·조언 문장을
          결정론적으로 골라 조합합니다. 이름 순서를 바꿔 넣어도, 며칠 뒤에 다시 넣어도 같은
          이름 조합이면 항상 같은 결과가 나와요. 서버로 이름이 전송되지 않고 전부 브라우저
          안에서만 계산됩니다.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading-name text-lg text-rose-500">궁합 등급표</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-rose-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-rose-100 bg-rose-50/60">
                <th className="px-3 py-2 font-medium text-zinc-700">점수</th>
                <th className="px-3 py-2 font-medium text-zinc-700">등급</th>
                <th className="px-3 py-2 font-medium text-zinc-700">의미</th>
              </tr>
            </thead>
            <tbody>
              {GRADE_TABLE.map((row) => (
                <tr key={row.range} className="border-b border-rose-50 last:border-b-0">
                  <td className="px-3 py-2 whitespace-nowrap text-zinc-500">{row.range}</td>
                  <td className="px-3 py-2 font-semibold text-rose-500">{row.title}</td>
                  <td className="px-3 py-2 text-zinc-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 pb-4">
        <h2 className="font-heading-name text-lg text-rose-500">자주 묻는 질문</h2>
        <div className="mt-3 flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-rose-100 bg-white/70 p-4 text-sm text-zinc-700"
            >
              <summary className="cursor-pointer font-medium text-zinc-900">{item.q}</summary>
              <p className="mt-2 leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
