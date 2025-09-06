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
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WailtistSection() {
  const { isSignedIn, user } = useUser();
  const [email, setEmail] = useState("");
  const emailRegex = /^(?!\.)([^\s@]+)@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (isSignedIn && user) {
      const primaryEmail = user.primaryEmailAddress?.emailAddress || "";
      setEmail(primaryEmail);
    }
  }, [isSignedIn, user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    const res = await fetch("/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setEmail("");
    } else {
      try {
        toast.error(data.error || "Something went wrong");
      } catch {
        toast.error("Something went wrong (invalid response)");
      }
    }
  }
  return (
    <section className="text-center mb-10">
      <h3 className="text-xl font-semibold mb-4">Be First to Try DriveLite</h3>
      <form
        className="flex flex-col sm:flex-row gap-2 justify-center"
        onSubmit={handleSubmit}
      >
        {!isSignedIn && (
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none"
          />
        )}
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Join Waitlist
        </button>
      </form>
    </section>
  );
}
