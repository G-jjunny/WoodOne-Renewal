/**
 * 찾아오시는 길 (/location)
 *
 * RSC: 서버 컴포넌트
 * KakaoMap (Client Component)을 lazy import하여 지도 렌더링
 *
 * 카카오맵 API 키: NEXT_PUBLIC_KAKAO_MAP_KEY 환경변수
 * 좌표: 실제 우드원 주소로 업데이트 필요 (현재 예시 좌표)
 *
 * SEO:
 *   - BreadcrumbList: 홈 > 찾아오시는 길
 *   - LocalBusiness 스키마 잠재적 추가 위치
 */

import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";
import { Container } from "@/shared/ui/container";
import { KakaoMap } from "@/features/kakao-map";
import { cn } from "@/shared/lib/utils";

export const metadata: Metadata = {
  title: "찾아오시는 길",
  description:
    "우드원 방문 안내. 카카오맵으로 정확한 위치를 확인하세요. 대중교통 및 자가용 이용 안내를 제공합니다.",
  alternates: {
    canonical: `${siteConfig.url}/location`,
    languages: {
      "ko-KR": `${siteConfig.url}/location`,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/location`,
    title: "찾아오시는 길 | 우드원",
    description: "우드원 방문 안내. 주소, 대중교통, 자가용 이용 안내.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "우드원 찾아오시는 길",
      },
    ],
  },
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "홈", href: "/" },
  { name: "찾아오시는 길", href: "/location" },
]);

/* 교통 안내 정보 — 실제 우드원 주소 확정 후 업데이트 필요 */
const TRANSPORT_INFO = [
  {
    type: "지하철",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: [
      "2호선 강남역 3번 출구 → 도보 5분",
      "신분당선 강남역 5번 출구 → 도보 7분",
    ],
  },
  {
    type: "버스",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: [
      "간선 146, 341, 360 → 강남역 정류장 하차",
      "지선 4211, 4318 → 강남역 정류장 하차",
    ],
  },
  {
    type: "자가용",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    lines: [
      "네비게이션 검색: 우드원 또는 서울시 강남구 테헤란로 123",
      "건물 지하 주차장 이용 가능 (2시간 무료)",
    ],
  },
] as const;

export default function LocationPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-location" />

      {/* 페이지 헤더 */}
      <section
        aria-labelledby="location-page-heading"
        className="py-16 bg-espresso-950"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-espresso-400 mb-3">
              Location
            </p>
            <h1
              id="location-page-heading"
              className="font-serif font-semibold text-espresso-50 mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", lineHeight: 1.2 }}
            >
              찾아오시는 길
            </h1>
            <p className="text-espresso-300 leading-relaxed" style={{ fontSize: "0.9375rem" }}>
              우드원 쇼룸 방문을 환영합니다. 다양한 원목마루 샘플을 직접 확인하실 수 있습니다.
            </p>
          </div>
        </Container>
      </section>

      {/* 지도 + 정보 섹션 */}
      <section aria-label="위치 및 교통 안내" className="py-16 lg:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* 지도 영역 — 3/5 폭 */}
            <div className="lg:col-span-3">
              {/*
                KakaoMap — Client Component
                높이는 고정 h-[400px] / lg:h-[520px]
                실제 우드원 좌표로 업데이트 필요
              */}
              <KakaoMap
                lat={37.5012}
                lng={127.0396}
                level={4}
                markerTitle="우드원"
                className="h-[400px] lg:h-[520px]"
              />
            </div>

            {/* 정보 영역 — 2/5 폭 */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* 주소 정보 */}
              <div>
                <h2 className="text-base font-semibold text-espresso-900 mb-4">주소</h2>
                <address
                  className={cn(
                    "not-italic",
                    "p-5 rounded-xl",
                    "bg-espresso-50 border border-espresso-200"
                  )}
                >
                  <p className="text-sm font-semibold text-espresso-800 mb-1">주식회사 우드원</p>
                  <p className="text-sm text-espresso-700 leading-relaxed">
                    서울특별시 강남구 테헤란로 123
                    <br />
                    우드원빌딩 5층
                    <br />
                    (우편번호: 06234)
                  </p>
                  <div className="mt-3 pt-3 border-t border-espresso-200 space-y-1">
                    <p className="text-sm text-espresso-600">
                      <span className="font-medium text-espresso-700">Tel.</span>{" "}
                      <a href="tel:021234567" className="hover:text-espresso-900 transition-colors duration-150">
                        02-1234-5678
                      </a>
                    </p>
                    <p className="text-sm text-espresso-600">
                      <span className="font-medium text-espresso-700">Email.</span>{" "}
                      <a href="mailto:info@woodone.co.kr" className="hover:text-espresso-900 transition-colors duration-150">
                        info@woodone.co.kr
                      </a>
                    </p>
                  </div>
                </address>
              </div>

              {/* 영업시간 */}
              <div>
                <h2 className="text-base font-semibold text-espresso-900 mb-4">영업시간</h2>
                <dl
                  className={cn(
                    "p-5 rounded-xl",
                    "bg-espresso-50 border border-espresso-200",
                    "space-y-2"
                  )}
                >
                  {[
                    { day: "평일", time: "09:00 — 18:00" },
                    { day: "토요일", time: "09:00 — 13:00" },
                    { day: "일요일 / 공휴일", time: "휴무" },
                  ].map(({ day, time }) => (
                    <div key={day} className="flex justify-between text-sm">
                      <dt className={cn(
                        "font-medium",
                        time === "휴무" ? "text-espresso-400" : "text-espresso-700"
                      )}>
                        {day}
                      </dt>
                      <dd className={time === "휴무" ? "text-espresso-400" : "text-espresso-700"}>
                        {time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* 교통 안내 */}
              <div>
                <h2 className="text-base font-semibold text-espresso-900 mb-4">교통 안내</h2>
                <ul className="space-y-4" role="list">
                  {TRANSPORT_INFO.map(({ type, icon, lines }) => (
                    <li
                      key={type}
                      className={cn(
                        "p-4 rounded-xl",
                        "bg-espresso-50 border border-espresso-200"
                      )}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-espresso-200 text-espresso-700 flex items-center justify-center shrink-0" aria-hidden="true">
                          {icon}
                        </div>
                        <h3 className="text-sm font-semibold text-espresso-900">{type}</h3>
                      </div>
                      <ul className="space-y-1 ml-10.5" role="list">
                        {lines.map((line) => (
                          <li key={line} className="text-xs text-espresso-600 leading-relaxed">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
