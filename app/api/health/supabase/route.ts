import { NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase/client';

export async function GET() {
  const sb = await supabaseClient(); // ✅ await the async factory

  const { data, error } = await sb
    .from('library_procedures')
    .select('id')
    .limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, rows: data?.length ?? 0 });
}
