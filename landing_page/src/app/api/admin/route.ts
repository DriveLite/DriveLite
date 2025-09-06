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