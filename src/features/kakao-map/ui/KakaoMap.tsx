"use client";
/**
 * KakaoMap — 카카오맵 지도 컴포넌트
 *
 * 'use client' 이유:
 *   - window 전역 객체 접근 필요 (카카오맵 SDK)
 *   - useEffect로 지도 초기화
 *   - useRef로 지도 컨테이너 DOM 참조
 *
 * 카카오맵 API 키:
 *   환경변수 NEXT_PUBLIC_KAKAO_MAP_KEY (next.config.ts 또는 .env.local)
 *
 * 카카오맵 SDK 로드 전략:
 *   Script 컴포넌트(next/script)는 'use client'에서 사용 불가.
 *   동적 script 태그 생성 방식으로 로드.
 *
 * 좌표: 실제 우드원 주소 확정 후 lat/lng 값을 업데이트하세요.
 *   현재: 서울시 강남구 테헤란로 기준 예시 좌표
 */

import { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  /** 지도 중심 위도 (기본값: 우드원 주소 예시) */
  lat?: number;
  /** 지도 중심 경도 */
  lng?: number;
  /** 지도 확대 레벨 (1 = 최대 확대) */
  level?: number;
  /** 마커 제목 */
  markerTitle?: string;
  /** 지도 컨테이너 className */
  className?: string;
}

// kakao 전역 타입 선언 (TypeScript 에러 방지)
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: object) => object;
        LatLng: new (lat: number, lng: number) => object;
        Marker: new (options: object) => { setMap: (map: object | null) => void };
        InfoWindow: new (options: object) => {
          open: (map: object, marker: object) => void;
        };
      };
    };
  }
}

export function KakaoMap({
  lat = 37.5012,
  lng = 127.0396,
  level = 4,
  markerTitle = "우드원",
  className = "",
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "loaded" | "error">("idle");

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

    if (!apiKey) {
      console.warn("[KakaoMap] NEXT_PUBLIC_KAKAO_MAP_KEY 환경변수가 설정되지 않았습니다.");
      setLoadState("error");
      return;
    }

    // 이미 로드된 경우 초기화만 실행
    if (window.kakao?.maps) {
      initializeMap();
      return;
    }

    setLoadState("loading");

    // 동적 스크립트 주입
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoadState("loaded");
        initializeMap();
      });
    };

    script.onerror = () => {
      setLoadState("error");
    };

    document.head.appendChild(script);

    return () => {
      // cleanup: 스크립트 제거 (언마운트 시)
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initializeMap() {
    if (!mapRef.current || !window.kakao?.maps) return;

    const center = new window.kakao.maps.LatLng(lat, lng);

    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level,
    });

    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      position: center,
      title: markerTitle,
      map,
    });

    // 인포윈도우 (회사명 표시)
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding: 8px 12px; font-size: 13px; font-weight: 600; color: #2a1f0e; white-space: nowrap;">${markerTitle}</div>`,
      removable: false,
    });
    infowindow.open(map, marker);
  }

  return (
    <div className={`relative ${className}`}>
      {/* 지도 컨테이너 */}
      <div
        ref={mapRef}
        className="w-full h-full rounded-xl overflow-hidden"
        aria-label={`${markerTitle} 위치 지도`}
        role="img"
      />

      {/* 로딩 오버레이 */}
      {loadState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-espresso-50 rounded-xl">
          <div className="flex flex-col items-center gap-3 text-espresso-500">
            <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm">지도를 불러오는 중...</span>
          </div>
        </div>
      )}

      {/* 에러 상태 */}
      {loadState === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-espresso-50 rounded-xl border border-espresso-200">
          <div className="text-center text-espresso-500">
            <svg className="w-10 h-10 mx-auto mb-3 text-espresso-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="text-sm font-medium text-espresso-700">지도를 불러올 수 없습니다</p>
            <p className="text-xs text-espresso-400 mt-1">카카오맵 API 키를 확인해 주세요</p>
          </div>
        </div>
      )}
    </div>
  );
}
