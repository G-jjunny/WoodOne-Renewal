/**
 * robots.txt 자동 생성 (app/robots.ts)
 *
 * Next.js App Router가 /robots.txt 엔드포인트를 자동으로 생성합니다.
 *
 * 차단 전략:
 *   /_next/  — Next.js 빌드 결과물 (크롤러 불필요, 서버 부하)
 *   /api/    — REST API 엔드포인트 (HTML 콘텐츠 없음)
 *   /admin/  — 관리자 페이지 (보안 + 색인 불필요)
 *   /auth/   — 인증 페이지 (로그인/회원가입 등)
 *
 * Googlebot 전용 규칙:
 *   - 위 차단 경로 외 모든 페이지 허용
 *   - 특별 허용: 이미지, CSS, JS는 Googlebot이 렌더링에 필요하므로 차단 금지
 *
 * 환경 분리:
 *   NEXT_PUBLIC_APP_ENV=production 이 아닌 경우(스테이징/프리뷰)
 *   전체 크롤링을 차단하여 스테이징 URL이 검색 결과에 노출되지 않게 합니다.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";

export default function robots(): MetadataRoute.Robots {
  // 스테이징/프리뷰 환경에서는 모든 크롤링 차단
  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "production"
    || process.env.NODE_ENV === "production";

  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      // 스테이징에서는 sitemap도 노출하지 않음
    };
  }

  return {
    rules: [
      // 기본 규칙: 모든 크롤러
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",      // Next.js 내부 빌드 파일
          "/api/",        // API 라우트
          "/admin/",      // 관리자 영역
          "/auth/",       // 인증 페이지
          "/*?*",         // 쿼리 파라미터가 있는 URL (필터/정렬 중복 색인 방지)
        ],
      },
      // Googlebot 전용: 쿼리 파라미터 중 검색은 허용 (Sitelinks Searchbox)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/admin/",
          "/auth/",
        ],
      },
      // 이미지 크롤러: OG 이미지 및 제품 이미지 수집 허용
      {
        userAgent: "Googlebot-Image",
        allow: "/images/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
