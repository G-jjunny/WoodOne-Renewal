/**
 * Green Forest 제품 목업 데이터
 *
 * 실제 이미지 소재 입고 전까지 사용하는 플레이스홀더 데이터입니다.
 * 이미지는 /public/images/products/ 경로에 위치합니다.
 * 실제 이미지 입고 시 src 경로만 교체하면 됩니다.
 *
 * 총 100개 이상의 샘플 데이터 — 사이즈별(6카테고리) 분류
 *
 * 색상 팔레트:
 *   라이트 오크, 내추럴 오크, 허니 오크, 골든 오크, 스모키 오크
 *   라이트 월넛, 내추럴 월넛, 다크 월넛, 에스프레소 월넛
 *   라이트 체리, 내추럴 체리, 다크 마호가니
 *   화이트 애쉬, 그레이 애쉬, 다크 애쉬
 *   라이트 버치, 내추럴 버치
 *   블리치드 파인, 내추럴 파인
 *
 * 마감:
 *   natural(자연 무광), matte(무광), oiled(오일드), brushed(브러시드)
 */

import type { Product, GreenForestSizeCategory } from "./product.types";

// 목업 이미지 플레이스홀더 생성 헬퍼
function mockImage(slug: string, colorTone: string) {
  return {
    src: `/images/products/green-forest/${slug}.jpg`,
    alt: `Green Forest ${colorTone} 원목마루 샘플`,
    width: 800,
    height: 600,
    isPrimary: true,
  };
}

// 제품 생성 헬퍼 — 반복 코드 최소화
function createProduct(
  id: string,
  sizeCategory: GreenForestSizeCategory,
  width: number,
  colorTone: string,
  finish: Product["finish"],
  sortOrder: number,
  extras: Partial<Product> = {}
): Product {
  const slug = `gf-${sizeCategory.replace("mm", "")}-${id}`;
  return {
    id,
    slug,
    name: `Green Forest ${colorTone} ${sizeCategory}`,
    shortDescription: `${width}mm 폭 ${colorTone} 원목마루 — ${finish === "natural" ? "자연 무광" : finish === "matte" ? "무광" : finish === "oiled" ? "오일드" : "브러시드"} 마감`,
    description: `Green Forest ${colorTone} ${sizeCategory} 원목마루입니다. 폭 ${width}mm, 자연 그대로의 질감을 살린 ${colorTone} 컬러로 공간에 따뜻한 분위기를 연출합니다.`,
    brand: "green-forest",
    category: "solid-wood",
    finish,
    thickness: 18,
    width,
    length: 1820,
    sizeCategory,
    colorTone,
    images: [mockImage(slug, colorTone)],
    features: ["천연 원목 소재", "내구성 강화 코팅", "국내 시공 기사 직접 시공", "A/S 보장"],
    applications: ["거실", "침실", "서재", "상업공간"],
    isNew: sortOrder <= 5,
    isBestSeller: [1, 3, 7, 12, 15].includes(sortOrder),
    sortOrder,
    ...extras,
  };
}

// ============================================================
// 90mm 시리즈 (16개)
// ============================================================
const series90: Product[] = [
  createProduct("gf90-001", "90mm", 90, "라이트 오크",   "natural",  1),
  createProduct("gf90-002", "90mm", 90, "내추럴 오크",   "natural",  2),
  createProduct("gf90-003", "90mm", 90, "허니 오크",     "oiled",    3),
  createProduct("gf90-004", "90mm", 90, "골든 오크",     "oiled",    4),
  createProduct("gf90-005", "90mm", 90, "스모키 오크",   "matte",    5),
  createProduct("gf90-006", "90mm", 90, "라이트 월넛",   "natural",  6),
  createProduct("gf90-007", "90mm", 90, "내추럴 월넛",   "natural",  7),
  createProduct("gf90-008", "90mm", 90, "다크 월넛",     "matte",    8),
  createProduct("gf90-009", "90mm", 90, "화이트 애쉬",   "natural",  9),
  createProduct("gf90-010", "90mm", 90, "그레이 애쉬",   "matte",   10),
  createProduct("gf90-011", "90mm", 90, "다크 애쉬",     "brushed", 11),
  createProduct("gf90-012", "90mm", 90, "라이트 체리",   "oiled",   12),
  createProduct("gf90-013", "90mm", 90, "내추럴 체리",   "oiled",   13),
  createProduct("gf90-014", "90mm", 90, "블리치드 파인", "natural", 14),
  createProduct("gf90-015", "90mm", 90, "내추럴 파인",   "oiled",   15),
  createProduct("gf90-016", "90mm", 90, "다크 마호가니", "matte",   16),
];

