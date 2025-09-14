import { SignJWT } from 'jose';

const alg = 'HS256';
const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!);

/** Mint a Supabase-signed JWT that PostgREST will trust. */
export async function signSupabaseJwt(sub: string, ttlSeconds = 600) {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT({ sub, role: 'authenticated' })
    .setProtectedHeader({ alg })
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .sign(secret);
}
