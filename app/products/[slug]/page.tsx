/**
 * 제품 상세 페이지 (/products/[slug])
 *
 * SEO 전략:
 *   - generateMetadata: 슬러그 기반으로 제품 데이터를 fetch하여 동적 메타 생성
 *   - notFound() 처리: 존재하지 않는 슬러그에 404 반환 (메타 누수 방지)
 *   - Product JSON-LD: 가격/재고 정보 포함 시 리치 결과 자격 획득
 *   - BreadcrumbList: 홈 > 제품 소개 > [제품명]
 *   - OG type: "website" 유지 (제품 상세이지만 og:type "product"는 표준 미지원)
 *
 * TODO: 실제 CMS/DB 연동 후 getProductBySlug 함수를 구현하세요.
 *
 * RSC: 서버 컴포넌트
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import {
  createProductSchema,
  createBreadcrumbSchema,
} from "@/shared/config/schema";

/* ============================================================
   타입 정의
   ============================================================ */
interface Props {
  params: Promise<{ slug: string }>;
}

/* ============================================================
   임시 제품 데이터 (TODO: CMS/DB 연동으로 교체)
   실제 데이터 소스가 연결되면 이 함수를 삭제하세요.
   ============================================================ */
interface Product {
  slug: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  sku?: string;
  price?: number;
}

async function getProductBySlug(slug: string): Promise<Product | null> {
  // TODO: 실제 API/CMS 호출로 교체
  // 예: const res = await fetch(`${process.env.API_URL}/products/${slug}`, { next: { revalidate: 3600 } });
  // if (!res.ok) return null;
  // return res.json();

  // 현재는 존재하지 않는 제품은 null 반환 (404 처리)
  void slug;
  return null;
}

/* ============================================================
   동적 메타데이터 생성
   제품 데이터가 없으면 notFound()로 404 반환하여 메타 누수를 방지합니다.
   ============================================================ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // 제품 없음: 검색 엔진에 404 신호 전달
  if (!product) {
    return {
      title: "제품을 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteConfig.url}/products/${product.slug}`;
  // description: 160자 제한 (SERP 스니펫 잘림 방지)
  const metaDescription = product.description.slice(0, 155);

  return {
    title: product.name,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ko-KR": canonicalUrl,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${product.name} | 우드원`,
      description: metaDescription,
      images: product.images.slice(0, 1).map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${product.name} — 우드원 ${product.category}`,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | 우드원`,
      description: metaDescription,
      images: product.images.slice(0, 1),
    },
  };
}

/* ============================================================
   정적 경로 사전 생성 (빌드 타임 SSG)
   TODO: CMS/DB에서 모든 슬러그를 가져와서 반환하세요.
   ============================================================ */
export async function generateStaticParams() {
  // TODO: 실제 제품 슬러그 목록으로 교체
  // const products = await getAllProductSlugs();
  // return products.map((p) => ({ slug: p.slug }));
  return [];
}

/* ============================================================
   제품 상세 페이지 컴포넌트
   ============================================================ */
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  /* Product + BreadcrumbList JSON-LD */
  const productSchema = createProductSchema({
    name: product.name,
    description: product.description,
    images: product.images,
    slug: product.slug,
    category: product.category,
    sku: product.sku,
    price: product.price,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", href: "/" },
    { name: "제품 소개", href: "/products" },
    { name: product.name, href: `/products/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd schema={productSchema} id="schema-product" />
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-product-detail" />

      {/* 제품 상세 콘텐츠 — 추후 <ProductDetail /> 위젯으로 교체 */}
      <article aria-labelledby="product-heading">
        <h1 id="product-heading">{product.name}</h1>
        <p>{product.description}</p>
      </article>
    </>
  );
}
