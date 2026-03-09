/**
 * CompanyIntroSection — 회사 소개 페이지 전체 콘텐츠
 *
 * RSC: 서버 컴포넌트
 *
 * 구성:
 *   1. 회사 소개 원문 전체 (의뢰인 제공)
 *   2. SINCE 1996 타임라인
 *   3. 브랜드 스토리 (Green Forest / Ideal Legno)
 *   4. 가치 체계
 */

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { cn } from "@/shared/lib/utils";

const HISTORY_ITEMS = [
  {
    year: "1996",
    title: "우드원 설립",
    description: "원목마루 전문 기업으로 창업. 이탈리아 명품 원목마루 수입 시작.",
  },
  {
    year: "2000년대",
    title: "Ideal Legno 독점 수입",
    description: "이탈리아 프리미엄 마루 브랜드 Ideal Legno 국내 독점 공급 파트너 체결.",
  },
  {
    year: "2010년대",
    title: "Green Forest 론칭",
    description: "대중적 원목마루 브랜드 Green Forest를 통해 폭넓은 고객층 확보.",
  },
  {
    year: "현재",
    title: "30년 전통 계승",
    description: "100가지 이상 샘플 구비. 시공·컨설팅·인테리어·A/S 원스톱 서비스 제공.",
  },
] as const;

const VALUES = [
  {
    title: "품질 최우선",
    description: "내 집에 시공한다는 마음으로 항상 최선의 소재와 시공을 제공합니다.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "고객 신뢰",
    description: "30년간 쌓아온 고객과의 신뢰 관계를 가장 소중한 자산으로 여깁니다.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "전문 서비스",
    description: "전문 지식을 바탕으로 최적의 제품 선택부터 A/S까지 책임집니다.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17L4.655 7.099a4 4 0 01-.58-4.853l.014-.02a4 4 0 015.99 5.24l-1.658 1.91" />
      </svg>
    ),
  },
] as const;

