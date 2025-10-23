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

import { supabase } from "./supabase";

export interface Blogs {
  slug: string;
  title: string;
  Overview: string;
  published_at: string;
  published: boolean;
  Author: string;
  ESRT: string;
}

export interface SingleBlog {
  slug: string;
  title: string;
  Overview: string;
  published_at: string;
  Author: string;
  Content: string;
  ESRT: string;
}

export async function getAllBlogs(): Promise<Blogs[] | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, overview, published_at, published, Author, ESRT")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Database query error:", error);
    return null;
  }

  return (data ?? []).map((post) => ({
    slug: post.slug,
    title: post.title,
    Overview: post.overview,
    published_at: post.published_at,
    published: post.published,
    Author: post.Author,
    ESRT: post.ESRT,
  }));
}

export async function GetBlog(slug: string): Promise<SingleBlog | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, overview ,published_at,Author,content,ESRT")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Database query error while fetching single blog:", error);
    return null;
  }

  return {
    slug: data.slug,
    title: data.title,
    Overview: data.overview,
    published_at: data.published_at,
    Author: data.Author,
    Content: data.content,
    ESRT: data.ESRT,
  };
}
