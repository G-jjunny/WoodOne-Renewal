/**
 * Green Forest 제품 데이터
 *
 * 데이터 소스: src/entities/product/model/sample({size}).json 파일 7종
 * 이미지 경로: /public/images/products/green-forest/{line}mm/{url}
 *
 * JSON 필드 매핑:
 *   index  → 제품 식별자 (slug 생성에 사용, 배열 순서 기반으로 중복 방지)
 *   line   → 폭(mm) 및 폴더명 (예: 125 → "125mm")
 *   name   → 수종 이름 (Oak, Walnut 등)
 *   color  → 컬러/마감 표기 (colorTone으로 매핑)
 *   url    → 이미지 파일명 (대소문자 포함 그대로 사용)
 *   des    → 규격 문자열 "두께x폭x길이" → 파싱하여 thickness/width/length 추출
 *   type   → 시공 특성 (features 배열에 추가)
 */

import type { Product, GreenForestSizeCategory } from "./product.types";

// JSON 데이터 import — Next.js App Router는 빌드 타임 JSON import를 지원
import data70   from "./sample(70).json";
import data90   from "./sample(90).json";
import data125  from "./sample(125).json";
import data150  from "./sample(150).json";
import data165  from "./sample(165).json";
import data190  from "./sample(190).json";
import data240  from "./sample(240).json";

/** JSON 한 항목의 원형 타입 */
interface RawProductEntry {
  index: string;
  line: number;
  name: string;
  color: string;
  url: string;
  des: string;
  type?: string;
}

/**
 * 규격 문자열에서 두께/폭/길이 파싱
 * 입력 예시: "10x125x810", "12(1.2)x190x1900", "10x90x600,900", "14x240x2200"
 * - 괄호 내 소수점 표기 제거 (예: "12(1.2)" → "12")
 * - 콤마 구분 다중 길이는 첫 번째 값 사용 (예: "600,900" → 600)
 */
function parseDimensions(des: string): { thickness: number; width: number; length: number } {
  // 괄호와 그 내용 제거: "12(1.2)" → "12"
  const cleaned = des.replace(/\([^)]*\)/g, "");
  const parts = cleaned.split("x");

  const thickness = parseInt(parts[0] ?? "0", 10) || 0;
  const width     = parseInt(parts[1] ?? "0", 10) || 0;
  // 콤마 구분 다중값의 경우 첫 번째만 사용
  const length    = parseInt((parts[2] ?? "0").split(",")[0], 10) || 0;

  return { thickness, width, length };
}

/**
 * 기본 특징 목록 — 모든 Green Forest 제품 공통
 */
const BASE_FEATURES = [
  "천연 원목 소재",
  "내구성 강화 코팅",
  "국내 시공 기사 직접 시공",
  "A/S 보장",
] as const;

/**
 * JSON 항목 배열을 Product 배열로 변환
 *
 * slug 생성 규칙: gf-{line}mm-{arrayIndex+1}
 * (JSON의 index 필드는 중복이 있어 배열 순서를 사용)
 */
function mapJsonToProducts(entries: RawProductEntry[]): Product[] {
  return entries.map((entry, arrayIndex) => {
    const sizeCategory = `${entry.line}mm` as GreenForestSizeCategory;
    const slug = `gf-${entry.line}mm-${arrayIndex + 1}`;
    const { thickness, width, length } = parseDimensions(entry.des);

    // features: 공통 특징 + type 필드 (헤링본/쉐브론 등)
    const features: string[] = [...BASE_FEATURES];
    if (entry.type) {
      features.push(entry.type);
    }

    // alt 텍스트: "{name} {color} Green Forest 원목마루"
    const altText = `${entry.name} ${entry.color} Green Forest 원목마루`;

    return {
      id: slug,
      slug,
      name: `${entry.name} ${entry.color}`,
      shortDescription: `${entry.line}mm 폭 ${entry.color} 원목마루 — ${entry.des}`,
      description: `Green Forest ${entry.name} ${entry.color} 원목마루입니다. 폭 ${entry.line}mm, 규격 ${entry.des}. 자연 그대로의 질감을 살린 컬러로 공간에 따뜻한 분위기를 연출합니다.`,
      brand: "green-forest",
      category: "solid-wood",
      finish: "natural",
      thickness,
      width: width || entry.line, // des 파싱 실패 시 line 값을 폭으로 사용
      length,
      sizeCategory,
      colorTone: entry.color,
      images: [
        {
          src: `/images/products/green-forest/${entry.line}mm/${entry.url}`,
          alt: altText,
          width: 800,
          height: 600,
          isPrimary: true,
        },
      ],
      features,
      applications: ["거실", "침실", "서재", "상업공간"],
      isNew: false,
      isBestSeller: false,
      sortOrder: arrayIndex + 1,
    };
  });
}

// ============================================================
// 사이즈별 시리즈 생성
// ============================================================
const series70:  Product[] = mapJsonToProducts(data70  as RawProductEntry[]);
const series90:  Product[] = mapJsonToProducts(data90  as RawProductEntry[]);
const series125: Product[] = mapJsonToProducts(data125 as RawProductEntry[]);
const series150: Product[] = mapJsonToProducts(data150 as RawProductEntry[]);
const series165: Product[] = mapJsonToProducts(data165 as RawProductEntry[]);
const series190: Product[] = mapJsonToProducts(data190 as RawProductEntry[]);
const series240: Product[] = mapJsonToProducts(data240 as RawProductEntry[]);

/** 전체 Green Forest 제품 목록 */
export const greenForestProducts: Product[] = [
  ...series70,
  ...series90,
  ...series125,
  ...series150,
  ...series165,
  ...series190,
  ...series240,
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
  { value: "70mm",  label: "폭 70mm",  count: series70.length  },
  { value: "90mm",  label: "폭 90mm",  count: series90.length  },
  { value: "125mm", label: "폭 125mm", count: series125.length },
  { value: "150mm", label: "폭 150mm", count: series150.length },
  { value: "165mm", label: "폭 165mm", count: series165.length },
  { value: "190mm", label: "폭 190mm", count: series190.length },
  { value: "240mm", label: "폭 240mm", count: series240.length },
];
