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

import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { defaultLocale } from "@/lib/i18n";

export async function GET(
  _req: Request,
  context: { params: Promise<{ locale: string; slug: string[] }> },
) {
  // Await the dynamic params
  const { locale = defaultLocale, slug = [] } = await context.params;

  // Join slug segments
  let slugPath = slug.join("/");

  // Strip .md if included
  if (slugPath.endsWith(".md")) slugPath = slugPath.slice(0, -3);

  // Full path to your source markdown
  const docsPath = path.join(
    process.cwd(),
    "src/content/docs",
    locale,
    `${slugPath}.md`,
  );

  try {
    const file = await fs.readFile(docsPath, "utf8");
    return new NextResponse(file, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  } catch (_err) {
    console.error("Markdown file not found:", docsPath);
    return new NextResponse("Not Found", { status: 404 });
  }
}
