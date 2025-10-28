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

import { BlogAndContent, getAllBlogsAndContent } from "@/lib/Blogs";
import { NextResponse } from "next/server";
import RSS from "rss";

export async function GET() {
  const siteUrl = "https://drivelite.org";
  const blogs: BlogAndContent[] | null = await getAllBlogsAndContent();

  if (!blogs) {
    return new NextResponse("Error generating feed", { status: 500 });
  }

  const feed = new RSS({
    title: "DriveLite Blog",
    description: "Latest updates and changelogs from DriveLite.org",
    site_url: siteUrl,
    feed_url: `${siteUrl}/api/feed`,
    language: "en",
  });

  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: blog.Overview,
      url: `${siteUrl}/blogs/${blog.slug}`,
      date: blog.published_at,
      author: blog.Author,
      custom_elements: [{ "content:encoded": blog.Content }],
    });
  });

  const xml = feed.xml({ indent: true });

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}
