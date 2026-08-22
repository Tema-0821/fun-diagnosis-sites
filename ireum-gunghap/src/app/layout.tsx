import type { Metadata } from "next";
import { Gaegu, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const gaegu = Gaegu({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSans = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_NAME = "이름궁합";
const SITE_URL = "https://ireum-gunghap.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} - 이름으로 보는 궁합`, template: `%s | ${SITE_NAME}` },
  description: "이름 두 개만 입력하면 재미있는 궁합 진단 결과를 바로 확인할 수 있어요. 회원가입 없이 무료.",
  openGraph: {
    title: `${SITE_NAME} - 이름으로 보는 궁합`,
    description: "이름 두 개만 입력하면 재미있는 궁합 진단 결과를 바로 확인할 수 있어요.",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${gaegu.variable} ${notoSans.variable} h-full antialiased`}>
      <body className="bg-love-pattern flex min-h-full flex-col bg-gradient-to-b from-rose-100 via-pink-50 to-violet-100 text-zinc-900">
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
