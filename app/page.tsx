/**
 * 홈페이지 (/)
 *
 * 메타데이터:
 *   - title: layout의 default 값 사용 (template을 거치지 않고 fullName 그대로 노출)
 *   - canonical: self-referencing
 *
 * JSON-LD:
 *   - Organization / WebSite는 layout.tsx에서 전역 삽입됨 — 중복 삽입 금지
 *
 * RSC: 'use client' 없음
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { HeroSection } from "@/widgets/hero-section";
import { AboutSection } from "@/widgets/about-section";
import { BrandsSection } from "@/widgets/brands-section";
import { ServicesSection } from "@/widgets/services-section";
import { CtaSection } from "@/widgets/cta-section";

export const metadata: Metadata = {
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

export default function HomePage() {
  return (
    <>
      {/* 히어로 — 브랜드 슬로건 + SINCE 1996 */}
      <HeroSection />

      {/* 회사 소개 — 원문 문구 포함 */}
      <AboutSection />

      {/* 두 브랜드 소개 — Green Forest / Ideal Legno */}
      <BrandsSection />

      {/* 주요 서비스 — 시공, 컨설팅, 인테리어, A/S */}
      <ServicesSection />

      {/* 하단 CTA — 문의하기 */}
      <CtaSection />
    </>
  );
}
