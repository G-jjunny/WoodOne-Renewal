/**
 * Product 엔티티 타입 정의
 * woodone 핵심 도메인: 원목마루 제품
 *
 * 이 타입은 API 응답, UI 렌더링, SEO 메타데이터 생성에 공통으로 사용됩니다.
 * 변경 시 반드시 product.api.ts의 응답 파싱 로직도 함께 검토하세요.
 */

export type ProductBrand = "green-forest" | "ideal-legno";

export type ProductCategory =
  | "solid-wood"       // 원목마루
  | "engineered-wood"  // 강마루
  | "laminate"         // 강화마루
  | "vinyl";           // LVT (럭셔리 비닐 타일)

export type ProductFinish =
  | "natural"    // 자연 무광
  | "glossy"     // 유광
  | "matte"      // 무광
  | "brushed"    // 브러시드
  | "oiled";     // 오일드

/**
 * Green Forest 제품 사이즈 카테고리
 * 원목 사이즈 기준 필터링에 사용 (mm 단위 표기)
 */
export type GreenForestSizeCategory =
  | "90mm"    // 90mm 폭 시리즈
  | "120mm"   // 120mm 폭 시리즈
  | "150mm"   // 150mm 폭 시리즈
  | "180mm"   // 180mm 폭 시리즈
  | "190mm"   // 190mm 폭 시리즈
  | "220mm";  // 220mm 폭 시리즈

export type Product = {
  id: string;
  slug: string;           // URL slug: /products/[slug]
  name: string;
  shortDescription: string;
  description: string;
  brand: ProductBrand;
  category: ProductCategory;
  finish: ProductFinish;
  thickness: number;      // mm 단위
  width: number;          // mm 단위
  length: number;         // mm 단위
  /** Green Forest 전용 사이즈 카테고리 */
  sizeCategory?: GreenForestSizeCategory;
  /** 색상/톤 표현 (예: "라이트 오크", "다크 월넛") */
  colorTone?: string;
  images: ProductImage[];
  features: string[];     // 주요 특징 목록
  applications: string[]; // 적용 공간 (거실, 침실, 상업공간 등)
  isNew: boolean;
  isBestSeller: boolean;
  sortOrder: number;
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
};

export type ProductSummary = Pick<
  Product,
  "id" | "slug" | "name" | "shortDescription" | "brand" | "category" | "sizeCategory" | "colorTone" | "isNew" | "isBestSeller" | "width" | "thickness"
> & {
  primaryImage: ProductImage;
};
