/**
 * BrandsSection — 홈페이지 두 브랜드 소개 섹션
 *
 * RSC: 서버 컴포넌트
 *
 * 디자인 v2:
 *   - 배경: neutral-100 (극도로 연한 그레이) — background와 구별
 *   - 카드 레이아웃:
 *     Green Forest: 에스프레소 950 다크 배경 (존재감)
 *     Ideal Legno:  순백 카드 (공기감, 이탈리아 감성)
 *   - rounded-2xl 제거 → rounded-sm (2px)
 *   - 장식 blur 원형 제거 → 실선 테두리 강조
 *   - 태그: 작고 절제된 텍스트 레이블
 */

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { cn } from "@/shared/lib/utils";

export function BrandsSection() {
  return (
    <section
      aria-labelledby="brands-section-heading"
      className="section-padding"
      style={{ backgroundColor: "var(--neutral-100)" }}
    >
      <Container>
        {/* 섹션 헤더 */}
        <div className="mb-16">
          <p className="overline-label mb-6">Our Brands</p>
          <div className="section-divider" aria-hidden="true" />
          <h2
            id="brands-section-heading"
            className="text-foreground"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "-0.02em",
            }}
          >
            취급 브랜드
          </h2>
          <p
            className="mt-4 text-neutral-500 max-w-md"
            style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-relaxed)" }}
          >
            대중적 원목마루부터 이탈리아 명품 마루까지,
            고객 니즈에 맞는 최선의 선택을 제안합니다.
          </p>
        </div>

        {/* 브랜드 카드 2열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Green Forest — 다크 카드 */}
          <article
            className={cn(
              "group relative overflow-hidden",
              "bg-espresso-950",
              "border border-espresso-800/60",
              "rounded-sm",
              "p-10 lg:p-12 flex flex-col",
              "transition-shadow duration-[400ms]",
              "hover:shadow-card-hover"
            )}
            aria-label="Green Forest 브랜드"
          >
            <div className="flex flex-col h-full">
              {/* 브랜드 배지 */}
              <div className="badge-brand mb-8" style={{ borderColor: "oklch(0.28 0.055 45 / 0.6)", color: "var(--brass-mid)" }}>
                대중적 프리미엄
              </div>

              {/* 브랜드명 */}
              <h3
                className="font-serif font-light text-espresso-50 mb-5"
                style={{ fontSize: "var(--text-h2)", lineHeight: "var(--leading-tight)", letterSpacing: "-0.02em" }}
              >
                Green Forest
              </h3>

              {/* 설명 */}
              <p
                className="text-neutral-500 leading-relaxed mb-8 flex-1"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-relaxed)" }}
              >
                다양한 수종과 컬러, 6가지 사이즈 카테고리로 구성된 원목마루 라인업.
                100가지 이상의 샘플로 공간과 예산에 맞는 최적의 제품을 선택하세요.
              </p>

              {/* 특징 레이블 */}
              <div
                className="flex flex-wrap gap-x-6 gap-y-1 mb-10"
                style={{
                  fontSize: "var(--text-overline)",
                  letterSpacing: "var(--tracking-widest)",
                  textTransform: "uppercase",
                  color: "var(--neutral-600)",
                  fontWeight: 500,
                }}
              >
                {["100+ 샘플", "6가지 폭", "합리적 가격"].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/products?brand=green-forest"
                className="btn-ghost-light self-start"
              >
                제품 갤러리
                <svg
                  className="ml-2 w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>

          {/* Ideal Legno — 라이트 카드 */}
          <article
            className={cn(
              "group relative overflow-hidden",
              "bg-card",
              "border border-border",
              "rounded-sm",
              "p-10 lg:p-12 flex flex-col",
              "transition-shadow duration-[400ms]",
              "hover:shadow-card-hover"
            )}
            aria-label="Ideal Legno 브랜드"
          >
            <div className="flex flex-col h-full">
              {/* 브랜드 배지 */}
              <div className="badge-brand mb-8">
                이탈리아 명품
              </div>

              {/* 브랜드명 */}
              <h3
                className="font-serif font-light text-foreground mb-5"
                style={{ fontSize: "var(--text-h2)", lineHeight: "var(--leading-tight)", letterSpacing: "-0.02em" }}
              >
                Ideal Legno
              </h3>

              {/* 설명 */}
              <p
                className="text-neutral-600 leading-relaxed mb-8 flex-1"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-relaxed)" }}
              >
                이탈리아 장인 기술로 탄생한 명품 원목마루.
                최고급 유럽 원목 소재와 혁신적인 가공 기술로
                공간을 예술 작품으로 완성합니다.
              </p>

              {/* 특징 레이블 */}
              <div
                className="flex flex-wrap gap-x-6 gap-y-1 mb-10"
                style={{
                  fontSize: "var(--text-overline)",
                  letterSpacing: "var(--tracking-widest)",
                  textTransform: "uppercase",
                  color: "var(--neutral-400)",
                  fontWeight: 500,
                }}
              >
                {["이탈리아 생산", "프리미엄 소재", "독점 수입"].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {/* CTA — 외부 링크 */}
              <a
                href="https://www.ideal-legno.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary self-start"
              >
                공식 사이트 방문
                <svg
                  className="ml-2 w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4.5M14 4h6m0 0v6m0-6L9 15" />
                </svg>
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
