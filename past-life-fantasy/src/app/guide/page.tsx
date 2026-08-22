import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용 가이드",
  description: "전생 환생 진단의 계산 방식, 종족·직업 도감, 자주 묻는 질문을 안내합니다.",
};

const RACE_COMPENDIUM = [
  { name: "인간", desc: "어디서나 적응력이 뛰어난 만능형 종족" },
  { name: "오크", desc: "타고난 완력으로 전장을 압도하는 종족" },
  { name: "드워프", desc: "장인 정신과 끈기로 이름난 종족" },
  { name: "거인족", desc: "압도적인 체구와 존재감을 지닌 종족" },
  { name: "엘프", desc: "긴 수명만큼 깊은 지혜를 쌓은 종족" },
  { name: "하이엘프", desc: "고귀한 혈통과 강력한 마력을 지닌 종족" },
  { name: "마족", desc: "금단의 힘을 다루는 신비로운 종족" },
  { name: "정령족", desc: "자연의 기운과 하나 된 신비한 종족" },
  { name: "고블린", desc: "작지만 영리하고 재빠른 종족" },
  { name: "하플링", desc: "소박하지만 눈치 빠른 종족" },
  { name: "다크엘프", desc: "그림자 속에서 살아가는 은밀한 종족" },
  { name: "수인", desc: "야성적인 감각을 타고난 종족" },
  { name: "하프엘프", desc: "인간과 엘프의 장점을 모두 지닌 종족" },
  { name: "요정", desc: "작고 사랑스럽지만 장난기 많은 종족" },
  { name: "천사족", desc: "따뜻함과 신성한 기운을 지닌 종족" },
  { name: "용족", desc: "용의 피를 이어받은 위엄 있는 종족" },
];

const CLASS_COMPENDIUM = [
  { name: "기사", desc: "명예와 규율을 중시하는 전투 직업" },
  { name: "전사", desc: "순수한 힘으로 전장을 누비는 직업" },
  { name: "광전사", desc: "분노를 힘으로 바꾸는 저돌적인 직업" },
  { name: "검투사", desc: "실전으로 단련된 노련한 전투 직업" },
  { name: "마법사", desc: "마나를 다루는 지식의 탐구자" },
  { name: "흑마법사", desc: "금단의 마법을 연구하는 신비한 직업" },
  { name: "현자", desc: "깊은 통찰로 해답을 찾는 지혜의 직업" },
  { name: "예언자", desc: "미래를 내다보는 신비로운 직업" },
  { name: "도적", desc: "그림자 속에서 움직이는 은밀한 직업" },
  { name: "궁수", desc: "먼 거리에서 정확히 적을 노리는 직업" },
  { name: "암살자", desc: "소리 없이 목표를 처리하는 직업" },
  { name: "정찰병", desc: "누구보다 빠르게 정보를 모으는 직업" },
  { name: "성직자", desc: "치유와 축복을 내리는 신성한 직업" },
  { name: "음유시인", desc: "이야기와 노래로 마음을 움직이는 직업" },
  { name: "치유사", desc: "상처와 마음을 동시에 어루만지는 직업" },
  { name: "상인", desc: "신뢰와 인맥으로 살아가는 직업" },
];

const FAQ = [
  {
    q: "결과는 어떻게 정해지나요?",
    a: "질문 8개에 답하면 힘·지혜·기민·친화 4가지 성향 점수가 매겨져요. 가장 높은 점수가 직업을, 두 번째로 높은 점수가 종족을 결정하고, 답변 전체를 시드로 삼아 그 안에서 구체적인 종족·직업 하나를 골라 조합합니다. 종족 16종 x 직업 16종 조합 중 하나가 나와요.",
  },
  {
    q: "같은 답변이면 항상 같은 결과가 나오나요?",
    a: "네. 답변이 같으면 시드도 항상 같기 때문에 몇 번을 다시 해도 동일한 결과가 나옵니다. 결과 링크를 그대로 공유하면 상대방도 같은 화면을 보게 돼요.",
  },
  {
    q: "전생과 환생은 왜 따로 진단하나요?",
    a: "전생은 과거에 어떤 존재였는지, 환생은 다음 생에 어떤 존재가 될지를 묻는 서로 다른 질문이라 하나로 섞지 않았어요. 두 진단은 질문지도, 결과도 완전히 독립적으로 계산됩니다.",
  },
  {
    q: "이 결과에 과학적 근거가 있나요?",
    a: "아니요. 재미로 즐기는 콘텐츠이며 실제 운세나 성격 검사와는 무관합니다.",
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-12">
      <Link href="/" className="text-sm text-purple-300 hover:text-purple-200">
        ← 진단으로 돌아가기
      </Link>
      <h1 className="font-heading text-gold mt-3 text-2xl">이용 가이드</h1>

      <section className="mt-8">
        <h2 className="font-heading text-gold text-lg">이런 원리로 만들어져요</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          전생·환생 진단은 질문 8개에 대한 답변으로 힘·지혜·기민·친화 4가지 성향 점수를
          매깁니다. 가장 높은 성향이 직업을, 두 번째로 높은 성향이 종족을 결정하고, 답변
          전체를 시드로 삼아 그 조합 안에서 구체적인 결과 하나를 고릅니다. 종족 16종과 직업
          16종의 조합이라 나올 수 있는 결과만 100가지가 넘어요. 답변은 서버로 전송되지 않고
          브라우저 안에서만 계산됩니다.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-gold text-lg">종족 도감</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {RACE_COMPENDIUM.map((race) => (
            <div key={race.name} className="rounded-lg border border-purple-500/20 bg-white/5 p-3">
              <p className="text-sm font-semibold text-purple-200">{race.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{race.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-gold text-lg">직업 도감</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {CLASS_COMPENDIUM.map((cls) => (
            <div key={cls.name} className="rounded-lg border border-purple-500/20 bg-white/5 p-3">
              <p className="text-sm font-semibold text-purple-200">{cls.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{cls.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 pb-4">
        <h2 className="font-heading text-gold text-lg">자주 묻는 질문</h2>
        <div className="mt-3 flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-lg border border-purple-500/20 bg-white/5 p-4 text-sm text-zinc-300"
            >
              <summary className="cursor-pointer font-medium text-zinc-100">{item.q}</summary>
              <p className="mt-2 leading-relaxed text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
