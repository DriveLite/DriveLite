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

 

// components/Header.tsx
"use client";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useAdmin } from "@/hooks/useAdmin";

export default function Header() {
  const { isSignedIn, isAdmin, loading } = useAdmin();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-[#0057D9]">
          DriveLite
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/blog" className="text-sm text-gray-700">
            Blogs
          </Link>

          {isSignedIn && isAdmin && !loading && (
            <Link href="/dashboard" className="text-sm text-gray-700">
              Dashboard
            </Link>
          )}
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
