// DriveLite - The self-hostable file storage solution.
// Copyright (C) 2025
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsFooterButtons from "@/_components/docs/DocsFooterButtons";
import DocsHeaderButtons from "@/_components/docs/DocsHeaderButtons";
import DocsMainPage from "@/_components/docs/DocsMainPage";
import { MobileSidebarToggle } from "@/_components/docs/DocsMobileSideNavbar";
import DocsOnThisPage from "@/_components/docs/DocsOnThisPage";
import { DocsSidebar } from "@/_components/docs/DocsSideNavbar";
import {
  getAllDocSlugs,
  getDocBySlug,
  getDocsStructure,
  getHeadingID,
  getPrevNextDoc,
} from "@/lib/docs.server";
import { defaultLocale, getAlternateUrl, getCanonicalUrl } from "@/lib/i18n";
import { useMDXComponents } from "@/mdx-components";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllDocSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[]; locale: string }>;
}) {
  const { locale = defaultLocale, slug = [] } = await params;

  const slugPath = slug.join("/");
  const doc = getDocBySlug(slugPath, locale);

  if (!doc) notFound();

  const markdownPath = `/docs/${locale}/${slugPath}.md`;
  const GithubPath = `https://github.com/DriveLite/DriveLite/blob/main/apps/landing_page/src/content/docs/${locale}/${slugPath}.md`;

  const { previous: previousDoc, next: nextDoc } = getPrevNextDoc(slugPath);
  const previousDocPath = previousDoc
    ? `/docs/${locale}/${previousDoc?.slug.join("/")}`
    : undefined;
  const nextDocPath = nextDoc
    ? `/docs/${locale}/${nextDoc.slug.join("/")}`
    : undefined;
  const previousDocName = previousDoc?.frontmatter.title;
  const nextDocName = nextDoc?.frontmatter.title;

  const components = useMDXComponents();
  const DocsStructue = getDocsStructure(locale);

  const headingsID = getHeadingID(doc.content);

  return (
    <>
      <section className="w-full min-h-screen flex">
        <aside className="hidden md:flex flex-shrink-0">
          <DocsSidebar structure={DocsStructue} locale={locale} />
        </aside>
        <div className="flex flex-1">
          <div className="w-full lg:w-[75%] section-container ">
            <MobileSidebarToggle structure={DocsStructue} locale={locale} />

            <DocsHeaderButtons
              NextDocLink={nextDocPath}
              PreviousDocLink={previousDocPath}
              ApiDocLink={markdownPath}
              GithubDocLink={GithubPath}
              DocTitle={doc.frontmatter.title}
              DocContent={doc.content}
              DocDescription={doc.frontmatter.description}
            />

            <DocsMainPage
              Components={components}
              DocOrder={doc.frontmatter.order}
              DocContent={doc.content}
            />

            <DocsFooterButtons
              PreviosDocName={previousDocName}
              PreviousDocLink={previousDocPath}
              NextDocName={nextDocName}
              NextDocLink={nextDocPath}
            />
          </div>
          <div className="hidden lg:block w-[25%]">
            <DocsOnThisPage ids={headingsID} />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: doc.frontmatter.title,
            description: doc.frontmatter.description,
            dateModified: doc.lastModified,
            language: locale,
            author: {
              "@type": "Organization",
              name: "DriveLite",
            },
            publisher: {
              "@type": "Organization",
              name: "DriveLite",
              logo: {
                "@type": "ImageObject",
                url: "https://drivelite.org/logo.svg",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": getCanonicalUrl(`/${slugPath}`, locale),
            },
          }),
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('lang', '${locale}');`,
        }}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[]; locale: string }>;
}): Promise<Metadata> {
  const { locale = defaultLocale, slug = [] } = await params;

  let slugPath = slug.length > 0 ? slug.join("/") : "index";
  if (slugPath.endsWith(".md")) slugPath = slugPath.replace(/\.md$/, "");

  const doc = getDocBySlug(slugPath, locale);
  if (!doc) {
    return {
      title: "Page Not Found - DriveLite Docs",
      description: "The requested documentation page was not found.",
    };
  }

  const canonicalUrl = getCanonicalUrl(slugPath, locale);
  const alternateUrl = getAlternateUrl(slugPath, locale);

  return {
    title: `${doc.frontmatter.title}`,
    description: doc.frontmatter.description,
    keywords: doc.frontmatter.keywords,
    authors: [{ name: "DriveLite Team" }],
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrl,
    },
    openGraph: {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      url: canonicalUrl,
      siteName: "DriveLite Documentation",
      type: "article",
      modifiedTime: doc.lastModified,
    },
    twitter: {
      card: "summary",
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: { lang: locale },
  };
}