// ============================================================
// 120mm 시리즈 (16개)
// ============================================================
const series120: Product[] = [
  createProduct("gf120-001", "120mm", 120, "라이트 오크",   "natural",  1),
  createProduct("gf120-002", "120mm", 120, "내추럴 오크",   "natural",  2),
  createProduct("gf120-003", "120mm", 120, "허니 오크",     "oiled",    3),
  createProduct("gf120-004", "120mm", 120, "골든 오크",     "oiled",    4),
  createProduct("gf120-005", "120mm", 120, "스모키 오크",   "matte",    5),
  createProduct("gf120-006", "120mm", 120, "라이트 월넛",   "natural",  6),
  createProduct("gf120-007", "120mm", 120, "내추럴 월넛",   "brushed",  7),
  createProduct("gf120-008", "120mm", 120, "다크 월넛",     "matte",    8),
  createProduct("gf120-009", "120mm", 120, "에스프레소 월넛","matte",   9),
  createProduct("gf120-010", "120mm", 120, "화이트 애쉬",   "natural", 10),
  createProduct("gf120-011", "120mm", 120, "그레이 애쉬",   "brushed", 11),
  createProduct("gf120-012", "120mm", 120, "라이트 체리",   "oiled",   12),
  createProduct("gf120-013", "120mm", 120, "내추럴 체리",   "oiled",   13),
  createProduct("gf120-014", "120mm", 120, "내추럴 버치",   "natural", 14),
  createProduct("gf120-015", "120mm", 120, "블리치드 파인", "natural", 15),
  createProduct("gf120-016", "120mm", 120, "다크 마호가니", "matte",   16),
];

// ============================================================
// 150mm 시리즈 (18개)
// ============================================================
const series150: Product[] = [
  createProduct("gf150-001", "150mm", 150, "라이트 오크",    "natural",  1),
  createProduct("gf150-002", "150mm", 150, "내추럴 오크",    "natural",  2),
  createProduct("gf150-003", "150mm", 150, "허니 오크",      "oiled",    3),
  createProduct("gf150-004", "150mm", 150, "골든 오크",      "oiled",    4),
  createProduct("gf150-005", "150mm", 150, "스모키 오크",    "matte",    5),
  createProduct("gf150-006", "150mm", 150, "라이트 월넛",    "natural",  6),
  createProduct("gf150-007", "150mm", 150, "내추럴 월넛",    "natural",  7),
  createProduct("gf150-008", "150mm", 150, "다크 월넛",      "matte",    8),
  createProduct("gf150-009", "150mm", 150, "에스프레소 월넛","brushed",  9),
  createProduct("gf150-010", "150mm", 150, "화이트 애쉬",    "natural", 10),
  createProduct("gf150-011", "150mm", 150, "그레이 애쉬",    "matte",   11),
  createProduct("gf150-012", "150mm", 150, "다크 애쉬",      "brushed", 12),
  createProduct("gf150-013", "150mm", 150, "라이트 체리",    "oiled",   13),
  createProduct("gf150-014", "150mm", 150, "내추럴 체리",    "oiled",   14),
  createProduct("gf150-015", "150mm", 150, "라이트 버치",    "natural", 15),
  createProduct("gf150-016", "150mm", 150, "내추럴 버치",    "natural", 16),
  createProduct("gf150-017", "150mm", 150, "블리치드 파인",  "natural", 17),
  createProduct("gf150-018", "150mm", 150, "다크 마호가니",  "matte",   18),
];

// ============================================================
// 180mm 시리즈 (20개)
// ============================================================
const series180: Product[] = [
  createProduct("gf180-001", "180mm", 180, "라이트 오크",    "natural",  1),
  createProduct("gf180-002", "180mm", 180, "내추럴 오크",    "natural",  2),
  createProduct("gf180-003", "180mm", 180, "허니 오크",      "oiled",    3),
  createProduct("gf180-004", "180mm", 180, "골든 오크",      "oiled",    4),
  createProduct("gf180-005", "180mm", 180, "스모키 오크",    "matte",    5),
  createProduct("gf180-006", "180mm", 180, "라이트 월넛",    "natural",  6),
  createProduct("gf180-007", "180mm", 180, "내추럴 월넛",    "brushed",  7),
  createProduct("gf180-008", "180mm", 180, "다크 월넛",      "matte",    8),
  createProduct("gf180-009", "180mm", 180, "에스프레소 월넛","brushed",  9),
  createProduct("gf180-010", "180mm", 180, "모카 월넛",      "matte",   10),
  createProduct("gf180-011", "180mm", 180, "화이트 애쉬",    "natural", 11),
  createProduct("gf180-012", "180mm", 180, "그레이 애쉬",    "matte",   12),
  createProduct("gf180-013", "180mm", 180, "다크 애쉬",      "brushed", 13),
  createProduct("gf180-014", "180mm", 180, "라이트 체리",    "oiled",   14),
  createProduct("gf180-015", "180mm", 180, "내추럴 체리",    "oiled",   15),
  createProduct("gf180-016", "180mm", 180, "다크 체리",      "matte",   16),
  createProduct("gf180-017", "180mm", 180, "라이트 버치",    "natural", 17),
  createProduct("gf180-018", "180mm", 180, "내추럴 버치",    "natural", 18),
  createProduct("gf180-019", "180mm", 180, "블리치드 파인",  "natural", 19),
  createProduct("gf180-020", "180mm", 180, "다크 마호가니",  "matte",   20),
];

