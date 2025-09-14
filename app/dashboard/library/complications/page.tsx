import { supabaseClient } from "@/lib/supabase/client";
import { ComplicationsList } from "@/components/dashboard/complications-library";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ComplicationsPage() {
  const sb = await supabaseClient();

  const { data, error } = await sb
    .from("complications")
    .select("id, name, signs_symptoms")
    .order("name", { ascending: true })
    .limit(200);

  if (error) {
    // 👇 This prints *server-side* to your terminal / CF Worker logs
    console.error("Supabase[complications:list]", {
      message: error.message,
      hint: (error as any).hint,
      details: (error as any).details,
      code:   (error as any).code,
    });
    throw new Error(`${error.message}${(error as any).hint ? " — " + (error as any).hint : ""}`);
  }

  return <ComplicationsList initialItems={data ?? []} />;
}
