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

import { notFound } from "next/navigation";

type BlogPageProps = {
  params: {
    slug?: string[];
  };
};

export async function generateStaticParams() {
  return [{ slug: ["a"] }, { slug: ["b"] }, { slug: ["c"] }];
}

export default async function Blog({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || []; // optional catch-all may be undefined
  const slugPath = slugArray.join("/"); // join if you want a path-like string

  const validSlugs = [["a"], ["b"], ["c"]];

  const isValid = validSlugs.some(
    (valid) => JSON.stringify(valid) === JSON.stringify(slugArray),
  );

  if (!isValid) {
    notFound(); // Show 404 if slug is invalid
  }

  return (
    <div>
      <h1>Blog page</h1>
      <p>Current slug: {slugPath || "home"}</p>
    </div>
  );
}
