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

export default function NotFound() {
  return (
    <>
      <main className="flex-grow flex items-center justify-center px-4 py-16 mt-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-8xl font-bold text-[#0057D9] mb-2">404</h1>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Oops! The page you&apos;re looking for seems to have drifted
                into the cloud. Don&apos;t worry, our team is working to bring
                it back.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 border border-[#0057D9] text-[#0057D9] rounded-lg font-semibold text-center"
                >
                  <i className="fas fa-home mr-2"></i> Back to Home
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              {/* <div className="w-64 h-64 gradient-bg rounded-2xl shadow-xl floating flex items-center justify-center"></div> */}
              <Image
                src="/logo_icon.svg"
                alt="DriveLite Logo"
                width={400}
                height={400}
                priority
                className="w-64 max-w-xs md:max-w-md h-64 animate-float"
              />
              \
              <div className="absolute top-10 -left-10 animate-pulse">
                <div className="w-16 h-16 glow bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <span className="text-3xl">❓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
