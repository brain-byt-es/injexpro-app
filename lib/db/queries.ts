// lib/db/queries.ts
import { supabaseClient } from "@/lib/supabase/client";

/**
 * MUSCLES (library list)
 * Shape matches what your MuscleLibrary component expects.
 */
export async function getMusclesLite() {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("muscles")
    .select(`
      id, slug, name, abbr,
      anatomical_region,
      function_short,
      innervation_nerve,
      innervation_root,
      indications,
      has_ultrasound_window,
      safety_flags
    `)
    .order("name", { ascending: true })
    .limit(200);

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * PROCEDURES (library list)
 * Source = view: library_procedures
 */
export async function getProceduresLite() {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("library_procedures")
    .select(`
      id, slug, title,
      region,
      condition_type,
      guidance,
      evidence_level,
      sites_min, sites_max,
      total_dose_min, total_dose_max,
      key_muscles,
      total_muscle_count
    `)
    .order("title", { ascending: true })
    .limit(200);

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * COMPLICATIONS (simple list used on /dashboard/complications)
 * Adjust columns as you like.
 */
export async function getComplicationsLite() {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("complications")
    .select(`id, name, signs_symptoms`)
    .order("name", { ascending: true })
    .limit(200);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export type Kind = "muscle" | "procedure" | "complication";



/* ---------- MUSCLE ---------- */

export type MuscleDetail = {
  id: string;
  slug: string;
  name: string;
  abbr: string | null;
  anatomical_region: string | null;
  function_short: string | null;
  innervation_nerve: string | null;
  innervation_root: string | null;
  indications: string[] | null;
  has_ultrasound_window: boolean;
  safety_flags: string[] | null;
  updated_at: string | null;
};

export async function getMuscleBySlug(slug: string): Promise<MuscleDetail | null> {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("muscles")
    .select(
      "id, slug, name, abbr, anatomical_region, function_short, innervation_nerve, innervation_root, indications, has_ultrasound_window, safety_flags, updated_at"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/* ---------- PROCEDURE (view) ---------- */

export type ProcedureDetail = {
  id: string;
  slug: string;
  title: string;
  region: string | null;
  condition_type: string | null;
  guidance: "US" | "EMG" | "Landmark" | string | null;
  evidence_level: "A" | "B" | "C" | string | null;
  sites_min: number | null;
  sites_max: number | null;
  total_dose_min: number | null;
  total_dose_max: number | null;
  key_muscles: { name: string; slug: string }[] | null;
  total_muscle_count: number | null;
  updated_at: string | null;
};

export async function getProcedureBySlug(slug: string): Promise<ProcedureDetail | null> {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("library_procedures")
    .select(
      "id, slug, title, region, condition_type, guidance, evidence_level, sites_min, sites_max, total_dose_min, total_dose_max, key_muscles, total_muscle_count, updated_at"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/* ---------- SAVED + NOTE (RLS-scoped to current Clerk user) ---------- */

export async function getSaved(kind: Kind, slug: string): Promise<boolean> {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("saved_items")
    .select("slug")
    .eq("kind", kind)
    .eq("slug", slug)
    .maybeSingle();
  if (error && (error as any).code !== "PGRST116") throw error; // 0 rows is fine
  return !!data;
}

export async function getNote(kind: Kind, slug: string): Promise<string> {
  const sb = await supabaseClient();
  const { data, error } = await sb
    .from("private_notes")
    .select("note")
    .eq("kind", kind)
    .eq("slug", slug)
    .maybeSingle();
  if (error && (error as any).code !== "PGRST116") throw error;
  return data?.note ?? "";
}
