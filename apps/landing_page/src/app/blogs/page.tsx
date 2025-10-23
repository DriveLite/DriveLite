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

import { Clock } from "lucide-react";
import Link from "next/link";
import { type Blogs, getAllBlogs } from "@/lib/Blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Latest updates, announcements, and stories from the DriveLite team.",
  openGraph: {
    title: "Blogs | DriveLite",
    description:
      "Latest updates, announcements, and stories from the DriveLite team.",
  },
};

export default async function BlogsPage() {
  const blogs: Blogs[] | null = await getAllBlogs();

  if (!blogs) {
    return (
      <section className="section">
        <div className="section-container">
          <h1 className="text-xl md:text-3xl font-black my-5 text-center">
            Blog Posts
          </h1>
          <p className="text-md md:text-xl my-5 text-foreground/50 text-center">
            Latest updates, announcements, and stories from the DriveLite team.
          </p>

          <p>Something went wrong</p>
          <p>We couldn’t load the blogs right now. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="section">
        <div className="section-container">
          <h1 className="text-xl md:text-3xl font-black my-5 text-center">
            Blog Posts
          </h1>
          <p className="text-md md:text-xl my-5 text-foreground/50 text-center">
            Latest updates, announcements, and stories from the DriveLite team.
          </p>

          <p>No blog posts</p>
        </div>
      </section>
    );
  }
  return (
    <section className="section">
      <div className="section-container">
        <h1 className="text-xl md:text-3xl font-black my-5 text-center">
          Blog Posts
        </h1>
        <p className="text-md md:text-xl my-5 text-foreground/50 text-center">
          Latest updates, announcements, and stories from the DriveLite team.
        </p>

        <div className="flex flex-col gap-4 mx-auto">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="block bg-background-section-alt p-6 rounded-md hover:prose-h2:text-primary"
            >
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                {new Date(blog.published_at).toLocaleDateString()} —{" "}
                {blog.Author}
              </p>
              <div className="mb-3 flex items-center justify-between">
                <p>{blog.Overview}</p>
                <p className="flex items-center justify-center text-sm text-gray-500 ">
                  {blog.ESRT}m{" "}
                  <Clock size={16} className="text-gray-500 ml-2" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
