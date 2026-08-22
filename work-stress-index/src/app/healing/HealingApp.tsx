"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import {
  decodeAnswers,
  encodeAnswers,
  generateHealing,
  type HealingResult,
} from "@/lib/healing/generate";
import { QUESTIONS, type HealingTag } from "@/lib/healing/quiz";

export function HealingApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, HealingTag>>({});
  const [result, setResult] = useState<HealingResult | null>(null);
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
        setResult(generateHealing(decoded));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = QUESTIONS.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generateHealing(answers);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/healing?a=${encodeAnswers(answers)}`);
  }

  function handleReset() {
    setResult(null);
    setAnswers({});
    setCopied(false);
    router.replace("/healing");
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
      <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">Healing Type</p>
      <h1 className="font-heading mt-2 text-center text-3xl font-bold tracking-tight text-zinc-900">
        🌿 힐링 방법 추천
      </h1>
      <div className="rule-double mt-4 w-16" />
      <p className="mt-4 text-center text-sm text-zinc-500">
        질문 {QUESTIONS.length}개로 알아보는 나에게 맞는 힐링 방법
      </p>

      <SiteNav active="/healing" />

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col">
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
              <div className="mt-3 flex flex-col gap-2 pl-8">
                {q.options.map((option) => (
                  <label
                    key={option.label}
                    className={`cursor-pointer border-b-2 pb-0.5 text-xs transition-colors ${
                      answers[q.id] === option.tag
                        ? "border-orange-400 font-semibold text-orange-600"
                        : "border-transparent text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="sr-only"
                      checked={answers[q.id] === option.tag}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: option.tag }))}
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
          <p className="mt-3 text-6xl">{result.info.emoji}</p>
          <p className="font-heading mt-2 text-xl font-bold text-zinc-900">{result.info.name}</p>

          <div className="rule-double my-5 w-full" />

          <div className="flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-700">
            <p>{result.info.description}</p>
            <p>💡 {result.info.tip}</p>
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
        ※ 재미로 즐기는 콘텐츠이며 의학적·심리학적 진단이 아닙니다. 답변은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
