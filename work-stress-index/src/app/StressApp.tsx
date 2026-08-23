"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { calculateStress, type StressResult } from "@/lib/stress/calculate";
import { QUESTIONS } from "@/lib/stress/questions";
import { decodeAnswers, encodeAnswers } from "@/lib/stress/share";

function scoreColor(score: number): string {
  if (score >= 61) return "text-red-500";
  if (score >= 41) return "text-orange-500";
  return "text-emerald-500";
}

function scoreStroke(score: number): string {
  if (score >= 61) return "#ef4444";
  if (score >= 41) return "#f97316";
  return "#10b981";
}

// 반원형 게이지: 둘레 길이(半 pi r, r=80)만큼 dasharray를 잡고 점수 비율만큼만 보이게 offset을 준다.
const GAUGE_CIRCUMFERENCE = Math.PI * 80;

function StressGauge({ score }: { score: number }) {
  const offset = GAUGE_CIRCUMFERENCE * (1 - score / 100);
  return (
    <svg viewBox="0 0 200 110" className="mx-auto w-56">
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="#e7ddc9"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke={scoreStroke(score)}
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray={GAUGE_CIRCUMFERENCE}
        strokeDashoffset={offset}
      />
      <text x="100" y="90" textAnchor="middle" className="font-heading" fontSize="36" fontWeight="700" fill="#27272a">
        {score}%
      </text>
    </svg>
  );
}

export function StressApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<StressResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 공유된 링크(?a=코드)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로 동기화하는
    // 것이라 정당한 케이스.
    const code = searchParams.get("a");
    if (code) {
      const decoded = decodeAnswers(code);
      if (decoded) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(decoded);
        setResult(calculateStress(decoded));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allAnswered = QUESTIONS.every((q) => typeof answers[q.id] === "number");
  const answeredCount = QUESTIONS.filter((q) => typeof answers[q.id] === "number").length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = calculateStress(answers);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/?a=${encodeAnswers(answers)}`);
  }

  function handleReset() {
    setResult(null);
    setAnswers({});
    setCopied(false);
    router.replace("/");
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근이 막힌 환경이면 조용히 무시한다.
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 py-12">
      <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">Weekly Check</p>
      <h1 className="font-heading mt-2 text-center text-3xl font-bold tracking-tight text-zinc-900">
        😮‍💨 직장 스트레스 지수
      </h1>
      <div className="rule-double mt-4 w-16" />
      <p className="mt-4 text-center text-sm text-zinc-500">
        질문 {QUESTIONS.length}개에 답하면 지금 나의 스트레스 지수를 확인할 수 있어요
      </p>

      <SiteNav active="/" />

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col">
          <div className="mb-6 h-1 w-full rounded-full bg-[#e7ddc9]">
            <div
              className="h-1 rounded-full bg-orange-400 transition-all"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {QUESTIONS.map((q, index) => (
            <div key={q.id} className="border-t border-[#e7ddc9] py-5 first:border-t-0 first:pt-0">
              <p className="flex gap-3 text-sm text-zinc-800">
                <span className="font-heading text-lg text-orange-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-0.5">{q.text}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 pl-8">
                {q.options.map((option) => (
                  <label
                    key={option.label}
                    className={`cursor-pointer border-b-2 pb-0.5 text-xs transition-colors ${
                      answers[q.id] === option.score
                        ? "border-orange-400 font-semibold text-orange-600"
                        : "border-transparent text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="sr-only"
                      checked={answers[q.id] === option.score}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: option.score }))}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={!allAnswered}
            className="font-heading mt-8 w-full rounded-sm bg-zinc-900 px-4 py-3 text-base font-bold text-[#f7f2e9] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            결과 보기 🔍
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full border border-[#e7ddc9] bg-white/60 p-6 text-center">
          <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">Result</p>
          <StressGauge score={result.scorePercent} />
          <p className={`font-heading text-xl font-bold ${scoreColor(result.scorePercent)}`}>
            {result.band.title}
          </p>

          <div className="rule-double my-5 w-full" />

          <div className="flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-700">
            <p>{result.band.description}</p>
            <p>💡 {result.band.advice}</p>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              {copied ? "링크 복사됨! ✅" : "결과 공유하기 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-[#f7f2e9] transition-colors hover:bg-zinc-700"
            >
              다시 하기
            </button>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-zinc-400">
        ※ 재미로 즐기는 콘텐츠이며 의학적·심리학적 테스트가 아닙니다. 답변은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
