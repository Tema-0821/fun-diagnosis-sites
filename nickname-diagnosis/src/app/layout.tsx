import type { Metadata } from "next";
import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const blackHanSans = Black_Han_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const notoSans = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_NAME = "별명 진단기";
const SITE_URL = "https://nickname-diagnosis.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} - 이름으로 보는 나의 별명`, template: `%s | ${SITE_NAME}` },
  description: "이름 하나만 입력하면 나를 표현하는 재미있는 별명을 바로 만들어줘요. 회원가입 없이 무료.",
  openGraph: {
    title: `${SITE_NAME} - 이름으로 보는 나의 별명`,
    description: "이름 하나만 입력하면 나를 표현하는 재미있는 별명을 바로 만들어줘요.",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${blackHanSans.variable} ${notoSans.variable} h-full antialiased`}>
      <head>
        {/* Google AdSense 사이트 연결 확인용 스니펫. 구글이 정적 HTML에서 그대로
            찾을 수 있도록 next/script 최적화 없이 순수 <script> 태그로 둔다. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9915051439055619"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-neon-grid flex min-h-full flex-col bg-zinc-950 text-zinc-100">
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
