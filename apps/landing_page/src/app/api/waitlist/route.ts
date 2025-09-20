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
import { supabaseAdmin } from "@/lib/supabase";
import { createUnsubscribeToken } from "@/lib/unsubscribe";
import { NextResponse } from "next/server";
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

  const token = createUnsubscribeToken(normalizedEmail);

  const { data } = await supabaseAdmin
    .from("waitlist_emails")
    .select("*")
    .eq("email", normalizedEmail)
    .single();
  if (data) {
    return NextResponse.json(
      {
        success: true,
        message: "You are already on the waitlist.",
      },
      {
        status: 200,
      },
    );
  }

  const { error } = await supabaseAdmin
    .from("waitlist_emails")
    .insert([{ email: normalizedEmail, token: token }]);

  if (error) {
    return NextResponse.json(
      { error: "Failed to join waitlist.Please try again." },
      { status: 500 },
    );
  }
  const unsubscribeUrl = `https://drivelite.org/api/unsubscribe?token=${token}`;
  const html = `
  <!DOCTYPE html>
<html>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f9fafb;
      padding: 20px;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: auto;
        background: #fff;
        padding: 24px;
        border-radius: 8px;
      "
    >
      <h1 style="color: #2563eb">Thank You!</h1>
      <p>
        You've successfully joined the <b>DriveLite waitlist</b>. We'll keep you
        updated and notify you once beta access opens.
      </p>
      <p>Meanwhile, check out our website:</p>
      <a
        href="https://drivelite.org"
        style="
          display: inline-block;
          margin-top: 12px;
          padding: 12px 20px;
          background: #2563eb;
          color: #fff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        "
      >
        Visit DriveLite
      </a>
      <hr style="margin: 24px 0; border: 0; border-top: 1px solid #eee" />
      <p style="font-size: 12px; color: #6b7280; text-align: center">
        If you no longer want these emails,
        <a href="${unsubscribeUrl}" style="color: #ef4444">unsubscribe here</a>.
      </p>
    </div>
  </body>
</html>
`;

  resend.emails.send({
    from: "welcome@drivelite.org",
    to: email,
    subject: "Welcome to DriveLite!",
    html: html,
  });

  return NextResponse.json(
    { success: true, message: "You've been added to the waitlist!" },
    { status: 200 },
  );
}
