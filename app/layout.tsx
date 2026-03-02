/**
 * Root Layout — 우드원 홈페이지
 *
 * 폰트 전략:
 *   - Pretendard (sans-serif, 기본 UI 폰트)
 *     이유: 한국어/영문 혼용 시 일관된 비율, Inter와 동일한 기하학적 구조,
 *     절제된 프리미엄 인상으로 원목마루 B2B/B2C 브랜드에 최적
 *     적용: CSS @font-face (jsDelivr CDN 기반 woff2 서브셋)
 *
 *   - Noto Serif KR (serif, 강조 텍스트 전용)
 *     이유: 히어로 디스플레이 문구 등 브랜드 감성 표현 시 사용
 *     적용: next/font/google
 *
 * SEO:
 *   - Organization + WebSite JSON-LD: 전 페이지 공통
 *   - metadataBase: canonical URL 기반 — 모든 상대경로 OG/Twitter 이미지에 자동 적용
 *   - Twitter Card: summary_large_image
 *
 * RSC: 이 컴포넌트는 서버 컴포넌트입니다.
 */

import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { organizationSchema, webSiteSchema } from "@/shared/config/schema";
import "./globals.css";

/* Noto Serif KR — 히어로/디스플레이 타이틀 전용
   weight 400, 600만 로드하여 성능 최적화 */
const notoSerifKR = Noto_Serif_KR({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
  display: "swap",
  preload: false, // 한국어 폰트 전체 프리로드는 성능 부담 — 필요 시 활성화
});

/* ============================================================
   사이트 루트 메타데이터
   각 페이지의 export metadata는 여기서 정의한 template을 상속합니다.
   ============================================================ */
export const metadata: Metadata = {
  // 타이틀 템플릿: 하위 페이지는 "%s | 우드원" 형태로 자동 조합
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "원목마루",
    "강마루",
    "강화마루",
    "우드원",
    "바닥재",
    "마루 시공",
    "인테리어 바닥",
    "프리미엄 마루",
    "국내산 원목",
    "바닥재 전문",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // metadataBase: 상대경로 URL(OG 이미지, canonical 등)을 절대 URL로 변환하는 기준
  metadataBase: new URL(siteConfig.url),

  // 홈페이지 self-referencing canonical — 하위 페이지는 각 페이지에서 개별 설정
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "ko-KR": siteConfig.url,
    },
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.fullName,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} — 프리미엄 원목마루 전문 기업`,
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card: summary_large_image는 콘텐츠 rich 페이지에 최적
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // 계정 확정 후 추가: site: "@woodone_official", creator: "@woodone_official"
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Googlebot이 미리보기 콘텐츠를 최대한 수집할 수 있도록 제한 해제
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 사이트 검증 코드 — Google Search Console 등록 후 채워 넣으세요
  // verification: {
  //   google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
  //   naver: "REPLACE_WITH_NAVER_VERIFICATION_CODE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* lang="ko": 한국어 콘텐츠 명시 — 스크린 리더 및 SEO */
    <html lang="ko" className={notoSerifKR.variable}>
      <head>
        {/* Pretendard: jsDelivr CDN 기반 Dynamic 서브셋 — 실제 사용 글자만 로드 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />

        {/*
          전역 JSON-LD: Organization + WebSite
          - Organization: 브랜드 엔티티를 Google Knowledge Graph에 연결
          - WebSite: Sitelinks Searchbox 힌트 제공
          두 스키마를 별도 <script>로 분리해야 Google이 각각 독립 파싱 가능
        */}
        <JsonLd schema={organizationSchema} id="schema-organization" />
        <JsonLd schema={webSiteSchema} id="schema-website" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        {/* 스크린 리더 전용 메인 콘텐츠 바로가기 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
        >
          본문으로 바로가기
        </a>

        {/* 헤더 — 전역 네비게이션 */}
        <Header />

        {/* 메인 콘텐츠 영역 */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* 푸터 — 법적 정보 및 링크 */}
        <Footer />
      </body>
    </html>
  );
}
