"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const EVIDENCE: Record<string, string> = {
  A: "Strong evidence (e.g., multiple RCTs)",
  B: "Moderate evidence",
  C: "Limited/consensus",
};

const GUIDANCE: Record<string, string> = {
  US: "Ultrasound guidance",
  EMG: "Electromyography guidance",
  Landmark: "Anatomical landmarks",
};

export function GlossaryBadge({
  kind,
  code,
  children,
}: {
  kind: "evidence" | "guidance";
  code: string | null | undefined;
  children: React.ReactNode;
}) {
  if (!code) return <>{children}</>;
  const map = kind === "evidence" ? EVIDENCE : GUIDANCE;
  const tip = map[code] ?? null;

  if (!tip) return <>{children}</>;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="max-w-[260px] text-xs">{tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
