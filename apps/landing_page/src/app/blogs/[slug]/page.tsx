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
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogsBreadCrumbs } from "@/_components/blogs/BlogsBreadCrumbs";
import { GetBlog, type SingleBlog } from "@/lib/Blogs";
import type { Metadata } from "next";

interface BlogPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog: SingleBlog | null = await GetBlog(slug);

  if (!blog) {
    return {
      title: "not found",
      description: "The blog you searched for isn't found",
      openGraph: {
        title: "not found | DriveLite",
        description: "The blog you searched for isn't found",
      },
    };
  }

  return {
    title: blog.title,
    description: blog.Overview,
    openGraph: {
      title: `${blog.title} | DriveLite`,
      description: blog.Overview,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const blog: SingleBlog | null = await GetBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <section className="section">
      <div className="section-container">
        <BlogsBreadCrumbs title={blog.title} />
        <div className="mb-10 mt-3">
          <h1 className="text-xl md:text-3xl font-black mb-3 text-start">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-500 mb-3 flex items-center justify-between">
            <p>
              {new Date(blog.published_at).toLocaleDateString()} — {blog.Author}
            </p>
            <p className="flex items-center justify-center">
              {blog.ESRT}m <Clock size={16} className="text-gray-500 ml-2" />
            </p>
          </div>
        </div>

        <article
          className="min-w-full prose prose-headings:font-semibold prose-headings:relative prose-headings:outline-0 text-foreground
            prose-h1:text-3xl prose-h1:m-0  prose-h1:leading-[40px] prose-h2:text-2xl prose-h2:not-first:mt-[48px] 
            prose-h2:mx-0 prose-h2:mb-[16px] prose-h2:not-first:pt-[24px] 
            prose-h2:leading-[32px] prose-h3:text-xl prose-h3:mt-[32px] prose-h3:leading-[28px] 
            prose-h4:text-lg prose-h4:mt-[24px] prose-h4:leading-[24px] prose-headings:text-foreground prose-p:my-[16px] 
            prose-p:leading-[28px] prose-a:underline prose-a:-underline-offset-[-2px] prose-a:text-primary prose-a:hover:brightness-120 
            prose-strong:font-semibold prose-hr:w-full"
        >
          <MDXRemote source={blog.Content} />
        </article>
      </div>
    </section>
  );
}
