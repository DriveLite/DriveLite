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

import { useEffect, useState } from "react";
import useLocale from "@/hooks/useLocale";
import { languageNames, locales } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DocsLanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [storedLocale, setLocale] = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (locale: string) => {
    setLocale(locale);
    window.location.reload();
  };

  const sortedLocales = [...locales].sort((a, b) => a.localeCompare(b));

  return (
    <Select
      value={storedLocale}
      onValueChange={handleChange}
      disabled={!mounted}
    >
      <SelectTrigger
        className="bg-secondary dark:bg-secondary hover:bg-secondary/70 fill-secondary-foreground dark:hover:bg-secondary/70 text-secondary-foreground btn cursor-pointer inline-flex items-center 
        justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none 
        disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 
        outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 
        dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      >
        <SelectValue
          placeholder={mounted ? languageNames[storedLocale] : "Loading..."}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {sortedLocales.map((locale) => (
            <SelectItem value={locale} key={locale} className="cursor-pointer">
              {languageNames[locale]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
