/**
 * HeroSection — 홈페이지 메인 히어로 섹션
 *
 * RSC: 서버 컴포넌트 (인터랙션 없음)
 *
 * 디자인 v2 — Natural Luxury Minimalism:
 *   - 배경: 에스프레소 950 오프블랙 (실제 원목 사진 입고 전 폴백)
 *   - 타이포: display 크기 serif 300weight — 프리미엄의 가벼움
 *   - CTA: btn-primary (에스프레소) + btn-ghost-light 2가지
 *   - 브라스 골드: SINCE 배지, 구분선에만 사용 — 절제
 *   - 장식 요소: blur 원형 제거, 수직 라인 1개로 대체
 *   - 통계: 가로 분리선 없이 수직 구분으로 배치
 */

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { cn } from "@/shared/lib/utils";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        // h-dvh: 정확히 뷰포트 높이. flex-col로 내부 콘텐츠를 위아래로 분배
        "relative h-dvh flex flex-col",
        "bg-espresso-950",
        "overflow-hidden"
      )}
    >
      {/* 미세한 노이즈 텍스처 — 디지털 표면에 소재감 부여 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* 우측 수직 장식선 — 브라스 골드 1px, 프리미엄 디테일 */}
      <div
        aria-hidden="true"
        className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          width: "1px",
          height: "180px",
          background: `linear-gradient(to bottom, transparent, var(--brass-main), transparent)`,
          opacity: 0.4,
        }}
      />

      {/*
        flex-1: 헤더 아래 남은 공간 전체를 차지
        flex flex-col justify-between: 메인 콘텐츠(상단)와 통계(하단)를 양끝 배치
        pt-24: 고정 헤더 높이 오프셋 / pb-16: 스크롤 인디케이터 공간 확보
      */}
      <Container className="relative z-10 flex-1 flex flex-col justify-between pt-24 pb-16">

        {/* 메인 콘텐츠 — 뷰포트 중앙에서 자연스럽게 시작 */}
        <div className="max-w-2xl flex flex-col justify-center flex-1">

          {/* SINCE 배지 */}
          <div className="badge-brand mb-6">
            <span
              aria-hidden="true"
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "var(--brass-main)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            Since 1996
          </div>

          {/* 메인 타이틀 — Noto Serif KR 300, display 크기 */}
          <h1
            id="hero-heading"
            className={cn(
              "font-serif font-light",
              "text-espresso-50",
              "mb-5"
            )}
            style={{
              fontSize: "var(--text-display)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "-0.02em",
            }}
          >
            원목이 만드는
            <br />
            <span style={{ color: "var(--espresso-300)" }}>
              특별한 공간
            </span>
          </h1>

          {/* 브라스 구분선 */}
          <div
            className="section-divider"
            aria-hidden="true"
            style={{ marginBottom: "1.25rem" }}
          />

          {/* 서브 카피 */}
          <p
            className="text-neutral-400 max-w-md mb-8"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            1996년부터 원목마루 하나에만 집중해온 전문 기업.
            이탈리아 명품 Ideal Legno부터 합리적인 Green Forest까지,
            공간에 어울리는 최선을 제안합니다.
          </p>

          {/* CTA 버튼 그룹 */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary">
              무료 상담 문의
            </Link>
            <Link href="/products" className="btn-ghost-light">
              제품 갤러리
              <svg
                className="ml-2 w-3.5 h-3.5"
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

        {/* 하단 통계 — justify-between의 끝점에 배치, 항상 뷰포트 안에 표시됨 */}
        <div
          className="max-w-2xl flex items-start gap-0"
          style={{ borderTop: "1px solid oklch(0.28 0.055 45 / 0.4)", paddingTop: "1.5rem" }}
        >
          {[
            { value: "30+", label: "Years" },
            { value: "100+", label: "Samples" },
            { value: "2", label: "Brands" },
          ].map(({ value, label }, index) => (
            <div
              key={label}
              className="flex flex-col gap-1 pr-8"
              style={
                index !== 0
                  ? { paddingLeft: "2rem", borderLeft: "1px solid oklch(0.28 0.055 45 / 0.35)" }
                  : undefined
              }
            >
              <span
                className="font-serif font-light text-espresso-100"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1 }}
              >
                {value}
              </span>
              <span
                className="font-medium uppercase text-neutral-600"
                style={{ fontSize: "var(--text-overline)", letterSpacing: "var(--tracking-widest)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* 스크롤 인디케이터 — pb-16 공간 내 absolute 배치 */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-medium uppercase text-neutral-700"
          style={{ fontSize: "var(--text-overline)", letterSpacing: "var(--tracking-widest)" }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "2.5rem",
            background: `linear-gradient(to bottom, var(--neutral-700), transparent)`,
          }}
        />
      </div>
    </section>
  );
}
