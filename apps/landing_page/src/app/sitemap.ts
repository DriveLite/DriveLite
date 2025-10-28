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

import type { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/docs.server";
import { locales } from "@/lib/i18n";
import { Blogs, getAllBlogs } from "@/lib/Blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseurl = "https://drivelite.org";
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseurl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseurl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const blogsRoutes: MetadataRoute.Sitemap = [];

  const blogs: Blogs[] | null = await getAllBlogs();

  blogs?.forEach((blog) => {
    blogsRoutes.push({
      url: `${baseurl}/blogs/${blog.slug}`,
      lastModified: blog.published_at,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  const docsRoutes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const docs = getAllDocs(locale);

    docs.forEach((doc) => {
      const slugPath = doc.slug.join("/");
      const path = `/docs/${locale}/${slugPath}`;

      docsRoutes.push({
        url: `${baseurl}${path}`,
        lastModified: new Date(doc.lastModified),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {},
        },
      });
    });
  }

  return [...staticRoutes, ...blogsRoutes, ...docsRoutes];
}
