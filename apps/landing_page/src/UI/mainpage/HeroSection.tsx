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

import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 sm:gap-16 px-6 sm:p-16 p-12">
      <div className="text-center sm:text-left">
        <h1 className=" text-4xl font-bold">DriveLite</h1>
        <h2 className="text-xl font-bold mt-6">
          The Open-Source File Storage Platform
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          As easy as Dropbox, as flexible as an API
        </p>

        <div className="mt-8">
          <Button className="hover:cursor-pointer shadow-md rounded-xl px-6 py-3 bg-blue-600 hover:bg-blue-500 transition text-white ">
            <Link
              href={"https://github.com/moukhtar-youssef/drivelite"}
              target="_blank"
            >
              ⭐ Star on GitHub
            </Link>
          </Button>
          <Button className="hover:cursor-pointer shadow-md rounded-xl ml-2 px-6 py-3 transition text-white">
            <Link href={"#waitlist"}>Join the waitlist</Link>
          </Button>
          <Button className="hover:cursor-pointer shadow-md rounded-xl ml-2 px-6 py-3 transition text-white">
            <Link href={"https://docs.drivelite.org/"} target="_blank">
              📖 View Docs
            </Link>
          </Button>
        </div>
      </div>
      <Image
        src="/logo_icon.svg"
        alt="DriveLite Logo"
        width={400}
        height={400}
        priority
        className="w-full max-w-xs md:max-w-md h-auto animate-float"
      />
    </section>
  );
}
