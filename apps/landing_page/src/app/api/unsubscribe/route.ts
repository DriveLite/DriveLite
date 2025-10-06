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

  return NextResponse.redirect("https://DriveLite.org/unsubscribed");
}
