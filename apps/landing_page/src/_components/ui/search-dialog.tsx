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

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { SearchDocs } from "@/lib/search";

interface searchResult {
  url: string;
  title: string;
  excerpt?: string;
  content?: string;
}
interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<searchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      const searchResults = await SearchDocs(query);
      setResults(searchResults);
      setIsSearching(false);
      console.log(results);
    };

    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-background text-foreground rounded-lg border shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
          <div className="flex items-center px-4 py-4 border-b">
            <Search className="text-gray-400 mr-3" size={20} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-lg text-foreground"
            />
            <button
              onClick={onClose}
              className="ml-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded hover:cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isSearching ? (
              <div className="p-8 text-center text-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <a
                  key={index}
                  href={result.url}
                  className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
                  onClick={onClose}
                >
                  <div className="font-medium text-foreground/90">
                    {result.title}
                  </div>
                  <div
                    className="text-sm text-foreground/50 mt-1"
                    dangerouslySetInnerHTML={{ __html: result.excerpt || "" }}
                  />
                </a>
              ))
            ) : query.length >= 2 ? (
              <div className="p-8 text-center text-foreground">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-8 text-center text-foreground">
                Type to search documentation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
