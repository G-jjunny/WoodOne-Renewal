/**
 * Product 엔티티 타입 정의
 * woodone 핵심 도메인: 원목마루 제품
 *
 * 이 타입은 API 응답, UI 렌더링, SEO 메타데이터 생성에 공통으로 사용됩니다.
 * 변경 시 반드시 product.api.ts의 응답 파싱 로직도 함께 검토하세요.
 */

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

export type Product = {
  id: string;
  slug: string;           // URL slug: /products/[slug]
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  finish: ProductFinish;
  thickness: number;      // mm 단위
  width: number;          // mm 단위
  length: number;         // mm 단위
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
  "id" | "slug" | "name" | "shortDescription" | "category" | "isNew" | "isBestSeller"
> & {
  primaryImage: ProductImage;
};
