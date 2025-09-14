import { Shield, FileText, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const items = [
  { Icon: Shield,   title: "Data Privacy",    text: "You control your data." },
  { Icon: FileText, title: "Evidence-Based",  text: "Clinical literature first." },
  { Icon: Zap,      title: "Efficiency",      text: "Streamlined workflows." },
];

export function TrustBadges() {
  return (
    <section aria-label="Trust badges" className="mt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map(({ Icon, title, text }) => (
          <Card
            key={title}
            className="
              rounded-2xl border px-4 py-3
              bg-card/70 backdrop-blur-[2px]
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  grid size-10 place-items-center shrink-0 rounded-lg
                  bg-muted text-foreground
                "
                aria-hidden
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium leading-none">{title}</div>
                <div className="text-xs text-muted-foreground">{text}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
