// app/actions/notes.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase/server";

type Kind = "muscle" | "procedure" | "complication";

export async function upsertNote(kind: Kind, slug: string, note: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");
  const sb = supabaseAdmin();

  // upsert on (user_id, kind, slug)
  const { error } = await sb
    .from("private_notes")
    .upsert({ user_id: userId, kind, slug, note }, { onConflict: "user_id,kind,slug" });
  if (error) throw error;
  return { ok: true };
}
