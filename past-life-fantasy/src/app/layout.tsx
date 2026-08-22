import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_NAME = "전생 환생 진단";
const SITE_URL = "https://past-life-fantasy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: "이름 하나로 알아보는 나의 전생 판타지 세계관과 환생 후 운명을 재미로 확인해봐요.",
  openGraph: {
    title: SITE_NAME,
    description: "이름 하나로 알아보는 나의 전생 판타지 세계관과 환생 후 운명.",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-gradient-to-b from-indigo-50 via-white to-purple-50 text-zinc-900">
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
