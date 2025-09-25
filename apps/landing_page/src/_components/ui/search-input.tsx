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

import { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { useDebounce } from "@/hooks/debounce";

export default function SearchInput({
  className = "",
}: React.ComponentProps<"input">) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState<boolean | null>(null);
  const [query, setQuery] = useState("");
  const { debouncedValue, cancel } = useDebounce(query, 500);

  // Detect keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        inputRef.current?.blur();
      }
    };
    const mac =
      typeof window !== "undefined" &&
      navigator.platform.toUpperCase().includes("MAC");
    setIsMac(mac);

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (debouncedValue.trim()) {
      console.log("Searching for:", debouncedValue);
      // fetch(`/api/search?q=${debouncedQuery}`)
    } else {
      console.log("Cleared search");
    }
  }, [debouncedValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      cancel();
      console.log("Searching for:", query);
    }
  };

  return (
    <div
      className={`relative xl:w-64 lg:w-56 md:w-40 w-full max-w-sm ${className}`}
    >
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="pr-16"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute gap-1 flex right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[10px] ">
        <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3">
          {isMac ? "⌘" : "Ctrl"}
        </kbd>
        <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3">
          K
        </kbd>
      </div>
    </div>
  );
}
