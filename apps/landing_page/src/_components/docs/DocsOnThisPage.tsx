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

"use client";

import { useEffect, useMemo, useState } from "react";

interface ScrollSpySidebarProps {
  ids: string[];
}

export default function DocsOnThisPage({ ids }: ScrollSpySidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(
    () =>
      ids.map((id) => ({
        id,
        text: id
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
      })),
    [ids],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -90% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  return (
    <aside className="sticky top-24 max-h-[80vh] overflow-auto p-4 border-l border-foreground/10">
      <ul className="space-y-2">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block px-3 py-1 rounded-md transition-colors ${
                activeId === id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/50 hover:text-primary"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
