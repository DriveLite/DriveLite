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

import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MainPageProps {
  DocOrder: number;
  DocContent: string;
  Components: Readonly<MDXComponents>;
}
export default function DocsMainPage({
  Components,
  DocContent,
  DocOrder,
}: MainPageProps) {
  return (
    <main data-pagefind-body>
      <article
        className="
            doc min-w-full prose prose-headings:font-semibold prose-headings:relative prose-headings:outline-0 
            prose-h1:text-3xl prose-h1:m-0  prose-h1:leading-[40px] prose-h2:text-2xl prose-h2:not-first:mt-[48px] 
            prose-h2:mx-0 prose-h2:mb-[16px] prose-h2:not-first:pt-[24px] prose-h2:not-first:border-t prose-h2:not-first:border-t-foreground/10  
            prose-h2:leading-[32px] prose-h3:text-xl prose-h3:mt-[32px] prose-h3:leading-[28px] 
            prose-h4:text-lg prose-h4:mt-[24px] prose-h4:leading-[24px] prose-headings:text-foreground prose-p:my-[16px] 
            prose-p:leading-[28px] prose-a:underline prose-a:-underline-offset-[-2px] prose-a:text-primary prose-a:hover:brightness-120 
            prose-strong:font-semibold prose-strong:text-muted-foreground prose-p:text-muted-foreground prose-hr:w-full
            "
      >
        <MDXRemote source={DocContent} components={Components} />
      </article>
      <p className="sr-only" data-pagefind-sort="order">
        {DocOrder}
      </p>
    </main>
  );
}
