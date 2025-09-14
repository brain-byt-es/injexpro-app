import { supabaseAdmin } from '../lib/supabase/server';

export async function getProceduresForLibrary(filters: {
  region?: string | null;
  guidance?: 'US' | 'EMG' | 'Landmark' | null;
  evidence?: 'A' | 'B' | 'C' | null;
  limit?: number;
}) {
  const sb = supabaseAdmin();
  let q = sb.from('library_procedures').select('*');

  if (filters.region)   q = q.eq('region', filters.region);
  if (filters.guidance) q = q.eq('guidance', filters.guidance);
  if (filters.evidence) q = q.eq('evidence_level', filters.evidence);

  const { data, error } = await q.order('title', { ascending: true }).limit(filters.limit ?? 50);
  if (error) throw error;
  return data;
}
