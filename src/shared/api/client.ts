/**
 * 기본 HTTP 클라이언트
 *
 * Next.js fetch를 래핑하여 프로젝트 전반의 API 호출에 일관된 인터페이스를 제공합니다.
 * - 기본 캐싱 전략을 이 레이어에서 관리합니다.
 * - 에러 처리를 표준화합니다.
 * - 추후 인증 헤더 주입 등의 확장이 이 파일에서 이루어집니다.
 *
 * 현재 단계: 정적 데이터 기반 (CMS 연동 전)
 * 향후 단계: Strapi / Sanity / 자체 API 연동 시 baseUrl 및 헤더 주입 추가
 */

type FetchOptions = RequestInit & {
  revalidate?: number | false;
  tags?: string[];
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { revalidate, tags, ...init } = options;

  const nextOptions: RequestInit["next"] = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags) nextOptions.tags = tags;

  const response = await fetch(url, {
    ...init,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API 요청 실패: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}
