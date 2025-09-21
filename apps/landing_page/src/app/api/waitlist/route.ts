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
import { z } from "zod";

const WaitlistSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const rateLimitResult = await rateLimit.limit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    // Validate email
    const validationResult = WaitlistSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error:
            validationResult.error.issues[0]?.message ||
            "Invalid email address",
        },
        { status: 400 },
      );
    }

    const { email } = validationResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const { data: existingEntry, error: queryError } = await supabaseAdmin
      .from("waitlist_emails")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (queryError) {
      console.error("Database query error:", queryError);
      return NextResponse.json(
        { error: "Failed to check waitlist status" },
        { status: 500 },
      );
    }

    if (existingEntry) {
      return NextResponse.json(
        {
          success: true,
          message: "You are already on the waitlist.",
        },
        { status: 200 },
      );
    }

    // Create unsubscribe token and insert into database
    const token = createUnsubscribeToken(normalizedEmail);
    const { error: insertError } = await supabaseAdmin
      .from("waitlist_emails")
      .insert([
        {
          email: normalizedEmail,
          token: token,
          created_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      console.error("Database insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to join waitlist. Please try again." },
        { status: 500 },
      );
    }

    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://drivelite.org"}/api/unsubscribe?token=${token}`;

    resend.emails
      .send({
        from: "DriveLite <welcome@drivelite.org>",
        to: email,
        subject: "Welcome to DriveLite Waitlist!",
        html: generateWelcomeEmail(unsubscribeUrl),
      })
      .catch((emailError) => {
        console.error("Failed to send welcome email:", emailError);
      });

    return NextResponse.json(
      {
        success: true,
        message: "You've been added to the waitlist!",
        email: normalizedEmail,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unexpected error in waitlist endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Separate email template function for better readability
function generateWelcomeEmail(unsubscribeUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DriveLite</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 32px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2563eb; margin: 0 0 16px 0; font-size: 28px;">Welcome to DriveLite! 🎉</h1>
        </div>
        
        <p style="color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for joining the <strong>DriveLite waitlist</strong>! We're excited to have you on board.
        </p>
        
        <p style="color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
            We'll keep you updated on our progress and notify you as soon as beta access becomes available.
        </p>
        
        <p style="color: #374151; line-height: 1.6; margin: 0 0 24px 0;">
            In the meantime, feel free to explore our website to learn more about what we're building:
        </p>
        
        <div style="text-align: center; margin: 32px 0;">
            <a href="https://drivelite.org" 
               style="display: inline-block; padding: 16px 32px; background: #2563eb; color: #fff; 
                      text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Visit DriveLite
            </a>
        </div>
        
        <hr style="margin: 32px 0; border: 0; border-top: 1px solid #e5e7eb;" />
        
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin: 0;">
            If you no longer wish to receive these emails, 
            <a href="${unsubscribeUrl}" style="color: #ef4444; text-decoration: none;">unsubscribe here</a>.
        </p>
        
        <p style="font-size: 11px; color: #9ca3af; text-align: center; margin: 16px 0 0 0;">
            © ${new Date().getFullYear()} DriveLite. All rights reserved.
        </p>
    </div>
</body>
</html>
  `.trim();
}
