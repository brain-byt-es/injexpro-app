// app/actions/saves.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase/server";

type Kind = "muscle" | "procedure" | "complication";

export async function saveItem(kind: Kind, slug: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");
  const sb = supabaseAdmin();

  // ignore unique violations so it's idempotent
  const { error } = await sb.from("saved_items").insert({ user_id: userId, kind, slug });
  if (error && (error as any).code !== "23505") throw error;
  return { ok: true };
}

export async function unsaveItem(kind: Kind, slug: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");
  const sb = supabaseAdmin();

  const { error } = await sb.from("saved_items").delete().match({ user_id: userId, kind, slug });
  if (error) throw error;
  return { ok: true };
}
