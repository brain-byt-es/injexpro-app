import { supabaseClient } from "@/lib/supabase/client";
import { MuscleLibrary, type Muscle } from "@/components/dashboard/muscle-library";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function MusclesPage() {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("muscles")
    .select(
      "id, slug, name, abbr, anatomical_region, function_short, innervation_nerve, innervation_root, indications, has_ultrasound_window, safety_flags"
    )
    .order("name", { ascending: true })
    .limit(200);

  if (error) throw error;

  const items = (data ?? []) as Muscle[]; // ← explicit cast
  return <MuscleLibrary initialItems={items} />;
}