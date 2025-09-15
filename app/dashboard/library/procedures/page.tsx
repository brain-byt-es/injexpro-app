// app/dashboard/atlas/procedures/page.tsx
import { getProceduresLite } from "@/lib/db/queries";
import { ProcedureLibrary } from "@/components/dashboard/procedure-library";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ProceduresPage() {
  const items = await getProceduresLite();
  return <ProcedureLibrary initialItems={items} />;
}
