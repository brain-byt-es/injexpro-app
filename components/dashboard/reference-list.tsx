import Link from "next/link";

export type RefItem = {
  id: string;
  title: string | null;
  authors?: string[] | null;
  journal?: string | null;
  publication_year?: number | null;
  doi_url?: string | null;
};

export function ReferenceList({ items }: { items: RefItem[] }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-2">
      {items.map((r) => (
        <div key={r.id} className="text-sm">
          <div className="font-medium">{r.title ?? "Untitled"}</div>
          <div className="text-muted-foreground">
            {[r.journal, r.publication_year].filter(Boolean).join(" • ")}
            {r.doi_url ? (
              <>
                {" "}
                —{" "}
                <Link
                  href={r.doi_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  DOI ↗
                </Link>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
