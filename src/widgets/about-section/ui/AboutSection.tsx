/**
 * AboutSection — 홈페이지 회사 소개 섹션
 *
 * RSC: 서버 컴포넌트
 *
 * 디자인 v2:
 *   - 배경: background (순백 크림) — 이전 bg-espresso-50에서 변경
 *   - 좌측 텍스트 / 우측 통계 그리드 레이아웃 유지
 *   - 통계 카드: shadow 없이 border만으로 분리, hover 시 border-espresso-400
 *   - serif 사용: h2(SINCE 1996)만. h3는 sans로 교체
 *   - 링크: link-underline 컴포넌트 클래스 적용
 */

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { cn } from "@/shared/lib/utils";

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-section-heading"
      className="section-padding bg-background"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* 좌측: 텍스트 */}
          <div>
            {/* 오버라인 */}
            <p className="overline-label mb-6" aria-hidden="true">
              About WoodOne
            </p>

            {/* 브라스 구분선 */}
            <div className="section-divider" aria-hidden="true" />

            {/* 섹션 제목 — serif 300, 이 섹션의 핵심 임팩트 */}
            <h2
              id="about-section-heading"
              className="font-serif font-light text-foreground mb-3"
              style={{
                fontSize: "var(--text-h1)",
                lineHeight: "var(--leading-tight)",
                letterSpacing: "-0.02em",
              }}
            >
              SINCE 1996
            </h2>
            <p
              className="text-neutral-500 mb-10"
              style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-snug)" }}
            >
              원목마루 하나에만 집중한 30년
            </p>

            {/* 본문 — 의뢰인 원문 */}
            <div
              className="space-y-5 text-neutral-600"
              style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-relaxed)" }}
            >
              <p>
                우드원은 1996년 설립되어 현재에 이르기까지 원목마루만을 수입, 유통, 판매하고 있습니다.
              </p>
              <p>
                고급 소재로는 이탈리아 명품{" "}
                <strong>IDEAL Legno</strong>를 수입 유통하고 있으며,
                대중적인 소재로는{" "}
                <strong>Green Forest</strong> 제품을 판매하고 있습니다.
              </p>
              <p>
                항상 내 집에 시공한다는 마음으로 최선을 다하여 고객님이 만족하실 수 있도록 노력하겠습니다.
                언제나 우수한 품질의 마루재를 공급함으로 저희를 믿고 찾아주신 고객님들께 보답토록 노력하며,
                고품격 서비스와 A/S 요청 시 신속한 처리로 고객님의 아름다운 생활공간을 창조하는 데
                기여할 수 있도록 노력하겠습니다.
              </p>
            </div>

            {/* CTA — link-underline 패턴 */}
            <div className="mt-12">
              <Link
                href="/about"
                className="link-underline"
              >
                회사 소개 더보기
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 우측: 통계 그리드 */}
          <div className="grid grid-cols-2 gap-px bg-border lg:mt-8">
            {[
              {
                value: "1996",
                label: "설립 연도",
                description: "30년 원목마루 전문",
              },
              {
                value: "100+",
                label: "Green Forest",
                description: "다양한 사이즈·색상 샘플",
              },
              {
                value: "2",
                label: "프리미엄 브랜드",
                description: "Ideal Legno + Green Forest",
              },
              {
                value: "A/S",
                label: "신속 사후 관리",
                description: "시공 후 책임 보장",
              },
            ].map(({ value, label, description }) => (
              <div
                key={label}
                className={cn(
                  "bg-background p-8 flex flex-col gap-2",
                  // 1px gap background로 그리드 구분선 효과
                  "group"
                )}
              >
                <div
                  className="font-serif font-light text-foreground"
                  style={{
                    fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </div>
                <div
                  className="font-medium text-espresso-800"
                  style={{ fontSize: "var(--text-label)" }}
                >
                  {label}
                </div>
                <div
                  className="text-neutral-500"
                  style={{ fontSize: "var(--text-overline)", lineHeight: "var(--leading-snug)" }}
                >
                  {description}
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
