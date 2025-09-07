export const runtime = "edge";

export async function GET() {
  return new Response(JSON.stringify({
    ok: true,
    env: {
      hasClerkSecret: !!process.env.CLERK_SECRET_KEY,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  }), { headers: { "content-type": "application/json" } });
}
