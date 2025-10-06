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

// src/_components/docs/MobileSidebarToggle.tsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import type { DirectoryStructure } from "@/lib/docs.server";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { DocsSidebar } from "./DocsSideNavbar";

interface MobileSidebarToggleProps {
  structure: DirectoryStructure;
  locale: string;
}

export function MobileSidebarToggle({
  structure,
  locale,
}: MobileSidebarToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden h-9 w-9 p-0">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetTitle className="sr-only">Documentation Navigation</SheetTitle>
      <SheetContent side="left" className="p-0 w-80">
        <DocsSidebar structure={structure} locale={locale} />
      </SheetContent>
    </Sheet>
  );
}
