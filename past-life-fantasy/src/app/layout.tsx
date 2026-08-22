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
    <html lang="ko" className={`${songMyung.variable} ${notoSans.variable} h-full antialiased`}>
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
