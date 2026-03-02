/**
 * 제품 목록 페이지 (/products)
 *
 * SEO 전략:
 *   - title: "제품 소개 | 우드원" — layout template 적용
 *   - description: 카테고리 키워드(원목마루, 강마루, 강화마루)를 자연스럽게 포함
 *   - canonical: /products (필터/정렬 파라미터가 붙더라도 클린 URL 가리킴)
 *   - BreadcrumbList: 홈 > 제품 소개
 *
 * RSC: 서버 컴포넌트
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";

export const metadata: Metadata = {
  title: "제품 소개",
  description:
    "우드원의 원목마루, 강마루, 강화마루 제품 라인업을 확인하세요. 30년 노하우로 제조한 프리미엄 바닥재를 직접 비교하고 선택할 수 있습니다.",
  alternates: {
    canonical: `${siteConfig.url}/products`,
    languages: {
      "ko-KR": `${siteConfig.url}/products`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/products`,
    title: "제품 소개 | 우드원",
    description:
      "우드원의 원목마루, 강마루, 강화마루 제품 라인업을 확인하세요. 30년 노하우로 제조한 프리미엄 바닥재를 직접 비교하고 선택할 수 있습니다.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "우드원 제품 소개",
      },
    ],
  },
};

/* BreadcrumbList: 홈 > 제품 소개 */
const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "제품 소개", href: "/products" },
]);

export default function ProductsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-products" />

      {/* 제품 목록 헤더 */}
      <section aria-labelledby="products-page-heading">
        <h1 id="products-page-heading">제품 소개</h1>
        <p>
          우드원의 프리미엄 바닥재 제품 라인업입니다. 원목마루, 강마루,
          강화마루 중 공간과 용도에 맞는 제품을 선택하세요.
        </p>
      </section>

      {/* 제품 그리드 — 추후 <ProductGrid /> 위젯으로 교체 */}
      <section aria-label="제품 목록">
        {/* 제품 카드 컴포넌트로 채워질 영역 */}
      </section>
    </>
  );
}
