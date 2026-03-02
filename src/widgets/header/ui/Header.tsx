/**
 * Header — 전역 사이트 헤더
 *
 * RSC: 서버 컴포넌트 (인터랙션 없음)
 * 모바일 메뉴 인터랙션은 MobileMenu Client Component로 위임
 *
 * 스크롤 고정(sticky) 전략:
 *   - position: sticky top-0 z-30
 *   - 배경 반투명 + backdrop-blur — 프리미엄 깊이감
 *   - 스크롤에 따른 shadow는 클라이언트에서 처리 예정 (Phase 3)
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
  { label: "제품 소개", href: "/products" },
  { label: "시공 사례", href: "/projects" },
  { label: "회사 소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
];

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full",
        // 반투명 배경 + 블러 — 스크롤 시 콘텐츠가 비쳐보이는 프리미엄 효과
        "bg-background/90 backdrop-blur-md",
        "border-b border-border/60"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* 로고 영역 */}
          <Link
            href="/"
            aria-label="우드원 홈으로 이동"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            {/* 로고 마크 — 원목 감성의 심볼 */}
            <div
              aria-hidden="true"
              className={cn(
                "w-8 h-8 rounded-sm",
                "bg-primary flex items-center justify-center",
                "transition-transform duration-200 group-hover:scale-95"
              )}
            >
              {/* 목재 결 패턴을 암시하는 미니멀 심볼 */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* 수평 목재 결 3선 */}
                <line x1="2" y1="6"  x2="16" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary-foreground"/>
                <line x1="2" y1="9"  x2="16" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary-foreground"/>
                <line x1="2" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary-foreground"/>
              </svg>
            </div>

            {/* 워드마크 */}
            <div className="leading-tight">
              <span
                className={cn(
                  "block text-[1.0625rem] font-semibold tracking-tight",
                  "text-foreground group-hover:text-primary",
                  "transition-colors duration-200"
                )}
              >
                우드원
              </span>
              <span className="block text-[0.625rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                Woodone
              </span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav
            aria-label="주요 메뉴"
            className="hidden lg:flex items-center gap-1"
          >
            <ul className="flex items-center gap-1" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-4 py-2 rounded-md",
                      "text-sm font-medium",
                      "text-foreground/70 hover:text-foreground hover:bg-wood-100",
                      "transition-colors duration-150",
                      // 포커스 링 명시적 처리 — 키보드 접근성
                      "focus-visible:outline-2 focus-visible:outline-ring"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 데스크톱 CTA 버튼 */}
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center ml-4 px-5 py-2 rounded-md",
                "bg-primary text-primary-foreground",
                "text-sm font-medium",
                "hover:bg-wood-800",
                "transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-ring"
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
