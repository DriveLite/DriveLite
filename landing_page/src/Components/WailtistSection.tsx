"use client";
import { useState } from "react";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Thanks! You're on the waitlist");
      setEmail("");
    } else {
      const { error } = await res.json();
      alert(error || "something went wrong");
    }
  }
  return (
    <section className="text-center mb-10">
      <h3 className="text-xl font-semibold mb-4">Be First to Try DriveLite</h3>
      <form
        className="flex flex-col sm:flex-row gap-2 justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Join Waitlist
        </button>
      </form>
    </section>
  );
};

export default WaitlistSection;
