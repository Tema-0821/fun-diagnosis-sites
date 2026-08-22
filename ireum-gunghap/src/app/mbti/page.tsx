import { Suspense } from "react";
import { MbtiApp } from "./MbtiApp";

const GRADE_TABLE = [
  { range: "90~100점", title: "환상의 콤비", desc: "찾기 힘든 인연, 완벽에 가까운 케미" },
  { range: "70~89점", title: "찰떡궁합", desc: "죽이 잘 맞는, 케미가 폭발하는 조합" },
  { range: "50~69점", title: "티키타카 케미", desc: "은근히 합이 잘 맞는, 밀당이 재미있는 조합" },
  { range: "30~49점", title: "성장형 케미", desc: "처음엔 다르지만 노력할수록 빛나는 조합" },
  { range: "0~29점", title: "정반대의 매력", desc: "예측불가하지만 그래서 더 끌리는 조합" },
];

const GROUP_TABLE = [
  { group: "분석가 (NT)", types: "INTJ · INTP · ENTJ · ENTP", desc: "논리적이고 전략적인 사고를 중시하는 그룹" },
  { group: "외교관 (NF)", types: "INFJ · INFP · ENFJ · ENFP", desc: "공감과 이상, 사람 사이의 의미를 중시하는 그룹" },
  { group: "관리자 (SJ)", types: "ISTJ · ISFJ · ESTJ · ESFJ", desc: "책임감과 안정감, 원칙을 중시하는 그룹" },
  { group: "탐험가 (SP)", types: "ISTP · ISFP · ESTP · ESFP", desc: "자유로움과 즉흥성, 현재를 중시하는 그룹" },
];

const FAQ = [
  {
    q: "MBTI 궁합 점수는 어떻게 계산되나요?",
    a: "선택한 두 MBTI 유형을 알파벳순으로 정렬해 하나의 문자열로 합친 뒤, 그 값을 해시로 바꿔 시드로 사용해요. 그 시드로 0~100 사이 점수와 등급, 문장을 결정론적으로 골라 조합합니다. 실제 심리학적 궁합 연구 결과가 아니라 재미용 콘텐츠예요.",
  },
  {
    q: "유형을 고르는 순서를 바꾸면 결과가 달라지나요?",
    a: "아니요. 어떤 유형을 먼저 고르든 알파벳순으로 정렬해서 계산하기 때문에 순서와 상관없이 항상 같은 결과가 나옵니다.",
  },
  {
    q: "같은 MBTI 조합이면 항상 같은 결과가 나오나요?",
    a: "네. 같은 두 유형이면 시드도 항상 같아서, 몇 번을 다시 골라도 결과가 동일합니다. 결과 링크를 공유하면 상대방도 같은 화면을 보게 돼요.",
  },
  {
    q: "16가지 유형은 어떻게 4개 그룹으로 나뉘나요?",
    a: "16Personalities에서 널리 쓰이는 분류를 따랐어요. N(직관)/S(감각)와 T(사고)/F(감정) 조합으로 분석가·외교관·관리자·탐험가 4개 그룹으로 나뉩니다. 아래 표를 참고하세요.",
  },
];

export default function MbtiPage() {
  return (
    <>
      <Suspense fallback={null}>
        <MbtiApp />
      </Suspense>

      <section className="mx-auto w-full max-w-md px-6 pb-4">
        <h2 className="font-heading-mbti text-lg text-violet-600">
          MBTI 궁합, 어떻게 계산되나요?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          선택한 두 MBTI 유형을 정렬해 하나의 문자열로 합친 뒤, 그 값을 해시로 바꿔 시드로
          삼아요. 이 시드로 0~100점 사이 궁합 점수와 등급 타이틀, 강점·주의점·조언 문장을
          결정론적으로 골라 조합합니다. 유형을 고르는 순서를 바꿔도, 며칠 뒤 다시 골라도 같은
          조합이면 항상 같은 결과가 나와요. 서버로 정보가 전송되지 않고 전부 브라우저 안에서만
          계산됩니다.
        </p>
      </section>

      <section className="mx-auto w-full max-w-md px-6 pb-4">
        <h2 className="font-heading-mbti text-lg text-violet-600">16가지 유형, 4개 그룹</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border-2 border-zinc-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-900 bg-zinc-50">
                <th className="px-3 py-2 font-medium text-zinc-700">그룹</th>
                <th className="px-3 py-2 font-medium text-zinc-700">유형</th>
                <th className="px-3 py-2 font-medium text-zinc-700">특징</th>
              </tr>
            </thead>
            <tbody>
              {GROUP_TABLE.map((row) => (
                <tr key={row.group} className="border-b border-zinc-100 last:border-b-0">
                  <td className="px-3 py-2 whitespace-nowrap font-semibold text-violet-600">
                    {row.group}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-zinc-500">{row.types}</td>
                  <td className="px-3 py-2 text-zinc-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto w-full max-w-md px-6 pb-4">
        <h2 className="font-heading-mbti text-lg text-violet-600">궁합 등급표</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border-2 border-zinc-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-900 bg-zinc-50">
                <th className="px-3 py-2 font-medium text-zinc-700">점수</th>
                <th className="px-3 py-2 font-medium text-zinc-700">등급</th>
                <th className="px-3 py-2 font-medium text-zinc-700">의미</th>
              </tr>
            </thead>
            <tbody>
              {GRADE_TABLE.map((row) => (
                <tr key={row.range} className="border-b border-zinc-100 last:border-b-0">
                  <td className="px-3 py-2 whitespace-nowrap text-zinc-500">{row.range}</td>
                  <td className="px-3 py-2 font-semibold text-violet-600">{row.title}</td>
                  <td className="px-3 py-2 text-zinc-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto w-full max-w-md px-6 pb-12">
        <h2 className="font-heading-mbti text-lg text-violet-600">자주 묻는 질문</h2>
        <div className="mt-3 flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border-2 border-zinc-900 bg-white p-4 text-sm text-zinc-700"
            >
              <summary className="cursor-pointer font-medium text-zinc-900">{item.q}</summary>
              <p className="mt-2 leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
