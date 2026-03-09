/**
 * 회사 소개 페이지 (/about)
 *
 * RSC: 서버 컴포넌트
 *
 * SEO:
 *   - SINCE 1996 / 창업연도 명시
 *   - BreadcrumbList: 홈 > 회사 소개
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";
import { Container } from "@/shared/ui/container";
import { CompanyIntroSection } from "@/widgets/company-intro";

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "우드원은 1996년 설립된 원목마루 전문 기업입니다. 이탈리아 명품 Ideal Legno 수입 유통과 Green Forest 제품 판매를 통해 고객의 아름다운 생활공간을 창조합니다.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
    languages: {
      "ko-KR": `${siteConfig.url}/about`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about`,
    title: "회사 소개 | 우드원",
    description:
      "1996년 설립. 이탈리아 명품 Ideal Legno 수입 유통 + Green Forest 원목마루 전문 판매.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "우드원 회사 소개",
      },
    ],
  },
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "회사 소개", href: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-about" />

      {/* 페이지 헤더 */}
      <section
        aria-labelledby="about-page-heading"
        className="py-16 bg-espresso-950"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-espresso-400 mb-3">
              Since 1996
            </p>
            <h1
              id="about-page-heading"
              className="font-serif font-semibold text-espresso-50"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", lineHeight: 1.2 }}
            >
              회사 소개
            </h1>
          </div>
        </Container>
      </section>

      {/* 회사 소개 전체 콘텐츠 */}
      <CompanyIntroSection />
    </>
  );
}
