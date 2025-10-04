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

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchDialog from "./search-dialog";
import { Kbd, KbdGroup } from "./kbd";

export default function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const isMacPlatform = navigator.platform.toUpperCase().includes("MAC");
    setIsMac(isMacPlatform);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-foreground/80 hover:text-gray-700 hover:cursor-pointer"
        aria-label="Search"
      >
        <Search size={16} />
        <span>Search docs...</span>

        <KbdGroup className="hidden lg:inline-flex">
          {isMac && <Kbd>⌘</Kbd>}
          {!isMac && <Kbd>Ctrl</Kbd>}
          <Kbd>K</Kbd>
        </KbdGroup>

        {/* <kbd className="hidden sm:inline-flex items-center px-2 py-1 border border-gray-300 rounded text-xs"> */}
        {/*   ⌘K */}
        {/* </kbd> */}
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center space-x-2 p-2 text-sm border border-gray-300 rounded-full hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700 hover:cursor-pointer"
        aria-label="Search"
      >
        <Search size={16} />
      </button>

      <SearchDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
