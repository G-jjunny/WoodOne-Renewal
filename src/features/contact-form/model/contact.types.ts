/**
 * 문의 폼 타입 정의
 *
 * ContactFormData: 폼 필드 인터페이스
 * ContactFormState: Server Action 응답 상태
 */

export interface ContactFormData {
  /** 성함 또는 업체명 (필수) */
  name: string;
  /** 연락처 (필수) */
  phone: string;
  /** 이메일 (필수) */
  email: string;
  /** 현장 위치 (필수) */
  location: string;
  /** 문의사항 (필수) */
  message: string;
}

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactFormData, string>> };
