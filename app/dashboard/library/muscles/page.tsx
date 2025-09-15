// app/dashboard/atlas/muscles/page.tsx
import { getMusclesLite } from "@/lib/db/queries";
import { MuscleLibrary } from "@/components/dashboard/muscle-library";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function MusclePage() {
  const items = await getMusclesLite();
  return <MuscleLibrary initialItems={items} />;
}
