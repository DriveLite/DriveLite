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

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useLocale from "@/hooks/useLocale";

interface Props {
  children: React.ReactNode;
  locale: string;
}

export default function DocsLayoutClient({ children, locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [storedLocale] = useLocale();

  // Redirect if stored locale differs from URL locale
  useEffect(() => {
    if (locale && storedLocale && locale !== storedLocale) {
      const pathParts = pathname.split("/").filter(Boolean);
      const newPath = ["/docs", storedLocale, ...pathParts.slice(2)].join("/");
      router.replace(newPath);
    }
  }, [locale, storedLocale, pathname, router]);

  return <>{children}</>;
}
