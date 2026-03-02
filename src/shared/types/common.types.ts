/**
 * 프로젝트 전역 공통 타입 정의
 * 도메인에 종속되지 않는 유틸리티 타입만 이 파일에 위치합니다.
 */

/** API 응답 표준 래퍼 */
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

/** 페이지네이션 공통 타입 */
export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

/** SEO용 메타데이터 공통 타입 */
export type SeoMeta = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
};
