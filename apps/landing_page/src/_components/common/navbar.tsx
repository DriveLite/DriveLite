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

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const links: { title: string; href: string; target?: string }[] = [
    {
      title: "Blogs",
      href: "/blogs",
    },
    {
      title: "Docs",
      href: "/docs/en/overview/quick-start",
    },
    {
      title: `Github `,
      href: "https://github.com/DriveLite/DriveLite",
      target: "_blank",
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${mounted ? `border-b border-foreground/10 bg-background/75 backdrop-blur-md` : ""}`}
    >
      <div className={`mx-auto max-w-[1337px] px-4 md:px-6 lg:px-8`}>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-between gap-2">
            <Image src={"/logo_icon.svg"} alt={"logo"} width={30} height={30} />
            <Link
              href="/"
              className="font-bold text-2xl text-foreground hover:text-primary transition-colors duration-200"
            >
              DriveLite
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:justify-between md:gap-0 md:text-sm lg:text-md lg:gap-4 md:font-semibold">
            {links.map((link) => {
              const isActive =
                link.target !== "_blank" && pathname === link.href;

              return (
                <Button
                  asChild
                  variant="blank"
                  className={`font-bold text-foreground hover:bg-foreground/10 dark:hover:bg-foreground/10 dark:hover:text-foreground lg:p-5 p-2 transition-colors duration-200 ${
                    isActive
                      ? "text-primary hover:text-primary dark:hover:text-primary"
                      : ""
                  }`}
                  key={link.href}
                >
                  <Link key={link.href} href={link.href} target={link.target}>
                    {link.title}
                  </Link>
                </Button>
              );
            })}
          </nav>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-2">
            <Button
              asChild
              className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/waitlist">Join WaitList!</Link>
            </Button>
            <ModeToggle />
          </div>

          <div className="flex md:hidden items-center">
            <Button
              variant="blank"
              size="icon"
              className="menu-button h-10 w-10 bg-background/70 text-foreground hover:bg-background/90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sticky top-16 left-0 right-0 z-50 border-b border-border transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isMenuOpen ? "h-fit opacity-100 shadow-sm" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col p-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.target}
              className="text-foreground hover:text-primary-foreground py-3 px-4 rounded-md hover:bg-primary transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <div className="mt-2 pt-3 border-t border-border flex flex-col items-center justify-center">
            <div className="flex justify-center px-4">
              <ModeToggle />
            </div>
            <Button asChild className="w-full mt-4">
              <Link href="/waitlist">Join Waitlist !</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
