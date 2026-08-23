"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import {
  buildArchetype,
  decodeAnswers,
  encodeAnswers,
  type CombinedArchetype,
  type Gender,
  type Tag,
} from "@/lib/pastlife/archetype";
import { PAST_QUESTIONS, PAST_TEMPLATES } from "@/lib/pastlife/pastQuiz";
import { REBIRTH_QUESTIONS, REBIRTH_TEMPLATES } from "@/lib/pastlife/rebirthQuiz";

export type ArchetypeKind = "past" | "rebirth";

const CONFIG = {
  past: {
    path: "/",
    heading: "🕰️ 나의 전생은?",
    subtitle: `질문 ${PAST_QUESTIONS.length}개로 알아보는 나의 전생`,
    questions: PAST_QUESTIONS,
    templates: PAST_TEMPLATES,
    submitLabel: "전생 확인하기 🔮",
    resultLabel: "나의 전생은...",
    cardTitle: "나의 전생은?",
  },
  rebirth: {
    path: "/rebirth",
    heading: "✨ 나의 환생은?",
    subtitle: `질문 ${REBIRTH_QUESTIONS.length}개로 알아보는 다음 생의 나`,
    questions: REBIRTH_QUESTIONS,
    templates: REBIRTH_TEMPLATES,
    submitLabel: "다음 생 확인하기 🔮",
    resultLabel: "다음 생의 나는...",
    cardTitle: "나의 환생은?",
  },
} as const;

export function ArchetypeQuizApp({ kind }: { kind: ArchetypeKind }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const config = CONFIG[kind];

  const [answers, setAnswers] = useState<Record<string, Tag>>({});
  const [result, setResult] = useState<CombinedArchetype | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [copied, setCopied] = useState(false);

  const answeredCount = config.questions.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === config.questions.length;

  useEffect(() => {
    // 공유된 링크(?a=코드&g=m|f)로 들어왔을 때 URL이라는 외부 상태를 초기 렌더 상태로
    // 동기화하는 것이라 정당한 케이스.
    const code = searchParams.get("a");
    const genderParam = searchParams.get("g");
    const decodedGender: Gender = genderParam === "f" ? "female" : "male";
    if (code) {
      const decoded = decodeAnswers(config.questions, code);
      if (decoded) {
        const nextResult = buildArchetype(config.questions, decoded, config.templates);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(decoded);
        setGender(decodedGender);
        setResult(nextResult);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gender) return;
    const next = buildArchetype(config.questions, answers, config.templates);
    if (!next) return;
    setResult(next);
    setCopied(false);
    const genderCode = gender === "female" ? "f" : "m";
    router.replace(`${config.path}?a=${encodeAnswers(config.questions, answers)}&g=${genderCode}`);
  }

  function handleReset() {
    setResult(null);
    setAnswers({});
    setCopied(false);
    router.replace(config.path);
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
        {config.heading}
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-400">{config.subtitle}</p>

      <SiteNav active={config.path} />

      {!result ? (
        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col">
          <div className="mb-6 h-1 w-full rounded-full bg-white/10">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-purple-400 to-yellow-400 transition-all"
              style={{
                width: `${((answeredCount + (gender ? 1 : 0)) / (config.questions.length + 1)) * 100}%`,
              }}
            />
          </div>

          <div className="border-t border-purple-500/20 py-5 first:border-t-0 first:pt-0">
            <p className="text-sm text-zinc-200">
              <span className="text-gold mr-2">•</span>
              결과 이미지에 사용할 성별을 골라주세요
            </p>
            <div className="mt-3 flex gap-2">
              {(
                [
                  { value: "male", label: "남성" },
                  { value: "female", label: "여성" },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition-colors ${
                    gender === option.value
                      ? "border-yellow-400/70 bg-yellow-500/10 text-yellow-200"
                      : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    className="sr-only"
                    checked={gender === option.value}
                    onChange={() => setGender(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {config.questions.map((q, index) => (
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
                      name={`${kind}-${q.id}`}
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
            disabled={!allAnswered || !gender}
            className="font-heading mt-8 w-full rounded-lg border border-yellow-400/60 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 px-4 py-3 text-lg text-yellow-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
          >
            {config.submitLabel}
          </button>
        </form>
      ) : (
        <div className="card-tarot animate-card-reveal mt-6 w-full rounded-xl p-6 text-center">
          <p className="text-xs tracking-[0.2em] text-purple-300 uppercase">{config.cardTitle}</p>

          <div className="mx-auto mt-3 h-36 w-36 overflow-hidden rounded-full border border-yellow-400/40 shadow-[0_0_24px_rgba(212,175,55,0.35)]">
            <Image
              src={`/portraits/${result.race.imageKey}_${gender === "female" ? "f" : "m"}.webp`}
              alt={result.name}
              width={144}
              height={144}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-3 text-sm text-zinc-400">{config.resultLabel}</p>
          <p className="font-heading text-gold mt-1 text-xl">{result.name}</p>
          <p className="mt-3 text-left text-sm leading-relaxed text-zinc-300">
            {result.description}
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
        계산 방식 · 종족·직업 도감 · FAQ 보기 →
      </Link>
    </div>
  );
}
