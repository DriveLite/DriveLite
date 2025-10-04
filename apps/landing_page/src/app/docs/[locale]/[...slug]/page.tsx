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

import DocsBreadCrumbs from "@/_components/docs/DocsBreadCrumb";
import { getAllDocSlugs, getDocBySlug } from "@/lib/docs.server";
import { defaultLocale } from "@/lib/i18n";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllDocSlugs().map(({ locale, slug }) => {
    return { locale, slug };
  });
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug?: string[]; locale: string }>;
}) {
  const { locale = defaultLocale, slug = [] } = await params;

  const slugPath = slug.length > 0 ? slug.join("/") : "index";

  const doc = getDocBySlug(slugPath, locale);

  if (!doc) {
    console.log(slugPath);
    notFound();
  }

  return (
    <section>
      <div className="section-container">
        <div className="text-foreground hover:text-background dark:text-foreground dark:hover:text-background prose prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg  prose-headings:text-foreground">
          <DocsBreadCrumbs />
          <MDXRemote source={doc.content} />
        </div>
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
  const slugPath = slug.length > 0 ? slug.join("/") : "index";

  const doc = getDocBySlug(slugPath, locale);

  if (!doc) {
    return {
      title: "Page Not Found - DriveLite Docs",
      description: "The requested documentation page was not found.",
    };
  }
  return {
    title: `${doc.frontmatter.title} - DriveLite Documentation`,
    description: doc.frontmatter.description,
    other: {
      lang: locale,
    },
  };
}
