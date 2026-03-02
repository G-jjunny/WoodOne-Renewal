/**
 * XML 사이트맵 자동 생성 (app/sitemap.ts)
 *
 * Next.js App Router가 /sitemap.xml 엔드포인트를 자동으로 생성합니다.
 * Google Search Console에 https://woodone.co.kr/sitemap.xml 로 등록하세요.
 *
 * 우선순위(priority) 설계 원칙:
 *   1.0 — 홈: 가장 중요한 단일 진입점
 *   0.8 — 제품 목록 / 제품 상세: 전환 목적 핵심 페이지
 *   0.7 — 시공 사례: 구매 의향 유저의 탐색 페이지
 *   0.6 — 회사 소개: 신뢰도 형성 페이지
 *   0.5 — 문의하기: 전환 페이지 (중복 리드 방지)
 *
 * changeFrequency 설계 원칙:
 *   - 홈/제품 목록: weekly (프로모션/신제품 업데이트 주기)
 *   - 제품 상세: monthly (제품 스펙은 자주 안 바뀜)
 *   - 시공 사례: monthly (새 사례 추가 주기)
 *   - 소개/문의: yearly (콘텐츠 변경 거의 없음)
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";

// 빌드 시점 기준 날짜 (ISR 사용 시 revalidate 설정으로 최신화)
const SITE_LAST_MODIFIED = new Date("2026-03-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ----------------------------------------------------------
     정적 라우트
     ---------------------------------------------------------- */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/products`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  /* ----------------------------------------------------------
     동적 라우트: 제품 상세 (/products/[slug])
     TODO: CMS/DB 연동 후 아래 주석을 해제하고 실제 데이터로 교체하세요.

     예시 코드:
     const products = await fetch(`${process.env.API_URL}/products`, {
       next: { revalidate: 3600 },
     }).then((r) => r.json());

     const productRoutes: MetadataRoute.Sitemap = products.map((p: { slug: string; updatedAt: string }) => ({
       url: `${siteConfig.url}/products/${p.slug}`,
       lastModified: new Date(p.updatedAt),
       changeFrequency: "monthly" as const,
       priority: 0.8,
     }));

     return [...staticRoutes, ...productRoutes];
     ---------------------------------------------------------- */
  const productRoutes: MetadataRoute.Sitemap = [];
  // TODO: 위 예시 코드 참고하여 실제 제품 URL 목록을 채워 넣으세요.

  return [...staticRoutes, ...productRoutes];
}
