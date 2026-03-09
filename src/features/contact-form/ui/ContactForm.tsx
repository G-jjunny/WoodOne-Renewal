"use client";
/**
 * ContactForm — 문의 폼 Client Component
 *
 * 'use client' 이유:
 *   - useActionState (React 19) — Server Action 상태 관리
 *   - 폼 제출 중 로딩 상태(useFormStatus) 처리
 *   - 성공/실패 피드백 UI 상태
 *
 * Server Action: sendContactEmail (서버에서 실행, 이 컴포넌트에 직접 import하지 않음)
 * props로 action을 전달받아 결합도 최소화
 */

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactEmail } from "../actions/sendContactEmail";
import type { ContactFormState } from "../model/contact.types";
import { cn } from "@/shared/lib/utils";

/* ============================================================
   제출 버튼 — useFormStatus는 form 내부에서만 동작
   별도 컴포넌트로 분리 필요 (React 규칙)
   ============================================================ */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        "w-full sm:w-auto",
        "inline-flex items-center justify-center gap-2",
        "px-10 py-4 rounded-lg",
        "bg-espresso-800 text-espresso-50",
        "text-sm font-semibold",
        "transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-ring",
        pending
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-espresso-900 active:bg-espresso-950"
      )}
    >
      {pending && (
        <svg
          className="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {pending ? "전송 중..." : "문의 전송하기"}
    </button>
  );
}

/* ============================================================
   필드 컴포넌트 — 레이블 + 입력 + 에러 메시지 패턴
   ============================================================ */
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-espresso-800"
      >
        {label}
        {required && (
          <span className="ml-1 text-destructive" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBaseClass = cn(
  "w-full px-4 py-3 rounded-lg",
  "bg-background border border-espresso-200",
  "text-sm text-espresso-900 placeholder:text-espresso-400",
  "focus:outline-none focus:ring-2 focus:ring-espresso-400 focus:border-transparent",
  "transition-colors duration-150"
);

const inputErrorClass = "border-destructive focus:ring-destructive/50";

/* ============================================================
   ContactForm 메인 컴포넌트
   ============================================================ */
const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, action] = useActionState(sendContactEmail, initialState);

  // 성공 상태: 감사 메시지 표시
  if (state.status === "success") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className={cn(
          "rounded-2xl p-12 text-center",
          "bg-espresso-50 border border-espresso-200"
        )}
      >
        <div
          className="w-16 h-16 rounded-full bg-espresso-700 flex items-center justify-center mx-auto mb-6"
          aria-hidden="true"
        >
          <svg className="w-8 h-8 text-espresso-100" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-serif font-semibold text-espresso-900 mb-3" style={{ fontSize: "1.25rem" }}>
          문의가 접수되었습니다
        </h3>
        <p className="text-espresso-600 leading-relaxed" style={{ fontSize: "0.9375rem" }}>
          {state.message}
        </p>
      </div>
    );
  }

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={action} noValidate aria-label="문의 양식">
      {/* 전역 에러 메시지 */}
      {state.status === "error" && !fieldErrors && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive"
        >
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* 성함 또는 업체명 */}
        <Field id="name" label="성함 또는 업체명" required error={fieldErrors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="홍길동 / 인테리어 업체명"
            aria-describedby={fieldErrors?.name ? "name-error" : undefined}
            aria-invalid={!!fieldErrors?.name}
            className={cn(inputBaseClass, fieldErrors?.name && inputErrorClass)}
          />
        </Field>

        {/* 연락처 */}
        <Field id="phone" label="연락처" required error={fieldErrors?.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="010-1234-5678"
            aria-describedby={fieldErrors?.phone ? "phone-error" : undefined}
            aria-invalid={!!fieldErrors?.phone}
            className={cn(inputBaseClass, fieldErrors?.phone && inputErrorClass)}
          />
        </Field>

        {/* 이메일 */}
        <Field id="email" label="이메일" required error={fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="example@email.com"
            aria-describedby={fieldErrors?.email ? "email-error" : undefined}
            aria-invalid={!!fieldErrors?.email}
            className={cn(inputBaseClass, fieldErrors?.email && inputErrorClass)}
          />
        </Field>

        {/* 현장 위치 */}
        <Field id="location" label="현장 위치" required error={fieldErrors?.location}>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="서울시 강남구 / 경기도 성남시"
            aria-describedby={fieldErrors?.location ? "location-error" : undefined}
            aria-invalid={!!fieldErrors?.location}
            className={cn(inputBaseClass, fieldErrors?.location && inputErrorClass)}
          />
        </Field>

        {/* 문의사항 — 2열 전체 너비 */}
        <div className="sm:col-span-2">
          <Field id="message" label="문의사항" required error={fieldErrors?.message}>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="시공 견적 문의, 제품 선택 상담, 납기 등 궁금한 사항을 자유롭게 작성해 주세요."
              aria-describedby={fieldErrors?.message ? "message-error" : undefined}
              aria-invalid={!!fieldErrors?.message}
              className={cn(
                inputBaseClass,
                "resize-y min-h-[120px]",
                fieldErrors?.message && inputErrorClass
              )}
            />
          </Field>
        </div>
      </div>

      {/* 필수 항목 안내 */}
      <p className="mt-4 text-xs text-espresso-500">
        <span className="text-destructive" aria-hidden="true">*</span> 표시는 필수 입력 항목입니다.
      </p>

      {/* 제출 버튼 */}
      <div className="mt-8">
        <SubmitButton />
      </div>
    </form>
  );
}
