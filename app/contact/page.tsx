/**
 * 문의하기 페이지 (/contact)
 *
 * RSC: 서버 컴포넌트
 * ContactForm (Client Component)을 import하여 렌더링
 *
 * SEO:
 *   - BreadcrumbList: 홈 > 문의하기
 *   - robots: index=true (전환 페이지)
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { companyInfo } from "@/shared/config/company";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";
import { Container } from "@/shared/ui/container";
import { ContactForm } from "@/features/contact-form";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "우드원 원목마루 제품 상담 및 시공 견적 문의. 성함, 연락처, 현장 위치를 남겨주시면 전문 상담사가 신속하게 답변해 드립니다.",
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
    description: "원목마루 시공 견적, 제품 상담, 납기 등 궁금한 사항을 문의해 주세요.",
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

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "문의하기", href: "/contact" },
]);

const CONTACT_INFO = [
  {
    label: "전화",
    value: companyInfo.tel,
    href: `tel:${companyInfo.tel.replace(/-/g, "")}`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "이메일",
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "주소",
    value: `${companyInfo.address.sido} ${companyInfo.address.full}`,
    href: "/location",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-contact" />

      {/* 페이지 헤더 */}
      <section
        aria-labelledby="contact-page-heading"
        className="py-16 bg-espresso-950"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-espresso-400 mb-3">
              Contact Us
            </p>
            <h1
              id="contact-page-heading"
              className="font-serif font-semibold text-espresso-50 mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", lineHeight: 1.2 }}
            >
              문의하기
            </h1>
            <p className="text-espresso-300 leading-relaxed" style={{ fontSize: "0.9375rem" }}>
              시공 견적, 제품 선택 상담, 납기 등 궁금한 사항을 남겨주시면
              전문 상담사가 신속하게 답변해 드립니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 본문 */}
      <section
        aria-label="문의 양식 및 연락처"
        className="py-16 lg:py-24 bg-background"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* 좌측: 연락처 정보 */}
            <aside aria-label="연락처 정보">
              <h2 className="text-base font-semibold text-espresso-900 mb-6">연락처</h2>

              <ul className="space-y-5" role="list">
                {CONTACT_INFO.map(({ label, value, href, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={cn(
                        "flex items-start gap-4",
                        "group",
                        href.startsWith("/") ? "" : "hover:underline"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg shrink-0",
                          "bg-espresso-100 text-espresso-700",
                          "flex items-center justify-center",
                          "group-hover:bg-espresso-200 transition-colors duration-150"
                        )}
                        aria-hidden="true"
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-espresso-500 mb-0.5">{label}</p>
                        <p className="text-sm text-espresso-800">{value}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {/* 영업시간 */}
              <div className="mt-10 p-5 rounded-xl bg-espresso-50 border border-espresso-200">
                <h3 className="text-sm font-semibold text-espresso-800 mb-3">영업시간</h3>
                <dl className="space-y-1 text-sm text-espresso-600">
                  <div className="flex justify-between">
                    <dt>평일</dt>
                    <dd>{companyInfo.hours.weekday}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>토요일</dt>
                    <dd>{companyInfo.hours.saturday}</dd>
                  </div>
                  <div className="flex justify-between text-espresso-400">
                    <dt>일요일 / 공휴일</dt>
                    <dd>{companyInfo.hours.holiday}</dd>
                  </div>
                </dl>
              </div>
            </aside>

            {/* 우측: 문의 폼 (2열) */}
            <div className="lg:col-span-2">
              <h2 className="text-base font-semibold text-espresso-900 mb-6" id="contact-form-heading">
                상담 문의 양식
              </h2>
              {/*
                ContactForm은 useActionState/useFormStatus가 필요한 Client Component.
                페이지 자체는 RSC 유지.
              */}
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
