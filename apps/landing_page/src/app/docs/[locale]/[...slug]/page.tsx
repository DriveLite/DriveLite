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
import { MDXRemote } from "next-mdx-remote/rsc";
import DocsBreadCrumbs from "@/_components/docs/DocsBreadCrumb";
import DocsHeaderButtons from "@/_components/docs/DocsHeaderButtons";
import {
  getAllDocSlugs,
  getDocBySlug,
  getDocsStructure,
  getPrevNextDoc,
} from "@/lib/docs.server";
import { defaultLocale } from "@/lib/i18n";

export const dynamicParams = false;

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

  console.log(getDocsStructure(locale));

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: doc.frontmatter.title,
            description: doc.frontmatter.description,
            dateModified: doc.lastModified,
            author: {
              "@type": "Organization",
              name: "DriveLite",
            },
            publisher: {
              "@type": "Organization",
              name: "DriveLite",
              logo: {
                "@type": "ImageObject",
                url: "https://drivelite.org/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              // "@id": getCanonicalUrl(`/docs/${slugPath}`, locale),
            },
          }),
        }}
      />
      <div className="section-container">
        <DocsBreadCrumbs />
        <header className="my-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h1 className="scroll-m-20 font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                {doc.frontmatter.title}
              </h1>
              <DocsHeaderButtons
                NextDocLink={nextDocPath}
                PreviousDocLink={previousDocPath}
                ApiDocLink={markdownPath}
                GithubDocLink={GithubPath}
                DocContent={doc.content}
              />
            </div>
            {doc.frontmatter.description && (
              <p className=" text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                {doc.frontmatter.description}
              </p>
            )}
          </div>
        </header>
        <main data-pagefind-body>
          <div className="min-w-full prose prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-md prose-headings:text-foreground prose-a:underline prose-hr:w-full">
            <MDXRemote source={doc.content} />
          </div>
          <p className="sr-only" data-pagefind-sort="order">
            {doc.frontmatter.order}
          </p>
        </main>
      </div>
    </section>
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

  return {
    title: `${doc.frontmatter.title} | DriveLite Documentation`,
    description: doc.frontmatter.description,
    other: { lang: locale },
  };
}
