/**
 * Footer — 전역 사이트 푸터
 *
 * RSC: 서버 컴포넌트 (인터랙션 없음)
 *
 * 구성:
 *   1. 브랜드 영역 — 로고, 슬로건, SNS 링크
 *   2. 링크 섹션 — 제품/회사/지원 카테고리
 *   3. 법적 정보 — 사업자등록번호, 주소, 연락처
 *   4. 저작권 표시
 *
 * 디자인 원칙:
 *   - 배경: wood-950 (가장 어두운 원목 브라운) — 페이지 마감에 중량감
 *   - 텍스트: 밝은 크림/베이지 계열로 대비 확보 (WCAG AA 준수)
 */

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/utils";

/* 푸터 링크 그룹 정의 */
const FOOTER_LINKS = [
  {
    title: "제품",
    items: [
      { label: "원목마루", href: "/products?category=solid-wood" },
      { label: "강마루", href: "/products?category=engineered-wood" },
      { label: "강화마루", href: "/products?category=laminate" },
      { label: "LVT", href: "/products?category=vinyl" },
    ],
  },
  {
    title: "회사",
    items: [
      { label: "회사 소개", href: "/about" },
      { label: "연혁", href: "/about#history" },
      { label: "인증 현황", href: "/about#certifications" },
      { label: "시공 사례", href: "/projects" },
    ],
  },
  {
    title: "고객 지원",
    items: [
      { label: "문의하기", href: "/contact" },
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "카탈로그 다운로드", href: "/catalog" },
      { label: "대리점 문의", href: "/dealer" },
    ],
  },
] as const;

/* 법적 정보 — 실제 사업자 정보 입력 필요 */
const COMPANY_INFO = {
  name: "주식회사 우드원",
  ceoName: "대표이사 홍길동",           // 실제 정보로 교체 필요
  businessNumber: "123-45-67890",       // 실제 사업자등록번호로 교체 필요
  address: "서울특별시 강남구 테헤란로 123, 우드원빌딩 5층", // 실제 주소로 교체 필요
  tel: "02-1234-5678",                  // 실제 전화번호로 교체 필요
  fax: "02-1234-5679",                  // 실제 팩스번호로 교체 필요
  email: "info@woodone.co.kr",          // 실제 이메일로 교체 필요
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-wood-950 text-wood-200"
      aria-label="사이트 푸터"
    >
      {/* 메인 푸터 영역 */}
      <Container>
        <div className="py-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* 브랜드 영역 — 4컬럼 */}
          <div className="lg:col-span-4">
            {/* 로고 */}
            <Link
              href="/"
              aria-label="우드원 홈으로 이동"
              className="inline-flex items-center gap-2.5 group mb-5"
            >
              <div
                aria-hidden="true"
                className="w-8 h-8 rounded-sm bg-wood-700 flex items-center justify-center"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <line x1="2" y1="6"  x2="16" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-wood-100"/>
                  <line x1="2" y1="9"  x2="16" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-wood-100"/>
                  <line x1="2" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-wood-100"/>
                </svg>
              </div>
              <div className="leading-tight">
                <span className="block text-[1.0625rem] font-semibold text-wood-50 tracking-tight">
                  우드원
                </span>
                <span className="block text-[0.625rem] font-medium tracking-[0.12em] text-wood-400 uppercase">
                  Woodone
                </span>
              </div>
            </Link>

            {/* 슬로건 */}
            <p className="text-sm text-wood-400 leading-relaxed mb-6">
              30년 전통의 원목마루 전문 기업.
              <br />
              자연의 따뜻함을 공간에 담습니다.
            </p>

            {/* SNS 링크 — 실제 URL 추가 시 siteConfig에서 관리 */}
            {(siteConfig.links.instagram || siteConfig.links.youtube || siteConfig.links.blog) && (
              <div className="flex items-center gap-3" aria-label="소셜 미디어">
                {siteConfig.links.instagram && (
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="우드원 인스타그램"
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center",
                      "bg-wood-800 text-wood-300",
                      "hover:bg-wood-700 hover:text-wood-100",
                      "transition-colors duration-150"
                    )}
                  >
                    {/* 인스타그램 아이콘 */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
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
                      "w-8 h-8 rounded-md flex items-center justify-center",
                      "bg-wood-800 text-wood-300",
                      "hover:bg-wood-700 hover:text-wood-100",
                      "transition-colors duration-150"
                    )}
                  >
                    {/* 유튜브 아이콘 */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 링크 섹션 — 8컬럼을 3등분 */}
          <nav
            aria-label="푸터 링크"
            className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-wood-400 mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3" role="list">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-sm text-wood-300",
                          "hover:text-wood-50",
                          "transition-colors duration-150"
                        )}
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
      <div className="border-t border-wood-800" aria-hidden="true" />

      {/* 법적 정보 & 저작권 */}
      <Container>
        <div className="py-8">
          {/* 사업자 정보 */}
          <address
            className={cn(
              "not-italic text-xs text-wood-500",
              "flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1",
              "mb-4"
            )}
          >
            <span>{COMPANY_INFO.name}</span>
            <span className="hidden sm:inline text-wood-700" aria-hidden="true">|</span>
            <span>대표: {COMPANY_INFO.ceoName}</span>
            <span className="hidden sm:inline text-wood-700" aria-hidden="true">|</span>
            <span>사업자등록번호: {COMPANY_INFO.businessNumber}</span>
            <span className="hidden sm:inline text-wood-700" aria-hidden="true">|</span>
            <span>{COMPANY_INFO.address}</span>
            <span className="hidden sm:inline text-wood-700" aria-hidden="true">|</span>
            <span>
              <span className="sr-only">전화: </span>
              <a
                href={`tel:${COMPANY_INFO.tel.replace(/-/g, "")}`}
                className="hover:text-wood-300 transition-colors duration-150"
              >
                {COMPANY_INFO.tel}
              </a>
            </span>
            <span className="hidden sm:inline text-wood-700" aria-hidden="true">|</span>
            <span>
              <span className="sr-only">이메일: </span>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover:text-wood-300 transition-colors duration-150"
              >
                {COMPANY_INFO.email}
              </a>
            </span>
          </address>

          {/* 저작권 및 정책 링크 */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-wood-600">
              &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <nav aria-label="법적 링크" className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-wood-500 hover:text-wood-300 transition-colors duration-150"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-xs text-wood-500 hover:text-wood-300 transition-colors duration-150"
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