// ============================================================
// 190mm 시리즈 (16개)
// ============================================================
const series190: Product[] = [
  createProduct("gf190-001", "190mm", 190, "라이트 오크",    "natural",  1),
  createProduct("gf190-002", "190mm", 190, "내추럴 오크",    "natural",  2),
  createProduct("gf190-003", "190mm", 190, "허니 오크",      "oiled",    3),
  createProduct("gf190-004", "190mm", 190, "골든 오크",      "oiled",    4),
  createProduct("gf190-005", "190mm", 190, "스모키 오크",    "matte",    5),
  createProduct("gf190-006", "190mm", 190, "라이트 월넛",    "natural",  6),
  createProduct("gf190-007", "190mm", 190, "내추럴 월넛",    "brushed",  7),
  createProduct("gf190-008", "190mm", 190, "다크 월넛",      "matte",    8),
  createProduct("gf190-009", "190mm", 190, "에스프레소 월넛","brushed",  9),
  createProduct("gf190-010", "190mm", 190, "화이트 애쉬",    "natural", 10),
  createProduct("gf190-011", "190mm", 190, "그레이 애쉬",    "brushed", 11),
  createProduct("gf190-012", "190mm", 190, "라이트 체리",    "oiled",   12),
  createProduct("gf190-013", "190mm", 190, "내추럴 체리",    "oiled",   13),
  createProduct("gf190-014", "190mm", 190, "라이트 버치",    "natural", 14),
  createProduct("gf190-015", "190mm", 190, "블리치드 파인",  "natural", 15),
  createProduct("gf190-016", "190mm", 190, "다크 마호가니",  "matte",   16),
];

// ============================================================
// 220mm 시리즈 (14개) — 와이드 프리미엄 라인
// ============================================================
const series220: Product[] = [
  createProduct("gf220-001", "220mm", 220, "라이트 오크",    "natural",  1),
  createProduct("gf220-002", "220mm", 220, "내추럴 오크",    "natural",  2),
  createProduct("gf220-003", "220mm", 220, "허니 오크",      "oiled",    3),
  createProduct("gf220-004", "220mm", 220, "골든 오크",      "oiled",    4),
  createProduct("gf220-005", "220mm", 220, "스모키 오크",    "brushed",  5),
  createProduct("gf220-006", "220mm", 220, "내추럴 월넛",    "brushed",  6),
  createProduct("gf220-007", "220mm", 220, "다크 월넛",      "matte",    7),
  createProduct("gf220-008", "220mm", 220, "에스프레소 월넛","matte",    8),
  createProduct("gf220-009", "220mm", 220, "모카 월넛",      "brushed",  9),
  createProduct("gf220-010", "220mm", 220, "화이트 애쉬",    "natural", 10),
  createProduct("gf220-011", "220mm", 220, "그레이 애쉬",    "brushed", 11),
  createProduct("gf220-012", "220mm", 220, "내추럴 체리",    "oiled",   12),
  createProduct("gf220-013", "220mm", 220, "내추럴 버치",    "natural", 13),
  createProduct("gf220-014", "220mm", 220, "다크 마호가니",  "matte",   14),
];

/** 전체 Green Forest 제품 목록 (총 100개) */
export const greenForestProducts: Product[] = [
  ...series90,
  ...series120,
  ...series150,
  ...series180,
  ...series190,
  ...series220,
];

/** 사이즈 카테고리별 제품 필터 */
export function getProductsBySizeCategory(
  sizeCategory: GreenForestSizeCategory
): Product[] {
  return greenForestProducts.filter((p) => p.sizeCategory === sizeCategory);
}

/** slug로 단일 제품 조회 */
export function getProductBySlug(slug: string): Product | undefined {
  return greenForestProducts.find((p) => p.slug === slug);
}

/** ProductSummary 변환 */
export function toProductSummary(product: Product) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    brand: product.brand,
    category: product.category,
    sizeCategory: product.sizeCategory,
    colorTone: product.colorTone,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    width: product.width,
    thickness: product.thickness,
    primaryImage: product.images.find((img) => img.isPrimary) ?? product.images[0],
  };
}

export const GREEN_FOREST_SIZE_CATEGORIES: {
  value: GreenForestSizeCategory;
  label: string;
  count: number;
}[] = [
  { value: "90mm",  label: "폭 90mm",  count: series90.length },
  { value: "120mm", label: "폭 120mm", count: series120.length },
  { value: "150mm", label: "폭 150mm", count: series150.length },
  { value: "180mm", label: "폭 180mm", count: series180.length },
  { value: "190mm", label: "폭 190mm", count: series190.length },
  { value: "220mm", label: "폭 220mm", count: series220.length },
];