export function CompanyIntroSection() {
  return (
    <>
      {/* ======================================================
          섹션 1: 회사 소개 원문
      ====================================================== */}
      <section
        id="intro"
        aria-labelledby="company-intro-heading"
        className="py-24 lg:py-32 bg-background"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-espresso-600 mb-4">
              Since 1996
            </p>
            <h2
              id="company-intro-heading"
              className="font-serif font-semibold text-espresso-900 mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", lineHeight: 1.2 }}
            >
              WoodOne이 제안하는
              <br />
              프리미엄 마루
            </h2>

            {/* 구분선 */}
            <div className="w-16 h-px bg-espresso-300 mx-auto my-8" aria-hidden="true" />

            {/* 회사 소개 원문 */}
            <div className="space-y-5 text-espresso-700 leading-relaxed text-left" style={{ fontSize: "0.9375rem" }}>
              <p>
                우드원은 1996년 설립되어 현재에 이르기까지 원목마루만을 수입, 유통, 판매하고 있습니다.
              </p>
              <p>
                고급 소재로는 이탈리아 명품{" "}
                <strong className="text-espresso-800 font-semibold">IDEAL Legno</strong>를 수입 유통하고 있으며,
                대중적인 소재로는{" "}
                <strong className="text-espresso-800 font-semibold">Green Forest</strong> 제품을 판매하고 있습니다.
              </p>
              <p>
                항상 내 집에 시공한다는 마음으로 최선을 다하여 고객님이 만족하실 수 있도록 노력하겠습니다.
                언제나 우수한 품질의 마루재를 공급함으로 저희를 믿고 찾아주신 고객님들께 보답토록 노력하며,
                고품격 서비스와 A/S 요청 시 신속한 처리로 고객님의 아름다운 생활공간을 창조하는 데
                기여할 수 있도록 노력하겠습니다.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================
          섹션 2: 핵심 가치
      ====================================================== */}
      <section
        id="values"
        aria-labelledby="values-heading"
        className="py-24 lg:py-32 bg-espresso-50"
      >
        <Container>
          <div className="text-center mb-16">
            <h2
              id="values-heading"
              className="font-serif font-semibold text-espresso-900"
              style={{ fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)" }}
            >
              우드원의 가치
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {VALUES.map(({ title, description, icon }) => (
              <div key={title} className="text-center">
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl mx-auto mb-5",
                    "bg-espresso-800 text-espresso-100",
                    "flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-espresso-900 mb-2">{title}</h3>
                <p className="text-sm text-espresso-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ======================================================
          섹션 3: 연혁 타임라인
      ====================================================== */}
      <section
        id="history"
        aria-labelledby="history-heading"
        className="py-24 lg:py-32 bg-background"
      >
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-espresso-600 mb-3">
                History
              </p>
              <h2
                id="history-heading"
                className="font-serif font-semibold text-espresso-900"
                style={{ fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)" }}
              >
                우드원의 역사
              </h2>
            </div>

            {/* 타임라인 */}
            <ol className="relative border-l-2 border-espresso-200 ml-6 space-y-12" role="list">
              {HISTORY_ITEMS.map(({ year, title, description }) => (
                <li key={year} className="relative pl-8">
                  {/* 타임라인 도트 */}
                  <span
                    className={cn(
                      "absolute -left-[13px] top-0.5",
                      "w-6 h-6 rounded-full",
                      "bg-espresso-700 border-4 border-background",
                      "flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  />
                  <time
                    className="text-xs font-semibold tracking-[0.15em] uppercase text-espresso-500 mb-1 block"
                    dateTime={year.replace(/년대$/, "")}
                  >
                    {year}
                  </time>
                  <h3 className="text-base font-semibold text-espresso-900 mb-1.5">{title}</h3>
                  <p className="text-sm text-espresso-600 leading-relaxed">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ======================================================
          섹션 4: 브랜드 스토리
      ====================================================== */}
      <section
        id="brands"
        aria-labelledby="brand-story-heading"
        className="py-24 lg:py-32 bg-espresso-950"
      >
        <Container>
          <div className="text-center mb-16">
            <h2
              id="brand-story-heading"
              className="font-serif font-semibold text-espresso-50"
              style={{ fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)" }}
            >
              브랜드 스토리
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Green Forest */}
            <div
              className={cn(
                "p-8 rounded-2xl",
                "bg-espresso-800/50 border border-espresso-700/50"
              )}
            >
              <h3 className="font-serif font-semibold text-espresso-200 mb-4" style={{ fontSize: "1.25rem" }}>
                Green Forest
              </h3>
              <p className="text-espresso-400 leading-relaxed mb-6" style={{ fontSize: "0.9375rem" }}>
                자연의 아름다움을 담아낸 대중적 원목마루 브랜드.
                6가지 폭 규격과 100가지 이상의 색상·마감 옵션으로
                다양한 공간과 예산에 맞는 최적의 선택을 제공합니다.
              </p>
              <Link
                href="/products?brand=green-forest"
                className="text-sm font-semibold text-espresso-400 hover:text-espresso-200 transition-colors duration-150 border-b border-espresso-700 hover:border-espresso-400 pb-0.5"
              >
                제품 갤러리 보기 →
              </Link>
            </div>

            {/* Ideal Legno */}
            <div
              className={cn(
                "p-8 rounded-2xl",
                "bg-espresso-100 border border-espresso-200"
              )}
            >
              <h3 className="font-serif font-semibold text-espresso-900 mb-4" style={{ fontSize: "1.25rem" }}>
                Ideal Legno
              </h3>
              <p className="text-espresso-700 leading-relaxed mb-6" style={{ fontSize: "0.9375rem" }}>
                이탈리아 장인이 빚은 명품 원목마루.
                최고급 유럽산 원목과 혁신적인 가공 기술이 만나
                공간을 예술 작품으로 완성합니다.
                우드원이 국내 독점 공급합니다.
              </p>
              <a
                href="https://www.ideal-legno.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-espresso-700 hover:text-espresso-900 transition-colors duration-150 border-b border-espresso-400 hover:border-espresso-700 pb-0.5"
              >
                공식 사이트 방문 →<span className="sr-only"> (새 탭)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-espresso-100" aria-label="문의 유도">
        <Container className="text-center">
          <p className="text-espresso-700 mb-6" style={{ fontSize: "0.9375rem" }}>
            우드원의 전문 상담사가 최적의 원목마루를 제안해 드립니다.
          </p>
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center",
              "px-8 py-4 rounded-md",
              "bg-espresso-800 text-espresso-50",
              "text-sm font-semibold",
              "hover:bg-espresso-900 transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-ring"
            )}
          >
            무료 상담 문의하기
          </Link>
        </Container>
      </section>
    </>
  );
}
