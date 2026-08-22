import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const notoSerif = Noto_Serif_KR({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const notoSans = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_NAME = "직장 스트레스 지수";
const SITE_URL = "https://work-stress-index.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} 진단`, template: `%s | ${SITE_NAME}` },
  description: "간단한 질문 7개로 지금 나의 직장 스트레스 지수를 재미로 확인해봐요. 회원가입 없이 무료.",
  openGraph: {
    title: `${SITE_NAME} 진단`,
    description: "간단한 질문 7개로 지금 나의 직장 스트레스 지수를 재미로 확인해봐요.",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSerif.variable} ${notoSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#f7f2e9] text-zinc-900">
        {children}
        <footer className="pb-6 text-center text-xs text-zinc-400">
          <Link href="/privacy" className="hover:text-zinc-600">
            개인정보처리방침
          </Link>
        </footer>
      </body>
    </html>
  );
}
