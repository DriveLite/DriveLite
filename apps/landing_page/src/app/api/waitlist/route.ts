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
