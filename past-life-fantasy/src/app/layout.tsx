import type { Metadata } from "next";
import { Noto_Sans_KR, Song_Myung } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const songMyung = Song_Myung({
  variable: "--font-heading",
  weight: "400",
});

const notoSans = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_NAME = "전생 환생 진단";
const SITE_URL = "https://past-life-fantasy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description:
    "성향 질문으로 알아보는 판타지 세계관 속 나의 전생과 다음 생. 엘프, 고블린, 드워프 등 50가지 넘는 종족·직업 조합 중 나의 결과는? 재미로 확인해봐요.",
  openGraph: {
    title: SITE_NAME,
    description: "성향 질문으로 알아보는 판타지 세계관 속 나의 전생과 다음 생.",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${songMyung.variable} ${notoSans.variable} h-full antialiased`}>
      <head>
        {/* Google AdSense 사이트 연결 확인용 스니펫. 구글이 정적 HTML에서 그대로
            찾을 수 있도록 next/script 최적화 없이 순수 <script> 태그로 둔다. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9915051439055619"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-starfield flex min-h-full flex-col bg-[#0d0a1f] text-zinc-100">
        {children}
        <footer className="pb-6 text-center text-xs text-zinc-500">
          <Link href="/privacy" className="hover:text-zinc-300">
            개인정보처리방침
          </Link>
        </footer>
      </body>
    </html>
  );
}
