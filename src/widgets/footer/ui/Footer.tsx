/**
 * Footer — 전역 사이트 푸터
 *
 * RSC: 서버 컴포넌트 (인터랙션 없음)
 *
 * 디자인 v2:
 *   - 배경: espresso-950 오프블랙 (헤더/CTA와 수미상관)
 *   - 로고: 헤더와 동일한 워드마크 패턴
 *   - 링크: 미세한 opacity 전환만 (밑줄 없음)
 *   - 구분선: 1px, espresso-800 (기존보다 더 섬세)
 *   - 법적정보: 최소화된 텍스트
 */

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { siteConfig } from "@/shared/config/site";
import { companyInfo } from "@/shared/config/company";
import { cn } from "@/shared/lib/utils";

const FOOTER_LINKS = [
  {
    title: "제품",
    items: [
      { label: "제품 갤러리", href: "/products" },
      { label: "Green Forest", href: "/products?brand=green-forest" },
      { label: "Ideal Legno", href: "https://www.ideal-legno.com" },
    ],
  },
  {
    title: "회사",
    items: [
      { label: "회사 소개", href: "/about" },
      { label: "회사 연혁", href: "/about#history" },
      { label: "브랜드 스토리", href: "/about#brands" },
    ],
  },
  {
    title: "고객 지원",
    items: [
      { label: "문의하기", href: "/contact" },
      { label: "찾아오시는 길", href: "/location" },
    ],
  },
] as const;


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-espresso-950"
      aria-label="사이트 푸터"
    >
      <Container>
        <div className="py-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* 브랜드 영역 — 4컬럼 */}
          <div className="lg:col-span-4">
            {/* 워드마크 — 헤더와 동일 패턴 */}
            <Link
              href="/"
              aria-label="우드원 홈으로 이동"
              className="inline-flex items-end gap-2 group mb-6"
            >
              <span
                className={cn(
                  "font-serif font-light",
                  "text-[1.375rem] leading-none tracking-tight",
                  "text-espresso-50",
                  "transition-colors duration-[250ms]",
                  "group-hover:text-espresso-300"
                )}
              >
                우드원
              </span>
              <span
                className={cn(
                  "text-[0.5625rem] font-medium tracking-[0.22em] uppercase",
                  "text-neutral-700 leading-none mb-[0.1875rem]",
                  "transition-colors duration-[250ms]",
                  "group-hover:text-neutral-500"
                )}
              >
                Woodone
              </span>
            </Link>

            {/* 슬로건 */}
            <p
              className="text-neutral-700 leading-relaxed mb-8"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              30년 전통의 원목마루 전문 기업.
              <br />
              자연의 따뜻함을 공간에 담습니다.
            </p>

            {/* SNS 링크 */}
            {(siteConfig.links.instagram || siteConfig.links.youtube || siteConfig.links.blog) && (
              <div className="flex items-center gap-2" aria-label="소셜 미디어">
                {siteConfig.links.instagram && (
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="우드원 인스타그램"
                    className={cn(
                      "w-8 h-8 flex items-center justify-center",
                      "border border-espresso-800",
                      "text-neutral-600",
                      "hover:border-espresso-600 hover:text-neutral-300",
                      "transition-colors duration-[150ms]",
                      "rounded-sm"
                    )}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                )}
                {siteConfig.links.youtube && (
                  <a
                    href={siteConfig.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="우드원 유튜브"
                    className={cn(
                      "w-8 h-8 flex items-center justify-center",
                      "border border-espresso-800",
                      "text-neutral-600",
                      "hover:border-espresso-600 hover:text-neutral-300",
                      "transition-colors duration-[150ms]",
                      "rounded-sm"
                    )}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 링크 섹션 — 8컬럼 */}
          <nav
            aria-label="푸터 링크"
            className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3
                  className="font-medium uppercase text-neutral-700 mb-5"
                  style={{
                    fontSize: "var(--text-overline)",
                    letterSpacing: "var(--tracking-widest)",
                  }}
                >
                  {group.title}
                </h3>
                <ul className="space-y-3" role="list">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-neutral-600",
                          "hover:text-espresso-200",
                          "transition-colors duration-[150ms]"
                        )}
                        style={{ fontSize: "var(--text-body-sm)" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      {/* 구분선 */}
      <div
        style={{ borderTop: "1px solid var(--espresso-900)" }}
        aria-hidden="true"
      />

      {/* 법적 정보 & 저작권 */}
      <Container>
        <div className="py-8">
          <address
            className={cn(
              "not-italic text-neutral-700",
              "flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1",
              "mb-4"
            )}
            style={{ fontSize: "var(--text-overline)" }}
          >
            <span>{companyInfo.legalName}</span>
            <span className="hidden sm:inline text-espresso-900" aria-hidden="true">|</span>
            <span>대표: {companyInfo.ceo}</span>
            <span className="hidden sm:inline text-espresso-900" aria-hidden="true">|</span>
            <span>사업자등록번호: {companyInfo.businessNumber}</span>
            <span className="hidden sm:inline text-espresso-900" aria-hidden="true">|</span>
            <span>{companyInfo.address.sido} {companyInfo.address.full}</span>
            <span className="hidden sm:inline text-espresso-900" aria-hidden="true">|</span>
            <span>
              <span className="sr-only">전화: </span>
              <a
                href={`tel:${companyInfo.tel.replace(/-/g, "")}`}
                className="hover:text-neutral-400 transition-colors duration-[150ms]"
              >
                {companyInfo.tel}
              </a>
            </span>
            <span className="hidden sm:inline text-espresso-900" aria-hidden="true">|</span>
            <span>
              <span className="sr-only">이메일: </span>
              <a
                href={`mailto:${companyInfo.email}`}
                className="hover:text-neutral-400 transition-colors duration-[150ms]"
              >
                {companyInfo.email}
              </a>
            </span>
          </address>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-espresso-900"
              style={{ fontSize: "var(--text-overline)" }}
            >
              &copy; {currentYear} {companyInfo.legalName}. All rights reserved.
            </p>
            <nav aria-label="법적 링크" className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-neutral-800 hover:text-neutral-500 transition-colors duration-[150ms]"
                style={{ fontSize: "var(--text-overline)" }}
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-neutral-800 hover:text-neutral-500 transition-colors duration-[150ms]"
                style={{ fontSize: "var(--text-overline)" }}
              >
                이용약관
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}
