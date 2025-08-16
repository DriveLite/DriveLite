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

  const { data: exists, error: existserror } = await supabase
    .from("waitlist_emails")
    .select()
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (existserror) {
    console.error("Error checking existing email:", existserror);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  if (exists) {
    return NextResponse.json(
      { error: "You're already on the waitlist!" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("waitlist_emails")
    .insert([{ email: normalizedEmail }]);

  if (error) {
    console.error("Error saving to waitlist:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }

  await resend.emails.send({
    from: "welcome@drivelite.org",
    to: email,
    subject: "Welcome to DriveLite!",
    react: WelcomeEmail({ email }),
  });

  return NextResponse.json({ success: true });
}
