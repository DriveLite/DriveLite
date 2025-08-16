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

    if (res.ok) {
      toast.success("Thanks! You 're on the waitlist");
      setEmail("");
    } else {
      const { error } = await res.json();
      toast.error(error || "something went wrong");
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
