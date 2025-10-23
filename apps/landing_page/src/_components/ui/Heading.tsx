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

import * as React from "react";
import slugify from "slugify";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as: HeadingTag;
  children: React.ReactNode;
}

export default function Heading({
  as,
  children,
  className = "",
  ...props
}: HeadingProps) {
  // ✅ Safely tell TS this will be an HTML heading element
  const Tag = as as React.ElementType;

  // Convert children to plain text for slug generation
  const text = React.Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : ""))
    .join(" ");

  const id = slugify(text, { lower: true, strict: true });

  return React.createElement(
    Tag,
    {
      id,
      className: `group relative scroll-mt-20 hover:brightness-110 ${className}`,
      ...props,
    },
    <>
      {children}
      <a
        href={`#${id}`}
        className="
        absolute opacity-0 group-hover:opacity-100 transition
        text-muted-foreground select-none pl-2
        "
      >
        #
      </a>
    </>,
  );
}
