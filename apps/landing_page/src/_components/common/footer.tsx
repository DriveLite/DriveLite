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

import { FaGithub, FaHeart } from "react-icons/fa";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    product: [
      { name: "Features", href: "/#features", target: "" },
      { name: "Pricing", href: "/#pricing", target: "" },
      { name: "API", href: "/#api", target: "" },
      {
        name: "Documentation",
        href: "https://docs.drivelite.org",
        target: "_blank",
      },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blogs", href: "/blogs" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com/DriveLite/DriveLite",
        icon: FaGithub,
      },
    ],
    OpneSource: [
      {
        name: "Mobile",
        href: "https://github.com/DriveLite/DriveLite/tree/main/apps/mobile",
      },
      {
        name: "Server",
        href: "https://github.com/DriveLite/DriveLite/tree/main/apps/server",
      },
      {
        name: "Cli",
        href: "https://github.com/DriveLite/DriveLite/tree/main/apps/cli",
      },
      {
        name: "Web",
        href: "https://github.com/DriveLite/DriveLite/tree/main/apps/web",
      },
      {
        name: "Desktop",
        href: "https://github.com/DriveLite/DriveLite/tree/main/apps/desktop",
      },
    ],
  };

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="mx-auto max-w-[1337px] px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className=" grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-foreground">
              DriveLite
            </Link>
            <p className="mt-4 max-w-md text-muted-foreground">
              The modern, lightweight cloud storage solution. Fast, secure, and
              designed for the future.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <ul className="mt-4 space-y-2">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.target}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {/* Open Source Links */}
            <h3 className="text-sm font-semibold text-foreground">
              Open-source
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.OpneSource.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © {currentYear} DriveLite. Made with{" "}
            <FaHeart size={14} className="text-red-500 fill-red-500" /> by the
            DriveLite team.
          </p>
        </div>
      </div>
    </footer>
  );
}
