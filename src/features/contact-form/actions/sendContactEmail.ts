"use server";
/**
 * sendContactEmail — 문의 폼 Server Action
 *
 * 'use server': Next.js Server Action — 브라우저에서 호출되지만 서버에서 실행됨
 * nodemailer를 사용하여 문의 이메일을 전송합니다.
 *
 * 환경변수 (반드시 .env.local에 설정):
 *   CONTACT_SMTP_HOST     — SMTP 서버 호스트 (예: smtp.gmail.com)
 *   CONTACT_SMTP_PORT     — SMTP 포트 (예: 587)
 *   CONTACT_SMTP_USER     — SMTP 인증 이메일
 *   CONTACT_SMTP_PASS     — SMTP 인증 비밀번호 (앱 비밀번호 권장)
 *   CONTACT_TO_EMAIL      — 수신 이메일 (우드원 담당자)
 */

import nodemailer from "nodemailer";
import { companyInfo } from "@/shared/config/company";
import type { ContactFormData, ContactFormState } from "../model/contact.types";

/** 서버 측 폼 유효성 검사 */
function validateFormData(data: ContactFormData): Partial<Record<keyof ContactFormData, string>> | null {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "성함 또는 업체명을 2자 이상 입력해 주세요.";
  }
  if (!data.phone.trim() || !/^[0-9\-\s+()]{7,20}$/.test(data.phone.trim())) {
    errors.phone = "올바른 연락처를 입력해 주세요.";
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "올바른 이메일 주소를 입력해 주세요.";
  }
  if (!data.location.trim()) {
    errors.location = "현장 위치를 입력해 주세요.";
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "문의사항을 10자 이상 입력해 주세요.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // FormData에서 값 추출
  const data: ContactFormData = {
    name:     String(formData.get("name") ?? "").trim(),
    phone:    String(formData.get("phone") ?? "").trim(),
    email:    String(formData.get("email") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    message:  String(formData.get("message") ?? "").trim(),
  };

  // 서버 측 유효성 검사
  const fieldErrors = validateFormData(data);
  if (fieldErrors) {
    return {
      status: "error",
      message: "입력 내용을 확인해 주세요.",
      fieldErrors,
    };
  }

  // SMTP 설정 확인
  const smtpHost = process.env.CONTACT_SMTP_HOST;
  const smtpPort = parseInt(process.env.CONTACT_SMTP_PORT ?? "587", 10);
  const smtpUser = process.env.CONTACT_SMTP_USER;
  const smtpPass = process.env.CONTACT_SMTP_PASS;
  const toEmail  = process.env.CONTACT_TO_EMAIL ?? companyInfo.email;

  if (!smtpHost || !smtpUser || !smtpPass) {
    // 개발 환경: SMTP 미설정 시 콘솔 출력 (운영에서는 실제 에러 반환)
    if (process.env.NODE_ENV === "development") {
      console.log("[DEV] Contact form submission:", data);
      return {
        status: "success",
        message: "문의가 접수되었습니다. (개발 모드 — 실제 이메일은 전송되지 않습니다)",
      };
    }
    console.error("[sendContactEmail] SMTP 환경변수 미설정");
    return {
      status: "error",
      message: "이메일 전송 설정이 완료되지 않았습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const submittedAt = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    await transporter.sendMail({
      from: `"우드원 홈페이지" <${smtpUser}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `[우드원 문의] ${data.name} — ${data.location}`,
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', Malgun Gothic, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2a1f0e; color: #f5ede0; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 18px; font-weight: 600;">우드원 홈페이지 문의</h1>
            <p style="margin: 4px 0 0; font-size: 13px; color: #a08060;">${submittedAt}</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e8ddd0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #7a6045; font-size: 13px; font-weight: 600; width: 120px;">성함/업체명</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #3a2a15; font-size: 14px;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #7a6045; font-size: 13px; font-weight: 600;">연락처</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #3a2a15; font-size: 14px;">${escapeHtml(data.phone)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #7a6045; font-size: 13px; font-weight: 600;">이메일</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #3a2a15; font-size: 14px;">${escapeHtml(data.email)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #7a6045; font-size: 13px; font-weight: 600;">현장 위치</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0e8d8; color: #3a2a15; font-size: 14px;">${escapeHtml(data.location)}</td>
              </tr>
              <tr>
                <td style="padding: 16px 0 10px; color: #7a6045; font-size: 13px; font-weight: 600; vertical-align: top;">문의사항</td>
                <td style="padding: 16px 0 10px; color: #3a2a15; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
      text: `
우드원 홈페이지 문의 (${submittedAt})

성함/업체명: ${data.name}
연락처: ${data.phone}
이메일: ${data.email}
현장 위치: ${data.location}

문의사항:
${data.message}
      `.trim(),
    });

    return {
      status: "success",
      message: "문의가 정상적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.",
    };
  } catch (error) {
    console.error("[sendContactEmail] 이메일 전송 오류:", error);
    return {
      status: "error",
      message: "이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.",
    };
  }
}

/** HTML 이스케이프 — XSS 방지 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
