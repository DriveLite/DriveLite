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

import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Github, MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links: { title: string; href: string; target?: string }[] = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Docs",
      href: "https://docs.drivelite.org",
      target: "_blank",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/75 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-[1337px] px-4 md:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center justify-center">
              <Image
                src={"/logo_icon.svg"}
                alt={"logo"}
                width={60}
                height={60}
              />
              <Link
                href="/"
                className="font-bold text-2xl text-foreground hover:text-primary transition-colors duration-200"
              >
                DriveLite
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:justify-between md:gap-6 md:font-semibold">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.target}
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex md:items-center md:justify-center md:gap-2">
              <Link
                href="https://github.com/Moukhtar-youssef/Drivelite"
                className="text-foreground hover:text-primary rounded-full"
                target="_blank"
              >
                <span className="sr-only">Github</span>
                <Github size={20} />
              </Link>
              <Button
                asChild
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/waitlist">Join WaitList!</Link>
              </Button>
              <ModeToggle />
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                asChild
                size="sm"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/waitlist">Join</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="menu-button h-10 w-10 bg-background/70 text-foreground hover:bg-background/90"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`mobile-menu fixed top-16 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ease-in-out md:hidden overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="flex flex-col p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.target}
                className="text-foreground hover:text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href="https://github.com/Moukhtar-youssef/Drivelite"
              target="_blank"
              className="text-foreground hover:text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Github
            </Link>

            <div className="mt-2 pt-3 border-t border-border flex flex-col gap-3">
              <div className="flex justify-center px-4">
                <ModeToggle />
              </div>
              <Button
                asChild
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <Link href="/waitlist" onClick={() => setIsMenuOpen(false)}>
                  Join Waitlist!
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
