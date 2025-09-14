import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ClipboardList, AlertTriangle, BookOpen } from "lucide-react";

type Tile = {
  href: string;
  label: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const tiles: Tile[] = [
  { href: "/dashboard/atlas/muscles",      label: "Anatomy Atlas",  description: "Explore structures",      Icon: Brain },
  { href: "/dashboard/atlas/procedures",   label: "Procedures",     description: "Plan & document",         Icon: ClipboardList },
  { href: "/dashboard/atlas/complications",label: "Complications",  description: "Identify & manage",       Icon: AlertTriangle },
  { href: "/dashboard/education",          label: "Resources",      description: "Guides & references",     Icon: BookOpen },
];

export function QuickTiles() {
  return (
    <section aria-label="Quick access" className="mt-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tiles.map(({ href, label, description, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group block focus:outline-none"
            aria-label={label}
          >
            <Card
              className="
                relative overflow-hidden rounded-2xl border
                transition-transform duration-200
                hover:-translate-y-0.5 hover:shadow-md
              "
            >
              {/* gradient border on hover */}
              <span
                className="
                  pointer-events-none absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity
                  bg-[conic-gradient(from_180deg_at_50%_50%,hsl(var(--primary)/0.4),transparent_25%,hsl(var(--accent)/0.35),transparent_75%,hsl(var(--primary)/0.4))]
                "
                aria-hidden
              />
              <CardContent className="relative z-10 p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="
                      grid size-11 place-items-center shrink-0 rounded-xl
                      bg-muted text-foreground
                      group-hover:bg-primary group-hover:text-primary-foreground
                      transition-colors
                    "
                    aria-hidden
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium leading-tight">{label}</div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
