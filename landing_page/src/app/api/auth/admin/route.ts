import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  const adminId = process.env.ADMIN_ID;

  if (!userId) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  const isAdmin = userId === adminId;
  return NextResponse.json({ isAdmin });
}
