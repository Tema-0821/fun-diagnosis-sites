import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-gradient-to-b from-emerald-50 via-white to-yellow-50 text-zinc-900">
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
