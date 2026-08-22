"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import {
  decodeAnswers,
  encodeAnswers,
  generateCompanion,
  type CompanionResult,
} from "@/lib/companion/generate";
import { QUESTIONS, type CompanionTag } from "@/lib/companion/quiz";

export function CompanionApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, CompanionTag>>({});
  const [result, setResult] = useState<CompanionResult | null>(null);
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
        setResult(generateCompanion(decoded));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answeredCount = QUESTIONS.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = generateCompanion(answers);
    if (!next) return;
    setResult(next);
    setCopied(false);
    router.replace(`/companion?a=${encodeAnswers(answers)}`);
  }

  function handleReset() {
    setResult(null);
    setAnswers({});
    setCopied(false);
    router.replace("/companion");
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
        🐉 나의 반려 몬스터
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-400">
        질문 {QUESTIONS.length}개로 알아보는 나의 판타지 반려 몬스터
      </p>

      <SiteNav active="/companion" />

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col">
          <div className="mb-6 h-1 w-full rounded-full bg-white/10">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-purple-400 to-yellow-400 transition-all"
              style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {QUESTIONS.map((q, index) => (
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
                      answers[q.id] === option.tag
                        ? "border-yellow-400/70 bg-yellow-500/10 text-yellow-200"
                        : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
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
            className="font-heading mt-8 w-full rounded-lg border border-yellow-400/60 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 px-4 py-3 text-lg text-yellow-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            반려 몬스터 확인하기 🔮
          </button>
        </form>
      ) : (
        <div className="card-tarot animate-card-reveal mt-6 w-full rounded-xl p-6 text-center">
          <p className="text-xs tracking-[0.2em] text-purple-300 uppercase">반려 몬스터 진단</p>
          <p className="mt-3 text-6xl">{result.info.emoji}</p>
          <p className="font-heading text-gold mt-2 text-xl">{result.info.name}</p>
          <p className="mt-3 text-left text-sm leading-relaxed text-zinc-300">
            {result.info.description}
          </p>

          <div className="mt-6 flex gap-2">
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
      <Link href="/guide" className="mt-2 text-center text-xs text-purple-300 hover:text-purple-200">
        계산 방식 · FAQ 보기 →
      </Link>
    </div>
  );
}
