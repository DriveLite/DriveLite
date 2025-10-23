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

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "You've been added to the waitlist!");
        setEmail("");
      } else if (data.message?.includes("already")) {
        toast.info(data.message);
      } else {
        toast.error(data.error || "Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="section-container flex items-center justify-center flex-col min-h-screen">
        <h1 className="text-xl md:text-3xl font-black my-5 text-center">
          Join the DriveLite Waitlist
        </h1>
        <p className="text-md md:text-xl my-5 text-foreground/50 text-center">
          Get early access to the open-source, self-hosted file storage platform
          built for developers and teams who value freedom and control.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-md border border-foreground/10 
                       focus:ring-2 focus:ring-primary focus:outline-none 
                     bg-background-highlight dark:bg-background-highlight placeholder-gray-500"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading}
            variant="default"
            className="flex items-center justify-center rounded-md"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>

        <p className="text-sm md:text-md my-5 text-foreground/50 text-center">
          We’ll notify you once DriveLite Beta is ready. No spam. Unsubscribe
          anytime.
        </p>
      </div>
    </section>
  );
}
