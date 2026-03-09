/**
 * XML 사이트맵 자동 생성 (app/sitemap.ts)
 *
 * Next.js App Router가 /sitemap.xml 엔드포인트를 자동으로 생성합니다.
 * Google Search Console에 https://woodone.co.kr/sitemap.xml 로 등록하세요.
 *
 * 우선순위(priority) 설계 원칙:
 *   1.0 — 홈: 가장 중요한 단일 진입점
 *   0.8 — 제품 갤러리 / 제품 상세: 전환 목적 핵심 페이지
 *   0.7 — 회사 소개: 신뢰도 형성 페이지
 *   0.6 — 찾아오시는 길: 방문/접근성 정보
 *   0.5 — 문의하기: 전환 페이지
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";
import { greenForestProducts } from "@/entities/product";

const SITE_LAST_MODIFIED = new Date("2026-03-06");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      url: `${siteConfig.url}/about`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/location`,
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

  // Green Forest 제품 상세 페이지 동적 라우트
  const productRoutes: MetadataRoute.Sitemap = greenForestProducts.map((p) => ({
    url: `${siteConfig.url}/products/${p.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
