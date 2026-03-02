import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * 이미지 최적화 설정
   * Product Image Optimization Specialist가 이미지 소재 입고 후
   * sizes, remotePatterns, deviceSizes를 확정합니다.
   * 현재 단계: 기본 포맷 설정만 활성화
   */
  images: {
    formats: ["image/avif", "image/webp"],
    // 원목마루 제품 이미지 특성: 가로형 비율 (3:2, 16:9)
    // 실제 sizes는 ProductCard, HeroSection 구현 시 확정
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * 실험적 기능
   * React 19 + Next.js 16 환경에서 안정적으로 동작하는 항목만 활성화
   */
  experimental: {
    // PPR (Partial Prerendering): 안정화 후 활성화 검토
    // ppr: true,
  },
};

export default nextConfig;
