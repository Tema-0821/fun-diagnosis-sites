"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { calculateStress, type StressResult } from "@/lib/stress/calculate";
import { QUESTIONS } from "@/lib/stress/questions";
import { decodeAnswers, encodeAnswers } from "@/lib/stress/share";

function scoreColor(score: number): string {
  if (score >= 61) return "text-red-500";
  if (score >= 41) return "text-orange-500";
  return "text-emerald-500";
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
      <h1 className="text-center text-2xl font-bold tracking-tight text-zinc-900">
        😮‍💨 직장 스트레스 지수
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        질문 {QUESTIONS.length}개에 답하면 지금 나의 스트레스 지수를 확인할 수 있어요
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-5">
          {QUESTIONS.map((q, index) => (
            <div key={q.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-zinc-800">
                {index + 1}. {q.text}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {q.options.map((option) => (
                  <label
                    key={option.label}
                    className={`cursor-pointer rounded-xl border px-2 py-2 text-center text-xs transition-colors ${
                      answers[q.id] === option.score
                        ? "border-orange-400 bg-orange-50 font-semibold text-orange-700"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
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
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-red-400 px-4 py-3 text-base font-semibold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            결과 보기 🔍
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full rounded-3xl border border-zinc-100 bg-white p-6 text-center shadow-lg">
          <p className="text-sm text-zinc-500">나의 스트레스 지수</p>
          <p className={`mt-2 text-5xl font-extrabold ${scoreColor(result.scorePercent)}`}>
            {result.scorePercent}
            <span className="text-2xl">%</span>
          </p>
          <p className="mt-2 text-lg font-bold text-zinc-800">{result.band.title}</p>

          <div className="mt-6 flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-700">
            <p>{result.band.description}</p>
            <p>💡 {result.band.advice}</p>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              {copied ? "링크 복사됨! ✅" : "결과 공유하기 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              다시 하기
            </button>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-zinc-400">
        ※ 재미로 즐기는 콘텐츠이며 의학적·심리학적 진단이 아닙니다. 답변은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
