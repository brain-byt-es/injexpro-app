// app/api/log/error/route.ts
import { NextResponse } from "next/server";
import { logSupabaseError } from "@/lib/logging";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));
  logSupabaseError("client:report", payload?.error, { clientMeta: payload?.meta });
  return NextResponse.json({ ok: true });
}