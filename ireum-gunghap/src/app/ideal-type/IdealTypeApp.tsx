"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  decodeAnswers,
  encodeAnswers,
  generateIdealType,
  type IdealTypeResult,
} from "@/lib/idealType/generate";
import { QUESTIONS, type IdealType } from "@/lib/idealType/quiz";

export function IdealTypeApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, IdealType>>({});
  const [result, setResult] = useState<IdealTypeResult | null>(null);
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
        setResult(generateIdealType(decoded));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = QUESTIONS.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generateIdealType(answers);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/ideal-type?a=${encodeAnswers(answers)}`);
  }

  function handleReset() {
    setResult(null);
    setAnswers({});
    setCopied(false);
    router.replace("/ideal-type");
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
      <Link href="/" className="text-sm text-violet-400 hover:text-violet-500">
        ← AI궁합
      </Link>
      <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-violet-600">
        🔮 나의 이상형 매치
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        질문 {QUESTIONS.length}개로 알아보는 나에게 잘 맞는 이상형
      </p>

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col">
          <div className="mb-6 h-1 w-full rounded-full bg-violet-100">
            <div
              className="h-1 rounded-full bg-violet-400 transition-all"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {QUESTIONS.map((q, index) => (
            <div key={q.id} className="border-t border-violet-100 py-5 first:border-t-0 first:pt-0">
              <p className="text-sm text-zinc-800">
                <span className="mr-2 text-violet-400">{index + 1}.</span>
                {q.text}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {q.options.map((option) => (
                  <label
                    key={option.label}
                    className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition-colors ${
                      answers[q.id] === option.type
                        ? "border-violet-400 bg-violet-50 font-semibold text-violet-700"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="sr-only"
                      checked={answers[q.id] === option.type}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: option.type }))}
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
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-400 to-indigo-400 px-4 py-3 text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            결과 보기 🔮
          </button>
        </form>
      ) : (
        <div className="animate-pop-in mt-8 w-full rounded-3xl border border-violet-100 bg-white/90 p-6 text-center shadow-lg">
          <p className="text-6xl">{result.info.emoji}</p>
          <p className="mt-2 text-2xl font-extrabold text-violet-600">{result.info.name}</p>

          <div className="mt-4 flex flex-col gap-3 text-left text-sm leading-relaxed text-zinc-700">
            <p>{result.info.description}</p>
            <p>💡 {result.info.tip}</p>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 rounded-xl border border-violet-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-violet-50"
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
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 답변은 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
