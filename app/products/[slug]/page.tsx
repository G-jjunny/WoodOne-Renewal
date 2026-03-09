/**
 * 제품 상세 페이지 (/products/[slug])
 *
 * RSC: 서버 컴포넌트
 * 데이터 소스: entities/product (Green Forest 목업 데이터)
 *
 * SEO:
 *   - generateMetadata: 슬러그 기반 동적 메타
 *   - Product JSON-LD
 *   - BreadcrumbList: 홈 > 제품 갤러리 > [제품명]
 *   - notFound(): 존재하지 않는 슬러그 처리
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { Container } from "@/shared/ui/container";
import { createProductSchema, createBreadcrumbSchema } from "@/shared/config/schema";
import { getProductBySlug, greenForestProducts } from "@/entities/product";
import { cn } from "@/shared/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const FINISH_LABEL: Record<string, string> = {
  natural: "자연 무광",
  glossy: "유광",
  matte: "무광",
  brushed: "브러시드",
  oiled: "오일드",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "제품을 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteConfig.url}/products/${product.slug}`;
  const metaDescription = product.description.slice(0, 155);

  return {
    title: product.name,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: { "ko-KR": canonicalUrl },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${product.name} | 우드원`,
      description: metaDescription,
      images: [
        {
          url: product.images[0].src.startsWith("/")
            ? `${siteConfig.url}${product.images[0].src}`
            : product.images[0].src,
          width: 800,
          height: 600,
          alt: product.images[0].alt,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return greenForestProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const productSchema = createProductSchema({
    name: product.name,
    description: product.description,
    images: product.images.map((img) =>
      img.src.startsWith("/") ? `${siteConfig.url}${img.src}` : img.src
    ),
    slug: product.slug,
    category: "원목마루",
    sku: product.id,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", href: "/" },
    { name: "제품 갤러리", href: "/products" },
    { name: product.name, href: `/products/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd schema={productSchema} id="schema-product" />
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-product-detail" />

      {/* 페이지 헤더 */}
      <div className="bg-espresso-950 py-12">
        <Container>
          {/* 브레드크럼 */}
          <nav aria-label="브레드크럼" className="flex items-center gap-2 text-xs text-espresso-500 mb-6">
            <Link href="/" className="hover:text-espresso-300 transition-colors duration-150">홈</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="hover:text-espresso-300 transition-colors duration-150">제품 갤러리</Link>
            <span aria-hidden="true">/</span>
            <span className="text-espresso-300">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* 제품 상세 */}
      <article aria-labelledby="product-heading" className="py-16 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* 이미지 */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-espresso-100">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            {/* 정보 */}
            <div>
              {/* 배지 */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <span className="px-2 py-0.5 rounded bg-espresso-700 text-espresso-50 text-xs font-semibold">NEW</span>
                )}
                {product.isBestSeller && (
                  <span className="px-2 py-0.5 rounded bg-espresso-400 text-espresso-950 text-xs font-semibold">BEST</span>
                )}
              </div>

              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-espresso-500 mb-2">
                Green Forest
              </p>
              <h1
                id="product-heading"
                className="font-serif font-semibold text-espresso-900 mb-4"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {product.name}
              </h1>
              <p className="text-espresso-600 leading-relaxed mb-8" style={{ fontSize: "0.9375rem" }}>
                {product.description}
              </p>

              {/* 스펙 테이블 */}
              <div className="bg-espresso-50 rounded-xl border border-espresso-200 overflow-hidden mb-8">
                <dl className="divide-y divide-espresso-200">
                  {[
                    { label: "두께", value: `${product.thickness}mm` },
                    { label: "폭", value: `${product.width}mm` },
                    { label: "길이", value: `${product.length}mm` },
                    { label: "마감", value: FINISH_LABEL[product.finish] ?? product.finish },
                    { label: "컬러", value: product.colorTone ?? "-" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex px-5 py-3.5">
                      <dt className="w-24 text-sm font-semibold text-espresso-700 shrink-0">{label}</dt>
                      <dd className="text-sm text-espresso-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* 특징 목록 */}
              <ul className="space-y-2 mb-8" role="list">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-espresso-700">
                    <svg className="w-4 h-4 text-espresso-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    "flex-1 inline-flex items-center justify-center",
                    "px-6 py-3.5 rounded-lg",
                    "bg-espresso-800 text-espresso-50",
                    "text-sm font-semibold",
                    "hover:bg-espresso-900 transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-ring"
                  )}
                >
                  이 제품 문의하기
                </Link>
                <Link
                  href="/products"
                  className={cn(
                    "flex-1 inline-flex items-center justify-center",
                    "px-6 py-3.5 rounded-lg",
                    "border border-espresso-300 text-espresso-700",
                    "text-sm font-medium",
                    "hover:bg-espresso-100 transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:outline-ring"
                  )}
                >
                  갤러리로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
