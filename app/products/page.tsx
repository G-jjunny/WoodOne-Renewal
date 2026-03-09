/**
 * 갤러리 페이지 (/products)
 *
 * RSC: 서버 컴포넌트
 * 제품 데이터는 서버에서 로드하여 Client Component(ProductGrid)에 props로 전달
 *
 * SEO:
 *   - BreadcrumbList: 홈 > 갤러리
 *   - canonical: /products
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";
import { Container } from "@/shared/ui/container";
import { ProductGrid } from "@/widgets/product-catalog";
import {
  greenForestProducts,
  toProductSummary,
  GREEN_FOREST_SIZE_CATEGORIES,
} from "@/entities/product";

export const metadata: Metadata = {
  title: "제품 갤러리",
  description:
    "우드원 원목마루 갤러리. Green Forest 100가지 이상 샘플과 이탈리아 명품 Ideal Legno 제품을 확인하세요. 폭 90mm~220mm까지 다양한 사이즈와 색상을 비교할 수 있습니다.",
  alternates: {
    canonical: `${siteConfig.url}/products`,
    languages: {
      "ko-KR": `${siteConfig.url}/products`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/products`,
    title: "제품 갤러리 | 우드원",
    description:
      "Green Forest 100가지 이상 원목마루 샘플. 폭 90mm~220mm 사이즈 필터로 원하는 제품을 찾아보세요.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "우드원 제품 갤러리",
      },
    ],
  },
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "제품 갤러리", href: "/products" },
]);

export default function ProductsPage() {
  // Server Component에서 데이터 준비 — Client Component에 직렬화 가능한 형태로 전달
  const productSummaries = greenForestProducts.map(toProductSummary);

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-products" />

      {/* 페이지 헤더 */}
      <section
        aria-labelledby="products-page-heading"
        className="py-16 bg-espresso-950"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-espresso-400 mb-3">
              Gallery
            </p>
            <h1
              id="products-page-heading"
              className="font-serif font-semibold text-espresso-50 mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", lineHeight: 1.2 }}
            >
              제품 갤러리
            </h1>
            <p className="text-espresso-300 leading-relaxed" style={{ fontSize: "0.9375rem" }}>
              Green Forest 100가지 이상의 원목마루 샘플과 이탈리아 명품 Ideal Legno 제품을 확인하세요.
              사이즈별, 색상별로 원하는 제품을 찾아보실 수 있습니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 제품 그리드 — 인터랙티브 필터 포함 */}
      <section
        aria-label="제품 목록"
        className="py-16 bg-background"
      >
        <Container>
          <ProductGrid
            products={productSummaries}
            sizeCategories={GREEN_FOREST_SIZE_CATEGORIES}
          />
        </Container>
      </section>
    </>
  );
}
