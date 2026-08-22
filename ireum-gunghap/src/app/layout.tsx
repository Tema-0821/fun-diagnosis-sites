import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-gradient-to-b from-rose-50 via-white to-violet-50 text-zinc-900">
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
