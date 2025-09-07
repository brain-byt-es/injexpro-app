// app/api/health/supabase/route.ts
import { adminSupabase } from "@/lib/supabase/admin";

export async function GET() {
  const { data, error } = await adminSupabase.from("muscles").select("id").limit(1);
  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ ok: true, sample: data ?? [] }), {
    headers: { "content-type": "application/json" },
  });
}
