/**
 * 사이트 전역 설정
 * SEO metadata, canonical URL, 소셜 링크 등 사이트 수준의 상수를 관리합니다.
 * 환경 변수가 필요한 항목은 추후 .env로 분리합니다.
 */
export const siteConfig = {
  name: "우드원",
  fullName: "우드원 - 원목마루 전문 기업",
  description:
    "우드원은 30년 전통의 원목마루 전문 기업입니다. 국내산 원목마루, 강마루, 강화마루 등 다양한 프리미엄 바닥재를 공급합니다.",
  url: "https://woodone.co.kr",
  ogImage: "https://woodone.co.kr/images/og-default.jpg",
  locale: "ko_KR",
  links: {
    instagram: "",
    youtube: "",
    blog: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
