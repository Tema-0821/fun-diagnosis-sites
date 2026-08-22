import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 py-14">
      <h1 className="text-center text-3xl font-bold tracking-tight text-zinc-900">
        💫 AI궁합
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-500">
        궁합부터 오늘의 운세까지, 재미로 즐기는 진단을 한곳에서. 회원가입 없이 무료예요.
      </p>

      <div className="mt-10 flex w-full flex-col gap-4">
        <Link
          href="/fortune"
          className="group flex items-center justify-between rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-6 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <div>
            <p className="text-2xl font-bold text-amber-600">🔆 오늘의 운세</p>
            <p className="mt-1 text-sm text-zinc-600">이름 하나로 보는 오늘 하루의 운세</p>
          </div>
          <span className="text-2xl text-amber-300 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/name"
          className="bg-love-pattern group flex items-center justify-between rounded-3xl border border-rose-100 bg-gradient-to-r from-rose-50 to-violet-50 px-6 py-6 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <div>
            <p className="font-heading-name text-2xl font-bold text-rose-500">💕 이름궁합</p>
            <p className="mt-1 text-sm text-zinc-600">이름 두 개로 알아보는 궁합</p>
          </div>
          <span className="text-2xl text-rose-300 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/love-style"
          className="group flex items-center justify-between rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-6 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <div>
            <p className="text-2xl font-bold text-pink-500">💘 나의 연애 스타일</p>
            <p className="mt-1 text-sm text-zinc-600">혼자서도 알아보는 나의 연애 유형</p>
          </div>
          <span className="text-2xl text-pink-300 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/crush-rate"
          className="group flex items-center justify-between rounded-3xl border border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 to-pink-50 px-6 py-6 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <div>
            <p className="text-2xl font-bold text-fuchsia-500">🍀 짝사랑 성공 확률</p>
            <p className="mt-1 text-sm text-zinc-600">이름 두 개로 보는 짝사랑 성공 확률</p>
          </div>
          <span className="text-2xl text-fuchsia-300 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/ideal-type"
          className="group flex items-center justify-between rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 px-6 py-6 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <div>
            <p className="text-2xl font-bold text-violet-600">🔮 나의 이상형 매치</p>
            <p className="mt-1 text-sm text-zinc-600">나에게 잘 맞는 이상형 유형 찾기</p>
          </div>
          <span className="text-2xl text-violet-300 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/mbti"
          className="group flex items-center justify-between rounded-3xl border-2 border-zinc-900 bg-white px-6 py-6 shadow-[4px_4px_0_0_#18181b] transition-transform hover:scale-[1.02]"
        >
          <div>
            <p className="font-heading-mbti text-2xl text-violet-600">🧠 MBTI 궁합</p>
            <p className="mt-1 text-sm text-zinc-600">MBTI 유형 두 개로 알아보는 궁합</p>
          </div>
          <span className="text-2xl text-zinc-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-zinc-400">
        ※ 재미로 즐기는 콘텐츠이며 과학적 근거가 없습니다. 입력한 정보는 서버로 전송되지 않고
        브라우저에서만 계산됩니다.
      </p>
    </div>
  );
}
