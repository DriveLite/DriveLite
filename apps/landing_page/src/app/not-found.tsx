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

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { MainLogo } from "@/_components/ui/main-logo";

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
    <section className="min-h-screen flex flex-col justify-center items-center section-container ">
      <div className="max-w-4xl w-full flex flex-col md:flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
          <h1 className="text-6xl font-extrabold ">404</h1>
          <p className="text-xl">
            Oops! Looks like you are lost on the web again!!!
          </p>
          <div className="mt-4">
            <Button asChild>
              <Link href="/" className="px-6 py-3">
                Go Home
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <MainLogo />
        </div>
      </div>
    </section>
  );
}
