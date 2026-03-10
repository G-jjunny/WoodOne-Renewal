"use client";
/**
 * ProductGrid — 갤러리 페이지 인터랙티브 제품 그리드
 *
 * 'use client' 이유:
 *   - 브랜드 탭 전환 (useState)
 *   - Green Forest 사이즈 필터 (useState)
 *   - Ideal Legno 탭 선택 시 외부 링크 처리
 *
 * 데이터는 Server Component(ProductsPage)에서 props로 전달받습니다.
 * 이 컴포넌트 내에 API 호출 없음 — 순수 UI 상태 관리만 담당.
 */

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./ProductCard";
import type { ProductSummary, GreenForestSizeCategory } from "@/entities/product";

interface ProductGridProps {
  products: ProductSummary[];
  sizeCategories: {
    value: GreenForestSizeCategory;
    label: string;
    count: number;
  }[];
}

type BrandTab = "green-forest" | "ideal-legno";

export function ProductGrid({ products, sizeCategories }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<BrandTab>("green-forest");
  const [activeSizeFilter, setActiveSizeFilter] = useState<GreenForestSizeCategory | "all">("all");

  const filteredProducts = activeSizeFilter === "all"
    ? products
    : products.filter((p) => p.sizeCategory === activeSizeFilter);

  return (
    <div>
      {/* 브랜드 탭 */}
      <div
        role="tablist"
        aria-label="브랜드 선택"
        className={cn(
          "flex items-center gap-1 p-1 rounded-xl",
          "bg-espresso-100 border border-espresso-200",
          "w-fit mb-10"
        )}
      >
        {(
          [
            { value: "green-forest", label: "Green Forest" },
            { value: "ideal-legno", label: "Ideal Legno" },
          ] as { value: BrandTab; label: string }[]
        ).map(({ value, label }) => (
          <button
            key={value}
            role="tab"
            aria-selected={activeTab === value}
            onClick={() => setActiveTab(value)}
            className={cn(
              "px-6 py-2.5 rounded-lg text-sm font-semibold",
              "transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-ring",
              activeTab === value
                ? "bg-espresso-800 text-espresso-50 shadow-sm"
                : "text-espresso-600 hover:text-espresso-900 hover:bg-espresso-200"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Green Forest 탭 패널 */}
      {activeTab === "green-forest" && (
        <div role="tabpanel" aria-label="Green Forest 제품 목록">
          {/* 사이즈 필터 */}
          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="사이즈 필터">
            <button
              onClick={() => setActiveSizeFilter("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                "border transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-ring",
                activeSizeFilter === "all"
                  ? "bg-espresso-800 text-espresso-50 border-espresso-800"
                  : "bg-background text-espresso-700 border-espresso-300 hover:border-espresso-500 hover:text-espresso-900"
              )}
            >
              전체 <span className="ml-1 text-xs opacity-70">({products.length})</span>
            </button>
            {sizeCategories.map(({ value, label, count }) => (
              <button
                key={value}
                onClick={() => setActiveSizeFilter(value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  "border transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-ring",
                  activeSizeFilter === value
                    ? "bg-espresso-800 text-espresso-50 border-espresso-800"
                    : "bg-background text-espresso-700 border-espresso-300 hover:border-espresso-500 hover:text-espresso-900"
                )}
              >
                {label} <span className="ml-1 text-xs opacity-70">({count})</span>
              </button>
            ))}
          </div>

          {/* 제품 갯수 표시 */}
          <p className="text-sm text-espresso-500 mb-6">
            총 <strong className="text-espresso-800 font-semibold">{filteredProducts.length}</strong>개 제품
          </p>

          {/* 제품 그리드 */}
          {filteredProducts.length > 0 ? (
            <ul
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              role="list"
              aria-label="제품 목록"
            >
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-20 text-espresso-500">
              <p className="text-base">해당 사이즈의 제품이 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* Ideal Legno 탭 패널 */}
      {activeTab === "ideal-legno" && (
        <div
          role="tabpanel"
          aria-label="Ideal Legno 제품 정보"
          className={cn(
            "rounded-2xl p-12 text-center",
            "bg-gradient-to-br from-espresso-100 to-espresso-50",
            "border border-espresso-200"
          )}
        >
          <div className="max-w-lg mx-auto">
            <div
              className="w-16 h-16 rounded-2xl bg-espresso-200 flex items-center justify-center mx-auto mb-6"
              aria-hidden="true"
            >
              <svg className="w-8 h-8 text-espresso-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4.5M14 4h6m0 0v6m0-6L9 15" />
              </svg>
            </div>
            <h3 className="font-serif font-semibold text-espresso-900 mb-4" style={{ fontSize: "1.5rem" }}>
              Ideal Legno
            </h3>
            <p className="text-espresso-600 leading-relaxed mb-8" style={{ fontSize: "0.9375rem" }}>
              이탈리아 명품 마루 브랜드 Ideal Legno의 전체 제품 라인업은
              공식 사이트에서 확인하실 수 있습니다.
            </p>
            <a
              href="https://www.ideal-legno.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-4 rounded-lg",
                "bg-espresso-800 text-espresso-50",
                "text-sm font-semibold",
                "hover:bg-espresso-900 transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-ring"
              )}
            >
              Ideal Legno 공식 사이트 방문
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4.5M14 4h6m0 0v6m0-6L9 15" />
              </svg>
              <span className="sr-only">(새 탭에서 열림)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
