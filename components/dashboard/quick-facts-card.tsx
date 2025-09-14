import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickFactsCard({
  title = "Quick Facts",
  items,
  updatedAt,
}: {
  title?: string;
  items: { label: string; value: React.ReactNode }[];
  updatedAt?: string | null;
}) {
  return (
    <div className="md:sticky md:top-[calc(var(--header-height)+1rem)]">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-[120px_1fr] gap-3 text-sm">
              <div className="text-muted-foreground">{label}</div>
              <div className="font-medium">{value ?? "—"}</div>
            </div>
          ))}
          {updatedAt ? (
            <div className="pt-2 text-xs text-muted-foreground">
              Last updated {new Date(updatedAt).toLocaleDateString()}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
