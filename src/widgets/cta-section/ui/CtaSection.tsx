/**
 * CtaSection — 홈페이지 하단 CTA 섹션
 *
 * RSC: 서버 컴포넌트
 *
 * 디자인 v2:
 *   - 배경: espresso-950 오프블랙 (히어로와 동일 계열 — 페이지 수미상관)
 *   - 장식 요소: blur 원 제거, 수평 구분선만 사용
 *   - 레이아웃: 좌측 정렬 (센터 정렬 제거 — 더 고급스러운 비대칭)
 *   - 버튼: btn-primary(에스프레소/크림) + btn-ghost-light
 *   - 연락처: 작고 절제된 텍스트, uppercase 레이블
 */

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { companyInfo } from "@/shared/config/company";
import { cn } from "@/shared/lib/utils";

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-section-heading"
      className={cn(
        "section-padding",
        "bg-espresso-950",
        "relative overflow-hidden"
      )}
    >
      {/* 브라스 골드 수평선 — 섹션 상단 포인트 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(to right, transparent, var(--brass-main), transparent)`,
          opacity: 0.6,
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p className="overline-label mb-6" style={{ color: "var(--brass-deep)" }}>
            Contact Us
          </p>

          <div className="section-divider" aria-hidden="true" />

          <h2
            id="cta-section-heading"
            className="font-serif font-light text-espresso-50 mb-6"
            style={{
              fontSize: "var(--text-h1)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "-0.02em",
            }}
          >
            공간을 바꾸는 첫 걸음,
            <br />
            지금 상담을 시작하세요
          </h2>

          <p
            className="text-neutral-500 mb-12 max-w-md"
            style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-relaxed)" }}
          >
            시공 견적, 제품 상담, 납기 등 궁금한 사항을 남겨주시면
            전문 상담사가 신속하게 답변해 드립니다.
          </p>

          {/* CTA 버튼 그룹 */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-16">
            <Link href="/contact" className="btn-primary">
              무료 상담 문의하기
            </Link>
            <Link href="/products" className="btn-ghost-light">
              제품 갤러리 보기
            </Link>
          </div>

          {/* 연락처 정보 — 구분선 위 */}
          <div
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8 pt-8"
            style={{ borderTop: "1px solid oklch(0.28 0.055 45 / 0.4)" }}
          >
            <a
              href={`tel:${companyInfo.tel.replace(/-/g, "")}`}
              className={cn(
                "flex items-center gap-3",
                "transition-colors duration-[150ms]",
                "hover:text-espresso-200"
              )}
              style={{ fontSize: "var(--text-body-sm)", color: "var(--neutral-500)" }}
            >
              <span
                className="font-medium uppercase"
                style={{
                  fontSize: "var(--text-overline)",
                  letterSpacing: "var(--tracking-widest)",
                  color: "var(--neutral-700)",
                }}
              >
                Tel
              </span>
              {companyInfo.tel}
            </a>
            <span
              className="hidden sm:inline"
              style={{ color: "var(--espresso-800)" }}
              aria-hidden="true"
            >
              /
            </span>
            <a
              href={`mailto:${companyInfo.email}`}
              className={cn(
                "flex items-center gap-3",
                "transition-colors duration-[150ms]",
                "hover:text-espresso-200"
              )}
              style={{ fontSize: "var(--text-body-sm)", color: "var(--neutral-500)" }}
            >
              <span
                className="font-medium uppercase"
                style={{
                  fontSize: "var(--text-overline)",
                  letterSpacing: "var(--tracking-widest)",
                  color: "var(--neutral-700)",
                }}
              >
                Email
              </span>
              {companyInfo.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
