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

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  PreviousDocLink: string | undefined;
  PreviosDocName: string | undefined;
  NextDocLink: string | undefined;
  NextDocName: string | undefined;
}

export default function DocsFooterButtons({
  PreviousDocLink,
  PreviosDocName,
  NextDocLink,
  NextDocName,
}: FooterProps) {
  return (
    <footer className="hidden md:grid grid-cols-2 gap-4 my-5 ">
      {PreviousDocLink && PreviosDocName && (
        <Link
          href={PreviousDocLink}
          className="text-left border border-foreground/10 rounded-md block h-full leading-5 p-4"
        >
          <div className="text-foreground/50 text-sm font-medium mb-1">
            Previous
          </div>
          <div className="text-base text-primary font-bold break-words flex justify-start items-center gap-1">
            <ChevronLeft />
            {PreviosDocName}
          </div>
        </Link>
      )}
      {NextDocLink && NextDocName && (
        <Link
          href={NextDocLink}
          className="col-start-2 col-end-3 text-right border border-foreground/10 rounded-md block h-full leading-5 p-4"
        >
          <div className="text-foreground/50 text-sm font-medium mb-1">
            Next
          </div>
          <div className="text-base font-bold text-primary break-words flex justify-end items-center gap-1">
            {NextDocName}
            <ChevronRight />
          </div>
        </Link>
      )}
    </footer>
  );
}
