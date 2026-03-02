/**
 * 404 Not Found 페이지
 *
 * SEO 전략:
 *   - Next.js는 not-found.tsx를 HTTP 404 상태코드로 자동 서빙
 *   - robots: noindex — 404 페이지가 검색 결과에 노출되지 않도록 차단
 *   - title: "페이지를 찾을 수 없습니다" — 검색 엔진이 오류 페이지임을 인식
 *   - 내부 링크: 홈과 제품 페이지로의 탈출구 제공 (crawlability 유지)
 *
 * RSC: 서버 컴포넌트 (not-found.tsx는 항상 RSC)
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지를 찾을 수 없습니다. 주소를 확인하거나 홈으로 돌아가세요.",
  // 404 페이지는 절대 색인하지 않음
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
    >
      {/* 스크린 리더를 위한 숨김 제목 */}
      <p aria-hidden="true" className="text-8xl font-bold text-gray-200 select-none">
        404
      </p>

      <h1
        id="not-found-heading"
        className="mt-4 text-2xl font-semibold text-gray-900"
      >
        페이지를 찾을 수 없습니다
      </h1>

      <p className="mt-3 text-gray-500 max-w-md">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
        주소를 다시 확인해 주세요.
      </p>

      {/* 탈출 링크: <a href> 패턴으로 크롤 가능하도록 유지 */}
      <nav aria-label="오류 페이지 탈출 링크" className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          홈으로 돌아가기
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          제품 보기
        </Link>
      </nav>
    </section>
  );
}
