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

import {
  ArrowDown,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUp,
  SquarePen,
} from "lucide-react";
import { ButtonGroup } from "../ui/button-group";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { FaMarkdown } from "react-icons/fa";
import CopyButton from "../ui/Copy-button";

interface HeaderProps {
  PreviousDocLink: string | undefined;
  NextDocLink: string | undefined;
  ApiDocLink: string;
  GithubDocLink: string;
  DocContent: string;
}

export default function DocsHeaderButtons({
  PreviousDocLink,
  NextDocLink,
  ApiDocLink,
  GithubDocLink,
  DocContent,
}: HeaderProps) {
  return (
    <div className="flex gap-2 border-border/50 bg-background/80 backdrop-blur-sm  fixed bottom-0 inset-x-0 isolate z-50 items-center justify-between border-t px-6 py-4 md:static md:z-0 md:border-t-0 md:bg-transparent md:px-0 md:pt-1.5 md:backdrop-blur-none">
      <ButtonGroup>
        <CopyButton text={DocContent}>Copy Page</CopyButton>
        <Separator orientation="vertical" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <ArrowDown className="hidden md:flex" />
              <ArrowUp className="flex md:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={ApiDocLink} target="_blank">
                  <FaMarkdown />
                  View as Markdown
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={GithubDocLink} target="_blank">
                  <SquarePen />
                  Edit this page
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ButtonGroup>
        {PreviousDocLink && (
          <Button variant="secondary" size="icon" asChild>
            <Link href={PreviousDocLink}>
              <ArrowLeftIcon />
            </Link>
          </Button>
        )}
        {PreviousDocLink && NextDocLink && <Separator orientation="vertical" />}
        {NextDocLink && (
          <Button variant="secondary" size="icon" asChild>
            <Link href={NextDocLink}>
              <ArrowRightIcon />
            </Link>
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}
