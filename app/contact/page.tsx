/**
 * 문의하기 페이지 (/contact)
 *
 * SEO 전략:
 *   - 문의 페이지는 전환(conversion) 목적 — "견적 문의", "상담" 키워드 포함
 *   - robots: index=true, follow=true 유지 (폼 자체는 크롤 가능, 제출 결과 페이지만 차단)
 *   - BreadcrumbList: 홈 > 문의하기
 *
 * 주의: 폼 제출 후 이동하는 /contact/complete 같은 페이지는
 *   robots: { index: false }로 설정하여 중복 전환 페이지 색인 방지
 *
 * RSC: 서버 컴포넌트
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "우드원 원목마루 제품 상담 및 견적 문의를 남겨주세요. 전문 상담사가 빠르게 답변해 드립니다. 시공 견적, 제품 선택, 납기 등 궁금한 사항을 문의하세요.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
    languages: {
      "ko-KR": `${siteConfig.url}/contact`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/contact`,
    title: "문의하기 | 우드원",
    description:
      "우드원 원목마루 제품 상담 및 견적 문의를 남겨주세요. 전문 상담사가 빠르게 답변해 드립니다.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "우드원 문의하기",
      },
    ],
  },
};

/* BreadcrumbList: 홈 > 문의하기 */
const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "문의하기", href: "/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-contact" />

      {/* 문의하기 헤더 */}
      <section aria-labelledby="contact-page-heading">
        <h1 id="contact-page-heading">문의하기</h1>
        <p>
          제품 선택부터 시공 견적까지, 우드원 전문 상담사가 도와드립니다.
          아래 양식을 작성하시면 빠르게 답변해 드립니다.
        </p>
      </section>

      {/* 문의 폼 — 추후 <ContactForm /> 위젯으로 교체 */}
      {/*
        ContactForm은 폼 상태 관리가 필요하므로 'use client' Client Component로 구현됩니다.
        단, 이 페이지 컴포넌트 자체는 RSC를 유지합니다.
      */}
      <section aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading">상담 문의 양식</h2>
        {/* <ContactForm /> */}
      </section>
    </>
  );
}
