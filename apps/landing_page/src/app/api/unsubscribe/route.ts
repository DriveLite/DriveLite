import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  // Look up in DB
  const { data, error: lookupError } = await supabaseAdmin
    .from("waitlist_emails")
    .select("*")
    .eq("token", token)
    .single();

  if (lookupError || !data) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
  // Mark unsubscribed (or delete)
  await supabaseAdmin.from("waitlist_emails").delete().eq("id", data.id);
  console.log(data.id);

  return NextResponse.redirect("http://localhost:3000/unsubscribed");
}
