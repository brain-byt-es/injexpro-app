// data/complications.ts
import { supabaseAdmin } from '../lib/supabase/server';

export async function findComplicationsBySymptoms(symptoms: string[], limit = 10) {
  const sb = supabaseAdmin();
  // uses GIN on signs_symptoms[]
  const { data, error } = await sb
    .from('complications')
    .select('id, name, signs_symptoms, management_protocol')
    .contains('signs_symptoms', symptoms)
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getComplicationsForProcedure(procedureSlug: string) {
  const sb = supabaseAdmin();
  const { data: proc, error: e1 } = await sb.from('procedures').select('id').eq('slug', procedureSlug).single();
  if (e1) throw e1;

  const { data, error } = await sb
    .from('procedure_complications')
    .select('complications (id, name, signs_symptoms, management_protocol)')
    .eq('procedure_id', proc.id);
  if (error) throw error;

  // shape: [{ complications: {...} }, ...] → flatten
  return data.map((row: any) => row.complications);
}
