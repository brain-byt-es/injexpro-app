import { supabaseAdmin } from '../lib/supabase/server';

export async function getMusclesForLibrary(filters: {
  region?: string | null;
  nerve?: string | null;
  hasUS?: boolean | null;
  indication?: string | null;
  limit?: number;
}) {
  const sb = supabaseAdmin();
  let q = sb.from('muscles').select(
    'id, slug, name, abbr, anatomical_region, function_short, innervation_nerve, innervation_root, has_ultrasound_window, indications, safety_flags'
  );

  if (filters.region)    q = q.eq('anatomical_region', filters.region);
  if (filters.nerve)     q = q.eq('innervation_nerve', filters.nerve);
  if (filters.hasUS!=null) q = q.eq('has_ultrasound_window', filters.hasUS);
  if (filters.indication)  q = q.contains('indications', [filters.indication]);

  const { data, error } = await q.order('name', { ascending: true }).limit(filters.limit ?? 50);
  if (error) throw error;
  return data;
}
