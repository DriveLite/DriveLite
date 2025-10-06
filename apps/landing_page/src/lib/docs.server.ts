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

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { defaultLocale, locales } from "./i18n";

interface Doc {
  slug: string[];
  locale: string;
  frontmatter: {
    title: string;
    description: string;
    keywords?: string;
    order: number;
  };
  content: string;
  filepath: string;
  lastModified: string;
}

interface StructureFile {
  slug: string;
  name: string;
  path: string;
}

interface StructureFolder {
  name: string;
  slug: string;
  path: string;
  files: StructureFile[];
  folders: StructureFolder[];
}

interface DirectoryStructure {
  files: StructureFile[];
  folders: StructureFolder[];
}

export interface Slugs {
  locale: string;
  slug: string[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const docsDirectory = path.join(__dirname, "../content/docs");

export function getAllDocs(locale = defaultLocale): Doc[] {
  const localePath = path.join(docsDirectory, locale);

  if (!fs.existsSync(localePath)) {
    console.warn(`Locale path not found: ${localePath}`);
    return [];
  }

  return getDocsFromDirectory(localePath, locale);
}

export function getDocBySlug(
  slug: string[] | string,
  locale = defaultLocale,
): Doc | undefined {
  const slugArray = Array.isArray(slug)
    ? slug
    : slug.split("/").filter(Boolean);
  const allDocs = getAllDocs(locale);
  return allDocs.find((doc) => {
    // Compare arrays
    return doc.slug.join("/") === slugArray.join("/");
  });
}

export function getDocsStructure(locale = defaultLocale) {
  const localePath = path.join(docsDirectory, locale);

  if (!fs.existsSync(localePath)) {
    return { files: [], folders: [] };
  }

  return buildStructureFromDirectory(localePath, locale);
}

export function getAllDocSlugs() {
  const slugs: { locale: string; slug: string[]; order?: number }[] = [];

  for (const locale of locales) {
    const docs = getAllDocs(locale);

    docs.forEach((doc) => {
      if (doc.slug.length === 0) return; // skip root index

      slugs.push({
        locale,
        slug: doc.slug,
        order: doc.frontmatter?.order ?? 999, // default order if not set
      });
    });
  }

  // Sort by locale and order first
  slugs.sort((a, b) => {
    if (a.locale !== b.locale) return a.locale.localeCompare(b.locale);
    return (a.order ?? 999) - (b.order ?? 999);
  });

  // Remove `order` before returning (optional)
  return slugs.map(({ locale, slug }) => ({ locale, slug }));
}

export function generateBreadcrumbs(slug: string, locale: string) {
  const segments = slug.split("/").filter(Boolean);
  const breadcrumbs = [
    { name: "Home", href: locale === defaultLocale ? "/" : `/${locale}` },
    {
      name: "Documentation",
      href: locale === defaultLocale ? "/docs" : `/${locale}/docs`,
    },
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    if (index < segments.length - 1) {
      breadcrumbs.push({
        name: formatTitle(segment),
        href:
          locale === defaultLocale
            ? `/docs${currentPath}`
            : `/${locale}/docs${currentPath}`,
      });
    }
  });

  return breadcrumbs;
}

export function sortDocs(docs: Doc[]): Doc[] {
  const sortedDocs = docs
    .slice()
    .sort(
      (a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999),
    );
  return sortedDocs;
}

export function getPrevNextDoc(
  slug: string[] | string,
  locale = defaultLocale,
) {
  const slugArray = Array.isArray(slug)
    ? slug
    : slug.split("/").filter(Boolean);

  const allDocs = getAllDocs(locale);

  const sorteddocs = sortDocs(allDocs);

  const index = sorteddocs.findIndex(
    (doc) => doc.slug.join("/") === slugArray.join("/"),
  );

  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  const previous = index > 0 ? sorteddocs[index - 1] : undefined;
  const next =
    index < sorteddocs.length - 1 ? sorteddocs[index + 1] : undefined;

  return { previous, next };
}

function getDocsFromDirectory(
  dirPath: string,
  locale: string,
  baseSlug: string[] = [],
): Doc[] {
  let docs: Doc[] = [];

  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullpath = path.join(dirPath, item);
      const stat = fs.statSync(fullpath);

      if (stat.isDirectory()) {
        // Recurse into subdirectory
        const subDocs = getDocsFromDirectory(fullpath, locale, [
          ...baseSlug,
          item,
        ]);
        docs = docs.concat(subDocs);
      } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
        // Read file contents
        const fileContents = fs.readFileSync(fullpath, "utf8");
        const { data: frontmatter, content } = matter(fileContents);

        const slugPart = item.replace(/\.(mdx|md)$/, "");

        // If file is index, we use the folder path only
        const slug =
          slugPart === "index" ? [...baseSlug] : [...baseSlug, slugPart];

        docs.push({
          slug,
          locale,
          frontmatter: {
            title: frontmatter.title || formatTitle(item),
            description: frontmatter.description || extractDescription(content),
            keywords: frontmatter.keywords || "",
            order: frontmatter.order,
            ...frontmatter,
          },
          content,
          filepath: fullpath,
          lastModified: stat.mtime.toISOString(),
        });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  return docs;
}

function formatTitle(filename: string) {
  return filename
    .replace(/\.(mdx|md)$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function extractDescription(content: string) {
  // Extract first paragraph for description
  const firstParagraph = content.split("\n\n").find((p) => p.trim().length > 0);
  if (firstParagraph) {
    return firstParagraph
      .replace(/[#*`]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);
  }
  return "DriveLite documentation page";
}

function buildStructureFromDirectory(
  dirPath: string,
  locale: string,
  baseSlug = "",
): DirectoryStructure {
  const structure: DirectoryStructure = {
    files: [],
    folders: [],
  };

  try {
    const items: string[] = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const folderSlug = path.join(baseSlug, item);
        const children: DirectoryStructure = buildStructureFromDirectory(
          fullPath,
          locale,
          folderSlug,
        );

        structure.folders.push({
          name: formatTitle(item),
          slug: item,
          path: folderSlug,
          files: children.files,
          folders: children.folders,
        });
      } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
        structure.files.push({
          slug: path.join(baseSlug, item.replace(/\.(mdx|md)$/, "")),
          name: formatTitle(item),
          path: path.join(baseSlug, item),
        });
      }
    }
  } catch (error) {
    console.error(`Error building structure from ${dirPath}:`, error);
  }

  return structure;
}
