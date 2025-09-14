import { WelcomeHero } from "@/components/dashboard/welcome-card";
import { QuickTiles } from "@/components/dashboard/quick-tiles";
import { TrustBadges } from "@/components/dashboard/trustbadges";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  return (
    <>
      <WelcomeHero />
      <QuickTiles />
      <TrustBadges />
    </>
  );
}
