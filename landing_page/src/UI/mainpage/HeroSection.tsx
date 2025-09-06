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

 

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-16 px-6 sm:px-16 py-12">
      <div className="sm:flex-1 flex justify-center sm:justify-end">
        <Image
          src="/logo_icon.svg"
          alt="DriveLite Logo"
          width={400}
          height={400}
          priority
          className="w-full max-w-xs md:max-w-md h-auto"
        />
      </div>
      <div className="sm:flex-1 text-center sm:text-left">
        <h1 className=" text-4xl font-bold">DriveLite</h1>
        <h2 className="text-xl font-bold mt-6">
          The Open-Source Supabase for File Storage
        </h2>
        <p className="mt-4 text-lg text-gray-600">Private. Secure. Yours.</p>

        <div className="mt-8">
          <Link
            href="https://github.com/moukhtar-youssef/drivelite"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
            target="_blank"
          >
            ⭐ Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
