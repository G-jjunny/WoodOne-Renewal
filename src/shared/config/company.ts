/**
 * 회사 정보 상수
 * 푸터, 찾아오시는 길, 문의 페이지 등 UI에 표시되는 회사 정보를 일괄 관리합니다.
 * 변경 시 이 파일만 수정하면 전체 페이지에 자동 반영됩니다.
 */
export const companyInfo = {
  /** 회사명 */
  name: "우드원",
  nameEn: "WOODONE",
  legalName: "주식회사 우드원",

  /** 대표 / 사업자 */
  ceo: "정병훈",
  businessNumber: "215-08-88208",

  /** 연락처 */
  tel: "02-547-8165",
  fax: "02-547-8164",
  email: "woodone@naver.com",

  /** 주소 */
  address: {
    full: "강남구 논현로128길 22-4 세은빌딩 5층",
    sido: "서울특별시",
    sigungu: "강남구",
  },

  /** 영업 시간 */
  hours: {
    weekday: "09:00 - 18:00",
    saturday: "09:00 - 13:00",
    holiday: "휴무",
  },

  /** 지도 */
  map: {
    lat: 0,
    lng: 0,
    kakaoMapUrl: "",
  },

  /** SNS */
  sns: {
    instagram: "",
    blog: "",
    youtube: "",
  },
} as const;

export type CompanyInfo = typeof companyInfo;
