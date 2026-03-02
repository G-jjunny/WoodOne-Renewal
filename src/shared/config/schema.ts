/**
 * Schema.org 구조화 데이터 팩토리
 *
 * Google Rich Results Test 기준으로 검증된 스키마 패턴을 제공합니다.
 * 모든 함수는 JsonLdSchema 타입을 반환하며, <JsonLd> 컴포넌트와 함께 사용합니다.
 *
 * 구현된 스키마:
 *   - Organization   : 루트 레이아웃에서 전역 삽입
 *   - WebSite        : 루트 레이아웃에서 전역 삽입 (SearchAction 포함)
 *   - Product        : 제품 상세 페이지 (generateMetadata와 동일 데이터 소스)
 *   - BreadcrumbList : 중첩 라우트 페이지 공통
 */

import { siteConfig } from "@/shared/config/site";
import type { JsonLdSchema } from "@/shared/ui/json-ld";

/* ============================================================
   Organization 스키마
   루트 레이아웃에 삽입 — 전체 사이트에 단 한 번만 렌더링
   ============================================================ */
export const organizationSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.fullName,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/images/logo.png`,
    width: "200",
    height: "60",
    caption: `${siteConfig.name} 로고`,
  },
  description: siteConfig.description,
  foundingDate: "1994",
  // 전화번호/주소는 실제 영업 정보 확인 후 업데이트 필요
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: "Korean",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: "서울",
  },
  sameAs: [
    // 소셜 미디어 URL 확정 후 채워 넣으세요
    // siteConfig.links.instagram,
    // siteConfig.links.youtube,
    // siteConfig.links.blog,
  ],
};

/* ============================================================
   WebSite 스키마 (SearchAction 포함)
   Sitelinks Searchbox를 Google에 힌트로 제공
   ============================================================ */
export const webSiteSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ko-KR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/products?q={search_term_string}`,
    },
    // schema.org 표준: "query-input" 속성명 그대로 사용
    "query-input": "required name=search_term_string",
  },
};

/* ============================================================
   Product 스키마 생성 함수
   제품 상세 페이지 (app/products/[slug]/page.tsx) 에서 호출
   ============================================================ */
export interface ProductSchemaInput {
  name: string;
  description: string;
  /** 복수 이미지 URL 배열 — 최소 1개 필수 */
  images: string[];
  slug: string;
  /** 가격 (KRW). 견적 문의 형태라면 생략 가능 */
  price?: number;
  /** 재고 상태: InStock | OutOfStock | PreOrder */
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  /** 제품 카테고리 (원목마루, 강마루, 강화마루 등) */
  category?: string;
  /** SKU / 모델번호 */
  sku?: string;
}

export function createProductSchema(input: ProductSchemaInput): JsonLdSchema {
  const productUrl = `${siteConfig.url}/products/${input.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.images,
    url: productUrl,
    ...(input.sku && { sku: input.sku }),
    ...(input.category && { category: input.category }),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    // 가격 정보가 있을 때만 Offer 포함 (없으면 Google 검증 에러 방지)
    ...(input.price !== undefined && {
      offers: {
        "@type": "Offer",
        price: String(input.price),
        priceCurrency: "KRW",
        availability: `https://schema.org/${input.availability ?? "InStock"}`,
        url: productUrl,
        seller: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
    }),
  };
}

/* ============================================================
   BreadcrumbList 스키마 생성 함수
   중첩 라우트 모든 페이지에 삽입 — 홈은 제외
   ============================================================ */
export interface BreadcrumbItem {
  /** 표시할 텍스트 */
  name: string;
  /** 절대 경로 (예: "/products") 또는 전체 URL */
  href: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${siteConfig.url}${item.href}`,
    })),
  };
}
