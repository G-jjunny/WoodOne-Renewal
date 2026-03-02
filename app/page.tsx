/**
 * 홈페이지 (/)
 *
 * 메타데이터:
 *   - title: layout의 default 값 사용 (template을 거치지 않고 fullName 그대로 노출)
 *   - canonical: self-referencing (루트 레이아웃에서도 설정하지만 페이지 레벨에서 명시적 오버라이드)
 *
 * JSON-LD:
 *   - Organization / WebSite는 layout.tsx에서 전역 삽입됨 — 중복 삽입 금지
 *
 * RSC: 'use client' 없음
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";

/* ============================================================
   홈 메타데이터
   title을 string으로 직접 지정하면 layout template을 우회하여
   "우드원 - 원목마루 전문 기업" 그대로 노출됩니다.
   ============================================================ */
export const metadata: Metadata = {
  // 홈은 브랜드명을 풀네임으로 노출 — template 적용 안 함
  title: siteConfig.fullName,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "ko-KR": siteConfig.url,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.fullName,
    description: siteConfig.description,
  },
};

/* ============================================================
   홈 페이지 컴포넌트
   실제 UI 섹션(Hero, Features, Products 등)은 추후 위젯으로 채워집니다.
   현재는 Lighthouse SEO 감사 통과에 필요한 H1 구조와 의미론적 마크업만 구성합니다.
   ============================================================ */
export default function HomePage() {
  return (
    <>
      {/* Hero 섹션 — 추후 <HeroSection /> 위젯으로 교체 */}
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading">
          30년 전통의 원목마루 전문 기업, 우드원
        </h1>
        <p>
          국내산 원목마루, 강마루, 강화마루 등 프리미엄 바닥재를 직접 제조하고
          공급합니다.
        </p>
      </section>

      {/* 제품 소개 섹션 — 추후 <FeaturedProducts /> 위젯으로 교체 */}
      <section aria-labelledby="products-heading">
        <h2 id="products-heading">주요 제품</h2>
      </section>

      {/* 시공 사례 섹션 — 추후 <ProjectsPreview /> 위젯으로 교체 */}
      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">시공 사례</h2>
      </section>

      {/* 브랜드 소개 섹션 — 추후 <AboutPreview /> 위젯으로 교체 */}
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">우드원 소개</h2>
      </section>
    </>
  );
}
