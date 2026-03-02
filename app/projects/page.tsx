/**
 * 시공 사례 페이지 (/projects)
 *
 * SEO 전략:
 *   - description: "시공 사례" + "아파트/주택/상업 공간" 등 타깃 검색어 포함
 *   - BreadcrumbList: 홈 > 시공 사례
 *   - 시공 사례는 거래 의향 있는 유저(상업적 의도)가 탐색하는 페이지이므로
 *     구체적 공간 유형 키워드를 description에 포함하여 CTR 최적화
 *
 * RSC: 서버 컴포넌트
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";

export const metadata: Metadata = {
  title: "시공 사례",
  description:
    "우드원 원목마루 시공 사례를 확인하세요. 아파트, 단독주택, 펜션, 상업 공간 등 다양한 환경에서 완성된 프리미엄 마루 시공 결과를 사진으로 만나보세요.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
    languages: {
      "ko-KR": `${siteConfig.url}/projects`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: "시공 사례 | 우드원",
    description:
      "우드원 원목마루 시공 사례를 확인하세요. 아파트, 단독주택, 펜션, 상업 공간 등 다양한 환경에서 완성된 프리미엄 마루 시공 결과를 사진으로 만나보세요.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "우드원 시공 사례",
      },
    ],
  },
};

/* BreadcrumbList: 홈 > 시공 사례 */
const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "시공 사례", href: "/projects" },
]);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-projects" />

      {/* 시공 사례 헤더 */}
      <section aria-labelledby="projects-page-heading">
        <h1 id="projects-page-heading">시공 사례</h1>
        <p>
          우드원이 시공한 다양한 공간을 확인하세요. 아파트, 단독주택, 상업
          공간에서의 실제 시공 결과물을 사진으로 만나보실 수 있습니다.
        </p>
      </section>

      {/* 시공 사례 갤러리 — 추후 <ProjectGallery /> 위젯으로 교체 */}
      <section aria-label="시공 사례 갤러리">
        {/* 시공 사례 카드 컴포넌트로 채워질 영역 */}
      </section>
    </>
  );
}
