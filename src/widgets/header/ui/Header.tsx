/**
 * Header — 전역 사이트 헤더
 *
 * RSC: 서버 컴포넌트 (인터랙션 없음)
 * 모바일 메뉴 인터랙션은 MobileMenu Client Component로 위임
 *
 * 디자인 v2 — Natural Luxury Minimalism:
 *   - 배경: 순백(background) + 매우 섬세한 하단 border
 *   - 로고: 텍스트 전용 워드마크 (심볼 제거 — 소재 사진이 주인공)
 *   - 네비: 얇은 폰트, uppercase + 자간 — 럭셔리 패션 브랜드 규칙
 *   - CTA: 에스프레소 배경 버튼 (작고 절제된 크기)
 */

import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/shared/ui/container";
import { cn } from "@/shared/lib/utils";

/** 네비게이션 아이템 타입 — MobileMenu와 공유 */
export interface NavItem {
  label: string;
  href: string;
}

/** 사이트 주요 네비게이션 */
const NAV_ITEMS: NavItem[] = [
  { label: "제품 갤러리", href: "/products" },
  { label: "회사 소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
  { label: "찾아오시는 길", href: "/location" },
];

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full",
        "bg-background/95 backdrop-blur-sm",
        // 섬세한 하단 구분선 — border-border는 oklch(0.90 0.008 72)
        "border-b border-border"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* 워드마크 로고 — 심볼 없이 텍스트만 */}
          <Link
            href="/"
            aria-label="우드원 홈으로 이동"
            className="flex items-end gap-2 shrink-0 group"
          >
            {/* 한국어 브랜드명 — serif, 절제된 크기 */}
            <span
              className={cn(
                "font-serif font-light",
                "text-[1.375rem] leading-none tracking-tight",
                "text-foreground",
                "transition-colors duration-[250ms]",
                "group-hover:text-espresso-700"
              )}
            >
              우드원
            </span>
            {/* 영문 서브텍스트 */}
            <span
              className={cn(
                "text-[0.5625rem] font-medium tracking-[0.22em] uppercase",
                "text-neutral-400 leading-none mb-[0.1875rem]",
                "transition-colors duration-[250ms]",
                "group-hover:text-neutral-600"
              )}
            >
              Woodone
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav
            aria-label="주요 메뉴"
            className="hidden lg:flex items-center gap-8"
          >
            <ul className="flex items-center gap-6" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      // 텍스트 기반 네비 — 럭셔리 브랜드 규칙
                      "text-[0.6875rem] font-medium tracking-[0.18em] uppercase",
                      "text-neutral-500",
                      "hover:text-foreground",
                      "transition-colors duration-[150ms]",
                      "focus-visible:outline-2 focus-visible:outline-ring"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 데스크톱 CTA — 에스프레소 버튼, 작고 절제 */}
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center",
                "px-5 py-2.5",
                "bg-espresso-800 text-espresso-50",
                "text-[0.6875rem] font-medium tracking-[0.18em] uppercase",
                "rounded-sm",
                "hover:bg-espresso-900",
                "transition-colors duration-[250ms]",
                "focus-visible:outline-2 focus-visible:outline-brass-main"
              )}
            >
              무료 상담
            </Link>
          </nav>

          {/* 모바일 햄버거 메뉴 — Client Component */}
          <MobileMenu navItems={NAV_ITEMS} />
        </div>
      </Container>
    </header>
  );
}
