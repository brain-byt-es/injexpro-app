import { supabaseAdmin } from '../lib/supabase/server';

export async function createChecklistRecord(userId: string, procedureName: string) {
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('checklist_records')
    .insert({ user_id: userId, procedure_name: procedureName })
    .select()
    .single();
  if (error) throw error;
  return data;
}
