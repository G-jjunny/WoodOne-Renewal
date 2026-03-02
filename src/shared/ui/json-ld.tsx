/**
 * JsonLd — 구조화 데이터 렌더링 컴포넌트 (RSC)
 *
 * Google Rich Results와 Schema.org 표준을 따르는 JSON-LD 스크립트 태그를 렌더링합니다.
 * dangerouslySetInnerHTML 대신 __html 패턴을 사용하여 서버에서 안전하게 직렬화합니다.
 *
 * 사용 예:
 *   import { JsonLd } from "@/shared/ui/json-ld";
 *   import { organizationSchema } from "@/shared/config/schema";
 *   <JsonLd schema={organizationSchema} />
 */

// Record<string, unknown>보다 정밀한 JSON 직렬화 가능 타입 정의
export type JsonLdSchema = {
  "@context": string;
  "@type": string | string[];
  [key: string]: JsonLdValue;
};

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

interface JsonLdProps {
  /** Schema.org 스키마 객체 또는 배열 (그래프 패턴용) */
  schema: JsonLdSchema | JsonLdSchema[];
  /** 동일 페이지에 복수 JSON-LD가 있을 때 고유 식별자 */
  id?: string;
}

/**
 * 서버 컴포넌트 전용 JSON-LD 렌더러.
 * 절대로 'use client'를 추가하지 마세요 — SEO 목적상 SSR이 필수입니다.
 */
export function JsonLd({ schema, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON.stringify의 두 번째 인자로 XSS 방어: </script> 태그를 이스케이프
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/<\/script>/gi, "<\\/script>"),
      }}
    />
  );
}
