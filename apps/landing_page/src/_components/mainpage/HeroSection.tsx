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

import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MainLogo } from "../ui/main-logo";

export function HeroSection() {
  return (
    <section className="my-10 md:my-20">
      <div className=" section-container">
        <div className="flex items-center justify-center flex-col text-center">
          <MainLogo />
          <h1 className="text-2xl md:text-4xl font-black  mt-5">
            Self-hosted <span className="text-primary">File management</span>{" "}
            Solution
          </h1>
          <p className="text-md md:text-xl my-5 text-foreground/35 px-0 md:px-36">
            Easily back up, organize, and manage your files on your own server.
            Drivelite helps you <br className="hidden lg:block" /> browse,
            search and organize your files with ease, without sacrificing your
            privacy.
          </p>
          <div className="flex gap-2 items-center justify-center ">
            <Button
              asChild
              className="p-7 rounded-xl font-bold text-sm md:text-md"
            >
              <Link href={"/waitlist"}>Join Waitlist!</Link>
            </Button>
            <Button
              variant="secondary"
              asChild
              className="p-7 rounded-xl font-bold text-sm md:text-md"
            >
              <Link
                href={"https://github.com/Moukhtar-youssef/drivelite"}
                target="_blank"
              >
                <Star />
                Star Repo!
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
