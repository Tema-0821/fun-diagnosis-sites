import type { Metadata } from "next";
import { Gaegu, Jua, Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const gaegu = Gaegu({
  variable: "--font-heading-name",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jua = Jua({
  variable: "--font-heading-mbti",
  subsets: ["latin"],
  weight: "400",
});

const notoSans = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_NAME = "궁합연구소";
const SITE_URL = "https://ireum-gunghap.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} - 이름궁합 · MBTI 궁합`, template: `%s | ${SITE_NAME}` },
  description:
    "이름 궁합, MBTI 궁합을 한곳에서 재미로 확인해보세요. 회원가입 없이 무료, 입력한 정보는 서버로 전송되지 않습니다.",
  openGraph: {
    title: `${SITE_NAME} - 이름궁합 · MBTI 궁합`,
    description: "이름 궁합, MBTI 궁합을 한곳에서 재미로 확인해보세요.",
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${gaegu.variable} ${jua.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
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
