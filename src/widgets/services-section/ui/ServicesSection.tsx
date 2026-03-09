/**
 * ServicesSection — 홈페이지 주요 서비스 섹션
 *
 * RSC: 서버 컴포넌트
 *
 * 디자인 v2:
 *   - 배경: background (순백) — 이전 bg-espresso-100에서 변경
 *   - 카드: border-only, 배경 없음 → hover 시 에스프레소 border
 *   - 아이콘: 텍스트 레이블로 대체 (숫자 인덱스) — 럭셔리 미니멀
 *   - 4열 그리드 유지, 가로 구분선으로 섹션 분리
 */

import { Container } from "@/shared/ui/container";
import { cn } from "@/shared/lib/utils";

const SERVICES = [
  {
    index: "01",
    title: "전문 시공",
    description:
      "숙련된 시공 전문가가 직접 현장을 방문하여 정밀하게 시공합니다. 내 집에 시공하는 마음으로 최선을 다합니다.",
  },
  {
    index: "02",
    title: "맞춤 컨설팅",
    description:
      "공간 특성과 예산에 맞는 최적의 마루 소재를 전문 상담사가 직접 컨설팅해 드립니다.",
  },
  {
    index: "03",
    title: "인테리어 제안",
    description:
      "마루 소재와 조화로운 전반적인 인테리어 방향을 함께 제안합니다. 공간의 완성도를 높입니다.",
  },
  {
    index: "04",
    title: "신속 A/S",
    description:
      "시공 후에도 A/S 요청 시 신속하게 처리합니다. 고객의 아름다운 생활공간을 지속적으로 관리합니다.",
  },
] as const;

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-section-heading"
      className="section-padding bg-background"
    >
      <Container>
        {/* 섹션 헤더 */}
        <div className="mb-16">
          <p className="overline-label mb-6">Our Services</p>
          <div className="section-divider" aria-hidden="true" />
          <h2
            id="services-section-heading"
            className="text-foreground"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "-0.02em",
            }}
          >
            주요 서비스
          </h2>
        </div>

        {/* 서비스 그리드 — border-top으로 구분 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {SERVICES.map(({ index, title, description }) => (
            <div
              key={title}
              className={cn(
                "group py-10 pr-8",
                // 가로 구분선: 각 항목 상단
                "border-b border-border lg:border-b-0",
                // 세로 구분선: 첫 항목 제외
                "[&:not(:first-child)]:lg:border-l [&:not(:first-child)]:lg:pl-8 [&:not(:first-child)]:lg:pr-0"
              )}
            >
              {/* 인덱스 번호 — 브라스 골드 */}
              <div
                className="font-light mb-6"
                style={{
                  fontSize: "var(--text-overline)",
                  letterSpacing: "var(--tracking-widest)",
                  color: "var(--brass-main)",
                  fontWeight: 500,
                }}
                aria-hidden="true"
              >
                {index}
              </div>

              {/* 제목 */}
              <h3
                className={cn(
                  "font-semibold text-foreground mb-4",
                  "transition-colors duration-[250ms]",
                  "group-hover:text-espresso-700"
                )}
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                {title}
              </h3>

              {/* 설명 */}
              <p
                className="text-neutral-500"
                style={{
                  fontSize: "var(--text-body-sm)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
