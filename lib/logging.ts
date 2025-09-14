// lib/logging.ts
export function logSupabaseError(
  context: string,
  err: unknown,
  extra?: Record<string, unknown>
) {
  const base: Record<string, unknown> = { context, ...extra };

  if (err && typeof err === "object") {
    const e = err as any;
    console.error("[Supabase]", {
      ...base,
      message: e.message,
      hint: e.hint,
      details: e.details,
      code: e.code,
    });
  } else {
    console.error("[Supabase]", { ...base, error: String(err) });
  }
}
