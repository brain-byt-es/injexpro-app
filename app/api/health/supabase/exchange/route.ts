// app/api/health/supabase/exchange/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { signSupabaseJwt } from "@/lib/supabase/token";

export const runtime = "nodejs";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return v;
}

export async function POST(_req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure secrets exist; helps avoid vague 500s
    requireEnv("SUPABASE_JWT_SECRET");

    const expiresIn = 600; // 10 minutes
    const token = await signSupabaseJwt(userId, expiresIn);
    return NextResponse.json({ token, expiresIn });
  } catch (err: any) {
    // Log rich details to server logs only
    console.error("api:exchange error", {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
    });

    // In dev, include a hint to speed up debugging
    const payload =
      process.env.NODE_ENV !== "production"
        ? { error: "Internal error", detail: String(err?.message || err) }
        : { error: "Internal error" };

    return NextResponse.json(payload, { status: 500 });
  }
}
