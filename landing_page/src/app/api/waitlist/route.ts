// Copyright 2025.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { rateLimit } from "@/lib/ratelimit";
import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";
import WelcomeEmail from "@/Components/WelcomeEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = await rateLimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { email } = await req.json();
  const normalizedEmail = email.toLowerCase();

  const { error } = await supabase
    .from("waitlist_emails")
    .insert([{ email: normalizedEmail }]);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        {
          success: true,
          message: "You are already on the waitlist.",
        },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { error: "Failed to join waitlist.Please try again." },
      { status: 500 },
    );
  }

  resend.emails.send({
    from: "welcome@drivelite.org",
    to: email,
    subject: "Welcome to DriveLite!",
    react: WelcomeEmail({ email }),
  });

  return NextResponse.json(
    { success: true, message: "You've been added to the waitlist!" },
    { status: 200 },
  );
}
