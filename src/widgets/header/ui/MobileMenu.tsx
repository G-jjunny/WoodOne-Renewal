"use client";
/**
 * MobileMenu — 모바일 햄버거 메뉴 Client Component
 *
 * 'use client' 이유:
 *   - 메뉴 열림/닫힘 상태(useState) 관리 필요
 *   - 외부 클릭 감지(useEffect + ref)
 *   - body 스크롤 잠금 처리
 *
 * 이 컴포넌트만 Client 번들에 포함되고,
 * 부모 Header.tsx는 RSC로 유지됩니다.
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { NavItem } from "./Header";

interface MobileMenuProps {
  navItems: NavItem[];
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* 메뉴 열릴 때 body 스크롤 잠금 */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ESC 키로 메뉴 닫기 — 접근성 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <div ref={menuRef} className="lg:hidden">
      {/* 햄버거 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-md",
          "text-foreground/70 hover:text-foreground hover:bg-wood-200",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-ring"
        )}
      >
        {isOpen ? (
          <X className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Menu className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>

      {/* 풀스크린 모바일 메뉴 오버레이 */}
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
            aria-hidden="true"
            onClick={handleClose}
          />

          {/* 슬라이드 패널 */}
          <nav
            id="mobile-nav"
            aria-label="모바일 메뉴"
            className={cn(
              "fixed top-0 right-0 z-50 h-full w-72",
              "bg-background border-l border-border",
              "flex flex-col",
              "shadow-xl"
            )}
          >
            {/* 패널 헤더 */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <span className="text-sm font-medium text-muted-foreground tracking-wide">
                메뉴
              </span>
              <button
                type="button"
                onClick={handleClose}
                aria-label="메뉴 닫기"
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-wood-200",
                  "transition-colors duration-150"
                )}
              >
                <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* 네비게이션 링크 목록 */}
            <ul className="flex flex-col px-4 py-6 gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-md",
                      "text-base font-medium text-foreground/80",
                      "hover:text-foreground hover:bg-wood-100",
                      "transition-colors duration-150"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 문의하기 CTA */}
            <div className="px-4 mt-auto pb-8">
              <Link
                href="/contact"
                onClick={handleClose}
                className={cn(
                  "flex items-center justify-center w-full",
                  "px-6 py-3 rounded-md",
                  "bg-primary text-primary-foreground",
                  "text-sm font-medium",
                  "hover:bg-wood-800 transition-colors duration-150"
                )}
              >
                무료 상담 문의
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
