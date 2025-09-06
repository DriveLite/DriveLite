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

 

import { supabaseAdmin } from "@/lib/supabase";
import {  getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {userId} = getAuth(req)
    if (userId !== process.env.ADMIN_ID) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const body = await req.json();
    const { title, content } = body;
    const { data, error } = await supabaseAdmin
    .from("posts")
    .insert([{ title, content }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
    const {userId} = getAuth(req) 
    if (userId !== process.env.ADMIN_ID) {
        return NextResponse.json({error:"Unauthorized"},{status:403})
    }
    const body = await req.json();
    const { id, title, content } = body;
    const { data, error } = await supabaseAdmin
    .from("posts")
    .update({ title, content })
    .eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  if (userId !== process.env.CLERK_ADMIN_ID) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const { id } = body;

  const { data, error } = await supabaseAdmin
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}