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

interface searchResult {
  url: string;
  title: string;
  excerpt?: string;
  content?: string;
}

interface PagefindResultData {
  url: string;
  meta?: {
    title?: string;
  };
  excerpt: string;
  content: string;
}

interface PagefindResult {
  data: () => Promise<PagefindResultData>;
}

export async function SearchDocs(query: string): Promise<searchResult[]> {
  const pagefind = await import(
    /*webpackIgnore: true*/
    // @ts-expect-error
    "/_pagefind/pagefind.js"
  );

  pagefind.init();

  const search = await pagefind.search(query, {
    sort: {
      order: "asc",
    },
  });

  const results = await Promise.all(
    search.results.map(async (result: PagefindResult) => {
      const data = await result.data();
      const cleanURL = data.url.replace(/\.html$/, "");
      return {
        url: cleanURL,
        title: data.meta?.title || "Documentation",
        excerpt: data.excerpt,
        content: data.content,
      };
    }),
  );

  return results;
}
