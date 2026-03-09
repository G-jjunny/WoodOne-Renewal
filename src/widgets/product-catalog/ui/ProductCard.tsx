/**
 * ProductCard — Green Forest 제품 카드
 *
 * RSC: 서버 컴포넌트
 * next/image 필수 사용 (CLAUDE.md 규정)
 *
 * 디자인 v2:
 *   - card-product 컴포넌트 클래스 적용 (shadow-card-hover, translateY)
 *   - rounded-xl → rounded-sm (2px)
 *   - 이미지 aspect-ratio: 3/4 (세로형) — 원목 제품 특성상 더 자연스러움
 *   - 배지: 기존 bg-espresso-700/bg-espresso-400 → espresso/brass
 *   - 스펙 태그: 태그 제거 → 텍스트 레이블로 전환
 */

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { ProductSummary } from "@/entities/product";

interface ProductCardProps {
  product: ProductSummary;
}

/**
 * 1x1 픽셀 따뜻한 크림 GIF — 실제 이미지 로드 전 블러 플레이스홀더
 */
const PLACEHOLDER_BLUR_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP/v5MAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "card-product group block",
        "focus-visible:outline-2 focus-visible:outline-ring"
      )}
      aria-label={`${product.name} 상세 보기`}
    >
      {/* 이미지 영역 — 세로형 비율 */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "4/5",
          backgroundColor: "var(--espresso-100)",
        }}
      >
        <Image
          src={product.primaryImage.src}
          alt={product.primaryImage.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR_DATA_URL}
          className={cn(
            "object-cover",
            // 호버 줌: 더 느리게 — 고급 브랜드는 빠른 애니메이션 금지
            "group-hover:scale-[1.04] transition-transform duration-[600ms]",
            "ease-out"
          )}
        />

        {/* 배지 — NEW / BEST */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {product.isNew && (
            <span
              className="px-2.5 py-1 font-medium tracking-widest uppercase"
              style={{
                fontSize: "var(--text-overline)",
                backgroundColor: "var(--espresso-800)",
                color: "var(--espresso-50)",
                borderRadius: "var(--radius-sm)",
                letterSpacing: "var(--tracking-widest)",
              }}
            >
              New
            </span>
          )}
          {product.isBestSeller && (
            <span
              className="px-2.5 py-1 font-medium tracking-widest uppercase"
              style={{
                fontSize: "var(--text-overline)",
                backgroundColor: "var(--brass-main)",
                color: "var(--espresso-950)",
                borderRadius: "var(--radius-sm)",
                letterSpacing: "var(--tracking-widest)",
              }}
            >
              Best
            </span>
          )}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="p-5">
        {/* 컬러 톤 */}
        {product.colorTone && (
          <p
            className="mb-1 font-medium uppercase text-neutral-400"
            style={{
              fontSize: "var(--text-overline)",
              letterSpacing: "var(--tracking-widest)",
            }}
          >
            {product.colorTone}
          </p>
        )}

        {/* 제품명 */}
        <h3
          className={cn(
            "font-semibold text-foreground mb-3",
            "group-hover:text-espresso-700",
            "transition-colors duration-[150ms]",
            "leading-snug"
          )}
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          {product.name}
        </h3>

        {/* 스펙 — 태그 없이 텍스트 레이블 */}
        <div
          className="flex items-center gap-4 text-neutral-400"
          style={{
            fontSize: "var(--text-overline)",
            letterSpacing: "var(--tracking-wider)",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span>{product.width}mm</span>
          <span aria-hidden="true" style={{ color: "var(--neutral-300)" }}>·</span>
          <span>T{product.thickness}mm</span>
        </div>
      </div>
    </Link>
  );
}
