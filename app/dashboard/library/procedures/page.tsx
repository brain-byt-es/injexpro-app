import { supabaseClient } from "@/lib/supabase/client";
import { ProcedureLibrary, type Proc } from "@/components/dashboard/procedure-library";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ProceduresPage() {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("library_procedures")
    .select(
      "id, slug, title, region, condition_type, guidance, evidence_level, sites_min, sites_max, total_dose_min, total_dose_max, key_muscles, total_muscle_count"
    )
    .order("title", { ascending: true })
    .limit(200);

  if (error) throw error;

  const items = (data ?? []) as Proc[]; // ← explicit cast
  return <ProcedureLibrary initialItems={items} />;
}
