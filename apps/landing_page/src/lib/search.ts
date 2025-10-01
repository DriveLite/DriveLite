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

declare global {
  interface Window {
    Pagefind?: {
      init: () => Promise<void>;
      search: (
        query: string,
        options?: Record<string, unknown>,
      ) => Promise<{
        results: Array<{
          data: () => Promise<{
            url: string;
            meta?: { title?: string };
            excerpt?: string;
            content?: string;
          }>;
        }>;
      }>;
    };
  }
}

export class DocsSearch {
  private pagefind: Window["Pagefind"] | null;
  private initialized: boolean;

  constructor() {
    this.pagefind = null;
    this.initialized = false;
  }

  async init(): Promise<void> {
    if (this.initialized || typeof window === "undefined") return;

    try {
      // Dynamically import without type checking the module itself
      await import(
        /*webpackIgnore: true*/
        // @ts-ignore
        "/_pagefind/pagefind.js"
      );

      if (window.Pagefind) {
        this.pagefind = window.Pagefind;
        await this.pagefind.init();
        this.initialized = true;
      } else {
        console.warn("Pagefind not available, search will be disabled");
      }
    } catch (error) {
      console.error("Failed to initialize Pagefind:", error);
    }
  }

  async search(
    query: string,
    options: Record<string, unknown> = {},
  ): Promise<
    Array<{
      url: string;
      title: string;
      excerpt?: string;
      content?: string;
    }>
  > {
    if (!this.initialized) {
      await this.init();
    }

    if (!this.pagefind) return [];

    try {
      const search = await this.pagefind.search(query, options);
      const results = await Promise.all(
        search.results.map(async (result) => {
          const data = await result.data();
          return {
            url: data.url,
            title: data.meta?.title || "Documentation",
            excerpt: data.excerpt,
            content: data.content,
          };
        }),
      );

      return results;
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  }
}

export const docsSearch = new DocsSearch();
