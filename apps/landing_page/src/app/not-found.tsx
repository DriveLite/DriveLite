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

import { Button } from "@/_components/ui/button";
import { MainLogo } from "@/_components/ui/main-logo";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "You are lost on the web buddy",
  openGraph: {
    title: "Not Found | DriveLite",
    description: "You are lost on the web buddy",
  },
};

export default function NotFound() {
  return (
    <section className="min-h-screen section-container">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 ">
        <div className="flex flex-col justify-center items-center md:items-start text-center ">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">
            Oops! Looks like you are lost on the web again!!!
          </p>
          <Button asChild>
            <Link href="/" className="">
              Go Home
            </Link>
          </Button>
        </div>
        <MainLogo />
      </div>
    </section>
  );
}
