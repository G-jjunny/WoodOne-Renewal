/**
 * 시공 사례 상세 페이지 (/projects/[slug])
 *
 * SEO 전략:
 *   - generateMetadata: 슬러그 기반 동적 메타 생성
 *   - notFound(): 존재하지 않는 슬러그 404 처리
 *   - BreadcrumbList: 홈 > 시공 사례 > [사례명]
 *
 * TODO: CMS/DB 연동 후 getProjectBySlug 구현 필요
 *
 * RSC: 서버 컴포넌트
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/json-ld";
import { createBreadcrumbSchema } from "@/shared/config/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

interface Project {
  slug: string;
  title: string;
  description: string;
  images: string[];
  location?: string;
  spaceType?: string; // 아파트, 주택, 상업 공간 등
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  // TODO: 실제 API/CMS 호출로 교체
  void slug;
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "시공 사례를 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`;
  const metaDescription = project.description.slice(0, 155);

  return {
    title: project.title,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: { "ko-KR": canonicalUrl },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${project.title} | 우드원 시공 사례`,
      description: metaDescription,
      images: project.images.slice(0, 1).map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${project.title} 시공 사례 — 우드원`,
      })),
    },
  };
}

export async function generateStaticParams() {
  // TODO: 실제 시공 사례 슬러그 목록으로 교체
  return [];
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", href: "/" },
    { name: "시공 사례", href: "/projects" },
    { name: project.title, href: `/projects/${project.slug}` },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbSchema} id="schema-breadcrumb-project-detail" />

      <article aria-labelledby="project-heading">
        <h1 id="project-heading">{project.title}</h1>
        <p>{project.description}</p>
      </article>
    </>
  );
}
