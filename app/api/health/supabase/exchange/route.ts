import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { signSupabaseJwt } from "@/lib/supabase/token";
import { logSupabaseError } from "@/lib/logging";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const token = await signSupabaseJwt(userId, 600);
    return NextResponse.json({ token, expiresIn: 600 });
  } catch (err) {
    logSupabaseError("api:exchange", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}