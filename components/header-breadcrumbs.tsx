"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  atlas: "Anatomy Atlas",
  muscles: "Muscles",
  procedures: "Procedures",
  complications: "Complications",
  education: "Resources",
};

export function HeaderBreadcrumbs({
  className,
  labelOverrides,
}: {
  className?: string;
  /** Optional: map a segment (e.g. a slug) to a pretty label */
  labelOverrides?: Record<string, string>;
}) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const labels = { ...LABELS, ...(labelOverrides ?? {}) };

  const items = segments.map((seg, idx) => {
    const key = seg.replace(/[\[\]()]/g, "");
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const isLast = idx === segments.length - 1;
    const pretty =
      labels[key] ??
      key
        .replace(/-/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());

    return { href, label: pretty, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className={cn("truncate", className)}>
      <ol className="flex items-center gap-1 text-muted-foreground">
        {items.map((it, i) => (
          <li key={it.href} className="inline-flex items-center min-w-0">
            {/* separators: first = pipe, then chevrons */}
            {i > 0 && (
              <span aria-hidden className="mx-2 select-none">
                {i === 1 ? "|" : ">"}
              </span>
            )}

            {it.isLast ? (
              <span className="truncate font-medium text-foreground">{it.label}</span>
            ) : (
              <Link
                href={it.href}
                className="truncate hover:text-foreground transition-colors"
              >
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
