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
import { useState } from "react";
import { toast } from "sonner";

export default function WailtistSection() {
  const [email, setEmail] = useState("");
  const emailRegex = /^(?!\.)([^\s@]+)@[^\s@]+\.[^\s@]+$/;

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
    } else {
      try {
        toast.error(data.error || "Something went wrong");
      } catch {
        toast.error("Something went wrong (invalid response)");
      }
    }
  }
  return (
    <section
      className="text-center mb-10 px-12 sm:px-2 py-12 bg-gray-100 dark:bg-gray-800 my-20"
      id="waitlist"
    >
      <h3 className="text-3xl md:text-4xl font-bold mb-6">
        Be First to Try DriveLite
      </h3>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
        Join our waitlist to get early access and updates on our progress.
      </p>
      <form
        className="flex flex-col gap-4 justify-center"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 sm:mt-0 m-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer whitespace-nowrap">
            Join Waitlist
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </section>
  );
}
