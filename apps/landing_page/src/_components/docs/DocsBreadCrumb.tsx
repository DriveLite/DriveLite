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

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { locales } from "@/lib/i18n";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function DocsBreadCrumbs() {
  const pathname = usePathname();

  if (!pathname.includes("/docs")) return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { href: string; label: string; icon?: React.ReactNode }[] =
    [];

  // Home always comes first
  breadcrumbs.push({
    href: "/docs/en/overview/quick-start",
    label: "Home",
    icon: <FaHome size={16} />,
  });

  // Build dynamic crumbs
  let _currentPath = "";
  segments.forEach((segment) => {
    if (segment === "docs" || locales.includes(segment)) {
      _currentPath += `/${segment}`;
      return;
    }

    _currentPath += `/${segment}`;
    breadcrumbs.push({
      href: "",
      label: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    });
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <BreadcrumbItem
              key={crumb.label}
              className="flex items-center justify-between"
            >
              {crumb.href && !isLast && (
                <BreadcrumbLink
                  href={crumb.href}
                  className="flex items-center font-semibold text-foreground hover:text-primary"
                >
                  {crumb.icon && <span>{crumb.icon}</span>}
                  {!crumb.icon && <span>{crumb.label}</span>}
                </BreadcrumbLink>
              )}

              {(!crumb.href || isLast) && (
                <span
                  className={`flex items-center font-semibold ${
                    isLast ? "text-primary" : "text-foreground"
                  }`}
                >
                  {crumb.icon && <span>{crumb.icon}</span>}
                  {!crumb.icon && <span>{crumb.label}</span>}
                </span>
              )}

              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
