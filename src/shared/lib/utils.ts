import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui 표준 className 병합 유틸리티.
 * clsx로 조건부 클래스를 처리하고, tailwind-merge로 충돌을 해소합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
