"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ElementIcon } from "@/components/ElementIcon";
import { generatePastLife, type PastLifeResult } from "@/lib/pastlife/generate";
import { QUIZ_QUESTIONS, type Element } from "@/lib/pastlife/quiz";
import { decodeAnswers, encodeAnswers } from "@/lib/pastlife/share";

export function PastLifeApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, Element>>({});
  const [result, setResult] = useState<PastLifeResult | null>(null);
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
        setResult(generatePastLife(decoded));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = QUIZ_QUESTIONS.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === QUIZ_QUESTIONS.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generatePastLife(answers);
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
      <h1 className="font-heading text-gold text-center text-3xl tracking-wide">
        🔮 전생 환생 진단
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-400">
        질문 {QUIZ_QUESTIONS.length}개로 알아보는 나의 전생과, 다음 생의 운명
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col">
          <div className="mb-6 h-1 w-full rounded-full bg-white/10">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-purple-400 to-yellow-400 transition-all"
              style={{ width: `${(answeredCount / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {QUIZ_QUESTIONS.map((q, index) => (
            <div key={q.id} className="border-t border-purple-500/20 py-5 first:border-t-0 first:pt-0">
              <p className="text-sm text-zinc-200">
                <span className="text-gold mr-2">{index + 1}.</span>
                {q.text}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {q.options.map((option) => (
                  <label
                    key={option.label}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-colors ${
                      answers[q.id] === option.element
                        ? "border-yellow-400/70 bg-yellow-500/10 text-yellow-200"
                        : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="sr-only"
                      checked={answers[q.id] === option.element}
                      onChange={() =>
                        setAnswers((prev) => ({ ...prev, [q.id]: option.element }))
                      }
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
            className="font-heading mt-8 w-full rounded-lg border border-yellow-400/60 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 px-4 py-3 text-lg text-yellow-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            운명 확인하기 🔮
          </button>
        </form>
      ) : (
        <div className="mt-8 flex w-full flex-col gap-6">
          <div className="card-tarot animate-card-reveal rounded-xl p-6 text-center">
            <p className="text-xs tracking-[0.2em] text-purple-300 uppercase">Past Life</p>
            <ElementIcon element={result.primaryElement} />
            <p className="font-heading text-gold mt-3 text-lg">{result.pastLife.role}</p>
            <p className="mt-3 text-left text-sm leading-relaxed text-zinc-300">
              {result.pastLife.description}
            </p>
          </div>

          <div className="card-tarot animate-card-reveal rounded-xl p-6 text-center">
            <p className="text-xs tracking-[0.2em] text-purple-300 uppercase">Rebirth</p>
            <ElementIcon element={result.secondaryElement} />
            <p className="font-heading text-gold mt-3 text-lg">{result.rebirth.title}</p>
            <p className="mt-3 text-left text-sm leading-relaxed text-zinc-300">
              {result.rebirth.description}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-lg border border-purple-400/40 px-4 py-2.5 text-sm font-medium text-purple-200 transition-colors hover:bg-purple-500/10"
            >
              {copied ? "링크 복사됨! ✅" : "결과 공유하기 🔗"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-lg border border-yellow-400/60 bg-yellow-500/10 px-4 py-2.5 text-sm font-medium text-yellow-200 transition-colors hover:bg-yellow-500/20"
            >
              다시 하기
            </button>
          </div>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-zinc-500">
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 답변은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
