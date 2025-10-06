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

// src/_components/docs/DocsSidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DirectoryStructure } from "@/lib/docs.server";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface DocsSidebarProps {
  structure: DirectoryStructure;
  locale: string;
}

export function DocsSidebar({ structure, locale }: DocsSidebarProps) {
  const pathname = usePathname();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const isActive = (slug: string) => {
    const currentPath = pathname.replace(`/docs/${locale}/`, "");
    return currentPath === slug || currentPath.startsWith(slug + "/");
  };

  const renderFile = (
    file: { slug: string; name: string; path: string },
    level = 0,
  ) => {
    const href = `/docs/${locale}/${file.slug}`;
    const active = isActive(file.slug);

    return (
      <Link
        key={file.slug}
        href={href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors sidebar-transition",
          active
            ? "bg-primary text-primary-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted",
        )}
        style={{ paddingLeft: `${12 + level * 20}px` }}
      >
        <FileText className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{file.name}</span>
      </Link>
    );
  };

  const renderFolder = (
    folder: {
      name: string;
      slug: string;
      path: string;
      files: any[];
      folders: any[];
    },
    level = 0,
  ) => {
    const isExpanded = expandedFolders.has(folder.path);
    const hasContent = folder.files.length > 0 || folder.folders.length > 0;

    return (
      <div key={folder.path} className="select-none">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer",
            "text-foreground hover:bg-muted",
          )}
          style={{ paddingLeft: `${12 + level * 20}px` }}
          onClick={() => hasContent && toggleFolder(folder.path)}
        >
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-4 w-4 p-0 hover:bg-transparent flex-shrink-0",
              !hasContent && "invisible",
            )}
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>

          {isExpanded ? (
            <FolderOpen className="h-4 w-4 flex-shrink-0 text-blue-500" />
          ) : (
            <Folder className="h-4 w-4 flex-shrink-0 text-blue-500" />
          )}

          <span className="truncate font-medium">{folder.name}</span>
        </div>

        {isExpanded && hasContent && (
          <div className="mt-1 space-y-1">
            {folder.folders.map((subFolder) =>
              renderFolder(subFolder, level + 1),
            )}
            {folder.files.map((file) => renderFile(file, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Documentation</h2>
        <p className="text-sm text-muted-foreground mt-1">DriveLite Docs</p>
      </div>

      <ScrollArea className="flex-1 sidebar-scroll">
        <div className="p-4">
          <div className="space-y-1">
            {structure.files.map((file) => renderFile(file))}

            {structure.folders.map((folder) => renderFolder(folder))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
