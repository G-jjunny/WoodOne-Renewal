/**
 * 회사 소개 페이지 (/about)
 *
 * SEO 전략:
 *   - "30년 전통", "1994년 설립" 등 신뢰도 지표를 description에 포함
 *   - LocalBusiness 성격의 페이지이므로 나중에 회사 실제 주소 확정 시
 *     LocalBusiness JSON-LD 추가 권장 (현재 Organization으로 대체)
 *   - BreadcrumbList: 홈 > 회사 소개
 *
 * RSC: 서버 컴포넌트
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "우드원은 1994년 설립된 30년 전통의 원목마루 전문 기업입니다. 국내 최고 품질의 원목마루를 직접 제조하며, 고객 만족을 최우선으로 합니다.",
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
      "우드원은 1994년 설립된 30년 전통의 원목마루 전문 기업입니다. 국내 최고 품질의 원목마루를 직접 제조하며, 고객 만족을 최우선으로 합니다.",
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

/* BreadcrumbList: 홈 > 회사 소개 */
const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "회사 소개", href: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-about" />

      {/* 회사 소개 헤더 */}
      <section aria-labelledby="about-page-heading">
        <h1 id="about-page-heading">회사 소개</h1>
        <p>
          우드원은 1994년 설립 이래 30년간 원목마루 전문 기업으로서 고객의
          생활 공간을 아름답게 가꿔왔습니다.
        </p>
      </section>

      {/* 회사 연혁/비전 섹션 — 추후 <CompanyHistory /> 위젯으로 교체 */}
      <section aria-labelledby="history-heading">
        <h2 id="history-heading">우드원의 역사</h2>
      </section>

      {/* 핵심 가치 섹션 — 추후 <CoreValues /> 위젯으로 교체 */}
      <section aria-labelledby="values-heading">
        <h2 id="values-heading">우드원의 가치</h2>
      </section>
    </>
  );
}
