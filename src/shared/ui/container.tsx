/**
 * Container — 사이트 전역 레이아웃 컨테이너
 *
 * 모든 섹션의 최대 너비와 좌우 여백을 일관되게 유지합니다.
 * max-width: 1280px (xl) — 원목마루 제품 이미지가 넓게 호흡하도록 설정
 * 모바일: 16px / 태블릿: 32px / 데스크톱: 40px 좌우 패딩
 *
 * RSC: 서버 컴포넌트 (인터랙션 없음)
 */

import { cn } from "@/shared/lib/utils";

interface ContainerProps {
  /** 렌더링할 HTML 태그 — 의미론적 선택 가능 */
  as?: "div" | "section" | "article" | "main" | "aside" | "nav" | "header" | "footer";
  /** 추가 className */
  className?: string;
  /** 자식 요소 */
  children: React.ReactNode;
}

/**
 * Container
 *
 * 사용 예:
 *   <Container>...</Container>
 *   <Container as="section" className="py-section">...</Container>
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        // 최대 너비 및 가운데 정렬
        "mx-auto w-full max-w-[1280px]",
        // 반응형 좌우 패딩: 모바일 16px → 태블릿 32px → 데스크톱 40px
        "px-4 sm:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </Tag>
  );
}
