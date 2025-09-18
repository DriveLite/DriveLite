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

// app/unsubscribed/page.tsx
import { Button } from "@/Components/ui/button";
import Link from "next/link";

export default function UnsubscribedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          You’re Unsubscribed
        </h1>
        <p className="text-gray-600 mb-6">
          You have successfully been removed from our waitlist. You will no
          longer receive emails from DriveLite.
        </p>
        <Link href="/">
          <Button variant="default" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
