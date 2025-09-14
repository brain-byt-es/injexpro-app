"use client";

import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const CRITICAL_PREFIXES = ["risk-", "critical-", "danger-"];
const CRITICAL_EXACT = new Set([
  "risk-dysphagia",
  "near-orbital-vessels",
  "airway-risk",
]);

function isCritical(flag: string) {
  return (
    CRITICAL_EXACT.has(flag) ||
    CRITICAL_PREFIXES.some((p) => flag.startsWith(p))
  );
}

export function SafetyBanner({
  flags,
  className,
}: { flags: string[]; className?: string }) {
  const critical = (flags || []).filter(isCritical);
  if (!critical.length) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <TriangleAlert className="size-5 shrink-0" />
      <div className="text-sm">
        <span className="font-medium">Safety risk:</span>{" "}
        {critical.join(" • ").replaceAll("-", " ")}
      </div>
    </div>
  );
}
