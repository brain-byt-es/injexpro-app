// lib/supabase/token.ts
import { SignJWT } from "jose";

const enc = new TextEncoder();

/**
 * Sign a short-lived Supabase RLS JWT for the given user.
 * Payload minimally needs `sub` and `role` for RLS.
 */
export async function signSupabaseJwt(userId: string, expiresInSec: number): Promise<string> {
  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) throw new Error("SUPABASE_JWT_SECRET is not set");

  const now = Math.floor(Date.now() / 1000);

  // Keep payload minimal to avoid leaking data into the token.
  const payload = {
    sub: userId,
    role: "authenticated",
    // optionally add org_id if/when you adopt org tenancy:
    // org_id: "<org-id-here>"
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + expiresInSec)
    .sign(enc.encode(secret));
}
